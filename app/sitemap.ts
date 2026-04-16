import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

const BASE_URL = "https://brokeralarab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const now = new Date();

  // 🟢 Helper hreflang
  const withLang = (path: string) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    alternates: {
      languages: {
        ar: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
  });

  // =========================
  // 🟢 STATIC PAGES
  // =========================
  const staticPages = [
    "/",
    "/brokers",
    "/compare",
    "/best-brokers",
    "/learn-trading/how-to-start-trading-from-zero",
  ].map(withLang);

  // =========================
  // 🟢 BEST BROKERS COUNTRIES (من الصورة)
  // =========================
  const countries = [
    "saudi-arabia",
    "uae",
    "egypt",
    "jordan",
    "qatar",
    "kuwait",
    "oman",
    "bahrain",
  ];

  const bestBrokersCountryPages = countries.map((c) =>
    withLang(`/best-brokers/${c}`)
  );

  // =========================
  // 🟢 BROKERS (DB)
  // =========================
  const { data: brokers } = await supabase
    .from("brokers")
    .select("slug");

  const brokerSlugs = brokers?.map((b) => b.slug) || [];

  const brokerPages = brokerSlugs.map((slug) =>
    withLang(`/brokers/${slug}`)
  );

  // =========================
  // 🔥 COMPARE (بدون duplication)
  // =========================
  const comparePages = [];

  for (let i = 0; i < brokerSlugs.length; i++) {
    for (let j = i + 1; j < brokerSlugs.length; j++) {
      comparePages.push(
        withLang(`/compare/${brokerSlugs[i]}-vs-${brokerSlugs[j]}`)
      );
    }
  }

  return [
    ...staticPages,
    ...bestBrokersCountryPages,
    ...brokerPages,
    ...comparePages,
  ];
}