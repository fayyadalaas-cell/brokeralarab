import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/learn-trading/stop-loss";

const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/stop-loss";

const PAGE_TITLE =
  "ما هو وقف الخسارة؟ شرح Stop Loss وكيفية تحديده في التداول";

const PAGE_DESCRIPTION =
  "تعرف على معنى وقف الخسارة في التداول، وكيف يعمل أمر Stop Loss، وأفضل طرق تحديد مستواه، والفرق بين وقف الخسارة الثابت والمتحرك مع أمثلة عملية.";

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
    "ما هو وقف الخسارة",
    "وقف الخسارة في التداول",
    "شرح وقف الخسارة",
    "Stop Loss",
    "امر وقف الخسارة",
    "كيفية وضع وقف الخسارة",
    "تحديد وقف الخسارة",
    "وقف الخسارة المتحرك",
    "Trailing Stop",
    "وقف الخسارة في الفوركس",
    "حساب وقف الخسارة",
    "ادارة المخاطر في التداول",
    "مكان وقف الخسارة",
    "الفرق بين وقف الخسارة وجني الأرباح",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هو وقف الخسارة؟" },
  { id: "how-it-works", label: "كيف يعمل؟" },
  { id: "example", label: "مثال عملي" },
  { id: "types", label: "أنواع وقف الخسارة" },
  { id: "placement", label: "أين يوضع؟" },
  { id: "mistakes", label: "أخطاء شائعة" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const stopLossTypes = [
  {
    title: "وقف الخسارة الثابت",
    subtitle: "Fixed Stop Loss",
    description:
      "أمر يوضع عند مستوى سعري محدد، ويظل في مكانه ما لم يقم المتداول بتعديله يدويًا أو إلغاء الصفقة.",
    points: [
      "واضح وسهل الاستخدام للمبتدئين.",
      "يحدد الخسارة المحتملة قبل فتح الصفقة.",
      "لا يتحرك تلقائيًا مع تحرك السعر.",
    ],
    badge: "الأكثر استخدامًا",
  },
  {
    title: "وقف الخسارة المتحرك",
    subtitle: "Trailing Stop",
    description:
      "يتحرك مع السعر عندما تتحرك الصفقة في الاتجاه المربح، لكنه يتوقف عن التحرك إذا انعكس السوق ضد الصفقة.",
    points: [
      "يساعد على حماية جزء من الأرباح.",
      "يتبع السعر بمسافة محددة.",
      "قد يغلق الصفقة بسبب تقلب قصير المدى.",
    ],
    badge: "لحماية الأرباح",
  },
  {
    title: "وقف الخسارة المضمون",
    subtitle: "Guaranteed Stop Loss",
    description:
      "نوع خاص من الأوامر تضمن بعض شركات الوساطة تنفيذه بالسعر المحدد حتى أثناء الفجوات، وقد تفرض مقابله رسومًا إضافية.",
    points: [
      "يحد من أثر الانزلاق السعري.",
      "لا يتوفر لدى جميع الوسطاء أو الأدوات.",
      "قد تكون له تكلفة أو شروط خاصة.",
    ],
    badge: "حماية إضافية",
  },
];

const placementMethods = [
  {
    icon: "📉",
    title: "أسفل الدعم أو أعلى المقاومة",
    description:
      "في صفقة الشراء يمكن وضع الوقف أسفل مستوى دعم واضح، وفي صفقة البيع يمكن وضعه أعلى مستوى مقاومة، مع ترك مساحة مناسبة للتذبذب.",
  },
  {
    icon: "📊",
    title: "بناءً على تقلب السوق",
    description:
      "يمكن استخدام مؤشرات مثل متوسط المدى الحقيقي ATR لتقدير مقدار الحركة الطبيعية للسعر وتجنب وضع الوقف قريبًا جدًا.",
  },
  {
    icon: "🕯️",
    title: "خلف القمم والقيعان",
    description:
      "يضع بعض المتداولين الوقف خلف قاع أو قمة سابقة لأن تجاوزها قد يعني أن فكرة الصفقة لم تعد صالحة.",
  },
  {
    icon: "🛡️",
    title: "حسب مبلغ المخاطرة",
    description:
      "بعد تحديد مستوى الوقف فنيًا، يتم تعديل حجم اللوت حتى تبقى الخسارة المحتملة ضمن النسبة المقبولة من الحساب.",
  },
];

const commonMistakes = [
  {
    title: "وضع الوقف قريبًا جدًا",
    description:
      "قد يغلق التذبذب الطبيعي الصفقة قبل أن يتحرك السعر في الاتجاه المتوقع.",
  },
  {
    title: "إبعاد الوقف بعد الخسارة",
    description:
      "نقل الوقف بعيدًا لتجنب الإغلاق يزيد الخسارة ويكسر خطة إدارة المخاطر.",
  },
  {
    title: "استخدام نفس المسافة دائمًا",
    description:
      "تقلب السوق يختلف بين الأزواج والأوقات، لذلك لا تناسب مسافة ثابتة كل الصفقات.",
  },
  {
    title: "اختيار اللوت قبل تحديد الوقف",
    description:
      "الطريقة الصحيحة هي تحديد مكان الوقف أولًا ثم حساب حجم الصفقة بناءً على المخاطرة.",
  },
];

const faqItems = [
  {
    question: "ما هو وقف الخسارة في التداول؟",
    answer:
      "وقف الخسارة هو أمر يحدد مستوى سعريًا لإغلاق الصفقة تلقائيًا عندما يتحرك السوق ضد المتداول، بهدف الحد من الخسارة المحتملة وعدم ترك الصفقة مفتوحة دون حماية.",
  },
  {
    question: "كيف يعمل أمر Stop Loss؟",
    answer:
      "عندما يصل السعر إلى مستوى وقف الخسارة المحدد، تتحول التعليمات إلى أمر إغلاق حسب آلية التنفيذ لدى الوسيط. قد يتم التنفيذ عند السعر المحدد أو بالقرب منه، وقد يحدث انزلاق سعري أثناء التقلبات القوية أو الفجوات.",
  },
  {
    question: "أين أضع وقف الخسارة؟",
    answer:
      "يجب وضع وقف الخسارة عند مستوى يجعل فكرة الصفقة غير صالحة، مثل أسفل دعم مهم في صفقة شراء أو أعلى مقاومة في صفقة بيع، وليس عند مسافة عشوائية من سعر الدخول.",
  },
  {
    question: "كم يجب أن تكون نسبة وقف الخسارة؟",
    answer:
      "لا توجد نسبة واحدة مناسبة لجميع الصفقات. تعتمد المسافة على تقلب الأداة، ونقطة الدخول، والتحليل الفني، بينما يعتمد مبلغ الخسارة المقبول على رصيد الحساب وخطة إدارة المخاطر.",
  },
  {
    question: "هل وقف الخسارة يضمن السعر المحدد؟",
    answer:
      "ليس دائمًا. في ظروف السوق العادية قد ينفذ الأمر قريبًا من السعر المحدد، لكن أثناء الفجوات أو التقلبات السريعة قد يحدث انزلاق سعري. بعض الوسطاء يقدمون وقف خسارة مضمونًا بشروط أو رسوم إضافية.",
  },
  {
    question: "ما الفرق بين وقف الخسارة ووقف الخسارة المتحرك؟",
    answer:
      "وقف الخسارة الثابت يبقى عند مستوى محدد، بينما يتحرك الوقف المتحرك مع السعر عندما تتحرك الصفقة في الاتجاه المربح، بهدف حماية جزء من الأرباح.",
  },
  {
    question: "هل يمكن التداول دون وقف خسارة؟",
    answer:
      "يمكن فتح صفقة تقنيًا دون أمر وقف، لكن ذلك يترك الخسارة غير محددة وقد يعرض الحساب لمخاطر كبيرة، خصوصًا أثناء الأخبار أو الحركات السريعة.",
  },
];

const relatedGuides = [
  {
    title: "ما هو جني الأرباح؟",
    description:
      "تعرف على أمر Take Profit وكيفية اختيار مستوى الخروج المستهدف.",
    href: "/learn-trading/take-profit",
  },
  {
    title: "ما هو اللوت؟",
    description:
      "افهم حجم الصفقة وقيمة النقطة وتأثير اللوت على الربح والخسارة.",
    href: "/learn-trading/lot",
  },
  {
    title: "ما هي الرافعة المالية؟",
    description:
      "تعرف على تأثير الرافعة في حجم التعرض والهامش ومخاطر الحساب.",
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
      name: "وقف الخسارة",
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
      name: "وقف الخسارة",
    },
    {
      "@type": "Thing",
      name: "Stop Loss",
    },
    {
      "@type": "Thing",
      name: "إدارة مخاطر التداول",
    },
    {
      "@type": "Thing",
      name: "وقف الخسارة المتحرك",
    },
    {
      "@type": "Thing",
      name: "تداول الفوركس",
    },
  ],

  keywords: [
    "وقف الخسارة",
    "أمر وقف الخسارة",
    "Stop Loss",
    "Trailing Stop",
    "إدارة المخاطر",
    "تحديد وقف الخسارة",
    "الفوركس",
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

export default function StopLossPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="stop-loss-ar-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="stop-loss-ar-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="stop-loss-ar-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="stop-loss-ar-faq-schema"
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
            وقف الخسارة
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
                مدة القراءة: 9 دقائق
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
              ما هو وقف الخسارة؟

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                شرح أمر Stop Loss وكيفية تحديده في التداول
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              وقف الخسارة هو أمر يساعدك على تحديد نقطة الخروج من الصفقة إذا
              تحرك السوق ضدك. في هذا الدليل ستتعرف على طريقة عمله، وأفضل
              الأماكن لوضعه، وعلاقته بحجم اللوت وإدارة المخاطر، مع أمثلة
              عملية واضحة.
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
                أمثلة رقمية
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                قواعد عملية
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    مثال على صفقة شراء
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700">
                  حماية الصفقة
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-slate-500 sm:min-h-0 sm:text-xs">
                    سعر الدخول
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.1000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    BUY ENTRY
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-rose-600 sm:min-h-0 sm:text-xs">
                    وقف الخسارة
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.0950
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    STOP LOSS
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-rose-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-rose-500">
                    مسافة الوقف
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    50 نقطة
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  إذا كانت قيمة النقطة دولارين
                </p>

                <p className="mt-1 text-2xl font-black">
                  الخسارة المحتملة ≈ $100
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
                eyebrow="معنى وقف الخسارة"
                title="كيف يحدد أمر وقف الخسارة مقدار الخسارة المحتملة؟"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  وقف الخسارة هو أمر يضعه المتداول عند مستوى سعري محدد لإغلاق
                  الصفقة تلقائيًا إذا تحرك السوق في الاتجاه المعاكس. الهدف
                  الأساسي منه هو منع الخسارة من الاستمرار دون حد واضح.
                </p>

                <p>
                  عند فتح صفقة شراء، يوضع وقف الخسارة عادة أسفل سعر الدخول.
                  وعند فتح صفقة بيع، يوضع عادة أعلى سعر الدخول. لكن اختيار
                  مكان الوقف لا ينبغي أن يكون عشوائيًا، بل يجب أن يرتبط
                  بالتحليل الفني وتقلب السوق ومبلغ المخاطرة المقبول.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: وقف الخسارة يحدد النقطة التي تقرر عندها أن فكرة
                  الصفقة لم تعد صالحة، ويخرجك من السوق قبل أن تتحول الخسارة
                  الصغيرة إلى خسارة أكبر.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Level"
                  title="مستوى الوقف"
                  description="السعر الذي يتم عنده تفعيل أمر إغلاق الصفقة."
                />

                <MiniDefinition
                  label="Distance"
                  title="مسافة الوقف"
                  description="عدد النقاط بين سعر الدخول ومستوى وقف الخسارة."
                />

                <MiniDefinition
                  label="Risk"
                  title="مبلغ المخاطرة"
                  description="الخسارة المحتملة حسب اللوت ومسافة الوقف."
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
                eyebrow="آلية التنفيذ"
                title="كيف يعمل أمر Stop Loss عند تحرك السوق؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                بعد فتح الصفقة وتحديد مستوى وقف الخسارة، تراقب منصة التداول
                السعر. إذا وصل السوق إلى مستوى الوقف، يتم إرسال أمر لإغلاق
                المركز. في ظروف السوق الطبيعية يكون التنفيذ غالبًا قريبًا من
                السعر المحدد، لكن قد يختلف أثناء التقلبات الحادة أو الفجوات.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  الخسارة المحتملة = مسافة وقف الخسارة × قيمة النقطة
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="مسافة الوقف"
                    value="50"
                    sublabel="PIPS"
                  />

                  <CalculationBox
                    label="قيمة النقطة"
                    value="$2"
                    sublabel="PER PIP"
                  />

                  <CalculationBox
                    label="الخسارة المحتملة"
                    value="$100"
                    sublabel="ESTIMATED RISK"
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
                    text="تم فتح صفقة شراء ووضع وقف الخسارة على بعد 50 نقطة."
                  />

                  <Step
                    number="2"
                    text="قيمة النقطة حسب حجم اللوت المستخدم تساوي دولارين."
                  />

                  <Step
                    number="3"
                    text="نضرب 50 نقطة في دولارين، فتكون الخسارة النظرية 100 دولار."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    وقف الخسارة لا يضمن دائمًا سعر التنفيذ
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  عند الأخبار القوية أو افتتاح السوق بعد فجوة سعرية، قد يتم
                  تنفيذ الأمر عند أول سعر متاح بدل السعر المحدد بالضبط. يسمى
                  هذا الفرق بالانزلاق السعري، ويجب أخذه في الاعتبار ضمن إدارة
                  المخاطر.
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
                title="كيف يرتبط وقف الخسارة بحجم اللوت ومبلغ المخاطرة؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لنفترض أن رصيد الحساب 10,000 دولار، وأن المتداول قرر ألا
                يخاطر بأكثر من 1% من الحساب في الصفقة الواحدة. هذا يعني أن
                الحد الأقصى للخسارة هو 100 دولار.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="رصيد الحساب"
                  value="$10,000"
                />

                <StatCard
                  label="نسبة المخاطرة"
                  value="1%"
                />

                <StatCard
                  label="مسافة الوقف"
                  value="50 نقطة"
                />

                <StatCard
                  label="الحد الأقصى للخسارة"
                  value="$100"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  من مبلغ المخاطرة إلى حجم الصفقة
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      مبلغ المخاطرة
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      $100
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      1% OF ACCOUNT
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      مسافة الوقف
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      50 نقطة
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      STOP DISTANCE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      قيمة النقطة المناسبة
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      $2
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      $100 ÷ 50
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
                    مكان الوقف يحدد حجم اللوت وليس العكس
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  حدد أولًا المستوى الفني المناسب لوقف الخسارة، ثم احسب حجم
                  اللوت الذي يبقي الخسارة ضمن الحد المسموح. لا تقلل مسافة
                  الوقف فقط حتى تتمكن من فتح لوت أكبر.
                </p>
              </div>
            </section>
                        {/* Stop-loss types */}
            <section
              id="types"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="أنواع الأوامر"
                title="ما أنواع أوامر وقف الخسارة في التداول؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                لا يقتصر وقف الخسارة على نوع واحد. يمكن للمتداول استخدام وقف
                ثابت عند سعر محدد، أو وقف متحرك يتبع السعر عند تحقيق أرباح،
                بينما توفر بعض شركات الوساطة وقفًا مضمونًا بشروط خاصة.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {stopLossTypes.map((type, index) => (
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
  {stopLossTypes.map((type) => (
    <div
      key={type.title}
      className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
    >
      {/* Top badges */}
      <div className="grid grid-cols-2 gap-2">
        <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
          {type.badge}
        </span>

        <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
          {type.subtitle}
        </span>
      </div>

      {/* Title */}
      <div className="min-h-[82px] pt-4">
       <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:whitespace-nowrap lg:text-[19px]">
  {type.title}
</h3>
      </div>

      {/* Description */}
      <div className="min-h-[154px] pt-2">
        <p className="text-sm font-medium leading-7 text-slate-600">
          {type.description}
        </p>
      </div>

      {/* Points */}
      <ul className="mt-auto space-y-2.5 border-t border-slate-200 pt-4">
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

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    المقارنة
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    الوقف الثابت
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    الوقف المتحرك
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    الوقف المضمون
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <StopLossComparisonRow
                    title="طريقة الحركة"
                    fixed="يبقى عند سعر محدد"
                    trailing="يتبع السعر المربح"
                    guaranteed="يبقى عند سعر محدد"
                  />

                  <StopLossComparisonRow
                    title="حماية الأرباح"
                    fixed="يدويًا"
                    trailing="تلقائيًا جزئيًا"
                    guaranteed="ليست وظيفته الأساسية"
                  />

                  <StopLossComparisonRow
                    title="خطر الانزلاق"
                    fixed="ممكن"
                    trailing="ممكن"
                    guaranteed="محدود حسب الشروط"
                  />

                  <StopLossComparisonRow
                    title="التكلفة الإضافية"
                    fixed="عادة لا"
                    trailing="عادة لا"
                    guaranteed="قد توجد رسوم"
                  />
                </div>
              </div>
            </section>

            {/* Placement */}
            <section
              id="placement"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="تحديد المستوى"
                title="أين يوضع وقف الخسارة بطريقة صحيحة؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                أفضل مكان لوقف الخسارة ليس أقرب سعر إلى نقطة الدخول، بل
                المستوى الذي يعني تجاوزه أن تحليل الصفقة لم يعد صالحًا. يجب
                أن يكون الوقف منطقيًا من الناحية الفنية، ثم يتم تعديل حجم
                اللوت حتى تبقى الخسارة ضمن الحد المقبول.
              </p>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  قاعدة أساسية قبل وضع الوقف
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  لا تسأل أولًا: كم نقطة أريد أن يكون وقف الخسارة؟ اسأل:
                  عند أي مستوى تصبح فكرة الصفقة خاطئة؟ بعد تحديد هذا المستوى،
                  احسب مسافة الوقف ثم اختر حجم اللوت المناسب.
                </p>
              </div>

              {/* Mobile placement methods */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {placementMethods.map((method) => (
                  <details
                    key={method.title}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                          {method.icon}
                        </span>

                        <h3 className="text-[15px] font-black leading-6 text-slate-950">
                          {method.title}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-brand-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {method.description}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Desktop placement methods */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {placementMethods.map((method) => (
                  <div
                    key={method.title}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        {method.icon}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-950">
                          {method.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  ترتيب اتخاذ القرار الصحيح
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="حدد مستوى الإبطال"
                    value="الدعم أو القاع"
                    sublabel="TECHNICAL LEVEL"
                  />

                  <CalculationBox
                    label="احسب مسافة الوقف"
                    value="مثلاً 40 نقطة"
                    sublabel="STOP DISTANCE"
                  />

                  <CalculationBox
                    label="عدّل حجم اللوت"
                    value="حسب المخاطرة"
                    sublabel="POSITION SIZE"
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
                    اترك مساحة للتذبذب الطبيعي
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  وضع الوقف عند الدعم أو المقاومة بالضبط قد يجعله عرضة
                  للتفعيل بسبب حركة قصيرة قبل عودة السعر. يستخدم بعض
                  المتداولين هامشًا إضافيًا يتناسب مع تقلب الأداة والإطار
                  الزمني.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  خطوات عملية لتحديد وقف الخسارة
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "حدد النقطة التي يصبح عندها تحليل الصفقة غير صالح.",
                    "راجع تقلب الأداة قبل اختيار المسافة النهائية.",
                    "احسب الخسارة المحتملة قبل فتح المركز.",
                    "صغّر حجم اللوت إذا كانت مسافة الوقف واسعة.",
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
                eyebrow="إدارة الصفقة"
                title="ما الأخطاء الشائعة عند استخدام وقف الخسارة؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                وجود أمر وقف خسارة لا يكفي وحده. الخطأ في اختيار مكانه أو
                تغييره أثناء الصفقة قد يجعل إدارة المخاطر غير فعالة، حتى لو
                كان الأمر موجودًا على منصة التداول.
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
                    لا توسّع وقف الخسارة لتجنب الاعتراف بالصفقة الخاسرة
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  عندما يصل السعر إلى المستوى الذي ألغى سبب دخولك، فإن إبعاد
                  الوقف يزيد الخسارة ولا يحسن الصفقة. أي تعديل يجب أن يكون
                  جزءًا من خطة مكتوبة، وليس رد فعل عاطفيًا على حركة السوق.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  ما الفرق بين إدارة الصفقة وتغيير الخطة؟
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  نقل الوقف لتقليل المخاطرة أو حماية الربح وفق شروط محددة
                  مسبقًا يعد إدارة للصفقة. أما إبعاده لزيادة الخسارة المسموحة
                  بعد تحرك السوق ضدك فهو تغيير للخطة وليس إدارة للمخاطر.
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
                title="الأسئلة الشائعة عن وقف الخسارة في التداول"
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
                  مفاهيم مرتبطة بوقف الخسارة
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  فهم جني الأرباح وحجم اللوت والرافعة المالية يساعدك على بناء
                  خطة خروج متوازنة والتحكم في مخاطرة كل صفقة.
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
                احسب مخاطرة الصفقة
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                حدد رصيد الحساب ونسبة المخاطرة ومسافة وقف الخسارة لمعرفة مبلغ
                المخاطرة وحجم الصفقة المناسب.
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
              حدد وقف الخسارة قبل فتح الصفقة
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              اختر مستوى الوقف وفق التحليل وتقلب السوق، ثم احسب حجم اللوت
              الذي يحافظ على الخسارة المحتملة ضمن حدود خطة إدارة المخاطر.
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
                href="/tools/lot-size-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                حاسبة حجم اللوت
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

function StopLossComparisonRow({
  title,
  fixed,
  trailing,
  guaranteed,
}: {
  title: string;
  fixed: string;
  trailing: string;
  guaranteed: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {fixed}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {trailing}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {guaranteed}
      </div>
    </div>
  );
}