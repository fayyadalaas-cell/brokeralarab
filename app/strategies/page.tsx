import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

/* =========================================================
   SEO
========================================================= */

const PAGE_URL = "https://brokeralarab.com/strategies";

export const metadata: Metadata = {
  title: "استراتيجيات الفوركس: دليل شامل لأفضل استراتيجيات التداول",
  description:
    "تعرف على 12 استراتيجية فوركس وتداول، من البرايس أكشن والدعم والمقاومة وتقاطع المتوسطات المتحركة إلى السكالبينغ والسوينغ وICT وSMC وكتل الأوامر وسحب السيولة.",

  keywords: [
    "استراتيجيات الفوركس",
    "استراتيجية فوركس",
    "أفضل استراتيجيات الفوركس",
    "استراتيجيات التداول",
    "استراتيجية التداول",
    "استراتيجيات تداول للمبتدئين",
    "استراتيجيات فوركس للمبتدئين",
    "استراتيجية برايس أكشن",
    "Price Action",
    "Swing Trading",
    "Scalping",
    "ICT Trading",
    "Smart Money Concepts",
    "Trend Following",
    "RSI Strategy",
    "Order Blocks",
    "Supply and Demand",
    "Liquidity Sweep",
    "استراتيجية الدعم والمقاومة",
    "الدعم والمقاومة في التداول",
    "Support and Resistance",
    "استراتيجية تقاطع المتوسطات المتحركة",
    "Moving Average Crossover",
    "EMA Crossover",
  ],

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
    title: "استراتيجيات الفوركس: دليل شامل لاستراتيجيات التداول",
    description:
      "استكشف أهم استراتيجيات الفوركس وتعرف على أسلوب كل استراتيجية والفريمات المناسبة ومستوى الخبرة والمفاهيم الأساسية وإدارة المخاطر.",
    siteName: "بروكر العرب",
    locale: "ar_AR",
  },

  twitter: {
    card: "summary_large_image",
    title: "استراتيجيات الفوركس: دليل شامل لاستراتيجيات التداول",
    description:
      "استكشف 12 استراتيجية تشمل البرايس أكشن والدعم والمقاومة وتقاطع المتوسطات والسكالبينغ والسوينغ وICT وSMC وRSI وكتل الأوامر وسحب السيولة.",
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
      "افهم كيفية تحديد كتل الأوامر وربطها بالاندفاع السعري وهيكل السوق والسيولة وطرق الدخول والإبطال.",
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
      "تعلم تحديد مناطق الدعم والمقاومة، وقراءة الارتداد والاختراق وإعادة الاختبار والاختراقات الكاذبة مع تنظيم الدخول والإبطال والهدف.",
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
    question: "ما هي استراتيجية الفوركس؟",
    answer:
      "استراتيجية الفوركس هي مجموعة قواعد تحدد كيف يقرأ المتداول السوق، ومتى يبحث عن فرصة، وما شروط الدخول، وأين تصبح الفكرة غير صالحة، وكيف يحدد وقف الخسارة والهدف وحجم المخاطرة.",
  },
  {
    question: "ما أفضل استراتيجية فوركس للمبتدئين؟",
    answer:
      "لا توجد استراتيجية واحدة هي الأفضل للجميع. للمبتدئ يمكن أن تكون دراسة حركة السعر أو تتبع الاتجاه نقطة بداية مناسبة لفهم الاتجاه وهيكل السوق قبل الانتقال إلى مفاهيم أكثر تعقيدًا.",
  },
  {
    question: "ما الفرق بين السكالبينغ والسوينغ؟",
    answer:
      "الفرق الأساسي هو سرعة التداول ومدة الاحتفاظ بالصفقة. السكالبينغ يستهدف حركات قصيرة جدًا، بينما السوينغ يستهدف عادة حركات أوسع قد تمتد لعدة أيام أو أسابيع.",
  },
  {
    question: "هل يمكن استخدام أكثر من استراتيجية فوركس؟",
    answer:
      "نعم، لكن جمع استراتيجيات كثيرة دون قواعد واضحة قد يؤدي إلى قرارات متناقضة. الأفضل فهم استراتيجية واحدة واختبارها أولًا ثم إضافة أدوات أخرى عندما يكون لها دور واضح.",
  },
  {
    question: "هل ICT وSMC مناسبتان للمبتدئين؟",
    answer:
      "يمكن تعلمهما، لكنهما يحتويان على عدد كبير من المفاهيم مثل السيولة وكتل الأوامر والفجوات السعرية وتغيرات هيكل السوق، لذلك يكون فهم حركة السعر وهيكل السوق أولًا أكثر تنظيمًا للمبتدئ.",
  },
  {
    question: "هل توجد استراتيجية فوركس تضمن الربح؟",
    answer:
      "لا. أي استراتيجية يمكن أن تمر بصفقات خاسرة أو ظروف سوق لا تناسبها، لذلك يجب اختبار القواعد وإدارة المخاطر وتحديد حجم الصفقة ووقف الخسارة قبل استخدام أموال حقيقية.",
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

function LearningMapGraphic() {
  return (
    <div className="mt-6 hidden overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 lg:block">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-black text-slate-400">
            مسار مقترح للمبتدئ
          </div>
          <div className="mt-1 text-[13px] font-black text-slate-900">
            من الأساسيات إلى المفاهيم المتقدمة
          </div>
        </div>

        <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-black text-slate-500 shadow-sm">
          4 مراحل
        </span>
      </div>

      <div className="relative">
        <div className="absolute bottom-5 right-[28px] top-5 w-px bg-slate-200" />

        {[
          ["01", "حركة السعر", "الهيكل والمستويات"],
          ["02", "أسلوب التداول", "سكالبينغ أو سوينغ أو اتجاه"],
          ["03", "أدوات التحليل", "RSI والمستويات والمتوسطات"],
          ["04", "المفاهيم المتقدمة", "ICT وSMC والسيولة"],
        ].map(([n, title, text]) => (
          <div key={n} className="relative flex items-center gap-3 py-2.5">
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[9px] font-black text-slate-900 shadow-sm">
              {n}
            </span>

            <div>
              <div className="text-[12px] font-black text-slate-900">
                {title}
              </div>
              <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                {text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MINI CHART
========================================================= */

function MiniChart({ type }: { type: number }) {
  const charts = [
    "M8 52 L25 43 L40 47 L57 30 L73 35 L92 18",
    "M8 25 L23 38 L39 30 L55 45 L72 37 L92 53",
    "M8 48 L22 34 L37 39 L51 25 L67 31 L80 17 L92 22",
    "M8 45 L24 45 L35 33 L50 33 L62 21 L78 21 L92 11",
  ];

  return (
    <svg
      viewBox="0 0 100 64"
      className="h-full w-full"
      role="img"
      aria-label="رسم توضيحي لحركة السعر"
    >
      <defs>
        <pattern
          id={`miniGrid-${type}`}
          width="20"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0H0V16"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="0.7"
          />
        </pattern>
      </defs>

      <rect width="100" height="64" fill="#f8fafc" />
      <rect width="100" height="64" fill={`url(#miniGrid-${type})`} />

      <path
        d={charts[type % charts.length]}
        fill="none"
        stroke="#0f172a"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="92"
        cy={type % 2 === 0 ? "18" : "53"}
        r="3"
        fill="#ffffff"
        stroke="#0f172a"
        strokeWidth="2"
      />
    </svg>
  );
}

/* =========================================================
   STRATEGY CARD
========================================================= */

function StrategyCard({
  strategy,
  index,
}: {
  strategy: Strategy;
  index: number;
}) {
  return (
    <Link
      href={strategy.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
    >
      {strategy.featured && (
        <div className="absolute left-4 top-4 z-10 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1 text-[9px] font-black text-slate-700 shadow-sm backdrop-blur">
          دليل مميز
        </div>
      )}

      <div className="h-[105px] overflow-hidden border-b border-slate-100 sm:h-[120px]">
        <MiniChart type={index} />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-black text-slate-500">
              {strategy.number} — استراتيجية فوركس
            </div>

            <h2 className="mt-2 text-[18px] font-black leading-7 text-slate-950 sm:text-[20px]">
              {strategy.title}
            </h2>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition group-hover:bg-slate-950 group-hover:text-white">
            <ArrowIcon />
          </span>
        </div>

        <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600 sm:mt-4 sm:text-[14px] sm:leading-8">
          {strategy.description}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5">
          <div className="rounded-xl bg-slate-50 p-2.5">
            <div className="text-[9px] font-black text-slate-400">
              المستوى
            </div>
            <div className="mt-1 text-[10px] font-black leading-5 text-slate-700 sm:text-[11px]">
              {strategy.level}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5">
            <div className="text-[9px] font-black text-slate-400">
              الفريم
            </div>
            <div
              dir="ltr"
              className="mt-1 text-right text-[10px] font-black leading-5 text-slate-700 sm:text-[11px]"
            >
              {strategy.timeframe}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5">
            <div className="text-[9px] font-black text-slate-400">
              التركيز
            </div>
            <div className="mt-1 truncate text-[10px] font-black leading-5 text-slate-700 sm:text-[11px]">
              {strategy.focus}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
          {strategy.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 sm:pt-6">
          <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-[12px] font-black text-slate-900 sm:text-[13px]">
            <span>اقرأ الدليل الكامل</span>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function StrategiesHubPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="mx-auto w-full max-w-[1520px] px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="space-y-5 sm:space-y-8">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[30px]">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-slate-950" />

            <div className="absolute -left-24 -top-24 h-[300px] w-[300px] rounded-full bg-slate-100 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-[280px] w-[280px] rounded-full bg-slate-50 blur-3xl" />

            <div className="relative grid items-center gap-7 p-5 sm:p-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:p-10 xl:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black text-slate-700">
                    دليل استراتيجيات الفوركس
                  </span>

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                    12 استراتيجية
                  </span>

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black text-slate-600">
                    من المبتدئ إلى المتقدم
                  </span>
                </div>

                <h1 className="mt-5 max-w-[900px] text-[30px] font-black leading-[1.3] tracking-[-0.025em] text-slate-950 sm:mt-6 sm:text-[40px] lg:text-[47px]">
                  استراتيجيات الفوركس:
                  <span className="block text-slate-600">
                    دليل شامل لفهم واختيار استراتيجية التداول
                  </span>
                </h1>

                <p className="mt-4 max-w-[900px] text-[14px] font-medium leading-8 text-slate-700 sm:mt-5 sm:text-[16px] sm:leading-9">
                  استكشف 12 استراتيجية فوركس في مكان واحد، من البرايس أكشن
                  والدعم والمقاومة وتقاطع المتوسطات المتحركة إلى السكالبينغ
                  والسوينغ وICT ومفاهيم الأموال الذكية وكتل الأوامر وسحب السيولة.
                  تعرّف على طريقة عمل كل استراتيجية والفريم المناسب ومستوى الخبرة
                  قبل اختيار الأسلوب الأقرب لك.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                  <a
                    href="#all-strategies"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-black text-white transition hover:bg-slate-800"
                  >
                    استكشف الاستراتيجيات
                    <span>↓</span>
                  </a>

                  <a
                    href="#choose-strategy"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-black text-slate-700 transition hover:bg-slate-50"
                  >
                    كيف أختار الاستراتيجية؟
                  </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3 lg:grid-cols-4">
                  {[
                    ["12", "أدلة استراتيجية"],
                    ["4", "أساليب رئيسية"],
                    ["متعدد", "أطر زمنية"],
                    ["عملي", "شرح خطوة بخطوة"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[16px] border border-slate-200 bg-white/80 p-3 sm:rounded-[18px] sm:p-4"
                    >
                      <div className="text-[17px] font-black text-slate-950 sm:text-[21px]">
                        {value}
                      </div>
                      <div className="mt-1 text-[10px] font-bold text-slate-500 sm:text-[12px]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto hidden w-full max-w-[520px] lg:block">
                <StrategyIcon />
              </div>
            </div>
          </section>

          {/* =================================================
              START HERE
          ================================================= */}

          <section
            id="choose-strategy"
            className="scroll-mt-24 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]"
          >
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>اختر حسب أسلوبك</SectionLabel>

              <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 lg:items-start">
                <div>
                  <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                    أي استراتيجية فوركس تناسبك؟
                  </h2>

                  <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                    لا تبدأ بالسؤال عن الاستراتيجية التي تحقق أكبر ربح. ابدأ
                    بالوقت الذي تستطيع تخصيصه للتداول، وسرعة القرارات التي
                    تناسبك، والفريم الذي تريد متابعته، ومستوى خبرتك في قراءة
                    الشارت.
                  </p>

                  <p className="mt-3 text-[14px] font-medium leading-8 text-slate-700 sm:mt-4 sm:text-[15px] sm:leading-9">
                    اختر الحالة الأقرب لك من الخيارات التالية للانتقال مباشرة
                    إلى الدليل المناسب.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      n: "01",
                      title: "أريد تداولًا سريعًا",
                      text: "إذا كنت تستطيع متابعة السوق باستمرار وتفضّل صفقات قصيرة، ابدأ بدليل السكالبينغ.",
                      strategy: "استراتيجية السكالبينغ",
                      href: "/strategies/scalping",
                    },
                    {
                      n: "02",
                      title: "لا أريد مراقبة الشاشة طوال اليوم",
                      text: "إذا كنت تفضّل صفقات تمتد لأيام بدل دقائق، تعرّف على أسلوب السوينغ.",
                      strategy: "استراتيجية السوينغ",
                      href: "/strategies/swing-trading",
                    },
                    {
                      n: "03",
                      title: "أريد فهم السعر أولًا",
                      text: "لبناء أساس واضح في الاتجاه والهيكل والمستويات ورد فعل السعر، ابدأ بالبرايس أكشن.",
                      strategy: "استراتيجية البرايس أكشن",
                      href: "/strategies/price-action",
                    },
                    {
                      n: "04",
                      title: "أريد دراسة السيولة وهيكل السوق",
                      text: "إذا كان لديك أساس جيد وتريد مفاهيم أكثر تقدمًا، ابدأ بمفاهيم الأموال الذكية.",
                      strategy: "مفاهيم الأموال الذكية SMC",
                      href: "/strategies/smart-money-concepts",
                    },
                  ].map((item) => (
                    <Link
                      key={item.n}
                      href={item.href}
                      className="group rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm sm:rounded-[20px] sm:p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-slate-700 shadow-sm">
                          {item.n}
                        </span>

                        <h3 className="text-[13px] font-black leading-6 text-slate-900 sm:text-[14px]">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-3 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                        {item.text}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-[11px] font-black text-slate-900">
                        <span>{item.strategy}</span>
                        <ArrowIcon />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              ALL STRATEGIES
          ================================================= */}

          <section
            id="all-strategies"
            className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-7 lg:p-9"
          >
            <SectionLabel>جميع الأدلة</SectionLabel>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                  استكشف استراتيجيات الفوركس
                </h2>

                <p className="mt-3 max-w-[900px] text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
                  اختر الاستراتيجية التي تريد دراستها. كل دليل يشرح المفهوم
                  وطريقة قراءة الشارت والدخول والإبطال وإدارة المخاطر والأخطاء
                  الشائعة.
                </p>
              </div>

              <div className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-black text-slate-500">
                12 دليلًا تعليميًا
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2 xl:grid-cols-3">
              {strategies.map((strategy, index) => (
                <StrategyCard
                  key={strategy.href}
                  strategy={strategy}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* =================================================
              COMPARISON
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>مقارنة سريعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                مقارنة استراتيجيات الفوركس حسب الأسلوب والفريم
              </h2>

              <p className="mt-4 max-w-[1050px] text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                المقارنة التالية لا تحدد استراتيجية أفضل من الأخرى، لكنها
                تساعدك على فهم الاختلاف في سرعة التداول ونوع التحليل ومستوى
                التعقيد. اضغط على اسم أي استراتيجية للانتقال إلى دليلها.
              </p>

              {/* DESKTOP TABLE */}

              <div className="mt-7 hidden overflow-hidden rounded-[20px] border border-slate-200 lg:block">
                <table className="w-full border-collapse text-right">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        الاستراتيجية
                      </th>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        الأسلوب
                      </th>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        الفريم
                      </th>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        المستوى
                      </th>
                      <th className="px-5 py-4 text-[12px] font-black text-slate-600">
                        التركيز
                      </th>
                      <th className="w-[90px] px-5 py-4" />
                    </tr>
                  </thead>

                  <tbody>
                    {strategies.map((strategy) => (
                      <tr
                        key={strategy.href}
                        className="border-t border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <Link
                            href={strategy.href}
                            className="group/title inline-flex items-center gap-2"
                          >
                            <span className="text-[13px] font-black text-slate-900 transition group-hover/title:text-slate-600">
                              {strategy.title}
                            </span>
                            <span className="text-slate-400 transition group-hover/title:translate-x-[-2px]">
                              <ArrowIcon />
                            </span>
                          </Link>
                        </td>

                        <td className="px-5 py-4 text-[12px] font-bold text-slate-600">
                          {strategy.style}
                        </td>

                        <td
                          dir="ltr"
                          className="px-5 py-4 text-right text-[12px] font-bold text-slate-600"
                        >
                          {strategy.timeframe}
                        </td>

                        <td className="px-5 py-4 text-[12px] font-bold text-slate-600">
                          {strategy.level}
                        </td>

                        <td className="px-5 py-4 text-[12px] font-bold text-slate-600">
                          {strategy.focus}
                        </td>

                        <td className="px-5 py-4">
                          <Link
                            href={strategy.href}
                            aria-label={`اقرأ ${strategy.title}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            <ArrowIcon />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE COMPARISON */}

              <div className="mt-6 grid gap-3 lg:hidden">
                {strategies.map((strategy) => (
                  <Link
                    key={strategy.href}
                    href={strategy.href}
                    className="rounded-[18px] border border-slate-200 bg-slate-50/40 p-4 transition active:bg-slate-100"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[14px] font-black leading-6 text-slate-900">
                        {strategy.title}
                      </h3>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                        <ArrowIcon />
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-white p-3">
                        <div className="text-[9px] font-black text-slate-400">
                          المستوى
                        </div>
                        <div className="mt-1 text-[11px] font-black text-slate-700">
                          {strategy.level}
                        </div>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <div className="text-[9px] font-black text-slate-400">
                          الفريم
                        </div>
                        <div
                          dir="ltr"
                          className="mt-1 text-right text-[11px] font-black text-slate-700"
                        >
                          {strategy.timeframe}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
                    {/* =================================================
              LEARNING PATH
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>مسار التعلم</SectionLabel>

              <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-9">
                <div>
                  <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                    من أين تبدأ إذا كنت مبتدئًا؟
                  </h2>

                  <p className="mt-4 text-[14px] font-medium leading-8 text-slate-700 sm:text-[15px] sm:leading-9">
                    لا تحاول تعلم عدد كبير من الاستراتيجيات في الوقت نفسه.
                    ابنِ فهمك على مراحل، لأن كثيرًا من الاستراتيجيات المتقدمة
                    تعتمد على فهم حركة السعر وهيكل السوق.
                  </p>

                  <Link
                    href="/learn-trading"
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-black text-slate-900 transition hover:text-slate-600 sm:mt-6"
                  >
                    العودة إلى مركز تعلم التداول
                    <ArrowIcon />
                  </Link>

                  <LearningMapGraphic />
                </div>

                <div className="space-y-3">
                  <Link
                    href="/strategies/price-action"
                    className="group flex gap-3 rounded-[18px] border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50 sm:gap-4 sm:rounded-[20px] sm:p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700 sm:h-10 sm:w-10">
                      01
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                          ابدأ باستراتيجية البرايس أكشن
                        </h3>
                        <span className="shrink-0 text-slate-400 transition group-hover:-translate-x-1">
                          <ArrowIcon />
                        </span>
                      </div>

                      <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                        افهم الاتجاه والقمم والقيعان والدعم والمقاومة قبل إضافة
                        مفاهيم أكثر تعقيدًا.
                      </p>
                    </div>
                  </Link>

                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 sm:rounded-[20px] sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700 sm:h-10 sm:w-10">
                        02
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                          اختر أسلوب التداول الذي يناسب وقتك
                        </h3>

                        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                          اختر بين التداول السريع أو الصفقات الأطول أو التداول
                          مع الاتجاه حسب الوقت الذي تستطيع تخصيصه للشارت.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Link
                            href="/strategies/scalping"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            السكالبينغ
                          </Link>

                          <Link
                            href="/strategies/swing-trading"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            السوينغ
                          </Link>

                          <Link
                            href="/strategies/trend-following"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            تتبع الاتجاه
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 sm:rounded-[20px] sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700 sm:h-10 sm:w-10">
                        03
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                          أضف أدوات التحليل
                        </h3>

                        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                          بعد فهم حركة السعر، يمكنك دراسة المؤشرات والمتوسطات
                          المتحركة والمناطق السعرية واستخدامها كجزء من السياق.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Link
                            href="/strategies/rsi"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            استراتيجية RSI
                          </Link>

                          <Link
                            href="/strategies/supply-and-demand"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            العرض والطلب
                          </Link>

                          <Link
                            href="/strategies/support-and-resistance"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            الدعم والمقاومة
                          </Link>

                          <Link
                            href="/strategies/moving-average-crossover"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            تقاطع المتوسطات
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 sm:rounded-[20px] sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-700 sm:h-10 sm:w-10">
                        04
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                          انتقل إلى مفاهيم السيولة وهيكل السوق
                        </h3>

                        <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                          بعد بناء الأساس، يصبح من الأسهل دراسة السيولة وكتل
                          الأوامر وتغيرات هيكل السوق والمفاهيم المتقدمة.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Link
                            href="/strategies/ict"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            استراتيجية ICT
                          </Link>

                          <Link
                            href="/strategies/smart-money-concepts"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            مفاهيم الأموال الذكية
                          </Link>

                          <Link
                            href="/strategies/order-blocks"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            كتل الأوامر
                          </Link>

                          <Link
                            href="/strategies/liquidity-sweep"
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-700 transition hover:bg-slate-950 hover:text-white"
                          >
                            سحب السيولة
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4 sm:gap-4 sm:rounded-[20px] sm:p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-black text-slate-700 shadow-sm sm:h-10 sm:w-10">
                      05
                    </span>

                    <div>
                      <h3 className="text-[14px] font-black text-slate-900 sm:text-[15px]">
                        حوّل ما تعلمته إلى قواعد قابلة للاختبار
                      </h3>

                      <p className="mt-2 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                        حدد شروط الدخول والإبطال والهدف والمخاطرة، ثم اختبر نفس
                        القواعد بصورة متسقة قبل تقييم الاستراتيجية.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              BUILD A STRATEGY
          ================================================= */}

          <section className="overflow-hidden rounded-[22px] border border-slate-800 bg-slate-950 text-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-black text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                خطة التداول
              </div>

              <div className="mt-4 grid gap-5 lg:mt-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-8">
                <div>
                  <h2 className="text-[22px] font-black leading-[1.4] sm:text-[30px]">
                    أي استراتيجية تحتاج إلى قواعد واضحة
                  </h2>

                  <p className="mt-3 text-[13px] font-medium leading-7 text-slate-300 sm:mt-4 sm:text-[15px] sm:leading-9">
                    معرفة اسم الاستراتيجية لا تكفي. حدد سبب الدخول والإبطال
                    والمخاطرة والخروج قبل تنفيذ الصفقة.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {[
                    ["01", "السياق", "حالة السوق؟"],
                    ["02", "المنطقة", "أين تراقب؟"],
                    ["03", "التأكيد", "شرط الدخول؟"],
                    ["04", "الإبطال", "متى تفشل؟"],
                    ["05", "المخاطرة", "كم تخاطر؟"],
                    ["06", "الخروج", "أين تغلق؟"],
                  ].map(([n, title, text]) => (
                    <div
                      key={n}
                      className="rounded-[15px] border border-white/10 bg-white/[0.04] p-3 sm:rounded-[18px] sm:p-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[9px] font-black text-slate-300 sm:h-8 sm:w-8">
                          {n}
                        </span>

                        <h3 className="text-[12px] font-black text-white sm:text-[13px]">
                          {title}
                        </h3>
                      </div>

                      <p className="mt-2 text-[10px] font-medium leading-5 text-slate-400 sm:mt-3 sm:text-[12px] sm:leading-7">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              KEY PRINCIPLES
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>قبل التداول</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                6 قواعد أهم من البحث عن استراتيجية سحرية
              </h2>

              <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "افهم لماذا تدخل الصفقة قبل الضغط على شراء أو بيع.",
                  "حدد وقف الخسارة قبل الدخول وليس بعد تحرك السعر ضدك.",
                  "اجعل حجم الصفقة متوافقًا مع مقدار المخاطرة المحدد.",
                  "لا تغيّر قواعد الاستراتيجية بعد رؤية نتيجة الصفقة.",
                  "اختبر نفس القواعد على عدد كافٍ من الحالات السابقة.",
                  "قيّم الاستراتيجية كسلسلة صفقات وليس من صفقة واحدة.",
                ].map((text, index) => (
                  <div
                    key={text}
                    className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/50 p-4"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                      <CheckIcon />
                    </span>

                    <div>
                      <div className="text-[9px] font-black text-slate-400">
                        0{index + 1}
                      </div>
                      <p className="mt-1 text-[12px] font-bold leading-7 text-slate-700 sm:text-[13px] sm:leading-8">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              FAQ
          ================================================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
            <div className="p-5 sm:p-7 lg:p-9">
              <SectionLabel>الأسئلة الشائعة</SectionLabel>

              <h2 className="text-[23px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950 sm:text-[30px]">
                أسئلة شائعة عن استراتيجيات الفوركس
              </h2>

              <p className="mt-4 max-w-[950px] text-[14px] font-medium leading-8 text-slate-600 sm:text-[15px]">
                إجابات مختصرة على أهم الأسئلة حول اختيار الاستراتيجية ومدة
                التداول ومستوى الخبرة واختبار خطة التداول.
              </p>

              <div className="mt-6 grid gap-3 sm:mt-7 lg:grid-cols-2">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="group rounded-[18px] border border-slate-200 bg-slate-50/40 p-4 open:bg-white sm:p-5"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[9px] font-black text-slate-700 shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="pt-0.5 text-[13px] font-black leading-6 text-slate-900 sm:text-[14px]">
                          {item.question}
                        </h3>
                      </div>

                      <span className="mt-1 text-lg font-light text-slate-400 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <p className="mt-4 border-t border-slate-100 pt-4 text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              NEXT STEP
          ================================================= */}

          <section className="relative overflow-hidden rounded-[22px] border border-slate-800 bg-slate-950 shadow-sm sm:rounded-[28px]">
            <div className="absolute -left-20 -top-20 h-[220px] w-[220px] rounded-full bg-white/[0.04] blur-3xl" />

            <div className="relative p-5 text-white sm:p-8 lg:p-9">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-7">
                <div>
                  <div className="text-[9px] font-black text-slate-400 sm:text-[10px]">
                    الخطوة التالية
                  </div>

                  <h2 className="mt-2 text-[22px] font-black leading-[1.4] sm:mt-3 sm:text-[30px]">
                    ابدأ باستراتيجية واحدة وابنِ عليها
                  </h2>

                  <p className="mt-3 max-w-[850px] text-[13px] font-medium leading-7 text-slate-300 sm:mt-4 sm:text-[15px] sm:leading-9">
                    إذا كنت في البداية، ننصحك أولًا بفهم حركة السعر وهيكل السوق
                    قبل الانتقال إلى الاستراتيجيات والمفاهيم الأكثر تعقيدًا.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row lg:flex-col xl:flex-row">
                  <Link
                    href="/strategies/price-action"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-center text-[11px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-[48px] sm:px-5 sm:text-[13px]"
                  >
                    ابدأ بالبرايس أكشن
                    <ArrowIcon />
                  </Link>

                  <Link
                    href="/learn-trading"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-3 py-3 text-center text-[11px] font-black text-white transition hover:bg-white/10 sm:min-h-[48px] sm:px-5 sm:text-[13px]"
                  >
                    مركز تعلم التداول
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <div className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-[12px] font-medium leading-7 text-slate-500 sm:px-5 sm:text-[13px] sm:leading-8">
            <strong className="text-slate-700">تنبيه:</strong> المحتوى الموجود في
            أدلة استراتيجيات الفوركس والتداول تعليمي ولا يمثل توصية استثمارية
            أو إشارة شراء أو بيع. لا توجد استراتيجية تضمن الربح، وقد يؤدي
            التداول بالرافعة المالية إلى خسائر كبيرة. اختبر أي استراتيجية
            وافهم مخاطرها قبل استخدام أموال حقيقية.
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