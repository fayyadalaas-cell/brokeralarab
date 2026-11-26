import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

import BrokerFinderEN from "@/app/components/BrokerFinderEN";
import HomeArticlesEn from "@/app/components/HomeArticlesEn";
import HomeComparisonsEn from "@/app/components/HomeComparisonsEn";
import HomeCountriesEn from "@/app/components/HomeCountriesEn";
import HomeMarketPricesEn from "@/app/components/HomeMarketPricesEn";
import HomeTradingToolsEn from "@/app/components/HomeTradingToolsEn";
import HomeInterestRatesEn from "@/app/components/HomeInterestRatesEn";
import HomeStrategiesEn from "@/app/components/HomeStrategiesEn";
import HomeMethodologyEn from "@/app/components/HomeMethodologyEn";
import HomeClosingSectionEn from "@/app/components/HomeClosingSectionEn";
import MarketHoursSidebarEn from "@/app/components/MarketHoursSidebarEn";

import HomeTechnicalSnapshotEn, {
  type HomeTechnicalRow,
  type HomePivotRow,
} from "@/app/components/HomeTechnicalSnapshotEn";

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

/* =========================================================
   BROKER DATA TYPES
========================================================= */

type Broker = {
  id: number;
  is_full_review: boolean;
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
  logo: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  real_account_url: string | null;
  score_safety: number | null;
  score_fees: number | null;
};

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

export const revalidate = 3600;

/* =========================================================
   MAIN ENGLISH HOMEPAGE
========================================================= */

export default async function HomePage() {

  const supabase = await createClient();

  /* =====================================================
     HOMEPAGE BROKERS AND COUNTRY RANKINGS
  ====================================================== */

  const [
    { data },
    { data: comparisonBrokerOrder },
    { data: rankingData },
  ] = await Promise.all([

    supabase
      .from("brokers")
      .select(`
        id,
        is_full_review,
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

  ]);

  /* =====================================================
     EN HOMEPAGE — TECHNICAL ANALYSIS + CLASSIC PIVOT
     SERVER INITIAL DATA
     DEFAULT: XAUUSDc / H1
  ====================================================== */

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
      .from("broker_daily_pivot_levels_latest")
      .select("*")
      .eq("symbol", "XAUUSDc")
      .eq("method", "classic")
      .limit(1)
      .maybeSingle(),

  ]);

  if (homeTechnicalError) {

    console.error(
      "EN homepage technical analysis:",
      homeTechnicalError
    );

  }

  if (homePivotError) {

    console.error(
      "EN homepage daily classic pivot:",
      homePivotError
    );

  }

  const homeTechnical =
    (homeTechnicalData as HomeTechnicalRow | null) ?? null;

  const homePivot =
    (homePivotData as HomePivotRow | null) ?? null;

  /* =====================================================
     PUBLISHED BROKERS
  ====================================================== */

  const brokers = ((data ?? []) as Broker[])
    .filter(
      (broker) =>
        broker.slug &&
        (broker.name_en || broker.name)
    )
    .map((broker) => ({
      ...broker,
      name: broker.name_en || broker.name,
    }));

  /* =====================================================
     COUNTRY RANKINGS
  ====================================================== */

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

  /* =====================================================
     DESKTOP BROKER SIDEBAR
     SAME SELECTION AS ARABIC HOMEPAGE
  ====================================================== */

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
        Number(b.rating || 0) -
        Number(a.rating || 0)
    )

    .slice(0, 6);

  /* =====================================================
     HOME — ALL FULL REVIEW BROKER COMPARISONS
  ====================================================== */

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

    const broker =
      fullReviewBrokerMap.get(row.slug);

    if (
      !broker ||
      !broker.name ||
      !broker.slug
    ) {

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

      const broker1 =
        eligibleComparisonBrokers[i];

      const broker2 =
        eligibleComparisonBrokers[j];

      homeComparisons.push({

        slug: `${broker1.slug}-vs-${broker2.slug}`,

        broker1,

        broker2,

      });

    }

  }

  /* ================= END HOME COMPARISONS ================= */

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

return (

  <main
    dir="ltr"
    lang="en"
    className="min-h-screen bg-[#f5f7fb] text-[#0f172a]"
  >

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqJsonLd),
      }}
    />

    {/* =========================================================
        HERO — PREMIUM FINANCIAL PLATFORM
    ========================================================= */}

    <section
      dir="ltr"
      className="relative isolate overflow-hidden border-b border-[#173b70] bg-[#081b32]"
    >

      {(() => {

        /* =====================================================
           MANUAL HERO BROKER SELECTION
        ====================================================== */

        const heroBrokerIds = [
          1, 2, 18, 14, 25, 11,
        ];

        const allHeroBrokers = heroBrokerIds

          .map((id) =>
            brokers.find(
              (broker) =>
                Number(broker.id) === id
            )
          )

          .filter(
            (broker): broker is Broker =>
              Boolean(broker)
          );

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

              <div className="absolute inset-0 bg-[linear-gradient(240deg,#061326_0%,#0b2340_55%,#10365e_100%)]" />

              {/* SOFT BLUE LIGHTS */}

              <div className="absolute -left-[180px] -top-[280px] h-[650px] w-[650px] rounded-full bg-[#1688ff]/15 blur-[130px]" />

              <div className="absolute -bottom-[260px] right-[15%] h-[500px] w-[500px] rounded-full bg-[#2563eb]/10 blur-[120px]" />

              {/* FINANCIAL GRID */}

              <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(147,197,253,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.7)_1px,transparent_1px)] [background-size:65px_65px]" />

              {/* DECORATIVE FINANCIAL CURVE */}

              <svg
                viewBox="0 0 1600 500"
                fill="none"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full -scale-x-100 opacity-40"
              >

                <defs>

                  <linearGradient
                    id="homeHeroLineEn"
                    x1="0"
                    y1="0"
                    x2="1600"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >

                    <stop
                      stopColor="#38bdf8"
                      stopOpacity="0"
                    />

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
                  stroke="url(#homeHeroLineEn)"
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
                    LEFT SIDE — MAIN HERO CONTENT
                ============================================ */}

                <div className="flex min-w-0 flex-col justify-center text-center lg:text-left">

                  {/* BRAND POSITIONING */}

                  <div className="flex items-center justify-center gap-2.5 lg:justify-start">

                    <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />

                    <span className="text-[11px] font-semibold leading-6 text-blue-200 sm:text-[13px]">

                      Better Data · Clearer Comparisons · Better Decisions

                    </span>

                  </div>

                  {/* MAIN SEO TITLE */}

                  <h1 className="mt-3 text-[clamp(24px,7.5vw,32px)] font-black leading-[1.25] tracking-tight text-white sm:mt-4 sm:text-[44px] lg:text-[48px] xl:text-[60px]">

                    Best Trading Brokers

                    <span className="mt-1 block bg-gradient-to-r from-[#6dd5ff] via-[#62a9ff] to-[#9fc9ff] bg-clip-text pb-1 text-transparent">

                      With Deeper Insights.

                    </span>

                  </h1>

                  {/* MAIN DESCRIPTION */}

                  <p className="mx-auto mt-3 max-w-[740px] text-[13px] font-medium leading-6 text-slate-300 sm:mt-4 sm:text-[15px] sm:leading-8 lg:mx-0 lg:text-[16px] xl:text-[17px]">

                    <span className="sm:hidden">

                      Independent broker reviews, comprehensive
                      comparisons, market analysis and financial
                      tools to help you choose the right trading
                      broker.

                    </span>

                    <span className="hidden sm:inline">

                      Independent reviews, comprehensive broker
                      comparisons, financial market data,
                      technical analysis and trading tools.
                      Everything you need to understand the
                      markets and choose the right trading broker.

                    </span>

                  </p>

                  {/* =========================================
                      MAIN ACTION BUTTONS
                  ========================================== */}

                  <div className="mt-4 grid grid-cols-2 items-stretch gap-2 sm:mt-6 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-3 lg:justify-start">

                    {/* BROKER DIRECTORY */}

                    <Link
                      href="/en/brokers"
                      className="group inline-flex min-h-[44px] min-w-0 items-center justify-center gap-2 rounded-[9px] bg-[linear-gradient(135deg,#2878e5_0%,#1664cf_100%)] px-2 text-[12px] font-black text-white shadow-[0_10px_25px_rgba(20,105,220,0.24)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:min-h-[50px] sm:min-w-[195px] sm:gap-4 sm:rounded-[11px] sm:px-7 sm:text-[13px]"
                    >

                      Explore Brokers

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[15px] transition-transform group-hover:translate-x-1 sm:text-[18px]"
                      >

                        →

                      </span>

                    </Link>

                    {/* BROKER COMPARISONS */}

                    <Link
                      href="/en/compare"
                      className="group inline-flex min-h-[44px] min-w-0 items-center justify-center gap-2 rounded-[9px] border border-blue-200/25 bg-white/[0.045] px-2 text-[12px] font-bold text-white transition duration-300 hover:border-blue-300/50 hover:bg-white/10 sm:min-h-[50px] sm:min-w-[185px] sm:gap-4 sm:rounded-[11px] sm:px-7 sm:text-[13px]"
                    >

                      Compare Brokers

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[15px] text-blue-300 transition-transform group-hover:translate-x-1 sm:text-[17px]"
                      >

                        →

                      </span>

                    </Link>

                  </div>

                  {/* =========================================
                      PLATFORM FEATURES — DESKTOP AND TABLET
                  ========================================== */}

                  <div className="hidden grid-cols-2 gap-x-5 gap-y-4 border-t border-white/15 pt-4 text-left sm:mt-6 sm:grid lg:mt-7 xl:grid-cols-4 xl:gap-x-5">

                    {[

                      {
                        title: "Independent Reviews",
                        icon: "shield",
                      },

                      {
                        title: "Live Financial Data",
                        icon: "activity",
                      },

                      {
                        title: "Detailed Comparisons",
                        icon: "compare",
                      },

                      {
                        title: "Free Trading Tools",
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

                              <rect
                                x="5"
                                y="2"
                                width="14"
                                height="20"
                                rx="2"
                              />

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
                    RIGHT SIDE — PREMIUM BROKER SHOWCASE
                ============================================ */}

                <div className="relative min-w-0">

                  {/* SOFT CARD GLOW */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-4 rounded-[32px] bg-blue-500/10 blur-[30px]"
                  />

                  {/* BROKER SHOWCASE CARD */}

                  <div className="relative overflow-hidden rounded-[15px] border border-[#83b6ff]/20 bg-[linear-gradient(145deg,#102943_0%,#173c65_100%)] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.16)] sm:rounded-[22px] sm:p-5">

                    {/* SHOWCASE HEADER */}

                    <div className="flex items-center justify-between gap-3 pb-2.5 sm:pb-4">

                      <div className="min-w-0">

                        <h2 className="text-[15px] font-black leading-6 text-white sm:text-[20px] sm:leading-7">

                          Featured Trading Brokers

                        </h2>

                        <p className="mt-0.5 text-[11px] font-medium leading-5 text-blue-100 sm:mt-1.5 sm:text-[14px] sm:leading-6">

                          Explore broker reviews and services

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

                          <rect
                            x="3"
                            y="3"
                            width="7"
                            height="7"
                            rx="1.5"
                          />

                          <rect
                            x="14"
                            y="3"
                            width="7"
                            height="7"
                            rx="1.5"
                          />

                          <rect
                            x="3"
                            y="14"
                            width="7"
                            height="7"
                            rx="1.5"
                          />

                          <rect
                            x="14"
                            y="14"
                            width="7"
                            height="7"
                            rx="1.5"
                          />

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
                          href={`/en/brokers/${broker.slug}`}
                          aria-label={`Read ${broker.name} Review`}
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
                              alt={`${broker.name} logo`}
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

                    {/* SHOWCASE FOOTER */}

                    <Link
                      href="/en/brokers"
                      className="group mt-3 flex min-h-[34px] items-center justify-center gap-3 border-t border-white/10 pt-2 text-[13px] font-bold text-blue-100 transition hover:text-white"
                    >

                      Explore All Trading Brokers

                      <span
                        aria-hidden="true"
                        className="text-[17px] text-blue-300 transition-transform duration-200 group-hover:translate-x-1"
                      >

                        →

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


    {/* =========================================================
        HOME CONTENT CONTAINER
    ========================================================= */}

    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">

      {/* =======================================================
          FIRST HOME GROUP — BROKER FINDER + BROKERS SIDEBAR
      ======================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch xl:gap-3">

        {/* BROKER FINDER */}

        <div className="min-w-0 xl:flex xl:flex-col xl:[&>section]:pr-0">

          <section
            id="finder"
            className="scroll-mt-24 mx-auto w-full max-w-7xl px-0 pt-2 pb-3 sm:pt-4 sm:pb-4 lg:pt-4 lg:pb-4 xl:pb-0 xl:flex xl:flex-1 xl:flex-col xl:[&>*]:flex-1"
          >

            <BrokerFinderEN
              brokers={brokers}
              countryRankings={countryRankings}
            />

          </section>

        </div>

        {/* =====================================================
            BROKERS SIDEBAR — DESKTOP ONLY
        ====================================================== */}

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

                  Trading Brokers

                </h2>

              </div>

              <p className="mt-2 pl-[14px] text-[11px] font-medium leading-5 text-slate-500">

                Independent broker reviews and ratings

              </p>

            </div>

            {/* BROKERS LIST */}

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

                  <div className="mt-2 flex h-[86px] items-center justify-center overflow-hidden px-2">

                    {sidebarBrokers[0].logo ? (

                      <img
                        src={sidebarBrokers[0].logo}
                        alt={`${sidebarBrokers[0].name} logo`}
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

                        Accounts, regulation and fees

                      </p>

                    </div>

                    <span className="flex min-h-[36px] shrink-0 items-center justify-center rounded-[11px] bg-brand-500 px-3 text-[9px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.22)] transition group-hover:bg-brand-600">

                      Read Review

                    </span>

                  </div>

                </Link>

              )}

              {/* =============================================
                  OTHER BROKERS
              ============================================== */}

              <div className="mt-2 divide-y divide-slate-200">

                {sidebarBrokers.slice(1).map((broker) => (

                  <Link
                    key={broker.id}
                    href={`/en/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                    aria-label={`Read ${broker.name} Review`}
                    className="group flex min-h-[84px] items-center justify-between gap-2 rounded-md px-2 py-0.5 transition duration-200 hover:bg-blue-50/50"
                  >

                    {/* LOGO AND RATING */}

                    <div className="flex min-w-0 flex-1 flex-col items-center justify-center">

                      {/* BROKER LOGO */}

                      <div className="flex h-[53px] w-full items-center justify-center">

                        {broker.logo ? (

                          <img
                            src={broker.logo}
                            alt={`${broker.name} logo`}
                            loading="lazy"
                            className="h-[53px] w-[155px] max-w-full object-contain mix-blend-multiply transition duration-300"
                            style={{
                              transform:
                                broker.name
                                  ?.toLowerCase()
                                  .includes("capital")
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

                      Review

                      <span className="text-[13px] leading-none">

                        →

                      </span>

                    </span>

                  </Link>

                ))}

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

          </div>

        </aside>

      </div>

      {/* ================= END FIRST HOME GROUP ================= */}


      {/* =========================================================
          EXNESS PREMIUM BANNER — FULL WIDTH
      ========================================================= */}

      <div className="mx-auto flex w-full justify-center py-5 sm:py-6 lg:py-7">

        <a
          href="https://one.toexness.com/a/hhmbah9f13"
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label="Exness Advertisement"
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
            src="/banners/EN_Spreads_50_lower_728x90.jpg"
            width={728}
            height={90}
            alt="Exness Financial Markets Trading Advertisement"
            className="block !h-auto !w-full rounded-[10px] !object-contain"
          />

        </a>

      </div>

      {/* ================= END EXNESS BANNER ================= */}


      {/* =====================================================
          LATEST ARTICLES — FULL WIDTH
      ===================================================== */}

      <HomeArticlesEn />


      {/* =========================================================
          SECOND HOME GROUP — COMPARISONS + MARKET HOURS
      ========================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch xl:gap-3">

        {/* MAIN CONTENT — BROKER COMPARISONS */}

        <div className="min-w-0 xl:flex xl:flex-col xl:[&>section]:pr-0">

          <HomeComparisonsEn
            comparisons={homeComparisons}
          />

        </div>

        {/* SECOND SIDEBAR — MARKET HOURS */}

        <aside className="hidden min-w-0 pt-4 pb-4 xl:flex xl:flex-col">

          <MarketHoursSidebarEn />

        </aside>

      </div>

      {/* ================= END SECOND HOME GROUP ================= */}


      {/* =========================================================
          XS PREMIUM BANNER — FULL WIDTH
      ========================================================= */}

      <div className="mx-auto flex w-full justify-center py-5 sm:py-6 lg:py-7">

        <a
          href="https://my.xs.com/links/go/5611"
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label="XS.com Advertisement"
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
            src="/banners/xsbanneren.jpg"
            width={728}
            height={90}
            alt="XS.com Financial Markets Trading Advertisement"
            className="block !h-auto !w-full rounded-[10px] !object-contain"
          />

        </a>

      </div>

      {/* ================= END XS PREMIUM BANNER ================= */}


      {/* =========================================================
          THIRD HOME GROUP — COUNTRIES + ONEROYAL
      ========================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch xl:gap-3">

        {/* MAIN CONTENT — COUNTRIES */}

        <div className="min-w-0 xl:flex xl:flex-col">

          <HomeCountriesEn />

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

              Advertisement

            </span>

            {/* ONEROYAL BANNER */}

            <a
              href="https://vc.cabinet.oneroyal.com/links/go/15855"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              aria-label="Open a Trading Account with OneRoyal"
              className="group block w-full overflow-hidden rounded-[13px]"
            >

              <img
                src="https://vc.cabinet.oneroyal.com/uploads/public/banners/2024/01/25/b7a653ad68c699083b38e7f823a1a35f.png"
                alt="OneRoyal Advertisement"
                title="Open a Trading Account with OneRoyal"
                loading="lazy"
                className="mx-auto block !h-auto !w-full !object-contain transition duration-300 group-hover:scale-[1.01]"
              />

            </a>

          </div>

        </aside>

      </div>

      {/* ================= END THIRD HOME GROUP ================= */}


      {/* =========================================================
          FOURTH HOME GROUP — TECHNICAL ANALYSIS + MARKET PRICES
      ========================================================= */}

      <div className="mt-2 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-stretch">

        {/* MAIN CONTENT — TECHNICAL ANALYSIS */}

        <div className="min-w-0 xl:flex xl:flex-col">

          <HomeTechnicalSnapshotEn
            initialTechnical={homeTechnical}
            initialPivot={homePivot}
          />

        </div>

        {/* FOURTH SIDEBAR — MARKET PRICES */}

        <aside className="flex min-w-0 flex-col pb-3 pt-3 sm:pb-4 sm:pt-4">

          <HomeMarketPricesEn />

        </aside>

      </div>

      {/* ================= END FOURTH HOME GROUP ================= */}


      {/* =========================================================
          PEPPERSTONE PREMIUM BANNER — FULL WIDTH
      ========================================================= */}

      <div className="mx-auto flex w-full justify-center py-5 sm:py-6 lg:py-7">

        <a
          href="https://track.pepperstonepartners.com/visit/?bta=44176&nci=7484"
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label="Visit Pepperstone"
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
            src="https://pepperstonepartners.ck-cdn.com/tn/serve/?cid=687947"
            width={728}
            height={90}
            alt="Pepperstone Advertisement"
            className="block !h-auto !w-full rounded-[10px] !object-contain"
          />

        </a>

      </div>

      {/* ============== END PEPPERSTONE PREMIUM BANNER ============== */}


      {/* =====================================================
          ACCOUNT TYPES HOME SECTION — FULL WIDTH
      ====================================================== */}

      <section
        id="home-account-types"
        aria-labelledby="home-account-types-title"
        dir="ltr"
        className="mx-auto w-full min-w-0 py-3 sm:py-4"
      >

        {/* EXTERNAL SECTION HEADER */}

        <div className="mb-4 flex min-h-[44px] shrink-0 items-center">

          <h2
            id="home-account-types-title"
            className="min-w-0 text-[18px] font-black leading-8 tracking-tight text-[#10233f] sm:text-[24px]"
          >

            Trading Account Types

          </h2>

        </div>

        {/* =====================================================
            ACCOUNT TYPES GRID
            MOBILE: 2 COLUMNS
            DESKTOP: ORIGINAL DESIGN
        ====================================================== */}

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">

          {accountTypeItemsEn.map((item, index) => (

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

                    View Accounts

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
                    className="h-[14px] w-[14px] shrink-0 text-[#194b92] transition-transform duration-200 group-hover:translate-x-1 sm:h-[17px] sm:w-[17px]"
                  >

                    <path d="M5 12h14" />

                    <path d="m12 5 7 7-7 7" />

                  </svg>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* ================= END ACCOUNT TYPES ================= */}


      {/* =========================================================
          FIFTH HOME GROUP — TRADING TOOLS + LICENSES
      ========================================================= */}

      <HomeTradingToolsEn />

      {/* ================= END FIFTH HOME GROUP ================= */}


      {/* =========================================================
          GLOBAL INTEREST RATES — FULL WIDTH
      ========================================================= */}

      <HomeInterestRatesEn />

      {/* ================= END GLOBAL INTEREST RATES ================= */}


      {/* =========================================================
          SELECTED TRADING STRATEGIES — FULL WIDTH
      ========================================================= */}

      <HomeStrategiesEn />

      {/* ================= END SELECTED TRADING STRATEGIES ================= */}


      {/* =========================================================
          BROKER ALARAB — REVIEW METHODOLOGY
      ========================================================= */}

      <HomeMethodologyEn />

      {/* ================= END HOME METHODOLOGY ================= */}


      {/* =========================================================
          FINAL HOME SECTION — CONTACT + BROKERS + ADVERTISEMENT
      ========================================================= */}

      <HomeClosingSectionEn
        brokers={brokers}
      />

      {/* ================= END FINAL HOME SECTION ================= */}

    </div>

  </main>

);

}