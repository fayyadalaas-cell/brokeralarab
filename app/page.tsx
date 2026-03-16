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
            <div dir="ltr" className="grid items-center gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
              {/* LEFT PANEL */}
              <div dir="rtl" className="relative">
                <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(10,18,32,0.94))] p-5 shadow-[0_25px_60px_rgba(2,8,23,0.45)] backdrop-blur-xl">
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

                  <div className="relative z-10 mt-4 space-y-2.5">
                    {heroBrokers.map((broker) => (
                      <div
                        key={broker.id}
                        className="group rounded-[20px] border border-white/10 bg-white/[0.04] px-3 py-3 transition duration-200 hover:border-blue-400/30 hover:bg-white/[0.06]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white px-2 shadow-sm">
                            {broker.logo ? (
                              <img
                                src={broker.logo}
                                alt={broker.name}
                                className="max-h-8 w-full object-contain"
                              />
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400">
                                Logo
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  
                                  <h3 className="truncate text-[18px] font-black text-white">
                                    {broker.name}
                                  </h3>
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
                  
                  <h1 className="mt-0 text-[58px] font-black leading-[1.08] tracking-[-0.03em] text-white xl:text-[72px]">
                    قارن الوسطاء بثقة
                    <span className="mt-3 block bg-[linear-gradient(90deg,#93c5fd_0%,#60a5fa_25%,#3b82f6_58%,#93c5fd_100%)] bg-clip-text text-transparent">
                      واختر الأنسب لتجربتك
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
                <h1 className="mt-3 max-w-4xl text-[30px] font-black leading-[1.2] tracking-[-0.03em] text-white sm:text-[46px]">
                  قارن الوسطاء بثقة
                  <span className="mt-2 block bg-[linear-gradient(90deg,#60a5fa_0%,#3b82f6_45%,#93c5fd_100%)] bg-clip-text text-transparent">
                    واختر الأنسب لتجربتك
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
  className="scroll-mt-24 mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8"
>
  <BrokerFinder brokers={brokers} />
</section>

     {/* HOW WE RATE - PREMIUM STEPS */}
<section className="mx-auto max-w-7xl px-4 pt-3 pb-2 sm:px-6 sm:pt-4 sm:pb-3 lg:px-8">
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
            <div className="border-b border-slate-200 px-4 py-5 sm:px-6">
              

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-[24px] font-black leading-[1.15] text-[#0f172a] sm:text-[30px]">
                    كيف نقيّم شركات التداول؟
                  </h2>

                  <p className="mt-2 max-w-2xl text-[13px] leading-6 text-slate-600 sm:text-[14px]">
                    نراجع كل وسيط بناءً على عوامل عملية تؤثر فعلًا على تجربة
                    المتداول العربي.
                  </p>
                </div>

               <div className="mt-4 flex justify-center sm:mt-0">
  <Link
    href="/brokers"
    className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#2563eb] px-4 text-[12px] font-extrabold text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)] transition hover:bg-[#1d4ed8]"
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
                    className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-white px-3 py-3.5 shadow-sm"
                  >
                    <div className="absolute right-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_100%)] opacity-75" />

                    <div className="flex items-center gap-2">
  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563eb] text-[10px] font-black text-white">
    {item.num}
  </span>

  <h3 className="text-[13px] font-black leading-5 text-[#0f172a]">
    {item.title}
  </h3>
</div>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-600">
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
<section className="mx-auto max-w-7xl px-4 pt-4 pb-6 sm:px-6 sm:pt-5 sm:pb-8 lg:px-8">
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