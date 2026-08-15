import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   ICT TRADING STRATEGY — ENGLISH
   Broker Alarab
   Path: /en/strategies/ict
========================================================= */

const PAGE_URL = "https://brokeralarab.com/en/strategies/ict";
const ARABIC_URL = "https://brokeralarab.com/strategies/ict";

const PAGE_TITLE =
  "ICT Trading Strategy: Beginner Guide with Charts";

const PAGE_DESCRIPTION =
  "Learn the ICT trading strategy step by step, including liquidity, market structure, FVGs, order blocks, BOS, CHoCH, kill zones, examples and risk management.";

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: ARABIC_URL,
      "x-default": PAGE_URL,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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

  keywords: [
    "ICT trading strategy",
    "ICT trading",
    "ICT trading for beginners",
    "ICT strategy",
    "Inner Circle Trader",
    "ICT concepts",
    "ICT forex strategy",
    "ICT market structure",
    "ICT liquidity",
    "liquidity sweep",
    "fair value gap",
    "FVG trading",
    "ICT order block",
    "order block trading",
    "BOS trading",
    "CHoCH trading",
    "ICT kill zones",
  ],
};


/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionLabel({ children }: { children: React.ReactNode }) {
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
    <div className="rounded-[18px] border border-brand-100 bg-brand-50/60 p-4 md:p-5">
      <div className="flex items-start gap-3">

        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-sm font-black text-white">
          !
        </div>

        <div className="min-w-0">
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
   SVG 1
   ICT OVERVIEW
========================================================= */

function ICTOverviewChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">

        <div className="flex items-center justify-between gap-3">

          <div>
            <div className="text-[14px] font-black text-slate-950">
              A simplified ICT price-delivery model
            </div>

            <div className="mt-1 text-[11px] text-slate-500">
              Liquidity → Sweep → Structure Shift → POI → Execution
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
            ICT Model
          </span>

        </div>

      </div>


      {/* =================================================
          DESKTOP CHART
      ================================================= */}
      <div className="hidden md:block">

        <svg
          viewBox="0 0 1200 590"
          className="block w-full"
          role="img"
          aria-label="ICT trading model showing liquidity, liquidity sweep, change of character, order block, fair value gap and entry zone"
        >
          <defs>

            <linearGradient
              id="ictDesktopBgEn"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>

            <marker
              id="desktopArrowEn"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path
                d="M0 0 L10 5 L0 10 Z"
                fill="#2563eb"
              />
            </marker>

          </defs>

          <rect
            width="1200"
            height="590"
            fill="url(#ictDesktopBgEn)"
          />


          {/* GRID */}
          {[100, 180, 260, 340, 420, 500].map((y) => (
            <line
              key={`desktop-h-en-${y}`}
              x1="70"
              y1={y}
              x2="1130"
              y2={y}
              stroke="#e8edf4"
              strokeWidth="1"
            />
          ))}

          {[150, 300, 450, 600, 750, 900, 1050].map((x) => (
            <line
              key={`desktop-v-en-${x}`}
              x1={x}
              y1="55"
              x2={x}
              y2="515"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}


          {/* PRICE */}
          <polyline
            points="
              90,425
              180,335
              260,385
              350,275
              430,350
              520,165
              590,120
              650,260
              730,335
              805,275
              875,355
              960,285
              1050,205
              1120,245
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />


          {/* BUY-SIDE LIQUIDITY */}
          <line
            x1="150"
            y1="165"
            x2="550"
            y2="165"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="10 7"
          />

          <text
            x="160"
            y="140"
            fontSize="18"
            fontWeight="900"
            fill="#b45309"
          >
            Buy-side Liquidity
          </text>

          <text
            x="160"
            y="192"
            fontSize="13"
            fill="#64748b"
          >
            Stops may cluster above visible highs
          </text>


          {/* SWEEP */}
          <circle
            cx="590"
            cy="120"
            r="12"
            fill="#fff7ed"
            stroke="#f97316"
            strokeWidth="4"
          />

          <text
            x="610"
            y="92"
            fontSize="17"
            fontWeight="900"
            fill="#ea580c"
          >
            Liquidity Sweep
          </text>


          {/* CHOCH */}
          <line
            x1="430"
            y1="350"
            x2="760"
            y2="350"
            stroke="#e11d48"
            strokeWidth="2.5"
            strokeDasharray="9 7"
          />

          <text
            x="610"
            y="382"
            fontSize="17"
            fontWeight="900"
            fill="#be123c"
          >
            CHoCH
          </text>

          <text
            x="610"
            y="405"
            fontSize="13"
            fill="#64748b"
          >
            Early shift in market behavior
          </text>


          {/* ORDER BLOCK */}
          <rect
            x="735"
            y="310"
            width="180"
            height="92"
            rx="14"
            fill="#dcfce7"
            fillOpacity="0.8"
            stroke="#22c55e"
            strokeWidth="2"
          />

          <text
            x="760"
            y="345"
            fontSize="17"
            fontWeight="900"
            fill="#15803d"
          >
            Order Block
          </text>

          <text
            x="760"
            y="370"
            fontSize="13"
            fill="#166534"
          >
            Potential area of interest
          </text>


          {/* FVG */}
          <rect
            x="930"
            y="250"
            width="120"
            height="82"
            rx="12"
            fill="#dbeafe"
            fillOpacity="0.8"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="7 5"
          />

          <text
            x="990"
            y="286"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill="#1d4ed8"
          >
            FVG
          </text>

          <text
            x="990"
            y="310"
            textAnchor="middle"
            fontSize="12"
            fill="#475569"
          >
            Imbalance
          </text>


          {/* ENTRY */}
          <line
            x1="880"
            y1="470"
            x2="880"
            y2="395"
            stroke="#16a34a"
            strokeWidth="4"
          />

          <text
            x="895"
            y="460"
            fontSize="16"
            fontWeight="900"
            fill="#15803d"
          >
            Entry Zone
          </text>


          {/* POSSIBLE CONTINUATION */}
          <path
            d="M 930 395 Q 1035 340 1110 255"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeDasharray="10 7"
            markerEnd="url(#desktopArrowEn)"
          />

          <text
            x="1015"
            y="410"
            fontSize="14"
            fontWeight="800"
            fill="#2563eb"
          >
            Possible continuation
          </text>


          {/* FLOW */}
          <rect
            x="125"
            y="530"
            width="950"
            height="38"
            rx="19"
            fill="#ffffff"
            stroke="#e2e8f0"
          />

          <text
            x="600"
            y="555"
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill="#475569"
          >
            Market Structure → Liquidity → Sweep → CHoCH → POI → FVG → Execution
          </text>

        </svg>

      </div>


      {/* =================================================
          MOBILE PREVIEW
      ================================================= */}
      <div className="md:hidden">

        <a
          href="#ict-overview-fullscreen-en"
          className="group block cursor-zoom-in"
          aria-label="Open the ICT model chart at full size"
        >

          <svg
            viewBox="0 0 360 420"
            className="block w-full"
            role="img"
            aria-label="Simplified ICT trading chart for mobile"
          >
            <rect
              width="360"
              height="420"
              fill="#ffffff"
            />

            {[80, 145, 210, 275, 340].map((y) => (
              <line
                key={`mobile-h-en-${y}`}
                x1="25"
                y1={y}
                x2="335"
                y2={y}
                stroke="#eef2f7"
              />
            ))}


            {/* LIQUIDITY */}
            <line
              x1="40"
              y1="115"
              x2="185"
              y2="115"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="7 5"
            />

            <text
              x="42"
              y="98"
              fontSize="11"
              fontWeight="900"
              fill="#b45309"
            >
              Liquidity
            </text>


            {/* PRICE */}
            <polyline
              points="
                28,325
                72,275
                108,300
                150,220
                185,255
                218,130
                245,90
                270,215
                295,255
                330,205
              "
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />


            {/* SWEEP */}
            <circle
              cx="245"
              cy="90"
              r="8"
              fill="#fff7ed"
              stroke="#f97316"
              strokeWidth="3"
            />

            <text
              x="260"
              y="74"
              fontSize="11"
              fontWeight="900"
              fill="#ea580c"
            >
              Sweep
            </text>


            {/* CHOCH */}
            <line
              x1="175"
              y1="255"
              x2="288"
              y2="255"
              stroke="#e11d48"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

            <text
              x="200"
              y="277"
              fontSize="11"
              fontWeight="900"
              fill="#be123c"
            >
              CHoCH
            </text>


            {/* ORDER BLOCK */}
            <rect
              x="235"
              y="215"
              width="75"
              height="62"
              rx="9"
              fill="#dcfce7"
              stroke="#22c55e"
              strokeWidth="1.5"
            />

            <text
              x="272"
              y="240"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#15803d"
            >
              Order Block
            </text>

            <text
              x="272"
              y="257"
              textAnchor="middle"
              fontSize="9"
              fill="#166534"
            >
              POI
            </text>


            {/* FVG */}
            <rect
              x="285"
              y="175"
              width="52"
              height="46"
              rx="7"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />

            <text
              x="311"
              y="203"
              textAnchor="middle"
              fontSize="11"
              fontWeight="900"
              fill="#1d4ed8"
            >
              FVG
            </text>


            {/* FLOW */}
            <rect
              x="25"
              y="355"
              width="310"
              height="45"
              rx="12"
              fill="#f8fafc"
              stroke="#e2e8f0"
            />

            <text
              x="180"
              y="375"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="900"
              fill="#334155"
            >
              Liquidity → Sweep → CHoCH
            </text>

            <text
              x="180"
              y="391"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="900"
              fill="#334155"
            >
              Order Block / FVG → Entry
            </text>

          </svg>


          {/* EXPAND BUTTON */}
          <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
              <span>Enlarge chart</span>
              <span className="text-[14px]">↗</span>
            </div>

          </div>

        </a>

      </div>


      {/* =================================================
          BEGINNER EXPLANATION
      ================================================= */}
      <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

        <p className="text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
          <strong className="font-black text-slate-900">
            How to read this chart:
          </strong>{" "}
          an ICT trader first maps market structure and liquidity, then waits
          to see how price reacts after liquidity is taken. A structural shift
          and a relevant area such as a Fair Value Gap or Order Block may then
          be used to build a trade scenario. The sequence is more important
          than any single label.
        </p>

      </div>


      {/* =================================================
          FULLSCREEN MOBILE CHART
      ================================================= */}
      <div
        id="ict-overview-fullscreen-en"
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
      >

        <a
          href="#how-ict-works"
          className="absolute inset-0"
          aria-label="Close full-size ICT chart"
        />

        <div className="relative z-10 flex max-h-[94vh] w-full max-w-[980px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

          {/* LIGHTBOX HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

            <div>
              <div className="text-[14px] font-black text-slate-950">
                ICT Trading Model
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Liquidity → Sweep → Structure Shift → POI → Execution
              </div>
            </div>

            <a
              href="#how-ict-works"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
              aria-label="Close"
            >
              ×
            </a>

          </div>


          {/* SWIPE HINT */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-center text-[11px] font-bold text-brand-700 md:hidden">
            <span className="text-[16px]">↔</span>
            <span>
              Swipe left or right to explore the full chart
            </span>
          </div>


          {/* LARGE CHART */}
          <div className="overflow-auto bg-white p-2">

            <svg
              viewBox="0 0 1200 590"
              className="block min-w-[900px] w-full"
              role="img"
              aria-label="Full ICT trading strategy chart"
            >
              <defs>
                <marker
                  id="fullArrowEn"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path
                    d="M0 0 L10 5 L0 10 Z"
                    fill="#2563eb"
                  />
                </marker>
              </defs>

              <rect width="1200" height="590" fill="#ffffff" />

              {[100, 180, 260, 340, 420, 500].map((y) => (
                <line
                  key={`full-h-en-${y}`}
                  x1="70"
                  y1={y}
                  x2="1130"
                  y2={y}
                  stroke="#e8edf4"
                />
              ))}

              {[150, 300, 450, 600, 750, 900, 1050].map((x) => (
                <line
                  key={`full-v-en-${x}`}
                  x1={x}
                  y1="55"
                  x2={x}
                  y2="515"
                  stroke="#f1f5f9"
                />
              ))}

              <polyline
                points="
                  90,425
                  180,335
                  260,385
                  350,275
                  430,350
                  520,165
                  590,120
                  650,260
                  730,335
                  805,275
                  875,355
                  960,285
                  1050,205
                  1120,245
                "
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <line
                x1="150"
                y1="165"
                x2="550"
                y2="165"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="10 7"
              />

              <text
                x="160"
                y="140"
                fontSize="18"
                fontWeight="900"
                fill="#b45309"
              >
                Buy-side Liquidity
              </text>

              <text
                x="160"
                y="192"
                fontSize="13"
                fill="#64748b"
              >
                Stops may cluster above visible highs
              </text>

              <circle
                cx="590"
                cy="120"
                r="12"
                fill="#fff7ed"
                stroke="#f97316"
                strokeWidth="4"
              />

              <text
                x="610"
                y="92"
                fontSize="17"
                fontWeight="900"
                fill="#ea580c"
              >
                Liquidity Sweep
              </text>

              <line
                x1="430"
                y1="350"
                x2="760"
                y2="350"
                stroke="#e11d48"
                strokeWidth="2.5"
                strokeDasharray="9 7"
              />

              <text
                x="610"
                y="382"
                fontSize="17"
                fontWeight="900"
                fill="#be123c"
              >
                CHoCH
              </text>

              <text
                x="610"
                y="405"
                fontSize="13"
                fill="#64748b"
              >
                Early shift in market behavior
              </text>

              <rect
                x="735"
                y="310"
                width="180"
                height="92"
                rx="14"
                fill="#dcfce7"
                stroke="#22c55e"
                strokeWidth="2"
              />

              <text
                x="760"
                y="345"
                fontSize="17"
                fontWeight="900"
                fill="#15803d"
              >
                Order Block
              </text>

              <text
                x="760"
                y="370"
                fontSize="13"
                fill="#166534"
              >
                Potential area of interest
              </text>

              <rect
                x="930"
                y="250"
                width="120"
                height="82"
                rx="12"
                fill="#dbeafe"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="7 5"
              />

              <text
                x="990"
                y="286"
                textAnchor="middle"
                fontSize="18"
                fontWeight="900"
                fill="#1d4ed8"
              >
                FVG
              </text>

              <text
                x="990"
                y="310"
                textAnchor="middle"
                fontSize="12"
                fill="#475569"
              >
                Imbalance
              </text>

              <line
                x1="880"
                y1="470"
                x2="880"
                y2="395"
                stroke="#16a34a"
                strokeWidth="4"
              />

              <text
                x="895"
                y="460"
                fontSize="16"
                fontWeight="900"
                fill="#15803d"
              >
                Entry Zone
              </text>

              <path
                d="M 930 395 Q 1035 340 1110 255"
                fill="none"
                stroke="#2563eb"
                strokeWidth="4"
                strokeDasharray="10 7"
                markerEnd="url(#fullArrowEn)"
              />

              <text
                x="1015"
                y="410"
                fontSize="14"
                fontWeight="800"
                fill="#2563eb"
              >
                Possible continuation
              </text>

            </svg>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   MARKET STRUCTURE CHART
========================================================= */

function MarketStructureChart() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">

        <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
          Bullish vs. bearish market structure
        </h3>

        <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
          Higher highs and higher lows vs. lower highs and lower lows
        </p>

      </div>

      <div className="p-3 md:p-5">

        <svg
          viewBox="0 0 1000 360"
          className="block w-full"
          role="img"
          aria-label="Bullish and bearish market structure example with higher highs, higher lows, lower highs and lower lows"
        >
          <rect width="1000" height="360" fill="#ffffff" />

          {/* DIVIDER */}
          <line
            x1="500"
            y1="35"
            x2="500"
            y2="325"
            stroke="#e2e8f0"
            strokeWidth="2"
          />


          {/* BULLISH */}
          <text
            x="250"
            y="45"
            textAnchor="middle"
            fontSize="19"
            fontWeight="900"
            fill="#15803d"
          >
            Bullish Structure
          </text>

          <polyline
            points="
              55,290
              135,205
              205,245
              295,145
              360,195
              445,90
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text
            x="135"
            y="185"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#15803d"
          >
            HH
          </text>

          <text
            x="205"
            y="270"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#15803d"
          >
            HL
          </text>

          <text
            x="295"
            y="125"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#15803d"
          >
            HH
          </text>

          <text
            x="360"
            y="220"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#15803d"
          >
            HL
          </text>


          {/* BEARISH */}
          <text
            x="750"
            y="45"
            textAnchor="middle"
            fontSize="19"
            fontWeight="900"
            fill="#be123c"
          >
            Bearish Structure
          </text>

          <polyline
            points="
              555,85
              640,165
              705,125
              790,225
              855,180
              945,285
            "
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text
            x="640"
            y="190"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#be123c"
          >
            LL
          </text>

          <text
            x="705"
            y="105"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#be123c"
          >
            LH
          </text>

          <text
            x="790"
            y="250"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#be123c"
          >
            LL
          </text>

          <text
            x="855"
            y="160"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#be123c"
          >
            LH
          </text>

        </svg>

      </div>

    </div>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function ICTStrategyEnglishPage() {
  return (
    <main
      dir="ltr"
      className="bg-white text-slate-900"
    >

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#f4f8fd_0%,#ffffff_100%)]">

        <div className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 md:py-7 lg:px-8">

          {/* BREADCRUMB */}
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500"
          >
            <Link
              href="/en"
              className="transition hover:text-brand-600"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/en/strategies"
              className="transition hover:text-brand-600"
            >
              Trading Strategies
            </Link>

            <span>/</span>

            <span className="text-slate-700">
              ICT Trading Strategy
            </span>
          </nav>


          <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto]">

            {/* CONTENT */}
            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  ICT Trading Guide
                </span>

                <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold text-slate-500 sm:inline-flex">
                  Beginner → Intermediate
                </span>

              </div>


              <h1 className="mt-3 max-w-[1000px] text-[30px] font-black leading-[1.15] tracking-[-0.03em] text-slate-950 sm:text-[34px] md:text-[42px] lg:text-[46px]">
                ICT Trading Strategy Explained: A Complete Beginner&apos;s Guide
              </h1>


              <p className="mt-3 max-w-[1050px] text-[14px] leading-7 text-slate-600 md:text-[16px] md:leading-8">
                Learn how the ICT trading strategy uses market structure,
                liquidity, Fair Value Gaps, Order Blocks, BOS, CHoCH and
                session timing to build a structured price-action trading
                framework.
              </p>


              {/* DESKTOP QUICK INFO */}
              <div className="mt-4 hidden flex-wrap gap-2 sm:flex">

                {[
                  "Market Structure",
                  "Liquidity",
                  "Fair Value Gaps",
                  "Order Blocks",
                  "BOS & CHoCH",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>


            {/* DESKTOP SIDE BADGE */}
            <div className="hidden lg:block">

              <div className="rounded-[20px] border border-brand-100 bg-white px-5 py-4 text-center shadow-sm">

                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-brand-600">
                  Complete Guide
                </div>

                <div className="mt-1 text-[24px] font-black text-slate-950">
                  ICT
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  Charts + Examples
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN ARTICLE WRAPPER
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1520px] px-3 py-5 sm:px-5 md:py-7 lg:px-8">

        <article className="space-y-6 md:space-y-8">


          {/* =================================================
              CONTENT NAVIGATION
          ================================================= */}

          <section className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-3">

              <div className="text-[13px] font-black text-slate-950">
                In this ICT trading guide
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Jump directly to any concept
              </div>

            </div>


            {/* MOBILE */}
            <div className="grid grid-cols-2 gap-px bg-slate-100 md:hidden">

              {[
                ["01", "What is ICT?", "#what-is-ict"],
                ["02", "How it works", "#how-ict-works"],
                ["03", "Market structure", "#market-structure"],
                ["04", "Liquidity", "#liquidity"],
                ["05", "Fair Value Gap", "#fvg"],
                ["06", "Order Blocks", "#order-block"],
                ["07", "BOS & CHoCH", "#bos-choch"],
                ["08", "Kill Zones", "#kill-zones"],
                ["09", "Trade example", "#example"],
                ["10", "Risk management", "#risk-management"],
                ["11", "Pros & cons", "#pros-cons"],
                ["12", "FAQ", "#faq"],
              ].map(([no, title, href]) => (
                <a
                  key={no}
                  href={href}
                  className="flex items-center gap-2 bg-white px-3 py-2.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-brand-600 text-[8px] font-black text-white">
                    {no}
                  </span>

                  <span className="text-[10px] font-black leading-4 text-slate-700">
                    {title}
                  </span>
                </a>
              ))}

            </div>


            {/* DESKTOP */}
            <div className="hidden grid-cols-6 gap-px bg-slate-100 md:grid">

              {[
                ["01", "What is ICT?", "#what-is-ict"],
                ["02", "How ICT Works", "#how-ict-works"],
                ["03", "Market Structure", "#market-structure"],
                ["04", "Liquidity", "#liquidity"],
                ["05", "Fair Value Gap", "#fvg"],
                ["06", "Order Blocks", "#order-block"],
                ["07", "BOS & CHoCH", "#bos-choch"],
                ["08", "Kill Zones", "#kill-zones"],
                ["09", "Trade Example", "#example"],
                ["10", "Risk Management", "#risk-management"],
                ["11", "Pros & Cons", "#pros-cons"],
                ["12", "FAQ", "#faq"],
              ].map(([no, title, href]) => (
                <a
                  key={no}
                  href={href}
                  className="group flex items-center gap-2 bg-white px-3 py-3 transition hover:bg-brand-50/50"
                >
                  <span className="text-[10px] font-black text-brand-600">
                    {no}
                  </span>

                  <span className="text-[11px] font-black text-slate-700 transition group-hover:text-brand-600">
                    {title}
                  </span>
                </a>
              ))}

            </div>

          </section>


          {/* =================================================
              01 - WHAT IS ICT?
          ================================================= */}

          <section
            id="what-is-ict"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>01 — The Foundation</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                What Is the ICT Trading Strategy?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                ICT stands for{" "}
                <strong className="font-black text-slate-900">
                  Inner Circle Trader
                </strong>
                . In trading, the term usually refers to a price-action
                framework built around market structure, liquidity, price
                imbalances, key areas of interest and session timing rather
                than traditional indicator signals.
              </p>

            </div>


            {/* MOBILE QUICK FACTS */}
            <div className="border-b border-slate-200 bg-white px-3 py-3 lg:hidden">

              <div className="grid grid-cols-2 gap-2">

                {[
                  {
                    label: "Analysis style",
                    value: "Price Action",
                  },
                  {
                    label: "Core focus",
                    value: "Liquidity",
                  },
                  {
                    label: "Difficulty",
                    value: "Medium → Advanced",
                  },
                  {
                    label: "Markets",
                    value: "Forex & More",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[13px] border border-slate-200 bg-slate-50/70 px-3 py-2"
                  >
                    <div className="text-[9px] font-black text-slate-500">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[12px] font-black leading-5 text-slate-950">
                      {item.value}
                    </div>
                  </div>
                ))}

              </div>

            </div>


            {/* =================================================
                MOBILE CONTENT
            ================================================= */}
            <div className="lg:hidden">

              <div className="px-4 py-4">

                {/* DIRECT ANSWER */}
                <div className="border-l-[3px] border-brand-500 pl-3">

                  <h3 className="text-[16px] font-black leading-6 text-slate-950">
                    ICT in simple terms
                  </h3>

                  <p className="mt-1.5 text-[14px] leading-7 text-slate-700">
                    ICT trading starts by asking where liquidity may be
                    resting, how price is structured and whether a strong move
                    has left an imbalance or a meaningful area that price may
                    revisit.
                  </p>

                </div>


                {/* EXPLANATION */}
                <p className="mt-4 text-[14px] leading-7 text-slate-700">
                  As you study ICT, you will repeatedly see concepts such as
                  liquidity, Fair Value Gaps (FVG), Order Blocks, Break of
                  Structure (BOS) and Change of Character (CHoCH). The goal is
                  not to treat each concept as a standalone signal, but to
                  combine them into one market narrative.
                </p>


                <details className="group mt-3">

                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-[13px] border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[12px] font-black text-brand-600">

                    <span>
                      How does the ICT framework read price?
                    </span>

                    <span className="text-[17px] leading-none transition group-open:rotate-45">
                      +
                    </span>

                  </summary>

                  <div className="px-1 pt-3">

                    <p className="text-[14px] leading-7 text-slate-700">
                      A trader may begin with higher-timeframe structure,
                      identify obvious liquidity above highs or below lows,
                      then watch how price behaves after those levels are
                      reached. A shift in structure, displacement and a
                      relevant FVG or Order Block may then become part of the
                      setup.
                    </p>

                  </div>

                </details>


                {/* CORE IDEA */}
                <div className="mt-4 rounded-[16px] border border-brand-100 bg-brand-50/60 p-3.5">

                  <div className="flex items-center gap-2.5">

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-600 text-[13px] font-black text-white">
                      !
                    </div>

                    <h3 className="text-[15px] font-black text-slate-950">
                      Start with these three questions
                    </h3>

                  </div>

                  <div className="mt-3 grid gap-2">

                    {[
                      "What is the current market structure?",
                      "Where is the obvious liquidity?",
                      "How did price react after reaching it?",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-[13px] leading-6 text-slate-700"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        <span>{item}</span>
                      </div>
                    ))}

                  </div>

                </div>


                {/* QUESTION */}
                <div className="mt-4 border-t border-slate-100 pt-3">

                  <h3 className="text-[15px] font-black text-slate-950">
                    Is ICT a trading indicator?
                  </h3>

                  <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                    No. ICT is not a single indicator that you add to a chart.
                    It is primarily a way of reading price action, market
                    structure, liquidity, timing and price zones.
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                DESKTOP CONTENT
            ================================================= */}
            <div className="hidden lg:block">

              <div className="p-7">

                <div className="grid gap-6 lg:grid-cols-[1fr_260px]">

                  {/* MAIN */}
                  <div className="min-w-0">

                    <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                      <div className="flex items-start gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                          ICT
                        </div>

                        <div className="min-w-0 flex-1">

                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            ICT explained in one sentence
                          </h3>

                          <p className="mt-2 text-[14px] leading-7 text-slate-700">
                            ICT is a price-action framework that connects
                            market structure, liquidity, displacement and key
                            price zones to build a structured trade narrative.
                          </p>

                        </div>

                      </div>

                    </div>


                    <div className="mt-4 space-y-3 text-[15px] leading-8 text-slate-700">

                      <p>
                        The methodology is commonly discussed through concepts
                        such as Liquidity, Fair Value Gaps, Order Blocks,
                        Break of Structure and Change of Character. These ideas
                        are most useful when they are read together rather
                        than treated as independent buy or sell signals.
                      </p>

                      <p>
                        A typical analysis starts with context. The trader
                        identifies the directional structure, maps visible
                        highs and lows where liquidity may be resting, then
                        watches the reaction when price reaches those areas.
                        Displacement and structural confirmation can then help
                        narrow down an area of interest.
                      </p>

                    </div>


                    <div className="mt-4 rounded-[18px] border border-blue-200 bg-blue-50/60 p-4">

                      <div className="flex items-start gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[14px] font-black text-white">
                          !
                        </div>

                        <div>

                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            Do not start by memorizing every ICT setup
                          </h3>

                          <p className="mt-2 text-[14px] leading-7 text-slate-700">
                            First learn to answer three questions: what is the
                            market structure, where is liquidity likely to
                            rest, and how did price react after interacting
                            with that liquidity?
                          </p>

                        </div>

                      </div>

                    </div>


                    <div className="mt-4 border-l-[3px] border-brand-500 pl-3">

                      <h3 className="text-[15px] font-black text-slate-950">
                        Is ICT the same as an indicator-based strategy?
                      </h3>

                      <p className="mt-1.5 text-[14px] leading-7 text-slate-600">
                        No. The framework relies primarily on price behavior
                        rather than a fixed indicator signal. Traders may use
                        additional tools, but the core analysis is based on
                        price action, structure, liquidity and timing.
                      </p>

                    </div>

                  </div>


                  {/* SIDE FACTS */}
                  <aside>

                    <div className="space-y-2.5">

                      {[
                        {
                          label: "Analysis style",
                          value: "Price Action",
                          text: "Reading price behavior and context",
                        },
                        {
                          label: "Core concept",
                          value: "Liquidity",
                          text: "Mapping where orders may cluster",
                        },
                        {
                          label: "Difficulty",
                          value: "Medium → Advanced",
                          text: "Requires chart study and practice",
                        },
                        {
                          label: "Markets",
                          value: "Forex & More",
                          text: "Concepts are used across several markets",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3"
                        >

                          <div className="text-[10px] font-black text-slate-500">
                            {item.label}
                          </div>

                          <div className="mt-1 text-[15px] font-black text-slate-950">
                            {item.value}
                          </div>

                          <div className="mt-1 text-[11px] leading-5 text-slate-500">
                            {item.text}
                          </div>

                        </div>
                      ))}

                    </div>

                  </aside>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              02 - HOW ICT WORKS
          ================================================= */}

          <section
            id="how-ict-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>02 — The Big Picture</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                How Does the ICT Trading Strategy Work?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A practical ICT workflow starts with context rather than an
                entry signal. The trader first reads market structure, maps
                liquidity, waits for price to interact with that liquidity,
                then looks for confirmation and a logical area to manage an
                entry.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP STEPS */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "Read the context",
                    text: "Start with market direction and structure on a useful higher timeframe.",
                  },
                  {
                    no: "02",
                    title: "Map liquidity",
                    text: "Identify obvious highs, lows and levels where orders may be clustered.",
                  },
                  {
                    no: "03",
                    title: "Wait for the sweep",
                    text: "Watch how price behaves after trading through a liquidity area.",
                  },
                  {
                    no: "04",
                    title: "Look for confirmation",
                    text: "A structure shift, displacement, FVG or Order Block may support the setup.",
                  },
                  {
                    no: "05",
                    title: "Plan execution",
                    text: "Define the entry, invalidation, target and risk before placing the trade.",
                  },
                ].map((step) => (
                  <article
                    key={step.no}
                    className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm"
                  >

                    <div className="absolute left-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#1e5bb8_0%,#60a5fa_100%)]" />

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-600 text-[11px] font-black text-white">
                        {step.no}
                      </div>

                      <h3 className="text-[16px] font-black leading-6 text-slate-950">
                        {step.title}
                      </h3>

                    </div>

                    <p className="mt-3 text-[13px] leading-6 text-slate-600">
                      {step.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE STEPS */}
              <div className="md:hidden">

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

                  {[
                    {
                      no: "01",
                      title: "Read the context",
                      text: "Start with market direction and structure.",
                    },
                    {
                      no: "02",
                      title: "Map liquidity",
                      text: "Mark obvious highs, lows and liquidity pools.",
                    },
                    {
                      no: "03",
                      title: "Wait for the sweep",
                      text: "Let price interact with liquidity before reacting.",
                    },
                    {
                      no: "04",
                      title: "Find confirmation",
                      text: "Watch for structure change and a relevant FVG or Order Block.",
                    },
                    {
                      no: "05",
                      title: "Plan the trade",
                      text: "Define entry, stop, target and risk before execution.",
                    },
                  ].map((step, index) => (
                    <div
                      key={step.no}
                      className={`px-3.5 py-3 ${
                        index !== 4
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                          {step.no}
                        </div>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {step.title}
                        </h3>

                      </div>

                      <p className="mt-1.5 pl-11 text-[12px] leading-6 text-slate-600">
                        {step.text}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              {/* BEGINNER EXAMPLE */}
              <div className="mt-4 rounded-[17px] border border-brand-100 bg-brand-50/50 p-4">

                <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
                  What does this look like in practice?
                </h3>

                <p className="mt-2 text-[13px] leading-7 text-slate-700 md:text-[14px]">
                  Imagine the higher-timeframe context is bullish, but price
                  is moving toward a visible low. Instead of buying
                  immediately, an ICT trader may wait for price to trade below
                  that low, take sell-side liquidity and then show a bullish
                  shift in structure. A relevant FVG or Order Block can then
                  become an area to study for execution.
                </p>

              </div>


              {/* CHART */}
              <div className="mt-5">
                <ICTOverviewChart />
              </div>

            </div>

          </section>


          {/* =================================================
              03 - MARKET STRUCTURE
          ================================================= */}

          <section
            id="market-structure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>03 — Market Structure</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                ICT Market Structure: HH, HL, LH and LL Explained
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Market structure is one of the first concepts to understand
                before studying liquidity, Fair Value Gaps or Order Blocks.
                Higher highs and higher lows generally describe bullish
                structure, while lower highs and lower lows describe bearish
                structure.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP COMPARISON */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-4">

                {/* BULLISH */}
                <div className="rounded-[20px] border border-green-100 bg-green-50/50 p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wide text-green-700">
                        Bullish Structure
                      </span>

                      <h3 className="mt-1.5 text-[20px] font-black text-slate-950">
                        Higher Highs + Higher Lows
                      </h3>
                    </div>

                    <div className="flex gap-2">

                      <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-green-700">
                        HH
                      </span>

                      <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-green-700">
                        HL
                      </span>

                    </div>

                  </div>

                  <p className="mt-3 text-[14px] leading-7 text-slate-700">
                    A simplified bullish structure forms when price continues
                    to create higher swing highs and higher swing lows. It
                    suggests buyers are still able to push price into new
                    territory.
                  </p>

                  <div className="mt-3 text-[11px] text-green-800">
                    HH = Higher High &nbsp; • &nbsp; HL = Higher Low
                  </div>

                </div>


                {/* BEARISH */}
                <div className="rounded-[20px] border border-rose-100 bg-rose-50/50 p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wide text-rose-700">
                        Bearish Structure
                      </span>

                      <h3 className="mt-1.5 text-[20px] font-black text-slate-950">
                        Lower Highs + Lower Lows
                      </h3>
                    </div>

                    <div className="flex gap-2">

                      <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-rose-700">
                        LH
                      </span>

                      <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-black text-rose-700">
                        LL
                      </span>

                    </div>

                  </div>

                  <p className="mt-3 text-[14px] leading-7 text-slate-700">
                    A simplified bearish structure forms when price produces
                    lower swing highs and lower swing lows, showing that
                    sellers continue to control the directional sequence.
                  </p>

                  <div className="mt-3 text-[11px] text-rose-800">
                    LH = Lower High &nbsp; • &nbsp; LL = Lower Low
                  </div>

                </div>

              </div>


              {/* MOBILE COMPARISON */}
              <div className="md:hidden">

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

                  {/* BULLISH */}
                  <div className="border-b border-slate-100 p-3.5">

                    <div className="flex items-center justify-between gap-3">

                      <div>
                        <span className="text-[9px] font-black uppercase text-green-700">
                          Bullish Structure
                        </span>

                        <h3 className="mt-1 text-[16px] font-black text-slate-950">
                          Higher Highs + Higher Lows
                        </h3>
                      </div>

                      <div className="flex gap-1.5">

                        <span className="rounded-lg bg-green-50 px-2 py-1 text-[9px] font-black text-green-700">
                          HH
                        </span>

                        <span className="rounded-lg bg-green-50 px-2 py-1 text-[9px] font-black text-green-700">
                          HL
                        </span>

                      </div>

                    </div>

                    <p className="mt-2 text-[13px] leading-6 text-slate-600">
                      Higher highs and higher lows describe a bullish
                      structural sequence.
                    </p>

                  </div>


                  {/* BEARISH */}
                  <div className="p-3.5">

                    <div className="flex items-center justify-between gap-3">

                      <div>
                        <span className="text-[9px] font-black uppercase text-rose-700">
                          Bearish Structure
                        </span>

                        <h3 className="mt-1 text-[16px] font-black text-slate-950">
                          Lower Highs + Lower Lows
                        </h3>
                      </div>

                      <div className="flex gap-1.5">

                        <span className="rounded-lg bg-rose-50 px-2 py-1 text-[9px] font-black text-rose-700">
                          LH
                        </span>

                        <span className="rounded-lg bg-rose-50 px-2 py-1 text-[9px] font-black text-rose-700">
                          LL
                        </span>

                      </div>

                    </div>

                    <p className="mt-2 text-[13px] leading-6 text-slate-600">
                      Lower highs and lower lows describe a bearish structural
                      sequence.
                    </p>

                  </div>

                </div>

              </div>


              {/* NOTE */}
              <div className="mt-4">

                <ImportantBox title="Do not label every small swing as a new market structure">
                  Choose the timeframe that defines your trading context first.
                  A lower timeframe can help refine an entry, but constantly
                  changing structural bias with every small candle can make the
                  analysis inconsistent.
                </ImportantBox>

              </div>


              {/* CHART */}
              <div className="mt-5">
                <MarketStructureChart />
              </div>

            </div>

          </section>
                    {/* =================================================
              04 - LIQUIDITY
          ================================================= */}

          <section
            id="liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>04 — Liquidity</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                ICT Liquidity Explained: Buy-Side and Sell-Side Liquidity
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Liquidity is one of the core ideas in ICT trading. Traders
                often focus on obvious highs and lows because stop orders and
                breakout orders may cluster around those areas. The goal is
                not simply to trade every high or low, but to understand how
                price behaves when those liquidity pools are reached.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* BUY / SELL LIQUIDITY */}
              <div className="grid gap-3 md:grid-cols-2">

                {/* BUY-SIDE */}
                <div className="rounded-[18px] border border-amber-200 bg-amber-50/50 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <span className="text-[9px] font-black uppercase text-amber-700">
                        Buy-Side Liquidity
                      </span>

                      <h3 className="mt-1 text-[17px] font-black text-slate-950">
                        Liquidity Above Highs
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-amber-500 text-[11px] font-black text-white">
                      BSL
                    </div>

                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
                    Buy-side liquidity commonly refers to orders resting above
                    visible swing highs, equal highs or other obvious
                    resistance areas. This can include stop losses from short
                    positions and breakout buy orders.
                  </p>

                </div>


                {/* SELL-SIDE */}
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <span className="text-[9px] font-black uppercase text-brand-600">
                        Sell-Side Liquidity
                      </span>

                      <h3 className="mt-1 text-[17px] font-black text-slate-950">
                        Liquidity Below Lows
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-600 text-[11px] font-black text-white">
                      SSL
                    </div>

                  </div>

                  <p className="mt-3 text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
                    Sell-side liquidity commonly refers to orders located
                    below obvious swing lows, equal lows or support zones. It
                    may include stop losses from long positions and breakout
                    sell orders.
                  </p>

                </div>

              </div>


              {/* WHERE LIQUIDITY FORMS */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <h3 className="text-[16px] font-black text-slate-950">
                  Where Do ICT Traders Look for Liquidity?
                </h3>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">

                  {[
                    "Above previous highs",
                    "Below previous lows",
                    "Equal highs / equal lows",
                    "Session highs and lows",
                    "Obvious price levels",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />

                      <span className="text-[12px] font-bold leading-5 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>


              {/* LIQUIDITY CHART */}
              <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
                        Example of a Buy-Side Liquidity Sweep
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
                        Similar highs followed by a move through liquidity
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-black text-amber-700">
                      Liquidity
                    </span>

                  </div>

                </div>


                {/* DESKTOP */}
                <div className="hidden md:block">

                  <svg
                    viewBox="0 0 1000 470"
                    className="block w-full"
                    role="img"
                    aria-label="Buy-side liquidity sweep example in ICT trading"
                  >
                    <rect width="1000" height="470" fill="#ffffff" />

                    {[100, 180, 260, 340, 420].map((y) => (
                      <line
                        key={`liq-en-${y}`}
                        x1="70"
                        y1={y}
                        x2="930"
                        y2={y}
                        stroke="#f1f5f9"
                      />
                    ))}

                    <rect
                      x="130"
                      y="110"
                      width="555"
                      height="52"
                      rx="10"
                      fill="#fff7ed"
                      fillOpacity="0.65"
                    />

                    <line
                      x1="145"
                      y1="160"
                      x2="685"
                      y2="160"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeDasharray="9 7"
                    />

                    <text
                      x="145"
                      y="135"
                      fontSize="17"
                      fontWeight="900"
                      fill="#b45309"
                    >
                      Buy-side Liquidity
                    </text>

                    <polyline
                      points="
                        90,390
                        175,300
                        250,345
                        330,190
                        410,325
                        495,185
                        580,315
                        665,175
                        745,92
                        820,245
                        920,320
                      "
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle cx="330" cy="190" r="8" fill="#f59e0b" />
                    <circle cx="495" cy="185" r="8" fill="#f59e0b" />
                    <circle cx="665" cy="175" r="8" fill="#f59e0b" />

                    <circle
                      cx="745"
                      cy="92"
                      r="11"
                      fill="#fff7ed"
                      stroke="#f97316"
                      strokeWidth="4"
                    />

                    <line
                      x1="745"
                      y1="76"
                      x2="745"
                      y2="58"
                      stroke="#f97316"
                      strokeWidth="2.5"
                    />

                    <text
                      x="745"
                      y="32"
                      textAnchor="middle"
                      fontSize="17"
                      fontWeight="900"
                      fill="#ea580c"
                    >
                      Liquidity Sweep
                    </text>

                    <text
                      x="745"
                      y="52"
                      textAnchor="middle"
                      fontSize="11"
                      fill="#64748b"
                    >
                      Price trades above the highs
                    </text>

                    <rect
                      x="675"
                      y="350"
                      width="245"
                      height="70"
                      rx="14"
                      fill="#f8fafc"
                      stroke="#e2e8f0"
                    />

                    <text
                      x="797"
                      y="380"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="900"
                      fill="#0f172a"
                    >
                      A sweep is not an entry signal
                    </text>

                    <text
                      x="797"
                      y="404"
                      textAnchor="middle"
                      fontSize="12"
                      fill="#64748b"
                    >
                      Context and reaction still matter
                    </text>

                  </svg>

                </div>


                {/* MOBILE PREVIEW */}
                <div className="md:hidden">

                  <a
                    href="#liquidity-chart-fullscreen-en"
                    className="group block cursor-zoom-in"
                    aria-label="Open liquidity chart at full size"
                  >

                    <svg
                      viewBox="0 0 360 390"
                      className="block w-full"
                      role="img"
                      aria-label="Mobile buy-side liquidity example"
                    >
                      <rect width="360" height="390" fill="#ffffff" />

                      {[80, 145, 210, 275, 340].map((y) => (
                        <line
                          key={`liq-mobile-en-${y}`}
                          x1="25"
                          y1={y}
                          x2="335"
                          y2={y}
                          stroke="#eef2f7"
                        />
                      ))}

                      <line
                        x1="40"
                        y1="120"
                        x2="220"
                        y2="120"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="7 5"
                      />

                      <text
                        x="42"
                        y="103"
                        fontSize="11"
                        fontWeight="900"
                        fill="#b45309"
                      >
                        Buy-side Liquidity
                      </text>

                      <polyline
                        points="
                          30,315
                          78,260
                          118,295
                          165,205
                          205,255
                          245,175
                          275,85
                          305,225
                          335,270
                        "
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <circle cx="165" cy="205" r="6" fill="#f59e0b" />
                      <circle cx="245" cy="175" r="6" fill="#f59e0b" />

                      <circle
                        cx="275"
                        cy="85"
                        r="8"
                        fill="#fff7ed"
                        stroke="#f97316"
                        strokeWidth="3"
                      />

                      <text
                        x="290"
                        y="68"
                        fontSize="11"
                        fontWeight="900"
                        fill="#ea580c"
                      >
                        Sweep
                      </text>

                      <rect
                        x="110"
                        y="325"
                        width="180"
                        height="42"
                        rx="11"
                        fill="#f8fafc"
                        stroke="#e2e8f0"
                      />

                      <text
                        x="200"
                        y="350"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#334155"
                      >
                        Liquidity → Sweep → Reaction
                      </text>

                    </svg>


                    <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

                      <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
                        <span>Enlarge chart</span>
                        <span className="text-[14px]">↗</span>
                      </div>

                    </div>

                  </a>

                </div>


                {/* EXPLANATION */}
                <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

                  <p className="text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    <strong className="font-black text-slate-900">
                      How to read this chart:
                    </strong>{" "}
                    liquidity is shown above a cluster of similar highs. When
                    price trades above those highs, the liquidity is considered
                    taken or swept. The sweep itself does not guarantee a
                    reversal, so traders still look for structure and price
                    reaction.
                  </p>

                </div>


                {/* FULLSCREEN */}
                <div
                  id="liquidity-chart-fullscreen-en"
                  className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
                >

                  <a
                    href="#liquidity"
                    className="absolute inset-0"
                    aria-label="Close liquidity chart"
                  />

                  <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

                    <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                      <div>
                        <div className="text-[14px] font-black text-slate-950">
                          Buy-Side Liquidity Example
                        </div>

                        <div className="mt-0.5 text-[10px] text-slate-500">
                          Similar highs followed by a liquidity sweep
                        </div>
                      </div>

                      <a
                        href="#liquidity"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
                        aria-label="Close"
                      >
                        ×
                      </a>

                    </div>


                    <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-[11px] font-bold text-brand-700 md:hidden">
                      <span className="text-[16px]">↔</span>
                      <span>Swipe left or right to explore the full chart</span>
                    </div>


                    <div className="overflow-auto bg-white p-2">

                      <svg
                        viewBox="0 0 1000 470"
                        className="block min-w-[820px] w-full"
                        role="img"
                        aria-label="Full buy-side liquidity sweep chart"
                      >
                        <rect width="1000" height="470" fill="#ffffff" />

                        {[100, 180, 260, 340, 420].map((y) => (
                          <line
                            key={`liq-full-en-${y}`}
                            x1="70"
                            y1={y}
                            x2="930"
                            y2={y}
                            stroke="#f1f5f9"
                          />
                        ))}

                        <rect
                          x="130"
                          y="110"
                          width="555"
                          height="52"
                          rx="10"
                          fill="#fff7ed"
                          fillOpacity="0.65"
                        />

                        <line
                          x1="145"
                          y1="160"
                          x2="685"
                          y2="160"
                          stroke="#f59e0b"
                          strokeWidth="3"
                          strokeDasharray="9 7"
                        />

                        <text
                          x="145"
                          y="135"
                          fontSize="17"
                          fontWeight="900"
                          fill="#b45309"
                        >
                          Buy-side Liquidity
                        </text>

                        <polyline
                          points="
                            90,390
                            175,300
                            250,345
                            330,190
                            410,325
                            495,185
                            580,315
                            665,175
                            745,92
                            820,245
                            920,320
                          "
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <circle cx="330" cy="190" r="8" fill="#f59e0b" />
                        <circle cx="495" cy="185" r="8" fill="#f59e0b" />
                        <circle cx="665" cy="175" r="8" fill="#f59e0b" />

                        <circle
                          cx="745"
                          cy="92"
                          r="11"
                          fill="#fff7ed"
                          stroke="#f97316"
                          strokeWidth="4"
                        />

                        <text
                          x="745"
                          y="32"
                          textAnchor="middle"
                          fontSize="17"
                          fontWeight="900"
                          fill="#ea580c"
                        >
                          Liquidity Sweep
                        </text>

                        <text
                          x="745"
                          y="52"
                          textAnchor="middle"
                          fontSize="11"
                          fill="#64748b"
                        >
                          Price trades above the highs
                        </text>

                      </svg>

                    </div>

                  </div>

                </div>

              </div>


              {/* BOTTOM NOTES */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
                      !
                    </div>

                    <div>

                      <h3 className="text-[15px] font-black leading-6 text-slate-950">
                        A liquidity sweep does not guarantee a reversal
                      </h3>

                      <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                        Price can trade through liquidity and continue in the
                        same direction. A sweep is best read together with
                        market structure, displacement and the broader setup.
                      </p>

                    </div>

                  </div>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-white p-4">

                  <h3 className="text-[15px] font-black text-slate-950">
                    Want a deeper explanation of liquidity?
                  </h3>

                  <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                    Read our dedicated guide to liquidity, stop clusters and
                    how obvious highs and lows can influence price behavior.
                  </p>

                  <Link
                    href="/en/learn-trading/liquidity"
                    className="mt-3 inline-flex items-center gap-2 text-[12px] font-black text-brand-600 hover:underline"
                  >
                    Read the liquidity guide
                    <span aria-hidden="true">→</span>
                  </Link>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              05 - FAIR VALUE GAP
          ================================================= */}

          <section
            id="fvg"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>05 — Fair Value Gap</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                What Is a Fair Value Gap (FVG) in ICT Trading?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                A Fair Value Gap is a three-candle price imbalance created
                when price moves aggressively and leaves limited overlap
                between the first and third candles. ICT traders often monitor
                these areas because price may revisit part of the imbalance
                later.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-3">

                <div className="rounded-[18px] border border-blue-100 bg-blue-50/50 p-4">

                  <span className="text-[9px] font-black uppercase text-blue-700">
                    01 — Formation
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    How Does an FVG Form?
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    A strong middle candle creates a rapid move and leaves an
                    area where the first and third candles do not fully
                    overlap.
                  </p>

                </div>


                <div className="rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                  <span className="text-[9px] font-black uppercase text-slate-500">
                    02 — Purpose
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    Why Do Traders Watch It?
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    The imbalance can become an area of interest if price
                    retraces after the initial displacement.
                  </p>

                </div>


                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <span className="text-[9px] font-black uppercase text-brand-600">
                    03 — Context
                  </span>

                  <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                    When Is It More Relevant?
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    An FVG becomes more meaningful when it aligns with
                    structure, liquidity, displacement and a logical trading
                    narrative.
                  </p>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  What Does “Imbalance” Mean?
                </h3>

                <p className="mt-1.5 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                  In this context, imbalance refers to a rapid directional
                  move where price did not trade evenly through every level.
                  It is not the same as a traditional market-opening gap.
                </p>

              </div>


              {/* FVG CHART */}
              <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
                        Simplified Fair Value Gap Example
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
                        A three-candle imbalance created by displacement
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[9px] font-black text-blue-700">
                      FVG
                    </span>

                  </div>

                </div>


                {/* DESKTOP */}
                <div className="hidden md:block">

                  <svg
                    viewBox="0 0 900 470"
                    className="block w-full"
                    role="img"
                    aria-label="Fair Value Gap example using three candles"
                  >
                    <rect width="900" height="470" fill="#ffffff" />

                    {[90, 160, 230, 300, 370].map((y) => (
                      <line
                        key={`fvg-en-${y}`}
                        x1="65"
                        y1={y}
                        x2="835"
                        y2={y}
                        stroke="#f1f5f9"
                      />
                    ))}

                    <line
                      x1="220"
                      y1="280"
                      x2="220"
                      y2="390"
                      stroke="#16a34a"
                      strokeWidth="4"
                    />

                    <rect
                      x="194"
                      y="305"
                      width="52"
                      height="62"
                      rx="5"
                      fill="#22c55e"
                    />

                    <line
                      x1="440"
                      y1="115"
                      x2="440"
                      y2="350"
                      stroke="#16a34a"
                      strokeWidth="4"
                    />

                    <rect
                      x="408"
                      y="155"
                      width="64"
                      height="150"
                      rx="5"
                      fill="#16a34a"
                    />

                    <line
                      x1="655"
                      y1="90"
                      x2="655"
                      y2="245"
                      stroke="#16a34a"
                      strokeWidth="4"
                    />

                    <rect
                      x="629"
                      y="125"
                      width="52"
                      height="80"
                      rx="5"
                      fill="#22c55e"
                    />

                    <rect
                      x="247"
                      y="205"
                      width="382"
                      height="100"
                      rx="14"
                      fill="#dbeafe"
                      fillOpacity="0.82"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                    />

                    <text
                      x="438"
                      y="250"
                      textAnchor="middle"
                      fontSize="28"
                      fontWeight="900"
                      fill="#1d4ed8"
                    >
                      FVG
                    </text>

                    <text
                      x="438"
                      y="278"
                      textAnchor="middle"
                      fontSize="14"
                      fill="#475569"
                    >
                      Fair Value Gap
                    </text>

                    <text
                      x="220"
                      y="425"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      fill="#64748b"
                    >
                      Candle 1
                    </text>

                    <text
                      x="440"
                      y="425"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      fill="#64748b"
                    >
                      Displacement
                    </text>

                    <text
                      x="655"
                      y="425"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      fill="#64748b"
                    >
                      Candle 3
                    </text>

                  </svg>

                </div>


                {/* MOBILE */}
                <div className="md:hidden">

                  <a
                    href="#fvg-chart-fullscreen-en"
                    className="group block cursor-zoom-in"
                    aria-label="Open Fair Value Gap chart at full size"
                  >

                    <svg
                      viewBox="0 0 360 350"
                      className="block w-full"
                      role="img"
                      aria-label="Mobile Fair Value Gap example"
                    >
                      <rect width="360" height="350" fill="#ffffff" />

                      {[70, 130, 190, 250, 310].map((y) => (
                        <line
                          key={`fvg-mobile-en-${y}`}
                          x1="25"
                          y1={y}
                          x2="335"
                          y2={y}
                          stroke="#eef2f7"
                        />
                      ))}

                      <line
                        x1="78"
                        y1="215"
                        x2="78"
                        y2="300"
                        stroke="#16a34a"
                        strokeWidth="3"
                      />

                      <rect
                        x="61"
                        y="235"
                        width="34"
                        height="48"
                        rx="4"
                        fill="#22c55e"
                      />

                      <line
                        x1="180"
                        y1="88"
                        x2="180"
                        y2="260"
                        stroke="#16a34a"
                        strokeWidth="3"
                      />

                      <rect
                        x="160"
                        y="115"
                        width="40"
                        height="120"
                        rx="4"
                        fill="#16a34a"
                      />

                      <line
                        x1="285"
                        y1="65"
                        x2="285"
                        y2="185"
                        stroke="#16a34a"
                        strokeWidth="3"
                      />

                      <rect
                        x="268"
                        y="92"
                        width="34"
                        height="58"
                        rx="4"
                        fill="#22c55e"
                      />

                      <rect
                        x="96"
                        y="150"
                        width="172"
                        height="85"
                        rx="10"
                        fill="#dbeafe"
                        fillOpacity="0.85"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />

                      <text
                        x="182"
                        y="190"
                        textAnchor="middle"
                        fontSize="21"
                        fontWeight="900"
                        fill="#1d4ed8"
                      >
                        FVG
                      </text>

                      <text
                        x="182"
                        y="213"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#475569"
                      >
                        Fair Value Gap
                      </text>

                      <text
                        x="78"
                        y="325"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="800"
                        fill="#64748b"
                      >
                        Candle 1
                      </text>

                      <text
                        x="180"
                        y="325"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="800"
                        fill="#64748b"
                      >
                        Displacement
                      </text>

                      <text
                        x="285"
                        y="325"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="800"
                        fill="#64748b"
                      >
                        Candle 3
                      </text>

                    </svg>


                    <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

                      <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
                        <span>Enlarge chart</span>
                        <span className="text-[14px]">↗</span>
                      </div>

                    </div>

                  </a>

                </div>


                {/* EXPLANATION */}
                <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

                  <p className="text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    <strong className="font-black text-slate-900">
                      How to read the example:
                    </strong>{" "}
                    the middle candle creates strong displacement. The area
                    between candle one and candle three that is not fully
                    overlapped becomes the Fair Value Gap.
                  </p>

                </div>


                {/* FULLSCREEN */}
                <div
                  id="fvg-chart-fullscreen-en"
                  className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
                >

                  <a
                    href="#fvg"
                    className="absolute inset-0"
                    aria-label="Close Fair Value Gap chart"
                  />

                  <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

                    <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                      <div>
                        <div className="text-[14px] font-black text-slate-950">
                          Fair Value Gap Example
                        </div>

                        <div className="mt-0.5 text-[10px] text-slate-500">
                          Three-candle imbalance created by displacement
                        </div>
                      </div>

                      <a
                        href="#fvg"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
                        aria-label="Close"
                      >
                        ×
                      </a>

                    </div>


                    <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-[11px] font-bold text-brand-700 md:hidden">
                      <span className="text-[16px]">↔</span>
                      <span>Swipe left or right to explore the full chart</span>
                    </div>


                    <div className="overflow-auto bg-white p-2">

                      <svg
                        viewBox="0 0 900 470"
                        className="block min-w-[760px] w-full"
                        role="img"
                        aria-label="Full Fair Value Gap chart"
                      >
                        <rect width="900" height="470" fill="#ffffff" />

                        {[90, 160, 230, 300, 370].map((y) => (
                          <line
                            key={`fvg-full-en-${y}`}
                            x1="65"
                            y1={y}
                            x2="835"
                            y2={y}
                            stroke="#f1f5f9"
                          />
                        ))}

                        <line
                          x1="220"
                          y1="280"
                          x2="220"
                          y2="390"
                          stroke="#16a34a"
                          strokeWidth="4"
                        />

                        <rect
                          x="194"
                          y="305"
                          width="52"
                          height="62"
                          rx="5"
                          fill="#22c55e"
                        />

                        <line
                          x1="440"
                          y1="115"
                          x2="440"
                          y2="350"
                          stroke="#16a34a"
                          strokeWidth="4"
                        />

                        <rect
                          x="408"
                          y="155"
                          width="64"
                          height="150"
                          rx="5"
                          fill="#16a34a"
                        />

                        <line
                          x1="655"
                          y1="90"
                          x2="655"
                          y2="245"
                          stroke="#16a34a"
                          strokeWidth="4"
                        />

                        <rect
                          x="629"
                          y="125"
                          width="52"
                          height="80"
                          rx="5"
                          fill="#22c55e"
                        />

                        <rect
                          x="247"
                          y="205"
                          width="382"
                          height="100"
                          rx="14"
                          fill="#dbeafe"
                          fillOpacity="0.82"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                          strokeDasharray="8 6"
                        />

                        <text
                          x="438"
                          y="250"
                          textAnchor="middle"
                          fontSize="28"
                          fontWeight="900"
                          fill="#1d4ed8"
                        >
                          FVG
                        </text>

                        <text
                          x="438"
                          y="278"
                          textAnchor="middle"
                          fontSize="14"
                          fill="#475569"
                        >
                          Fair Value Gap
                        </text>

                      </svg>

                    </div>

                  </div>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
                    !
                  </div>

                  <div>

                    <h3 className="text-[15px] font-black leading-6 text-slate-950">
                      Not every Fair Value Gap is a trade setup
                    </h3>

                    <p className="mt-1.5 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                      Price does not have to revisit or respect every FVG. The
                      imbalance is more useful when it fits the broader market
                      structure, liquidity story and trade location.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              06 - ORDER BLOCK
          ================================================= */}

          <section
            id="order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fff9_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>06 — Order Blocks</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                What Is an Order Block in ICT Trading?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                In ICT terminology, an Order Block is a price area associated
                with a strong move away from that zone. Traders usually look
                for more than just the last bullish or bearish candle; the
                area is more meaningful when it is supported by structure,
                displacement and liquidity.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2">

                <div className="rounded-[18px] border border-green-100 bg-green-50/50 p-4">

                  <span className="text-[9px] font-black uppercase text-green-700">
                    Bullish
                  </span>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Bullish Order Block
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                    In a simplified example, this can be a bearish price area
                    that precedes strong bullish displacement and a meaningful
                    structural move.
                  </p>

                </div>


                <div className="rounded-[18px] border border-rose-100 bg-rose-50/50 p-4">

                  <span className="text-[9px] font-black uppercase text-rose-700">
                    Bearish
                  </span>

                  <h3 className="mt-1 text-[17px] font-black text-slate-950">
                    Bearish Order Block
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                    In a simplified example, this can be a bullish price area
                    that precedes strong bearish displacement and a meaningful
                    break or shift in structure.
                  </p>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
                    !
                  </div>

                  <div>

                    <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
                      Context matters more than the candle shape
                    </h3>

                    <p className="mt-1.5 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                      Avoid marking every candle before a strong move as an
                      Order Block. Ask whether the move involved meaningful
                      liquidity, displacement and a structural break or shift.
                    </p>

                  </div>

                </div>

              </div>


              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  What Makes an Order Block More Relevant?
                </h3>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

                  {[
                    "Clear market context",
                    "Strong displacement",
                    "Structural break or shift",
                    "Liquidity alignment",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 py-2.5"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />

                      <span className="text-[12px] font-bold leading-5 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>


              {/* ORDER BLOCK CHART */}
              <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
                        Simplified Bullish Order Block Example
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
                        Area of interest → displacement → possible revisit
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[9px] font-black text-green-700">
                      Order Block
                    </span>

                  </div>

                </div>


                {/* DESKTOP */}
                <div className="hidden md:block">

                  <svg
                    viewBox="0 0 1000 500"
                    className="block w-full"
                    role="img"
                    aria-label="Bullish Order Block example in ICT trading"
                  >
                    <rect width="1000" height="500" fill="#ffffff" />

                    {[95, 170, 245, 320, 395].map((y) => (
                      <line
                        key={`ob-en-${y}`}
                        x1="70"
                        y1={y}
                        x2="930"
                        y2={y}
                        stroke="#f1f5f9"
                      />
                    ))}

                    <rect
                      x="205"
                      y="325"
                      width="340"
                      height="88"
                      rx="14"
                      fill="#f8fafc"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                    />

                    <polyline
                      points="
                        100,180
                        165,250
                        230,215
                        300,345
                        375,370
                        450,320
                        520,195
                        590,140
                        665,200
                        740,120
                        825,82
                        900,115
                      "
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <text
                      x="375"
                      y="382"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="900"
                      fill="#0f172a"
                    >
                      Bullish Order Block
                    </text>

                    <text
                      x="375"
                      y="400"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#64748b"
                    >
                      Potential area of interest
                    </text>

                    <circle
                      cx="225"
                      cy="346"
                      r="5"
                      fill="#22c55e"
                    />

                    <line
                      x1="525"
                      y1="255"
                      x2="575"
                      y2="205"
                      stroke="#16a34a"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    <text
                      x="625"
                      y="185"
                      textAnchor="middle"
                      fontSize="15"
                      fontWeight="900"
                      fill="#15803d"
                    >
                      Displacement
                    </text>

                    <path
                      d="M 825 85 Q 745 165 548 325"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeDasharray="9 7"
                    />

                    <text
                      x="710"
                      y="270"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="900"
                      fill="#2563eb"
                    >
                      Possible revisit
                    </text>

                  </svg>

                </div>


                {/* MOBILE */}
                <div className="md:hidden">

                  <a
                    href="#order-block-chart-fullscreen-en"
                    className="group block cursor-zoom-in"
                    aria-label="Open Order Block chart at full size"
                  >

                    <svg
                      viewBox="0 0 360 345"
                      className="block w-full"
                      role="img"
                      aria-label="Mobile bullish Order Block example"
                    >
                      <rect width="360" height="345" fill="#ffffff" />

                      {[70, 130, 190, 250, 310].map((y) => (
                        <line
                          key={`ob-mobile-en-${y}`}
                          x1="25"
                          y1={y}
                          x2="335"
                          y2={y}
                          stroke="#eef2f7"
                        />
                      ))}

                      <rect
                        x="38"
                        y="240"
                        width="158"
                        height="62"
                        rx="10"
                        fill="#f8fafc"
                        stroke="#22c55e"
                        strokeWidth="2"
                      />

                      <polyline
                        points="
                          18,108
                          62,158
                          102,136
                          142,252
                          178,268
                          212,232
                          248,145
                          280,108
                          314,136
                          340,96
                        "
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <text
                        x="117"
                        y="278"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="900"
                        fill="#0f172a"
                      >
                        Bullish Order Block
                      </text>

                      <text
                        x="117"
                        y="292"
                        textAnchor="middle"
                        fontSize="7"
                        fill="#64748b"
                      >
                        Area of interest
                      </text>

                      <circle
                        cx="52"
                        cy="255"
                        r="4"
                        fill="#22c55e"
                      />

                      <line
                        x1="210"
                        y1="215"
                        x2="248"
                        y2="170"
                        stroke="#16a34a"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <text
                        x="285"
                        y="155"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="900"
                        fill="#15803d"
                      >
                        Displacement
                      </text>

                      <path
                        d="M 337 98 Q 287 150 205 242"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                        strokeDasharray="7 5"
                      />

                      <text
                        x="282"
                        y="205"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="900"
                        fill="#2563eb"
                      >
                        Possible revisit
                      </text>

                    </svg>


                    <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

                      <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
                        <span>Enlarge chart</span>
                        <span className="text-[14px]">↗</span>
                      </div>

                    </div>

                  </a>

                </div>


                {/* EXPLANATION */}
                <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

                  <p className="text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    <strong className="font-black text-slate-900">
                      How to read the example:
                    </strong>{" "}
                    the outlined area represents a potential Order Block.
                    Price leaves the zone with strong displacement and may
                    later revisit it. A revisit alone is not enough to justify
                    a trade.
                  </p>

                </div>


                {/* FULLSCREEN */}
                <div
                  id="order-block-chart-fullscreen-en"
                  className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
                >

                  <a
                    href="#order-block"
                    className="absolute inset-0"
                    aria-label="Close Order Block chart"
                  />

                  <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

                    <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                      <div>
                        <div className="text-[14px] font-black text-slate-950">
                          Bullish Order Block Example
                        </div>

                        <div className="mt-0.5 text-[10px] text-slate-500">
                          Order Block → Displacement → Possible Revisit
                        </div>
                      </div>

                      <a
                        href="#order-block"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
                        aria-label="Close"
                      >
                        ×
                      </a>

                    </div>


                    <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-[11px] font-bold text-brand-700 md:hidden">
                      <span className="text-[16px]">↔</span>
                      <span>Swipe left or right to explore the full chart</span>
                    </div>


                    <div className="overflow-auto bg-white p-2">

                      <svg
                        viewBox="0 0 1000 500"
                        className="block min-w-[820px] w-full"
                        role="img"
                        aria-label="Full Bullish Order Block chart"
                      >
                        <rect width="1000" height="500" fill="#ffffff" />

                        {[95, 170, 245, 320, 395].map((y) => (
                          <line
                            key={`ob-full-en-${y}`}
                            x1="70"
                            y1={y}
                            x2="930"
                            y2={y}
                            stroke="#f1f5f9"
                          />
                        ))}

                        <rect
                          x="205"
                          y="325"
                          width="340"
                          height="88"
                          rx="14"
                          fill="#f8fafc"
                          stroke="#22c55e"
                          strokeWidth="2.5"
                        />

                        <polyline
                          points="
                            100,180
                            165,250
                            230,215
                            300,345
                            375,370
                            450,320
                            520,195
                            590,140
                            665,200
                            740,120
                            825,82
                            900,115
                          "
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <text
                          x="375"
                          y="382"
                          textAnchor="middle"
                          fontSize="16"
                          fontWeight="900"
                          fill="#0f172a"
                        >
                          Bullish Order Block
                        </text>

                        <text
                          x="375"
                          y="400"
                          textAnchor="middle"
                          fontSize="10"
                          fill="#64748b"
                        >
                          Potential area of interest
                        </text>

                        <line
                          x1="525"
                          y1="255"
                          x2="575"
                          y2="205"
                          stroke="#16a34a"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />

                        <text
                          x="625"
                          y="185"
                          textAnchor="middle"
                          fontSize="15"
                          fontWeight="900"
                          fill="#15803d"
                        >
                          Displacement
                        </text>

                        <path
                          d="M 825 85 Q 745 165 548 325"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="3"
                          strokeDasharray="9 7"
                        />

                        <text
                          x="710"
                          y="270"
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="900"
                          fill="#2563eb"
                        >
                          Possible revisit
                        </text>

                      </svg>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              07 - BOS / CHOCH
          ================================================= */}

          <section
            id="bos-choch"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fff8fa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>07 — BOS & CHoCH</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                BOS vs. CHoCH in ICT Trading: What Is the Difference?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Break of Structure (BOS) and Change of Character (CHoCH) are
                used to describe important changes in market structure. In
                simplified terms, CHoCH can signal an early behavioral shift,
                while BOS is often used to describe a clearer structural
                break.
              </p>

            </div>


            <div className="p-4 md:p-7">

              <div className="grid gap-3 md:grid-cols-2">

                {/* BOS */}
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <span className="text-[9px] font-black uppercase text-brand-600">
                        Break of Structure
                      </span>

                      <h3 className="mt-1 text-[17px] font-black text-slate-950">
                        BOS — Structural Break
                      </h3>
                    </div>

                    <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[10px] font-black text-white">
                      BOS
                    </span>

                  </div>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                    BOS usually describes price breaking a meaningful
                    structural level. In a trend, it may support continuation
                    when the break occurs in the direction of the broader
                    structure.
                  </p>

                </div>


                {/* CHOCH */}
                <div className="rounded-[18px] border border-rose-100 bg-rose-50/50 p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <span className="text-[9px] font-black uppercase text-rose-600">
                        Change of Character
                      </span>

                      <h3 className="mt-1 text-[17px] font-black text-slate-950">
                        CHoCH — Early Structural Shift
                      </h3>
                    </div>

                    <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-black text-white">
                      CHoCH
                    </span>

                  </div>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                    CHoCH is commonly used to highlight an early change in
                    price behavior that may warn the previous structural
                    sequence is weakening.
                  </p>

                </div>

              </div>


              {/* QUICK DIFFERENCE */}
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">

                <h3 className="text-[15px] font-black text-slate-950">
                  The Simple Difference for Beginners
                </h3>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">

                  <div className="rounded-[12px] border border-rose-100 bg-white px-3 py-2.5">

                    <span className="text-[12px] leading-5 text-slate-700">
                      <strong className="font-black text-rose-700">
                        CHoCH:
                      </strong>{" "}
                      an early warning that market behavior may be changing.
                    </span>

                  </div>


                  <div className="rounded-[12px] border border-brand-100 bg-white px-3 py-2.5">

                    <span className="text-[12px] leading-5 text-slate-700">
                      <strong className="font-black text-brand-700">
                        BOS:
                      </strong>{" "}
                      a clearer break of a structural level.
                    </span>

                  </div>

                </div>

              </div>


              {/* BOS / CHOCH CHART */}
              <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
                        Visual Example: CHoCH Followed by BOS
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
                        Early structural shift followed by a stronger break
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[9px] font-black text-rose-700">
                      Structure
                    </span>

                  </div>

                </div>


                {/* DESKTOP */}
                <div className="hidden md:block">

                  <svg
                    viewBox="0 0 1100 500"
                    className="block w-full"
                    role="img"
                    aria-label="CHoCH followed by BOS example in ICT market structure"
                  >
                    <rect width="1100" height="500" fill="#ffffff" />

                    {[95, 170, 245, 320, 395].map((y) => (
                      <line
                        key={`bos-en-${y}`}
                        x1="65"
                        y1={y}
                        x2="1035"
                        y2={y}
                        stroke="#f1f5f9"
                      />
                    ))}

                    <polyline
                      points="
                        90,120
                        170,180
                        250,145
                        330,245
                        410,195
                        500,310
                        590,245
                        670,160
                        750,220
                        840,125
                        930,180
                        1010,82
                      "
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <line
                      x1="365"
                      y1="195"
                      x2="670"
                      y2="195"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                      strokeDasharray="9 7"
                    />

                    <text
                      x="555"
                      y="175"
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="900"
                      fill="#be123c"
                    >
                      CHoCH
                    </text>

                    <circle
                      cx="670"
                      cy="160"
                      r="10"
                      fill="#fff1f2"
                      stroke="#e11d48"
                      strokeWidth="3"
                    />

                    <line
                      x1="650"
                      y1="160"
                      x2="880"
                      y2="160"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      strokeDasharray="9 7"
                    />

                    <text
                      x="790"
                      y="140"
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="900"
                      fill="#1d4ed8"
                    >
                      BOS
                    </text>

                    <circle
                      cx="840"
                      cy="125"
                      r="10"
                      fill="#eff6ff"
                      stroke="#2563eb"
                      strokeWidth="3"
                    />

                    <rect
                      x="300"
                      y="405"
                      width="500"
                      height="42"
                      rx="18"
                      fill="#f8fafc"
                      stroke="#e2e8f0"
                    />

                    <text
                      x="550"
                      y="431"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      fill="#475569"
                    >
                      CHoCH = early shift • BOS = structural break
                    </text>

                  </svg>

                </div>


                {/* MOBILE */}
                <div className="md:hidden">

                  <a
                    href="#bos-choch-chart-fullscreen-en"
                    className="group block cursor-zoom-in"
                    aria-label="Open BOS and CHoCH chart at full size"
                  >

                    <svg
                      viewBox="0 0 360 330"
                      className="block w-full"
                      role="img"
                      aria-label="Mobile BOS and CHoCH example"
                    >
                      <rect width="360" height="330" fill="#ffffff" />

                      {[65, 125, 185, 245, 305].map((y) => (
                        <line
                          key={`bos-mobile-en-${y}`}
                          x1="25"
                          y1={y}
                          x2="335"
                          y2={y}
                          stroke="#eef2f7"
                        />
                      ))}

                      <polyline
                        points="
                          25,90
                          65,130
                          105,105
                          145,190
                          185,155
                          225,100
                          265,145
                          305,80
                          335,110
                        "
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <line
                        x1="120"
                        y1="155"
                        x2="225"
                        y2="155"
                        stroke="#e11d48"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />

                      <text
                        x="170"
                        y="142"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#be123c"
                      >
                        CHoCH
                      </text>

                      <circle
                        cx="225"
                        cy="100"
                        r="7"
                        fill="#fff1f2"
                        stroke="#e11d48"
                        strokeWidth="2.5"
                      />

                      <line
                        x1="215"
                        y1="100"
                        x2="305"
                        y2="100"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />

                      <text
                        x="265"
                        y="87"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#1d4ed8"
                      >
                        BOS
                      </text>

                      <circle
                        cx="305"
                        cy="80"
                        r="7"
                        fill="#eff6ff"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                      />

                      <rect
                        x="45"
                        y="255"
                        width="270"
                        height="48"
                        rx="12"
                        fill="#f8fafc"
                        stroke="#e2e8f0"
                      />

                      <text
                        x="180"
                        y="276"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#334155"
                      >
                        CHoCH = Early Shift
                      </text>

                      <text
                        x="180"
                        y="293"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#334155"
                      >
                        BOS = Structural Break
                      </text>

                    </svg>


                    <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

                      <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
                        <span>Enlarge chart</span>
                        <span className="text-[14px]">↗</span>
                      </div>

                    </div>

                  </a>

                </div>


                {/* EXPLANATION */}
                <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

                  <p className="text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    <strong className="font-black text-slate-900">
                      How to read the example:
                    </strong>{" "}
                    CHoCH appears first as an early shift in the structural
                    sequence. As price continues and breaks another meaningful
                    structural level, BOS provides a clearer structural break.
                  </p>

                </div>


                {/* FULLSCREEN */}
                <div
                  id="bos-choch-chart-fullscreen-en"
                  className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
                >

                  <a
                    href="#bos-choch"
                    className="absolute inset-0"
                    aria-label="Close BOS and CHoCH chart"
                  />

                  <div className="relative z-10 flex max-h-[94vh] w-full max-w-[950px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

                    <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                      <div>
                        <div className="text-[14px] font-black text-slate-950">
                          CHoCH vs. BOS
                        </div>

                        <div className="mt-0.5 text-[10px] text-slate-500">
                          Early structural shift followed by a stronger break
                        </div>
                      </div>

                      <a
                        href="#bos-choch"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
                        aria-label="Close"
                      >
                        ×
                      </a>

                    </div>


                    <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-[11px] font-bold text-brand-700 md:hidden">
                      <span className="text-[16px]">↔</span>
                      <span>Swipe left or right to explore the full chart</span>
                    </div>


                    <div className="overflow-auto bg-white p-2">

                      <svg
                        viewBox="0 0 1100 500"
                        className="block min-w-[820px] w-full"
                        role="img"
                        aria-label="Full CHoCH and BOS chart"
                      >
                        <rect width="1100" height="500" fill="#ffffff" />

                        {[95, 170, 245, 320, 395].map((y) => (
                          <line
                            key={`bos-full-en-${y}`}
                            x1="65"
                            y1={y}
                            x2="1035"
                            y2={y}
                            stroke="#f1f5f9"
                          />
                        ))}

                        <polyline
                          points="
                            90,120
                            170,180
                            250,145
                            330,245
                            410,195
                            500,310
                            590,245
                            670,160
                            750,220
                            840,125
                            930,180
                            1010,82
                          "
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <line
                          x1="365"
                          y1="195"
                          x2="670"
                          y2="195"
                          stroke="#e11d48"
                          strokeWidth="2.5"
                          strokeDasharray="9 7"
                        />

                        <text
                          x="555"
                          y="175"
                          textAnchor="middle"
                          fontSize="18"
                          fontWeight="900"
                          fill="#be123c"
                        >
                          CHoCH
                        </text>

                        <circle
                          cx="670"
                          cy="160"
                          r="10"
                          fill="#fff1f2"
                          stroke="#e11d48"
                          strokeWidth="3"
                        />

                        <line
                          x1="650"
                          y1="160"
                          x2="880"
                          y2="160"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                          strokeDasharray="9 7"
                        />

                        <text
                          x="790"
                          y="140"
                          textAnchor="middle"
                          fontSize="18"
                          fontWeight="900"
                          fill="#1d4ed8"
                        >
                          BOS
                        </text>

                        <circle
                          cx="840"
                          cy="125"
                          r="10"
                          fill="#eff6ff"
                          stroke="#2563eb"
                          strokeWidth="3"
                        />

                      </svg>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>
                    {/* =================================================
              08 - ICT KILL ZONES
          ================================================= */}

          <section
            id="kill-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>08 — Timing</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                What Are ICT Kill Zones?
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                ICT Kill Zones refer to specific trading-session windows that
                some traders monitor because liquidity and volatility may
                increase during those periods. Timing is not a standalone
                trading signal, but it can add context to an existing setup.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-3 md:gap-3">

                <div className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">

                  <span className="text-[10px] font-black text-slate-500">
                    Trading Session
                  </span>

                  <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                    London Session
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    The European open is closely watched because forex
                    liquidity and activity often increase as London trading
                    begins.
                  </p>

                </div>


                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                  <span className="text-[10px] font-black text-brand-600">
                    Trading Session
                  </span>

                  <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                    New York Session
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    The New York session can be especially active during the
                    London–New York overlap and around major U.S. economic
                    releases.
                  </p>

                </div>


                <div className="rounded-[18px] border border-amber-100 bg-amber-50/50 p-4">

                  <span className="text-[10px] font-black text-amber-700">
                    Important Note
                  </span>

                  <h3 className="mt-1.5 text-[18px] font-black text-slate-950">
                    Watch Your Time Zone
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    Session times can shift with daylight saving changes, so
                    verify the current market time instead of relying on a
                    fixed clock year-round.
                  </p>

                </div>

              </div>


              {/* MOBILE */}
              <div className="md:hidden">

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

                  <div className="border-b border-slate-100 p-3.5">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <span className="text-[9px] font-black text-slate-500">
                          Trading Session
                        </span>

                        <h3 className="mt-1 text-[16px] font-black text-slate-950">
                          London Session
                        </h3>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-slate-100 text-[11px] font-black text-slate-700">
                        01
                      </div>

                    </div>

                    <p className="mt-2 text-[13px] leading-6 text-slate-600">
                      Activity often increases as European markets open and
                      London liquidity enters the market.
                    </p>

                  </div>


                  <div className="p-3.5">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <span className="text-[9px] font-black text-brand-600">
                          Trading Session
                        </span>

                        <h3 className="mt-1 text-[16px] font-black text-slate-950">
                          New York Session
                        </h3>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[11px] font-black text-white">
                        02
                      </div>

                    </div>

                    <p className="mt-2 text-[13px] leading-6 text-slate-600">
                      The U.S. session is often most active during the overlap
                      with London and around major data releases.
                    </p>

                  </div>

                </div>


                <div className="mt-3 rounded-[16px] border border-amber-100 bg-amber-50/50 p-3.5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[13px] font-black text-white">
                      !
                    </div>

                    <div>

                      <h3 className="text-[15px] font-black text-slate-950">
                        Session times can change
                      </h3>

                      <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
                        Daylight saving time can shift the clock time of major
                        sessions. Always confirm the current market schedule.
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* IMPORTANT CONCEPT */}
              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
                    !
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-[15px] font-black leading-6 text-slate-950 md:text-[16px]">
                      Timing supports a setup — it does not create one
                    </h3>

                    <p className="mt-1.5 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                      Being inside an ICT Kill Zone does not automatically
                      create a trade. Market structure, liquidity, location
                      and confirmation still need to support the scenario.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              09 - COMPLETE TRADE EXAMPLE
          ================================================= */}

          <section
            id="example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>09 — Trade Example</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                ICT Trading Strategy Example Step by Step
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                This example combines the main ICT concepts into one
                hypothetical trade scenario, starting with market structure
                and liquidity and ending with execution, invalidation and a
                predefined target.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* DESKTOP STEPS */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "Define structure",
                    text: "The higher-timeframe context is bullish.",
                  },
                  {
                    no: "02",
                    title: "Locate liquidity",
                    text: "A visible low may hold sell-side liquidity.",
                  },
                  {
                    no: "03",
                    title: "Wait for the sweep",
                    text: "Price trades below the low and then reclaims it.",
                  },
                  {
                    no: "04",
                    title: "Watch the shift",
                    text: "Bullish CHoCH and displacement appear with an FVG.",
                  },
                  {
                    no: "05",
                    title: "Plan execution",
                    text: "Define the entry area, stop, target and risk.",
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

                      <h3 className="text-[15px] font-black leading-6 text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* MOBILE STEPS */}
              <div className="md:hidden">

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

                  {[
                    {
                      no: "01",
                      title: "Define structure",
                      text: "Start with the broader market context.",
                    },
                    {
                      no: "02",
                      title: "Locate liquidity",
                      text: "Mark an obvious low that may hold sell-side liquidity.",
                    },
                    {
                      no: "03",
                      title: "Wait for the sweep",
                      text: "Let price trade through the liquidity first.",
                    },
                    {
                      no: "04",
                      title: "Watch the shift",
                      text: "Look for structural confirmation and displacement.",
                    },
                    {
                      no: "05",
                      title: "Plan the trade",
                      text: "Define entry, stop loss, target and risk before execution.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.no}
                      className={`px-3.5 py-3 ${
                        index !== 4
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                          {item.no}
                        </div>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {item.title}
                        </h3>

                      </div>

                      <p className="mt-1.5 pl-11 text-[12px] leading-6 text-slate-600">
                        {item.text}
                      </p>

                    </div>
                  ))}

                </div>

              </div>


              {/* CORE LOGIC */}
              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
                  The setup is built from confluence, not one signal
                </h3>

                <p className="mt-1.5 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                  The logic is sequential: structure first, then liquidity,
                  then the sweep, structural confirmation and an area of
                  interest. An FVG or Order Block is more useful when it fits
                  that broader narrative.
                </p>

              </div>


              {/* =================================================
                  TRADE EXAMPLE CHART
              ================================================= */}
              <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

                {/* HEADER */}
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 md:px-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h3 className="text-[14px] font-black text-slate-950 md:text-[15px]">
                        Hypothetical ICT Trade Setup
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500 md:text-[12px]">
                        Liquidity → Sweep → CHoCH → POI → Entry → Target
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                      Educational Example
                    </span>

                  </div>

                </div>


                {/* DESKTOP CHART */}
                <div className="hidden md:block">

                  <svg
                    viewBox="0 0 1200 600"
                    className="block w-full"
                    role="img"
                    aria-label="ICT trade example showing liquidity sweep, CHoCH, order block, fair value gap, entry, stop loss and target"
                  >
                    <defs>

                      <marker
                        id="tradeEntryArrowEn"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto"
                      >
                        <path
                          d="M0 0 L10 5 L0 10 Z"
                          fill="#16a34a"
                        />
                      </marker>

                    </defs>

                    <rect width="1200" height="600" fill="#ffffff" />

                    {[95, 170, 245, 320, 395, 470, 545].map((y) => (
                      <line
                        key={`trade-en-h-${y}`}
                        x1="70"
                        y1={y}
                        x2="1130"
                        y2={y}
                        stroke="#eef2f7"
                      />
                    ))}

                    {[160, 320, 480, 640, 800, 960, 1120].map((x) => (
                      <line
                        key={`trade-en-v-${x}`}
                        x1={x}
                        y1="60"
                        x2={x}
                        y2="530"
                        stroke="#f8fafc"
                      />
                    ))}


                    {/* PRICE */}
                    <polyline
                      points="
                        90,190
                        165,145
                        235,220
                        315,175
                        395,290
                        475,360
                        545,425
                        610,285
                        690,230
                        775,285
                        850,205
                        925,250
                        1000,155
                        1075,105
                        1130,130
                      "
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />


                    {/* SELL-SIDE LIQUIDITY */}
                    <line
                      x1="135"
                      y1="395"
                      x2="505"
                      y2="395"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="9 7"
                    />

                    <text
                      x="145"
                      y="372"
                      fontSize="15"
                      fontWeight="900"
                      fill="#b45309"
                    >
                      Sell-side Liquidity
                    </text>


                    {/* SWEEP */}
                    <circle
                      cx="545"
                      cy="425"
                      r="10"
                      fill="#fff7ed"
                      stroke="#f97316"
                      strokeWidth="3"
                    />

                    <text
                      x="545"
                      y="458"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="900"
                      fill="#ea580c"
                    >
                      Liquidity Sweep
                    </text>


                    {/* CHOCH */}
                    <line
                      x1="395"
                      y1="290"
                      x2="635"
                      y2="290"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                    />

                    <text
                      x="585"
                      y="270"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="900"
                      fill="#be123c"
                    >
                      CHoCH
                    </text>


                    {/* ORDER BLOCK */}
                    <rect
                      x="610"
                      y="290"
                      width="170"
                      height="70"
                      rx="12"
                      fill="#f8fafc"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />

                    <text
                      x="695"
                      y="320"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="900"
                      fill="#0f172a"
                    >
                      Order Block
                    </text>

                    <text
                      x="695"
                      y="342"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#64748b"
                    >
                      Area of interest
                    </text>


                    {/* FVG */}
                    <rect
                      x="755"
                      y="235"
                      width="105"
                      height="65"
                      rx="10"
                      fill="#dbeafe"
                      fillOpacity="0.78"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="7 5"
                    />

                    <text
                      x="807"
                      y="274"
                      textAnchor="middle"
                      fontSize="15"
                      fontWeight="900"
                      fill="#1d4ed8"
                    >
                      FVG
                    </text>


                    {/* ENTRY */}
                    <line
                      x1="780"
                      y1="395"
                      x2="780"
                      y2="350"
                      stroke="#16a34a"
                      strokeWidth="4"
                      markerEnd="url(#tradeEntryArrowEn)"
                    />

                    <text
                      x="780"
                      y="420"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="900"
                      fill="#15803d"
                    >
                      Entry
                    </text>


                    {/* STOP LOSS */}
                    <line
                      x1="610"
                      y1="470"
                      x2="850"
                      y2="470"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                    />

                    <text
                      x="850"
                      y="490"
                      textAnchor="end"
                      fontSize="12"
                      fontWeight="900"
                      fill="#dc2626"
                    >
                      Stop Loss
                    </text>


                    {/* TARGET */}
                    <line
                      x1="860"
                      y1="135"
                      x2="1120"
                      y2="135"
                      stroke="#16a34a"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                    />

                    <text
                      x="865"
                      y="115"
                      fontSize="14"
                      fontWeight="900"
                      fill="#15803d"
                    >
                      Target / Buy-side Liquidity
                    </text>


                    {/* FLOW */}
                    <rect
                      x="155"
                      y="535"
                      width="890"
                      height="38"
                      rx="19"
                      fill="#f8fafc"
                      stroke="#e2e8f0"
                    />

                    <text
                      x="600"
                      y="560"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      fill="#475569"
                    >
                      Structure → Liquidity → Sweep → CHoCH → POI → Entry → Stop → Target
                    </text>

                  </svg>

                </div>


                {/* MOBILE PREVIEW */}
                <div className="md:hidden">

                  <a
                    href="#trade-example-fullscreen-en"
                    className="group block cursor-zoom-in"
                    aria-label="Open ICT trade example at full size"
                  >

                    <svg
                      viewBox="0 0 360 360"
                      className="block w-full"
                      role="img"
                      aria-label="Mobile ICT trade example"
                    >
                      <rect width="360" height="360" fill="#ffffff" />

                      {[65, 125, 185, 245, 305].map((y) => (
                        <line
                          key={`trade-mobile-en-${y}`}
                          x1="25"
                          y1={y}
                          x2="335"
                          y2={y}
                          stroke="#eef2f7"
                        />
                      ))}


                      {/* PRICE */}
                      <polyline
                        points="
                          25,120
                          70,95
                          110,150
                          150,125
                          190,215
                          225,260
                          260,170
                          300,135
                          337,165
                        "
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />


                      {/* LIQUIDITY */}
                      <line
                        x1="45"
                        y1="235"
                        x2="215"
                        y2="235"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />

                      <text
                        x="48"
                        y="221"
                        fontSize="9"
                        fontWeight="900"
                        fill="#b45309"
                      >
                        Liquidity
                      </text>


                      {/* SWEEP */}
                      <circle
                        cx="225"
                        cy="260"
                        r="7"
                        fill="#fff7ed"
                        stroke="#f97316"
                        strokeWidth="2.5"
                      />


                      {/* CHOCH */}
                      <line
                        x1="150"
                        y1="215"
                        x2="270"
                        y2="215"
                        stroke="#e11d48"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />

                      <text
                        x="190"
                        y="203"
                        fontSize="9"
                        fontWeight="900"
                        fill="#be123c"
                      >
                        CHoCH
                      </text>


                      {/* ORDER BLOCK */}
                      <rect
                        x="235"
                        y="215"
                        width="75"
                        height="48"
                        rx="8"
                        fill="#f8fafc"
                        stroke="#22c55e"
                        strokeWidth="1.7"
                      />

                      <text
                        x="272"
                        y="244"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="900"
                        fill="#0f172a"
                      >
                        Order Block
                      </text>


                      {/* FVG */}
                      <rect
                        x="285"
                        y="170"
                        width="48"
                        height="40"
                        rx="7"
                        fill="#dbeafe"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        strokeDasharray="5 4"
                      />

                      <text
                        x="309"
                        y="195"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="900"
                        fill="#1d4ed8"
                      >
                        FVG
                      </text>


                      {/* TARGET */}
                      <line
                        x1="250"
                        y1="95"
                        x2="335"
                        y2="95"
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />

                      <text
                        x="290"
                        y="82"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="900"
                        fill="#15803d"
                      >
                        Target
                      </text>


                      {/* FLOW */}
                      <rect
                        x="40"
                        y="295"
                        width="280"
                        height="42"
                        rx="11"
                        fill="#f8fafc"
                        stroke="#e2e8f0"
                      />

                      <text
                        x="180"
                        y="313"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="900"
                        fill="#334155"
                      >
                        Liquidity → Sweep → CHoCH
                      </text>

                      <text
                        x="180"
                        y="328"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="900"
                        fill="#334155"
                      >
                        POI → Entry → Target
                      </text>

                    </svg>


                    {/* EXPAND */}
                    <div className="flex items-center justify-center border-t border-slate-100 bg-white px-3 py-2.5">

                      <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-[11px] font-black text-brand-600">
                        <span>Enlarge chart</span>
                        <span className="text-[14px]">↗</span>
                      </div>

                    </div>

                  </a>

                </div>


                {/* EXPLANATION */}
                <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-3 md:px-5">

                  <p className="text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    <strong className="font-black text-slate-900">
                      How to read the setup:
                    </strong>{" "}
                    price first trades through sell-side liquidity, then shows
                    a bullish structural shift. An Order Block or FVG can
                    become an area to study for execution, while the stop and
                    target are defined before the trade is placed.
                  </p>

                </div>


                {/* FULLSCREEN */}
                <div
                  id="trade-example-fullscreen-en"
                  className="fixed inset-0 z-[200] hidden items-center justify-center bg-slate-950/90 p-3 target:flex"
                >

                  <a
                    href="#example"
                    className="absolute inset-0"
                    aria-label="Close ICT trade example"
                  />

                  <div className="relative z-10 flex max-h-[94vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl">

                    <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                      <div>
                        <div className="text-[14px] font-black text-slate-950">
                          ICT Trade Setup Example
                        </div>

                        <div className="mt-0.5 text-[10px] text-slate-500">
                          From liquidity to execution and target
                        </div>
                      </div>

                      <a
                        href="#example"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[20px] font-bold text-slate-700"
                        aria-label="Close"
                      >
                        ×
                      </a>

                    </div>


                    <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-brand-50/60 px-3 py-2 text-[11px] font-bold text-brand-700 md:hidden">
                      <span className="text-[16px]">↔</span>
                      <span>Swipe left or right to explore the full chart</span>
                    </div>


                    <div className="overflow-auto bg-white p-2">

                      <svg
                        viewBox="0 0 1200 600"
                        className="block min-w-[900px] w-full"
                        role="img"
                        aria-label="Full ICT trade setup chart"
                      >
                        <defs>

                          <marker
                            id="tradeEntryArrowFullEn"
                            viewBox="0 0 10 10"
                            refX="9"
                            refY="5"
                            markerWidth="7"
                            markerHeight="7"
                            orient="auto"
                          >
                            <path
                              d="M0 0 L10 5 L0 10 Z"
                              fill="#16a34a"
                            />
                          </marker>

                        </defs>

                        <rect width="1200" height="600" fill="#ffffff" />

                        {[95, 170, 245, 320, 395, 470, 545].map((y) => (
                          <line
                            key={`trade-full-en-h-${y}`}
                            x1="70"
                            y1={y}
                            x2="1130"
                            y2={y}
                            stroke="#eef2f7"
                          />
                        ))}

                        {[160, 320, 480, 640, 800, 960, 1120].map((x) => (
                          <line
                            key={`trade-full-en-v-${x}`}
                            x1={x}
                            y1="60"
                            x2={x}
                            y2="530"
                            stroke="#f8fafc"
                          />
                        ))}

                        <polyline
                          points="
                            90,190
                            165,145
                            235,220
                            315,175
                            395,290
                            475,360
                            545,425
                            610,285
                            690,230
                            775,285
                            850,205
                            925,250
                            1000,155
                            1075,105
                            1130,130
                          "
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <line
                          x1="135"
                          y1="395"
                          x2="505"
                          y2="395"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                          strokeDasharray="9 7"
                        />

                        <text
                          x="145"
                          y="372"
                          fontSize="15"
                          fontWeight="900"
                          fill="#b45309"
                        >
                          Sell-side Liquidity
                        </text>

                        <circle
                          cx="545"
                          cy="425"
                          r="10"
                          fill="#fff7ed"
                          stroke="#f97316"
                          strokeWidth="3"
                        />

                        <text
                          x="545"
                          y="458"
                          textAnchor="middle"
                          fontSize="14"
                          fontWeight="900"
                          fill="#ea580c"
                        >
                          Liquidity Sweep
                        </text>

                        <line
                          x1="395"
                          y1="290"
                          x2="635"
                          y2="290"
                          stroke="#e11d48"
                          strokeWidth="2.5"
                          strokeDasharray="8 6"
                        />

                        <text
                          x="585"
                          y="270"
                          textAnchor="middle"
                          fontSize="14"
                          fontWeight="900"
                          fill="#be123c"
                        >
                          CHoCH
                        </text>

                        <rect
                          x="610"
                          y="290"
                          width="170"
                          height="70"
                          rx="12"
                          fill="#f8fafc"
                          stroke="#22c55e"
                          strokeWidth="2"
                        />

                        <text
                          x="695"
                          y="320"
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="900"
                          fill="#0f172a"
                        >
                          Order Block
                        </text>

                        <text
                          x="695"
                          y="342"
                          textAnchor="middle"
                          fontSize="10"
                          fill="#64748b"
                        >
                          Area of interest
                        </text>

                        <rect
                          x="755"
                          y="235"
                          width="105"
                          height="65"
                          rx="10"
                          fill="#dbeafe"
                          fillOpacity="0.78"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeDasharray="7 5"
                        />

                        <text
                          x="807"
                          y="274"
                          textAnchor="middle"
                          fontSize="15"
                          fontWeight="900"
                          fill="#1d4ed8"
                        >
                          FVG
                        </text>

                        <line
                          x1="780"
                          y1="395"
                          x2="780"
                          y2="350"
                          stroke="#16a34a"
                          strokeWidth="4"
                          markerEnd="url(#tradeEntryArrowFullEn)"
                        />

                        <text
                          x="780"
                          y="420"
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="900"
                          fill="#15803d"
                        >
                          Entry
                        </text>

                        <line
                          x1="610"
                          y1="470"
                          x2="850"
                          y2="470"
                          stroke="#ef4444"
                          strokeWidth="2.5"
                        />

                        <text
                          x="850"
                          y="490"
                          textAnchor="end"
                          fontSize="12"
                          fontWeight="900"
                          fill="#dc2626"
                        >
                          Stop Loss
                        </text>

                        <line
                          x1="860"
                          y1="135"
                          x2="1120"
                          y2="135"
                          stroke="#16a34a"
                          strokeWidth="2.5"
                          strokeDasharray="8 6"
                        />

                        <text
                          x="865"
                          y="115"
                          fontSize="14"
                          fontWeight="900"
                          fill="#15803d"
                        >
                          Target / Buy-side Liquidity
                        </text>

                      </svg>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              10 - RISK MANAGEMENT
          ================================================= */}

          <section
            id="risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>10 — Risk Management</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                ICT Risk Management: Stop Loss and Position Size
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Even a well-structured ICT setup can fail. Risk management
                defines how much capital you are prepared to lose before the
                trade is opened, rather than forcing decisions after price
                moves against you.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* QUICK RULES */}
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">

                <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4">

                  <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
                    Risk Per Trade
                  </div>

                  <div className="mt-1.5 text-[16px] font-black leading-6 text-slate-950 md:text-[18px]">
                    0.5% – 1%
                  </div>

                  <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
                    A conservative educational example, not a fixed rule.
                  </p>

                </div>


                <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4">

                  <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
                    Stop Loss
                  </div>

                  <div className="mt-1.5 text-[16px] font-black leading-6 text-slate-950 md:text-[18px]">
                    Before Entry
                  </div>

                  <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
                    Define the invalidation point before execution.
                  </p>

                </div>


                <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4">

                  <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
                    Target
                  </div>

                  <div className="mt-1.5 text-[16px] font-black leading-6 text-slate-950 md:text-[18px]">
                    Logical Level
                  </div>

                  <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
                    For example, opposing liquidity or another planned level.
                  </p>

                </div>


                <div className="rounded-[16px] border border-slate-200 bg-slate-50/60 p-3 md:p-4">

                  <div className="text-[9px] font-black text-slate-500 md:text-[10px]">
                    Position Size
                  </div>

                  <div className="mt-1.5 text-[16px] font-black leading-6 text-slate-950 md:text-[18px]">
                    Based on Risk
                  </div>

                  <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
                    Size changes with the distance to the stop loss.
                  </p>

                </div>

              </div>


              {/* EXAMPLE + CALCULATOR */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {/* EXAMPLE */}
                <div className="rounded-[18px] border border-brand-100 bg-brand-50/50 p-4 md:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <span className="text-[9px] font-black text-brand-600 md:text-[10px]">
                        Educational Example
                      </span>

                      <h3 className="mt-1 text-[17px] font-black text-slate-950 md:text-[19px]">
                        Simple Risk Calculation
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-600 text-[12px] font-black text-white">
                      %
                    </div>

                  </div>


                  <p className="mt-3 text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
                    If your account balance is{" "}
                    <strong className="font-black text-slate-950">
                      $1,000
                    </strong>{" "}
                    and you choose to risk{" "}
                    <strong className="font-black text-slate-950">
                      1%
                    </strong>
                    , the maximum planned loss for the trade is{" "}
                    <strong className="font-black text-slate-950">
                      $10
                    </strong>
                    .
                  </p>


                  <div className="mt-3 rounded-[14px] border border-brand-100 bg-white px-3 py-3">

                    <div className="text-[10px] font-black text-slate-500">
                      Simple Formula
                    </div>

                    <div className="mt-1.5 text-center text-[15px] font-black text-slate-950 md:text-[16px]">
                      $1,000 × 1% = $10
                    </div>

                    <div className="mt-1 text-center text-[10px] leading-5 text-slate-500">
                      Risk amount = account balance × risk percentage
                    </div>

                  </div>


                  <p className="mt-3 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                    Once the stop-loss distance is known, position size can be
                    adjusted so the potential loss stays within the planned
                    risk amount.
                  </p>

                </div>


                {/* CALCULATOR CTA */}
                <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[16px] font-black text-brand-600">
                      ∑
                    </div>

                    <div className="min-w-0">

                      <h3 className="text-[17px] font-black text-slate-950 md:text-[19px]">
                        Use the Risk Calculator
                      </h3>

                      <p className="mt-2 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                        Estimate your risk amount and position size before
                        entering a trade instead of calculating everything
                        manually.
                      </p>

                    </div>

                  </div>


                  <Link
                    href="/en/tools/risk-calculator"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-[12px] bg-brand-600 px-4 py-2.5 text-[12px] font-black text-white transition hover:bg-brand-700"
                  >
                    Open Risk Calculator
                    <span aria-hidden="true">→</span>
                  </Link>


                  <div className="mt-4 border-t border-slate-100 pt-3">

                    <p className="text-[11px] leading-5 text-slate-500 md:text-[12px] md:leading-6">
                      Your appropriate risk percentage depends on your trading
                      plan, account size and tolerance for loss. The 0.5%–1%
                      range above is only an educational example.
                    </p>

                  </div>

                </div>

              </div>


              {/* IMPORTANT NOTE */}
              <div className="mt-4 rounded-[16px] border border-amber-100 bg-amber-50/50 p-3.5 md:p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-amber-500 text-[13px] font-black text-white">
                    !
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-[14px] font-black leading-6 text-slate-950 md:text-[15px]">
                      Strong analysis does not remove risk
                    </h3>

                    <p className="mt-1 text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                      Even when liquidity, structure, an FVG and an Order Block
                      align, the trade can still fail. Position size should not
                      increase simply because a setup looks convincing.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              11 - PROS & CONS
          ================================================= */}

          <section
            id="pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>11 — Evaluation</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                ICT Trading Strategy: Pros and Cons
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                ICT provides a structured way to study price action, but the
                methodology can also become complex. Understanding both the
                advantages and limitations can help you decide whether the
                framework fits your trading style.
              </p>

            </div>


            {/* PROS / CONS */}
            <div className="grid md:grid-cols-2">

              {/* PROS */}
              <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r md:p-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-green-50 text-[14px] font-black text-green-700">
                    ✓
                  </div>

                  <div>

                    <div className="text-[10px] font-black text-green-700">
                      Strengths
                    </div>

                    <h3 className="mt-0.5 text-[18px] font-black text-slate-950">
                      Advantages of ICT Trading
                    </h3>

                  </div>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-green-100 bg-white">

                  {[
                    "Provides a structured framework for reading price action instead of relying on isolated signals.",
                    "Combines market structure, liquidity, timing and areas of interest into one narrative.",
                    "Can be studied across different markets and timeframes depending on the trading plan.",
                    "Encourages traders to define entry, invalidation and targets before execution.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3
                          ? "border-b border-green-100/70"
                          : ""
                      }`}
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-[11px] font-black text-green-700">
                        ✓
                      </div>

                      <p className="text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
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

                    <div className="text-[10px] font-black text-rose-700">
                      Limitations
                    </div>

                    <h3 className="mt-0.5 text-[18px] font-black text-slate-950">
                      Challenges of ICT Trading
                    </h3>

                  </div>

                </div>


                <div className="mt-4 overflow-hidden rounded-[16px] border border-rose-100 bg-white">

                  {[
                    "The terminology can feel overwhelming for beginners at first.",
                    "Some zones and structural labels can be interpreted differently by different traders.",
                    "Searching for too many FVGs and Order Blocks can lead to over-analysis.",
                    "No ICT setup guarantees a profitable trade, and false signals are part of trading.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 px-3.5 py-3 ${
                        index !== 3
                          ? "border-b border-rose-100/70"
                          : ""
                      }`}
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[11px] font-black text-rose-700">
                        ×
                      </div>

                      <p className="text-[13px] leading-6 text-slate-700 md:text-[14px] md:leading-7">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>


            {/* CONCLUSION */}
            <div className="border-t border-slate-200 bg-slate-50/50 p-4 md:px-6 md:py-4">

              <div className="flex items-start gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
                  ?
                </div>

                <div className="min-w-0">

                  <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
                    Is ICT Trading Suitable for Beginners?
                  </h3>

                  <p className="mt-1.5 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                    Beginners can learn ICT, but trying to memorize every
                    concept at once usually creates confusion. Start with
                    market structure and liquidity, then add BOS, CHoCH, FVGs
                    and Order Blocks gradually.
                  </p>

                </div>

              </div>

            </div>

          </section>
                    {/* =================================================
              BEGINNER ROADMAP
          ================================================= */}

          <section
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>Beginner Roadmap</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                How to Learn ICT Trading as a Beginner
              </h2>

              <p className="mt-3 max-w-6xl text-[14px] leading-7 text-slate-600 md:text-[15px] md:leading-8">
                Trying to learn every ICT concept at the same time can make
                the methodology feel more complicated than it needs to be.
                A better approach is to build your understanding in stages,
                starting with price structure and liquidity before moving into
                advanced execution concepts.
              </p>

            </div>


            <div className="p-4 md:p-7">

              {/* =================================================
                  DESKTOP ROADMAP
              ================================================= */}
              <div className="hidden md:grid md:grid-cols-4 md:gap-3">

                {[
                  {
                    no: "01",
                    title: "Market Structure",
                    term: "HH / HL / LH / LL",
                    text: "Learn how price forms bullish and bearish structural sequences before studying entry models.",
                  },
                  {
                    no: "02",
                    title: "Liquidity",
                    term: "BSL / SSL",
                    text: "Understand where liquidity may rest above highs and below lows and how price interacts with those areas.",
                  },
                  {
                    no: "03",
                    title: "Structure Shifts",
                    term: "BOS / CHoCH",
                    text: "Study how continuation and early structural changes can alter the market narrative.",
                  },
                  {
                    no: "04",
                    title: "Areas of Interest",
                    term: "FVG / Order Block",
                    text: "Add Fair Value Gaps and Order Blocks only after the broader market context makes sense.",
                  },
                ].map((item) => (
                  <article
                    key={item.no}
                    className="rounded-[18px] border border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                        {item.no}
                      </div>

                      <h3 className="text-[16px] font-black text-slate-950">
                        {item.title}
                      </h3>

                    </div>

                    <div className="mt-2 text-[10px] font-black text-brand-600">
                      {item.term}
                    </div>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      {item.text}
                    </p>

                  </article>
                ))}

              </div>


              {/* =================================================
                  MOBILE ROADMAP
              ================================================= */}
              <div className="md:hidden">

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">

                  {[
                    {
                      no: "01",
                      title: "Market Structure",
                      term: "HH / HL / LH / LL",
                      text: "Start with bullish and bearish price structure.",
                    },
                    {
                      no: "02",
                      title: "Liquidity",
                      term: "BSL / SSL",
                      text: "Learn where liquidity may collect around obvious highs and lows.",
                    },
                    {
                      no: "03",
                      title: "Structure Shifts",
                      term: "BOS / CHoCH",
                      text: "Study continuation and early changes in market behavior.",
                    },
                    {
                      no: "04",
                      title: "Areas of Interest",
                      term: "FVG / Order Block",
                      text: "Add execution zones after you understand the broader context.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.no}
                      className={`px-3.5 py-3 ${
                        index !== 3
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[10px] font-black text-white">
                          {item.no}
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">

                            <h3 className="text-[14px] font-black text-slate-950">
                              {item.title}
                            </h3>

                            <span className="text-[9px] font-black text-brand-600">
                              {item.term}
                            </span>

                          </div>

                          <p className="mt-1 text-[11px] leading-5 text-slate-600">
                            {item.text}
                          </p>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              {/* PRACTICE NOTE */}
              <div className="mt-4 rounded-[18px] border border-brand-100 bg-brand-50/50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-600 text-[13px] font-black text-white">
                    !
                  </div>

                  <div>

                    <h3 className="text-[15px] font-black text-slate-950 md:text-[16px]">
                      Learn one concept at a time
                    </h3>

                    <p className="mt-1.5 text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                      Study historical charts and practice identifying each
                      concept separately before combining them into a complete
                      setup. This makes it easier to understand why a setup
                      worked or failed.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              12 - FAQ
          ================================================= */}

          <section
            id="faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-4 md:px-8 md:py-6">

              <SectionLabel>12 — FAQ</SectionLabel>

              <h2 className="mt-3 text-[24px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 md:text-[34px]">
                Frequently Asked Questions About ICT Trading
              </h2>

              <p className="mt-3 max-w-6xl text-[13px] leading-6 text-slate-600 md:text-[14px] md:leading-7">
                Quick answers to common questions traders ask when learning
                the ICT trading strategy.
              </p>

            </div>


            {/* FAQ ITEMS */}
            <div className="divide-y divide-slate-200">

              {[
                {
                  q: "Is ICT trading suitable for beginners?",
                  a: "Yes, beginners can learn ICT trading, but it is usually easier to start with market structure and liquidity before moving into Fair Value Gaps, Order Blocks, BOS, CHoCH and more advanced execution models.",
                },
                {
                  q: "Does the ICT trading strategy guarantee profits?",
                  a: "No. No trading strategy guarantees profits. ICT is a framework for analyzing price action, and every setup can fail. Risk management and disciplined execution remain essential.",
                },
                {
                  q: "What is the most important ICT concept to learn first?",
                  a: "Market structure and liquidity are good starting points because they provide the context needed to understand concepts such as Fair Value Gaps, Order Blocks, BOS and CHoCH.",
                },
                {
                  q: "What is the difference between ICT and Smart Money Concepts?",
                  a: "The two approaches share many ideas, including liquidity, market structure, Order Blocks and structural shifts. ICT specifically refers to concepts associated with Inner Circle Trader teachings, while Smart Money Concepts is often used as a broader label for similar price-action ideas.",
                },
                {
                  q: "Is ICT trading only used in forex?",
                  a: "No. ICT concepts are widely discussed in forex, but traders also apply similar ideas to indices, commodities, futures and other liquid markets. Market behavior and session dynamics can differ between instruments.",
                },
                {
                  q: "What is the best timeframe for ICT trading?",
                  a: "There is no single best timeframe. Many traders use a higher timeframe to establish the broader market context and a lower timeframe to refine structure, liquidity and execution.",
                },
                {
                  q: "What is an ICT liquidity sweep?",
                  a: "A liquidity sweep occurs when price trades through an obvious high or low where orders may be clustered. The sweep itself does not guarantee a reversal, so traders usually look for additional structural confirmation.",
                },
                {
                  q: "Are Fair Value Gaps always filled?",
                  a: "No. Price does not have to return to every Fair Value Gap, and some imbalances may be partially filled or ignored entirely. FVGs are more useful when they align with the broader market context.",
                },
              ].map((item) => (
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

          <section
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 md:px-6 md:py-5">

              <h2 className="text-[20px] font-black leading-7 text-slate-950 md:text-[26px]">
                Guides That Can Help You Understand ICT Trading
              </h2>

              <p className="mt-1.5 text-[12px] leading-6 text-slate-500 md:text-[13px]">
                Explore related guides on liquidity, trade management and risk.
              </p>

            </div>


            {/* =================================================
                DESKTOP RELATED
            ================================================= */}
            <div className="hidden gap-3 p-4 md:grid md:grid-cols-4 md:p-5">

              {[
                {
                  label: "Core Concept",
                  title: "Liquidity in Trading",
                  text: "Learn how liquidity can form around obvious highs, lows and key price areas.",
                  href: "/en/learn-trading/liquidity",
                },
                {
                  label: "Risk Management",
                  title: "Stop Loss",
                  text: "Understand how stop-loss orders are used to define trade invalidation and risk.",
                  href: "/en/learn-trading/stop-loss",
                },
                {
                  label: "Trade Management",
                  title: "Take Profit",
                  text: "Learn how traders can plan logical profit targets before entering a position.",
                  href: "/en/learn-trading/take-profit",
                },
                {
                  label: "Position Sizing",
                  title: "Lot Size",
                  text: "Understand how trade size relates to account risk and stop-loss distance.",
                  href: "/en/learn-trading/lot-size",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[17px] border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >

                  <div className="text-[9px] font-black text-brand-600">
                    {item.label}
                  </div>

                  <h3 className="mt-1.5 text-[15px] font-black text-slate-950 group-hover:text-brand-600">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    {item.text}
                  </p>

                  <div className="mt-3 text-[11px] font-black text-brand-600">
                    Read guide →
                  </div>

                </Link>
              ))}

            </div>


            {/* =================================================
                MOBILE RELATED
            ================================================= */}
            <div className="md:hidden">

              <div className="divide-y divide-slate-100">

                {[
                  {
                    label: "Core Concept",
                    title: "Liquidity in Trading",
                    href: "/en/learn-trading/liquidity",
                  },
                  {
                    label: "Risk Management",
                    title: "Stop Loss",
                    href: "/en/learn-trading/stop-loss",
                  },
                  {
                    label: "Trade Management",
                    title: "Take Profit",
                    href: "/en/learn-trading/take-profit",
                  },
                  {
                    label: "Position Sizing",
                    title: "Lot Size",
                    href: "/en/learn-trading/lot-size",
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >

                    <div>

                      <div className="text-[9px] font-black text-brand-600">
                        {item.label}
                      </div>

                      <div className="mt-0.5 text-[13px] font-black text-slate-950">
                        {item.title}
                      </div>

                    </div>

                    <span className="text-[16px] font-black text-brand-600">
                      →
                    </span>

                  </Link>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section
            className="overflow-hidden rounded-[24px] border border-brand-100 bg-[linear-gradient(135deg,#f3f7fd_0%,#ffffff_60%,#f7faff_100%)] shadow-sm"
          >

            <div className="px-4 py-4 md:flex md:items-center md:justify-between md:gap-8 md:px-7 md:py-5">

              {/* CONTENT */}
              <div className="min-w-0 flex-1">

                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-600 md:text-[10px]">
                  Next Step
                </span>

                <h2 className="mt-2.5 text-[20px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 md:text-[27px]">
                  Learn the Framework, Then Test It Before Risking Capital
                </h2>

                <p className="mt-2 max-w-4xl text-[12px] leading-6 text-slate-600 md:text-[13px] md:leading-7">
                  Use this guide to understand the concepts, then study
                  historical charts or practice on a demo account before
                  risking real money. The goal is to build a repeatable
                  process rather than chase individual trade signals.
                </p>

              </div>


              {/* ACTIONS */}
              <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-0 md:flex md:shrink-0 md:items-center">

                <Link
                  href="/en/learn-trading"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[11px] border border-brand-200 bg-white px-3 py-2.5 text-center text-[11px] font-black text-brand-600 transition hover:border-brand-300 hover:bg-brand-50 md:min-w-[155px] md:px-4 md:text-[12px]"
                >
                  Trading Guides
                </Link>


                <Link
                  href="/en/tools"
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[11px] bg-brand-600 px-3 py-2.5 text-center text-[11px] font-black text-white shadow-sm transition hover:bg-brand-700 md:min-w-[165px] md:px-4 md:text-[12px]"
                >
                  <span>Trading Tools</span>

                  <span
                    aria-hidden="true"
                    className="text-[14px] leading-none"
                  >
                    →
                  </span>
                </Link>

              </div>

            </div>


            {/* DISCLAIMER */}
            <div className="border-t border-brand-100/70 bg-white/50 px-4 py-2.5 md:px-7">

              <p className="text-center text-[10px] leading-5 text-slate-500 md:text-left md:text-[11px]">
                This content is for educational purposes only and does not
                constitute trading or investment advice. Test any strategy and
                understand the risks before using real capital.
              </p>

            </div>

          </section>


        </article>

      </div>


      {/* =====================================================
          ARTICLE SCHEMA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",

            headline:
              "ICT Trading Strategy Explained: A Complete Beginner's Guide",

            description: PAGE_DESCRIPTION,

            url: PAGE_URL,

            inLanguage: "en",

            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": PAGE_URL,
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

            datePublished: "2026-08-15",
            dateModified: "2026-08-15",

            about: [
              {
                "@type": "Thing",
                name: "ICT Trading Strategy",
              },
              {
                "@type": "Thing",
                name: "Inner Circle Trader",
              },
              {
                "@type": "Thing",
                name: "Market Structure",
              },
              {
                "@type": "Thing",
                name: "Liquidity",
              },
              {
                "@type": "Thing",
                name: "Fair Value Gap",
              },
              {
                "@type": "Thing",
                name: "Order Block",
              },
              {
                "@type": "Thing",
                name: "Break of Structure",
              },
              {
                "@type": "Thing",
                name: "Change of Character",
              },
            ],

            keywords: [
              "ICT trading strategy",
              "ICT trading",
              "Inner Circle Trader",
              "Fair Value Gap",
              "Order Block",
              "liquidity sweep",
              "market structure",
              "BOS",
              "CHoCH",
              "ICT Kill Zones",
            ],
          }),
        }}
      />


      {/* =====================================================
          BREADCRUMB SCHEMA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "ICT Trading Strategy",
                item: PAGE_URL,
              },
            ],
          }),
        }}
      />


      {/* =====================================================
          FAQ SCHEMA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",

            mainEntity: [
              {
                "@type": "Question",
                name: "Is ICT trading suitable for beginners?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, beginners can learn ICT trading, but it is usually easier to start with market structure and liquidity before moving into Fair Value Gaps, Order Blocks, BOS, CHoCH and more advanced execution models.",
                },
              },
              {
                "@type": "Question",
                name: "Does the ICT trading strategy guarantee profits?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. No trading strategy guarantees profits. ICT is a framework for analyzing price action, and every setup can fail. Risk management and disciplined execution remain essential.",
                },
              },
              {
                "@type": "Question",
                name: "What is the most important ICT concept to learn first?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Market structure and liquidity are good starting points because they provide the context needed to understand concepts such as Fair Value Gaps, Order Blocks, BOS and CHoCH.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between ICT and Smart Money Concepts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The two approaches share many ideas, including liquidity, market structure, Order Blocks and structural shifts. ICT specifically refers to concepts associated with Inner Circle Trader teachings, while Smart Money Concepts is often used as a broader label for similar price-action ideas.",
                },
              },
              {
                "@type": "Question",
                name: "Is ICT trading only used in forex?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. ICT concepts are widely discussed in forex, but traders also apply similar ideas to indices, commodities, futures and other liquid markets. Market behavior and session dynamics can differ between instruments.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best timeframe for ICT trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "There is no single best timeframe. Many traders use a higher timeframe to establish the broader market context and a lower timeframe to refine structure, liquidity and execution.",
                },
              },
              {
                "@type": "Question",
                name: "What is an ICT liquidity sweep?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A liquidity sweep occurs when price trades through an obvious high or low where orders may be clustered. The sweep itself does not guarantee a reversal, so traders usually look for additional structural confirmation.",
                },
              },
              {
                "@type": "Question",
                name: "Are Fair Value Gaps always filled?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Price does not have to return to every Fair Value Gap, and some imbalances may be partially filled or ignored entirely. FVGs are more useful when they align with the broader market context.",
                },
              },
            ],
          }),
        }}
      />

    </main>
  );
}