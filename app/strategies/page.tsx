import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

/* =========================================================
   SEO
========================================================= */

const PAGE_URL = "https://brokeralarab.com/strategies";

export const metadata: Metadata = {
  title: "استراتيجيات الفوركس: شرح 12 استراتيجية ومقارنة أساليب التداول",
  description:
    "استكشف أفضل استراتيجيات تداول الفوركس، وقارن 12 دليلًا حسب الأسلوب والفريم والخبرة. تعلّم قواعد الدخول ووقف الخسارة وإدارة المخاطر واختبار النتائج.",

  alternates: {
    canonical: PAGE_URL,
    languages: {
      ar: PAGE_URL,
      en: "https://brokeralarab.com/en/strategies",
      "x-default": "https://brokeralarab.com/en/strategies",
    },
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "استراتيجيات الفوركس: شرح 12 استراتيجية ومقارنة أساليب التداول",
    description:
      "قارن أساليب تداول الفوركس، واستكشف أدلة البرايس أكشن والسكالبينغ والسوينغ والمؤشرات وICT وSMC، مع شرح إدارة المخاطر واختبار الاستراتيجية.",
    siteName: "بروكر العرب",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
  },

  twitter: {
    card: "summary_large_image",
    title: "استراتيجيات الفوركس: شرح 12 استراتيجية ومقارنة أساليب التداول",
    description:
      "استكشف 12 دليلًا لاستراتيجيات الفوركس وقارن الأساليب والفريمات ومستوى الخبرة، وتعلّم قواعد التداول وإدارة المخاطر.",
  },
};

/* =========================================================
   TYPES
========================================================= */

type Strategy = {
  number: string;
  title: string;
  english: string;
  href: string;
  description: string;
  level: string;
  style: string;
  timeframe: string;
  focus: string;
  tags: string[];
  featured?: boolean;
};

type FAQ = {
  question: string;
  answer: string;
};

/* =========================================================
   STRATEGIES
========================================================= */

const strategies: Strategy[] = [
  {
    number: "01",
    title: "استراتيجية البرايس أكشن",
    english: "Price Action",
    href: "/strategies/price-action",
    description:
      "تعلم قراءة حركة السعر وهيكل السوق والدعم والمقاومة والاختراق وإعادة الاختبار دون الاعتماد الكامل على المؤشرات.",
    level: "مبتدئ → متوسط",
    style: "حركة السعر",
    timeframe: "متعدد",
    focus: "هيكل السوق",
    tags: ["حركة السعر", "هيكل السوق", "الدعم والمقاومة"],
    featured: true,
  },
  {
    number: "02",
    title: "استراتيجية السكالبينغ",
    english: "Scalping",
    href: "/strategies/scalping",
    description:
      "أسلوب تداول سريع يستهدف حركات سعرية قصيرة ويتطلب متابعة دقيقة للتنفيذ والسبريد وإدارة المخاطر.",
    level: "متوسط → متقدم",
    style: "قصير جدًا",
    timeframe: "1m – 5m",
    focus: "سرعة التنفيذ",
    tags: ["سكالبينغ", "داخل اليوم", "قصير المدى"],
  },
  {
    number: "03",
    title: "استراتيجية السوينغ",
    english: "Swing Trading",
    href: "/strategies/swing-trading",
    description:
      "تداول الحركات السعرية التي قد تمتد عدة أيام أو أسابيع بالاعتماد على الاتجاه والقمم والقيعان والتصحيحات.",
    level: "مبتدئ → متوسط",
    style: "متوسط المدى",
    timeframe: "1H – Daily",
    focus: "القمم والقيعان",
    tags: ["سوينغ", "التصحيح", "الاتجاه"],
    featured: true,
  },
  {
    number: "04",
    title: "استراتيجية تتبع الاتجاه",
    english: "Trend Following",
    href: "/strategies/trend-following",
    description:
      "حدد الاتجاه الصاعد أو الهابط ثم ابحث عن فرص للانضمام إليه عبر التصحيح أو الاختراق بدل محاولة توقع القمم والقيعان.",
    level: "مبتدئ → متوسط",
    style: "مع الاتجاه",
    timeframe: "متعدد",
    focus: "الاتجاه",
    tags: ["الاتجاه", "التصحيح", "الاختراق"],
  },
  {
    number: "05",
    title: "استراتيجية مؤشر RSI",
    english: "RSI Trading",
    href: "/strategies/rsi",
    description:
      "استخدم مؤشر القوة النسبية لفهم الزخم ومستويات 70 و30 و50 والدايفرجنس ضمن سياق حركة السعر.",
    level: "مبتدئ → متوسط",
    style: "مؤشر فني",
    timeframe: "متعدد",
    focus: "الزخم",
    tags: ["RSI", "الدايفرجنس", "الزخم"],
  },
  {
    number: "06",
    title: "استراتيجية ICT",
    english: "ICT Trading",
    href: "/strategies/ict",
    description:
      "إطار تحليلي يربط هيكل السوق والسيولة والفجوات السعرية وكتل الأوامر وتغيرات الهيكل ضمن سيناريو تداول منظم.",
    level: "متوسط → متقدم",
    style: "حركة السعر",
    timeframe: "متعدد",
    focus: "السيولة",
    tags: ["ICT", "السيولة", "FVG"],
    featured: true,
  },
  {
    number: "07",
    title: "مفاهيم الأموال الذكية SMC",
    english: "Smart Money Concepts",
    href: "/strategies/smart-money-concepts",
    description:
      "تعرف على إطار مفاهيم الأموال الذكية وكيف يربط هيكل السوق والسيولة وتغيرات الهيكل ومناطق الاهتمام لفهم حركة السعر.",
    level: "متوسط → متقدم",
    style: "SMC",
    timeframe: "متعدد",
    focus: "هيكل السوق",
    tags: ["SMC", "BOS", "CHoCH"],
  },
  {
    number: "08",
    title: "استراتيجية العرض والطلب",
    english: "Supply & Demand",
    href: "/strategies/supply-and-demand",
    description:
      "تعلم تحديد مناطق العرض والطلب وقراءة قوة مغادرة السعر للمنطقة والعودة إليها والفرق بين المنطقة الجديدة والمختبرة.",
    level: "متوسط",
    style: "مناطق سعرية",
    timeframe: "متعدد",
    focus: "العرض والطلب",
    tags: ["العرض", "الطلب", "المناطق السعرية"],
  },
  {
    number: "09",
    title: "استراتيجية كتل الأوامر",
    english: "Order Blocks",
    href: "/strategies/order-blocks",
    description:
  "تعلّم تحديد كتل الأوامر وربطها بهيكل السوق والسيولة، مع شرح شروط الدخول ووقف الخسارة ومتى تفشل الإشارة.",
    level: "متوسط → متقدم",
    style: "SMC / ICT",
    timeframe: "متعدد",
    focus: "كتل الأوامر",
    tags: ["كتل الأوامر", "الاندفاع", "BOS"],
  },
  {
    number: "10",
    title: "استراتيجية سحب السيولة",
    english: "Liquidity Sweep",
    href: "/strategies/liquidity-sweep",
    description:
      "تعلم أين تتجمع السيولة حول القمم والقيعان وكيف تفرق بين سحب السيولة والاختراق الحقيقي وتبحث عن التأكيد.",
    level: "متوسط → متقدم",
    style: "السيولة",
    timeframe: "متعدد",
    focus: "BSL / SSL",
    tags: ["سحب السيولة", "BSL", "SSL"],
    featured: true,
  },
  {
    number: "11",
    title: "استراتيجية الدعم والمقاومة",
    english: "Support & Resistance",
    href: "/strategies/support-and-resistance",
    description:
  "تعلّم تحديد الدعم والمقاومة وتداول الارتداد والاختراق وإعادة الاختبار، مع تحديد نقاط الدخول ووقف الخسارة وجني الأرباح.",
    level: "مبتدئ → متوسط",
    style: "حركة السعر",
    timeframe: "متعدد",
    focus: "المستويات الرئيسية",
    tags: ["الدعم", "المقاومة", "الاختراق"],
    featured: true,
  },
  {
    number: "12",
    title: "استراتيجية تقاطع المتوسطات المتحركة",
    english: "Moving Average Crossover",
    href: "/strategies/moving-average-crossover",
    description:
      "تعلم كيف يتفاعل المتوسط السريع والبطيء، والفرق بين SMA وEMA، وكيف تتشكل إشارات التقاطع الصاعد والهابط ضمن سياق الاتجاه.",
    level: "مبتدئ → متوسط",
    style: "مؤشر فني",
    timeframe: "متعدد",
    focus: "الاتجاه",
    tags: ["المتوسطات المتحركة", "EMA", "التقاطع"],
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqItems: FAQ[] = [
  {
    question: "ما هي استراتيجيات تداول الفوركس؟",
    answer:
      "استراتيجيات تداول الفوركس هي قواعد لتحليل السوق وتحديد شروط دخول الصفقات والخروج منها وإدارة المخاطر. وقد تعتمد على حركة السعر أو المؤشرات أو الدعم والمقاومة، وتحتاج إلى تحديد الفريم وحجم الصفقة ووقف الخسارة.",
  },
  {
    question: "ما أفضل استراتيجية فوركس للمبتدئين؟",
    answer:
      "لا توجد استراتيجية واحدة هي الأفضل لكل مبتدئ. يمكن البدء بدراسة حركة السعر والدعم والمقاومة أو تتبع الاتجاه لفهم الأساسيات، ثم اختيار قواعد واضحة واختبارها على حساب تجريبي بما يناسب الوقت والخبرة.",
  },
  {
    question: "ما الفرق بين السكالبينغ والسوينغ؟",
    answer:
      "السكالبينغ يركز على حركات قصيرة وصفقات سريعة ومتابعة مكثفة، بينما قد تمتد صفقات السوينغ لأيام أو أسابيع. تختلف متطلبات المتابعة والتكاليف؛ فالسبريد والتنفيذ مهمان للسكالبينغ، والتبييت والأخبار والفجوات مهمة للسوينغ.",
  },
  {
    question: "ما أفضل فريم لتداول الفوركس؟",
    answer:
      "لا يوجد فريم أفضل للجميع. الفريمات القصيرة تتطلب متابعة أكبر وتجعل تكاليف التنفيذ مؤثرة مقارنة بالحركة المستهدفة. اختيار الفريم يعتمد على قواعد الاستراتيجية ومدة الصفقة والوقت المتاح، ويجب اختباره قبل اعتماده.",
  },
  {
    question: "كيف تختبر استراتيجية الفوركس قبل استخدامها؟",
    answer:
      "اكتب قواعد الدخول ووقف الخسارة وجني الأرباح وحجم الصفقة، ثم اختبرها على بيانات تاريخية مع احتساب التكاليف. استخدم أيضًا بيانات لم تعتمد عليها لتعديل القواعد، وجرّب التطبيق على حساب تجريبي وسجّل النتائج. الاختبار لا يضمن الأداء المستقبلي.",
  },
  {
    question: "هل ICT وSMC مناسبتان للمبتدئين؟",
    answer:
      "تضم ICT وSMC مفاهيم متداخلة مثل هيكل السوق والسيولة وكتل الأوامر والفجوات السعرية. فهم حركة السعر والمستويات أولًا يساعد على دراستها، مع الانتباه إلى اختلاف التعريفات بين المصادر والحاجة إلى قواعد تطبيق واضحة.",
  },
  {
    question: "هل انخفاض السبريد يكفي لاختيار وسيط الفوركس؟",
    answer:
      "لا. قارن السبريد مع العمولة وجودة التنفيذ ورسوم التبييت وشروط السحب، وتحقق من الجهة القانونية والترخيص وتوفر الخدمة في بلدك. انخفاض السبريد وحده لا يحدد التكلفة الإجمالية أو ملاءمة الوسيط.",
  },
  {
    question: "هل توجد استراتيجية فوركس تضمن الربح؟",
    answer:
      "لا توجد استراتيجية تضمن الربح. قد تتغير ظروف السوق وتحدث خسائر متتالية، لذلك يجب اختبار القواعد وتحديد حجم الصفقة ووقف الخسارة وإدارة المخاطر. النتائج التاريخية والتجريبية لا تضمن نتائج مماثلة في التداول الحقيقي.",
  },
];

/* =========================================================
   SCHEMA
========================================================= */

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "استراتيجيات الفوركس",
  description:
    "دليل شامل لاستراتيجيات الفوركس والتداول وأساليب تحليل السوق وإدارة الصفقات.",
  url: PAGE_URL,
  inLanguage: "ar",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: strategies.length,
    itemListElement: strategies.map((strategy, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${strategy.title} ${strategy.english}`,
      url: `https://brokeralarab.com${strategy.href}`,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: "https://brokeralarab.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "استراتيجيات الفوركس",
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
   SMALL COMPONENTS
========================================================= */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black tracking-[0.04em] text-slate-700">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
      {children}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function StrategyIcon() {
  return (
    <svg
      viewBox="0 0 560 390"
      className="h-auto w-full"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="heroStrategyGrid"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M32 0H0V32"
            stroke="#e2e8f0"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
      </defs>

      <rect
        x="1"
        y="1"
        width="558"
        height="388"
        rx="30"
        fill="#f8fafc"
        stroke="#e2e8f0"
      />

      <rect
        x="20"
        y="20"
        width="520"
        height="350"
        rx="22"
        fill="url(#heroStrategyGrid)"
      />

      <rect
        x="56"
        y="48"
        width="448"
        height="52"
        rx="16"
        fill="white"
        stroke="#e2e8f0"
      />

      <circle cx="84" cy="74" r="10" fill="#0f172a" />
      <rect x="106" y="64" width="126" height="9" rx="4.5" fill="#0f172a" />
      <rect x="106" y="79" width="82" height="7" rx="3.5" fill="#cbd5e1" />

      <path
        d="M72 276L120 245L164 256L212 200L256 217L307 153L354 174L410 109L472 130"
        stroke="#0f172a"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="120" cy="245" r="7" fill="white" stroke="#0f172a" strokeWidth="4" />
      <circle cx="212" cy="200" r="7" fill="white" stroke="#0f172a" strokeWidth="4" />
      <circle cx="307" cy="153" r="7" fill="white" stroke="#0f172a" strokeWidth="4" />
      <circle cx="410" cy="109" r="7" fill="white" stroke="#0f172a" strokeWidth="4" />

      <rect
        x="55"
        y="304"
        width="450"
        height="44"
        rx="14"
        fill="white"
        stroke="#e2e8f0"
      />

      <g>
        <rect x="74" y="318" width="80" height="16" rx="8" fill="#e2e8f0" />
        <rect x="165" y="318" width="80" height="16" rx="8" fill="#cbd5e1" />
        <rect x="256" y="318" width="80" height="16" rx="8" fill="#94a3b8" />
        <rect x="347" y="318" width="139" height="16" rx="8" fill="#0f172a" />
      </g>

      <g transform="translate(436 185)">
        <circle cx="0" cy="0" r="45" fill="white" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="0" cy="0" r="26" fill="#f1f5f9" stroke="#0f172a" strokeWidth="3" />
        <circle cx="0" cy="0" r="8" fill="#0f172a" />
        <path d="M0-58V-40M0 40V58M-58 0H-40M40 0H58" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function StrategiesHubPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f6f8fb] text-slate-900">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative isolate w-full overflow-hidden border-b border-[#174373] bg-[#071a31]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

          <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
          <nav
            aria-label="مسار التنقل"
            className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold text-blue-200/80"
          >
            <Link href="/" className="transition hover:text-white">
              الرئيسية
            </Link>

            <span aria-hidden="true">/</span>

            <span aria-current="page" className="text-white">
              استراتيجيات الفوركس
            </span>
          </nav>

          <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_250px] xl:grid-cols-[minmax(0,1fr)_270px]">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-extrabold text-blue-100 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                من الأساسيات إلى المفاهيم المتقدمة
              </div>

              <h1 className="mt-3 text-[26px] font-black leading-[1.2] tracking-[-0.025em] text-white sm:text-[40px] lg:text-[46px] xl:text-[52px]">
  استراتيجيات الفوركس:
  <span className="mt-2 block text-[21px] leading-[1.35] text-[#55c3ff] sm:text-[30px] lg:text-[34px] xl:text-[38px]">
    دليل شامل لفهم واختيار استراتيجية التداول
  </span>
</h1>

<p className="mt-3 max-w-[1100px] text-[14px] font-medium leading-6 text-blue-100 sm:mt-4 sm:text-[16px] sm:leading-8">
  استكشف 12 دليلًا لاستراتيجيات الفوركس، وقارن أسلوب التداول
  والفريم المناسب ومستوى الخبرة لاختيار الأسلوب الأقرب لك.
</p>

              <div className="mt-4 hidden flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-blue-200 sm:flex sm:text-[11px]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-cyan-400">
                    <CheckIcon />
                  </span>
                  شرح المفاهيم وطريقة التطبيق
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <span className="text-cyan-400">
                    <CheckIcon />
                  </span>
                  مقارنة حسب الأسلوب والفريم
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <span className="text-cyan-400">
                    <CheckIcon />
                  </span>
                  إدارة المخاطر والأخطاء الشائعة
                </span>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
                <div className="grid grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1">
                  {[
                    ["12", "دليلًا تعليميًا"],
                    ["4", "مقارنات عملية"],
                    ["متعدد", "أطر زمنية"],
                  ].map(([value, label], index) => (
                    <div
                      key={label}
                      className={`px-2 py-2.5 text-center ${
                        index > 0 ? "border-r border-white/10" : ""
                      }`}
                    >
                      <div className="text-[18px] font-black text-[#66c8ff] sm:text-[21px]">
                        {value}
                      </div>

                      <div className="mt-1 text-[9px] font-bold text-blue-200 sm:text-[10px]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="#all-strategies"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#2471df] px-3 py-3 text-center text-[11px] font-black text-white transition hover:bg-[#2e7cea] sm:px-5 sm:text-[13px]"
                  >
                    استكشف الاستراتيجيات
                    <span aria-hidden="true">↓</span>
                  </a>

                  <a
                    href="#choose-strategy"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/20 bg-white/[0.07] px-3 py-3 text-center text-[11px] font-black text-white transition hover:bg-white/[0.12] sm:px-5 sm:text-[13px]"
                  >
                    كيف أختار الاستراتيجية؟
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:-translate-y-6">
              <div className="rounded-[20px] border border-white/10 bg-[#0b2948]/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black text-white">
                    من قراءة السعر إلى خطة التداول
                  </span>

                  <span className="shrink-0 rounded-full bg-cyan-300/10 px-2 py-1 text-[7px] font-bold text-cyan-200">
                    رسم توضيحي
                  </span>
                </div>

                <StrategyIcon />

                <p className="mt-3 text-center text-[9px] font-medium leading-5 text-blue-200">
                  افهم الاتجاه والمستويات قبل تحديد الدخول والمخاطرة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1520px] px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="space-y-5 sm:space-y-8">

          {/* =================================================
              START HERE
          ================================================= */}

          <section
  id="choose-strategy"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  {/* مقدمة مختصرة */}
  <div className="relative border-b border-blue-100 bg-[linear-gradient(110deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      اختيار استراتيجية التداول
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      أي استراتيجية فوركس تناسبك؟
    </h2>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      استراتيجية الفوركس هي قواعد لتحليل السوق والدخول والخروج
      وإدارة المخاطرة. اختيارها يبدأ من وقتك وخبرتك وأسلوب التداول
      الذي يناسبك؛ لا توجد استراتيجية واحدة هي الأفضل للجميع.
    </p>
  </div>

  {/* خيارات مباشرة */}
  <div className="p-3 sm:p-6 lg:p-8">
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {[
        {
          n: "01",
          title: "أفضّل التداول السريع",
          text: "لدي وقت لمتابعة السوق باستمرار، مع الانتباه للسبريد وسرعة التنفيذ.",
          strategy: "استراتيجية السكالبينغ",
          href: "/strategies/scalping",
        },
        {
          n: "02",
          title: "أفضّل صفقات تمتد لأيام",
          text: "أريد متابعة دورية للحركات الأوسع، مع فهم مخاطر الاحتفاظ بالصفقة.",
          strategy: "استراتيجية السوينغ",
          href: "/strategies/swing-trading",
        },
        {
          n: "03",
          title: "أريد فهم حركة السعر",
          text: "أبدأ بدراسة الاتجاه والقمم والقيعان ومستويات الدعم والمقاومة.",
          strategy: "استراتيجية البرايس أكشن",
          href: "/strategies/price-action",
        },
        {
          n: "04",
          title: "أريد دراسة الهيكل والسيولة",
          text: "لدي أساس في حركة السعر وأريد التعمق في مفاهيم الأموال الذكية.",
          strategy: "مفاهيم الأموال الذكية SMC",
          href: "/strategies/smart-money-concepts",
        },
      ].map((item) => (
        <Link
          key={item.n}
          href={item.href}
          className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-blue-100 bg-[#f7faff] p-4 transition duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md sm:rounded-[20px] sm:p-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#e5efff] text-[12px] font-black text-[#1b5db8] sm:h-10 sm:w-10 sm:text-[14px]">
              {item.n}
            </span>

            <h3 className="text-[16px] font-black leading-6 text-[#0b3157] sm:text-[19px] sm:leading-7">
              {item.title}
            </h3>
          </div>

          <p className="mt-2 text-[14px] font-medium leading-6 text-slate-700 sm:mt-3 sm:text-[15px] sm:leading-7">
            {item.text}
          </p>

          <div className="mt-auto pt-3 sm:pt-4">
            <div className="flex items-center justify-between gap-2 border-t border-blue-100 pt-3 text-[13px] font-black text-[#1b5db8] sm:text-[15px]">
              <span>{item.strategy}</span>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#2471df] transition group-hover:bg-[#2471df] group-hover:text-white">
                <ArrowIcon />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* رابط لباقي الأدلة */}
    <div className="mt-4 flex flex-col gap-3 border-t border-blue-100 pt-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
      <p className="text-[13px] font-medium leading-6 text-slate-600 sm:text-[14px]">
        يمكن دمج أسلوب مثل السوينغ مع تحليل البرايس أكشن.
      </p>

      <a
        href="#all-strategies"
        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2471df] px-4 py-2.5 text-[13px] font-black text-white transition hover:bg-[#1b5db8] sm:px-5 sm:text-[14px]"
      >
        استكشف الأدلة الـ12
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  </div>
</section>

      {/* =================================================
    ALL STRATEGIES
================================================= */}

<section
  id="all-strategies"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  {/* رأس القسم */}
  <div className="relative border-b border-blue-100 bg-[linear-gradient(110deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      أدلة استراتيجيات التداول
    </span>

    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
        أفضل استراتيجيات تداول الفوركس
      </h2>

      <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[12px] font-bold text-[#1b5db8]">
        <span className="font-black">{strategies.length}</span>
        دليلًا تعليميًا
      </span>
    </div>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      تعرّف على طريقة عمل كل استراتيجية والفريم ومستوى الخبرة
      المناسب، ثم افتح دليلها لدراسة التطبيق وإدارة المخاطر.
      الأفضل لك يعتمد على أسلوبك وخبرتك.
    </p>
  </div>

  {/* بطاقات الاستراتيجيات */}
  <div className="p-3 sm:p-6 lg:p-8">
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {strategies.map((strategy) => (
        <Link
          key={strategy.href}
          href={strategy.href}
          className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-blue-100 bg-white p-4 transition duration-200 hover:border-blue-300 hover:bg-[#f8fbff] hover:shadow-[0_8px_24px_rgba(36,113,223,0.08)] sm:rounded-[20px] sm:p-5"
        >
          {/* الرقم والاسم الإنجليزي */}
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e5efff] text-[13px] font-black text-[#1b5db8] sm:h-10 sm:w-10 sm:text-[14px]">
              {strategy.number}
            </span>

            <span
              dir="ltr"
              className="min-w-0 text-left text-[11px] font-bold leading-5 text-slate-500 sm:text-[12px]"
            >
              {strategy.english}
            </span>
          </div>

          {/* العنوان */}
          <h3 className="mt-3 text-[18px] font-black leading-7 text-[#0b3157] transition group-hover:text-[#1b5db8] sm:text-[20px] sm:leading-8">
            {strategy.title}
          </h3>

          {/* الوصف */}
          <p className="mt-2 text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
            {strategy.description}
          </p>

          {/* بيانات مختصرة */}
          <div className="mt-auto pt-4">
            <dl className="grid grid-cols-2 gap-2 rounded-xl bg-[#f3f7fd] p-3">
              <div>
                <dt className="text-[11px] font-bold text-slate-500">
                  مستوى الخبرة
                </dt>

                <dd className="mt-1 text-[12px] font-bold leading-5 text-[#0b3157] sm:text-[13px]">
                  {strategy.level}
                </dd>
              </div>

              <div className="border-r border-blue-100 pr-3">
                <dt className="text-[11px] font-bold text-slate-500">
                  الفريم
                </dt>

                <dd className="mt-1 text-[12px] font-bold leading-5 text-[#0b3157] sm:text-[13px]">
                  <bdi>{strategy.timeframe}</bdi>
                </dd>
              </div>
            </dl>

            {/* رابط الدليل */}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-blue-100 pt-3">
              <span className="text-[13px] font-black text-[#1b5db8] sm:text-[14px]">
                اقرأ دليل الاستراتيجية
              </span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-50 text-[#2471df] transition group-hover:bg-[#2471df] group-hover:text-white">
                <ArrowIcon />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

       {/* =================================================
    COMPARISON
================================================= */}

<section
  id="strategy-comparison"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  {/* رأس القسم */}
  <div className="relative border-b border-blue-100 bg-[linear-gradient(110deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      الفروق بين الأساليب
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      مقارنة أساليب تداول الفوركس: ما الفرق بينها؟
    </h2>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      بعض الأساليب تحدد مدة الصفقة، وأخرى تحدد طريقة التحليل.
      هذه المقارنات توضح الفروق العملية وكيف يمكن أن تتداخل.
    </p>
  </div>

  {/* مقارنات مختصرة */}
  <div className="p-3 sm:p-6 lg:p-8">
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
      {[
        {
          n: "01",
          title: "السكالبينغ مقابل السوينغ",
          first: {
            label: "السكالبينغ",
            text: "صفقات قصيرة ومتابعة مكثفة؛ السبريد والعمولة وسرعة التنفيذ مؤثرة.",
            href: "/strategies/scalping",
          },
          second: {
            label: "السوينغ",
            text: "صفقات قد تمتد لأيام أو أسابيع؛ الأخبار والفجوات وتكاليف التبييت مهمة.",
            href: "/strategies/swing-trading",
          },
          takeaway: "الفرق الأساسي: مدة الصفقة والوقت المتاح لمتابعتها.",
        },
        {
          n: "02",
          title: "البرايس أكشن مقابل المؤشرات",
          first: {
            label: "البرايس أكشن",
            text: "يركز على حركة السعر والاتجاه والقمم والقيعان والمستويات.",
            href: "/strategies/price-action",
          },
          second: {
            label: "المؤشرات الفنية",
            text: "تلخّص بيانات السعر؛ مثل RSI للزخم والمتوسطات لدراسة الاتجاه.",
            href: "/strategies/rsi",
          },
          takeaway: "يمكن دمجهما عندما يكون لكل أداة دور واضح في قواعد التداول.",
        },
        {
          n: "03",
          title: "الدعم والمقاومة مقابل العرض والطلب",
          first: {
            label: "الدعم والمقاومة",
            text: "مستويات أو مناطق تُدرس عندها الارتدادات والاختراقات وإعادة الاختبار.",
            href: "/strategies/support-and-resistance",
          },
          second: {
            label: "العرض والطلب",
            text: "مناطق تُقيّم وفق انطلاق السعر منها وقوة الحركة وعدد مرات اختبارها.",
            href: "/strategies/supply-and-demand",
          },
          takeaway:
  "قد تتداخل المناطق؛ المهم تحديد قواعد رسمها ونقاط الدخول ووقف الخسارة.",
        },
        {
          n: "04",
          title: "ICT ومفاهيم الأموال الذكية SMC",
          first: {
            label: "ICT",
            text: "إطار يضم مفاهيم السيولة والهيكل والفجوات السعرية وكتل الأوامر.",
            href: "/strategies/ict",
          },
          second: {
            label: "SMC",
            text: "مجموعة مفاهيم متداخلة مع ICT؛ تختلف تعريفاتها وقواعد تطبيقها بين المصادر.",
            href: "/strategies/smart-money-concepts",
          },
          takeaway: "تشابه المصطلحات لا يعني تطابق القواعد أو إثبات أفضلية الأداء.",
        },
      ].map((comparison) => (
        <article
          key={comparison.n}
          className="flex h-full flex-col overflow-hidden rounded-[16px] border border-blue-100 bg-white sm:rounded-[20px]"
        >
          {/* عنوان المقارنة */}
          <div className="flex items-center gap-3 border-b border-blue-100 bg-[#f3f7fd] px-4 py-3 sm:px-5 sm:py-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#e5efff] text-[12px] font-black text-[#1b5db8] sm:h-9 sm:w-9 sm:text-[13px]">
              {comparison.n}
            </span>

            <h3 className="text-[17px] font-black leading-7 text-[#0b3157] sm:text-[20px]">
              {comparison.title}
            </h3>
          </div>

          {/* الطرفان بنفس العرض على جميع الشاشات */}
          <dl className="grid grid-cols-2">
            {[comparison.first, comparison.second].map((side, index) => (
              <div
                key={side.href}
                className={`min-w-0 px-3 py-4 sm:px-5 ${
                  index > 0 ? "border-r border-blue-100" : ""
                }`}
              >
                <dt>
                  <Link
                    href={side.href}
                    className="text-[14px] font-black leading-6 text-[#1b5db8] underline decoration-blue-200 underline-offset-4 transition hover:text-[#2471df] hover:decoration-blue-500 sm:text-[16px]"
                  >
                    {side.label}
                  </Link>
                </dt>

                <dd className="mt-2 text-[13px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
                  {side.text}
                </dd>
              </div>
            ))}
          </dl>

          {/* خلاصة الفرق */}
          <div className="mt-auto border-t border-blue-100 bg-[#f8fbff] px-4 py-3 sm:px-5">
            <p className="text-[13px] font-medium leading-6 text-slate-700 sm:text-[14px]">
              <span className="font-black text-[#0b3157]">
                الخلاصة:{" "}
              </span>
              {comparison.takeaway}
            </p>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
           {/* =================================================
    LEARNING PATH
================================================= */}

<section
  id="forex-learning-path"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  {/* رأس القسم */}
  <div className="relative border-b border-blue-100 bg-[linear-gradient(110deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      من التعلّم إلى التطبيق
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      تعلّم تداول الفوركس للمبتدئين
    </h2>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      افهم الأساسيات، وحدد قواعد استراتيجية واحدة، ثم جرّب تطبيقها
      على حساب تجريبي قبل التفكير في التداول بأموال حقيقية.
    </p>
  </div>

  <div className="p-3 sm:p-6 lg:p-8">
    {/* خطوات عملية مختصرة */}
    <ol className="grid list-none gap-3 sm:gap-4 lg:grid-cols-3">
      {[
        {
          n: "01",
          title: "افهم السعر وتكاليف التداول",
          text: "تعلّم حركة السعر والسبريد والرافعة والهامش؛ فهي تؤثر في قراراتك ومخاطرتك.",
          label: "مركز تعلّم التداول",
          href: "/learn-trading",
        },
        {
          n: "02",
          title: "حدّد قواعد استراتيجية واحدة",
          text: "اكتب شروط الدخول ووقف الخسارة والخروج، وحدد حجم الصفقة قبل التنفيذ.",
          label: "تعلّم البرايس أكشن",
          href: "/strategies/price-action",
        },
        {
          n: "03",
          title: "اختبر وسجّل النتائج",
          text: "طبّق القواعد على حساب تجريبي وسجّل الصفقات؛ النتائج التجريبية لا تضمن أداءً مماثلًا بالحساب الحقيقي.",
          label: "قارن تكاليف حسابات التداول",
          href: "/lowest-spread-brokers",
        },
      ].map((step) => (
        <li
          key={step.n}
          className="flex h-full gap-3 rounded-[16px] border border-blue-100 bg-[#f8fbff] p-4 sm:rounded-[20px] sm:p-5"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#e5efff] text-[12px] font-black text-[#1b5db8] sm:h-10 sm:w-10 sm:text-[14px]"
          >
            {step.n}
          </span>

          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="text-[16px] font-black leading-6 text-[#0b3157] sm:text-[19px] sm:leading-7">
              {step.title}
            </h3>

            <p className="mt-2 text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
              {step.text}
            </p>

            <div className="mt-auto pt-3">
              <Link
                href={step.href}
                className="group inline-flex min-h-[44px] items-center gap-2 text-[13px] font-black text-[#1b5db8] transition hover:text-[#2471df] sm:text-[14px]"
              >
                <span>{step.label}</span>

                <span className="shrink-0 transition group-hover:-translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ol>

    {/* انتقال إلى مقارنة الوسطاء والحسابات */}
    <div className="relative mt-4 overflow-hidden rounded-[18px] border border-[#174373] bg-[linear-gradient(115deg,#071a31_0%,#0b3157_60%,#0c4279_100%)] p-4 sm:mt-6 sm:rounded-[22px] sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-6">
        <div>
          <span className="text-[11px] font-bold text-[#66c8ff] sm:text-[12px]">
            قبل فتح حساب تداول
          </span>

          <h3 className="mt-2 text-[20px] font-black leading-[1.4] text-white sm:text-[25px]">
            قارن الوسيط والحساب المناسب لأسلوبك
          </h3>

          <p className="mt-2 max-w-[850px] text-[14px] font-medium leading-6 text-blue-100 sm:text-[15px] sm:leading-7">
            راجع الترخيص وتوفّر الخدمة في بلدك والسبريد والعمولة
            وشروط السحب، ثم انتقل إلى فتح الحساب إذا كانت الشروط مناسبة لك.
          </p>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          <Link
            href="/lowest-spread-brokers"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#2471df] px-4 py-3 text-center text-[14px] font-black text-white transition hover:bg-[#2e7cea] sm:px-5"
          >
            قارن الحسابات والسبريد
            <span className="shrink-0">
              <ArrowIcon />
            </span>
          </Link>

          <Link
  href="/brokers"
  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-4 py-3 text-center text-[14px] font-black text-white transition hover:bg-white/[0.12] sm:px-5"
>
   تقييمات وسطاء الفوركس
  <span className="shrink-0">
    <ArrowIcon />
  </span>
</Link>
        </div>
      </div>
    </div>
  </div>
</section>

       {/* =================================================
    TRADING PLAN AND TESTING
================================================= */}

<section
  id="strategy-testing"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  {/* رأس القسم */}
  <div className="relative border-b border-blue-100 bg-[linear-gradient(110deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      قواعد التطبيق وتقييم النتائج
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      كيف تختبر استراتيجية الفوركس؟
    </h2>

    <p className="mt-3 max-w-[1150px] text-[14px] font-medium leading-7 text-slate-700 sm:text-[16px] sm:leading-8">
      حوّل الفكرة إلى قواعد مكتوبة، ثم اختبرها بصورة متسقة.
      تقييم الاستراتيجية يعتمد على نتائج سلسلة صفقات وتكاليفها،
      وليس على صفقة رابحة أو نسبة نجاح وحدها.
    </p>
  </div>

  <div className="p-4 sm:p-6 lg:p-8">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

            {/* قواعد الاستراتيجية */}
      <div>
        <h3 className="text-[18px] font-black leading-7 text-[#0b3157] sm:text-[22px]">
          كيف تضع خطة تداول الفوركس؟
        </h3>

        <dl className="mt-3 divide-y divide-blue-100">
          {[
            {
              title: "زوج العملات والإطار الزمني",
              text: "حدد زوج العملات والفريم المناسب، وحالة السوق وشروط تطبيق الاستراتيجية قبل البحث عن صفقة.",
            },
            {
              title: "نقاط الدخول ووقف الخسارة",
              text: "اكتب شروط دخول الصفقة ومكان وقف الخسارة بوضوح، وتجنب التنفيذ عندما لا تتحقق شروطك.",
            },
            {
              title: "حجم الصفقة وجني الأرباح",
              text: "حدد حجم الصفقة وفق المبلغ الذي تقبل خسارته، واكتب مستوى جني الأرباح وشروط الخروج مسبقًا.",
            },
          ].map((item) => (
            <div key={item.title} className="py-3">
              <dt className="text-[15px] font-black leading-6 text-[#1b5db8] sm:text-[17px]">
                {item.title}
              </dt>

              <dd className="mt-1 text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7 lg:min-h-[56px]">
                {item.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* تقييم النتائج */}
      <div>
        <h3 className="text-[18px] font-black leading-7 text-[#0b3157] sm:text-[22px]">
          كيف تقيّم نتائج استراتيجية التداول؟
        </h3>

        <dl className="mt-3 divide-y divide-blue-100">
          {[
            {
              title: "نسبة النجاح ومتوسط الربح والخسارة",
              text: "قارن نسبة الصفقات الرابحة بمتوسط الربح والخسارة؛ نسبة النجاح وحدها لا تكفي لتقييم الأداء.",
            },
            {
              title: "تكاليف التداول وتراجع رأس المال",
              text: "احسب السبريد والعمولة والتبييت والانزلاق السعري، وراقب تراجع رأس المال والخسائر المتتالية.",
            },
            {
              title: "الاختبار التاريخي والحساب التجريبي",
              text: "اختبر بيانات لم تستخدمها لتعديل القواعد، ثم طبّقها على حساب تجريبي وسجّل النتائج للمقارنة.",
            },
          ].map((item) => (
            <div key={item.title} className="py-3">
              <dt className="text-[15px] font-black leading-6 text-[#1b5db8] sm:text-[17px]">
                {item.title}
              </dt>

              <dd className="mt-1 text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7 lg:min-h-[56px]">
                {item.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

    {/* خلاصة عملية ورابط أدوات */}
    <div className="mt-5 overflow-hidden rounded-[16px] border border-blue-100 bg-[#f3f8ff] sm:mt-6 sm:rounded-[20px]">
      <div className="px-4 py-4 sm:px-5">
        <p className="text-[14px] font-medium leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
          <strong className="font-black text-[#0b3157]">
            مثال على قاعدة قابلة للاختبار:{" "}
          </strong>
          بدل «أشتري عند الدعم»، حدد كيف ترسم منطقة الدعم،
          وما شرط التأكيد، ومتى تُلغى الفكرة. بدون هذه التفاصيل
          يصعب تكرار الاختبار ومقارنة النتائج.
        </p>
      </div>

      <div className="flex flex-col gap-3 border-t border-blue-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5">
        <p className="text-[13px] font-medium leading-6 text-slate-600 sm:text-[14px]">
  النتائج السابقة والتجريبية لا تضمن النتائج المستقبلية.
  استخدم{" "}
  <Link
    href="/tools/lot-size-calculator"
    className="font-bold text-[#1b5db8] underline decoration-blue-200 underline-offset-4 transition hover:decoration-blue-500"
  >
    حاسبة حجم الصفقة
  </Link>
  {" "}لتقدير حجم التداول وفق بياناتك ومقدار المخاطرة.
</p>

        <Link
          href="/tools"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2471df] px-4 py-2.5 text-[13px] font-black text-white transition hover:bg-[#1b5db8] sm:px-5 sm:text-[14px]"
        >
          أدوات وحاسبات التداول
          <span className="shrink-0">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </div>
  </div>
</section>

{/* =================================================
    FAQ
================================================= */}

<section
  id="strategies-faq"
  className="scroll-mt-24 overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_28px_rgba(11,49,87,0.06)] sm:rounded-[28px]"
>
  {/* رأس القسم */}
  <div className="relative border-b border-blue-100 bg-[linear-gradient(110deg,#ffffff_0%,#f3f8ff_65%,#e8f3ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#43baff] to-[#2471df]"
    />

    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1b5db8] sm:text-[12px]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2471df]" />
      الأسئلة الشائعة
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-[#0b3157] sm:text-[28px] lg:text-[32px]">
      أسئلة عن استراتيجيات الفوركس
    </h2>
  </div>

  {/* قائمة واحدة مدمجة */}
  <div className="divide-y divide-blue-100 px-4 sm:px-7 lg:px-8">
    {faqItems.map((item) => (
      <details
        key={item.question}
        className="group py-1"
      >
        <summary className="flex min-h-[58px] cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
          <h3 className="text-[15px] font-black leading-6 text-[#0b3157] transition group-open:text-[#1b5db8] sm:text-[18px] sm:leading-7">
            {item.question}
          </h3>

          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[20px] font-normal leading-none text-[#2471df] transition group-open:rotate-45"
          >
            +
          </span>
        </summary>

        <p className="max-w-[1100px] pb-4 pl-3 text-[14px] font-medium leading-7 text-slate-700 sm:pb-5 sm:text-[16px] sm:leading-8">
          {item.answer}
        </p>
      </details>
    ))}
  </div>
</section>

                   {/* =================================================
              DISCLAIMER
          ================================================= */}

          <div className="relative overflow-hidden rounded-[18px] border border-blue-100 bg-[#f3f8ff] px-4 py-4 sm:rounded-[22px] sm:px-6 sm:py-5">
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 top-0 w-1 bg-[#2471df]"
            />

            <p className="text-[13px] font-medium leading-6 text-slate-700 sm:text-[14px] sm:leading-7">
              <strong className="font-black text-[#0b3157]">
                تنبيه المخاطر:{" "}
              </strong>
              محتوى استراتيجيات الفوركس تعليمي، ولا يمثل توصية
              استثمارية أو إشارة شراء أو بيع. لا توجد استراتيجية
              تضمن الربح، وقد يؤدي التداول بالرافعة المالية إلى
              خسائر كبيرة. افهم المخاطر واختبر قواعدك على حساب
              تجريبي قبل التداول بأموال حقيقية.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
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
    </main>
  );
}