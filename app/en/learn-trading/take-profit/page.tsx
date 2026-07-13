import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/take-profit";

const ARABIC_PAGE_URL =
  "https://brokeralarab.com/learn-trading/take-profit";

const PAGE_TITLE =
  "What Is Take Profit? How to Set Profit Targets in Trading";

const PAGE_DESCRIPTION =
  "Learn what a take-profit order is, how it works, where to place profit targets, how to use risk-reward ratios, and when partial profit-taking may be useful.";

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
    "what is take profit",
    "take profit order",
    "take profit in trading",
    "take profit in forex",
    "how does take profit work",
    "how to set take profit",
    "where to place take profit",
    "profit target trading",
    "take profit strategy",
    "partial take profit",
    "risk reward ratio",
    "risk to reward ratio",
    "take profit vs stop loss",
    "how to calculate take profit",
    "forex profit target",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What Is Take Profit?" },
  { id: "how-it-works", label: "How It Works" },
  { id: "example", label: "Trading Example" },
  { id: "methods", label: "Setting Profit Targets" },
  { id: "risk-reward", label: "Risk-Reward Ratio" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "faq", label: "FAQs" },
];

const takeProfitMethods = [
  {
    title: "Support and Resistance",
    subtitle: "Support & Resistance",
    description:
      "The profit target is placed near a technical level where price may slow, react or reverse, such as resistance above a long trade or support below a short trade.",
    points: [
      "Uses visible price levels from the chart.",
      "Creates a market-based target instead of a random number.",
      "The target may be placed slightly before the level.",
    ],
    badge: "Most commonly used",
  },
  {
    title: "Risk-Reward Target",
    subtitle: "Risk-to-Reward",
    description:
      "The target is selected by comparing the expected reward with the stop-loss distance, such as targeting twice the amount placed at risk.",
    points: [
      "Helps evaluate the trade before entry.",
      "Often uses ratios such as 1:2 or 1:3.",
      "Still requires a realistic technical target.",
    ],
    badge: "Trade planning",
  },
  {
    title: "Partial Take Profit",
    subtitle: "Partial Take Profit",
    description:
      "Part of the position is closed at an initial target while the remaining portion stays open to capture a potentially larger move.",
    points: [
      "Secures part of the unrealised profit.",
      "Keeps some exposure if the trend continues.",
      "Requires a clear position-splitting plan.",
    ],
    badge: "Greater flexibility",
  },
];

const targetMethods = [
  {
    icon: "📈",
    title: "Resistance on Long Trades",
    description:
      "A long-position target may be placed before an established resistance area where selling pressure could slow or reverse the upward move.",
  },
  {
    icon: "📉",
    title: "Support on Short Trades",
    description:
      "For a short position, a previous support zone may provide a logical target because buying interest could appear and interrupt the decline.",
  },
  {
    icon: "📏",
    title: "Measured Price Moves",
    description:
      "Traders may use the size of a previous swing, chart range or technical pattern to estimate a possible target that remains consistent with market behaviour.",
  },
  {
    icon: "⚖️",
    title: "Risk-Reward Ratio",
    description:
      "The distance to the profit target is compared with the stop-loss distance to decide whether the potential reward justifies the planned risk.",
  },
];

const commonMistakes = [
  {
    title: "Setting an Unrealistic Target",
    description:
      "The selected target may be too far away relative to market volatility, nearby support or resistance, and the active timeframe.",
  },
  {
    title: "Closing the Trade Too Early",
    description:
      "Fear of losing a small open profit can cause traders to exit before a carefully planned target has a chance to be reached.",
  },
  {
    title: "Moving the Target Without a Rule",
    description:
      "Repeatedly pushing the target further away because of greed can turn a well-managed winning trade into a missed exit.",
  },
  {
    title: "Ignoring Risk-Reward",
    description:
      "A strategy may win frequently, but very small targets combined with much larger losses can weaken long-term performance.",
  },
];

const faqItems = [
  {
    question: "What is take profit in trading?",
    answer:
      "Take profit is an order that closes a trade automatically when the market reaches a predefined profitable price. It allows the trader to plan an exit before entering and lock in the result without monitoring the position continuously.",
  },
  {
    question: "How does a take-profit order work?",
    answer:
      "After a take-profit price is attached to a position, the platform monitors the market. When the selected price is reached, the position or specified portion of it is submitted for closure.",
  },
  {
    question: "Where should I place a take-profit target?",
    answer:
      "A profit target should normally be placed near a logical market level, such as resistance above a long trade or support below a short trade, while also considering volatility and the risk-reward ratio.",
  },
  {
    question: "What is a good risk-reward ratio?",
    answer:
      "There is no single ratio that suits every strategy. Ratios such as 1:2 and 1:3 are commonly reviewed, but the appropriate ratio depends on the strategy's win rate, market conditions and trading costs.",
  },
  {
    question: "Does take profit guarantee the exact execution price?",
    answer:
      "In normal market conditions, execution may occur at or close to the selected level. During price gaps, rapid movements or limited liquidity, the final execution price may differ depending on the broker's order handling.",
  },
  {
    question: "What is the difference between take profit and stop loss?",
    answer:
      "A take-profit order closes a trade after price reaches a planned profit target. A stop-loss order closes the position after price moves against the trader to a predefined risk level.",
  },
  {
    question: "Can I use more than one take-profit target?",
    answer:
      "Yes. A position can be divided into portions and closed at different targets. This approach is known as partial profit-taking and may help secure some profit while retaining exposure to a larger move.",
  },
];

const relatedGuides = [
  {
    title: "What Is a Stop Loss?",
    description:
      "Learn how stop-loss orders work and how to choose an invalidation level for a trade.",
    href: "/en/learn-trading/stop-loss",
  },
  {
    title: "What Is a Lot?",
    description:
      "Understand forex lot size, pip value and how position size affects profit and risk.",
    href: "/en/learn-trading/lot",
  },
  {
    title: "What Is Leverage?",
    description:
      "Learn how leverage affects market exposure, margin requirements and account risk.",
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
      name: "Take Profit",
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
      name: "Take-profit order",
    },
    {
      "@type": "Thing",
      name: "Profit target",
    },
    {
      "@type": "Thing",
      name: "Risk-reward ratio",
    },
    {
      "@type": "Thing",
      name: "Trade management",
    },
    {
      "@type": "Thing",
      name: "Forex trading",
    },
  ],

  keywords: [
    "take profit",
    "take-profit order",
    "profit target",
    "risk-reward ratio",
    "partial take profit",
    "trade management",
    "forex trading",
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

export default function TakeProfitPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="take-profit-en-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="take-profit-en-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="take-profit-en-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="take-profit-en-faq-schema"
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
            Take Profit
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="absolute bottom-[-140px] right-[-80px] h-[320px] w-[320px] rounded-full bg-sky-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                Trade Management Guide
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                9-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.25] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.15]">
              What Is Take Profit?

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.3] text-slate-700 sm:block lg:text-[34px]">
                How to Set Profit Targets and Plan Your Exit
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              A take-profit order closes a trade automatically when price
              reaches a predefined target. This guide explains how take-profit
              orders work, where traders place profit targets, how targets
              connect with stop losses and risk-reward ratios, and when partial
              profit-taking may be considered.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                Start the Guide
              </a>

              <Link
                href="/en/tools/profit-loss-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                Profit & Loss Calculator
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Clear explanations
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Numerical examples
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Practical exit planning
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

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  Profit Target
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

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-emerald-700 sm:min-h-0 sm:text-xs">
                    Take-profit price
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.1100
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    TAKE PROFIT
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-emerald-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-emerald-600">
                    Target distance
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    100 pips
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  With a pip value of $2
                </p>

                <p className="mt-1 text-2xl font-black">
                  Estimated profit ≈ $200
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
                eyebrow="Take-Profit Meaning"
                title="How Does a Take-Profit Order Define Your Planned Exit?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  A take-profit order is placed at a predefined price to close
                  a position automatically after the market moves in the
                  expected direction. It converts an unrealised gain into a
                  realised result when the target is reached.
                </p>

                <p>
                  On a long trade, the profit target is normally above the
                  entry price. On a short trade, it is normally below the
                  entry. A useful target should reflect price structure,
                  volatility and a level the market can reasonably reach rather
                  than the amount of money the trader simply wants to make.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms, a take-profit order defines the price at
                  which you plan to exit a winning trade instead of leaving the
                  decision to fear, greed or constant market monitoring.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Target"
                  title="Target Price"
                  description="The price that triggers the instruction to close the trade."
                />

                <MiniDefinition
                  label="Distance"
                  title="Target Distance"
                  description="The number of pips between the entry price and profit target."
                />

                <MiniDefinition
                  label="Reward"
                  title="Potential Profit"
                  description="The estimated result based on target distance and pip value."
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
                title="How Does a Take-Profit Order Work When Price Reaches the Target?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Once a take-profit level is attached to an open position, the
                platform monitors the relevant market price. When the target is
                reached, an instruction is triggered to close the position. In
                normal conditions, execution may occur at or near the selected
                level depending on liquidity and the broker's execution model.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Estimated Profit = Target Distance × Pip Value
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Target distance"
                    value="100"
                    sublabel="PIPS"
                  />

                  <CalculationBox
                    label="Pip value"
                    value="$2"
                    sublabel="PER PIP"
                  />

                  <CalculationBox
                    label="Estimated profit"
                    value="$200"
                    sublabel="ESTIMATED PROFIT"
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
                    text="A long trade is opened with a take-profit target 100 pips above the entry."
                  />

                  <Step
                    number="2"
                    text="Based on the selected lot size, each pip is worth approximately $2."
                  />

                  <Step
                    number="3"
                    text="Multiplying 100 pips by $2 produces an estimated profit of $200."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Reaching the target is never guaranteed
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Price may approach the take-profit level and reverse before
                  touching it. A target should therefore be based on market
                  structure, volatility and realistic price behaviour rather
                  than an arbitrary desired return.
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
                eyebrow="Take-Profit Example"
                title="How Do Take Profit, Stop Loss and Risk-Reward Work Together?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Suppose a trade has a stop loss 50 pips from the entry and a
                take-profit target 100 pips away. The planned reward is twice
                the potential loss, producing a 1:2 risk-reward ratio.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Stop-loss distance"
                  value="50 pips"
                />

                <StatCard
                  label="Take-profit distance"
                  value="100 pips"
                />

                <StatCard
                  label="Potential loss"
                  value="$100"
                />

                <StatCard
                  label="Potential profit"
                  value="$200"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Calculating the risk-reward ratio
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Risk distance
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      50 pips
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      STOP DISTANCE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Reward distance
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      100 pips
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      TARGET DISTANCE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      Risk-reward ratio
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      1:2
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      RISK / REWARD
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
                    An attractive ratio does not make the target realistic
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  Do not place a distant target simply to create a 1:3 or 1:4
                  ratio. The take-profit level should still be reachable based
                  on volatility, support, resistance and the active market
                  structure.
                </p>
              </div>
            </section>
                        {/* Take-profit methods */}
            <section
              id="methods"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Profit-Target Methods"
                title="What Are the Best Ways to Set a Take-Profit Target?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                A take-profit target can be selected in several ways, but the
                strongest approach combines a realistic market level with an
                acceptable reward relative to the planned risk. Traders may
                also use multiple targets to secure part of a position while
                leaving the remainder open.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {takeProfitMethods.map((method, index) => (
                  <details
                    key={method.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            {method.title}
                          </h3>

                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                            {method.badge}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {method.subtitle}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {method.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {method.points.map((point) => (
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
                {takeProfitMethods.map((method) => (
                  <div
                    key={method.title}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    {/* Top badges */}
                    <div className="grid grid-cols-2 gap-2">
                      <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
                        {method.badge}
                      </span>

                      <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
                        {method.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="min-h-[82px] pt-4">
                      <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:text-[19px]">
                        {method.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="pb-5 pt-2">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {method.description}
                      </p>
                    </div>

                    {/* Points */}
                    <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4">
                      {method.points.map((point) => (
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
                    Support & Resistance
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Risk-Reward
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Partial Profit-Taking
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <TakeProfitComparisonRow
                    title="Target basis"
                    support="Technical level"
                    reward="Calculated ratio"
                    partial="Multiple targets"
                  />

                  <TakeProfitComparisonRow
                    title="Profit secured"
                    support="At the full target"
                    reward="When the ratio is reached"
                    partial="Gradually"
                  />

                  <TakeProfitComparisonRow
                    title="Flexibility"
                    support="Moderate"
                    reward="Moderate"
                    partial="High"
                  />

                  <TakeProfitComparisonRow
                    title="Beginner-friendly"
                    support="Yes"
                    reward="Yes"
                    partial="Needs a clearer plan"
                  />
                </div>
              </div>
            </section>

            {/* Risk reward */}
            <section
              id="risk-reward"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Trade Evaluation"
                title="How Do You Calculate the Risk-Reward Ratio?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                The risk-reward ratio compares the potential loss on a trade
                with the expected profit. It helps traders decide whether the
                possible reward is sufficient to justify the amount placed at
                risk before entering the market.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Risk-Reward Ratio = Stop-Loss Distance : Target Distance
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Stop-loss distance"
                    value="40 pips"
                    sublabel="RISK"
                  />

                  <CalculationBox
                    label="Take-profit distance"
                    value="80 pips"
                    sublabel="REWARD"
                  />

                  <CalculationBox
                    label="Risk-reward ratio"
                    value="1:2"
                    sublabel="RISK / REWARD"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  What does a 1:2 risk-reward ratio mean?
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  A 1:2 ratio means that one unit of risk is accepted in an
                  attempt to earn two units of reward. For example, if the
                  planned loss is $100, the profit target would be $200.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <RewardRatioCard
                  ratio="1:1"
                  risk="$100"
                  reward="$100"
                  title="Equal risk and reward"
                />

                <RewardRatioCard
                  ratio="1:2"
                  risk="$100"
                  reward="$200"
                  title="Twice the planned risk"
                  highlighted
                />

                <RewardRatioCard
                  ratio="1:3"
                  risk="$100"
                  reward="$300"
                  title="Three times the risk"
                />
              </div>

              {/* Mobile target methods */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {targetMethods.map((method) => (
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

              {/* Desktop target methods */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {targetMethods.map((method) => (
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

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    There is no perfect ratio for every strategy
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  A 1:1 ratio may work with a strategy that wins frequently,
                  while another approach may require 1:2 or more. The ratio
                  should be assessed together with win rate, trading costs and
                  the current market environment.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  Steps for choosing a realistic profit target
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Define the stop-loss level and planned risk first.",
                    "Identify the nearest meaningful support or resistance.",
                    "Compare the target distance with the stop-loss distance.",
                    "Check that the target matches volatility and timeframe.",
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
                    href="/en/tools/profit-loss-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Calculate Profit and Loss
                  </Link>

                  <Link
                    href="/en/tools/risk-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Use the Risk Calculator
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
                eyebrow="Profit Management"
                title="What Are the Most Common Take-Profit Mistakes?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Choosing a profit target is just as important as selecting a
                stop loss. Unrealistic targets, emotional exits and
                inconsistent adjustments can weaken a trading plan even when
                the original market direction was correct.
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
                    Do not move the target further away because of greed
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  If price approaches a target selected from your plan,
                  extending it without a technical reason may allow the market
                  to reverse and erase the open profit. Any adjustment should
                  follow a predefined rule rather than the desire to earn more.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Should you always wait for the full target?
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Not necessarily. Partial profit-taking or stop-loss
                  adjustments may be part of a structured trade-management
                  plan. These decisions should be defined before or during the
                  trade according to clear rules rather than made randomly.
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
                title="Take-Profit Order Frequently Asked Questions"
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
                  Trading Concepts Related to Take Profit
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding stop loss, lot size and leverage can help you
                  build a more balanced entry, exit and risk-management plan.
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
<aside className="hidden min-w-0 self-start lg:sticky lg:top-24 lg:block lg:w-[300px]">
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
                Estimate Trade Profit
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                Enter the entry price, exit price and position size to estimate
                the theoretical profit or loss before opening a trade.
              </p>

              <Link
                href="/en/tools/profit-loss-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                Open Profit & Loss Calculator
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
              Set Your Profit Target Before Entering the Trade
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Select a realistic target using market structure, support,
              resistance and volatility, then compare it with the stop loss to
              decide whether the expected reward justifies the planned risk.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/en/tools/profit-loss-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Profit & Loss Calculator
              </Link>

              <Link
                href="/en/learn-trading/stop-loss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Stop-Loss Guide
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

function TakeProfitComparisonRow({
  title,
  support,
  reward,
  partial,
}: {
  title: string;
  support: string;
  reward: string;
  partial: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {support}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {reward}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {partial}
      </div>
    </div>
  );
}

function RewardRatioCard({
  ratio,
  risk,
  reward,
  title,
  highlighted = false,
}: {
  ratio: string;
  risk: string;
  reward: string;
  title: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-[20px] border p-4 text-center ${
        highlighted
          ? "border-brand-200 bg-brand-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <span
        className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black ${
          highlighted
            ? "bg-white text-brand-600"
            : "bg-white text-slate-600"
        }`}
      >
        Ratio {ratio}
      </span>

      <h3 className="mt-3 text-base font-black text-slate-950">
        {title}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-bold text-slate-500">
            Risk
          </p>

          <p className="mt-1 text-base font-black text-slate-950">
            {risk}
          </p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-bold text-slate-500">
            Reward
          </p>

          <p
            className={`mt-1 text-base font-black ${
              highlighted ? "text-brand-600" : "text-slate-950"
            }`}
          >
            {reward}
          </p>
        </div>
      </div>
    </div>
  );
}