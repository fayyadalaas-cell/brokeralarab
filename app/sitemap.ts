import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

const BASE_URL = "https://brokeralarab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // 🟢 جلب البروكر
  const { data: brokers } = await supabase
    .from("brokers")
    .select("slug");

  const brokerSlugs = brokers?.map((b) => b.slug) || [];

  const now = new Date();

  // 🔥 helper يولد hreflang
  const withLang = (arUrl: string, enUrl: string) => ({
    url: arUrl,
    lastModified: now,
    alternates: {
      languages: {
        ar: arUrl,
        en: enUrl,
      },
    },
  });

  // =============================
  // 🟢 STATIC PAGES
  // =============================

  const staticPages = [
    withLang(`${BASE_URL}`, `${BASE_URL}/en`),

    withLang(`${BASE_URL}/brokers`, `${BASE_URL}/en/brokers`),
    withLang(`${BASE_URL}/compare`, `${BASE_URL}/en/compare`),
    withLang(`${BASE_URL}/best-brokers`, `${BASE_URL}/en/best-brokers`),

    withLang(
      `${BASE_URL}/best-brokers/gold`,
      `${BASE_URL}/en/best-brokers/gold`
    ),

    withLang(
      `${BASE_URL}/learn-trading/how-to-start-trading-from-zero`,
      `${BASE_URL}/en/learn-trading/how-to-start-trading-from-zero`
    ),
  ];

  // =============================
  // 🟢 BROKER PAGES
  // =============================

  const brokerPages = brokerSlugs.map((slug) =>
    withLang(
      `${BASE_URL}/brokers/${slug}`,
      `${BASE_URL}/en/brokers/${slug}`
    )
  );

  // =============================
  // 🔥 COMPARE PAGES (AUTO)
  // =============================

  const comparePages = [];

  for (let i = 0; i < brokerSlugs.length; i++) {
    for (let j = 0; j < brokerSlugs.length; j++) {
      if (i !== j) {
        comparePages.push(
          withLang(
            `${BASE_URL}/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`,
            `${BASE_URL}/en/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`
          )
        );
      }
    }
  }

  return [
    ...staticPages,
    ...brokerPages,
    ...comparePages,
  ];
}