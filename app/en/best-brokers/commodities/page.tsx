import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Best Commodity Brokers for Trading in 2026",
  description:
    "Compare the best commodity brokers for trading gold, oil, silver and natural gas in 2026. Review platforms, regulation, minimum deposits and account options.",

  alternates: {
    canonical:
      "https://brokeralarab.com/en/best-brokers/commodities",

    languages: {
      ar: "https://brokeralarab.com/best-brokers/commodities",
      en: "https://brokeralarab.com/en/best-brokers/commodities",
      "x-default":
        "https://brokeralarab.com/en/best-brokers/commodities",
    },
  },

  openGraph: {
    title: "Best Commodity Brokers for Trading in 2026",

    description:
      "Compare commodity brokers for gold, oil, silver and natural gas trading, including platforms, account features and key trading conditions.",

    url:
      "https://brokeralarab.com/en/best-brokers/commodities",

    type: "website",
        siteName: "Broker Alarab",
    locale: "en_US",
    images: [
      {
        url: "/og-image.webp",
        alt: "Best Commodity Brokers for Trading in 2026 | Broker Alarab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Best Commodity Brokers 2026",

        description:
      "Compare brokers for trading gold, oil, silver, natural gas and other commodities online.",
    images: ["/og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   TYPES
========================================================= */

type BrokerRow = {
  [key: string]: any;
};

type CommodityBroker = {
  id: number;

  name: string;
  slug: string | null;
  logo: string | null;

  rating: number | string | null;

  intro: string | null;
  bestFor: string | null;

  minDeposit: string | number | null;
  maxLeverage: string | number | null;

  platforms: string | null;
  tradingAssets: string | null;

  islamicAccount: string | boolean | null;
  regulation: string | null;

  accountUrl: string | null;
  websiteUrl: string | null;

  commodityScore: number;
};

/* =========================================================
   BROKER DATA HELPERS
========================================================= */

function getBrokerName(broker: BrokerRow) {
  return (
    broker?.name ||
    broker?.title ||
    broker?.broker_name ||
    broker?.name_en ||
    broker?.slug ||
    `Broker ${broker?.id}`
  );
}

function getBrokerSlug(broker: BrokerRow) {
  return broker?.slug || broker?.broker_slug || null;
}

function getBrokerLogo(broker: BrokerRow) {
  return broker?.logo || broker?.logo_url || broker?.image || null;
}

function getBrokerRating(broker: BrokerRow) {
  return (
    broker?.rating ??
    broker?.score ??
    broker?.overall_rating ??
    null
  );
}

function getBrokerAccountUrl(broker: BrokerRow) {
  return (
    broker?.real_account_url ||
    broker?.account_url ||
    broker?.website_url ||
    null
  );
}

function getBrokerWebsiteUrl(broker: BrokerRow) {
  return broker?.website_url || broker?.account_url || null;
}

function getMinimumDeposit(broker: BrokerRow) {
  return (
    broker?.min_deposit ??
    broker?.minimum_deposit ??
    broker?.deposit_min ??
    null
  );
}

function getMaximumLeverage(broker: BrokerRow) {
  return (
    broker?.max_leverage ??
    broker?.maximum_leverage ??
    broker?.leverage ??
    null
  );
}

function getPlatforms(broker: BrokerRow) {
  return (
    broker?.platforms ??
    broker?.trading_platforms ??
    broker?.platform ??
    null
  );
}

function getTradingAssets(broker: BrokerRow) {
  return (
    broker?.trading_assets ??
    broker?.assets ??
    broker?.instruments ??
    null
  );
}

function getIslamicAccount(broker: BrokerRow) {
  return (
    broker?.islamic_en ??
    broker?.islamic_account ??
    broker?.islamic ??
    broker?.islamic_ar ??
    null
  );
}

function getRegulation(broker: BrokerRow) {
  return (
    broker?.regulation ??
    broker?.regulations ??
    broker?.licenses ??
    null
  );
}

function normalizeText(value: unknown) {
  if (value === null || value === undefined) return "";

  if (Array.isArray(value)) {
    return value.join(" ").toLowerCase();
  }

  if (typeof value === "object") {
    return JSON.stringify(value).toLowerCase();
  }

  return String(value).toLowerCase();
}

/* =========================================================
   COMMODITY SUPPORT DETECTION

   We only want brokers whose asset data indicates
   commodity-related markets.

   Stock or index support alone must not qualify a broker.
========================================================= */

function supportsCommodities(broker: BrokerRow) {
  const assets = normalizeText(getTradingAssets(broker));

  return (
    assets.includes("commodities") ||
    assets.includes("commodity") ||
    assets.includes("metals") ||
    assets.includes("precious metals") ||
    assets.includes("energy") ||
    assets.includes("energies") ||
    assets.includes("gold") ||
    assets.includes("silver") ||
    assets.includes("oil") ||
    assets.includes("natural gas") ||
    assets.includes("xau") ||
    assets.includes("xag") ||
    assets.includes("brent") ||
    assets.includes("wti") ||
    assets.includes("سلع") ||
    assets.includes("السلع") ||
    assets.includes("معادن") ||
    assets.includes("المعادن") ||
    assets.includes("ذهب") ||
    assets.includes("الذهب") ||
    assets.includes("فضة") ||
    assets.includes("الفضة") ||
    assets.includes("نفط") ||
    assets.includes("النفط") ||
    assets.includes("غاز طبيعي")
  );
}

/* =========================================================
   DISPLAY HELPERS
========================================================= */

function formatRating(value: number | string | null) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const rating = Number(value);

  if (!Number.isFinite(rating)) {
    return String(value);
  }

  return rating.toFixed(1);
}

function displayValue(
  value: string | number | boolean | null | undefined
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Available" : "Not available";
  }

  return String(value);
}

function hasIslamicAccount(value: unknown) {
  if (typeof value === "boolean") return value;

  const normalized = normalizeText(value);

  if (!normalized) return false;

  return (
    normalized.includes("yes") ||
    normalized.includes("available") ||
    normalized.includes("swap-free") ||
    normalized.includes("swap free") ||
    normalized.includes("islamic") ||
    normalized.includes("متاح") ||
    normalized.includes("نعم") ||
    normalized.includes("إسلامي") ||
    normalized.includes("اسلامي")
  );
}

/* =========================================================
   COMMODITY BROKER SCORE

   Internal ordering score for eligible brokers.

   The ranking is not intended to imply that one broker
   is the best choice for every commodity trader.
========================================================= */

function calculateCommodityScore(broker: BrokerRow) {
  let score = 0;

  const rating = Number(getBrokerRating(broker));

  if (Number.isFinite(rating)) {
    score += rating * 10;
  }

  if (getPlatforms(broker)) {
    score += 4;
  }

  if (getRegulation(broker)) {
    score += 4;
  }

  if (getMinimumDeposit(broker) !== null) {
    score += 2;
  }

  if (hasIslamicAccount(getIslamicAccount(broker))) {
    score += 2;
  }

  return score;
}

/* =========================================================
   LOGO
========================================================= */

function CompactLogo({
  src,
  alt,
  size = "normal",
}: {
  src: string | null;
  alt: string;
  size?: "small" | "normal" | "large";
}) {
  const sizeClasses = {
    small: "h-9 w-9 rounded-xl",
    normal: "h-11 w-11 rounded-2xl",
    large: "h-14 w-14 rounded-2xl",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white p-1.5 ${sizeClasses[size]}`}
    >
      {src ? (
        <img
          src={src}
          alt={`${alt} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-[9px] font-black text-slate-400">
          LOGO
        </span>
      )}
    </div>
  );
}

/* =========================================================
   ACTION BUTTONS
========================================================= */

function ActionButtons({
  broker,
  compact = false,
}: {
  broker: CommodityBroker;
  compact?: boolean;
}) {
  const reviewHref = broker.slug
    ? `/en/brokers/${broker.slug}`
    : null;

  const accountHref =
    broker.accountUrl ||
    broker.websiteUrl ||
    null;

  if (!reviewHref && !accountHref) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center gap-2 ${
        compact ? "" : "w-full"
      }`}
    >
      {reviewHref ? (
        <Link
          href={reviewHref}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-white font-extrabold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 ${
            compact
              ? "min-w-[76px] px-3 py-2 text-[11px]"
              : "flex-1 px-4 py-2.5 text-xs"
          }`}
        >
          Review
        </Link>
      ) : null}

      {accountHref ? (
        <a
          href={accountHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-brand-500 text-center font-extrabold text-white shadow-sm transition hover:bg-brand-600 ${
            compact
              ? "min-w-[82px] px-3 py-2 text-[11px]"
              : "flex-1 px-4 py-2.5 text-xs"
          }`}
        >
          Open Account
        </a>
      ) : null}
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function BestCommodityBrokersPage() {
  const supabase = await createClient();

  /* =======================================================
     LOAD PUBLISHED BROKERS ONLY
  ======================================================= */

  const {
    data: brokersData,
    error: brokersError,
  } = await supabase
    .from("brokers")
    .select("*")
    .eq("publication_status", "published");

  if (brokersError) {
    return (
      <main
        dir="ltr"
        className="min-h-screen bg-[#f5f7fb] px-4 py-16"
      >
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7">
          <h1 className="text-2xl font-black text-slate-950">
            Unable to load commodity broker data
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {brokersError.message}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     PREPARE COMMODITY BROKERS
  ======================================================= */

  const commodityBrokers: CommodityBroker[] = (
    (brokersData ?? []) as BrokerRow[]
  )
    .filter((broker) => supportsCommodities(broker))
    .map((broker) => ({
      id: broker.id,

      name: getBrokerName(broker),

      slug: getBrokerSlug(broker),

      logo: getBrokerLogo(broker),

      rating: getBrokerRating(broker),

      intro:
        broker?.intro_en ||
        broker?.intro ||
        broker?.intro_ar ||
        null,

      bestFor:
        broker?.best_for_en ||
        broker?.best_for ||
        broker?.best_for_ar ||
        null,

      minDeposit:
        getMinimumDeposit(broker),

      maxLeverage:
        getMaximumLeverage(broker),

      platforms:
        getPlatforms(broker),

      tradingAssets:
        getTradingAssets(broker),

      islamicAccount:
        getIslamicAccount(broker),

      regulation:
        getRegulation(broker),

      accountUrl:
        getBrokerAccountUrl(broker),

      websiteUrl:
        getBrokerWebsiteUrl(broker),

      commodityScore:
        calculateCommodityScore(broker),
    }))
    .sort((a, b) => {
      if (b.commodityScore !== a.commodityScore) {
        return b.commodityScore - a.commodityScore;
      }

      const ratingA = Number(a.rating) || 0;
      const ratingB = Number(b.rating) || 0;

      return ratingB - ratingA;
    });

  const featuredBrokers =
    commodityBrokers.slice(0, 8);

  const islamicCommodityBrokers =
    commodityBrokers.filter((broker) =>
      hasIslamicAccount(
        broker.islamicAccount
      )
    );

  const platformNames = new Set<string>();

  commodityBrokers.forEach((broker) => {
    const value = normalizeText(
      broker.platforms
    );

    if (value.includes("mt5")) {
      platformNames.add("MT5");
    }

    if (value.includes("mt4")) {
      platformNames.add("MT4");
    }

    if (
      value.includes("tradingview") ||
      value.includes("trading view")
    ) {
      platformNames.add("TradingView");
    }

    if (value.includes("ctrader")) {
      platformNames.add("cTrader");
    }
  });

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://brokeralarab.com/en",
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "Best Brokers",
        item:
          "https://brokeralarab.com/en/best-brokers",
      },

      {
        "@type": "ListItem",
        position: 3,
        name: "Best Commodity Brokers",
        item:
          "https://brokeralarab.com/en/best-brokers/commodities",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name:
      "Best Commodity Brokers for Trading in 2026",

    url:
      "https://brokeralarab.com/en/best-brokers/commodities",

    description:
      "Compare commodity brokers for trading gold, oil, silver, natural gas and other commodity markets online.",

    inLanguage: "en",

    isPartOf: {
      "@type": "WebSite",
      name: "Broker Alarab",
      url: "https://brokeralarab.com/en",
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",

    name:
      "Best Commodity Brokers 2026",

    numberOfItems:
      featuredBrokers.length,

    itemListElement:
      featuredBrokers.map(
        (broker, index) => ({
          "@type": "ListItem",

          position: index + 1,

          name: broker.name,

          url: broker.slug
            ? `https://brokeralarab.com/en/brokers/${broker.slug}`
            : "https://brokeralarab.com/en/best-brokers/commodities",
        })
      ),
  };

  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f5f7fb] text-slate-900"
    >
      {/* ===================================================
          STRUCTURED DATA
      =================================================== */}

      <Script
        id="commodity-brokers-en-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      <Script
        id="commodity-brokers-en-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageJsonLd
            ),
        }}
      />

      <Script
        id="commodity-brokers-en-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              itemListJsonLd
            ),
        }}
      />

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

          <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative mx-auto max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">

          {/* BREADCRUMB */}

          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-2 text-[10px] font-bold text-blue-200/75 sm:flex sm:text-xs"
          >
            <Link
              href="/en/best-brokers"
              className="transition hover:text-white"
            >
              Best Brokers
            </Link>

            <span className="text-blue-300/40">
              /
            </span>

            <span className="text-white">
              Commodity Brokers
            </span>
          </nav>

          {/* HERO CONTENT */}

          <div className="mt-0 sm:mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              Commodity Broker Guide 2026
            </div>

            <h1 className="mt-3 max-w-[1350px] text-[30px] font-black leading-[1.2] tracking-[-0.025em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
              <span className="block sm:inline">
                Best Commodity Brokers
              </span>{" "}

              <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
                for Trading in 2026
              </span>
            </h1>

            {/* MOBILE DESCRIPTION */}

            <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
              Compare brokers for trading gold, oil, silver,
              natural gas and other commodity markets online.
            </p>

            {/* DESKTOP DESCRIPTION */}

            <p className="mt-3 hidden max-w-[1220px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
              Compare commodity brokers for trading gold, crude oil,
              silver, natural gas and other markets. Review trading
              platforms, broker ratings, minimum deposits, account
              options and the key factors to consider before choosing
              a commodity trading broker.
            </p>

            {/* UPDATE INFO */}

            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
              <time
                dateTime="2026-10-05"
                className="inline-flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="sm:hidden">
                  Updated Oct 2026
                </span>

                <span className="hidden sm:inline">
                  Last updated: October 5, 2026
                </span>
              </time>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="inline-flex items-center gap-1.5">
                <span className="text-cyan-300">
                  ✓
                </span>

                Independent comparison
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <span className="text-cyan-300">
                  ✓
                </span>

                Broker Alarab data
              </span>
            </div>

            {/* STATS + CTA */}

            <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:gap-6">
              <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[620px]">
                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {commodityBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Commodity Brokers
                  </div>
                </div>

                <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {islamicCommodityBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Swap-Free Options
                  </div>
                </div>

                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {platformNames.size}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Major Platforms
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-2.5 sm:w-auto sm:gap-3">
                <a
                  href="#best-commodity-brokers"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
                >
                  <span className="sm:hidden">
                    Compare Brokers
                  </span>

                  <span className="hidden sm:inline">
                    Compare Commodity Brokers
                  </span>

                  <span aria-hidden="true">
                    →
                  </span>
                </a>

                <a
                  href="#commodities-guide"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
                >
                  Trading Guide

                  <span aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PAGE NAVIGATION
      =================================================== */}

      <section className="hidden border-b border-slate-200 bg-white sm:block">
        <div className="mx-auto max-w-[1520px] px-6 py-3 lg:px-8 xl:px-10">
          <nav
            aria-label="Page sections"
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {[
              {
                href: "#best-commodity-brokers",
                label: "Best Brokers",
              },
              {
                href: "#commodities-guide",
                label: "Commodity Trading",
              },
              {
                href: "#gold-trading",
                label: "Gold Trading",
              },
              {
                href: "#oil-trading",
                label: "Oil Trading",
              },
              {
                href: "#commodity-platforms",
                label: "Trading Platforms",
              },
              {
                href: "#how-to-choose",
                label: "How to Choose",
              },
              {
                href: "#faq",
                label: "FAQ",
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-extrabold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ===================================================
          BEST COMMODITY BROKERS
      =================================================== */}

      <section
        id="best-commodity-brokers"
        className="scroll-mt-24 bg-[#f4f7fb] pb-8 pt-4 sm:pb-10 sm:pt-6 lg:pb-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.065)] sm:rounded-[28px]">

            {/* SECTION HEADER */}

            <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f5f9ff_65%,#eaf4ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#2f80ed] to-[#1353a5]" />

              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[9px] font-black text-white sm:text-[11px]">
                    Commodity Broker Comparison
                  </span>

                  <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[34px]">
                    Best Brokers for Commodity Trading
                  </h2>

                  <p className="mt-2 max-w-[1080px] text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                    Compare published brokers on Broker Alarab that
                    provide access to commodity markets. Review
                    platforms, minimum deposits, account options and
                    broker ratings before choosing where to trade
                    gold, crude oil, silver, natural gas and other
                    available commodities.
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-3 rounded-[15px] border border-blue-100 bg-white/95 px-4 py-3 shadow-sm lg:flex">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-brand-50 text-lg font-black text-brand-600">
                    {featuredBrokers.length}
                  </div>

                  <div>
                    <div className="text-[12px] font-black text-slate-900">
                      Brokers Compared
                    </div>

                    <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                      From {commodityBrokers.length} eligible brokers
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IMPORTANT NOTICE */}

            <div className="border-b border-slate-200 bg-amber-50/60 px-4 py-3 sm:px-7">
              <p className="text-[11px] font-bold leading-6 text-amber-900 sm:text-[13px]">
                <span className="font-black">
                  Important:
                </span>{" "}
                Commodity availability, spreads, leverage, margin
                requirements, trading hours and overnight costs can
                vary by broker, account type, legal entity and
                jurisdiction. Many retail brokers provide commodity
                exposure through CFDs rather than ownership of the
                physical commodity.
              </p>
            </div>

            {/* ===================================================
                DESKTOP TABLE
            =================================================== */}

            <div className="hidden p-5 lg:block lg:p-6">
              <div className="overflow-hidden rounded-[18px] border border-slate-200 shadow-[0_7px_24px_rgba(15,23,42,0.055)]">
                <table className="w-full table-fixed text-left">
                  <thead className="bg-[linear-gradient(90deg,#071c34_0%,#0b3157_55%,#0d426f_100%)] text-white">
                    <tr className="text-[13px]">
                      <th className="w-[7%] px-3 py-4 text-center font-black">
                        Rank
                      </th>

                      <th className="w-[25%] px-5 py-4 font-black">
                        Broker
                      </th>

                      <th className="w-[18%] px-4 py-4 text-center font-black">
                        Platforms
                      </th>

                      <th className="w-[13%] px-4 py-4 text-center font-black">
                        Min. Deposit
                      </th>

                      <th className="w-[12%] px-4 py-4 text-center font-black">
                        Swap-Free
                      </th>

                      <th className="w-[10%] px-4 py-4 text-center font-black">
                        Rating
                      </th>

                      <th className="w-[15%] px-4 py-4 text-center font-black">
                        Details
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {featuredBrokers.map(
                      (broker, index) => (
                        <tr
                          key={broker.id}
                          className={`border-t border-slate-200 transition duration-200 hover:bg-blue-50/80 ${
                            index === 0
                              ? "bg-[linear-gradient(90deg,#fffdf7_0%,#fff9e9_100%)]"
                              : index % 2 === 0
                              ? "bg-[#f8fafc]"
                              : "bg-white"
                          }`}
                        >
                          {/* RANK */}

                          <td className="px-3 py-[18px] text-center">
                            <span
                              className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-[13px] font-black ${
                                index === 0
                                  ? "bg-amber-100 text-amber-800 ring-2 ring-amber-200/70"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              #{index + 1}
                            </span>
                          </td>

                          {/* BROKER */}

                          <td className="px-5 py-[18px]">
                            <div className="flex items-center gap-4">
                              <CompactLogo
                                src={broker.logo}
                                alt={broker.name}
                                size="large"
                              />

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="truncate text-[17px] font-black text-slate-950">
                                    {broker.name}
                                  </div>

                                  {index === 0 ? (
                                    <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-[8px] font-black text-amber-800">
                                      TOP RATED
                                    </span>
                                  ) : null}
                                </div>

                                {broker.bestFor ? (
                                  <div className="mt-1.5 line-clamp-1 text-[10px] font-bold text-slate-500">
                                    {broker.bestFor}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </td>

                          {/* PLATFORMS */}

                          <td className="px-4 py-[18px] text-center">
                            <span className="inline-block max-w-full text-[12px] font-black leading-6 text-slate-700">
                              {displayValue(
                                broker.platforms
                              )}
                            </span>
                          </td>

                          {/* DEPOSIT */}

                          <td className="px-4 py-[18px] text-center text-[14px] font-black text-slate-950">
                            {displayValue(
                              broker.minDeposit
                            )}
                          </td>

                          {/* SWAP FREE */}

                          <td className="px-4 py-[18px] text-center">
                            {hasIslamicAccount(
                              broker.islamicAccount
                            ) ? (
                              <span className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-700">
                                ✓ Available
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-400">
                                —
                              </span>
                            )}
                          </td>

                          {/* RATING */}

                          <td className="px-4 py-[18px] text-center">
                            {formatRating(
                              broker.rating
                            ) ? (
                              <span className="inline-flex items-center gap-1 text-[14px] font-black text-amber-600">
                                ★{" "}
                                {formatRating(
                                  broker.rating
                                )}
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>

                          {/* ACTIONS */}

                          <td className="px-4 py-[18px] align-middle">
                            <div className="mx-auto flex max-w-[220px] items-center justify-center [&_a]:min-h-[42px] [&_a]:text-[12px]">
                              <ActionButtons
                                broker={broker}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===================================================
                MOBILE / TABLET CARDS
            =================================================== */}

            <div className="grid gap-3 p-3 lg:hidden">
              {featuredBrokers.map(
                (broker, index) => (
                  <article
                    key={broker.id}
                    className={`overflow-hidden rounded-[17px] border bg-white ${
                      index === 0
                        ? "border-amber-200 shadow-[0_7px_20px_rgba(245,158,11,0.08)]"
                        : "border-slate-200 shadow-[0_4px_14px_rgba(15,23,42,0.035)]"
                    }`}
                  >
                    {index === 0 ? (
                      <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />
                    ) : null}

                    <div className="p-3">

                      {/* BROKER HEADER */}

                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <CompactLogo
                            src={broker.logo}
                            alt={broker.name}
                          />

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <div className="truncate text-[15px] font-black text-slate-950">
                                {broker.name}
                              </div>

                              {index === 0 ? (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[7px] font-black text-amber-800">
                                  TOP RATED
                                </span>
                              ) : null}
                            </div>

                            {formatRating(
                              broker.rating
                            ) ? (
                              <div className="mt-1 text-[9px] font-black text-amber-600">
                                ★{" "}
                                {formatRating(
                                  broker.rating
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <span
                          className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[10px] font-black ${
                            index === 0
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          #{index + 1}
                        </span>
                      </div>

                      {/* VALUES */}

                      <div className="mt-2.5 grid grid-cols-3 overflow-hidden rounded-[11px] border border-slate-200 bg-[#f7f9fc]">
                        <div className="border-r border-slate-200 px-1 py-2 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            Platform
                          </div>

                          <div className="mt-0.5 line-clamp-1 text-[10px] font-black text-slate-900">
                            {displayValue(
                              broker.platforms
                            )}
                          </div>
                        </div>

                        <div className="border-r border-slate-200 px-1 py-2 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            Deposit
                          </div>

                          <div className="mt-0.5 text-[11px] font-black text-slate-900">
                            {displayValue(
                              broker.minDeposit
                            )}
                          </div>
                        </div>

                        <div className="px-1 py-2 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            Swap-Free
                          </div>

                          <div
                            className={`mt-0.5 text-[10px] font-black ${
                              hasIslamicAccount(
                                broker.islamicAccount
                              )
                                ? "text-emerald-700"
                                : "text-slate-400"
                            }`}
                          >
                            {hasIslamicAccount(
                              broker.islamicAccount
                            )
                              ? "Available"
                              : "—"}
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="mt-2.5 [&_a]:min-h-[39px]">
                        <ActionButtons
                          broker={broker}
                        />
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PART 2 CONTINUES HERE
      =================================================== */}
            {/* ===================================================
          PART 2
          COMMODITY TRADING GUIDE
      =================================================== */}

      {/* ===================================================
          COMMODITY TRADING GUIDE
      =================================================== */}

      <section
        id="commodities-guide"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr] lg:gap-6">

            {/* MAIN GUIDE */}

            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
              <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f6f9fd_65%,#edf5ff_100%)] px-5 py-6 sm:px-7">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                  Commodity Trading Guide
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  What Should You Look for in a Commodity Trading Broker?
                </h2>

                <p className="mt-3 max-w-[1080px] text-[14px] leading-8 text-slate-600 sm:text-[16px]">
                  Choosing a commodity broker involves more than
                  comparing an overall broker rating. Traders should
                  consider which commodity markets are available, the
                  cost of trading gold and oil, margin requirements,
                  trading hours, platform quality and the way positions
                  are executed.
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                {[
                  {
                    number: "01",
                    title: "Commodity Markets",
                    text: "Check whether the broker offers the markets you need, such as gold, silver, WTI, Brent, natural gas or agricultural commodities.",
                  },
                  {
                    number: "02",
                    title: "Spreads & Fees",
                    text: "Compare spreads, commissions and overnight costs on the commodities you actually plan to trade.",
                  },
                  {
                    number: "03",
                    title: "Trading Hours",
                    text: "Commodity trading hours can differ by market and broker, particularly around daily breaks, holidays and contract schedules.",
                  },
                  {
                    number: "04",
                    title: "Platform & Execution",
                    text: "Look for a stable platform with useful charting, order types and risk-management tools for fast-moving commodity markets.",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="text-[11px] font-black text-brand-500">
                      {item.number}
                    </div>

                    <h3 className="mt-2 text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* CHECKLIST */}

            <aside className="rounded-[22px] border border-slate-200 bg-[#071c34] p-5 text-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:rounded-[28px] sm:p-6">
              <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[9px] font-black text-cyan-200">
                BROKER CHECKLIST
              </span>

              <h3 className="mt-4 text-xl font-black leading-8">
                7 Things to Check Before Trading Commodities
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "Gold, silver and metals available",
                  "WTI and Brent crude oil",
                  "Gold and oil trading spreads",
                  "Leverage and margin requirements",
                  "Overnight financing costs",
                  "Platform and execution quality",
                  "Regulation and legal entity",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-[10px] font-black text-cyan-300">
                      ✓
                    </span>

                    <span className="text-[12px] font-bold leading-5 text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===================================================
          WHAT IS COMMODITY TRADING
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">

              {/* CONTENT */}

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  Commodity Markets
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  What Is Commodity Trading?
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    Commodity trading involves taking positions in
                    markets linked to physical resources such as{" "}
                    <strong className="text-slate-900">
                      gold, silver, crude oil and natural gas
                    </strong>
                    , as well as agricultural commodities such as
                    coffee, cocoa, sugar and wheat.
                  </p>

                  <p>
                    Traders can gain exposure to commodity prices
                    through different financial products, including
                    futures, exchange-traded products and contracts
                    for difference. Many online forex and CFD brokers
                    provide access to popular commodity markets
                    through{" "}
                    <strong className="text-slate-900">
                      commodity CFDs
                    </strong>
                    .
                  </p>

                  <p>
                    The product structure matters. Before placing a
                    trade, check whether you are trading a CFD,
                    futures-based product or another instrument, and
                    review its contract size, margin requirement,
                    trading hours and holding costs.
                  </p>
                </div>
              </div>

              {/* MARKET TYPES */}

              <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 lg:border-l lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[9px] font-black tracking-wide text-cyan-300 sm:text-[10px]">
                    COMMODITY MARKETS
                  </div>

                  <h3 className="mt-2 text-[20px] font-black leading-8 text-white sm:text-[23px]">
                    Major Types of Commodities Traders Follow
                  </h3>

                  <div className="mt-5 space-y-2.5">
                    {[
                      {
                        label: "Precious Metals",
                        text: "Gold • Silver",
                      },
                      {
                        label: "Energy",
                        text: "WTI • Brent • Natural Gas",
                      },
                      {
                        label: "Agriculture",
                        text: "Coffee • Cocoa • Sugar • Wheat",
                      },
                      {
                        label: "Other Metals",
                        text: "Availability varies by broker",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5"
                      >
                        <span className="text-[12px] font-black text-cyan-300">
                          {item.label}
                        </span>

                        <span className="text-right text-[10px] font-bold text-slate-300">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ===================================================
          POPULAR COMMODITIES
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Popular Commodity Markets
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              Popular Commodities to Trade Online
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Gold, crude oil, silver and natural gas are among the
              commodity markets commonly offered by online brokers.
              Each market responds to different economic, monetary and
              supply-and-demand factors.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                symbol: "XAU/USD",
                title: "Gold",
                category: "Precious Metal",
                text: "Gold is one of the most closely followed commodity markets and can respond to the U.S. dollar, interest-rate expectations, inflation and changes in risk sentiment.",
                drivers:
                  "U.S. Dollar • Rates • Inflation • Risk Sentiment",
              },
              {
                symbol: "XAG/USD",
                title: "Silver",
                category: "Precious Metal",
                text: "Silver combines characteristics of a precious metal with significant industrial demand, giving traders exposure to both monetary and industrial-market themes.",
                drivers:
                  "U.S. Dollar • Industry • Rates • Demand",
              },
              {
                symbol: "WTI / BRENT",
                title: "Crude Oil",
                category: "Energy",
                text: "WTI and Brent are major crude oil benchmarks. Prices can respond to production, inventories, global demand and geopolitical developments.",
                drivers:
                  "Production • Inventories • Demand • Geopolitics",
              },
              {
                symbol: "NATURAL GAS",
                title: "Natural Gas",
                category: "Energy",
                text: "Natural gas can experience significant volatility as traders react to weather, storage levels, production and seasonal energy demand.",
                drivers:
                  "Weather • Storage • Production • Seasonal Demand",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
              >
                <div className="h-1 bg-gradient-to-r from-[#2f80ed] via-cyan-400 to-transparent" />

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-black text-brand-500">
                        {item.symbol}
                      </div>

                      <h3 className="mt-1 text-xl font-black text-slate-950">
                        {item.title}
                      </h3>
                    </div>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black text-blue-700">
                      {item.category}
                    </span>
                  </div>

                  <p className="mt-3 text-[12px] leading-7 text-slate-600">
                    {item.text}
                  </p>

                  <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[9px] font-black text-slate-500">
                      Common Market Drivers
                    </div>

                    <div className="mt-1 text-[10px] font-bold leading-5 text-slate-700">
                      {item.drivers}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          GOLD TRADING
      =================================================== */}

      <section
        id="gold-trading"
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-amber-200/70 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">

              {/* GOLD PANEL */}

              <div className="bg-[linear-gradient(145deg,#3b2a07_0%,#76520c_100%)] p-5 text-white sm:p-7 lg:p-8">
                <span className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[9px] font-black text-amber-200">
                  GOLD TRADING
                </span>

                <div className="mt-5 text-[11px] font-black text-amber-300">
                  XAU/USD
                </div>

                <h3 className="mt-1 text-[27px] font-black leading-10">
                  Trading Gold Online
                </h3>

                <p className="mt-3 text-[12px] leading-7 text-amber-50/80">
                  Gold is a major market for commodity traders, but
                  spreads, margin requirements and overnight costs can
                  differ considerably between brokers.
                </p>

                <div className="mt-5 space-y-2">
                  {[
                    "XAU/USD spread",
                    "Contract size",
                    "Margin & leverage",
                    "Overnight costs",
                    "Trading hours",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-[11px] font-black text-amber-50"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* GOLD CONTENT */}

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black text-amber-700">
                  Gold Brokers
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  Gold Trading Brokers and XAU/USD
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  Gold against the U.S. dollar is commonly displayed
                  as{" "}
                  <strong className="text-slate-900">
                    XAU/USD
                  </strong>
                  . When comparing gold trading brokers, traders may
                  want to examine the XAU/USD spread, contract
                  specifications, execution, margin requirements and
                  the cost of holding leveraged positions overnight.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  Gold prices can respond to changes in the U.S.
                  dollar, interest-rate expectations, inflation,
                  bond yields and shifts in global risk sentiment.
                  Market conditions can also change quickly around
                  major economic or geopolitical events.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: "U.S. Dollar",
                      text: "Dollar movements are one of the factors commonly monitored by traders analysing the gold market.",
                    },
                    {
                      title: "Interest Rates",
                      text: "Changes in monetary-policy expectations can affect gold and other financial markets.",
                    },
                    {
                      title: "Inflation",
                      text: "Inflation data can influence interest-rate expectations, bond markets and gold prices.",
                    },
                    {
                      title: "Risk Sentiment",
                      text: "Global uncertainty and changing investor sentiment can influence demand for gold.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[16px] border border-amber-100 bg-amber-50/40 p-4"
                    >
                      <h3 className="text-[13px] font-black text-slate-950">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[11px] leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/en/best-brokers/gold"
                  className="mt-5 inline-flex min-h-[43px] items-center justify-center rounded-xl bg-[#071c34] px-5 text-[11px] font-black text-white transition hover:bg-[#0b3157]"
                >
                  Compare Gold Trading Brokers
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          OIL TRADING
      =================================================== */}

      <section
        id="oil-trading"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Oil Trading
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              WTI vs Brent: Trading Crude Oil Online
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              WTI and Brent are two of the world&apos;s major crude
              oil benchmarks. Online brokers may use different names
              and symbols for these markets, so traders should always
              verify the exact instrument and contract specifications
              before placing an oil trade.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">

            {/* WTI */}

            <article className="overflow-hidden rounded-[21px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)]">
              <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#f8fafc_0%,#edf5ff_100%)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black text-brand-500">
                      WTI CRUDE OIL
                    </div>

                    <h3 className="mt-1 text-[21px] font-black text-slate-950">
                      West Texas Intermediate
                    </h3>
                  </div>

                  <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-[9px] font-black text-blue-700">
                    U.S. Oil Benchmark
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[12px] leading-7 text-slate-600">
                  WTI is a major crude oil benchmark closely associated
                  with the U.S. market. Traders often follow U.S.
                  inventory data, production levels, energy demand and
                  broader changes in global oil supply.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    "Oil Inventories",
                    "Production",
                    "U.S. Demand",
                    "Energy Markets",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-[10px] font-black text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* BRENT */}

            <article className="overflow-hidden rounded-[21px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)]">
              <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#f8fafc_0%,#eefbf6_100%)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black text-emerald-600">
                      BRENT CRUDE
                    </div>

                    <h3 className="mt-1 text-[21px] font-black text-slate-950">
                      Brent Crude Oil
                    </h3>
                  </div>

                  <span className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[9px] font-black text-emerald-700">
                    Global Benchmark
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[12px] leading-7 text-slate-600">
                  Brent is an important benchmark for global crude oil
                  pricing. Its price can respond to global supply and
                  demand, production policy, economic conditions and
                  geopolitical developments affecting energy markets.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    "Global Supply",
                    "Global Demand",
                    "Production Policy",
                    "Geopolitics",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-[10px] font-black text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* WTI VS BRENT ANSWER */}

          <div className="mt-4 rounded-[18px] border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
            <h3 className="text-[14px] font-black text-slate-950">
              What is the difference between WTI and Brent crude oil?
            </h3>

            <p className="mt-2 text-[12px] leading-7 text-slate-600">
              WTI and Brent are separate crude oil benchmarks with
              different underlying markets and pricing dynamics. WTI
              is closely associated with the U.S. oil market, while
              Brent is widely used as an international benchmark.
              Their prices can differ, and broker trading symbols are
              not standardized.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          SILVER + NATURAL GAS
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-2">

            {/* SILVER */}

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.045)] sm:p-7">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[9px] font-black text-slate-700">
                XAG/USD
              </span>

              <h2 className="mt-3 text-[23px] font-black leading-9 text-slate-950 sm:text-[28px]">
                Silver Trading and XAG/USD
              </h2>

              <p className="mt-3 text-[13px] leading-7 text-slate-600">
                Silver is both a precious metal and an industrial
                commodity. As a result, its price can respond to
                factors affecting precious metals as well as changes
                in industrial demand and the broader economic outlook.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  "U.S. Dollar",
                  "Interest Rates",
                  "Industrial Demand",
                  "Metals Markets",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center text-[10px] font-black text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            {/* NATURAL GAS */}

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.045)] sm:p-7">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[9px] font-black text-blue-700">
                NATURAL GAS
              </span>

              <h2 className="mt-3 text-[23px] font-black leading-9 text-slate-950 sm:text-[28px]">
                Natural Gas Trading
              </h2>

              <p className="mt-3 text-[13px] leading-7 text-slate-600">
                Natural gas is an energy market known for periods of
                sharp volatility. Weather forecasts, storage data,
                production levels and seasonal heating or cooling
                demand can all influence market expectations.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  "Weather",
                  "Storage Levels",
                  "Production",
                  "Seasonal Demand",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-blue-100 bg-blue-50/50 px-3 py-2.5 text-center text-[10px] font-black text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================
          COMMODITY CFDs
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  Commodity CFDs
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  What Are Commodity CFDs?
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  A contract for difference, or CFD, is a derivative
                  product that allows traders to speculate on price
                  movements without owning the underlying physical
                  asset. Trading a gold CFD, for example, does not
                  mean taking ownership of physical gold.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  Commodity CFDs may allow traders to take long or
                  short positions and may be offered with leverage.
                  Leverage increases market exposure relative to the
                  margin committed to the trade and therefore
                  magnifies both gains and losses.
                </p>
              </div>

              <div className="border-t border-slate-200 bg-[#071c34] p-5 text-white lg:border-l lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[10px] font-black text-cyan-300">
                    KNOW WHAT YOU ARE TRADING
                  </div>

                  <h3 className="mt-3 text-[21px] font-black leading-9">
                    Commodity Price Exposure Is Not Physical Ownership
                  </h3>

                  <p className="mt-3 text-[12px] leading-7 text-slate-300">
                    Check the broker&apos;s instrument specifications
                    to understand whether you are trading a CFD or
                    another commodity-linked product.
                  </p>

                  <div className="mt-5 space-y-2">
                    {[
                      "Product type",
                      "Contract size",
                      "Margin requirement",
                      "Financing charges",
                      "Trading hours",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-[11px] font-black text-slate-200"
                      >
                        ✓ {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          WHAT MOVES COMMODITY PRICES
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="border-b border-slate-200 px-5 py-6 sm:px-7 lg:px-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Commodity Market Analysis
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                What Moves Commodity Prices?
              </h2>

              <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                Commodity prices are influenced by different factors
                depending on the market. Metals, energy and
                agricultural commodities do not necessarily react to
                the same events in the same way.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Supply and Demand",
                  text: "Changes in production, consumption or expected availability can alter the balance between commodity supply and demand.",
                },
                {
                  number: "02",
                  title: "U.S. Dollar",
                  text: "Many major commodities are priced internationally in U.S. dollars, making currency movements relevant to commodity markets.",
                },
                {
                  number: "03",
                  title: "Interest Rates",
                  text: "Changes in monetary-policy expectations can influence currencies, precious metals and broader market sentiment.",
                },
                {
                  number: "04",
                  title: "Inventories & Production",
                  text: "Production and inventory data are particularly important for energy markets such as crude oil and natural gas.",
                },
                {
                  number: "05",
                  title: "Geopolitical Events",
                  text: "Events affecting major production or transportation regions can change expectations for commodity supply.",
                },
                {
                  number: "06",
                  title: "Weather & Seasonality",
                  text: "Weather conditions and seasonal demand can have a significant impact on natural gas and agricultural commodities.",
                },
              ].map((item, index) => (
                <article
                  key={item.number}
                  className={`p-5 sm:p-6 ${
                    index < 3
                      ? "xl:border-b xl:border-slate-200"
                      : ""
                  } ${
                    index % 3 !== 2
                      ? "xl:border-r xl:border-slate-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[11px] font-black text-brand-600">
                      {item.number}
                    </span>

                    <h3 className="text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] leading-6 text-slate-600">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          COMMODITIES VS FOREX VS INDICES
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Market Comparison
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              Commodities vs Forex vs Indices
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              The same online broker may offer commodities, forex and
              stock indices, but these markets represent different
              underlying exposures and respond to different market
              drivers.
            </p>
          </div>

          {/* DESKTOP */}

          <div className="mt-6 hidden overflow-hidden rounded-[20px] border border-slate-200 md:block">
            <table className="w-full text-left">
              <thead className="bg-[#071c34] text-white">
                <tr>
                  <th className="px-5 py-4 text-[12px] font-black">
                    Market
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    What You Trade
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    Examples
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    Common Drivers
                  </th>
                </tr>
              </thead>

              <tbody className="text-[12px]">
                {[
                  [
                    "Commodities",
                    "Metals, energy and raw materials",
                    "Gold, Oil, Silver, Natural Gas",
                    "Supply, demand, dollar, production",
                  ],
                  [
                    "Forex",
                    "One currency against another",
                    "EUR/USD, GBP/USD, USD/JPY",
                    "Rates, central banks, economic data",
                  ],
                  [
                    "Indices",
                    "Performance of groups of stocks",
                    "S&P 500, Nasdaq 100, DAX 40",
                    "Earnings, economy, rates, sentiment",
                  ],
                ].map((row, index) => (
                  <tr
                    key={row[0]}
                    className={`border-t border-slate-200 ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50"
                    }`}
                  >
                    <td className="px-5 py-4 font-black text-slate-900">
                      {row[0]}
                    </td>

                    <td className="px-5 py-4 text-center font-medium leading-6 text-slate-600">
                      {row[1]}
                    </td>

                    <td className="px-5 py-4 text-center font-medium leading-6 text-slate-600">
                      {row[2]}
                    </td>

                    <td className="px-5 py-4 text-center font-medium leading-6 text-slate-600">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}

          <div className="mt-5 grid gap-3 md:hidden">
            {[
              {
                title: "Commodities",
                examples:
                  "Gold • Oil • Silver • Natural Gas",
                text: "Commodity markets provide exposure to metals, energy and raw materials, with supply and demand playing a major role in pricing.",
              },
              {
                title: "Forex",
                examples:
                  "EUR/USD • GBP/USD • USD/JPY",
                text: "Forex involves trading one currency against another and is heavily influenced by monetary policy, interest rates and economic data.",
              },
              {
                title: "Indices",
                examples:
                  "S&P 500 • Nasdaq 100 • DAX 40",
                text: "Indices track groups of stocks and can respond to corporate earnings, economic expectations, interest rates and investor sentiment.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4"
              >
                <h3 className="text-[16px] font-black text-slate-950">
                  {item.title}
                </h3>

                <div className="mt-1 text-[10px] font-black text-brand-500">
                  {item.examples}
                </div>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          COMMODITY SPREADS & FEES
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px] sm:p-7">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Commodity Trading Costs
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                Commodity Spreads, Fees and Trading Costs
              </h2>

              <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                The minimum deposit should not be the only cost
                considered when comparing commodity brokers. For
                active traders in particular, spreads, commissions
                and holding costs can have a meaningful impact on the
                total cost of trading.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Commodity Spreads",
                    text: "The spread is the difference between the bid and ask price and can change with liquidity, volatility, market conditions and trading hours.",
                  },
                  {
                    title: "Trading Commissions",
                    text: "Some brokers or account types may charge a separate commission, so compare the full pricing structure rather than the spread alone.",
                  },
                  {
                    title: "Overnight Financing",
                    text: "Leveraged CFD positions held overnight may incur financing charges that can affect the total cost of longer-term trades.",
                  },
                  {
                    title: "Slippage",
                    text: "During fast markets, an order may be executed at a different price from the one visible when the order was submitted.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[16px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <h3 className="text-[14px] font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-[22px] border border-slate-200 bg-[#071c34] p-5 text-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:rounded-[28px] sm:p-7">
              <div className="text-[10px] font-black text-cyan-300">
                COMPARE THE MARKETS YOU TRADE
              </div>

              <h3 className="mt-3 text-[22px] font-black leading-9">
                Do Not Compare Brokers on Gold Spreads Alone
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-300">
                A broker&apos;s pricing may be competitive on gold
                but different on crude oil, silver or natural gas.
                Compare the instruments you expect to trade most
                frequently.
              </p>

              <div className="mt-5 space-y-2">
                {[
                  "Gold — XAU/USD",
                  "Silver — XAG/USD",
                  "WTI Crude Oil",
                  "Brent Crude Oil",
                  "Natural Gas",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-center text-[11px] font-black text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===================================================
          COMMODITY TRADING PLATFORMS
      =================================================== */}

      <section
        id="commodity-platforms"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Commodity Trading Platforms
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              What Is the Best Platform for Commodity Trading?
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              There is no single commodity trading platform that is
              best for every trader. The right platform depends on
              the markets you trade, the charting and order tools you
              need, and whether you primarily trade from desktop,
              web or mobile.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                name: "MetaTrader 5",
                short: "MT5",
                text: "A multi-asset platform with charting tools, technical indicators, multiple order types and support for automated trading.",
              },
              {
                name: "MetaTrader 4",
                short: "MT4",
                text: "A widely used trading platform offered by many CFD brokers, with technical analysis tools, indicators and Expert Advisors.",
              },
              {
                name: "TradingView",
                short: "TV",
                text: "Popular for charting and market analysis, with direct broker integration available through selected supported brokers.",
              },
              {
                name: "cTrader",
                short: "cT",
                text: "A modern trading platform offering charting, order-management and execution tools through brokers that support it.",
              },
            ].map((platform) => (
              <article
                key={platform.name}
                className="rounded-[19px] border border-slate-200 bg-[#f8fafc] p-5 shadow-[0_7px_22px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#071c34] text-[11px] font-black text-cyan-300">
                    {platform.short}
                  </div>

                  <h3 className="text-[15px] font-black text-slate-950">
                    {platform.name}
                  </h3>
                </div>

                <p className="mt-3 text-[12px] leading-6 text-slate-600">
                  {platform.text}
                </p>
              </article>
            ))}
          </div>

          {/* PLATFORM CHECKLIST */}

          <div className="mt-5 rounded-[20px] border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
            <h3 className="text-[17px] font-black text-slate-950">
              What Should a Commodity Trading Platform Offer?
            </h3>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Responsive charts",
                "Stop-loss and take-profit orders",
                "Price alerts",
                "Commodity watchlists",
                "Reliable mobile trading",
                "Stability during volatility",
                "Technical analysis tools",
                "Easy position-size management",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-[11px] font-bold text-slate-700"
                >
                  <span className="text-brand-500">
                    ✓
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PART 3 CONTINUES HERE
      =================================================== */}
            {/* ===================================================
          PART 3
          HOW TO CHOOSE + LEVERAGE + SWAP-FREE
          + RISKS + METHODOLOGY + FAQ + FINAL CTA
      =================================================== */}

      {/* ===================================================
          HOW TO CHOOSE A COMMODITY BROKER
      =================================================== */}

      <section
        id="how-to-choose"
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f5f9ff_65%,#eaf4ff_100%)] px-5 py-6 sm:px-7 lg:px-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Choosing a Commodity Broker
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                How to Choose the Best Commodity Broker
              </h2>

              <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                The best commodity broker for one trader may not be
                the best choice for another. Start with the commodity
                markets you want to trade, then compare regulation,
                trading costs, platform quality, margin requirements
                and account conditions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Regulation & Legal Entity",
                  text: "Check which regulated legal entity will hold your account. Available products, leverage limits and investor protections can vary by jurisdiction.",
                },
                {
                  number: "02",
                  title: "Commodity Markets",
                  text: "Make sure the broker offers the markets you actually want, whether that is gold, silver, WTI, Brent, natural gas or a broader commodity range.",
                },
                {
                  number: "03",
                  title: "Spreads & Total Costs",
                  text: "Compare spreads on your preferred markets together with commissions, overnight financing and any other relevant trading costs.",
                },
                {
                  number: "04",
                  title: "Trading Platform",
                  text: "Look for reliable charting, useful order types, risk-management tools and a platform that remains practical during volatile markets.",
                },
                {
                  number: "05",
                  title: "Margin & Leverage",
                  text: "Review margin requirements for each commodity instead of choosing a broker simply because it advertises high maximum leverage.",
                },
                {
                  number: "06",
                  title: "Deposits & Withdrawals",
                  text: "Check available payment methods, minimum funding requirements, potential fees and withdrawal procedures before funding an account.",
                },
              ].map((item, index) => (
                <article
                  key={item.number}
                  className={`p-5 sm:p-6 lg:p-7 ${
                    index < 3
                      ? "xl:border-b xl:border-slate-200"
                      : ""
                  } ${
                    index % 3 !== 2
                      ? "xl:border-r xl:border-slate-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-brand-50 text-[11px] font-black text-brand-600">
                      {item.number}
                    </span>

                    <h3 className="text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-[12px] leading-7 text-slate-600">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          LEVERAGE & MARGIN
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px] sm:p-7 lg:p-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Margin Trading
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                Commodity Trading Leverage and Margin
              </h2>

              <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                Leveraged commodity trading allows a trader to control
                a market position with a smaller amount of capital
                committed as margin. This increases market exposure,
                but it also increases the impact of price movements on
                the trading account.
              </p>

              <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                Margin requirements can differ between gold, silver,
                crude oil and natural gas. They may also vary by
                broker, account type, legal entity, jurisdiction and
                current market conditions.
              </p>

              <div className="mt-5 rounded-[17px] border border-blue-100 bg-blue-50/60 p-4">
                <h3 className="text-[13px] font-black text-slate-950">
                  Why margin matters
                </h3>

                <p className="mt-2 text-[12px] leading-7 text-slate-600">
                  The larger a position is relative to the capital
                  supporting it, the more strongly market movements
                  can affect the account. Position size, available
                  margin and risk controls should therefore be
                  considered together.
                </p>
              </div>
            </article>

            <aside className="rounded-[22px] border border-red-200 bg-red-50/70 p-5 sm:rounded-[28px] sm:p-7">
              <div className="inline-flex rounded-full bg-red-100 px-3 py-1 text-[9px] font-black text-red-700">
                LEVERAGE RISK
              </div>

              <h3 className="mt-4 text-[21px] font-black leading-9 text-slate-950">
                Higher Leverage Does Not Mean a Better Broker
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-600">
                Leverage magnifies both gains and losses. Commodity
                markets can move quickly, particularly around economic
                releases, inventory data or geopolitical events.
              </p>

              <div className="mt-5 space-y-2.5">
                {[
                  "Understand position size",
                  "Check margin requirements",
                  "Use appropriate risk controls",
                  "Review stop-out conditions",
                  "Do not compare brokers on leverage alone",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-xl border border-red-100 bg-white px-3 py-2.5 text-[11px] font-black text-slate-700"
                  >
                    <span className="text-red-500">!</span>

                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===================================================
          BEST BROKER BY TRADER TYPE
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              By Trading Style
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              Which Commodity Broker Is Right for You?
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Different commodity traders have different priorities.
              A beginner may value simplicity and education, while an
              active gold or oil trader may focus more heavily on
              pricing, execution and platform stability.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                tag: "BEGINNERS",
                title: "Commodity Brokers for Beginners",
                text: "New traders may prefer a broker with a straightforward platform, clear pricing, educational resources and a demo account for learning how commodity markets work.",
                items: [
                  "Easy platform",
                  "Demo account",
                  "Education",
                  "Clear pricing",
                ],
              },
              {
                tag: "ACTIVE TRADERS",
                title: "For Active Gold & Oil Traders",
                text: "Frequent traders may place greater importance on spreads, execution quality, platform stability and the trading conditions for the specific commodities they trade.",
                items: [
                  "Competitive costs",
                  "Execution",
                  "Stable platform",
                  "Trading tools",
                ],
              },
              {
                tag: "MULTI-ASSET",
                title: "For Broader Commodity Access",
                text: "Traders who want exposure beyond gold may prioritize brokers offering several metals, energy markets and additional commodity instruments from one account.",
                items: [
                  "Gold & silver",
                  "WTI & Brent",
                  "Natural gas",
                  "More markets",
                ],
              },
            ].map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[21px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)]"
              >
                <div className="h-1 bg-gradient-to-r from-brand-500 via-cyan-400 to-transparent" />

                <div className="p-5 sm:p-6">
                  <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                    {item.tag}
                  </span>

                  <h3 className="mt-3 text-[19px] font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[12px] leading-7 text-slate-600">
                    {item.text}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {item.items.map((feature) => (
                      <div
                        key={feature}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center text-[10px] font-black text-slate-700"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          SWAP-FREE / ISLAMIC COMMODITY ACCOUNTS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-emerald-200/70 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <article className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
                  Swap-Free Accounts
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  Can You Trade Commodities With a Swap-Free Account?
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  Some brokers offer swap-free or Islamic account
                  options that may include commodity markets such as
                  gold and crude oil. Availability and conditions
                  depend on the broker, account type, instrument and
                  jurisdiction.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  A swap-free label does not mean every commodity is
                  automatically included or that a position can always
                  be held indefinitely without additional charges.
                  Some brokers may apply holding limits,
                  administrative fees or different conditions to
                  specific instruments.
                </p>

                <div className="mt-5 rounded-[16px] border border-emerald-100 bg-emerald-50/50 p-4">
                  <p className="text-[11px] font-bold leading-6 text-emerald-900">
                    Broker Alarab displays swap-free availability when
                    that information is present in the broker data.
                    Always verify the latest account terms directly
                    with the broker before opening or funding an
                    account.
                  </p>
                </div>
              </article>

              <aside className="border-t border-emerald-200 bg-[linear-gradient(145deg,#07372d_0%,#0b5b48_100%)] p-5 text-white lg:border-l lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[10px] font-black text-emerald-300">
                    SWAP-FREE CHECKLIST
                  </div>

                  <h3 className="mt-3 text-[21px] font-black leading-9">
                    Check the Conditions, Not Just the Label
                  </h3>

                  <div className="mt-5 space-y-2.5">
                    {[
                      "Is gold included?",
                      "Is crude oil included?",
                      "Are there holding limits?",
                      "Are administrative fees charged?",
                      "Do conditions vary by jurisdiction?",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-[11px] font-black text-emerald-50"
                      >
                        ✓ {item}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          COMMODITY TRADING RISKS
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div>
            <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-black text-red-700">
              Trading Risks
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              What Are the Risks of Commodity Trading?
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Commodity markets can experience sharp price movements
              as supply, demand, economic data, weather and
              geopolitical expectations change. The use of leverage
              can increase the effect of these movements on a trading
              account.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Price Volatility",
                text: "Gold, oil, natural gas and other commodities can move significantly over relatively short periods.",
              },
              {
                title: "Leverage Risk",
                text: "Leverage increases market exposure and can magnify losses as well as potential gains.",
              },
              {
                title: "Gaps & Slippage",
                text: "Fast market conditions can result in orders being executed at a different price from the one expected.",
              },
              {
                title: "Holding Costs",
                text: "Leveraged commodity positions held overnight may incur financing costs that can accumulate over time.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[19px] border border-red-100 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.04)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-red-50 text-sm font-black text-red-600">
                  !
                </div>

                <h3 className="mt-3 text-[15px] font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          METHODOLOGY
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-[#071c34] shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1fr_1fr]">
              <div className="p-5 text-white sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[10px] font-black text-cyan-300">
                  Broker Alarab Methodology
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.4] sm:text-3xl lg:text-[35px]">
                  How We Compare Commodity Brokers
                </h2>

                <p className="mt-4 text-[13px] leading-8 text-slate-300 sm:text-[14px]">
                  Brokers shown in this comparison are selected from
                  published Broker Alarab records whose available
                  trading-asset data indicates access to commodity
                  markets. We use multiple broker-data points to help
                  organize the comparison rather than relying on one
                  feature alone.
                </p>

                <p className="mt-3 text-[12px] leading-7 text-slate-400">
                  The ranking should not be interpreted as a claim
                  that the first broker has the lowest live gold or
                  oil spread, the fastest execution or the best
                  conditions for every commodity trader.
                </p>

                <Link
                  href="/how-we-review"
                  className="mt-5 inline-flex min-h-[43px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] px-5 text-[11px] font-black text-white transition hover:bg-white/[0.12]"
                >
                  How Broker Alarab Reviews Brokers
                  <span className="ml-2">→</span>
                </Link>
              </div>

              <div className="border-t border-white/10 bg-white/[0.04] p-5 lg:border-l lg:border-t-0 lg:p-8">
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Broker Alarab rating",
                    "Commodity market availability",
                    "Regulatory information",
                    "Trading platforms",
                    "Minimum deposit",
                    "Swap-free availability",
                    "Account information",
                    "Published broker data",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-[13px] border border-white/10 bg-white/[0.05] px-3 py-3"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-[9px] font-black text-cyan-300">
                        ✓
                      </span>

                      <span className="text-[11px] font-bold leading-5 text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          RELATED GUIDES / INTERNAL LINKS
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Related Broker Guides
            </span>

            <h2 className="mt-3 text-[24px] font-black text-slate-950 sm:text-[30px]">
              Compare More Online Trading Brokers
            </h2>

            <p className="mt-2 max-w-[900px] text-[13px] leading-7 text-slate-600">
              Explore more Broker Alarab comparisons if you are
              looking for a specific market, account feature or
              trading-cost profile.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/en/best-brokers/gold",
                eyebrow: "GOLD",
                title: "Best Gold Trading Brokers",
                text: "Compare brokers for gold trading and XAU/USD.",
              },
              {
                href: "/en/best-brokers/indices",
                eyebrow: "INDICES",
                title: "Best Indices Brokers",
                text: "Compare brokers for the S&P 500, Nasdaq 100, Dow Jones and other major indices.",
              },
              {
                href: "/en/lowest-spread-brokers",
                eyebrow: "SPREADS",
                title: "Lowest Spread Brokers",
                text: "Explore brokers and accounts focused on lower trading costs.",
              },
              {
                href: "/en/best-brokers/low-minimum-deposit",
                eyebrow: "DEPOSIT",
                title: "Low Minimum Deposit Brokers",
                text: "Compare brokers based on minimum funding requirements and account options.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
              >
                <div className="text-[9px] font-black text-brand-500">
                  {item.eyebrow}
                </div>

                <h3 className="mt-2 text-[15px] font-black text-slate-950 transition group-hover:text-brand-600">
                  {item.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {item.text}
                </p>

                <div className="mt-4 text-[10px] font-black text-brand-600">
                  View Guide →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          FAQ
      =================================================== */}

      <section
        id="faq"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Commodity Trading FAQ
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              Frequently Asked Questions About Commodity Brokers
            </h2>

            <p className="mx-auto mt-3 max-w-[850px] text-[13px] leading-7 text-slate-600 sm:text-[15px]">
              Answers to common questions about commodity trading
              brokers, gold and oil trading, spreads, platforms,
              swap-free accounts and commodity CFDs.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            {[
              {
                question:
                  "What is the best broker for commodity trading?",
                answer:
                  "There is no single commodity broker that is best for every trader. Compare regulation, available commodity markets, spreads, commissions, overnight costs, platforms, margin requirements and account conditions based on the markets you plan to trade.",
              },
              {
                question:
                  "What are the best commodities to trade?",
                answer:
                  "Popular commodity markets include gold, silver, WTI crude oil, Brent crude oil and natural gas. The right market depends on your trading strategy, risk tolerance, preferred trading hours and understanding of the factors that drive each commodity.",
              },
              {
                question:
                  "Which broker is best for gold trading?",
                answer:
                  "When comparing gold brokers, consider the XAU/USD spread, execution, margin requirements, overnight financing, trading platform and regulatory entity. The best choice depends on your trading style rather than one feature alone.",
              },
              {
                question:
                  "What is XAU/USD in gold trading?",
                answer:
                  "XAU/USD is a commonly used market symbol for gold priced in U.S. dollars. Exact instrument names, contract specifications and trading conditions can vary between brokers.",
              },
              {
                question:
                  "What is XAG/USD in silver trading?",
                answer:
                  "XAG/USD is commonly used for silver priced against the U.S. dollar. Traders should still check the broker's exact symbol, contract size, margin requirements and trading conditions.",
              },
              {
                question:
                  "What is the difference between WTI and Brent crude oil?",
                answer:
                  "WTI and Brent are different crude oil benchmarks. WTI is closely associated with the U.S. oil market, while Brent is widely used as an international pricing benchmark. Their prices and trading symbols can differ.",
              },
              {
                question:
                  "Can I trade crude oil online?",
                answer:
                  "Many online brokers provide exposure to crude oil markets such as WTI and Brent through products including CFDs. Check the product type, contract specifications, margin requirements, trading hours and fees before trading.",
              },
              {
                question:
                  "What is a commodity CFD?",
                answer:
                  "A commodity CFD is a derivative that allows a trader to speculate on changes in a commodity-linked price without owning the physical commodity. CFDs may use leverage, which magnifies both gains and losses.",
              },
              {
                question:
                  "Can I trade commodities on MetaTrader 5?",
                answer:
                  "Many brokers offer commodity instruments through MetaTrader 5, but the exact markets available depend on the broker. Check whether the broker offers the commodities you want to trade on its MT5 platform.",
              },
              {
                question:
                  "What is the best platform for commodity trading?",
                answer:
                  "There is no single best platform for every commodity trader. MetaTrader 5, MetaTrader 4 and cTrader are offered by various brokers, while selected brokers also support TradingView integration. Compare charting, order tools, stability and market availability.",
              },
              {
                question:
                  "Which commodity broker has the lowest spreads?",
                answer:
                  "Commodity spreads vary by broker, account type, market conditions and instrument. A broker that is competitive on gold may not have the lowest cost on WTI, Brent or silver, so compare the specific markets you intend to trade.",
              },
              {
                question:
                  "Can I trade commodities with a swap-free account?",
                answer:
                  "Some brokers offer swap-free or Islamic accounts that may include commodity instruments. Eligibility, covered markets, holding periods and possible administrative fees vary, so review the broker's current account terms.",
              },
              {
                question:
                  "Is commodity trading good for beginners?",
                answer:
                  "Beginners can learn commodity trading, but commodity prices can be volatile and leveraged products carry significant risk. Understanding position size, margin, stop-loss orders and risk management is important before trading with real money.",
              },
              {
                question:
                  "What moves gold prices?",
                answer:
                  "Gold can be influenced by factors including the U.S. dollar, interest-rate expectations, inflation, bond yields, economic conditions and changes in global risk sentiment.",
              },
              {
                question:
                  "What moves crude oil prices?",
                answer:
                  "Crude oil prices can respond to global supply and demand, production levels, inventories, economic activity, producer policy and geopolitical events affecting energy markets.",
              },
              {
                question:
                  "What is the difference between commodity trading and forex trading?",
                answer:
                  "Commodity trading provides exposure to markets such as gold, oil, silver and natural gas, while forex trading involves one currency against another. The same broker may offer both markets, but their underlying drivers differ.",
              },
              {
                question:
                  "What is the difference between commodities and indices?",
                answer:
                  "Commodities are markets linked to resources such as metals and energy, while stock indices such as the S&P 500 and Nasdaq 100 measure the performance of groups of stocks. A broker may provide CFD access to both.",
              },
            ].map((item) => (
              <details
                key={item.question}
                className="group overflow-hidden rounded-[16px] border border-slate-200 bg-[#f8fafc] open:bg-white open:shadow-[0_8px_22px_rgba(15,23,42,0.045)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5">
                  <h3 className="text-left text-[13px] font-black leading-6 text-slate-950 sm:text-[14px]">
                    {item.question}
                  </h3>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-brand-600 shadow-sm transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-4 py-4 sm:px-5">
                  <p className="text-left text-[12px] leading-7 text-slate-600 sm:text-[13px]">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="bg-[#f4f7fb] px-3 pb-8 pt-2 sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto max-w-[1520px]">
          <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(110deg,#061326_0%,#092746_55%,#0c4279_100%)] px-5 py-7 text-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] sm:rounded-[28px] sm:px-8 sm:py-9 lg:px-10">
            <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-blue-400/15 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-cyan-300/10 blur-[90px]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[850px]">
                <div className="text-[10px] font-black text-cyan-300">
                  BROKER ALARAB
                </div>

                <h2 className="mt-2 text-[24px] font-black leading-[1.4] sm:text-[31px]">
                  Compare Commodity Brokers Before You Trade
                </h2>

                <p className="mt-3 text-[12px] leading-7 text-slate-300 sm:text-[14px]">
                  Compare brokers, trading platforms, minimum deposits
                  and account options, then review the current trading
                  conditions for gold, oil, silver and other commodity
                  markets directly with the broker.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="#best-commodity-brokers"
                  className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#2471df] px-6 text-[12px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:w-auto"
                >
                  Compare Commodity Brokers
                  <span className="ml-2">↑</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          RISK DISCLAIMER
      =================================================== */}

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
          <p className="text-center text-[9px] font-medium leading-5 text-slate-500 sm:text-[10px] sm:leading-6">
            The information on this page is provided for general
            information and comparison purposes only and does not
            constitute investment advice or a recommendation to open
            an account with any particular broker. CFDs and other
            leveraged products involve significant risk and can
            result in the loss of capital. Broker services, available
            instruments, leverage, fees and protections vary by legal
            entity and jurisdiction. Always review the broker&apos;s
            current terms and consider whether the product is
            appropriate for you before trading.
          </p>
        </div>
      </section>

      {/* ===================================================
          FAQ STRUCTURED DATA
      =================================================== */}

      <Script
        id="commodity-brokers-en-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",

            mainEntity: [
              {
                "@type": "Question",
                name: "What is the best broker for commodity trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "There is no single commodity broker that is best for every trader. Compare regulation, available commodity markets, spreads, commissions, overnight costs, platforms, margin requirements and account conditions based on the markets you plan to trade.",
                },
              },
              {
                "@type": "Question",
                name: "What are the best commodities to trade?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Popular commodity markets include gold, silver, WTI crude oil, Brent crude oil and natural gas. The right market depends on your trading strategy, risk tolerance, preferred trading hours and understanding of the factors that drive each commodity.",
                },
              },
              {
                "@type": "Question",
                name: "Which broker is best for gold trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "When comparing gold brokers, consider the XAU/USD spread, execution, margin requirements, overnight financing, trading platform and regulatory entity. The best choice depends on your trading style rather than one feature alone.",
                },
              },
              {
                "@type": "Question",
                name: "What is XAU/USD in gold trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "XAU/USD is a commonly used market symbol for gold priced in U.S. dollars. Exact instrument names, contract specifications and trading conditions can vary between brokers.",
                },
              },
              {
                "@type": "Question",
                name: "What is XAG/USD in silver trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "XAG/USD is commonly used for silver priced against the U.S. dollar. Traders should check the broker's exact symbol, contract size, margin requirements and trading conditions.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between WTI and Brent crude oil?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "WTI and Brent are different crude oil benchmarks. WTI is closely associated with the U.S. oil market, while Brent is widely used as an international pricing benchmark. Their prices and trading symbols can differ.",
                },
              },
              {
                "@type": "Question",
                name: "Can I trade crude oil online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Many online brokers provide exposure to crude oil markets such as WTI and Brent through products including CFDs. Check the product type, contract specifications, margin requirements, trading hours and fees before trading.",
                },
              },
              {
                "@type": "Question",
                name: "What is a commodity CFD?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A commodity CFD is a derivative that allows a trader to speculate on changes in a commodity-linked price without owning the physical commodity. CFDs may use leverage, which magnifies both gains and losses.",
                },
              },
              {
                "@type": "Question",
                name: "Can I trade commodities on MetaTrader 5?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Many brokers offer commodity instruments through MetaTrader 5, but the exact markets available depend on the broker. Check whether the broker offers the commodities you want to trade on its MT5 platform.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best platform for commodity trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "There is no single best platform for every commodity trader. MetaTrader 5, MetaTrader 4 and cTrader are offered by various brokers, while selected brokers also support TradingView integration.",
                },
              },
              {
                "@type": "Question",
                name: "Which commodity broker has the lowest spreads?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Commodity spreads vary by broker, account type, market conditions and instrument. A broker that is competitive on gold may not have the lowest cost on WTI, Brent or silver.",
                },
              },
              {
                "@type": "Question",
                name: "Can I trade commodities with a swap-free account?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Some brokers offer swap-free or Islamic accounts that may include commodity instruments. Eligibility, covered markets, holding periods and possible administrative fees vary by broker.",
                },
              },
              {
                "@type": "Question",
                name: "Is commodity trading good for beginners?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Beginners can learn commodity trading, but commodity prices can be volatile and leveraged products carry significant risk. Understanding position size, margin and risk management is important before trading with real money.",
                },
              },
              {
                "@type": "Question",
                name: "What moves gold prices?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Gold can be influenced by factors including the U.S. dollar, interest-rate expectations, inflation, bond yields, economic conditions and changes in global risk sentiment.",
                },
              },
              {
                "@type": "Question",
                name: "What moves crude oil prices?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Crude oil prices can respond to global supply and demand, production levels, inventories, economic activity, producer policy and geopolitical events affecting energy markets.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between commodity trading and forex trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Commodity trading provides exposure to markets such as gold, oil, silver and natural gas, while forex trading involves one currency against another. Their underlying market drivers differ.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between commodities and indices?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Commodities are markets linked to resources such as metals and energy, while stock indices such as the S&P 500 and Nasdaq 100 measure the performance of groups of stocks.",
                },
              },
            ],
          }),
        }}
      />

    </main>
  );
}