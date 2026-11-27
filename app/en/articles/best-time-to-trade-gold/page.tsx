import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

import GoldTradingHoursTool from "./GoldTradingHoursTool";

import {
  ArticleSection,
  SubHeading,
  Paragraph,
  Strong,
  ArticleList,
  Note,
  FAQItem,
} from "@/app/components/editorial/ArticleComponents";

import ArticleLayout from "@/app/components/editorial/ArticleLayout";

import {
  createArticleMetadata,
  ArticleStructuredData,
  type ArticleSEOConfig,
} from "@/app/components/editorial/ArticleSEO";

/* =========================================================
   BROKER ALARAB
   ENGLISH ARTICLE — BEST TIME TO TRADE GOLD
========================================================= */

const SLUG = "best-time-to-trade-gold";

const ARTICLE = {

  title:
    "Best Time to Trade Gold (XAU/USD): A Statistical Study of Intraday Price Movements",

  seoTitle:
    "Best Time to Trade Gold (XAU/USD): Statistical Study",

  titleMain:
    "Best Time to Trade Gold (XAU/USD):",

  titleHighlight:
    "A Statistical Study of Intraday Price Movements",

  description:
    "Discover the best time to trade gold based on 16 years of historical XAU/USD data. Explore hourly volatility, trading sessions, weekdays and local market hours.",

  heroDescription:
    "An in-depth statistical study of historical gold price movements, hourly volatility, global trading sessions and weekday patterns. Explore when gold has historically been most active and compare trading hours across international time zones.",

  category: "Markets & Economy",

  subcategory: "Gold and Financial Markets",

  articleType: "Statistical Research",

  breadcrumb: "Best Time to Trade Gold",

  publisher: "Broker Alarab",

  published: "2026-11-25",

  modified: "2026-11-25",

  heroAlt:
    "Best time to trade gold XAU/USD and historical price volatility across global trading sessions",

  heroCaption:
    "Illustration of gold trading activity across global financial markets and intraday volatility patterns.",

};

const HERO_IMAGE =
  "/articles/best-time-to-trade-gold.webp";

/* =========================================================
   SEO METADATA
========================================================= */

const ARTICLE_SEO: ArticleSEOConfig = {

  language: "en",

  slug: SLUG,

  title: ARTICLE.title,

  seoTitle: ARTICLE.seoTitle,

  description: ARTICLE.description,

  category: ARTICLE.subcategory,

  categoryName: ARTICLE.category,

  categoryHref:
    "/en/articles/category/financial-markets-economy",

  author: ARTICLE.publisher,

  published: ARTICLE.published,

  modified: ARTICLE.modified,

  image: HERO_IMAGE,

  imageAlt: ARTICLE.heroAlt,

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  indexable: true,

  about: [
    {
      "@type": "Thing",
      name: "Gold Trading",
    },
    {
      "@type": "Thing",
      name: "XAU/USD",
    },
    {
      "@type": "Thing",
      name: "Intraday Market Volatility",
    },
  ],

};

const baseMetadata =
  createArticleMetadata(ARTICLE_SEO);

export const metadata = {
  ...baseMetadata,

  alternates: {
    ...baseMetadata.alternates,

    languages: {
      ...baseMetadata.alternates?.languages,

      "x-default":
        `https://brokeralarab.com/en/articles/${SLUG}`,
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
  timezone: "UTC",
  timezoneLabel: "Coordinated Universal Time (UTC)",
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

const HOURLY_DATA_ORIGINAL: HourlyVolatility[] = [
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


const HOURLY_DATA: HourlyVolatility[] =
  HOURLY_DATA_ORIGINAL.map((row) => ({
    ...row,
    hour: (row.hour - 3 + 24) % 24,
  })).sort((a, b) => a.hour - b.hour);

const PEAK_HOURS = HOURLY_DATA
  .filter((row) => row.samples >= 500)
  .sort((a, b) => b.averagePercent - a.averagePercent)
  .slice(0, 3)
  .map((row) => row.hour);

/* =========================================================
   TRADING SESSION STATISTICS
   2010–2025
   ========================================================= */

const SESSION_DATA = [
  {
    name: "Tokyo Session",
    nameEn: "Asian Trading Hours",
    samples: 32866,
    averageUsd: 3.95,
    averagePercent: 0.2222,
    medianPercent: 0.1791,
    color: "#64748b",
  },
  {
    name: "London Session",
    nameEn: "European Trading Hours",
    samples: 35636,
    averageUsd: 5.68,
    averagePercent: 0.3331,
    medianPercent: 0.2683,
    color: "#2587e7",
  },
  {
    name: "New York Session",
    nameEn: "North American Trading Hours",
    samples: 34541,
    averageUsd: 5.79,
    averagePercent: 0.3418,
    medianPercent: 0.2730,
    color: "#176ac8",
  },
  {
    name: "London–New York Overlap",
    nameEn: "Overlapping Trading Hours",
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

/* =========================================================
   WEEKDAY VOLATILITY STATISTICS
   ========================================================= */

const WEEKDAY_DATA = [
  {
    day: "Monday",
    samples: 16128,
    averageUsd: 4.6636,
    averagePercent: 0.2663,
    recentUsd: 24.0183,
    recentPercent: 0.5266,
    recentSamples: 884,
  },
  {
    day: "Tuesday",
    samples: 16916,
    averageUsd: 4.6976,
    averagePercent: 0.2702,
    recentUsd: 21.4810,
    recentPercent: 0.4687,
    recentSamples: 942,
  },
  {
    day: "Wednesday",
    samples: 16920,
    averageUsd: 4.7773,
    averagePercent: 0.2755,
    recentUsd: 21.0395,
    recentPercent: 0.4594,
    recentSamples: 914,
  },
  {
    day: "Thursday",
    samples: 17060,
    averageUsd: 4.8152,
    averagePercent: 0.2802,
    recentUsd: 24.0142,
    recentPercent: 0.5214,
    recentSamples: 898,
  },
  {
    day: "Friday",
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
   Original research calendar: UTC+3
   ========================================================= */

const HEATMAP_DATA = [
  {
    day: "Monday",
    values: [
      null, 0.589, 0.361, 0.225, 0.276, 0.285,
      0.200, 0.165, 0.171, 0.216, 0.264, 0.293,
      0.242, 0.236, 0.231, 0.255, 0.384, 0.403,
      0.400, 0.307, 0.251, 0.244, 0.213, 0.207,
    ],
  },
  {
    day: "Tuesday",
    values: [
      0.148, 0.249, 0.192, 0.176, 0.232, 0.251,
      0.193, 0.163, 0.171, 0.213, 0.258, 0.302,
      0.264, 0.238, 0.229, 0.274, 0.447, 0.467,
      0.474, 0.352, 0.281, 0.259, 0.234, 0.213,
    ],
  },
  {
    day: "Wednesday",
    values: [
      0.148, 0.335, 0.187, 0.180, 0.228, 0.252,
      0.190, 0.157, 0.176, 0.204, 0.249, 0.276,
      0.248, 0.239, 0.229, 0.267, 0.456, 0.454,
      0.457, 0.338, 0.287, 0.297, 0.379, 0.264,
    ],
  },
  {
    day: "Thursday",
    values: [
      0.178, 0.355, 0.203, 0.192, 0.238, 0.258,
      0.188, 0.162, 0.167, 0.218, 0.263, 0.295,
      0.263, 0.249, 0.239, 0.292, 0.507, 0.495,
      0.458, 0.371, 0.301, 0.287, 0.239, 0.223,
    ],
  },
  {
    day: "Friday",
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
  { id: "summary", label: "Key Research Findings" },
  { id: "hourly-volatility", label: "Gold Volatility by Hour" },
  { id: "featured-gold-brokers", label: "Top Gold Trading Brokers" },
  { id: "trading-sessions", label: "Gold Trading Sessions" },
  { id: "local-time", label: "Gold Trading Hours by Country" },
  { id: "interactive-tool", label: "Gold Trading Hours Analyzer" },
  { id: "weekdays", label: "Best Days to Trade Gold" },
  { id: "heatmap", label: "Gold Volatility Heatmap" },
  { id: "price-probability", label: "Historical Gold Price Ranges" },
  { id: "economic-news", label: "Economic News and Gold" },
  { id: "strategies", label: "Trading Hours by Strategy" },
  { id: "broker-comparison", label: "Gold Broker Comparison" },
  { id: "risks", label: "Gold Trading Risks" },
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "conclusion", label: "Research Conclusion" },
  { id: "methodology", label: "Methodology and Data Sources" },
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



function ResearchSummaryCards() {
  const cards = [
    {
      label: "Historical Research Period",
      value: `${STUDY.historicalYears} Years`,
      description: "2010 – 2025",
    },
    {
      label: "Raw Minute Price Records",
      value: RESEARCH_STATS.rawMinuteRecords.toLocaleString("en-US"),
      description: "All available data periods",
    },
    {
      label: "Hourly Observations Analyzed",
      value: HOURLY_DATA.reduce(
        (sum, row) => sum + row.samples,
        0
      ).toLocaleString("en-US"),
      description: "Core historical sample",
    },
    {
      label: "Recent Comparison Period",
      value: "2026",
      description: "January – October",
    },
  ];

  return (
    <div
      dir="ltr"
      className="!my-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
    >

      {cards.map((card) => (

        <div
          key={card.label}
          className="relative flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-[15px] border border-[#dce6f2] bg-[#f7faff] px-3 py-5 text-center shadow-sm sm:rounded-[18px] sm:px-5 sm:py-6"
        >

          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#176ac8] to-[#38bdf8]" />

          <p className="flex min-h-[38px] items-center justify-center text-center text-[10px] font-bold leading-5 text-slate-500 sm:text-[12px]">
            {card.label}
          </p>

          <div className="mt-2 w-full text-center text-[23px] font-black leading-tight tracking-tight text-[#102747] tabular-nums sm:text-[32px]">
            {card.value}
          </div>

          <p className="mt-3 min-h-[20px] text-center text-[10px] font-bold leading-5 text-[#176ac8] sm:text-[12px]">
            {card.description}
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
  const chartMax =
    Math.ceil(
      Math.max(...HOURLY_DATA.map((row) => row.averagePercent)) * 10
    ) / 10;

  const ticks = Array.from(
    { length: 6 },
    (_, index) => (chartMax / 5) * index
  );

  return (
    <figure
      dir="ltr"
      className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white p-3.5 sm:p-6"
    >
      <figcaption className="mb-5">

        <h3 className="text-[17px] font-black leading-7 text-[#102747] sm:text-[21px]">
          Average Gold Price Range by Hour
        </h3>

        <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          Historical XAU/USD volatility, 2010–2025.
          All hours are displayed in UTC.
        </p>

      </figcaption>

      <div className="overflow-x-auto">

        <svg
          viewBox="0 0 960 340"
          className="h-auto w-full min-w-[580px]"
          role="img"
          aria-label="Historical average hourly gold price ranges in UTC"
        >

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

          {HOURLY_DATA.map((row) => {
            const height =
              (row.averagePercent / chartMax) * 240;

            const x = 68 + row.hour * 36.2;

            const lowSample = row.samples < 500;
            const peakHour = PEAK_HOURS.includes(row.hour);

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
                    {`${String(row.hour).padStart(2, "0")}:00 UTC — ${row.averagePercent.toFixed(3)}% — ${row.samples} observations`}
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
            Hour of the Day (UTC)
          </text>

        </svg>

      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">

        {[
          {
            color: "#2587e7",
            label: "Average Price Range",
          },
          {
            color: "#c49a36",
            label: "Peak Volatility Hours",
          },
          {
            color: "#94a3b8",
            label: "Limited Sample Size",
          },
        ].map((item) => (

          <div key={item.label} className="flex items-center gap-2">

            <span
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />

            <span className="text-[11px] font-bold text-slate-600">
              {item.label}
            </span>

          </div>

        ))}

      </div>

      <p className="mt-5 border-t border-slate-100 pt-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">

  Source: HistData. Research and analysis by Broker Alarab.
  The chart measures the average hourly high-low price range
  as a percentage of the opening price. Historical volatility
  does not represent expected trading profits or guarantee
  future market behavior.

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

      <div className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          Gold Volatility by Hour: 24-Hour Statistical Comparison
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          Average hourly XAU/USD price ranges in US dollars
          and percentages, comparing 2010–2025 with
          January–October 2026. All times are in UTC.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[780px] text-center">

          <thead className="bg-[#092443] text-white">

            <tr className="text-[11px] sm:text-[12px]">

              <th rowSpan={2} scope="col" className="px-4 py-4">
                Hour (UTC)
              </th>

              <th
                colSpan={3}
                scope="colgroup"
                className="border-b border-white/20 px-3 py-3"
              >
                Historical Period 2010–2025
              </th>

              <th
                colSpan={2}
                scope="colgroup"
                className="border-b border-l border-white/20 px-3 py-3"
              >
                January–October 2026
              </th>

            </tr>

            <tr className="text-[10px] sm:text-[11px]">
              <th className="px-3 py-3">Samples</th>
              <th className="px-3 py-3">Avg. Range ($)</th>
              <th className="px-3 py-3">Avg. Range (%)</th>
              <th className="border-l border-white/20 px-3 py-3">
                Avg. Range ($)
              </th>
              <th className="px-3 py-3">Avg. Range (%)</th>
            </tr>

          </thead>

          <tbody>

            {HOURLY_DATA.map((row, index) => {
              const peak = PEAK_HOURS.includes(row.hour);
              const lowSample = row.samples < 500;

              const start = String(row.hour).padStart(2, "0");
              const end = String((row.hour + 1) % 24).padStart(2, "0");

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

                  <td className="whitespace-nowrap px-4 py-3.5 text-[12px] font-black text-[#102747] sm:text-[13px]">
                    {start}:00 – {end}:00
                    {lowSample && (
                      <sup className="text-amber-700">*</sup>
                    )}
                  </td>

                  <td className="px-3 py-3.5 text-[12px] font-bold text-slate-600">
                    {row.samples.toLocaleString("en-US")}
                  </td>

                  <td className="px-3 py-3.5 text-[13px] font-black text-[#102747]">
                    ${row.averageUsd.toFixed(2)}
                  </td>

                  <td className="px-3 py-3.5">

                    <span
                      className={`inline-flex rounded-lg px-2.5 py-1.5 text-[12px] font-black ${
                        peak
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-50 text-[#176ac8]"
                      }`}
                    >
                      {row.averagePercent.toFixed(3)}%
                    </span>

                  </td>

                  <td className="border-l border-slate-200 px-3 py-3.5 text-[13px] font-black text-[#102747]">
                    ${row.recentUsd.toFixed(2)}
                  </td>

                  <td className="px-3 py-3.5 text-[12px] font-black text-[#176ac8]">
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
          * Hours containing fewer than 500 historical
          observations are classified as limited samples
          and excluded from the main peak-hour ranking.
        </p>

        <p className="mt-2">
          All hours are displayed in UTC. Values represent
          historical price ranges rather than expected
          trading profits. The results reflect historical market behavior.
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
          Gold Volatility Across Global Trading Sessions
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          Historical comparison for 2010–2025, accounting
          for seasonal daylight saving time changes.
        </p>

      </div>

      <div className="space-y-6 p-4 sm:p-7">

        {SESSION_DATA.map((session) => (

          <div key={session.name}>

            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">

              <div>

                <p className="text-[13px] font-black text-[#102747] sm:text-[15px]">
                  {session.name}
                </p>

                <p className="text-[10px] text-slate-400 sm:text-[12px]">
                  {session.nameEn}
                </p>

              </div>

              <span className="text-[15px] font-black text-[#102747] sm:text-[19px]">
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
                Average Range:{" "}
                <bdi className="font-black text-[#102747]">
                  ${session.averageUsd.toFixed(2)}
                </bdi>
              </span>

              <span>
                Hourly Samples:{" "}
                {session.samples.toLocaleString("en-US")}
              </span>

            </div>

          </div>

        ))}

      </div>

      <div className="overflow-x-auto border-t border-slate-200">

        <table className="w-full min-w-[600px] text-center">

          <thead className="bg-[#092443] text-white">

            <tr className="text-[11px] sm:text-[12px]">
              <th className="px-4 py-4">Trading Session</th>
              <th className="px-3 py-4">Samples</th>
              <th className="px-3 py-4">Avg. Range ($)</th>
              <th className="px-3 py-4">Avg. Range (%)</th>
              <th className="px-3 py-4">Median Range (%)</th>
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

                <td className="px-3 py-4 text-[12px] font-bold text-slate-600">
                  {session.samples.toLocaleString("en-US")}
                </td>

                <td className="px-3 py-4 text-[13px] font-black text-[#102747]">
                  ${session.averageUsd.toFixed(2)}
                </td>

                <td className="px-3 py-4 text-[13px] font-black text-[#176ac8]">
                  {session.averagePercent.toFixed(3)}%
                </td>

                <td className="px-3 py-4 text-[12px] font-bold text-slate-600">
                  {session.medianPercent.toFixed(3)}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-[#f8fafc] p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        The study defines the Tokyo session as 09:00–18:00
        local time, and the London and New York sessions
        as 08:00–17:00 local time in their respective cities.
        Session observations overlap and should not be added
        together as independent samples. Source: HistData,
        analysis by Broker Alarab. Historical statistical analysis.
      </div>

    </div>
  );
}

/* =========================================================
   GOLD TRADING HOURS BY COUNTRY
   ========================================================= */

/* =========================================================
   GOLD TRADING HOURS BY COUNTRY
   INTERNATIONAL EDITION
   ========================================================= */

function LocalTradingHours() {
  const countries = [
    {
      name: "United States",
      city: "New York",
      standardZone: "UTC−5",
      daylightZone: "UTC−4",
      standardHours: "08:00 – 11:00",
      daylightHours: "09:00 – 12:00",
    },
    {
      name: "Canada",
      city: "Toronto",
      standardZone: "UTC−5",
      daylightZone: "UTC−4",
      standardHours: "08:00 – 11:00",
      daylightHours: "09:00 – 12:00",
    },
    {
      name: "United Kingdom",
      city: "London",
      standardZone: "UTC+0",
      daylightZone: "UTC+1",
      standardHours: "13:00 – 16:00",
      daylightHours: "14:00 – 17:00",
    },
    {
      name: "Australia",
      city: "Sydney",
      standardZone: "UTC+10",
      daylightZone: "UTC+11",
      standardHours: "23:00 – 02:00",
      daylightHours: "00:00 – 03:00",
    },
    {
      name: "Malaysia",
      city: "Kuala Lumpur",
      standardZone: "UTC+8",
      daylightZone: null,
      standardHours: "21:00 – 00:00",
      daylightHours: null,
    },
    {
      name: "Thailand",
      city: "Bangkok",
      standardZone: "UTC+7",
      daylightZone: null,
      standardHours: "20:00 – 23:00",
      daylightHours: null,
    },
    {
      name: "Indonesia",
      city: "Jakarta",
      standardZone: "UTC+7",
      daylightZone: null,
      standardHours: "20:00 – 23:00",
      daylightHours: null,
    },
    {
      name: "Saudi Arabia",
      city: "Riyadh",
      standardZone: "UTC+3",
      daylightZone: null,
      standardHours: "16:00 – 19:00",
      daylightHours: null,
    },
    {
      name: "Egypt",
      city: "Cairo",
      standardZone: "UTC+2",
      daylightZone: "UTC+3",
      standardHours: "15:00 – 18:00",
      daylightHours: "16:00 – 19:00",
    },
  ];

  return (
    <div
      dir="ltr"
      className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm"
    >

      <div className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
          Best Time to Trade Gold by Country
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          Local time conversions of the 
          historical peak volatility window of
          13:00–16:00 UTC.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[580px] table-fixed text-center">

          <thead className="bg-[#092443] text-white">

            <tr className="text-[11px] sm:text-[13px]">

              <th
                scope="col"
                className="w-[34%] px-3 py-4 text-left sm:px-5"
              >
                Country / City
              </th>

              <th scope="col" className="w-[33%] px-3 py-4">
                Standard Time
              </th>

              <th scope="col" className="w-[33%] px-3 py-4">
                Daylight Saving Time
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

                <td className="px-3 py-4 text-left sm:px-5">

                  <div className="text-[12px] font-black text-[#102747] sm:text-[14px]">
                    {country.name}
                  </div>

                  <div className="mt-1 text-[10px] font-bold text-slate-500 sm:text-[11px]">
                    {country.city}
                  </div>

                </td>

                <td className="px-2 py-4">

                  <span className="inline-flex whitespace-nowrap rounded-[8px] border border-amber-200 bg-[#fffbef] px-3 py-1.5 text-[11px] font-black tabular-nums text-amber-800 sm:text-[14px]">
                    {country.standardHours}
                  </span>

                  <div className="mt-1 text-[10px] font-bold text-slate-500">
                    {country.standardZone}
                  </div>

                </td>

                <td className="px-2 py-4">

                  {country.daylightHours ? (

                    <>

                      <span className="inline-flex whitespace-nowrap rounded-[8px] border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black tabular-nums text-[#176ac8] sm:text-[14px]">
                        {country.daylightHours}
                      </span>

                      <div className="mt-1 text-[10px] font-bold text-slate-500">
                        {country.daylightZone}
                      </div>

                    </>

                  ) : (

  <>

    <span className="inline-flex whitespace-nowrap rounded-[8px] border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black tabular-nums text-[#176ac8] sm:text-[14px]">
      {country.standardHours}
    </span>

    <div className="mt-1 text-[10px] font-bold text-slate-500">
      {country.standardZone}
    </div>

    <div className="mt-0.5 text-[9px] font-medium text-slate-400 sm:text-[10px]">
      No daylight saving time
    </div>

  </>

)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">

        The times shown are conversions of the
        study's fixed UTC volatility window, not
        official market opening or closing hours.
        Countries with multiple time zones are
        represented by the cities listed above.
        Time ranges crossing midnight continue
        into the following calendar day.
        Seasonal clock changes may affect local
        trading schedules.

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
          Average Gold Volatility by Day of the Week
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          Comparison of average hourly gold price ranges
          between 2010–2025 and January–October 2026.
        </p>

      </figcaption>

      <div className="space-y-6 p-4 sm:p-7">

        {WEEKDAY_DATA.map((row) => (

          <div key={row.day}>

            <h4 className="mb-3 text-[13px] font-black text-[#102747] sm:text-[15px]">
              {row.day}
            </h4>

            <div className="space-y-2">

              {[
                { value: row.averagePercent, color: "#176ac8" },
                { value: row.recentPercent, color: "#c49a36" },
              ].map((item, index) => (

                <div key={index} className="flex items-center gap-3">

                  <div className="h-5 min-w-0 flex-1 overflow-hidden rounded-md bg-slate-100 sm:h-7">

                    <div
                      className="h-full rounded-md"
                      style={{
                        backgroundColor: item.color,
                        width: `${item.value / maxValue * 100}%`,
                      }}
                    />

                  </div>

                  <span
                    className="w-[65px] shrink-0 text-center text-[12px] font-black sm:text-[14px]"
                    style={{ color: item.color }}
                  >
                    {item.value.toFixed(3)}%
                  </span>

                </div>

              ))}

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
              January–October 2026
            </span>
          </div>

        </div>

      </div>

      <div className="overflow-x-auto border-t border-slate-200">

        <table className="w-full min-w-[650px] text-center">

          <thead className="bg-[#092443] text-white">
            <tr className="text-[11px] sm:text-[12px]">
              <th className="px-4 py-4">Weekday</th>
              <th className="px-3 py-4">Historical Samples</th>
              <th className="px-3 py-4">Historical Avg. Range ($)</th>
              <th className="px-3 py-4">2026 Samples</th>
              <th className="px-3 py-4">2026 Avg. Range ($)</th>
            </tr>
          </thead>

          <tbody>

            {WEEKDAY_DATA.map((row, index) => (

              <tr
                key={row.day}
                className={`border-t border-slate-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f7f9fc]"
                }`}
              >

                <td className="px-4 py-4 text-[13px] font-black text-[#102747]">
                  {row.day}
                </td>

                <td className="px-3 py-4 text-[12px] font-bold text-slate-600">
                  {row.samples.toLocaleString("en-US")}
                </td>

                <td className="px-3 py-4 text-[13px] font-black text-[#176ac8]">
                  ${row.averageUsd.toFixed(2)}
                </td>

                <td className="px-3 py-4 text-[12px] font-bold text-slate-600">
                  {row.recentSamples.toLocaleString("en-US")}
                </td>

                <td className="px-3 py-4 text-[13px] font-black text-amber-700">
                  ${row.recentUsd.toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        Weekday observations retain the original research
        calendar convention of UTC+3. Saturday observations
        are excluded from this comparison. The figures measure
        average hourly ranges, not full-day price ranges.
        Source: HistData — Broker Alarab research.
        Historical statistical analysis.
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
      return { background: "#e2e8f0", color: "#64748b" };
    }

    if (value >= 0.5) {
      return { background: "#123e75", color: "#ffffff" };
    }

    if (value >= 0.4) {
      return { background: "#176ac8", color: "#ffffff" };
    }

    if (value >= 0.3) {
      return { background: "#75b4ed", color: "#102747" };
    }

    if (value >= 0.2) {
      return { background: "#c3def7", color: "#174b80" };
    }

    return { background: "#edf5fc", color: "#475569" };
  };

  return (
    <figure className="!my-7 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

      <figcaption className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

        <span className="text-[10px] font-black uppercase tracking-wider text-[#176ac8]">
          XAU/USD VOLATILITY HEATMAP
        </span>

        <h3 className="mt-2 text-[17px] font-black text-[#102747] sm:text-[21px]">
          Gold Volatility Heatmap by Weekday and Hour
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          Average hourly percentage price ranges,
          2010–2025. Original research calendar: UTC+3.
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
                Weekday
              </th>

              {Array.from({ length: 24 }, (_, hour) => (

                <th
                  key={hour}
                  scope="col"
                  className="px-1 py-3 text-[10px] font-black text-slate-600"
                >
                  {String(hour).padStart(2, "0")}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {HEATMAP_DATA.map((row, dayIndex) => (

              <tr key={row.day}>

                <th
                  scope="row"
                  className="rounded-md bg-[#f5f7fb] px-2 py-4 text-[11px] font-black text-[#102747]"
                >
                  {row.day}
                </th>

                {row.values.map((value, hour) => {
                  const samples = HEATMAP_SAMPLES[dayIndex][hour];
                  const colors = getColor(value, samples);

                  return (

                    <td
                      key={hour}
                      title={`${row.day} | ${String(hour).padStart(2, "0")}:00 UTC+3 | ${
                        value === null
                          ? "No data"
                          : `${value.toFixed(3)}%`
                      } | ${samples} hourly observations`}
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

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 px-4 pb-5">

        {[
          { color: "#edf5fc", label: "Below 0.20%" },
          { color: "#c3def7", label: "0.20–0.29%" },
          { color: "#75b4ed", label: "0.30–0.39%" },
          { color: "#176ac8", label: "0.40–0.49%" },
          { color: "#123e75", label: "0.50% or higher" },
          { color: "#e2e8f0", label: "Limited Data" },
        ].map((item) => (

          <div key={item.label} className="flex items-center gap-1.5">

            <span
              className="h-3.5 w-3.5 rounded-sm border border-slate-200"
              style={{ backgroundColor: item.color }}
            />

            <span className="text-[10px] font-bold text-slate-600 sm:text-[11px]">
              {item.label}
            </span>

          </div>

        ))}

      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        Darker cells indicate higher average hourly price
        ranges. All displayed values are percentages.
        Grey cells contain fewer than 100 complete hourly
        observations or no available data. This heatmap
        retains the original UTC+3 calendar classification.
        For hourly comparisons in UTC or your local time,
        use the Gold Trading Hours Analyzer above.
        Source: HistData — Broker Alarab research.
        Historical statistical analysis.
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
          Historical Frequency of Hourly Gold Price Ranges
        </h3>

        <p className="mt-2 text-[11px] leading-6 text-slate-500 sm:text-[13px]">
          Percentage of hourly candles reaching or exceeding
          selected US dollar price-range thresholds.
        </p>

      </div>

      <div className="space-y-6 p-4 sm:p-7">

        {RANGE_PROBABILITY_DATA.map((row) => (

          <div key={row.threshold}>

            <h4 className="mb-3 text-[13px] font-black text-[#102747] sm:text-[15px]">
              Hourly Price Range of ${row.threshold} or More
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

              <div key={item.label} className="mb-2 flex items-center gap-2 sm:gap-3">

                <span className="w-[64px] shrink-0 text-center text-[10px] font-bold text-slate-500 sm:w-[82px] sm:text-[12px]">
                  {item.label}
                </span>

                <div className="h-5 min-w-0 flex-1 overflow-hidden rounded-md bg-[#edf2f7] sm:h-7">

                  <div
                    className="h-full rounded-md"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  />

                </div>

                <span
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
              <th className="px-3 py-4">Hourly Range</th>
              <th className="px-3 py-4">2010–2025</th>
              <th className="px-3 py-4">Jan–Oct 2026</th>
            </tr>

          </thead>

          <tbody>

            {RANGE_PROBABILITY_DATA.map((row, index) => (

              <tr
                key={row.threshold}
                className={`border-t border-slate-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f7f9fc]"
                }`}
              >

                <td className="px-3 py-4 text-[13px] font-black text-[#102747]">
                  ≥ ${row.threshold}
                </td>

                <td className="px-3 py-4 text-[13px] font-black text-[#176ac8]">
                  {row.historical.toFixed(2)}%
                </td>

                <td className="px-3 py-4 text-[13px] font-black text-amber-700">
                  {row.recent.toFixed(2)}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        The analysis includes 84,040 complete
        hourly candles for 2010–2025 and 4,586 for
        January–October 2026. These percentages represent
        historical frequencies, not forecasts of future
        gold price movements. Values are expressed in US
        dollars per troy ounce.
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


/* =========================================================
   FEATURED GOLD BROKER CARD
   ========================================================= */

function FeaturedBrokerCard({
  broker,
  rank,
}: {
  broker: ArticleBroker;
  rank: number;
}) {
  const rating = Number(broker.rating);

  const ratingText =
    broker.rating != null && Number.isFinite(rating)
      ? rating.toFixed(1)
      : "—";

  const deposit =
    broker.min_deposit != null
      ? `$${broker.min_deposit}`
      : "Not specified";

  const reviewUrl = `/en/brokers/${broker.slug}`;

  return (
    <article
      dir="ltr"
      className="group relative min-w-0 overflow-hidden rounded-[15px] border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition duration-200 hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.09)] sm:rounded-[18px] sm:p-5"
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

      {/* BROKER METRICS */}

      <div className="mx-3 grid grid-cols-2 gap-2 sm:mx-0 sm:mt-4">

        <div className="min-w-0 rounded-[10px] border border-slate-100 bg-[#f7f9fc] px-2.5 py-2 sm:rounded-[12px] sm:p-3">

          <p className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
            Minimum Deposit
          </p>

          <p className="mt-0.5 break-words text-left text-[12px] font-black text-[#102747] sm:mt-1 sm:text-[14px]">
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
              ? "Unavailable"
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

          <span className="inline-flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-[12px] border border-slate-200 bg-slate-100 px-2 py-2.5 text-center text-[10px] font-bold text-slate-400 sm:text-[12px]">
            Unavailable
          </span>

        )}

      </div>

    </article>
  );
}

/* =========================================================
   FEATURED GOLD BROKERS
   ========================================================= */

function FeaturedGoldBrokers({
  brokers,
}: {
  brokers: ArticleBroker[];
}) {
  if (!brokers.length) return null;

  return (
    <aside
      id="featured-gold-brokers"
      aria-label="Featured gold trading brokers"
      dir="ltr"
      className="relative my-9 scroll-mt-24 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-[#f5f9ff] shadow-[0_12px_35px_rgba(15,23,42,0.04)] sm:my-12 sm:rounded-[24px]"
    >

      <div className="relative overflow-hidden border-b border-[#d7e5f4] bg-[linear-gradient(120deg,#071a31_0%,#0a2e52_60%,#12518b_100%)] px-4 py-6 text-left sm:px-7 sm:py-7">

        <div className="pointer-events-none absolute -right-12 -top-24 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative">

          <span className="inline-flex rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1 text-[10px] font-black text-cyan-200">
            Broker Comparison
          </span>

          <h2 className="mt-3 text-[22px] font-black leading-[1.5] text-white sm:text-[27px]">
            Featured Brokers for Gold Trading
          </h2>

          <p className="mt-2 max-w-[850px] text-[12px] leading-7 text-slate-200 sm:text-[14px] sm:leading-8">
            Choosing a gold trading broker involves more than
            identifying active market hours. Compare regulatory
            oversight, XAU/USD trading conditions, transaction
            costs and account features before selecting a broker.
          </p>

        </div>

      </div>

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

        <div className="mt-5 flex flex-col items-start gap-4 rounded-[15px] border border-blue-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

          <div className="min-w-0">

            <h3 className="text-[14px] font-black text-[#102747] sm:text-[16px]">
              Looking for more gold trading brokers?
            </h3>

            <p className="mt-1 text-[11px] leading-6 text-slate-500 sm:text-[12px]">
              Compare broker regulations, trading fees,
              minimum deposits and account conditions.
            </p>

          </div>

          <Link
            href="/en/best-brokers/gold"
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-[12px] border border-[#bfd8f3] bg-[#eaf3ff] px-5 py-3 text-center text-[12px] font-black text-[#145aa5] transition hover:border-blue-400 hover:bg-blue-100 sm:w-auto sm:text-[13px]"
          >
            Compare Gold Brokers
            <span aria-hidden="true">→</span>
          </Link>

        </div>

        <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          Broker ratings are general published Broker Alarab
          ratings. Placement does not represent an independent
          ranking of gold trading costs or execution performance.
          Account availability depends on your country of residence
          and the broker's regulated entity.
          Broker Alarab may receive referral compensation.
        </p>

      </div>

    </aside>
  );
}

/* =========================================================
   GOLD BROKER COMPARISON TABLE
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
      dir="ltr"
      className="my-9 scroll-mt-24 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-white shadow-sm sm:my-12 sm:rounded-[24px]"
    >

      {/* HEADER */}

      <div className="border-b border-blue-100 bg-[linear-gradient(90deg,#edf5ff_0%,#ffffff_100%)] p-5 sm:p-7">

        <span className="text-[10px] font-black text-[#176ac8]">
          Gold Broker Comparison
        </span>

        <h2 className="mt-2 text-[21px] font-black leading-[1.5] text-[#102747] sm:text-[27px]">
          Compare Gold Trading Brokers
        </h2>

        <p className="mt-2 text-[12px] leading-7 text-slate-600 sm:text-[14px]">
          Compare broker ratings, minimum deposits and Islamic
          account availability. Read our detailed broker reviews
          to explore regulatory information, trading fees and
          XAU/USD account conditions.
        </p>

      </div>

      <div className="border-b border-amber-100 bg-[#fffbef] px-4 py-3 text-[11px] font-bold leading-6 text-amber-800 sm:px-5 sm:text-[12px]">
        Gold trading conditions, spreads, leverage and account
        eligibility vary by country, account type and regulated
        entity. The ratings shown are overall broker ratings,
        not independent measurements of gold trading costs.
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden p-4 md:block sm:p-5">

        <div className="overflow-x-auto rounded-[12px] border border-slate-200">

          <table className="w-full min-w-[800px] text-center">

            <thead className="bg-[#092443] text-white">

              <tr className="text-[12px] font-black">

                <th className="px-3 py-4">Rank</th>

                <th className="px-4 py-4 text-left">Broker</th>

                <th className="px-3 py-4">Minimum Deposit</th>

                <th className="px-3 py-4">Islamic Account</th>

                <th className="px-3 py-4">Rating</th>

                <th className="px-4 py-4">Details</th>

              </tr>

            </thead>

            <tbody>

              {brokers.slice(0, 5).map((broker, index) => (

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

                  <td className="px-3 py-4">

                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf3ff] text-[11px] font-black text-[#176ac8]">
                      #{index + 1}
                    </span>

                  </td>

                  <td className="px-4 py-4 text-left">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-slate-200 bg-white p-1.5">

                        {broker.logo ? (

                          <img
                            src={broker.logo}
                            alt={`${broker.name} logo`}
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
                        href={`/en/brokers/${broker.slug}`}
                        className="text-[13px] font-black text-[#102747] hover:text-blue-700"
                      >
                        {broker.name}
                      </Link>

                    </div>

                  </td>

                  <td className="px-3 py-4 text-[13px] font-black text-slate-800">
                    {broker.min_deposit != null
                      ? `$${broker.min_deposit}`
                      : "—"}
                  </td>

                  <td className="px-3 py-4">

                    {broker.islamic_account === true ? (

                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700">
                        Available
                      </span>

                    ) : (

                      <span className="text-[11px] text-slate-500">
                        {broker.islamic_account === false
                          ? "Unavailable"
                          : "Not specified"}
                      </span>

                    )}

                  </td>

                  <td className="px-3 py-4 text-[13px] font-black text-amber-600">
                    ★{" "}
                    {broker.rating != null &&
                    Number.isFinite(Number(broker.rating))
                      ? Number(broker.rating).toFixed(1)
                      : "—"}
                  </td>

                  <td className="px-4 py-4">

                    <div className="flex items-center justify-center gap-2">

                      <Link
                        href={`/en/brokers/${broker.slug}`}
                        className="inline-flex min-h-[40px] items-center justify-center rounded-[10px] border border-slate-200 bg-white px-3 text-[11px] font-black text-[#102747] hover:border-blue-300 hover:bg-blue-50"
                      >
                        Review
                      </Link>

                      {broker.real_account_url ? (

                        <a
                          href={broker.real_account_url}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-[10px] bg-[#176ac8] px-3 text-[11px] font-black text-white hover:bg-[#10549f]"
                        >
                          Open Account
                        </a>

                      ) : (

                        <span className="inline-flex min-h-[40px] items-center justify-center rounded-[10px] bg-slate-100 px-3 text-[10px] text-slate-400">
                          Unavailable
                        </span>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* MOBILE CARDS */}

      <div className="grid gap-3 p-3 md:hidden">

        {brokers.slice(0, 5).map((broker, index) => (

          <FeaturedBrokerCard
            key={broker.id}
            broker={broker}
            rank={index + 1}
          />

        ))}

      </div>

      {/* FOOTER */}

      <div className="px-4 pb-5 sm:px-5">

        <div className="rounded-[12px] border border-blue-100 bg-[#f1f7ff] p-4 text-center">

          <Link
            href="/en/best-brokers/gold"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-5 text-[12px] font-black text-white hover:bg-[#10549f]"
          >
            View Full Gold Broker Comparison
            <span aria-hidden="true">→</span>
          </Link>

        </div>

        <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
          Broker Alarab may receive compensation from certain
          referral links. Leveraged CFD trading carries a high
          risk of capital loss. Brokers displayed here may not
          accept clients from every country, including the
          United States and Canada. Verify your eligibility
          before opening an account.
        </p>

      </div>

    </aside>
  );
}

/* =========================================================
   MAIN ENGLISH ARTICLE PAGE
========================================================= */

export default async function BestTimeToTradeGoldArticlePage() {

  const featuredGoldBrokers =
    await getArticleGoldBrokers();

  return (

    <ArticleLayout

      language="en"

      slug={SLUG}

      title={ARTICLE.titleMain}

      titleHighlight={ARTICLE.titleHighlight}

      description={ARTICLE.heroDescription}

      category={ARTICLE.category}

      categoryHref="/en/articles/category/financial-markets-economy"

      subcategory={ARTICLE.subcategory}

      articleType={ARTICLE.articleType}

      breadcrumbTitle={ARTICLE.breadcrumb}

      author="Broker Alarab Research Team"

      published={ARTICLE.published}

      modified={ARTICLE.modified}

      heroImage={HERO_IMAGE}

      heroImageAlt={ARTICLE.heroAlt}

      heroImageCaption={ARTICLE.heroCaption}

      contents={contents}

      structuredData={
        <ArticleStructuredData
          config={{
            ...ARTICLE_SEO,
            sources,
          }}
        />
      }

      introduction={

        <>

          <Paragraph>
            Gold against the US dollar (XAU/USD)
            is one of the most widely followed
            instruments in global financial markets.
            However, gold price movements are not
            distributed evenly throughout the
            trading day. Volatility changes across
            market sessions, economic announcements
            and different market conditions.
          </Paragraph>

          <Paragraph>
            Understanding the{" "}
            <Strong>best time to trade gold</Strong>{" "}
            requires more than knowing when the
            London and New York sessions open.
            Traders must also consider the historical
            distribution of price movements, trading
            costs, execution conditions and their
            individual risk tolerance.
          </Paragraph>

          <Paragraph>
            This research by Broker Alarab examines
            historical XAU/USD market data covering
            2010–2025, alongside a separate comparison
            with January–October 2026. The analysis
            focuses on hourly price ranges, weekday
            volatility and activity across major
            international trading sessions.
          </Paragraph>

          <Paragraph>
            The study is designed for international
            traders looking to understand gold
            market behaviour, including scalpers,
            day traders and swing traders. It also
            provides an interactive trading hours
            analyzer and local time conversions
            across multiple countries.
          </Paragraph>

          <Note title="About This Statistical Study">

            This study examines historical gold price
            patterns across different hours of the day,
            weekdays and global trading sessions using
            historical price data from HistData.

            The research aims to identify periods of
            higher market activity and price volatility
            through statistical analysis of historical data.

            Historical patterns do not guarantee future
            market behavior, and the findings do not
            constitute investment advice, trading signals
            or forecasts of future price movements.

          </Note>

        </>

      }

    >

            {/* RESEARCH SUMMARY */}

<ArticleSection
  id="summary"
  eyebrow="Research Overview"
  title="Best Time to Trade Gold: Key Research Findings"
>

  <Paragraph>
    What is the best time to trade gold, and when does
    XAU/USD typically experience its largest intraday
    price movements? Broker Alarab examines these
    questions using historical market data rather than
    relying solely on conventional assumptions about
    global trading sessions.
  </Paragraph>

  <ResearchSummaryCards />

  <Paragraph>
    The core research period covers 2010–2025, with
    a separate analysis of January–October 2026.
    The comparison helps illustrate how historical
    volatility patterns differ from more recent
    gold market conditions.
  </Paragraph>

  <SubHeading>
    Key Research Findings
  </SubHeading>

  <ArticleList
    items={[
      <>
        <Strong>Peak gold trading hours:</Strong>{" "}
        The historical data identifies
        13:00–16:00 UTC as the window containing
        the three highest average hourly percentage
        ranges among sufficiently sampled hours.
      </>,
      <>
        <Strong>London–New York overlap:</Strong>{" "}
        The overlapping European and North American
        trading period recorded higher average
        volatility than the individual sessions
        examined in the study.
      </>,
      <>
        <Strong>Weekly trading patterns:</Strong>{" "}
        Historical differences between weekdays
        were relatively modest compared with
        differences between individual trading hours.
      </>,
      <>
        <Strong>Gold volatility in 2026:</Strong>{" "}
        The recent comparison indicates higher
        nominal dollar price ranges than the
        long-term historical averages.
      </>,
      <>
        <Strong>Local trading hours:</Strong>{" "}
        The same historical volatility window
        corresponds to different local times
        across North America, Europe, Australia
        and Southeast Asia.
      </>,
    ]}
  />

  <Note title="What Does the Best Time to Trade Gold Mean?">
    In this research, the best time refers to periods
    of elevated historical price activity. It does
    not identify the most profitable trading hours.
    Actual trading performance depends on strategy,
    position size, transaction costs, execution
    quality and risk management.
  </Note>

</ArticleSection>

{/* HOURLY VOLATILITY */}

<ArticleSection
  id="hourly-volatility"
  eyebrow="Quantitative Market Analysis"
  title="Gold Volatility by Hour: When Does XAU/USD Move the Most?"
>

  <Paragraph>
    Gold price movements are not distributed evenly
    throughout the trading day. Changes in market
    participation, economic announcements, monetary
    policy expectations and activity across major
    financial centres can influence intraday volatility.
  </Paragraph>

  <Paragraph>
    To measure these patterns, Broker Alarab compares
    the difference between the highest and lowest
    prices recorded within complete hourly XAU/USD
    candles. The range is expressed in both US dollars
    and percentages of the opening price.
  </Paragraph>

  <HourlyVolatilityChart />

  <SubHeading>
    What Are the Most Active Gold Trading Hours?
  </SubHeading>

  <Paragraph>
    The analysis identifies 13:00–16:00 UTC
    as the historical window containing the three
    highest average hourly percentage ranges among
    hours with sufficient observations.
  </Paragraph>

  <Paragraph>
    The 13:00–14:00 UTC interval recorded an average
    percentage range of approximately 0.475%,
    followed by 14:00–15:00 UTC at 0.463% and
    15:00–16:00 UTC at 0.460%.
  </Paragraph>

  <Paragraph>
    These hours frequently coincide with elevated
    activity in European and North American markets.
    However, the precise relationship between local
    trading sessions and UTC changes throughout
    the year because of daylight saving adjustments.
  </Paragraph>

  <HourlyVolatilityTable />

  <Note title="Price Range Is Not Trading Profit" tone="amber">
    If gold records an hourly low of $3,000 and a
    high of $3,015, its price range is $15 per
    troy ounce. This does not mean a trader could
    capture the entire movement. Actual profits
    and losses depend on entry and exit prices,
    contract size, execution costs and leverage.
  </Note>

  <SubHeading>
    Why Percentage-Based Gold Volatility Matters
  </SubHeading>

  <Paragraph>
    Gold prices have changed substantially across
    the historical research period. Comparing dollar
    ranges alone can therefore exaggerate or obscure
    differences in relative market volatility.
  </Paragraph>

  <Paragraph>
    Percentage-based ranges normalize price movements
    relative to their starting prices, making comparisons
    across different years more meaningful. Dollar-based
    ranges remain useful for understanding the absolute
    size of historical price movements.
  </Paragraph>

</ArticleSection>

{/* FIRST BROKERS PLACEMENT */}

<FeaturedGoldBrokers brokers={featuredGoldBrokers} />

{/* TRADING SESSIONS */}

<ArticleSection
  id="trading-sessions"
  eyebrow="Global Financial Markets"
  title="Best Gold Trading Sessions: Tokyo, London and New York"
>

  <Paragraph>
    Gold trades across a global network of financial
    markets. As market activity shifts between Asia,
    Europe and North America, intraday XAU/USD
    volatility can change considerably.
  </Paragraph>

  <Paragraph>
    This study compares historical price ranges
    during the Tokyo, London and New York trading
    sessions, including the period when London
    and New York trading hours overlap.
  </Paragraph>

  <TradingSessionsComparison />

  <SubHeading>
    Asian Trading Session: Tokyo
  </SubHeading>

  <Paragraph>
    During the Tokyo session, gold recorded a
    average hourly range of 0.222%,
    equivalent to approximately $3.95 per troy
    ounce over the historical period.
  </Paragraph>

  <Paragraph>
    Tokyo recorded the lowest average volatility
    among the three individual sessions examined.
    Nevertheless, unexpected economic developments
    and regional market events can still produce
    substantial gold price movements during Asian hours.
  </Paragraph>

  <SubHeading>
    London Trading Session
  </SubHeading>

  <Paragraph>
    The London session recorded an average hourly
    percentage range of approximately 0.333%,
    equivalent to $5.68 per troy ounce.
  </Paragraph>

  <Paragraph>
    London plays an important role in international
    gold trading. European financial activity and
    developments in global currency and interest
    rate markets can influence XAU/USD during
    this period.
  </Paragraph>

  <SubHeading>
    New York Trading Session
  </SubHeading>

  <Paragraph>
    The New York session recorded a 
    average hourly price range of approximately
    0.342%, or $5.79 per troy ounce, slightly
    exceeding the average observed during London.
  </Paragraph>

  <Paragraph>
    US economic releases, Treasury yields, Federal
    Reserve policy expectations and movements in
    the US dollar are important considerations
    when monitoring gold during North American
    trading hours.
  </Paragraph>

  <SubHeading>
    London–New York Overlap
  </SubHeading>

  <Paragraph>
    The London–New York overlap recorded the
    highest average hourly range
    among the session windows examined, at
    approximately 0.424%, based on 16,301
    complete hourly observations.
  </Paragraph>

  <Note title="Historical Session Comparison">
    The average hourly percentage range during
    the London–New York overlap was approximately
    1.9 times that observed during the Tokyo
    session. This describes historical price
    volatility rather than trading profitability.
  </Note>

</ArticleSection>

{/* LOCAL TIME */}

<ArticleSection
  id="local-time"
  eyebrow="International Trading Hours"
  title="Best Time to Trade Gold in Your Country"
>

  <Paragraph>
    Understanding XAU/USD trading hours requires
    converting international market activity into
    the trader's local time zone. The 
    historical peak volatility window of
    13:00–16:00 UTC is converted below for
    traders across major international markets.
  </Paragraph>

  <LocalTradingHours />

  <div id="interactive-tool" className="scroll-mt-24">
    <GoldTradingHoursTool data={HOURLY_DATA} />
  </div>

  <SubHeading>
    Best Time to Trade Gold in the United States
  </SubHeading>

  <Paragraph>
    For traders in New York and other locations
    following US Eastern Time, the historical
    peak volatility window corresponds to
    8:00 AM–11:00 AM EST during standard time
    and 9:00 AM–12:00 PM EDT during daylight
    saving time.
  </Paragraph>

  <Paragraph>
    This period frequently coincides with active
    North American and European financial markets.
    Traders on the US West Coast should adjust
    these hours by three additional hours.
    Access to gold products depends on local
    regulations and the financial instrument used.
  </Paragraph>

  <SubHeading>
    Best Time to Trade Gold in Canada
  </SubHeading>

  <Paragraph>
    In Toronto, the historical peak volatility
    window corresponds to 8:00 AM–11:00 AM EST
    or 9:00 AM–12:00 PM EDT. Traders in Vancouver,
    Calgary and other Canadian cities should
    convert these hours to their respective
    time zones.
  </Paragraph>

  <SubHeading>
    Best Time to Trade Gold in the United Kingdom
  </SubHeading>

  <Paragraph>
    For traders in the UK, the historical peak
    volatility window falls between 1:00 PM
    and 4:00 PM GMT, or between 2:00 PM and
    5:00 PM British Summer Time.
  </Paragraph>

  <Paragraph>
    This afternoon period frequently coincides
    with active European trading and the opening
    hours of North American financial markets.
  </Paragraph>

  <SubHeading>
    Best Time to Trade Gold in Australia
  </SubHeading>

  <Paragraph>
    For traders in Sydney, the corresponding
    historical window is 11:00 PM–2:00 AM AEST
    or midnight–3:00 AM AEDT.
  </Paragraph>

  <Paragraph>
    These late-night trading hours may not suit
    every Australian trader. The interactive
    analyzer provides additional hourly comparisons
    for identifying alternative periods of market
    activity within a preferred daily schedule.
  </Paragraph>

  <SubHeading>
    Best Time to Trade Gold in Malaysia
  </SubHeading>

  <Paragraph>
    In Malaysia, the historical peak volatility
    window corresponds to 9:00 PM–midnight
    Malaysia Time (MYT). Malaysia operates on
    UTC+8 throughout the year without seasonal
    daylight saving adjustments.
  </Paragraph>

  <SubHeading>
    Best Time to Trade Gold in Thailand
  </SubHeading>

  <Paragraph>
    For traders in Bangkok and other locations
    in Thailand, the corresponding historical
    window falls between 8:00 PM and 11:00 PM
    Indochina Time (ICT), placing the historical
    peak hours within the local evening.
  </Paragraph>

  <SubHeading>
    Best Time to Trade Gold in Indonesia
  </SubHeading>

  <Paragraph>
    Indonesia has three principal time zones.
    The historical peak volatility window
    corresponds to 8:00 PM–11:00 PM in Jakarta
    and other locations using Western Indonesian
    Time (WIB).
  </Paragraph>

  <Paragraph>
    In Central Indonesia, the equivalent window
    is 9:00 PM–midnight WITA. In Eastern Indonesia,
    it corresponds to 10:00 PM–1:00 AM WIT.
  </Paragraph>

  <SubHeading>
    Gold Trading Hours in Saudi Arabia and Egypt
  </SubHeading>

  <Paragraph>
    In Saudi Arabia, the historical peak window
    corresponds to 4:00 PM–7:00 PM local time.
    In Egypt, it corresponds to 3:00 PM–6:00 PM
    during standard time and 4:00 PM–7:00 PM
    during daylight saving time.
  </Paragraph>

  <Note title="Understanding Daylight Saving Time">
    These local time ranges are conversions of
    the fixed UTC historical volatility window.
    They do not represent official market opening
    or closing times. Actual session overlaps
    and economic release times may shift relative
    to UTC throughout the year.
  </Note>

</ArticleSection>

{/* WEEKDAYS */}

<ArticleSection
  id="weekdays"
  eyebrow="Weekly Market Patterns"
  title="What Is the Best Day of the Week to Trade Gold?"
>

  <Paragraph>
    Gold volatility can also vary across weekdays.
    Scheduled economic releases, central bank
    announcements and changes in market
    participation may contribute to differences
    in weekly price activity.
  </Paragraph>

  <Paragraph>
    The following comparison examines average
    hourly price ranges across weekdays during
    2010–2025 and January–October 2026.
  </Paragraph>

  <WeekdayVolatilityChart />

  <SubHeading>
    Thursday and Friday: Higher Historical Average Volatility
  </SubHeading>

  <Paragraph>
    Thursday and Friday recorded average hourly
    price ranges of approximately 0.280%
    during the historical research period,
    compared with approximately 0.266% on Monday.
  </Paragraph>

  <Paragraph>
    These relatively modest differences suggest
    that trading-hour selection may be more
    relevant than weekday selection when
    examining historical average volatility.
  </Paragraph>

  <SubHeading>
    Have Gold Trading Patterns Changed in 2026?
  </SubHeading>

  <Paragraph>
    During January–October 2026, 
    results indicate higher average hourly
    percentage ranges across all five weekdays.
    Monday recorded the highest average at
    approximately 0.527%, followed by Thursday
    at approximately 0.521%.
  </Paragraph>

  <Note title="Interpreting Weekly Gold Market Patterns">
    Historical weekday averages do not establish
    a universally profitable trading day.
    Economic events, market conditions, strategy
    requirements and trading costs must also
    be considered.
  </Note>

</ArticleSection>

{/* HEATMAP */}

<ArticleSection
  id="heatmap"
  eyebrow="Visual Market Research"
  title="XAU/USD Volatility Heatmap by Hour and Weekday"
>

  <Paragraph>
    The following gold volatility heatmap
    combines weekday and hourly observations
    into a single statistical visualization.
    It displays 120 weekday-hour combinations
    across the historical research period.
  </Paragraph>

  <GoldVolatilityHeatmap />

  <SubHeading>
    How to Read the Gold Volatility Heatmap
  </SubHeading>

  <ArticleList
    items={[
      <>
        <Strong>Light blue:</Strong>{" "}
        Relatively low average historical
        hourly price ranges.
      </>,
      <>
        <Strong>Medium blue:</Strong>{" "}
        Moderate historical price activity.
      </>,
      <>
        <Strong>Dark blue:</Strong>{" "}
        Relatively elevated average
        hourly volatility.
      </>,
      <>
        <Strong>Grey:</Strong>{" "}
        Insufficient observations or
        unavailable data.
      </>,
    ]}
  />

  <SubHeading>
    Identifying Active Gold Trading Periods
  </SubHeading>

  <Paragraph>
    The heatmap shows elevated
    volatility during the afternoon hours
    of the original UTC+3 research calendar,
    particularly on Thursday and Friday.
  </Paragraph>

  <Paragraph>
    The Friday 16:00–17:00 UTC+3 interval,
    corresponding to 13:00–14:00 UTC,
    recorded an average hourly price range
    of approximately 0.585%, based on
    798 complete hourly observations.
  </Paragraph>

  <Note title="Important Heatmap Limitation" tone="amber">
    Darker heatmap cells do not represent
    buy or sell signals. Historical volatility
    does not predict future price direction
    or establish that a trading strategy
    will generate positive returns.
  </Note>

</ArticleSection>

{/* PRICE PROBABILITY */}

<ArticleSection
  id="price-probability"
  eyebrow="Historical Price Distribution"
  title="How Much Does Gold Move in One Hour?"
>

  <Paragraph>
    The hourly price range of XAU/USD can vary
    significantly according to market conditions.
    This section examines the historical frequency
    of hourly gold price ranges reaching selected
    dollar thresholds.
  </Paragraph>

  <Paragraph>
    The comparison includes price ranges of
    at least $5, $10, $20, $30 and $50 per
    troy ounce across the historical and
    recent research periods.
  </Paragraph>

  <GoldRangeProbability />

  <SubHeading>
    How Often Does Gold Move $10 in One Hour?
  </SubHeading>

  <Paragraph>
    The results indicate that gold
    recorded an hourly high-low range of $10
    or more in approximately 8.63% of complete
    historical hourly observations during
    2010–2025, compared with 84.23%
    during January–October 2026.
  </Paragraph>

  <SubHeading>
    Can Gold Move $50 Within an Hour?
  </SubHeading>

  <Paragraph>
    An hourly price range of $50 or more
    occurred in approximately 0.05% of the
    historical 2010–2025 sample, compared
    with approximately 6.08% of the
    2026 sample.
  </Paragraph>

  <Paragraph>
    These differences must be interpreted
    in the context of changing gold prices.
    Higher nominal dollar movements do not
    necessarily imply a proportionate increase
    in relative volatility or trading opportunities.
  </Paragraph>

  <SubHeading>
    Gold Price Movements, Pips and Contract Sizes
  </SubHeading>

  <Paragraph>
    The dollar values presented in this study
    measure the price range of one troy ounce
    of gold. They do not represent pips,
    account profits or the financial result
    of a specific trading position.
  </Paragraph>

  <Note title="Understanding XAU/USD Contract Specifications">
    The definition of a pip or point, contract
    size and minimum trading volume may vary
    between brokers. Always check the instrument
    specifications before calculating potential
    profits, losses or position sizes.
  </Note>

  <Paragraph>
    Use our{" "}
    <Link
      href="/en/tools/profit-calculator"
      className="font-black text-[#176ac8] hover:underline"
    >
      Trading Profit Calculator
    </Link>{" "}
    to understand the relationship between
    price movements and position sizes,
    subject to trading costs and leverage-related risks.
  </Paragraph>

</ArticleSection>

{/* ECONOMIC NEWS */}

<ArticleSection
  id="economic-news"
  eyebrow="Economic Events"
  title="How Economic News Affects Gold Trading Hours"
>

  <Paragraph>
    Gold volatility is influenced not only
    by trading sessions but also by economic
    announcements, monetary policy expectations,
    inflation, Treasury yields and movements
    in the US dollar.
  </Paragraph>

  <Paragraph>
    Consequently, gold can behave differently
    during the same trading hour on different
    days, particularly when important US
    economic data is scheduled for release.
  </Paragraph>

  <div className="!my-6 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">

    <div className="border-b border-slate-200 bg-[#f5f9ff] p-4 sm:p-6">

      <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
        Major Economic Events Affecting Gold Prices
      </h3>

    </div>

    <div className="overflow-x-auto">

      <table className="w-full min-w-[650px] table-fixed text-center">

        <thead className="bg-[#092443] text-white">

          <tr className="text-[12px] sm:text-[13px]">

            <th className="w-[30%] px-4 py-4">
              Economic Event
            </th>

            <th className="w-[15%] px-3 py-4">
              Indicator
            </th>

            <th className="w-[55%] px-4 py-4">
              Relevance to Gold Prices
            </th>

          </tr>

        </thead>

        <tbody>

          {[
            {
              name: "Federal Reserve Rate Decisions",
              symbol: "FOMC",
              description:
                "Influence interest rate expectations, Treasury yields and the US dollar.",
            },
            {
              name: "Consumer Price Index",
              symbol: "CPI",
              description:
                "Shapes inflation expectations and expectations for future monetary policy.",
            },
            {
              name: "US Nonfarm Payrolls",
              symbol: "NFP",
              description:
                "Provides insights into labour market conditions and potential monetary policy developments.",
            },
            {
              name: "Personal Consumption Expenditures",
              symbol: "PCE",
              description:
                "An important inflation measure monitored by the Federal Reserve.",
            },
            {
              name: "Gross Domestic Product",
              symbol: "GDP",
              description:
                "Helps assess economic growth and the outlook for interest rates.",
            },
            {
              name: "Federal Reserve Speeches",
              symbol: "Fed Speeches",
              description:
                "May trigger changes in market expectations about future monetary policy.",
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

              <td className="px-4 py-4 text-center align-middle text-[13px] font-black leading-7 text-[#102747]">
                {item.name}
              </td>

              <td className="px-3 py-4 text-center align-middle text-[12px] font-black text-[#176ac8]">
                {item.symbol}
              </td>

              <td className="px-4 py-4 text-center align-middle text-[12px] leading-7 text-slate-600 sm:text-[13px]">
                {item.description}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

  <SubHeading>
    Is It Better to Trade Gold During Economic News?
  </SubHeading>

  <Paragraph>
    Gold may experience rapid price movements
    around important economic announcements.
    However, elevated volatility can coincide
    with wider bid-ask spreads, slippage and
    difficulty executing orders at intended prices.
  </Paragraph>

  <Paragraph>
    Traders should monitor economic calendars
    and verify release times in their local
    time zones, particularly when North American
    and European daylight saving schedules change.
  </Paragraph>

  <div className="!my-6 rounded-[15px] border border-blue-100 bg-[#f1f7ff] p-4 sm:p-6">

    <span className="text-[10px] font-black text-[#176ac8]">
      Related Market Research
    </span>

    <h3 className="mt-2 text-[16px] font-black text-[#102747] sm:text-[20px]">
      How Does Gold React to Federal Reserve Decisions?
    </h3>

    <p className="mt-2 text-[12px] leading-7 text-slate-600 sm:text-[14px]">
      Explore Broker Alarab's separate research
      into historical gold price behaviour around
      Federal Reserve monetary policy decisions.
    </p>

    <Link
      href="/en/articles/gold-reaction-fed-decisions"
      className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-4 text-[12px] font-black text-white hover:bg-[#10549f]"
    >
      Read the Full Study
      <span aria-hidden="true">→</span>
    </Link>

  </div>

  <Note title="Scope of the Economic News Analysis">
    This section explains general economic relationships
    affecting gold. The current intraday study does not
    independently quantify the impact of each announcement
    or compare news days with non-news days.
  </Note>

</ArticleSection>

{/* TRADING STRATEGIES */}

<ArticleSection
  id="strategies"
  eyebrow="Trading Strategies"
  title="Best Time to Trade Gold by Trading Strategy"
>

  <Paragraph>
    There is no single trading window that suits
    every gold trader. Different strategies have
    different requirements for price movement,
    execution quality, trading costs and position
    holding periods.
  </Paragraph>

  <div className="!my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

    {[
      {
        number: "01",
        title: "Gold Scalping",
        english: "Short-Term Trading",
        description:
          "Focuses on frequent short-duration price movements. Traders need to evaluate spreads, commissions, slippage and execution speed alongside historical volatility.",
      },
      {
        number: "02",
        title: "Gold Day Trading",
        english: "Intraday Trading",
        description:
          "Focuses on price movements within a single trading day. Historical hourly volatility can help identify periods of market activity worth monitoring.",
      },
      {
        number: "03",
        title: "Gold Swing Trading",
        english: "Multi-Day Positions",
        description:
          "Focuses on market movements extending across several days. Overnight financing, broader price trends and entry and exit conditions are important considerations.",
      },
      {
        number: "04",
        title: "Gold News Trading",
        english: "Event-Driven Trading",
        description:
          "Focuses on market reactions to economic announcements. It involves additional risks, including wider spreads, rapid price movements and slippage.",
      },
    ].map((strategy) => (

      <div
        key={strategy.number}
        className="rounded-[16px] border border-slate-200 bg-[#f8faff] p-4 sm:p-6"
      >

        <div className="flex items-center gap-3 sm:gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e5f0ff] text-[13px] font-black text-[#176ac8] sm:h-12 sm:w-12 sm:text-[15px]">
            {strategy.number}
          </div>

          <div className="min-w-0 flex-1 text-left">

            <h3 className="text-[15px] font-black leading-[1.6] text-[#102747] sm:text-[19px]">
              {strategy.title}
            </h3>

            <p className="mt-0.5 text-[10px] font-bold leading-5 text-[#176ac8] sm:text-[12px]">
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
    Why Broker Selection Matters When Trading Gold
  </SubHeading>

  <Paragraph>
    Selecting a trading window is only one part
    of the decision-making process. Differences
    in XAU/USD trading conditions can have a
    material impact on transaction costs and
    execution quality.
  </Paragraph>

  <ArticleList
    items={[
      "Actual XAU/USD spreads rather than advertised minimum spreads alone.",
      "Trading commissions and transaction fees.",
      "Order execution quality and potential slippage.",
      "Contract size and minimum trading volume.",
      "Available leverage and margin requirements.",
      "Overnight financing and holding costs.",
      "Regulatory oversight and client protection.",
      "Account and product eligibility in your country.",
    ]}
  />

  <Note title="Comparing Gold Trading Brokers">
    The following comparison presents general broker
    information. It does not establish which broker
    provides the best execution during the historical
    peak volatility hours identified in this research.
  </Note>

</ArticleSection>

{/* SECOND BROKERS PLACEMENT */}

<GoldBrokersComparison brokers={featuredGoldBrokers} />

{/* RISKS */}

<ArticleSection
  id="risks"
  eyebrow="Risk Management"
  title="Risks of Trading Gold During High-Volatility Hours"
>

  <Paragraph>
    Although active gold trading hours may
    attract traders seeking larger price
    movements, higher volatility can also
    increase potential losses, particularly
    when leveraged instruments are used.
  </Paragraph>

  <SubHeading>
    Wider Gold Trading Spreads
  </SubHeading>

  <Paragraph>
    Bid-ask spreads may widen during economic
    announcements, periods of reduced liquidity
    and daily market opening or closing intervals.
    The historical price data used in this study
    does not independently measure broker spreads.
  </Paragraph>

  <SubHeading>
    Slippage and Order Execution
  </SubHeading>

  <Paragraph>
    Rapid market movements can result in orders
    being executed at prices different from those
    originally requested. This may affect entry
    orders, exit orders and stop-loss execution,
    depending on market conditions and the broker's
    execution policy.
  </Paragraph>

  <SubHeading>
    Leverage and Position Sizing
  </SubHeading>

  <Paragraph>
    The financial impact of a gold price movement
    depends on position size and contract specifications.
    Even a relatively small movement in XAU/USD
    can produce substantial losses when excessive
    leverage is used.
  </Paragraph>

  <div className="!my-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

    {[
      {
        title: "Position Size Calculator",
        description:
          "Estimate position size using your risk parameters.",
        href: "/en/tools/lot-size-calculator",
      },
      {
        title: "Risk Calculator",
        description:
          "Estimate potential financial exposure for a trade.",
        href: "/en/tools/risk-calculator",
      },
      {
        title: "Margin Calculator",
        description:
          "Estimate the margin required to open a position.",
        href: "/en/tools/margin-calculator",
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
          Use Calculator →
        </span>

      </Link>

    ))}

  </div>

  <Note title="Trading Risk Warning" tone="amber">
    Trading gold through leveraged financial
    instruments, including CFDs where legally
    available, carries a high risk of capital loss.
    This study is provided for informational
    and educational purposes and does not constitute
    investment advice or trading recommendations.
  </Note>

</ArticleSection>

{/* FAQ */}

<ArticleSection
  id="faq"
  eyebrow="Questions and Answers"
  title="Frequently Asked Questions About Gold Trading Hours"
>

  <FAQItem question="What is the best time to trade gold (XAU/USD)?">
    Historical results identify
    13:00–16:00 UTC as the window containing
    the three highest average hourly percentage
    ranges among sufficiently sampled hours.
    Higher volatility does not necessarily
    indicate higher trading profitability.
  </FAQItem>

  <FAQItem question="What is the best time to trade gold in the United States?">
    For traders using US Eastern Time, the
    historical peak volatility window corresponds
    to 8:00 AM–11:00 AM EST or
    9:00 AM–12:00 PM EDT.
  </FAQItem>

  <FAQItem question="What is the best time to trade gold in Canada?">
    For traders in Toronto, the historical peak
    volatility window corresponds to
    8:00 AM–11:00 AM EST or 9:00 AM–12:00 PM EDT.
    Other Canadian time zones require different
    local time conversions.
  </FAQItem>

  <FAQItem question="What is the best time to trade gold in the UK?">
    The historical peak volatility window
    corresponds to 1:00 PM–4:00 PM GMT
    or 2:00 PM–5:00 PM British Summer Time.
  </FAQItem>

  <FAQItem question="What is the best time to trade gold in Australia?">
    For traders in Sydney, the historical peak
    volatility window corresponds to
    11:00 PM–2:00 AM AEST or
    midnight–3:00 AM AEDT.
  </FAQItem>

  <FAQItem question="What is the best time to trade gold in Malaysia?">
    The historical peak volatility window
    corresponds to 9:00 PM–midnight
    Malaysia Time (UTC+8).
  </FAQItem>

  <FAQItem question="What is the best time to trade gold in Thailand?">
    The historical peak volatility window
    corresponds to 8:00 PM–11:00 PM
    Indochina Time (UTC+7).
  </FAQItem>

  <FAQItem question="What is the best time to trade gold in Indonesia?">
    The corresponding historical window is
    8:00 PM–11:00 PM in Western Indonesia,
    9:00 PM–midnight in Central Indonesia
    and 10:00 PM–1:00 AM in Eastern Indonesia.
  </FAQItem>

  <FAQItem question="Is the London–New York overlap the best session for gold trading?">
    The analysis identifies the
    London–New York overlap as the most volatile
    session window among those examined.
    However, elevated volatility does not
    establish higher expected profitability.
  </FAQItem>

  <FAQItem question="Is the Asian trading session good for gold?">
    The Tokyo session recorded lower historical
    average hourly price ranges than London
    and New York. Its suitability depends on
    trading strategy, costs and risk tolerance.
  </FAQItem>

  <FAQItem question="What time does the gold market open and close?">
    XAU/USD is generally available throughout
    most of the trading week, with daily breaks
    and weekend closures. Exact trading hours
    depend on the broker, instrument, holidays
    and seasonal trading schedules.
  </FAQItem>

  <FAQItem question="Can you trade gold 24 hours a day?">
    Gold can be traded during most hours
    of the international trading week.
    However, trading is not continuously
    available on every platform, and daily
    maintenance or scheduled market breaks
    may apply.
  </FAQItem>

  <FAQItem question="Can you trade XAU/USD on Saturday and Sunday?">
    Most conventional retail XAU/USD markets
    close for the weekend. Trading may resume
    on Sunday evening or Monday morning,
    depending on the trader's time zone
    and the broker's trading schedule.
  </FAQItem>

  <FAQItem question="What is the best day of the week to trade gold?">
    Historical results show slightly
    higher average hourly ranges on Thursday
    and Friday. However, differences between
    weekday averages were relatively modest.
  </FAQItem>

  <FAQItem question="How much does gold move in one hour?">
    There is no fixed hourly price range.
    Gold volatility varies with trading
    sessions, economic events and market
    conditions. Our interactive analyzer
    provides historical hourly comparisons
    in dollars and percentages.
  </FAQItem>

  <FAQItem question="Is higher gold volatility better for scalping?">
    Higher volatility can increase available
    price movement but may also lead to wider
    spreads, slippage and greater execution risk.
    Strategy profitability requires independent
    testing that includes trading costs.
  </FAQItem>

  <FAQItem question="Does higher gold volatility mean higher liquidity?">
    Not necessarily. Large price movements
    can occur during both increased market
    activity and periods of reduced liquidity.
    This study measures price ranges rather
    than actual market liquidity or depth.
  </FAQItem>

  <FAQItem question="How do I choose a broker for gold trading?">
    Compare regulatory oversight, XAU/USD
    spreads, commissions, contract specifications,
    platforms and client eligibility.
    Our{" "}
    <Link
      href="/en/best-brokers/gold"
      className="font-black text-[#176ac8] hover:underline"
    >
      Gold Trading Broker Comparison
    </Link>{" "}
    provides further information about
    brokers and account conditions.
  </FAQItem>

</ArticleSection>

{/* CONCLUSION */}

<ArticleSection
  id="conclusion"
  eyebrow="Research Conclusion"
  title="When Is the Best Time to Trade Gold?"
>

  <Paragraph>
    Broker Alarab's quantitative
    analysis indicates that historical gold
    price activity varies substantially
    throughout the trading day.
  </Paragraph>

  <Paragraph>
    The highest average hourly percentage
    ranges among adequately sampled hours
    were observed during the 13:00–16:00 UTC
    window. The London–New York overlap also
    recorded elevated average volatility
    relative to the individual trading sessions
    examined in the study.
  </Paragraph>

  <Paragraph>
    The recent comparison period highlights
    the importance of distinguishing between
    absolute US dollar movements and percentage
    volatility, particularly when gold price
    levels differ substantially between periods.
  </Paragraph>

  <ArticleList
    items={[
      <>
        <Strong>Trading hours:</Strong>{" "}
        Historical hourly data can help identify
        periods of elevated market activity.
      </>,
      <>
        <Strong>Local time zones:</Strong>{" "}
        Convert UTC-based research findings into
        your local standard or daylight saving time.
      </>,
      <>
        <Strong>Economic announcements:</Strong>{" "}
        Consider scheduled events that may affect
        gold price behaviour and execution conditions.
      </>,
      <>
        <Strong>Trading costs:</Strong>{" "}
        Evaluate spreads, commissions and
        execution quality alongside volatility.
      </>,
      <>
        <Strong>Risk management:</Strong>{" "}
        Historical price activity does not
        guarantee future trading profitability.
      </>,
    ]}
  />

  <Note title="Final Research Takeaway">
    There is no universally optimal time to
    trade gold. Historical volatility analysis
    provides insight into when the market has
    been more active, but it cannot predict
    future price direction or guarantee
    profitable trading outcomes.
  </Note>

  <div className="!my-6 rounded-[16px] border border-blue-100 bg-[#f5f9ff] p-5 sm:p-6">

    <h3 className="text-[16px] font-black text-[#102747] sm:text-[19px]">
      More Gold Market Research and Trading Guides
    </h3>

    <div className="mt-4 space-y-3">

      <Link
        href="/en/articles/gold-price-crashes-history"
        className="block rounded-[10px] border border-slate-200 bg-white p-4 text-[13px] font-black text-[#176ac8] hover:border-blue-300"
      >
        Biggest Gold Price Crashes in History:
        Losses and Recovery Periods →
      </Link>

      <Link
        href="/en/articles/gold-reaction-fed-decisions"
        className="block rounded-[10px] border border-slate-200 bg-white p-4 text-[13px] font-black text-[#176ac8] hover:border-blue-300"
      >
        How Gold Reacts to Federal Reserve Decisions →
      </Link>

      <Link
        href="/en/best-brokers/gold"
        className="block rounded-[10px] border border-slate-200 bg-white p-4 text-[13px] font-black text-[#176ac8] hover:border-blue-300"
      >
        Compare Gold Trading Brokers →
      </Link>

    </div>

  </div>

</ArticleSection>

{/* METHODOLOGY */}

<ArticleSection
  id="methodology"
  eyebrow="Research Transparency"
  title="Statistical Methodology and Historical Data Sources"
>

  <Paragraph>
    This quantitative research examines historical
    gold price data against the US dollar (XAU/USD)
    to identify differences in price activity across
    trading hours, weekdays and global financial
    market sessions.
  </Paragraph>

  <SubHeading>
    Research Scope and Data Coverage
  </SubHeading>

  <ArticleList
    items={[
      `Financial instrument: ${STUDY.instrument}`,
      `Historical data provider: ${STUDY.provider}`,
      "Core historical research period: 2010–2025.",
      "Recent comparison period: January–October 2026.",
      "Raw data resolution: One-minute candles (M1).",
      "Analysis resolution: One-hour candles (H1).",
      "Hourly charts and tables: Coordinated Universal Time (UTC).",
      "Weekday and heatmap classification: UTC+3.",
      "Measurement units: US dollars per troy ounce and percentages.",
    ]}
  />

  <SubHeading>
    Data Cleaning and Quality Control
  </SubHeading>

  <Paragraph>
    The data preparation methodology includes
    checking duplicate and conflicting timestamps,
    chronological consistency and the relationship
    between opening, closing, high and low prices
    within each candle.
  </Paragraph>

  <Paragraph>
    The analysis aggregates one-minute price records
    into hourly candles. Each included hour is
    required to contain 60 valid records with
    distinct minute timestamps. Incomplete hours
    are excluded from the primary hourly analysis.
  </Paragraph>

  <SubHeading>
    Calculating Historical Gold Price Ranges
  </SubHeading>

  <div className="!my-6 space-y-4">

    <div className="rounded-[15px] border border-blue-100 bg-[#f5f9ff] p-5">

      <p className="text-[13px] font-black text-[#102747]">
        Absolute Hourly Price Range
      </p>

      <div className="mt-4 text-center text-[17px] font-black text-[#176ac8] sm:text-[23px]">
        Range USD = High − Low
      </div>

    </div>

    <div className="rounded-[15px] border border-blue-100 bg-[#f5f9ff] p-5">

      <p className="text-[13px] font-black text-[#102747]">
        Percentage Hourly Price Range
      </p>

      <div className="mt-4 break-words text-center text-[15px] font-black text-[#176ac8] sm:text-[21px]">
        Range % = ((High − Low) / Open) × 100
      </div>

    </div>

  </div>

  <Paragraph>
    The percentage price range normalizes absolute
    market movements relative to each hourly
    opening price. This allows more meaningful
    comparisons across historical periods with
    different price levels.
  </Paragraph>

  <SubHeading>
    Statistical Averages and Historical Frequencies
  </SubHeading>

  <Paragraph>
    Arithmetic means summarize hourly price
    ranges within each observation group.
    Selected comparisons also include median
    ranges as an additional measure less
    sensitive to extreme observations.
  </Paragraph>

  <Paragraph>
    Historical threshold frequencies are calculated
    by dividing the number of hourly candles
    meeting or exceeding a selected price range
    by the total number of eligible observations.
  </Paragraph>

  <div className="!my-5 rounded-[15px] border border-blue-100 bg-[#f5f9ff] p-5 text-center text-[14px] font-black leading-8 text-[#176ac8] sm:text-[19px]">
    Frequency % = (Matching Candles / Total Candles) × 100
  </div>

  <SubHeading>
    Time Zones and Daylight Saving Adjustments
  </SubHeading>

  <Paragraph>
    The research uses the fixed UTC-5 source
    timestamp convention for HistData. The
    hourly chart and comparison table in
    this international edition display
    corresponding UTC hours.
  </Paragraph>

  <Paragraph>
    Weekday and heatmap results retain the
    original UTC+3 calendar classification.
    This avoids incorrectly assigning hours
    crossing midnight to different weekdays.
    International local time conversions
    are presented separately.
  </Paragraph>

  <Paragraph>
    Session classifications use the defined
    local trading hours of Tokyo, London and
    New York, accounting for seasonal daylight
    saving differences. Session observation
    groups can overlap.
  </Paragraph>

  <SubHeading>
    Research Limitations
  </SubHeading>

  <ArticleList
    items={[
      "Historical data gaps may affect the representation of particular periods.",
      "The analysis relies on a single historical price data provider.",
      "Hours with limited observations may not provide representative estimates.",
      "Broker-specific historical spreads and execution costs are not included.",
      "The research does not independently measure trading volume, liquidity or market depth.",
      "The research does not constitute a trading strategy profitability backtest.",
      "Historical price patterns may not persist under future market conditions.",
      "The findings reflect the historical sample examined and may vary depending on the data source, observation period and market conditions.",
    ]}
  />

  <SubHeading>
    Data Sources and Research References
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
          className="min-w-0 break-words text-left text-[12px] font-bold leading-7 text-[#176ac8] hover:underline sm:text-[14px]"
        >
          {source.title}
        </a>

      </div>

    ))}

  </div>

  <Note title="Research and Commercial Disclosure">
    This research is intended for informational
    and educational purposes. Broker Alarab may
    receive compensation from certain broker
    referral links displayed in the article.
    The broker comparisons do not represent
    statistical tests of broker execution
    performance during the hours examined
    in this research.
  </Note>

</ArticleSection>

    </ArticleLayout>

  );

}