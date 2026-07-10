import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL = "https://brokeralarab.com/en/learn-trading/spread";
const ARABIC_PAGE_URL = "https://brokeralarab.com/learn-trading/spread";

const PAGE_TITLE =
  "What Is Spread in Forex Trading? Beginner’s Guide";

const PAGE_DESCRIPTION =
  "Learn what spread means in forex trading, how bid and ask prices work, how spreads are calculated, and how trading costs affect your positions.";

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
    "what is spread in forex",
    "forex spread",
    "spread in trading",
    "bid ask spread",
    "how is forex spread calculated",
    "fixed spread vs variable spread",
    "forex spread explained",
    "what is a good forex spread",
    "why forex spreads widen",
    "forex trading costs",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What is spread?" },
  { id: "calculation", label: "How it is calculated" },
  { id: "example", label: "Trading example" },
  { id: "types", label: "Types of spread" },
  { id: "increase", label: "Why spreads widen" },
  { id: "good-spread", label: "What is a good spread?" },
  { id: "faq", label: "FAQs" },
];

const spreadTypes = [
  {
    title: "Variable Spread",
    subtitle: "Floating Spread",
    description:
      "A variable spread changes with market liquidity and volatility. It can remain very low during active trading hours but may widen sharply during major news releases or thin market conditions.",
    points: [
      "Often tighter in highly liquid markets.",
      "May widen during economic announcements.",
      "Common on raw-spread and professional accounts.",
    ],
    badge: "Most common",
  },
  {
    title: "Fixed Spread",
    subtitle: "Fixed Pricing",
    description:
      "A fixed spread normally stays at a predefined level under standard market conditions, helping traders estimate transaction costs before placing an order.",
    points: [
      "Trading costs are easier to estimate.",
      "May be wider than variable pricing in normal markets.",
      "Broker conditions may still apply during extreme volatility.",
    ],
    badge: "More predictable",
  },
];

const spreadIncreaseReasons = [
  {
    icon: "📰",
    title: "Economic News",
    description:
      "Spreads may widen before and after major inflation, interest-rate, employment, and central-bank announcements because prices can move rapidly.",
  },
  {
    icon: "🌙",
    title: "Low Liquidity",
    description:
      "When fewer buyers and sellers are active, the gap between available bid and ask prices may become wider.",
  },
  {
    icon: "📈",
    title: "High Volatility",
    description:
      "Fast-moving markets make order execution more difficult, which can increase the difference between buying and selling prices.",
  },
  {
    icon: "🕒",
    title: "Market Open and Close",
    description:
      "Spreads can be wider around the weekly market open, late trading sessions, holidays, and periods between major sessions.",
  },
];

const faqItems = [
  {
    question: "Is the spread the same as a trading commission?",
    answer:
      "Not always. The spread is the difference between the bid and ask prices, while a commission is a separate fee that may be charged when opening or closing a trade. Some accounts charge only a spread, while raw-spread accounts may combine tighter spreads with a separate commission.",
  },
  {
    question: "Is the spread charged as soon as I open a trade?",
    answer:
      "The effect of the spread appears immediately after a position is opened. This is why a new trade normally begins with a small unrealised loss equal to the difference between the entry and exit prices.",
  },
  {
    question: "Why do forex spreads widen during news events?",
    answer:
      "Major announcements can cause rapid price changes and lower available liquidity. Brokers and liquidity providers may therefore quote a wider difference between the best bid and ask prices.",
  },
  {
    question: "Does a low spread automatically mean a broker is better?",
    answer:
      "No. A low spread is valuable, but traders should also review regulation, commissions, execution quality, slippage, withdrawal policies, platform stability, and customer support.",
  },
  {
    question: "What is the difference between a spread and a pip?",
    answer:
      "A pip is a unit used to measure a price movement. The spread is the difference between the bid and ask prices, and it is commonly expressed in pips.",
  },
  {
    question: "Does spread matter for long-term traders?",
    answer:
      "Yes, although it usually has a greater impact on day traders, scalpers, and other traders who open many short-term positions. For longer-term trades, financing costs and market movement may have a larger overall effect.",
  },
];

const relatedGuides = [
  {
    title: "What Is a Lot in Forex?",
    description:
      "Learn how forex lot sizes work and how position size affects profit, loss, and risk.",
    href: "/en/learn-trading/lot",
  },
  {
    title: "What Is Leverage?",
    description:
      "Understand how leverage works, why traders use it, and the risks of leveraged trading.",
    href: "/en/learn-trading/leverage",
  },
  {
    title: "What Is Margin?",
    description:
      "Learn the difference between used margin, free margin, and margin level.",
    href: "/en/learn-trading/margin",
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
      name: "Forex Spread",
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
      name: "Forex Spread",
    },
    {
      "@type": "Thing",
      name: "Bid and Ask Prices",
    },
    {
      "@type": "Thing",
      name: "Forex Trading Costs",
    },
    {
      "@type": "Thing",
      name: "Fixed Spread",
    },
    {
      "@type": "Thing",
      name: "Variable Spread",
    },
  ],
  keywords: [
    "forex spread",
    "bid ask spread",
    "fixed spread",
    "variable spread",
    "forex trading costs",
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
export default function SpreadPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-[#f6f8fc] text-slate-950">
     <Script
  id="spread-en-breadcrumb-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>

<Script
  id="spread-en-webpage-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(webPageSchema),
  }}
/>

<Script
  id="spread-en-article-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema),
  }}
/>

<Script
  id="spread-en-faq-schema"
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

          <span className="text-slate-800">Forex Spread</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-80px] h-[320px] w-[320px] rounded-full bg-sky-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                Beginner’s Guide
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                7-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.25]">
              What Is Spread in Forex Trading?
              <span className="mt-1 hidden text-brand-500 sm:block">
                Bid, Ask and Trading Costs Explained
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              The spread is one of the most important trading costs to
              understand before opening a forex position. This guide explains
              bid and ask prices, how spreads are calculated, why they change,
              and how they affect your trade from the moment it is opened.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                Start Learning
              </a>

              <Link
                href="/en/tools/pip-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                Pip Calculator
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Clear explanation
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Practical examples
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Beginner friendly
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Currency pair example
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  Market Open
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4 text-center">
                  <p className="text-xs font-black text-rose-600">
                    Sell Price
                  </p>

                  <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    1.08500
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-slate-500">
                    BID
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-center">
                  <p className="text-xs font-black text-emerald-700">
                    Buy Price
                  </p>

                  <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    1.08515
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-slate-500">
                    ASK
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-center">
                  <p className="text-[10px] font-black text-brand-500">
                    Difference between prices
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    1.5 pips
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  This difference is the
                </p>

                <p className="mt-1 text-2xl font-black">Spread</p>
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
            className="grid auto-cols-max grid-flow-col grid-rows-2 gap-2 overflow-x-auto py-3 pb-3.5 [scrollbar-width:none] sm:flex sm:grid-flow-row sm:grid-rows-none sm:flex-nowrap sm:py-3 [&::-webkit-scrollbar]:hidden"
          >
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-9 shrink-0 snap-start items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 sm:min-h-0 sm:px-4 sm:py-2 sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="w-full min-w-0 space-y-7">
            {/* Definition */}
            <section
              id="definition"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="01"
                eyebrow="Core Definition"
                title="What Is a Spread in Forex Trading?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  The spread is the difference between the{" "}
                  <strong>bid price</strong> and the{" "}
                  <strong>ask price</strong> of a financial instrument. In
                  forex, it represents one of the main costs of entering and
                  exiting a currency trade.
                </p>

                <p>
                  A trading platform displays two prices for every market. The
                  higher price is normally the price at which you can buy, while
                  the lower price is the price at which you can sell. The gap
                  between these two quotes is the spread.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms: if EUR/USD can be bought at 1.08515 and sold
                  at 1.08500, the 0.00015 difference equals a spread of 1.5
                  pips.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Bid"
                  title="Sell Price"
                  description="The price available when you sell the instrument."
                />

                <MiniDefinition
                  label="Ask"
                  title="Buy Price"
                  description="The price available when you buy the instrument."
                />

                <MiniDefinition
                  label="Spread"
                  title="Price Difference"
                  description="The gap between the current bid and ask prices."
                />
              </div>
            </section>

            {/* Calculation */}
            <section
              id="calculation"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="02"
                eyebrow="Spread Calculation"
                title="How Is the Forex Spread Calculated?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                The spread is calculated by subtracting the bid price from the
                ask price. The result is then expressed in pips or points,
                depending on the instrument and the number of quoted decimal
                places.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Spread = Ask Price − Bid Price
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Ask price"
                    value="1.08515"
                    sublabel="BUY"
                  />

                  <CalculationBox
                    label="Bid price"
                    value="1.08500"
                    sublabel="SELL"
                  />

                  <CalculationBox
                    label="Spread"
                    value="1.5"
                    sublabel="PIPS"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  Calculation steps
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="Subtract the bid price of 1.08500 from the ask price of 1.08515."
                  />

                  <Step
                    number="2"
                    text="The price difference is 0.00015."
                  />

                  <Step
                    number="3"
                    text="For EUR/USD, this difference is equal to 1.5 pips."
                  />
                </div>
              </div>
            </section>

            {/* Practical example */}
            <section
              id="example"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="03"
                eyebrow="Practical Example"
                title="How Does the Spread Affect a Forex Trade?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Assume you open a one-standard-lot position on EUR/USD and the
                pip value is approximately $10. If the quoted spread is 1.5
                pips, the spread cost is approximately $15.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Position size" value="1 lot" />
                <StatCard label="Pip value" value="$10" />
                <StatCard label="Spread" value="1.5 pips" />
                <StatCard label="Spread cost" value="$15" accent />
              </div>

              <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <div>
                    <h3 className="font-black text-slate-950">
                      What happens when the trade opens?
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                      The position will normally begin with an unrealised loss
                      of approximately $15 because of the spread. The market
                      must move around 1.5 pips in your favour before the trade
                      reaches break-even, excluding commissions, slippage, and
                      financing costs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-4 sm:p-6">
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-500">
                      When opened
                    </p>

                    <p className="mt-2 text-xl font-black text-rose-600">
                      -$15
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-black text-slate-500">
                    →
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-500">
                      After a 1.5-pip move
                    </p>

                    <p className="mt-2 text-xl font-black text-emerald-600">
                      $0
                    </p>
                  </div>
                </div>
              </div>
            </section>
                        {/* Types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Spread Types"
                title="What Are the Main Types of Forex Spread?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Forex brokers generally offer variable or fixed spreads. Each
                pricing model behaves differently, and neither option is
                automatically better for every trader, strategy, or market
                condition.
              </p>

              {/* Mobile only */}
              <div className="mt-5 space-y-3 sm:hidden">
                {spreadTypes.map((type, index) => (
                  <details
                    key={type.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[18px] font-black leading-7 text-slate-950">
                            {type.title}
                          </h3>

                          <span className="rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[9px] font-black text-brand-600">
                            {type.badge}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {type.subtitle}
                        </p>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-4">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {type.description}
                      </p>

                      <ul className="mt-4 space-y-2.5">
                        {type.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5 text-[13px] font-bold leading-6 text-slate-700"
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
              <div className="mt-6 hidden gap-4 sm:grid lg:grid-cols-2">
                {spreadTypes.map((type) => (
                  <div
                    key={type.title}
                    className="flex h-full flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black text-slate-950">
                          {type.title}
                        </h3>

                        <p className="mt-1 text-xs font-black uppercase tracking-wide text-brand-500">
                          {type.subtitle}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
                        {type.badge}
                      </span>
                    </div>

                    <p className="mt-4 min-h-[84px] text-sm font-medium leading-7 text-slate-600">
                      {type.description}
                    </p>

                    <ul className="mt-auto space-y-2.5 pt-4">
                      {type.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-700"
                        >
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[9px] text-brand-600">
                            ✓
                          </span>

                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Desktop and tablet comparison table */}
              <div className="mt-6 hidden overflow-x-auto rounded-[22px] border border-slate-200 sm:block">
                <table className="w-full min-w-[620px] text-left">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-black">
                        Comparison
                      </th>

                      <th className="px-4 py-4 text-center text-sm font-black">
                        Variable Spread
                      </th>

                      <th className="px-4 py-4 text-center text-sm font-black">
                        Fixed Spread
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 bg-white">
                    <TableRow
                      title="Changes with market conditions"
                      floating="Yes"
                      fixed="Usually no"
                    />

                    <TableRow
                      title="Can be low in normal markets"
                      floating="Often"
                      fixed="Not always"
                    />

                    <TableRow
                      title="May widen during major news"
                      floating="Yes"
                      fixed="Depends on broker terms"
                    />

                    <TableRow
                      title="Cost predictability"
                      floating="Moderate"
                      fixed="Higher"
                    />
                  </tbody>
                </table>
              </div>
            </section>

            {/* Spread increase */}
            <section
              id="increase"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Market Conditions"
                title="Why Do Forex Spreads Widen?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Spreads do not always remain at the same level. Variable spreads
                can widen when liquidity falls, volatility rises, or prices move
                too quickly for normal market quotes to remain stable.
              </p>

              {/* Mobile only */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {spreadIncreaseReasons.map((reason) => (
                  <details
                    key={reason.title}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm">
                          {reason.icon}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {reason.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-3.5">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {reason.description}
                      </p>
                    </div>
                  </details>
                ))}

                {/* Mobile spread widening example */}
                <details className="group overflow-hidden rounded-[18px] border border-amber-200 bg-amber-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                        💡
                      </span>

                      <div>
                        <p className="text-[10px] font-black text-amber-700">
                          Market example
                        </p>

                        <h3 className="mt-0.5 text-[15px] font-black text-slate-950">
                          How can the spread widen?
                        </h3>
                      </div>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-lg font-normal text-amber-700 shadow-sm transition duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="space-y-2.5 border-t border-amber-200 bg-white p-3">
                    <MobileSpreadExample
                      title="Normal market"
                      description="Good liquidity and stable pricing"
                      spread="0.8 pips"
                    />

                    <MobileSpreadExample
                      title="During major news"
                      description="Higher volatility and lower liquidity"
                      spread="4.5 pips"
                      warning
                    />
                  </div>
                </details>
              </div>

              {/* Tablet and desktop reasons */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {spreadIncreaseReasons.map((reason) => (
                  <div
                    key={reason.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl">
                        {reason.icon}
                      </span>

                      <div>
                        <h3 className="font-black text-slate-950">
                          {reason.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet and desktop visual comparison */}
              <div className="mt-6 hidden gap-4 sm:grid lg:grid-cols-2">
                <SpreadVisual
                  title="Normal Market Conditions"
                  spread="0.8 pips"
                  description="Strong liquidity and stable price movement"
                  bars={2}
                />

                <SpreadVisual
                  title="During Major News"
                  spread="4.5 pips"
                  description="Fast price movement and reduced liquidity"
                  bars={6}
                  warning
                />
              </div>
            </section>

            {/* Good spread */}
            <section
              id="good-spread"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="Choosing an Account"
                title="What Is Considered a Good Forex Spread?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                There is no single spread that is good for every market. A
                competitive spread depends on the currency pair or instrument,
                account type, trading session, liquidity, commission structure,
                and broker pricing model.
              </p>

              {/* Mobile only */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                <MobileGoodSpreadCard
                  title="Major Currency Pairs"
                  value="Usually tighter"
                  description="Pairs such as EUR/USD and USD/JPY often have lower spreads because they attract high trading volume and liquidity."
                />

                <MobileGoodSpreadCard
                  title="Minor and Exotic Pairs"
                  value="Usually wider"
                  description="Less actively traded currency pairs often have lower liquidity, which can lead to higher transaction costs."
                />

                <MobileGoodSpreadCard
                  title="Gold, Indices and CFDs"
                  value="Varies by instrument"
                  description="Spreads on gold, stock indices, commodities, and CFDs should not be compared directly with standard forex-pair spreads."
                />
              </div>

              {/* Tablet and desktop */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-3">
                <GoodSpreadCard
                  title="Major Currency Pairs"
                  value="Usually tighter"
                  description="Pairs such as EUR/USD and USD/JPY often have lower spreads because of strong market liquidity."
                />

                <GoodSpreadCard
                  title="Minor and Exotic Pairs"
                  value="Usually wider"
                  description="Lower liquidity can result in a wider difference between the available bid and ask prices."
                />

                <GoodSpreadCard
                  title="Gold, Indices and CFDs"
                  value="Varies by instrument"
                  description="Compare each instrument according to its own pricing structure, contract size, and trading conditions."
                />
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  Before choosing a low-spread broker
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Check the broker’s average spread, not only its advertised minimum.",
                    "Review any separate commission charged on raw-spread accounts.",
                    "Compare trading costs during different sessions and market conditions.",
                    "Consider regulation, execution quality, slippage, and withdrawal policies.",
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
                    href="/en/lowest-spread-brokers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Best Low-Spread Brokers
                  </Link>

                  <Link
                    href="/en/brokers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Browse Broker Reviews
                  </Link>
                </div>
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
                title="Frequently Asked Questions About Forex Spreads"
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
                  Trading Concepts Related to Spread
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding lot size, leverage, and margin will help you
                  calculate trading costs, control position size, and manage
                  risk more effectively.
                </p>
              </div>

              {/* Mobile only */}
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
                      Read the guide
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
                In this guide
              </p>

              <h2 className="mt-2 text-lg font-black text-slate-950">
                Page Contents
              </h2>

              <nav className="mt-4 space-y-1.5">
                {tableOfContents.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
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
                Free Trading Tool
              </span>

              <h2 className="mt-3 text-xl font-black">
                Calculate Pip Value
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                Use our pip calculator to estimate the value of a price movement
                based on your currency pair and position size.
              </p>

              <Link
                href="/en/tools/pip-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                Open Pip Calculator
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
              Next Step
            </span>

            <h2 className="mx-auto mt-3 max-w-3xl text-[24px] font-black leading-[1.35] sm:mt-4 sm:text-3xl sm:leading-tight">
              Compare Forex Brokers Before Opening a Live Account
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Compare regulation, spreads, commissions, account types,
              execution conditions, deposits, and withdrawals before choosing
              a forex broker.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/en/brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Broker Reviews
              </Link>

              <Link
                href="/en/compare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Compare Brokers
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
      <p className="text-xs font-bold text-slate-500">{label}</p>

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

function Step({ number, text }: { number: string; text: string }) {
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

function TableRow({
  title,
  floating,
  fixed,
}: {
  title: string;
  floating: string;
  fixed: string;
}) {
  return (
    <tr>
      <td className="px-4 py-4 text-left text-sm font-black text-slate-900">
        {title}
      </td>

      <td className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {floating}
      </td>

      <td className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {fixed}
      </td>
    </tr>
  );
}

function MobileSpreadExample({
  title,
  description,
  spread,
  warning = false,
}: {
  title: string;
  description: string;
  spread: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-3 ${
        warning
          ? "border-amber-200 bg-amber-50"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <div className="min-w-0">
        <h4 className="text-[14px] font-black text-slate-950">
          {title}
        </h4>

        <p className="mt-1 text-[11px] font-medium leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black ${
          warning
            ? "bg-amber-100 text-amber-800"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        {spread}
      </span>
    </div>
  );
}

function SpreadVisual({
  title,
  spread,
  description,
  bars,
  warning = false,
}: {
  title: string;
  spread: string;
  description: string;
  bars: number;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-[22px] border p-5 ${
        warning
          ? "border-amber-200 bg-amber-50"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-black text-slate-950">{title}</h3>

          <p className="mt-1 text-xs font-bold text-slate-500">
            {description}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black ${
            warning
              ? "bg-amber-100 text-amber-800"
              : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {spread}
        </span>
      </div>

      <div className="mt-6 flex h-24 items-end justify-center gap-2">
        <div className="w-12 rounded-t-xl bg-slate-900 py-2 text-center text-[10px] font-black text-white">
          BID
        </div>

        <div className="flex h-full items-center gap-1">
          {Array.from({ length: bars }).map((_, index) => (
            <span
              key={index}
              className={`block h-12 w-1.5 rounded-full ${
                warning ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
          ))}
        </div>

        <div className="w-12 rounded-t-xl bg-brand-500 py-2 text-center text-[10px] font-black text-white">
          ASK
        </div>
      </div>
    </div>
  );
}

function MobileGoodSpreadCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
        <div className="min-w-0">
          <h3 className="text-[15px] font-black leading-6 text-slate-950">
            {title}
          </h3>

          <p className="mt-0.5 text-[13px] font-black text-brand-500">
            {value}
          </p>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
          +
        </span>
      </summary>

      <div className="border-t border-slate-200 bg-white px-4 py-3.5">
        <p className="text-[13px] font-medium leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </details>
  );
}

function GoodSpreadCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
      <h3 className="font-black text-slate-950">{title}</h3>

      <p className="mt-2 text-lg font-black text-brand-500">{value}</p>

      <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}