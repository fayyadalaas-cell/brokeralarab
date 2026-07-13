import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL = "https://brokeralarab.com/learn-trading/lot";

const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/lot";

const PAGE_TITLE =
  "ما هو اللوت في التداول؟ شرح حجم اللوت وقيمة النقطة";

const PAGE_DESCRIPTION =
  "تعرف على معنى اللوت في الفوركس، والفرق بين اللوت القياسي والميني والمايكرو، وكيفية حساب حجم الصفقة وقيمة النقطة مع أمثلة عملية للمبتدئين.";

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
    "ما هو اللوت",
    "اللوت في التداول",
    "حجم اللوت في الفوركس",
    "شرح اللوت",
    "حساب حجم اللوت",
    "قيمة النقطة",
    "اللوت القياسي",
    "الميني لوت",
    "المايكرو لوت",
    "كم يساوي اللوت",
    "اختيار حجم الصفقة",
    "حاسبة حجم اللوت",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هو اللوت؟" },
  { id: "how-it-works", label: "كيف يعمل؟" },
  { id: "example", label: "مثال عملي" },
  { id: "types", label: "أنواع اللوت" },
  { id: "pip-value", label: "قيمة النقطة" },
  { id: "position-size", label: "اختيار الحجم" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const lotTypes = [
  {
    title: "اللوت القياسي",
    subtitle: "Standard Lot",
    size: "100,000",
    description:
      "يمثل اللوت القياسي عادة 100,000 وحدة من العملة الأساسية في أزواج الفوركس. يؤدي استخدامه إلى قيمة نقطة أكبر وتأثير أوضح لحركة السعر.",
    points: [
      "قيمة النقطة تقارب 10 دولارات في كثير من أزواج الدولار.",
      "يحتاج إلى حساب قادر على تحمل تقلبات أكبر.",
      "لا يناسب الحسابات الصغيرة عادة دون إدارة دقيقة للمخاطر.",
    ],
    badge: "الحجم الأكبر",
  },
  {
    title: "الميني لوت",
    subtitle: "Mini Lot",
    size: "10,000",
    description:
      "يمثل الميني لوت عادة 10,000 وحدة من العملة الأساسية، أي عُشر اللوت القياسي، ويمنح المتداول تحكمًا أدق في حجم المخاطرة.",
    points: [
      "قيمة النقطة تقارب دولارًا واحدًا في أزواج شائعة.",
      "أصغر من اللوت القياسي بعشر مرات.",
      "يوفر مرونة أفضل للحسابات المتوسطة.",
    ],
    badge: "حجم متوسط",
  },
  {
    title: "المايكرو لوت",
    subtitle: "Micro Lot",
    size: "1,000",
    description:
      "يمثل المايكرو لوت عادة 1,000 وحدة من العملة الأساسية، وهو خيار شائع للمبتدئين أو لاختبار الاستراتيجيات بمخاطرة أقل.",
    points: [
      "قيمة النقطة تقارب 0.10 دولار في أزواج شائعة.",
      "يساعد على ضبط المخاطرة بدقة أكبر.",
      "مناسب نسبيًا للحسابات الصغيرة والتجربة.",
    ],
    badge: "مناسب للمبتدئين",
  },
];

const sizingFactors = [
  {
    icon: "💰",
    title: "رصيد الحساب",
    description:
      "حجم الصفقة يجب أن يتناسب مع حقوق الحساب، وليس فقط مع الحد الأقصى الذي تسمح به منصة التداول.",
  },
  {
    icon: "🛡️",
    title: "نسبة المخاطرة",
    description:
      "حدد أولًا مقدار المال الذي تقبل خسارته في الصفقة، ثم احسب حجم اللوت بناءً عليه.",
  },
  {
    icon: "📏",
    title: "مسافة وقف الخسارة",
    description:
      "كلما ابتعد وقف الخسارة عن نقطة الدخول، احتجت عادة إلى حجم لوت أصغر للمحافظة على نفس المخاطرة.",
  },
  {
    icon: "📊",
    title: "قيمة النقطة",
    description:
      "قيمة كل نقطة تتغير حسب حجم اللوت والأداة وسعر الصرف، وتؤثر مباشرة في الربح والخسارة.",
  },
];

const faqItems = [
  {
    question: "ما هو اللوت في الفوركس؟",
    answer:
      "اللوت هو وحدة تستخدم لقياس حجم الصفقة. في الفوركس يمثل اللوت القياسي عادة 100,000 وحدة من العملة الأساسية، بينما يمثل الميني لوت 10,000 وحدة والمايكرو لوت 1,000 وحدة.",
  },
  {
    question: "كم تساوي النقطة في اللوت القياسي؟",
    answer:
      "في كثير من أزواج العملات التي يكون الدولار عملة التسعير فيها، تساوي النقطة في اللوت القياسي نحو 10 دولارات. قد تختلف القيمة حسب الزوج وسعر الصرف.",
  },
  {
    question: "ما الفرق بين اللوت والميني لوت والمايكرو لوت؟",
    answer:
      "الاختلاف هو حجم الصفقة. اللوت القياسي يساوي عادة 100,000 وحدة، والميني لوت 10,000 وحدة، والمايكرو لوت 1,000 وحدة.",
  },
  {
    question: "هل اللوت الأكبر يعني أرباحًا أكبر؟",
    answer:
      "قد يؤدي اللوت الأكبر إلى ربح أكبر عند تحرك السوق لصالحك، لكنه يرفع الخسارة بنفس الطريقة إذا تحرك السعر ضد الصفقة.",
  },
  {
    question: "كيف أختار حجم اللوت المناسب؟",
    answer:
      "ابدأ بتحديد رصيد الحساب ونسبة المخاطرة ومسافة وقف الخسارة وقيمة النقطة، ثم استخدم هذه المعلومات لحساب حجم الصفقة المناسب.",
  },
  {
    question: "ما حجم اللوت المناسب للمبتدئين؟",
    answer:
      "لا يوجد حجم موحد لجميع المبتدئين. الأفضل اختيار حجم صغير يتوافق مع رصيد الحساب ونسبة مخاطرة محدودة، بدل الاعتماد على أكبر حجم تسمح به الرافعة المالية.",
  },
];

const relatedGuides = [
  {
    title: "ما هي الرافعة المالية؟",
    description:
      "تعرف على تأثير الرافعة في حجم التعرض والهامش ومخاطر الصفقة.",
    href: "/learn-trading/leverage",
  },
  {
    title: "ما هو الهامش؟",
    description:
      "افهم الهامش المستخدم والمتاح ومستوى الهامش ونداء الهامش.",
    href: "/learn-trading/margin",
  },
  {
    title: "ما هو السبريد؟",
    description:
      "تعرف على الفرق بين سعر البيع والشراء وتأثيره على تكلفة التداول.",
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
      name: "اللوت في التداول",
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
      name: "اللوت في التداول",
    },
    {
      "@type": "Thing",
      name: "حجم الصفقة",
    },
    {
      "@type": "Thing",
      name: "قيمة النقطة",
    },
    {
      "@type": "Thing",
      name: "إدارة مخاطر التداول",
    },
    {
      "@type": "Thing",
      name: "الفوركس",
    },
  ],

  keywords: [
    "اللوت",
    "حجم اللوت",
    "قيمة النقطة",
    "اللوت القياسي",
    "الميني لوت",
    "المايكرو لوت",
    "حجم الصفقة",
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

export default function LotPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="lot-ar-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="lot-ar-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="lot-ar-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="lot-ar-faq-schema"
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

          <span className="text-slate-800">اللوت</span>
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
              ما هو اللوت في التداول؟

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                شرح حجم اللوت وقيمة النقطة في الفوركس
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              اللوت هو الوحدة التي تحدد حجم صفقتك في الفوركس والعقود مقابل
              الفروقات. في هذا الدليل ستتعرف على أنواع اللوت، وقيمة النقطة،
              وكيفية اختيار حجم صفقة يتناسب مع رصيد حسابك وخطة إدارة المخاطر.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                ابدأ الشرح
              </a>

              <Link
                href="/tools/lot-size-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                حاسبة حجم اللوت
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
                    مثال على زوج
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  مثال توضيحي
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
                    حجم الصفقة
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1 لوت
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    100,000 EUR
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-brand-600 sm:min-h-0 sm:text-xs">
                    قيمة النقطة التقريبية
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $10
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    PER PIP
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-brand-500">
                    حركة 10 نقاط
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    ≈ $100
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  حجم اللوت يحدد قيمة حركة السعر
                </p>

                <p className="mt-1 text-2xl font-black">
                  اختر الحجم بحذر
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
  eyebrow="معنى اللوت"
  title="كيف يحدد اللوت حجم الصفقة وقيمة النقطة؟"
/>

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  اللوت هو وحدة قياس تستخدم لتحديد حجم الصفقة في سوق الفوركس
                  والذهب والعقود مقابل الفروقات. عندما تختار حجم اللوت، فأنت
                  تحدد عدد الوحدات التي تتحكم بها وقيمة كل حركة في السعر.
                </p>

                <p>
                  كلما زاد حجم اللوت، ارتفعت قيمة النقطة وازداد تأثير حركة
                  السوق على الربح والخسارة. لذلك لا ينبغي اختيار اللوت بناءً
                  على الربح المتوقع فقط، بل حسب رصيد الحساب ونسبة المخاطرة
                  ووقف الخسارة.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: اللوت القياسي في الفوركس يمثل عادة 100,000 وحدة من
                  العملة الأساسية، لكنك تستطيع غالبًا التداول بأحجام أصغر مثل
                  0.10 لوت أو 0.01 لوت.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Size"
                  title="حجم الصفقة"
                  description="عدد الوحدات التي تتحكم بها في السوق."
                />

                <MiniDefinition
                  label="Pip"
                  title="قيمة النقطة"
                  description="المبلغ الذي تربحه أو تخسره لكل نقطة."
                />

                <MiniDefinition
                  label="Risk"
                  title="مخاطرة الصفقة"
                  description="الخسارة المحتملة حسب اللوت ووقف الخسارة."
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
                eyebrow="طريقة العمل"
                title="كيف يعمل حجم اللوت؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                يحدد حجم اللوت مقدار التعرض وقيمة النقطة في الصفقة. عند
                التداول بلوت أكبر، تصبح كل نقطة أكثر قيمة، ولذلك يرتفع الربح
                المحتمل كما ترتفع الخسارة المحتملة بنفس النسبة.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  الربح أو الخسارة = عدد النقاط × قيمة النقطة
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="حجم اللوت"
                    value="1.00"
                    sublabel="STANDARD LOT"
                  />

                  <CalculationBox
                    label="قيمة النقطة"
                    value="$10"
                    sublabel="PER PIP"
                  />

                  <CalculationBox
                    label="حركة 20 نقطة"
                    value="$200"
                    sublabel="THEORETICAL"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  خطوات المثال
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="حدد حجم الصفقة، وهو 1 لوت قياسي في هذا المثال."
                  />

                  <Step
                    number="2"
                    text="قيمة النقطة التقريبية في المثال هي 10 دولارات."
                  />

                  <Step
                    number="3"
                    text="اضرب 20 نقطة في 10 دولارات، فتكون النتيجة النظرية 200 دولار."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    قيمة النقطة ليست ثابتة في جميع الأدوات
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  قد تختلف قيمة النقطة حسب زوج العملات، وحجم العقد، وسعر
                  الصرف، وعملة الحساب. كما تختلف طريقة الحساب في الذهب
                  والمؤشرات والعملات الرقمية.
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
                title="كيف يؤثر حجم اللوت على الربح والخسارة؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لنفترض أن صفقة على زوج EUR/USD تحركت 30 نقطة. النتيجة تختلف
                بصورة كبيرة حسب ما إذا كنت تستخدم لوتًا قياسيًا أو ميني لوت
                أو مايكرو لوت.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="حركة السعر"
                  value="30 نقطة"
                />

                <StatCard
                  label="1.00 لوت"
                  value="$300"
                />

                <StatCard
                  label="0.10 لوت"
                  value="$30"
                />

                <StatCard
                  label="0.01 لوت"
                  value="$3"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  نفس حركة السوق بأحجام مختلفة
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      لوت قياسي
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $300
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      30 × $10
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      ميني لوت
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $30
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      30 × $1
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      مايكرو لوت
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      $3
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      30 × $0.10
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
                    اللوت الأكبر يضاعف النتيجة في الاتجاهين
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  الأرقام السابقة قد تمثل ربحًا إذا تحرك السعر لصالحك أو خسارة
                  إذا تحرك ضدك. لذلك يجب اختيار حجم اللوت بناءً على مقدار
                  الخسارة المقبولة، وليس بناءً على الربح الذي ترغب في تحقيقه.
                </p>
              </div>
            </section>
                        {/* Lot types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="أحجام العقود"
                title="ما أنواع اللوت في الفوركس؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                توفر منصات التداول عادة أكثر من حجم للصفقة، حتى يتمكن
                المتداول من اختيار مستوى تعرض يتناسب مع رصيد الحساب وخطة
                إدارة المخاطر. أشهر الأحجام هي اللوت القياسي والميني لوت
                والمايكرو لوت.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {lotTypes.map((type, index) => (
                  <details
                    key={type.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            {type.title}
                          </h3>

                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                            {type.size}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
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
                {lotTypes.map((type) => (
                  <div
                    key={type.title}
                    className="grid h-full min-w-0 grid-rows-[auto_86px_auto_1fr] rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
                        {type.badge}
                      </span>

                      <span className="rounded-xl bg-brand-500 px-3 py-2 text-sm font-black text-white shadow-sm">
                        {type.size}
                      </span>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-[22px] font-black leading-[1.3] text-slate-950">
                        {type.title}
                      </h3>

                      <p className="mt-1.5 text-[11px] font-black uppercase tracking-wide text-brand-500">
                        {type.subtitle}
                      </p>
                    </div>

                    <div className="min-h-[196px] pt-4">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {type.description}
                      </p>
                    </div>

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

              {/* Desktop comparison */}
              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    المقارنة
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    1.00 لوت
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    0.10 لوت
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    0.01 لوت
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <LotComparisonRow
                    title="حجم العقد"
                    standard="100,000"
                    mini="10,000"
                    micro="1,000"
                  />

                  <LotComparisonRow
                    title="قيمة النقطة التقريبية"
                    standard="$10"
                    mini="$1"
                    micro="$0.10"
                  />

                  <LotComparisonRow
                    title="تأثير حركة 20 نقطة"
                    standard="$200"
                    mini="$20"
                    micro="$2"
                  />

                  <LotComparisonRow
                    title="الملاءمة للحسابات الصغيرة"
                    standard="أقل"
                    mini="متوسطة"
                    micro="أعلى"
                  />
                </div>
              </div>
            </section>

            {/* Pip value */}
            <section
              id="pip-value"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="قيمة حركة السعر"
                title="كيف يحسب اللوت قيمة النقطة؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                قيمة النقطة هي المبلغ الذي يتغير به ربحك أو خسارتك عندما
                يتحرك السعر نقطة واحدة. ترتفع قيمة النقطة مع زيادة حجم اللوت،
                ولذلك يؤثر حجم الصفقة مباشرة في سرعة تغير نتيجة المركز.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  النتيجة التقريبية = عدد النقاط × قيمة النقطة
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="عدد النقاط"
                    value="50"
                    sublabel="PIPS"
                  />

                  <CalculationBox
                    label="قيمة النقطة"
                    value="$1"
                    sublabel="0.10 LOT"
                  />

                  <CalculationBox
                    label="النتيجة"
                    value="$50"
                    sublabel="THEORETICAL"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <PipValueCard
                  lot="1.00"
                  title="لوت قياسي"
                  pipValue="$10"
                  move="$500"
                  highlighted={false}
                />

                <PipValueCard
                  lot="0.10"
                  title="ميني لوت"
                  pipValue="$1"
                  move="$50"
                  highlighted
                />

                <PipValueCard
                  lot="0.01"
                  title="مايكرو لوت"
                  pipValue="$0.10"
                  move="$5"
                  highlighted={false}
                />
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    أرقام قيمة النقطة تقريبية وليست موحدة
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  الأمثلة السابقة مناسبة لعدد من أزواج العملات التي يكون
                  الدولار عملة التسعير فيها. قد تختلف القيمة في أزواج الين
                  والعملات المتقاطعة والذهب والمؤشرات حسب مواصفات العقد وسعر
                  الصرف.
                </p>
              </div>
            </section>

            {/* Position sizing */}
            <section
              id="position-size"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="إدارة المخاطر"
                title="كيف تختار حجم اللوت المناسب؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                اختيار حجم اللوت لا يبدأ من سؤال: كم أريد أن أربح؟ بل يبدأ
                بتحديد مقدار الخسارة التي يستطيع الحساب تحملها إذا وصلت
                الصفقة إلى وقف الخسارة.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  حجم الصفقة = مبلغ المخاطرة ÷ مسافة وقف الخسارة وقيمة النقطة
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="المخاطرة المقبولة"
                    value="$100"
                    sublabel="RISK AMOUNT"
                  />

                  <CalculationBox
                    label="وقف الخسارة"
                    value="50"
                    sublabel="PIPS"
                  />

                  <CalculationBox
                    label="قيمة النقطة المطلوبة"
                    value="$2"
                    sublabel="PER PIP"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  خطوات اختيار الحجم
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="حدد نسبة المخاطرة من رصيد الحساب، مثل 1% أو أقل."
                  />

                  <Step
                    number="2"
                    text="احسب مبلغ المخاطرة الفعلي، وهو 100 دولار في المثال."
                  />

                  <Step
                    number="3"
                    text="حدد مسافة وقف الخسارة، وهي 50 نقطة."
                  />

                  <Step
                    number="4"
                    text="اقسم 100 على 50، فتكون قيمة النقطة المناسبة دولارين تقريبًا."
                  />
                </div>
              </div>

              {/* Mobile factors */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {sizingFactors.map((factor) => (
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
                {sizingFactors.map((factor) => (
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

              <div className="mt-6 rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-lg">
                    ⚠️
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    لا تختَر اللوت حسب الهامش المتاح فقط
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  قد تسمح لك الرافعة المالية بفتح حجم كبير، لكن هذا لا يعني
                  أن الحساب يستطيع تحمل خسارته. اجعل مبلغ المخاطرة ووقف
                  الخسارة هما الأساس في تحديد حجم الصفقة.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  قواعد عملية لاختيار حجم الصفقة
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "حدد مبلغ الخسارة المقبولة قبل فتح الصفقة.",
                    "اربط حجم اللوت بمسافة وقف الخسارة.",
                    "لا ترفع الحجم لتعويض خسارة سابقة.",
                    "استخدم حاسبة حجم اللوت بدل التقدير العشوائي.",
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
                    href="/tools/lot-size-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    استخدم حاسبة حجم اللوت
                  </Link>

                  <Link
                    href="/tools/risk-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    افتح حاسبة المخاطرة
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
                title="الأسئلة الشائعة عن اللوت وحجم الصفقة"
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
                  مفاهيم مرتبطة بحجم اللوت
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  فهم الرافعة والهامش والسبريد يساعدك على تقدير متطلبات
                  الصفقة وتكلفتها ومخاطرها بصورة أدق.
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
                احسب حجم اللوت
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                استخدم الحاسبة لاختيار حجم صفقة يتناسب مع رصيد الحساب ووقف
                الخسارة ونسبة المخاطرة.
              </p>

              <Link
                href="/tools/lot-size-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                فتح حاسبة حجم اللوت
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
              احسب حجم اللوت قبل فتح الصفقة
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              اختر حجم الصفقة حسب رصيد الحساب ونسبة المخاطرة ومسافة وقف
              الخسارة، وليس حسب الحد الأقصى الذي تسمح به الرافعة.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/tools/lot-size-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                حاسبة حجم اللوت
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

function LotComparisonRow({
  title,
  standard,
  mini,
  micro,
}: {
  title: string;
  standard: string;
  mini: string;
  micro: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {standard}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {mini}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {micro}
      </div>
    </div>
  );
}

function PipValueCard({
  lot,
  title,
  pipValue,
  move,
  highlighted = false,
}: {
  lot: string;
  title: string;
  pipValue: string;
  move: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-[20px] border p-4 text-center ${
        highlighted
          ? "border-brand-200 bg-brand-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <span
        className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black ${
          highlighted
            ? "bg-white text-brand-600"
            : "bg-white text-slate-600"
        }`}
      >
        {lot} لوت
      </span>

      <h3 className="mt-3 text-lg font-black text-slate-950">
        {title}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-bold text-slate-500">
            قيمة النقطة
          </p>

          <p className="mt-1 text-base font-black text-slate-950">
            {pipValue}
          </p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-bold text-slate-500">
            حركة 50 نقطة
          </p>

          <p
            className={`mt-1 text-base font-black ${
              highlighted ? "text-brand-600" : "text-slate-950"
            }`}
          >
            {move}
          </p>
        </div>
      </div>
    </div>
  );
}