import type { Metadata } from "next";

import ForexBrokerNewsHub from "@/app/components/editorial/ForexBrokerNewsHub";

import {
  getEditorialCategory,
  getEditorialArticles,
  EDITORIAL_CATEGORIES,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   FOREX BROKER NEWS — ARABIC
========================================================= */

const SITE = "https://brokeralarab.com";
const PATH = "/forex-broker-news";
const URL = `${SITE}${PATH}`;

const CATEGORY = EDITORIAL_CATEGORIES.BROKER_NEWS;

type PageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

/* =========================================================
   SEO METADATA
========================================================= */

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {

  const [category, query] = await Promise.all([
    getEditorialCategory(CATEGORY),
    searchParams,
  ]);

  const rawPage = query.page;

  const parsedPage =
    typeof rawPage === "string" &&
    /^[1-9]\d*$/.test(rawPage)
      ? Number(rawPage)
      : 1;

  const page = Number.isSafeInteger(parsedPage)
    ? parsedPage
    : 1;

  const canonical =
    page === 1
      ? URL
      : `${URL}?page=${page}`;

  const seoTitle =
    category?.seo_title_ar ||
    "أخبار شركات الفوركس ومنصات التداول العالمية";

  const title =
    page === 1
      ? seoTitle
      : `${seoTitle} – الصفحة ${page}`;

  const description =
    category?.seo_description_ar ||
    "تابع أحدث أخبار شركات الفوركس ومنصات التداول والتراخيص المالية والتوسعات وتحديثات المنتجات والخدمات.";

  const [arabic, english] = await Promise.all([
    getEditorialArticles({
      language: "ar",
      category: CATEGORY,
      limit: 1,
    }),

    getEditorialArticles({
      language: "en",
      category: CATEGORY,
      limit: 1,
    }),
  ]);

  const isIndexable =
    Boolean(category) && arabic.total > 0;

  const hasEnglish =
    Boolean(category) && english.total > 0;

  return {

    title,
    description,

    alternates: {
      canonical,

      ...(page === 1 && isIndexable && hasEnglish
        ? {
            languages: {
              ar: URL,
              en: `${SITE}/en/forex-broker-news`,
            },
          }
        : {}),
    },

    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Broker Alarab",
      locale: "ar_AR",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

  };
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function ArabicForexBrokerNewsPage({
  searchParams,
}: PageProps) {

  return (
    <ForexBrokerNewsHub
      language="ar"
      searchParams={searchParams}
    />
  );

}