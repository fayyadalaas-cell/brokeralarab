import type { Metadata } from "next";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/smart-money-concepts`;
const AR_PAGE_URL = `${BASE_URL}/strategies/smart-money-concepts`;

const PAGE_TITLE =
  "Smart Money Concepts (SMC) Trading Strategy: Complete Guide";

const PAGE_DESCRIPTION =
  "Learn Smart Money Concepts (SMC) trading step by step, including market structure, BOS, CHoCH, liquidity sweeps, order blocks, fair value gaps (FVG), displacement, entries, exits and risk management.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "Smart Money Concepts",
    "Smart Money Concept",
    "SMC trading",
    "SMC trading strategy",
    "Smart Money Concepts trading",
    "Smart Money Concepts trading strategy",
    "smart money trading",
    "SMC strategy",
    "SMC forex",
    "SMC forex strategy",
    "institutional trading",
    "institutional trading strategy",
    "market structure trading",
    "market structure SMC",
    "BOS trading",
    "Break of Structure",
    "CHoCH trading",
    "Change of Character",
    "BOS vs CHoCH",
    "liquidity trading",
    "liquidity sweep",
    "liquidity grab",
    "buy side liquidity",
    "sell side liquidity",
    "order block",
    "order blocks trading",
    "order block strategy",
    "bullish order block",
    "bearish order block",
    "fair value gap",
    "FVG trading",
    "FVG trading strategy",
    "fair value gap trading",
    "displacement trading",
    "premium and discount trading",
    "SMC order blocks",
    "SMC liquidity",
    "SMC fair value gap",
    "SMC BOS CHoCH",
    "price action trading",
    "ICT trading",
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: AR_PAGE_URL,
      "x-default": PAGE_URL,
    },
  },

  openGraph: {
    type: "article",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Broker Alarab",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const faqItems = [
  {
    question: "What are Smart Money Concepts (SMC) in trading?",
    answer:
      "Smart Money Concepts, commonly abbreviated as SMC, is a price-action framework that organizes market analysis around market structure, liquidity, Break of Structure (BOS), Change of Character (CHoCH), order blocks, fair value gaps and displacement. Traders use these concepts together to build structured trade scenarios rather than relying on a single indicator or isolated signal.",
  },
  {
    question: "What does SMC mean in trading?",
    answer:
      "SMC stands for Smart Money Concepts. The term is commonly used for a group of price-action concepts that focus on market structure, liquidity, imbalances and potential areas of interest where traders may look for price reactions.",
  },
  {
    question: "What is the difference between BOS and CHoCH?",
    answer:
      "BOS, or Break of Structure, is commonly used to describe a structural break in the direction of the prevailing market structure and can support a continuation scenario. CHoCH, or Change of Character, describes a meaningful break against the prevailing structure and may provide an early warning that market behavior is changing. Neither should be interpreted without context.",
  },
  {
    question: "What is liquidity in SMC trading?",
    answer:
      "In SMC trading, liquidity generally refers to areas where orders may be concentrated, such as above previous highs, below previous lows, or around equal highs and equal lows. Traders monitor how price behaves around these areas before looking for a potential setup.",
  },
  {
    question: "What is an order block in SMC?",
    answer:
      "An order block is a price area that SMC traders commonly identify around the final opposing move before a strong displacement. Rather than treating every opposing candle as an order block, traders usually look for supporting context such as liquidity, displacement and a meaningful structural break.",
  },
  {
    question: "What is a Fair Value Gap (FVG)?",
    answer:
      "A Fair Value Gap, or FVG, is a three-candle price imbalance where part of the first candle's range does not overlap with the third candle's range. SMC traders may monitor a return into the imbalance as a potential area of interest, but price is not guaranteed to revisit or fully fill every FVG.",
  },
  {
    question: "Is SMC the same as ICT trading?",
    answer:
      "SMC and ICT trading overlap significantly in terminology such as liquidity, order blocks, fair value gaps and market structure, but the terms should not automatically be treated as identical. ICT is a named methodology with a broader collection of specific models and concepts.",
  },
  {
    question: "Is Smart Money Concepts trading suitable for beginners?",
    answer:
      "Beginners can learn SMC, but it is usually easier to start with basic market structure, swing highs and swing lows before moving to BOS, CHoCH, liquidity, order blocks and fair value gaps. Learning the concepts in sequence can prevent the chart from becoming unnecessarily complicated.",
  },
];

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-black tracking-wide text-[#1E5BB8] sm:text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2B6FD0]" />
      {children}
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
    <div className="mt-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
      <div className="mb-2 text-sm font-black text-[#184A97]">
        {title}
      </div>

      <div className="text-[13px] font-medium leading-7 text-slate-700 sm:text-sm sm:leading-8">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   HERO — DESKTOP
========================================================= */

function SmartMoneyHeroDesktopChart() {
  return (
    <div className="relative h-full min-h-[410px] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/70 p-6 xl:p-8">
      <div className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-52 w-52 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>

          <div className="rounded-md border border-slate-200 bg-white px-3 py-1 text-[9px] font-black tracking-[0.16em] text-slate-500">
            SMC • MARKET MAP
          </div>

          <div className="text-[9px] font-bold text-slate-400">
            EUR/USD
          </div>
        </div>

        <div className="relative flex-1">
          <svg
            viewBox="0 0 720 390"
            className="h-full w-full"
            role="img"
            aria-label="Educational Smart Money Concepts chart showing market structure, liquidity, an order block and a fair value gap"
          >
            <defs>
              <linearGradient id="heroSmcAreaEn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2B6FD0" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2B6FD0" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="heroObFillEn" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.45" />
              </linearGradient>

              <pattern
                id="heroGridEn"
                width="48"
                height="42"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 48 0 L 0 0 0 42"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="720" height="390" fill="#ffffff" />
            <rect width="720" height="390" fill="url(#heroGridEn)" />

            <line
              x1="470"
              y1="82"
              x2="665"
              y2="82"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="7 7"
            />

            <circle cx="520" cy="82" r="4" fill="#64748b" />
            <circle cx="574" cy="82" r="4" fill="#64748b" />
            <circle cx="628" cy="82" r="4" fill="#64748b" />

            <rect
              x="487"
              y="48"
              width="154"
              height="24"
              rx="12"
              fill="#f8fafc"
              stroke="#cbd5e1"
            />

            <text
              x="564"
              y="64"
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              fill="#475569"
            >
              BUY-SIDE LIQUIDITY
            </text>

            <rect
              x="285"
              y="252"
              width="155"
              height="57"
              rx="10"
              fill="url(#heroObFillEn)"
              stroke="#60a5fa"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            <text
              x="362"
              y="274"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#1E5BB8"
            >
              BULLISH ORDER BLOCK
            </text>

            <text
              x="362"
              y="292"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#64748b"
            >
              AREA OF INTEREST
            </text>

            <rect
              x="435"
              y="176"
              width="102"
              height="43"
              rx="8"
              fill="#eff6ff"
              stroke="#93c5fd"
              strokeWidth="1.5"
            />

            <text
              x="486"
              y="202"
              textAnchor="middle"
              fontSize="11"
              fontWeight="900"
              fill="#2563eb"
            >
              FVG
            </text>

            <path
              d="M50 319
                 L92 292
                 L130 306
                 L174 260
                 L215 277
                 L262 222
                 L307 247
                 L350 195
                 L395 215
                 L442 155
                 L486 177
                 L530 120
                 L573 141
                 L620 80
                 L668 105
                 L668 350
                 L50 350 Z"
              fill="url(#heroSmcAreaEn)"
            />

            <path
              d="M50 319
                 L92 292
                 L130 306
                 L174 260
                 L215 277
                 L262 222
                 L307 247
                 L350 195
                 L395 215
                 L442 155
                 L486 177
                 L530 120
                 L573 141
                 L620 80
                 L668 105"
              fill="none"
              stroke="#1E5BB8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g fontSize="10" fontWeight="900" fill="#0f172a">
              <text x="167" y="244">HH</text>
              <text x="205" y="296">HL</text>
              <text x="343" y="178">HH</text>
              <text x="388" y="235">HL</text>
              <text x="523" y="103">HH</text>
            </g>

            <line
              x1="344"
              y1="195"
              x2="470"
              y2="195"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            <rect
              x="388"
              y="158"
              width="53"
              height="24"
              rx="12"
              fill="#2563eb"
            />

            <text
              x="414.5"
              y="174"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#ffffff"
            >
              BOS
            </text>

            <path
              d="M620 80 L634 55 L646 88"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text
              x="642"
              y="43"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#0f172a"
            >
              SWEEP
            </text>

            <g>
              <rect
                x="54"
                y="26"
                width="94"
                height="27"
                rx="13.5"
                fill="#eff6ff"
                stroke="#bfdbfe"
              />
              <text
                x="101"
                y="44"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#1E5BB8"
              >
                STRUCTURE
              </text>

              <rect
                x="157"
                y="26"
                width="88"
                height="27"
                rx="13.5"
                fill="#f8fafc"
                stroke="#cbd5e1"
              />
              <text
                x="201"
                y="44"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#475569"
              >
                LIQUIDITY
              </text>

              <rect
                x="254"
                y="26"
                width="84"
                height="27"
                rx="13.5"
                fill="#f8fafc"
                stroke="#cbd5e1"
              />
              <text
                x="296"
                y="44"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#475569"
              >
                POI
              </text>
            </g>
          </svg>

          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
            {[
              ["01", "Market Structure"],
              ["02", "Liquidity"],
              ["03", "Entry Zone"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-center shadow-sm backdrop-blur"
              >
                <div className="text-[9px] font-black text-[#2B6FD0]">
                  {number}
                </div>

                <div className="mt-0.5 text-[10px] font-black text-slate-700">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO — MOBILE
========================================================= */

function SmartMoneyHeroMobileChart() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
        <span className="text-[9px] font-black tracking-wider text-slate-400">
          SMC MARKET MAP
        </span>

        <span className="rounded-md bg-blue-50 px-2 py-1 text-[8px] font-black text-[#1E5BB8]">
          EDUCATIONAL
        </span>
      </div>

      <svg
        viewBox="0 0 680 300"
        className="block h-auto w-full"
        role="img"
        aria-label="Simplified Smart Money Concepts trading chart"
      >
        <defs>
          <pattern
            id="mobileSmcGridEn"
            width="46"
            height="38"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M46 0 L0 0 0 38"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="680" height="300" fill="#fff" />
        <rect width="680" height="300" fill="url(#mobileSmcGridEn)" />

        <rect
          x="255"
          y="205"
          width="148"
          height="44"
          rx="9"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeDasharray="5 5"
        />

        <text
          x="329"
          y="232"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1E5BB8"
        >
          ORDER BLOCK
        </text>

        <rect
          x="414"
          y="134"
          width="86"
          height="37"
          rx="7"
          fill="#eff6ff"
          stroke="#93c5fd"
        />

        <text
          x="457"
          y="157"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#2563eb"
        >
          FVG
        </text>

        <line
          x1="476"
          y1="64"
          x2="626"
          y2="64"
          stroke="#64748b"
          strokeDasharray="6 6"
        />

        <text
          x="550"
          y="48"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#475569"
        >
          LIQUIDITY
        </text>

        <path
          d="M44 250 L100 222 L145 237 L205 190 L250 207 L310 156 L358 177 L419 120 L468 142 L528 88 L577 108 L625 58"
          fill="none"
          stroke="#1E5BB8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g fontSize="10" fontWeight="900" fill="#0f172a">
          <text x="194" y="174">HH</text>
          <text x="240" y="225">HL</text>
          <text x="408" y="103">HH</text>
          <text x="458" y="160">HL</text>
        </g>

        <rect
          x="338"
          y="113"
          width="51"
          height="23"
          rx="11.5"
          fill="#2563eb"
        />

        <text
          x="363.5"
          y="129"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#fff"
        >
          BOS
        </text>
      </svg>
    </div>
  );
}

/* =========================================================
   CHART 01 — MARKET STRUCTURE + BOS / CHoCH
========================================================= */

function MarketStructureSMCChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div
      className={
        fullscreen
          ? "min-w-[900px] overflow-hidden rounded-[24px] border border-slate-200 bg-white"
          : "min-w-[820px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:min-w-0"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
        <div className="text-[10px] font-black tracking-[0.14em] text-slate-400">
          SMC • MARKET STRUCTURE
        </div>

        <div className="text-[11px] font-black text-slate-600">
          BOS vs CHoCH
        </div>
      </div>

      <svg
        viewBox="0 0 1000 470"
        className="block h-auto w-full"
        role="img"
        aria-label="Smart Money Concepts chart comparing Break of Structure BOS and Change of Character CHoCH"
      >
        <defs>
          <pattern
            id="structureGridEn"
            width="50"
            height="47"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 47"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1000" height="470" fill="#ffffff" />
        <rect width="1000" height="470" fill="url(#structureGridEn)" />

        <line
          x1="500"
          y1="35"
          x2="500"
          y2="425"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="7 7"
        />

        <text
          x="250"
          y="45"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#0f172a"
        >
          BOS — STRUCTURE CONTINUATION
        </text>

        <path
          d="M65 360
             L120 305
             L175 330
             L235 255
             L290 290
             L350 205
             L405 240
             L462 145"
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g fontSize="12" fontWeight="900" fill="#0f172a">
          <text x="105" y="288">HH</text>
          <text x="164" y="352">HL</text>
          <text x="220" y="238">HH</text>
          <text x="278" y="313">HL</text>
          <text x="337" y="188">HH</text>
          <text x="393" y="264">HL</text>
        </g>

        <line
          x1="340"
          y1="205"
          x2="456"
          y2="205"
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        <rect
          x="390"
          y="166"
          width="57"
          height="28"
          rx="14"
          fill="#2563eb"
        />

        <text
          x="418.5"
          y="185"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#fff"
        >
          BOS
        </text>

        <text
          x="250"
          y="408"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#64748b"
        >
          Higher Highs + Higher Lows
        </text>

        <text
          x="750"
          y="45"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#0f172a"
        >
          CHoCH — POTENTIAL STRUCTURE SHIFT
        </text>

        <path
          d="M540 115
             L595 165
             L650 138
             L708 210
             L762 180
             L817 255
             L868 225
             L918 318"
          fill="none"
          stroke="#475569"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g fontSize="12" fontWeight="900" fill="#0f172a">
          <text x="585" y="188">LL</text>
          <text x="638" y="122">LH</text>
          <text x="697" y="233">LL</text>
          <text x="750" y="164">LH</text>
        </g>

        <line
          x1="702"
          y1="210"
          x2="880"
          y2="210"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        <circle
          cx="868"
          cy="225"
          r="7"
          fill="#ffffff"
          stroke="#ef4444"
          strokeWidth="3"
        />

        <rect
          x="823"
          y="174"
          width="72"
          height="28"
          rx="14"
          fill="#0f172a"
        />

        <text
          x="859"
          y="193"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          CHoCH
        </text>

        <path
          d="M868 225 L908 184 L947 205"
          fill="none"
          stroke="#2B6FD0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x="750"
          y="408"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#64748b"
        >
          Counter-structure break that still requires confirmation
        </text>
      </svg>

      <div className="grid grid-cols-2 border-t border-slate-200">
        <div className="border-r border-slate-200 p-4 text-center">
          <div className="text-[10px] font-black text-[#2B6FD0]">
            BOS
          </div>

          <div className="mt-1 text-[11px] font-bold text-slate-600">
            Commonly used to confirm structural continuation
          </div>
        </div>

        <div className="p-4 text-center">
          <div className="text-[10px] font-black text-slate-900">
            CHoCH
          </div>

          <div className="mt-1 text-[11px] font-bold text-slate-600">
            Early warning, not automatic reversal confirmation
          </div>
        </div>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="smc-structure-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#market-structure"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          Close ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">{chart}</div>

      <div className="lg:hidden">
        <a
          href="#smc-structure-fullscreen"
          className="smc-centered-scroll block overflow-x-auto rounded-[22px]"
        >
          {chart}
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe horizontally to explore the full chart — tap to enlarge</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CHART 02 — LIQUIDITY SWEEP
========================================================= */

function LiquiditySweepChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div
      className={
        fullscreen
          ? "min-w-[900px] overflow-hidden rounded-[24px] border border-slate-200 bg-white"
          : "min-w-[820px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:min-w-0"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
        <span className="text-[10px] font-black tracking-[0.14em] text-slate-400">
          SMC • LIQUIDITY MAP
        </span>

        <span className="text-[11px] font-black text-slate-600">
          Liquidity Sweep Example
        </span>
      </div>

      <svg
        viewBox="0 0 1000 470"
        className="block h-auto w-full"
        role="img"
        aria-label="Liquidity sweep trading chart showing equal highs, buy-side liquidity and a sweep"
      >
        <defs>
          <pattern
            id="liquidityGridEn"
            width="50"
            height="47"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 47"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>

          <linearGradient
            id="liquidityZoneEn"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <rect width="1000" height="470" fill="#ffffff" />
        <rect width="1000" height="470" fill="url(#liquidityGridEn)" />

        <rect
          x="445"
          y="83"
          width="420"
          height="65"
          rx="12"
          fill="url(#liquidityZoneEn)"
        />

        <line
          x1="410"
          y1="132"
          x2="895"
          y2="132"
          stroke="#64748b"
          strokeWidth="2"
          strokeDasharray="8 7"
        />

        <text
          x="645"
          y="108"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#334155"
        >
          BUY-SIDE LIQUIDITY
        </text>

        <text
          x="645"
          y="126"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          Potential liquidity above clustered highs
        </text>

        <path
          d="M95 355
             L160 292
             L220 320
             L292 245
             L354 287
             L425 190
             L485 252
             L552 134
             L610 247
             L680 132
             L738 235
             L806 128
             L840 72
             L875 158
             L925 245"
          fill="none"
          stroke="#1E5BB8"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g>
          <circle
            cx="552"
            cy="134"
            r="6"
            fill="#fff"
            stroke="#475569"
            strokeWidth="2.5"
          />
          <circle
            cx="680"
            cy="132"
            r="6"
            fill="#fff"
            stroke="#475569"
            strokeWidth="2.5"
          />
          <circle
            cx="806"
            cy="128"
            r="6"
            fill="#fff"
            stroke="#475569"
            strokeWidth="2.5"
          />
        </g>

        <text
          x="680"
          y="165"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#475569"
        >
          EQUAL HIGHS
        </text>

        <line
          x1="840"
          y1="72"
          x2="840"
          y2="128"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        <circle
          cx="840"
          cy="72"
          r="8"
          fill="#fff"
          stroke="#ef4444"
          strokeWidth="3"
        />

        <rect
          x="790"
          y="32"
          width="102"
          height="29"
          rx="14.5"
          fill="#0f172a"
        />

        <text
          x="841"
          y="51"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          LIQUIDITY SWEEP
        </text>

        <g>
          <rect
            x="96"
            y="55"
            width="225"
            height="73"
            rx="14"
            fill="#f8fafc"
            stroke="#cbd5e1"
          />

          <text
            x="208"
            y="82"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#0f172a"
          >
            1 — IDENTIFY LIQUIDITY
          </text>

          <text
            x="208"
            y="104"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            Equal highs or a clear swing high
          </text>

          <rect
            x="96"
            y="150"
            width="225"
            height="73"
            rx="14"
            fill="#eff6ff"
            stroke="#bfdbfe"
          />

          <text
            x="208"
            y="177"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#1E5BB8"
          >
            2 — WAIT FOR THE SWEEP
          </text>

          <text
            x="208"
            y="199"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            Do not anticipate the reversal
          </text>

          <rect
            x="96"
            y="245"
            width="225"
            height="73"
            rx="14"
            fill="#f8fafc"
            stroke="#cbd5e1"
          />

          <text
            x="208"
            y="272"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#0f172a"
          >
            3 — SEEK CONFIRMATION
          </text>

          <text
            x="208"
            y="294"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            CHoCH / displacement / POI
          </text>
        </g>

        <text
          x="680"
          y="407"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#64748b"
        >
          Sweeping liquidity alone does not guarantee a reversal
        </text>
      </svg>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="liquidity-sweep-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#liquidity"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          Close ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">{chart}</div>

      <div className="lg:hidden">
        <a
          href="#liquidity-sweep-fullscreen"
          className="smc-centered-scroll block overflow-x-auto rounded-[22px]"
        >
          {chart}
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe horizontally to explore the full chart — tap to enlarge</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CHART 03 — ORDER BLOCK
========================================================= */

function OrderBlockSMCChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div
      className={
        fullscreen
          ? "min-w-[900px] overflow-hidden rounded-[24px] border border-slate-200 bg-white"
          : "min-w-[820px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:min-w-0"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
        <span className="text-[10px] font-black tracking-[0.14em] text-slate-400">
          SMC • ORDER BLOCK
        </span>

        <span className="text-[11px] font-black text-slate-600">
          Area of Interest — Not a Standalone Entry Signal
        </span>
      </div>

      <svg
        viewBox="0 0 1000 470"
        className="block h-auto w-full"
        role="img"
        aria-label="Bullish order block trading example showing displacement, BOS, retracement and price reaction"
      >
        <defs>
          <pattern
            id="obGridEn"
            width="50"
            height="47"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 47"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1000" height="470" fill="#fff" />
        <rect width="1000" height="470" fill="url(#obGridEn)" />

        <rect
          x="228"
          y="292"
          width="520"
          height="72"
          rx="12"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="7 6"
        />

        <text
          x="490"
          y="322"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#1E5BB8"
        >
          BULLISH ORDER BLOCK
        </text>

        <text
          x="490"
          y="344"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          Potential area of interest on a retracement
        </text>

        <path
          d="M80 335
             L135 310
             L190 340
             L245 300
             L290 329
             L330 305"
          fill="none"
          stroke="#475569"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M330 305
             L385 250
             L435 205
             L485 150
             L535 105"
          fill="none"
          stroke="#2563eb"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="391"
          y="170"
          width="118"
          height="29"
          rx="14.5"
          fill="#2563eb"
        />

        <text
          x="450"
          y="189"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          DISPLACEMENT
        </text>

        <line
          x1="280"
          y1="252"
          x2="570"
          y2="252"
          stroke="#64748b"
          strokeWidth="1.8"
          strokeDasharray="7 6"
        />

        <rect
          x="512"
          y="217"
          width="54"
          height="26"
          rx="13"
          fill="#0f172a"
        />

        <text
          x="539"
          y="235"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          BOS
        </text>

        <path
          d="M535 105
             L595 137
             L645 170
             L690 222
             L722 300
             L755 323
             L800 285
             L850 225
             L905 175"
          fill="none"
          stroke="#1E5BB8"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx="755"
          cy="323"
          r="9"
          fill="#fff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <rect
          x="714"
          y="374"
          width="86"
          height="29"
          rx="14.5"
          fill="#0f172a"
        />

        <text
          x="757"
          y="393"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          REACTION
        </text>

        <line
          x1="757"
          y1="365"
          x2="757"
          y2="337"
          stroke="#0f172a"
          strokeWidth="1.5"
        />

        <g>
          <rect
            x="74"
            y="55"
            width="208"
            height="74"
            rx="14"
            fill="#f8fafc"
            stroke="#cbd5e1"
          />

          <text
            x="178"
            y="83"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#0f172a"
          >
            1 — STRONG MOVE
          </text>

          <text
            x="178"
            y="105"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            Clear displacement + structure break
          </text>

          <rect
            x="74"
            y="150"
            width="208"
            height="74"
            rx="14"
            fill="#eff6ff"
            stroke="#bfdbfe"
          />

          <text
            x="178"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#1E5BB8"
          >
            2 — MARK THE POI
          </text>

          <text
            x="178"
            y="200"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#64748b"
          >
            Mark the area preceding displacement
          </text>
        </g>
      </svg>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="order-block-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#order-block"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          Close ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">{chart}</div>

      <div className="lg:hidden">
        <a
          href="#order-block-fullscreen"
          className="smc-centered-scroll block overflow-x-auto rounded-[22px]"
        >
          {chart}
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe horizontally to explore the full chart — tap to enlarge</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SmartMoneyConceptsStrategyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
    url: PAGE_URL,
    datePublished: "2026-09-06",
    dateModified: "2026-09-06",
    author: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: BASE_URL,
    },
    articleSection: "Trading Strategies",
    keywords: [
      "Smart Money Concepts",
      "SMC trading",
      "SMC trading strategy",
      "Smart Money Concepts trading strategy",
      "market structure",
      "BOS",
      "Break of Structure",
      "CHoCH",
      "Change of Character",
      "liquidity",
      "liquidity sweep",
      "buy-side liquidity",
      "sell-side liquidity",
      "order blocks",
      "fair value gap",
      "FVG",
      "displacement",
      "premium and discount",
      "price action",
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
        name: "Smart Money Concepts (SMC)",
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

  return (
    <main
      dir="ltr"
      className="min-h-screen bg-slate-50/40 pb-6 text-left md:pb-10"
    >
      <MarketStructureSMCChart fullscreen />
      <LiquiditySweepChart fullscreen />
      <OrderBlockSMCChart fullscreen />

      <div className="mx-auto max-w-[1520px] px-3 sm:px-5 lg:px-8">

        {/* =================================================
            BREADCRUMBS
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="py-4 text-[11px] font-bold text-slate-500 sm:py-5 sm:text-xs"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a
                href="/en"
                className="transition hover:text-[#1E5BB8]"
              >
                Home
              </a>
            </li>

            <li className="text-slate-300">/</li>

            <li>
              <a
                href="/en/strategies"
                className="transition hover:text-[#1E5BB8]"
              >
                Trading Strategies
              </a>
            </li>

            <li className="text-slate-300">/</li>

            <li className="text-slate-700">
              Smart Money Concepts (SMC)
            </li>
          </ol>
        </nav>

        {/* =================================================
            HERO — DESKTOP
        ================================================= */}

        <section className="hidden overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.07)] lg:block">
          <div className="grid min-h-[410px] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center bg-gradient-to-br from-white via-white to-blue-50/40 p-9 xl:p-12">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-black text-[#1E5BB8]">
                  Trading Strategy
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black text-slate-600">
                  SMC
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black text-slate-600">
                  Intermediate → Advanced
                </span>
              </div>

              <h1 className="max-w-[820px] text-[34px] font-black leading-[1.3] tracking-tight text-slate-950 xl:text-[42px]">
                Smart Money Concepts (SMC)
                <span className="block text-[#1E5BB8]">
                  Trading Strategy: Complete Guide
                </span>
              </h1>

              <p className="mt-5 max-w-[850px] text-[14px] font-medium leading-8 text-slate-600 xl:text-[15px]">
                Learn Smart Money Concepts from the ground up. This guide
                explains market structure, BOS and CHoCH, buy-side and
                sell-side liquidity, liquidity sweeps, order blocks, fair
                value gaps, displacement and premium/discount — then shows
                how traders combine them into a structured SMC trading setup.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Market Structure",
                  "BOS / CHoCH",
                  "Liquidity",
                  "Order Blocks",
                  "Fair Value Gaps",
                  "Premium / Discount",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-black text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-[10px] font-bold text-slate-500">
                <span>Last updated: September 6, 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>22–28 min read</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>Complete educational guide</span>
              </div>
            </div>

            <div className="border-l border-slate-200">
              <SmartMoneyHeroDesktopChart />
            </div>
          </div>
        </section>

        {/* =================================================
            HERO — MOBILE
        ================================================= */}

        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:hidden">
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black text-[#1E5BB8]">
                Trading Strategy
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-600">
                SMC
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-600">
                Intermediate → Advanced
              </span>
            </div>

            <h1 className="text-[25px] font-black leading-[1.35] tracking-tight text-slate-950 sm:text-[29px]">
              Smart Money Concepts (SMC)
              <span className="mt-1 block text-[20px] leading-[1.35] text-[#1E5BB8] sm:text-[23px]">
                Trading Strategy: Complete Guide
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              A practical guide to SMC trading covering market structure,
              BOS, CHoCH, liquidity sweeps, order blocks and fair value gaps,
              with educational charts showing how the concepts fit together
              in a complete trading framework.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                "BOS",
                "CHoCH",
                "Liquidity",
                "Order Block",
                "FVG",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[9px] font-black text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 text-[9px] font-bold text-slate-400">
              <span>September 6, 2026</span>
              <span>•</span>
              <span>22–28 min read</span>
            </div>

            <SmartMoneyHeroMobileChart />
          </div>
        </section>

        {/* =================================================
            ARTICLE
        ================================================= */}

        <article className="mt-6 w-full space-y-6 sm:mt-8 sm:space-y-8">

          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>
                Introduction — Smart Money Concepts
              </SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.45] text-slate-950 sm:text-[30px]">
                What Are Smart Money Concepts (SMC) in Trading?
              </h2>

              <div className="mt-5 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Smart Money Concepts (SMC)</strong> is a
                  price-action framework that organizes market analysis
                  around several connected ideas, including{" "}
                  <strong>market structure</strong>,{" "}
                  <strong>liquidity</strong>,{" "}
                  <strong>Break of Structure (BOS)</strong>,{" "}
                  <strong>Change of Character (CHoCH)</strong>,{" "}
                  <strong>order blocks</strong> and{" "}
                  <strong>Fair Value Gaps (FVGs)</strong>.
                </p>

                <p>
                  Instead of starting with an indicator that tells you when
                  to buy or sell, SMC trading begins with the behavior of
                  price itself. Traders ask whether the market is trending
                  or ranging, which swing highs and lows matter, where
                  liquidity may be concentrated, whether structure has
                  genuinely broken and where a retracement could create a
                  logical trade location.
                </p>

                <p>
                  For that reason, SMC is better understood as a{" "}
                  <strong>framework for reading price action</strong> rather
                  than one specific entry pattern. An order block or fair
                  value gap on its own does not automatically create a trade.
                  The setup becomes more meaningful when structure,
                  liquidity, displacement, location and risk all support the
                  same scenario.
                </p>
              </div>

              <ImportantBox title="Important: what “smart money” does and does not mean">
                A price chart does not reveal with certainty where a bank,
                hedge fund or other institution entered a position. SMC
                terminology is a framework traders use to interpret price
                structure, liquidity and displacement. Treat these concepts
                as testable analytical rules rather than proof of hidden
                institutional activity.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — HOW SMC WORKS
          ================================================= */}

          <section
            id="how-smc-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — How SMC Works</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                How Does the SMC Trading Strategy Work?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A structured SMC trading strategy does not begin with
                “Should I buy now?” Instead, it moves through a sequence of
                questions. Each step narrows the scenario until the trader
                can define an entry, invalidation point, target and risk.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "Structure",
                    text: "Identify the prevailing structure and the important swing highs and lows.",
                  },
                  {
                    n: "02",
                    title: "Liquidity",
                    text: "Map areas where liquidity may be concentrated around obvious highs and lows.",
                  },
                  {
                    n: "03",
                    title: "Structure Break",
                    text: "Watch for BOS or a potential structural shift such as CHoCH.",
                  },
                  {
                    n: "04",
                    title: "Point of Interest",
                    text: "Look for an order block, FVG or another logical retracement area.",
                  },
                  {
                    n: "05",
                    title: "Execution",
                    text: "Define confirmation, invalidation, position risk and the target.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#2B6FD0]">
                        {item.n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.16em] text-blue-300">
                  SMC DECISION FLOW
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-black sm:text-xs">
                  {[
                    "STRUCTURE",
                    "→",
                    "LIQUIDITY",
                    "→",
                    "BOS / CHoCH",
                    "→",
                    "POI",
                    "→",
                    "CONFIRMATION",
                    "→",
                    "RISK",
                  ].map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className={
                        item === "→"
                          ? "text-slate-500"
                          : "rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              02 — MARKET STRUCTURE
          ================================================= */}

          <section
            id="market-structure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — Market Structure</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Market Structure in SMC: The Foundation of Smart Money Trading
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Before marking order blocks or fair value gaps, determine{" "}
                <strong>which side currently controls market structure</strong>.
                A bullish structure typically forms a sequence of{" "}
                <strong>Higher Highs (HH)</strong> and{" "}
                <strong>Higher Lows (HL)</strong>. A bearish structure
                typically produces <strong>Lower Highs (LH)</strong> and{" "}
                <strong>Lower Lows (LL)</strong>. This structural map gives
                meaning to later concepts such as BOS and CHoCH.
              </p>

              <div className="mt-7">
                <MarketStructureSMCChart />
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    BULLISH STRUCTURE
                  </div>

                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    Higher Highs + Higher Lows
                  </h3>

                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    A sequence of higher highs and higher lows indicates that
                    buyers continue to push price to new highs while
                    defending progressively higher swing lows.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[10px] font-black text-slate-500">
                    BEARISH STRUCTURE
                  </div>

                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    Lower Highs + Lower Lows
                  </h3>

                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    A sequence of lower highs and lower lows supports a
                    bearish structural bias while sellers continue to defend
                    lower swing highs and push price to new lows.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-[10px] font-black text-slate-500">
                    RANGE
                  </div>

                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    No Clear Directional Structure
                  </h3>

                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    When price fails to maintain a clear HH/HL or LH/LL
                    sequence, the market may be ranging. Liquidity around the
                    range boundaries can become more useful than forcing a
                    directional bias.
                  </p>
                </div>
              </div>

              <ImportantBox title="Start with structure before marking SMC zones">
                A common SMC mistake is opening a chart and immediately
                drawing dozens of order blocks and fair value gaps. Without
                first identifying the important swing highs, swing lows and
                prevailing structure, those zones have very little context.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              03 — BOS
          ================================================= */}

          <section
            id="bos"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — Break of Structure (BOS)</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                What Is BOS (Break of Structure) in SMC Trading?
              </h2>

              <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                  <p>
                    <strong>BOS</strong> stands for{" "}
                    <strong>Break of Structure</strong>. In Smart Money
                    Concepts, the term is commonly used when price breaks a
                    meaningful swing point in the direction of the prevailing
                    structure.
                  </p>

                  <p>
                    In a bullish market structure, price may form higher highs
                    and higher lows before breaking above a previous
                    structural high. SMC traders may classify that move as a{" "}
                    <strong>bullish BOS</strong>. In bearish structure, a
                    decisive break below an important structural low may
                    support continuation of the bearish sequence.
                  </p>

                  <p>
                    Not every small breakout should be labeled a BOS. The
                    significance of the swing, whether price closes beyond the
                    level, the strength of the move and the surrounding
                    liquidity context all matter when deciding whether the
                    break is structurally meaningful.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#2B6FD0]">
                    BOS CHECKLIST
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "Is the broken level a meaningful swing high or swing low?",
                      "Is the break aligned with the prevailing market structure?",
                      "Did price show clear displacement through the level?",
                      "Was there a convincing close or only a temporary wick?",
                      "Where is liquidity positioned relative to the break?",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                          {index + 1}
                        </span>

                        <span className="text-[11px] font-bold leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              04 — CHoCH
          ================================================= */}

          <section
            id="choch"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — Change of Character (CHoCH)</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                What Is CHoCH in Trading? BOS vs CHoCH Explained
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <strong>CHoCH</strong> stands for{" "}
                <strong>Change of Character</strong>. While BOS is commonly
                associated with a break in the direction of the prevailing
                structure, CHoCH describes a meaningful break{" "}
                <strong>against that structure</strong>. SMC traders often
                monitor it as an early indication that the current trend may
                be losing control.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    BOS — BREAK OF STRUCTURE
                  </div>

                  <h3 className="mt-2 text-base font-black text-slate-900">
                    Potential Continuation
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    A bullish market breaks an important high, or a bearish
                    market breaks an important low. The primary interpretation
                    is that the prevailing structure remains in control.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-slate-500">
                    CHoCH — CHANGE OF CHARACTER
                  </div>

                  <h3 className="mt-2 text-base font-black text-slate-900">
                    Potential Structural Shift
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    Price breaks an important structural point against the
                    previous trend. Something may be changing, but the break
                    alone does not automatically confirm a new trend.
                  </p>
                </div>
              </div>

              <ImportantBox title="CHoCH is not an automatic buy or sell signal">
                A bearish CHoCH after an uptrend does not mean you should
                immediately sell, and a bullish CHoCH after a downtrend is not
                an automatic long entry. Consider where the break occurred
                relative to liquidity, then look for additional structure or
                confirmation before building a trade scenario.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              05 — LIQUIDITY
          ================================================= */}

          <section
            id="liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — Liquidity</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Liquidity in SMC Trading: Buy-Side and Sell-Side Liquidity
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Liquidity</strong> is one of the central ideas in
                  Smart Money Concepts. In practical chart analysis, traders
                  pay attention to obvious price levels where orders may be
                  concentrated, including previous highs, previous lows,
                  equal highs and equal lows.
                </p>

                <p>
                  Liquidity located above highs is commonly called{" "}
                  <strong>Buy-Side Liquidity (BSL)</strong>, while liquidity
                  below lows is referred to as{" "}
                  <strong>Sell-Side Liquidity (SSL)</strong>. These areas are
                  not guaranteed price targets. They are reference points that
                  traders map before observing how price behaves when those
                  levels are approached or taken.
                </p>
              </div>

              <div className="mt-7">
                <LiquiditySweepChart />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Equal Highs",
                    text: "A visible cluster of similar highs that traders may monitor as potential buy-side liquidity.",
                  },
                  {
                    title: "Equal Lows",
                    text: "A cluster of similar lows that may contain stops or other orders below price.",
                  },
                  {
                    title: "Previous High",
                    text: "A previous daily, weekly or significant swing high can become an important liquidity reference.",
                  },
                  {
                    title: "Previous Low",
                    text: "A clear prior low can become an area of interest as price approaches potential sell-side liquidity.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <h3 className="text-sm font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              06 — LIQUIDITY SWEEP
          ================================================= */}

          <section
            id="liquidity-sweep"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Liquidity Sweep</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                What Is a Liquidity Sweep in SMC Trading?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A <strong>liquidity sweep</strong> occurs when price trades
                beyond an obvious liquidity area — such as a previous high,
                previous low or a cluster of equal highs or lows — and then
                fails to continue as a straightforward breakout. SMC traders
                focus on what happens <strong>after liquidity is taken</strong>:
                Does price reject the level? Does lower-timeframe structure
                shift? Is there displacement in the opposite direction? Is
                there a logical point of interest for a potential entry?
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Identify Liquidity",
                    text: "Mark a clear high, low, equal highs, equal lows or another meaningful structural level.",
                  },
                  {
                    n: "02",
                    title: "Wait for the Sweep",
                    text: "Do not assume a reversal before price actually trades into or through the liquidity area.",
                  },
                  {
                    n: "03",
                    title: "Look for Confirmation",
                    text: "Combine the sweep with structure, displacement or a return to a valid POI instead of entering from the level alone.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[11px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <h3 className="text-base font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
                <div className="text-[11px] font-black text-amber-800">
                  Liquidity Sweep ≠ Guaranteed Reversal
                </div>

                <p className="mt-2 text-[12px] font-medium leading-7 text-amber-950/70 sm:text-[13px]">
                  Price can trade above a high simply because bullish momentum
                  remains strong and then continue higher. A sweep or brief
                  break of liquidity should not be used as an independent
                  reason to trade against the prevailing market direction.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              07 — ORDER BLOCKS
          ================================================= */}

          <section
            id="order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — Order Blocks</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                What Is an Order Block in SMC Trading?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  An <strong>order block</strong> is a price area that Smart
                  Money Concepts traders commonly identify immediately before
                  a strong directional move or displacement. A widely used
                  interpretation looks for the final opposing candle or price
                  movement before an impulse that produces a meaningful
                  structural break.
                </p>

                <p>
                  The common mistake is labeling every bearish candle before
                  a rally as a <strong>bullish order block</strong>, or every
                  bullish candle before a decline as a{" "}
                  <strong>bearish order block</strong>. Doing that can produce
                  dozens of zones on almost any chart. An order block becomes
                  more useful when it has context: liquidity, displacement,
                  market structure and a meaningful reaction or break.
                </p>
              </div>

              <div className="mt-7">
                <OrderBlockSMCChart />
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    BULLISH ORDER BLOCK
                  </div>

                  <h3 className="mt-2 text-base font-black text-slate-900">
                    Potential Bullish Area of Interest
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    A zone preceding meaningful bullish displacement. If price
                    later retraces into the area, the trader watches for a
                    bullish reaction or confirmation rather than buying
                    automatically on the first touch.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-slate-500">
                    BEARISH ORDER BLOCK
                  </div>

                  <h3 className="mt-2 text-base font-black text-slate-900">
                    Potential Bearish Area of Interest
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    A zone preceding meaningful bearish displacement. A return
                    to the area may become relevant inside a bearish scenario,
                    but invalidation and risk still need to be clearly defined.
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                  STRONGER ORDER BLOCK CONTEXT
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    [
                      "01",
                      "Liquidity",
                      "Price took or interacted with meaningful liquidity before the move.",
                    ],
                    [
                      "02",
                      "Displacement",
                      "Price left the area with clear directional strength.",
                    ],
                    [
                      "03",
                      "Structure",
                      "The move contributed to a BOS or another meaningful structural event.",
                    ],
                    [
                      "04",
                      "Return",
                      "Price returns while the original structural context remains valid.",
                    ],
                  ].map(([n, title, text]) => (
                    <div
                      key={n}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-[9px] font-black text-blue-300">
                          {n}
                        </div>

                        <div className="text-xs font-black">
                          {title}
                        </div>
                      </div>

                      <p className="mt-2 text-[10px] font-medium leading-6 text-slate-300">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <ImportantBox title="Why not enter immediately from every order block?">
                The zone itself cannot tell you whether price will respect it
                on the next visit. Know why the order block was marked, how it
                relates to market structure and liquidity, and exactly what
                would invalidate the setup. The next sections connect order
                blocks with fair value gaps, displacement and premium/discount
                to build a complete SMC trading framework.
              </ImportantBox>
            </div>
          </section>
                    {/* =================================================
              08 — FAIR VALUE GAP
          ================================================= */}

          <section
            id="fair-value-gap"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Fair Value Gap (FVG)</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                What Is a Fair Value Gap (FVG) in SMC Trading?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A <strong>Fair Value Gap (FVG)</strong> is a price imbalance
                  commonly identified through a three-candle sequence. It
                  appears when a strong directional move creates an area where
                  part of the first candle&apos;s range does not overlap with
                  the third candle&apos;s range.
                </p>

                <p>
                  In SMC trading, fair value gaps are often associated with
                  <strong> displacement</strong>. Traders may monitor the
                  imbalance when price later retraces, especially when the FVG
                  aligns with market structure, liquidity and another point of
                  interest such as an order block.
                </p>

                <p>
                  The important point is that an FVG is not automatically an
                  entry signal. Markets can leave multiple imbalances behind,
                  ignore them for long periods or never fully retrace into
                  them. Context determines whether an FVG deserves attention.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <div className="text-[10px] font-black tracking-[0.12em] text-[#2B6FD0]">
                    BULLISH FVG
                  </div>

                  <div className="mt-5 flex items-end justify-center gap-3">
                    <div className="relative h-28 w-12">
                      <div className="absolute bottom-4 left-1/2 h-24 w-[2px] -translate-x-1/2 bg-slate-400" />
                      <div className="absolute bottom-10 left-1/2 h-12 w-7 -translate-x-1/2 rounded-sm bg-slate-400" />
                    </div>

                    <div className="relative h-40 w-12">
                      <div className="absolute bottom-2 left-1/2 h-36 w-[2px] -translate-x-1/2 bg-[#2563eb]" />
                      <div className="absolute bottom-7 left-1/2 h-28 w-7 -translate-x-1/2 rounded-sm bg-[#2563eb]" />
                    </div>

                    <div className="relative h-36 w-12">
                      <div className="absolute bottom-6 left-1/2 h-28 w-[2px] -translate-x-1/2 bg-[#1E5BB8]" />
                      <div className="absolute bottom-12 left-1/2 h-16 w-7 -translate-x-1/2 rounded-sm bg-[#1E5BB8]" />
                    </div>
                  </div>

                  <div className="mx-auto mt-2 max-w-[210px] rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center">
                    <div className="text-[10px] font-black text-[#1E5BB8]">
                      FAIR VALUE GAP
                    </div>

                    <div className="mt-1 text-[10px] font-bold leading-5 text-slate-500">
                      Non-overlapping area within the three-candle sequence
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      n: "01",
                      title: "Three-Candle Structure",
                      text: "Identify the first, displacement and third candles that create the imbalance.",
                    },
                    {
                      n: "02",
                      title: "Clear Displacement",
                      text: "The FVG is more meaningful when it forms during a decisive directional move.",
                    },
                    {
                      n: "03",
                      title: "Structural Context",
                      text: "Ask whether the imbalance supports the prevailing structure or a confirmed structural shift.",
                    },
                    {
                      n: "04",
                      title: "Retracement",
                      text: "If price returns, monitor the reaction rather than assuming the gap must automatically hold.",
                    },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                          {item.n}
                        </div>

                        <h3 className="text-sm font-black text-slate-900">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <ImportantBox title="Does every Fair Value Gap get filled?">
                No. Price does not have to return to every FVG, and there is
                no rule that every imbalance must be completely filled.
                Treating every visible gap as a guaranteed future target is
                one of the easiest ways to misuse the concept.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — DISPLACEMENT
          ================================================= */}

          <section
            id="displacement"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — Displacement</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                What Is Displacement in Smart Money Concepts?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <strong>Displacement</strong> describes a strong and decisive
                directional price move. Instead of price slowly drifting
                through a level, displacement typically shows clear momentum,
                larger candle bodies and limited overlap between consecutive
                candles. It may also create an imbalance such as a Fair Value
                Gap.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-slate-500">
                    WEAK PRICE MOVE
                  </div>

                  <div className="mt-5 flex h-28 items-end justify-center gap-2">
                    {[48, 56, 43, 61, 50, 58].map((height, index) => (
                      <div
                        key={index}
                        className="w-7 rounded-t bg-slate-300"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>

                  <h3 className="mt-5 text-sm font-black text-slate-900">
                    Overlapping and Indecisive
                  </h3>

                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    Heavy candle overlap and weak follow-through can make a
                    structural break less convincing.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    DISPLACEMENT
                  </div>

                  <div className="mt-5 flex h-28 items-end justify-center gap-2">
                    {[35, 52, 72, 94, 108].map((height, index) => (
                      <div
                        key={index}
                        className="w-7 rounded-t bg-[#2B6FD0]"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>

                  <h3 className="mt-5 text-sm font-black text-slate-900">
                    Decisive Directional Expansion
                  </h3>

                  <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                    Strong expansion through an important level can add
                    credibility to BOS, CHoCH or a move away from a point of
                    interest.
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                  WHY DISPLACEMENT MATTERS
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-black sm:text-xs">
                  {[
                    "Liquidity Event",
                    "→",
                    "Displacement",
                    "→",
                    "Structure Break",
                    "→",
                    "FVG / POI",
                    "→",
                    "Retracement",
                  ].map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className={
                        item === "→"
                          ? "text-slate-500"
                          : "rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              10 — PREMIUM / DISCOUNT
          ================================================= */}

          <section
            id="premium-discount"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — Premium & Discount</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Premium and Discount Zones in SMC Trading
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                SMC traders sometimes divide a defined price range into a
                <strong> premium</strong> half and a{" "}
                <strong>discount</strong> half. The midpoint of that range is
                commonly called <strong>equilibrium</strong>. The concept is
                used as a location filter rather than an independent trading
                signal.
              </p>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div className="grid md:grid-cols-2">
                  <div className="border-b border-slate-200 bg-slate-50/70 p-5 sm:p-6 md:border-b-0 md:border-r">
                    <div className="text-[10px] font-black text-slate-500">
                      PREMIUM
                    </div>

                    <h3 className="mt-2 text-base font-black text-slate-900">
                      Upper Half of the Defined Range
                    </h3>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      In a bearish scenario, traders may prefer to look for
                      short opportunities from a premium location rather than
                      selling after price has already moved deeply into the
                      lower part of the range.
                    </p>
                  </div>

                  <div className="bg-blue-50/50 p-5 sm:p-6">
                    <div className="text-[10px] font-black text-[#1E5BB8]">
                      DISCOUNT
                    </div>

                    <h3 className="mt-2 text-base font-black text-slate-900">
                      Lower Half of the Defined Range
                    </h3>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      In a bullish scenario, traders may prefer to look for
                      long opportunities from a discount location instead of
                      chasing price near the upper boundary of the range.
                    </p>
                  </div>
                </div>

                <div className="relative h-20 border-t border-slate-200 bg-white">
                  <div className="absolute left-[8%] right-[8%] top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-full bg-slate-100">
                    <div className="absolute left-0 top-0 h-full w-1/2 bg-blue-100" />
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-slate-200" />
                  </div>

                  <div className="absolute left-1/2 top-1/2 h-8 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-slate-500" />

                  <div className="absolute left-[25%] top-2 text-[9px] font-black text-[#1E5BB8]">
                    DISCOUNT
                  </div>

                  <div className="absolute right-[25%] top-2 text-[9px] font-black text-slate-500">
                    PREMIUM
                  </div>

                  <div className="absolute left-1/2 bottom-2 -translate-x-1/2 text-[9px] font-black text-slate-700">
                    50% EQUILIBRIUM
                  </div>
                </div>
              </div>

              <ImportantBox title="The range you select matters">
                Premium and discount are relative to a defined trading range.
                If the swing high and swing low are selected inconsistently,
                the midpoint becomes arbitrary. Determine the relevant market
                structure first, then use premium or discount only as an
                additional location filter.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              11 — COMPLETE SMC SETUP
          ================================================= */}

          <section
            id="smc-trading-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — Complete SMC Strategy</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                How to Trade Smart Money Concepts Step by Step
              </h2>

              <p className="mt-4 max-w-[1100px] text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                The concepts become useful when they are organized into a
                repeatable process. The following model is an educational SMC
                framework rather than a promise that every setup will work.
                Its purpose is to prevent random entries based on isolated
                order blocks, FVGs or liquidity sweeps.
              </p>

              <div className="mt-7 grid gap-3 lg:grid-cols-2">
                {[
                  {
                    n: "01",
                    title: "Establish Higher-Timeframe Structure",
                    text: "Determine whether the relevant market structure is bullish, bearish or ranging. Mark the swing points that actually define that structure.",
                  },
                  {
                    n: "02",
                    title: "Map Important Liquidity",
                    text: "Identify previous highs and lows, equal highs or lows, and other obvious structural levels that may attract price.",
                  },
                  {
                    n: "03",
                    title: "Wait for Price to Reach the Area",
                    text: "Avoid predicting a sweep before it happens. Let price interact with the liquidity or higher-timeframe point of interest first.",
                  },
                  {
                    n: "04",
                    title: "Watch the Reaction",
                    text: "Look for evidence such as rejection, displacement, CHoCH or another meaningful lower-timeframe structural development.",
                  },
                  {
                    n: "05",
                    title: "Identify the Entry POI",
                    text: "After confirmation, mark the relevant order block, FVG or overlapping area that logically belongs to the setup.",
                  },
                  {
                    n: "06",
                    title: "Define Invalidation",
                    text: "Know exactly where the trade idea becomes invalid. The stop should reflect the setup logic rather than an arbitrary number of pips.",
                  },
                  {
                    n: "07",
                    title: "Choose a Logical Target",
                    text: "Potential targets may include opposing liquidity, a previous high or low, or another structural objective supported by the scenario.",
                  },
                  {
                    n: "08",
                    title: "Calculate Risk Before Entry",
                    text: "Position size should be based on the distance to invalidation and the percentage of capital you are prepared to risk.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900 sm:text-base">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-[24px] bg-slate-950 p-5 text-white sm:p-7">
                <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                  COMPLETE SMC MODEL
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[10px] font-black sm:text-xs">
                  {[
                    "HTF STRUCTURE",
                    "→",
                    "LIQUIDITY",
                    "→",
                    "SWEEP / REACTION",
                    "→",
                    "CHoCH / BOS",
                    "→",
                    "POI",
                    "→",
                    "ENTRY",
                    "→",
                    "TARGET LIQUIDITY",
                  ].map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className={
                        item === "→"
                          ? "text-slate-500"
                          : "rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              12 — BULLISH EXAMPLE
          ================================================= */}

          <section
            id="smc-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — SMC Trade Example</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Bullish SMC Trading Setup Example
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Consider a market with a broader bullish bias that begins a
                retracement. Instead of buying immediately, an SMC trader can
                build the scenario one piece at a time.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Bullish Context",
                    text: "The higher-timeframe structure remains bullish and the relevant swing low has not been invalidated.",
                  },
                  {
                    n: "02",
                    title: "Sell-Side Liquidity",
                    text: "Price approaches a previous low or equal lows where sell-side liquidity may be located.",
                  },
                  {
                    n: "03",
                    title: "Liquidity Sweep",
                    text: "Price trades below the low and then fails to continue aggressively lower.",
                  },
                  {
                    n: "04",
                    title: "Bullish Shift",
                    text: "Lower-timeframe price action produces bullish displacement and a meaningful structural shift.",
                  },
                  {
                    n: "05",
                    title: "Retracement to POI",
                    text: "Price retraces toward a bullish order block, FVG or an area where both concepts overlap.",
                  },
                  {
                    n: "06",
                    title: "Execution & Target",
                    text: "Risk is defined below logical invalidation, while the target may be opposing buy-side liquidity or a structural high.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Confluence is more useful than collecting terminology">
                The objective is not to find as many SMC labels as possible.
                A clean setup may only require a clear structural bias,
                meaningful liquidity, a confirmed reaction and a logical
                entry area. Adding unnecessary concepts can make execution
                less consistent rather than more accurate.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              13 — LONG VS SHORT
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Long vs Short Setups</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Bullish vs Bearish SMC Trading Setups
              </h2>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="grid grid-cols-[0.8fr_1fr_1fr] bg-slate-950 text-white">
                  <div className="p-3 text-[10px] font-black sm:p-4">
                    ELEMENT
                  </div>

                  <div className="border-l border-white/10 p-3 text-[10px] font-black sm:p-4">
                    BULLISH SMC
                  </div>

                  <div className="border-l border-white/10 p-3 text-[10px] font-black sm:p-4">
                    BEARISH SMC
                  </div>
                </div>

                {[
                  ["Bias", "Bullish structure", "Bearish structure"],
                  ["Liquidity", "Sell-side liquidity", "Buy-side liquidity"],
                  ["Sweep", "Below lows", "Above highs"],
                  ["Shift", "Bullish CHoCH / BOS", "Bearish CHoCH / BOS"],
                  ["POI", "Bullish OB / FVG", "Bearish OB / FVG"],
                  ["Target", "Buy-side liquidity", "Sell-side liquidity"],
                ].map(([label, bullish, bearish], index) => (
                  <div
                    key={label}
                    className={`grid grid-cols-[0.8fr_1fr_1fr] ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    }`}
                  >
                    <div className="p-3 text-[10px] font-black text-slate-700 sm:p-4 sm:text-xs">
                      {label}
                    </div>

                    <div className="border-l border-slate-200 p-3 text-[10px] font-bold text-slate-600 sm:p-4 sm:text-xs">
                      {bullish}
                    </div>

                    <div className="border-l border-slate-200 p-3 text-[10px] font-bold text-slate-600 sm:p-4 sm:text-xs">
                      {bearish}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              14 — TIMEFRAMES
          ================================================= */}

          <section
            id="smc-timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — Timeframe Analysis</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Best Timeframes for Smart Money Concepts Trading
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                There is no single best timeframe for SMC trading. A practical
                approach is to separate the timeframe used for{" "}
                <strong>context</strong> from the timeframe used for{" "}
                <strong>execution</strong>. Higher timeframes can define
                structure and important liquidity, while lower timeframes can
                refine the entry.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: "Higher-Timeframe Bias",
                    value: "Daily / 4H",
                    text: "Identify broader structure, major highs and lows, and important areas.",
                  },
                  {
                    label: "Setup Context",
                    value: "4H / 1H",
                    text: "Refine liquidity, structural levels and the higher-timeframe point of interest.",
                  },
                  {
                    label: "Intraday Structure",
                    value: "1H / 15M",
                    text: "Monitor the reaction as price reaches the area of interest.",
                  },
                  {
                    label: "Entry Refinement",
                    value: "15M / 5M",
                    text: "Optional lower-timeframe confirmation for traders who use more precise execution.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
                  >
                    <div className="text-[9px] font-black text-slate-400">
                      {item.label.toUpperCase()}
                    </div>

                    <div className="mt-2 text-xl font-black text-[#1E5BB8]">
                      {item.value}
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Avoid changing your bias every time you change timeframe">
                A five-minute bearish move can exist inside a one-hour
                retracement that is itself part of a daily bullish trend.
                Decide what each timeframe is being used for before analyzing
                the chart. Otherwise, lower-timeframe noise can constantly
                override the original setup.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              15 — STOP LOSS
          ================================================= */}

          <section
            id="smc-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — Stop Loss & Invalidation</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Where to Place a Stop Loss in an SMC Trading Strategy
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Invalidation should come from the logic of the trade setup.
                The question is not simply, “How many pips should my stop
                loss be?” Instead ask,{" "}
                <strong>
                  “At what price would the reason for this trade no longer be
                  valid?”
                </strong>
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "Beyond Structural Invalidation",
                    text: "The stop may be placed beyond a swing point whose break would invalidate the structural premise of the setup.",
                  },
                  {
                    title: "Beyond the Liquidity Event",
                    text: "Some setups use the extreme of the liquidity sweep when a move beyond that point would invalidate the expected reaction.",
                  },
                  {
                    title: "Beyond the POI",
                    text: "A stop can sometimes sit beyond the order block or entry area when a decisive break through it invalidates the setup.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                  >
                    <h3 className="text-sm font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-red-200 bg-red-50/60 p-5 sm:p-6">
                <div className="text-[11px] font-black text-red-700">
                  Do not move the stop simply because price is approaching it
                </div>

                <p className="mt-2 text-[12px] font-medium leading-7 text-red-900/70 sm:text-[13px]">
                  If the original invalidation level was chosen logically,
                  repeatedly widening the stop changes the risk of the trade
                  after entry. Define invalidation and position size before
                  executing the setup.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              16 — TAKE PROFIT
          ================================================= */}

          <section
            id="smc-take-profit"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — Profit Targets</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                How to Set Take-Profit Targets With SMC
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                SMC traders often use <strong>opposing liquidity</strong> and
                structural levels as potential profit objectives. A bullish
                setup might target a previous high or buy-side liquidity,
                while a bearish setup might target a previous low or
                sell-side liquidity.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Previous High", "Potential objective for a bullish setup."],
                  ["Previous Low", "Potential objective for a bearish setup."],
                  ["Equal Highs / Lows", "Visible liquidity may provide a logical reference target."],
                  ["Higher-Timeframe Level", "A major structural level can override a smaller lower-timeframe objective."],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <h3 className="text-sm font-black text-slate-900">
                      {title}
                    </h3>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Check reward-to-risk before taking the trade">
                A technically attractive SMC setup may still be a poor trade
                if the logical target is too close relative to the required
                stop. Determine the entry, invalidation and realistic target
                before deciding whether the opportunity is worth taking.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              17 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — Risk Management</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Risk Management for Smart Money Concepts Trading
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Smart Money Concepts does not remove trading risk. Even a
                setup containing structure, liquidity, displacement, an order
                block and an FVG can fail. Risk management determines whether
                a series of losing trades remains manageable.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <h3 className="text-base font-black text-slate-900">
                    Before Every SMC Trade
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "Define the exact invalidation level.",
                      "Choose the percentage of account equity you are willing to risk.",
                      "Calculate position size from the stop distance.",
                      "Identify a realistic structural or liquidity target.",
                      "Check the reward-to-risk profile before entry.",
                      "Accept that the setup can fail even when every rule is present.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3"
                      >
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                          ✓
                        </span>

                        <span className="text-[11px] font-bold leading-6 text-slate-600">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                  <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                    POSITION SIZE LOGIC
                  </div>

                  <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                    <div className="text-[11px] font-bold text-slate-400">
                      Risk Amount
                    </div>

                    <div className="my-3 text-xl font-black text-white">
                      ÷
                    </div>

                    <div className="text-[11px] font-bold text-slate-400">
                      Stop-Loss Distance
                    </div>

                    <div className="my-3 border-t border-white/10" />

                    <div className="text-sm font-black text-blue-300">
                      Appropriate Position Size
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] font-medium leading-6 text-slate-300">
                    Exact position-size calculations depend on the instrument,
                    contract specification and account currency. Use the
                    correct calculation for the market you trade.
                  </p>

                  <a
                    href="/en/tools/risk-calculator"
                    className="mt-5 inline-flex rounded-xl bg-white px-4 py-2.5 text-[11px] font-black text-slate-900 transition hover:bg-blue-50"
                  >
                    Risk Calculator →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              18 — COMMON MISTAKES
          ================================================= */}

          <section
            id="smc-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — Common SMC Mistakes</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Common Smart Money Concepts Trading Mistakes
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Marking Every Candle as an Order Block",
                    text: "Without displacement, structure and context, the chart quickly becomes filled with meaningless zones.",
                  },
                  {
                    n: "02",
                    title: "Treating Every Wick as a Liquidity Sweep",
                    text: "A wick beyond a high or low is not automatically a reversal signal. What price does afterward matters.",
                  },
                  {
                    n: "03",
                    title: "Calling Every Break BOS",
                    text: "Small internal movements should not automatically be treated as meaningful breaks of market structure.",
                  },
                  {
                    n: "04",
                    title: "Trading CHoCH Without Context",
                    text: "A counter-structure break can be temporary. Liquidity, location and higher-timeframe structure still matter.",
                  },
                  {
                    n: "05",
                    title: "Assuming Every FVG Must Fill",
                    text: "Price can leave an imbalance behind and continue moving without returning to it.",
                  },
                  {
                    n: "06",
                    title: "Ignoring Risk Management",
                    text: "No SMC concept can compensate for oversized positions, undefined invalidation or uncontrolled losses.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-500">
                        {item.n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              19 — SMC VS PRICE ACTION
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — SMC vs Price Action</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Smart Money Concepts vs Traditional Price Action
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                SMC and traditional price action are not completely separate
                worlds. Both analyze price structure and important levels.
                Much of the difference comes from terminology, emphasis and
                how individual concepts are organized into a trading model.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="grid grid-cols-[0.8fr_1fr_1fr] bg-slate-950 text-white">
                  <div className="p-3 text-[10px] font-black sm:p-4">
                    AREA
                  </div>

                  <div className="border-l border-white/10 p-3 text-[10px] font-black sm:p-4">
                    SMC
                  </div>

                  <div className="border-l border-white/10 p-3 text-[10px] font-black sm:p-4">
                    PRICE ACTION
                  </div>
                </div>

                {[
                  ["Structure", "BOS / CHoCH terminology", "Swing highs/lows, trend structure"],
                  ["Levels", "Liquidity + POIs", "Support and resistance"],
                  ["Zones", "Order blocks", "Supply / demand or price zones"],
                  ["Imbalance", "Fair Value Gap", "Momentum / inefficient price movement"],
                  ["Entry", "POI + confirmation", "Level + price-action confirmation"],
                ].map(([label, smc, pa], index) => (
                  <div
                    key={label}
                    className={`grid grid-cols-[0.8fr_1fr_1fr] ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    }`}
                  >
                    <div className="p-3 text-[10px] font-black text-slate-700 sm:p-4 sm:text-xs">
                      {label}
                    </div>

                    <div className="border-l border-slate-200 p-3 text-[10px] font-bold text-slate-600 sm:p-4 sm:text-xs">
                      {smc}
                    </div>

                    <div className="border-l border-slate-200 p-3 text-[10px] font-bold text-slate-600 sm:p-4 sm:text-xs">
                      {pa}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href="/en/strategies/price-action"
                  className="inline-flex items-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-[11px] font-black text-[#1E5BB8] transition hover:bg-blue-100"
                >
                  Read our Price Action Trading Strategy guide →
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              20 — SMC VS ICT
          ================================================= */}

          <section
            id="smc-vs-ict"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — SMC vs ICT</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                SMC vs ICT Trading: Are They the Same?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Smart Money Concepts (SMC)</strong> and{" "}
                  <strong>ICT trading</strong> overlap heavily in the language
                  traders use to discuss liquidity, market structure, order
                  blocks, fair value gaps and displacement.
                </p>

                <p>
                  However, the terms should not automatically be treated as
                  interchangeable. SMC is commonly used as a broad label for a
                  family of price-action concepts, while ICT refers to the
                  methodology and educational material associated with the
                  Inner Circle Trader.
                </p>

                <p>
                  For a trader, the practical issue is consistency. Define the
                  concepts you use, create objective rules for identifying
                  them and test the complete setup rather than mixing
                  terminology from multiple models without clear criteria.
                </p>
              </div>

              <a
                href="/en/strategies/ict"
                className="mt-6 inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-[11px] font-black text-[#1E5BB8] transition hover:bg-blue-100"
              >
                Explore the ICT Trading Strategy guide →
              </a>
            </div>
          </section>

          {/* =================================================
              21 — PROS & CONS
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>21 — Advantages & Limitations</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Smart Money Concepts: Pros and Cons
              </h2>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-base font-black text-slate-900">
                    Potential Advantages
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "Creates a structured framework for reading price action.",
                      "Encourages traders to analyze market structure before entering.",
                      "Combines liquidity, location and confirmation instead of relying on one signal.",
                      "Can be adapted across multiple markets and timeframes.",
                      "Provides logical areas for invalidation and potential targets.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[12px] font-medium leading-7 text-slate-700"
                      >
                        <span className="mt-1 font-black text-[#2B6FD0]">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <h3 className="text-base font-black text-slate-900">
                    Limitations
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "Many concepts are discretionary unless the trader defines objective rules.",
                      "Charts can become overcomplicated when too many zones are marked.",
                      "Terminology is not always used consistently across SMC educators.",
                      "Historical charts can make setups look clearer than they were in real time.",
                      "No combination of SMC concepts guarantees profitable trades.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[12px] font-medium leading-7 text-slate-700"
                      >
                        <span className="mt-1 font-black text-slate-400">
                          —
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              22 — BEGINNER ROADMAP
          ================================================= */}

          <section
            id="smc-for-beginners"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>22 — SMC for Beginners</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                How to Learn Smart Money Concepts as a Beginner
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Beginners often struggle with SMC because they try to learn
                every term at once. A better approach is to build the
                framework in layers. Do not move to the next concept until you
                can identify the previous one consistently on historical and
                live charts.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Learn Market Structure",
                    text: "Practice identifying swing highs, swing lows, HH, HL, LH and LL.",
                  },
                  {
                    n: "02",
                    title: "Learn BOS & CHoCH",
                    text: "Separate continuation breaks from meaningful counter-structure shifts.",
                  },
                  {
                    n: "03",
                    title: "Map Liquidity",
                    text: "Mark previous highs and lows plus clear equal highs and equal lows.",
                  },
                  {
                    n: "04",
                    title: "Study Displacement",
                    text: "Learn to distinguish decisive directional expansion from ordinary price movement.",
                  },
                  {
                    n: "05",
                    title: "Add OBs & FVGs",
                    text: "Only after structure is clear should you begin refining points of interest.",
                  },
                  {
                    n: "06",
                    title: "Build One Model",
                    text: "Combine the concepts into one repeatable setup and test it before adding more complexity.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-[24px] bg-gradient-to-br from-[#EEF5FD] to-white p-5 sm:p-7">
                <div className="text-[10px] font-black tracking-[0.14em] text-[#1E5BB8]">
                  SIMPLE LEARNING ORDER
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-black text-slate-700 sm:text-xs">
                  {[
                    "Structure",
                    "→",
                    "BOS / CHoCH",
                    "→",
                    "Liquidity",
                    "→",
                    "Displacement",
                    "→",
                    "Order Blocks",
                    "→",
                    "FVG",
                    "→",
                    "Risk",
                  ].map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className={
                        item === "→"
                          ? "text-slate-400"
                          : "rounded-lg border border-blue-100 bg-white px-3 py-2 shadow-sm"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              23 — CHECKLIST
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>23 — SMC Trading Checklist</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Smart Money Concepts Trading Checklist
              </h2>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {[
                  "What is the higher-timeframe market structure?",
                  "Which swing high and swing low define the current structure?",
                  "Where is the most relevant buy-side or sell-side liquidity?",
                  "Has liquidity actually been taken, or am I anticipating it?",
                  "Was there meaningful displacement after the liquidity event?",
                  "Did price produce a valid BOS or CHoCH?",
                  "Is there a logical order block, FVG or overlapping POI?",
                  "Where exactly is the setup invalidated?",
                  "Where is the logical opposing liquidity or structural target?",
                  "Does the trade offer acceptable reward relative to the risk?",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[12px] font-bold leading-7 text-slate-700">
                      {item}
                    </span>
                  </div>
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
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>Frequently Asked Questions</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Smart Money Concepts (SMC) FAQ
              </h2>

              <div className="mt-7 divide-y divide-slate-200 rounded-[22px] border border-slate-200">
                {faqItems.map((item, index) => (
                  <div
                    key={item.question}
                    className="p-5 sm:p-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="text-[14px] font-black leading-7 text-slate-900 sm:text-base">
                          {item.question}
                        </h3>

                        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              RELATED GUIDES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>Continue Learning</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Related Trading Strategy Guides
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    href: "/en/strategies/ict",
                    title: "ICT Trading Strategy",
                    text: "Explore ICT concepts and how they are organized into a structured trading methodology.",
                  },
                  {
                    href: "/en/strategies/price-action",
                    title: "Price Action Trading Strategy",
                    text: "Learn to read market structure, price behavior and key levels without relying heavily on indicators.",
                  },
                  {
                    href: "/en/strategies/trend-following",
                    title: "Trend Following Strategy",
                    text: "Learn how traders identify trends, enter pullbacks and manage positions while a trend remains valid.",
                  },
                  {
                    href: "/en/strategies/swing-trading",
                    title: "Swing Trading Strategy",
                    text: "Learn how swing traders use market structure and multi-day price movements to build setups.",
                  },
                  {
                    href: "/en/strategies/scalping",
                    title: "Scalping Trading Strategy",
                    text: "Understand short-term trading, execution, risk and the practical challenges of scalping.",
                  },
                  {
                    href: "/en/strategies/rsi",
                    title: "RSI Trading Strategy",
                    text: "Learn RSI signals, divergence, trend context and common ways traders use the indicator.",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-sm font-black text-slate-900 transition group-hover:text-[#1E5BB8]">
                        {item.title}
                      </h3>

                      <span className="text-sm font-black text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#2B6FD0]">
                        →
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              FINAL SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-[#EEF5FD] via-white to-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>Final Takeaway</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.45] text-slate-950 sm:text-[29px]">
                Is Smart Money Concepts a Good Trading Strategy?
              </h2>

              <div className="mt-5 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Smart Money Concepts can provide traders with a detailed
                  framework for analyzing{" "}
                  <strong>
                    market structure, liquidity, displacement and potential
                    areas of interest
                  </strong>
                  . Its value comes from connecting those ideas into a
                  repeatable process rather than treating each concept as an
                  independent signal.
                </p>

                <p>
                  A trader does not need dozens of order blocks and fair value
                  gaps on every chart. A cleaner process is to establish the
                  structural context, identify relevant liquidity, wait for
                  price to provide evidence and only then define a point of
                  interest, invalidation and target.
                </p>

                <p>
                  Most importantly, SMC should be tested like any other trading
                  methodology. Define objective rules, review historical
                  examples, practice execution and use disciplined risk
                  management. No terminology or chart pattern removes
                  uncertainty from financial markets.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["01", "Read Structure"],
                  ["02", "Map Liquidity"],
                  ["03", "Wait for Confirmation"],
                  ["04", "Control Risk"],
                ].map(([n, title]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {n}
                      </div>

                      <div className="text-xs font-black text-slate-800">
                        {title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[30px] bg-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <div className="text-[10px] font-black tracking-[0.16em] text-blue-300">
                  BROKER ALARAB • TRADING EDUCATION
                </div>

                <h2 className="mt-3 max-w-[850px] text-[23px] font-black leading-[1.4] text-white sm:text-[30px]">
                  Build Your Trading Process Before Choosing Where to Trade
                </h2>

                <p className="mt-3 max-w-[850px] text-[12px] font-medium leading-7 text-slate-300 sm:text-[13px] sm:leading-8">
                  Continue learning trading strategies, compare brokers and
                  research account features, regulation and trading conditions
                  before making a decision.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href="/en/strategies"
                  className="rounded-xl bg-white px-5 py-3 text-[11px] font-black text-slate-900 transition hover:bg-blue-50"
                >
                  Explore Trading Strategies
                </a>

                <a
                  href="/en/brokers"
                  className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-black text-white transition hover:bg-white/10"
                >
                  Compare Brokers
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              EDUCATIONAL DISCLAIMER
          ================================================= */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-[10px] font-medium leading-6 text-slate-500 sm:text-[11px] sm:leading-7">
              <strong className="text-slate-700">Educational notice:</strong>{" "}
              This guide is provided for educational and informational
              purposes only and does not constitute investment advice,
              financial advice or a recommendation to buy or sell any
              financial instrument. Trading leveraged products such as forex
              and CFDs involves significant risk, and losses can exceed the
              amount you intended to risk depending on the product and account
              structure. Always understand the risks and the rules of your
              broker and jurisdiction before trading.
            </p>
          </section>
        </article>

        {/* =================================================
            STRUCTURED DATA
        ================================================= */}

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

        {/* =================================================
            MOBILE CHART BEHAVIOR
        ================================================= */}

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 1023px) {
                .smc-centered-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #cbd5e1 transparent;
                }

                .smc-centered-scroll::-webkit-scrollbar {
                  height: 5px;
                }

                .smc-centered-scroll::-webkit-scrollbar-track {
                  background: transparent;
                }

                .smc-centered-scroll::-webkit-scrollbar-thumb {
                  background: #cbd5e1;
                  border-radius: 999px;
                }
              }

              html {
                scroll-behavior: smooth;
              }
            `,
          }}
        />
      </div>
    </main>
  );
}