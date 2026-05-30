import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

const BASE_URL = "https://brokeralarab.com";

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

  // 🟢 1) جلب كل البروكر
  const { data: brokers } = await supabase
    .from("brokers")
    .select("id, slug");

  const brokerSlugs = brokers?.map((b) => b.slug) || [];

  // 🟢 صفحات البروكر (AR)
  const brokerPages = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/brokers/${slug}`,
    lastModified: new Date(),
  }));

  // 🟢 صفحات البروكر (EN)
  const brokerPagesEN = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/en/brokers/${slug}`,
    lastModified: new Date(),
  }));

  // 🟢 جلب حسابات البروكر
  const { data: accounts } = await supabase
    .from("broker_accounts")
    .select("account_name, brokers(slug)");

  // 🟢 صفحات الحسابات (AR)
  const accountPages: MetadataRoute.Sitemap = [];

  accounts?.forEach((row: any) => {
    const slug = row.brokers?.slug;
    const account = accountSlug(row.account_name);

    if (!slug || !account) return;

    accountPages.push({
      url: `${BASE_URL}/brokers/${slug}/accounts/${account}`,
      lastModified: new Date(),
    });
  });

  // 🟢 صفحات الحسابات (EN)
  const accountPagesEN: MetadataRoute.Sitemap = [];

  accounts?.forEach((row: any) => {
    const slug = row.brokers?.slug;
    const account = accountSlug(row.account_name);

    if (!slug || !account) return;

    accountPagesEN.push({
      url: `${BASE_URL}/en/brokers/${slug}/accounts/${account}`,
      lastModified: new Date(),
    });
  });

  // 🔥 🧠 توليد كل المقارنات (AR)
  const comparePages = [];

  for (let i = 0; i < brokerSlugs.length; i++) {
    for (let j = 0; j < brokerSlugs.length; j++) {
      if (i !== j) {
        comparePages.push({
          url: `${BASE_URL}/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
          lastModified: new Date(),
        });
      }
    }
  }

  // 🔥 🧠 توليد كل المقارنات (EN)
  const comparePagesEN = [];

  for (let i = 0; i < brokerSlugs.length; i++) {
    for (let j = 0; j < brokerSlugs.length; j++) {
      if (i !== j) {
        comparePagesEN.push({
          url: `${BASE_URL}/en/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
          lastModified: new Date(),
        });
      }
    }
  }

  // 🟢 صفحات ثابتة (AR)
  const staticPages = [
    { url: `${BASE_URL}`, lastModified: new Date() },
    { url: `${BASE_URL}/brokers`, lastModified: new Date() },
    { url: `${BASE_URL}/compare`, lastModified: new Date() },
    { url: `${BASE_URL}/best-brokers`, lastModified: new Date() },

    { url: `${BASE_URL}/best-brokers/gold`, lastModified: new Date() },
    {
      url: `${BASE_URL}/learn-trading/how-to-start-trading-from-zero`,
      lastModified: new Date(),
    },
  ];

  // 🟢 صفحات ثابتة (EN)
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
    ...brokerPages,
    ...brokerPagesEN,
    ...accountPages,
    ...accountPagesEN,
    ...comparePages,
    ...comparePagesEN,
  ];
}