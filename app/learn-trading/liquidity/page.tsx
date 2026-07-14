import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/learn-trading/liquidity";

const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/liquidity";

const PAGE_TITLE =
  "ما هي السيولة في التداول؟ شرح Liquidity وتأثيرها على الأسعار";

const PAGE_DESCRIPTION =
  "تعرف على معنى السيولة في التداول والفوركس، وكيف تؤثر على السبريد والتنفيذ والانزلاق السعري، وأوقات ارتفاع وانخفاض السيولة مع أمثلة عملية.";

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
    "ما هي السيولة في التداول",
    "السيولة في الفوركس",
    "شرح السيولة",
    "Liquidity",
    "مفهوم السيولة",
    "السيولة في الأسواق المالية",
    "مزود السيولة",
    "Liquidity Provider",
    "نقص السيولة",
    "ارتفاع السيولة",
    "السيولة والسبريد",
    "السيولة والانزلاق السعري",
    "أوقات السيولة في الفوركس",
    "سيولة السوق",
    "عمق السوق",
    "حجم التداول والسيولة",
    "أفضل أوقات تداول الفوركس",
    "تنفيذ أوامر التداول",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هي السيولة؟" },
  { id: "how-it-works", label: "كيف تعمل؟" },
  { id: "example", label: "مثال عملي" },
  { id: "levels", label: "مستويات السيولة" },
  { id: "impact", label: "تأثيرها على التداول" },
  { id: "mistakes", label: "أخطاء شائعة" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const liquidityLevels = [
  {
    title: "سيولة مرتفعة",
    subtitle: "High Liquidity",
    description:
      "تتوفر أوامر شراء وبيع كثيرة بالقرب من السعر الحالي، مما يساعد على تنفيذ الصفقات بسرعة وبفروق سعرية أقل نسبيًا.",
    points: [
      "تنفيذ أسرع في الظروف الطبيعية.",
      "سبريد أقل في كثير من الحالات.",
      "انزلاق سعري محدود نسبيًا.",
    ],
    badge: "أفضل للتنفيذ",
  },
  {
    title: "سيولة متوسطة",
    subtitle: "Moderate Liquidity",
    description:
      "تتوفر أوامر كافية للتداول المعتاد، لكن السبريد والانزلاق قد يرتفعان مع زيادة حجم الصفقة أو تغير ظروف السوق.",
    points: [
      "مناسبة لمعظم أحجام التجزئة.",
      "قد يتغير التنفيذ وقت الأخبار.",
      "تعتمد على الأداة ووقت التداول.",
    ],
    badge: "الوضع المعتاد",
  },
  {
    title: "سيولة منخفضة",
    subtitle: "Low Liquidity",
    description:
      "تكون أوامر الشراء والبيع أقل أو متباعدة، مما قد يؤدي إلى اتساع السبريد وصعوبة تنفيذ الأحجام الكبيرة عند السعر المطلوب.",
    points: [
      "سبريد أوسع وحركة أكثر حدة.",
      "احتمال أكبر للانزلاق السعري.",
      "قد تظهر فجوات سعرية أو قفزات سريعة.",
    ],
    badge: "مخاطر تنفيذ أعلى",
  },
];

const liquidityFactors = [
  {
    icon: "🕒",
    title: "جلسة التداول",
    description:
      "ترتفع السيولة عادة عند نشاط المراكز المالية الكبرى، خصوصًا خلال تداخل جلسات لندن ونيويورك، بينما تنخفض في الفترات الهادئة.",
  },
  {
    icon: "📊",
    title: "شعبية الأداة",
    description:
      "الأزواج الرئيسية مثل EUR/USD غالبًا أكثر سيولة من الأزواج النادرة، لأن عدد المتداولين والمؤسسات المشاركة فيها أكبر.",
  },
  {
    icon: "📰",
    title: "الأخبار الاقتصادية",
    description:
      "قد يرتفع النشاط وقت الأخبار، لكن السيولة المتاحة عند الأسعار القريبة قد تختفي سريعًا، مما يسبب توسع السبريد وانزلاق التنفيذ.",
  },
  {
    icon: "🏦",
    title: "مزودو السيولة",
    description:
      "البنوك والمؤسسات وشبكات التسعير تساهم في توفير أسعار البيع والشراء، ويؤثر عدد المصادر وجودتها في عمق السوق والتنفيذ.",
  },
];

const commonMistakes = [
  {
    title: "اعتبار حجم التداول هو السيولة نفسها",
    description:
      "الحجم والسيولة مرتبطان، لكن السيولة تعتمد أيضًا على عمق الأوامر وسهولة التنفيذ دون تحريك السعر.",
  },
  {
    title: "الدخول وقت اتساع السبريد",
    description:
      "تنفيذ الصفقة خلال انخفاض السيولة قد يرفع تكلفة الدخول حتى لو لم يتغير اتجاه السوق.",
  },
  {
    title: "تجاهل حجم الصفقة",
    description:
      "قد تكون الأداة سائلة للأحجام الصغيرة، لكن الأمر الكبير قد يُنفذ على أكثر من سعر.",
  },
  {
    title: "افتراض ثبات السيولة",
    description:
      "السيولة تتغير حسب الجلسة والأخبار والعطلات وظروف السوق، وليست مستوى ثابتًا طوال اليوم.",
  },
];

const faqItems = [
  {
    question: "ما هي السيولة في التداول؟",
    answer:
      "السيولة هي مدى سهولة شراء أو بيع أصل مالي بسرعة وبسعر قريب من السعر الحالي، دون أن يؤدي الأمر إلى تحريك السوق بشكل كبير.",
  },
  {
    question: "ما معنى السيولة في الفوركس؟",
    answer:
      "تعبر السيولة في سوق الفوركس عن توفر مشترين وبائعين وأسعار قابلة للتنفيذ على أزواج العملات. كلما زاد عمق السوق، كان تنفيذ الأوامر أسهل عادة.",
  },
  {
    question: "كيف تؤثر السيولة على السبريد؟",
    answer:
      "عند ارتفاع السيولة تتقارب أسعار الشراء والبيع عادة، فينخفض السبريد. وعند انخفاضها قد تتباعد الأسعار ويتسع السبريد.",
  },
  {
    question: "هل ارتفاع حجم التداول يعني سيولة مرتفعة؟",
    answer:
      "ليس دائمًا. قد يكون حجم التداول مرتفعًا مع تقلبات قوية واختفاء الأوامر القريبة من السعر. السيولة تشمل الحجم وعمق الأوامر وجودة التنفيذ.",
  },
  {
    question: "ما هو مزود السيولة؟",
    answer:
      "مزود السيولة هو بنك أو مؤسسة أو جهة تسعير توفر عروض شراء وبيع للأدوات المالية، وتساعد الوسطاء والمنصات على تنفيذ أوامر العملاء.",
  },
  {
    question: "متى تكون السيولة مرتفعة في الفوركس؟",
    answer:
      "ترتفع السيولة غالبًا أثناء نشاط جلسات لندن ونيويورك، وخصوصًا خلال فترة التداخل بينهما، لكن المستوى يختلف حسب زوج العملات والأخبار.",
  },
  {
    question: "ما علاقة السيولة بالانزلاق السعري؟",
    answer:
      "عند انخفاض السيولة قد لا تتوفر كمية كافية عند السعر المطلوب، فيتم تنفيذ الأمر عند سعر مختلف أو على عدة مستويات، وهو ما قد يسبب الانزلاق السعري.",
  },
];

const relatedGuides = [
  {
    title: "ما هو السبريد؟",
    description:
      "تعرف على الفرق بين سعر الشراء والبيع وعلاقته بالسيولة وتكلفة التداول.",
    href: "/learn-trading/spread",
  },
  {
    title: "ما هو اللوت؟",
    description:
      "افهم حجم الصفقة وتأثيره على التنفيذ وقيمة النقطة والمخاطرة.",
    href: "/learn-trading/lot",
  },
  {
    title: "ما هو وقف الخسارة؟",
    description:
      "تعرف على كيفية إدارة الخروج عند تحرك السوق والانزلاق السعري المحتمل.",
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
      name: "السيولة في التداول",
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
      name: "السيولة في التداول",
    },
    {
      "@type": "Thing",
      name: "Market Liquidity",
    },
    {
      "@type": "Thing",
      name: "السيولة في الفوركس",
    },
    {
      "@type": "Thing",
      name: "مزودو السيولة",
    },
    {
      "@type": "Thing",
      name: "السبريد والانزلاق السعري",
    },
  ],

  keywords: [
    "السيولة",
    "Liquidity",
    "السيولة في الفوركس",
    "سيولة السوق",
    "مزود السيولة",
    "السبريد",
    "الانزلاق السعري",
    "تنفيذ الأوامر",
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

export default function LiquidityPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f6f8fc] text-slate-950"
    >
      <Script
        id="liquidity-ar-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="liquidity-ar-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="liquidity-ar-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="liquidity-ar-faq-schema"
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
            السيولة
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="absolute bottom-[-140px] left-[-80px] h-[320px] w-[320px] rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                دليل فهم السوق
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                مدة القراءة: 10 دقائق
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
              ما هي السيولة في التداول؟

              <span className="mt-3 hidden max-w-3xl text-[26px] font-black leading-[1.45] text-slate-700 sm:block lg:text-[34px]">
                شرح Liquidity وتأثيرها على السبريد وتنفيذ الأوامر
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              السيولة توضح مدى سهولة شراء أو بيع الأصل بسرعة وبسعر قريب من
              السعر الحالي. في هذا الدليل ستتعرف على كيفية عمل السيولة في
              الفوركس، وعلاقتها بالسبريد والانزلاق السعري وعمق السوق، وأوقات
              ارتفاعها وانخفاضها، مع مثال عملي واضح.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#definition"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
              >
                ابدأ الشرح
              </a>

              <Link
                href="/learn-trading/spread"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
              >
                دليل السبريد
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                شرح مبسط
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                مثال على التنفيذ
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-brand-500">✓</span>
                أوقات السيولة
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:rounded-[34px] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    مثال على سوق عالي السيولة
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    EUR / USD
                  </h2>
                </div>

                <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-black text-cyan-700">
                  سيولة مرتفعة
                </span>
              </div>

              <div className="grid grid-cols-2 items-stretch gap-3">
                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-emerald-700 sm:min-h-0 sm:text-xs">
                    أفضل سعر شراء
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.1000
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    BID PRICE
                  </p>
                </div>

                <div className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 p-3 text-center sm:min-h-0 sm:p-4">
                  <p className="flex min-h-[36px] items-center justify-center text-[11px] font-black leading-4 text-brand-600 sm:min-h-0 sm:text-xs">
                    أفضل سعر بيع
                  </p>

                  <p className="mt-2 text-[22px] font-black leading-none text-slate-950 sm:text-3xl">
                    1.1001
                  </p>

                  <p className="mt-2 text-[10px] font-bold text-slate-400 sm:mt-1 sm:text-[11px]">
                    ASK PRICE
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-cyan-100 bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-black text-cyan-700">
                    فرق السعر
                  </p>

                  <p className="text-lg font-black text-slate-950">
                    1 نقطة
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  أوامر كثيرة بالقرب من السعر الحالي
                </p>

                <p className="mt-1 text-2xl font-black">
                  تنفيذ أسرع وسبريد أقل
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
                eyebrow="معنى السيولة"
                title="كيف تقيس السيولة سهولة شراء الأصل أو بيعه؟"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  السيولة في التداول هي قدرة السوق على استيعاب أوامر الشراء
                  والبيع بسرعة ودون حدوث تغير كبير في السعر. يكون السوق أكثر
                  سيولة عندما يوجد عدد كبير من المشاركين والأوامر المتاحة عند
                  مستويات قريبة من السعر الحالي.
                </p>

                <p>
                  لا تعني السيولة أن السعر لن يتحرك، بل تعني أن المتداول يستطيع
                  عادة الدخول أو الخروج بسهولة أكبر. أما في السوق منخفض
                  السيولة، فقد يحتاج الأمر إلى الانتقال بين عدة أسعار حتى يتم
                  تنفيذه بالكامل، خصوصًا عند استخدام حجم صفقة كبير.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: السوق السائل يحتوي على مشترين وبائعين كافيين
                  لتنفيذ الصفقات بسرعة، بينما يزداد خطر اتساع السبريد
                  والانزلاق عندما تقل الأوامر المتاحة.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Depth"
                  title="عمق السوق"
                  description="حجم أوامر الشراء والبيع المتاحة عند مستويات سعرية مختلفة."
                />

                <MiniDefinition
                  label="Spread"
                  title="فرق السعر"
                  description="المسافة بين أفضل سعر شراء وأفضل سعر بيع متاح."
                />

                <MiniDefinition
                  label="Execution"
                  title="جودة التنفيذ"
                  description="مدى سرعة تنفيذ الأمر وقرب السعر النهائي من السعر المطلوب."
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
                eyebrow="آلية السوق"
                title="كيف تؤثر أوامر الشراء والبيع في مستوى السيولة؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                تتكون السيولة من أوامر وعروض أسعار يقدمها المتداولون والبنوك
                والمؤسسات ومزودو السيولة. عندما تتوفر كميات كبيرة عند أسعار
                متقاربة، يستطيع السوق تنفيذ الأوامر دون الحاجة إلى الانتقال
                بعيدًا عن السعر الحالي.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  السيولة الأعلى = أوامر أكثر + أسعار متقاربة + تنفيذ أسهل
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="أوامر الشراء"
                    value="مرتفعة"
                    sublabel="BUY ORDERS"
                  />

                  <CalculationBox
                    label="أوامر البيع"
                    value="مرتفعة"
                    sublabel="SELL ORDERS"
                  />

                  <CalculationBox
                    label="جودة التنفيذ"
                    value="أفضل نسبيًا"
                    sublabel="EXECUTION"
                    highlighted
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 sm:mt-6 sm:p-5">
                <h3 className="text-[15px] font-black text-slate-950 sm:text-base">
                  كيف ينتقل الأمر داخل السوق؟
                </h3>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  <Step
                    number="1"
                    text="يرسل المتداول أمر شراء أو بيع بالحجم المطلوب."
                  />

                  <Step
                    number="2"
                    text="يبحث نظام التنفيذ عن أفضل الأسعار والكميات المتاحة."
                  />

                  <Step
                    number="3"
                    text="إذا لم تكفِ الكمية عند السعر الأول، يتم تنفيذ باقي الأمر عند مستويات أخرى."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-amber-200 bg-amber-50 p-4 sm:mt-6 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950 sm:text-base">
                    الأخبار القوية قد تجمع بين نشاط مرتفع وسيولة ضعيفة
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  قد يرتفع عدد الصفقات وقت الخبر، لكن مزودي الأسعار قد
                  يوسعون الفروقات أو يسحبون بعض الأوامر القريبة مؤقتًا.
                  لذلك قد يظهر سبريد واسع وانزلاق قوي رغم النشاط المرتفع.
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
                title="كيف تختلف نتيجة تنفيذ الأمر بين السيولة المرتفعة والمنخفضة؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لنفترض أن متداولًا يريد شراء 1.00 لوت من EUR/USD بسعر قريب
                من 1.1000. تعتمد النتيجة النهائية على كمية أوامر البيع
                المتوفرة عند هذا السعر والأسعار التالية.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  label="حجم الأمر"
                  value="1.00 لوت"
                />

                <StatCard
                  label="السعر المطلوب"
                  value="1.1000"
                />

                <StatCard
                  label="السيولة المرتفعة"
                  value="تنفيذ قريب"
                />

                <StatCard
                  label="السيولة المنخفضة"
                  value="عدة أسعار"
                  accent
                />
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  مقارنة تنفيذ الأمر
                </h3>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      سعر الطلب
                    </p>

                    <p className="mt-2 text-xl font-black text-slate-950">
                      1.1000
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      REQUESTED PRICE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500">
                      سوق عالي السيولة
                    </p>

                    <p className="mt-2 text-xl font-black text-emerald-600">
                      1.1001
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      SMALL SLIPPAGE
                    </p>
                  </div>

                  <div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-sm">
                    <p className="text-[11px] font-bold text-brand-500">
                      سوق منخفض السيولة
                    </p>

                    <p className="mt-2 text-xl font-black text-rose-600">
                      1.1005
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      LARGER SLIPPAGE
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
                    حجم الأمر يؤثر في السعر النهائي
                  </h3>
                </div>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                  قد يتوفر سعر جيد لكمية صغيرة فقط. إذا كان حجم الصفقة أكبر
                  من الكمية المعروضة، يُنفذ الجزء المتبقي عند أسعار أخرى،
                  فيختلف متوسط سعر التنفيذ عن السعر الأول الظاهر على المنصة.
                </p>
              </div>
            </section>
                        {/* Liquidity levels */}
            <section
              id="levels"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="04"
                eyebrow="حالة السوق"
                title="ما الفرق بين السيولة المرتفعة والمتوسطة والمنخفضة؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                لا تبقى سيولة السوق عند مستوى واحد طوال اليوم. قد تكون
                مرتفعة أثناء نشاط الجلسات الرئيسية، ثم تنخفض خلال الفترات
                الهادئة أو العطلات أو قبل الأحداث المهمة. ويظهر هذا التغير
                بوضوح في السبريد وسرعة التنفيذ ومقدار الانزلاق السعري.
              </p>

              {/* Mobile */}
              <div className="mt-5 space-y-2.5 sm:hidden">
                {liquidityLevels.map((level, index) => (
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
                            {level.badge}
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
                {liquidityLevels.map((level) => (
                  <div
                    key={level.title}
                    className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <span className="inline-flex h-10 items-center justify-center rounded-full border border-brand-100 bg-white px-2 text-center text-[9px] font-black leading-4 text-brand-600">
                        {level.badge}
                      </span>

                      <span className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-center text-[9px] font-black leading-4 text-white shadow-sm">
                        {level.subtitle}
                      </span>
                    </div>

                    <div className="min-h-[66px] pt-4">
                      <h3 className="text-[18px] font-black leading-[1.3] text-slate-950 lg:text-[19px]">
                        {level.title}
                      </h3>
                    </div>

                    <div className="pb-5 pt-2">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {level.description}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4">
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

              {/* Comparison table */}
              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="hidden bg-slate-950 text-white sm:grid sm:grid-cols-4">
                  <div className="px-4 py-4 text-sm font-black">
                    المقارنة
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    سيولة مرتفعة
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    سيولة متوسطة
                  </div>

                  <div className="px-4 py-4 text-center text-sm font-black">
                    سيولة منخفضة
                  </div>
                </div>

                <div className="hidden divide-y divide-slate-200 bg-white sm:block">
                  <LiquidityComparisonRow
                    title="السبريد"
                    high="أضيق غالبًا"
                    medium="طبيعي"
                    low="أوسع"
                  />

                  <LiquidityComparisonRow
                    title="سرعة التنفيذ"
                    high="أسرع نسبيًا"
                    medium="مستقرة غالبًا"
                    low="قد تتباطأ"
                  />

                  <LiquidityComparisonRow
                    title="الانزلاق السعري"
                    high="أقل نسبيًا"
                    medium="ممكن"
                    low="أكثر احتمالًا"
                  />

                  <LiquidityComparisonRow
                    title="تنفيذ الأحجام الكبيرة"
                    high="أسهل"
                    medium="يعتمد على الأداة"
                    low="أصعب"
                  />
                </div>
              </div>
            </section>

            {/* Market impact */}
            <section
              id="impact"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="05"
                eyebrow="جودة التداول"
                title="كيف تؤثر السيولة على السبريد والانزلاق وتنفيذ الصفقات؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                تؤثر السيولة مباشرة في تكلفة التداول وجودة التنفيذ. عندما
                تكون الأسعار والكميات متوفرة بالقرب من سعر السوق، يمكن تنفيذ
                الأوامر بكفاءة أكبر. وعندما تقل السيولة، يزداد احتمال انتقال
                الأمر إلى مستويات أبعد وظهور فرق أكبر بين السعر المطلوب
                والسعر النهائي.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      ✓
                    </span>

                    <h3 className="text-lg font-black text-slate-950">
                      عندما تكون السيولة مرتفعة
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "تتقارب أسعار الشراء والبيع في كثير من الحالات.",
                      "تتوفر كميات أكبر بالقرب من السعر الحالي.",
                      "تقل احتمالية تحرك السعر بقوة بسبب أمر واحد.",
                      "تتحسن فرصة تنفيذ الأمر قريبًا من السعر المطلوب.",
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
                      عندما تكون السيولة منخفضة
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      "قد يتسع السبريد بصورة مفاجئة.",
                      "تزداد احتمالية التنفيذ على أكثر من سعر.",
                      "يمكن أن تؤثر الأوامر الكبيرة في حركة السوق.",
                      "ترتفع مخاطر الانزلاق والفجوات السعرية.",
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
                {liquidityFactors.map((factor) => (
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
                {liquidityFactors.map((factor) => (
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
                  كيف يغيّر عمق السوق نتيجة التنفيذ؟
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="الكمية عند السعر الأول"
                    value="0.30 لوت"
                    sublabel="FIRST LEVEL"
                  />

                  <CalculationBox
                    label="حجم الأمر المطلوب"
                    value="1.00 لوت"
                    sublabel="ORDER SIZE"
                  />

                  <CalculationBox
                    label="الكمية المتبقية"
                    value="0.70 لوت"
                    sublabel="NEXT LEVELS"
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
                    السعر الظاهر لا يضمن تنفيذ كامل الحجم عنده
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  قد يمثل السعر الظاهر أفضل عرض متاح لكمية محدودة فقط. إذا
                  تجاوز حجم الأمر هذه الكمية، يتم ملء الباقي من مستويات
                  أخرى، فينتج متوسط سعر تنفيذ مختلف.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  ما الذي يجب فحصه قبل تنفيذ الصفقة؟
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "راقب السبريد الحالي قبل الضغط على زر التنفيذ.",
                    "قارن حجم الصفقة بسيولة الأداة وعمق السوق.",
                    "انتبه إلى توقيت الجلسة والأخبار الاقتصادية.",
                    "ضع احتمال الانزلاق ضمن خطة إدارة المخاطر.",
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
                    href="/learn-trading/spread"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  >
                    اقرأ دليل السبريد
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
                eyebrow="قراءة ظروف السوق"
                title="ما الأخطاء الشائعة عند تقييم السيولة في التداول؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                لا يمكن تقييم السيولة من رقم واحد فقط. قد تبدو الأداة نشطة،
                لكن الكميات المتاحة بالقرب من السعر تكون محدودة. كما أن
                السيولة المناسبة لصفقة صغيرة قد لا تكون كافية لتنفيذ مركز
                كبير بالكفاءة نفسها.
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
                    لا تعتمد على السبريد وحده لتقييم السيولة
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  السبريد الضيق مؤشر مهم، لكنه لا يكشف دائمًا كمية الأوامر
                  المتاحة. قد يكون الفرق صغيرًا عند أفضل سعر، بينما يكون عمق
                  السوق ضعيفًا خلفه، فتظهر مشكلة التنفيذ عند الأحجام الأكبر.
                </p>
              </div>

              <div className="mt-6 rounded-[22px] border border-brand-100 bg-brand-50 p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-950">
                  ما الفرق بين السيولة والتقلب؟
                </h3>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  السيولة تقيس سهولة تنفيذ الصفقات دون تأثير كبير في السعر،
                  بينما يقيس التقلب سرعة واتساع حركة السعر. قد يكون السوق
                  عالي السيولة ومتقلبًا في الوقت نفسه، خصوصًا خلال الأحداث
                  المهمة.
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
                title="الأسئلة الشائعة عن السيولة في التداول والفوركس"
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
                  مفاهيم مرتبطة بسيولة السوق وجودة التنفيذ
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  فهم السبريد وحجم اللوت ووقف الخسارة يساعدك على تقييم أثر
                  السيولة في تكلفة الصفقة وسعر التنفيذ وإدارة المخاطر.
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
                دليل مرتبط
              </span>

              <h2 className="mt-3 text-xl font-black">
                افهم تكلفة السبريد
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                تعرف على طريقة حساب الفرق بين سعر الشراء والبيع، وكيف تتغير
                التكلفة مع السيولة وظروف السوق.
              </p>

              <Link
                href="/learn-trading/spread"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                فتح دليل السبريد
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
              راقب السيولة قبل تنفيذ صفقتك
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
              تحقق من السبريد وتوقيت الجلسة وحجم الصفقة قبل الدخول. السيولة
              الجيدة قد تحسن جودة التنفيذ، لكنها لا تضمن غياب الانزلاق خلال
              الأخبار أو التحركات السريعة.
            </p>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <Link
                href="/learn-trading/spread"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
              >
                دليل السبريد
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

function LiquidityComparisonRow({
  title,
  high,
  medium,
  low,
}: {
  title: string;
  high: string;
  medium: string;
  low: string;
}) {
  return (
    <div className="grid grid-cols-4">
      <div className="px-4 py-4 text-sm font-black text-slate-950">
        {title}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {high}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {medium}
      </div>

      <div className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {low}
      </div>
    </div>
  );
}