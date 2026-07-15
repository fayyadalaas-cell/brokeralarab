import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const BASE_URL = "https://brokeralarab.com";

export const metadata: Metadata = {
  title: "Learn Trading for Beginners | Free Trading Education Guide",
  description:
    "Learn trading from scratch with beginner-friendly lessons on forex, risk management, economic indicators, trading calculators, and how to choose a trusted broker.",
  alternates: {
    canonical: `${BASE_URL}/en/learn-trading`,
    languages: {
      ar: `${BASE_URL}/learn-trading`,
      en: `${BASE_URL}/en/learn-trading`,
      "x-default": `${BASE_URL}/en/learn-trading`,
    },
  },
};

const mainLessons = [
  {
    title: "How to Start Trading from Scratch",
    desc: "A beginner-friendly guide that explains how trading works, what forex and CFDs mean, how spreads and leverage affect your costs, and what to check before opening a live account.",
    href: "/en/learn-trading/how-to-start-trading-from-zero",
    badge: "Start here",
    icon: "🚀",
  },
  {
    title: "Economic Indicators and How They Move Markets",
    desc: "Learn how interest rates, inflation, jobs data, GDP, central bank decisions, and major news events can affect forex, gold, stocks, and global markets.",
    href: "/en/learn-trading/economic-indicators",
    badge: "Market basics",
    icon: "📊",
  },
];

const learningTracks = [
  {
    title: "Step One",
    name: "Understand Trading Basics",
    desc: "Learn what forex, CFDs, gold trading, spreads, margin, leverage, order types, and trading platforms actually mean before placing real trades.",
  },
  {
    title: "Step Two",
    name: "Build Risk Management Habits",
    desc: "Understand position sizing, stop-loss orders, risk per trade, maximum drawdown, and why protecting capital matters more than chasing quick profits.",
  },
  {
    title: "Step Three",
    name: "Follow Market Drivers",
    desc: "Learn how economic indicators, interest rate decisions, inflation reports, and employment data can create volatility in currencies and gold.",
  },
  {
    title: "Step Four",
    name: "Choose the Right Broker",
    desc: "Compare regulation, fees, spreads, account types, withdrawals, platforms, and support before opening a real trading account.",
  },
];

const tradingTerms = [
  [
    "Spread",
    "The spread is the difference between the bid and ask price on a trading platform. Lower spreads generally reduce trading costs, making them especially important for active traders, scalpers, and day traders.",
    "/en/learn-trading/spread",
  ],
  [
    "Leverage",
    "Leverage lets traders control a larger market position with a relatively small amount of capital. While it can amplify potential returns, it also increases risk and should always be combined with proper risk management.",
    "/en/learn-trading/leverage",
  ],
  [
    "Margin",
    "Margin is the amount of capital your broker temporarily reserves to keep a leveraged trade open. Understanding margin requirements helps you avoid margin calls and manage your account more effectively.",
    "/en/learn-trading/margin",
  ],
  [
    "Lot Size",
    "Lot size represents the trading volume of a forex, gold, or CFD position. Choosing the correct lot size is essential for controlling risk and managing position exposure.",
    "/en/learn-trading/lot",
  ],
  [
    "Stop Loss",
    "A stop-loss order automatically closes a trade when the market reaches a predefined loss level. It is one of the most effective tools for protecting trading capital and managing downside risk.",
    "/en/learn-trading/stop-loss",
  ],
  [
    "Take Profit",
    "A take-profit order automatically closes a trade after the market reaches your planned profit target. It helps traders lock in gains and follow a disciplined trading strategy.",
    "/en/learn-trading/take-profit",
  ],
 [
  "Hedging",
  "Hedging helps reduce market exposure by opening offsetting positions, making it a common risk-management strategy in forex and CFD trading.",
  "/en/learn-trading/hedging",
],
  [
    "Liquidity",
    "Liquidity describes how easily an asset can be bought or sold near the current market price. Higher liquidity generally supports tighter spreads, lower slippage, and more efficient order execution.",
    "/en/learn-trading/liquidity",
  ],
  [
    "Margin Call",
    "A margin call occurs when account equity falls too low relative to the margin required for open positions. Understanding margin level and stop-out rules can help traders reduce the risk of forced liquidation.",
    "/en/learn-trading/margin-call",
  ],
];
const siteSections = [
  ["Broker Reviews", "Read detailed broker reviews before opening an account.", "/en/brokers"],
  ["Broker Comparison", "Compare two brokers side by side by fees, platforms, accounts, and regulation.", "/en/compare"],
  ["Best Brokers", "Explore broker rankings by category, market, and trader needs.", "/en/best-brokers"],
  ["Regulation Guide", "Understand regulators such as FCA, ASIC, CySEC, DFSA, and other licensing bodies.", "/en/licenses"],
  ["Trading Tools", "Use free calculators for risk, margin, lot size, profit, loss, and more.", "/en/tools"],
  ["Learn Trading", "Browse beginner-friendly trading guides and educational resources.", "/en/learn-trading"],
];

const quickTools = [
  {
    title: "Risk Calculator",
    desc: "Calculate how much you are risking before entering a trade.",
    href: "/en/tools/risk-calculator",
  },
  {
    title: "Lot Size Calculator",
    desc: "Find the position size that fits your account and risk level.",
    href: "/en/tools/lot-size-calculator",
  },
  {
    title: "Margin Calculator",
    desc: "Estimate the margin required based on your leverage and trade size.",
    href: "/en/tools/margin-calculator",
  },
  {
    title: "Profit Calculator",
    desc: "Estimate potential profit or loss before placing a trade.",
    href: "/en/tools/profit-calculator",
  },
  {
    title: "Drawdown Calculator",
    desc: "Understand how much recovery is needed after a trading loss.",
    href: "/en/tools/drawdown-calculator",
  },
  {
    title: "Compound Calculator",
    desc: "See how account growth can change over time with compounding.",
    href: "/en/tools/compound-calculator",
  },
];

const faqs = [
  {
    q: "How do I start learning trading as a beginner?",
    a: "Start with the basics of how markets work, then learn risk management, practice on a demo account, and only consider live trading when you understand the risks.",
  },
  {
    q: "Do I need a lot of money to start trading?",
    a: "No. What matters more is starting with an amount you can afford to lose, using proper risk management, and avoiding oversized positions.",
  },
  {
    q: "How long does it take to learn trading?",
    a: "It depends on your consistency. Learning the basics can be quick, but building discipline, risk management, and market understanding takes time and practice.",
  },
  {
    q: "Is a demo account useful for beginners?",
    a: "Yes. A demo account helps you understand platforms and order execution without financial risk, although it does not fully reproduce the emotions of live trading.",
  },
  {
    q: "What is the biggest mistake beginner traders make?",
    a: "The most common mistake is trading with high leverage, no plan, no stop loss, and unrealistic expectations about fast profits.",
  },
  {
    q: "How do I choose a trusted trading broker?",
    a: "Check the broker’s regulation, legal entity, fees, spreads, withdrawal process, platforms, customer support, and independent reviews before opening an account.",
  },
];

function InternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </Link>
  );
}

export default function LearnTradingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/en/learn-trading#faq`,
    url: `${BASE_URL}/en/learn-trading`,
    inLanguage: "en",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/en/learn-trading#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/en`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn Trading",
        item: `${BASE_URL}/en/learn-trading`,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/en/learn-trading#collection`,
    name: "Learn Trading Guide",
    url: `${BASE_URL}/en/learn-trading`,
    inLanguage: "en",
    description:
      "A beginner-friendly trading education hub by Broker Alarab covering trading basics, forex education, risk management, economic indicators, trading calculators, and how to choose a trusted broker.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "Broker Alarab",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Broker Alarab",
      url: BASE_URL,
    },
    about: [
      "Learn trading",
      "Forex trading for beginners",
      "Trading basics",
      "Risk management",
      "Economic indicators",
      "Trading tools",
      "Broker regulation",
      "How to choose a broker",
    ],
    hasPart: mainLessons.map((lesson) => ({
      "@type": "Article",
      headline: lesson.title,
      url: `${BASE_URL}${lesson.href}`,
      description: lesson.desc,
      inLanguage: "en",
    })),
  };

  return (
    <>
      <Script
        id="learn-trading-collection-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Script
        id="learn-trading-breadcrumb-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Script
        id="learn-trading-faq-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main
        dir="ltr"
        className="mx-auto w-full max-w-[1520px] px-3 pt-5 pb-0 text-left sm:px-4 md:pt-6"
      >
        <section className="mb-4 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
            {[
              ["✓", "Beginner-friendly content"],
              ["📊", "Simple market explanations"],
              ["🛡", "Risk-first approach"],
              ["🔄", "Practical trading tools"],
            ].map(([icon, text]) => (
              <div
                key={text}
                className="flex items-center justify-center gap-2 px-3 py-3 text-center"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-black text-brand-600">
                  {icon}
                </span>
                <span className="text-[11px] font-black text-slate-800 md:text-sm">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm md:rounded-[34px]">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-500 via-brand-500 to-cyan-400" />

          <div className="grid gap-6 p-5 md:p-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
                Learn Trading Guide
              </div>

              <h1 className="max-w-3xl text-[38px] font-black leading-tight text-slate-950 md:text-[54px]">
                Learn Trading
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-600 md:text-lg md:leading-9">
                Start your trading journey with beginner-friendly lessons, free
                trading calculators, and practical resources that help you
                understand markets, manage risk, and choose a trusted broker
                before opening a live account.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <InternalLink
                  href="/en/learn-trading/how-to-start-trading-from-zero"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 text-sm font-black text-white shadow-lg shadow-brand-100 transition hover:scale-[1.01] hover:shadow-xl md:text-base"
                >
                  Start from Scratch
                </InternalLink>

                <InternalLink
                  href="/en/tools"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-900 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 md:text-base"
                >
                  Use Trading Tools
                </InternalLink>
              </div>
            </div>

            <aside className="rounded-[26px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
              <div className="mb-3 text-sm font-black text-slate-950">
                Trading Learning Path
              </div>

              <div className="space-y-3">
                {[
                  "Understand the basics",
                  "Learn risk management",
                  "Follow market news",
                  "Compare brokers",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-black text-brand-600">
                      {i + 1}
                    </span>
                    <span className="text-sm font-black text-slate-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          {mainLessons.map((lesson) => (
            <InternalLink
              key={lesson.href}
              href={lesson.href}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              <div className="h-1.5 bg-gradient-to-r from-brand-500 to-brand-400" />

              <div className="p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-black text-brand-600">
                    {lesson.badge}
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl transition group-hover:bg-brand-500 group-hover:text-white">
                    {lesson.icon}
                  </span>
                </div>

                <h2 className="text-[22px] font-black leading-8 text-slate-950 md:text-[26px]">
                  {lesson.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                  {lesson.desc}
                </p>

                <div className="mt-5 inline-flex rounded-xl bg-slate-50 px-4 py-2 text-sm font-black text-brand-600 transition group-hover:bg-brand-50">
                  Read the guide →
                </div>
              </div>
            </InternalLink>
          ))}
        </section>

        <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
                Learning Path
              </div>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                What Should You Learn First?
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Before opening a live account, follow these steps to understand
              markets, risk, and broker selection more clearly.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {learningTracks.map((item, i) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-white hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-brand-600">
                    {item.title}
                  </span>
                  <span className="text-lg font-black text-slate-300">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-950">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-5">
              <div className="mb-2 inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-700">
                Practical Tools
              </div>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                Before Every Trade, Calculate It First
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                Good traders do not enter trades randomly. Use these tools to
                estimate risk, lot size, margin, profit, loss, and account
                drawdown before placing a trade.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {quickTools.map((tool) => (
                <InternalLink
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-md"
                >
                  <h3 className="text-lg font-black text-slate-950">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {tool.desc}
                  </p>
                  <span className="mt-3 inline-flex text-sm font-black text-brand-600">
                    Open tool →
                  </span>
                </InternalLink>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 shadow-sm md:p-6">
            <div className="mb-3 text-2xl">⚠️</div>
            <h2 className="text-xl font-black leading-8 text-slate-950">
              Beginner Risk Warning
            </h2>
            <p className="mt-3 text-sm leading-8 text-slate-700">
              Trading with leverage can lead to significant losses. Never trade
              with money you cannot afford to lose, and avoid random signals or
              promises of fast profits.
            </p>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-black text-slate-950">
                Before placing a trade, check:
              </h3>

              <div className="space-y-2">
                {[
                  "You know your risk per trade",
                  "You have set a stop loss",
                  "You calculated your lot size",
                  "You know why you are entering",
                  "You are not risking money you cannot afford to lose",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-700"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-black text-emerald-600">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <InternalLink
              href="/en/tools/risk-calculator"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-amber-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-amber-100"
            >
              Open Risk Calculator
            </InternalLink>
          </aside>
        </section>

        <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5">
            <div className="mb-2 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
              Trading Terms
            </div>
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Key Trading Terms Every Beginner Should Know
            </h2>
          </div>

         <div className="grid gap-3 md:grid-cols-3">
  {tradingTerms.map(([term, desc, href]) =>
    href ? (
      <Link
        key={term}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md"
      >
        <h3 className="text-lg font-black text-slate-950 transition group-hover:text-brand-600">
  {term}
</h3>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {desc}
        </p>

        <span className="mt-3 inline-flex text-sm font-black text-brand-600">
          Read the full guide →
        </span>
      </Link>
    ) : (
      <div
        key={term}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-white hover:shadow-md"
      >
        <h3 className="text-lg font-black text-slate-950">
          {term}
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {desc}
        </p>
      </div>
    )
  )}
</div>
        </section>

        <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5 text-center">
            <div className="mb-2 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
              Explore Broker Alarab
            </div>
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Take the Next Step
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {siteSections.map(([title, desc, href]) => (
              <InternalLink
                key={href + title}
                href={href}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lg"
              >
                <h3 className="text-lg font-black text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p>
                <span className="mt-3 inline-flex text-sm font-black text-brand-600">
                  View section →
                </span>
              </InternalLink>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5 text-center">
            <div className="mb-2 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
              FAQ
            </div>
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Frequently Asked Questions About Learning Trading
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                  <h3 className="text-sm font-black leading-7 text-slate-950 md:text-base">
                    {faq.q}
                  </h3>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[28px] border border-brand-200 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 p-6 text-center text-white shadow-xl md:p-8">
          <h2 className="text-2xl font-black md:text-3xl">
            Ready to Start Learning Trading?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-brand-50 md:text-base md:leading-8">
            Start with the beginner guide, then use trading calculators and
            compare brokers before opening a live trading account.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <InternalLink
              href="/en/learn-trading/how-to-start-trading-from-zero"
              className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-brand-600 shadow-md transition hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-lg"
            >
              Start Learning Now
            </InternalLink>

            <InternalLink
              href="/en/brokers"
              className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-white/30 bg-white/15 px-6 text-sm font-black text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/25"
            >
              Browse Broker Reviews
            </InternalLink>
          </div>
        </section>
      </main>
    </>
  );
}