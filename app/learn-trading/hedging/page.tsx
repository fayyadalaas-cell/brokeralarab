import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/learn-trading/hedging";

const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/hedging";

const PAGE_TITLE =
  "ما هو الهيدج في التداول؟ شرح التغطية Hedging مع أمثلة عملية";

const PAGE_DESCRIPTION =
  "تعرف على معنى الهيدج في التداول، وكيف تعمل استراتيجية التغطية، وأنواع التحوط في الفوركس، ومزاياه ومخاطره مع أمثلة عملية واضحة للمبتدئين.";

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
    "ما هو الهيدج",
    "الهيدج في التداول",
    "شرح الهيدج",
    "Hedging",
    "التغطية في التداول",
    "التحوط في الفوركس",
    "استراتيجية الهيدج",
    "الهيدج في الفوركس",
    "فتح صفقتين متعاكستين",
    "الهيدج الكامل",
    "الهيدج الجزئي",
    "أنواع الهيدج",
    "التحوط من مخاطر العملات",
    "مزايا وعيوب الهيدج",
    "هل الهيدج مسموح",
    "طريقة عمل الهيدج",
    "حساب الهيدج",
    "إدارة المخاطر بالهيدج",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هو الهيدج؟" },
  { id: "how-it-works", label: "كيف يعمل؟" },
  { id: "example", label: "مثال عملي" },
  { id: "types", label: "أنواع الهيدج" },
  { id: "benefits-risks", label: "المزايا والمخاطر" },
  { id: "mistakes", label: "أخطاء شائعة" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const hedgingTypes = [
  {
    title: "الهيدج الكامل",
    subtitle: "Full Hedge",
    description:
      "يتم فتح مركز معاكس مساوٍ تقريبًا لحجم الصفقة الأصلية على الأداة نفسها، بهدف الحد من تأثير تحركات السوق وتجميد نتيجة الصفقة مؤقتًا.",
    points: [
      "يحد من تأثير تقلبات السوق.",
      "يجمد الربح أو الخسارة العائمة مؤقتًا.",
      "قد يضيف سبريدًا وعمولات وتكاليف تبييت.",
    ],
    badge: "تغطية كاملة",
  },
  {
    title: "الهيدج الجزئي",
    subtitle: "Partial Hedge",
    description:
      "يتم فتح صفقة معاكسة بحجم أصغر من المركز الأصلي، لتقليل جزء من المخاطرة مع الاحتفاظ بإمكانية الاستفادة إذا استمر الاتجاه.",
    points: [
      "يخفض المخاطرة دون إلغائها بالكامل.",
      "يوفر مرونة أكبر في إدارة الصفقة.",
      "يحتاج إلى حساب دقيق لأحجام العقود.",
    ],
    badge: "مرونة أكبر",
  },
  {
    title: "الهيدج بأداة مرتبطة",
    subtitle: "Cross Hedge",
    description:
      "يستخدم المتداول أداة مالية أخرى ترتبط بحركة الأصل الأساسي، مثل زوج عملات أو مؤشر أو عقد مختلف، للمساعدة في موازنة جزء من المخاطر.",
    points: [
      "يفيد عندما لا تتوفر تغطية مباشرة.",
      "يعتمد على قوة الارتباط بين الأدوات.",
      "قد يفقد فعاليته إذا تغير الارتباط.",
    ],
    badge: "تغطية غير مباشرة",
  },
];

const hedgingFactors = [
  {
  icon: "⚖️",
  title: "حجم الصفقة المعاكسة",
  description:
    "كلما اقترب حجم الصفقة المعاكسة من حجم المركز الأصلي، زادت فعالية الهيدج في تقليل تأثير تحركات السوق. أما إذا كان حجمها أصغر، فستوفر تغطية جزئية فقط.",
},
  {
    icon: "💸",
    title: "تكاليف التداول",
    description:
      "فتح مركز إضافي قد يعني دفع سبريد أو عمولة جديدة، إضافة إلى رسوم التبييت إذا بقيت الصفقات مفتوحة لأكثر من يوم.",
  },
  {
    icon: "🔗",
    title: "ارتباط الأدوات",
    description:
      "عند استخدام أداة مختلفة للهيدج، يجب دراسة قوة الارتباط واتجاهه، لأن العلاقة بين الأدوات قد تتغير مع ظروف السوق.",
  },
  {
    icon: "⏱️",
    title: "توقيت فك التغطية",
    description:
      "المشكلة لا تنتهي عند فتح الهيدج، بل يجب وجود خطة واضحة لتحديد متى يتم إغلاق الصفقة المعاكسة أو تقليلها.",
  },
];

const commonMistakes = [
  {
    title: "فتح الهيدج دون خطة خروج",
    description:
      "قد تتحول التغطية إلى مركزين مفتوحين لفترة طويلة مع استمرار التكاليف وعدم وجود قرار واضح.",
  },
  {
    title: "اعتبار الهيدج إلغاءً للخسارة",
    description:
      "الهيدج لا يمحو الخسارة الحالية، بل يغير صافي التعرض وقد يثبت النتيجة مؤقتًا.",
  },
  {
    title: "تجاهل السبريد والتبييت",
    description:
      "فتح صفقة إضافية قد يزيد التكلفة، خصوصًا إذا بقيت التغطية مفتوحة لعدة أيام.",
  },
  {
    title: "استخدام أحجام غير محسوبة",
    description:
      "فتح مركز معاكس أكبر أو أصغر من المطلوب قد ينشئ تعرضًا جديدًا بدل تقليل المخاطرة.",
  },
];

const faqItems = [
  {
    question: "ما هو الهيدج في التداول؟",
    answer:
      "الهيدج أو التغطية هو أسلوب لإدارة المخاطر يعتمد على فتح مركز يعاكس كليًا أو جزئيًا مركزًا قائمًا، بهدف تقليل تأثير حركة السعر غير المرغوبة على الحساب.",
  },
  {
    question: "كيف يعمل الهيدج في الفوركس؟",
    answer:
      "يمكن تنفيذ الهيدج بفتح صفقة شراء وصفقة بيع على زوج العملات نفسه، أو باستخدام أداة مرتبطة. النتيجة تعتمد على حجم كل صفقة، تكاليف التداول، وسياسة الوسيط.",
  },
  {
    question: "هل الهيدج يمنع الخسارة تمامًا؟",
    answer:
      "لا. الهيدج قد يقلل صافي التعرض أو يثبت الخسارة العائمة مؤقتًا، لكنه لا يلغي الخسائر السابقة ولا يزيل تكاليف السبريد والعمولات والتبييت.",
  },
 {
  question: "ما الفرق بين الهيدج الكامل والهيدج الجزئي؟",
  answer:
    "الهيدج الكامل يستخدم مركزًا معاكسًا مساويًا تقريبًا للمركز الأصلي، بينما يستخدم الهيدج الجزئي مركزًا أصغر لتقليل جزء من المخاطرة مع الإبقاء على فرصة الاستفادة إذا استمر الاتجاه.",
},
  {
    question: "هل الهيدج مسموح لدى جميع الوسطاء؟",
    answer:
      "لا. تختلف القواعد حسب شركة الوساطة والجهة الرقابية ونوع الحساب والمنصة. قد تسمح بعض الحسابات بفتح مراكز متعاكسة، بينما تطبق حسابات أخرى نظام صافي المراكز.",
  },
  {
    question: "هل الهيدج أفضل من وقف الخسارة؟",
    answer:
      "لا توجد إجابة واحدة. وقف الخسارة يغلق المركز عند مستوى محدد، بينما يبقي الهيدج المراكز مفتوحة ويضيف تعقيدًا وتكاليف محتملة. الاختيار يعتمد على خطة التداول والخبرة.",
  },
  {
    question: "متى يمكن استخدام استراتيجية الهيدج؟",
    answer:
      "قد يستخدمها بعض المتداولين قبل حدث مؤثر، أو عند إدارة تعرض متعدد، أو عند الحاجة إلى تقليل المخاطرة مؤقتًا. يجب أن تكون هناك خطة مسبقة لفك التغطية.",
  },
];

const relatedGuides = [
  {
    title: "ما هو وقف الخسارة؟",
    description:
      "تعرف على Stop Loss وكيفية تحديد مستوى الخروج عندما يتحرك السوق ضد الصفقة.",
    href: "/learn-trading/stop-loss",
  },
  {
   title: "ما هو اللوت؟",
description:
  "افهم حجم الصفقة وقيمة النقطة وكيف يؤثر اللوت على حجم المخاطرة وإدارة رأس المال.",
    href: "/learn-trading/lot",
  },
  {
    title: "ما هي الرافعة المالية؟",
    description:
      "تعرف على تأثير الرافعة في حجم المراكز والهامش ومخاطر حساب التداول.",
    href: "/learn-trading/leverage",
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
      name: "الهيدج في التداول",
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
      name: "الهيدج في التداول",
    },
    {
      "@type": "Thing",
      name: "Hedging",
    },
    {
      "@type": "Thing",
      name: "التحوط في الفوركس",
    },
    {
      "@type": "Thing",
      name: "إدارة مخاطر التداول",
    },
    {
      "@type": "Thing",
      name: "الهيدج الكامل والجزئي",
    },
  ],

  keywords: [
    "الهيدج",
    "التغطية",
    "Hedging",
    "التحوط",
    "الهيدج في الفوركس",
    "إدارة المخاطر",
    "فتح صفقات متعاكسة",
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

export default function HedgingPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="hedging-ar-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="hedging-ar-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="hedging-ar-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="hedging-ar-faq-schema"
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
            الهيدج
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
                دليل إدارة المخاطر
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                مدة القراءة: 10 دقائق
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
              ما هو الهيدج في التداول؟

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                شرح التغطية Hedging وكيفية تقليل التعرض للمخاطر
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              الهيدج أو التغطية هو أسلوب لإدارة المخاطر يعتمد على فتح مركز
              معاكس أو مرتبط بالمركز الأصلي لتقليل أثر حركة السوق. في هذا
              الدليل ستتعرف على طريقة عمل الهيدج، وأنواعه، وتكاليفه، والفرق
              بين التغطية الكاملة والجزئية، مع مثال عملي واضح.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                ابدأ الشرح
              </a>

              <Link
                href="/tools/risk-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                حاسبة المخاطرة
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                شرح مبسط
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                مثال عملي
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                مزايا ومخاطر
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    مثال على الهيدج الكامل
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-black text-violet-700">
                  مركزان متعاكسان
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-emerald-700 sm:min-h-0 sm:text-xs">
                    الصفقة الأصلية
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    شراء 1.00
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    LONG POSITION
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-rose-600 sm:min-h-0 sm:text-xs">
                    صفقة التغطية
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    بيع 1.00
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    SHORT POSITION
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-brand-500">
                    صافي التعرض النظري
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    قريب من الصفر
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  الربح في مركز قد يقابله خسارة في الآخر
                </p>

               <p className="mt-1 text-2xl font-black">
  الخسارة تتوقف مؤقتًا
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
  eyebrow="معنى الهيدج"
  title="كيف يساعد الهيدج على الحد من المخاطر في التداول؟"
/>

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  الهيدج، ويُعرف أيضًا باسم التغطية أو التحوط، هو أسلوب
                  يستخدم لتقليل أثر تحرك السعر ضد مركز قائم. يتم ذلك عبر فتح
                  صفقة معاكسة على الأداة نفسها، أو استخدام أداة أخرى ترتبط
                  حركتها بالمركز الأصلي.
                </p>
<p>
  الهدف من الهيدج ليس تحقيق ربح مضمون أو إلغاء الخسارة، بل الحد من تأثير
  تحركات السوق على الصفقات المفتوحة. عند تنفيذ تغطية كاملة على الأداة نفسها
  وبحجم مساوٍ، يصبح الربح الناتج عن أحد المركزين قريبًا من الخسارة الناتجة عن
  المركز الآخر، قبل احتساب السبريد والعمولات وتكاليف التبييت.
</p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: الهيدج لا يغلق الصفقة الأصلية، بل يضيف مركزًا
                  جديدًا لتقليل تأثير حركة السوق مؤقتًا حتى يقرر المتداول
                  كيفية إدارة المراكز المفتوحة.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
               <MiniDefinition
  label="Market Risk"
  title="مخاطر السوق"
  description="مقدار تأثير تحركات السوق على الصفقات المفتوحة واحتمال زيادة الربح أو الخسارة."
/>

                <MiniDefinition
                  label="Offset"
                  title="المركز المعاكس"
                  description="صفقة تتحرك في الاتجاه المقابل للمركز الأصلي."
                />

                <MiniDefinition
                  label="Cost"
                  title="تكلفة التغطية"
                  description="السبريد والعمولة ورسوم التبييت المحتملة للمركز الإضافي."
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
                eyebrow="آلية التغطية"
                title="كيف تعمل استراتيجية الهيدج عند فتح مركزين متعاكسين؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                لنفترض أن المتداول لديه صفقة شراء على EUR/USD ويتوقع احتمال
                حدوث هبوط مؤقت. بدل إغلاق مركز الشراء، قد يفتح صفقة بيع على
                الزوج نفسه. إذا كان الحجمان متساويين، تنخفض حساسية الحساب
                تجاه حركة السعر، لأن تغير قيمة أحد المركزين يقابله تغير معاكس
                في المركز الآخر.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
              <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
  حركة أحد المركزين تعوض حركة المركز الآخر
</div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="مركز الشراء"
                    value="1.00 لوت"
                    sublabel="LONG"
                  />

                  <CalculationBox
                    label="مركز البيع"
                    value="1.00 لوت"
                    sublabel="SHORT"
                  />

                 <CalculationBox
  label="حالة الصفقة"
  value="مغطاة"
  sublabel="FULL HEDGE"
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
                    text="لدى المتداول صفقة شراء بحجم 1.00 لوت على EUR/USD."
                  />

                  <Step
                    number="2"
                    text="يفتح صفقة بيع بحجم 1.00 لوت على الزوج نفسه."
                  />

                  <Step
                    number="3"
                    text="يصبح صافي التعرض النظري قريبًا من الصفر، لكن تبقى تكاليف المركزين قائمة."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    صافي التعرض صفر لا يعني أن التكلفة صفر
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  حتى عند تساوي أحجام الشراء والبيع، قد يدفع المتداول سبريدًا
                  أو عمولة على كل مركز، إضافة إلى رسوم تبييت محتملة. لذلك قد
                  تتراجع نتيجة الحساب مع مرور الوقت رغم انخفاض التعرض السعري.
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
                title="ماذا يحدث للربح والخسارة بعد فتح صفقة هيدج؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                افترض أن المتداول اشترى EUR/USD بحجم 1.00 لوت، ثم هبط السوق
                وأصبحت الصفقة الأصلية على خسارة قدرها 300 دولار. بعد ذلك فتح
                صفقة بيع مساوية لتقليل أثر أي هبوط إضافي.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="حجم الشراء"
                  value="1.00 لوت"
                />

                <StatCard
                  label="الخسارة الحالية"
                  value="-$300"
                />

                <StatCard
                  label="حجم البيع"
                  value="1.00 لوت"
                />

                <StatCard
                  label="صافي التعرض"
                  value="قريب من صفر"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  إذا هبط السعر 50 نقطة إضافية
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      تغير صفقة الشراء
                    </p>

                    <p className="mt-2 text-xl font-black text-rose-600">
                      -$500
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      50 × $10
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      تغير صفقة البيع
                    </p>

                    <p className="mt-2 text-xl font-black text-emerald-600">
                      +$500
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      50 × $10
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      التغير الصافي
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      ≈ $0
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      BEFORE COSTS
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
                    الخسارة السابقة لا تختفي بعد فتح الهيدج
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  إذا كانت الصفقة الأصلية خاسرة 300 دولار قبل فتح التغطية،
                  فإن هذه الخسارة تبقى موجودة. الهيدج الكامل قد يحد من تغيرها
                  الإضافي، لكنه لا يعيد الحساب تلقائيًا إلى نقطة التعادل.
                </p>
              </div>
            </section>
                        {/* Hedging types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="أنواع التغطية"
                title="ما أنواع الهيدج المستخدمة في التداول؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                يختلف شكل الهيدج حسب مقدار التعرض الذي يريد المتداول تقليله،
                والأداة المستخدمة، وحجم المركز المعاكس. قد تكون التغطية كاملة
                على الأداة نفسها، أو جزئية بحجم أصغر، أو غير مباشرة باستخدام
                أصل يرتبط بالمركز الأصلي.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {hedgingTypes.map((type, index) => (
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
                            {type.badge}
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
                {hedgingTypes.map((type) => (
                  <div
                    key={type.title}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
                        {type.badge}
                      </span>

                      <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
                        {type.subtitle}
                      </span>
                    </div>

                    <div className="min-h-[66px] pt-4">
                      <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:text-[19px]">
                        {type.title}
                      </h3>
                    </div>

                    <div className="pb-5 pt-2">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {type.description}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4">
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

              {/* Comparison table */}
              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    المقارنة
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    الهيدج الكامل
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    الهيدج الجزئي
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    الهيدج غير المباشر
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <HedgingComparisonRow
                    title="حجم التغطية"
                    full="مساوٍ تقريبًا للمركز"
                    partial="أصغر من المركز"
                    cross="بحسب الارتباط"
                  />

                  <HedgingComparisonRow
                    title="صافي التعرض"
                    full="منخفض جدًا"
                    partial="منخفض جزئيًا"
                    cross="غير ثابت"
                  />

                  <HedgingComparisonRow
                    title="درجة التعقيد"
                    full="متوسطة"
                    partial="متوسطة"
                    cross="مرتفعة"
                  />

                  <HedgingComparisonRow
                    title="خطر تغير الارتباط"
                    full="غير موجود"
                    partial="غير موجود"
                    cross="موجود"
                  />
                </div>
              </div>
            </section>

            {/* Benefits and risks */}
            <section
              id="benefits-risks"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="تقييم الاستراتيجية"
                title="ما مزايا الهيدج وما المخاطر والتكاليف المرتبطة به؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                قد يمنح الهيدج المتداول وقتًا إضافيًا لإدارة مركز قائم أو
                تقليل التعرض خلال فترة غير واضحة، لكنه لا يحول الصفقة إلى
                استثمار خالٍ من المخاطر. فتح أكثر من مركز يزيد عدد القرارات
                والتكاليف التي يجب متابعتها.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ✓
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      مزايا محتملة
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "تقليل صافي التعرض خلال فترة تقلب أو عدم وضوح.",
                      "إدارة مركز قائم دون إغلاقه مباشرة.",
                      "تخفيف جزء من أثر حركة السعر المعاكسة.",
                      "مرونة أكبر عند التعامل مع عدة مراكز أو أدوات.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700"
                      >
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
                          ✓
                        </span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ⚠️
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      مخاطر وتكاليف
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "دفع سبريد أو عمولة على مركز إضافي.",
                      "احتمال تراكم رسوم التبييت بمرور الوقت.",
                      "تعقيد قرار فك التغطية وإغلاق أحد المركزين.",
                      "تثبيت خسارة عائمة بدل معالجتها فعليًا.",
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

              {/* Mobile factors */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {hedgingFactors.map((factor) => (
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
                {hedgingFactors.map((factor) => (
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

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  مثال على التغطية الجزئية
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="المركز الأصلي"
                    value="شراء 1.00"
                    sublabel="LONG"
                  />

                  <CalculationBox
                    label="صفقة الهيدج"
                    value="بيع 0.40"
                    sublabel="SHORT"
                  />

                  <CalculationBox
                    label="صافي التعرض"
                    value="شراء 0.60"
                    sublabel="NET EXPOSURE"
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
                    التغطية الجزئية لا توقف حركة الحساب بالكامل
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  في المثال السابق يبقى صافي المركز شراء 0.60 لوت. لذلك
                  يستفيد الحساب إذا ارتفع السعر، ويتضرر إذا هبط، لكن بدرجة
                  أقل من وجود صفقة الشراء الأصلية دون تغطية.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  أسئلة يجب الإجابة عنها قبل استخدام الهيدج
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "ما مقدار التعرض الذي أريد تقليله؟",
                    "كم ستبلغ تكلفة السبريد والعمولات والتبييت؟",
                    "متى سأغلق صفقة التغطية أو أخفض حجمها؟",
                    "هل يسمح نوع الحساب بفتح مراكز متعاكسة؟",
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
                    href="/tools/risk-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    استخدم حاسبة المخاطرة
                  </Link>

                  <Link
                    href="/tools/lot-size-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    احسب حجم اللوت
                  </Link>
                </div>
              </div>
            </section>

            {/* Common mistakes */}
            <section
              id="mistakes"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="إدارة المراكز"
                title="ما الأخطاء الشائعة عند استخدام الهيدج في التداول؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                أكبر مشكلة في الهيدج تظهر عندما يستخدمه المتداول لتأجيل قرار
                الخروج من الصفقة بدل استخدامه ضمن خطة محددة. وجود مركزين
                متعاكسين لا يعني أن المخاطرة انتهت، بل قد تنتقل من حركة السعر
                إلى تكاليف إضافية وتعقيد في الإدارة.
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
                    لا تستخدم الهيدج فقط للهروب من إغلاق صفقة خاسرة
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  فتح صفقة معاكسة دون تحديد سبب واضح وموعد لفك التغطية قد
                  يجمد الخسارة ويزيد التكاليف. يجب أن يكون الهيدج قرارًا
                  مخططًا لإدارة التعرض، وليس وسيلة لتجنب الاعتراف بخطأ
                  التحليل.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  ما الفرق بين الهيدج وإغلاق الصفقة؟
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  إغلاق الصفقة ينهي التعرض والمخاطرة والتكاليف المستقبلية
                  المرتبطة بالمركز. أما الهيدج فيبقي الصفقة الأصلية مفتوحة
                  ويضيف مركزًا جديدًا، ولذلك يستمر الهامش والتكلفة والحاجة
                  إلى اتخاذ قرار لاحق.
                </p>
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
                title="الأسئلة الشائعة عن الهيدج والتغطية في التداول"
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
                  مفاهيم مرتبطة بالهيدج وإدارة المخاطر
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  فهم وقف الخسارة وحجم اللوت والرافعة المالية يساعدك على
                  مقارنة الهيدج بطرق إدارة المخاطر الأخرى وتقييم أثره على
                  الحساب.
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
                احسب حجم المخاطرة
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                استخدم رصيد الحساب ونسبة المخاطرة ومسافة وقف الخسارة لتقدير
                حجم الصفقة قبل إضافة أي مركز تغطية.
              </p>

              <Link
                href="/tools/risk-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                فتح حاسبة المخاطرة
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
              قيّم تكلفة الهيدج قبل فتح المركز المعاكس
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              احسب صافي التعرض وتكاليف السبريد والتبييت، وحدد مسبقًا متى
              ستفك التغطية. الهيدج أداة لإدارة المخاطر وليس طريقة لإلغاء
              الخسائر أو ضمان الربح.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/tools/risk-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                حاسبة المخاطرة
              </Link>

              <Link
                href="/learn-trading/stop-loss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                دليل وقف الخسارة
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

function HedgingComparisonRow({
  title,
  full,
  partial,
  cross,
}: {
  title: string;
  full: string;
  partial: string;
  cross: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {full}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {partial}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {cross}
      </div>
    </div>
  );
}