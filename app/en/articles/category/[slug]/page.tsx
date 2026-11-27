import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import EditorialHub from "@/app/components/editorial/EditorialHub";

import {
  getEditorialArticles,
  getEditorialCategories,
  getEditorialCategory,
  getFeaturedEditorialArticles,
  EDITORIAL_CATEGORIES,
  EDITORIAL_SETTINGS,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   DYNAMIC EDITORIAL CATEGORY — ENGLISH
========================================================= */

const SITE = "https://brokeralarab.com";

/* =========================================================
   PAGE PROPS
========================================================= */

type PageProps = {
  params: Promise<{
    slug: string;
  }>;

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
   RESERVED CATEGORY ROUTES
========================================================= */

function isReservedCategory(slug: string): boolean {

  return (
    slug === EDITORIAL_CATEGORIES.BROKER_NEWS ||
    slug === EDITORIAL_CATEGORIES.EVENTS
  );

}

/* =========================================================
   SEO METADATA
========================================================= */

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {

  const { slug } = await params;

  if (isReservedCategory(slug)) {
    notFound();
  }

  const category = await getEditorialCategory(slug);

  if (!category) {
    notFound();
  }

  const query = await searchParams;

  const page = parsePage(query.page);

  const baseUrl =
    `${SITE}/en/articles/category/${slug}`;

  const canonical =
    page === 1
      ? baseUrl
      : `${baseUrl}?page=${page}`;

  const seoTitle =
    category.seo_title_en || category.name_en;

  const title =
    page === 1
      ? seoTitle
      : `${seoTitle} – Page ${page}`;

  const description =
    category.seo_description_en ||
    category.description_en ||
    category.name_en;

  return {

    title,
    description,

    alternates: {
      canonical,

      ...(page === 1
        ? {
            languages: {
              ar: `${SITE}/articles/category/${slug}`,
              en: baseUrl,
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
   MAIN CATEGORY PAGE
========================================================= */

export default async function EnglishEditorialCategoryPage({
  params,
  searchParams,
}: PageProps) {

  const { slug } = await params;

  if (isReservedCategory(slug)) {
    notFound();
  }

  const category = await getEditorialCategory(slug);

  if (!category) {
    notFound();
  }

  const query = await searchParams;

  const page = parsePage(query.page);

  const basePath =
    `/en/articles/category/${slug}`;

  /* NORMALIZE PAGINATION */

  if (
    query.page !== undefined &&
    (
      page === 1 ||
      query.page !== String(page)
    )
  ) {
    redirect(basePath);
  }

  /* FETCH CATEGORY ARTICLES */

  const [
    result,
    categories,
    featuredArticles,
  ] = await Promise.all([

    getEditorialArticles({
      language: "en",
      category: slug,
      page,
      limit: EDITORIAL_SETTINGS.articlesPerPage,
    }),

    getEditorialCategories(),

    page === 1
      ? getFeaturedEditorialArticles("en", slug)
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
     STRUCTURED DATA
  ============================================== */

  const pageUrl =
    page === 1
      ? `${SITE}${basePath}`
      : `${SITE}${basePath}?page=${page}`;

  const collectionJsonLd = {

    "@context": "https://schema.org",
    "@type": "CollectionPage",

    "@id": `${pageUrl}#collection`,

    name: category.name_en,

    description:
      category.description_en ||
      category.name_en,

    url: pageUrl,

    inLanguage: "en",

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

      numberOfItems: result.articles.length,

      itemListElement: result.articles.map(
        (article, index) => ({

          "@type": "ListItem",

          position:
            (page - 1) * result.limit + index + 1,

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
        name: "Home",
        item: `${SITE}/en`,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "Financial Articles & Reports",
        item: `${SITE}/en/articles`,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: category.name_en,
        item: `${SITE}${basePath}`,
      },

    ],

  };

  const serialize = (value: unknown) =>
    JSON.stringify(value).replace(
      /</g,
      "\\u003c"
    );

  /* =============================================
     RENDER CATEGORY PAGE
  ============================================== */

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

      <EditorialHub

        language="en"

        title={category.name_en}

        description={
          category.description_en ||
          category.name_en
        }

        articles={result.articles}

        categories={categories}

        featuredArticles={featuredArticles}

        activeCategory={slug}

        total={result.total}

        page={result.page}

        totalPages={result.totalPages}

        basePath={basePath}

      />

    </>

  );

}

/* ============ END ENGLISH EDITORIAL CATEGORY ============ */