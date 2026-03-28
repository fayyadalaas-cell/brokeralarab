import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

const BASE_URL = "https://brokeralarab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // 🟢 1) جلب كل البروكر
  const { data: brokers } = await supabase
    .from("brokers")
    .select("slug");

  const brokerSlugs = brokers?.map((b) => b.slug) || [];

  // 🟢 صفحات البروكر
  const brokerPages = brokerSlugs.map((slug) => ({
    url: `${BASE_URL}/brokers/${slug}`,
    lastModified: new Date(),
  }));

  // 🔥 🧠 توليد كل المقارنات (Combination)
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

  // 🟢 صفحات ثابتة
  const staticPages = [
    { url: `${BASE_URL}`, lastModified: new Date() },
    { url: `${BASE_URL}/brokers`, lastModified: new Date() },
    { url: `${BASE_URL}/compare`, lastModified: new Date() },
    { url: `${BASE_URL}/best-brokers`, lastModified: new Date() },

    { url: `${BASE_URL}/best-brokers/gold`, lastModified: new Date() },
    { url: `${BASE_URL}/learn-trading/how-to-start-trading-from-zero`, lastModified: new Date() },
  ];

  return [
    ...staticPages,
    ...brokerPages,
    ...comparePages,
  ];
}