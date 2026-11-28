import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import ArticleLayout from "@/app/components/editorial/ArticleLayout";

import {
  ArticleSection,
  SubHeading,
  Paragraph,
  Strong,
  ArticleList,
  Note,
} from "@/app/components/editorial/ArticleComponents";

import {
  createArticleMetadata,
  ArticleStructuredData,
  type ArticleSEOConfig,
} from "@/app/components/editorial/ArticleSEO";

/* =========================================================
   BROKER ALARAB
   ECONOMIC RESEARCH
   US INFLATION AND GOLD PRICES
========================================================= */

const SLUG = "us-inflation-impact-on-gold";

const CATEGORY = "مقالات الأسواق والاقتصاد";

const CATEGORY_HREF =
  "/articles/category/financial-markets-economy";

const HERO_IMAGE =
  "/articles/us-inflation-impact-on-gold.webp";

const ARTICLE = {
  title:
    "تأثير بيانات التضخم الأمريكية CPI على الذهب",

  seoTitle:
    "تأثير التضخم الأمريكي CPI على أسعار الذهب",

  shortTitle:
    "تأثير التضخم الأمريكي على الذهب",

  description:
    "تقرير اقتصادي يدرس تأثير بيانات التضخم الأمريكية CPI على أسعار الذهب، مع مقارنة تاريخية بالأرقام وتحليل العلاقة بين التضخم والفائدة الحقيقية والدولار الأمريكي وحركة XAU/USD.",

  subcategory:
    "الذهب والمؤشرات الاقتصادية",

  author:
    "فريق تحليلات بروكر العرب",

  published:
    "2026-11-27",

  modified:
    "2026-11-27",
};

/* =========================================================
   OFFICIAL DATA AND RESEARCH SOURCES
========================================================= */

const sources = [
  {
    title:
      "U.S. Bureau of Labor Statistics – Historical Consumer Price Index",
    url:
      "https://www.bls.gov/regions/mid-atlantic/data/consumerpriceindexhistorical_us_table.htm",
  },
  {
    title:
      "U.S. Bureau of Labor Statistics – CPI Frequently Asked Questions",
    url:
      "https://www.bls.gov/cpi/questions-and-answers.htm",
  },
  {
    title:
      "FRED – Consumer Price Index (CPIAUCSL)",
    url:
      "https://fred.stlouisfed.org/series/CPIAUCSL",
  },
  {
    title:
      "FRED – 10-Year Treasury Inflation-Indexed Yield (DFII10)",
    url:
      "https://fred.stlouisfed.org/series/DFII10",
  },
  {
    title:
      "Federal Reserve – Monetary Policy Strategy and Inflation Objective",
    url:
      "https://www.federalreserve.gov/monetarypolicy/monetary-policy-strategy-tools-and-communications-statement-on-longer-run-goals-monetary-policy-strategy-2025.htm",
  },
  {
    title:
      "World Gold Council – Gold Outlook 2022",
    url:
      "https://www.gold.org/goldhub/research/gold-outlook-2022",
  },
  {
    title:
      "World Gold Council – Gold Market Commentary December 2022",
    url:
      "https://www.gold.org/goldhub/research/gold-market-commentary-december-2022",
  },
  {
    title:
      "World Gold Council – Gold Market Commentary December 2023",
    url:
      "https://www.gold.org/goldhub/research/gold-market-commentary-december-2023",
  },
  {
    title:
      "World Gold Council – Gold's 2024 Performance",
    url:
      "https://www.gold.org/goldhub/gold-focus/2025/01/golds-2024-performance-best-14-years",
  },
  {
    title:
      "World Gold Council – Gold as a Strategic Inflation Hedge",
    url:
      "https://www.gold.org/goldhub/research/beyond-cpi-gold-as-a-strategic-inflation-hedge",
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
    "تقرير اقتصادي حول تأثير بيانات التضخم الأمريكية CPI وأسعار الفائدة الحقيقية والدولار الأمريكي على أسعار الذهب XAU/USD",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  tags: [
    "الذهب",
    "التضخم الأمريكي",
    "CPI",
    "XAU/USD",
    "أسعار الفائدة",
    "الفائدة الحقيقية",
    "الدولار الأمريكي",
    "الاحتياطي الفيدرالي",
    "المؤشرات الاقتصادية",
  ],

  keywords: [
    "تأثير التضخم على الذهب",
    "تأثير التضخم الأمريكي على أسعار الذهب",
    "تأثير مؤشر CPI على الذهب",
    "العلاقة بين التضخم والذهب",
    "تأثير بيانات التضخم الأمريكية",
    "هل يرتفع الذهب مع التضخم",
    "تأثير الفائدة الحقيقية على الذهب",
    "التضخم والدولار والذهب",
    "تداول الذهب وقت أخبار التضخم",
    "تحليل أسعار الذهب XAUUSD",
    "مؤشر أسعار المستهلك الأمريكي",
  ],

  about: [
    {
      "@type": "Thing",
      name: "Gold",
    },
    {
      "@type": "Thing",
      name: "Consumer Price Index",
    },
    {
      "@type": "Thing",
      name: "Inflation",
    },
    {
      "@type": "Thing",
      name: "Real Interest Rates",
    },
    {
      "@type": "Organization",
      name: "Federal Reserve",
      url: "https://www.federalreserve.gov",
    },
    {
      "@type": "Organization",
      name: "U.S. Bureau of Labor Statistics",
      url: "https://www.bls.gov",
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
    id: "key-findings",
    label: "أهم نتائج التقرير",
  },
  {
    id: "what-is-cpi",
    label: "ما هو مؤشر التضخم الأمريكي CPI؟",
  },
  {
    id: "inflation-gold-relationship",
    label: "العلاقة بين التضخم والذهب",
  },
  {
    id: "historical-comparison",
    label: "المقارنة التاريخية بالأرقام",
  },
  {
    id: "historical-analysis",
    label: "تحليل أداء الذهب 2021–2024",
  },
  {
    id: "real-interest-rates",
    label: "تأثير العوائد الحقيقية",
  },
  {
    id: "us-dollar",
    label: "تأثير الدولار الأمريكي",
  },
  {
    id: "cpi-surprise",
    label: "مفاجآت بيانات التضخم",
  },
  {
    id: "inflation-scenarios",
    label: "سيناريوهات حركة الذهب",
  },
  {
    id: "trading-cpi",
    label: "تداول الذهب وقت صدور CPI",
  },
  {
    id: "inflation-hedge",
    label: "هل الذهب يحمي من التضخم؟",
  },
  {
    id: "broker-selection",
    label: "اختيار وسيط لتداول الذهب",
  },
  {
    id: "editorial-conclusion",
    label: "تحليل وخلاصة بروكر العرب",
  },
  {
    id: "faq",
    label: "الأسئلة الشائعة",
  },
  {
    id: "sources",
    label: "المنهجية والمصادر",
  },
];

/* =========================================================
   HISTORICAL RESEARCH DATA

   CPI: December year-over-year, all items.
   GOLD: Annual USD gold returns reported by WGC.

   Real return:
   ((1 + nominal return) / (1 + CPI inflation) - 1)
========================================================= */

const historicalData = [
  {
    year: "2021",
    inflation: 7.0,
    gold: -4.3,
    context:
      "تسارع التضخم وتزايد توقعات تشديد السياسة النقدية",
  },
  {
    year: "2022",
    inflation: 6.5,
    gold: 0.4,
    context:
      "ارتفاع الفائدة والعوائد الحقيقية وقوة الدولار",
  },
  {
    year: "2023",
    inflation: 3.4,
    gold: 15.0,
    context:
      "تباطؤ التضخم وتغير توقعات الفائدة والطلب على الذهب",
  },
  {
    year: "2024",
    inflation: 2.9,
    gold: 25.5,
    context:
      "الطلب الاستثماري ومشتريات البنوك المركزية والمخاطر الجيوسياسية",
  },
];

function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function calculateRealReturn(
  nominalReturn: number,
  inflation: number
) {
  return (
    ((1 + nominalReturn / 100) /
      (1 + inflation / 100) -
      1) *
    100
  );
}

/* =========================================================
   EDITORIAL TABLE COMPONENT

   Local to this article.
   No changes to shared editorial components.
========================================================= */

function ResearchTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div className="my-7">

      <div className="overflow-x-auto rounded-[16px] border border-[#dce6ef]">

        <table className="w-full min-w-[500px] border-collapse text-center">

          <thead className="bg-[#102747] text-white">

            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-3 py-4 text-center text-[13px] font-bold leading-6 sm:px-5 sm:text-[15px]"
                >
                  {header}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (

              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f6f9fc]"
                }
              >

                {row.map((cell, cellIndex) => (

                  <td
                    key={cellIndex}
                    className={`border-t border-[#e3eaf1] px-3 py-4 text-center text-[13px] leading-7 sm:px-5 sm:text-[15px] ${
                      cellIndex === 0
                        ? "font-bold text-[#102747]"
                        : "text-[#475569]"
                    }`}
                  >
                    {cell}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {caption && (
        <p className="mt-3 text-[12px] leading-6 text-[#64748b] sm:text-[13px]">
          {caption}
        </p>
      )}

    </div>
  );
}

/* =========================================================
   FEATURED GOLD BROKERS – SUPABASE
========================================================= */

const goldBrokers = [
  {
    slug: "icmarkets",
    name: "IC Markets",
    description:
      "تعرف على حسابات تداول الذهب وتكاليف التداول وشروط التنفيذ.",
  },
  {
    slug: "pepperstone",
    name: "Pepperstone",
    description:
      "اطلع على منصات تداول الذهب وأنواع الحسابات المتاحة.",
  },
  {
    slug: "exness",
    name: "Exness",
    description:
      "راجع شروط تداول الذهب والرافعة المالية وأنواع الحسابات.",
  },
];

async function FeaturedGoldBrokers() {

  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("slug, logo, rating, real_account_url")
    .in(
      "slug",
      goldBrokers.map((broker) => broker.slug)
    )
    .eq("publication_status", "published");

  const brokers = goldBrokers.flatMap((broker) => {

    const databaseBroker = data?.find(
      (item) => item.slug === broker.slug
    );

    if (!databaseBroker) return [];

    return [
      {
        ...broker,
        ...databaseBroker,
      },
    ];

  });

  if (!brokers.length) return null;

  return (

    <aside className="my-8 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-[#f7faff]">

      <div className="bg-[#102747] px-5 py-4 text-center sm:px-7">

        <h3 className="text-[19px] font-black text-white sm:text-[24px]">
          شركات مختارة لتداول الذهب
        </h3>

        <p className="mt-2 text-[12px] leading-6 text-[#dce6ef] sm:text-[14px]">
          قارن تقييمات الوسطاء وحسابات تداول الذهب
        </p>

      </div>

      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3 sm:p-5">

        {brokers.map((broker) => (

          <div
            key={broker.slug}
            className="flex flex-col rounded-[14px] border border-[#dce6ef] bg-white p-4"
          >

            <div className="flex h-[78px] items-center justify-center">

              {broker.logo ? (

                <Image
                  src={broker.logo}
                  alt={`شعار شركة ${broker.name}`}
                  width={180}
                  height={65}
                  unoptimized
                  className="h-[58px] w-[170px] object-contain scale-[1.8]"
                />

              ) : (

                <span className="text-[21px] font-black text-[#102747]">
                  {broker.name}
                </span>

              )}

            </div>

            <div className="mt-2 flex items-center justify-center gap-3">

              <h4
                dir="ltr"
                className="text-[18px] font-black text-[#102747]"
              >
                {broker.name}
              </h4>

              {broker.rating != null && (

                <div
                  dir="ltr"
                  className="flex items-center gap-1 rounded-md bg-[#fff8e8] px-2 py-1 text-[13px] font-bold text-[#9a721c]"
                >

                  <span>★</span>

                  {Number(broker.rating).toFixed(2)}

                </div>

              )}

            </div>

            <p className="my-4 flex-1 text-center text-[13px] leading-7 text-[#475569]">
              {broker.description}
            </p>

            <div className="grid grid-cols-2 gap-2">

              <Link
                href={`/brokers/${broker.slug}`}
                className="flex min-h-[42px] items-center justify-center rounded-[8px] border border-[#176ac8] bg-white px-2 py-2 text-center text-[13px] font-bold text-[#176ac8] transition-colors hover:bg-[#edf3fa]"
              >
                تقييم الشركة
              </Link>

              {broker.real_account_url ? (
  <a
    href={broker.real_account_url}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="flex min-h-[42px] items-center justify-center rounded-[8px] bg-[#176ac8] px-2 py-2 text-center text-[13px] font-bold text-white transition-colors hover:bg-[#1058a9]"
  >
    فتح حساب
  </a>
) : (
  <span
    className="flex min-h-[42px] items-center justify-center rounded-[8px] bg-[#e2e8f0] px-2 py-2 text-center text-[13px] font-bold text-[#64748b]"
  >
    غير متاح
  </span>
)}

            </div>

          </div>

        ))}

      </div>

      <div className="px-5 pb-5 text-center">

        <Link
          href="/best-brokers/gold"
          className="inline-flex items-center gap-2 text-[14px] font-bold text-[#176ac8] hover:underline"
        >
          مقارنة جميع شركات تداول الذهب
          <span aria-hidden="true">←</span>
        </Link>

        <p className="mt-3 text-[11px] leading-6 text-[#64748b]">
          قد يحصل بروكر العرب على مقابل من روابط
          الإحالة التجارية. تختلف شروط التداول
          وتوفر الحسابات بحسب الدولة والكيان التنظيمي.
          ينطوي تداول عقود الفروقات على مخاطر مرتفعة.
        </p>

      </div>

    </aside>

  );
}

/* =========================================================
   RESEARCH KEY FINDINGS
========================================================= */

function ResearchHighlights() {

  const highlights = [
    {
      label: "أعلى تضخم ضمن العينة",
      value: "7.0%",
      description: "ديسمبر 2021",
      color: "#176ac8",
    },
    {
      label: "عائد الذهب في 2021",
      value: "-4.3%",
      description: "رغم ارتفاع التضخم",
      color: "#b45309",
    },
    {
      label: "عائد الذهب في 2024",
      value: "+25.5%",
      description: "مع تضخم سنوي 2.9%",
      color: "#15803d",
    },
    {
      label: "هدف التضخم طويل الأجل",
      value: "2%",
      description: "وفق مؤشر PCE",
      color: "#102747",
    },
  ];

  return (

    <div className="my-7 grid grid-cols-2 gap-3 lg:grid-cols-4">

      {highlights.map((item) => (

        <div
          key={item.label}
          className="rounded-[15px] border border-[#dce6ef] bg-[#f7faff] px-3 py-5 text-center sm:px-4"
        >

          <div className="text-[12px] font-bold leading-6 text-[#64748b] sm:text-[13px]">
            {item.label}
          </div>

          <div
            dir="ltr"
            style={{ color: item.color }}
            className="my-3 text-[29px] font-black leading-tight sm:text-[35px]"
          >
            {item.value}
          </div>

          <div className="text-[12px] leading-6 text-[#64748b]">
            {item.description}
          </div>

        </div>

      ))}

    </div>

  );
}

/* =========================================================
   HISTORICAL GOLD VS INFLATION CHART
========================================================= */

function HistoricalComparisonChart() {

  const baseline = 225;
  const scale = 6.2;
  const ticks = [-10, 0, 10, 20, 30];

  return (

    <figure className="my-8 overflow-hidden rounded-[18px] border border-[#dce6ef] bg-white">

      <div className="border-b border-[#dce6ef] bg-[#f7faff] px-5 py-5 sm:px-7">

        <h3 className="text-[18px] font-black text-[#102747] sm:text-[22px]">
          التضخم الأمريكي مقابل عوائد الذهب
        </h3>

        <p className="mt-2 text-[13px] leading-6 text-[#64748b]">
          مقارنة سنوية للفترة من 2021 إلى 2024
        </p>

      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 px-3 pt-5">

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-sm bg-[#176ac8]" />

          <span className="text-[12px] font-bold text-[#475569]">
            التضخم الأمريكي
          </span>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-sm bg-[#c39a3b]" />

          <span className="text-[12px] font-bold text-[#475569]">
            عائد الذهب السنوي
          </span>

        </div>

      </div>

      <div dir="ltr" className="px-2 py-5 sm:px-6">

        <svg
          viewBox="0 0 600 340"
          className="h-auto w-full"
          role="img"
          aria-label="رسم بياني يقارن معدلات التضخم الأمريكي السنوية في ديسمبر مع عوائد الذهب السنوية خلال 2021 إلى 2024"
        >

          <title>
            US Inflation vs Gold Annual Returns 2021–2024
          </title>

          {ticks.map((tick) => (

            <g key={tick}>

              <line
                x1="48"
                x2="580"
                y1={baseline - tick * scale}
                y2={baseline - tick * scale}
                stroke={
                  tick === 0
                    ? "#94a3b8"
                    : "#e3eaf1"
                }
                strokeWidth={tick === 0 ? "1.5" : "1"}
              />

              <text
                x="40"
                y={baseline - tick * scale + 5}
                textAnchor="end"
                fontSize="13"
                fill="#64748b"
              >
                {tick}%
              </text>

            </g>

          ))}

          {historicalData.map((item, index) => {

            const x = 67 + index * 130;

            const inflationHeight =
              item.inflation * scale;

            const goldHeight =
              Math.abs(item.gold) * scale;

            return (

              <g key={item.year}>

                <rect
                  x={x}
                  y={baseline - inflationHeight}
                  width="43"
                  height={inflationHeight}
                  rx="4"
                  fill="#176ac8"
                />

                <rect
                  x={x + 49}
                  y={
                    item.gold >= 0
                      ? baseline - goldHeight
                      : baseline
                  }
                  width="43"
                  height={goldHeight}
                  rx="4"
                  fill="#c39a3b"
                />

                <text
                  x={x + 21.5}
                  y={baseline - inflationHeight - 9}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="#176ac8"
                >
                  {item.inflation.toFixed(1)}%
                </text>

                <text
                  x={x + 70.5}
                  y={
                    item.gold >= 0
                      ? baseline - goldHeight - 9
                      : baseline + goldHeight + 17
                  }
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="#927022"
                >
                  {formatPercent(item.gold)}
                </text>

                <text
                  x={x + 46}
                  y="322"
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill="#102747"
                >
                  {item.year}
                </text>

              </g>

            );

          })}

        </svg>

      </div>

      <figcaption className="border-t border-[#dce6ef] bg-[#f7faff] px-5 py-4 text-[12px] leading-6 text-[#64748b]">

        إعداد: فريق تحليلات بروكر العرب، استناداً
        إلى بيانات التضخم من مكتب إحصاءات العمل
        الأمريكي، وعوائد الذهب بالدولار الأمريكي
        المنشورة من مجلس الذهب العالمي. لا تمثل
        الأعمدة حركة الذهب لحظة صدور بيانات التضخم.

      </figcaption>

    </figure>

  );
}

/* =========================================================
   HISTORICAL DATA TABLE
========================================================= */

function HistoricalComparisonTable() {

  return (

    <ResearchTable
      headers={[
        "السنة",
        "التضخم السنوي",
        "عائد الذهب",
        "العائد الحقيقي التقريبي",
      ]}
      rows={historicalData.map((item) => [
        item.year,
        `${item.inflation.toFixed(1)}%`,
        formatPercent(item.gold),
        formatPercent(
          calculateRealReturn(
            item.gold,
            item.inflation
          )
        ),
      ])}
      caption="التضخم: تغير مؤشر CPI-U العام بين ديسمبر وديسمبر من العام السابق. عائد الذهب: التغير السنوي بالدولار وفق تقارير مجلس الذهب العالمي. العائد الحقيقي محسوب قبل الرسوم والضرائب."
    />

  );
}

/* =========================================================
   TRANSMISSION MECHANISM INFOGRAPHIC
========================================================= */

function InflationTransmissionDiagram() {

  const pathways = [
    {
      title: "بيانات التضخم أعلى من المتوقع",
      steps: [
        "تزايد توقعات التشديد النقدي",
        "احتمال ارتفاع العوائد الحقيقية",
        "احتمال ارتفاع الدولار الأمريكي",
      ],
      result: "ضغط محتمل على أسعار الذهب",
      background: "#fff7ed",
      border: "#fed7aa",
      color: "#9a3412",
    },
    {
      title: "بيانات التضخم أقل من المتوقع",
      steps: [
        "تزايد توقعات التيسير النقدي",
        "احتمال انخفاض العوائد الحقيقية",
        "احتمال تراجع الدولار الأمريكي",
      ],
      result: "دعم محتمل لأسعار الذهب",
      background: "#f0fdf4",
      border: "#bbf7d0",
      color: "#166534",
    },
  ];

  return (

    <figure className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-4 sm:p-7">

      <h3 className="mb-2 text-center text-[20px] font-black text-[#102747] sm:text-[23px]">
        كيف تنتقل مفاجأة التضخم إلى سوق الذهب؟
      </h3>

      <p className="mb-6 text-center text-[13px] leading-7 text-[#64748b]">
        المسارات المحتملة لتأثير البيانات الاقتصادية
      </p>

      <div className="mx-auto max-w-[420px] rounded-[12px] bg-[#102747] px-4 py-5 text-center text-[17px] font-black text-white">

        صدور بيانات التضخم الأمريكية CPI

      </div>

      <div
        aria-hidden="true"
        className="py-3 text-center text-[25px] font-bold text-[#94a3b8]"
      >
        ↓
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        {pathways.map((path) => (

          <div
            key={path.title}
            className="rounded-[15px] border bg-white p-4"
            style={{ borderColor: path.border }}
          >

            <div
              className="rounded-[10px] px-3 py-4 text-center text-[14px] font-black"
              style={{
                backgroundColor: path.background,
                color: path.color,
              }}
            >
              {path.title}
            </div>

            {path.steps.map((step) => (

              <div key={step}>

                <div
                  aria-hidden="true"
                  className="py-2 text-center text-[20px] text-[#94a3b8]"
                >
                  ↓
                </div>

                <div className="rounded-[9px] border border-[#dce6ef] bg-[#f7faff] px-3 py-3 text-center text-[13px] font-bold leading-6 text-[#102747]">
                  {step}
                </div>

              </div>

            ))}

            <div
              aria-hidden="true"
              className="py-2 text-center text-[20px] text-[#94a3b8]"
            >
              ↓
            </div>

            <div
              className="rounded-[10px] px-3 py-4 text-center text-[14px] font-black"
              style={{
                backgroundColor: path.background,
                color: path.color,
              }}
            >
              {path.result}
            </div>

          </div>

        ))}

      </div>

      <figcaption className="mt-5 text-center text-[12px] leading-6 text-[#64748b]">

        مخطط تحليلي من إعداد بروكر العرب يوضح
        مسارات اقتصادية محتملة، وليس قاعدة ثابتة
        للتنبؤ باتجاه الذهب أو توصية بالتداول.

      </figcaption>

    </figure>

  );
}

/* =========================================================
   CPI INDICATORS TABLE
========================================================= */

function InflationIndicatorsTable() {

  return (

    <ResearchTable
      headers={[
        "المؤشر",
        "ماذا يقيس؟",
        "أهميته للذهب",
      ]}
      rows={[
        [
          "CPI",
          "تغير أسعار سلة من السلع والخدمات الاستهلاكية",
          "قياس التضخم ومفاجآت البيانات الاقتصادية",
        ],
        [
          "Core CPI",
          "التضخم باستثناء الغذاء والطاقة",
          "فهم الضغوط السعرية الأكثر استمراراً",
        ],
        [
          "PCE",
          "تغير أسعار نفقات الاستهلاك الشخصي",
          "المؤشر المرتبط بهدف التضخم الرسمي للفيدرالي",
        ],
        [
          "Core PCE",
          "نفقات الاستهلاك باستثناء الغذاء والطاقة",
          "متابعة الاتجاه الأساسي للتضخم",
        ],
        [
          "العوائد الحقيقية",
          "عائد السندات بعد مراعاة التضخم المتوقع",
          "تقييم تكلفة الفرصة البديلة للاحتفاظ بالذهب",
        ],
      ]}
    />

  );
}

/* =========================================================
   REAL INTEREST RATE EXAMPLE
========================================================= */

function RealYieldExample() {

  const scenarios = [
    {
      title: "السيناريو الأول",
      nominal: "4.0%",
      inflation: "2.0%",
      real: "≈ 2.0%",
      description:
        "عائد حقيقي موجب قد يزيد جاذبية الأصول المدرة للعائد.",
    },
    {
      title: "السيناريو الثاني",
      nominal: "4.0%",
      inflation: "5.0%",
      real: "≈ -1.0%",
      description:
        "عائد حقيقي سالب قد يزيد الاهتمام بأصول التحوط.",
    },
  ];

  return (

    <figure className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-4 sm:p-6">

      <h3 className="mb-2 text-center text-[19px] font-black text-[#102747] sm:text-[23px]">
        لماذا يختلف العائد الحقيقي رغم ثبات الفائدة؟
      </h3>

      <p className="mb-5 text-center text-[13px] leading-6 text-[#64748b]">
        مثال حسابي افتراضي للتوضيح
      </p>

      <div className="mb-5 rounded-[12px] bg-[#102747] px-3 py-5 text-center text-[15px] font-bold leading-8 text-white sm:text-[18px]">
        العائد الحقيقي ≈ العائد الاسمي − التضخم المتوقع
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {scenarios.map((item) => (

          <div
            key={item.title}
            className="rounded-[14px] border border-[#dce6ef] bg-white p-5"
          >

            <div className="mb-4 text-center text-[15px] font-black text-[#102747]">
              {item.title}
            </div>

            <div className="space-y-3">

              <div className="flex items-center justify-between gap-2">

                <span className="text-[13px] text-[#475569]">
                  العائد الاسمي
                </span>

                <strong dir="ltr" className="text-[17px] text-[#102747]">
                  {item.nominal}
                </strong>

              </div>

              <div className="flex items-center justify-between gap-2">

                <span className="text-[13px] text-[#475569]">
                  التضخم المتوقع
                </span>

                <strong dir="ltr" className="text-[17px] text-[#102747]">
                  {item.inflation}
                </strong>

              </div>

              <div className="border-t border-[#dce6ef] pt-4 text-center">

                <div className="text-[12px] font-bold text-[#64748b]">
                  العائد الحقيقي التقريبي
                </div>

                <div
                  dir="ltr"
                  className="my-3 text-[30px] font-black text-[#176ac8]"
                >
                  {item.real}
                </div>

              </div>

            </div>

            <p className="text-center text-[13px] leading-7 text-[#475569]">
              {item.description}
            </p>

          </div>

        ))}

      </div>

      <figcaption className="mt-4 text-center text-[12px] leading-6 text-[#64748b]">
        الأرقام افتراضية وليست قراءات فعلية للفائدة
        أو التضخم. الطرح هنا تقريب حسابي وليس
        الصيغة الدقيقة للعائد الحقيقي.
      </figcaption>

    </figure>

  );
}

/* =========================================================
   CPI SURPRISE TABLE
========================================================= */

function CPISurpriseTable() {

  return (

    <ResearchTable
      headers={[
        "التوقعات",
        "القراءة الفعلية",
        "مفاجأة التضخم",
        "التفسير الأولي",
      ]}
      rows={[
        [
          "3.0%",
          "3.4%",
          "+0.4 نقطة مئوية",
          "تضخم أعلى من توقعات السوق",
        ],
        [
          "3.0%",
          "3.0%",
          "صفر",
          "الرقم الرئيسي مطابق للتوقعات",
        ],
        [
          "3.0%",
          "2.6%",
          "-0.4 نقطة مئوية",
          "تضخم أقل من توقعات السوق",
        ],
      ]}
      caption="جميع الأرقام في هذا الجدول افتراضية لأغراض الشرح. المقارنة تفترض أن القراءات والتوقعات تتعلق بالمؤشر والفترة الزمنية نفسيهما."
    />

  );
}

/* =========================================================
   GOLD INFLATION SCENARIOS
========================================================= */

function GoldScenariosTable() {

  return (

    <ResearchTable
      headers={[
        "التضخم",
        "العوائد الحقيقية",
        "الدولار",
        "الأثر المحتمل على الذهب",
      ]}
      rows={[
        [
          "أعلى من المتوقع",
          "ترتفع",
          "يرتفع",
          "ضغط هبوطي محتمل",
        ],
        [
          "أعلى من المتوقع",
          "تنخفض",
          "يضعف",
          "دعم صعودي محتمل",
        ],
        [
          "أقل من المتوقع",
          "تنخفض",
          "يضعف",
          "دعم صعودي محتمل",
        ],
        [
          "أقل من المتوقع",
          "ترتفع",
          "يرتفع",
          "ضغط هبوطي محتمل",
        ],
        [
          "مطابق للتوقعات",
          "مستقرة",
          "مستقر",
          "قد تهيمن عوامل السوق الأخرى",
        ],
      ]}
      caption="السيناريوهات احتمالية وتحليلية، وليست نتائج مضمونة أو إشارات شراء وبيع."
    />

  );
}

/* =========================================================
   INTERNAL RELATED ARTICLE CARD
========================================================= */

function RelatedResearchCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {

  return (

    <aside className="my-7 rounded-[16px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-6">

      <div className="mb-2 text-[12px] font-bold text-[#176ac8]">
        من أبحاث بروكر العرب
      </div>

      <h3 className="mb-3 text-[19px] font-black leading-8 text-[#102747] sm:text-[22px]">
        {title}
      </h3>

      <p className="mb-4 text-[13px] leading-7 text-[#475569] sm:text-[15px]">
        {description}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-[14px] font-bold text-[#176ac8] hover:underline"
      >
        اقرأ التقرير الكامل
        <span aria-hidden="true">←</span>
      </Link>

    </aside>

  );
}

/* =========================================================
   SECONDARY BROKER COMMERCIAL CARD
========================================================= */

async function XSReviewCard() {

  const supabase = await createClient();

  const { data: broker } = await supabase
    .from("brokers")
    .select("slug, logo, rating, real_account_url")
    .eq("slug", "xs")
    .eq("publication_status", "published")
    .maybeSingle();

  if (!broker) return null;

  return (

    <aside className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

      <div className="mb-4 text-[12px] font-bold text-[#176ac8]">
        حسابات ومنصات التداول
      </div>

      <div className="flex flex-wrap items-center gap-5">

        <div className="flex h-[78px] w-[150px] shrink-0 items-center justify-center rounded-[12px] border border-[#dce6ef] bg-white p-3">

          {broker.logo ? (

            <Image
              src={broker.logo}
              alt="شعار شركة XS"
              width={140}
              height={60}
              unoptimized
              className="h-[55px] w-full object-contain scale-[2]"
            />

          ) : (

            <span className="text-[24px] font-black text-[#102747]">
              XS
            </span>

          )}

        </div>

        <div>

          <h3 className="text-[20px] font-black text-[#102747] sm:text-[25px]">
            تعرف على حسابات التداول لدى XS
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-3">

            {broker.rating != null && (

              <span
                dir="ltr"
                className="rounded-md bg-[#fff8e8] px-2.5 py-1 text-[14px] font-bold text-[#9a721c]"
              >
                ★ {Number(broker.rating).toFixed(2)} / 5
              </span>

            )}

            <span className="text-[13px] text-[#64748b]">
              تقييم الشركة ودليل فتح الحساب
            </span>

          </div>

        </div>

      </div>

      <p className="my-5 text-[14px] leading-8 text-[#475569] sm:text-[16px]">

        تعرف على أنواع حسابات التداول لدى XS
        وشروط تداول الذهب والمنصات المتاحة
        والتراخيص وتكاليف التداول، بالإضافة إلى
        دليل فتح الحساب والتسجيل والتوثيق بالصور.

      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <Link
          href="/brokers/xs"
          className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[#176ac8] bg-white px-4 py-3 text-[14px] font-bold text-[#176ac8] hover:bg-[#edf3fa]"
        >
          تقييم شركة XS
        </Link>

        <Link
          href="/brokers/xs/open-account"
          className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[#176ac8] bg-white px-4 py-3 text-[14px] font-bold text-[#176ac8] hover:bg-[#edf3fa]"
        >
          دليل فتح الحساب بالصور
        </Link>

        <Link
          href="/brokers/xs"
          className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] bg-[#176ac8] px-4 py-3 text-[14px] font-bold text-white hover:bg-[#1058a9]"
        >
          خيارات فتح الحساب
        </Link>

      </div>

      <p className="mt-4 text-[11px] leading-6 text-[#64748b]">
        قد يحصل بروكر العرب على مقابل من روابط
        الإحالة التجارية. تداول عقود الفروقات
        ينطوي على مخاطر مرتفعة لخسارة رأس المال.
      </p>

    </aside>

  );
}

/* =========================================================
   CPI RELEASE CHECKLIST
========================================================= */

function ReleaseChecklist() {

  const items = [
    {
      number: "01",
      title: "قبل صدور البيانات",
      description:
        "تحقق من توقيت الإعلان والتوقعات والقراءة السابقة وأي مراكز تداول مفتوحة.",
    },
    {
      number: "02",
      title: "لحظة صدور البيانات",
      description:
        "قارن الفعلي بالتوقعات، وانتبه إلى بيانات التضخم الأساسي والشهري.",
    },
    {
      number: "03",
      title: "متابعة الأسواق المرتبطة",
      description:
        "راقب الدولار وعوائد السندات وتغير توقعات السياسة النقدية.",
    },
    {
      number: "04",
      title: "تقييم مخاطر التنفيذ",
      description:
        "تحقق من فروق الأسعار والسيولة والانزلاق السعري قبل اتخاذ أي قرار.",
    },
  ];

  return (

    <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

      {items.map((item) => (

        <div
          key={item.number}
          className="flex items-start gap-4 rounded-[14px] border border-[#dce6ef] bg-[#f7faff] p-5"
        >

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#102747] text-[15px] font-black text-white">
            {item.number}
          </div>

          <div>

            <h3 className="mb-2 text-[15px] font-black text-[#102747]">
              {item.title}
            </h3>

            <p className="text-[13px] leading-7 text-[#475569]">
              {item.description}
            </p>

          </div>

        </div>

      ))}

    </div>

  );
}

/* =========================================================
   FREQUENTLY ASKED QUESTIONS
========================================================= */

const faqItems = [
  {
    question:
      "هل ارتفاع التضخم الأمريكي يؤدي إلى ارتفاع الذهب؟",
    answer:
      "ليس دائماً. قد يدعم التضخم الطلب على الذهب كأداة تحوط، لكنه قد يؤدي أيضاً إلى ارتفاع توقعات الفائدة والعوائد الحقيقية وقوة الدولار، مما يضغط على الذهب. يعتمد الاتجاه النهائي على تفاعل هذه العوامل.",
  },
  {
    question:
      "ماذا يحدث للذهب عندما يصدر مؤشر CPI أعلى من المتوقع؟",
    answer:
      "قد يتراجع الذهب إذا أدت المفاجأة التضخمية إلى ارتفاع العوائد الحقيقية والدولار الأمريكي. لكن الذهب قد يرتفع إذا طغت مخاوف التضخم أو المخاطر الاقتصادية على تأثير السياسة النقدية.",
  },
  {
    question:
      "ما الفرق بين CPI وCore CPI بالنسبة للذهب؟",
    answer:
      "يقيس CPI التضخم العام، بينما يستبعد Core CPI الغذاء والطاقة. تساعد القراءة الأساسية في تقييم الضغوط السعرية المستمرة، ولذلك يهتم المتداولون بالقراءتين معاً عند تحليل رد فعل الأسواق.",
  },
  {
    question:
      "هل يعتمد الفيدرالي على مؤشر CPI لتحديد هدف التضخم؟",
    answer:
      "يستخدم الاحتياطي الفيدرالي مجموعة واسعة من البيانات الاقتصادية، لكن هدفه الرسمي طويل الأجل البالغ 2% يقاس بمؤشر أسعار نفقات الاستهلاك الشخصي PCE، وليس بمؤشر CPI مباشرة.",
  },
  {
    question:
      "لماذا ينخفض الذهب أحياناً رغم ارتفاع التضخم؟",
    answer:
      "قد يؤدي التضخم المرتفع إلى تشديد السياسة النقدية وارتفاع العوائد الحقيقية والدولار الأمريكي. وإذا كانت هذه التأثيرات أقوى من الطلب على التحوط، فقد ينخفض الذهب رغم ارتفاع الأسعار الاستهلاكية.",
  },
  {
    question:
      "هل الذهب وسيلة مضمونة للحماية من التضخم؟",
    answer:
      "لا. قد يساهم الذهب في الحفاظ على القوة الشرائية وتنويع الأصول على المدى الطويل، لكنه قد يسجل خسائر خلال فترات التضخم المرتفع، خصوصاً على المدى القصير.",
  },
  {
    question:
      "ما أهم المؤشرات التي يجب مراقبتها عند تداول الذهب؟",
    answer:
      "تشمل المؤشرات المهمة التضخم الأمريكي CPI وCore CPI ومؤشر PCE، والعوائد الحقيقية للسندات الأمريكية، والدولار، وتوقعات الفائدة وبيانات سوق العمل. ولا ينبغي الاعتماد على مؤشر واحد بمعزل عن بقية العوامل.",
  },
  {
    question:
      "هل تداول الذهب وقت صدور بيانات التضخم مناسب للمبتدئين؟",
    answer:
      "تنطوي هذه الفترة على تقلبات مرتفعة واحتمال اتساع السبريد والانزلاق السعري. لذلك قد لا تناسب المتداولين غير المتمرسين، خصوصاً عند استخدام الرافعة المالية.",
  },
];

function ResearchFAQ() {

  return (

    <div className="my-6 space-y-3">

      {faqItems.map((item) => (

        <details
          key={item.question}
          className="group overflow-hidden rounded-[13px] border border-[#dce6ef] bg-white"
        >

          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-[#f7faff] px-4 py-4 text-[14px] font-bold leading-7 text-[#102747] sm:px-5 sm:text-[16px]">

            <span>{item.question}</span>

            <span
              aria-hidden="true"
              className="shrink-0 text-[22px] font-bold text-[#176ac8] transition-transform group-open:rotate-45"
            >
              +
            </span>

          </summary>

          <div className="border-t border-[#dce6ef] px-4 py-4 text-[14px] leading-8 text-[#475569] sm:px-5 sm:text-[15px]">

            {item.answer}

          </div>

        </details>

      ))}

    </div>

  );
}

/* =========================================================
   RESEARCH SOURCES
========================================================= */

function ArticleSources() {

  return (

    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      {sources.map((source, index) => (

        <div
          key={source.url}
          className={`flex items-start gap-3 px-4 py-4 sm:px-5 ${
            index !== sources.length - 1
              ? "border-b border-[#e3eaf1]"
              : ""
          }`}
        >

          <span
            dir="ltr"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf3fa] text-[12px] font-bold text-[#176ac8]"
          >
            {index + 1}
          </span>

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 break-words text-[13px] font-bold leading-7 text-[#176ac8] hover:text-[#102747] hover:underline sm:text-[15px]"
          >

            {source.title}

            <span aria-hidden="true" className="ms-2">
              ↗
            </span>

          </a>

        </div>

      ))}

    </div>

  );
}

/* =========================================================
   ARTICLE PAGE
========================================================= */

export default function USInflationImpactOnGoldPage() {

  return (

    <ArticleLayout
      language="ar"
      slug={SLUG}
      title={ARTICLE.title}
      description={ARTICLE.description}
      category={CATEGORY}
      categoryHref={CATEGORY_HREF}
      subcategory={ARTICLE.subcategory}
      articleType="تقرير اقتصادي وتحليل تاريخي"
      breadcrumbTitle={ARTICLE.shortTitle}
      author={ARTICLE.author}
      published={ARTICLE.published}
      modified={ARTICLE.modified}
      heroImage={HERO_IMAGE}
      heroImageAlt={
        ARTICLE_SEO.imageAlt || ARTICLE.title
      }
      heroImageCaption="صورة تحريرية توضيحية للعلاقة بين التضخم الأمريكي والسياسة النقدية وأسعار الذهب، وليست رسماً بيانياً للأسعار الفعلية."
      contents={contents}
      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }
      introduction={

        <>

          <Paragraph>

            تُعد بيانات التضخم الأمريكية من أكثر
            المؤشرات الاقتصادية التي يراقبها متداولو
            الذهب في الأسواق العالمية، نظراً لتأثيرها
            على توقعات أسعار الفائدة الأمريكية،
            وعوائد السندات الحكومية، وقوة الدولار
            الأمريكي.

          </Paragraph>

          <Paragraph>

            وعلى الرغم من الاعتقاد الشائع بأن ارتفاع
            التضخم يؤدي دائماً إلى ارتفاع أسعار الذهب،
            فإن البيانات التاريخية تكشف أن العلاقة
            بينهما أكثر تعقيداً. فقد يتراجع الذهب خلال
            فترات التضخم المرتفع، بينما يسجل مكاسب قوية
            بالتزامن مع تباطؤ ارتفاع الأسعار.

          </Paragraph>

          <Paragraph>

            في هذا التقرير من بروكر العرب، ندرس تأثير
            مؤشر أسعار المستهلك الأمريكي{" "}

            <Strong>CPI</Strong>

            {" "}على أسعار الذهب، ونقارن بين الأداء
            التاريخي للمعدن الأصفر ومعدلات التضخم،
            ونوضح دور العوائد الحقيقية والسياسة النقدية
            ومفاجآت البيانات الاقتصادية في حركة
            أسعار الذهب.

          </Paragraph>

        </>

      }

    >

      {/* =====================================================
          FEATURED GOLD BROKERS
      ====================================================== */}

      <FeaturedGoldBrokers />

      {/* =====================================================
          SECTION 1
          KEY FINDINGS
      ====================================================== */}

      <ArticleSection
        id="key-findings"
        eyebrow="ملخص التقرير"
        title="أهم نتائج دراسة التضخم الأمريكي وأسعار الذهب"
      >

        <Paragraph>

          تكشف المقارنة بين معدلات التضخم الأمريكية
          وعوائد الذهب خلال الفترة من 2021 إلى 2024
          عن تباين واضح في أداء المعدن الأصفر،
          بما يؤكد أهمية النظر إلى مجموعة من
          المتغيرات الاقتصادية بدلاً من التضخم وحده.

        </Paragraph>

        <ResearchHighlights />

        <ArticleList
          items={[
            "تراجع الذهب بنسبة 4.3% خلال 2021، رغم وصول التضخم السنوي الأمريكي إلى 7% في ديسمبر.",
            "سجل الذهب ارتفاعاً محدوداً بلغ 0.4% خلال 2022، رغم استمرار التضخم عند مستويات مرتفعة.",
            "ارتفع الذهب بنسبة 15% خلال 2023، بالتزامن مع انخفاض التضخم السنوي إلى 3.4% في ديسمبر.",
            "سجل الذهب مكاسب بلغت 25.5% في 2024، بينما بلغ التضخم السنوي 2.9% في نهاية العام.",
            "العوائد الحقيقية والدولار وتوقعات السياسة النقدية تساعد في تفسير اختلاف أداء الذهب بين الفترات.",
          ]}
        />

        <Note title="النتيجة الرئيسية للتقرير" tone="blue">

          لا يمكن الاعتماد على اتجاه التضخم وحده
          للتنبؤ بحركة أسعار الذهب. الأهم هو فهم
          كيفية تأثير البيانات على توقعات المستثمرين
          والعوائد الحقيقية والدولار الأمريكي والطلب
          على المعدن الأصفر.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 2
          UNDERSTANDING CPI
      ====================================================== */}

      <ArticleSection
        id="what-is-cpi"
        eyebrow="المؤشرات الاقتصادية"
        title="ما هو مؤشر أسعار المستهلك الأمريكي CPI؟"
      >

        <Paragraph>

          مؤشر أسعار المستهلك الأمريكي، أو
          Consumer Price Index، هو أحد المقاييس
          الرئيسية المستخدمة لمتابعة تغير أسعار
          السلع والخدمات التي يشتريها المستهلكون
          في الولايات المتحدة.

        </Paragraph>

        <Paragraph>

          يصدر المؤشر عن مكتب إحصاءات العمل الأمريكي
          (BLS)، ويشمل فئات متعددة مثل الإسكان والغذاء
          والطاقة والنقل والرعاية الطبية وغيرها
          من النفقات الاستهلاكية.

        </Paragraph>

        <SubHeading>

          الفرق بين التضخم الشهري والتضخم السنوي

        </SubHeading>

        <Paragraph>

          يقارن التضخم الشهري مستوى الأسعار بالشهر
          السابق، بينما يقارن التضخم السنوي مستوى
          الأسعار بالشهر نفسه من العام السابق.
          ولذلك قد يتباطأ التضخم السنوي في الوقت
          الذي تستمر فيه الأسعار بالارتفاع شهرياً.

        </Paragraph>

        <Paragraph>

          انخفاض معدل التضخم لا يعني بالضرورة
          انخفاض أسعار السلع والخدمات، وإنما قد يعني
          أن الأسعار تواصل الارتفاع بوتيرة أبطأ.

        </Paragraph>

        <SubHeading>

          الفرق بين CPI وCore CPI وPCE

        </SubHeading>

        <InflationIndicatorsTable />

        <Paragraph>

          يهتم المتداولون بمؤشر التضخم الأساسي
          Core CPI لأنه يستبعد الغذاء والطاقة،
          وهما من الفئات التي قد تشهد تقلبات
          سعرية كبيرة خلال فترات قصيرة.

        </Paragraph>

        <Paragraph>

          ومع ذلك، فإن الاحتياطي الفيدرالي الأمريكي
          يقيس هدفه طويل الأجل للتضخم باستخدام
          مؤشر أسعار نفقات الاستهلاك الشخصي PCE،
          ويستهدف معدل تضخم يبلغ 2% على المدى الطويل.

        </Paragraph>

        <Note title="معلومة مهمة" tone="blue">

          قيمة مؤشر CPI ليست معدل التضخم نفسه.
          معدل التضخم هو النسبة المئوية لتغير المؤشر
          بين فترتين زمنيتين. ويجب التمييز بين
          القراءة الشهرية والسنوية عند مقارنة
          البيانات بالتوقعات.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 3
          TRANSMISSION CHANNELS
      ====================================================== */}

      <ArticleSection
        id="inflation-gold-relationship"
        eyebrow="آلية التأثير الاقتصادي"
        title="كيف يؤثر التضخم الأمريكي على أسعار الذهب؟"
      >

        <Paragraph>

          ترتبط أهمية الذهب بالتضخم جزئياً بطبيعة
          المعدن الأصفر كأصل مادي لا يعتمد على
          التزامات جهة مصدرة، وهو ما يدفع بعض
          المستثمرين إلى الاحتفاظ به ضمن استراتيجيات
          التحوط من تراجع القوة الشرائية للنقود.

        </Paragraph>

        <Paragraph>

          إلا أن هذا الطلب يمثل جانباً واحداً
          من العلاقة. فعندما يرتفع التضخم، قد تتغير
          أيضاً توقعات المستثمرين بشأن استجابة
          الاحتياطي الفيدرالي، مما يؤثر على العوائد
          المتاحة من السندات وعلى قيمة الدولار.

        </Paragraph>

        <InflationTransmissionDiagram />

        <ResearchTable
          headers={[
            "قناة التأثير",
            "الأثر المحتمل",
            "التفسير الاقتصادي",
          ]}
          rows={[
            [
              "تزايد مخاوف التضخم",
              "دعم الذهب",
              "ارتفاع الاهتمام بالتحوط من تراجع القوة الشرائية",
            ],
            [
              "توقعات رفع الفائدة",
              "ضغط على الذهب أحياناً",
              "زيادة جاذبية بعض الأصول المدرة للعائد",
            ],
            [
              "ارتفاع العوائد الحقيقية",
              "ضغط محتمل",
              "ارتفاع تكلفة الفرصة البديلة",
            ],
            [
              "ضعف الدولار الأمريكي",
              "دعم محتمل",
              "انخفاض تكلفة الذهب بعملات أخرى عند ثبات العوامل الأخرى",
            ],
            [
              "تزايد المخاطر الاقتصادية",
              "دعم محتمل",
              "ارتفاع الطلب على التنويع والأصول الدفاعية",
            ],
          ]}
        />

        <Paragraph>

          لا تعمل هذه القنوات دائماً في الاتجاه نفسه.
          فقد يكون التضخم داعماً للطلب على الذهب،
          بينما يؤدي ارتفاع العوائد الحقيقية في الوقت
          نفسه إلى الحد من المكاسب أو دفع السعر
          نحو التراجع.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 4
          HISTORICAL COMPARISON
      ====================================================== */}

      <ArticleSection
        id="historical-comparison"
        eyebrow="البيانات التاريخية"
        title="مقارنة تاريخية بين التضخم الأمريكي وعوائد الذهب"
      >

        <Paragraph>

          لاختبار مدى اتساق الاعتقاد بأن ارتفاع
          التضخم يؤدي إلى ارتفاع الذهب، نستعرض
          أربع سنوات متتالية شهدت تغيرات كبيرة
          في ظروف التضخم والسياسة النقدية
          والأوضاع المالية العالمية.

        </Paragraph>

        <Paragraph>

          تعتمد المقارنة على معدل التضخم السنوي
          لمؤشر CPI العام في ديسمبر من كل عام،
          مقابل عائد الذهب السنوي بالدولار الأمريكي
          كما ورد في تقارير مجلس الذهب العالمي.

        </Paragraph>

        <HistoricalComparisonChart />

        <HistoricalComparisonTable />

        <Paragraph>

          يوضح الجدول الفرق بين العائد الاسمي للذهب
          والعائد الحقيقي التقريبي بعد مراعاة التضخم
          الأمريكي. ويساعد هذا التمييز في تقييم
          ما إذا كانت مكاسب الذهب قد تجاوزت
          ارتفاع الأسعار الاستهلاكية خلال الفترة.

        </Paragraph>

        <Note title="حدود المقارنة التاريخية" tone="blue">

          تشمل العينة أربع سنوات فقط، ولا تمثل
          اختباراً إحصائياً شاملاً لارتباط الذهب
          بالتضخم. كما أن العوائد السنوية لا تقيس
          استجابة الذهب خلال الدقائق أو الساعات
          التالية لصدور بيانات CPI. ويتطلب تحليل
          تلك الاستجابة بيانات أسعار لحظية وتوقعات
          تاريخية متزامنة مع كل إعلان.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 5
          ANALYSIS BY YEAR
      ====================================================== */}

      <ArticleSection
        id="historical-analysis"
        eyebrow="قراءة النتائج"
        title="تحليل أداء الذهب خلال دورات التضخم 2021–2024"
      >

        <SubHeading>

          عام 2021: ارتفاع التضخم وتراجع الذهب

        </SubHeading>

        <Paragraph>

          شهد الاقتصاد الأمريكي خلال 2021 تسارعاً
          واضحاً في الضغوط التضخمية، بالتزامن مع
          التعافي من تداعيات جائحة كورونا واضطرابات
          سلاسل الإمداد وتغير أنماط الطلب.

        </Paragraph>

        <Paragraph>

          وعلى الرغم من وصول التضخم السنوي إلى
          7% في ديسمبر، سجل الذهب تراجعاً سنوياً
          بنسبة 4.3% بالدولار. وتوضح هذه النتيجة
          أن الطلب على التحوط من التضخم لم يكن
          كافياً لضمان ارتفاع المعدن الأصفر خلال
          تلك الفترة.

        </Paragraph>

        <SubHeading>

          عام 2022: تضخم مرتفع وتشديد نقدي قوي

        </SubHeading>

        <Paragraph>

          خلال 2022، استمر التضخم الأمريكي عند
          مستويات مرتفعة، وبدأ الاحتياطي الفيدرالي
          دورة تشديد نقدي قوية، مما ساهم في ارتفاع
          عوائد السندات وزيادة جاذبية الدولار.

        </Paragraph>

        <Paragraph>

          وعلى الرغم من انتهاء العام بمعدل تضخم
          سنوي بلغ 6.5%، اكتفى الذهب بمكاسب
          سنوية محدودة بلغت 0.4%.

        </Paragraph>

        <Paragraph>

          وأشار مجلس الذهب العالمي إلى أن ارتفاع
          العوائد الحقيقية وقوة الدولار شكلا
          ضغوطاً مهمة خلال تلك السنة، في حين ساعد
          الطلب من البنوك المركزية وبعض المستثمرين
          الأفراد في موازنة تلك الضغوط.

        </Paragraph>

        <SubHeading>

          عام 2023: تباطؤ التضخم وصعود الذهب

        </SubHeading>

        <Paragraph>

          مع تراجع معدل التضخم السنوي إلى 3.4%
          في ديسمبر 2023، سجل الذهب ارتفاعاً
          سنوياً بلغ نحو 15%، ليحقق أداءً أفضل
          بكثير مقارنة بالعام السابق.

        </Paragraph>

        <Paragraph>

          وتداخلت خلال هذه المرحلة توقعات السياسة
          النقدية والمخاطر المالية والجيوسياسية
          والطلب الاستثماري على الذهب، بما يوضح
          أن تباطؤ التضخم لا يعني بالضرورة تراجع
          جاذبية المعدن الأصفر.

        </Paragraph>

        <SubHeading>

          عام 2024: مكاسب قوية رغم اعتدال التضخم

        </SubHeading>

        <Paragraph>

          حقق الذهب مكاسب سنوية بلغت 25.5%
          خلال 2024، بينما بلغ معدل التضخم
          الأمريكي 2.9% في ديسمبر.

        </Paragraph>

        <Paragraph>

          ويعكس هذا الأداء أهمية مجموعة من
          العوامل الأخرى، من بينها الطلب الرسمي
          والاستثماري على الذهب والمخاطر العالمية،
          إلى جانب الفترات التي تراجعت خلالها
          العوائد أو ضعف الدولار الأمريكي.

        </Paragraph>

        <ResearchTable
          headers={[
            "السنة",
            "السياق الاقتصادي",
          ]}
          rows={historicalData.map((item) => [
            item.year,
            item.context,
          ])}
          caption="ملخص تحليلي للظروف الاقتصادية المصاحبة للأداء السنوي، وليس قياساً كمياً لمساهمة كل عامل في عائد الذهب."
        />

        <Paragraph>

          وتؤكد هذه الأمثلة أن ارتفاع الذهب لا
          يتطلب بالضرورة تسارع التضخم، وأن الأداء
          الفعلي قد يتأثر بالسياسة النقدية والطلب
          الاستثماري والمخاطر بدرجة تفوق التأثير
          المباشر لمؤشرات الأسعار خلال بعض الفترات.

        </Paragraph>

        <RelatedResearchCard
          title="أكبر انهيارات أسعار الذهب في التاريخ"
          description="دراسة تاريخية حول موجات هبوط الذهب، وحجم الخسائر المسجلة والمدة التي احتاجها المعدن الأصفر لاستعادة قممه السابقة."
          href="/articles/gold-price-crashes-history"
        />

      </ArticleSection>

      {/* =====================================================
          SECTION 6
          REAL INTEREST RATES
      ====================================================== */}

      <ArticleSection
        id="real-interest-rates"
        eyebrow="الفائدة الحقيقية"
        title="لماذا تعد العوائد الحقيقية من أهم المؤثرات على الذهب؟"
      >

        <Paragraph>

          بخلاف السندات والودائع المصرفية، لا يولد
          الذهب المادي دخلاً دورياً ثابتاً بمجرد
          الاحتفاظ به. ولذلك يقارن المستثمرون بين
          الاحتفاظ بالذهب والعائد المتاح من الأصول
          المالية الأخرى بعد مراعاة التضخم.

        </Paragraph>

        <Paragraph>

          عندما ترتفع العوائد الحقيقية، قد يصبح
          الاحتفاظ بالسندات أكثر جاذبية مقارنة
          بالذهب، مما يزيد تكلفة الفرصة البديلة
          للاحتفاظ بالمعدن الأصفر.

        </Paragraph>

        <Paragraph>

          وفي المقابل، قد يؤدي انخفاض العوائد
          الحقيقية إلى تقليل هذه التكلفة، وبالتالي
          زيادة الاهتمام بالذهب ضمن المحافظ
          الاستثمارية.

        </Paragraph>

        <RealYieldExample />

        <SubHeading>

          ما المؤشر الذي يستخدم لمراقبة العوائد الحقيقية؟

        </SubHeading>

        <Paragraph>

          يعد عائد سندات الخزانة الأمريكية المحمية
          من التضخم لأجل عشر سنوات، والمتاح ضمن
          سلسلة بيانات FRED بالرمز DFII10،
          أحد المقاييس المستخدمة لمتابعة اتجاه
          العوائد الحقيقية في الأسواق المالية.

        </Paragraph>

        <Paragraph>

          ويساعد هذا المؤشر في فهم بعض تحركات
          الذهب التي تبدو غير متوافقة مع اتجاه
          التضخم المعلن. لكن العلاقة ليست ثابتة،
          وقد تختلف قوة تأثير العوائد باختلاف
          الفترة الزمنية وظروف الطلب والمخاطر.

        </Paragraph>

        <RelatedResearchCard
          title="كيف يتأثر الذهب بقرارات الفيدرالي الأمريكي؟"
          description="اطلع على دراسة بروكر العرب لحركة الذهب بعد 41 اجتماعاً للاحتياطي الفيدرالي، وتأثير رفع وخفض وتثبيت أسعار الفائدة."
          href="/articles/gold-reaction-fed-decisions"
        />

      </ArticleSection>

      {/* =====================================================
          SECTION 7
          US DOLLAR
      ====================================================== */}

      <ArticleSection
        id="us-dollar"
        eyebrow="الأسواق المترابطة"
        title="العلاقة بين التضخم والدولار الأمريكي وأسعار الذهب"
      >

        <Paragraph>

          يتم تسعير الذهب في الأسواق العالمية
          بالدولار الأمريكي، ولذلك تؤثر تغيرات
          قيمة العملة الأمريكية في تكلفة شراء
          المعدن الأصفر بالنسبة للمستثمرين
          الذين يستخدمون عملات أخرى.

        </Paragraph>

        <Paragraph>

          عندما يرتفع الدولار، قد تصبح تكلفة الذهب
          أعلى بالنسبة للمشترين خارج الولايات
          المتحدة عند ثبات بقية العوامل. وقد يؤدي
          ذلك إلى الحد من الطلب على المعدن.

        </Paragraph>

        <Paragraph>

          أما عندما يتراجع الدولار، فقد يصبح الذهب
          أقل تكلفة بالعملات الأخرى، وهو ما قد
          يدعم الطلب عليه.

        </Paragraph>

        <Paragraph>

          وتؤثر بيانات التضخم على الدولار بصورة
          غير مباشرة من خلال توقعات أسعار الفائدة
          والفروق في العوائد بين الولايات المتحدة
          والأسواق الأخرى.

        </Paragraph>

        <Note title="هل العلاقة بين الدولار والذهب عكسية دائماً؟" tone="blue">

          لا. قد يرتفع الذهب والدولار في الوقت
          نفسه خلال بعض الأزمات، نتيجة زيادة الطلب
          على السيولة والأصول الدفاعية. لذلك
          لا ينبغي استخدام حركة الدولار وحدها
          باعتبارها إشارة مؤكدة لاتجاه الذهب.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 8
          CPI SURPRISES
      ====================================================== */}

      <ArticleSection
        id="cpi-surprise"
        eyebrow="قراءة البيانات الاقتصادية"
        title="لماذا يهتم متداولو الذهب بمفاجأة التضخم أكثر من الرقم نفسه؟"
      >

        <Paragraph>

          قبل صدور بيانات التضخم الأمريكية، تكون
          الأسواق قد كونت بالفعل توقعات بشأن
          القراءة المنتظرة، اعتماداً على المؤشرات
          السابقة وتحليلات المؤسسات المالية
          والاقتصاديين.

        </Paragraph>

        <Paragraph>

          وقد تكون هذه التوقعات منعكسة جزئياً
          في أسعار الأصول قبل الإعلان. لذلك
          تركز الأسواق عند صدور البيانات على
          مقدار اختلاف القراءة الفعلية عن
          التوقعات السائدة.

        </Paragraph>

        <SubHeading>

          كيف تحسب مفاجأة مؤشر التضخم؟

        </SubHeading>

        <div className="my-6 rounded-[14px] bg-[#102747] px-5 py-6 text-center">

          <div className="mb-3 text-[12px] font-bold text-[#b6d4f5]">
            معادلة مبسطة
          </div>

          <div className="text-[17px] font-black leading-9 text-white sm:text-[21px]">
            مفاجأة التضخم = القراءة الفعلية − القراءة المتوقعة
          </div>

        </div>

        <CPISurpriseTable />

        <Paragraph>

          فإذا توقعت الأسواق تضخماً سنوياً يبلغ 3%
          وجاءت القراءة عند 3.4%، فإن المفاجأة
          الإيجابية تبلغ 0.4 نقطة مئوية. وقد
          تدفع هذه النتيجة المستثمرين إلى إعادة
          تقييم مسار الفائدة الأمريكية.

        </Paragraph>

        <Paragraph>

          ومع ذلك، لا يعني تطابق الرقم الرئيسي
          مع التوقعات غياب التقلبات. فقد تحمل
          بيانات التضخم الأساسي أو التغيرات
          الشهرية أو تفاصيل مكونات المؤشر معلومات
          جديدة تؤثر على تقييم السوق.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 9
          MARKET SCENARIOS
      ====================================================== */}

      <ArticleSection
        id="inflation-scenarios"
        eyebrow="تحليل السيناريوهات"
        title="متى تدعم بيانات التضخم الذهب ومتى تضغط عليه؟"
      >

        <Paragraph>

          يساعد تحليل اتجاه التضخم إلى جانب
          العوائد الحقيقية والدولار في بناء صورة
          أشمل عن الظروف التي قد تدعم الذهب
          أو تضغط على أسعاره.

        </Paragraph>

        <GoldScenariosTable />

        <SubHeading>

          التضخم المرتفع مع ارتفاع العوائد الحقيقية

        </SubHeading>

        <Paragraph>

          في هذا السيناريو، قد تؤدي توقعات
          تشديد السياسة النقدية إلى زيادة جاذبية
          الأصول المدرة للعائد، مما يحد من قدرة
          الذهب على الاستفادة من ارتفاع التضخم.

        </Paragraph>

        <SubHeading>

          التضخم المرتفع مع انخفاض العوائد الحقيقية

        </SubHeading>

        <Paragraph>

          قد يشكل هذا السيناريو بيئة أكثر دعماً
          للذهب، خصوصاً إذا ترافق انخفاض العوائد
          الحقيقية مع ضعف الدولار وارتفاع الطلب
          على التحوط.

        </Paragraph>

        <SubHeading>

          تباطؤ التضخم مع توقعات خفض الفائدة

        </SubHeading>

        <Paragraph>

          قد يستفيد الذهب من تباطؤ التضخم عندما
          تتوقع الأسواق أن يؤدي ذلك إلى تيسير
          السياسة النقدية وانخفاض العوائد الحقيقية.
          لكن النتيجة تعتمد أيضاً على الوضع
          الاقتصادي العام ومدى انعكاس هذه
          التوقعات مسبقاً في الأسعار.

        </Paragraph>

        <Note title="لا توجد نتيجة مضمونة" tone="amber">

          حتى عند اجتماع عدة عوامل داعمة للذهب،
          قد تتغير حركة الأسعار بسبب السيولة
          أو جني الأرباح أو تغير مراكز المستثمرين
          أو ظهور أحداث اقتصادية جديدة.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 10
          CPI TRADING AND RISK
      ====================================================== */}

      <ArticleSection
        id="trading-cpi"
        eyebrow="دليل المتداول"
        title="ما الذي يجب مراقبته عند صدور بيانات CPI؟"
      >

        <Paragraph>

          تشهد الأسواق المالية أحياناً تغيرات
          سريعة في الأسعار عند صدور البيانات
          الاقتصادية المهمة، نتيجة إعادة تقييم
          التوقعات وتحرك السيولة والأوامر
          في عدد من الأسواق بصورة متزامنة.

        </Paragraph>

        <Paragraph>

          بالنسبة لمتداول الذهب، لا يقتصر فهم
          الحدث على معرفة ما إذا كانت القراءة
          مرتفعة أو منخفضة، بل يشمل أيضاً دراسة
          ظروف التنفيذ وإدارة المخاطر.

        </Paragraph>

        <ReleaseChecklist />

        <ResearchTable
          headers={[
            "المؤشر أو العامل",
            "ما الذي يجب متابعته؟",
          ]}
          rows={[
            [
              "CPI السنوي والشهري",
              "القراءة الفعلية مقابل توقعات السوق",
            ],
            [
              "Core CPI",
              "اتجاه التضخم الأساسي",
            ],
            [
              "الدولار الأمريكي",
              "اتجاه الحركة بعد الإعلان",
            ],
            [
              "عوائد السندات",
              "تغير العوائد الاسمية والحقيقية",
            ],
            [
              "توقعات الفائدة",
              "إعادة تسعير قرارات الفيدرالي المقبلة",
            ],
            [
              "تكاليف التنفيذ",
              "السبريد والانزلاق السعري والسيولة",
            ],
          ]}
        />

        <Paragraph>

          وقد يرتفع السبريد خلال لحظات التقلبات
          الشديدة، كما قد يتم تنفيذ بعض الأوامر
          بأسعار تختلف عن المستويات المطلوبة،
          خصوصاً في ظروف انخفاض السيولة.

        </Paragraph>

        <Paragraph>

          ويمكن الاستفادة من{" "}

          <Link
            href="/tools/risk-calculator"
            className="font-bold text-[#176ac8] hover:underline"
          >
            حاسبة إدارة المخاطر
          </Link>

          {" "}المتاحة في بروكر العرب لفهم العلاقة
          بين حجم الصفقة ومستوى الخسارة المحتملة،
          مع مراعاة أن الحسابات النظرية لا تضمن
          سعر التنفيذ الفعلي أثناء الأخبار.

        </Paragraph>

        <RelatedResearchCard
          title="أفضل أوقات تداول الذهب خلال اليوم"
          description="تعرف على اختلاف السيولة والتقلبات بين جلسات التداول العالمية، وأهمية اختيار التوقيت المناسب وفق أسلوب التداول."
          href="/articles/best-time-to-trade-gold"
        />

        <Note title="مخاطر التداول أثناء البيانات الاقتصادية" tone="amber">

          يمكن أن تتسبب التقلبات الحادة والرافعة
          المالية في خسائر كبيرة خلال فترات قصيرة.
          كما أن أوامر وقف الخسارة العادية لا تضمن
          دائماً التنفيذ عند السعر المحدد. ولا يعد
          صدور بيانات اقتصادية معينة سبباً كافياً
          لفتح صفقة تداول.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 11
          GOLD AS AN INFLATION HEDGE
      ====================================================== */}

      <ArticleSection
        id="inflation-hedge"
        eyebrow="التحوط والقوة الشرائية"
        title="هل الذهب وسيلة فعالة للحماية من التضخم؟"
      >

        <Paragraph>

          يعتمد تقييم الذهب كوسيلة للتحوط من
          التضخم على الأفق الزمني وطبيعة الاستثمار
          والعملة التي يستخدمها المستثمر.

        </Paragraph>

        <Paragraph>

          فعلى المدى الطويل، قد يساهم الذهب في
          تنويع الأصول والحفاظ على جزء من القوة
          الشرائية، لكنه لا يقدم عائداً مرتبطاً
          مباشرة بمؤشر أسعار المستهلك.

        </Paragraph>

        <Paragraph>

          وتشير المقارنة التاريخية الواردة في
          هذا التقرير إلى إمكانية تسجيل الذهب
          عائداً حقيقياً سالباً خلال فترات التضخم
          المرتفع، ثم تسجيل عوائد حقيقية موجبة
          خلال فترات يتباطأ فيها التضخم.

        </Paragraph>

        <ResearchTable
          headers={[
            "الأداة",
            "طبيعة الحماية أو التعرض",
            "أبرز الاعتبارات",
          ]}
          rows={[
            [
              "الذهب المادي",
              "تحوط محتمل وتنويع للأصول",
              "تقلب السعر وتكاليف الحفظ والشراء والبيع",
            ],
            [
              "السندات المحمية من التضخم",
              "ارتباط بآلية تعديل مرتبطة بالتضخم",
              "مخاطر تغير العوائد والأسعار قبل الاستحقاق",
            ],
            [
              "صناديق الذهب",
              "تعرض لأداء الذهب وفق هيكل الصندوق",
              "الرسوم ومخاطر التتبع وهيكل الاستثمار",
            ],
            [
              "عقود فروقات الذهب",
              "تعرض مشتق لتحركات السعر",
              "الرافعة المالية والتمويل ومخاطر التنفيذ",
            ],
          ]}
        />

        <SubHeading>

          الفرق بين الاستثمار في الذهب وتداول XAU/USD

        </SubHeading>

        <Paragraph>

          يجب التمييز بين امتلاك الذهب المادي
          بهدف الاحتفاظ طويل الأجل وبين تداول
          عقود الفروقات على الذهب باستخدام
          الرافعة المالية.

        </Paragraph>

        <Paragraph>

          فالأداة المشتقة لا تمنح المتداول ملكية
          المعدن نفسه، وقد تخضع لتكاليف التمويل
          والسبريد والعمولات ومتطلبات الهامش.
          ولذلك لا يمكن اعتبار تداول الذهب
          بالرافعة المالية بديلاً مطابقاً لامتلاك
          الذهب لأغراض التحوط طويل الأجل.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 12
          BROKER SELECTION
      ====================================================== */}

      <ArticleSection
        id="broker-selection"
        eyebrow="اختيار شركة التداول"
        title="ما معايير اختيار شركة لتداول الذهب أثناء الأخبار؟"
      >

        <Paragraph>

          عند مقارنة شركات التداول التي توفر
          أدوات مرتبطة بالذهب، من المهم عدم
          الاكتفاء بمقارنة الحد الأدنى للإيداع
          أو الحد الأقصى للرافعة المالية.

        </Paragraph>

        <Paragraph>

          فقد تكون جودة التنفيذ وشفافية شروط
          التداول وتكاليف الصفقات خلال الظروف
          المتقلبة أكثر أهمية للمتداول من
          بعض المزايا التسويقية المعلنة.

        </Paragraph>

        <ArticleList
          items={[
            "التحقق من التراخيص والكيان القانوني الذي يقدم الخدمة.",
            "مراجعة متوسط السبريد والعمولات وتكاليف التمويل.",
            "معرفة حجم العقد وقيمة الحركة السعرية للذهب.",
            "مراجعة متطلبات الهامش ومستويات إغلاق الصفقات.",
            "التحقق من سياسة تنفيذ الأوامر والانزلاق السعري.",
            "معرفة القيود المحتملة على التداول وقت الأخبار.",
          ]}
        />

        <Paragraph>

          وتوفر صفحة{" "}

          <Link
            href="/best-brokers/gold"
            className="font-bold text-[#176ac8] hover:underline"
          >
            أفضل شركات تداول الذهب
          </Link>

          {" "}في بروكر العرب مقارنة تساعد القارئ
          على مراجعة الوسطاء وشروط حساباتهم،
          مع إمكانية الانتقال إلى التقييمات
          التفصيلية لكل شركة.

        </Paragraph>

        <XSReviewCard />

      </ArticleSection>

      {/* =====================================================
          SECTION 13
          EDITORIAL CONCLUSION
      ====================================================== */}

      <ArticleSection
        id="editorial-conclusion"
        eyebrow="تحليل بروكر العرب"
        title="الخلاصة: كيف نفهم تأثير التضخم على الذهب بصورة صحيحة؟"
      >

        <Paragraph>

          من منظور فريق تحليلات بروكر العرب،
          يمثل التضخم الأمريكي أحد المتغيرات
          المهمة في تحليل أسعار الذهب، لكنه
          لا يقدم بمفرده تفسيراً كافياً لجميع
          تحركات المعدن الأصفر.

        </Paragraph>

        <Paragraph>

          وتظهر البيانات التاريخية خلال
          الفترة المدروسة أن الذهب قد يسجل
          خسائر أو مكاسب محدودة في سنوات
          التضخم المرتفع، بينما قد يحقق
          ارتفاعات قوية خلال فترات تباطؤ التضخم.

        </Paragraph>

        <div className="my-7 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

          <div className="mb-3 text-[12px] font-bold text-[#176ac8]">
            الخلاصة التحليلية
          </div>

          <h3 className="mb-5 text-[21px] font-black text-[#102747] sm:text-[25px]">
            أربعة عوامل رئيسية لفهم حركة الذهب بعد CPI
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {[
              "مقدار مفاجأة بيانات التضخم",
              "تغير توقعات السياسة النقدية",
              "اتجاه العوائد الحقيقية",
              "اتجاه الدولار والطلب على الذهب",
            ].map((item, index) => (

              <div
                key={item}
                className="flex items-center gap-3 rounded-[11px] border border-[#dce6ef] bg-white p-4"
              >

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#102747] text-[13px] font-bold text-white">
                  {index + 1}
                </span>

                <span className="text-[14px] font-bold leading-7 text-[#102747]">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

        <Paragraph>

          ولذلك، فإن قراءة بيانات التضخم ضمن
          إطار اقتصادي متكامل توفر أساساً أفضل
          لفهم حركة الذهب، مقارنة بالاعتماد على
          افتراض أن كل ارتفاع في التضخم سيقابله
          ارتفاع مباشر في سعر المعدن الأصفر.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 14
          FAQ
      ====================================================== */}

      <ArticleSection
        id="faq"
        eyebrow="أسئلة وأجوبة"
        title="الأسئلة الشائعة حول تأثير التضخم الأمريكي على الذهب"
      >

        <ResearchFAQ />

      </ArticleSection>

      {/* =====================================================
          SECTION 15
          METHODOLOGY AND SOURCES
      ====================================================== */}

      <ArticleSection
        id="sources"
        eyebrow="المنهجية والمراجع"
        title="منهجية التقرير ومصادر البيانات التاريخية"
      >

        <Paragraph>

          أعد فريق تحليلات بروكر العرب هذا
          التقرير بالاعتماد على البيانات
          الاقتصادية المنشورة من مكتب إحصاءات
          العمل الأمريكي والاحتياطي الفيدرالي
          وقاعدة بيانات FRED، إلى جانب تقارير
          وأبحاث مجلس الذهب العالمي.

        </Paragraph>

        <SubHeading>

          منهجية المقارنة التاريخية

        </SubHeading>

        <ArticleList
          items={[
            "الفترة المدروسة: أربع سنوات كاملة من 2021 إلى 2024.",
            "التضخم: التغير السنوي لمؤشر أسعار المستهلك الأمريكي العام CPI-U في ديسمبر.",
            "الذهب: عوائد الذهب السنوية بالدولار الأمريكي وفق تقارير مجلس الذهب العالمي.",
            "العائد الحقيقي: العائد الاسمي بعد التعديل باستخدام معدل التضخم الأمريكي للفترة المقابلة.",
            "المقارنة لا تشمل رسوم الوساطة أو التخزين أو الضرائب أو تكاليف التمويل.",
            "لا تتضمن الدراسة قياساً إحصائياً لرد فعل الذهب اللحظي على إعلانات CPI.",
          ]}
        />

        <div className="my-6 rounded-[14px] border border-[#dce6ef] bg-[#f7faff] p-5">

          <div className="mb-3 text-[14px] font-black text-[#102747]">
            طريقة حساب العائد الحقيقي
          </div>

          <div
            dir="ltr"
            className="break-words text-center text-[15px] font-bold leading-8 text-[#176ac8] sm:text-[18px]"
          >
            Real Return = ((1 + R) / (1 + I) − 1) × 100
          </div>

          <p className="mt-3 text-[12px] leading-7 text-[#64748b]">

            حيث يشير R إلى العائد الاسمي بصيغة
            عشرية، ويشير I إلى معدل التضخم بصيغة
            عشرية. تم تقريب النتائج المعروضة
            إلى منزلة عشرية واحدة.

          </p>

        </div>

        <ArticleSources />

        <div className="mt-7 rounded-[12px] border border-[#e3eaf1] bg-[#f8fafc] p-4 sm:p-5">

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            <strong className="text-[#102747]">
              إخلاء المسؤولية:
            </strong>

            {" "}أعد هذا التقرير لأغراض بحثية
            وتثقيفية فقط، ولا يمثل توصية استثمارية
            أو دعوة لشراء أو بيع الذهب أو أي أداة
            مالية أخرى. الأداء السابق لا يضمن
            النتائج المستقبلية، وقد تؤدي تقلبات
            الأسواق واستخدام الرافعة المالية إلى
            خسارة رأس المال. كما قد يحصل بروكر
            العرب على مقابل من بعض روابط الإحالة
            التجارية الموجودة في الموقع.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}

/* ================= END ARTICLE ================= */