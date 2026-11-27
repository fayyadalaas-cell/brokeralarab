import Link from "next/link";

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
   FOREX BROKER NEWS
   IC MARKETS – ANTHROPIC STOCK CFD
   ENGLISH VERSION
========================================================= */

const SLUG = "ic-markets-anthropic-stock-cfd";

const CATEGORY = "Forex Broker News";

const CATEGORY_HREF = "/en/forex-broker-news";

const HERO_IMAGE =
  "/articles/ic-markets-anthropic-stock-cfd.webp";

const ARTICLE = {
  title: "IC Markets Launches Anthropic Stock CFDs",

  seoTitle:
    "IC Markets Launches Anthropic Stock CFDs",

  description:
    "IC Markets expands its trading offering with Anthropic stock CFDs on MT5 following the company's Nasdaq listing. Explore the instrument and its trading risks.",

  shortTitle:
    "IC Markets Launches Anthropic Stock CFDs",

  subcategory:
    "Broker Updates",

  author:
    "Broker Alarab Editorial Team",

  published:
    "2026-11-27",

  modified:
    "2026-11-27",
};

/* =========================================================
   OFFICIAL SOURCES
========================================================= */

const sources = [
  {
    title:
      "IC – Anthropic Post-IPO Trading",
    url:
      "https://www.ic.com/blog/should-you-trade-anthropic-post-ipo-ic/",
  },
  {
    title:
      "Anthropic – Initial Public Offering Pricing",
    url:
      "https://www.anthropic.com/news/anthropic-prices-initial-public-offering",
  },
  {
    title:
      "Nasdaq – Anthropic Marks its IPO at Nasdaq",
    url:
      "https://www.nasdaq.com/newsroom/anthropic-marks-ipo-at-nasdaq",
  },
  {
    title:
      "Anthropic – Closing of Initial Public Offering",
    url:
      "https://www.anthropic.com/news/ipo-close",
  },
  {
    title:
      "Anthropic – Investor Relations and Stock Information",
    url:
      "https://investor.anthropic.com/stock-quote/stock-quote/default.aspx",
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
    "IC Markets introduces Anthropic stock CFDs following its Nasdaq listing",

  imageWidth: 1774,

  imageHeight: 887,

  hasTranslation: true,

  tags: [
    "IC Markets",
    "Anthropic",
    "Stock CFDs",
    "Nasdaq",
    "Artificial Intelligence",
    "Forex Broker News",
  ],

  keywords: [
    "IC Markets news",
    "Anthropic stock trading",
    "Anthropic stock CFD",
    "Anthropic IPO",
    "ANT Nasdaq",
    "MT5 stock CFDs",
    "Forex broker news",
  ],

  about: [
    {
      "@type": "Organization",
      name: "IC Markets",
      url: "https://www.icmarkets.com",
    },
    {
      "@type": "Organization",
      name: "Anthropic",
      url: "https://www.anthropic.com",
    },
    {
      "@type": "Organization",
      name: "Nasdaq",
      url: "https://www.nasdaq.com",
    },
    {
      "@type": "Thing",
      name: "Contracts for Difference",
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
    id: "anthropic-nasdaq-ipo",
    label: "Anthropic's Nasdaq Listing",
  },
  {
    id: "trading-instrument",
    label: "New Trading Instrument Details",
  },
  {
    id: "pre-ipo-vs-stock-cfd",
    label: "Pre-IPO vs. Post-IPO Trading",
  },
  {
    id: "market-volatility",
    label: "Stock Volatility and Trading Risks",
  },
  {
    id: "industry-impact",
    label: "Implications for the Brokerage Industry",
  },
  {
    id: "sources",
    label: "News Sources",
  },
];

/* =========================================================
   TRADING INSTRUMENT DATA
========================================================= */

const instrumentDetails = [
  {
    label: "Broker",
    value: "IC Markets",
  },
  {
    label: "Underlying Asset",
    value: "Anthropic Stock",
  },
  {
    label: "Instrument Type",
    value: "Stock Contract for Difference (CFD)",
  },
  {
    label: "Reference Exchange",
    value: "Nasdaq",
  },
  {
    label: "Stock Ticker",
    value: "ANT",
  },
  {
    label: "IC Trading Symbol",
    value: "ANT.NAS-24",
  },
  {
    label: "Trading Platform",
    value: "MetaTrader 5 (MT5)",
  },
  {
    label: "Physical Share Ownership",
    value: "No",
  },
  {
    label: "Instrument Availability",
    value: "Subject to regulatory entity and client eligibility",
  },
];

/* =========================================================
   TRADING INSTRUMENT TABLE
========================================================= */

function InstrumentDetailsTable() {

  return (
    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      <table className="w-full table-fixed border-collapse text-center">

        <thead className="bg-[#102747] text-white">

          <tr>

            <th className="w-[43%] px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              Specification
            </th>

            <th className="px-3 py-4 text-[13px] font-bold sm:px-5 sm:text-[15px]">
              Details
            </th>

          </tr>

        </thead>

        <tbody>

          {instrumentDetails.map((item, index) => (

            <tr
              key={item.label}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f6f9fc]"
              }
            >

              <td className="break-words border-t border-[#e3eaf1] px-3 py-3.5 text-[13px] font-bold text-[#102747] sm:px-5 sm:text-[15px]">
                {item.label}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-3 py-3.5 text-[13px] leading-7 text-[#475569] sm:px-5 sm:text-[15px]">
                {item.value}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

/* =========================================================
   IPO KEY FIGURES
========================================================= */

function AnthropicIPOFigures() {

  const figures = [
    {
      label: "IPO Price",
      value: "$83",
      description: "Per share",
    },
    {
      label: "Stock Ticker",
      value: "ANT",
      description: "Nasdaq",
    },
    {
      label: "Shares Offered",
      value: "1.127",
      description: "Billion shares",
    },
    {
      label: "Trading Debut",
      value: "Nov 19",
      description: "2026",
    },
  ];

  return (
    <div className="my-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

      {figures.map((figure) => (

        <div
          key={figure.label}
          className="rounded-[15px] border border-[#dce6ef] bg-[#f7faff] px-3 py-5 text-center sm:px-4"
        >

          <div className="mb-3 text-[12px] font-bold text-[#64748b] sm:text-[13px]">
            {figure.label}
          </div>

          <div className="text-[24px] font-black leading-tight text-[#102747] sm:text-[30px]">
            {figure.value}
          </div>

          <div className="mt-2 text-[12px] font-medium text-[#64748b] sm:text-[13px]">
            {figure.description}
          </div>

        </div>

      ))}

    </div>
  );
}

/* =========================================================
   PRE-IPO VS STOCK CFD
========================================================= */

const comparisonRows = [
  {
    label: "Pricing Reference",
    before: "Estimated company valuation",
    after: "Exchange-listed stock price",
  },
  {
    label: "Publicly Listed Shares",
    before: "No",
    after: "Yes",
  },
  {
    label: "Price Transparency",
    before: "Relatively limited",
    after: "Relatively higher",
  },
  {
    label: "Physical Share Ownership",
    before: "No",
    after: "No",
  },
  {
    label: "Trading Risk",
    before: "High",
    after: "High",
  },
];

function PreIPOComparisonTable() {

  return (
    <div className="my-6 overflow-hidden rounded-[16px] border border-[#dce6ef]">

      <table className="w-full table-fixed border-collapse text-center">

        <thead className="bg-[#102747] text-white">

          <tr>

            <th className="w-[30%] px-2 py-4 text-[12px] font-bold sm:px-5 sm:text-[15px]">
              Feature
            </th>

            <th className="w-[35%] px-2 py-4 text-[12px] font-bold sm:px-5 sm:text-[15px]">
              Pre-IPO
            </th>

            <th className="w-[35%] px-2 py-4 text-[12px] font-bold sm:px-5 sm:text-[15px]">
              Post-IPO
            </th>

          </tr>

        </thead>

        <tbody>

          {comparisonRows.map((row, index) => (

            <tr
              key={row.label}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f6f9fc]"
              }
            >

              <td className="break-words border-t border-[#e3eaf1] px-2 py-4 text-[12px] font-bold leading-6 text-[#102747] sm:px-5 sm:text-[15px]">
                {row.label}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-2 py-4 text-[12px] leading-6 text-[#475569] sm:px-5 sm:text-[15px]">
                {row.before}
              </td>

              <td className="break-words border-t border-[#e3eaf1] px-2 py-4 text-[12px] leading-6 text-[#475569] sm:px-5 sm:text-[15px]">
                {row.after}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

/* =========================================================
   RELATED BROKER REVIEW
========================================================= */

function BrokerReviewCard() {

  return (
    <div className="my-8 rounded-[18px] border border-[#dce6ef] bg-[#f7faff] p-5 sm:p-7">

      <div className="mb-3 text-[12px] font-bold text-[#176ac8] sm:text-[13px]">
        Broker Review
      </div>

      <h3 className="mb-3 text-[21px] font-black text-[#102747] sm:text-[25px]">
        Explore Our IC Markets Review
      </h3>

      <p className="mb-5 text-[14px] leading-8 text-[#475569] sm:text-[16px]">

        Read Broker Alarab's independent review of IC Markets,
        covering regulatory oversight, trading accounts, fees,
        available platforms, and the broker's key advantages
        and disadvantages.

      </p>

      <Link
        href="/en/brokers/icmarkets"
        className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#176ac8] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1058a9] sm:w-auto sm:text-[15px]"
      >

        Read Full IC Markets Review

        <span aria-hidden="true">→</span>

      </Link>

    </div>
  );
}

/* =========================================================
   OFFICIAL SOURCES SECTION
========================================================= */

function ArticleSources() {

  return (
    <div className="my-5 overflow-hidden rounded-[16px] border border-[#dce6ef]">

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
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf3fa] text-[12px] font-bold text-[#176ac8]"
          >
            {index + 1}
          </span>

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 break-words text-[13px] font-bold leading-7 text-[#176ac8] transition-colors hover:text-[#102747] hover:underline sm:text-[15px]"
          >

            {source.title}

            <span className="ms-2" aria-hidden="true">
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

export default function ICMarketsAnthropicStockCFDPage() {

  return (

    <ArticleLayout

      language="en"

      slug={SLUG}

      title={ARTICLE.title}

      description={ARTICLE.description}

      category={CATEGORY}

      categoryHref={CATEGORY_HREF}

      subcategory={ARTICLE.subcategory}

      articleType="News & Analysis"

      breadcrumbTitle={ARTICLE.shortTitle}

      author={ARTICLE.author}

      published={ARTICLE.published}

      modified={ARTICLE.modified}

      heroImage={HERO_IMAGE}

      heroImageAlt={
        ARTICLE_SEO.imageAlt || ARTICLE.title
      }

      heroImageCaption="The expansion of trading instruments linked to artificial intelligence stocks – Broker Alarab"

      contents={contents}

      structuredData={
        <ArticleStructuredData config={ARTICLE_SEO} />
      }

      introduction={

        <>

          <Paragraph>

            <Link
              href="/en/brokers/icmarkets"
              className="font-bold text-[#176ac8] hover:underline"
            >
              IC Markets
            </Link>

            {" "}has expanded its range of financial instruments
            with stock CFDs linked to Anthropic, the artificial
            intelligence company behind the Claude family of
            AI models, through MetaTrader 5 following the
            company's listing on the Nasdaq stock exchange.

          </Paragraph>

          <Paragraph>

            The development marks a transition from
            valuation-based pre-IPO trading to derivatives
            referencing a publicly traded stock, as investor
            interest in artificial intelligence continues
            to shape product offerings across the global
            financial brokerage industry.

          </Paragraph>

        </>

      }

    >

      {/* =====================================================
          SECTION 1
          ANTHROPIC NASDAQ IPO
      ====================================================== */}

      <ArticleSection

        id="anthropic-nasdaq-ipo"

        eyebrow="IPOs and Equity Markets"

        title="Anthropic's Nasdaq Listing"

      >

        <Paragraph>

          Anthropic began trading on the Nasdaq Global
          Select Market on November 19, 2026, under the
          ticker symbol{" "}

          <Strong>ANT</Strong>

          , following an initial public offering priced
          at $83 per share.

        </Paragraph>

        <Paragraph>

          The listing represents a significant development
          for the artificial intelligence sector, reflecting
          investor interest in generative AI, advanced
          language models, and the broader commercial
          development of artificial intelligence technologies.

        </Paragraph>

        <AnthropicIPOFigures />

        <Paragraph>

          According to Anthropic's official IPO closing
          announcement, the offering included approximately
          1.127 billion Class A common shares, following
          the exercise of the underwriters' additional
          share purchase option.

        </Paragraph>

        <Paragraph>

          The public listing established an observable
          market price for Anthropic shares, providing
          brokers with an exchange-based reference for
          derivative products such as stock CFDs.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 2
          NEW TRADING INSTRUMENT
      ====================================================== */}

      <ArticleSection

        id="trading-instrument"

        eyebrow="Trading Product Updates"

        title="IC Markets' New Trading Instrument"

      >

        <Paragraph>

          The Anthropic CFD allows eligible traders to
          gain exposure to movements in the company's
          share price without purchasing or directly
          owning its underlying shares.

        </Paragraph>

        <Paragraph>

          IC's official post-IPO product information
          identifies the instrument as ANT.NAS-24,
          available through the MetaTrader 5 platform,
          with access subject to the applicable regulatory
          entity and account conditions.

        </Paragraph>

        <InstrumentDetailsTable />

        <Note
          title="Trading Specifications"
          tone="blue"
        >

          Leverage, margin requirements, commissions,
          trading hours, and instrument availability
          may vary depending on the regulatory entity,
          account type, and the trader's country of
          residence. Traders should consult the current
          contract specifications before opening
          a position.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 3
          PRE-IPO VS STOCK CFD
      ====================================================== */}

      <ArticleSection

        id="pre-ipo-vs-stock-cfd"

        eyebrow="Understanding Trading Instruments"

        title="Anthropic Trading Before and After Its IPO"

      >

        <Paragraph>

          The primary distinction between pre-IPO
          derivatives and CFDs on publicly listed shares
          concerns the reference used to determine the
          instrument's price.

        </Paragraph>

        <SubHeading>

          Trading Before the IPO

        </SubHeading>

        <Paragraph>

          Before Anthropic's stock exchange listing,
          there was no publicly traded share price.
          Pre-IPO instruments therefore relied on
          valuation-based pricing mechanisms determined
          by the product's structure and the broker's
          applicable trading conditions.

        </Paragraph>

        <SubHeading>

          Stock CFD Trading After the IPO

        </SubHeading>

        <Paragraph>

          Following the Nasdaq listing, Anthropic's
          publicly traded share price became available
          as a reference for stock CFD pricing, subject
          to the broker's spreads, execution policies,
          and individual contract specifications.

        </Paragraph>

        <PreIPOComparisonTable />

        <Paragraph>

          Greater transparency in the underlying
          reference price does not necessarily mean
          lower trading risk. Newly listed stocks
          can experience substantial volatility,
          particularly during their first trading sessions.

        </Paragraph>

      </ArticleSection>

      {/* =====================================================
          SECTION 4
          MARKET VOLATILITY
      ====================================================== */}

      <ArticleSection

        id="market-volatility"

        eyebrow="Risk Management"

        title="Anthropic Stock Volatility and Trading Risks"

      >

        <Paragraph>

          Newly listed companies can experience significant
          price fluctuations as investors reassess growth
          expectations, profitability prospects, and company
          valuations following the transition to public markets.

        </Paragraph>

        <Paragraph>

          Anthropic's official investor relations data
          showed a share price of $82.79 on November 25,
          2026, slightly below its initial public offering
          price of $83.

          This illustrates that even widely anticipated
          technology listings can experience downward
          price movements after their market debut.

        </Paragraph>

        <Paragraph>

          When trading through CFDs, the use of leverage
          can amplify the financial impact of movements
          in the underlying share price.

          Important risks include:

        </Paragraph>

        <ArticleList

          items={[

            "Elevated share price volatility during the initial post-IPO period.",

            "Potential widening of bid-ask spreads during unstable market conditions.",

            "Amplified gains and losses resulting from leveraged trading.",

            "Potential price slippage during order execution.",

            "Exposure to earnings announcements, growth expectations, and competition within the artificial intelligence sector.",

          ]}

        />

        <Note
          title="Risk Warning"
          tone="amber"
        >

          Contracts for difference are complex financial
          instruments that carry a high risk of capital
          loss. Trading Anthropic stock CFDs does not
          provide ownership of the company's underlying
          shares or confer shareholder voting rights.

        </Note>

      </ArticleSection>

      {/* =====================================================
          SECTION 5
          BROKER ALARAB EDITORIAL ANALYSIS
      ====================================================== */}

      <ArticleSection

        id="industry-impact"

        eyebrow="Broker Alarab Analysis"

        title="What This Means for the Brokerage Industry"

      >

        <Paragraph>

          From Broker Alarab's editorial perspective,
          the introduction of stock CFDs linked to
          artificial intelligence companies reflects
          a broader effort by financial brokers to
          diversify beyond traditional currency pairs,
          commodities, and equity indices.

        </Paragraph>

        <Paragraph>

          The ability to respond quickly to significant
          developments in global equity markets is
          becoming an increasingly relevant competitive
          factor, particularly as traders show interest
          in technology companies and major initial
          public offerings.

        </Paragraph>

        <Paragraph>

          However, product diversity alone should not
          determine the quality of a financial broker.
          Regulatory oversight, pricing transparency,
          trading costs, execution quality, and customer
          support remain essential considerations
          when evaluating a brokerage provider.

        </Paragraph>

        <BrokerReviewCard />

      </ArticleSection>

      {/* =====================================================
          SECTION 6
          OFFICIAL SOURCES
      ====================================================== */}

      <ArticleSection

        id="sources"

        eyebrow="References and Verification"

        title="News Sources"

      >

        <Paragraph>

          This report draws on official broker product
          information, corporate announcements,
          investor relations disclosures, and information
          published by the Nasdaq stock exchange.

        </Paragraph>

        <ArticleSources />

        <div className="mt-7 rounded-[12px] border border-[#e3eaf1] bg-[#f8fafc] p-4 sm:p-5">

          <p className="text-[12px] leading-7 text-[#64748b] sm:text-[13px]">

            <strong className="text-[#102747]">
              Disclaimer:
            </strong>

            {" "}This article was prepared by the
            Broker Alarab Editorial Team for informational
            and educational purposes only. It does not
            constitute investment advice or a recommendation
            to buy or sell any financial instrument.
            Product availability remains subject to
            applicable regulatory requirements,
            geographical restrictions, and broker terms.

          </p>

        </div>

      </ArticleSection>

    </ArticleLayout>

  );
}

/* ================= END ARTICLE ================= */