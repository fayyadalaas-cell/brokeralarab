import type { Metadata } from "next";
import ForexBrokerNewsHub from "@/app/components/editorial/ForexBrokerNewsHub";

import {
  getEditorialCategory,
  getEditorialArticles,
  EDITORIAL_CATEGORIES,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   FOREX BROKER NEWS — ENGLISH
========================================================= */

const SITE = "https://brokeralarab.com";
const PATH = "/en/forex-broker-news";
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
    category?.seo_title_en ||
    "Forex Broker News & Trading Industry Updates";

  const title =
    page === 1
      ? seoTitle
      : `${seoTitle} – Page ${page}`;

  const description =
    category?.seo_description_en ||
    "Follow the latest forex broker news, regulatory developments, trading platform updates, product launches and global trading industry news.";

  const [english, arabic] = await Promise.all([
    getEditorialArticles({
      language: "en",
      category: CATEGORY,
      limit: 1,
    }),

    getEditorialArticles({
      language: "ar",
      category: CATEGORY,
      limit: 1,
    }),
  ]);

  const isIndexable =
    Boolean(category) && english.total > 0;

  const hasArabic =
    Boolean(category) && arabic.total > 0;

  return {

    title,
    description,

    alternates: {
      canonical,

      ...(page === 1 && isIndexable && hasArabic
        ? {
            languages: {
              ar: `${SITE}/forex-broker-news`,
              en: URL,
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
      locale: "en_US",
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

export default function EnglishForexBrokerNewsPage({
  searchParams,
}: PageProps) {

  return (
    <ForexBrokerNewsHub
      language="en"
      searchParams={searchParams}
    />
  );

}