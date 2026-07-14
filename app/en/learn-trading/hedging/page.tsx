import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/hedging";

const ARABIC_PAGE_URL =
  "https://brokeralarab.com/learn-trading/hedging";

const PAGE_TITLE =
  "What Is Hedging in Trading? Forex Hedging Strategies Explained";

const PAGE_DESCRIPTION =
  "Learn what hedging means in trading, how forex hedging works, the difference between full, partial and cross hedges, and the risks and costs involved.";

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
    "what is hedging in trading",
    "forex hedging",
    "hedging strategy",
    "how does hedging work",
    "hedging in forex",
    "forex hedging strategy",
    "direct hedging forex",
    "full hedge",
    "partial hedge",
    "cross hedging",
    "hedging risk management",
    "hedging example",
    "hedging costs",
    "hedging vs stop loss",
    "opening opposite forex positions",
    "how to hedge a forex trade",
    "forex hedging explained",
    "advantages and disadvantages of hedging",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What Is Hedging?" },
  { id: "how-it-works", label: "How Hedging Works" },
  { id: "example", label: "Forex Hedging Example" },
  { id: "types", label: "Types of Hedging" },
  { id: "benefits-risks", label: "Benefits and Risks" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "faq", label: "FAQs" },
];

const hedgingTypes = [
  {
    title: "Full Hedge",
    subtitle: "Full Hedge",
    description:
      "A full hedge uses an opposing position that is approximately equal to the original trade, significantly reducing the account's net directional exposure.",
    points: [
      "Can reduce net market exposure substantially.",
      "May temporarily lock the open profit or loss.",
      "Adds spread, commission and possible overnight costs.",
    ],
    badge: "Maximum offset",
  },
  {
    title: "Partial Hedge",
    subtitle: "Partial Hedge",
    description:
      "A partial hedge uses a smaller opposing position to reduce only part of the original exposure while keeping some directional participation.",
    points: [
      "Reduces risk without removing all exposure.",
      "Provides greater flexibility than a full hedge.",
      "Requires accurate position-size calculations.",
    ],
    badge: "Flexible protection",
  },
  {
    title: "Cross Hedge",
    subtitle: "Cross Hedging",
    description:
      "A cross hedge uses a different but related instrument to offset some of the risk in the original position when a direct hedge is unavailable or unsuitable.",
    points: [
      "Can be used when direct hedging is not practical.",
      "Depends on the strength and direction of correlation.",
      "May become less effective if correlation changes.",
    ],
    badge: "Indirect hedge",
  },
];

const hedgingFactors = [
  {
    icon: "⚖️",
    title: "Opposing Position Size",
    description:
      "The closer the hedge size is to the original position, the lower the net directional exposure. A smaller opposing trade creates only a partial hedge.",
  },
  {
    icon: "💸",
    title: "Trading Costs",
    description:
      "Opening another position can mean paying an additional spread or commission, as well as overnight financing when the hedge remains open.",
  },
  {
    icon: "🔗",
    title: "Instrument Correlation",
    description:
      "When a different instrument is used, traders must evaluate the strength and direction of its relationship with the original position.",
  },
  {
    icon: "⏱️",
    title: "Hedge Exit Timing",
    description:
      "Opening the hedge is only the first decision. A complete plan must explain when the hedge will be reduced, removed or replaced.",
  },
];

const commonMistakes = [
  {
    title: "Hedging Without an Exit Plan",
    description:
      "Two opposing positions may remain open for too long, increasing costs while leaving the trader unsure which position to close first.",
  },
  {
    title: "Treating Hedging as Loss Removal",
    description:
      "A hedge does not erase an existing loss. It changes net exposure and may temporarily stabilise the account result.",
  },
  {
    title: "Ignoring Spreads and Financing",
    description:
      "Additional spreads, commissions and overnight charges can reduce account equity while both positions remain open.",
  },
  {
    title: "Using Incorrect Position Sizes",
    description:
      "An opposing position that is too large or too small may create a new directional exposure instead of reducing the intended risk.",
  },
];

const faqItems = [
  {
    question: "What is hedging in trading?",
    answer:
      "Hedging is a risk-management approach that uses an opposing or related position to reduce the effect of an unwanted market move on an existing trade or portfolio.",
  },
  {
    question: "How does forex hedging work?",
    answer:
      "Forex hedging may involve opening both a long and short position on the same currency pair or using a correlated instrument. The result depends on position sizes, trading costs, account rules and how the hedge is later removed.",
  },
  {
    question: "Does hedging completely prevent losses?",
    answer:
      "No. Hedging can reduce net exposure or temporarily stabilise an open loss, but it does not erase losses already incurred and does not remove spreads, commissions or financing costs.",
  },
  {
    question: "What is the difference between a full hedge and a partial hedge?",
    answer:
      "A full hedge uses an opposing position approximately equal to the original trade. A partial hedge uses a smaller position, reducing only part of the original directional exposure.",
  },
  {
    question: "Do all forex brokers allow hedging?",
    answer:
      "No. Hedging availability depends on the broker, regulatory jurisdiction, account type and platform. Some accounts allow simultaneous opposing positions, while others automatically net them.",
  },
  {
    question: "Is hedging better than using a stop loss?",
    answer:
      "Neither method is automatically better. A stop loss closes a trade at a predefined level, while a hedge keeps positions open and may add complexity and cost. The appropriate choice depends on the strategy and trader experience.",
  },
  {
    question: "When do traders use hedging strategies?",
    answer:
      "Traders may consider hedging before a major event, when managing several related positions or when temporarily reducing exposure. The strategy should include a clear reason, size and exit plan.",
  },
];

const relatedGuides = [
  {
    title: "What Is a Stop Loss?",
    description:
      "Learn how stop-loss orders work and how traders define an invalidation level.",
    href: "/en/learn-trading/stop-loss",
  },
  {
    title: "What Is Lot Size?",
    description:
      "Understand position size, pip value and how lot size affects market exposure.",
    href: "/en/learn-trading/lot",
  },
  {
    title: "What Is Leverage?",
    description:
      "Learn how leverage changes exposure, margin requirements and account risk.",
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
      name: "Hedging in Trading",
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
      name: "Hedging in trading",
    },
    {
      "@type": "Thing",
      name: "Forex hedging",
    },
    {
      "@type": "Thing",
      name: "Trading risk management",
    },
    {
      "@type": "Thing",
      name: "Full and partial hedging",
    },
    {
      "@type": "Thing",
      name: "Cross hedging",
    },
  ],

  keywords: [
    "hedging",
    "forex hedging",
    "hedging strategy",
    "full hedge",
    "partial hedge",
    "cross hedge",
    "risk management",
    "opposite forex positions",
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

export default function HedgingPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="hedging-en-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="hedging-en-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="hedging-en-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="hedging-en-faq-schema"
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
            Hedging
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
                10-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.25] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.15]">
              What Is Hedging in Trading?

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.3] text-slate-700 sm:block lg:text-[34px]">
                How Forex Hedging Strategies Reduce Market Exposure
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              Hedging is a risk-management technique that uses an opposing or
              related position to reduce exposure to an unwanted price move.
              This guide explains how forex hedging works, the difference
              between full, partial and cross hedges, the costs involved, and
              why every hedge needs a clear exit plan.
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
                Forex examples
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Costs and risks
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Full hedge example
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-700">
                  Opposing Positions
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-emerald-700 sm:min-h-0 sm:text-xs">
                    Original position
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    Buy 1.00
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    LONG POSITION
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-rose-600 sm:min-h-0 sm:text-xs">
                    Hedge position
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    Sell 1.00
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    SHORT POSITION
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-brand-500">
                    Theoretical net exposure
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    Close to zero
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  A gain on one position may offset a loss on the other
                </p>

                <p className="mt-1 text-2xl font-black">
                  Exposure Is Temporarily Reduced
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
                eyebrow="Hedging Meaning"
                title="How Does Hedging Reduce Net Market Exposure?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  Hedging is a technique used to reduce the effect of an
                  unfavourable price move on an existing trade or portfolio.
                  It may involve opening an opposing position on the same
                  instrument or using another market with a related price
                  movement.
                </p>

                <p>
                  The purpose of a hedge is not to guarantee a profit or erase
                  an existing loss. It changes the account&apos;s net exposure.
                  With a full hedge on the same instrument and an equal
                  position size, the gain on one trade may closely offset the
                  loss on the other before trading costs are included.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms, hedging keeps the original position open
                  while adding another position designed to reduce its
                  sensitivity to market movements.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Exposure"
                  title="Net Exposure"
                  description="The remaining directional risk after all open positions are combined."
                />

                <MiniDefinition
                  label="Offset"
                  title="Opposing Position"
                  description="A position designed to move against the direction of the original trade."
                />

                <MiniDefinition
                  label="Cost"
                  title="Hedging Cost"
                  description="Additional spreads, commissions and possible overnight financing."
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
                eyebrow="How Hedging Works"
                title="What Happens When You Open Opposing Forex Positions?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Suppose a trader holds a long EUR/USD position but expects a
                possible short-term decline. Instead of closing the original
                trade, the trader may open a short position on the same pair.
                When both positions have equal sizes, the account becomes less
                sensitive to further price movement because the positions
                respond in opposite directions.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Net Exposure = Long Position Size − Short Position Size
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Long position"
                    value="1.00 lot"
                    sublabel="LONG"
                  />

                  <CalculationBox
                    label="Short position"
                    value="1.00 lot"
                    sublabel="SHORT"
                  />

                  <CalculationBox
                    label="Net exposure"
                    value="0.00 lot"
                    sublabel="THEORETICAL"
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
                    text="The trader holds a 1.00-lot long position on EUR/USD."
                  />

                  <Step
                    number="2"
                    text="A 1.00-lot short position is opened on the same currency pair."
                  />

                  <Step
                    number="3"
                    text="The theoretical net exposure becomes close to zero, although the costs of both positions remain."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Zero net exposure does not mean zero cost
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Even when the long and short positions have equal sizes, the
                  trader may pay a spread or commission on both trades.
                  Overnight financing may also reduce account equity while the
                  hedge remains open.
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
                eyebrow="Forex Hedging Example"
                title="What Happens to Profit and Loss After Opening a Hedge?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Assume a trader bought EUR/USD with a 1.00-lot position. The
                market then moved lower, leaving the original trade with an
                unrealised loss of $300. The trader subsequently opened an
                equal short position to reduce the effect of any additional
                decline.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Long position"
                  value="1.00 lot"
                />

                <StatCard
                  label="Current loss"
                  value="-$300"
                />

                <StatCard
                  label="Short hedge"
                  value="1.00 lot"
                />

                <StatCard
                  label="Net exposure"
                  value="Close to zero"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  If EUR/USD falls another 50 pips
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Long-position change
                    </p>

                    <p className="mt-2 text-xl font-black text-rose-600">
                      -$500
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      50 × $10
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Short-position change
                    </p>

                    <p className="mt-2 text-xl font-black text-emerald-600">
                      +$500
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      50 × $10
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      Net change
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      ≈ $0
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      BEFORE COSTS
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
                    The loss that existed before hedging does not disappear
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  If the original trade was already losing $300 before the
                  hedge was opened, that loss remains. A full hedge may reduce
                  additional directional changes, but it does not
                  automatically return the account to break-even.
                </p>
              </div>
            </section>
                        {/* Hedging types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Hedging Methods"
                title="What Are the Main Types of Hedging in Trading?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Hedging strategies differ according to how much exposure a
                trader wants to offset, which instrument is used and the size
                of the opposing position. A hedge may fully offset the original
                trade, reduce only part of the risk or use a correlated market
                as an indirect form of protection.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {hedgingTypes.map((type, index) => (
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
                {hedgingTypes.map((type) => (
                  <div
                    key={type.title}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
                        {type.badge}
                      </span>

                      <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
                        {type.subtitle}
                      </span>
                    </div>

                    <div className="min-h-[66px] pt-4">
                      <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:whitespace-nowrap lg:text-[19px]">
                        {type.title}
                      </h3>
                    </div>

                    <div className="pb-5 pt-2">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {type.description}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4">
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

              {/* Comparison table */}
              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    Comparison
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Full Hedge
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Partial Hedge
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Cross Hedge
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <HedgingComparisonRow
                    title="Hedge size"
                    full="Approximately equal"
                    partial="Smaller than original"
                    cross="Based on correlation"
                  />

                  <HedgingComparisonRow
                    title="Net exposure"
                    full="Very low"
                    partial="Partially reduced"
                    cross="Variable"
                  />

                  <HedgingComparisonRow
                    title="Complexity"
                    full="Moderate"
                    partial="Moderate"
                    cross="Higher"
                  />

                  <HedgingComparisonRow
                    title="Correlation risk"
                    full="Not applicable"
                    partial="Not applicable"
                    cross="Present"
                  />
                </div>
              </div>
            </section>

            {/* Benefits and risks */}
            <section
              id="benefits-risks"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Strategy Evaluation"
                title="What Are the Benefits, Risks and Costs of Hedging?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Hedging may give a trader more time to manage an open position
                or reduce exposure during uncertain conditions. However, it
                does not turn a risky trade into a risk-free one. Additional
                positions introduce more costs, margin considerations and exit
                decisions.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ✓
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      Potential Benefits
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "Reduce net directional exposure during uncertain markets.",
                      "Manage an existing position without closing it immediately.",
                      "Limit part of the impact of an adverse price move.",
                      "Add flexibility when handling multiple related positions.",
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
                      Risks and Costs
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "Pay another spread or commission on the hedge position.",
                      "Accumulate overnight financing while positions remain open.",
                      "Face a more complicated decision when removing the hedge.",
                      "Temporarily lock an open loss instead of resolving it.",
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
                {hedgingFactors.map((factor) => (
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
                {hedgingFactors.map((factor) => (
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
                  Partial Hedging Example
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Original position"
                    value="Buy 1.00"
                    sublabel="LONG"
                  />

                  <CalculationBox
                    label="Hedge position"
                    value="Sell 0.40"
                    sublabel="SHORT"
                  />

                  <CalculationBox
                    label="Net exposure"
                    value="Long 0.60"
                    sublabel="NET EXPOSURE"
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
                    A partial hedge does not eliminate market movement
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  In this example, the account remains net long by 0.60 lots.
                  It can still benefit if the market rises and lose if the
                  market falls, but the impact is smaller than it would be
                  without the hedge.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  Questions to Answer Before Hedging a Trade
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "How much of the original exposure should be reduced?",
                    "What will the spreads, commissions and financing cost?",
                    "When will the hedge be reduced or completely removed?",
                    "Does the account allow simultaneous opposing positions?",
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
                eyebrow="Position Management"
                title="What Are the Most Common Hedging Mistakes?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Hedging becomes problematic when it is used to postpone a
                difficult exit decision rather than as part of a defined risk
                plan. Opposing positions may reduce directional exposure, but
                they can replace price risk with higher costs and more complex
                position management.
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
                    Do not hedge only to avoid closing a losing trade
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Opening an opposing position without a clear purpose or exit
                  plan may simply lock the loss while costs continue to build.
                  A hedge should be a planned exposure-management decision, not
                  a way to avoid accepting that the original setup failed.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Hedging versus closing the trade
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Closing the original position ends its directional exposure
                  and future holding costs. Hedging keeps the original trade
                  open and adds another position, so margin, financing and
                  future management decisions may still be required.
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
                title="Forex Hedging Frequently Asked Questions"
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
                  Trading Concepts Related to Hedging
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding stop loss, lot size and leverage can help you
                  compare hedging with other risk-management techniques and
                  evaluate its effect on account exposure.
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
                Use account balance, risk percentage and stop-loss distance to
                estimate the original position size before adding a hedge.
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
              Evaluate the Cost Before Opening a Hedge
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Calculate net exposure, spreads and possible overnight financing,
              then define when the hedge will be removed. Hedging is a
              risk-management technique, not a way to erase losses or
              guarantee profit.
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

function HedgingComparisonRow({
  title,
  full,
  partial,
  cross,
}: {
  title: string;
  full: string;
  partial: string;
  cross: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {full}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {partial}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {cross}
      </div>
    </div>
  );
}