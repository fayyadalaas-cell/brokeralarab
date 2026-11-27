import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Newspaper,
  Globe2,
  ChartCandlestick,
  CalendarDays,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import EditorialArticleCard from "./EditorialArticleCard";
import EditorialNavigation from "./EditorialNavigation";

import {
  EDITORIAL_CATEGORIES,
  type EditorialArticle,
  type EditorialCategory,
  type EditorialLanguage,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   SHARED EDITORIAL HUB
   ARABIC & ENGLISH
========================================================= */

type EditorialHubProps = {
  language: EditorialLanguage;

  title: string;
  description: string;

  articles: EditorialArticle[];
  categories: EditorialCategory[];

  featuredArticles?: EditorialArticle[];

  activeCategory?: string;

  total: number;
  page: number;
  totalPages: number;

  basePath: string;
};

/* =========================================================
   CATEGORY ICONS
========================================================= */

function getCategoryIcon(slug: string) {

  switch (slug) {

    case EDITORIAL_CATEGORIES.MARKETS:
      return ChartCandlestick;

    case EDITORIAL_CATEGORIES.COUNTRY_GUIDES:
      return Globe2;

    case EDITORIAL_CATEGORIES.BROKER_NEWS:
      return Newspaper;

    case EDITORIAL_CATEGORIES.EVENTS:
      return CalendarDays;

    default:
      return BookOpen;

  }
}

/* =========================================================
   PAGINATION URL
========================================================= */

function getPageHref(
  basePath: string,
  page: number
): string {

  return page <= 1
    ? basePath
    : `${basePath}?page=${page}`;

}

/* =========================================================
   PAGINATION NUMBERS
========================================================= */

function getPaginationNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {

  if (totalPages <= 7) {

    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

  }

  if (currentPage <= 4) {

    return [
      1, 2, 3, 4, 5,
      "...",
      totalPages,
    ];

  }

  if (currentPage >= totalPages - 3) {

    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];

  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];

}

/* =========================================================
   MAIN EDITORIAL HUB
========================================================= */

export default function EditorialHub({
  language,

  title,
  description,

  articles,
  categories,

  featuredArticles = [],

  activeCategory,

  total,
  page,
  totalPages,

  basePath,

}: EditorialHubProps) {

  const isArabic = language === "ar";

  const prefix = isArabic ? "" : "/en";

  const articlesHref = `${prefix}/articles`;

  const Arrow = isArabic
    ? ArrowLeft
    : ArrowRight;

  const PreviousIcon = isArabic
    ? ChevronRight
    : ChevronLeft;

  const NextIcon = isArabic
    ? ChevronLeft
    : ChevronRight;

  const HeroIcon = activeCategory
    ? getCategoryIcon(activeCategory)
    : Newspaper;

  const paginationNumbers = getPaginationNumbers(
    page,
    totalPages
  );

  const showFeatured =
    page === 1 && featuredArticles.length > 0;

  return (

    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-clip bg-[#f5f7fb] text-slate-900"
    >

      {/* =============================================
          PAGE HERO
      ============================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1520px] px-4 pb-6 pt-5 sm:px-6 sm:pb-9 sm:pt-7">

          {/* BREADCRUMB */}

          <nav
            aria-label={
              isArabic
                ? "مسار التنقل"
                : "Breadcrumb"
            }
            className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 sm:text-[12px]"
          >

            <Link
              href={prefix || "/"}
              className="transition-colors hover:text-[#176ac8]"
            >
              {isArabic ? "الرئيسية" : "Home"}
            </Link>

            <span aria-hidden="true">/</span>

            {activeCategory ? (

              <>

                <Link
                  href={articlesHref}
                  className="transition-colors hover:text-[#176ac8]"
                >
                  {isArabic
                    ? "المقالات والأخبار"
                    : "Articles & News"}
                </Link>

                <span aria-hidden="true">/</span>

                <span
                  aria-current="page"
                  className="text-[#176ac8]"
                >
                  {title}
                </span>

              </>

            ) : (

              <span
                aria-current="page"
                className="text-[#176ac8]"
              >
                {title}
              </span>

            )}

          </nav>

          {/* MAIN HERO */}

          <div className="relative isolate overflow-hidden rounded-[20px] border border-[#183e65] bg-[linear-gradient(115deg,#071a31_0%,#0c2c4d_55%,#164f85_100%)] px-5 py-6 sm:rounded-[24px] sm:px-8 sm:py-7 lg:px-10 lg:py-8">

            {/* DECORATIVE BACKGROUND */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-28 end-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 start-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative flex items-center justify-between gap-6">

              <div className="min-w-0 flex-1">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#bfdbfe] sm:text-[11px]">

                  <BookOpen
                    size={15}
                    aria-hidden="true"
                  />

                  {isArabic
  ? "أبحاث وتقارير بروكر العرب"
  : "BROKER ALARAB INSIGHTS"}

                </div>

                <h1 className="text-[27px] font-black leading-[1.5] tracking-tight text-white sm:text-[36px] lg:text-[43px]">

                  {title}

                </h1>

                <p className="mt-4 max-w-[950px] text-[13px] leading-[2] text-slate-200 sm:text-[16px] sm:leading-[1.9]">

                  {description}

                </p>

              </div>

              {/* HERO ICON */}

              <div
                aria-hidden="true"
                className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-[22px] border border-white/15 bg-white/10 text-[#bfdbfe] md:flex lg:h-28 lg:w-28 lg:rounded-[26px]"
              >

                <HeroIcon
                  size={50}
                  strokeWidth={1.35}
                />

              </div>

            </div>

          </div>

                    {/* =========================================
              CATEGORY NAVIGATION
          ========================================== */}

          <div className="mt-4 sm:mt-5">

            <EditorialNavigation
              language={language}
              activeCategory={activeCategory}
              categories={categories}
            />

          </div>

        </div>

      </header>

      {/* =============================================
          MAIN CONTENT
      ============================================== */}

      <div className="mx-auto max-w-[1520px] space-y-8 px-4 py-7 sm:space-y-10 sm:px-6 sm:py-10">

        {/* ===========================================
            FEATURED ARTICLES
        ============================================ */}

        {showFeatured && (

          <section className="rounded-[20px] border border-[#d7e5f4] bg-[#edf4fc] p-4 sm:rounded-[24px] sm:p-6">

            <div className="mb-5 flex items-center gap-3 sm:mb-6">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#194b92] text-white sm:h-12 sm:w-12">

                <Sparkles
                  size={21}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

              </div>

              <div>

                <h2 className="text-[19px] font-black text-[#102747] sm:text-[24px]">

                  {isArabic
                    ? "مختارات المحرر"
                    : "Editor's Picks"}

                </h2>

                <p className="mt-1 text-[11px] text-slate-500 sm:text-[13px]">

                  {isArabic
                    ? "مقالات وتقارير مختارة من بروكر العرب"
                    : "Selected articles and reports by Broker Alarab"}

                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {featuredArticles.map((article, index) => (

                <EditorialArticleCard
                  key={article.id}
                  article={article}
                  language={language}
                  priority={index === 0}
                />

              ))}

            </div>

          </section>

        )}

        {/* ===========================================
            LATEST ARTICLES
        ============================================ */}

        <section>

          {/* SECTION HEADING */}

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#eaf3ff] text-[#176ac8] sm:h-12 sm:w-12">

                <FileText
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

              </div>

              <div>

                <h2 className="text-[20px] font-black text-[#102747] sm:text-[26px]">

                  {isArabic
                    ? "أحدث المقالات"
                    : "Latest Articles"}

                </h2>

                <p className="mt-1 text-[11px] text-slate-500 sm:text-[13px]">

                  {isArabic
                    ? "استكشف أحدث التقارير والمقالات المنشورة"
                    : "Explore our latest articles and reports"}

                </p>

              </div>

            </div>

            <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-500 sm:text-[12px]">

              {isArabic
  ? total === 0
    ? "لا توجد مقالات"
    : total === 1
      ? "مقال واحد"
      : total === 2
        ? "مقالان"
        : total % 100 >= 3 && total % 100 <= 10
          ? `${total} مقالات`
          : `${total} مقالاً`
  : `${total} ${total === 1 ? "Article" : "Articles"}`}

            </span>

          </div>

          {/* ARTICLE GRID */}

          {articles.length > 0 ? (

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">

              {articles.map((article, index) => (

                <EditorialArticleCard
                  key={article.id}
                  article={article}
                  language={language}
                  priority={
                    index === 0 && !showFeatured
                  }
                />

              ))}

            </div>

          ) : (

            /* EMPTY STATE */

            <div className="flex flex-col items-center justify-center rounded-[20px] border border-slate-200 bg-white px-5 py-14 text-center sm:py-20">

              <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#eaf3ff] text-[#176ac8]">

                <Newspaper
                  size={30}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

              </div>

              <h3 className="mt-5 text-[18px] font-black text-[#102747] sm:text-[22px]">

                {isArabic
                  ? "لا توجد مقالات لعرضها حالياً"
                  : "No Articles Available Yet"}

              </h3>

              <p className="mt-2 max-w-lg text-[13px] leading-7 text-slate-500">

                {isArabic
                  ? "يمكنك استكشاف الأقسام الأخرى والاطلاع على أحدث المقالات والتقارير المنشورة."
                  : "Explore our other categories and discover the latest published articles and reports."}

              </p>

              {activeCategory && (

                <Link
                  href={articlesHref}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#194b92] px-5 py-3 text-[13px] font-black text-white transition-colors hover:bg-[#123c79]"
                >

                  {isArabic
                    ? "عرض جميع المقالات"
                    : "Browse All Articles"}

                  <Arrow
                    size={16}
                    aria-hidden="true"
                  />

                </Link>

              )}

            </div>

          )}

        </section>

        {/* ===========================================
            PAGINATION
        ============================================ */}

        {totalPages > 1 && (

          <nav
            aria-label={
              isArabic
                ? "صفحات المقالات"
                : "Article Pagination"
            }
            className="flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-7"
          >

            {/* PREVIOUS */}

            {page > 1 && (

              <Link
                href={getPageHref(
                  basePath,
                  page - 1
                )}
                aria-label={
                  isArabic
                    ? "الصفحة السابقة"
                    : "Previous Page"
                }
                className="flex h-10 min-w-10 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-3 text-[#194b92] transition hover:border-blue-300 hover:bg-blue-50"
              >

                <PreviousIcon
                  size={18}
                  aria-hidden="true"
                />

              </Link>

            )}

            {/* PAGE NUMBERS */}

            {paginationNumbers.map((number, index) => {

              if (typeof number === "string") {

                return (

                  <span
                    key={`ellipsis-${index}`}
                    className="px-1 text-slate-400"
                  >

                    ...

                  </span>

                );

              }

              const isCurrent = number === page;

              return (

                <Link
                  key={number}
                  href={getPageHref(
                    basePath,
                    number
                  )}
                  aria-current={
                    isCurrent
                      ? "page"
                      : undefined
                  }
                  className={`flex h-10 min-w-10 items-center justify-center rounded-[10px] border px-3 text-[13px] font-black transition-colors ${
                    isCurrent
                      ? "border-[#194b92] bg-[#194b92] text-white"
                      : "border-slate-200 bg-white text-[#102747] hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >

                  {number}

                </Link>

              );

            })}

            {/* NEXT */}

            {page < totalPages && (

              <Link
                href={getPageHref(
                  basePath,
                  page + 1
                )}
                aria-label={
                  isArabic
                    ? "الصفحة التالية"
                    : "Next Page"
                }
                className="flex h-10 min-w-10 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-3 text-[#194b92] transition hover:border-blue-300 hover:bg-blue-50"
              >

                <NextIcon
                  size={18}
                  aria-hidden="true"
                />

              </Link>

            )}

          </nav>

        )}

      </div>

    </main>

  );

}

/* ================= END EDITORIAL HUB ================= */