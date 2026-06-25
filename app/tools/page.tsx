import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "أدوات التداول",
  description:
    "استخدم أدوات التداول المجانية لحساب المخاطر، حجم اللوت، النقاط، الهامش، الأرباح والخسائر، الرافعة المالية، فيبوناتشي، نقاط الارتكاز، التراجع والفائدة المركبة.",
  alternates: {
    canonical: "https://brokeralarab.com/tools",
    languages: {
      ar: "https://brokeralarab.com/tools",
      en: "https://brokeralarab.com/en/tools",
      "x-default": "https://brokeralarab.com/tools",
    },
  },
  openGraph: {
    title: "أدوات التداول",
    description:
      "مجموعة أدوات مجانية للمتداولين تشمل حاسبة المخاطر، اللوت، النقاط، الهامش، فيبوناتشي، Pivot Point والمزيد.",
    url: "https://brokeralarab.com/tools",
    siteName: "Broker Alarab",
    type: "website",
  },
};

const tools = [
  {
    title: "حاسبة إدارة المخاطر",
    href: "/tools/risk-calculator",
    tag: "إدارة المخاطر",
    desc: "احسب قيمة المخاطرة في الصفقة بناءً على رصيد الحساب ونسبة المخاطرة، وحدد المبلغ المناسب قبل الدخول.",
  },
  {
    title: "حاسبة حجم اللوت",
    href: "/tools/lot-size-calculator",
    tag: "حجم الصفقة",
    desc: "اعرف حجم اللوت المناسب حسب رأس المال، وقف الخسارة، نسبة المخاطرة، وزوج التداول.",
  },
  {
    title: "حاسبة النقاط",
    href: "/tools/pip-calculator",
    tag: "Pip Value",
    desc: "احسب قيمة النقطة في الفوركس والذهب والمؤشرات لتفهم تأثير حركة السعر على ربحك أو خسارتك.",
  },
  {
    title: "حاسبة الأرباح والخسائر",
    href: "/tools/profit-calculator",
    tag: "Profit & Loss",
    desc: "احسب الربح أو الخسارة المتوقعة من الصفقة بناءً على سعر الدخول، الخروج، حجم اللوت ونوع الأصل.",
  },
  {
    title: "حاسبة الهامش",
    href: "/tools/margin-calculator",
    tag: "Margin",
    desc: "اعرف مقدار الهامش المطلوب لفتح الصفقة حسب الرافعة المالية، حجم العقد، وسعر السوق.",
  },
  {
    title: "حاسبة الرافعة المالية",
    href: "/tools/leverage-calculator",
    tag: "Leverage",
    desc: "افهم العلاقة بين حجم الصفقة، الهامش المستخدم، والرافعة المالية قبل فتح مراكز كبيرة.",
  },
  {
    title: "حاسبة التراجع",
    href: "/tools/drawdown-calculator",
    tag: "Drawdown",
    desc: "احسب نسبة التراجع في الحساب ومعرفة مقدار الربح المطلوب لتعويض الخسارة والعودة إلى رأس المال السابق.",
  },
  {
    title: "حاسبة الفائدة المركبة",
    href: "/tools/compound-calculator",
    tag: "Compound Growth",
    desc: "قدّر نمو رأس المال مع إعادة استثمار الأرباح والإيداعات الشهرية على مدى فترة زمنية محددة.",
  },
  {
    title: "حاسبة فيبوناتشي",
    href: "/tools/fibonacci-calculator",
    tag: "Fibonacci",
    desc: "احسب مستويات التصحيح والامتداد لتحديد مناطق الدعم والمقاومة المحتملة في التحليل الفني.",
  },
  {
    title: "حاسبة نقاط الارتكاز",
    href: "/tools/pivot-point-calculator",
    tag: "Pivot Point",
    desc: "احسب مستويات Pivot Point وR1 وR2 وR3 وS1 وS2 وS3 بناءً على أعلى سعر وأدنى سعر والإغلاق.",
  },
];

export default function ToolsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f7fb] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm sm:rounded-[2.25rem]">
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-5 py-12 text-center sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold text-blue-100">
              أدوات مجانية للمتداولين
            </span>

            <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-snug text-white sm:text-5xl sm:leading-tight">
              أدوات التداول وحاسبات الفوركس لإدارة الصفقات باحتراف
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-blue-100 sm:text-lg sm:leading-9">
              استخدم مجموعة أدوات التداول المجانية لحساب المخاطر، حجم اللوت،
              قيمة النقطة، الهامش، الأرباح والخسائر، الرافعة المالية، فيبوناتشي
              ونقاط الارتكاز قبل اتخاذ قراراتك في السوق.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-brand-50 hover:shadow-xl"
                >
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-brand-600">
                    {tool.tag}
                  </span>

                  <h2 className="mt-4 text-xl font-black text-slate-950">
                    {tool.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {tool.desc}
                  </p>

                  <div className="mt-5 inline-flex rounded-2xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white transition group-hover:bg-brand-600">
                    فتح الأداة في نافذة جديدة
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

       <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:mt-8 sm:rounded-[2rem]">
  <div className="border-b border-slate-100 bg-gradient-to-l from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-brand-600">
      إدارة أفضل للصفقات
    </span>

    <h2 className="mt-4 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
      لماذا تحتاج إلى أدوات التداول؟
    </h2>

    <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
      أدوات التداول تساعدك على تحويل قراراتك من تخمين إلى حساب واضح. قبل فتح أي
      صفقة، يحتاج المتداول إلى معرفة حجم المخاطرة، قيمة النقطة، الهامش المطلوب،
      حجم اللوت المناسب، ومستويات الدعم والمقاومة المحتملة.
    </p>
  </div>

  <div className="grid gap-4 p-5 sm:p-8 md:grid-cols-3 lg:p-10">
    {[
      {
        title: "حساب المخاطرة بدقة",
        text: "اعرف كم تخاطر في كل صفقة قبل الدخول، وحدد حجم الصفقة المناسب لرأس المال.",
      },
      {
        title: "فهم تكلفة الصفقة",
        text: "احسب قيمة النقطة، الهامش، الرافعة المالية، والربح أو الخسارة المتوقعة.",
      },
      {
        title: "تحسين التحليل الفني",
        text: "استخدم فيبوناتشي ونقاط الارتكاز لتحديد مناطق الدعم والمقاومة المحتملة.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-brand-50 hover:shadow-lg"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-lg font-black text-brand-600">
          ✓
        </div>

        <h3 className="text-lg font-black text-slate-950">{item.title}</h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
      </div>
    ))}
  </div>
</section>

<section className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:mt-8 sm:rounded-[2rem]">
  <div className="border-b border-slate-100 bg-gradient-to-l from-blue-50 via-white to-white p-5 sm:p-8 lg:p-10">
    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-brand-600">
      أسئلة المتداولين
    </span>

    <h2 className="mt-4 text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
      أسئلة شائعة حول أدوات التداول
    </h2>
  </div>

  <div className="grid gap-3 p-5 sm:p-8 lg:p-10">
    {[
      {
        q: "هل أدوات التداول مجانية؟",
        a: "نعم، جميع الحاسبات المتوفرة في هذه الصفحة مجانية ويمكن استخدامها مباشرة من المتصفح.",
      },
      {
        q: "هل هذه الأدوات مناسبة للفوركس فقط؟",
        a: "يمكن استخدام معظم الأدوات مع الفوركس والذهب والمؤشرات والأسهم والعملات الرقمية، حسب نوع الأداة والبيانات التي تدخلها.",
      },
      {
        q: "هل نتائج الحاسبات مضمونة؟",
        a: "لا، النتائج تقديرية وتعتمد على البيانات التي تدخلها. يجب استخدامها كأدوات مساعدة مع إدارة مخاطر واضحة.",
      },
      {
        q: "ما أهم أداة للمتداول المبتدئ؟",
        a: "حاسبة إدارة المخاطر وحاسبة حجم اللوت من أهم الأدوات لأنها تساعدك على معرفة حجم الصفقة والمبلغ الذي تخاطر به.",
      },
    ].map((item) => (
      <details
        key={item.q}
        className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-100 hover:bg-brand-50 sm:p-5"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold leading-7 text-slate-950 sm:text-lg">
          <span>{item.q}</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 transition group-open:rotate-180">
            ▼
          </span>
        </summary>

        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          {item.a}
        </p>
      </details>
    ))}
  </div>
</section>
      </section>
    </main>
  );
}