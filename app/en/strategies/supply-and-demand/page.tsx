import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/supply-and-demand`;
const AR_PAGE_URL = `${BASE_URL}/strategies/supply-and-demand`;

const PAGE_TITLE =
  "Supply and Demand Trading Strategy: Complete Guide";

const PAGE_DESCRIPTION =
  "Learn supply and demand trading step by step: how to identify and draw supply and demand zones, trade DBR, RBR, RBD and DBD patterns, evaluate fresh zones, plan entries, stops, targets and risk.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "supply and demand trading",
    "supply and demand trading strategy",
    "supply and demand strategy",
    "supply and demand zones",
    "supply and demand zones trading",
    "supply and demand forex",
    "supply and demand forex strategy",
    "supply and demand trading for beginners",
    "supply demand trading",
    "supply demand strategy",
    "supply demand zones",
    "supply zone",
    "demand zone",
    "supply zone trading",
    "demand zone trading",
    "forex supply and demand zones",
    "how to identify supply and demand zones",
    "how to draw supply and demand zones",
    "how to trade supply and demand zones",
    "fresh supply and demand zones",
    "fresh demand zone",
    "fresh supply zone",
    "DBR trading",
    "Drop Base Rally",
    "RBR trading",
    "Rally Base Rally",
    "RBD trading",
    "Rally Base Drop",
    "DBD trading",
    "Drop Base Drop",
    "proximal line",
    "distal line",
    "supply and demand vs support and resistance",
    "supply and demand price action",
    "supply and demand zone strategy",
    "multi timeframe supply and demand",
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: AR_PAGE_URL,
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
    siteName: "Broker Alarab",
    locale: "en_US",
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const faqItems = [
  {
    question: "What is a supply and demand trading strategy?",
    answer:
      "Supply and demand trading is a price-action approach that focuses on price zones where a strong rally or decline previously began. Traders identify the base before that strong departure and monitor the area if price returns. A demand zone is associated with a strong move higher, while a supply zone is associated with a strong move lower.",
  },
  {
    question: "How do you identify supply and demand zones?",
    answer:
      "Start with a clear impulsive rally or drop and trace the move back to the consolidation or base immediately before it. That base becomes a potential supply or demand zone. Traders then evaluate factors such as departure strength, freshness, previous retests, structure and higher-timeframe context.",
  },
  {
    question: "How do you draw supply and demand zones?",
    answer:
      "Supply and demand zones are normally drawn around the basing candles before a strong departure. The proximal boundary is the side of the zone closest to returning price, while the distal boundary is the far edge. Different trading methodologies use slightly different wick and body rules, so consistency is important.",
  },
  {
    question: "What are DBR, RBR, RBD and DBD?",
    answer:
      "DBR stands for Drop-Base-Rally and RBR stands for Rally-Base-Rally. Both can form demand zones. RBD means Rally-Base-Drop and DBD means Drop-Base-Drop. Both can form supply zones. DBR and RBD are generally reversal structures, while RBR and DBD are continuation structures.",
  },
  {
    question: "What is a fresh supply or demand zone?",
    answer:
      "A fresh zone is a supply or demand zone that price has not revisited since the departure that created it. The first return is therefore its first retest. Many supply-and-demand methods give freshness additional weight, although a fresh zone is not guaranteed to hold.",
  },
  {
    question:
      "What is the difference between supply and demand and support and resistance?",
    answer:
      "Both methods identify areas where price may react. Support and resistance commonly focuses on previous reaction levels or ranges, while supply and demand trading focuses more specifically on the base from which a strong directional move originated. The two methods can identify overlapping areas.",
  },
  {
    question: "Does supply and demand trading work in forex?",
    answer:
      "Supply and demand analysis is commonly applied to forex because it is based primarily on price behavior and can also be used in other liquid markets. Its effectiveness depends on having objective rules, testing the strategy and managing risk rather than assuming every zone will produce a reversal.",
  },
  {
    question: "Is supply and demand trading good for beginners?",
    answer:
      "Beginners can learn supply and demand trading, but it is easier after understanding basic candlesticks, market structure, trends and risk management. A practical learning sequence is to study strong departures and bases first, then the four zone patterns, drawing rules, zone quality, entries and backtesting.",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-[#2B6FD0]" />

      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1E5BB8] sm:text-[11px]">
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
  children: ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[11px] font-black text-[#1E5BB8] shadow-sm">
          i
        </div>

        <div>
          <h3 className="text-[12px] font-black text-slate-900 sm:text-[13px]">
            {title}
          </h3>

          <div className="mt-1.5 text-[11px] font-medium leading-6 text-slate-600 sm:text-[12px] sm:leading-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO — DESKTOP
========================================================= */

function SupplyDemandHeroDesktopChart() {
  return (
    <svg
      viewBox="0 0 760 430"
      className="block h-full min-h-[410px] w-full"
      role="img"
      aria-label="Supply and demand trading chart showing supply and demand zones"
    >
      <defs>
        <pattern
          id="sdHeroGridEn"
          width="48"
          height="43"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0 L0 0 0 43"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>

        <linearGradient
          id="sdHeroAreaEn"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#2B6FD0"
            stopOpacity="0.18"
          />

          <stop
            offset="100%"
            stopColor="#2B6FD0"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      <rect
        width="760"
        height="430"
        fill="#ffffff"
      />

      <rect
        width="760"
        height="430"
        fill="url(#sdHeroGridEn)"
      />

      {/* SUPPLY */}
      <rect
        x="84"
        y="67"
        width="590"
        height="72"
        rx="11"
        fill="#f8fafc"
        stroke="#94a3b8"
        strokeWidth="1.8"
        strokeDasharray="7 6"
      />

      <text
        x="108"
        y="94"
        fontSize="11"
        fontWeight="900"
        fill="#475569"
      >
        SUPPLY ZONE
      </text>

      <text
        x="108"
        y="116"
        fontSize="9"
        fontWeight="700"
        fill="#94a3b8"
      >
        Area before a strong move lower
      </text>

      {/* DEMAND */}
      <rect
        x="84"
        y="306"
        width="590"
        height="72"
        rx="11"
        fill="#eff6ff"
        stroke="#60a5fa"
        strokeWidth="1.8"
        strokeDasharray="7 6"
      />

      <text
        x="108"
        y="334"
        fontSize="11"
        fontWeight="900"
        fill="#1E5BB8"
      >
        DEMAND ZONE
      </text>

      <text
        x="108"
        y="356"
        fontSize="9"
        fontWeight="700"
        fill="#60a5fa"
      >
        Area before a strong move higher
      </text>

      <path
        d="
          M48 205
          L95 174
          L140 119
          L183 101
          L223 117
          L263 174
          L307 233
          L348 291
          L388 338
          L425 351
          L463 326
          L504 269
          L544 211
          L585 156
          L625 111
          L662 101
          L703 130
          L732 170
          L732 397
          L48 397 Z
        "
        fill="url(#sdHeroAreaEn)"
      />

      <path
        d="
          M48 205
          L95 174
          L140 119
          L183 101
          L223 117
          L263 174
          L307 233
          L348 291
          L388 338
          L425 351
          L463 326
          L504 269
          L544 211
          L585 156
          L625 111
          L662 101
          L703 130
          L732 170
        "
        fill="none"
        stroke="#1E5BB8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="183"
        cy="101"
        r="8"
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="3"
      />

      <circle
        cx="425"
        cy="351"
        r="8"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <circle
        cx="662"
        cy="101"
        r="8"
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="3"
      />

      <rect
        x="314"
        y="189"
        width="135"
        height="32"
        rx="16"
        fill="#0f172a"
      />

      <text
        x="381"
        y="210"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        PRICE MOVEMENT
      </text>
    </svg>
  );
}

/* =========================================================
   HERO — MOBILE
========================================================= */

function SupplyDemandHeroMobileChart() {
  return (
    <svg
      viewBox="0 0 520 255"
      className="block h-auto w-full"
      role="img"
      aria-label="Supply and demand trading zones example"
    >
      <defs>
        <pattern
          id="sdHeroMobileGridEn"
          width="40"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0 L0 0 0 36"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect
        width="520"
        height="255"
        fill="#ffffff"
      />

      <rect
        width="520"
        height="255"
        fill="url(#sdHeroMobileGridEn)"
      />

      <rect
        x="43"
        y="42"
        width="425"
        height="46"
        rx="8"
        fill="#f8fafc"
        stroke="#94a3b8"
        strokeDasharray="6 5"
      />

      <text
        x="64"
        y="70"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        SUPPLY
      </text>

      <rect
        x="43"
        y="184"
        width="425"
        height="46"
        rx="8"
        fill="#eff6ff"
        stroke="#60a5fa"
        strokeDasharray="6 5"
      />

      <text
        x="64"
        y="212"
        fontSize="10"
        fontWeight="900"
        fill="#1E5BB8"
      >
        DEMAND
      </text>

      <path
        d="
          M23 133
          L71 104
          L112 66
          L150 60
          L190 87
          L230 135
          L270 187
          L310 207
          L350 181
          L390 128
          L430 73
          L470 61
          L502 88
        "
        fill="none"
        stroke="#1E5BB8"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="150"
        cy="60"
        r="6"
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="3"
      />

      <circle
        cx="310"
        cy="207"
        r="6"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <circle
        cx="470"
        cy="61"
        r="6"
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="3"
      />
    </svg>
  );
}

/* =========================================================
   CHART 01 — HOW THE STRATEGY WORKS
========================================================= */

function SupplyDemandBasicsChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1040 510"
      className="block h-auto w-[920px] max-w-none sm:w-full"
      role="img"
      aria-label="Step-by-step supply and demand trading process"
    >
      <defs>
        <pattern
          id={fullscreen ? "sdBasicsGridFullEn" : "sdBasicsGridEn"}
          width="52"
          height="51"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M52 0 L0 0 0 51"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect
        width="1040"
        height="510"
        fill="#ffffff"
      />

      <rect
        width="1040"
        height="510"
        fill={`url(#${
          fullscreen ? "sdBasicsGridFullEn" : "sdBasicsGridEn"
        })`}
      />

      {/* demand zone */}
      <rect
        x="250"
        y="333"
        width="390"
        height="82"
        rx="12"
        fill="#eff6ff"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeDasharray="7 6"
      />

      <text
        x="273"
        y="362"
        fontSize="11"
        fontWeight="900"
        fill="#1E5BB8"
      >
        POTENTIAL DEMAND ZONE
      </text>

      <text
        x="273"
        y="385"
        fontSize="9"
        fontWeight="700"
        fill="#60a5fa"
      >
        Base before the strong departure
      </text>

      {/* price */}
      <path
        d="
          M50 202
          L102 240
          L150 292
          L196 348
          L242 377
          L287 389
          L329 376
          L370 389
          L410 370
          L450 320
          L493 259
          L536 196
          L580 141
          L625 102
          L673 82
          L718 105
          L757 148
          L797 209
          L836 273
          L875 335
          L907 377
          L935 386
          L966 352
          L994 298
        "
        fill="none"
        stroke="#1E5BB8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* numbered steps */}
      <circle
        cx="329"
        cy="376"
        r="18"
        fill="#0f172a"
      />

      <text
        x="329"
        y="381"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#ffffff"
      >
        1
      </text>

      <circle
        cx="625"
        cy="102"
        r="18"
        fill="#2563eb"
      />

      <text
        x="625"
        y="107"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#ffffff"
      >
        2
      </text>

      <circle
        cx="935"
        cy="386"
        r="18"
        fill="#0f172a"
      />

      <text
        x="935"
        y="391"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#ffffff"
      >
        3
      </text>

      <text
        x="243"
        y="455"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        1 · FIND THE BASE
      </text>

      <text
        x="554"
        y="57"
        fontSize="10"
        fontWeight="900"
        fill="#1E5BB8"
      >
        2 · CONFIRM A STRONG DEPARTURE
      </text>

      <text
        x="824"
        y="455"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        3 · WAIT FOR THE RETEST
      </text>

      <rect
        x="713"
        y="232"
        width="170"
        height="32"
        rx="16"
        fill="#0f172a"
      />

      <text
        x="798"
        y="253"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        DO NOT CHASE PRICE
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="sd-basics-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#how-supply-demand-works"
          aria-label="Close chart"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1250px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
          {chart}
        </div>
      </div>
    );
  }

    return (
    <>
      <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block">
        {chart}
      </div>

      <a
        href="#sd-basics-fullscreen"
        className="block lg:hidden"
        aria-label="Open supply and demand strategy chart"
      >
        <div
          dir="ltr"
          className="sd-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white"
        >
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe to explore · Tap to enlarge</span>
        </div>
      </a>
    </>
  );
}

/* =========================================================
   CHART 02 — FOUR PATTERNS
========================================================= */

function SupplyDemandPatternsChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const items = [
    {
      x: 30,
      y: 30,
      code: "DBR",
      label: "Drop · Base · Rally",
      kind: "DEMAND · REVERSAL",
      zoneY: 180,
      path:
        "M62 88 L110 130 L155 202 L200 218 L245 205 L292 148 L342 78",
      demand: true,
    },
    {
      x: 390,
      y: 30,
      code: "RBR",
      label: "Rally · Base · Rally",
      kind: "DEMAND · CONTINUATION",
      zoneY: 149,
      path:
        "M422 207 L468 148 L512 97 L556 171 L600 180 L646 166 L697 107",
      demand: true,
    },
    {
      x: 30,
      y: 310,
      code: "RBD",
      label: "Rally · Base · Drop",
      kind: "SUPPLY · REVERSAL",
      zoneY: 376,
      path:
        "M62 500 L110 439 L158 380 L202 366 L247 379 L295 434 L342 507",
      demand: false,
    },
    {
      x: 390,
      y: 310,
      code: "DBD",
      label: "Drop · Base · Drop",
      kind: "SUPPLY · CONTINUATION",
      zoneY: 409,
      path:
        "M422 350 L468 406 L512 458 L557 387 L601 379 L646 393 L697 458",
      demand: false,
    },
  ];

  const chart = (
    <svg
      viewBox="0 0 730 590"
      className="block h-auto w-[720px] max-w-none sm:w-full"
      role="img"
      aria-label="DBR RBR RBD and DBD supply and demand trading patterns"
    >
      <rect
        width="730"
        height="590"
        fill="#ffffff"
      />

      {items.map((item) => (
        <g key={item.code}>
          <rect
            x={item.x}
            y={item.y}
            width="310"
            height="245"
            rx="18"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />

          <text
            x={item.x + 22}
            y={item.y + 33}
            fontSize="17"
            fontWeight="900"
            fill={item.demand ? "#1E5BB8" : "#334155"}
          >
            {item.code}
          </text>

          <text
            x={item.x + 22}
            y={item.y + 54}
            fontSize="9"
            fontWeight="800"
            fill="#64748b"
          >
            {item.label}
          </text>

          <text
            x={item.x + 22}
            y={item.y + 75}
            fontSize="8"
            fontWeight="900"
            fill={item.demand ? "#3b82f6" : "#64748b"}
          >
            {item.kind}
          </text>

          <rect
            x={item.x + 55}
            y={item.zoneY}
            width="200"
            height="45"
            rx="8"
            fill={item.demand ? "#eff6ff" : "#f1f5f9"}
            stroke={item.demand ? "#60a5fa" : "#94a3b8"}
            strokeDasharray="6 5"
          />

          <path
            d={item.path}
            fill="none"
            stroke={item.demand ? "#2563eb" : "#475569"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="sd-patterns-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#four-supply-demand-patterns"
          aria-label="Close chart"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1050px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
          {chart}
        </div>
      </div>
    );
  }

   return (
    <>
      <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block">
        {chart}
      </div>

      <a
        href="#sd-patterns-fullscreen"
        className="block lg:hidden"
        aria-label="Open supply and demand patterns chart"
      >
        <div
          dir="ltr"
          className="sd-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white"
        >
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe to explore · Tap to enlarge</span>
        </div>
      </a>
    </>
  );
}

/* =========================================================
   CHART 03 — HOW TO DRAW THE ZONE
========================================================= */

function DrawSupplyDemandZoneChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1060 540"
      className="block h-auto w-[960px] max-w-none sm:w-full"
      role="img"
      aria-label="How to draw supply and demand zones using proximal and distal boundaries"
    >
      <defs>
        <pattern
          id={fullscreen ? "drawZoneGridFullEn" : "drawZoneGridEn"}
          width="53"
          height="54"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M53 0 L0 0 0 54"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect
        width="1060"
        height="540"
        fill="#ffffff"
      />

      <rect
        width="1060"
        height="540"
        fill={`url(#${
          fullscreen ? "drawZoneGridFullEn" : "drawZoneGridEn"
        })`}
      />

      {/* zone */}
      <rect
        x="198"
        y="326"
        width="525"
        height="113"
        rx="12"
        fill="#eff6ff"
        stroke="#60a5fa"
        strokeWidth="2"
      />

      {/* proximal */}
      <line
        x1="198"
        y1="326"
        x2="723"
        y2="326"
        stroke="#2563eb"
        strokeWidth="3"
      />

      {/* distal */}
      <line
        x1="198"
        y1="439"
        x2="723"
        y2="439"
        stroke="#1e3a8a"
        strokeWidth="3"
      />

      <text
        x="750"
        y="331"
        fontSize="11"
        fontWeight="900"
        fill="#2563eb"
      >
        PROXIMAL BOUNDARY
      </text>

      <text
        x="750"
        y="354"
        fontSize="9"
        fontWeight="700"
        fill="#64748b"
      >
        First side reached on a retest
      </text>

      <text
        x="750"
        y="444"
        fontSize="11"
        fontWeight="900"
        fill="#1e3a8a"
      >
        DISTAL BOUNDARY
      </text>

      <text
        x="750"
        y="467"
        fontSize="9"
        fontWeight="700"
        fill="#64748b"
      >
        Farthest edge of the zone
      </text>

      {/* price */}
      <path
        d="
          M55 197
          L107 235
          L157 292
          L207 350
          L257 390
          L307 376
          L357 392
          L407 373
          L457 320
          L507 253
          L557 191
          L607 137
          L657 98
          L707 74
        "
        fill="none"
        stroke="#1E5BB8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* base label */}
      <rect
        x="248"
        y="353"
        width="177"
        height="33"
        rx="16.5"
        fill="#0f172a"
      />

      <text
        x="336"
        y="375"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        BASING CANDLES
      </text>

      {/* departure */}
      <rect
        x="532"
        y="155"
        width="148"
        height="33"
        rx="16.5"
        fill="#2563eb"
      />

      <text
        x="606"
        y="177"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        STRONG DEPARTURE
      </text>

      {/* step labels */}
      <circle
        cx="275"
        cy="484"
        r="17"
        fill="#0f172a"
      />

      <text
        x="275"
        y="489"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#ffffff"
      >
        1
      </text>

      <text
        x="302"
        y="489"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        FIND THE BASE
      </text>

      <circle
        cx="475"
        cy="484"
        r="17"
        fill="#2563eb"
      />

      <text
        x="475"
        y="489"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#ffffff"
      >
        2
      </text>

      <text
        x="502"
        y="489"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        MARK ITS RANGE
      </text>

      <circle
        cx="695"
        cy="484"
        r="17"
        fill="#0f172a"
      />

      <text
        x="695"
        y="489"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#ffffff"
      >
        3
      </text>

      <text
        x="722"
        y="489"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        EXTEND THE ZONE
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="draw-sd-zone-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#how-to-draw-supply-demand-zones"
          aria-label="Close chart"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1250px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
          {chart}
        </div>
      </div>
    );
  }

    return (
    <>
      <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block">
        {chart}
      </div>

      <a
        href="#draw-sd-zone-fullscreen"
        className="block lg:hidden"
        aria-label="Open supply and demand zone drawing chart"
      >
        <div
          dir="ltr"
          className="sd-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white"
        >
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe to explore · Tap to enlarge</span>
        </div>
      </a>
    </>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SupplyAndDemandStrategyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    inLanguage: "en",
    datePublished: "2026-09-07",
    dateModified: "2026-09-07",

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

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },

    about: [
      "Supply and Demand Trading",
      "Supply and Demand Zones",
      "Forex Trading",
      "Price Action Trading",
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
        name: "Supply and Demand Trading",
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
      <SupplyDemandBasicsChart fullscreen />
      <SupplyDemandPatternsChart fullscreen />
      <DrawSupplyDemandZoneChart fullscreen />

      <div className="mx-auto max-w-[1520px] px-3 sm:px-5 lg:px-8">
        {/* =================================================
            BREADCRUMBS
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 py-4 text-[10px] font-bold text-slate-500 sm:py-5 sm:text-[11px]"
        >
          <a
            href="/en"
            className="transition hover:text-[#1E5BB8]"
          >
            Home
          </a>

          <span>/</span>

          <a
            href="/en/strategies"
            className="transition hover:text-[#1E5BB8]"
          >
            Trading Strategies
          </a>

          <span>/</span>

          <span className="text-slate-800">
            Supply and Demand
          </span>
        </nav>

        {/* =================================================
            HERO — DESKTOP
        ================================================= */}

        <section className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)] lg:block">
          <div className="grid min-h-[420px] grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center p-9 xl:p-12">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#1E5BB8]">
                  Trading Strategy
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-slate-600">
                  Price Action
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-slate-600">
                  Beginner Guide
                </span>
              </div>

              <h1 className="max-w-[820px] text-[38px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 xl:text-[46px]">
                Supply and Demand
                <span className="mt-1 block text-[#1E5BB8]">
                  Trading Strategy
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-[14px] font-medium leading-7 text-slate-600 xl:text-[15px] xl:leading-8">
                Learn how to identify and draw supply and demand zones,
                understand DBR, RBR, RBD and DBD patterns, evaluate zone
                quality and build structured entries, stops and targets.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Supply Zones",
                  "Demand Zones",
                  "DBR · RBR · RBD · DBD",
                  "Fresh Zones",
                  "Entries & Risk",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-[9px] font-black text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-5 text-[10px] font-bold text-slate-500">
                <span>Updated September 7, 2026</span>
                <span>•</span>
                <span>Beginner to intermediate</span>
                <span>•</span>
                <span>Price-action strategy</span>
              </div>
            </div>

            <div className="border-l border-slate-200">
              <div className="flex h-11 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                <span className="ml-3 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Supply & Demand Zones
                </span>
              </div>

              <SupplyDemandHeroDesktopChart />
            </div>
          </div>
        </section>

        {/* =================================================
            HERO — MOBILE
        ================================================= */}

        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:hidden">
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                Trading Strategy
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-slate-600">
                Price Action
              </span>
            </div>

            <h1 className="mt-4 text-[27px] font-black leading-[1.12] tracking-[-0.03em] text-slate-950 sm:text-[32px]">
              Supply and Demand
              <span className="block text-[#1E5BB8]">
                Trading Strategy
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-6 text-slate-600 sm:text-[13px] sm:leading-7">
              A step-by-step guide to supply and demand zones, the four
              core patterns, zone quality, entries and risk management.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                "Supply",
                "Demand",
                "DBR / RBR",
                "RBD / DBD",
                "Fresh Zones",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[8px] font-black text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 text-[9px] font-bold leading-5 text-slate-500">
              Updated September 7, 2026 · Beginner to intermediate
            </div>
          </div>

          <div className="border-t border-slate-200">
            <SupplyDemandHeroMobileChart />
          </div>
        </section>

        <article className="mt-6 w-full space-y-6 sm:mt-8 sm:space-y-8">
          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>Introduction</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is Supply and Demand Trading?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  <strong>Supply and demand trading</strong> is a
                  price-action method that focuses on areas where price
                  previously moved away with clear strength. Instead of
                  treating every market turning point as one exact price,
                  traders identify a <strong>zone</strong> around the base
                  that existed before the strong move.
                </p>

                <p>
                  When price leaves an area aggressively to the upside,
                  the origin of that move may be marked as a
                  <strong> demand zone</strong>. When price leaves an area
                  aggressively to the downside, the origin may be marked as
                  a <strong>supply zone</strong>.
                </p>

                <p>
                  Traders then monitor what happens if price returns. The
                  objective is not simply to buy every demand zone or sell
                  every supply zone. The zone must first be evaluated using
                  factors such as the strength of the departure, the quality
                  of the base, freshness, market structure and available
                  reward relative to risk.
                </p>

                <p>
                  Supply and demand analysis is especially popular in forex
                  and price-action trading because it gives traders a visual
                  framework for finding potential areas of interest without
                  depending on a traditional lagging indicator.
                </p>
              </div>

              <ImportantBox title="A zone is an area to evaluate — not a guaranteed reversal">
                A chart can show that price previously moved strongly from an
                area, but it cannot prove that specific institutional orders
                remain there. Supply and demand zones should therefore be used
                as a structured price-analysis framework, not as guaranteed
                turning points.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — CORE IDEA
          ================================================= */}

          <section
            id="how-supply-demand-works"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — Core Idea</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How Does the Supply and Demand Strategy Work?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                The easiest way to understand the strategy is to begin with
                the <strong>strong move</strong>, not the rectangle. Find a
                clear rally or decline, trace the move back to where it began,
                identify the base, and then evaluate that area if price
                returns.
              </p>

              <div className="mt-7">
                <SupplyDemandBasicsChart />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "Find the Move",
                    text: "Locate a strong rally or drop that clearly stands out from surrounding price action.",
                  },
                  {
                    n: "02",
                    title: "Find the Origin",
                    text: "Trace the move backward to the small base immediately before the departure.",
                  },
                  {
                    n: "03",
                    title: "Mark the Zone",
                    text: "Turn that base into a defined price area using consistent drawing rules.",
                  },
                  {
                    n: "04",
                    title: "Evaluate Quality",
                    text: "Check departure strength, freshness, structure and market context.",
                  },
                  {
                    n: "05",
                    title: "Wait for Price",
                    text: "If price returns, apply your entry and risk-management rules instead of entering automatically.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <h3 className="text-[11px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Find the departure first">
                For beginners, it is usually much easier to identify a strong
                move first and then trace it back to the base. Trying to mark
                every consolidation before knowing whether price actually
                departed from it creates too many weak zones.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              02 — WHAT ARE ZONES?
          ================================================= */}

          <section
            id="what-are-supply-demand-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — Understanding Zones</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Are Supply and Demand Zones?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  A <strong>supply or demand zone</strong> is a price range
                  around the base from which a strong directional move
                  originated. The zone is normally extended to the right so
                  traders can observe how price behaves if it revisits that
                  area later.
                </p>

                <p>
                  This is an important distinction:
                  <strong> zones are ranges, not exact prices</strong>. A base
                  can contain several candles, wicks and overlapping
                  transactions. Representing the area with a single horizontal
                  line can imply more precision than the chart actually gives.
                </p>

                <p>
                  The zone itself is therefore only the starting point of the
                  analysis. Traders still need to evaluate the quality of the
                  departure, how long price remained in the base, whether the
                  zone has already been tested, and where it sits within the
                  broader market.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Base",
                    text: "A short pause, consolidation or cluster of candles before the directional move.",
                  },
                  {
                    n: "02",
                    title: "Departure",
                    text: "The strong rally or drop that makes the base worth investigating.",
                  },
                  {
                    n: "03",
                    title: "Retest",
                    text: "A later return into the previously identified price zone.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Supply and demand is not the same as bid and ask">
                In trading terminology, <strong>supply and demand zones</strong>
                describe chart areas used in technical analysis. The
                <strong> bid and ask</strong> are the prices available to sell
                and buy in the market at a specific moment. They are related
                to market pricing, but they are not the same concept as
                supply and demand zones.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              03 — DEMAND ZONE
          ================================================= */}

          <section
            id="demand-zone"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/60 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — Demand Zone</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is a Demand Zone in Trading?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  A <strong>demand zone</strong> is the price area around a
                  base that formed before a strong move higher. It marks the
                  origin of a rally where buying pressure was strong enough to
                  move price away from the area decisively.
                </p>

                <p>
                  When price later returns to a demand zone, traders may look
                  for a potential long setup. The important point is that the
                  return itself is not enough. A trader may enter directly,
                  wait for a reaction, or require lower-timeframe confirmation
                  depending on the rules of the strategy.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[11px] font-black text-[#1E5BB8] shadow-sm">
                      01
                    </div>

                    <h3 className="text-base font-black text-slate-900">
                      Typical Demand Sequence
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {[
                      "Base",
                      "→",
                      "Strong Rally",
                      "→",
                      "Demand Zone",
                      "→",
                      "Retest",
                    ].map((item, index) => (
                      <span
                        key={`${item}-${index}`}
                        className={
                          item === "→"
                            ? "font-black text-[#2B6FD0]"
                            : "rounded-lg bg-white px-3 py-2 text-[10px] font-black text-slate-700 shadow-sm"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-black text-slate-900">
                    What traders look for
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "A compact and clearly identifiable base.",
                      "A strong rally away from the base.",
                      "Limited hesitation immediately after departure.",
                      "A clean first return if freshness is part of the strategy.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[11px] font-medium leading-6 text-slate-600"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2B6FD0]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <ImportantBox title="Demand does not mean price must rise">
                The label describes what happened when the zone was created:
                price previously left the area strongly to the upside. Market
                conditions can change, and a demand zone can be broken on a
                later retest.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              04 — SUPPLY ZONE
          ================================================= */}

          <section
            id="supply-zone"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — Supply Zone</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is a Supply Zone in Trading?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  A <strong>supply zone</strong> is the price area around a
                  base that formed before a strong move lower. It marks the
                  origin of a decline where selling pressure was strong enough
                  to push price away from the area decisively.
                </p>

                <p>
                  When price later returns to the supply zone, traders may
                  evaluate a potential short setup. As with demand, the zone
                  should not be treated as an automatic sell signal. Traders
                  still need to consider zone quality, market context,
                  invalidation and potential reward relative to risk.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[11px] font-black text-slate-600 shadow-sm">
                      01
                    </div>

                    <h3 className="text-base font-black text-slate-900">
                      Typical Supply Sequence
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {[
                      "Base",
                      "→",
                      "Strong Drop",
                      "→",
                      "Supply Zone",
                      "→",
                      "Retest",
                    ].map((item, index) => (
                      <span
                        key={`${item}-${index}`}
                        className={
                          item === "→"
                            ? "font-black text-slate-500"
                            : "rounded-lg bg-white px-3 py-2 text-[10px] font-black text-slate-700 shadow-sm"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-black text-slate-900">
                    What traders look for
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "A compact and clearly identifiable base.",
                      "A strong decline away from the base.",
                      "Limited overlap immediately after departure.",
                      "Enough room below the zone for a realistic target.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[11px] font-medium leading-6 text-slate-600"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <ImportantBox title="Supply and demand are mirror concepts">
                Demand analysis studies the origin of strong rallies. Supply
                analysis studies the origin of strong declines. The underlying
                process for evaluating the zone is essentially the same in the
                opposite direction.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              05 — FOUR PATTERNS
          ================================================= */}

          <section
            id="four-supply-demand-patterns"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — Four Zone Patterns</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                DBR, RBR, RBD and DBD Supply and Demand Patterns
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                Supply-and-demand traders commonly classify zones by the way
                price <strong>enters the base and leaves it</strong>. This
                creates four familiar patterns: Drop-Base-Rally,
                Rally-Base-Rally, Rally-Base-Drop and Drop-Base-Drop.
              </p>

              <div className="mt-7">
                <SupplyDemandPatternsChart />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "DBR",
                    full: "Drop · Base · Rally",
                    type: "Demand · Reversal",
                    text: "Price drops into a base and then reverses strongly higher. The base becomes a potential demand zone.",
                  },
                  {
                    n: "02",
                    title: "RBR",
                    full: "Rally · Base · Rally",
                    type: "Demand · Continuation",
                    text: "Price rallies, pauses in a base and then continues higher. The base can become a continuation demand zone.",
                  },
                  {
                    n: "03",
                    title: "RBD",
                    full: "Rally · Base · Drop",
                    type: "Supply · Reversal",
                    text: "Price rallies into a base and then reverses strongly lower. The base becomes a potential supply zone.",
                  },
                  {
                    n: "04",
                    title: "DBD",
                    full: "Drop · Base · Drop",
                    type: "Supply · Continuation",
                    text: "Price drops, pauses in a base and then continues lower. The base can become a continuation supply zone.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-3 text-[9px] font-black uppercase tracking-[0.1em] text-[#2B6FD0]">
                      {item.full}
                    </div>

                    <div className="mt-1 text-[9px] font-black uppercase tracking-[0.08em] text-slate-400">
                      {item.type}
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="The easiest way to remember the four patterns">
                <strong>DBR and RBR create demand setups.</strong>{" "}
                <strong>RBD and DBD create supply setups.</strong> Look at the
                final word: Rally means price departed higher; Drop means price
                departed lower.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              06 — DRAWING THE ZONE
          ================================================= */}

          <section
            id="how-to-draw-supply-demand-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Drawing Zones</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Draw Supply and Demand Zones
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  Once you identify the strong departure, trace it back to the
                  <strong> basing candles immediately before the move</strong>.
                  That base is the area used to construct the zone.
                </p>

                <p>
                  Many supply-and-demand traders describe the two boundaries
                  as the <strong>proximal line</strong> and
                  <strong> distal line</strong>. The proximal boundary is the
                  edge that returning price reaches first. The distal boundary
                  is the farther edge of the zone.
                </p>
              </div>

              <div className="mt-7">
                <DrawSupplyDemandZoneChart />
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                      01
                    </div>

                    <h3 className="text-base font-black text-slate-900">
                      Proximal Boundary
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    The proximal boundary is the side of the zone
                    <strong> nearest to price as it returns</strong>. It is
                    normally the first edge price touches when entering the
                    zone.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-slate-600 shadow-sm">
                      02
                    </div>

                    <h3 className="text-base font-black text-slate-900">
                      Distal Boundary
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                    The distal boundary is the
                    <strong> far side of the zone</strong>. It is often
                    important when defining whether the setup has been
                    invalidated.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="text-base font-black text-slate-900">
                  How to draw a zone step by step
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      n: "01",
                      title: "Find the Departure",
                      text: "Start with a clear rally or decline.",
                    },
                    {
                      n: "02",
                      title: "Trace It Back",
                      text: "Locate the base immediately before that move.",
                    },
                    {
                      n: "03",
                      title: "Mark the Range",
                      text: "Apply the same wick/body rule every time.",
                    },
                    {
                      n: "04",
                      title: "Extend the Zone",
                      text: "Project the area forward and monitor future retests.",
                    },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="rounded-xl bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                          {item.n}
                        </span>

                        <h4 className="text-[11px] font-black text-slate-900">
                          {item.title}
                        </h4>
                      </div>

                      <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <ImportantBox title="There is more than one zone-drawing convention">
                Different supply-and-demand methodologies use different rules
                for candle bodies, wicks and which basing candle defines each
                boundary. The important part is to choose an objective method
                and use it consistently during analysis and backtesting rather
                than changing the rectangle after seeing what price did.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              07 — ZONE QUALITY
          ================================================= */}

          <section
            id="strong-supply-demand-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — Zone Quality</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Identify Strong Supply and Demand Zones
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                Once you understand how zones are formed, you will quickly
                notice that a chart can contain many possible areas. The next
                step is therefore to evaluate
                <strong> zone quality</strong> rather than treating every base
                as equally important.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Strong Departure",
                    text: "Price should leave the base decisively rather than slowly drifting away with heavy overlap.",
                  },
                  {
                    n: "02",
                    title: "Clean Base",
                    text: "The base should be reasonably compact and easy to define without creating an excessively wide zone.",
                  },
                  {
                    n: "03",
                    title: "Freshness",
                    text: "Check whether price has already returned and how many times the zone has been tested.",
                  },
                  {
                    n: "04",
                    title: "Market Impact",
                    text: "A departure that breaks nearby structure or creates a meaningful price displacement can add context.",
                  },
                  {
                    n: "05",
                    title: "Zone Location",
                    text: "Consider the higher-timeframe structure, trend and where the zone sits within the broader market.",
                  },
                  {
                    n: "06",
                    title: "Room to Target",
                    text: "Check whether an opposing zone or major structure leaves enough room for a sensible reward-to-risk profile.",
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

              <ImportantBox title="No single factor makes a zone high probability">
                A fresh zone with a strong departure can still fail. These
                characteristics are filters used to make the analysis more
                systematic. They should not be converted into unsupported
                certainty or arbitrary probability claims.
              </ImportantBox>
            </div>
          </section>
                    {/* =================================================
              08 — FRESH VS TESTED ZONES
          ================================================= */}

          <section
            id="fresh-vs-tested-supply-demand-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Fresh vs Tested Zones</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is a Fresh Supply or Demand Zone?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  A <strong>fresh zone</strong> is a supply or demand zone
                  that price has not revisited since the departure that
                  created it. If price returns to the area for the first time,
                  that move is commonly described as the
                  <strong> first retest</strong>.
                </p>

                <p>
                  After price has already returned to the area, it becomes a
                  <strong> tested zone</strong>. If price visits it again,
                  those later returns are additional retests.
                </p>

                <p>
                  Many supply-and-demand traders give fresh zones additional
                  attention because the area has not yet been revisited.
                  However, freshness should be treated as one
                  <strong> quality filter</strong>, not as proof that the zone
                  will hold.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Fresh Zone",
                    text: "Price departed from the base and has not returned to the marked supply or demand zone.",
                  },
                  {
                    n: "02",
                    title: "First Retest",
                    text: "Price returns to the zone for the first time. The trader evaluates the arrival and reaction instead of assuming an automatic reversal.",
                  },
                  {
                    n: "03",
                    title: "Multiple Retests",
                    text: "Price has already visited the zone more than once. Evaluate repeated touches according to the rules you have tested.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
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

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
  <div
    dir="ltr"
    className="sd-centered-scroll overflow-x-auto"
  >
    <svg
      viewBox="0 0 1120 520"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Fresh demand zone versus tested demand zone using forex candlesticks"
    >
      <defs>
  <pattern
    id="freshTestedGridEn"
    width="56"
    height="52"
    patternUnits="userSpaceOnUse"
  >
    <path
      d="M56 0 L0 0 0 52"
      fill="none"
      stroke="#e2e8f0"
      strokeWidth="1"
    />
  </pattern>
</defs>

{/* Background */}
<rect width="1120" height="520" fill="#ffffff" />
<rect width="1120" height="520" fill="url(#freshTestedGridEn)" />

{/* =====================================================
    LEFT — FRESH DEMAND ZONE
===================================================== */}

<rect
  x="30"
  y="25"
  width="515"
  height="465"
  rx="20"
  fill="#f8fafc"
  stroke="#e2e8f0"
  strokeWidth="2"
/>

<text
  x="58"
  y="62"
  fontSize="18"
  fontWeight="900"
  fill="#0f172a"
>
  FRESH DEMAND ZONE
</text>

<text
  x="58"
  y="84"
  fontSize="10"
  fontWeight="700"
  fill="#64748b"
>
  Price has not returned since the zone formed
</text>

{/* Demand zone */}
<rect
  x="78"
  y="332"
  width="420"
  height="86"
  rx="8"
  fill="#dbeafe"
  stroke="#3b82f6"
  strokeWidth="2"
/>

<text
  x="94"
  y="355"
  fontSize="10"
  fontWeight="900"
  fill="#1E5BB8"
>
  DEMAND ZONE
</text>

{/* Candles approaching base */}
<g stroke="#334155" strokeWidth="2">
  <line x1="110" y1="175" x2="110" y2="236" />
  <rect x="101" y="188" width="18" height="31" fill="#475569" />

  <line x1="143" y1="210" x2="143" y2="275" />
  <rect x="134" y="222" width="18" height="36" fill="#475569" />

  <line x1="176" y1="248" x2="176" y2="316" />
  <rect x="167" y="262" width="18" height="37" fill="#475569" />

  <line x1="209" y1="288" x2="209" y2="357" />
  <rect x="200" y="303" width="18" height="38" fill="#475569" />
</g>

{/* Base candles */}
<g stroke="#2563eb" strokeWidth="2">
  <line x1="244" y1="326" x2="244" y2="386" />
  <rect x="235" y="343" width="18" height="23" fill="#ffffff" />

  <line x1="276" y1="330" x2="276" y2="389" />
  <rect x="267" y="344" width="18" height="27" fill="#2563eb" />

  <line x1="308" y1="329" x2="308" y2="385" />
  <rect x="299" y="341" width="18" height="25" fill="#ffffff" />
</g>

{/* Strong bullish departure */}
<g stroke="#2563eb" strokeWidth="2">
  <line x1="343" y1="295" x2="343" y2="369" />
  <rect x="334" y="312" width="18" height="43" fill="#ffffff" />

  <line x1="378" y1="242" x2="378" y2="326" />
  <rect x="369" y="259" width="18" height="54" fill="#ffffff" />

  <line x1="413" y1="184" x2="413" y2="274" />
  <rect x="404" y="201" width="18" height="57" fill="#ffffff" />

  <line x1="448" y1="125" x2="448" y2="216" />
  <rect x="439" y="142" width="18" height="58" fill="#ffffff" />
</g>

{/* Base annotation */}
<line
  x1="276"
  y1="410"
  x2="276"
  y2="443"
  stroke="#94a3b8"
  strokeWidth="1.5"
  strokeDasharray="4 4"
/>

<text
  x="276"
  y="461"
  textAnchor="middle"
  fontSize="9"
  fontWeight="900"
  fill="#475569"
>
  BASE
</text>

{/* Departure annotation */}
<rect
  x="352"
  y="103"
  width="128"
  height="29"
  rx="14"
  fill="#2563eb"
/>

<text
  x="416"
  y="122"
  textAnchor="middle"
  fontSize="8"
  fontWeight="900"
  fill="#ffffff"
>
  STRONG DEPARTURE
</text>

{/* Fresh label */}
<rect
  x="84"
  y="105"
  width="118"
  height="30"
  rx="15"
  fill="#0f172a"
/>

<text
  x="143"
  y="125"
  textAnchor="middle"
  fontSize="8"
  fontWeight="900"
  fill="#ffffff"
>
  NO RETEST YET
</text>

{/* =====================================================
    DIVIDER
===================================================== */}

<line
  x1="560"
  y1="42"
  x2="560"
  y2="474"
  stroke="#cbd5e1"
  strokeWidth="2"
/>

{/* =====================================================
    RIGHT — TESTED DEMAND ZONE
===================================================== */}

<rect
  x="575"
  y="25"
  width="515"
  height="465"
  rx="20"
  fill="#f8fafc"
  stroke="#e2e8f0"
  strokeWidth="2"
/>

<text
  x="603"
  y="62"
  fontSize="18"
  fontWeight="900"
  fill="#0f172a"
>
  TESTED DEMAND ZONE
</text>

<text
  x="603"
  y="84"
  fontSize="10"
  fontWeight="700"
  fill="#64748b"
>
  Price returns to the previously created zone
</text>

{/* Demand zone */}
<rect
  x="623"
  y="332"
  width="420"
  height="86"
  rx="8"
  fill="#dbeafe"
  stroke="#3b82f6"
  strokeWidth="2"
/>

<text
  x="639"
  y="355"
  fontSize="10"
  fontWeight="900"
  fill="#1E5BB8"
>
  DEMAND ZONE
</text>

{/* Original move into base */}
<g stroke="#334155" strokeWidth="2">
  <line x1="650" y1="194" x2="650" y2="254" />
  <rect x="641" y="207" width="18" height="31" fill="#475569" />

  <line x1="683" y1="229" x2="683" y2="292" />
  <rect x="674" y="241" width="18" height="35" fill="#475569" />

  <line x1="716" y1="268" x2="716" y2="334" />
  <rect x="707" y="281" width="18" height="37" fill="#475569" />
</g>

{/* Base */}
<g stroke="#2563eb" strokeWidth="2">
  <line x1="750" y1="327" x2="750" y2="386" />
  <rect x="741" y="342" width="18" height="25" fill="#ffffff" />

  <line x1="782" y1="329" x2="782" y2="389" />
  <rect x="773" y="344" width="18" height="27" fill="#2563eb" />

  <line x1="814" y1="327" x2="814" y2="384" />
  <rect x="805" y="340" width="18" height="25" fill="#ffffff" />
</g>

{/* Original bullish departure */}
<g stroke="#2563eb" strokeWidth="2">
  <line x1="848" y1="282" x2="848" y2="366" />
  <rect x="839" y="301" width="18" height="51" fill="#ffffff" />

  <line x1="882" y1="224" x2="882" y2="316" />
  <rect x="873" y="242" width="18" height="58" fill="#ffffff" />

  <line x1="916" y1="164" x2="916" y2="257" />
  <rect x="907" y="181" width="18" height="60" fill="#ffffff" />
</g>

{/* Pullback candles */}
<g stroke="#475569" strokeWidth="2">
  <line x1="950" y1="169" x2="950" y2="240" />
  <rect x="941" y="185" width="18" height="38" fill="#475569" />

  <line x1="980" y1="216" x2="980" y2="286" />
  <rect x="971" y="231" width="18" height="38" fill="#475569" />

  <line x1="1010" y1="261" x2="1010" y2="337" />
  <rect x="1001" y="277" width="18" height="43" fill="#475569" />
</g>

{/* First retest candle */}
<g stroke="#2563eb" strokeWidth="2.5">
  <line x1="1028" y1="315" x2="1028" y2="395" />
  <rect
    x="1018"
    y="340"
    width="20"
    height="32"
    fill="#ffffff"
  />
</g>

{/* Retest marker */}
<circle
  cx="1028"
  cy="362"
  r="17"
  fill="#ffffff"
  stroke="#2563eb"
  strokeWidth="3"
/>

<text
  x="1028"
  y="367"
  textAnchor="middle"
  fontSize="10"
  fontWeight="900"
  fill="#2563eb"
>
  1
</text>

<line
  x1="1028"
  y1="380"
  x2="1028"
  y2="445"
  stroke="#94a3b8"
  strokeWidth="1.5"
  strokeDasharray="5 5"
/>

<text
  x="1028"
  y="463"
  textAnchor="middle"
  fontSize="9"
  fontWeight="900"
  fill="#475569"
>
  FIRST RETEST
</text>

{/* Pullback label */}
<rect
  x="942"
  y="103"
  width="104"
  height="29"
  rx="14"
  fill="#0f172a"
/>

<text
  x="994"
  y="122"
  textAnchor="middle"
  fontSize="8"
  fontWeight="900"
  fill="#ffffff"
>
  PULLBACK
</text>
    </svg>
  </div>
</div>

              <ImportantBox title="Fresh does not mean guaranteed">
                Freshness describes the history of the zone, not its future.
                A fresh demand zone can fail on its first retest, while a
                previously tested area can still produce a reaction. Use
                freshness together with the complete setup.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — MULTI-TIMEFRAME ANALYSIS
          ================================================= */}

          <section
            id="multi-timeframe-supply-demand"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — Multiple Timeframes</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Use Supply and Demand Across Multiple Timeframes
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  Supply and demand zones can appear on almost any chart
                  timeframe. A common approach is to use a
                  <strong> higher timeframe for context</strong> and a lower
                  timeframe to study the return into the zone in greater
                  detail.
                </p>

                <p>
                  For example, a trader might identify the broader market
                  structure on the 4-hour chart, mark a relevant zone on the
                  1-hour chart, and then inspect the 15-minute chart when price
                  reaches that area.
                </p>

                <p>
                  Those timeframes are only an example. The important principle
                  is to avoid analyzing a lower-timeframe zone in isolation
                  from the larger market structure.
                </p>
              </div>

              <div className="mt-7 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-6">
                <div className="grid gap-3 lg:grid-cols-5">
                  {[
                    {
                      n: "01",
                      title: "Higher Timeframe",
                      text: "Understand the broader trend and structure.",
                    },
                    {
                      n: "02",
                      title: "Key Zone",
                      text: "Identify a relevant supply or demand area.",
                    },
                    {
                      n: "03",
                      title: "Wait for Retest",
                      text: "Allow price to return instead of chasing the move.",
                    },
                    {
                      n: "04",
                      title: "Lower Timeframe",
                      text: "Study the reaction in more detail if your method requires it.",
                    },
                    {
                      n: "05",
                      title: "Plan the Trade",
                      text: "Define entry, invalidation and target before taking risk.",
                    },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                          {item.n}
                        </div>

                        <h3 className="text-[11px] font-black text-slate-900">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                {[
                  "4H Context",
                  "→",
                  "1H Zone",
                  "→",
                  "15M Reaction",
                  "→",
                  "Trade Plan",
                ].map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className={
                      item === "→"
                        ? "font-black text-[#2B6FD0]"
                        : "rounded-lg bg-white px-3 py-2 text-[10px] font-black text-slate-700 shadow-sm"
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ImportantBox title="There is no mandatory timeframe combination">
                The 4H → 1H → 15M example illustrates the concept; it is not a
                fixed rule. A swing trader and a day trader may use completely
                different combinations. Use timeframes that match your tested
                trading plan.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              10 — SUPPLY & DEMAND VS SUPPORT & RESISTANCE
          ================================================= */}

          <section
            id="supply-demand-vs-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>
                10 — Supply & Demand vs Support & Resistance
              </SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Supply and Demand vs Support and Resistance
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  Supply and demand and
                  <strong> support and resistance</strong> are related
                  price-action concepts, but traders often identify them using
                  different criteria.
                </p>

                <p>
                  Support and resistance analysis commonly focuses on prices
                  or ranges where the market has reacted previously. Supply
                  and demand analysis places more emphasis on the
                  <strong> base immediately before a strong departure</strong>.
                </p>

                <p>
                  In practice, the two can overlap. A strong demand zone may
                  also sit near an obvious support area, while a supply zone
                  may overlap with resistance.
                </p>
              </div>

              <div className="mt-7 overflow-x-auto rounded-[22px] border border-slate-200">
                <table className="min-w-[720px] w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border-b border-slate-200 p-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
                        Feature
                      </th>

                      <th className="border-b border-slate-200 p-4 text-[10px] font-black uppercase tracking-[0.1em] text-[#1E5BB8]">
                        Supply & Demand
                      </th>

                      <th className="border-b border-slate-200 p-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
                        Support & Resistance
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      [
                        "Typical Shape",
                        "Price zone or range",
                        "Level or broader reaction area",
                      ],
                      [
                        "Main Focus",
                        "Origin of a strong departure",
                        "Previous market reactions",
                      ],
                      [
                        "Base Required?",
                        "Usually central to the method",
                        "Not necessarily",
                      ],
                      [
                        "Departure Strength",
                        "Common quality factor",
                        "Not always required",
                      ],
                      [
                        "Retests",
                        "Commonly analyzed",
                        "Commonly analyzed",
                      ],
                      [
                        "Can They Overlap?",
                        "Yes",
                        "Yes",
                      ],
                    ].map((row) => (
                      <tr
                        key={row[0]}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="p-4 text-[11px] font-black text-slate-800">
                          {row[0]}
                        </td>

                        <td className="p-4 text-[11px] font-medium leading-6 text-slate-600">
                          {row[1]}
                        </td>

                        <td className="p-4 text-[11px] font-medium leading-6 text-slate-600">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ImportantBox title="You do not have to choose only one">
                Supply and demand and support and resistance are not mutually
                exclusive. Some traders use broader market structure and
                support/resistance for context while using supply and demand
                zones to refine areas of interest.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              11 — ENTRY METHODS
          ================================================= */}

          <section
            id="supply-demand-entry-methods"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — Entry Methods</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Enter a Supply and Demand Trade
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                Identifying a zone is only part of the strategy. Traders also
                need a defined method for entering when price returns. Three
                common approaches are a
                <strong> direct limit entry</strong>, a
                <strong> reaction entry</strong>, and a
                <strong> confirmation entry</strong>.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Limit Entry",
                    subtitle: "Direct Entry",
                    text: "An order is placed inside or near the zone before price returns. This can provide an earlier entry but offers less information about how price will react.",
                  },
                  {
                    n: "02",
                    title: "Reaction Entry",
                    subtitle: "Wait for a Response",
                    text: "The trader waits for price to enter the zone and show a visible reaction before considering an entry.",
                  },
                  {
                    n: "03",
                    title: "Confirmation Entry",
                    subtitle: "Wait for Structure",
                    text: "The trader waits for additional confirmation such as a lower-timeframe structure shift or another predefined price-action trigger.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-slate-900">
                          {item.title}
                        </h3>

                        <div className="mt-0.5 text-[8px] font-black uppercase tracking-[0.1em] text-slate-400">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="There is no universally best entry method">
                Earlier entries may provide a different reward-to-risk profile
                but less confirmation. Waiting for confirmation can provide
                more information but may lead to a later entry or no entry at
                all. The method should be defined and tested before trading it.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — STOP LOSS & TARGET
          ================================================= */}

          <section
            id="supply-demand-stop-loss-target"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — Stop Loss & Targets</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Where to Place Stop Loss and Take Profit
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  A supply-and-demand trade should have a defined
                  <strong> invalidation point</strong>. The stop loss is part
                  of that risk plan; it should not be placed randomly simply
                  because a certain number of pips feels comfortable.
                </p>

                <p>
                  For a demand-zone long setup, invalidation is generally
                  associated with price moving sufficiently below the area that
                  supported the trade idea. For a supply-zone short setup, the
                  logic is reversed.
                </p>

                <p>
                  Potential targets may be based on previous market structure,
                  a nearby swing high or low, an opposing supply or demand
                  zone, or a predefined reward-to-risk objective.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                      01
                    </div>

                    <h3 className="text-base font-black text-slate-900">
                      Demand Zone Trade
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3 text-[11px] font-medium leading-6 text-slate-600">
                    <p>
                      <strong>Entry:</strong> according to the selected entry
                      method inside or after reaction to demand.
                    </p>

                    <p>
                      <strong>Invalidation:</strong> beyond the level that
                      invalidates the demand-zone setup.
                    </p>

                    <p>
                      <strong>Target:</strong> market structure, a previous
                      high, or an opposing supply zone.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-slate-600 shadow-sm">
                      02
                    </div>

                    <h3 className="text-base font-black text-slate-900">
                      Supply Zone Trade
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3 text-[11px] font-medium leading-6 text-slate-600">
                    <p>
                      <strong>Entry:</strong> according to the selected entry
                      method inside or after reaction to supply.
                    </p>

                    <p>
                      <strong>Invalidation:</strong> beyond the level that
                      invalidates the supply-zone setup.
                    </p>

                    <p>
                      <strong>Target:</strong> market structure, a previous
                      low, or an opposing demand zone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="text-base font-black text-slate-900">
                  Understanding Reward to Risk
                </h3>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-black text-slate-700">
                    Risk = 1R
                  </span>

                  <span className="font-black text-[#2B6FD0]">→</span>

                  <span className="rounded-lg bg-blue-50 px-3 py-2 text-[10px] font-black text-[#1E5BB8]">
                    Potential Reward = 2R
                  </span>

                  <span className="font-black text-[#2B6FD0]">→</span>

                  <span className="rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-black text-white">
                    Reward-to-Risk = 2:1
                  </span>
                </div>

                <p className="mt-4 text-[11px] font-medium leading-6 text-slate-600">
                  This is only an example. A 2:1 ratio is not a requirement
                  and does not automatically make a trade good. The target
                  should make sense within the tested strategy and current
                  market structure.
                </p>
              </div>

              <ImportantBox title="The edge of the rectangle is not a magical stop-loss level">
                Spread, volatility, the traded instrument, zone-drawing method
                and entry technique can all affect practical stop placement.
                Define invalidation objectively and calculate position size
                from the resulting risk.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              13 — COMPLETE BUY EXAMPLE
          ================================================= */}

          <section
            id="supply-demand-buy-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Long Trade Example</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Supply and Demand Trading Example: Demand Zone Buy Setup
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                The example below combines the main concepts into one
                hypothetical long setup: a demand zone forms, price rallies
                away, later returns for a retest, reacts, and the trader
                evaluates an entry with predefined invalidation and target.
              </p>

              <div className="mt-7">
                <a
                  href="#sd-buy-example-fullscreen"
                  className="block"
                  aria-label="Open demand zone buy example"
                >
                  <div
                    dir="ltr"
                    className="sd-centered-scroll overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
                  >
                    <svg
                      viewBox="0 0 1120 610"
                      className="block h-auto w-[980px] max-w-none sm:w-full"
                      role="img"
                      aria-label="Demand zone long trade example showing entry stop loss and target"
                    >
                      <defs>
                        <pattern
                          id="buyExampleGridEn"
                          width="56"
                          height="61"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M56 0 L0 0 0 61"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>

                      <rect width="1120" height="610" fill="#ffffff" />

                      <rect
                        width="1120"
                        height="610"
                        fill="url(#buyExampleGridEn)"
                      />

                      {/* target */}
                      <rect
                        x="660"
                        y="72"
                        width="365"
                        height="58"
                        rx="10"
                        fill="#f8fafc"
                        stroke="#94a3b8"
                        strokeDasharray="7 6"
                      />

                      <text
                        x="683"
                        y="106"
                        fontSize="11"
                        fontWeight="900"
                        fill="#475569"
                      >
                        TARGET / OPPOSING AREA
                      </text>

                      {/* demand */}
                      <rect
                        x="110"
                        y="404"
                        width="820"
                        height="88"
                        rx="12"
                        fill="#eff6ff"
                        stroke="#60a5fa"
                        strokeWidth="2"
                      />

                      <text
                        x="135"
                        y="438"
                        fontSize="12"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        DEMAND ZONE
                      </text>

                      <text
                        x="135"
                        y="461"
                        fontSize="9"
                        fontWeight="700"
                        fill="#60a5fa"
                      >
                        Base before the strong rally
                      </text>

                      {/* stop */}
                      <line
                        x1="535"
                        y1="521"
                        x2="929"
                        y2="521"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeDasharray="8 6"
                      />

                      <text
                        x="947"
                        y="526"
                        fontSize="10"
                        fontWeight="900"
                        fill="#475569"
                      >
                        INVALIDATION / STOP
                      </text>

                      {/* price */}
                      <path
                        d="
                          M55 267
                          L105 309
                          L155 365
                          L205 427
                          L255 450
                          L305 435
                          L355 449
                          L405 419
                          L455 354
                          L505 287
                          L555 221
                          L605 164
                          L655 121
                          L705 103
                          L755 125
                          L805 177
                          L850 246
                          L890 317
                          L920 382
                          L944 430
                          L968 448
                          L992 421
                          L1017 363
                          L1041 297
                          L1064 226
                        "
                        fill="none"
                        stroke="#1E5BB8"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* departure */}
                      <rect
                        x="477"
                        y="247"
                        width="156"
                        height="32"
                        rx="16"
                        fill="#2563eb"
                      />

                      <text
                        x="555"
                        y="268"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="900"
                        fill="#ffffff"
                      >
                        STRONG RALLY
                      </text>

                      {/* retest */}
                      <circle
                        cx="968"
                        cy="448"
                        r="9"
                        fill="#ffffff"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />

                      <line
                        x1="968"
                        y1="448"
                        x2="968"
                        y2="383"
                        stroke="#64748b"
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                      />

                      <rect
                        x="902"
                        y="347"
                        width="132"
                        height="29"
                        rx="14.5"
                        fill="#0f172a"
                      />

                      <text
                        x="968"
                        y="366"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="900"
                        fill="#ffffff"
                      >
                        FIRST RETEST
                      </text>

                      {/* entry */}
                      <circle
                        cx="992"
                        cy="421"
                        r="7"
                        fill="#2563eb"
                      />

                      <line
                        x1="992"
                        y1="421"
                        x2="1053"
                        y2="421"
                        stroke="#2563eb"
                        strokeWidth="2"
                      />

                      <text
                        x="1060"
                        y="425"
                        fontSize="10"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        ENTRY
                      </text>

                      {/* target arrow */}
                      <path
                        d="M1020 335 L1020 161"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeDasharray="7 6"
                      />

                      <path
                        d="M1012 172 L1020 158 L1028 172"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />

                      <text
                        x="1038"
                        y="245"
                        fontSize="9"
                        fontWeight="900"
                        fill="#1E5BB8"
                        transform="rotate(-90 1038 245)"
                      >
                        POTENTIAL TRADE PATH
                      </text>

                      <text
                        x="83"
                        y="566"
                        fontSize="9"
                        fontWeight="900"
                        fill="#64748b"
                      >
                        EDUCATIONAL EXAMPLE — NOT A LIVE TRADE SIGNAL
                      </text>
                    </svg>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500 lg:hidden">
                    <span>↔</span>
                    <span>Swipe to explore · Tap to enlarge</span>
                  </div>
                </a>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "Identify Demand",
                    text: "Find the base before the strong rally.",
                  },
                  {
                    n: "02",
                    title: "Grade the Zone",
                    text: "Evaluate departure, freshness and context.",
                  },
                  {
                    n: "03",
                    title: "Wait for Return",
                    text: "Let price revisit the area instead of chasing.",
                  },
                  {
                    n: "04",
                    title: "Define Risk",
                    text: "Know the invalidation level before entry.",
                  },
                  {
                    n: "05",
                    title: "Set the Target",
                    text: "Use structure or an opposing supply area.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <h3 className="text-[11px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="The zone creates the setup — risk rules define the trade">
                Even if price reacts exactly where expected, the trade still
                needs a defined entry, invalidation point, position size and
                target. A correct zone does not replace risk management.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              14 — COMPLETE SELL EXAMPLE
          ================================================= */}

          <section
            id="supply-demand-sell-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — Short Trade Example</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Supply and Demand Trading Example: Supply Zone Sell Setup
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                A short setup follows the same logic in reverse. The trader
                identifies the base before a strong decline, marks the supply
                zone, waits for price to return, evaluates the reaction and
                defines risk before considering a short entry.
              </p>

              <div className="mt-7">
                <a
                  href="#sd-sell-example-fullscreen"
                  className="block"
                  aria-label="Open supply zone sell example"
                >
                  <div
                    dir="ltr"
                    className="sd-centered-scroll overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
                  >
                    <svg
                      viewBox="0 0 1120 610"
                      className="block h-auto w-[980px] max-w-none sm:w-full"
                      role="img"
                      aria-label="Supply zone short trade example showing entry stop loss and target"
                    >
                      <defs>
                        <pattern
                          id="sellExampleGridEn"
                          width="56"
                          height="61"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M56 0 L0 0 0 61"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>

                      <rect width="1120" height="610" fill="#ffffff" />

                      <rect
                        width="1120"
                        height="610"
                        fill="url(#sellExampleGridEn)"
                      />

                      {/* supply */}
                      <rect
                        x="110"
                        y="104"
                        width="820"
                        height="88"
                        rx="12"
                        fill="#f1f5f9"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      <text
                        x="135"
                        y="139"
                        fontSize="12"
                        fontWeight="900"
                        fill="#475569"
                      >
                        SUPPLY ZONE
                      </text>

                      <text
                        x="135"
                        y="162"
                        fontSize="9"
                        fontWeight="700"
                        fill="#94a3b8"
                      >
                        Base before the strong decline
                      </text>

                      {/* stop */}
                      <line
                        x1="535"
                        y1="72"
                        x2="929"
                        y2="72"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeDasharray="8 6"
                      />

                      <text
                        x="947"
                        y="77"
                        fontSize="10"
                        fontWeight="900"
                        fill="#475569"
                      >
                        INVALIDATION / STOP
                      </text>

                      {/* target */}
                      <rect
                        x="660"
                        y="478"
                        width="365"
                        height="58"
                        rx="10"
                        fill="#eff6ff"
                        stroke="#60a5fa"
                        strokeDasharray="7 6"
                      />

                      <text
                        x="683"
                        y="512"
                        fontSize="11"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        TARGET / OPPOSING AREA
                      </text>

                      {/* price */}
                      <path
                        d="
                          M55 342
                          L105 300
                          L155 244
                          L205 181
                          L255 158
                          L305 173
                          L355 159
                          L405 190
                          L455 255
                          L505 322
                          L555 389
                          L605 445
                          L655 488
                          L705 506
                          L755 484
                          L805 432
                          L850 363
                          L890 292
                          L920 227
                          L944 179
                          L968 161
                          L992 188
                          L1017 246
                          L1041 312
                          L1064 383
                        "
                        fill="none"
                        stroke="#475569"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* departure */}
                      <rect
                        x="477"
                        y="330"
                        width="156"
                        height="32"
                        rx="16"
                        fill="#475569"
                      />

                      <text
                        x="555"
                        y="351"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="900"
                        fill="#ffffff"
                      >
                        STRONG DROP
                      </text>

                      {/* retest */}
                      <circle
                        cx="968"
                        cy="161"
                        r="9"
                        fill="#ffffff"
                        stroke="#475569"
                        strokeWidth="3"
                      />

                      <line
                        x1="968"
                        y1="161"
                        x2="968"
                        y2="227"
                        stroke="#64748b"
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                      />

                      <rect
                        x="902"
                        y="234"
                        width="132"
                        height="29"
                        rx="14.5"
                        fill="#0f172a"
                      />

                      <text
                        x="968"
                        y="253"
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="900"
                        fill="#ffffff"
                      >
                        FIRST RETEST
                      </text>

                      {/* entry */}
                      <circle
                        cx="992"
                        cy="188"
                        r="7"
                        fill="#475569"
                      />

                      <line
                        x1="992"
                        y1="188"
                        x2="1053"
                        y2="188"
                        stroke="#475569"
                        strokeWidth="2"
                      />

                      <text
                        x="1060"
                        y="192"
                        fontSize="10"
                        fontWeight="900"
                        fill="#475569"
                      >
                        ENTRY
                      </text>

                      {/* path */}
                      <path
                        d="M1020 274 L1020 449"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeDasharray="7 6"
                      />

                      <path
                        d="M1012 438 L1020 452 L1028 438"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />

                      <text
                        x="1038"
                        y="366"
                        fontSize="9"
                        fontWeight="900"
                        fill="#1E5BB8"
                        transform="rotate(-90 1038 366)"
                      >
                        POTENTIAL TRADE PATH
                      </text>

                      <text
                        x="83"
                        y="566"
                        fontSize="9"
                        fontWeight="900"
                        fill="#64748b"
                      >
                        EDUCATIONAL EXAMPLE — NOT A LIVE TRADE SIGNAL
                      </text>
                    </svg>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500 lg:hidden">
                    <span>↔</span>
                    <span>Swipe to explore · Tap to enlarge</span>
                  </div>
                </a>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "Identify Supply",
                    text: "Find the base before the strong decline.",
                  },
                  {
                    n: "02",
                    title: "Check Departure",
                    text: "Evaluate the strength and cleanliness of the move.",
                  },
                  {
                    n: "03",
                    title: "Wait for Return",
                    text: "Allow price to revisit the supply area.",
                  },
                  {
                    n: "04",
                    title: "Define Risk",
                    text: "Know where the short setup becomes invalid.",
                  },
                  {
                    n: "05",
                    title: "Plan the Target",
                    text: "Use structure or an opposing demand zone.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <h3 className="text-[11px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Long and short setups use the same framework">
                For a demand setup, the trader studies the origin of a strong
                rally. For a supply setup, the trader studies the origin of a
                strong decline. Zone quality, retests, invalidation and risk
                management remain essential in both directions.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              15 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="supply-demand-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — Risk Management</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Risk Management for Supply and Demand Trading
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                Supply and demand analysis can help define where a setup may
                become interesting, but risk management determines how much a
                failed idea can cost. No zone should justify uncontrolled
                position size.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Define Risk First",
                    text: "Decide the maximum amount or percentage you are prepared to lose before entering.",
                  },
                  {
                    n: "02",
                    title: "Size From the Stop",
                    text: "Calculate position size from the distance between entry and invalidation.",
                  },
                  {
                    n: "03",
                    title: "Do Not Widen Risk",
                    text: "Moving the stop farther simply to avoid a loss changes the original trade plan.",
                  },
                  {
                    n: "04",
                    title: "Watch Total Exposure",
                    text: "Several correlated positions can create much more portfolio risk than each trade appears to carry alone.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
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

              <ImportantBox title="A strong-looking zone can still fail">
                Risk should be based on what you can afford to lose if the
                analysis is wrong. The appearance of a setup should never be
                used as a reason to ignore normal position-sizing rules.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              16 — COMMON MISTAKES
          ================================================= */}

          <section
            id="supply-demand-trading-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — Common Mistakes</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Common Supply and Demand Trading Mistakes
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                Most beginner mistakes come from making the method too
                subjective: drawing too many zones, changing rules after the
                outcome, or treating every touch as a trade.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Marking Every Turn",
                    text: "Not every high or low is a meaningful supply or demand zone.",
                  },
                  {
                    n: "02",
                    title: "Drawing a Line",
                    text: "Treating the setup as one exact price can create false precision.",
                  },
                  {
                    n: "03",
                    title: "Ignoring Departure",
                    text: "A weak move away from the base may not meet your zone-quality rules.",
                  },
                  {
                    n: "04",
                    title: "Trading Every Touch",
                    text: "A retest is information, not an automatic buy or sell instruction.",
                  },
                  {
                    n: "05",
                    title: "Ignoring Opposing Zones",
                    text: "A nearby opposing area can significantly reduce available room to target.",
                  },
                  {
                    n: "06",
                    title: "Redrawing Afterwards",
                    text: "Changing boundaries after seeing the result destroys objective testing.",
                  },
                  {
                    n: "07",
                    title: "Using Every Old Zone",
                    text: "Historical zones should still meet the strategy's rules for relevance and retests.",
                  },
                  {
                    n: "08",
                    title: "Ignoring Context",
                    text: "A lower-timeframe zone can behave differently within a strong higher-timeframe move.",
                  },
                  {
                    n: "09",
                    title: "Oversizing Risk",
                    text: "No technical setup is reliable enough to justify uncontrolled exposure.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <h3 className="text-[11px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              17 — BACKTESTING
          ================================================= */}

          <section
            id="backtest-supply-demand-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — Backtesting</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Backtest a Supply and Demand Strategy
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  Supply and demand trading contains several decisions: what
                  qualifies as a base, how strong the departure must be, how
                  the zone is drawn, whether freshness matters, and which
                  entry method is used.
                </p>

                <p>
                  Backtesting helps turn those ideas into a repeatable trading
                  process. The objective is not to prove that the strategy
                  always works. It is to determine how a
                  <strong> specific set of rules</strong> performed across a
                  meaningful sample of historical setups.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "Choose the Market",
                    text: "Select the instrument and timeframe you want to test.",
                  },
                  {
                    n: "02",
                    title: "Freeze the Rules",
                    text: "Define zone, entry, stop and target rules before reviewing outcomes.",
                  },
                  {
                    n: "03",
                    title: "Hide the Future",
                    text: "Use replay or historical testing without looking ahead.",
                  },
                  {
                    n: "04",
                    title: "Record Each Setup",
                    text: "Document both winning and losing examples consistently.",
                  },
                  {
                    n: "05",
                    title: "Analyze the Sample",
                    text: "Review results only after collecting enough observations to be useful.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <h3 className="text-[11px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <h3 className="text-base font-black text-slate-900">
                  What should you record?
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "DBR / RBR / RBD / DBD",
                    "Fresh or Tested",
                    "Number of Base Candles",
                    "Departure Strength",
                    "Higher-Timeframe Context",
                    "Entry Method",
                    "Stop Distance",
                    "Target",
                    "Result in R",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] font-black text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <ImportantBox title="Do not change the rules halfway through the test">
                If the definition of a valid zone changes whenever a losing
                setup appears, the results become difficult to interpret.
                Create objective rules first, test them, and then make a new
                version of the strategy if you want to evaluate changes.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              18 — BEGINNER ROADMAP
          ================================================= */}

          <section
            id="supply-demand-beginner-roadmap"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — Beginner Roadmap</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Learn Supply and Demand Trading Step by Step
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                If you are completely new to supply and demand trading, avoid
                trying to learn every variation at once. Build the method in a
                logical order so each concept has a clear purpose.
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Understand Supply & Demand",
                    text: "Learn why the strategy uses price areas instead of treating every turning point as an exact line.",
                  },
                  {
                    n: "02",
                    title: "Learn Base & Departure",
                    text: "Practice finding compact bases followed by clear directional moves.",
                  },
                  {
                    n: "03",
                    title: "Learn the Four Patterns",
                    text: "Recognize DBR, RBR, RBD and DBD without needing to trade them yet.",
                  },
                  {
                    n: "04",
                    title: "Define Zone Boundaries",
                    text: "Choose consistent proximal and distal drawing rules.",
                  },
                  {
                    n: "05",
                    title: "Add Quality Filters",
                    text: "Study freshness, departure strength, context and available room to target.",
                  },
                  {
                    n: "06",
                    title: "Backtest the Full Setup",
                    text: "Only after the earlier steps are clear should you test entries, stops, targets and complete trade management.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              19 — CHECKLIST
          ================================================= */}

          <section
            id="supply-demand-trading-checklist"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — Trading Checklist</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Supply and Demand Trading Checklist
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                A checklist can reduce impulsive decisions by forcing the same
                questions to be answered before every potential setup.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Is There a Clear Base?",
                  },
                  {
                    n: "02",
                    title: "Was the Departure Strong?",
                  },
                  {
                    n: "03",
                    title: "Is the Zone Fresh or Tested?",
                  },
                  {
                    n: "04",
                    title: "How Many Retests?",
                  },
                  {
                    n: "05",
                    title: "What Is the HTF Context?",
                  },
                  {
                    n: "06",
                    title: "Where Is the Opposing Zone?",
                  },
                  {
                    n: "07",
                    title: "Where Is Invalidation?",
                  },
                  {
                    n: "08",
                    title: "Is the Reward Worth the Risk?",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <h3 className="text-[11px] font-black leading-5 text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <ImportantBox title="A checklist does not create certainty">
                Its purpose is consistency. If a setup fails your own rules,
                the checklist gives you an objective reason to leave it alone
                rather than inventing a justification to enter.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              20 — FAQ
          ================================================= */}

          <section
            id="supply-demand-faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — Frequently Asked Questions</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Supply and Demand Trading FAQ
              </h2>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                {faqItems.map((item, index) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3 className="pt-1 text-[13px] font-black leading-6 text-slate-900">
                        {item.question}
                      </h3>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-6 text-slate-600 sm:text-[12px] sm:leading-7">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-[#EEF5FD] via-white to-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>Summary</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Supply and Demand Trading Strategy: Key Takeaways
              </h2>

              <div className="mt-5 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
                <p>
                  Supply and demand trading is a price-action framework built
                  around the <strong>base before a strong price move</strong>.
                  A strong move higher can create a potential demand zone,
                  while a strong move lower can create a potential supply
                  zone.
                </p>

                <p>
                  The four common structures are
                  <strong> DBR, RBR, RBD and DBD</strong>. Traders then refine
                  these areas using factors such as departure strength, base
                  quality, freshness, market structure, higher-timeframe
                  context and available reward relative to risk.
                </p>

                <p>
                  The most important distinction for beginners is that
                  <strong> identifying a zone is not the same as having a trade</strong>.
                  A complete strategy still needs objective entry rules,
                  invalidation, position sizing, targets and backtesting.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Find the departure first",
                  "Mark the base as a zone",
                  "Evaluate quality before entry",
                  "Define risk before taking the trade",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border border-blue-100 bg-white p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <span className="text-[11px] font-black leading-5 text-slate-800">
                        {item}
                      </span>
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

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Related Trading Strategy Guides
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Price Action Trading",
                    text: "Learn how traders analyze raw price movement, structure and market reactions.",
                    href: "/en/strategies/price-action",
                  },
                  {
                    title: "Smart Money Concepts",
                    text: "Explore market structure, liquidity, order blocks and other SMC concepts.",
                    href: "/en/strategies/smart-money-concepts",
                  },
                  {
                    title: "Trend Following",
                    text: "Learn how trend-following strategies identify and trade sustained market direction.",
                    href: "/en/strategies/trend-following",
                  },
                  {
                    title: "Swing Trading",
                    text: "Understand how swing traders plan trades around multi-day or multi-week price moves.",
                    href: "/en/strategies/swing-trading",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/40 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <h3 className="text-sm font-black text-slate-900 transition group-hover:text-[#1E5BB8]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>

                    <div className="mt-4 text-[10px] font-black text-[#1E5BB8]">
                      Read guide →
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] bg-slate-950 shadow-sm">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">
                  Broker Alarab
                </div>

                <h2 className="mt-3 max-w-[780px] text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-white sm:text-[30px]">
                  Build Your Trading Process With Better Research and Tools
                </h2>

                <p className="mt-3 max-w-[760px] text-[12px] font-medium leading-7 text-slate-300 sm:text-[13px]">
                  Compare brokers, explore trading tools and continue learning
                  the strategies and concepts used across global financial
                  markets.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href="/en/brokers"
                  className="rounded-xl bg-white px-5 py-3 text-[11px] font-black text-slate-950 transition hover:bg-blue-50"
                >
                  Compare Brokers
                </a>

                <a
                  href="/en/tools"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-[11px] font-black text-white transition hover:border-blue-400"
                >
                  Trading Tools
                </a>
              </div>
            </div>
          </section>
        </article>
      </div>

      {/* =================================================
          BUY EXAMPLE — FULLSCREEN
      ================================================= */}

      <div
        id="sd-buy-example-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#supply-demand-buy-example"
          aria-label="Close buy example"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1300px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
          <svg
            viewBox="0 0 1120 610"
            className="block h-auto min-w-[900px] w-full"
            role="img"
            aria-label="Enlarged demand zone long trade example"
          >
            <defs>
              <pattern
                id="buyFullGridEn"
                width="56"
                height="61"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M56 0 L0 0 0 61"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="1120" height="610" fill="#ffffff" />
            <rect width="1120" height="610" fill="url(#buyFullGridEn)" />

            <rect
              x="660"
              y="72"
              width="365"
              height="58"
              rx="10"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeDasharray="7 6"
            />

            <text
              x="683"
              y="106"
              fontSize="11"
              fontWeight="900"
              fill="#475569"
            >
              TARGET / OPPOSING AREA
            </text>

            <rect
              x="110"
              y="404"
              width="820"
              height="88"
              rx="12"
              fill="#eff6ff"
              stroke="#60a5fa"
              strokeWidth="2"
            />

            <text
              x="135"
              y="438"
              fontSize="12"
              fontWeight="900"
              fill="#1E5BB8"
            >
              DEMAND ZONE
            </text>

            <text
              x="135"
              y="461"
              fontSize="9"
              fontWeight="700"
              fill="#60a5fa"
            >
              Base before the strong rally
            </text>

            <line
              x1="535"
              y1="521"
              x2="929"
              y2="521"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="8 6"
            />

            <text
              x="947"
              y="526"
              fontSize="10"
              fontWeight="900"
              fill="#475569"
            >
              INVALIDATION / STOP
            </text>

            <path
              d="
                M55 267
                L105 309
                L155 365
                L205 427
                L255 450
                L305 435
                L355 449
                L405 419
                L455 354
                L505 287
                L555 221
                L605 164
                L655 121
                L705 103
                L755 125
                L805 177
                L850 246
                L890 317
                L920 382
                L944 430
                L968 448
                L992 421
                L1017 363
                L1041 297
                L1064 226
              "
              fill="none"
              stroke="#1E5BB8"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <rect
              x="477"
              y="247"
              width="156"
              height="32"
              rx="16"
              fill="#2563eb"
            />

            <text
              x="555"
              y="268"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#ffffff"
            >
              STRONG RALLY
            </text>

            <circle
              cx="968"
              cy="448"
              r="9"
              fill="#ffffff"
              stroke="#2563eb"
              strokeWidth="3"
            />

            <line
              x1="968"
              y1="448"
              x2="968"
              y2="383"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            <rect
              x="902"
              y="347"
              width="132"
              height="29"
              rx="14.5"
              fill="#0f172a"
            />

            <text
              x="968"
              y="366"
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
              fill="#ffffff"
            >
              FIRST RETEST
            </text>

            <circle cx="992" cy="421" r="7" fill="#2563eb" />

            <line
              x1="992"
              y1="421"
              x2="1053"
              y2="421"
              stroke="#2563eb"
              strokeWidth="2"
            />

            <text
              x="1060"
              y="425"
              fontSize="10"
              fontWeight="900"
              fill="#1E5BB8"
            >
              ENTRY
            </text>

            <path
              d="M1020 335 L1020 161"
              stroke="#2563eb"
              strokeWidth="3"
              strokeDasharray="7 6"
            />

            <path
              d="M1012 172 L1020 158 L1028 172"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      {/* =================================================
          SELL EXAMPLE — FULLSCREEN
      ================================================= */}

      <div
        id="sd-sell-example-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#supply-demand-sell-example"
          aria-label="Close sell example"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1300px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
          <svg
            viewBox="0 0 1120 610"
            className="block h-auto min-w-[900px] w-full"
            role="img"
            aria-label="Enlarged supply zone short trade example"
          >
            <defs>
              <pattern
                id="sellFullGridEn"
                width="56"
                height="61"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M56 0 L0 0 0 61"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="1120" height="610" fill="#ffffff" />
            <rect width="1120" height="610" fill="url(#sellFullGridEn)" />

            <rect
              x="110"
              y="104"
              width="820"
              height="88"
              rx="12"
              fill="#f1f5f9"
              stroke="#94a3b8"
              strokeWidth="2"
            />

            <text
              x="135"
              y="139"
              fontSize="12"
              fontWeight="900"
              fill="#475569"
            >
              SUPPLY ZONE
            </text>

            <text
              x="135"
              y="162"
              fontSize="9"
              fontWeight="700"
              fill="#94a3b8"
            >
              Base before the strong decline
            </text>

            <line
              x1="535"
              y1="72"
              x2="929"
              y2="72"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="8 6"
            />

            <text
              x="947"
              y="77"
              fontSize="10"
              fontWeight="900"
              fill="#475569"
            >
              INVALIDATION / STOP
            </text>

            <rect
              x="660"
              y="478"
              width="365"
              height="58"
              rx="10"
              fill="#eff6ff"
              stroke="#60a5fa"
              strokeDasharray="7 6"
            />

            <text
              x="683"
              y="512"
              fontSize="11"
              fontWeight="900"
              fill="#1E5BB8"
            >
              TARGET / OPPOSING AREA
            </text>

            <path
              d="
                M55 342
                L105 300
                L155 244
                L205 181
                L255 158
                L305 173
                L355 159
                L405 190
                L455 255
                L505 322
                L555 389
                L605 445
                L655 488
                L705 506
                L755 484
                L805 432
                L850 363
                L890 292
                L920 227
                L944 179
                L968 161
                L992 188
                L1017 246
                L1041 312
                L1064 383
              "
              fill="none"
              stroke="#475569"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <rect
              x="477"
              y="330"
              width="156"
              height="32"
              rx="16"
              fill="#475569"
            />

            <text
              x="555"
              y="351"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#ffffff"
            >
              STRONG DROP
            </text>

            <circle
              cx="968"
              cy="161"
              r="9"
              fill="#ffffff"
              stroke="#475569"
              strokeWidth="3"
            />

            <line
              x1="968"
              y1="161"
              x2="968"
              y2="227"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            <rect
              x="902"
              y="234"
              width="132"
              height="29"
              rx="14.5"
              fill="#0f172a"
            />

            <text
              x="968"
              y="253"
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
              fill="#ffffff"
            >
              FIRST RETEST
            </text>

            <circle cx="992" cy="188" r="7" fill="#475569" />

            <line
              x1="992"
              y1="188"
              x2="1053"
              y2="188"
              stroke="#475569"
              strokeWidth="2"
            />

            <text
              x="1060"
              y="192"
              fontSize="10"
              fontWeight="900"
              fill="#475569"
            >
              ENTRY
            </text>

            <path
              d="M1020 274 L1020 449"
              stroke="#2563eb"
              strokeWidth="3"
              strokeDasharray="7 6"
            />

            <path
              d="M1012 438 L1020 452 L1028 438"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

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
          MOBILE CHART CENTERING
      ================================================= */}

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              function centerSupplyDemandCharts() {
                document
                  .querySelectorAll('.sd-centered-scroll')
                  .forEach(function (el) {
                    var maxScroll = el.scrollWidth - el.clientWidth;

                    if (maxScroll > 0) {
                      el.scrollLeft = maxScroll / 2;
                    }
                  });
              }

              if (document.readyState === 'loading') {
                document.addEventListener(
                  'DOMContentLoaded',
                  centerSupplyDemandCharts
                );
              } else {
                centerSupplyDemandCharts();
              }

              window.addEventListener(
                'resize',
                centerSupplyDemandCharts
              );
            })();
          `,
        }}
      />

      {/* =================================================
          FULLSCREEN FALLBACK
      ================================================= */}

      <style>{`
        #sd-basics-fullscreen:target,
        #sd-patterns-fullscreen:target,
        #draw-sd-zone-fullscreen:target,
        #sd-buy-example-fullscreen:target,
        #sd-sell-example-fullscreen:target {
          display: flex;
        }
      `}</style>
    </main>
  );
}