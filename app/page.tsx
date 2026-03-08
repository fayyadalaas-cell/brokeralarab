import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinder from "@/app/components/BrokerFinder";

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
    canonical: "/",
  },
  openGraph: {
    title: "أفضل شركات التداول في 2026 | بروكر العرب",
    description:
      "منصة عربية لمراجعة وتقييم ومقارنة شركات التداول مع أداة اختيار ذكية للمتداول العربي.",
    url: "/",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
  },
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
      title: "أفضل شركات الفوركس في السعودية",
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

      {/* HERO */}
<section className="relative overflow-hidden border-b border-slate-200 bg-white">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.09),_transparent_30%),radial-gradient(circle_at_top_left,_rgba(16,185,129,0.05),_transparent_28%)]" />

  <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-12">
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <span className="inline-flex rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1.5 text-[11px] font-extrabold text-[#1d4ed8] sm:px-4 sm:text-xs">
          منصة عربية احترافية لمراجعة ومقارنة شركات التداول
        </span>

        <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.02em] text-[#0f172a] sm:mt-6 sm:text-4xl lg:text-6xl">
          اختر شركة التداول
          <span className="block text-[#1d4ed8]">المناسبة لك بثقة</span>
        </h1>

        <p className="mt-4 max-w-3xl text-[15px] leading-8 text-slate-600 sm:mt-6 sm:text-lg">
          بروكر العرب يساعدك على مقارنة شركات التداول من حيث التراخيص،
          الرسوم، الحسابات، المنصات، وملاءمة الشركة للمتداول العربي، ثم
          ترشيح الخيارات الأقرب لاحتياجاتك بدلًا من الاختيار العشوائي أو
          الاعتماد على الإعلانات فقط.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
          <a
            href="#finder"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[18px] bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8] sm:min-h-[46px] sm:rounded-2xl sm:px-6"
          >
            ابدأ الاختيار الذكي
          </a>

          <Link
            href="/compare"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[18px] border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50 sm:min-h-[46px] sm:rounded-2xl sm:px-6"
          >
            تصفح المقارنات
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 sm:mt-8">
          {[
            "تقييمات مفصلة",
            "مقارنات واضحة",
            "حسابات وتراخيص ورسوم",
            "مناسب للمتداول العربي",
          ].map((item, index) => (
            <span
              key={item}
              className={`${
                index > 1 ? "hidden sm:inline-flex" : "inline-flex"
              } rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 sm:text-xs`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-5">
        {featured && (
          <div className="rounded-[30px] border border-slate-200 bg-[#f8fbff] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
                الشركة الأعلى تقييمًا
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Featured Broker
              </span>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-black text-[#0f172a]">
                    {featured.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {featured.best_for || "وسيط مناسب لفئات متعددة"}
                  </p>
                </div>

                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]">
                  <span className="text-2xl font-black">
                    {featured.rating?.toFixed(1) ?? "—"}
                  </span>
                  <span className="text-[10px] font-bold">من 10</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">الحد الأدنى للإيداع</span>
                  <span className="text-sm font-black">{money(featured.min_deposit)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">المنصات</span>
                  <span className="text-sm font-black">{shortPlatforms(featured.platforms)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">التراخيص</span>
                  <span className="text-sm font-black">{shortReg(featured.regulation)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-500">مناسب لـ</span>
                  <span className="text-sm font-black">{featured.best_for || "متداولين متعددين"}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href={`/brokers/${featured.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
                >
                  اقرأ التقييم
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                >
                  قارن الآن
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</section>

      {/* FINDER */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <BrokerFinder brokers={brokers} />
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-[#1d4ed8]">هدفنا</div>
            <h3 className="mt-2 text-3xl font-black">وضوح</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              نبني مراجعات ومقارنات تساعد الزائر على فهم الفروقات الحقيقية بين
              الشركات بدل قراءة وعود تسويقية قصيرة ومكررة.
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-[#1d4ed8]">عناصر التقييم</div>
            <h3 className="mt-2 text-3xl font-black">+20</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              نراجع الحسابات، الرسوم، المنصات، التراخيص، الإيداع والسحب،
              الحساب الإسلامي، والدعم الفني قبل نشر أي تقييم.
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-[#1d4ed8]">وسطاء مضافون</div>
            <h3 className="mt-2 text-3xl font-black">{brokers.length}+</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              قاعدة البيانات تتوسع باستمرار، ومع كل وسيط جديد نضيف مراجعات
              وصفحات مقارنة وروابط داخلية تدعم السيو.
            </p>
          </div>
        </div>
      </section>

      {/* TOP BROKERS */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-4 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
  <div>
    <div className="text-xs font-bold text-[#1d4ed8] sm:text-sm">أفضل الوسطاء</div>
    <h2 className="mt-1 text-2xl font-black leading-[1.2] text-[#0f172a] sm:mt-2 sm:text-4xl">
  أفضل شركات الفوركس <br className="sm:hidden" />
  للمقارنة والتداول
</h2>
  </div>

  <Link
    href="/brokers"
    className="inline-flex w-fit items-center text-sm font-extrabold text-[#1d4ed8] hover:text-[#1d4ed8]"
  >
    عرض جميع التقييمات
  </Link>
</div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {topBrokers.map((broker) => (
            <article
  key={broker.id}
  className="rounded-[18px] border border-slate-200 bg-white p-3 sm:p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-[22px] font-black text-[#0f172a]">{broker.name}</h3>
                  <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                    {broker.best_for || "وسيط مناسب لفئات متعددة"}
                  </p>
                </div>

                <div className="flex h-12 w-12 sm:h-16 sm:w-16 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]">
                  <span className="text-base sm:text-xl font-black">{broker.rating?.toFixed(1) ?? "—"}</span>
                  <span className="text-[10px] font-bold">من 10</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-sm text-slate-500">الحد الأدنى للإيداع</span>
                  <span className="text-sm font-black">{money(broker.min_deposit)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-sm text-slate-500">المنصات</span>
                  <span className="text-sm font-black">{shortPlatforms(broker.platforms)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-sm text-slate-500">التراخيص</span>
                  <span className="text-sm font-black">{shortReg(broker.regulation)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-sm text-slate-500">مناسب لـ</span>
                  <span className="text-sm font-black">{broker.best_for || "فئات متعددة"}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href={`/brokers/${broker.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
                >
                  اقرأ التقييم
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
                >
                  قارن الآن
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROGRAMMATIC SEO - COUNTRIES */}
<section className="border-y border-slate-200 bg-white py-8 sm:py-12">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* HEADER */}
    <div className="mb-6 sm:mb-8">
      <div className="text-xs font-bold text-[#1d4ed8] sm:text-sm">
        صفحات الدول
      </div>

      <h2 className="mt-2 text-[22px] font-black leading-[1.2] text-[#0f172a] sm:text-4xl">
        أفضل شركات الفوركس حسب الدولة
      </h2>

      {/* MOBILE TEXT */}
      <p className="mt-3 text-sm leading-7 text-slate-600 sm:hidden">
        صفحات تساعدك على الوصول إلى أفضل شركات الفوركس المناسبة لبلدك من حيث
        الحساب الإسلامي والإيداع والمنصات.
      </p>

      {/* DESKTOP TEXT */}
      <p className="mt-4 hidden text-base leading-8 text-slate-600 sm:block">
        تختلف احتياجات المتداولين من دولة إلى أخرى، لذلك قمنا بإنشاء صفحات
        مخصصة تساعدك على الوصول إلى أفضل شركات التداول المناسبة في بلدك.
        ستجد في هذه الصفحات معلومات واضحة عن الوسطاء المتاحين في السعودية،
        الإمارات، الكويت، مصر وغيرها، مع التركيز على عوامل مهمة مثل الحساب
        الإسلامي، الحد الأدنى للإيداع، المنصات، وسهولة اختيار الوسيط المناسب.
      </p>
    </div>

    {/* MOBILE LIST */}
    <div className="space-y-3 md:hidden">
      {countryPages.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block rounded-[16px] border border-slate-200 bg-[#f8fbff] px-4 py-3 transition active:scale-[0.99]"
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

    {/* DESKTOP GRID (UNCHANGED) */}
    <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
      {countryPages.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-6 transition hover:border-blue-300 hover:bg-white hover:shadow-sm"
        >
          <h3 className="text-xl font-black text-[#0f172a]">{item.title}</h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {item.desc}
          </p>

          <div className="mt-4 text-sm font-extrabold text-[#1d4ed8]">
            افتح الصفحة
          </div>
        </Link>
      ))}
    </div>

  </div>
</section>

     {/* COMPARISONS */}
<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-8">
    <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="text-xs font-bold text-[#1d4ed8] sm:text-sm">
          مقارنات سريعة
        </div>

        <h2 className="mt-2 text-[22px] font-black leading-[1.2] text-[#0f172a] sm:text-3xl">
          أشهر مقارنات شركات الفوركس
        </h2>
      </div>

      <Link
        href="/compare"
        className="inline-flex w-fit items-center text-sm font-bold text-[#1d4ed8] hover:text-[#1d4ed8]"
      >
        تصفح صفحة المقارنات
      </Link>
    </div>

    {/* MOBILE - show only 3 */}
    <div className="grid gap-3 md:hidden">
      {comparisons.slice(0, 3).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-[18px] border border-slate-200 bg-[#f8fbff] p-4 transition active:scale-[0.99]"
        >
          <div className="text-lg font-black leading-7 text-[#0f172a] group-hover:text-[#1d4ed8]">
            {item.title}
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {item.desc}
          </p>

          <div className="mt-3 text-sm font-extrabold text-[#1d4ed8]">
            اقرأ المقارنة
          </div>
        </Link>
      ))}
    </div>

    {/* DESKTOP - show all */}
    <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
      {comparisons.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-blue-300 hover:bg-white hover:shadow-sm"
        >
          <div className="text-lg font-black text-[#0f172a] group-hover:text-[#1d4ed8]">
            {item.title}
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>

          <div className="mt-4 text-sm font-extrabold text-[#1d4ed8]">
            اقرأ المقارنة
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* LONG SEO CONTENT */}
<section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
    <div className="text-sm font-bold text-[#1d4ed8]">دليل اختياري</div>

    <h2 className="mt-2 text-3xl font-black sm:text-4xl">
      كيف تختار أفضل شركة تداول مناسبة لك؟
    </h2>

    {/* MOBILE VERSION */}
    <div className="mt-6 sm:hidden text-sm leading-7 text-slate-600">

      <p>
        اختيار أفضل شركة تداول لا يعتمد فقط على شهرة الاسم أو كثرة الإعلانات،
        بل على التراخيص، أنواع الحسابات، المنصات، وسهولة الإيداع والسحب.
      </p>

      <details className="mt-4">
        <summary className="cursor-pointer font-extrabold text-[#1d4ed8]">
          اقرأ الدليل الكامل
        </summary>

        <div className="mt-4 space-y-5">

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

    {/* DESKTOP VERSION */}
    <div className="mt-6 hidden space-y-6 text-base leading-9 text-slate-600 sm:block">

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
</section>

      {/* WHY US */}
<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="mb-6 sm:mb-8">
    <div className="text-xs font-bold text-[#1d4ed8] sm:text-sm">
      لماذا بروكر العرب؟
    </div>

    <h2 className="mt-2 text-[22px] font-black leading-[1.2] text-[#0f172a] sm:text-4xl">
      منصة تساعد المتداول العربي على اختيار شركة التداول بثقة
    </h2>

    {/* MOBILE TEXT */}
    <p className="mt-3 text-sm leading-7 text-slate-600 sm:hidden">
      نساعد المتداول العربي على فهم الفروقات الحقيقية بين شركات التداول عبر
      مراجعات واضحة، مقارنات مباشرة، وتركيز على ما يهم المستخدم في المنطقة.
    </p>

    {/* DESKTOP TEXT */}
    <p className="mt-4 hidden text-base leading-8 text-slate-600 sm:block">
      هدفنا في بروكر العرب هو تقديم مراجعات ومقارنات واضحة تساعد المتداول
      العربي على فهم الفروقات الحقيقية بين شركات التداول قبل فتح الحساب.
      لذلك لا نعتمد على قوائم قصيرة أو توصيات عامة، بل نبني صفحات تقييم
      مفصلة ومقارنات مباشرة بين الوسطاء توضح التراخيص والحسابات والرسوم
      والمنصات، مما يجعل عملية اختيار شركة التداول أسهل وأكثر وضوحًا.
    </p>
  </div>

  {/* MOBILE VERSION */}
  <div className="space-y-3 sm:hidden">
    {[
      {
        title: "مراجعات منظمة",
        desc: "صفحات مستقلة توضح الحسابات، التراخيص، الرسوم والخلاصة النهائية.",
      },
      {
        title: "مقارنات عملية",
        desc: "مقارنات مباشرة توضح الفروق الحقيقية بين الوسطاء بسرعة.",
      },
      {
        title: "تركيز على المتداول العربي",
        desc: "اهتمام بالحساب الإسلامي، الدعم العربي، والإيداع المناسب.",
      },
      {
        title: "بنية قابلة للتوسع",
        desc: "ربط كل شركة بصفحات مقارنة ودول وفئات بشكل منظم.",
      },
    ].map((item, index) => (
      <div
        key={item.title}
        className="flex items-start gap-3 rounded-[16px] border border-slate-200 bg-white px-4 py-4 shadow-sm"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-xs font-black text-[#1d4ed8]">
          {index + 1}
        </div>

        <div>
          <h3 className="text-base font-black text-[#0f172a]">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {item.desc}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* DESKTOP VERSION - unchanged */}
  <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4 sm:hidden"></div>
  <div className="hidden sm:grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
    ].map((item) => (
      <div
        key={item.title}
        className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h3 className="text-xl font-black text-[#0f172a]">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

      {/* FAQ */}
<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-8">
    <div className="mb-6 sm:mb-8">
      <div className="text-xs font-bold text-[#1d4ed8] sm:text-sm">
        الأسئلة الشائعة
      </div>

      <h2 className="mt-2 text-[22px] font-black leading-[1.2] text-[#0f172a] sm:text-3xl">
        أسئلة مهمة قبل اختيار شركة التداول
      </h2>
    </div>

    {/* MOBILE VERSION */}
    <div className="space-y-3 sm:hidden">
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
            <p className="text-sm leading-7 text-slate-600">
              {item.a}
            </p>
          </div>
        </details>
      ))}
    </div>

    {/* DESKTOP VERSION */}
    <div className="hidden space-y-4 sm:block">
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
          className="group rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5 open:bg-white"
        >
          <summary className="cursor-pointer list-none text-lg font-black text-[#0f172a]">
            {item.q}
          </summary>
          <p className="mt-3 text-sm leading-8 text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  </div>
</section>
    </main>
  );
}