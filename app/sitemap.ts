import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";
import {
  BASE_URL,
  TOOL_SLUGS,
  STATIC_PAGES,
  STATIC_PAGES_EN,
  EVENT_SLUGS,
} from "@/lib/site-map-data";

// فعّلها لاحقًا لما تجهز صفحات الدول الإنجليزية
const ENABLE_EN_COUNTRY_PAGES = false;

// فعّلها لاحقًا لما تجهز صفحات الأحداث الإنجليزية
const ENABLE_EN_EVENT_PAGES = true;

function accountSlug(value: string | null) {
  if (!value) return "";

  return value
    .toLowerCase()
    .trim()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // غيّر هذا التاريخ فقط بعد إجراء تحديث شهري فعلي ومهم للمحتوى
const LAST_SIGNIFICANT_UPDATE = new Date("2026-10-05T00:00:00.000Z");

  const { data: brokers } = await supabase
  .from("brokers")
  .select("id, slug, is_full_review")
  .eq("publication_status", "published");

const brokerSlugs =
  brokers?.map((b) => b.slug).filter((slug): slug is string => Boolean(slug)) || [];

const fullReviewBrokerSlugs =
  brokers
    ?.filter((b) => b.is_full_review === true)
    .map((b) => b.slug)
    .filter((slug): slug is string => Boolean(slug)) || [];

  const brokerPages = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/brokers/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const brokerPagesEN = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/en/brokers/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  
  // =====================================================
  // OPEN ACCOUNT GUIDES — LEGACY AR + V2 AR / EN
  // =====================================================

  // Published brokers only
  const publishedBrokerSlugs = new Set(brokerSlugs);

  // 1. Keep existing legacy Arabic guides (including Exness).
  const { data: legacyGuides, error: legacyGuidesError } =
    await supabase
      .from("broker_open_account_guides")
      .select(`
        slug,
        brokers!inner(publication_status)
      `)
      .eq("is_active", true)
      .eq("brokers.publication_status", "published");

  if (legacyGuidesError) {
    console.error(
      "[Sitemap] Legacy guides:",
      legacyGuidesError.message
    );
    throw new Error("Failed to load legacy account guides");
  }

  // 2. Load published V2 guides.
  const { data: v2Guides, error: v2GuidesError } =
    await supabase
      .from("broker_account_guides_v2")
      .select("id, slug, last_verified_at")
      .eq("is_published", true);

  if (v2GuidesError) {
    console.error(
      "[Sitemap] V2 guides:",
      v2GuidesError.message
    );
    throw new Error("Failed to load V2 account guides");
  }

  // 3. Find V2 guides that actually have English steps.
  const v2GuideIds = (v2Guides ?? [])
    .filter((guide) =>
      publishedBrokerSlugs.has(guide.slug)
    )
    .map((guide) => guide.id);

  const englishGuideIds = new Set<number>();

  if (v2GuideIds.length > 0) {
    const { data: englishSteps, error: englishStepsError } =
      await supabase
        .from("broker_account_guide_steps_v2")
        .select("guide_id")
        .in("guide_id", v2GuideIds)
        .eq("language", "en")
        .eq("is_active", true);

    if (englishStepsError) {
      console.error(
        "[Sitemap] English guide steps:",
        englishStepsError.message
      );
      throw new Error("Failed to load English guide steps");
    }

    for (const step of englishSteps ?? []) {
      englishGuideIds.add(step.guide_id);
    }
  }

  // 4. Deduplicate Arabic URLs.
  const arabicGuideMap = new Map<
    string,
    MetadataRoute.Sitemap[number]
  >();

  for (const guide of legacyGuides ?? []) {
    if (
      !guide.slug ||
      !publishedBrokerSlugs.has(guide.slug)
    ) {
      continue;
    }

    const pageUrl =
      `${BASE_URL}/brokers/${guide.slug}/open-account`;

    arabicGuideMap.set(pageUrl, {
      url: pageUrl,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    });
  }

  // V2 takes precedence over a legacy URL with the same slug.
  for (const guide of v2Guides ?? []) {
    if (
      !guide.slug ||
      !publishedBrokerSlugs.has(guide.slug)
    ) {
      continue;
    }

    const pageUrl =
      `${BASE_URL}/brokers/${guide.slug}/open-account`;

    const verifiedDate = guide.last_verified_at
      ? new Date(guide.last_verified_at)
      : null;

    arabicGuideMap.set(pageUrl, {
      url: pageUrl,
      lastModified:
        verifiedDate &&
        !Number.isNaN(verifiedDate.getTime())
          ? verifiedDate
          : LAST_SIGNIFICANT_UPDATE,
    });
  }

  const openAccountPages: MetadataRoute.Sitemap =
    Array.from(arabicGuideMap.values());

  // 5. English URLs — only for published V2 guides
  // with at least one active English step.
  const openAccountPagesEN: MetadataRoute.Sitemap =
    (v2Guides ?? [])
      .filter(
        (guide) =>
          Boolean(guide.slug) &&
          publishedBrokerSlugs.has(guide.slug) &&
          englishGuideIds.has(guide.id)
      )
      .map((guide) => {
        const verifiedDate = guide.last_verified_at
          ? new Date(guide.last_verified_at)
          : null;

        return {
          url:
            `${BASE_URL}/en/brokers/${guide.slug}/open-account`,
          lastModified:
            verifiedDate &&
            !Number.isNaN(verifiedDate.getTime())
              ? verifiedDate
              : LAST_SIGNIFICANT_UPDATE,
        };
      });

  console.log(
    `[Sitemap] Account guides: ${openAccountPages.length} AR, ${openAccountPagesEN.length} EN`
  );


  
const { data: accounts, error: accountsError } = await supabase
  .from("broker_accounts")
  .select(`
    id,
    broker_id,
    account_name,
    account_type,
    brokers!inner(
      slug,
      publication_status,
      is_full_review
    )
  `)
  .eq("brokers.publication_status", "published")
  .eq("brokers.is_full_review", true);


if (accountsError) {
  console.error("Sitemap accounts query failed:", accountsError);
  throw new Error("Failed to load accounts for sitemap");
}

const accountPages: MetadataRoute.Sitemap = [];
  const accountPagesEN: MetadataRoute.Sitemap = [];

  accounts?.forEach((row: any) => {
    const slug = row.brokers?.slug;
    const account = accountSlug(row.account_name);

    if (!slug || !account) return;

    accountPages.push({
      url: `${BASE_URL}/brokers/${slug}/accounts/${account}`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    });

    accountPagesEN.push({
      url: `${BASE_URL}/en/brokers/${slug}/accounts/${account}`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    });
  });

  const { data: countryPagesData } = await supabase
  .from("country_pages")
  .select("slug, ar_enabled, en_enabled");

const countryPages: MetadataRoute.Sitemap =
  countryPagesData
    ?.filter(
      (country) =>
        Boolean(country.slug) &&
        country.ar_enabled === true
    )
    .map((country) => ({
      url: `${BASE_URL}/best-brokers/${country.slug}`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    })) || [];

const countryPagesEN: MetadataRoute.Sitemap =
  countryPagesData
    ?.filter(
      (country) =>
        Boolean(country.slug) &&
        country.en_enabled === true
    )
    .map((country) => ({
      url: `${BASE_URL}/en/best-brokers/${country.slug}`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    })) || [];

  const comparePages: MetadataRoute.Sitemap = [];
  const comparePagesEN: MetadataRoute.Sitemap = [];

  for (let i = 0; i < fullReviewBrokerSlugs.length; i++) {
  for (let j = i + 1; j < fullReviewBrokerSlugs.length; j++) {
      comparePages.push({
        url: `${BASE_URL}/compare/${fullReviewBrokerSlugs[i]}-vs-${fullReviewBrokerSlugs[j]}`,
        lastModified: LAST_SIGNIFICANT_UPDATE,
      });

      comparePagesEN.push({
        url: `${BASE_URL}/en/compare/${fullReviewBrokerSlugs[i]}-vs-${fullReviewBrokerSlugs[j]}`,
        lastModified: LAST_SIGNIFICANT_UPDATE,
      });
    }
  }



  // =====================================================
  // ACCOUNT COMPARISONS — ARABIC & ENGLISH
  // Only same account_type across different brokers
  // =====================================================

  const normalizeType = (value: string | null) =>
    (value ?? "").trim().toLowerCase();

  type ComparisonAccount = {
    key: string;
    brokerId: number;
    accountType: string;
  };

  const comparisonKeyCounts = new Map<string, number>();
  const comparisonAccounts: ComparisonAccount[] = [];

  for (const row of accounts ?? []) {
    const brokerRelation = row.brokers as
      | { slug: string | null }
      | { slug: string | null }[]
      | null;

    const broker = Array.isArray(brokerRelation)
      ? brokerRelation[0]?.slug
      : brokerRelation?.slug;

    const account = accountSlug(row.account_name);
    const accountType = normalizeType(row.account_type);

    if (!broker || !account || !accountType) continue;

    const key = `${broker}-${account}`;

    // Avoid account keys containing the comparison separator.
    if (key.includes("-vs-")) continue;

    comparisonKeyCounts.set(
      key,
      (comparisonKeyCounts.get(key) ?? 0) + 1
    );

    comparisonAccounts.push({
      key,
      brokerId: row.broker_id,
      accountType,
    });
  }

  // Keep only accounts with unique URL keys.
  const uniqueComparisonAccounts = comparisonAccounts
    .filter(
      (item) => comparisonKeyCounts.get(item.key) === 1
    )
    .sort((a, b) =>
      a.key < b.key ? -1 : a.key > b.key ? 1 : 0
    );

  const comparisonSlugCounts = new Map<string, number>();

  // Generate only valid pairs.
  const validComparisonSlugs: string[] = [];

  for (let i = 0; i < uniqueComparisonAccounts.length; i++) {
    for (
      let j = i + 1;
      j < uniqueComparisonAccounts.length;
      j++
    ) {
      const first = uniqueComparisonAccounts[i];
      const second = uniqueComparisonAccounts[j];

      // Do not compare accounts from the same broker.
      if (first.brokerId === second.brokerId) continue;

      // Do not compare different account categories.
      if (first.accountType !== second.accountType) continue;

      const slug = `${first.key}-vs-${second.key}`;

      comparisonSlugCounts.set(
        slug,
        (comparisonSlugCounts.get(slug) ?? 0) + 1
      );

      validComparisonSlugs.push(slug);
    }
  }

  // Include only unambiguous canonical URLs.
  const canonicalComparisonSlugs = validComparisonSlugs.filter(
    (slug) => comparisonSlugCounts.get(slug) === 1
  );

  const accountComparisonPages: MetadataRoute.Sitemap =
    canonicalComparisonSlugs.map((slug) => ({
      url: `${BASE_URL}/compare-accounts/${slug}`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    }));

  const accountComparisonPagesEN: MetadataRoute.Sitemap =
    canonicalComparisonSlugs.map((slug) => ({
      url: `${BASE_URL}/en/compare-accounts/${slug}`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    }));

  console.log(
    `[Sitemap] Valid account comparisons: ${canonicalComparisonSlugs.length} per language`
  );


  const toolPages = TOOL_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const toolPagesEN = TOOL_SLUGS.map((slug) => ({
    url: `${BASE_URL}/en/tools/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const staticPages = STATIC_PAGES.map((page) => ({
    url: page ? `${BASE_URL}/${page}` : BASE_URL,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const staticPagesEN = STATIC_PAGES_EN.map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const eventPages = EVENT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/events/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const eventPagesEN = ENABLE_EN_EVENT_PAGES
    ? EVENT_SLUGS.map((slug) => ({
        url: `${BASE_URL}/en/events/${slug}`,
        lastModified: LAST_SIGNIFICANT_UPDATE,
      }))
    : [];

 const regulatorSlugs = [
  "fca",
  "asic",
  "cysec",
  "dfsa",
  "fsca",
  "fsa",
  "scb",
  "fsc-bvi",
  "fsc-belize",
  "fsc-mauritius",
  "jsc",
  "sca",
  "vfsc",
  "misa",
  "bacen",
  "cvm",
  "cmvm",
  "cima",
  "adgm-fsra",
  "bafin",
  "nfa",
  "ciro",
];

  const regulatorPages = regulatorSlugs.map((slug) => ({
    url: `${BASE_URL}/licenses/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const regulatorPagesEN = regulatorSlugs.map((slug) => ({
    url: `${BASE_URL}/en/licenses/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  
  /* =====================================================
     CENTRAL BANK INTEREST RATES — AR / EN
  ===================================================== */

  const interestRateBankSlugs = [
    "fed",
    "ecb",
    "boe",
    "boj",
    "boc",
    "rba",
    "snb",
    "rbnz",
  ];

  const interestRatePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/interest-rates`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    },
    {
      url: `${BASE_URL}/en/interest-rates`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    },

    ...interestRateBankSlugs.flatMap((slug) => [
      {
        url: `${BASE_URL}/interest-rates/${slug}`,
        lastModified: LAST_SIGNIFICANT_UPDATE,
      },
      {
        url: `${BASE_URL}/en/interest-rates/${slug}`,
        lastModified: LAST_SIGNIFICANT_UPDATE,
      },
    ]),
  ];


  return [
    ...staticPages,
    ...staticPagesEN,
    ...toolPages,
    ...toolPagesEN,
    ...countryPages,
    ...countryPagesEN,
    
    ...brokerPages,
    ...brokerPagesEN,
    ...openAccountPages,
    ...openAccountPagesEN,
    ...accountPages,
    ...accountPagesEN,

    ...comparePages,
    ...comparePagesEN,
    ...accountComparisonPages,
    ...accountComparisonPagesEN,
    ...eventPages,
    ...eventPagesEN,
    ...regulatorPages,
    ...regulatorPagesEN,
    ...interestRatePages,
  ];
}