import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL = "https://brokeralarab.com/en/learn-trading/margin";
const ARABIC_PAGE_URL =
  "https://brokeralarab.com/learn-trading/margin";

const PAGE_TITLE =
  "What Is Margin in Forex Trading? Beginner’s Guide";

const PAGE_DESCRIPTION =
  "Learn how forex margin works, how to calculate required margin, and the difference between used margin, free margin, margin level, and margin calls.";

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
    "what is margin in forex",
    "forex margin",
    "margin in trading",
    "how to calculate forex margin",
    "required margin",
    "used margin",
    "free margin",
    "margin level",
    "margin call",
    "stop out level",
    "forex leverage and margin",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What is margin?" },
  { id: "calculation", label: "How margin is calculated" },
  { id: "example", label: "Practical example" },
  { id: "types", label: "Types of margin" },
  { id: "margin-level", label: "Margin level" },
  { id: "margin-call", label: "Margin call" },
  { id: "faq", label: "FAQs" },
];

const marginTypes = [
  {
    title: "Used Margin",
    subtitle: "Margin Allocated to Open Trades",
    description:
      "Used margin is the amount your broker sets aside to maintain currently open positions. It is not a trading fee, but it remains unavailable while those positions stay open.",
    points: [
      "Depends on position size and account leverage.",
      "Increases when additional trades are opened.",
      "Is released when the related position is closed.",
    ],
    badge: "Reserved for trades",
  },
  {
    title: "Free Margin",
    subtitle: "Available Trading Funds",
    description:
      "Free margin is the equity remaining after used margin has been deducted. It can support new positions or absorb unrealised losses on existing trades.",
    points: [
      "Falls when unrealised losses increase.",
      "Rises when trades gain value or positions are closed.",
      "A severe decline may lead to a margin call.",
    ],
    badge: "Available to use",
  },
  {
    title: "Margin Level",
    subtitle: "Account Risk Indicator",
    description:
      "Margin level is a percentage that compares account equity with used margin. Brokers use it to assess whether an account can continue supporting its open positions.",
    points: [
      "A higher percentage generally indicates more capacity.",
      "The percentage falls as unrealised losses increase.",
      "Broker margin-call and stop-out thresholds may depend on it.",
    ],
    badge: "Account health metric",
  },
];

const marginRisks = [
  {
    icon: "📉",
    title: "Unrealised Losses",
    description:
      "When open positions move against you, account equity and free margin decline, potentially bringing the account closer to a margin call.",
  },
  {
    icon: "⚡",
    title: "High Leverage",
    description:
      "Higher leverage reduces the margin required for a position, but it also makes it easier to control a larger exposure and take more risk.",
  },
  {
    icon: "📦",
    title: "Oversized Positions",
    description:
      "A position that is too large for the account can consume a substantial share of available funds and leave little room for market movement.",
  },
  {
    icon: "🧩",
    title: "Too Many Open Trades",
    description:
      "Every additional position may require more margin. A large number of open trades can therefore reduce free margin quickly.",
  },
];

const faqItems = [
  {
    question: "Is forex margin a fee paid to the broker?",
    answer:
      "No. Margin is not a commission or trading charge. It is an amount temporarily set aside by the broker to support an open position. The margin is released when that position is closed.",
  },
  {
    question: "What is the difference between margin and leverage?",
    answer:
      "Leverage describes the market exposure you can control relative to your capital. Margin is the amount of money required in your account to open and maintain that leveraged exposure.",
  },
  {
    question: "What is free margin in forex trading?",
    answer:
      "Free margin is the amount of account equity remaining after used margin has been deducted. It can be used to open new positions or absorb unrealised losses.",
  },
  {
    question: "What does margin level mean?",
    answer:
      "Margin level is calculated by dividing account equity by used margin and multiplying the result by 100. A higher margin level generally means the account is further away from margin-call and stop-out thresholds.",
  },
  {
    question: "When does a forex margin call happen?",
    answer:
      "A margin call occurs when the margin level reaches a threshold set by the broker. The broker may restrict new positions or require the trader to add funds or reduce market exposure.",
  },
  {
    question: "Can a broker automatically close my trades?",
    answer:
      "Yes. If the margin level reaches the broker’s stop-out threshold, the trading platform may begin closing positions automatically to reduce the account’s exposure.",
  },
];

const relatedGuides = [
  {
    title: "What Is Leverage in Forex?",
    description:
      "Understand how leverage affects market exposure, margin requirements, and trading risk.",
    href: "/en/learn-trading/leverage",
  },
  {
    title: "What Is a Lot in Forex?",
    description:
      "Learn how lot size affects position value, margin, potential profit, and potential loss.",
    href: "/en/learn-trading/lot",
  },
  {
    title: "What Is Spread in Forex?",
    description:
      "Learn how bid and ask prices create the spread and affect the cost of opening a trade.",
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
      name: "Forex Margin",
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
      name: "Forex Margin",
    },
    {
      "@type": "Thing",
      name: "Used Margin",
    },
    {
      "@type": "Thing",
      name: "Free Margin",
    },
    {
      "@type": "Thing",
      name: "Margin Level",
    },
    {
      "@type": "Thing",
      name: "Margin Call",
    },
    {
      "@type": "Thing",
      name: "Stop Out",
    },
  ],

  keywords: [
    "forex margin",
    "required margin",
    "used margin",
    "free margin",
    "margin level",
    "margin call",
    "stop out",
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

export default function MarginPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="margin-en-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="margin-en-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="margin-en-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="margin-en-faq-schema"
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

          <span className="text-slate-800">Margin</span>
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
                Beginner’s Guide
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                8-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
              What Is Margin in Forex Trading?

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                Used Margin, Free Margin and Margin Level Explained
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              Forex margin is the amount of money a broker sets aside when you
              open a leveraged position. This guide explains how required
              margin is calculated, how used and free margin affect your
              account, and what margin level, margin calls, and stop-outs mean.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                Start Learning
              </a>

              <Link
                href="/en/tools/margin-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                Margin Calculator
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Clear explanation
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Worked examples
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
                    Trading account example
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  Active Account
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
  <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
    <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
      Position Size
    </p>

    <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
      1 Lot
    </p>

    <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
      EUR 100,000
    </p>
  </div>

  <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 p-3 text-center sm:min-h-0 sm:p-4">
    <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-brand-600 sm:min-h-0 sm:text-xs">
      Account Leverage
    </p>

    <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
      1:100
    </p>

    <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
      LEVERAGE
    </p>
  </div>
</div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-brand-500">
                    Required Margin
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    EUR 1,000
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  This amount is temporarily allocated as
                </p>

                <p className="mt-1 text-2xl font-black">
                  Used Margin
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
                eyebrow="Core Definition"
                title="What Is Margin in Forex Trading?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  Margin is the amount of money a forex broker sets aside from
                  your trading account when you open a leveraged position. It
                  allows you to control a larger market exposure without paying
                  the full value of the position upfront.
                </p>

                <p>
                  Margin is not a permanent cost or broker commission. It is
                  temporarily allocated while the position remains open. When
                  the trade is closed, the allocated margin is released and
                  becomes available again.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms: if your account needs $1,000 to open a
                  position worth $100,000, the $1,000 is the required margin,
                  not the full value of the trade.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Used"
                  title="Used Margin"
                  description="The amount currently allocated to open positions."
                />

                <MiniDefinition
                  label="Free"
                  title="Free Margin"
                  description="The funds available for new trades or unrealised losses."
                />

                <MiniDefinition
                  label="Level"
                  title="Margin Level"
                  description="The percentage relationship between equity and used margin."
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
                eyebrow="Margin Calculation"
                title="How Is Required Forex Margin Calculated?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Required margin depends mainly on the total value of the
                position and the leverage available on the account. Higher
                leverage reduces the amount needed to open a position, but it
                does not reduce the market risk of that position.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Required Margin = Position Value ÷ Leverage
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Position value"
                    value="100,000"
                    sublabel="USD"
                  />

                  <CalculationBox
                    label="Account leverage"
                    value="1:100"
                    sublabel="LEVERAGE"
                  />

                  <CalculationBox
                    label="Required margin"
                    value="1,000"
                    sublabel="USD"
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
                    text="Identify the total position value, which is $100,000 in this example."
                  />

                  <Step
                    number="2"
                    text="Identify the account leverage, which is 1:100."
                  />

                  <Step
                    number="3"
                    text="Divide $100,000 by 100. The required margin is therefore $1,000."
                  />
                </div>
              </div>

            <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
  <div className="flex items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
      💡
    </span>

    <h3 className="min-w-0 flex-1 font-black leading-6 text-slate-950">
      The final amount may depend on your account currency
    </h3>
  </div>

  <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
    A broker may automatically convert the required margin into your
    account’s base currency. The displayed amount can therefore vary slightly
    with the current exchange rate.
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
                eyebrow="Practical Example"
                title="How Does Margin Affect a Trading Account?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Assume your trading account has a balance of $5,000 and you
                open a position requiring $1,000 in margin. That amount becomes
                used margin, while the remaining account equity determines your
                free margin.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Account balance" value="$5,000" />

                <StatCard label="Used margin" value="$1,000" />

                <StatCard label="Unrealised loss" value="-$200" />

                <StatCard label="Free margin" value="$3,800" accent />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  How is free margin calculated?
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Account equity
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $4,800
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      5,000 − 200
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Used margin
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $1,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      Allocated to the trade
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      Free margin
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      $3,800
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      4,800 − 1,000
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 p-4 sm:p-5">
  <div className="flex items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
      ⚠️
    </span>

    <h3 className="min-w-0 flex-1 font-black leading-6 text-slate-950">
      What happens if the unrealised loss keeps increasing?
    </h3>
  </div>

  <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
    As unrealised losses grow, account equity, free margin, and margin level
    decline. If the account reaches the broker’s margin-call threshold,
    trading restrictions may apply. At the stop-out level, the platform may
    begin closing positions automatically.
  </p>
</div>
            </section>
                        {/* Margin types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Account Metrics"
                title="What Are the Main Types of Margin?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                A trading platform normally displays several margin-related
                figures. Understanding the difference between them helps you
                see how much capital is allocated to open positions, how much
                remains available, and how much room the account has to absorb
                market losses.
              </p>

              {/* Mobile only */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {marginTypes.map((type, index) => (
                  <details
                    key={type.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <h3 className="text-[16px] font-black leading-6 text-slate-950">
                          {type.title}
                        </h3>

                        <p className="mt-0.5 text-[10px] font-black uppercase tracking-wide text-brand-500">
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
                {marginTypes.map((type) => (
                  <div
                    key={type.title}
                    className="grid h-full min-w-0 grid-rows-[auto_82px_auto_1fr] rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div>
                      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
                        {type.badge}
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

                  <div className="flex min-h-[196px] items-start pt-4">
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
            </section>

            {/* Margin level */}
            <section
              id="margin-level"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Account Health"
                title="What Is Margin Level and How Is It Calculated?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Margin level is a percentage showing the relationship between
                account equity and used margin. Brokers use this percentage to
                assess whether an account has enough equity to continue
                supporting its open positions.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Margin Level = Equity ÷ Used Margin × 100
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Account equity"
                    value="4,800"
                    sublabel="USD"
                  />

                  <CalculationBox
                    label="Used margin"
                    value="1,000"
                    sublabel="USD"
                  />

                  <CalculationBox
                    label="Margin level"
                    value="480%"
                    sublabel="MARGIN LEVEL"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-3">
                <MarginLevelCard
                  value="500%+"
                  title="More Available Capacity"
                  description="Free margin is relatively strong and the account is generally further from broker risk thresholds."
                  status="safe"
                />

                <MarginLevelCard
                  value="100%–500%"
                  title="Monitor the Account"
                  description="The percentage may fall quickly if losses increase or additional positions are opened."
                  status="warning"
                />

                <MarginLevelCard
                  value="Below 100%"
                  title="Higher-Risk Zone"
                  description="The account may be approaching a margin call or stop-out threshold, depending on broker rules."
                  status="danger"
                />
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-black leading-6 text-slate-950">
                      Margin thresholds vary by broker
                    </h3>

                    <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                      One broker may set its margin-call level at 100% and its
                      stop-out level at 50%, while another may apply different
                      thresholds. Always check the conditions attached to your
                      account type.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Margin call */}
            <section
              id="margin-call"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="Risk Management"
                title="What Are a Margin Call and Stop Out?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                A margin call occurs when an account no longer has the level of
                equity required to comfortably support its open positions. If
                losses continue and the margin level reaches the broker’s
                stop-out threshold, positions may be closed automatically.
              </p>

              {/* Mobile only */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                <details
                  open
                  className="group overflow-hidden rounded-[18px] border border-amber-200 bg-amber-50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                        ⚠️
                      </span>

                      <div>
                        <h3 className="text-[15px] font-black text-slate-950">
                          Margin Call
                        </h3>

                        <p className="mt-0.5 text-[11px] font-bold text-amber-700">
                          Warning Threshold
                        </p>
                      </div>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-lg text-amber-700 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-amber-200 bg-white px-4 py-4">
                    <p className="text-[13px] font-medium leading-7 text-slate-600">
                      A margin call happens when the account reaches a level
                      defined by the broker. New trades may be restricted, and
                      the trader may need to add funds or reduce exposure.
                    </p>
                  </div>
                </details>

                <details className="group overflow-hidden rounded-[18px] border border-rose-200 bg-rose-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-lg">
                        ⛔
                      </span>

                      <div>
                        <h3 className="text-[15px] font-black text-slate-950">
                          Stop Out
                        </h3>

                        <p className="mt-0.5 text-[11px] font-bold text-rose-700">
                          Automatic Position Closure
                        </p>
                      </div>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-white text-lg text-rose-700 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-rose-200 bg-white px-4 py-4">
                    <p className="text-[13px] font-medium leading-7 text-slate-600">
                      A stop out occurs at a lower margin level. The platform
                      may begin closing positions automatically, often starting
                      with the trade showing the largest loss.
                    </p>
                  </div>
                </details>
              </div>

              {/* Tablet and desktop */}
              <div className="mt-6 hidden gap-4 sm:grid lg:grid-cols-2">
                <RiskStageCard
                  icon="⚠️"
                  title="Margin Call"
                  english="Warning Threshold"
                  description="A warning that account equity has fallen relative to used margin. The broker may prevent the account from opening additional positions."
                  theme="warning"
                />

                <RiskStageCard
                  icon="⛔"
                  title="Stop Out"
                  english="Automatic Closure Level"
                  description="A more serious stage at which the broker may start closing positions automatically to reduce the account’s market exposure."
                  theme="danger"
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  What can reduce free margin?
                </h3>

                {/* Mobile */}
                <div className="mt-4 space-y-2.5 sm:hidden">
                  {marginRisks.map((risk) => (
                    <details
                      key={risk.title}
                      className="group overflow-hidden rounded-[16px] border border-slate-200 bg-white"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg">
                            {risk.icon}
                          </span>

                          <h4 className="text-[14px] font-black text-slate-950">
                            {risk.title}
                          </h4>
                        </div>

                        <span className="text-lg font-black text-brand-500 transition group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <div className="border-t border-slate-200 px-3.5 py-3">
                        <p className="text-[12px] font-medium leading-6 text-slate-600">
                          {risk.description}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>

                {/* Desktop */}
                <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-2">
                  {marginRisks.map((risk) => (
                    <div
                      key={risk.title}
                      className="rounded-[18px] border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg">
                          {risk.icon}
                        </span>

                        <div>
                          <h4 className="font-black text-slate-950">
                            {risk.title}
                          </h4>

                          <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                            {risk.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  How can you reduce the risk of a margin call?
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Use a position size that matches the account balance.",
                    "Avoid opening too many leveraged positions at once.",
                    "Monitor free margin and margin level regularly.",
                    "Use risk controls and avoid excessive leverage.",
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
                    href="/en/tools/margin-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Use Margin Calculator
                  </Link>

                  <Link
                    href="/en/learn-trading/leverage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Learn About Leverage
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
                eyebrow="Common Questions"
                title="Frequently Asked Questions About Forex Margin"
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
                  Trading Concepts Related to Margin
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding leverage, lot size, and spreads can help you
                  estimate margin requirements, transaction costs, and account
                  risk more accurately.
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
                Calculate Required Margin
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                Estimate the margin required for a position based on trade size,
                instrument, and account leverage.
              </p>

              <Link
                href="/en/tools/margin-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                Open Margin Calculator
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
              Calculate Margin Before Opening a Position
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Do not rely only on the maximum leverage available. Check your
              position size, required margin, free margin, and the account’s
              ability to absorb market movement.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/en/tools/margin-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Margin Calculator
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

function MarginLevelCard({
  value,
  title,
  description,
  status,
}: {
  value: string;
  title: string;
  description: string;
  status: "safe" | "warning" | "danger";
}) {
  const styles = {
    safe: {
      wrapper: "border-emerald-200 bg-emerald-50",
      value: "text-emerald-700",
    },
    warning: {
      wrapper: "border-amber-200 bg-amber-50",
      value: "text-amber-700",
    },
    danger: {
      wrapper: "border-rose-200 bg-rose-50",
      value: "text-rose-700",
    },
  };

  return (
    <div
      className={`rounded-[18px] border p-4 ${styles[status].wrapper}`}
    >
      <p className={`text-xl font-black ${styles[status].value}`}>
        {value}
      </p>

      <h3 className="mt-2 text-[15px] font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-1.5 text-[12px] font-medium leading-6 text-slate-600 sm:text-sm sm:leading-7">
        {description}
      </p>
    </div>
  );
}

function RiskStageCard({
  icon,
  title,
  english,
  description,
  theme,
}: {
  icon: string;
  title: string;
  english: string;
  description: string;
  theme: "warning" | "danger";
}) {
  const isDanger = theme === "danger";

  return (
    <div
      className={`rounded-[22px] border p-5 ${
        isDanger
          ? "border-rose-200 bg-rose-50"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ${
            isDanger ? "bg-rose-100" : "bg-amber-100"
          }`}
        >
          {icon}
        </span>

        <div>
          <h3 className="text-lg font-black text-slate-950">
            {title}
          </h3>

          <p
            className={`mt-0.5 text-[11px] font-black uppercase ${
              isDanger ? "text-rose-700" : "text-amber-700"
            }`}
          >
            {english}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
        {description}
      </p>
    </div>
  );
}