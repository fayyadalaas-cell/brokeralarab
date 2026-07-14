import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/learn-trading/margin-call";

const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/margin-call";

const PAGE_TITLE =
  "ما هو نداء الهامش؟ شرح Margin Call وStop Out وكيف تتجنبه";

const PAGE_DESCRIPTION =
  "تعرف على معنى نداء الهامش Margin Call، وكيف يُحسب مستوى الهامش، والفرق بين Margin Call وStop Out، وأسباب تصفية الصفقات وكيفية حماية حساب التداول.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
    languages: {
      ar: PAGE_URL,
      en: ENGLISH_PAGE_URL,
      "x-default": ENGLISH_PAGE_URL,
    },
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Broker Alarab",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
    type: "article",
  },

  robots: {
    index: true,
    follow: true,
  },

  keywords: [
    "ما هو نداء الهامش",
    "نداء الهامش",
    "Margin Call",
    "شرح Margin Call",
    "نداء الهامش في الفوركس",
    "كيف يحدث نداء الهامش",
    "كيف أتجنب نداء الهامش",
    "مستوى الهامش",
    "Margin Level",
    "Stop Out",
    "مستوى Stop Out",
    "الفرق بين Margin Call و Stop Out",
    "إغلاق الصفقات تلقائيا",
    "تصفية الصفقات",
    "الهامش المستخدم",
    "الهامش الحر",
    "حقوق الملكية في التداول",
    "Equity",
    "Free Margin",
    "Used Margin",
    "الرافعة المالية ونداء الهامش",
    "حماية حساب التداول",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هو نداء الهامش؟" },
  { id: "how-it-works", label: "كيف يحدث؟" },
  { id: "example", label: "مثال عملي" },
  { id: "margin-level", label: "مراحل مستوى الهامش" },
  { id: "stop-out", label: "Margin Call وStop Out" },
  { id: "avoid", label: "كيف تتجنبه؟" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const marginLevelStages = [
  {
    title: "مستوى هامش مريح",
    subtitle: "Healthy Margin",
    description:
      "تكون حقوق الملكية أعلى بكثير من الهامش المستخدم، ويملك الحساب هامشًا حرًا يسمح بتحمل جزء من تقلبات السوق دون الاقتراب من مستويات التحذير.",
    points: [
      "هامش حر متاح لإدارة تقلبات السوق.",
      "مسافة أكبر عن مستوى Margin Call.",
      "مرونة أعلى في إدارة المراكز المفتوحة.",
    ],
    badge: "وضع مستقر",
  },
  {
    title: "منطقة التحذير",
    subtitle: "Margin Warning",
    description:
      "تنخفض حقوق الملكية نتيجة الخسائر العائمة، ويبدأ مستوى الهامش بالاقتراب من النسبة التي يحددها الوسيط لإرسال تنبيه Margin Call.",
    points: [
      "انخفاض واضح في الهامش الحر.",
      "الحساب أكثر حساسية لأي خسارة إضافية.",
      "الحاجة إلى تخفيض التعرض بسرعة.",
    ],
    badge: "مراقبة مطلوبة",
  },
  {
    title: "منطقة التصفية",
    subtitle: "Stop Out Risk",
    description:
      "يصل مستوى الهامش إلى حد منخفض يسمح للوسيط ببدء إغلاق بعض المراكز تلقائيًا لمنع استمرار تدهور حقوق الملكية.",
    points: [
      "احتمال الإغلاق الإجباري مرتفع.",
      "قد تُغلق الصفقة الأكثر خسارة أولًا.",
      "قد يفقد المتداول السيطرة على توقيت الخروج.",
    ],
    badge: "خطر مرتفع",
  },
];

const marginCallFactors = [
  {
    icon: "📉",
    title: "تراكم الخسائر العائمة",
    description:
      "تقل حقوق الملكية كلما زادت الخسائر المفتوحة. ومع انخفاض Equity ينخفض مستوى الهامش حتى لو لم يتم إغلاق الصفقات بعد.",
  },
  {
    icon: "📦",
    title: "حجم صفقات أكبر من الحساب",
    description:
      "استخدام لوت كبير يرفع قيمة الربح والخسارة لكل نقطة، وقد يجعل حركة سعرية محدودة كافية لاستهلاك الهامش الحر بسرعة.",
  },
  {
    icon: "⚙️",
    title: "استخدام رافعة مالية مرتفعة",
    description:
      "الرافعة لا تسبب الخسارة وحدها، لكنها تسمح بفتح تعرض كبير مقارنة برأس المال، مما يزيد سرعة تدهور الحساب عند تحرك السعر عكس المراكز.",
  },
  {
    icon: "🌪️",
    title: "التقلب والانزلاق السعري",
    description:
      "قد تؤدي الأخبار والفجوات والحركات السريعة إلى خسائر أكبر من المتوقع، خصوصًا إذا تم تنفيذ أوامر الخروج عند أسعار مختلفة.",
  },
];

const commonMistakes = [
  {
    title: "مراقبة الرصيد بدل حقوق الملكية",
    description:
      "الرصيد لا يعكس الخسائر العائمة، بينما تعتمد نسبة الهامش على Equity التي تتغير مع حركة الصفقات المفتوحة.",
  },
  {
    title: "فتح عدة صفقات مترابطة",
    description:
      "قد تبدو المراكز منفصلة، لكنها تتحرك في الاتجاه نفسه وتضاعف التعرض والخسارة عند حدوث حركة قوية.",
  },
  {
    title: "ترك الصفقات دون وقف خسارة",
    description:
      "غياب مستوى خروج محدد يسمح للخسائر بالنمو حتى يقترب الحساب من Margin Call أو Stop Out.",
  },
  {
    title: "إضافة أموال دون تقليل المخاطرة",
    description:
      "إيداع أموال إضافية قد يرفع مستوى الهامش مؤقتًا، لكنه لا يحل مشكلة حجم المراكز أو ضعف إدارة المخاطر.",
  },
];

const faqItems = [
  {
    question: "ما هو نداء الهامش Margin Call؟",
    answer:
      "نداء الهامش هو تحذير يظهر عندما تنخفض حقوق الملكية في حساب التداول ويصل مستوى الهامش إلى نسبة يحددها الوسيط. يشير التنبيه إلى أن الحساب لم يعد يملك هامشًا حرًا كافيًا لتحمل خسائر إضافية.",
  },
  {
    question: "كيف يتم حساب مستوى الهامش؟",
    answer:
      "يُحسب مستوى الهامش عادة بقسمة حقوق الملكية على الهامش المستخدم ثم ضرب النتيجة في 100. لذلك ينخفض مستوى الهامش عندما تقل حقوق الملكية أو يرتفع الهامش المستخدم.",
  },
  {
    question: "هل يعني Margin Call إغلاق الصفقات مباشرة؟",
    answer:
      "ليس بالضرورة. Margin Call غالبًا مرحلة تحذير، بينما يبدأ الإغلاق التلقائي عند الوصول إلى مستوى Stop Out المحدد في شروط حساب الوسيط.",
  },
  {
    question: "ما الفرق بين Margin Call وStop Out؟",
    answer:
      "Margin Call هو تنبيه بانخفاض مستوى الهامش، أما Stop Out فهو المستوى الذي قد تبدأ عنده المنصة بإغلاق بعض الصفقات تلقائيًا لتقليل الهامش المستخدم والخطر على الحساب.",
  },
  {
    question: "هل يمكن تجنب نداء الهامش بإضافة أموال؟",
    answer:
      "إضافة الأموال قد ترفع حقوق الملكية والهامش الحر، لكنها لا تعالج السبب الأساسي إذا كان حجم الصفقات كبيرًا أو الخسائر مستمرة. تقليل التعرض وإدارة المخاطر أكثر أهمية.",
  },
  {
    question: "ما النسبة التي يحدث عندها Margin Call؟",
    answer:
      "لا توجد نسبة موحدة لجميع الوسطاء. قد يحدد وسيط Margin Call عند 100% وآخر عند مستوى مختلف، كما يختلف Stop Out حسب نوع الحساب والجهة المنظمة وشروط الشركة.",
  },
  {
    question: "هل يمكن أن يصبح الرصيد موجبًا والحساب عند Margin Call؟",
    answer:
      "نعم. الرصيد لا يشمل نتيجة الصفقات المفتوحة، بينما حقوق الملكية تشمل الخسائر والأرباح العائمة. لذلك قد يكون الرصيد موجبًا لكن Equity منخفضة جدًا.",
  },
];

const relatedGuides = [
  {
    title: "ما هو الهامش؟",
    description:
      "تعرف على الهامش المستخدم والهامش الحر ومستوى الهامش في حساب التداول.",
    href: "/learn-trading/margin",
  },
  {
    title: "ما هي الرافعة المالية؟",
    description:
      "افهم كيف تسمح الرافعة بفتح مراكز أكبر ولماذا تزيد حساسية الحساب للمخاطر.",
    href: "/learn-trading/leverage",
  },
  {
    title: "ما هو وقف الخسارة؟",
    description:
      "تعرف على كيفية تحديد مستوى خروج يساعد على منع تراكم الخسائر المفتوحة.",
    href: "/learn-trading/stop-loss",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
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
      name: "تعلم التداول",
      item: "https://brokeralarab.com/learn-trading",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "نداء الهامش",
      item: PAGE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  url: PAGE_URL,
  inLanguage: "ar",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  url: PAGE_URL,
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "ar",

  author: {
    "@id": "https://brokeralarab.com/#organization",
  },

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },

  isPartOf: {
    "@id": "https://brokeralarab.com/#website",
  },

  publisher: {
    "@id": "https://brokeralarab.com/#organization",
  },

  about: [
    {
      "@type": "Thing",
      name: "نداء الهامش",
    },
    {
      "@type": "Thing",
      name: "Margin Call",
    },
    {
      "@type": "Thing",
      name: "مستوى الهامش",
    },
    {
      "@type": "Thing",
      name: "Stop Out",
    },
    {
      "@type": "Thing",
      name: "حقوق الملكية في التداول",
    },
    {
      "@type": "Thing",
      name: "إدارة مخاطر الفوركس",
    },
  ],

  keywords: [
    "نداء الهامش",
    "Margin Call",
    "Margin Level",
    "Stop Out",
    "الهامش المستخدم",
    "الهامش الحر",
    "Equity",
    "تصفية الصفقات",
    "إدارة المخاطر",
  ],

  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "ar",

  isPartOf: {
    "@id": "https://brokeralarab.com/#website",
  },

  publisher: {
    "@id": "https://brokeralarab.com/#organization",
  },

  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },

  mainEntity: {
    "@id": `${PAGE_URL}#article`,
  },
};

export default function MarginCallPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="margin-call-ar-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="margin-call-ar-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="margin-call-ar-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="margin-call-ar-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs font-bold text-slate-500 sm:px-6 lg:px-8">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand-500"
          >
            الرئيسية
          </Link>

          <span className="text-slate-300">/</span>

          <Link
            href="/learn-trading"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand-500"
          >
            تعلم التداول
          </Link>

          <span className="text-slate-300">/</span>

          <span className="text-slate-800">
            نداء الهامش
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-rose-100/60 blur-3xl" />

        <div className="absolute bottom-[-140px] left-[-80px] h-[320px] w-[320px] rounded-full bg-amber-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                دليل حماية حساب التداول
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                مدة القراءة: 11 دقيقة
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
              ما هو نداء الهامش؟

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                شرح Margin Call وStop Out وكيفية حماية الحساب
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              يحدث نداء الهامش عندما تنخفض حقوق الملكية في حساب التداول
              ويقترب مستوى الهامش من الحد الذي يحدده الوسيط. في هذا الدليل
              ستتعرف على طريقة حساب Margin Level، والفرق بين Margin Call
              وStop Out، وكيف تؤدي الخسائر والرافعة وحجم اللوت إلى تصفية
              الصفقات.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                ابدأ الشرح
              </a>

              <Link
                href="/tools/margin-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                حاسبة الهامش
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                معادلة مستوى الهامش
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                مثال رقمي واضح
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                طرق الوقاية
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    مثال على حساب معرض للخطر
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    Margin Level
                  </h2>
                </div>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700">
                  Margin Warning
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
                    حقوق الملكية
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $1,000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    EQUITY
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-amber-700 sm:min-h-0 sm:text-xs">
                    الهامش المستخدم
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $800
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    USED MARGIN
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-rose-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-rose-600">
                    مستوى الهامش
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    125%
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  أي خسائر إضافية قد تدفع الحساب إلى منطقة الخطر
                </p>

                <p className="mt-1 text-2xl font-black">
                  الهامش الحر محدود
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tablet and desktop navigation */}
      <div className="sticky top-0 z-30 hidden border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur sm:block">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <nav
            aria-label="محتويات الصفحة"
            className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="w-full min-w-0 space-y-7">
            {/* Definition */}
            <section
              id="definition"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="01"
                eyebrow="معنى نداء الهامش"
                title="ماذا يعني Margin Call في حساب التداول؟"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  نداء الهامش هو تنبيه يظهر عندما تنخفض حقوق الملكية في
                  الحساب مقارنة بالهامش المستخدم لفتح الصفقات. يحدث ذلك غالبًا
                  نتيجة تراكم الخسائر العائمة أو فتح مراكز كبيرة تستهلك نسبة
                  مرتفعة من الأموال المتاحة.
                </p>

                <p>
                  لا يعتمد نداء الهامش على الرصيد وحده، بل على Equity التي
                  تشمل الرصيد مضافًا إليه نتيجة الصفقات المفتوحة. لذلك قد يكون
                  رصيد الحساب جيدًا، بينما يكون مستوى الهامش منخفضًا بسبب
                  خسائر لم تُغلق بعد.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: Margin Call هو تحذير بأن الخسائر المفتوحة استهلكت
                  جزءًا كبيرًا من قدرة الحساب على دعم المراكز الحالية، وأن
                  استمرار السوق ضدك قد يؤدي إلى Stop Out.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Equity"
                  title="حقوق الملكية"
                  description="الرصيد مضافًا إليه الأرباح أو الخسائر العائمة للصفقات المفتوحة."
                />

                <MiniDefinition
                  label="Used Margin"
                  title="الهامش المستخدم"
                  description="المبلغ المحجوز لدعم المراكز المفتوحة بالرافعة المالية."
                />

                <MiniDefinition
                  label="Margin Level"
                  title="مستوى الهامش"
                  description="النسبة التي تقارن حقوق الملكية بالهامش المستخدم."
                />
              </div>
            </section>

            {/* How it works */}
            <section
              id="how-it-works"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="02"
                eyebrow="آلية الحساب"
                title="كيف يحدث Margin Call عند انخفاض مستوى الهامش؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                تراقب منصة التداول حقوق الملكية والهامش المستخدم بصورة
                مستمرة. عندما تتحرك الصفقات ضد المتداول، تنخفض Equity، بينما
                يظل الهامش المستخدم مرتبطًا بالمراكز المفتوحة. يؤدي ذلك إلى
                انخفاض Margin Level حتى يصل إلى نسبة التحذير المحددة لدى
                الوسيط.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  مستوى الهامش = حقوق الملكية ÷ الهامش المستخدم × 100
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="حقوق الملكية"
                    value="$1,000"
                    sublabel="EQUITY"
                  />

                  <CalculationBox
                    label="الهامش المستخدم"
                    value="$800"
                    sublabel="USED MARGIN"
                  />

                  <CalculationBox
                    label="مستوى الهامش"
                    value="125%"
                    sublabel="MARGIN LEVEL"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  كيف تتدهور النسبة؟
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="يفتح المتداول مراكز تستهلك 800 دولار من الهامش المستخدم."
                  />

                  <Step
                    number="2"
                    text="تنخفض حقوق الملكية إلى 1,000 دولار بسبب الخسائر العائمة."
                  />

                  <Step
                    number="3"
                    text="يصبح مستوى الهامش 125% وقد يقترب من نسبة Margin Call لدى الوسيط."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    نسبة Margin Call تختلف من وسيط إلى آخر
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  قد يحدد وسيط مرحلة التحذير عند مستوى 100%، بينما يستخدم
                  وسيط آخر نسبة مختلفة. كما قد يختلف مستوى Stop Out بين
                  الحسابات، لذلك يجب مراجعة مواصفات الحساب قبل التداول.
                </p>
              </div>
            </section>

            {/* Practical example */}
            <section
              id="example"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="03"
                eyebrow="مثال عملي"
                title="كيف تنتقل الصفقة من خسارة عائمة إلى خطر Stop Out؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لنفترض أن رصيد الحساب يبلغ 5,000 دولار، وأن المتداول فتح
                عدة صفقات تستخدم هامشًا بقيمة 2,000 دولار. بعد تحرك السوق
                ضده، وصلت الخسائر العائمة إلى 3,000 دولار.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="الرصيد"
                  value="$5,000"
                />

                <StatCard
                  label="الخسائر العائمة"
                  value="-$3,000"
                />

                <StatCard
                  label="حقوق الملكية"
                  value="$2,000"
                />

                <StatCard
                  label="الهامش المستخدم"
                  value="$2,000"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  حساب مستوى الهامش
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      حقوق الملكية
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $2,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      $5,000 − $3,000
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      الهامش المستخدم
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $2,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      OPEN POSITIONS
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      مستوى الهامش
                    </p>

                    <p className="mt-2 text-xl font-black text-rose-600">
                      100%
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      MARGIN CALL ZONE
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    ⚠️
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    أي خسارة إضافية قد تبدأ مرحلة الإغلاق الإجباري
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  إذا كان Stop Out لدى الوسيط عند 50%، فلن يبدأ الإغلاق عند
                  100% مباشرة، لكن الحساب أصبح في منطقة خطرة. استمرار
                  الخسائر يخفض Equity حتى تصل نسبة الهامش إلى حد التصفية.
                </p>
              </div>
            </section>
                        {/* Margin level stages */}
            <section
              id="margin-level"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="مراحل الحساب"
                title="كيف تتغير حالة الحساب مع انخفاض مستوى الهامش؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                مستوى الهامش ليس رقمًا ثابتًا، بل يتغير مع حركة الصفقات
                المفتوحة. كلما انخفضت حقوق الملكية مقارنة بالهامش المستخدم،
                انتقل الحساب من وضع مريح إلى منطقة التحذير، ثم إلى مستوى
                Stop Out إذا استمرت الخسائر.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {marginLevelStages.map((stage, index) => (
                  <details
                    key={stage.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            {stage.title}
                          </h3>

                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                            {stage.badge}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {stage.subtitle}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {stage.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {stage.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-[12px] font-bold leading-6 text-slate-700"
                          >
                            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[9px] text-brand-600">
                              ✓
                            </span>

                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>

              {/* Tablet and desktop */}
              <div className="mt-6 hidden items-stretch gap-4 sm:grid lg:grid-cols-3">
                {marginLevelStages.map((stage) => (
                  <div
                    key={stage.title}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
                        {stage.badge}
                      </span>

                      <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
                        {stage.subtitle}
                      </span>
                    </div>

                    <div className="min-h-[66px] pt-4">
                      <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:text-[19px]">
                        {stage.title}
                      </h3>
                    </div>

                    <div className="flex-1 pb-5 pt-2">
  <p className="text-sm font-medium leading-7 text-slate-600">
    {stage.description}
  </p>
</div>

<ul className="mt-auto grid min-h-[156px] grid-rows-3 gap-2 border-t border-slate-200 pt-4">
  {stage.points.map((point) => (
    <li
      key={point}
      className="flex min-h-[44px] items-start gap-2.5 text-sm font-bold leading-6 text-slate-700"
    >
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[9px] text-brand-600">
                            ✓
                          </span>

                          <span className="min-w-0 flex-1">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Comparison table */}
              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    حالة الحساب
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    هامش مريح
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Margin Call
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    Stop Out
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <MarginStageComparisonRow
                    title="حقوق الملكية"
                    healthy="مرتفعة نسبيًا"
                    warning="منخفضة"
                    danger="منخفضة جدًا"
                  />

                  <MarginStageComparisonRow
                    title="الهامش الحر"
                    healthy="متاح"
                    warning="محدود"
                    danger="شبه منعدم"
                  />

                  <MarginStageComparisonRow
                    title="وضع الصفقات"
                    healthy="طبيعي"
                    warning="تحت المراقبة"
                    danger="إغلاق تلقائي محتمل"
                  />

                  <MarginStageComparisonRow
                    title="الإجراء المطلوب"
                    healthy="إدارة عادية"
                    warning="تقليل التعرض"
                    danger="تدخل فوري"
                  />
                </div>
              </div>
            </section>

            {/* Margin Call vs Stop Out */}
            <section
              id="stop-out"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="مرحلة التصفية"
                title="ما الفرق بين Margin Call وStop Out؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                يخلط كثير من المتداولين بين المصطلحين، لكن Margin Call
                عادةً يمثل مرحلة تحذير، بينما Stop Out هو المستوى الذي قد
                يبدأ عنده الوسيط بإغلاق المراكز تلقائيًا. تختلف النسب
                الدقيقة حسب نوع الحساب وشروط الوسيط.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ⚠️
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      Margin Call
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "تنبيه بانخفاض مستوى الهامش.",
                      "قد يتوقف فتح صفقات جديدة.",
                      "لا يعني الإغلاق الإجباري بالضرورة.",
                      "يمنح المتداول فرصة لتقليل المخاطرة.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700"
                      >
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] text-amber-700">
                          !
                        </span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ✕
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      Stop Out
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "مستوى يبدأ عنده الإغلاق التلقائي.",
                      "قد تُغلق أكثر الصفقات خسارة أولًا.",
                      "الهدف هو تقليل الهامش المستخدم.",
                      "قد يستمر الإغلاق حتى ترتفع النسبة.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700"
                      >
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[9px] text-rose-700">
                          !
                        </span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  مثال توضيحي: Margin Call عند 100% وStop Out عند 50%
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="مرحلة التحذير"
                    value="100%"
                    sublabel="MARGIN CALL"
                  />

                  <CalculationBox
                    label="مرحلة الإغلاق"
                    value="50%"
                    sublabel="STOP OUT"
                  />

                  <CalculationBox
                    label="الفرق بينهما"
                    value="50 نقطة"
                    sublabel="PERCENTAGE POINTS"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    إغلاق صفقة واحدة قد لا يكون كافيًا
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  بعد إغلاق إحدى الصفقات، ينخفض الهامش المستخدم وقد يتحسن
                  Margin Level. لكن إذا بقيت حقوق الملكية منخفضة، قد تستمر
                  المنصة في إغلاق مراكز أخرى حتى يعود الحساب فوق مستوى
                  Stop Out.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  هل يختار المتداول الصفقة التي تُغلق أولًا؟
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  في مرحلة Stop Out يطبق الوسيط نظامه الآلي، وقد يبدأ بإغلاق
                  الصفقة الأكثر خسارة أو أكبر مركز أو حسب ترتيب آخر موضح في
                  شروط الحساب. لذلك لا ينبغي انتظار هذه المرحلة لاتخاذ قرار
                  الخروج.
                </p>
              </div>
            </section>

            {/* How to avoid */}
            <section
              id="avoid"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="حماية الحساب"
                title="كيف تتجنب نداء الهامش وتقلل خطر Stop Out؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                الوقاية من Margin Call تبدأ قبل فتح الصفقة، وليس بعد وصول
                الحساب إلى منطقة الخطر. يجب ضبط حجم اللوت، ونسبة المخاطرة،
                وعدد المراكز المفتوحة بما يتناسب مع رأس المال وتقلب الأداة.
              </p>

              {/* Mobile factors */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {marginCallFactors.map((factor) => (
                  <details
                    key={factor.title}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                          {factor.icon}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {factor.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-brand-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {factor.description}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Desktop factors */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {marginCallFactors.map((factor) => (
                  <div
                    key={factor.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        {factor.icon}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-950">
                          {factor.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {factor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  خطوات عملية لتقليل خطر نداء الهامش
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "حدد نسبة مخاطرة ثابتة لكل صفقة.",
                    "استخدم حجم لوت يناسب رصيد الحساب.",
                    "ضع وقف خسارة قبل فتح المركز.",
                    "تجنب تكديس صفقات تتحرك في الاتجاه نفسه.",
                    "راقب Equity وFree Margin باستمرار.",
                    "راجع مستوى Margin Call وStop Out لدى الوسيط.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-xl bg-white/10 p-3 text-sm font-bold leading-6 text-slate-200"
                    >
                      <span className="text-sky-300">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/tools/margin-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    استخدم حاسبة الهامش
                  </Link>

                  <Link
                    href="/tools/risk-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    احسب حجم المخاطرة
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  هل إضافة أموال جديدة هي الحل الأفضل؟
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  الإيداع الإضافي يرفع Equity والهامش الحر، لكنه قد يؤجل
                  المشكلة فقط إذا بقيت المراكز كبيرة والخسائر مستمرة.
                  أحيانًا يكون تقليل التعرض أو إغلاق جزء من المراكز أكثر
                  فاعلية من زيادة رأس المال المعرض للخطر.
                </p>
              </div>
            </section>

            {/* Common mistakes */}
            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8">
              <SectionHeading
                number="07"
                eyebrow="أخطاء إدارة الهامش"
                title="ما الأخطاء التي تسرّع الوصول إلى Margin Call؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                الوصول إلى نداء الهامش لا ينتج غالبًا عن حركة واحدة فقط، بل
                عن مجموعة أخطاء مثل تضخيم حجم الصفقات، وإهمال Equity،
                وفتح مراكز مترابطة، وتأجيل الخروج من الصفقة الخاسرة.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {commonMistakes.map((mistake, index) => (
                  <details
                    key={mistake.title}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[11px] font-black text-rose-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {mistake.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-brand-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {mistake.description}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Desktop */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {commonMistakes.map((mistake, index) => (
                  <div
                    key={mistake.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-xs font-black text-rose-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-950">
                          {mistake.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {mistake.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-lg">
                    ⚠️
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    لا تنتظر وصول الحساب إلى Stop Out لاتخاذ القرار
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  عند بدء الإغلاق الإجباري يفقد المتداول التحكم الكامل في
                  توقيت الخروج وترتيب الصفقات. الأفضل وضع قواعد مسبقة لتقليل
                  المراكز قبل الوصول إلى مستوى التصفية.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section
              id="faq"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="08"
                eyebrow="أسئلة المتداولين"
                title="الأسئلة الشائعة عن نداء الهامش وStop Out"
              />

              <div className="mt-6 space-y-3">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-black leading-7 text-slate-950 transition hover:bg-white sm:px-5 sm:py-5 sm:text-base">
                      <span className="flex items-center gap-3">
                        <span className="hidden h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500 sm:block" />
                        <span>{item.question}</span>
                      </span>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4 text-sm font-medium leading-7 text-slate-600 sm:px-5 sm:py-5 sm:text-[15px] sm:leading-8">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related guides */}
            <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8">
              <div className="text-center">
                <span className="inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-[11px]">
                  واصل التعلم
                </span>

                <h2 className="mt-3 text-[24px] font-black leading-[1.35] text-slate-950 sm:text-3xl">
                  مفاهيم مرتبطة بنداء الهامش
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  فهم الهامش والرافعة المالية ووقف الخسارة يساعدك على إدارة
                  التعرض ومنع الخسائر العائمة من دفع الحساب نحو Margin Call.
                </p>
              </div>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3.5 transition hover:border-brand-200 hover:bg-brand-50/50"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[16px] font-black leading-6 text-slate-950 transition group-hover:text-brand-600">
                        {guide.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-[12px] font-medium leading-5 text-slate-600">
                        {guide.description}
                      </p>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-base font-black text-brand-500 shadow-sm transition group-hover:border-brand-200 group-hover:bg-brand-50">
                      ←
                    </span>
                  </Link>
                ))}
              </div>

              {/* Tablet and desktop */}
              <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[20px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-black leading-9 text-slate-950 transition group-hover:text-brand-600">
                        {guide.title}
                      </h3>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-black text-brand-500 shadow-sm transition group-hover:border-brand-200 group-hover:bg-brand-50">
                        ←
                      </div>
                    </div>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                      {guide.description}
                    </p>

                    <span className="mt-4 inline-flex text-sm font-black text-brand-500">
                      قراءة الدليل
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          {/* Desktop sidebar */}
          <aside className="hidden min-w-0 lg:sticky lg:top-24 lg:block lg:w-[300px]">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-black text-brand-500">
                في هذا الدليل
              </p>

              <h2 className="mt-2 text-lg font-black text-slate-950">
                محتويات الصفحة
              </h2>

              <nav className="mt-4 space-y-1.5">
                {tableOfContents.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-600"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-4 overflow-hidden rounded-[24px] bg-gradient-to-br from-brand-600 to-slate-950 p-5 text-white shadow-[0_18px_50px_rgba(30,91,184,0.22)]">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-black text-sky-100">
                أداة مجانية
              </span>

              <h2 className="mt-3 text-xl font-black">
                احسب الهامش المطلوب
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                استخدم حجم الصفقة والرافعة وسعر الأداة لمعرفة مقدار الهامش
                المطلوب قبل فتح المركز.
              </p>

              <Link
                href="/tools/margin-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                فتح حاسبة الهامش
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14 lg:px-8">
          <div className="overflow-hidden rounded-[24px] bg-slate-950 px-4 py-6 text-center text-white sm:rounded-[34px] sm:px-10 sm:py-12">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black text-sky-200 sm:text-[11px]">
              الخطوة التالية
            </span>

            <h2 className="mx-auto mt-3 max-w-3xl text-[24px] font-black leading-[1.35] sm:mt-4 sm:text-3xl sm:leading-tight">
              راقب مستوى الهامش قبل أن يصل الحساب إلى الخطر
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              لا تنتظر ظهور Margin Call. راقب Equity والهامش الحر، واستخدم
              حجم لوت مناسبًا ووقف خسارة واضحًا لتقليل احتمال الإغلاق
              الإجباري.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/tools/margin-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                حاسبة الهامش
              </Link>

              <Link
                href="/learn-trading/margin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                دليل الهامش
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
}: {
  number: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-0 sm:gap-4">
      <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white shadow-[0_8px_20px_rgba(30,91,184,0.20)] sm:flex">
        {number}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black text-brand-500 sm:text-xs">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-[25px] font-black leading-[1.3] text-slate-950 sm:text-3xl sm:leading-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}

function MiniDefinition({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 sm:block sm:p-4">
      <span className="inline-flex h-8 min-w-14 shrink-0 items-center justify-center rounded-xl bg-white px-2 text-[9px] font-black uppercase text-brand-500 shadow-sm sm:h-auto sm:min-w-0 sm:justify-start sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-[10px]">
        {label}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-black leading-6 text-slate-950 sm:mt-3 sm:text-base">
          {title}
        </h3>

        <p className="mt-0.5 text-[12px] font-medium leading-5 text-slate-600 sm:mt-1.5 sm:text-sm sm:leading-6">
          {description}
        </p>
      </div>
    </div>
  );
}

function CalculationBox({
  label,
  value,
  sublabel,
  highlighted = false,
}: {
  label: string;
  value: string;
  sublabel: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`border-b border-slate-200 p-5 text-center last:border-b-0 sm:border-b-0 sm:border-l sm:last:border-l-0 ${
        highlighted ? "bg-brand-50" : "bg-white"
      }`}
    >
      <p className="text-xs font-bold text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-black ${
          highlighted ? "text-brand-600" : "text-slate-950"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] font-black uppercase text-slate-400">
        {sublabel}
      </p>
    </div>
  );
}

function Step({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-[11px] font-black text-white sm:text-xs">
        {number}
      </span>

      <p className="min-w-0 flex-1 pt-0.5 text-[13px] font-bold leading-6 text-slate-700 sm:text-sm">
        {text}
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center ${
        accent
          ? "border-brand-200 bg-brand-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className="text-[11px] font-bold text-slate-500 sm:text-xs">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-black sm:text-xl ${
          accent ? "text-brand-600" : "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function MarginStageComparisonRow({
  title,
  healthy,
  warning,
  danger,
}: {
  title: string;
  healthy: string;
  warning: string;
  danger: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {healthy}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {warning}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {danger}
      </div>
    </div>
  );
}