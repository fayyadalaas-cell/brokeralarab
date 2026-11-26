import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinder from "@/app/components/BrokerFinder";
import HomeArticles from "@/app/components/HomeArticles";
import HomeComparisons from "@/app/components/HomeComparisons";
import HomeCountries from "@/app/components/HomeCountries";
import HomeMarketPrices from "@/app/components/HomeMarketPrices";
import HomeTradingTools from "@/app/components/HomeTradingTools";
import HomeInterestRates from "@/app/components/HomeInterestRates";
import HomeStrategies from "@/app/components/HomeStrategies";
import HomeMethodology from "@/app/components/HomeMethodology";
import HomeClosingSection from "@/app/components/HomeClosingSection";
import MarketHoursSidebar from "@/app/components/MarketHoursSidebar";
import HomeTechnicalSnapshot, {
  type HomeTechnicalRow,
  type HomePivotRow,
} from "@/app/components/HomeTechnicalSnapshot";

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
  is_full_review: boolean;
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

  score_safety: number | null;
  score_fees: number | null;
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
    {
  title: "أفضل شركات التداول في العراق",
  href: "/best-brokers/iraq",
  desc: "أفضل الخيارات المتاحة للمتداولين في العراق.",
  shortDesc: "وسطاء مناسبون للمتداول العراقي",
  flag: "https://flagcdn.com/w80/iq.png",
  badge: "العراق",
},
{
  title: "أفضل شركات التداول في ليبيا",
  href: "/best-brokers/libya",
  desc: "أفضل الخيارات المتاحة للمتداولين في ليبيا.",
  shortDesc: "وسطاء مناسبون للمتداول الليبي",
  flag: "https://flagcdn.com/w80/ly.png",
  badge: "ليبيا",
},
{
  title: "أفضل شركات التداول في سوريا",
  href: "/best-brokers/syria",
  desc: "أفضل الخيارات المتاحة للمتداولين في سوريا.",
  shortDesc: "وسطاء مناسبون للمتداول السوري",
  flag: "https://flagcdn.com/w80/sy.png",
  badge: "سوريا",
},
{
  title: "أفضل شركات التداول في اليمن",
  href: "/best-brokers/yemen",
  desc: "أفضل الخيارات المتاحة للمتداولين في اليمن.",
  shortDesc: "وسطاء مناسبون للمتداول اليمني",
  flag: "https://flagcdn.com/w80/ye.png",
  badge: "اليمن",
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
    slug: string | null;
    logo: string | null;
    rating: number | null;
    publication_status: string | null;
  } | null;

  broker_2: {
    name: string | null;
    slug: string | null;
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
    { data: comparisonBrokerOrder },
    { data: rankingData },
    { data: homeEvents },
  ] = await Promise.all([
    supabase
  .from("brokers")
.select(`
    id,
    is_full_review,
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
real_account_url,
score_safety,
score_fees
  `)
  .eq("publication_status", "published")
  .order("rating", { ascending: false }),

    supabase
  .from("brokers")
  .select("id, slug, is_full_review")
  .eq("publication_status", "published"),

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
    hero_image,
    is_media_partner
  `)
      .eq("status", "upcoming")
      .not("title_ar", "is", null)
      .not("slug", "is", null)
      .gte("end_date", today)
      .order("start_date", { ascending: true })
      .limit(12),
  ]);

  
/* ============================================================
   HOME — GOLD TECHNICAL ANALYSIS + CLASSIC PIVOT
   SERVER INITIAL DATA FOR SEO
   Symbol: XAUUSDc | Timeframe: H1
============================================================ */

const [
  { data: homeTechnicalData, error: homeTechnicalError },
  { data: homePivotData, error: homePivotError },
] = await Promise.all([
  supabase
    .from("broker_technical_analysis_latest")
    .select("*")
    .eq("symbol", "XAUUSDc")
    .eq("timeframe", "H1")
    .limit(1)
    .maybeSingle(),

  supabase
    .from("broker_pivot_levels_latest")
    .select("*")
    .eq("symbol", "XAUUSDc")
    .eq("timeframe", "H1")
    .eq("method", "classic")
    .limit(1)
    .maybeSingle(),
]);

if (homeTechnicalError) {
  console.error(
    "Homepage technical analysis:",
    homeTechnicalError
  );
}

if (homePivotError) {
  console.error(
    "Homepage classic pivot:",
    homePivotError
  );
}

const homeTechnical =
  (homeTechnicalData as HomeTechnicalRow | null) ?? null;

const homePivot =
  (homePivotData as HomePivotRow | null) ?? null;

/* ================= END HOME TECHNICAL DATA ================= */


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
      broker.is_full_review === true &&
      broker.logo &&
      broker.slug &&
      broker.name &&
      broker.slug.toLowerCase() !== "xm"
  )
  .sort(
    (a, b) =>
      Number(b.rating || 0) - Number(a.rating || 0)
  )
  .slice(0, 6);

  const footerFeaturedBrokers = brokers
  .filter(
    (broker) =>
      broker.is_full_review === true &&
      broker.logo &&
      broker.slug &&
      broker.name
  )
  .sort(
    (a, b) =>
      Number(b.rating || 0) - Number(a.rating || 0)
  )
  .slice(0, 5);

  /* =========================================================
   HOME — ALL FULL REVIEW BROKER COMPARISONS
========================================================= */

type HomeComparisonBroker = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  rating: number | null;
};

type HomeComparisonItem = {
  slug: string;
  broker1: HomeComparisonBroker;
  broker2: HomeComparisonBroker;
};

/* FULL REVIEW BROKERS ONLY */

const fullReviewBrokerMap = new Map(
  brokers
    .filter(
      (broker) =>
        broker.is_full_review === true &&
        Boolean(broker.slug) &&
        Boolean(broker.name)
    )
    .map((broker) => [
      broker.slug!,
      broker,
    ] as const)
);

/* USE THE EXISTING SITEMAP BROKER ORDER */

const eligibleComparisonBrokers: HomeComparisonBroker[] = [];

const seenBrokerSlugs = new Set<string>();

for (const row of comparisonBrokerOrder ?? []) {

  if (
    row.is_full_review !== true ||
    !row.slug ||
    seenBrokerSlugs.has(row.slug)
  ) {
    continue;
  }

  const broker = fullReviewBrokerMap.get(row.slug);

  if (!broker || !broker.name || !broker.slug) {
    continue;
  }

  seenBrokerSlugs.add(broker.slug);

  eligibleComparisonBrokers.push({
    id: broker.id,
    name: broker.name,
    slug: broker.slug,
    logo: broker.logo,
    rating: broker.rating,
  });

}

/* GENERATE UNIQUE BROKER PAIRS */

const homeComparisons: HomeComparisonItem[] = [];

for (
  let i = 0;
  i < eligibleComparisonBrokers.length;
  i++
) {

  for (
    let j = i + 1;
    j < eligibleComparisonBrokers.length;
    j++
  ) {

    const broker1 = eligibleComparisonBrokers[i];

    const broker2 = eligibleComparisonBrokers[j];

    homeComparisons.push({
      slug: `${broker1.slug}-vs-${broker2.slug}`,
      broker1,
      broker2,
    });

  }

}

/* ================= END HOME COMPARISONS ================= */

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

const accountTypeItems = [
  {
    title: "حسابات Standard",
    mobileSuitable: "للمبتدئين والتداول اليومي",
    desktopSuitable: "مناسبة للمبتدئين والتداول اليومي",
    mobileDesc: "رسوم واضحة وبدون تعقيد كبير.",
    desktopDesc: "حسابات سهلة بتكلفة واضحة وبدون تعقيد في العمولات.",
    badge: "سهولة البدء",
    href: "/best-brokers/accounts/standard",
  },
  {
    title: "حسابات Raw Spread",
    mobileSuitable: "للسكالبينج والمتداول النشط",
    desktopSuitable: "مناسبة للسكالبينج والمتداول النشط",
    mobileDesc: "سبريد يبدأ من 0.0 نقطة مع عمولة ثابتة.",
    desktopDesc:
      "سبريد يبدأ من 0.0 نقطة مع عمولة ثابتة لتنفيذ احترافي.",
    badge: "أقل سبريد",
    href: "/best-brokers/accounts/raw-spread",
  },
  {
    title: "حسابات ECN",
    mobileSuitable: "للمتداولين المحترفين",
    desktopSuitable: "مناسبة للمتداولين المحترفين",
    mobileDesc: "تنفيذ سريع ووصول مباشر للسيولة.",
    desktopDesc:
      "تنفيذ سريع ووصول مباشر للسيولة مع تسعير أكثر تنافسية.",
    badge: "تنفيذ احترافي",
    href: "/lowest-spread-brokers",
  },
  {
    title: "حسابات Cent / Micro",
    mobileSuitable: "للتجربة برأس مال صغير",
    desktopSuitable: "مناسبة للتجربة برأس مال صغير",
    mobileDesc: "أحجام تداول صغيرة لاختبار استراتيجيتك.",
    desktopDesc:
      "أحجام تداول صغيرة لاختبار الاستراتيجيات وتقليل المخاطر.",
    badge: "رأس مال صغير",
    href: "/best-brokers/accounts/cent",
  },
];

const whyBrokerAlarabItems = [
  {
    mobileTitle: "مراجعات واضحة",
    desktopTitle: "مراجعات منظمة وواضحة",
    mobileDesc: "نضع أهم معلومات الوسيط في مكان واحد.",
    desktopDesc:
      "نجمع أهم بيانات الوسيط مثل الترخيص والرسوم والحسابات والمنصات وطرق الإيداع والسحب في مكان واحد.",
    tag: "تقييمات",
  },
  {
    mobileTitle: "مقارنات تساعدك",
    desktopTitle: "مقارنات تساعدك على القرار",
    mobileDesc: "نوضح الفروقات المهمة بين الوسطاء بسرعة.",
    desktopDesc:
      "نوضح الفروقات العملية بين الوسطاء حتى تعرف أي شركة أقرب لاحتياجاتك بدل الاعتماد على الانطباع العام.",
    tag: "مقارنات",
  },
  {
    mobileTitle: "احتياجات المتداول العربي",
    desktopTitle: "تركيز على احتياجات العرب",
    mobileDesc: "نركز على الحساب الإسلامي والدعم وطرق الدفع.",
    desktopDesc:
      "نراجع عوامل مهمة مثل الحساب الإسلامي والدعم العربي ومرونة الإيداع والسحب في الدول العربية.",
    tag: "للمنطقة",
  },
  {
    mobileTitle: "وصول أسرع للخيار المناسب",
    desktopTitle: "وصول أسرع للخيار المناسب",
    mobileDesc: "نرتب الوسطاء حسب الدولة ونوع الحساب.",
    desktopDesc:
      "نرتب الوسطاء حسب الدولة ونوع الحساب والرسوم حتى تصل بسرعة إلى الخيار الأقرب لأسلوبك.",
    tag: "اختيار أسهل",
  },
];

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
    <main
  dir="rtl"
  className="min-h-screen bg-[#f5f7fb] text-[#0f172a]"
>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

{/* =========================================================
    HERO — PREMIUM FINANCIAL PLATFORM
========================================================= */}

<section
  dir="rtl"
  className="relative isolate overflow-hidden border-b border-[#173b70] bg-[#081b32]"
>

  {(() => {

    /* =====================================================
       MANUAL HERO BROKER SELECTION
    ====================================================== */

    const heroBrokerIds = [1, 2, 18, 14, 25, 11];

    const allHeroBrokers = heroBrokerIds
      .map((id) =>
        brokers.find((broker) => Number(broker.id) === id)
      )
      .filter((broker): broker is Broker => Boolean(broker));

    return (

      <>

        {/* ===============================================
            PREMIUM FINTECH BACKGROUND
        ================================================ */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >

          {/* BASE GRADIENT */}

          <div className="absolute inset-0 bg-[linear-gradient(120deg,#061326_0%,#0b2340_55%,#10365e_100%)]" />

          {/* SOFT BLUE LIGHTS */}

          <div className="absolute -right-[180px] -top-[280px] h-[650px] w-[650px] rounded-full bg-[#1688ff]/15 blur-[130px]" />

          <div className="absolute -bottom-[260px] left-[15%] h-[500px] w-[500px] rounded-full bg-[#2563eb]/10 blur-[120px]" />

          {/* FINANCIAL GRID */}

          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(147,197,253,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.7)_1px,transparent_1px)] [background-size:65px_65px]" />

          {/* DECORATIVE FINANCIAL CURVE */}

          <svg
            viewBox="0 0 1600 500"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full opacity-40"
          >

            <defs>

              <linearGradient
                id="homeHeroLine"
                x1="0"
                y1="0"
                x2="1600"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >

                <stop stopColor="#38bdf8" stopOpacity="0" />

                <stop
                  offset="0.6"
                  stopColor="#60a5fa"
                  stopOpacity="0.35"
                />

                <stop
                  offset="1"
                  stopColor="#93c5fd"
                  stopOpacity="0.05"
                />

              </linearGradient>

            </defs>

            <path
              d="M0 420 C180 440 250 360 410 370 C580 380 680 280 840 290 C1000 310 1080 180 1260 200 C1400 220 1490 100 1600 70"
              stroke="url(#homeHeroLine)"
              strokeWidth="2"
            />

          </svg>

        </div>

        {/* ===============================================
            MAIN HERO CONTAINER
        ================================================ */}

        <div className="relative mx-auto w-full min-w-0 max-w-[1600px] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6">

          <div className="grid min-w-0 grid-cols-1 items-center gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_500px] xl:gap-8">

            {/* ===========================================
                RIGHT SIDE — MAIN HERO CONTENT
            ============================================ */}

            <div className="flex min-w-0 flex-col justify-center text-center lg:text-right">

              {/* BRAND POSITIONING */}

              <div className="flex items-center justify-center gap-2.5 lg:justify-start">

                <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />

                <span className="text-[11px] font-semibold leading-6 text-blue-200 sm:text-[13px]">

                  بيانات أدق · مقارنة أوضح · قرار أفضل

                </span>

              </div>

              {/* MAIN SEO TITLE */}

              <h1 className="mt-3 text-[clamp(24px,7.5vw,32px)] font-black leading-[1.25] tracking-tight text-white sm:mt-4 sm:text-[44px] lg:text-[48px] xl:text-[60px]">

                أفضل شركات التداول

                <span className="mt-1 block bg-gradient-to-l from-[#6dd5ff] via-[#62a9ff] to-[#9fc9ff] bg-clip-text pb-1 text-transparent">

                  برؤية أعمق.

                </span>

              </h1>

              {/* MAIN DESCRIPTION */}

<p className="mx-auto mt-3 max-w-[740px] text-[13px] font-medium leading-6 text-slate-300 sm:mt-4 sm:text-[15px] sm:leading-8 lg:mx-0 lg:text-[16px] xl:text-[17px]">

  <span className="sm:hidden">

    تقييمات مستقلة ومقارنات شاملة للوسطاء،
    وتحليلات وأدوات مالية تساعدك على اختيار
    وسيط التداول المناسب.

  </span>

  <span className="hidden sm:inline">

    تقييمات مستقلة، ومقارنات شاملة لشركات التداول،
    وبيانات الأسواق المالية والتحليل الفني وأدوات
    التداول. كل ما تحتاجه لفهم الأسواق واختيار
    وسيط التداول المناسب.

  </span>

</p>

              {/* =========================================
    MAIN ACTION BUTTONS
========================================== */}

<div className="mt-4 grid grid-cols-2 items-stretch gap-2 sm:mt-6 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-3 lg:justify-start">

  {/* BROKER DIRECTORY */}

  <Link
    href="/brokers"
    className="group inline-flex min-h-[44px] min-w-0 items-center justify-center gap-2 rounded-[9px] bg-[linear-gradient(135deg,#2878e5_0%,#1664cf_100%)] px-2 text-[12px] font-black text-white shadow-[0_10px_25px_rgba(20,105,220,0.24)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:min-h-[50px] sm:min-w-[195px] sm:gap-4 sm:rounded-[11px] sm:px-7 sm:text-[13px]"
  >

    استكشف الوسطاء

    <span
      aria-hidden="true"
      className="shrink-0 text-[15px] transition-transform group-hover:-translate-x-1 sm:text-[18px]"
    >
      ←
    </span>

  </Link>

  {/* BROKER COMPARISONS */}

  <Link
    href="/compare"
    className="group inline-flex min-h-[44px] min-w-0 items-center justify-center gap-2 rounded-[9px] border border-blue-200/25 bg-white/[0.045] px-2 text-[12px] font-bold text-white transition duration-300 hover:border-blue-300/50 hover:bg-white/10 sm:min-h-[50px] sm:min-w-[185px] sm:gap-4 sm:rounded-[11px] sm:px-7 sm:text-[13px]"
  >

    قارن بين الوسطاء

    <span
      aria-hidden="true"
      className="shrink-0 text-[15px] text-blue-300 transition-transform group-hover:-translate-x-1 sm:text-[17px]"
    >
      ←
    </span>

  </Link>

</div>

              {/* =========================================
    PLATFORM FEATURES — DESKTOP AND TABLET
========================================== */}

<div className="hidden grid-cols-2 gap-x-5 gap-y-4 border-t border-white/15 pt-4 text-right sm:mt-6 sm:grid lg:mt-7 xl:grid-cols-4 xl:gap-x-5">

  {[
    {
      title: "تقييمات مستقلة",
      icon: "shield",
    },
    {
      title: "بيانات مالية محدثة",
      icon: "activity",
    },
    {
      title: "مقارنات تفصيلية للوسطاء",
      icon: "compare",
    },
    {
      title: "أدوات تداول مجانية",
      icon: "calculator",
    },
  ].map((item) => (

    <div
      key={item.title}
      className="flex min-w-0 items-center gap-2.5"
    >

      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[23px] w-[23px] shrink-0 text-[#76c8ff]"
      >

        {item.icon === "shield" && (
          <>
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
            <path d="m9 12 2 2 4-4" />
          </>
        )}

        {item.icon === "activity" && (
          <path d="M2 12h5l3-7 4 14 3-7h5" />
        )}

        {item.icon === "compare" && (
          <>
            <path d="M3 7h18M16 2l5 5-5 5" />
            <path d="M21 17H3m5-5-5 5 5 5" />
          </>
        )}

        {item.icon === "calculator" && (
          <>
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <path d="M8 6h8M8 11h1m6 0h1m-8 4h1m6 0h1m-8 4h1m6 0h1" />
          </>
        )}

      </svg>

      <span className="text-[13px] font-bold leading-6 text-blue-100 xl:text-[14px]">

        {item.title}

      </span>

    </div>

  ))}

</div>

            </div>

            {/* ===========================================
    LEFT SIDE — PREMIUM BROKER SHOWCASE
============================================ */}

<div className="relative min-w-0">

  {/* SOFT CARD GLOW */}

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -inset-4 rounded-[32px] bg-blue-500/10 blur-[30px]"
  />

  {/* BROKER SHOWCASE CARD */}

  <div className="relative overflow-hidden rounded-[15px] border border-[#83b6ff]/20 bg-[linear-gradient(145deg,#102943_0%,#173c65_100%)] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.16)] sm:rounded-[22px] sm:p-5">

    {/* =======================================
        SHOWCASE HEADER
    ======================================== */}

    <div className="flex items-center justify-between gap-3 pb-2.5 sm:pb-4">

      <div className="min-w-0">

        <h2 className="text-[15px] font-black leading-6 text-white sm:text-[20px] sm:leading-7">

          شركات تداول مختارة

        </h2>

        <p className="mt-0.5 text-[11px] font-medium leading-5 text-blue-100 sm:mt-1.5 sm:text-[14px] sm:leading-6">

          استكشف تقييمات الوسطاء وخدماتهم

        </p>

      </div>

      {/* SHOWCASE ICON */}

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-blue-200/15 bg-white/[0.07] text-[#93c5fd] sm:h-11 sm:w-11 sm:rounded-[12px]">

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-5 w-5 sm:h-6 sm:w-6"
        >

          <rect x="3" y="3" width="7" height="7" rx="1.5" />

          <rect x="14" y="3" width="7" height="7" rx="1.5" />

          <rect x="3" y="14" width="7" height="7" rx="1.5" />

          <rect x="14" y="14" width="7" height="7" rx="1.5" />

        </svg>

      </div>

    </div>

    {/* =======================================
        SIX PREMIUM LOGO POSITIONS
        MOBILE: 3 COLUMNS
        DESKTOP: 2 COLUMNS
    ======================================== */}

    <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-2.5">

      {allHeroBrokers.slice(0, 6).map((broker) => (

        <Link
          key={broker.id}
          href={`/brokers/${broker.slug}`}
          aria-label={`عرض تقييم شركة ${broker.name}`}
          className="group relative flex h-[60px] min-w-0 items-center justify-center overflow-hidden rounded-[9px] border border-white/90 bg-white px-1 py-1 transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] sm:h-[82px] sm:rounded-[12px] sm:px-2"
        >

          {/* HOVER ACCENT */}

          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 h-[3px] origin-center scale-x-0 bg-[#2878e5] transition-transform duration-300 group-hover:scale-x-100"
          />

          {/* BROKER LOGO */}

          {broker.logo ? (

            <img
              src={broker.logo}
              alt={`شعار ${broker.name}`}
              className="h-[44px] w-[72px] max-w-full object-contain mix-blend-multiply transition-opacity duration-300 group-hover:opacity-85 sm:h-[70px] sm:w-[180px]"
              style={{
                transform: `scale(${
                  broker.slug === "capital-com"
                    ? 1.30
                    : broker.slug === "oneroyal"
                      ? 1.15
                      : broker.slug === "icmarkets"
                        ? 1.35
                        : 1.40
                })`,
              }}
            />

          ) : (

            <span className="text-center text-[11px] font-black text-[#10233f] sm:text-[14px]">

              {broker.name}

            </span>

          )}

        </Link>

      ))}

    </div>

                {/* =======================================
                    SIMPLE SHOWCASE FOOTER
                ======================================== */}

                <Link
                  href="/brokers"
                  className="group mt-3 flex min-h-[34px] items-center justify-center gap-3 border-t border-white/10 pt-2 text-[13px] font-bold text-blue-100 transition hover:text-white"
                >

                  استكشف جميع شركات التداول

                  <span
                    aria-hidden="true"
                    className="text-[17px] text-blue-300 transition-transform duration-200 group-hover:-translate-x-1"
                  >

                    ←

                  </span>

                </Link>

              </div>

            </div>

          </div>

        </div>

      </>

    );

  })()}

</section>

{/* ================= END PREMIUM HERO ================= */}

{/* HOME CONTENT + DESKTOP SIDEBAR */}
<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch xl:gap-3">

    {/* ALL HOME PAGE SECTIONS */}
    <div className="min-w-0 xl:flex xl:flex-col xl:[&>section]:pl-0">

  {/* FINDER */}

<section
  id="finder"
  className="scroll-mt-24 mx-auto w-full max-w-7xl px-0 pt-2 pb-3 sm:pt-4 sm:pb-4 lg:pt-4 lg:pb-4 xl:pb-0 xl:flex xl:flex-1 xl:flex-col xl:[&>*]:flex-1"
>
  <BrokerFinder
    brokers={brokers}
    countryRankings={countryRankings}
  />
</section>

</div>

{/* BROKERS SIDEBAR - DESKTOP ONLY */}
<aside className="hidden pt-4 xl:block">
  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.07)]">

      {/* SIDEBAR HEADER */}

<div className="flex min-h-[76px] flex-col justify-center border-b border-slate-200 bg-[#f5f8fc] px-4 py-2.5">

  <div className="flex items-center gap-2.5">

    <span
      aria-hidden="true"
      className="h-[24px] w-[4px] shrink-0 rounded-full bg-brand-600"
    />

    <h2 className="text-[20px] font-black leading-7 text-[#10233f]">
      وسطاء التداول
    </h2>

  </div>

  <p className="mt-2 pr-[14px] text-[11px] font-medium leading-5 text-slate-500">
    تقييمات ومراجعات شركات التداول
  </p>

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

<div className="mt-2 flex h-[86px] items-center justify-center overflow-hidden px-2">

  {sidebarBrokers[0].logo ? (

    <img
      src={sidebarBrokers[0].logo}
      alt={`شعار ${sidebarBrokers[0].name}`}
      loading="lazy"
      className="h-[80px] w-[220px] max-w-full object-contain mix-blend-multiply transition duration-300"
      style={{
        transform:
          sidebarBrokers[0].slug === "icmarkets"
            ? "scale(1.45)"
            : "scale(1.35)",
      }}
    />

  ) : (

    <span className="text-[18px] font-black text-slate-800">
      {sidebarBrokers[0].name}
    </span>

  )}

</div>

      {/* FEATURED INFO */}
      <div className="mt-2 flex items-center justify-between gap-3">
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

<div className="mt-2 divide-y divide-slate-200">

  {sidebarBrokers.slice(1).map((broker) => (

    <Link
      key={broker.id}
      href={`/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      aria-label={`عرض تقييم ${broker.name}`}
      className="group flex min-h-[84px] items-center justify-between gap-2 rounded-md px-2 py-0.5 transition duration-200 hover:bg-blue-50/50"
    >

      {/* LOGO AND RATING */}

      <div className="flex min-w-0 flex-1 flex-col items-center justify-center">

        {/* BROKER LOGO */}

        <div className="flex h-[53px] w-full items-center justify-center">

          {broker.logo ? (

            <img
  src={broker.logo}
  alt={`شعار ${broker.name}`}
  loading="lazy"
  className="h-[53px] w-[155px] max-w-full object-contain mix-blend-multiply transition duration-300"
  style={{
  transform: broker.name?.toLowerCase().includes("capital")
    ? "scale(1.65)"
    : "scale(1.75)",
}}
/>

          ) : (

            <span className="text-[15px] font-black text-slate-800">
              {broker.name}
            </span>

          )}

        </div>

        {/* BROKER RATING */}

        <div
          dir="ltr"
          className="mt-1 flex items-center justify-center gap-1.5"
        >

          <span className="text-[15px] leading-none text-amber-500">
            ★
          </span>

          <span className="text-[12px] font-bold leading-none text-slate-700">
            {broker.rating?.toFixed(2) ?? "—"}
          </span>

          <span className="text-[10px] font-medium text-slate-400">
            / 5
          </span>

        </div>

      </div>

      {/* REVIEW BUTTON */}

      <span className="inline-flex h-[32px] min-w-[76px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#93b5e6] bg-white px-3 text-[11px] font-semibold text-brand-600 transition duration-200 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">

        التقييم

        <span className="text-[13px] leading-none">
          ←
        </span>

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

  </div>
</aside>

</div>

{/* EXNESS PREMIUM BANNER */}

<div className="mx-auto flex w-full justify-center py-5 sm:py-6 lg:py-7">

  <a
    href="https://one.toexness.com/a/hhmbah9f13"
    target="_blank"
    rel="sponsored noopener noreferrer"
    aria-label="إعلان Exness"
    className="
      group block w-full max-w-[1000px]
      overflow-hidden rounded-[14px]
      border border-slate-200/80
      bg-white p-[5px]
      shadow-[0_8px_24px_rgba(15,23,42,0.075)]
      transition duration-300
      hover:border-slate-300
      hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
    "
  >
    <img
      src="/banners/AR_Spreads_50_lower_728x90.jpg"
      width={728}
      height={90}
      alt="إعلان Exness للتداول في الأسواق المالية"
      className="block !h-auto !w-full rounded-[10px] !object-contain"
    />
  </a>

</div>

  {/* =====================================================
    LATEST ARTICLES — FULL WIDTH
===================================================== */}

<HomeArticles />

{/* =========================================================
    SECOND HOME GROUP — COMPARISONS + MARKET HOURS
========================================================= */}

<div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch xl:gap-3">

  {/* MAIN CONTENT — BROKER COMPARISONS */}

  <div className="min-w-0 xl:flex xl:flex-col xl:[&>section]:pl-0">

  <HomeComparisons comparisons={homeComparisons} />

</div>

  {/* SECOND SIDEBAR — MARKET HOURS */}

  <aside className="hidden min-w-0 pt-4 pb-4 xl:flex xl:flex-col">

    <MarketHoursSidebar />

  </aside>

</div>

{/* =========================================================
    END SECOND HOME GROUP
========================================================= */}


{/* =========================================================
    XS PREMIUM BANNER — FULL WIDTH
========================================================= */}

<div className="mx-auto flex w-full justify-center py-5 sm:py-6 lg:py-7">

  <a
    href="https://my.xs.com/links/go/5696"
    target="_blank"
    rel="sponsored noopener noreferrer"
    aria-label="إعلان XS.com"
    className="
      group block w-full max-w-[1000px]
      overflow-hidden rounded-[14px]
      border border-slate-200/80
      bg-white p-[5px]
      shadow-[0_8px_24px_rgba(15,23,42,0.075)]
      transition duration-300
      hover:border-slate-300
      hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
    "
  >

    <img
      src="/banners/xsbannerar.jpg"
      width={728}
      height={90}
      alt="إعلان XS.com للتداول في الأسواق المالية"
      className="block !h-auto !w-full rounded-[10px] !object-contain"
    />

  </a>

</div>

{/* =========================================================
    END XS PREMIUM BANNER
========================================================= */}


{/* =========================================================
    THIRD HOME GROUP — COUNTRIES + ONEROYAL
========================================================= */}

<div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch xl:gap-3">

  {/* MAIN CONTENT — COUNTRIES */}

  <div className="min-w-0 xl:flex xl:flex-col">

    <HomeCountries />

  </div>

  {/* THIRD SIDEBAR — ONEROYAL */}

  <aside className="hidden min-w-0 flex-col pt-4 pb-4 xl:flex">

    {/* ADVERTISEMENT HEADER SPACER */}

<div
  aria-hidden="true"
  className="mb-4 min-h-[44px] shrink-0"
/>

    {/* ADVERTISEMENT CARD */}

<div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[18px] border border-slate-200 bg-white p-2">

  {/* ADVERTISEMENT LABEL */}

  <span className="absolute top-1.5 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium text-slate-400">
    إعلان
  </span>

  {/* ONEROYAL BANNER */}

  <a
    href="https://vc.cabinet.oneroyal.com/links/go/15855"
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    aria-label="فتح حساب تداول مع OneRoyal"
    className="group block w-full overflow-hidden rounded-[13px]"
  >

    <img
      src="https://vc.cabinet.oneroyal.com/uploads/public/banners/2023/07/10/f01276aaa41913e28cfa286e7c86f57d.png"
      alt="إعلان OneRoyal"
      title="فتح حساب تداول مع OneRoyal"
      loading="lazy"
      className="mx-auto block !h-auto !w-full !object-contain transition duration-300 group-hover:scale-[1.01]"
    />

  </a>

</div>

</aside>

</div>

{/* END THIRD HOME GROUP */}


{/* =========================================================
    FOURTH HOME GROUP — TECHNICAL ANALYSIS + MARKET PRICES
========================================================= */}

<div className="mt-2 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch">

  {/* MAIN CONTENT — TECHNICAL ANALYSIS */}

  <div className="min-w-0 xl:flex xl:flex-col">

    <HomeTechnicalSnapshot
      initialTechnical={homeTechnical}
      initialPivot={homePivot}
    />

  </div>

  {/* FOURTH SIDEBAR — MARKET PRICES */}

  <aside className="flex min-w-0 flex-col pb-3 pt-3 sm:pb-4 sm:pt-4">

    <HomeMarketPrices />

  </aside>

</div>

{/* END FOURTH HOME GROUP */}


{/* =========================================================
    PEPPERSTONE PREMIUM BANNER — FULL WIDTH
========================================================= */}

<div className="mx-auto flex w-full justify-center py-5 sm:py-6 lg:py-7">

  <a
    href="https://track.pepperstonepartners.com/visit/?bta=44176&nci=6687"
    target="_blank"
    rel="sponsored noopener noreferrer"
    aria-label="زيارة Pepperstone"
    className="
      group block w-full max-w-[1000px]
      overflow-hidden rounded-[14px]
      border border-slate-200/80
      bg-white p-[5px]
      shadow-[0_8px_24px_rgba(15,23,42,0.075)]
      transition duration-300
      hover:border-slate-300
      hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
    "
  >

    <img
      src="https://pepperstonepartners.ck-cdn.com/tn/serve/?cid=687946"
      width={728}
      height={90}
      alt="إعلان Pepperstone"
      className="block !h-auto !w-full rounded-[10px] !object-contain"
    />

  </a>

</div>

{/* END PEPPERSTONE PREMIUM BANNER */}


{/* =====================================================
    ACCOUNT TYPES HOME SECTION — FULL WIDTH
====================================================== */}

<section
  id="home-account-types"
  aria-labelledby="home-account-types-title"
  dir="rtl"
  className="mx-auto w-full min-w-0 py-3 sm:py-4"
>

  {/* EXTERNAL SECTION HEADER */}

  <div className="mb-4 flex min-h-[44px] shrink-0 items-center">

    <h2
      id="home-account-types-title"
      className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
    >

      أنواع حسابات التداول

    </h2>

  </div>

  {/* =====================================================
    ACCOUNT TYPES GRID
    MOBILE: 2 COLUMNS
    DESKTOP: ORIGINAL DESIGN
====================================================== */}

<div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">

  {accountTypeItems.map((item, index) => (

    <Link
      key={item.title}
      href={item.href}
      className="group flex min-w-0 flex-col overflow-hidden rounded-[13px] border border-slate-200 bg-white p-3 transition duration-200 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_5px_18px_rgba(15,23,42,0.05)] sm:rounded-[18px] sm:p-4"
    >

      {/* ACCOUNT ICON AND BADGE */}

      <div className="flex items-center justify-between gap-2">

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#edf3fc] text-[#194b92] transition duration-200 group-hover:bg-[#194b92] group-hover:text-white sm:h-11 sm:w-11 sm:rounded-[12px]">

          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5 sm:h-[23px] sm:w-[23px]"
          >

            {index === 0 ? (

              <>

                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="15"
                  rx="3"
                />

                <path d="M3 9h18" />

                <path d="M15 14h3" />

              </>

            ) : index === 1 ? (

              <>

                <path d="M3 3v18h18" />

                <path d="m6 15 5-5 4 3 6-7" />

                <path d="M17 6h4v4" />

              </>

            ) : index === 2 ? (

              <>

                <rect
                  x="9"
                  y="2"
                  width="6"
                  height="6"
                  rx="1"
                />

                <rect
                  x="2"
                  y="16"
                  width="6"
                  height="6"
                  rx="1"
                />

                <rect
                  x="16"
                  y="16"
                  width="6"
                  height="6"
                  rx="1"
                />

                <path d="M12 8v4M5 16v-4h14v4" />

              </>

            ) : (

              <>

                <ellipse
                  cx="10"
                  cy="5"
                  rx="7"
                  ry="3"
                />

                <path d="M3 5v5c0 1.7 3.1 3 7 3" />

                <path d="M3 10v5c0 1.7 3.1 3 7 3" />

                <circle
                  cx="17"
                  cy="16"
                  r="5"
                />

              </>

            )}

          </svg>

        </span>

        {/* DESKTOP BADGE ONLY */}

        <span className="hidden rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[10px] font-bold text-slate-600 sm:inline-flex">

          {item.badge}

        </span>

      </div>

      {/* ACCOUNT TITLE */}

      <h3 className="mt-2 break-words text-[14px] font-black leading-6 text-[#10233f] transition-colors group-hover:text-brand-600 sm:mt-3 sm:text-[19px]">

        {item.title}

      </h3>

      {/* ACCOUNT DESCRIPTION */}

      <p className="mt-1 text-[11px] font-medium leading-5 text-slate-600 sm:text-[13px] sm:leading-6">

        {item.mobileDesc}

      </p>

      {/* CARD FOOTER */}

      <div className="mt-auto pt-2 sm:pt-3">

        <div className="flex items-center justify-between gap-1 border-t border-slate-100 pt-2 sm:gap-2 sm:pt-2.5">

          <span className="text-[11px] font-bold text-[#194b92] sm:text-[12px]">

            عرض الحسابات

          </span>

          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-[14px] w-[14px] shrink-0 text-[#194b92] transition-transform duration-200 group-hover:-translate-x-1 sm:h-[17px] sm:w-[17px]"
          >

            <path d="M19 12H5" />

            <path d="m12 19-7-7 7-7" />

          </svg>

        </div>

      </div>

    </Link>

  ))}

</div>

</section>

{/* END ACCOUNT TYPES — FULL WIDTH */}


{/* =========================================================
    FIFTH HOME GROUP — TRADING TOOLS + LICENSES
========================================================= */}

<HomeTradingTools />

{/* END FIFTH HOME GROUP */}


{/* =========================================================
    GLOBAL INTEREST RATES — FULL WIDTH
========================================================= */}

<HomeInterestRates />

{/* END GLOBAL INTEREST RATES */}


{/* =========================================================
    SELECTED TRADING STRATEGIES — FULL WIDTH
========================================================= */}

<HomeStrategies />

{/* END SELECTED TRADING STRATEGIES */}


{/* =========================================================
    BROKER ALARAB — REVIEW METHODOLOGY
========================================================= */}

<HomeMethodology />

{/* END HOME METHODOLOGY */}


{/* =========================================================
    FINAL HOME SECTION — CONTACT + BROKERS + ADVERTISEMENT
========================================================= */}

<HomeClosingSection brokers={brokers} />

{/* END FINAL HOME SECTION */}

</div>

</main>
  );
}