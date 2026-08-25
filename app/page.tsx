import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinder from "@/app/components/BrokerFinder";
import MarketHoursSidebar from "@/app/components/MarketHoursSidebar";

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
  publication_status: string | null;
} | null;

broker_2: {
  name: string | null;
  logo: string | null;
  rating: number | null;
  publication_status: string | null;
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
  .eq("publication_status", "published")
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
      rating,
      publication_status
    ),
    broker_2:broker_2_id (
      name,
      logo,
      rating,
      publication_status
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
    ),
    broker:brokers!inner (
      publication_status
    )
  `)
  .eq("broker.publication_status", "published"),

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
    item.broker_2 &&
    item.broker_1.publication_status === "published" &&
    item.broker_2.publication_status === "published"
);

  const featured = brokers[0] ?? null;
  const countryPages = getCountryPages();
  const typePages = getTypePages();
  const eventList = homeEvents || [];

  const sectionHeaderCtaClass =
  "inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600";

const sectionHeaderCtaWrapClass =
  "hidden shrink-0 lg:flex lg:pb-1";

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
          ? Number(broker.rating).toFixed(2)
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
         <div className="relative mx-auto w-full max-w-[1560px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
           <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_470px] xl:gap-8">
  {/* TEXT */}
 <div className="order-1 text-center lg:pt-1 lg:text-right">
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
    <div className="relative h-full max-w-[430px] lg:mr-[52px]">
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

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
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

  {/* HOW WE RATE - COMPACT PREMIUM */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)]">
    {(() => {
      const ratingItems = [
        {
          num: "01",
          title: "التنظيم وحماية الأموال",
          mobileTitle: "التراخيص والأمان",
          desc: "نراجع قوة التراخيص، الكيان القانوني، وآليات حماية أموال العملاء وشفافية الإجراءات.",
        },
        {
          num: "02",
          title: "تكاليف التداول",
          mobileTitle: "تكاليف التداول",
          desc: "نقارن السبريد والعمولات ورسوم التبييت وأي تكاليف إضافية قد تؤثر على المتداول.",
        },
        {
          num: "03",
          title: "المنصات والتنفيذ",
          mobileTitle: "المنصات والتنفيذ",
          desc: "نقيّم سرعة التنفيذ واستقرار المنصات وسهولة الاستخدام على مختلف الأجهزة.",
        },
        {
          num: "04",
          title: "الإيداع والسحب",
          mobileTitle: "الإيداع والسحب",
          desc: "نراجع سرعة الإيداع والسحب، تنوع وسائل الدفع، والرسوم المرتبطة بالعمليات.",
        },
        {
          num: "05",
          title: "الحساب الإسلامي",
          mobileTitle: "الحساب الإسلامي",
          desc: "نراجع شروط الحساب الإسلامي، القيود، والرسوم المرتبطة به قبل التوصية به.",
        },
        {
          num: "06",
          title: "الدعم وتجربة الاستخدام",
          mobileTitle: "الدعم الفني",
          desc: "نقيّم جودة خدمة العملاء، سهولة فتح الحساب، وتجربة المستخدم بشكل عام.",
        },
      ];

      return (
        <>
          {/* =========================
              DESKTOP
          ========================== */}
          <div className="hidden lg:block">
            {/* HEADER */}
            <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
  <div className="flex items-center justify-between gap-6">

    {/* TEXT */}
    <div className="min-w-0 flex-1 text-right">
      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
        منهجية تقييم الوسطاء
      </span>

      <h2 className="mt-3 text-[36px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f]">
        كيف نقيم شركات التداول؟
      </h2>

      <p className="mt-2.5 w-full text-[15px] font-semibold leading-8 text-slate-600">
        نراجع أهم العوامل التي تؤثر على تجربة المتداول، بدءًا من قوة التنظيم
        وتكاليف التداول وحتى سرعة التنفيذ والسحب والحساب الإسلامي
        وجودة الدعم.
      </p>
    </div>

    {/* CTA */}
    <div className="shrink-0 self-center pl-4 lg:-translate-x-[14px]">
      <Link
        href="/how-we-review-brokers"
        className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
      >
        اطّلع على المنهجية
      </Link>
    </div>

  </div>
</div>

            {/* DESKTOP CARDS */}
            <div className="grid grid-cols-3 gap-3 px-5 py-4">
              {ratingItems.map((item) => (
                <Link
                  key={item.num}
                  href="/how-we-review-brokers"
                  className="group relative min-h-[108px] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)]"
                >
                  {/* TOP ACCENT */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-brand-500 via-[#60a5fa] to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />

                  <div className="flex h-full items-start gap-3.5 pt-0.5">
                    {/* NUMBER */}
                    <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 px-2 text-[11px] font-black text-brand-600 ring-1 ring-[#bfdbfe] transition duration-300 group-hover:bg-brand-500 group-hover:text-white">
                      {item.num}
                    </span>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[18px] font-black leading-6 text-[#07111f]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[12px] font-medium leading-6 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            
          </div>

          {/* =========================
              MOBILE / TABLET
          ========================== */}
          <div className="lg:hidden">
            {/* MOBILE HEADER */}
            <div className="border-b border-slate-100 bg-gradient-to-b from-[#f8fbff] to-[#eef5ff] px-4 py-3.5 text-center">
              <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm">
                منهجية تقييم الوسطاء
              </span>

              <h2 className="mx-auto mt-2.5 max-w-[310px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px]">
  كيف نقيم شركات التداول؟
</h2>

              <p className="mx-auto mt-1.5 max-w-[430px] text-[11px] font-semibold leading-5 text-slate-600 sm:text-[13px] sm:leading-6">
                نراجع أهم العوامل التي تؤثر على تجربة المتداول، من التراخيص
                والتكاليف إلى المنصات والسحب والحساب الإسلامي وجودة الدعم.
              </p>
            </div>

            {/* MOBILE CARDS */}
            <div className="grid grid-cols-2 gap-2 bg-white p-3 sm:gap-2.5 sm:p-4">
              {ratingItems.map((item) => (
                <Link
                  key={item.num}
                  href="/how-we-review-brokers"
                  className="group relative flex min-h-[64px] items-center justify-center overflow-hidden rounded-[14px] border border-slate-200 bg-[#fbfdff] px-2.5 py-2 transition duration-300 hover:border-brand-200 hover:bg-brand-50/30"
                >
                  {/* TOP ACCENT */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-brand-500 via-[#60a5fa] to-transparent opacity-60" />

                  

                  {/* MOBILE TITLE */}
                  <h3 className="whitespace-pre-line text-right text-[12.5px] font-black leading-5 text-[#07111f] sm:text-[15px]">
  {item.mobileTitle}
</h3>
                </Link>
              ))}
            </div>

            {/* MOBILE CTA */}
            <div className="border-t border-slate-100 bg-white px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4">
              <Link
                href="/how-we-review-brokers"
                className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-brand-500 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:bg-brand-600 sm:h-11 sm:text-[12px]"
              >
                اطّلع على منهجية التقييم
              </Link>
            </div>
          </div>
        </>
      );
    })()}
    </div>
</section>

{/* EXNESS PREMIUM BANNER */}
<div className="mx-auto -my-1 flex w-full max-w-7xl justify-center sm:-my-1.5 sm:py-0">
  <a
    href="https://one.exnessonelink.com/intl/ar/a/hhmbah9f13"
    target="_blank"
    rel="sponsored noopener noreferrer"
    aria-label="زيارة Exness"
    className="
      group block w-full max-w-[900px]
      overflow-hidden rounded-[14px]
      border border-slate-200/80
      bg-white p-[5px]
      shadow-[0_8px_24px_rgba(15,23,42,0.075)]
      transition duration-300
      hover:-translate-y-[1px]
      hover:border-slate-300
      hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
      sm:max-w-[820px]
    "
  >
    <img
      src="https://d3dpet1g0ty5ed.cloudfront.net/AR_Trading_Conditions_728x90.png"
      width="728"
      height="90"
      alt="Exness"
      className="block h-auto w-full rounded-[10px] object-contain sm:h-[82px] sm:object-cover"
    />
  </a>
</div>

{/* TOP COMPARISONS - PREMIUM RESPONSIVE */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)]">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5 sm:px-6 lg:py-4">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

        {/* TEXT */}
        <div className="min-w-0 flex-1 text-center lg:text-right">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
            مقارنات الوسطاء
          </span>

          <h2 className="mx-auto mt-2.5 max-w-[310px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
            أشهر مقارنات شركات التداول
          </h2>

          {/* MOBILE DESCRIPTION */}
          <p className="mx-auto mt-2 max-w-[300px] text-[12px] font-semibold leading-6 text-slate-600 sm:hidden">
            قارن بين أشهر الوسطاء من حيث التراخيص والرسوم والحسابات والمنصات.
          </p>

          {/* DESKTOP DESCRIPTION */}
          <p className="mt-2 hidden max-w-[900px] text-[15px] font-semibold leading-8 text-slate-600 sm:block">
            استعرض أشهر مقارنات شركات التداول، وتعرّف على الفروقات
            في التراخيص وأنواع الحسابات والرسوم والمنصات لاختيار الوسيط المناسب.
          </p>
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden shrink-0 lg:flex lg:pb-1">
          <Link
            href="/compare"
            className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
          >
            تصفح جميع المقارنات
          </Link>
        </div>

        {/* MOBILE CTA */}
        <div className="flex justify-center lg:hidden">
          <Link
            href="/compare"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-5 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition hover:bg-brand-600"
          >
            تصفح جميع المقارنات
          </Link>
        </div>
      </div>
    </div>


    {/* =====================================================
        MOBILE - HORIZONTAL SNAP CAROUSEL
    ====================================================== */}
    <div className="md:hidden">
      <div
        className="
          flex snap-x snap-mandatory gap-3
          overflow-x-auto overscroll-x-contain
          px-4 pb-4 pt-3
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {topComparisons.map((cmp, index) => (
          <article
            key={cmp.id}
            className="
              relative w-[88%] min-w-[88%] snap-center
              overflow-hidden rounded-[20px]
              border border-slate-200 bg-white
              shadow-[0_8px_22px_rgba(15,23,42,0.055)]
            "
          >
            {/* TOP LINE */}
            <div className="h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

            <div className="p-3">

              {/* CARD HEADER */}
              <div className="mb-2.5 flex items-center justify-between">
                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-[9px] font-black text-brand-600">
                  مقارنة مختارة
                </span>

                <span
                  dir="ltr"
                  className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-1.5 text-[9px] font-black text-slate-500"
                >
                  #{index + 1}
                </span>
              </div>


              {/* BROKERS */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">

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
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-slate-200 bg-slate-50 p-2"
                  >
                    {cmp.broker_1?.logo ? (
                      <img
                        src={cmp.broker_1.logo}
                        alt={cmp.broker_1.name || "Broker 1"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[9px] text-slate-400">
                        Logo
                      </span>
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
                    className="mt-2 max-w-[100px] truncate text-[14px] font-black leading-5 text-[#0f172a]"
                  >
                    {cmp.broker_1?.name || "Broker 1"}
                  </Link>

                  <span
                    aria-label={`تقييم ${
                      cmp.broker_1?.name || "الوسيط الأول"
                    } ${
                      cmp.broker_1?.rating?.toFixed(2) ?? "غير متوفر"
                    } من 5`}
                    className="mt-0.5 text-[10px] font-bold text-[#f59e0b]"
                  >
                    ★ {cmp.broker_1?.rating?.toFixed(2) ?? "—"}
                  </span>
                </div>


                {/* VS */}
                <div className="flex items-center justify-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[10px] font-black text-brand-600 shadow-sm">
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
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-slate-200 bg-slate-50 p-2"
                  >
                    {cmp.broker_2?.logo ? (
                      <img
                        src={cmp.broker_2.logo}
                        alt={cmp.broker_2.name || "Broker 2"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-[9px] text-slate-400">
                        Logo
                      </span>
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
                    className="mt-2 max-w-[100px] truncate text-[14px] font-black leading-5 text-[#0f172a]"
                  >
                    {cmp.broker_2?.name || "Broker 2"}
                  </Link>

                  <span
                    aria-label={`تقييم ${
                      cmp.broker_2?.name || "الوسيط الثاني"
                    } ${
                      cmp.broker_2?.rating?.toFixed(2) ?? "غير متوفر"
                    } من 5`}
                    className="mt-0.5 text-[10px] font-bold text-[#f59e0b]"
                  >
                    ★ {cmp.broker_2?.rating?.toFixed(2) ?? "—"}
                  </span>
                </div>
              </div>


              {/* FEATURES */}
              <div className="mt-3 text-center text-[9.5px] font-bold text-slate-500">
                الحسابات
                <span className="mx-1.5 text-slate-300">•</span>
                الرسوم
                <span className="mx-1.5 text-slate-300">•</span>
                المنصات
                <span className="mx-1.5 text-slate-300">•</span>
                التراخيص
              </div>


              {/* CTA */}
              <div className="mt-3">
                <Link
                  href={`/compare/${cmp.slug}`}
                  className="flex h-10 w-full items-center justify-center rounded-xl bg-brand-500 px-4 text-[12px] font-black text-white transition hover:bg-brand-600"
                >
                  شاهد المقارنة الكاملة
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>


      {/* SWIPE HINT */}
      {topComparisons.length > 1 && (
        <div className="-mt-1 flex items-center justify-center gap-1.5 pb-3">
          {topComparisons.map((cmp, index) => (
            <span
              key={cmp.id}
              className={
                index === 0
                  ? "h-1.5 w-5 rounded-full bg-brand-500"
                  : "h-1.5 w-1.5 rounded-full bg-slate-300"
              }
            />
          ))}
        </div>
      )}
    </div>


    {/* =====================================================
        DESKTOP / TABLET
    ====================================================== */}
    <div className="hidden gap-3 px-4 pb-4 pt-3 md:grid md:grid-cols-2 xl:grid-cols-3 xl:px-5">
      {topComparisons.map((cmp, index) => (
        <article
          key={cmp.id}
          className="
            group flex h-full flex-col overflow-hidden
            rounded-[20px] border border-slate-200 bg-white
            shadow-[0_5px_18px_rgba(15,23,42,0.04)]
            transition duration-300
            hover:-translate-y-0.5
            hover:border-brand-200
            hover:shadow-[0_14px_28px_rgba(15,23,42,0.07)]
          "
        >
          {/* TOP LINE */}
          <div className="h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

          <div className="flex flex-1 flex-col p-4">

            {/* CARD HEADER */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-[10px] font-black text-brand-600">
                مقارنة مختارة
              </span>

              <span
                dir="ltr"
                className="text-[10px] font-bold text-slate-400"
              >
                #{index + 1}
              </span>
            </div>


            {/* BROKERS */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">

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
                  className="flex h-[64px] w-[64px] items-center justify-center rounded-[17px] border border-slate-200 bg-slate-50 p-2.5 transition hover:border-brand-100 hover:bg-brand-50 xl:h-[68px] xl:w-[68px]"
                >
                  {cmp.broker_1?.logo ? (
                    <img
                      src={cmp.broker_1.logo}
                      alt={cmp.broker_1.name || "Broker 1"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-[9px] text-slate-400">
                      Logo
                    </span>
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
                  className="mt-2.5 max-w-[120px] truncate text-[16px] font-black leading-none text-[#0f172a] transition hover:text-brand-500"
                >
                  {cmp.broker_1?.name || "Broker 1"}
                </Link>

                <span
                  aria-label={`تقييم ${
                    cmp.broker_1?.name || "الوسيط الأول"
                  } ${
                    cmp.broker_1?.rating?.toFixed(2) ?? "غير متوفر"
                  } من 5`}
                  className="mt-1 text-[10px] font-bold text-[#f59e0b]"
                >
                  ★ {cmp.broker_1?.rating?.toFixed(2) ?? "—"}
                </span>
              </div>


              {/* VS */}
              <div className="flex items-center justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[11px] font-black text-brand-600 shadow-sm">
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
                  className="flex h-[64px] w-[64px] items-center justify-center rounded-[17px] border border-slate-200 bg-slate-50 p-2.5 transition hover:border-brand-100 hover:bg-brand-50 xl:h-[68px] xl:w-[68px]"
                >
                  {cmp.broker_2?.logo ? (
                    <img
                      src={cmp.broker_2.logo}
                      alt={cmp.broker_2.name || "Broker 2"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-[9px] text-slate-400">
                      Logo
                    </span>
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
                  className="mt-2.5 max-w-[120px] truncate text-[16px] font-black leading-none text-[#0f172a] transition hover:text-brand-500"
                >
                  {cmp.broker_2?.name || "Broker 2"}
                </Link>

                <span
                  aria-label={`تقييم ${
                    cmp.broker_2?.name || "الوسيط الثاني"
                  } ${
                    cmp.broker_2?.rating?.toFixed(2) ?? "غير متوفر"
                  } من 5`}
                  className="mt-1 text-[10px] font-bold text-[#f59e0b]"
                >
                  ★ {cmp.broker_2?.rating?.toFixed(2) ?? "—"}
                </span>
              </div>
            </div>


            {/* FEATURES */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex min-h-[44px] items-center justify-center rounded-xl bg-brand-50 px-2.5 py-2 text-center text-[10px] font-bold leading-4 text-brand-700">
                مقارنة الحسابات والرسوم
              </div>

              <div className="flex min-h-[44px] items-center justify-center rounded-xl bg-slate-50 px-2.5 py-2 text-center text-[10px] font-bold leading-4 text-slate-600 ring-1 ring-slate-200">
                مقارنة المنصات والتراخيص
              </div>
            </div>


            {/* CTA */}
            <div className="mt-auto pt-3">
              <Link
                href={`/compare/${cmp.slug}`}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-500 px-4 text-[13px] font-black text-white transition hover:bg-brand-600"
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

{/* =========================================================
    COUNTRIES DIRECTORY - COMPACT PREMIUM
========================================================= */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">

  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)] sm:rounded-[28px]">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3 sm:px-5 lg:px-6">

      <div className="flex flex-col items-center gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-5">

        {/* TEXT */}
        <div className="min-w-0 flex-1 text-center lg:text-right">

          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[11px] lg:text-[12px]">
            حسب الدولة
          </span>


          <h2 className="mx-auto mt-2 max-w-[310px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[32px] lg:mx-0 lg:text-[34px]">
            أفضل شركات التداول حسب الدولة
          </h2>


          {/* MOBILE DESCRIPTION */}
          <p className="mx-auto mt-2 max-w-[305px] text-[11px] font-semibold leading-5 text-slate-600 md:hidden">
            اختر بلدك للوصول إلى الوسطاء المناسبين من حيث التراخيص والحسابات وطرق الدفع.
          </p>


          {/* DESKTOP DESCRIPTION */}
          <p className="mt-1.5 hidden max-w-[900px] text-[13px] font-semibold leading-6 text-slate-600 md:block lg:text-[14px]">
            استعرض أفضل شركات التداول حسب الدولة، وقارن الوسطاء من حيث التراخيص،
            الحساب الإسلامي، وسائل الإيداع والسحب، وسهولة فتح الحساب.
          </p>

        </div>


        {/* CTA */}
        <div className="shrink-0 self-center lg:pl-4 lg:-translate-x-[14px]">

          <Link
            href="/best-brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 min-w-[160px] items-center justify-center rounded-xl bg-brand-500 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 sm:h-11 sm:min-w-[180px] sm:px-5 sm:text-[13px]"
          >
            عرض جميع الدول
          </Link>

        </div>

      </div>

    </div>


    {/* =====================================================
        MOBILE
        12 COUNTRIES + CENTERED OTHER COUNTRIES
    ====================================================== */}
    <div className="p-2 md:hidden">

      <div className="grid grid-cols-2 gap-1.5">

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

          {
            title: "أفضل شركات التداول في اليمن",
            href: "/best-brokers/yemen",
            desc: "أفضل الخيارات المتاحة للمتداولين في اليمن",
            shortDesc: "وسطاء متاحون وخيارات حساب مناسبة",
            flag: "https://flagcdn.com/w80/ye.png",
            badge: "اليمن",
          },

        ].map((item) => (

          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`أفضل شركات التداول في ${item.badge}`}
            className="group flex h-[52px] items-center rounded-[11px] border border-slate-200 bg-white px-2 shadow-[0_2px_7px_rgba(15,23,42,0.03)] transition duration-300 hover:border-brand-200 hover:bg-[#f8fbff]"
          >

            <div className="flex w-full items-center justify-between gap-1.5">

              <div className="flex min-w-0 items-center gap-1.5">

                {/* FLAG */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">

                  <img
                    src={item.flag}
                    alt={item.badge}
                    className="h-5 w-5 rounded-full object-cover"
                  />

                </div>


                {/* COUNTRY NAME */}
                <h3 className="truncate text-[13px] font-black leading-5 text-[#0f172a]">
                  {item.badge}
                </h3>

              </div>


              {/* ARROW */}
              <span className="shrink-0 text-[14px] font-black leading-none text-brand-500 transition group-hover:-translate-x-[2px]">
                ←
              </span>

            </div>

          </Link>

        ))}

      </div>


      {/* =================================================
          OTHER COUNTRIES - MOBILE CENTERED
      ================================================= */}
      <div className="mt-1.5 flex justify-center">

        <Link
          href="/best-brokers"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[52px] w-[calc(50%-3px)] min-w-[145px] items-center rounded-[11px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-2 shadow-[0_2px_7px_rgba(37,99,235,0.04)] transition duration-300 hover:bg-brand-50"
        >

          <div className="flex w-full items-center justify-between gap-1.5">

            <div className="flex min-w-0 items-center gap-1.5">

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white text-[13px] shadow-sm">
                🌍
              </div>


              <h3 className="truncate text-[13px] font-black leading-5 text-[#0f172a]">
                دول أخرى
              </h3>

            </div>


            <span className="shrink-0 text-[14px] font-black leading-none text-brand-500 transition group-hover:-translate-x-[2px]">
              ←
            </span>

          </div>

        </Link>

      </div>

    </div>


    {/* =====================================================
        DESKTOP / TABLET
        12 COUNTRIES
    ====================================================== */}
    <div className="hidden p-3 md:block lg:p-3.5">

      <div className="grid gap-2.5 md:grid-cols-2 lg:gap-3">

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

          {
            title: "أفضل شركات التداول في اليمن",
            href: "/best-brokers/yemen",
            desc: "أفضل الخيارات في اليمن",
            shortDesc: "وسطاء مناسبون للمتداول اليمني",
            flag: "https://flagcdn.com/w80/ye.png",
            badge: "اليمن",
          },

        ].map((item) => (

          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`أفضل شركات التداول في ${item.badge}`}
            className="group min-h-[68px] rounded-[15px] border border-slate-200 bg-white px-3 py-2 shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_12px_26px_rgba(37,99,235,0.10)]"
          >

            <div className="flex min-h-[52px] items-center gap-2.5">

              {/* FLAG */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-[#f8fafc] shadow-sm">

                <img
                  src={item.flag}
                  alt={item.badge}
                  className="h-6 w-6 rounded-full object-cover"
                />

              </div>


              {/* CONTENT */}
              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">

                  <h3 className="truncate text-[16px] font-black leading-5 text-[#0f172a]">
                    {item.title}
                  </h3>


                  <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-extrabold text-brand-600">
                    {item.badge}
                  </span>

                </div>


                <p className="mt-0.5 line-clamp-1 text-[11px] font-medium leading-4 text-slate-500">
                  {item.shortDesc ?? item.desc}
                </p>

              </div>


              {/* ACTION */}
              <div className="shrink-0 text-left">

                <div className="text-[9px] font-bold text-slate-400">
                  افتح الصفحة
                </div>


                <div className="mt-0.5 text-[16px] font-black leading-none text-brand-500 transition duration-300 group-hover:translate-x-[-3px]">
                  ←
                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>


      {/* =================================================
          OTHER COUNTRIES - DESKTOP CENTERED
      ================================================= */}
      <div className="mt-2.5 flex justify-center">

        <Link
          href="/best-brokers"
          target="_blank"
          rel="noopener noreferrer"
          className="group min-h-[70px] w-full max-w-[610px] rounded-[16px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-3 py-2 shadow-[0_2px_8px_rgba(37,99,235,0.04)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-50/40 hover:shadow-[0_10px_24px_rgba(37,99,235,0.07)]"
        >

          <div className="flex min-h-[52px] items-center gap-2.5">

            {/* ICON */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white text-[16px] shadow-sm">
              🌍
            </div>


            {/* CONTENT */}
            <div className="min-w-0 flex-1">

              <h3 className="text-[15px] font-black leading-5 text-[#0f172a]">
                كل الدول الأخرى
              </h3>


              <p className="mt-0.5 truncate text-[11px] font-medium leading-4 text-slate-500">
                اختر من الصفحة العامة إذا لم تجد بلدك ضمن القائمة
              </p>

            </div>


            {/* ACTION */}
            <div className="shrink-0 text-left">

              <div className="text-[9px] font-bold text-brand-500">
                تصفح الكل
              </div>


              <div className="mt-0.5 text-[16px] font-black leading-none text-brand-500 transition duration-300 group-hover:translate-x-[-3px]">
                ←
              </div>

            </div>

          </div>

        </Link>

      </div>

    </div>

  </div>

</section>

{/* PEPPERSTONE PREMIUM BANNER */}
<div className="mx-auto -my-1 flex w-full max-w-7xl justify-center sm:-my-1.5 sm:py-0">
  <a
    href="https://track.pepperstonepartners.com/visit/?bta=44176&nci=6687"
    target="_blank"
    rel="sponsored noopener noreferrer"
    aria-label="زيارة Pepperstone"
    className="
      group block w-full max-w-[900px]
      overflow-hidden rounded-[14px]
      border border-slate-200/80
      bg-white p-[5px]
      shadow-[0_8px_24px_rgba(15,23,42,0.075)]
      transition duration-300
      hover:-translate-y-[1px]
      hover:border-slate-300
      hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
      sm:max-w-[820px]
    "
  >
    <img
      src="https://pepperstonepartners.ck-cdn.com/tn/serve/?cid=687946"
      width="728"
      height="90"
      alt="Pepperstone"
      className="block h-auto w-full rounded-[10px] object-contain sm:h-[82px] sm:object-cover"
    />
  </a>
</div>

{/* ACCOUNT TYPES HOME SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)]">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5 sm:px-6 lg:py-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

        {/* TEXT */}
        <div className="min-w-0 flex-1 text-center lg:text-right">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[11px] lg:text-[12px]">
            أنواع حسابات التداول
          </span>

          <h2 className="mx-auto mt-2.5 max-w-[335px] text-[24px] font-black leading-[1.32] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
            اختر نوع الحساب المناسب لأسلوب تداولك
          </h2>

          {/* MOBILE DESCRIPTION */}
          <p className="mx-auto mt-2 max-w-[305px] text-[11px] font-semibold leading-5 text-slate-600 sm:hidden">
            قارن بين الحسابات الشائعة واختر النوع الأنسب لخبرتك ورأس مالك.
          </p>

          {/* DESKTOP DESCRIPTION */}
          <p className="mt-2 hidden whitespace-nowrap text-[14px] font-semibold leading-6 text-slate-600 sm:block lg:text-[15px]">
            تعرّف على مزايا حسابات التداول المختلفة، وقارن بين Standard و Raw Spread و ECN و Cent لاختيار الحساب الأنسب لخبرتك ورأس مالك.
          </p>
        </div>

        {/* CTA */}
        <div className="shrink-0 self-center pl-4 lg:-translate-x-[14px]">
          <Link
            href="/lowest-spread-brokers"
            className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
          >
            قارن أنواع الحسابات
          </Link>
        </div>

      </div>
    </div>

    {/* =====================================================
        MOBILE
    ====================================================== */}
    <div className="p-2.5 sm:hidden">
      <div className="grid gap-2.5">
        {[
          {
            title: "حسابات Standard",
            suitable: "للمبتدئين والتداول اليومي",
            desc: "رسوم واضحة وبدون تعقيد كبير.",
            badge: "سهولة البدء",
            href: "/best-brokers/accounts/standard",
          },
          {
            title: "حسابات Raw Spread",
            suitable: "للسكالبينج والمتداول النشط",
            desc: "سبريد يبدأ من 0.0 نقطة مع عمولة ثابتة.",
            badge: "أقل سبريد",
            href: "/best-brokers/accounts/raw-spread",
          },
          {
            title: "حسابات ECN",
            suitable: "للمتداولين المحترفين",
            desc: "تنفيذ سريع ووصول مباشر للسيولة.",
            badge: "تنفيذ احترافي",
            href: "/lowest-spread-brokers",
          },
          {
            title: "حسابات Cent / Micro",
            suitable: "للتجربة برأس مال صغير",
            desc: "أحجام تداول صغيرة لاختبار استراتيجيتك.",
            badge: "رأس مال صغير",
            href: "/best-brokers/accounts/cent",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-[15px] border border-slate-200 bg-white px-3 py-2.5 shadow-[0_3px_10px_rgba(15,23,42,0.035)] transition duration-300 hover:border-brand-200 hover:bg-[#fbfdff]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1 text-right">

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-[9px] font-black text-brand-600">
                    {item.badge}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                    ←
                  </span>
                </div>

                <h3 className="mt-1.5 text-[15px] font-black leading-5 text-[#07111f]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] font-black leading-5 text-brand-600">
                  {item.suitable}
                </p>

                <p className="mt-0.5 text-[10.5px] font-semibold leading-5 text-slate-500">
                  {item.desc}
                </p>

              </div>
            </div>

            <div className="mt-1.5 flex items-center justify-between border-t border-slate-100 pt-1.5 text-[9.5px] font-extrabold text-brand-500">
              <span>
                قارن الوسطاء الذين يقدمون هذا الحساب
              </span>

              <span className="shrink-0 transition group-hover:-translate-x-1">
                ←
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>

    {/* =====================================================
        DESKTOP / TABLET
    ====================================================== */}
    <div className="hidden px-4 pb-4 pt-3 sm:block lg:px-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "حسابات Standard",
            suitable: "مناسبة للمبتدئين والتداول اليومي",
            desc: "حسابات سهلة بتكلفة واضحة وبدون تعقيد في العمولات.",
            badge: "سهولة البدء",
            href: "/best-brokers/accounts/standard",
          },
          {
            title: "حسابات Raw Spread",
            suitable: "مناسبة للسكالبينج والمتداول النشط",
            desc: "سبريد يبدأ من 0.0 نقطة مع عمولة ثابتة لتنفيذ احترافي.",
            badge: "أقل سبريد",
            href: "/best-brokers/accounts/raw-spread",
          },
          {
            title: "حسابات ECN",
            suitable: "مناسبة للمتداولين المحترفين",
            desc: "تنفيذ سريع ووصول مباشر للسيولة مع تسعير أكثر تنافسية.",
            badge: "تنفيذ احترافي",
            href: "/lowest-spread-brokers",
          },
          {
            title: "حسابات Cent / Micro",
            suitable: "مناسبة للتجربة برأس مال صغير",
            desc: "أحجام تداول صغيرة لاختبار الاستراتيجيات وتقليل المخاطر.",
            badge: "رأس مال صغير",
            href: "/best-brokers/accounts/cent",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[220px] flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_12px_28px_rgba(37,99,235,0.09)]"
          >

            {/* TOP */}
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                {item.badge}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                ←
              </span>
            </div>

            {/* TITLE */}
            <h3 className="mt-3 text-[18px] font-black leading-6 text-[#07111f]">
              {item.title}
            </h3>

            {/* SUITABLE */}
            <p className="mt-1.5 min-h-[36px] text-[12.5px] font-black leading-6 text-brand-600">
              {item.suitable}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-1 min-h-[44px] text-[11.5px] font-medium leading-6 text-slate-600">
              {item.desc}
            </p>

            {/* BOTTOM CTA */}
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[10px] font-extrabold leading-5 text-brand-500">
              <span>
                قارن الوسطاء الذين يقدمون هذا الحساب
              </span>

              <span className="shrink-0 transition group-hover:-translate-x-1">
                ←
              </span>
            </div>

          </Link>
        ))}
      </div>
    </div>

  </div>
</section>

{/* WHY TRUST BROKER ALARAB */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)]">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5 sm:px-6 lg:py-4">
      <div className="text-center lg:text-right">

        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[11px] lg:text-[12px]">
          لماذا بروكر العرب؟
        </span>

        <h2 className="mx-auto mt-2.5 max-w-[330px] text-[25px] font-black leading-[1.12] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
          لماذا يثق المتداولون في بروكر العرب؟
        </h2>

        {/* MOBILE DESCRIPTION */}
        <p className="mx-auto mt-2 max-w-[305px] text-[11px] font-semibold leading-5 text-slate-600 sm:hidden">
          نساعدك على مقارنة الوسطاء وفهم التراخيص والرسوم والحسابات بشكل أوضح.
        </p>

        {/* DESKTOP DESCRIPTION */}
        <p className="mt-2 hidden whitespace-nowrap text-[14px] font-semibold leading-6 text-slate-600 sm:block lg:text-[15px]">
          نساعد المتداول العربي على اختيار وسيط مناسب من خلال مراجعات واضحة ومقارنات عملية تركز على الترخيص والرسوم والحسابات وطرق الإيداع والسحب.
        </p>
      </div>
    </div>


    {/* =====================================================
        MOBILE
    ====================================================== */}
    <div className="grid gap-2.5 p-2.5 sm:hidden">
      {[
        {
          title: "مراجعات واضحة",
          desc: "نضع أهم معلومات الوسيط في مكان واحد.",
        },
        {
          title: "مقارنات تساعدك",
          desc: "نوضح الفروقات المهمة بين الوسطاء بسرعة.",
        },
        {
          title: "احتياجات المتداول العربي",
          desc: "نركز على الحساب الإسلامي والدعم وطرق الدفع.",
        },
        {
          title: "وصول أسرع للخيار المناسب",
          desc: "نرتب الوسطاء حسب الدولة ونوع الحساب.",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="rounded-[14px] border border-slate-200 bg-[#fbfdff] px-3 py-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.035)]"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white text-[10px] font-black text-brand-600">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1 text-right">
              <h3 className="text-[14px] font-black leading-5 text-[#0f172a]">
                {item.title}
              </h3>

              <p className="mt-0.5 text-[10.5px] font-semibold leading-5 text-slate-500">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>


    {/* =====================================================
        DESKTOP / TABLET
    ====================================================== */}
    <div className="hidden px-4 pb-4 pt-3 sm:block lg:px-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "مراجعات منظمة وواضحة",
            desc: "نجمع أهم بيانات الوسيط مثل الترخيص والرسوم والحسابات والمنصات وطرق الإيداع والسحب في مكان واحد.",
            tag: "تقييمات",
          },
          {
            title: "مقارنات تساعدك على القرار",
            desc: "نوضح الفروقات العملية بين الوسطاء حتى تعرف أي شركة أقرب لاحتياجاتك بدل الاعتماد على الانطباع العام.",
            tag: "مقارنات",
          },
          {
            title: "تركيز على احتياجات العرب",
            desc: "نراجع عوامل مهمة مثل الحساب الإسلامي والدعم العربي ومرونة الإيداع والسحب في الدول العربية.",
            tag: "للمنطقة",
          },
          {
            title: "وصول أسرع للخيار المناسب",
            desc: "نرتب الوسطاء حسب الدولة ونوع الحساب والرسوم حتى تصل بسرعة إلى الخيار الأقرب لأسلوبك.",
            tag: "اختيار أسهل",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_12px_28px_rgba(37,99,235,0.09)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-55" />

            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-[10px] font-black text-brand-500">
                {item.tag}
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[11px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                {index + 1}
              </span>
            </div>

            <h3 className="text-[17px] font-black leading-6 tracking-[-0.02em] text-[#07111f]">
              {item.title}
            </h3>

            <p className="mt-2 text-[11.5px] font-medium leading-6 text-slate-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

{/* FOREX & FINTECH EVENTS - COMPACT PREMIUM */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)]">
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
          {/* =====================================================
              HEADER
          ====================================================== */}
          <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5 sm:px-6 lg:py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

              <div className="min-w-0 flex-1 text-center lg:text-right">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[11px] lg:text-[12px]">
                  معارض ومؤتمرات التداول
                </span>

                <h2 className="mx-auto mt-2.5 max-w-[315px] text-[25px] font-black leading-[1.12] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
                  أهم معارض ومؤتمرات الفوركس في 2026
                </h2>

                {/* MOBILE DESCRIPTION */}
                <p className="mx-auto mt-2 max-w-[305px] text-[11px] font-semibold leading-5 text-slate-600 sm:hidden">
                  تابع أبرز معارض الفوركس والتكنولوجيا المالية والأحداث التي يشارك فيها بروكر العرب.
                </p>

                {/* DESKTOP DESCRIPTION */}
                <p className="mt-2 hidden whitespace-nowrap text-[14px] font-semibold leading-6 text-slate-600 sm:block lg:text-[15px]">
                  تابع أبرز معارض الفوركس والتكنولوجيا المالية، وتعرّف على الأحداث التي يشارك فيها بروكر العرب بصفته شريكًا إعلاميًا رسميًا.
                </p>
              </div>

              {/* CTA - SAME ALIGNMENT AS OTHER SECTIONS */}
              <div className="shrink-0 self-center pl-4 lg:-translate-x-[14px]">
                <Link
                  href="/events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                >
                  عرض جميع المعارض
                </Link>
              </div>
            </div>
          </div>


          {/* =====================================================
              EVENTS
          ====================================================== */}
          <div className="grid gap-2.5 p-2.5 md:grid-cols-3 lg:gap-3 lg:p-4">
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
                  className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] sm:rounded-[20px]"
                >
                  {/* TOP ACCENT */}
                  <div
                    className={`h-[3px] ${
                      mediaPartner
                        ? "bg-gradient-to-l from-[#f59e0b] via-[#fbbf24] to-brand-500"
                        : "bg-gradient-to-l from-brand-600 via-brand-400 to-[#93c5fd]"
                    }`}
                  />


                  {/* =================================================
                      EVENT HEADER
                  ================================================= */}
                  <div className="relative border-b border-slate-100 bg-gradient-to-b from-[#f5f9ff] to-white px-3 pb-2.5 pt-2.5 text-center sm:px-4 sm:pb-3 sm:pt-3">

                    <div className="flex min-h-[22px] justify-center">
                      {mediaPartner ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[8.5px] font-black text-amber-700 shadow-sm sm:text-[9px]">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-[8px]">
                            ✓
                          </span>
                          شريك إعلامي رسمي
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-0.5 text-[8.5px] font-black text-brand-500 shadow-sm sm:text-[9px]">
                          حدث قادم
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-[15px] font-black leading-5 text-[#07111f] sm:text-[16px]">
                      {eventTitle}
                    </h3>

                    <div className="mt-0.5 flex items-center justify-center gap-1 text-[10px] font-bold text-slate-500 sm:text-[11px]">
                      <span className="text-brand-500">●</span>
                      <span>{eventLocation}</span>
                    </div>
                  </div>


                  {/* =================================================
                      COUNTDOWN
                  ================================================= */}
                  {count.status === "live" ? (
                    <div className="border-b border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
                      <div className="text-[15px] font-black text-emerald-600 sm:text-[17px]">
                        جاري الآن
                      </div>

                      <div className="mt-0.5 text-[9px] font-bold text-emerald-700">
                        الحدث منعقد حاليًا
                      </div>
                    </div>
                  ) : (
                    <div className="border-b border-slate-100 bg-[#fbfdff] px-3 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <div className="inline-flex min-w-[70px] items-center justify-center gap-1 rounded-xl border border-brand-100 bg-white px-2.5 py-1.5 shadow-sm">
                          <span
                            dir="ltr"
                            className="text-[16px] font-black text-brand-600 sm:text-[18px]"
                          >
                            {count.days}
                          </span>

                          <span className="text-[9px] font-bold text-slate-500">
                            يوم
                          </span>
                        </div>

                        <div className="inline-flex min-w-[70px] items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm">
                          <span
                            dir="ltr"
                            className="text-[16px] font-black text-slate-700 sm:text-[18px]"
                          >
                            {count.hours}
                          </span>

                          <span className="text-[9px] font-bold text-slate-500">
                            ساعة
                          </span>
                        </div>
                      </div>

                      <div className="mt-1 text-center text-[8.5px] font-bold text-slate-400">
                        الوقت المتبقي
                      </div>
                    </div>
                  )}


                  {/* =================================================
                      EVENT DETAILS
                  ================================================= */}
                  <div className="flex flex-1 flex-col p-2.5 sm:p-3">

                    <div className="rounded-[13px] border border-slate-100 bg-slate-50/70 px-2.5 py-2 text-center">
                      <div className="text-[10px] font-black leading-5 text-slate-800 sm:text-[11px]">
                        {formatEventDate(
                          event.start_date,
                          event.end_date
                        )}
                      </div>

                      <div className="mt-0.5 text-[9px] font-bold leading-4 text-slate-600 sm:text-[10px]">
                        {event.city_ar ||
                          event.country_ar ||
                          "سيتم الإعلان عن الموقع لاحقًا"}

                        {event.city_ar && event.country_ar
                          ? `، ${event.country_ar}`
                          : ""}
                      </div>

                      {event.venue_ar && (
                        <div className="mt-0.5 hidden text-[9px] font-medium leading-4 text-slate-500 sm:block">
                          {event.venue_ar}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/events/${event.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-[38px] w-full items-center justify-center rounded-xl border border-brand-200 bg-brand-50 px-3 text-[11px] font-black text-brand-600 transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white sm:min-h-[40px] sm:text-[12px]"
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


{/* BEST BROKERS BY NEED - DESKTOP + MOBILE TOP 10 */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)]">
    {(() => {
      /* =====================================================
          DATA
      ====================================================== */

      /* DESKTOP - KEEP CURRENT TOP 4 */
      const topFourBrokers = footerFeaturedBrokers.slice(0, 4);

      const categoryLabels = [
  {
    title: "الأفضل للمبتدئين",
    desc: "سهولة استخدام وحسابات مناسبة للبداية",
    factLabel: "مناسب لـ",
    factValue: "بداية أسهل",
    pageHref: "/best-brokers",
  },
  {
    title: "الأفضل للسبريد المنخفض",
    desc: "تكلفة تداول مناسبة للسكالبينج والمتداول النشط",
    factLabel: "الميزة",
    factValue: "تكلفة أقل",
    pageHref: "/lowest-spread-brokers",
  },
  {
    title: "الأفضل للحساب الإسلامي",
    desc: "حسابات إسلامية بشروط واضحة للمتداول العربي",
    factLabel: "نوع الحساب",
    factValue: "إسلامي",
    pageHref: "/islamic-forex-brokers",
  },
  {
    title: "الأفضل للمنصات",
    desc: "منصات متعددة وتجربة مناسبة للتداول اليومي",
    factLabel: "المنصات",
    factValue: "خيارات متعددة",
    pageHref: "/brokers",
  },
];

      /* MOBILE - TOP 10 BY RATING */
      const mobileTopBrokers = [...footerFeaturedBrokers]
  .filter(
    (broker) =>
      broker &&
      broker.slug &&
      broker.name &&
      broker.logo
  )
  .sort(
    (a, b) =>
      Number(b.rating || 0) - Number(a.rating || 0)
  )
  .slice(0, 10);

      return (
        <>
          {/* =====================================================
              MOBILE ONLY
          ====================================================== */}
          <div className="sm:hidden">
            {/* MOBILE HEADER */}
            <div className="border-b border-slate-100 bg-gradient-to-b from-[#f8fbff] to-[#eef5ff] px-4 pb-3 pt-3.5 text-center">
              <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm">
                الأعلى تقييمًا
              </span>

              <h2 className="mx-auto mt-2 max-w-[310px] text-[24px] font-black leading-[1.12] tracking-[-0.02em] text-[#07111f]">
                أفضل الوسطاء في بروكر العرب
              </h2>

              <p className="mx-auto mt-1.5 max-w-[300px] text-[10.5px] font-semibold leading-5 text-slate-500">
                استعرض أعلى الوسطاء تقييمًا واسحب لرؤية المزيد.
              </p>

              <Link
                href="/brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex h-9 items-center justify-center rounded-xl bg-brand-500 px-5 text-[10.5px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition hover:bg-brand-600"
              >
                عرض جميع الوسطاء
              </Link>
            </div>

            {/* MOBILE HORIZONTAL CAROUSEL */}
            <div
              className="
                flex snap-x snap-mandatory gap-2.5
                overflow-x-auto overscroll-x-contain
                px-3 pb-3 pt-3
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {mobileTopBrokers.map((broker, index) => (
                <article
                  key={broker.id}
                  className="
                    group relative
                    w-[145px] min-w-[145px]
                    snap-start
                    overflow-hidden
                    rounded-[16px]
                    border border-slate-200
                    bg-white
                    px-3 pb-3 pt-3
                    shadow-[0_4px_14px_rgba(15,23,42,0.04)]
                  "
                >
                  {/* TOP LINE */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

                  {/* RANK */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[8px] font-black text-brand-600">
                      #{index + 1}
                    </span>

                    <span
                      dir="ltr"
                      className="text-[10px] font-black text-[#f59e0b]"
                    >
                      ★ {broker.rating?.toFixed(2) ?? "—"}
                    </span>
                  </div>

                  {/* LOGO */}
                  <Link
                    href={`/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto mt-2.5 flex h-[58px] w-[78px] items-center justify-center rounded-[14px] border border-slate-200 bg-[#fbfdff] p-2 shadow-sm"
                  >
                    <img
                      src={broker.logo || ""}
                      alt={broker.name || "شركة تداول"}
                      className="max-h-[48px] max-w-[95%] object-contain"
                    />
                  </Link>

                  {/* NAME */}
                  <Link
                    href={`/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block truncate text-center text-[13px] font-black text-[#07111f]"
                  >
                    {broker.name}
                  </Link>

                  <div className="mt-0.5 text-center text-[8.5px] font-bold text-slate-400">
                    تقييم بروكر العرب
                  </div>

                  {/* REVIEW */}
                  <Link
                    href={`/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 flex h-8 w-full items-center justify-center rounded-lg bg-brand-500 px-2 text-[10px] font-black text-white transition hover:bg-brand-600"
                  >
                    عرض التقييم
                  </Link>
                </article>
              ))}
            </div>

            {/* MOBILE SWIPE HINT */}
            {mobileTopBrokers.length > 2 && (
              <div className="-mt-0.5 flex items-center justify-center gap-1.5 pb-3">
                <span className="h-1.5 w-5 rounded-full bg-brand-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </div>
            )}
          </div>


          {/* =====================================================
              DESKTOP / TABLET
              YOUR CURRENT DESIGN - UNCHANGED
          ====================================================== */}
          <div className="hidden sm:block">
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
                          {broker.rating?.toFixed(2) ?? "—"}

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
<div className="border-b border-slate-200 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">

  <div className="flex items-center gap-3">

    {/* BROKER RADAR ICON */}
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

      {/* DARK OUTER SHELL */}
      <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

      {/* OUTER BLUE RING */}
      <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

      {/* INNER FACE */}
      <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

      {/* RADAR RINGS */}
      <div className="absolute inset-[11px] rounded-full border border-blue-300/25" />

      <div className="absolute inset-[16px] rounded-full border border-blue-300/25" />

      {/* CROSS AXIS */}
      <span className="absolute left-1/2 top-[8px] h-[32px] w-px -translate-x-1/2 bg-white/10" />

      <span className="absolute left-[8px] top-1/2 h-px w-[32px] -translate-y-1/2 bg-white/10" />

      {/* RADAR SWEEP */}
      <span className="absolute right-[7px] top-[7px] h-[18px] w-[18px] rounded-tr-full border-r-[3px] border-t-[3px] border-blue-400" />

      {/* VERIFIED CENTER */}
      <div className="relative z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/10 bg-[#07182d] shadow-[0_2px_8px_rgba(0,0,0,0.24)]">

        <span className="text-[11px] font-black text-white">
          ✓
        </span>

      </div>

      {/* BROKER DOTS */}
      <span className="absolute right-[8px] top-[19px] h-[4px] w-[4px] rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.65)]" />

      <span className="absolute bottom-[9px] left-[11px] h-[4px] w-[4px] rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.65)]" />

      <span className="absolute bottom-[8px] right-[11px] h-[4px] w-[4px] rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.65)]" />

    </div>

    {/* HEADER TEXT */}
    <div className="min-w-0">

      <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[8px] font-black text-brand-600 shadow-sm">
        شركات مختارة
      </span>

      <h2 className="mt-1.5 text-[16px] font-black leading-6 text-[#07111f]">
        أفضل وسطاء التداول
      </h2>

      <p className="mt-0.5 text-[8.5px] font-semibold leading-4 text-slate-500">
        تصفح تقييمات مجموعة من أبرز شركات التداول.
      </p>

    </div>

  </div>

</div>

    {/* BROKERS */}
<div className="border-b border-slate-200 bg-[#f8fafc] px-3 py-3">

  {/* FEATURED BROKER */}
  {sidebarBrokers[0] && (
    <Link
      href={`/brokers/${sidebarBrokers[0].slug}`}
      target="_blank"
      rel="sponsored noopener noreferrer"
      prefetch={false}
      className="group relative block overflow-hidden rounded-[22px] border border-[#d7e6ff] bg-[linear-gradient(145deg,#ffffff_0%,#eef5ff_100%)] p-3 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-[0_18px_36px_rgba(37,99,235,0.20)]"
    >
      {/* TOP ACCENT */}
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#f59e0b] via-[#facc15] to-brand-500" />

      {/* BADGE + RATING */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-2.5 py-1 text-[8px] font-black text-brand-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          شريك مميز
        </span>

        <span
  dir="ltr"
  className="inline-flex items-center gap-1.5 text-[#f59e0b]"
>
  <span className="text-[16px] leading-none">★</span>

  <span className="text-[12px] font-black leading-none">
    {sidebarBrokers[0].rating?.toFixed(2) ?? "—"}
  </span>
</span>
      </div>

      {/* FEATURED LOGO */}
      <div className="mt-3 flex min-h-[92px] items-center justify-center rounded-[18px] bg-white px-5 shadow-[0_8px_22px_rgba(15,23,42,0.07)] ring-1 ring-slate-100">
        {sidebarBrokers[0].logo ? (
          <img
            src={sidebarBrokers[0].logo}
            alt={`شعار ${sidebarBrokers[0].name}`}
            loading="lazy"
            className="max-h-[90px] max-w-[250px] object-contain scale-[1.28] transition duration-300 group-hover:scale-[1.35]"
          />
        ) : (
          <span className="text-[18px] font-black text-slate-800">
            {sidebarBrokers[0].name}
          </span>
        )}
      </div>

      {/* FEATURED INFO */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3
            title={sidebarBrokers[0].name || ""}
            className="truncate text-[15px] font-black text-[#07111f]"
          >
            {sidebarBrokers[0].name}
          </h3>

          <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
            مراجعة الحسابات والتراخيص والرسوم
          </p>
        </div>

        <span className="flex min-h-[36px] shrink-0 items-center justify-center rounded-[11px] bg-brand-500 px-3 text-[9px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.22)] transition group-hover:bg-brand-600">
          عرض التقييم
        </span>
      </div>
    </Link>
  )}

  {/* OTHER BROKERS */}
<div className="mt-3 space-y-2">
  {sidebarBrokers.slice(1).map((broker) => (
    <Link
      key={broker.id}
      href={`/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      className="group flex min-h-[84px] items-center gap-3 overflow-hidden rounded-[18px] border border-slate-200 bg-white px-3 py-2.5 shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_24px_rgba(15,79,168,0.09)]"
    >
      {/* LOGO */}
      <div className="flex h-[60px] w-[112px] shrink-0 items-center justify-center overflow-visible rounded-[14px] bg-gradient-to-b from-white to-slate-100 transition duration-300 group-hover:bg-brand-50/50">
  {broker.logo ? (
    <img
      src={broker.logo}
      alt={`شعار ${broker.name}`}
      loading="lazy"
      className="h-[54px] w-[108px] object-contain scale-[1.35] transition duration-300 group-hover:scale-[1.42]"
    />
  ) : (
          <span className="truncate text-[11px] font-black text-slate-700">
            {broker.name}
          </span>
        )}
      </div>

      {/* INFO */}
      <div className="min-w-0 flex-1 text-right">
        <h3
          title={broker.name || ""}
          className="truncate whitespace-nowrap text-[12px] font-black leading-5 text-[#07111f] transition group-hover:text-brand-600"
        >
          {broker.name}
        </h3>

        <div
  dir="ltr"
  className="mt-1.5 flex items-center justify-end gap-1.5 text-[#f59e0b]"
>
  <span className="text-[14px] leading-none">
    ★
  </span>

  <span className="text-[11px] font-black leading-none">
    {broker.rating?.toFixed(2) ?? "—"}
  </span>
</div>

        <div className="mt-1.5 text-[9px] font-bold text-brand-600 transition group-hover:text-brand-700">
  التقييم الكامل
</div>
      </div>

      {/* ARROW */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[14px] font-black text-brand-500 shadow-[0_3px_10px_rgba(15,23,42,0.05)] transition duration-300 group-hover:-translate-x-1 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
  ←
</span>
    </Link>
  ))}
</div>

  {/* ALL BROKERS */}
<Link
  href="/brokers"
  className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
>
  <span>عرض جميع شركات التداول</span>
  <span className="text-[13px]">←</span>
</Link>

</div>

{/* SIDEBAR IMPORTANT LINKS */}
<div className="space-y-3 px-3 pb-3 pt-3">

  {/* LIVE MARKET HOURS */}
  <MarketHoursSidebar />

  {/* LICENSES */}
  <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">

  {/* HEADER */}
  <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4">
    <div className="flex items-center gap-3">
      {/* LICENSES ICON */}
<div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

  <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

  <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

  <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

  {/* SHIELD */}
  <div className="relative z-10 flex h-[25px] w-[21px] items-center justify-center rounded-b-[11px] rounded-t-[7px] border border-blue-300/50 bg-[#07182d]">

    <span className="text-[11px] font-black text-white">
      ✓
    </span>

  </div>

  <span className="absolute right-[6px] top-[8px] h-[12px] w-[12px] rounded-tr-full border-r-[3px] border-t-[3px] border-blue-400" />

  <span className="absolute bottom-[7px] left-[8px] h-[4px] w-[4px] rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.65)]" />

</div>

      <div className="min-w-0 flex-1">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[8px] font-black text-brand-600 shadow-sm">
          دليل رقابي
        </span>

        <h3 className="mt-2.5 text-[15px] font-black leading-6 text-[#07111f]">
          تراخيص شركات التداول
        </h3>

        <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
          تعرّف على أبرز الجهات الرقابية العالمية.
        </p>
      </div>
    </div>
  </div>

  {/* CONTENT */}
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
        className="group flex min-h-[60px] items-center justify-between gap-3 py-3"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex h-7 min-w-[48px] shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 px-2 text-[9px] font-black text-brand-700">
            {item.code}
          </span>

          <span className="truncate text-[11px] font-black text-slate-700 transition group-hover:text-brand-600">
            {item.title}
          </span>
        </div>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[12px] font-black text-brand-500 transition group-hover:-translate-x-1 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
          ←
        </span>
      </Link>
    ))}
  </div>

  {/* FOOTER */}
<div className="border-t border-slate-100 bg-white p-3">
  <Link
    href="/licenses"
    className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
  >
    <span>عرض جميع التراخيص</span>
    <span className="text-[13px]">←</span>
  </Link>
</div>
</div>

{/* BROKER HELP CARD */}
<div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
  {/* HEADER */}
  <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4">
    <div className="flex items-center gap-3">
      {/* HELP ICON */}
<div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

  <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

  <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

  <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

  {/* CHAT BUBBLE */}
  <div className="relative z-10 flex h-[23px] w-[27px] items-center justify-center rounded-[9px] border border-blue-300/40 bg-[#07182d]">

    <div className="flex items-center gap-[3px]">

      <span className="h-[3px] w-[3px] rounded-full bg-cyan-300" />

      <span className="h-[3px] w-[3px] rounded-full bg-blue-300" />

      <span className="h-[3px] w-[3px] rounded-full bg-white/80" />

    </div>

    <span className="absolute -bottom-[4px] right-[5px] h-[7px] w-[7px] rotate-45 border-b border-r border-blue-300/40 bg-[#07182d]" />

  </div>

  <span className="absolute right-[6px] top-[7px] h-[11px] w-[11px] rounded-tr-full border-r-[3px] border-t-[3px] border-cyan-400" />

  <span className="absolute bottom-[7px] left-[8px] h-[4px] w-[4px] rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />

</div>

      <div className="min-w-0 flex-1">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[8px] font-black text-brand-600 shadow-sm">
          مساعدة مجانية
        </span>

        <h3 className="mt-2 text-[15px] font-black leading-6 text-[#07111f]">
  استشارة مجانية لاختيار الوسيط المناسب
</h3>
      </div>
    </div>
  </div>

  {/* CONTENT */}
  <div className="px-4 py-4">
    <p className="text-[12.5px] font-medium leading-6 text-slate-700">
     أخبرنا ببلدك وخبرتك وما تبحث عنه، وسنساعدك في مقارنة الوسطاء الأنسب لاحتياجاتك.
    </p>

    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-600">
          ✓
        </span>
        مقارنة الوسطاء حسب بلدك
      </div>

      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-600">
          ✓
        </span>
        خيارات مناسبة لمستوى خبرتك
      </div>

      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-600">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-600">
          ✓
        </span>
        مساعدة مجانية بدون التزام
      </div>
    </div>

    <p className="mt-3 px-2 text-center text-[9px] font-semibold leading-5 text-slate-500">
  خدمة معلوماتية لمقارنة الوسطاء، وليست استشارة استثمارية.
</p>
</div>

<div className="border-t border-slate-100 bg-white p-3">
  <Link
    href="/contact"
    className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
  >
    <span>تواصل معنا الآن</span>
    <span className="text-[13px]">←</span>
  </Link>
</div>
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

        {/* FOREX TERMS */}
<div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">

  {/* HEADER */}
  <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">

    <div className="flex items-center gap-3">

      {/* LEARNING ICON */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

        {/* OUTER SHELL */}
        <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

        {/* OUTER RING */}
        <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

        {/* INNER FACE */}
        <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

        {/* OPEN BOOK */}
        <div className="relative z-10 flex h-[25px] w-[31px]">

          {/* RIGHT PAGE */}
          <div className="relative h-full w-1/2 rounded-r-[6px] border border-blue-300/45 bg-[#07182d]">

            <span className="absolute right-[3px] top-[5px] h-[2px] w-[8px] rounded-full bg-cyan-300" />

            <span className="absolute right-[3px] top-[10px] h-[2px] w-[7px] rounded-full bg-white/60" />

            <span className="absolute right-[3px] top-[15px] h-[2px] w-[6px] rounded-full bg-white/35" />

          </div>

          {/* LEFT PAGE */}
          <div className="relative h-full w-1/2 rounded-l-[6px] border border-r-0 border-blue-300/45 bg-[#07182d]">

            <span
              dir="ltr"
              className="absolute left-[3px] top-[5px] text-[6px] font-black leading-none tracking-[-0.03em] text-blue-300"
            >
              ABC
            </span>

            <span className="absolute left-[3px] top-[13px] h-[2px] w-[8px] rounded-full bg-white/55" />

            <span className="absolute left-[3px] top-[18px] h-[2px] w-[6px] rounded-full bg-white/30" />

          </div>

          {/* CENTER FOLD */}
          <span className="absolute left-1/2 top-[2px] h-[21px] w-px -translate-x-1/2 bg-blue-300/25" />

        </div>

        {/* ACCENT */}
        <span className="absolute bottom-[7px] left-[8px] h-[4px] w-[4px] rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.65)]" />

      </div>

      {/* TEXT */}
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

  {/* CONTENT */}
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

          <div className="text-[12px] font-black leading-5 text-slate-800 transition group-hover:text-brand-600">
            {item.label}
          </div>

          <div className="mt-1 truncate text-[10px] font-semibold leading-4 text-slate-500">
            {item.desc}
          </div>

        </div>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[12px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
          ←
        </span>

      </Link>

    ))}

  </div>

  {/* CTA */}
  <div className="border-t border-slate-100 bg-white p-3">

    <Link
      href="/learn-trading"
      className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
    >
      <span>تصفح مركز تعلم التداول</span>
      <span className="text-[13px]">←</span>
    </Link>

  </div>

</div>


{/* TRADING CALCULATORS */}
<div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">

  {/* HEADER */}
  <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">

    <div className="flex items-center gap-3">

      {/* CALCULATOR ICON */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

        {/* OUTER SHELL */}
        <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

        {/* OUTER RING */}
        <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

        {/* INNER FACE */}
        <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

        {/* CALCULATOR BODY */}
        <div className="relative z-10 flex h-[30px] w-[25px] flex-col rounded-[6px] border border-blue-300/45 bg-[#07182d] p-[3px]">

          {/* DISPLAY */}
          <div className="flex h-[7px] items-center justify-end rounded-[2px] bg-blue-300/20 px-[2px]">

            <span
              dir="ltr"
              className="text-[5px] font-black leading-none text-cyan-300"
            >
              123
            </span>

          </div>

          {/* BUTTONS */}
          <div className="mt-[3px] grid flex-1 grid-cols-2 gap-[2px]">

            <span className="flex items-center justify-center rounded-[2px] bg-white/10 text-[7px] font-black leading-none text-white">
              +
            </span>

            <span className="flex items-center justify-center rounded-[2px] bg-white/10 text-[8px] font-black leading-none text-white">
              −
            </span>

            <span className="flex items-center justify-center rounded-[2px] bg-white/10 text-[7px] font-black leading-none text-blue-300">
              ×
            </span>

            <span className="flex items-center justify-center rounded-[2px] bg-white/10 text-[7px] font-black leading-none text-cyan-300">
              ÷
            </span>

          </div>

        </div>

        {/* ACCENT */}
        <span className="absolute bottom-[7px] left-[8px] h-[4px] w-[4px] rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.65)]" />

      </div>

      {/* TEXT */}
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

  {/* CONTENT */}
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

  {/* CTA */}
  <div className="border-t border-slate-100 bg-white p-3">

    <Link
      href="/tools"
      className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
    >
      <span>عرض جميع حاسبات التداول</span>
      <span className="text-[13px]">←</span>
    </Link>

  </div>

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