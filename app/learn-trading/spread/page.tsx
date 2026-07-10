import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

const PAGE_URL = "https://brokeralarab.com/learn-trading/spread";
const ENGLISH_PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/spread";

const PAGE_TITLE =
  "ما هو السبريد في التداول؟ شرح السبريد للمبتدئين";

const PAGE_DESCRIPTION =
  "تعرف على معنى السبريد في الفوركس، وكيفية حسابه، والفرق بين السبريد الثابت والمتغير، ومتى يرتفع السبريد مع أمثلة عملية واضحة للمبتدئين.";

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
    "ما هو السبريد",
    "السبريد في التداول",
    "السبريد في الفوركس",
    "شرح السبريد",
    "حساب السبريد",
    "السبريد الثابت والمتغير",
    "الفرق بين سعر البيع والشراء",
    "متى يرتفع السبريد",
    "ما هو السبريد الجيد",
    "تكلفة التداول",
  ],
};

const tableOfContents = [
  { id: "definition", label: "ما هو السبريد؟" },
  { id: "calculation", label: "طريقة الحساب" },
  { id: "example", label: "مثال عملي" },
  { id: "types", label: "أنواع السبريد" },
  { id: "increase", label: "متى يرتفع؟" },
  { id: "good-spread", label: "ما السبريد الجيد؟" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const spreadTypes = [
  {
    title: "السبريد المتغير",
    subtitle: "Floating Spread",
    description:
      "يتغير باستمرار حسب السيولة وحركة السوق. قد يكون منخفضًا جدًا في الأوقات العادية، لكنه قد يرتفع أثناء الأخبار أو التقلبات القوية.",
    points: [
      "ينخفض غالبًا في الأسواق ذات السيولة المرتفعة.",
      "قد يتسع خلال الأخبار الاقتصادية.",
      "شائع في حسابات التداول الاحترافية.",
    ],
    badge: "الأكثر شيوعًا",
  },
  {
    title: "السبريد الثابت",
    subtitle: "Fixed Spread",
    description:
      "يبقى عند مستوى محدد في معظم ظروف السوق، مما يساعد المتداول على معرفة تكلفة الصفقة بشكل أوضح قبل فتحها.",
    points: [
      "تكلفة أكثر سهولة في التوقع.",
      "قد يكون أعلى من المتغير في الظروف الطبيعية.",
      "قد يخضع لشروط خاصة أثناء التقلبات.",
    ],
    badge: "أسهل للتوقع",
  },
];

const spreadIncreaseReasons = [
  {
    icon: "📰",
    title: "الأخبار الاقتصادية",
    description:
      "قد يتسع السبريد قبل وبعد بيانات الفائدة والتضخم والوظائف بسبب سرعة تغير الأسعار.",
  },
  {
    icon: "🌙",
    title: "انخفاض السيولة",
    description:
      "ترتفع التكلفة عادة عندما يقل عدد المشترين والبائعين، خصوصًا بين جلسات التداول.",
  },
  {
    icon: "📈",
    title: "التقلب القوي",
    description:
      "الحركة السريعة تجعل تنفيذ الأوامر أكثر صعوبة، ولذلك قد يزيد الفرق بين سعري البيع والشراء.",
  },
  {
    icon: "🕒",
    title: "افتتاح وإغلاق السوق",
    description:
      "قد يكون السبريد أوسع في بداية الأسبوع، ونهاية جلسة نيويورك، وقبل إغلاق السوق.",
  },
];

const faqItems = [
  {
    question: "هل السبريد هو نفسه عمولة التداول؟",
    answer:
      "ليس دائمًا. السبريد هو الفرق بين سعر البيع وسعر الشراء، بينما العمولة قد تكون رسومًا منفصلة يفرضها الوسيط على كل صفقة. بعض الحسابات تعتمد على السبريد فقط، وبعضها يقدم سبريدًا منخفضًا مع عمولة منفصلة.",
  },
  {
    question: "هل السبريد يُخصم مباشرة عند فتح الصفقة؟",
    answer:
      "يظهر أثر السبريد فور فتح الصفقة، ولذلك تبدأ الصفقة عادة بخسارة صغيرة تعادل تكلفة الفرق بين سعر البيع وسعر الشراء.",
  },
  {
    question: "لماذا يرتفع السبريد وقت الأخبار؟",
    answer:
      "لأن الأسعار تتحرك بسرعة وقد تنخفض السيولة، فيتسع الفرق بين أفضل سعر متاح للبيع وأفضل سعر متاح للشراء.",
  },
  {
    question: "هل السبريد المنخفض يعني أن الوسيط أفضل؟",
    answer:
      "السبريد مهم، لكنه ليس العامل الوحيد. يجب أيضًا تقييم الترخيص، وسرعة التنفيذ، والعمولات، وسياسة السحب، وجودة منصة التداول.",
  },
  {
    question: "ما الفرق بين السبريد والنقطة؟",
    answer:
      "النقطة هي وحدة قياس حركة السعر، أما السبريد فهو الفرق بين سعري البيع والشراء ويمكن التعبير عنه بعدد من النقاط.",
  },
  {
    question: "هل السبريد مهم للمتداول طويل الأجل؟",
    answer:
      "نعم، لكنه يكون أكثر تأثيرًا على المتداول الذي يفتح عددًا كبيرًا من الصفقات القصيرة، مثل المضارب اليومي أو متداول السكالبينج.",
  },
];

const relatedGuides = [
  {
    title: "ما هو اللوت في التداول؟",
    description: "تعرف على أحجام العقود وتأثير حجم الصفقة على الربح والخسارة.",
    href: "/learn-trading/lot",
  },
  {
    title: "ما هي الرافعة المالية؟",
    description: "افهم طريقة عمل الرافعة المالية ومخاطر استخدامها في التداول.",
    href: "/learn-trading/leverage",
  },
  {
    title: "ما هو الهامش؟",
    description: "شرح الهامش المستخدم والهامش المتاح ومستوى الهامش.",
    href: "/learn-trading/margin",
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
      name: "السبريد في التداول",
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
      name: "السبريد في التداول",
    },
    {
      "@type": "Thing",
      name: "سعر البيع وسعر الشراء",
    },
    {
      "@type": "Thing",
      name: "تكاليف تداول الفوركس",
    },
    {
      "@type": "Thing",
      name: "السبريد الثابت",
    },
    {
      "@type": "Thing",
      name: "السبريد المتغير",
    },
  ],

  keywords: [
    "السبريد في الفوركس",
    "حساب السبريد",
    "السبريد الثابت",
    "السبريد المتغير",
    "تكلفة التداول",
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

export default function SpreadPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f6f8fc] text-slate-950">
     <Script
  id="spread-ar-breadcrumb-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>

<Script
  id="spread-ar-webpage-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(webPageSchema),
  }}
/>

<Script
  id="spread-ar-article-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema),
  }}
/>

<Script
  id="spread-ar-faq-schema"
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

          <span className="text-slate-800">السبريد</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute bottom-[-140px] left-[-80px] h-[320px] w-[320px] rounded-full bg-sky-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-7 px-4 pb-9 pt-7 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-xs">
                دليل المبتدئين
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs">
                مدة القراءة: 7 دقائق
              </span>
            </div>

            <h1 className="max-w-3xl break-words text-[30px] font-black leading-[1.4] tracking-tight text-slate-950 sm:text-4xl lg:text-[48px] lg:leading-[1.25]">
              ما هو السبريد في التداول؟
              <span className="mt-1 hidden text-brand-500 sm:block">
  شرح مبسط مع أمثلة عملية
</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-8 text-slate-600 sm:mx-0 sm:text-[17px]">
              السبريد هو إحدى أهم تكاليف التداول التي يجب أن يفهمها كل
              متداول. في هذا الدليل ستتعرف على معناه، وطريقة حسابه، والفرق
              بين السبريد الثابت والمتغير، ومتى يمكن أن يرتفع.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
          <a
  href="#definition"
  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-500 px-3 py-3 text-center text-[13px] font-black text-white shadow-[0_12px_28px_rgba(30,91,184,0.22)] transition hover:bg-brand-600 sm:px-5 sm:text-sm"
>
  ابدأ الشرح
</a>

             <Link
  href="/tools/pip-calculator"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 sm:px-5 sm:text-sm"
>
  حاسبة النقاط
</Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 sm:mt-6 sm:justify-start sm:gap-x-5 sm:text-sm">
  <span className="inline-flex items-center gap-1 whitespace-nowrap">
    <span className="text-brand-500">✓</span>
    شرح بدون تعقيد
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
                  السوق مفتوح
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4 text-center">
                  <p className="text-xs font-black text-rose-600">سعر البيع</p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    1.08500
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-slate-500">
                    BID
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-center">
                  <p className="text-xs font-black text-emerald-700">
                    سعر الشراء
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    1.08515
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-slate-500">
                    ASK
                  </p>
                </div>
              </div>

              <div className="relative my-5 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="mx-3 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-center">
                  <p className="text-[10px] font-black text-brand-500">
                    الفرق بين السعرين
                  </p>
                  <p className="text-lg font-black text-slate-950">
                    1.5 نقطة
                  </p>
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                <p className="text-xs font-bold text-slate-300">
                  هذا الفرق هو
                </p>
                <p className="mt-1 text-2xl font-black">السبريد</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-friendly navigation tabs */}
     <div className="sticky top-0 z-30 hidden border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur sm:block">
  <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
    <nav
      aria-label="محتويات الصفحة"
      className="grid auto-cols-max grid-flow-col grid-rows-2 gap-2 overflow-x-auto py-3 pb-3.5 [scrollbar-width:none] sm:flex sm:grid-flow-row sm:grid-rows-none sm:flex-nowrap sm:py-3 [&::-webkit-scrollbar]:hidden"
    >
      {tableOfContents.map((item) => (
       <a
  key={item.id}
  href={`#${item.id}`}
  className="flex min-h-9 shrink-0 snap-start items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 sm:min-h-0 sm:px-4 sm:py-2 sm:text-sm"
>
  {item.label}
</a>
      ))}
    </nav>
  </div>
</div>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
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
                title="ما هو السبريد في التداول؟"
              />

              <div className="mt-4 space-y-3 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                <p>
                  السبريد هو الفرق بين <strong>سعر الشراء</strong> وسعر{" "}
                  <strong>البيع</strong> لأداة مالية، مثل أزواج العملات أو
                  الذهب أو المؤشرات.
                </p>

                <p>
                  عندما تفتح منصة التداول ستلاحظ وجود سعرين لكل أداة. السعر
                  الأعلى هو السعر الذي تستطيع الشراء عنده، والسعر الأقل هو
                  السعر الذي تستطيع البيع عنده. الفرق بينهما يمثل تكلفة
                  السبريد.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border-r-4 border-brand-500 bg-brand-50 p-3.5 sm:mt-6 sm:p-5">
                <p className="text-[13px] font-black leading-7 text-slate-900 sm:text-base">
                  ببساطة: إذا كان بإمكانك شراء اليورو عند 1.08515 وبيعه عند
                  1.08500، فإن الفرق البالغ 0.00015 هو السبريد.
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                <MiniDefinition
                  label="Bid"
                  title="سعر البيع"
                  description="السعر الذي يمكنك بيع الأداة عنده."
                />

                <MiniDefinition
                  label="Ask"
                  title="سعر الشراء"
                  description="السعر الذي يمكنك شراء الأداة عنده."
                />

                <MiniDefinition
                  label="Spread"
                  title="الفرق"
                  description="المسافة بين سعر البيع وسعر الشراء."
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
                eyebrow="الحساب"
                title="كيف يتم حساب السبريد؟"
              />

              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
                يتم حساب السبريد بطرح سعر البيع من سعر الشراء، ثم تحويل الفرق
                إلى نقاط حسب عدد الخانات العشرية للأداة.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="bg-slate-950 px-4 py-3 text-center text-sm font-black text-white sm:text-base">
                  السبريد = سعر الشراء − سعر البيع
                </div>

                <div className="grid gap-0 bg-white sm:grid-cols-3">
                  <CalculationBox
                    label="سعر الشراء"
                    value="1.08515"
                    sublabel="ASK"
                  />

                  <CalculationBox
                    label="سعر البيع"
                    value="1.08500"
                    sublabel="BID"
                  />

                  <CalculationBox
                    label="النتيجة"
                    value="1.5"
                    sublabel="نقطة"
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
      text="اطرح سعر البيع 1.08500 من سعر الشراء 1.08515."
    />

    <Step
      number="2"
      text="الناتج هو 0.00015."
    />

    <Step
      number="3"
      text="في زوج EUR/USD يعادل هذا الفرق 1.5 نقطة."
    />
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
                title="كيف يؤثر السبريد على صفقتك؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لنفترض أنك فتحت صفقة شراء على زوج EUR/USD بحجم لوت قياسي،
                وكانت قيمة النقطة تساوي 10 دولارات.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="حجم الصفقة" value="1 لوت" />
                <StatCard label="قيمة النقطة" value="$10" />
                <StatCard label="السبريد" value="1.5 نقطة" />
                <StatCard label="تكلفة السبريد" value="$15" accent />
              </div>

              <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                 <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    💡
                  </span>

                  <div>
                    <h3 className="font-black text-slate-950">
                      ماذا يحدث عند فتح الصفقة؟
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
                      ستبدأ الصفقة بخسارة تقريبية قدرها 15 دولارًا بسبب
                      السبريد. يحتاج السعر إلى التحرك لصالحك بمقدار 1.5 نقطة
                      تقريبًا حتى تصل الصفقة إلى نقطة التعادل، دون احتساب أي
                      عمولات أخرى.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-4 sm:p-6">
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-500">
                      بداية الصفقة
                    </p>
                    <p className="mt-2 text-xl font-black text-rose-600">
                      -15$
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-black text-slate-500">
                    ←
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-500">
                      بعد ارتفاع 1.5 نقطة
                    </p>
                    <p className="mt-2 text-xl font-black text-emerald-600">
                      0$
                    </p>
                  </div>
                </div>
              </div>
            </section>

           {/* Types */}
<section
  id="types"
  className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
>
  <SectionHeading
    number="04"
    eyebrow="الأنواع"
    title="ما أنواع السبريد؟"
  />

  <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
    تقدم شركات الوساطة عادة سبريدًا متغيرًا أو ثابتًا. لكل نوع خصائص مختلفة،
    ولا يوجد نوع أفضل لجميع المتداولين في كل الظروف.
  </p>

  {/* Mobile only */}
  <div className="mt-5 space-y-3 sm:hidden">
    {spreadTypes.map((type, index) => (
      <details
        key={type.title}
        open={index === 0}
        className="group overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[18px] font-black leading-7 text-slate-950">
                {type.title}
              </h3>

              <span className="rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[9px] font-black text-brand-600">
                {type.badge}
              </span>
            </div>

            <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-brand-500">
              {type.subtitle}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
            +
          </span>
        </summary>

        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-4">
          <p className="text-sm font-medium leading-7 text-slate-600">
            {type.description}
          </p>

          <ul className="mt-4 space-y-2.5">
            {type.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5 text-[13px] font-bold leading-6 text-slate-700"
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

  {/* Desktop and tablet - unchanged */}
  <div className="mt-6 hidden gap-4 sm:grid lg:grid-cols-2">
    {spreadTypes.map((type) => (
      <div
        key={type.title}
        className="flex h-full flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-950">
              {type.title}
            </h3>

            <p className="mt-1 text-xs font-black uppercase tracking-wide text-brand-500">
              {type.subtitle}
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
            {type.badge}
          </span>
        </div>

        <p className="mt-4 min-h-[84px] text-sm font-medium leading-7 text-slate-600">
          {type.description}
        </p>

        <ul className="mt-auto space-y-2.5 pt-4">
          {type.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-700"
            >
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[9px] text-brand-600">
                ✓
              </span>

              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>

  {/* Desktop and tablet table - unchanged */}
  <div className="mt-6 hidden overflow-x-auto rounded-[22px] border border-slate-200 sm:block">
    <table className="w-full min-w-[620px] text-right">
      <thead className="bg-slate-950 text-white">
        <tr>
          <th className="px-4 py-4 text-right text-sm font-black">
            المقارنة
          </th>

          <th className="px-4 py-4 text-center text-sm font-black">
            السبريد المتغير
          </th>

          <th className="px-4 py-4 text-center text-sm font-black">
            السبريد الثابت
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-200 bg-white">
        <TableRow
          title="يتغير مع السوق"
          floating="نعم"
          fixed="عادة لا"
        />

        <TableRow
          title="منخفض في الظروف العادية"
          floating="غالبًا"
          fixed="ليس دائمًا"
        />

        <TableRow
          title="قد يرتفع وقت الأخبار"
          floating="نعم"
          fixed="حسب شروط الوسيط"
        />

        <TableRow
          title="سهولة توقع التكلفة"
          floating="متوسطة"
          fixed="مرتفعة"
        />
      </tbody>
    </table>
  </div>
</section>

          {/* Spread increase */}
<section
  id="increase"
  className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
>
  <SectionHeading
    number="05"
    eyebrow="ظروف السوق"
    title="متى يرتفع السبريد؟"
  />

  <p className="mt-4 text-[14px] font-medium leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
    لا يبقى السبريد دائمًا عند المستوى نفسه، خصوصًا في الحسابات ذات السبريد
    المتغير. يمكن أن يرتفع عندما تصبح حركة السوق أسرع أو تقل السيولة.
  </p>

  {/* Mobile only */}
  <div className="mt-5 space-y-2.5 sm:hidden">
    {spreadIncreaseReasons.map((reason) => (
      <details
        key={reason.title}
        className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white open:shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm">
              {reason.icon}
            </span>

            <h3 className="text-[15px] font-black leading-6 text-slate-950">
              {reason.title}
            </h3>
          </div>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
            +
          </span>
        </summary>

        <div className="border-t border-slate-200 bg-white px-4 py-3.5">
          <p className="text-[13px] font-medium leading-7 text-slate-600">
            {reason.description}
          </p>
        </div>
      </details>
    ))}

    {/* Mobile visual comparison */}
    <details className="group overflow-hidden rounded-[18px] border border-amber-200 bg-amber-50">
  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
        💡
      </span>

      <div>
        <p className="text-[10px] font-black text-amber-700">
          مثال توضيحي
        </p>

        <h3 className="mt-0.5 text-[15px] font-black text-slate-950">
          كيف يتسع السبريد؟
        </h3>
      </div>
    </div>

    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-lg font-normal text-amber-700 shadow-sm transition duration-300 group-open:rotate-45">
      +
    </span>
  </summary>

  <div className="space-y-2.5 border-t border-amber-200 bg-white p-3">
    <MobileSpreadExample
      title="السوق الطبيعي"
      description="سيولة جيدة وحركة مستقرة"
      spread="0.8 نقطة"
    />

    <MobileSpreadExample
      title="أثناء الأخبار"
      description="تقلب قوي وسيولة أقل"
      spread="4.5 نقطة"
      warning
    />
  </div>
</details>
  </div>

  {/* Desktop and tablet reasons - unchanged */}
  <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
    {spreadIncreaseReasons.map((reason) => (
      <div
        key={reason.title}
        className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 sm:p-5"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl">
            {reason.icon}
          </span>

          <div>
            <h3 className="font-black text-slate-950">
              {reason.title}
            </h3>

            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
              {reason.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Desktop and tablet visual comparison - unchanged */}
  <div className="mt-6 hidden gap-4 sm:grid lg:grid-cols-2">
    <SpreadVisual
      title="السوق في الظروف الطبيعية"
      spread="0.8 نقطة"
      description="سيولة جيدة وحركة مستقرة"
      bars={2}
    />

    <SpreadVisual
      title="السوق أثناء الأخبار"
      spread="4.5 نقطة"
      description="تقلب قوي وسيولة أقل"
      bars={6}
      warning
    />
  </div>
</section>

            {/* Good spread */}
            <section
              id="good-spread"
              className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8"
            >
              <SectionHeading
                number="06"
                eyebrow="اختيار الحساب"
                title="ما هو السبريد الجيد؟"
              />

              <p className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                لا يوجد رقم واحد يعتبر جيدًا لجميع الأدوات. السبريد الطبيعي
                يختلف حسب زوج العملات، ونوع الحساب، ووقت التداول، والسيولة،
                وسياسة شركة الوساطة.
              </p>

              {/* Mobile only */}
<div className="mt-5 space-y-2.5 sm:hidden">
  <MobileGoodSpreadCard
    title="الأزواج الرئيسية"
    value="منخفض عادة"
    description="مثل EUR/USD وUSD/JPY بسبب ارتفاع السيولة."
  />

  <MobileGoodSpreadCard
    title="الأزواج النادرة"
    value="أوسع عادة"
    description="تكون السيولة أقل، ولذلك قد تكون تكلفة التداول أعلى."
  />

  <MobileGoodSpreadCard
    title="الذهب والمؤشرات"
    value="يختلف حسب الأداة"
    description="لا تقارن السبريد فيها بالطريقة نفسها المستخدمة لأزواج العملات."
  />
</div>

{/* Desktop and tablet unchanged */}
<div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-3">
  <GoodSpreadCard
    title="الأزواج الرئيسية"
    value="منخفض عادة"
    description="مثل EUR/USD وUSD/JPY بسبب ارتفاع السيولة."
  />

  <GoodSpreadCard
    title="الأزواج النادرة"
    value="أوسع عادة"
    description="تكون السيولة أقل، ولذلك قد تكون تكلفة التداول أعلى."
  />

  <GoodSpreadCard
    title="الذهب والمؤشرات"
    value="يختلف حسب الأداة"
    description="لا تقارن السبريد فيها بالطريقة نفسها المستخدمة لأزواج العملات."
  />
</div>

              <div className="mt-6 rounded-[22px] bg-slate-950 p-5 text-white sm:p-6">
                <h3 className="text-lg font-black">
                  قبل اختيار وسيط بسبريد منخفض
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "تحقق من متوسط السبريد وليس الرقم الإعلاني فقط.",
                    "راجع العمولة المنفصلة على حسابات السبريد الخام.",
                    "قارن تكلفة الصفقة في أوقات السوق المختلفة.",
                    "افحص الترخيص وجودة التنفيذ وسياسة السحب.",
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
  href="/lowest-spread-brokers"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
>
  أفضل وسطاء السبريد المنخفض
</Link>

                 <Link
  href="/brokers"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/15"
>
  تصفح تقييمات الوسطاء
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
                title="الأسئلة الشائعة عن السبريد"
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

          {/* Related */}
<section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-8">
  <div className="text-center">
    <span className="inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600 sm:text-[11px]">
      واصل التعلم
    </span>

    <h2 className="mt-3 text-[24px] font-black leading-[1.35] text-slate-950 sm:text-3xl">
      مفاهيم مرتبطة بالسبريد
    </h2>

    <p className="mx-auto mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
      فهم هذه المفاهيم سيساعدك على حساب تكلفة الصفقة وإدارة المخاطر بصورة
      أفضل.
    </p>
  </div>

  {/* Mobile only */}
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

  {/* Tablet and desktop unchanged */}
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
              <p className="text-xs font-black text-brand-500">في هذا الدليل</p>

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

              <h2 className="mt-3 text-xl font-black">احسب قيمة النقطة</h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-200">
                استخدم حاسبة النقاط لمعرفة قيمة حركة السعر حسب حجم صفقتك.
              </p>
<Link
  href="/tools/pip-calculator"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
>
  فتح الحاسبة
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
        قارن شركات التداول قبل فتح حساب حقيقي
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-6 text-slate-300 sm:text-base sm:leading-7">
        راجع التراخيص، والسبريد، وأنواع الحسابات، وطرق السحب والإيداع قبل
        اختيار شركة الوساطة.
      </p>

      <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
        <Link
          href="/brokers"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-white px-3 py-2.5 text-[13px] font-black text-slate-950 transition hover:bg-slate-100 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
        >
          تقييمات الوسطاء
        </Link>

        <Link
          href="/compare"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-black text-white transition hover:bg-white/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
        >
          مقارنة الوسطاء
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
      <p className="text-xs font-bold text-slate-500">{label}</p>
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

function Step({ number, text }: { number: string; text: string }) {
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

function TableRow({
  title,
  floating,
  fixed,
}: {
  title: string;
  floating: string;
  fixed: string;
}) {
  return (
    <tr>
      <td className="px-4 py-4 text-right text-sm font-black text-slate-900">
        {title}
      </td>

      <td className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {floating}
      </td>

      <td className="px-4 py-4 text-center text-sm font-bold text-slate-600">
        {fixed}
      </td>
    </tr>
  );
}

function MobileSpreadExample({
  title,
  description,
  spread,
  warning = false,
}: {
  title: string;
  description: string;
  spread: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-3 ${
        warning
          ? "border-amber-200 bg-amber-50"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <div className="min-w-0">
        <h4 className="text-[14px] font-black text-slate-950">
          {title}
        </h4>

        <p className="mt-1 text-[11px] font-medium leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black ${
          warning
            ? "bg-amber-100 text-amber-800"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        {spread}
      </span>
    </div>
  );
}

function SpreadVisual({
  title,
  spread,
  description,
  bars,
  warning = false,
}: {
  title: string;
  spread: string;
  description: string;
  bars: number;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-[22px] border p-5 ${
        warning
          ? "border-amber-200 bg-amber-50"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-black text-slate-950">{title}</h3>
          <p className="mt-1 text-xs font-bold text-slate-500">{description}</p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black ${
            warning
              ? "bg-amber-100 text-amber-800"
              : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {spread}
        </span>
      </div>

      <div className="mt-6 flex h-24 items-end justify-center gap-2">
        <div className="w-12 rounded-t-xl bg-slate-900 py-2 text-center text-[10px] font-black text-white">
          BID
        </div>

        <div className="flex h-full items-center gap-1">
          {Array.from({ length: bars }).map((_, index) => (
            <span
              key={index}
              className={`block h-12 w-1.5 rounded-full ${
                warning ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
          ))}
        </div>

        <div className="w-12 rounded-t-xl bg-brand-500 py-2 text-center text-[10px] font-black text-white">
          ASK
        </div>
      </div>
    </div>
  );
}

function MobileGoodSpreadCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition open:border-brand-200 open:bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
        <div className="min-w-0">
          <h3 className="text-[15px] font-black leading-6 text-slate-950">
            {title}
          </h3>

          <p className="mt-0.5 text-[13px] font-black text-brand-500">
            {value}
          </p>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-normal text-brand-500 shadow-sm transition duration-300 group-open:rotate-45 group-open:border-brand-200 group-open:bg-brand-50">
          +
        </span>
      </summary>

      <div className="border-t border-slate-200 bg-white px-4 py-3.5">
        <p className="text-[13px] font-medium leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </details>
  );
}

function GoodSpreadCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
      <h3 className="font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-lg font-black text-brand-500">{value}</p>
      <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}