import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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
   ARTICLE — GOLD REACTION TO FED DECISIONS
========================================================= */

const SLUG = "gold-reaction-fed-decisions";

const ARTICLE = {
  title:
    "كيف يتأثر الذهب بقرارات الفيدرالي الأمريكي؟ تحليل 41 اجتماعاً بالأرقام",

  seoTitle:
    "تأثير الفيدرالي الأمريكي على الذهب | دراسة 41 قراراً بالأرقام",

  titleMain:
    "كيف يتأثر الذهب بقرارات الفيدرالي الأمريكي؟",

  titleHighlight:
    "تحليل 41 اجتماعاً بالأرقام",

  description:
    "تحليل حركة الذهب بعد 41 قراراً للفيدرالي الأمريكي بين 2021 و2026، ونسب الصعود والهبوط وتأثير رفع وخفض وتثبيت الفائدة خلال الساعة الأولى.",

  category: "مقالات الأسواق والاقتصاد",

  subcategory: "الذهب وأسعار الفائدة",

  articleType: "دراسة إحصائية",

  breadcrumb: "الذهب وقرارات الفيدرالي",

  publisher: "بروكر العرب",

  published: "2026-11-23",

  modified: "2026-11-23",

  heroAlt:
    "دراسة تاريخية لحركة أسعار الذهب بعد قرارات الاحتياطي الفيدرالي الأمريكي وتأثير أسعار الفائدة",

  heroCaption:
    "صورة توضيحية للعلاقة بين السياسة النقدية الأمريكية وأسعار الذهب، وليست رسماً بيانياً للأسعار الفعلية.",
};

const HERO_IMAGE =
  "/articles/gold-fed-decisions-hero.webp";

const FEATURED_BROKERS_READY = true;

const ARTICLE_KEYWORDS = [
  "الذهب",
  "الفيدرالي الأمريكي",
  "أسعار الفائدة",
  "تداول الذهب",
  "XAUUSD",
  "FOMC",
  "السياسة النقدية",
  "تأثير رفع الفائدة على الذهب",
  "تأثير خفض الفائدة على الذهب",
  "تأثير تثبيت الفائدة على الذهب",
];

/* =========================================================
   SEO METADATA
========================================================= */

const ARTICLE_SEO: ArticleSEOConfig = {

  language: "ar",

  slug: SLUG,

  title: ARTICLE.title,

  seoTitle: ARTICLE.seoTitle,

  description: ARTICLE.description,

  category: ARTICLE.subcategory,

  categoryName: ARTICLE.category,

  categoryHref:
    "/articles/category/financial-markets-economy",

  author: ARTICLE.publisher,

  published: ARTICLE.published,

  modified: ARTICLE.modified,

  image: HERO_IMAGE,

  imageAlt: ARTICLE.heroAlt,

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  indexable: true,

  tags: ARTICLE_KEYWORDS.slice(0, 7),

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
  ],

};

export const metadata =
  createArticleMetadata(ARTICLE_SEO);

/* =========================================================
   ARTICLE DATA
   ========================================================= */

const contents = [
  { id: "summary", label: "أهم نتائج الدراسة" },
  { id: "fed-impact", label: "تأثير الفيدرالي على الذهب" },
  { id: "first-minutes", label: "حركة الذهب في الدقائق الأولى" },
  { id: "first-hour", label: "حركة الذهب خلال ساعة" },
  { id: "historical-reactions", label: "أمثلة تاريخية" },
  { id: "percentage-reactions", label: "تحليل الحركة المئوية" },
  { id: "longer-term", label: "حركة الذهب بعد القرار" },
  { id: "rate-hike", label: "تأثير رفع الفائدة" },
  { id: "rate-cut", label: "تأثير خفض الفائدة" },
  { id: "rate-hold", label: "تأثير تثبيت الفائدة" },
  { id: "press-conference", label: "المؤتمر الصحفي للفيدرالي" },
  { id: "dollar-yields", label: "الدولار وعوائد السندات" },
  { id: "trading-risks", label: "مخاطر التداول وقت الفائدة" },
  { id: "faq", label: "الأسئلة الشائعة" },
  { id: "conclusion", label: "الخلاصة" },
  { id: "methodology", label: "المنهجية والمصادر" },
];

const intradayMoves = [
  { label: "دقيقة واحدة", value: 4.98 },
  { label: "5 دقائق", value: 6.04 },
  { label: "15 دقيقة", value: 6.54 },
  { label: "60 دقيقة", value: 9.72 },
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
    period: "الجلسة التالية",
    sample: 95,
    positive: "43%",
    median: "−0.02%",
    worst: "−5.30%",
    best: "+2.29%",
  },
  {
    period: "5 جلسات",
    sample: 95,
    positive: "45%",
    median: "−0.30%",
    worst: "−8.58%",
    best: "+6.80%",
  },
  {
    period: "20 جلسة",
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
    label: "رفع الفائدة",
    total: 12,
    up: 8,
    down: 4,
    upPercent: 66.67,
    downPercent: 33.33,
    averageMove: 18.39,
    medianMove: 11.41,
  },
  {
    label: "خفض الفائدة",
    total: 6,
    up: 2,
    down: 4,
    upPercent: 33.33,
    downPercent: 66.67,
    averageMove: 21.01,
    medianMove: 23.72,
  },
  {
    label: "تثبيت الفائدة",
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
    period: "دقيقة واحدة",
    mean: 0.239,
    median: 0.175,
  },
  {
    period: "5 دقائق",
    mean: 0.320,
    median: 0.224,
  },
  {
    period: "15 دقيقة",
    mean: 0.366,
    median: 0.222,
  },
  {
    period: "60 دقيقة",
    mean: 0.647,
    median: 0.531,
  },
];

const percentageDecisionStats = [
  {
    label: "رفع الفائدة",
    sample: 12,
    mean: 0.738,
    median: 0.647,
  },
  {
    label: "خفض الفائدة",
    sample: 6,
    mean: 0.626,
    median: 0.581,
  },
  {
    label: "تثبيت الفائدة",
    sample: 23,
    mean: 0.605,
    median: 0.426,
  },
];

const percentageExtremes = [
  {
    date: "2023-12-13",
    type: "أكبر ارتفاع نسبي",
    referencePrice: 1982.03,
    dollarChange: 31.57,
    percentChange: 1.593,
  },
  {
    date: "2026-07-29",
    type: "أكبر ارتفاع بالدولار",
    referencePrice: 4044.21,
    dollarChange: 62.32,
    percentChange: 1.541,
  },
  {
    date: "2026-09-16",
    type: "أكبر انخفاض نسبي وبالدولار",
    referencePrice: 4360.60,
    dollarChange: -99.40,
    percentChange: -2.280,
  },
];

const sources = [
  {
    title:
      "الاحتياطي الفيدرالي الأمريكي — أرشيف اجتماعات وقرارات اللجنة الفيدرالية للسوق المفتوحة",
    url:
      "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
  },
  {
    title:
      "الاحتياطي الفيدرالي الأمريكي — السجل التاريخي لتغيرات أسعار الفائدة",
    url:
      "https://www.federalreserve.gov/monetarypolicy/openmarket.htm",
  },
  {
    title:
      "XAU Meter — بيانات حركة الذهب بعد 41 إعلاناً للفيدرالي الأمريكي",
    url:
      "https://xaumeter.com/gold-news-reaction/fomc",
  },
  {
    title:
      "Regimic — دراسة أداء الذهب بعد 95 قراراً للفيدرالي منذ 2015",
    url:
      "https://www.regimic.com/fed-decision-market-reaction/gold",
  },
  {
    title:
      "مجلس الذهب العالمي — تأثير السياسة النقدية على أسعار الذهب",
    url:
      "https://www.gold.org/goldhub/research/the-impact-of-monetary-policy-on-gold",
  },
  {
    title:
      "Federal Reserve Bank of San Francisco — قاعدة بيانات دراسة أحداث السياسة النقدية الأمريكية",
    url:
      "https://www.frbsf.org/research-and-insights/data-and-indicators/us-monetary-policy-event-study-database/",
  },
  {
    title:
      "FRED — العوائد الحقيقية لسندات الخزانة الأمريكية لأجل عشر سنوات",
    url:
      "https://fred.stlouisfed.org/series/DFII10",
  },
  {
    title:
      "FRED — أسعار الفائدة الفيدرالية",
    url:
      "https://fred.stlouisfed.org/series/FEDFUNDS",
  },
];



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
          className={`w-full text-right ${
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
                          ? "border-l border-slate-200"
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
          مقدار حركة الذهب بعد إعلان الفيدرالي
        </h3>

        <p className="mt-2 text-[12px] leading-6 text-slate-500">
          وسيط التغير المطلق بالدولار لكل أونصة،
          استناداً إلى 41 إعلاناً منذ نوفمبر 2021.
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
                className="h-full rounded-full bg-gradient-to-l from-[#145bb3] to-[#38bdf8]"
                style={{
                  width: `${(item.value / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-6 text-slate-500">
        المصدر: XAU Meter. تمثل الأرقام مقدار التغير
        المطلق مقارنة بالسعر السابق للإعلان، وليس
        اتجاه الحركة أو متوسط الأرباح.
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
          حركة الذهب بعد ساعة من قرارات الفيدرالي
        </h3>

        <p className="mt-2 text-[12px] leading-6 text-slate-500">
          تغير سعر الأونصة بالدولار خلال اجتماعات
          عام 2026 المشمولة في البيانات المنشورة.
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
        المصدر: XAU Meter. تقيس البيانات التغير
        بعد 60 دقيقة مقارنة بآخر سعر قبل الإعلان.
      </p>
    </figure>
  );
}

function LongerTermChart() {
  return (
    <figure className="!mt-7 rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">
      <h3 className="text-[17px] font-black text-[#102747] sm:text-[20px]">
        نسبة حالات ارتفاع الذهب بعد قرارات الفيدرالي
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
                className="h-full rounded-full bg-gradient-to-l from-[#145bb3] to-[#38bdf8]"
                style={{
                  width: item.positive,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-6 text-slate-500">
        المصدر: Regimic. يبدأ القياس من افتتاح
        الجلسة التالية للإعلان. لا تقيس هذه النتائج
        الحركة الفورية بعد القرار.
      </p>
    </figure>
  );
}

/* =========================================================
   FAQ COMPONENT
   ========================================================= */

   function ResearchStatistics() {
  const stats = [
    {
      label: "عدد اجتماعات الفيدرالي",
      value: String(researchStats.sample),
      detail: "نوفمبر 2021 – أكتوبر 2026",
      color: "text-[#176ac8]",
    },
    {
      label: "متوسط الحركة المطلقة بعد ساعة",
      value: `$${researchStats.averageAbsoluteMove.toFixed(2)}`,
      detail: "دولار لكل أونصة",
      color: "text-[#176ac8]",
    },
    {
      label: "نسبة حالات ارتفاع الذهب",
      value: `${researchStats.upPercent}%`,
      detail: "20 من أصل 41 اجتماعاً",
      color: "text-emerald-700",
    },
    {
      label: "نسبة حالات انخفاض الذهب",
      value: `${researchStats.downPercent}%`,
      detail: "21 من أصل 41 اجتماعاً",
      color: "text-red-700",
    },
    {
      label: "أكبر ارتفاع بعد ساعة",
      value: `+$${researchStats.largestRise.toFixed(2)}`,
      detail: "29 يوليو 2026",
      color: "text-emerald-700",
    },
    {
      label: "أكبر انخفاض بعد ساعة",
      value: `−$${Math.abs(
        researchStats.largestFall
      ).toFixed(2)}`,
      detail: "16 سبتمبر 2026",
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

          {/* STAT LABEL */}

          <p className="flex min-h-[36px] items-center justify-center text-[10px] font-bold leading-[18px] text-slate-600 sm:min-h-[44px] sm:text-[13px] sm:leading-[22px]">
            {stat.label}
          </p>

          {/* STAT VALUE */}

          <p
            dir="ltr"
            className={`my-2 whitespace-nowrap text-center text-[clamp(19px,5.5vw,25px)] font-black leading-none tracking-tight tabular-nums sm:my-3 sm:text-[34px] ${stat.color}`}
          >
            {stat.value}
          </p>

          {/* STAT DESCRIPTION */}

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
          اتجاه الذهب بعد ساعة حسب نوع قرار الفائدة
        </h3>

        <p className="mt-2 text-[12px] leading-7 text-slate-500">
          مقارنة نسبة الارتفاع والانخفاض بعد 41 اجتماعاً
          للفيدرالي الأمريكي بين 2021 و2026.
        </p>
      </figcaption>

      <div className="my-5 flex flex-wrap gap-5 text-[12px] font-bold text-slate-600">

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-emerald-500" />
          ارتفاع الذهب
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-500" />
          انخفاض الذهب
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
                {item.total} قراراً
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
              ارتفع الذهب في {item.up} حالات،
              وانخفض في {item.down} حالات.
            </p>

          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] leading-6 text-slate-500">
        إعداد وتحليل بروكر العرب باستخدام بيانات
        XAU Meter وسجل قرارات الاحتياطي الفيدرالي.
        النتائج وصفية ولا تمثل توقعات مستقبلية.
      </p>

    </figure>
  );
}

function ReversalStatistics() {
  const data = [
    {
      label: "انعكاس اتجاه الدقيقة الأولى",
      count: 15,
      percent: 36.59,
    },
    {
      label: "انعكاس اتجاه أول 5 دقائق",
      count: 13,
      percent: 31.71,
    },
  ];

  return (
    <figure className="!my-7 rounded-[18px] border border-slate-200 bg-white p-4 sm:p-6">

      <h3 className="text-[17px] font-black text-[#102747] sm:text-[21px]">
        كم مرة انعكس اتجاه الذهب بعد الحركة الأولى؟
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
                className="h-full rounded-full bg-gradient-to-l from-amber-500 to-orange-500"
                style={{
                  width: `${item.percent}%`,
                }}
              />
            </div>

            <p className="mt-2 text-[11px] text-slate-500">
              {item.count} من أصل 41 اجتماعاً.
            </p>

          </div>
        ))}
      </div>

      <p className="mt-6 text-[11px] leading-6 text-slate-500">
        يُعرّف انعكاس الاتجاه هنا باختلاف إشارة
        التغير السعري بعد دقيقة أو خمس دقائق
        عن إشارة التغير بعد 60 دقيقة، مقارنة
        بالسعر المرجعي السابق للإعلان.
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
          تطور حجم حركة الذهب بعد إعلان الفيدرالي
        </h3>

        <p className="mt-2 text-[12px] leading-7 text-slate-500">
          المتوسط والوسيط للتغير المئوي المطلق
          مقارنة بسعر الذهب قبل الإعلان،
          استناداً إلى 41 اجتماعاً.
        </p>
      </figcaption>

      <div className="my-6 flex flex-wrap gap-5 text-[12px] font-bold text-slate-600">

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#176ac8]" />
          المتوسط الحسابي
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#38bdf8]" />
          الوسيط
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
                    className="h-full rounded-full bg-gradient-to-l from-[#145bb3] to-[#176ac8]"
                    style={{
                      width: `${(item.mean / max) * 100}%`,
                    }}
                  />
                </div>

                <span
                  dir="ltr"
                  className="w-[66px] shrink-0 text-left text-[12px] font-black text-[#176ac8] sm:text-[14px]"
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
                  className="w-[66px] shrink-0 text-left text-[12px] font-black text-sky-700 sm:text-[14px]"
                >
                  {item.median.toFixed(3)}%
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

      <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] leading-6 text-slate-500">
        حسابات بروكر العرب استناداً إلى السعر المرجعي
        والتغيرات السعرية المنشورة لدى XAU Meter.
        تمثل القيم مقدار التغير المطلق وليس اتجاه الحركة
        أو العائد الاستثماري الفعلي.
      </p>

    </figure>
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
            تعرّف على أبرز شركات تداول الذهب
          </h2>

          <p className="mt-2 max-w-[850px] text-[12px] leading-7 text-slate-200 sm:text-[14px] sm:leading-8">
            بعد استعراض تاريخ تقلبات الذهب، يمكنك
            التعرف على مجموعة من شركات التداول المنشورة
            لدى بروكر العرب، ومراجعة تقييماتها وشروط
            حساباتها قبل اختيار الوسيط المناسب.
          </p>
        </div>
      </div>

      {/* Broker cards */}

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
            مقارنة أفضل 10 شركات لتداول الذهب
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
   MAIN ARTICLE PAGE
========================================================= */

export default async function GoldFedDecisionsArticlePage() {

  const featuredGoldBrokers = FEATURED_BROKERS_READY
    ? await getArticleGoldBrokers()
    : [];

  return (

    <ArticleLayout

      language="ar"

      slug={SLUG}

      title={ARTICLE.titleMain}

      titleHighlight={ARTICLE.titleHighlight}

      description={ARTICLE.description}

      category={ARTICLE.category}

      categoryHref="/articles/category/financial-markets-economy"

      subcategory={ARTICLE.subcategory}

      articleType={ARTICLE.articleType}

      breadcrumbTitle={ARTICLE.breadcrumb}

      author="فريق تحليلات بروكر العرب"

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
            تُعد اجتماعات الاحتياطي الفيدرالي الأمريكي
            من أبرز الأحداث الاقتصادية التي يراقبها
            متداولو الذهب في الأسواق العالمية، إذ تؤثر
            قرارات أسعار الفائدة والتوقعات المستقبلية
            للسياسة النقدية في حركة الدولار الأمريكي
            وعوائد السندات والطلب على المعادن الثمينة.
          </Paragraph>

          <Paragraph>
            وعلى الرغم من الاعتقاد الشائع بأن الذهب
            يرتفع عند خفض الفائدة وينخفض عند رفعها،
            فإن العلاقة الفعلية أكثر تعقيداً، وقد
            يتحرك الذهب في اتجاه معاكس لما يتوقعه
            المتداولون بعد صدور القرار.
          </Paragraph>

          <Paragraph>
            في هذا التقرير من{" "}
            <Strong>بروكر العرب</Strong>{" "}
            نستعرض نتائج دراسات تاريخية منشورة حول
            حركة الذهب بعد قرارات الفيدرالي، ونقارن
            بين التقلبات اللحظية والأداء خلال الجلسات
            التالية، مع توضيح العوامل الاقتصادية
            المؤثرة في اتجاه الأسعار.
          </Paragraph>

        </>

      }

    >

            {/* SUMMARY */}

<ArticleSection
  id="summary"
  eyebrow="نتائج البحث بالأرقام"
  title="أهم نتائج تحليل حركة الذهب بعد 41 قراراً للفيدرالي"
>

  <Paragraph>
    قام فريق تحليلات بروكر العرب بإعادة تحليل
    البيانات المنشورة لحركة أسعار الذهب بعد
    41 اجتماعاً للفيدرالي الأمريكي، خلال الفترة
    الممتدة من 3 نوفمبر 2021 إلى 28 أكتوبر 2026،
    وتصنيف الاجتماعات وفق قرارات رفع وخفض
    وتثبيت أسعار الفائدة.
  </Paragraph>

  <ResearchStatistics />

  <ArticleList
    items={[
      <>
        ارتفع الذهب بعد ساعة من الإعلان في{" "}
        <Strong>20 اجتماعاً من أصل 41</Strong>،
        مقابل انخفاضه في 21 اجتماعاً.
      </>,

      <>
        بلغ متوسط مقدار التغير السعري المطلق بعد
        ساعة واحدة نحو{" "}
        <Strong>19.21 دولاراً للأونصة</Strong>،
        بينما بلغ الوسيط 9.72 دولارات.
      </>,

      <>
        ارتفع الذهب بعد{" "}
        <Strong>66.67% من قرارات رفع الفائدة</Strong>{" "}
        المشمولة في العينة.
      </>,

      <>
        ارتفع الذهب بعد{" "}
        <Strong>33.33% من قرارات خفض الفائدة</Strong>{" "}
        المشمولة في الدراسة.
      </>,

      <>
        اختلف اتجاه الحركة بعد دقيقة عن اتجاه
        الحركة بعد ساعة في{" "}
        <Strong>36.59% من الاجتماعات</Strong>.
      </>,

      <>
        أظهرت دراسة خارجية منفصلة شملت 95 قراراً
        أن اتجاه الذهب خلال الجلسات التالية
        لا يتبع نمطاً صعودياً أو هبوطياً ثابتاً.
      </>,
    ]}
  />

  <Note title="أبرز استنتاجات البحث">

    تشير النتائج إلى أن اتجاه الذهب بعد إعلان
    الفيدرالي لا يمكن تحديده اعتماداً على نوع
    قرار الفائدة وحده.

    فقد ارتفع الذهب بعد عدد من قرارات الرفع،
    وانخفض بعد عدد من قرارات الخفض، ما يبرز
    أهمية توقعات الأسواق والعوائد الحقيقية
    والتوجيهات المستقبلية للسياسة النقدية.

  </Note>

  <Paragraph>
    يجب تفسير هذه النتائج ضمن حدود العينة
    التاريخية المدروسة، خصوصاً أن عدد قرارات
    الخفض بلغ ستة قرارات فقط. ولا تعني النسب
    المسجلة وجود احتمالات ثابتة يمكن تطبيقها
    على الاجتماعات المستقبلية.
  </Paragraph>

</ArticleSection>

            {/* FED IMPACT */}

            <ArticleSection
              id="fed-impact"
              eyebrow="السياسة النقدية"
              title="كيف تؤثر قرارات الفيدرالي الأمريكي على أسعار الذهب؟"
            >

              <Paragraph>
                لا يدفع الذهب فائدة دورية لحامليه،
                ولذلك تتأثر جاذبيته الاستثمارية بالعوائد
                التي يستطيع المستثمر الحصول عليها من
                الأصول البديلة، مثل سندات الخزانة الأمريكية.
              </Paragraph>

              <Paragraph>
                عندما ترتفع العوائد الحقيقية، قد ترتفع
                تكلفة الفرصة البديلة للاحتفاظ بالذهب.
                وعندما تنخفض تلك العوائد، قد يتحسن
                الطلب على المعدن الأصفر.
              </Paragraph>

              <SubHeading>
                العلاقة النظرية بين الفائدة والذهب
              </SubHeading>

              <ArticleDataTable
                headers={[
                  "قرار الفيدرالي",
                  "التأثير المحتمل على الدولار",
                  "التأثير المحتمل على الذهب",
                ]}
                rows={[
                  ["رفع الفائدة", "ارتفاع", "انخفاض"],
                  ["خفض الفائدة", "انخفاض", "ارتفاع"],
                  ["تثبيت الفائدة", "يعتمد على التوقعات", "غير محدد"],
                ]}
                caption="يوضح الجدول العلاقة الاقتصادية النظرية، وليس قاعدة تداول ثابتة أو نتائج إحصائية."
              />

              <Paragraph>
                تعتمد استجابة السوق أيضاً على الفرق بين
                القرار الفعلي وما كان المستثمرون يتوقعونه
                قبل الإعلان.
              </Paragraph>

            </ArticleSection>

            {/* FIRST MINUTES */}

            <ArticleSection
              id="first-minutes"
              eyebrow="الحركة اللحظية"
              title="كيف يتحرك الذهب خلال الدقائق الأولى بعد قرار الفائدة؟"
            >

              <Paragraph>
                قد تشهد أسعار الذهب تحركات سريعة فور
                صدور بيان الفيدرالي نتيجة إعادة تسعير
                توقعات الفائدة وتفاعل أوامر التداول
                الآلية مع المعلومات الجديدة.
              </Paragraph>

              <IntradayMovementChart />

              <Paragraph>
                توضح بيانات الدراسة الخارجية المعروضة
                مقدار التغير السعري عند فواصل زمنية
                مختلفة بعد الإعلان.
              </Paragraph>

              <Note title="كيفية قراءة الرسم البياني">
                التغير المطلق يقيس حجم الحركة بصرف
                النظر عن اتجاهها. لذلك لا تعني زيادة
                مقدار الحركة ارتفاع الذهب، كما لا تمثل
                هذه الأرقام أرباحاً قابلة للتحقيق.
              </Note>

            </ArticleSection>

            {/* FIRST HOUR */}

            <ArticleSection
              id="first-hour"
              eyebrow="تقلبات الأسعار"
              title="حركة الذهب خلال الساعة الأولى من اجتماع الفيدرالي"
            >

              <Paragraph>
                لا تتوقف استجابة الأسواق عند الإعلان
                الأول عن أسعار الفائدة، بل تستمر عملية
                استيعاب المعلومات الواردة في البيان
                والتوقعات الاقتصادية والمؤتمر الصحفي
                المصاحب للاجتماع عند انعقاده.
              </Paragraph>

              <Paragraph>
                لهذا السبب قد تختلف الحركة المسجلة
                بعد ساعة من القرار عن الحركة المسجلة
                خلال الدقيقة الأولى.
              </Paragraph>

              <HistoricalReactionChart />

              <Note
                title="مخاطر التقلبات اللحظية"
                tone="amber"
              >
                قد يتزامن ارتفاع سرعة تحرك الأسعار مع
                اتساع السبريد والانزلاق السعري، مما يجعل
                نتائج التداول الفعلية مختلفة عن التغير
                الظاهر في الرسم البياني.
              </Note>

            </ArticleSection>

            {/* HISTORICAL REACTIONS */}

            <ArticleSection
              id="historical-reactions"
              eyebrow="بيانات تاريخية"
              title="جدول حركة الذهب بعد قرارات الفيدرالي خلال عام 2026"
            >

              <Paragraph>
                يعرض الجدول التالي بيانات الاجتماعات
                المختارة من الدراسة الخارجية، مع قياس
                التغير بالدولار لكل أونصة بعد ساعة من
                صدور الإعلان.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "تاريخ القرار",
                  "التغير بعد 60 دقيقة",
                  "اتجاه الحركة",
                ]}
                rows={historicalReactions.map((item) => [
                  item.date,
                  `${item.move >= 0 ? "+" : "−"}$${Math.abs(
                    item.move
                  ).toFixed(2)}`,
                  item.move >= 0 ? "ارتفاع" : "انخفاض",
                ])}
                caption="المصدر: XAU Meter. البيانات من دراسة خارجية وليست قياسات مستقلة لبروكر العرب."
              />

              <Paragraph>
                تختلف استجابة الذهب من اجتماع إلى آخر،
                لذلك لا يمكن اعتبار متوسط حركة مجموعة
                من الاجتماعات توقعاً دقيقاً لحركة السعر
                في الاجتماع المقبل.
              </Paragraph>

            </ArticleSection>

{/* PERCENTAGE REACTIONS */}

<ArticleSection
  id="percentage-reactions"
  eyebrow="التحليل الإحصائي النسبي"
  title="حركة الذهب بعد قرارات الفيدرالي بالنسبة المئوية"
>

  <Paragraph>
    لا تكفي مقارنة حركة الذهب بالدولار وحده عند
    دراسة اجتماعات تمتد عبر عدة سنوات، لأن السعر
    المرجعي للأونصة يتغير بصورة كبيرة بمرور الوقت.
    فالحركة البالغة 20 دولاراً عندما يتداول الذهب
    عند 2,000 دولار تختلف في أهميتها النسبية عن
    الحركة نفسها عندما يتداول عند 4,000 دولار.
  </Paragraph>

  <Paragraph>
    لذلك أعاد فريق تحليلات بروكر العرب حساب
    التغيرات السعرية بالنسبة المئوية لكل اجتماع
    من الاجتماعات الـ41، باستخدام السعر المرجعي
    السابق للإعلان، بهدف توفير مقارنة أكثر اتساقاً
    بين الفترات التاريخية المختلفة.
  </Paragraph>

  <PercentageReactionChart />

  <ArticleDataTable
    headers={[
      "الفترة بعد الإعلان",
      "متوسط التغير المطلق",
      "وسيط التغير المطلق",
    ]}
    rows={percentageReactions.map((item) => [
      item.period,
      `${item.mean.toFixed(3)}%`,
      `${item.median.toFixed(3)}%`,
    ])}
    caption="حسابات بروكر العرب لعينة مكونة من 41 اجتماعاً بين نوفمبر 2021 وأكتوبر 2026."
  />

  <Paragraph>
    بلغ متوسط مقدار الحركة المئوية المطلقة بعد
    دقيقة واحدة نحو 0.239%، وارتفع إلى 0.647%
    بعد ساعة من الإعلان، مقابل وسيط بلغ 0.531%
    عند نهاية الساعة الأولى.
  </Paragraph>

  <Paragraph>
    يعكس الفرق بين المتوسط والوسيط تأثير
    بعض التحركات الاستثنائية الكبيرة في العينة.
    لذلك قد يكون الوسيط أكثر ملاءمة لوصف
    الحركة النموذجية، بينما يساعد المتوسط
    على فهم الحجم الإجمالي للتحركات المسجلة.
  </Paragraph>

  <SubHeading>
    مقارنة الحركة المئوية حسب نوع قرار الفائدة
  </SubHeading>

  <ArticleDataTable
    headers={[
      "نوع القرار",
      "عدد الاجتماعات",
      "متوسط الحركة المطلقة",
      "وسيط الحركة المطلقة",
    ]}
    rows={percentageDecisionStats.map((item) => [
      item.label,
      item.sample,
      `${item.mean.toFixed(3)}%`,
      `${item.median.toFixed(3)}%`,
    ])}
    caption="جميع النتائج تقيس الحركة المئوية المطلقة بعد 60 دقيقة من صدور الإعلان."
  />

  <Paragraph>
    أظهرت المقارنة النسبية أن قرارات رفع الفائدة
    سجلت أعلى متوسط للحركة المطلقة بعد ساعة،
    بنحو 0.738%، مقارنة بنحو 0.626% عند خفض
    الفائدة و0.605% عند تثبيتها.
  </Paragraph>

  <Paragraph>
    تختلف هذه النتيجة عن ترتيب متوسطات الحركة
    بالدولار، حيث سجلت قرارات الخفض أعلى متوسط
    مطلق بالدولار ضمن العينة. ويبرز هذا الاختلاف
    أهمية استخدام النسب المئوية عند مقارنة
    تحركات أصل مالي عبر سنوات مختلفة.
  </Paragraph>

  <Note title="حدود المقارنة الإحصائية">
    لا تعني هذه النتائج أن رفع الفائدة يسبب
    تقلبات أكبر بالضرورة. فعدد الاجتماعات
    يختلف بين الفئات، كما تختلف الظروف
    الاقتصادية وتوقعات الأسواق ومستويات
    الأسعار بين كل اجتماع وآخر.
  </Note>

  <SubHeading>
    أكبر التحركات النسبية والمطلقة للذهب
  </SubHeading>

  <ArticleDataTable
    headers={[
      "تاريخ القرار",
      "نوع الحركة",
      "السعر المرجعي",
      "التغير بالدولار",
      "التغير المئوي",
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
    caption="أكبر التغيرات المسجلة عند نقطة القياس بعد 60 دقيقة، وليس أعلى وأدنى سعر خلال الساعة."
  />

  <Paragraph>
    سجل اجتماع 13 ديسمبر 2023 أكبر ارتفاع
    مئوي بعد ساعة ضمن العينة، بنسبة بلغت
    نحو 1.593%، رغم أن مقدار الارتفاع بالدولار
    لم يتجاوز 31.57 دولاراً للأونصة.
  </Paragraph>

  <Paragraph>
    في المقابل، سجل اجتماع 29 يوليو 2026
    أكبر ارتفاع بالدولار، بمقدار 62.32 دولاراً،
    لكنه جاء عند مستوى سعري أعلى، ولذلك
    بلغت نسبة ارتفاعه نحو 1.541%.
  </Paragraph>

  <Paragraph>
    أما أكبر انخفاض بعد ساعة، سواء بالدولار
    أو بالنسبة المئوية، فسُجل في 16 سبتمبر
    2026، عندما تراجع الذهب بنحو 99.40 دولاراً
    للأونصة، أي ما يعادل 2.280% تقريباً
    من السعر المرجعي السابق للإعلان.
  </Paragraph>

  <Note title="الاستنتاج البحثي لبروكر العرب">
    يساعد الجمع بين القياس بالدولار والقياس
    بالنسبة المئوية على تكوين صورة أكثر دقة
    عن حجم حركة الذهب، خصوصاً عند مقارنة
    الاجتماعات التي انعقدت في مستويات
    سعرية وظروف اقتصادية مختلفة.
  </Note>

</ArticleSection>

            {/* LONGER TERM */}

            <ArticleSection
              id="longer-term"
              eyebrow="الأداء بعد الإعلان"
              title="كيف يتحرك الذهب خلال الأيام والأسابيع التالية لقرار الفائدة؟"
            >

              <Paragraph>
                تختلف دراسة الأداء خلال الجلسات التالية
                عن قياس رد الفعل اللحظي، إذ تدخل عوامل
                اقتصادية وسياسية إضافية في تحديد حركة
                الذهب بمرور الوقت.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "الفترة",
                  "عدد القرارات",
                  "نسبة الارتفاع",
                  "وسيط التغير",
                ]}
                rows={longerTermReactions.map((item) => [
                  item.period,
                  item.sample,
                  item.positive,
                  item.median,
                ])}
                caption="المصدر: Regimic. يبدأ القياس من افتتاح الجلسة التالية للإعلان."
              />

              <LongerTermChart />

              <Note title="حدود المقارنة">
                لا يجوز دمج نتائج هذه الدراسة مع دراسة
                الحركة اللحظية باعتبارهما عينة واحدة،
                لأن الفترات الزمنية ونقاط بداية القياس
                وعدد الاجتماعات تختلف بين المصدرين.
              </Note>

            </ArticleSection>

            {/* RATE HIKE */}

<ArticleSection
  id="rate-hike"
  eyebrow="النتائج الإحصائية"
  title="ماذا يحدث للذهب عند رفع الفائدة؟ نتائج 12 قراراً تاريخياً"
>

  <Paragraph>
    من الناحية الاقتصادية، يؤدي ارتفاع أسعار
    الفائدة في كثير من الظروف إلى زيادة تكلفة
    الفرصة البديلة للاحتفاظ بالذهب، خصوصاً
    عندما يترافق مع ارتفاع العوائد الحقيقية
    وقوة الدولار الأمريكي.
  </Paragraph>

  <Paragraph>
    لكن نتائج العينة التاريخية التي حللناها
    تكشف أن هذه العلاقة ليست قاعدة ثابتة
    على المدى القصير.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "المؤشر",
      "النتيجة",
    ]}
    rows={[
      ["عدد قرارات الرفع", 12],
      ["حالات ارتفاع الذهب", 8],
      ["حالات انخفاض الذهب", 4],
      ["نسبة الارتفاع", "66.67%"],
      ["متوسط الحركة المطلقة", "$18.39"],
      ["وسيط الحركة المطلقة", "$11.41"],
    ]}
    caption="حسابات بروكر العرب باستخدام التغير السعري بعد 60 دقيقة من الإعلان."
  />

  <SubHeading>
    لماذا قد يرتفع الذهب رغم رفع الفائدة؟
  </SubHeading>

  <Paragraph>
    قد تكون الأسواق قد استوعبت قرار رفع الفائدة
    قبل الإعلان، ولذلك يصبح العامل الأكثر أهمية
    هو مقدار الاختلاف بين القرار الفعلي وتوقعات
    المستثمرين.
  </Paragraph>

  <Paragraph>
    وإذا رافق الرفع إشارات إلى تباطؤ التشديد
    النقدي أو اقتراب نهاية دورة رفع الفائدة،
    فقد تتراجع عوائد السندات أو يضعف الدولار،
    مما قد يدعم أسعار الذهب.
  </Paragraph>

  <Note title="قراءة النتائج">
    لا تعني نسبة 66.67% أن شراء الذهب عند
    رفع الفائدة يمثل استراتيجية مربحة.
    فالنتيجة مستمدة من 12 اجتماعاً فقط
    ولا تشمل تكاليف التداول والتنفيذ.
  </Note>

</ArticleSection>

{/* RATE CUT */}

<ArticleSection
  id="rate-cut"
  eyebrow="النتائج الإحصائية"
  title="هل يرتفع الذهب عند خفض الفائدة؟ نتائج 6 قرارات تاريخية"
>

  <Paragraph>
    يُنظر عادة إلى خفض الفائدة باعتباره عاملاً
    داعماً للذهب، نتيجة انخفاض العائد المحتمل
    على الأصول التي تدر دخلاً دورياً.
  </Paragraph>

  <Paragraph>
    إلا أن الاستجابة اللحظية في العينة المدروسة
    لم تتوافق دائماً مع هذا التصور، فقد انخفض
    الذهب بعد أربعة من قرارات الخفض الستة
    خلال الساعة التالية للإعلان.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "المؤشر",
      "النتيجة",
    ]}
    rows={[
      ["عدد قرارات الخفض", 6],
      ["حالات ارتفاع الذهب", 2],
      ["حالات انخفاض الذهب", 4],
      ["نسبة الارتفاع", "33.33%"],
      ["متوسط الحركة المطلقة", "$21.01"],
      ["وسيط الحركة المطلقة", "$23.72"],
    ]}
    caption="حسابات بروكر العرب استناداً إلى بيانات العينة التاريخية."
  />

  <SubHeading>
    لماذا قد ينخفض الذهب بعد خفض الفائدة؟
  </SubHeading>

  <Paragraph>
    إذا كان الخفض أقل مما تتوقعه الأسواق،
    أو ترافق مع إشارات إلى محدودية التخفيضات
    المستقبلية، فقد يُنظر إلى القرار على أنه
    أكثر تشدداً من التوقعات السابقة.
  </Paragraph>

  <Paragraph>
    لذلك لا يكفي تحديد ما إذا كان القرار
    رفعاً أو خفضاً، وإنما يجب فهم موقع القرار
    ضمن المسار المتوقع للسياسة النقدية.
  </Paragraph>

  <Note
    title="حدود العينة الإحصائية"
    tone="amber"
  >
    تشمل هذه الفئة ستة قرارات فقط، وهو عدد
    محدود لا يسمح بتعميم النتائج على جميع
    دورات خفض الفائدة التاريخية.
  </Note>

</ArticleSection>

{/* RATE HOLD */}

<ArticleSection
  id="rate-hold"
  eyebrow="النتائج الإحصائية"
  title="حركة الذهب عند تثبيت الفائدة: تحليل 23 اجتماعاً"
>

  <Paragraph>
    قد يعتقد بعض المتداولين أن تثبيت أسعار
    الفائدة يعني انخفاض أهمية اجتماع الفيدرالي،
    لكن الأسواق لا تتفاعل مع المستوى الحالي
    للفائدة فقط، بل مع التوقعات والتصريحات
    المتعلقة بمسارها المستقبلي.
  </Paragraph>

  <ArticleDataTable
    headers={[
      "المؤشر",
      "النتيجة",
    ]}
    rows={[
      ["عدد قرارات التثبيت", 23],
      ["حالات ارتفاع الذهب", 10],
      ["حالات انخفاض الذهب", 13],
      ["نسبة الارتفاع", "43.48%"],
      ["متوسط الحركة المطلقة", "$19.17"],
      ["وسيط الحركة المطلقة", "$9.52"],
    ]}
    caption="التغير السعري بعد ساعة من الإعلان. المصدر: حسابات بروكر العرب."
  />

  <SubHeading>
    مقارنة شاملة بين رفع وخفض وتثبيت الفائدة
  </SubHeading>

  <DecisionImpactChart />

  <ArticleDataTable
    headers={[
      "نوع القرار",
      "عدد القرارات",
      "نسبة الارتفاع",
      "متوسط الحركة المطلقة",
      "وسيط الحركة المطلقة",
    ]}
    rows={decisionStats.map((item) => [
      item.label,
      item.total,
      `${item.upPercent}%`,
      `$${item.averageMove.toFixed(2)}`,
      `$${item.medianMove.toFixed(2)}`,
    ])}
    caption="تحليل بروكر العرب لبيانات 41 اجتماعاً للفيدرالي الأمريكي."
  />

  <Paragraph>
    تشير المقارنة إلى أن متوسط الحركة المطلقة
    بعد ساعة كان متقارباً نسبياً بين فئات
    القرارات الثلاث، وتراوح بين 18.39 و21.01
    دولاراً للأونصة.
  </Paragraph>

  <Paragraph>
    ومع ذلك، فإن اختلاف مستويات أسعار الذهب
    بين سنوات الدراسة، وتفاوت أحجام العينات،
    يمنع اعتبار هذه الأرقام دليلاً على أن
    أحد أنواع القرارات يسبب تقلبات أعلى دائماً.
  </Paragraph>

  <SubHeading>
    هل يستمر اتجاه الذهب الأول بعد الإعلان؟
  </SubHeading>

  <ReversalStatistics />

  <Paragraph>
    سجلت الدراسة 15 حالة اختلف فيها اتجاه
    الذهب بعد الدقيقة الأولى عن اتجاهه بعد
    ساعة، مقابل 13 حالة عند مقارنة اتجاه
    الحركة بعد خمس دقائق باتجاهها بعد ساعة.
  </Paragraph>

  <Note title="أهمية هذه النتيجة للمتداول">

    توضح هذه الإحصائيات أن الحركة الأولية
    ليست مؤشراً مضموناً على اتجاه الذهب
    خلال بقية الساعة التالية للقرار.

    كما أن الدراسة تقيس اختلاف الاتجاه بين
    نقطتين زمنيتين، ولا تقيس جميع الانعكاسات
    التي قد تحدث بينهما.

  </Note>

</ArticleSection>

            {/* BROKER INSERT */}

{FEATURED_BROKERS_READY && (
  <FeaturedGoldBrokers
    brokers={featuredGoldBrokers}
  />
)}

            {/* PRESS CONFERENCE */}

            <ArticleSection
              id="press-conference"
              eyebrow="التوجيهات المستقبلية"
              title="تأثير المؤتمر الصحفي لرئيس الفيدرالي على الذهب"
            >

              <Paragraph>
                يساعد المؤتمر الصحفي المستثمرين على
                فهم كيفية تفسير صناع السياسة النقدية
                للبيانات الاقتصادية، والشروط التي قد
                تدفعهم إلى تغيير أسعار الفائدة مستقبلاً.
              </Paragraph>

              <Paragraph>
                وقد يؤدي اختلاف تفسير تصريحات رئيس
                الفيدرالي عن التوقعات الأولية إلى
                تغير اتجاه الدولار وعوائد السندات،
                ومن ثم انعكاس الحركة الأولية للذهب.
              </Paragraph>

              <SubHeading>
                ما المعلومات التي تراقبها الأسواق؟
              </SubHeading>

              <ArticleList
                items={[
                  "تقييم الفيدرالي لمستويات التضخم.",

                  "توقعات النمو الاقتصادي وسوق العمل.",

                  "الإشارات المتعلقة باجتماعات الفائدة المقبلة.",

                  "مدى استعداد الفيدرالي لتشديد السياسة النقدية أو تخفيفها.",

                  "درجة اليقين أو عدم اليقين في التوقعات الاقتصادية.",
                ]}
              />

            </ArticleSection>

            {/* DOLLAR AND YIELDS */}

            <ArticleSection
              id="dollar-yields"
              eyebrow="العوامل الاقتصادية"
              title="العلاقة بين الذهب والدولار وعوائد السندات الأمريكية"
            >

              <Paragraph>
                يتأثر الذهب بمجموعة مترابطة من المتغيرات
                الاقتصادية، من أهمها قوة الدولار
                الأمريكي والعوائد الحقيقية للسندات
                وتوقعات التضخم.
              </Paragraph>

              <ArticleDataTable
                headers={[
                  "المتغير الاقتصادي",
                  "التغير",
                  "الأثر المحتمل على الذهب",
                ]}
                rows={[
                  ["الدولار الأمريكي", "ارتفاع", "ضغط هبوطي"],
                  ["الدولار الأمريكي", "انخفاض", "دعم صعودي"],
                  ["العوائد الحقيقية", "ارتفاع", "ضغط هبوطي"],
                  ["العوائد الحقيقية", "انخفاض", "دعم صعودي"],
                  ["المخاطر الاقتصادية", "ارتفاع", "قد يدعم الطلب"],
                ]}
                caption="علاقات اقتصادية محتملة مع افتراض ثبات العوامل الأخرى، وليست نتائج مضمونة."
              />

              <Paragraph>
                ويمكن الاطلاع على دراسة{" "}
                <Link
                  href="/articles/gold-price-crashes-history"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  أكبر انهيارات الذهب في التاريخ
                </Link>{" "}
                لفهم دور السياسة النقدية والدولار
                والتضخم خلال دورات الهبوط التاريخية.
              </Paragraph>

            </ArticleSection>

            {/* TRADING RISKS */}

            <ArticleSection
              id="trading-risks"
              eyebrow="إدارة المخاطر"
              title="مخاطر تداول الذهب أثناء صدور قرار الفيدرالي"
            >

              <Paragraph>
                تختلف ظروف تنفيذ الصفقات خلال الأخبار
                الاقتصادية المهمة عن ظروف التداول
                المعتادة، خصوصاً عند ارتفاع التقلبات
                وتراجع السيولة المتاحة عند بعض المستويات.
              </Paragraph>

              <ArticleList
                items={[
                  "اتساع الفارق بين سعري البيع والشراء.",

                  "احتمالية حدوث انزلاق سعري أثناء التنفيذ.",

                  "تنفيذ أوامر وقف الخسارة بسعر مختلف عن السعر المحدد.",

                  "زيادة تأثير الرافعة المالية على حجم الخسائر.",

                  "احتمالية انعكاس الاتجاه بعد صدور معلومات جديدة.",
                ]}
              />

              <Paragraph>
                ويمكن استخدام{" "}
                <Link
                  href="/tools/risk-calculator"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  حاسبة المخاطر
                </Link>{" "}
                و{" "}
                <Link
                  href="/tools/margin-calculator"
                  className="font-bold text-[#176ac8] hover:underline"
                >
                  حاسبة الهامش
                </Link>{" "}
                المتوفرتين لدى بروكر العرب لفهم حجم
                التعرض المالي قبل تنفيذ الصفقات.
              </Paragraph>

              <Note
                title="تنبيه مهم للمتداولين"
                tone="amber"
              >
                لا تضمن أوامر وقف الخسارة التنفيذ
                بالسعر المحدد خلال ظروف السوق المتقلبة.
                وقد تؤدي الرافعة المالية المرتفعة إلى
                خسائر سريعة وكبيرة.
              </Note>

            </ArticleSection>

            {/* FAQ */}

            <ArticleSection
              id="faq"
              eyebrow="أسئلة المتداولين"
              title="الأسئلة الشائعة حول تأثير الفيدرالي على الذهب"
            >

              <div className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4 sm:p-6">

                <FAQItem question="هل ينخفض الذهب عند رفع الفائدة الأمريكية؟">
                  قد يتعرض الذهب لضغوط هبوطية عند
                  ارتفاع الفائدة والعوائد الحقيقية،
                  لكن اتجاهه يعتمد أيضاً على توقعات
                  الأسواق وحركة الدولار.
                </FAQItem>

                <FAQItem question="هل يرتفع الذهب دائماً عند خفض الفائدة؟">
                  لا. قد يرتفع أو ينخفض وفقاً لمقدار
                  الخفض مقارنة بالتوقعات، إضافة إلى
                  التوجيهات المستقبلية للفيدرالي.
                </FAQItem>

                <FAQItem question="لماذا يتحرك الذهب عند تثبيت الفائدة؟">
                  لأن الأسواق تتفاعل مع المعلومات
                  الجديدة المتعلقة بالتضخم والنمو
                  والمسار المتوقع لأسعار الفائدة.
                </FAQItem>

                <FAQItem question="هل يمكن توقع اتجاه الذهب قبل اجتماع الفيدرالي؟">
                  يمكن تحليل السيناريوهات المحتملة،
                  لكن لا يمكن ضمان اتجاه السعر،
                  خصوصاً عند صدور قرارات أو تصريحات
                  تختلف عن توقعات المستثمرين.
                </FAQItem>

                <FAQItem question="هل تداول الذهب وقت قرار الفائدة أكثر خطورة؟">
                  قد ترتفع المخاطر نتيجة التقلبات
                  السريعة واتساع السبريد والانزلاق
                  السعري وتأثير الرافعة المالية.
                </FAQItem>

                <FAQItem question="ما أهمية العوائد الحقيقية بالنسبة للذهب؟">
                  تؤثر العوائد الحقيقية في تكلفة
                  الفرصة البديلة للاحتفاظ بالذهب،
                  الذي لا يدفع فائدة دورية.
                </FAQItem>

              </div>

            </ArticleSection>

            {/* CONCLUSION */}

            <ArticleSection
              id="conclusion"
              eyebrow="خلاصة التقرير"
              title="هل يمكن الاعتماد على قرارات الفيدرالي لتوقع أسعار الذهب؟"
            >

              <Paragraph>
                تمثل السياسة النقدية الأمريكية أحد
                العوامل الأساسية المؤثرة في سوق الذهب،
                لكن اختزال العلاقة في قاعدة ثابتة
                تربط رفع الفائدة بالهبوط وخفضها بالصعود
                لا يعكس جميع الظروف التي تتحرك فيها الأسواق.
              </Paragraph>

              <Paragraph>
                يتطلب فهم رد فعل الذهب دراسة توقعات
                المستثمرين قبل القرار، والتغير في
                العوائد الحقيقية، وحركة الدولار،
                والمعلومات الجديدة الواردة في بيان
                الفيدرالي والمؤتمر الصحفي.
              </Paragraph>

              <Paragraph>
                كما ينبغي التمييز بين اتجاه الحركة
                ومقدار التقلب، وبين الأداء اللحظي
                والأداء خلال الأيام والأسابيع التالية.
              </Paragraph>

            </ArticleSection>

            {/* METHODOLOGY AND SOURCES */}

<ArticleSection
  id="methodology"
  eyebrow="الشفافية البحثية"
  title="منهجية تحليل حركة الذهب بعد قرارات الفيدرالي والمصادر"
>

  <Paragraph>
    يعتمد هذا التقرير على إعادة تحليل بيانات
    تاريخية منشورة لحركة أسعار الذهب، ومطابقتها
    مع السجل الرسمي لقرارات الاحتياطي الفيدرالي
    الأمريكي.
  </Paragraph>

  <SubHeading>
    نطاق العينة التاريخية
  </SubHeading>

  <ArticleDataTable
    headers={[
      "المعيار",
      "التفاصيل",
    ]}
    rows={[
      ["عدد الاجتماعات", 41],
      ["بداية الفترة", "3 نوفمبر 2021"],
      ["نهاية الفترة", "28 أكتوبر 2026"],
      ["قرارات رفع الفائدة", 12],
      ["قرارات خفض الفائدة", 6],
      ["قرارات تثبيت الفائدة", 23],
      ["الأصل المالي", "XAU/USD"],
      ["وحدة القياس", "الدولار لكل أونصة"],
      ["مصدر بيانات الأسعار", "XAU Meter"],
      ["مصدر تصنيف القرارات", "Federal Reserve"],
      ["تاريخ مراجعة البيانات", "23 نوفمبر 2026"],
    ]}
  />

 <SubHeading>
  طريقة قياس حركة الأسعار
</SubHeading>

<Paragraph>
  تستخدم بيانات الحركة اللحظية سعر إغلاق الدقيقة
  الأخيرة السابقة للإعلان كنقطة مرجعية، وتقيس
  الفرق بينه وبين السعر بعد دقيقة وخمس دقائق
  و15 دقيقة و60 دقيقة.
  وتستند الأسعار إلى بيانات الدقيقة لسعر الطلب
  من جهة البيع (Bid) لدى مزود الأسعار المستخدم
  في المصدر الأصلي.
</Paragraph>

<div className="!my-7 grid grid-cols-1 gap-4 lg:grid-cols-3">

  {/* SIGNED PRICE CHANGE */}

  <div className="rounded-[16px] border border-blue-100 bg-[#f1f7fe] p-5 text-center">

    <p className="text-[13px] font-black text-[#176ac8]">
      معادلة التغير السعري
    </p>

    <p
      dir="ltr"
      className="my-5 text-[22px] font-black text-[#102747] sm:text-[25px]"
    >
      ΔP = P(t) − P(0)
    </p>

    <p className="text-[12px] leading-7 text-slate-600">
      تقيس مقدار ارتفاع أو انخفاض سعر الذهب
      بالدولار لكل أونصة بعد الإعلان.
    </p>

  </div>

  {/* ABSOLUTE PRICE CHANGE */}

  <div className="rounded-[16px] border border-blue-100 bg-[#f1f7fe] p-5 text-center">

    <p className="text-[13px] font-black text-[#176ac8]">
      معادلة الحركة المطلقة
    </p>

    <p
      dir="ltr"
      className="my-5 text-[22px] font-black text-[#102747] sm:text-[25px]"
    >
      |ΔP| = |P(t) − P(0)|
    </p>

    <p className="text-[12px] leading-7 text-slate-600">
      تقيس مقدار الحركة السعرية دون النظر
      إلى اتجاه الارتفاع أو الانخفاض.
    </p>

  </div>

  {/* PERCENTAGE PRICE CHANGE */}

  <div className="rounded-[16px] border border-blue-100 bg-[#f1f7fe] p-5 text-center">

    <p className="text-[13px] font-black text-[#176ac8]">
      معادلة التغير المئوي
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
      تقيس نسبة التغير في سعر الذهب مقارنة
      بمستواه المرجعي السابق للإعلان.
    </p>

  </div>

</div>

<SubHeading>
  تعريف الرموز المستخدمة
</SubHeading>

<ArticleDataTable
  headers={[
    "الرمز",
    "التعريف",
  ]}
  rows={[
    ["P(0)", "سعر الذهب المرجعي قبل الإعلان"],
    ["P(t)", "سعر الذهب عند الفترة الزمنية المحددة"],
    ["ΔP", "التغير السعري بالدولار"],
    ["|ΔP|", "القيمة المطلقة للتغير السعري"],
    ["R(t)", "نسبة التغير المئوية"],
    ["|R(t)|", "القيمة المطلقة للتغير المئوي"],
  ]}
/>

<Paragraph>
  حُسبت المتوسطات والوسائط المئوية باستخدام
  القيمة المطلقة للتغير المئوي لكل اجتماع
  بصورة مستقلة، وليس بقسمة متوسط التغير
  بالدولار على متوسط أسعار الذهب.
</Paragraph>

<Note title="الفرق بين مقدار الحركة ونطاق التقلب">
  تقيس الحركة المطلقة الفرق بين السعر المرجعي
  والسعر عند نقطة زمنية محددة، بينما يقيس
  نطاق التقلب الفرق بين أعلى وأدنى سعر
  خلال الفترة الزمنية. لذلك لا يجوز استخدام
  المقياسين باعتبارهما مفهوماً إحصائياً واحداً.
</Note>

  <SubHeading>
    المتوسط والوسيط
  </SubHeading>

  <Paragraph>
    حُسب متوسط الحركة المطلقة باستخدام القيم
    المطلقة للتغيرات السعرية بعد ساعة،
    بغض النظر عن اتجاه الارتفاع أو الانخفاض.
  </Paragraph>

  <Paragraph>
    أما الوسيط فيمثل القيمة الوسطى بعد ترتيب
    مقادير التغير السعري، وهو أقل تأثراً
    بالحركات الاستثنائية الكبيرة من المتوسط
    الحسابي.
  </Paragraph>

  <SubHeading>
    تصنيف قرارات الفائدة
  </SubHeading>

  <Paragraph>
    جرى تصنيف الاجتماعات إلى رفع وخفض وتثبيت
    وفق التغير في النطاق المستهدف لأسعار
    الفائدة الفيدرالية، باستخدام السجل الرسمي
    للقرارات، مع التمييز بين تاريخ الإعلان
    وتاريخ بدء سريان السعر الجديد.
  </Paragraph>

  <SubHeading>
    تعريف انعكاس الاتجاه
  </SubHeading>

  <Paragraph>
    اعتُبرت الحركة منعكسة عندما اختلفت
    إشارة التغير السعري بعد دقيقة أو خمس
    دقائق عن إشارة التغير بعد 60 دقيقة،
    مقارنة بالنقطة المرجعية نفسها.
  </Paragraph>

  <SubHeading>
    الأداء خلال الجلسات التالية
  </SubHeading>

  <Paragraph>
    يستعين التقرير كذلك بدراسة منفصلة منشورة
    لدى Regimic، تشمل 95 قراراً للفيدرالي
    منذ عام 2015 لقياس الأداء خلال جلسة واحدة
    وخمس جلسات، و94 قراراً لقياس الأداء
    خلال 20 جلسة.
  </Paragraph>

  <Paragraph>
    تبدأ هذه الدراسة القياس من افتتاح أول
    جلسة بعد الإعلان، وليس من السعر السابق
    للقرار مباشرة، ولذلك لم تُدمج نتائجها
    مع عينة التحليل اللحظي.
  </Paragraph>

  <SubHeading>
    حدود الدراسة الإحصائية
  </SubHeading>

  <ArticleList
    items={[
      "تعتمد بيانات الحركة اللحظية على مصدر أسعار واحد، وقد تختلف الأسعار بين شركات التداول.",

      "أعاد بروكر العرب تحليل البيانات المنشورة، ولم يجمع الأسعار اللحظية الخام بصورة مستقلة.",

      "لا تشمل النتائج تكاليف السبريد والعمولات والانزلاق السعري.",

      "لم تُصنف القرارات وفق مقدار المفاجأة مقارنة بتوقعات السوق.",

      "تختلف مستويات أسعار الذهب بين سنوات الدراسة، مما يؤثر على المقارنة بالدولار.",

      "عدد قرارات الخفض والرفع محدود، ولا يسمح بتعميم النتائج على جميع الدورات الاقتصادية.",

      "لا تثبت العلاقة الإحصائية الوصفية أن قرار الفائدة هو السبب الوحيد للحركة السعرية.",

      "النتائج التاريخية لا تمثل احتمالات مضمونة للحركة المستقبلية.",
    ]}
  />

  <Note title="حقوق التحليل والبيانات">
    أُعدت الحسابات الإحصائية والجداول والتحليلات
    الإضافية بواسطة بروكر العرب، استناداً إلى
    البيانات المنشورة لدى المصادر المشار إليها.
    وتعود حقوق البيانات الأصلية إلى أصحابها.
  </Note>

  <SubHeading>
    المصادر والمراجع
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
                إخلاء المسؤولية
              </h2>

              <p className="mt-2 text-[12px] leading-[2] text-slate-700 sm:text-[14px]">
                هذا المحتوى لأغراض المعلومات والبحث
                والتعليم فقط، ولا يمثل توصية استثمارية
                أو دعوة إلى شراء الذهب أو بيعه.
                لا تضمن النتائج التاريخية تكرار
                الأداء مستقبلاً.
              </p>

            </div>

            {/* ARTICLE FOOTER */}

            <footer className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="text-[13px] font-black text-[#102747]">
                  بروكر العرب | Broker Alarab
                </div>

                <p className="mt-1 text-[11px] leading-6 text-slate-500">
                  أبحاث ودراسات وتحليلات الأسواق المالية.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-blue-200 bg-[#f1f7ff] px-5 py-2 text-[12px] font-black text-[#155da9] transition hover:bg-blue-100"
              >
                العودة إلى الرئيسية
                <span className="mr-2" aria-hidden="true">
                  ←
                </span>
              </Link>

                        </footer>

    </ArticleLayout>

  );

}