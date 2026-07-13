import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinder from "@/app/components/BrokerFinder";

export const metadata: Metadata = {
  title: "أفضل شركات التداول وتقييم الوسطاء | بروكر العرب",
  description:
  "قارن أفضل شركات التداول لعام 2026 حسب التراخيص، الرسوم، السبريد، أنواع الحسابات، ومنصات التداول. مراجعات مستقلة تساعدك على اختيار الوسيط المناسب بثقة.",
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
  "قارن أفضل شركات التداول لعام 2026 حسب التراخيص، الرسوم، السبريد، أنواع الحسابات، ومنصات التداول. مراجعات مستقلة تساعدك على اختيار الوسيط المناسب بثقة.",
    url: "https://brokeralarab.com",
    siteName: "بروكر العرب",
    type: "website",
    locale: "ar_AR",
    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 377,
        alt: "بروكر العرب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أفضل شركات التداول وتقييم الوسطاء | بروكر العرب",
   description:
  "قارن أفضل شركات التداول لعام 2026 حسب التراخيص، الرسوم، السبريد، أنواع الحسابات، ومنصات التداول. مراجعات مستقلة تساعدك على اختيار الوسيط المناسب بثقة.",
    images: ["https://brokeralarab.com/og-image.png"],
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
  real_account_url: string | null;
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

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const today = todayDate.toISOString().split("T")[0];

  const [
    { data },
    { data: comparisonsData },
    { data: rankingData },
    { data: homeEvents },
  ] = await Promise.all([
    supabase
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
        arabic_support,
        real_account_url
      `)
      .order("rating", { ascending: false }),

    supabase
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
      .limit(3),

    supabase
      .from("country_broker_rankings")
      .select(`
        broker_id,
        rank_position,
        country_rating,
        best_for,
        local_note,
        country_pages (
          slug
        )
      `),

    supabase
      .from("events")
      .select(`
        id,
        slug,
        title_ar,
        excerpt_ar,
        category,
        start_date,
        end_date,
        venue_ar,
        city_ar,
        country_ar,
        status,
        hero_image
      `)
      .eq("status", "upcoming")
      .not("title_ar", "is", null)
      .not("slug", "is", null)
      .gte("end_date", today)
      .order("start_date", { ascending: true })
      .limit(3),
  ]);

  const brokers = ((data ?? []) as Broker[]).filter(
    (broker) => broker.slug && broker.name
  );

  const countryRankings = ((rankingData ?? []) as any[])
    .map((row) => ({
      country_slug: Array.isArray(row.country_pages)
        ? row.country_pages[0]?.slug
        : row.country_pages?.slug,
      broker_id: row.broker_id,
      rank_position: row.rank_position,
      country_rating: row.country_rating,
      best_for: row.best_for,
      local_note: row.local_note,
    }))
    .filter((row) => row.country_slug);

  const topBrokers = brokers.slice(0, 6);

  const footerFeaturedBrokers = brokers
    .filter((broker) => broker.logo && broker.slug && broker.name)
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 5);

  const topComparisons: Comparison[] = ((comparisonsData ?? []) as any[])
    .map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      views_count: item.views_count,
      broker_1: Array.isArray(item.broker_1)
        ? item.broker_1[0] ?? null
        : item.broker_1 ?? null,
      broker_2: Array.isArray(item.broker_2)
        ? item.broker_2[0] ?? null
        : item.broker_2 ?? null,
    }))
    .filter(
      (item) =>
        item.slug &&
        item.title &&
        item.broker_1 &&
        item.broker_2
    );

  const featured = brokers[0] ?? null;
  const countryPages = getCountryPages();
  const typePages = getTypePages();
  const eventList = homeEvents || [];

function formatEventDate(start?: string | null, end?: string | null) {
  if (!start) return "سيتم الإعلان لاحقاً";

  const format = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);

    return new Intl.DateTimeFormat("ar", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(year, month - 1, day));
  };

  if (!end || end === start) return format(start);
  return `${format(start)} - ${format(end)}`;
}

function eventCountdown(start?: string | null, end?: string | null) {
  if (!start) return { status: "unknown", days: "—", hours: "—" };

  const now = new Date();

  const startDate = new Date(`${start}T00:00:00`);
  const endDate = end ? new Date(`${end}T23:59:59`) : startDate;

  if (now > endDate) {
    return { status: "ended", days: 0, hours: 0 };
  }

  if (now >= startDate && now <= endDate) {
    return { status: "live", days: 0, hours: 0 };
  }

  const diff = startDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return { status: "upcoming", days, hours };
}

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
  <div className="absolute left-1/2 top-[46%] h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
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
                  <span className="block bg-gradient-to-r from-white via-blue-200 to-brand-400 bg-clip-text pb-2 text-transparent">
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
  prefetch={false}
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
  <span className="mt-1 block bg-gradient-to-r from-white via-blue-200 to-brand-400 bg-clip-text pb-1 text-transparent">
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
  prefetch={false}
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
  <BrokerFinder
  brokers={brokers}
  countryRankings={countryRankings}
/>
</section>
{/* HOME TRUST BAR */}
<section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)]">
    <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 divide-x-reverse md:grid-cols-4 md:divide-y-0">
      {[
        ["✓", "50+ وسيط", "تمت مراجعتهم"],
        ["📊", "150+ معيار", "للتقييم والمقارنة"],
        ["🔄", "تحديث شهري", "للبيانات المهمة"],
        ["🛡", "مراجعة مستقلة", "وفق منهجية واضحة"],
      ].map(([icon, title, desc]) => (
        <div
          key={title}
          className="flex items-center justify-center gap-2 px-3 py-3 text-center md:gap-3 md:py-4"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[12px] font-black text-brand-500 md:h-8 md:w-8">
            {icon}
          </span>

          <div className="text-right">
            <div className="text-[12px] font-black text-slate-950 md:text-sm">
              {title}
            </div>
            <div className="mt-0.5 text-[10px] font-bold text-slate-500 md:text-[11px]">
              {desc}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3 text-center md:flex-row md:text-right">
      <div>
        <div className="mb-1 text-xs font-black text-brand-600">
          منهجية التقييم
        </div>

        <p className="max-w-4xl text-[12px] font-semibold leading-6 text-slate-700 md:text-sm md:leading-7">
          تعتمد تصنيفات بروكر العرب على تحليل التراخيص، الرسوم، منصات التداول، سرعة السحب، الحسابات، وجودة الدعم.
        </p>
      </div>

      <Link
        href="/how-we-review-brokers"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-2xl bg-brand-500 px-5 text-[12px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition hover:bg-brand-600 md:text-sm"
      >
        منهجية التقييم
      </Link>
    </div>
  </div>
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
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
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
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:bg-brand-600"
                >
                  تصفح جميع التقييمات
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-5">
              {ratingItems.map((item) => (
                <div
                  key={item.num}
                  className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-[12px] font-black text-brand-600 ring-1 ring-[#bfdbfe]">
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
                className="mt-3 inline-flex h-9 items-center justify-center rounded-2xl bg-brand-500 px-4 text-[11px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)]"
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
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-600 ring-1 ring-[#bfdbfe]">
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
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
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
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
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
          <div className="h-1 bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

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
                  className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-brand-100 hover:bg-brand-50"
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
                  className="mt-2 text-[15px] font-black leading-none text-[#0f172a] transition hover:text-brand-500"
                >
                  {cmp.broker_1?.name || "Broker 1"}
                </Link>

                <span
  aria-label={`تقييم ${cmp.broker_1?.name || "الوسيط الأول"} ${cmp.broker_1?.rating?.toFixed(1) ?? "غير متوفر"} من 5`}
  className="mt-1 text-[11px] font-bold text-[#f59e0b]"
>
  ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
</span>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[11px] font-extrabold text-brand-500 shadow-sm">
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

                <span
  aria-label={`تقييم ${cmp.broker_2?.name || "الوسيط الثاني"} ${cmp.broker_2?.rating?.toFixed(1) ?? "غير متوفر"} من 5`}
  className="mt-1 text-[11px] font-bold text-[#f59e0b]"
>
  ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
</span>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href={`/compare/${cmp.slug}`}
                className="mt-3 flex w-full items-center justify-center rounded-xl bg-brand-500 py-2.5 text-[14px] font-bold text-white hover:bg-brand-600"
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
          className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
        >
          <div className="h-1 bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

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
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-100 hover:bg-brand-50 lg:h-20 lg:w-20"
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
                  className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-brand-500 lg:text-[18px]"
                >
                  {cmp.broker_1?.name || "Broker 1"}
                </Link>

               <span
  aria-label={`تقييم ${cmp.broker_1?.name || "الوسيط الأول"} ${cmp.broker_1?.rating?.toFixed(1) ?? "غير متوفر"} من 5`}
  className="mt-1 text-[11px] font-bold text-[#f59e0b]"
>
  ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
</span>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[12px] font-extrabold text-brand-500 shadow-sm">
                  VS
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <Link
                  href={`/brokers/${cmp.broker_2?.name?.toLowerCase() === "exness" ? "exness" : cmp.broker_2?.name?.toLowerCase() === "xm" ? "xm" : cmp.broker_2?.name?.toLowerCase() === "vantage" ? "vantage" : cmp.broker_2?.name?.toLowerCase() === "equiti" ? "equiti" : ""}`}
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-100 hover:bg-brand-50 lg:h-20 lg:w-20"
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
                  className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-brand-500 lg:text-[18px]"
                >
                  {cmp.broker_2?.name || "Broker 2"}
                </Link>

                <span
  aria-label={`تقييم ${cmp.broker_2?.name || "الوسيط الثاني"} ${cmp.broker_2?.rating?.toFixed(1) ?? "غير متوفر"} من 5`}
  className="mt-1 text-[11px] font-bold text-[#f59e0b]"
>
  ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
</span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={`/compare/${cmp.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-[15px] font-extrabold text-white transition hover:bg-brand-600"
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
            <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
              حسب الدولة
            </span>

            <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
              أفضل شركات التداول حسب الدولة
            </h2>

            <p className="mt-3 text-[14px] font-semibold leading-8 text-slate-600 md:hidden">
              اختر أفضل شركات التداول حسب بلدك، وتعرّف على الوسطاء المناسبين من حيث التراخيص، الحسابات، ووسائل الإيداع والسحب.
            </p>

            <p className="mt-3 hidden max-w-[900px] text-[15px] font-semibold leading-9 text-slate-600 md:block">
              استعرض أفضل شركات التداول حسب الدولة، وقارن بين الوسطاء من حيث التراخيص، الحساب الإسلامي، وسائل الإيداع والسحب، وسهولة فتح الحساب. يساعدك هذا القسم على الوصول بسرعة إلى شركات تداول مناسبة لبلدك واحتياجاتك الفعلية.
            </p>
          </div>

          <div className="hidden shrink-0 justify-center md:flex lg:self-center lg:pl-4">
            <Link
              href="/best-brokers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
            >
              كل الدول الأخرى
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="p-3 md:hidden">
        <div className="grid grid-cols-2 gap-2.5">
          {[
            ...countryPages,
            {
              title: "أفضل شركات التداول في العراق",
              href: "/best-brokers/iraq",
              desc: "أفضل الخيارات في العراق",
              shortDesc: "وسطاء مناسبون للمتداول العراقي",
              flag: "https://flagcdn.com/w80/iq.png",
              badge: "العراق",
            },
            {
              title: "أفضل شركات التداول في ليبيا",
              href: "/best-brokers/libya",
              desc: "أفضل الخيارات في ليبيا",
              shortDesc: "وسطاء مناسبون للمتداول الليبي",
              flag: "https://flagcdn.com/w80/ly.png",
              badge: "ليبيا",
            },
            {
              title: "أفضل شركات التداول في سوريا",
              href: "/best-brokers/syria",
              desc: "أفضل الخيارات في سوريا",
              shortDesc: "وسطاء مناسبون للمتداول السوري",
              flag: "https://flagcdn.com/w80/sy.png",
              badge: "سوريا",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`أفضل شركات التداول في ${item.badge}`}
              className="group rounded-[14px] border border-slate-200 bg-white px-2 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-brand-100 hover:bg-[#f8fbff]"
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

                <span className="text-[13px] text-slate-500 opacity-70 transition group-hover:-translate-x-[2px] group-hover:opacity-100 group-hover:text-brand-500">
                  ←
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/best-brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-[14px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-2 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:bg-brand-50"
          >
            <div className="flex flex-col items-center justify-center gap-0.5 text-center">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white shadow-sm">
                  🌍
                </div>

                <h3 className="text-[14px] font-extrabold text-[#0f172a]">
                  دول أخرى
                </h3>
              </div>

              <span className="text-[13px] text-slate-500 transition group-hover:-translate-x-[2px] group-hover:text-brand-500">
                ←
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* DESKTOP / TABLET */}
      <div className="hidden p-4 md:block lg:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ...countryPages,
            {
              title: "أفضل شركات التداول في العراق",
              href: "/best-brokers/iraq",
              desc: "أفضل الخيارات في العراق",
              shortDesc: "وسطاء مناسبون للمتداول العراقي",
              flag: "https://flagcdn.com/w80/iq.png",
              badge: "العراق",
            },
            {
              title: "أفضل شركات التداول في ليبيا",
              href: "/best-brokers/libya",
              desc: "أفضل الخيارات في ليبيا",
              shortDesc: "وسطاء مناسبون للمتداول الليبي",
              flag: "https://flagcdn.com/w80/ly.png",
              badge: "ليبيا",
            },
            {
              title: "أفضل شركات التداول في سوريا",
              href: "/best-brokers/syria",
              desc: "أفضل الخيارات في سوريا",
              shortDesc: "وسطاء مناسبون للمتداول السوري",
              flag: "https://flagcdn.com/w80/sy.png",
              badge: "سوريا",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`أفضل شركات التداول في ${item.badge}`}
              className="group rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:bg-[#fcfdff] hover:shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-[#f8fafc] shadow-sm">
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

                    <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-extrabold text-brand-600">
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
                  <div className="mt-1 text-[20px] font-black text-brand-500 transition group-hover:translate-x-[-3px]">
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
            className="group rounded-[22px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(37,99,235,0.08)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white shadow-sm">
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
                <div className="text-[11px] font-bold text-brand-500">
                  تصفح الكل
                </div>
                <div className="mt-1 text-[20px] font-black text-brand-500 transition group-hover:translate-x-[-3px]">
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
            <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
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
  className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
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
                <span className="text-brand-500"> حسب نوع الحساب</span>
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
                className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
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
                  className={`block px-4 py-3.5 transition hover:bg-brand-50/30 ${
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
                    <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-500 px-4 py-2 text-[11px] font-extrabold text-white">
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
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-full flex-col">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-80" />
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-500">
                    {item.tag}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
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

                  <span className="inline-flex items-center gap-1 text-[13px] font-black text-brand-500 transition group-hover:-translate-x-1">
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
      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
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
        className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
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
          <summary className="cursor-pointer list-none px-4 py-3.5 text-center text-sm font-extrabold text-brand-600">
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
  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-55" />
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
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-brand-100 hover:bg-[#fcfdff] hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-xs font-black text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
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

{/* WHY TRUST BROKER ALARAB */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="text-center lg:text-right">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
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
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-100 bg-white text-[11px] font-black text-brand-600">
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
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-55" />

            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-500">
                {item.tag}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
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

{/* FOREX & FINTECH EVENTS */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-center lg:text-right">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm">
            معارض ومؤتمرات التداول
          </span>

          <h2 className="mx-auto mt-3 max-w-[320px] text-[26px] font-black leading-[1.15] text-[#07111f] sm:max-w-none sm:text-[36px]">
            أهم معارض ومؤتمرات الفوركس في 2026
          </h2>

          <p className="mx-auto mt-3 max-w-[320px] text-[13px] font-semibold leading-7 text-slate-600 sm:max-w-[900px] sm:text-[15px] sm:leading-8 lg:mx-0">
            تابع أبرز معارض الفوركس والمؤتمرات المالية التي تجمع شركات الوساطة ومنصات التداول وخبراء التكنولوجيا المالية حول العالم.
          </p>
        </div>

        <Link
          href="/events"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-600 lg:mx-0"
        >
          عرض جميع المعارض
        </Link>
      </div>
    </div>

    <div className="grid gap-3 p-3 md:grid-cols-3 lg:gap-4 lg:p-5">
      {eventList.map((event) => {
  const count = eventCountdown(event.start_date, event.end_date);

  const eventTitle = (event.title_ar || "معرض تداول")
    .replace(/\s*2026\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const eventLocation =
    event.city_ar?.trim() ||
    event.country_ar?.trim() ||
    "";

  return (
          <article
            key={event.id}
            className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)] sm:rounded-[24px]"
          >
       <div className="relative flex min-h-[78px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-3 py-3 text-center sm:min-h-[90px] sm:px-4 sm:py-4">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.20),transparent_48%)]" />

  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />

  <div className="relative flex flex-col items-center justify-center">
    <h3 className="text-[16px] font-black leading-5 text-white sm:text-[18px] sm:leading-6">
      {eventTitle}
    </h3>

    <div className="mt-1 min-h-[20px] text-[12px] font-black text-white/85 sm:text-[13px]">
      {eventLocation || "\u00A0"}
    </div>
  </div>
</div>
            {count.status === "live" ? (
              <div className="flex h-[64px] flex-col items-center justify-center border-b border-emerald-100 bg-emerald-50 px-3 text-center sm:h-[76px]">
                <div className="text-[20px] font-black text-emerald-600 sm:text-[22px]">
                  جاري الآن
                </div>
                <div className="mt-0.5 text-[10px] font-bold text-emerald-700 sm:mt-1 sm:text-[11px]">
                  الحدث منعقد حالياً
                </div>
              </div>
            ) : (
              <div className="grid h-[64px] grid-cols-2 border-b border-slate-100 bg-[#f8fbff] sm:h-[76px]">
                <div className="border-l border-slate-100 px-3 py-2 text-center sm:py-3">
                  <div className="text-[21px] font-black text-brand-600 sm:text-[24px]">
                    {count.days}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 sm:text-[11px]">يوم</div>
                </div>

                <div className="px-3 py-2 text-center sm:py-3">
                  <div className="text-[21px] font-black text-brand-600 sm:text-[24px]">
                    {count.hours}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 sm:text-[11px]">ساعة</div>
                </div>
              </div>
            )}

            <div className="flex flex-1 flex-col p-3.5 sm:p-5">
              <div className="flex h-[58px] flex-col items-center justify-center gap-1 text-center text-[12px] font-bold leading-5 text-slate-700 sm:h-[96px] sm:gap-2 sm:text-[13px] sm:leading-6">
  <div>
    {formatEventDate(event.start_date, event.end_date)}
  </div>

  <div>
    {event.city_ar || event.country_ar || "سيتم الإعلان عن الموقع لاحقاً"}
    {event.city_ar && event.country_ar ? `، ${event.country_ar}` : ""}
  </div>

  <div className="hidden sm:block">
    {event.venue_ar || "سيتم الإعلان عن المكان لاحقاً"}
  </div>
</div>

              <p className="mt-4 hidden h-[84px] overflow-hidden text-center text-[13px] leading-7 text-slate-600 sm:block">
                {event.excerpt_ar || "تابع تفاصيل هذا الحدث عبر بروكر العرب."}
              </p>

              <Link
                href={`/events/${event.slug}`}
                className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-brand-500 px-4 py-2.5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.18)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:py-3 sm:text-[14px]"
              >
                عرض تفاصيل الحدث
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>

{/* FAQ */}
<section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="text-center lg:text-right">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
          الأسئلة الشائعة
        </span>

        <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
          أهم الأسئلة قبل اختيار شركة التداول
        </h2>

        <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
          إجابات عملية على أهم الأسئلة التي يبحث عنها المتداول قبل فتح حساب تداول، مع روابط تساعدك على مقارنة الوسطاء واختيار الشركة الأنسب.
        </p>
      </div>
    </div>

    {(() => {
      const faqItems = [
       {
  q: "ما أفضل شركة تداول في السعودية؟",
  a: (
    <>
      أفضل شركة تداول في السعودية تختلف حسب احتياجك: هل تبحث عن حساب إسلامي،
      سبريد منخفض، منصة MT5، أو سهولة السحب والإيداع؟ لذلك الأفضل أن تقارن
      الشركات حسب الترخيص والرسوم وتجربة الحساب قبل فتحه. راجع صفحة{" "}
      <Link
        href="/best-brokers/saudi-arabia"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-brand-500 hover:underline"
      >
        أفضل شركات التداول في السعودية
      </Link>{" "}
      لمعرفة الخيارات الأنسب للمتداولين في السعودية.
    </>
  ),
},
        {
          q: "كيف أختار أفضل شركة تداول مناسبة لي؟",
          a: (
            <>
              لا تعتمد على الإعلان أو الشهرة فقط. قارن الترخيص، الرسوم، السبريد، نوع الحساب، المنصة، وسرعة السحب. يمكنك استخدام قسم{" "}
              <Link href="/compare" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-500 hover:underline">
                مقارنات شركات التداول
              </Link>{" "}
              لمعرفة الفروقات بين الوسطاء.
            </>
          ),
        },
        {
          q: "هل شركات التداول المرخصة آمنة دائمًا؟",
          a: "الترخيص مهم جدًا، لكنه لا يكفي وحده. يجب أيضًا فحص سمعة الشركة، وضوح الرسوم، سرعة السحب، شروط الحساب، وطريقة تعامل الدعم مع العملاء.",
        },
        {
          q: "ما الفرق بين حساب Standard وRaw وECN؟",
          a: (
            <>
              حساب Standard أبسط وغالبًا تكون تكلفته داخل السبريد. حساب Raw أو ECN يقدم سبريد أقل مع عمولة منفصلة، وقد يناسب المتداول النشط أكثر. راجع صفحة{" "}
              <Link href="/lowest-spread-brokers" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-500 hover:underline">
                شركات التداول الأقل سبريد
              </Link>{" "}
              لفهم التكلفة الفعلية.
            </>
          ),
        },
        {
          q: "ما أقل مبلغ مناسب لبدء التداول؟",
          a: "بعض الشركات تسمح بفتح حساب بمبالغ صغيرة، لكن الأهم هو إدارة المخاطر. لا تبدأ بمبلغ تحتاجه في حياتك اليومية، ولا تستخدم رافعة مالية عالية بدون فهم واضح للمخاطر.",
        },
        {
          q: "هل الحساب الإسلامي مهم عند اختيار الوسيط؟",
          a: "نعم إذا كنت تريد تجنب فوائد التبييت. لكن يجب قراءة شروط الحساب الإسلامي جيدًا، لأن بعض الشركات تضع رسومًا بديلة أو قيودًا بعد عدد معين من الأيام.",
        },
        {
          q: "ما الفرق بين MT4 وMT5؟",
          a: "MT4 منصة بسيطة ومنتشرة بين متداولي الفوركس، بينما MT5 أحدث وتوفر أدوات وأسواقًا أكثر. الاختيار يعتمد على أسلوبك، لكن الاستقرار وسهولة الاستخدام أهم من اسم المنصة.",
        },
        {
          q: "كيف أعرف أن شركة التداول نصابة؟",
          a: "انتبه للوعود بأرباح مضمونة، الضغط المتكرر للإيداع، صعوبة السحب، غياب الترخيص الواضح، أو طلب تحويلات غير رسمية. الوسيط الموثوق لا يضمن الأرباح ولا يضغط عليك للتداول.",
        },
        {
          q: "هل السبريد المنخفض يعني أن الشركة أفضل؟",
          a: "ليس دائمًا. السبريد مهم، لكن يجب النظر أيضًا إلى العمولة، التنفيذ، الانزلاق السعري، السحب، والترخيص. أحيانًا يكون وسيط بسبريد أعلى قليلًا أفضل إذا كان أكثر استقرارًا ووضوحًا.",
        },
        {
          q: "هل أفتح حساب مباشرة أم أقارن أولًا؟",
          a: (
            <>
              الأفضل دائمًا أن تقارن أولًا. راجع تقييم الشركة، ثم قارنها مع وسيطين آخرين من حيث الترخيص والرسوم والحسابات والمنصات. ابدأ من{" "}
              <Link href="/brokers" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-500 hover:underline">
                تقييمات شركات التداول
              </Link>{" "}
              أو من صفحة{" "}
              <Link href="/compare" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-500 hover:underline">
                المقارنات
              </Link>.
            </>
          ),
        },
      ];

      const FAQItem = ({ item, index }: { item: any; index: number }) => (
        <details className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:border-brand-100 hover:bg-[#fcfdff] hover:shadow-[0_14px_32px_rgba(15,23,42,0.05)] open:border-[#93c5fd]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3 text-right">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-xs font-black text-brand-600 transition group-open:bg-brand-500 group-open:text-white">
                {index + 1}
              </span>

              <span className="text-[15px] font-black leading-7 text-[#07111f] sm:text-[16px]">
                {item.q}
              </span>
            </div>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[14px] font-black text-brand-500 transition group-open:rotate-180 group-open:bg-brand-500 group-open:text-white">
              ▾
            </span>
          </summary>

          <div className="border-t border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#fcfdff_100%)] px-5 py-4">
            <div className="max-w-4xl text-[14px] font-medium leading-8 text-slate-600">
              {item.a}
            </div>
          </div>
        </details>
      );

      return (
        <>
          <div className="space-y-3 px-4 py-4 sm:hidden">
            {faqItems.slice(0, 5).map((item, index) => (
              <FAQItem key={item.q} item={item} index={index} />
            ))}

            <details className="group">
              <summary className="mt-2 flex cursor-pointer list-none items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-[13px] font-black text-brand-500">
                عرض كل الأسئلة
              </summary>

              <div className="mt-3 space-y-3">
                {faqItems.slice(5).map((item, index) => (
                  <FAQItem key={item.q} item={item} index={index + 5} />
                ))}
              </div>
            </details>
          </div>

          <div className="hidden p-5 sm:block">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                {faqItems.slice(0, 5).map((item, index) => (
                  <FAQItem key={item.q} item={item} index={index} />
                ))}
              </div>

              <div className="space-y-3">
                {faqItems.slice(5, 10).map((item, index) => (
                  <FAQItem key={item.q} item={item} index={index + 5} />
                ))}
              </div>
            </div>
          </div>
        </>
      );
    })()}
  </div>
</section>
{/* FEATURED BROKERS BEFORE FOOTER - DESKTOP ONLY */}
<section className="mx-auto hidden max-w-7xl px-4 pb-0 pt-3 sm:px-6 md:block lg:px-8">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-6 text-center">
      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-600 shadow-sm">
      ⭐ أفضل الوسطاء 2026
      </span>

      <h2 className="mt-3 text-[30px] font-black leading-[1.15] text-[#07111f] lg:text-[36px]">
  توصيات بروكر العرب للوسطاء
</h2>

      <p className="mx-auto mt-2 max-w-3xl text-[13px] font-semibold leading-7 text-slate-600 lg:text-[14px]">
        قائمة مختارة من أعلى شركات التداول تقييمًا حسب الترخيص، الرسوم، الحسابات، المنصات وتجربة المستخدم.
      </p>

      <Link
        href="/brokers"
        className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] hover:bg-brand-600"
      >
        عرض جميع الوسطاء
      </Link>
    </div>

    <div className="grid gap-3 bg-white p-4 md:grid-cols-5">
      {footerFeaturedBrokers.map((broker, index) => {
        const rankBadges = ["👑", "🥈", "🥉", "#4", "#5"];

        return (
          <article
            key={broker.id}
            className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#fbfdff] p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_18px_38px_rgba(15,23,42,0.10)]"
          >
            <div className="absolute inset-x-0 top-0 h-[6px] rounded-t-[26px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

            <div className="mb-3 flex items-center justify-between gap-2 pt-1">
            <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-brand-50 px-2 text-[11px] font-black text-brand-600 ring-1 ring-brand-100">
  {rankBadges[index]}
</span>
            </div>

            <Link
              href={`/brokers/${broker.slug}`}
              className="mx-auto flex h-[76px] w-[94px] items-center justify-center rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_8px_22px_rgba(15,23,42,0.06)]"
            >
       <img
  src={broker.logo || ""}
  alt={broker.name || "شركة تداول"}
  className="max-h-[68px] max-w-[96%] object-contain transition duration-300 group-hover:scale-[1.12]"
/>
            </Link>

            <Link
              href={`/brokers/${broker.slug}`}
              className="mt-3 block truncate text-[18px] font-black text-slate-950 hover:text-brand-500"
            >
              {broker.name}
            </Link>

            <p className="mt-1 line-clamp-1 text-[11px] font-bold text-slate-500">
              {broker.best_for || "وسيط تداول موثوق"}
            </p>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <div className="text-[20px] font-black leading-none text-brand-600">
                {broker.rating?.toFixed(1) ?? "—"}
              </div>
              <div className="mt-1 text-[10px] font-black text-slate-500">
               من 5 حسب تقييمنا
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={`/brokers/${broker.slug}`}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-[11px] font-black text-slate-700 hover:bg-slate-50"
              >
                عرض التقييم
              </Link>

              <a
                href={broker.real_account_url || `/brokers/${broker.slug}`}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-500 text-[11px] font-black text-white hover:bg-brand-600"
              >
                فتح حساب
              </a>
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>
    </main>
  );
}