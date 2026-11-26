import Link from "next/link";

import {
  ChartCandlestick,
  Layers,
  Zap,
  ChartNoAxesCombined,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

/* =========================================================
   BROKER ALARAB — HOME TRADING STRATEGIES (ENGLISH)
========================================================= */

/* =========================================================
   FEATURED STRATEGY
========================================================= */

const FEATURED_STRATEGY = {
  title: "Price Action Trading Strategy",
  english: "FEATURED STRATEGY",
  desc: "Learn how to read price movements, market structure, support and resistance levels, breakouts and retests.",
  href: "/en/strategies/price-action",
};

/* =========================================================
   SELECTED STRATEGIES
========================================================= */

const STRATEGIES = [
  {
    title: "ICT Trading Strategy",
    english: "ICT",
    desc: "Analyze liquidity and fair value gaps.",
    href: "/en/strategies/ict",
    icon: ChartCandlestick,
  },
  {
    title: "Smart Money Concepts",
    english: "SMC",
    desc: "Understand market structure and liquidity zones.",
    href: "/en/strategies/smart-money-concepts",
    icon: Layers,
  },
  {
    title: "Scalping Strategy",
    english: "Scalping",
    desc: "Trade short-term price movements.",
    href: "/en/strategies/scalping",
    icon: Zap,
  },
  {
    title: "Supply & Demand Strategy",
    english: "S&D",
    desc: "Identify and analyze supply and demand zones.",
    href: "/en/strategies/supply-and-demand",
    icon: ChartNoAxesCombined,
  },
];

/* =========================================================
   DECORATIVE CANDLESTICK CHART
========================================================= */

const CANDLES = [
  { x: 20, open: 110, close: 85 },
  { x: 50, open: 85, close: 98 },
  { x: 80, open: 98, close: 68 },
  { x: 110, open: 68, close: 82 },
  { x: 140, open: 82, close: 48 },
  { x: 170, open: 48, close: 65 },
  { x: 200, open: 65, close: 85 },
  { x: 230, open: 85, close: 50 },
  { x: 260, open: 50, close: 32 },
  { x: 290, open: 32, close: 48 },
  { x: 320, open: 48, close: 22 },
  { x: 350, open: 22, close: 38 },
  { x: 380, open: 38, close: 15 },
];

function DecorativeChart() {
  return (
    <svg
      viewBox="0 0 400 135"
      fill="none"
      aria-hidden="true"
      className="h-[105px] w-full sm:h-[125px]"
      preserveAspectRatio="xMidYMid meet"
    >

      {/* GRID */}

      {[25, 50, 75, 100, 125].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="400"
          y2={y}
          stroke="#ffffff"
          strokeOpacity="0.08"
        />
      ))}

      {[40, 100, 160, 220, 280, 340].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="135"
          stroke="#ffffff"
          strokeOpacity="0.06"
        />
      ))}

      {/* PRICE ACTION LEVELS */}

      <path
        d="M0 85 H400 M0 40 H400"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="5 6"
        opacity="0.4"
      />

      {/* DECORATIVE CANDLES */}

      {CANDLES.map((candle) => {
        const bullish = candle.close < candle.open;

        const color = bullish
          ? "#34d399"
          : "#fb7185";

        return (
          <g key={candle.x}>

            <line
              x1={candle.x}
              x2={candle.x}
              y1={Math.min(candle.open, candle.close) - 9}
              y2={Math.max(candle.open, candle.close) + 9}
              stroke={color}
              strokeWidth="1.6"
            />

            <rect
              x={candle.x - 6}
              y={Math.min(candle.open, candle.close)}
              width="12"
              height={Math.abs(candle.open - candle.close)}
              fill={color}
              rx="1.5"
              opacity="0.95"
            />

          </g>
        );
      })}

    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HomeStrategiesEn() {
  return (
    <section
      id="home-strategies"
      aria-labelledby="home-strategies-title"
      dir="ltr"
      lang="en"
      className="mx-auto w-full min-w-0 py-3 sm:py-4"
    >

      {/* EXTERNAL SECTION HEADER */}

      <div className="mb-4 flex min-h-[44px] items-center">

        <h2
          id="home-strategies-title"
          className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
        >

          <Link
            href="/en/strategies"
            className="group/title inline-flex items-center gap-2 transition duration-200 hover:text-brand-600"
          >

            Popular Trading Strategies

            <ChevronRight
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover/title:translate-x-1"
            />

          </Link>

        </h2>

      </div>

      {/* =================================================
          STRATEGIES LAYOUT
      ================================================== */}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">

        {/* ===============================================
            FEATURED STRATEGY — PRICE ACTION
        ================================================ */}

        <Link
          href={FEATURED_STRATEGY.href}
          className="group relative flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#183d6b] bg-[#102e55] p-5 text-white transition duration-300 hover:border-blue-400 sm:p-6"
        >

          {/* BACKGROUND LIGHT */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 h-[300px] w-[300px] rounded-full bg-blue-500/15 blur-[85px]"
          />

          {/* DECORATIVE CHART */}

          <div
            dir="ltr"
            className="relative mb-3 w-full"
          >

            <DecorativeChart />

          </div>

          {/* STRATEGY CONTENT */}

          <div className="relative flex flex-1 flex-col">

            <span
              dir="ltr"
              className="text-left text-[11px] font-bold tracking-[0.12em] text-blue-300"
            >

              {FEATURED_STRATEGY.english}

            </span>

            <h3 className="mt-2 text-[23px] font-black leading-9 text-white sm:text-[28px]">

              {FEATURED_STRATEGY.title}

            </h3>

            <p className="mt-2 max-w-[580px] text-[12px] font-medium leading-7 text-blue-100/80 sm:text-[14px]">

              {FEATURED_STRATEGY.desc}

            </p>

            {/* FEATURED STRATEGY FOOTER */}

            <div className="mt-auto pt-4">

              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">

                <span className="text-[13px] font-bold text-white">

                  Read the Strategy Guide

                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-blue-200 transition duration-200 group-hover:bg-white group-hover:text-[#102e55]">

                  <ArrowRight
                    size={17}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />

                </span>

              </div>

            </div>

          </div>

        </Link>

        {/* ===============================================
            OTHER SELECTED STRATEGIES
        ================================================ */}

        <div className="flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white">

          <div className="flex flex-1 flex-col divide-y divide-slate-100 px-4 sm:px-5">

            {STRATEGIES.map((item) => {

              const Icon = item.icon;

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-[82px] flex-1 items-center justify-between gap-3 py-3 transition duration-200 hover:bg-[#f8fbff]"
                >

                  {/* ICON AND TEXT */}

                  <div className="flex min-w-0 items-center gap-3">

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#edf3fc] text-[#194b92] transition duration-200 group-hover:bg-[#194b92] group-hover:text-white sm:h-12 sm:w-12">

                      <Icon
                        size={23}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />

                    </span>

                    <div className="min-w-0">

                      <h3 className="text-[14px] font-black leading-6 text-[#10233f] transition-colors group-hover:text-brand-600 sm:text-[16px]">

                        {item.title}

                      </h3>

                      <p className="mt-0.5 text-[11px] font-medium leading-5 text-slate-500 sm:text-[12px]">

                        {item.desc}

                      </p>

                    </div>

                  </div>

                  {/* STRATEGY LABEL AND ARROW */}

                  <div className="flex shrink-0 items-center gap-3">

                    <span
                      dir="ltr"
                      className="hidden text-[10px] font-medium text-slate-400 xl:block"
                    >

                      {item.english}

                    </span>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf3fc] text-[#194b92] transition duration-200 group-hover:bg-[#194b92] group-hover:text-white">

                      <ChevronRight
                        size={15}
                        strokeWidth={2}
                        aria-hidden="true"
                      />

                    </span>

                  </div>

                </Link>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}