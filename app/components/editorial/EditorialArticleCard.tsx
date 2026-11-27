import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FileText,
} from "lucide-react";

import type {
  EditorialArticle,
  EditorialLanguage,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   SHARED EDITORIAL ARTICLE CARD
   Arabic & English
========================================================= */

type EditorialArticleCardProps = {
  article: EditorialArticle;
  language: EditorialLanguage;
  priority?: boolean;
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
    return "";
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
   MAIN COMPONENT
========================================================= */

export default function EditorialArticleCard({
  article,
  language,
  priority = false,
}: EditorialArticleCardProps) {

  const isArabic = language === "ar";

  const Arrow = isArabic
    ? ArrowLeft
    : ArrowRight;

  const title =
    article.short_title || article.title;

  const category =
    article.subcategory || article.category_name;

  const publishedDate = formatArticleDate(
    article.published_at,
    language
  );

  return (

    <article
      dir={isArabic ? "rtl" : "ltr"}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8d2ef] hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:rounded-[19px]"
    >

      <Link
        href={article.href}
        className="flex flex-1 flex-col"
        aria-label={article.title}
      >

        {/* =============================================
            ARTICLE COVER IMAGE
        ============================================== */}

        <div className="relative aspect-[2/1] w-full overflow-hidden border-b border-slate-100 bg-[#edf3fa]">

          {article.cover_image ? (

            <Image
              src={article.cover_image}
              alt={
                article.image_alt ||
                article.title
              }
              fill
              priority={priority}
              quality={85}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1520px) 33vw, 480px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.035]"
            />

          ) : (

            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#edf4fc] to-[#dce9f8]">

              <FileText
                size={44}
                strokeWidth={1.3}
                className="text-[#194b92]/50"
                aria-hidden="true"
              />

            </div>

          )}

        </div>

        {/* =============================================
            ARTICLE CONTENT
        ============================================== */}

        <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">

          {/* CATEGORY */}

          <div className="mb-3 flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-[#eaf3ff] px-2.5 py-1 text-[10px] font-extrabold leading-5 text-[#1765b5] sm:text-[11px]">

              {category}

            </span>

          </div>

          {/* ARTICLE TITLE */}

          <h2 className="line-clamp-2 text-[16px] font-black leading-[24px] text-[#102747] transition-colors group-hover:text-[#176ac8] sm:text-[19px] sm:leading-[28px]">

  {title}

</h2>

          

          {/* ===========================================
              ARTICLE FOOTER
          ============================================ */}

          <div className="mt-auto pt-3">

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3.5">

              {/* PUBLICATION DATE */}

              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 sm:text-[12px]">

                <CalendarDays
                  size={14}
                  strokeWidth={1.8}
                  className="shrink-0 text-slate-400"
                  aria-hidden="true"
                />

                <time dateTime={article.published_at}>

                  {publishedDate}

                </time>

              </div>

              {/* READ ARTICLE */}

              <span className="inline-flex items-center gap-1.5 text-[12px] font-black text-[#176ac8] sm:text-[13px]">

                {isArabic
                  ? "اقرأ المقال"
                  : "Read Article"}

                <Arrow
                  size={14}
                  strokeWidth={2}
                  className="shrink-0"
                  aria-hidden="true"
                />

              </span>

            </div>

          </div>

        </div>

      </Link>

    </article>

  );
}

/* ================= END ARTICLE CARD ================= */