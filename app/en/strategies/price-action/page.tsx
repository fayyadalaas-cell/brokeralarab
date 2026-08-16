import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   PRICE ACTION TRADING STRATEGY — ENGLISH
   Broker Alarab
   Path: /en/strategies/price-action
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/price-action`;

const PAGE_TITLE =
  "Price Action Trading Strategy: Complete Guide";

const PAGE_DESCRIPTION =
  "Learn price action trading step by step, including market structure, support and resistance, breakouts, pullbacks, candlestick patterns, entries and risk management.";


/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,

    languages: {
      en: PAGE_URL,
      ar: `${BASE_URL}/strategies/price-action`,
      "x-default": PAGE_URL,
    },
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    locale: "en_US",
    siteName: "Broker Alarab",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "A practical price action trading guide covering market structure, support and resistance, breakouts, pullbacks, candlestick patterns and risk management.",
  },
};


/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    q: "What is price action trading?",
    a: "Price action trading is an approach to market analysis that focuses primarily on the movement of price itself. Traders study market structure, highs and lows, support and resistance, breakouts, pullbacks and candlestick behavior rather than relying mainly on technical indicators.",
  },
  {
    q: "Can you trade price action without indicators?",
    a: "Yes. Price action can be traded without indicators because the analysis is based on price movement, market structure and key levels. Some traders still use indicators as secondary tools, but they are not required for a price action strategy.",
  },
  {
    q: "Is price action trading good for beginners?",
    a: "Price action can be suitable for beginners, but it is usually better to learn market structure, trends and support and resistance before moving on to candlestick setups, false breakouts and more advanced entry techniques.",
  },
  {
    q: "What is the best timeframe for price action trading?",
    a: "There is no single best timeframe. Higher timeframes can make market structure and important levels easier to identify, while lower timeframes may be used to refine entries depending on the trader's style.",
  },
  {
    q: "Does price action trading guarantee profitable trades?",
    a: "No. Price action is a framework for analyzing market behavior, not a guaranteed trading system. Breakouts, reversals and candlestick setups can fail, which is why position sizing, stop-loss placement and risk management remain essential.",
  },
  {
    q: "What is the difference between price action and indicator trading?",
    a: "Price action focuses directly on market structure and price movement. Technical indicators are calculated from market data such as price, volume or volatility. Traders can combine both approaches, but price action does not require an indicator to interpret market behavior.",
  },
];


/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
      {children}
    </span>
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
    <div className="rounded-[20px] border border-brand-100 bg-brand-50/60 p-4 md:p-5">

      <div className="flex items-start gap-3">

        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-black text-white">
          !
        </div>


        <div className="min-w-0">

          <h3 className="text-[16px] font-black text-slate-950 md:text-[17px]">
            {title}
          </h3>

          <div className="mt-2 text-[13px] leading-7 text-slate-700 md:text-[14px] md:leading-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   HERO CHART — DESKTOP
========================================================= */

function PriceActionHeroDesktopChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">

        <div className="flex items-center justify-between gap-3">

          <div>

            <div className="text-[13px] font-black text-slate-950">
              Reading Price Action
            </div>

            <div className="mt-0.5 text-[10px] text-slate-500">
              Market structure → key level → reaction → trade decision
            </div>

          </div>


          <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
            Price Action
          </span>

        </div>

      </div>


      <svg
        viewBox="0 0 720 400"
        className="block w-full"
        role="img"
        aria-label="Price action chart showing an uptrend, resistance breakout, retest and continuation"
      >

        <defs>

          <linearGradient
            id="paHeroBgEn"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>


          <marker
            id="paArrowEn"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path
              d="M0 0 L10 5 L0 10 Z"
              fill="#2563eb"
            />
          </marker>

        </defs>


        <rect
          width="720"
          height="400"
          fill="url(#paHeroBgEn)"
        />


        {/* GRID */}
        {[75, 135, 195, 255, 315].map((y) => (
          <line
            key={`hero-h-${y}`}
            x1="45"
            y1={y}
            x2="680"
            y2={y}
            stroke="#e8edf4"
            strokeWidth="1"
          />
        ))}


        {[120, 220, 320, 420, 520, 620].map((x) => (
          <line
            key={`hero-v-${x}`}
            x1={x}
            y1="40"
            x2={x}
            y2="345"
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}


        {/* RESISTANCE */}
        <line
          x1="70"
          y1="118"
          x2="435"
          y2="118"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeDasharray="8 6"
        />

        <text
          x="80"
          y="100"
          fontSize="13"
          fontWeight="900"
          fill="#dc2626"
        >
          Resistance
        </text>


        {/* SUPPORT */}
        <line
          x1="70"
          y1="292"
          x2="380"
          y2="292"
          stroke="#16a34a"
          strokeWidth="2.5"
          strokeDasharray="8 6"
        />

        <text
          x="80"
          y="318"
          fontSize="13"
          fontWeight="900"
          fill="#15803d"
        >
          Support
        </text>


        {/* PRICE ACTION */}
        <polyline
          points="
            60,310
            115,255
            155,278
            210,205
            255,235
            315,155
            360,195
            415,120
            455,165
            505,108
            545,135
            600,78
            665,58
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* HIGHER LOW */}
        <circle
          cx="360"
          cy="195"
          r="7"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="360"
          y="220"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Higher Low
        </text>


        {/* BREAKOUT */}
        <circle
          cx="415"
          cy="120"
          r="8"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <line
          x1="430"
          y1="92"
          x2="485"
          y2="70"
          stroke="#2563eb"
          strokeWidth="2"
          markerEnd="url(#paArrowEn)"
        />

        <text
          x="495"
          y="68"
          fontSize="13"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Breakout
        </text>


        {/* RETEST */}
        <circle
          cx="455"
          cy="165"
          r="8"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        <text
          x="455"
          y="190"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          Retest
        </text>


        {/* CONTINUATION */}
        <line
          x1="530"
          y1="105"
          x2="610"
          y2="72"
          stroke="#16a34a"
          strokeWidth="3"
          markerEnd="url(#paArrowEn)"
        />

        <text
          x="570"
          y="125"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          Trend Continuation
        </text>


        {/* BOTTOM EXPLANATION */}
        <rect
          x="105"
          y="345"
          width="510"
          height="34"
          rx="17"
          fill="#0f172a"
        />

        <text
          x="360"
          y="367"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#ffffff"
        >
          Uptrend → resistance breakout → retest → continuation
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   HERO CHART — MOBILE
   NO FULLSCREEN / NO ZOOM
========================================================= */

function PriceActionHeroMobileChart() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

        <span className="text-[11px] font-black text-slate-800">
          Reading Price Action
        </span>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
          Price Action
        </span>

      </div>


      <svg
        viewBox="0 0 360 260"
        className="block w-full"
        role="img"
        aria-label="Simplified price action example showing a breakout and retest"
      >
        <rect
          width="360"
          height="260"
          fill="#ffffff"
        />


        {/* GRID */}
        {[55, 105, 155, 205].map((y) => (
          <line
            key={`hero-mobile-${y}`}
            x1="20"
            y1={y}
            x2="340"
            y2={y}
            stroke="#eef2f7"
            strokeWidth="1"
          />
        ))}


        {/* RESISTANCE */}
        <line
          x1="35"
          y1="105"
          x2="220"
          y2="105"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        <text
          x="42"
          y="93"
          fontSize="9"
          fontWeight="900"
          fill="#dc2626"
        >
          Resistance
        </text>


        {/* PRICE */}
        <polyline
          points="
            25,215
            65,175
            100,195
            140,145
            175,165
            215,105
            245,135
            280,88
            330,58
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* BREAKOUT */}
        <circle
          cx="215"
          cy="105"
          r="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        <text
          x="215"
          y="86"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Breakout
        </text>


        {/* RETEST */}
        <circle
          cx="245"
          cy="135"
          r="6"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        <text
          x="245"
          y="157"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#b45309"
        >
          Retest
        </text>


        <text
          x="302"
          y="45"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          Continuation
        </text>


        {/* SUMMARY */}
        <rect
          x="45"
          y="222"
          width="270"
          height="25"
          rx="12.5"
          fill="#0f172a"
        />

        <text
          x="180"
          y="238"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#ffffff"
        >
          Trend → Level → Breakout → Retest
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   MARKET STRUCTURE CHART
========================================================= */

function MarketStructureChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      {/* HEADER */}
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          Example of Bullish Market Structure
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          Higher highs and higher lows support an uptrend
        </p>

      </div>


      {/* =================================================
          DESKTOP
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 700 300"
          className="block w-full"
          role="img"
          aria-label="Bullish market structure with higher highs and higher lows"
        >
          <rect
            width="700"
            height="300"
            fill="#ffffff"
          />


          {[60, 120, 180, 240].map((y) => (
            <line
              key={`market-desktop-${y}`}
              x1="35"
              y1={y}
              x2="665"
              y2={y}
              stroke="#f1f5f9"
            />
          ))}


          <polyline
            points="
              45,240
              135,150
              205,205
              300,115
              375,165
              470,78
              540,125
              645,48
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* HH */}
          <circle
            cx="300"
            cy="115"
            r="7"
            fill="#2563eb"
          />

          <text
            x="300"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#1d4ed8"
          >
            Higher High
          </text>


          {/* HL */}
          <circle
            cx="375"
            cy="165"
            r="7"
            fill="#16a34a"
          />

          <text
            x="375"
            y="192"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#15803d"
          >
            Higher Low
          </text>


          {/* HH */}
          <circle
            cx="470"
            cy="78"
            r="7"
            fill="#2563eb"
          />

          <text
            x="470"
            y="57"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#1d4ed8"
          >
            Higher High
          </text>


          {/* HL */}
          <circle
            cx="540"
            cy="125"
            r="7"
            fill="#16a34a"
          />

          <text
            x="540"
            y="151"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#15803d"
          >
            Higher Low
          </text>

        </svg>

      </div>


      {/* =================================================
          MOBILE PREVIEW
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#market-structure-chart-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="Open market structure chart full screen"
        >

          <div className="overflow-hidden">

            <svg
              viewBox="0 0 360 255"
              className="block w-full"
              role="img"
              aria-label="Simplified bullish market structure chart"
            >
              <rect
                width="360"
                height="255"
                fill="#ffffff"
              />


              {[55, 110, 165, 220].map((y) => (
                <line
                  key={`market-mobile-${y}`}
                  x1="18"
                  y1={y}
                  x2="342"
                  y2={y}
                  stroke="#f1f5f9"
                />
              ))}


              <polyline
                points="
                  20,220
                  70,155
                  105,190
                  155,120
                  200,155
                  245,85
                  285,120
                  340,48
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="155"
                cy="120"
                r="6"
                fill="#2563eb"
              />

              <text
                x="155"
                y="100"
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="900"
                fill="#1d4ed8"
              >
                Higher High
              </text>


              <circle
                cx="200"
                cy="155"
                r="6"
                fill="#16a34a"
              />

              <text
                x="200"
                y="178"
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="900"
                fill="#15803d"
              >
                Higher Low
              </text>


              <circle
                cx="245"
                cy="85"
                r="6"
                fill="#2563eb"
              />

              <text
                x="245"
                y="66"
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="900"
                fill="#1d4ed8"
              >
                Higher High
              </text>


              <circle
                cx="285"
                cy="120"
                r="6"
                fill="#16a34a"
              />

              <text
                x="285"
                y="143"
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="900"
                fill="#15803d"
              >
                Higher Low
              </text>

            </svg>

          </div>


          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">

              <span>
                Enlarge chart
              </span>

              <span className="text-[14px]">
                ↗
              </span>

            </div>

          </div>

        </a>

      </div>


      {/* =================================================
          FULLSCREEN
      ================================================= */}
      <div
        id="market-structure-chart-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#market-structure"
          className="absolute inset-0"
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                Bullish Market Structure
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Higher highs and higher lows can help define an uptrend
              </div>

            </div>


            <a
              href="#market-structure"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="Close"
            >
              ×
            </a>

          </div>


          {/* MOBILE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">

            <span className="text-[16px]">
              ↔
            </span>

            <span>
              Swipe left or right to explore the full chart
            </span>

          </div>


          {/* FULL CHART */}
          <div
            dir="ltr"
            className="overflow-x-auto overflow-y-auto bg-white p-2"
          >

            <svg
              viewBox="0 0 700 300"
              className="block min-w-[760px] w-full"
              role="img"
              aria-label="Expanded bullish market structure chart"
            >
              <rect
                width="700"
                height="300"
                fill="#ffffff"
              />


              {[60, 120, 180, 240].map((y) => (
                <line
                  key={`market-full-${y}`}
                  x1="35"
                  y1={y}
                  x2="665"
                  y2={y}
                  stroke="#f1f5f9"
                />
              ))}


              <polyline
                points="
                  45,240
                  135,150
                  205,205
                  300,115
                  375,165
                  470,78
                  540,125
                  645,48
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="300"
                cy="115"
                r="7"
                fill="#2563eb"
              />

              <text
                x="300"
                y="92"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#1d4ed8"
              >
                Higher High
              </text>


              <circle
                cx="375"
                cy="165"
                r="7"
                fill="#16a34a"
              />

              <text
                x="375"
                y="192"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#15803d"
              >
                Higher Low
              </text>


              <circle
                cx="470"
                cy="78"
                r="7"
                fill="#2563eb"
              />

              <text
                x="470"
                y="57"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#1d4ed8"
              >
                Higher High
              </text>


              <circle
                cx="540"
                cy="125"
                r="7"
                fill="#16a34a"
              />

              <text
                x="540"
                y="151"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#15803d"
              >
                Higher Low
              </text>

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SUPPORT / RESISTANCE CHART
========================================================= */

function SupportResistanceChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      {/* HEADER */}
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          How Price Reacts to Support and Resistance
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          Think in zones rather than a single perfect price
        </p>

      </div>


      {/* =================================================
          DESKTOP
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 700 320"
          className="block w-full"
          role="img"
          aria-label="Price action support and resistance zones"
        >
          <rect
            width="700"
            height="320"
            fill="#ffffff"
          />


          {/* RESISTANCE ZONE */}
          <rect
            x="45"
            y="60"
            width="610"
            height="42"
            rx="10"
            fill="#fff1f2"
            stroke="#fecdd3"
          />


          <rect
            x="70"
            y="68"
            width="125"
            height="26"
            rx="13"
            fill="#ffffff"
            stroke="#fecdd3"
          />


          <text
            x="132.5"
            y="81"
            fontSize="12"
            fontWeight="900"
            fill="#be123c"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Resistance Zone
          </text>


          {/* SUPPORT ZONE */}
          <rect
            x="45"
            y="225"
            width="610"
            height="42"
            rx="10"
            fill="#f0fdf4"
            stroke="#bbf7d0"
          />


          <rect
            x="70"
            y="233"
            width="112"
            height="26"
            rx="13"
            fill="#ffffff"
            stroke="#bbf7d0"
          />


          <text
            x="126"
            y="246"
            fontSize="12"
            fontWeight="900"
            fill="#15803d"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Support Zone
          </text>


          {/* PRICE */}
          <polyline
            points="
              65,235
              130,175
              185,90
              245,155
              300,240
              365,170
              420,82
              485,145
              540,235
              600,170
              640,110
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* REACTIONS */}
          <circle
            cx="185"
            cy="90"
            r="7"
            fill="#ffffff"
            stroke="#e11d48"
            strokeWidth="3"
          />

          <circle
            cx="300"
            cy="240"
            r="7"
            fill="#ffffff"
            stroke="#16a34a"
            strokeWidth="3"
          />

          <circle
            cx="420"
            cy="82"
            r="7"
            fill="#ffffff"
            stroke="#e11d48"
            strokeWidth="3"
          />

          <circle
            cx="540"
            cy="235"
            r="7"
            fill="#ffffff"
            stroke="#16a34a"
            strokeWidth="3"
          />

        </svg>

      </div>


      {/* =================================================
          MOBILE PREVIEW
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#support-resistance-chart-fullscreen"
          className="group block cursor-zoom-in"
          aria-label="Open support and resistance chart full screen"
        >

          <div className="overflow-hidden">

            <svg
              viewBox="0 0 360 280"
              className="block w-full"
              role="img"
              aria-label="Simplified support and resistance zones"
            >
              <rect
                width="360"
                height="280"
                fill="#ffffff"
              />


              {/* RESISTANCE */}
              <rect
                x="25"
                y="48"
                width="310"
                height="35"
                rx="9"
                fill="#fff1f2"
                stroke="#fecdd3"
              />

              <rect
                x="40"
                y="54"
                width="104"
                height="23"
                rx="11"
                fill="#ffffff"
                stroke="#fecdd3"
              />

              <text
                x="92"
                y="65.5"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8.5"
                fontWeight="900"
                fill="#be123c"
              >
                Resistance
              </text>


              {/* SUPPORT */}
              <rect
                x="25"
                y="205"
                width="310"
                height="35"
                rx="9"
                fill="#f0fdf4"
                stroke="#bbf7d0"
              />

              <rect
                x="40"
                y="211"
                width="92"
                height="23"
                rx="11"
                fill="#ffffff"
                stroke="#bbf7d0"
              />

              <text
                x="86"
                y="222.5"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8.5"
                fontWeight="900"
                fill="#15803d"
              >
                Support
              </text>


              {/* PRICE */}
              <polyline
                points="
                  30,215
                  75,165
                  110,72
                  150,130
                  185,215
                  225,150
                  260,68
                  295,130
                  330,205
                  345,150
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="110"
                cy="72"
                r="6"
                fill="#ffffff"
                stroke="#e11d48"
                strokeWidth="2.5"
              />

              <circle
                cx="185"
                cy="215"
                r="6"
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="2.5"
              />

              <circle
                cx="260"
                cy="68"
                r="6"
                fill="#ffffff"
                stroke="#e11d48"
                strokeWidth="2.5"
              />

              <circle
                cx="330"
                cy="205"
                r="6"
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="2.5"
              />

            </svg>

          </div>


          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">

              <span>
                Enlarge chart
              </span>

              <span className="text-[14px]">
                ↗
              </span>

            </div>

          </div>

        </a>

      </div>


      {/* =================================================
          FULLSCREEN
      ================================================= */}
      <div
        id="support-resistance-chart-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#support-resistance"
          className="absolute inset-0"
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                Support and Resistance
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Watch how price reacts to a zone rather than a single exact price
              </div>

            </div>


            <a
              href="#support-resistance"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="Close"
            >
              ×
            </a>

          </div>


          {/* MOBILE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">

            <span className="text-[16px]">
              ↔
            </span>

            <span>
              Swipe left or right to explore the full chart
            </span>

          </div>


          {/* FULL CHART */}
          <div
            dir="ltr"
            className="overflow-x-auto overflow-y-auto bg-white p-2"
          >

            <svg
              viewBox="0 0 700 320"
              className="block min-w-[760px] w-full"
              role="img"
              aria-label="Expanded support and resistance chart"
            >
              <rect
                width="700"
                height="320"
                fill="#ffffff"
              />


              {/* RESISTANCE */}
              <rect
                x="45"
                y="60"
                width="610"
                height="42"
                rx="10"
                fill="#fff1f2"
                stroke="#fecdd3"
              />

              <rect
                x="70"
                y="68"
                width="125"
                height="26"
                rx="13"
                fill="#ffffff"
                stroke="#fecdd3"
              />

              <text
                x="132.5"
                y="81"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="900"
                fill="#be123c"
              >
                Resistance Zone
              </text>


              {/* SUPPORT */}
              <rect
                x="45"
                y="225"
                width="610"
                height="42"
                rx="10"
                fill="#f0fdf4"
                stroke="#bbf7d0"
              />

              <rect
                x="70"
                y="233"
                width="112"
                height="26"
                rx="13"
                fill="#ffffff"
                stroke="#bbf7d0"
              />

              <text
                x="126"
                y="246"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="900"
                fill="#15803d"
              >
                Support Zone
              </text>


              <polyline
                points="
                  65,235
                  130,175
                  185,90
                  245,155
                  300,240
                  365,170
                  420,82
                  485,145
                  540,235
                  600,170
                  640,110
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="185"
                cy="90"
                r="7"
                fill="#ffffff"
                stroke="#e11d48"
                strokeWidth="3"
              />

              <circle
                cx="300"
                cy="240"
                r="7"
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="3"
              />

              <circle
                cx="420"
                cy="82"
                r="7"
                fill="#ffffff"
                stroke="#e11d48"
                strokeWidth="3"
              />

              <circle
                cx="540"
                cy="235"
                r="7"
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="3"
              />

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function PriceActionStrategyPage() {

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    url: PAGE_URL,
    inLanguage: "en",

    datePublished: "2026-08-16",
    dateModified: "2026-08-16",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },

    author: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: BASE_URL,
    },

    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: BASE_URL,

      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo/email-signature-icon.png`,
      },
    },

    about: [
      {
        "@type": "Thing",
        name: "Price Action Trading",
      },
      {
        "@type": "Thing",
        name: "Price Action Strategy",
      },
      {
        "@type": "Thing",
        name: "Market Structure",
      },
      {
        "@type": "Thing",
        name: "Support and Resistance",
      },
      {
        "@type": "Thing",
        name: "Candlestick Patterns",
      },
      {
        "@type": "Thing",
        name: "Breakout Trading",
      },
      {
        "@type": "Thing",
        name: "Pullback Trading",
      },
      {
        "@type": "Thing",
        name: "Retest Trading",
      },
    ],

    keywords: [
      "price action trading",
      "price action strategy",
      "price action trading strategy",
      "how to trade price action",
      "price action for beginners",
      "market structure trading",
      "support and resistance trading",
      "candlestick patterns",
      "breakout trading",
      "pullback trading",
      "retest trading",
      "price action forex",
      "price action without indicators",
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
        item: `${BASE_URL}/en`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trading Strategies",
        item: `${BASE_URL}/en/strategies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Price Action Trading Strategy",
        item: PAGE_URL,
      },
    ],
  };


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqItems.map((item) => ({
      "@type": "Question",

      name: item.q,

      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };


  return (
    <main
      dir="ltr"
      className="min-h-screen bg-slate-50/40 pb-6 text-left md:pb-10"
    >

      {/* =====================================================
          BREADCRUMBS
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-4 pt-3 md:px-6">

        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500"
        >

          <Link
            href="/en"
            className="transition hover:text-brand-600"
          >
            Home
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <Link
            href="/en/strategies"
            className="transition hover:text-brand-600"
          >
            Trading Strategies
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <span className="text-slate-700">
            Price Action
          </span>

        </nav>

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mx-auto max-w-[1520px] px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">

        {/* ===================================================
            DESKTOP HERO
        =================================================== */}
        <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm md:block">

          <div className="grid min-h-[390px] lg:grid-cols-[1.18fr_0.82fr]">

            {/* CONTENT */}
            <div className="flex flex-col justify-center px-8 py-7 lg:px-10 xl:px-12">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                  Trading Strategies
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
                  Price Action
                </span>

              </div>


              <h1 className="mt-4 max-w-[880px] text-[34px] font-black leading-[1.22] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                Price Action Trading Strategy: How to Read and Trade Price Movement
              </h1>


              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                Learn how traders use{" "}
                <strong className="font-black text-slate-900">
                  market structure, support and resistance, breakouts, pullbacks
                  and candlestick behavior
                </strong>{" "}
                to analyze price directly and build a structured trading plan
                without depending on a screen full of indicators.
              </p>


              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  Market Structure
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-black text-green-700">
                  Support & Resistance
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  Breakouts & Retests
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  Candlestick Setups
                </span>

              </div>


              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                <span>
                  📅 Updated August 16, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  15–20 min read
                </span>

              </div>

            </div>


            {/* VISUAL */}
            <div className="flex items-center justify-center border-l border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:p-8">

              <div className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">

                <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  </div>

                  <span className="text-[10px] font-black text-slate-700">
                    Price Action Model
                  </span>

                </div>


                <div className="p-4">
                  <PriceActionHeroDesktopChart />
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            MOBILE HERO — NO ZOOM
        =================================================== */}
        <div className="md:hidden">

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

            {/* CONTENT */}
            <div className="px-4 pb-2.5 pt-3.5">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
                  Trading Strategies
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600">
                  Price Action
                </span>

              </div>


              <h1 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950">
                Price Action Trading Strategy: A Practical Guide
              </h1>


              <p className="mt-3 text-[14px] leading-[1.85] text-slate-600">
                Learn how to read{" "}
                <strong className="font-black text-slate-900">
                  market structure, key levels, breakouts and retests
                </strong>{" "}
                directly from price.
              </p>


              <div className="mt-2.5 flex items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 Aug 16, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 15–20 min
                </span>

              </div>

            </div>


            {/* MOBILE CHART — NOT CLICKABLE */}
            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <PriceActionHeroMobileChart />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ARTICLE
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-3 py-5 sm:px-4 md:px-6 md:py-8 lg:px-8">

        <article className="space-y-6 md:space-y-8">


          {/* =================================================
              01 — WHAT IS PRICE ACTION?
          ================================================= */}

          <section
            id="what-is-price-action"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — The Basics
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Is Price Action Trading?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Price action trading is a method of analyzing a market by
                studying how price moves and reacts around important areas.
                Instead of making an indicator the starting point of the
                analysis, the trader focuses on the actual behavior of price.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

                {/* MAIN EXPLANATION */}
                <div>

                  <h3 className="text-[18px] font-black text-slate-950 md:text-[20px]">
                    What does a price action trader actually look at?
                  </h3>


                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px] md:leading-8">
                    A price action trader tries to understand the current
                    market condition before looking for an entry. That means
                    identifying whether price is trending or ranging, locating
                    important levels and then watching how buyers and sellers
                    behave when price reaches those areas.
                  </p>


                  <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">

                    {[
                      {
                        label: "Structure",
                        value: "Highs & Lows",
                      },
                      {
                        label: "Direction",
                        value: "Trend or Range",
                      },
                      {
                        label: "Location",
                        value: "Key Levels",
                      },
                      {
                        label: "Reaction",
                        value: "Rejection",
                      },
                      {
                        label: "Trigger",
                        value: "Breakout / Retest",
                      },
                      {
                        label: "Execution",
                        value: "Entry & Risk",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[14px] border border-slate-200 bg-slate-50/60 px-3 py-3"
                      >

                        <div className="text-[9px] font-black uppercase tracking-wide text-slate-500">
                          {item.label}
                        </div>

                        <div className="mt-1 text-[12px] font-black text-slate-950 md:text-[13px]">
                          {item.value}
                        </div>

                      </div>
                    ))}

                  </div>

                </div>


                {/* SIMPLE PROCESS */}
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/45 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Basic Price Action Process
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    A simple way to read the market
                  </h3>


                  <div className="mt-4 space-y-2">

                    {[
                      {
                        no: "1",
                        text: "Identify the current market condition and direction.",
                      },
                      {
                        no: "2",
                        text: "Mark the levels and zones that matter.",
                      },
                      {
                        no: "3",
                        text: "Watch how price approaches those areas.",
                      },
                      {
                        no: "4",
                        text: "Wait for a meaningful reaction or confirmation.",
                      },
                      {
                        no: "5",
                        text: "Define the entry, stop and target before execution.",
                      },
                    ].map((item) => (
                      <div
                        key={item.no}
                        className="flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                          {item.no}
                        </div>

                        <span className="text-[11px] font-bold leading-5 text-slate-700 md:text-[12px]">
                          {item.text}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

              </div>


              <div className="mt-5">

                <ImportantBox title="Price action does not mean trading randomly without indicators">
                  Removing indicators from a chart does not automatically create
                  a price action strategy. A structured approach still needs
                  clear rules for reading market structure, levels, price
                  behavior, entries and risk management.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              02 — HOW PRICE ACTION WORKS
          ================================================= */}

          <section
            id="how-it-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — Reading the Market
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How Does Price Action Trading Work?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Price action is not about memorizing a single candle pattern.
                The goal is to combine market context, structure, location and
                price reaction so that each trade idea has a logical reason
                behind it.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    no: "01",
                    title: "Read the Context",
                    text: "Is the market trending, ranging or transitioning between the two?",
                  },
                  {
                    no: "02",
                    title: "Find Key Areas",
                    text: "Identify support, resistance, previous highs and lows or important zones.",
                  },
                  {
                    no: "03",
                    title: "Watch the Reaction",
                    text: "Look at how price behaves when it reaches the area instead of predicting too early.",
                  },
                  {
                    no: "04",
                    title: "Build the Trade",
                    text: "Only then define the potential entry, invalidation point and target.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[14px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>


                    <p className="mt-2 text-[11px] leading-6 text-slate-600 md:text-[12px]">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* GOOD PROCESS */}
                <div className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                    Better Process
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Start with context, not with an entry signal
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    If the market is already in a strong uptrend and price
                    pulls back into a previously important area, a bullish
                    reaction may have more context than the same candle pattern
                    appearing randomly in the middle of a range.
                  </p>

                </div>


                {/* BAD PROCESS */}
                <div className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-rose-700">
                    Common Mistake
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Treating every candle pattern as a trade
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    A pin bar, engulfing candle or breakout can appear almost
                    anywhere on a chart. Without market structure and location,
                    the pattern alone provides limited information.
                  </p>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  The core price action question
                </h3>

                <p className="mt-1.5 text-[13px] leading-7 text-slate-600">
                  Instead of asking{" "}
                  <strong className="font-black text-slate-900">
                    “What pattern is this?”
                  </strong>{" "}
                  start by asking{" "}
                  <strong className="font-black text-slate-900">
                    “Where is price, what happened before it reached this area,
                    and what is price doing now?”
                  </strong>
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              03 — MARKET STRUCTURE
          ================================================= */}

          <section
            id="market-structure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — Market Structure
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Market Structure: How to Identify Trends With Price Action
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Market structure is one of the foundations of price action
                trading. By studying the sequence of highs and lows, traders
                can determine whether price is trending upward, trending
                downward or moving sideways.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">

                {/* EXPLANATION */}
                <div>

                  <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">

                    {/* UPTREND */}
                    <div className="rounded-[16px] border border-emerald-100 bg-emerald-50/40 p-3.5">

                      <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                        Uptrend
                      </div>

                      <h3 className="mt-1 text-[15px] font-black text-slate-950">
                        Higher Highs + Higher Lows
                      </h3>

                      <p className="mt-1.5 text-[11px] leading-5 text-slate-600">
                        Price continues to create higher swing highs while
                        pullbacks hold above previous significant lows.
                      </p>

                    </div>


                    {/* DOWNTREND */}
                    <div className="rounded-[16px] border border-rose-100 bg-rose-50/40 p-3.5">

                      <div className="text-[9px] font-black uppercase tracking-wide text-rose-700">
                        Downtrend
                      </div>

                      <h3 className="mt-1 text-[15px] font-black text-slate-950">
                        Lower Highs + Lower Lows
                      </h3>

                      <p className="mt-1.5 text-[11px] leading-5 text-slate-600">
                        Price keeps producing lower swing highs and lower lows,
                        showing continued selling pressure.
                      </p>

                    </div>


                    {/* RANGE */}
                    <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3.5">

                      <div className="text-[9px] font-black uppercase tracking-wide text-slate-500">
                        Range
                      </div>

                      <h3 className="mt-1 text-[15px] font-black text-slate-950">
                        No Clear Direction
                      </h3>

                      <p className="mt-1.5 text-[11px] leading-5 text-slate-600">
                        Price repeatedly rotates between support and resistance
                        without maintaining a sequence of higher or lower
                        swings.
                      </p>

                    </div>

                  </div>


                  <div className="mt-3 rounded-[16px] border border-brand-100 bg-brand-50/50 p-3.5">

                    <h3 className="text-[13px] font-black text-slate-950">
                      Why structure matters
                    </h3>

                    <p className="mt-1 text-[11px] leading-6 text-slate-600">
                      The same breakout or candlestick pattern can mean
                      something very different depending on whether it appears
                      with the trend, against the trend or inside a range.
                    </p>

                  </div>

                </div>


                {/* CHART */}
                <MarketStructureChart />

              </div>


              <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                {[
                  {
                    label: "Bullish Structure",
                    title: "HH + HL",
                    text: "Higher highs and higher lows.",
                  },
                  {
                    label: "Bearish Structure",
                    title: "LH + LL",
                    text: "Lower highs and lower lows.",
                  },
                  {
                    label: "Sideways Structure",
                    title: "Range",
                    text: "Price rotates between boundaries.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[15px] border border-slate-200 bg-slate-50/60 p-3"
                  >

                    <div className="text-[8px] font-black uppercase tracking-wide text-brand-600">
                      {item.label}
                    </div>

                    <div className="mt-0.5 text-[14px] font-black text-slate-950">
                      {item.title}
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4">

                <ImportantBox title="Do not force a trend when the structure is unclear">
                  If the market is producing overlapping swings with no clear
                  sequence of higher highs or lower lows, treating it as a
                  strong trend can lead to poor entries. Sometimes the best
                  price action read is simply that the market is ranging.
                </ImportantBox>

              </div>

            </div>

          </section>

                    {/* =================================================
              04 — SUPPORT & RESISTANCE
          ================================================= */}

          <section
            id="support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — Key Price Levels
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Support and Resistance in Price Action Trading
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Support and resistance are among the most important concepts
                in price action trading. Rather than treating them as exact
                prices, it is often more useful to think of them as{" "}
                <strong className="font-black text-slate-900">
                  price zones
                </strong>{" "}
                where buyers or sellers have previously reacted and where
                price may become more active again.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">

                <div>

                  <div className="space-y-3">

                    {/* SUPPORT */}
                    <div className="rounded-[16px] border border-emerald-100 bg-emerald-50/40 p-4">

                      <h3 className="text-[15px] font-black text-slate-950">
                        Support Zone
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                        Support is an area where falling prices previously
                        attracted enough buying interest to slow or reverse the
                        decline. However, previous support does not guarantee
                        that price will bounce again on the next test.
                      </p>

                    </div>


                    {/* RESISTANCE */}
                    <div className="rounded-[16px] border border-rose-100 bg-rose-50/40 p-4">

                      <h3 className="text-[15px] font-black text-slate-950">
                        Resistance Zone
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                        Resistance is an area where rising prices previously
                        encountered selling pressure or lost momentum. When
                        price returns, traders watch the reaction instead of
                        assuming the level must automatically hold.
                      </p>

                    </div>


                    {/* ROLE REVERSAL */}
                    <div className="rounded-[16px] border border-brand-100 bg-brand-50/40 p-4">

                      <h3 className="text-[15px] font-black text-slate-950">
                        Support and Resistance Role Reversal
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                        After resistance is broken, the same area may act as
                        support during a retest. The opposite can happen after
                        support breaks. This support-resistance flip is useful
                        in price action analysis, but the reaction still needs
                        confirmation.
                      </p>

                    </div>

                  </div>

                </div>


                {/* CHART — MOBILE TAP TO ENLARGE */}
                <SupportResistanceChart />

              </div>


              {/* =================================================
                  HOW TO IDENTIFY STRONG LEVELS
              ================================================= */}
              <div className="mt-5">

                <div className="mb-3">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Level Quality
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    What makes a support or resistance zone important?
                  </h3>

                </div>


                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">

                  {[
                    {
                      no: "01",
                      title: "Clear Reaction",
                      text: "Price previously moved away from the area with visible momentum.",
                    },
                    {
                      no: "02",
                      title: "Repeated Attention",
                      text: "The market has reacted around the same zone more than once.",
                    },
                    {
                      no: "03",
                      title: "Market Structure",
                      text: "The area aligns with an important swing high, low or structural point.",
                    },
                    {
                      no: "04",
                      title: "Current Context",
                      text: "The level makes sense within the trend, range or breakout being traded.",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="rounded-[15px] border border-slate-200 bg-slate-50/60 p-3.5"
                    >

                      <div className="flex items-center gap-2.5">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                          {item.no}
                        </div>

                        <h4 className="text-[12px] font-black text-slate-900">
                          {item.title}
                        </h4>

                      </div>

                      <p className="mt-2 text-[11px] leading-5 text-slate-500">
                        {item.text}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              {/* WARNING */}
              <div className="mt-5 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[12px] font-black text-white">
                    !
                  </div>


                  <div className="min-w-0">

                    <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
                      Too many support and resistance levels can make the chart harder to read
                    </h3>

                    <p className="mt-1 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      If every minor high and low becomes a level, the chart
                      quickly fills with lines that provide little useful
                      information. Focus on zones with meaningful reactions
                      and levels that fit the current market structure.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              05 — CANDLESTICK PRICE ACTION
          ================================================= */}

          <section
            id="candlestick-patterns"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — Candlestick Price Action
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Read Candlestick Patterns in Price Action Trading
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Candlestick patterns can reveal useful information about
                momentum, rejection and short-term changes in market behavior,
                but they should not be treated as automatic buy or sell
                signals. Their value depends heavily on{" "}
                <strong className="font-black text-slate-900">
                  where they appear and what price was doing beforehand.
                </strong>
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* =================================================
                  CANDLE TYPES
              ================================================= */}
              <div className="grid gap-3 md:grid-cols-3">

                {/* LONG WICK */}
                <article className="rounded-[18px] border border-brand-100 bg-brand-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Price Rejection
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Long-Wick Candlestick
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    A long wick can show that price moved aggressively into an
                    area but was pushed back before the candle closed. The
                    location of that rejection is usually more important than
                    the candle shape by itself.
                  </p>

                </article>


                {/* ENGULFING */}
                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                    Momentum Shift
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Engulfing Candlestick
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    An engulfing candle can indicate a noticeable shift in
                    short-term momentum, particularly when it forms around an
                    important level after a clear move in the opposite
                    direction.
                  </p>

                </article>


                {/* DOJI */}
                <article className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-slate-500">
                    Indecision
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Doji or Small-Body Candle
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    A Doji or small-body candle can reflect temporary
                    indecision between buyers and sellers. It does not
                    automatically predict a reversal and usually requires
                    context and confirmation.
                  </p>

                </article>

              </div>


              {/* =================================================
                  CANDLE READING LOGIC
              ================================================= */}
              <div className="mt-4 grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">

                {/* MAIN READING LOGIC */}
                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                        Reading Context
                      </div>

                      <h3 className="mt-1 text-[17px] font-black text-slate-950">
                        How should you read a candlestick pattern?
                      </h3>

                    </div>


                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[14px] font-black text-brand-600 sm:flex">
                      5
                    </div>

                  </div>


                  <p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    Do not begin with the name of the pattern. Start with the
                    market context, then evaluate where the candle formed,
                    what happened before it and whether subsequent price
                    action confirms the idea.
                  </p>


                  {/* =================================================
                      DESKTOP / TABLET CHECKLIST
                  ================================================= */}
                  <div className="mt-4 hidden gap-2.5 sm:grid sm:grid-cols-2">

                    {[
                      {
                        no: "01",
                        title: "Location",
                        text: "Did the candle form near support, resistance or another important level?",
                      },
                      {
                        no: "02",
                        title: "Previous Move",
                        text: "What was price doing immediately before the pattern appeared?",
                      },
                      {
                        no: "03",
                        title: "Candle Reaction",
                        text: "Does the candle show meaningful rejection or a clear momentum shift?",
                      },
                      {
                        no: "04",
                        title: "Confirmation",
                        text: "Did subsequent price action support the interpretation?",
                      },
                      {
                        no: "05",
                        title: "Invalidation",
                        text: "Is there a logical price level that would invalidate the trade idea?",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.no}
                        className={`flex items-start gap-3 rounded-[13px] border border-slate-100 bg-slate-50/60 px-3 py-3 ${
                          index === 4 ? "sm:col-span-2" : ""
                        }`}
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                          {item.no}
                        </div>


                        <div className="min-w-0">

                          <h4 className="text-[12px] font-black text-slate-900">
                            {item.title}
                          </h4>

                          <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                            {item.text}
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>


                  {/* =================================================
                      MOBILE CHECKLIST
                  ================================================= */}
                  <div className="mt-3 overflow-hidden rounded-[14px] border border-slate-100 sm:hidden">

                    {[
                      [
                        "01",
                        "Candle Location",
                        "Key level or simply the middle of a move?",
                      ],
                      [
                        "02",
                        "Previous Move",
                        "What happened before the candle appeared?",
                      ],
                      [
                        "03",
                        "Pattern Strength",
                        "Does it show clear rejection or momentum?",
                      ],
                      [
                        "04",
                        "Confirmation",
                        "Did price confirm the interpretation?",
                      ],
                      [
                        "05",
                        "Invalidation",
                        "Is there a logical stop-loss level?",
                      ],
                    ].map(([no, title, text], index) => (
                      <div
                        key={no}
                        className={`flex items-center gap-3 px-3 py-2.5 ${
                          index !== 4 ? "border-b border-slate-100" : ""
                        }`}
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                          {no}
                        </div>


                        <div className="min-w-0">

                          <div className="text-[12px] font-black text-slate-900">
                            {title}
                          </div>

                          <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                            {text}
                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>


                {/* =================================================
                    COMMON MISTAKE
                ================================================= */}
                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/55 p-4 md:p-5">

                  <div className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-amber-700">
                    Common Mistake
                  </div>


                  <h3 className="mt-2 text-[17px] font-black leading-7 text-slate-950">
                    Memorizing candlestick patterns without understanding context
                  </h3>


                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    Pin bars, engulfing candles and Doji patterns appear
                    frequently across almost every market and timeframe.
                    Finding the pattern alone does not mean there is a
                    high-quality trading opportunity.
                  </p>


                  <div className="mt-4 rounded-[14px] border border-amber-100 bg-white/80 p-3">

                    <div className="text-[10px] font-black text-slate-700">
                      Instead of asking for the pattern name, ask:
                    </div>


                    <div className="mt-2 space-y-2">

                      {[
                        "Where did the pattern form?",
                        "What happened before it appeared?",
                        "Is there an important price level nearby?",
                        "Did market behavior change after the pattern?",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2"
                        >

                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />

                          <span className="text-[11px] leading-5 text-slate-600">
                            {item}
                          </span>

                        </div>
                      ))}

                    </div>

                  </div>


                  <div className="mt-4 border-t border-amber-100 pt-3">

                    <p className="text-[11px] leading-5 text-slate-500">
                      The goal is to understand what buyers and sellers are
                      doing—not to memorize the largest possible collection of
                      candlestick names.
                    </p>

                  </div>

                </aside>

              </div>


              {/* IMPORTANT NOTE */}
              <div className="mt-4">

                <ImportantBox title="A candlestick is confirmation, not the entire trade setup">
                  Even a visually strong candlestick pattern can have limited
                  value if it appears in an unimportant location or conflicts
                  with clear market structure. Use candlesticks as one part of
                  the overall price action setup rather than as isolated
                  trading signals.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              06 — PIN BAR & ENGULFING
          ================================================= */}

          <section
            id="pin-bar-engulfing"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — Popular Price Action Patterns
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Pin Bar and Engulfing Candlestick Trading Setups
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The Pin Bar and Engulfing pattern are two of the most widely
                recognized price action candlestick setups. Their usefulness,
                however, depends less on memorizing their shape and more on{" "}
                <strong className="font-black text-slate-900">
                  where they form, the market structure around them and the
                  price reaction that follows.
                </strong>
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                {/* =================================================
                    PIN BAR
                ================================================= */}
                <article className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                        Price Rejection
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        Pin Bar Pattern
                      </h3>

                    </div>


                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brand-50 text-[14px] font-black text-brand-600">
                      P
                    </div>

                  </div>


                  <p className="mt-3 text-[13px] leading-6 text-slate-600">
                    A Pin Bar typically has a pronounced wick relative to its
                    body. It shows that price attempted to move strongly in one
                    direction but was rejected before the candle closed.
                  </p>


                  <div className="mt-3 rounded-[14px] border border-slate-100 bg-slate-50/70 p-3">

                    <div className="text-[10px] font-black text-slate-700">
                      A Pin Bar becomes more meaningful when:
                    </div>


                    <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">
                      <li>• It forms at a clear support or resistance zone.</li>
                      <li>• It aligns with the broader market structure.</li>
                      <li>• Price confirms the rejection after the candle closes.</li>
                    </ul>

                  </div>


                  <div className="mt-3 rounded-[14px] border border-brand-100 bg-brand-50/40 p-3">

                    <div className="text-[10px] font-black text-brand-700">
                      What the wick tells you
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      The wick represents an area price explored but failed to
                      maintain. That rejection becomes more relevant when it
                      occurs at a price zone traders were already watching.
                    </p>

                  </div>

                </article>


                {/* =================================================
                    ENGULFING
                ================================================= */}
                <article className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                        Momentum Shift
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        Engulfing Candlestick Pattern
                      </h3>

                    </div>


                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-emerald-50 text-[14px] font-black text-emerald-700">
                      E
                    </div>

                  </div>


                  <p className="mt-3 text-[13px] leading-6 text-slate-600">
                    An engulfing candle can reflect a noticeable shift in
                    momentum when its body dominates the previous candle's
                    body and price closes strongly in the opposite direction.
                  </p>


                  <div className="mt-3 rounded-[14px] border border-slate-100 bg-slate-50/70 p-3">

                    <div className="text-[10px] font-black text-slate-700">
                      An Engulfing pattern becomes more useful when:
                    </div>


                    <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">
                      <li>• It appears after a meaningful directional move.</li>
                      <li>• It forms around an important price level.</li>
                      <li>• The candle shows a clear change in momentum.</li>
                    </ul>

                  </div>


                  <div className="mt-3 rounded-[14px] border border-emerald-100 bg-emerald-50/40 p-3">

                    <div className="text-[10px] font-black text-emerald-700">
                      What the candle body tells you
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      A strong body can show that one side of the market gained
                      control during that candle. The surrounding structure
                      determines whether that shift is meaningful enough to
                      consider as part of a trade setup.
                    </p>

                  </div>

                </article>

              </div>


              {/* =================================================
                  BULLISH VS BEARISH
              ================================================= */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                {/* BULLISH */}
                <div className="rounded-[17px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                    Bullish Setup
                  </div>

                  <h3 className="mt-1 text-[15px] font-black text-slate-950">
                    Bullish Pin Bar or Bullish Engulfing
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-slate-600">
                    A bullish pattern may become relevant when sellers push
                    price lower but buyers regain control around support or
                    another meaningful area. Confirmation after the pattern
                    helps determine whether the rejection is continuing.
                  </p>

                </div>


                {/* BEARISH */}
                <div className="rounded-[17px] border border-rose-100 bg-rose-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-rose-700">
                    Bearish Setup
                  </div>

                  <h3 className="mt-1 text-[15px] font-black text-slate-950">
                    Bearish Pin Bar or Bearish Engulfing
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-slate-600">
                    A bearish pattern may become relevant when buyers push
                    price higher but sellers regain control near resistance or
                    another significant area. The pattern becomes stronger
                    when the broader market context supports the idea.
                  </p>

                </div>

              </div>


              {/* =================================================
                  PATTERN VS CONTEXT
              ================================================= */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  Pattern vs. context: why the same Pin Bar can mean different things
                </h3>


                <div className="mt-3 grid gap-2 md:grid-cols-2">

                  {/* WEAK */}
                  <div className="rounded-[14px] border border-rose-100 bg-white p-3">

                    <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                      Lower-Quality Context
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      A Pin Bar forms in the middle of a choppy trading range
                      with no clear support, resistance or structural reason
                      for the market to react.
                    </p>

                  </div>


                  {/* STRONGER */}
                  <div className="rounded-[14px] border border-emerald-100 bg-white p-3">

                    <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                      Stronger Context
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      A bullish Pin Bar forms around established support during
                      an uptrend and is followed by price action that confirms
                      the rejection.
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  QUICK CHECKLIST
              ================================================= */}
              <div className="mt-4">

                <div className="mb-3">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Before Trading the Pattern
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Pin Bar and Engulfing checklist
                  </h3>

                </div>


                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

                  {[
                    {
                      no: "1",
                      title: "Structure",
                      text: "Does the setup fit the current market structure?",
                    },
                    {
                      no: "2",
                      title: "Location",
                      text: "Did it form around a meaningful price area?",
                    },
                    {
                      no: "3",
                      title: "Reaction",
                      text: "Is the rejection or momentum shift clear?",
                    },
                    {
                      no: "4",
                      title: "Risk",
                      text: "Is there a logical invalidation point before entry?",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="flex items-start gap-3 rounded-[14px] border border-slate-200 bg-white p-3"
                    >

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </div>


                      <div>

                        <div className="text-[11px] font-black text-slate-900">
                          {item.title}
                        </div>

                        <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                          {item.text}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="Do not trade a Pin Bar or Engulfing candle just because it has the right shape">
                  Pattern recognition is only the first step. Market structure,
                  location, previous price movement and confirmation can be far
                  more important than whether a candle perfectly matches a
                  textbook definition.
                </ImportantBox>

              </div>

            </div>

          </section>
                    {/* =================================================
              07 — BREAKOUTS & FALSE BREAKOUTS
          ================================================= */}

          <section
            id="breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — Breakout Trading
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Price Action Breakouts, Retests and False Breakouts
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A breakout happens when price moves beyond an established
                support or resistance area. But not every breakout develops
                into a sustained move. Some breakouts hold and continue, while
                others quickly fail and return inside the previous range.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* =================================================
                  THREE BREAKOUT STATES
              ================================================= */}
              <div className="grid gap-3 md:grid-cols-3">

                {/* BREAKOUT */}
                <div className="rounded-[17px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="text-[9px] font-black text-brand-600">
                    01
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Breakout
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    Price moves beyond an important level and closes outside
                    the area. This confirms that the level has been broken,
                    but it does not guarantee continuation.
                  </p>

                </div>


                {/* RETEST */}
                <div className="rounded-[17px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black text-emerald-700">
                    02
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Retest
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    Price returns to the broken level and attempts to hold on
                    the other side. A successful retest can provide more
                    information than entering immediately after the breakout.
                  </p>

                </div>


                {/* FALSE BREAKOUT */}
                <div className="rounded-[17px] border border-rose-100 bg-rose-50/40 p-4">

                  <div className="text-[9px] font-black text-rose-700">
                    03
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    False Breakout
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    Price trades beyond the level but fails to stay there and
                    quickly returns inside the previous range, suggesting that
                    the breakout attempt did not hold.
                  </p>

                </div>

              </div>


              {/* =================================================
                  BREAKOUT QUALITY
              ================================================= */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                      Breakout Quality
                    </div>

                    <h3 className="mt-1 text-[17px] font-black text-slate-950">
                      What can make a breakout more convincing?
                    </h3>

                  </div>

                </div>


                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">

                  {[
                    {
                      title: "Established Level",
                      text: "The breakout occurs around support or resistance that the market has clearly respected before.",
                    },
                    {
                      title: "Decisive Movement",
                      text: "Price moves through the area with noticeable momentum rather than drifting slowly across it.",
                    },
                    {
                      title: "Clear Close",
                      text: "The candle closes beyond the zone rather than only producing a temporary wick through it.",
                    },
                    {
                      title: "Price Holds Outside",
                      text: "The market does not immediately collapse back inside the previous trading range.",
                    },
                    {
                      title: "Successful Retest",
                      text: "Price returns to the broken area and reacts in the direction of the original breakout.",
                    },
                    {
                      title: "Structural Alignment",
                      text: "The breakout makes sense within the broader market structure and trend.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[13px] bg-slate-50 px-3 py-3"
                    >

                      <div className="flex items-center gap-2">

                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />

                        <h4 className="text-[11px] font-black text-slate-900">
                          {item.title}
                        </h4>

                      </div>

                      <p className="mt-1.5 text-[10px] leading-5 text-slate-500 md:text-[11px]">
                        {item.text}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              {/* =================================================
                  TRUE VS FALSE BREAKOUT
              ================================================= */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* HOLDS */}
                <div className="rounded-[17px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                    Breakout Holds
                  </div>

                  <h3 className="mt-1 text-[15px] font-black text-slate-950">
                    Price accepts the new area
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-slate-600">
                    After the breakout, price remains beyond the previous
                    level and may use it as new support or resistance during a
                    later retest.
                  </p>

                </div>


                {/* FAILS */}
                <div className="rounded-[17px] border border-rose-100 bg-rose-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-rose-700">
                    Breakout Fails
                  </div>

                  <h3 className="mt-1 text-[15px] font-black text-slate-950">
                    Price returns inside the range
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-slate-600">
                    A rapid move back through the broken level can signal that
                    the market rejected the breakout and that traders who
                    entered late may be trapped.
                  </p>

                </div>

              </div>


              {/* WARNING */}
              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[12px] font-black text-white">
                    !
                  </div>


                  <div>

                    <h3 className="text-[14px] font-black text-slate-950">
                      Avoid chasing a breakout after price has already extended
                    </h3>

                    <p className="mt-1 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      Entering after a large move can leave the stop-loss far
                      away and reduce the potential risk-to-reward ratio. In
                      many cases, waiting for a pullback or retest can provide
                      a clearer structure for the trade.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              08 — PULLBACK & RETEST
          ================================================= */}

          <section
            id="pullback-retest"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* =================================================
                HEADER
            ================================================= */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                08 — Pullback & Retest
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Pullback Trading: How to Use Retests for Better Entries
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Instead of entering after price has already made a large move,
                a price action trader may wait for a{" "}
                <strong className="font-black text-slate-900">
                  pullback into an important area
                </strong>{" "}
                and then watch for evidence that the original trend is ready
                to continue.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* =================================================
                  MAIN EXPLANATION + VISUAL
              ================================================= */}
              <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">

                {/* =================================================
                    EXPLANATION
                ================================================= */}
                <div className="rounded-[20px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Bullish Pullback Example
                  </div>


                  <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
                    How does a pullback work inside an uptrend?
                  </h3>


                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    The goal is not to buy simply because price has fallen.
                    First, there should be a clear bullish structure. Then the
                    trader waits for price to retrace into a meaningful area
                    and watches whether buyers begin to take control again.
                  </p>


                  <div className="mt-4 space-y-2">

                    {[
                      {
                        no: "01",
                        title: "Bullish Structure",
                        text: "The market is producing higher highs and higher lows.",
                      },
                      {
                        no: "02",
                        title: "Level Break",
                        text: "Price breaks above resistance or a meaningful swing high.",
                      },
                      {
                        no: "03",
                        title: "Pullback",
                        text: "Price returns toward the broken area instead of continuing immediately.",
                      },
                      {
                        no: "04",
                        title: "Bullish Reaction",
                        text: "Buyers begin rejecting lower prices around the retest area.",
                      },
                      {
                        no: "05",
                        title: "Entry After Confirmation",
                        text: "The setup is evaluated after confirmation rather than while price is still falling.",
                      },
                    ].map((item) => (
                      <div
                        key={item.no}
                        className="flex items-start gap-3 rounded-[13px] bg-slate-50/70 px-3 py-2.5"
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                          {item.no}
                        </div>


                        <div className="min-w-0">

                          <h4 className="text-[12px] font-black text-slate-900">
                            {item.title}
                          </h4>

                          <p className="mt-0.5 text-[10px] leading-5 text-slate-500 md:text-[11px]">
                            {item.text}
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>


                  <div className="mt-4 rounded-[14px] border border-brand-100 bg-brand-50/50 p-3">

                    <h4 className="text-[12px] font-black text-slate-900">
                      What invalidates the pullback idea?
                    </h4>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      If price clearly breaks through the retest area and starts
                      producing bearish structure, the move may no longer be a
                      normal pullback. The original continuation scenario
                      should then be reassessed.
                    </p>

                  </div>

                </div>


                {/* =================================================
                    VISUAL CHART — PULLBACK / RETEST
                ================================================= */}
                <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

                  {/* CHART HEADER */}
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">

                    <div>

                      <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
                        Visual Example: Breakout and Retest
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Trend → Breakout → Pullback → Confirmation → Continuation
                      </p>

                    </div>


                    <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[8px] font-black text-brand-600">
                      Retest
                    </span>

                  </div>


                  {/* =================================================
                      DESKTOP CHART
                  ================================================= */}
                  <div className="hidden md:block">

                    <svg
                      viewBox="0 0 820 430"
                      className="block w-full"
                      role="img"
                      aria-label="Price action breakout and retest example"
                    >
                      <rect
                        width="820"
                        height="430"
                        fill="#ffffff"
                      />


                      {[75, 145, 215, 285, 355].map((y) => (
                        <line
                          key={`pullback-desktop-${y}`}
                          x1="45"
                          y1={y}
                          x2="775"
                          y2={y}
                          stroke="#eef2f7"
                          strokeWidth="1"
                        />
                      ))}


                      {/* OLD RESISTANCE */}
                      <rect
                        x="65"
                        y="247"
                        width="545"
                        height="44"
                        rx="10"
                        fill="#eef5fd"
                        stroke="#93c5fd"
                      />

                      <text
                        x="170"
                        y="273"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#1e5bb8"
                      >
                        Previous Resistance
                      </text>


                      {/* PRICE */}
                      <polyline
                        points="
                          65,350
                          135,310
                          205,325
                          275,265
                          335,285
                          400,220
                          465,245
                          525,170
                          585,118
                          640,182
                          680,255
                          720,205
                          770,118
                        "
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />


                      {/* BREAKOUT */}
                      <circle
                        cx="525"
                        cy="170"
                        r="9"
                        fill="#eff6ff"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />

                      <text
                        x="525"
                        y="143"
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="900"
                        fill="#1d4ed8"
                      >
                        Breakout
                      </text>


                      {/* RETEST */}
                      <circle
                        cx="680"
                        cy="255"
                        r="10"
                        fill="#fff7ed"
                        stroke="#f59e0b"
                        strokeWidth="4"
                      />

                      <text
                        x="680"
                        y="287"
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="900"
                        fill="#b45309"
                      >
                        Retest
                      </text>


                      {/* CONFIRMATION */}
                      <circle
                        cx="720"
                        cy="205"
                        r="9"
                        fill="#dcfce7"
                        stroke="#16a34a"
                        strokeWidth="3"
                      />

                      <text
                        x="720"
                        y="181"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#15803d"
                      >
                        Confirmation
                      </text>


                      {/* ENTRY */}
                      <line
                        x1="745"
                        y1="280"
                        x2="745"
                        y2="203"
                        stroke="#16a34a"
                        strokeWidth="3.5"
                      />

                      <polygon
                        points="745,190 737,208 753,208"
                        fill="#16a34a"
                      />

                      <text
                        x="760"
                        y="235"
                        fontSize="12"
                        fontWeight="900"
                        fill="#15803d"
                      >
                        Entry
                      </text>


                      {/* INVALIDATION */}
                      <line
                        x1="630"
                        y1="312"
                        x2="750"
                        y2="312"
                        stroke="#ef4444"
                        strokeWidth="2.5"
                      />

                      <text
                        x="690"
                        y="335"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#dc2626"
                      >
                        Invalidation
                      </text>


                      {/* CONTINUATION */}
                      <line
                        x1="720"
                        y1="145"
                        x2="770"
                        y2="112"
                        stroke="#16a34a"
                        strokeWidth="3"
                      />

                      <text
                        x="700"
                        y="92"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#15803d"
                      >
                        Trend Continuation
                      </text>


                      {/* SUMMARY */}
                      <rect
                        x="150"
                        y="375"
                        width="520"
                        height="34"
                        rx="17"
                        fill="#f8fafc"
                        stroke="#e2e8f0"
                      />

                      <text
                        x="410"
                        y="397"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="800"
                        fill="#475569"
                      >
                        Wait for the retest to hold before considering the entry
                      </text>

                    </svg>

                  </div>


                  {/* =================================================
                      MOBILE PREVIEW — CLICK TO EXPAND
                  ================================================= */}
                  <div className="md:hidden">

                    <a
                      href="#pullback-chart-fullscreen"
                      className="group block cursor-zoom-in"
                      aria-label="Open pullback and retest chart full screen"
                    >

                      <svg
                        viewBox="0 0 360 310"
                        className="block w-full"
                        role="img"
                        aria-label="Simplified breakout and retest example"
                      >
                        <rect
                          width="360"
                          height="310"
                          fill="#ffffff"
                        />


                        {[55, 110, 165, 220].map((y) => (
                          <line
                            key={`pullback-mobile-${y}`}
                            x1="20"
                            y1={y}
                            x2="340"
                            y2={y}
                            stroke="#eef2f7"
                          />
                        ))}


                        <rect
                          x="30"
                          y="185"
                          width="245"
                          height="32"
                          rx="8"
                          fill="#eef5fd"
                          stroke="#93c5fd"
                        />


                        <polyline
                          points="
                            20,245
                            60,215
                            95,230
                            135,180
                            175,198
                            215,145
                            250,105
                            285,195
                            315,160
                            340,95
                          "
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />


                        <circle
                          cx="250"
                          cy="105"
                          r="6"
                          fill="#eff6ff"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                        />

                        <text
                          x="250"
                          y="87"
                          textAnchor="middle"
                          fontSize="8.5"
                          fontWeight="900"
                          fill="#1d4ed8"
                        >
                          Breakout
                        </text>


                        <circle
                          cx="285"
                          cy="195"
                          r="7"
                          fill="#fff7ed"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                        />

                        <text
                          x="285"
                          y="220"
                          textAnchor="middle"
                          fontSize="8.5"
                          fontWeight="900"
                          fill="#b45309"
                        >
                          Retest
                        </text>


                        <circle
                          cx="315"
                          cy="160"
                          r="6"
                          fill="#dcfce7"
                          stroke="#16a34a"
                          strokeWidth="2.5"
                        />

                        <text
                          x="315"
                          y="145"
                          textAnchor="middle"
                          fontSize="7.5"
                          fontWeight="900"
                          fill="#15803d"
                        >
                          Confirm
                        </text>


                        <rect
                          x="55"
                          y="260"
                          width="250"
                          height="30"
                          rx="15"
                          fill="#0f172a"
                        />

                        <text
                          x="180"
                          y="279"
                          textAnchor="middle"
                          fontSize="8.5"
                          fontWeight="900"
                          fill="#ffffff"
                        >
                          Breakout → Retest → Confirmation
                        </text>

                      </svg>


                      <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

                        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">

                          <span>
                            Enlarge chart
                          </span>

                          <span className="text-[14px]">
                            ↗
                          </span>

                        </div>

                      </div>

                    </a>

                  </div>


                  {/* EXPLANATION */}
                  <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3">

                    <p className="text-[11px] leading-5 text-slate-600 md:text-[12px] md:leading-6">
                      <strong className="font-black text-slate-900">
                        How to read this chart:
                      </strong>{" "}
                      resistance is broken first, then price returns to the
                      same area. The setup is not based on the retest alone;
                      the trader waits for evidence that buyers are defending
                      the level.
                    </p>

                  </div>


                  {/* =================================================
                      FULLSCREEN LIGHTBOX
                  ================================================= */}
                  <div
                    id="pullback-chart-fullscreen"
                    className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
                  >

                    <a
                      href="#pullback-retest"
                      className="absolute inset-0"
                      aria-label="Close chart"
                    />


                    <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

                      {/* HEADER */}
                      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                        <div>

                          <div className="text-[14px] font-black text-slate-950">
                            Breakout and Retest
                          </div>

                          <div className="mt-0.5 text-[10px] text-slate-500">
                            Watch the breakout, pullback and confirmation
                          </div>

                        </div>


                        <a
                          href="#pullback-retest"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
                          aria-label="Close"
                        >
                          ×
                        </a>

                      </div>


                      <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">

                        <span className="text-[16px]">
                          ↔
                        </span>

                        <span>
                          Swipe left or right to explore the full chart
                        </span>

                      </div>


                      <div
                        dir="ltr"
                        className="overflow-x-auto overflow-y-auto bg-white"
                      >

                        <svg
                          viewBox="0 0 820 430"
                          className="block min-w-[900px] w-full"
                          role="img"
                          aria-label="Expanded breakout and retest chart"
                        >
                          <rect
                            width="820"
                            height="430"
                            fill="#ffffff"
                          />


                          {[75, 145, 215, 285, 355].map((y) => (
                            <line
                              key={`pullback-full-${y}`}
                              x1="45"
                              y1={y}
                              x2="775"
                              y2={y}
                              stroke="#eef2f7"
                              strokeWidth="1"
                            />
                          ))}


                          <rect
                            x="65"
                            y="247"
                            width="545"
                            height="44"
                            rx="10"
                            fill="#eef5fd"
                            stroke="#93c5fd"
                          />

                          <text
                            x="170"
                            y="273"
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="900"
                            fill="#1e5bb8"
                          >
                            Previous Resistance
                          </text>


                          <polyline
                            points="
                              65,350
                              135,310
                              205,325
                              275,265
                              335,285
                              400,220
                              465,245
                              525,170
                              585,118
                              640,182
                              680,255
                              720,205
                              770,118
                            "
                            fill="none"
                            stroke="#0f172a"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />


                          <circle
                            cx="525"
                            cy="170"
                            r="9"
                            fill="#eff6ff"
                            stroke="#2563eb"
                            strokeWidth="3"
                          />

                          <text
                            x="525"
                            y="143"
                            textAnchor="middle"
                            fontSize="13"
                            fontWeight="900"
                            fill="#1d4ed8"
                          >
                            Breakout
                          </text>


                          <circle
                            cx="680"
                            cy="255"
                            r="10"
                            fill="#fff7ed"
                            stroke="#f59e0b"
                            strokeWidth="4"
                          />

                          <text
                            x="680"
                            y="287"
                            textAnchor="middle"
                            fontSize="13"
                            fontWeight="900"
                            fill="#b45309"
                          >
                            Retest
                          </text>


                          <circle
                            cx="720"
                            cy="205"
                            r="9"
                            fill="#dcfce7"
                            stroke="#16a34a"
                            strokeWidth="3"
                          />

                          <text
                            x="720"
                            y="181"
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="900"
                            fill="#15803d"
                          >
                            Confirmation
                          </text>


                          <line
                            x1="745"
                            y1="280"
                            x2="745"
                            y2="203"
                            stroke="#16a34a"
                            strokeWidth="3.5"
                          />

                          <polygon
                            points="745,190 737,208 753,208"
                            fill="#16a34a"
                          />

                          <text
                            x="760"
                            y="235"
                            fontSize="12"
                            fontWeight="900"
                            fill="#15803d"
                          >
                            Entry
                          </text>


                          <line
                            x1="630"
                            y1="312"
                            x2="750"
                            y2="312"
                            stroke="#ef4444"
                            strokeWidth="2.5"
                          />

                          <text
                            x="690"
                            y="335"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="900"
                            fill="#dc2626"
                          >
                            Invalidation
                          </text>


                          <text
                            x="700"
                            y="92"
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="900"
                            fill="#15803d"
                          >
                            Trend Continuation
                          </text>


                          <rect
                            x="150"
                            y="375"
                            width="520"
                            height="34"
                            rx="17"
                            fill="#f8fafc"
                            stroke="#e2e8f0"
                          />

                          <text
                            x="410"
                            y="397"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="800"
                            fill="#475569"
                          >
                            Wait for the retest to hold before considering the entry
                          </text>

                        </svg>

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  THREE CONDITIONS
              ================================================= */}
              <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                {[
                  {
                    no: "01",
                    label: "Context",
                    title: "Clear Trend",
                    text: "The pullback should occur inside a market structure that makes sense.",
                  },
                  {
                    no: "02",
                    label: "Location",
                    title: "Meaningful Area",
                    text: "Price should return toward support, resistance or another relevant level.",
                  },
                  {
                    no: "03",
                    label: "Confirmation",
                    title: "Real Reaction",
                    text: "Do not rely on the fact that price merely touched the area.",
                  },
                ].map((item) => (
                  <div
                    key={item.no}
                    className="flex items-center gap-3 rounded-[15px] border border-slate-200 bg-slate-50/60 p-3"
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[9px] font-black text-white">
                      {item.no}
                    </div>


                    <div className="min-w-0">

                      <div className="text-[8px] font-black uppercase tracking-wide text-brand-600">
                        {item.label}
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-slate-950">
                        {item.title}
                      </div>

                      <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                        {item.text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>


              <div className="mt-4">

                <ImportantBox title="A pullback is not automatically a reversal">
                  A temporary decline inside an uptrend may simply be a
                  correction. But if price begins breaking important lows and
                  producing lower highs and lower lows, the market structure
                  itself may be changing. At that point, the continuation
                  scenario should be reassessed.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              09 — COMPLETE PRICE ACTION TRADE EXAMPLE
          ================================================= */}

          <section
            id="complete-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — Trade Example
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Complete Price Action Trade Example Step by Step
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The following educational example combines the main elements
                covered so far: market structure, resistance, a breakout,
                retest, confirmation, entry planning, stop-loss placement and
                a logical target.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* =================================================
                  STEPS — DESKTOP
              ================================================= */}
              <div className="hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  {
                    no: "01",
                    title: "Read Structure",
                    text: "The market is trending higher.",
                  },
                  {
                    no: "02",
                    title: "Mark Resistance",
                    text: "Identify a level that stopped price before.",
                  },
                  {
                    no: "03",
                    title: "Wait for Breakout",
                    text: "Price closes clearly beyond the zone.",
                  },
                  {
                    no: "04",
                    title: "Watch the Retest",
                    text: "Price returns toward the broken level.",
                  },
                  {
                    no: "05",
                    title: "Wait for Confirmation",
                    text: "Buyers begin defending the retest.",
                  },
                  {
                    no: "06",
                    title: "Plan the Trade",
                    text: "Define entry, stop and target.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[11px] font-black leading-5 text-slate-950 lg:text-[12px]">
                        {item.title}
                      </h3>

                    </div>


                    <p className="mt-1.5 text-[9px] leading-5 text-slate-500 lg:text-[10px]">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* =================================================
                  STEPS — MOBILE
              ================================================= */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "Read Structure", "Bullish market structure."],
                  ["02", "Mark Resistance", "Identify the key area."],
                  ["03", "Wait for Breakout", "Price closes above it."],
                  ["04", "Watch the Retest", "Price returns to the level."],
                  ["05", "Wait for Confirmation", "Buyers defend the area."],
                  ["06", "Plan the Trade", "Entry, stop and target."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 5 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </div>


                    <div className="min-w-0">

                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>


              {/* =================================================
                  COMPLETE VISUAL + TRADE LOGIC
              ================================================= */}
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">

                {/* =================================================
                    FULL VISUAL CHART
                ================================================= */}
                <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

                  {/* HEADER */}
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">

                    <div>

                      <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
                        Full Price Action Setup
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Trend → Resistance → Breakout → Retest → Entry → Target
                      </p>

                    </div>


                    <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[8px] font-black text-white">
                      Educational Example
                    </span>

                  </div>


                  {/* =================================================
                      DESKTOP
                  ================================================= */}
                  <div className="hidden md:block">

                    <svg
                      viewBox="0 0 900 500"
                      className="block w-full"
                      role="img"
                      aria-label="Complete price action trade example showing breakout, retest, entry, stop and target"
                    >
                      <rect
                        width="900"
                        height="500"
                        fill="#ffffff"
                      />


                      {[85, 165, 245, 325, 405].map((y) => (
                        <line
                          key={`example-desktop-${y}`}
                          x1="55"
                          y1={y}
                          x2="845"
                          y2={y}
                          stroke="#eef2f7"
                        />
                      ))}


                      {/* RESISTANCE */}
                      <rect
                        x="70"
                        y="235"
                        width="520"
                        height="42"
                        rx="10"
                        fill="#fff1f2"
                        stroke="#fecdd3"
                      />

                      <rect
                        x="90"
                        y="243"
                        width="130"
                        height="26"
                        rx="13"
                        fill="#ffffff"
                        stroke="#fecdd3"
                      />

                      <text
                        x="155"
                        y="256"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#be123c"
                      >
                        Previous Resistance
                      </text>


                      {/* PRICE */}
                      <polyline
                        points="
                          70,390
                          135,345
                          195,360
                          265,300
                          325,325
                          390,260
                          450,285
                          515,215
                          575,155
                          630,195
                          680,258
                          730,205
                          790,135
                          840,92
                        "
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />


                      {/* BREAKOUT */}
                      <circle
                        cx="515"
                        cy="215"
                        r="9"
                        fill="#eff6ff"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />

                      <text
                        x="515"
                        y="188"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#1d4ed8"
                      >
                        Breakout
                      </text>


                      {/* RETEST */}
                      <circle
                        cx="680"
                        cy="258"
                        r="10"
                        fill="#fff7ed"
                        stroke="#f59e0b"
                        strokeWidth="4"
                      />

                      <text
                        x="680"
                        y="290"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="900"
                        fill="#b45309"
                      >
                        Retest
                      </text>


                      {/* CONFIRMATION */}
                      <circle
                        cx="730"
                        cy="205"
                        r="9"
                        fill="#dbeafe"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />

                      <text
                        x="730"
                        y="181"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#1d4ed8"
                      >
                        Confirmation
                      </text>


                      {/* ENTRY */}
                      <line
                        x1="758"
                        y1="300"
                        x2="758"
                        y2="205"
                        stroke="#16a34a"
                        strokeWidth="4"
                      />

                      <polygon
                        points="758,192 750,210 766,210"
                        fill="#16a34a"
                      />

                      <text
                        x="780"
                        y="245"
                        fontSize="12"
                        fontWeight="900"
                        fill="#15803d"
                      >
                        Entry
                      </text>


                      {/* STOP */}
                      <line
                        x1="650"
                        y1="330"
                        x2="800"
                        y2="330"
                        stroke="#ef4444"
                        strokeWidth="2.5"
                      />

                      <text
                        x="725"
                        y="352"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#dc2626"
                      >
                        Stop Loss
                      </text>


                      {/* TARGET */}
                      <line
                        x1="755"
                        y1="105"
                        x2="840"
                        y2="105"
                        stroke="#16a34a"
                        strokeWidth="2.5"
                        strokeDasharray="8 6"
                      />

                      <text
                        x="795"
                        y="83"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#15803d"
                      >
                        Target
                      </text>


                      {/* SUMMARY */}
                      <rect
                        x="145"
                        y="425"
                        width="610"
                        height="38"
                        rx="19"
                        fill="#f8fafc"
                        stroke="#e2e8f0"
                      />

                      <text
                        x="450"
                        y="449"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="800"
                        fill="#475569"
                      >
                        Context + Level + Confirmation + Risk Management before entry
                      </text>

                    </svg>

                  </div>


                  {/* =================================================
                      MOBILE PREVIEW — CLICK TO EXPAND
                  ================================================= */}
                  <div className="md:hidden">

                    <a
                      href="#complete-example-chart-fullscreen"
                      className="group block cursor-zoom-in"
                      aria-label="Open complete price action example full screen"
                    >

                      <svg
                        viewBox="0 0 360 330"
                        className="block w-full"
                        role="img"
                        aria-label="Simplified price action trade example"
                      >
                        <rect
                          width="360"
                          height="330"
                          fill="#ffffff"
                        />


                        {[55, 110, 165, 220, 275].map((y) => (
                          <line
                            key={`trade-mobile-${y}`}
                            x1="20"
                            y1={y}
                            x2="340"
                            y2={y}
                            stroke="#eef2f7"
                          />
                        ))}


                        <rect
                          x="28"
                          y="190"
                          width="230"
                          height="30"
                          rx="8"
                          fill="#fff1f2"
                          stroke="#fecdd3"
                        />


                        <polyline
                          points="
                            20,260
                            60,225
                            100,245
                            140,200
                            180,215
                            220,165
                            255,125
                            285,200
                            310,165
                            340,90
                          "
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />


                        <circle
                          cx="220"
                          cy="165"
                          r="6"
                          fill="#eff6ff"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                        />

                        <text
                          x="220"
                          y="148"
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="900"
                          fill="#1d4ed8"
                        >
                          Breakout
                        </text>


                        <circle
                          cx="285"
                          cy="200"
                          r="7"
                          fill="#fff7ed"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                        />

                        <text
                          x="285"
                          y="223"
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="900"
                          fill="#b45309"
                        >
                          Retest
                        </text>


                        <circle
                          cx="310"
                          cy="165"
                          r="6"
                          fill="#dcfce7"
                          stroke="#16a34a"
                          strokeWidth="2.5"
                        />


                        <line
                          x1="278"
                          y1="240"
                          x2="335"
                          y2="240"
                          stroke="#ef4444"
                          strokeWidth="2"
                        />

                        <text
                          x="306"
                          y="256"
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="900"
                          fill="#dc2626"
                        >
                          Stop
                        </text>


                        <rect
                          x="45"
                          y="285"
                          width="270"
                          height="28"
                          rx="14"
                          fill="#0f172a"
                        />

                        <text
                          x="180"
                          y="303"
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="900"
                          fill="#ffffff"
                        >
                          Trend → Breakout → Retest → Entry
                        </text>

                      </svg>


                      <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

                        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">

                          <span>
                            Enlarge chart
                          </span>

                          <span className="text-[14px]">
                            ↗
                          </span>

                        </div>

                      </div>

                    </a>

                  </div>


                  {/* =================================================
                      FULLSCREEN
                  ================================================= */}
                  <div
                    id="complete-example-chart-fullscreen"
                    className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
                  >

                    <a
                      href="#complete-example"
                      className="absolute inset-0"
                      aria-label="Close chart"
                    />


                    <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

                      {/* HEADER */}
                      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                        <div>

                          <div className="text-[14px] font-black text-slate-950">
                            Complete Price Action Trade Example
                          </div>

                          <div className="mt-0.5 text-[10px] text-slate-500">
                            Breakout → Retest → Confirmation → Entry → Target
                          </div>

                        </div>


                        <a
                          href="#complete-example"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
                          aria-label="Close"
                        >
                          ×
                        </a>

                      </div>


                      <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">

                        <span className="text-[16px]">
                          ↔
                        </span>

                        <span>
                          Swipe left or right to explore the full chart
                        </span>

                      </div>


                      <div
                        dir="ltr"
                        className="overflow-x-auto overflow-y-auto bg-white"
                      >

                        <svg
                          viewBox="0 0 900 500"
                          className="block min-w-[980px] w-full"
                          role="img"
                          aria-label="Expanded complete price action trade example"
                        >
                          <rect
                            width="900"
                            height="500"
                            fill="#ffffff"
                          />


                          {[85, 165, 245, 325, 405].map((y) => (
                            <line
                              key={`trade-full-${y}`}
                              x1="55"
                              y1={y}
                              x2="845"
                              y2={y}
                              stroke="#eef2f7"
                            />
                          ))}


                          <rect
                            x="70"
                            y="235"
                            width="520"
                            height="42"
                            rx="10"
                            fill="#fff1f2"
                            stroke="#fecdd3"
                          />

                          <rect
                            x="90"
                            y="243"
                            width="130"
                            height="26"
                            rx="13"
                            fill="#ffffff"
                            stroke="#fecdd3"
                          />

                          <text
                            x="155"
                            y="256"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="11"
                            fontWeight="900"
                            fill="#be123c"
                          >
                            Previous Resistance
                          </text>


                          <polyline
                            points="
                              70,390
                              135,345
                              195,360
                              265,300
                              325,325
                              390,260
                              450,285
                              515,215
                              575,155
                              630,195
                              680,258
                              730,205
                              790,135
                              840,92
                            "
                            fill="none"
                            stroke="#0f172a"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />


                          <circle
                            cx="515"
                            cy="215"
                            r="9"
                            fill="#eff6ff"
                            stroke="#2563eb"
                            strokeWidth="3"
                          />

                          <text
                            x="515"
                            y="188"
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="900"
                            fill="#1d4ed8"
                          >
                            Breakout
                          </text>


                          <circle
                            cx="680"
                            cy="258"
                            r="10"
                            fill="#fff7ed"
                            stroke="#f59e0b"
                            strokeWidth="4"
                          />

                          <text
                            x="680"
                            y="290"
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="900"
                            fill="#b45309"
                          >
                            Retest
                          </text>


                          <circle
                            cx="730"
                            cy="205"
                            r="9"
                            fill="#dbeafe"
                            stroke="#2563eb"
                            strokeWidth="3"
                          />

                          <text
                            x="730"
                            y="181"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="900"
                            fill="#1d4ed8"
                          >
                            Confirmation
                          </text>


                          <line
                            x1="758"
                            y1="300"
                            x2="758"
                            y2="205"
                            stroke="#16a34a"
                            strokeWidth="4"
                          />

                          <polygon
                            points="758,192 750,210 766,210"
                            fill="#16a34a"
                          />

                          <text
                            x="780"
                            y="245"
                            fontSize="12"
                            fontWeight="900"
                            fill="#15803d"
                          >
                            Entry
                          </text>


                          <line
                            x1="650"
                            y1="330"
                            x2="800"
                            y2="330"
                            stroke="#ef4444"
                            strokeWidth="2.5"
                          />

                          <text
                            x="725"
                            y="352"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="900"
                            fill="#dc2626"
                          >
                            Stop Loss
                          </text>


                          <line
                            x1="755"
                            y1="105"
                            x2="840"
                            y2="105"
                            stroke="#16a34a"
                            strokeWidth="2.5"
                            strokeDasharray="8 6"
                          />

                          <text
                            x="795"
                            y="83"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="900"
                            fill="#15803d"
                          >
                            Target
                          </text>


                          <rect
                            x="145"
                            y="425"
                            width="610"
                            height="38"
                            rx="19"
                            fill="#f8fafc"
                            stroke="#e2e8f0"
                          />

                          <text
                            x="450"
                            y="449"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="800"
                            fill="#475569"
                          >
                            Context + Level + Confirmation + Risk Management before entry
                          </text>

                        </svg>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    TRADE LOGIC
                ================================================= */}
                <aside className="rounded-[20px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Setup Logic
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Why is this setup worth evaluating?
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    The trade idea is not based on a single candle or breakout.
                    Several pieces of price action are supporting the same
                    scenario.
                  </p>


                  <div className="mt-4 space-y-2">

                    {[
                      ["Market Context", "Bullish trend"],
                      ["Key Area", "Previous resistance"],
                      ["Trigger", "Clear breakout"],
                      ["Pullback", "Retest of the level"],
                      ["Confirmation", "Bullish reaction"],
                      ["Invalidation", "Break back below the zone"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[11px] border border-brand-100/70 bg-white px-3 py-2.5"
                      >

                        <span className="text-[10px] text-slate-500">
                          {label}
                        </span>

                        <span className="text-right text-[11px] font-black text-slate-800">
                          {value}
                        </span>

                      </div>
                    ))}

                  </div>


                  <div className="mt-4 rounded-[14px] border border-emerald-100 bg-emerald-50/60 p-3">

                    <div className="text-[10px] font-black text-emerald-700">
                      Key principle
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      Every element adds information. A clearly defined setup
                      also makes it easier to identify when the original trade
                      idea is no longer valid.
                    </p>

                  </div>

                </aside>

              </div>


              {/* =================================================
                  ENTRY / STOP / TARGET
              ================================================= */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">

                <div className="rounded-[14px] border border-brand-100 bg-brand-50/40 px-3 py-3 text-center">

                  <div className="text-[8px] font-black uppercase tracking-wide text-brand-600 md:text-[9px]">
                    Entry
                  </div>

                  <div className="mt-1 text-[11px] font-black text-slate-950 md:text-[13px]">
                    After Confirmation
                  </div>

                </div>


                <div className="rounded-[14px] border border-rose-100 bg-rose-50/40 px-3 py-3 text-center">

                  <div className="text-[8px] font-black uppercase tracking-wide text-rose-600 md:text-[9px]">
                    Stop Loss
                  </div>

                  <div className="mt-1 text-[11px] font-black text-slate-950 md:text-[13px]">
                    Beyond Invalidation
                  </div>

                </div>


                <div className="rounded-[14px] border border-emerald-100 bg-emerald-50/40 px-3 py-3 text-center">

                  <div className="text-[8px] font-black uppercase tracking-wide text-emerald-700 md:text-[9px]">
                    Target
                  </div>

                  <div className="mt-1 text-[11px] font-black text-slate-950 md:text-[13px]">
                    Logical Price Level
                  </div>

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="Do not enter simply because price broke resistance">
                  The example combines market structure, location, breakout,
                  retest, confirmation and risk planning. If the context is
                  weak or the retest fails, the trade idea should be
                  reassessed instead of executed automatically.
                </ImportantBox>

              </div>

            </div>

          </section>
                    {/* =================================================
              10 — BEST TIMEFRAMES
          ================================================= */}

          <section
            id="timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                10 — Timeframes
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Is the Best Timeframe for Price Action Trading?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                There is no single best timeframe for every price action
                trader. The right choice depends on your trading style,
                holding period and availability. Higher timeframes often make
                market structure and major price levels easier to identify,
                while lower timeframes can be used to refine an entry.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* TIMEFRAME CARDS */}
              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    label: "Scalping",
                    timeframe: "1m – 5m",
                    text: "Fast price movement, more market noise and a greater need for precise execution.",
                  },
                  {
                    label: "Day Trading",
                    timeframe: "15m – 1H",
                    text: "A useful balance between intraday detail and readable market structure.",
                  },
                  {
                    label: "Swing Trading",
                    timeframe: "4H",
                    text: "Useful for identifying broader trends, pullbacks and important price levels.",
                  },
                  {
                    label: "Higher-Timeframe Analysis",
                    timeframe: "Daily",
                    text: "Useful for understanding the broader trend, structure and major market context.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/60 p-4"
                  >

                    <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[17px] font-black text-slate-950">
                      {item.timeframe}
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              {/* MULTI TIMEFRAME */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                  Multi-Timeframe Analysis
                </div>

                <h3 className="mt-1 text-[16px] font-black text-slate-950 md:text-[18px]">
                  A simple way to combine multiple timeframes
                </h3>

                <p className="mt-1.5 max-w-5xl text-[12px] leading-6 text-slate-600">
                  Instead of asking one chart to provide every answer, each
                  timeframe can serve a different purpose in the analysis.
                </p>


                <div className="mt-3 grid gap-2 md:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "4H or Daily",
                      text: "Identify the broader trend and major support and resistance areas.",
                    },
                    {
                      no: "02",
                      title: "1H or 15m",
                      text: "Narrow the analysis to the area where a trading opportunity may develop.",
                    },
                    {
                      no: "03",
                      title: "Lower Timeframe",
                      text: "Observe price behavior and use confirmation to refine the entry.",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="flex items-center gap-3 rounded-[12px] bg-slate-50 px-3 py-2.5"
                    >

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <div>

                        <div className="text-[12px] font-black text-slate-950">
                          {item.title}
                        </div>

                        <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                          {item.text}
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="Do not let a lower timeframe override the bigger picture">
                  A lower timeframe may contain dozens of short-term swings
                  that appear important in isolation. That does not mean the
                  higher-timeframe trend and structure should be ignored.
                  Give each timeframe a specific role in your trading plan.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              11 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black text-orange-700">
                11 — Risk Management
              </span>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Risk Management in Price Action Trading
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A strong price action setup can still fail. Market structure,
                support and resistance, candlestick confirmation and a clean
                retest can improve the quality of an analysis, but none of
                them removes risk. Your stop-loss, position size and maximum
                acceptable loss should therefore be defined before entering
                the trade.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* QUICK RULES */}
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">

                {[
                  {
                    label: "Risk",
                    value: "Defined in Advance",
                    text: "Know how much you can lose before entering.",
                  },
                  {
                    label: "Stop Loss",
                    value: "Beyond Invalidation",
                    text: "Place it where the trade idea becomes invalid.",
                  },
                  {
                    label: "Position Size",
                    value: "Based on the Stop",
                    text: "Adjust size according to stop-loss distance.",
                  },
                  {
                    label: "Reward",
                    value: "Planned",
                    text: "Identify a logical target before execution.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4"
                  >

                    <div className="text-[9px] font-black uppercase tracking-wide text-slate-500 md:text-[10px]">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[14px] font-black leading-6 text-slate-950 md:text-[16px]">
                      {item.value}
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500 md:text-[11px]">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* EXAMPLE */}
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <span className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Educational Example
                  </span>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
                    Your stop-loss should reflect the trade idea
                  </h3>

                  <p className="mt-2.5 text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
                    Suppose a long setup depends on former resistance becoming
                    new support after a breakout. If price decisively breaks
                    back below that area, the original bullish scenario may no
                    longer be valid. That invalidation point can help determine
                    a logical location for the stop-loss.
                  </p>


                  <div className="mt-3 rounded-[14px] border border-brand-100 bg-white px-3 py-3">

                    <div className="grid grid-cols-3 gap-2 text-center">

                      <div>

                        <div className="text-[9px] font-black text-slate-500">
                          ENTRY
                        </div>

                        <div className="mt-1 text-[12px] font-black text-slate-950">
                          After Confirmation
                        </div>

                      </div>


                      <div>

                        <div className="text-[9px] font-black text-rose-600">
                          STOP
                        </div>

                        <div className="mt-1 text-[12px] font-black text-slate-950">
                          Below the Zone
                        </div>

                      </div>


                      <div>

                        <div className="text-[9px] font-black text-green-600">
                          TARGET
                        </div>

                        <div className="mt-1 text-[12px] font-black text-slate-950">
                          Logical Level
                        </div>

                      </div>

                    </div>

                  </div>

                </div>


                {/* CALCULATOR */}
                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[16px] font-black text-brand-600">
                      ∑
                    </div>

                    <div>

                      <h3 className="text-[17px] font-black text-slate-950 md:text-[19px]">
                        Calculate your risk before entering
                      </h3>

                      <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                        Once you know the entry and stop-loss distance, use a
                        risk calculator to estimate a position size consistent
                        with the amount of capital you are prepared to risk.
                      </p>

                    </div>

                  </div>


                  <Link
                    href="/en/tools/risk-calculator"
                    className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700"
                  >
                    Open Risk Calculator
                    <span className="ml-2">→</span>
                  </Link>

                </div>

              </div>


              {/* WARNING */}
              <div className="mt-4 rounded-[18px] border border-rose-100 bg-rose-50/40 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-rose-600 text-[13px] font-black text-white">
                    !
                  </div>

                  <div>

                    <h3 className="text-[15px] font-black text-slate-950">
                      Do not widen your stop just because the trade is losing
                    </h3>

                    <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                      If price reaches the level that invalidates your original
                      setup, moving the stop farther away simply to avoid
                      taking the loss changes the initial plan and increases
                      risk after the trade has already been opened.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              12 — PROS / CONS / MISTAKES
          ================================================= */}

          <section
            id="pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                12 — Pros & Cons
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Advantages and Disadvantages of Price Action Trading
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Price action offers a direct way to analyze how a market is
                behaving without depending on a large collection of
                indicators. However, reading context, market structure and
                price levels takes practice, and some elements of the analysis
                can be subjective.
              </p>

            </div>


            <div className="grid md:grid-cols-2">

              {/* PROS */}
              <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-50 text-[14px] font-black text-green-700">
                    ✓
                  </div>

                  <div>

                    <div className="text-[9px] font-black uppercase tracking-wide text-green-700">
                      Strengths
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      Advantages of Price Action
                    </h3>

                  </div>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-green-100">

                  {[
                    "Focuses directly on price movement and market structure.",
                    "Can be used without relying on a large number of technical indicators.",
                    "Can be adapted to different markets and timeframes.",
                    "Encourages traders to evaluate context and location before looking for an entry.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3 ? "border-b border-green-100/70" : ""
                      }`}
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-[11px] font-black text-green-700">
                        ✓
                      </div>

                      <p className="text-[12px] leading-6 text-slate-700 md:text-[13px] md:leading-7">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              {/* CONS */}
              <div className="p-4 md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-rose-50 text-[14px] font-black text-rose-700">
                    ×
                  </div>

                  <div>

                    <div className="text-[9px] font-black uppercase tracking-wide text-rose-700">
                      Limitations
                    </div>

                    <h3 className="text-[17px] font-black text-slate-950">
                      Disadvantages and Challenges
                    </h3>

                  </div>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-rose-100">

                  {[
                    "Different traders may interpret the same level or price pattern differently.",
                    "Reading market context consistently requires practice and experience.",
                    "Drawing too many levels and patterns can lead to overanalysis.",
                    "No price action signal can guarantee that a trade will be profitable.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3 ? "border-b border-rose-100/70" : ""
                      }`}
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[11px] font-black text-rose-700">
                        ×
                      </div>

                      <p className="text-[12px] leading-6 text-slate-700 md:text-[13px] md:leading-7">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>


            {/* COMMON MISTAKES */}
            <div className="border-t border-slate-200 bg-slate-50/50 p-4 md:p-6">

              <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                Avoid These Errors
              </div>

              <h3 className="mt-1 text-[16px] font-black text-slate-950 md:text-[18px]">
                6 Common Price Action Trading Mistakes
              </h3>


              <div className="mt-3 grid gap-2 md:grid-cols-3 lg:grid-cols-6">

                {[
                  ["01", "Ignoring the Trend"],
                  ["02", "Drawing Too Many Levels"],
                  ["03", "Trading Every Pin Bar"],
                  ["04", "Chasing Breakouts"],
                  ["05", "Entering Without Confirmation"],
                  ["06", "Ignoring Risk"],
                ].map(([no, title]) => (
                  <div
                    key={no}
                    className="flex items-center gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2.5 md:block"
                  >

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-slate-900 text-[9px] font-black text-white">
                      {no}
                    </div>

                    <div className="text-[11px] font-black text-slate-700 md:mt-2">
                      {title}
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              BEGINNER ROADMAP
          ================================================= */}

          <section
            id="beginner-roadmap"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                Learning Roadmap
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Learn Price Action Trading as a Beginner
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Beginners do not need to memorize dozens of candlestick
                patterns. A more structured approach is to learn{" "}
                <strong className="font-black text-slate-900">
                  market structure first
                </strong>
                , then support and resistance, followed by price reactions at
                those areas, candlestick confirmation and finally trade and
                risk management.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "Market Structure",
                    text: "Learn to identify swing highs, swing lows and trend direction.",
                  },
                  {
                    no: "02",
                    title: "Key Levels",
                    text: "Learn how to mark meaningful support and resistance zones.",
                  },
                  {
                    no: "03",
                    title: "Price Reaction",
                    text: "Study breakouts, rejection, pullbacks and retests.",
                  },
                  {
                    no: "04",
                    title: "Candlestick Patterns",
                    text: "Use candles as confirmation within the broader context.",
                  },
                  {
                    no: "05",
                    title: "Risk Management",
                    text: "Define the stop, position size and target before execution.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[14px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-6 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "Market Structure", "Trend, highs and lows."],
                  ["02", "Support & Resistance", "Identify important price areas."],
                  ["03", "Price Reaction", "Breakouts, rejection and retests."],
                  ["04", "Candlestick Patterns", "Use candles for confirmation."],
                  ["05", "Risk Management", "Stop, size and target."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 4 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </div>

                    <div>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>


              {/* PRACTICE */}
              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:flex md:items-center md:justify-between md:gap-6">

                <div>

                  <h3 className="text-[15px] font-black text-slate-950">
                    Practice before risking real money
                  </h3>

                  <p className="mt-1.5 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    Use historical charts and a demo account to practice
                    identifying trends, key levels, breakouts and retests.
                    Focus on following the same process repeatedly rather than
                    trying to predict every market move.
                  </p>

                </div>


                <Link
                  href="/en/best-brokers"
                  className="mt-3 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700 md:mt-0 md:shrink-0"
                >
                  Compare Forex Brokers
                  <span className="ml-2">→</span>
                </Link>

              </div>

            </div>

          </section>


          {/* =================================================
              FAQ
          ================================================= */}

          <section
            id="faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                Frequently Asked Questions
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Price Action Trading FAQs
              </h2>

              <p className="mt-3 max-w-5xl text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                Answers to common questions about price action trading,
                indicators, candlestick patterns, timeframes and risk
                management.
              </p>

            </div>


            <div className="divide-y divide-slate-200">

              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group bg-white"
                >

                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 md:px-6 md:py-4">

                    <h3 className="text-[13px] font-black leading-6 text-slate-950 md:text-[14px]">
                      {item.q}
                    </h3>

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[15px] font-black text-brand-600 transition-transform group-open:rotate-45">
                      +
                    </div>

                  </summary>


                  <div className="px-4 pb-4 md:px-6 md:pb-5">

                    <p className="max-w-5xl text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      {item.a}
                    </p>

                  </div>

                </details>
              ))}

            </div>

          </section>


          {/* =================================================
              RELATED GUIDES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 md:px-6 md:py-5">

              <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                Continue Learning
              </div>

              <h2 className="mt-1 text-[20px] font-black leading-7 text-slate-950 md:text-[26px]">
                Guides That Can Improve Your Price Action Trading Knowledge
              </h2>

              <p className="mt-1.5 text-[12px] leading-6 text-slate-500 md:text-[13px]">
                Explore related concepts covering liquidity, stop-loss
                placement, profit targets and position sizing.
              </p>

            </div>


            {/* DESKTOP */}
            <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">

              {[
                {
                  label: "Market Concept",
                  title: "Liquidity in Trading",
                  text: "Understand where market orders and liquidity may cluster around important highs and lows.",
                  href: "/en/learn-trading/liquidity",
                },
                {
                  label: "Risk Management",
                  title: "Stop Loss",
                  text: "Learn how stop-loss orders can define risk and protect a trading plan.",
                  href: "/en/learn-trading/stop-loss",
                },
                {
                  label: "Trade Management",
                  title: "Take Profit",
                  text: "Learn how traders can identify logical areas for potential profit targets.",
                  href: "/en/learn-trading/take-profit",
                },
                {
                  label: "Position Sizing",
                  title: "Lot Size",
                  text: "Understand the relationship between position size, stop distance and account risk.",
                  href: "/en/learn-trading/lot",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[17px] border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    {item.label}
                  </div>

                  <h3 className="mt-1.5 text-[15px] font-black text-slate-950 group-hover:text-brand-600">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    {item.text}
                  </p>

                  <div className="mt-3 text-[11px] font-black text-brand-600">
                    Read Guide →
                  </div>

                </Link>
              ))}

            </div>


            {/* MOBILE */}
            <div className="divide-y divide-slate-100 md:hidden">

              {[
                ["Market Concept", "Liquidity in Trading", "/en/learn-trading/liquidity"],
                ["Risk Management", "Stop Loss", "/en/learn-trading/stop-loss"],
                ["Trade Management", "Take Profit", "/en/learn-trading/take-profit"],
                ["Position Sizing", "Lot Size", "/en/learn-trading/lot"],
              ].map(([label, title, href]) => (
                <Link
                  key={title}
                  href={href}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >

                  <div>

                    <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                      {label}
                    </div>

                    <div className="mt-0.5 text-[13px] font-black text-slate-950">
                      {title}
                    </div>

                  </div>

                  <span className="text-[16px] font-black text-brand-600">
                    →
                  </span>

                </Link>
              ))}

            </div>

          </section>


          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-brand-100 bg-[linear-gradient(135deg,#f3f7fd_0%,#ffffff_60%,#f7faff_100%)] shadow-sm">

            <div className="px-4 py-4 md:flex md:items-center md:justify-between md:gap-8 md:px-7 md:py-5">

              <div className="min-w-0 flex-1">

                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-wide text-brand-600 md:text-[10px]">
                  Next Step
                </span>

                <h2 className="mt-2.5 text-[20px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[27px]">
                  Learn to Read Price First, Then Test Your Strategy
                </h2>

                <p className="mt-2 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                  Practice identifying market structure, support and
                  resistance, breakouts, pullbacks and retests on historical
                  charts or a demo account. Use proper risk-management tools
                  before considering trading with real capital.
                </p>

              </div>


              <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-0 md:flex md:shrink-0">

                <Link
                  href="/en/tools"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 text-center text-[11px] font-black text-brand-600 transition hover:bg-brand-50 md:min-w-[145px]"
                >
                  Trading Tools
                </Link>

                <Link
                  href="/en/best-brokers"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-3 text-center text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700 md:min-w-[175px]"
                >
                  Compare Brokers
                  <span className="ml-2">→</span>
                </Link>

              </div>

            </div>


            {/* DISCLAIMER */}
            <div className="border-t border-brand-100/70 bg-white/50 px-4 py-2.5 md:px-7">

              <p className="text-center text-[10px] leading-5 text-slate-500 md:text-left md:text-[11px]">
                This content is provided for educational purposes only and
                does not constitute investment or trading advice. Leveraged
                trading involves significant risk and can result in the loss
                of capital.
              </p>

            </div>

          </section>

        </article>

      </div>


      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      {/* ARTICLE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />


      {/* BREADCRUMB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />


      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

    </main>
  );
}