import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

/* =========================================================
   SEO
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies`;

export const metadata: Metadata = {
  title: "Forex Trading Strategies: 12 Guides and Styles Compared",
  description:
    "Explore forex trading strategies and compare 12 guides by style, timeframe and experience. Learn entry rules, stop losses, risk management and backtesting.",

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
    title: "Forex Trading Strategies: 12 Guides and Styles Compared",
    description:
      "Compare price action, scalping, swing trading, indicators, ICT and SMC. Explore practical guides to trading rules, risk management and strategy testing.",
    siteName: "Broker Alarab",
    locale: "en_US",
    alternateLocale: ["ar_AR"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Forex Trading Strategies: 12 Guides and Styles Compared",
    description:
      "Explore 12 forex strategy guides, compare trading approaches and learn how to define rules, manage risk and test results.",
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
  "Learn how to identify order blocks and connect them with market structure and liquidity, including entry conditions, stop losses and failed setups.",
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
  {
    number: "11",
    title: "Support and Resistance Trading Strategy",
    href: "/en/strategies/support-and-resistance",
    description:
      "Learn how to identify support and resistance zones, trade bounces, breakouts and retests, recognize false breakouts and plan entries, stops and targets.",
    level: "Beginner → Intermediate",
    style: "Price Action",
    timeframe: "Multiple",
    focus: "Key Levels",
    tags: ["Support", "Resistance", "Breakout"],
    featured: true,
  },
  {
    number: "12",
    title: "Moving Average Crossover Strategy",
    href: "/en/strategies/moving-average-crossover",
    description:
      "Learn how fast and slow moving averages interact, how bullish and bearish crossovers form, and how traders use SMA, EMA and trend filters.",
    level: "Beginner → Intermediate",
    style: "Indicator Based",
    timeframe: "Multiple",
    focus: "Trend",
    tags: ["Moving Average", "EMA", "Crossover"],
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqItems: FAQ[] = [
  {
    question: "What are forex trading strategies?",
    answer:
      "Forex trading strategies define how you analyze the market, enter and exit trades, and manage risk. They may use price action, indicators or support and resistance. A usable strategy also specifies its timeframe, position sizing and stop-loss rules.",
  },
  {
    question: "What is the best forex trading strategy for beginners?",
    answer:
      "No single strategy is best for every beginner. Studying price action, support and resistance or trend following can help build a foundation. Choose clear rules that suit your available time and experience, then test them on a demo account.",
  },
  {
    question: "What is the difference between scalping and swing trading?",
    answer:
      "Scalping focuses on short trades and frequent monitoring, while swing trades may last days or weeks. Spreads and execution are especially relevant to scalping; overnight costs, news and price gaps matter when holding positions longer.",
  },
  {
    question: "What is the best timeframe for forex trading?",
    answer:
      "There is no best timeframe for everyone. Shorter timeframes generally require more monitoring and make execution costs important relative to the targeted move. Choose a timeframe that fits your strategy rules, trade duration and available time, and test it before relying on it.",
  },
  {
    question: "How do you test a forex trading strategy?",
    answer:
      "Write down entry, stop-loss, take-profit and position-sizing rules. Backtest them with trading costs included, then test data you did not use to adjust the rules. Practice on a demo account and record results. Historical and demo performance do not guarantee future results.",
  },
  {
    question: "Are ICT and SMC suitable for beginners?",
    answer:
      "ICT and Smart Money Concepts include overlapping ideas such as market structure, liquidity, order blocks and fair value gaps. Understanding basic price action first can make them easier to study. Definitions vary between sources, so clear application rules are important.",
  },
  {
    question: "Are low spreads enough to choose a forex broker?",
    answer:
      "No. Compare spreads alongside commissions, execution, overnight fees and withdrawal terms. Check the legal entity, regulation and availability in your country. Low spreads alone do not establish the total trading cost or whether a broker suits your needs.",
  },
  {
    question: "Does any forex trading strategy guarantee profits?",
    answer:
      "No forex trading strategy guarantees profits. Market conditions can change and losing streaks can occur. Testing, position sizing, stop losses and risk management remain important. Past results and demo performance do not guarantee similar results in live trading.",
  },
];

/* =========================================================
   SCHEMA
========================================================= */

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Forex Trading Strategies: 12 Guides and Styles Compared",
  description:
    "Explore forex trading strategy guides, compare trading styles and learn about entry rules, stop losses, risk management and strategy testing.",
  inLanguage: "en",
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
  mainEntity: {
    "@type": "ItemList",
    "@id": `${PAGE_URL}#strategy-guides`,
    name: "Forex Trading Strategy Guides",
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
  "@id": `${PAGE_URL}#breadcrumb`,
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
  "@id": `${PAGE_URL}#faq`,
  url: `${PAGE_URL}#strategies-faq`,
  inLanguage: "en",
  isPartOf: {
    "@id": `${PAGE_URL}#webpage`,
  },
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


/* =========================================================
   PAGE
========================================================= */

export default function StrategiesHubPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-[#f6f8fb] text-slate-900">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative isolate w-full overflow-hidden border-b border-[#174373] bg-[#071a31]">
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
  >
    <div className="absolute inset-0 bg-[linear-gradient(245deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

    <div className="absolute -left-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

    <div className="absolute -bottom-72 right-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

    <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
  </div>

  <div className="relative mx-auto w-full max-w-[1520px] px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold text-blue-200/80"
    >
      <Link href="/en" className="transition hover:text-white">
        Home
      </Link>

      <span aria-hidden="true">/</span>

      <span aria-current="page" className="text-white">
        Forex Trading Strategies
      </span>
    </nav>

    <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_250px] xl:grid-cols-[minmax(0,1fr)_270px]">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-extrabold text-blue-100 sm:text-[11px]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
          From the Basics to Advanced Concepts
        </div>

        <h1 className="mt-3 text-[26px] font-black leading-[1.2] tracking-[-0.025em] text-white sm:text-[40px] lg:text-[46px] xl:text-[52px]">
          Forex Trading Strategies:
          <span className="mt-2 block text-[21px] leading-[1.35] text-[#55c3ff] sm:text-[30px] lg:text-[34px] xl:text-[38px]">
            A Practical Guide to Choosing the Right Strategy
          </span>
        </h1>

        <p className="mt-3 max-w-[1100px] text-[14px] font-medium leading-6 text-blue-100 sm:mt-4 sm:text-[16px] sm:leading-8">
          Explore 12 forex strategy guides. Compare trading styles,
          timeframes and experience levels to find the approach
          that suits you.
        </p>

        <div className="mt-4 hidden flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-blue-200 sm:flex sm:text-[11px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-cyan-400">
              <CheckIcon />
            </span>
            Concepts and Practical Application
          </span>

          <span className="inline-flex items-center gap-1.5">
            <span className="text-cyan-400">
              <CheckIcon />
            </span>
            Compare Styles and Timeframes
          </span>

          <span className="inline-flex items-center gap-1.5">
            <span className="text-cyan-400">
              <CheckIcon />
            </span>
            Risk Management and Common Mistakes
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="grid grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1">
            {[
              ["12", "Strategy Guides"],
              ["4", "Practical Comparisons"],
              ["Multiple", "Timeframes"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`px-2 py-2.5 text-center ${
                  index > 0 ? "border-l border-white/10" : ""
                }`}
              >
                <div className="text-[18px] font-black text-[#66c8ff] sm:text-[21px]">
                  {value}
                </div>

                <div className="mt-1 text-[9px] font-bold text-blue-200 sm:text-[10px]">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="#all-strategies"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#2471df] px-3 py-3 text-center text-[11px] font-black text-white transition hover:bg-[#2e7cea] sm:px-5 sm:text-[13px]"
            >
              Explore Strategies
              <span aria-hidden="true">↓</span>
            </a>

            <a
              href="#choose-strategy"
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/20 bg-white/[0.07] px-3 py-3 text-center text-[11px] font-black text-white transition hover:bg-white/[0.12] sm:px-5 sm:text-[13px]"
            >
              How Do I Choose?
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:-translate-y-6">
        <div className="rounded-[20px] border border-white/10 bg-[#0b2948]/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[10px] font-black text-white">
              From Price Action to a Trading Plan
            </span>

            <span className="shrink-0 rounded-full bg-cyan-300/10 px-2 py-1 text-[7px] font-bold text-cyan-200">
              Illustration
            </span>
          </div>

          <StrategyIcon />

          <p className="mt-3 text-center text-[9px] font-medium leading-5 text-blue-200">
            Understand trends and levels before defining entry and risk
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      <div className="mx-auto w-full max-w-[1520px] px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="space-y-5 sm:space-y-8">

      {/* =================================================
    CHOOSE A STRATEGY
================================================= */}

<section
  id="choose-strategy"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  {/* Short introduction */}
  <div className="relative border-b border-blue-100 bg-[linear-gradient(250deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      Choosing a Trading Strategy
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      Which Forex Strategy Suits You?
    </h2>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      A forex strategy defines how you analyze the market, enter and exit
      trades, and manage risk. Start with your available time, experience
      and preferred trading style; no single strategy is best for everyone.
    </p>
  </div>

  {/* Direct choices */}
  <div className="p-3 sm:p-6 lg:p-8">
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {[
        {
          n: "01",
          title: "I Prefer Fast-Paced Trading",
          text: "I have time to monitor the market closely, paying attention to spreads and execution speed.",
          strategy: "Forex Scalping Strategy",
          href: "/en/strategies/scalping",
        },
        {
          n: "02",
          title: "I Prefer Trades Lasting Days",
          text: "I prefer periodic monitoring of broader moves and understand the risks of holding positions.",
          strategy: "Swing Trading Strategy",
          href: "/en/strategies/swing-trading",
        },
        {
          n: "03",
          title: "I Want to Understand Price Action",
          text: "I want to start with trends, swing highs and lows, and support and resistance levels.",
          strategy: "Price Action Trading Strategy",
          href: "/en/strategies/price-action",
        },
        {
          n: "04",
          title: "I Want to Study Structure and Liquidity",
          text: "I understand basic price action and want to explore Smart Money Concepts in more depth.",
          strategy: "Smart Money Concepts (SMC)",
          href: "/en/strategies/smart-money-concepts",
        },
      ].map((item) => (
        <Link
          key={item.n}
          href={item.href}
          className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-blue-100 bg-[#f7faff] p-4 transition duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md sm:rounded-[20px] sm:p-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#e5efff] text-[12px] font-black text-[#1b5db8] sm:h-10 sm:w-10 sm:text-[14px]">
              {item.n}
            </span>

            <h3 className="text-[16px] font-black leading-6 text-[#0b3157] sm:text-[19px] sm:leading-7">
              {item.title}
            </h3>
          </div>

          <p className="mt-2 text-[14px] font-medium leading-6 text-slate-700 sm:mt-3 sm:text-[15px] sm:leading-7">
            {item.text}
          </p>

          <div className="mt-auto pt-3 sm:pt-4">
            <div className="flex items-center justify-between gap-2 border-t border-blue-100 pt-3 text-[13px] font-black text-[#1b5db8] sm:text-[15px]">
              <span>{item.strategy}</span>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#2471df] transition group-hover:bg-[#2471df] group-hover:text-white">
                <ArrowIcon />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* Link to all guides */}
    <div className="mt-4 flex flex-col gap-3 border-t border-blue-100 pt-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
      <p className="text-[13px] font-medium leading-6 text-slate-600 sm:text-[14px]">
        A style such as swing trading can be combined with price action analysis.
      </p>

      <a
        href="#all-strategies"
        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2471df] px-4 py-2.5 text-[13px] font-black text-white transition hover:bg-[#1b5db8] sm:px-5 sm:text-[14px]"
      >
        Explore All 12 Guides
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  </div>
</section>

      {/* =================================================
    ALL STRATEGIES
================================================= */}

<section
  id="all-strategies"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  <div className="relative border-b border-blue-100 bg-[linear-gradient(250deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      Trading Strategy Guides
    </span>

    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
        Best Forex Trading Strategies
      </h2>

      <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[12px] font-bold text-[#1b5db8]">
        <span className="font-black">{strategies.length}</span>
        Educational Guides
      </span>
    </div>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      Explore how each approach works, its typical timeframes and
      experience level. Open the guides for practical explanations and
      risk management; the best fit depends on your trading style and experience.
    </p>
  </div>

  <div className="p-3 sm:p-6 lg:p-8">
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {strategies.map((strategy) => (
        <Link
          key={strategy.href}
          href={strategy.href}
          className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-blue-100 bg-white p-4 transition duration-200 hover:border-blue-300 hover:bg-[#f8fbff] hover:shadow-[0_8px_24px_rgba(36,113,223,0.08)] sm:rounded-[20px] sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e5efff] text-[13px] font-black text-[#1b5db8] sm:h-10 sm:w-10 sm:text-[14px]">
              {strategy.number}
            </span>

            <span className="min-w-0 text-right text-[11px] font-bold leading-5 text-slate-500 sm:text-[12px]">
              {strategy.style}
            </span>
          </div>

          <h3 className="mt-3 text-[18px] font-black leading-7 text-[#0b3157] transition group-hover:text-[#1b5db8] sm:text-[20px] sm:leading-8">
            {strategy.title}
          </h3>

          <p className="mt-2 text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
            {strategy.description}
          </p>

          <div className="mt-auto pt-4">
            <dl className="grid grid-cols-2 gap-2 rounded-xl bg-[#f3f7fd] p-3">
              <div>
                <dt className="text-[11px] font-bold text-slate-500">
                  Experience Level
                </dt>

                <dd className="mt-1 text-[12px] font-bold leading-5 text-[#0b3157] sm:text-[13px]">
                  {strategy.level}
                </dd>
              </div>

              <div className="border-l border-blue-100 pl-3">
                <dt className="text-[11px] font-bold text-slate-500">
                  Timeframe
                </dt>

                <dd className="mt-1 text-[12px] font-bold leading-5 text-[#0b3157] sm:text-[13px]">
                  {strategy.timeframe}
                </dd>
              </div>
            </dl>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-blue-100 pt-3">
              <span className="text-[13px] font-black text-[#1b5db8] sm:text-[14px]">
                Read the Strategy Guide
              </span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[#2471df] transition group-hover:bg-[#2471df] group-hover:text-white">
                <ArrowIcon />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

{/* =================================================
    COMPARISON
================================================= */}

<section
  id="strategy-comparison"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  <div className="relative border-b border-blue-100 bg-[linear-gradient(250deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      Understanding the Differences
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      Forex Trading Styles and Methods Compared
    </h2>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      Some approaches define how long you hold a trade; others define
      how you analyze the market. These comparisons explain the practical
      differences and where the methods overlap.
    </p>
  </div>

  <div className="p-3 sm:p-6 lg:p-8">
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
  {[
    {
      n: "01",
      title: "Scalping vs Swing Trading",
      first: {
        label: "Scalping",
        text: "Short trades with close monitoring. Check spreads, fees and execution.",
        href: "/en/strategies/scalping",
      },
      second: {
        label: "Swing",
        text: "Longer trades with periodic checks. Watch news, gaps and overnight fees.",
        href: "/en/strategies/swing-trading",
      },
      takeaway:
        "Choose trade duration to match your available monitoring time.",
    },
    {
      n: "02",
      title: "Price Action vs Technical Indicators",
      first: {
        label: "Price Action",
        text: "Study price trends, swing points and key levels to understand the market.",
        href: "/en/strategies/price-action",
      },
      second: {
        label: "Indicators",
        text: "Study price-based tools for momentum and trends to support your analysis.",
        href: "/en/strategies/rsi",
      },
      takeaway:
        "Both can work together when each has a clear role in your rules.",
    },
    {
      n: "03",
      title: "Support and Resistance vs Supply and Demand",
      first: {
        label: "Key Levels",
        text: "Study support and resistance zones for price bounces, breaks and retests.",
        href: "/en/strategies/support-and-resistance",
      },
      second: {
        label: "Price Zones",
        text: "Study supply and demand zones through departure moves and previous tests.",
        href: "/en/strategies/supply-and-demand",
      },
      takeaway:
        "Zones may overlap. Define your entry and stop-loss rules.",
    },
    {
      n: "04",
      title: "ICT vs Smart Money Concepts",
      first: {
        label: "ICT",
        text: "A framework covering liquidity, structure, fair value gaps and order blocks.",
        href: "/en/strategies/ict",
      },
      second: {
        label: "SMC",
        text: "Related concepts covering liquidity and structure, with rules varying by source.",
        href: "/en/strategies/smart-money-concepts",
      },
      takeaway:
        "Similar terms do not prove identical rules or better results.",
    },
  ].map((comparison) => (
    <article
      key={comparison.n}
      className="flex h-full flex-col overflow-hidden rounded-[16px] border border-blue-100 bg-white sm:rounded-[20px]"
    >
      {/* Full comparison title */}
      <div className="flex items-center gap-3 border-b border-blue-100 bg-[#f3f7fd] px-4 py-3 sm:px-5 sm:py-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#e5efff] text-[12px] font-black text-[#1b5db8] sm:h-9 sm:w-9 sm:text-[13px]">
          {comparison.n}
        </span>

        <h3 className="text-[17px] font-black leading-6 text-[#0b3157] sm:text-[20px] sm:leading-7">
          {comparison.title}
        </h3>
      </div>

      {/* Compact side-by-side comparison */}
      <dl className="grid grid-cols-2">
        {[comparison.first, comparison.second].map((side, index) => (
          <div
            key={side.href}
            className={`min-w-0 px-3 py-3 sm:px-5 sm:py-4 ${
              index > 0 ? "border-l border-blue-100" : ""
            }`}
          >
            <dt>
              <Link
                href={side.href}
                className="inline-block whitespace-nowrap text-[13px] font-black leading-6 text-[#1b5db8] transition hover:text-[#2471df] hover:underline sm:text-[16px] sm:leading-7"
              >
                {side.label}
              </Link>
            </dt>

            <dd className="mt-1.5 text-[13px] font-medium leading-[1.7] text-slate-700 sm:text-[15px] sm:leading-7">
              {side.text}
            </dd>
          </div>
        ))}
      </dl>

      {/* Summary */}
      <div className="mt-auto border-t border-blue-100 bg-[#f8fbff] px-4 py-3 sm:px-5">
        <p className="text-[13px] font-medium leading-6 text-slate-700 sm:text-[14px]">
          <span className="font-black text-[#0b3157]">
            Takeaway:{" "}
          </span>
          {comparison.takeaway}
        </p>
      </div>
    </article>
  ))}
</div>
  </div>
</section>

{/* =================================================
    LEARNING PATH
================================================= */}

<section
  id="forex-learning-path"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  <div className="relative border-b border-blue-100 bg-[linear-gradient(250deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      From Learning to Practice
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      Learn Forex Trading for Beginners
    </h2>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      Understand the basics, define one strategy and practice on a demo
      account before considering trading with real money.
    </p>
  </div>

  <div className="p-3 sm:p-6 lg:p-8">
    <ol className="grid list-none gap-3 sm:gap-4 lg:grid-cols-3">
      {[
        {
          n: "01",
          title: "Understand Price and Trading Costs",
          text: "Learn about price action, spreads, leverage and margin, and how they affect trading decisions and risk.",
          label: "Trading Education Hub",
          href: "/en/learn-trading",
        },
        {
          n: "02",
          title: "Define One Trading Strategy",
          text: "Write down entry, stop-loss and exit rules. Define your position size before placing a trade.",
          label: "Learn Price Action",
          href: "/en/strategies/price-action",
        },
        {
          n: "03",
          title: "Test and Record Results",
          text: "Practice the rules on a demo account and record trades. Demo results do not guarantee similar live performance.",
          label: "Compare Trading Account Costs",
          href: "/en/lowest-spread-brokers",
        },
      ].map((step) => (
        <li
          key={step.n}
          className="flex h-full gap-3 rounded-[16px] border border-blue-100 bg-[#f8fbff] p-4 sm:rounded-[20px] sm:p-5"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#e5efff] text-[12px] font-black text-[#1b5db8] sm:h-10 sm:w-10 sm:text-[14px]"
          >
            {step.n}
          </span>

          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="text-[16px] font-black leading-6 text-[#0b3157] sm:text-[19px] sm:leading-7">
              {step.title}
            </h3>

            <p className="mt-2 text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
              {step.text}
            </p>

            <div className="mt-auto pt-3">
              <Link
                href={step.href}
                className="group inline-flex min-h-[44px] items-center gap-2 text-[13px] font-black text-[#1b5db8] transition hover:text-[#2471df] sm:text-[14px]"
              >
                <span>{step.label}</span>

                <span className="shrink-0 transition group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ol>

    <div className="relative mt-4 overflow-hidden rounded-[18px] border border-[#174373] bg-[linear-gradient(245deg,#071a31_0%,#0b3157_60%,#0c4279_100%)] p-4 sm:mt-6 sm:rounded-[22px] sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-6">
        <div>
          <span className="text-[11px] font-bold text-[#66c8ff] sm:text-[12px]">
            Before Opening a Trading Account
          </span>

          <h3 className="mt-2 text-[20px] font-black leading-[1.4] text-white sm:text-[25px]">
            Compare Brokers and Accounts for Your Trading Style
          </h3>

          <p className="mt-2 max-w-[850px] text-[14px] font-medium leading-6 text-blue-100 sm:text-[15px] sm:leading-7">
            Check regulation, availability in your country, spreads,
            commissions and withdrawal terms before deciding whether
            an account meets your needs.
          </p>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          <Link
            href="/en/lowest-spread-brokers"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#2471df] px-4 py-3 text-center text-[14px] font-black text-white transition hover:bg-[#2e7cea] sm:px-5"
          >
            Compare Accounts and Spreads
            <span className="shrink-0">
              <ArrowIcon />
            </span>
          </Link>

          <Link
            href="/en/brokers"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-4 py-3 text-center text-[14px] font-black text-white transition hover:bg-white/[0.12] sm:px-5"
          >
            Explore Forex Broker Reviews
            <span className="shrink-0">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

     {/* =================================================
    TRADING PLAN AND TESTING
================================================= */}

<section
  id="strategy-testing"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  <div className="relative border-b border-blue-100 bg-[linear-gradient(250deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      Trading Rules and Performance
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      How to Test a Forex Trading Strategy
    </h2>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      Turn your approach into written rules and test them consistently.
      Evaluate results across a series of trades, including costs,
      rather than relying on one winning trade or win rate alone.
    </p>
  </div>

  <div className="p-4 sm:p-6 lg:p-8">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

      {/* Trading plan */}
      <div>
        <h3 className="text-[18px] font-black leading-7 text-[#0b3157] sm:text-[22px]">
          How to Build a Forex Trading Plan
        </h3>

        <dl className="mt-3 divide-y divide-blue-100">
          {[
            {
              title: "Currency Pair and Timeframe",
              text: "Choose your currency pair, timeframe and market conditions before looking for a trade.",
            },
            {
              title: "Entry Points and Stop Loss",
              text: "Define entry conditions and stop-loss placement. Skip trades that do not meet your rules.",
            },
            {
              title: "Position Size and Take Profit",
              text: "Match position size to your risk limit, and define take-profit levels and exit rules in advance.",
            },
          ].map((item) => (
            <div key={item.title} className="py-3">
              <dt className="text-[15px] font-black leading-6 text-[#1b5db8] sm:text-[17px]">
                {item.title}
              </dt>

              <dd className="mt-1 text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7 lg:min-h-[56px]">
                {item.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Performance assessment */}
      <div>
        <h3 className="text-[18px] font-black leading-7 text-[#0b3157] sm:text-[22px]">
          How to Evaluate Strategy Results
        </h3>

        <dl className="mt-3 divide-y divide-blue-100">
          {[
            {
              title: "Win Rate and Average Profit or Loss",
              text: "Compare win rate with average gains and losses. A high win rate alone does not establish profitability.",
            },
            {
              title: "Trading Costs and Drawdown",
              text: "Include spreads, commissions, swaps and slippage. Track account drawdown and consecutive losses.",
            },
            {
              title: "Backtesting and Demo Trading",
              text: "Test data not used to adjust your rules, then practice on a demo account and record the results.",
            },
          ].map((item) => (
            <div key={item.title} className="py-3">
              <dt className="text-[15px] font-black leading-6 text-[#1b5db8] sm:text-[17px]">
                {item.title}
              </dt>

              <dd className="mt-1 text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7 lg:min-h-[56px]">
                {item.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

    {/* Practical example and tools */}
    <div className="mt-5 overflow-hidden rounded-[16px] border border-blue-100 bg-[#f3f8ff] sm:mt-6 sm:rounded-[20px]">
      <div className="px-4 py-4 sm:px-5">
        <p className="text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
          <strong className="font-black text-[#0b3157]">
            Make the rules testable:{" "}
          </strong>
          Instead of “buy at support,” define how you identify the zone,
          what confirms entry and when you avoid the trade. Clear
          definitions make testing repeatable and results easier to compare.
        </p>
      </div>

      <div className="flex flex-col gap-3 border-t border-blue-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5">
        <p className="text-[13px] font-medium leading-6 text-slate-600 sm:text-[14px]">
          Past and demo results do not guarantee future performance.
          Use the{" "}
          <Link
            href="/en/tools/lot-size-calculator"
            className="font-bold text-[#1b5db8] underline decoration-blue-200 underline-offset-4 transition hover:decoration-blue-500"
          >
            lot size calculator
          </Link>
          {" "}to estimate position size using your inputs and risk limit.
        </p>

        <Link
          href="/en/tools"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2471df] px-4 py-2.5 text-[13px] font-black text-white transition hover:bg-[#1b5db8] sm:px-5 sm:text-[14px]"
        >
          Trading Tools and Calculators
          <span className="shrink-0">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </div>
  </div>
</section>

{/* =================================================
    FAQ
================================================= */}

<section
  id="strategies-faq"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  <div className="relative border-b border-blue-100 bg-[linear-gradient(250deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      Frequently Asked Questions
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      Forex Trading Strategies FAQ
    </h2>
  </div>

  <div className="divide-y divide-blue-100 px-4 sm:px-7 lg:px-8">
    {faqItems.map((item) => (
      <details
        key={item.question}
        className="group py-1"
      >
        <summary className="flex min-h-[58px] cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
          <h3 className="text-[15px] font-black leading-6 text-[#0b3157] transition group-open:text-[#1b5db8] sm:text-[18px] sm:leading-7">
            {item.question}
          </h3>

          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[20px] font-normal leading-none text-[#2471df] transition group-open:rotate-45"
          >
            +
          </span>
        </summary>

        <p className="max-w-[1100px] pb-4 pr-3 text-[14px] font-medium leading-7 text-slate-700 sm:pb-5 sm:text-[16px] sm:leading-8">
          {item.answer}
        </p>
      </details>
    ))}
  </div>
</section>

{/* =================================================
    DISCLAIMER
================================================= */}

<div className="relative overflow-hidden rounded-[18px] border border-blue-100 bg-[#f3f8ff] px-4 py-4 sm:rounded-[22px] sm:px-6 sm:py-5">
  <div
    aria-hidden="true"
    className="absolute bottom-0 left-0 top-0 w-1 bg-[#2471df]"
  />

  <p className="text-[13px] font-medium leading-6 text-slate-700 sm:text-[14px] sm:leading-7">
    <strong className="font-black text-[#0b3157]">
      Risk notice:{" "}
    </strong>
    Forex strategy content is educational and does not constitute
    investment advice or a buy or sell signal. No strategy guarantees
    profits, and leveraged trading can result in substantial losses.
    Understand the risks and test your rules on a demo account before
    trading with real money.
  </p>
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