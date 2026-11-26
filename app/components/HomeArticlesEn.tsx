import Link from "next/link";
import Image from "next/image";
import { ARTICLE_PAGES } from "@/lib/site-map-data";

/* =========================================================
   BROKER ALARAB — LATEST ARTICLES (ENGLISH)

   Mobile: 1 featured article + 4 compact articles
   Desktop: 3 articles
========================================================= */

export default function HomeArticlesEn() {

  /* =====================================================
     ARTICLE SELECTION
  ====================================================== */

  const latestArticles = [...ARTICLE_PAGES]
    .reverse()
    .filter((article) => article.en === true)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, 5);

  if (latestArticles.length === 0) {
    return null;
  }

  const desktopArticles = latestArticles.slice(0, 3);

  const featuredArticle = latestArticles[0];

  const mobileArticles = latestArticles.slice(1, 5);

  /* =====================================================
     DATE FORMATTER
  ====================================================== */

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));
  }

  /* =====================================================
     MAIN SECTION
  ====================================================== */

  return (

    <section
      id="latest-articles"
      dir="ltr"
      lang="en"
      aria-labelledby="latest-articles-title"
      className="mx-auto w-full min-w-0 pt-1 pb-4 sm:pt-2 sm:pb-5 lg:pt-2 lg:pb-6"
    >

      {/* ===============================================
          EXTERNAL SECTION HEADER
      ================================================ */}

      <div className="mb-4 flex min-h-[44px] shrink-0 items-center">

        <h2
          id="latest-articles-title"
          className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
        >

          Latest Articles & Research

        </h2>

      </div>

      {/* =================================================
          MOBILE — FINANCIAL EDITORIAL LAYOUT
          1 FEATURED ARTICLE + 4 COMPACT ARTICLES
      ================================================== */}

      <div className="min-w-0 overflow-hidden rounded-[16px] border border-slate-200 bg-white sm:hidden">

        {/* ===============================================
            MOBILE FEATURED ARTICLE
        ================================================ */}

        <article className="min-w-0">

          {/* FEATURED IMAGE */}

          <Link
            href={`/en/articles/${featuredArticle.slug}`}
            aria-label={featuredArticle.titleEn}
            className="relative block aspect-[16/9] w-full overflow-hidden bg-[#edf3fa]"
          >

            {featuredArticle.image ? (

              <Image
                src={featuredArticle.image}
                alt={featuredArticle.titleEn}
                fill
                sizes="(max-width: 639px) 100vw, 1px"
                className="object-cover"
              />

            ) : (

              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#10233f] to-[#245795]">

                <span className="text-[18px] font-black text-white">

                  Broker Alarab

                </span>

              </div>

            )}

          </Link>

          {/* FEATURED CONTENT */}

          <div className="px-3.5 pb-4 pt-3">

            {/* CATEGORY + DATE */}

            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">

              <span className="rounded-md bg-[#edf3fc] px-2 py-1 text-[10px] font-bold text-[#194b92]">

                {featuredArticle.categoryEn}

              </span>

              <time
                dateTime={featuredArticle.publishedAt}
                className="text-[10px] font-medium text-slate-500"
              >

                {formatDate(featuredArticle.publishedAt)}

              </time>

            </div>

            {/* FEATURED TITLE */}

            <h3 className="text-[17px] font-black leading-[1.7] text-[#10233f]">

              <Link
                href={`/en/articles/${featuredArticle.slug}`}
                className="transition hover:text-brand-600"
              >

                {featuredArticle.shortTitleEn || featuredArticle.titleEn}

              </Link>

            </h3>

            {/* FEATURED DESCRIPTION */}

            <p className="mt-2 line-clamp-2 text-[12px] font-medium leading-6 text-slate-600">

              {featuredArticle.descriptionEn}

            </p>

            {/* FEATURED FOOTER */}

            <div className="mt-3 flex items-center justify-between gap-2">

              <span className="text-[10px] font-medium text-slate-500">

                Broker Alarab Team

              </span>

              <Link
                href={`/en/articles/${featuredArticle.slug}`}
                className="inline-flex min-h-[32px] items-center gap-2 text-[12px] font-black text-[#194b92]"
              >

                Read Article

                <span
                  aria-hidden="true"
                  className="text-[16px]"
                >

                  →

                </span>

              </Link>

            </div>

          </div>

        </article>

        {/* ===============================================
            MOBILE SECONDARY ARTICLES
            COMPACT HORIZONTAL EDITORIAL LIST
        ================================================ */}

        {mobileArticles.length > 0 && (

          <div className="border-t border-slate-200">

            {mobileArticles.map((article, index) => (

              <article
                key={article.slug}
                className={`min-w-0 ${
                  index !== 0
                    ? "border-t border-slate-100"
                    : ""
                }`}
              >

                <Link
                  href={`/en/articles/${article.slug}`}
                  className="group flex min-w-0 items-center gap-3 px-3 py-3 transition active:bg-slate-50"
                >

                  {/* SECONDARY ARTICLE IMAGE */}

                  <div className="relative h-[82px] w-[108px] shrink-0 overflow-hidden rounded-[9px] bg-[#edf3fa]">

                    {article.image ? (

                      <Image
                        src={article.image}
                        alt={article.titleEn}
                        fill
                        sizes="108px"
                        className="object-cover"
                      />

                    ) : (

                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#10233f] to-[#245795]">

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                          className="h-7 w-7 text-blue-200"
                        >

                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="16"
                            rx="2"
                          />

                          <path d="M7 8h10M7 12h10M7 16h6" />

                        </svg>

                      </div>

                    )}

                  </div>

                  {/* SECONDARY ARTICLE CONTENT */}

                  <div className="min-w-0 flex-1">

                    {/* CATEGORY */}

                    <div className="mb-1 text-[10px] font-bold leading-4 text-[#194b92]">

                      {article.categoryEn}

                    </div>

                    {/* ARTICLE TITLE */}

                    <h3 className="line-clamp-3 text-[13px] font-black leading-[1.65] text-[#10233f] transition group-hover:text-brand-600">

                      {article.shortTitleEn || article.titleEn}

                    </h3>

                    {/* ARTICLE DATE */}

                    <time
                      dateTime={article.publishedAt}
                      className="mt-1.5 block text-[10px] font-medium leading-4 text-slate-500"
                    >

                      {formatDate(article.publishedAt)}

                    </time>

                  </div>

                  {/* ARTICLE ARROW */}

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="shrink-0 text-slate-400"
                  >

                    <path d="m9 18 6-6-6-6" />

                  </svg>

                </Link>

              </article>

            ))}

          </div>

        )}

      </div>

      {/* =================================================
    DESKTOP + TABLET
    3 ARTICLE CARDS — RESPONSIVE DESIGN
================================================== */}

<div className="hidden min-w-0 grid-cols-3 gap-3 sm:grid lg:gap-4 xl:gap-5">

  {desktopArticles.map((article) => (

    <article
      key={article.slug}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white transition duration-300 hover:border-brand-300 hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)]"
    >

      {/* =================================================
          ARTICLE IMAGE
      ================================================== */}

      <Link
        href={`/en/articles/${article.slug}`}
        aria-label={article.titleEn}
        className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#edf3fa] xl:aspect-auto xl:h-[240px]"
      >

        {article.image ? (

          <Image
            src={article.image}
            alt={article.titleEn}
            fill
            sizes="(min-width: 1600px) 500px, (min-width: 640px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />

        ) : (

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#10233f] to-[#245795]">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className="h-10 w-10 text-blue-200"
            >

              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
              />

              <path d="M7 8h10M7 12h10M7 16h6" />

            </svg>

            <span className="text-lg font-black text-white">

              Broker Alarab

            </span>

          </div>

        )}

      </Link>

      {/* =================================================
          ARTICLE CONTENT
      ================================================== */}

      <div className="flex min-w-0 flex-1 flex-col p-3 lg:p-4 xl:p-5">

        {/* CATEGORY AND DATE */}

        <div className="mb-2 flex min-w-0 flex-wrap items-center justify-between gap-1.5 xl:mb-3 xl:gap-2">

          <span className="rounded-md bg-[#edf3fc] px-2 py-1 text-[10px] font-bold text-brand-600 lg:text-[11px] xl:px-2.5 xl:text-[12px]">

            {article.categoryEn}

          </span>

          <time
            dateTime={article.publishedAt}
            className="text-[10px] font-semibold text-slate-600 lg:text-[11px] xl:text-[12px]"
          >

            {formatDate(article.publishedAt)}

          </time>

        </div>

        {/* =================================================
            ARTICLE TITLE
        ================================================== */}

        <h3 className="break-words text-[15px] font-black leading-[1.7] text-[#10233f] lg:text-[18px] xl:text-[21px]">

          <Link
            href={`/en/articles/${article.slug}`}
            className="transition hover:text-brand-600"
          >

            {article.shortTitleEn || article.titleEn}

          </Link>

        </h3>

        {/* =================================================
            ARTICLE DESCRIPTION
        ================================================== */}

        <p className="mt-2 line-clamp-3 text-[12px] font-medium leading-6 text-slate-600 lg:text-[13px] xl:line-clamp-none xl:min-h-[84px] xl:text-[15px] xl:leading-7">

          {article.descriptionEn}

        </p>

        {/* =================================================
            ARTICLE FOOTER
        ================================================== */}

        <div className="mt-auto pt-3 xl:pt-4">

          <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-2.5 xl:gap-3 xl:pt-3">

            <span className="hidden text-[12px] font-medium text-slate-500 lg:inline">

              Broker Alarab Team

            </span>

            <Link
              href={`/en/articles/${article.slug}`}
              className="group/read inline-flex items-center gap-1.5 text-[12px] font-black text-brand-600 transition duration-200 hover:text-brand-700 xl:gap-2 xl:text-[13px]"
            >

              Read Article

              <span
                aria-hidden="true"
                className="text-[15px] transition-transform duration-200 group-hover/read:translate-x-1 xl:text-[17px]"
              >

                →

              </span>

            </Link>

          </div>

        </div>

      </div>

    </article>

  ))}

</div>

</section>

);

}