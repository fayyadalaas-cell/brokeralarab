import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import EditorialHub from "@/app/components/editorial/EditorialHub";

import {
  getEditorialArticles,
  getEditorialCategories,
  getFeaturedEditorialArticles,
  EDITORIAL_SETTINGS,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   ALL ARTICLES — ARABIC HUB
========================================================= */

const SITE = "https://brokeralarab.com";
const PATH = "/articles";
const URL = `${SITE}${PATH}`;

const TITLE = "المقالات والتقارير المالية";

const SEO_TITLE =
  "مقالات الفوركس والأسواق المالية وأخبار شركات التداول";

const DESCRIPTION =
  "استكشف مقالات وتقارير بروكر العرب حول الأسواق المالية والاقتصاد العالمي، وأدلة تداول الفوركس حسب الدولة، وأخبار شركات التداول والمعارض والمؤتمرات المالية.";

/* =========================================================
   PAGE PROPS
========================================================= */

type PageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

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
   SEO METADATA
========================================================= */

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {

  const params = await searchParams;

  const page = parsePage(params.page);

  const canonical =
    page === 1
      ? URL
      : `${URL}?page=${page}`;

  const pageTitle =
    page === 1
      ? SEO_TITLE
      : `${SEO_TITLE} – الصفحة ${page}`;

  return {

    title: pageTitle,

    description: DESCRIPTION,

    alternates: {
  canonical,

  ...(page === 1
    ? {
        languages: {
          ar: URL,
          en: `${SITE}/en/articles`,
        },
      }
    : {}),
},

    openGraph: {
      type: "website",
      url: canonical,
      title: pageTitle,
      description: DESCRIPTION,
      siteName: "Broker Alarab",
      locale: "ar_AR",
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: DESCRIPTION,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

  };
}

/* =========================================================
   STRUCTURED DATA
========================================================= */

function EditorialStructuredData({
  articles,
  page,
  limit,
}: {
  articles: Awaited<
    ReturnType<typeof getEditorialArticles>
  >["articles"];
  page: number;
  limit: number;
}) {

  const pageUrl =
    page === 1
      ? URL
      : `${URL}?page=${page}`;

  const collectionJsonLd = {

    "@context": "https://schema.org",
    "@type": "CollectionPage",

    "@id": `${pageUrl}#collection`,

    name: TITLE,
    description: DESCRIPTION,
    url: pageUrl,

    inLanguage: "ar",

    isPartOf: {
      "@type": "WebSite",
      name: "Broker Alarab",
      url: SITE,
    },

    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: SITE,
    },

    mainEntity: {
      "@type": "ItemList",

      numberOfItems: articles.length,

      itemListElement: articles.map(
        (article, index) => ({

          "@type": "ListItem",

          position:
            (page - 1) * limit + index + 1,

          name: article.title,

          url: `${SITE}${article.href}`,

        })
      ),
    },

  };

  const breadcrumbJsonLd = {

    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [

      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: TITLE,
        item: URL,
      },

    ],

  };

  const serialize = (value: unknown) =>
    JSON.stringify(value).replace(
      /</g,
      "\\u003c"
    );

  return (

    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialize(collectionJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialize(breadcrumbJsonLd),
        }}
      />

    </>

  );

}

/* =========================================================
   MAIN ARTICLES PAGE
========================================================= */

export default async function ArabicArticlesPage({
  searchParams,
}: PageProps) {

  const params = await searchParams;

  const page = parsePage(params.page);

  /* NORMALIZE PAGINATION URL */

  if (
    params.page !== undefined &&
    (
      page === 1 ||
      params.page !== String(page)
    )
  ) {
    redirect(PATH);
  }

  /* =============================================
     FETCH EDITORIAL DATA
  ============================================== */

  const [
    result,
    categories,
    featuredArticles,
  ] = await Promise.all([

    getEditorialArticles({
      language: "ar",
      page,
      limit: EDITORIAL_SETTINGS.articlesPerPage,
    }),

    getEditorialCategories(),

    page === 1
      ? getFeaturedEditorialArticles("ar")
      : Promise.resolve([]),

  ]);

  /* INVALID PAGINATION */

  if (
    page > 1 &&
    page > result.totalPages
  ) {
    notFound();
  }

  /* =============================================
     RENDER PAGE
  ============================================== */

  return (

    <>

      <EditorialStructuredData
        articles={result.articles}
        page={result.page}
        limit={result.limit}
      />

      <EditorialHub

        language="ar"

        title={TITLE}

        description={DESCRIPTION}

        articles={result.articles}

        categories={categories}

        featuredArticles={featuredArticles}

        total={result.total}

        page={result.page}

        totalPages={result.totalPages}

        basePath={PATH}

      />

    </>

  );

}

/* ================= END ARABIC ARTICLES HUB ================= */