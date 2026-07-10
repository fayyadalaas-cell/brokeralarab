import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/leverage";

const ARABIC_PAGE_URL =
  "https://brokeralarab.com/learn-trading/leverage";

const PAGE_TITLE =
  "What Is Leverage in Trading? Forex Leverage Explained";

const PAGE_DESCRIPTION =
  "Learn what leverage means in forex and CFD trading, how leverage works, how to calculate it, and how leverage affects margin, position size, profits, and losses.";

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
    "what is leverage in trading",
    "what is leverage in forex",
    "forex leverage explained",
    "how does leverage work",
    "what does 1:100 leverage mean",
    "leverage vs margin",
    "how to calculate leverage",
    "forex leverage calculator",
    "trading leverage for beginners",
    "high leverage trading risks",
    "best leverage for beginners",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What Is Leverage?" },
  { id: "how-it-works", label: "How It Works" },
  { id: "example", label: "Practical Example" },
  { id: "levels", label: "Leverage Levels" },
  { id: "margin", label: "Leverage vs Margin" },
  { id: "risks", label: "Leverage Risks" },
  { id: "faq", label: "FAQs" },
];

const leverageLevels = [
  {
    title: "Lower Leverage",
    subtitle: "LOW LEVERAGE",
    ratio: "1:10",
    description:
      "With 1:10 leverage, every $1 of margin can provide theoretical market exposure of up to $10, subject to the broker and instrument.",
    points: [
      "Limits how much position size can be amplified.",
      "Requires more margin for the same trade value.",
      "May be easier to manage for cautious traders.",
    ],
    badge: "Lower exposure",
  },
  {
    title: "Moderate Leverage",
    subtitle: "MODERATE LEVERAGE",
    ratio: "1:100",
    description:
      "A 1:100 ratio allows a trader to control a position much larger than the margin committed. This is a common leverage level at many forex brokers.",
    points: [
      "Reduces the margin needed for a position.",
      "Provides more flexibility when sizing trades.",
      "Still requires disciplined risk management.",
    ],
    badge: "Commonly used",
  },
  {
    title: "Higher Leverage",
    subtitle: "HIGH LEVERAGE",
    ratio: "1:500",
    description:
      "Higher leverage allows large market exposure with relatively little margin, but it can make an account far more sensitive to adverse price movement.",
    points: [
      "Makes oversized positions easier to open.",
      "Can accelerate account losses.",
      "Increases margin-call and stop-out risk.",
    ],
    badge: "Higher risk",
  },
];

const leverageRisks = [
  {
    icon: "📈",
    title: "Amplified Gains and Losses",
    description:
      "Leverage does not only increase potential profit. It also increases the effect of market movement when a position moves against you.",
  },
  {
    icon: "📦",
    title: "Oversized Positions",
    description:
      "High available leverage can encourage traders to open positions that are too large for their account balance.",
  },
  {
    icon: "⚠️",
    title: "Falling Margin Level",
    description:
      "When a leveraged trade moves against you, account equity and free margin can decline quickly.",
  },
  {
    icon: "🧠",
    title: "False Confidence",
    description:
      "Being able to open a large trade can create the impression that the account can safely absorb more risk than it actually can.",
  },
];

const faqItems = [
  {
    question: "Does leverage only increase trading profits?",
    answer:
      "No. Leverage amplifies the effect of market movement in both directions. It can increase potential profit, but it can also increase potential loss.",
  },
  {
    question: "What does 1:100 leverage mean?",
    answer:
      "A leverage ratio of 1:100 means that each $1 of margin can provide theoretical market exposure of up to $100, depending on the broker, account type, and instrument.",
  },
  {
    question: "What is the difference between leverage and margin?",
    answer:
      "Leverage describes the amount of market exposure you can control relative to your capital. Margin is the amount the broker sets aside to open and maintain that leveraged position.",
  },
  {
    question: "Is higher leverage better for traders?",
    answer:
      "Not necessarily. Higher leverage reduces the margin required for a position, but it can also encourage oversized trades and make the account more vulnerable to losses.",
  },
  {
    question: "Can you trade without leverage?",
    answer:
      "Yes. Trading at 1:1 means using no leverage, provided the broker and instrument allow it. You would need more capital to control the same position value.",
  },
  {
    question: "What leverage is best for beginners?",
    answer:
      "There is no single ratio that suits everyone. Beginners should focus on small position sizes, controlled exposure, and a clear risk-management plan instead of using the maximum available leverage.",
  },
];

const relatedGuides = [
  {
    title: "What Is Margin in Forex?",
    description:
      "Learn about used margin, free margin, margin level, margin calls, and stop-outs.",
    href: "/en/learn-trading/margin",
  },
  {
    title: "What Is Lot Size?",
    description:
      "Understand contract sizes and how position size affects profit, loss, and risk.",
    href: "/en/learn-trading/lot",
  },
  {
    title: "What Is Spread in Forex?",
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
      name: "Trading Leverage",
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
      name: "Trading Leverage",
    },
    {
      "@type": "Thing",
      name: "Forex Leverage",
    },
    {
      "@type": "Thing",
      name: "Margin Trading",
    },
    {
      "@type": "Thing",
      name: "Position Size",
    },
    {
      "@type": "Thing",
      name: "Trading Risk Management",
    },
  ],

  keywords: [
    "forex leverage",
    "trading leverage",
    "leverage ratio",
    "margin",
    "position size",
    "leverage risk",
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

export default function LeveragePage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="leverage-en-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="leverage-en-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="leverage-en-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="leverage-en-faq-schema"
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
            Leverage
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
                Beginner’s Guide
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                8-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
              What Is Leverage in Trading?

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                How Forex Leverage Works and Why It Matters
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              Leverage allows you to control a position that is larger than
              the capital you commit. This guide explains what leverage means,
              how it works, how it relates to margin, and how it can amplify
              both potential profits and potential losses.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                Start Learning
              </a>

              <Link
                href="/en/tools/leverage-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                Leverage Calculator
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Clear explanation
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Real examples
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
                    Buying power example
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    1:100 Leverage
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  Example
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
                    Capital Used
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $1,000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    CAPITAL
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-brand-600 sm:min-h-0 sm:text-xs">
                    Market Exposure
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $100,000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    EXPOSURE
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-brand-500">
                    Leverage Ratio
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    1:100
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  Leverage increases exposure, not your account balance
                </p>

                <p className="mt-1 text-2xl font-black">
                  Risk Management Comes First
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
                title="What Is Leverage in Trading?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  Leverage is a trading mechanism that allows you to control a
                  position worth more than the capital you commit. Brokers
                  express leverage as a ratio, such as 1:10, 1:100, or 1:500.
                </p>

                <p>
                  Leverage does not mean that you own the full position value.
                  It means the broker requires only a portion of that value as
                  margin. Profit and loss, however, are based on the full
                  position size rather than the margin amount alone.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms: 1:100 leverage means that every $1 of margin
                  may provide theoretical market exposure of up to $100,
                  depending on the broker, account type, and instrument.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Ratio"
                  title="Leverage Ratio"
                  description="The relationship between committed capital and market exposure."
                />

                <MiniDefinition
                  label="Margin"
                  title="Required Margin"
                  description="The amount the broker sets aside to open the position."
                />

                <MiniDefinition
                  label="Exposure"
                  title="Market Exposure"
                  description="The full value of the position you control."
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
                eyebrow="How It Works"
                title="How Does Leverage Work in Forex Trading?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                The leverage ratio determines how much market exposure you can
                control relative to the margin required. Higher leverage
                reduces the margin needed for the same position, but the
                account remains exposed to the full value of that position.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Market Exposure = Margin Used × Leverage Ratio
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Margin used"
                    value="1,000"
                    sublabel="USD"
                  />

                  <CalculationBox
                    label="Leverage ratio"
                    value="1:100"
                    sublabel="LEVERAGE"
                  />

                  <CalculationBox
                    label="Market exposure"
                    value="100,000"
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
                    text="Identify the margin committed to the position, which is $1,000 in this example."
                  />

                  <Step
                    number="2"
                    text="Identify the leverage ratio available on the account, which is 1:100."
                  />

                  <Step
                    number="3"
                    text="Multiply $1,000 by 100. The theoretical market exposure is $100,000."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Leverage does not reduce the underlying risk
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  A lower margin requirement does not make the trade safer. If
                  the position is large, even a relatively small market move
                  can have a significant effect on the account.
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
                title="How Does Leverage Affect a Trade?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Assume you open a position worth $100,000 using $1,000 of
                margin and 1:100 leverage. If the market moves by 1%, the
                financial effect is calculated from the full position value.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Position value"
                  value="$100,000"
                />

                <StatCard
                  label="Margin used"
                  value="$1,000"
                />

                <StatCard
                  label="Market move"
                  value="1%"
                />

                <StatCard
                  label="Theoretical impact"
                  value="$1,000"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  What does a 1% market move mean?
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Position value
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $100,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      EXPOSURE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Price movement
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      1%
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      MARKET MOVE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      Theoretical impact
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      $1,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      100,000 × 1%
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
                    Why can high leverage be dangerous?
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  In this example, a 1% movement on a $100,000 position equals
                  approximately $1,000. If only $1,000 of margin was used, a
                  relatively small price move could have a major effect on the
                  account.
                </p>
              </div>
            </section>
                        {/* Leverage levels */}
            <section
              id="levels"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Common Ratios"
                title="What Are the Main Leverage Levels?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                The leverage available to traders varies by broker, account
                type, financial instrument, and regulatory jurisdiction. A
                higher ratio does not automatically make an account better. It
                simply reduces the margin required to control the same market
                exposure.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {leverageLevels.map((level, index) => (
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
                            {level.ratio}
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
                {leverageLevels.map((level) => (
                  <div
                    key={level.title}
                    className="grid h-full min-w-0 grid-rows-[auto_86px_auto_1fr] rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
                        {level.badge}
                      </span>

                      <span className="rounded-xl bg-brand-500 px-3 py-2 text-sm font-black text-white shadow-sm">
                        {level.ratio}
                      </span>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-[22px] font-black leading-[1.3] text-slate-950">
                        {level.title}
                      </h3>

                      <p className="mt-1.5 text-[11px] font-black uppercase tracking-wide text-brand-500">
                        {level.subtitle}
                      </p>
                    </div>

                    <div className="min-h-[196px] pt-4">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {level.description}
                      </p>
                    </div>

                    <ul className="space-y-2.5 border-t border-slate-200 pt-4">
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

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    Comparison
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    1:10
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    1:100
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    1:500
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <LeverageComparisonRow
                    title="Margin required for the same position"
                    low="Higher"
                    medium="Moderate"
                    high="Lower"
                  />

                  <LeverageComparisonRow
                    title="Ease of opening a large position"
                    low="Lower"
                    medium="Moderate"
                    high="Higher"
                  />

                  <LeverageComparisonRow
                    title="Account sensitivity to misuse"
                    low="Lower"
                    medium="Moderate"
                    high="Higher"
                  />

                  <LeverageComparisonRow
                    title="Need for position-size control"
                    low="Important"
                    medium="Very important"
                    high="Essential"
                  />
                </div>
              </div>
            </section>

            {/* Leverage and margin */}
            <section
              id="margin"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Margin Relationship"
                title="What Is the Difference Between Leverage and Margin?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Leverage and margin are closely related, but they are not the
                same thing. Leverage describes how much market exposure you can
                control relative to your capital, while margin is the amount
                the broker sets aside to open and maintain that exposure.
              </p>

              <div className="mt-6 grid items-stretch gap-3 sm:grid-cols-2">
                <ConceptCard
                  label="Leverage"
                  title="Trading Leverage"
                  description="A ratio showing how much market exposure can be controlled relative to the capital or margin committed."
                  points={[
                    "Determines the theoretical ability to control a larger position.",
                    "Directly affects the margin required for the trade.",
                    "Does not remove the risks of market movement.",
                  ]}
                />

                <ConceptCard
                  label="Margin"
                  title="Trading Margin"
                  description="The amount the broker temporarily allocates to support an open leveraged position."
                  points={[
                    "Falls as leverage rises for the same position value.",
                    "Is released when the position is closed.",
                    "Affects margin level, margin calls, and stop-outs.",
                  ]}
                />
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Required Margin = Position Value ÷ Leverage Ratio
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Position value"
                    value="100,000"
                    sublabel="USD"
                  />

                  <CalculationBox
                    label="Leverage ratio"
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

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Higher leverage does not make an account stronger
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Higher leverage may reduce the margin required, but it does
                  not increase the account balance or its true ability to
                  absorb losses. The most important factor is the size of the
                  position relative to account equity.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  The same position at different leverage ratios
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <MarginExampleCard
                    ratio="1:10"
                    margin="$10,000"
                    note="Higher margin"
                  />

                  <MarginExampleCard
                    ratio="1:100"
                    margin="$1,000"
                    note="Moderate margin"
                    highlighted
                  />

                  <MarginExampleCard
                    ratio="1:500"
                    margin="$200"
                    note="Lower margin"
                  />
                </div>

                <p className="mt-4 text-[12px] font-medium leading-6 text-slate-600 sm:text-sm sm:leading-7">
                  The position value in all three examples is $100,000. Only
                  the required margin changes. The market exposure and the
                  financial effect of price movement remain tied to the full
                  position size.
                </p>
              </div>
            </section>

            {/* Risks */}
            <section
              id="risks"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="Risk Management"
                title="What Are the Risks of Trading With Leverage?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Risk does not come from the leverage ratio alone. It comes from
                how leverage is used. The main danger begins when leverage
                allows a trader to open a position that is too large for the
                account.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {leverageRisks.map((risk) => (
                  <details
                    key={risk.title}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                          {risk.icon}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {risk.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-brand-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {risk.description}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Tablet and desktop */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {leverageRisks.map((risk) => (
                  <div
                    key={risk.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        {risk.icon}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-950">
                          {risk.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {risk.description}
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
                    Losses are based on the full position size
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  If you use $1,000 of margin to control a $100,000 position,
                  price movement is not calculated only from the $1,000
                  committed. It affects the full value of the position.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  How can leverage be used more responsibly?
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Choose position size based on the amount you are prepared to lose.",
                    "Do not use the maximum leverage simply because it is available.",
                    "Monitor free margin and margin level regularly.",
                    "Use stop-loss orders and a clear exit plan.",
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
                    href="/en/tools/leverage-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    Use Leverage Calculator
                  </Link>

                  <Link
                    href="/en/learn-trading/margin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Read the Margin Guide
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
                title="Frequently Asked Questions About Trading Leverage"
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
                  Trading Concepts Related to Leverage
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding margin, lot size, and spreads can help you
                  estimate market exposure, account requirements, trading
                  costs, and risk more accurately.
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
                Calculate Trading Leverage
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                Use the calculator to estimate the relationship between
                capital, margin, position value, and leverage.
              </p>

              <Link
                href="/en/tools/leverage-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                Open Leverage Calculator
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
              Do Not Choose Position Size Based on Leverage Alone
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Calculate your exposure, required margin, and potential loss
              before choosing a position size that matches your account and
              risk-management plan.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/en/tools/leverage-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Leverage Calculator
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

function LeverageComparisonRow({
  title,
  low,
  medium,
  high,
}: {
  title: string;
  low: string;
  medium: string;
  high: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {low}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {medium}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {high}
      </div>
    </div>
  );
}

function ConceptCard({
  label,
  title,
  description,
  points,
}: {
  label: string;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="grid h-full min-w-0 grid-rows-[auto_54px_minmax(112px,auto)_1fr] rounded-[22px] border border-slate-200 bg-slate-50 p-5">
      <div>
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black uppercase text-brand-600">
          {label}
        </span>
      </div>

      <div className="flex items-end">
        <h3 className="text-xl font-black text-slate-950">
          {title}
        </h3>
      </div>

      <div className="flex items-start pt-3">
        <p className="text-sm font-medium leading-7 text-slate-600">
          {description}
        </p>
      </div>

      <ul className="space-y-2.5 border-t border-slate-200 pt-4">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-700"
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
  );
}

function MarginExampleCard({
  ratio,
  margin,
  note,
  highlighted = false,
}: {
  ratio: string;
  margin: string;
  note: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] border p-4 text-center shadow-sm ${
        highlighted
          ? "border-brand-200 bg-white"
          : "border-white bg-white/70"
      }`}
    >
      <p className="text-[11px] font-black text-brand-500">
        {ratio} leverage
      </p>

      <p className="mt-2 text-xl font-black text-slate-950">
        {margin}
      </p>

      <p className="mt-1 text-[10px] font-bold text-slate-400">
        {note}
      </p>
    </div>
  );
}