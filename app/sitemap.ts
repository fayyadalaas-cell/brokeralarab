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


  

  // =====================================================
  // ACCOUNT PAGES — MIXED V1 / V2
  //
  // Keep V1 for brokers not ready for V2.
  // Capital.com always uses V1.
  // Use V2 only with verified accounts and approved content.
  // =====================================================

  type SitemapAccount = {
    key: string;
    brokerId: number;
    accountType: string;
    lastModified: Date;
  };

  const accountPages: MetadataRoute.Sitemap = [];
  const accountPagesEN: MetadataRoute.Sitemap = [];

  // This list will also generate account comparisons.
  const comparisonAccounts: SitemapAccount[] = [];

  const normalizeAccountType = (
    value: string | null | undefined
  ) => (value ?? "").trim().toLowerCase();

  // Keep lastModified based on an actual database
  // update when possible, not the date of every request.
  const validModifiedDate = (
    value: string | null | undefined,
    fallback: Date
  ): Date => {
    if (!value) return fallback;

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? fallback
      : date;
  };

  // -----------------------------------------------------
  // 1. Load legacy accounts.
  // These remain the source for every non-ready broker
  // and provide category matching during V2 migration.
  // -----------------------------------------------------

  const { data: legacyAccounts, error: legacyError } =
    await supabase
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

  if (legacyError || !legacyAccounts) {
    console.error(
      "[Sitemap] Legacy accounts:",
      legacyError?.message
    );

    throw new Error(
      "Failed to load legacy accounts for sitemap"
    );
  }

  type LegacyAccountRow = {
    id: number;
    broker_id: number;
    account_name: string | null;
    account_type: string | null;
  };

  const legacyByBroker = new Map<
    number,
    LegacyAccountRow[]
  >();

  for (const account of legacyAccounts) {
    const existing =
      legacyByBroker.get(account.broker_id) ?? [];

    existing.push({
      id: account.id,
      broker_id: account.broker_id,
      account_name: account.account_name,
      account_type: account.account_type,
    });

    legacyByBroker.set(
      account.broker_id,
      existing
    );
  }

  // -----------------------------------------------------
  // 2. Register one actual account in both language
  // sitemaps, using the selected V1 or V2 account slug.
  // -----------------------------------------------------

  const registerSitemapAccount = ({
    brokerId,
    brokerSlug,
    accountPathSlug,
    accountType,
    lastModified,
  }: {
    brokerId: number;
    brokerSlug: string;
    accountPathSlug: string;
    accountType: string | null;
    lastModified: Date;
  }) => {
    if (!brokerSlug || !accountPathSlug) {
      return;
    }

    const accountKey =
      `${brokerSlug}-${accountPathSlug}`;

    accountPages.push({
      url:
        `${BASE_URL}/brokers/${brokerSlug}/accounts/${accountPathSlug}`,
      lastModified,
    });

    accountPagesEN.push({
      url:
        `${BASE_URL}/en/brokers/${brokerSlug}/accounts/${accountPathSlug}`,
      lastModified,
    });

    const normalizedType =
      normalizeAccountType(accountType);

    // Comparison routes need an unambiguous account
    // key and an actual comparison category.
    if (
      !normalizedType ||
      accountKey.includes("-vs-")
    ) {
      return;
    }

    comparisonAccounts.push({
      key: accountKey,
      brokerId,
      accountType: normalizedType,
      lastModified,
    });
  };

  // -----------------------------------------------------
  // 3. Choose the correct source for each broker.
  // -----------------------------------------------------

  const fullReviewBrokers = (brokers ?? [])
    .filter(
      (broker) =>
        broker.is_full_review === true &&
        Boolean(broker.slug)
    );

  let v1BrokerCount = 0;
  let v2BrokerCount = 0;

  for (const broker of fullReviewBrokers) {
    if (!broker.slug) continue;

    const oldAccounts =
      legacyByBroker.get(broker.id) ?? [];

    let useV2 = false;

    // Explicit safeguard for Capital.com.
    if (broker.slug !== "capital-com") {
      const {
        data: ready,
        error: readinessError,
      } = await supabase.rpc(
        "is_broker_v2_ready",
        {
          p_broker_id: broker.id,
        }
      );

      if (readinessError) {
        console.error(
          `[Sitemap] V2 readiness for ${broker.slug}:`,
          readinessError.message
        );
      }

      // Match the comparison page resolver.
      useV2 =
        !readinessError && ready === true;
    }

    // ---------------------------------------------------
    // V1: Preserve existing legacy account URLs.
    // ---------------------------------------------------

    if (!useV2) {
      v1BrokerCount++;

      for (const account of oldAccounts) {
        const pathSlug = accountSlug(
          account.account_name
        );

        if (!pathSlug) continue;

        registerSitemapAccount({
          brokerId: broker.id,
          brokerSlug: broker.slug,
          accountPathSlug: pathSlug,
          accountType: account.account_type,
          lastModified: LAST_SIGNIFICANT_UPDATE,
        });
      }

      continue;
    }

    // ---------------------------------------------------
    // V2: The broker is ready.
    // Require published and verified account rows.
    // ---------------------------------------------------

    const {
      data: v2Accounts,
      error: v2AccountError,
    } = await supabase
      .from("broker_accounts_v2")
      .select(`
        id,
        broker_id,
        slug,
        account_name,
        account_type,
        sort_order,
        updated_at
      `)
      .eq("broker_id", broker.id)
      .eq("publication_status", "published")
      .eq("verification_status", "verified")
      .order("sort_order", {
        ascending: true,
      });

    if (v2AccountError) {
      console.error(
        `[Sitemap] V2 accounts for ${broker.slug}:`,
        v2AccountError.message
      );

      throw new Error(
        `Failed to load V2 accounts for ${broker.slug}`
      );
    }

    if (!v2Accounts?.length) {
      console.error(
        `[Sitemap] Ready broker has no V2 accounts: ${broker.slug}`
      );

      // Do not publish stale V1 URLs as a fallback.
      continue;
    }

    const v2Ids = v2Accounts.map(
      (account) => account.id
    );

    const {
      data: v2Contents,
      error: v2ContentError,
    } = await supabase
      .from("broker_account_content_v2")
      .select(`
        account_id,
        editorial_status,
        updated_at
      `)
      .in("account_id", v2Ids);

    if (v2ContentError) {
      console.error(
        `[Sitemap] V2 content for ${broker.slug}:`,
        v2ContentError.message
      );

      throw new Error(
        `Failed to load V2 content for ${broker.slug}`
      );
    }

    const validV2Content =
      v2Contents?.length === v2Accounts.length &&
      v2Contents.every(
        (content) =>
          content.editorial_status === "approved"
      ) &&
      new Set(
        v2Contents.map(
          (content) => content.account_id
        )
      ).size === v2Accounts.length;

    if (!validV2Content || !v2Contents) {
      console.error(
        `[Sitemap] V2 content incomplete for ${broker.slug}`
      );

      // Same principle as the page resolver:
      // never silently publish legacy replacements
      // once the broker has switched to V2.
      continue;
    }

    v2BrokerCount++;

    const contentByAccount = new Map(
      v2Contents.map(
        (content) => [
          Number(content.account_id),
          content,
        ] as const
      )
    );

    // ---------------------------------------------------
    // 4. Register verified V2 accounts.
    // Preserve their actual URL slugs and account types.
    // ---------------------------------------------------

    for (const account of v2Accounts) {
      if (!account.account_name) continue;

      const pathSlug =
        account.slug ||
        accountSlug(account.account_name);

      if (!pathSlug) continue;

      // Match V2 accounts to legacy names only
      // when the new account_type is missing.
      // Never use best_for_category as account_type.
      const originalLegacy = oldAccounts.find(
        (old) =>
          accountSlug(old.account_name) ===
            pathSlug ||
          accountSlug(old.account_name) ===
            accountSlug(account.account_name)
      );

      const resolvedAccountType =
        account.account_type ||
        originalLegacy?.account_type ||
        null;

      const content = contentByAccount.get(
        Number(account.id)
      );

      const accountModified =
        validModifiedDate(
          account.updated_at,
          LAST_SIGNIFICANT_UPDATE
        );

      const modified =
        validModifiedDate(
          content?.updated_at,
          accountModified
        );

      registerSitemapAccount({
        brokerId: broker.id,
        brokerSlug: broker.slug,
        accountPathSlug: pathSlug,
        accountType: resolvedAccountType,
        lastModified:
          modified.getTime() >= accountModified.getTime()
            ? modified
            : accountModified,
      });
    }
  }

  console.log(
    `[Sitemap] Account pages: ${accountPages.length} AR, ` +
    `${accountPagesEN.length} EN; ` +
    `${v1BrokerCount} V1 brokers, ${v2BrokerCount} V2 brokers`
  );



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
  // ACCOUNT COMPARISONS — CANONICAL V1 / V2
  //
  // Same account_type only.
  // Different brokers only.
  // Exactly one canonical URL per valid pair.
  // Use the same account selection as account pages.
  // =====================================================

  const comparisonKeyCounts =
    new Map<string, number>();

  for (const account of comparisonAccounts) {
    comparisonKeyCounts.set(
      account.key,
      (comparisonKeyCounts.get(account.key) ?? 0) + 1
    );
  }

  // Exclude ambiguous account URL keys.
  // This matches the page resolver's requirement
  // that exactly one account represents each key.
  const uniqueComparisonAccounts =
    comparisonAccounts
      .filter(
        (account) =>
          comparisonKeyCounts.get(account.key) === 1
      )
      .sort((a, b) =>
        a.key < b.key
          ? -1
          : a.key > b.key
            ? 1
            : 0
      );

  type CanonicalComparison = {
    slug: string;
    lastModified: Date;
  };

  const canonicalComparisons:
    CanonicalComparison[] = [];

  const seenComparisonSlugs =
    new Set<string>();

  for (
    let i = 0;
    i < uniqueComparisonAccounts.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < uniqueComparisonAccounts.length;
      j++
    ) {
      const first =
        uniqueComparisonAccounts[i];

      const second =
        uniqueComparisonAccounts[j];

      // Never compare two accounts
      // belonging to the same broker.
      if (
        first.brokerId === second.brokerId
      ) {
        continue;
      }

      // Never compare different account categories.
      if (
        !first.accountType ||
        !second.accountType ||
        first.accountType !== second.accountType
      ) {
        continue;
      }

      // Accounts are sorted by their full keys.
      // This creates exactly the same ordering
      // used by canonicalSlug in the page resolver.
      const canonicalSlug =
        `${first.key}-vs-${second.key}`;

      if (
        seenComparisonSlugs.has(canonicalSlug)
      ) {
        continue;
      }

      seenComparisonSlugs.add(canonicalSlug);

      const latestModified =
        first.lastModified.getTime() >=
        second.lastModified.getTime()
          ? first.lastModified
          : second.lastModified;

      canonicalComparisons.push({
        slug: canonicalSlug,
        lastModified: latestModified,
      });
    }
  }

  // Arabic canonical comparison URLs.
  const accountComparisonPages:
    MetadataRoute.Sitemap =
    canonicalComparisons.map((comparison) => ({
      url:
        `${BASE_URL}/compare-accounts/${comparison.slug}`,
      lastModified: comparison.lastModified,
    }));

  // English canonical comparison URLs.
  const accountComparisonPagesEN:
    MetadataRoute.Sitemap =
    canonicalComparisons.map((comparison) => ({
      url:
        `${BASE_URL}/en/compare-accounts/${comparison.slug}`,
      lastModified: comparison.lastModified,
    }));

  console.log(
    `[Sitemap] Canonical account comparisons: ` +
    `${accountComparisonPages.length} AR, ` +
    `${accountComparisonPagesEN.length} EN`
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