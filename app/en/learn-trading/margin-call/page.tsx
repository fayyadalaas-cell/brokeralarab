import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/margin-call";

const ARABIC_PAGE_URL =
  "https://brokeralarab.com/learn-trading/margin-call";

const PAGE_TITLE =
  "What Is a Margin Call? Margin Level and Stop Out Explained";

const PAGE_DESCRIPTION =
  "Learn what a margin call means in forex and CFD trading, how to calculate margin level, how stop out works, and how to reduce the risk of forced liquidation.";

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
    "what is a margin call",
    "margin call in forex",
    "forex margin call",
    "margin call explained",
    "how does a margin call work",
    "margin level formula",
    "how to calculate margin level",
    "margin call vs stop out",
    "stop out level",
    "forex margin closeout",
    "forced liquidation trading",
    "equity vs balance",
    "used margin",
    "free margin",
    "maintenance margin",
    "margin requirement",
    "how to avoid a margin call",
    "what happens after a margin call",
    "leveraged trading risk",
    "CFD margin call",
    "account equity trading",
    "margin closeout percentage",
  ],
};

const tableOfContents = [
  { id: "definition", label: "What Is a Margin Call?" },
  { id: "how-it-works", label: "How It Happens" },
  { id: "example", label: "Margin Call Example" },
  { id: "margin-level", label: "Margin-Level Stages" },
  { id: "stop-out", label: "Margin Call vs Stop Out" },
  { id: "avoid", label: "How to Avoid It" },
  { id: "faq", label: "FAQs" },
];

const marginLevelStages = [
  {
    title: "Healthy Margin Level",
    subtitle: "Healthy Margin",
    description:
      "Account equity remains comfortably above the margin used to support open positions, leaving more free margin available to absorb normal market fluctuations.",
    points: [
      "More free margin remains available.",
      "Greater distance from the broker's warning level.",
      "More flexibility when managing open positions.",
    ],
    badge: "More stable",
  },
  {
    title: "Margin Warning Zone",
    subtitle: "Margin Warning",
    description:
      "Unrealised losses have reduced equity and the margin level is approaching the broker's margin-call threshold, making the account more sensitive to further losses.",
    points: [
      "Free margin has fallen significantly.",
      "Additional adverse movement has a larger impact.",
      "Exposure may need to be reduced promptly.",
    ],
    badge: "Monitor closely",
  },
  {
    title: "Stop-Out Risk Zone",
    subtitle: "Stop-Out Risk",
    description:
      "The margin level has reached a critical threshold at which the broker may begin automatically closing positions to reduce used margin and account exposure.",
    points: [
      "Forced position closure may begin.",
      "The trader may lose control over exit timing.",
      "Several positions may be closed if required.",
    ],
    badge: "Critical risk",
  },
];

const marginCallFactors = [
  {
    icon: "📉",
    title: "Growing Unrealised Losses",
    description:
      "Open losses reduce account equity in real time. As equity falls while used margin remains committed, the margin level moves closer to the broker's warning and closeout thresholds.",
  },
  {
    icon: "📦",
    title: "Oversized Positions",
    description:
      "A position that is too large for the account increases the monetary effect of every pip or price movement, allowing free margin to disappear quickly.",
  },
  {
    icon: "⚙️",
    title: "Excessive Effective Leverage",
    description:
      "Leverage allows a trader to control greater market exposure with less initial capital. The larger the exposure relative to equity, the faster adverse moves can damage the margin level.",
  },
  {
    icon: "🌪️",
    title: "Volatility, Gaps and Slippage",
    description:
      "Fast markets, gaps and limited liquidity can produce losses beyond the level originally expected, particularly when closing orders fill at a different price.",
  },
];

const commonMistakes = [
  {
    title: "Watching Balance Instead of Equity",
    description:
      "Account balance excludes the current result of open trades, while equity changes with unrealised profit and loss and is central to margin calculations.",
  },
  {
    title: "Stacking Correlated Positions",
    description:
      "Several trades may appear separate while creating nearly identical market exposure, causing losses to build across the account at the same time.",
  },
  {
    title: "Trading Without a Defined Exit",
    description:
      "Allowing a losing position to remain open without a risk limit can reduce equity until the broker's margin-call or stop-out level is reached.",
  },
  {
    title: "Adding Funds Without Reducing Risk",
    description:
      "Depositing more money may improve the margin level temporarily, but it does not correct oversized positions or an uncontrolled exposure problem.",
  },
];

const faqItems = [
  {
    question: "What is a margin call in trading?",
    answer:
      "A margin call is a warning or account status triggered when equity falls relative to the margin required to maintain open leveraged positions. It indicates that the account may not have enough available funds to absorb further losses.",
  },
  {
    question: "How is margin level calculated?",
    answer:
      "Margin level is commonly calculated by dividing account equity by used margin and multiplying the result by 100. The percentage falls when equity decreases or when additional positions increase used margin.",
  },
  {
    question: "Does a margin call immediately close my trades?",
    answer:
      "Not necessarily. A margin call is often a warning stage. Automatic position closure normally begins at a separate stop-out or margin-closeout threshold defined by the broker.",
  },
  {
    question: "What is the difference between margin call and stop out?",
    answer:
      "A margin call warns that the account's margin level has become too low. Stop out is the point at which the trading platform may begin closing positions automatically to reduce used margin.",
  },
  {
    question: "What happens when a forex account reaches stop out?",
    answer:
      "The broker's system may close one or more open positions automatically. The order in which positions are closed depends on the broker's policy, platform and account conditions.",
  },
  {
    question: "Can adding money prevent a margin call?",
    answer:
      "Adding funds can increase equity and free margin, but it may only delay the problem when positions remain too large or losses continue. Reducing exposure may also be necessary.",
  },
  {
    question: "What margin-call percentage do brokers use?",
    answer:
      "There is no universal percentage. Margin-call and stop-out thresholds vary by broker, platform, regulation, product and account type, so traders should review the exact account specifications.",
  },
  {
    question: "Can my balance be positive while my account is on margin call?",
    answer:
      "Yes. Balance does not include unrealised losses from open positions. Equity does, so a positive balance can exist alongside very low equity and a dangerous margin level.",
  },
];

const relatedGuides = [
  {
    title: "What Is Margin?",
    description:
      "Understand used margin, free margin and margin level in a leveraged trading account.",
    href: "/en/learn-trading/margin",
  },
  {
    title: "What Is Leverage?",
    description:
      "Learn how leverage changes market exposure and increases sensitivity to account losses.",
    href: "/en/learn-trading/leverage",
  },
  {
    title: "What Is a Stop Loss?",
    description:
      "Learn how a predefined exit may help control losses before margin becomes critical.",
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
      name: "Margin Call",
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
      name: "Margin call",
    },
    {
      "@type": "Thing",
      name: "Forex margin call",
    },
    {
      "@type": "Thing",
      name: "Margin level",
    },
    {
      "@type": "Thing",
      name: "Stop out",
    },
    {
      "@type": "Thing",
      name: "Margin closeout",
    },
    {
      "@type": "Thing",
      name: "Account equity",
    },
    {
      "@type": "Thing",
      name: "Leveraged trading risk",
    },
  ],

  keywords: [
    "margin call",
    "forex margin call",
    "margin level",
    "stop out",
    "margin closeout",
    "used margin",
    "free margin",
    "account equity",
    "forced liquidation",
    "leveraged trading",
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

export default function MarginCallPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="margin-call-en-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="margin-call-en-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="margin-call-en-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="margin-call-en-faq-schema"
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
            Margin Call
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-rose-100/60 blur-3xl" />

        <div className="absolute bottom-[-140px] right-[-80px] h-[320px] w-[320px] rounded-full bg-amber-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                Leveraged Trading Risk Guide
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                11-minute read
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.25] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.15]">
              What Is a Margin Call?

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.3] text-slate-700 sm:block lg:text-[34px]">
                Margin Level, Stop Out and Forced Liquidation Explained
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              A margin call occurs when account equity falls relative to the
              margin required to maintain open leveraged positions. This guide
              explains the margin-level formula, the difference between a
              margin call and stop out, how open losses can trigger forced
              liquidation, and how traders can reduce margin-closeout risk.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                Start the Guide
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
                Margin-level formula
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Detailed account example
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                Risk-reduction steps
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Account approaching a warning level
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    Margin Level
                  </h2>
                </div>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700">
                  Margin Warning
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
                    Account equity
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $1,000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    EQUITY
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-amber-700 sm:min-h-0 sm:text-xs">
                    Used margin
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $800
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    USED MARGIN
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-rose-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-rose-600">
                    Current margin level
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    125%
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  Additional losses may push the account into a critical zone
                </p>

                <p className="mt-1 text-2xl font-black">
                  Limited Free Margin
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
                eyebrow="Margin Call Meaning"
                title="What Does a Margin Call Mean in a Trading Account?"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  A margin call occurs when the equity in a leveraged trading
                  account becomes too low relative to the margin committed to
                  open positions. It is commonly caused by growing unrealised
                  losses, excessive position size or several trades consuming
                  too much available margin.
                </p>

                <p>
                  A margin call is not based on account balance alone. Brokers
                  monitor equity, which includes the current profit or loss of
                  all open positions. An account can therefore show a positive
                  balance while its equity and margin level have fallen into a
                  dangerous range.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  In simple terms, a margin call warns that open losses have
                  consumed a large part of the account&apos;s capacity to
                  maintain its current positions. Further losses may move the
                  account toward automatic closeout.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Equity"
                  title="Account Equity"
                  description="Balance adjusted by the unrealised profit or loss of all open positions."
                />

                <MiniDefinition
                  label="Used Margin"
                  title="Used Margin"
                  description="The amount currently committed to maintaining leveraged positions."
                />

                <MiniDefinition
                  label="Margin Level"
                  title="Margin Level"
                  description="The percentage relationship between equity and used margin."
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
                eyebrow="Margin Calculation"
                title="How Does Falling Equity Trigger a Margin Call?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Trading platforms monitor equity and used margin continuously.
                When open positions lose value, account equity declines while
                margin remains allocated to those trades. The margin-level
                percentage therefore falls until it reaches the warning
                threshold specified by the broker.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Margin Level = Equity ÷ Used Margin × 100
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Account equity"
                    value="$1,000"
                    sublabel="EQUITY"
                  />

                  <CalculationBox
                    label="Used margin"
                    value="$800"
                    sublabel="USED MARGIN"
                  />

                  <CalculationBox
                    label="Margin level"
                    value="125%"
                    sublabel="MARGIN LEVEL"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  How the percentage deteriorates
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="Open positions require $800 of used margin."
                  />

                  <Step
                    number="2"
                    text="Unrealised losses reduce account equity to $1,000."
                  />

                  <Step
                    number="3"
                    text="The margin level falls to 125%, potentially approaching the broker's warning threshold."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    Margin-call thresholds are not identical across brokers
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  One account may enter a warning stage at 100%, while another
                  broker or platform may use a different calculation or
                  threshold. Stop-out rules can also vary by account,
                  jurisdiction and product.
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
                eyebrow="Margin Call Example"
                title="How Can Unrealised Losses Push an Account Toward Stop Out?"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                Assume an account has a balance of $5,000 and several open
                positions requiring $2,000 in used margin. After the market
                moves against those trades, unrealised losses increase to
                $3,000.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="Account balance"
                  value="$5,000"
                />

                <StatCard
                  label="Unrealised loss"
                  value="-$3,000"
                />

                <StatCard
                  label="Account equity"
                  value="$2,000"
                />

                <StatCard
                  label="Used margin"
                  value="$2,000"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Calculating the margin level
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Account equity
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $2,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      $5,000 − $3,000
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      Used margin
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $2,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      OPEN POSITIONS
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      Margin level
                    </p>

                    <p className="mt-2 text-xl font-black text-rose-600">
                      100%
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      EXAMPLE WARNING ZONE
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
                    Further losses may trigger automatic position closure
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  In this educational example, assume the broker uses a 100%
                  warning level and a 50% stop-out level. The account has not
                  necessarily reached forced liquidation at 100%, but continued
                  losses would reduce equity and push the margin level closer
                  to the closeout threshold.
                </p>
              </div>
            </section>
                        {/* Margin level stages */}
            <section
              id="margin-level"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="Margin-Level Stages"
                title="How Does an Account Move from Healthy Margin to Stop-Out Risk?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Margin level changes continuously as open positions gain or
                lose value. When equity remains comfortably above used margin,
                the account has more room to absorb normal volatility. As
                unrealised losses increase, the account may move into a warning
                zone and eventually reach the broker&apos;s stop-out threshold.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {marginLevelStages.map((stage, index) => (
                  <details
                    key={stage.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            {stage.title}
                          </h3>

                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                            {stage.badge}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {stage.subtitle}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {stage.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {stage.points.map((point) => (
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
                {marginLevelStages.map((stage) => (
                  <div
                    key={stage.title}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
                        {stage.badge}
                      </span>

                      <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
                        {stage.subtitle}
                      </span>
                    </div>

                    <div className="min-h-[82px] pt-4">
                      <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:text-[19px]">
                        {stage.title}
                      </h3>
                    </div>

                    <div className="pb-5 pt-2">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {stage.description}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4">
                      {stage.points.map((point) => (
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
                    Account Condition
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Healthy Margin
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Margin Warning
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Stop-Out Risk
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <MarginStageComparisonRow
                    title="Account equity"
                    healthy="Comfortably higher"
                    warning="Falling"
                    danger="Critically low"
                  />

                  <MarginStageComparisonRow
                    title="Free margin"
                    healthy="Available"
                    warning="Limited"
                    danger="Very limited"
                  />

                  <MarginStageComparisonRow
                    title="Position status"
                    healthy="Normal"
                    warning="Under pressure"
                    danger="Automatic closure possible"
                  />

                  <MarginStageComparisonRow
                    title="Suggested response"
                    healthy="Continue monitoring"
                    warning="Reduce exposure"
                    danger="Immediate action"
                  />
                </div>
              </div>
            </section>

            {/* Margin Call vs Stop Out */}
            <section
              id="stop-out"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="Margin Closeout"
                title="What Is the Difference Between a Margin Call and Stop Out?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                A margin call and a stop out are related but separate stages.
                A margin call generally indicates that the account&apos;s
                margin level has fallen into a warning zone. Stop out is the
                lower threshold at which the broker may begin automatically
                closing positions to reduce used margin and limit further
                account deterioration.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ⚠️
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      Margin Call
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "Signals that the margin level has become too low.",
                      "Open positions may remain active.",
                      "New positions may be restricted on some accounts.",
                      "Allows the trader time to reduce risk or add funds.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700"
                      >
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] text-amber-700">
                          !
                        </span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ✕
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      Stop Out
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "Triggers automatic position closeout.",
                      "The platform controls which positions are closed.",
                      "Used margin is reduced after each closure.",
                      "Additional positions may close if the level stays low.",
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

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  Example Only: Margin Warning at 100% and Stop Out at 50%
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="Warning threshold"
                    value="100%"
                    sublabel="MARGIN CALL"
                  />

                  <CalculationBox
                    label="Closeout threshold"
                    value="50%"
                    sublabel="STOP OUT"
                  />

                  <CalculationBox
                    label="Distance between levels"
                    value="50 points"
                    sublabel="PERCENTAGE POINTS"
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
                    Closing one position may not end the stop-out process
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Closing a position reduces used margin and may improve the
                  margin level. However, if equity remains too low, the platform
                  may continue closing additional positions until the account
                  moves back above the broker&apos;s required threshold.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Which position is closed first?
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  The closeout order depends on the broker&apos;s rules and
                  trading platform. Some systems may close the largest losing
                  position first, while others may use a different priority.
                  Traders should review the broker&apos;s exact margin-closeout
                  policy rather than assume a universal process.
                </p>
              </div>
            </section>

            {/* How to avoid */}
            <section
              id="avoid"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="Account Protection"
                title="How Can Traders Reduce the Risk of a Margin Call?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Margin-call prevention starts before the trade is opened.
                Position size, total account exposure, stop-loss distance and
                effective leverage should be planned together. Waiting until
                the margin level is already critical leaves fewer choices and
                may force decisions during volatile market conditions.
              </p>

              {/* Mobile factors */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {marginCallFactors.map((factor) => (
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
                {marginCallFactors.map((factor) => (
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

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  Practical Steps to Reduce Margin-Closeout Risk
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Define a maximum account risk for each trade.",
                    "Use a lot size that fits the account balance and stop loss.",
                    "Set an exit level before opening the position.",
                    "Avoid stacking several highly correlated trades.",
                    "Monitor equity, free margin and margin level together.",
                    "Review the broker's margin-call and stop-out thresholds.",
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
                    Use the Margin Calculator
                  </Link>

                  <Link
                    href="/en/tools/risk-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Calculate Trade Risk
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Is depositing more money always the best solution?
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Adding funds increases equity and free margin, but it may only
                  delay the problem if open positions remain oversized or
                  continue moving against the account. Reducing exposure may be
                  more effective than committing additional capital to an
                  uncontrolled position.
                </p>
              </div>
            </section>

            {/* Common mistakes */}
            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8">
              <SectionHeading
                number="07"
                eyebrow="Margin-Management Errors"
                title="What Mistakes Can Push an Account Toward a Margin Call?"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                Margin calls are often caused by several risk-management
                failures rather than one isolated market move. Oversized
                positions, correlated exposure, growing unrealised losses and
                poor monitoring can combine to reduce equity much faster than
                expected.
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
                    Do not wait for forced liquidation before reducing risk
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Once stop out begins, the trader may lose control over the
                  timing and order of position closures. A structured plan
                  should define when exposure will be reduced before the
                  account reaches the broker&apos;s automatic closeout level.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  Why monitoring balance alone is dangerous
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Balance shows the result of closed transactions, while equity
                  includes the current result of open trades. A trader may see
                  a strong balance and underestimate risk even though
                  unrealised losses have already reduced equity and free margin
                  substantially.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section
              id="faq"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="08"
                eyebrow="Trader Questions"
                title="Margin Call and Stop-Out Frequently Asked Questions"
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
                  Trading Concepts Related to Margin Calls
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  Understanding margin, leverage and stop-loss orders can help
                  you control account exposure before unrealised losses push
                  the margin level into a critical range.
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
                Estimate Required Margin
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                Enter the instrument, position size and leverage to estimate
                how much margin may be required before opening a leveraged
                trade.
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
              Your Next Step
            </span>

            <h2 className="mx-auto mt-3 max-w-3xl text-[24px] font-black leading-[1.35] sm:mt-4 sm:text-3xl sm:leading-tight">
              Monitor Margin Level Before the Account Reaches a Critical Zone
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              Do not wait for a margin warning. Track equity, free margin and
              total exposure, then use realistic position sizes and defined
              exits to reduce the risk of automatic closeout.
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
                href="/en/learn-trading/margin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                Margin Guide
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

function MarginStageComparisonRow({
  title,
  healthy,
  warning,
  danger,
}: {
  title: string;
  healthy: string;
  warning: string;
  danger: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {healthy}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {warning}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {danger}
      </div>
    </div>
  );
}