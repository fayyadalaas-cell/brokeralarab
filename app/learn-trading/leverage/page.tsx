import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/learn-trading/leverage";

const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/leverage";

const PAGE_TITLE =
  "ما هي الرافعة المالية في التداول؟ شرح الرافعة للمبتدئين";

const PAGE_DESCRIPTION =
  "تعرف على معنى الرافعة المالية في الفوركس، وكيف تعمل، وطريقة حسابها، وعلاقتها بالهامش وحجم الصفقة، مع أمثلة عملية ومخاطر مهمة للمبتدئين.";

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
    "ما هي الرافعة المالية",
    "الرافعة المالية في التداول",
    "الرافعة المالية في الفوركس",
    "شرح الرافعة المالية",
    "كيف تعمل الرافعة المالية",
    "حساب الرافعة المالية",
    "الفرق بين الرافعة والهامش",
    "مخاطر الرافعة المالية",
    "رافعة مالية 1:100",
    "ما معنى leverage",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هي الرافعة؟" },
  { id: "how-it-works", label: "كيف تعمل؟" },
  { id: "example", label: "مثال عملي" },
  { id: "levels", label: "مستويات الرافعة" },
  { id: "margin", label: "الرافعة والهامش" },
  { id: "risks", label: "المخاطر" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const leverageLevels = [
  {
    title: "رافعة منخفضة",
    subtitle: "Low Leverage",
    ratio: "1:10",
    description:
      "تعني أن كل دولار في حسابك يمنحك قدرة نظرية على التحكم في تعرض سوقي بقيمة 10 دولارات.",
    points: [
      "تحد من تضخيم حجم الصفقة.",
      "تحتاج هامشًا أكبر نسبيًا.",
      "قد تكون أسهل في إدارة المخاطر.",
    ],
    badge: "تعرض أقل",
  },
  {
    title: "رافعة متوسطة",
    subtitle: "Moderate Leverage",
    ratio: "1:100",
    description:
      "تسمح بالتحكم في مركز أكبر بكثير من رأس المال المستخدم، وهي من النسب الشائعة لدى كثير من الوسطاء.",
    points: [
      "تقلل الهامش المطلوب.",
      "تسمح بمرونة أكبر في حجم الصفقة.",
      "تحتاج إلى ضبط دقيق للمخاطر.",
    ],
    badge: "شائعة الاستخدام",
  },
  {
    title: "رافعة مرتفعة",
    subtitle: "High Leverage",
    ratio: "1:500",
    description:
      "تسمح بفتح تعرض كبير باستخدام هامش صغير، لكنها تجعل الحساب أكثر حساسية لأي حركة سعرية غير مواتية.",
    points: [
      "تسهل فتح مراكز أكبر من اللازم.",
      "قد تسرع الخسائر بشكل واضح.",
      "تزيد خطر نداء الهامش ووقف الخروج.",
    ],
    badge: "مخاطر أعلى",
  },
];

const leverageRisks = [
  {
    icon: "📈",
    title: "تضخيم الأرباح والخسائر",
    description:
      "الرافعة لا تضخم الربح فقط، بل تضخم أثر حركة السوق على الحساب في الاتجاهين.",
  },
  {
    icon: "📦",
    title: "فتح صفقة أكبر من الحساب",
    description:
      "قد تدفعك الرافعة المرتفعة إلى اختيار حجم صفقة لا يتناسب مع رصيدك الفعلي.",
  },
  {
    icon: "⚠️",
    title: "انخفاض مستوى الهامش",
    description:
      "عندما تتحرك الصفقة ضدك، قد تنخفض حقوق الحساب والهامش المتاح بسرعة.",
  },
  {
    icon: "🧠",
    title: "الثقة الزائدة",
    description:
      "القدرة على فتح مركز كبير قد تعطي انطباعًا خاطئًا بأن الحساب يتحمل مخاطر أكبر.",
  },
];

const faqItems = [
  {
    question: "هل الرافعة المالية تزيد الأرباح فقط؟",
    answer:
      "لا. الرافعة المالية تضخم أثر حركة السوق على الصفقة، لذلك يمكن أن تزيد الأرباح المحتملة كما يمكن أن تزيد الخسائر المحتملة.",
  },
  {
    question: "ما معنى رافعة مالية 1:100؟",
    answer:
      "تعني أن كل دولار من الهامش يمكن أن يمنحك قدرة نظرية على التحكم في تعرض سوقي بقيمة 100 دولار، بحسب شروط الوسيط والأداة.",
  },
  {
    question: "ما الفرق بين الرافعة المالية والهامش؟",
    answer:
      "الرافعة تحدد مقدار التعرض الذي يمكنك التحكم به مقارنة برأس المال، بينما الهامش هو المبلغ الذي يحجزه الوسيط لفتح الصفقة والمحافظة عليها.",
  },
  {
    question: "هل الرافعة المرتفعة أفضل للمتداول؟",
    answer:
      "ليست بالضرورة أفضل. الرافعة المرتفعة تقلل الهامش المطلوب، لكنها قد تشجع على فتح مراكز كبيرة وتزيد حساسية الحساب للخسائر.",
  },
  {
    question: "هل يمكن التداول بدون رافعة مالية؟",
    answer:
      "نعم، يمكن التداول برافعة 1:1 إذا كان الوسيط والأداة يسمحان بذلك، لكنك ستحتاج إلى رأس مال أكبر للتحكم في نفس قيمة الصفقة.",
  },
  {
    question: "ما الرافعة المناسبة للمبتدئين؟",
    answer:
      "لا توجد نسبة مناسبة للجميع. الأفضل للمبتدئ استخدام تعرض منخفض، وحجم صفقة صغير، ونظام واضح لإدارة المخاطر بدل التركيز على أعلى رافعة متاحة.",
  },
];

const relatedGuides = [
  {
    title: "ما هو الهامش؟",
    description:
      "تعرف على الهامش المستخدم والمتاح ومستوى الهامش ونداء الهامش.",
    href: "/learn-trading/margin",
  },
  {
    title: "ما هو اللوت؟",
    description:
      "افهم أحجام العقود وكيف يؤثر حجم الصفقة على الربح والخسارة.",
    href: "/learn-trading/lot",
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
      name: "الرافعة المالية",
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
      name: "الرافعة المالية",
    },
    {
      "@type": "Thing",
      name: "الرافعة المالية في الفوركس",
    },
    {
      "@type": "Thing",
      name: "الهامش في التداول",
    },
    {
      "@type": "Thing",
      name: "حجم الصفقة",
    },
    {
      "@type": "Thing",
      name: "إدارة مخاطر التداول",
    },
  ],

  keywords: [
    "الرافعة المالية",
    "الرافعة المالية في الفوركس",
    "حساب الرافعة",
    "الهامش",
    "حجم الصفقة",
    "مخاطر الرافعة المالية",
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

export default function LeveragePage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="leverage-ar-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="leverage-ar-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="leverage-ar-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="leverage-ar-faq-schema"
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
            الرافعة المالية
          </span>
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
              ما هي الرافعة المالية في التداول؟

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                شرح طريقة عمل الرافعة المالية ومخاطرها
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              الرافعة المالية تتيح لك التحكم في صفقة أكبر من رأس المال
              المستخدم فعليًا. في هذا الدليل ستتعرف على معنى الرافعة،
              وطريقة حسابها، وعلاقتها بالهامش، وكيف يمكن أن تؤثر على
              الأرباح والخسائر.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                ابدأ الشرح
              </a>

              <Link
                href="/tools/leverage-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                حاسبة الرافعة
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
                    مثال على قوة الشراء
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    رافعة 1:100
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  مثال توضيحي
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
                    رأس المال المستخدم
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $1,000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    CAPITAL
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-brand-600 sm:min-h-0 sm:text-xs">
                    التعرض السوقي
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    $100,000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    EXPOSURE
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-brand-500">
                    نسبة الرافعة
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    1:100
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  الرافعة تزيد حجم التعرض ولا تلغي المخاطر
                </p>

                <p className="mt-1 text-2xl font-black">
                  إدارة المخاطر أساسية
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
                title="ما هي الرافعة المالية في التداول؟"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  الرافعة المالية هي أداة تتيح للمتداول التحكم في صفقة
                  أكبر من قيمة رأس المال الذي يستخدمه فعليًا. يقدم الوسيط
                  هذا التعرض الإضافي وفق نسبة محددة مثل 1:10 أو 1:100 أو
                  1:500.
                </p>

                <p>
                  لا تعني الرافعة أنك تمتلك قيمة الصفقة كاملة، بل تعني أن
                  الوسيط يطلب منك هامشًا أقل لفتح المركز. ومع ذلك، فإن الربح
                  والخسارة يُحسبان على أساس حجم الصفقة الكامل وليس على مبلغ
                  الهامش فقط.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: رافعة 1:100 تعني أن كل دولار من الهامش قد يمنحك
                  قدرة نظرية على التحكم في تعرض سوقي بقيمة 100 دولار،
                  بحسب شروط الوسيط والأداة.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Ratio"
                  title="نسبة الرافعة"
                  description="العلاقة بين رأس المال المستخدم وحجم التعرض."
                />

                <MiniDefinition
                  label="Margin"
                  title="الهامش المطلوب"
                  description="المبلغ الذي يحجزه الوسيط لفتح الصفقة."
                />

                <MiniDefinition
                  label="Exposure"
                  title="التعرض السوقي"
                  description="القيمة الكاملة للمركز الذي تتحكم به."
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
                title="كيف تعمل الرافعة المالية؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                تحدد نسبة الرافعة حجم التعرض الذي يمكنك التحكم به مقارنة
                بالهامش المطلوب. كلما ارتفعت الرافعة، انخفض المبلغ المطلوب
                لفتح نفس الصفقة، لكن حساسية الحساب لحركة السوق تبقى مرتبطة
                بحجم المركز الكامل.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  قيمة التعرض = الهامش المستخدم × نسبة الرافعة
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="الهامش المستخدم"
                    value="1,000"
                    sublabel="دولار"
                  />

                  <CalculationBox
                    label="نسبة الرافعة"
                    value="1:100"
                    sublabel="LEVERAGE"
                  />

                  <CalculationBox
                    label="قيمة التعرض"
                    value="100,000"
                    sublabel="دولار"
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
                    text="حدد الهامش المستخدم، وهو 1,000 دولار في هذا المثال."
                  />

                  <Step
                    number="2"
                    text="حدد نسبة الرافعة المالية، وهي 1:100."
                  />

                  <Step
                    number="3"
                    text="اضرب 1,000 في 100، فيكون التعرض النظري 100,000 دولار."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 font-black leading-6 text-slate-950">
                    الرافعة لا تقلل قيمة المخاطرة الفعلية
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  انخفاض الهامش المطلوب لا يعني أن الصفقة أصبحت أقل خطورة.
                  إذا كان حجم المركز كبيرًا، فإن حركة صغيرة في السوق قد تؤثر
                  على الحساب بصورة واضحة.
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
                title="كيف تؤثر الرافعة المالية على الصفقة؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لنفترض أنك فتحت صفقة بقيمة 100,000 دولار باستخدام هامش
                قدره 1,000 دولار ورافعة مالية 1:100. إذا تحرك السوق بنسبة
                1%، فإن أثر الحركة يُحسب على قيمة الصفقة الكاملة.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="قيمة الصفقة"
                  value="$100,000"
                />

                <StatCard
                  label="الهامش المستخدم"
                  value="$1,000"
                />

                <StatCard
                  label="حركة السوق"
                  value="1%"
                />

                <StatCard
                  label="الأثر النظري"
                  value="$1,000"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  ماذا تعني حركة بنسبة 1%؟
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      قيمة المركز
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $100,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      EXPOSURE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      نسبة الحركة
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      1%
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      MARKET MOVE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      الأثر النظري
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      $1,000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      100,000 × 1%
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
                    لماذا قد تكون الرافعة المرتفعة خطرة؟
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  في هذا المثال، حركة بنسبة 1% على صفقة قيمتها 100,000 دولار
                  تعادل 1,000 دولار تقريبًا. إذا كان الهامش المستخدم 1,000
                  دولار فقط، فقد تكون حركة صغيرة نسبيًا كافية لإحداث تأثير
                  كبير جدًا على الحساب.
                </p>
              </div>
            </section>
                        {/* Leverage levels */}
            <section
              id="levels"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="نسب شائعة"
                title="ما مستويات الرافعة المالية؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                تختلف الرافعة المالية المتاحة حسب الوسيط، ونوع الحساب،
                والأداة المالية، والجهة الرقابية. ارتفاع النسبة لا يعني أنها
                الخيار الأفضل، بل يعني فقط أن الهامش المطلوب لفتح نفس التعرض
                سيكون أقل.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {leverageLevels.map((level, index) => (
                  <details
                    key={level.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            {level.title}
                          </h3>

                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                            {level.ratio}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {level.subtitle}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {level.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {level.points.map((point) => (
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
                {leverageLevels.map((level) => (
                  <div
                    key={level.title}
                    className="grid h-full min-w-0 grid-rows-[auto_86px_auto_1fr] rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
                        {level.badge}
                      </span>

                      <span className="rounded-xl bg-brand-500 px-3 py-2 text-sm font-black text-white shadow-sm">
                        {level.ratio}
                      </span>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-[22px] font-black leading-[1.3] text-slate-950">
                        {level.title}
                      </h3>

                      <p className="mt-1.5 text-[11px] font-black uppercase tracking-wide text-brand-500">
                        {level.subtitle}
                      </p>
                    </div>

                    <div className="min-h-[168px] pt-4">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {level.description}
                      </p>
                    </div>

                    <ul className="space-y-2.5 border-t border-slate-200 pt-4">
                      {level.points.map((point) => (
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

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    المقارنة
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    1:10
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    1:100
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    1:500
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <LeverageComparisonRow
                    title="الهامش المطلوب لنفس الصفقة"
                    low="مرتفع"
                    medium="متوسط"
                    high="منخفض"
                  />

                  <LeverageComparisonRow
                    title="سهولة فتح مركز كبير"
                    low="أقل"
                    medium="متوسطة"
                    high="مرتفعة"
                  />

                  <LeverageComparisonRow
                    title="حساسية الحساب لسوء الاستخدام"
                    low="أقل"
                    medium="متوسطة"
                    high="مرتفعة"
                  />

                  <LeverageComparisonRow
                    title="الحاجة لضبط حجم الصفقة"
                    low="مهمة"
                    medium="مهمة جدًا"
                    high="أساسية"
                  />
                </div>
              </div>
            </section>

            {/* Leverage and margin */}
            <section
              id="margin"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="العلاقة بالهامش"
                title="ما الفرق بين الرافعة المالية والهامش؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                الرافعة المالية والهامش مرتبطان، لكنهما ليسا الشيء نفسه.
                الرافعة تصف مقدار التعرض الذي تستطيع التحكم به، بينما الهامش
                هو المبلغ الذي يُحجز من حسابك لفتح هذا التعرض والمحافظة عليه.
              </p>

              <div className="mt-6 grid items-stretch gap-3 sm:grid-cols-2">
                <ConceptCard
                  label="Leverage"
                  title="الرافعة المالية"
                  description="نسبة توضح حجم التعرض الممكن مقارنة برأس المال أو الهامش المستخدم."
                  points={[
                    "تحدد القدرة النظرية على التحكم في مركز أكبر.",
                    "تؤثر مباشرة في مقدار الهامش المطلوب.",
                    "لا تلغي مخاطر حركة السوق.",
                  ]}
                />

                <ConceptCard
                  label="Margin"
                  title="الهامش"
                  description="المبلغ الذي يحجزه الوسيط مؤقتًا لدعم الصفقة المفتوحة."
                  points={[
                    "ينخفض مع ارتفاع الرافعة لنفس قيمة الصفقة.",
                    "يُحرر عند إغلاق المركز.",
                    "يرتبط بمستوى الهامش ونداء الهامش.",
                  ]}
                />
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  الهامش المطلوب = قيمة الصفقة ÷ نسبة الرافعة
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="قيمة الصفقة"
                    value="100,000"
                    sublabel="دولار"
                  />

                  <CalculationBox
                    label="نسبة الرافعة"
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

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
  الرافعة لا تقلل قيمة المخاطرة الفعلية
</h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  قد تقلل الرافعة المرتفعة الهامش المطلوب، لكنها لا تزيد رصيد
                  الحساب أو قدرته الحقيقية على تحمل الخسائر. العامل الأهم هو
                  حجم الصفقة مقارنة بحقوق الحساب.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  مثال سريع على نفس الصفقة
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <MarginExampleCard
                    ratio="1:10"
                    margin="$10,000"
                    note="هامش أعلى"
                  />

                  <MarginExampleCard
                    ratio="1:100"
                    margin="$1,000"
                    note="هامش متوسط"
                    highlighted
                  />

                  <MarginExampleCard
                    ratio="1:500"
                    margin="$200"
                    note="هامش أقل"
                  />
                </div>

                <p className="mt-4 text-[12px] font-medium leading-6 text-slate-600 sm:text-sm sm:leading-7">
                  قيمة الصفقة في الأمثلة الثلاثة هي 100,000 دولار. الاختلاف
                  فقط في مقدار الهامش المطلوب، وليس في حجم التعرض أو أثر حركة
                  السوق على المركز.
                </p>
              </div>
            </section>

            {/* Risks */}
            <section
              id="risks"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="إدارة المخاطر"
                title="ما مخاطر الرافعة المالية؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                الخطر لا يأتي من نسبة الرافعة وحدها، بل من الطريقة التي
                يستخدمها بها المتداول. المشكلة الأساسية تبدأ عندما تتحول
                الرافعة إلى وسيلة لفتح مركز أكبر من قدرة الحساب.
              </p>

              <div className="mt-5 space-y-2.5 sm:hidden">
                {leverageRisks.map((risk) => (
                  <details
                    key={risk.title}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                          {risk.icon}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {risk.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-brand-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {risk.description}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {leverageRisks.map((risk) => (
                  <div
                    key={risk.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        {risk.icon}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-950">
                          {risk.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {risk.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-lg">
                    ⚠️
                  </span>

                  <h3 className="min-w-0 flex-1 font-black leading-6 text-slate-950">
                    الخسارة تُحسب على حجم الصفقة الكامل
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  إذا استخدمت هامشًا قدره 1,000 دولار لفتح تعرض بقيمة
                  100,000 دولار، فإن تحرك السوق لا يُحسب على مبلغ 1,000
                  دولار، بل على قيمة المركز الكاملة.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  كيف تستخدم الرافعة بصورة أكثر انضباطًا؟
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "حدد حجم الصفقة بناءً على مقدار الخسارة المقبولة.",
                    "لا تستخدم الحد الأقصى المتاح لمجرد أنه متوفر.",
                    "راقب الهامش المتاح ومستوى الهامش باستمرار.",
                    "استخدم وقف الخسارة وخطة واضحة للخروج من الصفقة.",
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
                    href="/tools/leverage-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    استخدم حاسبة الرافعة
                  </Link>

                  <Link
                    href="/learn-trading/margin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    اقرأ دليل الهامش
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
                title="الأسئلة الشائعة عن الرافعة المالية"
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
                  مفاهيم مرتبطة بالرافعة المالية
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  فهم الهامش وحجم اللوت والسبريد يساعدك على تقدير التعرض
                  الفعلي، ومتطلبات الحساب، وتكلفة الصفقة بصورة أدق.
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
  احسب الرافعة المالية
</h2>

             <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
  استخدم الحاسبة لتقدير نسبة الرافعة والعلاقة بين رأس المال،
  والهامش، وقيمة الصفقة.
</p>

              <Link
                href="/tools/leverage-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                فتح حاسبة الرافعة
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
              لا تختَر حجم الصفقة بناءً على الرافعة وحدها
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              احسب التعرض، والهامش المطلوب، والخسارة المحتملة، ثم اختر حجمًا
              يتناسب مع رصيد الحساب وخطة إدارة المخاطر.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/tools/leverage-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                حاسبة الرافعة
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

function LeverageComparisonRow({
  title,
  low,
  medium,
  high,
}: {
  title: string;
  low: string;
  medium: string;
  high: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {low}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {medium}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {high}
      </div>
    </div>
  );
}

function ConceptCard({
  label,
  title,
  description,
  points,
}: {
  label: string;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="grid h-full min-w-0 grid-rows-[auto_54px_minmax(84px,auto)_1fr] rounded-[22px] border border-slate-200 bg-slate-50 p-5">
      <div>
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black uppercase text-brand-600">
          {label}
        </span>
      </div>

      <div className="flex items-end">
        <h3 className="text-xl font-black text-slate-950">
          {title}
        </h3>
      </div>

      <div className="flex items-start pt-3">
        <p className="text-sm font-medium leading-7 text-slate-600">
          {description}
        </p>
      </div>

      <ul className="space-y-2.5 border-t border-slate-200 pt-4">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-700"
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
  );
}

function MarginExampleCard({
  ratio,
  margin,
  note,
  highlighted = false,
}: {
  ratio: string;
  margin: string;
  note: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] border p-4 text-center shadow-sm ${
        highlighted
          ? "border-brand-200 bg-white"
          : "border-white bg-white/70"
      }`}
    >
      <p className="text-[11px] font-black text-brand-500">
        رافعة {ratio}
      </p>

      <p className="mt-2 text-xl font-black text-slate-950">
        {margin}
      </p>

      <p className="mt-1 text-[10px] font-bold text-slate-400">
        {note}
      </p>
    </div>
  );
}