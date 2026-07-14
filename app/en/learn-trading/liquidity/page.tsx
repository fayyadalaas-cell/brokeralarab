import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/liquidity";

const ARABIC_PAGE_URL =
  "https://brokeralarab.com/learn-trading/liquidity";

const PAGE_TITLE =
  "What Is Liquidity in Trading? Forex Liquidity Explained";

const PAGE_DESCRIPTION =
  "Learn what liquidity means in trading, how forex liquidity affects spreads, slippage and order execution, and why market depth changes throughout the day.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: ARABIC_PAGE_URL,
      "x-default": PAGE_URL,
    },
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Broker Alarab",
    locale: "en_US",
    alternateLocale: ["ar_AR"],
    type: "article",
  },

  robots: {
    index: true,
    follow: true,
  },

  keywords: [
    "what is liquidity in trading",
    "forex liquidity",
    "liquidity in forex",
    "market liquidity",
    "market liquidity explained",
    "liquidity provider",
    "forex liquidity provider",
    "high liquidity market",
    "low liquidity market",
    "liquidity and spread",
    "liquidity and slippage",
    "market depth",
    "order book liquidity",
    "forex order execution",
    "bid ask spread liquidity",
    "best time to trade forex",
    "forex trading sessions",
    "liquidity vs volume",
    "institutional liquidity",
    "thin market trading",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What Is Liquidity?" },
  { id: "how-it-works", label: "How Liquidity Works" },
  { id: "example", label: "Execution Example" },
  { id: "levels", label: "Liquidity Levels" },
  { id: "impact", label: "Impact on Trading" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "faq", label: "FAQs" },
];

const liquidityLevels = [
  {
    title: "High Liquidity",
    subtitle: "High Liquidity",
    description:
      "A highly liquid market has many buyers and sellers near the current price, allowing orders to be matched quickly without causing a large price change.",
    points: [
      "Bid and ask prices are usually closer together.",
      "Orders are more likely to fill near the requested price.",
      "Larger positions can often be absorbed more efficiently.",
    ],
    badge: "Deeper market",
  },
  {
    title: "Moderate Liquidity",
    subtitle: "Normal Liquidity",
    description:
      "Moderate liquidity is generally sufficient for typical retail orders, although execution quality may change with position size, news and trading session.",
    points: [
      "Suitable for most retail position sizes.",
      "Spreads may remain stable in normal conditions.",
      "Execution can weaken during sudden volatility.",
    ],
    badge: "Typical conditions",
  },
  {
    title: "Low Liquidity",
    subtitle: "Thin Market",
    description:
      "A low-liquidity market has fewer available orders close to the current price, making it easier for individual trades to move through several price levels.",
    points: [
      "Spreads may widen significantly.",
      "Slippage becomes more likely.",
      "Price gaps and sharp moves may occur more easily.",
    ],
    badge: "Higher execution risk",
  },
];

const liquidityFactors = [
  {
    icon: "🕒",
    title: "Trading Session",
    description:
      "Forex liquidity changes throughout the day. It is often deeper when major financial centres are active, particularly during the London and New York overlap.",
  },
  {
    icon: "💱",
    title: "Currency Pair",
    description:
      "Major currency pairs such as EUR/USD typically have deeper liquidity than exotic pairs because more banks, institutions and traders participate in them.",
  },
  {
    icon: "📰",
    title: "Economic News",
    description:
      "Trading activity may rise around major announcements, but available orders near the current price can disappear quickly, causing wider spreads and stronger slippage.",
  },
  {
    icon: "🏦",
    title: "Liquidity Providers",
    description:
      "Banks, non-bank institutions and pricing networks provide executable bid and ask quotes that help brokers route and fill client orders.",
  },
];

const commonMistakes = [
  {
    title: "Confusing Volume With Liquidity",
    description:
      "High trading activity does not always mean orders can be executed efficiently without moving through several price levels.",
  },
  {
    title: "Judging Liquidity by Spread Alone",
    description:
      "A tight top-of-book spread may hide limited order depth behind the best bid and ask prices.",
  },
  {
    title: "Ignoring Position Size",
    description:
      "A market may be liquid enough for a small order but unable to fill a much larger position at one price.",
  },
  {
    title: "Assuming Liquidity Is Constant",
    description:
      "Liquidity changes with trading sessions, news releases, market holidays and unexpected events.",
  },
];

const faqItems = [
  {
    question: "What is liquidity in trading?",
    answer:
      "Liquidity describes how easily an asset can be bought or sold at a price close to the current market quote without the order causing a significant price change.",
  },
  {
    question: "What does liquidity mean in forex?",
    answer:
      "Forex liquidity refers to the availability of executable buy and sell prices across currency pairs. A deeper market usually allows orders to be filled more efficiently.",
  },
  {
    question: "How does liquidity affect the spread?",
    answer:
      "When many buyers and sellers compete near the current price, bid and ask quotes generally move closer together. When liquidity declines, the spread may widen.",
  },
  {
    question: "What is a liquidity provider in forex?",
    answer:
      "A liquidity provider is a bank, financial institution or specialist pricing firm that supplies bid and ask quotes and executable order flow to brokers and trading venues.",
  },
  {
    question: "When is forex liquidity usually highest?",
    answer:
      "Forex liquidity is often strongest during the active hours of major financial centres, particularly when the London and New York sessions overlap. Conditions still vary by currency pair and market event.",
  },
  {
    question: "Is liquidity the same as trading volume?",
    answer:
      "No. Volume measures how much trading activity occurs, while liquidity describes how easily an order can be executed without producing a large price impact.",
  },
  {
    question: "How does low liquidity cause slippage?",
    answer:
      "When insufficient volume is available at the requested price, the order must consume liquidity at the next available levels. This can produce an average execution price different from the original quote.",
  },
];

const relatedGuides = [
  {
    title: "What Is Spread?",
    description:
      "Learn how the bid-ask spread affects trading costs and why it changes with liquidity.",
    href: "/en/learn-trading/spread",
  },
  {
    title: "What Is Lot Size?",
    description:
      "Understand how position size can affect risk, pip value and order execution.",
    href: "/en/learn-trading/lot",
  },
  {
    title: "What Is a Stop Loss?",
    description:
      "Learn how stop-loss orders may be affected by slippage during fast or thin markets.",
    href: "/en/learn-trading/stop-loss",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://brokeralarab.com/en",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Learn Trading",
      item: "https://brokeralarab.com/en/learn-trading",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Liquidity in Trading",
      item: PAGE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  url: PAGE_URL,
  inLanguage: "en",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  url: PAGE_URL,
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "en",

  author: {
    "@id": "https://brokeralarab.com/#organization",
  },

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },

  isPartOf: {
    "@id": "https://brokeralarab.com/#website",
  },

  publisher: {
    "@id": "https://brokeralarab.com/#organization",
  },

  about: [
    {
      "@type": "Thing",
      name: "Market liquidity",
    },
    {
      "@type": "Thing",
      name: "Forex liquidity",
    },
    {
      "@type": "Thing",
      name: "Liquidity providers",
    },
    {
      "@type": "Thing",
      name: "Market depth",
    },
    {
      "@type": "Thing",
      name: "Spread and slippage",
    },
    {
      "@type": "Thing",
      name: "Order execution",
    },
  ],

  keywords: [
    "market liquidity",
    "forex liquidity",
    "liquidity provider",
    "market depth",
    "bid-ask spread",
    "slippage",
    "order execution",
    "high liquidity",
    "low liquidity",
  ],

  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "en",

  isPartOf: {
    "@id": "https://brokeralarab.com/#website",
  },

  publisher: {
    "@id": "https://brokeralarab.com/#organization",
  },

  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },

  mainEntity: {
    "@id": `${PAGE_URL}#article`,
  },
};

export default function LiquidityPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="liquidity-en-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="liquidity-en-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="liquidity-en-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="liquidity-en-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs font-bold text-slate-500 sm:px-6 lg:px-8">
          <Link
            href="/en"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand-500"
          >
            Home
          </Link>

          <span className="text-slate-300">/</span>

          <Link
            href="/en/learn-trading"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand-500"
          >
            Learn Trading
          </Link>

          <span className="text-slate-300">/</span>

          <span className="text-slate-800">
            Liquidity
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="absolute bottom-[-140px] right-[-80px] h-[320px] w-[320px] rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                Market Structure Guide
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                10-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.25] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.15]">
              What Is Liquidity in Trading?

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.3] text-slate-700 sm:block lg:text-[34px]">
                How Forex Liquidity Affects Spreads, Slippage and Execution
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              Liquidity measures how easily a market can absorb buy and sell
              orders without a significant price change. This guide explains
              how forex liquidity works, how market depth affects execution,
              why spreads widen in thin markets and when liquidity is typically
              strongest during the trading day.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                Start the Guide
              </a>

              <Link
                href="/en/learn-trading/spread"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                Spread Guide
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Market depth explained
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Execution examples
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Forex session insights
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    High-liquidity market example
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-black text-cyan-700">
                  Deep Liquidity
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-emerald-700 sm:min-h-0 sm:text-xs">
                    Best bid price
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.1000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    BID PRICE
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-brand-600 sm:min-h-0 sm:text-xs">
                    Best ask price
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.1001
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    ASK PRICE
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-cyan-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-cyan-700">
                    Bid-ask spread
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    1 pip
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  More executable orders near the current price
                </p>

                <p className="mt-1 text-2xl font-black">
                  Tighter Spread and Better Execution
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tablet and desktop navigation */}
      <div className="sticky top-0 z-30 hidden border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur sm:block">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <nav
            aria-label="Page contents"
            className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="w-full min-w-0 space-y-7">
            {/* Definition */}
            <section
              id="definition"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="01"
                eyebrow="Liquidity Meaning"
                title="How Does Market Liquidity Affect the Ability to Buy or Sell?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  Liquidity is the ability of a market to process buy and sell
                  orders quickly without requiring a substantial price change.
                  A liquid market contains many executable orders close to the
                  current quote, making it easier for participants to enter or
                  exit positions.
                </p>

                <p>
                  Liquidity does not mean that prices remain stable or that
                  losses cannot occur. It describes the market&apos;s ability
                  to absorb transactions. In a thin market, even a relatively
                  modest order may move through several price levels before it
                  is fully executed.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms, high liquidity means more buyers, sellers
                  and executable orders near the current price. Low liquidity
                  means fewer available orders and a greater risk of wider
                  spreads and slippage.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Depth"
                  title="Market Depth"
                  description="The amount of buy and sell liquidity available across multiple price levels."
                />

                <MiniDefinition
                  label="Spread"
                  title="Bid-Ask Spread"
                  description="The difference between the highest available bid and lowest available ask."
                />

                <MiniDefinition
                  label="Execution"
                  title="Execution Quality"
                  description="How quickly an order fills and how close the result is to the requested price."
                />
              </div>
            </section>

            {/* How it works */}
            <section
              id="how-it-works"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="02"
                eyebrow="Market Mechanics"
                title="How Do Buy and Sell Orders Create Market Liquidity?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Market liquidity comes from executable orders and price quotes
                submitted by traders, banks, institutions, market makers and
                other liquidity providers. When substantial volume is
                available at closely grouped prices, incoming orders can be
                matched without moving far from the current quote.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Deeper Liquidity = More Orders + Tighter Prices + Easier Execution
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Buy-side liquidity"
                    value="Deep"
                    sublabel="BUY ORDERS"
                  />

                  <CalculationBox
                    label="Sell-side liquidity"
                    value="Deep"
                    sublabel="SELL ORDERS"
                  />

                  <CalculationBox
                    label="Execution quality"
                    value="More efficient"
                    sublabel="EXECUTION"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  How an order moves through the market
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="The trader submits a buy or sell order with a selected position size."
                  />

                  <Step
                    number="2"
                    text="The execution system searches for the best available prices and quantities."
                  />

                  <Step
                    number="3"
                    text="If the first price level cannot fill the entire order, the remaining amount is matched at additional levels."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Heavy trading activity does not always mean deep liquidity
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  During major economic announcements, transaction volume may
                  surge while liquidity providers temporarily widen quotes or
                  reduce available size. The result can be stronger volatility,
                  wider spreads and less predictable execution.
                </p>
              </div>
            </section>

            {/* Practical example */}
            <section
              id="example"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="03"
                eyebrow="Liquidity Example"
                title="How Does Order Execution Change in Deep and Thin Markets?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Assume a trader wants to buy 1.00 lot of EUR/USD near 1.1000.
                The final fill depends on how much sell-side liquidity is
                available at that price and at the next levels in the order
                book.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Order size"
                  value="1.00 lot"
                />

                <StatCard
                  label="Requested price"
                  value="1.1000"
                />

                <StatCard
                  label="Deep market"
                  value="Closer fill"
                />

                <StatCard
                  label="Thin market"
                  value="Multiple prices"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Comparing the execution result
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Requested price
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      1.1000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      ORDER SUBMITTED
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      High-liquidity fill
                    </p>

                    <p className="mt-2 text-xl font-black text-emerald-600">
                      1.1001
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      SMALLER SLIPPAGE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      Low-liquidity fill
                    </p>

                    <p className="mt-2 text-xl font-black text-rose-600">
                      1.1005
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      LARGER SLIPPAGE
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    ⚠️
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    The displayed price may cover only a limited quantity
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  The best available quote may be sufficient for only part of
                  the order. When the requested position is larger than the
                  quantity available, the remainder is filled at other prices,
                  producing a different average execution price.
                </p>
              </div>
            </section>
                        {/* Liquidity levels */}
            <section
              id="levels"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Market Conditions"
                title="What Is the Difference Between High and Low Liquidity?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Liquidity changes throughout the trading day. It may be deep
                when major financial centres are active and significantly
                thinner during quiet sessions, holidays or periods of market
                uncertainty. These changes can be seen in spreads, available
                order size and execution quality.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {liquidityLevels.map((level, index) => (
                  <details
                    key={level.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            {level.title}
                          </h3>

                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                            {level.badge}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {level.subtitle}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {level.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {level.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-[12px] font-bold leading-6 text-slate-700"
                          >
                            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[9px] text-brand-600">
                              ✓
                            </span>

                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>

              {/* Tablet and desktop */}
              <div className="mt-6 hidden items-stretch gap-4 sm:grid lg:grid-cols-3">
                {liquidityLevels.map((level) => (
                  <div
                    key={level.title}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
                        {level.badge}
                      </span>

                      <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
                        {level.subtitle}
                      </span>
                    </div>

                    <div className="min-h-[66px] pt-4">
                      <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:whitespace-nowrap lg:text-[19px]">
                        {level.title}
                      </h3>
                    </div>

                    <div className="pb-5 pt-2">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {level.description}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4">
                      {level.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm font-bold leading-6 text-slate-700"
                        >
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[9px] text-brand-600">
                            ✓
                          </span>

                          <span className="min-w-0 flex-1">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Comparison table */}
              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    Comparison
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    High Liquidity
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Moderate Liquidity
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Low Liquidity
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <LiquidityComparisonRow
                    title="Bid-ask spread"
                    high="Usually tighter"
                    medium="Generally stable"
                    low="Often wider"
                  />

                  <LiquidityComparisonRow
                    title="Execution speed"
                    high="Usually faster"
                    medium="Normally stable"
                    low="May become slower"
                  />

                  <LiquidityComparisonRow
                    title="Slippage risk"
                    high="Relatively lower"
                    medium="Still possible"
                    low="More likely"
                  />

                  <LiquidityComparisonRow
                    title="Large-order execution"
                    high="More efficient"
                    medium="Depends on depth"
                    low="More difficult"
                  />
                </div>
              </div>
            </section>

            {/* Market impact */}
            <section
              id="impact"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Trading Execution"
                title="How Does Liquidity Affect Spreads, Slippage and Order Fills?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Liquidity directly influences transaction costs and execution
                quality. When sufficient volume is available near the current
                market price, orders can be matched more efficiently. When
                available liquidity is limited, the order may move through
                several price levels before it is completely filled.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ✓
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      In a High-Liquidity Market
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "Bid and ask prices are often closer together.",
                      "More executable volume is available near the current quote.",
                      "A single retail order is less likely to move the market.",
                      "Orders have a better chance of filling near the requested price.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700"
                      >
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
                          ✓
                        </span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ⚠️
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      In a Low-Liquidity Market
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "Bid-ask spreads may widen unexpectedly.",
                      "Orders are more likely to fill at several prices.",
                      "Larger positions may create a stronger market impact.",
                      "Slippage and price gaps become more likely.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700"
                      >
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[9px] text-rose-700">
                          !
                        </span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile factors */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {liquidityFactors.map((factor) => (
                  <details
                    key={factor.title}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                          {factor.icon}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {factor.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-brand-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {factor.description}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Desktop factors */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {liquidityFactors.map((factor) => (
                  <div
                    key={factor.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        {factor.icon}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-950">
                          {factor.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {factor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  How Market Depth Changes the Final Fill
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Available at first price"
                    value="0.30 lot"
                    sublabel="FIRST LEVEL"
                  />

                  <CalculationBox
                    label="Total order size"
                    value="1.00 lot"
                    sublabel="ORDER SIZE"
                  />

                  <CalculationBox
                    label="Remaining amount"
                    value="0.70 lot"
                    sublabel="NEXT LEVELS"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    The displayed quote may not cover the entire order
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  The best bid or ask may represent only a limited quantity. If
                  the order exceeds the amount available at that level, the
                  remaining volume is filled at other prices, producing a
                  different volume-weighted average execution price.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  What Should You Check Before Placing a Trade?
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Check the current bid-ask spread before submitting the order.",
                    "Compare your position size with the market's available depth.",
                    "Consider the active trading session and scheduled news.",
                    "Include possible slippage in the risk-management plan.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-xl bg-white/10 p-3 text-sm font-bold leading-6 text-slate-200"
                    >
                      <span className="text-sky-300">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/en/learn-trading/spread"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Read the Spread Guide
                  </Link>

                  <Link
                    href="/en/tools/lot-size-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Calculate Lot Size
                  </Link>
                </div>
              </div>
            </section>

            {/* Common mistakes */}
            <section
              id="mistakes"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="Reading Market Conditions"
                title="What Are the Most Common Liquidity Mistakes?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Liquidity cannot be measured from one number alone. A market
                may appear active while offering limited executable volume near
                the current price. Liquidity that is sufficient for a small
                retail order may also be insufficient for a substantially
                larger position.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {commonMistakes.map((mistake, index) => (
                  <details
                    key={mistake.title}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[11px] font-black text-rose-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {mistake.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-brand-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {mistake.description}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Desktop */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {commonMistakes.map((mistake, index) => (
                  <div
                    key={mistake.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-xs font-black text-rose-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-950">
                          {mistake.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {mistake.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-lg">
                    ⚠️
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Do not judge liquidity from the spread alone
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  A tight spread is useful, but it does not show how much
                  executable volume exists behind the best quote. The
                  top-of-book spread may be narrow while deeper order-book
                  liquidity remains limited.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  What is the difference between liquidity and volatility?
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Liquidity measures how easily trades can be executed without
                  causing a large price impact. Volatility measures the speed
                  and size of price movements. A market can be highly liquid
                  and highly volatile at the same time.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section
              id="faq"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="07"
                eyebrow="Trader Questions"
                title="Market and Forex Liquidity Frequently Asked Questions"
              />

              <div className="mt-6 space-y-3">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-black leading-7 text-slate-950 transition hover:bg-white sm:px-5 sm:py-5 sm:text-base">
                      <span className="flex items-center gap-3">
                        <span className="hidden h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500 sm:block" />
                        <span>{item.question}</span>
                      </span>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4 text-sm font-medium leading-7 text-slate-600 sm:px-5 sm:py-5 sm:text-[15px] sm:leading-8">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related guides */}
            <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8">
              <div className="text-center">
                <span className="inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-[11px]">
                  Continue Learning
                </span>

                <h2 className="mt-3 text-[24px] font-black leading-[1.35] text-slate-950 sm:text-3xl">
                  Trading Concepts Related to Liquidity and Execution
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding spread, lot size and stop-loss execution can
                  help you evaluate how market liquidity affects trading costs,
                  fills and risk management.
                </p>
              </div>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3.5 transition hover:border-brand-200 hover:bg-brand-50/50"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[16px] font-black leading-6 text-slate-950 transition group-hover:text-brand-600">
                        {guide.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-[12px] font-medium leading-5 text-slate-600">
                        {guide.description}
                      </p>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-base font-black text-brand-500 shadow-sm transition group-hover:border-brand-200 group-hover:bg-brand-50">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Tablet and desktop */}
              <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[20px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-black leading-9 text-slate-950 transition group-hover:text-brand-600">
                        {guide.title}
                      </h3>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-black text-brand-500 shadow-sm transition group-hover:border-brand-200 group-hover:bg-brand-50">
                        →
                      </div>
                    </div>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                      {guide.description}
                    </p>

                    <span className="mt-4 inline-flex text-sm font-black text-brand-500">
                      Read the Guide
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          {/* Desktop sidebar */}
          <aside className="hidden min-w-0 lg:sticky lg:top-24 lg:block lg:w-[300px]">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-black text-brand-500">
                In This Guide
              </p>

              <h2 className="mt-2 text-lg font-black text-slate-950">
                Page Contents
              </h2>

              <nav className="mt-4 space-y-1.5">
                {tableOfContents.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-600"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-4 overflow-hidden rounded-[24px] bg-gradient-to-br from-brand-600 to-slate-950 p-5 text-white shadow-[0_18px_50px_rgba(30,91,184,0.22)]">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-black text-sky-100">
                Related Guide
              </span>

              <h2 className="mt-3 text-xl font-black">
                Understand Trading Spreads
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                Learn how bid-ask spreads are calculated and why trading costs
                change with liquidity, volatility and market conditions.
              </p>

              <Link
                href="/en/learn-trading/spread"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                Open the Spread Guide
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14 lg:px-8">
          <div className="overflow-hidden rounded-[24px] bg-slate-950 px-4 py-6 text-center text-white sm:rounded-[34px] sm:px-10 sm:py-12">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black text-sky-200 sm:text-[11px]">
              Your Next Step
            </span>

            <h2 className="mx-auto mt-3 max-w-3xl text-[24px] font-black leading-[1.35] sm:mt-4 sm:text-3xl sm:leading-tight">
              Check Market Liquidity Before Entering a Trade
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Review the spread, trading session and position size before
              submitting an order. Deep liquidity may improve execution, but
              it cannot eliminate slippage during fast markets or major news.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/en/learn-trading/spread"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Spread Guide
              </Link>

              <Link
                href="/en/tools/lot-size-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Lot Size Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
}: {
  number: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-0 sm:gap-4">
      <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white shadow-[0_8px_20px_rgba(30,91,184,0.20)] sm:flex">
        {number}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black text-brand-500 sm:text-xs">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-[25px] font-black leading-[1.3] text-slate-950 sm:text-3xl sm:leading-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}

function MiniDefinition({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 sm:block sm:p-4">
      <span className="inline-flex h-8 min-w-14 shrink-0 items-center justify-center rounded-xl bg-white px-2 text-[9px] font-black uppercase text-brand-500 shadow-sm sm:h-auto sm:min-w-0 sm:justify-start sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-[10px]">
        {label}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-black leading-6 text-slate-950 sm:mt-3 sm:text-base">
          {title}
        </h3>

        <p className="mt-0.5 text-[12px] font-medium leading-5 text-slate-600 sm:mt-1.5 sm:text-sm sm:leading-6">
          {description}
        </p>
      </div>
    </div>
  );
}

function CalculationBox({
  label,
  value,
  sublabel,
  highlighted = false,
}: {
  label: string;
  value: string;
  sublabel: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`border-b border-slate-200 p-5 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 ${
        highlighted ? "bg-brand-50" : "bg-white"
      }`}
    >
      <p className="text-xs font-bold text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-black ${
          highlighted ? "text-brand-600" : "text-slate-950"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] font-black uppercase text-slate-400">
        {sublabel}
      </p>
    </div>
  );
}

function Step({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-[11px] font-black text-white sm:text-xs">
        {number}
      </span>

      <p className="min-w-0 flex-1 pt-0.5 text-[13px] font-bold leading-6 text-slate-700 sm:text-sm">
        {text}
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center ${
        accent
          ? "border-brand-200 bg-brand-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className="text-[11px] font-bold text-slate-500 sm:text-xs">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-black sm:text-xl ${
          accent ? "text-brand-600" : "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function LiquidityComparisonRow({
  title,
  high,
  medium,
  low,
}: {
  title: string;
  high: string;
  medium: string;
  low: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {high}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {medium}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {low}
      </div>
    </div>
  );
}