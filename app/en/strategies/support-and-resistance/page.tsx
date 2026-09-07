import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/support-and-resistance`;
const AR_PAGE_URL = `${BASE_URL}/strategies/support-and-resistance`;

const PAGE_TITLE =
  "Support and Resistance Trading Strategy: Complete Guide";

const PAGE_DESCRIPTION =
  "Learn the support and resistance trading strategy step by step: how to identify and draw key zones, trade bounces, breakouts and retests, recognize false breakouts, place stops and targets, and manage risk.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "support and resistance",
    "support and resistance strategy",
    "support and resistance trading strategy",
    "support and resistance trading",
    "support and resistance forex",
    "forex support and resistance",
    "support resistance strategy forex",
    "how to trade support and resistance",
    "how to identify support and resistance",
    "how to draw support and resistance",
    "support and resistance zones",
    "support and resistance levels",
    "key support and resistance levels",
    "support resistance bounce",
    "support resistance breakout",
    "support resistance retest",
    "breakout and retest",
    "breakout retest strategy",
    "false breakout",
    "false breakout strategy",
    "role reversal trading",
    "resistance becomes support",
    "support becomes resistance",
    "range trading",
    "support and resistance for beginners",
    "price action",
    "price action strategy",
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
    question: "What is support and resistance in trading?",
    answer:
      "Support is a price area below the current market where a decline previously slowed, stalled or reversed. Resistance is an area above the market where an advance previously slowed, stalled or reversed. Traders use these zones to plan bounce, breakout and retest scenarios.",
  },
  {
    question: "How do you identify support and resistance?",
    answer:
      "Traders commonly begin with clear swing highs, swing lows, range boundaries and price areas that produced meaningful historical reactions. The goal is to identify a limited number of relevant zones rather than filling the chart with horizontal lines.",
  },
  {
    question: "Should support and resistance be lines or zones?",
    answer:
      "Lines can be useful visual references, but support and resistance are often more practical as price zones because reactions and candle wicks rarely occur at one perfectly exact price.",
  },
  {
    question: "What is a breakout and retest?",
    answer:
      "A breakout and retest occurs when price breaks a support or resistance area and later returns to test the broken zone from the opposite side. Former resistance may act as support, while broken support may act as resistance.",
  },
  {
    question: "What is a false breakout?",
    answer:
      "A false breakout occurs when price moves beyond support or resistance but fails to sustain the move and returns toward or inside the previous range.",
  },
  {
    question: "Does more touches make support or resistance stronger?",
    answer:
      "There is no universal rule saying that a specific number of touches automatically makes a level strong. Traders should also evaluate market context, timeframe, reaction quality and how price approaches the zone.",
  },
  {
    question: "Where should a stop loss go in support and resistance trading?",
    answer:
      "The stop loss should relate to the technical invalidation point of the setup. For a support-based long trade, that may be below the zone or relevant swing low. For a resistance-based short trade, it may be above the zone or swing high.",
  },
  {
    question:
      "What is the difference between support and resistance and supply and demand?",
    answer:
      "Support and resistance usually focuses on historical price reaction areas, while supply and demand methods often focus on zones around the origin or base of strong directional moves. The frameworks can overlap but are not identical.",
  },
  {
    question: "Is support and resistance trading profitable?",
    answer:
      "No trading strategy guarantees profitability. Results depend on the exact rules, market conditions, execution costs, risk management and consistency. The strategy should therefore be tested objectively before it is relied upon.",
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
   REUSABLE SVG CANDLE
========================================================= */

function Candle({
  x,
  open,
  close,
  high,
  low,
  bullish,
  width = 18,
}: {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  bullish: boolean;
  width?: number;
}) {
  const top = Math.min(open, close);
  const height = Math.max(Math.abs(close - open), 4);

  return (
    <g>
      <line
        x1={x}
        y1={high}
        x2={x}
        y2={low}
        stroke={bullish ? "#2563eb" : "#475569"}
        strokeWidth="2"
      />

      <rect
        x={x - width / 2}
        y={top}
        width={width}
        height={height}
        rx="1.5"
        fill={bullish ? "#ffffff" : "#475569"}
        stroke={bullish ? "#2563eb" : "#475569"}
        strokeWidth="2"
      />
    </g>
  );
}

/* =========================================================
   HERO — DESKTOP
========================================================= */

function SupportResistanceHeroDesktopChart() {
  return (
    <svg
      viewBox="0 0 760 430"
      className="block h-full min-h-[410px] w-full"
      role="img"
      aria-label="Support and resistance zones with repeated price reactions"
    >
      <defs>
        <pattern
          id="srHeroGridEn"
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
      </defs>

      <rect width="760" height="430" fill="#ffffff" />
      <rect width="760" height="430" fill="url(#srHeroGridEn)" />

      {/* Resistance zone */}
      <rect
        x="70"
        y="74"
        width="620"
        height="58"
        rx="9"
        fill="#f1f5f9"
        stroke="#94a3b8"
        strokeWidth="2"
      />

      <text
        x="92"
        y="98"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        RESISTANCE ZONE
      </text>

      {/* Support zone */}
      <rect
        x="70"
        y="315"
        width="620"
        height="61"
        rx="9"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="92"
        y="341"
        fontSize="10"
        fontWeight="900"
        fill="#1E5BB8"
      >
        SUPPORT ZONE
      </text>

      {/* First rally */}
      <Candle
        x={110}
        open={300}
        close={266}
        high={315}
        low={250}
        bullish
      />
      <Candle
        x={150}
        open={264}
        close={220}
        high={280}
        low={203}
        bullish
      />
      <Candle
        x={190}
        open={219}
        close={170}
        high={235}
        low={153}
        bullish
      />
      <Candle
        x={230}
        open={168}
        close={119}
        high={183}
        low={101}
        bullish
        width={20}
      />

      {/* Resistance rejection */}
      <Candle
        x={272}
        open={118}
        close={152}
        high={89}
        low={168}
        bullish={false}
      />
      <Candle
        x={312}
        open={151}
        close={201}
        high={136}
        low={217}
        bullish={false}
      />
      <Candle
        x={352}
        open={199}
        close={254}
        high={183}
        low={270}
        bullish={false}
      />
      <Candle
        x={392}
        open={253}
        close={326}
        high={237}
        low={350}
        bullish={false}
        width={20}
      />

      {/* Support bounce */}
      <Candle
        x={434}
        open={326}
        close={285}
        high={350}
        low={268}
        bullish
      />
      <Candle
        x={474}
        open={284}
        close={236}
        high={299}
        low={219}
        bullish
      />
      <Candle
        x={514}
        open={234}
        close={188}
        high={250}
        low={171}
        bullish
      />
      <Candle
        x={554}
        open={187}
        close={140}
        high={202}
        low={123}
        bullish
      />
      <Candle
        x={594}
        open={139}
        close={108}
        high={124}
        low={91}
        bullish
      />

      <Candle
        x={634}
        open={109}
        close={150}
        high={88}
        low={168}
        bullish={false}
      />

      <circle
        cx="230"
        cy="108"
        r="9"
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="3"
      />

      <circle
        cx="392"
        cy="329"
        r="9"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <line
        x1="230"
        y1="99"
        x2="230"
        y2="53"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="230"
        y="43"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#475569"
      >
        SELLING REACTION
      </text>

      <line
        x1="392"
        y1="338"
        x2="392"
        y2="400"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="392"
        y="416"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#1E5BB8"
      >
        BUYING REACTION
      </text>
    </svg>
  );
}

/* =========================================================
   HERO — MOBILE
========================================================= */

function SupportResistanceHeroMobileChart() {
  return (
    <svg
      viewBox="0 0 520 285"
      className="block h-auto w-full"
      role="img"
      aria-label="Support and resistance chart example"
    >
      <defs>
        <pattern
          id="srHeroMobileGridEn"
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

      <rect width="520" height="285" fill="#ffffff" />
      <rect width="520" height="285" fill="url(#srHeroMobileGridEn)" />

      <rect
        x="44"
        y="49"
        width="430"
        height="39"
        rx="7"
        fill="#f1f5f9"
        stroke="#94a3b8"
        strokeWidth="2"
      />

      <text
        x="59"
        y="72"
        fontSize="8"
        fontWeight="900"
        fill="#475569"
      >
        RESISTANCE
      </text>

      <rect
        x="44"
        y="208"
        width="430"
        height="42"
        rx="7"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="59"
        y="233"
        fontSize="8"
        fontWeight="900"
        fill="#1E5BB8"
      >
        SUPPORT
      </text>

      <Candle
        x={83}
        open={197}
        close={167}
        high={209}
        low={155}
        bullish
        width={15}
      />
      <Candle
        x={117}
        open={165}
        close={129}
        high={178}
        low={116}
        bullish
        width={15}
      />
      <Candle
        x={151}
        open={128}
        close={82}
        high={140}
        low={67}
        bullish
        width={16}
      />

      <Candle
        x={187}
        open={82}
        close={116}
        high={61}
        low={131}
        bullish={false}
        width={15}
      />
      <Candle
        x={221}
        open={115}
        close={157}
        high={103}
        low={171}
        bullish={false}
        width={15}
      />
      <Candle
        x={255}
        open={156}
        close={219}
        high={143}
        low={238}
        bullish={false}
        width={17}
      />

      <Candle
        x={291}
        open={218}
        close={181}
        high={239}
        low={166}
        bullish
        width={16}
      />
      <Candle
        x={327}
        open={180}
        close={139}
        high={193}
        low={125}
        bullish
        width={16}
      />
      <Candle
        x={363}
        open={139}
        close={97}
        high={152}
        low={83}
        bullish
        width={16}
      />
      <Candle
        x={399}
        open={96}
        close={71}
        high={83}
        low={58}
        bullish
        width={15}
      />
      <Candle
        x={435}
        open={72}
        close={107}
        high={55}
        low={121}
        bullish={false}
        width={15}
      />

      <circle
        cx="151"
        cy="78"
        r="7"
        fill="#ffffff"
        stroke="#64748b"
        strokeWidth="2.5"
      />

      <circle
        cx="255"
        cy="219"
        r="7"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/* =========================================================
   CHART 01 — SUPPORT VS RESISTANCE
========================================================= */

function SupportResistanceTypesChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1120 560"
      className="block h-auto w-[1020px] max-w-none sm:w-full"
      role="img"
      aria-label="Support zone compared with resistance zone using candlestick charts"
    >
      <defs>
        <pattern
          id={fullscreen ? "srTypesGridFullEn" : "srTypesGridEn"}
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M56 0 L0 0 0 56"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="1120" height="560" fill="#ffffff" />

      <rect
        width="1120"
        height="560"
        fill={`url(#${fullscreen ? "srTypesGridFullEn" : "srTypesGridEn"})`}
      />

      {/* SUPPORT CARD */}
      <rect
        x="30"
        y="25"
        width="515"
        height="505"
        rx="22"
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="2"
      />

      <text
        x="58"
        y="65"
        fontSize="18"
        fontWeight="900"
        fill="#1E5BB8"
      >
        SUPPORT ZONE
      </text>

      <text
        x="58"
        y="88"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        Price area where buying reactions previously appeared
      </text>

      <rect
        x="76"
        y="340"
        width="420"
        height="92"
        rx="9"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="94"
        y="365"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        SUPPORT AREA
      </text>

      <Candle
        x={112}
        open={175}
        close={209}
        high={160}
        low={225}
        bullish={false}
      />
      <Candle
        x={150}
        open={208}
        close={249}
        high={193}
        low={265}
        bullish={false}
      />
      <Candle
        x={188}
        open={247}
        close={292}
        high={232}
        low={308}
        bullish={false}
      />
      <Candle
        x={226}
        open={290}
        close={351}
        high={275}
        low={382}
        bullish={false}
        width={22}
      />

      <Candle
        x={268}
        open={351}
        close={312}
        high={378}
        low={296}
        bullish
        width={21}
      />
      <Candle
        x={310}
        open={311}
        close={262}
        high={327}
        low={246}
        bullish
        width={21}
      />
      <Candle
        x={352}
        open={261}
        close={207}
        high={277}
        low={190}
        bullish
        width={21}
      />
      <Candle
        x={394}
        open={206}
        close={154}
        high={222}
        low={138}
        bullish
        width={21}
      />
      <Candle
        x={436}
        open={153}
        close={116}
        high={168}
        low={100}
        bullish
      />

      <line
        x1="226"
        y1="382"
        x2="226"
        y2="456"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="226"
        y="475"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        BUYING REACTION
      </text>

      <rect
        x="299"
        y="111"
        width="151"
        height="30"
        rx="15"
        fill="#2563eb"
      />

      <text
        x="374"
        y="130"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        BULLISH REACTION
      </text>

      {/* RESISTANCE CARD */}
      <rect
        x="575"
        y="25"
        width="515"
        height="505"
        rx="22"
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="2"
      />

      <text
        x="603"
        y="65"
        fontSize="18"
        fontWeight="900"
        fill="#334155"
      >
        RESISTANCE ZONE
      </text>

      <text
        x="603"
        y="88"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        Price area where selling reactions previously appeared
      </text>

      <rect
        x="621"
        y="128"
        width="420"
        height="92"
        rx="9"
        fill="#f1f5f9"
        stroke="#94a3b8"
        strokeWidth="2"
      />

      <text
        x="639"
        y="153"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        RESISTANCE AREA
      </text>

      <Candle
        x={656}
        open={370}
        close={333}
        high={317}
        low={386}
        bullish
      />
      <Candle
        x={694}
        open={332}
        close={290}
        high={274}
        low={347}
        bullish
      />
      <Candle
        x={732}
        open={289}
        close={246}
        high={230}
        low={304}
        bullish
      />
      <Candle
        x={770}
        open={245}
        close={181}
        high={153}
        low={260}
        bullish
        width={22}
      />

      <Candle
        x={812}
        open={182}
        close={229}
        high={165}
        low={245}
        bullish={false}
        width={21}
      />
      <Candle
        x={854}
        open={230}
        close={280}
        high={214}
        low={296}
        bullish={false}
        width={21}
      />
      <Candle
        x={896}
        open={281}
        close={335}
        high={265}
        low={352}
        bullish={false}
        width={21}
      />
      <Candle
        x={938}
        open={336}
        close={383}
        high={320}
        low={400}
        bullish={false}
        width={21}
      />
      <Candle
        x={980}
        open={384}
        close={417}
        high={369}
        low={433}
        bullish={false}
      />

      <line
        x1="770"
        y1="153"
        x2="770"
        y2="108"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="770"
        y="101"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        SELLING REACTION
      </text>

      <rect
        x="851"
        y="419"
        width="151"
        height="30"
        rx="15"
        fill="#475569"
      />

      <text
        x="926"
        y="438"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        BEARISH REACTION
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="sr-types-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#support-vs-resistance"
          aria-label="Close chart"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1300px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
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
        href="#sr-types-fullscreen"
        className="block lg:hidden"
        aria-label="Expand support and resistance chart"
      >
        <div className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white">
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe to explore · tap to expand</span>
        </div>
      </a>
    </>
  );
}

/* =========================================================
   CHART 02 — LINES VS ZONES
========================================================= */

function LinesVsZonesChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 580"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Exact support line compared with a support price zone"
    >
      <defs>
        <pattern
          id={fullscreen ? "srZoneGridFullEn" : "srZoneGridEn"}
          width="59"
          height="58"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M59 0 L0 0 0 58"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="1180" height="580" fill="#ffffff" />

      <rect
        width="1180"
        height="580"
        fill={`url(#${fullscreen ? "srZoneGridFullEn" : "srZoneGridEn"})`}
      />

      <line
        x1="590"
        y1="30"
        x2="590"
        y2="545"
        stroke="#e2e8f0"
        strokeWidth="2"
      />

      {/* LEFT — EXACT LINE */}
      <text
        x="295"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#334155"
      >
        EXACT PRICE LINE
      </text>

      <text
        x="295"
        y="82"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        One exact price may not capture every reaction
      </text>

      <line
        x1="65"
        y1="348"
        x2="525"
        y2="348"
        stroke="#ef4444"
        strokeWidth="3"
        strokeDasharray="9 7"
      />

      <text
        x="82"
        y="332"
        fontSize="9"
        fontWeight="900"
        fill="#ef4444"
      >
        EXACT LEVEL
      </text>

      <Candle
        x={110}
        open={190}
        close={226}
        high={174}
        low={242}
        bullish={false}
      />
      <Candle
        x={151}
        open={225}
        close={269}
        high={209}
        low={285}
        bullish={false}
      />
      <Candle
        x={192}
        open={267}
        close={327}
        high={251}
        low={363}
        bullish={false}
      />

      <Candle
        x={233}
        open={327}
        close={287}
        high={370}
        low={270}
        bullish
      />
      <Candle
        x={274}
        open={286}
        close={238}
        high={302}
        low={221}
        bullish
      />

      <Candle
        x={315}
        open={238}
        close={283}
        high={222}
        low={300}
        bullish={false}
      />
      <Candle
        x={356}
        open={282}
        close={337}
        high={266}
        low={377}
        bullish={false}
      />

      <Candle
        x={397}
        open={337}
        close={298}
        high={385}
        low={281}
        bullish
      />
      <Candle
        x={438}
        open={298}
        close={253}
        high={314}
        low={237}
        bullish
      />

      <circle
        cx="192"
        cy="356"
        r="8"
        fill="#ffffff"
        stroke="#ef4444"
        strokeWidth="3"
      />

      <circle
        cx="356"
        cy="367"
        r="8"
        fill="#ffffff"
        stroke="#ef4444"
        strokeWidth="3"
      />

      <text
        x="295"
        y="515"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#64748b"
      >
        REACTIONS DO NOT OCCUR AT ONE PERFECT PRICE
      </text>

      {/* RIGHT — ZONE */}
      <text
        x="885"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#1E5BB8"
      >
        PRICE ZONE
      </text>

      <text
        x="885"
        y="82"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        A zone allows for wicks and slightly different reactions
      </text>

      <rect
        x="645"
        y="325"
        width="480"
        height="78"
        rx="10"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="666"
        y="316"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        SUPPORT ZONE
      </text>

      <Candle
        x={690}
        open={190}
        close={226}
        high={174}
        low={242}
        bullish={false}
      />
      <Candle
        x={731}
        open={225}
        close={269}
        high={209}
        low={285}
        bullish={false}
      />
      <Candle
        x={772}
        open={267}
        close={337}
        high={251}
        low={374}
        bullish={false}
      />

      <Candle
        x={813}
        open={337}
        close={293}
        high={382}
        low={276}
        bullish
      />
      <Candle
        x={854}
        open={292}
        close={242}
        high={308}
        low={226}
        bullish
      />

      <Candle
        x={895}
        open={241}
        close={282}
        high={225}
        low={299}
        bullish={false}
      />
      <Candle
        x={936}
        open={281}
        close={347}
        high={265}
        low={390}
        bullish={false}
      />

      <Candle
        x={977}
        open={347}
        close={302}
        high={395}
        low={285}
        bullish
      />
      <Candle
        x={1018}
        open={301}
        close={252}
        high={317}
        low={236}
        bullish
      />

      <path
        d="M785 422 C835 469 950 471 1001 425"
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
      />

      <text
        x="893"
        y="497"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#1E5BB8"
      >
        MULTIPLE REACTIONS INSIDE THE SAME ZONE
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="sr-zones-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#support-resistance-zones"
          aria-label="Close chart"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1300px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
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
        href="#sr-zones-fullscreen"
        className="block lg:hidden"
        aria-label="Expand lines versus zones chart"
      >
        <div className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white">
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe to explore · tap to expand</span>
        </div>
      </a>
    </>
  );
}

/* =========================================================
   CHART 03 — ROLE REVERSAL
========================================================= */

function RoleReversalChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 600"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Resistance becoming support after breakout and retest"
    >
      <defs>
        <pattern
          id={fullscreen ? "roleGridFullEn" : "roleGridEn"}
          width="59"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M59 0 L0 0 0 60"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="1180" height="600" fill="#ffffff" />

      <rect
        width="1180"
        height="600"
        fill={`url(#${fullscreen ? "roleGridFullEn" : "roleGridEn"})`}
      />

      <rect
        x="65"
        y="324"
        width="1050"
        height="68"
        rx="10"
        fill="#f1f5f9"
        stroke="#94a3b8"
        strokeWidth="2"
      />

      <text
        x="87"
        y="310"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        OLD RESISTANCE
      </text>

      <Candle
        x={110}
        open={455}
        close={412}
        high={470}
        low={395}
        bullish
      />
      <Candle
        x={155}
        open={411}
        close={372}
        high={427}
        low={355}
        bullish
      />
      <Candle
        x={200}
        open={370}
        close={335}
        high={386}
        low={318}
        bullish
      />

      <Candle
        x={245}
        open={335}
        close={370}
        high={315}
        low={386}
        bullish={false}
      />
      <Candle
        x={290}
        open={370}
        close={416}
        high={354}
        low={433}
        bullish={false}
      />

      <Candle
        x={335}
        open={416}
        close={372}
        high={431}
        low={355}
        bullish
      />
      <Candle
        x={380}
        open={372}
        close={329}
        high={388}
        low={312}
        bullish
      />
      <Candle
        x={425}
        open={329}
        close={276}
        high={345}
        low={258}
        bullish
        width={21}
      />
      <Candle
        x={470}
        open={275}
        close={219}
        high={291}
        low={201}
        bullish
        width={21}
      />

      <rect
        x="397"
        y="176"
        width="151"
        height="30"
        rx="15"
        fill="#2563eb"
      />

      <text
        x="472"
        y="195"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        BREAKOUT
      </text>

      <Candle
        x={515}
        open={218}
        close={250}
        high={201}
        low={266}
        bullish={false}
      />
      <Candle
        x={560}
        open={249}
        close={285}
        high={233}
        low={302}
        bullish={false}
      />
      <Candle
        x={605}
        open={284}
        close={333}
        high={268}
        low={354}
        bullish={false}
        width={20}
      />

      <Candle
        x={650}
        open={334}
        close={296}
        high={358}
        low={279}
        bullish
      />
      <Candle
        x={695}
        open={295}
        close={253}
        high={311}
        low={236}
        bullish
      />
      <Candle
        x={740}
        open={252}
        close={207}
        high={268}
        low={190}
        bullish
      />
      <Candle
        x={785}
        open={206}
        close={164}
        high={222}
        low={147}
        bullish
      />
      <Candle
        x={830}
        open={163}
        close={124}
        high={179}
        low={107}
        bullish
      />
      <Candle
        x={875}
        open={125}
        close={91}
        high={109}
        low={74}
        bullish
      />

      <rect
        x="565"
        y="324"
        width="550"
        height="68"
        rx="10"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="832"
        y="426"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#1E5BB8"
      >
        OLD RESISTANCE → NEW SUPPORT
      </text>

      <circle
        cx="605"
        cy="338"
        r="10"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <line
        x1="605"
        y1="349"
        x2="605"
        y2="455"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="605"
        y="474"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        RETEST
      </text>

      <text
        x="590"
        y="552"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        BREAK → RETEST → ROLE REVERSAL → CONTINUATION
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="role-reversal-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#role-reversal"
          aria-label="Close chart"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1300px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
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
        href="#role-reversal-fullscreen"
        className="block lg:hidden"
        aria-label="Expand role reversal chart"
      >
        <div className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white">
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe to explore · tap to expand</span>
        </div>
      </a>
    </>
  );
}

/* =========================================================
   CHART 04 — BOUNCE SETUP
========================================================= */

function BounceSetupChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 620"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Support bounce setup with confirmation entry stop and target"
    >
      <defs>
        <pattern
          id={fullscreen ? "bounceGridFullEn" : "bounceGridEn"}
          width="59"
          height="62"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M59 0 L0 0 0 62"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="1180" height="620" fill="#ffffff" />

      <rect
        width="1180"
        height="620"
        fill={`url(#${fullscreen ? "bounceGridFullEn" : "bounceGridEn"})`}
      />

      {/* Target resistance */}
      <rect
        x="65"
        y="92"
        width="1050"
        height="55"
        rx="9"
        fill="#f1f5f9"
        stroke="#94a3b8"
        strokeWidth="2"
      />

      <text
        x="87"
        y="79"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        NEXT RESISTANCE / TARGET AREA
      </text>

      {/* Support zone */}
      <rect
        x="65"
        y="415"
        width="1050"
        height="75"
        rx="10"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="87"
        y="402"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        SUPPORT ZONE
      </text>

      <Candle
        x={115}
        open={173}
        close={215}
        high={157}
        low={232}
        bullish={false}
      />
      <Candle
        x={160}
        open={214}
        close={258}
        high={198}
        low={275}
        bullish={false}
      />
      <Candle
        x={205}
        open={257}
        close={300}
        high={241}
        low={317}
        bullish={false}
      />
      <Candle
        x={250}
        open={299}
        close={347}
        high={283}
        low={364}
        bullish={false}
      />
      <Candle
        x={295}
        open={346}
        close={405}
        high={330}
        low={428}
        bullish={false}
        width={21}
      />

      <Candle
        x={340}
        open={406}
        close={370}
        high={453}
        low={352}
        bullish
        width={21}
      />

      <circle
        cx="340"
        cy="423"
        r="10"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <rect
        x="275"
        y="515"
        width="132"
        height="31"
        rx="15.5"
        fill="#2563eb"
      />

      <text
        x="341"
        y="535"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        CONFIRMATION
      </text>

      <Candle
        x={388}
        open={369}
        close={326}
        high={342}
        low={383}
        bullish
        width={21}
      />
      <Candle
        x={436}
        open={325}
        close={273}
        high={255}
        low={340}
        bullish
        width={21}
      />
      <Candle
        x={484}
        open={272}
        close={218}
        high={199}
        low={287}
        bullish
        width={21}
      />
      <Candle
        x={532}
        open={217}
        close={166}
        high={148}
        low={232}
        bullish
        width={21}
      />

      <line
        x1="365"
        y1="363"
        x2="585"
        y2="363"
        stroke="#0f172a"
        strokeWidth="2"
        strokeDasharray="7 6"
      />

      <rect
        x="593"
        y="347"
        width="114"
        height="32"
        rx="16"
        fill="#0f172a"
      />

      <text
        x="650"
        y="367"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        ENTRY AREA
      </text>

      <line
        x1="260"
        y1="527"
        x2="710"
        y2="527"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="8 7"
      />

      <text
        x="723"
        y="531"
        fontSize="9"
        fontWeight="900"
        fill="#ef4444"
      >
        INVALIDATION / STOP
      </text>

      <path
        d="M565 310 C690 258 780 196 875 139"
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
        strokeDasharray="9 7"
      />

      <text
        x="890"
        y="137"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        TARGET
      </text>

      <text
        x="590"
        y="590"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        SUPPORT TEST → REJECTION → CONFIRMATION → ENTRY
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="bounce-setup-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#support-resistance-bounce"
          aria-label="Close chart"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1300px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
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
        href="#bounce-setup-fullscreen"
        className="block lg:hidden"
        aria-label="Expand support bounce setup chart"
      >
        <div className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white">
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe to explore · tap to expand</span>
        </div>
      </a>
    </>
  );
}

/* =========================================================
   CHART 05 — BREAKOUT & RETEST
========================================================= */

function BreakoutRetestChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 620"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Resistance breakout and retest as new support"
    >
      <defs>
        <pattern
          id={fullscreen ? "breakRetestGridFullEn" : "breakRetestGridEn"}
          width="59"
          height="62"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M59 0 L0 0 0 62"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="1180" height="620" fill="#ffffff" />

      <rect
        width="1180"
        height="620"
        fill={`url(#${fullscreen ? "breakRetestGridFullEn" : "breakRetestGridEn"})`}
      />

      <rect
        x="65"
        y="360"
        width="1050"
        height="68"
        rx="10"
        fill="#f1f5f9"
        stroke="#94a3b8"
        strokeWidth="2"
      />

      <text
        x="87"
        y="346"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        RESISTANCE ZONE
      </text>

      <Candle
        x={110}
        open={488}
        close={450}
        high={504}
        low={434}
        bullish
      />
      <Candle
        x={155}
        open={449}
        close={414}
        high={465}
        low={398}
        bullish
      />
      <Candle
        x={200}
        open={413}
        close={379}
        high={429}
        low={363}
        bullish
      />

      <Candle
        x={245}
        open={378}
        close={411}
        high={353}
        low={428}
        bullish={false}
      />
      <Candle
        x={290}
        open={410}
        close={454}
        high={394}
        low={471}
        bullish={false}
      />

      <Candle
        x={335}
        open={453}
        close={414}
        high={469}
        low={397}
        bullish
      />
      <Candle
        x={380}
        open={413}
        close={371}
        high={429}
        low={354}
        bullish
      />
      <Candle
        x={425}
        open={370}
        close={320}
        high={386}
        low={303}
        bullish
        width={21}
      />
      <Candle
        x={470}
        open={319}
        close={264}
        high={335}
        low={247}
        bullish
        width={21}
      />
      <Candle
        x={515}
        open={263}
        close={218}
        high={279}
        low={201}
        bullish
        width={21}
      />

      <rect
        x="428"
        y="172"
        width="150"
        height="31"
        rx="15.5"
        fill="#2563eb"
      />

      <text
        x="503"
        y="192"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        BREAKOUT
      </text>

      <Candle
        x={560}
        open={217}
        close={249}
        high={201}
        low={265}
        bullish={false}
      />
      <Candle
        x={605}
        open={248}
        close={287}
        high={232}
        low={304}
        bullish={false}
      />
      <Candle
        x={650}
        open={286}
        close={328}
        high={270}
        low={345}
        bullish={false}
      />
      <Candle
        x={695}
        open={328}
        close={375}
        high={312}
        low={401}
        bullish={false}
        width={20}
      />

      <rect
        x="625"
        y="360"
        width="490"
        height="68"
        rx="10"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <circle
        cx="695"
        cy="382"
        r="10"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <Candle
        x={740}
        open={375}
        close={332}
        high={404}
        low={315}
        bullish
      />
      <Candle
        x={785}
        open={331}
        close={281}
        high={347}
        low={264}
        bullish
      />
      <Candle
        x={830}
        open={280}
        close={229}
        high={296}
        low={212}
        bullish
      />
      <Candle
        x={875}
        open={228}
        close={179}
        high={244}
        low={162}
        bullish
      />
      <Candle
        x={920}
        open={178}
        close={137}
        high={194}
        low={120}
        bullish
      />

      <line
        x1="695"
        y1="392"
        x2="695"
        y2="492"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="695"
        y="512"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        RETEST
      </text>

      <text
        x="860"
        y="455"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#1E5BB8"
      >
        OLD RESISTANCE → NEW SUPPORT
      </text>

      <text
        x="590"
        y="576"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        BREAKOUT → RETEST → CONFIRMATION → CONTINUATION
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="breakout-retest-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#breakout-retest"
          aria-label="Close chart"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1300px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
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
        href="#breakout-retest-fullscreen"
        className="block lg:hidden"
        aria-label="Expand breakout and retest chart"
      >
        <div className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white">
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>Swipe to explore · tap to expand</span>
        </div>
      </a>
    </>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SupportAndResistanceStrategyPage() {
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
      "Support and Resistance",
      "Forex Trading",
      "Technical Analysis",
      "Price Action Trading",
      "Breakout and Retest",
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
        name: "Support and Resistance Strategy",
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
    <main className="min-h-screen bg-slate-50/40 pb-6 text-left md:pb-10">
      <SupportResistanceTypesChart fullscreen />
      <LinesVsZonesChart fullscreen />
      <RoleReversalChart fullscreen />
      <BounceSetupChart fullscreen />
      <BreakoutRetestChart fullscreen />

      <div className="mx-auto max-w-[1520px] px-3 sm:px-5 lg:px-8">
        {/* =================================================
            BREADCRUMBS
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 py-4 text-[10px] font-bold text-slate-500 sm:py-5 sm:text-[11px]"
        >
          <a href="/en" className="transition hover:text-[#1E5BB8]">
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

          <span className="text-slate-800">Support &amp; Resistance</span>
        </nav>

        {/* =================================================
            HERO — DESKTOP
        ================================================= */}

        <section className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)] lg:block">
          <div className="grid min-h-[420px] grid-cols-[0.9fr_1.1fr]">
            <div className="order-2 border-l border-slate-200">
              <div className="flex h-11 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                <span className="ml-3 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Support &amp; Resistance Analysis
                </span>
              </div>

              <SupportResistanceHeroDesktopChart />
            </div>

            <div className="order-1 flex flex-col justify-center p-9 xl:p-12">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-black text-[#1E5BB8]">
                  Trading Strategy
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                  Price Action
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                  Beginner – Intermediate
                </span>
              </div>

              <h1 className="max-w-[820px] text-[38px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950 xl:text-[46px]">
                Support and Resistance
                <span className="mt-1 block text-[#1E5BB8]">
                  Trading Strategy
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-[14px] font-medium leading-8 text-slate-600 xl:text-[15px]">
                A practical guide to identifying support and resistance zones,
                trading bounces, breakouts and retests, recognizing false
                breakouts, and planning entries, stop losses and profit targets.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Support Zone",
                  "Resistance Zone",
                  "Bounce",
                  "Breakout",
                  "Retest",
                  "False Breakout",
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
                <span>Updated September 2026</span>
                <span>•</span>
                <span>Step-by-step guide</span>
                <span>•</span>
                <span>Candlestick examples</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            HERO — MOBILE
        ================================================= */}

        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:hidden">
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[8px] font-black text-[#1E5BB8]">
                Trading Strategy
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[8px] font-black text-slate-600">
                Price Action
              </span>
            </div>

            <h1 className="mt-4 text-[27px] font-black leading-[1.15] tracking-[-0.03em] text-slate-950 sm:text-[32px]">
              Support and Resistance
              <span className="block text-[#1E5BB8]">
                Trading Strategy
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              Learn how to identify support and resistance zones and trade
              bounces, breakouts and retests with structured risk management.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                "Support",
                "Resistance",
                "Bounce",
                "Breakout",
                "Retest",
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
              Updated September 2026 · Beginner to intermediate
            </div>
          </div>

          <div className="border-t border-slate-200">
            <SupportResistanceHeroMobileChart />
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
              <SectionLabel>Introduction</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Are Support and Resistance in Trading?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Support and resistance</strong> is one of the most
                  widely used technical-analysis and price-action frameworks.
                  It focuses on identifying price areas where the market
                  previously produced a noticeable reaction and then observing
                  how price behaves when it returns.
                </p>

                <p>
                  <strong>Support</strong> is generally an area below the current
                  market where a decline previously slowed, stalled or reversed.
                  <strong> Resistance</strong> is generally an area above the
                  market where an advance previously slowed, stalled or
                  reversed.
                </p>

                <p>
                  These zones should not be treated as barriers that price must
                  respect. Support can break and resistance can break. Their
                  practical value comes from using them as{" "}
                  <strong>decision areas</strong> for entries, invalidation,
                  targets and risk management.
                </p>

                <p>
                  The same framework can support several different trading
                  models, including support and resistance bounces, breakouts,
                  breakout-and-retest setups, range trading and false-breakout
                  scenarios.
                </p>
              </div>

              <ImportantBox title="Support and resistance are probability zones, not guarantees">
                A previous reaction at a price area does not prove that the
                market will react the same way again. The strategy becomes more
                useful when the zone is combined with objective entry,
                invalidation, target and risk rules.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — SUPPORT VS RESISTANCE
          ================================================= */}

          <section
            id="support-vs-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — The Basics</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Support vs Resistance: What Is the Difference?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Support and resistance describe the same underlying idea from
                opposite sides of the market: price areas where previous
                behavior suggests that another reaction may be worth watching.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-[12px] font-black text-[#1E5BB8]">
                      S
                    </span>

                    <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                      Support
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    A price area below the market where selling pressure
                    previously slowed or a bullish reaction appeared. When
                    price returns, traders watch whether the zone produces
                    another reaction or breaks.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200 text-[12px] font-black text-slate-700">
                      R
                    </span>

                    <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                      Resistance
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    A price area above the market where buying momentum
                    previously slowed or a bearish reaction appeared. Traders
                    monitor the next test for rejection or a possible breakout.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <SupportResistanceTypesChart />
              </div>
            </div>
          </section>

          {/* =================================================
              02 — ZONES NOT PERFECT LINES
          ================================================= */}

          <section
            id="support-resistance-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — Levels vs Zones</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Should Support and Resistance Be Lines or Zones?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A common beginner mistake is drawing one exact horizontal
                  price and treating every small move through it as a breakout.
                  Real price action rarely reacts with that level of precision.
                </p>

                <p>
                  Candle wicks can move beyond an exact level before price
                  closes back inside, and separate reactions can occur at
                  slightly different prices. For that reason, many traders use{" "}
                  <strong>support and resistance zones</strong> instead of
                  relying only on a single exact number.
                </p>

                <p>
                  A zone should still remain specific. If it is drawn so wide
                  that almost any price movement falls inside it, it becomes
                  difficult to use for entry, invalidation or target planning.
                </p>
              </div>

              <div className="mt-7">
                <LinesVsZonesChart />
              </div>

              <ImportantBox title="Do not force every reaction onto one perfect line">
                If several meaningful reactions occur close together but not at
                exactly the same price, treating them as one controlled price
                zone may be more practical than constantly moving a horizontal
                line.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              03 — WHERE SUPPORT & RESISTANCE FORM
          ================================================= */}

          <section
            id="where-support-resistance-form"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — Where Levels Form</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Where Do Support and Resistance Levels Form?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                There is no single method for identifying support and
                resistance. However, some price structures are easier to
                recognize, define and test objectively than others.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Previous Swing Highs",
                    text: "A clear swing high where an advance previously stopped can become resistance when price returns.",
                  },
                  {
                    n: "02",
                    title: "Previous Swing Lows",
                    text: "A clear swing low that produced a meaningful rally can become support on a later test.",
                  },
                  {
                    n: "03",
                    title: "Range Boundaries",
                    text: "In a sideways market, the lower edge of the range may act as support while the upper edge acts as resistance.",
                  },
                  {
                    n: "04",
                    title: "Broken Levels",
                    text: "Former resistance may later become support, while broken support may be retested as resistance.",
                  },
                  {
                    n: "05",
                    title: "Psychological Prices",
                    text: "Round numbers can attract trader attention, but they should not automatically be treated as standalone trade signals.",
                  },
                  {
                    n: "06",
                    title: "Confluence Areas",
                    text: "A zone can become more relevant to a trading plan when it aligns with trend, market structure or another defined factor.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              04 — HOW TO DRAW
          ================================================= */}

          <section
            id="how-to-draw-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — Drawing the Levels</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Draw Support and Resistance Correctly
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  The goal is not to identify as many levels as possible. A
                  useful chart contains a limited number of zones that could
                  materially affect the current trading decision.
                </p>

                <p>
                  If the chart is covered with horizontal lines, almost every
                  historical reversal will appear to have occurred at an
                  important level. That can make the analysis look convincing
                  in hindsight while making it difficult to use prospectively.
                </p>
              </div>

              <div className="mt-7 space-y-3">
                {[
                  {
                    n: "01",
                    title: "Start With a Higher Timeframe",
                    text: "Identify the clearest swing highs, swing lows and major reaction areas before moving down to the execution timeframe.",
                  },
                  {
                    n: "02",
                    title: "Look for Meaningful Reactions",
                    text: "Prioritize zones that produced a noticeable rejection or directional move rather than marking every small pause.",
                  },
                  {
                    n: "03",
                    title: "Draw a Controlled Zone",
                    text: "Cover the important reaction area without making the zone so wide that it loses practical value.",
                  },
                  {
                    n: "04",
                    title: "Prioritize Obvious Structure",
                    text: "If a level requires a complicated explanation to prove that it exists, it may not be suitable for a simple repeatable strategy.",
                  },
                  {
                    n: "05",
                    title: "Remove Irrelevant Levels",
                    text: "Keep zones that remain relevant to current price structure and remove old levels that no longer influence the decision.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-[10px] font-black text-white">
                      {item.n}
                    </span>

                    <div>
                      <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <ImportantBox title="Mark the level before price reaches it">
                When backtesting, try to identify the zone before the next
                reaction is visible. This reduces hindsight bias and makes the
                test closer to a real-time trading decision.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              05 — LEVEL QUALITY
          ================================================= */}

          <section
            id="strong-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — Level Quality</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Makes a Support or Resistance Level Significant?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                There is no single formula for measuring the strength of a
                support or resistance zone. A more structured approach evaluates
                several factors instead of relying only on the number of
                touches or the age of the level.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.8fr_1.2fr_1.7fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>Factor</div>
                  <div>What to Evaluate</div>
                  <div>Why It Matters</div>
                </div>

                {[
                  [
                    "Reaction Quality",
                    "Clear rejection or directional move",
                    "A clearly defined historical reaction is easier to identify and test than random consolidation.",
                  ],
                  [
                    "Timeframe",
                    "Visibility on a higher timeframe",
                    "Higher-timeframe levels may be more prominent, but visibility does not guarantee that the zone will hold.",
                  ],
                  [
                    "Market Context",
                    "Trend or range",
                    "Resistance inside a strong uptrend may behave differently from resistance at the top of a sideways range.",
                  ],
                  [
                    "Recency",
                    "Recent versus old structure",
                    "Recent zones may be more connected to current structure, but recency alone does not guarantee reliability.",
                  ],
                  [
                    "Room to Target",
                    "Location of the next obstacle",
                    "A technically valid setup can still be unattractive if another major level sits immediately in front of the target.",
                  ],
                ].map(([factor, watch, why]) => (
                  <div
                    key={factor}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.8fr_1.2fr_1.7fr]"
                  >
                    <div className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                      {factor}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {watch}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {why}
                    </div>
                  </div>
                ))}
              </div>

              <ImportantBox title="More touches do not automatically mean a stronger level">
                Multiple reactions can make a zone visually important, but
                there is no universal rule stating that three or four touches
                make support or resistance reliable. If touch count is part of
                your strategy, define and test it objectively.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              06 — ROLE REVERSAL
          ================================================= */}

          <section
            id="role-reversal"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Role Reversal</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                When Resistance Becomes Support — and Vice Versa
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  One of the most important support and resistance concepts is{" "}
                  <strong>role reversal</strong>. After resistance breaks, price
                  may later return to the same area and react from it as support.
                </p>

                <p>
                  The opposite can happen when support breaks. A later retest
                  from below may cause the same zone to act as resistance.
                </p>

                <p>
                  A breakout does not automatically confirm the role reversal.
                  Traders still need to observe whether price can remain on the
                  new side of the area and how it behaves during the retest.
                </p>
              </div>

              <div className="mt-7">
                <RoleReversalChart />
              </div>

              <ImportantBox title="A broken level does not automatically change roles">
                Price can move back through the zone instead of respecting it
                from the opposite side. This is why many breakout strategies
                treat the retest and subsequent reaction as separate parts of
                the setup.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              07 — BOUNCE STRATEGY
          ================================================= */}

          <section
            id="support-resistance-bounce"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — Bounce Strategy</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Support and Resistance Bounce Strategy
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A bounce setup waits for price to reach a predefined support or
                resistance zone and then looks for evidence that the area is
                actually producing a reaction rather than entering simply
                because the level has been touched.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    BULLISH BOUNCE
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Buying at Support
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    Price reaches a clear support area, fails to continue lower
                    and produces the bullish reaction or confirmation required
                    by the trading plan.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    BEARISH BOUNCE
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Selling at Resistance
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    Price reaches a clear resistance area, fails to continue
                    higher and produces a bearish reaction that allows the
                    trader to define entry, invalidation and target.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <BounceSetupChart />
              </div>

              <ImportantBox title="Touching the zone is not automatically an entry signal">
                Support and resistance can break at any time. Waiting for a
                predefined confirmation does not eliminate losing trades, but
                it converts a vague assumption into a rule that can be tested.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              08 — CONFIRMATION
          ================================================= */}

          <section
            id="support-resistance-confirmation"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Entry Confirmation</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Confirm a Support or Resistance Bounce
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  There is no single confirmation method that every trader must
                  use. Some strategies enter directly at the zone, while others
                  wait for additional price action.
                </p>

                <p>
                  What matters is defining what counts as confirmation before
                  the setup occurs and applying the same rule during both
                  backtesting and live trading.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Rejection Candle",
                    text: "Price tests the zone but closes away from the extreme, leaving a visible rejection.",
                  },
                  {
                    n: "02",
                    title: "Reclaim",
                    text: "Price temporarily trades beyond the zone and then closes back on the expected side.",
                  },
                  {
                    n: "03",
                    title: "Structure Shift",
                    text: "After reacting at the zone, price breaks a nearby swing point in the direction of the setup.",
                  },
                  {
                    n: "04",
                    title: "Move Away",
                    text: "Price begins moving clearly away from the zone instead of continuing to consolidate directly inside it.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Define confirmation before you test the strategy">
                Do not use a rejection candle for one historical trade, a
                structure break for another and a reclaim for a third simply
                because each definition makes the past setup look successful.
                That introduces hindsight bias.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — BREAKOUT & RETEST
          ================================================= */}

          <section
            id="breakout-retest"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — Breakout &amp; Retest</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Support and Resistance Breakout and Retest Strategy
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Not every support and resistance strategy attempts to trade
                  the bounce. A <strong>breakout and retest strategy</strong>{" "}
                  waits for the zone to break and then looks for a continuation
                  setup after price revisits the broken area.
                </p>

                <p>
                  In a bullish setup, price breaks above resistance and trades
                  on the new side of the zone. If price later returns and former
                  resistance behaves as support, the trader can look for bullish
                  confirmation before considering an entry.
                </p>

                <p>
                  A bearish setup follows the opposite sequence after support
                  breaks and is later retested from below as potential
                  resistance.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Identify the Zone",
                    text: "Support or resistance should be defined before the breakout happens.",
                  },
                  {
                    n: "02",
                    title: "Wait for the Break",
                    text: "Price must move beyond the zone according to the strategy's breakout definition.",
                  },
                  {
                    n: "03",
                    title: "Wait for the Retest",
                    text: "Price returns to the broken area from the opposite side.",
                  },
                  {
                    n: "04",
                    title: "Require Confirmation",
                    text: "The retest must satisfy the predefined confirmation rule before entry.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[20px] border border-slate-200 bg-white p-4"
                  >
                    <span className="text-[9px] font-black text-[#1E5BB8]">
                      {item.n}
                    </span>

                    <h3 className="mt-2 text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <BreakoutRetestChart />
              </div>

              <ImportantBox title="Not every breakout produces a retest">
                Price can break a level and continue without returning to it.
                Waiting for a retest can create a more structured entry, but it
                also means some moves will occur without providing a trade. Do
                not chase price when the setup never appears.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              10 — WHAT COUNTS AS A BREAKOUT?
          ================================================= */}

          <section
            id="support-resistance-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — Defining the Breakout</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                When Is Support or Resistance Actually Broken?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  There is no universal rule that perfectly defines a confirmed
                  breakout. Some traders require a candle close beyond the
                  zone, some require follow-through and others wait for a full
                  breakout-and-retest sequence.
                </p>

                <p>
                  The breakout definition should therefore be part of the
                  strategy itself rather than something chosen after the
                  historical outcome is known.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Close Beyond the Zone",
                    text: "The strategy may require a candle to close outside the zone instead of treating every wick as a valid breakout.",
                  },
                  {
                    n: "02",
                    title: "Follow-Through",
                    text: "Watch whether price can remain outside the area or immediately falls back into the previous range.",
                  },
                  {
                    n: "03",
                    title: "Break & Retest",
                    text: "A more conservative model waits for price to revisit the broken zone and react from the opposite side.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="A wick alone is not a universal breakout rule">
                A wick can move beyond the zone and reverse, while a candle can
                close beyond the level and still fail later. The goal is not to
                predict with certainty, but to define exactly what your
                strategy considers a valid break.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              PART 1 ENDS HERE
              PART 2 CONTINUES DIRECTLY FROM THIS POINT
          ================================================= */}
                    {/* =================================================
              11 — FALSE BREAKOUT
          ================================================= */}

          <section
            id="false-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — False Breakouts</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is a False Breakout at Support or Resistance?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A <strong>false breakout</strong> occurs when price moves
                  beyond a support or resistance zone but fails to sustain the
                  move and returns toward, or back inside, the previous range.
                </p>

                <p>
                  For example, price may briefly trade above resistance,
                  attracting breakout entries, before closing back below the
                  area. The opposite can happen below support.
                </p>

                <p>
                  This does not mean every wick beyond a level is a tradable
                  false breakout. A useful strategy needs an objective
                  definition of the initial break, the failure, the reclaim and
                  the confirmation required before entry.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    FALSE BREAK ABOVE RESISTANCE
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Price Breaks Above and Falls Back
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    Price trades beyond resistance but cannot remain above the
                    zone. A return below the area may indicate that the
                    breakout attempt has failed.
                  </p>
                </div>

                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    FALSE BREAK BELOW SUPPORT
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Price Breaks Below and Reclaims
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    Price moves below support but fails to continue lower. A
                    reclaim of the zone can become part of a bullish
                    false-breakout setup.
                  </p>
                </div>
              </div>

              <ImportantBox title="A false breakout is defined by failure, not by the wick alone">
                Price moving temporarily beyond a zone does not automatically
                create a false-breakout trade. The strategy should define what
                evidence shows that the attempted breakout has actually failed.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — GENUINE VS FALSE BREAKOUT
          ================================================= */}

          <section
            id="real-vs-false-breakout"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — Breakout Quality</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Genuine Breakout vs False Breakout
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                No single candle can guarantee whether a breakout will continue
                or fail. Traders can, however, define observable differences
                that help them apply the same decision process consistently.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[1fr_1.25fr_1.25fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>Feature</div>
                  <div>Continuation Scenario</div>
                  <div>Failure Scenario</div>
                </div>

                {[
                  [
                    "Location",
                    "Price moves beyond the predefined zone.",
                    "Price trades beyond the zone but quickly returns.",
                  ],
                  [
                    "Close",
                    "The strategy's required close occurs outside the zone.",
                    "Price closes back inside or rapidly loses the breakout area.",
                  ],
                  [
                    "Follow-Through",
                    "Price continues to build structure on the new side.",
                    "The move cannot extend and begins reversing.",
                  ],
                  [
                    "Retest",
                    "The broken area may hold from the opposite side.",
                    "The level fails to establish a clear role reversal.",
                  ],
                  [
                    "Confirmation",
                    "The strategy's continuation criteria are satisfied.",
                    "The breakout criteria fail or reversal criteria appear.",
                  ],
                ].map(([feature, genuine, falseBreak]) => (
                  <div
                    key={feature}
                    className="grid gap-3 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[1fr_1.25fr_1.25fr]"
                  >
                    <div className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                      {feature}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {genuine}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {falseBreak}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              13 — MULTI-TIMEFRAME
          ================================================= */}

          <section
            id="multi-timeframe-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Multi-Timeframe Analysis</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Use Support and Resistance Across Multiple Timeframes
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Support and resistance can appear on almost every timeframe.
                  The challenge is avoiding a chart filled with overlapping
                  zones that provide conflicting information.
                </p>

                <p>
                  A practical approach is to assign each timeframe a specific
                  job. A higher timeframe can provide context and major zones,
                  while a lower timeframe can be used to refine the entry and
                  define invalidation.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    label: "CONTEXT",
                    title: "Higher Timeframe",
                    text: "Identify major structure, directional context and the most visible support and resistance areas.",
                  },
                  {
                    n: "02",
                    label: "SETUP",
                    title: "Trading Timeframe",
                    text: "Wait for price to reach the selected zone and determine whether the planned setup is developing.",
                  },
                  {
                    n: "03",
                    label: "EXECUTION",
                    title: "Lower Timeframe",
                    text: "If your rules require it, use a lower timeframe to refine confirmation, entry and invalidation.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <span className="text-[8px] font-black tracking-[0.12em] text-slate-400">
                        {item.label}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="More timeframes do not automatically improve the analysis">
                If every timeframe adds another level and another conflicting
                signal, the process can become less objective. Define which
                timeframe provides context and which one provides execution.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              14 — TREND CONTEXT
          ================================================= */}

          <section
            id="support-resistance-trend"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — Market Context</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Support and Resistance in Trending vs Ranging Markets
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                The same horizontal level can behave differently depending on
                the broader market structure. Support and resistance should
                therefore be interpreted within context rather than traded in
                isolation.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    UPTREND
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    Pullbacks Toward Support
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    In an uptrend, traders may prioritize support zones and
                    broken resistance that could act as support during
                    pullbacks.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    DOWNTREND
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    Rallies Toward Resistance
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    In a downtrend, traders may focus more heavily on resistance
                    zones and broken support that could become resistance.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    RANGE
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    Trading the Range Boundaries
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    In a defined range, the lower boundary may act as support
                    and the upper boundary as resistance until price
                    successfully breaks the structure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              15 — DYNAMIC S&R
          ================================================= */}

          <section
            id="dynamic-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — Horizontal vs Dynamic Levels</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Horizontal vs Dynamic Support and Resistance
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Most of this strategy focuses on{" "}
                  <strong>horizontal support and resistance</strong> derived
                  from previous price structure. These areas remain at a fixed
                  price unless the trader deliberately redraws them.
                </p>

                <p>
                  Traders also use the term{" "}
                  <strong>dynamic support and resistance</strong> for references
                  that change as new price data appears, such as moving
                  averages or trendlines.
                </p>

                <p>
                  The two concepts can be combined, but they should not be
                  treated as identical. A moving average is calculated from
                  price data, while a horizontal support zone is usually
                  identified from historical market structure.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <h3 className="text-[14px] font-black text-slate-950">
                    Horizontal Support &amp; Resistance
                  </h3>

                  <ul className="mt-4 space-y-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    <li>• Based on previous price reaction areas.</li>
                    <li>• Remains at a fixed price until redrawn.</li>
                    <li>• Common around swing highs, lows and ranges.</li>
                  </ul>
                </div>

                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-[14px] font-black text-slate-950">
                    Dynamic Support &amp; Resistance
                  </h3>

                  <ul className="mt-4 space-y-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    <li>• Changes as price or time changes.</li>
                    <li>• May include moving averages or trendlines.</li>
                    <li>• Often used as an additional context tool.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              16 — ENTRY MODELS
          ================================================= */}

          <section
            id="support-resistance-entry"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — Entry Models</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Three Ways to Enter a Support and Resistance Trade
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Entry style affects the distance to the stop, the number of
                missed trades and the amount of confirmation available before
                committing to a position.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Direct Zone Entry",
                    text: "An order is placed at or inside the predefined zone without waiting for additional confirmation.",
                    tradeoff:
                      "Earlier entry, but less information about whether the zone will actually hold.",
                  },
                  {
                    n: "02",
                    title: "Confirmation Entry",
                    text: "The trader waits for a rejection, reclaim or another predefined price-action signal.",
                    tradeoff:
                      "More confirmation, but entry may occur farther from the level.",
                  },
                  {
                    n: "03",
                    title: "Structure Entry",
                    text: "The trader waits for the reaction and then for a nearby market-structure change before entering.",
                    tradeoff:
                      "More selective, but some valid reactions may move away without an entry.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>

                    <div className="mt-4 border-t border-slate-200 pt-4">
                      <span className="text-[8px] font-black uppercase tracking-[0.12em] text-slate-400">
                        TRADE-OFF
                      </span>

                      <p className="mt-1.5 text-[11px] font-medium leading-6 text-slate-600 sm:text-[12px]">
                        {item.tradeoff}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              17 — STOP LOSS
          ================================================= */}

          <section
            id="support-resistance-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — Risk Control</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Where to Place a Stop Loss When Trading Support and Resistance
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A stop loss should not be placed at an arbitrary distance
                  simply because a fixed number of pips feels convenient. It
                  should relate to the point where the original trade idea is
                  considered invalid.
                </p>

                <p>
                  In a bullish support setup, invalidation may occur below the
                  support zone, below the rejection low or below another
                  predefined structural reference. In a bearish resistance
                  setup, the logic is reversed.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Beyond the Zone",
                    text: "The stop is placed outside the full support or resistance area.",
                  },
                  {
                    title: "Beyond the Swing",
                    text: "The stop uses the relevant rejection high or low as the invalidation reference.",
                  },
                  {
                    title: "Structure-Based",
                    text: "The setup is invalidated when a defined structural condition fails.",
                  },
                  {
                    title: "Risk-Based Size",
                    text: "Position size is adjusted to the stop distance rather than forcing the stop to fit the position size.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
                  >
                    <h3 className="text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Define invalidation first, then calculate position size">
                Moving the stop closer simply to increase position size can
                change the technical logic of the setup. A structured process
                identifies invalidation first and then sizes the position
                according to the amount of capital the trader is prepared to
                risk.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              18 — TAKE PROFIT
          ================================================= */}

          <section
            id="support-resistance-take-profit"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — Profit Targets</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Set Profit Targets Using Support and Resistance
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Support and resistance can help define not only entries but also
                realistic target areas. The next significant opposing zone is
                often one of the first places traders evaluate when planning a
                trade.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5">
                  <span className="text-[9px] font-black text-[#1E5BB8]">
                    METHOD 01
                  </span>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    Opposing Level
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    A long trade from support may target the next resistance
                    zone, while a short trade from resistance may target the
                    next support area.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5">
                  <span className="text-[9px] font-black text-[#1E5BB8]">
                    METHOD 02
                  </span>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    Fixed Risk-to-Reward
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    Some traders test fixed reward multiples, but the target
                    should still be evaluated against nearby market structure.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5">
                  <span className="text-[9px] font-black text-[#1E5BB8]">
                    METHOD 03
                  </span>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    Partial Exit
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    A strategy can test taking part of the position at one
                    objective and managing the remainder toward another level.
                  </p>
                </div>
              </div>

              <ImportantBox title="Check the path to the target before entering">
                A setup may look attractive at the entry but offer very little
                room before the next major opposing zone. Entry quality and
                target location should be evaluated together.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              19 — COMPLETE RULES
          ================================================= */}

          <section
            id="support-resistance-rules"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — Complete Trading Plan</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Support and Resistance Strategy: Step-by-Step Rules
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                The following framework is an educational example of how the
                concepts can be converted into a structured process. It is not
                a universal trading system and should be tested before use.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  {
                    n: "01",
                    title: "Determine Market Context",
                    text: "Identify whether price is trending, ranging or moving through unclear structure.",
                  },
                  {
                    n: "02",
                    title: "Mark Relevant Zones",
                    text: "Draw a limited number of support and resistance areas using predefined criteria.",
                  },
                  {
                    n: "03",
                    title: "Wait for Price to Reach the Zone",
                    text: "Do not create a trade before price actually interacts with the planned area.",
                  },
                  {
                    n: "04",
                    title: "Choose the Setup Type",
                    text: "Decide whether the plan is looking for a bounce, breakout and retest, or false-breakout scenario.",
                  },
                  {
                    n: "05",
                    title: "Wait for Confirmation",
                    text: "Apply the same confirmation rule defined during backtesting.",
                  },
                  {
                    n: "06",
                    title: "Define Invalidation",
                    text: "Identify exactly where the setup is considered technically wrong.",
                  },
                  {
                    n: "07",
                    title: "Define the Target",
                    text: "Evaluate the next opposing level and whether sufficient room exists for the planned trade.",
                  },
                  {
                    n: "08",
                    title: "Calculate Position Size",
                    text: "Size the position from the chosen risk amount and the distance to invalidation.",
                  },
                  {
                    n: "09",
                    title: "Record the Trade",
                    text: "Save the setup, entry, stop, target, outcome and notes for later review.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-white p-4 sm:p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-[10px] font-black text-white">
                      {item.n}
                    </span>

                    <div>
                      <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              20 — LONG EXAMPLE
          ================================================= */}

          <section
            id="support-resistance-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — Example Setup</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Example of a Support and Resistance Trade
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Consider a hypothetical bullish setup where price is
                approaching a previously identified support zone.
              </p>

              <div className="mt-7 grid gap-3 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "Context",
                    text: "The higher timeframe is not in a strong bearish structure.",
                  },
                  {
                    n: "02",
                    title: "Location",
                    text: "Price reaches a support zone marked before the reaction.",
                  },
                  {
                    n: "03",
                    title: "Confirmation",
                    text: "Price rejects the area and satisfies the predefined entry rule.",
                  },
                  {
                    n: "04",
                    title: "Invalidation",
                    text: "The stop is positioned beyond the technical failure point.",
                  },
                  {
                    n: "05",
                    title: "Target",
                    text: "The next relevant resistance area provides the planned objective.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <span className="text-[9px] font-black text-[#1E5BB8]">
                      {item.n}
                    </span>

                    <h3 className="mt-2 text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="The example explains process, not expected performance">
                A technically valid support setup can still lose. The purpose
                of a trading example is to demonstrate how the rules fit
                together, not to imply that similar setups will produce the
                same result.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              21 — COMMON MISTAKES
          ================================================= */}

          <section
            id="support-resistance-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>21 — Common Mistakes</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Common Support and Resistance Trading Mistakes
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Drawing Too Many Levels",
                    text: "When every historical high and low becomes a level, the chart loses decision-making value.",
                  },
                  {
                    n: "02",
                    title: "Treating Levels as Exact Prices",
                    text: "Small wicks through a line are often mistaken for meaningful breakouts even when price remains inside the broader zone.",
                  },
                  {
                    n: "03",
                    title: "Entering Every Touch",
                    text: "A zone is a location to evaluate a setup, not proof that price must reverse.",
                  },
                  {
                    n: "04",
                    title: "Ignoring Market Context",
                    text: "Selling every resistance level during a strong uptrend or buying every support during a strong downtrend can create repeated low-quality setups.",
                  },
                  {
                    n: "05",
                    title: "Redrawing Levels After the Move",
                    text: "Changing zones to fit historical winners creates hindsight bias and weakens backtest quality.",
                  },
                  {
                    n: "06",
                    title: "Ignoring the Next Level",
                    text: "A setup can have a logical entry but insufficient room before the next opposing support or resistance area.",
                  },
                  {
                    n: "07",
                    title: "Using No Invalidation Rule",
                    text: "Without a predefined failure point, the trader has no objective way to know when the original idea is wrong.",
                  },
                  {
                    n: "08",
                    title: "Assuming More Touches Are Always Better",
                    text: "Touch count should be tested rather than treated as a universal measure of level strength.",
                  },
                  {
                    n: "09",
                    title: "Risking Too Much on One Setup",
                    text: "Even clear support and resistance zones can fail, so individual trade risk still matters.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-slate-500 shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              22 — S&R VS SUPPLY DEMAND
          ================================================= */}

          <section
            id="support-resistance-vs-supply-demand"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>22 — Strategy Comparison</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Support and Resistance vs Supply and Demand
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Support and resistance and supply and demand can identify
                  similar areas on a chart, but the frameworks are not exactly
                  the same.
                </p>

                <p>
                  Support and resistance usually emphasizes{" "}
                  <strong>historical reaction areas</strong>, such as swing
                  highs, swing lows and range boundaries. Supply and demand
                  methods often focus more heavily on the{" "}
                  <strong>origin or base of a strong directional move</strong>.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[1fr_1.25fr_1.25fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>Feature</div>
                  <div>Support &amp; Resistance</div>
                  <div>Supply &amp; Demand</div>
                </div>

                {[
                  [
                    "Primary Focus",
                    "Historical price reactions and key levels.",
                    "Zones around the origin of meaningful directional moves.",
                  ],
                  [
                    "Typical Structure",
                    "Swing highs, swing lows and range boundaries.",
                    "Base structures followed by strong departures.",
                  ],
                  [
                    "Role Reversal",
                    "Commonly emphasizes support becoming resistance and vice versa.",
                    "Can include role changes, but zone origin is often more central.",
                  ],
                  [
                    "Overlap",
                    "A support or resistance area may also align with a supply or demand zone.",
                    "A supply or demand zone may appear at an existing support or resistance area.",
                  ],
                ].map(([feature, sr, sd]) => (
                  <div
                    key={feature}
                    className="grid gap-3 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[1fr_1.25fr_1.25fr]"
                  >
                    <div className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                      {feature}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {sr}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {sd}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/en/strategies/supply-and-demand"
                className="mt-6 flex items-center justify-between gap-4 rounded-[20px] border border-blue-200 bg-blue-50/40 p-4 transition hover:border-blue-300 hover:bg-blue-50 sm:p-5"
              >
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    RELATED GUIDE
                  </span>

                  <h3 className="mt-1 text-[13px] font-black text-slate-950 sm:text-[14px]">
                    Supply and Demand Trading Strategy
                  </h3>
                </div>

                <span className="text-lg font-black text-[#1E5BB8]">→</span>
              </a>
            </div>
          </section>

          {/* =================================================
              23 — S&R VS PRICE ACTION
          ================================================= */}

          <section
            id="support-resistance-price-action"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>23 — Price Action Context</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How Support and Resistance Fits Into Price Action Trading
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Support and resistance is often used as part of a broader{" "}
                  <strong>price action strategy</strong>. The level provides the
                  location, while the trader studies how price behaves when it
                  reaches that location.
                </p>

                <p>
                  For example, a rejection candle in the middle of an
                  unstructured chart may have little relevance to a particular
                  strategy. The same type of reaction at a predefined support
                  zone may provide useful context because location and price
                  behavior are being evaluated together.
                </p>
              </div>

              <a
                href="/en/strategies/price-action"
                className="mt-6 flex items-center justify-between gap-4 rounded-[20px] border border-slate-200 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-blue-50/40 sm:p-5"
              >
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                    LEARN NEXT
                  </span>

                  <h3 className="mt-1 text-[13px] font-black text-slate-950 sm:text-[14px]">
                    Price Action Trading Strategy
                  </h3>
                </div>

                <span className="text-lg font-black text-[#1E5BB8]">→</span>
              </a>
            </div>
          </section>

          {/* =================================================
              24 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="support-resistance-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>24 — Risk Management</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Risk Management for Support and Resistance Trading
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Support and resistance does not remove uncertainty. A strong
                looking zone can break immediately, while a weaker-looking area
                can produce a large reaction. Risk management is therefore part
                of the strategy rather than an optional addition.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Risk Per Trade",
                    text: "Define the maximum amount or percentage of capital that can be lost on one trade.",
                  },
                  {
                    title: "Position Size",
                    text: "Calculate position size from risk and stop distance instead of choosing size first.",
                  },
                  {
                    title: "Invalidation",
                    text: "Know where the setup is wrong before entering rather than deciding during the trade.",
                  },
                  {
                    title: "Execution Costs",
                    text: "Include spread, commission and possible slippage when evaluating results.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
                  >
                    <h3 className="text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="The level does not determine how much you should risk">
                A visually clear support or resistance zone can still fail.
                Risk should be controlled at the portfolio and position level,
                independently of how confident a particular setup appears.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              25 — BACKTESTING
          ================================================= */}

          <section
            id="backtest-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>25 — Testing the Strategy</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Backtest a Support and Resistance Strategy
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A useful backtest requires more than scrolling backward
                  through a chart and counting levels that produced successful
                  reversals.
                </p>

                <p>
                  The definitions used to identify a zone, trigger an entry,
                  place the stop and choose the target should be established
                  before the historical result is known.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <h3 className="text-[14px] font-black text-slate-950">
                    Define Before Testing
                  </h3>

                  <ul className="mt-4 space-y-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    <li>• What qualifies as support or resistance?</li>
                    <li>• How wide can the zone be?</li>
                    <li>• What qualifies as a valid touch?</li>
                    <li>• What counts as a breakout?</li>
                    <li>• What confirmation is required?</li>
                    <li>• Where is the stop placed?</li>
                    <li>• How is the target selected?</li>
                  </ul>
                </div>

                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-[14px] font-black text-slate-950">
                    Record During Testing
                  </h3>

                  <ul className="mt-4 space-y-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    <li>• Instrument and timeframe.</li>
                    <li>• Market context.</li>
                    <li>• Setup type.</li>
                    <li>• Entry, stop and target.</li>
                    <li>• Trading costs.</li>
                    <li>• Result in risk units.</li>
                    <li>• Screenshot and notes.</li>
                  </ul>
                </div>
              </div>

              <ImportantBox title="Avoid changing the definition after seeing the result">
                If losing setups are excluded because their zones suddenly
                appear “weak” in hindsight while winning setups are kept, the
                test no longer measures the original strategy consistently.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              26 — ADVANTAGES / LIMITATIONS
          ================================================= */}

          <section
            id="support-resistance-pros-cons"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>26 — Advantages &amp; Limitations</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Pros and Cons of Support and Resistance Trading
              </h2>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Advantages
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "Can be applied without relying on a large number of indicators.",
                      "Provides clear locations for planning entries, stops and targets.",
                      "Can be adapted to bounce, breakout and range-based strategies.",
                      "Works naturally with price action and market structure analysis.",
                      "Can be studied across different markets and timeframes.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2B6FD0]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Limitations
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "Zone selection can become subjective without precise rules.",
                      "Support and resistance frequently breaks.",
                      "False breakouts can make execution difficult.",
                      "Charts can become cluttered when too many levels are drawn.",
                      "Historical reactions do not guarantee future reactions.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              27 — WHO IS IT FOR?
          ================================================= */}

          <section
            id="who-should-use-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>27 — Trader Profile</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Who Is the Support and Resistance Strategy Suitable For?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Support and resistance is a foundational framework rather than a
                strategy limited to one trading style. It can be adapted to
                short-term and longer-term approaches when the rules are defined
                for the chosen timeframe.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Beginners",
                    text: "Useful for learning how price reacts around visible market structure.",
                  },
                  {
                    title: "Day Traders",
                    text: "Can be used to plan intraday reaction areas, range boundaries and breakout scenarios.",
                  },
                  {
                    title: "Swing Traders",
                    text: "Higher-timeframe zones can help structure entries, invalidation and multi-day targets.",
                  },
                  {
                    title: "Price Action Traders",
                    text: "Support and resistance provides location for interpreting candles and market structure.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
                  >
                    <h3 className="text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              28 — FAQ
          ================================================= */}

          <section
            id="support-resistance-faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>28 — Frequently Asked Questions</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Support and Resistance Strategy FAQ
              </h2>

              <div className="mt-7 space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group rounded-[20px] border border-slate-200 bg-slate-50/60"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-[12px] font-black leading-6 text-slate-950 sm:text-[13px]">
                          {item.question}
                        </h3>
                      </div>

                      <span className="shrink-0 text-lg font-medium text-slate-400 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 px-4 pb-5 pt-4 sm:px-5">
                      <p className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              29 — RELATED STRATEGIES
          ================================================= */}

          <section
            id="related-strategies"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>29 — Continue Learning</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Related Trading Strategies
              </h2>

              <p className="mt-4 max-w-[900px] text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Support and resistance connects naturally with price action,
                trend analysis, supply and demand, and liquidity-based trading.
                These guides can help build the broader context around the
                strategy.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    href: "/en/strategies/price-action",
                    label: "PRICE ACTION",
                    title: "Price Action Trading Strategy",
                    text: "Learn how traders analyze candles, structure and price behavior without depending heavily on indicators.",
                  },
                  {
                    href: "/en/strategies/supply-and-demand",
                    label: "PRICE ZONES",
                    title: "Supply and Demand Strategy",
                    text: "Explore how supply and demand traders identify zones around the origin of directional price moves.",
                  },
                  {
                    href: "/en/strategies/liquidity-sweep",
                    label: "LIQUIDITY",
                    title: "Liquidity Sweep Strategy",
                    text: "Learn how price can trade through obvious highs or lows and then reclaim the prior area.",
                  },
                  {
                    href: "/en/strategies/trend-following",
                    label: "TREND",
                    title: "Trend Following Strategy",
                    text: "Understand how traders structure entries in the direction of an established market trend.",
                  },
                  {
                    href: "/en/strategies/order-blocks",
                    label: "SMC",
                    title: "Order Block Trading Strategy",
                    text: "Explore order-block zones, displacement, structure and confirmation in SMC-style analysis.",
                  },
                  {
                    href: "/en/strategies/smart-money-concepts",
                    label: "MARKET STRUCTURE",
                    title: "Smart Money Concepts Strategy",
                    text: "Study liquidity, structure shifts, displacement and other concepts used within SMC frameworks.",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-[22px] border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm"
                  >
                    <div className="text-[8px] font-black uppercase tracking-[0.14em] text-[#1E5BB8]">
                      {item.label}
                    </div>

                    <div className="mt-2 flex items-start justify-between gap-3">
                      <h3 className="text-[13px] font-black leading-6 text-slate-950 sm:text-[14px]">
                        {item.title}
                      </h3>

                      <span className="shrink-0 text-base font-black text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1E5BB8]">
                        →
                      </span>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 shadow-sm">
            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-9">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-300">
                  FOREX TRADING STRATEGIES
                </div>

                <h2 className="mt-3 max-w-[800px] text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-white sm:text-[29px]">
                  Build Support and Resistance Into a Complete Trading Plan
                </h2>

                <p className="mt-4 max-w-[850px] text-[12px] font-medium leading-7 text-slate-300 sm:text-[13px] sm:leading-8">
                  Continue with our complete trading strategies library to
                  compare different approaches, timeframes and trading styles.
                </p>
              </div>

              <a
                href="/en/strategies"
                className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 text-[11px] font-black text-slate-950 transition hover:bg-slate-100"
              >
                View All Trading Strategies
                <span>→</span>
              </a>
            </div>
          </section>

          {/* =================================================
              EDUCATIONAL DISCLAIMER
          ================================================= */}

          <section className="rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-500">
                !
              </span>

              <div>
                <h2 className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                  Educational Information Only
                </h2>

                <p className="mt-2 text-[11px] font-medium leading-6 text-slate-500 sm:text-[12px] sm:leading-7">
                  This guide is provided for educational purposes only and does
                  not constitute investment advice, a recommendation, or a
                  guarantee of trading results. Forex and CFD trading involve
                  substantial risk, and losses can exceed expectations. Support
                  and resistance levels can fail, and historical price behavior
                  does not guarantee future performance. Test any trading method
                  carefully and use appropriate risk management.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>

      {/* =================================================
          STRUCTURED DATA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <style>{`
        .ob-centered-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .ob-centered-scroll::-webkit-scrollbar {
          height: 5px;
        }

        .ob-centered-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .ob-centered-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }

        @media (max-width: 639px) {
          .ob-centered-scroll {
            scroll-snap-type: x proximity;
          }
        }
      `}</style>
    </main>
  );
}