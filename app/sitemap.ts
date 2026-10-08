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
  .select("id, slug")
  .eq("publication_status", "published");

  const brokerSlugs =
    brokers?.map((b) => b.slug).filter((slug): slug is string => Boolean(slug)) || [];

  const brokerPages = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/brokers/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const brokerPagesEN = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/en/brokers/${slug}`,
    lastModified: LAST_SIGNIFICANT_UPDATE,
  }));

  const { data: openAccountGuides } = await supabase
  .from("broker_open_account_guides")
  .select(`
    slug,
    brokers!inner(
      publication_status
    )
  `)
  .eq("is_active", true)
  .eq("brokers.publication_status", "published");

  const openAccountPages =
    openAccountGuides
      ?.map((g) => g.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({
        url: `${BASE_URL}/brokers/${slug}/open-account`,
        lastModified: LAST_SIGNIFICANT_UPDATE,
      })) || [];

  const { data: accounts, error: accountsError } = await supabase
  .from("broker_accounts")
  .select(`
    id,
    broker_id,
    account_name,
    brokers!inner(
      slug,
      publication_status
    )
  `)
  .eq("brokers.publication_status", "published");

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

  for (let i = 0; i < brokerSlugs.length; i++) {
    for (let j = i + 1; j < brokerSlugs.length; j++) {
      comparePages.push({
        url: `${BASE_URL}/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
        lastModified: LAST_SIGNIFICANT_UPDATE,
      });

      comparePagesEN.push({
        url: `${BASE_URL}/en/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
        lastModified: LAST_SIGNIFICANT_UPDATE,
      });
    }
  }

// ARABIC ACCOUNT COMPARISON PAGES ONLY

const comparisonKeyCounts = new Map<string, number>();

(accounts ?? []).forEach((row: any) => {
  const broker = row.brokers?.slug;
  const account = accountSlug(row.account_name);

  if (!broker || !account) return;

  const key = `${broker}-${account}`;

  comparisonKeyCounts.set(
    key,
    (comparisonKeyCounts.get(key) ?? 0) + 1
  );
});

const comparisonAccountKeys = Array.from(
  comparisonKeyCounts.entries()
)
  .filter(([, count]) => count === 1)
  .map(([key]) => key)
  .sort();

// Count all interpretations of each comparison URL
const comparisonSlugCounts = new Map<string, number>();

for (let i = 0; i < comparisonAccountKeys.length; i++) {
  for (let j = i + 1; j < comparisonAccountKeys.length; j++) {
    const slug =
      `${comparisonAccountKeys[i]}-vs-${comparisonAccountKeys[j]}`;

    comparisonSlugCounts.set(
      slug,
      (comparisonSlugCounts.get(slug) ?? 0) + 1
    );
  }
}

// Include only unambiguous canonical URLs
const accountComparisonPages: MetadataRoute.Sitemap = [];

for (let i = 0; i < comparisonAccountKeys.length; i++) {
  for (let j = i + 1; j < comparisonAccountKeys.length; j++) {
    const slug =
      `${comparisonAccountKeys[i]}-vs-${comparisonAccountKeys[j]}`;

    if (comparisonSlugCounts.get(slug) !== 1) continue;

    // Avoid ambiguous account keys containing the comparison separator
    if (
      comparisonAccountKeys[i].includes("-vs-") ||
      comparisonAccountKeys[j].includes("-vs-")
    ) {
      continue;
    }

    accountComparisonPages.push({
      url: `${BASE_URL}/compare-accounts/${slug}`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    });
  }
}

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
    ...accountPages,
    ...accountPagesEN,
    ...comparePages,
    ...comparePagesEN,
    ...accountComparisonPages,
    ...eventPages,
    ...eventPagesEN,
    ...regulatorPages,
    ...regulatorPagesEN,
  ];
}