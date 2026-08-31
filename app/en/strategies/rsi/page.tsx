import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   RSI TRADING STRATEGY — ENGLISH
   Broker Alarab
   Path: /en/strategies/rsi
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/rsi`;

const PAGE_TITLE =
  "RSI Trading Strategy: How to Use the RSI Indicator";

const PAGE_DESCRIPTION =
  "Learn how to use RSI in trading with RSI 14, 70/30 levels, the 50 level, overbought and oversold signals, RSI divergence, entries, stop losses and risk management.";


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
      ar: `${BASE_URL}/strategies/rsi`,
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
========================================================= */

const faqItems = [
  {
    q: "What is the RSI indicator?",
    a: "The Relative Strength Index, or RSI, is a momentum oscillator that moves between 0 and 100 and measures the speed and magnitude of recent price changes. Traders use RSI to evaluate momentum, overbought and oversold conditions, divergences and potential shifts in market strength.",
  },
  {
    q: "What are the best RSI settings?",
    a: "RSI 14 is the traditional and most widely used setting, usually combined with 70 as the overbought level and 30 as the oversold level. Shorter settings react faster while longer settings are smoother, so there is no single best RSI setting for every market, timeframe or strategy.",
  },
  {
    q: "What does RSI above 70 mean?",
    a: "An RSI reading above 70 is traditionally considered overbought and indicates strong recent bullish momentum. It does not automatically mean the price is about to fall because RSI can remain above 70 for an extended period during a strong uptrend.",
  },
  {
    q: "What does RSI below 30 mean?",
    a: "An RSI reading below 30 is traditionally considered oversold and reflects strong recent bearish momentum. It is not an automatic buy signal because price can continue falling while RSI remains oversold in a strong downtrend.",
  },
  {
    q: "What does the RSI 50 level mean?",
    a: "The 50 level is the midpoint of the RSI range and can help traders evaluate momentum bias. RSI holding above 50 can support a bullish momentum reading, while RSI below 50 can support a bearish reading when it agrees with price structure and trend.",
  },
  {
    q: "What is RSI divergence?",
    a: "RSI divergence occurs when price and the RSI indicator move differently. For example, bullish divergence occurs when price makes a lower low while RSI makes a higher low. This may indicate weakening bearish momentum, but divergence alone does not guarantee a reversal.",
  },
  {
    q: "Is the RSI strategy good for beginners?",
    a: "RSI is relatively easy to understand, which makes it useful for beginners. However, a trader should still learn trend analysis, market structure, support and resistance, stop-loss placement and risk management instead of relying only on RSI 70 and 30 signals.",
  },
  {
    q: "What is the best timeframe for RSI?",
    a: "RSI can be used on many timeframes, and there is no single best timeframe for every trader. Short-term traders may use lower timeframes, while swing traders often study RSI on the 4-hour and daily charts together with broader market structure.",
  },
];


/* =========================================================
   HERO CHART — DESKTOP
========================================================= */

function RSIHeroDesktopChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">

        <div className="text-left">

          <div className="text-[13px] font-black text-slate-950">
            How Traders Read RSI
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            Price momentum → RSI zones → context → confirmation
          </div>

        </div>

        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600">
          RSI 14
        </span>

      </div>


      <svg
        viewBox="0 0 720 390"
        className="block w-full"
        role="img"
        aria-label="Educational chart showing price movement and RSI levels 70, 50 and 30"
      >

        <rect width="720" height="390" fill="#ffffff" />


        {/* PRICE AREA */}

        {[55, 105, 155, 205].map((y) => (
          <line
            key={`price-h-${y}`}
            x1="45"
            y1={y}
            x2="675"
            y2={y}
            stroke="#eef2f7"
          />
        ))}

        <text
          x="48"
          y="35"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          PRICE
        </text>


        <polyline
          points="
            50,190
            110,165
            165,180
            220,125
            280,145
            335,92
            395,112
            455,70
            515,95
            575,62
            665,88
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* DIVIDER */}

        <line
          x1="40"
          y1="225"
          x2="680"
          y2="225"
          stroke="#cbd5e1"
        />


        {/* RSI BACKGROUND ZONES */}

        <rect
          x="45"
          y="248"
          width="630"
          height="30"
          fill="#fff1f2"
        />

        <rect
          x="45"
          y="338"
          width="630"
          height="30"
          fill="#ecfdf5"
        />


        {/* RSI LEVELS */}

        <line
          x1="45"
          y1="278"
          x2="675"
          y2="278"
          stroke="#e11d48"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />

        <line
          x1="45"
          y1="323"
          x2="675"
          y2="323"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />

        <line
          x1="45"
          y1="338"
          x2="675"
          y2="338"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />


        {/* LABELS */}

        <text
          x="57"
          y="268"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          70 — Overbought
        </text>

        <text
          x="57"
          y="316"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          50 — Midline
        </text>

        <text
          x="57"
          y="359"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          30 — Oversold
        </text>


        {/* RSI LINE */}

        <polyline
          points="
            50,330
            110,315
            165,326
            220,294
            280,310
            335,270
            395,287
            455,258
            515,285
            575,252
            665,275
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle
          cx="575"
          cy="252"
          r="6"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <text
          x="575"
          y="242"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Strong Momentum
        </text>


        <rect
          x="190"
          y="370"
          width="340"
          height="16"
          rx="8"
          fill="#0f172a"
        />

        <text
          x="360"
          y="381"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="900"
          fill="#ffffff"
        >
          RSI is momentum context — not an automatic buy or sell signal
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   HERO CHART — MOBILE
   NO ZOOM
========================================================= */

function RSIHeroMobileChart() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

        <span className="text-[11px] font-black text-slate-800">
          RSI 14
        </span>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
          Momentum
        </span>

      </div>


      <svg
        viewBox="0 0 360 265"
        className="block w-full"
        role="img"
        aria-label="Simple mobile chart explaining the RSI indicator"
      >

        <rect width="360" height="265" fill="#ffffff" />


        {/* PRICE */}

        <polyline
          points="
            20,110
            65,90
            105,102
            150,67
            195,82
            240,48
            285,64
            340,39
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <line
          x1="18"
          y1="130"
          x2="342"
          y2="130"
          stroke="#e2e8f0"
        />


        {/* RSI LEVELS */}

        <rect
          x="20"
          y="148"
          width="320"
          height="24"
          fill="#fff1f2"
        />

        <rect
          x="20"
          y="225"
          width="320"
          height="23"
          fill="#ecfdf5"
        />

        <line
          x1="20"
          y1="172"
          x2="340"
          y2="172"
          stroke="#e11d48"
          strokeDasharray="5 4"
        />

        <line
          x1="20"
          y1="210"
          x2="340"
          y2="210"
          stroke="#94a3b8"
          strokeDasharray="5 4"
        />

        <line
          x1="20"
          y1="225"
          x2="340"
          y2="225"
          stroke="#16a34a"
          strokeDasharray="5 4"
        />


        <text
          x="26"
          y="164"
          fontSize="8"
          fontWeight="900"
          fill="#be123c"
        >
          70
        </text>

        <text
          x="26"
          y="204"
          fontSize="8"
          fontWeight="900"
          fill="#64748b"
        >
          50
        </text>

        <text
          x="26"
          y="243"
          fontSize="8"
          fontWeight="900"
          fill="#15803d"
        >
          30
        </text>


        {/* RSI */}

        <polyline
          points="
            40,220
            85,205
            125,216
            170,188
            215,198
            260,165
            300,183
            335,158
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <text
          x="180"
          y="258"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#475569"
        >
          Overbought • Momentum • Oversold
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   RSI 70 / 30 CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function RSIOverboughtOversoldChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          How to Read RSI 70 and 30 Levels
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          Overbought and oversold do not automatically mean price will reverse
        </p>

      </div>


      <svg
        viewBox="0 0 800 400"
        className="block w-full"
        role="img"
        aria-label="Example showing RSI overbought above 70 and oversold below 30"
      >

        <rect width="800" height="400" fill="#ffffff" />


        {/* PRICE GRID */}

        {[60, 110, 160, 210].map((y) => (
          <line
            key={`rsi-price-${y}`}
            x1="45"
            y1={y}
            x2="755"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <text
          x="48"
          y="38"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          PRICE
        </text>


        {/* PRICE LINE */}

        <polyline
          points="
            50,180
            105,150
            160,170
            215,120
            270,82
            325,105
            380,70
            440,112
            500,150
            560,130
            620,178
            680,205
            750,180
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle
          cx="380"
          cy="70"
          r="7"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />

        <text
          x="380"
          y="50"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Strong Rise
        </text>


        <circle
          cx="680"
          cy="205"
          r="7"
          fill="#fff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="680"
          y="228"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Strong Decline
        </text>


        {/* DIVIDER */}

        <line
          x1="40"
          y1="245"
          x2="760"
          y2="245"
          stroke="#cbd5e1"
        />


        {/* RSI ZONES */}

        <rect
          x="45"
          y="265"
          width="710"
          height="30"
          fill="#fff1f2"
        />

        <rect
          x="45"
          y="350"
          width="710"
          height="30"
          fill="#ecfdf5"
        />


        <line
          x1="45"
          y1="295"
          x2="755"
          y2="295"
          stroke="#e11d48"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <line
          x1="45"
          y1="337"
          x2="755"
          y2="337"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <line
          x1="45"
          y1="350"
          x2="755"
          y2="350"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />


        <text
          x="55"
          y="286"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          RSI 70
        </text>

        <text
          x="55"
          y="331"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          RSI 50
        </text>

        <text
          x="55"
          y="371"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          RSI 30
        </text>


        {/* RSI LINE */}

        <polyline
          points="
            65,342
            120,330
            175,340
            230,310
            285,285
            330,300
            380,275
            440,306
            500,330
            560,320
            620,352
            680,365
            740,345
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle
          cx="380"
          cy="275"
          r="7"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />

        <text
          x="380"
          y="263"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Overbought
        </text>


        <circle
          cx="680"
          cy="365"
          r="7"
          fill="#fff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="680"
          y="392"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Oversold
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


      {/* MOBILE */}

      <a
        href="#rsi-70-30-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="Enlarge RSI 70 and 30 chart"
      >

        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            Enlarge chart
            <span>↗</span>
          </span>

        </div>

      </a>


      {/* FULLSCREEN */}

      <div
        id="rsi-70-30-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#rsi-levels"
          className="absolute inset-0"
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                RSI 70 and 30 Levels
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Overbought and oversold RSI
              </div>

            </div>


            <a
              href="#rsi-levels"
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


          <div className="overflow-x-auto overflow-y-auto bg-white">

            <div className="min-w-[860px] p-3">
              <RSIOverboughtOversoldChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   RSI DIVERGENCE CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function RSIDivergenceChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[13px] font-black text-slate-950 md:text-[14px]">
          Bullish RSI Divergence Example
        </h3>

        <p className="mt-0.5 text-[10px] text-slate-500 md:text-[11px]">
          Price makes a lower low while RSI makes a higher low
        </p>

      </div>


      <svg
        viewBox="0 0 800 420"
        className="block w-full"
        role="img"
        aria-label="Educational example of bullish RSI divergence"
      >

        <rect width="800" height="420" fill="#ffffff" />


        {/* PRICE */}

        {[60, 115, 170, 225].map((y) => (
          <line
            key={`div-price-${y}`}
            x1="45"
            y1={y}
            x2="755"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <text
          x="50"
          y="38"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          PRICE
        </text>


        <polyline
          points="
            60,85
            130,120
            200,100
            280,165
            355,130
            440,205
            520,170
            600,225
            680,170
            745,135
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* PRICE LOWS */}

        <circle
          cx="440"
          cy="205"
          r="7"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />

        <circle
          cx="600"
          cy="225"
          r="7"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />


        <line
          x1="440"
          y1="205"
          x2="600"
          y2="225"
          stroke="#e11d48"
          strokeWidth="3"
          strokeDasharray="7 5"
        />


        <text
          x="520"
          y="245"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Price: Lower Low
        </text>


        {/* DIVIDER */}

        <line
          x1="40"
          y1="270"
          x2="760"
          y2="270"
          stroke="#cbd5e1"
        />


        {/* RSI */}

        <text
          x="50"
          y="294"
          fontSize="10"
          fontWeight="900"
          fill="#2563eb"
        >
          RSI
        </text>


        <line
          x1="45"
          y1="320"
          x2="755"
          y2="320"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="6 5"
        />


        <polyline
          points="
            60,330
            130,345
            200,335
            280,365
            355,345
            440,375
            520,350
            600,355
            680,325
            745,310
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* RSI LOWS */}

        <circle
          cx="440"
          cy="375"
          r="7"
          fill="#fff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <circle
          cx="600"
          cy="355"
          r="7"
          fill="#fff"
          stroke="#16a34a"
          strokeWidth="3"
        />


        <line
          x1="440"
          y1="375"
          x2="600"
          y2="355"
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="7 5"
        />


        <text
          x="520"
          y="402"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          RSI: Higher Low
        </text>


        <rect
          x="615"
          y="280"
          width="130"
          height="30"
          rx="15"
          fill="#ecfdf5"
          stroke="#86efac"
        />

        <text
          x="680"
          y="299"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          Bullish Divergence
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


      {/* MOBILE */}

      <a
        href="#rsi-divergence-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="Enlarge RSI divergence example"
      >

        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            Enlarge example
            <span>↗</span>
          </span>

        </div>

      </a>


      {/* FULLSCREEN */}

      <div
        id="rsi-divergence-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#rsi-divergence"
          className="absolute inset-0"
          aria-label="Close example"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                RSI Divergence
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Comparing price movement with RSI momentum
              </div>

            </div>


            <a
              href="#rsi-divergence"
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


          <div className="overflow-x-auto overflow-y-auto bg-white">

            <div className="min-w-[860px] p-3">
              <RSIDivergenceChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   COMPLETE RSI TRADE EXAMPLE CHART
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function RSITradeExampleChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">

        <div>

          <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
            RSI Pullback Trade Example in an Uptrend
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500 md:text-[12px]">
            Uptrend → Pullback → RSI 40–50 → Confirmation → Entry
          </p>

        </div>

        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
          RSI 14
        </span>

      </div>


      <svg
        viewBox="0 0 920 500"
        className="block w-full"
        role="img"
        aria-label="Complete RSI trading example showing an uptrend, pullback, entry, stop loss and target"
      >

        <rect width="920" height="500" fill="#ffffff" />


        {/* =================================================
            PRICE AREA
        ================================================= */}

        {[65, 125, 185, 245].map((y) => (
          <line
            key={`trade-price-${y}`}
            x1="55"
            y1={y}
            x2="865"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <text
          x="60"
          y="40"
          fontSize="12"
          fontWeight="900"
          fill="#64748b"
        >
          PRICE
        </text>


        {/* SUPPORT ZONE */}

        <rect
          x="435"
          y="205"
          width="185"
          height="38"
          rx="8"
          fill="#eff6ff"
          stroke="#93c5fd"
        />

        <text
          x="527"
          y="229"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Support / Pullback Zone
        </text>


        {/* PRICE PATH */}

        <polyline
          points="
            65,230
            130,195
            190,210
            250,160
            310,180
            375,125
            440,150
            500,190
            555,220
            610,185
            675,140
            735,105
            805,78
            860,95
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* TREND LABEL */}

        <line
          x1="110"
          y1="240"
          x2="370"
          y2="112"
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="8 6"
        />

        <text
          x="205"
          y="150"
          fontSize="12"
          fontWeight="900"
          fill="#15803d"
        >
          Uptrend
        </text>


        {/* ENTRY */}

        <circle
          cx="610"
          cy="185"
          r="8"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <line
          x1="610"
          y1="185"
          x2="610"
          y2="132"
          stroke="#2563eb"
          strokeWidth="2"
        />

        <rect
          x="566"
          y="100"
          width="88"
          height="30"
          rx="15"
          fill="#2563eb"
        />

        <text
          x="610"
          y="119"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#ffffff"
        >
          ENTRY
        </text>


        {/* STOP LOSS */}

        <line
          x1="455"
          y1="258"
          x2="625"
          y2="258"
          stroke="#e11d48"
          strokeWidth="3"
          strokeDasharray="8 6"
        />

        <rect
          x="470"
          y="267"
          width="110"
          height="28"
          rx="14"
          fill="#fff1f2"
          stroke="#fecdd3"
        />

        <text
          x="525"
          y="285"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          STOP LOSS
        </text>


        {/* TARGET */}

        <line
          x1="690"
          y1="65"
          x2="855"
          y2="65"
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="8 6"
        />

        <rect
          x="710"
          y="27"
          width="120"
          height="28"
          rx="14"
          fill="#ecfdf5"
          stroke="#bbf7d0"
        />

        <text
          x="770"
          y="45"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          TARGET
        </text>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <line
          x1="50"
          y1="315"
          x2="870"
          y2="315"
          stroke="#cbd5e1"
        />


        {/* =================================================
            RSI AREA
        ================================================= */}

        <text
          x="60"
          y="340"
          fontSize="12"
          fontWeight="900"
          fill="#2563eb"
        >
          RSI 14
        </text>


        <rect
          x="55"
          y="355"
          width="810"
          height="32"
          fill="#fff1f2"
        />

        <rect
          x="55"
          y="445"
          width="810"
          height="32"
          fill="#ecfdf5"
        />


        <line
          x1="55"
          y1="387"
          x2="865"
          y2="387"
          stroke="#e11d48"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <line
          x1="55"
          y1="423"
          x2="865"
          y2="423"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <line
          x1="55"
          y1="445"
          x2="865"
          y2="445"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />


        <text
          x="65"
          y="379"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          70
        </text>

        <text
          x="65"
          y="416"
          fontSize="10"
          fontWeight="900"
          fill="#64748b"
        >
          50
        </text>

        <text
          x="65"
          y="465"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          30
        </text>


        {/* RSI LINE */}

        <polyline
          points="
            90,425
            150,410
            210,420
            270,398
            330,405
            390,390
            450,410
            505,430
            555,438
            610,418
            670,398
            730,382
            800,370
            850,378
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle
          cx="555"
          cy="438"
          r="8"
          fill="#ffffff"
          stroke="#f59e0b"
          strokeWidth="4"
        />

        <text
          x="555"
          y="486"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          RSI 40–50 Zone
        </text>


        <circle
          cx="610"
          cy="418"
          r="8"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="4"
        />

        <text
          x="665"
          y="440"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          Momentum turns up
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


      {/* MOBILE */}

      <a
        href="#rsi-trade-example-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="Enlarge complete RSI trade example"
      >

        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            Enlarge example
            <span>↗</span>
          </span>

        </div>

      </a>


      {/* FULLSCREEN MOBILE */}

      <div
        id="rsi-trade-example-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#rsi-example"
          className="absolute inset-0"
          aria-label="Close example"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>

              <div className="text-[14px] font-black text-slate-950">
                Complete RSI Trade Example
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Entry, stop loss and target
              </div>

            </div>


            <a
              href="#rsi-example"
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
              Swipe left or right to explore the full trade
            </span>

          </div>


          <div className="overflow-x-auto overflow-y-auto bg-white">

            <div className="min-w-[980px] p-3">
              <RSITradeExampleChart fullscreen />
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

export default function RSITradingStrategyPage() {

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

    datePublished: "2026-08-31",
    dateModified: "2026-08-31",

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
        name: "Relative Strength Index",
      },
      {
        "@type": "Thing",
        name: "RSI Trading Strategy",
      },
      {
        "@type": "Thing",
        name: "RSI Indicator",
      },
      {
        "@type": "Thing",
        name: "RSI 14",
      },
      {
        "@type": "Thing",
        name: "RSI Divergence",
      },
      {
        "@type": "Thing",
        name: "Overbought and Oversold",
      },
      {
        "@type": "Thing",
        name: "Momentum Trading",
      },
      {
        "@type": "Thing",
        name: "Technical Analysis",
      },
    ],

    keywords: [
      "RSI trading strategy",
      "RSI strategy",
      "RSI indicator",
      "Relative Strength Index",
      "how to use RSI",
      "how to trade with RSI",
      "RSI strategy for beginners",
      "RSI 14",
      "RSI 70 30",
      "RSI overbought oversold",
      "overbought and oversold",
      "RSI divergence",
      "bullish RSI divergence",
      "bearish RSI divergence",
      "RSI 50 level",
      "best RSI settings",
      "best RSI strategy",
      "RSI trading signals",
      "RSI forex strategy",
      "RSI forex trading",
      "RSI entry strategy",
      "RSI stop loss",
      "RSI pullback strategy",
      "momentum trading strategy",
      "technical analysis RSI",
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
        name: "RSI Trading Strategy",
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
            RSI Trading Strategy
          </span>

        </nav>

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mx-auto max-w-[1520px] px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">

        {/* DESKTOP */}

        <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm md:block">

          <div className="grid min-h-[410px] lg:grid-cols-[1.1fr_0.9fr]">

            {/* CONTENT — LEFT */}

            <div className="flex flex-col justify-center px-8 py-7 text-left lg:px-10 xl:px-12">

              <div className="flex flex-wrap gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                  Trading Strategies
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
                  RSI Strategy
                </span>

              </div>


              <h1 className="mt-4 max-w-[900px] text-[34px] font-black leading-[1.22] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                RSI Trading Strategy: How to Use the RSI Indicator
              </h1>


              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                Learn how to use the{" "}
                <strong className="font-black text-slate-900">
                  Relative Strength Index (RSI)
                </strong>{" "}
                to read momentum, understand the 70, 30 and 50 levels,
                identify overbought and oversold conditions, spot RSI
                divergence, and build a complete trading setup with an
                entry, stop loss and target.
              </p>


              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  RSI 14
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  Overbought 70
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
                  Oversold 30
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  RSI Divergence
                </span>

              </div>


              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                <span>
                  📅 Aug 31, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  Updated: Aug 31, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  15–20 min read
                </span>

              </div>

            </div>


            {/* VISUAL — RIGHT */}

            <div className="flex items-center justify-center border-l border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] p-7 lg:p-8">

              <div className="w-full max-w-[560px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.10)]">

                <div className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4">

                  <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                  </div>

                  <span className="text-[10px] font-black text-slate-700">
                    RSI Trading Model
                  </span>

                </div>


                <div className="p-4">
                  <RSIHeroDesktopChart />
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* MOBILE HERO — NO ZOOM */}

        <div className="md:hidden">

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

            <div className="px-4 pb-2.5 pt-3.5">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
                  Trading Strategies
                </span>

                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black text-slate-600">
                  RSI Strategy
                </span>

              </div>


              <h1 className="mt-3 text-[26px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950">
                RSI Trading Strategy: How to Use the RSI Indicator
              </h1>


              <p className="mt-3 text-[14px] leading-[1.9] text-slate-600">
                A practical guide to{" "}
                <strong className="font-black text-slate-900">
                  RSI 14, the 70/30 levels, the 50 level and RSI divergence
                </strong>
                , plus how traders use momentum within a complete trading setup.
              </p>


              <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 Aug 31, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 15–20 min
                </span>

              </div>

            </div>


            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <RSIHeroMobileChart />

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

              <div className="p-4 md:p-7">

                <SectionLabel>
                  Start Here
                </SectionLabel>


                <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                  What Is the RSI Indicator?
                </h2>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  The{" "}
                  <strong className="font-black text-slate-900">
                    Relative Strength Index (RSI)
                  </strong>{" "}
                  is a momentum oscillator used in technical analysis to
                  measure the speed and magnitude of recent price changes.
                  It moves on a fixed scale between{" "}
                  <strong className="font-black text-slate-900">
                    0 and 100
                  </strong>
                  , helping traders evaluate whether bullish or bearish
                  momentum has been relatively strong over a selected period.
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  RSI does not tell you that an asset is objectively
                  “expensive” or “cheap.” Instead, it provides information
                  about{" "}
                  <strong className="font-black text-slate-900">
                    momentum
                  </strong>
                  . A rising RSI generally reflects stronger recent upward
                  price changes, while a falling RSI reflects stronger recent
                  downward price changes.
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  The standard setting used by many charting platforms is{" "}
                  <strong className="font-black text-slate-900">
                    RSI 14
                  </strong>
                  . This means the calculation is based on 14 periods. On a
                  daily chart that means 14 daily candles; on a 1-hour chart,
                  it means 14 one-hour candles.
                </p>


                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "Momentum",
                      text: "Measures the strength of recent price changes.",
                    },
                    {
                      no: "02",
                      title: "0–100 Scale",
                      text: "RSI always oscillates between 0 and 100.",
                    },
                    {
                      no: "03",
                      title: "RSI 14",
                      text: "The traditional and widely used default setting.",
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


              {/* QUICK REFERENCE */}

              <div className="border-t border-slate-200 bg-slate-50/60 p-4 md:p-6 lg:border-l lg:border-t-0">

                <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                  RSI Quick Guide
                </div>

                <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                  The Key RSI Levels to Know
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600">
                  These levels are not automatic buy or sell commands. They
                  help place momentum into context and should be interpreted
                  together with the price chart.
                </p>


                <div className="mt-4 space-y-2">

                  {[
                    {
                      level: "70+",
                      title: "Overbought",
                      text: "Strong bullish momentum — not an automatic sell.",
                    },
                    {
                      level: "50",
                      title: "Momentum Midline",
                      text: "Can help evaluate bullish or bearish momentum bias.",
                    },
                    {
                      level: "30-",
                      title: "Oversold",
                      text: "Strong bearish momentum — not an automatic buy.",
                    },
                    {
                      level: "14",
                      title: "Default Period",
                      text: "The traditional setting used for RSI calculations.",
                    },
                  ].map((item) => (
                    <div
                      key={item.level}
                      className="flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >

                      <span className="flex h-9 min-w-[44px] items-center justify-center rounded-[9px] bg-brand-50 px-2 text-[11px] font-black text-brand-600">
                        {item.level}
                      </span>

                      <div>

                        <div className="text-[12px] font-black text-slate-900">
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

            </div>

          </section>


          {/* =================================================
              01 — HOW RSI WORKS
          ================================================= */}

          <section
            id="how-rsi-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — RSI Basics
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How Does the RSI Indicator Work?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                RSI compares the magnitude of recent upward price changes with
                recent downward price changes over a selected lookback period.
                When average gains become stronger relative to average losses,
                RSI rises. When average losses dominate, RSI falls.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">

                <div>

                  <h3 className="text-[18px] font-black text-slate-950">
                    RSI Formula Explained Simply
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    You do not need to calculate RSI manually because modern
                    trading and charting platforms do it automatically.
                    Understanding the formula is still useful because it shows
                    what the indicator is actually measuring.
                  </p>


                  <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 text-center">

                    <div className="text-[11px] font-black uppercase tracking-wide text-brand-600">
                      Relative Strength
                    </div>

                    <div className="mt-2 text-[18px] font-black text-slate-950 md:text-[22px]">
                      RS = Average Gain ÷ Average Loss
                    </div>

                    <div className="my-3 h-px bg-brand-100" />

                    <div className="text-[18px] font-black text-slate-950 md:text-[22px]">
                      RSI = 100 − [100 ÷ (1 + RS)]
                    </div>

                  </div>

                </div>


                <div className="grid gap-2">

                  {[
                    {
                      no: "01",
                      title: "Choose the Period",
                      text: "RSI 14 uses the most recent 14 periods.",
                    },
                    {
                      no: "02",
                      title: "Measure Average Gains",
                      text: "The calculation measures recent upward changes.",
                    },
                    {
                      no: "03",
                      title: "Measure Average Losses",
                      text: "Recent downward changes are measured as well.",
                    },
                    {
                      no: "04",
                      title: "Convert to a 0–100 Scale",
                      text: "The result becomes the RSI line below the price chart.",
                    },
                  ].map((item) => (
                    <div
                      key={item.no}
                      className="flex items-start gap-3 rounded-[13px] border border-slate-200 bg-slate-50/60 px-3 py-2.5"
                    >

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {item.no}
                      </span>

                      <div>

                        <h3 className="text-[12px] font-black text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                          {item.text}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="RSI Does Not Compare One Asset With Another">
                  Despite the words “Relative Strength” in its name, the RSI
                  indicator is not a relative-strength comparison between two
                  different stocks, currencies or other assets. RSI compares
                  recent gains and losses within the price series being analyzed.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              02 — RSI 70 / 30
          ================================================= */}

          <section
            id="rsi-levels"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — RSI 70 and 30
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Do RSI 70 and RSI 30 Mean?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The traditional interpretation of RSI treats readings above{" "}
                <strong className="font-black text-slate-900">
                  70
                </strong>{" "}
                as{" "}
                <strong className="font-black text-slate-900">
                  overbought
                </strong>{" "}
                and readings below{" "}
                <strong className="font-black text-slate-900">
                  30
                </strong>{" "}
                as{" "}
                <strong className="font-black text-slate-900">
                  oversold
                </strong>
                . However, understanding what these conditions actually mean
                is far more important than simply memorizing the two numbers.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <RSIOverboughtOversoldChart />


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    RSI ABOVE 70
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    What Does Overbought Mean?
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    An overbought RSI reading means recent bullish momentum has
                    been relatively strong. Traders may begin watching for
                    slowing momentum or a correction, but RSI reaching 70 does
                    not mean price has to reverse immediately.
                  </p>

                </article>


                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    RSI BELOW 30
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    What Does Oversold Mean?
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    An oversold RSI reading reflects strong recent bearish
                    momentum. It may encourage traders to watch for a slowdown
                    or rebound, but RSI below 30 alone is not enough to make a
                    high-quality buy setup.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="The Biggest Mistake Traders Make With RSI">
                  Do not mechanically use “RSI above 70 = sell” and “RSI below
                  30 = buy.” During a strong uptrend, RSI can remain overbought
                  while price continues making higher highs. During a strong
                  downtrend, RSI can stay oversold while price continues
                  falling.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              03 — RSI 50 LEVEL
          ================================================= */}

          <section
            id="rsi-50"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — RSI 50 Level
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Use the RSI 50 Level
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Many beginners focus entirely on RSI 70 and 30 and overlook
                the{" "}
                <strong className="font-black text-slate-900">
                  RSI 50 level
                </strong>
                . Because 50 is the midpoint of the RSI range, traders can use
                it as an additional way to evaluate momentum bias, especially
                when it agrees with the direction and structure of price.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    RSI &gt; 50
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Bullish Momentum Bias
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    RSI holding above 50 can support a bullish momentum
                    interpretation, particularly when price is also making
                    higher highs and higher lows. During a pullback, a return
                    toward the 40–50 area may sometimes be more useful than
                    waiting for RSI to fall all the way to 30.
                  </p>

                </article>


                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    RSI &lt; 50
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Bearish Momentum Bias
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    RSI remaining below 50 can support a bearish momentum
                    interpretation when price is also trending lower. This is
                    why RSI should not be reduced to overbought and oversold
                    readings alone.
                  </p>

                </article>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  Example: Using RSI 50 in an Uptrend
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  Imagine price is in a clear uptrend and then pulls back.
                  RSI may fall from a high reading toward the 40–50 area.
                  If the price structure remains bullish and RSI starts
                  recovering, the setup may be more relevant than simply
                  waiting for an oversold reading below 30.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              04 — RSI IN TRENDS
          ================================================= */}

          <section
            id="rsi-trend"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — RSI and Trends
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How Does RSI Behave in Uptrends and Downtrends?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                One of the most useful concepts in RSI trading is that the
                indicator does not behave the same way in every market
                condition. During a strong uptrend RSI often operates within a
                higher range, while during a downtrend it may spend more time
                in a lower range. This is why RSI should always be interpreted
                in the context of the broader trend.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                {/* UPTREND */}

                <article className="rounded-[20px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                        UPTREND RSI RANGE
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        RSI in an Uptrend
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-emerald-600 text-[14px] font-black text-white">
                      ↑
                    </div>

                  </div>


                  <p className="mt-3 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    In bullish market conditions, RSI can spend more time in a
                    higher range. The 40–50 area may act as momentum support
                    in some uptrends rather than RSI falling to 30 on every
                    pullback.
                  </p>


                  <div className="mt-3 grid grid-cols-2 gap-2">

                    <div className="rounded-[12px] bg-white p-3 text-center">

                      <div className="text-[16px] font-black text-emerald-700">
                        40–50
                      </div>

                      <div className="mt-1 text-[10px] text-slate-500">
                        Potential momentum support
                      </div>

                    </div>

                    <div className="rounded-[12px] bg-white p-3 text-center">

                      <div className="text-[16px] font-black text-emerald-700">
                        70+
                      </div>

                      <div className="mt-1 text-[10px] text-slate-500">
                        Can occur repeatedly
                      </div>

                    </div>

                  </div>

                </article>


                {/* DOWNTREND */}

                <article className="rounded-[20px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                        DOWNTREND RSI RANGE
                      </div>

                      <h3 className="mt-1 text-[18px] font-black text-slate-950">
                        RSI in a Downtrend
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-rose-600 text-[14px] font-black text-white">
                      ↓
                    </div>

                  </div>


                  <p className="mt-3 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    During bearish conditions, RSI may remain within a lower
                    range. The 50–60 area can sometimes act as momentum
                    resistance before RSI and price resume their downward
                    movement.
                  </p>


                  <div className="mt-3 grid grid-cols-2 gap-2">

                    <div className="rounded-[12px] bg-white p-3 text-center">

                      <div className="text-[16px] font-black text-rose-700">
                        50–60
                      </div>

                      <div className="mt-1 text-[10px] text-slate-500">
                        Potential momentum resistance
                      </div>

                    </div>

                    <div className="rounded-[12px] bg-white p-3 text-center">

                      <div className="text-[16px] font-black text-rose-700">
                        30-
                      </div>

                      <div className="mt-1 text-[10px] text-slate-500">
                        Can occur repeatedly
                      </div>

                    </div>

                  </div>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="This Changes How You Should Use RSI">
                  If price is in a strong uptrend, selling every RSI reading
                  above 70 means repeatedly trading against momentum. A better
                  process is to identify trend and market structure first,
                  then use RSI to evaluate momentum and improve the timing of
                  a trading setup.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              05 — RSI DIVERGENCE
          ================================================= */}

          <section
            id="rsi-divergence"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — RSI Divergence
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Is RSI Divergence and How Do You Spot It?
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                <strong className="font-black text-slate-900">
                  RSI divergence
                </strong>{" "}
                occurs when the RSI indicator does not confirm a new high or
                low in price. In other words, price continues moving in one
                direction while momentum begins telling a different story.
                This can warn that the current move is losing strength, but
                divergence by itself does not guarantee a reversal.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <RSIDivergenceChart />


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* BULLISH */}

                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    BULLISH RSI DIVERGENCE
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Bullish Divergence
                  </h3>


                  <div className="mt-3 space-y-2">

                    <div className="rounded-[11px] bg-white px-3 py-2.5">

                      <div className="text-[10px] text-slate-500">
                        Price
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-rose-700">
                        Lower Low
                      </div>

                    </div>

                    <div className="rounded-[11px] bg-white px-3 py-2.5">

                      <div className="text-[10px] text-slate-500">
                        RSI
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-emerald-700">
                        Higher Low
                      </div>

                    </div>

                  </div>


                  <p className="mt-3 text-[13px] leading-7 text-slate-600">
                    Price has fallen to a new low, but RSI shows that bearish
                    momentum is weaker than it was at the previous low. A
                    trader may then watch for confirmation of a rebound or
                    bullish reversal rather than buying immediately.
                  </p>

                </article>


                {/* BEARISH */}

                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    BEARISH RSI DIVERGENCE
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Bearish Divergence
                  </h3>


                  <div className="mt-3 space-y-2">

                    <div className="rounded-[11px] bg-white px-3 py-2.5">

                      <div className="text-[10px] text-slate-500">
                        Price
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-emerald-700">
                        Higher High
                      </div>

                    </div>

                    <div className="rounded-[11px] bg-white px-3 py-2.5">

                      <div className="text-[10px] text-slate-500">
                        RSI
                      </div>

                      <div className="mt-0.5 text-[12px] font-black text-rose-700">
                        Lower High
                      </div>

                    </div>

                  </div>


                  <p className="mt-3 text-[13px] leading-7 text-slate-600">
                    Price makes a new high while RSI fails to make a
                    corresponding high. This may indicate weakening bullish
                    momentum and can encourage traders to monitor for a
                    correction or bearish reversal.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="RSI Divergence Is a Warning, Not a Standalone Entry Signal">
                  Divergence can remain visible while price continues trending.
                  Do not enter a trade simply because you see bullish or
                  bearish RSI divergence. Look for additional context such as
                  support or resistance, a market-structure shift, rejection
                  from a key level or another form of price confirmation.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              06 — RSI STRATEGY FRAMEWORK
          ================================================= */}

          <section
            id="rsi-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — RSI Trading Strategy
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Build an RSI Trading Strategy Step by Step
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A strong RSI trading strategy is not built around waiting for
                one number and then pressing buy or sell. A better process
                starts with{" "}
                <strong className="font-black text-slate-900">
                  market direction and price location
                </strong>
                , then uses RSI to evaluate momentum and help time the setup
                within a defined risk-management plan.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}

              <div className="hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  {
                    no: "01",
                    title: "Find the Trend",
                    text: "Uptrend, downtrend or range?",
                  },
                  {
                    no: "02",
                    title: "Find the Area",
                    text: "Support, resistance or pullback.",
                  },
                  {
                    no: "03",
                    title: "Read RSI",
                    text: "Evaluate momentum and RSI level.",
                  },
                  {
                    no: "04",
                    title: "Wait for Confirmation",
                    text: "Do not enter on RSI alone.",
                  },
                  {
                    no: "05",
                    title: "Define Invalidation",
                    text: "Where is the trade idea wrong?",
                  },
                  {
                    no: "06",
                    title: "Plan the Target",
                    text: "Know the objective before entry.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[12px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[10px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE */}

              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "Identify the Trend", "Start with price, not the indicator."],
                  ["02", "Find a Key Area", "Support, resistance or a pullback."],
                  ["03", "Read RSI", "Evaluate momentum and the current level."],
                  ["04", "Wait for Confirmation", "Do not enter because of RSI alone."],
                  ["05", "Set the Stop", "Use a logical invalidation level."],
                  ["06", "Set the Target", "Plan the objective before entry."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 5 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </span>

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


              <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    Trend-Following RSI Setup
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Example: Using RSI to Buy a Pullback in an Uptrend
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Suppose price is in a clear uptrend and pulls back toward
                    support. Instead of requiring RSI to reach 30, a trader
                    can monitor the 40–50 area and then look for RSI momentum
                    to turn higher while price confirms that buyers are
                    returning.
                  </p>


                  <div className="mt-3 grid gap-2 sm:grid-cols-3">

                    {[
                      ["1", "Trend", "Clear bullish structure"],
                      ["2", "RSI", "Pulls back toward 40–50"],
                      ["3", "Trigger", "Momentum turns up + price confirms"],
                    ].map(([no, title, text]) => (
                      <div
                        key={no}
                        className="rounded-[12px] bg-slate-50 px-3 py-2.5"
                      >

                        <div className="text-[9px] font-black text-brand-600">
                          {no}
                        </div>

                        <div className="mt-0.5 text-[11px] font-black text-slate-950">
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

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    Core Principle
                  </div>

                  <h3 className="mt-1.5 text-[17px] font-black text-slate-950">
                    Price First, RSI Second
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Start by asking what price is doing: what is the trend,
                    where are support and resistance, and what does market
                    structure look like? Then use RSI to evaluate whether
                    momentum supports the setup you see on the price chart.
                  </p>

                </aside>

              </div>

            </div>

          </section>

                    {/* =================================================
              07 — OVERBOUGHT / OVERSOLD STRATEGY
          ================================================= */}

          <section
            id="overbought-oversold-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — Overbought & Oversold Strategy
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Trade RSI Overbought and Oversold Conditions
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The classic RSI strategy looks for readings above{" "}
                <strong className="font-black text-slate-900">70</strong>{" "}
                or below{" "}
                <strong className="font-black text-slate-900">30</strong>.
                The mistake is treating these levels as automatic reversal
                signals. A stronger approach is to combine the RSI reading
                with trend, price location and confirmation.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    POTENTIAL LONG SETUP
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    RSI Oversold Strategy
                  </h3>

                  <div className="mt-3 space-y-2">

                    {[
                      ["01", "Price reaches a key area", "Look for support or another meaningful price zone."],
                      ["02", "RSI reaches an oversold area", "A reading below 30 shows strong recent bearish momentum."],
                      ["03", "Selling pressure weakens", "Watch whether RSI begins recovering instead of continuing lower."],
                      ["04", "Price confirms", "Look for rejection, structure change or another bullish trigger."],
                      ["05", "Define risk", "Place the stop where the bullish idea becomes invalid."],
                    ].map(([no, title, text]) => (
                      <div
                        key={no}
                        className="flex items-start gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-emerald-600 text-[8px] font-black text-white">
                          {no}
                        </span>

                        <div>
                          <div className="text-[11px] font-black text-slate-950">
                            {title}
                          </div>

                          <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                            {text}
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>

                </article>


                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    POTENTIAL SHORT SETUP
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    RSI Overbought Strategy
                  </h3>

                  <div className="mt-3 space-y-2">

                    {[
                      ["01", "Price reaches a key area", "Look for resistance or another important price zone."],
                      ["02", "RSI reaches an overbought area", "A reading above 70 reflects strong recent bullish momentum."],
                      ["03", "Buying momentum weakens", "Watch whether RSI begins turning down."],
                      ["04", "Price confirms", "Look for rejection, structure change or another bearish trigger."],
                      ["05", "Define risk", "Place the stop where the bearish idea becomes invalid."],
                    ].map(([no, title, text]) => (
                      <div
                        key={no}
                        className="flex items-start gap-3 rounded-[12px] bg-white px-3 py-2.5"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-rose-600 text-[8px] font-black text-white">
                          {no}
                        </span>

                        <div>
                          <div className="text-[11px] font-black text-slate-950">
                            {title}
                          </div>

                          <div className="mt-0.5 text-[10px] leading-5 text-slate-500">
                            {text}
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="Use RSI 70 and 30 Differently in Trending Markets">
                  In a range, overbought and oversold readings may be useful
                  for identifying potential reversals near the boundaries of
                  the range. In a strong trend, however, repeatedly trading
                  against RSI 70 or 30 can produce poor signals because
                  momentum may remain extreme for longer than expected.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              08 — RSI DIVERGENCE STRATEGY
          ================================================= */}

          <section
            id="rsi-divergence-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                08 — RSI Divergence Strategy
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Trade RSI Divergence
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                An RSI divergence strategy looks for disagreement between
                price and momentum. The objective is not to predict the exact
                top or bottom. Instead, divergence can alert a trader that the
                current move may be losing momentum and that a potential
                reversal deserves closer attention.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 lg:grid-cols-2">

                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    BULLISH DIVERGENCE WORKFLOW
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Bullish RSI Divergence Setup
                  </h3>

                  <div className="mt-3 space-y-2">

                    {[
                      ["1", "Price makes a lower low."],
                      ["2", "RSI makes a higher low."],
                      ["3", "The setup occurs near a meaningful support area."],
                      ["4", "Price shows evidence that sellers are losing control."],
                      ["5", "A bullish trigger appears before the trade is entered."],
                    ].map(([no, text]) => (
                      <div
                        key={no}
                        className="flex items-center gap-3 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-emerald-600 text-[9px] font-black text-white">
                          {no}
                        </span>

                        <span className="text-[11px] font-bold leading-5 text-slate-700">
                          {text}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    BEARISH DIVERGENCE WORKFLOW
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Bearish RSI Divergence Setup
                  </h3>

                  <div className="mt-3 space-y-2">

                    {[
                      ["1", "Price makes a higher high."],
                      ["2", "RSI makes a lower high."],
                      ["3", "The setup develops near resistance or another key area."],
                      ["4", "Price begins showing weaker buying pressure."],
                      ["5", "A bearish trigger appears before entry."],
                    ].map(([no, text]) => (
                      <div
                        key={no}
                        className="flex items-center gap-3 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-rose-600 text-[9px] font-black text-white">
                          {no}
                        </span>

                        <span className="text-[11px] font-bold leading-5 text-slate-700">
                          {text}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  Where Is RSI Divergence More Useful?
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  Divergence generally becomes more meaningful when it forms
                  at an important technical location rather than in the middle
                  of random price movement. Examples include established
                  support or resistance, previous swing highs and lows, or
                  after an extended directional move.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              09 — COMPLETE RSI EXAMPLE
          ================================================= */}

          <section
            id="rsi-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — RSI Trading Example
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                RSI Trading Example: Entry, Stop Loss and Target
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                This example shows how RSI can fit into a complete trading
                process. Instead of buying simply because RSI reaches an
                oversold level, the setup begins with an existing uptrend,
                waits for a pullback, evaluates momentum and then defines the
                entry, stop loss and target.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <RSITradeExampleChart />


              {/* DESKTOP STEPS */}

              <div className="mt-4 hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  ["01", "Trend", "Price is already in an uptrend."],
                  ["02", "Pullback", "Price retraces toward support."],
                  ["03", "RSI", "Momentum falls toward the 40–50 area."],
                  ["04", "Confirmation", "Price and RSI begin turning higher."],
                  ["05", "Risk", "Stop goes beyond the invalidation area."],
                  ["06", "Target", "Objective is defined before entry."],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {no}
                      </span>

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

              <div className="mt-4 overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "Confirm the Trend", "Price is making higher highs and higher lows."],
                  ["02", "Wait for the Pullback", "Do not chase the previous rally."],
                  ["03", "Read RSI", "Watch momentum around the 40–50 area."],
                  ["04", "Wait for Confirmation", "Price and momentum begin recovering."],
                  ["05", "Place the Stop", "Use a logical invalidation point."],
                  ["06", "Set the Target", "Plan the exit before entering."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 5 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </span>

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


              <div className="mt-4 grid gap-3 lg:grid-cols-2">

                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    TRADE LOGIC
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Why This Is Stronger Than Simply Buying RSI 30
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    The setup combines several pieces of information: the
                    broader trend is bullish, price pulls back toward a useful
                    area, RSI shows a temporary loss of momentum, and the
                    trader waits for momentum and price to recover before
                    entering.
                  </p>

                </div>


                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    PRACTICAL RULE
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    RSI Helps Time the Setup — It Does Not Create the Setup
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    The price chart should provide the trading idea. RSI can
                    then help evaluate momentum and timing. This distinction
                    prevents the indicator from becoming the only reason for
                    entering a trade.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              10 — BEST RSI SETTINGS
          ================================================= */}

          <section
            id="best-rsi-settings"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                10 — RSI Settings
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Are the Best RSI Settings for Trading?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The traditional RSI setting is{" "}
                <strong className="font-black text-slate-900">14 periods</strong>,
                and it remains a common starting point for traders. Changing
                the period changes how quickly RSI reacts to price movement:
                shorter settings react faster, while longer settings produce
                a smoother indicator.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                {[
                  {
                    title: "RSI 7–9",
                    label: "Faster",
                    text: "More sensitive to recent price changes and therefore more likely to produce frequent extreme readings and noise.",
                  },
                  {
                    title: "RSI 14",
                    label: "Traditional",
                    text: "The standard setting and a practical starting point for learning how RSI behaves across different market conditions.",
                  },
                  {
                    title: "RSI 21+",
                    label: "Smoother",
                    text: "Responds more slowly and may help filter some short-term fluctuations, but signals also develop later.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 md:p-5"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <h3 className="text-[18px] font-black text-slate-950">
                        {item.title}
                      </h3>

                      <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                        {item.label}
                      </span>

                    </div>

                    <p className="mt-3 text-[12px] leading-6 text-slate-600 md:text-[13px]">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4">

                <ImportantBox title="There Is No Universal Best RSI Setting">
                  The best RSI settings depend on the market, timeframe and
                  trading method. Changing RSI from 14 to a faster setting does
                  not automatically create a better strategy. Test the settings
                  with the exact rules you intend to trade rather than choosing
                  parameters only because they produced a good historical example.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              11 — BEST TIMEFRAME
          ================================================= */}

          <section
            id="rsi-timeframe"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                11 — RSI Timeframes
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Is the Best Timeframe for RSI?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                RSI can be applied to virtually any chart timeframe. There is
                no single best timeframe because the correct choice depends on
                whether you are scalping, day trading, swing trading or
                analyzing longer-term market moves.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    title: "5m–15m",
                    label: "Short Term",
                    text: "Faster signals, but more market noise and frequent RSI swings.",
                  },
                  {
                    title: "1 Hour",
                    label: "Intraday",
                    text: "Can provide more context than very short-term charts while remaining responsive.",
                  },
                  {
                    title: "4 Hour",
                    label: "Swing Trading",
                    text: "Commonly useful for studying broader momentum and multi-day setups.",
                  },
                  {
                    title: "Daily",
                    label: "Higher Timeframe",
                    text: "Provides slower momentum readings and broader market context.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div className="text-[19px] font-black text-brand-600">
                      {item.title}
                    </div>

                    <h3 className="mt-1 text-[13px] font-black text-slate-950">
                      {item.label}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  A Multi-Timeframe RSI Approach
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  One approach is to use a higher timeframe to understand
                  market direction and momentum, then move to a lower
                  timeframe to refine the setup. For example, a swing trader
                  might study trend and RSI on the daily or 4-hour chart and
                  use the 1-hour chart to examine the entry more closely.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              12 — RSI FOR FOREX
          ================================================= */}

          <section
            id="rsi-forex"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                12 — RSI Forex Strategy
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Use RSI in Forex Trading
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                RSI is widely used in forex technical analysis because it can
                be applied to currency pairs and multiple timeframes in the
                same way it is applied to other liquid markets. The important
                point is to treat RSI as a momentum tool rather than a
                standalone forex signal generator.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    title: "Trend",
                    text: "Determine whether the currency pair is trending or ranging.",
                  },
                  {
                    title: "Price Level",
                    text: "Identify support, resistance, previous highs and lows or a pullback area.",
                  },
                  {
                    title: "RSI Momentum",
                    text: "Evaluate 70/30, the 50 level, trend range or divergence in context.",
                  },
                  {
                    title: "Risk",
                    text: "Account for stop distance, position size and market volatility before entry.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <h3 className="text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4">

                <ImportantBox title="Forex RSI Signals Can Change Around High Volatility">
                  Currency markets can move sharply around major economic
                  releases and central-bank decisions. A technically attractive
                  RSI setup can change quickly when volatility expands, so
                  traders should consider market conditions and scheduled
                  events as part of their risk process.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              13 — RSI WITH OTHER TOOLS
          ================================================= */}

          <section
            id="rsi-confirmation"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                13 — RSI Confirmation
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Should You Combine With RSI?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                RSI becomes more useful when it supports a trading idea that
                already makes sense from the price chart. Rather than adding
                many indicators that measure similar information, traders can
                combine RSI with a small number of complementary tools.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    no: "01",
                    title: "Price Action",
                    text: "Read candles, rejection and how price behaves around important areas.",
                  },
                  {
                    no: "02",
                    title: "Market Structure",
                    text: "Use highs and lows to understand whether price is trending or changing direction.",
                  },
                  {
                    no: "03",
                    title: "Support & Resistance",
                    text: "RSI signals become more relevant when they occur at meaningful price levels.",
                  },
                  {
                    no: "04",
                    title: "Moving Averages",
                    text: "Can provide additional trend context without replacing price analysis.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {item.no}
                    </span>

                    <h3 className="mt-3 text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                  A SIMPLE ORDER OF ANALYSIS
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

                  {[
                    ["1", "Market Structure"],
                    ["2", "Key Price Level"],
                    ["3", "RSI Momentum"],
                    ["4", "Entry + Risk"],
                  ].map(([no, title]) => (
                    <div
                      key={no}
                      className="flex items-center gap-2 rounded-[11px] bg-white px-3 py-2.5"
                    >

                      <span className="text-[11px] font-black text-brand-600">
                        {no}
                      </span>

                      <span className="text-[11px] font-black text-slate-800">
                        {title}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              14 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="rsi-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                14 — Risk Management
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                RSI Risk Management and Stop-Loss Placement
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                No RSI strategy works on every trade. Even a strong-looking
                divergence, oversold reading or trend pullback can fail.
                Risk management therefore needs to be planned before the
                position is opened rather than after the market moves against
                the trader.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    title: "Risk Per Trade",
                    text: "Decide how much of the account can be lost if the setup fails.",
                  },
                  {
                    title: "Stop Loss",
                    text: "Place the stop beyond a logical price level that invalidates the trade idea.",
                  },
                  {
                    title: "Position Size",
                    text: "Adjust trade size according to the stop distance and planned account risk.",
                  },
                  {
                    title: "Target",
                    text: "Define a realistic exit objective before executing the trade.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <h3 className="text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <h3 className="text-[16px] font-black text-slate-950">
                    Where Should the Stop Loss Go in an RSI Trade?
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    The stop should normally be based on the price structure
                    that invalidates the setup, not on an RSI number. For
                    example, in a bullish pullback trade, the stop may be
                    placed below the swing low or support area that needs to
                    hold for the bullish idea to remain valid.
                  </p>

                </div>


                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    POSITION SIZING
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Calculate Risk Before Entry
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    A wider stop does not have to mean more account risk if
                    position size is reduced accordingly.
                  </p>

                  <Link
                    href="/en/tools/risk-calculator"
                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-[11px] font-black text-white transition hover:bg-brand-700"
                  >
                    Risk Calculator
                    <span>→</span>
                  </Link>

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="RSI Does Not Replace Risk Management">
                  A high-quality technical setup can still lose. The purpose
                  of risk management is not to make every trade profitable;
                  it is to prevent one failed RSI signal or a short series of
                  losses from causing disproportionate damage to the trading
                  account.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              15 — COMMON MISTAKES
          ================================================= */}

          <section
            id="rsi-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                15 — Common RSI Mistakes
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                6 Common RSI Trading Mistakes
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                RSI is simple to add to a chart, but using it well requires
                more than watching the indicator cross 70 or 30. Many weak
                RSI strategies come from treating the oscillator as a
                complete trading system instead of one part of the analysis.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">

                {[
                  {
                    no: "01",
                    title: "Selling Every RSI 70 Reading",
                    text: "A strong uptrend can remain overbought while price continues higher.",
                  },
                  {
                    no: "02",
                    title: "Buying Every RSI 30 Reading",
                    text: "Oversold conditions can persist during a strong bearish trend.",
                  },
                  {
                    no: "03",
                    title: "Ignoring the Trend",
                    text: "The same RSI reading can have a different meaning in an uptrend, downtrend or range.",
                  },
                  {
                    no: "04",
                    title: "Trading Divergence Too Early",
                    text: "Divergence warns about momentum but does not tell you exactly when price will reverse.",
                  },
                  {
                    no: "05",
                    title: "Constantly Changing Settings",
                    text: "Optimizing RSI until historical signals look perfect can create unrealistic expectations.",
                  },
                  {
                    no: "06",
                    title: "Entering Without a Risk Plan",
                    text: "An RSI signal is incomplete without a stop, position size and planned exit.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-slate-900 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-3 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              16 — ADVANTAGES / LIMITATIONS
          ================================================= */}

          <section
            id="rsi-advantages"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                16 — Pros & Cons
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                RSI Indicator Advantages and Limitations
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                RSI is popular because it is visually simple and can provide
                useful information about momentum. Its simplicity can also
                become a weakness when traders expect the indicator to predict
                every market reversal.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                {/* ADVANTAGES */}

                <article className="rounded-[20px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    ADVANTAGES
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    Why Traders Use RSI
                  </h3>

                  <div className="mt-3 space-y-2">

                    {[
                      "Simple 0–100 scale that is relatively easy to understand.",
                      "Useful for evaluating momentum strength.",
                      "Can highlight overbought and oversold conditions.",
                      "Can reveal bullish and bearish divergence.",
                      "Works across different markets and timeframes.",
                      "Can complement price action and market structure.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="mt-0.5 font-black text-emerald-600">
                          ✓
                        </span>

                        <span className="text-[11px] leading-5 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>


                {/* LIMITATIONS */}

                <article className="rounded-[20px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    LIMITATIONS
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    Where RSI Can Mislead Traders
                  </h3>

                  <div className="mt-3 space-y-2">

                    {[
                      "Overbought does not automatically mean price will fall.",
                      "Oversold does not automatically mean price will rise.",
                      "Signals can remain extreme during strong trends.",
                      "Divergence can appear long before a reversal occurs.",
                      "Settings that work well in one condition may perform differently in another.",
                      "RSI alone does not define entry, stop loss, target or position size.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="mt-0.5 font-black text-rose-600">
                          ×
                        </span>

                        <span className="text-[11px] leading-5 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>

              </div>

            </div>

          </section>


          {/* =================================================
              BEGINNER ROADMAP
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                Beginner Roadmap
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Learn RSI Trading as a Beginner
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Beginners do not need dozens of RSI strategies. A better
                learning process is to understand what the indicator measures,
                learn how it behaves in different market conditions and then
                practice one simple setup with clearly defined rules.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}

              <div className="hidden md:grid md:grid-cols-5 md:gap-2.5">

                {[
                  {
                    no: "01",
                    title: "Understand RSI",
                    text: "Learn the scale, calculation and RSI 14.",
                  },
                  {
                    no: "02",
                    title: "Learn 70 & 30",
                    text: "Understand that extremes are not automatic entries.",
                  },
                  {
                    no: "03",
                    title: "Study the Trend",
                    text: "Learn how RSI behaves differently across market conditions.",
                  },
                  {
                    no: "04",
                    title: "Learn Divergence",
                    text: "Compare price movement with momentum.",
                  },
                  {
                    no: "05",
                    title: "Test the Strategy",
                    text: "Practice with historical charts or a demo account.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[12px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[10px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE */}

              <div className="overflow-hidden rounded-[18px] border border-slate-200 md:hidden">

                {[
                  ["01", "Understand RSI", "Learn the range and basic setting."],
                  ["02", "Learn 70 and 30", "Overbought and oversold are not entry commands."],
                  ["03", "Understand the Trend", "RSI behaves differently in different market conditions."],
                  ["04", "Learn Divergence", "Compare price with momentum."],
                  ["05", "Test the Strategy", "Practice using a demo account."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-2.5 ${
                      index !== 4 ? "border-b border-slate-100" : ""
                    }`}
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {no}
                    </span>

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

                <h3 className="text-[17px] font-black text-slate-950">
                  A Simple RSI Trading Strategy for Beginners
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  A beginner can start with RSI 14 rather than constantly
                  changing indicator settings. First identify the trend and a
                  meaningful support or resistance area. Next, use RSI to
                  evaluate momentum and wait for confirmation from price.
                  Before entering, define the stop loss, target and position
                  size. This creates a structured RSI trading strategy instead
                  of relying on a single overbought or oversold signal.
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
                FAQ
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Frequently Asked Questions About RSI Trading
              </h2>

              <p className="mt-3 max-w-5xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Quick answers to common questions about RSI settings,
                overbought and oversold levels, divergence, timeframes and
                using the Relative Strength Index in a trading strategy.
              </p>

            </div>


            <div className="divide-y divide-slate-100">

              {faqItems.map((item, index) => (
                <div
                  key={item.q}
                  className="p-4 md:px-7 md:py-5"
                >

                  <div className="flex items-start gap-3">

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-50 text-[10px] font-black text-brand-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>

                      <h3 className="text-[15px] font-black leading-6 text-slate-950 md:text-[16px]">
                        {item.q}
                      </h3>

                      <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                        {item.a}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </section>


          {/* =================================================
              RELATED GUIDES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="p-4 md:p-7">

              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">

                <div>

                  <SectionLabel>
                    Continue Learning
                  </SectionLabel>

                  <h2 className="mt-3 text-[23px] font-black tracking-[-0.02em] text-slate-950 md:text-[30px]">
                    Related Trading Guides
                  </h2>

                  <p className="mt-2 max-w-3xl text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Build the price-analysis and risk-management skills that
                    make RSI signals easier to evaluate in context.
                  </p>

                </div>

              </div>


              <div className="mt-5 grid gap-3 md:grid-cols-3">

                <Link
                  href="/en/strategies/price-action"
                  className="group rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 transition hover:border-brand-200 hover:bg-brand-50/40"
                >

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    Trading Strategy
                  </div>

                  <h3 className="mt-2 text-[16px] font-black text-slate-950 group-hover:text-brand-700">
                    Price Action Trading
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-slate-500">
                    Learn to read market structure, price behavior and
                    confirmation without depending entirely on indicators.
                  </p>

                  <span className="mt-3 inline-flex text-[11px] font-black text-brand-600">
                    Read guide →
                  </span>

                </Link>


                <Link
                  href="/en/learn-trading/stop-loss"
                  className="group rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 transition hover:border-brand-200 hover:bg-brand-50/40"
                >

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    Risk Management
                  </div>

                  <h3 className="mt-2 text-[16px] font-black text-slate-950 group-hover:text-brand-700">
                    Stop Loss
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-slate-500">
                    Understand what a stop loss is and how traders use
                    invalidation levels to manage downside risk.
                  </p>

                  <span className="mt-3 inline-flex text-[11px] font-black text-brand-600">
                    Read guide →
                  </span>

                </Link>


                <Link
                  href="/en/learn-trading/take-profit"
                  className="group rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 transition hover:border-brand-200 hover:bg-brand-50/40"
                >

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    Trade Planning
                  </div>

                  <h3 className="mt-2 text-[16px] font-black text-slate-950 group-hover:text-brand-700">
                    Take Profit
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-slate-500">
                    Learn how profit targets fit into a structured trade plan
                    alongside entry and stop-loss placement.
                  </p>

                  <span className="mt-3 inline-flex text-[11px] font-black text-brand-600">
                    Read guide →
                  </span>

                </Link>

              </div>

            </div>

          </section>


          {/* =================================================
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-brand-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#eef5fd_100%)] shadow-sm">

            <div className="grid gap-5 p-5 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>

                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
                  Broker Alarab Trading Tools
                </span>

                <h2 className="mt-3 max-w-4xl text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950 md:text-[32px]">
                  Turn Your RSI Setup Into a Complete Trading Plan
                </h2>

                <p className="mt-3 max-w-4xl text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  Use our trading calculators to estimate risk, position size
                  and other trade parameters, or explore our broker guides
                  when comparing trading platforms and account conditions.
                </p>

              </div>


              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">

                <Link
                  href="/en/tools"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-[12px] font-black text-white transition hover:bg-brand-700"
                >
                  Trading Calculators
                </Link>

                <Link
                  href="/en/best-brokers"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-[12px] font-black text-slate-800 transition hover:border-brand-200 hover:text-brand-700"
                >
                  Compare Brokers
                </Link>

              </div>

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