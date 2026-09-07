import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/moving-average-crossover`;
const EN_PAGE_URL = `${BASE_URL}/en/strategies/moving-average-crossover`;

const PAGE_TITLE =
  "استراتيجية تقاطع المتوسطات المتحركة Moving Average Crossover";

const PAGE_DESCRIPTION =
  "شرح استراتيجية تقاطع المتوسطات المتحركة Moving Average Crossover في التداول والفوركس: الفرق بين SMA وEMA، المتوسط السريع والبطيء، إشارات التقاطع الصاعد والهابط، الإعدادات، تأكيد الدخول، وقف الخسارة وإدارة المخاطر.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "تقاطع المتوسطات المتحركة",
    "استراتيجية تقاطع المتوسطات المتحركة",
    "استراتيجية المتوسطات المتحركة",
    "المتوسطات المتحركة في التداول",
    "المتوسطات المتحركة في الفوركس",
    "استراتيجية الموفينج افريج",
    "تقاطع الموفينج افريج",
    "استراتيجية تقاطع الموفينج",
    "تقاطع EMA",
    "تقاطع SMA",
    "استراتيجية EMA",
    "استراتيجية SMA",
    "تقاطع المتوسط السريع والبطيء",
    "Moving Average Crossover",
    "Moving Average Crossover Strategy",
    "Moving Average Strategy",
    "Forex Moving Average Crossover",
    "EMA Crossover Strategy",
    "SMA Crossover Strategy",
    "Fast Moving Average",
    "Slow Moving Average",
    "Golden Cross",
    "Death Cross",
    "9 21 EMA crossover",
    "20 50 moving average crossover",
    "50 200 moving average crossover",
    "trend following strategy",
    "moving average whipsaw",
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      ar: PAGE_URL,
      en: EN_PAGE_URL,
      "x-default": EN_PAGE_URL,
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
    locale: "ar_AR",
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
    question: "ما هي استراتيجية تقاطع المتوسطات المتحركة؟",
    answer:
      "هي استراتيجية Trend Following تستخدم متوسطين متحركين بفترتين مختلفتين. عندما يتقاطع المتوسط الأسرع فوق المتوسط الأبطأ يسمى ذلك Bullish Crossover، وعندما يتقاطع تحته يسمى Bearish Crossover. التقاطع يشير إلى تغير في العلاقة بين الزخم قصير وطويل المدى لكنه لا يضمن استمرار الحركة.",
  },
  {
    question: "ما الفرق بين المتوسط السريع والمتوسط البطيء؟",
    answer:
      "المتوسط السريع يستخدم عددًا أقل من الفترات ويتفاعل مع تغير السعر بسرعة أكبر، بينما المتوسط البطيء يستخدم عددًا أكبر من الفترات ويكون أكثر سلاسة وأبطأ في الاستجابة.",
  },
  {
    question: "ما الفرق بين SMA وEMA؟",
    answer:
      "SMA يعطي وزنًا متساويًا للأسعار المستخدمة في الحساب، بينما EMA يعطي وزنًا أكبر للأسعار الأحدث، لذلك يتفاعل عادة بسرعة أكبر مع تغيرات السعر ولكنه قد يتأثر أيضًا بالضوضاء قصيرة المدى بصورة أكبر.",
  },
  {
    question: "ما هو Bullish Moving Average Crossover؟",
    answer:
      "يحدث عندما يتحرك المتوسط السريع من أسفل المتوسط البطيء إلى أعلاه. يستخدمه بعض المتداولين كإشارة محتملة إلى تحسن الاتجاه أو الزخم الصعودي، لكنه يحتاج إلى سياق وقواعد دخول وإلغاء واضحة.",
  },
  {
    question: "ما هو Bearish Moving Average Crossover؟",
    answer:
      "يحدث عندما يعبر المتوسط السريع من أعلى المتوسط البطيء إلى أسفله، وقد يستخدم كإشارة محتملة إلى تحول هبوطي أو ضعف الاتجاه الصاعد.",
  },
  {
    question: "ما هي أفضل إعدادات Moving Average Crossover؟",
    answer:
      "لا توجد إعدادات مثالية لكل الأسواق والأطر الزمنية. أزواج مثل 9/21 و20/50 و50/200 تستخدم كأمثلة شائعة، لكن اختيار الفترات يجب أن يتوافق مع الإطار الزمني ونمط التداول ويتم اختباره تاريخيًا.",
  },
  {
    question: "ما هو Golden Cross؟",
    answer:
      "Golden Cross هو اسم يستخدم غالبًا عندما يعبر متوسط أقصر مثل 50-period فوق متوسط أطول مثل 200-period. لأنه يعتمد على متوسطات طويلة فهو عادة إشارة متأخرة نسبيًا ولا يعني أن السعر سيواصل الصعود.",
  },
  {
    question: "ما هو Death Cross؟",
    answer:
      "Death Cross هو التقاطع المعاكس، ويستخدم غالبًا لوصف عبور متوسط 50-period أسفل متوسط 200-period. هو إشارة Trend Following متأخرة وليس ضمانًا لهبوط مستقبلي.",
  },
  {
    question: "لماذا تفشل استراتيجية تقاطع المتوسطات في السوق الجانبي؟",
    answer:
      "عندما يتحرك السعر بدون اتجاه واضح، يمكن أن تتقاطع المتوسطات مرات عديدة خلال فترة قصيرة. يعرف هذا باسم Whipsaw وقد ينتج عنه عدد كبير من الإشارات المتأخرة أو الخاطئة.",
  },
  {
    question: "هل استراتيجية Moving Average Crossover مربحة؟",
    answer:
      "لا توجد استراتيجية تضمن الربح. النتيجة تعتمد على الإعدادات، حالة السوق، قواعد التأكيد والخروج، تكاليف التداول وإدارة المخاطر. لذلك يجب اختبار القواعد على عينة مناسبة قبل استخدامها.",
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
      aria-label="تقاطع متوسط متحرك سريع فوق متوسط متحرك بطيء"
    >
      <defs>
        <pattern
          id="maHeroGridAr"
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
      <rect width="760" height="430" fill="url(#maHeroGridAr)" />

      {/* Candles */}
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
      aria-label="تقاطع صاعد بين متوسط متحرك سريع وبطيء"
    >
      <defs>
        <pattern
          id="maHeroMobileGridAr"
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
      <rect width="520" height="285" fill="url(#maHeroMobileGridAr)" />

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
      aria-label="مقارنة بين المتوسط المتحرك السريع والمتوسط المتحرك البطيء"
    >
      <defs>
        <pattern
          id={fullscreen ? "fastSlowGridFullAr" : "fastSlowGridAr"}
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
        fill={`url(#${fullscreen ? "fastSlowGridFullAr" : "fastSlowGridAr"})`}
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
        فترة أقصر · استجابة أسرع للسعر
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
        فترة أطول · حركة أكثر سلاسة
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
          aria-label="إغلاق الرسم"
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
      <div
        dir="ltr"
        className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block"
      >
        {chart}
      </div>

      <a
        href="#fast-slow-ma-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير مقارنة المتوسط السريع والبطيء"
      >
        <div
          dir="ltr"
          className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white"
        >
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>اسحب لاستكشاف الرسم · اضغط للتكبير</span>
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
      aria-label="مقارنة بين المتوسط المتحرك البسيط SMA والمتوسط الأسي EMA"
    >
      <defs>
        <pattern
          id={fullscreen ? "smaEmaGridFullAr" : "smaEmaGridAr"}
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
        fill={`url(#${fullscreen ? "smaEmaGridFullAr" : "smaEmaGridAr"})`}
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
        نفس حركة السعر · استجابة مختلفة للبيانات الحديثة
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

      {/* SMA */}
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

      {/* EMA */}
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
          aria-label="إغلاق الرسم"
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
      <div
        dir="ltr"
        className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block"
      >
        {chart}
      </div>

      <a
        href="#sma-ema-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير مقارنة SMA وEMA"
      >
        <div
          dir="ltr"
          className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white"
        >
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>اسحب لاستكشاف الرسم · اضغط للتكبير</span>
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
      aria-label="مقارنة بين التقاطع الصاعد والتقاطع الهابط للمتوسطات المتحركة"
    >
      <defs>
        <pattern
          id={fullscreen ? "crossTypesGridFullAr" : "crossTypesGridAr"}
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
        fill={`url(#${fullscreen ? "crossTypesGridFullAr" : "crossTypesGridAr"})`}
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
          aria-label="إغلاق الرسم"
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
      <div
        dir="ltr"
        className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block"
      >
        {chart}
      </div>

      <a
        href="#bullish-bearish-cross-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير رسم التقاطع الصاعد والهابط"
      >
        <div
          dir="ltr"
          className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white"
        >
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>اسحب لاستكشاف الرسم · اضغط للتكبير</span>
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
      aria-label="مقارنة أداء تقاطع المتوسطات في السوق الجانبي مقابل السوق ذي الاتجاه"
    >
      <defs>
        <pattern
          id={fullscreen ? "whipsawGridFullAr" : "whipsawGridAr"}
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
        fill={`url(#${fullscreen ? "whipsawGridFullAr" : "whipsawGridAr"})`}
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
        تكرار التقاطعات بدون اتجاه واضح
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
        فصل أوضح بين المتوسطين
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
          aria-label="إغلاق الرسم"
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
      <div
        dir="ltr"
        className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block"
      >
        {chart}
      </div>

      <a
        href="#whipsaw-trend-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير مقارنة Whipsaw والسوق ذي الاتجاه"
      >
        <div
          dir="ltr"
          className="ob-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white"
        >
          {chart}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500">
          <span>↔</span>
          <span>اسحب لاستكشاف الرسم · اضغط للتكبير</span>
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
    inLanguage: "ar",
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
        name: "الرئيسية",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "استراتيجيات التداول",
        item: `${BASE_URL}/strategies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "استراتيجية تقاطع المتوسطات المتحركة",
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
      dir="rtl"
      className="min-h-screen bg-slate-50/40 pb-6 text-right md:pb-10"
    >
      <FastVsSlowMAChart fullscreen />
      <SmaVsEmaChart fullscreen />
      <BullishBearishCrossChart fullscreen />
      <WhipsawTrendChart fullscreen />

      <div className="mx-auto max-w-[1520px] px-3 sm:px-5 lg:px-8">
        {/* =================================================
            BREADCRUMBS
        ================================================= */}

        <nav
          aria-label="مسار الصفحة"
          className="flex flex-wrap items-center gap-2 py-4 text-[10px] font-bold text-slate-500 sm:py-5 sm:text-[11px]"
        >
          <a href="/" className="transition hover:text-[#1E5BB8]">
            الرئيسية
          </a>

          <span>/</span>

          <a
            href="/strategies"
            className="transition hover:text-[#1E5BB8]"
          >
            استراتيجيات التداول
          </a>

          <span>/</span>

          <span className="text-slate-800">
            تقاطع المتوسطات المتحركة
          </span>
        </nav>

        {/* =================================================
            HERO — DESKTOP
        ================================================= */}

        <section className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)] lg:block">
          <div
            dir="ltr"
            className="grid min-h-[420px] grid-cols-[0.9fr_1.1fr]"
          >
            <div className="border-r border-slate-200">
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

            <div
              dir="rtl"
              className="flex flex-col justify-center p-9 text-right xl:p-12"
            >
              <div className="mb-5 flex flex-wrap justify-start gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[9px] font-black text-[#1E5BB8]">
                  استراتيجية تداول
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                  Trend Following
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                  مبتدئ – متوسط
                </span>
              </div>

              <h1 className="max-w-[840px] text-[38px] font-black leading-[1.2] tracking-[-0.035em] text-slate-950 xl:text-[46px]">
                استراتيجية تقاطع المتوسطات المتحركة
                <span
                  dir="ltr"
                  className="mt-1 block text-[#1E5BB8]"
                >
                  Moving Average Crossover
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-[14px] font-medium leading-8 text-slate-600 xl:text-[15px]">
                دليل عملي لفهم المتوسط السريع والبطيء، الفرق بين SMA وEMA،
                التقاطع الصاعد والهابط، إعدادات المتوسطات، Whipsaw، شروط
                الدخول والخروج وإدارة المخاطر.
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
                    dir="ltr"
                    className="rounded-lg bg-slate-100 px-3 py-2 text-[9px] font-black text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-5 text-[10px] font-bold text-slate-500">
                <span>محدث سبتمبر 2026</span>
                <span>•</span>
                <span>شرح خطوة بخطوة</span>
                <span>•</span>
                <span>أمثلة بشموع ومتوسطات</span>
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
                استراتيجية تداول
              </span>

              <span
                dir="ltr"
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[8px] font-black text-slate-600"
              >
                Trend Following
              </span>
            </div>

            <h1 className="mt-4 text-[27px] font-black leading-[1.2] tracking-[-0.03em] text-slate-950 sm:text-[32px]">
              استراتيجية تقاطع المتوسطات المتحركة
              <span
                dir="ltr"
                className="block text-[#1E5BB8]"
              >
                Moving Average Crossover
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              تعرف على Fast MA وSlow MA، إشارات Bullish وBearish Crossover
              وكيفية تجنب الإشارات الضعيفة في الأسواق الجانبية.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Fast MA", "Slow MA", "SMA", "EMA", "Crossover"].map(
                (item) => (
                  <span
                    key={item}
                    dir="ltr"
                    className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[8px] font-black text-slate-600"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 text-[9px] font-bold leading-5 text-slate-500">
              محدث سبتمبر 2026 · مناسب للمبتدئين والمتوسطين
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
              <SectionLabel>مقدمة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما هي استراتيجية تقاطع المتوسطات المتحركة؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>
                    استراتيجية تقاطع المتوسطات المتحركة Moving Average
                    Crossover
                  </strong>{" "}
                  هي طريقة Trend Following تستخدم متوسطين متحركين بفترات
                  مختلفة لمراقبة تغير العلاقة بين حركة السعر قصيرة المدى
                  والاتجاه الأكثر بطئًا.
                </p>

                <p>
                  المتوسط الذي يستخدم عددًا أقل من الشموع يسمى عادة{" "}
                  <strong>Fast Moving Average</strong> لأنه يتفاعل بسرعة أكبر
                  مع تغير السعر، بينما يستخدم <strong>Slow Moving Average</strong>{" "}
                  فترة أطول ويكون أكثر سلاسة وأقل حساسية للحركات القصيرة.
                </p>

                <p>
                  عندما يعبر المتوسط السريع من أسفل المتوسط البطيء إلى أعلاه
                  يسمى ذلك <strong>Bullish Crossover</strong>. وعندما يعبر
                  من الأعلى إلى الأسفل يسمى <strong>Bearish Crossover</strong>.
                </p>

                <p>
                  لكن التقاطع لا يتنبأ بالمستقبل. المتوسطات المتحركة محسوبة
                  من أسعار سابقة، ولذلك فهي <strong>Lagging Indicators</strong>.
                  لهذا قد يبدأ الاتجاه بالفعل قبل ظهور Cross على الشارت.
                </p>
              </div>

              <ImportantBox title="التقاطع يؤكد تغيرًا حدث بالفعل ولا يتنبأ بالقمة أو القاع">
                الهدف من Moving Average Crossover ليس العثور على نقطة التحول
                الدقيقة، بل إنشاء قاعدة منظمة تساعد المتداول على المشاركة في
                جزء من اتجاه محتمل إذا استمرت الحركة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — HOW MOVING AVERAGES WORK
          ================================================= */}

          <section
            id="moving-average-basics"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — الأساس</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما هو المتوسط المتحرك Moving Average؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  المتوسط المتحرك هو خط يتم حسابه باستخدام مجموعة من أسعار
                  السوق السابقة. يتغير الخط مع كل شمعة جديدة، ويهدف إلى
                  <strong> تنعيم حركة السعر</strong> حتى يصبح الاتجاه العام
                  أسهل في القراءة.
                </p>

                <p>
                  على سبيل المثال، Moving Average لفترة 20 يعتمد على آخر 20
                  فترة وفق طريقة الحساب المختارة. وعند ظهور شمعة جديدة تدخل
                  بيانات جديدة في الحساب وتتحرك قيمة المتوسط.
                </p>

                <p>
                  كلما كانت الفترة أقصر أصبح المتوسط أكثر قربًا من السعر وأكثر
                  سرعة، بينما المتوسطات ذات الفترات الأطول تتحرك بصورة أكثر
                  سلاسة لكنها تتأخر أكثر في الاستجابة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "تنعيم السعر",
                    text: "يقلل المتوسط بعض الضوضاء البصرية الموجودة في حركة الشموع الخام.",
                  },
                  {
                    n: "02",
                    title: "قراءة الاتجاه",
                    text: "ميل المتوسط وموقع السعر بالنسبة إليه يمكن أن يساعدا في تنظيم سياق الاتجاه.",
                  },
                  {
                    n: "03",
                    title: "إنشاء إشارات",
                    text: "يمكن مقارنة متوسطين بفترتين مختلفتين لإنشاء Bullish أو Bearish Crossover.",
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

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                الفرق بين المتوسط المتحرك السريع والبطيء
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                تقاطع المتوسطات يحتاج متوسطين بسرعتين مختلفتين. الفرق بينهما
                لا يتعلق فقط بالشكل، بل بمقدار البيانات التي تدخل في الحساب
                ومدى سرعة الخط في التفاعل مع آخر تغيرات السعر.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    FAST MA
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    المتوسط السريع
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يستخدم فترة أقصر ويتفاعل بسرعة أكبر مع تغير السعر. هذه
                    السرعة تسمح بإشارات مبكرة نسبيًا لكنها قد تزيد الحساسية
                    للتذبذب والضوضاء.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    SLOW MA
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    المتوسط البطيء
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يستخدم فترة أطول ويكون أكثر سلاسة. يتفاعل ببطء أكبر مع
                    تغير السعر لذلك قد يوفر سياقًا أكثر استقرارًا لكنه يأتي
                    بتأخر أكبر.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <FastVsSlowMAChart />
              </div>

              <ImportantBox title="المتوسط الأسرع ليس بالضرورة أفضل">
                تقليل فترة المتوسط قد يجعل الإشارة تظهر أسرع، لكنه قد يزيد
                أيضًا عدد التقاطعات القصيرة داخل الأسواق المتذبذبة. السرعة
                والضوضاء Trade-Off يجب اختباره بدل افتراض أن الأسرع أفضل.
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

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                الفرق بين SMA وEMA في استراتيجية التقاطع
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  أكثر نوعين استخدامًا في استراتيجيات Moving Average Crossover
                  هما <strong>Simple Moving Average — SMA</strong> و
                  <strong> Exponential Moving Average — EMA</strong>.
                </p>

                <p>
                  SMA يعطي وزنًا متساويًا لكل سعر يدخل في الفترة الحسابية،
                  بينما EMA يعطي وزنًا أكبر للأسعار الحديثة. لهذا يتحرك EMA
                  عادة أسرع عند تغير الاتجاه.
                </p>

                <p>
                  هذه السرعة ليست ميزة مطلقة. EMA قد يعطي إشارة مبكرة نسبيًا
                  لكنه قد يتفاعل أيضًا مع تحركات قصيرة لا تتحول إلى اتجاه
                  مستمر، بينما SMA يكون أكثر سلاسة لكنه يتأخر أكثر.
                </p>
              </div>

              <div className="mt-7">
                <SmaVsEmaChart />
              </div>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.85fr_1.25fr_1.4fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>النوع</div>
                  <div>السلوك</div>
                  <div>المقابل</div>
                </div>

                {[
                  [
                    "SMA",
                    "أكثر سلاسة ويعطي وزنًا متساويًا للفترات.",
                    "قد يكون أبطأ عند حدوث تغير سريع في السعر.",
                  ],
                  [
                    "EMA",
                    "يعطي وزنًا أكبر للأسعار الحديثة ويستجيب أسرع.",
                    "قد يتفاعل أكثر مع الضوضاء والتحركات القصيرة.",
                  ],
                ].map(([type, behavior, tradeoff]) => (
                  <div
                    key={type}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.85fr_1.25fr_1.4fr]"
                  >
                    <div
                      dir="ltr"
                      className="text-right text-[12px] font-black text-slate-950 sm:text-[13px]"
                    >
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
              <SectionLabel>04 — إشارات التقاطع</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                التقاطع الصاعد Bullish والتقاطع الهابط Bearish
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                الإشارة الأساسية في الاستراتيجية بسيطة: نراقب أي متوسط أصبح
                أعلى من الآخر. لكن الإشارة لا تعني بالضرورة أن الصفقة يجب أن
                تفتح فورًا.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    BULLISH CROSSOVER
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    المتوسط السريع يعبر فوق البطيء
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يشير إلى أن متوسط السعر قصير المدى أصبح أعلى من المتوسط
                    الأطول، وقد يستخدم كدليل على تحسن الزخم أو اتجاه صعودي
                    محتمل.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    BEARISH CROSSOVER
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    المتوسط السريع يعبر أسفل البطيء
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يشير إلى ضعف نسبي في متوسط السعر قصير المدى مقارنة
                    بالمتوسط الأطول، وقد يستخدم كدليل على تحول هبوطي محتمل.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <BullishBearishCrossChart />
              </div>

              <ImportantBox title="التقاطع إشارة Trend Following وليس Prediction">
                عندما يحدث Cross تكون بيانات السعر التي أدت إليه قد حدثت
                بالفعل. لذلك من الطبيعي أن يظهر التقاطع بعد القاع أو القمة
                بوقت، وهذا جزء من طبيعة Moving Average كأداة متأخرة.
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
              <SectionLabel>05 — الإعدادات</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أشهر إعدادات Moving Average Crossover
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  توجد عشرات التركيبات الممكنة للمتوسطات، ولا يوجد زوج فترات
                  واحد يعمل بأفضل صورة في كل سوق وكل Timeframe.
                </p>

                <p>
                  الإعدادات الأقصر عادة تنتج Cross أسرع وعدد إشارات أكبر،
                  بينما الإعدادات الأطول تنتج إشارات أقل وأكثر تأخرًا.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.75fr_1fr_1.45fr_1.25fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>مثال</div>
                  <div>السرعة</div>
                  <div>الاستخدام الشائع</div>
                  <div>المقابل</div>
                </div>

                {[
                  [
                    "9 / 21",
                    "سريعة",
                    "تستخدم أحيانًا في أطر قصيرة ومتوسطة.",
                    "إشارات أكثر وضوضاء أكبر.",
                  ],
                  [
                    "20 / 50",
                    "متوسطة",
                    "مثال متوازن نسبيًا لتتبع الاتجاه.",
                    "تأخر أكبر من الأزواج القصيرة.",
                  ],
                  [
                    "50 / 200",
                    "بطيئة",
                    "تستخدم غالبًا لتقييم اتجاهات أطول.",
                    "إشارة متأخرة وقد تفوت جزءًا كبيرًا من الحركة.",
                  ],
                ].map(([pair, speed, use, tradeoff]) => (
                  <div
                    key={pair}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.75fr_1fr_1.45fr_1.25fr]"
                  >
                    <div
                      dir="ltr"
                      className="text-right text-[12px] font-black text-slate-950 sm:text-[13px]"
                    >
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

              <ImportantBox title="لا يوجد Best Moving Average Crossover Setting للجميع">
                9/21 أو 20/50 أو 50/200 أمثلة معروفة وليست وصفة مضمونة.
                الإعداد الأنسب يعتمد على السوق، Timeframe، نوع المتوسط وقواعد
                الدخول والخروج، ويجب اختباره قبل اعتماده.
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
              <SectionLabel>06 — Golden &amp; Death Cross</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما هو Golden Cross وما هو Death Cross؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  مصطلحا <strong>Golden Cross</strong> و
                  <strong> Death Cross</strong> يستخدمان غالبًا مع متوسطات
                  طويلة نسبيًا، وأشهر مثال لهما هو 50-period و200-period.
                </p>

                <p>
                  Golden Cross يحدث عندما يعبر المتوسط الأقصر فوق المتوسط
                  الأطول، بينما Death Cross يحدث عند عبوره إلى الأسفل.
                </p>

                <p>
                  لأن المتوسطات المستخدمة طويلة، فإن الإشارة تأتي غالبًا بعد
                  أن تكون حركة كبيرة نسبيًا قد بدأت بالفعل. لذلك يستخدمها بعض
                  المتداولين كـTrend Regime أو تأكيد للاتجاه أكثر من كونها
                  Entry دقيقة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    GOLDEN CROSS
                  </span>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    50 MA فوق 200 MA
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    مثال شائع على تحول طويل المدى باتجاه أكثر إيجابية، لكنه
                    لا يضمن استمرار الصعود.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    DEATH CROSS
                  </span>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    50 MA أسفل 200 MA
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    مثال شائع على تحول طويل المدى باتجاه أكثر سلبية، لكنه لا
                    يعني أن السعر سيستمر في الهبوط.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              07 — WHEN IT WORKS BEST
          ================================================= */}

          <section
            id="moving-average-trending-market"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — حالة السوق</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                متى تعمل استراتيجية تقاطع المتوسطات بشكل أفضل؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  Moving Average Crossover هي بالأساس{" "}
                  <strong>Trend Following Strategy</strong>. لذلك تكون فكرتها
                  أكثر منطقية عندما يستطيع السوق تطوير اتجاه مستمر نسبيًا بعد
                  حدوث التقاطع.
                </p>

                <p>
                  في الاتجاه الواضح يبدأ المتوسط السريع بالابتعاد عن البطيء
                  بعد Cross، وقد يبقى الترتيب بينهما مستقرًا لعدد كبير من
                  الشموع.
                </p>

                <p>
                  المشكلة تظهر عندما لا يوجد اتجاه واضح وتتحرك المتوسطات
                  بصورة مسطحة ومتداخلة.
                </p>
              </div>

              <ImportantBox title="الاستراتيجية لا تحتاج توقع بداية الاتجاه بدقة">
                نظام Trend Following يقبل عادة الدخول بعد بدء الحركة مقابل
                محاولة البقاء داخل الاتجاه إذا استمر. هذا الـLag ليس خطأ
                برمجيًا في المتوسط؛ هو نتيجة طبيعية لاستخدام بيانات تاريخية.
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

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                لماذا تفشل التقاطعات في الأسواق الجانبية؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  أكبر مشكلة في Moving Average Crossover هي ما يعرف باسم{" "}
                  <strong>Whipsaw</strong>. يحدث عندما لا يملك السوق اتجاهًا
                  مستمرًا وتبدأ المتوسطات بالتقاطع ذهابًا وإيابًا خلال فترة
                  قصيرة.
                </p>

                <p>
                  قد ينتج عن ذلك Bullish Cross ثم Bearish Cross ثم Bullish
                  Cross آخر بدون حركة كافية لتعويض الخسائر وتكاليف التنفيذ.
                </p>

                <p>
                  لذلك تعتمد كثير من الاستراتيجيات على Market Regime Filter
                  أو Trend Filter أو Price Structure لتجنب بعض ظروف التذبذب.
                </p>
              </div>

              <div className="mt-7">
                <WhipsawTrendChart />
              </div>

              <ImportantBox title="Whipsaw لا يمكن منعه بالكامل">
                أي Trend Following System يمكن أن يعاني خلال الفترات الجانبية.
                الهدف ليس العثور على فلتر يمنع كل صفقة خاسرة، بل تحديد شروط
                واضحة واختبار أثرها على عدد الصفقات والأداء العام.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — FILTERING CROSSES
          ================================================= */}

          <section
            id="moving-average-crossover-filters"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — فلترة الإشارات</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف نقلل إشارات Moving Average Crossover الضعيفة؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا يوجد Filter يزيل جميع الإشارات السيئة. لكن يمكن بناء شروط
                تساعد على منع تداول Cross بصورة آلية في أي حالة سوقية.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Slope Filter",
                    text: "تجنب الإشارة إذا كان المتوسط البطيء مسطحًا تقريبًا بدل وجود ميل واضح.",
                  },
                  {
                    n: "02",
                    title: "Price Structure",
                    text: "راقب ما إذا كان السعر نفسه يدعم اتجاه التقاطع من خلال القمم والقيعان.",
                  },
                  {
                    n: "03",
                    title: "Close Confirmation",
                    text: "يمكن الانتظار حتى إغلاق الشمعة بدل التداول أثناء Cross غير مكتمل.",
                  },
                  {
                    n: "04",
                    title: "Higher Timeframe",
                    text: "يمكن استخدام اتجاه إطار أعلى كفلتر للسماح فقط بالتقاطعات المتوافقة معه.",
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

                      <h3
                        dir="ltr"
                        className="text-right text-[13px] font-black text-slate-950"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="كل Filter له تكلفة">
                إضافة شروط أكثر قد تقلل بعض الصفقات السيئة، لكنها قد تؤخر
                الدخول أو تمنع صفقات ناجحة أيضًا. لذلك يجب تقييم الـFilter على
                نتائج Backtest وليس على مثال واحد.
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

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                متى ندخل بعد تقاطع المتوسطات المتحركة؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يمكن بناء أكثر من Entry Model حول نفس Crossover. أهم شيء هو
                  اختيار تعريف محدد وعدم تغييره بعد رؤية النتيجة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Immediate Cross",
                    text: "الدخول بعد تأكيد إغلاق الشمعة التي اكتمل عندها Cross.",
                    tradeoff:
                      "إشارة مبكرة نسبيًا لكن حساسية أكبر للتقاطع الذي ينعكس سريعًا.",
                  },
                  {
                    n: "02",
                    title: "Price Confirmation",
                    text: "انتظار إغلاق إضافي أو Price Structure يؤكد اتجاه التقاطع.",
                    tradeoff:
                      "تأكيد أكبر لكن دخول أكثر تأخرًا.",
                  },
                  {
                    n: "03",
                    title: "Pullback Entry",
                    text: "انتظار Cross ثم تصحيح السعر قبل البحث عن دخول مع الاتجاه الجديد.",
                    tradeoff:
                      "قد يوفر نقطة منظمة لكن بعض الاتجاهات لا تعطي Pullback مناسبًا.",
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

                      <h3
                        dir="ltr"
                        className="text-right text-[13px] font-black text-slate-950 sm:text-[14px]"
                      >
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

              <ImportantBox title="لا تدخل أثناء Cross لم يكتمل بعد إذا كانت قواعدك تعتمد على الإغلاق">
                المتوسطات تتحرك مع تغير السعر داخل الشمعة الحالية. قد يبدو
                أن Cross حدث أثناء الشمعة ثم يختفي قبل الإغلاق. إذا كانت
                استراتيجيتك تعتمد على Confirmed Close، التزم به في Backtest
                والتداول.
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
              <SectionLabel>11 — وقف الخسارة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أين نضع Stop Loss في استراتيجية تقاطع المتوسطات؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  التقاطع نفسه لا يحدد تلقائيًا مكان وقف الخسارة. الأفضل أن
                  يرتبط Stop Loss بنقطة <strong>Invalidation</strong> واضحة:
                  مستوى إذا وصل إليه السعر تصبح فكرة الصفقة الأصلية أضعف أو
                  غير صالحة وفق قواعد النظام.
                </p>

                <p>
                  في صفقة شراء بعد Bullish Crossover، يمكن أن تكون نقطة
                  الإلغاء أسفل Swing Low مهم أو أسفل البنية التي اعتمد عليها
                  الدخول. وفي صفقة البيع يمكن استخدام Swing High مناسب.
                </p>

                <p>
                  وضع الوقف مباشرة خلف المتوسط السريع فقط قد يؤدي إلى خروج
                  متكرر بسبب حركة طبيعية حول الخط، خصوصًا في الأسواق
                  المتذبذبة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Structure Stop",
                    text: "وضع الوقف خلف Swing Low في الشراء أو Swing High في البيع عندما تكون البنية جزءًا من منطق الصفقة.",
                  },
                  {
                    n: "02",
                    title: "Volatility Stop",
                    text: "استخدام مقياس للتذبذب مثل ATR لإنشاء مسافة تتكيف مع حركة السوق بدل مسافة ثابتة عشوائية.",
                  },
                  {
                    n: "03",
                    title: "System Exit",
                    text: "بعض الأنظمة تستخدم التقاطع المعاكس كخروج، لكن ذلك قد يترك الصفقة مفتوحة لمسافة كبيرة قبل ظهور الإشارة.",
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

                      <h3
                        dir="ltr"
                        className="text-right text-[13px] font-black text-slate-950 sm:text-[14px]"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="حدد نقطة الإلغاء أولًا ثم احسب حجم الصفقة">
                لا تجعل حجم الصفقة هو الذي يفرض مكان Stop Loss. حدد المستوى
                الذي يلغي الفكرة فنيًا، ثم استخدم المسافة بين الدخول والوقف
                لحساب Position Size بما يتوافق مع مقدار المخاطرة المسموح.
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
              <SectionLabel>12 — الخروج والأهداف</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف نحدد Take Profit والخروج من الصفقة؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا توجد طريقة خروج واحدة مرتبطة بالـMoving Average Crossover.
                يمكن أن يكون النظام مبنيًا على هدف سعري، مستوى فني، Trailing
                Stop أو إشارة معاكسة. المهم أن تكون القاعدة محددة قبل الدخول.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Opposing Structure",
                    text: "استخدام مقاومة أو دعم أو Swing سابق كمنطقة هدف محتملة.",
                  },
                  {
                    title: "Risk / Reward",
                    text: "استخدام نسبة محددة مثل 1:2 كمثال إذا كانت منطقية مع بنية السوق.",
                  },
                  {
                    title: "Trailing Exit",
                    text: "تحريك الخروج مع تطور الاتجاه بدل استخدام هدف ثابت فقط.",
                  },
                  {
                    title: "Opposite Cross",
                    text: "البقاء حتى حدوث تقاطع معاكس وفق نظام Trend Following طويل نسبيًا.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div
                      dir="ltr"
                      className="text-right text-[9px] font-black uppercase tracking-[0.1em] text-[#1E5BB8]"
                    >
                      {item.title}
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="الخروج المبكر والمتأخر لهما Trade-Off">
                الهدف الثابت قد يغلق صفقة قبل استمرار Trend قوي، بينما انتظار
                التقاطع المعاكس قد يعيد جزءًا من الأرباح قبل الخروج. لا توجد
                قاعدة مثالية؛ يجب تقييمها ضمن نتائج النظام كاملة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              13 — MULTI TIMEFRAME
          ================================================= */}

          <section
            id="moving-average-multi-timeframe"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Multi-Timeframe</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                استخدام تقاطع المتوسطات مع أكثر من إطار زمني
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يمكن استخدام إطار زمني أعلى لتحديد الاتجاه العام، ثم البحث
                  عن Crossover على إطار أقل يتوافق مع هذا الاتجاه.
                </p>

                <p>
                  هذه الطريقة لا تجعل الإشارة مضمونة، لكنها تمنع مثلًا شراء
                  كل Bullish Cross صغير بينما الإطار الأعلى يتحرك داخل اتجاه
                  هابط قوي.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Higher Timeframe",
                    subtitle: "السياق",
                    text: "حدد هل الاتجاه الأكبر صاعد أو هابط أو جانبي، وهل المتوسطات نفسها مائلة أم مسطحة.",
                  },
                  {
                    n: "02",
                    title: "Trading Timeframe",
                    subtitle: "الإشارة",
                    text: "راقب Crossover الذي يتوافق مع القواعد التي اختبرتها على الإطار المستخدم للتداول.",
                  },
                  {
                    n: "03",
                    title: "Entry Context",
                    subtitle: "التنفيذ",
                    text: "حدد البنية، نقطة الإلغاء، الوقف والهدف قبل تنفيذ الصفقة.",
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
                        <h3
                          dir="ltr"
                          className="text-right text-[13px] font-black text-slate-950"
                        >
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
              14 — POSITION SIZE
          ================================================= */}

          <section
            id="moving-average-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — إدارة المخاطر</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                إدارة المخاطر وحجم الصفقة Position Sizing
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  حتى إذا كانت قواعد Crossover جيدة تاريخيًا، ستظل هناك
                  صفقات خاسرة وسلاسل خسائر. لذلك لا ينبغي أن يعتمد بقاء الحساب
                  على نجاح الإشارة التالية.
                </p>

                <p>
                  يمكن تحديد نسبة مخاطرة ثابتة من رأس المال لكل صفقة، ثم حساب
                  حجم المركز اعتمادًا على المسافة الفعلية إلى Stop Loss.
                </p>
              </div>

              <div className="mt-7 rounded-[24px] bg-slate-950 p-5 text-white sm:p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-300">
                  POSITION SIZE LOGIC
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-4">
                  {[
                    ["01", "Account Risk", "حدد المبلغ الذي يمكن خسارته في الصفقة."],
                    ["02", "Entry", "حدد سعر الدخول وفق قواعد النظام."],
                    ["03", "Stop Distance", "احسب المسافة إلى نقطة الإلغاء."],
                    ["04", "Position Size", "اضبط الحجم حتى تبقى الخسارة المحتملة ضمن الحد."],
                  ].map(([n, title, text]) => (
                    <div
                      key={n}
                      className="rounded-[18px] border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-blue-300">
                          {n}
                        </span>

                        <span
                          dir="ltr"
                          className="text-[11px] font-black text-white"
                        >
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

              <ImportantBox title="نسبة الفوز وحدها لا تكفي لتقييم الاستراتيجية">
                نظام بنسبة فوز منخفضة قد يظل قابلًا للاختبار إذا كانت الأرباح
                المتوسطة أكبر من الخسائر، والعكس صحيح. لذلك قيّم Expectancy،
                Drawdown، متوسط الربح والخسارة والتكاليف بدل التركيز على Win
                Rate فقط.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              15 — TRADING STYLE SETTINGS
          ================================================= */}

          <section
            id="moving-average-settings-by-style"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — اختيار الفترات</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف تختلف إعدادات المتوسطات حسب أسلوب التداول؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                الأرقام المستخدمة في Moving Average لا تعني الشيء نفسه على
                جميع الأطر الزمنية. MA 20 على شارت 5 دقائق يصف نطاقًا زمنيًا
                مختلفًا تمامًا عن MA 20 على الشارت اليومي.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.9fr_1.2fr_1.4fr_1.3fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>الأسلوب</div>
                  <div>طبيعة المتوسطات</div>
                  <div>الميزة المحتملة</div>
                  <div>المشكلة</div>
                </div>

                {[
                  [
                    "Scalping",
                    "أقصر وأكثر حساسية",
                    "استجابة أسرع للحركة",
                    "Whipsaw وتكاليف تنفيذ أكثر تأثيرًا",
                  ],
                  [
                    "Day Trading",
                    "قصيرة إلى متوسطة",
                    "توازن نسبي بين السرعة والتنعيم",
                    "يتأثر بالـRange داخل الجلسة",
                  ],
                  [
                    "Swing Trading",
                    "متوسطة إلى أطول",
                    "تركيز أكبر على اتجاه ممتد",
                    "دخول وخروج أكثر تأخرًا",
                  ],
                  [
                    "Position Trading",
                    "طويلة",
                    "فلترة قدر أكبر من الضوضاء",
                    "قد تتطلب Stop أوسع وصبرًا أطول",
                  ],
                ].map(([style, nature, benefit, issue]) => (
                  <div
                    key={style}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.9fr_1.2fr_1.4fr_1.3fr]"
                  >
                    <div
                      dir="ltr"
                      className="text-right text-[12px] font-black text-slate-950 sm:text-[13px]"
                    >
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
              <SectionLabel>16 — متى نكون أكثر حذرًا؟</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                حالات قد تكون فيها إشارة Crossover أضعف
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "المتوسطات مسطحة",
                    text: "غياب الميل قد يشير إلى عدم وجود اتجاه مستقر يستفيد منه نظام Trend Following.",
                  },
                  {
                    title: "تقاطعات متكررة",
                    text: "إذا كانت الخطوط تتبادل مواقعها باستمرار فقد يكون السوق داخل Whipsaw.",
                  },
                  {
                    title: "السعر داخل Range",
                    text: "حدود واضحة ومتقاربة قد تجعل الاتجاه غير قادر على التطور بعد Cross.",
                  },
                  {
                    title: "الدخول متأخر جدًا",
                    text: "إذا ابتعد السعر كثيرًا عن المتوسطات بعد حركة قوية فقد يصبح Stop أو Risk/Reward غير مناسب.",
                  },
                  {
                    title: "حدث عالي التذبذب",
                    text: "الحركة المفاجئة قد تغير المتوسطات بسرعة وتنتج إشارة لا تشبه ظروف الاختبار المعتادة.",
                  },
                  {
                    title: "تكاليف مرتفعة",
                    text: "Spread وCommission وSlippage قد تؤثر بشدة على الأنظمة التي تتداول عددًا كبيرًا من التقاطعات.",
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
              <SectionLabel>17 — الأخطاء الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أخطاء شائعة عند تداول Moving Average Crossover
              </h2>

              <div className="mt-7 space-y-3">
                {[
                  [
                    "01",
                    "تداول كل Cross",
                    "التعامل مع كل تقاطع كإشارة مستقلة دون النظر إلى حالة السوق قد يزيد التعرض للـWhipsaw.",
                  ],
                  [
                    "02",
                    "البحث عن الإعداد السحري",
                    "تغيير 9/21 إلى 10/22 ثم 12/26 بعد كل خسارة قد يتحول إلى Parameter Hunting بدل تطوير نظام.",
                  ],
                  [
                    "03",
                    "تجاهل الـLag",
                    "التوقع بأن Moving Average سيعطي القمة أو القاع الدقيقة يتعارض مع طبيعة المؤشر المتأخرة.",
                  ],
                  [
                    "04",
                    "وقف ضيق عشوائي",
                    "Stop لا يتناسب مع Volatility أو Structure قد يخرج الصفقة بسبب حركة طبيعية.",
                  ],
                  [
                    "05",
                    "إهمال التكاليف",
                    "Backtest بدون Spread وCommission وSlippage قد يعطي صورة أفضل من التنفيذ الحقيقي.",
                  ],
                  [
                    "06",
                    "تغيير القواعد بعد النتيجة",
                    "اختيار Cross أو تجاهله بعد معرفة ما حدث للسعر يخلق Hindsight Bias.",
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

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                خطر تحسين إعدادات المتوسطات أكثر من اللازم
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  سهولة تغيير فترات Moving Average تجعل الاستراتيجية عرضة
                  لمشكلة <strong>Overfitting</strong>. يمكن تجربة مئات
                  التركيبات حتى نجد أرقامًا تبدو ممتازة على البيانات
                  التاريخية.
                </p>

                <p>
                  المشكلة أن الإعداد الذي يطابق الماضي بصورة مثالية قد يكون
                  قد استفاد من خصائص عشوائية في تلك العينة ولا يحافظ على
                  الأداء نفسه خارجها.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "In-Sample",
                    text: "استخدم جزءًا من البيانات لتطوير القواعد واختيار نطاق معقول من الإعدادات.",
                  },
                  {
                    title: "Out-of-Sample",
                    text: "اختبر القواعد على بيانات لم تستخدمها أثناء تطوير النظام.",
                  },
                  {
                    title: "Robustness",
                    text: "راقب هل الأداء يعتمد على رقم واحد دقيق أم يبقى معقولًا عبر إعدادات وأسواق وفترات متقاربة.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6"
                  >
                    <h3
                      dir="ltr"
                      className="text-right text-[13px] font-black text-slate-950"
                    >
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="لا تختَر الإعداد فقط لأنه كان الأفضل تاريخيًا">
                إذا كان 17/43 مثلًا أفضل بكثير من 16/42 و18/44 على عينة صغيرة،
                فقد يكون ذلك سببًا للمزيد من الفحص وليس دليلًا تلقائيًا على
                اكتشاف إعداد متفوق.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              19 — BACKTEST
          ================================================= */}

          <section
            id="moving-average-backtesting"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — Backtesting</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف تختبر استراتيجية Moving Average Crossover؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                ميزة Crossover أن قواعده يمكن تعريفها بصورة واضحة نسبيًا،
                وهذا يجعله مناسبًا للاختبار المنظم. لكن يجب تثبيت التعريفات
                قبل النظر إلى النتائج.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "حدد المتوسطات",
                    text: "SMA أم EMA؟ وما فترة Fast MA وSlow MA؟",
                  },
                  {
                    n: "02",
                    title: "حدد الـCross",
                    text: "هل تعتمد على إغلاق الشمعة أم التقاطع اللحظي؟",
                  },
                  {
                    n: "03",
                    title: "حدد الفلاتر",
                    text: "Trend Filter أو Structure أو Higher Timeframe إن وجدت.",
                  },
                  {
                    n: "04",
                    title: "حدد الدخول",
                    text: "Immediate، Confirmation أم Pullback؟",
                  },
                  {
                    n: "05",
                    title: "حدد الخروج",
                    text: "Stop، Target، Trailing أو Opposite Cross.",
                  },
                  {
                    n: "06",
                    title: "أدخل التكاليف",
                    text: "Spread وCommission وSlippage بصورة واقعية قدر الإمكان.",
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
                    "عدد الصفقات",
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

              <ImportantBox title="اختبر على بيانات كافية تشمل أكثر من حالة سوق">
                اختبار الاستراتيجية فقط على Trend قوي قد يخفي مشكلة Whipsaw.
                حاول تضمين اتجاهات صاعدة وهابطة وفترات Range وتذبذب مختلف
                للحصول على صورة أكثر واقعية عن سلوك النظام.
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

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-white sm:text-[29px]">
                نموذج خطة تداول لتقاطع المتوسطات المتحركة
              </h2>

              <p className="mt-4 max-w-[1000px] text-[13px] font-medium leading-8 text-slate-300 sm:text-[14px]">
                هذا نموذج تعليمي لتنظيم القواعد وليس توصية بإعداد محدد. غيّر
                التفاصيل فقط بعد اختبارها بصورة منهجية.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  [
                    "01",
                    "Market",
                    "حدد الأصل وTimeframe الذي تم اختبار النظام عليه.",
                  ],
                  [
                    "02",
                    "Moving Averages",
                    "حدد النوع والفترات مسبقًا: Fast MA وSlow MA.",
                  ],
                  [
                    "03",
                    "Market Filter",
                    "حدد متى يسمح بالتداول ومتى يعتبر السوق Range.",
                  ],
                  [
                    "04",
                    "Entry",
                    "اكتب تعريفًا واضحًا للـCross وشروط Confirmation.",
                  ],
                  [
                    "05",
                    "Invalidation",
                    "حدد Stop Loss قبل حساب Position Size.",
                  ],
                  [
                    "06",
                    "Exit",
                    "حدد Target أو Trailing أو Opposite Cross مسبقًا.",
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

                      <h3
                        dir="ltr"
                        className="text-right text-[12px] font-black text-white"
                      >
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
              <SectionLabel>21 — Checklist</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                قائمة فحص قبل تداول Moving Average Crossover
              </h2>

              <div className="mt-7 grid gap-3 lg:grid-cols-2">
                {[
                  "هل نوع وفترات المتوسطات محددة مسبقًا؟",
                  "هل اكتمل Cross وفق تعريف الاستراتيجية؟",
                  "هل المتوسط البطيء مائل أم مسطح؟",
                  "هل السوق Trending أم يتحرك داخل Range؟",
                  "هل Price Structure يدعم اتجاه الإشارة؟",
                  "هل يوجد Higher Timeframe Filter في النظام؟",
                  "هل نقطة Invalidation واضحة؟",
                  "هل Stop Loss موضوع وفق القواعد وليس عشوائيًا؟",
                  "هل Position Size يحافظ على حد المخاطرة؟",
                  "هل الهدف أو Exit Rule محدد قبل الدخول؟",
                  "هل Spread والتكاليف مقبولة لهذه الصفقة؟",
                  "هل الصفقة مطابقة للقواعد التي تم اختبارها؟",
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
              <SectionLabel>22 — المقارنة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Moving Average Crossover مقارنة بأساليب تداول أخرى
              </h2>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[1fr_1.3fr_1.3fr_1.3fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>الأسلوب</div>
                  <div>الفكرة الأساسية</div>
                  <div>الميزة</div>
                  <div>التحدي</div>
                </div>

                {[
                  [
                    "MA Crossover",
                    "علاقة متوسط سريع بمتوسط بطيء",
                    "قواعد موضوعية نسبيًا وسهلة الاختبار",
                    "Lag وWhipsaw",
                  ],
                  [
                    "Price Action",
                    "قراءة حركة السعر والشموع والبنية",
                    "يتفاعل مباشرة مع السعر",
                    "قد يحتوي على قدر أكبر من التقدير البصري",
                  ],
                  [
                    "Trend Following",
                    "المشاركة في اتجاه مستمر",
                    "يمكنه الاستفادة من الحركات الممتدة",
                    "فترات Range قد تنتج خسائر متكررة",
                  ],
                  [
                    "Support & Resistance",
                    "التفاعل مع مناطق سعرية مهمة",
                    "يوفر مستويات واضحة للسياق والإلغاء",
                    "المستويات ليست حواجز مضمونة",
                  ],
                ].map(([style, idea, strength, challenge]) => (
                  <div
                    key={style}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[1fr_1.3fr_1.3fr_1.3fr]"
                  >
                    <div
                      dir="ltr"
                      className="text-right text-[12px] font-black text-slate-950 sm:text-[13px]"
                    >
                      {style}
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
              <SectionLabel>23 — تطوير الاستراتيجية</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أدوات يمكن دمجها مع Moving Average Crossover
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px]">
                يمكن استخدام التقاطع كنظام مستقل أو كجزء من إطار أوسع. هذه
                الاستراتيجيات تساعد على فهم السياق من زوايا مختلفة:
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    href: "/strategies/trend-following",
                    title: "Trend Following",
                    text: "فهم المنطق الأشمل وراء المشاركة في الاتجاهات بدل محاولة توقع نقطة انعكاس دقيقة.",
                  },
                  {
                    href: "/strategies/price-action",
                    title: "Price Action",
                    text: "استخدام حركة السعر والبنية كConfirmation إضافي بدل الاعتماد على Cross وحده.",
                  },
                  {
                    href: "/strategies/support-and-resistance",
                    title: "الدعم والمقاومة",
                    text: "تحديد مناطق قد تساعد في تقييم مكان الدخول والإلغاء والهدف.",
                  },
                  {
                    href: "/strategies/rsi",
                    title: "RSI",
                    text: "مؤشر زخم يمكن دراسته كفلتر إضافي، مع ضرورة اختبار أثره بدل افتراض أنه يحسن النتائج.",
                  },
                  {
                    href: "/strategies/swing-trading",
                    title: "Swing Trading",
                    text: "إطار تداول يمكن أن يستخدم متوسطات متوسطة وطويلة للمشاركة في حركات تمتد عدة جلسات.",
                  },
                  {
                    href: "/strategies/scalping",
                    title: "Scalping",
                    text: "يوضح تحديات استخدام المتوسطات السريعة عندما تصبح التكاليف والضوضاء أكثر تأثيرًا.",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        dir={
                          item.title === "Trend Following" ||
                          item.title === "Price Action" ||
                          item.title === "RSI" ||
                          item.title === "Swing Trading" ||
                          item.title === "Scalping"
                            ? "ltr"
                            : "rtl"
                        }
                        className="text-right text-[13px] font-black text-slate-950 sm:text-[14px]"
                      >
                        {item.title}
                      </h3>

                      <span className="text-[15px] font-black text-slate-300 transition group-hover:text-[#1E5BB8]">
                        ←
                      </span>
                    </div>

                    <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.text}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              24 — BEGINNER ROADMAP
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>24 — للمبتدئين</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف تتعلم استراتيجية تقاطع المتوسطات خطوة بخطوة؟
              </h2>

              <div className="mt-7 grid gap-4 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "افهم MA",
                    text: "ابدأ بفهم كيف يتغير المتوسط مع السعر والفرق بين SMA وEMA.",
                  },
                  {
                    n: "02",
                    title: "راقب Cross",
                    text: "تعلم تمييز Bullish وBearish Cross بدون فتح صفقات.",
                  },
                  {
                    n: "03",
                    title: "صنف السوق",
                    text: "قارن سلوك المتوسطات في Trend واضح مع Range وWhipsaw.",
                  },
                  {
                    n: "04",
                    title: "اختبر وسجل",
                    text: "ضع قواعد ثابتة وسجل النتائج قبل التفكير في استخدامها بأموال حقيقية.",
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
              <SectionLabel>25 — الأسئلة الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أسئلة شائعة عن استراتيجية تقاطع المتوسطات المتحركة
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
              <SectionLabel>26 — الخلاصة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أهم ما يجب تذكره عن Moving Average Crossover
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "تقاطع المتوسطات استراتيجية Trend Following تعتمد على بيانات سعر سابقة.",
                  "Fast MA يتفاعل أسرع، بينما Slow MA أكثر سلاسة وتأخرًا.",
                  "EMA يعطي وزنًا أكبر للأسعار الحديثة، بينما SMA يعطي وزنًا متساويًا للفترات.",
                  "Bullish Cross يحدث عندما يعبر المتوسط السريع فوق البطيء، والعكس للـBearish Cross.",
                  "9/21 و20/50 و50/200 أمثلة وليست إعدادات مضمونة أو مثالية للجميع.",
                  "Whipsaw في الأسواق الجانبية من أهم نقاط ضعف الاستراتيجية.",
                  "التأكيد والفلاتر قد تغير النتائج لكنها لا تلغي الخسائر ويجب اختبارها.",
                  "Stop Loss وPosition Size وإدارة المخاطر جزء أساسي من النظام وليست إضافة لاحقة.",
                  "Backtesting يجب أن يشمل التكاليف وحالات سوق مختلفة وقواعد ثابتة.",
                  "احذر Overfitting عند البحث عن أفضل فترات للمتوسطات على البيانات التاريخية.",
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
              <SectionLabel>27 — استراتيجيات مرتبطة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أكمل تعلم استراتيجيات التداول
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    href: "/strategies/trend-following",
                    title: "Trend Following",
                    text: "استراتيجية تتبع الاتجاه",
                  },
                  {
                    href: "/strategies/price-action",
                    title: "Price Action",
                    text: "قراءة حركة السعر",
                  },
                  {
                    href: "/strategies/support-and-resistance",
                    title: "الدعم والمقاومة",
                    text: "تداول المستويات والمناطق",
                  },
                  {
                    href: "/strategies/rsi",
                    title: "RSI",
                    text: "استراتيجية مؤشر القوة النسبية",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <h3
                      dir={
                        item.title === "الدعم والمقاومة" ? "rtl" : "ltr"
                      }
                      className="text-right text-[13px] font-black text-slate-950"
                    >
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-500 sm:text-[12px]">
                      {item.text}
                    </p>

                    <div className="mt-4 text-[10px] font-black text-[#1E5BB8]">
                      اقرأ الاستراتيجية ←
                    </div>
                  </a>
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

                <h2 className="mt-3 max-w-[850px] text-[23px] font-black leading-[1.45] text-white sm:text-[30px]">
                  تعلم الاستراتيجية ضمن خطة تداول واضحة، وليس كإشارة منفردة
                </h2>

                <p className="mt-3 max-w-[900px] text-[12px] font-medium leading-7 text-slate-300 sm:text-[13px]">
                  استكشف دليل استراتيجيات التداول وقارن بين Price Action،
                  Trend Following، الدعم والمقاومة، RSI، SMC وغيرها لاختيار
                  الأسلوب الذي يناسب طريقة تداولك.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href="/strategies"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-5 py-3 text-[11px] font-black text-slate-950 transition hover:bg-slate-100 sm:text-[12px]"
                >
                  جميع استراتيجيات التداول
                </a>

                <a
                  href="/strategies/trend-following"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-black text-white transition hover:bg-white/10 sm:text-[12px]"
                >
                  استراتيجية تتبع الاتجاه
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <div className="px-2 py-1 text-center text-[10px] font-medium leading-6 text-slate-500 sm:px-8 sm:text-[11px]">
            المحتوى تعليمي فقط ولا يمثل نصيحة أو توصية استثمارية. التداول
            باستخدام الرافعة المالية ينطوي على مخاطر مرتفعة وقد يؤدي إلى
            خسارة رأس المال. لا توجد استراتيجية تداول أو مجموعة مؤشرات تضمن
            تحقيق الأرباح.
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