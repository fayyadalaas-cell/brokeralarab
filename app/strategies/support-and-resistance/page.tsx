import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/support-and-resistance`;
const EN_PAGE_URL = `${BASE_URL}/en/strategies/support-and-resistance`;

const PAGE_TITLE =
  "استراتيجية الدعم والمقاومة Support and Resistance في التداول";

const PAGE_DESCRIPTION =
  "شرح استراتيجية الدعم والمقاومة Support and Resistance في التداول والفوركس خطوة بخطوة: كيفية تحديد ورسم المناطق، تداول الارتداد والاختراق وإعادة الاختبار، الاختراق الكاذب، وقف الخسارة والأهداف وإدارة المخاطر.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "الدعم والمقاومة",
    "استراتيجية الدعم والمقاومة",
    "الدعم والمقاومة في التداول",
    "الدعم والمقاومة في الفوركس",
    "تداول الدعم والمقاومة",
    "شرح الدعم والمقاومة",
    "مناطق الدعم والمقاومة",
    "مستويات الدعم والمقاومة",
    "كيفية رسم الدعم والمقاومة",
    "كيفية تحديد الدعم والمقاومة",
    "استراتيجية الدعم والمقاومة في الفوركس",
    "استراتيجية الدعم والمقاومة للمبتدئين",
    "Support and Resistance",
    "Support and Resistance Strategy",
    "Support and Resistance Trading",
    "Support and Resistance Forex",
    "Support Resistance Zones",
    "Support Resistance Levels",
    "Support Resistance Bounce",
    "Support Resistance Breakout",
    "Breakout and Retest",
    "False Breakout",
    "Role Reversal",
    "Resistance Becomes Support",
    "Support Becomes Resistance",
    "Range Trading",
    "Price Action",
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
    question: "ما هو الدعم والمقاومة في التداول؟",
    answer:
      "الدعم هو منطقة سعرية أسفل السعر ظهر عندها سابقًا تباطؤ أو توقف في الهبوط أو رد فعل صعودي، بينما المقاومة منطقة أعلى السعر ظهر عندها تباطؤ أو توقف في الصعود أو رد فعل هبوطي. يستخدم المتداول هذه المناطق كمرجع لتخطيط الارتداد أو الاختراق أو إعادة الاختبار.",
  },
  {
    question: "كيف أحدد مستويات الدعم والمقاومة؟",
    answer:
      "يمكن البدء بالقمم والقيعان الواضحة، حدود النطاقات السعرية، والمناطق التي أنتجت ردود فعل قوية سابقًا. الأفضل التركيز على عدد محدود من المناطق المهمة بدل ملء الشارت بخطوط كثيرة.",
  },
  {
    question: "هل الدعم والمقاومة خطوط أم مناطق؟",
    answer:
      "يمكن استخدام الخطوط كمرجع بصري، لكن التعامل مع الدعم والمقاومة كمناطق سعرية يكون أكثر مرونة لأن السعر لا يتفاعل دائمًا عند رقم واحد دقيق وقد تتجاوز ذيول الشموع المستوى قبل العودة.",
  },
  {
    question: "ما هو Break and Retest؟",
    answer:
      "هو نموذج يخترق فيه السعر منطقة دعم أو مقاومة ثم يعود لاختبارها من الجهة الأخرى. المقاومة المكسورة قد تتحول إلى دعم، والدعم المكسور قد يتحول إلى مقاومة.",
  },
  {
    question: "ما هو الاختراق الكاذب False Breakout؟",
    answer:
      "الاختراق الكاذب هو تجاوز السعر لمنطقة دعم أو مقاومة ثم فشله في الاستمرار خارجها وعودته إلى داخل النطاق السابق أو إلى الجهة الأخرى من المنطقة.",
  },
  {
    question: "هل كلما لمس السعر المستوى أكثر أصبح أقوى؟",
    answer:
      "لا توجد قاعدة ثابتة تجعل عدد اللمسات وحده دليلًا على قوة المستوى. يجب تقييم وضوح ردود الفعل، السياق، الإطار الزمني، اتجاه السوق وطريقة وصول السعر إلى المنطقة.",
  },
  {
    question: "أين يوضع وقف الخسارة في استراتيجية الدعم والمقاومة؟",
    answer:
      "يحدد وقف الخسارة بحسب النقطة التي تصبح عندها فكرة الصفقة غير صالحة. في الشراء من الدعم قد يكون أسفل المنطقة أو القاع المرتبط بالنموذج، وفي البيع من المقاومة قد يكون فوق المنطقة أو القمة.",
  },
  {
    question: "ما الفرق بين الدعم والمقاومة والعرض والطلب؟",
    answer:
      "الدعم والمقاومة يركزان غالبًا على مناطق أو مستويات تاريخية تفاعل معها السعر، بينما تركز منهجيات العرض والطلب عادة على مناطق انطلاق حركات قوية وقاعدة السعر التي سبقت الاندفاع. يوجد تداخل بين الإطارين لكنهما ليسا متطابقين.",
  },
  {
    question: "هل استراتيجية الدعم والمقاومة مربحة؟",
    answer:
      "لا توجد استراتيجية تضمن الربح. النتائج تعتمد على قواعد الدخول والخروج، ظروف السوق، إدارة المخاطر، تكاليف التداول والانضباط في التطبيق. لذلك يجب اختبار القواعد تاريخيًا قبل الاعتماد عليها.",
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
      aria-label="مثال على مناطق الدعم والمقاومة مع ارتدادات سعرية"
    >
      <defs>
        <pattern
          id="srHeroGridAr"
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
      <rect width="760" height="430" fill="url(#srHeroGridAr)" />

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

      {/* First rise */}
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

      {/* Rejection */}
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

      {/* Bounce */}
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

      {/* Resistance reaction again */}
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
      aria-label="مثال مختصر على الدعم والمقاومة"
    >
      <defs>
        <pattern
          id="srHeroMobileGridAr"
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
      <rect width="520" height="285" fill="url(#srHeroMobileGridAr)" />

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
      aria-label="مقارنة بين منطقة الدعم ومنطقة المقاومة باستخدام شموع تداول"
    >
      <defs>
        <pattern
          id={fullscreen ? "srTypesGridFullAr" : "srTypesGridAr"}
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
        fill={`url(#${fullscreen ? "srTypesGridFullAr" : "srTypesGridAr"})`}
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
        منطقة أسفل السعر يظهر عندها رد فعل شرائي
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
        منطقة أعلى السعر يظهر عندها رد فعل بيعي
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
        href="#sr-types-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير رسم الدعم والمقاومة"
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
      aria-label="مقارنة رسم الدعم والمقاومة كخط دقيق مقابل منطقة سعرية"
    >
      <defs>
        <pattern
          id={fullscreen ? "srZoneGridFullAr" : "srZoneGridAr"}
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
        fill={`url(#${fullscreen ? "srZoneGridFullAr" : "srZoneGridAr"})`}
      />

      <line
        x1="590"
        y1="30"
        x2="590"
        y2="545"
        stroke="#e2e8f0"
        strokeWidth="2"
      />

      {/* LEFT — LINE */}
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
        خط واحد قد لا يلتقط جميع ردود الفعل
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
        منطقة تستوعب اختلاف نقاط التفاعل والـWicks
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
        href="#sr-zones-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير مقارنة الخطوط والمناطق"
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
      aria-label="تحول المقاومة إلى دعم بعد الاختراق وإعادة الاختبار"
    >
      <defs>
        <pattern
          id={fullscreen ? "roleGridFullAr" : "roleGridAr"}
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
        fill={`url(#${fullscreen ? "roleGridFullAr" : "roleGridAr"})`}
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

      {/* First attempt */}
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

      {/* Breakout */}
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

      {/* Pullback */}
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

      {/* reaction */}
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
        href="#role-reversal-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير رسم انعكاس الأدوار"
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
      aria-label="استراتيجية الارتداد من منطقة الدعم مع الدخول ووقف الخسارة والهدف"
    >
      <defs>
        <pattern
          id={fullscreen ? "bounceGridFullAr" : "bounceGridAr"}
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
        fill={`url(#${fullscreen ? "bounceGridFullAr" : "bounceGridAr"})`}
      />

      {/* resistance target */}
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

      {/* support */}
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

      {/* approach */}
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

      {/* rejection */}
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

      {/* continuation */}
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

      {/* entry */}
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

      {/* stop */}
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

      {/* target path */}
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
        href="#bounce-setup-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير نموذج الارتداد"
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
      aria-label="اختراق المقاومة وإعادة اختبارها كدعم"
    >
      <defs>
        <pattern
          id={fullscreen ? "breakRetestGridFullAr" : "breakRetestGridAr"}
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
        fill={`url(#${fullscreen ? "breakRetestGridFullAr" : "breakRetestGridAr"})`}
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

      {/* approach */}
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

      {/* rejection before real break */}
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

      {/* second attempt */}
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

      {/* pullback */}
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

      {/* reaction */}
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
        href="#breakout-retest-fullscreen"
        className="block lg:hidden"
        aria-label="تكبير رسم الاختراق وإعادة الاختبار"
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

export default function SupportAndResistanceStrategyPage() {
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
        name: "استراتيجية الدعم والمقاومة",
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

          <span className="text-slate-800">الدعم والمقاومة</span>
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
                  Support &amp; Resistance Analysis
                </span>
              </div>

              <SupportResistanceHeroDesktopChart />
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
                  Price Action
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                  مبتدئ – متوسط
                </span>
              </div>

              <h1 className="max-w-[820px] text-[38px] font-black leading-[1.2] tracking-[-0.035em] text-slate-950 xl:text-[46px]">
                استراتيجية الدعم والمقاومة
                <span
                  dir="ltr"
                  className="mt-1 block text-[#1E5BB8]"
                >
                  Support and Resistance
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-[14px] font-medium leading-8 text-slate-600 xl:text-[15px]">
                شرح عملي لكيفية تحديد ورسم مناطق الدعم والمقاومة، قراءة
                الارتدادات، الاختراقات، Break &amp; Retest، الاختراق الكاذب
                وتحديد الدخول ووقف الخسارة والأهداف.
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
                Price Action
              </span>
            </div>

            <h1 className="mt-4 text-[27px] font-black leading-[1.2] tracking-[-0.03em] text-slate-950 sm:text-[32px]">
              استراتيجية الدعم والمقاومة
              <span
                dir="ltr"
                className="block text-[#1E5BB8]"
              >
                Support and Resistance
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              دليل عملي لتحديد مناطق الدعم والمقاومة وتداول الارتداد
              والاختراق وإعادة الاختبار وإدارة المخاطر.
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
                  dir="ltr"
                  className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[8px] font-black text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 text-[9px] font-bold leading-5 text-slate-500">
              محدث سبتمبر 2026 · مناسب للمبتدئين والمتوسطين
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
              <SectionLabel>مقدمة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما هو الدعم والمقاومة Support and Resistance في التداول؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>الدعم والمقاومة Support and Resistance</strong> من
                  أكثر مفاهيم التحليل الفني استخدامًا، ويعتمد على تحديد مناطق
                  سعرية أظهر السوق عندها سابقًا رد فعل واضح ثم مراقبة كيفية
                  تصرف السعر إذا عاد إليها مرة أخرى.
                </p>

                <p>
                  <strong>الدعم Support</strong> هو منطقة تقع عادة أسفل السعر
                  الحالي ظهر عندها تباطؤ في الهبوط أو توقف أو انعكاس صعودي.
                  أما <strong>المقاومة Resistance</strong> فهي منطقة تقع فوق
                  السعر الحالي ظهر عندها تباطؤ في الصعود أو توقف أو انعكاس
                  هبوطي.
                </p>

                <p>
                  الفكرة لا تعني أن هناك حاجزًا يمنع السعر من المرور. الدعم
                  والمقاومة قد يصمدان وقد ينكسران، ولهذا يستخدمهما المتداول
                  كـ<strong>مناطق لاتخاذ القرار</strong> وليس كضمان لانعكاس
                  السوق.
                </p>

                <p>
                  من خلال هذه المناطق يمكن بناء أكثر من نموذج تداول: الارتداد
                  من المستوى، الاختراق، إعادة الاختبار بعد الاختراق، التداول
                  داخل النطاق السعري، أو حتى مراقبة الاختراق الكاذب قبل الدخول.
                </p>
              </div>

              <ImportantBox title="الدعم والمقاومة مناطق احتمالية وليست حواجز مضمونة">
                وجود رد فعل سابق عند منطقة معينة لا يثبت أن السعر سيكرر السلوك
                نفسه في المستقبل. القيمة الحقيقية للمفهوم تأتي من استخدام
                قواعد واضحة للدخول والإلغاء والهدف وإدارة المخاطر.
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
              <SectionLabel>01 — الأساس</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                الفرق بين الدعم Support والمقاومة Resistance
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يمكن فهم الدعم والمقاومة باعتبارهما جهتين من الفكرة نفسها:
                مناطق ظهر عندها تغير في سلوك السعر، لكن موقع المنطقة بالنسبة
                للسعر والاتجاه المتوقع لرد الفعل هو ما يحدد إن كانت دعمًا أم
                مقاومة.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-[12px] font-black text-[#1E5BB8]">
                      S
                    </span>

                    <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                      الدعم Support
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    منطقة أسفل السعر ظهر عندها سابقًا اهتمام شرائي أو فشل في
                    استمرار الهبوط. عند العودة إليها يراقب المتداول ما إذا
                    كان السعر سيظهر رد فعل صعوديًا جديدًا أم سيكسر المنطقة.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200 text-[12px] font-black text-slate-700">
                      R
                    </span>

                    <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                      المقاومة Resistance
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    منطقة أعلى السعر ظهر عندها سابقًا ضغط بيع أو فشل في
                    استمرار الصعود. عند إعادة الاختبار يراقب المتداول ما إذا
                    كانت المنطقة ستنتج رد فعل هبوطيًا أم سيخترقها السعر.
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
              <SectionLabel>02 — مناطق أم خطوط؟</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                هل الدعم والمقاومة خطوط دقيقة أم مناطق سعرية؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  أحد أكثر الأخطاء شيوعًا هو رسم خط رفيع عند رقم واحد ثم
                  اعتبار أي تجاوز بسيط له اختراقًا. حركة السعر في الواقع لا
                  تكون دائمًا بهذه الدقة، وقد تتفاعل عدة شموع داخل نطاق صغير
                  بدل نقطة واحدة.
                </p>

                <p>
                  كما يمكن لذيل شمعة أن يتجاوز السعر الذي رسمته ثم يغلق السعر
                  مرة أخرى داخل المنطقة. لهذا يتعامل كثير من المتداولين مع
                  الدعم والمقاومة على أنها <strong>Price Zones</strong> بدل
                  الاعتماد على Exact Level فقط.
                </p>

                <p>
                  هذا لا يعني رسم منطقة واسعة جدًا. يجب أن تبقى المنطقة
                  محددة بما يكفي لتساعدك في اتخاذ قرار حقيقي بشأن الدخول
                  والإلغاء والهدف.
                </p>
              </div>

              <div className="mt-7">
                <LinesVsZonesChart />
              </div>

              <ImportantBox title="لا تحاول إجبار جميع اللمسات على خط واحد">
                إذا كانت عدة ردود فعل قريبة من بعضها لكن ليست عند السعر نفسه
                تمامًا، قد يكون التعامل معها كمنطقة أكثر منطقية من تحريك خط
                باستمرار حتى يلامس كل شمعة.
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
              <SectionLabel>03 — أين تتكون المستويات؟</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أين نجد مناطق الدعم والمقاومة على الشارت؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا توجد طريقة واحدة فقط لرسم الدعم والمقاومة. لكن بعض البنى
                السعرية تكون أوضح وأسهل في التعريف والاختبار من غيرها.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "القمم السابقة",
                    text: "Swing High واضح توقف عنده الصعود أو بدأ منه هبوط قد يتحول إلى منطقة مقاومة عند عودة السعر إليه.",
                  },
                  {
                    n: "02",
                    title: "القيعان السابقة",
                    text: "Swing Low واضح انطلق منه ارتداد صعودي قد يتحول إلى منطقة دعم إذا عاد السعر إليه لاحقًا.",
                  },
                  {
                    n: "03",
                    title: "حدود النطاق",
                    text: "في السوق الجانبي يكون الحد السفلي للنطاق دعمًا محتملًا والحد العلوي مقاومة محتملة.",
                  },
                  {
                    n: "04",
                    title: "المستويات المكسورة",
                    text: "المقاومة المكسورة قد يعاد اختبارها كدعم، والدعم المكسور قد يعاد اختباره كمقاومة.",
                  },
                  {
                    n: "05",
                    title: "الأرقام النفسية",
                    text: "الأرقام المستديرة قد تجذب الانتباه، لكنها لا ينبغي أن تستخدم كإشارة دخول مستقلة دون سياق.",
                  },
                  {
                    n: "06",
                    title: "التقاء أكثر من عامل",
                    text: "قد تصبح المنطقة أكثر أهمية ضمن الخطة عندما تتوافق مع اتجاه أو هيكل سعري أو عامل فني آخر.",
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
              <SectionLabel>04 — رسم المستويات</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيفية رسم الدعم والمقاومة بطريقة صحيحة
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  الهدف من رسم الدعم والمقاومة ليس العثور على أكبر عدد ممكن
                  من المستويات، بل الوصول إلى عدد محدود من المناطق التي يمكن
                  أن تؤثر فعليًا في القرار الحالي.
                </p>

                <p>
                  إذا كان الشارت يحتوي على عشرات الخطوط، فسيبدو تقريبًا كل
                  انعكاس وكأنه حدث عند مستوى مهم. وهذا يجعل التحليل ممتازًا
                  بعد معرفة النتيجة لكنه ضعيفًا كاستراتيجية قابلة للاختبار.
                </p>
              </div>

              <div className="mt-7 space-y-3">
                {[
                  {
                    n: "01",
                    title: "ابدأ من إطار زمني أعلى",
                    text: "حدد أولًا القمم والقيعان والمناطق الرئيسية قبل النزول إلى إطار تنفيذ الصفقة.",
                  },
                  {
                    n: "02",
                    title: "ابحث عن رد فعل واضح",
                    text: "ركز على منطقة أنتجت انعكاسًا أو حركة ملحوظة بدل تعليم كل توقف صغير في السعر.",
                  },
                  {
                    n: "03",
                    title: "استخدم منطقة منطقية",
                    text: "غط الجزء الذي حدثت داخله التفاعلات المهمة دون توسيع المنطقة لدرجة تصبح معها غير مفيدة.",
                  },
                  {
                    n: "04",
                    title: "أعط الأولوية للمستويات الواضحة",
                    text: "المستوى الذي يحتاج تفسيرًا معقدًا لإثبات وجوده قد لا يكون مناسبًا لاستراتيجية بسيطة وقابلة للتكرار.",
                  },
                  {
                    n: "05",
                    title: "احذف المستويات غير المهمة",
                    text: "احتفظ بالمناطق التي ما زالت مرتبطة بالسياق الحالي وتجنب ازدحام الشارت بمستويات قديمة.",
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

              <ImportantBox title="ارسم المستوى قبل وصول السعر إليه">
                إذا كنت تختبر الاستراتيجية، حاول تحديد المنطقة قبل أن ترى
                الانعكاس القادم. هذه الخطوة تقلل تأثير Hindsight Bias وتجعل
                نتائج الاختبار أكثر واقعية.
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
              <SectionLabel>05 — جودة المستوى</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما الذي يجعل منطقة الدعم أو المقاومة مهمة؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا توجد معادلة واحدة تحدد قوة المستوى. الأفضل تقييم مجموعة من
                العوامل بدل الاعتماد على عدد اللمسات أو عمر المستوى وحدهما.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.8fr_1.2fr_1.7fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>العامل</div>
                  <div>ما الذي نراقبه؟</div>
                  <div>لماذا يهم؟</div>
                </div>

                {[
                  [
                    "وضوح الحركة",
                    "رد فعل أو انعكاس واضح",
                    "المنطقة الناتجة عن حركة واضحة أسهل في التعريف والاختبار مقارنة بتذبذب عشوائي.",
                  ],
                  [
                    "الإطار الزمني",
                    "ظهور المنطقة على إطار أعلى",
                    "المستوى الأعلى قد يكون أكثر وضوحًا على الشارت العام لكنه لا يضمن الصمود.",
                  ],
                  [
                    "السياق",
                    "Trend أو Range",
                    "المقاومة داخل اتجاه صاعد قوي تختلف عن مقاومة عند الحد العلوي لنطاق جانبي.",
                  ],
                  [
                    "حداثة المنطقة",
                    "مستوى حديث أو قديم",
                    "المنطقة الحديثة قد تكون أقرب إلى السياق الحالي لكن الحداثة وحدها ليست دليلًا على القوة.",
                  ],
                  [
                    "المساحة للهدف",
                    "موقع المنطقة التالية",
                    "صفقة صحيحة فنيًا قد تكون ضعيفة إذا كان العائق التالي قريبًا جدًا من نقطة الدخول.",
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

              <ImportantBox title="عدد اللمسات وحده لا يحدد قوة المستوى">
                وجود أكثر من رد فعل قد يجعل المنطقة واضحة بصريًا، لكن لا توجد
                قاعدة عامة تقول إن ثلاث أو أربع لمسات تجعل المنطقة مضمونة.
                إذا أردت استخدام عدد اللمسات كفلتر، عرّفه واختبره كقاعدة ضمن
                استراتيجيتك.
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

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                متى تتحول المقاومة إلى دعم والدعم إلى مقاومة؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  من أهم مبادئ الدعم والمقاومة ما يعرف باسم{" "}
                  <strong>Role Reversal</strong> أو انعكاس الأدوار. بعد كسر
                  المقاومة قد يعيد السعر اختبار المنطقة من الأعلى وتبدأ
                  بالعمل كدعم.
                </p>

                <p>
                  وبالعكس، إذا كسر السعر دعمًا مهمًا ثم عاد إليه من الأسفل،
                  فقد تتحول المنطقة إلى مقاومة.
                </p>

                <p>
                  لكن الكسر وحده لا يضمن انعكاس الدور. يجب أن تراقب ما إذا
                  كان السعر يستطيع البقاء في الجهة الجديدة وكيف يتصرف عند
                  إعادة الاختبار.
                </p>
              </div>

              <div className="mt-7">
                <RoleReversalChart />
              </div>

              <ImportantBox title="المستوى المكسور لا يغير دوره تلقائيًا">
                قد يعود السعر عبر المنطقة مرة أخرى بدل احترامها من الجهة
                الجديدة. لهذا تكون إعادة الاختبار وسلوك السعر خلالها جزءًا
                مهمًا من العديد من خطط التداول.
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
              <SectionLabel>07 — استراتيجية الارتداد</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                استراتيجية الارتداد من الدعم والمقاومة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                في نموذج الارتداد Bounce Strategy ينتظر المتداول وصول السعر
                إلى منطقة حددها مسبقًا، ثم يبحث عن دليل على أن المنطقة بدأت
                بالفعل بإنتاج رد فعل بدل الدخول لمجرد اللمس.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    BULLISH BOUNCE
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    الشراء من الدعم
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يصل السعر إلى دعم واضح، يفشل في الاستمرار هبوطًا ثم يظهر
                    رد فعل أو تأكيد صعودي وفق قواعد الاستراتيجية.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    BEARISH BOUNCE
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    البيع من المقاومة
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يصل السعر إلى مقاومة واضحة، يفشل في مواصلة الصعود ثم يظهر
                    رد فعل هبوطي يسمح بتحديد نقطة دخول وإلغاء وهدف.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <BounceSetupChart />
              </div>

              <ImportantBox title="الوصول إلى المنطقة ليس إشارة دخول بحد ذاته">
                الدعم والمقاومة يمكن أن ينكسرا في أي لحظة. انتظار شرط تأكيد
                محدد لا يمنع الخسائر، لكنه يحول الفكرة من &quot;أعتقد أن
                المستوى سيصمد&quot; إلى قاعدة يمكن اختبارها.
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
              <SectionLabel>08 — تأكيد الدخول</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف نؤكد الارتداد من الدعم أو المقاومة؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  لا يوجد نموذج تأكيد واحد يجب على جميع المتداولين استخدامه.
                  بعض الاستراتيجيات تدخل مباشرة من المنطقة، بينما تنتظر أخرى
                  دليلًا إضافيًا على الشارت.
                </p>

                <p>
                  المهم هو أن تحدد مسبقًا ما الذي تعتبره Confirmation وأن
                  تطبق التعريف نفسه أثناء الاختبار والتداول الحقيقي.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "شمعة رفض",
                    text: "ذيل واضح في المنطقة مع إغلاق بعيد نسبيًا عن الطرف الذي تم اختباره.",
                  },
                  {
                    n: "02",
                    title: "Reclaim",
                    text: "يتجاوز السعر طرف المنطقة مؤقتًا ثم يعود ويغلق مرة أخرى في الجهة المتوقعة.",
                  },
                  {
                    n: "03",
                    title: "كسر هيكل صغير",
                    text: "بعد التفاعل يكسر السعر قمة أو قاعًا محليًا في اتجاه الصفقة.",
                  },
                  {
                    n: "04",
                    title: "حركة بعيدة عن المنطقة",
                    text: "يبدأ السعر بالابتعاد بوضوح بدل الاستمرار في التذبذب داخل المستوى.",
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

              <ImportantBox title="ثبّت تعريف التأكيد قبل الاختبار">
                لا تستخدم شمعة رفض في صفقة، وكسر هيكل في أخرى، ثم تختار
                التعريف الذي يجعل كل صفقة تاريخية ناجحة. هذا يزيد من Hindsight
                Bias ويجعل النتائج أقل قيمة.
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

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                استراتيجية اختراق الدعم والمقاومة وإعادة الاختبار
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  لا تعتمد جميع استراتيجيات الدعم والمقاومة على الارتداد.
                  نموذج <strong>Breakout &amp; Retest</strong> ينتظر كسر
                  المنطقة ثم يبحث عن فرصة استمرار بعد إعادة اختبار المستوى
                  المكسور.
                </p>

                <p>
                  في السيناريو الصعودي، يكسر السعر مقاومة واضحة ويتداول
                  أعلاها، ثم يعود إلى المنطقة. إذا تحولت المقاومة السابقة إلى
                  دعم وظهر تأكيد صعودي، يمكن دراسة صفقة استمرار.
                </p>

                <p>
                  في السيناريو الهبوطي يحدث العكس: يتم كسر الدعم ثم يعاد
                  اختباره من الأسفل كمقاومة.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "حدد المنطقة",
                    text: "يجب أن تكون المقاومة أو الدعم معروفين قبل حدوث الاختراق.",
                  },
                  {
                    n: "02",
                    title: "انتظر الكسر",
                    text: "ابحث عن حركة ذات معنى خارج المنطقة وفق تعريف الاستراتيجية.",
                  },
                  {
                    n: "03",
                    title: "انتظر Retest",
                    text: "يعود السعر إلى المستوى المكسور من الجهة الجديدة.",
                  },
                  {
                    n: "04",
                    title: "اطلب التأكيد",
                    text: "لا تدخل إلا إذا تحقق نموذج التأكيد الذي اختبرته مسبقًا.",
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

              <ImportantBox title="ليس كل اختراق يعطي Retest">
                أحيانًا يكسر السعر المستوى ويستمر مباشرة دون العودة إليه.
                انتظار إعادة الاختبار قد يعطي دخولًا أكثر تنظيمًا لكنه يعني
                أيضًا تفويت بعض الحركات. لا تطارد السعر إذا لم تتحقق شروط
                خطتك.
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
              <SectionLabel>10 — تعريف الاختراق</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                متى نعتبر الدعم أو المقاومة قد تم اختراقهما؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  لا توجد قاعدة عالمية واحدة تحدد متى يصبح تجاوز المستوى
                  Breakout حقيقيًا. بعض المتداولين يعتمدون على إغلاق الشمعة،
                  وبعضهم يطلب متابعة خارج المنطقة، وآخرون لا يدخلون حتى تحدث
                  إعادة اختبار.
                </p>

                <p>
                  لهذا يجب أن تكون قاعدة الاختراق جزءًا من الاستراتيجية نفسها
                  وليس قرارًا يتم اتخاذه بعد رؤية النتيجة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "إغلاق خارج المنطقة",
                    text: "يمكن اشتراط إغلاق شمعة كاملة خارج حدود المنطقة بدل اعتبار مجرد Wick كافيًا.",
                  },
                  {
                    n: "02",
                    title: "Follow-Through",
                    text: "يراقب المتداول هل يستطيع السعر الاستمرار والقبول خارج المنطقة أم يعود مباشرة إلى النطاق القديم.",
                  },
                  {
                    n: "03",
                    title: "Break & Retest",
                    text: "النموذج الأكثر تحفظًا ينتظر العودة إلى المستوى المكسور ثم ظهور رد فعل من الجهة الجديدة.",
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

              <ImportantBox title="الـWick وحده ليس تعريفًا ثابتًا للاختراق">
                قد يخترق الذيل المنطقة ثم يعود السعر، وقد يغلق خارجها ثم يفشل
                لاحقًا. لا تحاول توقع النتيجة؛ ضع تعريفًا للاختراق وحدد ما
                الذي سيجعلك تقبل أو ترفض الصفقة.
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
              <SectionLabel>11 — False Breakout</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                ما هو الاختراق الكاذب False Breakout؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يحدث <strong>False Breakout</strong> عندما يتجاوز السعر منطقة
                  دعم أو مقاومة لكنه لا يستطيع الاستمرار خارجها، ثم يعود إلى
                  داخل النطاق السابق أو إلى الجهة المقابلة من المنطقة.
                </p>

                <p>
                  قد يظهر الاختراق الكاذب على شكل Wick يتجاوز المستوى ثم يغلق
                  السعر داخله، أو شمعة تغلق خارج المنطقة ثم تفشل الحركة التالية
                  في تأكيد الكسر.
                </p>

                <p>
                  المهم هو عدم تسمية أي اختراق فشل لاحقًا بأنه False Breakout
                  بعد رؤية النتيجة. يجب أن تحدد مسبقًا ما الذي تعتبره فشلًا:
                  Reclaim؟ إغلاق داخل المنطقة؟ كسر هيكل معاكس؟ أو قاعدة أخرى.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    FALSE BREAKOUT
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    خروج ثم عودة داخل المنطقة
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    السعر يتجاوز المستوى لكنه يفشل في الحفاظ على الحركة ويعود
                    داخل النطاق السابق أو يغلق مجددًا في الجهة الأخرى.
                  </p>
                </div>

                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    CONFIRMED BREAKOUT
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950">
                    كسر ثم قبول خارج المنطقة
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    السعر يخترق المنطقة ثم يحافظ على التداول خارجها أو يعيد
                    اختبار المستوى من الجهة الجديدة قبل استمرار محتمل.
                  </p>
                </div>
              </div>

              <ImportantBox title="لا تحاول إثبات نية السوق من الشارت">
                الاختراق الكاذب يصف سلوك السعر، وليس دليلًا على أن جهة معينة
                تعمدت خداع المتداولين أو اصطياد وقف الخسارة. ركز على القواعد
                التي تستطيع رؤيتها واختبارها.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — RANGE TRADING
          ================================================= */}

          <section
            id="range-trading"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — Range Trading</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                تداول الدعم والمقاومة داخل النطاق السعري
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  عندما يتحرك السوق أفقيًا بين حد علوي وحد سفلي واضحين، يمكن
                  استخدام الدعم والمقاومة لبناء استراتيجية{" "}
                  <strong>Range Trading</strong>.
                </p>

                <p>
                  في هذا النموذج يراقب المتداول فرص الشراء بالقرب من الحد
                  السفلي للنطاق وفرص البيع بالقرب من الحد العلوي، بشرط بقاء
                  النطاق قائمًا وعدم ظهور كسر يؤكد تغير الحالة.
                </p>

                <p>
                  كل Range ينتهي في مرحلة ما، لذلك يجب تحديد نقطة يصبح عندها
                  سيناريو الارتداد غير صالح بدل افتراض أن السعر سيستمر بالتذبذب
                  داخل الحدود إلى الأبد.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                    شراء بالقرب من دعم النطاق
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يبحث المتداول عن رد فعل صعودي قرب الحد السفلي مع تحديد
                    الإلغاء أسفل المنطقة وفق قواعد الاستراتيجية.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <h3 className="text-[14px] font-black text-slate-950 sm:text-[15px]">
                    بيع بالقرب من مقاومة النطاق
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يراقب المتداول رد فعل هبوطيًا قرب الحد العلوي ويحدد الإلغاء
                    فوق المنطقة أو فوق القمة المرتبطة بالنموذج.
                  </p>
                </div>
              </div>

              <ImportantBox title="النطاق لا يبقى قائمًا دائمًا">
                بمجرد أن يتغير سلوك السعر ويبدأ القبول خارج الحدود، يجب إعادة
                تقييم فكرة Range Trading بدل الاستمرار في البيع والشراء من
                الأطراف بنفس الطريقة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              13 — TREND CONTEXT
          ================================================= */}

          <section
            id="support-resistance-trend"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — Trend Context</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                استخدام الدعم والمقاومة مع الاتجاه
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                الدعم والمقاومة لا يستخدمان فقط داخل الأسواق الجانبية. يمكن
                دمجهما مع الاتجاه للبحث عن مناطق Pullback أو إعادة اختبار بدل
                محاولة الدخول بعد امتداد الحركة بعيدًا عن البنية.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-[#1E5BB8]">
                    UPTREND
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    الدعم داخل اتجاه صاعد
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يمكن مراقبة مناطق الدعم أو المقاومات المكسورة أثناء
                    التصحيح والبحث عن استمرار صعودي إذا بقي الهيكل العام
                    داعمًا للسيناريو.
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    DOWNTREND
                  </div>

                  <h3 className="mt-2 text-[14px] font-black text-slate-950 sm:text-[15px]">
                    المقاومة داخل اتجاه هابط
                  </h3>

                  <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                    يمكن مراقبة المقاومات أو الدعوم المكسورة أثناء الارتداد
                    والبحث عن استمرار هبوطي بدل الشراء تلقائيًا من كل دعم.
                  </p>
                </div>
              </div>

              <ImportantBox title="السياق يسبق المستوى">
                مقاومة داخل اتجاه صاعد قوي ليست إشارة بيع تلقائية، كما أن دعمًا
                داخل اتجاه هابط ليس إشارة شراء تلقائية. حدد أولًا هل السوق
                Trending أم Ranging أم في مرحلة انتقال.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              14 — MULTI TIMEFRAME
          ================================================= */}

          <section
            id="multi-timeframe-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — Multi-Timeframe</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                تحليل الدعم والمقاومة على أكثر من إطار زمني
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يمكن فصل إطار تحديد المناطق عن إطار الدخول. الهدف هو
                  الاحتفاظ بالسياق العام مع استخدام إطار أصغر لتعريف نقطة
                  التنفيذ بصورة أدق.
                </p>

                <p>
                  لا توجد تركيبة Timeframes واحدة مناسبة للجميع. الأهم أن
                  يكون لكل إطار وظيفة واضحة بدل التنقل بين الأطر بحثًا عن
                  تأكيد يناسب الصفقة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Higher Timeframe",
                    text: "حدد الاتجاه العام وأهم مناطق الدعم والمقاومة التي قد تؤثر على الحركة.",
                  },
                  {
                    n: "02",
                    title: "Setup Timeframe",
                    text: "راقب طريقة وصول السعر إلى المنطقة وما إذا كان السياق ما زال يدعم الفكرة.",
                  },
                  {
                    n: "03",
                    title: "Entry Timeframe",
                    text: "طبق قاعدة التأكيد وحدد الدخول والإلغاء والهدف وفق خطة التنفيذ.",
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
            </div>
          </section>

          {/* =================================================
              15 — ENTRY MODELS
          ================================================= */}

          <section
            id="support-resistance-entry"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>15 — نماذج الدخول</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                طرق الدخول في صفقات الدعم والمقاومة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                لا توجد نقطة دخول واحدة صحيحة لجميع الاستراتيجيات. الاختلاف
                الأساسي هو مقدار التأكيد الذي يريد المتداول انتظاره قبل
                التنفيذ.
              </p>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.8fr_1.3fr_1.5fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>النموذج</div>
                  <div>طريقة الدخول</div>
                  <div>المقابل</div>
                </div>

                {[
                  [
                    "Direct Entry",
                    "الدخول مباشرة قرب المنطقة المحددة دون انتظار تأكيد إضافي.",
                    "دخول مبكر وسعر أفضل أحيانًا، لكنه يعتمد أكثر على افتراض أن المنطقة ستصمد.",
                  ],
                  [
                    "Confirmation Entry",
                    "انتظار شمعة رفض أو Reclaim أو تغير قصير في الهيكل قبل التنفيذ.",
                    "تأكيد أكبر قبل الدخول، لكن السعر قد يتحرك بعيدًا ويقلل جودة نقطة الدخول.",
                  ],
                  [
                    "Break & Retest",
                    "انتظار كسر المستوى ثم إعادة اختباره من الجهة الجديدة.",
                    "يوفر نموذج استمرار واضحًا، لكن بعض الاختراقات لا تعود لإعادة الاختبار.",
                  ],
                ].map(([model, method, tradeoff]) => (
                  <div
                    key={model}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.8fr_1.3fr_1.5fr]"
                  >
                    <div
                      dir="ltr"
                      className="text-right text-[12px] font-black text-slate-950 sm:text-[13px]"
                    >
                      {model}
                    </div>

                    <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {method}
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
              16 — STOP LOSS
          ================================================= */}

          <section
            id="support-resistance-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — Stop Loss</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أين يوضع وقف الخسارة في استراتيجية الدعم والمقاومة؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  وقف الخسارة يجب أن يرتبط بنقطة{" "}
                  <strong>Invalidation</strong> وليس بعدد عشوائي من النقاط.
                </p>

                <p>
                  في صفقة شراء من الدعم، يمكن أن تكون نقطة الإلغاء أسفل
                  المنطقة أو أسفل القاع البنيوي المرتبط بالنموذج. وفي البيع
                  من المقاومة يكون الإلغاء عادة فوق المنطقة أو فوق القمة
                  المرتبطة بالصفقة.
                </p>

                <p>
                  الهدف هو أن يصبح خروجك من الصفقة مرتبطًا بفشل الفكرة التي
                  بنيت عليها الدخول، لا بمجرد تذبذب طبيعي داخل المنطقة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "خلف المنطقة",
                    text: "وضع الوقف خلف الدعم أو المقاومة إذا كانت المنطقة نفسها هي أساس السيناريو.",
                  },
                  {
                    n: "02",
                    title: "خلف Swing",
                    text: "يمكن أن يعتمد الإلغاء على قاع أو قمة بنيوية مرتبطة بنموذج الدخول.",
                  },
                  {
                    n: "03",
                    title: "حسب المخاطرة",
                    text: "إذا اتسعت المسافة إلى الوقف، يجب خفض حجم المركز للمحافظة على نفس المخاطرة النقدية.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-white p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
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

              <ImportantBox title="المسافة إلى الوقف لا تحدد مقدار المخاطرة وحدها">
                يمكنك تقليل Position Size إذا كان وقف الخسارة أوسع. المهم هو
                أن يبقى مقدار الخسارة المحتملة ضمن الحد الذي تسمح به خطة إدارة
                المخاطر.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              17 — TAKE PROFIT
          ================================================= */}

          <section
            id="support-resistance-take-profit"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — Take Profit</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيفية تحديد هدف الربح باستخدام الدعم والمقاومة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يمكن استخدام المستوى التالي على الشارت كمرجع لتحديد الهدف،
                لكن يجب تقييم المسافة المتاحة قبل الدخول حتى لا تكون الصفقة
                محاصرة بين منطقتين متقاربتين.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "المستوى المقابل",
                    text: "في الشراء يمكن مراقبة المقاومة التالية، وفي البيع يمكن مراقبة الدعم التالي.",
                  },
                  {
                    title: "Swing سابق",
                    text: "قمة أو قاع سابق قد يوفر منطقة منطقية لجني الربح.",
                  },
                  {
                    title: "Risk / Reward",
                    text: "قارن المسافة المتوقعة للهدف بالمسافة إلى نقطة الإلغاء قبل فتح الصفقة.",
                  },
                  {
                    title: "Partial Exit",
                    text: "يمكن تقسيم الخروج على أكثر من هدف إذا كان ذلك جزءًا من خطة تم اختبارها مسبقًا.",
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
              18 — CONFLUENCE
          ================================================= */}

          <section
            id="support-resistance-confluence"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — Confluence</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                دمج الدعم والمقاومة مع أدوات التحليل الأخرى
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يمكن استخدام الدعم والمقاومة كإطار أساسي ثم إضافة عامل أو
                أكثر للتصفية. لكن إضافة عدة مؤشرات لا تجعل الصفقة أفضل
                تلقائيًا؛ يجب أن يكون لكل عامل وظيفة محددة ضمن الخطة.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Price Action",
                    text: "قراءة الشموع والقمم والقيعان وسلوك السعر حول المنطقة.",
                  },
                  {
                    title: "Trend",
                    text: "استخدام المستوى داخل اتجاه واضح بدل التعامل معه بصورة منفصلة.",
                  },
                  {
                    title: "RSI",
                    text: "استخدام الزخم كفلتر إضافي وليس كبديل عن المنطقة وإدارة المخاطر.",
                  },
                  {
                    title: "Supply & Demand",
                    text: "مقارنة مناطق العرض والطلب بالمستويات الأفقية التقليدية.",
                  },
                  {
                    title: "Liquidity Sweep",
                    text: "مراقبة تجاوز قمة أو قاع قريب من المنطقة ثم عودة السعر.",
                  },
                  {
                    title: "Market Structure",
                    text: "تحديد ما إذا كان المستوى يتوافق مع اتجاه أو Range أو نقطة تحول.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <h3
                      dir="ltr"
                      className="text-right text-[13px] font-black text-slate-950 sm:text-[14px]"
                    >
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
              19 — WHEN NOT TO TRADE
          ================================================= */}

          <section
            id="when-not-to-trade-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — متى نتجنب الصفقة؟</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                متى تكون صفقة الدعم والمقاومة ضعيفة؟
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "المنطقة غير واضحة وتحتاج إلى تعديل مستمر حتى تتناسب مع الحركة الماضية.",
                  "السعر يدخل إلى المنطقة بزخم قوي ولا يظهر نموذج التأكيد المطلوب.",
                  "المستوى المقابل قريب جدًا ولا يوفر مساحة معقولة للهدف.",
                  "وقف الخسارة المطلوب يجعل الصفقة غير مناسبة لقواعد إدارة المخاطر.",
                  "تتداول عكس اتجاه واضح فقط لأن السعر وصل إلى مستوى أفقي.",
                  "لا توجد لديك قاعدة محددة للدخول والإلغاء والهدف قبل فتح الصفقة.",
                ].map((text, index) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              20 — COMMON MISTAKES
          ================================================= */}

          <section
            id="support-resistance-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>20 — أخطاء شائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أخطاء شائعة عند تداول الدعم والمقاومة
              </h2>

              <div className="mt-7 space-y-3">
                {[
                  {
                    n: "01",
                    title: "رسم عدد كبير من الخطوط",
                    text: "ازدحام الشارت يجعل تقريبًا كل حركة تبدو وكأنها تفاعلت مع مستوى مهم.",
                  },
                  {
                    n: "02",
                    title: "اعتبار المستوى سعرًا دقيقًا",
                    text: "التفاعل قد يحدث ضمن نطاق صغير، لذلك لا تعتبر كل تجاوز بسيط كسرًا مؤكدًا.",
                  },
                  {
                    n: "03",
                    title: "الدخول عند كل لمسة",
                    text: "الوصول إلى المنطقة لا يعني أن شرط الدخول في الاستراتيجية قد تحقق.",
                  },
                  {
                    n: "04",
                    title: "تجاهل الاتجاه",
                    text: "نفس المقاومة قد تتصرف بشكل مختلف داخل Uptrend قوي مقارنة بـRange.",
                  },
                  {
                    n: "05",
                    title: "تعديل المستوى بعد النتيجة",
                    text: "تحريك المنطقة بعد رؤية الانعكاس يزيد من Hindsight Bias ويضعف قيمة الاختبار.",
                  },
                  {
                    n: "06",
                    title: "تغيير تعريف الاختراق",
                    text: "استخدام Wick في صفقة وإغلاق في أخرى وRetest في ثالثة حسب ما يناسب النتيجة يجعل القواعد غير قابلة للاختبار.",
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
            </div>
          </section>

          {/* =================================================
              21 — RISK MANAGEMENT
          ================================================= */}

          <section
            id="support-resistance-risk-management"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>21 — إدارة المخاطر</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                إدارة المخاطر في استراتيجية الدعم والمقاومة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                أي مستوى يمكن أن يفشل، لذلك جودة إدارة المخاطر أهم من محاولة
                العثور على منطقة تبدو مثالية بصريًا.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "حدد المخاطرة أولًا",
                    text: "حدد أقصى خسارة مسموحة على الحساب قبل حساب حجم المركز.",
                  },
                  {
                    n: "02",
                    title: "حدد الإلغاء",
                    text: "اختر النقطة التي تصبح عندها فكرة الصفقة غير صالحة فنيًا.",
                  },
                  {
                    n: "03",
                    title: "احسب Position Size",
                    text: "اضبط حجم الصفقة حسب المسافة بين الدخول ووقف الخسارة.",
                  },
                  {
                    n: "04",
                    title: "قيّم العائد",
                    text: "افحص المسافة إلى الهدف الواقعي قبل قبول المخاطرة.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[20px] border border-blue-100 bg-white p-5"
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

              <ImportantBox title="قوة المستوى لا تبرر زيادة المخاطرة">
                حتى إذا بدت المنطقة ممتازة، لا يوجد ما يضمن أنها ستصمد. حافظ
                على قواعد المخاطرة نفسها بدل زيادة حجم الصفقة بسبب الثقة
                البصرية في المستوى.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              22 — CHECKLIST
          ================================================= */}

          <section
            id="support-resistance-checklist"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>22 — Checklist</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                قائمة التحقق قبل صفقة دعم أو مقاومة
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "هل المنطقة محددة قبل وصول السعر إليها؟",
                  "هل المستوى واضح دون الحاجة إلى تعديل مستمر؟",
                  "هل السوق في Trend أم Range أم مرحلة انتقال؟",
                  "هل الصفقة Bounce أم Breakout & Retest؟",
                  "هل تحقق شرط التأكيد المحدد مسبقًا؟",
                  "هل نقطة Invalidation واضحة؟",
                  "هل يوجد مستوى قريب يمنع الوصول إلى الهدف؟",
                  "هل العائد المحتمل مقبول مقارنة بالمخاطرة؟",
                  "هل Position Size متوافق مع وقف الخسارة؟",
                  "هل سأقبل الصفقة نفسها لو لم أرَ الشموع المستقبلية؟",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-[10px] font-black text-[#1E5BB8] shadow-sm">
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
              23 — BACKTESTING
          ================================================= */}

          <section
            id="support-resistance-backtesting"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>23 — Backtesting</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيفية اختبار استراتيجية الدعم والمقاومة تاريخيًا
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  الدعم والمقاومة من أكثر المفاهيم التي يمكن أن تبدو ممتازة
                  بعد اكتمال الشارت. لذلك يجب تحويلها إلى قواعد محددة يمكن
                  تطبيقها دون معرفة الحركة المستقبلية.
                </p>

                <p>
                  لا تختبر عبارة عامة مثل &quot;اشتري من الدعم وبع من
                  المقاومة&quot;. اختبر تعريفًا واضحًا للمنطقة، شرط الدخول،
                  نقطة الإلغاء، طريقة تحديد الهدف، والإطار الزمني.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "تعريف المنطقة",
                    text: "ما الشروط التي تجعل المستوى Support أو Resistance وفق خطتك؟",
                  },
                  {
                    title: "حالة السوق",
                    text: "هل ستختبر Trend وRange بشكل منفصل أم بنفس القواعد؟",
                  },
                  {
                    title: "شرط الدخول",
                    text: "Direct Touch أم Rejection أم Reclaim أم Break & Retest؟",
                  },
                  {
                    title: "الإلغاء",
                    text: "ما السلوك الذي يثبت أن سيناريو الصفقة أصبح غير صالح؟",
                  },
                  {
                    title: "الهدف",
                    text: "المستوى التالي أم Swing سابق أم قاعدة Risk / Reward ثابتة؟",
                  },
                  {
                    title: "تكاليف التداول",
                    text: "أدخل Spread والعمولات والانزلاق المحتمل عند الحاجة.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
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

              <ImportantBox title="استخدم Bar Replay لتقليل Hindsight Bias">
                تقدم على الشارت شمعة بعد شمعة وحدد المنطقة قبل رؤية النتيجة.
                بهذه الطريقة يصبح الاختبار أقرب إلى القرار الذي كان متاحًا في
                الوقت الحقيقي.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              24 — TRADING PLAN
          ================================================= */}

          <section
            id="support-resistance-trading-plan"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-sm"
          >
            <div className="p-5 text-white sm:p-7 lg:p-9">
              <SectionLabel>24 — Trading Plan</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-white sm:text-[29px]">
                نموذج خطة كاملة لتداول الدعم والمقاومة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-300 sm:text-[15px] sm:leading-9">
                المثال التالي تعليمي ويبين كيف تتحول الفكرة العامة إلى
                خطوات قابلة للاختبار والتكرار.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "السياق",
                    text: "حدد Trend أو Range",
                  },
                  {
                    n: "02",
                    title: "المنطقة",
                    text: "حدد Support أو Resistance",
                  },
                  {
                    n: "03",
                    title: "الانتظار",
                    text: "دع السعر يصل إلى المنطقة",
                  },
                  {
                    n: "04",
                    title: "التأكيد",
                    text: "طبق شرط الدخول",
                  },
                  {
                    n: "05",
                    title: "الإلغاء",
                    text: "حدد Stop خلف البنية",
                  },
                  {
                    n: "06",
                    title: "الهدف",
                    text: "حدد المستوى التالي",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[18px] border border-white/10 bg-white/[0.05] p-4"
                  >
                    <span className="text-[9px] font-black text-slate-400">
                      {item.n}
                    </span>

                    <h3 className="mt-2 text-[12px] font-black text-white sm:text-[13px]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[11px] font-medium leading-6 text-slate-300 sm:text-[12px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[12px] font-medium leading-7 text-slate-300 sm:text-[13px]">
                  بعد جمع عينة كافية، قارن النتائج حسب نوع السوق ونموذج
                  الدخول والإطار الزمني. قد تجد أن نفس القواعد تتصرف بصورة
                  مختلفة داخل Trend مقارنة بـRange.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              25 — SUPPORT & RESISTANCE VS SUPPLY & DEMAND
          ================================================= */}

          <section
            id="support-resistance-vs-supply-demand"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>25 — مقارنة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                الدعم والمقاومة مقابل العرض والطلب
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يوجد تداخل واضح بين Support &amp; Resistance وSupply &amp;
                  Demand، لكن الطريقتين لا تستخدمان دائمًا نفس طريقة تعريف
                  المناطق.
                </p>

                <p>
                  الدعم والمقاومة يركزان عادة على مناطق تاريخية تفاعل معها
                  السعر، بينما تركز منهجيات العرض والطلب غالبًا على قاعدة
                  السعر أو أصل حركة اندفاعية قوية.
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden grid-cols-[0.7fr_1.35fr_1.35fr] bg-slate-950 px-5 py-4 text-[11px] font-black text-white sm:grid">
                  <div>العامل</div>
                  <div>Support &amp; Resistance</div>
                  <div>Supply &amp; Demand</div>
                </div>

                {[
                  [
                    "التركيز",
                    "مستويات ومناطق رد فعل تاريخية",
                    "مناطق مرتبطة بمنشأ حركة قوية",
                  ],
                  [
                    "الرسم",
                    "خطوط أو Zones أفقية",
                    "غالبًا Base قبل Departure",
                  ],
                  [
                    "النماذج",
                    "Bounce وBreakout وRetest وRange",
                    "عودة إلى Zone ومراقبة رد الفعل",
                  ],
                  [
                    "المشترك",
                    "كلاهما يحاول تحديد مناطق قد تصبح مهمة عند عودة السعر إليها.",
                    "",
                  ],
                ].map(([factor, sr, sd], index) => (
                  <div
                    key={factor}
                    className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-[0.7fr_1.35fr_1.35fr]"
                  >
                    <div className="text-[12px] font-black text-slate-950 sm:text-[13px]">
                      {factor}
                    </div>

                    {index === 3 ? (
                      <div className="text-[12px] font-medium leading-7 text-slate-600 sm:col-span-2 sm:text-[13px]">
                        {sr}
                      </div>
                    ) : (
                      <>
                        <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                          {sr}
                        </div>

                        <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                          {sd}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <a
                href="/strategies/supply-and-demand"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-[12px] font-black text-slate-700 transition hover:bg-slate-50 sm:text-[13px]"
              >
                اقرأ استراتيجية العرض والطلب ←
              </a>
            </div>
          </section>

          {/* =================================================
              26 — BEGINNER ROADMAP
          ================================================= */}

          <section
            id="support-resistance-beginners"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>26 — للمبتدئين</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                كيف يبدأ المبتدئ بتعلم الدعم والمقاومة؟
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "تعلم الهيكل",
                    text: "ابدأ بتحديد Swing High وSwing Low والنطاقات الواضحة.",
                  },
                  {
                    n: "02",
                    title: "ارسم مناطق بسيطة",
                    text: "تجنب عشرات الخطوط وركز على المناطق المهمة فقط.",
                  },
                  {
                    n: "03",
                    title: "اختر نموذجًا واحدًا",
                    text: "ابدأ بـBounce أو Break & Retest بدل خلط جميع النماذج.",
                  },
                  {
                    n: "04",
                    title: "اختبر وسجّل",
                    text: "طبق قواعد ثابتة على بيانات تاريخية قبل المخاطرة بأموال حقيقية.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-[10px] font-black text-white">
                      {item.n}
                    </span>

                    <h3 className="mt-4 text-[13px] font-black text-slate-950">
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
              27 — FAQ
          ================================================= */}

          <section
            id="support-resistance-faq"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>27 — الأسئلة الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أسئلة شائعة حول الدعم والمقاومة
              </h2>

              <div className="mt-7 space-y-3">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50/50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[13px] font-black leading-6 text-slate-950 sm:text-[14px]">
                      <span>{item.question}</span>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[16px] font-light text-slate-500 shadow-sm transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-5 py-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              28 — SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>28 — الخلاصة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                أهم ما يجب تذكره عن استراتيجية الدعم والمقاومة
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "تعامل مع الدعم والمقاومة كمناطق قرار وليست حواجز مضمونة.",
                  "حدد المنطقة قبل وصول السعر إليها لتقليل Hindsight Bias.",
                  "استخدم Zones بدل محاولة إجبار السعر على خط واحد دقيق.",
                  "حدد هل السوق في Trend أم Range قبل تقييم المستوى.",
                  "فرّق بين Bounce وBreakout & Retest وFalse Breakout.",
                  "عرّف قواعد الدخول والإلغاء والهدف قبل فتح الصفقة.",
                  "احسب Position Size بناءً على المسافة إلى Stop Loss.",
                  "اختبر نفس القواعد على عينة تاريخية قبل تقييم فعاليتها.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[16px] border border-slate-100 bg-slate-50/70 p-4"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2B6FD0]" />

                    <p className="text-[12px] font-medium leading-7 text-slate-700 sm:text-[13px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              29 — RELATED STRATEGIES
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>29 — استراتيجيات مرتبطة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-slate-950 sm:text-[29px]">
                استراتيجيات تكمل فهم الدعم والمقاومة
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "البرايس أكشن",
                    href: "/strategies/price-action",
                    text: "تعلم قراءة حركة السعر والشموع والهيكل بصورة مباشرة.",
                  },
                  {
                    title: "العرض والطلب",
                    href: "/strategies/supply-and-demand",
                    text: "تعرف على مناطق Supply & Demand وكيف تختلف عن الدعم والمقاومة.",
                  },
                  {
                    title: "الأوردر بلوك",
                    href: "/strategies/order-blocks",
                    text: "تعرف على Order Blocks ضمن أطر SMC وICT.",
                  },
                  {
                    title: "سحب السيولة",
                    href: "/strategies/liquidity-sweep",
                    text: "تعلم قراءة تجاوز القمم والقيعان ثم عودة السعر.",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-[22px] border border-slate-200 bg-slate-50/60 p-5 transition hover:border-blue-200 hover:bg-blue-50/30"
                  >
                    <h3 className="text-[13px] font-black text-slate-950 sm:text-[14px]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
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
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 shadow-sm">
            <div className="p-6 text-white sm:p-8 lg:p-10">
              <div className="max-w-[900px]">
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-300">
                  Forex Trading Strategies
                </div>

                <h2 className="mt-3 text-[23px] font-black leading-[1.5] tracking-[-0.02em] text-white sm:text-[29px]">
                  استكشف جميع استراتيجيات الفوركس
                </h2>

                <p className="mt-4 max-w-[780px] text-[13px] font-medium leading-8 text-slate-300 sm:text-[15px]">
                  انتقل إلى دليل الاستراتيجيات لمقارنة البرايس أكشن،
                  السكالبينغ، السوينغ، ICT، SMC، العرض والطلب، الأوردر بلوك،
                  سحب السيولة وغيرها.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/strategies"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-[12px] font-black text-slate-950 transition hover:bg-slate-100 sm:text-[13px]"
                  >
                    جميع الاستراتيجيات
                  </a>

                  <a
                    href="/strategies/price-action"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-5 text-[12px] font-black text-white transition hover:bg-white/[0.1] sm:text-[13px]"
                  >
                    تعلم البرايس أكشن
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <div className="rounded-[20px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-[11px] font-medium leading-6 text-slate-500 sm:text-[12px] sm:leading-7">
              <strong className="font-black text-slate-700">تنويه:</strong>{" "}
              هذا المحتوى تعليمي فقط ولا يمثل توصية استثمارية أو دعوة لفتح أو
              إغلاق أي صفقة. التداول بالرافعة المالية ينطوي على مخاطر مرتفعة
              وقد يؤدي إلى خسارة رأس المال. لا تضمن مناطق الدعم والمقاومة أو
              أي أداة تحليل فني نتائج مستقبلية، ويجب اختبار أي استراتيجية
              وفهم مخاطرها قبل استخدامها.
            </p>
          </div>
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
      </div>
    </main>
  );
}