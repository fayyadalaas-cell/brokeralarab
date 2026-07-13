import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/lot";

const ARABIC_PAGE_URL =
  "https://brokeralarab.com/learn-trading/lot";

const PAGE_TITLE =
  "What Is a Lot in Forex? Lot Size and Pip Value Explained";

const PAGE_DESCRIPTION =
  "Learn what a lot means in forex trading, how standard, mini and micro lots work, how lot size affects pip value, and how to choose a suitable position size.";

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
    "what is a lot in forex",
    "forex lot size",
    "lot size in trading",
    "standard lot",
    "mini lot",
    "micro lot",
    "forex pip value",
    "how to calculate lot size",
    "position size forex",
    "lot size calculator",
    "forex position sizing",
    "how much is one lot in forex",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What Is a Lot?" },
  { id: "how-it-works", label: "How Lot Size Works" },
  { id: "example", label: "Trading Example" },
  { id: "types", label: "Types of Lots" },
  { id: "pip-value", label: "Pip Value" },
  { id: "position-size", label: "Choosing Lot Size" },
  { id: "faq", label: "FAQs" },
];

const lotTypes = [
  {
    title: "Standard Lot",
    subtitle: "1.00 LOT",
    size: "100,000",
    description:
      "A standard lot normally represents 100,000 units of the base currency in a forex pair. It produces the highest pip value among the commonly used lot sizes.",
    points: [
      "The pip value is often about $10 on major USD-quoted pairs.",
      "Price movements have a larger effect on profit and loss.",
      "It generally requires more available margin and risk capacity.",
    ],
    badge: "Largest common size",
  },
  {
    title: "Mini Lot",
    subtitle: "0.10 LOT",
    size: "10,000",
    description:
      "A mini lot normally represents 10,000 units of the base currency. It is one-tenth of a standard lot and allows traders to manage exposure more precisely.",
    points: [
      "The pip value is often about $1 on major USD-quoted pairs.",
      "It is ten times smaller than a standard lot.",
      "It offers more flexibility for medium-sized trading accounts.",
    ],
    badge: "Medium position size",
  },
  {
    title: "Micro Lot",
    subtitle: "0.01 LOT",
    size: "1,000",
    description:
      "A micro lot normally represents 1,000 units of the base currency. It is widely used by beginners and traders testing strategies with smaller exposure.",
    points: [
      "The pip value is often about $0.10 on major USD-quoted pairs.",
      "It allows tighter control over the amount at risk.",
      "It can be more practical for smaller trading accounts.",
    ],
    badge: "Beginner-friendly size",
  },
];

const sizingFactors = [
  {
    icon: "💰",
    title: "Account Balance",
    description:
      "Your position size should be appropriate for your account equity, not simply the largest trade your broker allows you to open.",
  },
  {
    icon: "🛡️",
    title: "Risk per Trade",
    description:
      "Decide how much money you are prepared to risk before calculating the number of lots you should trade.",
  },
  {
    icon: "📏",
    title: "Stop-Loss Distance",
    description:
      "A wider stop loss normally requires a smaller lot size if you want to keep the same amount of money at risk.",
  },
  {
    icon: "📊",
    title: "Pip Value",
    description:
      "The monetary value of each pip depends on the lot size, trading instrument, exchange rate and account currency.",
  },
];

const faqItems = [
  {
    question: "What is a lot in forex trading?",
    answer:
      "A lot is a standard unit used to measure the size of a forex position. One standard lot normally represents 100,000 units of the base currency, while a mini lot represents 10,000 units and a micro lot represents 1,000 units.",
  },
  {
    question: "How much is one standard lot in forex?",
    answer:
      "One standard forex lot normally equals 100,000 units of the base currency. For example, a one-lot EUR/USD position represents 100,000 euros of market exposure.",
  },
  {
    question: "How much is one pip worth with a standard lot?",
    answer:
      "On many currency pairs where the US dollar is the quote currency, one pip is worth approximately $10 when trading one standard lot. The exact value can change depending on the currency pair, exchange rate and account currency.",
  },
  {
    question: "What is the difference between a standard, mini and micro lot?",
    answer:
      "The difference is the number of currency units represented by the trade. A standard lot is normally 100,000 units, a mini lot is 10,000 units and a micro lot is 1,000 units.",
  },
  {
    question: "Does a larger lot size mean more profit?",
    answer:
      "A larger lot size can increase profit when the market moves in your favour, but it increases losses by the same proportion when the market moves against you.",
  },
  {
    question: "How do I calculate the correct forex lot size?",
    answer:
      "Start with your account balance, the amount or percentage you are prepared to risk, your stop-loss distance and the pip value of the instrument. These inputs can then be used to calculate an appropriate position size.",
  },
  {
    question: "What lot size should a beginner use?",
    answer:
      "There is no single lot size suitable for every beginner. The position should be small enough to keep the potential loss within a predefined risk limit. Micro lots may provide more control for smaller accounts, but the correct size still depends on the stop loss and account balance.",
  },
];

const relatedGuides = [
  {
    title: "What Is Leverage?",
    description:
      "Learn how leverage changes market exposure, margin requirements and trading risk.",
    href: "/en/learn-trading/leverage",
  },
  {
    title: "What Is Margin?",
    description:
      "Understand used margin, free margin, margin level and margin calls.",
    href: "/en/learn-trading/margin",
  },
  {
    title: "What Is a Spread?",
    description:
      "Learn how bid and ask prices create the spread and affect trading costs.",
    href: "/en/learn-trading/spread",
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
      name: "Lot Size in Forex",
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
      name: "Forex lot size",
    },
    {
      "@type": "Thing",
      name: "Forex position sizing",
    },
    {
      "@type": "Thing",
      name: "Pip value",
    },
    {
      "@type": "Thing",
      name: "Forex risk management",
    },
    {
      "@type": "Thing",
      name: "Foreign exchange market",
    },
  ],

  keywords: [
    "forex lot",
    "forex lot size",
    "standard lot",
    "mini lot",
    "micro lot",
    "pip value",
    "position sizing",
    "forex risk management",
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

export default function LotPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="lot-en-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="lot-en-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="lot-en-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="lot-en-faq-schema"
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

          <span className="text-slate-800">Lot Size</span>
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
                Beginner Forex Guide
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                8-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.25] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.15]">
              What Is a Lot in Forex?

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.3] text-slate-700 sm:block lg:text-[34px]">
                Lot Size, Pip Value and Position Sizing Explained
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              A forex lot measures the size of your trade and determines how
              much each pip movement is worth. This guide explains standard,
              mini and micro lots, how lot size changes profit and loss, and
              how to select a position size based on your account and risk
              limit.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                Start the Guide
              </a>

              <Link
                href="/en/tools/lot-size-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                Lot Size Calculator
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Clear definitions
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Numerical examples
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Beginner-friendly
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Example currency pair
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  Trading Example
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
                    Position size
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1 Lot
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    100,000 EUR
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-brand-600 sm:min-h-0 sm:text-xs">
                    Approximate pip value
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $10
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    PER PIP
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-brand-500">
                    10-pip movement
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    ≈ $100
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  Lot size determines the value of price movements
                </p>

                <p className="mt-1 text-2xl font-black">
                  Size Every Trade Carefully
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
                eyebrow="Forex Lot Meaning"
                title="How Does Lot Size Determine Your Trade Exposure and Pip Value?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  A lot is a unit used to measure the size of a forex or CFD
                  position. When you select a lot size, you are choosing how
                  many units of the underlying asset your position represents
                  and how strongly the trade will react to price movements.
                </p>

                <p>
                  A larger lot size creates greater market exposure and
                  increases the monetary value of each pip. This means both
                  potential profits and potential losses change more quickly.
                  Lot size should therefore be based on your account balance,
                  risk limit and stop-loss distance rather than your desired
                  profit.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms, one standard forex lot normally represents
                  100,000 units of the base currency. Most trading platforms
                  also allow smaller positions such as 0.10 lots and 0.01 lots.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Size"
                  title="Position Size"
                  description="The number of currency units represented by your trade."
                />

                <MiniDefinition
                  label="Pip"
                  title="Pip Value"
                  description="The amount gained or lost when the price moves by one pip."
                />

                <MiniDefinition
                  label="Risk"
                  title="Trade Risk"
                  description="The potential loss based on lot size and stop-loss distance."
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
                eyebrow="How Lot Size Works"
                title="How Does Forex Lot Size Affect Profit and Loss?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Lot size determines the amount of market exposure and the
                monetary value of each pip. When you trade a larger position,
                every pip becomes more valuable. Potential profit increases,
                but the potential loss rises by exactly the same proportion.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Profit or Loss = Number of Pips × Pip Value
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Lot size"
                    value="1.00"
                    sublabel="STANDARD LOT"
                  />

                  <CalculationBox
                    label="Approximate pip value"
                    value="$10"
                    sublabel="PER PIP"
                  />

                  <CalculationBox
                    label="20-pip movement"
                    value="$200"
                    sublabel="THEORETICAL"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  How the calculation works
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="The position size in this example is one standard lot."
                  />

                  <Step
                    number="2"
                    text="The approximate pip value is $10 for each pip of movement."
                  />

                  <Step
                    number="3"
                    text="Multiply 20 pips by $10 to get a theoretical result of $200."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Pip value is not identical across every instrument
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Pip value can vary according to the currency pair, contract
                  size, exchange rate and account currency. Gold, indices,
                  cryptocurrencies and other CFDs may use different contract
                  specifications and price increments.
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
                eyebrow="Forex Lot Example"
                title="How Much Does a 30-Pip Move Make or Lose?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Suppose EUR/USD moves by 30 pips. The market movement is the
                same in each example, but the monetary result changes
                significantly depending on whether the position is one
                standard lot, one mini lot or one micro lot.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Price movement"
                  value="30 pips"
                />

                <StatCard
                  label="1.00 lot"
                  value="$300"
                />

                <StatCard
                  label="0.10 lot"
                  value="$30"
                />

                <StatCard
                  label="0.01 lot"
                  value="$3"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  The same price movement with three position sizes
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Standard Lot
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $300
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      30 × $10
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Mini Lot
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $30
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      30 × $1
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      Micro Lot
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      $3
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      30 × $0.10
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
                    A larger lot size magnifies both outcomes
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  These figures could represent a profit when the market moves
                  in your favour or a loss when it moves against your
                  position. Choose your lot size according to the amount you
                  can afford to lose, not the profit you hope to make.
                </p>
              </div>
            </section>
                        {/* Lot types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Forex Contract Sizes"
                title="What Are the Different Lot Sizes in Forex?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Forex brokers usually offer several position sizes so traders
                can adjust their exposure to match their account balance and
                risk plan. The most widely used sizes are standard lots, mini
                lots and micro lots.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {lotTypes.map((type, index) => (
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
                            {type.size}
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
                {lotTypes.map((type) => (
                  <div
                    key={type.title}
                    className="grid h-full min-w-0 grid-rows-[auto_86px_auto_1fr] rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
                        {type.badge}
                      </span>

                      <span className="rounded-xl bg-brand-500 px-3 py-2 text-sm font-black text-white shadow-sm">
                        {type.size}
                      </span>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-[22px] font-black leading-[1.3] text-slate-950">
                        {type.title}
                      </h3>

                      <p className="mt-1.5 text-[11px] font-black uppercase tracking-wide text-brand-500">
                        {type.subtitle}
                      </p>
                    </div>

                    <div className="min-h-[196px] pt-4">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {type.description}
                      </p>
                    </div>

                    <ul className="space-y-2.5 border-t border-slate-200 pt-4">
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

              {/* Desktop comparison */}
              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    Comparison
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    1.00 Lot
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    0.10 Lot
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    0.01 Lot
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <LotComparisonRow
                    title="Contract size"
                    standard="100,000"
                    mini="10,000"
                    micro="1,000"
                  />

                  <LotComparisonRow
                    title="Approximate pip value"
                    standard="$10"
                    mini="$1"
                    micro="$0.10"
                  />

                  <LotComparisonRow
                    title="Impact of a 20-pip move"
                    standard="$200"
                    mini="$20"
                    micro="$2"
                  />

                  <LotComparisonRow
                    title="Suitability for smaller accounts"
                    standard="Lower"
                    mini="Moderate"
                    micro="Higher"
                  />
                </div>
              </div>
            </section>

            {/* Pip value */}
            <section
              id="pip-value"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Value of Price Movement"
                title="How Does Lot Size Affect Pip Value?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Pip value is the amount by which your profit or loss changes
                when the market moves by one pip. As lot size increases, the
                monetary value of each pip also increases, causing the value of
                the open position to change more quickly.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Approximate Result = Number of Pips × Pip Value
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Number of pips"
                    value="50"
                    sublabel="PIPS"
                  />

                  <CalculationBox
                    label="Pip value"
                    value="$1"
                    sublabel="0.10 LOT"
                  />

                  <CalculationBox
                    label="Result"
                    value="$50"
                    sublabel="THEORETICAL"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <PipValueCard
                  lot="1.00"
                  title="Standard Lot"
                  pipValue="$10"
                  move="$500"
                  highlighted={false}
                />

                <PipValueCard
                  lot="0.10"
                  title="Mini Lot"
                  pipValue="$1"
                  move="$50"
                  highlighted
                />

                <PipValueCard
                  lot="0.01"
                  title="Micro Lot"
                  pipValue="$0.10"
                  move="$5"
                  highlighted={false}
                />
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Pip value figures are approximate
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  The examples above generally apply to major forex pairs where
                  the US dollar is the quote currency. Pip values may differ
                  for JPY pairs, cross-currency pairs, gold, indices and other
                  instruments because of exchange rates and contract
                  specifications.
                </p>
              </div>
            </section>

            {/* Position sizing */}
            <section
              id="position-size"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="Forex Risk Management"
                title="How Do You Choose the Right Lot Size?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Choosing a forex lot size should not begin with how much you
                want to earn. It should begin with the amount your account can
                afford to lose if the trade reaches its stop loss.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Position Size = Risk Amount ÷ Stop-Loss Distance and Pip Value
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Maximum risk"
                    value="$100"
                    sublabel="RISK AMOUNT"
                  />

                  <CalculationBox
                    label="Stop-loss distance"
                    value="50"
                    sublabel="PIPS"
                  />

                  <CalculationBox
                    label="Required pip value"
                    value="$2"
                    sublabel="PER PIP"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  Position-sizing steps
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="Choose the percentage of your account you are prepared to risk, such as 1% or less."
                  />

                  <Step
                    number="2"
                    text="Convert that percentage into a monetary amount, which is $100 in this example."
                  />

                  <Step
                    number="3"
                    text="Measure the distance between the entry price and stop loss, which is 50 pips."
                  />

                  <Step
                    number="4"
                    text="Divide $100 by 50 pips to get a suitable pip value of approximately $2."
                  />
                </div>
              </div>

              {/* Mobile factors */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {sizingFactors.map((factor) => (
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
                {sizingFactors.map((factor) => (
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

              <div className="mt-6 rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-lg">
                    ⚠️
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Do not choose lot size from available margin alone
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Leverage may allow you to open a much larger position, but
                  that does not mean your account can safely absorb the
                  potential loss. Your risk amount and stop-loss distance
                  should determine your position size.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  Practical position-sizing rules
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Define your maximum acceptable loss before entering.",
                    "Adjust lot size to match the stop-loss distance.",
                    "Do not increase position size to recover a previous loss.",
                    "Use a lot size calculator instead of guessing.",
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
                    href="/en/tools/lot-size-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Use the Lot Size Calculator
                  </Link>

                  <Link
                    href="/en/tools/risk-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Open the Risk Calculator
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
                eyebrow="Common Trader Questions"
                title="Forex Lot Size Frequently Asked Questions"
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
                  Trading Concepts Related to Lot Size
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding leverage, margin and spreads can help you
                  evaluate position requirements, trading costs and risk more
                  accurately.
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
                Calculate Your Lot Size
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                Estimate a position size based on your account balance,
                stop-loss distance and chosen risk percentage.
              </p>

              <Link
                href="/en/tools/lot-size-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                Open Lot Size Calculator
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
              Calculate Lot Size Before Opening a Trade
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Base your position size on your account balance, maximum risk and
              stop-loss distance rather than the maximum exposure permitted by
              leverage.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/en/tools/lot-size-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Lot Size Calculator
              </Link>

              <Link
                href="/en/brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Broker Reviews
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

function LotComparisonRow({
  title,
  standard,
  mini,
  micro,
}: {
  title: string;
  standard: string;
  mini: string;
  micro: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {standard}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {mini}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {micro}
      </div>
    </div>
  );
}

function PipValueCard({
  lot,
  title,
  pipValue,
  move,
  highlighted = false,
}: {
  lot: string;
  title: string;
  pipValue: string;
  move: string;
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
        {lot} Lot
      </span>

      <h3 className="mt-3 text-lg font-black text-slate-950">
        {title}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-bold text-slate-500">
            Pip value
          </p>

          <p className="mt-1 text-base font-black text-slate-950">
            {pipValue}
          </p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-bold text-slate-500">
            50-pip move
          </p>

          <p
            className={`mt-1 text-base font-black ${
              highlighted ? "text-brand-600" : "text-slate-950"
            }`}
          >
            {move}
          </p>
        </div>
      </div>
    </div>
  );
}