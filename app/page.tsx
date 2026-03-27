import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinder from "@/app/components/BrokerFinder";

export const metadata: Metadata = {
  title: "بروكر العرب | تقييم ومقارنة شركات التداول",
  description:
    "منصة عربية لمراجعة وتقييم ومقارنة شركات التداول، مع أدلة تفصيلية ومقارنات وأداة تساعدك على اختيار الوسيط المناسب.",
  keywords: [
    "بروكر العرب",
    "تقييم شركات التداول",
    "مقارنة شركات التداول",
    "شركات الفوركس",
    "أفضل وسيط تداول",
    "شركات تداول موثوقة",
    "مراجعات شركات التداول",
    "مقارنة الوسطاء",
    "الحساب الإسلامي",
    "بروكر العرب",
  ],
  alternates: {
    canonical: "https://brokeralarab.com",
  },
  openGraph: {
  title: "بروكر العرب | تقييم ومقارنة شركات التداول",
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

function getCountryPages() {
  return [
    {
      title: "أفضل شركات التداول في الأردن",
      href: "/best-brokers/jordan",
      desc: "شركات مناسبة للمتداولين في الأردن من حيث الحسابات، التراخيص، والمنصات.",
      shortDesc: "أفضل الوسطاء للمتداول الأردني",
      flag: "/flags/jo.svg",
      badge: "الأردن",
    },
    {
      title: "أفضل شركات التداول في السعودية",
      href: "/best-brokers/saudi-arabia",
      desc: "وسطاء مناسبون للمتداولين في السعودية من حيث الحساب الإسلامي والإيداع والتراخيص.",
      shortDesc: "وسطاء مناسبون للمتداول السعودي",
      flag: "/flags/sa.svg",
      badge: "السعودية",
    },
    {
      title: "أفضل شركات التداول في الكويت",
      href: "/best-brokers/kuwait",
      desc: "اختيار أفضل شركات التداول للمتداول الكويتي بناءً على الحسابات والإيداع والدعم.",
      shortDesc: "أفضل الخيارات في الكويت",
      flag: "/flags/kw.svg",
      badge: "الكويت",
    },
    {
      title: "أفضل شركات التداول في الإمارات",
      href: "/best-brokers/uae",
      desc: "مقارنة أفضل الوسطاء المناسبين للمتداولين في الإمارات من حيث المنصات والرسوم.",
      shortDesc: "أفضل الوسطاء في الإمارات",
      flag: "/flags/ae.svg",
      badge: "الإمارات",
    },
    {
      title: "أفضل شركات التداول في قطر",
      href: "/best-brokers/qatar",
      desc: "مقارنة الوسطاء المناسبين للمتداولين في قطر من حيث التراخيص والحسابات.",
      shortDesc: "خيارات مناسبة في قطر",
      flag: "/flags/qa.svg",
      badge: "قطر",
    },
    {
      title: "أفضل شركات التداول في البحرين",
      href: "/best-brokers/bahrain",
      desc: "شركات تداول مناسبة للمتداول البحريني مع تركيز على الرسوم وطرق الإيداع.",
      shortDesc: "أفضل الوسطاء في البحرين",
      flag: "/flags/bh.svg",
      badge: "البحرين",
    },
    {
      title: "أفضل شركات التداول في عمان",
      href: "/best-brokers/oman",
      desc: "شركات مناسبة للمتداولين في عمان من حيث سهولة البدء والحسابات والمنصات.",
      shortDesc: "وسطاء مناسبون في عمان",
      flag: "/flags/om.svg",
      badge: "عمان",
    },
    {
      title: "أفضل شركات التداول في مصر",
      href: "/best-brokers/egypt",
      desc: "أفضل الوسطاء للمتداول المصري مع تركيز على الإيداع المنخفض والمنصات المناسبة.",
      shortDesc: "أفضل الخيارات في مصر",
      flag: "/flags/eg.svg",
      badge: "مصر",
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

type Comparison = {
  id: number;
  slug: string | null;
  title: string | null;
  views_count: number | null;
  broker_1: {
    name: string | null;
    logo: string | null;
    rating: number | null;
  } | null;
  broker_2: {
    name: string | null;
    logo: string | null;
    rating: number | null;
  } | null;
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("*")
    .order("rating", { ascending: false });

    const { data: comparisonsData } = await supabase
  .from("comparisons")
  .select(`
    id,
    slug,
    title,
    views_count,
    broker_1:broker_1_id (
      name,
      logo,
      rating
    ),
    broker_2:broker_2_id (
      name,
      logo,
      rating
    )
  `)
  .not("slug", "is", null)
  .not("title", "is", null)
  .order("views_count", { ascending: false })
  .limit(3);

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.slug && b.name);
  const topBrokers = brokers.slice(0, 6);
  const topComparisons: Comparison[] = ((comparisonsData ?? []) as any[])
  .map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    views_count: item.views_count,
    broker_1: Array.isArray(item.broker_1) ? item.broker_1[0] ?? null : item.broker_1 ?? null,
    broker_2: Array.isArray(item.broker_2) ? item.broker_2[0] ?? null : item.broker_2 ?? null,
  }))
  .filter((item) => item.slug && item.title && item.broker_1 && item.broker_2);
  const featured = brokers[0] ?? null;
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

{/* HERO - DESKTOP IMPROVED / MOBILE KEEP */}
<section className="relative overflow-hidden border-b border-slate-800 bg-[#07111f]">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_24%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.10),transparent_30%)]" />
    <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#2563eb]/15 blur-3xl" />
    <div className="absolute left-[-80px] bottom-[-100px] h-[260px] w-[260px] rounded-full bg-[#0ea5e9]/10 blur-3xl" />
    <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]" />
  </div>

  {(() => {
    const heroBrokers = Array.from(
      ((brokers || []) as Broker[]).reduce((acc, broker) => {
        if (!broker || !broker.name) return acc;

        const key = String(broker.name).trim().toLowerCase();
        const existing = acc.get(key);

        if (!existing || Number(broker.rating || 0) > Number(existing.rating || 0)) {
          acc.set(key, broker);
        }

        return acc;
      }, new Map<string, Broker>()).values()
    )
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .slice(0, 3)
      .map((b, index) => ({
        id: b.id,
        name: b.name || "Broker",
        slug: b.slug || "",
        rating: b.rating ? Number(b.rating).toFixed(1) : "—",
        deposit:
          b.min_deposit !== null && b.min_deposit !== undefined
            ? money(b.min_deposit)
            : "غير محدد",
        subtitle: b.best_for || "شركة تداول موصى بها",
        logo: b.logo || null,
        rank: index + 1,
      }));

    return (
      <>
        {/* DESKTOP ONLY */}
        <div className="hidden lg:block">
          <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-10">
            <div dir="ltr" className="grid items-stretch gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
              {/* LEFT PANEL */}
              <div dir="rtl" className="relative">
                <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(10,18,32,0.94))] p-5 shadow-[0_25px_60px_rgba(2,8,23,0.45)] backdrop-blur-xl h-full flex flex-col">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
                  <div className="absolute right-[-40px] top-[-40px] h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="absolute left-[-30px] bottom-[-50px] h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[12px] font-extrabold text-blue-300">
                        مقارنة سريعة
                      </div>
                      <h2 className="mt-1 text-[18px] leading-[1.1] font-black tracking-[-0.03em] text-white whitespace-nowrap">
                        مقارنة بين أبرز الوسطاء
                      </h2>
                    </div>

                    <span className="inline-flex items-center whitespace-nowrap rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-200">
                      محدثة باستمرار
                    </span>
                  </div>

                  <div className="relative z-10 mt-6 space-y-4 flex-1">
                    {heroBrokers.map((broker) => (
                      <div
                        key={broker.id}
                        className="group rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-5 transition duration-200 hover:border-blue-400/30 hover:bg-white/[0.06]"
                      >
                        <div className="flex items-center gap-3">
  <Link
    href={`/brokers/${broker.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white p-1 shadow-sm transition hover:scale-[1.03]"
  >
    {broker.logo ? (
      <img
        src={broker.logo}
        alt={broker.name}
        className="h-9 w-9 object-contain"
      />
    ) : (
      <span className="text-[10px] font-bold text-slate-400">
        Logo
      </span>
    )}
  </Link>

  <div className="min-w-0 flex-1">
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/brokers/${broker.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-[18px] font-black text-white transition hover:text-blue-300"
          >
            {broker.name}
          </Link>
        </div>

        <p className="mt-1 truncate text-[13px] font-medium text-slate-400">
          {broker.subtitle}
        </p>
      </div>

      <div className="shrink-0 text-left">
        <div className="text-[11px] font-bold text-slate-400">
          التقييم
        </div>
        <div className="mt-1 text-[22px] font-black leading-none text-white">
          {broker.rating}
        </div>
      </div>
    </div>
  </div>
</div>

                        
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 mt-5 grid grid-cols-2 gap-3">
                    <Link
  href="/compare"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 text-[14px] font-extrabold text-white transition hover:bg-white/10"
>
                      تصفح المقارنات
                    </Link>

                    <Link
  href="/best-brokers"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#2563eb] px-4 text-[14px] font-extrabold text-white shadow-[0_16px_35px_rgba(37,99,235,0.26)] transition hover:bg-[#1d4ed8] whitespace-nowrap"
>
                      اعرض أفضل الخيارات
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div dir="rtl" className="text-center xl:text-right">
                <div className="mx-auto max-w-[760px] xl:mr-0 xl:ml-auto">
                  
                  <h1 className="mt-0 text-[58px] font-black leading-[1.30] tracking-[-0.03em] text-white xl:text-[72px]">
  بروكر العرب
  <span className="mt-3 block bg-[linear-gradient(90deg,#93c5fd_0%,#60a5fa_25%,#3b82f6_58%,#93c5fd_100%)] bg-clip-text text-transparent">
    أفضل موقع لتقييم ومقارنة شركات التداول
  </span>
</h1>

                  <p className="mx-auto mt-6 max-w-[760px] text-[19px] leading-9 text-slate-300 xl:mr-0 xl:ml-auto">
                    راجع التراخيص والرسوم والمنصات وأنواع الحسابات في مكان واحد
                    بشكل واضح وعملي، ثم اختر شركة التداول الأقرب لاحتياجاتك
                    الفعلية بدلًا من الاعتماد على الإعلانات أو التأثر بالاختيار
                    العشوائي.
                  </p>

                  <div className="mt-8 flex items-center justify-start gap-4">
                    <a
                      href="#finder"
                      className="inline-flex min-h-[60px] min-w-[240px] items-center justify-center rounded-2xl bg-[#2563eb] px-7 py-3 text-[15px] font-extrabold text-white shadow-[0_22px_50px_rgba(37,99,235,0.34)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
                    >
                      ابدأ المقارنة السريعة
                    </a>

                    <Link
  href="/compare"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex min-h-[60px] min-w-[210px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-3 text-[15px] font-extrabold text-white backdrop-blur transition duration-200 hover:bg-white/10"
>
  تصفح المقارنات
</Link>
                  </div>

                
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE - KEEP AS IS */}
        <div className="lg:hidden">
          <div className="relative mx-auto max-w-7xl px-4 pt-2 pb-6 sm:px-6">
            <div className="grid items-center gap-10">
              <div className="order-1">
                <h1 className="mt-3 max-w-4xl text-[30px] font-black leading-[1.3] tracking-[-0.02em] text-white sm:text-[46px]">
  بروكر العرب
  <span className="mt-2 block bg-[linear-gradient(90deg,#60a5fa_0%,#3b82f6_45%,#93c5fd_100%)] bg-clip-text text-transparent">
    أفضل موقع لتقييم ومقارنة شركات التداول
  </span>
</h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-300 sm:text-[17px] sm:leading-8">
                  راجع التراخيص والرسوم والمنصات وأنواع الحسابات في مكان واحد، ثم
                  اعثر على شركة التداول الأقرب لاحتياجاتك الفعلية بدلًا من الاختيار
                  العشوائي أو التأثر بالإعلانات.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#finder"
                    className="inline-flex min-h-[56px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_40px_rgba(37,99,235,0.26)] transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] sm:min-w-[220px]"
                  >
                    ابدأ مقارنة الوسطاء
                  </a>

                  <Link
                    href="/best-brokers"
                    className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15 sm:min-w-[200px]"
                  >
                    تصفح أفضل الوسطاء
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  })()}
</section>

      {/* FINDER */}
<section
  id="finder"
  className="scroll-mt-24 mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6"
>
  <BrokerFinder brokers={brokers} />
</section>

     {/* HOW WE RATE - PREMIUM STEPS */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-sm sm:rounded-[32px]">
    {(() => {
      const ratingItems = [
        {
          num: "01",
          title: "التراخيص والتنظيم",
          desc: "نفحص الجهة الرقابية، قوة الترخيص، ومستوى حماية أموال العملاء.",
        },
        {
          num: "02",
          title: "الحسابات والرسوم",
          desc: "نراجع السبريد، العمولات، وأنواع الحسابات الفعلية لا الوعود التسويقية.",
        },
        {
          num: "03",
          title: "المنصات والأدوات",
          desc: "نقيم MT4 وMT5 وسهولة الاستخدام والأدوات المناسبة للتداول اليومي.",
        },
        {
          num: "04",
          title: "الإيداع والسحب",
          desc: "نقارن طرق الدفع، سرعة السحب، ووضوح الشروط للمستخدم العربي.",
        },
        {
          num: "05",
          title: "الحساب الإسلامي",
          desc: "نتأكد من توفره فعليًا وطريقة تقديمه وملاءمته العملية.",
        },
        {
          num: "06",
          title: "الدعم وتجربة المستخدم",
          desc: "نراجع جودة الدعم، اللغة العربية، وسهولة الوصول للمعلومات الأساسية.",
        },
      ];

      return (
        <>
          {/* DESKTOP */}
          <div className="hidden lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-0">
            {/* RIGHT INTRO */}
            <div className="border-l border-slate-200 p-7 xl:p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                
                <h2 className="mt-4 text-[34px] font-black leading-[1.1] text-[#0f172a]">
                  كيف نقيّم
                  <span className="mt-1 block text-[#2563eb]">شركات التداول؟</span>
                </h2>

                <p className="mt-4 text-[14px] leading-7 text-slate-600">
                  لا نعتمد على الشعارات التسويقية، بل نقيّم كل وسيط بناءً على
                  عوامل عملية تؤثر فعلًا على تجربة المتداول العربي من البداية
                  حتى السحب والدعم.
                </p>

                <div className="mt-6 flex justify-center">
  <Link
    href="/brokers"
    className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)] transition hover:bg-[#1d4ed8]"
  >
    تصفح جميع التقييمات
  </Link>
</div>
              </div>
            </div>

            {/* LEFT STEPS */}
            <div className="p-6 xl:p-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {ratingItems.map((item) => (
                  <div
                    key={item.num}
                    className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-[0_16px_35px_rgba(15,23,42,0.06)]"
                  >
                    <div className="absolute left-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_100%)] opacity-80" />

                    <div className="flex items-center gap-3">
  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-[12px] font-black text-white">
    {item.num}
  </span>

  <h3 className="text-[18px] font-black text-[#0f172a]">
    {item.title}
  </h3>
</div>

                    <p className="mt-3 text-[13px] leading-6 text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET */}
<div className="lg:hidden">
  <div className="border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
    <div className="flex flex-col items-center text-center sm:items-start sm:text-right">
      <h2 className="text-[28px] font-black leading-[1.15] text-[#0f172a] sm:text-[28px]">
        كيف نقيّم شركات التداول؟
      </h2>

      <p className="mt-2 max-w-2xl text-[13px] font-medium leading-6 text-slate-700 sm:text-[14px] sm:leading-7">
        نراجع كل وسيط بناءً على عوامل عملية تؤثر فعلًا على تجربة
        المتداول العربي.
      </p>

      <div className="mt-3">
        <Link
          href="/brokers"
          className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#2563eb] px-4 text-[12px] font-extrabold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:bg-[#1d4ed8]"
        >
          جميع التقييمات
        </Link>
      </div>
    </div>
  </div>

  <div className="p-4 sm:p-5">
    <div className="grid grid-cols-2 gap-3">
      {ratingItems.map((item) => (
        <div
          key={item.num}
          className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
        >
          <div className="absolute right-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_100%)] opacity-80" />

          <div className="flex items-start gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] text-[10px] font-black text-white">
              {item.num}
            </span>

            <h3 className="text-[13px] font-black leading-5 text-[#0f172a]">
              {item.title}
            </h3>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-slate-700">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>
        </>
      );
    })()}
  </div>
</section>

{/* TOP COMPARISONS */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="mb-4 flex flex-col gap-3 sm:mb-5 md:flex-row md:items-end md:justify-between">
    <div className="text-center md:text-right">
      <h2 className="text-[28px] font-black leading-[1.15] text-[#0f172a] sm:text-[34px] lg:text-[42px]">
        أشهر مقارنات شركات التداول
      </h2>

      <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
        استعرض أكثر المقارنات قراءة بين الوسطاء، واكتشف الفروقات في
        التراخيص والمنصات والرسوم قبل اختيار شركة التداول المناسبة.
      </p>
    </div>

    <div className="flex justify-center md:justify-start">
      <Link
        href="/compare"
        className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50"
      >
        تصفح جميع المقارنات
      </Link>
    </div>
  </div>

  {/* MOBILE */}
  <div className="grid gap-3 md:hidden">
    {topComparisons.map((cmp, index) => (
      <article
        key={cmp.id}
        className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm"
      >
        <div className="h-1 bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent" />

        <div className="p-3.5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
              #{index + 1} الأكثر مشاهدة
            </span>

            <span className="text-[11px] font-bold text-slate-400">
              {cmp.views_count ?? 0} مشاهدة
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="flex flex-col items-center text-center">
  <Link
    href={`/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
    className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-blue-200 hover:bg-blue-50"
  >
    {cmp.broker_1?.logo ? (
      <img
        src={cmp.broker_1.logo}
        alt={cmp.broker_1.name || "Broker 1"}
        className="h-full w-full object-contain"
      />
    ) : (
      <span className="text-[9px] text-slate-400">Logo</span>
    )}
  </Link>

  <Link
    href={`/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
    className="mt-2 text-[15px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb]"
  >
    {cmp.broker_1?.name || "Broker 1"}
  </Link>

  <span className="mt-1 text-[11px] font-bold text-[#f59e0b]">
    ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
  </span>
</div>

            <div className="flex items-center justify-center">
  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[11px] font-extrabold text-blue-600 shadow-sm">
    VS
  </div>
</div>
            <div className="flex flex-col items-center text-center">
  <div className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2">
    {cmp.broker_2?.logo ? (
      <img
        src={cmp.broker_2.logo}
        alt={cmp.broker_2.name || "Broker 2"}
        className="h-full w-full object-contain"
      />
    ) : (
      <span className="text-[9px] text-slate-400">Logo</span>
    )}
  </div>

  <span className="mt-2 text-[15px] font-black leading-none text-[#0f172a]">
    {cmp.broker_2?.name || "Broker 2"}
  </span>

  <span className="mt-1 text-[11px] font-bold text-[#f59e0b]">
    ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
  </span>
</div>
          </div>

         

          <div className="mt-4">
            <Link
  href={`/compare/${cmp.slug}`}
  className="mt-3 flex w-full items-center justify-center rounded-xl bg-[#2563eb] py-2.5 text-[14px] font-bold text-white hover:bg-[#1d4ed8]"
>
  {cmp.title || `مقارنة ${cmp.broker_1?.name} مع ${cmp.broker_2?.name}`}
</Link>
          </div>
        </div>
      </article>
    ))}
  </div>

  {/* DESKTOP / TABLET */}
  <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
    {topComparisons.map((cmp, index) => (
      <article
        key={cmp.id}
        className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)]"
      >
        <div className="h-1 bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent" />

        <div className="p-5 lg:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">
              #{index + 1} الأكثر مشاهدة
            </span>

            <span className="text-[12px] font-bold text-slate-400">
              {cmp.views_count ?? 0} مشاهدة
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-4">
            <div className="flex flex-col items-center text-center">
  <Link
    href={`/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
    className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50 lg:h-24 lg:w-24"
  >
    {cmp.broker_1?.logo ? (
      <img
        src={cmp.broker_1.logo}
        alt={cmp.broker_1.name || "Broker 1"}
        className="h-full w-full object-contain"
      />
    ) : (
      <span className="text-[10px] text-slate-400">Logo</span>
    )}
  </Link>

  <Link
    href={`/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
    className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb] lg:text-[20px]"
  >
    {cmp.broker_1?.name || "Broker 1"}
  </Link>

  <span className="mt-2 text-[12px] font-bold text-[#f59e0b] lg:text-[13px]">
    ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
  </span>
</div>

           <div className="flex items-center justify-center">
  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[13px] font-extrabold text-blue-600 shadow-sm">
    VS
  </div>
</div>
            <div className="flex flex-col items-center text-center">
  <Link
    href={`/brokers/${cmp.broker_2?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_2?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_2?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_2?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
    className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50 lg:h-24 lg:w-24"
  >
    {cmp.broker_2?.logo ? (
      <img
        src={cmp.broker_2.logo}
        alt={cmp.broker_2.name || "Broker 2"}
        className="h-full w-full object-contain"
      />
    ) : (
      <span className="text-[10px] text-slate-400">Logo</span>
    )}
  </Link>

  <Link
    href={`/brokers/${cmp.broker_2?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_2?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_2?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_2?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
    className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb] lg:text-[20px]"
  >
    {cmp.broker_2?.name || "Broker 2"}
  </Link>

  <span className="mt-2 text-[12px] font-bold text-[#f59e0b] lg:text-[13px]">
    ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
  </span>
</div>
          </div>


          <div className="mt-5">
  <Link
  href={`/compare/${cmp.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex w-full min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-[15px] font-extrabold text-white transition hover:bg-[#1d4ed8] lg:min-h-[52px] lg:text-base"
>
    {cmp.title || `مقارنة ${cmp.broker_1?.name} مع ${cmp.broker_2?.name}`}
  </Link>
</div>
        </div>
      </article>
    ))}
  </div>
</section>

{/* COUNTRIES DIRECTORY - FINAL */}
<section className="bg-[#f4f7fb] pt-4 pb-6 sm:pt-5 sm:pb-8">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
      {/* HEADER */}
      <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-5 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl text-center lg:text-right">
            <h2 className="text-[28px] font-black leading-[1.1] tracking-[-0.02em] text-[#0f172a] sm:text-[42px]">
              أفضل شركات التداول
              <span className="text-[#2563eb]"> حسب الدولة</span>
            </h2>

            <p className="hidden md:block mx-auto mt-3 max-w-3xl text-[14px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8 lg:mx-0">
              تختلف التراخيص ووسائل الإيداع وتوفر الحساب الإسلامي وسهولة فتح
              الحساب من دولة إلى أخرى، لذلك أنشأنا صفحات مخصصة تساعدك على
              الوصول بسرعة إلى أفضل الوسطاء المناسبين لبلدك.
            </p>
          </div>

          <div className="hidden md:flex shrink-0 justify-center lg:justify-start">
            <Link
              href="/best-brokers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-extrabold text-[#0f172a] shadow-sm transition hover:border-[#93c5fd] hover:bg-[#eff6ff]"
            >
              كل الدول الأخرى
            </Link>
          </div>
        </div>
      </div>

     {/* MOBILE */}
<div className="p-3 md:hidden">
  <div className="grid grid-cols-2 gap-2.5">
    {countryPages.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        title={`أفضل شركات التداول في ${item.badge}`}
        className="group rounded-[14px] border border-slate-200 bg-white px-2 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-[#bfdbfe] hover:bg-[#f8fbff]"
      >
        <div className="flex flex-col items-center justify-center gap-0.5 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
              <img
                src={item.flag}
                alt={item.badge}
                className="h-5 w-5 rounded-full object-cover"
              />
            </div>

            <h3 className="text-[14px] font-extrabold leading-5 text-[#0f172a]">
              {item.badge}
            </h3>
          </div>

          <span className="text-[13px] text-slate-500 opacity-70 transition group-hover:-translate-x-[2px] group-hover:opacity-100 group-hover:text-[#2563eb]">
            ←
          </span>
        </div>
      </Link>
    ))}

    <Link
      href="/best-brokers"
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-2 group rounded-[14px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-2.5 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:bg-[#eff6ff]"
    >
      <div className="flex flex-col items-center justify-center gap-0.5 text-center">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white shadow-sm">
            🌍
          </div>

          <h3 className="text-[14px] font-extrabold text-[#0f172a]">
            كل الدول الأخرى
          </h3>
        </div>

        <span className="text-[13px] text-slate-500 transition group-hover:-translate-x-[2px] group-hover:text-[#2563eb]">
          ←
        </span>
      </div>
    </Link>
  </div>
</div>

      {/* DESKTOP / TABLET */}
      <div className="hidden p-4 md:block lg:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {countryPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`أفضل شركات التداول في ${item.badge}`}
              className="group rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:bg-[#f8fbff] hover:shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#f8fafc] shadow-sm overflow-hidden">
                  <img
                    src={item.flag}
                    alt={item.badge}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-[18px] font-black text-[#0f172a]">
                      {item.title}
                    </h3>

                    <span className="shrink-0 rounded-full bg-[#eff6ff] px-2 py-0.5 text-[10px] font-extrabold text-[#1d4ed8]">
                      {item.badge}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-[13px] text-slate-500">
                    {item.shortDesc ?? item.desc}
                  </p>
                </div>

                <div className="shrink-0 text-left">
                  <div className="text-[11px] font-bold text-slate-400">
                    افتح الصفحة
                  </div>
                  <div className="mt-1 text-[20px] font-black text-[#2563eb] transition group-hover:translate-x-[-3px]">
                    ←
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <Link
            href="/best-brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="group md:col-span-2 md:mx-auto md:max-w-[520px] rounded-[22px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(37,99,235,0.08)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white shadow-sm">
                🌍
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[18px] font-black text-[#0f172a]">
                  كل الدول الأخرى
                </h3>
                <p className="mt-1 text-[13px] text-slate-500">
                  اختر من الصفحة العامة إذا لم تجد بلدك ضمن القائمة
                </p>
              </div>

              <div className="shrink-0 text-left">
                <div className="text-[11px] font-bold text-[#2563eb]">
                  تصفح الكل
                </div>
                <div className="mt-1 text-[20px] font-black text-[#2563eb] transition group-hover:translate-x-[-3px]">
                  ←
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

{/* LOWEST SPREAD HOME SECTION */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
    <div className="relative px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent_28%)]" />

      <div className="relative">
        {/* HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* RIGHT TITLE */}
          <div className="text-right lg:max-w-4xl">
            <h2 className="text-[28px] font-black leading-[1.15] tracking-[-0.02em] text-slate-950 sm:text-[34px] lg:text-[42px]">
              أقل سبريد فعلي
              <span className="text-[#2563eb]"> حسب نوع الحساب</span>
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
              مقارنة سريعة بين أفضل الحسابات حسب التكلفة الفعلية مع فصل واضح بين
              Standard و Raw و ECN و Cent، حتى تصل بسرعة إلى الحساب الأنسب
              لأسلوب تداولك.
            </p>
          </div>

          {/* LEFT BUTTON */}
          <div className="flex justify-center lg:justify-start">
  <Link
    href="/lowest-spread-brokers"
    className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
  >
    شركات التداول الأقل سبريد
  </Link>
</div>
        </div>

        {/* DESKTOP / TABLET ROWS */}
        <div className="mt-6 hidden w-full sm:block">
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
            {[
              {
                title: "أفضل حسابات Standard",
                suitable: "المبتدئين",
                desc: "حسابات أبسط وبتكلفة واضحة دون تعقيد كبير.",
              },
              {
                title: "أفضل حسابات Raw",
                suitable: "السكالبينج",
                desc: "سبريد أقل مع عمولة منفصلة للباحثين عن تكلفة أدق.",
              },
              {
                title: "أفضل حسابات ECN",
                suitable: "التنفيذ السريع",
                desc: "خيار مناسب للمتداول الذي يهتم بالهيكل الاحترافي.",
              },
              {
                title: "أفضل حسابات Cent / Micro",
                suitable: "رأس المال الصغير",
                desc: "مناسبة للتجربة أو البداية بمبالغ منخفضة.",
              },
            ].map((item, index) => (
              <a
                key={item.title}
                href="/lowest-spread-brokers#account-types"
                className={`block transition hover:bg-blue-50/30 ${
                  index !== 0 ? "border-t border-slate-200" : ""
                }`}
              >
                <div className="grid grid-cols-[1fr_1.2fr_88px] items-center gap-6 px-5 py-4">
                  {/* TITLE - RIGHT */}
                  <div className="min-w-0 text-right">
                    <div className="text-[16px] font-black text-slate-950">
                      {item.title}
                    </div>
                  </div>

                  {/* DESC */}
                  <div className="min-w-0 text-right text-sm leading-7 text-slate-600">
                    
                    {item.desc}
                  </div>

                  {/* ACTION - LEFT */}
                  <div className="flex justify-center">
                    <span className="inline-flex min-w-[68px] items-center justify-center rounded-xl bg-[#2563eb] px-3 py-2 text-[11px] font-extrabold text-white transition hover:bg-[#1d4ed8]">
                      عرض
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* MOBILE ROWS */}
        <div className="mt-6 w-full sm:hidden">
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
            {[
              {
                title: "أفضل حسابات Standard",
                suitable: "المبتدئين",
              },
              {
                title: "أفضل حسابات Raw",
                suitable: "السكالبينج",
              },
              {
                title: "أفضل حسابات ECN",
                suitable: "التنفيذ السريع",
              },
              {
                title: "أفضل حسابات Cent / Micro",
                suitable: "رأس المال الصغير",
              },
            ].map((item, index) => (
              <a
                key={item.title}
                href="/lowest-spread-brokers#account-types"
                className={`block px-4 py-3.5 transition hover:bg-blue-50/30 ${
                  index !== 0 ? "border-t border-slate-200" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
  {/* TITLE */}
  <div className="min-w-0 text-right">
    <div className="text-[14px] font-black text-slate-950">
      {item.title}
    </div>
  </div>

  {/* BUTTON */}
  <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#2563eb] px-4 py-2 text-[11px] font-extrabold text-white">
    عرض
  </span>
</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* HOW TO CHOOSE A BROKER - PREMIUM SEO SECTION */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5 sm:px-8 sm:py-7">
      <h2 className="text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[40px]">
        كيف تختار أفضل شركة تداول مناسبة لك؟
      </h2>

      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
        اختيار أفضل شركة تداول لا يتعلق فقط بالشهرة أو الحملات الإعلانية، بل
        يعتمد على الترخيص وتكلفة التداول والمنصة وتجربة الاستخدام الفعلية،
        لذلك نوضح هنا أهم المعايير التي تساعدك على اختيار الوسيط المناسب بثقة.
      </p>
    </div>

    {/* MOBILE */}
    <div className="px-4 py-4 sm:hidden">
      <div className="rounded-[20px] border border-slate-200 bg-[#f8fbff] p-4">
        <p className="text-sm leading-8 text-slate-600">
          أفضل شركة تداول ليست دائمًا الأكثر شهرة، بل الشركة التي تجمع بين
          الترخيص القوي والرسوم الواضحة والمنصة المناسبة وسهولة الإيداع
          والسحب. لهذا السبب يجب تقييم الوسيط من زاوية عملية قبل فتح الحساب.
        </p>

        <details className="mt-4 overflow-hidden rounded-[18px] border border-slate-200 bg-white">
          <summary className="cursor-pointer list-none px-4 py-3.5 text-center text-sm font-extrabold text-[#1d4ed8]">
            اقرأ المزيد
          </summary>

          <div className="space-y-4 border-t border-slate-200 px-4 py-4 text-sm leading-7 text-slate-600">
            <p>
              أول خطوة عند اختيار شركة التداول هي فحص <strong>الترخيص والتنظيم</strong>.
              وجود جهة رقابية معروفة يعطي مؤشرًا أفضل على التزام الشركة بالمعايير
              والشفافية في التعامل مع أموال العملاء.
            </p>

            <p>
              بعد ذلك تأتي <strong>تكلفة التداول</strong>، والتي لا تعني فقط
              السبريد، بل تشمل العمولات ورسوم التبييت وأي رسوم خفية قد تؤثر
              على النتائج الفعلية.
            </p>

            <p>
              كما يجب الانتباه إلى <strong>المنصة</strong>، سواء كنت تفضل MT4 أو
              MT5 أو تطبيق الهاتف، لأن تجربة الاستخدام وسرعة التنفيذ تؤثر على
              تداولك اليومي بشكل مباشر.
            </p>

            <p>
              بالنسبة للمتداول العربي، فإن <strong>الحساب الإسلامي</strong>،
              ووجود <strong>دعم عربي</strong>، ومرونة وسائل الإيداع والسحب هي
              عوامل مهمة جدًا ولا يجب تجاهلها.
            </p>
          </div>
        </details>
      </div>
    </div>

    {/* DESKTOP */}
    <div className="hidden px-8 py-8 sm:block">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* ARTICLE */}
        <div className="lg:col-span-8">
          <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="space-y-5 text-[16px] leading-9 text-slate-600">
              <p>
                إذا كنت تبحث عن <strong>أفضل شركة تداول</strong>، فمن المهم أن
                تعرف أن القرار لا يجب أن يبنى على شهرة العلامة التجارية فقط،
                بل على عوامل عملية تؤثر مباشرة على أمان أموالك وجودة تنفيذ
                الصفقات وتكلفة التداول مع الوقت. أول هذه العوامل هو
                <strong> الترخيص</strong>، لأن الوسيط الخاضع لجهة رقابية معروفة
                يكون عادة أكثر التزامًا بالشفافية والمعايير التنظيمية.
              </p>

              <p>
                بعد ذلك تأتي <strong>تكلفة التداول الفعلية</strong>. كثير من
                المتداولين يركزون فقط على السبريد، لكن الصورة الكاملة تشمل
                العمولات ورسوم التبييت وأي رسوم إضافية قد لا تظهر بوضوح في
                الإعلانات، لذلك من المهم مقارنة التكلفة الحقيقية لا الأرقام
                التسويقية فقط.
              </p>

              <p>
                كذلك فإن <strong>المنصة</strong> عنصر أساسي عند اختيار الوسيط.
                بعض المتداولين يفضلون MT4 بسبب بساطتها وانتشارها، بينما يفضل
                آخرون MT5 لما توفره من أدوات إضافية. وهناك من يعتمد على تطبيق
                الهاتف بشكل يومي، لذلك تصبح سهولة الاستخدام وسرعة التنفيذ عوامل
                مهمة جدًا.
              </p>

              <p>
                ولا يمكن تجاهل <strong>أنواع الحسابات</strong>. فالمبتدئ قد
                يحتاج إلى حساب بإيداع منخفض وشروط واضحة، بينما يحتاج المتداول
                الأكثر خبرة إلى حساب بسبريد أقل وتنفيذ أسرع. لهذا من الأفضل
                اختيار وسيط يقدّم أكثر من خيار يناسب أسلوبك ورأس مالك.
              </p>

              <p>
                بالنسبة للمتداول العربي، فإن <strong>الحساب الإسلامي</strong>
                ووجود <strong>دعم عربي</strong> ومرونة وسائل الإيداع والسحب
                تبقى من العوامل المهمة جدًا. وفي بروكر العرب نعتمد على هذه
                المعايير عند مراجعة الوسطاء ومقارنتهم، لذلك ستجد صفحات تقييم
                تساعدك على الوصول إلى الوسيط الأنسب بدل الاعتماد على الإعلانات فقط.
              </p>
            </div>
          </article>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[24px] border border-[#dbeafe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-sm">
              <div className="border-b border-[#dbeafe] px-5 py-5">
                <h3 className="text-[24px] font-black leading-[1.25] text-[#0f172a]">
                  ما الذي يجب فحصه قبل فتح الحساب؟
                </h3>
              </div>

              <div className="p-5">
                <div className="space-y-3">
                  {[
                    "قوة الترخيص والتنظيم",
                    "السبريد والعمولات",
                    "نوع المنصة وسهولة الاستخدام",
                    "الإيداع والسحب",
                    "توفر الحساب الإسلامي",
                    "الدعم العربي وخدمة العملاء",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-xs font-black text-[#1d4ed8]">
                        {index + 1}
                      </span>
                      <span className="text-sm font-bold leading-6 text-[#0f172a]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[18px] border border-slate-200 bg-[#f8fbff] px-4 py-4">
                  <p className="text-sm leading-7 text-slate-600">
                    لا تختَر شركة التداول بناءً على الإعلان فقط. افحص الترخيص،
                    الرسوم الفعلية، ونوع الحساب الذي يناسب رأس مالك وأسلوبك في
                    التداول.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</section>

{/* WHY TRUST BROKER AL ARAB */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">

    {/* HEADER */}
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5 sm:px-8 sm:py-6">

      <h2 className="text-[24px] font-black leading-[1.2] text-[#0f172a] sm:text-[36px] lg:text-[42px]">
        لماذا يثق المتداولون في
        <span className="text-[#2563eb]"> بروكر العرب؟</span>
      </h2>

      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        بروكر العرب منصة عربية تساعد المتداول على فهم الفروقات الحقيقية بين
        الوسطاء من حيث التراخيص والرسوم والمنصات وأنواع الحسابات حتى يتخذ
        قراره على أساس واضح.
      </p>

    </div>

    {/* MOBILE */}
    <div className="grid gap-3 p-4 sm:hidden">
      {[
        {
          title: "مراجعات منظمة وواضحة",
          desc: "كل شركة لها صفحة مستقلة تعرض الحسابات والتراخيص والرسوم بشكل مرتب.",
        },
        {
          title: "مقارنات عملية بين الوسطاء",
          desc: "مقارنات مباشرة توضح الفروق الحقيقية بسرعة وسهولة.",
        },
        {
          title: "تركيز على المتداول العربي",
          desc: "اهتمام بالحساب الإسلامي والدعم العربي ووسائل الإيداع.",
        },
        {
          title: "بنية قوية للسيو",
          desc: "ربط صفحات التقييم والمقارنات والدول بطريقة منظمة.",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="rounded-[16px] border border-slate-200 bg-[#f8fbff] px-4 py-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[11px] font-black text-[#1d4ed8]">
              {index + 1}
            </span>

            <h3 className="text-[15px] font-black leading-6 text-[#0f172a]">
              {item.title}
            </h3>
          </div>

          <p className="mt-2 text-[13px] leading-6 text-slate-600">
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
            title: "مراجعات منظمة وواضحة",
desc: "كل شركة لها صفحة مستقلة تعرض الحسابات والمنصات والتراخيص والرسوم بشكل واضح.",
          },
          {
            title: "مقارنات عملية بين الوسطاء",
            desc: "صفحات مقارنة توضح الفروق الفعلية بين الشركات بدل أن يتنقل الزائر بين عدة صفحات.",
          },
          {
            title: "تركيز على المتداول العربي",
            desc: "نهتم بالحساب الإسلامي والدعم العربي ومرونة الإيداع والسحب واحتياجات المنطقة.",
          },
          {
            title: "بنية قوية للسيو والتوسع",
            desc: "ربط صفحات التقييم والمقارنات وصفحات الدول بطريقة منظمة تعزز تجربة المستخدم والسيو.",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="group rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-5 py-5 shadow-sm transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[12px] font-black text-[#1d4ed8]">
                {index + 1}
              </span>

              <div className="min-w-0">
                <h3 className="text-[18px] font-black leading-[1.35] text-[#0f172a]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

{/* FAQ */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-1 sm:pb-3 lg:px-8">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-6 sm:px-8 sm:py-8">
      <div className="inline-flex rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-extrabold text-[#1d4ed8] sm:text-sm">
        الأسئلة الشائعة
      </div>

      <h2 className="mt-3 text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[36px]">
        أهم الأسئلة قبل اختيار شركة التداول
      </h2>

      <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        هذه أكثر الأسئلة التي تدور غالبًا في ذهن المتداول قبل فتح الحساب، ولذلك
        جمعنا أهم الإجابات بشكل مختصر وواضح لمساعدتك على اتخاذ قرار أفضل.
      </p>
    </div>

    {/* MOBILE */}
    <div className="space-y-3 px-4 py-4 sm:hidden">
      {[
        {
          q: "ما هي أفضل شركة تداول للمبتدئين؟",
          a: "أفضل شركة تداول للمبتدئين هي التي تجمع بين ترخيص واضح، منصة سهلة، حد أدنى منخفض للإيداع، ودعم جيد للعملاء. الأفضل ألا تختار بناءً على الشهرة فقط، بل على سهولة الاستخدام ووضوح الرسوم والحساب المناسب لبدايتك.",
        },
        {
          q: "هل شركات التداول آمنة وموثوقة؟",
          a: "ليست كل شركات التداول بنفس مستوى الأمان. الشركة الأكثر موثوقية عادة تكون خاضعة لجهة رقابية معروفة، وتوضح شروطها ورسومها بشكل شفاف، وتوفر آليات واضحة للإيداع والسحب وخدمة العملاء.",
        },
        {
          q: "ما أقل مبلغ لفتح حساب تداول؟",
          a: "الحد الأدنى يختلف من شركة إلى أخرى. بعض الوسطاء يتيحون البدء بمبالغ منخفضة نسبيًا، لكن الأهم من رقم الإيداع هو اختيار حساب يناسب حجم رأس مالك ولا يضعك تحت ضغط تداول أكبر من قدرتك.",
        },
        {
          q: "كيف أعرف أن شركة التداول مرخصة؟",
          a: "يمكن معرفة ذلك من خلال صفحة التراخيص في موقع الشركة، ومراجعة اسم الجهة الرقابية ورقم الترخيص، ثم التحقق منه عند الإمكان. كما أن الشركات الجادة تعرض هذه المعلومات بوضوح ولا تخفيها داخل الشروط.",
        },
        {
          q: "ما الفرق بين MT4 وMT5 وأيهما أفضل؟",
          a: "MT4 منصة مشهورة وبسيطة ويعتمد عليها كثير من المتداولين، بينما MT5 تقدم أدوات إضافية وتحديثات أكثر. الأفضل بينهما يعتمد على أسلوبك واحتياجاتك، لكن وجود منصة مستقرة وسهلة الاستخدام أهم من اسم المنصة وحده.",
        },
      ].map((item, index) => (
        <details
          key={item.q}
          className="group overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8fbff] shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-right">
            <span className="text-[15px] font-black leading-7 text-[#0f172a]">
              {item.q}
            </span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[15px] font-black text-[#1d4ed8] transition group-open:rotate-180">
              ▾
            </span>
          </summary>

          <div className="border-t border-slate-200 bg-white px-4 py-4">
            <p className="text-[13px] leading-7 text-slate-600">{item.a}</p>
          </div>
        </details>
      ))}
    </div>

    {/* DESKTOP */}
    <div className="hidden px-8 py-8 sm:block">
      <div className="grid gap-4">
        {[
          {
            q: "ما هي أفضل شركة تداول للمبتدئين؟",
            a: "أفضل شركة تداول للمبتدئين هي الشركة التي توفر ترخيصًا واضحًا، منصة سهلة الاستخدام، حدًا أدنى مناسبًا للإيداع، ورسومًا مفهومة بدون تعقيد. المبتدئ لا يحتاج فقط إلى وسيط مشهور، بل إلى وسيط يساعده على التعلم والبدء بأمان.",
          },
          {
            q: "هل شركات التداول آمنة وموثوقة؟",
            a: "الأمان يختلف من شركة إلى أخرى. الشركات الأكثر موثوقية تكون عادة خاضعة لهيئات رقابية معروفة، وتعرض شروطها ورسومها بشكل واضح، وتوفر إجراءات منظمة للإيداع والسحب وخدمة العملاء. لذلك يجب فحص الترخيص والسمعة وتجربة الاستخدام الفعلية.",
          },
          {
            q: "ما أقل مبلغ لفتح حساب تداول؟",
            a: "الحد الأدنى لفتح الحساب يختلف حسب الوسيط ونوع الحساب. بعض الشركات تسمح بالبدء بمبالغ منخفضة، لكن الأهم هو ألا تختار الحساب فقط بناءً على الإيداع الأدنى، بل على مدى ملاءمته لرأس مالك وطريقة تداولك.",
          },
          {
            q: "كيف أعرف أن شركة التداول مرخصة؟",
            a: "يمكنك معرفة ذلك من خلال صفحة التراخيص في موقع الشركة، حيث يجب أن يظهر اسم الجهة الرقابية ورقم الترخيص بوضوح. عند الحاجة يمكن التحقق من البيانات عبر الموقع الرسمي للجهة الرقابية، وهذا يمنحك صورة أدق عن مستوى التنظيم والشفافية.",
          },
          {
            q: "ما الفرق بين MT4 وMT5 وأيهما أفضل؟",
            a: "MT4 منصة معروفة ببساطتها وانتشارها الكبير، بينما MT5 تقدم أدوات وتحسينات إضافية ويعتمد عليها كثير من الوسطاء أيضًا. الأفضلية لا تكون دائمًا باسم المنصة فقط، بل بمدى استقرارها وسهولة استخدامها وتوافقها مع احتياجاتك الفعلية.",
          },
        ].map((item) => (
          <details
            key={item.q}
            className="group overflow-hidden rounded-[22px] border border-slate-200 bg-[#f8fbff] shadow-sm open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5">
              <span className="text-lg font-black leading-8 text-[#0f172a]">
                {item.q}
              </span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-lg font-black text-[#1d4ed8] transition group-open:rotate-180">
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