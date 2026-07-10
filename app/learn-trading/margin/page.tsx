import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL = "https://brokeralarab.com/learn-trading/margin";
const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/margin";

const PAGE_TITLE =
  "ما هو الهامش في التداول؟ شرح الهامش المستخدم والمتاح";

const PAGE_DESCRIPTION =
  "تعرف على معنى الهامش في الفوركس، وكيفية حساب الهامش المطلوب، والفرق بين الهامش المستخدم والمتاح ومستوى الهامش، مع أمثلة عملية للمبتدئين.";

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
    "ما هو الهامش",
    "الهامش في التداول",
    "الهامش في الفوركس",
    "شرح الهامش",
    "حساب الهامش",
    "الهامش المستخدم",
    "الهامش المتاح",
    "مستوى الهامش",
    "نداء الهامش",
    "الفرق بين الهامش والرافعة المالية",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هو الهامش؟" },
  { id: "calculation", label: "طريقة الحساب" },
  { id: "example", label: "مثال عملي" },
  { id: "types", label: "أنواع الهامش" },
  { id: "margin-level", label: "مستوى الهامش" },
  { id: "margin-call", label: "نداء الهامش" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const marginTypes = [
  {
    title: "الهامش المستخدم",
    subtitle: "Used Margin",
    description:
      "هو المبلغ الذي يحجزه الوسيط من رصيد الحساب للمحافظة على الصفقات المفتوحة. لا يُعد رسومًا، لكنه يبقى غير متاح للاستخدام ما دامت الصفقة مفتوحة.",
    points: [
      "يرتبط بحجم الصفقة والرافعة المالية.",
      "يزداد عند فتح صفقات إضافية.",
      "يُحرر عند إغلاق الصفقة.",
    ],
    badge: "محجوز للصفقات",
  },
  {
    title: "الهامش المتاح",
    subtitle: "Free Margin",
    description:
      "هو الجزء المتبقي من حقوق الحساب بعد خصم الهامش المستخدم. يمكن استخدامه لفتح صفقات جديدة أو امتصاص الخسائر العائمة.",
    points: [
      "ينخفض عندما ترتفع الخسائر العائمة.",
      "يزداد عند تحقيق أرباح أو إغلاق صفقات.",
      "انخفاضه الشديد قد يؤدي إلى نداء الهامش.",
    ],
    badge: "متاح للاستخدام",
  },
  {
    title: "مستوى الهامش",
    subtitle: "Margin Level",
    description:
      "هو نسبة مئوية تقارن بين حقوق الحساب والهامش المستخدم. يستخدمه الوسيط لتقييم قدرة الحساب على الاستمرار في الاحتفاظ بالصفقات المفتوحة.",
    points: [
      "كلما ارتفعت النسبة كان وضع الحساب أفضل.",
      "تنخفض النسبة مع زيادة الخسائر.",
      "قد ترتبط بها مستويات نداء الهامش ووقف الخروج.",
    ],
    badge: "مؤشر أمان الحساب",
  },
];

const marginRisks = [
  {
    icon: "📉",
    title: "الخسائر العائمة",
    description:
      "عندما تتحرك الصفقات ضدك، تنخفض حقوق الحساب والهامش المتاح، وقد يقترب الحساب من مستوى نداء الهامش.",
  },
  {
    icon: "⚡",
    title: "الرافعة المالية المرتفعة",
    description:
      "الرافعة العالية تقلل الهامش المطلوب، لكنها تسمح بفتح مراكز أكبر وقد تجعل الحساب أكثر حساسية لحركة السوق.",
  },
  {
    icon: "📦",
    title: "تضخيم حجم الصفقة",
    description:
      "فتح صفقة أكبر من قدرة الحساب قد يحجز جزءًا كبيرًا من الرصيد ويترك هامشًا متاحًا محدودًا.",
  },
  {
    icon: "🧩",
    title: "كثرة الصفقات المفتوحة",
    description:
      "كل صفقة جديدة تحتاج إلى هامش إضافي، لذلك قد يؤدي تراكم المراكز إلى انخفاض الهامش المتاح بسرعة.",
  },
];

const faqItems = [
  {
    question: "هل الهامش هو رسوم يدفعها المتداول للوسيط؟",
    answer:
      "لا. الهامش ليس عمولة أو رسومًا، بل مبلغ يحجزه الوسيط مؤقتًا من رصيد الحساب لتغطية متطلبات الصفقة المفتوحة. يُعاد تحريره عند إغلاق الصفقة.",
  },
  {
    question: "ما الفرق بين الهامش والرافعة المالية؟",
    answer:
      "الرافعة المالية تحدد مقدار التعرض الذي يمكنك التحكم به مقارنة برأس المال، بينما الهامش هو المبلغ المطلوب من حسابك لفتح هذا التعرض والمحافظة عليه.",
  },
  {
    question: "ما هو الهامش المتاح؟",
    answer:
      "الهامش المتاح هو المبلغ المتبقي بعد خصم الهامش المستخدم من حقوق الحساب. يمكن استخدامه لفتح صفقات جديدة أو لتحمل الخسائر العائمة.",
  },
  {
    question: "ما معنى مستوى الهامش؟",
    answer:
      "مستوى الهامش هو نسبة حقوق الحساب إلى الهامش المستخدم مضروبة في 100. كلما ارتفعت النسبة، كان الحساب أبعد عادة عن نداء الهامش ووقف الخروج.",
  },
  {
    question: "متى يحدث نداء الهامش؟",
    answer:
      "يحدث نداء الهامش عندما ينخفض مستوى الهامش إلى الحد الذي يحدده الوسيط. قد يمنع الوسيط فتح صفقات جديدة أو يطلب إضافة أموال إلى الحساب.",
  },
  {
    question: "هل يمكن أن يغلق الوسيط الصفقات تلقائيًا؟",
    answer:
      "نعم. إذا انخفض مستوى الهامش إلى مستوى وقف الخروج المحدد في شروط الحساب، قد يبدأ الوسيط بإغلاق بعض الصفقات تلقائيًا لتقليل المخاطر.",
  },
];

const relatedGuides = [
  {
    title: "ما هي الرافعة المالية؟",
    description:
      "افهم كيف تؤثر الرافعة المالية على حجم الصفقة والهامش والمخاطر.",
    href: "/learn-trading/leverage",
  },
  {
    title: "ما هو اللوت في التداول؟",
    description:
      "تعرف على أحجام العقود وكيف يؤثر حجم اللوت على الهامش والربح والخسارة.",
    href: "/learn-trading/lot",
  },
  {
    title: "ما هو السبريد؟",
    description:
      "تعرف على الفرق بين سعر البيع والشراء وتأثيره على تكلفة الصفقة.",
    href: "/learn-trading/spread",
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
      name: "الهامش في التداول",
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
      name: "الهامش في التداول",
    },
    {
      "@type": "Thing",
      name: "الهامش المستخدم",
    },
    {
      "@type": "Thing",
      name: "الهامش المتاح",
    },
    {
      "@type": "Thing",
      name: "مستوى الهامش",
    },
    {
      "@type": "Thing",
      name: "نداء الهامش",
    },
  ],

  keywords: [
    "الهامش في الفوركس",
    "حساب الهامش",
    "الهامش المستخدم",
    "الهامش المتاح",
    "مستوى الهامش",
    "نداء الهامش",
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

export default function MarginPage() {
  return (
    <main
  dir="rtl"
  className="min-h-screen bg-[#f6f8fc] text-slate-950"
>
      <Script
        id="margin-ar-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="margin-ar-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="margin-ar-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="margin-ar-faq-schema"
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

          <span className="text-slate-800">الهامش</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute bottom-[-140px] left-[-80px] h-[320px] w-[320px] rounded-full bg-sky-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                دليل المبتدئين
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                مدة القراءة: 8 دقائق
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
  ما هو الهامش في التداول؟

  <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
  شرح الهامش المستخدم والمتاح ومستوى الحساب
</span>
</h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              الهامش هو المبلغ الذي يحجزه الوسيط من حسابك للسماح بفتح صفقة
              باستخدام الرافعة المالية. في هذا الدليل ستتعرف على طريقة حساب
              الهامش، والفرق بين الهامش المستخدم والمتاح، ومعنى مستوى الهامش
              ونداء الهامش.
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
                شرح واضح
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                أمثلة رقمية
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                مناسب للمبتدئين
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    مثال على حساب تداول
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  حساب نشط
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <p className="text-xs font-black text-slate-500">
                    حجم الصفقة
                  </p>

                  <p className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                    1 لوت
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-slate-400">
                    100,000 EUR
                  </p>
                </div>

                <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4 text-center">
                  <p className="text-xs font-black text-brand-600">
                    الرافعة المالية
                  </p>

                  <p className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                    1:100
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-slate-400">
                    LEVERAGE
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-brand-500">
                    الهامش المطلوب
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    1,000 يورو
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  هذا المبلغ يُحجز مؤقتًا باعتباره
                </p>

                <p className="mt-1 text-2xl font-black">
                  الهامش المستخدم
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
                eyebrow="التعريف الأساسي"
                title="ما هو الهامش في التداول؟"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  الهامش هو المبلغ الذي يحجزه وسيط التداول من رصيدك للسماح
                  لك بفتح صفقة أكبر من رأس المال الذي تدفعه فعليًا. يرتبط
                  الهامش مباشرة بحجم الصفقة ونسبة الرافعة المالية في الحساب.
                </p>

                <p>
                  لا يمثل الهامش تكلفة نهائية أو عمولة يدفعها المتداول، بل
                  هو مبلغ محجوز مؤقتًا طوال مدة بقاء الصفقة مفتوحة. عندما
                  تُغلق الصفقة، يُعاد تحرير الهامش ليصبح متاحًا للاستخدام
                  مرة أخرى.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: إذا احتجت إلى 1,000 دولار من حسابك لفتح صفقة قيمتها
                  100,000 دولار، فإن مبلغ 1,000 دولار هو الهامش المطلوب، وليس
                  قيمة الصفقة كاملة.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Used"
                  title="الهامش المستخدم"
                  description="المبلغ المحجوز لدعم الصفقات المفتوحة."
                />

                <MiniDefinition
                  label="Free"
                  title="الهامش المتاح"
                  description="المبلغ المتبقي لفتح صفقات أو تحمل الخسائر."
                />

                <MiniDefinition
                  label="Level"
                  title="مستوى الهامش"
                  description="نسبة حقوق الحساب إلى الهامش المستخدم."
                />
              </div>
            </section>

            {/* Calculation */}
            <section
              id="calculation"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="02"
                eyebrow="طريقة الحساب"
                title="كيف يتم حساب الهامش المطلوب؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                يعتمد الهامش المطلوب على قيمة الصفقة ونسبة الرافعة المالية.
                كلما ارتفعت الرافعة، انخفض المبلغ المطلوب لفتح الصفقة، لكن
                المخاطر المرتبطة بحجم المركز لا تختفي.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  الهامش المطلوب = قيمة الصفقة ÷ الرافعة المالية
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="قيمة الصفقة"
                    value="100,000"
                    sublabel="دولار"
                  />

                  <CalculationBox
                    label="الرافعة المالية"
                    value="1:100"
                    sublabel="LEVERAGE"
                  />

                  <CalculationBox
                    label="الهامش المطلوب"
                    value="1,000"
                    sublabel="دولار"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  خطوات الحساب
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="حدد القيمة الإجمالية للصفقة، وهي في هذا المثال 100,000 دولار."
                  />

                  <Step
                    number="2"
                    text="حدد نسبة الرافعة المالية في الحساب، وهي 1:100."
                  />

                  <Step
                    number="3"
                    text="اقسم 100,000 على 100، فيكون الهامش المطلوب 1,000 دولار."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
  💡
</span>

                  <div>
                    <h3 className="font-black text-slate-950">
                      تختلف النتيجة حسب عملة الحساب
                    </h3>

                    <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                      قد يحول الوسيط قيمة الهامش إلى عملة حسابك تلقائيًا إذا
                      كانت عملة الأداة مختلفة عن عملة الإيداع، لذلك قد تختلف
                      النتيجة قليلًا حسب سعر الصرف الحالي.
                    </p>
                  </div>
                </div>
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
                title="كيف يؤثر الهامش على حساب التداول؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لنفترض أن لديك حساب تداول بقيمة 5,000 دولار، وفتحت صفقة تحتاج
                إلى هامش قدره 1,000 دولار. سيُحجز هذا المبلغ كهامش مستخدم،
                بينما يبقى الجزء المتبقي هامشًا متاحًا.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="رصيد الحساب" value="$5,000" />

                <StatCard label="الهامش المستخدم" value="$1,000" />

                <StatCard label="الخسارة العائمة" value="-$200" />

                <StatCard label="الهامش المتاح" value="$3,800" accent />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  كيف وصلنا إلى الهامش المتاح؟
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      حقوق الحساب
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $4,800
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      5,000 − 200
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      الهامش المستخدم
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $1,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      محجوز للصفقة
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      الهامش المتاح
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      $3,800
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      4,800 − 1,000
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 p-4 sm:p-5">
  <div className="flex items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
      ⚠️
    </span>

    <h3 className="min-w-0 flex-1 font-black leading-6 text-slate-950">
      ماذا يحدث إذا استمرت الخسارة؟
    </h3>
  </div>

  <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
    إذا ارتفعت الخسائر العائمة، تنخفض حقوق الحساب والهامش المتاح ومستوى
    الهامش. عند الوصول إلى الحدود التي يحددها الوسيط، قد يظهر نداء الهامش،
    وقد تبدأ المنصة بإغلاق بعض الصفقات تلقائيًا عند مستوى وقف الخروج.
  </p>
</div>
            </section>
                        {/* Margin types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="مكونات الحساب"
                title="ما أنواع الهامش في منصة التداول؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                تعرض منصة التداول عادة عدة أرقام مرتبطة بالهامش. فهم الفرق
                بينها يساعدك على معرفة مقدار الأموال المحجوزة، والمبلغ
                المتبقي، ومدى قدرة الحساب على تحمل الخسائر العائمة.
              </p>

              {/* Mobile only */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {marginTypes.map((type, index) => (
                  <details
                    key={type.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <h3 className="text-[16px] font-black leading-6 text-slate-950">
                          {type.title}
                        </h3>

                        <p className="mt-0.5 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {type.subtitle}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {type.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {type.points.map((point) => (
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
  {marginTypes.map((type) => (
    <div
      key={type.title}
      className="grid h-full min-w-0 grid-rows-[auto_82px_168px_1fr] rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
    >
      {/* Badge */}
      <div>
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
          {type.badge}
        </span>
      </div>

      {/* Title */}
      <div className="pt-4">
        <h3 className="text-[22px] font-black leading-[1.3] text-slate-950">
          {type.title}
        </h3>

        <p className="mt-1.5 text-[11px] font-black uppercase tracking-wide text-brand-500">
          {type.subtitle}
        </p>
      </div>

      {/* Description */}
      <div className="flex items-start pt-4">
        <p className="text-sm font-medium leading-7 text-slate-600">
          {type.description}
        </p>
      </div>

      {/* Points */}
      <ul className="space-y-2.5 border-t border-slate-200 pt-4">
        {type.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2.5 text-sm font-bold leading-6 text-slate-700"
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
            </section>

            {/* Margin level */}
            <section
              id="margin-level"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="مؤشر الحساب"
                title="ما هو مستوى الهامش وكيف يتم حسابه؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                مستوى الهامش هو نسبة مئوية توضح العلاقة بين حقوق الحساب
                والهامش المستخدم. يعتمد الوسطاء على هذه النسبة لتحديد مدى
                أمان الحساب وقدرته على الاحتفاظ بالصفقات المفتوحة.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  مستوى الهامش = حقوق الحساب ÷ الهامش المستخدم × 100
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="حقوق الحساب"
                    value="4,800"
                    sublabel="دولار"
                  />

                  <CalculationBox
                    label="الهامش المستخدم"
                    value="1,000"
                    sublabel="دولار"
                  />

                  <CalculationBox
                    label="مستوى الهامش"
                    value="480%"
                    sublabel="MARGIN LEVEL"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-3">
                <MarginLevelCard
                  value="500%+"
                  title="وضع مريح نسبيًا"
                  description="الهامش المتاح جيد والحساب بعيد نسبيًا عن مستويات الخطر."
                  status="safe"
                />

                <MarginLevelCard
                  value="100%–500%"
                  title="يحتاج إلى متابعة"
                  description="قد تتغير النسبة سريعًا إذا ارتفعت الخسائر أو فُتحت صفقات إضافية."
                  status="warning"
                />

                <MarginLevelCard
                  value="أقل من 100%"
                  title="مستوى خطر"
                  description="قد يقترب الحساب من نداء الهامش أو وقف الخروج حسب شروط الوسيط."
                  status="danger"
                />
              </div>

             <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
  <div className="flex items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
      💡
    </span>

    <h3 className="min-w-0 flex-1 font-black leading-6 text-slate-950">
      تختلف النتيجة حسب عملة الحساب
    </h3>
  </div>

  <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
    قد يحول الوسيط قيمة الهامش إلى عملة حسابك تلقائيًا إذا كانت عملة الأداة
    مختلفة عن عملة الإيداع، لذلك قد تختلف النتيجة قليلًا حسب سعر الصرف الحالي.
  </p>
</div>
            </section>

            {/* Margin call */}
            <section
              id="margin-call"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="إدارة المخاطر"
                title="ما هو نداء الهامش ووقف الخروج؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                نداء الهامش هو تحذير يحدث عندما تنخفض قدرة الحساب على دعم
                الصفقات المفتوحة. وإذا استمرت الخسائر وانخفض مستوى الهامش إلى
                حد وقف الخروج، قد يبدأ الوسيط بإغلاق بعض الصفقات تلقائيًا.
              </p>

              {/* Mobile only */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                <details
                  open
                  className="group overflow-hidden rounded-[18px] border border-amber-200 bg-amber-50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                        ⚠️
                      </span>

                      <div>
                        <h3 className="text-[15px] font-black text-slate-950">
                          نداء الهامش
                        </h3>

                        <p className="mt-0.5 text-[11px] font-bold text-amber-700">
                          Margin Call
                        </p>
                      </div>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-lg text-amber-700 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-amber-200 bg-white px-4 py-4">
                    <p className="text-[13px] font-medium leading-7 text-slate-600">
                      يظهر عندما يصل مستوى الهامش إلى حد يحدده الوسيط. قد لا
                      تتمكن من فتح صفقات جديدة، وقد تحتاج إلى إيداع أموال أو
                      إغلاق بعض المراكز.
                    </p>
                  </div>
                </details>

                <details className="group overflow-hidden rounded-[18px] border border-rose-200 bg-rose-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-lg">
                        ⛔
                      </span>

                      <div>
                        <h3 className="text-[15px] font-black text-slate-950">
                          وقف الخروج
                        </h3>

                        <p className="mt-0.5 text-[11px] font-bold text-rose-700">
                          Stop Out
                        </p>
                      </div>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-white text-lg text-rose-700 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-rose-200 bg-white px-4 py-4">
                    <p className="text-[13px] font-medium leading-7 text-slate-600">
                      يحدث عندما ينخفض مستوى الهامش أكثر، وقد يبدأ الوسيط
                      بإغلاق الصفقات تلقائيًا، عادة بدءًا من الصفقة الأكثر
                      خسارة.
                    </p>
                  </div>
                </details>
              </div>

              {/* Tablet and desktop */}
              <div className="mt-6 hidden gap-4 sm:grid lg:grid-cols-2">
                <RiskStageCard
                  icon="⚠️"
                  title="نداء الهامش"
                  english="Margin Call"
                  description="تنبيه بأن حقوق الحساب لم تعد كافية بالمستوى المطلوب لدعم الصفقات المفتوحة. قد يمنع الوسيط فتح مراكز جديدة."
                  theme="warning"
                />

                <RiskStageCard
                  icon="⛔"
                  title="وقف الخروج"
                  english="Stop Out"
                  description="مرحلة أكثر خطورة، يبدأ عندها الوسيط بإغلاق بعض الصفقات تلقائيًا لحماية الحساب من رصيد سلبي إضافي."
                  theme="danger"
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  ما الذي قد يخفض الهامش المتاح؟
                </h3>

                {/* Mobile */}
                <div className="mt-4 space-y-2.5 sm:hidden">
                  {marginRisks.map((risk) => (
                    <details
                      key={risk.title}
                      className="group overflow-hidden rounded-[16px] border border-slate-200 bg-white"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg">
                            {risk.icon}
                          </span>

                          <h4 className="text-[14px] font-black text-slate-950">
                            {risk.title}
                          </h4>
                        </div>

                        <span className="text-lg font-black text-brand-500 transition group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <div className="border-t border-slate-200 px-3.5 py-3">
                        <p className="text-[12px] font-medium leading-6 text-slate-600">
                          {risk.description}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>

                {/* Desktop */}
                <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-2">
                  {marginRisks.map((risk) => (
                    <div
                      key={risk.title}
                      className="rounded-[18px] border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg">
                          {risk.icon}
                        </span>

                        <div>
                          <h4 className="font-black text-slate-950">
                            {risk.title}
                          </h4>

                          <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                            {risk.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  كيف تقلل خطر نداء الهامش؟
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "استخدم حجم صفقة مناسبًا لرصيد الحساب.",
                    "لا تفتح عددًا كبيرًا من الصفقات في الوقت نفسه.",
                    "راقب مستوى الهامش والهامش المتاح باستمرار.",
                    "استخدم وقف الخسارة وتجنب الرافعة المفرطة.",
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
                    href="/learn-trading/leverage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    اقرأ عن الرافعة المالية
                  </Link>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section
              id="faq"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="07"
                eyebrow="أسئلة المتداولين"
                title="الأسئلة الشائعة عن الهامش"
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
                  مفاهيم مرتبطة بالهامش
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  فهم الرافعة المالية وحجم اللوت والسبريد يساعدك على تقدير
                  متطلبات الهامش وتكلفة الصفقة والمخاطر بصورة أدق.
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
                استخدم حاسبة الهامش لتقدير المبلغ المطلوب حسب حجم الصفقة
                والرافعة المالية.
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
              احسب متطلبات الهامش قبل فتح الصفقة
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              لا تعتمد على الحد الأقصى للرافعة فقط. احسب حجم الصفقة، والهامش
              المطلوب، والهامش المتاح، وقدرة الحساب على تحمل حركة السوق.
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
                href="/brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                تقييمات الوسطاء
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

function MarginLevelCard({
  value,
  title,
  description,
  status,
}: {
  value: string;
  title: string;
  description: string;
  status: "safe" | "warning" | "danger";
}) {
  const styles = {
    safe: {
      wrapper: "border-emerald-200 bg-emerald-50",
      value: "text-emerald-700",
    },
    warning: {
      wrapper: "border-amber-200 bg-amber-50",
      value: "text-amber-700",
    },
    danger: {
      wrapper: "border-rose-200 bg-rose-50",
      value: "text-rose-700",
    },
  };

  return (
    <div
      className={`rounded-[18px] border p-4 ${styles[status].wrapper}`}
    >
      <p className={`text-xl font-black ${styles[status].value}`}>
        {value}
      </p>

      <h3 className="mt-2 text-[15px] font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-1.5 text-[12px] font-medium leading-6 text-slate-600 sm:text-sm sm:leading-7">
        {description}
      </p>
    </div>
  );
}

function RiskStageCard({
  icon,
  title,
  english,
  description,
  theme,
}: {
  icon: string;
  title: string;
  english: string;
  description: string;
  theme: "warning" | "danger";
}) {
  const isDanger = theme === "danger";

  return (
    <div
      className={`rounded-[22px] border p-5 ${
        isDanger
          ? "border-rose-200 bg-rose-50"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ${
            isDanger ? "bg-rose-100" : "bg-amber-100"
          }`}
        >
          {icon}
        </span>

        <div>
          <h3 className="text-lg font-black text-slate-950">
            {title}
          </h3>

          <p
            className={`mt-0.5 text-[11px] font-black uppercase ${
              isDanger ? "text-rose-700" : "text-amber-700"
            }`}
          >
            {english}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
        {description}
      </p>
    </div>
  );
}