import { notFound, redirect } from "next/navigation";

import EditorialHub from "./EditorialHub";

import {
  getEditorialArticles,
  getEditorialCategories,
  getEditorialCategory,
  getFeaturedEditorialArticles,
  EDITORIAL_CATEGORIES,
  EDITORIAL_SETTINGS,
  type EditorialLanguage,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   FOREX BROKER NEWS — SHARED HUB
   ARABIC & ENGLISH
========================================================= */

type ForexBrokerNewsHubProps = {
  language: EditorialLanguage;
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

const CATEGORY = EDITORIAL_CATEGORIES.BROKER_NEWS;

/* =========================================================
   PAGINATION
========================================================= */

function parsePage(
  value?: string | string[]
): number {

  if (typeof value !== "string") {
    return 1;
  }

  if (!/^[1-9]\d*$/.test(value)) {
    return 1;
  }

  const page = Number(value);

  return Number.isSafeInteger(page)
    ? page
    : 1;
}

/* =========================================================
   MAIN NEWS HUB
========================================================= */

export default async function ForexBrokerNewsHub({
  language,
  searchParams,
}: ForexBrokerNewsHubProps) {

  const isArabic = language === "ar";

  const basePath = isArabic
    ? "/forex-broker-news"
    : "/en/forex-broker-news";

  const query = await searchParams;

  const page = parsePage(query.page);

  if (
    query.page !== undefined &&
    (
      page === 1 ||
      query.page !== String(page)
    )
  ) {
    redirect(basePath);
  }

  /* FETCH EDITORIAL DATA */

  const [
    category,
    categories,
    result,
    featuredArticles,
  ] = await Promise.all([

    getEditorialCategory(CATEGORY),

    getEditorialCategories(),

    getEditorialArticles({
      language,
      category: CATEGORY,
      page,
      limit: EDITORIAL_SETTINGS.articlesPerPage,
    }),

    page === 1
      ? getFeaturedEditorialArticles(
          language,
          CATEGORY
        )
      : Promise.resolve([]),

  ]);

  /* KEEP UNPUBLISHED CATEGORY PRIVATE */

  if (!category) {
    notFound();
  }

  /* INVALID PAGINATION */

  if (
    page > 1 &&
    page > result.totalPages
  ) {
    notFound();
  }

  const title = isArabic
    ? category.name_ar
    : category.name_en;

  const description = isArabic
    ? category.description_ar || category.name_ar
    : category.description_en || category.name_en;

  /* STRUCTURED DATA */

  const site = "https://brokeralarab.com";

  const pageUrl = page === 1
    ? `${site}${basePath}`
    : `${site}${basePath}?page=${page}`;

  const collectionJsonLd = {

    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: title,
    description,
    url: pageUrl,
    inLanguage: language,

    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: site,
    },

    mainEntity: {

      "@type": "ItemList",

      numberOfItems: result.articles.length,

      itemListElement: result.articles.map(
        (article, index) => ({

          "@type": "ListItem",

          position:
            (page - 1) * result.limit + index + 1,

          name: article.title,

          url: `${site}${article.href}`,

        })
      ),

    },

  };

  return (

    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      <EditorialHub

        language={language}

        title={title}

        description={description}

        articles={result.articles}

        categories={categories}

        featuredArticles={featuredArticles}

        activeCategory={CATEGORY}

        total={result.total}

        page={result.page}

        totalPages={result.totalPages}

        basePath={basePath}

      />

    </>

  );

}

/* ================= END FOREX BROKER NEWS HUB ================= */