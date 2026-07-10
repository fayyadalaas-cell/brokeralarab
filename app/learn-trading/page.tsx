import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const BASE_URL = "https://brokeralarab.com";

export const metadata: Metadata = {
  title: "تعلم التداول من الصفر | دليل شامل للمبتدئين",
  description:
    "دليل تعلم التداول من الصفر للمبتدئين: أساسيات الفوركس، إدارة المخاطر، المؤشرات الاقتصادية، أدوات الحساب، واختيار وسيط موثوق قبل فتح حساب تداول.",
  alternates: {
    canonical: `${BASE_URL}/learn-trading`,
  },
};

const mainLessons = [
  {
    title: "كيف تبدأ التداول من الصفر خطوة بخطوة",
    desc: "ابدأ من المفاهيم الأساسية: ما هو التداول، كيف تعمل الأسواق، ما معنى السبريد والرافعة والهامش، وما الخطوات الصحيحة قبل فتح حساب حقيقي.",
    href: "/learn-trading/how-to-start-trading-from-zero",
    badge: "ابدأ هنا",
    icon: "🚀",
  },
  {
    title: "المؤشرات الاقتصادية وتأثيرها على التداول",
    desc: "تعرف على الأخبار التي تحرك الذهب، العملات، الأسهم والمؤشرات مثل قرارات الفائدة، التضخم، الوظائف الأمريكية، والناتج المحلي.",
    href: "/learn-trading/economic-indicators",
    badge: "مهم جدًا",
    icon: "📊",
  },
];

const learningTracks = [
  {
    title: "المرحلة الأولى",
    name: "فهم أساسيات التداول",
    desc: "تعرف على الفوركس، العقود مقابل الفروقات، الذهب، السبريد، الهامش، الرافعة المالية، وأنواع أوامر التداول.",
  },
  {
    title: "المرحلة الثانية",
    name: "إدارة المخاطر",
    desc: "تعلم كيف تحدد حجم الصفقة، نسبة المخاطرة، وقف الخسارة، والحد الأقصى للخسارة قبل الدخول في أي صفقة.",
  },
  {
    title: "المرحلة الثالثة",
    name: "قراءة الأخبار والمؤشرات",
    desc: "افهم كيف تؤثر قرارات الفائدة والتضخم والوظائف على حركة العملات والذهب والأسواق العالمية.",
  },
  {
    title: "المرحلة الرابعة",
    name: "اختيار الوسيط المناسب",
    desc: "قارن بين التراخيص، الرسوم، الحسابات، سرعة السحب، المنصات، والدعم قبل فتح حساب تداول حقيقي.",
  },
];

const beginnerMistakes = [
  "التداول بدون خطة واضحة",
  "استخدام رافعة مالية عالية",
  "الدخول بدون وقف خسارة",
  "المخاطرة بنسبة كبيرة من رأس المال",
  "اختيار وسيط غير مرخص",
  "ملاحقة التوصيات العشوائية",
];

const tradingTerms = [
  [
    "السبريد",
    "السبريد هو الفرق بين سعر الشراء وسعر البيع في منصة التداول. كلما كان السبريد أقل، كانت تكلفة الدخول والخروج من الصفقة أقل، خصوصًا للمتداولين النشطين والسكالبينج.",
    "/learn-trading/spread",
  ],
  [
    "الرافعة المالية",
    "الرافعة المالية تسمح لك بفتح صفقات أكبر من رأس مالك الفعلي، لكنها تزيد المخاطرة أيضًا. لذلك يجب استخدامها بحذر وفهم تأثيرها على الهامش والخسارة المحتملة.",
  ],
  [
    "الهامش",
    "الهامش هو المبلغ الذي يحجزه الوسيط من رصيدك لفتح الصفقة. إذا تحرك السوق ضدك بشكل كبير، قد يقترب الحساب من نداء الهامش أو إغلاق الصفقات تلقائيًا.",
  ],
  [
    "اللوت",
    "اللوت هو حجم الصفقة في سوق الفوركس أو الذهب أو العقود مقابل الفروقات. اختيار حجم لوت مناسب يساعدك على التحكم في المخاطرة وعدم تضخيم الخسارة.",
  ],
  [
    "وقف الخسارة",
    "وقف الخسارة هو أمر يحدد السعر الذي تُغلق عنده الصفقة تلقائيًا إذا تحرك السوق ضدك. استخدامه يساعدك على حماية رأس المال وتقليل القرارات العاطفية.",
  ],
  [
    "جني الأرباح",
    "جني الأرباح هو أمر يغلق الصفقة تلقائيًا عند الوصول إلى هدف سعري محدد. يساعدك على الالتزام بالخطة بدل الطمع أو الخروج العشوائي من الصفقة.",
  ],
];

const siteSections = [
  ["تقييمات الوسطاء", "راجع شركات التداول قبل فتح الحساب.", "/brokers"],
  ["مقارنة الوسطاء", "قارن بين شركتين جنبًا إلى جنب.", "/compare"],
  ["أفضل الوسطاء", "اكتشف قوائم الوسطاء حسب الفئة والدولة.", "/best-brokers"],
  ["دليل التراخيص", "افهم الجهات الرقابية ومستوى الحماية.", "/licenses"],
  ["أدوات التداول", "استخدم حاسبات المخاطرة والهامش واللوت.", "/tools"],
  ["تعلم التداول", "تابع الدروس التعليمية للمبتدئين.", "/learn-trading"],
];

const quickTools = [
  {
    title: "حاسبة المخاطرة",
    desc: "اعرف كم تخاطر في كل صفقة قبل الدخول.",
    href: "/tools/risk-calculator",
  },
  {
    title: "حاسبة حجم اللوت",
    desc: "حدد حجم الصفقة المناسب لرأس المال.",
    href: "/tools/lot-size-calculator",
  },
  {
    title: "حاسبة الهامش",
    desc: "احسب الهامش المطلوب حسب الرافعة.",
    href: "/tools/margin-calculator",
  },
  {
    title: "حاسبة الربح والخسارة",
    desc: "احسب نتيجة الصفقة قبل تنفيذها.",
    href: "/tools/profit-calculator",
  },
  {
    title: "حاسبة السحب",
    desc: "اعرف مقدار الهبوط المطلوب لتعويض الخسارة.",
    href: "/tools/drawdown-calculator",
  },
  {
    title: "حاسبة الفائدة المركبة",
    desc: "شاهد كيف ينمو رأس المال مع الوقت.",
    href: "/tools/compound-calculator",
  },
];

const faqs = [
  {
    q: "كيف أبدأ تعلم التداول من الصفر؟",
    a: "ابدأ بفهم أساسيات السوق، ثم تعلم إدارة المخاطر، وبعدها استخدم حسابًا تجريبيًا قبل التداول بأموال حقيقية.",
  },
  {
    q: "هل أحتاج رأس مال كبير للبدء؟",
    a: "لا، لكن الأهم أن تبدأ بمبلغ صغير لا يؤثر عليك إذا خسرته، وأن تركز على التعلم قبل الربح.",
  },
  {
    q: "كم أحتاج وقتًا لتعلم التداول؟",
    a: "يعتمد على التزامك، لكن فهم الأساسيات وإدارة المخاطر يحتاج عادة إلى وقت وتجربة وليس مجرد قراءة سريعة.",
  },
  {
    q: "هل الحساب التجريبي مفيد للمبتدئين؟",
    a: "نعم، لأنه يساعدك على فهم المنصة وتنفيذ الصفقات دون مخاطرة مالية، لكنه لا يعكس ضغط التداول الحقيقي بالكامل.",
  },
  {
    q: "ما أكبر خطأ يقع فيه المبتدئون؟",
    a: "أكبر خطأ هو استخدام رافعة عالية والدخول في صفقات عشوائية دون خطة أو وقف خسارة.",
  },
  {
    q: "كيف أختار وسيط تداول موثوق؟",
    a: "راجع الترخيص، الرسوم، سرعة السحب، المنصات، تقييمات المستخدمين، واسم الكيان القانوني قبل فتح الحساب.",
  },
];

function InternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </Link>
  );
}

export default function LearnTradingPage() {
 const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}/learn-trading#faq`,
  url: `${BASE_URL}/learn-trading`,
  inLanguage: "ar",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

 const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${BASE_URL}/learn-trading#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: `${BASE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "تعلم التداول",
      item: `${BASE_URL}/learn-trading`,
    },
  ],
};

 const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE_URL}/learn-trading#collection`,
  name: "دليل تعلم التداول",
  url: `${BASE_URL}/learn-trading`,
  inLanguage: "ar",
  description:
    "مركز تعليمي من بروكر العرب يساعد المبتدئين على تعلم أساسيات التداول، إدارة المخاطر، فهم المؤشرات الاقتصادية، استخدام أدوات الحساب، واختيار وسيط تداول موثوق.",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Broker Alarab",
    url: BASE_URL,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Broker Alarab",
    url: BASE_URL,
  },
  about: [
    "تعلم التداول",
    "أساسيات الفوركس",
    "إدارة المخاطر",
    "المؤشرات الاقتصادية",
    "أدوات التداول",
    "اختيار وسيط تداول",
  ],
  hasPart: mainLessons.map((lesson) => ({
    "@type": "Article",
    headline: lesson.title,
    url: `${BASE_URL}${lesson.href}`,
    description: lesson.desc,
    inLanguage: "ar",
  })),
};

  return (
    <>
      <Script
        id="learn-trading-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Script
        id="learn-trading-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Script
        id="learn-trading-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main
        dir="rtl"
        className="mx-auto w-full max-w-7xl px-3 pt-5 pb-0 text-right sm:px-4 md:pt-6"
      >
        <section className="mb-4 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-2 divide-x divide-slate-100 divide-x-reverse md:grid-cols-4">
            {[
              ["✓", "محتوى للمبتدئين"],
              ["📊", "شرح مبسط للأسواق"],
              ["🛡", "تركيز على المخاطر"],
              ["🔄", "روابط لأدوات عملية"],
            ].map(([icon, text]) => (
              <div
                key={text}
                className="flex items-center justify-center gap-2 px-3 py-3 text-center"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-black text-brand-600">
                  {icon}
                </span>
                <span className="text-[11px] font-black text-slate-800 md:text-sm">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm md:rounded-[34px]">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-brand-600 via-brand-500 to-brand-400" />

          <div className="grid gap-6 p-5 md:p-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
                دليل تعلم التداول
              </div>

              <>
 <h1 className="max-w-3xl text-[38px] font-black leading-tight text-slate-950 md:text-[54px]">
  دليل تعلم التداول
</h1>
</>

              <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-600 md:text-lg md:leading-9">
             ابدأ رحلتك في تعلم التداول من الصفر من خلال دروس مبسطة، وأدوات
مجانية، ومراجع تساعدك على فهم الأسواق، وإدارة المخاطر، واختيار
وسيط تداول موثوق قبل فتح حساب حقيقي.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <InternalLink
                  href="/learn-trading/how-to-start-trading-from-zero"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-l from-brand-500 to-brand-600 px-6 text-sm font-black text-white shadow-lg shadow-brand-100 transition hover:scale-[1.01] hover:shadow-xl md:text-base"
                >
                  ابدأ من الصفر الآن
                </InternalLink>

                <InternalLink
                  href="/tools"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-900 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 md:text-base"
                >
                  استخدم أدوات التداول
                </InternalLink>
              </div>
            </div>

            <aside className="rounded-[26px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
              <div className="mb-3 text-sm font-black text-slate-950">
               مسار تعلم التداول
              </div>

              <div className="space-y-3">
                {["افهم الأساسيات", "تعلم إدارة المخاطر", "تابع المؤشرات", "قارن الوسطاء"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-black text-brand-600">
                        {i + 1}
                      </span>
                      <span className="text-sm font-black text-slate-800">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          {mainLessons.map((lesson) => (
            <InternalLink
              key={lesson.href}
              href={lesson.href}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              <div className="h-1.5 bg-gradient-to-l from-brand-500 to-brand-400" />

              <div className="p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-black text-brand-600">
                    {lesson.badge}
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl transition group-hover:bg-brand-500 group-hover:text-white">
                    {lesson.icon}
                  </span>
                </div>

                <h2 className="text-[22px] font-black leading-8 text-slate-950 md:text-[26px]">
                  {lesson.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                  {lesson.desc}
                </p>

                <div className="mt-5 inline-flex rounded-xl bg-slate-50 px-4 py-2 text-sm font-black text-brand-600 transition group-hover:bg-brand-50">
                  قراءة الدليل ←
                </div>
              </div>
            </InternalLink>
          ))}
        </section>

        <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
                مسار التعلم
              </div>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                ماذا تتعلم أولًا؟
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-600">
              بدل القفز مباشرة إلى فتح حساب، اتبع هذه المراحل حتى تفهم السوق
              والمخاطر قبل التداول الحقيقي.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {learningTracks.map((item, i) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-white hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-brand-600">
                    {item.title}
                  </span>
                  <span className="text-lg font-black text-slate-300">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-950">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-5">
              <div className="mb-2 inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-700">
                أدوات عملية
              </div>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                قبل كل صفقة، احسبها أولًا
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                المتداول الجيد لا يدخل الصفقة عشوائيًا. استخدم هذه الأدوات
                لحساب المخاطرة، حجم اللوت، الهامش، والربح أو الخسارة المتوقعة.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {quickTools.map((tool) => (
                <InternalLink
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-md"
                >
                  <h3 className="text-lg font-black text-slate-950">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {tool.desc}
                  </p>
                  <span className="mt-3 inline-flex text-sm font-black text-brand-600">
                    فتح الأداة ←
                  </span>
                </InternalLink>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 shadow-sm md:p-6">
            <div className="mb-3 text-2xl">⚠️</div>
            <h2 className="text-xl font-black leading-8 text-slate-950">
              تنبيه مهم للمبتدئين
            </h2>
            <p className="mt-3 text-sm leading-8 text-slate-700">
              التداول باستخدام الرافعة المالية قد يؤدي إلى خسائر كبيرة. لا تبدأ
              بمبلغ لا تتحمل خسارته، ولا تعتمد على توصيات عشوائية أو وعود
              بالربح السريع.
            </p>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
  <h3 className="mb-3 text-sm font-black text-slate-950">
    قبل تنفيذ الصفقة تأكد من:
  </h3>

  <div className="space-y-2">
    {[
      "حددت نسبة المخاطرة",
      "وضعت وقف الخسارة",
      "حسبت حجم اللوت",
      "تعرف سبب دخول الصفقة",
      "لا تخاطر بمبلغ لا تتحمل خسارته",
    ].map((item) => (
      <div
        key={item}
        className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-700"
      >
        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-black text-emerald-600">
          ✓
        </span>
        <span>{item}</span>
      </div>
    ))}
  </div>
</div>

<InternalLink
  href="/tools/risk-calculator"
  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-amber-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-amber-100"
>
  افتح حاسبة المخاطرة
</InternalLink>
          </aside>
        </section>

        <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
  <div className="mb-5">
    <div className="mb-2 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
      مصطلحات أساسية
    </div>
    <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
      مصطلحات يجب أن يعرفها كل متداول مبتدئ
    </h2>
  </div>

  <div className="grid gap-3 md:grid-cols-3">
  {tradingTerms.map(([term, desc, href]) =>
    href ? (
      <Link
        key={term}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-black text-slate-950 transition group-hover:text-brand-600">
            {term}
          </h3>

          <span className="text-sm font-black text-brand-500 transition group-hover:-translate-x-1">
            ←
          </span>
        </div>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {desc}
        </p>

        <span className="mt-3 inline-flex text-sm font-black text-brand-600">
          قراءة الدليل كاملًا ←
        </span>
      </Link>
    ) : (
      <div
        key={term}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-white hover:shadow-md"
      >
        <h3 className="text-lg font-black text-slate-950">
          {term}
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {desc}
        </p>
      </div>
    )
  )}
</div>
</section>

       <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
  <div className="mb-5 text-center">
    <div className="mb-2 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
      استكشف بروكر العرب
    </div>
    <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
      انتقل للخطوة التالية
    </h2>
  </div>

  <div className="grid gap-3 md:grid-cols-3">
    {siteSections.map(([title, desc, href]) => (
      <InternalLink
        key={href + title}
        href={href}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lg"
      >
        <h3 className="text-lg font-black text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p>
        <span className="mt-3 inline-flex text-sm font-black text-brand-600">
          عرض القسم ←
        </span>
      </InternalLink>
    ))}
  </div>
</section>

       <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
  <div className="mb-5 text-center">
    <div className="mb-2 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-black text-brand-600">
      الأسئلة الشائعة
    </div>
    <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
      أسئلة شائعة حول تعلم التداول
    </h2>
  </div>

  <div className="grid gap-3 md:grid-cols-2">
    {faqs.map((faq) => (
      <details
        key={faq.q}
        className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white open:shadow-sm"
      >
        <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
          <h3 className="text-sm font-black leading-7 text-slate-950 md:text-base">
            {faq.q}
          </h3>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 transition group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {faq.a}
        </p>
      </details>
    ))}
  </div>
</section>
<section className="mt-5 overflow-hidden rounded-[28px] border border-brand-200 bg-gradient-to-l from-brand-600 via-brand-500 to-brand-400 p-6 text-center text-white shadow-xl md:p-8">
  <h2 className="text-2xl font-black md:text-3xl">
    جاهز تبدأ رحلة تعلم التداول؟
  </h2>
  <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-brand-50 md:text-base md:leading-8">
    ابدأ بدليل المبتدئين خطوة بخطوة، ثم استخدم أدوات الحساب وقارن بين الوسطاء قبل فتح حساب حقيقي.
  </p>

  <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
    <InternalLink
      href="/learn-trading/how-to-start-trading-from-zero"
      className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-brand-600 shadow-md transition hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-lg"
    >
      ابدأ التعلم الآن
    </InternalLink>

    <InternalLink
      href="/brokers"
      className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-white/30 bg-white/15 px-6 text-sm font-black text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/25"
    >
      تصفح تقييمات الوسطاء
    </InternalLink>
  </div>
</section>
      </main>
    </>
  );
}