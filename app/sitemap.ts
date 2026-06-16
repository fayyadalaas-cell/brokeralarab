import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

const BASE_URL = "https://brokeralarab.com";

// فعّلها لاحقًا لما تجهز صفحات الدول الإنجليزية
const ENABLE_EN_COUNTRY_PAGES = false;

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

  const { data: brokers } = await supabase
    .from("brokers")
    .select("id, slug");

  const brokerSlugs =
    brokers?.map((b) => b.slug).filter((slug): slug is string => Boolean(slug)) || [];

  const brokerPages = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/brokers/${slug}`,
    lastModified: new Date(),
  }));

  const brokerPagesEN = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/en/brokers/${slug}`,
    lastModified: new Date(),
  }));

  const { data: openAccountGuides } = await supabase
    .from("broker_open_account_guides")
    .select("slug")
    .eq("is_active", true);

  const openAccountPages =
    openAccountGuides
      ?.map((g) => g.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({
        url: `${BASE_URL}/brokers/${slug}/open-account`,
        lastModified: new Date(),
      })) || [];

  const { data: accounts } = await supabase
    .from("broker_accounts")
    .select("account_name, brokers(slug)");

  const accountPages: MetadataRoute.Sitemap = [];
  const accountPagesEN: MetadataRoute.Sitemap = [];

  accounts?.forEach((row: any) => {
    const slug = row.brokers?.slug;
    const account = accountSlug(row.account_name);

    if (!slug || !account) return;

    accountPages.push({
      url: `${BASE_URL}/brokers/${slug}/accounts/${account}`,
      lastModified: new Date(),
    });

    accountPagesEN.push({
      url: `${BASE_URL}/en/brokers/${slug}/accounts/${account}`,
      lastModified: new Date(),
    });
  });

  const { data: countryPagesData } = await supabase
    .from("country_pages")
    .select("slug");

  const countrySlugs =
    countryPagesData
      ?.map((c) => c.slug)
      .filter((slug): slug is string => Boolean(slug)) || [];

  const countryPages = countrySlugs.map((slug) => ({
    url: `${BASE_URL}/best-brokers/${slug}`,
    lastModified: new Date(),
  }));

  const countryPagesEN = ENABLE_EN_COUNTRY_PAGES
    ? countrySlugs.map((slug) => ({
        url: `${BASE_URL}/en/best-brokers/${slug}`,
        lastModified: new Date(),
      }))
    : [];

  const comparePages: MetadataRoute.Sitemap = [];
  const comparePagesEN: MetadataRoute.Sitemap = [];

  for (let i = 0; i < brokerSlugs.length; i++) {
    for (let j = i + 1; j < brokerSlugs.length; j++) {
      comparePages.push({
        url: `${BASE_URL}/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
        lastModified: new Date(),
      });

      comparePagesEN.push({
        url: `${BASE_URL}/en/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
        lastModified: new Date(),
      });
    }
  }

  // 🟢 صفحات أدوات التداول
  const toolSlugs = [
    "risk-calculator",
    "margin-calculator",
  ];

  const toolPages = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
  }));

  const toolPagesEN = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/en/tools/${slug}`,
    lastModified: new Date(),
  }));

  const staticPages = [
    { url: `${BASE_URL}`, lastModified: new Date() },
    { url: `${BASE_URL}/brokers`, lastModified: new Date() },
    { url: `${BASE_URL}/compare`, lastModified: new Date() },
    { url: `${BASE_URL}/best-brokers`, lastModified: new Date() },
    { url: `${BASE_URL}/best-brokers/gold`, lastModified: new Date() },
    { url: `${BASE_URL}/lowest-spread-brokers`, lastModified: new Date() },
    {
      url: `${BASE_URL}/learn-trading/how-to-start-trading-from-zero`,
      lastModified: new Date(),
    },
  ];

  const staticPagesEN = [
    { url: `${BASE_URL}/en`, lastModified: new Date() },
    { url: `${BASE_URL}/en/brokers`, lastModified: new Date() },
    { url: `${BASE_URL}/en/compare`, lastModified: new Date() },
    { url: `${BASE_URL}/en/best-brokers`, lastModified: new Date() },
    { url: `${BASE_URL}/en/best-brokers/gold`, lastModified: new Date() },
    {
      url: `${BASE_URL}/en/learn-trading/how-to-start-trading-from-zero`,
      lastModified: new Date(),
    },
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
    ...accountPages,
    ...accountPagesEN,
    ...comparePages,
    ...comparePagesEN,
  ];
}