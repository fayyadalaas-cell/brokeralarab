import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinder from "@/app/components/BrokerFinder";

export const metadata: Metadata = {
  title: "أفضل شركات التداول وتقييم الوسطاء | بروكر العرب",
  description:
    "أفضل شركات التداول: تقييم شامل ومقارنة بين الوسطاء من حيث التراخيص، الرسوم، والمنصات لمساعدتك في اختيار الوسيط المناسب بثقة.",
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
  languages: {
    ar: "https://brokeralarab.com",
    en: "https://brokeralarab.com/en",
    "x-default": "https://brokeralarab.com/en",
  },
},
openGraph: {
  title: "أفضل شركات التداول وتقييم الوسطاء | بروكر العرب",
  description:
    "أفضل شركات التداول: تقييم شامل ومقارنة بين الوسطاء من حيث التراخيص، الرسوم، والمنصات لمساعدتك في اختيار الوسيط المناسب بثقة.",
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

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select(`
      id,
      name,
      slug,
      rating,
      min_deposit,
      platforms,
      regulation,
      regulation_short,
      best_for,
      logo,
      islamic_account,
      arabic_support
    `)
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
  {(() => {
    const allHeroBrokers = Array.from(
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
      .map((b) => ({
        id: b.id,
        name: b.name || "شركة تداول",
        slug: b.slug || "",
        rating: b.rating ? Number(b.rating).toFixed(1) : "—",
        logo: b.logo || null,
      }));

    const marquee = [
  ...allHeroBrokers.map((b) => ({ ...b, duplicate: false })),
  ...allHeroBrokers.map((b) => ({ ...b, duplicate: true })),
  ...allHeroBrokers.map((b) => ({ ...b, duplicate: true })),
];

    return (
      <>
        {/* DESKTOP ONLY */}
        <div className="hidden lg:block">
          <style>{`
            @keyframes brokerMarquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>

          <div className="relative overflow-hidden bg-[#07111f]">
           {/* BACKGROUND */}
<div className="pointer-events-none absolute inset-0">
  <div className="absolute left-1/2 top-[46%] h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563eb]/20 blur-[120px]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.34),transparent_42%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_55%,rgba(14,165,233,0.12),transparent_34%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_45%,rgba(59,130,246,0.11),transparent_30%)]" />
              <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:58px_58px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07111f]/10 to-[#07111f]/75" />
            </div>

            {/* HERO CONTENT */}
            <div className="relative mx-auto max-w-7xl px-6 py-12 xl:py-14">
              <div dir="rtl" className="mx-auto max-w-6xl text-center">
                <h1 className="mx-auto max-w-6xl text-[50px] font-black leading-[1.22] tracking-[-0.025em] text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.35)] xl:text-[62px]">
                  أفضل شركات التداول
                  <span className="block bg-gradient-to-r from-white via-blue-200 to-[#60a5fa] bg-clip-text pb-2 text-transparent">
                    تقييم الوسطاء والرسوم والتراخيص
                  </span>
                </h1>

                <p className="mx-auto mt-3 max-w-3xl text-[17px] leading-8 text-slate-300">
                  قارن بين أفضل شركات التداول من حيث التراخيص، الرسوم، السبريد،
                  المنصات، وأنواع الحسابات لاختيار وسيط تداول موثوق يناسب احتياجاتك بثقة.
                </p>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <a
                    href="#finder"
                    className="rounded-full bg-white px-8 py-3.5 text-[15px] font-black text-[#07111f] shadow-[0_18px_60px_rgba(37,99,235,0.30)] transition hover:-translate-y-0.5 hover:bg-slate-100"
                  >
                    ابحث عن أفضل وسيط
                  </a>

                  <Link
                    href="/compare"
                    className="rounded-full border border-white/20 bg-white/[0.06] px-8 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    تصفح المقارنات
                  </Link>
                </div>
              </div>
            </div>

            {/* LOGO STRIP */}
            <div className="relative z-10 border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]" dir="ltr">
              <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-28 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-28 bg-gradient-to-l from-white to-transparent" />

              <div className="overflow-hidden">
                <div className="flex w-max [animation:brokerMarquee_150s_linear_infinite] hover:[animation-play-state:paused]">
                  {marquee.map((broker, index) => (
                    <Link
  key={`broker-${broker.id}-${index}`}
  href={`/brokers/${broker.slug}`}
  aria-hidden={"duplicate" in broker && broker.duplicate ? "true" : undefined}
  tabIndex={"duplicate" in broker && broker.duplicate ? -1 : undefined}
  className="group flex h-[92px] w-[300px] shrink-0 items-center justify-center border-r border-slate-100 bg-transparent px-6 transition duration-300 hover:bg-white hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)]"
>
                      <div className="flex w-full items-center justify-center gap-4" dir="rtl">
                        {/* LOGO - RIGHT */}
                       <div className="flex h-[68px] w-[94px] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
  {broker.logo ? (
    <img
      src={broker.logo}
      alt={broker.name}
      className="max-h-[60px] max-w-[92px] object-contain transition duration-300 group-hover:scale-[1.08]"
    />
  ) : (
                            <span className="text-sm font-bold text-slate-900">
                              {broker.name.slice(0, 2)}
                            </span>
                          )}
                        </div>

                        {/* TEXT - LEFT */}
                        <div className="min-w-0 text-right">
                          <div className="max-w-[170px] truncate text-[16px] font-black text-slate-950">
                            {broker.name}
                          </div>
                          <div className="mt-1 text-[12px] font-semibold text-slate-500">
                            التقييم {broker.rating}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE - PREMIUM */}
<div className="lg:hidden">
  <style>{`
    @keyframes brokerMarqueeMobile {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `}</style>

  <div className="relative overflow-hidden bg-[#07111f]">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.34),transparent_46%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_55%,rgba(14,165,233,0.12),transparent_38%)]" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07111f]/10 to-[#07111f]/80" />
    </div>

    <div dir="rtl" className="relative px-5 pb-7 pt-7 text-center">
      <div className="mx-auto max-w-[330px] text-[31px] font-black leading-[1.16] tracking-[-0.025em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
  أفضل شركات التداول
  <span className="mt-1 block bg-gradient-to-r from-white via-blue-200 to-[#60a5fa] bg-clip-text pb-1 text-transparent">
    تقييم الوسطاء والرسوم
  </span>
</div>

      <p className="mx-auto mt-4 max-w-[310px] text-[13px] font-semibold leading-7 text-slate-300">
  قارن التراخيص، الرسوم، السبريد والمنصات لاختيار وسيط تداول موثوق يناسبك.
</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <a
          href="#finder"
          className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-white px-4 py-3 text-[13px] font-black text-[#07111f] shadow-[0_14px_34px_rgba(59,130,246,0.25)]"
        >
          ابحث عن وسيط
        </a>

        <Link
          href="/compare"
          className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-[13px] font-black text-white backdrop-blur"
        >
          تصفح المقارنات
        </Link>
      </div>
    </div>

    <div className="relative z-10 border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]" dir="ltr">
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-14 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-14 bg-gradient-to-l from-white to-transparent" />

      <div className="overflow-hidden">
        <div className="flex w-max [animation:brokerMarqueeMobile_120s_linear_infinite]">
          {marquee.map((broker, index) => (
            <Link
  key={`mobile-broker-${broker.id}-${index}`}
  href={`/brokers/${broker.slug}`}
  aria-hidden={"duplicate" in broker && broker.duplicate ? "true" : undefined}
  tabIndex={"duplicate" in broker && broker.duplicate ? -1 : undefined}
  className="flex h-[78px] w-[210px] shrink-0 items-center justify-center border-r border-slate-100 bg-white px-4"
>
              <div className="flex w-full items-center justify-center gap-3" dir="rtl">
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                  {broker.logo ? (
                    <img
                      src={broker.logo}
                      alt={broker.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-slate-900">
                      {broker.name.slice(0, 2)}
                    </span>
                  )}
                </div>

                <div className="min-w-0 text-right">
                  <div className="max-w-[120px] truncate text-[13px] font-black text-slate-950">
                    {broker.name}
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold text-slate-500">
                    التقييم {broker.rating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
  className="scroll-mt-24 mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4"
>
  <BrokerFinder brokers={brokers} />
</section>

    {/* HOW WE RATE - CLEAN TRUST SECTION */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {(() => {
      const ratingItems = [
        {
          num: "01",
          title: "الترخيص وحماية الأموال",
          desc: "نفحص الجهة الرقابية وقوة الترخيص ووضوح حماية أموال العملاء.",
        },
        {
          num: "02",
          title: "الرسوم والسبريد",
          desc: "نقارن السبريد، العمولات، وتكلفة التداول الفعلية.",
        },
        {
          num: "03",
          title: "المنصات والتنفيذ",
          desc: "نراجع MT4 وMT5 وسهولة الاستخدام وسرعة التنفيذ.",
        },
        {
          num: "04",
          title: "الإيداع والسحب",
          desc: "نقارن طرق الدفع، سرعة السحب، ووضوح الشروط.",
        },
        {
          num: "05",
          title: "الحساب الإسلامي",
          desc: "نتحقق من توفر الحساب الإسلامي وطريقة تطبيقه.",
        },
        {
          num: "06",
          title: "الدعم وتجربة المستخدم",
          desc: "نراجع جودة الدعم وسهولة الوصول للمعلومات.",
        },
      ];

      return (
        <>
          {/* DESKTOP */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[1fr_270px] gap-5 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-5">
              <div>
                <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
                  منهجية التقييم
                </span>

                <h2 className="mt-4 text-[36px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f]">
                  كيف نختار أفضل شركات التداول؟
                </h2>

                <p className="mt-3 max-w-3xl text-[15px] font-semibold leading-9 text-slate-600">
                نراجع تقييم شركات التداول بناءً على قوة التراخيص، الرسوم والسبريد، سرعة السحب والإيداع، جودة المنصات، الحساب الإسلامي، وتجربة المتداول الفعلية قبل ترشيح أي وسيط تداول موثوق.
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                
                <div className="mt-1.5 text-[18px] font-black leading-6 text-[#07111f]">
                  تقييم عملي لاختيار وسيط تداول موثوق
                </div>

                <Link
                  href="/brokers"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:bg-[#1d4ed8]"
                >
                  تصفح جميع التقييمات
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-5">
              {ratingItems.map((item) => (
                <div
                  key={item.num}
                  className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eff6ff] text-[12px] font-black text-[#1d4ed8] ring-1 ring-[#bfdbfe]">
                      {item.num}
                    </span>

                    <div>
                      <h3 className="text-[18px] font-black leading-6 text-[#07111f]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            <div className="border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] to-[#eef5ff] px-4 py-4 text-center">
           

              <h2 className="mx-auto mt-3 max-w-[300px] text-[24px] font-black leading-[1.2] tracking-[-0.02em] text-[#07111f]">
                كيف نختار أفضل شركات التداول؟
              </h2>

              <p className="mx-auto mt-2 max-w-[300px] text-[12px] font-semibold leading-6 text-slate-600">
                نراجع التراخيص، الرسوم، المنصات، السحب والحساب الإسلامي قبل ترشيح أي وسيط.
              </p>

              <Link
                href="/brokers"
                className="mt-3 inline-flex h-9 items-center justify-center rounded-2xl bg-[#2563eb] px-4 text-[11px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)]"
              >
                جميع التقييمات
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-2 bg-white p-3.5">
              {ratingItems.map((item) => (
                <div
                  key={item.num}
                  className="rounded-[18px] border border-slate-200 bg-[#fbfdff] px-3.5 py-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[10px] font-black text-[#1d4ed8] ring-1 ring-[#bfdbfe]">
                      {item.num}
                    </span>

                    <div>
                      <h3 className="text-[14px] font-black leading-5 text-[#07111f]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* TOP COMPARISONS */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-center lg:text-right">
          <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
            مقارنات الوسطاء
          </span>

          <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
            أشهر مقارنات شركات التداول
          </h2>

          <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
            استعرض أشهر مقارنات شركات التداول بين الوسطاء، وتعرّف على الفروقات في التراخيص، أنواع الحسابات، الرسوم، والمنصات المتاحة مثل MT4 وMT5 لاختيار الوسيط الأنسب لك.
          </p>
        </div>

        <div className="flex justify-center lg:self-center lg:pl-2">
          <Link
            href="/compare"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-[#1d4ed8]"
          >
            تصفح جميع المقارنات
          </Link>
        </div>
      </div>
    </div>

    {/* MOBILE - unchanged */}
    <div className="grid gap-3 p-4 md:hidden">
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
                {`مقارنة ${cmp.broker_1?.name} مع ${cmp.broker_2?.name}`}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* DESKTOP / TABLET */}
    <div className="hidden gap-4 p-5 md:grid md:grid-cols-2 xl:grid-cols-3">
      {topComparisons.map((cmp, index) => (
        <article
          key={cmp.id}
          className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
        >
          <div className="h-1 bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent" />

          <div className="p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">
                #{index + 1} الأكثر مشاهدة
              </span>

              <span className="text-[12px] font-bold text-slate-400">
                {cmp.views_count ?? 0} مشاهدة
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="flex flex-col items-center text-center">
                <Link
                  href={`/brokers/${cmp.broker_1?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_1?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_1?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_1?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50 lg:h-20 lg:w-20"
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
                  className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb] lg:text-[18px]"
                >
                  {cmp.broker_1?.name || "Broker 1"}
                </Link>

                <span className="mt-2 text-[12px] font-bold text-[#f59e0b]">
                  ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
                </span>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[12px] font-extrabold text-blue-600 shadow-sm">
                  VS
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <Link
                  href={`/brokers/${cmp.broker_2?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_2?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_2?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_2?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50 lg:h-20 lg:w-20"
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
                  className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-[#2563eb] lg:text-[18px]"
                >
                  {cmp.broker_2?.name || "Broker 2"}
                </Link>

                <span className="mt-2 text-[12px] font-bold text-[#f59e0b]">
                  ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={`/compare/${cmp.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-[15px] font-extrabold text-white transition hover:bg-[#1d4ed8]"
              >
                {`مقارنة ${cmp.broker_1?.name} مع ${cmp.broker_2?.name}`}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

{/* COUNTRIES DIRECTORY - FINAL */}
<section className="bg-[#f4f7fb] py-3 sm:py-4">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
     {/* HEADER */}
<div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div className="text-center lg:text-right">
      <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
        حسب الدولة
      </span>

      <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
        أفضل شركات التداول حسب الدولة
      </h2>

      <p className="mt-3 text-[14px] font-semibold leading-8 text-slate-600 md:hidden">
        اختر أفضل شركات التداول حسب بلدك، وتعرّف على الوسطاء المناسبين من حيث التراخيص، الحسابات، ووسائل الإيداع والسحب.
      </p>

      <p className="hidden md:block mt-3 max-w-[900px] text-[15px] font-semibold leading-9 text-slate-600">
        استعرض أفضل شركات التداول حسب الدولة، وقارن بين الوسطاء من حيث التراخيص، الحساب الإسلامي، وسائل الإيداع والسحب، وسهولة فتح الحساب. يساعدك هذا القسم على الوصول بسرعة إلى شركات تداول مناسبة لبلدك واحتياجاتك الفعلية.
      </p>
    </div>

    <div className="hidden md:flex shrink-0 justify-center lg:self-center lg:pl-4">
      <Link
        href="/best-brokers"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-[#1d4ed8]"
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
              className="group rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:bg-[#fcfdff] hover:shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
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
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <div className="relative">
      {/* DESKTOP HEADER */}
      <div className="hidden border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4 lg:block">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-right">
            <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
              حسابات منخفضة السبريد
            </span>

            <h2 className="mt-4 text-[36px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f]">
              أقل سبريد فعلي حسب نوع الحساب
            </h2>

            <p className="mt-3 max-w-[860px] text-[15px] font-semibold leading-9 text-slate-600">
              مقارنة سريعة بين أفضل الحسابات حسب التكلفة الفعلية، مع فصل واضح بين حسابات Standard وRaw وECN وCent، حتى تصل بسرعة إلى الحساب الأنسب لأسلوب تداولك.
            </p>
          </div>

          <div className="hidden md:flex shrink-0 justify-center lg:self-center lg:pl-4">
            <Link
  href="/lowest-spread-brokers"
  className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-[#1d4ed8]"
>
  شركات الأقل سبريد
</Link>
          </div>
        </div>
      </div>

      {/* MOBILE HEADER - unchanged */}
      <div className="relative px-4 py-6 sm:hidden">
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

          {/* MOBILE ROWS - unchanged */}
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

      {/* DESKTOP / TABLET ROWS */}
      <div className="hidden p-5 sm:block">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "حسابات Standard",
              desc: "حسابات بسيطة بتكلفة واضحة وبدون تعقيد كبير.",
              tag: "للمبتدئين",
            },
            {
  title: "حسابات السبريد المنخفض",
  desc: "سبريد منخفض مع عمولة منفصلة لتكلفة أدق.",
  tag: "للسكالبينج",
},
{
  title: "حسابات ECN الاحترافية",
  desc: "مناسبة للمتداولين الذين يهتمون بسرعة التنفيذ.",
  tag: "تنفيذ سريع",
},
            {
              title: "حسابات Cent / Micro",
              desc: "مناسبة للتجربة أو البداية برأس مال صغير.",
              tag: "رأس مال صغير",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href="/lowest-spread-brokers#account-types"
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#93c5fd] hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-full flex-col">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent opacity-80" />
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-blue-100 bg-[#eff6ff] px-3 py-1 text-[11px] font-black text-[#2563eb]">
                    {item.tag}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-[#f8fbff] text-[13px] font-black text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white">
  ←
</span>
                </div>

                <h3 className="text-[19px] font-black leading-6 text-[#07111f]">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-[60px] text-[13px] font-medium leading-7 text-slate-600">
                  {item.desc}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[12px] font-bold text-slate-400">
                    قارن الحسابات
                  </span>

                  <span className="inline-flex items-center gap-1 text-[13px] font-black text-[#2563eb] transition group-hover:-translate-x-1">
  عرض التفاصيل
  <span>←</span>
</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* HOW TO CHOOSE A BROKER - PREMIUM SEO SECTION */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
<div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div className="text-center lg:text-right">
      <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
        دليل اختيار الوسيط
      </span>

      <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
        كيف تختار أفضل شركة تداول مناسبة لك؟
      </h2>

      <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
        اختيار أفضل شركة تداول لا يتعلق فقط بالشهرة أو الحملات الإعلانية، بل يعتمد على الترخيص، تكلفة التداول، المنصة، وسهولة الإيداع والسحب. هذا الدليل يساعدك على تقييم الوسيط بطريقة عملية قبل فتح الحساب.
      </p>
    </div>

    <div className="hidden md:flex shrink-0 justify-center lg:self-center lg:pl-4">
      <Link
        href="/best-brokers"
        className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-[#1d4ed8]"
      >
        أفضل الوسطاء
      </Link>
    </div>
  </div>
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
    <div className="hidden p-5 sm:block">
      <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
        {/* ARTICLE */}
        <div className="lg:col-span-8">
          <article className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent opacity-55" />
            <div className="space-y-4 text-[15px] font-medium leading-[2.05] text-slate-600">
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
  اختيار وسيط يقدّم خيارات تناسب أسلوبك وميزانيتك.
</p>

              <p>
  بالنسبة للمتداول العربي، فإن{" "}
  <strong>الحساب الإسلامي</strong>{" "}
  مع توفر{" "}
  <strong>دعم عربي</strong>{" "}
  ومرونة وسائل الإيداع والسحب، تُعد من العوامل المهمة جدًا. وفي بروكر العرب
  نعتمد على هذه المعايير عند مراجعة الوسطاء ومقارنتهم، لذلك ستجد صفحات تقييم
  تساعدك على الوصول إلى الوسيط الأنسب بدل الاعتماد على الإعلانات فقط.
</p>
            </div>
          </article>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
              <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] to-white px-5 py-5">
  <h3 className="text-[22px] font-black leading-[1.45] text-[#07111f]">
                  ما الذي يجب فحصه قبل فتح حساب تداول؟
                </h3>
              </div>

              <div className="px-6 pb-6 pt-5">
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
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-[#bfdbfe] hover:bg-[#fcfdff] hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#eff6ff] text-xs font-black text-[#1d4ed8] transition group-hover:bg-[#2563eb] group-hover:text-white">
                        {index + 1}
                      </span>
                      <span className="text-sm font-bold leading-6 text-[#0f172a]">
                        {item}
                      </span>
                    </div>
                  ))}
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
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="text-center lg:text-right">
        <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
          لماذا بروكر العرب؟
        </span>

        <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
          لماذا يثق المتداولون في بروكر العرب؟
        </h2>

        <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
          نساعد المتداول العربي على اختيار وسيط تداول مناسب من خلال مراجعات واضحة، مقارنات عملية، وتركيز على العوامل التي تهمه فعلًا مثل الترخيص، الرسوم، الحساب الإسلامي، وطرق الإيداع والسحب.
        </p>
      </div>
    </div>

    {/* MOBILE */}
    <div className="grid gap-3 p-4 sm:hidden">
      {[
        {
          title: "مراجعات منظمة وواضحة",
          desc: "نعرض أهم معلومات الشركة في صفحة واحدة حتى تفهم الترخيص والرسوم والحسابات بسرعة.",
        },
        {
          title: "مقارنات تساعدك على القرار",
          desc: "نوضح الفروقات بين الوسطاء بدل أن تضيع وقتك في فتح عدة صفحات ومراجعات متفرقة.",
        },
        {
          title: "تركيز على احتياجات العرب",
          desc: "نهتم بالحساب الإسلامي، الدعم العربي، ووسائل الإيداع والسحب المناسبة للمنطقة.",
        },
        {
          title: "وصول أسرع للوسيط المناسب",
          desc: "نرتب الشركات حسب الدولة ونوع الحساب والمقارنات حتى تصل للخيار الأقرب لاحتياجك.",
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
    <div className="hidden p-5 sm:block">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "مراجعات منظمة وواضحة",
            desc: "نعرض أهم معلومات الشركة في صفحة واحدة: الترخيص، الرسوم، الحسابات، المنصات، وطرق الإيداع والسحب.",
            tag: "تقييمات",
          },
          {
            title: "مقارنات تساعدك على القرار",
            desc: "نوضح الفروقات العملية بين الوسطاء حتى تعرف أي شركة أنسب لك بدل الاعتماد على الانطباع العام.",
            tag: "مقارنات",
          },
          {
            title: "تركيز على احتياجات العرب",
            desc: "نهتم بعوامل مهمة مثل الحساب الإسلامي، الدعم العربي، ومرونة الإيداع والسحب في الدول العربية.",
            tag: "للمنطقة",
          },
          {
            title: "وصول أسرع للخيار المناسب",
            desc: "نرتب الشركات حسب الدولة، نوع الحساب، والرسوم حتى تصل بسرعة إلى الوسيط الأقرب لأسلوبك وميزانيتك.",
            tag: "اختيار أسهل",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#93c5fd] hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-transparent opacity-55" />

            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-blue-100 bg-[#eff6ff] px-3 py-1 text-[11px] font-black text-[#2563eb]">
                {item.tag}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-[#f8fbff] text-[13px] font-black text-[#2563eb] transition group-hover:bg-[#2563eb] group-hover:text-white">
                {index + 1}
              </span>
            </div>

            <h3 className="text-[20px] font-black leading-7 tracking-[-0.02em] text-[#07111f]">
              {item.title}
            </h3>

            <p className="mt-3 min-h-[84px] text-[13px] font-medium leading-7 text-slate-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="text-center lg:text-right">
        <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[12px] font-black text-[#2563eb] shadow-sm">
          الأسئلة الشائعة
        </span>

        <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
          أهم الأسئلة قبل اختيار شركة التداول
        </h2>

        <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
          إجابات مختصرة على أكثر الأسئلة التي يحتاجها المتداول قبل فتح الحساب، من الترخيص والأمان إلى الحد الأدنى للإيداع والمنصات المناسبة.
        </p>
      </div>
    </div>

    {/* MOBILE - unchanged */}
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
    <div className="hidden p-5 sm:block">
      <div className="grid gap-3">
        {[
          {
            q: "ما هي أفضل شركة تداول للمبتدئين؟",
            a: "أفضل شركة تداول للمبتدئين هي الشركة التي توفر ترخيصًا واضحًا، منصة سهلة الاستخدام، حدًا أدنى مناسبًا للإيداع، ورسومًا مفهومة بدون تعقيد.",
          },
          {
            q: "هل شركات التداول آمنة وموثوقة؟",
            a: "الأمان يختلف من شركة إلى أخرى. الشركات الأكثر موثوقية تكون عادة خاضعة لهيئات رقابية معروفة، وتعرض شروطها ورسومها بشكل واضح.",
          },
          {
            q: "ما أقل مبلغ لفتح حساب تداول؟",
            a: "الحد الأدنى لفتح الحساب يختلف حسب الوسيط ونوع الحساب. الأهم هو اختيار حساب يناسب رأس مالك وطريقة تداولك.",
          },
          {
            q: "كيف أعرف أن شركة التداول مرخصة؟",
            a: "يمكنك معرفة ذلك من خلال صفحة التراخيص في موقع الشركة، ثم مراجعة اسم الجهة الرقابية ورقم الترخيص عند الإمكان.",
          },
          {
            q: "ما الفرق بين MT4 وMT5 وأيهما أفضل؟",
            a: "MT4 معروفة ببساطتها وانتشارها، بينما MT5 تقدم أدوات إضافية. الأفضل يعتمد على أسلوبك واحتياجاتك الفعلية.",
          },
        ].map((item, index) => (
          <details
            key={item.q}
            className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:border-[#bfdbfe] hover:bg-[#fcfdff] hover:shadow-[0_14px_32px_rgba(15,23,42,0.05)] open:border-[#93c5fd]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3 text-right">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#eff6ff] text-xs font-black text-[#1d4ed8] transition group-open:bg-[#2563eb] group-open:text-white">
                  {index + 1}
                </span>

                <span className="text-[16px] font-black leading-7 text-[#07111f]">
                  {item.q}
                </span>
              </div>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-[#f8fbff] text-[14px] font-black text-[#2563eb] transition group-open:rotate-180 group-open:bg-[#2563eb] group-open:text-white">
                ▾
              </span>
            </summary>

            <div className="border-t border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#fcfdff_100%)] px-5 py-4">
              <p className="max-w-4xl text-[14px] font-medium leading-8 text-slate-600">
                {item.a}
              </p>
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