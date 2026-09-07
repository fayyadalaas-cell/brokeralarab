import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/order-blocks`;
const AR_PAGE_URL = `${BASE_URL}/strategies/order-blocks`;

const PAGE_TITLE =
  "Order Block Trading Strategy: Complete Guide";

const PAGE_DESCRIPTION =
  "Learn order block trading step by step. Discover bullish and bearish order blocks, displacement, BOS, liquidity sweeps, fair value gaps, entries, invalidation, mitigation and risk management.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: AR_PAGE_URL,
      "x-default": PAGE_URL,
    },
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    siteName: "Broker Alarab",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

/* =========================================================
   SHARED UI
========================================================= */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#1E5BB8]">
      {children}
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
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
          i
        </span>

        <div>
          <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
            {title}
          </h3>

          <div className="mt-1.5 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Candle({
  x,
  open,
  close,
  high,
  low,
  bullish,
  width = 20,
}: {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  bullish: boolean;
  width?: number;
}) {
  const bodyTop = Math.min(open, close);
  const bodyHeight = Math.max(Math.abs(close - open), 5);

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
        y={bodyTop}
        width={width}
        height={bodyHeight}
        fill={bullish ? "#ffffff" : "#475569"}
        stroke={bullish ? "#2563eb" : "#475569"}
        strokeWidth="2"
      />
    </g>
  );
}

/* =========================================================
   HERO CHART
========================================================= */

function OrderBlockHeroChart() {
  return (
    <div
      dir="ltr"
      className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>

        <span className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-400">
          Order Block Structure
        </span>
      </div>

      <svg
        viewBox="0 0 700 440"
        className="block h-auto w-full"
        role="img"
        aria-label="Bullish order block followed by displacement and break of structure"
      >
        <defs>
          <pattern
            id="heroObGridEn"
            width="50"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 44"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="700" height="440" fill="#ffffff" />
        <rect width="700" height="440" fill="url(#heroObGridEn)" />

        <line
          x1="55"
          y1="176"
          x2="535"
          y2="176"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        <text
          x="60"
          y="162"
          fontSize="9"
          fontWeight="900"
          fill="#64748b"
        >
          PREVIOUS SWING HIGH
        </text>

        <rect
          x="150"
          y="302"
          width="360"
          height="78"
          rx="9"
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <text
          x="168"
          y="326"
          fontSize="10"
          fontWeight="900"
          fill="#1E5BB8"
        >
          BULLISH ORDER BLOCK
        </text>

        <Candle
          x={95}
          open={210}
          close={245}
          high={194}
          low={261}
          bullish={false}
        />

        <Candle
          x={135}
          open={243}
          close={278}
          high={227}
          low={294}
          bullish={false}
        />

        <Candle
          x={178}
          open={276}
          close={338}
          high={260}
          low={360}
          bullish={false}
          width={23}
        />

        <Candle
          x={228}
          open={336}
          close={292}
          high={274}
          low={352}
          bullish
          width={21}
        />

        <Candle
          x={275}
          open={290}
          close={240}
          high={222}
          low={306}
          bullish
          width={21}
        />

        <Candle
          x={322}
          open={238}
          close={187}
          high={169}
          low={254}
          bullish
          width={21}
        />

        <Candle
          x={369}
          open={185}
          close={132}
          high={114}
          low={201}
          bullish
          width={21}
        />

        <Candle
          x={416}
          open={130}
          close={91}
          high={74}
          low={146}
          bullish
          width={21}
        />

        <line
          x1="318"
          y1="176"
          x2="530"
          y2="176"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <rect
          x="442"
          y="157"
          width="72"
          height="29"
          rx="14.5"
          fill="#2563eb"
        />

        <text
          x="478"
          y="176"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          BOS
        </text>

        <rect
          x="226"
          y="207"
          width="104"
          height="52"
          rx="7"
          fill="#eff6ff"
          stroke="#93c5fd"
          strokeWidth="1.5"
        />

        <text
          x="278"
          y="229"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#1E5BB8"
        >
          DISPLACEMENT
        </text>

        <text
          x="278"
          y="244"
          textAnchor="middle"
          fontSize="7"
          fontWeight="700"
          fill="#64748b"
        >
          strong expansion
        </text>

        <text
          x="350"
          y="413"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#64748b"
        >
          ORDER BLOCK → DISPLACEMENT → BREAK OF STRUCTURE
        </text>
      </svg>
    </div>
  );
}

/* =========================================================
   BULLISH / BEARISH CHART
========================================================= */

function OrderBlockTypesChart() {
  return (
    <div
      dir="ltr"
      className="ob-centered-scroll overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
    >
      <svg
        viewBox="0 0 1180 570"
        className="block h-auto w-[1060px] max-w-none sm:w-full"
        role="img"
        aria-label="Bullish and bearish order block candlestick examples"
      >
        <defs>
          <pattern
            id="obTypesGridEn"
            width="59"
            height="57"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M59 0 L0 0 0 57"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1180" height="570" fill="#ffffff" />
        <rect width="1180" height="570" fill="url(#obTypesGridEn)" />

        {/* LEFT PANEL */}

        <rect
          x="30"
          y="28"
          width="545"
          height="505"
          rx="22"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="2"
        />

        <text
          x="62"
          y="70"
          fontSize="17"
          fontWeight="900"
          fill="#0f172a"
        >
          BULLISH ORDER BLOCK
        </text>

        <text
          x="62"
          y="94"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          Last bearish candle before bullish displacement
        </text>

        <rect
          x="115"
          y="350"
          width="390"
          height="100"
          rx="10"
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <text
          x="132"
          y="375"
          fontSize="9"
          fontWeight="900"
          fill="#1E5BB8"
        >
          BULLISH OB
        </text>

        <Candle
          x={145}
          open={225}
          close={260}
          high={209}
          low={276}
          bullish={false}
        />

        <Candle
          x={188}
          open={258}
          close={299}
          high={242}
          low={315}
          bullish={false}
        />

        <Candle
          x={231}
          open={297}
          close={336}
          high={281}
          low={352}
          bullish={false}
        />

        <Candle
          x={277}
          open={334}
          close={399}
          high={318}
          low={425}
          bullish={false}
          width={25}
        />

        <line
          x1="277"
          y1="425"
          x2="277"
          y2="478"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />

        <text
          x="277"
          y="496"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#475569"
        >
          LAST BEARISH CANDLE
        </text>

        <Candle
          x={330}
          open={397}
          close={344}
          high={327}
          low={413}
          bullish
          width={22}
        />

        <Candle
          x={378}
          open={342}
          close={282}
          high={265}
          low={358}
          bullish
          width={22}
        />

        <Candle
          x={426}
          open={280}
          close={217}
          high={199}
          low={296}
          bullish
          width={22}
        />

        <Candle
          x={474}
          open={215}
          close={151}
          high={133}
          low={231}
          bullish
          width={22}
        />

        <rect
          x="362"
          y="119"
          width="137"
          height="31"
          rx="15.5"
          fill="#2563eb"
        />

        <text
          x="430"
          y="139"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          DISPLACEMENT UP
        </text>

        {/* DIVIDER */}

        <line
          x1="590"
          y1="48"
          x2="590"
          y2="515"
          stroke="#e2e8f0"
          strokeWidth="2"
        />

        {/* RIGHT PANEL */}

        <rect
          x="605"
          y="28"
          width="545"
          height="505"
          rx="22"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="2"
        />

        <text
          x="637"
          y="70"
          fontSize="17"
          fontWeight="900"
          fill="#0f172a"
        >
          BEARISH ORDER BLOCK
        </text>

        <text
          x="637"
          y="94"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          Last bullish candle before bearish displacement
        </text>

        <rect
          x="690"
          y="130"
          width="390"
          height="100"
          rx="10"
          fill="#f1f5f9"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        <text
          x="707"
          y="155"
          fontSize="9"
          fontWeight="900"
          fill="#475569"
        >
          BEARISH OB
        </text>

        <Candle
          x={720}
          open={340}
          close={300}
          high={284}
          low={356}
          bullish
        />

        <Candle
          x={763}
          open={298}
          close={257}
          high={241}
          low={314}
          bullish
        />

        <Candle
          x={806}
          open={255}
          close={215}
          high={199}
          low={271}
          bullish
        />

        <Candle
          x={852}
          open={213}
          close={158}
          high={137}
          low={229}
          bullish
          width={25}
        />

        <line
          x1="852"
          y1="137"
          x2="852"
          y2="105"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />

        <text
          x="852"
          y="98"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#475569"
        >
          LAST BULLISH CANDLE
        </text>

        <Candle
          x={905}
          open={160}
          close={216}
          high={144}
          low={233}
          bullish={false}
          width={22}
        />

        <Candle
          x={953}
          open={218}
          close={278}
          high={202}
          low={295}
          bullish={false}
          width={22}
        />

        <Candle
          x={1001}
          open={280}
          close={343}
          high={264}
          low={360}
          bullish={false}
          width={22}
        />

        <Candle
          x={1049}
          open={345}
          close={409}
          high={329}
          low={426}
          bullish={false}
          width={22}
        />

        <rect
          x="920"
          y="438"
          width="145"
          height="31"
          rx="15.5"
          fill="#0f172a"
        />

        <text
          x="992"
          y="458"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          DISPLACEMENT DOWN
        </text>
      </svg>
    </div>
  );
}

/* =========================================================
   VALID ORDER BLOCK CHART
========================================================= */

function ValidOrderBlockChart() {
  return (
    <div
      dir="ltr"
      className="ob-centered-scroll overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
    >
      <svg
        viewBox="0 0 1180 590"
        className="block h-auto w-[1060px] max-w-none sm:w-full"
        role="img"
        aria-label="Valid order block showing liquidity sweep, order block, displacement, fair value gap and break of structure"
      >
        <defs>
          <pattern
            id="validObGridEn"
            width="59"
            height="59"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M59 0 L0 0 0 59"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1180" height="590" fill="#ffffff" />
        <rect width="1180" height="590" fill="url(#validObGridEn)" />

        {/* prior low / liquidity */}

        <line
          x1="75"
          y1="390"
          x2="390"
          y2="390"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        <text
          x="82"
          y="376"
          fontSize="9"
          fontWeight="900"
          fill="#64748b"
        >
          PRIOR LOW / SELL-SIDE LIQUIDITY
        </text>

        {/* swing high */}

        <line
          x1="80"
          y1="205"
          x2="725"
          y2="205"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        <text
          x="82"
          y="191"
          fontSize="9"
          fontWeight="900"
          fill="#64748b"
        >
          PRIOR SWING HIGH
        </text>

        {/* candles before sweep */}

        <Candle
          x={120}
          open={250}
          close={287}
          high={234}
          low={303}
          bullish={false}
        />

        <Candle
          x={164}
          open={285}
          close={324}
          high={269}
          low={340}
          bullish={false}
        />

        <Candle
          x={208}
          open={322}
          close={356}
          high={306}
          low={372}
          bullish={false}
        />

        <Candle
          x={252}
          open={354}
          close={382}
          high={338}
          low={398}
          bullish={false}
        />

        {/* sweep candle */}

        <Candle
          x={300}
          open={380}
          close={348}
          high={331}
          low={435}
          bullish
          width={23}
        />

        <line
          x1="300"
          y1="435"
          x2="300"
          y2="486"
          stroke="#64748b"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />

        <rect
          x="239"
          y="487"
          width="122"
          height="30"
          rx="15"
          fill="#0f172a"
        />

        <text
          x="300"
          y="506"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          LIQUIDITY SWEEP
        </text>

        {/* OB */}

        <rect
          x="325"
          y="338"
          width="420"
          height="92"
          rx="10"
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <text
          x="344"
          y="363"
          fontSize="9"
          fontWeight="900"
          fill="#1E5BB8"
        >
          BULLISH ORDER BLOCK
        </text>

        <Candle
          x={352}
          open={347}
          close={399}
          high={331}
          low={421}
          bullish={false}
          width={24}
        />

        {/* displacement */}

        <Candle
          x={405}
          open={397}
          close={342}
          high={325}
          low={413}
          bullish
          width={22}
        />

        <Candle
          x={456}
          open={340}
          close={281}
          high={264}
          low={356}
          bullish
          width={22}
        />

        <Candle
          x={507}
          open={279}
          close={219}
          high={202}
          low={295}
          bullish
          width={22}
        />

        <Candle
          x={558}
          open={217}
          close={158}
          high={141}
          low={233}
          bullish
          width={22}
        />

        <Candle
          x={609}
          open={156}
          close={111}
          high={94}
          low={172}
          bullish
          width={22}
        />

        {/* FVG */}

        <rect
          x="445"
          y="237"
          width="115"
          height="57"
          rx="7"
          fill="#eff6ff"
          stroke="#93c5fd"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />

        <text
          x="502"
          y="260"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#1E5BB8"
        >
          FVG
        </text>

        <text
          x="502"
          y="276"
          textAnchor="middle"
          fontSize="7"
          fontWeight="700"
          fill="#64748b"
        >
          imbalance
        </text>

        {/* BOS */}

        <line
          x1="505"
          y1="205"
          x2="810"
          y2="205"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <rect
          x="650"
          y="177"
          width="118"
          height="29"
          rx="14.5"
          fill="#2563eb"
        />

        <text
          x="709"
          y="196"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          BREAK OF STRUCTURE
        </text>

        {/* return */}

        <Candle
          x={668}
          open={113}
          close={150}
          high={97}
          low={166}
          bullish={false}
        />

        <Candle
          x={712}
          open={148}
          close={196}
          high={132}
          low={212}
          bullish={false}
        />

        <Candle
          x={756}
          open={194}
          close={245}
          high={178}
          low={261}
          bullish={false}
        />

        <Candle
          x={800}
          open={243}
          close={294}
          high={227}
          low={310}
          bullish={false}
        />

        <Candle
          x={844}
          open={292}
          close={348}
          high={276}
          low={364}
          bullish={false}
        />

        <Candle
          x={888}
          open={346}
          close={390}
          high={330}
          low={409}
          bullish={false}
        />

        <circle
          cx="888"
          cy="390"
          r="11"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <line
          x1="888"
          y1="390"
          x2="888"
          y2="463"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />

        <rect
          x="827"
          y="465"
          width="122"
          height="30"
          rx="15"
          fill="#2563eb"
        />

        <text
          x="888"
          y="484"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          FIRST RETEST
        </text>

        {/* reaction */}

        <Candle
          x={938}
          open={388}
          close={342}
          high={325}
          low={405}
          bullish
          width={22}
        />

        <Candle
          x={988}
          open={340}
          close={282}
          high={265}
          low={356}
          bullish
          width={22}
        />

        <Candle
          x={1038}
          open={280}
          close={222}
          high={205}
          low={296}
          bullish
          width={22}
        />

        <text
          x="590"
          y="555"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#475569"
        >
          LIQUIDITY → ORDER BLOCK → DISPLACEMENT → FVG → BOS → RETEST
        </text>
      </svg>
    </div>
  );
}

/* =========================================================
   FRESH VS TESTED
========================================================= */

function FreshVsTestedOrderBlockChart() {
  return (
    <div
      dir="ltr"
      className="ob-centered-scroll overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
    >
      <svg
        viewBox="0 0 1180 530"
        className="block h-auto w-[1060px] max-w-none sm:w-full"
        role="img"
        aria-label="Fresh order block compared with a tested order block"
      >
        <defs>
          <pattern
            id="freshObGridEn"
            width="59"
            height="53"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M59 0 L0 0 0 53"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1180" height="530" fill="#ffffff" />
        <rect width="1180" height="530" fill="url(#freshObGridEn)" />

        {/* FRESH */}

        <rect
          x="30"
          y="25"
          width="545"
          height="475"
          rx="22"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="2"
        />

        <text
          x="62"
          y="66"
          fontSize="17"
          fontWeight="900"
          fill="#0f172a"
        >
          FRESH ORDER BLOCK
        </text>

        <text
          x="62"
          y="90"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          Price has not returned since the block formed
        </text>

        <rect
          x="95"
          y="340"
          width="410"
          height="88"
          rx="10"
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <text
          x="112"
          y="365"
          fontSize="9"
          fontWeight="900"
          fill="#1E5BB8"
        >
          ORDER BLOCK
        </text>

        <Candle
          x={140}
          open={245}
          close={281}
          high={229}
          low={297}
          bullish={false}
        />

        <Candle
          x={184}
          open={279}
          close={316}
          high={263}
          low={332}
          bullish={false}
        />

        <Candle
          x={228}
          open={314}
          close={377}
          high={298}
          low={401}
          bullish={false}
          width={24}
        />

        <Candle
          x={279}
          open={375}
          close={326}
          high={309}
          low={391}
          bullish
          width={22}
        />

        <Candle
          x={327}
          open={324}
          close={267}
          high={250}
          low={340}
          bullish
          width={22}
        />

        <Candle
          x={375}
          open={265}
          close={207}
          high={190}
          low={281}
          bullish
          width={22}
        />

        <Candle
          x={423}
          open={205}
          close={151}
          high={134}
          low={221}
          bullish
          width={22}
        />

        <rect
          x="345"
          y="111"
          width="145"
          height="31"
          rx="15.5"
          fill="#2563eb"
        />

        <text
          x="417"
          y="131"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#ffffff"
        >
          NO RETURN YET
        </text>

        {/* TESTED */}

        <rect
          x="605"
          y="25"
          width="545"
          height="475"
          rx="22"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="2"
        />

        <text
          x="637"
          y="66"
          fontSize="17"
          fontWeight="900"
          fill="#0f172a"
        >
          TESTED ORDER BLOCK
        </text>

        <text
          x="637"
          y="90"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          Price has already revisited the zone
        </text>

        <rect
          x="670"
          y="340"
          width="410"
          height="88"
          rx="10"
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <text
          x="687"
          y="365"
          fontSize="9"
          fontWeight="900"
          fill="#1E5BB8"
        >
          ORDER BLOCK
        </text>

        <Candle
          x={715}
          open={245}
          close={281}
          high={229}
          low={297}
          bullish={false}
        />

        <Candle
          x={759}
          open={279}
          close={316}
          high={263}
          low={332}
          bullish={false}
        />

        <Candle
          x={803}
          open={314}
          close={377}
          high={298}
          low={401}
          bullish={false}
          width={24}
        />

        <Candle
          x={854}
          open={375}
          close={326}
          high={309}
          low={391}
          bullish
          width={22}
        />

        <Candle
          x={902}
          open={324}
          close={267}
          high={250}
          low={340}
          bullish
          width={22}
        />

        <Candle
          x={950}
          open={265}
          close={207}
          high={190}
          low={281}
          bullish
          width={22}
        />

        <Candle
          x={998}
          open={205}
          close={165}
          high={148}
          low={221}
          bullish
          width={22}
        />

        <Candle
          x={1035}
          open={166}
          close={218}
          high={150}
          low={234}
          bullish={false}
        />

        <Candle
          x={1000}
          open={220}
          close={270}
          high={204}
          low={286}
          bullish={false}
        />

        <Candle
          x={960}
          open={272}
          close={326}
          high={256}
          low={342}
          bullish={false}
        />

        <Candle
          x={920}
          open={324}
          close={366}
          high={308}
          low={387}
          bullish={false}
        />

        <circle
          cx="920"
          cy="366"
          r="11"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <line
          x1="920"
          y1="366"
          x2="920"
          y2="455"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />

        <text
          x="920"
          y="474"
          textAnchor="middle"
          fontSize="8"
          fontWeight="900"
          fill="#475569"
        >
          FIRST TEST
        </text>
      </svg>
    </div>
  );
}

/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question: "What is an order block in trading?",
    answer:
      "In common Smart Money Concepts terminology, an order block is a price zone associated with the final opposing candle before a strong directional displacement. Traders often evaluate the move that follows the candle, including market structure, displacement and surrounding liquidity, rather than treating every opposite-colored candle as an order block.",
  },
  {
    question: "What is a bullish order block?",
    answer:
      "A bullish order block is commonly identified around the final bearish candle before a strong bullish displacement. Traders then watch the zone if price later retraces into it.",
  },
  {
    question: "What is a bearish order block?",
    answer:
      "A bearish order block is commonly identified around the final bullish candle before a strong bearish displacement. It may become a potential area of interest if price later returns to the zone.",
  },
  {
    question: "How do you identify a valid order block?",
    answer:
      "A practical approach is to look for a clearly defined opposing candle followed by decisive displacement and a meaningful structural consequence such as a break of a prior swing. Liquidity context, a fair value gap and whether the zone has already been tested may also be used as filters.",
  },
  {
    question: "Are order blocks the same as supply and demand zones?",
    answer:
      "They overlap conceptually but are not always drawn in the same way. Order block methods usually focus on a specific candle or narrow origin of displacement, while supply and demand methods may define a broader base or price area.",
  },
  {
    question: "What is the difference between an order block and a fair value gap?",
    answer:
      "An order block identifies a potential origin zone of a directional move. A fair value gap describes a three-candle price imbalance created during rapid movement. They can appear in the same setup but represent different chart concepts.",
  },
  {
    question: "What does mitigation mean in order block trading?",
    answer:
      "Mitigation commonly refers to price returning to a previously identified order block or related zone. Terminology varies between trading frameworks, so traders should define exactly what counts as a test or mitigation in their own rules.",
  },
  {
    question: "Do order blocks always work?",
    answer:
      "No. An order block is a technical-analysis concept, not a guaranteed reversal level. Price can trade through any zone, which is why invalidation rules, position sizing and risk management are essential.",
  },
];

/* =========================================================
   SCHEMA
========================================================= */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  mainEntityOfPage: PAGE_URL,
  inLanguage: "en",
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
      name: "Order Block Trading Strategy",
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

/* =========================================================
   PAGE
========================================================= */

export default function OrderBlockStrategyPage() {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-slate-50/40 pb-6 text-left text-slate-900 md:pb-10"
    >
      <div className="mx-auto max-w-[1520px] px-3 sm:px-5 lg:px-8">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="pt-4 sm:pt-6 lg:pt-8">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative flex items-center bg-gradient-to-br from-white via-white to-blue-50/50 p-5 sm:p-8 lg:p-10 xl:p-12">
                <div className="relative z-10 max-w-[800px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#1E5BB8]">
                      Trading Strategy
                    </span>

                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                      Smart Money Concepts
                    </span>
                  </div>

                  <h1 className="mt-5 text-[31px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-[42px] lg:text-[48px]">
                    Order Block Trading Strategy
                  </h1>

                  <p className="mt-5 max-w-[760px] text-[13px] font-medium leading-8 text-slate-600 sm:text-[15px] sm:leading-9">
                    A complete guide to identifying and trading bullish and
                    bearish order blocks using displacement, market structure,
                    liquidity, fair value gaps, retests, invalidation and
                    disciplined risk management.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Bullish Order Blocks",
                      "Bearish Order Blocks",
                      "BOS",
                      "Displacement",
                      "Liquidity",
                      "Fair Value Gaps",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] font-black text-slate-600 shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-[9px] font-bold text-slate-400">
                    <span>Beginner → Advanced</span>
                    <span>Educational Guide</span>
                    <span>Updated 2026</span>
                  </div>
                </div>
              </div>

              <div className="hidden border-l border-slate-200 bg-[#F8FBFF] p-6 lg:flex lg:items-center xl:p-8">
                <OrderBlockHeroChart />
              </div>
            </div>

            <div className="border-t border-slate-200 bg-[#F8FBFF] p-4 lg:hidden">
              <OrderBlockHeroChart />
            </div>
          </div>
        </section>

        {/* =================================================
            ARTICLE
        ================================================= */}

        <article className="mt-5 space-y-5 sm:mt-7 sm:space-y-7">

          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>Order Blocks Explained</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is an Order Block in Trading?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  An <strong>order block</strong> is a price zone used in
                  Smart Money Concepts and related price-action frameworks to
                  identify the origin of a strong directional move.
                </p>

                <p>
                  In its common simplified form, a{" "}
                  <strong>bullish order block</strong> is associated with the
                  final bearish candle before a strong move higher, while a{" "}
                  <strong>bearish order block</strong> is associated with the
                  final bullish candle before a strong move lower.
                </p>

                <p>
                  The candle alone, however, is not enough. Traders typically
                  examine what happened immediately after it: Was there strong
                  displacement? Did price break an important swing? Was
                  liquidity taken first? Did the move leave a Fair Value Gap?
                  Has price already returned to the zone?
                </p>

                <p>
                  Those questions separate a structured order block trading
                  strategy from simply drawing rectangles around every
                  opposite-colored candle on a chart.
                </p>
              </div>

              <ImportantBox title="An order block is a chart concept, not proof of institutional orders">
                Traders often describe order blocks as institutional footprints
                or areas containing unfilled orders. A normal price chart does
                not reveal the identity of the participants behind a candle or
                prove that unfilled institutional orders remain there. This
                guide therefore treats order blocks as testable price-action
                zones rather than guaranteed evidence of bank activity.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — CORE CONCEPT
          ================================================= */}

          <section
            id="order-block-concept"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — Core Concept</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How Does an Order Block Work?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Order block analysis starts with the move{" "}
                <strong>away from the zone</strong>, not with the rectangle
                itself. The trader first finds a meaningful expansion in price
                and then traces that move back to its origin.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Find the Origin",
                    text: "Locate the final opposing candle before the directional expansion.",
                  },
                  {
                    n: "02",
                    title: "Evaluate Displacement",
                    text: "Look for decisive expansion rather than slow, overlapping price action.",
                  },
                  {
                    n: "03",
                    title: "Check Structure",
                    text: "Determine whether the move broke a meaningful prior swing high or low.",
                  },
                  {
                    n: "04",
                    title: "Wait for the Return",
                    text: "If price revisits the zone, evaluate the retest using predefined entry and risk rules.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <OrderBlockHeroChart />
              </div>

              <ImportantBox title="Start with displacement, then work backward">
                A common beginner mistake is searching the chart for candles
                that look like order blocks. A more disciplined process is to
                identify meaningful displacement first and then examine the
                candle or base from which that move originated.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              02 — TYPES
          ================================================= */}

          <section
            id="bullish-bearish-order-blocks"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — Types</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Bullish vs Bearish Order Blocks
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                The two basic types are mirror images. The difference is the
                direction of the displacement that follows the block and the
                side of the market the trader may later look to trade.
              </p>

              <div className="mt-7">
                <OrderBlockTypesChart />
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                      BUY
                    </span>

                    <h3 className="text-sm font-black text-slate-900">
                      Bullish Order Block
                    </h3>
                  </div>

                  <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                    Commonly identified around the final bearish candle before
                    a strong bullish displacement. Traders may monitor a later
                    retracement into the zone for a potential long setup.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-slate-700 shadow-sm">
                      SELL
                    </span>

                    <h3 className="text-sm font-black text-slate-900">
                      Bearish Order Block
                    </h3>
                  </div>

                  <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                    Commonly identified around the final bullish candle before
                    strong bearish displacement. A later return may become an
                    area where traders evaluate a potential short setup.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              03 — BULLISH ORDER BLOCK
          ================================================= */}

          <section
            id="bullish-order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — Bullish Order Block</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Identify a Bullish Order Block
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A bullish order block is generally sought before a decisive
                upward expansion. Instead of marking every bearish candle
                before a rally, evaluate the complete sequence.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["01", "Locate the Move", "Find clear bullish displacement."],
                  ["02", "Find the Candle", "Trace back to the final bearish candle."],
                  ["03", "Check BOS", "See whether the move broke a meaningful swing high."],
                  ["04", "Mark the Zone", "Apply your predefined candle-boundary rule."],
                  ["05", "Monitor Retest", "Evaluate price if it later returns to the block."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-7 text-slate-600 sm:text-[12px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="A bearish candle is not automatically a bullish order block">
                The defining information is what price does after the candle.
                Without meaningful expansion or another structural criterion
                defined by your trading model, the candle may simply be normal
                price action.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              04 — BEARISH ORDER BLOCK
          ================================================= */}

          <section
            id="bearish-order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — Bearish Order Block</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Identify a Bearish Order Block
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A bearish order block uses the opposite sequence. Look for a
                strong bearish expansion and trace it back to the final bullish
                candle before the move.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["01", "Find Expansion", "Identify decisive bearish displacement."],
                  ["02", "Trace the Origin", "Locate the final bullish candle before it."],
                  ["03", "Check Structure", "Look for a meaningful swing-low break."],
                  ["04", "Define the Block", "Draw the zone using consistent boundaries."],
                  ["05", "Wait for Return", "Evaluate a short setup only if your rules align."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-7 text-slate-600 sm:text-[12px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              05 — VALID ORDER BLOCK
          ================================================= */}

          <section
            id="valid-order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — Validation</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Makes an Order Block Valid?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                There is no universal rulebook used by every order block
                trader, but several filters are commonly used to distinguish
                meaningful zones from ordinary candles.
              </p>

              <div className="mt-7">
                <ValidOrderBlockChart />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Clear Displacement",
                    text: "Price leaves the area decisively rather than drifting away through overlapping candles.",
                  },
                  {
                    n: "02",
                    title: "Structural Consequence",
                    text: "The departure breaks or meaningfully challenges a swing level defined by the strategy.",
                  },
                  {
                    n: "03",
                    title: "Liquidity Context",
                    text: "A sweep of a prior high, low or other liquidity reference may strengthen the context.",
                  },
                  {
                    n: "04",
                    title: "Fair Value Gap",
                    text: "Strong displacement may leave a three-candle imbalance that can be evaluated alongside the block.",
                  },
                  {
                    n: "05",
                    title: "Freshness",
                    text: "Whether price has already returned to the block can be recorded as part of the setup.",
                  },
                  {
                    n: "06",
                    title: "Higher-Timeframe Context",
                    text: "The block can be evaluated relative to broader structure instead of in isolation.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Confluence is a filter, not a guarantee">
                Liquidity sweeps, BOS and FVGs can help create a more specific
                setup, but stacking more labels on a chart does not make a
                trade certain. Each filter should earn its place through clear
                rules and testing.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              06 — DISPLACEMENT
          ================================================= */}

          <section
            id="order-block-displacement"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Displacement</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Why Displacement Matters in Order Block Trading
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Displacement</strong> describes a strong directional
                  expansion in price. In order block analysis, it helps answer
                  a critical question: did price actually leave the area with
                  enough force to make the origin worth studying?
                </p>

                <p>
                  Traders may look for relatively large candle bodies, limited
                  overlap between consecutive candles, rapid movement through
                  nearby levels, an imbalance or Fair Value Gap, and a break
                  of a prior structural reference.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5">
                  <h3 className="text-sm font-black text-slate-900">
                    Strong Departure
                  </h3>

                  <div className="mt-4 space-y-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    <p>• Decisive directional candles</p>
                    <p>• Reduced overlap</p>
                    <p>• Structural break</p>
                    <p>• Possible FVG / imbalance</p>
                    <p>• Clear separation from the origin</p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5">
                  <h3 className="text-sm font-black text-slate-900">
                    Weak Departure
                  </h3>

                  <div className="mt-4 space-y-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    <p>• Small overlapping candles</p>
                    <p>• Slow grind away from the area</p>
                    <p>• No meaningful structural effect</p>
                    <p>• Frequent immediate retests</p>
                    <p>• Unclear directional commitment</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              07 — MARKET STRUCTURE
          ================================================= */}

          <section
            id="order-block-market-structure"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — Market Structure</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Order Blocks, BOS and CHOCH
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Order blocks are often analyzed together with{" "}
                <strong>Break of Structure (BOS)</strong> and{" "}
                <strong>Change of Character (CHOCH)</strong>. These labels help
                traders describe what happened to the sequence of swing highs
                and swing lows after price left the block.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      OB
                    </span>
                    <h3 className="text-[12px] font-black text-slate-900">
                      Origin
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    The price area associated with the beginning of the
                    displacement leg.
                  </p>
                </div>

                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      BOS
                    </span>
                    <h3 className="text-[12px] font-black text-slate-900">
                      Continuation Evidence
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    A break through a relevant swing in the direction of the
                    prevailing structural move.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-slate-700 shadow-sm">
                      CH
                    </span>
                    <h3 className="text-[12px] font-black text-slate-900">
                      Potential Shift
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    CHOCH is commonly used to describe an early structural
                    break against the prior directional sequence.
                  </p>
                </div>
              </div>

              <ImportantBox title="Define what counts as a swing before testing">
                BOS and CHOCH become subjective if the trader changes the swing
                definition from one chart to another. A backtest should use a
                consistent method for identifying meaningful highs and lows.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              08 — LIQUIDITY + FVG
          ================================================= */}

          <section
            id="order-block-liquidity-fvg"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Confluence</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Order Blocks, Liquidity Sweeps and Fair Value Gaps
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Many Smart Money Concepts traders do not analyze an order
                  block alone. They also examine where liquidity may be
                  concentrated and whether the displacement created a{" "}
                  <strong>Fair Value Gap (FVG)</strong>.
                </p>

                <p>
                  A common bullish sequence is: price trades below a prior low,
                  reverses through a bullish order block, expands upward,
                  leaves an FVG and breaks a prior swing high. The bearish
                  version mirrors the same sequence in the opposite direction.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "Liquidity Sweep",
                    text: "Price trades through a prior high or low before reversing. Traders may use this as contextual evidence rather than automatic confirmation.",
                  },
                  {
                    title: "Order Block",
                    text: "The origin zone associated with the directional displacement becomes the area monitored on a later retracement.",
                  },
                  {
                    title: "Fair Value Gap",
                    text: "A three-candle imbalance can appear within the displacement leg and may overlap with or sit near the order block.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-[12px] font-black text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="FVG and liquidity are contextual tools">
                An order block does not become guaranteed simply because an
                FVG or liquidity sweep is nearby. The purpose of confluence is
                to create a more clearly defined and testable setup.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — FRESH VS TESTED
          ================================================= */}

          <section
            id="fresh-order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — Fresh vs Tested</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Fresh Order Blocks vs Tested Order Blocks
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A <strong>fresh order block</strong> generally means price has
                not returned to the zone since the displacement occurred. A
                tested or mitigated block has already experienced at least one
                return.
              </p>

              <div className="mt-7">
                <FreshVsTestedOrderBlockChart />
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Fresh Block",
                    text: "No return to the marked zone since its formation.",
                  },
                  {
                    n: "02",
                    title: "First Retest",
                    text: "Price reaches the block for the first time after displacement.",
                  },
                  {
                    n: "03",
                    title: "Multiple Retests",
                    text: "The zone has already been revisited more than once and should be evaluated according to tested rules.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Fresh does not mean guaranteed">
                Freshness describes the history of the zone, not its future.
                Some trading methods prioritize the first retest, but a fresh
                block can still fail immediately. Test freshness as a variable
                instead of assuming it automatically produces a stronger
                setup.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              PART 1 ENDS HERE
              PART 2 CONTINUES DIRECTLY FROM THIS POINT
          ================================================= */}
                    {/* =================================================
              10 — HOW TO DRAW ORDER BLOCKS
          ================================================= */}

          <section
            id="how-to-draw-order-blocks"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — Drawing the Zone</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Draw an Order Block Correctly
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  After identifying the candle associated with the origin of
                  displacement, the next decision is how to define the actual
                  order block zone.
                </p>

                <p>
                  Traders do not all use identical boundaries. Some mark the
                  entire high-to-low range of the candle, while others refine
                  the block using the candle body, open, midpoint or another
                  predefined boundary.
                </p>

                <p>
                  The important point is consistency. If you use the full
                  candle during one trade and switch to the body only during
                  another because the second version looks better in
                  hindsight, the strategy becomes difficult to test
                  objectively.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Full Candle Range",
                    text: "Mark the complete high-to-low range of the order block candle. This creates a wider zone and usually requires a wider invalidation distance.",
                  },
                  {
                    n: "02",
                    title: "Body-Based Zone",
                    text: "Some models use the candle body or a portion of it to create a narrower and more refined area of interest.",
                  },
                  {
                    n: "03",
                    title: "50% / Mean Threshold",
                    text: "Some traders monitor the midpoint of the order block as a refined reference inside the larger zone.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="There is no universally accepted order block boundary">
                Full-range, body-based and midpoint refinements can produce
                different entries, stop distances and trade frequencies.
                Choose a definition before testing and keep it consistent
                throughout the sample.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              11 — MULTI TIMEFRAME
          ================================================= */}

          <section
            id="order-block-timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — Multi-Timeframe Analysis</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Trade Order Blocks Across Multiple Timeframes
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Multi-timeframe order block analysis separates the broader
                market context from the execution timeframe. Instead of
                treating every block equally, traders can first identify the
                higher-timeframe structure and then refine the setup on a
                lower timeframe.
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Higher Timeframe",
                    sub: "Context",
                    text: "Identify broader structure, major liquidity references and higher-timeframe order blocks.",
                  },
                  {
                    n: "02",
                    title: "Trading Timeframe",
                    sub: "Setup",
                    text: "Wait for price to reach the area of interest and evaluate the local structure.",
                  },
                  {
                    n: "03",
                    title: "Lower Timeframe",
                    sub: "Execution",
                    text: "If required by the strategy, use lower-timeframe displacement or structure confirmation to refine entry.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <div>
                        <h3 className="text-[12px] font-black text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                          {item.sub}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="More timeframes do not automatically improve a strategy">
                Multi-timeframe analysis is useful only when each timeframe has
                a defined purpose. Constantly switching charts until a setup
                appears attractive can introduce hindsight and confirmation
                bias.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — ORDER BLOCK VS SUPPLY DEMAND
          ================================================= */}

          <section
            id="order-block-vs-supply-demand"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — Comparison</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Order Blocks vs Supply and Demand Zones
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Order blocks and supply and demand zones are closely related
                price-action concepts, but traders may define and use them
                differently.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead>
                      <tr className="bg-slate-950 text-white">
                        <th className="px-5 py-4 text-[10px] font-black">
                          Feature
                        </th>
                        <th className="px-5 py-4 text-[10px] font-black">
                          Order Block
                        </th>
                        <th className="px-5 py-4 text-[10px] font-black">
                          Supply & Demand Zone
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {[
                        [
                          "Typical Origin",
                          "Specific opposing candle or narrow origin before displacement",
                          "Broader base or area before a strong departure",
                        ],
                        [
                          "Common Framework",
                          "SMC / ICT-style terminology",
                          "Price action / supply and demand analysis",
                        ],
                        [
                          "Structure",
                          "Often evaluated with BOS, CHOCH and liquidity",
                          "Often evaluated through departure, return and zone quality",
                        ],
                        [
                          "Zone Width",
                          "Can be candle-specific and relatively narrow",
                          "May include multiple basing candles",
                        ],
                        [
                          "Entry Logic",
                          "Retest, mitigation or confirmation",
                          "Return to supply or demand plus chosen confirmation",
                        ],
                        [
                          "Core Similarity",
                          "Marks a potential origin of imbalance",
                          "Marks a potential origin of imbalance",
                        ],
                      ].map(([feature, ob, sd]) => (
                        <tr key={feature} className="bg-white">
                          <td className="px-5 py-4 text-[10px] font-black text-slate-900">
                            {feature}
                          </td>

                          <td className="px-5 py-4 text-[10px] font-medium leading-6 text-slate-600">
                            {ob}
                          </td>

                          <td className="px-5 py-4 text-[10px] font-medium leading-6 text-slate-600">
                            {sd}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ImportantBox title="The concepts can overlap">
                A bullish order block may sit inside a broader demand zone, and
                a bearish order block may sit inside a broader supply zone.
                The terminology matters less than having precise rules for
                identification, entry and invalidation.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              13 — ENTRY STRATEGIES
          ================================================= */}

          <section
            id="order-block-entry-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Entry Strategies</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                3 Ways to Enter an Order Block Trade
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Identifying an order block is only the first part of the
                strategy. Traders also need an objective rule describing
                exactly what must happen before a position is opened.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Direct Zone Entry",
                    label: "Aggressive",
                    text: "A pending order is placed at a predefined point inside the block, such as the proximal boundary or midpoint. This can provide an early entry but offers less confirmation that the zone will hold.",
                  },
                  {
                    n: "02",
                    title: "Confirmation Entry",
                    label: "Balanced",
                    text: "Price first enters the block. The trader then waits for predefined evidence such as lower-timeframe displacement, rejection or a structural shift before entering.",
                  },
                  {
                    n: "03",
                    title: "Break-and-Retest Entry",
                    label: "Conservative",
                    text: "After price reacts from the block, the trader waits for local structure to break and then looks for a retest before execution. This adds confirmation but may produce a later entry.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                          {item.n}
                        </span>

                        <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                          {item.title}
                        </h3>
                      </div>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.1em] text-slate-500">
                        {item.label}
                      </span>
                    </div>

                    <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Entry method changes the statistics of the strategy">
                A direct limit entry, midpoint entry and confirmation entry can
                produce very different fill rates, stop distances, reward-to-risk
                ratios and win rates. Backtest each method separately.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              14 — STOP LOSS + TARGET
          ================================================= */}

          <section
            id="order-block-stop-loss-take-profit"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — Trade Management</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Order Block Stop Loss and Take Profit
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A complete order block strategy needs a predefined invalidation
                point and target methodology before entry. The zone should not
                be treated as a reason to remain in a trade indefinitely.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-slate-700 shadow-sm">
                      SL
                    </span>

                    <h3 className="text-sm font-black text-slate-900">
                      Stop-Loss Placement
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3 text-[10px] font-medium leading-6 text-slate-600">
                    <p>
                      <strong className="text-slate-900">Bullish OB:</strong>{" "}
                      invalidation may be defined below the far edge of the
                      bullish block.
                    </p>

                    <p>
                      <strong className="text-slate-900">Bearish OB:</strong>{" "}
                      invalidation may be defined above the far edge of the
                      bearish block.
                    </p>

                    <p>
                      A small predefined buffer can be tested where spreads,
                      volatility or instrument characteristics justify it.
                    </p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      TP
                    </span>

                    <h3 className="text-sm font-black text-slate-900">
                      Take-Profit Ideas
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3 text-[10px] font-medium leading-6 text-slate-600">
                    <p>• Previous swing high or swing low</p>
                    <p>• Opposing liquidity reference</p>
                    <p>• Higher-timeframe supply or demand</p>
                    <p>• Opposing order block</p>
                    <p>• Predefined R-multiple target</p>
                  </div>
                </div>
              </div>

              <ImportantBox title="Do not force a reward-to-risk ratio onto every setup">
                A visually attractive ratio does not create an edge by itself.
                Define logical invalidation first, measure the available target
                and then decide whether the trade meets your minimum criteria.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              15 — BULLISH EXAMPLE
          ================================================= */}

          <section
            id="bullish-order-block-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — Bullish Example</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Bullish Order Block Trade Example
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                The chart below shows a simplified bullish setup: price forms
                an order block, displaces upward through structure, returns to
                the block and then produces a reaction.
              </p>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 590"
                  className="block h-auto w-[1060px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Bullish order block trading example with entry stop loss and target"
                >
                  <defs>
                    <pattern
                      id="bullTradeGridEn"
                      width="59"
                      height="59"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 59"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="590" fill="#ffffff" />
                  <rect width="1180" height="590" fill="url(#bullTradeGridEn)" />

                  <rect
                    x="210"
                    y="385"
                    width="590"
                    height="90"
                    rx="10"
                    fill="#dbeafe"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  <text
                    x="230"
                    y="410"
                    fontSize="10"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    BULLISH ORDER BLOCK
                  </text>

                  <line
                    x1="80"
                    y1="220"
                    x2="660"
                    y2="220"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />

                  <text
                    x="85"
                    y="205"
                    fontSize="9"
                    fontWeight="900"
                    fill="#64748b"
                  >
                    PREVIOUS SWING HIGH
                  </text>

                  <Candle x={120} open={260} close={295} high={244} low={311} bullish={false} />
                  <Candle x={165} open={293} close={333} high={277} low={349} bullish={false} />
                  <Candle x={210} open={331} close={370} high={315} low={386} bullish={false} />
                  <Candle x={260} open={368} close={425} high={352} low={449} bullish={false} width={24} />

                  <Candle x={315} open={423} close={367} high={350} low={439} bullish width={22} />
                  <Candle x={365} open={365} close={305} high={288} low={381} bullish width={22} />
                  <Candle x={415} open={303} close={243} high={226} low={319} bullish width={22} />
                  <Candle x={465} open={241} close={181} high={164} low={257} bullish width={22} />
                  <Candle x={515} open={179} close={136} high={119} low={195} bullish width={22} />

                  <line
                    x1="410"
                    y1="220"
                    x2="630"
                    y2="220"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <rect
                    x="530"
                    y="199"
                    width="72"
                    height="29"
                    rx="14.5"
                    fill="#2563eb"
                  />

                  <text
                    x="566"
                    y="218"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BOS
                  </text>

                  <Candle x={575} open={138} close={176} high={122} low={192} bullish={false} />
                  <Candle x={620} open={174} close={225} high={158} low={241} bullish={false} />
                  <Candle x={665} open={223} close={278} high={207} low={294} bullish={false} />
                  <Candle x={710} open={276} close={335} high={260} low={351} bullish={false} />
                  <Candle x={755} open={333} close={401} high={317} low={423} bullish={false} />

                  <circle
                    cx="755"
                    cy="401"
                    r="11"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <line
                    x1="755"
                    y1="401"
                    x2="755"
                    y2="505"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />

                  <text
                    x="755"
                    y="524"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#1E5BB8"
                  >
                    ENTRY AREA
                  </text>

                  <Candle x={810} open={399} close={346} high={329} low={415} bullish width={22} />
                  <Candle x={860} open={344} close={286} high={269} low={360} bullish width={22} />
                  <Candle x={910} open={284} close={225} high={208} low={300} bullish width={22} />
                  <Candle x={960} open={223} close={164} high={147} low={239} bullish width={22} />

                  <line
                    x1="700"
                    y1="490"
                    x2="1030"
                    y2="490"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <text
                    x="1020"
                    y="482"
                    textAnchor="end"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    INVALIDATION / STOP AREA
                  </text>

                  <line
                    x1="820"
                    y1="125"
                    x2="1060"
                    y2="125"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <text
                    x="1050"
                    y="113"
                    textAnchor="end"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    POTENTIAL TARGET / LIQUIDITY
                  </text>
                </svg>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-4">
                {[
                  ["01", "Formation", "Bearish candle forms before bullish expansion."],
                  ["02", "Confirmation", "Displacement breaks a prior swing high."],
                  ["03", "Retest", "Price later returns to the bullish block."],
                  ["04", "Execution", "Entry and risk are applied according to the chosen model."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600 sm:text-[12px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              16 — BEARISH EXAMPLE
          ================================================= */}

          <section
            id="bearish-order-block-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — Bearish Example</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Bearish Order Block Trade Example
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A bearish setup reverses the logic. Price forms a bullish
                candle near the origin of a bearish displacement, breaks lower
                through structure and later retraces toward the block.
              </p>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 590"
                  className="block h-auto w-[1060px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Bearish order block trading example with entry stop loss and target"
                >
                  <defs>
                    <pattern
                      id="bearTradeGridEn"
                      width="59"
                      height="59"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 59"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="590" fill="#ffffff" />
                  <rect width="1180" height="590" fill="url(#bearTradeGridEn)" />

                  <rect
                    x="210"
                    y="115"
                    width="590"
                    height="90"
                    rx="10"
                    fill="#f1f5f9"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  <text
                    x="230"
                    y="141"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    BEARISH ORDER BLOCK
                  </text>

                  <line
                    x1="80"
                    y1="365"
                    x2="660"
                    y2="365"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />

                  <text
                    x="85"
                    y="350"
                    fontSize="9"
                    fontWeight="900"
                    fill="#64748b"
                  >
                    PREVIOUS SWING LOW
                  </text>

                  <Candle x={120} open={330} close={292} high={276} low={346} bullish />
                  <Candle x={165} open={290} close={250} high={234} low={306} bullish />
                  <Candle x={210} open={248} close={207} high={191} low={264} bullish />
                  <Candle x={260} open={205} close={150} high={128} low={221} bullish width={24} />

                  <Candle x={315} open={152} close={209} high={136} low={225} bullish={false} width={22} />
                  <Candle x={365} open={211} close={270} high={195} low={286} bullish={false} width={22} />
                  <Candle x={415} open={272} close={332} high={256} low={348} bullish={false} width={22} />
                  <Candle x={465} open={334} close={394} high={318} low={410} bullish={false} width={22} />
                  <Candle x={515} open={396} close={441} high={380} low={457} bullish={false} width={22} />

                  <line
                    x1="410"
                    y1="365"
                    x2="630"
                    y2="365"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <rect
                    x="530"
                    y="346"
                    width="72"
                    height="29"
                    rx="14.5"
                    fill="#0f172a"
                  />

                  <text
                    x="566"
                    y="365"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BOS
                  </text>

                  <Candle x={575} open={439} close={402} high={386} low={455} bullish />
                  <Candle x={620} open={400} close={350} high={334} low={416} bullish />
                  <Candle x={665} open={348} close={295} high={279} low={364} bullish />
                  <Candle x={710} open={293} close={238} high={222} low={309} bullish />
                  <Candle x={755} open={236} close={178} high={158} low={252} bullish />

                  <circle
                    cx="755"
                    cy="178"
                    r="11"
                    fill="#ffffff"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  <line
                    x1="755"
                    y1="178"
                    x2="755"
                    y2="79"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />

                  <text
                    x="755"
                    y="68"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    ENTRY AREA
                  </text>

                  <Candle x={810} open={180} close={232} high={164} low={248} bullish={false} width={22} />
                  <Candle x={860} open={234} close={292} high={218} low={308} bullish={false} width={22} />
                  <Candle x={910} open={294} close={353} high={278} low={369} bullish={false} width={22} />
                  <Candle x={960} open={355} close={414} high={339} low={430} bullish={false} width={22} />

                  <line
                    x1="700"
                    y1="96"
                    x2="1030"
                    y2="96"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <text
                    x="1020"
                    y="85"
                    textAnchor="end"
                    fontSize="8"
                    fontWeight="900"
                    fill="#475569"
                  >
                    INVALIDATION / STOP AREA
                  </text>

                  <line
                    x1="820"
                    y1="475"
                    x2="1060"
                    y2="475"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />

                  <text
                    x="1050"
                    y="495"
                    textAnchor="end"
                    fontSize="8"
                    fontWeight="900"
                    fill="#2563eb"
                  >
                    POTENTIAL TARGET / LIQUIDITY
                  </text>
                </svg>
              </div>
            </div>
          </section>

          {/* =================================================
              17 — MITIGATION
          ================================================= */}

          <section
            id="order-block-mitigation"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — Mitigation</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is Order Block Mitigation?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  In order block terminology, <strong>mitigation</strong>{" "}
                  commonly describes price returning to a previously identified
                  block or origin zone after the initial displacement.
                </p>

                <p>
                  Depending on the framework, traders may describe the first
                  return as mitigation and then evaluate whether price reacts
                  from the block, trades deeply through it or invalidates it
                  completely.
                </p>

                <p>
                  Because terminology varies between SMC and ICT-style
                  approaches, the safest way to use mitigation in a trading
                  plan is to define exactly what constitutes a touch, a valid
                  reaction and an invalidation.
                </p>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Formation",
                    text: "The block forms before meaningful displacement.",
                  },
                  {
                    n: "02",
                    title: "Return",
                    text: "Price later retraces into the previously marked zone.",
                  },
                  {
                    n: "03",
                    title: "Reaction or Failure",
                    text: "The trader observes whether the block produces the reaction required by the strategy.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
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
              18 — BREAKER BLOCK
          ================================================= */}

          <section
            id="breaker-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — Breaker Blocks</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is a Breaker Block?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A <strong>breaker block</strong> is commonly described as an
                  order block that fails and later becomes relevant from the
                  opposite side of the market.
                </p>

                <p>
                  For example, if a bearish order block is decisively broken
                  upward, the failed zone may later be monitored as potential
                  support when price retraces toward it. The bearish thesis has
                  failed, and the same price area is now being evaluated in a
                  different structural context.
                </p>
              </div>

              <div
                dir="ltr"
                className="mt-7 overflow-x-auto rounded-[24px] border border-slate-200 bg-white"
              >
                <svg
                  viewBox="0 0 1180 540"
                  className="block h-auto w-[1060px] max-w-none sm:w-full"
                  role="img"
                  aria-label="Breaker block showing failed bearish order block, breakout and bullish retest"
                >
                  <defs>
                    <pattern
                      id="breakerGridEn"
                      width="59"
                      height="54"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M59 0 L0 0 0 54"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>

                  <rect width="1180" height="540" fill="#ffffff" />
                  <rect width="1180" height="540" fill="url(#breakerGridEn)" />

                  <rect
                    x="215"
                    y="235"
                    width="660"
                    height="92"
                    rx="10"
                    fill="#eef2f7"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  <text
                    x="235"
                    y="260"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    ORIGINAL BEARISH ORDER BLOCK
                  </text>

                  <Candle x={120} open={390} close={345} high={329} low={406} bullish />
                  <Candle x={165} open={343} close={300} high={284} low={359} bullish />
                  <Candle x={210} open={298} close={257} high={241} low={314} bullish />
                  <Candle x={255} open={255} close={286} high={232} low={302} bullish={false} />
                  <Candle x={300} open={284} close={329} high={268} low={345} bullish={false} />
                  <Candle x={345} open={327} close={371} high={311} low={387} bullish={false} />

                  <Candle x={400} open={369} close={318} high={301} low={385} bullish />
                  <Candle x={450} open={316} close={264} high={247} low={332} bullish />
                  <Candle x={500} open={262} close={210} high={193} low={278} bullish />
                  <Candle x={550} open={208} close={156} high={139} low={224} bullish />

                  <rect
                    x="487"
                    y="110"
                    width="128"
                    height="31"
                    rx="15.5"
                    fill="#2563eb"
                  />

                  <text
                    x="551"
                    y="130"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BLOCK FAILURE
                  </text>

                  <Candle x={610} open={158} close={194} high={142} low={210} bullish={false} />
                  <Candle x={655} open={192} close={229} high={176} low={245} bullish={false} />
                  <Candle x={700} open={227} close={267} high={211} low={283} bullish={false} />

                  <circle
                    cx="700"
                    cy="267"
                    r="11"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />

                  <line
                    x1="700"
                    y1="267"
                    x2="700"
                    y2="383"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />

                  <rect
                    x="637"
                    y="385"
                    width="126"
                    height="31"
                    rx="15.5"
                    fill="#2563eb"
                  />

                  <text
                    x="700"
                    y="405"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    BREAKER RETEST
                  </text>

                  <Candle x={755} open={265} close={219} high={202} low={281} bullish />
                  <Candle x={805} open={217} close={168} high={151} low={233} bullish />
                  <Candle x={855} open={166} close={119} high={102} low={182} bullish />
                  <Candle x={905} open={117} close={84} high={67} low={133} bullish />

                  <text
                    x="590"
                    y="492"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="900"
                    fill="#475569"
                  >
                    FAILED ORDER BLOCK → BREAKOUT → RETEST → ROLE REVERSAL
                  </text>
                </svg>
              </div>

              <ImportantBox title="A failed order block does not automatically become a useful breaker">
                The strategy still needs rules defining what counts as a
                decisive failure, whether structure changed and what must occur
                during the later retest.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              19 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="order-block-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — Risk Management</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Risk Management for Order Block Trading
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Order blocks can fail like any other technical setup. Risk
                management therefore matters more than finding a visually
                perfect rectangle.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Define Risk First",
                    text: "Decide the maximum account risk before calculating position size.",
                  },
                  {
                    n: "02",
                    title: "Use Invalidation",
                    text: "Place risk around a predefined structural invalidation rather than an arbitrary cash amount.",
                  },
                  {
                    n: "03",
                    title: "Adjust Position Size",
                    text: "A wider stop should normally mean a smaller position if account risk is held constant.",
                  },
                  {
                    n: "04",
                    title: "Track the Sample",
                    text: "Evaluate expectancy across many trades instead of judging the method by one result.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="A strong setup can still lose">
                No combination of order block, liquidity, FVG, BOS or
                multi-timeframe confluence removes uncertainty. Position sizing
                should assume that any individual trade can fail.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              20 — COMMON MISTAKES
          ================================================= */}

          <section
            id="order-block-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — Common Mistakes</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                8 Common Order Block Trading Mistakes
              </h2>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {[
                  {
                    n: "01",
                    title: "Marking Every Opposite Candle",
                    text: "An opposite-colored candle without meaningful displacement or structural context is not automatically useful.",
                  },
                  {
                    n: "02",
                    title: "Ignoring Market Structure",
                    text: "A block viewed without swing structure can look convincing while sitting in poor context.",
                  },
                  {
                    n: "03",
                    title: "Entering Before Price Returns",
                    text: "Anticipating a retest before it occurs can turn a zone-based strategy into an unrelated momentum trade.",
                  },
                  {
                    n: "04",
                    title: "Changing Zone Boundaries",
                    text: "Moving the block after seeing subsequent candles introduces hindsight into the analysis.",
                  },
                  {
                    n: "05",
                    title: "Ignoring Previous Tests",
                    text: "If freshness is part of the strategy, previously tested zones must be recorded consistently.",
                  },
                  {
                    n: "06",
                    title: "Using Extremely Tight Stops",
                    text: "A stop chosen only to manufacture a larger reward-to-risk ratio may sit inside normal price noise.",
                  },
                  {
                    n: "07",
                    title: "Overloading the Chart",
                    text: "Too many blocks, FVGs, liquidity lines and structure labels can make decision rules less clear rather than more precise.",
                  },
                  {
                    n: "08",
                    title: "Skipping Backtesting",
                    text: "A visually convincing chart example does not establish that the strategy has positive expectancy.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
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
              21 — BACKTESTING
          ================================================= */}

          <section
            id="backtest-order-block-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>21 — Backtesting</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Backtest an Order Block Strategy
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Order blocks contain subjective terms such as{" "}
                <strong>strong displacement</strong>,{" "}
                <strong>meaningful swing</strong> and{" "}
                <strong>clean reaction</strong>. Backtesting requires converting
                those descriptions into rules that can be applied repeatedly.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Choose the Market",
                    text: "Test one instrument or clearly defined group rather than mixing unrelated markets without tracking them separately.",
                  },
                  {
                    n: "02",
                    title: "Choose the Timeframe",
                    text: "Record the exact timeframe used for block formation and execution.",
                  },
                  {
                    n: "03",
                    title: "Define Displacement",
                    text: "Specify what measurable conditions distinguish an impulsive move from normal price movement.",
                  },
                  {
                    n: "04",
                    title: "Define the Zone",
                    text: "Choose full candle, body, midpoint or another fixed boundary before viewing the result.",
                  },
                  {
                    n: "05",
                    title: "Define Entry & Exit",
                    text: "Document the exact entry trigger, invalidation, target and trade-management rules.",
                  },
                  {
                    n: "06",
                    title: "Replay Forward",
                    text: "Use bar-by-bar replay where possible so future price action is hidden during identification.",
                  },
                  {
                    n: "07",
                    title: "Record Every Setup",
                    text: "Log winners, losers, missed trades and invalidated blocks instead of keeping only attractive examples.",
                  },
                  {
                    n: "08",
                    title: "Include Trading Costs",
                    text: "Spread, commission and slippage can materially change the result of short-term strategies.",
                  },
                  {
                    n: "09",
                    title: "Review the Data",
                    text: "Measure win rate, average win, average loss, expectancy, drawdown and performance by setup type.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-[22px] border border-slate-200 bg-slate-950 p-5 sm:p-6">
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-300">
                  Example Rule Framework
                </p>

                <div className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
                  {[
                    ["Order Block", "Last opposing candle before qualifying displacement"],
                    ["Structure", "Move must break the predefined swing reference"],
                    ["Zone", "Full candle high-to-low"],
                    ["Entry", "First return into the zone"],
                    ["Invalidation", "Beyond the far edge of the block"],
                    ["Target", "Predefined liquidity or R-multiple"],
                    ["Freshness", "One trade permitted per fresh zone"],
                    ["Costs", "Spread + commission + realistic slippage"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-4 border-b border-white/10 py-2"
                    >
                      <span className="text-[9px] font-black text-white">
                        {label}
                      </span>

                      <span className="max-w-[65%] text-right text-[9px] font-medium leading-5 text-slate-300">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <ImportantBox title="Avoid hindsight when testing order blocks">
                Finished charts make successful blocks easy to spot because the
                future move is already visible. Forward replay helps reduce
                this problem by forcing you to identify the setup before seeing
                what happens next.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              22 — BEGINNER ROADMAP
          ================================================= */}

          <section
            id="order-block-beginner-guide"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>22 — Beginner Roadmap</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Learn Order Block Trading Step by Step
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Beginners usually learn faster when each concept is added in
                sequence rather than trying to identify every Smart Money
                Concept on the chart at once.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["01", "Structure", "Learn swing highs, swing lows and directional structure."],
                  ["02", "Displacement", "Learn to distinguish expansion from ordinary movement."],
                  ["03", "Order Blocks", "Practice locating the origin candle consistently."],
                  ["04", "Retests", "Study how price behaves when it returns to marked zones."],
                  ["05", "Testing", "Create one fixed ruleset and collect a meaningful sample."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600 sm:text-[12px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              23 — CHECKLIST
          ================================================= */}

          <section
            id="order-block-checklist"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>23 — Trading Checklist</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Order Block Trading Checklist
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Before considering an order block setup, use a fixed checklist
                to reduce impulsive decisions and keep your analysis
                repeatable.
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {[
                  "Is the broader market structure clearly defined?",
                  "Is there meaningful displacement away from the block?",
                  "Did the move affect or break a relevant swing level?",
                  "Is the order block boundary defined using the same rule as previous trades?",
                  "Has the block already been tested or mitigated?",
                  "Is there relevant liquidity context around the setup?",
                  "Did displacement leave an FVG if your model requires one?",
                  "Is the entry method defined before price reaches the zone?",
                  "Is invalidation clearly defined?",
                  "Is the target logical relative to structure or liquidity?",
                  "Does the position size respect the account-risk rule?",
                  "Does the setup match the exact rules used in your backtest?",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="pt-0.5 text-[10px] font-semibold leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              24 — FAQ
          ================================================= */}

          <section
            id="order-block-faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>24 — FAQ</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Order Block Trading FAQ
              </h2>

              <p className="mt-4 max-w-[950px] text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Quick answers to common questions about bullish and bearish
                order blocks, validity, Fair Value Gaps, mitigation and order
                block trading strategies.
              </p>

              <div className="mt-7 space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group rounded-[20px] border border-slate-200 bg-slate-50/40"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-[11px] font-black leading-6 text-slate-900 sm:text-[12px]">
                          {item.question}
                        </h3>
                      </div>

                      <span className="text-lg font-light text-slate-400 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 px-4 pb-5 pt-4 sm:px-5">
                      <p className="text-[10px] font-medium leading-7 text-slate-600 sm:text-[11px]">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              25 — SUMMARY
          ================================================= */}

          <section
            id="order-block-summary"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>25 — Key Takeaways</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-white sm:text-[29px]">
                Order Block Trading Strategy Summary
              </h2>

              <p className="mt-4 max-w-[1050px] text-[12px] font-medium leading-8 text-slate-300 sm:text-[14px] sm:leading-9">
                Order block trading becomes more useful when the block is
                treated as one component of a complete process rather than a
                standalone rectangle that predicts reversals.
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "A bullish order block is commonly associated with the final bearish candle before bullish displacement.",
                  "A bearish order block is commonly associated with the final bullish candle before bearish displacement.",
                  "Displacement and structural consequence help distinguish meaningful origins from ordinary candles.",
                  "Liquidity sweeps and Fair Value Gaps can provide additional context but do not guarantee a reaction.",
                  "Freshness, mitigation and repeated tests should be defined consistently in the trading rules.",
                  "Entry, stop-loss and target rules should be determined before the outcome is visible.",
                  "Breaker blocks describe a failed block that may later become relevant from the opposite side.",
                  "Higher-timeframe context can be separated from lower-timeframe execution.",
                  "Backtesting is required to determine whether a specific order block ruleset has demonstrated an edge.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-[9px] font-black text-blue-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[10px] font-medium leading-6 text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              RELATED CONCEPTS
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>Continue Learning</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Concepts to Study Alongside Order Blocks
              </h2>

              <p className="mt-4 max-w-[950px] text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                Order blocks become easier to evaluate when you understand the
                market-structure and price-action concepts that surround them.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Market Structure",
                    text: "Swing highs, swing lows, trends and structural breaks.",
                  },
                  {
                    title: "Liquidity",
                    text: "Prior highs, lows and other references traders monitor for liquidity.",
                  },
                  {
                    title: "Fair Value Gaps",
                    text: "Three-candle imbalances created during rapid price displacement.",
                  },
                  {
                    title: "Supply & Demand",
                    text: "Broader price zones associated with strong departures and later returns.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <h3 className="text-[13px] font-black text-slate-900 sm:text-[14px]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[30px] border border-blue-200 bg-gradient-to-br from-[#0f172a] via-[#111c32] to-[#123d78] shadow-sm">
            <div className="grid items-center gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.14em] text-blue-200">
                  Broker Alarab Trading Education
                </span>

                <h2 className="mt-4 max-w-[850px] text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-white sm:text-[31px]">
                  Build a Trading Process, Not Just a Chart Pattern
                </h2>

                <p className="mt-4 max-w-[850px] text-[11px] font-medium leading-7 text-slate-300 sm:text-[12px] sm:leading-8">
                  Explore trading strategies, broker comparisons, educational
                  guides and trading tools designed to help you research the
                  market and make more informed decisions.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href="/en/strategies"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-5 py-3 text-[10px] font-black text-slate-950 transition hover:bg-slate-100"
                >
                  Explore Strategies
                </a>

                <a
                  href="/en/brokers"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-[10px] font-black text-white transition hover:bg-white/15"
                >
                  Compare Brokers
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <section className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
              Educational Disclaimer
            </p>

            <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              This guide is provided for educational and informational
              purposes only and does not constitute investment advice,
              financial advice or a recommendation to buy or sell any
              financial instrument. Order blocks and other technical-analysis
              concepts can fail. Leveraged trading involves substantial risk,
              and past market behavior does not guarantee future results.
              Always conduct your own research and apply appropriate risk
              management.
            </p>
          </section>
        </article>

        {/* ===================================================
            STRUCTURED DATA
        =================================================== */}

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
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .ob-centered-scroll {
              scrollbar-width: thin;
              scrollbar-color: #cbd5e1 transparent;
            }

            .ob-centered-scroll::-webkit-scrollbar {
              height: 6px;
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
                scroll-behavior: smooth;
              }
            }
          `,
        }}
      />
    </main>
  );
}