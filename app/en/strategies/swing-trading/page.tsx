import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   SWING TRADING STRATEGY — ENGLISH
   Broker Alarab
   Path: /en/strategies/swing-trading
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/swing-trading`;

const PAGE_TITLE =
  "Swing Trading Strategy: How to Swing Trade Step by Step";

const PAGE_DESCRIPTION =
  "Learn swing trading step by step with clear examples of swing highs and lows, pullbacks, entries, stop-loss placement, targets, timeframes and risk management.";


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
      ar: `${BASE_URL}/strategies/swing-trading`,
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
    description: PAGE_DESCRIPTION,
  },
};


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

        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-sm font-black text-white">
          !
        </div>

        <div>

          <h3 className="text-[16px] font-black text-slate-950 md:text-[17px]">
            {title}
          </h3>

          <div className="mt-2 text-[14px] leading-7 text-slate-700 md:text-[15px] md:leading-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   FAQ DATA
   ENGLISH SEARCH INTENT — NOT A DIRECT TRANSLATION
========================================================= */

const faqItems = [
  {
    q: "What is swing trading?",
    a: "Swing trading is a medium-term trading style that looks for meaningful price moves that can develop over several days or weeks. Traders typically use market structure, price levels, trends and technical analysis to plan entries, exits and risk.",
  },
  {
    q: "How does swing trading work?",
    a: "A swing trader first identifies the broader market condition, then looks for a setup such as a pullback, breakout and retest, support or resistance reaction, or reversal. The trade is planned with a defined entry, invalidation level, stop loss and target.",
  },
  {
    q: "How long does a swing trade usually last?",
    a: "There is no fixed holding period, but swing trades are commonly held for several days and can remain open for several weeks when the market move takes longer to develop.",
  },
  {
    q: "What is the best timeframe for swing trading?",
    a: "Many swing traders use the daily and 4-hour charts for market direction and structure, then use the 1-hour chart or another lower timeframe to refine an entry. There is no single best timeframe for every market or trader.",
  },
  {
    q: "Is swing trading good for beginners?",
    a: "Swing trading can be easier to study than very short-term trading because decisions usually develop more slowly. Beginners still need to understand market structure, support and resistance, stop-loss placement and risk management before risking real money.",
  },
  {
    q: "What is the difference between swing trading and day trading?",
    a: "Day traders normally close positions within the same trading day, while swing traders may hold positions overnight for several days or weeks in an attempt to capture a larger portion of a market move.",
  },
  {
    q: "What indicators are best for swing trading?",
    a: "Swing trading does not require indicators, but traders commonly use tools such as moving averages, RSI and Fibonacci retracements alongside price action, market structure and support and resistance.",
  },
  {
    q: "Where should a swing trader place a stop loss?",
    a: "The stop should normally be placed beyond a level that invalidates the trading idea rather than at an arbitrary distance. For a bullish pullback setup, for example, that may be below an important swing low or support area.",
  },
];


/* =========================================================
   HERO CHART — DESKTOP
========================================================= */

function SwingHeroDesktopChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">

        <div>

          <div className="text-[13px] font-black text-slate-950">
            How a Swing Trader Reads the Market
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            Trend → pullback → area of interest → entry → next swing
          </div>

        </div>


        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600">
          Swing Setup
        </span>

      </div>


      <svg
        viewBox="0 0 720 330"
        className="block w-full"
        role="img"
        aria-label="Bullish swing trading setup showing an uptrend, pullback, entry area and continuation"
      >

        <rect
          width="720"
          height="330"
          fill="#ffffff"
        />


        {/* GRID */}
        {[60, 120, 180, 240, 300].map((y) => (
          <line
            key={`hero-h-${y}`}
            x1="35"
            y1={y}
            x2="685"
            y2={y}
            stroke="#eef2f7"
          />
        ))}

        {[100, 200, 300, 400, 500, 600].map((x) => (
          <line
            key={`hero-v-${x}`}
            x1={x}
            y1="30"
            x2={x}
            y2="300"
            stroke="#f8fafc"
          />
        ))}


        {/* PRICE SWINGS */}
        <polyline
          points="
            45,270
            125,190
            185,225
            275,135
            345,185
            445,92
            515,150
            655,52
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* SWING HIGH */}
        <circle
          cx="275"
          cy="135"
          r="7"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="275"
          y="111"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Swing High
        </text>


        {/* PULLBACK */}
        <circle
          cx="345"
          cy="185"
          r="7"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        <text
          x="345"
          y="213"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          Pullback
        </text>


        {/* ENTRY ZONE */}
        <rect
          x="320"
          y="166"
          width="82"
          height="38"
          rx="10"
          fill="#dcfce7"
          fillOpacity="0.75"
          stroke="#22c55e"
          strokeWidth="1.5"
        />

        <text
          x="361"
          y="181"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#15803d"
        >
          AREA OF
        </text>

        <text
          x="361"
          y="194"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fill="#15803d"
        >
          INTEREST
        </text>


        {/* NEW HIGH */}
        <circle
          cx="445"
          cy="92"
          r="7"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="445"
          y="68"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Higher High
        </text>


        {/* TREND */}
        <line
          x1="90"
          y1="285"
          x2="620"
          y2="78"
          stroke="#16a34a"
          strokeWidth="2"
          strokeDasharray="8 6"
        />

        <text
          x="570"
          y="110"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          Uptrend
        </text>


        {/* SUMMARY */}
        <rect
          x="145"
          y="286"
          width="430"
          height="29"
          rx="14.5"
          fill="#0f172a"
        />

        <text
          x="360"
          y="304"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="900"
          fill="#ffffff"
        >
          Capture a structured part of the move — not the exact top and bottom
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   HERO CHART — MOBILE
   NO ZOOM
========================================================= */

function SwingHeroMobileChart() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

        <span className="text-[11px] font-black text-slate-800">
          Swing Trading Setup
        </span>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
          Swing
        </span>

      </div>


      <svg
        viewBox="0 0 360 255"
        className="block w-full"
        role="img"
        aria-label="Simple mobile swing trading example"
      >

        <rect
          width="360"
          height="255"
          fill="#ffffff"
        />


        {[55, 105, 155, 205].map((y) => (
          <line
            key={`mobile-${y}`}
            x1="20"
            y1={y}
            x2="340"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <polyline
          points="
            25,215
            80,160
            125,188
            185,120
            230,153
            330,62
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* HIGH */}
        <circle
          cx="185"
          cy="120"
          r="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        <text
          x="185"
          y="99"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Swing High
        </text>


        {/* PULLBACK */}
        <circle
          cx="230"
          cy="153"
          r="6"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        <text
          x="230"
          y="177"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#b45309"
        >
          Pullback
        </text>


        {/* CONTINUATION */}
        <text
          x="295"
          y="55"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          Continuation
        </text>


        {/* SUMMARY */}
        <rect
          x="48"
          y="218"
          width="264"
          height="25"
          rx="12.5"
          fill="#0f172a"
        />

        <text
          x="180"
          y="234"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          Trend → Pullback → Entry → Next Swing
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   SWING HIGH / LOW CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function SwingHighLowChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          Swing Highs and Swing Lows
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          The turning points that help traders read market structure
        </p>

      </div>


      <svg
        viewBox="0 0 760 340"
        className="block w-full"
        role="img"
        aria-label="Chart showing swing highs, swing lows, higher highs and higher lows"
      >

        <rect
          width="760"
          height="340"
          fill="#ffffff"
        />


        {/* GRID */}
        {[70, 140, 210, 280].map((y) => (
          <line
            key={`swing-grid-${y}`}
            x1="40"
            y1={y}
            x2="720"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* PRICE */}
        <polyline
          points="
            50,265
            135,165
            210,225
            305,115
            390,190
            490,82
            575,155
            700,55
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* SWING HIGH 1 */}
        <circle
          cx="135"
          cy="165"
          r="8"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="135"
          y="138"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Swing High
        </text>


        {/* SWING LOW 1 */}
        <circle
          cx="210"
          cy="225"
          r="8"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="210"
          y="254"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          Swing Low
        </text>


        {/* SWING HIGH 2 */}
        <circle
          cx="305"
          cy="115"
          r="8"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="305"
          y="88"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Swing High
        </text>


        {/* SWING LOW 2 */}
        <circle
          cx="390"
          cy="190"
          r="8"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="390"
          y="219"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          Swing Low
        </text>


        {/* HIGHER HIGH */}
        <circle
          cx="490"
          cy="82"
          r="8"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="490"
          y="55"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Higher High
        </text>


        {/* HIGHER LOW */}
        <circle
          cx="575"
          cy="155"
          r="8"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="575"
          y="184"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          Higher Low
        </text>


        {/* EXPLANATION */}
        <rect
          x="150"
          y="290"
          width="460"
          height="30"
          rx="15"
          fill="#f8fafc"
          stroke="#e2e8f0"
        />

        <text
          x="380"
          y="309"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#475569"
        >
          Swing points help define trend, structure, invalidation and targets
        </text>

      </svg>

    </div>
  );


  if (fullscreen) {
    return chart;
  }


  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        {chart}
      </div>


      {/* MOBILE PREVIEW */}
      <a
        href="#swing-high-low-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="Enlarge the swing high and swing low chart"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            Enlarge chart
            <span>↗</span>
          </span>

        </div>

      </a>


      {/* MOBILE FULLSCREEN */}
      <div
        id="swing-high-low-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#swing-high-low"
          className="absolute inset-0"
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                Swing Highs and Swing Lows
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                See how price builds a sequence of market swings
              </div>

            </div>


            <a
              href="#swing-high-low"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="Close"
            >
              ×
            </a>

          </div>


          {/* SWIPE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">

            <span className="text-[16px]">
              ↔
            </span>

            <span>
              Swipe left or right to explore the full chart
            </span>

          </div>


          {/* SCROLLABLE CHART */}
          <div className="overflow-x-auto overflow-y-auto bg-white">

            <div className="min-w-[820px] p-3">
              <SwingHighLowChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   PULLBACK CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function SwingPullbackChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          Example: Buying a Pullback in an Uptrend
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          The goal is not to buy every dip — wait for a logical area and confirmation
        </p>

      </div>


      <svg
        viewBox="0 0 760 350"
        className="block w-full"
        role="img"
        aria-label="Swing trading pullback example showing support, confirmation, entry, stop loss and target"
      >

        <rect
          width="760"
          height="350"
          fill="#ffffff"
        />


        {[70, 140, 210, 280].map((y) => (
          <line
            key={`pullback-${y}`}
            x1="40"
            y1={y}
            x2="720"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* SUPPORT ZONE */}
        <rect
          x="315"
          y="205"
          width="190"
          height="55"
          rx="12"
          fill="#ecfdf5"
          stroke="#86efac"
        />

        <text
          x="410"
          y="237"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          Support / Area of Interest
        </text>


        {/* PRICE */}
        <polyline
          points="
            55,285
            145,205
            220,238
            315,142
            405,225
            470,205
            565,120
            690,70
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* PRIOR HIGH */}
        <line
          x1="265"
          y1="142"
          x2="520"
          y2="142"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="7 5"
        />

        <text
          x="278"
          y="128"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          Prior High
        </text>


        {/* PULLBACK */}
        <circle
          cx="405"
          cy="225"
          r="8"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        <text
          x="405"
          y="278"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          Pullback
        </text>


        {/* CONFIRMATION */}
        <circle
          cx="470"
          cy="205"
          r="8"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="470"
          y="188"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Confirmation
        </text>


        {/* ENTRY */}
        <line
          x1="493"
          y1="202"
          x2="545"
          y2="202"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="550"
          y="206"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          Entry
        </text>


        {/* STOP */}
        <line
          x1="350"
          y1="268"
          x2="475"
          y2="268"
          stroke="#e11d48"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        <text
          x="485"
          y="272"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Stop
        </text>


        {/* TARGET */}
        <line
          x1="545"
          y1="105"
          x2="690"
          y2="105"
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        <text
          x="620"
          y="92"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Target / Swing High
        </text>

      </svg>

    </div>
  );


  if (fullscreen) {
    return chart;
  }


  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        {chart}
      </div>


      {/* MOBILE PREVIEW */}
      <a
        href="#swing-pullback-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="Enlarge the swing trading pullback example"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            Enlarge example
            <span>↗</span>
          </span>

        </div>

      </a>


      {/* MOBILE FULLSCREEN */}
      <div
        id="swing-pullback-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#pullback"
          className="absolute inset-0"
          aria-label="Close example"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                Swing Pullback Example
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Trend → pullback → confirmation → entry
              </div>

            </div>


            <a
              href="#pullback"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="Close"
            >
              ×
            </a>

          </div>


          {/* SWIPE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">

            <span className="text-[16px]">
              ↔
            </span>

            <span>
              Swipe left or right to explore the full chart
            </span>

          </div>


          {/* SCROLLABLE */}
          <div className="overflow-x-auto overflow-y-auto bg-white">

            <div className="min-w-[820px] p-3">
              <SwingPullbackChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function SwingTradingStrategyPage() {

  /* =======================================================
     STRUCTURED DATA
     ENGLISH / INTERNATIONAL SEARCH INTENT
  ======================================================= */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,

    inLanguage: "en",

    datePublished: "2026-08-26",
    dateModified: "2026-08-26",

    isAccessibleForFree: true,

    articleSection: "Trading Strategies",

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
        url: `${BASE_URL}/logo.png`,
      },
    },

    about: [
      {
        "@type": "Thing",
        name: "Swing Trading",
      },
      {
        "@type": "Thing",
        name: "Swing Trading Strategy",
      },
      {
        "@type": "Thing",
        name: "Forex Swing Trading",
      },
      {
        "@type": "Thing",
        name: "Swing Trading for Beginners",
      },
      {
        "@type": "Thing",
        name: "Swing High and Swing Low",
      },
      {
        "@type": "Thing",
        name: "Pullback Trading",
      },
      {
        "@type": "Thing",
        name: "Breakout and Retest Trading",
      },
      {
        "@type": "Thing",
        name: "Market Structure",
      },
      {
        "@type": "Thing",
        name: "Technical Analysis",
      },
    ],

    keywords: [
      "swing trading",
      "swing trading strategy",
      "swing trading strategies",
      "how to swing trade",
      "swing trading for beginners",
      "forex swing trading",
      "forex swing trading strategy",
      "best swing trading strategy",
      "swing trading setup",
      "swing trading setups",
      "swing high",
      "swing low",
      "swing high and swing low",
      "pullback trading",
      "pullback trading strategy",
      "breakout and retest",
      "market structure",
      "swing trading entry",
      "swing trading stop loss",
      "swing trading risk management",
      "best timeframe for swing trading",
      "swing trading indicators",
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
        name: "Swing Trading Strategy",
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
            Swing Trading
          </span>

        </nav>

      </div>


      {/* =====================================================
          HERO
          SAME STRATEGY SYSTEM AS ICT / SCALPING / PRICE ACTION
      ===================================================== */}

      <section className="mx-auto max-w-[1520px] px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">

        {/* ===================================================
            DESKTOP HERO
        =================================================== */}

        <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm md:block">

          <div
  dir="rtl"
  className="grid min-h-[410px] lg:grid-cols-[0.9fr_1.1fr]"
>

            {/* =================================================
                VISUAL — LEFT
            ================================================= */}

            <div className="flex items-center justify-center border-r border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:p-8">

              <div className="w-full max-w-[560px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">

                {/* WINDOW HEADER */}
                <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

                  <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                  </div>


                  <span className="text-[10px] font-black text-slate-700">
                    Swing Trading Model
                  </span>

                </div>


                {/* CHART */}
                <div className="p-4">
                  <SwingHeroDesktopChart />
                </div>

              </div>

            </div>


            {/* =================================================
                CONTENT — RIGHT
            ================================================= */}

            <div className="flex flex-col justify-center px-8 py-7 text-left lg:px-10 xl:px-12">

              {/* BADGES */}
              <div className="flex flex-wrap gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                  Trading Strategies
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
                  Swing Trading
                </span>

              </div>


              {/* TITLE */}
              <h1 className="mt-4 max-w-[900px] text-[34px] font-black leading-[1.22] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                Swing Trading Strategy: How to Swing Trade Step by Step
              </h1>


              {/* DESCRIPTION */}
              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                Learn how swing traders use{" "}
                <strong className="font-black text-slate-900">
                  market structure, swing highs and lows, pullbacks and key price levels
                </strong>{" "}
                to plan trades that may develop over several days or weeks,
                with clear entries, stop losses, targets and risk management.
              </p>


              {/* TOPICS */}
              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  Swing High & Low
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-black text-green-700">
                  Market Structure
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  Pullback Setups
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  Risk Management
                </span>

              </div>


              {/* META */}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                <span>
                  📅 August 26, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  Updated August 26, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  15–20 min read
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            MOBILE HERO
            NO ZOOM
        =================================================== */}

        <div className="md:hidden">

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

            {/* CONTENT */}
            <div className="px-4 pb-2.5 pt-3.5">

              {/* BADGES */}
              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
                  Trading Strategies
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600">
                  Swing Trading
                </span>

              </div>


              {/* TITLE */}
              <h1 className="mt-3 text-[26px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950">
                Swing Trading Strategy: How to Swing Trade Step by Step
              </h1>


              {/* DESCRIPTION */}
              <p className="mt-3 text-[14px] leading-[1.85] text-slate-600">
                Learn how to read{" "}
                <strong className="font-black text-slate-900">
                  swing highs, swing lows, market structure and pullbacks
                </strong>{" "}
                to build structured medium-term trading setups.
              </p>


              {/* META */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 Aug 26, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 15–20 min
                </span>

              </div>

            </div>


            {/* MOBILE CHART — NO ZOOM */}
            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <SwingHeroMobileChart />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ARTICLE
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] px-3 py-5 sm:px-4 md:px-6 md:py-8 lg:px-8">

        <article className="space-y-5 md:space-y-6">


          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

              {/* MAIN */}
              <div className="p-4 md:p-7">

                <SectionLabel>
                  Start Here
                </SectionLabel>


                <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                  What Is Swing Trading?
                </h2>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  Markets rarely move in a straight line. An uptrend usually
                  contains periods of selling and consolidation before price
                  attempts to move higher again. A downtrend can include
                  temporary rallies before the broader decline continues.
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  Swing trading attempts to capture a meaningful portion of
                  one of these price moves. The objective is{" "}
                  <strong className="font-black text-slate-900">
                    not to predict the exact bottom and exact top
                  </strong>
                  . Instead, the trader looks for a setup with a logical
                  entry, a clear invalidation point and a realistic target.
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  Because swing trades can remain open for several days or
                  weeks, the approach sits between short-term day trading and
                  longer-term position trading. It can be applied to forex,
                  stocks, indices, gold and other actively traded markets.
                </p>


                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "Read the Context",
                      text: "Is the market trending, ranging or changing direction?",
                    },
                    {
                      no: "02",
                      title: "Wait for a Setup",
                      text: "Let price reach a meaningful area instead of chasing it.",
                    },
                    {
                      no: "03",
                      title: "Plan the Trade",
                      text: "Define entry, invalidation, stop and target before execution.",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="rounded-[15px] border border-slate-200 bg-slate-50/60 p-3.5"
                    >

                      <div className="flex items-center gap-2">

                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                          {item.no}
                        </span>

                        <h3 className="text-[13px] font-black text-slate-950">
                          {item.title}
                        </h3>

                      </div>

                      <p className="mt-2 text-[11px] leading-5 text-slate-500">
                        {item.text}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              {/* SIMPLE CONCEPT */}
              <div className="border-t border-slate-200 bg-slate-50/60 p-4 md:p-6 lg:border-l lg:border-t-0">

                <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                  Core Idea
                </div>

                <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                  You do not need to trade every move
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600">
                  Good swing trading is selective. The goal is to find a move
                  that has context, structure and a defined risk point — not to
                  react to every short-term candle or indicator signal.
                </p>


                <div className="mt-4 space-y-2">

                  {[
                    [
                      "Clear Market Condition",
                      "Know whether price is trending or moving sideways.",
                    ],
                    [
                      "Relevant Swing Points",
                      "Identify highs and lows that actually influenced price.",
                    ],
                    [
                      "Logical Location",
                      "Wait for price to reach an area worth watching.",
                    ],
                    [
                      "Clear Invalidation",
                      "Know exactly when your trading idea is no longer valid.",
                    ],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="flex items-start gap-3 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >

                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />

                      <div>

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

            </div>

          </section>


          {/* =================================================
              01 — SWING HIGH / SWING LOW
          ================================================= */}

          <section
            id="swing-high-low"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — Market Structure
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Are Swing Highs and Swing Lows?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Swing highs and swing lows are turning points in price.
                A{" "}
                <strong className="font-black text-slate-900">
                  swing high
                </strong>{" "}
                forms when price pushes upward and then begins to move lower.
                A{" "}
                <strong className="font-black text-slate-900">
                  swing low
                </strong>{" "}
                forms when a decline pauses and price begins to move higher.
                The relationship between these points helps traders define
                market structure and trend direction.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* VISUAL */}
              <SwingHighLowChart />


              {/* EXPLANATION */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-blue-100 bg-blue-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-blue-700">
                    Swing High
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    A local high followed by a move lower
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    A swing high marks an area where buying momentum slowed
                    and price began to move lower. Comparing new highs with
                    previous highs can help reveal whether an uptrend is
                    strengthening, weakening or beginning to change.
                  </p>

                </article>


                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                    Swing Low
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    A local low followed by a move higher
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    A swing low forms when selling pressure pauses and buyers
                    push price higher. In an uptrend, a sequence of higher
                    swing lows can indicate that buyers are still controlling
                    the broader market structure.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="Not every tiny high or low is an important swing">
                  Lower timeframes contain many small turning points. Focus on
                  swings that produced a meaningful price move, broke
                  structure or clearly affected market direction instead of
                  marking every minor fluctuation.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              02 — HOW SWING TRADING WORKS
          ================================================= */}

          <section
            id="how-it-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — How It Works
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How Does a Swing Trading Strategy Work?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                One of the simplest ways to understand swing trading is a
                trend-pullback setup. Instead of buying after price has already
                extended sharply higher, the trader waits for a retracement
                toward a logical area and then looks for evidence that the
                broader trend may resume.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* STEPS */}
              <div className="grid gap-3 md:grid-cols-5">

                {[
                  {
                    no: "01",
                    title: "Find the Trend",
                    text: "Start with higher-timeframe market structure.",
                  },
                  {
                    no: "02",
                    title: "Mark the Swings",
                    text: "Identify meaningful highs and lows.",
                  },
                  {
                    no: "03",
                    title: "Wait for a Pullback",
                    text: "Avoid chasing an already extended move.",
                  },
                  {
                    no: "04",
                    title: "Look for Confirmation",
                    text: "Watch how price reacts at the area.",
                  },
                  {
                    no: "05",
                    title: "Define the Risk",
                    text: "Plan invalidation and target before entry.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2.5">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* PULLBACK VISUAL */}
              <div
                id="pullback"
                className="mt-4 scroll-mt-24"
              >
                <SwingPullbackChart />
              </div>


              {/* READ THE EXAMPLE */}
              <div className="mt-4 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">

                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Read the Setup
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Why not buy as soon as price starts falling?
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    A decline may be a temporary pullback inside an uptrend,
                    but it could also become a genuine reversal. Start with
                    context: is the bullish structure still intact? Has price
                    reached support or another meaningful area? Has buying
                    pressure started to return?
                  </p>


                  <div className="mt-3 grid gap-2 sm:grid-cols-3">

                    {[
                      [
                        "1",
                        "Context",
                        "The broader structure remains bullish.",
                      ],
                      [
                        "2",
                        "Location",
                        "Price returns to a meaningful support area.",
                      ],
                      [
                        "3",
                        "Confirmation",
                        "Price reacts before the entry is considered.",
                      ],
                    ].map(([no, title, text]) => (
                      <div
                        key={no}
                        className="rounded-[12px] bg-slate-50 px-3 py-2.5"
                      >

                        <div className="text-[9px] font-black text-brand-600">
                          {no}
                        </div>

                        <div className="mt-0.5 text-[12px] font-black text-slate-950">
                          {title}
                        </div>

                        <div className="mt-1 text-[10px] leading-5 text-slate-500">
                          {text}
                        </div>

                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-amber-700">
                    Common Mistake
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    Chasing price after a large move
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    When a market moves quickly, traders often enter because
                    they fear missing the move. But an extended entry can place
                    the stop farther from the trade or leave little room before
                    the next resistance level. Patience is part of the swing
                    trading setup.
                  </p>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              03 — SWING TRADING SETUPS
          ================================================= */}

          <section
            id="swing-setups"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — Popular Setups
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                4 Common Swing Trading Setups
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Swing trading is a trading style rather than one fixed entry
                pattern. Depending on the market condition, a swing setup may
                develop from a trend pullback, a breakout and retest, a key
                support or resistance area, or a genuine reversal in market
                structure.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    no: "01",
                    label: "Trend Setup",
                    title: "Pullback",
                    text: "Wait for price to retrace inside an established trend before looking for continuation.",
                  },
                  {
                    no: "02",
                    label: "Expansion Setup",
                    title: "Breakout & Retest",
                    text: "Wait for price to break a key level, return to it and show that the level may hold.",
                  },
                  {
                    no: "03",
                    label: "Price Level Setup",
                    title: "Support / Resistance",
                    text: "Watch for a meaningful reaction when price reaches an important market area.",
                  },
                  {
                    no: "04",
                    label: "Structure Setup",
                    title: "Reversal",
                    text: "Look for evidence that the previous trend has weakened and structure has started to change.",
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

                      <div>

                        <div className="text-[8px] font-black uppercase tracking-wide text-brand-600">
                          {item.label}
                        </div>

                        <h3 className="mt-0.5 text-[14px] font-black text-slate-950">
                          {item.title}
                        </h3>

                      </div>

                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  Which swing trading setup is best?
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600">
                  There is no setup that works best in every market. A
                  pullback strategy makes more sense when a trend is clearly
                  established. A breakout and retest setup needs a meaningful
                  level and a genuine breakout. A reversal setup requires more
                  evidence because it attempts to trade a change in the
                  previous market structure.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              04 — PULLBACK VS REVERSAL
          ================================================= */}

          <section
            id="pullback-vs-reversal"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — Pullback vs Reversal
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Pullback vs Reversal: How Can Swing Traders Tell the Difference?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                This is one of the most important distinctions in swing
                trading. A decline inside an uptrend does not automatically
                mean the trend has ended, and a rally inside a downtrend does
                not automatically signal a new bull market. The key is to
                examine{" "}
                <strong className="font-black text-slate-900">
                  market structure and the levels price continues to defend or break
                </strong>
                .
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2">

                {/* PULLBACK */}
                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                    Pullback
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    A temporary move against the broader trend
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    During a pullback, price moves against the dominant trend
                    without clearly breaking the structure that supports that
                    trend. In an uptrend, for example, price may retrace and
                    still form a higher low before continuing upward.
                  </p>


                  <div className="mt-3 space-y-2">

                    {[
                      "The broader trend is still intact.",
                      "An important structural high or low has not been invalidated.",
                      "The countertrend move may be weaker than the main impulse.",
                      "Price may be approaching support or another area of interest.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2"
                      >

                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

                        <span className="text-[11px] leading-5 text-slate-600">
                          {item}
                        </span>

                      </div>
                    ))}

                  </div>

                </article>


                {/* REVERSAL */}
                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-rose-700">
                    Reversal
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    A potential change in the dominant trend
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    A reversal becomes more plausible when the old trend stops
                    producing the structure expected from it and price begins
                    breaking levels that previously supported that trend.
                  </p>


                  <div className="mt-3 space-y-2">

                    {[
                      "Price fails to continue the previous trend structure.",
                      "A major swing low or swing high is broken.",
                      "New swing points begin supporting the opposite direction.",
                      "Momentum and price behavior change in a meaningful way.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2"
                      >

                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />

                        <span className="text-[11px] leading-5 text-slate-600">
                          {item}
                        </span>

                      </div>
                    ))}

                  </div>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="One strong candle does not confirm a reversal">
                  A large bearish candle inside an uptrend does not prove that
                  the trend has reversed. Check whether important structure
                  has actually failed and whether price begins producing swing
                  highs and lows consistent with a new direction.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              05 — BULLISH / BEARISH SWING TRADING
          ================================================= */}

          <section
            id="bullish-bearish-swing"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — Trade Direction
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Bullish and Bearish Swing Trading Setups
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Swing traders can look for opportunities in both rising and
                falling markets. A bullish swing setup usually looks for a
                pullback inside an uptrend, while a bearish swing setup may
                look for a rally into resistance inside a broader downtrend.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                {/* BULLISH */}
                <article className="rounded-[20px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                        Bullish Swing
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        Long Swing Trading Setup
                      </h3>

                    </div>


                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-emerald-600 text-[14px] font-black text-white">
                      ↑
                    </div>

                  </div>


                  <div className="mt-4 space-y-2">

                    {[
                      ["Context", "Established uptrend or bullish structural shift."],
                      ["Wait", "Pullback toward support or an area of interest."],
                      ["Trigger", "Evidence that buyers are returning."],
                      ["Invalidation", "A break of the swing low supporting the setup."],
                      ["Target", "Previous high or another logical resistance area."],
                    ].map(([label, text]) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >

                        <span className="min-w-[72px] text-[10px] font-black text-emerald-700">
                          {label}
                        </span>

                        <span className="text-[11px] leading-5 text-slate-600">
                          {text}
                        </span>

                      </div>
                    ))}

                  </div>

                </article>


                {/* BEARISH */}
                <article className="rounded-[20px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <div className="text-[9px] font-black uppercase tracking-wide text-rose-700">
                        Bearish Swing
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        Short Swing Trading Setup
                      </h3>

                    </div>


                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-rose-600 text-[14px] font-black text-white">
                      ↓
                    </div>

                  </div>


                  <div className="mt-4 space-y-2">

                    {[
                      ["Context", "Established downtrend or bearish structural shift."],
                      ["Wait", "Rally toward resistance or an area of interest."],
                      ["Trigger", "Evidence that sellers are returning."],
                      ["Invalidation", "A break of the swing high supporting the setup."],
                      ["Target", "Previous low or another logical support area."],
                    ].map(([label, text]) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >

                        <span className="min-w-[72px] text-[10px] font-black text-rose-700">
                          {label}
                        </span>

                        <span className="text-[11px] leading-5 text-slate-600">
                          {text}
                        </span>

                      </div>
                    ))}

                  </div>

                </article>

              </div>

            </div>

          </section>


          {/* =================================================
              06 — SUPPORT & RESISTANCE
          ================================================= */}

          <section
            id="swing-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — Key Price Areas
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Use Support and Resistance in Swing Trading
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Support and resistance help swing traders identify areas where
                a setup may become more interesting. A level is not an
                automatic entry signal. Treat it as an{" "}
                <strong className="font-black text-slate-900">
                  area to watch
                </strong>{" "}
                and then evaluate what price actually does when it arrives.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                {[
                  {
                    no: "01",
                    title: "Support in an Uptrend",
                    text: "Wait for a pullback into support and watch whether bullish structure remains intact.",
                  },
                  {
                    no: "02",
                    title: "Resistance in a Downtrend",
                    text: "Watch a rally into resistance for evidence that sellers may regain control.",
                  },
                  {
                    no: "03",
                    title: "Role Reversal",
                    text: "Broken resistance may become support, while broken support may later act as resistance.",
                  },
                ].map((item) => (
                  <div
                    key={item.no}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-4"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[13px] font-black text-white">
                    !
                  </div>

                  <div>

                    <h3 className="text-[15px] font-black text-slate-950">
                      Do not enter just because price touched a level
                    </h3>

                    <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                      Support and resistance tell you where to pay attention.
                      They do not tell you that price must reverse. Watch for
                      rejection, momentum changes, structure or another
                      confirmation before building the trade.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              07 — BREAKOUT & RETEST
          ================================================= */}

          <section
            id="swing-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — Breakout Setup
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Breakout and Retest Swing Trading Strategy
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A breakout and retest setup develops when price breaks through
                an important level and later returns to test that area before
                attempting to continue. Waiting for the retest can provide a
                more structured entry than chasing price immediately after an
                extended breakout.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  [
                    "01",
                    "Identify a Key Level",
                    "Start with support, resistance or a clear range boundary.",
                  ],
                  [
                    "02",
                    "Wait for the Breakout",
                    "Look for price to move and close beyond the area.",
                  ],
                  [
                    "03",
                    "Watch the Retest",
                    "Let price return toward the level it just broke.",
                  ],
                  [
                    "04",
                    "Evaluate Confirmation",
                    "Judge the reaction before considering an entry.",
                  ],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[16px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {no}
                      </div>

                      <h3 className="text-[12px] font-black text-slate-950">
                        {title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[10px] leading-5 text-slate-500">
                      {text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4">

                <ImportantBox title="A breakout is not automatically a valid swing entry">
                  Some breakouts fail quickly and price returns to the previous
                  range. Evaluate the close beyond the level, the strength of
                  the move and what happens during the retest instead of
                  assuming every breakout will continue.
                </ImportantBox>

              </div>

            </div>

          </section>
                    {/* =================================================
              08 — COMPLETE SWING TRADING EXAMPLE
          ================================================= */}

          <section
            id="swing-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                08 — Complete Example
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Swing Trading Example: From Setup to Entry, Stop Loss and Target
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Suppose a market is moving in an established uptrend and then
                begins pulling back toward a previous support area. Instead of
                buying immediately, we wait for a meaningful reaction and build
                a complete swing trade with a predefined entry, invalidation
                level, stop loss and target.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP STEPS */}
              <div className="hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  ["01", "Find the Trend", "Bullish structure."],
                  ["02", "Mark Support", "Logical price area."],
                  ["03", "Wait for Pullback", "Do not chase price."],
                  ["04", "Watch Confirmation", "Buyers return."],
                  ["05", "Set the Stop", "Beyond invalidation."],
                  ["06", "Set the Target", "High or logical level."],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {no}
                      </div>

                      <h3 className="text-[11px] font-black text-slate-950">
                        {title}
                      </h3>

                    </div>

                    <p className="mt-1.5 text-[9px] leading-5 text-slate-500">
                      {text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE STEPS */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "Find the Trend", "Bullish structure."],
                  ["02", "Mark Support", "Logical price area."],
                  ["03", "Wait for Pullback", "Do not chase the move."],
                  ["04", "Wait for Confirmation", "Buyers return."],
                  ["05", "Set the Stop", "Beyond invalidation."],
                  ["06", "Set the Target", "Logical price level."],
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


              {/* TRADE LOGIC */}
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

                <div className="rounded-[20px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Trade Logic
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Why is this swing trading setup worth evaluating?
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    The decision is not based on one indicator or one candle.
                    The broader structure is bullish, price has pulled back
                    toward support, buyers have started responding and there is
                    a clearly defined level at which the original trade idea
                    would become invalid.
                  </p>


                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {[
                      ["Context", "Bullish trend"],
                      ["Location", "Support / area of interest"],
                      ["Pullback", "Controlled retracement"],
                      ["Confirmation", "Bullish pressure returns"],
                      ["Invalidation", "Important swing low breaks"],
                      ["Target", "Swing high / resistance"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[11px] border border-slate-100 bg-slate-50/60 px-3 py-2.5"
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

                </div>


                <aside className="rounded-[20px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Practical Rule
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    You do not need to capture the entire market move
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                    Swing trading is not about buying the exact bottom and
                    selling the exact top. Capturing a well-defined portion of
                    a price move with controlled risk is enough. Consistency
                    matters more than trying to predict every turning point.
                  </p>


                  <div className="mt-4 rounded-[14px] border border-brand-100 bg-white p-3">

                    <div className="grid grid-cols-3 gap-2 text-center">

                      <div>

                        <div className="text-[8px] font-black uppercase text-brand-600">
                          Entry
                        </div>

                        <div className="mt-1 text-[10px] font-black text-slate-950">
                          After Confirmation
                        </div>

                      </div>

                      <div>

                        <div className="text-[8px] font-black uppercase text-rose-600">
                          Stop
                        </div>

                        <div className="mt-1 text-[10px] font-black text-slate-950">
                          Beyond Invalidation
                        </div>

                      </div>

                      <div>

                        <div className="text-[8px] font-black uppercase text-emerald-700">
                          Target
                        </div>

                        <div className="mt-1 text-[10px] font-black text-slate-950">
                          Logical Level
                        </div>

                      </div>

                    </div>

                  </div>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              09 — BEST TIMEFRAMES
          ================================================= */}

          <section
            id="timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — Timeframes
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Is the Best Timeframe for Swing Trading?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                There is no single best swing trading timeframe for every
                trader or market. Swing traders generally use higher
                timeframes than scalpers and day traders because they are
                looking for price moves that may develop over several days or
                weeks. Higher timeframes can define the broader structure,
                while lower timeframes can help refine an entry.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-4">

                {[
                  {
                    label: "Market Context",
                    timeframe: "Daily",
                    text: "Useful for identifying the broader trend and major price levels.",
                  },
                  {
                    label: "Primary Swing Chart",
                    timeframe: "4H",
                    text: "Commonly used to study swing structure, pullbacks and setups.",
                  },
                  {
                    label: "Entry Refinement",
                    timeframe: "1H",
                    text: "Useful for observing price behavior inside the setup area.",
                  },
                  {
                    label: "Extra Detail",
                    timeframe: "15m",
                    text: "Optional for execution detail without changing the higher-timeframe context.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/60 p-4"
                  >

                    <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[18px] font-black text-slate-950">
                      {item.timeframe}
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                  Multi-Timeframe Analysis
                </div>

                <h3 className="mt-1 text-[17px] font-black text-slate-950">
                  A simple multi-timeframe swing trading workflow
                </h3>


                <div className="mt-3 grid gap-2 md:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "Daily Chart",
                      text: "Identify the broader trend and major areas.",
                    },
                    {
                      no: "02",
                      title: "4-Hour Chart",
                      text: "Watch the pullback and potential swing setup.",
                    },
                    {
                      no: "03",
                      title: "1-Hour Chart",
                      text: "Look for confirmation and refine the entry.",
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
                  Every timeframe contains small highs, lows and short-term
                  moves that can appear important. In swing trading, keep the
                  higher-timeframe context clear. Use a lower timeframe to
                  refine execution rather than changing your directional bias
                  every few candles.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              10 — SWING TRADING INDICATORS
          ================================================= */}

          <section
            id="indicators"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                10 — Technical Tools
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Best Indicators for Swing Trading: Do You Actually Need Them?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Swing trading can be based entirely on price action, market
                structure and key levels. However, some traders use indicators
                such as moving averages, RSI and Fibonacci retracements as
                supporting tools. An indicator should add context rather than
                replace the analysis of price itself.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                <article className="rounded-[18px] border border-brand-100 bg-brand-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Moving Average
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Moving Averages
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    Moving averages can help visualize trend direction and
                    areas where price is retracing. A touch of a moving average
                    by itself, however, is not necessarily a swing trading
                    signal.
                  </p>

                </article>


                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
                    RSI
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Relative Strength Index
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    RSI can provide information about momentum and overbought
                    or oversold conditions. Its reading becomes more useful
                    when combined with market structure and a meaningful price
                    area.
                  </p>

                </article>


                <article className="rounded-[18px] border border-amber-100 bg-amber-50/40 p-4">

                  <div className="text-[9px] font-black uppercase tracking-wide text-amber-700">
                    Fibonacci
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Fibonacci Retracement
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    Some swing traders use Fibonacci levels to evaluate the
                    depth of a pullback. These levels are generally more useful
                    when they align with structure, support or resistance
                    rather than being used alone.
                  </p>

                </article>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  A better order for swing trading analysis
                </h3>


                <div className="mt-3 grid gap-2 sm:grid-cols-4">

                  {[
                    ["1", "Price Action"],
                    ["2", "Market Structure"],
                    ["3", "Key Levels"],
                    ["4", "Indicators as Support"],
                  ].map(([no, text]) => (
                    <div
                      key={no}
                      className="flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >

                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[9px] font-black text-white">
                        {no}
                      </span>

                      <span className="text-[11px] font-black text-slate-700">
                        {text}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              11 — MARKETS
          ================================================= */}

          <section
            id="markets"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                11 — Markets
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Which Markets Are Best for Swing Trading?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Swing trading principles can be applied across different
                financial markets when sufficient liquidity and price movement
                are available. However, volatility, trading hours, overnight
                exposure and holding costs vary between forex, stocks, indices
                and commodities.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    title: "Forex",
                    text: "Currency pairs can develop trends and pullbacks that extend across several trading sessions.",
                  },
                  {
                    title: "Gold",
                    text: "Gold can produce significant multi-day price swings and periods of strong volatility.",
                  },
                  {
                    title: "Stock Indices",
                    text: "Major indices can be analyzed for higher-timeframe trends, pullbacks and breakout structures.",
                  },
                  {
                    title: "Stocks",
                    text: "Swing trading is widely used in stocks because individual price moves can develop over days or weeks.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <h3 className="text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  Remember the cost of holding trades overnight
                </h3>

                <p className="mt-1.5 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                  Because swing trades can remain open for several days,
                  overnight financing, swap charges, spreads and other holding
                  costs may affect the final result. Always understand the
                  costs that apply to the instrument and account you trade.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              12 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black text-orange-700">
                12 — Risk Management
              </span>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Swing Trading Risk Management and Stop-Loss Placement
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Swing trading stop losses can sometimes be wider than those
                used in very short-term strategies. That makes position sizing
                especially important. The objective is not to force the stop
                closer to the entry, but to place it at a logical invalidation
                level and adjust the position size so the potential loss
                remains within your risk plan.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">

                {[
                  {
                    label: "Risk",
                    value: "Defined First",
                    text: "Know your maximum acceptable loss before entry.",
                  },
                  {
                    label: "Stop Loss",
                    value: "Beyond Invalidation",
                    text: "Place it where the original trade idea fails.",
                  },
                  {
                    label: "Position Size",
                    value: "Based on Stop",
                    text: "A wider stop generally requires a smaller position.",
                  },
                  {
                    label: "Target",
                    value: "Logical",
                    text: "Use a swing high, swing low or meaningful price area.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4"
                  >

                    <div className="text-[9px] font-black uppercase tracking-wide text-slate-500">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[14px] font-black text-slate-950 md:text-[16px]">
                      {item.value}
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                    Risk Example
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    A wider stop does not automatically mean more account risk
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    If the logical invalidation level is relatively far from
                    the entry, the position size can be reduced instead of
                    moving the stop to an arbitrary location simply to make it
                    tighter.
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <h3 className="text-[17px] font-black text-slate-950">
                    Calculate your position size before entering
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    Once you know the entry price, stop-loss level and amount
                    of capital you are prepared to risk, use the risk
                    calculator to estimate an appropriate position size.
                  </p>

                  <Link
                    href="/en/tools/risk-calculator"
                    className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-4 text-[11px] font-black text-white transition hover:bg-brand-700"
                  >
                    Open Risk Calculator
                    <span className="ml-2">→</span>
                  </Link>

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="Do not move your stop just to avoid taking a loss">
                  If price reaches the level that invalidates your original
                  setup, widening the stop after entry increases risk and
                  changes the trade you initially planned. Defining
                  invalidation before entering is a fundamental part of risk
                  discipline.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              13 — SWING VS DAY TRADING VS SCALPING
          ================================================= */}

          <section
            id="comparison"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                13 — Trading Style Comparison
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Swing Trading vs Day Trading vs Scalping
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The main difference between swing trading, day trading and
                scalping is not that one method is universally better. They
                differ in holding period, chart timeframes, trade frequency
                and how much active market monitoring they generally require.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="overflow-x-auto rounded-[18px] border border-slate-200">

                <div className="min-w-[620px]">

                  <div className="grid grid-cols-4 bg-slate-900 text-center text-[10px] font-black text-white">

                    <div className="p-3">
                      Factor
                    </div>

                    <div className="p-3">
                      Swing Trading
                    </div>

                    <div className="p-3">
                      Day Trading
                    </div>

                    <div className="p-3">
                      Scalping
                    </div>

                  </div>


                  {[
                    ["Typical Holding Period", "Days–Weeks", "Minutes–Hours", "Seconds–Minutes"],
                    ["Market Monitoring", "Moderate", "High", "Very High"],
                    ["Common Timeframes", "1H–Daily", "5m–1H", "1m–5m"],
                    ["Trade Frequency", "Lower", "Moderate", "High"],
                    ["Execution Pressure", "Relatively Lower", "Medium–High", "Very High"],
                  ].map((row, index) => (
                    <div
                      key={row[0]}
                      className={`grid grid-cols-4 text-center text-[10px] text-slate-600 md:text-[11px] ${
                        index !== 4 ? "border-b border-slate-100" : ""
                      }`}
                    >

                      {row.map((cell, i) => (
                        <div
                          key={`${row[0]}-${i}`}
                          className={`p-3 ${
                            i === 0
                              ? "bg-slate-50 font-black text-slate-800"
                              : ""
                          }`}
                        >
                          {cell}
                        </div>
                      ))}

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4">

                <Link
                  href="/en/strategies/scalping"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-4 text-[11px] font-black text-brand-600 transition hover:bg-brand-50"
                >
                  Read the Scalping Strategy Guide
                  <span className="ml-2">→</span>
                </Link>

              </div>

            </div>

          </section>


          {/* =================================================
              14 — PROS & CONS
          ================================================= */}

          <section
            id="pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                14 — Pros & Cons
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Swing Trading Advantages and Disadvantages
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Swing trading can appeal to traders who cannot monitor charts
                continuously throughout the day. However, holding positions
                for several days also introduces overnight exposure, patience
                requirements and potential financing costs.
              </p>

            </div>


            <div className="grid md:grid-cols-2">

              {/* PROS */}
              <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-50 text-[14px] font-black text-green-700">
                    ✓
                  </div>

                  <h3 className="text-[18px] font-black text-slate-950">
                    Advantages
                  </h3>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-green-100">

                  {[
                    "Does not usually require constant chart monitoring throughout the entire day.",
                    "Can target larger price moves than very short-term scalping strategies.",
                    "Higher timeframes can make broader market structure easier to identify.",
                    "May suit traders who cannot actively trade every market session.",
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

                      <p className="text-[12px] leading-6 text-slate-700 md:text-[13px]">
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

                  <h3 className="text-[18px] font-black text-slate-950">
                    Disadvantages & Challenges
                  </h3>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-rose-100">

                  {[
                    "Positions may remain open during major news events, overnight moves or market gaps.",
                    "Requires patience, and several days may pass without a suitable setup.",
                    "Stop losses can be wider than those used in short-term trading.",
                    "Holding positions overnight may involve swap or financing charges.",
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

                      <p className="text-[12px] leading-6 text-slate-700 md:text-[13px]">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

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
                Beginner Roadmap
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Learn Swing Trading as a Beginner
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Avoid starting with dozens of indicators and strategies at the
                same time. First learn how to identify market structure, swing
                highs and swing lows. Then study support and resistance,
                pullbacks, entries, invalidation and risk management.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  [
                    "01",
                    "Market Structure",
                    "Understand swing highs, swing lows and trend direction.",
                  ],
                  [
                    "02",
                    "Support & Resistance",
                    "Learn to identify meaningful price areas.",
                  ],
                  [
                    "03",
                    "Pullbacks",
                    "Learn the difference between a pullback and a reversal.",
                  ],
                  [
                    "04",
                    "Entry & Invalidation",
                    "Know where to enter and when the idea becomes wrong.",
                  ],
                  [
                    "05",
                    "Risk Management",
                    "Plan position size, stop loss and target.",
                  ],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[17px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {no}
                      </div>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE */}
              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "Market Structure", "Swings, highs, lows and trend."],
                  ["02", "Support & Resistance", "Identify important areas."],
                  ["03", "Pullbacks", "Understand pullback vs reversal."],
                  ["04", "Entry & Invalidation", "Plan before execution."],
                  ["05", "Risk Management", "Position size, stop and target."],
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


              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  A simple swing trading strategy for beginners
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600">
                  Start with one market and one repeatable setup. For example:
                  identify a clear higher-timeframe trend, wait for a pullback
                  toward support, observe whether the trend structure remains
                  intact, define the invalidation point and only then evaluate
                  whether the potential reward justifies the risk.
                </p>

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
                Swing Trading FAQs
              </h2>

              <p className="mt-3 max-w-5xl text-[13px] leading-7 text-slate-600 md:text-[14px]">
                Quick answers to common questions about swing trading
                strategies, timeframes, indicators, trade duration and risk.
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
                Related Trading Guides
              </div>

              <h2 className="mt-1 text-[20px] font-black leading-7 text-slate-950 md:text-[26px]">
                Learn More About Price Action and Trade Management
              </h2>

            </div>


            {/* DESKTOP */}
            <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">

              {[
                {
                  label: "Trading Strategy",
                  title: "Price Action Trading",
                  text: "Learn how traders read price movement and market structure.",
                  href: "/en/strategies/price-action",
                },
                {
                  label: "Risk Management",
                  title: "Stop Loss",
                  text: "Understand how stop-loss orders help define trade risk.",
                  href: "/en/learn-trading/stop-loss",
                },
                {
                  label: "Trade Management",
                  title: "Take Profit",
                  text: "Learn how traders plan logical profit targets.",
                  href: "/en/learn-trading/take-profit",
                },
                {
                  label: "Position Sizing",
                  title: "Lot Size",
                  text: "Understand the relationship between lot size, stop loss and risk.",
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
                [
                  "Trading Strategy",
                  "Price Action Trading",
                  "/en/strategies/price-action",
                ],
                [
                  "Risk Management",
                  "Stop Loss",
                  "/en/learn-trading/stop-loss",
                ],
                [
                  "Trade Management",
                  "Take Profit",
                  "/en/learn-trading/take-profit",
                ],
                [
                  "Position Sizing",
                  "Lot Size",
                  "/en/learn-trading/lot",
                ],
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

                <h2 className="mt-2.5 text-[20px] font-black leading-[1.4] text-slate-950 md:text-[27px]">
                  Practice Your Swing Trading Strategy Before Trading Live
                </h2>

                <p className="mt-2 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                  Practice identifying trends, swing highs, swing lows,
                  pullbacks, entries and invalidation levels on a demo account.
                  Keep a trading journal and evaluate the results before risking
                  real capital.
                </p>

              </div>


              <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-0 md:flex md:shrink-0">

                <Link
                  href="/en/tools"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 text-center text-[11px] font-black text-brand-600 transition hover:bg-brand-50 md:min-w-[140px]"
                >
                  Trading Tools
                </Link>

                <Link
                  href="/en/best-brokers"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] bg-brand-600 px-3 text-center text-[11px] font-black text-white transition hover:bg-brand-700 md:min-w-[165px]"
                >
                  Compare Brokers
                  <span className="ml-2">→</span>
                </Link>

              </div>

            </div>


            <div className="border-t border-brand-100/70 bg-white/50 px-4 py-2.5 md:px-7">

              <p className="text-center text-[10px] leading-5 text-slate-500 md:text-left md:text-[11px]">
                This content is for educational purposes only and does not
                constitute investment advice or a trading signal. Leveraged
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

    </main>
  );
}