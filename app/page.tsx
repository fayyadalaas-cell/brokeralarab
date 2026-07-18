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
        url: "https://brokeralarab.com/og-image.webp",
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
    images: ["https://brokeralarab.com/og-image.webp"],
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
      shortDesc: "طرق دفع مناسبة ودعم للمتداول الأردني",
      flag: "/flags/jo.svg",
      badge: "الأردن",
    },
    {
      title: "أفضل شركات التداول في السعودية",
      href: "/best-brokers/saudi-arabia",
      desc: "وسطاء مناسبون للمتداولين في السعودية من حيث الحساب الإسلامي والإيداع والتراخيص.",
      shortDesc: "حسابات إسلامية ودعم عربي للمتداول السعودي",
      flag: "/flags/sa.svg",
      badge: "السعودية",
    },
    {
      title: "أفضل شركات التداول في الكويت",
      href: "/best-brokers/kuwait",
      desc: "اختيار أفضل شركات التداول للمتداول الكويتي بناءً على الحسابات والإيداع والدعم.",
      shortDesc: "خيارات قوية من حيث الرسوم والمنصات",
      flag: "/flags/kw.svg",
      badge: "الكويت",
    },
    {
      title: "أفضل شركات التداول في الإمارات",
      href: "/best-brokers/uae",
      desc: "مقارنة أفضل الوسطاء المناسبين للمتداولين في الإمارات من حيث المنصات والرسوم.",
      shortDesc: "شركات مناسبة للإيداع المحلي ودعم الدرهم",
      flag: "/flags/ae.svg",
      badge: "الإمارات",
    },
    {
      title: "أفضل شركات التداول في قطر",
      href: "/best-brokers/qatar",
      desc: "مقارنة الوسطاء المناسبين للمتداولين في قطر من حيث التراخيص والحسابات.",
      shortDesc: "وسطاء مرخصون وحسابات مناسبة في قطر",
      flag: "/flags/qa.svg",
      badge: "قطر",
    },
    {
      title: "أفضل شركات التداول في البحرين",
      href: "/best-brokers/bahrain",
      desc: "شركات تداول مناسبة للمتداول البحريني مع تركيز على الرسوم وطرق الإيداع.",
      shortDesc: "رسوم واضحة وطرق إيداع مناسبة",
      flag: "/flags/bh.svg",
      badge: "البحرين",
    },
    {
      title: "أفضل شركات التداول في عمان",
      href: "/best-brokers/oman",
      desc: "شركات مناسبة للمتداولين في عمان من حيث سهولة البدء والحسابات والمنصات.",
      shortDesc: "وسطاء مناسبون للبدء ومنصات سهلة",
      flag: "/flags/om.svg",
      badge: "عمان",
    },
    {
      title: "أفضل شركات التداول في مصر",
      href: "/best-brokers/egypt",
      desc: "أفضل الوسطاء للمتداول المصري مع تركيز على الإيداع المنخفض والمنصات المناسبة.",
      shortDesc: "إيداع منخفض وخيارات مناسبة للمبتدئين",
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
      .limit(12),
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

  const sidebarBrokers = brokers
  .filter(
    (broker) =>
      broker.logo &&
      broker.slug &&
      broker.name
  )
  .sort(
    (a, b) =>
      Number(b.rating || 0) - Number(a.rating || 0)
  )
  .slice(0, 9);

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

{/* HERO - MODERN LIGHT */}
<section className="relative overflow-hidden border-b border-[#173b70] bg-[linear-gradient(135deg,#eef5ff_0%,#dceaff_48%,#c9ddfb_100%)]">
  {(() => {
    const allHeroBrokers = Array.from(
      ((brokers || []) as Broker[]).reduce((acc, broker) => {
        if (!broker || !broker.name) return acc;

        const key = String(broker.name).trim().toLowerCase();
        const existing = acc.get(key);

        if (
          !existing ||
          Number(broker.rating || 0) > Number(existing.rating || 0)
        ) {
          acc.set(key, broker);
        }

        return acc;
      }, new Map<string, Broker>()).values()
    )
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .map((broker) => ({
        id: broker.id,
        name: broker.name || "شركة تداول",
        slug: broker.slug || "",
        rating: broker.rating
          ? Number(broker.rating).toFixed(1)
          : "—",
        logo: broker.logo || null,
        minDeposit: money(broker.min_deposit),
        regulation: shortReg(
          broker.regulation_short || broker.regulation
        ),
      }));

       return (
      <>
       
        <div className="relative">
          {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0">
  <div className="absolute -right-32 -top-44 h-[520px] w-[520px] rounded-full bg-brand-500/20 blur-[120px]" />

  <div className="absolute -left-32 bottom-[-180px] h-[470px] w-[470px] rounded-full bg-[#0f4fa8]/20 blur-[120px]" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,255,255,0.58),transparent_34%)]" />

  <div className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(15,79,168,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(15,79,168,0.11)_1px,transparent_1px)] [background-size:54px_54px]" />

  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#d8e7fb]/60" />
</div>

          {/* MAIN HERO */}
         <div className="relative mx-auto w-full max-w-[1560px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
           <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_470px] xl:gap-12">
  {/* TEXT */}
 <div className="order-1 text-center lg:pt-3 lg:text-right">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[10px] font-black text-[#174f9f] shadow-[0_10px_28px_rgba(15,79,168,0.14)] backdrop-blur sm:gap-2 sm:px-4 sm:py-2 sm:text-xs lg:px-5 lg:py-2.5 lg:text-[12px]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 sm:h-6 sm:w-6">
        ✓
      </span>
      منصة عربية لمقارنة شركات التداول
    </span>

   <h1 className="mt-3 text-[31px] font-black leading-[1.12] tracking-[-0.035em] text-[#07111f] sm:mt-4 sm:text-[46px] lg:text-[52px] xl:text-[58px]">
  أفضل شركات التداول
 <span className="mt-1 hidden text-brand-600 sm:block sm:text-[36px] lg:text-[40px] xl:text-[44px] leading-[1.18]">
  تقييم الوسطاء والرسوم والتراخيص
</span>
</h1>

 <p className="mx-auto mt-2 max-w-[700px] text-[12px] font-semibold leading-6 text-slate-700 sm:mt-3 sm:text-[15px] sm:leading-7 lg:mx-0">
  <span className="sm:hidden">
    قارن الوسطاء حسب التراخيص والرسوم والمنصات، واختر الأنسب لاحتياجاتك بثقة.
  </span>

  <span className="hidden sm:inline">
    قارن شركات التداول حسب التراخيص والرسوم والسبريد والحسابات والمنصات،
    واختر الوسيط الأنسب لاحتياجاتك بثقة.
  </span>
</p>

{/* HERO TRUST POINTS */}
<div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[10px] font-extrabold text-[#174f9f] sm:mt-3 sm:gap-x-5 sm:gap-y-2 sm:text-[12px] lg:justify-start">
  <span className="inline-flex items-center gap-1.5">
    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/80 text-[9px] shadow-sm sm:h-5 sm:w-5 sm:text-[10px]">
      ✓
    </span>
    مراجعات مستقلة
  </span>

  <span className="inline-flex items-center gap-1.5">
    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/80 text-[9px] shadow-sm sm:h-5 sm:w-5 sm:text-[10px]">
      ✓
    </span>
    مقارنة التراخيص
  </span>

  <span className="inline-flex items-center gap-1.5">
    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/80 text-[9px] shadow-sm sm:h-5 sm:w-5 sm:text-[10px]">
      ✓
    </span>
    بيانات محدثة
  </span>
</div>

<div className="mt-3 flex flex-col items-stretch justify-center gap-2.5 sm:mt-4 sm:flex-row sm:items-center sm:gap-3 lg:justify-start">
  <a
    href="#finder"
    className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 sm:min-h-[50px] sm:px-7 sm:text-[14px]"
  >
    ابحث عن أفضل وسيط
  </a>

  <Link
    href="/compare"
    className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-[13px] font-black text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-600 sm:min-h-[50px] sm:px-7 sm:text-[14px]"
  >
    قارن بين الوسطاء
  </Link>
</div>

<div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-4 sm:gap-3">
  {[
    ["150+", "وسيط تمت دراسته"],
    ["50+", "مراجعة ومقارنة"],
    ["18+", "جهة رقابية مغطاة"],
    ["10", "حاسبات تداول"],
  ].map(([value, label]) => (
    <div
      key={label}
      className="group rounded-2xl border border-white/70 bg-white/90 px-2.5 py-2 text-center shadow-[0_10px_28px_rgba(15,79,168,0.11)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_16px_34px_rgba(15,79,168,0.16)] sm:px-3 sm:py-2.5"
    >
      <div
  dir="ltr"
  className="text-[18px] font-black text-brand-600 transition duration-300 group-hover:scale-105 sm:text-[20px]"
>
  {value}
</div>

      <div className="mt-0.5 text-[9px] font-bold leading-4 text-slate-500 sm:text-[11px]">
        {label}
      </div>
    </div>
  ))}
</div>
  </div>

  {/* BROKER LOGOS */}
<div className="order-2 hidden h-full lg:block">
    <div className="relative mx-auto h-full max-w-[430px]">
      <div className="absolute -inset-6 rounded-[42px] bg-gradient-to-br from-brand-100/70 via-blue-100/20 to-transparent blur-2xl" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,#0b1f3a_0%,#102f59_58%,#174f8f_100%)] p-5 shadow-[0_28px_75px_rgba(6,25,53,0.28)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="text-right">
           <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-black text-blue-100">
              شركات تمت مراجعتها
            </span>

            <h2 className="mt-2 text-[20px] font-black text-white">
              وسطاء موثوقون في مكان واحد
            </h2>

           <p className="mt-1 text-[11px] font-semibold text-blue-100/75">
              قارن التقييمات والتراخيص والحسابات بسهولة
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-[18px] text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]">
            ✓
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {allHeroBrokers.slice(0, 6).map((broker) => (
            <Link
              key={broker.id}
              href={`/brokers/${broker.slug}`}
              className="group flex h-[86px] items-center justify-center rounded-[20px] border border-white/15 bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_34px_rgba(0,0,0,0.18)]"
            >
              {broker.logo ? (
                <img
  src={broker.logo}
  alt={broker.name}
 className="max-h-[76px] max-w-[135px] object-contain transition duration-300 group-hover:scale-105"
/>

              ) : (
                <span className="text-xs font-black text-slate-700">
                  {broker.name}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
          <div className="text-right">
           <div className="text-[13px] font-black text-white">
  تقييمات مستقلة وبيانات محدثة
</div>

          <div className="mt-1 text-[10px] font-semibold leading-4 text-blue-100/80">
  الترتيب لا يعتمد على الدفع أو الإعلانات
</div>
          </div>

          <Link
            href="/brokers"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-4 text-[11px] font-black text-[#123d73] shadow-sm transition hover:bg-blue-50"
          >
            جميع الوسطاء
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

        
        </div>
      </>
    );
  })()}
</section>

{/* HOME CONTENT + DESKTOP SIDEBAR */}
<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-start xl:gap-3">

    {/* ALL HOME PAGE SECTIONS */}
    <div className="min-w-0 xl:[&>section]:pl-0">

      {/* FINDER */}
<section
  id="finder"
  className="scroll-mt-24 mx-auto max-w-7xl px-0 pt-2 pb-3 sm:pt-4 sm:pb-4 lg:pt-4 lg:pb-4"
>
  <BrokerFinder
  brokers={brokers}
  countryRankings={countryRankings}
/>
</section>

   {/* HOW WE RATE - CLEAN TRUST SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {(() => {
   const ratingItems = [
  {
    num: "01",
    title: "الترخيص وحماية الأموال",
    desc: "نقيّم قوة الترخيص وآليات حماية أموال العملاء وشفافية الإجراءات.",
  },
  {
    num: "02",
    title: "الرسوم والسبريد",
    desc: "نقارن تكلفة التداول بين السبريد والعمولات ورسوم التبييت.",
  },
  {
    num: "03",
    title: "المنصات والتنفيذ",
    desc: "نقيّم سرعة التنفيذ واستقرار المنصة وسهولة تجربة الاستخدام.",
  },
  {
    num: "04",
    title: "الإيداع والسحب",
    desc: "نختبر سرعة الإيداع والسحب ووضوح الرسوم وطرق الدفع.",
  },
  {
    num: "05",
    title: "الحساب الإسلامي",
    desc: "نراجع شروط الحساب الإسلامي والقيود والرسوم المرتبطة به.",
  },
  {
    num: "06",
    title: "الدعم وتجربة المستخدم",
    desc: "نقيّم سرعة الدعم وسهولة فتح الحساب وتجربة المستخدم.",
  },
];
      return (
        <>
{/* DESKTOP */}
<div className="hidden lg:block">
  <div className="bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-5">
    <div>
      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
        منهجية تقييم الوسطاء
      </span>

      <h2 className="mt-4 text-[36px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f]">
        كيف نختار أفضل شركات التداول؟
      </h2>

      <p className="mt-3 max-w-[900px] text-[15px] font-semibold leading-8 text-slate-600">
        نقيّم الوسطاء وفق معايير واضحة تشمل قوة التراخيص، الرسوم والسبريد،
        المنصات والتنفيذ، الإيداع والسحب، الحساب الإسلامي وجودة الدعم.
      </p>
    </div>
  </div>

  <div className="grid grid-cols-3 gap-4 p-5">
    {ratingItems.map((item) => (
      <Link
        key={item.num}
        href="/how-we-review-brokers"
        target="_blank"
        rel="noopener noreferrer"
        className="group h-full min-h-[118px] rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_18px_38px_rgba(15,23,42,0.08)]"
      >
        <div className="flex h-full items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-[14px] font-black text-brand-600 ring-1 ring-[#bfdbfe] transition group-hover:bg-brand-500 group-hover:text-white">
            {item.num}
          </span>

          <div>
            <h3 className="text-[18px] font-black leading-6 text-[#07111f]">
              {item.title}
            </h3>

            <p className="mt-2 min-h-[52px] max-w-[330px] text-[13px] font-semibold leading-6 text-slate-600">
              {item.desc}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>

  <div className="flex justify-center border-t border-slate-100 px-5 py-5">
    <Link
      href="/how-we-review-brokers"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[48px] min-w-[280px] items-center justify-center rounded-2xl bg-brand-500 px-7 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
    >
      اطلع على منهجية التقييم كاملة
    </Link>
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
  </div>

  <div className="grid grid-cols-1 gap-2 bg-white p-3.5">
    {ratingItems.map((item) => (
      <Link
        key={item.num}
        href="/how-we-review-brokers"
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-[18px] border border-slate-200 bg-[#fbfdff] px-3.5 py-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)] transition hover:border-brand-200 hover:bg-brand-50/30"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[11px] font-black text-brand-600 ring-1 ring-[#bfdbfe] transition group-hover:bg-brand-500 group-hover:text-white">
            {item.num}
          </span>

          <div>
            <h3 className="text-[14px] font-black leading-5 text-[#07111f]">
              {item.title}
            </h3>

            <p className="mt-1 min-h-[40px] text-[11px] font-semibold leading-5 text-slate-600">
              {item.desc}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>

  <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3">
    <Link
      href="/how-we-review-brokers"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand-500 px-4 text-[12px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)]"
    >
      اطلع على منهجية التقييم كاملة
    </Link>
  </div>
</div>
  </>
      );
    })()}
  </div>
</section>

{/* TOP COMPARISONS */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-center lg:text-right">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
            مقارنات الوسطاء
          </span>

         <h2 className="mx-auto mt-3 max-w-[300px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
  أشهر مقارنات شركات التداول
</h2>

          <div className="mx-auto mt-3 max-w-[900px] text-slate-600 lg:mx-0">
  <p className="text-[13px] font-semibold leading-7 sm:hidden">
    قارن بين أشهر الوسطاء من حيث التراخيص والرسوم والحسابات والمنصات.
  </p>

  <p className="hidden text-[15px] font-semibold leading-9 sm:block">
    استعرض أشهر مقارنات شركات التداول بين الوسطاء، وتعرّف على الفروقات
    في التراخيص، أنواع الحسابات، الرسوم، والمنصات المتاحة مثل MT4 وMT5
    لاختيار الوسيط الأنسب لك.
  </p>
</div>
        </div>

        <div className="flex justify-center lg:self-center lg:pl-2">
  <Link
    href="/compare"
    className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:bg-brand-600 sm:h-12 sm:px-6 sm:text-[14px]"
  >
    تصفح جميع المقارنات
  </Link>
</div>
      </div>
    </div>

    {/* MOBILE - unchanged */}
    <div className="grid gap-3 p-3.5 md:hidden">
      {topComparisons.map((cmp, index) => (
        <article
          key={cmp.id}
          className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)]"
        >
          <div className="h-1 bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

          <div className="p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
  <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-[9px] font-black text-brand-600">
    مقارنة مختارة
  </span>

  <span
    dir="ltr"
    className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-1.5 text-[9px] font-black text-slate-500"
  >
    #{index + 1}
  </span>
</div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
  {/* BROKER 1 */}
  <div className="flex min-w-0 flex-col items-center text-center">
    <Link
      href={`/brokers/${
        cmp.broker_1?.name?.toLowerCase() === "exness"
          ? "exness"
          : cmp.broker_1?.name?.toLowerCase() === "xm"
          ? "xm"
          : cmp.broker_1?.name?.toLowerCase() === "vantage"
          ? "vantage"
          : cmp.broker_1?.name?.toLowerCase() === "equiti"
          ? "equiti"
          : ""
      }`}
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
      href={`/brokers/${
        cmp.broker_1?.name?.toLowerCase() === "exness"
          ? "exness"
          : cmp.broker_1?.name?.toLowerCase() === "xm"
          ? "xm"
          : cmp.broker_1?.name?.toLowerCase() === "vantage"
          ? "vantage"
          : cmp.broker_1?.name?.toLowerCase() === "equiti"
          ? "equiti"
          : ""
      }`}
      className="mt-2 flex min-h-[40px] max-w-[92px] items-center justify-center text-[14px] font-black leading-5 text-[#0f172a] transition hover:text-brand-500"
    >
      {cmp.broker_1?.name || "Broker 1"}
    </Link>

    <span
      aria-label={`تقييم ${cmp.broker_1?.name || "الوسيط الأول"} ${
        cmp.broker_1?.rating?.toFixed(1) ?? "غير متوفر"
      } من 5`}
      className="mt-1 text-[11px] font-bold text-[#f59e0b]"
    >
      ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
    </span>
  </div>

  {/* VS */}
  <div className="flex h-14 items-center justify-center">
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[11px] font-extrabold text-brand-500 shadow-sm">
      VS
    </div>
  </div>

  {/* BROKER 2 */}
  <div className="flex min-w-0 flex-col items-center text-center">
    <Link
      href={`/brokers/${
        cmp.broker_2?.name?.toLowerCase() === "exness"
          ? "exness"
          : cmp.broker_2?.name?.toLowerCase() === "xm"
          ? "xm"
          : cmp.broker_2?.name?.toLowerCase() === "vantage"
          ? "vantage"
          : cmp.broker_2?.name?.toLowerCase() === "equiti"
          ? "equiti"
          : ""
      }`}
      className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-brand-100 hover:bg-brand-50"
    >
      {cmp.broker_2?.logo ? (
        <img
          src={cmp.broker_2.logo}
          alt={cmp.broker_2.name || "Broker 2"}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-[9px] text-slate-400">Logo</span>
      )}
    </Link>

    <Link
      href={`/brokers/${
        cmp.broker_2?.name?.toLowerCase() === "exness"
          ? "exness"
          : cmp.broker_2?.name?.toLowerCase() === "xm"
          ? "xm"
          : cmp.broker_2?.name?.toLowerCase() === "vantage"
          ? "vantage"
          : cmp.broker_2?.name?.toLowerCase() === "equiti"
          ? "equiti"
          : ""
      }`}
      className="mt-2 min-h-[40px] text-[15px] font-black leading-5 text-[#0f172a] transition hover:text-brand-500"
    >
      {cmp.broker_2?.name || "Broker 2"}
    </Link>

    <span
      aria-label={`تقييم ${cmp.broker_2?.name || "الوسيط الثاني"} ${
        cmp.broker_2?.rating?.toFixed(1) ?? "غير متوفر"
      } من 5`}
      className="mt-1 text-[11px] font-bold text-[#f59e0b]"
    >
      ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
    </span>
  </div>
</div>

<div className="mt-3 grid grid-cols-2 gap-2">
  <div className="flex min-h-[48px] items-center justify-center rounded-xl bg-brand-50 px-2.5 py-2 text-center text-[10px] font-bold leading-4 text-brand-700">
    مقارنة الحسابات والرسوم
  </div>

  <div className="flex min-h-[48px] items-center justify-center rounded-xl bg-slate-50 px-2.5 py-2 text-center text-[10px] font-bold leading-4 text-slate-600 ring-1 ring-slate-200">
    مقارنة المنصات والتراخيص
  </div>
</div>

           <div className="mt-3">
  <Link
    href={`/compare/${cmp.slug}`}
    className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-black text-white transition hover:bg-brand-600"
  >
    شاهد المقارنة الكاملة
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
          className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_16px_34px_rgba(15,23,42,0.07)]"
        >
          <div className="h-1 bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

          <div className="flex flex-1 flex-col p-5">
           <div className="mb-4 flex items-center justify-between gap-3">
  <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
    مقارنة مختارة
  </span>

  <span className="text-[11px] font-bold text-slate-400">
    #{index + 1}
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

<div className="mt-5 grid grid-cols-2 gap-3">
  <div className="flex min-h-[54px] items-center justify-center rounded-2xl bg-brand-50 px-3 py-3 text-center text-[11px] font-bold leading-5 text-brand-700">
    مقارنة الحسابات والرسوم
  </div>

  <div className="flex min-h-[54px] items-center justify-center rounded-2xl bg-slate-50 px-3 py-3 text-center text-[11px] font-bold leading-5 text-slate-600 ring-1 ring-slate-200">
    مقارنة المنصات والتراخيص
  </div>
</div>

           <div className="mt-auto pt-5">
              <Link
                href={`/compare/${cmp.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-[15px] font-extrabold text-white transition hover:bg-brand-600"
              >
                شاهد المقارنة الكاملة
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

{/* COUNTRIES DIRECTORY - FINAL */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
      {/* HEADER */}
      <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-center lg:text-right">
            <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
              حسب الدولة
            </span>

            <h2 className="mx-auto mt-3 max-w-[290px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
  أفضل شركات التداول حسب الدولة
</h2>

            <p className="mx-auto mt-3 max-w-[300px] text-[13px] font-semibold leading-7 text-slate-600 md:hidden">
  اختر بلدك للوصول إلى الوسطاء المناسبين من حيث التراخيص والحسابات وطرق الدفع.
</p>

           <p className="mt-3 hidden max-w-[900px] text-[15px] font-semibold leading-8 text-slate-600 md:block">
  استعرض أفضل شركات التداول حسب الدولة، وقارن الوسطاء من حيث التراخيص،
  الحساب الإسلامي، وسائل الإيداع والسحب، وسهولة فتح الحساب.
</p>
          </div>

          <div className="hidden shrink-0 justify-center md:flex lg:self-center lg:pl-4">
            <Link
              href="/best-brokers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
            >
             عرض جميع الدول
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
              shortDesc: "طرق دفع ودعم مناسب للمتداول العراقي",
              flag: "https://flagcdn.com/w80/iq.png",
              badge: "العراق",
            },
            {
              title: "أفضل شركات التداول في ليبيا",
              href: "/best-brokers/libya",
              desc: "أفضل الخيارات في ليبيا",
              shortDesc: "خيارات بإيداع مناسب ودعم عربي",
              flag: "https://flagcdn.com/w80/ly.png",
              badge: "ليبيا",
            },
            {
              title: "أفضل شركات التداول في سوريا",
              href: "/best-brokers/syria",
              desc: "أفضل الخيارات في سوريا",
              shortDesc: "وسطاء متاحون مع خيارات حساب مرنة",
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
              className="group min-h-[112px] rounded-[16px] border border-slate-200 bg-white px-3 py-3 shadow-[0_3px_10px_rgba(0,0,0,0.04)] transition hover:border-brand-200 hover:bg-[#f8fbff]"
            >
<div className="flex h-full min-h-[86px] flex-col items-center justify-between text-center">
  <div className="flex items-center gap-2">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
      <img
        src={item.flag}
        alt={item.badge}
        className="h-6 w-6 rounded-full object-cover"
      />
    </div>

    <h3 className="text-[14px] font-extrabold leading-5 text-[#0f172a]">
      {item.badge}
    </h3>
  </div>

  <p className="mt-2 line-clamp-2 min-h-[34px] text-[10px] font-semibold leading-4 text-slate-500">
    {item.shortDesc ?? item.desc}
  </p>

  <span className="mt-auto pt-1 text-[13px] text-brand-500 transition group-hover:-translate-x-[2px]">
  ←
</span>
</div>
            </Link>
          ))}

          <Link
  href="/best-brokers"
  target="_blank"
  rel="noopener noreferrer"
  className="group min-h-[112px] rounded-[16px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-3 py-3 shadow-[0_3px_10px_rgba(37,99,235,0.06)] transition hover:bg-brand-50"
>
  <div className="flex h-full flex-col items-center justify-center text-center">
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white shadow-sm">
        🌍
      </div>

      <h3 className="text-[14px] font-extrabold text-[#0f172a]">
        دول أخرى
      </h3>
    </div>

    <p className="mt-2 line-clamp-2 min-h-[34px] text-[10px] font-semibold leading-4 text-slate-500">
      استعرض جميع الدول وصفحات الوسطاء المحلية
    </p>

    <span className="mt-auto pt-1 text-[13px] text-brand-500 transition group-hover:-translate-x-[2px]">
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
              className="group min-h-[92px] rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-[#fcfdff] hover:shadow-[0_14px_32px_rgba(15,23,42,0.06)]"
            >
              <div className="flex min-h-[64px] items-center gap-3">
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

                 <p className="mt-1 line-clamp-1 text-[12px] font-medium leading-5 text-slate-500">
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
  className="group min-h-[92px] rounded-[20px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(37,99,235,0.08)]"
>
            <div className="flex min-h-[64px] items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white shadow-sm">
                🌍
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[16px] font-black text-[#0f172a]">
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
</section>

{/* ACCOUNT TYPES HOME SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-center lg:text-right">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
            أنواع حسابات التداول
          </span>

          <h2 className="mx-auto mt-3 max-w-[300px] text-[24px] font-black leading-[1.18] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
            اختر نوع الحساب المناسب لأسلوب تداولك
          </h2>

        <p className="mx-auto mt-3 max-w-[720px] text-[13px] font-semibold leading-7 text-slate-600 sm:text-[15px] sm:leading-8 lg:mx-0">
  تعرّف على مزايا حسابات التداول المختلفة، وقارن بين
  <span dir="ltr" className="mx-1 inline-block font-bold">
    Standard
  </span>
  و
  <span dir="ltr" className="mx-1 inline-block font-bold">
    Raw Spread
  </span>
  و
  <span dir="ltr" className="mx-1 inline-block font-bold">
    ECN
  </span>
  و
  <span dir="ltr" className="mx-1 inline-block font-bold">
    Cent
  </span>
  لاختيار الحساب الأنسب لخبرتك ورأس مالك.
</p>
        </div>

        <div className="flex justify-center lg:self-center lg:pl-4">
          <Link
            href="/lowest-spread-brokers"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:h-12 sm:min-w-[190px] sm:px-6 sm:text-[14px]"
          >
            قارن أنواع الحسابات
          </Link>
        </div>
      </div>
    </div>

    {/* MOBILE */}
    <div className="p-3.5 sm:hidden">
      <div className="grid gap-3">
        {[
          {
            title: "حسابات Standard",
            suitable: "مناسبة للمبتدئين والتداول اليومي",
            desc: "حسابات بسيطة برسوم واضحة وبدون تعقيد كبير.",
            badge: "سهولة البدء",
          },
          {
            title: "حسابات Raw Spread",
suitable: "مناسبة للسكالبينج والمتداول النشط",
desc: "سبريد يبدأ من 0.0 نقطة مع عمولة ثابتة لتنفيذ احترافي.",
badge: "أقل سبريد",
          },
          {
            title: "حسابات ECN",
            suitable: "مناسبة للمتداولين المحترفين",
            desc: "تنفيذ أسرع ووصول مباشر لسيولة السوق.",
            badge: "تنفيذ احترافي",
          },
          {
            title: "حسابات Cent / Micro",
            suitable: "مناسبة للتجربة برأس مال صغير",
            desc: "ابدأ بأحجام تداول صغيرة واختبر استراتيجيتك.",
            badge: "رأس مال صغير",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href="/lowest-spread-brokers#account-types"
            className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white px-3.5 py-3 shadow-[0_6px_18px_rgba(15,23,42,0.05)] transition hover:border-brand-200 hover:bg-[#fbfdff]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 text-right">
                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                  {item.badge}
                </span>

                <h3 className="mt-3 text-[16px] font-black leading-6 text-[#07111f]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[12px] font-black leading-5 text-brand-600">
                  {item.suitable}
                </p>

              <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-500">
  {item.desc}
</p>
              </div>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-[14px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                ←
              </span>
            </div>

           <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[10px] font-extrabold leading-5 text-brand-500">
  <span>قارن الوسطاء الذين يقدمون هذا الحساب</span>

  <span className="shrink-0 transition group-hover:-translate-x-1">
    ←
  </span>
</div>
          </Link>
        ))}
      </div>
    </div>

    {/* DESKTOP / TABLET */}
    <div className="hidden p-5 sm:block">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "حسابات Standard",
            suitable: "مناسبة للمبتدئين والتداول اليومي",
            desc: "حسابات سهلة بتكلفة واضحة وبدون تعقيد في العمولات.",
            badge: "سهولة البدء",
          },
          {
           title: "حسابات Raw Spread",
suitable: "مناسبة للسكالبينج والمتداول النشط",
desc: "سبريد يبدأ من 0.0 نقطة مع عمولة ثابتة لتنفيذ احترافي.",
badge: "أقل سبريد",
          },
          {
            title: "حسابات ECN",
            suitable: "مناسبة للمتداولين المحترفين",
            desc: "تنفيذ سريع ووصول مباشر للسيولة مع تسعير أكثر تنافسية.",
            badge: "تنفيذ احترافي",
          },
          {
            title: "حسابات Cent / Micro",
            suitable: "مناسبة للتجربة برأس مال صغير",
            desc: "أحجام تداول صغيرة لاختبار الاستراتيجيات وتقليل المخاطر.",
            badge: "رأس مال صغير",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href="/lowest-spread-brokers#account-types"
            className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                {item.badge}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                ←
              </span>
            </div>

            <h3 className="mt-4 text-[18px] font-black leading-6 text-[#07111f]">
              {item.title}
            </h3>

           <p className="mt-2 min-h-[40px] text-[13px] font-black leading-6 text-brand-600">
  {item.suitable}
</p>

           <p className="mt-2 min-h-[48px] text-[12px] font-medium leading-6 text-slate-600">
  {item.desc}
</p>

<div className="mt-auto border-t border-slate-100 pt-4">
<div className="mt-auto border-t border-slate-100 pt-4">
  <span className="flex items-center justify-between gap-2 text-[11px] font-black leading-5 text-brand-500">
    <span>قارن الوسطاء الذين يقدمون هذا الحساب</span>

    <span className="shrink-0 transition group-hover:-translate-x-1">
      ←
    </span>
  </span>
</div>
</div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>

  {/* HOW TO CHOOSE A BROKER - COMPACT SEO SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    {(() => {
const brokerChecks = [
  {
    num: "01",
    title: "الترخيص والتنظيم",
    text: "تحقق من الجهة الرقابية وحماية أموال العملاء.",
  },
  {
    num: "02",
    title: "السبريد والعمولات",
    text: "قارن التكلفة الفعلية ورسوم التبييت.",
  },
  {
    num: "03",
    title: "المنصة والتنفيذ",
    text: "اختر منصة مستقرة وسريعة وسهلة الاستخدام.",
  },
  {
    num: "04",
    title: "الإيداع والسحب",
    text: "راجع طرق الدفع وسرعة السحب والرسوم.",
  },
  {
    num: "05",
    title: "الحساب الإسلامي",
    text: "تأكد من الشروط والرسوم والقيود المرتبطة به.",
  },
  {
    num: "06",
    title: "الحسابات والدعم",
    text: "اختر حسابًا مناسبًا مع دعم عربي موثوق.",
  },
];

      return (
        <>
          {/* HEADER */}
          <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-center lg:text-right">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
                  دليل اختيار الوسيط
                </span>

                <h2 className="mx-auto mt-3 max-w-[310px] text-[25px] font-black leading-[1.18] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
                  كيف تختار أفضل شركة تداول مناسبة لك؟
                </h2>

              <p className="mx-auto mt-3 max-w-[850px] text-[12px] font-semibold leading-6 text-slate-600 sm:text-[15px] sm:leading-8 lg:mx-0">
  قارن شركات التداول وفق قوة الترخيص، تكلفة التداول، المنصة،
  أنواع الحسابات وطرق الإيداع والسحب قبل فتح الحساب.
</p>
              </div>

              <div className="flex justify-center lg:shrink-0">
                <Link
                  href="/learn-trading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:h-12 sm:min-w-[190px] sm:text-[14px]"
                >
                  دليل تعلم التداول
                </Link>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="p-3 sm:hidden">
            <div className="rounded-[18px] border border-slate-200 bg-[#f8fbff] px-4 py-3.5">
              <p className="text-[12px] font-semibold leading-7 text-slate-600">
                أفضل شركة تداول ليست دائماً الأكثر شهرة. ابحث عن وسيط يجمع
                بين{" "}
                <Link
                  href="/licenses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-brand-600"
                >
                  الترخيص القوي
                </Link>
                ، الرسوم الواضحة والمنصة المناسبة.
              </p>

              <p className="mt-2 text-[12px] font-semibold leading-7 text-slate-600">
                قارن أيضاً{" "}
                <Link
                  href="/learn-trading/spread"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-brand-600"
                >
                  السبريد
                </Link>
                ، أنواع الحسابات، طرق السحب وشروط{" "}
                <Link
                  href="/best-brokers/islamic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-brand-600"
                >
                  الحساب الإسلامي
                </Link>
                .
              </p>
            </div>

           <div className="mt-3 grid grid-cols-2 gap-2.5">
  {brokerChecks.map((item) => (
    <div
      key={item.num}
      className="flex min-h-[118px] flex-col rounded-[17px] border border-slate-200 bg-white p-3 shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-[9px] font-black text-brand-600">
          {item.num}
        </span>
      </div>

      <h3 className="mt-3 flex min-h-[40px] items-center text-[13px] font-black leading-5 text-[#07111f]">
        {item.title}
      </h3>

      <p className="mt-1 line-clamp-2 min-h-[32px] text-[10px] font-semibold leading-4 text-slate-500">
        {item.text}
      </p>
    </div>
  ))}
</div>

            <Link
              href="/learn-trading"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand-500 px-4 text-[12px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition hover:bg-brand-600"
            >
             استكشف دليل تعلم التداول
            </Link>
          </div>

          {/* DESKTOP / TABLET */}
          <div className="hidden p-5 sm:block">
           <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
              {/* SEO ARTICLE */}
              <article className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-70" />

               <div className="space-y-4 text-[14px] font-medium leading-8 text-slate-600">
  <p>
    عند اختيار <strong>أفضل شركة تداول</strong>، لا تعتمد على شهرة الوسيط أو
    الإعلانات فقط. ابدأ بفحص{" "}
    <Link
      href="/licenses"
      target="_blank"
      rel="noopener noreferrer"
      className="font-black text-brand-600 hover:underline"
    >
      الترخيص والجهة الرقابية
    </Link>
    ، لأن الوسيط الخاضع لرقابة قوية يكون أكثر التزامًا بحماية أموال العملاء
    والشفافية في تنفيذ الصفقات.
  </p>

  <p>
    بعد ذلك قارن تكلفة التداول الفعلية، فهي لا تقتصر على{" "}
    <Link
      href="/learn-trading/spread"
      target="_blank"
      rel="noopener noreferrer"
      className="font-black text-brand-600 hover:underline"
    >
      السبريد
    </Link>
    ، بل تشمل أيضًا العمولات ورسوم التبييت وأي رسوم إضافية قد تؤثر على
    التكلفة النهائية حسب نوع الحساب وأسلوب التداول.
  </p>

  <p>
    راجع كذلك المنصة وسرعة التنفيذ، سواء كنت تستخدم MT4 أو MT5 أو تطبيق
    الهاتف، وتأكد من سهولة الاستخدام واستقرار المنصة بما يناسب طريقة تداولك.
  </p>

  <p>
    ولا تنس مقارنة{" "}
    <Link
      href="/lowest-spread-brokers#account-types"
      target="_blank"
      rel="noopener noreferrer"
      className="font-black text-brand-600 hover:underline"
    >
      أنواع حسابات التداول
    </Link>
    . فقد يناسب المبتدئ حساب Standard أو Cent، بينما يفضل المتداول النشط
    حسابًا بسبريد منخفض أو ECN للحصول على تنفيذ أسرع وتكلفة أقل.
  </p>

  <p>
    وأخيرًا، تحقق من سرعة الإيداع والسحب، وتوفر{" "}
    <Link
      href="/best-brokers/islamic"
      target="_blank"
      rel="noopener noreferrer"
      className="font-black text-brand-600 hover:underline"
    >
      الحساب الإسلامي
    </Link>
    ، وجودة الدعم العربي. ويمكنك الاستفادة من{" "}
    <Link
      href="/learn-trading"
      target="_blank"
      rel="noopener noreferrer"
      className="font-black text-brand-600 hover:underline"
    >
      دليل تعلم التداول
    </Link>{" "}
    للتعرف على جميع معايير اختيار الوسيط قبل فتح الحساب واتخاذ القرار النهائي.
  </p>
</div>

                <div className="mt-auto flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <Link
                    href="/learn-trading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-brand-600"
                  >
                   استكشف دليل تعلم التداول
                  </Link>

                  <Link
                    href="/best-brokers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-brand-200 bg-white px-6 text-[13px] font-black text-brand-600 transition hover:bg-brand-50"
                  >
                    تصفح أفضل الوسطاء
                  </Link>
                </div>
              </article>

              {/* CHECKLIST */}
              <aside className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
                <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] to-white px-5 py-4">
                  <h3 className="text-[20px] font-black leading-8 text-[#07111f]">
                    ما الذي يجب فحصه قبل فتح الحساب؟
                  </h3>

                  <p className="mt-1 text-[11px] font-semibold text-slate-500">
                    ستة معايير أساسية لاختيار وسيط مناسب.
                  </p>
                </div>

              <div className="grid grid-cols-2 gap-2.5 p-4">
  {brokerChecks.map((item) => (
    <div
      key={item.num}
      className="min-h-[112px] rounded-[18px] border border-slate-200 bg-white p-3 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 px-1.5 text-[9px] font-black text-brand-600">
          {item.num}
        </span>
      </div>

      <h4 className="mt-4 text-[13px] font-black leading-5 text-[#07111f]">
        {item.title}
      </h4>

      <p className="mt-1 text-[10px] font-semibold leading-5 text-slate-500">
        {item.text}
      </p>
    </div>
  ))}
</div>
              </aside>
            </div>
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* WHY TRUST BROKER ALARAB */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
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

         <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-500">
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

{/* FOREX & FINTECH EVENTS - FINAL */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    {(() => {
      const isMediaPartnerEvent = (event: any) => {
        const searchableText = `${event.slug || ""} ${
          event.title_ar || ""
        }`.toLowerCase();

        return (
          searchableText.includes("forex-expo-dubai") ||
          searchableText.includes("crypto-expo-dubai") ||
          searchableText.includes("فوركس إكسبو دبي") ||
          searchableText.includes("كريبتو إكسبو دبي") ||
          searchableText.includes("معرض الفوركس دبي") ||
          searchableText.includes("معرض الكريبتو دبي")
        );
      };

      /*
       * نعرض أقرب حدثين أولاً.
       * ثم نضيف أول حدث لدينا معه شراكة إعلامية إن لم يكن بينهما.
       */
      const nearestTwoEvents = eventList.slice(0, 2);

      const mediaPartnerEvent = eventList.find((event) =>
        isMediaPartnerEvent(event)
      );

      const selectedEvents =
        mediaPartnerEvent &&
        !nearestTwoEvents.some(
          (event) => event.id === mediaPartnerEvent.id
        )
          ? [...nearestTwoEvents, mediaPartnerEvent]
          : eventList.slice(0, 3);

      return (
        <>
          {/* HEADER */}
          <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div className="min-w-0 flex-1 text-center lg:text-right">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
                  معارض ومؤتمرات التداول
                </span>

                <h2 className="mx-auto mt-3 max-w-[320px] text-[25px] font-black leading-[1.16] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
                  أهم معارض ومؤتمرات الفوركس في 2026
                </h2>

                <p className="mx-auto mt-3 max-w-[330px] text-[12px] font-semibold leading-6 text-slate-600 sm:max-w-[900px] sm:text-[15px] sm:leading-8 lg:mx-0">
                  تابع أبرز معارض الفوركس والتكنولوجيا المالية، وتعرّف على
                  الأحداث التي يشارك فيها بروكر العرب بصفته شريكًا إعلاميًا
                  رسميًا.
                </p>
              </div>

              <Link
                href="/events"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:h-12 sm:min-w-[190px] sm:text-[14px] lg:mx-0"
              >
                عرض جميع المعارض
              </Link>
            </div>
          </div>

          {/* EVENTS */}
          <div className="grid gap-3 p-3 md:grid-cols-3 lg:gap-4 lg:p-5">
            {selectedEvents.map((event) => {
              const count = eventCountdown(
                event.start_date,
                event.end_date
              );

              const mediaPartner = isMediaPartnerEvent(event);

              const eventTitle = (
                event.title_ar || "معرض تداول"
              )
                .replace(/\s*2026\s*/gi, " ")
                .replace(/\s+/g, " ")
                .trim();

              const eventLocation =
                event.city_ar?.trim() ||
                event.country_ar?.trim() ||
                "سيتم الإعلان عن الموقع";

              return (
                <article
                  key={event.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_44px_rgba(15,23,42,0.08)] sm:rounded-[24px]"
                >
                  {/* TOP ACCENT */}
                  <div
                    className={`h-[4px] ${
                      mediaPartner
                        ? "bg-gradient-to-l from-[#f59e0b] via-[#fbbf24] to-brand-500"
                        : "bg-gradient-to-l from-brand-600 via-brand-400 to-[#93c5fd]"
                    }`}
                  />

                  {/* EVENT HEADER */}
                  <div className="relative min-h-[104px] border-b border-slate-100 bg-gradient-to-b from-[#f5f9ff] to-white px-4 pb-3 pt-3 text-center sm:min-h-[132px] sm:px-5 sm:pb-5 sm:pt-4">
                    <div className="flex min-h-[26px] justify-center">
                      {mediaPartner ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[9px] font-black text-amber-700 shadow-sm sm:text-[10px]">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-[9px]">
                            ✓
                          </span>
                          شريك إعلامي رسمي
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-500 shadow-sm sm:text-[10px]">
                          حدث قادم
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 min-h-[24px] text-[16px] font-black leading-6 text-[#07111f] sm:text-[18px]">
                      {eventTitle}
                    </h3>

                    <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 sm:text-[12px]">
                      <span className="text-brand-500">●</span>
                      <span>{eventLocation}</span>
                    </div>
                  </div>

                  {/* COUNTDOWN */}
                  {count.status === "live" ? (
                    <div className="border-b border-emerald-100 bg-emerald-50 px-4 py-3 text-center">
                      <div className="text-[17px] font-black text-emerald-600 sm:text-[19px]">
                        جاري الآن
                      </div>

                      <div className="mt-0.5 text-[10px] font-bold text-emerald-700">
                        الحدث منعقد حاليًا
                      </div>
                    </div>
                  ) : (
                    <div className="border-b border-slate-100 bg-[#fbfdff] px-4 py-3">
                      <div className="flex items-center justify-center gap-3">
                        <div className="inline-flex min-w-[82px] items-center justify-center gap-1.5 rounded-xl border border-brand-100 bg-white px-3 py-2 shadow-sm">
                          <span
                            dir="ltr"
                            className="text-[18px] font-black text-brand-600 sm:text-[20px]"
                          >
                            {count.days}
                          </span>

                          <span className="text-[10px] font-bold text-slate-500">
                            يوم
                          </span>
                        </div>

                        <div className="inline-flex min-w-[82px] items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                          <span
                            dir="ltr"
                            className="text-[18px] font-black text-slate-700 sm:text-[20px]"
                          >
                            {count.hours}
                          </span>

                          <span className="text-[10px] font-bold text-slate-500">
                            ساعة
                          </span>
                        </div>
                      </div>

                    <div className="mt-2 text-center text-[9px] font-bold text-slate-400">
  الوقت المتبقي
</div>
                    </div>
                  )}

                  {/* EVENT DETAILS */}
                  <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                    <div className="rounded-[16px] border border-slate-100 bg-slate-50/70 px-3 py-3 text-center">
                      <div className="text-[11px] font-black leading-5 text-slate-800 sm:text-[12px]">
                        {formatEventDate(
                          event.start_date,
                          event.end_date
                        )}
                      </div>

                     <div className="mt-1 text-[10px] font-bold leading-5 text-slate-600 sm:text-[11px]">
                        {event.city_ar ||
                          event.country_ar ||
                          "سيتم الإعلان عن الموقع لاحقًا"}

                        {event.city_ar && event.country_ar
                          ? `، ${event.country_ar}`
                          : ""}
                      </div>

                      {event.venue_ar && (
                        <div className="mt-0.5 hidden text-[10px] font-medium leading-5 text-slate-500 sm:block">
                          {event.venue_ar}
                        </div>
                      )}
                    </div>

                    <Link
  href={`/events/${event.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-auto inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 px-4 text-[12px] font-black text-brand-600 transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white sm:min-h-[46px] sm:text-[13px]"
>
  عرض تفاصيل الحدث
  <span className="mr-2 transition group-hover:-translate-x-1">
    ←
  </span>
</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* FAQ - COMPACT HOME SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    {(() => {
      const faqItems = [
        {
          q: "ما أفضل شركة تداول؟",
          a: (
            <>
              لا توجد شركة واحدة تناسب جميع المتداولين. يعتمد الاختيار على قوة
              الترخيص، تكلفة التداول، المنصة، نوع الحساب وطرق الإيداع والسحب.
              ابدأ بمراجعة{" "}
              <Link
                href="/brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-brand-600 hover:underline"
              >
                تقييمات شركات التداول
              </Link>{" "}
              ثم استخدم{" "}
              <Link
                href="/compare"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-brand-600 hover:underline"
              >
                مقارنات الوسطاء
              </Link>{" "}
              لمعرفة الفروقات الفعلية.
            </>
          ),
        },
        {
          q: "كيف أعرف أن شركة التداول مرخصة؟",
          a: (
            <>
              تحقق من اسم الجهة الرقابية ورقم الترخيص في موقع الوسيط، ثم راجع
              السجل الرسمي للجهة الرقابية للتأكد من تطابق الاسم والبيانات. يمكنك
              أيضًا استخدام{" "}
              <Link
                href="/licenses"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-brand-600 hover:underline"
              >
                دليل تراخيص شركات التداول
              </Link>{" "}
              للتعرف على الجهات الرقابية وكيفية التحقق منها.
            </>
          ),
        },
        {
          q: "ما الفرق بين أنواع حسابات التداول؟",
          a: (
            <>
              حساب Standard مناسب غالبًا للمبتدئين، بينما تقدم حسابات Low
              Spread وRaw وECN سبريدًا أقل مع عمولة منفصلة وقد تناسب المتداول
              النشط. أما حساب Cent أو Micro فيناسب التجربة برأس مال صغير. راجع{" "}
              <Link
                href="/lowest-spread-brokers#account-types"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-brand-600 hover:underline"
              >
                مقارنة أنواع حسابات التداول
              </Link>{" "}
              لمعرفة النوع الأنسب لك.
            </>
          ),
        },
        {
          q: "هل السبريد المنخفض يعني أن الشركة أفضل؟",
          a: (
            <>
              ليس دائمًا. يجب النظر إلى العمولة ورسوم التبييت وجودة التنفيذ
              والانزلاق السعري والترخيص، وليس إلى السبريد وحده. تعرّف أكثر على{" "}
              <Link
                href="/learn-trading/spread"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-brand-600 hover:underline"
              >
                معنى السبريد وتكلفة التداول
              </Link>{" "}
              قبل مقارنة الشركات.
            </>
          ),
        },
        {
          q: "هل يمكن فتح حساب تداول إسلامي؟",
          a: (
            <>
              نعم، توفر شركات كثيرة حسابات إسلامية بدون فوائد تبييت، لكن يجب
              قراءة الشروط بعناية لأن بعض الوسطاء قد يطبقون رسومًا بديلة أو
              قيودًا بعد مدة معينة. راجع{" "}
              <Link
                href="/best-brokers/islamic"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-brand-600 hover:underline"
              >
                أفضل شركات التداول الإسلامية
              </Link>{" "}
              لمقارنة الخيارات المتاحة.
            </>
          ),
        },
        {
          q: "ما أهم شيء يجب فحصه قبل الإيداع؟",
          a: (
            <>
              ابدأ بالتحقق من الترخيص، ثم راجع رسوم التداول والسحب، شروط
              الحساب، طرق الدفع وجودة خدمة العملاء. لا تودع قبل قراءة تقييم
              الوسيط ومقارنته ببدائل أخرى. يمكنك استخدام{" "}
              <Link
                href="/how-we-review-brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-brand-600 hover:underline"
              >
                منهجية تقييم الوسطاء
              </Link>{" "}
              لمعرفة المعايير التي يجب فحصها.
            </>
          ),
        },
      ];

      const FAQItem = ({
        item,
        index,
      }: {
        item: (typeof faqItems)[number];
        index: number;
      }) => (
        <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_5px_18px_rgba(15,23,42,0.04)] transition hover:border-brand-200 hover:bg-[#fcfdff] open:border-[#93c5fd]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 sm:px-5 sm:py-4">
            <div className="flex min-w-0 items-center gap-3 text-right">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-[10px] font-black text-brand-600 transition group-open:bg-brand-500 group-open:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-[13.5px] font-black leading-6 text-[#07111f] sm:text-[15px]">
                {item.q}
              </span>
            </div>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[13px] font-black text-brand-500 transition group-open:rotate-180 group-open:bg-brand-500 group-open:text-white">
              ▾
            </span>
          </summary>

          <div className="border-t border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#fcfdff_100%)] px-4 py-4 sm:px-5">
            <div className="text-[12px] font-medium leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
              {item.a}
            </div>
          </div>
        </details>
      );

      return (
        <>
          {/* HEADER */}
          <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-center lg:text-right">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
                  الأسئلة الشائعة
                </span>

                <h2 className="mx-auto mt-3 max-w-[310px] text-[25px] font-black leading-[1.16] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
                  أهم الأسئلة قبل اختيار شركة التداول
                </h2>

                <p className="mx-auto mt-3 max-w-[330px] text-[12px] font-semibold leading-6 text-slate-600 sm:max-w-[850px] sm:text-[15px] sm:leading-8 lg:mx-0">
  إجابات مختصرة عن التراخيص، أنواع الحسابات، السبريد والحساب
  الإسلامي، لمساعدتك قبل فتح حساب التداول.
</p>
              </div>

            </div>
          </div>

          {/* QUESTIONS */}
          <div className="grid gap-3 p-3 sm:p-5 lg:grid-cols-2">
            {faqItems.map((item, index) => (
              <FAQItem key={item.q} item={item} index={index} />
            ))}
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* BEST BROKERS BY NEED - TOP 4 FROM SUPABASE */}
<section className="mx-auto hidden w-full max-w-7xl px-0 pb-0 pt-3 md:block">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
    {(() => {
      const categoryLabels = [
        {
          title: "الأفضل للمبتدئين",
          desc: "سهولة استخدام وحسابات مناسبة للبداية",
          factLabel: "مناسب لـ",
          factValue: "بداية أسهل",
          pageHref: "/best-brokers/beginners",
        },
        {
          title: "الأفضل للسبريد المنخفض",
          desc: "تكلفة تداول مناسبة للسكالبينج والمتداول النشط",
          factLabel: "الميزة",
          factValue: "تكلفة أقل",
          pageHref: "/best-brokers/low-spread",
        },
        {
          title: "الأفضل للحساب الإسلامي",
          desc: "حسابات إسلامية بشروط واضحة للمتداول العربي",
          factLabel: "نوع الحساب",
          factValue: "إسلامي",
          pageHref: "/best-brokers/islamic",
        },
        {
          title: "الأفضل للمنصات",
          desc: "منصات متنوعة وتجربة مناسبة للتداول اليومي",
          factLabel: "المنصات",
          factValue: "خيارات متعددة",
          pageHref: "/best-brokers/mt4-mt5",
        },
      ];

      const topFourBrokers = footerFeaturedBrokers.slice(0, 4);

      return (
        <>
          {/* HEADER */}
          <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-5">
            <div className="flex items-center justify-between gap-8">
              <div className="text-right">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-600 shadow-sm">
                  وسطاء مختارون حسب الاحتياج
                </span>

                <h2 className="mt-3 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] lg:text-[36px]">
                  أفضل الوسطاء حسب احتياجك
                </h2>

                <p className="mt-2 max-w-[820px] text-[13px] font-semibold leading-7 text-slate-600 lg:text-[14px]">
                  نعرض أعلى أربعة وسطاء تقييمًا في بروكر العرب، مع تصنيف واضح
                  يساعدك على فهم الاستخدام الأنسب لكل خيار.
                </p>
              </div>

              <Link
                href="/brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 min-w-[190px] shrink-0 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                عرض جميع الوسطاء
              </Link>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-4 gap-4 bg-white p-5">
            {topFourBrokers.map((broker, index) => {
              const category = categoryLabels[index];

              return (
                <article
                  key={broker.id}
                  className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-[#fbfdff] p-4 shadow-[0_6px_20px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_18px_38px_rgba(15,23,42,0.09)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

                  {/* CATEGORY */}
                  <div className="flex items-start justify-between gap-3 pt-1">
                    <span className="inline-flex min-h-[30px] items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black leading-4 text-brand-600">
                      {category.title}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-[10px] font-black text-brand-600 shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-3 min-h-[42px] text-[11px] font-semibold leading-5 text-slate-500">
                    {category.desc}
                  </p>

                  {/* BROKER */}
                  <Link
                    href={`/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto mt-3 flex h-[78px] w-[104px] items-center justify-center rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition group-hover:border-brand-100"
                  >
                    <img
                      src={broker.logo || ""}
                      alt={broker.name || "شركة تداول"}
                      className="max-h-[68px] max-w-[95%] object-contain transition duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <Link
                    href={`/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block truncate text-center text-[18px] font-black text-slate-950 transition hover:text-brand-500"
                  >
                    {broker.name}
                  </Link>

                  <div className="mt-1 text-center text-[10px] font-bold text-slate-500">
                    تقييم بروكر العرب
                  </div>

                  {/* FACTS */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-center">
                      <div className="text-[9px] font-bold text-slate-400">
                        التقييم
                      </div>

                      <div
                        dir="ltr"
                        className="mt-1 text-[17px] font-black text-brand-600"
                      >
                        {broker.rating?.toFixed(1) ?? "—"}
                        <span className="mr-0.5 text-[9px] text-slate-400">
                          /5
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-center">
                      <div className="text-[9px] font-bold text-slate-400">
                        {category.factLabel}
                      </div>

                      <div className="mt-1 truncate text-[11px] font-black text-[#0f172a]">
                        {category.factValue}
                      </div>
                    </div>
                  </div>

                  {/* CATEGORY LINK */}
                  <Link
                    href={category.pageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[10px] font-black text-brand-600 transition hover:text-brand-700"
                  >
                    <span>عرض جميع الخيارات</span>

                    <span className="transition group-hover:-translate-x-1">
                      ←
                    </span>
                  </Link>

                  {/* ACTIONS */}
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
                    <Link
                      href={`/brokers/${broker.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-2 text-[11px] font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                    >
                      عرض التقييم
                    </Link>

                    <a
                      href={
                        broker.real_account_url ||
                        `/brokers/${broker.slug}`
                      }
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-2 text-[11px] font-black text-white transition hover:bg-brand-600"
                    >
                      فتح حساب
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      );
    })()}
  </div>
</section>

  </div>

{/* BROKERS SIDEBAR - DESKTOP ONLY */}
<aside className="hidden min-h-full pt-4 xl:block">
  <div className="sticky top-24 overflow-hidden rounded-[30px] border border-slate-200 bg-white pb-3 shadow-[0_16px_45px_rgba(15,23,42,0.07)]">

      {/* SIDEBAR HEADER */}
      <div className="border-b border-slate-200 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
              شركات مختارة
            </span>

            <h2 className="mt-2 text-[18px] font-black text-[#07111f]">
  أفضل وسطاء التداول
</h2>
          </div>

          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg shadow-sm">
            🔥
          </span>
        </div>

        <p className="mt-1 text-[10px] font-medium leading-5 text-slate-500">
          تصفح تقييمات مجموعة من أبرز شركات التداول.
        </p>
      </div>

     {/* 7 BROKERS */}
<div className="border-b border-slate-200 bg-white px-3 py-2">
  <div className="space-y-1.5">
    {sidebarBrokers.map((broker, index) => {
      const isFeatured = index === 0;

      return (
        <Link
          key={broker.id}
          href={`/brokers/${broker.slug}`}
          target="_blank"
          rel={isFeatured ? "sponsored noopener noreferrer" : "noopener noreferrer"}
          prefetch={false}
          className={`group relative flex min-h-[74px] items-center justify-between gap-2.5 overflow-hidden rounded-[18px] px-2.5 py-2 transition duration-300 ${
            isFeatured
  ? "border border-brand-300 bg-gradient-to-l from-[#eff6ff] via-white to-[#f8fbff] shadow-[0_12px_32px_rgba(37,99,235,0.16)] hover:border-brand-400 hover:shadow-[0_18px_40px_rgba(37,99,235,0.22)]"
  : "border border-transparent hover:border-slate-200 hover:bg-slate-50"
          }`}
        >
          {/* FEATURED TOP LINE */}
          {isFeatured && (
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#f59e0b] via-[#facc15] to-brand-500" />
          )}

          {/* LOGO */}
<div
  className={`relative flex h-[42px] w-[102px] shrink-0 items-center justify-center rounded-xl border bg-white px-1.5 transition duration-300 ${
    isFeatured
      ? "border-brand-200 shadow-[0_8px_22px_rgba(37,99,235,0.14)]"
      : "border-slate-200 shadow-[0_4px_14px_rgba(15,23,42,0.05)] group-hover:border-brand-200"
  }`}
>
           
            {broker.logo ? (
              <img
                src={broker.logo}
                alt={`شعار ${broker.name}`}
               className={`max-h-[42px] max-w-[100px] object-contain transition duration-300 ${
  isFeatured
    ? "scale-[1.28] group-hover:scale-[1.36]"
    : "scale-[1.18] group-hover:scale-[1.26]"
}`}
                loading="lazy"
              />
            ) : (
              <span className="truncate text-xs font-black text-slate-700">
                {broker.name}
              </span>
            )}
          </div>

        {/* BROKER INFO */}
<div className="min-w-0 flex-1 overflow-visible text-right">
  {isFeatured && (
  <div className="mb-1.5 flex justify-end">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[9px] font-black leading-none text-brand-700 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      شريك مميز
    </span>
  </div>
)}

  <div
    className={`text-[12px] font-black leading-5 transition ${
      isFeatured
        ? "text-brand-700"
        : "text-slate-950 group-hover:text-brand-600"
    }`}
  >
    {broker.name}
  </div>

  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-[#f59e0b]">
  <span>★</span>
  <span>{broker.rating?.toFixed(1) ?? "—"}</span>
</div>
</div>

          {/* ARROW */}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] font-black transition duration-300 group-hover:-translate-x-1 ${
              isFeatured
                ? "bg-brand-500 text-white shadow-[0_8px_18px_rgba(37,99,235,0.25)]"
                : "bg-brand-50 text-brand-500"
            }`}
          >
            ←
          </span>
        </Link>
      );
    })}
  </div>
</div>

           {/* SIDEBAR IMPORTANT LINKS */}
      <div className="space-y-3 px-3 pb-1">

        {/* LICENSES */}
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
          <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-[17px]">
                🛡️
              </span>

              <div className="min-w-0">
                <h3 className="text-[14px] font-black text-[#07111f]">
                  تراخيص شركات التداول
                </h3>

                <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                  تعرّف على أبرز الجهات الرقابية العالمية.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 px-3">
          {[
  {
    code: "FCA",
    title: "الترخيص البريطاني",
    href: "/licenses/fca",
  },
  {
    code: "ASIC",
    title: "الترخيص الأسترالي",
    href: "/licenses/asic",
  },
  {
    code: "DFSA",
    title: "ترخيص دبي المالي",
    href: "/licenses/dfsa",
  },
  {
    code: "CySEC",
    title: "الترخيص القبرصي",
    href: "/licenses/cysec",
  },
  {
    code: "FSCA",
    title: "ترخيص جنوب أفريقيا",
    href: "/licenses/fsca",
  },
].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[50px] items-center justify-between gap-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="inline-flex h-7 min-w-[45px] shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-2 text-[9px] font-black text-emerald-700">
                    {item.code}
                  </span>

                  <span className="truncate text-[11px] font-black text-slate-700 transition group-hover:text-brand-600">
                    {item.title}
                  </span>
                </div>

                <span className="shrink-0 text-[14px] font-black text-slate-300 transition group-hover:-translate-x-1 group-hover:text-brand-500">
                  ←
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/licenses"
            className="flex min-h-[40px] items-center justify-center border-t border-slate-100 bg-emerald-50/50 px-4 text-[10px] font-black text-emerald-700 transition hover:bg-emerald-50"
          >
            عرض جميع التراخيص
            <span className="mr-1.5">←</span>
          </Link>
        </div>

{/* ONEROYAL SPONSORED SIDEBAR AD */}
<div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
  <div className="mb-2 flex items-center justify-between px-1">
    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-black text-slate-500">
      إعلان
    </span>

    <span className="text-[10px] font-bold text-slate-600">
  OneRoyal
</span>
  </div>

  <a
    href="https://vc.cabinet.oneroyal.com/links/go/15855"
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    aria-label="فتح حساب تداول مع OneRoyal"
    className="group block overflow-hidden rounded-[16px] bg-white"
  >
    <img
      src="https://vc.cabinet.oneroyal.com/uploads/public/banners/2023/07/10/f01276aaa41913e28cfa286e7c86f57d.png"
      width="300"
      height="250"
      alt="إعلان OneRoyal"
      title="فتح حساب تداول مع OneRoyal"
      loading="lazy"
      className="mx-auto block h-auto w-full max-w-[300px] object-contain transition duration-300 group-hover:scale-[1.02]"
    />
  </a>

  </div>

{/* TRADING CALCULATORS */}
<div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]"></div>

        {/* FOREX TERMS */}
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
          <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-[17px]">
                📘
              </span>

              <div className="min-w-0">
                <h3 className="text-[14px] font-black text-[#07111f]">
                  مصطلحات تداول مهمة
                </h3>

                <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                  ابدأ بفهم أهم مفاهيم سوق الفوركس.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 px-3">
          {[
  {
    label: "السبريد",
    desc: "تكلفة الفرق بين سعري البيع والشراء",
    href: "/learn-trading/spread",
  },
  {
    label: "الرافعة المالية",
    desc: "كيفية التحكم بصفقات أكبر من رأس المال",
    href: "/learn-trading/leverage",
  },
  {
    label: "الهامش",
    desc: "المبلغ المطلوب لفتح الصفقة",
    href: "/learn-trading/margin",
  },
].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[56px] items-center justify-between gap-3 py-2.5"
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-black text-slate-800 transition group-hover:text-brand-600">
                    {item.label}
                  </div>

                  <div className="mt-0.5 truncate text-[8px] font-semibold text-slate-400">
                    {item.desc}
                  </div>
                </div>

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[12px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                  ←
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/learn-trading"
            className="flex min-h-[40px] items-center justify-center border-t border-slate-100 bg-blue-50/50 px-4 text-[10px] font-black text-brand-600 transition hover:bg-blue-50"
          >
            تصفح مركز تعلم التداول
            <span className="mr-1.5">←</span>
          </Link>
        </div>


        {/* TRADING CALCULATORS */}
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
          <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-[17px]">
                🧮
              </span>

              <div className="min-w-0">
                <h3 className="text-[14px] font-black text-[#07111f]">
                  حاسبات التداول
                </h3>

                <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                  أدوات عملية تساعدك على حساب الصفقة.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 p-3">
           {[
  {
    title: "حاسبة إدارة المخاطر",
    short: "المخاطر",
    href: "/tools/risk-calculator",
  },
  {
    title: "حاسبة قيمة النقطة",
    short: "النقطة",
    href: "/tools/pip-calculator",
  },
  {
    title: "حاسبة الهامش",
    short: "الهامش",
    href: "/tools/margin-calculator",
  },
].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[48px] items-center justify-between gap-3 rounded-[14px] border border-slate-200 bg-[#fbfdff] px-3 py-2 transition hover:border-violet-200 hover:bg-violet-50/40"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="inline-flex h-7 min-w-[48px] shrink-0 items-center justify-center rounded-lg bg-violet-50 px-2 text-[8px] font-black text-violet-700">
                    {item.short}
                  </span>

                  <span className="truncate text-[10px] font-black text-slate-700 transition group-hover:text-violet-700">
                    {item.title}
                  </span>
                </div>

                <span className="shrink-0 text-[13px] font-black text-slate-300 transition group-hover:-translate-x-1 group-hover:text-violet-600">
                  ←
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/tools"
            className="flex min-h-[40px] items-center justify-center border-t border-slate-100 bg-violet-50/50 px-4 text-[10px] font-black text-violet-700 transition hover:bg-violet-50"
          >
            عرض جميع حاسبات التداول
            <span className="mr-1.5">←</span>
          </Link>
        </div>

      </div>

      {/* MULTIBANK SPONSORED SIDEBAR AD */}
<div className="px-3 pt-3">
  <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
    <div className="mb-2 flex items-center justify-between px-1">
      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-black text-slate-500">
        إعلان
      </span>

      <span className="text-[10px] font-bold text-slate-600">
         MultiBank Group
      </span>
    </div>

    <a
      href="https://trade.multibankfx.com/register?ibNum=9951544&utm_source=ib-media-generator&utm_media=300x250&utm_term=9951544"
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      aria-label="فتح حساب تداول حقيقي مع MultiBank Group"
      className="group block overflow-hidden rounded-[16px] bg-[#081528]"
    >
      <img
        src="https://my.multibankfx.com/build/client/images/ib-media/2/ar-300x250.png"
        width="300"
        height="250"
        alt="إعلان MultiBank Group لفتح حساب تداول حقيقي"
        title="فتح حساب تداول حقيقي مع MultiBank Group"
        loading="lazy"
        className="mx-auto block h-auto w-full max-w-[300px] object-contain transition duration-300 group-hover:scale-[1.015]"
      />
    </a>

     </div>
</div>

    </div>
  </aside>

  </div>
</div>

</main>
  );
}