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

  const now = new Date();

  const { data: brokers } = await supabase
    .from("brokers")
    .select("id, slug");

  const brokerSlugs =
    brokers?.map((b) => b.slug).filter((slug): slug is string => Boolean(slug)) || [];

  const brokerPages = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/brokers/${slug}`,
    lastModified: now,
  }));

  const brokerPagesEN = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/en/brokers/${slug}`,
    lastModified: now,
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
        lastModified: now,
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
      lastModified: now,
    });

    accountPagesEN.push({
      url: `${BASE_URL}/en/brokers/${slug}/accounts/${account}`,
      lastModified: now,
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
    lastModified: now,
  }));

  const countryPagesEN = ENABLE_EN_COUNTRY_PAGES
    ? countrySlugs.map((slug) => ({
        url: `${BASE_URL}/en/best-brokers/${slug}`,
        lastModified: now,
      }))
    : [];

  const comparePages: MetadataRoute.Sitemap = [];
  const comparePagesEN: MetadataRoute.Sitemap = [];

  for (let i = 0; i < brokerSlugs.length; i++) {
    for (let j = i + 1; j < brokerSlugs.length; j++) {
      comparePages.push({
        url: `${BASE_URL}/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
        lastModified: now,
      });

      comparePagesEN.push({
        url: `${BASE_URL}/en/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
        lastModified: now,
      });
    }
  }

  const toolPages = TOOL_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
  }));

  const toolPagesEN = TOOL_SLUGS.map((slug) => ({
    url: `${BASE_URL}/en/tools/${slug}`,
    lastModified: now,
  }));

  const staticPages = STATIC_PAGES.map((page) => ({
    url: page ? `${BASE_URL}/${page}` : BASE_URL,
    lastModified: now,
  }));

  const staticPagesEN = STATIC_PAGES_EN.map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: now,
  }));

  const eventPages = EVENT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/events/${slug}`,
    lastModified: now,
  }));

  const eventPagesEN = ENABLE_EN_EVENT_PAGES
    ? EVENT_SLUGS.map((slug) => ({
        url: `${BASE_URL}/en/events/${slug}`,
        lastModified: now,
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
    "fsc",
  ];

  const regulatorPages = regulatorSlugs.map((slug) => ({
    url: `${BASE_URL}/licenses/${slug}`,
    lastModified: now,
  }));

  const regulatorPagesEN = regulatorSlugs.map((slug) => ({
    url: `${BASE_URL}/en/licenses/${slug}`,
    lastModified: now,
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
    ...eventPages,
    ...eventPagesEN,
    ...regulatorPages,
    ...regulatorPagesEN,
  ];
}