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

const CATEGORY = "Markets & Economics";

const CATEGORY_HREF =
  "/en/articles/category/financial-markets-economy";

const HERO_IMAGE =
  "/articles/us-inflation-impact-on-gold.webp";

const ARTICLE = {
  title:
    "How US Inflation Data (CPI) Affects Gold Prices",

  seoTitle:
    "How US Inflation (CPI) Affects Gold Prices",

  shortTitle:
    "US Inflation and Gold Prices",

  description:
    "Explore how US inflation data affects gold prices through historical comparisons, real interest rates, Federal Reserve policy, the US dollar and XAU/USD market reactions.",

  subcategory:
    "Gold & Economic Indicators",

  author:
    "Broker Alarab Research Team",

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
  language: "en",

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
    "Economic research examining the relationship between US CPI inflation, real interest rates, the US dollar and XAU/USD gold prices",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  tags: [
    "Gold",
    "US Inflation",
    "CPI",
    "XAU/USD",
    "Interest Rates",
    "Real Yields",
    "US Dollar",
    "Federal Reserve",
    "Economic Indicators",
  ],

  keywords: [
    "how inflation affects gold prices",
    "US inflation impact on gold",
    "CPI impact on gold prices",
    "gold and inflation relationship",
    "how CPI affects XAUUSD",
    "gold prices after CPI release",
    "does gold rise with inflation",
    "real interest rates and gold",
    "inflation and gold price correlation",
    "gold trading during CPI news",
    "US Consumer Price Index and gold",
    "gold as an inflation hedge",
    "Federal Reserve and gold prices",
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
    label: "Key Research Findings",
  },
  {
    id: "what-is-cpi",
    label: "What Is the US Consumer Price Index?",
  },
  {
    id: "inflation-gold-relationship",
    label: "The Relationship Between Inflation and Gold",
  },
  {
    id: "historical-comparison",
    label: "Historical Data Comparison",
  },
  {
    id: "historical-analysis",
    label: "Gold Performance: 2021–2024",
  },
  {
    id: "real-interest-rates",
    label: "The Impact of Real Interest Rates",
  },
  {
    id: "us-dollar",
    label: "The Role of the US Dollar",
  },
  {
    id: "cpi-surprise",
    label: "Understanding CPI Surprises",
  },
  {
    id: "inflation-scenarios",
    label: "Gold Price Scenarios",
  },
  {
    id: "trading-cpi",
    label: "Trading Gold During CPI Releases",
  },
  {
    id: "inflation-hedge",
    label: "Is Gold an Inflation Hedge?",
  },
  {
    id: "broker-selection",
    label: "Choosing a Gold Trading Broker",
  },
  {
    id: "editorial-conclusion",
    label: "Broker Alarab Research Conclusion",
  },
  {
    id: "faq",
    label: "Frequently Asked Questions",
  },
  {
    id: "sources",
    label: "Research Methodology and Sources",
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
      "Accelerating inflation and growing expectations of monetary policy tightening",
  },
  {
    year: "2022",
    inflation: 6.5,
    gold: 0.4,
    context:
      "Rising interest rates, higher real yields and a stronger US dollar",
  },
  {
    year: "2023",
    inflation: 3.4,
    gold: 15.0,
    context:
      "Slowing inflation, shifting interest rate expectations and gold demand",
  },
  {
    year: "2024",
    inflation: 2.9,
    gold: 25.5,
    context:
      "Investment demand, central bank purchases and geopolitical risks",
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
      "Explore gold trading accounts, trading costs and order execution conditions.",
  },
  {
    slug: "pepperstone",
    name: "Pepperstone",
    description:
      "Discover available gold trading platforms and account options.",
  },
  {
    slug: "exness",
    name: "Exness",
    description:
      "Review gold trading conditions, leverage requirements and account types.",
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
          Featured Gold Trading Brokers
        </h3>

        <p className="mt-2 text-[12px] leading-6 text-[#dce6ef] sm:text-[14px]">
          Compare broker reviews and gold trading accounts
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
                  alt={`${broker.name} logo`}
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
                href={`/en/brokers/${broker.slug}`}
                className="flex min-h-[42px] items-center justify-center rounded-[8px] border border-[#176ac8] bg-white px-2 py-2 text-center text-[13px] font-bold text-[#176ac8] transition-colors hover:bg-[#edf3fa]"
              >
                Read Review
              </Link>

              {broker.real_account_url ? (

                <a
                  href={broker.real_account_url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="flex min-h-[42px] items-center justify-center rounded-[8px] bg-[#176ac8] px-2 py-2 text-center text-[13px] font-bold text-white transition-colors hover:bg-[#1058a9]"
                >
                  Open Account
                </a>

              ) : (

                <span
                  className="flex min-h-[42px] items-center justify-center rounded-[8px] bg-[#e2e8f0] px-2 py-2 text-center text-[13px] font-bold text-[#64748b]"
                >
                  Unavailable
                </span>

              )}

            </div>

          </div>

        ))}

      </div>

      <div className="px-5 pb-5 text-center">

        <Link
          href="/en/best-brokers/gold"
          className="inline-flex items-center gap-2 text-[14px] font-bold text-[#176ac8] hover:underline"
        >
          Compare All Gold Trading Brokers
          <span aria-hidden="true">→</span>
        </Link>

        <p className="mt-3 text-[11px] leading-6 text-[#64748b]">
          Broker Alarab may receive compensation through
          commercial referral links. Trading conditions
          and account availability vary by jurisdiction
          and regulated entity. CFD trading involves
          a high risk of losing capital.
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
      label: "Highest Inflation in Sample",
      value: "7.0%",
      description: "December 2021",
      color: "#176ac8",
    },
    {
      label: "Gold Return in 2021",
      value: "-4.3%",
      description: "Despite rising inflation",
      color: "#b45309",
    },
    {
      label: "Gold Return in 2024",
      value: "+25.5%",
      description: "With annual inflation at 2.9%",
      color: "#15803d",
    },
    {
      label: "Long-Term Inflation Target",
      value: "2%",
      description: "Measured by PCE",
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
          US Inflation vs. Annual Gold Returns
        </h3>

        <p className="mt-2 text-[13px] leading-6 text-[#64748b]">
          Historical comparison from 2021 to 2024
        </p>

      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 px-3 pt-5">

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-sm bg-[#176ac8]" />

          <span className="text-[12px] font-bold text-[#475569]">
            US Inflation
          </span>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-sm bg-[#c39a3b]" />

          <span className="text-[12px] font-bold text-[#475569]">
            Annual Gold Return
          </span>

        </div>

      </div>

      <div dir="ltr" className="px-2 py-5 sm:px-6">

        <svg
          viewBox="0 0 600 340"
          className="h-auto w-full"
          role="img"
          aria-label="Bar chart comparing December year-over-year US inflation rates and annual US dollar gold returns from 2021 to 2024"
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

        Prepared by the Broker Alarab Research Team
        using inflation data from the US Bureau of Labor
        Statistics and annual US dollar gold returns
        published by the World Gold Council. The bars
        do not represent immediate gold price reactions
        following CPI announcements.

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
        "Year",
        "Annual Inflation",
        "Gold Return",
        "Approx. Real Return",
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
      caption="Inflation: December-to-December change in the headline CPI-U. Gold returns: annual US dollar performance reported by the World Gold Council. Real returns are calculated before fees and taxes."
    />

  );
}

/* =========================================================
   TRANSMISSION MECHANISM INFOGRAPHIC
========================================================= */

function InflationTransmissionDiagram() {

  const pathways = [
    {
      title: "Higher-Than-Expected Inflation",
      steps: [
        "Stronger expectations of monetary tightening",
        "Potential increase in real yields",
        "Potential strengthening of the US dollar",
      ],
      result: "Potential downward pressure on gold",
      background: "#fff7ed",
      border: "#fed7aa",
      color: "#9a3412",
    },
    {
      title: "Lower-Than-Expected Inflation",
      steps: [
        "Stronger expectations of monetary easing",
        "Potential decline in real yields",
        "Potential weakening of the US dollar",
      ],
      result: "Potential support for gold prices",
      background: "#f0fdf4",
      border: "#bbf7d0",
      color: "#166534",
    },
  ];

  return (

    <figure className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-4 sm:p-7">

      <h3 className="mb-2 text-center text-[20px] font-black text-[#102747] sm:text-[23px]">
        How Inflation Surprises Affect Gold Prices
      </h3>

      <p className="mb-6 text-center text-[13px] leading-7 text-[#64748b]">
        Potential transmission channels of economic data
      </p>

      <div className="mx-auto max-w-[420px] rounded-[12px] bg-[#102747] px-4 py-5 text-center text-[17px] font-black text-white">

        US Consumer Price Index (CPI) Release

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

        Broker Alarab analytical diagram illustrating
        possible economic transmission channels.
        These relationships are conditional and do
        not represent guaranteed price movements
        or trading recommendations.

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
        "Indicator",
        "What It Measures",
        "Relevance to Gold",
      ]}
      rows={[
        [
          "CPI",
          "Changes in the prices of consumer goods and services",
          "Inflation trends and economic data surprises",
        ],
        [
          "Core CPI",
          "Consumer inflation excluding food and energy",
          "Assessment of persistent inflationary pressures",
        ],
        [
          "PCE",
          "Changes in personal consumption expenditure prices",
          "The measure associated with the Fed's inflation target",
        ],
        [
          "Core PCE",
          "PCE inflation excluding food and energy",
          "Underlying inflation trends",
        ],
        [
          "Real Yields",
          "Bond yields adjusted for inflation",
          "Opportunity cost of holding non-yielding gold",
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
      title: "Scenario One",
      nominal: "4.0%",
      inflation: "2.0%",
      real: "≈ 2.0%",
      description:
        "Positive real yields may increase the attractiveness of interest-bearing assets.",
    },
    {
      title: "Scenario Two",
      nominal: "4.0%",
      inflation: "5.0%",
      real: "≈ -1.0%",
      description:
        "Negative real yields may increase interest in potential inflation hedges.",
    },
  ];

  return (

    <figure className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-4 sm:p-6">

      <h3 className="mb-2 text-center text-[19px] font-black text-[#102747] sm:text-[23px]">
        How Inflation Changes Real Yields
      </h3>

      <p className="mb-5 text-center text-[13px] leading-6 text-[#64748b]">
        Hypothetical examples with identical nominal yields
      </p>

      <div className="mb-5 rounded-[12px] bg-[#102747] px-3 py-5 text-center text-[15px] font-bold leading-8 text-white sm:text-[18px]">
        Real Yield ≈ Nominal Yield − Expected Inflation
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
                  Nominal Yield
                </span>

                <strong dir="ltr" className="text-[17px] text-[#102747]">
                  {item.nominal}
                </strong>

              </div>

              <div className="flex items-center justify-between gap-2">

                <span className="text-[13px] text-[#475569]">
                  Expected Inflation
                </span>

                <strong dir="ltr" className="text-[17px] text-[#102747]">
                  {item.inflation}
                </strong>

              </div>

              <div className="border-t border-[#dce6ef] pt-4 text-center">

                <div className="text-[12px] font-bold text-[#64748b]">
                  Approximate Real Yield
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
        These figures are hypothetical and do not
        represent actual inflation or interest rate
        readings. Subtraction provides an approximation
        rather than the exact real return formula.
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
        "Forecast",
        "Actual Reading",
        "Inflation Surprise",
        "Initial Interpretation",
      ]}
      rows={[
        [
          "3.0%",
          "3.4%",
          "+0.4 percentage points",
          "Inflation exceeds market expectations",
        ],
        [
          "3.0%",
          "3.0%",
          "Zero",
          "Headline inflation matches expectations",
        ],
        [
          "3.0%",
          "2.6%",
          "-0.4 percentage points",
          "Inflation falls below market expectations",
        ],
      ]}
      caption="All figures are hypothetical and provided for illustration. Forecasts and actual readings must refer to the same indicator and reporting period."
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
        "Inflation",
        "Real Yields",
        "US Dollar",
        "Potential Gold Impact",
      ]}
      rows={[
        [
          "Above expectations",
          "Rising",
          "Strengthening",
          "Potential downward pressure",
        ],
        [
          "Above expectations",
          "Falling",
          "Weakening",
          "Potential upward support",
        ],
        [
          "Below expectations",
          "Falling",
          "Weakening",
          "Potential upward support",
        ],
        [
          "Below expectations",
          "Rising",
          "Strengthening",
          "Potential downward pressure",
        ],
        [
          "In line with expectations",
          "Stable",
          "Stable",
          "Other market drivers may dominate",
        ],
      ]}
      caption="These scenarios illustrate potential relationships rather than guaranteed outcomes or buy and sell signals."
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
        Broker Alarab Research
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
        Read the Full Report
        <span aria-hidden="true">→</span>
      </Link>

    </aside>

  );
}

/* =========================================================
   SECONDARY BROKER COMMERCIAL CARD – XS
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
        Trading Accounts & Platforms
      </div>

      <div className="flex flex-wrap items-center gap-5">

        <div className="flex h-[78px] w-[150px] shrink-0 items-center justify-center rounded-[12px] border border-[#dce6ef] bg-white p-3">

          {broker.logo ? (

            <Image
              src={broker.logo}
              alt="XS broker logo"
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
            Explore XS Trading Accounts
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
              Broker review and account opening guide
            </span>

          </div>

        </div>

      </div>

      <p className="my-5 text-[14px] leading-8 text-[#475569] sm:text-[16px]">

        Explore XS trading account types, gold trading
        conditions, available platforms, financial
        licences and trading costs. Our illustrated
        account opening guide also covers the
        registration and verification process
        step by step.

      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <Link
          href="/en/brokers/xs"
          className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[#176ac8] bg-white px-4 py-3 text-[14px] font-bold text-[#176ac8] hover:bg-[#edf3fa]"
        >
          Read XS Review
        </Link>

        <Link
          href="/en/brokers/xs/open-account"
          className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[#176ac8] bg-white px-4 py-3 text-[14px] font-bold text-[#176ac8] hover:bg-[#edf3fa]"
        >
          Account Opening Guide
        </Link>

        <Link
          href="/en/brokers/xs"
          className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] bg-[#176ac8] px-4 py-3 text-[14px] font-bold text-white hover:bg-[#1058a9]"
        >
          Account Opening Options
        </Link>

      </div>

      <p className="mt-4 text-[11px] leading-6 text-[#64748b]">
        Broker Alarab may receive compensation through
        commercial referral links. Trading CFDs
        involves a high risk of losing capital.
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
      title: "Before the CPI Release",
      description:
        "Check the scheduled release time, market forecasts, previous readings and any existing open positions.",
    },
    {
      number: "02",
      title: "When the Data Is Released",
      description:
        "Compare actual readings with forecasts and examine core inflation and monthly price changes.",
    },
    {
      number: "03",
      title: "Monitor Related Markets",
      description:
        "Watch the US dollar, Treasury yields and changes in monetary policy expectations.",
    },
    {
      number: "04",
      title: "Assess Execution Risks",
      description:
        "Consider spreads, liquidity and potential slippage before making any trading decision.",
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
      "Does higher US inflation always increase gold prices?",
    answer:
      "No. Higher inflation may increase demand for gold as an inflation hedge, but it can also lead to expectations of higher interest rates, rising real yields and a stronger US dollar. The resulting gold price movement depends on the interaction of these factors.",
  },
  {
    question:
      "What happens to gold when CPI is higher than expected?",
    answer:
      "Gold may decline if an upside inflation surprise pushes real yields and the US dollar higher. However, gold may rise if inflation concerns or broader economic risks outweigh the impact of monetary policy expectations.",
  },
  {
    question:
      "What is the difference between CPI and Core CPI for gold traders?",
    answer:
      "Headline CPI measures overall consumer inflation, while Core CPI excludes food and energy. Core inflation provides additional insight into persistent price pressures, making both readings relevant when assessing market reactions.",
  },
  {
    question:
      "Does the Federal Reserve use CPI as its official inflation target?",
    answer:
      "The Federal Reserve monitors a wide range of economic indicators. However, its official longer-run inflation target of 2% is measured using the Personal Consumption Expenditures price index, known as PCE, rather than CPI directly.",
  },
  {
    question:
      "Why does gold sometimes fall when inflation rises?",
    answer:
      "Higher inflation may trigger tighter monetary policy expectations, rising real yields and a stronger US dollar. If these pressures outweigh demand for inflation protection, gold prices may decline despite rising consumer prices.",
  },
  {
    question:
      "Is gold a guaranteed hedge against inflation?",
    answer:
      "No. Gold may contribute to portfolio diversification and purchasing power preservation over longer periods, but its price can decline during periods of high inflation, particularly over shorter investment horizons.",
  },
  {
    question:
      "Which economic indicators should gold traders monitor?",
    answer:
      "Relevant indicators include headline CPI, Core CPI, PCE inflation, US Treasury real yields, the US dollar, Federal Reserve policy expectations and employment data. No individual indicator should be interpreted in isolation.",
  },
  {
    question:
      "Is trading gold during CPI announcements suitable for beginners?",
    answer:
      "CPI announcements can produce sharp volatility, wider spreads and significant slippage. These conditions may be unsuitable for inexperienced traders, particularly when using leveraged financial instruments.",
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

export default function USInflationImpactOnGoldPageEn() {

  return (

    <ArticleLayout
      language="en"
      slug={SLUG}
      title={ARTICLE.title}
      description={ARTICLE.description}
      category={CATEGORY}
      categoryHref={CATEGORY_HREF}
      subcategory={ARTICLE.subcategory}
      articleType="Economic Research & Historical Analysis"
      breadcrumbTitle={ARTICLE.shortTitle}
      author={ARTICLE.author}
      published={ARTICLE.published}
      modified={ARTICLE.modified}
      heroImage={HERO_IMAGE}
      heroImageAlt={
        ARTICLE_SEO.imageAlt || ARTICLE.title
      }
      heroImageCaption="Editorial illustration of the relationship between US inflation, monetary policy and gold prices. Not an actual market price chart."
      contents={contents}
      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }
      introduction={

        <>

          <Paragraph>

            US inflation data is among the most closely
            watched economic indicators in the global
            gold market. Changes in consumer prices
            influence expectations for Federal Reserve
            policy, government bond yields and the
            strength of the US dollar, all of which
            can affect the performance of gold.

          </Paragraph>

          <Paragraph>

            Although gold is widely regarded as a hedge
            against inflation, historical evidence
            demonstrates that the relationship is
            considerably more complex. Gold can decline
            during periods of elevated inflation and
            deliver substantial gains when consumer
            price growth is slowing.

          </Paragraph>

          <Paragraph>

            In this Broker Alarab research report,
            we examine how the US Consumer Price Index{" "}

            <Strong>CPI</Strong>

            {" "}affects gold prices, compare historical
            gold returns with inflation rates, and
            analyse the role of real interest rates,
            monetary policy expectations and economic
            data surprises in the XAU/USD market.

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
        eyebrow="Research Summary"
        title="Key Findings: US Inflation and Gold Prices"
      >

        <Paragraph>

          A comparison of US inflation rates and
          annual gold returns between 2021 and 2024
          reveals significant differences in gold
          performance across inflationary conditions.
          These observations highlight the importance
          of examining multiple economic variables
          rather than relying on inflation alone.

        </Paragraph>

        <ResearchHighlights />

        <ArticleList
          items={[
            "Gold declined by 4.3% in 2021 despite US annual inflation reaching 7% in December.",
            "Gold gained just 0.4% in 2022, even as inflation remained elevated.",
            "Gold rose by approximately 15% in 2023 while annual inflation slowed to 3.4% in December.",
            "Gold delivered a 25.5% annual gain in 2024, when year-end US inflation stood at 2.9%.",
            "Real yields, the US dollar and monetary policy expectations help explain differences in gold performance across these periods.",
          ]}
        />

        <Note title="Principal Research Finding" tone="blue">

          Inflation alone is not a reliable predictor
          of gold prices. Understanding how inflation
          data influences investor expectations,
          real yields, the US dollar and demand for
          gold provides a more comprehensive framework
          for interpreting market movements.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 2
          UNDERSTANDING CPI
      ====================================================== */}

      <ArticleSection
        id="what-is-cpi"
        eyebrow="Economic Indicators"
        title="What Is the US Consumer Price Index (CPI)?"
      >

        <Paragraph>

          The Consumer Price Index, commonly referred
          to as CPI, is one of the principal measures
          used to track changes in the prices paid by
          consumers for goods and services in the
          United States.

        </Paragraph>

        <Paragraph>

          Published by the US Bureau of Labor Statistics
          (BLS), the index covers a broad range of
          expenditure categories, including housing,
          food, energy, transportation, medical care
          and other consumer expenses.

        </Paragraph>

        <SubHeading>

          Monthly Inflation vs. Annual Inflation

        </SubHeading>

        <Paragraph>

          Monthly inflation compares consumer prices
          with the preceding month, whereas annual
          inflation compares prices with the same
          month of the previous year. Annual inflation
          can therefore decline even while consumer
          prices continue rising on a monthly basis.

        </Paragraph>

        <Paragraph>

          A decline in the inflation rate does not
          necessarily mean that goods and services
          are becoming cheaper. It may simply mean
          that consumer prices are increasing at
          a slower pace.

        </Paragraph>

        <SubHeading>

          The Difference Between CPI, Core CPI and PCE

        </SubHeading>

        <InflationIndicatorsTable />

        <Paragraph>

          Gold traders pay particular attention to
          Core CPI because it excludes food and
          energy, two categories that can experience
          substantial short-term price fluctuations.

        </Paragraph>

        <Paragraph>

          However, the Federal Reserve defines its
          longer-run inflation objective using the
          Personal Consumption Expenditures price
          index, or PCE. The central bank targets
          an annual inflation rate of 2% over
          the longer run.

        </Paragraph>

        <Note title="Understanding CPI Readings" tone="blue">

          The numerical level of the CPI index is
          not itself the inflation rate. Inflation
          is calculated as the percentage change in
          the index between two periods. Monthly and
          annual readings should be distinguished
          when comparing economic data with forecasts.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 3
          TRANSMISSION CHANNELS
      ====================================================== */}

      <ArticleSection
        id="inflation-gold-relationship"
        eyebrow="Economic Transmission Channels"
        title="How Does US Inflation Affect Gold Prices?"
      >

        <Paragraph>

          Gold's relationship with inflation is partly
          rooted in its characteristics as a physical
          asset that does not depend on the repayment
          obligations of an issuing institution.
          Some investors therefore hold gold as part
          of strategies designed to reduce exposure
          to declining purchasing power.

        </Paragraph>

        <Paragraph>

          However, inflation hedging represents only
          one side of the relationship. Rising
          inflation can also change expectations
          about the Federal Reserve's response,
          influencing government bond yields and
          the relative strength of the US dollar.

        </Paragraph>

        <InflationTransmissionDiagram />

        <ResearchTable
          headers={[
            "Transmission Channel",
            "Potential Impact",
            "Economic Explanation",
          ]}
          rows={[
            [
              "Rising inflation concerns",
              "Support for gold",
              "Increased interest in purchasing power protection",
            ],
            [
              "Expectations of rate hikes",
              "Possible downward pressure",
              "Greater attractiveness of interest-bearing assets",
            ],
            [
              "Rising real yields",
              "Potential headwind",
              "Higher opportunity cost of holding gold",
            ],
            [
              "Weaker US dollar",
              "Potential support",
              "Lower gold costs in other currencies, all else being equal",
            ],
            [
              "Rising economic risks",
              "Potential support",
              "Greater demand for diversification and defensive assets",
            ],
          ]}
        />

        <Paragraph>

          These transmission channels do not always
          operate in the same direction. Rising
          inflation may increase demand for gold
          as a hedge, while higher real yields
          simultaneously limit gains or place
          downward pressure on prices.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 4
          HISTORICAL COMPARISON
      ====================================================== */}

      <ArticleSection
        id="historical-comparison"
        eyebrow="Historical Market Data"
        title="Historical Comparison: US Inflation vs. Gold Returns"
      >

        <Paragraph>

          To examine whether rising inflation
          consistently coincides with higher gold
          prices, we compare four consecutive years
          characterised by significant changes in
          inflation, monetary policy and global
          financial conditions.

        </Paragraph>

        <Paragraph>

          The comparison uses the December
          year-over-year headline US CPI inflation
          rate for each year alongside annual gold
          returns in US dollars reported by the
          World Gold Council.

        </Paragraph>

        <HistoricalComparisonChart />

        <HistoricalComparisonTable />

        <Paragraph>

          The table distinguishes nominal gold
          returns from approximate inflation-adjusted
          returns. This helps illustrate whether
          gold's performance exceeded the increase
          in consumer prices over the corresponding
          period.

        </Paragraph>

        <Note title="Limitations of the Historical Comparison" tone="blue">

          The sample covers only four years and
          does not constitute a comprehensive
          statistical correlation study. Annual
          returns also do not measure gold's immediate
          reaction to individual CPI releases.
          Such analysis would require intraday
          price data and contemporaneous historical
          market forecasts for each announcement.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 5
          ANALYSIS BY YEAR
      ====================================================== */}

      <ArticleSection
        id="historical-analysis"
        eyebrow="Historical Performance Analysis"
        title="Gold Performance Across Inflation Cycles: 2021–2024"
      >

        <SubHeading>

          2021: Rising Inflation and Falling Gold Prices

        </SubHeading>

        <Paragraph>

          Inflationary pressures accelerated across
          the US economy in 2021 as economic activity
          recovered from the pandemic, supply chains
          remained disrupted and consumer demand
          patterns shifted.

        </Paragraph>

        <Paragraph>

          Despite annual US inflation reaching 7%
          in December, gold recorded a negative
          annual return of 4.3% in US dollars.
          Demand for inflation protection was
          therefore insufficient to ensure positive
          gold performance during the year.

        </Paragraph>

        <SubHeading>

          2022: Elevated Inflation and Aggressive Monetary Tightening

        </SubHeading>

        <Paragraph>

          US inflation remained elevated during 2022,
          while the Federal Reserve began a substantial
          monetary tightening cycle. Higher interest
          rates contributed to rising bond yields and
          increased the attractiveness of the US dollar.

        </Paragraph>

        <Paragraph>

          Although annual inflation stood at 6.5%
          in December, gold delivered only a modest
          annual gain of approximately 0.4%.

        </Paragraph>

        <Paragraph>

          World Gold Council analysis identified
          rising real yields and dollar strength
          as important headwinds during the year,
          while central bank demand and some retail
          investment demand helped offset these pressures.

        </Paragraph>

        <SubHeading>

          2023: Slowing Inflation and Stronger Gold Performance

        </SubHeading>

        <Paragraph>

          As annual US inflation declined to 3.4%
          in December 2023, gold recorded an annual
          gain of approximately 15%, substantially
          outperforming its previous year's return.

        </Paragraph>

        <Paragraph>

          Monetary policy expectations, financial
          uncertainty, geopolitical risks and
          investment demand all contributed to
          the market environment. This illustrates
          why slowing inflation does not necessarily
          reduce the attractiveness of gold.

        </Paragraph>

        <SubHeading>

          2024: Strong Gold Gains Despite Moderating Inflation

        </SubHeading>

        <Paragraph>

          Gold delivered an annual return of 25.5%
          in 2024, while US annual inflation stood
          at 2.9% in December.

        </Paragraph>

        <Paragraph>

          This performance highlights the importance
          of other market drivers, including central
          bank purchases, investment demand, global
          uncertainty and periods of declining
          yields or a weakening US dollar.

        </Paragraph>

        <ResearchTable
          headers={[
            "Year",
            "Economic and Market Context",
          ]}
          rows={historicalData.map((item) => [
            item.year,
            item.context,
          ])}
          caption="An analytical summary of the conditions surrounding annual gold performance. It does not quantify the individual contribution of each market driver."
        />

        <Paragraph>

          Collectively, these examples demonstrate
          that gold does not require accelerating
          inflation to appreciate. Monetary policy,
          investment demand and broader economic
          risks may exert a stronger influence
          than consumer price inflation during
          certain periods.

        </Paragraph>

        <RelatedResearchCard
          title="The Biggest Gold Price Crashes in History"
          description="Explore major historical gold market declines, the scale of recorded losses and the time required for gold prices to recover previous peaks."
          href="/en/articles/gold-price-crashes-history"
        />

      </ArticleSection>

      {/* =====================================================
          SECTION 6
          REAL INTEREST RATES
      ====================================================== */}

      <ArticleSection
        id="real-interest-rates"
        eyebrow="Real Interest Rates"
        title="Why Are Real Yields Important for Gold Prices?"
      >

        <Paragraph>

          Unlike bonds and interest-bearing bank
          deposits, physical gold does not generate
          periodic interest income simply by being
          held. Investors therefore assess the
          opportunity cost of holding gold relative
          to the inflation-adjusted returns available
          from other financial assets.

        </Paragraph>

        <Paragraph>

          When real yields increase, government
          bonds may become more attractive relative
          to gold, increasing the opportunity cost
          associated with holding a non-yielding asset.

        </Paragraph>

        <Paragraph>

          Conversely, declining real yields may
          reduce this opportunity cost and increase
          the relative attractiveness of gold
          within diversified investment portfolios.

        </Paragraph>

        <RealYieldExample />

        <SubHeading>

          Which Indicator Tracks Real Treasury Yields?

        </SubHeading>

        <Paragraph>

          The 10-year US Treasury inflation-indexed
          yield, available through the FRED database
          under the series identifier DFII10, is
          commonly used to monitor market-based
          real yields.

        </Paragraph>

        <Paragraph>

          This measure helps explain certain gold
          price movements that appear inconsistent
          with headline inflation readings. However,
          the relationship varies over time and can
          be influenced by market demand, investor
          positioning and changes in perceived risk.

        </Paragraph>

        <RelatedResearchCard
          title="How Gold Reacts to Federal Reserve Interest Rate Decisions"
          description="Explore Broker Alarab's historical research on gold price movements following 41 Federal Reserve meetings, including interest rate hikes, cuts and unchanged decisions."
          href="/en/articles/gold-reaction-fed-decisions"
        />

      </ArticleSection>

      {/* =====================================================
          SECTION 7
          US DOLLAR
      ====================================================== */}

      <ArticleSection
        id="us-dollar"
        eyebrow="Intermarket Analysis"
        title="The Relationship Between Inflation, the US Dollar and Gold"
      >

        <Paragraph>

          Gold is conventionally priced in US dollars
          in international financial markets.
          Changes in the value of the dollar therefore
          affect the cost of purchasing gold for
          investors using other currencies.

        </Paragraph>

        <Paragraph>

          When the US dollar strengthens, gold can
          become more expensive for international
          buyers, assuming its dollar-denominated
          price remains unchanged. This may limit
          demand for the precious metal.

        </Paragraph>

        <Paragraph>

          Conversely, a weaker dollar can reduce
          the local currency cost of gold for
          international investors, potentially
          supporting demand.

        </Paragraph>

        <Paragraph>

          Inflation data affects the dollar indirectly
          through changes in interest rate expectations
          and differences in yields between the United
          States and other major economies.

        </Paragraph>

        <Note title="Are Gold and the US Dollar Always Inversely Correlated?" tone="blue">

          No. Gold and the US dollar can rise
          simultaneously during certain financial
          crises as investors seek liquidity and
          defensive assets. Dollar movements should
          therefore not be treated as a guaranteed
          indicator of gold's direction.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 8
          CPI SURPRISES
      ====================================================== */}

      <ArticleSection
        id="cpi-surprise"
        eyebrow="Economic Data Interpretation"
        title="Why CPI Surprises Matter More Than the Headline Number Alone"
      >

        <Paragraph>

          Before US inflation data is released,
          financial markets have generally formed
          expectations about the upcoming reading.
          These expectations are informed by previous
          economic data, institutional research and
          economists' forecasts.

        </Paragraph>

        <Paragraph>

          Market expectations may already be partly
          reflected in asset prices before the
          announcement. As a result, investors often
          focus on the difference between the actual
          reading and the prevailing consensus forecast.

        </Paragraph>

        <SubHeading>

          How to Calculate an Inflation Surprise

        </SubHeading>

        <div className="my-6 rounded-[14px] bg-[#102747] px-5 py-6 text-center">

          <div className="mb-3 text-[12px] font-bold text-[#b6d4f5]">
            Simplified Calculation
          </div>

          <div className="text-[17px] font-black leading-9 text-white sm:text-[21px]">
            Inflation Surprise = Actual Reading − Forecast
          </div>

        </div>

        <CPISurpriseTable />

        <Paragraph>

          For example, if markets expect annual
          inflation of 3% and the actual reading
          is 3.4%, the positive inflation surprise
          amounts to 0.4 percentage points.
          This difference may cause investors
          to reassess the expected path of
          US interest rates.

        </Paragraph>

        <Paragraph>

          However, a headline reading that matches
          expectations does not necessarily prevent
          volatility. Core inflation, monthly price
          changes and individual CPI components may
          contain additional information that
          influences the market's interpretation.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 9
          MARKET SCENARIOS
      ====================================================== */}

      <ArticleSection
        id="inflation-scenarios"
        eyebrow="Market Scenario Analysis"
        title="When Does Inflation Support Gold and When Does It Hurt?"
      >

        <Paragraph>

          Analysing inflation alongside real yields
          and the US dollar provides a broader
          framework for understanding conditions
          that may support gold prices or create
          downward pressure.

        </Paragraph>

        <GoldScenariosTable />

        <SubHeading>

          High Inflation and Rising Real Yields

        </SubHeading>

        <Paragraph>

          In this scenario, expectations of tighter
          monetary policy may increase the relative
          attractiveness of interest-bearing assets.
          This can limit gold's ability to benefit
          from elevated inflation.

        </Paragraph>

        <SubHeading>

          High Inflation and Falling Real Yields

        </SubHeading>

        <Paragraph>

          This may create a more supportive environment
          for gold, particularly if declining real
          yields coincide with a weaker dollar and
          increased demand for inflation protection.

        </Paragraph>

        <SubHeading>

          Slowing Inflation and Expectations of Rate Cuts

        </SubHeading>

        <Paragraph>

          Gold may benefit from slowing inflation
          when financial markets expect it to lead
          to easier monetary policy and lower real
          yields. The eventual price response also
          depends on broader economic conditions
          and how much of the anticipated policy
          change has already been priced into the market.

        </Paragraph>

        <Note title="Market Outcomes Are Not Guaranteed" tone="amber">

          Even when several factors appear supportive
          of gold, changes in liquidity, profit-taking,
          investor positioning and unexpected economic
          developments can produce different outcomes.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 10
          CPI TRADING AND RISK
      ====================================================== */}

      <ArticleSection
        id="trading-cpi"
        eyebrow="Gold Trading Insights"
        title="What Gold Traders Should Monitor During CPI Releases"
      >

        <Paragraph>

          Financial markets can experience rapid
          changes in asset prices following major
          economic announcements as expectations,
          liquidity and order flows adjust
          simultaneously across multiple markets.

        </Paragraph>

        <Paragraph>

          For gold traders, interpreting inflation
          data involves more than deciding whether
          the reported reading is high or low.
          Market liquidity, execution conditions
          and risk management are equally important
          considerations.

        </Paragraph>

        <ReleaseChecklist />

        <ResearchTable
          headers={[
            "Indicator or Market Factor",
            "What to Monitor",
          ]}
          rows={[
            [
              "Annual and Monthly CPI",
              "Actual readings relative to consensus forecasts",
            ],
            [
              "Core CPI",
              "Underlying consumer inflation trends",
            ],
            [
              "US Dollar",
              "Direction and magnitude of the market reaction",
            ],
            [
              "Treasury Yields",
              "Changes in nominal and real yields",
            ],
            [
              "Interest Rate Expectations",
              "Repricing of upcoming Federal Reserve decisions",
            ],
            [
              "Execution Costs",
              "Spreads, slippage and available liquidity",
            ],
          ]}
        />

        <Paragraph>

          Trading spreads may widen substantially
          during periods of heightened volatility.
          Orders may also execute at prices that
          differ from their requested levels,
          particularly when market liquidity
          becomes limited.

        </Paragraph>

        <Paragraph>

          Broker Alarab provides a{" "}

          <Link
            href="/en/tools/risk-calculator"
            className="font-bold text-[#176ac8] hover:underline"
          >
            trading risk calculator
          </Link>

          {" "}to help users understand the relationship
          between position size and potential losses.
          Theoretical calculations should not be
          treated as guarantees of actual execution
          prices during volatile market conditions.

        </Paragraph>

        <RelatedResearchCard
          title="Best Times to Trade Gold During the Day"
          description="Explore how liquidity and volatility differ across global trading sessions and why market timing matters for different trading approaches."
          href="/en/articles/best-time-to-trade-gold"
        />

        <Note title="Risks of Trading Gold During Economic Announcements" tone="amber">

          Sharp price movements and financial leverage
          can result in substantial losses over short
          periods. Ordinary stop-loss orders do not
          always guarantee execution at the specified
          price. An economic data release alone is not
          sufficient justification for opening a position.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 11
          GOLD AS AN INFLATION HEDGE
      ====================================================== */}

      <ArticleSection
        id="inflation-hedge"
        eyebrow="Inflation Hedging and Purchasing Power"
        title="Is Gold an Effective Hedge Against Inflation?"
      >

        <Paragraph>

          The effectiveness of gold as an inflation
          hedge depends on the investment horizon,
          the type of investment and the currency
          in which an investor measures returns.

        </Paragraph>

        <Paragraph>

          Over longer periods, gold may contribute
          to portfolio diversification and purchasing
          power preservation. However, gold does not
          provide a contractual return directly
          linked to the Consumer Price Index.

        </Paragraph>

        <Paragraph>

          The historical comparison presented in this
          report demonstrates that gold can generate
          negative inflation-adjusted returns during
          periods of high inflation and positive real
          returns when inflation is moderating.

        </Paragraph>

        <ResearchTable
          headers={[
            "Financial Instrument",
            "Nature of Exposure",
            "Key Considerations",
          ]}
          rows={[
            [
              "Physical Gold",
              "Potential inflation hedge and asset diversification",
              "Price volatility, storage costs and transaction expenses",
            ],
            [
              "Inflation-Protected Bonds",
              "Inflation-linked adjustment mechanism",
              "Yield and market price risk before maturity",
            ],
            [
              "Gold Funds",
              "Exposure to gold through a fund structure",
              "Management fees, tracking risk and investment structure",
            ],
            [
              "Gold CFDs",
              "Derivative exposure to gold price movements",
              "Leverage, financing costs and execution risk",
            ],
          ]}
        />

        <SubHeading>

          Investing in Gold vs. Trading XAU/USD

        </SubHeading>

        <Paragraph>

          An important distinction exists between
          owning physical gold as a long-term
          investment and trading gold contracts
          for difference using financial leverage.

        </Paragraph>

        <Paragraph>

          Gold CFDs do not provide ownership of the
          underlying metal and may involve overnight
          financing costs, spreads, commissions and
          margin requirements. Leveraged gold trading
          should therefore not be considered a
          direct substitute for holding physical gold
          as a long-term inflation hedge.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 12
          BROKER SELECTION
      ====================================================== */}

      <ArticleSection
        id="broker-selection"
        eyebrow="Choosing a Trading Broker"
        title="How to Evaluate Gold Trading Brokers for Volatile Markets"
      >

        <Paragraph>

          When comparing brokers offering gold-related
          financial instruments, traders should
          consider more than minimum deposits and
          maximum available leverage.

        </Paragraph>

        <Paragraph>

          Execution quality, transparent trading
          conditions and transaction costs during
          volatile market periods may be more
          relevant than certain advertised
          promotional features.

        </Paragraph>

        <ArticleList
          items={[
            "Verify the broker's regulatory licences and the legal entity providing the service.",
            "Review average spreads, commissions and overnight financing costs.",
            "Understand gold contract sizes and the monetary value of price movements.",
            "Check margin requirements and applicable stop-out levels.",
            "Review order execution and slippage policies.",
            "Identify any restrictions on trading during major economic announcements.",
          ]}
        />

        <Paragraph>

          Our comparison of the{" "}

          <Link
            href="/en/best-brokers/gold"
            className="font-bold text-[#176ac8] hover:underline"
          >
            best gold trading brokers
          </Link>

          {" "}provides a starting point for reviewing
          brokerage services, trading account conditions
          and individual broker assessments.

        </Paragraph>

        <XSReviewCard />

      </ArticleSection>

      {/* =====================================================
          SECTION 13
          EDITORIAL CONCLUSION
      ====================================================== */}

      <ArticleSection
        id="editorial-conclusion"
        eyebrow="Broker Alarab Research"
        title="Conclusion: Understanding Inflation's Impact on Gold Prices"
      >

        <Paragraph>

          From the perspective of the Broker Alarab
          Research Team, US inflation represents
          an important variable in gold market
          analysis. However, inflation alone does
          not provide a sufficient explanation for
          every movement in gold prices.

        </Paragraph>

        <Paragraph>

          Historical data from the period examined
          demonstrates that gold may record losses
          or modest gains during years of elevated
          inflation, while delivering substantial
          positive returns during periods of
          slowing consumer price growth.

        </Paragraph>

        <div className="my-7 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

          <div className="mb-3 text-[12px] font-bold text-[#176ac8]">
            Research Conclusion
          </div>

          <h3 className="mb-5 text-[21px] font-black text-[#102747] sm:text-[25px]">
            Four Key Factors Behind Gold's Reaction to CPI
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {[
              "The size of the inflation surprise",
              "Changes in monetary policy expectations",
              "The direction of real interest rates",
              "US dollar movements and gold demand",
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

          Interpreting inflation data within a
          broader economic framework provides
          a more meaningful basis for understanding
          gold price movements than assuming that
          every increase in inflation will result
          in an immediate appreciation of gold.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 14
          FAQ
      ====================================================== */}

      <ArticleSection
        id="faq"
        eyebrow="Questions & Answers"
        title="Frequently Asked Questions About Inflation and Gold Prices"
      >

        <ResearchFAQ />

      </ArticleSection>

      {/* =====================================================
          SECTION 15
          METHODOLOGY AND SOURCES
      ====================================================== */}

      <ArticleSection
        id="sources"
        eyebrow="Research Methodology & References"
        title="Research Methodology and Historical Data Sources"
      >

        <Paragraph>

          This report was prepared by the Broker
          Alarab Research Team using economic data
          published by the US Bureau of Labor
          Statistics, the Federal Reserve and the
          FRED database, alongside research and
          market reports from the World Gold Council.

        </Paragraph>

        <SubHeading>

          Historical Comparison Methodology

        </SubHeading>

        <ArticleList
          items={[
            "Research period: four complete calendar years from 2021 to 2024.",
            "Inflation measure: December year-over-year headline US Consumer Price Index for All Urban Consumers (CPI-U).",
            "Gold performance: annual US dollar gold returns reported by the World Gold Council.",
            "Real returns: nominal gold returns adjusted using US inflation over the corresponding period.",
            "The comparison excludes brokerage charges, storage costs, taxes and financing expenses.",
            "The research does not provide a statistical measurement of immediate gold price reactions to individual CPI announcements.",
          ]}
        />

        <div className="my-6 rounded-[14px] border border-[#dce6ef] bg-[#f7faff] p-5">

          <div className="mb-3 text-[14px] font-black text-[#102747]">
            Inflation-Adjusted Return Calculation
          </div>

          <div
            dir="ltr"
            className="break-words text-center text-[15px] font-bold leading-8 text-[#176ac8] sm:text-[18px]"
          >
            Real Return = ((1 + R) / (1 + I) − 1) × 100
          </div>

          <p className="mt-3 text-[12px] leading-7 text-[#64748b]">

            R represents the nominal return expressed
            as a decimal, while I represents the
            inflation rate expressed as a decimal.
            Displayed results are rounded to
            one decimal place.

          </p>

        </div>

        <ArticleSources />

        <div className="mt-7 rounded-[12px] border border-[#e3eaf1] bg-[#f8fafc] p-4 sm:p-5">

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            <strong className="text-[#102747]">
              Disclaimer:
            </strong>

            {" "}This report is provided for research,
            educational and informational purposes
            only. It does not constitute investment
            advice or a recommendation to buy or sell
            gold or any other financial instrument.
            Past performance is not a reliable indicator
            of future results. Market volatility and
            financial leverage can result in substantial
            losses. Broker Alarab may receive compensation
            through commercial referral links available
            on this website.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}

/* ================= END ARTICLE ================= */