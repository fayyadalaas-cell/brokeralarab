import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/stop-loss";

const ARABIC_PAGE_URL =
  "https://brokeralarab.com/learn-trading/stop-loss";

const PAGE_TITLE =
  "What Is a Stop Loss? How Stop-Loss Orders Work in Trading";

const PAGE_DESCRIPTION =
  "Learn what a stop loss is, how stop-loss orders work, where to place them, how to calculate risk, and the difference between fixed, trailing and guaranteed stops.";

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
    "what is a stop loss",
    "stop loss order",
    "stop loss in trading",
    "stop loss in forex",
    "how to set a stop loss",
    "where to place a stop loss",
    "how does a stop loss work",
    "trailing stop loss",
    "guaranteed stop loss",
    "stop loss example",
    "stop loss calculation",
    "risk management in trading",
    "stop loss vs take profit",
    "forex risk management",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What Is a Stop Loss?" },
  { id: "how-it-works", label: "How It Works" },
  { id: "example", label: "Trading Example" },
  { id: "types", label: "Types of Stop Loss" },
  { id: "placement", label: "Where to Place It" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "faq", label: "FAQs" },
];

const stopLossTypes = [
  {
    title: "Fixed Stop Loss",
    subtitle: "Fixed Stop Loss",
    description:
      "A fixed stop is placed at a specific price level and remains there unless the trader manually changes it or closes the position.",
    points: [
      "Simple to understand and widely used.",
      "Defines the planned loss before entering the trade.",
      "Does not move automatically when price changes.",
    ],
    badge: "Most commonly used",
  },
  {
    title: "Trailing Stop Loss",
    subtitle: "Trailing Stop",
    description:
      "A trailing stop follows price when a trade moves into profit while maintaining a predefined distance from the current market price.",
    points: [
      "Can help protect part of an open profit.",
      "Moves automatically as price advances.",
      "May close a trade during short-term volatility.",
    ],
    badge: "Profit protection",
  },
  {
    title: "Guaranteed Stop Loss",
    subtitle: "Guaranteed Stop",
    description:
      "A guaranteed stop is designed to close a position at the requested level even during a market gap, subject to the broker's terms and availability.",
    points: [
      "Reduces the impact of price gaps and slippage.",
      "May not be available on every instrument.",
      "Can involve an additional premium or fee.",
    ],
    badge: "Additional protection",
  },
];

const placementMethods = [
  {
    icon: "📉",
    title: "Beyond Support or Resistance",
    description:
      "For a long position, a stop may be placed below a meaningful support level. For a short position, it may be placed above resistance, with enough room for normal price movement.",
  },
  {
    icon: "📊",
    title: "Based on Market Volatility",
    description:
      "Volatility measures such as the Average True Range can help estimate normal price movement and reduce the chance of setting the stop too close.",
  },
  {
    icon: "🕯️",
    title: "Beyond a Swing High or Low",
    description:
      "Some traders place stops beyond a recent swing low or swing high because a break of that level may invalidate the original trade setup.",
  },
  {
    icon: "🛡️",
    title: "Using a Defined Risk Amount",
    description:
      "After identifying a technically valid stop level, the lot size can be adjusted so the potential loss remains within the trader's maximum risk limit.",
  },
];

const commonMistakes = [
  {
    title: "Setting the Stop Too Close",
    description:
      "Normal market noise may close the position before the expected price move develops.",
  },
  {
    title: "Moving the Stop Further Away",
    description:
      "Widening the stop after the trade moves against you increases the loss and breaks the original risk plan.",
  },
  {
    title: "Using the Same Distance Every Time",
    description:
      "Volatility varies across instruments, sessions and market conditions, so one fixed distance will not suit every trade.",
  },
  {
    title: "Choosing Lot Size Before the Stop",
    description:
      "The stop level should be identified first, followed by a lot-size calculation based on the chosen risk amount.",
  },
];

const faqItems = [
  {
    question: "What is a stop loss in trading?",
    answer:
      "A stop loss is an order that instructs the trading platform to close a position when the market reaches a specified price. Its purpose is to limit the potential loss when price moves against the trade.",
  },
  {
    question: "How does a stop-loss order work?",
    answer:
      "When the market reaches the stop price, the instruction is triggered and the position is submitted for closure. The final execution price may be the requested level or the next available price, depending on market conditions and the broker's execution model.",
  },
  {
    question: "Where should I place a stop loss?",
    answer:
      "A stop should normally be placed at a level where the original trade idea becomes invalid, such as below meaningful support for a long position or above resistance for a short position.",
  },
  {
    question: "How wide should my stop loss be?",
    answer:
      "There is no universal stop-loss distance. It should reflect the market structure, instrument volatility, timeframe and trade setup. The lot size should then be adjusted to keep the monetary risk within your limit.",
  },
  {
    question: "Does a stop loss guarantee the execution price?",
    answer:
      "Not always. During normal conditions, execution may occur close to the selected price. During fast markets or price gaps, the position may close at a different available price because of slippage.",
  },
  {
    question: "What is the difference between a fixed stop and a trailing stop?",
    answer:
      "A fixed stop remains at a selected price unless it is manually changed. A trailing stop follows price when the position moves into profit and stops moving when the market reverses.",
  },
  {
    question: "Can I trade without a stop loss?",
    answer:
      "A platform may allow a position to be opened without a stop, but doing so leaves the potential loss undefined and can expose the account to substantial risk during sharp moves, news events or market gaps.",
  },
];

const relatedGuides = [
  {
    title: "What Is Take Profit?",
    description:
      "Learn how take-profit orders work and how traders choose a planned exit target.",
    href: "/en/learn-trading/take-profit",
  },
  {
    title: "What Is a Lot?",
    description:
      "Understand forex lot size, pip value and how position size affects risk.",
    href: "/en/learn-trading/lot",
  },
  {
    title: "What Is Leverage?",
    description:
      "Learn how leverage changes market exposure, margin requirements and account risk.",
    href: "/en/learn-trading/leverage",
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
      name: "Stop Loss",
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
      name: "Stop-loss order",
    },
    {
      "@type": "Thing",
      name: "Trading risk management",
    },
    {
      "@type": "Thing",
      name: "Trailing stop",
    },
    {
      "@type": "Thing",
      name: "Guaranteed stop loss",
    },
    {
      "@type": "Thing",
      name: "Forex trading",
    },
  ],

  keywords: [
    "stop loss",
    "stop-loss order",
    "trailing stop",
    "guaranteed stop loss",
    "forex risk management",
    "stop-loss placement",
    "trading risk",
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

export default function StopLossPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="stop-loss-en-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="stop-loss-en-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="stop-loss-en-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="stop-loss-en-faq-schema"
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
            Stop Loss
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-100/60 blur-3xl" />

        <div className="absolute bottom-[-140px] right-[-80px] h-[320px] w-[320px] rounded-full bg-sky-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                Trading Risk Management
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                9-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.25] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.15]">
              What Is a Stop Loss?

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.3] text-slate-700 sm:block lg:text-[34px]">
                How Stop-Loss Orders Work and Where to Place Them
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              A stop loss is an order designed to close a trade when the market
              reaches a predefined price. This guide explains how stop-loss
              orders work, how to choose a logical stop level, how stop
              distance affects position size, and why execution may differ
              during fast market conditions.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                Start the Guide
              </a>

              <Link
                href="/en/tools/risk-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                Risk Calculator
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Clear explanations
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Risk examples
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Practical placement rules
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Long trade example
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700">
                  Risk Protection
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
                    Entry price
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.1000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    BUY ENTRY
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-rose-600 sm:min-h-0 sm:text-xs">
                    Stop-loss price
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.0950
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    STOP LOSS
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-rose-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-rose-500">
                    Stop distance
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    50 pips
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  With a pip value of $2
                </p>

                <p className="mt-1 text-2xl font-black">
                  Estimated risk ≈ $100
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
                eyebrow="Stop-Loss Meaning"
                title="How Does a Stop Loss Limit the Risk on a Trade?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  A stop loss is an order placed at a predefined price to close
                  a position when the market moves against the trader. Its main
                  purpose is to define an exit point before an uncontrolled
                  loss becomes significantly larger.
                </p>

                <p>
                  On a long trade, the stop is normally placed below the entry
                  price. On a short trade, it is normally placed above the
                  entry. The correct level should be based on market structure,
                  volatility and the point at which the original trade idea is
                  no longer valid.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms, a stop loss defines the price at which you
                  accept that the trade setup has failed and exit before the
                  potential loss grows beyond your risk plan.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Level"
                  title="Stop Price"
                  description="The price that triggers the instruction to close the position."
                />

                <MiniDefinition
                  label="Distance"
                  title="Stop Distance"
                  description="The number of pips between the entry and stop-loss price."
                />

                <MiniDefinition
                  label="Risk"
                  title="Money at Risk"
                  description="The estimated loss based on stop distance and pip value."
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
                eyebrow="Order Execution"
                title="How Does a Stop-Loss Order Work When Price Reaches It?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Once the stop-loss level has been added to an open position,
                the trading platform monitors the market price. When the stop
                level is reached, an instruction is triggered to close the
                trade. In normal conditions, execution may occur close to the
                selected price, but the final price can differ during rapid
                movements or market gaps.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Estimated Loss = Stop Distance × Pip Value
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Stop distance"
                    value="50"
                    sublabel="PIPS"
                  />

                  <CalculationBox
                    label="Pip value"
                    value="$2"
                    sublabel="PER PIP"
                  />

                  <CalculationBox
                    label="Estimated loss"
                    value="$100"
                    sublabel="ESTIMATED RISK"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  How the example works
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="A long position is opened with a stop placed 50 pips below the entry."
                  />

                  <Step
                    number="2"
                    text="Based on the selected lot size, each pip is worth approximately $2."
                  />

                  <Step
                    number="3"
                    text="Multiplying 50 pips by $2 produces an estimated risk of $100."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    A stop loss does not always guarantee the exact price
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  During major news releases, thin liquidity or a market gap,
                  the order may be filled at the next available price rather
                  than the precise stop level. This difference is called
                  slippage and should be considered when planning risk.
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
                eyebrow="Stop-Loss Example"
                title="How Do Stop Distance, Lot Size and Account Risk Work Together?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Suppose a trading account contains $10,000 and the trader
                decides to risk no more than 1% on a single trade. The maximum
                planned loss is therefore $100.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Account balance"
                  value="$10,000"
                />

                <StatCard
                  label="Risk per trade"
                  value="1%"
                />

                <StatCard
                  label="Stop distance"
                  value="50 pips"
                />

                <StatCard
                  label="Maximum loss"
                  value="$100"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  From account risk to position size
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Risk amount
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $100
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      1% OF ACCOUNT
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Stop distance
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      50 pips
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      STOP DISTANCE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      Required pip value
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      $2
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      $100 ÷ 50
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
                    The stop level should determine the lot size
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  Identify the technically valid stop level first, then
                  calculate the lot size that keeps the potential loss within
                  your limit. Do not place an unrealistically tight stop simply
                  to justify opening a larger position.
                </p>
              </div>
            </section>
                        {/* Stop-loss types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Stop-Loss Order Types"
                title="What Are the Main Types of Stop-Loss Orders?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Stop-loss orders do not all work in the same way. Traders can
                use a fixed stop at a specific price, a trailing stop that
                follows a profitable move, or a guaranteed stop offered by
                certain brokers under specific conditions.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {stopLossTypes.map((type, index) => (
                  <details
                    key={type.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            {type.title}
                          </h3>

                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                            {type.badge}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {type.subtitle}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {type.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {type.points.map((point) => (
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
  {stopLossTypes.map((type) => (
    <div
      key={type.title}
      className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
    >
      {/* Top badges */}
      <div className="grid grid-cols-2 gap-2">
        <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
          {type.badge}
        </span>

        <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
          {type.subtitle}
        </span>
      </div>

      {/* Title */}
      <div className="min-h-[66px] pt-4">
        <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:whitespace-nowrap lg:text-[19px]">
          {type.title}
        </h3>
      </div>

      {/* Description */}
      <div className="min-h-[154px] pt-2">
        <p className="text-sm font-medium leading-7 text-slate-600">
          {type.description}
        </p>
      </div>

      {/* Points */}
      <ul className="mt-auto space-y-2.5 border-t border-slate-200 pt-4">
        {type.points.map((point) => (
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

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    Comparison
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Fixed Stop
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Trailing Stop
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Guaranteed Stop
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <StopLossComparisonRow
                    title="How it moves"
                    fixed="Remains at one price"
                    trailing="Follows favourable price moves"
                    guaranteed="Remains at one price"
                  />

                  <StopLossComparisonRow
                    title="Profit protection"
                    fixed="Requires manual adjustment"
                    trailing="Adjusts automatically"
                    guaranteed="Not its main purpose"
                  />

                  <StopLossComparisonRow
                    title="Slippage risk"
                    fixed="Possible"
                    trailing="Possible"
                    guaranteed="Limited under broker terms"
                  />

                  <StopLossComparisonRow
                    title="Additional cost"
                    fixed="Usually none"
                    trailing="Usually none"
                    guaranteed="A fee may apply"
                  />
                </div>
              </div>
            </section>

            {/* Placement */}
            <section
              id="placement"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Stop-Loss Placement"
                title="Where Should You Place a Stop Loss?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                The best stop-loss level is not simply the closest possible
                price to your entry. It should be placed where the original
                trade idea becomes invalid. Once that technical level is
                identified, the position size can be adjusted so the potential
                loss remains within the chosen risk limit.
              </p>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  The key question before placing a stop
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Do not begin by asking how many pips away the stop should be.
                  Start by asking which price level would prove the trade setup
                  wrong. Measure the distance to that level, then calculate the
                  appropriate lot size.
                </p>
              </div>

              {/* Mobile placement methods */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {placementMethods.map((method) => (
                  <details
                    key={method.title}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                          {method.icon}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {method.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-brand-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {method.description}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Desktop placement methods */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {placementMethods.map((method) => (
                  <div
                    key={method.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        {method.icon}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-950">
                          {method.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  The Correct Stop-Loss Decision Process
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Identify invalidation"
                    value="Support or swing low"
                    sublabel="TECHNICAL LEVEL"
                  />

                  <CalculationBox
                    label="Measure stop distance"
                    value="For example, 40 pips"
                    sublabel="STOP DISTANCE"
                  />

                  <CalculationBox
                    label="Adjust lot size"
                    value="Based on risk"
                    sublabel="POSITION SIZE"
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
                    Allow room for normal market volatility
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Placing a stop exactly on a support or resistance level can
                  make it vulnerable to a brief test of that price. Some
                  traders add a volatility-based buffer that reflects the
                  instrument and timeframe.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  Practical rules for setting a stop loss
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Place the stop where the original trade setup becomes invalid.",
                    "Check market volatility before finalising the distance.",
                    "Calculate the possible monetary loss before entering.",
                    "Reduce lot size when a wider stop is technically required.",
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
                    href="/en/tools/risk-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Use the Risk Calculator
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
                eyebrow="Trade Management"
                title="What Are the Most Common Stop-Loss Mistakes?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Simply adding a stop-loss order does not automatically create
                good risk management. Poor placement, inconsistent sizing or
                emotional changes during the trade can make the protection far
                less effective.
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
                    Do not widen the stop simply to avoid taking a loss
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  If price reaches the level that invalidates the original
                  setup, moving the stop further away increases the loss
                  without improving the trade. Any adjustment should follow a
                  predefined rule rather than an emotional reaction.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Trade management versus changing the plan
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Moving a stop to reduce risk or protect profit according to
                  predefined conditions is trade management. Moving it further
                  away to allow a larger loss after price moves against you is
                  a change to the original risk plan.
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
                title="Stop-Loss Order Frequently Asked Questions"
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
                  Trading Concepts Related to Stop Loss
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding take profit, lot size and leverage can help you
                  build a more structured exit plan and control the risk on
                  each trade.
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
                Free Trading Tool
              </span>

              <h2 className="mt-3 text-xl font-black">
                Calculate Trade Risk
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                Enter your account balance, risk percentage and stop distance
                to estimate the amount at risk and an appropriate position
                size.
              </p>

              <Link
                href="/en/tools/risk-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                Open Risk Calculator
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
              Define Your Stop Loss Before Entering the Trade
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Choose the stop level from market structure and volatility, then
              calculate the lot size that keeps the potential loss within your
              risk-management plan.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/en/tools/risk-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Risk Calculator
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

function StopLossComparisonRow({
  title,
  fixed,
  trailing,
  guaranteed,
}: {
  title: string;
  fixed: string;
  trailing: string;
  guaranteed: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {fixed}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {trailing}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {guaranteed}
      </div>
    </div>
  );
}