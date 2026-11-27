import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import EditorialArticleCard from "./EditorialArticleCard";

import {
  getEditorialArticle,
  getRelatedEditorialArticles,
  type EditorialLanguage,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   SHARED ARTICLE LAYOUT
   Arabic & English
========================================================= */

export type ArticleContentItem = {
  id: string;
  label: string;
};

export type ArticleLayoutProps = {

  language: EditorialLanguage;

  slug?: string;

  title: string;
  titleHighlight?: string;

  description: string;

  category: string;
  categoryHref?: string;

  subcategory?: string;
  articleType?: string;

  breadcrumbTitle?: string;

  author?: string;

  published: string;
  modified?: string;

  heroImage: string;
  heroImageAlt: string;
  heroImageCaption?: string;

  contents?: ArticleContentItem[];

  introduction?: ReactNode;
  children: ReactNode;

  footer?: ReactNode;

  structuredData?: ReactNode;

};

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatArticleDate(
  date: string,
  language: EditorialLanguage
): string {

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(
    language === "ar" ? "ar-SA" : "en-GB",
    {
      calendar: "gregory",
      numberingSystem: "latn",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(value);

}

/* =========================================================
   ARTICLE HERO IMAGE
========================================================= */

function ArticleHeroImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {

  return (

    <figure className="mt-6 sm:mt-8">

      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[#071a31] shadow-[0_12px_35px_rgba(15,23,42,0.10)] sm:rounded-[22px]">

        <Image
          src={src}
          alt={alt}
          fill
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, (max-width: 1520px) 92vw, 1440px"
          className="object-cover object-center"
        />

      </div>

      {caption && (

        <figcaption className="mt-2 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">

          {caption}

        </figcaption>

      )}

    </figure>

  );

}

/* =========================================================
   TABLE OF CONTENTS
   MOBILE / TABLET / DESKTOP
========================================================= */

export function ArticleTableOfContents({
  contents,
  language,
}: {
  contents: ArticleContentItem[];
  language: EditorialLanguage;
}) {

  if (contents.length === 0) {
    return null;
  }

  const isArabic = language === "ar";

  const Arrow = isArabic
    ? ChevronLeft
    : ChevronRight;

  return (

    <>

      {/* =========================================
          MOBILE TABLE OF CONTENTS
      ========================================== */}

      <nav
        aria-label={
          isArabic
            ? "فهرس المقال للموبايل"
            : "Mobile Table of Contents"
        }
        className="my-5 sm:hidden"
      >

        <details className="group overflow-hidden rounded-[16px] border border-[#dce6f2] bg-white shadow-sm">

          <summary className="flex min-h-[65px] cursor-pointer list-none items-center gap-3 px-3.5 py-3 [&::-webkit-details-marker]:hidden">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3ff] text-[#176ac8]">

              <List
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />

            </span>

            <span className="min-w-0 flex-1">

              <span className="block text-[14px] font-black text-[#102747]">

                {isArabic
                  ? "محتويات المقال"
                  : "Table of Contents"}

              </span>

              <span className="mt-0.5 block text-[10px] text-slate-500">

                {isArabic
                  ? `${contents.length} قسماً • اضغط لاستعراضها`
                  : `${contents.length} Sections • Tap to explore`}

              </span>

            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-[#f5f9ff] text-[#176ac8] transition-transform group-open:rotate-180">

              <ChevronDown
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />

            </span>

          </summary>

          <div className="border-t border-slate-100 bg-[#f8fbff] p-2.5">

            <div className="grid grid-cols-2 gap-2">

              {contents.map((item, index) => (

                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex min-h-[45px] min-w-0 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-start transition active:bg-blue-50"
                >

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf3ff] text-[9px] font-black text-[#176ac8]">

                    {String(index + 1).padStart(2, "0")}

                  </span>

                  <span className="min-w-0 flex-1 text-[10px] font-extrabold leading-4 text-[#243b57]">

                    {item.label}

                  </span>

                </a>

              ))}

            </div>

          </div>

        </details>

      </nav>

      {/* =========================================
          DESKTOP / TABLET TABLE OF CONTENTS
      ========================================== */}

      <nav
        aria-label={
          isArabic
            ? "فهرس محتويات المقال"
            : "Article Table of Contents"
        }
        className="my-6 hidden overflow-hidden rounded-[20px] border border-[#dce6f2] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:block"
      >

        <div className="flex items-center justify-between gap-3 border-b border-[#e5edf6] bg-[linear-gradient(270deg,#f3f8ff_0%,#ffffff_100%)] px-6 py-5">

          <div>

            <h2 className="text-[19px] font-black text-[#102747]">

              {isArabic
                ? "محتويات المقال"
                : "Table of Contents"}

            </h2>

            <p className="mt-1 text-[12px] text-slate-500">

              {isArabic
                ? "انتقل مباشرة إلى القسم الذي يهمك"
                : "Jump directly to the section you are interested in"}

            </p>

          </div>

          <span className="rounded-full border border-blue-100 bg-[#eaf3ff] px-3 py-1.5 text-[11px] font-black text-[#1765b5]">

            {isArabic
              ? `${contents.length} موضوعاً`
              : `${contents.length} Topics`}

          </span>

        </div>

        <div className="grid grid-cols-2 gap-2.5 p-5 xl:grid-cols-3">

          {contents.map((item, index) => (

            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex min-h-[54px] min-w-0 items-center gap-3 rounded-[12px] border border-[#e8eef6] bg-[#f8fafc] px-3 py-2.5 text-start transition-all duration-200 hover:-translate-y-0.5 hover:border-[#aacdf4] hover:bg-[#edf6ff]"
            >

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-[11px] font-black text-[#176ac8] shadow-sm ring-1 ring-[#e2ebf6] transition group-hover:bg-[#176ac8] group-hover:text-white">

                {String(index + 1).padStart(2, "0")}

              </span>

              <span className="min-w-0 flex-1 text-[12px] font-extrabold leading-5 text-[#243b57] group-hover:text-[#176ac8]">

                {item.label}

              </span>

              <Arrow
                size={14}
                className="shrink-0 text-[#9aacc2] group-hover:text-[#176ac8]"
                aria-hidden="true"
              />

            </a>

          ))}

        </div>

      </nav>

    </>

  );

}

/* =========================================================
   MAIN SHARED ARTICLE LAYOUT
========================================================= */

export default async function ArticleLayout({

  language,
  slug,

  title,
  titleHighlight,
  description,

  category,
  categoryHref,
  subcategory,
  articleType,

  breadcrumbTitle,

  author,

  published,
  modified,

  heroImage,
  heroImageAlt,
  heroImageCaption,

  contents = [],

  introduction,
  children,
  footer,
  structuredData,

}: ArticleLayoutProps) {

  const isArabic = language === "ar";

  const prefix = isArabic ? "" : "/en";

  const articlesHref = `${prefix}/articles`;

  const authorName =
    author ||
    (
      isArabic
        ? "فريق تحليلات بروكر العرب"
        : "Broker Alarab Research Team"
    );

  const displayDate = modified || published;

  /* =============================================
     AUTOMATIC RELATED ARTICLES
  ============================================== */

  const currentArticle = slug
    ? await getEditorialArticle(slug, language)
    : null;

  const relatedArticles = currentArticle
    ? await getRelatedEditorialArticles(
        currentArticle,
        language
      )
    : [];

  const RelatedArrow = isArabic
    ? ArrowLeft
    : ArrowRight;

  

  return (

        <main
      lang={language}
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-clip bg-[#f5f7fb] text-slate-900"
    >

      {structuredData}

      {/* =============================================
          ARTICLE HEADER
      ============================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1520px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-9">

          {/* BREADCRUMB */}

          <nav
            aria-label={
              isArabic
                ? "مسار التنقل"
                : "Breadcrumb"
            }
            className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 sm:text-[12px]"
          >

            <Link
              href={prefix || "/"}
              className="transition hover:text-blue-600"
            >

              {isArabic ? "الرئيسية" : "Home"}

            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href={articlesHref}
              className="transition hover:text-blue-600"
            >

              {isArabic
                ? "المقالات والأخبار"
                : "Articles & News"}

            </Link>

            <span aria-hidden="true">/</span>

            {categoryHref && (

              <>

                <Link
                  href={categoryHref}
                  className="transition hover:text-blue-600"
                >

                  {category}

                </Link>

                <span aria-hidden="true">/</span>

              </>

            )}

            <span
              aria-current="page"
              className="text-[#145ca8]"
            >

              {breadcrumbTitle || title}

            </span>

          </nav>

          {/* ARTICLE CATEGORY */}

          <div className="mt-6 flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-[#eaf3ff] px-3 py-1.5 text-[10px] font-black text-[#1765b5] sm:text-[11px]">

              {subcategory || category}

            </span>

            {articleType && (

              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">

                {articleType}

              </span>

            )}

          </div>

          {/* ARTICLE TITLE */}

          <h1 className="mt-5 w-full text-[27px] font-black leading-[1.4] tracking-[-0.025em] text-[#0c1e38] sm:text-[34px] lg:text-[clamp(29px,3vw,48px)]">

            {title}

            {titleHighlight && (

              <>

                {" "}

                <span className="text-[#176ac8]">

                  {titleHighlight}

                </span>

              </>

            )}

          </h1>

          {/* ARTICLE DESCRIPTION */}

          <p className="mt-4 w-full max-w-none text-[14px] leading-[2] text-slate-600 sm:text-[17px] sm:leading-[1.9]">

            {description}

          </p>

          {/* ARTICLE METADATA */}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-500 sm:text-[12px]">

            <span>

              {isArabic ? "إعداد:" : "By:"}{" "}

              <strong className="text-[#102747]">

                {authorName}

              </strong>

            </span>

            <span className="hidden text-slate-300 sm:inline">

              |

            </span>

            <time dateTime={displayDate}>

              {modified
                ? isArabic
                  ? "آخر تحديث:"
                  : "Last Updated:"
                : isArabic
                  ? "تاريخ النشر:"
                  : "Published:"}

              {" "}

              {formatArticleDate(
                displayDate,
                language
              )}

            </time>

            {articleType && (

              <>

                <span className="hidden text-slate-300 sm:inline">

                  |

                </span>

                <span>{articleType}</span>

              </>

            )}

          </div>

          {/* HERO IMAGE */}

          <ArticleHeroImage
            src={heroImage}
            alt={heroImageAlt}
            caption={heroImageCaption}
          />

        </div>

      </header>

      {/* =============================================
          ARTICLE BODY
      ============================================== */}

      <div className="mx-auto max-w-[1520px] px-3 py-6 sm:px-6 sm:py-10">

        <article className="overflow-hidden rounded-[19px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.035)] sm:rounded-[24px]">

          <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-12">

            {/* INTRODUCTION */}

            {introduction && (

              <div className="space-y-5 text-[14px] leading-[2.15] text-slate-700 sm:text-[16px] sm:leading-[2.1]">

                {introduction}

              </div>

            )}

            {/* TABLE OF CONTENTS */}

            <ArticleTableOfContents
              contents={contents}
              language={language}
            />

            {/* ARTICLE CONTENT */}

            {children}

          </div>

        </article>

                {/* =============================================
            RELATED ARTICLES
            AUTOMATIC EDITORIAL RECOMMENDATIONS
        ============================================== */}

        {relatedArticles.length > 0 && (

          <section
            aria-labelledby="related-articles-heading"
            className="mt-7 rounded-[19px] border border-slate-200 bg-white p-4 shadow-sm sm:mt-10 sm:rounded-[24px] sm:p-6 lg:p-8"
          >

            {/* SECTION HEADER */}

            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 sm:mb-6">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#eaf3ff] text-[#176ac8] sm:h-12 sm:w-12">

                  <BookOpen
                    size={22}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                </div>

                <div className="min-w-0">

                  <h2
                    id="related-articles-heading"
                    className="text-[19px] font-black text-[#102747] sm:text-[26px]"
                  >

                    {isArabic
                      ? "مقالات وتقارير ذات صلة"
                      : "Related Articles & Reports"}

                  </h2>

                  <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[13px]">

                    {isArabic
                      ? "اكتشف المزيد من أبحاث وتقارير بروكر العرب"
                      : "Explore more research and reports from Broker Alarab"}

                  </p>

                </div>

              </div>

              {/* ALL ARTICLES LINK */}

              <Link
                href={articlesHref}
                className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-[10px] border border-blue-100 bg-[#f5f9ff] px-4 py-2.5 text-[11px] font-black text-[#176ac8] transition-colors hover:border-blue-300 hover:bg-blue-50 sm:text-[13px]"
              >

                {isArabic
                  ? "جميع المقالات"
                  : "All Articles"}

                <RelatedArrow
                  size={15}
                  aria-hidden="true"
                />

              </Link>

            </div>

            {/* RELATED ARTICLES GRID */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">

              {relatedArticles.map((article) => (

                <EditorialArticleCard
                  key={article.id}
                  article={article}
                  language={language}
                />

              ))}

            </div>

          </section>

        )}

        {/* OPTIONAL ARTICLE FOOTER */}

        {footer}

      </div>

    </main>

  );

}

/* ================= END ARTICLE LAYOUT ================= */
