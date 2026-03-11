import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinder from "@/app/components/BrokerFinder";

export const metadata: Metadata = {
  title: "أفضل شركات التداول في 2026 | بروكر العرب",
  description:
    "مراجعات عربية احترافية لأفضل شركات التداول مع مقارنة الحسابات والتراخيص والرسوم والمنصات، وأداة ذكية لاختيار أفضل وسيط حسب بلدك ومبلغ الإيداع.",
  keywords: [
    "أفضل شركات التداول",
    "أفضل شركات الفوركس",
    "تقييم شركات التداول",
    "مقارنة شركات الفوركس",
    "أفضل وسيط تداول",
    "شركات تداول موثوقة",
    "أفضل شركات الفوركس في السعودية",
    "أفضل شركات التداول الإسلامية",
    "حساب إسلامي",
    "بروكر العرب",
  ],
  alternates: {
    canonical: "https://brokeralarab.com",
  },
  openGraph: {
    title: "أفضل شركات التداول في 2026 | بروكر العرب",
    description:
      "منصة عربية لمراجعة وتقييم ومقارنة شركات التداول مع أداة اختيار ذكية للمتداول العربي.",
    url: "https://brokeralarab.com",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
  },
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  best_for: string | null;
  intro: string | null;
  logo: string | null;
  pros: string | null;
  cons: string | null;
  account_types: string | null;
  fees: string | null;
  spreads: string | null;
  deposit_withdrawal: string | null;
  platform_details: string | null;
  support: string | null;
  safety: string | null;
  final_verdict: string | null;
  meta_title: string | null;
  meta_description: string | null;
  arab_traders: string | null;
  founded_year: string | null;
  headquarters: string | null;
  max_leverage: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  trading_assets: string | null;
};

function money(value: number | null) {
  if (value === null || Number.isNaN(value)) return "غير محدد";
  return `$${value}`;
}

function shortReg(value: string | null) {
  if (!value) return "غير محدد";
  return value
    .split("||")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(" / ");
}

function shortPlatforms(value: string | null) {
  if (!value) return "غير محدد";
  return value.replace("JustMarkets Mobile App", "Mobile").trim();
}

function getComparisons(brokers: Broker[]) {
  const pairs = [
    ["exness", "xm"],
    ["exness", "vantage"],
    ["xs", "xm"],
    ["exness", "xs"],
    ["xm", "vantage"],
    ["vantage", "xs"],
  ];

  return pairs
    .map(([a, b]) => {
      const first = brokers.find((x) => x.slug === a);
      const second = brokers.find((x) => x.slug === b);
      if (!first || !second) return null;

      return {
        title: `${first.name} أم ${second.name}؟`,
        href: `/compare/${first.slug}-vs-${second.slug}`,
        desc: `مقارنة بين ${first.name} و${second.name} من حيث التراخيص والحسابات والرسوم والمنصات.`,
      };
    })
    .filter(Boolean) as { title: string; href: string; desc: string }[];
}

function getCountryPages() {
  return [
    {
      title: "أفضل شركات التداول في السعودية",
      href: "/best-brokers/saudi-arabia",
      desc: "وسطاء مناسبون للمتداولين في السعودية من حيث الحساب الإسلامي والإيداع والتراخيص.",
    },
    {
      title: "أفضل شركات التداول في الإمارات",
      href: "/best-brokers/uae",
      desc: "مقارنة أفضل الوسطاء المناسبين للمتداولين في الإمارات من حيث المنصات والرسوم.",
    },
    {
      title: "أفضل شركات التداول في الكويت",
      href: "/best-brokers/kuwait",
      desc: "اختيار أفضل شركات الفوركس للمتداول الكويتي بناءً على الحسابات والإيداع والدعم.",
    },
    {
      title: "أفضل شركات التداول في مصر",
      href: "/best-brokers/egypt",
      desc: "أفضل الوسطاء للمتداول المصري مع تركيز على الإيداع المنخفض والمنصات المناسبة.",
    },
  ];
}

function getTypePages() {
  return [
    {
      title: "أفضل شركات التداول الإسلامية",
      href: "/best-brokers/islamic",
      desc: "وسطاء يوفرون حسابات إسلامية بدون فوائد تبييت للمتداول العربي.",
    },
    {
      title: "أفضل شركات التداول للمبتدئين",
      href: "/best-brokers/beginners",
      desc: "شركات مناسبة للمبتدئين من حيث سهولة الاستخدام والإيداع المنخفض.",
    },
    {
      title: "أفضل شركات التداول بالسبريد المنخفض",
      href: "/best-brokers/low-spread",
      desc: "مقارنة الوسطاء الذين يقدمون سبريد منخفضًا وحسابات احترافية.",
    },
    {
      title: "أفضل شركات التداول بحسابات MT4 وMT5",
      href: "/best-brokers/mt4-mt5",
      desc: "وسطاء يدعمون منصتي MetaTrader 4 وMetaTrader 5 للمتداولين اليوميين والمحترفين.",
    },
  ];
}

export default async function HomePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("*")
    .order("rating", { ascending: false });

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.slug && b.name);
  const topBrokers = brokers.slice(0, 6);
  const featured = brokers[0] ?? null;
  const comparisons = getComparisons(brokers);
  const countryPages = getCountryPages();
  const typePages = getTypePages();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف أختار شركة التداول المناسبة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اختر شركة التداول بناءً على التراخيص، الحد الأدنى للإيداع، المنصات، الحسابات، الرسوم، والحساب الإسلامي إذا كان مهمًا بالنسبة لك.",
        },
      },
      {
        "@type": "Question",
        name: "هل الأفضل اختيار شركة بإيداع منخفض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الإيداع المنخفض مفيد للمبتدئين، لكن يجب النظر أيضًا إلى قوة الترخيص وجودة التنفيذ وتنوع الحسابات والمنصات.",
        },
      },
      {
        "@type": "Question",
        name: "هل المقارنات بين شركات الفوركس مهمة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، المقارنات تختصر الوقت وتوضح الفروقات الحقيقية بين الشركات في الرسوم والتراخيص والحسابات والمنصات.",
        },
      },
    ],
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

{/* HERO - NEW STYLE */}
<section className="relative overflow-hidden border-b border-slate-200 bg-[#f7faff]">
  <div className="absolute inset-0">
    <div className="absolute right-[-140px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[rgba(37,99,235,0.10)] blur-3xl" />
    <div className="absolute left-[-100px] bottom-[-140px] h-[280px] w-[280px] rounded-full bg-[rgba(16,185,129,0.06)] blur-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_100%)]" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      {/* RIGHT CONTENT */}
      <div className="lg:w-[64%]">

        <h1 className="max-w-4xl text-[30px] font-black leading-[1.12] tracking-[-0.02em] text-[#0f172a] sm:text-[40px] lg:text-[52px]">
          قارن الوسطاء بثقة
          <span className="mt-2 block text-[#2563eb]">
            واختر الأنسب لتجربتك
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-600 sm:text-[17px]">
          راجع التراخيص، الرسوم، المنصات وأنواع الحسابات في مكان واحد،
          ثم اعثر على شركة التداول الأقرب لاحتياجاتك الفعلية بدلًا من
          الاختيار العشوائي أو التأثر بالإعلانات.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="#finder"
            className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
          >
            ابدأ المقارنة السريعة
          </a>

          <Link
            href="/compare"
            className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            تصفح المقارنات
          </Link>
        </div>

        <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="text-[11px] font-bold text-slate-400">التركيز</div>
            <div className="mt-1 text-sm font-black text-[#0f172a]">
              مراجعات واضحة
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="text-[11px] font-bold text-slate-400">النتيجة</div>
            <div className="mt-1 text-sm font-black text-[#0f172a]">
              مقارنة سهلة وسريعة
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="text-[11px] font-bold text-slate-400">الملاءمة</div>
            <div className="mt-1 text-sm font-black text-[#0f172a]">
              مناسب للمتداول العربي
            </div>
          </div>
        </div>
      </div>

      {/* LEFT PANEL - DESKTOP ONLY */}
<div className="hidden lg:block lg:w-[42%] lg:max-w-[460px]">
  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-slate-400 sm:text-xs">
            لمحة سريعة
          </p>
          <h2 className="mt-1 text-base font-black text-[#0f172a] sm:text-lg">
            مقارنة بين أبرز الوسطاء
          </h2>
        </div>

        <span className="inline-flex rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1.5 text-[11px] font-extrabold text-[#1d4ed8] sm:text-xs">
          محدثة باستمرار
        </span>
      </div>
    </div>

    <div className="p-4 sm:p-5">
      <div className="overflow-hidden rounded-[24px] border border-slate-200">
        <div className="grid grid-cols-[70px_1fr_90px] bg-slate-50 px-4 py-3 text-[11px] font-bold text-slate-500 sm:text-xs">
          <div className="text-center">التقييم</div>
          <div>الوسيط</div>
          <div className="text-left">الإيداع</div>
        </div>

        {[
          {
            name: featured?.name || "Exness",
            slug: featured?.slug || "exness",
            rating: featured?.rating?.toFixed(1) || "4.5",
            deposit: money(featured?.min_deposit) || "$10",
            subtitle: featured?.best_for || "للمبتدئين والمتداولين العرب",
            tag: "الأعلى تقييمًا",
          },
          {
            name: "XM",
            slug: "xm",
            rating: "4.5",
            deposit: "$5",
            subtitle: "للمبتدئين وتداول الفوركس",
            tag: "إيداع منخفض",
          },
          {
            name: "Equiti",
            slug: "equiti",
            rating: "4.4",
            deposit: "$30",
            subtitle: "للتداول في الشرق الأوسط",
            tag: "حضور إقليمي",
          },
        ].map((broker, index) => (
          <Link
            key={broker.slug}
            href={`/brokers/${broker.slug}`}
            className={`grid grid-cols-[70px_1fr_90px] items-center gap-3 px-4 py-4 transition hover:bg-slate-50 ${
              index !== 2 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eff6ff] text-sm font-black text-[#1d4ed8] ring-1 ring-[#bfdbfe]">
                {broker.rating}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
                <h3 className="text-lg font-black text-[#0f172a] transition hover:text-[#2563eb]">
                  {broker.name}
                </h3>
                <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                  {broker.tag}
                </span>
              </div>

              <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                {broker.subtitle}
              </p>
            </div>

            <div className="text-left">
              <div className="text-sm font-black text-[#0f172a]">
                {broker.deposit}
              </div>
              <div className="mt-1 text-[11px] font-bold text-slate-400">
                حد أدنى
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <a
          href="#finder"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
        >
          اعرض أفضل الخيارات
        </a>

        <Link
          href="/compare"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
        >
          تصفح المقارنات
        </Link>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</section>
      {/* FINDER */}
<section
  id="finder"
  className="scroll-mt-24 mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8"
>
  <BrokerFinder brokers={brokers} />
</section>

     {/* HOW WE RATE */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-1 sm:px-6 sm:pt-4 sm:pb-2 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>

          <h2 className="text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[38px]">
            كيف نقيّم شركات التداول؟
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            لا نعتمد على الوعود التسويقية، بل نراجع كل وسيط بناءً على عوامل
            عملية تؤثر فعلاً على تجربة المتداول العربي.
          </p>
        </div>

        <Link
          href="/brokers"
          className="inline-flex w-fit items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          تصفح جميع التقييمات
        </Link>
      </div>
    </div>

    {/* MOBILE */}
    <div className="p-4 sm:hidden">
      <div className="grid grid-cols-2 gap-3">
        {[
          "التراخيص والتنظيم",
          "الحسابات والرسوم",
          "المنصات والأدوات",
          "الإيداع والسحب",
          "الحساب الإسلامي",
          "الدعم وتجربة المستخدم",
        ].map((item, index) => (
          <div
            key={item}
            className="rounded-[18px] border border-slate-200 bg-[#f8fbff] px-3 py-4 text-center shadow-sm"
          >
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#bfdbfe] bg-[#eff6ff] text-xs font-black text-[#1d4ed8]">
              {index + 1}
            </div>

            <h3 className="text-[14px] font-black leading-6 text-[#0f172a]">
              {item}
            </h3>
          </div>
        ))}
      </div>
    </div>

    {/* DESKTOP */}
    <div className="hidden p-6 sm:block sm:p-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: "التراخيص والتنظيم",
            desc: "نراجع الجهات الرقابية التي يعمل تحتها الوسيط، ومدى وضوح الإطار التنظيمي ومستوى الحماية المرتبط بأموال العملاء.",
          },
          {
            title: "الحسابات والرسوم",
            desc: "نقارن أنواع الحسابات، السبريد، العمولات، وشروط التداول الفعلية بدل الاكتفاء بالرسائل التسويقية العامة.",
          },
          {
            title: "المنصات والأدوات",
            desc: "نقيم جودة المنصات مثل MT4 وMT5، وسهولة الاستخدام، والأدوات التي يحتاجها المتداول اليومي أو المبتدئ.",
          },
          {
            title: "الإيداع والسحب",
            desc: "ننظر إلى طرق الدفع، سرعة السحب، وضوح الشروط، وما إذا كانت التجربة عملية ومناسبة للمستخدم العربي.",
          },
          {
            title: "الحساب الإسلامي",
            desc: "نتأكد من توفر الحساب الإسلامي، وطريقة تقديمه، ومدى ملاءمته للباحثين عن خيارات تداول متوافقة مع احتياجاتهم.",
          },
          {
            title: "الدعم وتجربة المستخدم",
            desc: "نراجع مستوى الدعم، توفر اللغة العربية، وضوح الواجهة، ومدى سهولة الوصول إلى المعلومات الأساسية بسرعة.",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="group rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-sm font-black text-[#1d4ed8]">
                {index + 1}
              </span>
            </div>

            <h3 className="text-[22px] font-black leading-[1.25] text-[#0f172a]">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* TOP BROKERS */}
<section className="mx-auto max-w-7xl px-4 pt-4 pb-6 sm:px-6 sm:pt-5 sm:pb-8 lg:px-8">
  <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>

      <h2 className="text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[40px]">
  أفضل شركات الفوركس
</h2>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        اختر من بين أبرز شركات التداول التي تحقق توازنًا جيدًا بين
        التراخيص، المنصات، الرسوم، وتجربة المستخدم.
      </p>
    </div>

    <Link
      href="/brokers"
      className="inline-flex w-fit items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50"
    >
      عرض جميع التقييمات
    </Link>
  </div>

  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {topBrokers.map((broker, index) => (
      <article
        key={broker.id}
        className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:p-5"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent" />

        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                #{index + 1} من الأعلى تقييمًا
              </span>
            </div>

            <h3 className="truncate text-[24px] font-black leading-none text-[#0f172a]">
              {broker.name}
            </h3>

            <p className="mt-2 text-xs font-bold text-[#1d4ed8] sm:text-sm">
              {broker.best_for || "وسيط مناسب لفئات متعددة"}
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[22px] border border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8] shadow-sm">
            <span className="text-xl font-black">
              {broker.rating?.toFixed(1) ?? "—"}
            </span>
            <span className="text-[10px] font-bold">من 5</span>
          </div>
        </div>

        <div className="grid gap-2.5">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="mb-1 text-[11px] font-bold text-slate-400">
              الحد الأدنى للإيداع
            </div>
            <div className="text-sm font-black text-[#0f172a]">
              {money(broker.min_deposit)}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="mb-1 text-[11px] font-bold text-slate-400">
              المنصات
            </div>
            <div className="text-sm font-black text-[#0f172a]">
              {shortPlatforms(broker.platforms)}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="mb-1 text-[11px] font-bold text-slate-400">
              التراخيص
            </div>
            <div className="text-sm font-black text-[#0f172a]">
              {shortReg(broker.regulation)}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="mb-1 text-[11px] font-bold text-slate-400">
              مناسب لـ
            </div>
            <div className="text-sm font-black text-[#0f172a]">
              {broker.best_for || "فئات متعددة"}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href={`/brokers/${broker.slug}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
          >
            اقرأ التقييم
          </Link>

          <Link
            href="/compare"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
          >
            قارن الآن
          </Link>
        </div>
      </article>
    ))}
  </div>
</section>

{/* PROGRAMMATIC SEO - COUNTRIES */}
<section className="bg-[#f4f7fb] pt-3 pb-5 sm:pt-4 sm:pb-7">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div className="mb-5 sm:mb-6">

      {/* TITLE */}
      <h2 className="text-[26px] font-black leading-[1.15] tracking-[-0.01em] text-[#0f172a] sm:text-[40px]">
        أفضل شركات الفوركس
        <span className="text-[#2563eb] sm:inline"> حسب الدولة</span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        تختلف احتياجات المتداولين من دولة إلى أخرى، لذلك أنشأنا صفحات مخصصة
        تساعدك على الوصول إلى أفضل شركات التداول المناسبة لبلدك، مع التركيز
        على عوامل مثل الحساب الإسلامي، الحد الأدنى للإيداع، المنصات،
        وسهولة اختيار الوسيط المناسب.
      </p>

    </div>

    {/* MOBILE LIST */}
    <div className="space-y-3 md:hidden">
      {countryPages.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block rounded-[18px] border border-slate-200 bg-[#f8fbff] px-4 py-4 shadow-sm transition active:scale-[0.99]"
        >
          <div className="flex items-center justify-between gap-3">

            <div className="min-w-0">
              <h3 className="text-base font-black leading-6 text-[#0f172a]">
                {item.title}
              </h3>

              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">
                {item.desc}
              </p>
            </div>

            <span className="shrink-0 text-xl font-black text-[#1d4ed8]">
              ‹
            </span>

          </div>
        </Link>
      ))}
    </div>

    {/* DESKTOP GRID */}
    <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
      {countryPages.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
        >

          <div className="mb-4 flex items-center justify-between">

            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-sm font-black text-[#1d4ed8]">
              {index + 1}
            </span>

            <span className="text-sm font-extrabold text-[#1d4ed8]">
              افتح الصفحة
            </span>

          </div>

          <h3 className="text-[22px] font-black leading-[1.25] text-[#0f172a]">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {item.desc}
          </p>

        </Link>
      ))}
    </div>

  </div>
</section>

     {/* COMPARISONS */}
<section className="mx-auto max-w-7xl px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>

          <h2 className="text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[38px]">
            أشهر مقارنات شركات الفوركس
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            استعرض أشهر المقارنات بين الوسطاء لمعرفة الفروقات في التراخيص،
            المنصات، الرسوم، والحسابات قبل اتخاذ قرارك.
          </p>
        </div>

        <Link
          href="/compare"
          className="inline-flex w-fit items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          تصفح صفحة المقارنات
        </Link>
      </div>
    </div>

    <div className="p-5 sm:p-8">
      {/* MOBILE - show only 3 */}
      <div className="grid gap-3 md:hidden">
        {comparisons.slice(0, 3).map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-[20px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-4 shadow-sm transition active:scale-[0.99]"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-xs font-black text-[#1d4ed8]">
                {index + 1}
              </span>

              <span className="text-xs font-bold text-slate-400">
                مقارنة شائعة
              </span>
            </div>

            <div className="text-lg font-black leading-7 text-[#0f172a] group-hover:text-[#1d4ed8]">
              {item.title}
            </div>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
              {item.desc}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#1d4ed8]">
              اقرأ المقارنة
              <span aria-hidden="true">←</span>
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP - show all */}
      <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
        {comparisons.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563eb] to-transparent opacity-80" />

            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-sm font-black text-[#1d4ed8]">
                {index + 1}
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-500">
                الأكثر قراءة
              </span>
            </div>

            <div className="text-[22px] font-black leading-[1.3] text-[#0f172a] group-hover:text-[#1d4ed8]">
              {item.title}
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.desc}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#1d4ed8]">
              اقرأ المقارنة
              <span
                aria-hidden="true"
                className="transition group-hover:-translate-x-1"
              >
                ←
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* LONG SEO CONTENT */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-5 sm:px-6 sm:pt-4 sm:pb-7 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-6 sm:px-8 sm:py-8">
      

      <h2 className="text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[40px]">
        كيف تختار أفضل شركة تداول مناسبة لك؟
      </h2>
    </div>

    {/* MOBILE VERSION */}
    <div className="px-5 py-5 sm:hidden">
      <div className="text-sm leading-7 text-slate-600">
        <p>
          اختيار أفضل شركة تداول لا يعتمد فقط على شهرة الاسم أو كثرة الإعلانات،
          بل على التراخيص، أنواع الحسابات، المنصات، وسهولة الإيداع والسحب.
        </p>

        <details className="mt-4 overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8fbff]">
          <summary className="cursor-pointer list-none px-4 py-4 font-extrabold text-[#1d4ed8]">
            اقرأ الدليل الكامل
          </summary>

          <div className="space-y-5 border-t border-slate-200 bg-white px-4 py-4">
            <p>
              اختيار أفضل شركة تداول لا يعتمد فقط على شهرة الاسم أو كثرة
              الإعلانات، بل على مجموعة من العوامل العملية التي تؤثر مباشرة على
              تجربة المتداول وإمكانية استمراره وتحقيقه لأداء أفضل. أول هذه
              العوامل هو الترخيص، لأن التنظيم يعطي انطباعًا أوليًا عن الإطار
              الرقابي الذي تعمل تحته الشركة، وطريقة تعاملها مع أموال العملاء،
              ومدى التزامها بالمعايير المطلوبة.
            </p>

            <p>
              بعد ذلك يأتي عامل أنواع الحسابات، فليس كل متداول يحتاج نفس نوع
              الحساب. بعض المستخدمين يريدون حسابًا بإيداع منخفض جدًا من أجل
              البداية، بينما يفضل آخرون حسابات احترافية بسبريد منخفض وعمولات
              واضحة. كذلك تختلف أهمية المنصات من مستخدم إلى آخر؛ فهناك من يفضل
              MT4 بسبب شيوعها وسهولتها، وهناك من يفضل MT5 لما توفره من أدوات
              إضافية وتحسينات على مستوى الأداء والتحليل.
            </p>

            <p>
              ومن العوامل التي لا يجب إهمالها أيضًا: سهولة الإيداع والسحب،
              وتوفر الحساب الإسلامي، والدعم باللغة العربية، ومدى ملاءمة الشركة
              للمتداول العربي من حيث التعامل مع الاحتياجات الواقعية للسوق في
              المنطقة.
            </p>

            <p>
              لهذا السبب بنينا في بروكر العرب قاعدة تقييمات ومقارنات تساعد
              الزائر على الوصول إلى صورة أوضح، ثم دعمنا الصفحة الرئيسية بأداة
              اختيار ذكية تقترح أفضل 3 شركات بناءً على مدخلات بسيطة مثل البلد،
              مبلغ الإيداع، المنصة المفضلة، ومستوى الخبرة.
            </p>
          </div>
        </details>
      </div>
    </div>

    {/* DESKTOP VERSION */}
    <div className="hidden px-8 py-8 sm:block">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="space-y-6 text-base leading-9 text-slate-600">
            <p>
              اختيار أفضل شركة تداول لا يعتمد فقط على شهرة الاسم أو كثرة
              الإعلانات، بل على مجموعة من العوامل العملية التي تؤثر مباشرة على
              تجربة المتداول وإمكانية استمراره وتحقيقه لأداء أفضل. أول هذه
              العوامل هو الترخيص، لأن التنظيم يعطي انطباعًا أوليًا عن الإطار
              الرقابي الذي تعمل تحته الشركة، وطريقة تعاملها مع أموال العملاء،
              ومدى التزامها بالمعايير المطلوبة.
            </p>

            <p>
              بعد ذلك يأتي عامل أنواع الحسابات، فليس كل متداول يحتاج نفس نوع
              الحساب. بعض المستخدمين يريدون حسابًا بإيداع منخفض جدًا من أجل
              البداية، بينما يفضل آخرون حسابات احترافية بسبريد منخفض وعمولات
              واضحة. كذلك تختلف أهمية المنصات من مستخدم إلى آخر؛ فهناك من يفضل
              MT4 بسبب شيوعها وسهولتها، وهناك من يفضل MT5 لما توفره من أدوات
              إضافية وتحسينات على مستوى الأداء والتحليل.
            </p>

            <p>
              ومن العوامل التي لا يجب إهمالها أيضًا: سهولة الإيداع والسحب،
              وتوفر الحساب الإسلامي، والدعم باللغة العربية، ومدى ملاءمة الشركة
              للمتداول العربي من حيث التعامل مع الاحتياجات الواقعية للسوق في
              المنطقة. لهذا السبب بنينا في بروكر العرب قاعدة تقييمات ومقارنات
              تساعد الزائر على الوصول إلى صورة أوضح.
            </p>

            <p>
              ومع توسع الموقع يومًا بعد يوم بإضافة شركات جديدة وصفحات مقارنة
              وصفحات Programmatic SEO حسب الدول والفئات، يصبح بإمكان الزائر أن
              ينتقل بسهولة من صفحة عامة مثل "أفضل شركات التداول" إلى صفحات أكثر
              تحديدًا مثل "أفضل شركات التداول في السعودية" أو "أفضل شركات
              التداول الإسلامية" أو "Exness vs XM".
            </p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
            <div className="text-xs font-extrabold text-[#1d4ed8]">
              أهم عوامل الاختيار
            </div>

            <div className="mt-4 space-y-3">
              {[
                "قوة الترخيص والتنظيم",
                "أنواع الحسابات والرسوم",
                "المنصة المناسبة لك",
                "سهولة الإيداع والسحب",
                "توفر الحساب الإسلامي",
                "الدعم العربي وتجربة المستخدم",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-xs font-black text-[#1d4ed8]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-[#0f172a]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* WHY US */}
<section className="mx-auto max-w-7xl px-4 pt-1 pb-4 sm:px-6 sm:pt-2 sm:pb-6 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-6 sm:px-8 sm:py-8">
      <div className="inline-flex rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-extrabold text-[#1d4ed8] sm:text-sm">
        لماذا بروكر العرب؟
      </div>

      <h2 className="mt-3 text-[24px] font-black leading-[1.50] text-[#0f172a] sm:text-[36px] lg:text-[42px]">
        منصة تساعد المتداول العربي
        <span className="text-[#2563eb]"> على اختيار شركة التداول بثقة</span>
      </h2>

      <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        هدفنا في بروكر العرب هو تقديم مراجعات ومقارنات واضحة تساعد المتداول
        العربي على فهم الفروقات الحقيقية بين شركات التداول قبل فتح الحساب،
        عبر صفحات تقييم مفصلة ومقارنات مباشرة توضح التراخيص والحسابات والرسوم والمنصات.
      </p>
    </div>

    {/* MOBILE */}
    <div className="grid gap-3 p-4 sm:hidden">
      {[
        {
          title: "مراجعات منظمة",
          desc: "صفحات مستقلة توضح الحسابات والتراخيص والرسوم.",
        },
        {
          title: "مقارنات عملية",
          desc: "مقارنات مباشرة توضح الفروق الحقيقية بسرعة.",
        },
        {
          title: "تركيز على المتداول العربي",
          desc: "اهتمام بالحساب الإسلامي والدعم العربي والإيداع المناسب.",
        },
        {
          title: "بنية قابلة للتوسع",
          desc: "ربط كل شركة بصفحات مقارنة ودول وفئات بشكل منظم.",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="rounded-[18px] border border-slate-200 bg-[#f8fbff] px-4 py-4 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-[#eff6ff] text-xs font-black text-[#1d4ed8]">
              {index + 1}
            </span>

            <h3 className="text-[15px] font-black leading-6 text-[#0f172a]">
              {item.title}
            </h3>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* DESKTOP */}
    <div className="hidden p-6 sm:block sm:p-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "مراجعات منظمة",
            desc: "كل شركة لها صفحة مستقلة تحتوي على الحسابات، المنصات، التراخيص، الرسوم، والخلاصة النهائية.",
          },
          {
            title: "مقارنات عملية",
            desc: "صفحات مقارنة توضح الفروق الفعلية بين الوسطاء بدل تنقل الزائر بين عدة صفحات منفصلة.",
          },
          {
            title: "تركيز على المتداول العربي",
            desc: "نهتم بالحساب الإسلامي، والدعم العربي، والحد الأدنى للإيداع، ومدى ملاءمة الشركة للمنطقة.",
          },
          {
            title: "بنية قابلة للتوسع",
            desc: "كل شركة جديدة يمكن ربطها مباشرة بصفحات مقارنة وصفحات دولة وصفحات فئة، وهذا ممتاز للسيو.",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="group rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-sm font-black text-[#1d4ed8]">
                {index + 1}
              </span>
            </div>

            <h3 className="text-[20px] font-black leading-[1.3] text-[#0f172a]">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
          <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-6 sm:px-8 sm:py-8">
            <div className="inline-flex rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-extrabold text-[#1d4ed8] sm:text-sm">
              الأسئلة الشائعة
            </div>

            <h2 className="mt-3 text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[36px]">
              أسئلة مهمة قبل اختيار شركة التداول
            </h2>
          </div>

          {/* MOBILE VERSION */}
          <div className="space-y-3 px-5 py-5 sm:hidden">
            {[
              {
                q: "كيف أختار شركة التداول المناسبة؟",
                a: "ابدأ بالتراخيص، ثم قارن بين الحد الأدنى للإيداع، المنصات، الرسوم، الحسابات، وتوفر الحساب الإسلامي إذا كان ذلك مهمًا بالنسبة لك.",
              },
              {
                q: "هل الأفضل اختيار شركة بإيداع منخفض؟",
                a: "الإيداع المنخفض مناسب للمبتدئين، لكن لا يكفي وحده. الأفضل هو الجمع بين ترخيص جيد وحساب مناسب ورسوم واضحة ومنصة قوية.",
              },
              {
                q: "ما أهمية التراخيص في شركات الفوركس؟",
                a: "التراخيص مؤشر مهم على البيئة التنظيمية التي تعمل ضمنها الشركة، ومدى التزامها بالمعايير والضوابط المتعلقة بأموال العملاء.",
              },
              {
                q: "هل المقارنات بين الشركات مفيدة؟",
                a: "نعم، لأنها تضع شركتين أو أكثر في نفس السياق وتوضح الفروق في الحسابات والرسوم والمنصات والتراخيص بشكل مباشر.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8fbff]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-right">
                  <span className="text-base font-black leading-7 text-[#0f172a]">
                    {item.q}
                  </span>

                  <span className="shrink-0 text-lg font-black text-[#1d4ed8] transition group-open:rotate-180">
                    ▾
                  </span>
                </summary>

                <div className="border-t border-slate-200 bg-white px-4 py-4">
                  <p className="text-sm leading-7 text-slate-600">{item.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* DESKTOP VERSION */}
          <div className="hidden px-8 py-8 sm:block">
            <div className="space-y-4">
              {[
                {
                  q: "كيف أختار شركة التداول المناسبة؟",
                  a: "ابدأ بالتراخيص، ثم قارن بين الحد الأدنى للإيداع، المنصات، الرسوم، الحسابات، وتوفر الحساب الإسلامي إذا كان ذلك مهمًا بالنسبة لك.",
                },
                {
                  q: "هل الأفضل اختيار شركة بإيداع منخفض؟",
                  a: "الإيداع المنخفض مناسب للمبتدئين، لكن لا يكفي وحده. الأفضل هو الجمع بين ترخيص جيد وحساب مناسب ورسوم واضحة ومنصة قوية.",
                },
                {
                  q: "ما أهمية التراخيص في شركات الفوركس؟",
                  a: "التراخيص مؤشر مهم على البيئة التنظيمية التي تعمل ضمنها الشركة، ومدى التزامها بالمعايير والضوابط المتعلقة بأموال العملاء.",
                },
                {
                  q: "هل المقارنات بين الشركات مفيدة؟",
                  a: "نعم، لأنها تضع شركتين أو أكثر في نفس السياق وتوضح الفروق في الحسابات والرسوم والمنصات والتراخيص بشكل مباشر.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group overflow-hidden rounded-[22px] border border-slate-200 bg-[#f8fbff] open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5">
                    <span className="text-lg font-black text-[#0f172a]">
                      {item.q}
                    </span>

                    <span className="shrink-0 text-lg font-black text-[#1d4ed8] transition group-open:rotate-180">
                      ▾
                    </span>
                  </summary>

                  <div className="border-t border-slate-200 px-5 py-5">
                    <p className="text-sm leading-8 text-slate-600">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}