import type { Metadata } from "next";

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/strategies/supply-and-demand`;
const EN_PAGE_URL = `${BASE_URL}/en/strategies/supply-and-demand`;

const PAGE_TITLE =
  "استراتيجية العرض والطلب في التداول: شرح شامل";

const PAGE_DESCRIPTION =
  "شرح استراتيجية العرض والطلب في التداول خطوة بخطوة: كيفية تحديد ورسم مناطق العرض والطلب، أنواع DBR وRBR وRBD وDBD، تقييم قوة المنطقة، المناطق الجديدة والمختبرة، والدخول وإدارة المخاطر.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  keywords: [
    "استراتيجية العرض والطلب",
    "العرض والطلب في التداول",
    "العرض والطلب في الفوركس",
    "مناطق العرض والطلب",
    "مناطق العرض والطلب في التداول",
    "مناطق العرض والطلب في الفوركس",
    "شرح العرض والطلب",
    "شرح مناطق العرض والطلب",
    "تداول العرض والطلب",
    "استراتيجية العرض والطلب في التداول",
    "استراتيجية العرض والطلب في الفوركس",
    "كيفية تحديد مناطق العرض والطلب",
    "كيفية رسم مناطق العرض والطلب",
    "منطقة العرض",
    "منطقة الطلب",
    "مناطق الطلب",
    "مناطق العرض",
    "Supply and Demand",
    "Supply and Demand Trading",
    "Supply and Demand Strategy",
    "Supply Zone",
    "Demand Zone",
    "Supply and Demand Zones",
    "Fresh Supply Zone",
    "Fresh Demand Zone",
    "DBR",
    "Drop Base Rally",
    "RBR",
    "Rally Base Rally",
    "RBD",
    "Rally Base Drop",
    "DBD",
    "Drop Base Drop",
    "Proximal Line",
    "Distal Line",
    "Price Action",
    "الدعم والمقاومة",
    "التحليل الفني",
  ],

  alternates: {
    canonical: PAGE_URL,
    languages: {
      ar: PAGE_URL,
      en: EN_PAGE_URL,
      "x-default": EN_PAGE_URL,
    },
  },

  openGraph: {
    type: "article",
    locale: "ar_SA",
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
    question: "ما هي استراتيجية العرض والطلب في التداول؟",
    answer:
      "استراتيجية العرض والطلب هي أسلوب لتحليل حركة السعر يبحث عن مناطق تحرك منها السعر بقوة بعد فترة توازن أو قاعدة قصيرة. تسمى المنطقة التي انطلق منها الصعود منطقة طلب، بينما تسمى المنطقة التي بدأ منها الهبوط منطقة عرض. يستخدم المتداول هذه المناطق لمراقبة تفاعل السعر عند العودة إليها، وليس كإشارة دخول مضمونة.",
  },
  {
    question: "ما هي منطقة الطلب في التداول؟",
    answer:
      "منطقة الطلب هي نطاق سعري ظهر بالقرب منه ضغط شراء قوي تبعه ارتفاع واضح في السعر. عند عودة السعر مستقبلًا إلى المنطقة، يراقب المتداول ما إذا كان المشترون سيظهرون مجددًا وما إذا كان السياق لا يزال يدعم الصفقة.",
  },
  {
    question: "ما هي منطقة العرض في التداول؟",
    answer:
      "منطقة العرض هي نطاق سعري ظهر بالقرب منه ضغط بيع قوي تبعه هبوط واضح في السعر. يمكن للمتداول مراقبة المنطقة عند إعادة الاختبار، لكن مجرد وصول السعر إليها لا يعني أن الهبوط مضمون.",
  },
  {
    question: "كيف أحدد مناطق العرض والطلب؟",
    answer:
      "ابدأ بالبحث عن حركة سعرية قوية وواضحة، ثم ارجع إلى المنطقة الضيقة أو القاعدة التي سبقت تلك الحركة. قيّم قوة المغادرة، عدد شموع القاعدة، حداثة المنطقة، عدد مرات اختبارها، موقعها داخل هيكل السوق وما إذا كانت الحركة كسرت مستوى مهمًا.",
  },
  {
    question: "ما الفرق بين العرض والطلب والدعم والمقاومة؟",
    answer:
      "الدعم والمقاومة يرسمان غالبًا حول مستويات أو نقاط سبق أن تفاعل معها السعر، بينما تحليل العرض والطلب يركز أكثر على نطاق سعري انطلقت منه حركة قوية. كلا الأسلوبين يدرسان مناطق تفاعل السعر ويمكن أن يتداخلا، لكن طريقة تحديد المنطقة والتعامل معها تختلف.",
  },
  {
    question: "ما معنى DBR وRBR وRBD وDBD؟",
    answer:
      "DBR تعني Drop-Base-Rally وهي منطقة طلب انعكاسية، وRBR تعني Rally-Base-Rally وهي منطقة طلب استمرارية، وRBD تعني Rally-Base-Drop وهي منطقة عرض انعكاسية، وDBD تعني Drop-Base-Drop وهي منطقة عرض استمرارية.",
  },
  {
    question: "هل المنطقة الجديدة Fresh Zone أقوى؟",
    answer:
      "المنطقة التي لم يعد السعر إليها منذ تكوينها تسمى عادة Fresh Zone ويعطيها بعض المتداولين أولوية لأن المنطقة لم تتعرض لاختبارات متكررة. لكن الحداثة وحدها لا تكفي؛ يجب تقييم قوة الحركة والسياق وهيكل السوق والمخاطرة.",
  },
  {
    question: "هل تنجح مناطق العرض والطلب دائمًا؟",
    answer:
      "لا. يمكن للسعر اختراق أي منطقة عرض أو طلب، وقد تفشل المناطق التي تبدو مثالية على الرسم. لذلك يجب تحديد نقطة الإبطال وحجم المخاطرة مسبقًا وعدم التعامل مع المنطقة كحاجز مضمون للسعر.",
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

function SupplyDemandHeroDesktopChart() {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/70 p-6 xl:p-8">
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
            SUPPLY • DEMAND MAP
          </div>

          <div className="text-[9px] font-bold text-slate-400">
            EUR/USD
          </div>
        </div>

        <div className="relative flex-1">
          <svg
            viewBox="0 0 760 410"
            className="h-full w-full"
            role="img"
            aria-label="رسم تعليمي يوضح منطقة عرض أعلى الرسم ومنطقة طلب أسفله مع حركة السعر بين المنطقتين"
          >
            <defs>
              <pattern
                id="sdHeroGrid"
                width="48"
                height="41"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M48 0 L0 0 0 41"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              </pattern>

              <linearGradient
                id="demandHeroFill"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#dbeafe"
                  stopOpacity="0.95"
                />
                <stop
                  offset="100%"
                  stopColor="#eff6ff"
                  stopOpacity="0.5"
                />
              </linearGradient>
            </defs>

            <rect width="760" height="410" fill="#ffffff" />
            <rect width="760" height="410" fill="url(#sdHeroGrid)" />

            {/* SUPPLY ZONE */}
            <rect
              x="365"
              y="60"
              width="300"
              height="66"
              rx="11"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1.7"
              strokeDasharray="6 5"
            />

            <text
              x="515"
              y="86"
              textAnchor="middle"
              fontSize="11"
              fontWeight="900"
              fill="#334155"
            >
              SUPPLY ZONE
            </text>

            <text
              x="515"
              y="105"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#64748b"
            >
              SELLING PRESSURE PREVIOUSLY DOMINATED
            </text>

            {/* DEMAND ZONE */}
            <rect
              x="120"
              y="285"
              width="315"
              height="70"
              rx="11"
              fill="url(#demandHeroFill)"
              stroke="#60a5fa"
              strokeWidth="1.7"
              strokeDasharray="6 5"
            />

            <text
              x="277"
              y="313"
              textAnchor="middle"
              fontSize="11"
              fontWeight="900"
              fill="#1E5BB8"
            >
              DEMAND ZONE
            </text>

            <text
              x="277"
              y="333"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#64748b"
            >
              BUYING PRESSURE PREVIOUSLY DOMINATED
            </text>

            {/* PRICE PATH */}
            <path
              d="M55 250
                 L105 226
                 L150 247
                 L198 220
                 L245 250
                 L285 309
                 L330 324
                 L372 286
                 L420 225
                 L465 180
                 L510 116
                 L550 92
                 L588 110
                 L620 158
                 L655 208
                 L700 235"
              fill="none"
              stroke="#1E5BB8"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* DEMAND REACTION */}
            <circle
              cx="330"
              cy="324"
              r="9"
              fill="#ffffff"
              stroke="#2563eb"
              strokeWidth="4"
            />

            <rect
              x="290"
              y="245"
              width="93"
              height="27"
              rx="13.5"
              fill="#2563eb"
            />

            <text
              x="336.5"
              y="263"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#ffffff"
            >
              REACTION
            </text>

            {/* SUPPLY REACTION */}
            <circle
              cx="550"
              cy="92"
              r="9"
              fill="#ffffff"
              stroke="#475569"
              strokeWidth="4"
            />

            <rect
              x="605"
              y="83"
              width="96"
              height="27"
              rx="13.5"
              fill="#0f172a"
            />

            <text
              x="653"
              y="101"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#ffffff"
            >
              REJECTION
            </text>

            <line
              x1="600"
              y1="96"
              x2="564"
              y2="94"
              stroke="#0f172a"
              strokeWidth="1.5"
            />

            {/* LABELS */}
            <rect
              x="55"
              y="40"
              width="190"
              height="64"
              rx="13"
              fill="#ffffff"
              stroke="#cbd5e1"
            />

            <text
              x="150"
              y="66"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#0f172a"
            >
              1 — FIND THE STRONG MOVE
            </text>

            <text
              x="150"
              y="87"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#64748b"
            >
              ثم ارجع إلى القاعدة التي سبقتها
            </text>

            <rect
              x="55"
              y="125"
              width="190"
              height="64"
              rx="13"
              fill="#eff6ff"
              stroke="#bfdbfe"
            />

            <text
              x="150"
              y="151"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fill="#1E5BB8"
            >
              2 — MARK THE ZONE
            </text>

            <text
              x="150"
              y="172"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#64748b"
            >
              المنطقة نطاق وليست خطًا واحدًا
            </text>
          </svg>

          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
            {[
              ["01", "حدد الحركة القوية"],
              ["02", "ارجع إلى القاعدة"],
              ["03", "راقب إعادة الاختبار"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-center shadow-sm backdrop-blur"
              >
                <div className="text-[9px] font-black text-[#2B6FD0]">
                  {number}
                </div>

                <div
                  dir="rtl"
                  className="mt-0.5 text-[10px] font-black text-slate-700"
                >
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

function SupplyDemandHeroMobileChart() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
        <span className="text-[9px] font-black tracking-wider text-slate-400">
          SUPPLY & DEMAND MAP
        </span>

        <span className="rounded-md bg-blue-50 px-2 py-1 text-[8px] font-black text-[#1E5BB8]">
          EDUCATIONAL
        </span>
      </div>

      <svg
        viewBox="0 0 680 310"
        className="block h-auto w-full"
        role="img"
        aria-label="رسم مبسط يوضح منطقة العرض ومنطقة الطلب وحركة السعر بينهما"
      >
        <defs>
          <pattern
            id="sdMobileGrid"
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

        <rect width="680" height="310" fill="#ffffff" />
        <rect width="680" height="310" fill="url(#sdMobileGrid)" />

        <rect
          x="350"
          y="48"
          width="245"
          height="52"
          rx="9"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeDasharray="6 5"
        />

        <text
          x="472"
          y="78"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#334155"
        >
          SUPPLY ZONE
        </text>

        <rect
          x="95"
          y="225"
          width="265"
          height="55"
          rx="9"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeDasharray="6 5"
        />

        <text
          x="228"
          y="257"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#1E5BB8"
        >
          DEMAND ZONE
        </text>

        <path
          d="M50 185
             L105 165
             L155 190
             L208 235
             L260 250
             L315 215
             L370 160
             L420 105
             L470 75
             L520 92
             L575 145
             L630 185"
          fill="none"
          stroke="#1E5BB8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx="260"
          cy="250"
          r="7"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="3"
        />

        <circle
          cx="470"
          cy="75"
          r="7"
          fill="#ffffff"
          stroke="#475569"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

/* =========================================================
   CHART 01 — WHAT IS A ZONE?
========================================================= */

function SupplyDemandBasicsChart({
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
          SUPPLY & DEMAND • BASICS
        </span>

        <span
          dir="rtl"
          className="text-[11px] font-black text-slate-600"
        >
          كيف تتكوّن المنطقة على الرسم؟
        </span>
      </div>

      <svg
        viewBox="0 0 1000 500"
        className="block h-auto w-full"
        role="img"
        aria-label="رسم تعليمي يشرح تكوين منطقة الطلب من قاعدة ثم اندفاع صاعد ومنطقة العرض من قاعدة ثم اندفاع هابط"
      >
        <defs>
          <pattern
            id="sdBasicsGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 50"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1000" height="500" fill="#ffffff" />
        <rect width="1000" height="500" fill="url(#sdBasicsGrid)" />

        <line
          x1="500"
          y1="35"
          x2="500"
          y2="455"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="7 7"
        />

        {/* DEMAND SIDE */}
        <text
          x="250"
          y="42"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#1E5BB8"
        >
          DEMAND ZONE
        </text>

        <text
          x="250"
          y="65"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          قاعدة قصيرة يتبعها اندفاع صاعد
        </text>

        <path
          d="M55 290
             L110 320
             L165 300
             L215 330
             L255 308
             L295 325"
          fill="none"
          stroke="#64748b"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="175"
          y="285"
          width="155"
          height="72"
          rx="10"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        <text
          x="252"
          y="345"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1E5BB8"
        >
          BASE
        </text>

        <path
          d="M295 325
             L330 280
             L365 230
             L400 170
             L450 105"
          fill="none"
          stroke="#2563eb"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="337"
          y="184"
          width="116"
          height="29"
          rx="14"
          fill="#2563eb"
        />

        <text
          x="395"
          y="203"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          STRONG RALLY
        </text>

        {/* SUPPLY SIDE */}
        <text
          x="750"
          y="42"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#334155"
        >
          SUPPLY ZONE
        </text>

        <text
          x="750"
          y="65"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          قاعدة قصيرة يتبعها اندفاع هابط
        </text>

        <path
          d="M545 150
             L600 120
             L650 142
             L700 118
             L745 145
             L785 128"
          fill="none"
          stroke="#64748b"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="650"
          y="95"
          width="168"
          height="75"
          rx="10"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        <text
          x="734"
          y="158"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#475569"
        >
          BASE
        </text>

        <path
          d="M785 128
             L820 175
             L852 230
             L885 295
             L930 370"
          fill="none"
          stroke="#475569"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="820"
          y="245"
          width="116"
          height="29"
          rx="14"
          fill="#0f172a"
        />

        <text
          x="878"
          y="264"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          STRONG DROP
        </text>

        {/* BOTTOM EXPLANATION */}
        <rect
          x="130"
          y="402"
          width="740"
          height="58"
          rx="14"
          fill="#f8fafc"
          stroke="#cbd5e1"
        />

        <text
          x="500"
          y="426"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#0f172a"
        >
          المنطقة ليست الحركة القوية نفسها
        </text>

        <text
          x="500"
          y="447"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          نبحث عن القاعدة أو النطاق الضيق الذي سبق الانطلاق الواضح للسعر
        </text>
      </svg>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="sd-basics-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#what-are-supply-demand-zones"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          إغلاق ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        {chart}
      </div>

      <div className="lg:hidden">
        <a
          href="#sd-basics-fullscreen"
          className="sd-centered-scroll block overflow-x-auto rounded-[22px]"
        >
          {chart}
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>
            حرّك الرسم يمينًا ويسارًا لمشاهدة التفاصيل — اضغط للتكبير
          </span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CHART 02 — FOUR SUPPLY & DEMAND PATTERNS
========================================================= */

function SupplyDemandPatternsChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div
      className={
        fullscreen
          ? "min-w-[980px] overflow-hidden rounded-[24px] border border-slate-200 bg-white"
          : "min-w-[900px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:min-w-0"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
        <span className="text-[10px] font-black tracking-[0.14em] text-slate-400">
          SUPPLY & DEMAND • 4 PATTERNS
        </span>

        <span
          dir="rtl"
          className="text-[11px] font-black text-slate-600"
        >
          الأنماط الأربعة الأساسية
        </span>
      </div>

      <svg
        viewBox="0 0 1100 620"
        className="block h-auto w-full"
        role="img"
        aria-label="رسم تعليمي يوضح أنماط مناطق العرض والطلب الأربعة DBR وRBR وRBD وDBD"
      >
        <defs>
          <pattern
            id="sdPatternGrid"
            width="55"
            height="55"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M55 0 L0 0 0 55"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1100" height="620" fill="#ffffff" />
        <rect width="1100" height="620" fill="url(#sdPatternGrid)" />

        <line
          x1="550"
          y1="25"
          x2="550"
          y2="595"
          stroke="#cbd5e1"
          strokeDasharray="7 7"
        />

        <line
          x1="25"
          y1="310"
          x2="1075"
          y2="310"
          stroke="#cbd5e1"
          strokeDasharray="7 7"
        />

        {/* DBR */}
        <text
          x="275"
          y="45"
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fill="#1E5BB8"
        >
          DBR — DROP • BASE • RALLY
        </text>

        <text
          x="275"
          y="67"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#64748b"
        >
          DEMAND • REVERSAL
        </text>

        <path
          d="M70 95
             L130 145
             L185 205
             L225 235
             L260 225
             L295 238
             L330 223
             L370 180
             L415 125
             L475 85"
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="210"
          y="205"
          width="140"
          height="55"
          rx="9"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeDasharray="6 5"
        />

        <text
          x="280"
          y="250"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1E5BB8"
        >
          DEMAND
        </text>

        {/* RBR */}
        <text
          x="825"
          y="45"
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fill="#1E5BB8"
        >
          RBR — RALLY • BASE • RALLY
        </text>

        <text
          x="825"
          y="67"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#64748b"
        >
          DEMAND • CONTINUATION
        </text>

        <path
          d="M615 245
             L670 190
             L725 130
             L765 115
             L800 125
             L835 112
             L870 126
             L915 95
             L970 62
             L1030 38"
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="750"
          y="98"
          width="145"
          height="53"
          rx="9"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeDasharray="6 5"
        />

        <text
          x="822"
          y="140"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#1E5BB8"
        >
          DEMAND
        </text>

        {/* RBD */}
        <text
          x="275"
          y="352"
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fill="#334155"
        >
          RBD — RALLY • BASE • DROP
        </text>

        <text
          x="275"
          y="374"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#64748b"
        >
          SUPPLY • REVERSAL
        </text>

        <path
          d="M65 545
             L120 490
             L170 430
             L220 405
             L260 415
             L300 402
             L335 418
             L375 455
             L420 510
             L480 565"
          fill="none"
          stroke="#475569"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="205"
          y="385"
          width="150"
          height="58"
          rx="9"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeDasharray="6 5"
        />

        <text
          x="280"
          y="430"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#475569"
        >
          SUPPLY
        </text>

        {/* DBD */}
        <text
          x="825"
          y="352"
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fill="#334155"
        >
          DBD — DROP • BASE • DROP
        </text>

        <text
          x="825"
          y="374"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#64748b"
        >
          SUPPLY • CONTINUATION
        </text>

        <path
          d="M615 385
             L670 430
             L720 485
             L760 505
             L800 495
             L835 508
             L875 497
             L920 530
             L975 565
             L1035 590"
          fill="none"
          stroke="#475569"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="745"
          y="475"
          width="150"
          height="57"
          rx="9"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeDasharray="6 5"
        />

        <text
          x="820"
          y="520"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#475569"
        >
          SUPPLY
        </text>
      </svg>

      <div className="grid grid-cols-4 border-t border-slate-200">
        {[
          ["DBR", "طلب انعكاسي"],
          ["RBR", "طلب استمراري"],
          ["RBD", "عرض انعكاسي"],
          ["DBD", "عرض استمراري"],
        ].map(([code, label], index) => (
          <div
            key={code}
            className={`p-3 text-center ${
              index !== 3 ? "border-l border-slate-200" : ""
            }`}
          >
            <div className="text-[10px] font-black text-[#2B6FD0]">
              {code}
            </div>

            <div
              dir="rtl"
              className="mt-1 text-[10px] font-bold text-slate-600"
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="sd-patterns-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#supply-demand-patterns"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          إغلاق ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        {chart}
      </div>

      <div className="lg:hidden">
        <a
          href="#sd-patterns-fullscreen"
          className="sd-centered-scroll block overflow-x-auto rounded-[22px]"
        >
          {chart}
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>
            حرّك الرسم يمينًا ويسارًا لمشاهدة الأنماط الأربعة — اضغط للتكبير
          </span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CHART 03 — HOW TO DRAW A ZONE
========================================================= */

function DrawSupplyDemandZoneChart({
  fullscreen = false,
}: {
  fullscreen?: boolean;
}) {
  const chart = (
    <div
      className={
        fullscreen
          ? "min-w-[950px] overflow-hidden rounded-[24px] border border-slate-200 bg-white"
          : "min-w-[860px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:min-w-0"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3">
        <span className="text-[10px] font-black tracking-[0.14em] text-slate-400">
          SUPPLY & DEMAND • DRAWING RULES
        </span>

        <span
          dir="rtl"
          className="text-[11px] font-black text-slate-600"
        >
          مثال عملي على رسم منطقة طلب
        </span>
      </div>

      <svg
        viewBox="0 0 1000 500"
        className="block h-auto w-full"
        role="img"
        aria-label="رسم تعليمي يوضح طريقة رسم منطقة الطلب باستخدام الحد البعيد Distal والحد القريب Proximal ثم حركة المغادرة"
      >
        <defs>
          <pattern
            id="drawSdGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L0 0 0 50"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="1000" height="500" fill="#ffffff" />
        <rect width="1000" height="500" fill="url(#drawSdGrid)" />

        {/* PRICE INTO BASE */}
        <path
          d="M65 165
             L115 205
             L165 250
             L220 300
             L270 330"
          fill="none"
          stroke="#64748b"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* BASE */}
        <path
          d="M270 330
             L310 312
             L345 326
             L380 308
             L415 322"
          fill="none"
          stroke="#475569"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* DEMAND ZONE */}
        <rect
          x="250"
          y="292"
          width="205"
          height="75"
          rx="9"
          fill="#eff6ff"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        {/* DISTAL */}
        <line
          x1="215"
          y1="367"
          x2="485"
          y2="367"
          stroke="#2563eb"
          strokeWidth="2"
        />

        <rect
          x="70"
          y="351"
          width="132"
          height="31"
          rx="15.5"
          fill="#2563eb"
        />

        <text
          x="136"
          y="371"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          DISTAL LINE
        </text>

        <text
          x="136"
          y="402"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          الحد الأبعد
        </text>

        {/* PROXIMAL */}
        <line
          x1="215"
          y1="292"
          x2="485"
          y2="292"
          stroke="#1E5BB8"
          strokeWidth="2"
        />

        <rect
          x="70"
          y="276"
          width="132"
          height="31"
          rx="15.5"
          fill="#0f172a"
        />

        <text
          x="136"
          y="296"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          PROXIMAL LINE
        </text>

        <text
          x="136"
          y="327"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#64748b"
        >
          الحد الأقرب للسعر
        </text>

        {/* DEPARTURE */}
        <path
          d="M415 322
             L465 268
             L515 218
             L565 165
             L620 115
             L675 78"
          fill="none"
          stroke="#2563eb"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="505"
          y="113"
          width="150"
          height="31"
          rx="15.5"
          fill="#2563eb"
        />

        <text
          x="580"
          y="133"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          STRONG DEPARTURE
        </text>

        {/* RETURN */}
        <path
          d="M675 78
             L725 115
             L765 165
             L800 215
             L830 265
             L850 300"
          fill="none"
          stroke="#1E5BB8"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx="850"
          cy="300"
          r="9"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="4"
        />

        <rect
          x="795"
          y="326"
          width="112"
          height="31"
          rx="15.5"
          fill="#0f172a"
        />

        <text
          x="851"
          y="346"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="#ffffff"
        >
          FIRST RETEST
        </text>

        <text
          x="705"
          y="418"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#64748b"
        >
          لا يعني وصول السعر للمنطقة أن الارتداد مضمون
        </text>
      </svg>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        id="draw-sd-zone-fullscreen"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-auto bg-slate-950/95 p-4 target:flex"
      >
        <a
          href="#how-to-draw-zones"
          className="fixed left-4 top-4 z-[110] rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-xl"
        >
          إغلاق ×
        </a>

        <div className="max-h-[90vh] max-w-[96vw] overflow-auto">
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        {chart}
      </div>

      <div className="lg:hidden">
        <a
          href="#draw-sd-zone-fullscreen"
          className="sd-centered-scroll block overflow-x-auto rounded-[22px]"
        >
          {chart}
        </a>

        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500">
          <span>↔</span>
          <span>
            حرّك الرسم يمينًا ويسارًا لرؤية الحدود وإعادة الاختبار — اضغط للتكبير
          </span>
        </div>
      </div>
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
    inLanguage: "ar",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
    url: PAGE_URL,
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
    articleSection: "استراتيجيات التداول",
    keywords: [
      "استراتيجية العرض والطلب",
      "مناطق العرض والطلب",
      "العرض والطلب في التداول",
      "العرض والطلب في الفوركس",
      "منطقة العرض",
      "منطقة الطلب",
      "كيفية رسم مناطق العرض والطلب",
      "Supply and Demand",
      "Supply Zone",
      "Demand Zone",
      "DBR",
      "RBR",
      "RBD",
      "DBD",
      "Price Action",
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
        name: "استراتيجية العرض والطلب",
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
      {/* Fullscreen mobile charts */}
      <SupplyDemandBasicsChart fullscreen />
      <SupplyDemandPatternsChart fullscreen />
      <DrawSupplyDemandZoneChart fullscreen />

      <div className="mx-auto max-w-[1520px] px-3 sm:px-5 lg:px-8">

        {/* =================================================
            BREADCRUMBS
        ================================================= */}

        <nav
          aria-label="مسار التنقل"
          className="py-4 text-[11px] font-bold text-slate-500 sm:py-5 sm:text-xs"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a
                href="/"
                className="transition hover:text-[#1E5BB8]"
              >
                الرئيسية
              </a>
            </li>

            <li className="text-slate-300">/</li>

            <li>
              <a
                href="/strategies"
                className="transition hover:text-[#1E5BB8]"
              >
                استراتيجيات التداول
              </a>
            </li>

            <li className="text-slate-300">/</li>

            <li className="text-slate-700">
              العرض والطلب
            </li>
          </ol>
        </nav>

        {/* =================================================
            HERO — DESKTOP
        ================================================= */}

        <section className="hidden overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.07)] lg:block">
          <div
            dir="ltr"
            className="grid min-h-[420px] lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="border-r border-slate-200">
              <SupplyDemandHeroDesktopChart />
            </div>

            <div
              dir="rtl"
              className="flex flex-col justify-center bg-gradient-to-bl from-white via-white to-blue-50/40 p-9 xl:p-12"
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-black text-[#1E5BB8]">
                  استراتيجية تداول
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black text-slate-600">
                  Supply & Demand
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black text-slate-600">
                  مبتدئ → متوسط
                </span>
              </div>

              <h1 className="max-w-[850px] text-[34px] font-black leading-[1.45] tracking-tight text-slate-950 xl:text-[42px]">
               استراتيجية العرض والطلب في التداول
                <span className="block text-[#1E5BB8]">
                  شرح مناطق العرض والطلب في التداول
                </span>
              </h1>

              <p className="mt-5 max-w-[880px] text-[14px] font-medium leading-8 text-slate-600 xl:text-[15px]">
                دليل عملي يبدأ من الصفر: ما هي منطقة العرض ومنطقة الطلب،
                كيف تتكوّن المنطقة، وكيف تميز القاعدة الحقيقية من التذبذب
                العادي، ثم تتعلم الأنماط الأربعة DBR وRBR وRBD وDBD،
                وطريقة رسم الحدود وتقييم قوة المنطقة قبل التفكير في الدخول.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Supply Zone",
                  "Demand Zone",
                  "DBR / RBR",
                  "RBD / DBD",
                  "Fresh Zones",
                  "Zone Quality",
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
                <span>آخر تحديث: 7 سبتمبر 2026</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>وقت القراءة: 24–30 دقيقة</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>شرح للمبتدئين خطوة بخطوة</span>
              </div>
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
                استراتيجية تداول
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-600">
                Supply & Demand
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-600">
                مبتدئ → متوسط
              </span>
            </div>

            <h1 className="text-[25px] font-black leading-[1.55] tracking-tight text-slate-950 sm:text-[29px]">
              استراتيجية العرض والطلب
              <span className="mt-1 block text-[20px] text-[#1E5BB8] sm:text-[23px]">
                شرح مناطق العرض والطلب في التداول
              </span>
            </h1>

            <p className="mt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px]">
              تعلم من الصفر كيف تحدد منطقة العرض ومنطقة الطلب، ترسم حدودها،
              تفرق بين DBR وRBR وRBD وDBD، وتقيم المنطقة قبل انتظار إعادة
              الاختبار والدخول.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                "Supply",
                "Demand",
                "DBR",
                "RBD",
                "Fresh Zone",
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
              <span>7 سبتمبر 2026</span>
              <span>•</span>
              <span>24–30 دقيقة</span>
            </div>

            <SupplyDemandHeroMobileChart />
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
                مقدمة — العرض والطلب في التداول
              </SectionLabel>

              <h2 className="text-[24px] font-black leading-[1.55] text-slate-950 sm:text-[30px]">
                ما هي استراتيجية العرض والطلب في التداول؟
              </h2>

              <div className="mt-5 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>استراتيجية العرض والطلب</strong> هي طريقة لتحليل
                  حركة السعر تبحث عن مناطق حدث عندها اختلال واضح بين ضغط
                  المشترين والبائعين، ثم تحرك السعر بعيدًا عنها بقوة.
                  عندما تكون قوة الشراء هي المسيطرة ويصعد السعر بقوة، نبحث
                  عن <strong>منطقة طلب Demand Zone</strong>. وعندما تسيطر
                  قوة البيع وينخفض السعر بوضوح، نبحث عن
                  <strong> منطقة عرض Supply Zone</strong>.
                </p>

                <p>
                  الفكرة المهمة للمبتدئ هي أن المنطقة ليست المكان الذي انتهت
                  عنده الحركة القوية، وإنما غالبًا
                  <strong> المنطقة الصغيرة التي بدأت منها الحركة</strong>.
                  لذلك لا نبدأ بالبحث عن مستطيلات عشوائية على الرسم؛ نبدأ
                  أولًا من الحركة الواضحة، ثم نرجع إلى الخلف ونفحص القاعدة
                  التي سبقتها.
                </p>

                <p>
                  بعد تحديد المنطقة، لا نفترض أن السعر سيعود إليها ويرتد
                  حتمًا. الهدف هو إنشاء
                  <strong> منطقة مراقبة محتملة</strong>. عندما يعود السعر،
                  نقيّم حالة السوق، حداثة المنطقة، قوة المغادرة، عدد مرات
                  الاختبار، موقع المنطقة داخل الاتجاه، ثم نقرر هل توجد صفقة
                  منطقية أم لا.
                </p>
              </div>

              <ImportantBox title="لا تخلط بين مناطق العرض والطلب وسعر Bid / Ask">
                كلمة «العرض والطلب» تستخدم أحيانًا بالعربية أيضًا عند شرح
                أسعار Bid وAsk والسبريد، لكن هذا الدليل يتحدث عن
                <strong> Supply and Demand Zones</strong> على الرسم البياني:
                مناطق سعرية ندرس عندها اختلال ضغط الشراء والبيع وحركة السعر
                التي خرجت منها.
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
              <SectionLabel>01 — الفكرة الأساسية</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تعمل استراتيجية العرض والطلب؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                أبسط طريقة لفهمها هي التفكير في السعر كنتيجة مستمرة للصراع
                بين المشترين والبائعين. عندما يستطيع المشترون امتصاص ضغط
                البيع ويدفعون السعر بقوة للأعلى، يظهر اختلال لصالح الطلب.
                وعندما يصبح ضغط البيع أقوى، يتحرك السعر للأسفل.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "ابحث عن الحركة",
                    text: "حدد صعودًا أو هبوطًا واضحًا أسرع وأقوى من الحركة المحيطة.",
                  },
                  {
                    n: "02",
                    title: "ارجع إلى المصدر",
                    text: "ارجع إلى آخر قاعدة أو تماسك صغير سبق الانطلاق.",
                  },
                  {
                    n: "03",
                    title: "ارسم المنطقة",
                    text: "حدد نطاق القاعدة بدل رسم خط واحد عشوائي.",
                  },
                  {
                    n: "04",
                    title: "قيّم الجودة",
                    text: "افحص قوة المغادرة والحداثة والسياق وعدد الاختبارات.",
                  },
                  {
                    n: "05",
                    title: "انتظر العودة",
                    text: "إذا عاد السعر، راقب التفاعل وحدد الإبطال والمخاطرة.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#2B6FD0]">
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
                  SUPPLY & DEMAND PROCESS
                </div>

                <div
                  dir="ltr"
                  className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-black sm:text-xs"
                >
                  {[
                    "STRONG MOVE",
                    "→",
                    "BASE",
                    "→",
                    "ZONE",
                    "→",
                    "QUALITY",
                    "→",
                    "RETEST",
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
              02 — WHAT ARE ZONES
          ================================================= */}

          <section
            id="what-are-supply-demand-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>02 — مناطق العرض والطلب</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هي مناطق العرض والطلب على الرسم البياني؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  <strong>منطقة العرض أو الطلب هي نطاق سعري</strong>، وليست
                  نقطة دقيقة. في هذا النطاق تحرك السعر عادةً بشكل أبطأ أو
                  كوّن قاعدة قصيرة، ثم خرج منها بحركة أكثر قوة ووضوحًا.
                </p>

                <p>
                  في <strong>منطقة الطلب</strong> يكون الدليل المرئي هو أن
                  السعر غادر المنطقة للأعلى. أما
                  <strong> منطقة العرض</strong> فنلاحظ أن السعر غادرها
                  للأسفل. كلما كانت المغادرة أكثر وضوحًا مقارنة بالحركة
                  السابقة، أصبحت المنطقة أسهل في التقييم بصريًا.
                </p>
              </div>

              <div className="mt-7">
                <SupplyDemandBasicsChart />
              </div>

              <ImportantBox title="ابدأ من الحركة وليس من المنطقة">
                إذا فتحت الرسم وبدأت برسم مستطيل عند كل قمة وكل قاع، ستجد
                عشرات المناطق ولن تعرف أيها مهم. اعكس العملية: ابحث أولًا
                عن حركة خرج فيها السعر بقوة، ثم ارجع إلى مصدر تلك الحركة.
                بهذه الطريقة يكون لديك سبب واضح لكل منطقة ترسمها.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              03 — DEMAND ZONE
          ================================================= */}

          <section
            id="demand-zone"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>03 — Demand Zone</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هي منطقة الطلب وكيف تتكوّن؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <strong>منطقة الطلب Demand Zone</strong> هي نطاق سعري سبق أن
                غادر منه السعر للأعلى بحركة قوية نسبيًا. القراءة البسيطة هي
                أن ضغط الشراء أصبح في تلك المرحلة أقوى من ضغط البيع بما يكفي
                لدفع السعر إلى مستويات أعلى.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "وصول السعر",
                    text: "قد يدخل السعر إلى المنطقة وهو هابط أو بعد حركة جانبية، لكننا لا نسميها طلبًا قبل رؤية ما حدث بعدها.",
                  },
                  {
                    n: "02",
                    title: "تكوين القاعدة",
                    text: "يتباطأ السعر أو تتداخل عدة شموع داخل نطاق صغير نسبيًا قبل الانطلاق.",
                  },
                  {
                    n: "03",
                    title: "الاندفاع الصاعد",
                    text: "يغادر السعر القاعدة للأعلى بحركة واضحة؛ وهنا تصبح القاعدة مرشحة لتكون منطقة طلب.",
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

              <div className="mt-7 rounded-2xl border border-blue-200 bg-blue-50/50 p-5 sm:p-6">
                <div className="text-[10px] font-black text-[#1E5BB8]">
                  تذكّرها بهذه الطريقة
                </div>

                <div
                  dir="ltr"
                  className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] font-black text-slate-800"
                >
                  <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
                    BASE
                  </span>
                  <span>→</span>
                  <span className="rounded-lg bg-[#2B6FD0] px-3 py-2 text-white">
                    STRONG RALLY ↑
                  </span>
                  <span>→</span>
                  <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
                    DEMAND ZONE
                  </span>
                </div>
              </div>
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

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما هي منطقة العرض وكيف تتكوّن؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <strong>منطقة العرض Supply Zone</strong> هي الصورة المعاكسة
                لمنطقة الطلب. نحدد نطاقًا سعريًا سبق أن غادره السعر للأسفل
                بحركة قوية، ما يدل على أن ضغط البيع أصبح في تلك المرحلة أقوى
                من ضغط الشراء.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "وصول السعر",
                    text: "يقترب السعر من نطاق تبدأ فيه الحركة بالتباطؤ أو تظهر شموع متداخلة.",
                  },
                  {
                    n: "02",
                    title: "تكوين القاعدة",
                    text: "تتكون قاعدة ضيقة نسبيًا قبل ظهور الحركة الهابطة المهمة.",
                  },
                  {
                    n: "03",
                    title: "الاندفاع الهابط",
                    text: "يخرج السعر بقوة للأسفل؛ وهنا تصبح القاعدة السابقة مرشحة لتكون منطقة عرض.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-600">
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

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                  SUPPLY ZONE LOGIC
                </div>

                <div
                  dir="ltr"
                  className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] font-black"
                >
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    BASE
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    STRONG DROP ↓
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    SUPPLY ZONE
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              05 — FOUR PATTERNS
          ================================================= */}

          <section
            id="supply-demand-patterns"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>05 — الأنماط الأربعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                أنواع مناطق العرض والطلب: DBR وRBR وRBD وDBD
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                هذه الاختصارات تبدو معقدة للمبتدئ، لكنها تصف فقط
                <strong> ما فعله السعر قبل القاعدة وما فعله بعدها</strong>.
                لدينا نوعان من مناطق الطلب ونوعان من مناطق العرض.
              </p>

              <div className="mt-7">
                <SupplyDemandPatternsChart />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    code: "DBR",
                    title: "هبوط ← قاعدة ← صعود",
                    type: "منطقة طلب انعكاسية",
                    text: "كان السعر هابطًا، كوّن قاعدة، ثم انعكس بقوة للأعلى.",
                  },
                  {
                    code: "RBR",
                    title: "صعود ← قاعدة ← صعود",
                    type: "منطقة طلب استمرارية",
                    text: "كان السعر صاعدًا، توقف مؤقتًا داخل قاعدة، ثم واصل الصعود.",
                  },
                  {
                    code: "RBD",
                    title: "صعود ← قاعدة ← هبوط",
                    type: "منطقة عرض انعكاسية",
                    text: "كان السعر صاعدًا، كوّن قاعدة، ثم انعكس بقوة للأسفل.",
                  },
                  {
                    code: "DBD",
                    title: "هبوط ← قاعدة ← هبوط",
                    type: "منطقة عرض استمرارية",
                    text: "كان السعر هابطًا، توقف مؤقتًا، ثم استكمل الهبوط.",
                  },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 min-w-11 shrink-0 items-center justify-center rounded-xl bg-white px-2 text-[10px] font-black text-[#1E5BB8] shadow-sm">
                        {item.code}
                      </div>

                      <h3 className="text-[12px] font-black leading-6 text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-3 text-[10px] font-black text-[#2B6FD0]">
                      {item.type}
                    </div>

                    <p className="mt-1.5 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="لا تحفظ الاختصارات بدون فهم الحركة">
                إذا نسيت DBR أو RBD لا توجد مشكلة. اسأل سؤالين فقط:
                ماذا كان يفعل السعر قبل القاعدة؟ وماذا فعل بعدها؟
                إذا خرج للأعلى فأنت تبحث في جانب الطلب، وإذا خرج للأسفل فأنت
                تبحث في جانب العرض.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              06 — HOW TO DRAW
          ================================================= */}

          <section
            id="how-to-draw-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>06 — رسم المناطق</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيفية رسم مناطق العرض والطلب على الشارت
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                هذه من أهم مراحل الاستراتيجية. المنطقة تحتاج
                <strong> حدًا قريبًا Proximal</strong> وحدًا
                <strong> بعيدًا Distal</strong>. الحدود الدقيقة قد تختلف قليلًا
                بين مدارس العرض والطلب، لذلك الأهم هو أن تختار قاعدة رسم واضحة
                وتلتزم بها في الاختبار بدل تغييرها بعد معرفة النتيجة.
              </p>

              <div className="mt-7">
                <DrawSupplyDemandZoneChart />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "حدد المغادرة",
                    text: "ابحث عن الحركة القوية أولًا؛ بدون Departure واضح لا تتسرع في اعتماد المنطقة.",
                  },
                  {
                    n: "02",
                    title: "حدد القاعدة",
                    text: "ارجع إلى الشموع الصغيرة أو المتداخلة مباشرة قبل الانطلاق.",
                  },
                  {
                    n: "03",
                    title: "ارسم الحدين",
                    text: "الـProximal هو الحد الأقرب للسعر عند العودة، والـDistal هو الحد الأبعد داخل المنطقة.",
                  },
                  {
                    n: "04",
                    title: "مدد المنطقة",
                    text: "مدد المستطيل يمينًا حتى ترى كيف يتفاعل السعر إذا عاد مستقبلًا.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
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

              <ImportantBox title="لماذا المنطقة وليست خطًا؟">
                السعر لا يتحرك دائمًا من نقطة واحدة مثالية. القاعدة نفسها قد
                تحتوي عدة شموع وأسعار تداول مختلفة، لذلك التعامل معها كنطاق
                يعطي تمثيلًا أكثر واقعية من اختيار رقم واحد ثم توقع أن ينعكس
                السعر منه بدقة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              07 — ZONE QUALITY
          ================================================= */}

          <section
            id="zone-quality"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>07 — جودة المنطقة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تقيّم قوة منطقة العرض أو الطلب؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                ليست كل منطقة متساوية. إذا رسمت كل قاعدة سبقت أي حركة ستملأ
                الرسم بالمستطيلات. لذلك يحتاج المتداول إلى
                <strong> فلترة المناطق</strong> قبل التفكير في الصفقة.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "قوة المغادرة",
                    text: "هل غادر السعر المنطقة بسرعة وبشموع واضحة، أم تحرك ببطء وتداخل؟",
                  },
                  {
                    n: "02",
                    title: "قاعدة نظيفة",
                    text: "القاعدة القصيرة والواضحة أسهل في التقييم من نطاق طويل وفوضوي.",
                  },
                  {
                    n: "03",
                    title: "حداثة المنطقة",
                    text: "هل هذه أول عودة للسعر أم تمت إعادة اختبار المنطقة عدة مرات؟",
                  },
                  {
                    n: "04",
                    title: "تأثير الحركة",
                    text: "هل الحركة الناتجة كسرت قمة أو قاعًا مهمًا أو غيرت بنية واضحة؟",
                  },
                  {
                    n: "05",
                    title: "موقع المنطقة",
                    text: "منطقة جيدة فنيًا قد تكون أقل جاذبية إذا كانت عكس سياق أعلى أو أمام منطقة معاكسة قريبة.",
                  },
                  {
                    n: "06",
                    title: "المخاطرة المتاحة",
                    text: "إذا كانت المنطقة واسعة جدًا أو الهدف قريبًا، قد تكون الصفقة غير مناسبة حتى لو كانت المنطقة جيدة.",
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

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="text-[10px] font-black tracking-[0.15em] text-blue-300">
                  QUICK ZONE FILTER
                </div>

                <div
                  dir="ltr"
                  className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-black sm:text-xs"
                >
                  {[
                    "CLEAN BASE",
                    "+",
                    "STRONG DEPARTURE",
                    "+",
                    "FRESHNESS",
                    "+",
                    "STRUCTURE",
                    "+",
                    "GOOD RISK",
                  ].map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className={
                        item === "+"
                          ? "text-blue-300"
                          : "rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <ImportantBox title="لا يوجد عامل واحد يجعل المنطقة مضمونة">
                منطقة Fresh لا تعني أنها ستنجح، وحركة مغادرة قوية لا تعني
                أن السعر سيحترم المصدر عند العودة. الهدف من هذه العوامل هو
                بناء فلتر أكثر اتساقًا، وليس تحويل الاحتمال إلى يقين.
              </ImportantBox>
            </div>
          </section>
                    {/* =================================================
              08 — FRESH VS TESTED ZONES
          ================================================= */}

          <section
            id="fresh-vs-tested-zones"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>08 — Fresh vs Tested</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                ما الفرق بين المنطقة الجديدة Fresh والمنطقة المختبرة؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  بعد أن تتعلم تحديد منطقة العرض أو الطلب، يأتي سؤال مهم:
                  هل عاد السعر إلى هذه المنطقة من قبل أم لا؟ المنطقة التي
                  <strong> لم يعد السعر إليها منذ تكوينها</strong> تسمى عادة
                  <strong> Fresh Zone</strong>، بينما المنطقة التي عاد السعر
                  إليها وتفاعل معها مرة أو أكثر أصبحت منطقة مختبرة
                  <strong> Tested Zone</strong>.
                </p>

                <p>
                  كثير من متداولي العرض والطلب يعطون أفضلية للمنطقة الجديدة،
                  لأن أول عودة للسعر توفر حالة مختلفة عن منطقة تم اختبارها
                  مرارًا. لكن هذا لا يعني أن أول اختبار سينجح، ولا أن المنطقة
                  تصبح عديمة القيمة مباشرة بعد أول لمسة.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "Fresh Zone",
                    text: "السعر غادر المنطقة ولم يعد إليها بعد. هذه أول إعادة اختبار محتملة للمنطقة.",
                  },
                  {
                    n: "02",
                    title: "First Retest",
                    text: "السعر يعود للمرة الأولى. نراقب طريقة الوصول والتفاعل بدل افتراض الارتداد مسبقًا.",
                  },
                  {
                    n: "03",
                    title: "Multiple Tests",
                    text: "بعد اختبارات متعددة يجب الحذر أكثر؛ المنطقة أصبحت مستهلكة سعريًا وقد يتغير سلوكها.",
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

              <ImportantBox title="الحداثة عامل فلترة وليست إشارة دخول">
                لا تدخل الصفقة فقط لأن المنطقة Fresh. افحص أيضًا قوة
                المغادرة، طريقة عودة السعر، الاتجاه، هيكل السوق، المنطقة
                المقابلة والمسافة المتاحة للهدف.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              09 — MULTI TIMEFRAME
          ================================================= */}

          <section
            id="supply-demand-timeframes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>09 — الأطر الزمنية</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تستخدم مناطق العرض والطلب على أكثر من إطار زمني؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                من أكثر الطرق العملية استخدام إطار زمني أعلى لفهم الصورة
                العامة وتحديد المناطق المهمة، ثم الانتقال إلى إطار أصغر
                لدراسة وصول السعر إلى المنطقة والبحث عن دخول أدق. تسمى هذه
                العملية <strong>Multi-Timeframe Analysis</strong>.
              </p>

              <div
                dir="ltr"
                className="mt-7 grid gap-3 md:grid-cols-3"
              >
                {[
                  {
                    n: "01",
                    title: "Higher Timeframe",
                    ar: "حدد السياق",
                    text: "حدد الاتجاه العام ومناطق العرض والطلب الرئيسية على الإطار الأكبر.",
                  },
                  {
                    n: "02",
                    title: "Trading Timeframe",
                    ar: "راقب العودة",
                    text: "انتظر وصول السعر إلى المنطقة التي حددتها مسبقًا.",
                  },
                  {
                    n: "03",
                    title: "Lower Timeframe",
                    ar: "ابحث عن التأكيد",
                    text: "يمكن استخدام إطار أصغر لمراقبة التفاعل وتحديد الإبطال والدخول بشكل أدق.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    dir="rtl"
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#1E5BB8]">
                        {item.n}
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-slate-900">
                          {item.ar}
                        </h3>

                        <div
                          dir="ltr"
                          className="mt-0.5 text-left text-[9px] font-black tracking-wide text-[#2B6FD0]"
                        >
                          {item.title}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-slate-950 p-5 sm:p-6">
                <div
                  dir="ltr"
                  className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-black text-white sm:text-xs"
                >
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    HIGHER TF
                  </span>

                  <span className="text-blue-300">→</span>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    KEY ZONE
                  </span>

                  <span className="text-blue-300">→</span>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    RETEST
                  </span>

                  <span className="text-blue-300">→</span>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    LOWER TF
                  </span>

                  <span className="text-blue-300">→</span>

                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    ENTRY
                  </span>
                </div>
              </div>

              <ImportantBox title="مثال بسيط للمبتدئ">
                يمكن مثلًا دراسة السياق والمناطق الرئيسية على 4 ساعات، ثم
                مراقبة المنطقة على ساعة، واستخدام 15 دقيقة لدراسة التفاعل.
                هذه مجرد بنية تعليمية وليست قاعدة ثابتة؛ المهم ألا تختار
                الأطر الزمنية بعد رؤية النتيجة.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              10 — SUPPLY DEMAND VS SUPPORT RESISTANCE
          ================================================= */}

          <section
            id="supply-demand-vs-support-resistance"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>10 — مقارنة مهمة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                الفرق بين العرض والطلب والدعم والمقاومة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                يوجد تشابه كبير لأن الأسلوبين يبحثان عن أماكن يمكن أن يتفاعل
                عندها السعر. لكن طريقة قراءة الرسم ليست متطابقة. في
                <strong> الدعم والمقاومة</strong> يركز المتداول عادة على
                مستويات أو مناطق سبق أن ارتد السعر منها، بينما في
                <strong> العرض والطلب</strong> يكون التركيز الأكبر على
                <strong> مصدر حركة سعرية قوية</strong>.
              </p>

              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-3 bg-slate-950 text-white">
                  <div className="p-3 text-center text-[10px] font-black sm:p-4 sm:text-xs">
                    المقارنة
                  </div>

                  <div className="border-r border-white/10 p-3 text-center text-[10px] font-black sm:p-4 sm:text-xs">
                    العرض والطلب
                  </div>

                  <div className="border-r border-white/10 p-3 text-center text-[10px] font-black sm:p-4 sm:text-xs">
                    الدعم والمقاومة
                  </div>
                </div>

                {[
                  ["الشكل", "منطقة / نطاق", "مستوى أو منطقة"],
                  ["التركيز", "مصدر الحركة القوية", "تفاعل السعر السابق"],
                  ["القاعدة", "جزء أساسي من التحليل", "ليست شرطًا"],
                  ["المغادرة", "عامل مهم في التقييم", "قد لا تكون مطلوبة"],
                  ["إعادة الاختبار", "تستخدم كثيرًا", "تستخدم كثيرًا"],
                  ["التداخل", "ممكن جدًا", "ممكن جدًا"],
                ].map((row, index) => (
                  <div
                    key={row[0]}
                    className={`grid grid-cols-3 ${
                      index !== 5 ? "border-b border-slate-200" : ""
                    }`}
                  >
                    <div className="bg-slate-50 p-3 text-center text-[10px] font-black text-slate-700 sm:p-4 sm:text-xs">
                      {row[0]}
                    </div>

                    <div className="border-r border-slate-200 p-3 text-center text-[10px] font-medium leading-5 text-slate-600 sm:p-4 sm:text-xs">
                      {row[1]}
                    </div>

                    <div className="border-r border-slate-200 p-3 text-center text-[10px] font-medium leading-5 text-slate-600 sm:p-4 sm:text-xs">
                      {row[2]}
                    </div>
                  </div>
                ))}
              </div>

              <ImportantBox title="يمكن أن تكون المنطقة الاثنين معًا">
                منطقة طلب قوية قد تتوافق أيضًا مع دعم واضح، ومنطقة عرض قد
                تتوافق مع مقاومة. لا توجد ضرورة لإجبار الرسم على تصنيف واحد؛
                الأهم أن تعرف لماذا حددت المنطقة وما الذي سيبطل فكرتك.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              11 — ENTRY METHODS
          ================================================= */}

          <section
            id="supply-demand-entry"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>11 — الدخول</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تدخل صفقة من منطقة العرض أو الطلب؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                تحديد المنطقة لا يساوي الدخول. بعد عودة السعر توجد طرق
                مختلفة لتنفيذ الصفقة. الاختيار بينها يؤثر على
                <strong> سعر الدخول، حجم وقف الخسارة واحتمال تفويت الصفقة</strong>.
              </p>

              <div className="mt-7 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "الدخول المباشر",
                    en: "Limit Entry",
                    text: "يضع المتداول أمرًا داخل المنطقة دون انتظار تأكيد إضافي. قد يوفر سعرًا أفضل لكنه يقبل مخاطرة دخول أعلى إذا اخترق السعر المنطقة مباشرة.",
                  },
                  {
                    n: "02",
                    title: "انتظار التفاعل",
                    en: "Reaction Entry",
                    text: "ينتظر المتداول ظهور رفض أو تغير واضح في سلوك السعر داخل المنطقة قبل التنفيذ.",
                  },
                  {
                    n: "03",
                    title: "دخول بعد التأكيد",
                    en: "Confirmation Entry",
                    text: "ينتظر تغيرًا أو كسرًا في الهيكل على إطار أصغر ثم يبحث عن الدخول. التأكيد قد يقلل الصفقات لكنه قد يجعل سعر الدخول أبعد.",
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

                    <div
                      dir="ltr"
                      className="mt-3 text-left text-[9px] font-black tracking-[0.12em] text-[#2B6FD0]"
                    >
                      {item.en}
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="لا توجد طريقة دخول أفضل في كل الحالات">
                الدخول المباشر ليس «أفضل» من التأكيد، والتأكيد ليس أكثر أمانًا
                بشكل مطلق. يجب أن تختبر قواعد محددة على بيانات سابقة وتقارن
                نسبة النجاح ومتوسط العائد إلى المخاطرة وعدد الفرص.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              12 — STOP LOSS & TARGET
          ================================================= */}

          <section
            id="supply-demand-stop-loss"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>12 — وقف الخسارة والهدف</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                أين تضع وقف الخسارة والهدف؟
              </h2>

              <div className="mt-4 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  يجب أن تعرف <strong>متى تصبح فكرتك خاطئة</strong> قبل
                  الدخول. في صفقة شراء من منطقة طلب، يستخدم بعض المتداولين
                  الحد البعيد للمنطقة Distal كمرجع للإبطال. وفي صفقة بيع من
                  منطقة عرض يكون المنطق معكوسًا.
                </p>

                <p>
                  لكن وضع الوقف مباشرة خلف المستطيل ليس قاعدة سحرية. يجب
                  مراعاة طبيعة الأصل، التقلب، السبريد، طريقة رسم المنطقة
                  وقواعد الاستراتيجية التي اختبرتها.
                </p>
              </div>

              <div className="mt-7 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-[#1E5BB8]">
                    DEMAND ZONE • BUY IDEA
                  </div>

                  <h3 className="mt-2 text-lg font-black text-slate-900">
                    صفقة شراء
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      ["الدخول", "داخل منطقة الطلب وفق قاعدة الدخول"],
                      ["الإبطال", "أسفل الحد الذي يبطل فكرة المنطقة"],
                      ["الهدف الأول", "قمة أو بنية سعرية مناسبة"],
                      ["هدف بديل", "منطقة العرض المقابلة إذا كانت المسافة منطقية"],
                    ].map(([title, text]) => (
                      <div
                        key={title}
                        className="flex items-start gap-3 rounded-xl bg-white p-3"
                      >
                        <span className="mt-0.5 shrink-0 text-[10px] font-black text-[#2B6FD0]">
                          {title}
                        </span>

                        <span className="text-[11px] font-medium leading-6 text-slate-600">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="text-[10px] font-black text-slate-500">
                    SUPPLY ZONE • SELL IDEA
                  </div>

                  <h3 className="mt-2 text-lg font-black text-slate-900">
                    صفقة بيع
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      ["الدخول", "داخل منطقة العرض وفق قاعدة الدخول"],
                      ["الإبطال", "فوق الحد الذي يبطل فكرة المنطقة"],
                      ["الهدف الأول", "قاع أو بنية سعرية مناسبة"],
                      ["هدف بديل", "منطقة الطلب المقابلة إذا كانت المسافة منطقية"],
                    ].map(([title, text]) => (
                      <div
                        key={title}
                        className="flex items-start gap-3 rounded-xl bg-white p-3"
                      >
                        <span className="mt-0.5 shrink-0 text-[10px] font-black text-slate-600">
                          {title}
                        </span>

                        <span className="text-[11px] font-medium leading-6 text-slate-600">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="text-base font-black text-slate-900">
                  احسب العائد إلى المخاطرة قبل الدخول
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                  لا يكفي أن تبدو المنطقة قوية. إذا كان وقف الخسارة بعيدًا
                  والهدف المنطقي قريبًا، فقد لا تكون الصفقة جذابة حتى لو
                  ارتد السعر فعلًا.
                </p>

                <div
                  dir="ltr"
                  className="mt-5 flex flex-wrap items-center justify-center gap-2"
                >
                  <span className="rounded-lg bg-slate-100 px-4 py-2 text-[11px] font-black text-slate-700">
                    RISK = 1R
                  </span>

                  <span className="font-black text-slate-400">→</span>

                  <span className="rounded-lg bg-blue-50 px-4 py-2 text-[11px] font-black text-[#1E5BB8]">
                    TARGET = 2R
                  </span>

                  <span className="font-black text-slate-400">→</span>

                  <span className="rounded-lg bg-slate-950 px-4 py-2 text-[11px] font-black text-white">
                    R:R = 1:2
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              13 — COMPLETE BUY EXAMPLE
          ================================================= */}

          <section
            id="supply-demand-buy-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>13 — مثال شراء كامل</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                مثال عملي: صفقة شراء من منطقة طلب خطوة بخطوة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                المثال التالي تعليمي. الهدف ليس إعطاء إشارة تداول، بل ربط
                جميع المفاهيم السابقة في سيناريو واحد يستطيع المبتدئ قراءته
                من اليسار إلى اليمين.
              </p>

              <div className="mt-7">
                <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block">
                  <svg
                    viewBox="0 0 1100 540"
                    className="block h-auto w-full"
                    role="img"
                    aria-label="مثال كامل لصفقة شراء من منطقة طلب يوضح القاعدة والمغادرة وإعادة الاختبار والدخول ووقف الخسارة والهدف"
                  >
                    <defs>
                      <pattern
                        id="buyExampleGrid"
                        width="55"
                        height="54"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M55 0 L0 0 0 54"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    <rect width="1100" height="540" fill="#ffffff" />
                    <rect width="1100" height="540" fill="url(#buyExampleGrid)" />

                    <rect
                      x="180"
                      y="355"
                      width="610"
                      height="82"
                      rx="12"
                      fill="#eff6ff"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      strokeDasharray="7 6"
                    />

                    <text
                      x="250"
                      y="386"
                      fontSize="12"
                      fontWeight="900"
                      fill="#1E5BB8"
                    >
                      DEMAND ZONE
                    </text>

                    <text
                      x="250"
                      y="408"
                      fontSize="10"
                      fontWeight="700"
                      fill="#64748b"
                    >
                      منطقة الطلب
                    </text>

                    <path
                      d="M65 215
                         L120 255
                         L175 310
                         L230 382
                         L280 400
                         L325 384
                         L370 395
                         L415 340
                         L465 270
                         L520 205
                         L575 150
                         L630 112
                         L690 140
                         L745 190
                         L790 250
                         L825 310
                         L850 368
                         L875 392
                         L905 365
                         L940 310
                         L975 245
                         L1025 170"
                      fill="none"
                      stroke="#1E5BB8"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="370"
                      cy="395"
                      r="9"
                      fill="#ffffff"
                      stroke="#2563eb"
                      strokeWidth="4"
                    />

                    <circle
                      cx="875"
                      cy="392"
                      r="9"
                      fill="#ffffff"
                      stroke="#2563eb"
                      strokeWidth="4"
                    />

                    <line
                      x1="820"
                      y1="448"
                      x2="930"
                      y2="448"
                      stroke="#475569"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <text
                      x="875"
                      y="472"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="900"
                      fill="#475569"
                    >
                      STOP / INVALIDATION
                    </text>

                    <line
                      x1="850"
                      y1="175"
                      x2="1040"
                      y2="175"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />

                    <text
                      x="945"
                      y="160"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="900"
                      fill="#1E5BB8"
                    >
                      TARGET AREA
                    </text>

                    <rect
                      x="280"
                      y="300"
                      width="135"
                      height="31"
                      rx="15.5"
                      fill="#2563eb"
                    />

                    <text
                      x="347"
                      y="320"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      STRONG RALLY
                    </text>

                    <rect
                      x="806"
                      y="320"
                      width="137"
                      height="31"
                      rx="15.5"
                      fill="#0f172a"
                    />

                    <text
                      x="874"
                      y="340"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="900"
                      fill="#ffffff"
                    >
                      FIRST RETEST
                    </text>

                    <rect
                      x="820"
                      y="78"
                      width="215"
                      height="58"
                      rx="13"
                      fill="#ffffff"
                      stroke="#cbd5e1"
                    />

                    <text
                      x="927"
                      y="101"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="900"
                      fill="#0f172a"
                    >
                      ENTRY AFTER REACTION
                    </text>

                    <text
                      x="927"
                      y="121"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      fill="#64748b"
                    >
                      دخول بعد ظهور التفاعل
                    </text>
                  </svg>
                </div>

                <div className="sd-centered-scroll overflow-x-auto rounded-[22px] border border-slate-200 bg-white lg:hidden">
                  <div className="min-w-[900px]">
                    <svg
                      viewBox="0 0 1100 540"
                      className="block h-auto w-full"
                      role="img"
                      aria-label="مثال صفقة شراء من منطقة طلب"
                    >
                      <defs>
                        <pattern
                          id="buyMobileGrid"
                          width="55"
                          height="54"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M55 0 L0 0 0 54"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>

                      <rect width="1100" height="540" fill="#ffffff" />
                      <rect width="1100" height="540" fill="url(#buyMobileGrid)" />

                      <rect
                        x="180"
                        y="355"
                        width="610"
                        height="82"
                        rx="12"
                        fill="#eff6ff"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        strokeDasharray="7 6"
                      />

                      <text
                        x="250"
                        y="390"
                        fontSize="12"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        DEMAND ZONE
                      </text>

                      <path
                        d="M65 215
                           L120 255
                           L175 310
                           L230 382
                           L280 400
                           L325 384
                           L370 395
                           L415 340
                           L465 270
                           L520 205
                           L575 150
                           L630 112
                           L690 140
                           L745 190
                           L790 250
                           L825 310
                           L850 368
                           L875 392
                           L905 365
                           L940 310
                           L975 245
                           L1025 170"
                        fill="none"
                        stroke="#1E5BB8"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <circle
                        cx="875"
                        cy="392"
                        r="9"
                        fill="#ffffff"
                        stroke="#2563eb"
                        strokeWidth="4"
                      />

                      <rect
                        x="800"
                        y="300"
                        width="150"
                        height="32"
                        rx="16"
                        fill="#0f172a"
                      />

                      <text
                        x="875"
                        y="321"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#ffffff"
                      >
                        FIRST RETEST
                      </text>

                      <line
                        x1="815"
                        y1="448"
                        x2="935"
                        y2="448"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />

                      <text
                        x="875"
                        y="472"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#475569"
                      >
                        INVALIDATION
                      </text>

                      <line
                        x1="850"
                        y1="175"
                        x2="1040"
                        y2="175"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                      />

                      <text
                        x="945"
                        y="158"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fill="#1E5BB8"
                      >
                        TARGET AREA
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-slate-500 lg:hidden">
                  <span>↔</span>
                  <span>
                    حرّك الرسم يمينًا ويسارًا لمتابعة الصفقة كاملة
                  </span>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "حدد الطلب",
                    text: "قاعدة تبعها صعود واضح.",
                  },
                  {
                    n: "02",
                    title: "قيّم المنطقة",
                    text: "المغادرة والسياق والحداثة مناسبة.",
                  },
                  {
                    n: "03",
                    title: "انتظر العودة",
                    text: "لا تطارد السعر بعد المغادرة.",
                  },
                  {
                    n: "04",
                    title: "حدد الإبطال",
                    text: "اعرف أين تصبح فكرة الشراء خاطئة.",
                  },
                  {
                    n: "05",
                    title: "حدد الهدف",
                    text: "استخدم بنية أو منطقة عرض منطقية.",
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

                      <h3 className="text-[12px] font-black text-slate-900">
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
              14 — COMPLETE SELL EXAMPLE
          ================================================= */}

          <section
            id="supply-demand-sell-example"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>14 — مثال بيع كامل</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                مثال عملي: صفقة بيع من منطقة عرض خطوة بخطوة
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                في سيناريو البيع نعكس المنطق السابق. نبحث عن قاعدة غادرها
                السعر بهبوط قوي، ثم نراقب العودة إلى منطقة العرض. إذا تحققت
                شروط الاستراتيجية، يكون الإبطال أعلى المنطقة والهدف في بنية
                أدنى أو منطقة طلب مناسبة.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "حدد العرض",
                    text: "ابحث عن قاعدة سبقت هبوطًا واضحًا.",
                  },
                  {
                    n: "02",
                    title: "افحص المغادرة",
                    text: "كلما كانت الحركة أوضح كان المصدر أسهل في التقييم.",
                  },
                  {
                    n: "03",
                    title: "انتظر العودة",
                    text: "دع السعر يعود إلى المنطقة بدل مطاردة الهبوط.",
                  },
                  {
                    n: "04",
                    title: "حدد الإبطال",
                    text: "ضع قاعدة واضحة لما يبطل فكرة البيع.",
                  },
                  {
                    n: "05",
                    title: "حدد الهدف",
                    text: "راقب القيعان أو منطقة الطلب التالية.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[9px] font-black text-slate-600">
                        {item.n}
                      </div>

                      <h3 className="text-[12px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="الشراء والبيع نفس العملية ولكن بالعكس">
                إذا فهمت منطق الطلب، لا تحتاج حفظ استراتيجية جديدة للبيع.
                الطلب يبحث عن قاعدة غادرها السعر للأعلى، والعرض يبحث عن قاعدة
                غادرها السعر للأسفل. بعد ذلك تطبق نفس خطوات الجودة والعودة
                والإبطال وإدارة المخاطر.
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
              <SectionLabel>15 — إدارة المخاطر</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                إدارة المخاطر عند تداول مناطق العرض والطلب
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                حتى المنطقة التي تحقق جميع شروطك يمكن أن تفشل. لذلك لا تعتمد
                الاستراتيجية على توقع المنطقة الصحيحة فقط؛ بل على
                <strong> التحكم في مقدار الخسارة عندما تكون القراءة خاطئة</strong>.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "حدد المخاطرة مسبقًا",
                    text: "اختر نسبة أو مبلغًا ثابتًا وفق خطة إدارة رأس المال قبل تنفيذ الصفقة.",
                  },
                  {
                    n: "02",
                    title: "احسب حجم الصفقة",
                    text: "حجم المركز يجب أن يتغير وفق المسافة بين الدخول ووقف الخسارة.",
                  },
                  {
                    n: "03",
                    title: "لا توسع الوقف",
                    text: "إذا وصل السعر إلى نقطة الإبطال، لا تغير القاعدة فقط لتجنب تسجيل الخسارة.",
                  },
                  {
                    n: "04",
                    title: "راقب المخاطرة الكلية",
                    text: "عدة صفقات مترابطة قد تعني تعرضًا أكبر مما يبدو من كل صفقة منفردة.",
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

              <div className="mt-7 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
                <h3 className="text-base font-black text-slate-900">
                  مثال على التفكير بالمخاطرة
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600">
                  إذا كانت منطقة واسعة، فهذا لا يعني أن تخاطر بمبلغ أكبر.
                  يمكنك تقليل حجم الصفقة بحيث تبقى الخسارة المحتملة عند
                  مستوى المخاطرة الذي حددته مسبقًا.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              16 — COMMON MISTAKES
          ================================================= */}

          <section
            id="supply-demand-mistakes"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>16 — أخطاء شائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                أخطاء المبتدئين في استراتيجية العرض والطلب
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "رسم منطقة عند كل قمة وقاع",
                    text: "ليس كل انعكاس منطقة عرض أو طلب جيدة. ابحث عن قاعدة ومغادرة واضحة.",
                  },
                  {
                    n: "02",
                    title: "رسم خط بدل منطقة",
                    text: "القاعدة تحتوي نطاقًا سعريًا؛ تحويلها إلى سعر واحد قد يعطي دقة وهمية.",
                  },
                  {
                    n: "03",
                    title: "تجاهل قوة المغادرة",
                    text: "إذا خرج السعر ببطء شديد وتداخل مستمر، فقد لا تكون المنطقة مميزة أصلًا.",
                  },
                  {
                    n: "04",
                    title: "الدخول عند كل لمسة",
                    text: "الوصول للمنطقة ليس ضمانًا للارتداد. يجب أن تتوافق الصفقة مع قواعدك.",
                  },
                  {
                    n: "05",
                    title: "تجاهل المنطقة المقابلة",
                    text: "شراء الطلب مباشرة أسفل عرض قريب قد يترك مساحة صغيرة جدًا للهدف.",
                  },
                  {
                    n: "06",
                    title: "تغيير الرسم بعد النتيجة",
                    text: "لا تحرك حدود المنطقة بعد فشل الصفقة لتجعل التحليل السابق يبدو صحيحًا.",
                  },
                  {
                    n: "07",
                    title: "الإفراط في استخدام المناطق القديمة",
                    text: "المنطقة التي تم اختبارها مرارًا تحتاج تقييمًا مختلفًا عن منطقة لم تُختبر.",
                  },
                  {
                    n: "08",
                    title: "نسيان الإطار الأعلى",
                    text: "منطقة صغيرة قد تبدو ممتازة لكنها تقع ضد سياق أو منطقة أكبر أكثر أهمية.",
                  },
                  {
                    n: "09",
                    title: "المخاطرة الكبيرة",
                    text: "حتى أفضل إعداد بصري يمكن أن يفشل، لذلك لا تجعل صفقة واحدة تحدد نتيجة الحساب.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[9px] font-black text-slate-600">
                        {item.n}
                      </div>

                      <h3 className="text-[12px] font-black leading-6 text-slate-900">
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
              17 — BACKTESTING
          ================================================= */}

          <section
            id="supply-demand-backtesting"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>17 — الاختبار</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تختبر استراتيجية العرض والطلب قبل التداول؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                المشكلة في الاختبار البصري العشوائي أنك تعرف ما حدث لاحقًا.
                لذلك حاول تحويل الاستراتيجية إلى
                <strong> قواعد قابلة للتسجيل والمقارنة</strong> بدل اختيار
                المناطق الناجحة فقط بعد انتهاء الحركة.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    n: "01",
                    title: "حدد السوق",
                    text: "اختر الأصل والإطار الزمني قبل الاختبار.",
                  },
                  {
                    n: "02",
                    title: "ثبت القواعد",
                    text: "عرّف القاعدة والمغادرة والحداثة والدخول بوضوح.",
                  },
                  {
                    n: "03",
                    title: "اخفِ المستقبل",
                    text: "استخدم Replay إن أمكن لتجنب معرفة النتيجة.",
                  },
                  {
                    n: "04",
                    title: "سجل النتائج",
                    text: "سجل الربح والخسارة وR ونوع المنطقة والسياق.",
                  },
                  {
                    n: "05",
                    title: "حلل العينة",
                    text: "ابحث عن الأداء عبر عدد كافٍ من الحالات لا مثالين أو ثلاثة.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-[#1E5BB8] shadow-sm">
                        {item.n}
                      </div>

                      <h3 className="text-[12px] font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <ImportantBox title="ما الذي يستحق التسجيل؟">
                سجل نوع المنطقة DBR/RBR/RBD/DBD، هل كانت Fresh، عدد شموع
                القاعدة، قوة المغادرة، اتجاه الإطار الأعلى، طريقة الدخول،
                حجم الوقف، الهدف والنتيجة بوحدة R. بهذه الطريقة تستطيع لاحقًا
                معرفة أي الشروط تساعد فعلًا وأيها مجرد انطباع بصري.
              </ImportantBox>
            </div>
          </section>

          {/* =================================================
              18 — BEGINNER ROADMAP
          ================================================= */}

          <section
            id="supply-demand-beginner-roadmap"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>18 — خطة للمبتدئ</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تتعلم العرض والطلب من الصفر بالترتيب؟
              </h2>

              <p className="mt-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                إذا كنت مبتدئًا تمامًا، لا تبدأ بمحاولة دمج عشرات التأكيدات.
                تعلم المفاهيم بترتيب واضح، ثم أضف التعقيد فقط عندما تستطيع
                تحديد المنطقة بنفس القواعد بشكل متكرر.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    n: "01",
                    title: "افهم العرض والطلب",
                    text: "تعلم الفرق بين منطقة العرض ومنطقة الطلب ولماذا نتعامل معهما كنطاق.",
                  },
                  {
                    n: "02",
                    title: "تعلم القاعدة والمغادرة",
                    text: "تدرب على إيجاد Base ثم Strong Departure بدون التفكير بالدخول.",
                  },
                  {
                    n: "03",
                    title: "تعلم الأنماط الأربعة",
                    text: "ميز بصريًا بين DBR وRBR وRBD وDBD.",
                  },
                  {
                    n: "04",
                    title: "تعلم رسم الحدود",
                    text: "ثبت طريقة رسم Proximal وDistal واستخدمها في جميع أمثلتك.",
                  },
                  {
                    n: "05",
                    title: "أضف فلتر الجودة",
                    text: "ابدأ بدراسة الحداثة وقوة المغادرة والسياق وعدد الاختبارات.",
                  },
                  {
                    n: "06",
                    title: "اختبر استراتيجية كاملة",
                    text: "حدد الدخول والإبطال والهدف والمخاطرة ثم ابدأ Backtesting منظمًا.",
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
            </div>
          </section>

          {/* =================================================
              19 — CHECKLIST
          ================================================= */}

          <section
            id="supply-demand-checklist"
            className="scroll-mt-24 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-sm"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>19 — Checklist</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-white sm:text-[29px]">
                قائمة فحص منطقة العرض أو الطلب قبل الصفقة
              </h2>

              <p className="mt-4 max-w-[1000px] text-[13px] font-medium leading-8 text-slate-300 sm:text-[15px] sm:leading-9">
                قبل تنفيذ أي صفقة، مر على هذه الأسئلة. إذا لم تستطع الإجابة
                بوضوح، فهذا يعني غالبًا أن قواعد الاستراتيجية لم تكتمل بعد.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "هل توجد قاعدة واضحة؟",
                  "هل كانت المغادرة قوية؟",
                  "هل المنطقة Fresh أم مختبرة؟",
                  "كم مرة عاد السعر إليها؟",
                  "هل تتوافق مع السياق الأعلى؟",
                  "أين المنطقة المقابلة؟",
                  "أين نقطة الإبطال؟",
                  "هل العائد إلى المخاطرة مناسب؟",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-[9px] font-black text-blue-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-[11px] font-bold leading-6 text-slate-200">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
              <SectionLabel>20 — الأسئلة الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                أسئلة شائعة عن استراتيجية العرض والطلب
              </h2>

              <div className="mt-7 space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-[12px] font-black leading-6 text-slate-900 sm:text-sm">
                          {item.question}
                        </h3>
                      </div>

                      <span className="shrink-0 text-lg font-black text-slate-400 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-100 px-4 py-4 sm:px-5">
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
              SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white shadow-sm">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>الخلاصة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.55] text-slate-950 sm:text-[29px]">
                كيف تفكر في العرض والطلب بعد قراءة هذا الدليل؟
              </h2>

              <div className="mt-5 space-y-4 text-[13px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                <p>
                  لا تبدأ بسؤال: «أين أرسم المستطيل؟». ابدأ بسؤال:
                  <strong> أين تحرك السعر بقوة، ومن أين بدأت هذه الحركة؟</strong>
                  ثم ارجع إلى القاعدة وحدد المنطقة وقيّم جودتها.
                </p>

                <p>
                  بعد ذلك افصل بين
                  <strong> تحديد المنطقة</strong> و
                  <strong> تنفيذ الصفقة</strong>. وجود منطقة جيدة لا يعني
                  الدخول تلقائيًا. تحتاج إلى قواعد للعودة، الدخول، الإبطال،
                  الهدف وحجم المخاطرة.
                </p>

                <p>
                  والأهم أن تتعامل مع مناطق العرض والطلب كإطار تحليلي
                  احتمالي. لا توجد منطقة لا يمكن كسرها، ولا يوجد رسم يستطيع
                  وحده إثبات من اشترى أو باع داخلها. قوة الاستراتيجية تأتي
                  من وضوح قواعدها وقدرتك على اختبارها وتطبيقها باستمرار.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["01", "الحركة", "ابحث عن Departure واضح"],
                  ["02", "المنطقة", "حدد Base وحدودها"],
                  ["03", "السياق", "قيّم الجودة والعودة"],
                  ["04", "الصفقة", "حدد الإبطال والمخاطرة"],
                ].map(([n, title, text]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-black text-[#1E5BB8]">
                        {n}
                      </div>

                      <h3 className="text-sm font-black text-slate-900">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {text}
                    </p>
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
              <SectionLabel>أدلة مرتبطة</SectionLabel>

              <h2 className="text-[22px] font-black text-slate-950 sm:text-[27px]">
                أكمل تعلم التحليل الفني
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    href: "/strategies/price-action",
                    title: "استراتيجية حركة السعر",
                    text: "تعلم قراءة حركة السعر والشموع وهيكل السوق بدون الاعتماد الكامل على المؤشرات.",
                  },
                  {
                    href: "/strategies/smart-money-concepts",
                    title: "استراتيجية الأموال الذكية SMC",
                    text: "تعرف على هيكل السوق والسيولة وBOS وCHoCH وOrder Blocks وFVG.",
                  },
                  {
                    href: "/strategies/trend-following",
                    title: "استراتيجية تتبع الاتجاه",
                    text: "تعلم كيفية تحديد الاتجاه والتعامل مع التصحيحات والاستمرار.",
                  },
                  {
                    href: "/strategies/swing-trading",
                    title: "استراتيجية السوينغ",
                    text: "تعرف على التداول متوسط المدى وإدارة الصفقة عبر الحركات الأكبر.",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition hover:border-blue-200 hover:bg-blue-50/40 sm:p-5"
                  >
                    <h3 className="text-sm font-black text-slate-900 transition group-hover:text-[#1E5BB8]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-medium leading-6 text-slate-600">
                      {item.text}
                    </p>

                    <div className="mt-4 text-[10px] font-black text-[#2B6FD0]">
                      اقرأ الدليل ←
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-[30px] bg-slate-950 text-white shadow-[0_22px_70px_rgba(15,23,42,0.16)]">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <div className="text-[10px] font-black tracking-[0.16em] text-blue-300">
                  BROKER ALARAB
                </div>

                <h2 className="mt-3 text-[24px] font-black leading-[1.5] sm:text-[30px]">
                  تعلّم الاستراتيجية أولًا، ثم اختر أدوات التداول بعناية
                </h2>

                <p className="mt-3 max-w-[850px] text-[12px] font-medium leading-7 text-slate-300 sm:text-[14px] sm:leading-8">
                  يمكنك استخدام أدلة Broker Alarab ومقارنات الوسطاء وأدوات
                  إدارة المخاطر لفهم خياراتك قبل فتح حساب أو تنفيذ صفقة.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <a
                  href="/brokers"
                  className="rounded-xl bg-white px-5 py-3 text-[11px] font-black text-slate-950 transition hover:bg-blue-50"
                >
                  مقارنة الوسطاء
                </a>

                <a
                  href="/tools"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[11px] font-black text-white transition hover:bg-white/10"
                >
                  أدوات التداول
                </a>
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
          CENTER WIDE MOBILE CHARTS ON INITIAL LOAD
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
    </main>
  );
}