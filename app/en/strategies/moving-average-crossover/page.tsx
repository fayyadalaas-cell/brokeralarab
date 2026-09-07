import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/strategies/moving-average-crossover`;
const AR_PAGE_URL = `${BASE_URL}/strategies/moving-average-crossover`;

const PAGE_TITLE =
  "Moving Average Crossover Strategy: Complete Trading Guide";

const PAGE_DESCRIPTION =
  "Learn the Moving Average Crossover strategy step by step: fast vs slow moving averages, SMA vs EMA, bullish and bearish crossovers, common settings, Golden Cross, Death Cross, whipsaws, entries, exits and risk management.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "moving average crossover",
    "moving average crossover strategy",
    "moving average strategy",
    "moving average trading strategy",
    "forex moving average crossover",
    "forex moving average strategy",
    "EMA crossover strategy",
    "SMA crossover strategy",
    "fast moving average",
    "slow moving average",
    "bullish moving average crossover",
    "bearish moving average crossover",
    "moving average crossover trading",
    "how to trade moving average crossover",
    "best moving average crossover",
    "moving average crossover settings",
    "9 21 EMA crossover",
    "20 50 moving average crossover",
    "50 200 moving average crossover",
    "Golden Cross",
    "Death Cross",
    "moving average whipsaw",
    "trend following strategy",
    "moving average forex strategy",
    "EMA vs SMA",
    "moving average crossover for beginners",
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
    question: "What is a Moving Average Crossover strategy?",
    answer:
      "A Moving Average Crossover strategy is a trend-following method that compares two moving averages with different lookback periods. A bullish crossover occurs when the faster moving average crosses above the slower one, while a bearish crossover occurs when the faster average crosses below it.",
  },
  {
    question: "What is the difference between a fast and slow moving average?",
    answer:
      "A fast moving average uses fewer periods and responds more quickly to recent price changes. A slow moving average uses more periods, which makes it smoother but slower to react.",
  },
  {
    question: "What is the difference between SMA and EMA?",
    answer:
      "A Simple Moving Average, or SMA, gives equal weight to each price in the calculation. An Exponential Moving Average, or EMA, assigns more weight to recent prices, which usually makes it respond faster to changes in price.",
  },
  {
    question: "What is a bullish Moving Average Crossover?",
    answer:
      "A bullish crossover occurs when the faster moving average moves from below the slower moving average to above it. Traders may use it as evidence of improving short-term momentum or a possible bullish trend shift.",
  },
  {
    question: "What is a bearish Moving Average Crossover?",
    answer:
      "A bearish crossover occurs when the faster moving average crosses from above the slower moving average to below it. It may be used as evidence of weakening momentum or a possible bearish trend shift.",
  },
  {
    question: "What are the best Moving Average Crossover settings?",
    answer:
      "There is no single best combination for every market or timeframe. Common examples include 9/21, 20/50 and 50/200, but the periods should be tested within the specific market, timeframe and trading rules being used.",
  },
  {
    question: "What is a Golden Cross?",
    answer:
      "A Golden Cross commonly refers to a shorter-term moving average such as the 50-period average crossing above a longer-term average such as the 200-period average. It is generally considered a long-term bullish trend signal, but it does not guarantee that prices will continue rising.",
  },
  {
    question: "What is a Death Cross?",
    answer:
      "A Death Cross commonly refers to the 50-period moving average crossing below the 200-period moving average. It is generally treated as a long-term bearish trend signal, but it remains a lagging indicator and does not guarantee future declines.",
  },
  {
    question: "Why does the Moving Average Crossover strategy struggle in sideways markets?",
    answer:
      "When price moves without a sustained trend, the fast and slow moving averages can cross repeatedly. This is known as whipsaw and can create multiple losing or low-quality signals.",
  },
  {
    question: "Is the Moving Average Crossover strategy profitable?",
    answer:
      "No trading strategy guarantees profitability. Performance depends on market conditions, the moving average settings, entry and exit rules, transaction costs and risk management. The rules should be tested objectively before being relied upon.",
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

function MovingAverageHeroDesktopChart() {
  return (
    <svg
      viewBox="0 0 760 430"
      className="block h-full min-h-[410px] w-full"
      role="img"
      aria-label="Fast moving average crossing above a slow moving average"
    >
      <defs>
        <pattern
          id="maHeroGridEn"
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
      <rect width="760" height="430" fill="url(#maHeroGridEn)" />

      <Candle x={90} open={150} close={174} high={135} low={192} bullish={false} />
      <Candle x={125} open={174} close={201} high={158} low={218} bullish={false} />
      <Candle x={160} open={200} close={225} high={184} low={243} bullish={false} />
      <Candle x={195} open={224} close={246} high={207} low={265} bullish={false} />
      <Candle x={230} open={246} close={268} high={229} low={287} bullish={false} />

      <Candle x={265} open={268} close={247} high={288} low={230} bullish />
      <Candle x={300} open={246} close={218} high={262} low={201} bullish />
      <Candle x={335} open={217} close={187} high={233} low={170} bullish />
      <Candle x={370} open={186} close={154} high={202} low={137} bullish />
      <Candle x={405} open={154} close={129} high={170} low={112} bullish />
      <Candle x={440} open={130} close={113} high={146} low={96} bullish />

      <Candle x={475} open={113} close={133} high={96} low={150} bullish={false} />
      <Candle x={510} open={133} close={108} high={149} low={91} bullish />
      <Candle x={545} open={108} close={86} high={123} low={70} bullish />
      <Candle x={580} open={86} close={104} high={69} low={120} bullish={false} />
      <Candle x={615} open={103} close={79} high={118} low={63} bullish />
      <Candle x={650} open={79} close={61} high={94} low={45} bullish />

      {/* Slow MA */}
      <path
        d="M80 187
           C135 198 180 216 225 229
           C275 242 320 238 365 221
           C415 202 460 177 505 151
           C550 127 605 109 675 96"
        fill="none"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Fast MA */}
      <path
        d="M80 169
           C125 188 170 220 220 249
           C260 267 294 257 330 222
           C372 180 410 137 455 117
           C500 97 541 91 580 84
           C620 76 649 67 680 53"
        fill="none"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <circle
        cx="322"
        cy="228"
        r="9"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <line
        x1="322"
        y1="218"
        x2="322"
        y2="162"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <rect
        x="252"
        y="126"
        width="142"
        height="30"
        rx="15"
        fill="#2563eb"
      />

      <text
        x="323"
        y="145"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        BULLISH CROSS
      </text>

      <line
        x1="500"
        y1="325"
        x2="565"
        y2="325"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <text
        x="577"
        y="329"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        FAST MA
      </text>

      <line
        x1="500"
        y1="352"
        x2="565"
        y2="352"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <text
        x="577"
        y="356"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        SLOW MA
      </text>

      <text
        x="95"
        y="399"
        fontSize="8"
        fontWeight="900"
        fill="#64748b"
      >
        FAST MA CROSSES ABOVE SLOW MA
      </text>
    </svg>
  );
}

/* =========================================================
   HERO — MOBILE
========================================================= */

function MovingAverageHeroMobileChart() {
  return (
    <svg
      viewBox="0 0 520 285"
      className="block h-auto w-full"
      role="img"
      aria-label="Bullish moving average crossover example"
    >
      <defs>
        <pattern
          id="maHeroMobileGridEn"
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
      <rect width="520" height="285" fill="url(#maHeroMobileGridEn)" />

      <Candle x={55} open={96} close={116} high={82} low={130} bullish={false} width={14} />
      <Candle x={87} open={116} close={139} high={102} low={153} bullish={false} width={14} />
      <Candle x={119} open={138} close={159} high={124} low={175} bullish={false} width={14} />
      <Candle x={151} open={159} close={178} high={145} low={194} bullish={false} width={14} />

      <Candle x={183} open={178} close={157} high={194} low={143} bullish width={14} />
      <Candle x={215} open={157} close={132} high={172} low={117} bullish width={14} />
      <Candle x={247} open={131} close={105} high={146} low={90} bullish width={14} />
      <Candle x={279} open={104} close={83} high={118} low={69} bullish width={14} />
      <Candle x={311} open={83} close={67} high={97} low={53} bullish width={14} />

      <Candle x={343} open={68} close={84} high={52} low={98} bullish={false} width={14} />
      <Candle x={375} open={84} close={64} high={99} low={49} bullish width={14} />
      <Candle x={407} open={64} close={48} high={78} low={34} bullish width={14} />
      <Candle x={439} open={48} close={61} high={33} low={75} bullish={false} width={14} />

      <path
        d="M45 122
           C90 134 130 149 165 156
           C205 164 240 158 275 141
           C315 121 350 103 390 89
           C425 77 452 70 478 66"
        fill="none"
        stroke="#64748b"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M45 107
           C82 121 120 150 161 173
           C192 184 220 167 250 135
           C284 101 315 77 350 70
           C390 62 426 57 478 45"
        fill="none"
        stroke="#2563eb"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle
        cx="221"
        cy="156"
        r="7"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="2.5"
      />

      <rect
        x="178"
        y="212"
        width="88"
        height="24"
        rx="12"
        fill="#2563eb"
      />

      <text
        x="222"
        y="227"
        textAnchor="middle"
        fontSize="7"
        fontWeight="900"
        fill="#ffffff"
      >
        BULLISH CROSS
      </text>
    </svg>
  );
}

/* =========================================================
   CHART 01 — FAST VS SLOW MA
========================================================= */

function FastVsSlowMAChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 580"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Fast moving average compared with slow moving average"
    >
      <defs>
        <pattern
          id={fullscreen ? "fastSlowGridFullEn" : "fastSlowGridEn"}
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
        fill={`url(#${fullscreen ? "fastSlowGridFullEn" : "fastSlowGridEn"})`}
      />

      <line
        x1="590"
        y1="30"
        x2="590"
        y2="545"
        stroke="#e2e8f0"
        strokeWidth="2"
      />

      {/* LEFT — FAST */}
      <text
        x="295"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#1E5BB8"
      >
        FAST MOVING AVERAGE
      </text>

      <text
        x="295"
        y="82"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        SHORTER PERIOD • FASTER RESPONSE
      </text>

      <Candle x={95} open={190} close={216} high={174} low={232} bullish={false} />
      <Candle x={135} open={215} close={247} high={199} low={263} bullish={false} />
      <Candle x={175} open={246} close={271} high={230} low={287} bullish={false} />
      <Candle x={215} open={270} close={238} high={287} low={221} bullish />
      <Candle x={255} open={237} close={202} high={253} low={185} bullish />
      <Candle x={295} open={201} close={166} high={217} low={149} bullish />
      <Candle x={335} open={165} close={188} high={148} low={204} bullish={false} />
      <Candle x={375} open={188} close={150} high={204} low={133} bullish />
      <Candle x={415} open={150} close={122} high={166} low={105} bullish />
      <Candle x={455} open={121} close={97} high={137} low={80} bullish />

      <path
        d="M75 207
           C115 222 157 254 195 261
           C228 266 256 231 289 193
           C320 160 350 181 378 160
           C410 137 445 111 490 90"
        fill="none"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <rect
        x="205"
        y="355"
        width="180"
        height="34"
        rx="17"
        fill="#2563eb"
      />

      <text
        x="295"
        y="376"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        REACTS FASTER
      </text>

      <text
        x="295"
        y="438"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        MORE RESPONSIVE • MORE SENSITIVE TO NOISE
      </text>

      {/* RIGHT — SLOW */}
      <text
        x="885"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#334155"
      >
        SLOW MOVING AVERAGE
      </text>

      <text
        x="885"
        y="82"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        LONGER PERIOD • SMOOTHER RESPONSE
      </text>

      <Candle x={680} open={190} close={216} high={174} low={232} bullish={false} />
      <Candle x={720} open={215} close={247} high={199} low={263} bullish={false} />
      <Candle x={760} open={246} close={271} high={230} low={287} bullish={false} />
      <Candle x={800} open={270} close={238} high={287} low={221} bullish />
      <Candle x={840} open={237} close={202} high={253} low={185} bullish />
      <Candle x={880} open={201} close={166} high={217} low={149} bullish />
      <Candle x={920} open={165} close={188} high={148} low={204} bullish={false} />
      <Candle x={960} open={188} close={150} high={204} low={133} bullish />
      <Candle x={1000} open={150} close={122} high={166} low={105} bullish />
      <Candle x={1040} open={121} close={97} high={137} low={80} bullish />

      <path
        d="M660 220
           C710 229 760 237 805 229
           C850 219 892 196 935 169
           C975 144 1019 124 1085 111"
        fill="none"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <rect
        x="795"
        y="355"
        width="180"
        height="34"
        rx="17"
        fill="#475569"
      />

      <text
        x="885"
        y="376"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        REACTS SLOWER
      </text>

      <text
        x="885"
        y="438"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#475569"
      >
        SMOOTHER • MORE LAG
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="fast-slow-ma-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#fast-vs-slow-ma"
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
        href="#fast-slow-ma-fullscreen"
        className="block lg:hidden"
        aria-label="Expand fast and slow moving average chart"
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
   CHART 02 — SMA VS EMA
========================================================= */

function SmaVsEmaChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 600"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Simple Moving Average compared with Exponential Moving Average"
    >
      <defs>
        <pattern
          id={fullscreen ? "smaEmaGridFullEn" : "smaEmaGridEn"}
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
        fill={`url(#${fullscreen ? "smaEmaGridFullEn" : "smaEmaGridEn"})`}
      />

      <text
        x="65"
        y="55"
        fontSize="18"
        fontWeight="900"
        fill="#0f172a"
      >
        SMA vs EMA
      </text>

      <text
        x="65"
        y="80"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        SAME PRICE ACTION • DIFFERENT RESPONSE TO RECENT DATA
      </text>

      <Candle x={90} open={385} close={355} high={400} low={338} bullish />
      <Candle x={135} open={354} close={325} high={370} low={309} bullish />
      <Candle x={180} open={324} close={345} high={308} low={361} bullish={false} />
      <Candle x={225} open={344} close={302} high={360} low={286} bullish />
      <Candle x={270} open={301} close={264} high={317} low={248} bullish />
      <Candle x={315} open={263} close={228} high={279} low={212} bullish />
      <Candle x={360} open={227} close={247} high={211} low={263} bullish={false} />
      <Candle x={405} open={246} close={206} high={262} low={190} bullish />
      <Candle x={450} open={205} close={170} high={221} low={154} bullish />
      <Candle x={495} open={169} close={190} high={153} low={206} bullish={false} />
      <Candle x={540} open={189} close={151} high={205} low={135} bullish />
      <Candle x={585} open={150} close={119} high={166} low={103} bullish />
      <Candle x={630} open={119} close={137} high={103} low={153} bullish={false} />
      <Candle x={675} open={136} close={101} high={152} low={85} bullish />
      <Candle x={720} open={101} close={76} high={117} low={60} bullish />
      <Candle x={765} open={76} close={96} high={60} low={112} bullish={false} />
      <Candle x={810} open={95} close={71} high={111} low={55} bullish />
      <Candle x={855} open={71} close={52} high={87} low={36} bullish />

      <path
        d="M75 355
           C155 347 225 326 290 296
           C360 266 425 231 490 198
           C565 162 645 134 730 109
           C785 93 830 81 900 69"
        fill="none"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M75 365
           C135 353 195 337 250 305
           C300 272 345 230 395 221
           C445 207 480 172 530 157
           C580 140 625 111 675 102
           C730 90 765 73 805 69
           C842 65 875 52 920 43"
        fill="none"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <line
        x1="810"
        y1="470"
        x2="875"
        y2="470"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <text
        x="888"
        y="474"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        EMA — MORE RESPONSIVE
      </text>

      <line
        x1="810"
        y1="501"
        x2="875"
        y2="501"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <text
        x="888"
        y="505"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        SMA — SMOOTHER
      </text>

      <rect
        x="73"
        y="455"
        width="310"
        height="72"
        rx="16"
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="2"
      />

      <text
        x="94"
        y="481"
        fontSize="9"
        fontWeight="900"
        fill="#0f172a"
      >
        EMA
      </text>

      <text
        x="135"
        y="481"
        fontSize="9"
        fontWeight="700"
        fill="#64748b"
      >
        gives more weight to recent prices
      </text>

      <text
        x="94"
        y="507"
        fontSize="9"
        fontWeight="900"
        fill="#0f172a"
      >
        SMA
      </text>

      <text
        x="135"
        y="507"
        fontSize="9"
        fontWeight="700"
        fill="#64748b"
      >
        gives equal weight to each period
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="sma-ema-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#sma-vs-ema"
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
        href="#sma-ema-fullscreen"
        className="block lg:hidden"
        aria-label="Expand SMA and EMA comparison chart"
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
   CHART 03 — BULLISH VS BEARISH CROSS
========================================================= */

function BullishBearishCrossChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 600"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Bullish and bearish moving average crossover comparison"
    >
      <defs>
        <pattern
          id={fullscreen ? "crossTypesGridFullEn" : "crossTypesGridEn"}
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
        fill={`url(#${fullscreen ? "crossTypesGridFullEn" : "crossTypesGridEn"})`}
      />

      <line
        x1="590"
        y1="30"
        x2="590"
        y2="555"
        stroke="#e2e8f0"
        strokeWidth="2"
      />

      {/* Bullish */}
      <text
        x="295"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#1E5BB8"
      >
        BULLISH CROSSOVER
      </text>

      <text
        x="295"
        y="82"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        FAST MA CROSSES ABOVE SLOW MA
      </text>

      <Candle x={85} open={355} close={378} high={339} low={394} bullish={false} />
      <Candle x={125} open={377} close={396} high={361} low={412} bullish={false} />
      <Candle x={165} open={395} close={369} high={412} low={352} bullish />
      <Candle x={205} open={368} close={334} high={384} low={317} bullish />
      <Candle x={245} open={333} close={300} high={349} low={283} bullish />
      <Candle x={285} open={299} close={262} high={315} low={245} bullish />
      <Candle x={325} open={261} close={226} high={277} low={209} bullish />
      <Candle x={365} open={225} close={192} high={241} low={175} bullish />
      <Candle x={405} open={191} close={164} high={207} low={147} bullish />
      <Candle x={445} open={163} close={135} high={179} low={118} bullish />

      <path
        d="M65 360 C140 373 200 365 250 337 C300 307 355 258 485 178"
        fill="none"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M65 389 C130 403 185 386 235 342 C275 305 310 256 350 220 C395 181 438 148 495 112"
        fill="none"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <circle
        cx="238"
        cy="342"
        r="9"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <rect
        x="167"
        y="457"
        width="256"
        height="34"
        rx="17"
        fill="#2563eb"
      />

      <text
        x="295"
        y="478"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        POTENTIAL BULLISH TREND SHIFT
      </text>

      {/* Bearish */}
      <text
        x="885"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#334155"
      >
        BEARISH CROSSOVER
      </text>

      <text
        x="885"
        y="82"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        FAST MA CROSSES BELOW SLOW MA
      </text>

      <Candle x={680} open={145} close={122} high={161} low={106} bullish />
      <Candle x={720} open={123} close={104} high={139} low={88} bullish />
      <Candle x={760} open={104} close={130} high={88} low={147} bullish={false} />
      <Candle x={800} open={130} close={164} high={114} low={181} bullish={false} />
      <Candle x={840} open={164} close={198} high={148} low={215} bullish={false} />
      <Candle x={880} open={198} close={232} high={182} low={249} bullish={false} />
      <Candle x={920} open={232} close={267} high={216} low={284} bullish={false} />
      <Candle x={960} open={267} close={303} high={251} low={320} bullish={false} />
      <Candle x={1000} open={303} close={338} high={287} low={355} bullish={false} />
      <Candle x={1040} open={338} close={368} high={322} low={385} bullish={false} />

      <path
        d="M655 156 C730 143 790 153 840 181 C895 211 950 259 1085 341"
        fill="none"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M655 126 C720 111 775 129 825 173 C865 211 900 259 940 296 C985 336 1028 367 1085 404"
        fill="none"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <circle
        cx="828"
        cy="176"
        r="9"
        fill="#ffffff"
        stroke="#475569"
        strokeWidth="3"
      />

      <rect
        x="752"
        y="457"
        width="266"
        height="34"
        rx="17"
        fill="#475569"
      />

      <text
        x="885"
        y="478"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        POTENTIAL BEARISH TREND SHIFT
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="bullish-bearish-cross-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#bullish-bearish-crossover"
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
        href="#bullish-bearish-cross-fullscreen"
        className="block lg:hidden"
        aria-label="Expand bullish and bearish crossover chart"
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
   CHART 04 — WHIPSAW VS TREND
========================================================= */

function WhipsawTrendChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 610"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="Moving average crossover whipsaw in a range compared with a trending market"
    >
      <defs>
        <pattern
          id={fullscreen ? "whipsawGridFullEn" : "whipsawGridEn"}
          width="59"
          height="61"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M59 0 L0 0 0 61"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="1180" height="610" fill="#ffffff" />

      <rect
        width="1180"
        height="610"
        fill={`url(#${fullscreen ? "whipsawGridFullEn" : "whipsawGridEn"})`}
      />

      <line
        x1="590"
        y1="30"
        x2="590"
        y2="565"
        stroke="#e2e8f0"
        strokeWidth="2"
      />

      {/* CHOP */}
      <text
        x="295"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#334155"
      >
        CHOPPY / RANGE MARKET
      </text>

      <text
        x="295"
        y="82"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        REPEATED CROSSOVERS WITHOUT A SUSTAINED TREND
      </text>

      <path
        d="M70 262
           C115 200 150 330 198 249
           C244 177 280 331 326 250
           C370 177 410 330 458 246
           C493 188 520 248 535 265"
        fill="none"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M70 252
           C125 234 171 273 216 253
           C261 231 306 270 351 251
           C395 232 443 270 487 250
           C510 241 524 248 535 253"
        fill="none"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {[132, 196, 260, 327, 394, 458].map((x) => (
        <circle
          key={x}
          cx={x}
          cy={253}
          r="7"
          fill="#ffffff"
          stroke="#ef4444"
          strokeWidth="2.5"
        />
      ))}

      <rect
        x="160"
        y="415"
        width="270"
        height="36"
        rx="18"
        fill="#475569"
      />

      <text
        x="295"
        y="437"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        MULTIPLE WHIPSAW SIGNALS
      </text>

      <text
        x="295"
        y="495"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#64748b"
      >
        FAST &amp; SLOW MA KEEP CROSSING
      </text>

      {/* TREND */}
      <text
        x="885"
        y="58"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#1E5BB8"
      >
        TRENDING MARKET
      </text>

      <text
        x="885"
        y="82"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        CLEARER SEPARATION BETWEEN THE MOVING AVERAGES
      </text>

      <path
        d="M650 385
           C700 367 745 342 790 308
           C836 273 878 231 921 192
           C968 149 1017 116 1100 86"
        fill="none"
        stroke="#64748b"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M650 414
           C697 408 735 375 773 334
           C812 292 850 246 891 202
           C932 158 979 117 1100 63"
        fill="none"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <circle
        cx="767"
        cy="340"
        r="9"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <rect
        x="770"
        y="415"
        width="230"
        height="36"
        rx="18"
        fill="#2563eb"
      />

      <text
        x="885"
        y="437"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#ffffff"
      >
        CLEANER TREND SIGNAL
      </text>

      <text
        x="885"
        y="495"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#64748b"
      >
        MOVING AVERAGES SEPARATE AFTER THE CROSS
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="whipsaw-trend-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#moving-average-whipsaw"
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
        href="#whipsaw-trend-fullscreen"
        className="block lg:hidden"
        aria-label="Expand whipsaw and trending market comparison"
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

export default function MovingAverageCrossoverStrategyPage() {
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
      "Moving Average Crossover",
      "Moving Averages",
      "EMA",
      "SMA",
      "Forex Trading",
      "Trend Following",
      "Technical Analysis",
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
        name: "Moving Average Crossover Strategy",
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
      <FastVsSlowMAChart fullscreen />
      <SmaVsEmaChart fullscreen />
      <BullishBearishCrossChart fullscreen />
      <WhipsawTrendChart fullscreen />

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

          <span className="text-slate-800">
            Moving Average Crossover
          </span>
        </nav>

        {/* =================================================
            HERO — DESKTOP
            ENGLISH: TEXT LEFT / CHART RIGHT
        ================================================= */}

        <section className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)] lg:block">
          <div className="grid min-h-[420px] grid-cols-[1.1fr_0.9fr]">
            {/* TEXT — LEFT */}
            <div className="order-1 flex flex-col justify-center p-9 xl:p-12">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-black text-[#1E5BB8]">
                  Trading Strategy
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                  Trend Following
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                  Beginner – Intermediate
                </span>
              </div>

              <h1 className="max-w-[850px] text-[38px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950 xl:text-[46px]">
                Moving Average Crossover
                <span className="mt-1 block text-[#1E5BB8]">
                  Trading Strategy
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-[14px] font-medium leading-8 text-slate-600 xl:text-[15px]">
                A practical guide to fast and slow moving averages, SMA vs EMA,
                bullish and bearish crossovers, common settings, Golden Cross,
                Death Cross, whipsaws, entry rules, exits and risk management.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Fast MA",
                  "Slow MA",
                  "SMA",
                  "EMA",
                  "Bullish Cross",
                  "Bearish Cross",
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
                <span>Candlestick + MA examples</span>
              </div>
            </div>

            {/* CHART — RIGHT */}
            <div className="order-2 border-l border-slate-200">
              <div className="flex h-11 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                <span className="ml-3 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Moving Average Crossover Analysis
                </span>
              </div>

              <MovingAverageHeroDesktopChart />
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
                Trend Following
              </span>
            </div>

            <h1 className="mt-4 text-[27px] font-black leading-[1.15] tracking-[-0.03em] text-slate-950 sm:text-[32px]">
              Moving Average Crossover
              <span className="block text-[#1E5BB8]">
                Trading Strategy
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              Learn how fast and slow moving averages interact, how bullish and
              bearish crossovers form, and why whipsaws are a major challenge
              in sideways markets.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Fast MA", "Slow MA", "SMA", "EMA", "Crossover"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[8px] font-black text-slate-600"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 text-[9px] font-bold leading-5 text-slate-500">
              Updated September 2026 · Beginner to intermediate
            </div>
          </div>

          <div className="border-t border-slate-200">
            <MovingAverageHeroMobileChart />
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
                What Is a Moving Average Crossover Strategy?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A <strong>Moving Average Crossover strategy</strong> is a
                  trend-following approach that compares two moving averages
                  with different lookback periods to identify changes in the
                  relationship between shorter-term and longer-term price
                  momentum.
                </p>

                <p>
                  The average using fewer periods is normally called the{" "}
                  <strong>fast moving average</strong> because it reacts more
                  quickly to changes in price. The average using more periods is
                  the <strong>slow moving average</strong>, which is smoother but
                  responds more slowly.
                </p>

                <p>
                  A <strong>bullish crossover</strong> occurs when the fast
                  moving average crosses from below the slow moving average to
                  above it. A <strong>bearish crossover</strong> occurs when the
                  fast average crosses below the slow average.
                </p>

                <p>
                  Moving averages are calculated from historical prices, so
                  they are <strong>lagging indicators</strong>. That means the
                  price move that creates a crossover has already started by
                  the time the signal appears.
                </p>
              </div>

              <ImportantBox title="A crossover confirms a change that has already occurred">
                The purpose of a Moving Average Crossover is not to identify the
                exact market top or bottom. It creates an objective rule for
                participating in a potential trend if the move continues.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — MOVING AVERAGE BASICS
          ================================================= */}

          <section
            id="moving-average-basics"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — The Basics</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Is a Moving Average?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A moving average is a line calculated from a series of
                  historical prices. As new price data becomes available, the
                  calculation updates and the line moves with the market.
                </p>

                <p>
                  For example, a 20-period moving average uses the most recent
                  20 periods according to the selected calculation method. When
                  a new candle is added, the data set changes and the moving
                  average updates.
                </p>

                <p>
                  Shorter moving averages stay closer to price and react more
                  quickly. Longer moving averages smooth a larger amount of
                  historical data and therefore move more slowly.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Smooth Price Action",
                    text: "Moving averages reduce some of the visual noise in raw candlestick data.",
                  },
                  {
                    n: "02",
                    title: "Identify Trend Context",
                    text: "The slope of the moving average and price location relative to it can help organize directional context.",
                  },
                  {
                    n: "03",
                    title: "Generate Crossover Signals",
                    text: "Two averages with different lookback periods can be compared to create bullish and bearish crossover signals.",
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
              02 — FAST VS SLOW
          ================================================= */}

          <section
            id="fast-vs-slow-ma"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — Fast vs Slow MA</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Fast vs Slow Moving Average: What Is the Difference?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A crossover requires two moving averages that respond at
                different speeds. The difference comes primarily from the
                number of periods used in the calculation.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    FAST MA
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Fast Moving Average
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    Uses a shorter lookback period and responds more quickly to
                    changes in price. That faster response can produce earlier
                    signals, but it can also make the average more sensitive to
                    short-term noise.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    SLOW MA
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Slow Moving Average
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    Uses a longer lookback period and moves more smoothly.
                    Because it reacts more slowly, it can provide steadier trend
                    context but produces greater lag.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <FastVsSlowMAChart />
              </div>

              <ImportantBox title="A faster moving average is not automatically better">
                Shortening the lookback period can produce quicker crossovers,
                but it can also increase the number of signals during choppy
                markets. Speed and noise are a trade-off that should be tested.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              03 — SMA VS EMA
          ================================================= */}

          <section
            id="sma-vs-ema"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — SMA vs EMA</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                SMA vs EMA for Moving Average Crossover Trading
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Two of the most common moving average types used in crossover
                  strategies are the{" "}
                  <strong>Simple Moving Average — SMA</strong> and the{" "}
                  <strong>Exponential Moving Average — EMA</strong>.
                </p>

                <p>
                  An SMA gives equal weight to each price included in the
                  calculation. An EMA assigns more weight to recent prices,
                  which generally makes it react more quickly when price changes
                  direction.
                </p>

                <p>
                  The faster response of an EMA is not automatically an
                  advantage. It may create earlier signals, but it can also
                  react more aggressively to short-lived price moves. An SMA is
                  smoother, but usually slower.
                </p>
              </div>

              <div className="mt-7">
                <SmaVsEmaChart />
              </div>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.85fr_1.25fr_1.4fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>Type</div>
                  <div>Behavior</div>
                  <div>Trade-Off</div>
                </div>

                {[
                  [
                    "SMA",
                    "Smoother and gives equal weight to every period.",
                    "Can respond more slowly when price changes direction quickly.",
                  ],
                  [
                    "EMA",
                    "Weights recent prices more heavily and responds faster.",
                    "Can be more sensitive to short-term noise and temporary price moves.",
                  ],
                ].map(([type, behavior, tradeoff]) => (
                  <div
                    key={type}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.85fr_1.25fr_1.4fr]"
                  >
                    <div className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                      {type}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {behavior}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {tradeoff}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              04 — BULLISH / BEARISH
          ================================================= */}

          <section
            id="bullish-bearish-crossover"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — Crossover Signals</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Bullish vs Bearish Moving Average Crossover
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                The core crossover signal is simple: traders monitor which
                moving average is above the other. The signal itself, however,
                does not automatically mean a position should be opened.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    BULLISH CROSSOVER
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Fast MA Crosses Above Slow MA
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    The shorter-term average moves above the longer-term
                    average, which may indicate strengthening short-term
                    momentum or a possible shift toward a bullish trend.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    BEARISH CROSSOVER
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    Fast MA Crosses Below Slow MA
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    The shorter-term average falls below the longer-term
                    average, which may indicate weakening momentum or a possible
                    shift toward a bearish trend.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <BullishBearishCrossChart />
              </div>

              <ImportantBox title="A crossover is a trend-following signal, not a prediction">
                By the time a crossover appears, the price data that caused it
                has already occurred. It is therefore normal for the signal to
                appear after the exact market bottom or top.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              05 — SETTINGS
          ================================================= */}

          <section
            id="moving-average-crossover-settings"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — Moving Average Settings</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Common Moving Average Crossover Settings
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  There are many possible moving average combinations, and no
                  single pair is objectively best across every market,
                  timeframe and trading style.
                </p>

                <p>
                  Shorter combinations normally react faster and create more
                  signals. Longer combinations generate fewer signals but
                  usually react later to changes in trend.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.75fr_1fr_1.45fr_1.25fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>Example</div>
                  <div>Speed</div>
                  <div>Typical Use</div>
                  <div>Trade-Off</div>
                </div>

                {[
                  [
                    "9 / 21",
                    "Fast",
                    "Sometimes used on shorter and medium trading horizons.",
                    "More signals and greater sensitivity to noise.",
                  ],
                  [
                    "20 / 50",
                    "Medium",
                    "A common example of a more moderate trend-following combination.",
                    "More lag than shorter-period combinations.",
                  ],
                  [
                    "50 / 200",
                    "Slow",
                    "Frequently used to assess longer-term market trends.",
                    "Signals can occur well after a large part of the move has already happened.",
                  ],
                ].map(([pair, speed, use, tradeoff]) => (
                  <div
                    key={pair}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.75fr_1fr_1.45fr_1.25fr]"
                  >
                    <div className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                      {pair}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {speed}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {use}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {tradeoff}
                    </div>
                  </div>
                ))}
              </div>

              <ImportantBox title="There is no universal best Moving Average Crossover setting">
                Combinations such as 9/21, 20/50 and 50/200 are examples, not
                guaranteed formulas. The chosen periods should match the market,
                timeframe and trading rules and should be tested before use.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              06 — GOLDEN / DEATH CROSS
          ================================================= */}

          <section
            id="golden-death-cross"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Golden Cross &amp; Death Cross</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What Are the Golden Cross and Death Cross?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  The terms <strong>Golden Cross</strong> and{" "}
                  <strong>Death Cross</strong> are commonly associated with
                  longer-term moving averages. One widely referenced example is
                  the 50-period and 200-period moving averages.
                </p>

                <p>
                  A Golden Cross occurs when the shorter moving average crosses
                  above the longer moving average. A Death Cross occurs when the
                  shorter average crosses below the longer average.
                </p>

                <p>
                  Because these combinations use long lookback periods, the
                  signal typically appears after a meaningful amount of price
                  movement has already occurred. Some traders therefore use them
                  more as long-term trend or regime indicators than precise
                  entry signals.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    GOLDEN CROSS
                  </span>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    50 MA Crosses Above 200 MA
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    A widely followed example of a long-term bullish crossover.
                    It can indicate improving trend conditions, but it does not
                    guarantee further gains.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    DEATH CROSS
                  </span>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    50 MA Crosses Below 200 MA
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    A widely followed example of a long-term bearish crossover.
                    It can indicate deteriorating trend conditions, but it does
                    not guarantee additional declines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              07 — TRENDING MARKET
          ================================================= */}

          <section
            id="moving-average-trending-market"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — Market Conditions</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                When Does a Moving Average Crossover Strategy Work Best?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Moving Average Crossover is fundamentally a{" "}
                  <strong>trend-following strategy</strong>. Its logic is most
                  useful when the market can develop and maintain a directional
                  move after the crossover occurs.
                </p>

                <p>
                  In a clearer trend, the fast moving average may move away from
                  the slow moving average after the cross and remain on the same
                  side for an extended period.
                </p>

                <p>
                  The main challenge appears when there is no sustained trend
                  and the averages remain flat, close together or repeatedly
                  change position.
                </p>
              </div>

              <ImportantBox title="Trend-following systems accept lag in exchange for confirmation">
                The strategy does not need to predict the exact beginning of a
                trend. It accepts entering after the move has started in
                exchange for using objective evidence that conditions may have
                changed.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              08 — WHIPSAW
          ================================================= */}

          <section
            id="moving-average-whipsaw"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Whipsaw</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Why Moving Average Crossovers Fail in Sideways Markets
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  One of the biggest weaknesses of a Moving Average Crossover
                  system is <strong>whipsaw</strong>. This occurs when the
                  market does not develop a sustained trend and the fast and
                  slow averages cross repeatedly within a short period.
                </p>

                <p>
                  A bullish cross may be followed quickly by a bearish cross,
                  which may then be followed by another bullish signal without
                  enough directional movement to offset losses and transaction
                  costs.
                </p>

                <p>
                  Many crossover systems therefore use a market-regime filter,
                  trend filter or price-structure rule to avoid automatically
                  trading every crossover.
                </p>
              </div>

              <div className="mt-7">
                <WhipsawTrendChart />
              </div>

              <ImportantBox title="Whipsaw cannot be eliminated completely">
                Any trend-following system can struggle during sideways
                conditions. The goal is not to find a filter that prevents
                every losing trade, but to define rules that can be tested
                objectively across different market regimes.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — FILTERS
          ================================================= */}

          <section
            id="moving-average-crossover-filters"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — Signal Filters</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Filter Weak Moving Average Crossover Signals
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                No filter can remove every bad crossover, but additional rules
                can help prevent a strategy from trading automatically in every
                market condition.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Slope Filter",
                    text: "Avoid signals when the slow moving average is almost flat instead of showing a clear directional slope.",
                  },
                  {
                    n: "02",
                    title: "Price Structure",
                    text: "Check whether swing highs and lows support the same directional interpretation as the crossover.",
                  },
                  {
                    n: "03",
                    title: "Close Confirmation",
                    text: "Wait for the crossover candle to close rather than trading an intrabar cross that may disappear before the period ends.",
                  },
                  {
                    n: "04",
                    title: "Higher Timeframe",
                    text: "Use the direction of a higher timeframe as an additional filter for lower-timeframe crossover signals.",
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

              <ImportantBox title="Every filter has a trade-off">
                Additional conditions may remove some weak trades, but they can
                also delay entries or filter out profitable moves. Evaluate
                filters through backtesting instead of judging them from one
                chart example.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              10 — ENTRY
          ================================================= */}

          <section
            id="moving-average-crossover-entry"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — Entry Rules</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                When Should You Enter After a Moving Average Crossover?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Several entry models can be built around the same crossover.
                  The important part is choosing one definition in advance and
                  applying it consistently instead of changing the entry rule
                  after seeing the outcome.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Immediate Cross",
                    text: "Enter after the candle that confirms the crossover closes.",
                    tradeoff:
                      "Earlier participation, but greater exposure to crossovers that reverse quickly.",
                  },
                  {
                    n: "02",
                    title: "Price Confirmation",
                    text: "Wait for an additional close, market-structure signal or other predefined confirmation.",
                    tradeoff:
                      "More confirmation, but a later entry and potentially less favorable price.",
                  },
                  {
                    n: "03",
                    title: "Pullback Entry",
                    text: "Wait for the crossover and then for price to retrace before looking for an entry in the new direction.",
                    tradeoff:
                      "Can create a more structured entry, but some trends continue without offering a suitable pullback.",
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

              <ImportantBox title="Do not trade an unfinished crossover if your rules require a close">
                Moving averages update as the current candle moves. A crossover
                can appear intrabar and disappear before the candle closes. If
                your strategy requires a confirmed close, apply that same rule
                in both backtesting and live trading.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              PART 1 ENDS HERE
              PART 2 CONTINUES DIRECTLY FROM THIS POINT
          ================================================= */}
                    {/* =================================================
              11 — STOP LOSS & INVALIDATION
          ================================================= */}

          <section
            id="moving-average-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — Stop Loss & Invalidation</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Where Should You Place a Stop Loss in a Moving Average Crossover Strategy?
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  A moving average crossover does not automatically tell you
                  where to place a stop loss. A stronger approach is to define
                  a clear <strong>invalidation level</strong>: a price level
                  that weakens or invalidates the original trade idea according
                  to your rules.
                </p>

                <p>
                  For a long trade after a bullish crossover, invalidation
                  might sit below a relevant swing low or below the market
                  structure supporting the setup. For a short trade, it may
                  sit above a relevant swing high.
                </p>

                <p>
                  Placing the stop immediately behind the fast moving average
                  can lead to repeated exits during normal price fluctuations,
                  especially when price is moving sideways around the averages.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Structure Stop",
                    text: "Place the stop beyond a relevant swing low for a long trade or swing high for a short trade when market structure is part of the setup.",
                  },
                  {
                    n: "02",
                    title: "Volatility Stop",
                    text: "Use a volatility measure such as ATR to create a stop distance that adapts to market conditions instead of using an arbitrary fixed distance.",
                  },
                  {
                    n: "03",
                    title: "System Exit",
                    text: "Some systems use the opposite crossover as an exit, although this can allow price to move significantly before the exit signal appears.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
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

              <ImportantBox title="Define invalidation before calculating position size">
                Do not let your preferred position size determine where the
                stop goes. First identify the technical level that invalidates
                the setup, then use the distance between entry and stop to
                calculate a position size that fits your risk limit.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — TAKE PROFIT & EXIT
          ================================================= */}

          <section
            id="moving-average-exit"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — Take Profit & Exit Rules</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How Do You Take Profit With a Moving Average Crossover?
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                There is no single exit method built into a moving average
                crossover strategy. A system can use a fixed target, market
                structure, a trailing stop, or an opposite crossover. The
                important point is to define the exit rule before entering the
                trade.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Opposing Structure",
                    text: "Use a support or resistance area, previous swing high, or previous swing low as a potential target.",
                  },
                  {
                    title: "Risk-to-Reward",
                    text: "Use a predefined ratio such as 1:2 as an example when that target also makes sense within the market structure.",
                  },
                  {
                    title: "Trailing Exit",
                    text: "Trail the exit as the trend develops instead of relying exclusively on a fixed profit target.",
                  },
                  {
                    title: "Opposite Cross",
                    text: "Remain in the trend until the fast and slow averages produce an opposite crossover signal.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="text-[9px] font-black uppercase tracking-[0.1em] text-[#1E5BB8]">
                      {item.title}
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Earlier and later exits involve a trade-off">
                A fixed target may close a profitable trade before a strong
                trend continues, while waiting for an opposite crossover can
                give back part of an open profit. Neither method is inherently
                superior; evaluate the exit rule as part of the complete
                strategy.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              13 — MULTI-TIMEFRAME
          ================================================= */}

          <section
            id="moving-average-multi-timeframe"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Multi-Timeframe Analysis</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Using Moving Average Crossovers Across Multiple Timeframes
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Traders can use a higher timeframe to identify the broader
                  market direction and then look for a crossover on a lower
                  timeframe that aligns with that context.
                </p>

                <p>
                  This does not make the signal reliable by itself, but it can
                  prevent a strategy from treating every small bullish
                  crossover as equivalent while the higher timeframe remains
                  in a strong downtrend.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Higher Timeframe",
                    subtitle: "Context",
                    text: "Determine whether the broader market is trending higher, trending lower, or ranging, and whether the moving averages have a meaningful slope.",
                  },
                  {
                    n: "02",
                    title: "Trading Timeframe",
                    subtitle: "Signal",
                    text: "Watch for the crossover defined by the rules you have tested on the timeframe used for actual trade decisions.",
                  },
                  {
                    n: "03",
                    title: "Entry Context",
                    subtitle: "Execution",
                    text: "Define market structure, invalidation, stop placement, target, and position size before executing the trade.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <div>
                        <h3 className="text-[13px] font-black text-slate-950">
                          {item.title}
                        </h3>

                        <span className="text-[10px] font-bold text-slate-400">
                          {item.subtitle}
                        </span>
                      </div>
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
              14 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="moving-average-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — Risk Management</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Risk Management and Position Sizing
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Even if a crossover system has performed well in a historical
                  test, losing trades and losing streaks remain possible.
                  Account survival should therefore never depend on the next
                  crossover being successful.
                </p>

                <p>
                  One approach is to define a maximum amount of account equity
                  to risk on each trade and calculate position size from the
                  actual distance between the entry and stop-loss level.
                </p>
              </div>

              <div className="mt-7 rounded-[24px] bg-slate-950 p-5 text-white sm:p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-300">
                  POSITION SIZE LOGIC
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-4">
                  {[
                    [
                      "01",
                      "Account Risk",
                      "Define the maximum amount you are prepared to lose on the trade.",
                    ],
                    [
                      "02",
                      "Entry",
                      "Identify the entry price according to your tested rules.",
                    ],
                    [
                      "03",
                      "Stop Distance",
                      "Measure the distance from entry to technical invalidation.",
                    ],
                    [
                      "04",
                      "Position Size",
                      "Adjust trade size so the potential loss remains within your risk limit.",
                    ],
                  ].map(([n, title, text]) => (
                    <div
                      key={n}
                      className="rounded-[18px] border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-blue-300">
                          {n}
                        </span>

                        <span className="text-[11px] font-black text-white">
                          {title}
                        </span>
                      </div>

                      <p className="mt-2 text-[11px] font-medium leading-6 text-slate-300 sm:text-[12px]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <ImportantBox title="Win rate alone does not define a good strategy">
                A lower-win-rate system can still produce positive results if
                average winners sufficiently exceed average losers, while a
                high win rate can still hide poor risk characteristics.
                Evaluate expectancy, drawdown, average win and loss, and
                trading costs rather than focusing only on win rate.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              15 — SETTINGS BY STYLE
          ================================================= */}

          <section
            id="moving-average-settings-by-style"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — Choosing MA Periods</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Moving Average Settings for Different Trading Styles
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                A moving average period does not represent the same amount of
                market time on every chart. A 20-period moving average on a
                five-minute chart describes a very different price window from
                a 20-period moving average on a daily chart.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.9fr_1.2fr_1.4fr_1.3fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>Trading Style</div>
                  <div>Typical MA Behavior</div>
                  <div>Potential Advantage</div>
                  <div>Main Challenge</div>
                </div>

                {[
                  [
                    "Scalping",
                    "Shorter and more sensitive",
                    "Responds more quickly to price changes",
                    "More whipsaw and greater sensitivity to trading costs",
                  ],
                  [
                    "Day Trading",
                    "Short to medium",
                    "Balances responsiveness and smoothing",
                    "Intraday ranges can create repeated false signals",
                  ],
                  [
                    "Swing Trading",
                    "Medium to longer",
                    "Focuses more on sustained directional moves",
                    "Signals generally arrive later",
                  ],
                  [
                    "Position Trading",
                    "Longer",
                    "Filters more short-term market noise",
                    "Can require wider stops and greater patience",
                  ],
                ].map(([style, nature, benefit, issue]) => (
                  <div
                    key={style}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.9fr_1.2fr_1.4fr_1.3fr]"
                  >
                    <div className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                      {style}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600">
                      {nature}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600">
                      {benefit}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600">
                      {issue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              16 — WHEN TO AVOID
          ================================================= */}

          <section
            id="when-to-avoid-ma-crossover"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — When to Be More Selective</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                When Is a Moving Average Crossover Signal Weaker?
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Flat Moving Averages",
                    text: "Little or no slope can indicate that the market lacks the sustained direction a trend-following system generally needs.",
                  },
                  {
                    title: "Repeated Crossovers",
                    text: "If the averages repeatedly switch positions within a short period, the market may be experiencing whipsaw.",
                  },
                  {
                    title: "Range-Bound Price",
                    text: "Clearly defined nearby range boundaries can prevent a new directional move from developing after the crossover.",
                  },
                  {
                    title: "Late Entry",
                    text: "If price has already moved far from the averages, the required stop distance or risk-to-reward profile may become unattractive.",
                  },
                  {
                    title: "High-Volatility Event",
                    text: "A sudden price shock can rapidly change the averages and produce signals unlike the conditions represented in a normal backtest.",
                  },
                  {
                    title: "High Trading Costs",
                    text: "Spread, commission, and slippage can materially affect systems that generate frequent crossover trades.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
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
              17 — COMMON MISTAKES
          ================================================= */}

          <section
            id="moving-average-crossover-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — Common Mistakes</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Common Moving Average Crossover Trading Mistakes
              </h2>

              <div className="mt-7 space-y-3">
                {[
                  [
                    "01",
                    "Trading Every Crossover",
                    "Treating every cross as an independent signal without considering market conditions can increase exposure to whipsaw.",
                  ],
                  [
                    "02",
                    "Searching for Magic Settings",
                    "Changing 9/21 to 10/22 and then 12/26 after a few losses can become parameter hunting rather than systematic strategy development.",
                  ],
                  [
                    "03",
                    "Ignoring Indicator Lag",
                    "Expecting moving averages to identify exact tops and bottoms conflicts with the lagging nature of the indicator.",
                  ],
                  [
                    "04",
                    "Using an Arbitrarily Tight Stop",
                    "A stop that ignores volatility and market structure may be triggered by ordinary price movement.",
                  ],
                  [
                    "05",
                    "Ignoring Trading Costs",
                    "A backtest that excludes spreads, commissions, and slippage can look substantially better than real execution.",
                  ],
                  [
                    "06",
                    "Changing Rules After the Outcome",
                    "Choosing which crossovers counted only after seeing what price did introduces hindsight bias.",
                  ],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="flex gap-4 rounded-[20px] border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                      {n}
                    </span>

                    <div>
                      <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
                        {title}
                      </h3>

                      <p className="mt-1.5 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              18 — OVERFITTING
          ================================================= */}

          <section
            id="moving-average-overfitting"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — Overfitting</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                The Risk of Over-Optimizing Moving Average Settings
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Moving average periods are easy to change, which makes
                  crossover strategies particularly vulnerable to{" "}
                  <strong>overfitting</strong>. A trader can test hundreds of
                  combinations until one pair produces unusually attractive
                  historical results.
                </p>

                <p>
                  The problem is that settings optimized too precisely for past
                  data may have captured random characteristics of that sample
                  rather than a relationship that persists in new market data.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "In-Sample",
                    text: "Use one portion of historical data to develop the rules and identify a reasonable range of parameters.",
                  },
                  {
                    title: "Out-of-Sample",
                    text: "Evaluate the completed rules on data that was not used while developing or optimizing the strategy.",
                  },
                  {
                    title: "Robustness",
                    text: "Check whether results depend on one exact parameter combination or remain reasonably stable across nearby settings, periods, and markets.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6"
                  >
                    <h3 className="text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="The best historical setting is not automatically the best setting">
                If a 17/43 crossover dramatically outperforms 16/42 and 18/44
                in a small sample, that may be a reason for additional
                investigation rather than evidence that you discovered a
                uniquely superior parameter combination.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              19 — BACKTESTING
          ================================================= */}

          <section
            id="moving-average-backtesting"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — Backtesting</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Backtest a Moving Average Crossover Strategy
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                One advantage of a crossover strategy is that its rules can be
                defined relatively objectively, making it suitable for
                systematic testing. The definitions should still be fixed
                before evaluating the results.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Define the Averages",
                    text: "SMA or EMA? What are the exact fast and slow moving average periods?",
                  },
                  {
                    n: "02",
                    title: "Define the Cross",
                    text: "Does the signal require a candle close or does an intrabar crossover count?",
                  },
                  {
                    n: "03",
                    title: "Define the Filters",
                    text: "Specify any trend, market structure, or higher-timeframe filters in advance.",
                  },
                  {
                    n: "04",
                    title: "Define Entry",
                    text: "Will you enter immediately, wait for confirmation, or use a pullback?",
                  },
                  {
                    n: "05",
                    title: "Define Exit",
                    text: "Specify the stop, target, trailing method, or opposite crossover rule.",
                  },
                  {
                    n: "06",
                    title: "Include Costs",
                    text: "Model spread, commission, and slippage as realistically as possible.",
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

              <div className="mt-7 rounded-[24px] bg-slate-950 p-5 text-white sm:p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-300">
                  WHAT TO RECORD
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    "Number of Trades",
                    "Win Rate",
                    "Average Win / Loss",
                    "Expectancy",
                    "Maximum Drawdown",
                    "Profit Factor",
                    "Market Regime",
                    "Trading Costs",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-[11px] font-bold text-slate-200 sm:text-[12px]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <ImportantBox title="Test across more than one market condition">
                Testing only during a strong trend can hide the strategy's
                whipsaw problem. Include bullish trends, bearish trends,
                sideways markets, and different volatility environments to
                develop a more realistic picture of how the system behaves.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              20 — TRADING PLAN
          ================================================= */}

          <section
            id="moving-average-trading-plan"
            className="scroll-mt-24 overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300 sm:text-[11px]">
                  20 — Trading Plan
                </span>
              </div>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-white sm:text-[29px]">
                Example Moving Average Crossover Trading Plan
              </h2>

              <p className="mt-4 max-w-[1000px] text-[13px] font-medium leading-8 text-slate-300 sm:text-[14px]">
                This is an educational framework for organizing strategy rules,
                not a recommendation to use a particular moving average
                combination. Adjust rules only after systematic testing.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  [
                    "01",
                    "Market",
                    "Define the instrument and timeframe on which the system was tested.",
                  ],
                  [
                    "02",
                    "Moving Averages",
                    "Specify the MA type and exact fast and slow periods in advance.",
                  ],
                  [
                    "03",
                    "Market Filter",
                    "Define when trading is allowed and how a ranging market is identified.",
                  ],
                  [
                    "04",
                    "Entry",
                    "Write an objective crossover definition and any confirmation requirements.",
                  ],
                  [
                    "05",
                    "Invalidation",
                    "Identify the stop-loss level before calculating position size.",
                  ],
                  [
                    "06",
                    "Exit",
                    "Define the target, trailing method, or opposite crossover exit rule.",
                  ],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-[18px] border border-white/10 bg-white/5 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-blue-300">
                        {n}
                      </span>

                      <h3 className="text-[12px] font-black text-white">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-300 sm:text-[12px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              21 — CHECKLIST
          ================================================= */}

          <section
            id="checklist"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>21 — Pre-Trade Checklist</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Moving Average Crossover Trading Checklist
              </h2>

              <div className="mt-7 grid gap-3 lg:grid-cols-2">
                {[
                  "Are the moving average type and periods defined in advance?",
                  "Has the crossover completed according to the strategy rules?",
                  "Is the slow moving average clearly sloping or mostly flat?",
                  "Is the market trending or moving inside a range?",
                  "Does price structure support the direction of the crossover?",
                  "Does the system require a higher-timeframe trend filter?",
                  "Is the technical invalidation level clear?",
                  "Is the stop loss based on the rules rather than an arbitrary distance?",
                  "Does position size keep risk within the predefined limit?",
                  "Is the target or exit rule defined before entry?",
                  "Are spread and expected trading costs acceptable?",
                  "Does the trade match the rules that were actually backtested?",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[12px] font-bold leading-7 text-slate-700 sm:text-[13px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              22 — COMPARISON
          ================================================= */}

          <section
            id="moving-average-strategy-comparison"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>22 — Strategy Comparison</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Moving Average Crossover vs Other Trading Strategies
              </h2>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[1fr_1.3fr_1.3fr_1.3fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>Strategy</div>
                  <div>Core Idea</div>
                  <div>Potential Strength</div>
                  <div>Main Challenge</div>
                </div>

                {[
                  [
                    "MA Crossover",
                    "Relationship between a fast and slow moving average",
                    "Relatively objective rules that are easy to test",
                    "Lag and whipsaw",
                  ],
                  [
                    "Price Action",
                    "Price movement, candlesticks, and market structure",
                    "Responds directly to price behavior",
                    "Can involve more discretionary interpretation",
                  ],
                  [
                    "Trend Following",
                    "Participating in sustained directional movement",
                    "Can capture extended trends",
                    "Ranges can produce repeated losing signals",
                  ],
                  [
                    "Support & Resistance",
                    "Price reactions around important areas",
                    "Provides useful context for entries, invalidation, and targets",
                    "Levels do not guarantee a reaction",
                  ],
                ].map(([strategy, idea, strength, challenge]) => (
                  <div
                    key={strategy}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[1fr_1.3fr_1.3fr_1.3fr]"
                  >
                    <div className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                      {strategy}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600">
                      {idea}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600">
                      {strength}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600">
                      {challenge}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              23 — RELATED CONCEPTS
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>23 — Build the Strategy</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Tools and Strategies to Combine With MA Crossovers
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px]">
                A crossover can be studied as a standalone system or as one
                component of a broader trading framework. These related guides
                approach market context from different angles.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    href: "/en/strategies/trend-following",
                    title: "Trend Following",
                    text: "Understand the broader logic behind participating in sustained trends rather than predicting exact turning points.",
                  },
                  {
                    href: "/en/strategies/price-action",
                    title: "Price Action",
                    text: "Use price behavior and market structure as additional context instead of relying on the crossover alone.",
                  },
                  {
                    href: "/en/strategies/support-and-resistance",
                    title: "Support and Resistance",
                    text: "Identify important price areas that can help frame entries, invalidation levels, and potential targets.",
                  },
                  {
                    href: "/en/strategies/rsi",
                    title: "RSI Strategy",
                    text: "Study momentum as an additional filter while testing whether it genuinely improves the underlying crossover system.",
                  },
                  {
                    href: "/en/strategies/swing-trading",
                    title: "Swing Trading",
                    text: "Explore a trading style that can use medium- and longer-term moving averages to follow multi-session moves.",
                  },
                  {
                    href: "/en/strategies/scalping",
                    title: "Scalping",
                    text: "Understand the challenges of fast signals when market noise, spreads, commissions, and execution matter more.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
                        {item.title}
                      </h3>

                      <span className="text-[15px] font-black text-slate-300 transition group-hover:text-[#1E5BB8]">
                        →
                      </span>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              24 — BEGINNER ROADMAP
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>24 — Beginner Roadmap</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                How to Learn the Moving Average Crossover Strategy
              </h2>

              <div className="mt-7 grid gap-4 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Understand Moving Averages",
                    text: "Learn how moving averages react to price and understand the practical difference between SMA and EMA.",
                  },
                  {
                    n: "02",
                    title: "Observe Crossovers",
                    text: "Practice identifying bullish and bearish crossovers on historical charts without taking trades.",
                  },
                  {
                    n: "03",
                    title: "Classify Market Conditions",
                    text: "Compare how the averages behave during clean trends, ranges, and whipsaw conditions.",
                  },
                  {
                    n: "04",
                    title: "Test and Record",
                    text: "Create fixed rules and record results before considering the strategy for live trading.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="relative rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <span className="text-[24px] font-black text-slate-200">
                      {item.n}
                    </span>

                    <h3 className="mt-2 text-[13px] font-black text-slate-950 sm:text-[14px]">
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
              25 — FAQ
          ================================================= */}

          <section
            id="faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>25 — Frequently Asked Questions</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Moving Average Crossover Strategy FAQ
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

                        <h3 className="text-[12px] font-black leading-6 text-slate-900 sm:text-[14px]">
                          {item.question}
                        </h3>
                      </div>

                      <span className="text-lg font-bold text-slate-400 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 px-4 py-4 sm:px-5">
                      <p className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              26 — SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>26 — Key Takeaways</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                What to Remember About Moving Average Crossovers
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "A moving average crossover is a trend-following approach based on historical price data.",
                  "The fast moving average responds more quickly, while the slow moving average is smoother and more delayed.",
                  "EMA gives greater weight to recent prices, while SMA gives equal weight to each observation in its calculation window.",
                  "A bullish crossover occurs when the fast MA moves above the slow MA; a bearish crossover is the opposite.",
                  "9/21, 20/50, and 50/200 are examples, not universally optimal or guaranteed settings.",
                  "Whipsaw in sideways markets is one of the strategy's most important weaknesses.",
                  "Filters and confirmation rules can change results, but they do not eliminate losing trades and must be tested.",
                  "Stop-loss placement, position sizing, and risk management are part of the strategy rather than optional additions.",
                  "Backtesting should use fixed rules, realistic costs, and multiple market conditions.",
                  "Avoid overfitting when searching historical data for the best moving average periods.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                      ✓
                    </span>

                    <p className="text-[12px] font-medium leading-7 text-slate-700 sm:text-[13px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              27 — RELATED STRATEGIES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>27 — Related Strategies</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.35] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Continue Learning Forex Trading Strategies
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    href: "/en/strategies/trend-following",
                    title: "Trend Following",
                    text: "Learn how trend-following strategies approach sustained directional moves.",
                  },
                  {
                    href: "/en/strategies/price-action",
                    title: "Price Action",
                    text: "Learn to read price movement, candlesticks, and market structure.",
                  },
                  {
                    href: "/en/strategies/support-and-resistance",
                    title: "Support & Resistance",
                    text: "Learn how traders identify and use important price zones.",
                  },
                  {
                    href: "/en/strategies/rsi",
                    title: "RSI Strategy",
                    text: "Explore momentum and Relative Strength Index trading concepts.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <h3 className="text-[13px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-500 sm:text-[12px]">
                      {item.text}
                    </p>

                    <div className="mt-4 text-[10px] font-black text-[#1E5BB8]">
                      Read strategy →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] bg-slate-950 shadow-sm">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-300">
                  BROKER ALARAB TRADING STRATEGIES
                </div>

                <h2 className="mt-3 max-w-[850px] text-[23px] font-black leading-[1.35] text-white sm:text-[30px]">
                  Build a Trading Plan, Not Just a Crossover Signal
                </h2>

                <p className="mt-3 max-w-[900px] text-[12px] font-medium leading-7 text-slate-300 sm:text-[13px]">
                  Explore our trading strategy guides and compare moving average
                  crossovers with Price Action, Trend Following, Support and
                  Resistance, RSI, Smart Money Concepts, and other approaches.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  href="/en/strategies"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-5 py-3 text-[11px] font-black text-slate-950 transition hover:bg-slate-100 sm:text-[12px]"
                >
                  Explore All Strategies
                </Link>

                <Link
                  href="/en/strategies/trend-following"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-black text-white transition hover:bg-white/10 sm:text-[12px]"
                >
                  Trend Following Strategy
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <div className="px-2 py-1 text-center text-[10px] font-medium leading-6 text-slate-500 sm:px-8 sm:text-[11px]">
            This content is provided for educational purposes only and does not
            constitute investment advice or a trading recommendation. Leveraged
            trading involves substantial risk and may result in the loss of
            capital. No trading strategy, indicator, or moving average
            combination can guarantee profitable results.
          </div>
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