import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

/* =========================================================
   SEO
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies`;

export const metadata: Metadata = {
  title: "Forex Trading Strategies: 10 Strategies Explained",
  description:
    "Explore 10 forex trading strategies including price action, scalping, swing trading, trend following, ICT, SMC, order blocks and liquidity sweeps. Compare styles, timeframes and difficulty.",

  keywords: [
    "forex trading strategies",
    "forex strategies",
    "best forex trading strategies",
    "forex strategies for beginners",
    "forex trading strategy",
    "price action strategy",
    "scalping strategy",
    "swing trading strategy",
    "trend following strategy",
    "RSI trading strategy",
    "ICT trading strategy",
    "smart money concepts",
    "SMC trading",
    "supply and demand trading",
    "order block trading",
    "liquidity sweep strategy",
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: `${BASE_URL}/strategies`,
      "x-default": PAGE_URL,
    },
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Forex Trading Strategies: 10 Strategies Explained",
    description:
      "Compare popular forex trading strategies by trading style, timeframe, difficulty and core market concept.",
    siteName: "Broker Alarab",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Forex Trading Strategies: 10 Strategies Explained",
    description:
      "Explore price action, scalping, swing trading, ICT, SMC, order blocks, liquidity sweeps and other forex trading strategies.",
  },
};

/* =========================================================
   TYPES
========================================================= */

type Strategy = {
  number: string;
  title: string;
  href: string;
  description: string;
  level: string;
  style: string;
  timeframe: string;
  focus: string;
  tags: string[];
  featured?: boolean;
};

type FAQ = {
  question: string;
  answer: string;
};

/* =========================================================
   STRATEGIES
========================================================= */

const strategies: Strategy[] = [
  {
    number: "01",
    title: "Price Action Trading Strategy",
    href: "/en/strategies/price-action",
    description:
      "Learn to read price movement, market structure, support and resistance, breakouts and retests without relying entirely on indicators.",
    level: "Beginner → Intermediate",
    style: "Price Action",
    timeframe: "Multiple",
    focus: "Market Structure",
    tags: ["Price Action", "Structure", "Support & Resistance"],
    featured: true,
  },
  {
    number: "02",
    title: "Forex Scalping Strategy",
    href: "/en/strategies/scalping",
    description:
      "A fast-paced approach focused on short price movements where execution speed, spreads and disciplined risk management matter.",
    level: "Intermediate → Advanced",
    style: "Very Short Term",
    timeframe: "1m – 5m",
    focus: "Execution",
    tags: ["Scalping", "Intraday", "Short Term"],
  },
  {
    number: "03",
    title: "Swing Trading Strategy",
    href: "/en/strategies/swing-trading",
    description:
      "Trade broader market swings that may develop over several days or weeks using trends, swing highs, swing lows and pullbacks.",
    level: "Beginner → Intermediate",
    style: "Medium Term",
    timeframe: "1H – Daily",
    focus: "Swing Structure",
    tags: ["Swing Trading", "Pullbacks", "Trend"],
    featured: true,
  },
  {
    number: "04",
    title: "Trend Following Strategy",
    href: "/en/strategies/trend-following",
    description:
      "Identify an established trend and look for structured opportunities to participate through pullbacks or breakouts instead of predicting tops and bottoms.",
    level: "Beginner → Intermediate",
    style: "Trend Based",
    timeframe: "Multiple",
    focus: "Trend",
    tags: ["Trend", "Pullback", "Breakout"],
  },
  {
    number: "05",
    title: "RSI Trading Strategy",
    href: "/en/strategies/rsi",
    description:
      "Use the Relative Strength Index to study momentum, the 70/30 and 50 levels, and divergence within the wider price-action context.",
    level: "Beginner → Intermediate",
    style: "Indicator Based",
    timeframe: "Multiple",
    focus: "Momentum",
    tags: ["RSI 14", "Divergence", "Momentum"],
  },
  {
    number: "06",
    title: "ICT Trading Strategy",
    href: "/en/strategies/ict",
    description:
      "Study liquidity, market structure, fair value gaps, order blocks and structural shifts within an ICT-style trading framework.",
    level: "Intermediate → Advanced",
    style: "Price Action",
    timeframe: "Multiple",
    focus: "Liquidity",
    tags: ["ICT", "Liquidity", "FVG"],
    featured: true,
  },
  {
    number: "07",
    title: "Smart Money Concepts Strategy",
    href: "/en/strategies/smart-money-concepts",
    description:
      "Explore the SMC framework through market structure, liquidity, BOS, CHoCH and areas of interest used to organize price-action analysis.",
    level: "Intermediate → Advanced",
    style: "SMC",
    timeframe: "Multiple",
    focus: "Market Structure",
    tags: ["SMC", "BOS", "CHoCH"],
  },
  {
    number: "08",
    title: "Supply and Demand Trading Strategy",
    href: "/en/strategies/supply-and-demand",
    description:
      "Learn how traders identify supply and demand zones, evaluate the departure from a zone and distinguish fresh areas from previously tested zones.",
    level: "Intermediate",
    style: "Price Zones",
    timeframe: "Multiple",
    focus: "Supply / Demand",
    tags: ["Supply", "Demand", "Zones"],
  },
  {
    number: "09",
    title: "Order Block Trading Strategy",
    href: "/en/strategies/order-blocks",
    description:
      "Learn how order blocks are identified and combined with displacement, market structure, liquidity, entries and structural invalidation.",
    level: "Intermediate → Advanced",
    style: "SMC / ICT",
    timeframe: "Multiple",
    focus: "Order Blocks",
    tags: ["Order Blocks", "Displacement", "BOS"],
  },
  {
    number: "10",
    title: "Liquidity Sweep Trading Strategy",
    href: "/en/strategies/liquidity-sweep",
    description:
      "Learn where liquidity may cluster around visible highs and lows, how traders identify liquidity sweeps and how they distinguish a sweep from a genuine breakout.",
    level: "Intermediate → Advanced",
    style: "Liquidity",
    timeframe: "Multiple",
    focus: "BSL / SSL",
    tags: ["Liquidity Sweep", "BSL", "SSL"],
    featured: true,
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqItems: FAQ[] = [
  {
    question: "What is a forex trading strategy?",
    answer:
      "A forex trading strategy is a defined set of rules for analyzing the market, identifying setups, entering trades, setting invalidation, managing risk and planning exits. A useful strategy should be specific enough to test consistently rather than changing after every trade.",
  },
  {
    question: "What is the best forex trading strategy for beginners?",
    answer:
      "There is no single best strategy for every beginner. Price action and trend-following approaches can provide a useful foundation because they help traders understand market structure, trends and key price levels before adding more complex concepts.",
  },
  {
    question: "What is the difference between scalping and swing trading?",
    answer:
      "Scalping focuses on very short-term price movements and usually requires frequent market monitoring. Swing trading targets broader price moves and positions may remain open for several days or longer.",
  },
  {
    question: "Can I use more than one forex strategy?",
    answer:
      "Yes, but combining too many strategies without clear rules can create conflicting signals. It is generally more useful to understand and test one approach first, then add other concepts only when they have a specific role in the trading plan.",
  },
  {
    question: "Are ICT and Smart Money Concepts suitable for beginners?",
    answer:
      "Beginners can study them, but concepts such as liquidity, fair value gaps, order blocks, BOS and CHoCH can become complicated without a basic understanding of price action and market structure.",
  },
  {
    question: "Is there a forex strategy that guarantees profits?",
    answer:
      "No. Every strategy can experience losing trades and unfavorable market conditions. Risk management, position sizing, testing and consistent execution remain important regardless of the trading approach.",
  },
];

/* =========================================================
   SCHEMA
========================================================= */

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Forex Trading Strategies",
  description:
    "A practical collection of forex trading strategies covering different trading styles, timeframes and market-analysis frameworks.",
  url: PAGE_URL,
  inLanguage: "en",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: strategies.length,
    itemListElement: strategies.map((strategy, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: strategy.title,
      url: `${BASE_URL}${strategy.href}`,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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
      name: "Forex Trading Strategies",
      item: PAGE_URL,
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
   SMALL COMPONENTS
========================================================= */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black tracking-[0.08em] text-slate-700">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
      {children}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* =========================================================
   HERO GRAPHIC
========================================================= */

function StrategyIcon() {
  return (
    <svg
      viewBox="0 0 560 390"
      className="h-auto w-full"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="strategyHeroGridEn"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M32 0H0V32"
            stroke="#e2e8f0"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
      </defs>

      <rect
        x="1"
        y="1"
        width="558"
        height="388"
        rx="30"
        fill="#f8fafc"
        stroke="#e2e8f0"
      />

      <rect
        x="20"
        y="20"
        width="520"
        height="350"
        rx="22"
        fill="url(#strategyHeroGridEn)"
      />

      <rect
        x="56"
        y="48"
        width="448"
        height="52"
        rx="16"
        fill="white"
        stroke="#e2e8f0"
      />

      <circle cx="84" cy="74" r="10" fill="#0f172a" />
      <rect x="106" y="64" width="126" height="9" rx="4.5" fill="#0f172a" />
      <rect x="106" y="79" width="82" height="7" rx="3.5" fill="#cbd5e1" />

      <path
        d="M72 276L120 245L164 256L212 200L256 217L307 153L354 174L410 109L472 130"
        stroke="#0f172a"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="120"
        cy="245"
        r="7"
        fill="white"
        stroke="#0f172a"
        strokeWidth="4"
      />
      <circle
        cx="212"
        cy="200"
        r="7"
        fill="white"
        stroke="#0f172a"
        strokeWidth="4"
      />
      <circle
        cx="307"
        cy="153"
        r="7"
        fill="white"
        stroke="#0f172a"
        strokeWidth="4"
      />
      <circle
        cx="410"
        cy="109"
        r="7"
        fill="white"
        stroke="#0f172a"
        strokeWidth="4"
      />

      <rect
        x="55"
        y="304"
        width="450"
        height="44"
        rx="14"
        fill="white"
        stroke="#e2e8f0"
      />

      <rect x="74" y="318" width="80" height="16" rx="8" fill="#e2e8f0" />
      <rect x="165" y="318" width="80" height="16" rx="8" fill="#cbd5e1" />
      <rect x="256" y="318" width="80" height="16" rx="8" fill="#94a3b8" />
      <rect x="347" y="318" width="139" height="16" rx="8" fill="#0f172a" />

      <g transform="translate(436 185)">
        <circle
          cx="0"
          cy="0"
          r="45"
          fill="white"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        <circle
          cx="0"
          cy="0"
          r="26"
          fill="#f1f5f9"
          stroke="#0f172a"
          strokeWidth="3"
        />
        <circle cx="0" cy="0" r="8" fill="#0f172a" />
        <path
          d="M0-58V-40M0 40V58M-58 0H-40M40 0H58"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* =========================================================
   LEARNING MAP
========================================================= */

function LearningMapGraphic() {
  return (
    <div className="mt-6 hidden overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 lg:block">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-black text-slate-400">
            BEGINNER ROADMAP
          </div>

          <div className="mt-1 text-[13px] font-black text-slate-900">
            From foundations to advanced concepts
          </div>
        </div>

        <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-black text-slate-500 shadow-sm">
          4 stages
        </span>
      </div>

      <div className="relative">
        <div className="absolute bottom-5 left-[18px] top-5 w-px bg-slate-200" />

        {[
          ["01", "Price Action", "Structure and key price levels"],
          ["02", "Trading Style", "Scalping, swing or trend"],
          ["03", "Analysis Tools", "RSI and supply & demand"],
          ["04", "Advanced Concepts", "ICT, SMC and liquidity"],
        ].map(([n, title, text]) => (
          <div key={n} className="relative flex items-center gap-3 py-2.5">
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[9px] font-black text-slate-900 shadow-sm">
              {n}
            </span>

            <div>
              <div className="text-[12px] font-black text-slate-900">
                {title}
              </div>

              <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                {text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MINI CHART
========================================================= */

function MiniChart({ type }: { type: number }) {
  const charts = [
    "M8 52 L25 43 L40 47 L57 30 L73 35 L92 18",
    "M8 25 L23 38 L39 30 L55 45 L72 37 L92 53",
    "M8 48 L22 34 L37 39 L51 25 L67 31 L80 17 L92 22",
    "M8 45 L24 45 L35 33 L50 33 L62 21 L78 21 L92 11",
  ];

  return (
    <svg
      viewBox="0 0 100 64"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of price movement"
    >
      <defs>
        <pattern
          id={`miniGridEn-${type}`}
          width="20"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0H0V16"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="0.7"
          />
        </pattern>
      </defs>

      <rect width="100" height="64" fill="#f8fafc" />
      <rect width="100" height="64" fill={`url(#miniGridEn-${type})`} />

      <path
        d={charts[type % charts.length]}
        fill="none"
        stroke="#0f172a"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="92"
        cy={type % 2 === 0 ? "18" : "53"}
        r="3"
        fill="#ffffff"
        stroke="#0f172a"
        strokeWidth="2"
      />
    </svg>
  );
}

/* =========================================================
   STRATEGY CARD
========================================================= */

function StrategyCard({
  strategy,
  index,
}: {
  strategy: Strategy;
  index: number;
}) {
  return (
    <Link
      href={strategy.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
    >
      {strategy.featured && (
        <div className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1 text-[9px] font-black text-slate-700 shadow-sm backdrop-blur">
          Featured Guide
        </div>
      )}

      <div className="h-[105px] overflow-hidden border-b border-slate-100 sm:h-[120px]">
        <MiniChart type={index} />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-black text-slate-500">
              {strategy.number} — FOREX STRATEGY
            </div>

            <h2 className="mt-2 text-[18px] font-black leading-7 text-slate-950 sm:text-[20px]">
              {strategy.title}
            </h2>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition group-hover:bg-slate-950 group-hover:text-white">
            <ArrowIcon />
          </span>
        </div>

        <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600 sm:mt-4 sm:text-[14px] sm:leading-8">
          {strategy.description}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5">
          <div className="rounded-xl bg-slate-50 p-2.5">
            <div className="text-[9px] font-black text-slate-400">
              DIFFICULTY
            </div>
            <div className="mt-1 text-[10px] font-black leading-5 text-slate-700 sm:text-[11px]">
              {strategy.level}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5">
            <div className="text-[9px] font-black text-slate-400">
              TIMEFRAME
            </div>
            <div className="mt-1 text-[10px] font-black leading-5 text-slate-700 sm:text-[11px]">
              {strategy.timeframe}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5">
            <div className="text-[9px] font-black text-slate-400">
              FOCUS
            </div>
            <div className="mt-1 truncate text-[10px] font-black leading-5 text-slate-700 sm:text-[11px]">
              {strategy.focus}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
          {strategy.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 sm:pt-6">
          <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-[12px] font-black text-slate-900 sm:text-[13px]">
            <span>Read the full guide</span>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function StrategiesHubPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="mx-auto w-full max-w-[1520px] px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="space-y-5 sm:space-y-8">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[30px]">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-slate-950" />

            <div className="absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-slate-100 blur-3xl" />
            <div className="absolute -bottom-32 left-0 h-[280px] w-[280px] rounded-full bg-slate-50 blur-3xl" />

            <div className="relative grid items-center gap-7 p-5 sm:p-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:p-10 xl:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black text-slate-700">
                    FOREX STRATEGY HUB
                  </span>

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                    10 Strategies
                  </span>

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                    Beginner to Advanced
                  </span>
                </div>

                <h1 className="mt-5 max-w-[920px] text-[30px] font-black leading-[1.18] tracking-[-0.035em] text-slate-950 sm:mt-6 sm:text-[41px] lg:text-[49px]">
                  Forex Trading Strategies:
                  <span className="block text-slate-600">
                    A Practical Guide to Choosing the Right Strategy
                  </span>
                </h1>

                <p className="mt-4 max-w-[900px] text-[14px] font-medium leading-8 text-slate-700 sm:mt-5 sm:text-[16px] sm:leading-9">
                  Explore 10 forex trading strategies in one place, from price
                  action, scalping and swing trading to ICT, Smart Money
                  Concepts, order blocks and liquidity sweeps. Compare how each
                  approach works, the timeframes it is commonly used on and the
                  level of experience it may require.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                  <a
                    href="#all-strategies"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-black text-white transition hover:bg-slate-800"
                  >
                    Explore Strategies
                    <span>↓</span>
                  </a>

                  <a
                    href="#choose-strategy"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-black text-slate-700 transition hover:bg-slate-50"
                  >
                    How Do I Choose?
                  </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3 lg:grid-cols-4">
                  {[
                    ["10", "Strategy Guides"],
                    ["4", "Core Styles"],
                    ["Multiple", "Timeframes"],
                    ["Practical", "Step-by-Step"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[16px] border border-slate-200 bg-white/80 p-3 sm:rounded-[18px] sm:p-4"
                    >
                      <div className="text-[17px] font-black text-slate-950 sm:text-[21px]">
                        {value}
                      </div>

                      <div className="mt-1 text-[10px] font-bold text-slate-500 sm:text-[12px]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto hidden w-full max-w-[520px] lg:block">
                <StrategyIcon />
              </div>
            </div>
          </section>

          {/* =================================================
              CHOOSE
          ================================================= */}

          <section
            id="choose-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>CHOOSE BY TRADING STYLE</SectionLabel>

              <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
                <div>
                  <h2 className="text-[23px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[30px]">
                    Which Forex Trading Strategy Fits You?
                  </h2>

                  <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                    Instead of asking which strategy makes the most money, start
                    with how much time you can dedicate to trading, how quickly
                    you prefer to make decisions, which timeframes you want to
                    monitor and how experienced you are with chart analysis.
                  </p>

                  <p className="mt-3 text-[14px] font-medium leading-8 text-slate-700 sm:mt-4 sm:text-[15px] sm:leading-9">
                    Choose the situation that sounds closest to you to open the
                    most relevant strategy guide.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      n: "01",
                      title: "I prefer fast-paced trading",
                      text: "If you can monitor the market closely and prefer short-duration trades, start with forex scalping.",
                      strategy: "Forex Scalping Strategy",
                      href: "/en/strategies/scalping",
                    },
                    {
                      n: "02",
                      title: "I cannot watch charts all day",
                      text: "If you prefer broader price movements and trades that may remain open for days, explore swing trading.",
                      strategy: "Swing Trading Strategy",
                      href: "/en/strategies/swing-trading",
                    },
                    {
                      n: "03",
                      title: "I want to understand price first",
                      text: "If your priority is understanding structure, trends and key levels, price action is a logical starting point.",
                      strategy: "Price Action Strategy",
                      href: "/en/strategies/price-action",
                    },
                    {
                      n: "04",
                      title: "I want to study liquidity and structure",
                      text: "If you already understand basic price action and want a more advanced framework, explore Smart Money Concepts.",
                      strategy: "Smart Money Concepts",
                      href: "/en/strategies/smart-money-concepts",
                    },
                  ].map((item) => (
                    <Link
                      key={item.n}
                      href={item.href}
                      className="group rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm sm:rounded-[20px] sm:p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-slate-700 shadow-sm">
                          {item.n}
                        </span>

                        <h3 className="text-[13px] font-black leading-6 text-slate-900 sm:text-[14px]">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                        {item.text}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-[11px] font-black text-slate-900">
                        <span>{item.strategy}</span>
                        <ArrowIcon />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              ALL STRATEGIES
          ================================================= */}

          <section
            id="all-strategies"
            className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-7 lg:p-9"
          >
            <SectionLabel>ALL GUIDES</SectionLabel>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[23px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[30px]">
                  Explore Forex Trading Strategies
                </h2>

                <p className="mt-3 max-w-[900px] text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
                  Each guide explains the strategy, core market concepts,
                  common entry logic, invalidation, risk management and common
                  mistakes.
                </p>
              </div>

              <div className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-black text-slate-500">
                10 Educational Guides
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2 xl:grid-cols-3">
              {strategies.map((strategy, index) => (
                <StrategyCard
                  key={strategy.href}
                  strategy={strategy}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* =================================================
              COMPARISON
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>QUICK COMPARISON</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[30px]">
                Compare Forex Strategies by Style and Timeframe
              </h2>

              <p className="mt-4 max-w-[1050px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                This comparison does not rank one strategy above another.
                Instead, it shows how the approaches differ in trading style,
                timeframe, difficulty and analytical focus. Click any strategy
                to open the full guide.
              </p>

              {/* DESKTOP TABLE */}

              <div className="mt-7 hidden overflow-hidden rounded-[20px] border border-slate-200 lg:block">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        Strategy
                      </th>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        Style
                      </th>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        Timeframe
                      </th>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        Difficulty
                      </th>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        Focus
                      </th>
                      <th className="w-[90px] px-5 py-4" />
                    </tr>
                  </thead>

                  <tbody>
                    {strategies.map((strategy) => (
                      <tr
                        key={strategy.href}
                        className="border-t border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <Link
                            href={strategy.href}
                            className="group/title inline-flex items-center gap-2"
                          >
                            <span className="text-[13px] font-black text-slate-900 transition group-hover/title:text-slate-600">
                              {strategy.title}
                            </span>

                            <span className="text-slate-400 transition group-hover/title:translate-x-1">
                              <ArrowIcon />
                            </span>
                          </Link>
                        </td>

                        <td className="px-5 py-4 text-[12px] font-bold text-slate-600">
                          {strategy.style}
                        </td>

                        <td className="px-5 py-4 text-[12px] font-bold text-slate-600">
                          {strategy.timeframe}
                        </td>

                        <td className="px-5 py-4 text-[12px] font-bold text-slate-600">
                          {strategy.level}
                        </td>

                        <td className="px-5 py-4 text-[12px] font-bold text-slate-600">
                          {strategy.focus}
                        </td>

                        <td className="px-5 py-4">
                          <Link
                            href={strategy.href}
                            aria-label={`Read ${strategy.title}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            <ArrowIcon />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE COMPARISON */}

              <div className="mt-6 grid gap-3 lg:hidden">
                {strategies.map((strategy) => (
                  <Link
                    key={strategy.href}
                    href={strategy.href}
                    className="rounded-[18px] border border-slate-200 bg-slate-50/40 p-4 transition active:bg-slate-100"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[14px] font-black leading-6 text-slate-900">
                        {strategy.title}
                      </h3>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                        <ArrowIcon />
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-white p-3">
                        <div className="text-[9px] font-black text-slate-400">
                          DIFFICULTY
                        </div>

                        <div className="mt-1 text-[11px] font-black text-slate-700">
                          {strategy.level}
                        </div>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <div className="text-[9px] font-black text-slate-400">
                          TIMEFRAME
                        </div>

                        <div className="mt-1 text-[11px] font-black text-slate-700">
                          {strategy.timeframe}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
                    {/* =================================================
              LEARNING PATH
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>LEARNING PATH</SectionLabel>

              <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-9">
                <div>
                  <h2 className="text-[23px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[30px]">
                    Where Should a Beginner Start?
                  </h2>

                  <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                    Trying to learn ten strategies at the same time usually
                    creates more confusion than clarity. A more structured
                    approach is to build your knowledge in stages because many
                    advanced strategies depend on concepts that begin with price
                    action and market structure.
                  </p>

                  <Link
                    href="/en/learn-trading"
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-black text-slate-900 transition hover:text-slate-600 sm:mt-6"
                  >
                    Go to the Trading Education Hub
                    <ArrowIcon />
                  </Link>

                  <LearningMapGraphic />
                </div>

                <div className="space-y-3">
                  <Link
                    href="/en/strategies/price-action"
                    className="group flex gap-3 rounded-[18px] border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50 sm:gap-4 sm:rounded-[20px] sm:p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700 sm:h-10 sm:w-10">
                      01
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                          Start with Price Action
                        </h3>

                        <span className="shrink-0 text-slate-400 transition group-hover:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </div>

                      <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                        Learn trends, swing highs and lows, support, resistance
                        and basic market structure before adding more complex
                        frameworks.
                      </p>
                    </div>
                  </Link>

                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 sm:rounded-[20px] sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700 sm:h-10 sm:w-10">
                        02
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                          Choose a Trading Style
                        </h3>

                        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                          Decide whether you prefer fast trades, broader market
                          swings or a strategy focused on staying with an
                          established trend.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Link
                            href="/en/strategies/scalping"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            Scalping
                          </Link>

                          <Link
                            href="/en/strategies/swing-trading"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            Swing Trading
                          </Link>

                          <Link
                            href="/en/strategies/trend-following"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            Trend Following
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 sm:rounded-[20px] sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700 sm:h-10 sm:w-10">
                        03
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                          Add Analysis Tools
                        </h3>

                        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                          Once you understand price movement, you can add
                          indicators or price zones as supporting tools rather
                          than treating them as isolated trading signals.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Link
                            href="/en/strategies/rsi"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            RSI Strategy
                          </Link>

                          <Link
                            href="/en/strategies/supply-and-demand"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            Supply & Demand
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 sm:rounded-[20px] sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700 sm:h-10 sm:w-10">
                        04
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                          Move into Liquidity and Market Structure
                        </h3>

                        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                          After building a price-action foundation, concepts such
                          as liquidity, order blocks, fair value gaps and
                          structural shifts become easier to study consistently.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Link
                            href="/en/strategies/ict"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            ICT
                          </Link>

                          <Link
                            href="/en/strategies/smart-money-concepts"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            Smart Money Concepts
                          </Link>

                          <Link
                            href="/en/strategies/order-blocks"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            Order Blocks
                          </Link>

                          <Link
                            href="/en/strategies/liquidity-sweep"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            Liquidity Sweeps
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 sm:gap-4 sm:rounded-[20px] sm:p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-slate-700 shadow-sm sm:h-10 sm:w-10">
                      05
                    </span>

                    <div>
                      <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                        Turn the Strategy into Testable Rules
                      </h3>

                      <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                        Define your setup, entry, invalidation, target and risk
                        rules, then test the same definitions consistently
                        before judging the strategy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              BUILD A STRATEGY
          ================================================= */}

          <section className="overflow-hidden rounded-[22px] border border-slate-800 bg-slate-950 text-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-black text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                TRADING PLAN
              </div>

              <div className="mt-4 grid gap-5 lg:mt-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-8">
                <div>
                  <h2 className="text-[22px] font-black leading-[1.3] sm:text-[30px]">
                    Every Strategy Needs Clear Rules
                  </h2>

                  <p className="mt-3 text-[13px] font-medium leading-7 text-slate-300 sm:mt-4 sm:text-[15px] sm:leading-9">
                    Knowing the name of a strategy is not enough. Define why you
                    are entering, where the setup becomes invalid, how much you
                    are risking and how you plan to exit.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {[
                    ["01", "Context", "What is the market doing?"],
                    ["02", "Location", "Where are you watching?"],
                    ["03", "Trigger", "What confirms entry?"],
                    ["04", "Invalidation", "When is it wrong?"],
                    ["05", "Risk", "How much will you risk?"],
                    ["06", "Exit", "Where will you close?"],
                  ].map(([n, title, text]) => (
                    <div
                      key={n}
                      className="rounded-[15px] border border-white/10 bg-white/[0.04] p-3 sm:rounded-[18px] sm:p-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[9px] font-black text-slate-300 sm:h-8 sm:w-8">
                          {n}
                        </span>

                        <h3 className="text-[12px] font-black text-white sm:text-[13px]">
                          {title}
                        </h3>
                      </div>

                      <p className="mt-2 text-[10px] font-medium leading-5 text-slate-400 sm:mt-3 sm:text-[12px] sm:leading-7">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              KEY PRINCIPLES
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>BEFORE YOU TRADE</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[30px]">
                6 Principles More Important Than Finding a “Perfect” Strategy
              </h2>

              <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Know why you are entering before clicking buy or sell.",
                  "Define your stop loss before entering the position.",
                  "Match position size to the amount you are prepared to risk.",
                  "Do not rewrite the strategy rules after seeing the outcome.",
                  "Test the same definitions across a meaningful sample of setups.",
                  "Evaluate the strategy across a series of trades, not one result.",
                ].map((text, index) => (
                  <div
                    key={text}
                    className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                      <CheckIcon />
                    </span>

                    <div>
                      <div className="text-[9px] font-black text-slate-400">
                        0{index + 1}
                      </div>

                      <p className="mt-1 text-[12px] font-bold leading-7 text-slate-700 sm:text-[13px] sm:leading-8">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              FAQ
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>FAQ</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.25] tracking-[-0.025em] text-slate-950 sm:text-[30px]">
                Frequently Asked Questions About Forex Trading Strategies
              </h2>

              <p className="mt-4 max-w-[950px] text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
                Quick answers to common questions about choosing a strategy,
                trading style, experience level and testing a trading plan.
              </p>

              <div className="mt-6 grid gap-3 sm:mt-7 lg:grid-cols-2">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group rounded-[18px] border border-slate-200 bg-slate-50/40 p-4 open:bg-white sm:p-5"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-slate-700 shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="pt-0.5 text-[13px] font-black leading-6 text-slate-900 sm:text-[14px]">
                          {item.question}
                        </h3>
                      </div>

                      <span className="mt-1 text-lg font-light text-slate-400 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <p className="mt-4 border-t border-slate-100 pt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              NEXT STEP
          ================================================= */}

          <section className="relative overflow-hidden rounded-[22px] border border-slate-800 bg-slate-950 shadow-sm sm:rounded-[28px]">
            <div className="absolute -right-20 -top-20 h-[220px] w-[220px] rounded-full bg-white/[0.04] blur-3xl" />

            <div className="relative p-5 text-white sm:p-8 lg:p-9">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-7">
                <div>
                  <div className="text-[9px] font-black text-slate-400 sm:text-[10px]">
                    NEXT STEP
                  </div>

                  <h2 className="mt-2 text-[22px] font-black leading-[1.3] sm:mt-3 sm:text-[30px]">
                    Start with One Strategy and Build from There
                  </h2>

                  <p className="mt-3 max-w-[850px] text-[13px] font-medium leading-7 text-slate-300 sm:mt-4 sm:text-[15px] sm:leading-9">
                    If you are new to chart analysis, start by understanding
                    price movement and market structure before moving into more
                    complex frameworks.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row lg:flex-col xl:flex-row">
                  <Link
                    href="/en/strategies/price-action"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-center text-[11px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-[48px] sm:px-5 sm:text-[13px]"
                  >
                    Start with Price Action
                    <ArrowIcon />
                  </Link>

                  <Link
                    href="/en/learn-trading"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-3 py-3 text-center text-[11px] font-black text-white transition hover:bg-white/10 sm:min-h-[48px] sm:px-5 sm:text-[13px]"
                  >
                    Trading Education Hub
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <div className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-[12px] font-medium leading-7 text-slate-500 sm:px-5 sm:text-[13px] sm:leading-8">
            <strong className="text-slate-700">Risk notice:</strong> The strategy
            guides on this page are provided for educational purposes only and
            do not constitute investment advice or a recommendation to buy or
            sell any financial instrument. No trading strategy can guarantee
            profits, and leveraged trading can result in substantial losses.
            Test and understand any strategy before risking real capital.
          </div>
        </div>
      </div>

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
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
    </main>
  );
}