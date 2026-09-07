import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Liquidity Sweep Trading Strategy: How to Trade Liquidity Sweeps",
  description:
    "Learn how to identify and trade liquidity sweeps, including buy-side and sell-side liquidity, liquidity grabs, confirmation, entries, stop loss, targets and risk management.",

  keywords: [
    "liquidity sweep",
    "liquidity sweep trading strategy",
    "liquidity sweep strategy",
    "liquidity sweep trading",
    "how to trade liquidity sweeps",
    "how to identify liquidity sweeps",
    "liquidity grab",
    "liquidity grab trading",
    "liquidity grab strategy",
    "liquidity sweep forex",
    "forex liquidity sweep",
    "buy side liquidity",
    "buy-side liquidity",
    "sell side liquidity",
    "sell-side liquidity",
    "BSL trading",
    "SSL trading",
    "stop hunt trading",
    "stop run trading",
    "liquidity raid",
    "smart money concepts",
    "SMC trading strategy",
    "ICT liquidity",
    "liquidity sweep ICT",
    "liquidity sweep SMC",
    "liquidity sweep vs liquidity grab",
    "liquidity sweep vs breakout",
    "equal highs liquidity",
    "equal lows liquidity",
    "previous day high liquidity",
    "previous day low liquidity",
    "PDH PDL trading",
    "market structure shift",
    "MSS trading",
    "change of character",
    "CHoCH trading",
    "fair value gap",
    "FVG trading",
    "order block trading",
  ],

  alternates: {
    canonical: "https://brokeralarab.com/en/strategies/liquidity-sweep",
    languages: {
      en: "https://brokeralarab.com/en/strategies/liquidity-sweep",
      ar: "https://brokeralarab.com/strategies/liquidity-sweep",
      "x-default":
        "https://brokeralarab.com/en/strategies/liquidity-sweep",
    },
  },

  openGraph: {
    type: "article",
    url: "https://brokeralarab.com/en/strategies/liquidity-sweep",
    title: "Liquidity Sweep Trading Strategy: How to Trade Liquidity Sweeps",
    description:
      "Learn how liquidity sweeps work, where liquidity forms, how to identify confirmation, and how traders plan entries, stop loss and targets.",
    siteName: "Broker Alarab",
  },

  twitter: {
    card: "summary_large_image",
    title: "Liquidity Sweep Trading Strategy: How to Trade Liquidity Sweeps",
    description:
      "Learn liquidity sweeps, buy-side and sell-side liquidity, confirmation, entries, stop loss and targets with practical trading examples.",
  },
};

/* =========================================================
   FAQ
========================================================= */

const faqItems = [
  {
    question: "What is a liquidity sweep in trading?",
    answer:
      "A liquidity sweep is a price move through an obvious high, low or other watched level followed by failure to hold beyond that level. In Smart Money Concepts and ICT-style analysis, traders often watch these moves around areas where stop orders and breakout orders may cluster.",
  },
  {
    question: "Is a liquidity sweep the same as a liquidity grab?",
    answer:
      "The terms liquidity sweep and liquidity grab are frequently used interchangeably. Some traders use liquidity grab for a quick single-level probe and liquidity sweep for a broader move through a liquidity area, but there is no universally accepted distinction. The exact definition should therefore be stated whenever the concept is used in a trading system.",
  },
  {
    question: "What is buy-side liquidity?",
    answer:
      "Buy-side liquidity, often abbreviated BSL, refers to potential clusters of buy orders above visible highs. These may include stop-loss orders from short positions and breakout buy orders waiting above resistance, swing highs or equal highs.",
  },
  {
    question: "What is sell-side liquidity?",
    answer:
      "Sell-side liquidity, often abbreviated SSL, refers to potential clusters of sell orders below visible lows. These may include stop-loss orders from long positions and breakout sell orders below support, swing lows or equal lows.",
  },
  {
    question: "What is the difference between a liquidity sweep and a breakout?",
    answer:
      "A sweep trades beyond a watched level but then fails to maintain acceptance beyond it, while a breakout generally shows sustained trading or continuation outside the old range. Traders often examine the close, follow-through, displacement and subsequent market structure before classifying the move.",
  },
  {
    question: "Does every liquidity sweep cause a reversal?",
    answer:
      "No. Price can trade through a liquidity level and continue in the same direction. A sweep should not be treated as an automatic reversal signal, which is why many traders wait for a reclaim, displacement, market structure shift or another confirmation before considering an entry.",
  },
  {
    question: "What confirms a liquidity sweep?",
    answer:
      "Definitions vary, but common confirmation criteria include price trading through a predefined liquidity level, returning back through that level, failing to sustain the breakout and then producing bearish or bullish displacement or a market structure shift in the opposite direction.",
  },
  {
    question: "Where do traders look for liquidity sweeps?",
    answer:
      "Common reference areas include previous swing highs and lows, equal highs and equal lows, range boundaries, Previous Day High and Low, session highs and lows, weekly extremes and other clearly visible price levels.",
  },
  {
    question: "Where should a stop loss go after a liquidity sweep?",
    answer:
      "One common structural approach is to place the invalidation beyond the extreme of the sweep. The exact distance depends on the setup, volatility, spread and trading rules. Position size should then be adjusted so the monetary risk remains controlled.",
  },
  {
    question: "Can liquidity sweeps be used in forex trading?",
    answer:
      "Yes. Liquidity sweep terminology is widely used by forex traders, particularly within Smart Money Concepts and ICT-style price-action communities. The same chart concept is also discussed in indices, futures, commodities and crypto markets.",
  },
];

/* =========================================================
   STRUCTURED DATA
========================================================= */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
  "Liquidity Sweep Trading Strategy: How to Trade Liquidity Sweeps",
  description:
    "A complete educational guide to liquidity sweep trading, liquidity grabs, buy-side and sell-side liquidity, false breakouts, market structure confirmation, entries, stops, targets and risk management.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://brokeralarab.com/en/strategies/liquidity-sweep",
  },
  author: {
    "@type": "Organization",
    name: "Broker Alarab",
    url: "https://brokeralarab.com/en",
  },
  publisher: {
    "@type": "Organization",
    name: "Broker Alarab",
    url: "https://brokeralarab.com/en",
  },
  inLanguage: "en",
  about: [
    "Liquidity Sweep",
    "Liquidity Grab",
    "Buy-Side Liquidity",
    "Sell-Side Liquidity",
    "Smart Money Concepts",
    "Forex Trading",
    "Market Structure",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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
      name: "Trading Strategies",
      item: "https://brokeralarab.com/en/strategies",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Liquidity Sweep Strategy",
      item:
        "https://brokeralarab.com/en/strategies/liquidity-sweep",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1E5BB8]">
        {children}
      </span>
    </div>
  );
}

function ImportantBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-[20px] border border-blue-200 bg-blue-50/50 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[13px] font-black text-[#1E5BB8] shadow-sm">
          i
        </span>

        <div>
          <h3 className="text-[14px] font-black leading-6 text-slate-900 sm:text-[15px]">
            {title}
          </h3>

          <div className="mt-2 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Candle({
  x,
  open,
  close,
  high,
  low,
  bullish = false,
  width = 24,
}: {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  bullish?: boolean;
  width?: number;
}) {
  const top = Math.min(open, close);
  const height = Math.max(Math.abs(close - open), 3);

  return (
    <g>
      <line
        x1={x}
        x2={x}
        y1={high}
        y2={low}
        stroke={bullish ? "#2563eb" : "#475569"}
        strokeWidth="2.5"
      />

      <rect
        x={x - width / 2}
        y={top}
        width={width}
        height={height}
        rx="2"
        fill={bullish ? "#ffffff" : "#475569"}
        stroke={bullish ? "#2563eb" : "#475569"}
        strokeWidth="2.5"
      />
    </g>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function LiquiditySweepStrategyPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <article className="space-y-6">

          {/* =================================================
              HERO
          ================================================= */}

          <header className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
            <div className="absolute -bottom-28 left-20 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />

            <div className="relative p-5 sm:p-8 lg:p-10">
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500 sm:text-[12px]"
              >
                <Link href="/en" className="transition hover:text-[#1E5BB8]">
                  Home
                </Link>

                <span>/</span>

                <Link
                  href="/en/strategies"
                  className="transition hover:text-[#1E5BB8]"
                >
                  Trading Strategies
                </Link>

                <span>/</span>

                <span className="text-slate-700">
                  Liquidity Sweep
                </span>
              </nav>

              <div className="mt-7 max-w-[1180px]">
                <div className="flex flex-wrap gap-2">
                  {[
                    "LIQUIDITY SWEEP",
                    "LIQUIDITY GRAB",
                    "SMART MONEY CONCEPTS",
                    "FOREX STRATEGY",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-black tracking-[0.1em] text-[#1E5BB8]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <h1 className="mt-5 max-w-[1100px] text-[31px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950 sm:text-[42px] lg:text-[52px]">
  Liquidity Sweep Trading Strategy:
  <span className="block text-[#1E5BB8]">
    How to Identify and Trade Liquidity Sweeps
  </span>
</h1>

                <p className="mt-6 max-w-[1080px] text-[15px] font-medium leading-8 text-slate-700 sm:text-[17px] sm:leading-9">
                  A <strong>liquidity sweep</strong> occurs when price trades
                  through a watched high, low or liquidity area and then fails
                  to sustain the move beyond it. Traders also use terms such as{" "}
                  <strong>liquidity grab</strong>, <strong>stop run</strong>,{" "}
                  <strong>liquidity raid</strong> and{" "}
                  <strong>stop hunt</strong> for closely related price
                  behaviour.
                </p>

                <p className="mt-4 max-w-[1080px] text-[14px] font-medium leading-8 text-slate-600 sm:text-[16px] sm:leading-9">
                  This guide explains how traders identify buy-side and
                  sell-side liquidity, distinguish a sweep from a genuine
                  breakout, use reclaim and market structure for confirmation,
                  plan entries around FVGs and order blocks, place structural
                  invalidation levels, select targets and backtest the setup
                  without relying on hindsight.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#what-is-liquidity-sweep"
                    className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-5 py-3 text-[13px] font-black text-white transition hover:bg-[#1d4ed8]"
                  >
                    Learn the Strategy
                  </a>

                  <a
                    href="#liquidity-sweep-checklist"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-black text-slate-700 transition hover:border-blue-200 hover:text-[#1E5BB8]"
                  >
                    Trading Checklist
                  </a>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["BSL", "Buy-Side Liquidity", "Usually watched above visible highs."],
                  ["SSL", "Sell-Side Liquidity", "Usually watched below visible lows."],
                  ["MSS", "Market Structure Shift", "A common post-sweep confirmation."],
                  ["FVG", "Fair Value Gap", "A potential retracement entry area."],
                ].map(([short, title, text]) => (
                  <div
                    key={short}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {short}
                      </span>

                      <h2 className="text-[14px] font-black text-slate-900">
                        {title}
                      </h2>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </header>

          {/* =================================================
              TABLE OF CONTENTS
          ================================================= */}

          <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <SectionLabel>Complete Guide</SectionLabel>

                <h2 className="text-[21px] font-black tracking-[-0.02em] text-slate-950 sm:text-[24px]">
                  Liquidity Sweep Strategy: Table of Contents
                </h2>
              </div>

              <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-500 sm:inline-flex">
                BEGINNER → ADVANCED
              </span>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["01", "What Is a Liquidity Sweep?", "#what-is-liquidity-sweep"],
                ["02", "How Liquidity Forms", "#how-liquidity-forms"],
                ["03", "Buy-Side vs Sell-Side Liquidity", "#buy-side-sell-side-liquidity"],
                ["04", "Where Liquidity Sits", "#where-liquidity-sits"],
                ["05", "Liquidity Sweep vs Grab", "#liquidity-sweep-vs-grab"],
                ["06", "Sweep vs Breakout", "#liquidity-sweep-vs-breakout"],
                ["07", "Bullish Liquidity Sweep", "#bullish-liquidity-sweep"],
                ["08", "Bearish Liquidity Sweep", "#bearish-liquidity-sweep"],
                ["09", "Reclaim & Confirmation", "#liquidity-sweep-confirmation"],
                ["10", "MSS, CHoCH & BOS", "#liquidity-sweep-market-structure"],
                ["11", "FVG & Order Block Entries", "#liquidity-sweep-fvg-order-block"],
                ["12", "Step-by-Step Strategy", "#liquidity-sweep-strategy-steps"],
              ].map(([n, label, href]) => (
                <a
                  key={n}
                  href={href}
                  className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50/50 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                    {n}
                  </span>

                  <span className="text-[12px] font-bold leading-6 text-slate-700 sm:text-[13px]">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* =================================================
              01 — WHAT IS A LIQUIDITY SWEEP?
          ================================================= */}

          <section
            id="what-is-liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — Liquidity Sweep Explained</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                What Is a Liquidity Sweep in Trading?
              </h2>

              <div className="mt-5 max-w-[1160px] space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                <p>
                  A <strong>liquidity sweep</strong> is a price-action event in
                  which the market trades beyond a visible level—such as a
                  previous swing high, swing low, equal highs or equal
                  lows—and then fails to maintain the move beyond that level.
                  The level is effectively breached and then rejected or
                  reclaimed.
                </p>

                <p>
                  In <strong>Smart Money Concepts (SMC)</strong> and
                  ICT-style trading, traders often describe the orders above
                  highs as <strong>buy-side liquidity (BSL)</strong> and the
                  orders below lows as{" "}
                  <strong>sell-side liquidity (SSL)</strong>. A sweep above a
                  high therefore takes buy-side liquidity, while a move below
                  a low takes sell-side liquidity.
                </p>

                <p>
                  The important part is not simply that price crossed a line.
                  Traders usually focus on <strong>what happens after the
                  level is breached</strong>. Does price remain outside the
                  range and continue? Or does it quickly return, reclaim the
                  level and produce displacement in the opposite direction?
                  That distinction is central to separating a potential
                  liquidity sweep from a normal breakout.
                </p>
              </div>

              <ImportantBox title="A wick alone does not prove a liquidity sweep">
                A long wick can appear for many reasons. A more disciplined
                approach is to mark the potential liquidity level before price
                reaches it, then evaluate the breach, reclaim, follow-through
                and market structure. This reduces the temptation to label
                every reversal wick as a sweep after the fact.
              </ImportantBox>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["1", "Liquidity Pool", "A visible level is identified before the move."],
                  ["2", "Price Runs the Level", "Price trades through the high or low."],
                  ["3", "Failure to Hold", "The move cannot sustain acceptance beyond it."],
                  ["4", "Confirmation", "Traders assess reclaim, displacement or structure."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              02 — HOW LIQUIDITY FORMS
          ================================================= */}

          <section
            id="how-liquidity-forms"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — Understanding Liquidity</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                How Does Liquidity Form Around Highs and Lows?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                In this trading context, the word{" "}
                <strong>liquidity</strong> does not simply mean how easy an
                asset is to buy or sell. SMC traders use the term more
                specifically to describe chart areas where multiple orders may
                be concentrated around visible price levels.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <span className="text-[10px] font-black tracking-[0.12em] text-[#1E5BB8]">
                    ABOVE A HIGH
                  </span>

                  <h3 className="mt-2 text-[17px] font-black text-slate-950">
                    Why Orders May Cluster Above Highs
                  </h3>

                  <div className="mt-4 space-y-3 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
                    <p>
                      Traders who are short may place stop-loss orders above a
                      previous high.
                    </p>

                    <p>
                      Breakout traders may place buy-stop entries above
                      resistance or a visible swing high.
                    </p>

                    <p>
                      When many traders reference the same visible level, the
                      area above it can become an important point of interest.
                    </p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <span className="text-[10px] font-black tracking-[0.12em] text-slate-500">
                    BELOW A LOW
                  </span>

                  <h3 className="mt-2 text-[17px] font-black text-slate-950">
                    Why Orders May Cluster Below Lows
                  </h3>

                  <div className="mt-4 space-y-3 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
                    <p>
                      Traders who are long may protect positions with stops
                      below a previous swing low.
                    </p>

                    <p>
                      Breakdown traders may place sell-stop orders below
                      support or a visible low.
                    </p>

                    <p>
                      This makes the area beneath a widely watched low a
                      potential sell-side liquidity reference.
                    </p>
                  </div>
                </div>
              </div>

              <ImportantBox title="The chart does not reveal who placed every order">
                Traders can observe price behaviour around highs and lows, but
                a retail candlestick chart does not identify the participant
                behind every transaction or prove that an institution
                deliberately engineered a stop hunt. For that reason, this
                guide treats liquidity sweeps as a price-action framework
                rather than proof of institutional intent.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              03 — BUY-SIDE VS SELL-SIDE LIQUIDITY
          ================================================= */}

          <section
            id="buy-side-sell-side-liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — BSL vs SSL</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Buy-Side Liquidity vs Sell-Side Liquidity
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                One of the most important pieces of liquidity-trading
                vocabulary is understanding the difference between{" "}
                <strong>buy-side liquidity</strong> and{" "}
                <strong>sell-side liquidity</strong>. The names refer to the
                type of orders expected around the level—not the direction of
                the trade you must take afterward.
              </p>

              <div
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 590"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Buy-side liquidity above highs and sell-side liquidity below lows"
                >
                  <defs>
                    <pattern
                      id="bslSslGridEn"
                      width="59"
                      height="59"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 59"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="590" fill="#ffffff" />
                  <rect
                    width="1180"
                    height="590"
                    fill="url(#bslSslGridEn)"
                  />

                  {/* LEFT PANEL */}
                  <rect
                    x="32"
                    y="30"
                    width="540"
                    height="530"
                    rx="28"
                    fill="#f8fafc"
                    stroke="#dbe4ef"
                    strokeWidth="2"
                  />

                  <text
                    x="82"
                    y="80"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    BUY-SIDE LIQUIDITY (BSL)
                  </text>

                  <text
                    x="82"
                    y="105"
                    fontSize="11"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Potential buy orders resting above visible highs
                  </text>

                  <line
                    x1="80"
                    y1="205"
                    x2="525"
                    y2="205"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="337"
                    y="168"
                    width="155"
                    height="28"
                    rx="14"
                    fill="#2563eb"
                  />

                  <text
                    x="414"
                    y="187"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BUY-SIDE LIQUIDITY
                  </text>

                  <Candle
                    x={120}
                    open={410}
                    close={370}
                    high={350}
                    low={430}
                    bullish
                  />
                  <Candle
                    x={170}
                    open={368}
                    close={325}
                    high={305}
                    low={388}
                    bullish
                  />
                  <Candle
                    x={220}
                    open={323}
                    close={280}
                    high={260}
                    low={343}
                    bullish
                  />
                  <Candle
                    x={270}
                    open={278}
                    close={240}
                    high={220}
                    low={298}
                    bullish
                  />

                  <Candle
                    x={325}
                    open={242}
                    close={270}
                    high={205}
                    low={290}
                    bullish={false}
                  />

                  <Candle
                    x={380}
                    open={272}
                    close={238}
                    high={207}
                    low={292}
                    bullish
                  />

                  <Candle
                    x={435}
                    open={240}
                    close={275}
                    high={205}
                    low={295}
                    bullish={false}
                  />

                  <text
                    x="322"
                    y="330"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    VISIBLE HIGHS
                  </text>

                  <path
                    d="M365 320 L365 292"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* RIGHT PANEL */}
                  <rect
                    x="608"
                    y="30"
                    width="540"
                    height="530"
                    rx="28"
                    fill="#f8fafc"
                    stroke="#dbe4ef"
                    strokeWidth="2"
                  />

                  <text
                    x="658"
                    y="80"
                    fontSize="18"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SELL-SIDE LIQUIDITY (SSL)
                  </text>

                  <text
                    x="658"
                    y="105"
                    fontSize="11"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Potential sell orders resting below visible lows
                  </text>

                  <line
                    x1="655"
                    y1="405"
                    x2="1100"
                    y2="405"
                    stroke="#475569"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="912"
                    y="415"
                    width="155"
                    height="28"
                    rx="14"
                    fill="#475569"
                  />

                  <text
                    x="989"
                    y="434"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    SELL-SIDE LIQUIDITY
                  </text>

                  <Candle
                    x={695}
                    open={180}
                    close={220}
                    high={160}
                    low={240}
                    bullish={false}
                  />
                  <Candle
                    x={745}
                    open={222}
                    close={265}
                    high={202}
                    low={285}
                    bullish={false}
                  />
                  <Candle
                    x={795}
                    open={267}
                    close={310}
                    high={247}
                    low={330}
                    bullish={false}
                  />
                  <Candle
                    x={845}
                    open={308}
                    close={350}
                    high={288}
                    low={370}
                    bullish={false}
                  />

                  <Candle
                    x={900}
                    open={348}
                    close={320}
                    high={300}
                    low={405}
                    bullish
                  />

                  <Candle
                    x={955}
                    open={322}
                    close={350}
                    high={302}
                    low={405}
                    bullish={false}
                  />

                  <Candle
                    x={1010}
                    open={348}
                    close={320}
                    high={300}
                    low={405}
                    bullish
                  />

                  <text
                    x="895"
                    y="495"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    VISIBLE LOWS
                  </text>

                  <path
                    d="M940 480 L940 440"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-[16px] font-black text-slate-950">
                    Buy-Side Liquidity (BSL)
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
                    Buy-side liquidity is generally discussed above previous
                    highs, resistance, equal highs and other visible upper
                    boundaries. A move above such a level is commonly described
                    as taking, raiding or sweeping buy-side liquidity.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <h3 className="text-[16px] font-black text-slate-950">
                    Sell-Side Liquidity (SSL)
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
                    Sell-side liquidity is generally discussed below previous
                    lows, support, equal lows and visible lower boundaries. A
                    move below these levels is commonly described as taking or
                    sweeping sell-side liquidity.
                  </p>
                </div>
              </div>

              <ImportantBox title="The naming follows the liquidity being taken">
                A buy-side liquidity sweep occurs above highs even though the
                trader may ultimately be looking for a short setup. A
                sell-side liquidity sweep occurs below lows even though the
                resulting setup may be bullish.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              04 — WHERE LIQUIDITY SITS
          ================================================= */}

          <section
            id="where-liquidity-sits"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — Liquidity Pools</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Where Do Traders Look for Liquidity on a Chart?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                The most useful liquidity levels are usually not hidden.
                Traders tend to focus on areas that are{" "}
                <strong>easy to identify before price arrives</strong>.
                Previous extremes, equal highs and lows, range boundaries and
                session reference points are common examples.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Swing Highs",
                    tag: "BSL",
                    text: "A previous swing high can attract attention from short stops and breakout buyers.",
                  },
                  {
                    title: "Swing Lows",
                    tag: "SSL",
                    text: "A previous swing low can become a reference for long stops and breakdown orders.",
                  },
                  {
                    title: "Equal Highs",
                    tag: "EQH",
                    text: "Repeated highs around a similar price create a highly visible upper boundary.",
                  },
                  {
                    title: "Equal Lows",
                    tag: "EQL",
                    text: "Repeated lows can form an obvious lower boundary watched by many traders.",
                  },
                  {
                    title: "Previous Day High / Low",
                    tag: "PDH / PDL",
                    text: "Prior-day extremes provide objective reference levels for many intraday traders.",
                  },
                  {
                    title: "Session Highs / Lows",
                    tag: "SESSION",
                    text: "London, New York or other defined session extremes may be used as intraday liquidity references.",
                  },
                  {
                    title: "Range High / Low",
                    tag: "RANGE",
                    text: "Consolidation boundaries can attract both breakout orders and protective stops.",
                  },
                  {
                    title: "Weekly High / Low",
                    tag: "WEEK",
                    text: "Higher-timeframe extremes may carry more contextual importance than minor intraday swings.",
                  },
                  {
                    title: "Obvious Support / Resistance",
                    tag: "S/R",
                    text: "Widely watched horizontal levels may contain clustered orders around their outer edges.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                        {item.title}
                      </h3>

                      <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-[9px] font-black text-[#1E5BB8]">
                        {item.tag}
                      </span>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Define the level before the sweep happens">
                If a liquidity pool only becomes obvious after price has
                already reversed from it, the analysis is vulnerable to
                hindsight bias. For backtesting, write objective rules for
                which highs, lows and session levels qualify before examining
                the outcome.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              05 — SWEEP VS GRAB
          ================================================= */}

          <section
            id="liquidity-sweep-vs-grab"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — Trading Terminology</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Liquidity Sweep vs Liquidity Grab: Is There a Difference?
              </h2>

              <div className="mt-5 max-w-[1160px] space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                <p>
                  <strong>Liquidity sweep</strong> and{" "}
                  <strong>liquidity grab</strong> are often used to describe
                  the same basic event: price moves through a visible liquidity
                  level and then rejects or returns through it. You will also
                  encounter terms such as <strong>liquidity raid</strong>,{" "}
                  <strong>stop run</strong> and <strong>stop hunt</strong>.
                </p>

                <p>
                  There is no universal vocabulary across every SMC or ICT
                  trading community. Some traders call a fast single-candle
                  probe a <strong>liquidity grab</strong> and reserve{" "}
                  <strong>liquidity sweep</strong> for a broader move through
                  several nearby levels. Others use both words
                  interchangeably.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "Liquidity Sweep",
                    subtitle: "Most useful neutral label",
                    text: "Describes price trading through a liquidity level and subsequently failing to hold beyond it.",
                  },
                  {
                    title: "Liquidity Grab",
                    subtitle: "Often used interchangeably",
                    text: "Frequently describes a quick raid through a level followed by a sharp rejection or reclaim.",
                  },
                  {
                    title: "Stop Hunt / Stop Run",
                    subtitle: "Common trader vocabulary",
                    text: "Describes similar chart behaviour, although the word hunt can imply deliberate intent that price data alone cannot establish.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <h3 className="text-[16px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[11px] font-black uppercase tracking-[0.08em] text-[#1E5BB8]">
                      {item.subtitle}
                    </p>

                    <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="For trading rules, the definition matters more than the label">
                If you are testing a strategy, define exactly what qualifies:
                must the sweeping candle close back inside the range? Can the
                reclaim occur one or two candles later? How far may price trade
                through the level? Consistent rules matter more than debating
                which name is correct.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              06 — SWEEP VS BREAKOUT
          ================================================= */}

          <section
            id="liquidity-sweep-vs-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Sweep or Breakout?</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Liquidity Sweep vs Breakout: How Can You Tell the Difference?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                This is one of the most important practical questions in
                liquidity trading. Both events begin the same way:{" "}
                <strong>price breaks a visible level</strong>. The difference
                becomes clearer only after observing whether price is accepted
                beyond the level or rejected back through it.
              </p>

              <div
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 600"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Liquidity sweep versus genuine breakout candlestick comparison"
                >
                  <defs>
                    <pattern
                      id="sweepBreakoutGridEn"
                      width="59"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 60"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="600" fill="#ffffff" />
                  <rect
                    width="1180"
                    height="600"
                    fill="url(#sweepBreakoutGridEn)"
                  />

                  {/* SWEEP PANEL */}
                  <rect
                    x="30"
                    y="30"
                    width="545"
                    height="540"
                    rx="28"
                    fill="#f8fafc"
                    stroke="#dbe4ef"
                    strokeWidth="2"
                  />

                  <text
                    x="75"
                    y="78"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    LIQUIDITY SWEEP
                  </text>

                  <text
                    x="75"
                    y="103"
                    fontSize="11"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Breaks the level → fails to hold → reclaims
                  </text>

                  <line
                    x1="75"
                    y1="255"
                    x2="530"
                    y2="255"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="82"
                    y="238"
                    fontSize="9"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    PREVIOUS HIGH / BSL
                  </text>

                  <Candle x={115} open={425} close={390} high={370} low={445} bullish />
                  <Candle x={165} open={388} close={350} high={330} low={408} bullish />
                  <Candle x={215} open={348} close={310} high={290} low={368} bullish />
                  <Candle x={265} open={308} close={275} high={255} low={328} bullish />

                  {/* Sweep candle */}
                  <line
                    x1="325"
                    y1="165"
                    x2="325"
                    y2="325"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="313"
                    y="235"
                    width="24"
                    height="55"
                    rx="2"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="325"
                    cy="195"
                    r="16"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="325"
                    y="199"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    SW
                  </text>

                  <Candle x={385} open={292} close={335} high={272} low={355} bullish={false} />
                  <Candle x={435} open={337} close={382} high={317} low={402} bullish={false} />
                  <Candle x={485} open={384} close={425} high={364} low={445} bullish={false} />

                  <rect
                    x="330"
                    y="465"
                    width="170"
                    height="31"
                    rx="15.5"
                    fill="#2563eb"
                  />

                  <text
                    x="415"
                    y="485"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    REJECTION + RECLAIM
                  </text>

                  {/* BREAKOUT PANEL */}
                  <rect
                    x="605"
                    y="30"
                    width="545"
                    height="540"
                    rx="28"
                    fill="#f8fafc"
                    stroke="#dbe4ef"
                    strokeWidth="2"
                  />

                  <text
                    x="650"
                    y="78"
                    fontSize="18"
                    fontWeight="900"
                    fill="#0f172a"
                  >
                    GENUINE BREAKOUT
                  </text>

                  <text
                    x="650"
                    y="103"
                    fontSize="11"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Breaks the level → accepts above → continues
                  </text>

                  <line
                    x1="650"
                    y1="255"
                    x2="1105"
                    y2="255"
                    stroke="#475569"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="657"
                    y="238"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    PREVIOUS HIGH
                  </text>

                  <Candle x={690} open={425} close={390} high={370} low={445} bullish />
                  <Candle x={740} open={388} close={350} high={330} low={408} bullish />
                  <Candle x={790} open={348} close={310} high={290} low={368} bullish />
                  <Candle x={840} open={308} close={270} high={250} low={328} bullish />

                  <Candle
                    x={900}
                    open={268}
                    close={215}
                    high={195}
                    low={288}
                    bullish
                    width={24}
                  />

                  <Candle
                    x={955}
                    open={213}
                    close={180}
                    high={160}
                    low={233}
                    bullish
                    width={24}
                  />

                  <Candle
                    x={1010}
                    open={182}
                    close={145}
                    high={125}
                    low={202}
                    bullish
                    width={24}
                  />

                  <rect
                    x="875"
                    y="465"
                    width="190"
                    height="31"
                    rx="15.5"
                    fill="#0f172a"
                  />

                  <text
                    x="970"
                    y="485"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    ACCEPTANCE + CONTINUATION
                  </text>
                </svg>
              </div>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-left text-white">
                        <th className="px-5 py-4 text-[13px] font-black">
                          Feature
                        </th>
                        <th className="px-5 py-4 text-[13px] font-black">
                          Liquidity Sweep
                        </th>
                        <th className="px-5 py-4 text-[13px] font-black">
                          Breakout
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {[
                        [
                          "Initial move",
                          "Trades beyond the watched level",
                          "Trades beyond the watched level",
                        ],
                        [
                          "Acceptance",
                          "Fails to maintain price beyond the level",
                          "Maintains trading beyond the old boundary",
                        ],
                        [
                          "Close / reclaim",
                          "Often returns inside the previous range",
                          "Often closes and holds outside the range",
                        ],
                        [
                          "Follow-through",
                          "May displace in the opposite direction",
                          "Continuation supports the break",
                        ],
                        [
                          "Trading implication",
                          "Potential reversal context",
                          "Potential continuation context",
                        ],
                      ].map(([feature, sweep, breakout]) => (
                        <tr key={feature} className="bg-white">
                          <td className="px-5 py-4 text-[13px] font-black text-slate-900">
                            {feature}
                          </td>

                          <td className="px-5 py-4 text-[13px] font-medium leading-7 text-slate-600">
                            {sweep}
                          </td>

                          <td className="px-5 py-4 text-[13px] font-medium leading-7 text-slate-600">
                            {breakout}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ImportantBox title="You cannot know the final classification at the first tick beyond the level">
                The initial breach can become either a failed breakout or a
                successful continuation. Traders therefore use subsequent
                price behaviour—such as reclaim, candle closes, displacement
                and structure—to avoid assuming that every break is a sweep.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              07 — BULLISH LIQUIDITY SWEEP
          ================================================= */}

          <section
            id="bullish-liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — Bullish Setup</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                What Is a Bullish Liquidity Sweep?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                A <strong>bullish liquidity sweep</strong> typically refers to
                price trading below a visible low or sell-side liquidity pool,
                then failing to continue lower and recovering back above the
                swept level. Traders may then look for bullish displacement or
                a shift in lower-timeframe market structure before considering
                a long setup.
              </p>

              <div
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 610"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Bullish liquidity sweep below sell-side liquidity followed by bullish displacement"
                >
                  <defs>
                    <pattern
                      id="bullSweepGridEn"
                      width="59"
                      height="61"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 61"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="610" fill="#ffffff" />
                  <rect
                    width="1180"
                    height="610"
                    fill="url(#bullSweepGridEn)"
                  />

                  <text
                    x="55"
                    y="55"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    BULLISH LIQUIDITY SWEEP
                  </text>

                  <text
                    x="55"
                    y="80"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Sell-side liquidity is taken before price reclaims the level
                  </text>

                  {/* SSL */}
                  <line
                    x1="70"
                    y1="390"
                    x2="1110"
                    y2="390"
                    stroke="#475569"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="78"
                    y="402"
                    width="180"
                    height="29"
                    rx="14.5"
                    fill="#475569"
                  />

                  <text
                    x="168"
                    y="421"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    SELL-SIDE LIQUIDITY
                  </text>

                  {/* Approach */}
                  <Candle x={145} open={180} close={220} high={160} low={240} bullish={false} />
                  <Candle x={200} open={222} close={265} high={202} low={285} bullish={false} />
                  <Candle x={255} open={267} close={310} high={247} low={330} bullish={false} />
                  <Candle x={310} open={308} close={350} high={288} low={370} bullish={false} />

                  {/* Sweep candle */}
                  <line
                    x1="380"
                    y1="330"
                    x2="380"
                    y2="500"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="367"
                    y="365"
                    width="26"
                    height="55"
                    rx="2"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="380"
                    cy="458"
                    r="18"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="380"
                    y="462"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    1
                  </text>

                  <text
                    x="380"
                    y="528"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SWEEP BELOW LOW
                  </text>

                  {/* Reclaim */}
                  <Candle x={450} open={420} close={360} high={340} low={440} bullish width={24} />
                  <Candle x={510} open={358} close={305} high={285} low={378} bullish width={24} />

                  <circle
                    cx="510"
                    cy="305"
                    r="17"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="510"
                    y="309"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    2
                  </text>

                  <rect
                    x="425"
                    y="235"
                    width="170"
                    height="30"
                    rx="15"
                    fill="#0f172a"
                  />

                  <text
                    x="510"
                    y="255"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    RECLAIM
                  </text>

                  {/* Displacement */}
                  <Candle x={580} open={303} close={250} high={230} low={323} bullish width={24} />
                  <Candle x={640} open={248} close={195} high={175} low={268} bullish width={24} />
                  <Candle x={700} open={193} close={145} high={125} low={213} bullish width={24} />

                  <circle
                    cx="640"
                    cy="195"
                    r="17"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="640"
                    y="199"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    3
                  </text>

                  <rect
                    x="745"
                    y="165"
                    width="210"
                    height="31"
                    rx="15.5"
                    fill="#2563eb"
                  />

                  <text
                    x="850"
                    y="185"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BULLISH DISPLACEMENT
                  </text>

                  {/* FVG */}
                  <rect
                    x="545"
                    y="260"
                    width="180"
                    height="55"
                    rx="7"
                    fill="#dbeafe"
                    fillOpacity="0.8"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  <text
                    x="635"
                    y="292"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    POTENTIAL FVG
                  </text>

                  {/* Continuation */}
                  <Candle x={780} open={147} close={175} high={127} low={195} bullish={false} />
                  <Candle x={835} open={173} close={130} high={110} low={193} bullish />
                  <Candle x={890} open={128} close={95} high={75} low={148} bullish />

                  <text
                    x="770"
                    y="370"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SELL-SIDE LIQUIDITY TAKEN
                  </text>

                  <text
                    x="770"
                    y="393"
                    fontSize="9"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Reclaim and bullish follow-through provide additional evidence
                  </text>
                </svg>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["01", "Mark SSL", "Identify a visible low or sell-side liquidity pool."],
                  ["02", "Wait for the Sweep", "Price must actually trade below the level."],
                  ["03", "Watch the Reclaim", "Look for failure to maintain acceptance below it."],
                  ["04", "Seek Confirmation", "Evaluate displacement, MSS, CHoCH or your chosen trigger."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              08 — BEARISH LIQUIDITY SWEEP
          ================================================= */}

          <section
            id="bearish-liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Bearish Setup</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                What Is a Bearish Liquidity Sweep?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                A <strong>bearish liquidity sweep</strong> typically occurs
                when price trades above a visible high or{" "}
                <strong>buy-side liquidity</strong> area, fails to hold above
                it and then returns below the swept level. Traders may then
                look for bearish displacement and a market structure shift
                before evaluating a short entry.
              </p>

              <div
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 610"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Bearish liquidity sweep above buy-side liquidity followed by bearish displacement"
                >
                  <defs>
                    <pattern
                      id="bearSweepGridEn"
                      width="59"
                      height="61"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 61"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="610" fill="#ffffff" />
                  <rect
                    width="1180"
                    height="610"
                    fill="url(#bearSweepGridEn)"
                  />

                  <text
                    x="55"
                    y="55"
                    fontSize="18"
                    fontWeight="900"
                    fill="#475569"
                  >
                    BEARISH LIQUIDITY SWEEP
                  </text>

                  <text
                    x="55"
                    y="80"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Buy-side liquidity is taken before price reclaims below the level
                  </text>

                  {/* BSL */}
                  <line
                    x1="70"
                    y1="215"
                    x2="1110"
                    y2="215"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                  />

                  <rect
                    x="78"
                    y="174"
                    width="180"
                    height="29"
                    rx="14.5"
                    fill="#2563eb"
                  />

                  <text
                    x="168"
                    y="193"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BUY-SIDE LIQUIDITY
                  </text>

                  {/* Approach */}
                  <Candle x={145} open={430} close={390} high={370} low={450} bullish />
                  <Candle x={200} open={388} close={345} high={325} low={408} bullish />
                  <Candle x={255} open={343} close={300} high={280} low={363} bullish />
                  <Candle x={310} open={298} close={255} high={235} low={318} bullish />

                  {/* Sweep */}
                  <line
                    x1="380"
                    y1="105"
                    x2="380"
                    y2="275"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="367"
                    y="185"
                    width="26"
                    height="55"
                    rx="2"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="380"
                    cy="145"
                    r="18"
                    fill="#ffffff"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <text
                    x="380"
                    y="149"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    1
                  </text>

                  <text
                    x="380"
                    y="90"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SWEEP ABOVE HIGH
                  </text>

                  {/* Reclaim */}
                  <Candle x={450} open={238} close={300} high={218} low={320} bullish={false} width={24} />
                  <Candle x={510} open={302} close={355} high={282} low={375} bullish={false} width={24} />

                  <circle
                    cx="510"
                    cy="355"
                    r="17"
                    fill="#ffffff"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <text
                    x="510"
                    y="359"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    2
                  </text>

                  <rect
                    x="425"
                    y="405"
                    width="170"
                    height="30"
                    rx="15"
                    fill="#0f172a"
                  />

                  <text
                    x="510"
                    y="425"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    RECLAIM
                  </text>

                  {/* FVG */}
                  <rect
                    x="545"
                    y="300"
                    width="180"
                    height="55"
                    rx="7"
                    fill="#eef2f7"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  <text
                    x="635"
                    y="332"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    POTENTIAL FVG
                  </text>

                  {/* Displacement */}
                  <Candle x={580} open={353} close={405} high={333} low={425} bullish={false} width={24} />
                  <Candle x={640} open={407} close={460} high={387} low={480} bullish={false} width={24} />
                  <Candle x={700} open={462} close={510} high={442} low={530} bullish={false} width={24} />

                  <circle
                    cx="640"
                    cy="460"
                    r="17"
                    fill="#ffffff"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <text
                    x="640"
                    y="464"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    3
                  </text>

                  <rect
                    x="745"
                    y="465"
                    width="210"
                    height="31"
                    rx="15.5"
                    fill="#475569"
                  />

                  <text
                    x="850"
                    y="485"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BEARISH DISPLACEMENT
                  </text>

                  {/* Continuation */}
                  <Candle x={780} open={508} close={475} high={455} low={528} bullish />
                  <Candle x={835} open={477} close={520} high={457} low={540} bullish={false} />
                  <Candle x={890} open={522} close={555} high={502} low={575} bullish={false} />

                  <text
                    x="770"
                    y="280"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    BUY-SIDE LIQUIDITY TAKEN
                  </text>

                  <text
                    x="770"
                    y="303"
                    fontSize="9"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Rejection and bearish follow-through provide additional evidence
                  </text>
                </svg>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["01", "Mark BSL", "Identify a visible high or buy-side liquidity pool."],
                  ["02", "Wait for the Sweep", "Price must trade above the selected level."],
                  ["03", "Watch the Reclaim", "Look for failure to maintain acceptance above it."],
                  ["04", "Seek Confirmation", "Evaluate bearish displacement or your structure trigger."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {n}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              09 — CONFIRMATION
          ================================================= */}

          <section
            id="liquidity-sweep-confirmation"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — Confirmation</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                How Do Traders Confirm a Liquidity Sweep?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                A liquidity sweep can provide context, but many traders avoid
                using the sweep itself as the entry trigger. Instead, they wait
                for evidence that the attempted break has failed and that
                price is beginning to move away from the swept level.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Level Is Swept",
                    text: "Price must first trade beyond a predefined high, low or liquidity pool.",
                  },
                  {
                    n: "02",
                    title: "Price Reclaims",
                    text: "The market returns through the level instead of continuing to accept prices beyond it.",
                  },
                  {
                    n: "03",
                    title: "Displacement Appears",
                    text: "A decisive move away from the sweep can provide stronger evidence than a weak, overlapping reaction.",
                  },
                  {
                    n: "04",
                    title: "Structure Shifts",
                    text: "Some models require a lower-timeframe MSS or CHoCH after the liquidity event.",
                  },
                  {
                    n: "05",
                    title: "Entry Area Forms",
                    text: "The displacement may leave an FVG, order block or another retracement area used by the strategy.",
                  },
                  {
                    n: "06",
                    title: "Invalidation Is Clear",
                    text: "The setup should have a logical point where the reversal thesis is considered invalid.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Confirmation reduces ambiguity, not risk">
                Waiting for a reclaim or structure shift may help define the
                setup more clearly, but it cannot guarantee a reversal. Price
                can confirm briefly and then reverse again, which is why
                position sizing and invalidation remain necessary.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              10 — MSS / CHOCH / BOS
          ================================================= */}

          <section
            id="liquidity-sweep-market-structure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — Market Structure</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Liquidity Sweep + MSS, CHoCH and Break of Structure
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                After liquidity is taken, many SMC traders examine{" "}
                <strong>market structure</strong> to determine whether the
                reaction is developing into a meaningful directional shift.
                Three common terms are{" "}
                <strong>Market Structure Shift (MSS)</strong>,{" "}
                <strong>Change of Character (CHoCH)</strong> and{" "}
                <strong>Break of Structure (BOS)</strong>.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="text-[10px] font-black tracking-[0.12em] text-[#1E5BB8]">
                    MSS
                  </span>

                  <h3 className="mt-2 text-[16px] font-black text-slate-950">
                    Market Structure Shift
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                    Often used when price aggressively breaks a meaningful
                    short-term swing in the direction opposite the sweep,
                    suggesting that immediate order flow may be changing.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="text-[10px] font-black tracking-[0.12em] text-[#1E5BB8]">
                    CHOCH
                  </span>

                  <h3 className="mt-2 text-[16px] font-black text-slate-950">
                    Change of Character
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                    Commonly used for an early break against the prior
                    short-term sequence of highs and lows. Definitions vary
                    between trading communities and indicators.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="text-[10px] font-black tracking-[0.12em] text-[#1E5BB8]">
                    BOS
                  </span>

                  <h3 className="mt-2 text-[16px] font-black text-slate-950">
                    Break of Structure
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                    Usually refers to price breaking a defined structural swing.
                    Depending on the methodology, BOS may be used for
                    continuation, confirmation or both.
                  </p>
                </div>
              </div>

              <ImportantBox title="MSS, CHoCH and BOS do not have perfectly standardized definitions">
                Different educators and indicators label market structure
                differently. A backtestable strategy should therefore define
                which swing must break, whether a wick is sufficient or a
                candle close is required, and whether displacement is part of
                the confirmation.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              11 — FVG & ORDER BLOCK
          ================================================= */}

          <section
            id="liquidity-sweep-fvg-order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — Entry Confluence</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Liquidity Sweep + Fair Value Gap + Order Block
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                A common SMC entry sequence combines a liquidity event with
                subsequent displacement. If that displacement leaves a{" "}
                <strong>Fair Value Gap (FVG)</strong> or a defined{" "}
                <strong>Order Block</strong>, traders may wait for a retracement
                rather than entering immediately after the reversal leg.
              </p>

              <div
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 610"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Liquidity sweep followed by market structure shift fair value gap and order block retracement"
                >
                  <defs>
                    <pattern
                      id="sweepFvgObGridEn"
                      width="59"
                      height="61"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 61"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="610" fill="#ffffff" />
                  <rect
                    width="1180"
                    height="610"
                    fill="url(#sweepFvgObGridEn)"
                  />

                  <text
                    x="55"
                    y="55"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    SWEEP → SHIFT → RETRACEMENT
                  </text>

                  <text
                    x="55"
                    y="80"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    A common Smart Money Concepts entry framework
                  </text>

                  {/* SSL */}
                  <line
                    x1="70"
                    y1="410"
                    x2="1110"
                    y2="410"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="80"
                    y="393"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SELL-SIDE LIQUIDITY
                  </text>

                  {/* Approach */}
                  <Candle x={120} open={190} close={230} high={170} low={250} bullish={false} />
                  <Candle x={175} open={232} close={275} high={212} low={295} bullish={false} />
                  <Candle x={230} open={277} close={320} high={257} low={340} bullish={false} />
                  <Candle x={285} open={318} close={360} high={298} low={380} bullish={false} />

                  {/* Sweep */}
                  <line
                    x1="350"
                    y1="340"
                    x2="350"
                    y2="510"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="337"
                    y="385"
                    width="26"
                    height="55"
                    rx="2"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <circle
                    cx="350"
                    cy="468"
                    r="17"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <text
                    x="350"
                    y="472"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    1
                  </text>

                  {/* Order block */}
                  <rect
                    x="390"
                    y="345"
                    width="125"
                    height="75"
                    rx="7"
                    fill="#eff6ff"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />

                  <text
                    x="452"
                    y="388"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    ORDER BLOCK
                  </text>

                  {/* Displacement */}
                  <Candle x={455} open={400} close={345} high={325} low={420} bullish width={24} />
                  <Candle x={515} open={343} close={285} high={265} low={363} bullish width={24} />
                  <Candle x={575} open={283} close={225} high={205} low={303} bullish width={24} />
                  <Candle x={635} open={223} close={170} high={150} low={243} bullish width={24} />

                  {/* FVG */}
                  <rect
                    x="500"
                    y="275"
                    width="190"
                    height="60"
                    rx="7"
                    fill="#dbeafe"
                    fillOpacity="0.85"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  <text
                    x="595"
                    y="310"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    FAIR VALUE GAP
                  </text>

                  {/* MSS line */}
                  <line
                    x1="455"
                    y1="300"
                    x2="740"
                    y2="300"
                    stroke="#0f172a"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <rect
                    x="675"
                    y="260"
                    width="110"
                    height="28"
                    rx="14"
                    fill="#0f172a"
                  />

                  <text
                    x="730"
                    y="279"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    MSS / CHOCH
                  </text>

                  {/* Pullback */}
                  <Candle x={710} open={172} close={205} high={152} low={225} bullish={false} />
                  <Candle x={765} open={207} close={250} high={187} low={270} bullish={false} />
                  <Candle x={820} open={248} close={285} high={228} low={305} bullish={false} />

                  {/* Re-entry */}
                  <Candle x={875} open={283} close={235} high={215} low={303} bullish width={24} />
                  <Candle x={930} open={233} close={185} high={165} low={253} bullish width={24} />
                  <Candle x={985} open={183} close={140} high={120} low={203} bullish width={24} />

                  <rect
                    x="770"
                    y="335"
                    width="180"
                    height="31"
                    rx="15.5"
                    fill="#2563eb"
                  />

                  <text
                    x="860"
                    y="355"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    RETRACEMENT AREA
                  </text>

                  <text
                    x="830"
                    y="500"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    LIQUIDITY FIRST — ENTRY SECOND
                  </text>

                  <text
                    x="830"
                    y="524"
                    fontSize="9"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Wait for your defined confirmation before using the retracement
                  </text>
                </svg>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "1. Liquidity Event",
                    text: "A predefined liquidity pool is swept and price fails to continue through it.",
                  },
                  {
                    title: "2. Displacement & Structure",
                    text: "Price moves decisively away and breaks the structural reference required by the trading model.",
                  },
                  {
                    title: "3. Retracement Entry",
                    text: "Instead of chasing displacement, the trader may wait for price to revisit an FVG or order block.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <h3 className="text-[15px] font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Confluence should be defined before backtesting">
                Adding FVGs, order blocks, MSS and liquidity concepts can make
                a chart look convincing after the move is complete. To avoid
                hindsight, specify which confirmations are mandatory and which
                are optional before testing the strategy.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — STEP-BY-STEP STRATEGY
          ================================================= */}

          <section
            id="liquidity-sweep-strategy-steps"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — Trading Strategy</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                How to Trade a Liquidity Sweep Strategy Step by Step
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                The following framework turns the liquidity-sweep concept into
                a sequence that can be defined and backtested. It is not a
                guaranteed trading signal; each step needs objective rules
                appropriate to the market and timeframe being tested.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  {
                    n: "01",
                    title: "Establish Higher-Timeframe Context",
                    text: "Identify the broader structure, directional context and major liquidity levels before focusing on a lower-timeframe entry.",
                  },
                  {
                    n: "02",
                    title: "Mark the Liquidity Pool",
                    text: "Choose the specific high, low, equal highs/lows, PDH/PDL or range boundary that qualifies under your rules.",
                  },
                  {
                    n: "03",
                    title: "Wait for Price to Sweep the Level",
                    text: "Do not anticipate the event. The market must actually trade through the selected liquidity reference.",
                  },
                  {
                    n: "04",
                    title: "Evaluate the Reclaim",
                    text: "Determine whether price rejects the move and returns through the swept level instead of sustaining acceptance beyond it.",
                  },
                  {
                    n: "05",
                    title: "Wait for Displacement",
                    text: "Look for a decisive move away from the sweep if displacement is part of your confirmation model.",
                  },
                  {
                    n: "06",
                    title: "Confirm Market Structure",
                    text: "If your strategy requires MSS, CHoCH or BOS, define exactly which swing must be broken and whether a close is required.",
                  },
                  {
                    n: "07",
                    title: "Identify the Entry Area",
                    text: "A retracement into an FVG, order block or another predefined zone can be used instead of chasing the initial move.",
                  },
                  {
                    n: "08",
                    title: "Define Invalidation and Target",
                    text: "Set the stop-loss logic, target liquidity and position size before entering the trade.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 pl-[52px] text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="The sweep is context; the complete setup needs rules">
                A strategy becomes testable only when you define the liquidity
                level, sweep criteria, confirmation, entry, invalidation,
                target and risk. Without those rules, almost any historical
                reversal can be labeled a successful liquidity sweep.
              </ImportantBox>
            </div>
          </section>
                    {/* =================================================
              13 — ENTRY MODELS
          ================================================= */}

          <section
            id="liquidity-sweep-entry"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Entry Models</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                3 Ways to Enter After a Liquidity Sweep
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                Traders do not all enter a liquidity sweep in the same way.
                Some prioritize an early entry near the reclaimed level, while
                others wait for a confirmed market structure shift and then
                enter on a retracement into a{" "}
                <strong>Fair Value Gap (FVG)</strong> or{" "}
                <strong>Order Block</strong>. The trade-off is generally
                between earlier positioning and stronger confirmation.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Reclaim Entry",
                    tag: "EARLY",
                    text:
                      "The trader enters after price sweeps the level and closes or moves back through it. This offers an earlier entry but provides less structural confirmation.",
                    good:
                      "Useful when the sweep level and invalidation are clearly defined.",
                    risk:
                      "The apparent reclaim can fail and turn into a genuine breakout.",
                  },
                  {
                    n: "02",
                    title: "MSS Confirmation Entry",
                    tag: "CONFIRMED",
                    text:
                      "The trader waits for price to reclaim the level and then break a relevant lower-timeframe swing in the reversal direction.",
                    good:
                      "Adds market-structure evidence before committing to the setup.",
                    risk:
                      "The confirmation can move price far from the sweep and reduce reward-to-risk.",
                  },
                  {
                    n: "03",
                    title: "FVG / Order Block Retracement",
                    tag: "RETRACEMENT",
                    text:
                      "After sweep and displacement, the trader waits for price to retrace into a defined FVG or order block before considering entry.",
                    good:
                      "Can provide a more structured entry after confirmation.",
                    risk:
                      "Price may never retrace into the selected zone, resulting in a missed trade.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                          {item.n}
                        </span>

                        <h3 className="text-[15px] font-black text-slate-950">
                          {item.title}
                        </h3>
                      </div>

                      <span className="rounded-lg bg-blue-50 px-2 py-1 text-[9px] font-black text-[#1E5BB8]">
                        {item.tag}
                      </span>
                    </div>

                    <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.text}
                    </p>

                    <div className="mt-5 space-y-3">
                      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[#1E5BB8]">
                          Advantage
                        </p>
                        <p className="mt-1 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                          {item.good}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.08em] text-slate-500">
                          Trade-Off
                        </p>
                        <p className="mt-1 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                          {item.risk}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ImportantBox title="Do not switch entry models after seeing the outcome">
                If you are backtesting, choose the entry model before reviewing
                whether the trade worked. Otherwise, it becomes easy to use an
                early entry when price never retraced and an FVG entry when
                the deeper pullback produced a better historical result.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              14 — STOP LOSS
          ================================================= */}

          <section
            id="liquidity-sweep-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — Stop Loss</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Where Should the Stop Loss Go in a Liquidity Sweep Trade?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                The sweep extreme is one of the most common structural
                invalidation references. In a bullish setup, that usually means
                below the low created during the sell-side liquidity sweep. In
                a bearish setup, it usually means above the high created during
                the buy-side liquidity sweep.
              </p>

              <div
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 610"
                  className="block h-auto w-[1080px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Liquidity sweep trade showing entry stop loss and target liquidity"
                >
                  <defs>
                    <pattern
                      id="sweepRiskGridEn"
                      width="59"
                      height="61"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 61"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="610" fill="#ffffff" />
                  <rect width="1180" height="610" fill="url(#sweepRiskGridEn)" />

                  <text
                    x="55"
                    y="55"
                    fontSize="18"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    STRUCTURAL INVALIDATION
                  </text>

                  <text
                    x="55"
                    y="80"
                    fontSize="10"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Example framework — not a trade recommendation
                  </text>

                  {/* Target */}
                  <rect
                    x="720"
                    y="105"
                    width="350"
                    height="60"
                    rx="10"
                    fill="#eff6ff"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />

                  <text
                    x="895"
                    y="132"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    POTENTIAL TARGET
                  </text>

                  <text
                    x="895"
                    y="150"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    OPPOSING BUY-SIDE LIQUIDITY
                  </text>

                  {/* SSL */}
                  <line
                    x1="75"
                    y1="400"
                    x2="1095"
                    y2="400"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />

                  <text
                    x="80"
                    y="383"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SELL-SIDE LIQUIDITY
                  </text>

                  {/* Approach */}
                  <Candle x={135} open={190} close={230} high={170} low={250} bullish={false} />
                  <Candle x={190} open={232} close={275} high={212} low={295} bullish={false} />
                  <Candle x={245} open={277} close={320} high={257} low={340} bullish={false} />
                  <Candle x={300} open={318} close={360} high={298} low={380} bullish={false} />

                  {/* Sweep */}
                  <line
                    x1="365"
                    y1="345"
                    x2="365"
                    y2="505"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <rect
                    x="352"
                    y="382"
                    width="26"
                    height="58"
                    rx="2"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />

                  <text
                    x="365"
                    y="530"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    SWEEP EXTREME
                  </text>

                  {/* Recovery */}
                  <Candle x={430} open={438} close={370} high={350} low={458} bullish width={24} />
                  <Candle x={490} open={368} close={310} high={290} low={388} bullish width={24} />
                  <Candle x={550} open={308} close={250} high={230} low={328} bullish width={24} />

                  {/* Entry zone */}
                  <rect
                    x="570"
                    y="280"
                    width="205"
                    height="68"
                    rx="9"
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />

                  <text
                    x="672"
                    y="309"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    ENTRY AREA
                  </text>

                  <text
                    x="672"
                    y="328"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    FVG / OB RETRACEMENT
                  </text>

                  {/* Pullback */}
                  <Candle x={620} open={248} close={285} high={228} low={305} bullish={false} />
                  <Candle x={675} open={283} close={320} high={263} low={340} bullish={false} />
                  <Candle x={730} open={318} close={275} high={255} low={338} bullish />

                  {/* Continuation */}
                  <Candle x={790} open={273} close={225} high={205} low={293} bullish />
                  <Candle x={850} open={223} close={180} high={160} low={243} bullish />
                  <Candle x={910} open={178} close={140} high={120} low={198} bullish />

                  {/* Stop */}
                  <rect
                    x="515"
                    y="515"
                    width="250"
                    height="43"
                    rx="10"
                    fill="#f8fafc"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  <text
                    x="640"
                    y="542"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#475569"
                  >
                    INVALIDATION / STOP AREA
                  </text>

                  <path
                    d="M515 536 L405 536 L405 495"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                </svg>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "Beyond the Sweep Extreme",
                    text:
                      "A structural stop beyond the sweep high or low gives the setup room to remain valid while defining where the original reversal thesis fails.",
                  },
                  {
                    title: "Add a Logical Buffer",
                    text:
                      "Spread, volatility and normal price noise can matter. A stop placed exactly at the extreme may behave differently from one with a predefined buffer.",
                  },
                  {
                    title: "Size the Position From the Stop",
                    text:
                      "Do not move the stop closer simply to increase position size. Define invalidation first, then calculate position size from the allowed monetary risk.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              15 — TAKE PROFIT
          ================================================= */}

          <section
            id="liquidity-sweep-targets"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — Take Profit</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Where Do Traders Take Profit After a Liquidity Sweep?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                Liquidity-based strategies often use another visible liquidity
                pool as a potential target. In a bullish reversal after
                sell-side liquidity is swept, traders may look toward
                buy-side liquidity above price. In a bearish reversal, the
                opposite logic may be applied.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "TP1",
                    title: "Internal Liquidity",
                    text:
                      "Nearby short-term highs, lows or minor structure can provide a closer objective for partial profit-taking.",
                  },
                  {
                    n: "TP2",
                    title: "Opposing External Liquidity",
                    text:
                      "A major swing high or low, equal highs/lows or another external pool may provide the larger structural objective.",
                  },
                  {
                    n: "RR",
                    title: "Risk-to-Reward Filter",
                    text:
                      "If the logical target is too close relative to the structural stop, the setup may not meet the strategy's minimum reward-to-risk requirement.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[15px] font-black text-slate-950">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Do not invent a target just to create an attractive R:R ratio">
                Start with a structurally meaningful target and invalidation
                point. If those levels produce an unattractive trade under
                your tested rules, skipping the setup can be more disciplined
                than forcing an arbitrary target.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              16 — INTERNAL VS EXTERNAL LIQUIDITY
          ================================================= */}

          <section
            id="internal-external-liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — Liquidity Structure</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Internal Liquidity vs External Liquidity
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                Within SMC terminology, traders sometimes separate liquidity
                into <strong>external liquidity</strong> around the major
                boundaries of a range and <strong>internal liquidity</strong>{" "}
                located within that range. The distinction can help organize
                which level is being swept and which level may become the next
                objective.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <span className="text-[10px] font-black tracking-[0.12em] text-[#1E5BB8]">
                    EXTERNAL LIQUIDITY
                  </span>

                  <h3 className="mt-2 text-[17px] font-black text-slate-950">
                    Outside the Main Range
                  </h3>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
                    Major swing highs, swing lows, equal highs, equal lows and
                    significant range boundaries are often classified as
                    external liquidity because they sit outside the currently
                    defined dealing range.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                  <span className="text-[10px] font-black tracking-[0.12em] text-slate-500">
                    INTERNAL LIQUIDITY
                  </span>

                  <h3 className="mt-2 text-[17px] font-black text-slate-950">
                    Inside the Main Range
                  </h3>

                  <p className="mt-4 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
                    Minor swing points and shorter-term liquidity references
                    located between the major range high and range low may be
                    described as internal liquidity.
                  </p>
                </div>
              </div>

              <ImportantBox title="Internal and external are relative to the range you define">
                The same swing can be external liquidity on a one-minute chart
                and internal liquidity within a much larger one-hour range.
                Always define the timeframe and dealing range before applying
                these labels.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              17 — PDH / PDL
          ================================================= */}

          <section
            id="previous-day-high-low"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — PDH & PDL</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Previous Day High and Low Liquidity Sweeps
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                <strong>Previous Day High (PDH)</strong> and{" "}
                <strong>Previous Day Low (PDL)</strong> are popular intraday
                liquidity references because they are objective and easy to
                identify before the current trading day begins.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-[16px] font-black text-slate-950">
                    Sweep of Previous Day High
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
                    Price trades above PDH, takes the upper reference and then
                    fails to maintain acceptance above it. If bearish
                    confirmation follows, traders may evaluate a reversal
                    setup rather than automatically buying the breakout.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <h3 className="text-[16px] font-black text-slate-950">
                    Sweep of Previous Day Low
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-8 text-slate-650 sm:text-[14px]">
                    Price trades below PDL and then recovers above the
                    reference. If bullish displacement and structure
                    confirmation follow, traders may evaluate a long reversal
                    model.
                  </p>
                </div>
              </div>

              <ImportantBox title="A touch of PDH or PDL is not automatically a trading signal">
                The previous day's extremes are reference levels. The strategy
                still requires whatever sweep, reclaim, displacement and
                confirmation rules you defined in advance.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              18 — SESSION LIQUIDITY
          ================================================= */}

          <section
            id="session-liquidity-sweeps"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — Session Liquidity</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Asian, London and New York Session Liquidity Sweeps
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                Intraday traders may also mark session highs and lows as
                liquidity references. The exact session definitions depend on
                the instrument, broker time and methodology, so session rules
                should be standardized before testing.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "Asian Session Range",
                    tag: "ASIA",
                    text:
                      "The Asian session high and low can form an intraday range that later sessions interact with. Traders may monitor whether either boundary is swept and reclaimed.",
                  },
                  {
                    title: "London Session",
                    tag: "LONDON",
                    text:
                      "London often brings greater activity to major forex pairs. Traders may study sweeps of earlier session levels, PDH/PDL or nearby structural liquidity.",
                  },
                  {
                    title: "New York Session",
                    tag: "NEW YORK",
                    text:
                      "New York can interact with both London structure and higher-timeframe levels. The same sweep-and-confirmation framework can be applied without assuming a reversal must occur.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <span className="rounded-lg bg-blue-50 px-2 py-1 text-[9px] font-black text-[#1E5BB8]">
                      {item.tag}
                    </span>

                    <h3 className="mt-4 text-[16px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Session times can shift relative to your chart">
                Daylight-saving changes and broker/server time can alter how
                session boundaries appear. Use one consistent timezone and
                session definition throughout a backtest.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              19 — MULTI-TIMEFRAME
          ================================================= */}

          <section
            id="liquidity-sweep-multi-timeframe"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — Multi-Timeframe Analysis</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                How to Use Liquidity Sweeps Across Multiple Timeframes
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                A multi-timeframe approach separates{" "}
                <strong>context</strong> from <strong>execution</strong>. A
                higher timeframe can identify the major range and liquidity
                objective, while a lower timeframe can provide the sweep,
                market structure shift and entry trigger.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["HTF", "Context", "Identify the broader trend, range and major liquidity."],
                  ["LEVEL", "Location", "Mark the specific HTF or session level price is approaching."],
                  ["LTF", "Confirmation", "Watch the lower timeframe for sweep, reclaim and structure shift."],
                  ["ENTRY", "Execution", "Use the predefined trigger, stop and target rules."],
                ].map(([tag, title, text]) => (
                  <div
                    key={tag}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <span className="text-[10px] font-black tracking-[0.1em] text-[#1E5BB8]">
                      {tag}
                    </span>

                    <h3 className="mt-2 text-[15px] font-black text-slate-950">
                      {title}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="More timeframes do not automatically improve the setup">
                Adding too many charts can create contradictory signals and
                hindsight-based filtering. Choose a repeatable timeframe
                hierarchy—for example context, setup and execution—and test it
                consistently.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              20 — QUALITY FILTERS
          ================================================= */}

          <section
            id="liquidity-sweep-filters"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — Setup Filters</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                What Makes a Liquidity Sweep Setup More Meaningful?
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                Not every wick beyond a high or low deserves equal attention.
                Traders often apply filters to reduce the number of marginal
                setups and focus on liquidity events occurring at predefined,
                contextually important locations.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Clear Liquidity Level",
                    text:
                      "The high, low or range boundary should be identifiable before price reaches it.",
                  },
                  {
                    title: "Higher-Timeframe Context",
                    text:
                      "The sweep can be evaluated relative to the broader structure instead of being viewed in isolation.",
                  },
                  {
                    title: "Decisive Reclaim",
                    text:
                      "Failure to remain beyond the swept level can help distinguish rejection from continued acceptance.",
                  },
                  {
                    title: "Strong Displacement",
                    text:
                      "A decisive move away from the sweep may provide clearer evidence than overlapping, indecisive candles.",
                  },
                  {
                    title: "Market Structure Shift",
                    text:
                      "A defined MSS or CHoCH can be used as confirmation if it is part of the tested strategy.",
                  },
                  {
                    title: "Logical Target",
                    text:
                      "There should be enough room to a meaningful target for the setup to satisfy the strategy's risk rules.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              21 — COMMON MISTAKES
          ================================================= */}

          <section
            id="liquidity-sweep-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>21 — Common Mistakes</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Common Liquidity Sweep Trading Mistakes
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                Liquidity concepts become unreliable when definitions change
                from chart to chart. Many mistakes come from labeling price
                retrospectively rather than following a fixed process.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  [
                    "01",
                    "Calling Every Wick a Liquidity Sweep",
                    "A wick through a random minor level is not automatically meaningful. Define which liquidity levels qualify before the event.",
                  ],
                  [
                    "02",
                    "Entering Before the Sweep Happens",
                    "Anticipating a stop run is different from trading a confirmed sweep. Price can reach the level and continue straight through it.",
                  ],
                  [
                    "03",
                    "Ignoring the Difference Between Sweep and Breakout",
                    "If price accepts beyond the level and continues, repeatedly fading the move can turn a failed reversal idea into a series of losses.",
                  ],
                  [
                    "04",
                    "Forcing MSS or CHoCH Labels",
                    "Market structure terminology should be mechanically defined rather than adjusted after seeing which swing produced the winning trade.",
                  ],
                  [
                    "05",
                    "Chasing Displacement",
                    "Entering after a large move away from the sweep can materially change stop distance and reward-to-risk compared with the tested entry.",
                  ],
                  [
                    "06",
                    "Using Excessive Leverage",
                    "A visually attractive setup does not justify uncontrolled risk. Liquidity sweeps can fail like any other price-action pattern.",
                  ],
                  [
                    "07",
                    "Ignoring News and Execution Conditions",
                    "Spreads, slippage and volatility can expand around major releases and session transitions, affecting actual fills and stop execution.",
                  ],
                  [
                    "08",
                    "Backtesting With Hindsight",
                    "Selecting only obvious historical sweeps after the reversal has occurred can dramatically overstate the usefulness of the setup.",
                  ],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 pl-[48px] text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              22 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="liquidity-sweep-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>22 — Risk Management</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Risk Management for Liquidity Sweep Trading
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                A liquidity sweep is not a certainty. Even a setup that matches
                every predefined condition can fail. Risk management therefore
                needs to be part of the strategy itself rather than something
                added after the entry is selected.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                  <h3 className="text-[16px] font-black text-slate-950">
                    Risk Should Be Defined Before Entry
                  </h3>

                  <div className="mt-4 space-y-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                    <p>
                      Determine where the setup is structurally invalid before
                      calculating position size.
                    </p>
                    <p>
                      Define the maximum account risk allowed by your trading
                      plan.
                    </p>
                    <p>
                      Calculate position size from the entry-to-stop distance,
                      not from how confident the chart appears.
                    </p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                  <h3 className="text-[16px] font-black text-slate-950">
                    Account for Real Execution
                  </h3>

                  <div className="mt-4 space-y-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                    <p>
                      Spread can widen and affect both entry and stop distance.
                    </p>
                    <p>
                      Slippage means an actual stop fill may differ from the
                      requested price.
                    </p>
                    <p>
                      Leveraged products can amplify losses as well as gains,
                      particularly during volatile market conditions.
                    </p>
                  </div>
                </div>
              </div>

              <ImportantBox title="Risk percentage is a trading-plan decision, not a universal rule">
                You may see fixed percentages recommended online, but there is
                no single risk level appropriate for every trader, instrument
                or account. The important principle is to define a maximum
                acceptable loss and size positions consistently around it.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              23 — BACKTESTING
          ================================================= */}

          <section
            id="liquidity-sweep-backtesting"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>23 — Backtesting</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                How to Backtest a Liquidity Sweep Strategy Properly
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                Liquidity sweep strategies can look extremely convincing on
                completed charts because successful examples are easy to
                identify after the reversal. A useful backtest needs to remove
                as much hindsight as possible and force the same definitions
                to be applied to winning and losing setups.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["1", "Choose One Market", "Avoid changing instruments every time the strategy performs poorly."],
                  ["2", "Choose Fixed Timeframes", "Define context, setup and execution timeframes before testing."],
                  ["3", "Define Valid Liquidity", "Specify exactly which highs, lows or session levels qualify."],
                  ["4", "Define the Sweep", "State whether a wick is enough and whether price must close back inside."],
                  ["5", "Define Confirmation", "Write objective MSS, CHoCH, displacement or reclaim rules."],
                  ["6", "Define Entry", "Use one consistent entry model rather than selecting the best historical fill."],
                  ["7", "Define Stop & Target", "Set structural rules before reviewing the outcome."],
                  ["8", "Include Costs", "Consider spread, commission and reasonable execution assumptions."],
                  ["9", "Record Every Setup", "Track valid losses and missed trades, not only attractive winners."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-950">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Do not optimize the rules until every historical trade looks perfect">
                Excessively changing the liquidity definition, session,
                timeframe, confirmation or stop after reviewing historical
                results can create a model fitted to past data rather than a
                repeatable trading process.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              24 — BEGINNER ROADMAP
          ================================================= */}

          <section
            id="liquidity-sweep-beginners"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>24 — Beginner Roadmap</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                How Beginners Can Learn Liquidity Sweep Trading
              </h2>

              <p className="mt-5 max-w-[1160px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                Beginners often make liquidity trading unnecessarily complex
                by trying to learn every SMC term at once. A simpler approach
                is to master the sequence in stages.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  ["STEP 1", "Learn Market Structure", "Understand swing highs, swing lows, trends and ranges before adding liquidity terminology."],
                  ["STEP 2", "Mark Obvious Liquidity", "Practice identifying equal highs/lows, major swings, PDH/PDL and range boundaries."],
                  ["STEP 3", "Study Sweep vs Breakout", "Learn to distinguish rejection and reclaim from genuine acceptance beyond a level."],
                  ["STEP 4", "Add One Confirmation", "Start with a single structure confirmation rather than stacking many indicators and concepts."],
                  ["STEP 5", "Add Entry Refinement", "Only after the sequence is clear should you test FVG or order block retracement entries."],
                  ["STEP 6", "Backtest Before Risking Capital", "Collect a meaningful sample and study both winning and losing conditions."],
                ].map(([step, title, text]) => (
                  <div
                    key={step}
                    className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[9px] font-black text-[#1E5BB8]">
                        {step}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              25 — CHECKLIST
          ================================================= */}

          <section
            id="liquidity-sweep-checklist"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>25 — Trading Checklist</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-white sm:text-[31px]">
                Liquidity Sweep Trading Checklist
              </h2>

              <p className="mt-5 max-w-[1100px] text-[14px] font-medium leading-8 text-slate-300 sm:text-[16px] sm:leading-9">
                Before treating a move as a tradable liquidity sweep, check
                whether the setup satisfies the rules you defined in your
                trading plan.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Is the liquidity level clearly identifiable before the move?",
                  "Is it buy-side liquidity or sell-side liquidity?",
                  "Did price actually trade through the predefined level?",
                  "Did price fail to maintain acceptance beyond the level?",
                  "Has the level been reclaimed according to your rules?",
                  "Did meaningful displacement occur after the sweep?",
                  "Did your required MSS, CHoCH or BOS confirmation occur?",
                  "Is there a valid FVG, order block or entry trigger?",
                  "Is the structural invalidation point clearly defined?",
                  "Is there a logical opposing liquidity target?",
                  "Does the setup meet your minimum risk-to-reward rule?",
                  "Has position size been calculated from the allowed risk?",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-[10px] font-black text-blue-300">
                      {index + 1}
                    </span>

                    <p className="text-[13px] font-semibold leading-7 text-slate-200 sm:text-[14px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[20px] border border-blue-400/20 bg-blue-500/10 p-5">
                <h3 className="text-[15px] font-black text-white">
                  The setup is allowed to be skipped.
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-8 text-slate-300 sm:text-[14px]">
                  If the liquidity level, confirmation, invalidation or target
                  is unclear, there is no requirement to force the chart into
                  the model. Selectivity is part of a rules-based process.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              26 — FAQ
          ================================================= */}

          <section
            id="liquidity-sweep-faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>26 — Frequently Asked Questions</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Liquidity Sweep Trading FAQ
              </h2>

              <p className="mt-5 max-w-[1100px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                These answers cover common questions traders search for when
                learning liquidity sweeps, liquidity grabs and Smart Money
                Concepts.
              </p>

              <div className="mt-7 space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="pt-1 text-[14px] font-black leading-6 text-slate-950 sm:text-[15px]">
                          {item.question}
                        </h3>
                      </div>

                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[16px] font-bold text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <p className="mt-4 pl-11 text-[13px] font-medium leading-8 text-slate-600 sm:text-[14px]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              27 — SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>27 — Strategy Summary</SectionLabel>

              <h2 className="text-[25px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[31px]">
                Liquidity Sweep Strategy: Key Takeaways
              </h2>

              <div className="mt-5 max-w-[1160px] space-y-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[16px] sm:leading-9">
                <p>
                  A <strong>liquidity sweep</strong> describes price trading
                  through a visible high, low or other liquidity reference and
                  then failing to sustain the move beyond it. Traders commonly
                  monitor <strong>buy-side liquidity</strong> above highs and{" "}
                  <strong>sell-side liquidity</strong> below lows.
                </p>

                <p>
                  The sweep itself does not guarantee a reversal. Traders may
                  use a <strong>reclaim</strong>,{" "}
                  <strong>displacement</strong>,{" "}
                  <strong>Market Structure Shift (MSS)</strong>,{" "}
                  <strong>CHoCH</strong> or another predefined trigger to
                  determine whether the failed break is developing into a
                  potential reversal.
                </p>

                <p>
                  After confirmation, a retracement into a{" "}
                  <strong>Fair Value Gap</strong> or{" "}
                  <strong>Order Block</strong> can provide an entry framework,
                  while the sweep extreme may serve as a structural
                  invalidation reference and opposing liquidity may provide a
                  potential target.
                </p>

                <p>
                  Most importantly, liquidity terminology should be converted
                  into objective rules. A useful strategy must define the
                  level, sweep, confirmation, entry, stop, target and risk{" "}
                  <strong>before</strong> the historical outcome is known.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["1", "Find Liquidity", "Mark the level before price reaches it."],
                  ["2", "Wait for Sweep", "Let price trade through the predefined level."],
                  ["3", "Confirm Failure", "Use reclaim, displacement and structure rules."],
                  ["4", "Manage Risk", "Define entry, invalidation, target and position size."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-950">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              RELATED CONCEPTS
          ================================================= */}

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-9">
            <SectionLabel>Continue Learning</SectionLabel>

            <h2 className="text-[23px] font-black tracking-[-0.02em] text-slate-950 sm:text-[27px]">
              Related Trading Concepts
            </h2>

            <p className="mt-4 max-w-[1000px] text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
              Liquidity sweeps are often studied alongside market structure,
              Fair Value Gaps, Order Blocks and supply-and-demand analysis.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/en/strategies/order-blocks",
                  title: "Order Blocks",
                  text: "Learn how traders define and refine bullish and bearish order blocks.",
                },
                {
                  href: "/en/strategies/fair-value-gap",
                  title: "Fair Value Gaps",
                  text: "Understand imbalance zones and FVG retracement models.",
                },
                {
                  href: "/en/strategies/supply-demand",
                  title: "Supply & Demand",
                  text: "Study price zones where strong directional moves originate.",
                },
                {
                  href: "/en/strategies",
                  title: "Trading Strategies",
                  text: "Explore more educational trading strategies and price-action guides.",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[20px] border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <h3 className="text-[15px] font-black text-slate-950 transition group-hover:text-[#1E5BB8]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600">
                    {item.text}
                  </p>

                  <span className="mt-4 inline-flex text-[12px] font-black text-[#1E5BB8]">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="relative overflow-hidden rounded-[30px] bg-slate-950 p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-28 left-16 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">
                BROKER ALARAB EDUCATION
              </span>

              <h2 className="mt-3 max-w-[850px] text-[26px] font-black leading-[1.2] tracking-[-0.025em] text-white sm:text-[34px]">
                Build the Strategy Around Rules, Not Hindsight
              </h2>

              <p className="mt-5 max-w-[900px] text-[14px] font-medium leading-8 text-slate-300 sm:text-[16px] sm:leading-9">
                Study the concepts, define the rules, test the setup across a
                meaningful sample and evaluate both successful and failed
                liquidity sweeps before using the framework in live trading.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/en/strategies"
                  className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-5 py-3 text-[13px] font-black text-white transition hover:bg-[#1d4ed8]"
                >
                  Explore Trading Strategies
                </Link>

                <Link
                  href="/en/tools"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3 text-[13px] font-black text-white transition hover:bg-white/[0.1]"
                >
                  Trading Calculators
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <section className="rounded-[22px] border border-slate-200 bg-slate-100/70 p-5 sm:p-6">
            <h2 className="text-[14px] font-black text-slate-900">
              Educational Disclaimer
            </h2>

            <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
              This content is provided for educational and informational
              purposes only and does not constitute investment advice,
              financial advice, trading advice or a recommendation to buy or
              sell any financial instrument. Liquidity sweeps, Smart Money
              Concepts, market structure, Fair Value Gaps and Order Blocks are
              analytical frameworks and do not guarantee future price
              movements. Trading leveraged financial products involves
              significant risk and may not be suitable for every investor.
              Always conduct your own research and consider your financial
              circumstances, objectives and risk tolerance before trading.
            </p>
          </section>
        </article>
      </div>

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <style>{`
        .liquidity-centered-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .liquidity-centered-scroll::-webkit-scrollbar {
          height: 7px;
        }

        .liquidity-centered-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .liquidity-centered-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }
      `}</style>
    </main>
  );
}