
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   BROKER ALARAB
   ENGLISH ARTICLE — GOLD PRICE CRASHES HISTORY

   Design parity with Arabic article:
   - 1520px container
   - Identical spacing, colors, borders and shadows
   - Identical mobile and desktop breakpoints
   - Same hero image
   - Same historical price data
   - Same article structure

   Part 1 of 2
   ========================================================= */

const SITE = "https://brokeralarab.com";
const SLUG = "gold-price-crashes-history";
const PATH = `/en/articles/${SLUG}`;
const URL = `${SITE}${PATH}`;

const ARABIC_URL =
  `${SITE}/articles/${SLUG}`;

const ARTICLE = {
  title:
    "Biggest Gold Price Crashes in History: Losses and Recovery Times",

  seoTitle:
    "Biggest Gold Price Crashes: Losses and Recovery Times",

  description:
    "Explore the biggest gold price crashes from 1974 to 2026, including historical drawdowns, their causes, and how long gold took to recover.",

  category: "Articles & Analysis",
  subcategory: "Gold & Markets",
  publisher: "Broker Alarab",
  published: "2026-11-23",
  modified: "2026-11-23",
};

const HERO_IMAGE =
  "/articles/gold-crashes-hero-updated.webp";

/* =========================================================
   SEO METADATA
   ========================================================= */

export const metadata: Metadata = {
  title: ARTICLE.seoTitle,
  description: ARTICLE.description,

  alternates: {
    canonical: URL,

    languages: {
      en: URL,
      ar: ARABIC_URL,
    },
  },

  openGraph: {
    type: "article",
    url: URL,
    title: ARTICLE.title,
    description: ARTICLE.description,
    siteName: "Broker Alarab",
    locale: "en_US",
    publishedTime: ARTICLE.published,
    modifiedTime: ARTICLE.modified,

    images: [
      {
        url: `${SITE}${HERO_IMAGE}`,
        width: 1774,
        height: 887,
        alt: ARTICLE.title,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: ARTICLE.seoTitle,
    description: ARTICLE.description,
    images: [`${SITE}${HERO_IMAGE}`],
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

/* =========================================================
   HISTORICAL GOLD DRAWDOWNS
   Same figures as the Arabic version
   ========================================================= */

type Drawdown = {
  period: string;
  peak: string;
  bottom: string;
  drop: string;
  recovery: string;
  value: number;
};

const drawdowns: Drawdown[] = [
  {
    period: "1980–1999",
    peak: "$850.00",
    bottom: "$252.80",
    drop: "−70.3%",
    recovery: "Approximately 28 years",
    value: 70.3,
  },
  {
    period: "1974–1976",
    peak: "$195.25",
    bottom: "$103.50",
    drop: "−47.0%",
    recovery: "Approximately 3.5 years",
    value: 47,
  },
  {
    period: "2011–2015",
    peak: "$1,895.00",
    bottom: "$1,049.40",
    drop: "−44.6%",
    recovery: "Approximately 9 years",
    value: 44.6,
  },
  {
    period: "2008",
    peak: "$1,011.25",
    bottom: "$712.50",
    drop: "−29.5%",
    recovery: "Approximately 18 months",
    value: 29.5,
  },
  {
    period: "2020–2022",
    peak: "$2,067.15",
    bottom: "$1,628.75",
    drop: "−21.2%",
    recovery: "About 3 years and 5 months",
    value: 21.2,
  },
  {
    period: "1978",
    peak: "$242.75",
    bottom: "$193.40",
    drop: "−20.3%",
    recovery: "Approximately 3 months",
    value: 20.3,
  },
];

const recoveryMath = [
  ["10%", "11.1%"],
  ["20%", "25.0%"],
  ["30%", "42.9%"],
  ["40%", "66.7%"],
  ["50%", "100%"],
  ["70%", "233.3%"],
];

/* =========================================================
   TABLE OF CONTENTS
   Optimized English section labels
   ========================================================= */

const contents = [
  {
    id: "summary",
    label: "Key Findings",
  },
  {
    id: "history-table",
    label: "Historical Gold Crashes",
  },
  {
    id: "crash-1974",
    label: "1974–1976 Gold Crash",
  },
  {
    id: "crash-1978",
    label: "1978 Gold Correction",
  },
  {
    id: "crash-1980",
    label: "1980 Gold Crash",
  },
  {
    id: "crash-2008",
    label: "2008 Financial Crisis",
  },
  {
    id: "crash-2011",
    label: "2011–2015 Gold Decline",
  },
  {
    id: "crash-2020",
    label: "2020–2022 Gold Decline",
  },
  {
    id: "crash-2026",
    label: "2026 Gold Sell-Off",
  },
  {
    id: "causes",
    label: "Why Gold Prices Crash",
  },
  {
    id: "recovery-math",
    label: "Recovery Calculations",
  },
  {
    id: "forecast",
    label: "Predicting Gold Crashes",
  },
  {
    id: "faq",
    label: "Frequently Asked Questions",
  },
  {
    id: "conclusion",
    label: "Final Takeaways",
  },
  {
    id: "methodology",
    label: "Methodology & Sources",
  },
];

/* =========================================================
   SOURCES
   Original source URLs remain unchanged
   ========================================================= */

const sources = [
  {
    title:
      "World Gold Council — Historical Gold Bear Markets",
    url:
      "https://www.gold.org/goldhub/research/whats-a-bear-case-for-gold",
  },
  {
    title:
      "World Gold Council — Historical Bear Market Appendix",
    url:
      "https://www.gold.org/goldhub/research/whats-bear-case-gold-historical-perspective/19836",
  },
  {
    title:
      "World Gold Council — October 2026 Gold Market Commentary",
    url:
      "https://www.gold.org/goldhub/research/gold-market-commentary-october-2026",
  },
  {
    title:
      "LBMA — Gold Price Sets a New Record in December 2023",
    url:
      "https://www.lbma.org.uk/articles/lbma-london-gold-price-breaks-all-time-record-as-year-draws-to-a-close",
  },
  {
    title:
      "U.S. SEC — Historical Gold Price Disclosure",
    url:
      "https://www.sec.gov/Archives/edgar/data/1222333/000095012309066100/y02316e10vk.htm",
  },
  {
    title:
      "Kinross Gold — Historical Gold Price Filing with the SEC",
    url:
      "https://www.sec.gov/Archives/edgar/data/701818/000110465926035268/kgc-20251231xex99d1.htm",
  },
  {
    title:
      "Reuters — Gold Prices Fall on November 20, 2026",
    url:
      "https://www.reuters.com/world/india/gold-set-worst-week-eight-months-firm-dollar-fed-hike-bets-weigh-2026-11-20/",
  },
  {
    title:
      "Reuters — Gold Rebounds on November 23, 2026",
    url:
      "https://www.reuters.com/world/india/gold-rises-14-month-low-markets-await-key-us-inflation-data-2026-11-23/",
  },
];

/* =========================================================
   SHARED ARTICLE DESIGN COMPONENTS

   Same classes as Arabic version.
   Only RTL-specific alignment is mirrored.
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

      <h2 className="border-l-[4px] border-[#2587e7] pl-3 text-[22px] font-black leading-[1.5] tracking-tight text-[#101d35] sm:pl-4 sm:text-[29px]">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-[14px] leading-[2.05] text-slate-700 sm:text-[16px] sm:leading-[2]">
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
          amber
            ? "text-amber-900"
            : "text-[#10549f]"
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
   HERO IMAGE

   Same exact image and responsive dimensions.
   ========================================================= */

function ArticleHeroImage() {
  return (
    <figure className="mt-6 sm:mt-8">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[#071a31] shadow-[0_12px_35px_rgba(15,23,42,0.10)] sm:rounded-[22px]">
        <Image
          src={HERO_IMAGE}
          alt="Historical gold price crashes and recoveries illustrated with gold bars and a falling and rising market chart"
          fill
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, (max-width: 1520px) 92vw, 1440px"
          className="object-cover object-center"
        />
      </div>

      <figcaption className="mt-2 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
        Illustration of historical gold price declines
        and recoveries. Not an actual historical price chart.
      </figcaption>
    </figure>
  );
}

/* =========================================================
   TABLE OF CONTENTS

   Mobile: compact expandable navigation
   Desktop: same 3-column article navigation
   ========================================================= */

function TableOfContents() {
  return (
    <>
      {/* MOBILE ONLY */}

      <nav
        aria-label="Mobile article table of contents"
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
                  className="flex min-h-[45px] min-w-0 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-left transition active:bg-blue-50"
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

      {/* DESKTOP / TABLET */}

      <nav
        aria-label="Article table of contents"
        className="my-6 hidden overflow-hidden rounded-[20px] border border-[#dce6f2] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:block"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#e5edf6] bg-[linear-gradient(270deg,#f3f8ff_0%,#ffffff_100%)] px-6 py-5">
          <div>
            <h2 className="text-[19px] font-black text-[#102747]">
              Table of Contents
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Jump directly to the section you need
            </p>
          </div>

          <span className="rounded-full border border-blue-100 bg-[#eaf3ff] px-3 py-1.5 text-[11px] font-black text-[#1765b5]">
            {contents.length} Sections
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
   HISTORICAL GOLD PRICE CRASH TABLE

   Desktop: full data table
   Mobile: responsive data cards
   ========================================================= */

function HistoricalTable() {
  const rows = [
    ...drawdowns,
    {
      period: "2026 — Ongoing",
      peak: "$5,405.00",
      bottom: "Not finalized",
      drop: "Ongoing",
      recovery: "Not yet recovered",
      value: 0,
    },
  ];

  return (
    <div className="!mt-7">
      {/* DESKTOP */}

      <div className="hidden overflow-hidden rounded-[17px] border border-slate-200 shadow-sm md:block">
        <table className="w-full table-fixed text-left">
          <thead className="bg-[#092443] text-white">
            <tr className="text-[12px]">
              <th className="w-[19%] px-4 py-4">
                Period
              </th>

              <th className="w-[17%] px-3 py-4 text-center">
                Peak Price
              </th>

              <th className="w-[17%] px-3 py-4 text-center">
                Trough Price
              </th>

              <th className="w-[17%] px-3 py-4 text-center">
                Drawdown
              </th>

              <th className="w-[30%] px-3 py-4 text-center">
                Time to Recover
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.period}
                className={`border-t border-slate-200 ${
                  row.value === 0
                    ? "bg-amber-50"
                    : index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f7f9fc]"
                }`}
              >
                <td className="px-4 py-4 text-[13px] font-black text-[#102747]">
                  {row.period}
                </td>

                <td
                  dir="ltr"
                  className="px-3 py-4 text-center text-[12px] font-bold text-slate-700"
                >
                  {row.peak}
                </td>

                <td
                  dir="ltr"
                  className="px-3 py-4 text-center text-[12px] font-bold text-slate-700"
                >
                  {row.bottom}
                </td>

                <td className="px-3 py-4 text-center">
                  <span
                    dir="ltr"
                    className={`inline-flex rounded-lg px-3 py-1 text-[12px] font-black ${
                      row.value === 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {row.drop}
                  </span>
                </td>

                <td className="px-3 py-4 text-center text-[12px] font-bold text-slate-700">
                  {row.recovery}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE / TABLET */}

      <div className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.period}
            className={`overflow-hidden rounded-[15px] border ${
              row.value === 0
                ? "border-amber-200 bg-amber-50/60"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-3.5 py-3">
              <span className="text-[14px] font-black text-[#102747]">
                {row.period}
              </span>

              <span
                dir="ltr"
                className={`rounded-lg px-2.5 py-1 text-[13px] font-black ${
                  row.value === 0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {row.drop}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-[10px] font-bold text-slate-500">
                  Peak Price
                </div>

                <div
                  dir="ltr"
                  className="mt-1 text-left text-[15px] font-black text-slate-900"
                >
                  {row.peak}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-[10px] font-bold text-slate-500">
                  Trough Price
                </div>

                <div
                  dir="ltr"
                  className="mt-1 text-left text-[15px] font-black text-slate-900"
                >
                  {row.bottom}
                </div>
              </div>

              <div className="col-span-2 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5">
                <div className="text-[10px] font-bold text-slate-500">
                  Recovery Time From Peak
                </div>

                <div className="mt-0.5 text-[13px] font-black text-[#14549b]">
                  {row.recovery}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   GOLD DRAWDOWN COMPARISON CHART
   ========================================================= */

function DrawdownChart() {
  return (
    <figure className="!mt-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">
      <figcaption className="mb-6">
        <h3 className="text-[17px] font-black text-[#102747] sm:text-[20px]">
          Comparing the Biggest Gold Price Drawdowns
        </h3>

        <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
          Peak-to-trough percentage losses during
          completed historical gold drawdowns.
        </p>
      </figcaption>

      <div className="space-y-4">
        {drawdowns.map((item, index) => (
          <div key={item.period}>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="text-[11px] font-black text-slate-700 sm:text-[13px]">
                {item.period}
              </span>

              <span
                dir="ltr"
                className={`text-[12px] font-black sm:text-[14px] ${
                  index === 0
                    ? "text-red-700"
                    : "text-[#1766b3]"
                }`}
              >
                {item.drop}
              </span>
            </div>

            <div className="h-[13px] overflow-hidden rounded-full bg-[#eaf0f7] sm:h-[16px]">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-gradient-to-r from-red-500 to-orange-400"
                    : "bg-gradient-to-r from-[#145bb3] to-[#38bdf8]"
                }`}
                style={{
                  width: `${(item.value / 70.3) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
        The 2026 sell-off is excluded because its
        final trough had not been established
        as of the article's publication date.
      </p>
    </figure>
  );
}

/* =========================================================
   REQUIRED RECOVERY PERCENTAGE TABLE
   ========================================================= */

function RecoveryTable() {
  return (
    <div className="!mt-6 overflow-hidden rounded-[15px] border border-slate-200">
      <table className="w-full table-fixed text-center">
        <thead className="bg-[#092443] text-white">
          <tr className="text-[11px] sm:text-[13px]">
            <th className="w-1/2 px-2 py-3.5 font-black sm:px-4">
              Price Decline
            </th>

            <th className="w-1/2 px-2 py-3.5 font-black sm:px-4">
              Gain Required to Recover
            </th>
          </tr>
        </thead>

        <tbody>
          {recoveryMath.map((row, index) => (
            <tr
              key={row[0]}
              className={`border-t border-slate-200 ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-slate-50"
              }`}
            >
              <td
                dir="ltr"
                className="px-2 py-3 text-[13px] font-black text-red-700 sm:text-[15px]"
              >
                {row[0]}
              </td>

              <td
                dir="ltr"
                className="px-2 py-3 text-[13px] font-black text-[#1263b3] sm:text-[15px]"
              >
                {row[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   FREQUENTLY ASKED QUESTIONS COMPONENT
   ========================================================= */

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
   END OF PART 1

   PART 2 CONTINUES HERE WITH:
   - Supabase broker cards
   - Broker CTA buttons
   - Article JSON-LD
   - Breadcrumb JSON-LD
   - Full English article content
   - Historical sections, FAQ and references

   Do not close or export the file here.
   ========================================================= */

/* =========================================================
   FEATURED GOLD TRADING BROKERS
   Same Supabase data and responsive design
   ========================================================= */

type ArticleBroker = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  rating: number | string | null;
  min_deposit: number | string | null;
  islamic_account: boolean | null;
  real_account_url: string | null;
};

async function getArticleGoldBrokers(): Promise<ArticleBroker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select(
      "id, name, slug, logo, rating, min_deposit, islamic_account, real_account_url"
    )
    .eq("publication_status", "published")
    .eq("is_full_review", true)
    .not("rating", "is", null)
    .not("slug", "is", null)
    .order("rating", { ascending: false })
    .limit(4);

  if (error) {
    console.error(
      "English article featured brokers:",
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
      className="group relative min-w-0 overflow-hidden rounded-[15px] border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition duration-200 hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.09)] sm:rounded-[18px] sm:p-5"
      dir="ltr"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176ac8] via-[#38bdf8] to-transparent" />

      {/* BROKER IDENTITY */}

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
              Overall Rating
            </span>

            <span
              dir="ltr"
              className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-700 sm:text-[13px]"
            >
              <span aria-hidden="true">★</span>
              {ratingText}
            </span>
          </div>
        </div>

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#eaf3ff] text-[11px] font-black text-[#1765b5] sm:h-8 sm:w-8 sm:rounded-[10px] sm:text-[12px]">
          {rank}
        </div>
      </div>

      {/* BROKER METRICS */}

      <div className="mx-3 grid grid-cols-2 gap-2 sm:mx-0 sm:mt-4">
        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">
          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            Minimum Deposit
          </p>

          <p
            dir="ltr"
            className="mt-0.5 break-words text-left text-[12px] font-black text-[#102747] sm:mt-1 sm:text-[14px]"
          >
            {deposit}
          </p>
        </div>

        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">
          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            Islamic Account
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

      {/* ACTION BUTTONS */}

      <div className="grid grid-cols-2 gap-2 px-3 pb-3 pt-2.5 sm:mt-4 sm:gap-2.5 sm:px-0 sm:pb-0 sm:pt-0">
        <Link
          href={reviewUrl}
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[12px] bg-[#176ac8] px-2 py-2.5 text-center text-[11px] font-black text-white transition duration-200 hover:bg-[#10549f] sm:text-[13px]"
        >
          Read Review
          <span aria-hidden="true">→</span>
        </Link>

        {broker.real_account_url ? (
          <a
            href={broker.real_account_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[12px] border border-[#bdd8f5] bg-[#eaf3ff] px-2 py-2.5 text-center text-[11px] font-black text-[#155da9] transition duration-200 hover:border-[#80b4ec] hover:bg-[#dcecff] sm:text-[13px]"
          >
            Open Account
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="inline-flex min-h-[44px] items-center justify-center rounded-[12px] border border-slate-200 bg-slate-100 px-2 py-2.5 text-center text-[10px] font-bold text-slate-400 sm:text-[12px]">
            Unavailable
          </span>
        )}
      </div>
    </article>
  );
}

function FeaturedGoldBrokers({
  brokers,
}: {
  brokers: ArticleBroker[];
}) {
  if (brokers.length === 0) {
    return null;
  }

  return (
    <aside
      id="featured-gold-brokers"
      aria-label="Featured gold trading brokers"
      dir="ltr"
      className="relative my-9 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_12px_35px_rgba(15,23,42,0.04)] sm:my-12 sm:rounded-[24px]"
    >
      {/* SECTION HEADING */}

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(120deg,#071a31_0%,#0a2e52_60%,#12518b_100%)] px-4 py-6 text-left sm:px-7 sm:py-7">
        <div className="pointer-events-none absolute -left-12 -top-24 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1 text-[10px] font-black text-cyan-200">
            Broker Comparison
          </span>

          <h2 className="mt-3 text-[22px] font-black leading-[1.5] text-white sm:text-[27px]">
            Explore Leading Gold Trading Brokers
          </h2>

          <p className="mt-2 max-w-[850px] text-[12px] leading-7 text-slate-200 sm:text-[14px] sm:leading-8">
            Understanding gold's history is only one part
            of managing trading risk. Explore selected
            brokers reviewed by Broker Alarab, compare
            their account conditions, and read independent
            broker reviews before choosing a provider.
          </p>
        </div>
      </div>

      {/* BROKER CARDS */}

      <div className="p-3 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {brokers.map((broker, index) => (
            <FeaturedBrokerCard
              key={broker.id}
              broker={broker}
              rank={index + 1}
            />
          ))}
        </div>

        {/* CATEGORY CTA */}

        <div className="mt-5 flex flex-col items-start gap-4 rounded-[15px] border border-blue-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="min-w-0">
            <h3 className="text-[14px] font-black text-[#102747] sm:text-[16px]">
              Want to Compare More Gold Trading Brokers?
            </h3>

            <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
              Compare broker ratings, minimum deposits,
              trading accounts, regulation and trading
              conditions in our gold broker guide.
            </p>
          </div>

          <Link
            href="/en/best-brokers/gold"
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-[12px] border border-[#bfd8f3] bg-[#eaf3ff] px-5 py-3 text-center text-[12px] font-black text-[#145aa5] transition hover:border-blue-400 hover:bg-blue-100 sm:w-auto sm:text-[13px]"
          >
            Compare 10 Gold Trading Brokers
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          Brokers are displayed according to their overall
          published ratings in Broker Alarab's database.
          This ranking is not an independent assessment of
          gold-specific trading costs. Account conditions
          may vary by country and regulatory entity.
        </p>
      </div>
    </aside>
  );
}

/* =========================================================
   ARTICLE STRUCTURED DATA
   English Article + Breadcrumbs
   ========================================================= */

function ArticleStructuredData() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ARTICLE.title,
    description: ARTICLE.description,

    image: {
      "@type": "ImageObject",
      url: `${SITE}${HERO_IMAGE}`,
      width: 1774,
      height: 887,
    },

    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": URL,
    },

    url: URL,
    datePublished: ARTICLE.published,
    dateModified: ARTICLE.modified,
    articleSection: "Gold & Markets",

    author: {
      "@type": "Organization",
      name: "Broker Alarab",
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
   MAIN ENGLISH ARTICLE PAGE
   ========================================================= */

export default async function GoldPriceCrashesArticlePage() {
  const featuredGoldBrokers = await getArticleGoldBrokers();

  return (
    <main
      dir="ltr"
      lang="en"
      className="min-h-screen overflow-x-clip bg-[#f5f7fb] text-slate-900"
    >
      <ArticleStructuredData />

      {/* ===============================================
          HEADER / ARTICLE INTRO
          =============================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-9">

          {/* BREADCRUMBS */}

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

            <span>Articles & Analysis</span>

            <span aria-hidden="true">/</span>

            <span className="text-[#145ca8]">
              Gold Price Crashes
            </span>
          </nav>

          {/* CATEGORY */}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#eaf3ff] px-3 py-1.5 text-[10px] font-black text-[#1765b5] sm:text-[11px]">
              Gold & Markets
            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">
              Historical Research
            </span>
          </div>

          {/* ARTICLE MAIN TITLE */}

          <h1 className="mt-5 w-full text-[27px] font-black leading-[1.4] tracking-[-0.025em] text-[#0c1e38] sm:text-[34px] lg:text-[clamp(29px,3vw,48px)] lg:whitespace-nowrap">
            Biggest Gold Price Crashes in History:{" "}
            <span className="text-[#176ac8]">
              Losses and Recovery Times
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-4 w-full max-w-none text-[14px] leading-[2] text-slate-600 sm:text-[17px] sm:leading-[1.9]">
            Explore the biggest gold price crashes from
            1974 through 2026, including historic
            peak-to-trough losses, the economic forces
            behind major sell-offs and the time it took
            gold to regain previous highs. This study
            also examines how interest rates, the US
            dollar, inflation and financial crises
            have shaped gold's long-term performance.
          </p>

          {/* ARTICLE INFORMATION */}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-500 sm:text-[12px]">
            <span>
              By:{" "}
              <strong className="text-[#102747]">
                Broker Alarab Research Team
              </strong>
            </span>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <time dateTime="2026-11-23">
              Last updated: November 23, 2026
            </time>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <span>Historical Market Research</span>
          </div>

          {/* HERO IMAGE */}

          <ArticleHeroImage />
        </div>
      </header>

      {/* ===============================================
          ARTICLE BODY
          =============================================== */}

      <div className="mx-auto max-w-[1520px] px-3 py-6 sm:px-6 sm:py-10">
        <article className="overflow-hidden rounded-[19px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.035)] sm:rounded-[24px]">
          <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-12">

            {/* INTRODUCTION */}

            <div className="space-y-5 text-[14px] leading-[2.15] text-slate-700 sm:text-[16px] sm:leading-[2.1]">
              <Paragraph>
                Gold is widely regarded as a safe-haven
                asset, attracting investors during
                inflationary periods, economic uncertainty
                and geopolitical turmoil. Yet its price
                history tells a more complicated story.
                Gold has experienced devastating drawdowns,
                sometimes losing more than half its
                market value and taking years—or even
                decades—to regain previous highs.
              </Paragraph>

              <Paragraph>
                From the major decline of the mid-1970s
                and the prolonged bear market following
                the 1980 peak to the 2008 global financial
                crisis and the downturn between 2011 and
                2015, gold has moved through markedly
                different market cycles. Each featured
                its own combination of monetary policy,
                investor sentiment and liquidity conditions.
              </Paragraph>

              <Paragraph>
                In 2026, that historical perspective
                became especially relevant as gold
                retreated sharply after reaching
                record levels above $5,400 per troy
                ounce, eventually recording a
                14-month low during November.
              </Paragraph>

              <Paragraph>
                In this research report,{" "}
                <Strong>Broker Alarab</Strong> examines
                some of the largest historical gold
                price crashes since 1974. We compare
                the depth of each decline, explore
                its economic causes and consider how
                long gold took to recover, while
                distinguishing official London
                benchmark prices from intraday
                spot-market quotations.
              </Paragraph>
            </div>

            <TableOfContents />

            {/* ===========================================
                KEY FINDINGS
                =========================================== */}

            <ArticleSection
              id="summary"
              eyebrow="Research Overview"
              title="Key Findings From Historical Gold Price Crashes"
            >
              <ArticleList
                items={[
                  <>
                    <Strong>1980–1999:</Strong> Gold
                    experienced a peak-to-trough
                    decline of approximately 70.3%
                    in the period examined, taking
                    close to 28 years to regain
                    its 1980 nominal peak.
                  </>,
                  <>
                    <Strong>1974–1976:</Strong> Gold
                    lost approximately 47% of its
                    value in less than two years.
                  </>,
                  <>
                    <Strong>2011–2015:</Strong> The
                    metal fell approximately 44.6%
                    and did not surpass its previous
                    record high until 2020.
                  </>,
                  <>
                    <Strong>2008:</Strong> Gold
                    dropped around 29.5% during
                    the global financial crisis,
                    recovering roughly 18 months
                    after its previous peak.
                  </>,
                  <>
                    <Strong>2020–2022:</Strong> Gold
                    declined approximately 21.2%
                    before moving above its previous
                    high in December 2023.
                  </>,
                  <>
                    <Strong>2026:</Strong> Gold
                    suffered another substantial
                    sell-off, with the recovery
                    cycle still incomplete as
                    of this report's publication.
                  </>,
                ]}
              />

              <Note title="The Most Important Finding">
                The size of a gold price crash does
                not, by itself, determine how long
                recovery will take. Monetary policy,
                real interest rates, liquidity and
                broader economic conditions may be
                more important than the percentage
                decline alone.
              </Note>
            </ArticleSection>

            {/* ===========================================
                HISTORICAL DATA TABLE
                =========================================== */}

            <ArticleSection
              id="history-table"
              eyebrow="Historical Market Data"
              title="Largest Historical Gold Price Drawdowns Since 1974"
            >
              <Paragraph>
                The following comparison covers major
                declines from historical gold price
                peaks. Figures are expressed in US
                dollars per troy ounce and are based
                on the London afternoon gold benchmark
                (London PM Fix / LBMA Gold Price PM),
                except for the intraday 2026
                observations discussed separately.
              </Paragraph>

              <HistoricalTable />

              <Note title="Important Methodology Note">
                This comparison measures the decline
                from a reference peak to the subsequent
                lowest point before that peak was
                recovered. A single long-term drawdown
                can include several smaller rallies,
                corrections and bear markets.
                <br />
                <br />
                Consequently, this method differs
                from the World Gold Council's
                classification of separate bear-market
                episodes based on monthly data.
                Recovery time is measured approximately
                from the original peak—not from
                the trough—and refers to nominal
                prices rather than inflation-adjusted
                purchasing power.
              </Note>

              <DrawdownChart />
            </ArticleSection>

            {/* ===========================================
                1974–1976
                =========================================== */}

            <ArticleSection
              id="crash-1974"
              eyebrow="Historical Crash 01"
              title="The 1974–1976 Gold Crash: A 47% Price Decline"
            >
              <Paragraph>
                The collapse of the Bretton Woods
                monetary system and the end of
                the US dollar's direct link to
                gold helped transform the global
                gold market in the early 1970s.
                Rising inflation, energy-market
                turmoil and declining confidence
                in paper currencies contributed
                to a powerful rally in the metal.
              </Paragraph>

              <Paragraph>
                Gold reached $195.25 per ounce on
                December 30, 1974, but subsequently
                fell to $103.50 on August 25, 1976.
                The resulting peak-to-trough loss
                was approximately 47%.
              </Paragraph>

              <SubHeading>
                What Caused Gold Prices to Fall
                Between 1974 and 1976?
              </SubHeading>

              <Paragraph>
                Several economic factors contributed
                to the downturn. These included
                a relatively stronger US dollar,
                higher real interest rates and
                easing concerns about inflation
                and geopolitical instability.
              </Paragraph>

              <Paragraph>
                When inflation-adjusted yields
                on interest-bearing assets rise,
                holding non-yielding gold can
                become less attractive to
                investors seeking income or
                improved real returns.
              </Paragraph>

              <Paragraph>
                Despite the severity of the sell-off,
                gold surpassed its previous peak
                in 1978. It then entered another
                powerful upward phase, culminating
                in historically elevated prices
                in January 1980.
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                1978
                =========================================== */}

            <ArticleSection
              id="crash-1978"
              eyebrow="Historical Crash 02"
              title="The 1978 Gold Correction: A Sharp Fall and Rapid Recovery"
            >
              <Paragraph>
                Gold recorded a reference peak
                of $242.75 per ounce on
                October 30, 1978, before
                dropping to $193.40 in November.
                That represented a decline
                of approximately 20.3%.
              </Paragraph>

              <Paragraph>
                Unlike the prolonged bear markets
                seen in other periods, this
                correction was relatively brief.
                Gold recovered its previous
                high by February 1979,
                approximately three months
                after the peak.
              </Paragraph>

              <Paragraph>
                What makes this episode
                noteworthy is that the correction
                occurred within a broader
                upward market cycle. It did
                not develop into a multi-year
                decline.
              </Paragraph>

              <Note title="Historical Lesson">
                A gold price decline exceeding
                20% does not necessarily mark
                the beginning of a long-term
                bear market. Sharp corrections
                can occur within broader
                uptrends, although their true
                significance only becomes
                clear as subsequent price
                action develops.
              </Note>
            </ArticleSection>

            {/* ===========================================
                1980–1999
                =========================================== */}

            <ArticleSection
              id="crash-1980"
              eyebrow="Historical Crash 03"
              title="The 1980 Gold Crash: The Deepest and Longest Drawdown"
            >
              <Paragraph>
                The collapse following gold's
                January 1980 peak remains
                one of the most striking
                episodes in modern precious
                metals history.
              </Paragraph>

              <Paragraph>
                On January 21, 1980, the
                London reference price reached
                $850 per ounce. Inflation was
                elevated, geopolitical tensions
                were intense and demand for
                safe-haven assets had surged.
              </Paragraph>

              <Paragraph>
                Market conditions subsequently
                reversed. Although gold
                experienced significant
                fluctuations and intermittent
                rallies, the broader decline
                extended across the following
                years. Gold eventually reached
                $252.80 per ounce on
                July 20, 1999.
              </Paragraph>

              <Paragraph>
                Relative to the 1980 peak,
                the cumulative nominal decline
                amounted to approximately{" "}
                <Strong>70.3%</Strong>.
              </Paragraph>

              <SubHeading>
                Why Did Gold Prices Collapse
                After the 1980 Peak?
              </SubHeading>

              <Paragraph>
                A decisive shift in US
                monetary policy played a
                major role. Under Federal
                Reserve Chairman Paul Volcker,
                policymakers implemented
                aggressive measures to
                combat inflation, including
                exceptionally high
                interest rates.
              </Paragraph>

              <Paragraph>
                As inflation declined and
                real interest rates increased,
                the opportunity cost of
                owning gold rose. A stronger
                dollar and changing economic
                and political conditions
                further reduced gold's appeal
                during substantial portions
                of the period.
              </Paragraph>

              <Paragraph>
                During the 1990s, sales
                by some central banks
                and greater confidence
                in financial assets
                also contributed to
                downward pressure
                on gold prices.
              </Paragraph>

              <SubHeading>
                How Long Did Gold Take
                to Recover After 1980?
              </SubHeading>

              <Paragraph>
                Gold did not move above
                its previous nominal
                high of $850 until
                January 3, 2008—nearly
                28 years after its
                January 1980 peak.
              </Paragraph>

              <Paragraph>
                However, investors
                should distinguish
                between two different
                measures of recovery:
              </Paragraph>

              <ArticleList
                items={[
                  <>
                    <Strong>Nominal recovery:</Strong>{" "}
                    The dollar price per
                    ounce returns to its
                    former recorded high.
                  </>,
                  <>
                    <Strong>Real recovery:</Strong>{" "}
                    The investment regains
                    its original purchasing
                    power after accounting
                    for inflation.
                  </>,
                ]}
              />

              <Paragraph>
                Reaching $850 again in
                2008 therefore did
                not mean an investor
                who bought gold in
                January 1980 had
                fully recovered the
                purchasing power
                of that investment.
              </Paragraph>

              <Paragraph>
                It is equally important
                to understand that
                the 70.3% figure
                describes the overall
                peak-to-trough drawdown
                between 1980 and 1999.
                It does not imply
                that gold declined
                continuously without
                intervening recoveries.
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                2008
                =========================================== */}

            <ArticleSection
              id="crash-2008"
              eyebrow="Historical Crash 04"
              title="Gold's 2008 Crash During the Global Financial Crisis"
            >
              <Paragraph>
                One of the more surprising
                episodes in gold market
                history occurred during
                the 2008 global financial
                crisis. Despite gold's
                reputation as a safe
                haven, its price
                declined sharply.
              </Paragraph>

              <Paragraph>
                The London benchmark
                reached $1,011.25
                per ounce on
                March 17, 2008,
                before falling
                to $712.50 on
                October 24 of
                the same year.
              </Paragraph>

              <Paragraph>
                That represented
                a decline of
                approximately{" "}
                <Strong>29.5%</Strong>.
              </Paragraph>

              <SubHeading>
                Why Did Gold Fall
                During a Financial Crisis?
              </SubHeading>

              <Paragraph>
                The crisis triggered
                widespread asset
                liquidations as
                investors sought
                cash to meet
                financial obligations,
                margin requirements
                and losses elsewhere
                in their portfolios.
              </Paragraph>

              <Paragraph>
                Under such conditions,
                investors may sell
                gold not because
                they have lost
                confidence in its
                long-term investment
                characteristics,
                but because they
                urgently need
                liquidity.
              </Paragraph>

              <Paragraph>
                Changes in the US
                dollar and expectations
                for economic growth
                and inflation also
                contributed to
                volatility.
              </Paragraph>

              <Paragraph>
                Gold subsequently
                recovered as monetary
                easing continued,
                interest rates
                declined and
                financial-system
                concerns remained.
                It surpassed its
                previous peak in
                September 2009.
              </Paragraph>

              <Paragraph>
                The episode demonstrates
                that even an asset
                commonly viewed as
                defensive can fall
                substantially during
                a crisis, including
                when its longer-term
                economic fundamentals
                appear supportive.
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                FEATURED BROKERS
                SAME POSITION AS ARABIC ARTICLE
                =========================================== */}

            <FeaturedGoldBrokers brokers={featuredGoldBrokers} />

            {/* ===========================================
                2011–2015
                =========================================== */}

            <ArticleSection
              id="crash-2011"
              eyebrow="Historical Crash 05"
              title="The 2011–2015 Gold Price Crash: Years of Declining Prices"
            >
              <Paragraph>
                Following several years
                of gains associated
                with the global
                financial crisis
                and its aftermath,
                gold reached a
                reference peak
                of $1,895 per
                ounce in
                September 2011.
              </Paragraph>

              <Paragraph>
                The market then
                entered a prolonged
                downturn, ultimately
                reaching $1,049.40
                per ounce in
                December 2015.
                The peak-to-trough
                loss was approximately{" "}
                <Strong>44.6%</Strong>.
              </Paragraph>

              <SubHeading>
                Why Did Gold Prices
                Keep Falling After 2011?
              </SubHeading>

              <Paragraph>
                The decline reflected
                gradual changes in
                the global economic
                environment. These
                included improvement
                in the US economy,
                growing expectations
                of tighter monetary
                policy, a stronger
                dollar and reduced
                concerns about
                some of the financial
                risks that had
                previously supported
                gold demand.
              </Paragraph>

              <Paragraph>
                Outflows from certain
                gold-backed investment
                products further
                added to selling
                pressure.
              </Paragraph>

              <Paragraph>
                Gold did not
                surpass the
                September 2011
                reference high
                until July 2020,
                nearly nine years
                after the original
                peak.
              </Paragraph>

              <Paragraph>
                This cycle illustrates
                that recovery can
                take many years
                even when a drawdown
                is considerably
                smaller than
                the historic
                1980–1999 decline.
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                2020–2022
                =========================================== */}

            <ArticleSection
              id="crash-2020"
              eyebrow="Historical Crash 06"
              title="Gold's 2020–2022 Decline: Inflation, Interest Rates and the Dollar"
            >
              <Paragraph>
                Gold rallied strongly
                during the early
                stages of the
                COVID-19 pandemic
                in 2020, supported
                by extraordinary
                monetary policies
                and widespread
                concerns about
                the global economy.
              </Paragraph>

              <Paragraph>
                On August 6, 2020,
                the London benchmark
                reached $2,067.15
                per ounce, before
                declining to
                $1,628.75 on
                November 3, 2022.
              </Paragraph>

              <Paragraph>
                The resulting
                drawdown was
                approximately{" "}
                <Strong>21.2%</Strong>.
              </Paragraph>

              <SubHeading>
                What Drove Gold
                Prices Lower?
              </SubHeading>

              <Paragraph>
                Although inflation
                increased during
                this period,
                aggressive US
                monetary tightening,
                rising bond yields
                and a stronger
                dollar reduced
                the relative
                appeal of gold.
              </Paragraph>

              <Paragraph>
                This distinction
                matters for investors:
                high inflation
                does not automatically
                translate into
                higher gold prices.
                Real yields and
                expectations for
                future monetary
                policy can exert
                substantial influence
                over gold valuations.
              </Paragraph>

              <Paragraph>
                On December 28, 2023,
                the London afternoon
                benchmark exceeded
                the August 2020 peak,
                reaching $2,078.40
                per ounce according
                to the London
                Bullion Market
                Association (LBMA).
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                2026
                =========================================== */}

            <ArticleSection
              id="crash-2026"
              eyebrow="Historical Crash 07 — Ongoing"
              title="The 2026 Gold Price Crash: A Recovery Still in Progress"
            >
              <Paragraph>
                Gold experienced
                an exceptionally
                volatile market
                cycle during 2026
                after a powerful
                rally pushed
                prices to
                unprecedented
                historical highs.
              </Paragraph>

              <Paragraph>
                According to the
                World Gold Council,
                the London afternoon
                reference price
                reached{" "}
                <Strong>
                  $5,405 per troy ounce
                </Strong>{" "}
                on January 29, 2026.
              </Paragraph>

              <Paragraph>
                The market subsequently
                faced recurring
                selling pressure,
                with declines
                intensifying
                during November.
              </Paragraph>

              <SubHeading>
                How Far Did Gold
                Fall in November 2026?
              </SubHeading>

              <Paragraph>
                On November 20, 2026,
                spot gold fell to
                $3,502.49 per ounce,
                its lowest level
                in approximately
                14 months, according
                to a Reuters report.
              </Paragraph>

              <Paragraph>
                Compared with an
                intraday peak
                near $5,595
                reached in January,
                that represented
                a decline of
                approximately{" "}
                <Strong>37.4%</Strong>.
              </Paragraph>

              <Note
                title="Why Is the 2026 Drawdown Calculated Differently?"
                tone="amber"
              >
                The 37.4% decline
                should not be
                directly compared
                with the historical
                benchmark-based
                percentages in
                the main table.
                It uses intraday
                spot-market prices
                rather than
                London afternoon
                benchmark quotations.
              </Note>

              <Paragraph>
                Gold rebounded
                on November 23.
                According to a
                Reuters market
                update, spot
                gold reached
                $3,617.41 per
                ounce at 10:36 GMT,
                an increase of
                approximately 2.4%.
              </Paragraph>

              <Paragraph>
                That figure represents
                a market snapshot,
                not a fixed price
                for the entire
                trading day.
              </Paragraph>

              <SubHeading>
                What Caused Gold's
                November 2026 Sell-Off?
              </SubHeading>

              <Paragraph>
                Several developments
                contributed to
                the latest
                downward pressure:
              </Paragraph>

              <ArticleList
                items={[
                  "Expectations that US monetary policy could remain restrictive, alongside increased market speculation about further interest-rate increases.",
                  "A stronger US dollar and greater demand for interest-bearing financial assets.",
                  "Volatility across equity markets, particularly technology stocks associated with artificial intelligence.",
                  "Gold liquidations by investors seeking cash, reducing leverage or managing broader portfolio risk.",
                ]}
              />

              <Paragraph>
                These developments
                reinforce an important
                lesson: demand for
                gold as a safe
                haven does not
                prevent large
                short-term losses,
                particularly when
                liquidity needs
                or higher yields
                become dominant
                market considerations.
              </Paragraph>

              <Paragraph>
                As of November 23,
                2026, it remained
                impossible to
                identify the
                definitive low
                of this cycle
                or determine
                when a full
                recovery might
                occur.
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                CAUSES
                =========================================== */}

            <ArticleSection
              id="causes"
              eyebrow="Economic Analysis"
              title="Why Do Gold Prices Crash? Five Recurring Historical Factors"
            >
              <Paragraph>
                While every gold
                bear market has
                unique characteristics,
                several economic
                forces repeatedly
                appear throughout
                historical drawdowns.
              </Paragraph>

              <SubHeading>
                1. Rising Real Interest Rates
              </SubHeading>

              <Paragraph>
                Gold does not
                generate interest
                or dividend income.
                When inflation-adjusted
                yields on bonds and
                cash instruments rise,
                those assets can
                become relatively
                more attractive
                than holding gold.
              </Paragraph>

              <SubHeading>
                2. A Stronger US Dollar
              </SubHeading>

              <Paragraph>
                Gold often faces
                downward pressure
                when the US
                dollar strengthens.
                Because the
                metal is priced
                internationally
                in dollars,
                exchange-rate
                movements can
                influence demand.
                However, the
                relationship is
                not constant.
              </Paragraph>

              <SubHeading>
                3. Improving Economic Confidence
              </SubHeading>

              <Paragraph>
                When economic
                and financial
                conditions become
                more stable,
                investors may
                shift capital
                away from
                defensive assets
                toward equities
                and other
                higher-risk
                investments.
              </Paragraph>

              <SubHeading>
                4. Forced Selling and Liquidity Needs
              </SubHeading>

              <Paragraph>
                As demonstrated
                in 2008 and
                during parts
                of 2026,
                investors can
                sell gold to
                meet margin
                calls, cover
                losses elsewhere
                or raise
                immediate cash.
              </Paragraph>

              <SubHeading>
                5. Central Bank and ETF Flows
              </SubHeading>

              <Paragraph>
                Changes in central
                bank gold purchases
                and sales, together
                with inflows and
                outflows from
                gold-backed
                exchange-traded
                funds, can
                influence prices,
                especially when
                they coincide
                with major
                monetary-policy
                changes.
              </Paragraph>

              <Note title="Economic Takeaway">
                No single factor
                explains every
                historical gold
                price collapse.
                Real yields,
                the dollar,
                liquidity,
                geopolitical
                conditions and
                investment flows
                interact differently
                across market cycles.
              </Note>
            </ArticleSection>

            {/* ===========================================
                RECOVERY CALCULATIONS
                =========================================== */}

            <ArticleSection
              id="recovery-math"
              eyebrow="Understanding Drawdowns"
              title="How Much Must Gold Rise to Recover From a Price Crash?"
            >
              <Paragraph>
                A common mistake
                is assuming that
                a 50% decline
                requires only
                a 50% gain
                to return to
                the original price.
              </Paragraph>

              <Paragraph>
                Percentage losses
                and gains are
                calculated from
                different starting
                values, which
                makes recovering
                from major
                drawdowns
                mathematically
                challenging.
              </Paragraph>

              <RecoveryTable />

              <Paragraph>
                For example,
                if gold falls
                from $2,000
                to $1,000
                per ounce,
                its price
                must increase
                by 100%
                from the
                new low
                to return
                to $2,000.
              </Paragraph>

              <Paragraph>
                This helps
                explain why
                some historical
                gold recovery
                periods extended
                over many
                years, particularly
                following very
                deep declines.
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                FORECASTING AND RISK
                =========================================== */}

            <ArticleSection
              id="forecast"
              eyebrow="Investment Lessons"
              title="Can Historical Gold Crashes Predict the Next Market Downturn?"
            >
              <Paragraph>
                Studying past
                gold price
                cycles can
                improve an
                investor's
                understanding
                of market
                behavior and
                downside risk.
                It cannot,
                however,
                reliably predict
                future tops
                and bottoms.
              </Paragraph>

              <Paragraph>
                A 20% decline
                might be
                followed by
                a relatively
                rapid recovery,
                as in 1978.
                Under different
                economic and
                monetary conditions,
                a similar
                initial loss
                could develop
                into a much
                longer downturn.
              </Paragraph>

              <Paragraph>
                Likewise,
                the fact
                that gold
                has previously
                declined by
                40% or
                70% does
                not establish
                that the
                same percentage
                decline will
                occur in
                the present
                cycle.
              </Paragraph>

              <Paragraph>
                Historical
                drawdown figures
                are therefore
                best used
                for risk
                assessment
                and scenario
                analysis,
                not as
                guaranteed
                price forecasts
                or specific
                trading targets.
              </Paragraph>

              <Paragraph>
                These risks
                are particularly
                relevant to
                traders using
                leverage to
                speculate on
                gold through
                contracts for
                difference (CFDs).
                Leveraged
                positions can
                produce losses
                that are
                substantially
                larger relative
                to the margin
                committed than
                the underlying
                percentage move
                in gold.
                Margin requirements
                may also force
                positions to
                close long
                before any
                eventual market
                recovery.
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                FREQUENTLY ASKED QUESTIONS
                =========================================== */}

            <ArticleSection
              id="faq"
              eyebrow="Common Investor Questions"
              title="Frequently Asked Questions About Gold Price Crashes"
            >
              <div className="!mt-6 rounded-[16px] border border-slate-200 bg-[#fcfdff] p-4 sm:p-6">

                <FAQItem question="What was the biggest gold price crash in modern history?">
                  Among the historical episodes
                  examined in this report,
                  gold experienced an
                  approximately 70.3%
                  peak-to-trough decline
                  between its January
                  1980 reference high
                  of $850 and its
                  July 1999 low
                  of $252.80.
                  This represents
                  a cumulative
                  long-term drawdown,
                  not an uninterrupted
                  decline.
                </FAQItem>

                <FAQItem question="How long did gold take to recover after the 1980 crash?">
                  Gold took nearly
                  28 years to
                  surpass its
                  previous nominal
                  peak in January
                  2008. Recovering
                  the original
                  inflation-adjusted
                  purchasing power
                  required longer.
                </FAQItem>

                <FAQItem question="Why did gold prices fall during the 2008 financial crisis?">
                  Investors sold
                  gold to raise
                  cash, meet
                  obligations and
                  cover losses
                  elsewhere, while
                  changes in the
                  US dollar and
                  economic expectations
                  also influenced
                  prices. Gold
                  subsequently recovered
                  as monetary
                  conditions shifted.
                </FAQItem>

                <FAQItem question="Is gold a safe investment that cannot lose value?">
                  No. Gold can
                  offer diversification
                  and sometimes act
                  as a hedge
                  against particular
                  risks, but
                  it can still
                  experience substantial
                  losses and
                  lengthy periods
                  of weak performance.
                  It does not
                  guarantee capital
                  protection.
                </FAQItem>

                <FAQItem question="Has gold recovered from its 2026 price crash?">
                  As of November
                  23, 2026,
                  gold had not
                  regained its
                  January reference
                  peak. Therefore,
                  the recovery
                  cycle remained
                  incomplete, and
                  the definitive
                  low could not
                  be confirmed.
                </FAQItem>

                <FAQItem question="Do rising interest rates always cause gold prices to fall?">
                  Not necessarily.
                  Higher real
                  interest rates
                  often reduce
                  gold's relative
                  appeal, but
                  prices are
                  also influenced
                  by the dollar,
                  inflation expectations,
                  geopolitical risks,
                  central bank
                  demand and
                  investor flows.
                </FAQItem>

              </div>
            </ArticleSection>

            {/* ===========================================
                CONCLUSION
                =========================================== */}

            <ArticleSection
              id="conclusion"
              eyebrow="Final Assessment"
              title="What Can Investors Learn From History's Biggest Gold Crashes?"
            >
              <Paragraph>
                Gold's historical
                performance shows
                that its status
                as a safe-haven
                asset does
                not eliminate
                risk or guarantee
                positive returns
                over a given
                investment period.
              </Paragraph>

              <Paragraph>
                Since the 1970s,
                the metal has
                experienced
                significant
                drawdowns, ranging
                from corrections
                lasting weeks
                or months to
                declines requiring
                years—and in
                some cases
                decades—to
                recover previous
                price highs.
              </Paragraph>

              <Paragraph>
                The post-1980
                cycle demonstrated
                that gold could
                lose more than
                two-thirds of
                its nominal
                value between
                a peak and
                a subsequent
                trough. The
                2008 experience
                revealed that
                financial crises
                can also drive
                investors to
                sell defensive
                assets simply
                to obtain
                liquidity.
              </Paragraph>

              <Paragraph>
                More recently,
                the 2026 sell-off
                highlighted the
                importance of
                monitoring real
                interest rates,
                the US dollar,
                market liquidity
                and evolving
                investor expectations
                rather than
                assuming that
                historical patterns
                will automatically
                repeat.
              </Paragraph>

              <Paragraph>
                Ultimately,
                understanding
                the biggest
                gold price
                crashes will
                not allow
                traders to
                predict future
                market movements
                with certainty.
                It can,
                however,
                provide a
                stronger framework
                for recognizing
                downside risks
                and placing
                current gold
                price volatility
                in a broader
                historical context.
              </Paragraph>
            </ArticleSection>

            {/* ===========================================
                METHODOLOGY AND SOURCES
                =========================================== */}

            <ArticleSection
              id="methodology"
              eyebrow="Research Transparency"
              title="Research Methodology and Sources"
            >
              <Paragraph>
                This study
                uses nominal
                US dollar
                prices per
                troy ounce
                unless otherwise
                stated. Historical
                values are
                not adjusted
                for inflation.
              </Paragraph>

              <Paragraph>
                The historical
                comparisons are
                based on London
                afternoon gold
                benchmark pricing,
                alongside historical
                materials from
                the World Gold
                Council, financial
                disclosures filed
                with the
                US Securities
                and Exchange
                Commission and
                other published
                gold price
                references.
              </Paragraph>

              <Paragraph>
                Benchmark prices
                are distinguished
                from the intraday
                spot-market data
                discussed for
                2026. Combining
                different price
                series without
                identifying their
                methodology could
                lead to misleading
                drawdown comparisons.
              </Paragraph>

              <Note title="Methodological Limitations">
                The report uses
                published historical
                price references
                and comparative
                data to identify
                major peaks and
                troughs. It
                does not represent
                an independent
                recalculation of
                every daily
                observation in
                the raw LBMA
                historical dataset.
                Exact recovery
                dates should be
                independently
                verified before
                treating the
                analysis as
                a definitive
                historical reference.
              </Note>

              <SubHeading>
                Primary Sources and References
              </SubHeading>

              <ol className="!mt-4 space-y-3">
                {sources.map((source, index) => (
                  <li
                    key={source.url}
                    className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100 text-[10px] font-black text-blue-700">
                      {index + 1}
                    </span>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 flex-1 break-words text-[12px] font-bold leading-6 text-[#1765b5] underline-offset-4 hover:underline sm:text-[13px]"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ol>
            </ArticleSection>

            {/* ===========================================
                RISK DISCLAIMER
                =========================================== */}

            <div className="mt-8 rounded-[16px] border border-amber-200 bg-[#fffbef] p-4 sm:p-6">
              <h2 className="text-[15px] font-black text-amber-900">
                Risk Disclaimer
              </h2>

              <p className="mt-2 text-[12px] leading-[2] text-slate-700 sm:text-[14px]">
                This article is provided for
                informational and educational
                purposes only and does not
                constitute investment advice,
                a trading recommendation or
                a solicitation to buy or sell
                gold. Historical performance
                does not guarantee future
                results. The status of the
                2026 market decline may
                change as trading continues.
              </p>
            </div>

            {/* ===========================================
                ARTICLE FOOTER
                =========================================== */}

            <footer className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[13px] font-black text-[#102747]">
                  Broker Alarab
                </div>

                <p className="mt-1 text-[11px] leading-6 text-slate-500">
                  Independent financial market
                  research, broker reviews
                  and educational analysis.
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

/* =========================================================
   END OF ENGLISH GOLD ARTICLE
   ========================================================= */

