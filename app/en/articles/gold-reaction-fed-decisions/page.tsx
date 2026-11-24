
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   BROKER ALARAB
   ARTICLE PAGE — GOLD PRICE CRASHES HISTORY
   Next.js App Router / Server Component
   ========================================================= */

const SITE = "https://brokeralarab.com";
const SLUG = "gold-reaction-fed-decisions";

const PATH = `/en/articles/${SLUG}`;
const URL = `${SITE}${PATH}`;
const AR_URL = `${SITE}/articles/${SLUG}`;

const ARTICLE = {
  title:
    "How Do Fed Interest Rate Decisions Affect Gold Prices? A Study of 41 FOMC Meetings",

  seoTitle:
    "How Fed Rate Decisions Affect Gold: 41 FOMC Meetings",

  titleMain:
    "How Do Fed Interest Rate Decisions Affect Gold Prices?",

  titleHighlight:
    "A Study of 41 FOMC Meetings",

  description:
    "Explore gold price reactions to 41 FOMC meetings from 2021 to 2026, including rate hikes, cuts, holds, first-hour volatility and price reversals.",

  category: "Research & Analysis",
  subcategory: "Gold & Interest Rates",
  articleType: "Statistical Research",
  breadcrumb: "Gold and Fed Rate Decisions",
  publisher: "Broker Alarab",

  published: "2026-11-23",
  modified: "2026-11-23",

  heroAlt:
    "Gold price reactions to Federal Reserve interest rate decisions and historical FOMC market movements",

  heroCaption:
    "Illustration of the relationship between US monetary policy and gold prices. The chart is illustrative and does not represent actual market data.",
};

const HERO_IMAGE =
  "/articles/gold-fed-decisions-hero.webp";

const ARTICLE_READY = true;
const HERO_IMAGE_READY = true;
const FEATURED_BROKERS_READY = true;

const ARTICLE_KEYWORDS = [
  "Gold prices",
  "Federal Reserve",
  "FOMC",
  "Fed interest rate decisions",
  "XAUUSD",
  "Gold trading",
  "Gold price reaction to FOMC",
  "Interest rate hikes",
  "Interest rate cuts",
  "Monetary policy",
  "Gold price volatility",
];

export const metadata: Metadata = {
  title: ARTICLE.seoTitle,
  description: ARTICLE.description,

  alternates: {
    canonical: URL,

    languages: {
      ar: AR_URL,
      en: URL,
    },
  },

  openGraph: {
    type: "article",
    url: URL,
    title: ARTICLE.title,
    description: ARTICLE.description,
    siteName: "Broker Alarab",

    locale: "en_US",
    alternateLocale: ["ar_AR"],

    publishedTime: ARTICLE.published,
    modifiedTime: ARTICLE.modified,

    section: ARTICLE.subcategory,

    tags: ARTICLE_KEYWORDS,

    images: HERO_IMAGE_READY
      ? [
          {
            url: `${SITE}${HERO_IMAGE}`,
            width: 1774,
            height: 887,
            alt: ARTICLE.heroAlt,
          },
        ]
      : [],
  },

  twitter: {
    card: HERO_IMAGE_READY
      ? "summary_large_image"
      : "summary",

    title: ARTICLE.seoTitle,
    description: ARTICLE.description,

    images: HERO_IMAGE_READY
      ? [`${SITE}${HERO_IMAGE}`]
      : [],
  },

  robots: {
    index: ARTICLE_READY,
    follow: true,

    googleBot: {
      index: ARTICLE_READY,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   ARTICLE DATA
   ========================================================= */

const contents = [
  { id: "summary", label: "Key Research Findings" },
  { id: "fed-impact", label: "How the Fed Affects Gold" },
  { id: "first-minutes", label: "First-Minute Reactions" },
  { id: "first-hour", label: "First-Hour Gold Price Moves" },
  { id: "historical-reactions", label: "Historical FOMC Reactions" },
  { id: "percentage-reactions", label: "Percentage Price Changes" },
  { id: "longer-term", label: "Post-FOMC Gold Performance" },
  { id: "rate-hike", label: "Impact of Rate Hikes" },
  { id: "rate-cut", label: "Impact of Rate Cuts" },
  { id: "rate-hold", label: "Impact of Rate Holds" },
  { id: "press-conference", label: "Fed Press Conferences" },
  { id: "dollar-yields", label: "US Dollar and Bond Yields" },
  { id: "trading-risks", label: "FOMC Trading Risks" },
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "conclusion", label: "Research Conclusion" },
  { id: "methodology", label: "Methodology and Sources" },
];

const intradayMoves = [
  { label: "1 minute", value: 4.98 },
  { label: "5 minutes", value: 6.04 },
  { label: "15 minutes", value: 6.54 },
  { label: "60 minutes", value: 9.72 },
];

const historicalReactions = [
  { date: "2026-01-28", move: 41.93 },
  { date: "2026-03-18", move: -37.63 },
  { date: "2026-04-29", move: -9.52 },
  { date: "2026-06-17", move: -94.13 },
  { date: "2026-07-29", move: 62.32 },
  { date: "2026-09-16", move: -99.40 },
  { date: "2026-10-28", move: -7.26 },
];

const longerTermReactions = [
  {
    period: "Next session",
    sample: 95,
    positive: "43%",
    median: "−0.02%",
    worst: "−5.30%",
    best: "+2.29%",
  },
  {
    period: "5 sessions",
    sample: 95,
    positive: "45%",
    median: "−0.30%",
    worst: "−8.58%",
    best: "+6.80%",
  },
  {
    period: "20 sessions",
    sample: 94,
    positive: "55%",
    median: "+0.86%",
    worst: "−9.36%",
    best: "+14.59%",
  },
];

const researchStats = {
  sample: 41,
  startDate: "2021-11-03",
  endDate: "2026-10-28",

  upCount: 20,
  downCount: 21,

  upPercent: 48.78,
  downPercent: 51.22,

  averageAbsoluteMove: 19.21,
  medianAbsoluteMove: 9.72,
  medianSignedMove: -0.42,

  largestRise: 62.32,
  largestRiseDate: "2026-07-29",

  largestFall: -99.40,
  largestFallDate: "2026-09-16",

  reversalAfterOneMinute: 15,
  reversalAfterOneMinutePercent: 36.59,

  reversalAfterFiveMinutes: 13,
  reversalAfterFiveMinutesPercent: 31.71,
};

const decisionStats = [
  {
    label: "Rate hike",
    total: 12,
    up: 8,
    down: 4,
    upPercent: 66.67,
    downPercent: 33.33,
    averageMove: 18.39,
    medianMove: 11.41,
  },
  {
    label: "Rate cut",
    total: 6,
    up: 2,
    down: 4,
    upPercent: 33.33,
    downPercent: 66.67,
    averageMove: 21.01,
    medianMove: 23.72,
  },
  {
    label: "Rate hold",
    total: 23,
    up: 10,
    down: 13,
    upPercent: 43.48,
    downPercent: 56.52,
    averageMove: 19.17,
    medianMove: 9.52,
  },
];

const percentageReactions = [
  {
    period: "1 minute",
    mean: 0.239,
    median: 0.175,
  },
  {
    period: "5 minutes",
    mean: 0.320,
    median: 0.224,
  },
  {
    period: "15 minutes",
    mean: 0.366,
    median: 0.222,
  },
  {
    period: "60 minutes",
    mean: 0.647,
    median: 0.531,
  },
];

const percentageDecisionStats = [
  {
    label: "Rate hike",
    sample: 12,
    mean: 0.738,
    median: 0.647,
  },
  {
    label: "Rate cut",
    sample: 6,
    mean: 0.626,
    median: 0.581,
  },
  {
    label: "Rate hold",
    sample: 23,
    mean: 0.605,
    median: 0.426,
  },
];

const percentageExtremes = [
  {
    date: "2023-12-13",
    type: "Largest percentage gain",
    referencePrice: 1982.03,
    dollarChange: 31.57,
    percentChange: 1.593,
  },
  {
    date: "2026-07-29",
    type: "Largest dollar gain",
    referencePrice: 4044.21,
    dollarChange: 62.32,
    percentChange: 1.541,
  },
  {
    date: "2026-09-16",
    type: "Largest dollar and percentage decline",
    referencePrice: 4360.60,
    dollarChange: -99.40,
    percentChange: -2.280,
  },
];

const sources = [
  {
    title:
      "Federal Reserve — FOMC Meeting Calendars, Statements and Historical Materials",
    url:
      "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
  },
  {
    title:
      "Federal Reserve — Historical Changes in Federal Funds Rate Targets",
    url:
      "https://www.federalreserve.gov/monetarypolicy/openmarket.htm",
  },
  {
    title:
      "XAU Meter — Gold Price Reactions to 41 FOMC Announcements",
    url:
      "https://xaumeter.com/gold-news-reaction/fomc",
  },
  {
    title:
      "Regimic — Historical Gold Performance Following 95 Fed Decisions Since 2015",
    url:
      "https://www.regimic.com/fed-decision-market-reaction/gold",
  },
  {
    title:
      "World Gold Council — The Impact of Monetary Policy on Gold",
    url:
      "https://www.gold.org/goldhub/research/the-impact-of-monetary-policy-on-gold",
  },
  {
    title:
      "Federal Reserve Bank of San Francisco — US Monetary Policy Event Study Database",
    url:
      "https://www.frbsf.org/research-and-insights/data-and-indicators/us-monetary-policy-event-study-database/",
  },
  {
    title:
      "FRED — 10-Year Treasury Inflation-Indexed Security, Constant Maturity",
    url:
      "https://fred.stlouisfed.org/series/DFII10",
  },
  {
    title:
      "FRED — Effective Federal Funds Rate",
    url:
      "https://fred.stlouisfed.org/series/FEDFUNDS",
  },
];

/* =========================================================
   SHARED ARTICLE DESIGN COMPONENTS
   These can later move to /components/articles/
   ========================================================= */

function ArticleSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-slate-100 py-5 last:border-0 sm:py-7"
    >
      {eyebrow && (
        <span className="mb-2 block text-[11px] font-extrabold text-[#176ac8] sm:text-xs">
          {eyebrow}
        </span>
      )}

      <h2 className="border-l-[4px] border-[#2587e7] pl-3 text-[22px] font-black leading-[1.4] tracking-tight text-[#101d35] sm:pl-4 sm:text-[29px]">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-[14px] leading-[1.85] text-slate-700 sm:text-[16px] sm:leading-[1.9]">
        {children}
      </div>
    </section>
  );
}

function SubHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h3 className="!mt-8 text-[17px] font-black leading-[1.7] text-[#102a4a] sm:text-[20px]">
      {children}
    </h3>
  );
}

function Paragraph({
  children,
}: {
  children: ReactNode;
}) {
  return <p>{children}</p>;
}

function Strong({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <strong className="font-black text-[#11294b]">
      {children}
    </strong>
  );
}

function ArticleList({
  items,
}: {
  items: ReactNode[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3"
        >
          <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#2587e7]" />
          <span className="min-w-0 flex-1">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Note({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "amber";
}) {
  const amber = tone === "amber";

  return (
    <aside
      className={`!my-5 rounded-[15px] border p-4 sm:p-5 ${
        amber
          ? "border-amber-200 bg-[#fffbef]"
          : "border-blue-100 bg-[#f1f7fe]"
      }`}
    >
      <div
        className={`text-[13px] font-black sm:text-[15px] ${
          amber ? "text-amber-900" : "text-[#10549f]"
        }`}
      >
        {title}
      </div>

      <div className="mt-2 text-[13px] leading-[2] text-slate-700 sm:text-[14px]">
        {children}
      </div>
    </aside>
  );
}

/* =========================================================
   HERO IMAGE PLACEHOLDER
   ========================================================= */


/* =========================================================
   ARTICLE HERO IMAGE
   Responsive / SEO / Optimized
   ========================================================= */

function ArticleHeroImage() {
  if (!HERO_IMAGE_READY) {
    return null;
  }

  return (
    <figure className="mt-6 sm:mt-8">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[#071a31] shadow-[0_12px_35px_rgba(15,23,42,0.10)] sm:rounded-[22px]">
        <Image
          src={HERO_IMAGE}
          alt={ARTICLE.heroAlt}
          fill
          priority
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, (max-width: 1520px) 92vw, 1440px"
          className="object-cover object-center"
        />
      </div>

      <figcaption className="mt-2 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
        {ARTICLE.heroCaption}
      </figcaption>
    </figure>
  );
}


/* =========================================================
   TABLE OF CONTENTS
   ========================================================= */


/* =========================================================
   ARTICLE TABLE OF CONTENTS
   Compact / Responsive / SEO-friendly
   ========================================================= */


/* =========================================================
   TABLE OF CONTENTS
   Mobile: compact expandable menu
   Desktop: original 3-column layout
   ========================================================= */

function TableOfContents() {
  return (
    <>
      {/* MOBILE TABLE OF CONTENTS */}

      <nav
        aria-label="Mobile table of contents"
        className="my-5 sm:hidden"
      >
        <details className="group overflow-hidden rounded-[16px] border border-[#dce6f2] bg-white shadow-sm">

          <summary className="flex min-h-[65px] cursor-pointer list-none items-center gap-3 px-3.5 py-3 [&::-webkit-details-marker]:hidden">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#eaf3ff] text-[#176ac8]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M3 6h.01" />
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-black text-[#102747]">
                Table of Contents
              </span>

              <span className="mt-0.5 block text-[10px] text-slate-500">
                {contents.length} sections • Tap to explore
              </span>
            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-[#f5f9ff] text-[#176ac8] transition-transform group-open:rotate-180">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>

          </summary>

          <div className="border-t border-slate-100 bg-[#f8fbff] p-2.5">
            <div className="grid grid-cols-2 gap-2">

              {contents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex min-h-[48px] min-w-0 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-left transition active:bg-blue-50"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf3ff] text-[9px] font-black text-[#176ac8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1 break-words text-[10px] font-extrabold leading-4 text-[#243b57]">
                    {item.label}
                  </span>
                </a>
              ))}

            </div>
          </div>

        </details>
      </nav>

      {/* DESKTOP TABLE OF CONTENTS */}

      <nav
        aria-label="Article table of contents"
        className="my-6 hidden overflow-hidden rounded-[20px] border border-[#dce6f2] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:block"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#e5edf6] bg-[linear-gradient(90deg,#f3f8ff_0%,#ffffff_100%)] px-6 py-5">

          <div>
            <h2 className="text-[19px] font-black text-[#102747]">
              Table of Contents
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Jump directly to the section you want to explore
            </p>
          </div>

          <span className="rounded-full border border-blue-100 bg-[#eaf3ff] px-3 py-1.5 text-[11px] font-black text-[#1765b5]">
            {contents.length} sections
          </span>

        </div>

        <div className="grid grid-cols-2 gap-2.5 p-5 xl:grid-cols-3">

          {contents.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex min-h-[54px] min-w-0 items-center gap-3 rounded-[12px] border border-[#e8eef6] bg-[#f8fafc] px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#aacdf4] hover:bg-[#edf6ff]"
            >

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-[11px] font-black text-[#176ac8] shadow-sm ring-1 ring-[#e2ebf6] transition group-hover:bg-[#176ac8] group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1 text-[12px] font-extrabold leading-5 text-[#243b57] group-hover:text-[#176ac8]">
                {item.label}
              </span>

              <span className="text-[#9aacc2] group-hover:text-[#176ac8]">
                ›
              </span>

            </a>
          ))}

        </div>
      </nav>
    </>
  );
}

/* =========================================================
   HISTORICAL TABLE
   DESKTOP TABLE + MOBILE CARDS
   ========================================================= */

function ArticleDataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}) {
  const isTwoColumns = headers.length === 2;

  return (
    <figure className="!mt-7 min-w-0 w-full">

      <div
        className={`rounded-[17px] border border-slate-200 shadow-sm ${
          isTwoColumns
            ? "overflow-hidden"
            : "overflow-x-auto"
        }`}
      >

        <table
          className={`w-full text-left ${
            isTwoColumns
              ? "table-fixed"
              : "min-w-[550px]"
          }`}
        >

          {isTwoColumns && (
            <colgroup>
              <col className="w-[46%] sm:w-1/2" />
              <col className="w-[54%] sm:w-1/2" />
            </colgroup>
          )}

          <thead className="bg-[#092443] text-white">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-2.5 py-3 text-center text-[11px] font-black leading-5 sm:px-4 sm:py-4 sm:text-[13px]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-t border-slate-200 ${
                  rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-[#f7f9fc]"
                }`}
              >

                {row.map((cell, index) => {
                  const value = String(cell);

                  const negative =
                    value.startsWith("-") ||
                    value.startsWith("−");

                  const positive =
                    value.startsWith("+");

                  return (
                    <td
                      key={index}
                      className={`px-2.5 py-3 text-center align-middle text-[11px] font-bold leading-[1.8] sm:px-4 sm:py-4 sm:text-[14px] ${
                        isTwoColumns
                          ? "whitespace-normal break-words [overflow-wrap:anywhere]"
                          : "whitespace-nowrap"
                      } ${
                        isTwoColumns && index === 0
                          ? "border-r border-slate-200"
                          : ""
                      } ${
                        negative
                          ? "text-red-700"
                          : positive
                          ? "text-emerald-700"
                          : "text-[#102747]"
                      }`}
                    >
                      <bdi>{cell}</bdi>
                    </td>
                  );
                })}

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {caption && (
        <figcaption className="mt-3 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
          {caption}
        </figcaption>
      )}

    </figure>
  );
}

function IntradayMovementChart() {
  const max = Math.max(
    ...intradayMoves.map((item) => item.value)
  );

  return (
    <figure className="!mt-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">

      <figcaption className="mb-6">
        <h3 className="text-[17px] font-black text-[#102747] sm:text-[20px]">
          Gold Price Movement After FOMC Announcements
        </h3>

        <p className="mt-2 text-[12px] leading-6 text-slate-500">
          Median absolute price change in US dollars per
          troy ounce, based on 41 announcements since
          November 2021.
        </p>
      </figcaption>

      <div className="space-y-5">
        {intradayMoves.map((item) => (
          <div key={item.label}>

            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-[12px] font-black text-slate-700 sm:text-[14px]">
                {item.label}
              </span>

              <span
                dir="ltr"
                className="text-[13px] font-black text-[#1766b3] sm:text-[16px]"
              >
                ${item.value.toFixed(2)}
              </span>
            </div>

            <div className="h-[16px] overflow-hidden rounded-full bg-[#eaf0f7] sm:h-[21px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#145bb3] to-[#38bdf8]"
                style={{
                  width: `${(item.value / max) * 100}%`,
                }}
              />
            </div>

          </div>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-6 text-slate-500">
        Source: XAU Meter. Values represent absolute price
        changes relative to the pre-announcement reference
        price, not market direction or average trading profits.
      </p>

    </figure>
  );
}

function HistoricalReactionChart() {
  const max = Math.max(
    ...historicalReactions.map((item) =>
      Math.abs(item.move)
    )
  );

  return (
    <figure className="!mt-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">

      <figcaption className="mb-6">

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[20px]">
          Gold Price Changes 60 Minutes After Fed Decisions
        </h3>

        <p className="mt-2 text-[12px] leading-6 text-slate-500">
          USD price changes per troy ounce for the 2026
          FOMC meetings included in the published dataset.
        </p>

      </figcaption>

      <div className="space-y-5">

        {historicalReactions.map((item) => (
          <div key={item.date}>

            <div className="mb-2 flex items-center justify-between">

              <span
                dir="ltr"
                className="text-[12px] font-black text-slate-700"
              >
                {item.date}
              </span>

              <span
                dir="ltr"
                className={`text-[13px] font-black ${
                  item.move >= 0
                    ? "text-emerald-700"
                    : "text-red-700"
                }`}
              >
                {item.move >= 0 ? "+" : "−"}$
                {Math.abs(item.move).toFixed(2)}
              </span>

            </div>

            <div
              dir="ltr"
              className="relative h-[20px] overflow-hidden rounded-lg bg-slate-100"
            >

              <div className="absolute bottom-0 left-1/2 top-0 w-px bg-slate-400" />

              <div
                className={`absolute top-0 h-full rounded-sm ${
                  item.move >= 0
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${
                    (Math.abs(item.move) / max) * 50
                  }%`,

                  left:
                    item.move >= 0
                      ? "50%"
                      : `${
                          50 -
                          (Math.abs(item.move) / max) * 50
                        }%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

      <p className="mt-5 text-[11px] leading-6 text-slate-500">
        Source: XAU Meter. The figures measure the price
        change 60 minutes after each announcement relative
        to the pre-announcement reference price.
      </p>

    </figure>
  );
}

function LongerTermChart() {
  return (
    <figure className="!mt-7 rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">

      <h3 className="text-[17px] font-black text-[#102747] sm:text-[20px]">
        Frequency of Gold Price Gains Following Fed Decisions
      </h3>

      <div className="mt-6 space-y-5">

        {longerTermReactions.map((item) => (
          <div key={item.period}>

            <div className="mb-2 flex justify-between text-[13px] font-black">
              <span>{item.period}</span>

              <span
                dir="ltr"
                className="text-[#176ac8]"
              >
                {item.positive}
              </span>
            </div>

            <div className="h-5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#145bb3] to-[#38bdf8]"
                style={{
                  width: item.positive,
                }}
              />
            </div>

          </div>
        ))}

      </div>

      <p className="mt-5 text-[11px] leading-6 text-slate-500">
        Source: Regimic. Measurement begins at the opening
        of the next trading session following the announcement.
        These figures do not measure the immediate FOMC reaction.
      </p>

    </figure>
  );
}

function ResearchStatistics() {
  const stats = [
    {
      label: "FOMC Meetings Analyzed",
      value: String(researchStats.sample),
      detail: "Nov 2021 – Oct 2026",
      color: "text-[#176ac8]",
    },
    {
      label: "Mean Absolute 1-Hour Move",
      value: `$${researchStats.averageAbsoluteMove.toFixed(2)}`,
      detail: "USD per troy ounce",
      color: "text-[#176ac8]",
    },
    {
      label: "Gold Price Gains",
      value: `${researchStats.upPercent}%`,
      detail: "20 of 41 meetings",
      color: "text-emerald-700",
    },
    {
      label: "Gold Price Declines",
      value: `${researchStats.downPercent}%`,
      detail: "21 of 41 meetings",
      color: "text-red-700",
    },
    {
      label: "Largest 1-Hour Gain",
      value: `+$${researchStats.largestRise.toFixed(2)}`,
      detail: "July 29, 2026",
      color: "text-emerald-700",
    },
    {
      label: "Largest 1-Hour Decline",
      value: `−$${Math.abs(
        researchStats.largestFall
      ).toFixed(2)}`,
      detail: "September 16, 2026",
      color: "text-red-700",
    },
  ];

  return (
    <div className="!my-7 grid grid-cols-2 auto-rows-fr gap-2.5 sm:gap-4 lg:grid-cols-3">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="grid h-full min-w-0 grid-rows-[1fr_auto_1fr] items-center rounded-[15px] border border-slate-200 bg-[#f8fbff] px-2.5 py-3 text-center shadow-sm sm:rounded-[17px] sm:p-5"
        >

          <p className="flex min-h-[36px] items-center justify-center text-[10px] font-bold leading-[18px] text-slate-600 sm:min-h-[44px] sm:text-[13px] sm:leading-[22px]">
            {stat.label}
          </p>

          <p
            dir="ltr"
            className={`my-2 whitespace-nowrap text-center text-[clamp(19px,5.5vw,25px)] font-black leading-none tracking-tight tabular-nums sm:my-3 sm:text-[34px] ${stat.color}`}
          >
            {stat.value}
          </p>

          <p className="flex min-h-[28px] items-center justify-center text-[9px] leading-[15px] text-slate-500 sm:min-h-[32px] sm:text-[12px] sm:leading-5">
            {stat.detail}
          </p>

        </div>
      ))}

    </div>
  );
}

function DecisionImpactChart() {
  return (
    <figure className="!my-7 rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">

      <figcaption>

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          Gold Price Direction by Fed Interest Rate Decision
        </h3>

        <p className="mt-2 text-[12px] leading-7 text-slate-500">
          Comparison of positive and negative first-hour gold
          price changes across 41 FOMC meetings from 2021 to 2026.
        </p>

      </figcaption>

      <div className="my-5 flex flex-wrap gap-5 text-[12px] font-bold text-slate-600">

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-emerald-500" />
          Gold price gain
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-500" />
          Gold price decline
        </span>

      </div>

      <div className="space-y-6">

        {decisionStats.map((item) => (
          <div key={item.label}>

            <div className="mb-2 flex items-center justify-between gap-3">

              <span className="text-[13px] font-black text-[#102747] sm:text-[15px]">
                {item.label}
              </span>

              <span className="text-[11px] text-slate-500 sm:text-[12px]">
                {item.total} decisions
              </span>

            </div>

            <div
              dir="ltr"
              className="flex h-9 overflow-hidden rounded-[9px] sm:h-11"
            >

              <div
                className="flex items-center justify-center bg-emerald-600 text-[11px] font-black text-white sm:text-[13px]"
                style={{
                  width: `${item.upPercent}%`,
                }}
              >
                {item.upPercent}%
              </div>

              <div
                className="flex items-center justify-center bg-red-500 text-[11px] font-black text-white sm:text-[13px]"
                style={{
                  width: `${item.downPercent}%`,
                }}
              >
                {item.downPercent}%
              </div>

            </div>

            <p className="mt-2 text-[11px] text-slate-500">
              Gold rose in {item.up} cases and declined
              in {item.down} cases.
            </p>

          </div>
        ))}

      </div>

      <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] leading-6 text-slate-500">
        Analysis by Broker Alarab using XAU Meter data
        and official Federal Reserve interest rate records.
        These are descriptive historical statistics, not forecasts.
      </p>

    </figure>
  );
}

function ReversalStatistics() {
  const data = [
    {
      label: "1-minute vs. 60-minute direction",
      count: researchStats.reversalAfterOneMinute,
      percent: researchStats.reversalAfterOneMinutePercent,
    },
    {
      label: "5-minute vs. 60-minute direction",
      count: researchStats.reversalAfterFiveMinutes,
      percent: researchStats.reversalAfterFiveMinutesPercent,
    },
  ];

  return (
    <figure className="!my-7 rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">

      <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
        How Often Did Gold Reverse Its Initial FOMC Reaction?
      </h3>

      <div className="mt-6 space-y-6">

        {data.map((item) => (
          <div key={item.label}>

            <div className="mb-2 flex justify-between gap-3 text-[12px] font-black sm:text-[14px]">

              <span>{item.label}</span>

              <span
                dir="ltr"
                className="text-amber-700"
              >
                {item.percent}%
              </span>

            </div>

            <div className="h-6 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                style={{
                  width: `${item.percent}%`,
                }}
              />

            </div>

            <p className="mt-2 text-[11px] text-slate-500">
              {item.count} out of 41 meetings.
            </p>

          </div>
        ))}

      </div>

      <p className="mt-6 text-[11px] leading-6 text-slate-500">
        A directional reversal is defined as a difference
        in the sign of the price change at one or five
        minutes compared with the change at 60 minutes,
        using the same pre-announcement reference price.
      </p>

    </figure>
  );
}

function PercentageReactionChart() {
  const max = Math.max(
    ...percentageReactions.map((item) => item.mean)
  );

  return (
    <figure className="!my-7 rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">

      <figcaption>

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          Gold Price Movement by Time After FOMC Announcements
        </h3>

        <p className="mt-2 text-[12px] leading-7 text-slate-500">
          Mean and median absolute percentage changes
          relative to the pre-announcement gold price,
          based on 41 FOMC meetings.
        </p>

      </figcaption>

      <div className="my-6 flex flex-wrap gap-5 text-[12px] font-bold text-slate-600">

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#176ac8]" />
          Mean absolute change
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#38bdf8]" />
          Median absolute change
        </span>

      </div>

      <div className="space-y-7">

        {percentageReactions.map((item) => (
          <div key={item.period}>

            <h4 className="mb-3 text-[13px] font-black text-[#102747] sm:text-[15px]">
              {item.period}
            </h4>

            <div className="space-y-3">

              <div className="flex items-center gap-3">

                <div className="h-5 flex-1 overflow-hidden rounded-full bg-slate-100 sm:h-6">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#145bb3] to-[#176ac8]"
                    style={{
                      width: `${(item.mean / max) * 100}%`,
                    }}
                  />

                </div>

                <span
                  dir="ltr"
                  className="w-[66px] shrink-0 text-right text-[12px] font-black text-[#176ac8] sm:text-[14px]"
                >
                  {item.mean.toFixed(3)}%
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="h-5 flex-1 overflow-hidden rounded-full bg-slate-100 sm:h-6">

                  <div
                    className="h-full rounded-full bg-[#38bdf8]"
                    style={{
                      width: `${(item.median / max) * 100}%`,
                    }}
                  />

                </div>

                <span
                  dir="ltr"
                  className="w-[66px] shrink-0 text-right text-[12px] font-black text-sky-700 sm:text-[14px]"
                >
                  {item.median.toFixed(3)}%
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

      <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] leading-6 text-slate-500">
        Broker Alarab calculations based on the reference
        prices and price changes published by XAU Meter.
        Values measure absolute price movement, not market
        direction or realized investment returns.
      </p>

    </figure>
  );
}

function FAQItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 py-5 first:pt-0 last:border-0 last:pb-0">
      <h3 className="text-[15px] font-black leading-7 text-[#102747] sm:text-[17px]">
        {question}
      </h3>

      <div className="mt-2 text-[13px] leading-[2] text-slate-600 sm:text-[15px]">
        {children}
      </div>
    </div>
  );
}


/* =========================================================
   FEATURED BROKERS — ARTICLE INSERT
   Source: brokers table / Supabase
   Ranking: general published broker rating
   ========================================================= */

type ArticleBroker = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  rating: number | string | null;
  min_deposit: number | string | null;
  islamic_account: boolean | null;
};

async function getArticleGoldBrokers(): Promise<ArticleBroker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select(
      "id, name, slug, logo, rating, min_deposit, islamic_account"
    )
    .eq("publication_status", "published")
    .eq("is_full_review", true)
    .not("rating", "is", null)
    .not("slug", "is", null)
    .order("rating", { ascending: false })
    .limit(4);

  if (error) {
    console.error(
      "Article featured brokers:",
      error.message
    );

    return [];
  }

  return (data ?? []) as ArticleBroker[];
}

function FeaturedBrokerCard({
  broker,
  rank,
}: {
  broker: ArticleBroker;
  rank: number;
}) {
  const rating = Number(broker.rating);

  const ratingText =
    broker.rating !== null &&
    broker.rating !== undefined &&
    Number.isFinite(rating)
      ? rating.toFixed(1)
      : "—";

  const deposit =
    broker.min_deposit !== null &&
    broker.min_deposit !== undefined
      ? `$${broker.min_deposit}`
      : "Not specified";

  const reviewUrl = `/en/brokers/${broker.slug}`;

  return (
    <article
      dir="ltr"
      className="group relative min-w-0 overflow-hidden rounded-[15px] border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition duration-200 hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.09)] sm:rounded-[18px] sm:p-5"
    >

      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176ac8] via-[#38bdf8] to-transparent" />

      <div className="flex min-w-0 items-center gap-2.5 px-3 pb-2 pt-3.5 sm:gap-3 sm:p-0">

        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-slate-200 bg-white p-1.5 shadow-sm sm:h-[62px] sm:w-[62px] sm:rounded-[14px] sm:p-2">

          {broker.logo ? (
            <img
              src={broker.logo}
              alt={`${broker.name} logo`}
              width={50}
              height={50}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-[10px] font-black text-[#176ac8] sm:text-xs">
              {broker.name.slice(0, 2)}
            </span>
          )}

        </div>

        <div className="min-w-0 flex-1">

          <h3 className="min-w-0 break-words text-[15px] font-black leading-5 text-[#102747] sm:text-[19px] sm:leading-6">
            {broker.name}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:mt-1.5">

            <span className="text-[10px] font-bold text-slate-500 sm:text-[12px]">
              Overall rating
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-700 sm:text-[13px]">
              <span aria-hidden="true">★</span>
              {ratingText}
            </span>

          </div>

        </div>

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#eaf3ff] text-[11px] font-black text-[#1765b5] sm:h-8 sm:w-8 sm:rounded-[10px] sm:text-[12px]">
          {rank}
        </div>

      </div>

      <div className="mx-3 grid grid-cols-2 gap-2 sm:mx-0 sm:mt-4">

        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">

          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            Minimum deposit
          </p>

          <p className="mt-0.5 break-words text-[12px] font-black text-[#102747] sm:mt-1 sm:text-[14px]">
            {deposit}
          </p>

        </div>

        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">

          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            Islamic account
          </p>

          <p
            className={`mt-0.5 text-[12px] font-black sm:mt-1 sm:text-[13px] ${
              broker.islamic_account === true
                ? "text-emerald-700"
                : "text-slate-600"
            }`}
          >
            {broker.islamic_account === true
              ? "Available"
              : broker.islamic_account === false
              ? "Not available"
              : "Not specified"}
          </p>

        </div>

      </div>

      <div className="px-3 pb-3 pt-2.5 sm:mt-4 sm:px-0 sm:pb-0 sm:pt-0">

        <Link
          href={reviewUrl}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#176ac8] px-2 py-2.5 text-center text-[11px] font-black text-white transition hover:bg-[#10549f] sm:text-[13px]"
        >
          Read Broker Review
          <span aria-hidden="true">→</span>
        </Link>

      </div>

    </article>
  );
}

function FeaturedGoldBrokers({
  brokers,
}: {
  brokers: ArticleBroker[];
}) {
  return (
    <aside
      id="featured-gold-brokers"
      aria-label="Gold trading broker comparison"
      dir="ltr"
      className="relative my-9 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_12px_35px_rgba(15,23,42,0.04)] sm:my-12 sm:rounded-[24px]"
    >

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(120deg,#071a31_0%,#0a2e52_60%,#12518b_100%)] px-4 py-6 text-left sm:px-7 sm:py-7">

        <div className="pointer-events-none absolute -right-12 -top-24 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative">

          <span className="inline-flex rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1 text-[10px] font-black text-cyan-200">
            Broker Comparison
          </span>

          <h2 className="mt-3 text-[22px] font-black leading-[1.4] text-white sm:text-[27px]">
            Compare Gold Trading Brokers
          </h2>

          <p className="mt-2 max-w-[850px] text-[12px] leading-7 text-slate-200 sm:text-[14px] sm:leading-8">
            Explore broker reviews, regulatory licenses,
            account types and gold trading conditions
            before choosing a forex or CFD broker.
          </p>

        </div>

      </div>

      <div className="p-3 sm:p-5 lg:p-6">

        {brokers.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">

            {brokers.map((broker, index) => (
              <FeaturedBrokerCard
                key={broker.id}
                broker={broker}
                rank={index + 1}
              />
            ))}

          </div>
        )}

        <div className="mt-5 flex flex-col items-start gap-4 rounded-[15px] border border-blue-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

          <div className="min-w-0">

            <h3 className="text-[14px] font-black text-[#102747] sm:text-[16px]">
              Looking for a Gold Trading Broker?
            </h3>

            <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
              Compare trading conditions, regulations,
              account options and minimum deposits.
            </p>

          </div>

          <Link
            href="/en/best-brokers/gold"
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-[12px] border border-[#bfd8f3] bg-[#eaf3ff] px-5 py-3 text-center text-[12px] font-black text-[#145aa5] transition hover:border-blue-400 hover:bg-blue-100 sm:w-auto sm:text-[13px]"
          >
            Best Gold Trading Brokers
            <span aria-hidden="true">→</span>
          </Link>

        </div>

        {brokers.length > 0 && (
          <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
            Featured brokers are ranked by their published
            overall ratings, not by a separate assessment
            of gold trading costs. Trading conditions may
            vary by jurisdiction and regulatory entity.
          </p>
        )}

      </div>

    </aside>
  );
}


/* =========================================================
   STRUCTURED DATA
   ========================================================= */

function ArticleStructuredData() {
  if (!ARTICLE_READY) {
    return null;
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    "@id": `${URL}#article`,

    headline: ARTICLE.title,
    description: ARTICLE.description,

    ...(HERO_IMAGE_READY
      ? {
          image: {
            "@type": "ImageObject",
            url: `${SITE}${HERO_IMAGE}`,
            width: 1774,
            height: 887,
          },
        }
      : {}),

    inLanguage: "en",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": URL,
    },

    url: URL,

    datePublished: ARTICLE.published,
    dateModified: ARTICLE.modified,

    articleSection: ARTICLE.subcategory,

    author: {
      "@type": "Organization",
      name: ARTICLE.publisher,
      url: `${SITE}/en`,
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

    keywords: ARTICLE_KEYWORDS,

    about: [
      {
        "@type": "Thing",
        name: "Gold",
      },
      {
        "@type": "Organization",
        name: "Federal Reserve",
        url: "https://www.federalreserve.gov/",
      },
      {
        "@type": "Thing",
        name: "Monetary Policy",
      },
      {
        "@type": "Thing",
        name: "Interest Rates",
      },
      {
        "@type": "Thing",
        name: "XAUUSD",
      },
    ],

    citation: sources.map((source) => ({
      "@type": "CreativeWork",
      name: source.title,
      url: source.url,
    })),
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
        name: ARTICLE.title,
        item: URL,
      },
    ],
  };

  const serialize = (value: unknown) =>
    JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialize(articleJsonLd),
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
   MAIN ARTICLE PAGE
   ========================================================= */

export default async function GoldFedDecisionsArticlePage() {
  const featuredGoldBrokers = FEATURED_BROKERS_READY
    ? await getArticleGoldBrokers()
    : [];

  return (
    <main
      dir="ltr"
      lang="en"
      className="min-h-screen overflow-x-clip bg-[#f5f7fb] text-slate-900"
    >

      <ArticleStructuredData />

      {/* HEADER / ARTICLE INTRO */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1520px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-9">

          {/* BREADCRUMB */}

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 sm:text-[12px]"
          >

            <Link
              href="/en"
              className="transition hover:text-blue-600"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <span>{ARTICLE.category}</span>

            <span aria-hidden="true">/</span>

            <span className="text-[#145ca8]">
              {ARTICLE.breadcrumb}
            </span>

          </nav>

          {/* ARTICLE CATEGORY */}

          <div className="mt-6 flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-[#eaf3ff] px-3 py-1.5 text-[10px] font-black text-[#1765b5] sm:text-[11px]">
              {ARTICLE.subcategory}
            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">
              {ARTICLE.articleType}
            </span>

          </div>

          {/* MAIN TITLE */}

          <h1 className="mt-5 w-full text-[27px] font-black leading-[1.3] tracking-[-0.025em] text-[#0c1e38] sm:text-[34px] lg:text-[clamp(29px,3vw,48px)]">

            {ARTICLE.titleMain}{" "}

            <span className="text-[#176ac8]">
              {ARTICLE.titleHighlight}
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="mt-4 w-full max-w-none text-[14px] leading-[1.85] text-slate-600 sm:text-[17px] sm:leading-[1.85]">
            {ARTICLE.description}
          </p>

          {/* ARTICLE METADATA */}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-500 sm:text-[12px]">

            <span>
              By{" "}
              <strong className="text-[#102747]">
                Broker Alarab Research Team
              </strong>
            </span>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <time dateTime={ARTICLE.modified}>
              Last updated:{" "}
              {new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(ARTICLE.modified))}
            </time>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <span>{ARTICLE.articleType}</span>

          </div>

          <ArticleHeroImage />

        </div>

      </header>

      {/* ARTICLE BODY */}

      <div className="mx-auto max-w-[1520px] px-3 py-6 sm:px-6 sm:py-10">

        <article className="overflow-hidden rounded-[19px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.035)] sm:rounded-[24px]">

          <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-12">

            {/* INTRODUCTION */}

            <div className="space-y-5 text-[14px] leading-[1.85] text-slate-700 sm:text-[16px] sm:leading-[1.9]">

              <Paragraph>
                Federal Reserve interest rate decisions
                are among the most closely watched economic
                events in the global gold market. Changes
                in US monetary policy can influence the
                US dollar, Treasury yields, inflation
                expectations and investor demand for
                precious metals.
              </Paragraph>

              <Paragraph>
                A widely held assumption among gold
                traders is that higher interest rates
                push gold prices lower, while interest
                rate cuts support higher prices.
                Historical market reactions, however,
                reveal a more complex relationship.
              </Paragraph>

              <Paragraph>
                Gold can rally following a Fed rate hike,
                decline after a rate cut or experience
                substantial price movements even when
                the Federal Reserve leaves interest rates
                unchanged.
              </Paragraph>

              <Paragraph>
                In this statistical research report,{" "}
                <Strong>Broker Alarab</Strong>{" "}
                examines published XAU/USD price reactions
                across 41 Federal Open Market Committee
                (FOMC) meetings between November 2021
                and October 2026.
              </Paragraph>

              <Paragraph>
                The analysis compares gold price direction,
                absolute price changes, percentage
                movements and directional reversals
                following rate hikes, rate cuts and
                unchanged interest rate decisions.
                It also examines separate historical
                research covering gold performance during
                the trading sessions following Fed announcements.
              </Paragraph>

            </div>

            <TableOfContents />

            {/* SUMMARY */}

            <ArticleSection
              id="summary"
              eyebrow="Key Research Findings"
              title="Gold Price Reaction to 41 FOMC Decisions: Key Statistics"
            >

              <Paragraph>
                The Broker Alarab research team reanalyzed
                published historical gold price data
                covering 41 FOMC meetings from November
                3, 2021, to October 28, 2026.
                Each meeting was classified according
                to whether the Federal Reserve raised,
                reduced or maintained its target
                interest rate range.
              </Paragraph>

              <ResearchStatistics />

              <ArticleList
                items={[
                  <>
                    Gold prices increased one hour after
                    the announcement in{" "}
                    <Strong>20 out of 41 meetings</Strong>,
                    compared with 21 price declines.
                  </>,

                  <>
                    The mean absolute first-hour price
                    change was{" "}
                    <Strong>$19.21 per troy ounce</Strong>,
                    while the median was $9.72.
                  </>,

                  <>
                    Gold increased following{" "}
                    <Strong>66.67% of rate hikes</Strong>{" "}
                    included in the historical sample.
                  </>,

                  <>
                    Gold increased following only{" "}
                    <Strong>33.33% of rate cuts</Strong>{" "}
                    included in the sample.
                  </>,

                  <>
                    The initial one-minute price direction
                    differed from the direction recorded
                    after 60 minutes in{" "}
                    <Strong>36.59% of meetings</Strong>.
                  </>,

                  <>
                    Separate external research covering
                    95 Fed decisions found no consistent
                    bullish or bearish direction during
                    subsequent trading sessions.
                  </>,
                ]}
              />

              <Note title="The Main Research Finding">

                Historical gold price movements cannot
                be reliably predicted from the direction
                of the Federal Reserve interest rate
                decision alone.

                Gold rose after several rate hikes and
                declined after several rate cuts,
                highlighting the importance of market
                expectations, real yields and forward
                guidance.

              </Note>

              <Paragraph>
                These findings must be interpreted within
                the limitations of the historical sample.
                Only six rate cuts are represented, and
                the observed frequencies should not be
                treated as stable probabilities for
                future FOMC meetings.
              </Paragraph>

            </ArticleSection>

            {/* FED IMPACT */}

            <ArticleSection
              id="fed-impact"
              eyebrow="Monetary Policy"
              title="How Do Federal Reserve Interest Rate Decisions Affect Gold Prices?"
            >

              <Paragraph>
                Gold is a non-yielding asset. Unlike
                interest-bearing investments such as
                US Treasury securities, holding physical
                gold does not generate regular interest
                income.
              </Paragraph>

              <Paragraph>
                As real interest rates rise, the
                opportunity cost of holding gold may
                increase. Conversely, declining real
                yields can make gold relatively more
                attractive to investors seeking to
                preserve purchasing power or diversify
                their portfolios.
              </Paragraph>

              <SubHeading>
                The Theoretical Relationship Between
                Interest Rates and Gold
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "Fed decision",
                  "Potential USD impact",
                  "Potential gold impact",
                ]}
                rows={[
                  ["Rate hike", "Stronger", "Downward pressure"],
                  ["Rate cut", "Weaker", "Upward support"],
                  [
                    "Rate hold",
                    "Expectation-dependent",
                    "Undetermined",
                  ],
                ]}
                caption="Illustrative economic relationships, assuming other factors remain unchanged. These are not statistical results or fixed trading rules."
              />

              <Paragraph>
                The actual market reaction also depends
                on the difference between the announced
                decision and the outcome investors
                expected before the meeting.
              </Paragraph>

              <Paragraph>
                Financial markets often price in
                anticipated interest rate changes well
                before the FOMC announcement. As a result,
                unexpected policy signals can be more
                influential than the announced rate
                decision itself.
              </Paragraph>

            </ArticleSection>

            {/* FIRST MINUTES */}

            <ArticleSection
              id="first-minutes"
              eyebrow="Immediate Market Reaction"
              title="What Happens to Gold Prices in the First Minutes After an FOMC Announcement?"
            >

              <Paragraph>
                Gold prices can react rapidly when the
                Federal Reserve releases its monetary
                policy statement. Traders reassess
                interest rate expectations, while
                automated trading systems respond to
                newly released information.
              </Paragraph>

              <Paragraph>
                Examining gold price changes at
                different time intervals helps
                distinguish the immediate announcement
                reaction from movements that develop
                as markets absorb additional information.
              </Paragraph>

              <IntradayMovementChart />

              <Paragraph>
                According to the published historical
                dataset, the median absolute gold price
                change increased from $4.98 after one
                minute to $9.72 after 60 minutes.
              </Paragraph>

              <Paragraph>
                These figures measure the magnitude of
                the observed price change at each
                measurement point. They do not identify
                whether gold increased or decreased
                during the interval.
              </Paragraph>

              <Note title="How to Interpret the Chart">

                A larger absolute price change does not
                necessarily indicate a bullish reaction.
                The values represent historical price
                displacement rather than achievable
                trading profits or the full high-low
                range during the interval.

              </Note>

            </ArticleSection>

            {/* FIRST HOUR */}

            <ArticleSection
              id="first-hour"
              eyebrow="First-Hour Market Movement"
              title="Gold Price Volatility During the First Hour After Fed Rate Decisions"
            >

              <Paragraph>
                Market reactions do not necessarily end
                when the initial interest rate decision
                is announced. Investors continue to
                assess the accompanying statement,
                economic projections and the Federal
                Reserve Chair&apos;s press conference
                when one takes place.
              </Paragraph>

              <Paragraph>
                As expectations for future monetary
                policy evolve, the price direction
                recorded after 60 minutes can differ
                significantly from the initial reaction.
              </Paragraph>

              <HistoricalReactionChart />

              <Paragraph>
                The historical examples illustrate
                substantial variation in first-hour gold
                price movements. Even meetings that
                produce no change in interest rates
                may be accompanied by significant
                market reactions.
              </Paragraph>

              <Note
                title="Execution Risks During High-Impact News"
                tone="amber"
              >
                Rapid price changes may coincide with
                wider bid-ask spreads, reduced liquidity
                and increased slippage. Actual execution
                prices and trading results can differ
                materially from the movements displayed
                in historical price charts.
              </Note>

            </ArticleSection>

            {/* HISTORICAL REACTIONS */}

            <ArticleSection
              id="historical-reactions"
              eyebrow="Historical FOMC Data"
              title="Historical Gold Price Reactions to Fed Interest Rate Decisions in 2026"
            >

              <Paragraph>
                The following table presents the 2026
                FOMC meetings included in the published
                dataset, with gold price changes measured
                in US dollars per troy ounce, 60 minutes
                after each announcement.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "FOMC date",
                  "60-minute change",
                  "Direction",
                ]}
                rows={historicalReactions.map((item) => [
                  item.date,

                  `${item.move >= 0 ? "+" : "−"}$${Math.abs(
                    item.move
                  ).toFixed(2)}`,

                  item.move >= 0
                    ? "Higher"
                    : "Lower",
                ])}
                caption="Source: XAU Meter. Published historical measurements; the underlying raw prices were not independently collected by Broker Alarab."
              />

              <Paragraph>
                Within the full 41-meeting sample, the
                largest positive first-hour dollar change
                occurred on July 29, 2026, when gold
                increased by $62.32 per ounce.
              </Paragraph>

              <Paragraph>
                The largest negative dollar change
                occurred on September 16, 2026,
                when gold declined by $99.40 per ounce
                relative to its pre-announcement
                reference price.
              </Paragraph>

              <Paragraph>
                These figures demonstrate why the average
                response to historical meetings should
                not be interpreted as a precise forecast
                of the next FOMC announcement.
              </Paragraph>

            </ArticleSection>

            {/* PERCENTAGE REACTIONS */}

            <ArticleSection
              id="percentage-reactions"
              eyebrow="Relative Statistical Analysis"
              title="Gold Price Reactions to FOMC Announcements in Percentage Terms"
            >

              <Paragraph>
                Measuring gold price movements solely
                in US dollars can produce an incomplete
                comparison when historical observations
                span several years and substantially
                different gold price levels.
              </Paragraph>

              <Paragraph>
                For example, a $20 change when gold
                trades at $2,000 per ounce represents
                a 1% movement, whereas the same dollar
                change at $4,000 per ounce represents
                only 0.5%.
              </Paragraph>

              <Paragraph>
                To improve comparability across years,
                Broker Alarab recalculated percentage
                price changes for each of the 41
                historical observations using the
                corresponding pre-announcement
                reference price.
              </Paragraph>

              <PercentageReactionChart />

              <ArticleDataTable
                headers={[
                  "Time after release",
                  "Mean absolute change",
                  "Median absolute change",
                ]}
                rows={percentageReactions.map((item) => [
                  item.period,
                  `${item.mean.toFixed(3)}%`,
                  `${item.median.toFixed(3)}%`,
                ])}
                caption="Broker Alarab calculations based on 41 FOMC meetings between November 2021 and October 2026."
              />

              <Paragraph>
                The mean absolute percentage change
                was approximately 0.239% after one
                minute and 0.647% after 60 minutes,
                compared with a median absolute
                first-hour change of 0.531%.
              </Paragraph>

              <Paragraph>
                The difference between the mean and
                median reflects the influence of
                unusually large observations.
                The median can therefore provide
                a more representative description
                of a typical observation, while
                the mean incorporates the full
                magnitude of extreme movements.
              </Paragraph>

              <SubHeading>
                Percentage Price Changes by Fed Decision Type
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "Fed decision",
                  "Meetings",
                  "Mean absolute move",
                  "Median absolute move",
                ]}
                rows={percentageDecisionStats.map((item) => [
                  item.label,
                  item.sample,
                  `${item.mean.toFixed(3)}%`,
                  `${item.median.toFixed(3)}%`,
                ])}
                caption="All values represent absolute percentage changes measured 60 minutes after the FOMC announcement."
              />

              <Paragraph>
                Rate hikes recorded the largest mean
                absolute percentage change within
                the historical sample, at approximately
                0.738%, compared with 0.626% following
                rate cuts and 0.605% following
                unchanged interest rate decisions.
              </Paragraph>

              <Paragraph>
                This differs from the ranking based
                on dollar changes, in which rate cuts
                recorded the largest mean absolute
                movement. The distinction illustrates
                the importance of normalizing price
                changes when comparing observations
                from different years.
              </Paragraph>

              <Note title="Statistical Interpretation">

                These results do not establish that
                rate hikes necessarily cause greater
                gold price movements.

                Sample sizes differ between decision
                categories, as do economic conditions,
                market expectations and prevailing
                gold price levels.

              </Note>

              <SubHeading>
                Largest Dollar and Percentage Gold Price Reactions
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "FOMC date",
                  "Movement type",
                  "Reference price",
                  "USD change",
                  "Percentage change",
                ]}
                rows={percentageExtremes.map((item) => [
                  item.date,

                  item.type,

                  `$${item.referencePrice.toFixed(2)}`,

                  `${item.dollarChange >= 0 ? "+" : "−"}$${Math.abs(
                    item.dollarChange
                  ).toFixed(2)}`,

                  `${item.percentChange >= 0 ? "+" : "−"}${Math.abs(
                    item.percentChange
                  ).toFixed(3)}%`,
                ])}
                caption="Extreme changes measured at the 60-minute observation point. These are not the highest or lowest prices reached during the full hour."
              />

              <Paragraph>
                The December 13, 2023, meeting recorded
                the largest percentage gain in the
                sample, with gold rising approximately
                1.593%, equivalent to $31.57 per ounce.
              </Paragraph>

              <Paragraph>
                The July 29, 2026, meeting recorded
                the largest dollar gain of $62.32.
                However, because the reference gold
                price was higher, this represented
                a smaller percentage increase of
                approximately 1.541%.
              </Paragraph>

              <Paragraph>
                The September 16, 2026, meeting
                produced the largest negative change
                in both dollar and percentage terms.
                Gold declined by $99.40 per ounce,
                equivalent to approximately 2.280%
                of its pre-announcement reference price.
              </Paragraph>

              <Note title="Broker Alarab Research Insight">

                Combining dollar-based and percentage-based
                measurements provides a more comprehensive
                view of historical gold price movements,
                particularly when comparing FOMC meetings
                held under different market conditions
                and price levels.

              </Note>

            </ArticleSection>

            {/* LONGER TERM */}

            <ArticleSection
              id="longer-term"
              eyebrow="Post-FOMC Market Performance"
              title="How Does Gold Perform in the Days and Weeks Following Fed Decisions?"
            >

              <Paragraph>
                Gold price performance over subsequent
                trading sessions differs from the
                immediate response to monetary policy
                announcements.
              </Paragraph>

              <Paragraph>
                As the measurement period expands,
                additional economic releases, geopolitical
                developments, changes in bond yields
                and investor sentiment may influence
                gold prices.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Period",
                  "Observations",
                  "Positive frequency",
                  "Median change",
                ]}
                rows={longerTermReactions.map((item) => [
                  item.period,
                  item.sample,
                  item.positive,
                  item.median,
                ])}
                caption="Source: Regimic. Measurements begin at the opening of the next trading session after each Fed announcement."
              />

              <LongerTermChart />

              <Paragraph>
                The external study reported positive
                gold performance in 43% of observations
                over the first session, 45% over five
                sessions and 55% over 20 sessions.
              </Paragraph>

              <Paragraph>
                Median performance was slightly negative
                over the first and five-session horizons,
                while the 20-session median was positive
                at 0.86%.
              </Paragraph>

              <Note title="Important Methodological Distinction">

                The longer-term study must not be
                combined with the 41-meeting intraday
                sample as though both were a single
                statistical dataset.

                The measurement windows, reference
                prices and sample sizes differ between
                the two sources.

              </Note>

            </ArticleSection>

            {/* RATE HIKE */}

            <ArticleSection
              id="rate-hike"
              eyebrow="Historical Rate Hike Analysis"
              title="What Happens to Gold When the Fed Raises Interest Rates?"
            >

              <Paragraph>
                Rising interest rates are commonly
                associated with downward pressure
                on gold because they can increase
                the opportunity cost of holding
                non-yielding assets.
              </Paragraph>

              <Paragraph>
                This relationship may be particularly
                relevant when higher policy rates are
                accompanied by rising real Treasury
                yields and a stronger US dollar.
              </Paragraph>

              <Paragraph>
                However, the historical first-hour
                reactions examined in this report
                demonstrate that this relationship
                does not operate as a fixed short-term
                trading rule.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Metric",
                  "Result",
                ]}
                rows={[
                  ["Rate hikes analyzed", 12],
                  ["Gold price gains", 8],
                  ["Gold price declines", 4],
                  ["Positive reaction frequency", "66.67%"],
                  ["Mean absolute change", "$18.39"],
                  ["Median absolute change", "$11.41"],
                ]}
                caption="Broker Alarab calculations using gold price changes measured 60 minutes after the announcement."
              />

              <SubHeading>
                Why Can Gold Rise After a Fed Rate Hike?
              </SubHeading>

              <Paragraph>
                A rate hike that has already been
                anticipated by financial markets may
                generate a limited reaction when
                officially announced.
              </Paragraph>

              <Paragraph>
                If the announcement suggests a slower
                pace of future tightening or an
                approaching end to the hiking cycle,
                Treasury yields and the US dollar
                may decline despite the increase
                in the policy rate.
              </Paragraph>

              <Paragraph>
                These developments may support gold
                prices, even when the Federal Reserve
                raises interest rates.
              </Paragraph>

              <Note title="Interpreting the 66.67% Figure">

                The observed positive reaction
                frequency does not establish that
                buying gold after every rate hike
                is a profitable trading strategy.

                The sample includes only 12 rate hikes
                and excludes execution costs, spreads
                and commissions.

              </Note>

            </ArticleSection>

            {/* RATE CUT */}

            <ArticleSection
              id="rate-cut"
              eyebrow="Historical Rate Cut Analysis"
              title="Does Gold Always Rise When the Fed Cuts Interest Rates?"
            >

              <Paragraph>
                Interest rate cuts are generally
                viewed as potentially supportive
                for gold because they may reduce
                the returns available from
                interest-bearing assets.
              </Paragraph>

              <Paragraph>
                Nevertheless, the immediate market
                response in the historical sample
                did not consistently follow this
                theoretical relationship.
              </Paragraph>

              <Paragraph>
                Gold declined during the first hour
                following four of the six rate cuts
                included in the study.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Metric",
                  "Result",
                ]}
                rows={[
                  ["Rate cuts analyzed", 6],
                  ["Gold price gains", 2],
                  ["Gold price declines", 4],
                  ["Positive reaction frequency", "33.33%"],
                  ["Mean absolute change", "$21.01"],
                  ["Median absolute change", "$23.72"],
                ]}
                caption="Broker Alarab calculations based on the historical FOMC sample."
              />

              <SubHeading>
                Why Can Gold Fall After an Interest Rate Cut?
              </SubHeading>

              <Paragraph>
                If financial markets anticipate a
                larger reduction in interest rates
                than the one announced, the actual
                decision may be interpreted as
                relatively restrictive.
              </Paragraph>

              <Paragraph>
                For example, if investors expect
                a 50-basis-point rate cut and the
                Federal Reserve delivers only
                25 basis points, the decision may
                be perceived as more hawkish than
                anticipated.
              </Paragraph>

              <Paragraph>
                Similarly, guidance suggesting fewer
                future cuts can support the dollar
                or real yields, potentially placing
                downward pressure on gold.
              </Paragraph>

              <Note
                title="Sample Size Limitation"
                tone="amber"
              >
                Only six rate cuts are included in
                this category. The results should not
                be generalized to all historical
                monetary easing cycles or interpreted
                as a reliable forecast of future
                rate-cut reactions.
              </Note>

            </ArticleSection>

            {/* RATE HOLD */}

            <ArticleSection
              id="rate-hold"
              eyebrow="Unchanged Interest Rate Decisions"
              title="How Does Gold React When the Federal Reserve Holds Interest Rates Steady?"
            >

              <Paragraph>
                Leaving interest rates unchanged does
                not necessarily make an FOMC meeting
                less significant for gold traders.
              </Paragraph>

              <Paragraph>
                Financial markets respond not only
                to the current interest rate level,
                but also to information about the
                future direction of monetary policy.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Metric",
                  "Result",
                ]}
                rows={[
                  ["Rate holds analyzed", 23],
                  ["Gold price gains", 10],
                  ["Gold price declines", 13],
                  ["Positive reaction frequency", "43.48%"],
                  ["Mean absolute change", "$19.17"],
                  ["Median absolute change", "$9.52"],
                ]}
                caption="Gold price changes measured 60 minutes after the announcement. Calculations by Broker Alarab."
              />

              <SubHeading>
                Comparing Rate Hikes, Rate Cuts and Rate Holds
              </SubHeading>

              <DecisionImpactChart />

              <ArticleDataTable
                headers={[
                  "Decision type",
                  "Meetings",
                  "Positive frequency",
                  "Mean absolute move",
                  "Median absolute move",
                ]}
                rows={decisionStats.map((item) => [
                  item.label,
                  item.total,
                  `${item.upPercent}%`,
                  `$${item.averageMove.toFixed(2)}`,
                  `$${item.medianMove.toFixed(2)}`,
                ])}
                caption="Broker Alarab statistical analysis of 41 historical FOMC meetings."
              />

              <Paragraph>
                Mean absolute first-hour dollar changes
                were relatively similar across the three
                decision categories, ranging from
                $18.39 to $21.01 per troy ounce.
              </Paragraph>

              <Paragraph>
                However, differences in gold price
                levels, sample sizes and underlying
                market conditions prevent these figures
                from establishing that any particular
                decision type consistently causes
                greater volatility.
              </Paragraph>

              <SubHeading>
                Does the Initial Gold Price Direction
                Continue After the Announcement?
              </SubHeading>

              <ReversalStatistics />

              <Paragraph>
                The study identified 15 meetings in
                which the price direction after one
                minute differed from the direction
                recorded after 60 minutes.
              </Paragraph>

              <Paragraph>
                When the five-minute price direction
                was compared with the 60-minute
                direction, 13 meetings recorded
                different directional outcomes.
              </Paragraph>

              <Note title="Implications for Gold Traders">

                These statistics illustrate why the
                first price reaction following an
                FOMC announcement should not be
                treated as a reliable indication
                of the direction gold will take
                during the rest of the hour.

                The study measures directional
                differences between specific
                observation points, not every
                reversal that occurred between them.

              </Note>

            </ArticleSection>

            {/* BROKER INSERT */}

            <FeaturedGoldBrokers
              brokers={featuredGoldBrokers}
            />

            {/* PRESS CONFERENCE */}

            <ArticleSection
              id="press-conference"
              eyebrow="Federal Reserve Forward Guidance"
              title="How the Fed Chair's Press Conference Influences Gold Prices"
            >

              <Paragraph>
                The Federal Reserve Chair&apos;s press
                conference provides additional
                information about how policymakers
                interpret economic conditions and
                what developments may influence
                future interest rate decisions.
              </Paragraph>

              <Paragraph>
                Market participants may revise their
                interpretation of the monetary policy
                statement as new information emerges
                during the press conference.
              </Paragraph>

              <Paragraph>
                This process can influence the US
                dollar, Treasury yields and gold
                prices, potentially contributing to
                a reversal of the initial market
                reaction.
              </Paragraph>

              <SubHeading>
                What Do Financial Markets Watch During FOMC Meetings?
              </SubHeading>

              <ArticleList
                items={[
                  "The Federal Reserve's assessment of inflation and price stability.",

                  "Economic growth and employment expectations.",

                  "Signals regarding the timing and direction of future interest rate decisions.",

                  "The willingness of policymakers to tighten or ease monetary policy.",

                  "Changes in the degree of uncertainty surrounding the economic outlook.",
                ]}
              />

              <Paragraph>
                It is important to note that the
                first-hour statistics in this report
                do not separately isolate the effect
                of the interest rate announcement
                from the effect of the accompanying
                press conference.
              </Paragraph>

            </ArticleSection>

            {/* DOLLAR AND YIELDS */}

            <ArticleSection
              id="dollar-yields"
              eyebrow="Macroeconomic Drivers"
              title="The Relationship Between Gold, the US Dollar and Treasury Yields"
            >

              <Paragraph>
                Gold prices are influenced by several
                interconnected macroeconomic variables,
                particularly the strength of the US
                dollar, real Treasury yields and
                inflation expectations.
              </Paragraph>

              <Paragraph>
                Because gold is commonly quoted in US
                dollars, changes in the value of the
                dollar can affect its relative cost
                for international investors.
              </Paragraph>

              <Paragraph>
                Real yields also influence the
                opportunity cost of holding gold
                relative to interest-bearing
                financial assets.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "Economic variable",
                  "Change",
                  "Potential gold impact",
                ]}
                rows={[
                  [
                    "US dollar",
                    "Strengthens",
                    "Downward pressure",
                  ],
                  [
                    "US dollar",
                    "Weakens",
                    "Upward support",
                  ],
                  [
                    "Real Treasury yields",
                    "Increase",
                    "Downward pressure",
                  ],
                  [
                    "Real Treasury yields",
                    "Decrease",
                    "Upward support",
                  ],
                  [
                    "Economic uncertainty",
                    "Increases",
                    "May support demand",
                  ],
                ]}
                caption="Potential economic relationships assuming other factors remain unchanged. These outcomes are not guaranteed."
              />

              <Paragraph>
                For a broader historical perspective
                on monetary policy, inflation and
                major gold market declines, see our
                research on the{" "}

                <Link
                  href="/en/articles/gold-price-crashes-history"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  biggest gold price crashes in history
                </Link>

                .
              </Paragraph>

            </ArticleSection>

            {/* TRADING RISKS */}

            <ArticleSection
              id="trading-risks"
              eyebrow="Trading and Risk Management"
              title="Risks of Trading Gold During FOMC Interest Rate Announcements"
            >

              <Paragraph>
                Trading conditions during high-impact
                economic announcements can differ
                substantially from normal market
                conditions.
              </Paragraph>

              <Paragraph>
                Rapid changes in gold prices may be
                accompanied by reduced market liquidity,
                increased execution uncertainty and
                changes in the trading conditions
                offered by forex and CFD brokers.
              </Paragraph>

              <ArticleList
                items={[
                  "Wider bid-ask spreads during periods of heightened market activity.",

                  "Increased risk of slippage when entering or closing positions.",

                  "Stop-loss orders potentially executing at prices different from their specified levels.",

                  "Greater financial exposure and potential losses when using leverage.",

                  "Directional reversals following the release of new information or forward guidance.",
                ]}
              />

              <Paragraph>
                Traders can use the Broker Alarab{" "}

                <Link
                  href="/en/tools/risk-calculator"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  trading risk calculator
                </Link>

                {" "}and{" "}

                <Link
                  href="/en/tools/margin-calculator"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  margin calculator
                </Link>

                {" "}to better understand their
                financial exposure and margin
                requirements before placing trades.
              </Paragraph>

              <Note
                title="Important Risk Warning"
                tone="amber"
              >
                Stop-loss orders do not guarantee
                execution at the specified price
                during volatile market conditions.
                Leveraged gold and CFD trading can
                result in rapid and substantial
                financial losses.
              </Note>

            </ArticleSection>

            {/* FAQ */}

            <ArticleSection
              id="faq"
              eyebrow="Frequently Asked Questions"
              title="Frequently Asked Questions About Gold Prices and Fed Interest Rates"
            >

              <div className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4 sm:p-6">

                <FAQItem question="Does gold go down when the Fed raises interest rates?">
                  Not necessarily. Higher interest rates
                  and real Treasury yields can place
                  downward pressure on gold, but the
                  actual reaction also depends on
                  market expectations, the US dollar
                  and future monetary policy guidance.
                  In the historical sample examined
                  here, gold increased after eight
                  of the 12 rate hikes.
                </FAQItem>

                <FAQItem question="Does gold always rise when the Federal Reserve cuts interest rates?">
                  No. Gold may rise or fall depending
                  on the size of the rate cut relative
                  to expectations, changes in real
                  yields and the Federal Reserve&apos;s
                  guidance regarding future interest
                  rate decisions.
                </FAQItem>

                <FAQItem question="Why does gold move when the Fed keeps interest rates unchanged?">
                  Financial markets respond to new
                  information about inflation, economic
                  growth, employment and the expected
                  future path of monetary policy.
                  An unchanged policy rate can still
                  be accompanied by unexpected
                  information that affects gold prices.
                </FAQItem>

                <FAQItem question="Can traders predict gold prices before an FOMC meeting?">
                  Traders can evaluate market
                  expectations and potential scenarios,
                  but the direction of gold prices
                  cannot be guaranteed. Unexpected
                  decisions or statements may cause
                  reactions that differ substantially
                  from prevailing expectations.
                </FAQItem>

                <FAQItem question="Is trading XAUUSD during FOMC announcements risky?">
                  Gold trading during FOMC announcements
                  may involve increased price movements,
                  wider spreads, slippage and reduced
                  execution certainty. Leverage may
                  amplify the resulting financial losses.
                </FAQItem>

                <FAQItem question="Why are real interest rates important for gold prices?">
                  Real interest rates affect the
                  opportunity cost of holding gold,
                  which does not provide regular
                  interest income. Changes in real
                  Treasury yields can therefore
                  influence the relative attractiveness
                  of gold compared with interest-bearing
                  investments.
                </FAQItem>

              </div>

            </ArticleSection>

            {/* CONCLUSION */}

            <ArticleSection
              id="conclusion"
              eyebrow="Research Conclusion"
              title="Can Fed Interest Rate Decisions Reliably Predict Gold Price Movements?"
            >

              <Paragraph>
                Federal Reserve monetary policy is
                an important driver of the global
                gold market. However, reducing the
                relationship to a fixed rule in
                which rate hikes cause gold prices
                to fall and rate cuts cause them
                to rise does not adequately explain
                historical market behavior.
              </Paragraph>

              <Paragraph>
                The analysis of 41 FOMC meetings
                found that gold increased after
                20 announcements and declined after
                21 during the first hour.
              </Paragraph>

              <Paragraph>
                Gold also rose following eight of
                the 12 rate hikes included in the
                sample, while declining following
                four of the six rate cuts.
                These observations illustrate the
                limitations of relying solely on
                the direction of the interest
                rate decision.
              </Paragraph>

              <Paragraph>
                A more comprehensive interpretation
                requires consideration of market
                expectations, the US dollar, real
                Treasury yields and the information
                communicated through Federal Reserve
                statements and press conferences.
              </Paragraph>

              <Paragraph>
                It is equally important to distinguish
                between the direction of a price
                change and its magnitude, as well
                as between immediate market reactions
                and performance over subsequent
                trading sessions.
              </Paragraph>

              <Note title="Final Research Perspective">

                Historical FOMC data can improve
                understanding of gold market behavior,
                but it does not provide a guaranteed
                trading signal or establish a reliable
                probability of future price direction.

              </Note>

            </ArticleSection>

            {/* METHODOLOGY AND SOURCES */}

            <ArticleSection
              id="methodology"
              eyebrow="Research Transparency"
              title="Research Methodology, Historical FOMC Data and Sources"
            >

              <Paragraph>
                This research report is based on
                a secondary statistical analysis of
                published historical gold price
                observations, matched with official
                Federal Reserve interest rate records.
              </Paragraph>

              <Paragraph>
                The objective is to describe historical
                gold price behavior at predefined
                intervals following FOMC announcements,
                rather than establish a causal
                relationship or test the profitability
                of a trading strategy.
              </Paragraph>

              <SubHeading>
                Historical Sample and Research Scope
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "Research parameter",
                  "Details",
                ]}
                rows={[
                  ["FOMC meetings analyzed", 41],

                  ["Sample start date", "November 3, 2021"],

                  ["Sample end date", "October 28, 2026"],

                  ["Rate hikes", 12],

                  ["Rate cuts", 6],

                  ["Unchanged rate decisions", 23],

                  ["Financial instrument", "XAU/USD"],

                  ["Measurement unit", "USD per troy ounce"],

                  ["Price data source", "XAU Meter"],

                  ["Rate decision source", "Federal Reserve"],

                  ["Data review date", "November 23, 2026"],
                ]}
              />

              <SubHeading>
                How Gold Price Movements Were Measured
              </SubHeading>

              <Paragraph>
                The published intraday data uses the
                closing price of the final minute
                preceding the FOMC announcement
                as its reference point.
              </Paragraph>

              <Paragraph>
                Subsequent price changes are measured
                after one minute, five minutes,
                15 minutes and 60 minutes.
                The underlying observations are based
                on one-minute bid-price data from the
                price provider used by the original source.
              </Paragraph>

              {/* RESEARCH FORMULAS */}

              <div className="!my-7 grid grid-cols-1 gap-4 lg:grid-cols-3">

                {/* SIGNED PRICE CHANGE */}

                <div className="flex min-w-0 flex-col rounded-[16px] border border-blue-100 bg-[#f1f7fe] p-5 text-center">

                  <p className="text-[13px] font-black text-[#176ac8]">
                    Signed Price Change
                  </p>

                  <p
                    dir="ltr"
                    className="my-5 text-[22px] font-black text-[#102747] sm:text-[25px]"
                  >
                    ΔP = P(t) − P(0)
                  </p>

                  <p className="text-[12px] leading-7 text-slate-600">
                    Measures the increase or decrease
                    in gold prices in US dollars
                    per troy ounce.
                  </p>

                </div>

                {/* ABSOLUTE PRICE CHANGE */}

                <div className="flex min-w-0 flex-col rounded-[16px] border border-blue-100 bg-[#f1f7fe] p-5 text-center">

                  <p className="text-[13px] font-black text-[#176ac8]">
                    Absolute Price Change
                  </p>

                  <p
                    dir="ltr"
                    className="my-5 text-[22px] font-black text-[#102747] sm:text-[25px]"
                  >
                    |ΔP| = |P(t) − P(0)|
                  </p>

                  <p className="text-[12px] leading-7 text-slate-600">
                    Measures the magnitude of the
                    price change regardless of
                    whether gold rose or declined.
                  </p>

                </div>

                {/* PERCENTAGE PRICE CHANGE */}

                <div className="flex min-w-0 flex-col rounded-[16px] border border-blue-100 bg-[#f1f7fe] p-5 text-center">

                  <p className="text-[13px] font-black text-[#176ac8]">
                    Percentage Price Change
                  </p>

                  <div
                    dir="ltr"
                    className="my-4 flex items-center justify-center gap-2 text-[18px] font-black text-[#102747] sm:text-[20px]"
                  >

                    <span>R(t) =</span>

                    <span className="inline-flex flex-col text-center">

                      <span className="border-b-2 border-[#102747] px-2 pb-1">
                        P(t) − P(0)
                      </span>

                      <span className="pt-1">
                        P(0)
                      </span>

                    </span>

                    <span>× 100</span>

                  </div>

                  <p className="text-[12px] leading-7 text-slate-600">
                    Measures the percentage change
                    in gold prices relative to the
                    pre-announcement reference price.
                  </p>

                </div>

              </div>

              <SubHeading>
                Definition of Mathematical Symbols
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "Symbol",
                  "Definition",
                ]}
                rows={[
                  [
                    "P(0)",
                    "Pre-announcement gold reference price",
                  ],
                  [
                    "P(t)",
                    "Gold price at the selected observation point",
                  ],
                  [
                    "ΔP",
                    "Signed price change in US dollars",
                  ],
                  [
                    "|ΔP|",
                    "Absolute dollar price change",
                  ],
                  [
                    "R(t)",
                    "Percentage price change",
                  ],
                  [
                    "|R(t)|",
                    "Absolute percentage price change",
                  ],
                ]}
              />

              <Paragraph>
                Mean and median percentage changes
                were calculated using the absolute
                percentage change of each individual
                observation.
              </Paragraph>

              <Paragraph>
                This method differs from dividing
                the mean dollar price change by
                the mean gold price across the sample.
              </Paragraph>

              <Note title="Absolute Price Change Versus Trading Range">

                Absolute price change measures the
                distance between the reference price
                and the price at a specified observation
                point.

                The trading range measures the
                difference between the highest
                and lowest prices reached during
                a given interval. These are distinct
                statistical measurements and must
                not be treated as interchangeable.

              </Note>

              <SubHeading>
                Calculation of the Mean and Median
              </SubHeading>

              <Paragraph>
                The mean absolute price change
                was calculated using the absolute
                values of the observed price changes,
                regardless of their positive or
                negative direction.
              </Paragraph>

              <Paragraph>
                The median represents the central
                value after the absolute price
                changes are arranged in ascending
                order. It is generally less sensitive
                to extreme observations than the
                arithmetic mean.
              </Paragraph>

              <SubHeading>
                Classification of Federal Reserve Rate Decisions
              </SubHeading>

              <Paragraph>
                FOMC meetings were classified into
                rate hikes, rate cuts and unchanged
                rate decisions according to changes
                in the target federal funds rate
                range.
              </Paragraph>

              <Paragraph>
                Official Federal Reserve records
                were used to distinguish the
                announcement date from the effective
                date of any newly established
                target rate range.
              </Paragraph>

              <SubHeading>
                Definition of a Directional Reversal
              </SubHeading>

              <Paragraph>
                A directional reversal was identified
                when the sign of the observed price
                change after one minute or five
                minutes differed from the sign of
                the price change after 60 minutes,
                using the same pre-announcement
                reference price.
              </Paragraph>

              <Paragraph>
                This definition does not capture
                all intraday price reversals.
                It identifies differences between
                specific observation points only.
              </Paragraph>

              <SubHeading>
                Longer-Term Gold Price Performance
              </SubHeading>

              <Paragraph>
                The report also references separate
                research published by Regimic,
                covering 95 Fed decisions since
                2015 for the one-session and
                five-session measurements, and
                94 observations for the 20-session
                measurement.
              </Paragraph>

              <Paragraph>
                That research uses the opening
                price of the trading session
                following the announcement as
                its reference point, rather than
                the immediate pre-announcement
                price.
              </Paragraph>

              <Paragraph>
                Because the methodologies differ,
                the longer-term findings were
                presented separately and were not
                merged with the 41-meeting intraday
                analysis.
              </Paragraph>

              <SubHeading>
                Research Limitations
              </SubHeading>

              <ArticleList
                items={[
                  "The intraday observations originate from a single underlying price source. Gold quotes may differ between forex and CFD brokers.",

                  "Broker Alarab reanalyzed published observations rather than independently collecting the underlying raw intraday prices.",

                  "The calculations exclude bid-ask spreads, commissions, slippage and other execution costs.",

                  "Rate decisions were not classified according to the magnitude of their surprise relative to pre-announcement market expectations.",

                  "Gold price levels vary considerably across the historical sample, affecting comparisons based on dollar price changes.",

                  "The number of rate hikes and particularly rate cuts is limited, restricting the ability to generalize the findings across different monetary policy cycles.",

                  "The descriptive statistics do not establish that Fed interest rate decisions were the sole cause of the observed gold price movements.",

                  "Historical frequencies and price changes do not guarantee future market behavior.",
                ]}
              />

              <Note title="Research Attribution and Data Ownership">

                Additional statistical calculations,
                tables and analytical commentary
                were prepared by Broker Alarab using
                published historical observations
                from the sources identified below.

                Ownership and applicable rights
                in the original datasets remain
                with their respective providers.

              </Note>

              <SubHeading>
                Sources and References
              </SubHeading>

              <div className="space-y-3">

                {sources.map((source, index) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-[12px] border border-slate-200 bg-[#f8fafc] p-3 transition hover:border-blue-300 hover:bg-blue-50 sm:p-4"
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf3ff] text-[11px] font-black text-[#176ac8]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1 text-[12px] font-bold leading-6 text-[#102747] group-hover:text-[#176ac8] sm:text-[14px]">
                      {source.title}
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-[#176ac8]"
                    >
                      ↗
                    </span>

                  </a>
                ))}

              </div>

            </ArticleSection>

            {/* DISCLAIMER */}

            <div className="mt-8 rounded-[16px] border border-amber-200 bg-[#fffbef] p-4 sm:p-6">

              <h2 className="text-[15px] font-black text-amber-900">
                Research and Investment Disclaimer
              </h2>

              <p className="mt-2 text-[12px] leading-[1.85] text-slate-700 sm:text-[14px]">
                This report is provided for informational,
                educational and research purposes only.
                It does not constitute investment advice,
                a trading recommendation or an
                invitation to buy or sell gold or
                any other financial instrument.
                Historical performance does not
                guarantee future results.
              </p>

            </div>

            {/* ARTICLE FOOTER */}

            <footer className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="text-[13px] font-black text-[#102747]">
                  Broker Alarab Research
                </div>

                <p className="mt-1 text-[11px] leading-6 text-slate-500">
                  Financial market research, statistical
                  studies and independent broker analysis.
                </p>

              </div>

              <Link
                href="/en"
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-blue-200 bg-[#f1f7ff] px-5 py-2 text-[12px] font-black text-[#155da9] transition hover:bg-blue-100"
              >
                Back to Homepage

                <span className="ml-2" aria-hidden="true">
                  →
                </span>

              </Link>

            </footer>

          </div>

        </article>

      </div>

    </main>
  );
}