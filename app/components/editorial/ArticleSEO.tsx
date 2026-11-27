import type { Metadata } from "next";

import {
  EDITORIAL_CATEGORIES,
  getEditorialArticle,
  type EditorialLanguage,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   SHARED ARTICLE SEO
   Arabic & English
========================================================= */

const SITE = "https://brokeralarab.com";

/* =========================================================
   SEO CONFIGURATION
========================================================= */

export type ArticleSEOConfig = {

  language: EditorialLanguage;

  slug: string;

  title: string;
  seoTitle?: string;
  description: string;

  category: string;
  categoryHref?: string;
  categoryName?: string;

  author?: string;

  published: string;
  modified?: string;

  image: string;
  imageAlt?: string;

  imageWidth?: number;
  imageHeight?: number;

  hasTranslation?: boolean;
  translationSlug?: string;

    indexable?: boolean;

  tags?: string[];

  keywords?: string[];

  about?: {
    "@type": "Thing" | "Organization";
    name: string;
    url?: string;
  }[];

  sources?: {
    title: string;
    url: string;
  }[];

};

/* =========================================================
   ARTICLE URL
========================================================= */

function getArticleUrl(
  slug: string,
  language: EditorialLanguage
): string {

  const prefix =
    language === "ar" ? "" : "/en";

  return `${SITE}${prefix}/articles/${slug}`;

}

/* =========================================================
   ABSOLUTE URL
========================================================= */

function absoluteUrl(path: string): string {

  return new URL(path, SITE).toString();

}

/* =========================================================
   GENERATE ARTICLE METADATA
========================================================= */

export function createArticleMetadata(
  config: ArticleSEOConfig
): Metadata {

  const isArabic =
    config.language === "ar";

  const url = getArticleUrl(
    config.slug,
    config.language
  );

  const seoTitle =
    config.seoTitle || config.title;

  const imageUrl =
    absoluteUrl(config.image);

  const indexable =
    config.indexable ?? true;

  const translationSlug =
    config.translationSlug || config.slug;

  const arabicUrl = getArticleUrl(
    isArabic
      ? config.slug
      : translationSlug,
    "ar"
  );

  const englishUrl = getArticleUrl(
    isArabic
      ? translationSlug
      : config.slug,
    "en"
  );

  return {

    title: seoTitle,

    description: config.description,

    /* CANONICAL & HREFLANG */

    alternates: {

      canonical: url,

      ...(config.hasTranslation
        ? {

            languages: {

              ar: arabicUrl,

              en: englishUrl,

            },

          }
        : {}),

    },

    /* OPEN GRAPH */

    openGraph: {

      type: "article",

      url,

      title: config.title,

      description: config.description,

      siteName: "Broker Alarab",

      locale: isArabic
        ? "ar_AR"
        : "en_US",

      publishedTime:
        config.published,

      modifiedTime:
        config.modified ||
        config.published,

            section: config.category,

      ...(config.hasTranslation
        ? {
            alternateLocale: [
              isArabic ? "en_US" : "ar_AR",
            ],
          }
        : {}),

      ...(config.tags?.length
        ? { tags: config.tags }
        : {}),

      images: [

        {

          url: imageUrl,

          width:
            config.imageWidth ?? 1774,

          height:
            config.imageHeight ?? 887,

          alt:
            config.imageAlt ||
            config.title,

        },

      ],

    },

    /* TWITTER */

    twitter: {

      card: "summary_large_image",

      title: seoTitle,

      description: config.description,

      images: [imageUrl],

    },

    /* SEARCH ENGINE ROBOTS */

    robots: {

      index: indexable,

      follow: true,

      googleBot: {

        index: indexable,

        follow: true,

                "max-image-preview": "large",

        "max-snippet": -1,

        "max-video-preview": -1,

      },

    },

  };

}

/* =========================================================
   SAFE JSON-LD SERIALIZATION
========================================================= */

function serializeJsonLd(
  value: unknown
): string {

  return JSON.stringify(value).replace(
    /</g,
    "\\u003c"
  );

}

/* =========================================================
   ARTICLE STRUCTURED DATA
========================================================= */

export async function ArticleStructuredData({
  config,
}: {
  config: ArticleSEOConfig;
}) {

  const isArabic =
    config.language === "ar";

  const prefix =
    isArabic ? "" : "/en";

  const url = getArticleUrl(
    config.slug,
    config.language
  );

  const imageUrl =
    absoluteUrl(config.image);

  const authorName =
    config.author ||
    (
      isArabic
        ? "بروكر العرب"
        : "Broker Alarab"
    );

     /* =============================================
     AUTOMATIC GEOGRAPHIC COVERAGE
     Source: Supabase Editorial Articles
  ============================================== */

  const editorialArticle =
    await getEditorialArticle(
      config.slug,
      config.language
    );

  const countryCode =
    editorialArticle?.country_code
      ?.trim()
      .toUpperCase();

  let geographicCoverage:
    | {
        name: string;
        code: string;
      }
    | undefined;

  if (
    countryCode &&
    /^[A-Z]{2}$/.test(countryCode)
  ) {

    const countryNames = new Intl.DisplayNames(
      [isArabic ? "ar" : "en"],
      {
        type: "region",
        fallback: "none",
      }
    );

    const countryName =
      countryNames.of(countryCode);

    if (countryName) {

      geographicCoverage = {
        name: countryName,
        code: countryCode,
      };

    }

  }

  /* =============================================
     AUTOMATIC ARTICLE SCHEMA TYPE

     Forex Broker News: NewsArticle
     Research & Trading Guides: Article
  ============================================== */

  const schemaType =
    editorialArticle?.category_slug ===
    EDITORIAL_CATEGORIES.BROKER_NEWS
      ? "NewsArticle"
      : "Article";

  /* =============================================
     ARTICLE SCHEMA
  ============================================== */

  const articleJsonLd = {

    "@context": "https://schema.org",

    "@type": schemaType,

    "@id": `${url}#article`,

    headline: config.title,

    description: config.description,

    url,

    image: {

      "@type": "ImageObject",

      url: imageUrl,

      width:
        config.imageWidth ?? 1774,

      height:
        config.imageHeight ?? 887,

    },

    inLanguage:
      config.language,

    mainEntityOfPage: {

      "@type": "WebPage",

      "@id": url,

    },

    datePublished:
      config.published,

    dateModified:
      config.modified ||
      config.published,

                articleSection: config.category,

    ...(geographicCoverage
      ? {
          spatialCoverage: {

            "@type": "Country",

            name: geographicCoverage.name,

            identifier: geographicCoverage.code,

          },
        }
      : {}),

        ...(config.keywords?.length
      ? { keywords: config.keywords }
      : {}),

    ...(config.about?.length
      ? { about: config.about }
      : {}),

    ...(config.sources?.length
      ? {
          citation: config.sources.map((source) => ({
            "@type": "CreativeWork",
            name: source.title,
            url: source.url,
          })),
        }
      : {}),

    author: {

      "@type": "Organization",

      name: authorName,

      url: SITE,

    },

    publisher: {

      "@type": "Organization",

      name: "Broker Alarab",

      url: SITE,

    },

    isPartOf: {

      "@type": "WebSite",

      name: "Broker Alarab",

      url: SITE,

    },

  };

  /* =============================================
     BREADCRUMB SCHEMA
  ============================================== */

  const breadcrumbItems = [

    {

      "@type": "ListItem",

      position: 1,

      name: isArabic
        ? "الرئيسية"
        : "Home",

      item: `${SITE}${prefix}`,

    },

    {

      "@type": "ListItem",

      position: 2,

      name: isArabic
        ? "المقالات والأخبار"
        : "Articles & News",

      item: `${SITE}${prefix}/articles`,

    },

    ...(config.categoryHref
      ? [

          {

            "@type": "ListItem",

            position: 3,

            name:
              config.categoryName ||
              config.category,

            item: absoluteUrl(
              config.categoryHref
            ),

          },

        ]
      : []),

    {

      "@type": "ListItem",

      position:
        config.categoryHref ? 4 : 3,

      name: config.title,

      item: url,

    },

  ];

  const breadcrumbJsonLd = {

    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    "@id": `${url}#breadcrumb`,

    itemListElement:
      breadcrumbItems,

  };

  /* =============================================
     RENDER STRUCTURED DATA
  ============================================== */

  return (

    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            articleJsonLd
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd
          ),
        }}
      />

    </>

  );

}

/* ================= END ARTICLE SEO ================= */