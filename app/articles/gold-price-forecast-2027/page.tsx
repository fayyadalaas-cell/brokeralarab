import Link from "next/link";

import ArticleLayout from "@/app/components/editorial/ArticleLayout";

import {
  ArticleSection,
  SubHeading,
  Paragraph,
  Strong,
  ArticleList,
  Note,
  FAQItem,
} from "@/app/components/editorial/ArticleComponents";

import {
  createArticleMetadata,
  ArticleStructuredData,
  type ArticleSEOConfig,
} from "@/app/components/editorial/ArticleSEO";

/* =========================================================
   BROKER ALARAB
   FINANCIAL MARKETS & ECONOMY
   GOLD PRICE FORECAST 2027
========================================================= */

const SLUG = "gold-price-forecast-2027";

const CATEGORY = "مقالات الأسواق والاقتصاد";

const CATEGORY_HREF =
  "/articles/category/financial-markets-economy";

const HERO_IMAGE =
  "/articles/gold-price-forecast-2027.webp";

const ARTICLE = {
  title:
    "توقعات أسعار الذهب 2027: أبرز توقعات البنوك العالمية",

  seoTitle:
    "توقعات أسعار الذهب 2027: أبرز توقعات البنوك العالمية",

  shortTitle:
    "توقعات أسعار الذهب 2027",

  description:
    "تقرير شامل حول توقعات أسعار الذهب لعام 2027 حسب أبرز البنوك العالمية، وتحليل مستقبل الأونصة والعوامل المؤثرة في أسعار الذهب وتوقعات سعر الغرام في الدول العربية.",

  subcategory:
    "الذهب والأسواق المالية",

  author:
    "فريق أبحاث بروكر العرب",

  published:
    "2026-11-27",

  modified:
    "2026-11-27",
};

/* =========================================================
   RESEARCH SOURCES
========================================================= */

const sources = [
  {
    title:
      "Reuters – Gold Market Outlook, November 24, 2026",
    url:
      "https://www.reuters.com/world/india/gold-edges-up-bargain-buying-after-selloff-us-inflation-data-awaited-2026-11-24/",
  },
  {
    title:
      "Reuters – Gold Market Update, November 27, 2026",
    url:
      "https://www.reuters.com/world/india/gold-rebounds-one-year-low-ai-jitters-ease-2026-11-27/",
  },
  {
    title:
      "UBS Gold Outlook – Barron's, November 19, 2026",
    url:
      "https://www.barrons.com/livecoverage/stock-market-news-today-111926/card/gold-outlook-remains-positive-but-patience-is-needed-dyE54Q6CQtIjOlcFrjQb",
  },
  {
    title:
      "Goldman Sachs Forecast – The Wall Street Journal",
    url:
      "https://www.wsj.com/livecoverage/stock-market-today-dow-sp-500-nasdaq-11-12-2026/card/gold-hasn-t-been-this-low-in-more-than-a-year-wmM3WGOpALJHehsIAq4I",
  },
  {
    title:
      "J.P. Morgan Global Research – Gold Price Predictions",
    url:
      "https://www.jpmorgan.com/insights/global-research/commodities/gold-prices",
  },
  {
    title:
      "CIBC Gold Outlook – Kitco News, October 20, 2026",
    url:
      "https://www.kitco.com/news/article/2026-10-20/cibc-slashes-gold-price-forecasts-sees-recovery-5200-2027-central-bank",
  },
  {
    title:
      "World Gold Council – Gold Market Research",
    url:
      "https://www.gold.org/goldhub",
  },
  {
    title:
      "Federal Reserve – Monetary Policy",
    url:
      "https://www.federalreserve.gov/monetarypolicy.htm",
  },
  {
    title:
      "FRED – US 10-Year Real Treasury Yield",
    url:
      "https://fred.stlouisfed.org/series/DFII10",
  },
  {
    title:
      "US Bureau of Labor Statistics – Inflation Data",
    url:
      "https://www.bls.gov/cpi/",
  },
  {
    title:
      "World Bank – Commodity Markets",
    url:
      "https://www.worldbank.org/en/research/commodity-markets",
  },
];

/* =========================================================
   SEO CONFIGURATION
========================================================= */

const ARTICLE_SEO: ArticleSEOConfig = {
  language: "ar",

  slug: SLUG,

  title: ARTICLE.title,

  seoTitle: ARTICLE.seoTitle,

  description: ARTICLE.description,

  category: CATEGORY,

  categoryHref: CATEGORY_HREF,

  categoryName: CATEGORY,

  author: ARTICLE.author,

  published: ARTICLE.published,

  modified: ARTICLE.modified,

  image: HERO_IMAGE,

  imageAlt:
    "توقعات أسعار الذهب لعام 2027 وتحليل توقعات البنوك العالمية لمستقبل أسعار الأونصة",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: false,

  tags: [
    "الذهب",
    "توقعات الذهب 2027",
    "أسعار الذهب",
    "البنوك العالمية",
    "XAUUSD",
    "الاقتصاد العالمي",
  ],

  keywords: [
    "توقعات أسعار الذهب 2027",
    "توقعات الذهب 2027",
    "توقعات البنوك العالمية للذهب",
    "مستقبل أسعار الذهب",
    "هل سيرتفع الذهب في 2027",
    "توقعات سعر أونصة الذهب",
    "توقعات الذهب في السعودية 2027",
    "توقعات الذهب في الإمارات 2027",
    "توقعات سعر الذهب عيار 21",
    "توقعات الذهب في الكويت",
    "توقعات سعر غرام الذهب 2027",
    "Gold Price Forecast 2027",
    "XAUUSD Forecast 2027",
  ],

  about: [
    {
      "@type": "Thing",
      name: "Gold",
    },
    {
      "@type": "Thing",
      name: "Gold Price Forecast",
    },
    {
      "@type": "Thing",
      name: "Central Bank Monetary Policy",
    },
    {
      "@type": "Organization",
      name: "Goldman Sachs",
      url: "https://www.goldmansachs.com",
    },
    {
      "@type": "Organization",
      name: "J.P. Morgan",
      url: "https://www.jpmorgan.com",
    },
    {
      "@type": "Organization",
      name: "UBS",
      url: "https://www.ubs.com",
    },
    {
      "@type": "Organization",
      name: "World Gold Council",
      url: "https://www.gold.org",
    },
  ],

  sources,
};

export const metadata =
  createArticleMetadata(ARTICLE_SEO);

/* =========================================================
   TABLE OF CONTENTS
========================================================= */

const contents = [
  {
    id: "forecast-summary",
    label: "ملخص توقعات أسعار الذهب 2027",
  },
  {
    id: "gold-performance-2026",
    label: "كيف تحرك الذهب خلال عام 2026؟",
  },
  {
    id: "global-bank-forecasts",
    label: "توقعات البنوك العالمية لأسعار الذهب",
  },
  {
    id: "individual-bank-analysis",
    label: "تحليل توقعات كل بنك",
  },
  {
    id: "forecast-revisions",
    label: "كيف تغيرت توقعات البنوك؟",
  },
  {
    id: "forecast-comparison",
    label: "مقارنة توقعات أسعار الذهب",
  },
  {
    id: "gold-price-drivers",
    label: "العوامل المؤثرة في الذهب خلال 2027",
  },
  {
    id: "central-bank-demand",
    label: "مشتريات البنوك المركزية من الذهب",
  },
  {
    id: "quarterly-outlook",
    label: "توقعات الذهب خلال أرباع عام 2027",
  },
  {
    id: "gold-scenarios",
    label: "سيناريوهات صعود وهبوط الذهب",
  },
  {
    id: "arab-gold-prices",
    label: "توقعات أسعار الذهب في الدول العربية",
  },
  {
    id: "gold-karat-prices",
    label: "توقعات أسعار الذهب حسب العيار",
  },
  {
    id: "gold-investment",
    label: "هل الذهب استثمار مناسب في 2027؟",
  },
  {
    id: "gold-brokers",
    label: "اختيار شركات تداول الذهب",
  },
  {
    id: "gold-trading-risks",
    label: "مخاطر تداول الذهب خلال 2027",
  },
  {
    id: "editorial-outlook",
    label: "خلاصة توقعات بروكر العرب",
  },
  {
    id: "faq",
    label: "الأسئلة الشائعة",
  },
  {
    id: "sources",
    label: "المصادر ومنهجية إعداد التقرير",
  },
];

/* =========================================================
   TYPES & CONSTANTS
========================================================= */

type BankForecast = {
  name: string;
  country: string;
  target: number;
  period: string;
  date: string;
  type: "year-end" | "annual-average";
  color: string;
};

const TROY_OUNCE_GRAMS = 31.1034768;

/*
   Illustrative comparison baseline.
   Not a live market price.
*/

const REFERENCE_PRICE = 3650;

const bankForecasts: BankForecast[] = [
  {
    name: "UBS",
    country: "سويسرا",
    target: 5000,
    period: "نهاية 2027",
    date: "19 نوفمبر 2026",
    type: "year-end",
    color: "#176ac8",
  },
  {
    name: "Goldman Sachs",
    country: "الولايات المتحدة",
    target: 4650,
    period: "نهاية 2027",
    date: "12 نوفمبر 2026",
    type: "year-end",
    color: "#3685cf",
  },
  {
    name: "J.P. Morgan",
    country: "الولايات المتحدة",
    target: 4500,
    period: "نهاية 2027",
    date: "24 نوفمبر 2026",
    type: "year-end",
    color: "#5c96d0",
  },
  {
    name: "Commerzbank",
    country: "ألمانيا",
    target: 4100,
    period: "نهاية 2027",
    date: "24 نوفمبر 2026",
    type: "year-end",
    color: "#94b7da",
  },
  {
    name: "CIBC",
    country: "كندا",
    target: 5200,
    period: "متوسط عام 2027",
    date: "20 أكتوبر 2026",
    type: "annual-average",
    color: "#b48a39",
  },
];

const yearEndForecasts = bankForecasts.filter(
  (bank) => bank.type === "year-end"
);

const averageForecast =
  yearEndForecasts.reduce(
    (sum, bank) => sum + bank.target,
    0
  ) / yearEndForecasts.length;

const highestForecast = Math.max(
  ...yearEndForecasts.map((bank) => bank.target)
);

const lowestForecast = Math.min(
  ...yearEndForecasts.map((bank) => bank.target)
);

const forecastSpread =
  highestForecast - lowestForecast;

const sortedForecasts = yearEndForecasts
  .map((bank) => bank.target)
  .sort((a, b) => a - b);

const middle = Math.floor(
  sortedForecasts.length / 2
);

const medianForecast =
  sortedForecasts.length % 2 === 0
    ? (
        sortedForecasts[middle - 1] +
        sortedForecasts[middle]
      ) / 2
    : sortedForecasts[middle];

/* =========================================================
   HELPERS
========================================================= */

function formatNumber(
  value: number,
  decimals = 0
) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatUSD(value: number) {
  return `$${formatNumber(value)}`;
}

function calculateChange(
  target: number,
  reference = REFERENCE_PRICE
) {
  return (
    ((target - reference) / reference) * 100
  );
}

function calculateGramPrice(
  ouncePrice: number,
  karat = 24,
  exchangeRate = 1
) {
  return (
    (ouncePrice / TROY_OUNCE_GRAMS) *
    (karat / 24) *
    exchangeRate
  );
}

/* =========================================================
   SHARED TABLE STYLES
========================================================= */

const tableContainerClass =
  "my-7 overflow-hidden rounded-[16px] border border-[#dce6ef]";

const tableHeaderClass =
  "px-3 py-4 text-[12px] font-bold text-white sm:px-5 sm:text-[14px]";

const tableCellClass =
  "border-t border-[#e3eaf1] px-3 py-4 text-[12px] leading-7 text-[#475569] sm:px-5 sm:text-[14px]";

/* =========================================================
   KEY FORECAST FIGURES
========================================================= */

function ForecastSummaryCards() {

  const figures = [
    {
      label: "أعلى توقع لنهاية 2027",
      value: formatUSD(highestForecast),
      description: "UBS",
      color: "#176ac8",
    },
    {
      label: "أدنى توقع لنهاية 2027",
      value: formatUSD(lowestForecast),
      description: "Commerzbank",
      color: "#102747",
    },
    {
      label: "متوسط توقعات العينة",
      value: formatUSD(averageForecast),
      description: "أربعة أهداف لنهاية العام",
      color: "#b48a39",
    },
    {
      label: "الفارق بين التوقعات",
      value: formatUSD(forecastSpread),
      description: "لكل أونصة ذهب",
      color: "#102747",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-2 gap-3 lg:grid-cols-4">

      {figures.map((figure) => (

        <div
          key={figure.label}
          className="rounded-[17px] border border-[#dce6ef] bg-gradient-to-b from-white to-[#f6f9fd] px-3 py-6 text-center sm:px-5"
        >

          <div className="mb-4 text-[12px] font-bold leading-6 text-[#64748b] sm:text-[14px]">
            {figure.label}
          </div>

          <div
            dir="ltr"
            style={{ color: figure.color }}
            className="text-[26px] font-black leading-tight sm:text-[34px]"
          >
            {figure.value}
          </div>

          <div className="mt-3 text-[12px] font-medium leading-6 text-[#64748b] sm:text-[13px]">
            {figure.description}
          </div>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   BANK FORECAST COMPARISON TABLE
========================================================= */

function BankForecastTable() {

  return (

    <div className={tableContainerClass}>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[680px] border-collapse text-center">

          <thead className="bg-[#102747]">

            <tr>

              <th className={tableHeaderClass}>
                البنك
              </th>

              <th className={tableHeaderClass}>
                الدولة
              </th>

              <th className={tableHeaderClass}>
                سعر الأونصة المتوقع
              </th>

              <th className={tableHeaderClass}>
                الفترة المستهدفة
              </th>

              <th className={tableHeaderClass}>
                تاريخ التوقع
              </th>

            </tr>

          </thead>

          <tbody>

            {bankForecasts.map((bank, index) => (

              <tr
                key={bank.name}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f6f9fc]"
                }
              >

                <td className={`${tableCellClass} font-black text-[#102747]`}>
                  {bank.name}
                </td>

                <td className={tableCellClass}>
                  {bank.country}
                </td>

                <td
                  dir="ltr"
                  className={`${tableCellClass} whitespace-nowrap text-[16px] font-black text-[#176ac8]`}
                >
                  {formatUSD(bank.target)}
                </td>

                <td className={tableCellClass}>

                  <span
                    className={`inline-flex rounded-lg px-3 py-1.5 text-[12px] font-bold ${
                      bank.type === "year-end"
                        ? "bg-[#edf5ff] text-[#176ac8]"
                        : "bg-[#fff5dc] text-[#967020]"
                    }`}
                  >
                    {bank.period}
                  </span>

                </td>

                <td className={tableCellClass}>
                  {bank.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-[#dce6ef] bg-[#f8fafc] px-4 py-4 text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

        جميع الأسعار بالدولار الأمريكي لكل أونصة
        تروي من الذهب. متوسط السعر السنوي ليس
        مرادفاً لسعر الذهب المتوقع في نهاية العام.

      </div>

    </div>
  );
}

/* =========================================================
   BANK FORECAST BAR CHART
========================================================= */

function BankForecastChart() {

  const chartMaximum = 5500;

  return (

    <div className="my-8 rounded-[18px] border border-[#dce6ef] bg-white p-4 sm:p-7">

      <h3 className="mb-2 text-[19px] font-black text-[#102747] sm:text-[23px]">
        توقعات البنوك العالمية لنهاية 2027
      </h3>

      <p className="mb-7 text-[12px] leading-6 text-[#64748b] sm:text-[14px]">
        سعر أونصة الذهب المتوقع بالدولار الأمريكي
      </p>

      <div dir="ltr" className="space-y-6">

        {yearEndForecasts.map((bank) => (

          <div key={bank.name}>

            <div className="mb-2 flex items-center justify-between gap-3">

              <span className="text-[13px] font-black text-[#102747] sm:text-[15px]">
                {bank.name}
              </span>

              <span className="text-[15px] font-black text-[#102747] sm:text-[18px]">
                {formatUSD(bank.target)}
              </span>

            </div>

            <div className="h-8 overflow-hidden rounded-[7px] bg-[#edf2f7] sm:h-10">

              <div
                className="h-full rounded-[7px]"
                style={{
                  width: `${(bank.target / chartMaximum) * 100}%`,
                  backgroundColor: bank.color,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <div className="mt-7 rounded-xl border border-[#e9dfc6] bg-[#fffbf1] p-4 text-center">

        <div className="text-[12px] font-bold text-[#967020]">
          متوسط الأهداف السعرية لنهاية العام
        </div>

        <div
          dir="ltr"
          className="mt-2 text-[30px] font-black text-[#9c7627]"
        >
          {formatUSD(averageForecast)}
        </div>

      </div>

      <p className="mt-4 text-[12px] leading-7 text-[#64748b]">

        يستبعد الرسم توقع CIBC لأنه يمثل متوسط
        السعر السنوي وليس هدف نهاية عام 2027.

      </p>

    </div>
  );
}

/* =========================================================
   POTENTIAL CHANGE COMPARISON
========================================================= */

function ForecastChangeTable() {

  return (

    <div className={tableContainerClass}>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[520px] border-collapse text-center">

          <thead className="bg-[#102747]">

            <tr>

              <th className={tableHeaderClass}>
                البنك
              </th>

              <th className={tableHeaderClass}>
                السعر المرجعي
              </th>

              <th className={tableHeaderClass}>
                السعر المتوقع
              </th>

              <th className={tableHeaderClass}>
                نسبة التغير
              </th>

            </tr>

          </thead>

          <tbody>

            {yearEndForecasts.map((bank, index) => (

              <tr
                key={bank.name}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f6f9fc]"
                }
              >

                <td className={`${tableCellClass} font-bold text-[#102747]`}>
                  {bank.name}
                </td>

                <td
                  dir="ltr"
                  className={tableCellClass}
                >
                  {formatUSD(REFERENCE_PRICE)}
                </td>

                <td
                  dir="ltr"
                  className={`${tableCellClass} font-bold`}
                >
                  {formatUSD(bank.target)}
                </td>

                <td
                  dir="ltr"
                  className={`${tableCellClass} font-black text-[#15803d]`}
                >
                  +{formatNumber(calculateChange(bank.target), 2)}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-[#dce6ef] bg-[#f8fafc] px-4 py-4 text-[12px] leading-7 text-[#64748b]">

        نسب التغير محسوبة باستخدام سعر مرجعي
        افتراضي موحد يبلغ 3,650 دولاراً للأونصة،
        لأغراض المقارنة فقط. لا يمثل هذا السعر
        تحديثاً لحظياً للسوق ولا تعكس النسب
        عوائد تداول مضمونة.

      </div>

    </div>

  );
}

/* =========================================================
   FORECAST REVISIONS CHART
========================================================= */

function ForecastRevisionsChart() {

  const revisions = [
    {
      bank: "Goldman Sachs",
      previous: 4800,
      revised: 4650,
      date: "12 نوفمبر 2026",
    },
    {
      bank: "J.P. Morgan",
      previous: 6300,
      revised: 4500,
      date: "24 نوفمبر 2026",
    },
  ];

  return (

    <div className="my-8 rounded-[18px] border border-[#dce6ef] bg-white p-4 sm:p-7">

      <h3 className="mb-2 text-[19px] font-black text-[#102747] sm:text-[23px]">
        تغير توقعات البنوك لأسعار الذهب
      </h3>

      <p className="mb-6 text-[13px] leading-7 text-[#64748b]">
        مقارنة بين توقعات منشورة سابقاً وتقديرات أحدث
      </p>

      <div className="mb-7 flex flex-wrap gap-5">

        <div className="flex items-center gap-2 text-[12px] text-[#64748b]">

          <span className="h-3 w-3 rounded-sm bg-[#9db7ce]" />

          التوقع السابق

        </div>

        <div className="flex items-center gap-2 text-[12px] text-[#64748b]">

          <span className="h-3 w-3 rounded-sm bg-[#176ac8]" />

          التوقع الأحدث

        </div>

      </div>

      <div className="space-y-8">

        {revisions.map((item) => (

          <div key={item.bank}>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">

              <span className="font-black text-[#102747]">
                {item.bank}
              </span>

              <span className="text-[12px] text-[#64748b]">
                {item.date}
              </span>

            </div>

            <div dir="ltr" className="space-y-3">

              <div className="flex items-center gap-3">

                <div className="h-8 flex-1 rounded bg-[#edf2f7]">

                  <div
                    className="h-full rounded bg-[#9db7ce]"
                    style={{
                      width: `${(item.previous / 6500) * 100}%`,
                    }}
                  />

                </div>

                <span className="w-20 text-right text-[14px] font-bold text-[#475569]">
                  {formatUSD(item.previous)}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="h-8 flex-1 rounded bg-[#edf2f7]">

                  <div
                    className="h-full rounded bg-[#176ac8]"
                    style={{
                      width: `${(item.revised / 6500) * 100}%`,
                    }}
                  />

                </div>

                <span className="w-20 text-right text-[14px] font-black text-[#176ac8]">
                  {formatUSD(item.revised)}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-7 rounded-xl bg-[#f7faff] p-4 text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

        بالنسبة إلى J.P. Morgan، فإن التوقع السابق
        ورد في تقرير الأبحاث العالمية المنشور خلال
        يونيو 2026، بينما نقلت رويترز التقدير الأحدث
        خلال نوفمبر. لا يفترض الرسم أن جميع
        التقديرات صدرت عن الفريق البحثي نفسه
        أو باستخدام المنهجية نفسها.

      </div>

    </div>

  );
}

/* =========================================================
   ECONOMIC FACTORS
========================================================= */

const economicFactors = [
  {
    factor: "أسعار الفائدة الأمريكية",
    bullish: "خفض الفائدة والعوائد الحقيقية",
    bearish: "رفع الفائدة واستمرار السياسة المتشددة",
  },
  {
    factor: "الدولار الأمريكي",
    bullish: "ضعف الدولار",
    bearish: "ارتفاع الدولار",
  },
  {
    factor: "التضخم",
    bullish: "تزايد الطلب على التحوط",
    bearish: "تشديد نقدي يفوق أثر التضخم",
  },
  {
    factor: "البنوك المركزية",
    bullish: "زيادة مشتريات الذهب",
    bearish: "تباطؤ المشتريات الرسمية",
  },
  {
    factor: "صناديق الذهب ETF",
    bullish: "ارتفاع التدفقات الاستثمارية",
    bearish: "خروج الأموال من الصناديق",
  },
  {
    factor: "المخاطر الجيوسياسية",
    bullish: "ارتفاع الطلب على الملاذات الآمنة",
    bearish: "تراجع المخاطر العالمية",
  },
  {
    factor: "النمو الاقتصادي",
    bullish: "مخاوف الركود وضعف الثقة",
    bearish: "نمو قوي وارتفاع العوائد",
  },
];

function EconomicFactorsTable() {

  return (

    <div className={tableContainerClass}>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[550px] border-collapse text-center">

          <thead className="bg-[#102747]">

            <tr>

              <th className={tableHeaderClass}>
                العامل الاقتصادي
              </th>

              <th className={tableHeaderClass}>
                عوامل تدعم ارتفاع الذهب
              </th>

              <th className={tableHeaderClass}>
                عوامل تضغط على الذهب
              </th>

            </tr>

          </thead>

          <tbody>

            {economicFactors.map((item, index) => (

              <tr
                key={item.factor}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f6f9fc]"
                }
              >

                <td className={`${tableCellClass} font-bold text-[#102747]`}>
                  {item.factor}
                </td>

                <td className={`${tableCellClass} text-[#15803d]`}>
                  {item.bullish}
                </td>

                <td className={`${tableCellClass} text-[#b45309]`}>
                  {item.bearish}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

/* =========================================================
   SCENARIO ANALYSIS
========================================================= */

const goldScenarios = [
  {
    name: "السيناريو الصعودي",
    range: "$5,000 – $5,500",
    description:
      "تعافي الطلب الاستثماري على الذهب واستمرار مشتريات البنوك المركزية مع تراجع العوائد الحقيقية.",
    factors: [
      "اتجاه الفيدرالي نحو تخفيف السياسة النقدية.",
      "ضعف الدولار الأمريكي.",
      "ارتفاع التدفقات الاستثمارية إلى الذهب.",
      "استمرار المخاطر الاقتصادية والجيوسياسية.",
    ],
    color: "#15803d",
    background: "#f3faf5",
    border: "#cde8d5",
  },
  {
    name: "السيناريو الأساسي",
    range: "$4,100 – $5,000",
    description:
      "نطاق مستمد من أهداف نهاية العام الواردة في عينة البنوك التي يغطيها التقرير.",
    factors: [
      "استمرار الطلب الرسمي على الذهب.",
      "تغير تدريجي في السياسة النقدية.",
      "تفاوت الطلب الاستثماري.",
      "استمرار التقلبات خلال العام.",
    ],
    color: "#176ac8",
    background: "#f4f8ff",
    border: "#cddff4",
  },
  {
    name: "السيناريو الهبوطي",
    range: "$3,200 – $4,000",
    description:
      "افتراض تحليلي لاختبار أثر استمرار الفائدة المرتفعة وتراجع الطلب على الذهب.",
    factors: [
      "ارتفاع العوائد الحقيقية الأمريكية.",
      "استمرار قوة الدولار.",
      "خروج استثمارات من صناديق الذهب.",
      "تباطؤ الطلب الرسمي والاستثماري.",
    ],
    color: "#b45309",
    background: "#fffbf3",
    border: "#f0dfbf",
  },
];

function GoldScenarioCards() {

  return (

    <div className="my-7 grid grid-cols-1 gap-4 lg:grid-cols-3">

      {goldScenarios.map((scenario) => (

        <div
          key={scenario.name}
          className="rounded-[18px] border p-5 sm:p-6"
          style={{
            backgroundColor: scenario.background,
            borderColor: scenario.border,
          }}
        >

          <h3
            className="text-[18px] font-black"
            style={{ color: scenario.color }}
          >
            {scenario.name}
          </h3>

          <div
            dir="ltr"
            className="my-5 text-center text-[27px] font-black"
            style={{ color: scenario.color }}
          >
            {scenario.range}
          </div>

          <p className="mb-5 text-[13px] leading-7 text-[#475569]">
            {scenario.description}
          </p>

          <ul className="space-y-3">

            {scenario.factors.map((factor) => (

              <li
                key={factor}
                className="flex items-start gap-2 text-[13px] leading-7 text-[#475569]"
              >

                <span
                  className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: scenario.color,
                  }}
                />

                {factor}

              </li>

            ))}

          </ul>

        </div>

      ))}

    </div>

  );
}

/* =========================================================
   GOLD PRICES IN ARAB COUNTRIES
========================================================= */

const localMarkets = [
  {
    country: "السعودية",
    flag: "🇸🇦",
    currency: "ريال سعودي",
    code: "SAR",
    rate: 3.75,
  },
  {
    country: "الإمارات",
    flag: "🇦🇪",
    currency: "درهم إماراتي",
    code: "AED",
    rate: 3.6725,
  },
  {
    country: "قطر",
    flag: "🇶🇦",
    currency: "ريال قطري",
    code: "QAR",
    rate: 3.64,
  },
  {
    country: "البحرين",
    flag: "🇧🇭",
    currency: "دينار بحريني",
    code: "BHD",
    rate: 0.376,
  },
  {
    country: "عُمان",
    flag: "🇴🇲",
    currency: "ريال عماني",
    code: "OMR",
    rate: 0.3845,
  },
  {
    country: "الأردن",
    flag: "🇯🇴",
    currency: "دينار أردني",
    code: "JOD",
    rate: 0.709,
  },
];

function ArabGoldPricesTable() {

  return (

    <div className={tableContainerClass}>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[660px] border-collapse text-center">

          <thead className="bg-[#102747]">

            <tr>

              <th className={tableHeaderClass}>
                الدولة
              </th>

              <th className={tableHeaderClass}>
                العملة
              </th>

              <th className={tableHeaderClass}>
                غرام عيار 24
              </th>

              <th className={tableHeaderClass}>
                غرام عيار 22
              </th>

              <th className={tableHeaderClass}>
                غرام عيار 21
              </th>

              <th className={tableHeaderClass}>
                غرام عيار 18
              </th>

            </tr>

          </thead>

          <tbody>

            {localMarkets.map((market, index) => (

              <tr
                key={market.code}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f6f9fc]"
                }
              >

                <td className={`${tableCellClass} font-bold text-[#102747]`}>

                  <span className="me-2">
                    {market.flag}
                  </span>

                  {market.country}

                </td>

                <td className={tableCellClass}>
                  {market.currency}
                </td>

                {[24, 22, 21, 18].map((karat) => (

                  <td
                    key={karat}
                    dir="ltr"
                    className={`${tableCellClass} whitespace-nowrap font-bold text-[#176ac8]`}
                  >

                    {formatNumber(
                      calculateGramPrice(
                        averageForecast,
                        karat,
                        market.rate
                      ),
                      2
                    )}

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-[#dce6ef] bg-[#f8fafc] p-4 text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

        أسعار الغرام محسوبة وفق متوسط أهداف
        نهاية عام 2027 البالغ{" "}

        <strong dir="ltr">
          {formatUSD(averageForecast)}
        </strong>

        {" "}للأونصة، وباستخدام أسعار التحويل
        الاسمية التقريبية للعملات المرتبطة بالدولار.
        لا تشمل الأسعار المصنعية أو الضرائب أو
        هوامش التجار.

      </div>

    </div>

  );
}

/* =========================================================
   GOLD KARAT FORECASTS
========================================================= */

function GoldKaratForecastTable() {

  return (

    <div className={tableContainerClass}>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[620px] border-collapse text-center">

          <thead className="bg-[#102747]">

            <tr>

              <th className={tableHeaderClass}>
                توقع البنك
              </th>

              <th className={tableHeaderClass}>
                سعر الأونصة
              </th>

              <th className={tableHeaderClass}>
                عيار 24
              </th>

              <th className={tableHeaderClass}>
                عيار 22
              </th>

              <th className={tableHeaderClass}>
                عيار 21
              </th>

              <th className={tableHeaderClass}>
                عيار 18
              </th>

            </tr>

          </thead>

          <tbody>

            {yearEndForecasts.map((bank, index) => (

              <tr
                key={bank.name}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f6f9fc]"
                }
              >

                <td className={`${tableCellClass} font-black text-[#102747]`}>
                  {bank.name}
                </td>

                <td
                  dir="ltr"
                  className={`${tableCellClass} font-bold`}
                >
                  {formatUSD(bank.target)}
                </td>

                {[24, 22, 21, 18].map((karat) => (

                  <td
                    key={karat}
                    dir="ltr"
                    className={tableCellClass}
                  >

                    ${formatNumber(
                      calculateGramPrice(
                        bank.target,
                        karat
                      ),
                      2
                    )}

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-[#dce6ef] bg-[#f8fafc] p-4 text-[12px] leading-7 text-[#64748b]">

        جميع أسعار الغرام بالدولار الأمريكي،
        وهي أسعار متوقعة مشتقة من أهداف البنوك
        وليست توقعات مستقلة لسوق المجوهرات.

      </div>

    </div>

  );
}

/* =========================================================
   COMMERCIAL BROKER PLACEMENT
========================================================= */

const goldBrokers = [
  {
    name: "Exness",
    slug: "exness",
    description:
      "تعرف على حسابات التداول ومواصفات تداول الذهب والرسوم لدى Exness.",
  },
  {
    name: "XM",
    slug: "xm",
    description:
      "اطلع على أنواع الحسابات ومنصات التداول وتفاصيل أدوات الذهب لدى XM.",
  },
  {
    name: "XS",
    slug: "xs",
    description:
      "اكتشف حسابات التداول والتراخيص ومواصفات الأدوات المالية لدى XS.",
  },
  {
    name: "Pepperstone",
    slug: "pepperstone",
    description:
      "قارن منصات التداول والحسابات وتكاليف التداول لدى Pepperstone.",
  },
];

function GoldBrokersPlacement() {

  return (

    <section className="my-9 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="bg-gradient-to-l from-[#102747] to-[#184878] px-5 py-6 text-white sm:px-7">

        <div className="mb-2 text-[12px] font-bold text-[#b9d7f5]">

          دليل شركات التداول

        </div>

        <h3 className="text-[21px] font-black leading-9 sm:text-[27px]">

          شركات تداول الذهب التي يمكنك مقارنتها

        </h3>

        <p className="mt-2 text-[13px] leading-7 text-[#d7e5f4] sm:text-[14px]">

          تعرف على التراخيص والحسابات والرسوم
          قبل اختيار شركة لتداول الذهب.

        </p>

      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6">

        {goldBrokers.map((broker) => (

          <div
            key={broker.slug}
            className="flex flex-col rounded-[14px] border border-[#dce6ef] bg-[#f9fbfd] p-5"
          >

            <div
              dir="ltr"
              className="mb-3 text-center text-[25px] font-black text-[#102747]"
            >

              {broker.name}

            </div>

            <p className="mb-5 flex-1 text-center text-[13px] leading-7 text-[#64748b]">

              {broker.description}

            </p>

            <Link
              href={`/brokers/${broker.slug}`}
              className="flex min-h-[43px] items-center justify-center rounded-[9px] bg-[#176ac8] px-4 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#1058a9]"
            >

              تقييم الشركة وخيارات فتح الحساب

            </Link>

          </div>

        ))}

      </div>

      <div className="border-t border-[#e3eaf1] bg-[#f8fafc] p-4 text-[11px] leading-6 text-[#64748b] sm:px-6 sm:text-[12px]">

        تعرض هذه القائمة شركات مدرجة في دليل بروكر
        العرب، ولا تمثل ترتيباً لأفضل الوسطاء وفق
        توقعات الذهب. قد يحصل الموقع على عمولات
        من بعض الشراكات. يخضع توفر التداول لأهلية
        العميل والقيود التنظيمية.

      </div>

    </section>

  );
}

/* =========================================================
   SECOND COMMERCIAL PLACEMENT
========================================================= */

function GoldTradingCTA() {
  return (
    <div className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f5f9fe] p-5 sm:p-7">

      <div className="mb-2 text-[12px] font-black text-[#176ac8]">
        أدوات ومقارنات بروكر العرب
      </div>

      <h3 className="mb-3 text-[22px] font-black leading-9 text-[#102747] sm:text-[26px]">
        قارن شركات التداول قبل فتح حساب لتداول الذهب
      </h3>

      <p className="mb-6 text-[14px] leading-8 text-[#475569]">
        قارن بين الوسطاء من حيث التراخيص والرسوم
        وأنواع الحسابات والرافعة المالية، وتعرف على
        مواصفات التداول قبل اختيار الوسيط المناسب.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        <Link
          href="/compare"
          className="rounded-[10px] bg-[#176ac8] px-5 py-4 text-center text-[14px] font-bold text-white hover:bg-[#1058a9]"
        >
          مقارنة شركات التداول
        </Link>

        <Link
          href="/brokers"
          className="rounded-[10px] border border-[#176ac8] bg-white px-5 py-4 text-center text-[14px] font-bold text-[#176ac8] hover:bg-[#edf5ff]"
        >
          تقييمات شركات التداول
        </Link>

      </div>

    </div>
  );
}

/* =========================================================
   GOLD TRADING TOOLS
========================================================= */

function GoldTradingTools() {

  const tools = [
    {
      title: "حاسبة أرباح التداول",
      description: "احسب الأرباح والخسائر المحتملة لصفقات الذهب.",
      href: "/tools/profit-calculator",
    },
    {
      title: "حاسبة حجم العقد",
      description: "احسب حجم الصفقة وفق رأس المال والمخاطرة.",
      href: "/tools/lot-size-calculator",
    },
    {
      title: "حاسبة المخاطر",
      description: "حدد المبلغ المعرض للخسارة قبل تنفيذ الصفقة.",
      href: "/tools/risk-calculator",
    },
    {
      title: "حاسبة الهامش",
      description: "احسب الهامش المطلوب وفق حجم العقد والرافعة المالية.",
      href: "/tools/margin-calculator",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

      {tools.map((tool) => (

        <Link
          key={tool.href}
          href={tool.href}
          className="group rounded-[14px] border border-[#dce6ef] bg-[#f7faff] p-5 transition-colors hover:border-[#176ac8] hover:bg-white"
        >

          <h4 className="text-[16px] font-black text-[#102747] group-hover:text-[#176ac8] sm:text-[18px]">
            {tool.title}
          </h4>

          <p className="mt-2 text-[13px] leading-7 text-[#64748b]">
            {tool.description}
          </p>

          <div className="mt-4 text-[13px] font-bold text-[#176ac8]">
            استخدم الحاسبة ←
          </div>

        </Link>

      ))}

    </div>
  );
}

/* =========================================================
   RELATED GOLD RESEARCH
========================================================= */

function RelatedGoldResearch() {

  const articles = [
    {
      title: "أكبر انهيارات أسعار الذهب عبر التاريخ",
      description:
        "دراسة لأبرز فترات هبوط الذهب والعوامل الاقتصادية التي أدت إليها.",
      href: "/articles/gold-price-crashes-history",
    },
    {
      title: "كيف يتفاعل الذهب مع قرارات الفيدرالي الأمريكي؟",
      description:
        "تحليل العلاقة بين قرارات أسعار الفائدة وتحركات الذهب.",
      href: "/articles/gold-reaction-fed-decisions",
    },
    {
      title: "أفضل أوقات تداول الذهب خلال اليوم",
      description:
        "دراسة لفترات السيولة والتقلبات خلال جلسات تداول الذهب.",
      href: "/articles/best-time-to-trade-gold",
    },
  ];

  return (
    <div className="my-7 grid grid-cols-1 gap-4 lg:grid-cols-3">

      {articles.map((article) => (

        <Link
          key={article.href}
          href={article.href}
          className="group rounded-[15px] border border-[#dce6ef] bg-[#f7faff] p-5 transition-colors hover:border-[#176ac8]"
        >

          <div className="mb-3 text-[11px] font-bold text-[#176ac8]">
            أبحاث وتقارير الذهب
          </div>

          <h3 className="text-[17px] font-black leading-8 text-[#102747] group-hover:text-[#176ac8]">
            {article.title}
          </h3>

          <p className="mt-3 text-[13px] leading-7 text-[#64748b]">
            {article.description}
          </p>

          <div className="mt-4 text-[13px] font-bold text-[#176ac8]">
            اقرأ التقرير ←
          </div>

        </Link>

      ))}

    </div>
  );
}

/* =========================================================
   GOLD PRICE CONVERSION FORMULA
========================================================= */

function GoldPriceFormula() {
  return (
    <div className="my-7 rounded-[17px] border border-[#e9dfc6] bg-[#fffbf1] p-5 text-center sm:p-7">

      <h3 className="text-[19px] font-black text-[#967020] sm:text-[23px]">
        كيف تحسب سعر غرام الذهب المتوقع؟
      </h3>

      <div className="my-5 rounded-xl border border-[#eadfbe] bg-white p-5 text-[16px] font-black leading-9 text-[#102747] sm:text-[20px]">
        سعر الأونصة ÷ 31.1034768 × العيار ÷ 24
        × سعر صرف الدولار
      </div>

      <p className="text-[13px] leading-7 text-[#64748b]">
        تمثل النتيجة قيمة الذهب وفق وزنه ونسبة نقائه،
        قبل إضافة المصنعية والضرائب وهوامش البيع.
      </p>

    </div>
  );
}

/* =========================================================
   RESEARCH SOURCES
========================================================= */

function GoldResearchSources() {

  return (
    <div className="my-6 overflow-hidden rounded-[15px] border border-[#dce6ef]">

      {sources.map((source, index) => (

        <div
          key={source.url}
          className="flex items-center gap-3 border-b border-[#e3eaf1] px-4 py-4 last:border-b-0 sm:px-5"
        >

          <span
            dir="ltr"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edf3fa] text-[12px] font-bold text-[#176ac8]"
          >
            {index + 1}
          </span>

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 break-words text-[13px] font-bold leading-7 text-[#176ac8] hover:underline sm:text-[15px]"
          >
            {source.title} ↗
          </a>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   MAIN ARTICLE PAGE
========================================================= */

export default function GoldPriceForecast2027Page() {

  return (

    <ArticleLayout

      language="ar"

      slug={SLUG}

      title={ARTICLE.title}

      description={ARTICLE.description}

      category={CATEGORY}

      categoryHref={CATEGORY_HREF}

      subcategory={ARTICLE.subcategory}

      articleType="تقرير بحثي"

      breadcrumbTitle={ARTICLE.shortTitle}

      author={ARTICLE.author}

      published={ARTICLE.published}

      modified={ARTICLE.modified}

      heroImage={HERO_IMAGE}

      heroImageAlt={
        ARTICLE_SEO.imageAlt || ARTICLE.title
      }

      heroImageCaption="توقعات البنوك العالمية وتحليل مستقبل أسعار الذهب خلال عام 2027 – بروكر العرب"

      contents={contents}

      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }

      introduction={

        <>

          <Paragraph>

            إلى أين تتجه أسعار الذهب في عام 2027؟
            وهل تستطيع الأونصة الوصول إلى مستويات
            سعرية جديدة، أم أن الأسواق ستكون أمام
            فترة من التصحيح والتراجع بعد التحركات
            التي شهدها المعدن النفيس خلال السنوات
            الأخيرة؟

          </Paragraph>

          <Paragraph>

            تختلف توقعات البنوك العالمية لأسعار الذهب
            خلال عام 2027 تبعاً لتقديراتها بشأن مستقبل
            أسعار الفائدة الأمريكية، وقوة الدولار،
            ومشتريات البنوك المركزية، والطلب
            الاستثماري، وتطورات الاقتصاد العالمي.

          </Paragraph>

          <Paragraph>

            يستعرض فريق أبحاث بروكر العرب في هذا
            التقرير أبرز التوقعات المتاحة حتى
            27 نوفمبر 2026، مع تحليل الفروق بين
            تقديرات المؤسسات المالية، والعوامل التي
            قد تدعم ارتفاع الذهب أو تؤدي إلى تراجعه،
            بالإضافة إلى حساب أسعار غرام الذهب
            المتوقعة في عدد من الدول العربية.

          </Paragraph>

        </>

      }

    >

      {/* =====================================================
          1. FORECAST SUMMARY
      ====================================================== */}

      <ArticleSection
        id="forecast-summary"
        eyebrow="ملخص التقرير"
        title="ملخص توقعات أسعار الذهب لعام 2027"
      >

        <Paragraph>

          تتراوح أهداف أسعار الذهب لنهاية عام 2027
          ضمن عينة البنوك التي يغطيها التقرير بين{" "}

          <Strong>
            {formatUSD(lowestForecast)}
          </Strong>

          {" "}و{" "}

          <Strong>
            {formatUSD(highestForecast)}
          </Strong>

          {" "}للأونصة، مما يعكس اختلاف تقديرات
          المؤسسات المالية بشأن الظروف الاقتصادية
          والطلب العالمي على المعدن النفيس.

        </Paragraph>

        <ForecastSummaryCards />

        <Paragraph>

          ويبلغ المتوسط الحسابي لأهداف نهاية العام
          ضمن هذه العينة{" "}

          <Strong>
            {formatUSD(averageForecast)}
          </Strong>

          {" "}للأونصة، بينما يبلغ الوسيط الحسابي
          للتوقعات المرتبة{" "}

          <Strong>
            {formatUSD(medianForecast)}
          </Strong>

          {" "}للأونصة.

        </Paragraph>

        <Paragraph>

          ولا يمثل هذا المتوسط توقعاً صادراً عن بنك
          بعينه أو إجماعاً لجميع المؤسسات المالية
          العالمية، وإنما هو نتيجة حسابية للأهداف
          المحددة التي يتناولها التقرير.

        </Paragraph>

        <Note title="تاريخ إعداد التقرير">

          تستند البيانات إلى التوقعات المدرجة في
          مصادر التقرير حتى 27 نوفمبر 2026.
          وقد تختلف التوقعات التي تصدرها البنوك
          لاحقاً مع تغير الظروف الاقتصادية.

        </Note>

      </ArticleSection>

      {/* =====================================================
          2. GOLD PERFORMANCE IN 2026
      ====================================================== */}

      <ArticleSection
        id="gold-performance-2026"
        eyebrow="أداء الأسواق"
        title="كيف تحركت أسعار الذهب خلال عام 2026؟"
      >

        <Paragraph>

          شكلت تطورات السياسة النقدية الأمريكية
          والطلب الاستثماري والمخاوف الاقتصادية
          العالمية عناصر أساسية لفهم حركة الذهب
          خلال عام 2026.

          وتساعد دراسة هذه العوامل في تفسير
          الافتراضات التي تعتمد عليها البنوك عند
          إعداد توقعاتها للعام التالي.

        </Paragraph>

        <SubHeading>
          تأثير أسعار الفائدة الأمريكية
        </SubHeading>

        <Paragraph>

          تتأثر جاذبية الذهب بتغير العائد الذي
          يستطيع المستثمر الحصول عليه من الأصول
          الأخرى، خصوصاً السندات الحكومية الأمريكية.

          وعندما ترتفع العوائد الحقيقية، قد ترتفع
          تكلفة الفرصة البديلة للاحتفاظ بالذهب،
          باعتباره أصلاً لا يوزع فوائد دورية.

        </Paragraph>

        <SubHeading>
          قوة الدولار وتغير الطلب الاستثماري
        </SubHeading>

        <Paragraph>

          يُسعّر الذهب عالمياً بالدولار الأمريكي،
          ولذلك يمكن أن تؤثر تحركات العملة الأمريكية
          في تكلفة شراء المعدن بالنسبة للمستثمرين
          الذين يستخدمون عملات أخرى.

          إلا أن العلاقة ليست ثابتة في جميع
          الظروف، فقد تؤدي الأزمات إلى ارتفاع
          الطلب على الدولار والذهب في الوقت نفسه.

        </Paragraph>

        <SubHeading>
          أهمية التصحيحات السعرية
        </SubHeading>

        <Paragraph>

          لا تتحرك أسعار الذهب في اتجاه واحد،
          حتى خلال الفترات التي تتسم بتوقعات
          إيجابية طويلة الأجل.

          فقد تشهد الأسواق عمليات جني أرباح
          وتراجعات سعرية نتيجة تغير توقعات
          الفائدة أو احتياجات السيولة أو خروج
          الأموال من الصناديق الاستثمارية.

        </Paragraph>

        <Link
          href="/articles/gold-price-crashes-history"
          className="font-bold text-[#176ac8] hover:underline"
        >
          اقرأ أيضاً: أكبر انهيارات أسعار الذهب عبر التاريخ.
        </Link>

      </ArticleSection>

      {/* =====================================================
          3. GLOBAL BANK FORECASTS
      ====================================================== */}

      <ArticleSection
        id="global-bank-forecasts"
        eyebrow="توقعات المؤسسات المالية"
        title="توقعات البنوك العالمية لأسعار الذهب 2027"
      >

        <Paragraph>

          يقدم الجدول التالي مقارنة بين تقديرات
          عدد من البنوك العالمية لأسعار الذهب،
          مع توضيح الفترة الزمنية المستهدفة
          وتاريخ التوقع.

          ويعد تحديد الفترة الزمنية أمراً أساسياً
          عند مقارنة تقارير المؤسسات المالية.

        </Paragraph>

        <BankForecastTable />

        <SubHeading>
          الفرق بين متوسط السعر وهدف نهاية العام
        </SubHeading>

        <Paragraph>

          يشير متوسط السعر السنوي إلى متوسط
          أسعار الذهب المتوقع خلال العام بالكامل،
          بينما يعبر هدف نهاية العام عن السعر
          الذي تتوقع المؤسسة أن يصل إليه الذهب
          عند نهاية الفترة المحددة.

        </Paragraph>

        <Paragraph>

          لذلك لا يمكن اعتبار توقع متوسط سنوي
          عند 5,200 دولار، على سبيل المثال،
          مساوياً لتوقع وصول سعر الذهب إلى
          5,200 دولار في ديسمبر 2027.

        </Paragraph>

        <BankForecastChart />

      </ArticleSection>

      {/* =====================================================
          4. INDIVIDUAL BANK ANALYSIS
      ====================================================== */}

      <ArticleSection
        id="individual-bank-analysis"
        eyebrow="قراءة التوقعات"
        title="تحليل توقعات البنوك العالمية للذهب في 2027"
      >

        <SubHeading>
          توقعات بنك UBS لأسعار الذهب 2027
        </SubHeading>

        <Paragraph>

          يتضمن التقدير المدرج لبنك UBS هدفاً
          يبلغ 5,000 دولار للأونصة بنهاية 2027،
          وهو أعلى هدف لنهاية العام ضمن العينة
          التي يعرضها التقرير.

        </Paragraph>

        <Paragraph>

          ويمكن دعم مثل هذا السيناريو باستمرار
          الطلب المؤسسي على الذهب، وتحسن التدفقات
          الاستثمارية، وانخفاض العوائد الحقيقية.

          إلا أن استمرار السياسة النقدية المتشددة
          أو ضعف الطلب قد يؤدي إلى نتائج تختلف
          عن الهدف السعري.

        </Paragraph>

        <SubHeading>
          توقعات Goldman Sachs لأسعار الذهب
        </SubHeading>

        <Paragraph>

          يتضمن التوقع المدرج لبنك Goldman Sachs
          هدفاً عند 4,650 دولاراً للأونصة بنهاية
          عام 2027.

          ويقع هذا المستوى بين أعلى وأدنى
          الأهداف الواردة في مقارنة البنوك.

        </Paragraph>

        <Paragraph>

          ومن العوامل التي ينبغي مراقبتها عند
          تقييم هذا المستوى استمرار مشتريات
          البنوك المركزية، وتطور الطلب الاستثماري،
          ومسار أسعار الفائدة الأمريكية.

        </Paragraph>

        <SubHeading>
          توقعات J.P. Morgan لأسعار الذهب
        </SubHeading>

        <Paragraph>

          يتضمن التقدير الأحدث المدرج في التقرير
          لبنك J.P. Morgan مستوى يبلغ
          4,500 دولار للأونصة بنهاية 2027.

          وتوضح مقارنة هذا المستوى بالتقديرات
          المنشورة في فترات سابقة مدى حساسية
          توقعات الذهب لتغير البيئة الاقتصادية.

        </Paragraph>

        <Paragraph>

          ومن المهم عند قراءة التقارير المختلفة
          التحقق من الفترة المستهدفة والفريق البحثي
          المسؤول عن التوقع، بدلاً من افتراض أن
          جميع تقديرات المؤسسة قابلة للمقارنة
          المباشرة.

        </Paragraph>

        <SubHeading>
          توقعات Commerzbank لأسعار الذهب
        </SubHeading>

        <Paragraph>

          يتضمن التوقع المدرج لبنك Commerzbank
          هدفاً يبلغ 4,100 دولار للأونصة بنهاية
          عام 2027، وهو أدنى أهداف نهاية العام
          ضمن العينة المستخدمة.

        </Paragraph>

        <Paragraph>

          ويعكس الفرق بين هذا المستوى والأهداف
          الأعلى أهمية النظر إلى عوامل الضغط
          المحتملة، مثل قوة الدولار وارتفاع
          العوائد الحقيقية وتباطؤ الطلب
          الاستثماري.

        </Paragraph>

        <SubHeading>
          توقعات بنك CIBC الكندي للذهب
        </SubHeading>

        <Paragraph>

          يتضمن توقع CIBC مستوى يبلغ 5,200 دولار
          لمتوسط سعر الأونصة خلال عام 2027.

          ويختلف هذا التقدير من حيث الفترة
          الزمنية عن أهداف نهاية العام المنشورة
          للبنوك الأخرى.

        </Paragraph>

        <Paragraph>

          ولهذا السبب استبعد فريق أبحاث بروكر
          العرب توقع CIBC من حساب متوسط أهداف
          نهاية العام، مع الاحتفاظ به ضمن جدول
          التوقعات الرئيسي.

        </Paragraph>

        <Note title="قراءة تحليلية">

          العوامل الاقتصادية المذكورة في هذا القسم
          تمثل قراءة تحريرية للظروف التي قد تدعم
          المستويات السعرية المختلفة، ولا تمثل
          بالضرورة اقتباساً من التحليل الداخلي
          لكل بنك.

        </Note>

      </ArticleSection>

      {/* =====================================================
          FIRST COMMERCIAL PLACEMENT
      ====================================================== */}

      <GoldBrokersPlacement />

      {/* =====================================================
          5. FORECAST REVISIONS
      ====================================================== */}

      <ArticleSection
        id="forecast-revisions"
        eyebrow="تغير التوقعات"
        title="كيف تغيرت توقعات البنوك لأسعار الذهب؟"
      >

        <Paragraph>

          تعد توقعات المؤسسات المالية تقديرات
          مرتبطة بالبيانات الاقتصادية المتاحة
          وقت إعدادها، وليست التزاماً ثابتاً
          بمستوى سعري محدد.

          وقد تعيد البنوك تقييم توقعاتها نتيجة
          تغير أسعار الفائدة أو اتجاه الدولار
          أو الطلب العالمي على الذهب.

        </Paragraph>

        <ForecastRevisionsChart />

        <Paragraph>

          ومن المهم عدم تفسير جميع الاختلافات
          بين الأرقام المنشورة باعتبارها تعديلات
          مباشرة على التوقع نفسه، لأن بعض
          التقديرات قد تصدر عن فرق بحثية مختلفة
          داخل المؤسسة الواحدة، أو تستهدف فترات
          زمنية مختلفة.

        </Paragraph>

        <Paragraph>

          لذلك ينبغي أن يستند القرار الاستثماري
          إلى فهم أسباب التوقع والافتراضات التي
          يقوم عليها، وليس إلى الرقم المستهدف
          وحده.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          6. FORECAST COMPARISON
      ====================================================== */}

      <ArticleSection
        id="forecast-comparison"
        eyebrow="المقارنة الرقمية"
        title="كم يمكن أن يرتفع سعر الذهب وفق توقعات البنوك؟"
      >

        <Paragraph>

          يمكن استخدام سعر مرجعي موحد لمقارنة
          الفروق النسبية بين أهداف البنوك،
          دون افتراض أن السعر المرجعي يمثل
          سعر الذهب الحالي.

        </Paragraph>

        <ForecastChangeTable />

        <Paragraph>

          ويبلغ الفرق بين أعلى وأدنى هدف لنهاية
          العام ضمن عينة التقرير{" "}

          <Strong>
            {formatUSD(forecastSpread)}
          </Strong>

          {" "}للأونصة.

          ويعكس هذا التباين درجة عدم اليقين
          المرتبطة بالتوقعات الاقتصادية طويلة
          الأجل.

        </Paragraph>

        <Note title="نسب التغير ليست عوائد استثمارية">

          تم حساب النسب باستخدام سعر افتراضي
          موحد لأغراض المقارنة الرياضية.
          ولا تشمل الحسابات تكاليف التداول
          أو الضرائب أو الرسوم أو أثر الرافعة
          المالية.

        </Note>

      </ArticleSection>

      {/* =====================================================
          7. GOLD PRICE DRIVERS
      ====================================================== */}

      <ArticleSection
        id="gold-price-drivers"
        eyebrow="الاقتصاد العالمي"
        title="أهم العوامل المؤثرة في أسعار الذهب خلال 2027"
      >

        <Paragraph>

          لا تعتمد حركة الذهب على عامل اقتصادي
          واحد، بل تتأثر بتفاعل مجموعة من
          المتغيرات النقدية والمالية والاستثمارية
          التي قد تختلف أهميتها من فترة إلى أخرى.

        </Paragraph>

        <EconomicFactorsTable />

        <SubHeading>
          1. قرارات الفيدرالي الأمريكي
        </SubHeading>

        <Paragraph>

          قد يؤدي خفض أسعار الفائدة الأمريكية
          إلى دعم الذهب، خصوصاً إذا ترافق مع
          انخفاض العوائد الحقيقية وضعف الدولار.

          وفي المقابل، قد يؤدي استمرار الفائدة
          المرتفعة إلى زيادة جاذبية السندات
          والأصول المدرة للدخل.

        </Paragraph>

        <Paragraph>

          ولا تعتمد استجابة الذهب على قرار
          الفائدة وحده، بل تتأثر أيضاً بالفارق
          بين القرار الفعلي وما كانت الأسواق
          تتوقعه قبل صدوره.

        </Paragraph>

        <Link
          href="/articles/gold-reaction-fed-decisions"
          className="font-bold text-[#176ac8] hover:underline"
        >
          دراسة بروكر العرب: كيف يتفاعل الذهب مع قرارات الفيدرالي؟
        </Link>

        <SubHeading>
          2. التضخم الأمريكي والعوائد الحقيقية
        </SubHeading>

        <Paragraph>

          يُستخدم الذهب باعتباره أحد أدوات
          التحوط المحتملة من تراجع القوة الشرائية
          للنقود.

          لكن ارتفاع التضخم لا يؤدي بالضرورة
          إلى ارتفاع الذهب، لأن رد فعل البنوك
          المركزية قد يتضمن تشديد السياسة
          النقدية ورفع أسعار الفائدة.

        </Paragraph>

        <Paragraph>

          ولهذا السبب تعد العوائد الحقيقية،
          التي تأخذ أثر التضخم في الاعتبار،
          من المؤشرات المهمة عند تحليل حركة
          أسعار الذهب.

        </Paragraph>

        <SubHeading>
          3. اتجاه الدولار الأمريكي
        </SubHeading>

        <Paragraph>

          قد يؤدي ضعف الدولار إلى انخفاض
          تكلفة شراء الذهب بالنسبة لحائزي
          العملات الأخرى، مما يدعم الطلب
          عليه في بعض الظروف.

          وفي المقابل، قد يحد ارتفاع الدولار
          من قدرة الذهب على مواصلة الصعود،
          خصوصاً عند ارتفاع العوائد الأمريكية.

        </Paragraph>

        <SubHeading>
          4. تدفقات صناديق الذهب الاستثمارية
        </SubHeading>

        <Paragraph>

          توفر صناديق الذهب المتداولة في البورصة
          وسيلة للمستثمرين للحصول على تعرض
          لحركة المعدن النفيس.

          وقد تدعم التدفقات الاستثمارية الإيجابية
          الطلب على الذهب، بينما يمكن أن تؤدي
          التدفقات الخارجة إلى زيادة ضغوط البيع.

        </Paragraph>

        <SubHeading>
          5. المخاطر الجيوسياسية والاقتصادية
        </SubHeading>

        <Paragraph>

          قد تزداد جاذبية الذهب خلال فترات
          عدم اليقين الاقتصادي والاضطرابات
          الجيوسياسية، نتيجة توجه بعض
          المستثمرين نحو الأصول التي يعتبرونها
          ملاذات آمنة.

          إلا أن ارتفاع المخاطر لا يضمن صعود
          الذهب فوراً، إذ قد تؤدي الحاجة إلى
          السيولة إلى عمليات بيع تشمل المعدن
          النفيس نفسه.

        </Paragraph>

        <SubHeading>
          6. إنتاج الذهب والطلب على المجوهرات
        </SubHeading>

        <Paragraph>

          تتأثر السوق المادية للذهب بمستويات
          إنتاج المناجم وإعادة تدوير الذهب
          والطلب على المجوهرات والسبائك
          والعملات الذهبية.

          وقد تؤدي الأسعار المرتفعة إلى تراجع
          الطلب على المجوهرات في بعض الأسواق،
          بينما يتجه جزء من الطلب نحو السبائك
          والاستثمار.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          8. CENTRAL BANK DEMAND
      ====================================================== */}

      <ArticleSection
        id="central-bank-demand"
        eyebrow="الاحتياطيات العالمية"
        title="مشتريات البنوك المركزية وتأثيرها على الذهب في 2027"
      >

        <Paragraph>

          تمثل البنوك المركزية أحد المصادر
          المهمة للطلب على الذهب في الأسواق
          العالمية، إذ تحتفظ العديد منها بالمعدن
          النفيس ضمن احتياطياتها الدولية.

        </Paragraph>

        <Paragraph>

          وقد تسعى البنوك المركزية إلى تنويع
          احتياطياتها وتقليل الاعتماد على أصل
          مالي أو عملة واحدة، إضافة إلى
          اعتبارات إدارة المخاطر والسيولة.

        </Paragraph>

        <SubHeading>
          لماذا تشتري البنوك المركزية الذهب؟
        </SubHeading>

        <ArticleList
          items={[
            "تنويع مكونات الاحتياطيات الدولية.",
            "تقليل مخاطر التركيز في العملات والأصول المالية.",
            "الاحتفاظ بأصل لا يمثل التزاماً ائتمانياً على جهة إصدار.",
            "تعزيز المرونة المالية خلال فترات عدم اليقين.",
          ]}
        />

        <SubHeading>
          هل استمرار المشتريات يضمن ارتفاع الأسعار؟
        </SubHeading>

        <Paragraph>

          لا. فالطلب الرسمي يمثل جزءاً من
          السوق العالمية، وتتحدد الأسعار أيضاً
          بتدفقات المستثمرين، والعوائد، والدولار،
          والمعروض من الذهب، ومراكز التداول
          في الأسواق المالية.

        </Paragraph>

        <Paragraph>

          ويمكن متابعة تقارير{" "}

          <a
            href="https://www.gold.org/goldhub"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#176ac8] hover:underline"
          >
            مجلس الذهب العالمي
          </a>

          {" "}للتعرف على تطورات مشتريات
          البنوك المركزية والطلب العالمي.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          9. QUARTERLY OUTLOOK
      ====================================================== */}

      <ArticleSection
        id="quarterly-outlook"
        eyebrow="التوقعات الزمنية"
        title="توقعات أسعار الذهب خلال أرباع عام 2027"
      >

        <Paragraph>

          لا تتضمن جميع توقعات البنوك المدرجة
          في التقرير أهدافاً سعرية مستقلة لكل
          ربع من أرباع العام.

          ولذلك نركز هنا على العوامل الاقتصادية
          التي تستحق المتابعة خلال كل فترة،
          بدلاً من اختراع أسعار فصلية غير
          منشورة من المؤسسات المالية.

        </Paragraph>

        <SubHeading>
          الربع الأول: يناير – مارس 2027
        </SubHeading>

        <Paragraph>

          تتمثل أبرز المتغيرات في توجهات
          السياسة النقدية مع بداية العام،
          وتوقعات التضخم والنمو، وإعادة توزيع
          المحافظ الاستثمارية.

        </Paragraph>

        <SubHeading>
          الربع الثاني: أبريل – يونيو 2027
        </SubHeading>

        <Paragraph>

          قد تتضح خلال هذه الفترة آثار القرارات
          النقدية السابقة، مع ظهور المزيد من
          البيانات المتعلقة بالنشاط الاقتصادي
          وسوق العمل والطلب الاستثماري.

        </Paragraph>

        <SubHeading>
          الربع الثالث: يوليو – سبتمبر 2027
        </SubHeading>

        <Paragraph>

          ينبغي مراقبة تغير توقعات الفائدة
          للنصف الثاني من العام، والتدفقات
          الاستثمارية، ومستويات السيولة في
          الأسواق العالمية.

        </Paragraph>

        <SubHeading>
          الربع الرابع: أكتوبر – ديسمبر 2027
        </SubHeading>

        <Paragraph>

          يمثل الربع الأخير الفترة الأكثر
          ارتباطاً بأهداف نهاية العام المنشورة
          من البنوك، مع أهمية متابعة إعادة
          موازنة المحافظ الاستثمارية والبيانات
          الاقتصادية التي قد تؤثر في الأسعار.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          10. GOLD SCENARIOS
      ====================================================== */}

      <ArticleSection
        id="gold-scenarios"
        eyebrow="تحليل السيناريوهات"
        title="هل سيرتفع الذهب أم ينخفض في عام 2027؟"
      >

        <Paragraph>

          بدلاً من الاعتماد على هدف سعري واحد،
          يمكن دراسة مجموعة من السيناريوهات
          لفهم تأثير الظروف الاقتصادية المختلفة
          في مستقبل أسعار الذهب.

        </Paragraph>

        <GoldScenarioCards />

        <Note title="كيفية قراءة السيناريوهات">

          تمثل النطاقات الصعودية والهبوطية
          أمثلة افتراضية لاختبار تحركات الأسعار،
          وليست توقعات إحصائية أو أهدافاً
          رسمية صادرة عن جميع البنوك.

          أما النطاق الأساسي فيعكس حدود أهداف
          نهاية العام ضمن عينة التقرير.

        </Note>

        <SubHeading>
          هل يمكن أن تصل أونصة الذهب إلى 5,000 دولار؟
        </SubHeading>

        <Paragraph>

          يمثل مستوى 5,000 دولار أحد الأهداف
          المدرجة ضمن توقعات البنوك لعام 2027.

          وقد تدعم الظروف النقدية المناسبة
          والطلب الاستثماري القوي إمكانية
          الوصول إليه، لكن ذلك لا يعني أنه
          مستوى مضمون أو أن الأسعار ستتحرك
          نحوه دون تصحيحات.

        </Paragraph>

        <SubHeading>
          هل يمكن أن ينخفض الذهب خلال 2027؟
        </SubHeading>

        <Paragraph>

          يظل انخفاض أسعار الذهب ممكناً،
          حتى عندما تتضمن بعض توقعات البنوك
          أهدافاً مرتفعة.

          وقد يتعرض الذهب لضغوط نتيجة ارتفاع
          العوائد الحقيقية أو تراجع الطلب
          أو عمليات جني الأرباح.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          11. GOLD PRICES IN ARAB COUNTRIES
      ====================================================== */}

      <ArticleSection
        id="arab-gold-prices"
        eyebrow="الأسواق العربية"
        title="توقعات أسعار الذهب في الدول العربية لعام 2027"
      >

        <Paragraph>

          يهتم المستثمرون والمستهلكون في الدول
          العربية بسعر غرام الذهب بالعملة
          المحلية، خصوصاً عيارات 24 و22 و21 و18.

          وتعتمد الأسعار المحلية على السعر
          العالمي للأونصة، وسعر صرف الدولار،
          ونسبة نقاء الذهب، بالإضافة إلى
          التكاليف المحلية.

        </Paragraph>

        <ArabGoldPricesTable />

        <SubHeading>
          توقعات أسعار الذهب في السعودية 2027
        </SubHeading>

        <Paragraph>

          باستخدام متوسط أهداف نهاية العام
          ضمن عينة التقرير، يبلغ سعر غرام الذهب
          المتوقع في السعودية لعيار 24 نحو{" "}

          <Strong>
            {formatNumber(
              calculateGramPrice(
                averageForecast,
                24,
                3.75
              ),
              2
            )} ريال سعودي
          </Strong>

          ، بينما يبلغ سعر غرام عيار 21 نحو{" "}

          <Strong>
            {formatNumber(
              calculateGramPrice(
                averageForecast,
                21,
                3.75
              ),
              2
            )} ريال سعودي
          </Strong>

          ، قبل المصنعية والضرائب.

        </Paragraph>

        <SubHeading>
          توقعات أسعار الذهب في الإمارات 2027
        </SubHeading>

        <Paragraph>

          وفق سعر التحويل الاسمي المستخدم
          في التقرير، يبلغ سعر غرام الذهب
          المتوقع في الإمارات لعيار 24 نحو{" "}

          <Strong>
            {formatNumber(
              calculateGramPrice(
                averageForecast,
                24,
                3.6725
              ),
              2
            )} درهم إماراتي
          </Strong>

          ، ويبلغ سعر غرام عيار 22 نحو{" "}

          <Strong>
            {formatNumber(
              calculateGramPrice(
                averageForecast,
                22,
                3.6725
              ),
              2
            )} درهم إماراتي
          </Strong>

          ، وفق الافتراضات نفسها.

        </Paragraph>

        <SubHeading>
          توقعات أسعار الذهب في الكويت 2027
        </SubHeading>

        <Paragraph>

          يتأثر سعر الذهب في الكويت بالسعر
          العالمي للأونصة وسعر صرف الدينار
          الكويتي مقابل الدولار.

          ونظراً إلى ارتباط الدينار الكويتي
          بسلة من العملات، فقد تختلف نتائج
          التحويل بحسب سعر الصرف المعتمد
          وقت شراء الذهب.

        </Paragraph>

        <SubHeading>
          توقعات أسعار الذهب في مصر 2027
        </SubHeading>

        <Paragraph>

          يعد سعر صرف الجنيه المصري أحد
          العوامل الرئيسية المؤثرة في أسعار
          الذهب المحلية في مصر.

          ولذلك قد يرتفع سعر غرام الذهب
          بالجنيه المصري حتى في فترات
          استقرار السعر العالمي للأونصة،
          إذا تراجعت قيمة العملة المحلية.

        </Paragraph>

        <Paragraph>

          ولا يمكن تحديد سعر محلي موثوق
          لعام 2027 دون افتراض واضح لمسار
          سعر الصرف، إضافة إلى تكاليف
          البيع والشراء المحلية.

        </Paragraph>

        <SubHeading>
          توقعات الذهب في قطر والبحرين وعُمان والأردن
        </SubHeading>

        <Paragraph>

          يساعد ارتباط العملات المحلية في
          هذه الدول بالدولار الأمريكي على
          إجراء مقارنات تقريبية بين أسعار
          الذهب العالمية والمحلية، وفق
          أسعار التحويل الاسمية الموضحة
          في الجدول.

        </Paragraph>

        <GoldPriceFormula />

      </ArticleSection>

      {/* =====================================================
          12. GOLD PRICES BY KARAT
      ====================================================== */}

      <ArticleSection
        id="gold-karat-prices"
        eyebrow="أسعار غرام الذهب"
        title="توقعات أسعار الذهب عيار 24 و22 و21 و18 لعام 2027"
      >

        <Paragraph>

          تختلف قيمة غرام الذهب بحسب نسبة
          نقائه. ويحتوي الذهب عيار 24 على
          أعلى نسبة من الذهب الخالص مقارنة
          بالعيارات الأقل.

        </Paragraph>

        <GoldKaratForecastTable />

        <SubHeading>
          توقعات سعر الذهب عيار 24
        </SubHeading>

        <Paragraph>

          يستخدم عيار 24 بصورة واسعة في
          السبائك الذهبية، ويتميز بارتفاع
          نسبة الذهب الخالص فيه.

          ويبلغ سعر الغرام المتوقع وفق متوسط
          أهداف العينة نحو{" "}

          <Strong>
            {formatNumber(
              calculateGramPrice(
                averageForecast,
                24
              ),
              2
            )} دولار
          </Strong>

          {" "}قبل تكاليف البيع والشراء.

        </Paragraph>

        <SubHeading>
          توقعات سعر الذهب عيار 21
        </SubHeading>

        <Paragraph>

          يعد عيار 21 من العيارات الشائعة
          في عدد من الأسواق العربية،
          وتبلغ نسبة الذهب الخالص فيه
          87.5% من الوزن.

          وتبلغ قيمة الغرام وفق متوسط
          توقعات نهاية العام نحو{" "}

          <Strong>
            {formatNumber(
              calculateGramPrice(
                averageForecast,
                21
              ),
              2
            )} دولار
          </Strong>

          .

        </Paragraph>

        <SubHeading>
          توقعات سعر الذهب عيار 18
        </SubHeading>

        <Paragraph>

          يحتوي الذهب عيار 18 على نسبة
          ذهب تبلغ 75% من الوزن، بينما
          تتكون النسبة المتبقية من معادن
          أخرى.

          وقد يختلف سعر المجوهرات الفعلي
          بدرجة ملحوظة عن قيمة الذهب
          المحتوى فيها نتيجة التصميم
          والمصنعية وهوامش البيع.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          13. GOLD INVESTMENT
      ====================================================== */}

      <ArticleSection
        id="gold-investment"
        eyebrow="الاستثمار في الذهب"
        title="هل الذهب استثمار مناسب في عام 2027؟"
      >

        <Paragraph>

          يعتمد مدى ملاءمة الذهب للاستثمار
          على الأهداف المالية والأفق الزمني
          والقدرة على تحمل المخاطر.

          ولا ينبغي اعتبار توقعات البنوك
          وحدها سبباً كافياً لاتخاذ قرار
          الشراء أو البيع.

        </Paragraph>

        <SubHeading>
          شراء الذهب الفعلي
        </SubHeading>

        <Paragraph>

          يوفر شراء السبائك والعملات الذهبية
          ملكية مباشرة للمعدن، لكنه قد يتضمن
          تكاليف تخزين وتأمين وفروقاً بين
          أسعار الشراء والبيع.

        </Paragraph>

        <SubHeading>
          الاستثمار في صناديق الذهب
        </SubHeading>

        <Paragraph>

          توفر بعض الصناديق الاستثمارية
          إمكانية التعرض لحركة الذهب دون
          الحاجة إلى تخزين السبائك بصورة
          مباشرة.

          وتختلف هذه المنتجات بحسب طريقة
          تتبع السعر والرسوم والأصول
          التي يحتفظ بها الصندوق.

        </Paragraph>

        <SubHeading>
          تداول الذهب عبر عقود الفروقات
        </SubHeading>

        <Paragraph>

          تتيح عقود الفروقات التعرض لتحركات
          أسعار الذهب صعوداً وهبوطاً، دون
          امتلاك المعدن الفعلي.

          وقد يؤدي استخدام الرافعة المالية
          إلى تضخيم الأرباح والخسائر،
          ولذلك تختلف طبيعة هذه المنتجات
          ومخاطرها عن الاستثمار في الذهب
          الفعلي.

        </Paragraph>

        <Note title="الاستثمار ليس مرادفاً للتداول" tone="amber">

          ينبغي التمييز بين شراء الذهب
          للاحتفاظ به على المدى الطويل
          وبين المضاربة على تحركات الأسعار
          باستخدام عقود مالية ذات رافعة.

        </Note>

      </ArticleSection>

      {/* =====================================================
          14. GOLD BROKERS
      ====================================================== */}

      <ArticleSection
        id="gold-brokers"
        eyebrow="شركات التداول"
        title="كيفية اختيار شركة لتداول الذهب خلال 2027"
      >

        <Paragraph>

          لا يعتمد اختيار شركة تداول الذهب
          على توقعات اتجاه الأسعار، وإنما
          على مجموعة من المعايير التنظيمية
          والفنية والمالية المتعلقة بجودة
          الوسيط وتكاليف تنفيذ الصفقات.

        </Paragraph>

        <ArticleList
          items={[
            "التراخيص والجهات الرقابية التي تخضع لها الشركة.",
            "متوسط فروق أسعار الذهب وليس الحد الأدنى المعلن فقط.",
            "العمولات المباشرة ورسوم الاحتفاظ بالصفقات.",
            "الرافعة المالية ومتطلبات الهامش.",
            "جودة تنفيذ أوامر التداول والانزلاق السعري.",
            "مواصفات عقد الذهب والحد الأدنى لحجم الصفقة.",
            "سياسات الإيداع والسحب وحماية أموال العملاء.",
            "مدى توفر الحسابات والمنصات في دولة المتداول.",
          ]}
        />

        <Paragraph>

          يوفر بروكر العرب صفحات مستقلة
          لتقييم الوسطاء ومقارنة الحسابات
          والتراخيص والرسوم، بهدف مساعدة
          المتداول على دراسة الخيارات
          المتاحة قبل فتح حساب.

        </Paragraph>

        <GoldTradingCTA />

        <SubHeading>
          أدوات تساعدك على إدارة صفقات الذهب
        </SubHeading>

        <Paragraph>

          يمكن استخدام حاسبات التداول
          لتقدير الهامش والمخاطرة وحجم
          الصفقة والأثر المالي المحتمل
          لتحركات الذهب.

          وتظل هذه الحسابات تقديرية،
          ولا تضمن تنفيذ الأوامر بالسعر
          المتوقع.

        </Paragraph>

        <GoldTradingTools />

        <Link
          href="/articles/best-time-to-trade-gold"
          className="font-bold text-[#176ac8] hover:underline"
        >
          اقرأ أيضاً: أفضل أوقات تداول الذهب خلال اليوم.
        </Link>

      </ArticleSection>

      {/* =====================================================
          15. GOLD TRADING RISKS
      ====================================================== */}

      <ArticleSection
        id="gold-trading-risks"
        eyebrow="إدارة المخاطر"
        title="أبرز مخاطر تداول الذهب خلال عام 2027"
      >

        <Paragraph>

          حتى عند وجود توقعات إيجابية
          لأسعار الذهب على المدى الطويل،
          قد تشهد السوق تحركات معاكسة
          خلال فترات زمنية قصيرة أو
          ممتدة.

        </Paragraph>

        <SubHeading>
          مخاطر التقلبات السعرية
        </SubHeading>

        <Paragraph>

          قد تتحرك أسعار الذهب بشكل حاد
          عند صدور البيانات الاقتصادية
          أو تغير توقعات الفائدة أو حدوث
          تطورات سياسية واقتصادية مفاجئة.

        </Paragraph>

        <SubHeading>
          مخاطر الرافعة المالية
        </SubHeading>

        <Paragraph>

          يمكن أن تؤدي الرافعة المالية
          إلى تضخيم الأثر المالي لتحركات
          الذهب، وقد يتعرض الحساب لخسائر
          كبيرة نتيجة حركة سعرية محدودة
          نسبياً عند استخدام حجم عقد
          مرتفع.

        </Paragraph>

        <SubHeading>
          مخاطر الاعتماد على توقعات البنوك
        </SubHeading>

        <Paragraph>

          لا تقدم التوقعات السنوية إشارات
          دقيقة لمواعيد الدخول والخروج،
          كما لا تحدد بالضرورة حجم
          التصحيحات التي قد تحدث خلال
          الفترة المستهدفة.

        </Paragraph>

        <ArticleList
          items={[
            "عدم التعامل مع الأهداف السعرية باعتبارها نتائج مضمونة.",
            "مراعاة تكاليف التداول والعمولات وفروق الأسعار.",
            "فهم مواصفات العقد قبل استخدام الرافعة المالية.",
            "عدم إغفال احتمالات تحرك السوق عكس التوقعات.",
            "مراعاة القدرة المالية على تحمل الخسائر.",
          ]}
        />

        <Note title="تحذير المخاطر" tone="amber">

          ينطوي تداول عقود الفروقات على
          مخاطر مرتفعة لخسارة رأس المال،
          وقد لا يكون مناسباً لجميع
          المستثمرين. لا تمثل توقعات
          البنوك توصية مباشرة بفتح
          صفقات شراء أو بيع.

        </Note>

      </ArticleSection>

      {/* =====================================================
          16. BROKER ALARAB EDITORIAL OUTLOOK
      ====================================================== */}

      <ArticleSection
        id="editorial-outlook"
        eyebrow="خلاصة فريق الأبحاث"
        title="خلاصة بروكر العرب لتوقعات أسعار الذهب 2027"
      >

        <Paragraph>

          تشير الأهداف المدرجة في هذا
          التقرير إلى وجود اختلاف ملموس
          بين توقعات المؤسسات المالية
          لأسعار الذهب، رغم اعتمادها على
          مجموعة متقاربة من المتغيرات
          الاقتصادية الأساسية.

        </Paragraph>

        <Paragraph>

          ويتراوح نطاق أهداف نهاية العام
          ضمن العينة بين{" "}

          <Strong>
            {formatUSD(lowestForecast)}
          </Strong>

          {" "}و{" "}

          <Strong>
            {formatUSD(highestForecast)}
          </Strong>

          {" "}للأونصة، بينما يبلغ المتوسط
          الحسابي لهذه الأهداف{" "}

          <Strong>
            {formatUSD(averageForecast)}
          </Strong>

          .

        </Paragraph>

        <Paragraph>

          ويرى فريق أبحاث بروكر العرب أن
          متابعة العوائد الحقيقية الأمريكية
          واتجاه الدولار ومشتريات البنوك
          المركزية وتدفقات صناديق الذهب
          تعد من العناصر المهمة لفهم
          تحركات المعدن النفيس.

        </Paragraph>

        <Paragraph>

          ولا ينبغي إغفال احتمال حدوث
          تصحيحات سعرية خلال العام،
          حتى في حال تحسن الظروف
          الاقتصادية الداعمة للذهب.

        </Paragraph>

        <Paragraph>

          وتبقى القيمة الأساسية لتوقعات
          البنوك في فهم الافتراضات
          الاقتصادية والسيناريوهات
          المحتملة، لا في التعامل مع
          الأهداف السعرية على أنها
          نتائج مستقبلية مؤكدة.

        </Paragraph>

        <RelatedGoldResearch />

      </ArticleSection>

      {/* =====================================================
          17. FREQUENTLY ASKED QUESTIONS
      ====================================================== */}

      <ArticleSection
        id="faq"
        eyebrow="أسئلة وأجوبة"
        title="الأسئلة الشائعة حول توقعات أسعار الذهب 2027"
      >

        <FAQItem question="ما توقعات أسعار الذهب لعام 2027؟">

          تتراوح أهداف نهاية عام 2027
          ضمن عينة البنوك التي يتناولها
          التقرير بين 4,100 و5,000 دولار
          للأونصة، مع اختلاف التوقعات
          بحسب المؤسسة والفترة المستهدفة.

        </FAQItem>

        <FAQItem question="هل سيصل الذهب إلى 5,000 دولار في 2027؟">

          يمثل مستوى 5,000 دولار أحد
          الأهداف المدرجة في توقعات البنوك،
          لكن إمكانية الوصول إليه تعتمد
          على الظروف الاقتصادية والطلب
          العالمي والسياسة النقدية.

        </FAQItem>

        <FAQItem question="هل يمكن أن ينخفض سعر الذهب في 2027؟">

          نعم، يمكن أن ينخفض الذهب نتيجة
          ارتفاع العوائد الحقيقية أو قوة
          الدولار أو تراجع الطلب الاستثماري
          أو عمليات جني الأرباح.

        </FAQItem>

        <FAQItem question="كم يبلغ متوسط توقعات البنوك للذهب بنهاية 2027؟">

          يبلغ المتوسط الحسابي لأهداف
          نهاية العام ضمن عينة التقرير{" "}

          {formatUSD(averageForecast)}

          {" "}للأونصة. ولا يمثل هذا الرقم
          إجماعاً شاملاً لجميع البنوك العالمية.

        </FAQItem>

        <FAQItem question="ما توقعات سعر الذهب في السعودية 2027؟">

          وفق متوسط أهداف العينة وسعر
          التحويل المستخدم، يبلغ سعر
          غرام الذهب عيار 24 المتوقع نحو{" "}

          {formatNumber(
            calculateGramPrice(
              averageForecast,
              24,
              3.75
            ),
            2
          )}

          {" "}ريال سعودي، قبل المصنعية
          والضرائب وهوامش البيع.

        </FAQItem>

        <FAQItem question="كم سيكون سعر الذهب عيار 21 في 2027؟">

          وفق متوسط أهداف نهاية العام
          ضمن العينة، تبلغ قيمة غرام
          الذهب عيار 21 نحو{" "}

          {formatNumber(
            calculateGramPrice(
              averageForecast,
              21
            ),
            2
          )}

          {" "}دولار أمريكي، قبل تحويله
          إلى العملات المحلية وإضافة
          التكاليف.

        </FAQItem>

        <FAQItem question="كيف يؤثر خفض الفائدة الأمريكية على الذهب؟">

          قد يدعم خفض الفائدة أسعار الذهب
          إذا أدى إلى تراجع العوائد الحقيقية
          أو ضعف الدولار، إلا أن استجابة
          السوق تعتمد أيضاً على التوقعات
          السابقة والظروف الاقتصادية.

        </FAQItem>

        <FAQItem question="هل مشتريات البنوك المركزية ترفع أسعار الذهب؟">

          قد تدعم مشتريات البنوك المركزية
          الطلب العالمي على الذهب، لكن
          الأسعار تتأثر كذلك بالدولار
          والعوائد والتدفقات الاستثمارية
          والمعروض من المعدن.

        </FAQItem>

        <FAQItem question="هل عام 2027 مناسب لشراء الذهب؟">

          تعتمد ملاءمة شراء الذهب على
          الهدف المالي والأفق الزمني
          والقدرة على تحمل المخاطر.
          ولا يكفي الاعتماد على توقعات
          الأسعار وحدها لاتخاذ القرار.

        </FAQItem>

        <FAQItem question="ما الفرق بين شراء الذهب وتداول XAUUSD؟">

          قد يمنح شراء السبائك ملكية
          مباشرة للذهب، بينما يتيح
          تداول XAUUSD عبر عقود
          الفروقات التعرض لتحركات
          السعر دون امتلاك المعدن،
          مع مخاطر إضافية عند
          استخدام الرافعة المالية.

        </FAQItem>

        <FAQItem question="هل توقعات البنوك العالمية للذهب دقيقة دائماً؟">

          لا، تعتمد التوقعات على
          افتراضات اقتصادية وبيانات
          متاحة في وقت إعدادها،
          وقد تختلف النتائج الفعلية
          نتيجة تغير ظروف الأسواق.

        </FAQItem>

        <FAQItem question="كم غراماً تحتوي أونصة الذهب؟">

          تحتوي أونصة تروي المستخدمة
          في تسعير الذهب عالمياً على
          نحو 31.1034768 غراماً.

        </FAQItem>

      </ArticleSection>

      {/* =====================================================
          18. SOURCES AND METHODOLOGY
      ====================================================== */}

      <ArticleSection
        id="sources"
        eyebrow="المصادر والمنهجية"
        title="مصادر ومنهجية إعداد تقرير توقعات الذهب 2027"
      >

        <Paragraph>

          يجمع التقرير بين توقعات
          المؤسسات المالية والمعلومات
          الاقتصادية المتعلقة بالسياسة
          النقدية والعوائد والتضخم
          والطلب العالمي على الذهب.

        </Paragraph>

        <SubHeading>
          منهجية المقارنة بين البنوك
        </SubHeading>

        <ArticleList
          items={[
            "استخدام الدولار الأمريكي لكل أونصة تروي كوحدة موحدة للمقارنة.",
            "الفصل بين أهداف نهاية العام ومتوسطات الأسعار السنوية.",
            "حساب المتوسط الحسابي لأهداف نهاية العام دون إدراج المتوسطات السنوية.",
            "توضيح تاريخ نشر التوقعات والفترة المستهدفة.",
            "حساب أسعار الغرام وفق وزن الأونصة ونسبة نقاء الذهب.",
            "استخدام أسعار التحويل الاسمية التقريبية للعملات في الحسابات المحلية.",
            "الفصل بين التوقعات المنشورة والسيناريوهات الافتراضية المستخدمة لأغراض التحليل.",
          ]}
        />

        <SubHeading>
          المصادر والمراجع المالية
        </SubHeading>

        <GoldResearchSources />

        <div className="mt-7 rounded-[14px] border border-[#e3eaf1] bg-[#f8fafc] p-5 sm:p-6">

          <h3 className="mb-3 text-[15px] font-black text-[#102747]">
            إخلاء المسؤولية
          </h3>

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            أعد فريق أبحاث بروكر العرب
            هذا التقرير لأغراض المعلومات
            والتعليم المالي.

            ولا يمثل المحتوى توصية استثمارية
            أو دعوة لشراء الذهب أو بيعه
            أو تداول أي أداة مالية.

            وتعكس توقعات المؤسسات المالية
            تقديراتها في تواريخ نشرها،
            وقد تتغير وفق تطورات الأسواق
            والبيانات الاقتصادية.

            كما أن الأسعار المحلية المحسوبة
            لا تشمل المصنعية والضرائب
            وتكاليف التداول وهوامش التجار.

            وقد يحصل بروكر العرب على
            عمولات من بعض الشراكات
            التجارية مع شركات التداول.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}

/* ================= END ARTICLE ================= */