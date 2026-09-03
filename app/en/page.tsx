import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinderEN from "@/app/components/BrokerFinderEN";
import MarketHoursSidebarEn from "@/app/components/MarketHoursSidebarEn";

export const metadata: Metadata = {
  title: {
    absolute: "Best Trading Brokers & Broker Reviews 2026 | Broker Alarab",
  },

  description:
    "Compare the best trading brokers in 2026 by regulation, fees, spreads, account types, trading platforms, deposits, and withdrawals. Independent broker reviews to help you choose with confidence.",

  keywords: [
    "Broker Alarab",
    "best trading brokers",
    "best forex brokers",
    "broker reviews",
    "broker comparison",
    "regulated brokers",
    "forex broker reviews",
    "low spread brokers",
    "Islamic trading account",
    "MT4 brokers",
    "MT5 brokers",
    "trading platforms",
    "best brokers 2026",
  ],

  alternates: {
    canonical: "https://brokeralarab.com/en",
    languages: {
      en: "https://brokeralarab.com/en",
      ar: "https://brokeralarab.com",
      "x-default": "https://brokeralarab.com/en",
    },
  },

  openGraph: {
    title: "Best Trading Brokers & Broker Reviews 2026 | Broker Alarab",
    description:
      "Compare trading brokers by regulation, fees, spreads, account types, platforms, deposits, and withdrawals. Independent reviews for smarter broker selection.",
    url: "https://brokeralarab.com/en",
    siteName: "Broker Alarab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://brokeralarab.com/og-image.webp",
        width: 1560,
        height: 377,
        alt: "Broker Alarab broker reviews and comparisons",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Trading Brokers & Broker Reviews 2026 | Broker Alarab",
    description:
      "Compare regulated trading brokers by fees, spreads, platforms, accounts, deposits, and withdrawals.",
    images: ["https://brokeralarab.com/og-image.webp"],
  },
};

type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  best_for: string | null;
  best_for_en: string | null;
  intro: string | null;
  intro_en: string | null;
  logo: string | null;
  pros: string | null;
  pros_en: string | null;
  cons: string | null;
  cons_en: string | null;
  account_types: string | null;
  account_types_en: string | null;
  fees: string | null;
  fees_en: string | null;
  spreads: string | null;
  spreads_en: string | null;
  deposit_withdrawal: string | null;
  deposit_withdrawal_en: string | null;
  platform_details: string | null;
  platform_details_en: string | null;
  support: string | null;
  support_en: string | null;
  safety: string | null;
  safety_en: string | null;
  final_verdict: string | null;
  final_verdict_en: string | null;
  meta_title: string | null;
  meta_title_en: string | null;
  meta_description: string | null;
  meta_description_en: string | null;
  arab_traders: string | null;
  founded_year: string | null;
  headquarters: string | null;
  headquarters_en: string | null;
  max_leverage: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  trading_assets: string | null;
  trading_assets_en: string | null;
  real_account_url: string | null;
};

function money(value: number | null) {
  if (value === null || Number.isNaN(value)) return "Not specified";
  return `$${value}`;
}

function shortReg(value: string | null) {
  if (!value) return "Not specified";
  return value
    .split("||")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(" / ");
}

function shortPlatforms(value: string | null) {
  if (!value) return "Not specified";
  return value.replace("JustMarkets Mobile App", "Mobile").trim();
}

function getCountryPages() {
  return [
    {
      title: "Best Forex Brokers in the UK",
      href: "/en/best-brokers/united-kingdom",
      desc: "Compare forex brokers available to traders in the United Kingdom.",
      shortDesc: "Forex brokers for UK traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/gb.svg",
      badge: "United Kingdom",
    },

    {
      title: "Best Forex Brokers in Australia",
      href: "/en/best-brokers/australia",
      desc: "Compare forex brokers available to traders in Australia.",
      shortDesc: "Forex brokers for Australian traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/au.svg",
      badge: "Australia",
    },

    {
      title: "Best Forex Brokers in South Africa",
      href: "/en/best-brokers/south-africa",
      desc: "Compare forex brokers available to traders in South Africa.",
      shortDesc: "Forex brokers for South African traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/za.svg",
      badge: "South Africa",
    },

    {
      title: "Best Forex Brokers in Singapore",
      href: "/en/best-brokers/singapore",
      desc: "Compare forex brokers available to traders in Singapore.",
      shortDesc: "Forex brokers for Singapore traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/sg.svg",
      badge: "Singapore",
    },

    {
      title: "Best Forex Brokers in Malaysia",
      href: "/en/best-brokers/malaysia",
      desc: "Compare forex brokers available to traders in Malaysia.",
      shortDesc: "Forex brokers for Malaysian traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/my.svg",
      badge: "Malaysia",
    },

    {
  title: "Best Forex Brokers in Ghana",
  href: "/en/best-brokers/ghana",
  desc: "Compare forex brokers available to traders in Ghana.",
  shortDesc: "Forex brokers for Ghanaian traders",
  flag: "https://hatscripts.github.io/circle-flags/flags/gh.svg",
  badge: "Ghana",
},

    {
      title: "Best Forex Brokers in Nigeria",
      href: "/en/best-brokers/nigeria",
      desc: "Compare forex brokers available to traders in Nigeria.",
      shortDesc: "Forex brokers for Nigerian traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/ng.svg",
      badge: "Nigeria",
    },

    {
      title: "Best Forex Brokers in Thailand",
      href: "/en/best-brokers/thailand",
      desc: "Compare forex brokers available to traders in Thailand.",
      shortDesc: "Forex brokers for Thai traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/th.svg",
      badge: "Thailand",
    },

    {
      title: "Best Forex Brokers in the Philippines",
      href: "/en/best-brokers/philippines",
      desc: "Compare forex brokers available to traders in the Philippines.",
      shortDesc: "Forex brokers for Filipino traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/ph.svg",
      badge: "Philippines",
    },

    {
      title: "Best Forex Brokers in Kenya",
      href: "/en/best-brokers/kenya",
      desc: "Compare forex brokers available to traders in Kenya.",
      shortDesc: "Forex brokers for Kenyan traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/ke.svg",
      badge: "Kenya",
    },

    {
      title: "Best Forex Brokers in Vietnam",
      href: "/en/best-brokers/vietnam",
      desc: "Compare forex brokers available to traders in Vietnam.",
      shortDesc: "Forex brokers for Vietnamese traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/vn.svg",
      badge: "Vietnam",
    },

    {
      title: "Best Forex Brokers in Indonesia",
      href: "/en/best-brokers/indonesia",
      desc: "Compare forex brokers available to traders in Indonesia.",
      shortDesc: "Forex brokers for Indonesian traders",
      flag: "https://hatscripts.github.io/circle-flags/flags/id.svg",
      badge: "Indonesia",
    },
  ];
}

function getTypePages() {
  return [
    {
      title: "Best Islamic Trading Brokers",
      href: "/en/best-brokers/islamic",
      desc: "Brokers offering Islamic (swap-free) accounts suitable for Muslim traders.",
    },
    {
      title: "Best Brokers for Beginners",
      href: "/en/best-brokers/beginners",
      desc: "Beginner-friendly brokers with easy platforms and low minimum deposits.",
    },
    {
      title: "Best Low Spread Brokers",
      href: "/en/best-brokers/low-spread",
      desc: "Compare brokers offering low spreads and professional trading accounts.",
    },
    {
      title: "Best MT4 & MT5 Brokers",
      href: "/en/best-brokers/mt4-mt5",
      desc: "Brokers supporting MetaTrader 4 and MetaTrader 5 for day traders and professionals.",
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
    name_en: string | null;
    slug: string | null;
    logo: string | null;
    rating: number | null;
    publication_status: string | null;
  } | null;

  broker_2: {
    name: string | null;
    name_en: string | null;
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
  { data: comparisonsData },
  { data: rankingData },
  { data: homeEvents },
] = await Promise.all([
    supabase
  .from("brokers")
  .select(`
    id,
    name,
    name_en,
    slug,
    rating,
    min_deposit,
    platforms,
    regulation,
    regulation_short,
    best_for,
    best_for_en,
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
      name_en,
      slug,
      logo,
      rating,
      publication_status
    ),
    broker_2:broker_2_id (
      name,
      name_en,
      slug,
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
    title_en,
    excerpt_en,
    category,
    start_date,
    end_date,
    venue_en,
    city_en,
    country_en,
    status,
    is_media_partner
  `)
  .eq("status", "upcoming")
  .not("title_en", "is", null)
  .not("slug", "is", null)
  .gte("end_date", today)
  .order("start_date", { ascending: true })
  .limit(12),
  ]);

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.slug && b.name);
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
      (broker.name_en || broker.name)
  )
  .sort(
    (a, b) =>
      Number(b.rating || 0) - Number(a.rating || 0)
  )
  .slice(0, 9);

  const footerFeaturedBrokers = brokers
  .filter((broker) => broker.logo && broker.slug && (broker.name_en || broker.name))
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

const accountTypeItemsEn = [
  {
    title: "Standard Accounts",
    mobileSuitable: "For beginners and everyday trading",
    desktopSuitable: "Suitable for beginners and everyday trading",
    mobileDesc: "Clear pricing with no complex commission structure.",
    desktopDesc:
      "Simple accounts with clear pricing and no complex commission structure.",
    badge: "Easy to Start",
    href: "/en/best-brokers/accounts/standard",
  },
  {
    title: "Raw Spread Accounts",
    mobileSuitable: "For scalping and active trading",
    desktopSuitable: "Suitable for scalping and active trading",
    mobileDesc: "Spreads from 0.0 pips with a separate commission.",
    desktopDesc:
      "Spreads from 0.0 pips with a separate commission for active traders.",
    badge: "Lower Spreads",
    href: "/en/best-brokers/accounts/raw-spread",
  },
  {
    title: "ECN Accounts",
    mobileSuitable: "For experienced traders",
    desktopSuitable: "Suitable for experienced traders",
    mobileDesc: "Fast execution and more direct access to liquidity.",
    desktopDesc:
      "Fast execution and more direct access to deeper market liquidity.",
    badge: "Pro Execution",
    href: "/en/lowest-spread-brokers#account-types",
  },
  {
    title: "Cent / Micro Accounts",
    mobileSuitable: "For testing with smaller capital",
    desktopSuitable: "Suitable for testing with smaller capital",
    mobileDesc: "Trade smaller positions and test your strategies.",
    desktopDesc:
      "Trade smaller position sizes and test strategies with lower capital.",
    badge: "Small Capital",
    href: "/en/best-brokers/accounts/cent",
  },
];

const whyBrokerAlarabItemsEn = [
  {
    mobileTitle: "Clear Broker Reviews",
    desktopTitle: "Clear & Structured Reviews",
    mobileDesc: "Key broker information in one organized place.",
    desktopDesc:
      "Key information on regulation, accounts, fees and platforms in one organized place.",
  },
  {
    mobileTitle: "Practical Comparisons",
    desktopTitle: "Practical Comparisons",
    mobileDesc: "See the differences that matter before choosing.",
    desktopDesc:
      "Compare brokers side-by-side and understand the differences before opening an account.",
  },
  {
    mobileTitle: "Country Rankings",
    desktopTitle: "Country-Based Rankings",
    mobileDesc: "Broker options organized for different markets.",
    desktopDesc:
      "Explore broker options organized by country and find choices for your market.",
  },
  {
    mobileTitle: "Faster Broker Research",
    desktopTitle: "Faster Broker Selection",
    mobileDesc: "Find suitable options without browsing endless pages.",
    desktopDesc:
      "Use reviews, rankings and account guides to find suitable brokers faster.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best trading broker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no single broker that suits every trader. Compare regulation, fees, platforms, account types, deposits, withdrawals, and availability in your country.",
      },
    },
    {
      "@type": "Question",
      name: "How can I check whether a broker is regulated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check the regulator and license number on the broker's website, then verify the information directly through the regulator's official register.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between trading account types?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard accounts may suit beginners, Raw Spread and ECN accounts may offer lower spreads with separate commissions, and Cent accounts may suit smaller capital.",
      },
    },
    {
      "@type": "Question",
      name: "Does a lower spread always mean a better broker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Commissions, swap fees, execution quality, slippage, regulation, and withdrawal reliability should also be considered.",
      },
    },
    {
      "@type": "Question",
      name: "Can I open a swap-free trading account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many brokers offer swap-free accounts, but conditions, alternative fees, and restrictions can vary between brokers.",
      },
    },
    {
      "@type": "Question",
      name: "What should I check before making a deposit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verify regulation, trading costs, account conditions, withdrawal methods, minimum deposit, and customer support before depositing.",
      },
    },
  ],
};

const eventList = homeEvents || [];

function formatEventDate(start?: string | null, end?: string | null) {
  if (!start) return "To be announced";

  const format = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);
    return new Intl.DateTimeFormat("en", {
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

  if (now > endDate) return { status: "ended", days: 0, hours: 0 };
  if (now >= startDate && now <= endDate) return { status: "live", days: 0, hours: 0 };

  const diff = startDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return { status: "upcoming", days, hours };
}

  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

{/* HERO - FINTECH ENGLISH */}
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
        name: broker.name_en || broker.name || "Trading Broker",
        slug: broker.slug || "",
        rating: broker.rating
          ? Number(broker.rating).toFixed(2)
          : "—",
        logo: broker.logo || null,
      }));

    return (
      <>
        <div className="relative">

          {/* FINTECH BACKGROUND */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            {/* BASE DARK GRADIENT */}
            <div className="absolute inset-0 bg-[linear-gradient(235deg,#061326_0%,#08203d_48%,#0b3260_100%)]" />

            {/* BLUE AURORA LIGHTS */}
            <div className="absolute -left-[180px] -top-[260px] h-[620px] w-[620px] rounded-full bg-[#1688ff]/25 blur-[130px]" />

            <div className="absolute -bottom-[280px] right-[18%] hidden h-[560px] w-[560px] rounded-full bg-[#0ea5e9]/15 blur-[140px] sm:block" />

            <div className="absolute right-[42%] top-[-220px] hidden h-[480px] w-[480px] rounded-full bg-[#2563eb]/10 blur-[125px] lg:block" />

            {/* TECH GRID */}
            <div className="absolute inset-0 opacity-[0.055] sm:opacity-[0.09] [background-image:linear-gradient(rgba(147,197,253,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.6)_1px,transparent_1px)] [background-size:64px_64px]" />

            {/* DATA DOTS */}
            <div className="absolute inset-y-0 left-0 w-full opacity-[0.045] sm:opacity-[0.08] [background-image:radial-gradient(circle,rgba(125,211,252,0.9)_1px,transparent_1.5px)] [background-size:24px_24px] lg:w-[56%] lg:opacity-[0.12]" />

            {/* MARKET DATA CURVE */}
            <svg
              viewBox="0 0 1600 520"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full -scale-x-100 opacity-40 sm:opacity-50 lg:opacity-[0.58]"
            >
              <defs>
                <linearGradient
                  id="heroChartLineEn"
                  x1="0"
                  y1="0"
                  x2="1600"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#38bdf8" stopOpacity="0" />
                  <stop
                    offset="0.32"
                    stopColor="#38bdf8"
                    stopOpacity="0.12"
                  />
                  <stop
                    offset="0.68"
                    stopColor="#60a5fa"
                    stopOpacity="0.38"
                  />
                  <stop
                    offset="1"
                    stopColor="#93c5fd"
                    stopOpacity="0"
                  />
                </linearGradient>

                <linearGradient
                  id="heroChartAreaEn"
                  x1="800"
                  y1="180"
                  x2="800"
                  y2="520"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2563eb" stopOpacity="0.16" />
                  <stop
                    offset="1"
                    stopColor="#2563eb"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                d="M0 418C116 406 173 436 268 394C359 354 421 386 514 337C618 282 676 344 773 292C870 240 936 267 1020 214C1110 157 1181 211 1264 157C1351 101 1438 145 1600 72V520H0V418Z"
                fill="url(#heroChartAreaEn)"
              />

              <path
                d="M0 418C116 406 173 436 268 394C359 354 421 386 514 337C618 282 676 344 773 292C870 240 936 267 1020 214C1110 157 1181 211 1264 157C1351 101 1438 145 1600 72"
                stroke="url(#heroChartLineEn)"
                strokeWidth="2"
              />

              <path
                d="M0 458C169 431 261 471 402 425C524 385 601 424 733 369C864 315 965 356 1088 302C1231 239 1354 280 1600 166"
                stroke="#60a5fa"
                strokeOpacity="0.07"
                strokeWidth="1"
                strokeDasharray="8 10"
              />
            </svg>

            {/* TECHNOLOGY RINGS */}
            <div className="absolute -left-[110px] top-[-120px] hidden h-[480px] w-[480px] rounded-full border border-blue-300/[0.07] sm:block" />

            <div className="absolute -left-[35px] top-[-45px] hidden h-[330px] w-[330px] rounded-full border border-blue-300/[0.06] sm:block" />

            {/* DEPTH OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.025] via-transparent to-black/20" />
          </div>

          {/* MAIN HERO */}
<div className="relative mx-auto w-full max-w-[1560px] px-4 py-2 sm:px-6 sm:py-5 lg:px-8 lg:py-7">
  <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-7 xl:grid-cols-[minmax(0,1fr)_445px] xl:gap-9">

    {/* HERO CONTENT */}
    <div className="relative order-1 flex h-full min-w-0 flex-col justify-center py-0 text-center sm:py-2 lg:py-3 lg:text-left">

      {/* BRAND POSITIONING */}
      <div className="hidden items-center justify-center gap-2.5 sm:flex lg:justify-start">
        <span className="h-px w-7 bg-gradient-to-r from-cyan-400 to-transparent sm:w-9" />

        <div
          dir="ltr"
          className="flex items-center gap-2 text-[9px] font-black tracking-[0.12em] text-blue-200 sm:text-[10px]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>

          RESEARCH · COMPARE · DECIDE
        </div>
      </div>

      {/* MAIN TITLE */}
      <h1 className="mx-auto mt-1 max-w-[900px] text-[35px] font-black leading-[1.12] tracking-[-0.04em] text-white sm:mt-4 sm:text-[47px] sm:leading-[1.05] lg:mx-0 lg:text-[48px] xl:text-[58px]">
        Best Trading Brokers

        <span className="mt-2.5 block bg-gradient-to-r from-[#6dd5ff] via-[#62a9ff] to-[#9fc9ff] bg-clip-text pb-2 leading-[1.16] text-transparent sm:mt-1 lg:mt-3">
          Deeper Insight.
        </span>
      </h1>

      {/* DESCRIPTION */}
      <p className="mx-auto mt-1 max-w-[325px] text-[13px] font-semibold leading-[1.75] text-slate-200 sm:mt-2 sm:max-w-[820px] sm:text-[14px] sm:leading-7 lg:mx-0 lg:max-w-[830px] lg:text-[17px] lg:leading-8 lg:[text-wrap:pretty] xl:text-[18px]">
        <span className="sm:hidden">
          Compare regulation, fees, spreads, accounts and platforms,
          then choose the broker that fits you best.
        </span>

        <span className="hidden sm:inline">
          Compare trading brokers by regulation, fees, spreads,
          account types and platforms, and explore independent
          reviews before choosing the right broker.
        </span>
      </p>

      {/* ACTIONS */}
      <div className="mt-3 flex flex-col items-stretch justify-center gap-2 sm:mt-5 sm:flex-row sm:items-center sm:gap-3 lg:mt-6 lg:justify-start">
        <a
          href="#finder"
          className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-[13px] bg-[linear-gradient(135deg,#2878e5_0%,#1664cf_100%)] px-5 text-[12px] font-black text-white shadow-[0_14px_30px_rgba(20,105,220,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(20,105,220,0.42)] sm:min-h-[50px] sm:min-w-[180px] sm:px-6 sm:text-[13px]"
        >
          Explore Brokers

          <span className="text-[15px] transition duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
            →
          </span>
        </a>

        <Link
          href="/en/compare"
          className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[13px] border border-white/15 bg-white/[0.07] px-5 text-[12px] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/35 hover:bg-white/[0.12] sm:min-h-[50px] sm:min-w-[165px] sm:px-6 sm:text-[12px]"
        >
          Compare Brokers

          <span className="text-[14px] text-blue-300 transition duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
            →
          </span>
        </Link>
      </div>

      {/* DESKTOP TRUST STATS */}
      <div className="mt-7 hidden max-w-[900px] grid-cols-4 gap-3 lg:grid">
        {[
          {
            value: "150+",
            label: "Brokers studied",
          },
          {
            value: "50+",
            label: "Reviews & comparisons",
          },
          {
            value: "18+",
            label: "Regulators covered",
          },
          {
            value: "10",
            label: "Trading calculators",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-[17px] border border-white/10 bg-white/[0.055] px-4 py-3.5 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/25 hover:bg-white/[0.085]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />

            <div className="text-[20px] font-black leading-none text-[#76c8ff] xl:text-[22px]">
              {item.value}
            </div>

            <div className="mt-2 text-[10px] font-bold leading-4 text-blue-100/70 xl:text-[11px]">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE BROKER LOGOS */}
      <div className="mt-3 sm:mt-4 lg:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-black text-blue-100">
            Brokers reviewed
          </span>

          <Link
            href="/en/brokers"
            className="inline-flex items-center gap-1 text-[11px] font-black text-cyan-300 transition hover:text-white"
          >
            View all brokers
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {allHeroBrokers.slice(0, 6).map((broker) => (
            <Link
              key={broker.id}
              href={`/en/brokers/${broker.slug}`}
              className="group flex h-[60px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-300"
            >
              {broker.logo ? (
                <img
                  src={broker.logo}
                  alt={`${broker.name} logo`}
                  className="h-[48px] w-[105px] scale-[1.14] object-contain transition duration-300 group-hover:scale-[1.2]"
                />
              ) : (
                <span className="text-[10px] font-black text-slate-700">
                  {broker.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* BROKER LOGOS — DESKTOP */}
    <div className="order-2 hidden h-full lg:block">
      <div className="relative ml-0 h-full w-full">

        {/* BLUE GLOW */}
        <div className="absolute -inset-5 rounded-[42px] bg-gradient-to-bl from-[#2878e5]/25 via-[#38bdf8]/10 to-transparent blur-[36px]" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(215deg,#0b1f3a_0%,#102f59_58%,#174f8f_100%)] p-5 shadow-[0_28px_75px_rgba(6,25,53,0.28)]">

          {/* CARD HEADER */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div className="text-left">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-black text-blue-100">
                Brokers reviewed
              </span>

              <h2 className="mt-2 text-[20px] font-black text-white">
                Broker data in one place
              </h2>

              <p className="mt-1 text-[11px] font-semibold text-blue-100/75">
                Compare regulation, accounts and fees with ease
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-[18px] text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]">
              ✓
            </div>
          </div>

          {/* DESKTOP LOGO GRID */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {allHeroBrokers.slice(0, 6).map((broker) => (
              <Link
                key={broker.id}
                href={`/en/brokers/${broker.slug}`}
                className="group flex h-[86px] items-center justify-center overflow-hidden rounded-[20px] border border-white/15 bg-white p-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_34px_rgba(0,0,0,0.18)]"
              >
                {broker.logo ? (
                  <img
                    src={broker.logo}
                    alt={`${broker.name} logo`}
                    className="h-[72px] w-[145px] scale-[1.08] object-contain transition duration-300 group-hover:scale-[1.14]"
                  />
                ) : (
                  <span className="text-xs font-black text-slate-700">
                    {broker.name}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* CARD FOOTER */}
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
            <div className="min-w-0 text-left">
              <div className="text-[13px] font-black text-white">
                Independent reviews. Updated data.
              </div>

              <div className="mt-1 text-[10px] font-semibold leading-4 text-blue-100/80">
                Advertising never influences our ratings
              </div>
            </div>

            <Link
              href="/en/brokers"
              className="ml-3 inline-flex h-9 shrink-0 items-center justify-center rounded-xl bg-white px-4 text-[11px] font-black text-[#123d73] shadow-sm transition hover:bg-blue-50"
            >
              All Brokers
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

{/* HOME CONTENT + RIGHT DESKTOP SIDEBAR */}
<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-start xl:gap-3">

    {/* ALL ENGLISH HOME PAGE SECTIONS */}
<div className="min-w-0 xl:[&>section]:pr-0">

{/* FINDER */}
<section
  id="finder"
  className="scroll-mt-24 mx-auto max-w-7xl px-0 pt-2 pb-3 sm:pt-4 sm:pb-4 lg:pt-4 lg:pb-4"
>
  <BrokerFinderEN
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
    title: "Regulation & Fund Protection",
    mobileTitle: "Regulation & Safety",
    desc: "We review regulatory strength, legal entities, client fund protection and transparency.",
  },
  {
    num: "02",
    title: "Trading Costs",
    mobileTitle: "Trading Costs",
    desc: "We compare spreads, commissions, swap fees and other costs that may affect traders.",
  },
  {
    num: "03",
    title: "Platforms & Execution",
    mobileTitle: "Platforms",
    desc: "We assess execution speed, platform stability and ease of use across devices.",
  },
  {
    num: "04",
    title: "Deposits & Withdrawals",
    mobileTitle: "Payments",
    desc: "We review payment methods, processing speed, withdrawal reliability and related fees.",
  },
  {
    num: "05",
    title: "Swap-Free Accounts",
    mobileTitle: "Swap-Free",
    desc: "We review swap-free account conditions, restrictions and any related charges.",
  },
  {
    num: "06",
    title: "Support & User Experience",
    mobileTitle: "Customer Support",
    desc: "We assess customer support, account opening and the overall user experience.",
  },
];

      return (
        <>
          {/* =========================
              DESKTOP
          ========================== */}
          <div className="hidden lg:block">
            {/* HEADER */}
            <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
              <div className="flex items-center justify-between gap-6">

                {/* TEXT */}
                <div className="min-w-0 flex-1 text-left">
                  <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
                    Broker Rating Methodology
                  </span>

                  <h2 className="mt-3 text-[36px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f]">
                    How We Rate Trading Brokers
                  </h2>

                  <p className="mt-2.5 whitespace-nowrap text-[14px] font-semibold leading-7 text-slate-600 xl:text-[15px]">
                    We review the factors that matter most to traders, from regulation and trading costs
                    to execution, withdrawals, swap-free accounts and customer support.
                  </p>
                </div>

                {/* CTA */}
                <div className="shrink-0 self-center pr-4 lg:translate-x-[14px]">
                  <Link
                    href="/en/how-we-review-brokers"
                    className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                  >
                    View Methodology
                  </Link>
                </div>
              </div>
            </div>

            {/* DESKTOP CARDS */}
            <div className="grid grid-cols-3 gap-3 px-5 py-4">
              {ratingItems.map((item) => (
                <Link
                  key={item.num}
                  href="/en/how-we-review-brokers"
                  className="group relative min-h-[108px] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)]"
                >
                  {/* TOP ACCENT */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />

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
                Broker Rating Methodology
              </span>

              <h2 className="mx-auto mt-2.5 max-w-[315px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px]">
                How We Rate Trading Brokers
              </h2>

              <p className="mx-auto mt-1.5 max-w-[430px] text-[11px] font-semibold leading-5 text-slate-600 sm:text-[13px] sm:leading-6">
                We review regulation, trading costs, platforms, withdrawals,
                swap-free accounts and customer support.
              </p>
            </div>

            {/* MOBILE CARDS */}
            <div className="grid grid-cols-2 gap-2 bg-white p-3 sm:gap-2.5 sm:p-4">
              {ratingItems.map((item) => (
                <Link
                  key={item.num}
                  href="/en/how-we-review-brokers"
                  className="group relative flex min-h-[64px] items-center justify-center overflow-hidden rounded-[14px] border border-slate-200 bg-[#fbfdff] px-2.5 py-2 transition duration-300 hover:border-brand-200 hover:bg-brand-50/30"
                >
                  {/* TOP ACCENT */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-60" />

                  {/* MOBILE TITLE */}
                  <h3 className="text-center text-[12.5px] font-black leading-5 text-[#07111f] sm:text-[15px]">
                    {item.mobileTitle}
                  </h3>
                </Link>
              ))}
            </div>

            {/* MOBILE CTA */}
            <div className="border-t border-slate-100 bg-white px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4">
              <Link
                href="/en/how-we-review-brokers"
                className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-brand-500 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:bg-brand-600 sm:h-11 sm:text-[12px]"
              >
                View Rating Methodology
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
    href="https://one.exnessonelink.com/intl/en/a/hhmbah9f13"
    target="_blank"
    rel="sponsored noopener noreferrer"
    aria-label="Visit Exness"
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
      src="https://d3dpet1g0ty5ed.cloudfront.net/EN_Choose_Better_Forex_Conditions_v2728x90px.png"
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
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5 sm:px-6 lg:py-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

        {/* TEXT */}
        <div className="min-w-0 flex-1 text-center lg:text-left">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
            Broker Comparisons
          </span>

          <h2 className="mx-auto mt-2.5 max-w-[315px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
            Most Popular Broker Comparisons
          </h2>

          {/* MOBILE DESCRIPTION */}
          <p className="mx-auto mt-2 max-w-[300px] text-[12px] font-semibold leading-6 text-slate-600 sm:hidden">
            Compare leading brokers by regulation, fees, accounts and trading platforms.
          </p>

          {/* DESKTOP DESCRIPTION */}
          <p className="mt-2 hidden whitespace-nowrap text-[14px] font-semibold leading-7 text-slate-600 sm:block xl:text-[15px]">
            Compare popular brokers and see the key differences in regulation, account types, fees, spreads and trading platforms.
          </p>
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden shrink-0 lg:flex lg:self-center lg:pr-4 lg:translate-x-[14px]">
          <Link
            href="/en/compare"
            className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Browse Comparisons
          </Link>
        </div>

        {/* MOBILE CTA */}
        <div className="flex justify-center lg:hidden">
          <Link
            href="/en/compare"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-5 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition hover:bg-brand-600"
          >
            Browse Comparisons
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
                  Featured Comparison
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
      href={
        cmp.broker_1?.slug
          ? `/en/brokers/${cmp.broker_1.slug}`
          : "/en/brokers"
      }
      className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-slate-200 bg-slate-50 p-2"
    >
      {cmp.broker_1?.logo ? (
        <img
          src={cmp.broker_1.logo}
          alt={
            cmp.broker_1.name_en ||
            cmp.broker_1.name ||
            "Broker 1"
          }
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-[9px] text-slate-400">
          Logo
        </span>
      )}
    </Link>

    <Link
      href={
        cmp.broker_1?.slug
          ? `/en/brokers/${cmp.broker_1.slug}`
          : "/en/brokers"
      }
      className="mt-2 max-w-[100px] truncate text-[14px] font-black leading-5 text-[#0f172a]"
    >
      {cmp.broker_1?.name_en ||
        cmp.broker_1?.name ||
        "Broker 1"}
    </Link>

    <span
      aria-label={`Rating for ${
        cmp.broker_1?.name_en ||
        cmp.broker_1?.name ||
        "Broker 1"
      }: ${
        cmp.broker_1?.rating?.toFixed(2) ?? "not available"
      } out of 5`}
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
      href={
        cmp.broker_2?.slug
          ? `/en/brokers/${cmp.broker_2.slug}`
          : "/en/brokers"
      }
      className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-slate-200 bg-slate-50 p-2"
    >
      {cmp.broker_2?.logo ? (
        <img
          src={cmp.broker_2.logo}
          alt={
            cmp.broker_2.name_en ||
            cmp.broker_2.name ||
            "Broker 2"
          }
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-[9px] text-slate-400">
          Logo
        </span>
      )}
    </Link>

    <Link
      href={
        cmp.broker_2?.slug
          ? `/en/brokers/${cmp.broker_2.slug}`
          : "/en/brokers"
      }
      className="mt-2 max-w-[100px] truncate text-[14px] font-black leading-5 text-[#0f172a]"
    >
      {cmp.broker_2?.name_en ||
        cmp.broker_2?.name ||
        "Broker 2"}
    </Link>

    <span
      aria-label={`Rating for ${
        cmp.broker_2?.name_en ||
        cmp.broker_2?.name ||
        "Broker 2"
      }: ${
        cmp.broker_2?.rating?.toFixed(2) ?? "not available"
      } out of 5`}
      className="mt-0.5 text-[10px] font-bold text-[#f59e0b]"
    >
      ★ {cmp.broker_2?.rating?.toFixed(2) ?? "—"}
    </span>
  </div>
</div>


              {/* FEATURES */}
              <div className="mt-3 text-center text-[9.5px] font-bold text-slate-500">
                Accounts
                <span className="mx-1.5 text-slate-300">•</span>
                Fees
                <span className="mx-1.5 text-slate-300">•</span>
                Platforms
                <span className="mx-1.5 text-slate-300">•</span>
                Regulation
              </div>


              {/* CTA */}
              <div className="mt-3">
                <Link
                  href={`/en/compare/${cmp.slug}`}
                  className="flex h-10 w-full items-center justify-center rounded-xl bg-brand-500 px-4 text-[12px] font-black text-white transition hover:bg-brand-600"
                >
                  View Full Comparison
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
                Featured Comparison
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
      href={
        cmp.broker_1?.slug
          ? `/en/brokers/${cmp.broker_1.slug}`
          : "/en/brokers"
      }
      className="flex h-[64px] w-[64px] items-center justify-center rounded-[17px] border border-slate-200 bg-slate-50 p-2.5 transition hover:border-brand-100 hover:bg-brand-50 xl:h-[68px] xl:w-[68px]"
    >
      {cmp.broker_1?.logo ? (
        <img
          src={cmp.broker_1.logo}
          alt={
            cmp.broker_1.name_en ||
            cmp.broker_1.name ||
            "Broker 1"
          }
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-[9px] text-slate-400">
          Logo
        </span>
      )}
    </Link>

    <Link
      href={
        cmp.broker_1?.slug
          ? `/en/brokers/${cmp.broker_1.slug}`
          : "/en/brokers"
      }
      className="mt-2.5 max-w-[120px] truncate text-[16px] font-black leading-none text-[#0f172a] transition hover:text-brand-500"
    >
      {cmp.broker_1?.name_en ||
        cmp.broker_1?.name ||
        "Broker 1"}
    </Link>

    <span
      aria-label={`Rating for ${
        cmp.broker_1?.name_en ||
        cmp.broker_1?.name ||
        "Broker 1"
      }: ${
        cmp.broker_1?.rating?.toFixed(2) ?? "not available"
      } out of 5`}
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
      href={
        cmp.broker_2?.slug
          ? `/en/brokers/${cmp.broker_2.slug}`
          : "/en/brokers"
      }
      className="flex h-[64px] w-[64px] items-center justify-center rounded-[17px] border border-slate-200 bg-slate-50 p-2.5 transition hover:border-brand-100 hover:bg-brand-50 xl:h-[68px] xl:w-[68px]"
    >
      {cmp.broker_2?.logo ? (
        <img
          src={cmp.broker_2.logo}
          alt={
            cmp.broker_2.name_en ||
            cmp.broker_2.name ||
            "Broker 2"
          }
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-[9px] text-slate-400">
          Logo
        </span>
      )}
    </Link>

    <Link
      href={
        cmp.broker_2?.slug
          ? `/en/brokers/${cmp.broker_2.slug}`
          : "/en/brokers"
      }
      className="mt-2.5 max-w-[120px] truncate text-[16px] font-black leading-none text-[#0f172a] transition hover:text-brand-500"
    >
      {cmp.broker_2?.name_en ||
        cmp.broker_2?.name ||
        "Broker 2"}
    </Link>

    <span
      aria-label={`Rating for ${
        cmp.broker_2?.name_en ||
        cmp.broker_2?.name ||
        "Broker 2"
      }: ${
        cmp.broker_2?.rating?.toFixed(2) ?? "not available"
      } out of 5`}
      className="mt-1 text-[10px] font-bold text-[#f59e0b]"
    >
      ★ {cmp.broker_2?.rating?.toFixed(2) ?? "—"}
    </span>
  </div>
</div>


            {/* FEATURES */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex min-h-[44px] items-center justify-center rounded-xl bg-brand-50 px-2.5 py-2 text-center text-[10px] font-bold leading-4 text-brand-700">
                Accounts & Fees
              </div>

              <div className="flex min-h-[44px] items-center justify-center rounded-xl bg-slate-50 px-2.5 py-2 text-center text-[10px] font-bold leading-4 text-slate-600 ring-1 ring-slate-200">
                Platforms & Regulation
              </div>
            </div>


            {/* CTA */}
            <div className="mt-auto pt-3">
              <Link
                href={`/en/compare/${cmp.slug}`}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-500 px-4 text-[13px] font-black text-white transition hover:bg-brand-600"
              >
                View Full Comparison
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

{/* =========================================================
    COUNTRIES DIRECTORY - SAME STYLE AS ARABIC
========================================================= */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">

  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)] sm:rounded-[28px]">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3 sm:px-5 lg:px-6">

      <div className="flex flex-col items-center gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-5">

        {/* TEXT */}
        <div className="min-w-0 flex-1 text-center lg:text-left">

          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[11px] lg:text-[12px]">
            Brokers by Country
          </span>


          <h2 className="mx-auto mt-2 max-w-[310px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[32px] lg:mx-0 lg:text-[34px]">
            Best Forex Brokers by Country
          </h2>


          {/* MOBILE DESCRIPTION */}
          <p className="mx-auto mt-2 max-w-[305px] text-[11px] font-semibold leading-5 text-slate-600 md:hidden">
            Choose your country to find suitable forex brokers based on
            regulation, trading accounts and payment methods.
          </p>


          {/* DESKTOP DESCRIPTION */}
          <p className="mt-1.5 hidden max-w-[900px] text-[13px] font-semibold leading-6 text-slate-600 md:block lg:text-[14px]">
            Explore the best forex brokers by country and compare regulation,
            trading accounts, spreads, deposit and withdrawal methods, and
            local availability.
          </p>

        </div>


        {/* CTA */}
        <div className="shrink-0 self-center lg:pr-4 lg:translate-x-[14px]">

          <Link
            href="/en/best-brokers"
            className="inline-flex h-10 min-w-[160px] items-center justify-center rounded-xl bg-brand-500 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 sm:h-11 sm:min-w-[180px] sm:px-5 sm:text-[13px]"
          >
            View All Countries
          </Link>

        </div>

      </div>

    </div>


    {/* =====================================================
        MOBILE
        EXACT COMPACT STYLE OF ARABIC
    ====================================================== */}
    <div className="p-2 md:hidden">

      <div className="grid grid-cols-2 gap-1.5">

        {countryPages.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            title={item.title}
            className="group flex h-[52px] items-center rounded-[11px] border border-slate-200 bg-white px-2 shadow-[0_2px_7px_rgba(15,23,42,0.03)] transition duration-300 hover:border-brand-200 hover:bg-[#f8fbff]"
          >

            <div className="flex w-full items-center justify-between gap-1.5">

              {/* COUNTRY */}
              <div className="flex min-w-0 items-center gap-1.5">

                {/* FLAG */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">

                  <img
                    src={item.flag}
                    alt={`${item.badge} flag`}
                    className="h-5 w-5 rounded-full object-cover"
                    loading="lazy"
                  />

                </div>


                {/* COUNTRY NAME */}
                <h3 className="truncate text-[13px] font-black leading-5 text-[#0f172a]">
                  {item.badge}
                </h3>

              </div>


              {/* ARROW */}
              <span className="shrink-0 text-[14px] font-black leading-none text-brand-500 transition group-hover:translate-x-[2px]">
                →
              </span>

            </div>

          </Link>

        ))}

      </div>


      {/* =================================================
          ALL OTHER COUNTRIES - CENTERED
      ================================================= */}
      <div className="mt-1.5 flex justify-center">

        <Link
          href="/en/best-brokers"
          className="group flex h-[52px] w-[calc(50%-3px)] min-w-[145px] items-center rounded-[11px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-2 shadow-[0_2px_7px_rgba(37,99,235,0.04)] transition duration-300 hover:bg-brand-50"
        >

          <div className="flex w-full items-center justify-between gap-1.5">

            <div className="flex min-w-0 items-center gap-1.5">

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white text-[13px] shadow-sm">
                🌍
              </div>


              <h3 className="truncate text-[12px] font-black leading-5 text-[#0f172a]">
                Other Countries
              </h3>

            </div>


            <span className="shrink-0 text-[14px] font-black leading-none text-brand-500 transition group-hover:translate-x-[2px]">
              →
            </span>

          </div>

        </Link>

      </div>

    </div>


    {/* =====================================================
        DESKTOP / TABLET
        SAME STYLE AS ARABIC
    ====================================================== */}
    <div className="hidden p-3 md:block lg:p-3.5">

      <div className="grid gap-2.5 md:grid-cols-2 lg:gap-3">

        {countryPages.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            title={item.title}
            className="group min-h-[68px] rounded-[15px] border border-slate-200 bg-white px-3 py-2 shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_12px_26px_rgba(37,99,235,0.10)]"
          >

            <div className="flex min-h-[52px] items-center gap-2.5">

              {/* FLAG */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-[#f8fafc] shadow-sm">

                <img
                  src={item.flag}
                  alt={`${item.badge} flag`}
                  className="h-6 w-6 rounded-full object-cover"
                  loading="lazy"
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
              <div className="shrink-0 text-right">

                <div className="text-[9px] font-bold text-slate-400">
                  Open page
                </div>


                <div className="mt-0.5 text-[16px] font-black leading-none text-brand-500 transition duration-300 group-hover:translate-x-[3px]">
                  →
                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>


      {/* =================================================
          ALL OTHER COUNTRIES DESKTOP - CENTERED
      ================================================= */}
      <div className="mt-2.5 flex justify-center">

        <Link
          href="/en/best-brokers"
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
                All Other Countries
              </h3>


              <p className="mt-0.5 truncate text-[11px] font-medium leading-4 text-slate-500">
                Browse all available country-specific forex broker rankings
              </p>

            </div>


            {/* ACTION */}
            <div className="shrink-0 text-right">

              <div className="text-[9px] font-bold text-brand-500">
                View all
              </div>


              <div className="mt-0.5 text-[16px] font-black leading-none text-brand-500 transition duration-300 group-hover:translate-x-[3px]">
                →
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
    href="https://track.pepperstonepartners.com/visit/?bta=44176&nci=7484"
    target="_blank"
    rel="sponsored noopener noreferrer"
    aria-label="Visit Pepperstone"
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
      src="https://pepperstonepartners.ck-cdn.com/tn/serve/?cid=687947"
      width="728"
      height="90"
      alt="Pepperstone"
      className="block h-auto w-full rounded-[10px] object-contain sm:h-[82px] sm:object-cover"
    />
  </a>
</div>

{/* ACCOUNT TYPES HOME SECTION - COMPACT PREMIUM ENGLISH */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)]">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5 sm:px-6 lg:py-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

        {/* TEXT */}
        <div className="min-w-0 flex-1 text-center lg:text-left">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[11px] lg:text-[12px]">
            Trading Account Types
          </span>

          <h2 className="mx-auto mt-2.5 max-w-[330px] text-[24px] font-black leading-[1.18] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
            Choose the Right Account for Your Trading Style
          </h2>

          {/* MOBILE DESCRIPTION */}
          <p className="mx-auto mt-2 max-w-[305px] text-[11px] font-semibold leading-5 text-slate-600 sm:hidden">
            Compare popular account types and choose the option that best fits
            your experience and trading capital.
          </p>

          {/* DESKTOP DESCRIPTION */}
          <p className="mt-2 hidden whitespace-nowrap text-[14px] font-semibold leading-6 text-slate-600 sm:block lg:text-[15px]">
            Compare Standard, Raw Spread, ECN and Cent accounts to find the option that best matches your experience and trading capital.
          </p>
        </div>

        {/* CTA */}
        <div className="shrink-0 self-center pr-4 lg:translate-x-[14px]">
          <Link
            href="/en/lowest-spread-brokers"
            className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Compare Account Types
          </Link>
        </div>

      </div>
    </div>

    {/* =====================================================
        MOBILE
    ====================================================== */}
    <div className="p-2.5 sm:hidden">
      <div className="grid gap-2.5">
        {accountTypeItemsEn.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-[15px] border border-slate-200 bg-white px-3 py-2.5 shadow-[0_3px_10px_rgba(15,23,42,0.035)] transition duration-300 hover:border-brand-200 hover:bg-[#fbfdff]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1 text-left">

                {/* TOP */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-[9px] font-black text-brand-600">
                    {item.badge}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                    →
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="mt-1.5 text-[15px] font-black leading-5 text-[#07111f]">
                  {item.title}
                </h3>

                {/* SUITABLE */}
                <p className="mt-1 text-[11px] font-black leading-5 text-brand-600">
                  {item.mobileSuitable}
                </p>

                {/* DESCRIPTION */}
                <p className="mt-0.5 text-[10.5px] font-semibold leading-5 text-slate-500">
                  {item.mobileDesc}
                </p>

              </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="mt-1.5 flex items-center justify-between border-t border-slate-100 pt-1.5 text-[9.5px] font-extrabold text-brand-500">
              <span>
                Compare brokers offering this account
              </span>

              <span className="shrink-0 transition group-hover:translate-x-1">
                →
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
        {accountTypeItemsEn.map((item) => (
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
                →
              </span>
            </div>

            {/* TITLE */}
            <h3 className="mt-3 text-[18px] font-black leading-6 text-[#07111f]">
              {item.title}
            </h3>

            {/* SUITABLE */}
            <p className="mt-1.5 min-h-[36px] text-[12px] font-black leading-6 text-brand-600">
              {item.desktopSuitable}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-1 min-h-[44px] text-[11.5px] font-medium leading-6 text-slate-600">
              {item.desktopDesc}
            </p>

            {/* BOTTOM CTA */}
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[10px] font-extrabold leading-5 text-brand-500">
              <span>
                Compare brokers offering this account
              </span>

              <span className="shrink-0 transition group-hover:translate-x-1">
                →
              </span>
            </div>

          </Link>
        ))}
      </div>
    </div>

  </div>
</section>

{/* WHY TRUST BROKER ALARAB - COMPACT PREMIUM */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)]">

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5 sm:px-6 lg:py-4">
      <div className="text-center lg:text-left">

        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[11px] lg:text-[12px]">
          Why Broker Alarab?
        </span>

        <h2 className="mx-auto mt-2.5 max-w-[330px] text-[25px] font-black leading-[1.12] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
          Why Do Traders Trust Broker Alarab?
        </h2>

        {/* MOBILE DESCRIPTION */}
        <p className="mx-auto mt-2 max-w-[305px] text-[11px] font-semibold leading-5 text-slate-600 sm:hidden">
          We make broker research easier with clear reviews, practical
          comparisons and country-based rankings.
        </p>

        {/* DESKTOP DESCRIPTION */}
        <p className="mt-2 hidden whitespace-nowrap text-[14px] font-semibold leading-6 text-slate-600 sm:block lg:text-[15px]">
          We help traders choose brokers through clear reviews, practical comparisons, country rankings and focused account analysis.
        </p>

      </div>
    </div>

    {/* =====================================================
        MOBILE
    ====================================================== */}
    <div className="grid gap-2.5 p-2.5 sm:hidden">
      {whyBrokerAlarabItemsEn.map((item, index) => (
        <div
          key={item.desktopTitle}
          className="rounded-[14px] border border-slate-200 bg-[#fbfdff] px-3 py-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.035)]"
        >
          <div className="flex items-center gap-2.5">

            {/* NUMBER */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white text-[10px] font-black text-brand-600">
              {index + 1}
            </span>

            {/* CONTENT */}
            <div className="min-w-0 flex-1 text-left">
              <h3 className="text-[14px] font-black leading-5 text-[#0f172a]">
                {item.mobileTitle}
              </h3>

              <p className="mt-0.5 text-[10.5px] font-semibold leading-5 text-slate-500">
                {item.mobileDesc}
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
        {whyBrokerAlarabItemsEn.map((item, index) => (
          <div
            key={item.desktopTitle}
            className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-[#fcfdff] hover:shadow-[0_12px_28px_rgba(37,99,235,0.09)]"
          >
            {/* TOP ACCENT */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-60 transition duration-300 group-hover:opacity-100" />

            {/* TITLE + NUMBER */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="flex-1 text-[17px] font-black leading-6 tracking-[-0.02em] text-[#07111f]">
                {item.desktopTitle}
              </h3>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[11px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                {index + 1}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-2 text-[11.5px] font-medium leading-6 text-slate-600">
              {item.desktopDesc}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

{/* FOREX & FINTECH EVENTS - COMPACT PREMIUM */}
{(() => {
  /*
   * Keep the existing event-selection logic:
   * nearest two regular events + official media partner event
   */
  const nearestRegularEvents = eventList
    .filter((event) => event.is_media_partner !== true)
    .slice(0, 2);

  const mediaPartnerEvent = eventList.find(
    (event) => event.is_media_partner === true
  );

  const selectedEvents = mediaPartnerEvent
    ? [...nearestRegularEvents, mediaPartnerEvent]
    : eventList.slice(0, 3);

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5 sm:px-6 lg:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

          {/* TEXT */}
          <div className="min-w-0 flex-1 text-center lg:text-left">
            <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[11px] lg:text-[12px]">
              Forex & FinTech Events
            </span>

            <h2 className="mx-auto mt-2.5 max-w-[315px] text-[25px] font-black leading-[1.12] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
              Forex & FinTech Events in 2026
            </h2>

            {/* MOBILE DESCRIPTION */}
            <p className="mx-auto mt-2 max-w-[305px] text-[11px] font-semibold leading-5 text-slate-600 sm:hidden">
              Follow key forex and fintech events, including exhibitions where
              Broker Alarab is an official media partner.
            </p>

            {/* DESKTOP DESCRIPTION */}
            <p className="mt-2 hidden whitespace-nowrap text-[14px] font-semibold leading-6 text-slate-600 sm:block lg:text-[15px]">
              Follow key forex and fintech exhibitions, including events where Broker Alarab participates as an official media partner.
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0 self-center pr-4 lg:translate-x-[14px]">
            <Link
              href="/en/events"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
            >
              View All Events
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

          const mediaPartner = event.is_media_partner === true;

          const eventTitle = (
            event.title_en || "Trading Event"
          )
            .replace(/\s*2026\s*/gi, " ")
            .replace(/\s+/g, " ")
            .trim();

          const eventLocation =
            event.city_en?.trim() ||
            event.country_en?.trim() ||
            "Location to be announced";

          return (
            <article
              key={event.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] sm:rounded-[20px]"
            >
              {/* TOP ACCENT */}
              <div
                className={`h-[3px] ${
                  mediaPartner
                    ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-brand-500"
                    : "bg-gradient-to-r from-brand-600 via-brand-400 to-[#93c5fd]"
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

                      Official Media Partner
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-0.5 text-[8.5px] font-black text-brand-500 shadow-sm sm:text-[9px]">
                      Upcoming Event
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-[15px] font-black leading-5 text-[#07111f] sm:text-[16px]">
                  {eventTitle}
                </h3>

                <div className="mt-0.5 flex items-center justify-center gap-1 text-[10px] font-bold text-slate-500 sm:text-[11px]">
                  <span className="text-brand-500">
                    ●
                  </span>

                  <span>
                    {eventLocation}
                  </span>
                </div>
              </div>


              {/* =================================================
                  COUNTDOWN
              ================================================= */}
              {count.status === "live" ? (
                <div className="border-b border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
                  <div className="text-[15px] font-black text-emerald-600 sm:text-[17px]">
                    Live Now
                  </div>

                  <div className="mt-0.5 text-[9px] font-bold text-emerald-700">
                    The event is currently taking place
                  </div>
                </div>
              ) : (
                <div className="border-b border-slate-100 bg-[#fbfdff] px-3 py-2">
                  <div className="flex items-center justify-center gap-2">

                    {/* DAYS */}
                    <div className="inline-flex min-w-[70px] items-center justify-center gap-1 rounded-xl border border-brand-100 bg-white px-2.5 py-1.5 shadow-sm">
                      <span
                        dir="ltr"
                        className="text-[16px] font-black text-brand-600 sm:text-[18px]"
                      >
                        {count.days}
                      </span>

                      <span className="text-[9px] font-bold text-slate-500">
                        Days
                      </span>
                    </div>

                    {/* HOURS */}
                    <div className="inline-flex min-w-[70px] items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm">
                      <span
                        dir="ltr"
                        className="text-[16px] font-black text-slate-700 sm:text-[18px]"
                      >
                        {count.hours}
                      </span>

                      <span className="text-[9px] font-bold text-slate-500">
                        Hours
                      </span>
                    </div>
                  </div>

                  <div className="mt-1 text-center text-[8.5px] font-bold text-slate-400">
                    Time Remaining
                  </div>
                </div>
              )}


              {/* =================================================
                  EVENT DETAILS
              ================================================= */}
              <div className="flex flex-1 flex-col p-2.5 sm:p-3">

                <div className="rounded-[13px] border border-slate-100 bg-slate-50/70 px-2.5 py-2 text-center">

                  {/* DATE */}
                  <div className="text-[10px] font-black leading-5 text-slate-800 sm:text-[11px]">
                    {formatEventDate(
                      event.start_date,
                      event.end_date
                    )}
                  </div>

                  {/* LOCATION */}
                  <div className="mt-0.5 text-[9px] font-bold leading-4 text-slate-600 sm:text-[10px]">
                    {event.city_en ||
                      event.country_en ||
                      "Location to be announced"}

                    {event.city_en && event.country_en
                      ? `, ${event.country_en}`
                      : ""}
                  </div>

                  {/* VENUE - DESKTOP ONLY */}
                  {event.venue_en && (
                    <div className="mt-0.5 hidden text-[9px] font-medium leading-4 text-slate-500 sm:block">
                      {event.venue_en}
                    </div>
                  )}
                </div>


                {/* EVENT CTA */}
                <Link
                  href={`/en/events/${event.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-[38px] w-full items-center justify-center rounded-xl border border-brand-200 bg-brand-50 px-3 text-[11px] font-black text-brand-600 transition duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white sm:min-h-[40px] sm:text-[12px]"
                >
                  View Event Details

                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
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

{/* BEST BROKERS BY NEED - DESKTOP + MOBILE TOP RATED */}
<section className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.045)]">
    {(() => {
      /* =====================================================
          DATA
      ====================================================== */

      /* DESKTOP */
      const topFourBrokers = footerFeaturedBrokers.slice(0, 4);

      const categoryLabels = [
  {
    title: "Best for Beginners",
    desc: "Simple account options and an easier starting experience.",
    factLabel: "Best For",
    factValue: "Easy Start",
    pageHref: "/en/best-brokers",
  },
  {
    title: "Best for Low Spreads",
    desc: "Competitive trading costs for active traders and scalpers.",
    factLabel: "Key Benefit",
    factValue: "Lower Costs",
    pageHref: "/en/lowest-spread-brokers",
  },
  {
    title: "Best for Account Options",
    desc: "Flexible account choices for different trading styles.",
    factLabel: "Accounts",
    factValue: "More Choice",
    pageHref: "/en/brokers",
  },
  {
    title: "Best for Platforms",
    desc: "Multiple trading platforms for everyday and active trading.",
    factLabel: "Platforms",
    factValue: "Multiple",
    pageHref: "/en/brokers",
  },
];

      /* MOBILE - SAME IDEA AS ARABIC VERSION */
      const mobileTopBrokers = [...footerFeaturedBrokers]
        .filter(
          (broker) =>
            broker &&
            broker.slug &&
            (broker.name_en || broker.name) &&
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
                Top Rated Brokers
              </span>

              <h2 className="mx-auto mt-2 max-w-[310px] text-[24px] font-black leading-[1.12] tracking-[-0.02em] text-[#07111f]">
                Top Brokers on Broker Alarab
              </h2>

              <p className="mx-auto mt-1.5 max-w-[300px] text-[10.5px] font-semibold leading-5 text-slate-500">
                Explore our highest-rated brokers and swipe to see more.
              </p>

              <Link
                href="/en/brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex h-9 items-center justify-center rounded-xl bg-brand-500 px-5 text-[10.5px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition hover:bg-brand-600"
              >
                View All Brokers
              </Link>
            </div>


            {/* =====================================================
                MOBILE HORIZONTAL CAROUSEL
            ====================================================== */}
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


                  {/* RANK + RATING */}
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
                    href={`/en/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto mt-2.5 flex h-[58px] w-[78px] items-center justify-center rounded-[14px] border border-slate-200 bg-[#fbfdff] p-2 shadow-sm transition duration-300 group-hover:border-brand-100"
                  >
                    <img
                      src={broker.logo || ""}
                      alt={`${broker.name_en || broker.name || "Broker"} logo`}
                      className="max-h-[48px] max-w-[95%] object-contain transition duration-300 group-hover:scale-105"
                    />
                  </Link>


                  {/* NAME */}
                  <Link
                    href={`/en/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block truncate text-center text-[13px] font-black text-[#07111f] transition hover:text-brand-500"
                  >
                    {broker.name_en || broker.name}
                  </Link>


                  {/* SUBTITLE */}
                  <div className="mt-0.5 text-center text-[8.5px] font-bold text-slate-400">
                    Broker Alarab Rating
                  </div>


                  {/* REVIEW CTA */}
                  <Link
                    href={`/en/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 flex h-8 w-full items-center justify-center rounded-lg bg-brand-500 px-2 text-[10px] font-black text-white transition hover:bg-brand-600"
                  >
                    View Review
                  </Link>
                </article>
              ))}
            </div>


            {/* MOBILE SWIPE HINT */}
            {mobileTopBrokers.length > 2 && (
              <div className="-mt-2 flex items-center justify-center gap-1.5 pb-1">
                <span className="h-1.5 w-5 rounded-full bg-brand-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </div>
            )}
          </div>


          {/* =====================================================
              DESKTOP / TABLET
              CURRENT DESIGN KEPT
          ====================================================== */}
          <div className="hidden sm:block">

            {/* HEADER */}
            <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-5">
              <div className="flex items-center justify-between gap-8">

                <div className="text-left">
                  <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-600 shadow-sm">
                    Brokers Selected by Trading Need
                  </span>

                  <h2 className="mt-3 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] lg:text-[36px]">
                    Best Brokers for Different Trading Needs
                  </h2>

                  <p className="mt-2 max-w-[820px] text-[13px] font-semibold leading-7 text-slate-600 lg:text-[14px]">
                    Explore four highly rated brokers, each presented with a clear
                    category to help you understand where it may fit best.
                  </p>
                </div>

                <Link
                  href="/en/brokers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 min-w-[190px] shrink-0 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
                >
                  View All Brokers
                </Link>
              </div>
            </div>


            {/* DESKTOP CARDS */}
            <div className="grid grid-cols-4 gap-4 bg-white p-5">
              {topFourBrokers.map((broker, index) => {
                const category = categoryLabels[index];

                return (
                  <article
                    key={broker.id}
                    className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-[#fbfdff] p-4 shadow-[0_6px_20px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_18px_38px_rgba(15,23,42,0.09)]"
                  >
                    {/* TOP ACCENT */}
                    <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />


                    {/* CATEGORY + NUMBER */}
                    <div className="flex items-start justify-between gap-3 pt-1">

                      <span className="inline-flex min-h-[30px] items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black leading-4 text-brand-600">
                        {category.title}
                      </span>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-[10px] font-black text-brand-600 shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>


                    {/* CATEGORY DESCRIPTION */}
                    <p className="mt-3 min-h-[42px] text-[11px] font-semibold leading-5 text-slate-500">
                      {category.desc}
                    </p>


                    {/* BROKER LOGO */}
                    <Link
                      href={`/en/brokers/${broker.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-auto mt-3 flex h-[78px] w-[104px] items-center justify-center rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition group-hover:border-brand-100"
                    >
                      <img
                        src={broker.logo || ""}
                        alt={`${broker.name_en || broker.name} logo`}
                        className="max-h-[68px] max-w-[95%] object-contain transition duration-300 group-hover:scale-105"
                      />
                    </Link>


                    {/* BROKER NAME */}
                    <Link
                      href={`/en/brokers/${broker.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block truncate text-center text-[18px] font-black text-slate-950 transition hover:text-brand-500"
                    >
                      {broker.name_en || broker.name}
                    </Link>


                    <div className="mt-1 text-center text-[10px] font-bold text-slate-500">
                      Broker Alarab Rating
                    </div>


                    {/* FACTS */}
                    <div className="mt-3 grid grid-cols-2 gap-2">

                      {/* RATING */}
                      <div className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-center">
                        <div className="text-[9px] font-bold text-slate-400">
                          Rating
                        </div>

                        <div className="mt-1 text-[15px] font-black text-brand-600">
                          ★ {broker.rating?.toFixed(2) ?? "—"}
                        </div>
                      </div>


                      {/* CATEGORY FACT */}
                      <div className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-center">
                        <div className="text-[9px] font-bold text-slate-400">
                          {category.factLabel}
                        </div>

                        <div className="mt-1 text-[11px] font-black text-slate-800">
                          {category.factValue}
                        </div>
                      </div>
                    </div>


                    {/* CATEGORY CTA */}
                    <Link
                      href={category.pageHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[40px] items-center justify-center rounded-xl border border-brand-100 bg-brand-50 px-3 text-[10px] font-black text-brand-600 transition hover:bg-brand-100"
                    >
                      Explore This Category
                    </Link>


                    {/* ACTIONS */}
                    <div className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">

                      <Link
                        href={`/en/brokers/${broker.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[11px] font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        Read Review
                      </Link>

                      <a
                        href={
                          broker.real_account_url ||
                          `/en/brokers/${broker.slug}`
                        }
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 text-[11px] font-black text-white transition hover:bg-brand-600"
                      >
                        Open Account
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

    {/* CLOSE ALL ENGLISH HOME PAGE SECTIONS */}
    </div>

 {/* BROKERS SIDEBAR - DESKTOP ONLY */}
<aside className="hidden min-h-full pt-4 xl:block">

  <div className="sticky top-24 overflow-hidden rounded-[30px] border border-slate-200 bg-white pb-3 shadow-[0_16px_45px_rgba(15,23,42,0.07)]">

    {/* =====================================================
        SIDEBAR HEADER
    ====================================================== */}
    <div className="border-b border-slate-200 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">

      <div className="flex items-center gap-3">

        {/* BROKER RADAR ICON */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

          <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

          <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

          <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

          {/* RADAR RINGS */}
          <div className="absolute inset-[11px] rounded-full border border-blue-300/25" />

          <div className="absolute inset-[16px] rounded-full border border-blue-300/25" />

          {/* RADAR AXIS */}
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
        <div className="min-w-0 text-left">

          <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[8px] font-black text-brand-600 shadow-sm">
            Featured Brokers
          </span>

          <h2 className="mt-1.5 text-[16px] font-black leading-6 text-[#07111f]">
            Best Trading Brokers
          </h2>

          <p className="mt-0.5 text-[8.5px] font-semibold leading-4 text-slate-500">
            Browse reviews of selected leading trading brokers.
          </p>

        </div>

      </div>

    </div>


    {/* =====================================================
        BROKERS
    ====================================================== */}
    <div className="border-b border-slate-200 bg-[#f8fafc] px-3 py-3">

      {/* FEATURED BROKER */}
      {sidebarBrokers[0] && (

        <Link
          href={`/en/brokers/${sidebarBrokers[0].slug}`}
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

              Featured Partner

            </span>

            <span
              dir="ltr"
              className="inline-flex items-center gap-1.5 text-[#f59e0b]"
            >

              <span className="text-[16px] leading-none">
                ★
              </span>

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
                alt={`${
                  sidebarBrokers[0].name_en ||
                  sidebarBrokers[0].name ||
                  "Broker"
                } logo`}
                loading="lazy"
                className="max-h-[90px] max-w-[250px] scale-[1.28] object-contain transition duration-300 group-hover:scale-[1.35]"
              />

            ) : (

              <span className="text-[18px] font-black text-slate-800">

                {sidebarBrokers[0].name_en ||
                  sidebarBrokers[0].name ||
                  "Trading Broker"}

              </span>

            )}

          </div>

          {/* FEATURED INFO */}
          <div className="mt-3 flex items-center justify-between gap-3">

            <div className="min-w-0 text-left">

              <h3
                title={
                  sidebarBrokers[0].name_en ||
                  sidebarBrokers[0].name ||
                  ""
                }
                className="truncate text-[15px] font-black text-[#07111f]"
              >

                {sidebarBrokers[0].name_en ||
                  sidebarBrokers[0].name ||
                  "Trading Broker"}

              </h3>

              <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                Review accounts, regulation and trading fees
              </p>

            </div>

            <span className="flex min-h-[36px] shrink-0 items-center justify-center rounded-[11px] bg-brand-500 px-3 text-[9px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.22)] transition group-hover:bg-brand-600">
              View Review
            </span>

          </div>

        </Link>

      )}


      {/* OTHER BROKERS */}
      <div className="mt-3 space-y-2">

        {sidebarBrokers.slice(1).map((broker) => {

          const brokerName =
            broker.name_en ||
            broker.name ||
            "Trading Broker";

          return (

            <Link
              key={broker.id}
              href={`/en/brokers/${broker.slug}`}
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
                    alt={`${brokerName} logo`}
                    loading="lazy"
                    className="h-[54px] w-[108px] scale-[1.35] object-contain transition duration-300 group-hover:scale-[1.42]"
                  />

                ) : (

                  <span className="truncate text-[11px] font-black text-slate-700">
                    {brokerName}
                  </span>

                )}

              </div>

              {/* INFO */}
              <div className="min-w-0 flex-1 text-left">

                <h3
                  title={brokerName}
                  className="truncate whitespace-nowrap text-[12px] font-black leading-5 text-[#07111f] transition group-hover:text-brand-600"
                >
                  {brokerName}
                </h3>

                <div
                  dir="ltr"
                  className="mt-1.5 flex items-center justify-start gap-1.5 text-[#f59e0b]"
                >

                  <span className="text-[14px] leading-none">
                    ★
                  </span>

                  <span className="text-[11px] font-black leading-none">
                    {broker.rating?.toFixed(2) ?? "—"}
                  </span>

                </div>

                <div className="mt-1.5 text-[9px] font-bold text-brand-600 transition group-hover:text-brand-700">
                  Full Review
                </div>

              </div>

              {/* ARROW */}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[14px] font-black text-brand-500 shadow-[0_3px_10px_rgba(15,23,42,0.05)] transition duration-300 group-hover:translate-x-1 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                →
              </span>

            </Link>

          );

        })}

      </div>


      {/* ALL BROKERS */}
      <Link
        href="/en/brokers"
        className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
      >

        <span>
          View All Trading Brokers
        </span>

        <span className="text-[13px]">
          →
        </span>

      </Link>

    </div>


    {/* =====================================================
        SIDEBAR IMPORTANT LINKS
    ====================================================== */}
    <div className="space-y-3 px-3 pb-3 pt-3">


      {/* =====================================================
          LIVE MARKET HOURS
      ====================================================== */}
      <MarketHoursSidebarEn />


      {/* =====================================================
          LICENSES
      ====================================================== */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">

        {/* HEADER */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">

          <div className="flex items-center gap-3">

            {/* LICENSE ICON */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

              <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

              <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

              <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

              {/* SHIELD */}
              <div className="relative z-10 flex h-[26px] w-[22px] items-center justify-center rounded-b-[12px] rounded-t-[7px] border border-blue-300/50 bg-[#07182d]">

                <span className="text-[12px] font-black text-white">
                  ✓
                </span>

              </div>

              {/* ACCENTS */}
              <span className="absolute right-[6px] top-[8px] h-[12px] w-[12px] rounded-tr-full border-r-[3px] border-t-[3px] border-blue-400" />

              <span className="absolute bottom-[7px] left-[8px] h-[4px] w-[4px] rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.65)]" />

            </div>

            {/* TEXT */}
            <div className="min-w-0 flex-1 text-left">

              <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[8px] font-black text-brand-600 shadow-sm">
                Regulation Guide
              </span>

              <h3 className="mt-1.5 text-[15px] font-black leading-6 text-[#07111f]">
                Broker Regulation
              </h3>

              <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                Learn about major global financial regulators.
              </p>

            </div>

          </div>

        </div>


        {/* CONTENT */}
        <div className="divide-y divide-slate-100 px-3">

          {[
            {
              code: "FCA",
              title: "UK Regulation",
              href: "/en/licenses/fca",
            },
            {
              code: "ASIC",
              title: "Australian Regulation",
              href: "/en/licenses/asic",
            },
            {
              code: "DFSA",
              title: "Dubai Financial Regulation",
              href: "/en/licenses/dfsa",
            },
            {
              code: "CySEC",
              title: "Cyprus Regulation",
              href: "/en/licenses/cysec",
            },
            {
              code: "FSCA",
              title: "South Africa Regulation",
              href: "/en/licenses/fsca",
            },
          ].map((item) => (

            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
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

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[12px] font-black text-brand-500 transition group-hover:translate-x-1 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                →
              </span>

            </Link>

          ))}

        </div>


        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-white p-3">

          <Link
            href="/en/licenses"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
          >

            <span>
              View All Regulators
            </span>

            <span className="text-[13px]">
              →
            </span>

          </Link>

        </div>

      </div>


      {/* =====================================================
          BROKER HELP CARD
      ====================================================== */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">

        {/* HEADER */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">

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

                <span className="absolute -bottom-[4px] left-[5px] h-[7px] w-[7px] rotate-45 border-b border-l border-blue-300/40 bg-[#07182d]" />

              </div>

              <span className="absolute right-[6px] top-[7px] h-[11px] w-[11px] rounded-tr-full border-r-[3px] border-t-[3px] border-cyan-400" />

              <span className="absolute bottom-[7px] left-[8px] h-[4px] w-[4px] rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />

            </div>

            {/* TEXT */}
            <div className="min-w-0 flex-1 text-left">

              <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[8px] font-black text-brand-600 shadow-sm">
                Free Assistance
              </span>

              <h3 className="mt-1.5 text-[15px] font-black leading-6 text-[#07111f]">
                Free Help Choosing the Right Broker
              </h3>

            </div>

          </div>

        </div>


        {/* CONTENT */}
        <div className="px-4 py-4">

          <p className="text-[12.5px] font-medium leading-6 text-slate-700">
            Tell us your country, experience and what you need, and we will help
            you compare brokers suited to your requirements.
          </p>

          <div className="mt-3 space-y-2">

            <div className="flex items-center gap-2 text-[12.5px] font-bold leading-6 text-slate-700">

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[12px] font-bold text-brand-600">
                ✓
              </span>

              Compare brokers available in your country

            </div>

            <div className="flex items-center gap-2 text-[12.5px] font-bold leading-6 text-slate-700">

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[12px] font-bold text-brand-600">
                ✓
              </span>

              Options suited to your experience level

            </div>

            <div className="flex items-center gap-2 text-[12.5px] font-bold leading-6 text-slate-700">

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[12px] font-bold text-brand-600">
                ✓
              </span>

              Free assistance with no obligation

            </div>

          </div>

          <p className="mt-3 px-2 text-center text-[9px] font-semibold leading-5 text-slate-500">
            Informational broker-comparison support, not investment advice.
          </p>

        </div>


        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-white p-3">

          <Link
            href="/en/contact"
            className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
          >

            <span>
              Contact Us Now
            </span>

            <span className="text-[13px]">
              →
            </span>

          </Link>

        </div>

      </div>


      {/* =====================================================
          ONEROYAL SPONSORED SIDEBAR AD
      ====================================================== */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_7px_22px_rgba(15,23,42,0.045)]">

        <div className="mb-2 flex items-center justify-between px-1">

          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-black text-slate-500">
            Advertisement
          </span>

          <span className="text-[10px] font-bold text-slate-600">
            OneRoyal
          </span>

        </div>

        <a
          href="https://vc.cabinet.oneroyal.com/links/go/15855"
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label="Open a trading account with OneRoyal"
          className="group block overflow-hidden rounded-[16px] bg-white"
        >

          <img
            src="https://vc.cabinet.oneroyal.com/uploads/public/banners/2024/01/25/b7a653ad68c699083b38e7f823a1a35f.png"
            width="300"
            height="250"
            alt="OneRoyal trading account advertisement"
            title="Open a trading account with OneRoyal"
            loading="lazy"
            className="mx-auto block h-auto w-full max-w-[300px] object-contain transition duration-300 group-hover:scale-[1.02]"
          />

        </a>

      </div>


      {/* =====================================================
          TRADING TERMS
      ====================================================== */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">

        {/* HEADER */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">

          <div className="flex items-center gap-3">

            {/* LEARNING ICON */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

              <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

              <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

              <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

              {/* OPEN BOOK */}
              <div className="relative z-10 flex h-[25px] w-[31px]">

                {/* LEFT PAGE */}
                <div className="relative h-full w-1/2 rounded-l-[6px] border border-blue-300/45 bg-[#07182d]">

                  <span
                    dir="ltr"
                    className="absolute left-[3px] top-[5px] text-[6px] font-black leading-none tracking-[-0.03em] text-blue-300"
                  >
                    ABC
                  </span>

                  <span className="absolute left-[3px] top-[13px] h-[2px] w-[8px] rounded-full bg-white/55" />

                  <span className="absolute left-[3px] top-[18px] h-[2px] w-[6px] rounded-full bg-white/30" />

                </div>

                {/* RIGHT PAGE */}
                <div className="relative h-full w-1/2 rounded-r-[6px] border border-l-0 border-blue-300/45 bg-[#07182d]">

                  <span className="absolute right-[3px] top-[5px] h-[2px] w-[8px] rounded-full bg-cyan-300" />

                  <span className="absolute right-[3px] top-[10px] h-[2px] w-[7px] rounded-full bg-white/60" />

                  <span className="absolute right-[3px] top-[15px] h-[2px] w-[6px] rounded-full bg-white/35" />

                </div>

                {/* CENTER FOLD */}
                <span className="absolute left-1/2 top-[2px] h-[21px] w-px -translate-x-1/2 bg-blue-300/25" />

              </div>

              {/* ACCENT */}
              <span className="absolute bottom-[7px] left-[8px] h-[4px] w-[4px] rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.65)]" />

            </div>

            {/* TEXT */}
            <div className="min-w-0 text-left">

              <h3 className="text-[14px] font-black text-[#07111f]">
                Essential Trading Terms
              </h3>

              <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                Understand the key concepts before you trade.
              </p>

            </div>

          </div>

        </div>


        {/* CONTENT */}
        <div className="divide-y divide-slate-100 px-3">

          {[
            {
              label: "Spread",
              desc: "The difference between bid and ask prices",
              href: "/en/learn-trading/spread",
            },
            {
              label: "Leverage",
              desc: "Controlling a larger position with less capital",
              href: "/en/learn-trading/leverage",
            },
            {
              label: "Margin",
              desc: "The capital required to open a position",
              href: "/en/learn-trading/margin",
            },
          ].map((item) => (

            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[56px] items-center justify-between gap-3 py-2.5"
            >

              <div className="min-w-0 text-left">

                <div className="text-[12px] font-black leading-5 text-slate-800 transition group-hover:text-brand-600">
                  {item.label}
                </div>

                <div className="mt-1 truncate text-[10px] font-semibold leading-4 text-slate-500">
                  {item.desc}
                </div>

              </div>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[12px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                →
              </span>

            </Link>

          ))}

        </div>


        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-white p-3">

          <Link
            href="/en/learn-trading"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
          >

            <span>
              Browse Trading Education
            </span>

            <span className="text-[13px]">
              →
            </span>

          </Link>

        </div>

      </div>


      {/* =====================================================
          TRADING CALCULATORS
      ====================================================== */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">

        {/* HEADER */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">

          <div className="flex items-center gap-3">

            {/* CALCULATOR ICON */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">

              <div className="absolute inset-0 rounded-full bg-[#0a1d36] shadow-[0_6px_16px_rgba(15,23,42,0.22)]" />

              <div className="absolute inset-[3px] rounded-full border border-blue-400/50" />

              <div className="absolute inset-[7px] rounded-full bg-[#102a4c]" />

              {/* CALCULATOR */}
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
            <div className="min-w-0 text-left">

              <h3 className="text-[14px] font-black text-[#07111f]">
                Trading Calculators
              </h3>

              <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                Practical tools for trade and risk planning.
              </p>

            </div>

          </div>

        </div>


        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-2 p-3">

          {[
            {
              title: "Risk Calculator",
              short: "Risk",
              href: "/en/tools/risk-calculator",
            },
            {
              title: "Pip Calculator",
              short: "Pip",
              href: "/en/tools/pip-calculator",
            },
            {
              title: "Margin Calculator",
              short: "Margin",
              href: "/en/tools/margin-calculator",
            },
          ].map((item) => (

            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
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

              <span className="shrink-0 text-[13px] font-black text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-600">
                →
              </span>

            </Link>

          ))}

        </div>


        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-white p-3">

          <Link
            href="/en/tools"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.26)]"
          >

            <span>
              View All Trading Calculators
            </span>

            <span className="text-[13px]">
              →
            </span>

          </Link>

                </div>

      </div>

    </div>

    {/* MULTIBANK SPONSORED SIDEBAR AD */}
    <div className="px-3 pt-3">
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-black text-slate-500">
            Advertisement
          </span>

          <span className="text-[10px] font-bold text-slate-600">
            MultiBank Group
          </span>
        </div>

        <a
          href="https://trade.multibankfx.com/register?ibNum=9951544&utm_source=ib-media-generator&utm_media=300x250&utm_term=9951544"
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label="Open a real trading account with MultiBank Group"
          className="group block overflow-hidden rounded-[16px] bg-[#081528]"
        >
          <img
            src="https://my.multibankfx.com/build/client/images/ib-media/5/en-300x250.png"
            width="300"
            height="250"
            alt="MultiBank Group trading account advertisement"
            title="Open a real trading account with MultiBank Group"
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