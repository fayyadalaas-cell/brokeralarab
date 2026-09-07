import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/order-blocks`;
const EN_PAGE_URL = `${BASE_URL}/en/strategies/order-blocks`;

const PAGE_TITLE =
  "استراتيجية الأوردر بلوك (Order Blocks) في التداول: شرح شامل";

const PAGE_DESCRIPTION =
  "شرح استراتيجية الأوردر بلوك Order Blocks في التداول والفوركس خطوة بخطوة: كيفية تحديد Bullish وBearish Order Blocks، فهم Displacement وBOS وFVG والسيولة وMitigation والدخول وإدارة المخاطر.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "اوردر بلوك",
    "الأوردر بلوك",
    "استراتيجية الاوردر بلوك",
    "استراتيجية الأوردر بلوك",
    "Order Block",
    "Order Blocks",
    "Order Block Trading",
    "Order Block Strategy",
    "Order Block Forex",
    "كتل الأوامر",
    "كتلة الأوامر",
    "Bullish Order Block",
    "Bearish Order Block",
    "كيفية تحديد الاوردر بلوك",
    "كيفية رسم الاوردر بلوك",
    "Smart Money Concepts",
    "SMC Trading",
    "ICT Order Block",
    "Break of Structure",
    "BOS",
    "CHOCH",
    "Displacement",
    "Fair Value Gap",
    "FVG",
    "Liquidity Sweep",
    "Mitigation",
    "Mitigation Block",
    "Breaker Block",
    "Unmitigated Order Block",
    "Fresh Order Block",
    "Order Block Entry",
    "Order Block Retest",
    "Order Block vs Supply and Demand",
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
    question: "ما هو الأوردر بلوك في التداول؟",
    answer:
      "الأوردر بلوك Order Block هو منطقة سعرية يحددها المتداول عادة حول آخر شمعة معاكسة أو مجموعة صغيرة من الشموع قبل حركة قوية في الاتجاه المقابل. يستخدم المفهوم ضمن Smart Money Concepts لتحليل أصل الحركة ومراقبة سلوك السعر إذا عاد إلى المنطقة.",
  },
  {
    question: "ما هو Bullish Order Block؟",
    answer:
      "Bullish Order Block هو عادة آخر شمعة هابطة قبل حركة صعود قوية. يقوم المتداول بتحديد نطاقها كمنطقة محتملة للاهتمام إذا عاد السعر إليها لاحقًا، خاصة عندما تكون الحركة الصاعدة مصحوبة بـDisplacement وكسر في هيكل السوق.",
  },
  {
    question: "ما هو Bearish Order Block؟",
    answer:
      "Bearish Order Block هو عادة آخر شمعة صاعدة قبل حركة هبوط قوية. يتم تحديد نطاق الشمعة أو جزء منه كمنطقة محتملة للبيع إذا عاد السعر إليها وتوافرت شروط الاستراتيجية.",
  },
  {
    question: "كيف أعرف أن الأوردر بلوك قوي؟",
    answer:
      "ينظر المتداولون عادة إلى قوة الحركة الخارجة من المنطقة، وجود Displacement، كسر هيكل السوق BOS أو تغيره، وجود Fair Value Gap، موقع المنطقة داخل الهيكل العام، وما إذا كانت المنطقة قد اختبرت سابقًا.",
  },
  {
    question: "ما علاقة Fair Value Gap بالأوردر بلوك؟",
    answer:
      "الأوردر بلوك يركز على أصل الحركة، بينما Fair Value Gap يصف عدم توازن سعري قد يظهر داخل الحركة القوية نفسها. قد يظهر المفهومان معًا، لكنهما ليسا الشيء نفسه.",
  },
  {
    question: "ما معنى Mitigation في Order Blocks؟",
    answer:
      "Mitigation يعني عودة السعر لاحقًا إلى منطقة Order Block واختبارها. بعض المتداولين يركزون على أول عودة إلى المنطقة، بينما يعتبرون المنطقة بعد ذلك Tested أو Mitigated وفق قواعدهم.",
  },
  {
    question: "هل كل آخر شمعة معاكسة تعتبر Order Block؟",
    answer:
      "لا. مجرد وجود شمعة معاكسة لا يكفي. يجب تقييم ما حدث بعدها، مثل قوة الحركة، كسر الهيكل، السياق العام، ومدى وضوح المنطقة. بدون ذلك قد تكون الشمعة مجرد حركة سعرية عادية.",
  },
  {
    question: "هل الأوردر بلوك يثبت وجود أوامر مؤسسات؟",
    answer:
      "لا. الرسم البياني وحده لا يستطيع إثبات هوية المشاركين أو حجم الأوامر التي نفذت في شمعة معينة. مفهوم Order Block هو إطار لتحليل حركة السعر، وليس دليلًا مباشرًا على وجود أوامر مؤسسات محددة.",
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

function OrderBlockHeroDesktopChart() {
  return (
    <svg
      viewBox="0 0 760 430"
      className="block h-full min-h-[410px] w-full"
      role="img"
      aria-label="مثال على Bullish Order Block مع شموع سعرية وحركة صعود قوية"
    >
      <defs>
        <pattern
          id="obHeroGridAr"
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
      <rect width="760" height="430" fill="url(#obHeroGridAr)" />

      {/* Order block zone */}
      <rect
        x="100"
        y="305"
        width="535"
        height="77"
        rx="10"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="119"
        y="330"
        fontSize="10"
        fontWeight="900"
        fill="#1E5BB8"
      >
        BULLISH ORDER BLOCK
      </text>

      <text
        x="119"
        y="350"
        fontSize="8"
        fontWeight="700"
        fill="#64748b"
      >
        Last bearish candle before bullish displacement
      </text>

      {/* Incoming bearish candles */}
      <Candle
        x={135}
        open={170}
        close={210}
        high={155}
        low={224}
        bullish={false}
      />
      <Candle
        x={175}
        open={207}
        close={246}
        high={192}
        low={260}
        bullish={false}
      />
      <Candle
        x={215}
        open={241}
        close={282}
        high={226}
        low={296}
        bullish={false}
      />

      {/* The order block candle */}
      <Candle
        x={258}
        open={282}
        close={337}
        high={267}
        low={359}
        bullish={false}
        width={22}
      />

      {/* Bullish displacement */}
      <Candle
        x={302}
        open={336}
        close={292}
        high={275}
        low={350}
        bullish
        width={21}
      />
      <Candle
        x={348}
        open={290}
        close={231}
        high={213}
        low={304}
        bullish
        width={21}
      />
      <Candle
        x={394}
        open={229}
        close={166}
        high={146}
        low={243}
        bullish
        width={21}
      />
      <Candle
        x={440}
        open={165}
        close={115}
        high={97}
        low={181}
        bullish
        width={21}
      />

      {/* continuation */}
      <Candle
        x={486}
        open={118}
        close={139}
        high={103}
        low={154}
        bullish={false}
      />
      <Candle
        x={527}
        open={140}
        close={108}
        high={91}
        low={154}
        bullish
      />

      {/* retest */}
      <Candle
        x={570}
        open={110}
        close={166}
        high={95}
        low={180}
        bullish={false}
      />
      <Candle
        x={610}
        open={164}
        close={225}
        high={150}
        low={242}
        bullish={false}
      />
      <Candle
        x={650}
        open={223}
        close={318}
        high={207}
        low={339}
        bullish={false}
        width={21}
      />

      {/* reaction */}
      <Candle
        x={692}
        open={320}
        close={270}
        high={253}
        low={343}
        bullish
        width={21}
      />

      <circle
        cx="650"
        cy="320"
        r="10"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <line
        x1="650"
        y1="330"
        x2="650"
        y2="393"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="650"
        y="410"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        RETEST
      </text>

      <rect
        x="325"
        y="75"
        width="165"
        height="31"
        rx="15.5"
        fill="#2563eb"
      />

      <text
        x="407"
        y="95"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        BULLISH DISPLACEMENT
      </text>

      <line
        x1="258"
        y1="360"
        x2="258"
        y2="403"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      <text
        x="258"
        y="418"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#475569"
      >
        ORDER BLOCK CANDLE
      </text>
    </svg>
  );
}

/* =========================================================
   HERO — MOBILE
========================================================= */

function OrderBlockHeroMobileChart() {
  return (
    <svg
      viewBox="0 0 520 285"
      className="block h-auto w-full"
      role="img"
      aria-label="مثال مختصر على Bullish Order Block"
    >
      <defs>
        <pattern
          id="obHeroMobileGridAr"
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
      <rect width="520" height="285" fill="url(#obHeroMobileGridAr)" />

      <rect
        x="54"
        y="203"
        width="405"
        height="51"
        rx="8"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="69"
        y="226"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        BULLISH ORDER BLOCK
      </text>

      <Candle
        x={94}
        open={112}
        close={142}
        high={99}
        low={153}
        bullish={false}
        width={15}
      />
      <Candle
        x={126}
        open={140}
        close={174}
        high={128}
        low={186}
        bullish={false}
        width={15}
      />
      <Candle
        x={158}
        open={171}
        close={217}
        high={160}
        low={237}
        bullish={false}
        width={17}
      />

      <Candle
        x={194}
        open={218}
        close={183}
        high={169}
        low={232}
        bullish
        width={17}
      />
      <Candle
        x={230}
        open={181}
        close={136}
        high={121}
        low={194}
        bullish
        width={17}
      />
      <Candle
        x={266}
        open={134}
        close={91}
        high={78}
        low={148}
        bullish
        width={17}
      />
      <Candle
        x={302}
        open={90}
        close={62}
        high={49}
        low={103}
        bullish
        width={17}
      />

      <Candle
        x={340}
        open={65}
        close={94}
        high={53}
        low={107}
        bullish={false}
        width={15}
      />
      <Candle
        x={374}
        open={92}
        close={132}
        high={80}
        low={145}
        bullish={false}
        width={15}
      />
      <Candle
        x={408}
        open={130}
        close={212}
        high={117}
        low={229}
        bullish={false}
        width={17}
      />

      <Candle
        x={444}
        open={211}
        close={177}
        high={164}
        low={231}
        bullish
        width={17}
      />

      <circle
        cx="408"
        cy="211"
        r="8"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />
    </svg>
  );
}

/* =========================================================
   CHART 01 — BULLISH VS BEARISH ORDER BLOCK
========================================================= */

function OrderBlockTypesChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1120 560"
      className="block h-auto w-[1020px] max-w-none sm:w-full"
      role="img"
      aria-label="مقارنة Bullish Order Block وBearish Order Block باستخدام شموع تداول"
    >
      <defs>
        <pattern
          id={fullscreen ? "obTypesGridFullAr" : "obTypesGridAr"}
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
        fill={`url(#${fullscreen ? "obTypesGridFullAr" : "obTypesGridAr"})`}
      />

      {/* LEFT CARD */}
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
  x="85"
  y="65"
  fontSize="18"
  fontWeight="900"
  fill="#1E5BB8"
  direction="ltr"
  textAnchor="start"
>
  BULLISH ORDER BLOCK
</text>

<text
  x="85"
  y="88"
  fontSize="10"
  fontWeight="700"
  fill="#64748b"
  direction="ltr"
  textAnchor="start"
>
  آخر شمعة هابطة قبل حركة صعود قوية
</text>

      <rect
        x="76"
        y="340"
        width="420"
        height="93"
        rx="9"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <text
        x="94"
        y="364"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        BULLISH OB ZONE
      </text>

      <Candle
        x={112}
        open={193}
        close={230}
        high={178}
        low={245}
        bullish={false}
      />
      <Candle
        x={148}
        open={228}
        close={268}
        high={214}
        low={283}
        bullish={false}
      />
      <Candle
        x={184}
        open={265}
        close={307}
        high={251}
        low={322}
        bullish={false}
      />

      {/* Bullish OB */}
      <Candle
        x={222}
        open={306}
        close={365}
        high={291}
        low={389}
        bullish={false}
        width={23}
      />

      <Candle
        x={264}
        open={364}
        close={320}
        high={305}
        low={380}
        bullish
        width={21}
      />
      <Candle
        x={306}
        open={318}
        close={259}
        high={242}
        low={333}
        bullish
        width={21}
      />
      <Candle
        x={348}
        open={257}
        close={197}
        high={181}
        low={272}
        bullish
        width={21}
      />
      <Candle
        x={390}
        open={196}
        close={141}
        high={125}
        low={210}
        bullish
        width={21}
      />
      <Candle
        x={432}
        open={140}
        close={102}
        high={88}
        low={154}
        bullish
      />

      <line
        x1="222"
        y1="390"
        x2="222"
        y2="456"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="222"
        y="475"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        LAST BEARISH CANDLE
      </text>

      <rect
        x="300"
        y="111"
        width="151"
        height="30"
        rx="15"
        fill="#2563eb"
      />

      <text
        x="375"
        y="130"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        BULLISH DISPLACEMENT
      </text>

      {/* RIGHT CARD */}
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
        BEARISH ORDER BLOCK
      </text>

      <text
        x="603"
        y="88"
        fontSize="10"
        fontWeight="700"
        fill="#64748b"
      >
        آخر شمعة صاعدة قبل حركة هبوط قوية
      </text>

      <rect
        x="621"
        y="128"
        width="420"
        height="93"
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
        BEARISH OB ZONE
      </text>

      <Candle
        x={656}
        open={362}
        close={326}
        high={310}
        low={378}
        bullish
      />
      <Candle
        x={692}
        open={325}
        close={286}
        high={270}
        low={339}
        bullish
      />
      <Candle
        x={728}
        open={285}
        close={243}
        high={227}
        low={300}
        bullish
      />

      {/* bearish OB */}
      <Candle
        x={766}
        open={241}
        close={177}
        high={151}
        low={255}
        bullish
        width={23}
      />

      <Candle
        x={808}
        open={179}
        close={229}
        high={163}
        low={244}
        bullish={false}
        width={21}
      />
      <Candle
        x={850}
        open={231}
        close={291}
        high={214}
        low={307}
        bullish={false}
        width={21}
      />
      <Candle
        x={892}
        open={292}
        close={350}
        high={276}
        low={367}
        bullish={false}
        width={21}
      />
      <Candle
        x={934}
        open={351}
        close={402}
        high={335}
        low={419}
        bullish={false}
        width={21}
      />
      <Candle
        x={976}
        open={403}
        close={437}
        high={389}
        low={452}
        bullish={false}
      />

      <line
        x1="766"
        y1="151"
        x2="766"
        y2="108"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <text
        x="766"
        y="101"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#475569"
      >
        LAST BULLISH CANDLE
      </text>

      <rect
        x="849"
        y="418"
        width="151"
        height="30"
        rx="15"
        fill="#475569"
      />

      <text
        x="924"
        y="437"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        BEARISH DISPLACEMENT
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="ob-types-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#bullish-bearish-order-blocks"
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
      <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block">
        {chart}
      </div>

      <a
        href="#ob-types-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير رسم Bullish وBearish Order Blocks"
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
   CHART 02 — ANATOMY OF A HIGH-QUALITY ORDER BLOCK
========================================================= */

function ValidOrderBlockChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <svg
      viewBox="0 0 1180 610"
      className="block h-auto w-[1050px] max-w-none sm:w-full"
      role="img"
      aria-label="تشريح Order Block مع Liquidity Sweep وDisplacement وFair Value Gap وBreak of Structure"
    >
      <defs>
        <pattern
          id={fullscreen ? "validObGridFullAr" : "validObGridAr"}
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
        fill={`url(#${fullscreen ? "validObGridFullAr" : "validObGridAr"})`}
      />

      {/* previous low / liquidity */}
      <line
        x1="70"
        y1="405"
        x2="350"
        y2="405"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="7 6"
      />

      <text
        x="78"
        y="392"
        fontSize="9"
        fontWeight="900"
        fill="#64748b"
      >
        PREVIOUS LOW / LIQUIDITY
      </text>

      {/* bearish approach */}
      <Candle
        x={105}
        open={222}
        close={260}
        high={207}
        low={275}
        bullish={false}
      />
      <Candle
        x={145}
        open={258}
        close={301}
        high={243}
        low={317}
        bullish={false}
      />
      <Candle
        x={185}
        open={299}
        close={340}
        high={284}
        low={355}
        bullish={false}
      />
      <Candle
        x={225}
        open={338}
        close={377}
        high={323}
        low={393}
        bullish={false}
      />

      {/* sweep candle */}
      <Candle
        x={267}
        open={375}
        close={352}
        high={339}
        low={429}
        bullish
        width={20}
      />

      <circle
        cx="267"
        cy="418"
        r="10"
        fill="#ffffff"
        stroke="#475569"
        strokeWidth="3"
      />

      <rect
        x="190"
        y="453"
        width="157"
        height="31"
        rx="15.5"
        fill="#0f172a"
      />

      <text
        x="268"
        y="473"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        1 · LIQUIDITY SWEEP
      </text>

      {/* order block candle */}
      <rect
        x="303"
        y="315"
        width="118"
        height="111"
        rx="9"
        fill="#dbeafe"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <Candle
        x={346}
        open={337}
        close={389}
        high={321}
        low={408}
        bullish={false}
        width={24}
      />

      <text
        x="362"
        y="445"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#1E5BB8"
      >
        2 · ORDER BLOCK
      </text>

      {/* displacement */}
      <Candle
        x={411}
        open={388}
        close={335}
        high={318}
        low={402}
        bullish
        width={22}
      />
      <Candle
        x={460}
        open={333}
        close={268}
        high={250}
        low={347}
        bullish
        width={22}
      />
      <Candle
        x={509}
        open={266}
        close={196}
        high={178}
        low={280}
        bullish
        width={22}
      />
      <Candle
        x={558}
        open={194}
        close={137}
        high={118}
        low={208}
        bullish
        width={22}
      />

      <rect
        x="430"
        y="91"
        width="177"
        height="32"
        rx="16"
        fill="#2563eb"
      />

      <text
        x="518"
        y="112"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        3 · DISPLACEMENT
      </text>

      {/* FVG */}
      <rect
        x="443"
        y="214"
        width="135"
        height="63"
        rx="7"
        fill="#eff6ff"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeDasharray="6 5"
      />

      <text
        x="510"
        y="249"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#1E5BB8"
      >
        FVG
      </text>

      {/* Previous swing high and BOS */}
      <line
        x1="603"
        y1="204"
        x2="842"
        y2="204"
        stroke="#64748b"
        strokeWidth="2"
        strokeDasharray="7 6"
      />

      <text
        x="615"
        y="190"
        fontSize="9"
        fontWeight="900"
        fill="#64748b"
      >
        PREVIOUS SWING HIGH
      </text>

      <Candle
        x={614}
        open={140}
        close={168}
        high={124}
        low={181}
        bullish={false}
      />
      <Candle
        x={654}
        open={168}
        close={143}
        high={129}
        low={183}
        bullish
      />
      <Candle
        x={694}
        open={145}
        close={175}
        high={130}
        low={189}
        bullish={false}
      />
      <Candle
        x={734}
        open={174}
        close={138}
        high={121}
        low={188}
        bullish
      />
      <Candle
        x={774}
        open={137}
        close={105}
        high={88}
        low={150}
        bullish
      />

      <line
        x1="774"
        y1="110"
        x2="774"
        y2="205"
        stroke="#2563eb"
        strokeWidth="2"
        strokeDasharray="5 5"
      />

      <rect
        x="714"
        y="224"
        width="122"
        height="30"
        rx="15"
        fill="#0f172a"
      />

      <text
        x="775"
        y="243"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        4 · BOS
      </text>

      {/* return */}
      <Candle
        x={827}
        open={108}
        close={143}
        high={93}
        low={158}
        bullish={false}
      />
      <Candle
        x={868}
        open={141}
        close={185}
        high={126}
        low={200}
        bullish={false}
      />
      <Candle
        x={909}
        open={183}
        close={231}
        high={168}
        low={247}
        bullish={false}
      />
      <Candle
        x={950}
        open={230}
        close={281}
        high={215}
        low={297}
        bullish={false}
      />
      <Candle
        x={991}
        open={280}
        close={337}
        high={264}
        low={354}
        bullish={false}
      />

      <Candle
        x={1033}
        open={337}
        close={371}
        high={321}
        low={400}
        bullish={false}
      />

      <circle
        cx="1033"
        cy="371"
        r="11"
        fill="#ffffff"
        stroke="#2563eb"
        strokeWidth="3"
      />

      <line
        x1="1033"
        y1="383"
        x2="1033"
        y2="448"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      <rect
        x="960"
        y="461"
        width="147"
        height="31"
        rx="15.5"
        fill="#2563eb"
      />

      <text
        x="1033"
        y="481"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#ffffff"
      >
        5 · FIRST RETEST
      </text>

      {/* bottom sequence */}
      <text
        x="590"
        y="562"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#475569"
      >
        LIQUIDITY → ORDER BLOCK → DISPLACEMENT → FVG → BOS → RETEST
      </text>

      <text
        x="590"
        y="584"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="#94a3b8"
      >
        مثال تعليمي يوضح تسلسلًا شائعًا في تحليل SMC — وليس شرطًا إلزاميًا لكل صفقة
      </text>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        id="valid-ob-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#identify-order-block"
          aria-label="إغلاق الرسم"
          className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-slate-900 shadow-lg"
        >
          ×
        </a>

        <div className="w-full max-w-[1350px] overflow-auto rounded-[24px] bg-white p-2 sm:p-4">
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
        href="#valid-ob-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير رسم تحديد Order Block"
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

export default function OrderBlocksStrategyPage() {
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
      "Order Blocks",
      "Smart Money Concepts",
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
        name: "استراتيجية Order Blocks",
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
      <OrderBlockTypesChart fullscreen />
      <ValidOrderBlockChart fullscreen />

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

          <span className="text-slate-800">Order Blocks</span>
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
                  Order Block Analysis
                </span>
              </div>

              <OrderBlockHeroDesktopChart />
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
                  Smart Money Concepts
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                  متوسط
                </span>
              </div>

              <h1 className="max-w-[820px] text-[38px] font-black leading-[1.2] tracking-[-0.035em] text-slate-950 xl:text-[46px]">
                استراتيجية الأوردر بلوك
                <span
                  dir="ltr"
                  className="mt-1 block text-[#1E5BB8]"
                >
                  Order Blocks
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-[14px] font-medium leading-8 text-slate-600 xl:text-[15px]">
                شرح عملي لكيفية تحديد Bullish وBearish Order Blocks، قراءة
                الحركة القوية Displacement، كسر الهيكل BOS، فجوات FVG،
                السيولة، Mitigation والعودة إلى المنطقة.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Bullish OB",
                  "Bearish OB",
                  "Displacement",
                  "BOS / CHOCH",
                  "FVG",
                  "Liquidity",
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
                <span>أمثلة بشموع سعرية</span>
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
                Smart Money Concepts
              </span>
            </div>

            <h1 className="mt-4 text-[27px] font-black leading-[1.2] tracking-[-0.03em] text-slate-950 sm:text-[32px]">
              استراتيجية الأوردر بلوك
              <span
                dir="ltr"
                className="block text-[#1E5BB8]"
              >
                Order Blocks
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              دليل عملي لتحديد Order Blocks وفهم Displacement وBOS وFVG
              والسيولة والعودة إلى المنطقة.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                "Bullish OB",
                "Bearish OB",
                "BOS",
                "FVG",
                "Mitigation",
              ].map((item) => (
                <span
                  key={item}
                  dir="ltr"
                  className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[8px] font-black text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 text-[9px] font-bold leading-5 text-slate-500">
              محدث سبتمبر 2026 · مستوى متوسط
            </div>
          </div>

          <div className="border-t border-slate-200">
            <OrderBlockHeroMobileChart />
          </div>
        </section>

        <article className="mt-6 w-full space-y-6 sm:mt-8 sm:space-y-8">
          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>مقدمة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما هو الأوردر بلوك Order Block في التداول؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>الأوردر بلوك Order Block</strong> هو مفهوم شائع ضمن
                  Smart Money Concepts وICT، ويشير عادة إلى شمعة أو منطقة صغيرة
                  سبقت حركة سعرية قوية في الاتجاه المعاكس.
                </p>

                <p>
                  في أبسط تعريف عملي، يبحث المتداول عن
                  <strong> آخر شمعة معاكسة قبل Displacement واضح</strong>. فإذا
                  كانت الحركة التالية صعودية بقوة، تكون آخر شمعة هابطة قبلها
                  مرشحًا لما يسمى Bullish Order Block. والعكس في حالة Bearish
                  Order Block.
                </p>

                <p>
                  لكن الخطأ الشائع هو تحديد كل شمعة معاكسة باعتبارها Order
                  Block. القيمة الحقيقية للتحليل تأتي مما حدث
                  <strong> بعد الشمعة</strong>: هل انطلق السعر بقوة؟ هل كسر
                  Swing مهمًا؟ هل ظهر عدم توازن FVG؟ وهل المنطقة موجودة في
                  سياق منطقي داخل هيكل السوق؟
                </p>

                <p>
                  لهذا السبب، استراتيجية Order Blocks ليست مجرد رسم مستطيلات.
                  هي عملية تبدأ من قراءة
                  <strong> الحركة، الهيكل، السيولة والسياق</strong> ثم العودة
                  إلى أصل الحركة.
                </p>
              </div>

              <ImportantBox title="Order Block لا يثبت وجود أوامر مؤسسات بعينها">
                يمكن للرسم البياني أن يوضح أن حركة قوية بدأت من منطقة محددة،
                لكنه لا يكشف لنا هوية المتداولين أو المؤسسات التي نفذت أوامر
                داخل تلك الشمعة. لذلك نتعامل مع Order Blocks كإطار لتحليل حركة
                السعر وليس كدليل مباشر على وجود أوامر مؤسسات مخفية.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              01 — CORE IDEA
          ================================================= */}

          <section
            id="how-order-blocks-work"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>01 — الفكرة الأساسية</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف تعمل استراتيجية Order Blocks؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا تبدأ بالبحث عن شمعة عشوائية. ابدأ من
                <strong> الحركة القوية</strong> ثم ارجع إلى أصلها. بهذه الطريقة
                يكون لديك سبب واضح لتحديد المنطقة بدل رسم عشرات الـOrder Blocks
                على كل شارت.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "ابحث عن الحركة",
                    text: "حدد Rally أو Drop واضحًا وسريعًا مقارنة بالحركة المحيطة.",
                  },
                  {
                    n: "02",
                    title: "افحص الهيكل",
                    text: "تحقق إذا كانت الحركة كسرت Swing High أو Swing Low مهمًا.",
                  },
                  {
                    n: "03",
                    title: "ارجع إلى الأصل",
                    text: "حدد آخر شمعة معاكسة قبل بداية الحركة القوية.",
                  },
                  {
                    n: "04",
                    title: "حدد المنطقة",
                    text: "ارسم نطاق Order Block وفق قاعدة ثابتة تستطيع اختبارها.",
                  },
                  {
                    n: "05",
                    title: "انتظر العودة",
                    text: "لا تطارد الحركة؛ راقب السعر فقط إذا عاد لاحقًا إلى المنطقة.",
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

                    <p className="mt-2 text-[10px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="ابحث عن النتيجة أولًا ثم أصل الحركة">
                أسهل طريقة للمبتدئ هي إيجاد Displacement أو كسر واضح في السوق
                أولًا، ثم العودة إلى الشمعة التي سبقته. البحث عن كل شمعة معاكسة
                قبل معرفة ما حدث بعدها سيملأ الشارت بمناطق ضعيفة وغير مفيدة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              02 — BULLISH / BEARISH
          ================================================= */}

          <section
            id="bullish-bearish-order-blocks"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — أنواع Order Blocks</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما الفرق بين Bullish وBearish Order Block؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يوجد نوعان أساسيان يستخدمهما المتداولون:
                  <strong> Bullish Order Block</strong> للسيناريو الصاعد و
                  <strong> Bearish Order Block</strong> للسيناريو الهابط.
                </p>

                <p>
                  الفرق لا يتعلق بلون المستطيل فقط، بل بالشمعة الأصلية واتجاه
                  الحركة التي جاءت بعدها.
                </p>
              </div>

              <div className="mt-7">
                <OrderBlockTypesChart />
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[24px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                      BUY
                    </div>

                    <h3
                      dir="ltr"
                      className="text-left text-base font-black text-slate-900"
                    >
                      Bullish Order Block
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3 text-[12px] font-medium leading-7 text-slate-700">
                    <p>
                      • عادة آخر <strong>شمعة هابطة</strong> قبل حركة صعود قوية.
                    </p>
                    <p>
                      • يتم تقييمها كمنطقة محتملة للشراء إذا عاد السعر إليها.
                    </p>
                    <p>
                      • تصبح أكثر أهمية عندما ترتبط بـDisplacement وكسر هيكل
                      واضح.
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-slate-600 shadow-sm">
                      SELL
                    </div>

                    <h3
                      dir="ltr"
                      className="text-left text-base font-black text-slate-900"
                    >
                      Bearish Order Block
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3 text-[12px] font-medium leading-7 text-slate-700">
                    <p>
                      • عادة آخر <strong>شمعة صاعدة</strong> قبل حركة هبوط قوية.
                    </p>
                    <p>
                      • يتم تقييمها كمنطقة محتملة للبيع إذا عاد السعر إليها.
                    </p>
                    <p>
                      • لا يكفي وجود شمعة صاعدة؛ يجب تقييم الحركة التي تبعتها
                      والسياق.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              03 — IDENTIFY
          ================================================= */}

          <section
            id="identify-order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — كيفية تحديد المنطقة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيفية تحديد Order Block قوي خطوة بخطوة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا يوجد عامل واحد يجعل المنطقة صالحة تلقائيًا. الأفضل بناء
                عملية تقييم تجمع بين عدة عناصر يمكن رؤيتها واختبارها بوضوح.
              </p>

              <div className="mt-7">
                <ValidOrderBlockChart />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "Liquidity",
                    text: "هل حصل Sweep أو تفاعل واضح قرب High أو Low مهم؟",
                  },
                  {
                    n: "02",
                    title: "Origin",
                    text: "حدد آخر شمعة معاكسة قبل الحركة القوية.",
                  },
                  {
                    n: "03",
                    title: "Displacement",
                    text: "يجب أن يكون الخروج من المنطقة واضحًا وسريعًا نسبيًا.",
                  },
                  {
                    n: "04",
                    title: "Structure",
                    text: "ابحث عن BOS أو تغير مهم في هيكل السوق.",
                  },
                  {
                    n: "05",
                    title: "Retest",
                    text: "راقب أول عودة إلى المنطقة بدل مطاردة الحركة.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <h3
                        dir="ltr"
                        className="text-[11px] font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="هذه عوامل تقييم وليست شروطًا سحرية">
                قد تستخدم استراتيجيتك مجموعة مختلفة قليلًا من عوامل التأكيد.
                المهم أن تكون لديك قواعد واضحة وثابتة تستطيع تطبيقها على بيانات
                تاريخية بدل تغيير تعريف Order Block بعد رؤية نتيجة الصفقة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              04 — DISPLACEMENT
          ================================================= */}

          <section
            id="order-block-displacement"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>04 — Displacement</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                لماذا يعتبر Displacement مهمًا في Order Blocks؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Displacement</strong> هو حركة سعرية قوية وواضحة في
                  اتجاه واحد، وغالبًا تظهر على شكل شموع ذات أجسام كبيرة نسبيًا
                  مقارنة بالشموع التي سبقتها.
                </p>

                <p>
                  أهميته أنه يساعدك على التمييز بين منطقة خرج منها السعر
                  بقناعة واضحة وبين شمعة عادية داخل سوق متذبذب.
                </p>

                <p>
                  عندما يتحرك السعر ببطء بعد الشمعة ولا يكسر أي مستوى مهم، تكون
                  فكرة Order Block أضعف بكثير من حالة اندفاع سريع يغير شكل
                  السوق.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Large Bodies",
                    text: "أجسام الشموع في الحركة تكون أكبر بوضوح من الحركة المحيطة.",
                  },
                  {
                    n: "02",
                    title: "Directional Move",
                    text: "الحركة تسير بصورة حاسمة نسبيًا بدل التذبذب العشوائي.",
                  },
                  {
                    n: "03",
                    title: "Structural Impact",
                    text: "الأفضل أن تؤثر الحركة على Swing أو مستوى هيكلي مهم.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <h3
                        dir="ltr"
                        className="text-sm font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="ليس كل تحرك سريع Displacement صالحًا للتداول">
                السرعة وحدها لا تكفي. يجب قراءة موقع الحركة بالنسبة للهيكل
                والسيولة والمناطق المحيطة. شمعة كبيرة في منتصف Range قد تكون
                أقل أهمية من حركة تكسر Swing واضحًا.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              05 — BOS / CHOCH
          ================================================= */}

          <section
            id="order-block-bos-choch"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — هيكل السوق</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                علاقة Order Block بـBOS وCHOCH
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  كثير من متداولي Smart Money Concepts لا يعتبرون حركة الخروج
                  من Order Block مهمة إلا إذا أحدثت تغييرًا ملموسًا في
                  <strong> هيكل السوق</strong>.
                </p>

                <p>
                  <strong>Break of Structure — BOS</strong> يشير عادة إلى كسر
                  Swing مهم في اتجاه الحركة السائدة، بينما يستخدم مصطلح
                  <strong> Change of Character — CHOCH</strong> لوصف تغير مبكر
                  محتمل في السلوك أو الاتجاه.
                </p>

                <p>
                  التعريفات الدقيقة قد تختلف بين المدارس والمتداولين. لذلك لا
                  تجعل اسم الاختصار أهم من الشيء الذي تراه فعليًا على الشارت:
                  ما المستوى الذي كسر؟ وهل الإغلاق بعده واضح؟
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[24px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3
                    dir="ltr"
                    className="text-base font-black text-[#1E5BB8]"
                  >
                    BOS — Break of Structure
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-700">
                    يستخدم عادة عندما يتجاوز السعر Swing سابقًا في اتجاه
                    الحركة، ويعطي دليلًا أن الاندفاع أحدث أثرًا هيكليًا وليس
                    مجرد Bounce صغير.
                  </p>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <h3
                    dir="ltr"
                    className="text-base font-black text-slate-800"
                  >
                    CHOCH — Change of Character
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-700">
                    يستخدمه بعض المتداولين للإشارة إلى أول كسر يتعارض مع
                    الهيكل السابق وقد يكون علامة مبكرة على تغير السلوك.
                  </p>
                </div>
              </div>

              <ImportantBox title="حدد Swing الذي يهمك قبل أن ترى الكسر">
                من السهل جدًا بعد انتهاء الحركة اختيار مستوى صغير وتسميته BOS.
                الأفضل أن تحدد مسبقًا ما الذي تعتبره Swing مهمًا حتى تصبح
                القاعدة قابلة للاختبار.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              06 — FAIR VALUE GAP
          ================================================= */}

          <section
            id="order-block-fvg"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — Fair Value Gap</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما علاقة Fair Value Gap بالـOrder Block؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Fair Value Gap — FVG</strong> وOrder Block مفهومان
                  مختلفان رغم أنهما يظهران كثيرًا داخل نفس الحركة.
                </p>

                <p>
                  Order Block يركز على
                  <strong> أصل الحركة</strong>، أي الشمعة أو المنطقة التي سبقت
                  الـDisplacement. أما FVG فيركز على
                  <strong> عدم التوازن الذي خلفته الحركة</strong> بين مجموعة من
                  الشموع.
                </p>

                <p>
                  يمكن أن يظهر FVG مباشرة بعد Order Block، وقد يستخدم بعض
                  المتداولين تداخل المنطقتين كعامل إضافي في التحليل. لكن وجود
                  FVG لا يجعل أي Order Block ناجحًا تلقائيًا.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div
                  dir="ltr"
                  className="ob-centered-scroll overflow-x-auto"
                >
                  <svg
                    viewBox="0 0 1050 430"
                    className="block h-auto w-[920px] max-w-none sm:w-full"
                    role="img"
                    aria-label="مقارنة Order Block وFair Value Gap على شارت شموع"
                  >
                    <defs>
                      <pattern
                        id="obFvgGridAr"
                        width="52"
                        height="43"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M52 0 L0 0 0 43"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    <rect width="1050" height="430" fill="#ffffff" />
                    <rect
                      width="1050"
                      height="430"
                      fill="url(#obFvgGridAr)"
                    />

                    <rect
                      x="180"
                      y="296"
                      width="235"
                      height="80"
                      rx="8"
                      fill="#dbeafe"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />

                    <text
                      x="198"
                      y="321"
                      fontSize="10"
                      fontWeight="900"
                      fill="#1E5BB8"
                    >
                      ORDER BLOCK
                    </text>

                    <Candle
                      x={95}
                      open={185}
                      close={225}
                      high={169}
                      low={240}
                      bullish={false}
                    />
                    <Candle
                      x={140}
                      open={223}
                      close={267}
                      high={208}
                      low={282}
                      bullish={false}
                    />

                    <Candle
                      x={203}
                      open={266}
                      close={326}
                      high={249}
                      low={349}
                      bullish={false}
                      width={24}
                    />

                    <Candle
                      x={263}
                      open={325}
                      close={276}
                      high={258}
                      low={340}
                      bullish
                      width={22}
                    />

                    <Candle
                      x={323}
                      open={274}
                      close={205}
                      high={185}
                      low={290}
                      bullish
                      width={22}
                    />

                    <Candle
                      x={383}
                      open={203}
                      close={134}
                      high={115}
                      low={219}
                      bullish
                      width={22}
                    />

                    <Candle
                      x={443}
                      open={135}
                      close={88}
                      high={70}
                      low={150}
                      bullish
                      width={22}
                    />

                    {/* FVG zone */}
                    <rect
                      x="292"
                      y="202"
                      width="180"
                      height="72"
                      rx="7"
                      fill="#eff6ff"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <text
                      x="382"
                      y="242"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="900"
                      fill="#2563eb"
                    >
                      FAIR VALUE GAP
                    </text>

                    {/* continuation / pullback */}
                    <Candle
                      x={510}
                      open={90}
                      close={122}
                      high={74}
                      low={137}
                      bullish={false}
                    />
                    <Candle
                      x={555}
                      open={121}
                      close={157}
                      high={106}
                      low={172}
                      bullish={false}
                    />
                    <Candle
                      x={600}
                      open={155}
                      close={198}
                      high={140}
                      low={213}
                      bullish={false}
                    />

                    <Candle
                      x={645}
                      open={197}
                      close={243}
                      high={182}
                      low={258}
                      bullish={false}
                    />

                    <Candle
                      x={690}
                      open={241}
                      close={292}
                      high={226}
                      low={309}
                      bullish={false}
                    />

                    <Candle
                      x={735}
                      open={291}
                      close={327}
                      high={276}
                      low={351}
                      bullish={false}
                    />

                    <Candle
                      x={780}
                      open={326}
                      close={284}
                      high={267}
                      low={347}
                      bullish
                    />

                    <Candle
                      x={825}
                      open={283}
                      close={231}
                      high={214}
                      low={299}
                      bullish
                    />

                    <Candle
                      x={870}
                      open={230}
                      close={181}
                      high={164}
                      low={245}
                      bullish
                    />

                    <rect
                      x="170"
                      y="386"
                      width="155"
                      height="28"
                      rx="14"
                      fill="#0f172a"
                    />

                    <text
                      x="247"
                      y="404"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      ORIGIN OF THE MOVE
                    </text>

                    <rect
                      x="332"
                      y="153"
                      width="123"
                      height="28"
                      rx="14"
                      fill="#2563eb"
                    />

                    <text
                      x="393"
                      y="171"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      IMBALANCE
                    </text>
                  </svg>
                </div>
              </div>

              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid lg:grid-cols-3">
                  <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-l">
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-[#1E5BB8]"
                    >
                      Order Block
                    </div>
                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      يحدد أصل الحركة.
                    </p>
                  </div>

                  <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-l">
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-[#1E5BB8]"
                    >
                      Fair Value Gap
                    </div>
                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      يحدد عدم توازن داخل الحركة.
                    </p>
                  </div>

                  <div className="p-5">
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-[#1E5BB8]"
                    >
                      Displacement
                    </div>
                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      الحركة القوية التي يمكن أن تربط الاثنين.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              07 — LIQUIDITY
          ================================================= */}

          <section
            id="order-block-liquidity"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — السيولة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما علاقة Liquidity Sweep بالـOrder Block؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  كثير من نماذج Smart Money Concepts تراقب ما يحدث عند
                  <strong> القمم والقيعان الواضحة</strong> قبل تكوين Order
                  Block.
                </p>

                <p>
                  عندما يتجاوز السعر High أو Low سابقًا لفترة قصيرة ثم يعكس
                  اتجاهه بقوة، يصف بعض المتداولين ذلك بأنه
                  <strong> Liquidity Sweep</strong>.
                </p>

                <p>
                  الفكرة العملية ليست افتراض أن السوق “يطارد الستوبات” بشكل
                  مؤكد، وإنما ملاحظة أن السعر أخذ مستوى واضحًا ثم تغير سلوكه
                  بسرعة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Equal Highs",
                    text: "قمم متقاربة يراقبها عدد كبير من المتداولين.",
                  },
                  {
                    n: "02",
                    title: "Equal Lows",
                    text: "قيعان متقاربة قد تصبح منطقة اهتمام واضحة.",
                  },
                  {
                    n: "03",
                    title: "Swing High / Low",
                    text: "قمة أو قاع بارز داخل هيكل السوق.",
                  },
                  {
                    n: "04",
                    title: "Sweep + Reversal",
                    text: "تجاوز المستوى ثم ظهور انعكاس قوي وDisplacement.",
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

                      <h3
                        dir="ltr"
                        className="text-[11px] font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Liquidity Sweep عامل سياق وليس ضمانًا">
                وجود Sweep قبل Order Block قد يجعل السيناريو أوضح بصريًا، لكنه
                لا يضمن أن المنطقة ستصمد عند العودة. يجب أن يبقى القرار مرتبطًا
                بقواعد الدخول والمخاطر التي تم اختبارها.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              08 — FRESH / MITIGATED
          ================================================= */}

          <section
            id="fresh-mitigated-order-blocks"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Fresh & Mitigated</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما الفرق بين Fresh وMitigated Order Block؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يسمى Order Block عادة
                  <strong> Fresh أو Unmitigated</strong> عندما لم يعد السعر إلى
                  منطقته منذ الحركة التي أنشأته.
                </p>

                <p>
                  عند عودة السعر واختبار المنطقة لأول مرة، يستخدم مصطلح
                  <strong> Mitigation</strong> في كثير من أساليب SMC. وبعد
                  الاختبار تصبح المنطقة Tested أو Mitigated وفق تعريف
                  الاستراتيجية المستخدمة.
                </p>

                <p>
                  بعض المتداولين يعطون أول Retest أهمية إضافية، لكن هذا لا
                  يعني أن أول عودة ستنجح دائمًا أو أن كل منطقة مختبرة تصبح بلا
                  قيمة مباشرة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Fresh / Unmitigated",
                    text: "السعر غادر Order Block ولم يعد إلى المنطقة منذ تكوينها.",
                  },
                  {
                    n: "02",
                    title: "First Mitigation",
                    text: "السعر يعود إلى المنطقة لأول مرة ويتم تقييم رد الفعل.",
                  },
                  {
                    n: "03",
                    title: "Tested Block",
                    text: "المنطقة سبق أن اختبرت، ويجب تقييم أي عودة إضافية حسب قواعد الاستراتيجية.",
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

                      <h3
                        dir="ltr"
                        className="text-[11px] font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="Fresh لا تعني Guaranteed">
                كلمة Fresh تصف تاريخ المنطقة فقط: السعر لم يعد إليها بعد. لا
                تخبرنا مسبقًا إن كانت ستنجح أو تفشل عند أول اختبار.
              </ImportantBox>
            </div>
          </section>
                    {/* =================================================
              09 — HOW TO DRAW THE ORDER BLOCK
          ================================================= */}

          <section
            id="draw-order-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — رسم المنطقة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيفية رسم Order Block: جسم الشمعة أم الظل؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  بعد تحديد شمعة الـOrder Block، يأتي السؤال العملي:
                  <strong> أين تبدأ المنطقة وأين تنتهي؟</strong>
                </p>

                <p>
                  لا توجد طريقة واحدة يستخدمها جميع المتداولين. بعض الأساليب
                  تستخدم النطاق الكامل للشمعة من High إلى Low، بينما تستخدم
                  أساليب أخرى جسم الشمعة أو جزءًا محددًا منها.
                </p>

                <p>
                  الأهم ليس اختيار أضيق منطقة ممكنة بعد رؤية النتيجة، وإنما
                  اعتماد قاعدة ثابتة قبل الاختبار ثم قياس أدائها تاريخيًا.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div
                  dir="ltr"
                  className="ob-centered-scroll overflow-x-auto"
                >
                  <svg
                    viewBox="0 0 1100 520"
                    className="block h-auto w-[1000px] max-w-none sm:w-full"
                    role="img"
                    aria-label="طرق رسم حدود Order Block باستخدام كامل الشمعة أو جسم الشمعة"
                  >
                    <defs>
                      <pattern
                        id="drawObGridAr"
                        width="55"
                        height="52"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M55 0 L0 0 0 52"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    <rect width="1100" height="520" fill="#ffffff" />
                    <rect width="1100" height="520" fill="url(#drawObGridAr)" />

                    {/* LEFT */}
                    <rect
                      x="35"
                      y="30"
                      width="500"
                      height="455"
                      rx="22"
                      fill="#f8fafc"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />

                    <text
                      x="65"
                      y="70"
                      fontSize="17"
                      fontWeight="900"
                      fill="#0f172a"
                    >
                      FULL CANDLE RANGE
                    </text>

                    <text
                      x="65"
                      y="94"
                      fontSize="10"
                      fontWeight="700"
                      fill="#64748b"
                    >
                      High to Low
                    </text>

                    <rect
                      x="110"
                      y="276"
                      width="370"
                      height="137"
                      rx="10"
                      fill="#dbeafe"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />

                    <Candle
                      x={155}
                      open={180}
                      close={218}
                      high={164}
                      low={233}
                      bullish={false}
                    />
                    <Candle
                      x={198}
                      open={216}
                      close={258}
                      high={201}
                      low={274}
                      bullish={false}
                    />

                    <Candle
                      x={247}
                      open={258}
                      close={350}
                      high={276}
                      low={413}
                      bullish={false}
                      width={27}
                    />

                    <Candle
                      x={302}
                      open={349}
                      close={297}
                      high={278}
                      low={365}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={352}
                      open={295}
                      close={229}
                      high={210}
                      low={311}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={402}
                      open={227}
                      close={164}
                      high={145}
                      low={243}
                      bullish
                      width={22}
                    />

                    <line
                      x1="247"
                      y1="276"
                      x2="247"
                      y2="413"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                    />

                    <text
                      x="247"
                      y="442"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="900"
                      fill="#1E5BB8"
                    >
                      HIGH → LOW
                    </text>

                    {/* RIGHT */}
                    <rect
                      x="565"
                      y="30"
                      width="500"
                      height="455"
                      rx="22"
                      fill="#f8fafc"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />

                    <text
                      x="595"
                      y="70"
                      fontSize="17"
                      fontWeight="900"
                      fill="#0f172a"
                    >
                      BODY-BASED RANGE
                    </text>

                    <text
                      x="595"
                      y="94"
                      fontSize="10"
                      fontWeight="700"
                      fill="#64748b"
                    >
                      A narrower refinement method
                    </text>

                    <rect
                      x="640"
                      y="310"
                      width="370"
                      height="64"
                      rx="10"
                      fill="#dbeafe"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />

                    <Candle
                      x={685}
                      open={180}
                      close={218}
                      high={164}
                      low={233}
                      bullish={false}
                    />
                    <Candle
                      x={728}
                      open={216}
                      close={258}
                      high={201}
                      low={274}
                      bullish={false}
                    />

                    <Candle
                      x={777}
                      open={258}
                      close={350}
                      high={276}
                      low={413}
                      bullish={false}
                      width={27}
                    />

                    <Candle
                      x={832}
                      open={349}
                      close={297}
                      high={278}
                      low={365}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={882}
                      open={295}
                      close={229}
                      high={210}
                      low={311}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={932}
                      open={227}
                      close={164}
                      high={145}
                      low={243}
                      bullish
                      width={22}
                    />

                    <line
                      x1="777"
                      y1="310"
                      x2="777"
                      y2="374"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                    />

                    <text
                      x="777"
                      y="442"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="900"
                      fill="#1E5BB8"
                    >
                      REFINED RANGE
                    </text>
                  </svg>
                </div>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <h3 className="text-sm font-black text-slate-900">
                    النطاق الكامل
                  </h3>

                  <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600">
                    استخدام High وLow للشمعة يعطي منطقة أوسع وقد يجعل وقف
                    الخسارة أبعد، لكنه يتضمن كامل حركة الشمعة.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
                  <h3 className="text-sm font-black text-slate-900">
                    Refinement أضيق
                  </h3>

                  <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600">
                    استخدام الجسم أو جزء من الشمعة يعطي منطقة أدق، لكنه قد
                    يزيد احتمال أن يلمس السعر الظل دون الوصول إلى نقطة الدخول.
                  </p>
                </div>
              </div>

              <ImportantBox title="لا تغيّر طريقة الرسم حسب الصفقة">
                اختر تعريفًا محددًا للمنطقة واستخدمه باستمرار أثناء الاختبار.
                تضييق المنطقة بعد معرفة مكان انعكاس السعر يجعل نتائج
                الـBacktest أفضل بصورة مصطنعة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              10 — MULTI TIMEFRAME
          ================================================= */}

          <section
            id="order-block-timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — Multi-Timeframe</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                استخدام Order Blocks على أكثر من إطار زمني
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يمكن استخدام إطار زمني أكبر لتحديد الاتجاه والمنطقة الرئيسية،
                ثم الانتقال إلى إطار أصغر لمراقبة عودة السعر والبحث عن دخول
                أكثر تحديدًا.
              </p>

              <div className="mt-7 grid gap-3 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Higher Timeframe",
                    text: "حدد الاتجاه العام والـOrder Block الرئيسي أو منطقة الاهتمام.",
                    example: "مثال: Daily / H4",
                  },
                  {
                    n: "02",
                    title: "Execution Timeframe",
                    text: "راقب كيفية وصول السعر إلى المنطقة بدل الدخول لمجرد لمسها.",
                    example: "مثال: H1 / M15",
                  },
                  {
                    n: "03",
                    title: "Lower-Timeframe Trigger",
                    text: "ابحث عن Shift أو Displacement أو نموذج دخول واضح داخل المنطقة.",
                    example: "مثال: M15 / M5",
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

                      <h3
                        dir="ltr"
                        className="text-[12px] font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>

                    <div
                      dir="ltr"
                      className="mt-4 inline-flex rounded-lg bg-white px-2.5 py-1.5 text-[9px] font-black text-slate-500"
                    >
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>

              <ImportantBox title="الإطار الزمني الأصغر لا يصلح Order Block ضعيفًا">
                إذا كانت المنطقة الأساسية غير واضحة أو ضد السياق الذي حددته
                استراتيجيتك، فإن النزول إلى M5 أو M1 قد ينتج إشارات كثيرة لكنه
                لا يغيّر جودة الفكرة الأصلية.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              11 — ORDER BLOCK VS SUPPLY DEMAND
          ================================================= */}

          <section
            id="order-block-vs-supply-demand"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — المقارنة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                Order Block vs Supply and Demand: ما الفرق؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                المفهومان متشابهان لأن كليهما يبحث عن مناطق بدأ منها تحرك
                قوي، لكن طريقة التحديد والمصطلحات المستخدمة تختلف.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-right">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="p-4 text-[11px] font-black text-slate-900">
                          العنصر
                        </th>
                        <th
                          dir="ltr"
                          className="p-4 text-left text-[11px] font-black text-[#1E5BB8]"
                        >
                          Order Block
                        </th>
                        <th
                          dir="ltr"
                          className="p-4 text-left text-[11px] font-black text-slate-700"
                        >
                          Supply & Demand
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 text-[11px] font-medium leading-6 text-slate-600">
                      <tr>
                        <td className="p-4 font-black text-slate-800">
                          نقطة التركيز
                        </td>
                        <td className="p-4">
                          شمعة أو أصل محدد قبل Displacement
                        </td>
                        <td className="p-4">
                          Base أو منطقة أوسع قبل الحركة
                        </td>
                      </tr>

                      <tr>
                        <td className="p-4 font-black text-slate-800">
                          هيكل السوق
                        </td>
                        <td className="p-4">
                          BOS وCHOCH شائعان في عملية التقييم
                        </td>
                        <td className="p-4">
                          قد تعتمد الطريقة أساسًا على Departure وBase
                        </td>
                      </tr>

                      <tr>
                        <td className="p-4 font-black text-slate-800">
                          السيولة
                        </td>
                        <td className="p-4">
                          تستخدم بكثرة ضمن SMC/ICT
                        </td>
                        <td className="p-4">
                          ليست شرطًا في جميع مدارس العرض والطلب
                        </td>
                      </tr>

                      <tr>
                        <td className="p-4 font-black text-slate-800">
                          حجم المنطقة
                        </td>
                        <td className="p-4">غالبًا أكثر تحديدًا</td>
                        <td className="p-4">غالبًا أوسع نسبيًا</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <ImportantBox title="ليسا سوقين مختلفين">
                Order Blocks وSupply & Demand هما طريقتان لقراءة مناطق سعرية
                مرتبطة بحركات سابقة. لا يوجد ما يمنع أن تتداخل منطقة Order
                Block مع Demand أو Supply Zone على نفس الشارت.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — ENTRY METHODS
          ================================================= */}

          <section
            id="order-block-entry"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — الدخول</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                طرق الدخول من Order Block
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                بعد عودة السعر إلى المنطقة، توجد عدة طرق لبناء نقطة الدخول.
                الفرق الأساسي هو الموازنة بين الدخول المبكر وبين انتظار تأكيد
                إضافي.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Limit Entry",
                    badge: "Aggressive",
                    text: "وضع أمر مسبق داخل Order Block دون انتظار إشارة إضافية. يعطي دخولًا مبكرًا لكنه يتقبل احتمال فشل المنطقة مباشرة.",
                  },
                  {
                    n: "02",
                    title: "Reaction Entry",
                    badge: "Balanced",
                    text: "انتظار ظهور رفض أو شمعة استجابة واضحة بعد دخول السعر إلى المنطقة قبل تنفيذ الصفقة.",
                  },
                  {
                    n: "03",
                    title: "LTF Confirmation",
                    badge: "Conservative",
                    text: "الانتقال إلى إطار أصغر وانتظار تغير هيكلي أو Displacement قبل الدخول.",
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

                        <h3
                          dir="ltr"
                          className="text-[12px] font-black text-slate-900"
                        >
                          {item.title}
                        </h3>
                      </div>

                      <span
                        dir="ltr"
                        className="rounded-full bg-slate-100 px-2 py-1 text-[8px] font-black text-slate-500"
                      >
                        {item.badge}
                      </span>
                    </div>

                    <p className="mt-4 text-[11px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="الدخول الأكثر دقة ليس بالضرورة الأفضل">
                تضييق الدخول قد يحسن Risk/Reward نظريًا، لكنه قد يؤدي أيضًا
                إلى فقدان صفقات تحركت دون إعطاء التأكيد المطلوب. قارن طرق
                الدخول على نفس البيانات قبل اختيار واحدة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              13 — STOP LOSS / TARGETS
          ================================================= */}

          <section
            id="order-block-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Stop Loss & Targets</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أين يوضع وقف الخسارة والهدف في Order Block؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  في السيناريو الصاعد، يوضع وقف الخسارة عادة خلف الحد الذي
                  تعتبر الاستراتيجية تجاوزه إبطالًا للـBullish Order Block.
                  وفي السيناريو الهابط يكون العكس.
                </p>

                <p>
                  أما الأهداف فيمكن ربطها بـSwing High أو Swing Low سابق،
                  منطقة سيولة، Order Block مقابل، أو نسبة Risk/Reward محددة
                  مسبقًا.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700">
                      SL
                    </span>
                    <h3 className="text-[12px] font-black text-slate-900">
                      Invalidation
                    </h3>
                  </div>

                  <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600">
                    ضع الوقف في مكان يعني وصول السعر إليه أن فرضية الصفقة لم
                    تعد صالحة وفق قواعدك.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8]">
                      TP1
                    </span>
                    <h3 className="text-[12px] font-black text-slate-900">
                      Nearest Liquidity
                    </h3>
                  </div>

                  <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600">
                    Swing أو مستوى واضح قريب يمكن استخدامه كهدف أول إذا كان
                    متوافقًا مع خطة الصفقة.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700">
                      TP2
                    </span>
                    <h3 className="text-[12px] font-black text-slate-900">
                      Extended Target
                    </h3>
                  </div>

                  <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600">
                    هدف أبعد مثل Liquidity Pool أو منطقة فنية مقابلة، إذا كان
                    السياق يسمح باستمرار الحركة.
                  </p>
                </div>
              </div>

              <ImportantBox title="لا تختَر حجم الصفقة من مسافة الوقف وحدها">
                حدد أولًا مقدار رأس المال الذي تقبل خسارته في الصفقة، ثم احسب
                حجم المركز بناءً على المسافة بين الدخول وStop Loss. المنطقة
                الجيدة لا تلغي احتمال الخسارة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              14 — BULLISH EXAMPLE
          ================================================= */}

          <section
            id="bullish-order-block-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — مثال شراء</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                مثال عملي على Bullish Order Block
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                المثال التالي يوضح تسلسلًا تعليميًا: تكوين Bullish Order
                Block، خروج قوي، كسر قمة سابقة، عودة السعر إلى المنطقة، ثم
                ظهور رد فعل صاعد.
              </p>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div
                  dir="ltr"
                  className="ob-centered-scroll overflow-x-auto"
                >
                  <svg
                    viewBox="0 0 1180 610"
                    className="block h-auto w-[1060px] max-w-none sm:w-full"
                    role="img"
                    aria-label="مثال صفقة شراء من Bullish Order Block مع Entry وStop Loss وTake Profit"
                  >
                    <defs>
                      <pattern
                        id="bullObExampleGridAr"
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
                      fill="url(#bullObExampleGridAr)"
                    />

                    {/* Previous high */}
                    <line
                      x1="70"
                      y1="205"
                      x2="655"
                      y2="205"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="7 6"
                    />

                    <text
                      x="78"
                      y="190"
                      fontSize="9"
                      fontWeight="900"
                      fill="#64748b"
                    >
                      PREVIOUS SWING HIGH
                    </text>

                    {/* OB */}
                    <rect
                      x="220"
                      y="375"
                      width="570"
                      height="93"
                      rx="10"
                      fill="#dbeafe"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />

                    <text
                      x="240"
                      y="400"
                      fontSize="10"
                      fontWeight="900"
                      fill="#1E5BB8"
                    >
                      BULLISH ORDER BLOCK
                    </text>

                    <Candle
                      x={110}
                      open={245}
                      close={282}
                      high={229}
                      low={298}
                      bullish={false}
                    />
                    <Candle
                      x={153}
                      open={280}
                      close={321}
                      high={265}
                      low={337}
                      bullish={false}
                    />
                    <Candle
                      x={196}
                      open={319}
                      close={357}
                      high={304}
                      low={372}
                      bullish={false}
                    />

                    <Candle
                      x={245}
                      open={356}
                      close={416}
                      high={340}
                      low={442}
                      bullish={false}
                      width={24}
                    />

                    <Candle
                      x={298}
                      open={414}
                      close={360}
                      high={342}
                      low={430}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={348}
                      open={358}
                      close={296}
                      high={278}
                      low={374}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={398}
                      open={294}
                      close={232}
                      high={214}
                      low={310}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={448}
                      open={230}
                      close={168}
                      high={149}
                      low={246}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={498}
                      open={166}
                      close={126}
                      high={108}
                      low={181}
                      bullish
                    />

                    {/* BOS */}
                    <line
                      x1="448"
                      y1="205"
                      x2="650"
                      y2="205"
                      stroke="#2563eb"
                      strokeWidth="3"
                    />

                    <rect
                      x="522"
                      y="176"
                      width="88"
                      height="28"
                      rx="14"
                      fill="#2563eb"
                    />

                    <text
                      x="566"
                      y="194"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      BOS
                    </text>

                    {/* pullback */}
                    <Candle
                      x={550}
                      open={128}
                      close={164}
                      high={112}
                      low={179}
                      bullish={false}
                    />
                    <Candle
                      x={594}
                      open={162}
                      close={209}
                      high={147}
                      low={224}
                      bullish={false}
                    />
                    <Candle
                      x={638}
                      open={207}
                      close={258}
                      high={192}
                      low={274}
                      bullish={false}
                    />
                    <Candle
                      x={682}
                      open={256}
                      close={309}
                      high={241}
                      low={325}
                      bullish={false}
                    />
                    <Candle
                      x={726}
                      open={307}
                      close={390}
                      high={292}
                      low={411}
                      bullish={false}
                      width={21}
                    />

                    {/* Entry */}
                    <circle
                      cx="726"
                      cy="389"
                      r="11"
                      fill="#ffffff"
                      stroke="#2563eb"
                      strokeWidth="3"
                    />

                    <line
                      x1="726"
                      y1="389"
                      x2="920"
                      y2="389"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <rect
                      x="920"
                      y="374"
                      width="91"
                      height="30"
                      rx="15"
                      fill="#2563eb"
                    />

                    <text
                      x="965"
                      y="393"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      ENTRY
                    </text>

                    {/* Stop */}
                    <line
                      x1="690"
                      y1="482"
                      x2="1015"
                      y2="482"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <rect
                      x="920"
                      y="467"
                      width="91"
                      height="30"
                      rx="15"
                      fill="#0f172a"
                    />

                    <text
                      x="965"
                      y="486"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      STOP LOSS
                    </text>

                    {/* reaction */}
                    <Candle
                      x={776}
                      open={390}
                      close={345}
                      high={328}
                      low={410}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={826}
                      open={343}
                      close={286}
                      high={269}
                      low={359}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={876}
                      open={284}
                      close={226}
                      high={208}
                      low={300}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={926}
                      open={224}
                      close={166}
                      high={148}
                      low={240}
                      bullish
                      width={22}
                    />
                    <Candle
                      x={976}
                      open={164}
                      close={119}
                      high={101}
                      low={180}
                      bullish
                      width={22}
                    />

                    {/* target */}
                    <line
                      x1="850"
                      y1="119"
                      x2="1080"
                      y2="119"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <rect
                      x="1005"
                      y="104"
                      width="82"
                      height="30"
                      rx="15"
                      fill="#2563eb"
                    />

                    <text
                      x="1046"
                      y="123"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      TARGET
                    </text>

                    <text
                      x="590"
                      y="558"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="900"
                      fill="#475569"
                    >
                      ORDER BLOCK → DISPLACEMENT → BOS → RETEST → REACTION
                    </text>

                    <text
                      x="590"
                      y="580"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      fill="#94a3b8"
                    >
                      Educational example — real market outcomes can differ
                    </text>
                  </svg>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["01", "حدد OB", "آخر شمعة هابطة قبل الاندفاع."],
                  ["02", "راقب BOS", "الحركة تكسر Swing High واضحًا."],
                  ["03", "انتظر Retest", "لا تطارد الحركة الصاعدة."],
                  ["04", "حدد Invalidation", "الوقف خلف المستوى المحدد."],
                  ["05", "خطط للهدف", "استهدف مستوى منطقيًا وفق خطتك."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {n}
                      </span>
                      <h3 className="text-[11px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[10px] font-medium leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              15 — BEARISH EXAMPLE
          ================================================= */}

          <section
            id="bearish-order-block-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — مثال بيع</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                مثال عملي على Bearish Order Block
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                السيناريو الهابط يعكس المنطق السابق: آخر شمعة صاعدة قبل
                Displacement هابط، ثم كسر قاع سابق وعودة السعر إلى المنطقة
                قبل البحث عن فرصة بيع.
              </p>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div
                  dir="ltr"
                  className="ob-centered-scroll overflow-x-auto"
                >
                  <svg
                    viewBox="0 0 1180 610"
                    className="block h-auto w-[1060px] max-w-none sm:w-full"
                    role="img"
                    aria-label="مثال صفقة بيع من Bearish Order Block مع Entry وStop Loss وTarget"
                  >
                    <defs>
                      <pattern
                        id="bearObExampleGridAr"
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
                      fill="url(#bearObExampleGridAr)"
                    />

                    <line
                      x1="70"
                      y1="392"
                      x2="650"
                      y2="392"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="7 6"
                    />

                    <text
                      x="78"
                      y="379"
                      fontSize="9"
                      fontWeight="900"
                      fill="#64748b"
                    >
                      PREVIOUS SWING LOW
                    </text>

                    <rect
                      x="210"
                      y="132"
                      width="580"
                      height="94"
                      rx="10"
                      fill="#f1f5f9"
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />

                    <text
                      x="230"
                      y="158"
                      fontSize="10"
                      fontWeight="900"
                      fill="#475569"
                    >
                      BEARISH ORDER BLOCK
                    </text>

                    <Candle
                      x={105}
                      open={345}
                      close={305}
                      high={289}
                      low={361}
                      bullish
                    />
                    <Candle
                      x={150}
                      open={303}
                      close={263}
                      high={247}
                      low={319}
                      bullish
                    />
                    <Candle
                      x={195}
                      open={261}
                      close={220}
                      high={204}
                      low={277}
                      bullish
                    />

                    <Candle
                      x={245}
                      open={218}
                      close={162}
                      high={139}
                      low={234}
                      bullish
                      width={24}
                    />

                    <Candle
                      x={298}
                      open={164}
                      close={220}
                      high={148}
                      low={237}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={348}
                      open={222}
                      close={282}
                      high={206}
                      low={299}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={398}
                      open={284}
                      close={343}
                      high={268}
                      low={360}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={448}
                      open={345}
                      close={410}
                      high={329}
                      low={428}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={498}
                      open={411}
                      close={454}
                      high={395}
                      low={470}
                      bullish={false}
                    />

                    <line
                      x1="448"
                      y1="392"
                      x2="650"
                      y2="392"
                      stroke="#475569"
                      strokeWidth="3"
                    />

                    <rect
                      x="522"
                      y="393"
                      width="88"
                      height="28"
                      rx="14"
                      fill="#0f172a"
                    />

                    <text
                      x="566"
                      y="411"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      BOS
                    </text>

                    {/* pullback */}
                    <Candle
                      x={550}
                      open={452}
                      close={415}
                      high={399}
                      low={468}
                      bullish
                    />
                    <Candle
                      x={594}
                      open={413}
                      close={369}
                      high={353}
                      low={429}
                      bullish
                    />
                    <Candle
                      x={638}
                      open={367}
                      close={317}
                      high={301}
                      low={383}
                      bullish
                    />
                    <Candle
                      x={682}
                      open={315}
                      close={264}
                      high={248}
                      low={331}
                      bullish
                    />
                    <Candle
                      x={726}
                      open={262}
                      close={185}
                      high={166}
                      low={278}
                      bullish
                      width={21}
                    />

                    <circle
                      cx="726"
                      cy="185"
                      r="11"
                      fill="#ffffff"
                      stroke="#475569"
                      strokeWidth="3"
                    />

                    <line
                      x1="726"
                      y1="185"
                      x2="920"
                      y2="185"
                      stroke="#475569"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <rect
                      x="920"
                      y="170"
                      width="91"
                      height="30"
                      rx="15"
                      fill="#0f172a"
                    />

                    <text
                      x="965"
                      y="189"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      ENTRY
                    </text>

                    <line
                      x1="690"
                      y1="116"
                      x2="1015"
                      y2="116"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <rect
                      x="920"
                      y="101"
                      width="91"
                      height="30"
                      rx="15"
                      fill="#475569"
                    />

                    <text
                      x="965"
                      y="120"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      STOP LOSS
                    </text>

                    {/* reaction */}
                    <Candle
                      x={776}
                      open={186}
                      close={233}
                      high={169}
                      low={249}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={826}
                      open={235}
                      close={292}
                      high={219}
                      low={309}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={876}
                      open={294}
                      close={350}
                      high={278}
                      low={367}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={926}
                      open={352}
                      close={410}
                      high={336}
                      low={427}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={976}
                      open={412}
                      close={458}
                      high={396}
                      low={475}
                      bullish={false}
                      width={22}
                    />

                    <line
                      x1="850"
                      y1="458"
                      x2="1080"
                      y2="458"
                      stroke="#475569"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <rect
                      x="1005"
                      y="443"
                      width="82"
                      height="30"
                      rx="15"
                      fill="#0f172a"
                    />

                    <text
                      x="1046"
                      y="462"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      TARGET
                    </text>

                    <text
                      x="590"
                      y="558"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="900"
                      fill="#475569"
                    >
                      BEARISH OB → DISPLACEMENT → BOS → RETEST → SELL REACTION
                    </text>

                    <text
                      x="590"
                      y="580"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      fill="#94a3b8"
                    >
                      Educational example — not a prediction of future price
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              16 — BREAKER BLOCK
          ================================================= */}

          <section
            id="breaker-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — Breaker Block</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما هو Breaker Block وما علاقته بالـOrder Block؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>Breaker Block</strong> يرتبط بفشل منطقة سابقة ثم تغير
                  دورها بعد اختراقها وظهور تغير في هيكل السوق.
                </p>

                <p>
                  مثال مبسط: Bullish Order Block كان متوقعًا أن يعمل كدعم، لكن
                  السعر اخترقه هبوطًا. إذا عاد السعر لاحقًا إلى المنطقة من
                  الأسفل، فقد يتعامل معها بعض متداولي SMC كـBearish Breaker.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                <div
                  dir="ltr"
                  className="ob-centered-scroll overflow-x-auto"
                >
                  <svg
                    viewBox="0 0 1100 520"
                    className="block h-auto w-[1000px] max-w-none sm:w-full"
                    role="img"
                    aria-label="تحول Bullish Order Block فاشل إلى Bearish Breaker Block"
                  >
                    <defs>
                      <pattern
                        id="breakerGridAr"
                        width="55"
                        height="52"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M55 0 L0 0 0 52"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    <rect width="1100" height="520" fill="#ffffff" />
                    <rect width="1100" height="520" fill="url(#breakerGridAr)" />

                    <rect
                      x="95"
                      y="218"
                      width="880"
                      height="84"
                      rx="10"
                      fill="#eff6ff"
                      stroke="#60a5fa"
                      strokeWidth="2"
                    />

                    <text
                      x="115"
                      y="244"
                      fontSize="10"
                      fontWeight="900"
                      fill="#1E5BB8"
                    >
                      ORIGINAL BULLISH ORDER BLOCK
                    </text>

                    <Candle
                      x={135}
                      open={365}
                      close={327}
                      high={311}
                      low={381}
                      bullish
                    />
                    <Candle
                      x={180}
                      open={325}
                      close={285}
                      high={269}
                      low={341}
                      bullish
                    />
                    <Candle
                      x={225}
                      open={283}
                      close={243}
                      high={227}
                      low={299}
                      bullish
                    />

                    <Candle
                      x={270}
                      open={242}
                      close={277}
                      high={226}
                      low={294}
                      bullish={false}
                    />

                    <Candle
                      x={315}
                      open={276}
                      close={330}
                      high={260}
                      low={347}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={360}
                      open={329}
                      close={383}
                      high={313}
                      low={400}
                      bullish={false}
                      width={22}
                    />

                    <line
                      x1="360"
                      y1="302"
                      x2="360"
                      y2="422"
                      stroke="#475569"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <rect
                      x="298"
                      y="425"
                      width="124"
                      height="30"
                      rx="15"
                      fill="#0f172a"
                    />

                    <text
                      x="360"
                      y="444"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      OB FAILURE
                    </text>

                    {/* continuation down */}
                    <Candle
                      x={410}
                      open={381}
                      close={423}
                      high={365}
                      low={440}
                      bullish={false}
                    />
                    <Candle
                      x={455}
                      open={421}
                      close={455}
                      high={405}
                      low={472}
                      bullish={false}
                    />

                    {/* retrace upward */}
                    <Candle
                      x={510}
                      open={454}
                      close={415}
                      high={398}
                      low={470}
                      bullish
                    />
                    <Candle
                      x={555}
                      open={413}
                      close={371}
                      high={355}
                      low={429}
                      bullish
                    />
                    <Candle
                      x={600}
                      open={369}
                      close={329}
                      high={313}
                      low={385}
                      bullish
                    />
                    <Candle
                      x={645}
                      open={327}
                      close={282}
                      high={266}
                      low={343}
                      bullish
                    />

                    {/* retest breaker */}
                    <Candle
                      x={690}
                      open={280}
                      close={247}
                      high={230}
                      low={296}
                      bullish
                    />

                    <circle
                      cx="690"
                      cy="247"
                      r="11"
                      fill="#ffffff"
                      stroke="#475569"
                      strokeWidth="3"
                    />

                    <rect
                      x="720"
                      y="188"
                      width="177"
                      height="31"
                      rx="15.5"
                      fill="#0f172a"
                    />

                    <text
                      x="808"
                      y="208"
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      BEARISH BREAKER RETEST
                    </text>

                    {/* rejection */}
                    <Candle
                      x={745}
                      open={249}
                      close={291}
                      high={233}
                      low={307}
                      bullish={false}
                    />
                    <Candle
                      x={790}
                      open={289}
                      close={339}
                      high={273}
                      low={356}
                      bullish={false}
                    />
                    <Candle
                      x={835}
                      open={337}
                      close={390}
                      high={321}
                      low={407}
                      bullish={false}
                      width={22}
                    />
                    <Candle
                      x={880}
                      open={388}
                      close={434}
                      high={372}
                      low={451}
                      bullish={false}
                    />

                    <text
                      x="535"
                      y="490"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="900"
                      fill="#475569"
                    >
                      ORDER BLOCK → FAILURE → ROLE FLIP → BREAKER RETEST
                    </text>
                  </svg>
                </div>
              </div>

              <ImportantBox title="الفشل هو الفرق الأساسي">
                Order Block الأصلي يفترض بقاء المنطقة في اتجاهها الأصلي، بينما
                Breaker يعتمد على أن المنطقة فشلت ثم أصبحت ذات دور معاكس بعد
                تغير السياق.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              17 — MITIGATION BLOCK
          ================================================= */}

          <section
            id="mitigation-block"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — Mitigation Block</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما هو Mitigation Block؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  مصطلح <strong>Mitigation Block</strong> يستخدم بتعريفات
                  مختلفة قليلًا بين مدارس ومصادر SMC، لذلك يجب عدم الخلط بينه
                  وبين مجرد عملية Mitigation للـOrder Block.
                </p>

                <p>
                  عمليًا، الأهم للمتداول هو تحديد حالة المنطقة بدقة: هل لم
                  تختبر بعد؟ هل عاد السعر إليها وتفاعل معها؟ أم تم اختراقها
                  بالكامل وأصبحت الفرضية الأصلية غير صالحة؟
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Fresh Block",
                    text: "منطقة لم يعد السعر إليها منذ تكوينها.",
                  },
                  {
                    n: "02",
                    title: "Mitigated / Tested",
                    text: "السعر عاد إلى المنطقة وتفاعل معها دون اعتبار ذلك ضمانًا لاستمرارها.",
                  },
                  {
                    n: "03",
                    title: "Failed / Breaker",
                    text: "السعر اخترق المنطقة وأبطل منطقها الأصلي؛ وقد تصبح Breaker إذا تحقق نموذج الانقلاب.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </span>

                      <h3
                        dir="ltr"
                        className="text-[11px] font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="اكتب تعريفك داخل خطة التداول">
                لأن المصطلحات تختلف بين بعض مدارس SMC، اكتب بوضوح ما الذي
                تعتبره Fresh وTested وInvalidated وBreaker قبل إجراء
                الـBacktest. المهم هو ثبات القاعدة وليس اسمها فقط.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              18 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="order-block-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — إدارة المخاطر</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                إدارة المخاطر عند تداول Order Blocks
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                حتى أفضل Order Block بصريًا يمكن أن يفشل. لذلك يجب أن تكون
                إدارة المخاطر جزءًا من النموذج نفسه، وليس قرارًا يتم اتخاذه بعد
                الدخول.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Fixed Risk",
                    text: "حدد نسبة أو مبلغ مخاطرة ثابتًا يناسب خطتك.",
                  },
                  {
                    n: "02",
                    title: "Position Size",
                    text: "احسب حجم الصفقة وفق المسافة الفعلية إلى Stop Loss.",
                  },
                  {
                    n: "03",
                    title: "Invalidation",
                    text: "لا توسع الوقف فقط لأن السعر اقترب منه.",
                  },
                  {
                    n: "04",
                    title: "Risk / Reward",
                    text: "تأكد أن الهدف المتوقع يبرر المخاطرة وفق نتائج اختبارك.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </span>

                      <h3
                        dir="ltr"
                        className="text-[11px] font-black text-slate-900"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[10px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="نسبة نجاح عالية ليست شرطًا للاستراتيجية الجيدة">
                أداء النظام يعتمد على العلاقة بين معدل النجاح ومتوسط الربح
                والخسارة والتكاليف والتنفيذ. لذلك قيّم النتائج كمنظومة كاملة
                بدل التركيز على Win Rate وحده.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              19 — COMMON MISTAKES
          ================================================= */}

          <section
            id="order-block-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — الأخطاء الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أشهر أخطاء تداول Order Blocks
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "كل شمعة تصبح Order Block",
                    text: "تحديد آخر شمعة معاكسة دون وجود حركة مهمة بعدها يؤدي إلى عشرات المناطق غير المفيدة.",
                  },
                  {
                    n: "02",
                    title: "تجاهل Market Structure",
                    text: "منطقة جميلة بصريًا لا تكفي إذا كانت معزولة عن السياق والهيكل.",
                  },
                  {
                    n: "03",
                    title: "مطاردة Displacement",
                    text: "الدخول بعد أن ابتعد السعر كثيرًا عن المنطقة يغيّر تمامًا منطق الصفقة.",
                  },
                  {
                    n: "04",
                    title: "تغيير حدود المنطقة",
                    text: "تعديل الرسم بعد رؤية الانعكاس يجعل الاختبار التاريخي غير موضوعي.",
                  },
                  {
                    n: "05",
                    title: "وقف ضيق عشوائيًا",
                    text: "Stop Loss يجب أن يرتبط بنقطة إبطال واضحة وليس فقط بالحصول على RR أكبر.",
                  },
                  {
                    n: "06",
                    title: "عدم اختبار القواعد",
                    text: "رؤية أمثلة ناجحة على الشارت لا تثبت أن النموذج يملك أفضلية إحصائية.",
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

                      <h3 className="text-[11px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[10px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              20 — BACKTESTING
          ================================================= */}

          <section
            id="backtest-order-blocks"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — Backtesting</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيفية اختبار استراتيجية Order Blocks
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                أفضل طريقة لمعرفة ما إذا كانت قواعدك مفيدة هي اختبارها على
                بيانات لم تُستخدم في بناء النموذج وتسجيل كل صفقة بنفس المعايير.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["01", "اختر السوق", "ابدأ بأداة واحدة بدل تغيير السوق باستمرار."],
                  ["02", "حدد Timeframe", "استخدم نفس إطار التحليل والتنفيذ أثناء العينة."],
                  ["03", "اكتب القواعد", "عرّف OB وBOS والدخول والوقف والهدف مسبقًا."],
                  ["04", "Replay", "تحرك شمعة بشمعة لتقليل تأثير معرفة المستقبل."],
                  ["05", "سجل النتائج", "احتفظ بالدخول والوقف والهدف والنتيجة وصورة للشارت."],
                  ["06", "حلل العينة", "قارن Win Rate وAverage R والتراجع وأنواع الإعدادات."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {n}
                      </span>

                      <h3 className="text-[11px] font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-[10px] font-medium leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="تجنب Hindsight Bias">
                إذا شاهدت الشارت كاملًا ثم اخترت فقط Order Blocks التي أدت إلى
                انعكاسات ممتازة، فأنت تختبر النتيجة وليس الاستراتيجية. استخدم
                Replay أو أخفِ الشموع المستقبلية قدر الإمكان.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              21 — BEGINNER ROADMAP
          ================================================= */}

          <section
            id="order-block-roadmap"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>21 — خارطة التعلم</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف تتعلم Order Blocks كمبتدئ؟
              </h2>

              <div className="mt-7 grid gap-3 lg:grid-cols-5">
                {[
                  ["01", "Market Structure", "تعلم Swing High وSwing Low والاتجاه أولًا."],
                  ["02", "Displacement", "تعرف على الحركة القوية مقابل الحركة العادية."],
                  ["03", "Order Blocks", "ابدأ فقط بـBullish وBearish OB."],
                  ["04", "Liquidity & FVG", "أضف عناصر السياق بعد فهم الأساس."],
                  ["05", "Execution", "ابنِ قواعد دخول ومخاطر ثم اختبرها."],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {n}
                      </span>

                      <h3
                        dir="ltr"
                        className="text-[10px] font-black text-slate-900"
                      >
                        {title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              22 — CHECKLIST
          ================================================= */}

          <section
            id="order-block-checklist"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>22 — Checklist</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                قائمة فحص Order Block قبل الدخول
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "هل يوجد Displacement واضح من المنطقة؟",
                  "هل أثرت الحركة على Market Structure مهم؟",
                  "هل حددت شمعة Order Block وفق قاعدة ثابتة؟",
                  "هل المنطقة Fresh أم سبق اختبارها؟",
                  "هل الاتجاه على الإطار الأكبر متوافق مع خطتك؟",
                  "هل يوجد Liquidity أو FVG يدعم السياق؟",
                  "هل نقطة Invalidation واضحة قبل الدخول؟",
                  "هل تم حساب Position Size وفق المخاطرة؟",
                  "هل الهدف منطقي بالنسبة لمسافة Stop Loss؟",
                  "هل الصفقة تطابق قواعد الـBacktest فعلًا؟",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[11px] font-bold leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              FAQ
          ================================================= */}

          <section
            id="order-block-faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>الأسئلة الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أسئلة شائعة حول Order Blocks
              </h2>

              <div className="mt-7 space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/40"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-[12px] font-black leading-6 text-slate-900 sm:text-[13px]">
                          {item.question}
                        </h3>
                      </div>

                      <span className="text-lg font-bold text-slate-400 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 px-4 py-4 sm:px-5">
                      <p className="text-[11px] font-medium leading-7 text-slate-600 sm:text-[12px]">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-[#D6E5F8] bg-[#EEF5FD]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>الخلاصة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                خلاصة استراتيجية Order Blocks
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Order Block ليس كل شمعة معاكسة؛ الحركة التي تليه هي الأساس.",
                  "Bullish OB يكون عادة آخر شمعة هابطة قبل اندفاع صاعد مهم.",
                  "Bearish OB يكون عادة آخر شمعة صاعدة قبل اندفاع هابط مهم.",
                  "Displacement وMarket Structure يساعدان في تصفية المناطق.",
                  "FVG والسيولة عوامل سياق وليسا ضمانًا لنجاح المنطقة.",
                  "يجب تحديد الدخول والوقف والهدف والمخاطرة قبل تنفيذ الصفقة.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-white/80 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                      {index + 1}
                    </span>

                    <p className="text-[11px] font-bold leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[12px] font-medium leading-8 text-slate-700 sm:text-[13px]">
                الهدف من Order Blocks ليس التنبؤ بكل انعكاس في السوق، وإنما
                بناء طريقة منظمة لتحديد أصل بعض الحركات القوية ثم تقييم عودة
                السعر إليها ضمن سياق واضح وإدارة مخاطر قابلة للاختبار.
              </p>
            </div>
          </section>

          {/* =================================================
              RELATED GUIDES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>أدلة مرتبطة</SectionLabel>

              <h2 className="text-[22px] font-black text-slate-950 sm:text-[27px]">
                أكمل تعلم استراتيجيات حركة السعر
              </h2>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <a
                  href="/strategies/smart-money-concepts"
                  className="group rounded-[22px] border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-300 hover:bg-blue-50/30"
                >
                  <span
                    dir="ltr"
                    className="text-[9px] font-black uppercase tracking-[0.14em] text-[#1E5BB8]"
                  >
                    Smart Money Concepts
                  </span>

                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    استراتيجية الأموال الذكية SMC
                  </h3>

                  <p className="mt-2 text-[10px] font-medium leading-6 text-slate-600">
                    تعرّف على هيكل السوق والسيولة وBOS وCHOCH وFVG والمفاهيم
                    المرتبطة بها.
                  </p>

                  <div className="mt-4 text-[10px] font-black text-[#1E5BB8]">
                    اقرأ الدليل ←
                  </div>
                </a>

                <a
                  href="/strategies/supply-and-demand"
                  className="group rounded-[22px] border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-300 hover:bg-blue-50/30"
                >
                  <span
                    dir="ltr"
                    className="text-[9px] font-black uppercase tracking-[0.14em] text-[#1E5BB8]"
                  >
                    Supply & Demand
                  </span>

                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    استراتيجية العرض والطلب
                  </h3>

                  <p className="mt-2 text-[10px] font-medium leading-6 text-slate-600">
                    تعلم كيفية تحديد ورسم مناطق العرض والطلب وتقييم Fresh
                    Zones والعودة إلى المنطقة.
                  </p>

                  <div className="mt-4 text-[10px] font-black text-[#1E5BB8]">
                    اقرأ الدليل ←
                  </div>
                </a>

                <a
                  href="/strategies/support-and-resistance"
                  className="group rounded-[22px] border border-slate-200 bg-slate-50/50 p-5 transition hover:border-blue-300 hover:bg-blue-50/30"
                >
                  <span
                    dir="ltr"
                    className="text-[9px] font-black uppercase tracking-[0.14em] text-[#1E5BB8]"
                  >
                    Support & Resistance
                  </span>

                  <h3 className="mt-2 text-sm font-black text-slate-900">
                    استراتيجية الدعم والمقاومة
                  </h3>

                  <p className="mt-2 text-[10px] font-medium leading-6 text-slate-600">
                    فهم المستويات الأفقية والاختراقات وإعادة الاختبار وتغير
                    الأدوار بين الدعم والمقاومة.
                  </p>

                  <div className="mt-4 text-[10px] font-black text-[#1E5BB8]">
                    اقرأ الدليل ←
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[30px] bg-slate-950 text-white shadow-sm">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(43,111,208,0.28),transparent_35%)]" />

              <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[1fr_auto]">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-300">
                    Broker Alarab
                  </span>

                  <h2 className="mt-3 text-[23px] font-black leading-[1.45] sm:text-[29px]">
                    الاستراتيجية وحدها ليست كافية — التنفيذ وإدارة المخاطر
                    جزء من الخطة
                  </h2>

                  <p className="mt-3 max-w-[850px] text-[12px] font-medium leading-7 text-slate-300 sm:text-[13px]">
                    استخدم أدوات بروكر العرب التعليمية لفهم المخاطر وحجم
                    الصفقة والهامش قبل الانتقال من تحليل الشارت إلى التنفيذ.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/tools"
                    className="rounded-xl bg-white px-5 py-3 text-[11px] font-black text-slate-950 transition hover:bg-blue-50"
                  >
                    أدوات التداول
                  </a>

                  <a
                    href="/strategies"
                    className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-[11px] font-black text-white transition hover:bg-white/15"
                  >
                    جميع الاستراتيجيات
                  </a>
                </div>
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

      {/* =====================================================
          MOBILE CENTERED SVG SCROLL + FULLSCREEN
      ===================================================== */}

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
            direction: ltr;
          }
        }

        #ob-types-fullscreen:target,
        #valid-ob-fullscreen:target {
          display: flex;
        }
      `}</style>
    </main>
  );
}