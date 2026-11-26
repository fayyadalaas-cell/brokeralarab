
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import GoldTradingHoursTool from "./GoldTradingHoursTool";

/* =========================================================
   BROKER ALARAB
   ARTICLE PAGE — BEST TIME TO TRADE GOLD
   Next.js App Router / Server Component
   ========================================================= */

const SITE = "https://brokeralarab.com";
const SLUG = "best-time-to-trade-gold";
const PATH = `/articles/${SLUG}`;
const URL = `${SITE}${PATH}`;

const ARTICLE = {
  title:
    "أفضل أوقات تداول الذهب خلال اليوم – دراسة إحصائية لحركة الأسعار",

  seoTitle:
    "أفضل أوقات تداول الذهب خلال اليوم – دراسة إحصائية",

  description:
    "اكتشف أفضل أوقات تداول الذهب بناءً على دراسة بيانات تاريخية تمتد لأكثر من 16 عاماً، ومقارنة حركة الأسعار حسب الساعة واليوم وجلسات التداول بتوقيت السعودية والكويت والإمارات.",

  category: "مقالات وتحليلات",
  subcategory: "الذهب والأسواق",
  publisher: "بروكر العرب",
  published: "2026-11-25",
  modified: "2026-11-25",
};

const HERO_IMAGE =
  "/articles/best-time-to-trade-gold.webp";

/* =========================================================
   METADATA
   ========================================================= */

export const metadata: Metadata = {
  title: ARTICLE.seoTitle,

  description: ARTICLE.description,

  alternates: {
    canonical: URL,

    languages: {
      ar: URL,
      en: `${SITE}/en/articles/${SLUG}`,
      "x-default": `${SITE}/en/articles/${SLUG}`,
    },
  },

  openGraph: {
    type: "article",

    url: URL,

    title: ARTICLE.title,

    description: ARTICLE.description,

    siteName: "Broker Alarab",

    locale: "ar_AR",

    alternateLocale: ["en_US"],

    publishedTime: ARTICLE.published,

    modifiedTime: ARTICLE.modified,

    section: ARTICLE.subcategory,

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

      "max-video-preview": -1,
    },
  },
};


/* =========================================================
   ARTICLE DATA
   ========================================================= */

/* =========================================================
   ARTICLE DATA
   ========================================================= */

const STUDY = {
  instrument: "XAU/USD",
  provider: "HistData",
  startDate: "2010-01-01",
  endDate: "2025-12-31",
  recentStartDate: "2026-01-01",
  recentEndDate: "2026-10-31",
  timeframe: "M1",
  analysisTimeframe: "H1",
  timezone: "UTC+3",
  timezoneLabel: "توقيت السعودية والكويت",
  historicalYears: 16,
};

/* =========================================================
   VERIFIED RESEARCH DATA
   HISTDATA — XAU/USD
   ========================================================= */

const RESEARCH_STATS = {
  rawMinuteRecords: 6192226,
  cleanMinuteRecords: 6187893,
  duplicateRecords: 427,
  conflictingRecords: 3906,
  totalHourlyCandles: 91161,
  historicalHourlyCandles: 84040,
  recentHourlyCandles: 4586,
};

type HourlyVolatility = {
  hour: number;
  samples: number;
  averageUsd: number;
  averagePercent: number;
  medianPercent: number;
  recentUsd: number;
  recentPercent: number;
  recentSamples: number;
};

const HOURLY_DATA: HourlyVolatility[] = [
  { hour: 0, samples: 2314, averageUsd: 3.0345, averagePercent: 0.1627, medianPercent: 0.1300, recentUsd: 13.1727, recentPercent: 0.2873, recentSamples: 180 },
  { hour: 1, samples: 96, averageUsd: 7.8167, averagePercent: 0.3709, medianPercent: 0.1893, recentUsd: 34.6406, recentPercent: 0.7378, recentSamples: 19 },
  { hour: 2, samples: 1929, averageUsd: 4.6961, averagePercent: 0.2291, medianPercent: 0.1579, recentUsd: 22.6092, recentPercent: 0.4893, recentSamples: 203 },
  { hour: 3, samples: 3212, averageUsd: 3.4128, averagePercent: 0.1908, medianPercent: 0.1520, recentUsd: 20.4538, recentPercent: 0.4453, recentSamples: 212 },
  { hour: 4, samples: 3778, averageUsd: 4.2621, averagePercent: 0.2408, medianPercent: 0.1933, recentUsd: 28.5063, recentPercent: 0.6208, recentSamples: 208 },
  { hour: 5, samples: 3735, averageUsd: 4.6623, averagePercent: 0.2594, medianPercent: 0.2037, recentUsd: 28.6457, recentPercent: 0.6264, recentSamples: 196 },
  { hour: 6, samples: 3599, averageUsd: 3.5068, averagePercent: 0.1926, medianPercent: 0.1557, recentUsd: 20.7950, recentPercent: 0.4596, recentSamples: 203 },
  { hour: 7, samples: 3468, averageUsd: 3.0012, averagePercent: 0.1640, medianPercent: 0.1317, recentUsd: 14.8886, recentPercent: 0.3294, recentSamples: 204 },
  { hour: 8, samples: 3528, averageUsd: 3.1034, averagePercent: 0.1716, medianPercent: 0.1402, recentUsd: 18.1330, recentPercent: 0.3947, recentSamples: 211 },
  { hour: 9, samples: 3692, averageUsd: 3.8274, averagePercent: 0.2139, medianPercent: 0.1776, recentUsd: 23.2824, recentPercent: 0.5110, recentSamples: 205 },
  { hour: 10, samples: 3874, averageUsd: 4.4763, averagePercent: 0.2580, medianPercent: 0.2169, recentUsd: 19.9063, recentPercent: 0.4390, recentSamples: 208 },
  { hour: 11, samples: 3980, averageUsd: 4.9805, averagePercent: 0.2904, medianPercent: 0.2455, recentUsd: 20.0333, recentPercent: 0.4378, recentSamples: 207 },
  { hour: 12, samples: 3942, averageUsd: 4.3815, averagePercent: 0.2531, medianPercent: 0.2122, recentUsd: 19.7594, recentPercent: 0.4324, recentSamples: 204 },
  { hour: 13, samples: 3912, averageUsd: 4.0945, averagePercent: 0.2388, medianPercent: 0.1996, recentUsd: 17.4778, recentPercent: 0.3815, recentSamples: 205 },
  { hour: 14, samples: 3853, averageUsd: 4.0265, averagePercent: 0.2335, medianPercent: 0.1943, recentUsd: 19.0521, recentPercent: 0.4164, recentSamples: 211 },
  { hour: 15, samples: 3897, averageUsd: 4.6496, averagePercent: 0.2732, medianPercent: 0.2310, recentUsd: 21.7833, recentPercent: 0.4766, recentSamples: 207 },
  { hour: 16, samples: 4032, averageUsd: 7.9633, averagePercent: 0.4754, medianPercent: 0.3997, recentUsd: 29.5159, recentPercent: 0.6439, recentSamples: 188 },
  { hour: 17, samples: 4038, averageUsd: 7.8877, averagePercent: 0.4634, medianPercent: 0.4034, recentUsd: 35.8613, recentPercent: 0.7786, recentSamples: 177 },
  { hour: 18, samples: 4046, averageUsd: 7.8082, averagePercent: 0.4595, medianPercent: 0.3899, recentUsd: 34.8184, recentPercent: 0.7468, recentSamples: 176 },
  { hour: 19, samples: 4012, averageUsd: 5.8725, averagePercent: 0.3479, medianPercent: 0.2903, recentUsd: 27.0477, recentPercent: 0.5866, recentSamples: 188 },
  { hour: 20, samples: 3959, averageUsd: 4.7787, averagePercent: 0.2829, medianPercent: 0.2269, recentUsd: 21.0394, recentPercent: 0.4581, recentSamples: 195 },
  { hour: 21, samples: 3844, averageUsd: 4.5956, averagePercent: 0.2729, medianPercent: 0.2242, recentUsd: 21.4263, recentPercent: 0.4658, recentSamples: 196 },
  { hour: 22, samples: 3706, averageUsd: 4.3158, averagePercent: 0.2574, medianPercent: 0.1821, recentUsd: 20.0791, recentPercent: 0.4403, recentSamples: 194 },
  { hour: 23, samples: 3594, averageUsd: 3.8803, averagePercent: 0.2263, medianPercent: 0.1784, recentUsd: 20.0061, recentPercent: 0.4346, recentSamples: 189 },
];

/* =========================================================
   TRADING SESSION STATISTICS
   2010–2025
   ========================================================= */

const SESSION_DATA = [
  {
    name: "جلسة طوكيو",
    nameEn: "Tokyo",
    samples: 32866,
    averageUsd: 3.95,
    averagePercent: 0.2222,
    medianPercent: 0.1791,
    color: "#64748b",
  },
  {
    name: "جلسة لندن",
    nameEn: "London",
    samples: 35636,
    averageUsd: 5.68,
    averagePercent: 0.3331,
    medianPercent: 0.2683,
    color: "#2587e7",
  },
  {
    name: "جلسة نيويورك",
    nameEn: "New York",
    samples: 34541,
    averageUsd: 5.79,
    averagePercent: 0.3418,
    medianPercent: 0.2730,
    color: "#176ac8",
  },
  {
    name: "تداخل لندن ونيويورك",
    nameEn: "London–New York Overlap",
    samples: 16301,
    averageUsd: 7.18,
    averagePercent: 0.4243,
    medianPercent: 0.3573,
    color: "#c49a36",
  },
];

/* =========================================================
   WEEKDAY VOLATILITY STATISTICS
   ========================================================= */

const WEEKDAY_DATA = [
  {
    day: "الاثنين",
    samples: 16128,
    averageUsd: 4.6636,
    averagePercent: 0.2663,
    recentUsd: 24.0183,
    recentPercent: 0.5266,
    recentSamples: 884,
  },
  {
    day: "الثلاثاء",
    samples: 16916,
    averageUsd: 4.6976,
    averagePercent: 0.2702,
    recentUsd: 21.4810,
    recentPercent: 0.4687,
    recentSamples: 942,
  },
  {
    day: "الأربعاء",
    samples: 16920,
    averageUsd: 4.7773,
    averagePercent: 0.2755,
    recentUsd: 21.0395,
    recentPercent: 0.4594,
    recentSamples: 914,
  },
  {
    day: "الخميس",
    samples: 17060,
    averageUsd: 4.8152,
    averagePercent: 0.2802,
    recentUsd: 24.0142,
    recentPercent: 0.5214,
    recentSamples: 898,
  },
  {
    day: "الجمعة",
    samples: 16598,
    averageUsd: 4.8246,
    averagePercent: 0.2802,
    recentUsd: 22.0857,
    recentPercent: 0.4803,
    recentSamples: 914,
  },
];

/* =========================================================
   HOURLY VOLATILITY HEATMAP
   Average hourly range in percent
   Saudi Arabia / UTC+3
   ========================================================= */

const HEATMAP_DATA = [
  {
    day: "الاثنين",
    values: [
      null, 0.589, 0.361, 0.225, 0.276, 0.285,
      0.200, 0.165, 0.171, 0.216, 0.264, 0.293,
      0.242, 0.236, 0.231, 0.255, 0.384, 0.403,
      0.400, 0.307, 0.251, 0.244, 0.213, 0.207,
    ],
  },
  {
    day: "الثلاثاء",
    values: [
      0.148, 0.249, 0.192, 0.176, 0.232, 0.251,
      0.193, 0.163, 0.171, 0.213, 0.258, 0.302,
      0.264, 0.238, 0.229, 0.274, 0.447, 0.467,
      0.474, 0.352, 0.281, 0.259, 0.234, 0.213,
    ],
  },
  {
    day: "الأربعاء",
    values: [
      0.148, 0.335, 0.187, 0.180, 0.228, 0.252,
      0.190, 0.157, 0.176, 0.204, 0.249, 0.276,
      0.248, 0.239, 0.229, 0.267, 0.456, 0.454,
      0.457, 0.338, 0.287, 0.297, 0.379, 0.264,
    ],
  },
  {
    day: "الخميس",
    values: [
      0.178, 0.355, 0.203, 0.192, 0.238, 0.258,
      0.188, 0.162, 0.167, 0.218, 0.263, 0.295,
      0.263, 0.249, 0.239, 0.292, 0.507, 0.495,
      0.458, 0.371, 0.301, 0.287, 0.239, 0.223,
    ],
  },
  {
    day: "الجمعة",
    values: [
      0.162, 0.291, 0.185, 0.178, 0.229, 0.250,
      0.193, 0.174, 0.172, 0.218, 0.256, 0.285,
      0.248, 0.231, 0.238, 0.276, 0.585, 0.498,
      0.507, 0.370, 0.293, 0.276, 0.214, 0.222,
    ],
  },
];

/* =========================================================
   HISTORICAL PRICE RANGE FREQUENCIES
   ========================================================= */

const RANGE_PROBABILITY_DATA = [
  {
    threshold: 5,
    historical: 30.33,
    recent: 99.45,
  },
  {
    threshold: 10,
    historical: 8.63,
    recent: 84.23,
  },
  {
    threshold: 20,
    historical: 1.52,
    recent: 39.34,
  },
  {
    threshold: 30,
    historical: 0.41,
    recent: 18.10,
  },
  {
    threshold: 50,
    historical: 0.05,
    recent: 6.08,
  },
];

const HEATMAP_SAMPLES = [
  [0,21,423,684,763,752,720,689,699,728,768,782,774,765,759,766,803,801,793,788,771,721,691,667],
  [417,18,364,620,754,752,717,709,713,745,783,802,804,795,779,788,809,817,819,812,807,790,763,739],
  [478,17,377,630,759,747,718,688,708,736,773,806,788,787,775,787,809,815,811,810,798,795,771,737],
  [521,22,394,642,757,757,733,702,713,754,785,804,798,789,777,784,813,812,819,813,801,784,753,733],
  [480,18,371,636,745,727,711,680,695,729,765,786,778,776,763,772,798,793,804,789,782,754,728,718],
];

const contents = [
  { id: "summary", label: "أهم نتائج الدراسة" },
  { id: "hourly-volatility", label: "حركة الذهب حسب الساعة" },
  { id: "featured-gold-brokers", label: "شركات تداول الذهب" },
  { id: "trading-sessions", label: "جلسات تداول الذهب" },
  { id: "local-time", label: "الأوقات حسب الدولة" },
  { id: "interactive-tool", label: "محلل أوقات تداول الذهب" },
  { id: "weekdays", label: "أفضل أيام التداول" },
  { id: "heatmap", label: "خريطة تقلبات الذهب" },
  { id: "price-probability", label: "احتمالات حركة الأسعار" },
  { id: "economic-news", label: "تأثير الأخبار الاقتصادية" },
  { id: "strategies", label: "الأوقات حسب الاستراتيجية" },
  { id: "broker-comparison", label: "مقارنة شركات الذهب" },
  { id: "risks", label: "مخاطر التداول" },
  { id: "faq", label: "الأسئلة الشائعة" },
  { id: "conclusion", label: "الخلاصة" },
  { id: "methodology", label: "المنهجية والمصادر" },
];

const sources = [
  {
    title: "HistData – Historical Forex and Gold Price Data",
    url: "https://www.histdata.com/",
  },
  {
    title: "HistData – Historical Data Download",
    url: "https://www.histdata.com/download-free-forex-historical-data/",
  },
  {
    title: "HistData – Frequently Asked Questions",
    url: "https://www.histdata.com/f-a-q/",
  },
  {
    title: "Federal Reserve – FOMC Calendars",
    url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
  },
  {
    title: "U.S. Bureau of Labor Statistics",
    url: "https://www.bls.gov/",
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

      <h2 className="border-r-[4px] border-[#2587e7] pr-3 text-[22px] font-black leading-[1.5] tracking-tight text-[#101d35] sm:pr-4 sm:text-[29px]">
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
  return (
    <figure className="mt-6 sm:mt-8">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[#071a31] shadow-[0_12px_35px_rgba(15,23,42,0.10)] sm:rounded-[22px]">
        <Image
          src={HERO_IMAGE}
          alt="أفضل أوقات تداول الذهب خلال اليوم وتحليل حركة أسعار XAU/USD خلال جلسات التداول العالمية"
          fill
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, (max-width: 1520px) 92vw, 1440px"
          className="object-cover object-center"
        />
      </div>

      <figcaption className="mt-2 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
        صورة توضيحية لحركة الذهب خلال جلسات التداول العالمية
        واختلاف مستويات التقلب خلال ساعات اليوم.
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
      {/* =========================
          MOBILE ONLY
          ========================= */}

      <nav
        aria-label="فهرس المقال للموبايل"
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
                محتويات المقال
              </span>

              <span className="mt-0.5 block text-[10px] text-slate-500">
                {contents.length} قسماً • اضغط لاستعراضها
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
                  className="flex min-h-[45px] min-w-0 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-right transition active:bg-blue-50"
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

      {/* =========================
          DESKTOP / TABLET
          ========================= */}

      <nav
        aria-label="فهرس محتويات المقال"
        className="my-6 hidden overflow-hidden rounded-[20px] border border-[#dce6f2] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:block"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#e5edf6] bg-[linear-gradient(270deg,#f3f8ff_0%,#ffffff_100%)] px-6 py-5">

          <div>
            <h2 className="text-[19px] font-black text-[#102747]">
              محتويات المقال
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              انتقل مباشرة إلى القسم الذي يهمك
            </p>
          </div>

          <span className="rounded-full border border-blue-100 bg-[#eaf3ff] px-3 py-1.5 text-[11px] font-black text-[#1765b5]">
            {contents.length} موضوعاً
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 p-5 xl:grid-cols-3">
          {contents.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex min-h-[54px] min-w-0 items-center gap-3 rounded-[12px] border border-[#e8eef6] bg-[#f8fafc] px-3 py-2.5 text-right transition-all duration-200 hover:-translate-y-0.5 hover:border-[#aacdf4] hover:bg-[#edf6ff]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white text-[11px] font-black text-[#176ac8] shadow-sm ring-1 ring-[#e2ebf6] transition group-hover:bg-[#176ac8] group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1 text-[12px] font-extrabold leading-5 text-[#243b57] group-hover:text-[#176ac8]">
                {item.label}
              </span>

              <span className="text-[#9aacc2] group-hover:text-[#176ac8]">
                ‹
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


/* =========================================================
   FAQ COMPONENT
   ========================================================= */

   /* =========================================================
   RESEARCH SUMMARY CARDS
   ========================================================= */

function ResearchSummaryCards() {
  const cards = [
    {
      label: "الفترة التاريخية الأساسية",
      value: `${STUDY.historicalYears} عاماً`,
      description: "2010 – 2025",
    },
    {
      label: "إجمالي سجلات الدقيقة الخام",
      value: RESEARCH_STATS.rawMinuteRecords.toLocaleString("en-US"),
      description: "جميع الفترات المتاحة",
    },
    {
      label: "شموع الساعة المدروسة",
      value: HOURLY_DATA.reduce(
        (sum, row) => sum + row.samples,
        0
      ).toLocaleString("en-US"),
      description: "الدراسة التاريخية الأساسية",
    },
    {
      label: "الفترة المرجعية للمقارنة",
      value: "2026",
      description: "يناير – أكتوبر",
    },
  ];

  return (
    <div
      dir="rtl"
      className="!my-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
    >
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-[15px] border border-[#dce6f2] bg-[#f7faff] px-3 py-5 text-center shadow-sm sm:rounded-[18px] sm:px-5 sm:py-6"
        >
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#176ac8] to-[#38bdf8]" />

          <p className="flex min-h-[38px] items-center justify-center text-center text-[10px] font-bold leading-5 text-slate-500 sm:text-[12px]">
            {card.label}
          </p>

          <div className="mt-2 w-full text-center text-[23px] font-black leading-tight tracking-tight text-[#102747] tabular-nums sm:text-[32px]">
            <bdi>{card.value}</bdi>
          </div>

          <p className="mt-3 min-h-[20px] text-center text-[10px] font-bold leading-5 text-[#176ac8] sm:text-[12px]">
            <bdi>{card.description}</bdi>
          </p>

        </div>
      ))}
    </div>
  );
}

/* =========================================================
   HOURLY GOLD VOLATILITY CHART
   ========================================================= */

function HourlyVolatilityChart() {
  const chartMax = Math.ceil(
    Math.max(
      ...HOURLY_DATA.map((row) => row.averagePercent)
    ) * 10
  ) / 10;

  const ticks = Array.from(
    { length: 6 },
    (_, index) => (chartMax / 5) * index
  );

  return (
    <figure className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white p-3.5 sm:p-6">

      <figcaption className="mb-5">

        <h3 className="text-[17px] font-black leading-7 text-[#102747] sm:text-[21px]">
          متوسط نطاق حركة الذهب خلال ساعات اليوم
        </h3>

        <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          الفترة التاريخية 2010–2025 — بتوقيت السعودية
          والكويت وقطر والبحرين (UTC+3).
        </p>

      </figcaption>

      <div className="overflow-x-auto">

        <svg
          viewBox="0 0 960 340"
          className="h-auto w-full min-w-[580px]"
          role="img"
          aria-label="رسم بياني لمتوسط نطاق حركة أسعار الذهب خلال ساعات اليوم"
          direction="ltr"
        >

          {/* GRID AND Y AXIS */}

          {ticks.map((tick) => {
            const y = 280 - (tick / chartMax) * 240;

            return (
              <g key={tick}>

                <line
                  x1="62"
                  x2="940"
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />

                <text
                  x="52"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#64748b"
                >
                  {tick.toFixed(1)}%
                </text>

              </g>
            );
          })}

          {/* HOURLY BARS */}

          {HOURLY_DATA.map((row) => {
            const height =
              (row.averagePercent / chartMax) * 240;

            const x = 68 + row.hour * 36.2;

            const lowSample = row.samples < 500;

            const peakHour =
              row.hour >= 16 && row.hour <= 18;

            const fill = lowSample
              ? "#94a3b8"
              : peakHour
              ? "#c49a36"
              : "#2587e7";

            return (
              <g key={row.hour}>

                <rect
                  x={x}
                  y={280 - height}
                  width="26"
                  height={height}
                  rx="4"
                  fill={fill}
                >
                  <title>
                    {`${String(row.hour).padStart(2, "0")}:00 — ${row.averagePercent.toFixed(3)}% — ${row.samples} samples`}
                  </title>
                </rect>

                <text
                  x={x + 13}
                  y="302"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="#475569"
                >
                  {String(row.hour).padStart(2, "0")}
                </text>

              </g>
            );
          })}

          <line
            x1="62"
            x2="940"
            y1="280"
            y2="280"
            stroke="#cbd5e1"
          />

          <text
            x="500"
            y="329"
            textAnchor="middle"
            fontSize="12"
            fill="#64748b"
          >
            الساعة بتوقيت السعودية والكويت
          </text>

        </svg>

      </div>

      {/* LEGEND */}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#2587e7]" />
          <span className="text-[11px] font-bold text-slate-600">
            متوسط نطاق الحركة
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#c49a36]" />
          <span className="text-[11px] font-bold text-slate-600">
            ساعات النشاط المرتفع
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#94a3b8]" />
          <span className="text-[11px] font-bold text-slate-600">
            عينة إحصائية محدودة
          </span>
        </div>

      </div>

      <p className="mt-5 border-t border-slate-100 pt-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        المصدر: بيانات HistData التاريخية، إعداد وتحليل
        بروكر العرب. يقيس الرسم متوسط الفرق بين أعلى
        وأدنى سعر خلال الساعة كنسبة من سعر افتتاحها،
        ولا يمثل اتجاه الحركة أو العائد المتوقع.
        لا تضمن الأنماط التاريخية تكرارها مستقبلاً.
      </p>

    </figure>
  );
}

/* =========================================================
   HOURLY VOLATILITY TABLE
   ========================================================= */

function HourlyVolatilityTable() {
  return (
    <div className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          جدول حركة الذهب خلال ساعات اليوم الـ24
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          مقارنة متوسط نطاق الحركة بالدولار والنسبة
          المئوية بين الفترة التاريخية 2010–2025
          والفترة من يناير إلى أكتوبر 2026.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[780px] text-right">

          <thead className="bg-[#092443] text-white">

            <tr className="text-[11px] sm:text-[12px]">

              <th
                rowSpan={2}
                scope="col"
                className="px-4 py-4 text-center"
              >
                الساعة
              </th>

              <th
                colSpan={3}
                scope="colgroup"
                className="border-b border-white/20 px-3 py-3 text-center"
              >
                الدراسة التاريخية 2010–2025
              </th>

              <th
                colSpan={2}
                scope="colgroup"
                className="border-r border-b border-white/20 px-3 py-3 text-center"
              >
                يناير – أكتوبر 2026
              </th>

            </tr>

            <tr className="text-[10px] sm:text-[11px]">

              <th className="px-3 py-3 text-center">
                عدد الساعات
              </th>

              <th className="px-3 py-3 text-center">
                متوسط الحركة $
              </th>

              <th className="px-3 py-3 text-center">
                متوسط الحركة %
              </th>

              <th className="border-r border-white/20 px-3 py-3 text-center">
                متوسط الحركة $
              </th>

              <th className="px-3 py-3 text-center">
                متوسط الحركة %
              </th>

            </tr>

          </thead>

          <tbody>

            {HOURLY_DATA.map((row, index) => {
              const peak =
                row.hour >= 16 && row.hour <= 18;

              const lowSample = row.samples < 500;

              const start = String(row.hour).padStart(2, "0");

              const end = String(
                (row.hour + 1) % 24
              ).padStart(2, "0");

              return (
                <tr
                  key={row.hour}
                  className={`border-t border-slate-200 ${
                    lowSample
                      ? "bg-slate-100"
                      : peak
                      ? "bg-[#fffbef]"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-[#f7f9fc]"
                  }`}
                >

                  <td
                    dir="ltr"
                    className="whitespace-nowrap px-4 py-3.5 text-center text-[12px] font-black text-[#102747] sm:text-[13px]"
                  >
                    {start}:00 – {end}:00
                    {lowSample && (
                      <sup className="text-amber-700">*</sup>
                    )}
                  </td>

                  <td
                    dir="ltr"
                    className="px-3 py-3.5 text-center text-[12px] font-bold text-slate-600"
                  >
                    {row.samples.toLocaleString("en-US")}
                  </td>

                  <td
                    dir="ltr"
                    className="px-3 py-3.5 text-center text-[13px] font-black text-[#102747]"
                  >
                    ${row.averageUsd.toFixed(2)}
                  </td>

                  <td className="px-3 py-3.5 text-center">

                    <span
                      dir="ltr"
                      className={`inline-flex rounded-lg px-2.5 py-1.5 text-[12px] font-black ${
                        peak
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-50 text-[#176ac8]"
                      }`}
                    >
                      {row.averagePercent.toFixed(3)}%
                    </span>

                  </td>

                  <td
                    dir="ltr"
                    className="border-r border-slate-200 px-3 py-3.5 text-center text-[13px] font-black text-[#102747]"
                  >
                    ${row.recentUsd.toFixed(2)}
                  </td>

                  <td
                    dir="ltr"
                    className="px-3 py-3.5 text-center text-[12px] font-black text-[#176ac8]"
                  >
                    {row.recentPercent.toFixed(3)}%
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-[#f8fafc] p-4 text-[11px] leading-7 text-slate-600 sm:text-[12px]">

        <p>
          * الساعات التي تحتوي على أقل من 500 مشاهدة
          تاريخية تُصنف ضمن العينات المحدودة، ولا تدخل
          في ترتيب ساعات الذروة الرئيسي.
        </p>

        <p className="mt-2">
          جميع الأوقات بتوقيت السعودية والكويت.
          الأرقام تمثل نطاق الحركة السعرية وليست
          أرباحاً متوقعة. تعكس النتائج خصائص الفترة التاريخية المدروسة.
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   TRADING SESSION COMPARISON
   ========================================================= */

function TradingSessionsComparison() {
  const max = Math.max(
    ...SESSION_DATA.map((row) => row.averagePercent)
  );

  return (
    <div className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          مقارنة متوسط حركة الذهب خلال جلسات التداول
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          نتائج الفترة التاريخية 2010–2025،
          مع مراعاة التوقيت الصيفي والشتوي.
        </p>

      </div>

      {/* SESSION CHART */}

      <div className="space-y-6 p-4 sm:p-7">

        {SESSION_DATA.map((session) => (
          <div key={session.name}>

            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">

              <div>
                <p className="text-[13px] font-black text-[#102747] sm:text-[15px]">
                  {session.name}
                </p>

                <p
                  dir="ltr"
                  className="text-right text-[10px] text-slate-400 sm:text-[12px]"
                >
                  {session.nameEn}
                </p>
              </div>

              <span
                dir="ltr"
                className="text-[15px] font-black text-[#102747] sm:text-[19px]"
              >
                {session.averagePercent.toFixed(3)}%
              </span>

            </div>

            <div className="h-5 overflow-hidden rounded-full bg-[#eaf0f7] sm:h-7">

              <div
                className="h-full rounded-full"
                style={{
                  width: `${(session.averagePercent / max) * 100}%`,
                  backgroundColor: session.color,
                }}
              />

            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-slate-500 sm:text-[12px]">

              <span>
                متوسط الحركة:{" "}
                <bdi className="font-black text-[#102747]">
                  ${session.averageUsd.toFixed(2)}
                </bdi>
              </span>

              <span>
                عدد الساعات:{" "}
                <bdi>
                  {session.samples.toLocaleString("en-US")}
                </bdi>
              </span>

            </div>

          </div>
        ))}

      </div>

      {/* COMPARISON TABLE */}

      <div className="overflow-x-auto border-t border-slate-200">

        <table className="w-full min-w-[600px] text-right">

          <thead className="bg-[#092443] text-white">
            <tr className="text-[11px] sm:text-[12px]">
              <th className="px-4 py-4">الجلسة</th>
              <th className="px-3 py-4 text-center">
                عدد الساعات
              </th>
              <th className="px-3 py-4 text-center">
                متوسط الحركة $
              </th>
              <th className="px-3 py-4 text-center">
                متوسط الحركة %
              </th>
              <th className="px-3 py-4 text-center">
                وسيط الحركة %
              </th>
            </tr>
          </thead>

          <tbody>

            {SESSION_DATA.map((session, index) => (
              <tr
                key={session.name}
                className={`border-t border-slate-200 ${
                  index === 3
                    ? "bg-[#fffbef]"
                    : index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f7f9fc]"
                }`}
              >

                <td className="px-4 py-4 text-[12px] font-black text-[#102747] sm:text-[14px]">
                  {session.name}
                </td>

                <td dir="ltr" className="px-3 py-4 text-center text-[12px] font-bold text-slate-600">
                  {session.samples.toLocaleString("en-US")}
                </td>

                <td dir="ltr" className="px-3 py-4 text-center text-[13px] font-black text-[#102747]">
                  ${session.averageUsd.toFixed(2)}
                </td>

                <td dir="ltr" className="px-3 py-4 text-center text-[13px] font-black text-[#176ac8]">
                  {session.averagePercent.toFixed(3)}%
                </td>

                <td dir="ltr" className="px-3 py-4 text-center text-[12px] font-bold text-slate-600">
                  {session.medianPercent.toFixed(3)}%
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-[#f8fafc] p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        تم اعتماد جلسة طوكيو من 09:00 إلى 18:00
        بالتوقيت المحلي، وجلستي لندن ونيويورك من
        08:00 إلى 17:00 بالتوقيت المحلي لكل مدينة.
        تتداخل عينات الجلسات، ولذلك لا يجوز جمع
        أعداد الساعات باعتبارها عينات مستقلة.
        المصدر: HistData، تحليل بروكر العرب.
      </div>

    </div>
  );
}

/* =========================================================
   GOLD TRADING HOURS BY COUNTRY
   ========================================================= */

function LocalTradingHours() {
  const countries = [
    {
      name: "السعودية",
      zone: "UTC+3",
      hours: "16:00 – 19:00",
    },
    {
      name: "الكويت",
      zone: "UTC+3",
      hours: "16:00 – 19:00",
    },
    {
      name: "الإمارات",
      zone: "UTC+4",
      hours: "17:00 – 20:00",
    },
    {
      name: "قطر",
      zone: "UTC+3",
      hours: "16:00 – 19:00",
    },
    {
      name: "البحرين",
      zone: "UTC+3",
      hours: "16:00 – 19:00",
    },
    {
      name: "سلطنة عُمان",
      zone: "UTC+4",
      hours: "17:00 – 20:00",
    },
    {
      name: "الأردن",
      zone: "UTC+3",
      hours: "16:00 – 19:00",
    },
    {
      name: "العراق",
      zone: "UTC+3",
      hours: "16:00 – 19:00",
    },
    {
      name: "مصر – التوقيت الشتوي",
      zone: "UTC+2",
      hours: "15:00 – 18:00",
    },
    {
      name: "مصر – التوقيت الصيفي",
      zone: "UTC+3",
      hours: "16:00 – 19:00",
    },
  ];

  return (
    <div
      dir="rtl"
      className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm"
    >

      <div className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          ساعات ذروة حركة الذهب بتوقيت الدول العربية
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          تحويل الساعات الثلاث الأعلى تقلباً في
          الدراسة التاريخية إلى التوقيت المحلي.
        </p>

      </div>

      <table className="w-full text-right">

        <thead className="bg-[#092443] text-white">
          <tr className="text-[10px] sm:text-[13px]">

            <th className="px-3 py-4 sm:px-5">
              الدولة
            </th>

            <th className="px-2 py-4 text-center">
              التوقيت
            </th>

            <th className="px-2 py-4 text-center">
              فترة ذروة الحركة
            </th>

          </tr>
        </thead>

        <tbody>

          {countries.map((country, index) => (
            <tr
              key={country.name}
              className={`border-t border-slate-200 ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f7f9fc]"
              }`}
            >

              <td className="px-3 py-4 text-[12px] font-black text-[#102747] sm:px-5 sm:text-[14px]">
                {country.name}
              </td>

              <td
                dir="ltr"
                className="px-2 py-4 text-center text-[10px] font-bold text-slate-500 sm:text-[12px]"
              >
                {country.zone}
              </td>

              <td className="px-2 py-4 text-center">

                <span
                  dir="ltr"
                  className="inline-flex whitespace-nowrap rounded-[8px] border border-amber-200 bg-[#fffbef] px-2 py-1.5 text-[11px] font-black text-amber-800 sm:px-4 sm:text-[14px]"
                >
                  {country.hours}
                </span>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        تمثل هذه الفترات تحويلاً للتوقيت المرجعي
        للدراسة، وليست مواعيد افتتاح وإغلاق سوق
        الذهب. وقد تختلف ساعات التداول الفعلية
        حسب شركة الوساطة والعطلات والتوقيت الموسمي.
      </div>

    </div>
  );
}

/* =========================================================
   WEEKDAY VOLATILITY COMPARISON
   ========================================================= */

function WeekdayVolatilityChart() {
  const maxValue = Math.max(
    ...WEEKDAY_DATA.flatMap((row) => [
      row.averagePercent,
      row.recentPercent,
    ])
  );

  return (
    <figure className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

      <figcaption className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          متوسط حركة الذهب حسب يوم الأسبوع
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          مقارنة متوسط نطاق الحركة لكل ساعة
          بين الدراسة التاريخية وعام 2026.
        </p>

      </figcaption>

      <div className="space-y-6 p-4 sm:p-7">

        {WEEKDAY_DATA.map((row) => (
          <div key={row.day}>

            <h4 className="mb-3 text-[13px] font-black text-[#102747] sm:text-[15px]">
              {row.day}
            </h4>

            <div className="space-y-2">

              <div className="flex items-center gap-3">

                <div className="h-5 min-w-0 flex-1 overflow-hidden rounded-md bg-slate-100 sm:h-7">

                  <div
                    className="h-full rounded-md bg-[#176ac8]"
                    style={{
                      width: `${row.averagePercent / maxValue * 100}%`,
                    }}
                  />

                </div>

                <span
                  dir="ltr"
                  className="w-[65px] shrink-0 text-center text-[12px] font-black text-[#176ac8] sm:text-[14px]"
                >
                  {row.averagePercent.toFixed(3)}%
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="h-5 min-w-0 flex-1 overflow-hidden rounded-md bg-slate-100 sm:h-7">

                  <div
                    className="h-full rounded-md bg-[#c49a36]"
                    style={{
                      width: `${row.recentPercent / maxValue * 100}%`,
                    }}
                  />

                </div>

                <span
                  dir="ltr"
                  className="w-[65px] shrink-0 text-center text-[12px] font-black text-amber-700 sm:text-[14px]"
                >
                  {row.recentPercent.toFixed(3)}%
                </span>

              </div>

            </div>

          </div>
        ))}

        <div className="flex flex-wrap items-center justify-center gap-5 border-t border-slate-100 pt-5">

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-[#176ac8]" />
            <span className="text-[11px] font-bold text-slate-600">
              2010–2025
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-[#c49a36]" />
            <span className="text-[11px] font-bold text-slate-600">
              يناير–أكتوبر 2026
            </span>
          </div>

        </div>

      </div>

      <div className="overflow-x-auto border-t border-slate-200">

        <table className="w-full min-w-[650px] text-right">

          <thead className="bg-[#092443] text-white">

            <tr className="text-[11px] sm:text-[12px]">

              <th className="px-4 py-4">
                اليوم
              </th>

              <th className="px-3 py-4 text-center">
                عدد الساعات التاريخية
              </th>

              <th className="px-3 py-4 text-center">
                متوسط الحركة التاريخية $
              </th>

              <th className="px-3 py-4 text-center">
                عدد ساعات 2026
              </th>

              <th className="px-3 py-4 text-center">
                متوسط الحركة في 2026 $
              </th>

            </tr>

          </thead>

          <tbody>

            {WEEKDAY_DATA.map((row, index) => (
              <tr
                key={row.day}
                className={`border-t border-slate-200 ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f7f9fc]"
                }`}
              >

                <td className="px-4 py-4 text-[13px] font-black text-[#102747]">
                  {row.day}
                </td>

                <td dir="ltr" className="px-3 py-4 text-center text-[12px] font-bold text-slate-600">
                  {row.samples.toLocaleString("en-US")}
                </td>

                <td dir="ltr" className="px-3 py-4 text-center text-[13px] font-black text-[#176ac8]">
                  ${row.averageUsd.toFixed(2)}
                </td>

                <td dir="ltr" className="px-3 py-4 text-center text-[12px] font-bold text-slate-600">
                  {row.recentSamples.toLocaleString("en-US")}
                </td>

                <td dir="ltr" className="px-3 py-4 text-center text-[13px] font-black text-amber-700">
                  ${row.recentUsd.toFixed(2)}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        تم تصنيف العينات حسب اليوم التقويمي بتوقيت
        السعودية (UTC+3). استُبعدت ساعات السبت
        من هذه المقارنة. الأرقام تمثل متوسط نطاق
        الحركة لكل ساعة، وليس نطاق الحركة اليومية.
        المصدر: HistData — تحليل بروكر العرب.
      </div>

    </figure>
  );
}

/* =========================================================
   GOLD VOLATILITY HEATMAP
   ========================================================= */

function GoldVolatilityHeatmap() {

  const getColor = (
    value: number | null,
    samples: number
  ) => {
    if (value === null || samples < 100) {
      return {
        background: "#e2e8f0",
        color: "#64748b",
      };
    }

    if (value >= 0.5) {
      return {
        background: "#123e75",
        color: "#ffffff",
      };
    }

    if (value >= 0.4) {
      return {
        background: "#176ac8",
        color: "#ffffff",
      };
    }

    if (value >= 0.3) {
      return {
        background: "#75b4ed",
        color: "#102747",
      };
    }

    if (value >= 0.2) {
      return {
        background: "#c3def7",
        color: "#174b80",
      };
    }

    return {
      background: "#edf5fc",
      color: "#475569",
    };
  };

  return (
    <figure className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

      <figcaption className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <span className="text-[10px] font-black uppercase tracking-wider text-[#176ac8]">
          GOLD VOLATILITY HEATMAP
        </span>

        <h3 className="mt-2 text-[17px] font-black text-[#102747] sm:text-[21px]">
          الخريطة الحرارية لحركة الذهب حسب اليوم والساعة
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          متوسط نطاق الحركة المئوي لكل ساعة خلال
          الفترة 2010–2025، بتوقيت السعودية والكويت.
        </p>

      </figcaption>

      <div className="overflow-x-auto p-3 sm:p-5">

        <table
          dir="ltr"
          className="w-full min-w-[1040px] border-separate border-spacing-[3px] text-center"
        >

          <thead>

            <tr>

              <th className="min-w-[80px] px-2 py-3 text-[11px] font-black text-slate-500">
                اليوم
              </th>

              {Array.from(
                { length: 24 },
                (_, hour) => (
                  <th
                    key={hour}
                    scope="col"
                    className="px-1 py-3 text-[10px] font-black text-slate-600"
                  >
                    {String(hour).padStart(2, "0")}
                  </th>
                )
              )}

            </tr>

          </thead>

          <tbody>

            {HEATMAP_DATA.map((row, dayIndex) => (

              <tr key={row.day}>

                <th
                  scope="row"
                  dir="rtl"
                  className="rounded-md bg-[#f5f7fb] px-2 py-4 text-[11px] font-black text-[#102747]"
                >
                  {row.day}
                </th>

                {row.values.map((value, hour) => {

                  const samples =
                    HEATMAP_SAMPLES[dayIndex][hour];

                  const colors =
                    getColor(value, samples);

                  return (
                    <td
                      key={hour}
                      title={
                        `${row.day} | ${
                          String(hour).padStart(2, "0")
                        }:00 | ${
                          value === null
                            ? "لا توجد بيانات"
                            : `${value.toFixed(3)}%`
                        } | ${samples} ساعة`
                      }
                      className="h-[48px] min-w-[35px] rounded-[5px] px-1 text-[9px] font-black tabular-nums"
                      style={{
                        backgroundColor: colors.background,
                        color: colors.color,
                      }}
                    >
                      {value === null || samples < 100
                        ? "—"
                        : value.toFixed(2)}
                    </td>
                  );

                })}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* LEGEND */}

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 px-4 pb-5">

        {[
          { color: "#edf5fc", label: "أقل من 0.20%" },
          { color: "#c3def7", label: "0.20–0.29%" },
          { color: "#75b4ed", label: "0.30–0.39%" },
          { color: "#176ac8", label: "0.40–0.49%" },
          { color: "#123e75", label: "0.50% فأكثر" },
          { color: "#e2e8f0", label: "بيانات محدودة" },
        ].map((item) => (

          <div
            key={item.label}
            className="flex items-center gap-1.5"
          >
            <span
              className="h-3.5 w-3.5 rounded-sm border border-slate-200"
              style={{ backgroundColor: item.color }}
            />

            <span className="text-[10px] font-bold text-slate-600 sm:text-[11px]">
              <bdi>{item.label}</bdi>
            </span>
          </div>

        ))}

      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        تشير الألوان الداكنة إلى ارتفاع متوسط نطاق
        الحركة السعرية. القيم المعروضة نسب مئوية،
        والخلايا الرمادية تحتوي على أقل من 100
        شمعة ساعة مكتملة أو لا تحتوي على بيانات.
        المصدر: HistData — تحليل بروكر العرب.
      </div>

    </figure>
  );
}

/* =========================================================
   PRICE RANGE PROBABILITY
   ========================================================= */

function GoldRangeProbability() {
  return (
    <div className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          التكرار التاريخي لنطاقات حركة الذهب خلال الساعة
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          نسبة شموع الساعة التي بلغ نطاق حركتها
          الحد السعري المحدد أو تجاوزه.
        </p>

      </div>

      <div className="space-y-6 p-4 sm:p-7">

        {RANGE_PROBABILITY_DATA.map((row) => (

          <div key={row.threshold}>

            <h4 className="mb-3 text-[13px] font-black text-[#102747] sm:text-[15px]">
              حركة بقيمة {row.threshold} دولاراً أو أكثر
            </h4>

            {[
              {
                label: "2010–2025",
                value: row.historical,
                color: "#176ac8",
              },
              {
                label: "2026",
                value: row.recent,
                color: "#c49a36",
              },
            ].map((item) => (

              <div
                key={item.label}
                className="mb-2 flex items-center gap-2 sm:gap-3"
              >

                <span
                  dir="ltr"
                  className="w-[64px] shrink-0 text-center text-[10px] font-bold text-slate-500 sm:w-[82px] sm:text-[12px]"
                >
                  {item.label}
                </span>

                <div className="h-5 min-w-0 flex-1 overflow-hidden rounded-md bg-[#edf2f7] sm:h-7">

                  <div
                    className="h-full rounded-md"
                    style={{
                      backgroundColor: item.color,
                      width: `${item.value}%`,
                    }}
                  />

                </div>

                <span
                  dir="ltr"
                  className="w-[60px] shrink-0 text-center text-[12px] font-black tabular-nums sm:text-[14px]"
                  style={{ color: item.color }}
                >
                  {item.value.toFixed(2)}%
                </span>

              </div>

            ))}

          </div>

        ))}

      </div>

      <div className="overflow-x-auto border-t border-slate-200">

        <table className="w-full min-w-[430px] text-center">

          <thead className="bg-[#092443] text-white">

            <tr className="text-[11px] sm:text-[13px]">

              <th className="px-3 py-4">
                نطاق الحركة
              </th>

              <th className="px-3 py-4">
                2010–2025
              </th>

              <th className="px-3 py-4">
                يناير–أكتوبر 2026
              </th>

            </tr>

          </thead>

          <tbody>

            {RANGE_PROBABILITY_DATA.map((row, index) => (

              <tr
                key={row.threshold}
                className={`border-t border-slate-200 ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f7f9fc]"
                }`}
              >

                <td dir="ltr" className="px-3 py-4 text-[13px] font-black text-[#102747]">
                  ≥ ${row.threshold}
                </td>

                <td dir="ltr" className="px-3 py-4 text-[13px] font-black text-[#176ac8]">
                  {row.historical.toFixed(2)}%
                </td>

                <td dir="ltr" className="px-3 py-4 text-[13px] font-black text-amber-700">
                  {row.recent.toFixed(2)}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        تعتمد الحسابات على 84,040 شمعة ساعة
        مكتملة للفترة التاريخية و4,586 شمعة
        للفترة من يناير إلى أكتوبر 2026.
        هذه نسب تكرار تاريخية وليست توقعات
        لاحتمالات الحركة المستقبلية.
      </div>

    </div>
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
    real_account_url: string | null;
};

const GOLD_BROKER_ORDER = [
  "ic-markets",
  "pepperstone",
  "exness",
  "capital-com",
  "xm",
];

async function getArticleGoldBrokers(): Promise<ArticleBroker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select(
      "id, name, slug, logo, rating, min_deposit, islamic_account, real_account_url"
    )
    .eq("publication_status", "published")
    .eq("is_full_review", true)
    .in("slug", GOLD_BROKER_ORDER);

  if (error) {
    console.error(
      "Article gold brokers:",
      error.message
    );

    return [];
  }

  const brokers = (data ?? []) as ArticleBroker[];

  return GOLD_BROKER_ORDER.flatMap((slug) => {
    const broker = brokers.find(
      (item) => item.slug === slug
    );

    return broker ? [broker] : [];
  });
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
      : "غير محدد";

  const reviewUrl = `/brokers/${broker.slug}`;

  return (
    <article
      className="group relative min-w-0 overflow-hidden rounded-[15px] border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition duration-200 hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.09)] sm:rounded-[18px] sm:p-5"
      dir="rtl"
    >
      {/* TOP ACCENT */}

      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#176ac8] via-[#38bdf8] to-transparent" />

      {/* ============================================
          BROKER IDENTITY
          Compact on mobile / Original on desktop
      ============================================ */}

      <div className="flex min-w-0 items-center gap-2.5 px-3 pb-2 pt-3.5 sm:gap-3 sm:p-0">

        {/* LOGO */}

        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-slate-200 bg-white p-1.5 shadow-sm sm:h-[62px] sm:w-[62px] sm:rounded-[14px] sm:p-2">
          {broker.logo ? (
            <img
              src={broker.logo}
              alt={`شعار ${broker.name}`}
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

        {/* BROKER NAME + RATING */}

        <div className="min-w-0 flex-1">

          <h3 className="min-w-0 break-words text-[15px] font-black leading-5 text-[#102747] sm:text-[19px] sm:leading-6">
            {broker.name}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:mt-1.5">

            <span className="text-[10px] font-bold text-slate-500 sm:text-[12px]">
              التقييم العام
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

        {/* RANK */}

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#eaf3ff] text-[11px] font-black text-[#1765b5] sm:h-8 sm:w-8 sm:rounded-[10px] sm:text-[12px]">
          {rank}
        </div>

      </div>

      {/* ============================================
          BROKER METRICS
          Compact on mobile / Original on desktop
      ============================================ */}

      <div className="mx-3 grid grid-cols-2 gap-2 sm:mx-0 sm:mt-4">

        {/* MINIMUM DEPOSIT */}

        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">

          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            الحد الأدنى للإيداع
          </p>

          <p
            dir={deposit.startsWith("$") ? "ltr" : "rtl"}
            className="mt-0.5 break-words text-right text-[12px] font-black text-[#102747] sm:mt-1 sm:text-[14px]"
          >
            {deposit}
          </p>

        </div>

        {/* ISLAMIC ACCOUNT */}

        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">

          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            حساب إسلامي
          </p>

          <p
            className={`mt-0.5 text-[12px] font-black sm:mt-1 sm:text-[13px] ${
              broker.islamic_account === true
                ? "text-emerald-700"
                : "text-slate-600"
            }`}
          >
            {broker.islamic_account === true
              ? "متاح"
              : broker.islamic_account === false
              ? "غير متاح"
              : "غير محدد"}
          </p>

        </div>

      </div>

     

      
{/* ============================================
    BROKER ACTION BUTTONS
    REVIEW + OPEN ACCOUNT
============================================ */}

<div className="grid grid-cols-2 gap-2 px-3 pb-3 pt-2.5 sm:mt-4 sm:gap-2.5 sm:px-0 sm:pb-0 sm:pt-0">

  {/* REVIEW BUTTON */}

  <Link
    href={reviewUrl}
    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[12px] bg-[#176ac8] px-2 py-2.5 text-center text-[11px] font-black text-white transition duration-200 hover:bg-[#10549f] sm:text-[13px]"
  >
    تقييم الشركة
    <span aria-hidden="true">←</span>
  </Link>

  {/* OPEN ACCOUNT BUTTON */}

  {broker.real_account_url ? (
    <a
      href={broker.real_account_url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[12px] border border-[#bdd8f5] bg-[#eaf3ff] px-2 py-2.5 text-center text-[11px] font-black text-[#155da9] transition duration-200 hover:border-[#80b4ec] hover:bg-[#dcecff] sm:text-[13px]"
    >
      فتح حساب
      <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <span
      className="inline-flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-[12px] border border-slate-200 bg-slate-100 px-2 py-2.5 text-center text-[10px] font-bold text-slate-400 sm:text-[12px]"
    >
      فتح حساب غير متاح
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
      aria-label="وسطاء تداول بارزون"
      dir="rtl"
      className="relative my-9 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_12px_35px_rgba(15,23,42,0.04)] sm:my-12 sm:rounded-[24px]"
    >
      {/* Section heading */}

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(120deg,#071a31_0%,#0a2e52_60%,#12518b_100%)] px-4 py-6 text-right sm:px-7 sm:py-7">
        <div className="pointer-events-none absolute -left-12 -top-24 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1 text-[10px] font-black text-cyan-200">
            مقارنة الوسطاء
          </span>

          <h2 className="mt-3 text-[22px] font-black leading-[1.5] text-white sm:text-[27px]">
  أبرز 3 شركات لتداول الذهب عبر الإنترنت
</h2>

<p className="mt-2 max-w-[850px] text-[12px] leading-7 text-slate-200 sm:text-[14px] sm:leading-8">
  لا يعتمد اختيار وسيط تداول الذهب على أوقات نشاط
  السوق فقط، بل يشمل تكاليف التداول والتراخيص
  وجودة تنفيذ الأوامر. تعرف على أبرز الشركات
  المدرجة في دليل بروكر العرب لتداول الذهب،
  وقارن شروط حساباتها قبل اتخاذ قرارك.
</p>
        </div>
      </div>

      {/* Broker cards */}

      <div className="p-3 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4">
          {brokers.slice(0, 3).map((broker, index) => (
            <FeaturedBrokerCard
              key={broker.id}
              broker={broker}
              rank={index + 1}
            />
          ))}
        </div>

        {/* Main category CTA */}

        <div className="mt-5 flex flex-col items-start gap-4 rounded-[15px] border border-blue-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="min-w-0">
            <h3 className="text-[14px] font-black text-[#102747] sm:text-[16px]">
              تريد مقارنة المزيد من شركات تداول الذهب؟
            </h3>

            <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
              اطلع على قائمة الوسطاء ومعلومات الإيداع
              والتراخيص والحسابات وشروط التداول.
            </p>
          </div>

          <Link
            href="/best-brokers/gold"
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-[12px] border border-[#bfd8f3] bg-[#eaf3ff] px-5 py-3 text-center text-[12px] font-black text-[#145aa5] transition hover:border-blue-400 hover:bg-blue-100 sm:w-auto sm:text-[13px]"
          >
           مقارنة أفضل شركات تداول الذهب
            <span aria-hidden="true">←</span>
          </Link>
        </div>

        <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          تُعرض الشركات وفق التقييم العام المنشور
          في قاعدة بيانات بروكر العرب. ترتيبها هنا
          لا يمثل تقييماً مستقلاً لتكاليف تداول الذهب،
          وقد تختلف شروط الحساب حسب الدولة والجهة
          التنظيمية.
        </p>
      </div>
    </aside>
  );
}


/* =========================================================
   STRUCTURED DATA
   ========================================================= */

   /* =========================================================
   GOLD BROKERS COMPARISON TABLE
   ========================================================= */

function GoldBrokersComparison({
  brokers,
}: {
  brokers: ArticleBroker[];
}) {
  if (!brokers.length) return null;

  return (
    <aside
      id="broker-comparison"
      dir="rtl"
      className="my-9 scroll-mt-24 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-white shadow-sm sm:my-12 sm:rounded-[24px]"
    >
      {/* HEADER */}

      <div className="border-b border-blue-100 bg-[linear-gradient(270deg,#edf5ff_0%,#ffffff_100%)] p-5 sm:p-7">
        <span className="inline-flex rounded-full bg-[#176ac8] px-3 py-1 text-[10px] font-black text-white">
          مقارنة شركات تداول الذهب
        </span>

        <h2 className="mt-3 text-[22px] font-black leading-[1.5] text-[#102747] sm:text-[29px]">
          مقارنة 5 شركات لتداول الذهب
        </h2>

        <p className="mt-2 text-[13px] leading-[2] text-slate-600 sm:text-[15px]">
          قارن التقييم العام والحد الأدنى للإيداع
          وتوفر الحساب الإسلامي، وانتقل إلى تقييم
          كل شركة للاطلاع على التراخيص والرسوم
          وشروط تداول الذهب.
        </p>
      </div>

      {/* IMPORTANT NOTE */}

      <div className="border-b border-amber-100 bg-[#fffbef] px-5 py-3 text-[11px] font-bold leading-7 text-amber-900 sm:text-[12px]">
        تختلف شروط تداول الذهب والسبريد والرافعة
        المالية حسب نوع الحساب والدولة والجهة
        التنظيمية. التقييمات المعروضة هي التقييمات
        العامة للشركات وليست قياساً مستقلاً لتكاليف الذهب.
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden p-4 md:block sm:p-5">
        <div className="overflow-x-auto rounded-[15px] border border-slate-200">
          <table className="w-full min-w-[700px] text-right">
            <thead className="bg-[#092443] text-white">
              <tr className="text-[12px] font-black">
                <th className="px-3 py-4 text-center">
                  الترتيب
                </th>

                <th className="px-4 py-4">
                  الشركة
                </th>

                <th className="px-3 py-4 text-center">
                  الحد الأدنى للإيداع
                </th>

                <th className="px-3 py-4 text-center">
                  حساب إسلامي
                </th>

                <th className="px-3 py-4 text-center">
                  التقييم
                </th>

                <th className="px-4 py-4 text-center">
                  التفاصيل
                </th>
              </tr>
            </thead>

            <tbody>
              {brokers.slice(0, 5).map(
                (broker, index) => (
                  <tr
                    key={broker.id}
                    className={`border-t border-slate-200 ${
                      index === 0
                        ? "bg-[#fffbef]"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-[#f7f9fc]"
                    }`}
                  >
                    <td className="px-3 py-4 text-center">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf3ff] text-[11px] font-black text-[#176ac8]">
                        #{index + 1}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-slate-200 bg-white p-1.5">
                          {broker.logo ? (
                            <img
                              src={broker.logo}
                              alt={`شعار ${broker.name}`}
                              width={44}
                              height={44}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs font-black text-[#176ac8]">
                              {broker.name.slice(0, 2)}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/brokers/${broker.slug}`}
                          className="text-[13px] font-black text-[#102747] hover:text-blue-700"
                        >
                          {broker.name}
                        </Link>
                      </div>
                    </td>

                    <td
                      dir="ltr"
                      className="px-3 py-4 text-center text-[13px] font-black text-slate-800"
                    >
                      {broker.min_deposit != null
                        ? `$${broker.min_deposit}`
                        : "—"}
                    </td>

                    <td className="px-3 py-4 text-center">
                      {broker.islamic_account === true ? (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700">
                          متاح
                        </span>
                      ) : broker.islamic_account === false ? (
                        <span className="text-[11px] text-slate-500">
                          غير متاح
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          غير محدد
                        </span>
                      )}
                    </td>

                    <td
                      dir="ltr"
                      className="px-3 py-4 text-center text-[13px] font-black text-amber-600"
                    >
                      ★{" "}
                      {broker.rating != null
                        ? Number(broker.rating).toFixed(1)
                        : "—"}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/brokers/${broker.slug}`}
                          className="inline-flex min-h-[40px] items-center justify-center rounded-[10px] border border-slate-200 bg-white px-3 text-[11px] font-black text-[#102747] hover:border-blue-300 hover:bg-blue-50"
                        >
                          التقييم
                        </Link>

                        {broker.real_account_url ? (
                          <a
                            href={broker.real_account_url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-flex min-h-[40px] items-center justify-center rounded-[10px] bg-[#176ac8] px-3 text-[11px] font-black text-white hover:bg-[#10549f]"
                          >
                            فتح حساب
                          </a>
                        ) : (
                          <span className="inline-flex min-h-[40px] items-center justify-center rounded-[10px] bg-slate-100 px-3 text-[10px] text-slate-400">
                            غير متاح
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARDS */}

      <div className="grid gap-3 p-3 md:hidden">
        {brokers.slice(0, 5).map(
          (broker, index) => (
            <FeaturedBrokerCard
              key={broker.id}
              broker={broker}
              rank={index + 1}
            />
          )
        )}
      </div>

      {/* FOOTER */}

      <div className="px-4 pb-5 sm:px-5">
        <div className="rounded-[12px] border border-blue-100 bg-[#f1f7ff] p-4 text-center">
          <Link
            href="/best-brokers/gold"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-5 text-[12px] font-black text-white hover:bg-[#10549f]"
          >
            عرض المقارنة الكاملة لشركات تداول الذهب
            <span aria-hidden="true">←</span>
          </Link>
        </div>

        <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          قد يحصل بروكر العرب على عمولة من بعض
          روابط التسجيل. تداول عقود الفروقات
          ينطوي على مخاطر مرتفعة لخسارة رأس المال.
        </p>
      </div>
    </aside>
  );
}

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
    inLanguage: "ar",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": URL,
    },
    url: URL,
    datePublished: ARTICLE.published,
    dateModified: ARTICLE.modified,
    articleSection: "الذهب والأسواق",
    author: {
      "@type": "Organization",
      name: "بروكر العرب",
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
      name: "الرئيسية",
      item: SITE,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "مقالات وأدلة التداول",
      item: `${SITE}/articles`,
    },
    {
      "@type": "ListItem",
      position: 3,
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

export default async function BestTimeToTradeGoldArticlePage() {
  const featuredGoldBrokers = await getArticleGoldBrokers();

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-clip bg-[#f5f7fb] text-slate-900"
    >
      <ArticleStructuredData />

      {/* ARTICLE HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-9">

          {/* BREADCRUMB */}

          <nav
            aria-label="مسار التنقل"
            className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 sm:text-[12px]"
          >
            <Link href="/" className="hover:text-blue-600">
              الرئيسية
            </Link>

            <span aria-hidden="true">/</span>

            <Link href="/articles" className="hover:text-blue-600">
              مقالات وأدلة التداول
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-[#145ca8]">
              أفضل أوقات تداول الذهب
            </span>
          </nav>

          {/* CATEGORY */}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#eaf3ff] px-3 py-1.5 text-[10px] font-black text-[#1765b5] sm:text-[11px]">
              الذهب والأسواق
            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">
              دراسة إحصائية
            </span>
          </div>

          {/* ARTICLE TITLE */}

          <h1 className="mt-5 w-full text-[27px] font-black leading-[1.4] tracking-[-0.025em] text-[#0c1e38] sm:text-[34px] lg:text-[clamp(29px,3vw,48px)]">
            أفضل أوقات تداول الذهب خلال اليوم –{" "}
            <span className="text-[#176ac8]">
              دراسة إحصائية لحركة الأسعار
            </span>
          </h1>

          <p className="mt-4 w-full max-w-none text-[14px] leading-[2] text-slate-600 sm:text-[17px] sm:leading-[1.9]">
            دراسة لحركة أسعار الذهب مقابل الدولار الأمريكي
            خلال ساعات اليوم وجلسات التداول العالمية،
            بهدف تحديد الفترات الأكثر نشاطاً وتقلباً،
            ومقارنة أوقات التداول بتوقيت السعودية والكويت
            والإمارات وبقية الدول العربية.
          </p>

          {/* METADATA */}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-500 sm:text-[12px]">
            <span>
              إعداد:{" "}
              <strong className="text-[#102747]">
                فريق تحليلات بروكر العرب
              </strong>
            </span>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <time dateTime={ARTICLE.modified}>
              آخر تحديث: 25 نوفمبر 2026
            </time>

            <span className="hidden text-slate-300 sm:inline">
              |
            </span>

            <span>بحث وتحليل إحصائي</span>
          </div>

          {/* HERO IMAGE */}

          <ArticleHeroImage />

        </div>
      </header>

      {/* ARTICLE BODY */}

      <div className="mx-auto max-w-[1520px] px-3 py-6 sm:px-6 sm:py-10">
        <article className="overflow-hidden rounded-[19px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.035)] sm:rounded-[24px]">

          <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-12">

            {/* INTRODUCTION */}

            <div className="space-y-5 text-[14px] leading-[2.15] text-slate-700 sm:text-[16px] sm:leading-[2.1]">

              <Paragraph>
                يُعد الذهب مقابل الدولار الأمريكي
                (XAU/USD) من أبرز الأدوات المالية التي
                يتداولها المستثمرون والمضاربون في الأسواق
                العالمية. إلا أن حركة أسعار الذهب لا تتوزع
                بالتساوي على جميع ساعات التداول، إذ تختلف
                مستويات النشاط والتقلب والسيولة باختلاف
                الجلسات العالمية والظروف الاقتصادية.
              </Paragraph>

              <Paragraph>
                ويسعى العديد من المتداولين إلى معرفة
                <Strong> أفضل أوقات تداول الذهب </Strong>
                خلال اليوم، سواء بهدف المضاربة قصيرة الأجل
                أو التداول اليومي أو اختيار توقيت مناسب
                لتنفيذ صفقاتهم.
              </Paragraph>

              <Paragraph>
                وبدلاً من الاعتماد على الافتراضات الشائعة،
                يهدف هذا البحث من <Strong>بروكر العرب</Strong>{" "}
                إلى دراسة حركة الذهب باستخدام بيانات
                تاريخية، ومقارنة نطاقات الحركة السعرية
                خلال ساعات اليوم وأيام الأسبوع والجلسات
                العالمية.
              </Paragraph>

              <Note title="عن الدراسة الإحصائية">
  تستعرض هذه الدراسة الأنماط التاريخية لحركة
  أسعار الذهب خلال ساعات اليوم وأيام الأسبوع
  وجلسات التداول العالمية، بالاعتماد على بيانات
  الأسعار التاريخية من HistData. وتهدف إلى تحديد
  الفترات الأكثر نشاطاً وتقلباً في سوق الذهب
  باستخدام التحليل الإحصائي للبيانات التاريخية.
  ولا تضمن النتائج تكرار هذه الأنماط مستقبلاً،
  كما لا تمثل توصيات تداول أو توقعات لحركة الأسعار.
</Note>

            </div>

            <TableOfContents />

            {/* RESEARCH SUMMARY */}

<ArticleSection
  id="summary"
  eyebrow="ملخص البحث"
  title="أهم نتائج دراسة أوقات تداول الذهب"
>
  <Paragraph>
    يهدف هذا البحث إلى تحديد الفترات الأكثر نشاطاً
    في تداول الذهب مقابل الدولار الأمريكي، بالاعتماد
    على تحليل البيانات التاريخية بدلاً من الاكتفاء
    بالملاحظات العامة حول جلسات التداول العالمية.
  </Paragraph>

  <ResearchSummaryCards />

  <Paragraph>
    تركز الدراسة الأساسية على السنوات المكتملة
    من 2010 إلى 2025، مع تخصيص تحليل منفصل
    لحركة أسعار الذهب خلال الأشهر العشرة الأولى
    من عام 2026، بهدف مقارنة الأنماط التاريخية
    بظروف السوق الحديثة.
  </Paragraph>

  <SubHeading>
    أبرز النتائج للدراسة
  </SubHeading>

  <ArticleList
    items={[
      <>
        <Strong>الفترة الأكثر نشاطاً تاريخياً:</Strong>{" "}
        تشير النتائج إلى ارتفاع متوسط نطاق
        الحركة السعرية بين الساعة الرابعة والسابعة
        مساءً بتوقيت السعودية والكويت.
      </>,
      <>
        <Strong>اختلاف مستويات التقلب:</Strong>{" "}
        لا تتوزع حركة الذهب بالتساوي على ساعات
        التداول، بل تتغير بصورة ملحوظة خلال اليوم.
      </>,
      <>
        <Strong>حركة الذهب في 2026:</Strong>{" "}
        تشير البيانات إلى ارتفاع نطاق الحركة
        بالدولار مقارنة بالمتوسط التاريخي، مع ضرورة
        مراعاة تغير مستويات أسعار الذهب.
      </>,
      <>
        <Strong>أهمية حجم العينة:</Strong>{" "}
        لا يمكن الاعتماد على بعض الساعات ذات
        البيانات المحدودة لتحديد أفضل أوقات التداول.
      </>,
    ]}
  />

  <Note title="كيف نحدد أفضل وقت لتداول الذهب؟">
    تعتمد الدراسة على قياس نطاق الحركة السعرية
    التاريخية. ولا يعني ارتفاع التقلب أن التداول
    خلال تلك الفترة أكثر ربحية، إذ تتأثر النتائج
    باستراتيجية التداول والسبريد والعمولات
    والانزلاق السعري وإدارة المخاطر.
  </Note>

</ArticleSection>

{/* HOURLY VOLATILITY */}

<ArticleSection
  id="hourly-volatility"
  eyebrow="التحليل الإحصائي"
  title="متوسط حركة الذهب خلال ساعات اليوم"
>

  <Paragraph>
    تختلف حركة أسعار الذهب من ساعة إلى أخرى
    نتيجة تداخل جلسات التداول العالمية، وتوقيت
    صدور البيانات الاقتصادية، وتغير مستويات
    نشاط المشاركين في الأسواق المالية.
  </Paragraph>

  <Paragraph>
    لقياس هذه الاختلافات، نقارن نطاق الحركة
    السعرية داخل شموع الساعة الواحدة، باستخدام
    الفرق بين أعلى وأدنى سعر خلال كل ساعة.
    ويتيح هذا المقياس دراسة التقلب بصرف النظر
    عن اتجاه السعر صعوداً أو هبوطاً.
  </Paragraph>

  <HourlyVolatilityChart />

  <SubHeading>
    ما أكثر ساعات تداول الذهب نشاطاً؟
  </SubHeading>

  <Paragraph>
    تظهر النتائج ارتفاع متوسط نطاق الحركة
    خلال ساعات المساء بتوقيت السعودية والكويت،
    خصوصاً خلال الفترة التي تتزامن عادةً مع
    النشاط الأمريكي والأوروبي في الأسواق العالمية.
  </Paragraph>

  <Paragraph>
    ومع ذلك، فإن تحديد العلاقة بين التقلب وجلسات
    التداول يتطلب مراعاة اختلاف مواعيد التوقيت
    الصيفي والشتوي في الولايات المتحدة وأوروبا.
  </Paragraph>

  <HourlyVolatilityTable />

  <Note title="الفرق بين نطاق الحركة والربح المحتمل" tone="amber">
    إذا تحرك الذهب خلال ساعة من أدنى سعر عند
    3,000 دولار إلى أعلى سعر عند 3,015 دولاراً،
    فإن نطاق الحركة يبلغ 15 دولاراً للأونصة.
    لكن ذلك لا يعني أن المتداول يستطيع تحقيق
    ربح قدره 15 دولاراً، لأن نتيجة الصفقة تعتمد
    على نقاط الدخول والخروج وحجم العقد والتكاليف.
  </Note>

  <SubHeading>
    لماذا نستخدم النسبة المئوية إلى جانب الدولار؟
  </SubHeading>

  <Paragraph>
    تغير سعر الذهب بصورة كبيرة خلال الفترة
    التاريخية المدروسة، ولذلك فإن مقارنة الحركة
    بالدولار وحده قد تعطي انطباعاً غير دقيق
    عن مستويات التقلب بين السنوات القديمة والحديثة.
  </Paragraph>

  <Paragraph>
    تساعد النسبة المئوية على إجراء مقارنة أكثر
    اتساقاً بين الفترات الزمنية المختلفة، بينما
    يوفر نطاق الحركة بالدولار معلومات عملية
    للمتداولين المهتمين بحجم التحركات السعرية.
  </Paragraph>

</ArticleSection>

            {/* FIRST BROKERS PLACEMENT */}

            <FeaturedGoldBrokers
              brokers={featuredGoldBrokers}
            />

            {/* TRADING SESSIONS */}

<ArticleSection
  id="trading-sessions"
  eyebrow="الأسواق العالمية"
  title="مقارنة جلسات تداول الذهب العالمية"
>

  <Paragraph>
    يتأثر نشاط سوق الذهب بتوزيع ساعات العمل في
    المراكز المالية العالمية، خصوصاً الأسواق
    الآسيوية والأوروبية والأمريكية. ومع انتقال
    النشاط بين هذه الأسواق تتغير مستويات
    التقلبات السعرية خلال اليوم.
  </Paragraph>

  <Paragraph>
    حلل فريق بروكر العرب نطاق حركة الذهب خلال
    جلسات طوكيو ولندن ونيويورك، بالإضافة إلى
    فترة تداخل الجلستين الأوروبية والأمريكية،
    مع مراعاة اختلاف التوقيت الصيفي والشتوي.
  </Paragraph>

  <TradingSessionsComparison />

  <SubHeading>
    جلسة طوكيو الآسيوية
  </SubHeading>

  <Paragraph>
    سجل الذهب خلال جلسة طوكيو متوسط نطاق حركة
    بلغ 0.222% لكل ساعة، بما يعادل نحو 3.95
    دولارات للأونصة ضمن الفترة التاريخية المدروسة.
    وكانت الأقل تقلباً في المتوسط بين الجلسات
    الثلاث التي شملتها المقارنة.
  </Paragraph>

  <SubHeading>
    جلسة لندن الأوروبية
  </SubHeading>

  <Paragraph>
    ارتفع متوسط نطاق الحركة خلال جلسة لندن
    إلى 0.333% لكل ساعة، بما يعادل نحو 5.68
    دولارات للأونصة. وتمثل لندن أحد المراكز
    الرئيسية لتداول الذهب عالمياً.
  </Paragraph>

  <SubHeading>
    جلسة نيويورك الأمريكية
  </SubHeading>

  <Paragraph>
    سجلت جلسة نيويورك متوسط نطاق حركة بلغ
    0.342% لكل ساعة، مقابل 5.79 دولارات
    للأونصة، لتتفوق بفارق محدود على جلسة لندن
    في متوسط التقلب التاريخي.
  </Paragraph>

  <SubHeading>
    تداخل لندن ونيويورك: الفترة الأكثر تقلباً
  </SubHeading>

  <Paragraph>
    تشير النتائج إلى أن فترة تداخل لندن ونيويورك
    سجلت أعلى متوسط لنطاق الحركة بين الفترات
    المدروسة، عند 0.424% لكل ساعة، استناداً إلى
    عينة بلغت 16,301 شمعة ساعة مكتملة.
  </Paragraph>

  <Note title="الاستنتاج الإحصائي">
    سجلت فترة تداخل لندن ونيويورك متوسط نطاق
    حركة يقارب 1.9 ضعف المتوسط المسجل خلال
    جلسة طوكيو. ومع ذلك، فإن ارتفاع التقلب
    لا يثبت أن هذه الفترة تحقق عوائد أعلى
    أو توفر تكاليف تنفيذ أقل.
  </Note>

</ArticleSection>

            {/* LOCAL TIME */}

<ArticleSection
  id="local-time"
  eyebrow="توقيت الدول العربية"
  title="أفضل أوقات تداول الذهب حسب توقيت بلدك"
>

  <Paragraph>
    تختلف ساعات نشاط الذهب بالنسبة للمتداولين
    باختلاف التوقيت المحلي للدولة التي يقيمون
    فيها. ولذلك قمنا بتحويل ساعات ذروة التقلب
    التي توصلت إليها الدراسة التاريخية إلى
    توقيت عدد من الدول العربية.
  </Paragraph>

  <LocalTradingHours />

  <div id="interactive-tool" className="scroll-mt-24">
  <GoldTradingHoursTool data={HOURLY_DATA} />
</div>

  <SubHeading>
    أفضل وقت لتداول الذهب بتوقيت السعودية
  </SubHeading>

  <Paragraph>
    وفقاً للنتائج التاريخية للفترة 2010–2025،
    سجلت الساعات الممتدة من الرابعة عصراً إلى
    السابعة مساءً بتوقيت السعودية أعلى متوسط
    لنطاق حركة الذهب بين الساعات ذات العينات
    الإحصائية الكافية.
  </Paragraph>

  <SubHeading>
    أفضل وقت لتداول الذهب بتوقيت الكويت
  </SubHeading>

  <Paragraph>
    تتطابق ساعات ذروة الحركة في الكويت مع
    التوقيت السعودي، حيث تمتد الفترة الأعلى
    تقلباً تاريخياً من الساعة 16:00 إلى 19:00
    بالتوقيت المحلي.
  </Paragraph>

  <SubHeading>
    أفضل وقت لتداول الذهب بتوقيت الإمارات
  </SubHeading>

  <Paragraph>
    نظراً إلى تقدم توقيت الإمارات بساعة واحدة
    على توقيت السعودية، فإن الفترة المقابلة
    لساعات ذروة الحركة التاريخية تمتد من الخامسة
    عصراً إلى الثامنة مساءً بتوقيت الإمارات.
  </Paragraph>

  <SubHeading>
    أفضل أوقات تداول الذهب بتوقيت مصر
  </SubHeading>

  <Paragraph>
    تمتد الفترة المقابلة لذروة الحركة من الثالثة
    عصراً إلى السادسة مساءً خلال التوقيت الشتوي
    في مصر، ومن الرابعة عصراً إلى السابعة مساءً
    خلال التوقيت الصيفي.
  </Paragraph>

  <Note title="أهمية التوقيت الصيفي والشتوي">
    ساعات ذروة الحركة المعروضة مستخرجة من
    البيانات التاريخية باستخدام توقيت مرجعي
    ثابت. أما مواعيد جلسات لندن ونيويورك
    والأخبار الاقتصادية فتتغير بالنسبة للدول
    العربية مع الانتقال بين التوقيت الصيفي
    والشتوي.
  </Note>

</ArticleSection>

            {/* WEEKDAYS */}

<ArticleSection
  id="weekdays"
  eyebrow="حركة الذهب الأسبوعية"
  title="ما أفضل أيام الأسبوع لتداول الذهب؟"
>

  <Paragraph>
    لا تقتصر الاختلافات في حركة الذهب على ساعات
    التداول اليومية، بل تمتد أيضاً إلى أيام الأسبوع.
    وقد تتأثر مستويات التقلب بتوقيت صدور البيانات
    الاقتصادية واجتماعات البنوك المركزية وتغير
    نشاط المتداولين خلال الأسبوع.
  </Paragraph>

  <Paragraph>
    حلل بروكر العرب متوسط نطاق الحركة لكل ساعة
    خلال أيام الأسبوع، وقارن النتائج التاريخية
    للفترة 2010–2025 بنتائج الأشهر العشرة
    الأولى من عام 2026.
  </Paragraph>

  <WeekdayVolatilityChart />

  <SubHeading>
    الخميس والجمعة: أعلى متوسط تاريخي
  </SubHeading>

  <Paragraph>
    سجل يومَا الخميس والجمعة متوسط نطاق حركة
    يقارب 0.280% لكل ساعة، مقابل 0.266%
    يوم الاثنين، ضمن الفترة التاريخية الأساسية.
    وتشير هذه النتائج إلى اختلاف محدود نسبياً
    بين متوسطات أيام الأسبوع عند مقارنتها
    بالاختلافات الأكثر وضوحاً بين ساعات اليوم.
  </Paragraph>

  <SubHeading>
    هل تغيرت أفضل أيام تداول الذهب في 2026؟
  </SubHeading>

  <Paragraph>
    أظهرت نتائج يناير إلى أكتوبر 2026 ارتفاع
    متوسط نطاق الحركة خلال جميع أيام الأسبوع
    مقارنة بالفترة التاريخية، حيث سجل يوم الاثنين
    أعلى متوسط مئوي بين الأيام الخمسة،
    عند نحو 0.527% لكل ساعة، يليه الخميس
    بنحو 0.521%.
  </Paragraph>

  <Note title="ماذا تعني هذه النتائج؟">
    لا يوجد يوم ثابت يمكن اعتباره الأفضل لجميع
    المتداولين. وتشير النتائج إلى أن اختيار الساعة
    المناسبة قد يكون أكثر أهمية من اختيار يوم
    معين، عند النظر إلى نطاق الحركة التاريخية.
    ولا تقيس الدراسة ربحية استراتيجيات التداول.
  </Note>

</ArticleSection>

{/* HEATMAP */}

<ArticleSection
  id="heatmap"
  eyebrow="التحليل البصري للبيانات"
  title="الخريطة الحرارية لتقلبات الذهب حسب اليوم والساعة"
>

  <Paragraph>
    تقدم الخريطة الحرارية التالية تصوراً شاملاً
    لتوزيع حركة الذهب خلال ساعات وأيام الأسبوع.
    وتعتمد على متوسط نطاق الحركة المئوي المستخرج
    من شموع الساعة المكتملة في الفترة
    التاريخية 2010–2025.
  </Paragraph>

  <GoldVolatilityHeatmap />

  <SubHeading>
    كيف تقرأ الخريطة الحرارية للذهب؟
  </SubHeading>

  <ArticleList
    items={[
      <>
        <Strong>الأزرق الفاتح:</Strong>{" "}
        ساعات سجلت متوسط نطاق حركة منخفضاً
        نسبياً ضمن الدراسة التاريخية.
      </>,
      <>
        <Strong>الأزرق المتوسط:</Strong>{" "}
        ساعات تتميز بمستويات حركة متوسطة.
      </>,
      <>
        <Strong>الأزرق الداكن:</Strong>{" "}
        فترات ارتفع فيها متوسط نطاق الحركة
        السعرية مقارنة ببقية الساعات.
      </>,
      <>
        <Strong>اللون الرمادي:</Strong>{" "}
        فترات لا تحتوي على عينة إحصائية كافية
        لعرض نتيجة قابلة للمقارنة.
      </>,
    ]}
  />

  <SubHeading>
    أكثر الفترات نشاطاً في الخريطة
  </SubHeading>

  <Paragraph>
    تظهر الخريطة ارتفاعاً واضحاً في متوسط
    نطاق حركة الذهب خلال الفترة الممتدة من
    الرابعة عصراً إلى السابعة مساءً بتوقيت
    السعودية، مع تسجيل مستويات مرتفعة
    خصوصاً يومي الخميس والجمعة.
  </Paragraph>

  <Paragraph>
    سجلت الساعة الرابعة عصراً يوم الجمعة
    متوسط نطاق حركة بلغ نحو 0.585%،
    استناداً إلى 798 شمعة ساعة مكتملة.
    وتمثل هذه النتيجة إحدى أبرز فترات النشاط
    ضمن الخريطة التاريخية.
  </Paragraph>

  <Note title="تنبيه للمتداولين" tone="amber">
    الخلايا ذات التقلب المرتفع لا تمثل إشارات
    شراء أو بيع. كما لا تعني أن حركة السعر
    ستستمر في اتجاه واحد أو أن نطاق الحركة
    التاريخي سيتكرر في الجلسات المستقبلية.
  </Note>

</ArticleSection>

{/* PRICE PROBABILITY */}

<ArticleSection
  id="price-probability"
  eyebrow="التحليل الكمي"
  title="كم دولاراً يتحرك الذهب خلال ساعة واحدة؟"
>

  <Paragraph>
    تختلف حركة الذهب من فترة إلى أخرى بصورة
    كبيرة، ولذلك درس فريق بروكر العرب نسبة
    الساعات التي بلغ فيها الفرق بين أعلى وأدنى
    سعر مستويات محددة بالدولار الأمريكي.
  </Paragraph>

  <Paragraph>
    تشمل المقارنة نطاقات حركة قدرها 5 و10
    و20 و30 و50 دولاراً للأونصة، مع فصل
    نتائج الفترة التاريخية عن نتائج 2026.
  </Paragraph>

  <GoldRangeProbability />

  <SubHeading>
    كم مرة يتحرك الذهب 10 دولارات خلال الساعة؟
  </SubHeading>

  <Paragraph>
    بلغ نطاق حركة الذهب 10 دولارات أو أكثر
    في نحو 8.63% من شموع الساعة المكتملة
    خلال الفترة 2010–2025، بينما ارتفعت
    النسبة إلى 84.23% خلال الأشهر العشرة
    الأولى من عام 2026.
  </Paragraph>

  <SubHeading>
    هل يتحرك الذهب 50 دولاراً خلال ساعة؟
  </SubHeading>

  <Paragraph>
    سجلت البيانات التاريخية نطاق حركة بلغ
    50 دولاراً أو أكثر في نحو 0.05% من
    الساعات المدروسة بين 2010 و2025،
    مقابل نحو 6.08% خلال الفترة المدروسة
    من عام 2026.
  </Paragraph>

  <Paragraph>
    تعكس هذه الفروق أهمية مراعاة المستوى
    السعري للذهب عند تحليل نطاقات الحركة
    بالدولار. فارتفاع السعر الاسمي قد يؤدي
    إلى ارتفاع قيمة الحركة بالدولار حتى عندما
    لا ترتفع التقلبات المئوية بالمقدار نفسه.
  </Paragraph>

  <Note title="الفرق بين الدولار والنقطة في تداول الذهب">
    جميع القيم في هذا القسم مقاسة بالدولار
    الأمريكي لكل أونصة من الذهب، وليست
    بالنقاط أو الأرباح الناتجة عن حجم عقد معين.
    ويختلف تعريف النقطة وحجم العقد حسب
    مواصفات الأداة المالية لدى شركة التداول.
  </Note>

  <Paragraph>
    يمكن استخدام{" "}
    <Link
      href="/tools/profit-calculator"
      className="font-black text-[#176ac8] hover:underline"
    >
      حاسبة أرباح التداول
    </Link>{" "}
    لفهم العلاقة بين حركة السعر وحجم الصفقة،
    مع مراعاة تكاليف التداول ومخاطر الرافعة المالية.
  </Paragraph>

</ArticleSection>

            {/* ECONOMIC NEWS */}

<ArticleSection
  id="economic-news"
  eyebrow="البيانات الاقتصادية"
  title="تأثير الأخبار الاقتصادية على أوقات تداول الذهب"
>

  <Paragraph>
    لا تعتمد حركة الذهب خلال اليوم على جلسات
    التداول العالمية فقط، بل تتأثر أيضاً بتوقيت
    صدور البيانات الاقتصادية الأمريكية وقرارات
    السياسة النقدية وتغير توقعات المستثمرين
    بشأن أسعار الفائدة والتضخم.
  </Paragraph>

  <Paragraph>
    ولذلك قد تختلف مستويات التقلب خلال الساعة
    نفسها من يوم إلى آخر، خصوصاً عندما تتزامن
    مع صدور بيانات اقتصادية مؤثرة في الدولار
    الأمريكي وعوائد السندات الحكومية.
  </Paragraph>

  <div className="!my-6 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

    <div className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

      <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
        أهم الأخبار الاقتصادية المؤثرة في الذهب
      </h3>

    </div>

    <div className="overflow-x-auto">

      <table className="w-full min-w-[650px] table-fixed text-center">

        <thead className="bg-[#092443] text-white">

          <tr className="text-[12px]">
            <th className="px-4 py-4">الحدث الاقتصادي</th>
            <th className="px-3 py-4 text-center">الرمز</th>
            <th className="px-4 py-4">علاقته بحركة الذهب</th>
          </tr>

        </thead>

        <tbody>

          {[
            {
              name: "قرارات الفائدة الأمريكية",
              symbol: "FOMC",
              description:
                "تؤثر في توقعات أسعار الفائدة وعوائد السندات والدولار الأمريكي.",
            },
            {
              name: "مؤشر أسعار المستهلكين",
              symbol: "CPI",
              description:
                "يؤثر في توقعات التضخم والسياسة النقدية المستقبلية.",
            },
            {
              name: "بيانات الوظائف الأمريكية",
              symbol: "NFP",
              description:
                "تعكس قوة سوق العمل وتؤثر في توقعات قرارات الفيدرالي.",
            },
            {
              name: "مؤشر نفقات الاستهلاك الشخصي",
              symbol: "PCE",
              description:
                "أحد المؤشرات الأساسية التي يستخدمها الفيدرالي لمتابعة التضخم.",
            },
            {
              name: "الناتج المحلي الإجمالي",
              symbol: "GDP",
              description:
                "يساعد في تقييم النشاط الاقتصادي وتوقعات النمو والفائدة.",
            },
            {
              name: "تصريحات مسؤولي الفيدرالي",
              symbol: "Fed Speeches",
              description:
                "قد تؤدي إلى تغير مفاجئ في توقعات الأسواق بشأن السياسة النقدية.",
            },
          ].map((item, index) => (

            <tr
              key={item.symbol}
              className={`border-t border-slate-200 ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f7f9fc]"
              }`}
            >

              <td className="px-4 py-4 text-[13px] font-black text-[#102747]">
                {item.name}
              </td>

              <td
                dir="ltr"
                className="px-3 py-4 text-center text-[12px] font-black text-[#176ac8]"
              >
                {item.symbol}
              </td>

              <td className="px-4 py-4 text-[12px] leading-7 text-slate-600 sm:text-[13px]">
                {item.description}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

  <SubHeading>
    هل يُفضل تداول الذهب وقت الأخبار الأمريكية؟
  </SubHeading>

  <Paragraph>
    قد تشهد أسعار الذهب تحركات سريعة عند صدور
    البيانات الاقتصادية، إلا أن ارتفاع التقلب
    قد يتزامن مع اتساع فروق الأسعار والانزلاق
    السعري وصعوبة تنفيذ الأوامر بالسعر المتوقع.
    ولذلك فإن نشاط السوق المرتفع لا يمثل
    بالضرورة ظروفاً أفضل لتنفيذ الصفقات.
  </Paragraph>

  <Paragraph>
    ينبغي للمتداول متابعة التقويم الاقتصادي
    والتحقق من مواعيد البيانات بالتوقيت المحلي،
    خصوصاً خلال الفترات التي تتغير فيها مواعيد
    التوقيت الصيفي والشتوي في الولايات المتحدة.
  </Paragraph>

  <div className="!my-6 rounded-[15px] border border-blue-100 bg-[#f1f7ff] p-4 sm:p-6">

    <span className="text-[10px] font-black text-[#176ac8]">
      دراسة ذات صلة
    </span>

    <h3 className="mt-2 text-[16px] font-black text-[#102747] sm:text-[20px]">
      كيف يتفاعل الذهب مع قرارات الفيدرالي الأمريكي؟
    </h3>

    <p className="mt-2 text-[12px] leading-7 text-slate-600 sm:text-[14px]">
      اطلع على دراسة بروكر العرب المستقلة حول
      حركة الذهب خلال قرارات السياسة النقدية
      الأمريكية وتأثير تغير أسعار الفائدة.
    </p>

    <Link
      href="/articles/gold-reaction-fed-decisions"
      className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-4 text-[12px] font-black text-white hover:bg-[#10549f]"
    >
      قراءة الدراسة الكاملة
      <span aria-hidden="true">←</span>
    </Link>

  </div>

  <Note title="حدود التحليل">
    يوضح هذا القسم العلاقة الاقتصادية العامة
    بين الأخبار وحركة الذهب. ولم يتم ضمن هذه
    الدراسة قياس الأثر الإحصائي المستقل لكل
    إعلان اقتصادي أو مقارنة أيام الأخبار
    بالأيام العادية.
  </Note>

</ArticleSection>

{/* TRADING STRATEGIES */}

<ArticleSection
  id="strategies"
  eyebrow="استراتيجيات التداول"
  title="أفضل أوقات تداول الذهب حسب استراتيجية التداول"
>

  <Paragraph>
    لا توجد فترة زمنية واحدة تناسب جميع
    المتداولين في سوق الذهب. فقد يفضل بعض
    المتداولين الفترات ذات الحركة السعرية
    المرتفعة، بينما تركز استراتيجيات أخرى
    على استقرار التنفيذ وتقليل تكاليف التداول.
  </Paragraph>

  <div className="!my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

    {[
      {
        number: "01",
        title: "المضاربة السريعة على الذهب",
        english: "Scalping",
        description:
          "تعتمد على تحركات سعرية قصيرة ومتكررة. ويحتاج المتداول إلى تقييم نطاق الحركة إلى جانب السبريد والعمولات وسرعة تنفيذ الأوامر.",
      },
      {
        number: "02",
        title: "التداول اليومي",
        english: "Day Trading",
        description:
          "يركز على التحركات داخل يوم التداول. ويمكن الاستفادة من دراسة توزيع التقلب خلال الجلسات لتحديد الفترات التي تستحق المراقبة.",
      },
      {
        number: "03",
        title: "التداول متوسط الأجل",
        english: "Swing Trading",
        description:
          "يركز بصورة أكبر على الاتجاهات الممتدة لعدة أيام، مع مراعاة تكاليف الاحتفاظ بالمراكز وتوقيت الدخول والخروج.",
      },
      {
        number: "04",
        title: "التداول أثناء الأخبار",
        english: "News Trading",
        description:
          "يتعامل مع التحركات الناتجة عن البيانات الاقتصادية، ويواجه مخاطر إضافية تشمل الانزلاق السعري واتساع فروق الأسعار.",
      },
    ].map((strategy) => (

      <div
        key={strategy.number}
        className="rounded-[16px] border border-slate-200 bg-[#f8faff] p-4 sm:p-6"
      >

        <div className="flex items-center gap-3 sm:gap-4">

  <div
    dir="ltr"
    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e5f0ff] text-[13px] font-black text-[#176ac8] sm:h-12 sm:w-12 sm:text-[15px]"
  >
    {strategy.number}
  </div>

  <div className="min-w-0 flex-1 text-right">

    <h3 className="text-[15px] font-black leading-[1.6] text-[#102747] sm:text-[19px]">
      {strategy.title}
    </h3>

    <p
      dir="ltr"
      className="mt-0.5 text-right text-[10px] font-bold leading-5 text-[#176ac8] sm:text-[12px]"
    >
      {strategy.english}
    </p>

  </div>

</div>

        <p className="mt-3 text-[13px] leading-[2] text-slate-600 sm:text-[14px]">
          {strategy.description}
        </p>

      </div>

    ))}

  </div>

  <SubHeading>
    ما أهمية اختيار شركة التداول عند تداول الذهب؟
  </SubHeading>

  <Paragraph>
    إلى جانب اختيار الوقت المناسب لمراقبة
    السوق، ينبغي مقارنة شروط تداول الذهب
    بين شركات الوساطة، لأن الاختلاف في
    تكاليف تنفيذ الصفقات قد يؤثر بصورة
    مباشرة في نتائج التداول.
  </Paragraph>

  <ArticleList
    items={[
      "متوسط السبريد الفعلي على الذهب، وليس الحد الأدنى المعلن فقط.",
      "العمولات المباشرة المرتبطة بحجم التداول.",
      "سرعة تنفيذ الأوامر واحتمالات الانزلاق السعري.",
      "حجم العقد والحد الأدنى لحجم الصفقة.",
      "الرافعة المالية ومتطلبات الهامش.",
      "رسوم الاحتفاظ بالصفقات لليوم التالي.",
      "الجهة التنظيمية وشروط حماية أموال العملاء.",
    ]}
  />

  <Note title="مقارنة شركات تداول الذهب">
    يعرض الجدول التالي مجموعة من شركات
    الوساطة المدرجة في بروكر العرب.
    التقييمات المعروضة هي تقييمات عامة،
    ولا تعني أن الشركة تحقق أفضل نتائج
    تنفيذ خلال ساعات الذروة الإحصائية.
  </Note>

</ArticleSection>

            {/* SECOND BROKERS PLACEMENT */}

            <GoldBrokersComparison
              brokers={featuredGoldBrokers}
            />

            {/* RISKS */}

<ArticleSection
  id="risks"
  eyebrow="إدارة المخاطر"
  title="مخاطر تداول الذهب خلال ساعات التقلب المرتفع"
>

  <Paragraph>
    رغم أن ارتفاع متوسط حركة الذهب قد يجذب
    المتداولين الباحثين عن تحركات سعرية واسعة،
    فإنه قد يزيد أيضاً من حجم الخسائر المحتملة،
    خصوصاً عند استخدام الرافعة المالية.
  </Paragraph>

  <SubHeading>
    اتساع فروق الأسعار (Spread)
  </SubHeading>

  <Paragraph>
    قد تتغير فروق أسعار البيع والشراء خلال
    الأخبار الاقتصادية وفترات انخفاض السيولة
    وعند افتتاح السوق أو اقتراب موعد الإغلاق
    اليومي. ولا تتضمن بيانات الأسعار المستخدمة
    في الدراسة قياساً مستقلاً للسبريد لدى الوسطاء.
  </Paragraph>

  <SubHeading>
    الانزلاق السعري (Slippage)
  </SubHeading>

  <Paragraph>
    قد يتم تنفيذ أمر التداول بسعر مختلف عن
    السعر المتوقع نتيجة التحركات السريعة.
    وقد يؤثر ذلك في أوامر الدخول والخروج
    ووقف الخسارة، وفقاً لظروف السوق وسياسة
    التنفيذ لدى شركة الوساطة.
  </Paragraph>

  <SubHeading>
    الرافعة المالية وحجم الصفقة
  </SubHeading>

  <Paragraph>
    يتحدد الأثر المالي لحركة الذهب على الحساب
    بحسب حجم العقد ومواصفات الأداة المالية.
    وقد تؤدي حركة سعرية محدودة نسبياً إلى
    خسارة كبيرة عند استخدام حجم صفقة مرتفع.
  </Paragraph>

  <div className="!my-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

    {[
      {
        title: "حاسبة حجم العقد",
        description: "حساب حجم الصفقة وفق معايير المخاطرة.",
        href: "/tools/lot-size-calculator",
      },
      {
        title: "حاسبة المخاطرة",
        description: "تقدير المخاطرة المالية المحتملة للصفقة.",
        href: "/tools/risk-calculator",
      },
      {
        title: "حاسبة الهامش",
        description: "تقدير الهامش المطلوب لفتح الصفقة.",
        href: "/tools/margin-calculator",
      },
    ].map((tool) => (

      <Link
        key={tool.href}
        href={tool.href}
        className="group rounded-[14px] border border-blue-100 bg-[#f5f9ff] p-4 transition hover:border-blue-300 hover:bg-blue-50"
      >

        <h3 className="text-[14px] font-black text-[#102747] sm:text-[16px]">
          {tool.title}
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
          {tool.description}
        </p>

        <span className="mt-3 inline-flex text-[12px] font-black text-[#176ac8]">
          استخدام الحاسبة ←
        </span>

      </Link>

    ))}

  </div>

  <Note title="تحذير بشأن مخاطر التداول" tone="amber">
    تداول الذهب باستخدام عقود الفروقات
    والرافعة المالية ينطوي على مخاطر مرتفعة
    لخسارة رأس المال. ولا تمثل نتائج الدراسة
    أو الرسومات الإحصائية توصيات استثمارية
    أو إشارات لفتح صفقات شراء أو بيع.
  </Note>

</ArticleSection>

{/* FAQ */}

<ArticleSection
  id="faq"
  eyebrow="أسئلة وأجوبة"
  title="الأسئلة الشائعة حول أفضل أوقات تداول الذهب"
>

  <FAQItem question="ما أفضل وقت لتداول الذهب خلال اليوم؟">
    تشير النتائج التاريخية للدراسة
    إلى ارتفاع متوسط نطاق حركة الذهب بين
    الساعة الرابعة والسابعة مساءً بتوقيت
    السعودية والكويت. وتمثل هذه الفترة ذروة
    التقلب التاريخي بين الساعات ذات العينات
    الكافية، وليس بالضرورة أفضل فترة لتحقيق
    الأرباح.
  </FAQItem>

  <FAQItem question="ما أفضل وقت لتداول الذهب بتوقيت السعودية؟">
    وفقاً للنتائج للفترة 2010–2025،
    سجلت الساعات الممتدة من 16:00 إلى 19:00
    متوسطات مرتفعة لنطاق الحركة السعرية
    مقارنة بمعظم ساعات اليوم.
  </FAQItem>

  <FAQItem question="ما أفضل أوقات تداول الذهب بتوقيت الإمارات؟">
    تقابل فترة ذروة الحركة التاريخية
    المعروضة في الدراسة الساعات الممتدة
    من 17:00 إلى 20:00 بتوقيت الإمارات،
    مع مراعاة أن هذه النتائج تاريخية وليست
    توقعات لحركة السوق المستقبلية.
  </FAQItem>

  <FAQItem question="متى يفتح سوق الذهب ومتى يغلق؟">
    يتوفر تداول الذهب مقابل الدولار لدى
    العديد من الوسطاء على مدار معظم ساعات
    أيام العمل الأسبوعية، مع فترات توقف
    يومية وإغلاق خلال عطلة نهاية الأسبوع.
    وتختلف مواعيد الافتتاح والإغلاق الدقيقة
    وفقاً للوسيط والعطلات ومواصفات الأداة.
  </FAQItem>

  <FAQItem question="هل يمكن تداول الذهب يوم السبت والأحد؟">
    يكون تداول الذهب التقليدي مقابل الدولار
    لدى معظم وسطاء الفوركس وعقود الفروقات
    متوقفاً خلال معظم عطلة نهاية الأسبوع،
    وقد يبدأ التداول مجدداً مساء الأحد
    أو فجر الاثنين بحسب التوقيت المحلي
    ومواعيد الوسيط.
  </FAQItem>

  <FAQItem question="ما أكثر جلسات تداول الذهب تقلباً؟">
    تشير النتائج إلى أن فترة تداخل
    جلسة لندن مع جلسة نيويورك سجلت متوسط
    نطاق حركة مرتفعاً مقارنة بالجلسات
    الرئيسية الأخرى المشمولة في الدراسة.
  </FAQItem>

  <FAQItem question="هل جلسة التداول الآسيوية مناسبة لتداول الذهب؟">
    يعتمد ذلك على استراتيجية المتداول.
    سجلت جلسة طوكيو متوسط حركة أقل من
    جلستي لندن ونيويورك في النتائج،
    لكن قد تشهد الجلسة الآسيوية أيضاً
    تحركات كبيرة عند صدور أخبار مؤثرة.
  </FAQItem>

  <FAQItem question="ما أفضل أيام الأسبوع لتداول الذهب؟">
    أظهرت النتائج التاريخية تقارباً
    بين متوسطات الحركة خلال أيام الأسبوع،
    مع تسجيل الخميس والجمعة متوسطات
    مرتفعة نسبياً خلال الفترة الأساسية.
    وقد تختلف هذه الأنماط بين السنوات.
  </FAQItem>

  <FAQItem question="كم يتحرك الذهب بالدولار خلال ساعة واحدة؟">
    لا يوجد نطاق حركة ثابت للذهب.
    ويختلف مقدار الحركة بحسب الساعة واليوم
    ومستوى السعر والأحداث الاقتصادية.
    ويمكن الرجوع إلى الجدول الإحصائي
    والأداة التفاعلية في هذه الدراسة
    للاطلاع على المتوسطات التاريخية.
  </FAQItem>

  <FAQItem question="هل تداول الذهب وقت الأخبار أكثر ربحية؟">
    لا يمكن استنتاج الربحية من ارتفاع
    التقلب وحده. فقد يصاحب الأخبار
    الاقتصادية اتساع في السبريد وزيادة
    الانزلاق السعري وارتفاع مخاطر الخسارة.
    وتحتاج ربحية أي استراتيجية إلى اختبار
    مستقل يتضمن تكاليف التنفيذ.
  </FAQItem>

  <FAQItem question="هل ارتفاع تقلب الذهب يعني ارتفاع السيولة؟">
    ليس بالضرورة. فقد تنتج التحركات
    السعرية الكبيرة عن زيادة النشاط،
    أو عن انخفاض السيولة، أو عن تغير
    مفاجئ في توقعات السوق. ولا تقيس
    هذه الدراسة السيولة الفعلية أو
    عمق السوق بصورة مستقلة.
  </FAQItem>

  <FAQItem question="كيف أختار شركة مناسبة لتداول الذهب؟">
    ينبغي مقارنة التراخيص التنظيمية
    والسبريد والعمولات وجودة التنفيذ
    وشروط الحساب والهامش وطرق السحب.
    ويمكن الاطلاع على{" "}
    <Link
      href="/best-brokers/gold"
      className="font-black text-[#176ac8] hover:underline"
    >
      دليل أفضل شركات تداول الذهب
    </Link>{" "}
    لمراجعة معلومات الوسطاء وشروطهم.
  </FAQItem>

</ArticleSection>

{/* CONCLUSION */}

<ArticleSection
  id="conclusion"
  eyebrow="خلاصة البحث"
  title="ما أفضل وقت لتداول الذهب بناءً على البيانات التاريخية؟"
>

  <Paragraph>
    تشير النتائج لدراسة بروكر العرب
    إلى وجود اختلافات واضحة في متوسط نطاق
    حركة الذهب خلال ساعات اليوم، وإلى أن
    هذه الاختلافات أكثر وضوحاً من الفروق
    بين متوسطات أيام الأسبوع.
  </Paragraph>

  <Paragraph>
    كما توضح المقارنة الإحصائية بين الفترة
    التاريخية 2010–2025 والأشهر العشرة
    الأولى من 2026 أهمية مراعاة تغير
    مستويات أسعار الذهب عند مقارنة
    نطاقات الحركة بالدولار الأمريكي.
  </Paragraph>

  <ArticleList
    items={[
      <>
        <Strong>توقيت الدولة:</Strong>{" "}
        يجب تحويل ساعات النشاط التاريخية
        إلى التوقيت المحلي الصحيح.
      </>,
      <>
        <Strong>جلسات التداول:</Strong>{" "}
        تعد فترات تداخل المراكز المالية
        العالمية من الفترات الجديرة بالمراقبة.
      </>,
      <>
        <Strong>الأخبار الاقتصادية:</Strong>{" "}
        قد تتغير ظروف السوق بصورة مفاجئة
        عند صدور البيانات المؤثرة.
      </>,
      <>
        <Strong>تكاليف التداول:</Strong>{" "}
        لا يمكن تقييم جودة وقت التداول
        بمعزل عن السبريد والعمولات والتنفيذ.
      </>,
      <>
        <Strong>إدارة المخاطر:</Strong>{" "}
        يجب ألا يُفسر ارتفاع نطاق الحركة
        على أنه ارتفاع مؤكد في فرص الربح.
      </>,
    ]}
  />

  <Note title="الخلاصة">
    لا يوجد وقت تداول مثالي لجميع
    المتداولين. وتوفر دراسة الأنماط
    التاريخية وسيلة لفهم توزيع نشاط
    الذهب خلال اليوم، لكنها لا تتنبأ
    باتجاه السعر أو تضمن تكرار هذه
    الأنماط مستقبلاً.
  </Note>

  <div className="!my-6 rounded-[16px] border border-blue-100 bg-[#f5f9ff] p-5 sm:p-6">

    <h3 className="text-[16px] font-black text-[#102747] sm:text-[19px]">
      أبحاث ودراسات أخرى حول الذهب
    </h3>

    <div className="mt-4 space-y-3">

      <Link
        href="/articles/gold-price-crashes-history"
        className="block rounded-[10px] border border-slate-200 bg-white p-4 text-[13px] font-black text-[#176ac8] hover:border-blue-300"
      >
        أكبر انهيارات أسعار الذهب في التاريخ
        – الخسائر ومدد التعافي ←
      </Link>

      <Link
        href="/articles/gold-reaction-fed-decisions"
        className="block rounded-[10px] border border-slate-200 bg-white p-4 text-[13px] font-black text-[#176ac8] hover:border-blue-300"
      >
        تأثير قرارات الفيدرالي الأمريكي
        على أسعار الذهب ←
      </Link>

      <Link
        href="/best-brokers/gold"
        className="block rounded-[10px] border border-slate-200 bg-white p-4 text-[13px] font-black text-[#176ac8] hover:border-blue-300"
      >
        مقارنة أفضل شركات تداول الذهب
        عبر الإنترنت ←
      </Link>

    </div>

  </div>

</ArticleSection>

{/* METHODOLOGY */}

<ArticleSection
  id="methodology"
  eyebrow="الشفافية البحثية"
  title="منهجية الدراسة الإحصائية ومصادر البيانات"
>

  <Paragraph>
    تعتمد الدراسة على بيانات الأسعار
    التاريخية للذهب مقابل الدولار الأمريكي
    (XAU/USD)، بهدف تحليل الاختلافات في
    نطاق الحركة السعرية حسب ساعات اليوم
    وأيام الأسبوع وجلسات التداول العالمية.
  </Paragraph>

  <SubHeading>
    نطاق الدراسة ومصدر البيانات
  </SubHeading>

  <ArticleList
    items={[
      `الأداة المالية: ${STUDY.instrument}`,
      `مزود البيانات: ${STUDY.provider}`,
      "الفترة التاريخية الأساسية: 2010–2025.",
      "الفترة الحديثة للمقارنة: يناير–أكتوبر 2026.",
      "الإطار الزمني للبيانات الخام: الدقيقة الواحدة M1.",
      "الإطار الزمني للتحليل: الساعة الواحدة H1.",
      "التوقيت المرجعي للعرض: UTC+3.",
      "وحدة قياس الحركة: الدولار الأمريكي للأونصة والنسبة المئوية.",
    ]}
  />

  <SubHeading>
    تنظيف البيانات ومعالجة السجلات
  </SubHeading>

  <Paragraph>
    تتضمن منهجية التنظيف فحص السجلات
    المكررة والمتعارضة، والتحقق من
    التسلسل الزمني وصحة العلاقة بين
    أسعار الافتتاح والإغلاق وأعلى
    وأدنى سعر داخل كل شمعة.
  </Paragraph>

  <Paragraph>
    يعتمد التحليل الأساسي على تجميع
    سجلات الدقيقة الواحدة إلى شموع
    الساعة، مع اشتراط وجود 60 سجلاً
    صالحاً ومتميزاً زمنياً لكل ساعة
    مشمولة في التحليل.
  </Paragraph>

  <SubHeading>
    طريقة حساب نطاق الحركة السعرية
  </SubHeading>

  <div className="!my-6 space-y-4">

    <div className="rounded-[15px] border border-blue-100 bg-[#f5f9ff] p-5">

      <p className="text-[13px] font-black text-[#102747]">
        نطاق الحركة بالدولار
      </p>

      <div
        dir="ltr"
        className="mt-4 text-center text-[17px] font-black text-[#176ac8] sm:text-[23px]"
      >
        Range USD = High − Low
      </div>

    </div>

    <div className="rounded-[15px] border border-blue-100 bg-[#f5f9ff] p-5">

      <p className="text-[13px] font-black text-[#102747]">
        نطاق الحركة بالنسبة المئوية
      </p>

      <div
        dir="ltr"
        className="mt-4 break-words text-center text-[15px] font-black text-[#176ac8] sm:text-[21px]"
      >
        Range % = ((High − Low) / Open) × 100
      </div>

    </div>

  </div>

  <SubHeading>
    حساب المتوسطات والتكرار التاريخي
  </SubHeading>

  <Paragraph>
    يتم حساب المتوسط الحسابي لنطاقات
    الحركة داخل كل مجموعة زمنية،
    مع استخدام الوسيط في بعض المقارنات
    لتوفير مقياس إضافي أقل تأثراً
    بالقيم المتطرفة.
  </Paragraph>

  <Paragraph>
    ويحسب التكرار التاريخي لتجاوز
    نطاق سعري معين بقسمة عدد الشموع
    التي بلغ نطاق حركتها ذلك الحد
    أو تجاوزه على إجمالي عدد الشموع
    الصالحة ضمن الفترة المدروسة.
  </Paragraph>

  <div
    dir="ltr"
    className="!my-5 rounded-[15px] border border-blue-100 bg-[#f5f9ff] p-5 text-center text-[14px] font-black leading-8 text-[#176ac8] sm:text-[19px]"
  >
    Frequency % = (Matching Candles / Total Candles) × 100
  </div>

  <SubHeading>
    التعامل مع اختلاف التوقيت
  </SubHeading>

  <Paragraph>
    تستخدم بيانات HistData توقيتاً مرجعياً
    ثابتاً يعادل UTC-5. ويتم تحويله إلى
    التوقيت المرجعي المستخدم في العرض،
    مع ضرورة مراعاة اختلاف التوقيت الصيفي
    والشتوي عند تصنيف جلسات التداول
    حسب التوقيت المحلي لكل مركز مالي.
  </Paragraph>

  <SubHeading>
    حدود الدراسة الإحصائية
  </SubHeading>

  <ArticleList
    items={[
      "قد تحتوي البيانات التاريخية على فجوات زمنية تؤثر في تمثيل بعض الفترات.",
      "تعتمد النتائج على بيانات مزود أسعار واحد.",
      "لا تقيس الدراسة السبريد التاريخي أو الانزلاق السعري لدى شركات التداول.",
      "لا تتضمن الدراسة قياساً مباشراً لحجم التداول الفعلي أو السيولة.",
      "لا تمثل النتائج اختباراً لربحية استراتيجية تداول محددة.",
      "قد تختلف مستويات التقلب وأنماط الحركة مستقبلاً.",
      "تعكس النتائج خصائص العينة التاريخية المدروسة، ولا تضمن تكرار أنماط الحركة مستقبلاً.",
    ]}
  />

  <SubHeading>
    المصادر والمراجع
  </SubHeading>

  <div className="space-y-3">

    {sources.map((source, index) => (

      <div
        key={source.url}
        className="flex items-start gap-3 rounded-[12px] border border-slate-200 bg-[#f8fafc] p-4"
      >

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#e5f0ff] text-[11px] font-black text-[#176ac8]">
          {index + 1}
        </span>

        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="min-w-0 break-words text-left text-[12px] font-bold leading-7 text-[#176ac8] hover:underline sm:text-[14px]"
        >
          {source.title}
        </a>

      </div>

    ))}

  </div>

  <Note title="الإفصاح البحثي والتجاري">
    أُعدت الدراسة لأغراض بحثية وتعليمية.
    وقد يحصل بروكر العرب على عمولات
    من بعض روابط التسجيل لدى شركات
    التداول المعروضة في المقالة.
    ولا تمثل تلك الروابط نتائج اختبار
    إحصائي لأداء شركات الوساطة خلال
    ساعات التداول المدروسة.
  </Note>

</ArticleSection>

            

          </div>
        </article>
      </div>

    </main>
  );
}