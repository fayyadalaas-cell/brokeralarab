import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   TREND FOLLOWING STRATEGY — ENGLISH
   Broker Alarab
   Path: /en/strategies/trend-following
========================================================= */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/trend-following`;

const PAGE_TITLE =
  "Trend Following Strategy: How to Identify and Trade Trends";

const PAGE_DESCRIPTION =
  "Learn trend following step by step: identify uptrends and downtrends, use higher highs and lower lows, moving averages, ADX, pullbacks, breakouts, stop losses and trend exits.";


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
      ar: `${BASE_URL}/strategies/trend-following`,
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
    q: "What is a trend following strategy?",
    a: "A trend following strategy is a trading approach designed to participate in an existing directional market move instead of trying to predict the exact top or bottom. Traders typically use price structure, moving averages, breakouts, pullbacks or trend-strength tools to identify and manage opportunities in the direction of the prevailing trend.",
  },
  {
    q: "How do you identify an uptrend?",
    a: "One of the clearest ways to identify an uptrend is through market structure. An uptrend normally produces higher highs and higher lows. A rising moving average and price holding above important averages can provide additional confirmation, but price structure should remain the primary reference.",
  },
  {
    q: "How do you identify a downtrend?",
    a: "A downtrend typically produces lower highs and lower lows. Price may also remain below declining moving averages. Traders should watch whether bearish market structure continues rather than relying on one indicator or one moving-average crossover.",
  },
  {
    q: "What is the best moving average for trend following?",
    a: "There is no single best moving average for every market or timeframe. The 20-period and 50-period averages are commonly used for shorter and medium-term trend analysis, while the 200-period moving average is often used as a broader long-term reference. The moving average should support a defined trading process rather than act as an automatic signal.",
  },
  {
    q: "What is the best indicator for trend strength?",
    a: "ADX, or the Average Directional Index, is one of the most widely used indicators for measuring trend strength. A rising ADX can indicate increasing directional strength, while a low or falling ADX may indicate weaker trending conditions. ADX measures strength rather than bullish or bearish direction.",
  },
  {
    q: "What is a pullback entry in trend trading?",
    a: "A pullback entry means waiting for price to temporarily retrace against the main trend and then looking for evidence that the dominant trend is resuming. In an uptrend, for example, a trader may wait for price to retrace toward support, a previous swing area or a moving average before looking for bullish confirmation.",
  },
  {
    q: "Is trend following suitable for forex trading?",
    a: "Trend following can be applied to forex, stocks, indices, commodities, gold and other markets. Its effectiveness depends less on the market name and more on whether a meaningful directional move is present, whether the entry is structured, and whether risk is controlled.",
  },
  {
    q: "What is the biggest weakness of trend following?",
    a: "Trend following often struggles during sideways or choppy markets. Traders can experience several small losses, false breakouts or failed continuation attempts before a sustained trend develops. Recognizing market regime and controlling risk are therefore important parts of a trend following system.",
  },
];


/* =========================================================
   HERO CHART — DESKTOP
========================================================= */

function TrendHeroDesktopChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">

        <div className="text-left">

          <div className="text-[13px] font-black text-slate-950">
            How Trend Following Works
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            Trend → Pullback → Confirmation → Continuation
          </div>

        </div>

        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600">
          TREND
        </span>

      </div>


      <svg
        viewBox="0 0 720 390"
        className="block w-full"
        role="img"
        aria-label="Trend following chart showing higher highs, higher lows and a pullback within an uptrend"
      >

        <rect width="720" height="390" fill="#ffffff" />


        {/* GRID */}

        {[65, 125, 185, 245, 305].map((y) => (
          <line
            key={`hero-trend-${y}`}
            x1="45"
            y1={y}
            x2="675"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* PRICE */}

        <polyline
          points="
            55,300
            115,250
            165,270
            230,205
            285,230
            350,165
            405,195
            470,125
            525,155
            590,92
            665,112
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* TREND LINE */}

        <line
          x1="65"
          y1="318"
          x2="610"
          y2="98"
          stroke="#2563eb"
          strokeWidth="3"
          strokeDasharray="8 6"
        />


        {/* SWINGS */}

        <circle cx="115" cy="250" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="230" cy="205" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="350" cy="165" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="470" cy="125" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="590" cy="92" r="6" fill="#fff" stroke="#16a34a" strokeWidth="3" />

        <circle cx="165" cy="270" r="6" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="285" cy="230" r="6" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="405" cy="195" r="6" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="525" cy="155" r="6" fill="#fff" stroke="#2563eb" strokeWidth="3" />


        {/* LABELS */}

        <text
          x="115"
          y="232"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          HH
        </text>

        <text
          x="165"
          y="292"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          HL
        </text>

        <text
          x="350"
          y="147"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#15803d"
        >
          Higher High
        </text>

        <text
          x="405"
          y="217"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Higher Low
        </text>


        {/* PULLBACK BOX */}

        <rect
          x="390"
          y="180"
          width="145"
          height="55"
          rx="12"
          fill="#eff6ff"
          stroke="#bfdbfe"
        />

        <text
          x="462"
          y="202"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Pullback
        </text>

        <text
          x="462"
          y="219"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="700"
          fill="#64748b"
        >
          Wait — don't chase
        </text>


        {/* SUMMARY */}

        <rect
          x="165"
          y="343"
          width="390"
          height="28"
          rx="14"
          fill="#0f172a"
        />

        <text
          x="360"
          y="361"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#ffffff"
        >
          Follow the established move instead of predicting the top or bottom
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   HERO CHART — MOBILE
   NO ZOOM
========================================================= */

function TrendHeroMobileChart() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">

        <span className="text-[11px] font-black text-slate-800">
          TREND FOLLOWING
        </span>

        <span className="rounded-full bg-brand-50 px-2 py-1 text-[8px] font-black text-brand-600">
          HH + HL
        </span>

      </div>


      <svg
        viewBox="0 0 360 245"
        className="block w-full"
        role="img"
        aria-label="Simple trend following chart showing higher highs and higher lows"
      >

        <rect width="360" height="245" fill="#ffffff" />


        {[55, 105, 155, 205].map((y) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2="340"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        <polyline
          points="
            25,200
            75,165
            115,180
            165,135
            205,155
            255,103
            295,125
            338,72
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <line
          x1="30"
          y1="210"
          x2="320"
          y2="85"
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="6 5"
        />


        <circle cx="165" cy="135" r="5" fill="#fff" stroke="#16a34a" strokeWidth="3" />

        <text
          x="165"
          y="121"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#15803d"
        >
          HH
        </text>


        <circle cx="205" cy="155" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />

        <text
          x="205"
          y="173"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#1d4ed8"
        >
          HL
        </text>


        <rect
          x="220"
          y="183"
          width="110"
          height="30"
          rx="15"
          fill="#eff6ff"
        />

        <text
          x="275"
          y="202"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Follow the trend
        </text>

      </svg>

    </div>
  );
}


/* =========================================================
   CHART 1 — MARKET STRUCTURE
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function TrendStructureChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
          How to Identify a Trend From Price Structure
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500 md:text-[12px]">
          Higher Highs & Higher Lows vs Lower Highs & Lower Lows
        </p>

      </div>


      <svg
        viewBox="0 0 900 430"
        className="block w-full"
        role="img"
        aria-label="Chart comparing bullish higher highs and higher lows with bearish lower highs and lower lows"
      >

        <rect width="900" height="430" fill="#ffffff" />


        {/* DIVIDER */}

        <line
          x1="450"
          y1="35"
          x2="450"
          y2="395"
          stroke="#e2e8f0"
          strokeWidth="2"
        />


        {/* UPTREND */}

        <text
          x="225"
          y="45"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#15803d"
        >
          UPTREND
        </text>


        {[90, 155, 220, 285, 350].map((y) => (
          <line
            key={`up-${y}`}
            x1="35"
            y1={y}
            x2="420"
            y2={y}
            stroke="#f1f5f9"
          />
        ))}


        <polyline
          points="
            45,335
            105,285
            155,310
            215,240
            270,270
            330,195
            385,220
            420,165
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle cx="105" cy="285" r="7" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="215" cy="240" r="7" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <circle cx="330" cy="195" r="7" fill="#fff" stroke="#16a34a" strokeWidth="3" />

        <circle cx="155" cy="310" r="7" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="270" cy="270" r="7" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="385" cy="220" r="7" fill="#fff" stroke="#2563eb" strokeWidth="3" />


        <text
          x="215"
          y="221"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          Higher High
        </text>

        <text
          x="270"
          y="294"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          Higher Low
        </text>


        <rect
          x="105"
          y="365"
          width="240"
          height="34"
          rx="17"
          fill="#ecfdf5"
          stroke="#bbf7d0"
        />

        <text
          x="225"
          y="387"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#15803d"
        >
          HH + HL = Bullish Structure
        </text>


        {/* DOWNTREND */}

        <text
          x="675"
          y="45"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#be123c"
        >
          DOWNTREND
        </text>


        {[90, 155, 220, 285, 350].map((y) => (
          <line
            key={`down-${y}`}
            x1="480"
            y1={y}
            x2="865"
            y2={y}
            stroke="#f1f5f9"
          />
        ))}


        <polyline
          points="
            490,100
            550,145
            600,120
            660,190
            715,160
            775,235
            825,205
            860,275
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle cx="550" cy="145" r="7" fill="#fff" stroke="#e11d48" strokeWidth="3" />
        <circle cx="660" cy="190" r="7" fill="#fff" stroke="#e11d48" strokeWidth="3" />
        <circle cx="775" cy="235" r="7" fill="#fff" stroke="#e11d48" strokeWidth="3" />

        <circle cx="600" cy="120" r="7" fill="#fff" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="715" cy="160" r="7" fill="#fff" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="825" cy="205" r="7" fill="#fff" stroke="#f59e0b" strokeWidth="3" />


        <text
          x="715"
          y="143"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#b45309"
        >
          Lower High
        </text>

        <text
          x="775"
          y="259"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#be123c"
        >
          Lower Low
        </text>


        <rect
          x="555"
          y="365"
          width="240"
          height="34"
          rx="17"
          fill="#fff1f2"
          stroke="#fecdd3"
        />

        <text
          x="675"
          y="387"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#be123c"
        >
          LH + LL = Bearish Structure
        </text>

      </svg>

    </div>
  );


  if (fullscreen) {
    return chart;
  }


  return (
    <>
      <div className="hidden md:block">
        {chart}
      </div>


      <a
        href="#trend-structure-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="Enlarge market structure chart"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            Enlarge chart
            <span>↗</span>
          </span>

        </div>
      </a>


      <div
        id="trend-structure-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#identify-trend"
          className="absolute inset-0"
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                Trend Market Structure
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Higher highs, higher lows, lower highs and lower lows
              </div>
            </div>


            <a
              href="#identify-trend"
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

            <div className="min-w-[960px] p-3">
              <TrendStructureChart fullscreen />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   CHART 2 — PULLBACK ENTRY
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function PullbackEntryChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
          Pullback Entry in an Established Uptrend
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500 md:text-[12px]">
          Trend → Pullback → Support → Confirmation → Continuation
        </p>

      </div>


      <svg
        viewBox="0 0 900 450"
        className="block w-full"
        role="img"
        aria-label="Trend following pullback entry showing support, moving average, entry and stop loss"
      >

        <rect width="900" height="450" fill="#ffffff" />


        {[75, 145, 215, 285, 355].map((y) => (
          <line
            key={y}
            x1="50"
            y1={y}
            x2="850"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* MOVING AVERAGE */}

        <path
          d="
            M60 325
            C180 300, 230 270, 320 245
            C400 220, 470 195, 550 170
            C640 145, 720 120, 840 95
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
        />


        <text
          x="805"
          y="80"
          fontSize="11"
          fontWeight="900"
          fill="#1d4ed8"
        >
          EMA
        </text>


        {/* PRICE */}

        <polyline
          points="
            60,330
            125,285
            185,305
            250,240
            315,260
            380,195
            440,215
            505,250
            565,270
            625,225
            690,165
            750,120
            825,95
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* PULLBACK ZONE */}

        <rect
          x="435"
          y="220"
          width="160"
          height="75"
          rx="12"
          fill="#fff7ed"
          stroke="#fed7aa"
        />

        <text
          x="515"
          y="245"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#c2410c"
        >
          Pullback
        </text>

        <text
          x="515"
          y="264"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#9a3412"
        >
          Temporary move against trend
        </text>


        {/* SUPPORT */}

        <line
          x1="445"
          y1="285"
          x2="620"
          y2="285"
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="8 6"
        />

        <text
          x="535"
          y="308"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Support Area
        </text>


        {/* ENTRY */}

        <circle
          cx="625"
          cy="225"
          r="9"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <line
          x1="625"
          y1="225"
          x2="625"
          y2="170"
          stroke="#2563eb"
          strokeWidth="2"
        />

        <rect
          x="576"
          y="136"
          width="98"
          height="31"
          rx="15"
          fill="#2563eb"
        />

        <text
          x="625"
          y="156"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          ENTRY
        </text>


        {/* STOP */}

        <line
          x1="520"
          y1="320"
          x2="650"
          y2="320"
          stroke="#e11d48"
          strokeWidth="3"
          strokeDasharray="7 6"
        />

        <text
          x="585"
          y="340"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#be123c"
        >
          Stop below invalidation
        </text>


        {/* CONTINUATION */}

        <rect
          x="690"
          y="210"
          width="150"
          height="34"
          rx="17"
          fill="#ecfdf5"
          stroke="#bbf7d0"
        />

        <text
          x="765"
          y="232"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Trend Continuation
        </text>


        {/* RULE */}

        <rect
          x="185"
          y="385"
          width="530"
          height="38"
          rx="19"
          fill="#0f172a"
        />

        <text
          x="450"
          y="409"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          Do not chase price — wait for a pullback and confirmation
        </text>

      </svg>

    </div>
  );


  if (fullscreen) {
    return chart;
  }


  return (
    <>
      <div className="hidden md:block">
        {chart}
      </div>


      <a
        href="#pullback-entry-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="Enlarge pullback entry chart"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            Enlarge example
            <span>↗</span>
          </span>
        </div>
      </a>


      <div
        id="pullback-entry-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#pullback"
          className="absolute inset-0"
          aria-label="Close example"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                Pullback Entry
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Trend continuation setup
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


          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">
            <span className="text-[16px]">↔</span>
            <span>Swipe left or right to explore the full chart</span>
          </div>


          <div className="overflow-x-auto overflow-y-auto bg-white">
            <div className="min-w-[960px] p-3">
              <PullbackEntryChart fullscreen />
            </div>
          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   CHART 3 — BREAKOUT + ADX
   MOBILE CLICK → FULLSCREEN → HORIZONTAL SWIPE
========================================================= */

function BreakoutADXChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {

  const chart = (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

        <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
          Breakout and Rising ADX Trend Example
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500 md:text-[12px]">
          Range → Breakout → Rising ADX → Trend Expansion
        </p>

      </div>


      <svg
        viewBox="0 0 900 500"
        className="block w-full"
        role="img"
        aria-label="Chart showing a range breakout followed by rising ADX and stronger directional movement"
      >

        <rect width="900" height="500" fill="#ffffff" />


        {/* PRICE AREA */}

        {[60, 125, 190, 255].map((y) => (
          <line
            key={y}
            x1="50"
            y1={y}
            x2="850"
            y2={y}
            stroke="#eef2f7"
          />
        ))}


        {/* RANGE */}

        <rect
          x="70"
          y="130"
          width="430"
          height="130"
          rx="10"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeDasharray="8 6"
        />


        <text
          x="285"
          y="155"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#64748b"
        >
          SIDEWAYS RANGE
        </text>


        <line
          x1="70"
          y1="130"
          x2="515"
          y2="130"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        <text
          x="110"
          y="117"
          fontSize="10"
          fontWeight="900"
          fill="#b45309"
        >
          Resistance
        </text>


        <polyline
          points="
            80,220
            130,170
            180,215
            230,165
            280,225
            330,175
            380,218
            430,162
            485,185
            530,115
            590,95
            650,70
            720,52
            800,38
            845,55
          "
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        {/* BREAKOUT */}

        <circle
          cx="530"
          cy="115"
          r="9"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <rect
          x="500"
          y="68"
          width="105"
          height="30"
          rx="15"
          fill="#2563eb"
        />

        <text
          x="552"
          y="87"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          BREAKOUT
        </text>


        {/* DIVIDER */}

        <line
          x1="45"
          y1="300"
          x2="855"
          y2="300"
          stroke="#cbd5e1"
        />


        {/* ADX */}

        <text
          x="55"
          y="326"
          fontSize="11"
          fontWeight="900"
          fill="#2563eb"
        >
          ADX
        </text>


        <line
          x1="55"
          y1="410"
          x2="850"
          y2="410"
          stroke="#94a3b8"
          strokeDasharray="7 5"
        />

        <text
          x="65"
          y="402"
          fontSize="9"
          fontWeight="900"
          fill="#64748b"
        >
          20
        </text>


        <line
          x1="55"
          y1="375"
          x2="850"
          y2="375"
          stroke="#f59e0b"
          strokeDasharray="7 5"
        />

        <text
          x="65"
          y="367"
          fontSize="9"
          fontWeight="900"
          fill="#b45309"
        >
          25
        </text>


        <polyline
          points="
            75,425
            140,420
            205,428
            270,418
            335,425
            400,415
            470,410
            530,390
            590,360
            650,345
            720,330
            800,320
            845,325
          "
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />


        <circle
          cx="590"
          cy="360"
          r="7"
          fill="#ffffff"
          stroke="#16a34a"
          strokeWidth="3"
        />

        <text
          x="650"
          y="350"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          ADX Rising
        </text>


        <rect
          x="560"
          y="440"
          width="265"
          height="32"
          rx="16"
          fill="#ecfdf5"
          stroke="#bbf7d0"
        />

        <text
          x="692"
          y="461"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#15803d"
        >
          Stronger directional conditions
        </text>

      </svg>

    </div>
  );


  if (fullscreen) {
    return chart;
  }


  return (
    <>
      <div className="hidden md:block">
        {chart}
      </div>


      <a
        href="#breakout-adx-fullscreen"
        className="block cursor-zoom-in md:hidden"
        aria-label="Enlarge breakout and ADX chart"
      >
        {chart}

        <div className="-mt-[1px] flex items-center justify-center rounded-b-[20px] border border-t-0 border-slate-200 bg-white px-3 py-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
            Enlarge chart
            <span>↗</span>
          </span>
        </div>
      </a>


      <div
        id="breakout-adx-fullscreen"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex md:hidden"
      >

        <a
          href="#breakout"
          className="absolute inset-0"
          aria-label="Close chart"
        />


        <div className="relative z-10 flex max-h-[94vh] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                Breakout and Trend Strength
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Breakout + ADX
              </div>
            </div>

            <a
              href="#breakout"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="Close"
            >
              ×
            </a>

          </div>


          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700">
            <span className="text-[16px]">↔</span>
            <span>Swipe left or right to explore the full chart</span>
          </div>


          <div className="overflow-x-auto overflow-y-auto bg-white">
            <div className="min-w-[960px] p-3">
              <BreakoutADXChart fullscreen />
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

export default function TrendFollowingStrategyPage() {

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
        name: "Trend Following",
      },
      {
        "@type": "Thing",
        name: "Trend Following Strategy",
      },
      {
        "@type": "Thing",
        name: "Trend Trading Strategy",
      },
      {
        "@type": "Thing",
        name: "Market Structure",
      },
      {
        "@type": "Thing",
        name: "Moving Average",
      },
      {
        "@type": "Thing",
        name: "ADX Indicator",
      },
      {
        "@type": "Thing",
        name: "Pullback Trading",
      },
      {
        "@type": "Thing",
        name: "Breakout Trading",
      },
      {
        "@type": "Thing",
        name: "Technical Analysis",
      },
    ],

    keywords: [
      "trend following strategy",
      "trend trading strategy",
      "trend following",
      "trend trading",
      "how to identify a trend",
      "how to trade with the trend",
      "how to identify an uptrend",
      "how to identify a downtrend",
      "higher highs higher lows",
      "lower highs lower lows",
      "market structure trading",
      "trend following strategy for beginners",
      "forex trend following strategy",
      "forex trend trading strategy",
      "moving average trend strategy",
      "20 EMA trend strategy",
      "50 EMA trend strategy",
      "200 moving average trend",
      "ADX indicator",
      "ADX trend strength",
      "pullback trading strategy",
      "trend pullback strategy",
      "breakout trading strategy",
      "trend breakout strategy",
      "trend continuation strategy",
      "trend following entry",
      "trend following stop loss",
      "trend following exit strategy",
      "technical analysis trend",
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
        name: "Trend Following Strategy",
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
            Trend Following Strategy
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
                  Trend Following
                </span>

              </div>


              <h1 className="mt-4 max-w-[900px] text-[34px] font-black leading-[1.22] tracking-[-0.025em] text-slate-950 lg:text-[40px] xl:text-[44px]">
                Trend Following Strategy: How to Identify and Trade Trends
              </h1>


              <p className="mt-4 max-w-[900px] text-[15px] leading-8 text-slate-600 lg:text-[16px] lg:leading-8">
                Learn how a{" "}
                <strong className="font-black text-slate-900">
                  trend following strategy
                </strong>{" "}
                works from start to finish: identify uptrends and downtrends,
                read higher highs and lower lows, use moving averages and ADX,
                enter with pullbacks or breakouts, control risk and stay with
                a trend while it remains valid.
              </p>


              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
                  Higher Highs / Higher Lows
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700">
                  Lower Highs / Lower Lows
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700">
                  Moving Averages
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                  Pullbacks
                </span>

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-black text-violet-700">
                  ADX
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
                  Beginner to Advanced Guide
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  18–22 min read
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
                    Trend Following Model
                  </span>

                </div>


                <div className="p-4">
                  <TrendHeroDesktopChart />
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
                  Trend Following
                </span>

              </div>


              <h1 className="mt-3 text-[26px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950">
                Trend Following Strategy: How to Identify and Trade Trends
              </h1>


              <p className="mt-3 text-[14px] leading-[1.9] text-slate-600">
                Learn market structure, moving averages,{" "}
                <strong className="font-black text-slate-900">
                  ADX, pullback entries and breakout trading
                </strong>{" "}
                without blindly chasing price after a strong move.
              </p>


              <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-medium text-slate-500">

                <span>
                  📅 Aug 31, 2026
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span>
                  ⏱ 18–22 min
                </span>

              </div>

            </div>


            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#f8fbff_0%,#eef5fd_60%,#ffffff_100%)] px-3 py-2.5">

              <TrendHeroMobileChart />

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

            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

              <div className="p-4 md:p-7">

                <SectionLabel>
                  Start Here
                </SectionLabel>


                <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                  What Is a Trend Following Strategy?
                </h2>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  <strong className="font-black text-slate-900">
                    Trend following
                  </strong>{" "}
                  is a trading approach built around participating in a
                  directional market move after evidence of a trend already
                  exists. Instead of trying to predict the exact market top or
                  bottom, a trend follower asks a simpler question:
                  <strong className="font-black text-slate-900">
                    {" "}which side currently controls the market?
                  </strong>
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  If price is consistently producing{" "}
                  <strong className="font-black text-slate-900">
                    higher highs and higher lows
                  </strong>
                  , the market is showing bullish structure and the trader can
                  focus on opportunities to participate in the upward trend.
                  If price forms lower highs and lower lows, the same logic can
                  be applied to bearish trend setups.
                </p>


                <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                  Trend trading is not simply buying because price is rising.
                  A complete strategy still needs an{" "}
                  <strong className="font-black text-slate-900">
                    entry method, invalidation level, position size and exit rule
                  </strong>
                  . The difficult part is often distinguishing a sustainable
                  trend from temporary momentum or a choppy sideways market.
                </p>


                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">

                  {[
                    {
                      no: "01",
                      title: "Identify the Trend",
                      text: "Start with price structure before indicators.",
                    },
                    {
                      no: "02",
                      title: "Wait for the Setup",
                      text: "Use a structured pullback or breakout.",
                    },
                    {
                      no: "03",
                      title: "Manage the Risk",
                      text: "Define invalidation and exit before entry.",
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


              {/* QUICK GUIDE */}

              <div className="border-t border-slate-200 bg-slate-50/60 p-4 md:p-6 lg:border-l lg:border-t-0">

                <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                  TREND FOLLOWING QUICK GUIDE
                </div>

                <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                  How to Read a Market Trend
                </h3>


                <div className="mt-4 space-y-2">

                  {[
                    {
                      label: "HH + HL",
                      title: "Uptrend",
                      text: "Higher highs and higher lows.",
                    },
                    {
                      label: "LH + LL",
                      title: "Downtrend",
                      text: "Lower highs and lower lows.",
                    },
                    {
                      label: "ADX ↑",
                      title: "Trend Strength Rising",
                      text: "Use ADX as a strength filter, not direction.",
                    },
                    {
                      label: "Range",
                      title: "Sideways Market",
                      text: "A more difficult environment for trend systems.",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >

                      <span className="flex h-9 min-w-[58px] items-center justify-center rounded-[9px] bg-brand-50 px-2 text-[10px] font-black text-brand-600">
                        {item.label}
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


                <div className="mt-4 rounded-[14px] border border-amber-100 bg-amber-50/60 p-3.5">

                  <div className="text-[11px] font-black text-amber-800">
                    The Core Idea
                  </div>

                  <p className="mt-1.5 text-[11px] leading-6 text-slate-600">
                    Trend following is not about buying the highest point in an
                    uptrend or selling the lowest point in a downtrend. The
                    objective is to find a controlled entry after the market
                    has already demonstrated directional structure.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              01 — HOW TO IDENTIFY A TREND
          ================================================= */}

          <section
            id="identify-trend"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                01 — Identify the Trend
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Identify an Uptrend and Downtrend
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Before adding indicators, begin with the price chart itself.
                One of the clearest ways to identify a trend is to study{" "}
                <strong className="font-black text-slate-900">
                  market structure
                </strong>
                : the sequence of swing highs and swing lows created as buyers
                and sellers compete for control.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <TrendStructureChart />


              <div className="mt-4 grid gap-3 md:grid-cols-3">

                <article className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    HIGHER HIGHS + HIGHER LOWS
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Uptrend Structure
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    An uptrend develops when buyers repeatedly push price to a
                    higher high and subsequent pullbacks hold above important
                    previous lows. As long as the sequence of higher highs and
                    higher lows remains intact, bullish market structure is
                    still present.
                  </p>

                </article>


                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    LOWER HIGHS + LOWER LOWS
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Downtrend Structure
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    A downtrend develops when rallies fail below previous
                    highs and sellers continue pushing price to new lower
                    lows. The sequence of lower highs and lower lows reflects
                    persistent bearish control.
                  </p>

                </article>


                <article className="rounded-[18px] border border-amber-100 bg-amber-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    NO CLEAR STRUCTURE
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Sideways Market
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    If price repeatedly rotates between similar highs and lows
                    without a clear sequence of higher or lower swings, the
                    market may be ranging rather than trending. This is usually
                    a more difficult environment for trend-following entries.
                  </p>

                </article>

              </div>


              <div className="mt-4">

                <ImportantBox title="Let Price Structure Define the Trend">
                  Moving averages and indicators can make a trend easier to
                  visualize, but they are ultimately derived from price. If
                  market structure begins changing, that information can be
                  more important than price temporarily remaining above or
                  below a moving average.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              02 — TREND VS RANGE
          ================================================= */}

          <section
            id="trend-vs-range"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                02 — Trend vs Range
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Tell a Trending Market From a Sideways Market
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A major reason trend-following systems produce poor signals is
                that traders try to apply them when the market is not trending.
                In a range, price repeatedly moves between support and
                resistance, crosses moving averages in both directions and can
                generate multiple false breakouts before a real trend develops.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 md:grid-cols-2">

                <article className="rounded-[20px] border border-brand-100 bg-brand-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    TRENDING MARKET
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    Signs of a Trending Market
                  </h3>


                  <div className="mt-3 space-y-2">

                    {[
                      "A clear sequence of directional swing highs and lows.",
                      "Breakouts receive follow-through instead of reversing immediately.",
                      "Pullbacks remain temporary and the dominant move resumes.",
                      "Moving averages develop a visible upward or downward slope.",
                      "Trend-strength indicators such as ADX may begin rising.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="mt-0.5 font-black text-brand-600">
                          ✓
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>


                <article className="rounded-[20px] border border-amber-100 bg-amber-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    SIDEWAYS MARKET
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    Signs of a Range or Choppy Market
                  </h3>


                  <div className="mt-3 space-y-2">

                    {[
                      "Price repeatedly turns near similar highs and lows.",
                      "Breakouts frequently fail and return inside the range.",
                      "Price crosses moving averages back and forth.",
                      "There is no clean HH/HL or LH/LL sequence.",
                      "ADX may remain low or fall as directional strength fades.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="mt-0.5 font-black text-amber-600">
                          ×
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[16px] font-black text-slate-950">
                  Why Market Regime Matters
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  A trend-following strategy needs directional movement that
                  can continue far enough to justify the risk taken on the
                  trade. If you buy every small breakout inside a range, you
                  can experience several small losses before a sustained move
                  finally appears. For that reason,{" "}
                  <strong className="font-black text-slate-900">
                    knowing when not to trade
                  </strong>{" "}
                  is an important part of trend trading.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              03 — MOVING AVERAGES
          ================================================= */}

          <section
            id="moving-averages"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                03 — Moving Averages
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Use Moving Averages for Trend Following
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Moving averages smooth price data and make the broader
                direction easier to visualize. A stronger trend-following
                approach goes beyond the simple rule{" "}
                <strong className="font-black text-slate-900">
                  “price above the moving average = buy.”
                </strong>{" "}
                Traders should consider the direction of the average, price
                position and market structure together.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                {[
                  {
                    title: "20 EMA",
                    label: "Faster",
                    text: "A 20-period EMA reacts relatively quickly to price and can help track shorter trends and shallow pullbacks, but it is also more sensitive to short-term noise.",
                  },
                  {
                    title: "50 MA / EMA",
                    label: "Medium Term",
                    text: "The 50-period average is widely watched as a medium-term trend reference and may act as a useful dynamic area during pullbacks, although price is never guaranteed to react there.",
                  },
                  {
                    title: "200 MA / EMA",
                    label: "Broader Trend",
                    text: "The 200-period moving average is commonly used to provide broader directional context. Price above or below it can help frame the market, but it should not be treated as a standalone entry signal.",
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

                    <p className="mt-3 text-[13px] leading-7 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-3 lg:grid-cols-2">

                <div className="rounded-[18px] border border-emerald-100 bg-emerald-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                    BULLISH TREND CONTEXT
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    What to Look for in an Uptrend
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    A bullish trend reading becomes more convincing when price
                    is above a rising moving average and the price chart itself
                    continues producing higher highs and higher lows. During a
                    pullback, the moving average can become a reference area
                    rather than an automatic buy signal.
                  </p>

                </div>


                <div className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    BEARISH TREND CONTEXT
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    What to Look for in a Downtrend
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    Price trading below a declining moving average while
                    forming lower highs and lower lows supports bearish trend
                    context. A rally toward the average may then become an area
                    where the trader watches for renewed selling pressure.
                  </p>

                </div>

              </div>


              <div className="mt-4">

                <ImportantBox title="There Is No Magic Moving Average">
                  A 20 EMA, 50 EMA or 200 MA cannot predict exactly where price
                  will reverse. Moving averages become useful when they are
                  part of a consistent trend framework rather than when
                  settings are repeatedly changed until historical charts look
                  perfect.
                </ImportantBox>

              </div>

            </div>

          </section>


          {/* =================================================
              04 — PULLBACK
          ================================================= */}

          <section
            id="pullback"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                04 — Pullback Trading
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Trend Pullback Strategy: How to Enter Without Chasing Price
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A{" "}
                <strong className="font-black text-slate-900">
                  pullback trading strategy
                </strong>{" "}
                waits for price to temporarily move against the dominant trend
                before looking for an opportunity to participate in the next
                continuation leg. This can prevent traders from buying after a
                large bullish extension or selling after an extended decline.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <PullbackEntryChart />


              <div className="mt-4 grid gap-3 md:grid-cols-5">

                {[
                  {
                    no: "01",
                    title: "Define the Trend",
                    text: "Confirm clean bullish or bearish structure.",
                  },
                  {
                    no: "02",
                    title: "Wait for a Pullback",
                    text: "Avoid entering after an extended move.",
                  },
                  {
                    no: "03",
                    title: "Find the Area",
                    text: "Support, resistance, swing level or MA.",
                  },
                  {
                    no: "04",
                    title: "Wait for Confirmation",
                    text: "Look for momentum to return with the trend.",
                  },
                  {
                    no: "05",
                    title: "Define Invalidation",
                    text: "Place risk where the trade idea fails.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[16px] border border-slate-200 bg-white p-3.5"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {item.no}
                    </span>

                    <h3 className="mt-3 text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                  <h3 className="text-[16px] font-black text-slate-950">
                    Example: Buying a Pullback in an Uptrend
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Assume price is making higher highs and higher lows and
                    then begins retracing. Instead of buying the most recent
                    high, the trader waits for price to return toward a
                    previous support area, swing low or rising moving average.
                    If the bullish structure remains intact and buyers begin
                    returning, the setup can offer a more controlled way to
                    join the existing trend.
                  </p>

                </div>


                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    IMPORTANT
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Not Every Decline in an Uptrend Is a Pullback
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    If price breaks an important higher low and then begins
                    creating lower highs and lower lows, the market may be
                    transitioning into a deeper structural change rather than
                    completing a normal pullback. This is why price
                    invalidation matters more than a simple touch of a moving
                    average.
                  </p>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              05 — BREAKOUT
          ================================================= */}

          <section
            id="breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                05 — Breakout Trading
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Breakout Trend Following Strategy: How New Trends Can Begin
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Not every trend provides a clean pullback entry. Sometimes
                price spends time consolidating inside a range and then breaks
                through an important level as directional momentum expands.
                A{" "}
                <strong className="font-black text-slate-900">
                  breakout strategy
                </strong>{" "}
                attempts to participate when price moves beyond that
                established boundary and begins developing a new directional
                leg.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <BreakoutADXChart />


              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <article className="rounded-[18px] border border-brand-100 bg-brand-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    BREAKOUT CHECKLIST
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    What to Look for in a Trend Breakout
                  </h3>


                  <div className="mt-3 space-y-2">

                    {[
                      "A clearly defined support or resistance level.",
                      "A close beyond the level rather than only a temporary wick.",
                      "Follow-through after the breakout instead of an immediate reversal.",
                      "Increasing directional momentum or trend strength.",
                      "A logical invalidation point for the stop loss.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-[11px] bg-white px-3 py-2.5"
                      >
                        <span className="mt-0.5 font-black text-brand-600">
                          ✓
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>


                <article className="rounded-[18px] border border-rose-100 bg-rose-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                    FALSE BREAKOUT RISK
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Why Do Breakouts Fail?
                  </h3>


                  <p className="mt-3 text-[13px] leading-7 text-slate-600">
                    Price can briefly move above resistance or below support
                    and then return inside the previous range. No method can
                    eliminate false breakouts completely, but traders can avoid
                    treating every temporary level breach as proof that a new
                    trend has begun.
                  </p>


                  <div className="mt-3 rounded-[12px] bg-white p-3">

                    <div className="text-[11px] font-black text-slate-950">
                      A More Conservative Approach
                    </div>

                    <p className="mt-1 text-[11px] leading-6 text-slate-500">
                      Some traders wait for the breakout and then a retest of
                      the broken level before looking for an entry. This can
                      provide additional confirmation, although price will not
                      always return for a clean retest.
                    </p>

                  </div>

                </article>

              </div>

            </div>

          </section>


          {/* =================================================
              06 — ADX
          ================================================= */}

          <section
            id="adx"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                06 — ADX Indicator
              </SectionLabel>


              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Use ADX to Measure Trend Strength
              </h2>


              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The{" "}
                <strong className="font-black text-slate-900">
                  Average Directional Index (ADX)
                </strong>{" "}
                is designed to measure{" "}
                <strong className="font-black text-slate-900">
                  trend strength rather than trend direction
                </strong>
                . This distinction is important: ADX can rise during either a
                strong uptrend or a strong downtrend.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    value: "< 20",
                    title: "Weak Trend Conditions",
                    text: "The market may be ranging or lack clear directional strength.",
                  },
                  {
                    value: "20–25",
                    title: "Transition Area",
                    text: "Directional strength may be developing, but price context still matters.",
                  },
                  {
                    value: "25+",
                    title: "Stronger Trend Conditions",
                    text: "Trend-following techniques may become more relevant when directional structure also supports the move.",
                  },
                  {
                    value: "ADX ↑",
                    title: "Strength Increasing",
                    text: "A rising ADX indicates that directional movement is strengthening.",
                  },
                ].map((item) => (
                  <article
                    key={item.value}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <div className="text-[19px] font-black text-brand-600">
                      {item.value}
                    </div>

                    <h3 className="mt-1 text-[13px] font-black text-slate-950">
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

                  <h3 className="text-[17px] font-black text-slate-950">
                    What Does ADX Actually Tell You?
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    If ADX is rising, the directional movement currently
                    developing in the market is gaining strength. This can make
                    trend-following tools such as moving averages, channel
                    breakouts or pullback continuation setups more relevant
                    than they would be during weak, directionless conditions.
                  </p>


                  <p className="mt-3 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    If ADX begins falling, it does not automatically mean price
                    is about to reverse. It indicates that{" "}
                    <strong className="font-black text-slate-900">
                      trend strength is weakening
                    </strong>
                    . The market may slow down, consolidate or eventually
                    transition into another directional phase.
                  </p>

                </div>


                <aside className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    COMMON MISTAKE
                  </div>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    ADX Does Not Mean Buy or Sell
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600">
                    A high ADX reading is not a bullish signal. Traders still
                    need to determine direction using price structure or other
                    directional tools. ADX answers a different question:
                    <strong className="font-black text-slate-900">
                      {" "}how strong is the directional move?
                    </strong>
                  </p>

                </aside>

              </div>


              <div className="mt-4">

                <ImportantBox title="Use ADX as a Filter, Not a Complete Strategy">
                  One practical use of ADX is to help distinguish stronger
                  directional conditions from weak or sideways periods. Do not
                  turn 20 or 25 into rigid automatic entry levels. Read the
                  direction of ADX together with price structure, the breakout
                  or pullback setup and your risk plan.
                </ImportantBox>

              </div>

            </div>

          </section>
                    {/* =================================================
              07 — COMPLETE TREND FOLLOWING SYSTEM
          ================================================= */}

          <section
            id="trend-following-system"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                07 — Build the Strategy
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Build a Trend Following Strategy Step by Step
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Once you understand market structure, moving averages,
                pullbacks and breakouts, the next step is turning those ideas
                into a{" "}
                <strong className="font-black text-slate-900">
                  repeatable trend following system
                </strong>
                . The goal is not to add more indicators. A practical strategy
                should answer six questions: what is the trend, where is the
                setup, what confirms the entry, where is the idea invalid,
                how much will you risk, and how will you exit?
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-2.5 md:grid-cols-3 lg:grid-cols-6">

                {[
                  {
                    no: "01",
                    title: "Trend",
                    text: "Define HH/HL or LH/LL structure.",
                  },
                  {
                    no: "02",
                    title: "Strength",
                    text: "Make sure the market is not simply ranging.",
                  },
                  {
                    no: "03",
                    title: "Setup Area",
                    text: "Use a pullback or breakout.",
                  },
                  {
                    no: "04",
                    title: "Confirmation",
                    text: "Wait for momentum to return with the trend.",
                  },
                  {
                    no: "05",
                    title: "Invalidation",
                    text: "Know where the setup becomes wrong.",
                  },
                  {
                    no: "06",
                    title: "Exit",
                    text: "Use a target or trailing exit rule.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[16px] border border-slate-200 bg-white p-3.5"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[12px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    TRADING LOGIC
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    Price First, Filter Second, Entry Third
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Start by defining direction from price structure. Then use
                    a moving average, ADX or another filter to support that
                    analysis rather than replace it. After that, wait for price
                    to reach a logical setup area and only consider an entry
                    when confirmation appears.
                  </p>


                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {[
                      ["Trend", "Price Structure"],
                      ["Filter", "MA / ADX"],
                      ["Entry", "Pullback / Breakout"],
                      ["Confirmation", "Price Action"],
                      ["Risk", "Position Size"],
                      ["Exit", "Target / Trailing"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[11px] border border-slate-100 bg-white px-3 py-2.5"
                      >
                        <span className="text-[11px] text-slate-500">
                          {label}
                        </span>

                        <span className="text-[11px] font-black text-slate-800">
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[20px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    CORE RULE
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    Do Not Enter Just Because the Market Looks Bullish
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Trend direction tells you{" "}
                    <strong className="font-black text-slate-900">
                      which side of the market deserves priority
                    </strong>
                    , but it does not tell you where to enter. A strong
                    uptrend can still offer a poor long entry if price is
                    already extended and the stop-loss location is far away or
                    unclear.
                  </p>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              08 — COMPLETE TRADE EXAMPLE
          ================================================= */}

          <section
            id="trend-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                08 — Complete Trade Example
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Trend Following Trade Example: From Analysis to Exit
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Assume price is already in a clear uptrend and continues
                producing higher highs and higher lows. Rather than entering
                after a new high, the trader waits for a pullback toward a
                meaningful support area and then looks for evidence that buyers
                are regaining control.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}

              <div className="hidden md:grid md:grid-cols-6 md:gap-2.5">

                {[
                  ["01", "Trend", "HH + HL"],
                  ["02", "Pullback", "Return toward support"],
                  ["03", "Area", "Swing / EMA"],
                  ["04", "Confirmation", "Buyers return"],
                  ["05", "Stop", "Below invalidation"],
                  ["06", "Exit", "Target / Trail"],
                ].map(([no, title, text]) => (
                  <article
                    key={no}
                    className="rounded-[15px] border border-slate-200 bg-white p-3"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[9px] font-black text-white">
                        {no}
                      </span>

                      <h3 className="text-[12px] font-black text-slate-950">
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
                  ["01", "Confirm the Trend", "Higher highs and higher lows."],
                  ["02", "Wait for the Pullback", "Do not chase the previous high."],
                  ["03", "Find the Area", "Support or a previous swing."],
                  ["04", "Wait for Confirmation", "Buyers begin returning."],
                  ["05", "Set the Stop", "Below the invalidation level."],
                  ["06", "Plan the Exit", "Target or trailing stop."],
                ].map(([no, title, text], index) => (
                  <div
                    key={no}
                    className={`flex items-center gap-3 px-3.5 py-3 ${
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

                      <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                        {text}
                      </p>
                    </div>

                  </div>
                ))}

              </div>


              <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

                <div className="rounded-[20px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    TRADE LOGIC
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    Why Is This a Trend-Following Entry?
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    The trader is not trying to predict a new bottom and is not
                    buying simply because price has fallen. The uptrend already
                    exists, the pullback returns to a logical area without
                    invalidating bullish structure, and evidence of renewed
                    buying appears before the trade is entered.
                  </p>


                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {[
                      ["Market Structure", "HH + HL"],
                      ["Entry Type", "Pullback"],
                      ["Watch Area", "Support / EMA"],
                      ["Confirmation", "Bullish Reaction"],
                      ["Invalidation", "Below Swing Low"],
                      ["Exit", "Target / Trailing"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-[11px] border border-slate-100 bg-slate-50/60 px-3 py-2.5"
                      >
                        <span className="text-[11px] text-slate-500">
                          {label}
                        </span>

                        <span className="text-[11px] font-black text-slate-800">
                          {value}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>


                <aside className="rounded-[20px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    WHAT IF PRICE NEVER PULLS BACK?
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    You Do Not Need to Trade Every Trend
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Missing a trade can be better than entering at a level
                    where the stop loss becomes too wide or the
                    risk-to-reward profile is unattractive. A strong trend does
                    not mean every price within that trend is a good entry.
                  </p>

                </aside>

              </div>

            </div>

          </section>


          {/* =================================================
              09 — LONG VS SHORT
          ================================================= */}

          <section
            id="long-short-trend"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                09 — Long vs Short Trend Trading
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How to Trade an Uptrend and Downtrend
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                The core trend-following process works in both directions.
                During an uptrend, the trader looks for areas where buyers may
                regain control after a pullback. During a downtrend, the trader
                watches corrective rallies for evidence that sellers are
                returning.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-4 lg:grid-cols-2">

                <article className="overflow-hidden rounded-[20px] border border-emerald-100">

                  <div className="bg-emerald-50/70 p-4 md:p-5">

                    <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                      LONG TREND SETUP
                    </div>

                    <h3 className="mt-1 text-[19px] font-black text-slate-950">
                      Trading With an Uptrend
                    </h3>

                  </div>


                  <div className="space-y-2 p-4 md:p-5">

                    {[
                      ["1", "Price is producing higher highs and higher lows."],
                      ["2", "Important moving averages are sloping upward."],
                      ["3", "Price pulls back toward support or a previous swing."],
                      ["4", "Sellers fail to invalidate bullish structure."],
                      ["5", "Price shows evidence that buyers are returning."],
                      ["6", "The stop is placed below the logical invalidation area."],
                    ].map(([no, text]) => (
                      <div
                        key={no}
                        className="flex items-start gap-3 rounded-[11px] bg-emerald-50/40 px-3 py-2.5"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-black text-white">
                          {no}
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {text}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>


                <article className="overflow-hidden rounded-[20px] border border-rose-100">

                  <div className="bg-rose-50/70 p-4 md:p-5">

                    <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                      SHORT TREND SETUP
                    </div>

                    <h3 className="mt-1 text-[19px] font-black text-slate-950">
                      Trading With a Downtrend
                    </h3>

                  </div>


                  <div className="space-y-2 p-4 md:p-5">

                    {[
                      ["1", "Price is producing lower highs and lower lows."],
                      ["2", "Important moving averages are sloping downward."],
                      ["3", "Price rallies toward resistance or a previous swing high."],
                      ["4", "Buyers fail to rebuild bullish structure."],
                      ["5", "Price shows evidence that sellers are returning."],
                      ["6", "The stop is placed above the logical invalidation area."],
                    ].map(([no, text]) => (
                      <div
                        key={no}
                        className="flex items-start gap-3 rounded-[11px] bg-rose-50/40 px-3 py-2.5"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-600 text-[9px] font-black text-white">
                          {no}
                        </span>

                        <span className="text-[12px] leading-6 text-slate-600">
                          {text}
                        </span>
                      </div>
                    ))}

                  </div>

                </article>

              </div>


              <div className="mt-4">
                <ImportantBox title="Trading With the Trend Does Not Remove Risk">
                  Even when every part of the setup agrees, a pullback can fail
                  and market structure can change quickly. Trend following does
                  not make a trade certain. Risk must still be defined before
                  entry.
                </ImportantBox>
              </div>

            </div>

          </section>


          {/* =================================================
              10 — PULLBACK VS BREAKOUT
          ================================================= */}

          <section
            id="pullback-vs-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                10 — Entry Methods
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Pullback vs Breakout: Which Trend Entry Is Better?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                There is no entry method that is always superior. Pullback
                entries and breakout entries both attempt to participate in a
                directional move, but they differ in timing, entry price,
                invalidation structure and the type of failure the trader must
                manage.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="overflow-hidden rounded-[18px] border border-slate-200">

                <div className="hidden grid-cols-[1fr_1fr_1fr] bg-slate-950 text-white md:grid">

                  <div className="p-3 text-[11px] font-black">
                    Factor
                  </div>

                  <div className="p-3 text-center text-[11px] font-black">
                    PULLBACK
                  </div>

                  <div className="p-3 text-center text-[11px] font-black">
                    BREAKOUT
                  </div>

                </div>


                <div className="hidden md:block">

                  {[
                    ["Entry", "After a retracement within the trend", "After price breaks an important level"],
                    ["Entry Price", "May provide a more favorable price", "Can enter after price has already expanded"],
                    ["Confirmation", "Trend resumes after the retracement", "Price follows through after the break"],
                    ["Main Risk", "Pullback becomes a reversal", "False breakout"],
                    ["Stop Logic", "Behind a swing or invalidation area", "Behind the range or breakout structure"],
                  ].map(([label, pullback, breakout]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[1fr_1fr_1fr] border-t border-slate-100 first:border-t-0"
                    >

                      <div className="bg-slate-50 p-3 text-[12px] font-black text-slate-800">
                        {label}
                      </div>

                      <div className="p-3 text-center text-[12px] leading-6 text-slate-600">
                        {pullback}
                      </div>

                      <div className="border-l border-slate-100 p-3 text-center text-[12px] leading-6 text-slate-600">
                        {breakout}
                      </div>

                    </div>
                  ))}

                </div>


                {/* MOBILE */}

                <div className="divide-y divide-slate-100 md:hidden">

                  {[
                    ["Entry", "After a pullback", "After a breakout"],
                    ["Price", "Often less extended", "Can be more extended"],
                    ["Risk", "Failed pullback", "False breakout"],
                    ["Stop", "Behind a swing", "Behind the range"],
                  ].map(([label, pullback, breakout]) => (
                    <div
                      key={label}
                      className="p-3.5"
                    >

                      <div className="text-[12px] font-black text-slate-950">
                        {label}
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2">

                        <div className="rounded-[10px] bg-brand-50 p-2.5">
                          <div className="text-[9px] font-black text-brand-600">
                            PULLBACK
                          </div>

                          <div className="mt-1 text-[11px] text-slate-600">
                            {pullback}
                          </div>
                        </div>

                        <div className="rounded-[10px] bg-slate-50 p-2.5">
                          <div className="text-[9px] font-black text-slate-700">
                            BREAKOUT
                          </div>

                          <div className="mt-1 text-[11px] text-slate-600">
                            {breakout}
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              11 — TIMEFRAMES
          ================================================= */}

          <section
            id="trend-timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                11 — Trend Timeframes
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                What Is the Best Timeframe for Trend Following?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                There is no single best timeframe for every trend trader.
                Lower timeframes produce more movement and more potential
                signals, but they also contain more short-term market noise.
                Higher timeframes usually provide fewer setups while making
                broader market structure easier to see.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    tf: "5m–15m",
                    title: "Very Short Term",
                    text: "More frequent setups, but also more noise and false breaks.",
                  },
                  {
                    tf: "1H",
                    title: "Intraday",
                    text: "Can balance setup frequency with reasonably clear trend structure.",
                  },
                  {
                    tf: "4H",
                    title: "Swing Trading",
                    text: "Useful for studying trends that develop across multiple sessions or days.",
                  },
                  {
                    tf: "1D",
                    title: "Broader Trend",
                    text: "Provides a wider market view and reduces the impact of short-term fluctuations.",
                  },
                ].map((item) => (
                  <article
                    key={item.tf}
                    className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <div className="text-[19px] font-black text-brand-600">
                      {item.tf}
                    </div>

                    <h3 className="mt-1 text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 md:p-5">

                <h3 className="text-[17px] font-black text-slate-950">
                  Multi-Timeframe Trend Following
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                  A trader might identify the broader trend on the{" "}
                  <strong className="font-black text-slate-900">
                    4-hour chart
                  </strong>{" "}
                  and then use the{" "}
                  <strong className="font-black text-slate-900">
                    1-hour chart
                  </strong>{" "}
                  to refine an entry. The purpose is not to keep switching
                  timeframes until a signal appears. It is to separate{" "}
                  <strong className="font-black text-slate-900">
                    trend context from entry timing
                  </strong>
                  .
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              12 — STOP LOSS
          ================================================= */}

          <section
            id="trend-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                12 — Stop Loss
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Where Should You Place a Stop Loss in Trend Following?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A stop loss should not be chosen as a random number of points.
                A more logical approach is to place the stop where the market
                would prove that{" "}
                <strong className="font-black text-slate-900">
                  the original trend setup is no longer valid
                </strong>
                .
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                <article className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    STRUCTURE STOP
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Behind a Swing High or Low
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    In a bullish pullback setup, the stop can be placed below
                    the swing low that needs to remain intact for the bullish
                    thesis to survive. The logic is reversed for a bearish
                    trend trade.
                  </p>

                </article>


                <article className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    VOLATILITY
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Account for Market Volatility
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    A stop that is too tight can be triggered by ordinary price
                    movement. Traders can combine structure with a volatility
                    measure such as ATR to estimate how much room a market
                    normally requires.
                  </p>

                </article>


                <article className="rounded-[18px] border border-slate-200 bg-slate-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    POSITION SIZE
                  </div>

                  <h3 className="mt-1 text-[16px] font-black text-slate-950">
                    Adjust Position Size
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    If the logical stop is wider, do not move it closer simply
                    to trade a larger position. Position size can be reduced so
                    that the monetary risk remains within the limit you defined.
                  </p>

                </article>

              </div>


              <div className="mt-4 flex flex-wrap gap-2">

                <Link
                  href="/en/learn-trading/stop-loss"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-[12px] font-black text-white transition hover:bg-slate-800"
                >
                  Stop Loss Guide
                </Link>

                <Link
                  href="/en/tools/risk-calculator"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[12px] font-black text-slate-800 transition hover:border-brand-200 hover:text-brand-600"
                >
                  Risk Calculator
                </Link>

              </div>

            </div>

          </section>


          {/* =================================================
              13 — TRAILING STOP & EXIT
          ================================================= */}

          <section
            id="trend-exit"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                13 — Trend Exit Strategy
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                When Should You Exit a Trend Following Trade?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Exit rules are especially important in trend following because
                the objective is often to remain in a strong move while it
                continues. The trader therefore needs a clear method for
                protecting capital and managing profits when the trend begins
                to weaken.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    no: "01",
                    title: "Fixed Target",
                    text: "Exit near predefined support, resistance or another planned objective.",
                  },
                  {
                    no: "02",
                    title: "Trailing Stop",
                    text: "Move the stop as price continues in the direction of the trade.",
                  },
                  {
                    no: "03",
                    title: "Structure Break",
                    text: "Exit when the sequence of trend highs and lows fails.",
                  },
                  {
                    no: "04",
                    title: "Trend Weakness",
                    text: "Use changes in price behavior and momentum to manage the position.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-brand-600 text-[9px] font-black text-white">
                      {item.no}
                    </span>

                    <h3 className="mt-3 text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[20px] border border-brand-100 bg-brand-50/40 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                    TRAILING STOP
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    How to Use a Trailing Stop in Trend Trading
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Instead of using only a fixed profit target, a trader can
                    move the stop as the trend advances. In an uptrend, for
                    example, the stop may be trailed below confirmed higher
                    lows, or according to a fixed distance, percentage or
                    volatility-based rule.
                  </p>

                  <p className="mt-3 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    The objective is to remain in the move while the trend
                    remains healthy, but a trailing stop does not guarantee a
                    specific execution price and can still be affected by fast
                    volatility or price gaps.
                  </p>

                </div>


                <aside className="rounded-[20px] border border-amber-100 bg-amber-50/50 p-4 md:p-5">

                  <div className="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    A COMMON MANAGEMENT PROBLEM
                  </div>

                  <h3 className="mt-1 text-[18px] font-black text-slate-950">
                    Do Not Suffocate a Winning Trend
                  </h3>

                  <p className="mt-2 text-[13px] leading-7 text-slate-600 md:text-[14px]">
                    Moving the stop extremely close to price after every candle
                    can cause a trader to exit a healthy trend during an
                    ordinary pullback. A strategy designed to capture larger
                    trends must give price enough room to move naturally.
                  </p>

                </aside>

              </div>


              <div className="mt-4">
                <ImportantBox title="Choose the Exit Method Before Entry">
                  Do not wait until the trade becomes profitable and then
                  invent a different exit rule each time. Decide in advance
                  whether you will use a fixed target, partial profit taking, a
                  trailing stop or a market-structure exit. Consistent exit
                  rules are as important as consistent entry rules.
                </ImportantBox>
              </div>

            </div>

          </section>


          {/* =================================================
              14 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="trend-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                14 — Risk Management
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Risk Management in a Trend Following Strategy
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Trend-following systems inevitably experience failed signals,
                especially in sideways markets. For that reason, performance
                does not depend only on the percentage of winning trades.
                Controlling losses when trends fail and allowing strong trades
                to develop when trends persist are both central to the process.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    title: "Define Risk",
                    text: "Decide in advance how much account capital you are willing to lose if the setup fails.",
                  },
                  {
                    title: "Set the Stop First",
                    text: "Know where the technical invalidation point is before calculating position size.",
                  },
                  {
                    title: "Calculate Position Size",
                    text: "Trade size should adjust to the distance between entry and stop loss.",
                  },
                  {
                    title: "Accept Small Losses",
                    text: "Do not widen the stop simply to avoid admitting that the setup failed.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[17px] border border-slate-200 bg-slate-50/50 p-4"
                  >

                    <h3 className="text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-950 p-4 text-white md:p-6">

                <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">

                  <div>

                    <div className="text-[10px] font-black uppercase tracking-wide text-blue-300">
                      POSITION SIZING
                    </div>

                    <h3 className="mt-1 text-[19px] font-black">
                      Do Not Let Position Size Determine the Stop
                    </h3>

                  </div>


                  <p className="text-[13px] leading-7 text-slate-300 md:text-[14px]">
                    The correct order is to define the entry first, identify
                    the logical invalidation level, calculate the stop
                    distance, and then choose a position size that keeps the
                    potential loss within your predefined risk limit.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              15 — TREND FAILURE
          ================================================= */}

          <section
            id="trend-failure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                15 — Trend Weakness
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                How Do You Know When a Trend Is Weakening or Ending?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                No single indicator can identify the end of every trend.
                Instead of trying to sell the exact high or buy the exact low,
                traders can watch for a combination of changes in price
                structure, momentum and trend behavior.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {[
                  {
                    no: "01",
                    title: "Failure to Make a New High",
                    text: "An uptrend begins struggling to produce a clear new higher high.",
                  },
                  {
                    no: "02",
                    title: "Important Swing Break",
                    text: "Price breaks a higher low that had been supporting bullish structure.",
                  },
                  {
                    no: "03",
                    title: "Structure Changes",
                    text: "A lower high followed by a lower low may indicate a deeper shift.",
                  },
                  {
                    no: "04",
                    title: "Momentum Weakens",
                    text: "Trend legs become shorter while pullbacks become deeper.",
                  },
                  {
                    no: "05",
                    title: "ADX Declines",
                    text: "Falling ADX may indicate that directional strength is fading.",
                  },
                  {
                    no: "06",
                    title: "Moving Average Flattens",
                    text: "The average loses slope while price begins crossing it repeatedly.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[17px] border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-slate-950 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[12px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              <div className="mt-4">
                <ImportantBox title="Trend Weakness Is Not the Same as a Trend Reversal">
                  A strong trend can transition into a sideways range instead
                  of immediately reversing. Weakening momentum is therefore a
                  warning that helps manage an existing position; it is not
                  automatically a signal to open a trade in the opposite
                  direction.
                </ImportantBox>
              </div>

            </div>

          </section>


          {/* =================================================
              16 — COMMON MISTAKES
          ================================================= */}

          <section
            id="trend-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                16 — Common Mistakes
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                6 Common Trend Following Mistakes
              </h2>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">

                {[
                  {
                    no: "01",
                    title: "Chasing Price",
                    text: "Entering after a large move because you are afraid of missing the trend.",
                  },
                  {
                    no: "02",
                    title: "Ignoring Sideways Markets",
                    text: "Applying a trend-following system when no clear trend exists.",
                  },
                  {
                    no: "03",
                    title: "Relying on One Moving Average",
                    text: "Treating every crossover or moving-average touch as a trade signal.",
                  },
                  {
                    no: "04",
                    title: "Entering Without Invalidation",
                    text: "Opening a position before knowing where the trade idea becomes wrong.",
                  },
                  {
                    no: "05",
                    title: "Exiting Too Early",
                    text: "Closing a trade during the first small pullback even though trend structure remains intact.",
                  },
                  {
                    no: "06",
                    title: "Moving the Stop Away",
                    text: "Increasing the allowed loss after the market moves against the original setup.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[18px] border border-rose-100 bg-rose-50/30 p-4"
                  >

                    <div className="flex items-center gap-2">

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-rose-600 text-[9px] font-black text-white">
                        {item.no}
                      </span>

                      <h3 className="text-[14px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              17 — PROS & CONS
          ================================================= */}

          <section
            id="trend-pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>
                17 — Pros & Cons
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[34px]">
                Trend Following Strategy Advantages and Disadvantages
              </h2>

            </div>


            <div className="grid lg:grid-cols-2">

              <div className="border-b border-slate-200 p-4 md:p-7 lg:border-b-0 lg:border-r">

                <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                  ADVANTAGES
                </div>

                <h3 className="mt-1 text-[19px] font-black text-slate-950">
                  Why Traders Use Trend Following
                </h3>


                <div className="mt-4 space-y-2">

                  {[
                    "It does not require predicting the exact market top or bottom.",
                    "It can be applied to multiple markets and timeframes.",
                    "It provides relatively clear directional rules.",
                    "It can be combined with pullback or breakout entries.",
                    "It attempts to stay involved when trends extend further than expected.",
                    "It can be converted into a structured and testable trading system.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-[11px] bg-emerald-50/50 px-3 py-2.5"
                    >
                      <span className="mt-0.5 font-black text-emerald-600">
                        ✓
                      </span>

                      <span className="text-[12px] leading-6 text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>


              <div className="p-4 md:p-7">

                <div className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                  DISADVANTAGES
                </div>

                <h3 className="mt-1 text-[19px] font-black text-slate-950">
                  What Are the Challenges of Trend Trading?
                </h3>


                <div className="mt-4 space-y-2">

                  {[
                    "Sideways markets can create repeated false signals.",
                    "A trend may begin without offering a perfect pullback entry.",
                    "Late entries can create poor risk-to-reward conditions.",
                    "False breakouts can produce consecutive small losses.",
                    "Exiting too early can prevent the trader from capturing larger trends.",
                    "The strategy requires discipline during periods with few quality setups.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-[11px] bg-rose-50/50 px-3 py-2.5"
                    >
                      <span className="mt-0.5 font-black text-rose-600">
                        ×
                      </span>

                      <span className="text-[12px] leading-6 text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              BEGINNER ROADMAP
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-sm">

            <div className="p-4 md:p-7">

              <SectionLabel>
                Beginner Roadmap
              </SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-[-0.02em] md:text-[34px]">
                How to Learn Trend Following as a Beginner
              </h2>

              <p className="mt-3 max-w-5xl text-[14px] leading-7 text-slate-300 md:text-[15px] md:leading-8">
                Beginners do not need five indicators and dozens of conditions.
                Learn the strategy in stages so that you understand why every
                decision is being made on the chart.
              </p>


              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

                {[
                  {
                    no: "01",
                    title: "Market Structure",
                    text: "Learn HH / HL and LH / LL.",
                  },
                  {
                    no: "02",
                    title: "Trend vs Range",
                    text: "Learn when a real directional market exists.",
                  },
                  {
                    no: "03",
                    title: "Entry Method",
                    text: "Choose pullbacks or breakouts.",
                  },
                  {
                    no: "04",
                    title: "Risk",
                    text: "Define the stop and position size.",
                  },
                  {
                    no: "05",
                    title: "Testing",
                    text: "Review historical charts and practice on demo.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[16px] border border-white/10 bg-white/[0.05] p-4"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-[9px] font-black text-slate-950">
                      {item.no}
                    </span>

                    <h3 className="mt-3 text-[14px] font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-400">
                      {item.text}
                    </p>

                  </article>
                ))}

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
                Frequently Asked Questions About Trend Following
              </h2>

              <p className="mt-3 max-w-5xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Quick answers to common questions about trend trading, market
                structure, moving averages, ADX, pullbacks, breakouts and trend
                entries.
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

                      <h3 className="text-[15px] font-black leading-7 text-slate-950 md:text-[16px]">
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

              <SectionLabel>
                Related Guides
              </SectionLabel>

              <h2 className="mt-3 text-[22px] font-black leading-[1.35] text-slate-950 md:text-[30px]">
                Continue Learning Trading Strategies
              </h2>


              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    href: "/en/strategies/price-action",
                    label: "Price Action",
                    title: "Price Action Trading Strategy",
                    text: "Learn how to read market structure and price behavior without relying entirely on indicators.",
                  },
                  {
                    href: "/en/strategies/swing-trading",
                    label: "Swing Trading",
                    title: "Swing Trading Strategy",
                    text: "Learn how traders approach market moves that can last several days or weeks.",
                  },
                  {
                    href: "/en/strategies/rsi",
                    label: "RSI",
                    title: "RSI Trading Strategy",
                    text: "Use the Relative Strength Index to understand momentum, overbought and oversold conditions and divergence.",
                  },
                  {
                    href: "/en/learn-trading/stop-loss",
                    label: "Risk",
                    title: "Stop Loss Guide",
                    text: "Learn how traders define invalidation and manage downside risk.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[17px] border border-slate-200 bg-slate-50/50 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/30"
                  >

                    <div className="text-[9px] font-black uppercase tracking-wide text-brand-600">
                      {item.label}
                    </div>

                    <h3 className="mt-1 text-[15px] font-black text-slate-950 transition group-hover:text-brand-600">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-500">
                      {item.text}
                    </p>

                    <div className="mt-3 text-[11px] font-black text-brand-600">
                      Read guide →
                    </div>

                  </Link>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-brand-100 bg-[linear-gradient(135deg,#eef5fd_0%,#ffffff_55%,#f8fbff_100%)] shadow-sm">

            <div className="grid gap-5 p-4 md:p-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

              <div>

                <div className="text-[10px] font-black uppercase tracking-wide text-brand-600">
                  BROKER ALARAB
                </div>

                <h2 className="mt-2 text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 md:text-[31px]">
                  Turn Your Trend Strategy Into a Measurable Trading Plan
                </h2>

                <p className="mt-3 max-w-4xl text-[13px] leading-7 text-slate-600 md:text-[14px] md:leading-8">
                  Use trading calculators to estimate risk and position size,
                  and compare brokers by platforms, trading conditions and
                  costs before choosing the setup that fits your trading style.
                </p>

              </div>


              <div className="flex flex-col gap-2.5 sm:flex-row lg:justify-end">

                <Link
                  href="/en/tools"
                  className="inline-flex items-center justify-center rounded-[13px] bg-brand-600 px-5 py-3 text-[12px] font-black text-white shadow-sm transition hover:bg-brand-700"
                >
                  Trading Tools
                </Link>

                <Link
                  href="/en/best-brokers"
                  className="inline-flex items-center justify-center rounded-[13px] border border-slate-200 bg-white px-5 py-3 text-[12px] font-black text-slate-800 transition hover:border-brand-200 hover:text-brand-600"
                >
                  Compare Brokers
                </Link>

              </div>

            </div>


            <div className="border-t border-brand-100 bg-white/60 px-4 py-3 text-[10px] leading-5 text-slate-500 md:px-7 md:text-[11px]">
              This content is for educational purposes only and does not
              constitute investment advice or a recommendation. Trading
              financial markets involves risk and can result in loss of capital.
            </div>

          </section>


        </article>

      </div>


      {/* =====================================================
          JSON-LD
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