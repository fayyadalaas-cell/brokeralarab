import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/learn-trading/take-profit";

const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/take-profit";

const PAGE_TITLE =
  "ما هو جني الأرباح؟ شرح Take Profit وكيفية تحديد هدف الربح";

const PAGE_DESCRIPTION =
  "تعرف على معنى جني الأرباح في التداول، وكيف يعمل أمر Take Profit، وأفضل طرق تحديد هدف الربح، ونسبة المخاطرة إلى العائد مع أمثلة عملية واضحة.";

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
    "ما هو جني الأرباح",
    "جني الأرباح في التداول",
    "شرح Take Profit",
    "أمر جني الأرباح",
    "كيفية تحديد هدف الربح",
    "مكان جني الأرباح",
    "جني الأرباح في الفوركس",
    "تحديد التيك بروفت",
    "Take Profit",
    "نسبة المخاطرة إلى العائد",
    "Risk Reward Ratio",
    "هدف الربح في التداول",
    "الفرق بين وقف الخسارة وجني الأرباح",
    "كيفية حساب جني الأرباح",
    "استراتيجية جني الأرباح",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هو جني الأرباح؟" },
  { id: "how-it-works", label: "كيف يعمل؟" },
  { id: "example", label: "مثال عملي" },
  { id: "methods", label: "طرق تحديد الهدف" },
  { id: "risk-reward", label: "المخاطرة إلى العائد" },
  { id: "mistakes", label: "أخطاء شائعة" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const takeProfitMethods = [
  {
    title: "عند الدعم أو المقاومة",
    subtitle: "Support & Resistance",
    description:
      "يتم تحديد هدف الربح قرب مستوى فني قد يتباطأ عنده السعر أو ينعكس، مثل مقاومة في صفقة شراء أو دعم في صفقة بيع.",
    points: [
      "يعتمد على مستويات واضحة على الرسم البياني.",
      "يساعد على اختيار هدف منطقي بدل رقم عشوائي.",
      "يفضل وضع الهدف قبل المستوى بقليل أحيانًا.",
    ],
    badge: "الأكثر استخدامًا",
  },
  {
    title: "حسب نسبة المخاطرة للعائد",
    subtitle: "Risk-to-Reward",
    description:
      "يتم اختيار الهدف وفق نسبة محددة مقارنة بمسافة وقف الخسارة، مثل استهداف ربح يساوي ضعف الخسارة المحتملة.",
    points: [
      "يساعد على تقييم الصفقة قبل الدخول.",
      "يُستخدم عادة مع نسب مثل 1:2 أو 1:3.",
      "لا يلغي ضرورة وجود مستوى فني منطقي.",
    ],
    badge: "لتخطيط الصفقة",
  },
  {
    title: "جني الأرباح الجزئي",
    subtitle: "Partial Take Profit",
    description:
      "يتم إغلاق جزء من الصفقة عند هدف أول، وترك الجزء المتبقي مفتوحًا لاستهداف حركة أكبر مع تعديل إدارة المخاطر.",
    points: [
      "يساعد على تأمين جزء من الربح.",
      "يوفر مرونة عند استمرار الاتجاه.",
      "يحتاج إلى خطة واضحة لتقسيم المركز.",
    ],
    badge: "مرونة أكبر",
  },
];

const targetMethods = [
  {
    icon: "📈",
    title: "المقاومة في صفقات الشراء",
    description:
      "يمكن وضع هدف الربح قبل مقاومة واضحة لأن السعر قد يتباطأ أو ينعكس عندها، خصوصًا إذا تكررت ردود الفعل حول المستوى.",
  },
  {
    icon: "📉",
    title: "الدعم في صفقات البيع",
    description:
      "في صفقة البيع يمكن استهداف منطقة دعم سابقة باعتبارها مستوى قد يظهر عنده الطلب ويتوقف الهبوط مؤقتًا.",
  },
  {
    icon: "📏",
    title: "قياس الحركة السعرية",
    description:
      "يمكن استخدام طول الموجة السابقة أو النطاق السعري أو نموذج فني لتقدير هدف محتمل، بشرط ألا يكون بعيدًا عن واقع السوق.",
  },
  {
    icon: "⚖️",
    title: "نسبة المخاطرة إلى العائد",
    description:
      "يتم مقارنة مسافة الهدف بمسافة وقف الخسارة لمعرفة ما إذا كان الربح المحتمل يبرر مقدار المخاطرة قبل فتح الصفقة.",
  },
];

const commonMistakes = [
  {
    title: "اختيار هدف بعيد جدًا",
    description:
      "قد يكون الهدف غير واقعي مقارنة بتقلب السوق أو المقاومة والدعم القريبين.",
  },
  {
    title: "إغلاق الصفقة مبكرًا",
    description:
      "الخوف من فقدان ربح صغير قد يدفع المتداول إلى الخروج قبل وصول السعر إلى هدف مدروس.",
  },
  {
    title: "تحريك الهدف دون خطة",
    description:
      "إبعاد هدف الربح باستمرار بسبب الطمع قد يحول صفقة رابحة إلى فرصة ضائعة.",
  },
  {
    title: "تجاهل نسبة العائد للمخاطرة",
    description:
      "قد تكون نسبة الفوز جيدة، لكن الأهداف الصغيرة مقابل الخسائر الكبيرة تضعف النتيجة على المدى الطويل.",
  },
];

const faqItems = [
  {
    question: "ما هو جني الأرباح في التداول؟",
    answer:
      "جني الأرباح هو أمر يحدد مستوى سعريًا لإغلاق الصفقة تلقائيًا عندما يتحرك السوق في الاتجاه المتوقع ويصل إلى الهدف المحدد، بهدف تثبيت الربح دون الحاجة إلى متابعة الصفقة بشكل مستمر.",
  },
  {
    question: "كيف يعمل أمر Take Profit؟",
    answer:
      "بعد تحديد سعر جني الأرباح، تراقب منصة التداول حركة السوق. عندما يصل السعر إلى المستوى المحدد، يتم إرسال أمر لإغلاق الصفقة أو الجزء المحدد منها حسب إعدادات المتداول.",
  },
  {
    question: "أين أضع هدف جني الأرباح؟",
    answer:
      "يفضل وضع الهدف عند مستوى فني منطقي، مثل مقاومة في صفقة شراء أو دعم في صفقة بيع، مع مراعاة تقلب السوق ونسبة المخاطرة إلى العائد.",
  },
  {
    question: "ما أفضل نسبة مخاطرة إلى عائد؟",
    answer:
      "لا توجد نسبة واحدة مناسبة لكل الاستراتيجيات، لكن كثيرًا من المتداولين يقارنون صفقاتهم بنسب مثل 1:2 أو 1:3. الأهم أن تكون النسبة متوافقة مع نسبة نجاح الاستراتيجية وطبيعة السوق.",
  },
  {
    question: "هل يضمن جني الأرباح التنفيذ عند السعر المحدد؟",
    answer:
      "في الظروف الطبيعية يتم التنفيذ غالبًا عند السعر المحدد أو قريبًا منه، لكن في الأسواق السريعة أو عند حدوث فجوات قد يختلف سعر التنفيذ حسب السيولة وآلية الوسيط.",
  },
  {
    question: "ما الفرق بين جني الأرباح ووقف الخسارة؟",
    answer:
      "جني الأرباح يغلق الصفقة عند الوصول إلى مستوى ربح مستهدف، بينما يغلق وقف الخسارة الصفقة عندما يتحرك السعر ضد المتداول إلى مستوى محدد للحد من الخسارة.",
  },
  {
    question: "هل يمكن وضع أكثر من هدف للصفقة؟",
    answer:
      "نعم، يمكن تقسيم الصفقة إلى أجزاء وإغلاق كل جزء عند هدف مختلف، وهو ما يعرف بجني الأرباح الجزئي. يساعد ذلك على تأمين جزء من الربح وترك جزء آخر للاستفادة من استمرار الاتجاه.",
  },
];

const relatedGuides = [
  {
    title: "ما هو وقف الخسارة؟",
    description:
      "تعرف على أمر Stop Loss وكيفية تحديد مستوى الخروج عند تحرك السوق ضدك.",
    href: "/learn-trading/stop-loss",
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
      name: "جني الأرباح",
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
      name: "جني الأرباح",
    },
    {
      "@type": "Thing",
      name: "Take Profit",
    },
    {
      "@type": "Thing",
      name: "نسبة المخاطرة إلى العائد",
    },
    {
      "@type": "Thing",
      name: "إدارة صفقات التداول",
    },
    {
      "@type": "Thing",
      name: "تداول الفوركس",
    },
  ],

  keywords: [
    "جني الأرباح",
    "أمر جني الأرباح",
    "Take Profit",
    "هدف الربح",
    "نسبة المخاطرة إلى العائد",
    "إدارة الصفقة",
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

export default function TakeProfitPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="take-profit-ar-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="take-profit-ar-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="take-profit-ar-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="take-profit-ar-faq-schema"
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
            جني الأرباح
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="absolute bottom-[-140px] left-[-80px] h-[320px] w-[320px] rounded-full bg-sky-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                دليل إدارة الصفقة
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                مدة القراءة: 9 دقائق
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
              ما هو جني الأرباح؟

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                شرح أمر Take Profit وكيفية تحديد هدف الربح
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              جني الأرباح هو أمر يغلق الصفقة تلقائيًا عندما يصل السعر إلى
              هدف محدد. في هذا الدليل ستتعرف على طريقة عمله، وكيفية اختيار
              هدف واقعي، وعلاقته بوقف الخسارة ونسبة المخاطرة إلى العائد، مع
              أمثلة عملية تساعدك على تخطيط الخروج قبل دخول السوق.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                ابدأ الشرح
              </a>

              <Link
                href="/tools/profit-loss-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                حاسبة الربح والخسارة
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

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  هدف الصفقة
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

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-emerald-700 sm:min-h-0 sm:text-xs">
                    جني الأرباح
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.1100
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    TAKE PROFIT
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-emerald-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-emerald-600">
                    مسافة الهدف
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    100 نقطة
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  إذا كانت قيمة النقطة دولارين
                </p>

                <p className="mt-1 text-2xl font-black">
                  الربح المحتمل ≈ $200
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
                eyebrow="معنى جني الأرباح"
                title="كيف يحدد أمر جني الأرباح نقطة الخروج المستهدفة؟"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  جني الأرباح هو أمر يضعه المتداول عند مستوى سعري محدد لإغلاق
                  الصفقة تلقائيًا عندما يتحرك السوق في الاتجاه المتوقع. يساعد
                  الأمر على تحويل الربح العائم إلى ربح محقق عند وصول السعر
                  إلى الهدف.
                </p>

                <p>
                  في صفقة الشراء يوضع هدف جني الأرباح عادة أعلى سعر الدخول،
                  بينما يوضع في صفقة البيع أسفل سعر الدخول. يجب أن يستند
                  الهدف إلى مستوى فني منطقي وإلى حركة يمكن للسوق الوصول إليها،
                  وليس إلى رقم اختاره المتداول بناءً على مقدار الربح الذي
                  يرغب فيه فقط.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: أمر Take Profit يحدد السعر الذي تخطط عنده للخروج
                  من الصفقة الرابحة بدل ترك القرار للعاطفة أو الانتظار دون
                  هدف واضح.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Target"
                  title="سعر الهدف"
                  description="المستوى الذي يتم عنده تفعيل أمر إغلاق الصفقة."
                />

                <MiniDefinition
                  label="Distance"
                  title="مسافة الهدف"
                  description="عدد النقاط بين سعر الدخول ومستوى جني الأرباح."
                />

                <MiniDefinition
                  label="Reward"
                  title="الربح المحتمل"
                  description="النتيجة النظرية حسب قيمة النقطة ومسافة الهدف."
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
                title="كيف يعمل أمر Take Profit عند وصول السعر إلى الهدف؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                بعد فتح الصفقة وإضافة مستوى جني الأرباح، تراقب منصة التداول
                حركة السعر. عندما يصل السوق إلى الهدف، يتم إرسال أمر لإغلاق
                المركز. في ظروف السوق الطبيعية يتم التنفيذ غالبًا عند السعر
                المحدد أو قريبًا منه، حسب السيولة وآلية تنفيذ الوسيط.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  الربح المحتمل = مسافة الهدف × قيمة النقطة
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="مسافة الهدف"
                    value="100"
                    sublabel="PIPS"
                  />

                  <CalculationBox
                    label="قيمة النقطة"
                    value="$2"
                    sublabel="PER PIP"
                  />

                  <CalculationBox
                    label="الربح المحتمل"
                    value="$200"
                    sublabel="ESTIMATED PROFIT"
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
                    text="تم فتح صفقة شراء ووضع جني الأرباح على بعد 100 نقطة."
                  />

                  <Step
                    number="2"
                    text="قيمة النقطة حسب حجم اللوت المستخدم تساوي دولارين."
                  />

                  <Step
                    number="3"
                    text="نضرب 100 نقطة في دولارين، فيكون الربح النظري 200 دولار."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    الوصول إلى الهدف ليس مضمونًا
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  قد يتحرك السوق قريبًا من هدف جني الأرباح ثم ينعكس قبل
                  الوصول إليه. لذلك يجب اختيار هدف يستند إلى حركة السعر
                  ومستويات السوق، لا إلى توقعات مبالغ فيها أو رغبة في تحقيق
                  مبلغ محدد.
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
                title="كيف يرتبط جني الأرباح بوقف الخسارة ونسبة العائد؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لنفترض أن المتداول فتح صفقة يكون وقف الخسارة فيها على بعد
                50 نقطة، بينما حدد جني الأرباح على بعد 100 نقطة. في هذه الحالة
                يكون الربح المحتمل ضعف الخسارة المحتملة، وتكون نسبة المخاطرة
                إلى العائد 1:2.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="مسافة وقف الخسارة"
                  value="50 نقطة"
                />

                <StatCard
                  label="مسافة جني الأرباح"
                  value="100 نقطة"
                />

                <StatCard
                  label="الخسارة المحتملة"
                  value="$100"
                />

                <StatCard
                  label="الربح المحتمل"
                  value="$200"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  حساب نسبة المخاطرة إلى العائد
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      المخاطرة
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      50 نقطة
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      STOP DISTANCE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      العائد المستهدف
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      100 نقطة
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      TARGET DISTANCE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      نسبة المخاطرة للعائد
                    </p>

                    <p className="mt-2 text-xl font-black text-brand-600">
                      1:2
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      RISK / REWARD
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
                    النسبة الجيدة لا تعني أن الهدف واقعي
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  لا تضع هدفًا بعيدًا فقط للحصول على نسبة 1:3 أو 1:4. يجب أن
                  يكون مستوى جني الأرباح قابلًا للوصول وفق حركة السوق
                  والدعم والمقاومة والتقلب، وإلا تصبح النسبة جيدة على الورق
                  فقط.
                </p>
              </div>
            </section>
                        {/* Take-profit methods */}
            <section
              id="methods"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="طرق تحديد الهدف"
                title="ما أفضل الطرق لتحديد مستوى جني الأرباح؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                يمكن تحديد هدف الربح بأكثر من طريقة، لكن الهدف الجيد يجب أن
                يجمع بين مستوى فني منطقي ونسبة عائد مناسبة مقارنة بمقدار
                المخاطرة. كما يمكن تقسيم الصفقة إلى أكثر من هدف لتأمين جزء
                من الربح وترك بقية المركز مفتوحة.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {takeProfitMethods.map((method, index) => (
                  <details
                    key={method.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[16px] font-black leading-6 text-slate-950">
                            {method.title}
                          </h3>

                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-black text-brand-600">
                            {method.badge}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
                          {method.subtitle}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-white px-4 py-4">
                      <p className="text-[13px] font-medium leading-7 text-slate-600">
                        {method.description}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {method.points.map((point) => (
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
                {takeProfitMethods.map((method) => (
                  <div
                    key={method.title}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    {/* Top badges */}
                    <div className="grid grid-cols-2 gap-2">
                      <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
                        {method.badge}
                      </span>

                      <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
                        {method.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="min-h-[82px] pt-4">
                      <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:text-[19px]">
                        {method.title}
                      </h3>
                    </div>

                    {/* Description */}
<div className="pb-5 pt-2">
  <p className="text-sm font-medium leading-7 text-slate-600">
    {method.description}
  </p>
</div>

                    {/* Points */}
                   <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4">
                      {method.points.map((point) => (
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
                    الدعم والمقاومة
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    المخاطرة والعائد
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    الجني الجزئي
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <TakeProfitComparisonRow
                    title="أساس تحديد الهدف"
                    support="مستوى فني"
                    reward="نسبة محسوبة"
                    partial="أهداف متعددة"
                  />

                  <TakeProfitComparisonRow
                    title="تأمين الربح"
                    support="عند الهدف الكامل"
                    reward="عند تحقق النسبة"
                    partial="تدريجيًا"
                  />

                  <TakeProfitComparisonRow
                    title="المرونة"
                    support="متوسطة"
                    reward="متوسطة"
                    partial="مرتفعة"
                  />

                  <TakeProfitComparisonRow
                    title="مناسب للمبتدئين"
                    support="نعم"
                    reward="نعم"
                    partial="يحتاج خطة أدق"
                  />
                </div>
              </div>
            </section>

            {/* Risk reward */}
            <section
              id="risk-reward"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="تقييم الصفقة"
                title="كيف تحسب نسبة المخاطرة إلى العائد؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                نسبة المخاطرة إلى العائد تقارن مقدار الخسارة المحتملة بمقدار
                الربح المستهدف. تساعد هذه النسبة على معرفة ما إذا كان العائد
                المحتمل يبرر المخاطرة قبل فتح الصفقة.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  نسبة المخاطرة إلى العائد = مسافة وقف الخسارة : مسافة الهدف
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="مسافة وقف الخسارة"
                    value="40 نقطة"
                    sublabel="RISK"
                  />

                  <CalculationBox
                    label="مسافة جني الأرباح"
                    value="80 نقطة"
                    sublabel="REWARD"
                  />

                  <CalculationBox
                    label="النسبة"
                    value="1:2"
                    sublabel="RISK / REWARD"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  كيف تقرأ نسبة 1:2؟
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  تعني نسبة 1:2 أن المتداول يخاطر بوحدة واحدة من المال
                  مقابل استهداف وحدتين من الربح. فإذا كانت الخسارة المحتملة
                  100 دولار، يكون الربح المستهدف 200 دولار.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <RewardRatioCard
                  ratio="1:1"
                  risk="$100"
                  reward="$100"
                  title="عائد مساوٍ للمخاطرة"
                />

                <RewardRatioCard
                  ratio="1:2"
                  risk="$100"
                  reward="$200"
                  title="ضعف المخاطرة"
                  highlighted
                />

                <RewardRatioCard
                  ratio="1:3"
                  risk="$100"
                  reward="$300"
                  title="ثلاثة أضعاف المخاطرة"
                />
              </div>

              {/* Mobile methods */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {targetMethods.map((method) => (
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

              {/* Desktop methods */}
              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
                {targetMethods.map((method) => (
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

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    لا توجد نسبة مثالية لجميع الاستراتيجيات
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  قد تناسب نسبة 1:1 استراتيجية ذات معدل نجاح مرتفع، بينما قد
                  تحتاج استراتيجية أخرى إلى 1:2 أو أكثر. يجب تقييم النسبة
                  مع معدل نجاح الصفقات وتكاليف التداول وطبيعة السوق.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  خطوات تحديد هدف ربح منطقي
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "حدد مستوى وقف الخسارة ومقدار المخاطرة أولًا.",
                    "ابحث عن أقرب دعم أو مقاومة مؤثرة أمام السعر.",
                    "قارن مسافة الهدف بمسافة وقف الخسارة.",
                    "تأكد أن الهدف مناسب لتقلب السوق والإطار الزمني.",
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
                    href="/tools/profit-loss-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    احسب الربح والخسارة
                  </Link>

                  <Link
                    href="/tools/risk-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
                  >
                    استخدم حاسبة المخاطرة
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
                eyebrow="إدارة الربح"
                title="ما الأخطاء الشائعة عند تحديد جني الأرباح؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                اختيار هدف الربح لا يقل أهمية عن تحديد وقف الخسارة. الهدف
                غير الواقعي، أو تغييره بسبب الخوف والطمع، قد يضعف نتائج
                الاستراتيجية حتى عندما يكون اتجاه الصفقة صحيحًا.
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
                    لا تبعد هدف الربح بسبب الطمع
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  إذا وصل السعر قرب الهدف المحدد وفق خطتك، فإن إبعاده دون
                  سبب فني قد يؤدي إلى ضياع الربح عند انعكاس السوق. أي تعديل
                  يجب أن يستند إلى قواعد واضحة وليس إلى الرغبة في تحقيق ربح
                  أكبر فقط.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  هل يجب دائمًا انتظار الهدف الكامل؟
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  ليس بالضرورة. يمكن استخدام جني الأرباح الجزئي أو تحريك وقف
                  الخسارة لحماية الصفقة، لكن يجب تحديد هذه الخطوات مسبقًا
                  ضمن خطة التداول بدل اتخاذها عشوائيًا أثناء تحرك السعر.
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
                title="الأسئلة الشائعة عن جني الأرباح في التداول"
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
                  مفاهيم مرتبطة بجني الأرباح
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  فهم وقف الخسارة وحجم اللوت والرافعة المالية يساعدك على
                  بناء خطة متوازنة للدخول والخروج وإدارة مخاطرة الصفقة.
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
                احسب الربح المتوقع
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                أدخل سعر الدخول والخروج وحجم الصفقة لحساب الربح أو الخسارة
                النظرية قبل فتح المركز.
              </p>

              <Link
                href="/tools/profit-loss-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                فتح حاسبة الربح والخسارة
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
              حدد هدف الربح قبل فتح الصفقة
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              اختر هدفًا واقعيًا وفق حركة السوق والدعم والمقاومة، ثم قارنه
              بوقف الخسارة للتأكد من أن العائد المحتمل يبرر مقدار المخاطرة.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/tools/profit-loss-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                حاسبة الربح والخسارة
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

function TakeProfitComparisonRow({
  title,
  support,
  reward,
  partial,
}: {
  title: string;
  support: string;
  reward: string;
  partial: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {support}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {reward}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {partial}
      </div>
    </div>
  );
}

function RewardRatioCard({
  ratio,
  risk,
  reward,
  title,
  highlighted = false,
}: {
  ratio: string;
  risk: string;
  reward: string;
  title: string;
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
        نسبة {ratio}
      </span>

      <h3 className="mt-3 text-base font-black text-slate-950">
        {title}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-bold text-slate-500">
            المخاطرة
          </p>

          <p className="mt-1 text-base font-black text-slate-950">
            {risk}
          </p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-bold text-slate-500">
            العائد
          </p>

          <p
            className={`mt-1 text-base font-black ${
              highlighted ? "text-brand-600" : "text-slate-950"
            }`}
          >
            {reward}
          </p>
        </div>
      </div>
    </div>
  );
}