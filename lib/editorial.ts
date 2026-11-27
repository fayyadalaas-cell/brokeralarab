import { createClient } from "@/lib/supabase/server";

/* =========================================================
   BROKER ALARAB
   CENTRAL EDITORIAL DATA LIBRARY
   Arabic & English
========================================================= */

/* =========================================================
   TYPES
========================================================= */

export type EditorialLanguage = "ar" | "en";

export type EditorialArticle = {
  id: number;
  slug: string;

  category_id: number;
  category_slug: string;
  category_name: string;

  title: string;
  short_title: string | null;
  description: string | null;

  seo_title: string | null;
  seo_description: string | null;

  cover_image: string | null;
  image_alt: string | null;

  subcategory: string | null;

  country_code: string | null;
  broker_slug: string | null;

  tags: string[];

  is_featured: boolean;
  featured_order: number;

  show_on_homepage: boolean;
  homepage_order: number;

  published_at: string;
  updated_at: string | null;

  has_translation: boolean;

  href: string;
};

export type EditorialCategory = {
  id: number;
  slug: string;

  name_ar: string;
  name_en: string;

  description_ar: string | null;
  description_en: string | null;

  seo_title_ar: string | null;
  seo_title_en: string | null;

  seo_description_ar: string | null;
  seo_description_en: string | null;

  is_active: boolean;
  sort_order: number;
};

export type EditorialQueryOptions = {
  language: EditorialLanguage;

  category?: string;
  country?: string;
  broker?: string;

  featured?: boolean;
  homepage?: boolean;

  page?: number;
  limit?: number;
};

export type EditorialArticleResult = {
  articles: EditorialArticle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

/* =========================================================
   EDITORIAL CATEGORY SLUGS
========================================================= */

export const EDITORIAL_CATEGORIES = {
  MARKETS: "financial-markets-economy",
  COUNTRY_GUIDES: "forex-trading-guides-by-country",
  BROKER_NEWS: "forex-broker-news",
  EVENTS: "events",
} as const;

/* =========================================================
   EDITORIAL SETTINGS
========================================================= */

export const EDITORIAL_SETTINGS = {
  articlesPerPage: 30,
  homepageArticles: 3,
  featuredArticles: 4,
  relatedArticles: 3,
};

/* =========================================================
   DATABASE VIEW BY LANGUAGE
========================================================= */

function getEditorialView(language: EditorialLanguage) {
  return language === "en"
    ? "editorial_articles_en"
    : "editorial_articles_ar";
}

/* =========================================================
   CATEGORY URL
========================================================= */

export function getEditorialCategoryHref(
  slug: string,
  language: EditorialLanguage
): string {
  const prefix = language === "en" ? "/en" : "";

  if (slug === EDITORIAL_CATEGORIES.BROKER_NEWS) {
    return `${prefix}/forex-broker-news`;
  }

  if (slug === EDITORIAL_CATEGORIES.EVENTS) {
    return `${prefix}/events`;
  }

  return `${prefix}/articles/category/${slug}`;
}

/* =========================================================
   GET ARTICLES
========================================================= */

export async function getEditorialArticles(
  options: EditorialQueryOptions
): Promise<EditorialArticleResult> {

  const supabase = await createClient();

  const requestedPage = options.page ?? 1;
  const requestedLimit =
    options.limit ?? EDITORIAL_SETTINGS.articlesPerPage;

  const page = Number.isFinite(requestedPage)
    ? Math.max(1, Math.floor(requestedPage))
    : 1;

  const limit = Number.isFinite(requestedLimit)
    ? Math.min(100, Math.max(1, Math.floor(requestedLimit)))
    : EDITORIAL_SETTINGS.articlesPerPage;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from(getEditorialView(options.language))
    .select("*", { count: "exact" });

  /* CATEGORY FILTER */

  if (options.category) {
    query = query.eq(
      "category_slug",
      options.category
    );
  }

  /* COUNTRY FILTER */

  if (options.country) {
    query = query.eq(
      "country_code",
      options.country.toUpperCase()
    );
  }

  /* BROKER FILTER */

  if (options.broker) {
    query = query.eq(
      "broker_slug",
      options.broker
    );
  }

  /* FEATURED ARTICLES */

  if (options.featured === true) {
    query = query.eq("is_featured", true);
  }

  /* HOMEPAGE ARTICLES */

  if (options.homepage === true) {
    query = query.eq("show_on_homepage", true);
  }

  /* SORTING */

  if (options.homepage === true) {

    query = query.order(
      "homepage_order",
      { ascending: true }
    );

  } else if (options.featured === true) {

    query = query.order(
      "featured_order",
      { ascending: true }
    );

  }

  /* DEFAULT SORTING */

  query = query
    .order("published_at", { ascending: false })
    .order("id", { ascending: false });

  /* EXECUTE QUERY */

  const { data, error, count } = await query.range(
    from,
    to
  );

  if (error) {

    console.error(
      "[Editorial] Failed to load articles:",
      error.message
    );

    return {
      articles: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }

  const total = count ?? 0;

  return {
    articles: (data ?? []) as EditorialArticle[],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/* =========================================================
   GET SINGLE ARTICLE
========================================================= */

export async function getEditorialArticle(
  slug: string,
  language: EditorialLanguage
): Promise<EditorialArticle | null> {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from(getEditorialView(language))
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {

    console.error(
      "[Editorial] Failed to load article:",
      error.message
    );

    return null;
  }

  return data as EditorialArticle | null;
}

/* =========================================================
   GET ACTIVE CATEGORIES
========================================================= */

export async function getEditorialCategories():
  Promise<EditorialCategory[]> {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("editorial_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {

    console.error(
      "[Editorial] Failed to load categories:",
      error.message
    );

    return [];
  }

  return (data ?? []) as EditorialCategory[];
}

/* =========================================================
   GET SINGLE CATEGORY
========================================================= */

export async function getEditorialCategory(
  slug: string
): Promise<EditorialCategory | null> {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("editorial_categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {

    console.error(
      "[Editorial] Failed to load category:",
      error.message
    );

    return null;
  }

  return data as EditorialCategory | null;
}

/* =========================================================
   GET HOMEPAGE ARTICLES
========================================================= */

export async function getHomepageArticles(
  language: EditorialLanguage,
  limit: number = EDITORIAL_SETTINGS.homepageArticles
): Promise<EditorialArticle[]> {

  const selected = await getEditorialArticles({
    language,
    homepage: true,
    limit,
  });

  if (selected.articles.length >= limit) {
    return selected.articles;
  }

  /* FILL REMAINING POSITIONS WITH LATEST ARTICLES */

  const latest = await getEditorialArticles({
    language,
    limit,
  });

  const articles = new Map<number, EditorialArticle>();

  for (const article of selected.articles) {
    articles.set(article.id, article);
  }

  for (const article of latest.articles) {

    if (!articles.has(article.id)) {
      articles.set(article.id, article);
    }

    if (articles.size >= limit) {
      break;
    }
  }

  return Array.from(articles.values()).slice(0, limit);
}

/* =========================================================
   GET FEATURED ARTICLES
========================================================= */

export async function getFeaturedEditorialArticles(
  language: EditorialLanguage,
  category?: string,
  limit: number = EDITORIAL_SETTINGS.featuredArticles
): Promise<EditorialArticle[]> {

  const result = await getEditorialArticles({
    language,
    category,
    featured: true,
    limit,
  });

  return result.articles;
}

/* =========================================================
   GET RELATED ARTICLES
========================================================= */

export async function getRelatedEditorialArticles(
  article: EditorialArticle,
  language: EditorialLanguage,
  limit: number = EDITORIAL_SETTINGS.relatedArticles
): Promise<EditorialArticle[]> {

  const supabase = await createClient();

  const articles = new Map<number, EditorialArticle>();

  /* FIRST PRIORITY — SAME COUNTRY */

  if (article.country_code) {

    const { data } = await supabase
      .from(getEditorialView(language))
      .select("*")
      .neq("id", article.id)
      .eq("country_code", article.country_code)
      .order("published_at", { ascending: false })
      .limit(limit);

    for (const item of (data ?? []) as EditorialArticle[]) {
      articles.set(item.id, item);
    }
  }

  /* SECOND PRIORITY — SAME BROKER */

  if (articles.size < limit && article.broker_slug) {

    const { data } = await supabase
      .from(getEditorialView(language))
      .select("*")
      .neq("id", article.id)
      .eq("broker_slug", article.broker_slug)
      .order("published_at", { ascending: false })
      .limit(limit);

    for (const item of (data ?? []) as EditorialArticle[]) {
      articles.set(item.id, item);
    }
  }

  /* THIRD PRIORITY — MATCHING TAGS */

  if (articles.size < limit && article.tags?.length) {

    const { data } = await supabase
      .from(getEditorialView(language))
      .select("*")
      .neq("id", article.id)
      .overlaps("tags", article.tags)
      .order("published_at", { ascending: false })
      .limit(limit * 2);

    for (const item of (data ?? []) as EditorialArticle[]) {

      if (!articles.has(item.id)) {
        articles.set(item.id, item);
      }
    }
  }

  /* FOURTH PRIORITY — SAME CATEGORY */

  if (articles.size < limit) {

    const { data } = await supabase
      .from(getEditorialView(language))
      .select("*")
      .neq("id", article.id)
      .eq("category_slug", article.category_slug)
      .order("published_at", { ascending: false })
      .limit(limit * 2);

    for (const item of (data ?? []) as EditorialArticle[]) {

      if (!articles.has(item.id)) {
        articles.set(item.id, item);
      }
    }
  }

  return Array.from(articles.values()).slice(0, limit);
}

/* ================= END EDITORIAL LIBRARY ================= */