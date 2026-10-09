import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Best Stock Brokers for Online Trading 2026",

  description:
    "Compare the best stock brokers for online trading in 2026. Review trading platforms, regulation, minimum deposits, account options and key features before choosing a stock broker.",

  alternates: {
    canonical: "https://brokeralarab.com/en/best-brokers/stocks",

    languages: {
      ar: "https://brokeralarab.com/best-brokers/stocks",
      en: "https://brokeralarab.com/en/best-brokers/stocks",
      "x-default": "https://brokeralarab.com/en/best-brokers/stocks",
    },
  },

  openGraph: {
    title: "Best Stock Brokers for Online Trading 2026",

    description:
      "Compare leading stock brokers, trading platforms, minimum deposits, regulation and account options for online stock trading.",

    url: "https://brokeralarab.com/en/best-brokers/stocks",

    type: "website",
        siteName: "Broker Alarab",
    locale: "en_US",
    images: [
      {
        url: "/og-image.webp",
        alt: "Best Stock Brokers for Online Trading 2026 | Broker Alarab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Best Stock Brokers for Online Trading 2026",

        description:
      "Compare stock brokers and online trading platforms to find a broker that fits your stock trading needs.",
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

type StockBroker = {
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
  arabicSupport: string | boolean | null;

  regulation: string | null;

  accountUrl: string | null;
  websiteUrl: string | null;

  stockScore: number;
};

/* =========================================================
   HELPERS
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

function getArabicSupport(broker: BrokerRow) {
  return (
    broker?.arabic_support ??
    broker?.arabic_sup ??
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
   STOCK SUPPORT DETECTION
========================================================= */

function supportsStocks(broker: BrokerRow) {
  const assets = normalizeText(getTradingAssets(broker));

  return (
    assets.includes("stock") ||
    assets.includes("stocks") ||
    assets.includes("share") ||
    assets.includes("shares") ||
    assets.includes("equities") ||
    assets.includes("أسهم") ||
    assets.includes("الأسهم")
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
    normalized.includes("متاح") ||
    normalized.includes("نعم") ||
    normalized.includes("islamic")
  );
}

/* =========================================================
   STOCK BROKER SCORE

   Internal ranking score used to organize brokers displayed
   on this page. It does not claim that any broker is
   objectively the best broker in the entire market.
========================================================= */

function calculateStockScore(broker: BrokerRow) {
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

  if (getArabicSupport(broker)) {
    score += 1;
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
  broker: StockBroker;
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

export default async function BestStockTradingBrokersPage() {
  const supabase = await createClient();

  /* =======================================================
     LOAD BROKERS
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
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7 text-left">
          <h1 className="text-2xl font-black text-slate-950">
            Unable to load stock broker data
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {brokersError.message}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     FILTER STOCK BROKERS
  ======================================================= */

  const stockBrokers: StockBroker[] = (
    (brokersData ?? []) as BrokerRow[]
  )
    .filter((broker) => supportsStocks(broker))
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

      arabicSupport:
        getArabicSupport(broker),

      regulation:
        getRegulation(broker),

      accountUrl:
        getBrokerAccountUrl(broker),

      websiteUrl:
        getBrokerWebsiteUrl(broker),

      stockScore:
        calculateStockScore(broker),
    }))
    .sort((a, b) => {
      if (b.stockScore !== a.stockScore) {
        return b.stockScore - a.stockScore;
      }

      const ratingA = Number(a.rating) || 0;
      const ratingB = Number(b.rating) || 0;

      return ratingB - ratingA;
    });

  const featuredBrokers =
    stockBrokers.slice(0, 8);

  const islamicStockBrokers =
    stockBrokers.filter((broker) =>
      hasIslamicAccount(
        broker.islamicAccount
      )
    );

  const platformNames = new Set<string>();

  stockBrokers.forEach((broker) => {
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
        name: "Best Stock Brokers",
        item:
          "https://brokeralarab.com/en/best-brokers/stocks",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name:
      "Best Stock Brokers for Online Trading 2026",

    url:
      "https://brokeralarab.com/en/best-brokers/stocks",

    description:
      "A detailed comparison and guide to the best stock brokers for online trading, including platforms, regulation, minimum deposits and available account options.",

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
      "Best Stock Brokers for Online Trading 2026",

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
            : "https://brokeralarab.com/en/best-brokers/stocks",
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
        id="stock-brokers-en-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      <Script
        id="stock-brokers-en-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageJsonLd
            ),
        }}
      />

      <Script
        id="stock-brokers-en-itemlist-jsonld"
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
            className="hidden items-center justify-start gap-2 text-[10px] font-bold text-blue-200/75 sm:flex sm:text-xs"
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
              Stock Brokers
            </span>
          </nav>

          {/* HERO CONTENT */}

          <div className="mt-0 text-left sm:mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              Stock Broker Guide 2026
            </div>

            <h1 className="mt-3 max-w-[1300px] text-[30px] font-black leading-[1.12] tracking-[-0.035em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
              <span className="block sm:inline">
                Best Stock Brokers
              </span>{" "}

              <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
                for Online Trading in 2026
              </span>
            </h1>

            {/* Mobile description */}

            <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
              Compare stock brokers by rating, platforms,
              minimum deposit and account features to find
              the right broker for your needs.
            </p>

            {/* Desktop description */}

            <p className="mt-3 hidden max-w-[1180px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
              Compare the best stock brokers for online trading
              by trading platform, regulation, minimum deposit
              and available account features. Learn what to check
              before choosing a broker for stocks, shares and
              global equity markets.
            </p>

            {/* Update information */}

            <div className="mt-2.5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
              <time
                dateTime="2026-10-05"
                className="inline-flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="sm:hidden">
                  Updated October 2026
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

                Independent broker comparison
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <span className="text-cyan-300">
                  ✓
                </span>

                Data from Broker Alarab
              </span>
            </div>

            {/* STATS + BUTTONS */}

            <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-start lg:gap-6">
              <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[620px]">
                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {stockBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Stock Brokers
                  </div>
                </div>

                <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {islamicStockBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Islamic Accounts
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
                  href="#best-stock-brokers"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
                >
                  <span className="sm:hidden">
                    Best Brokers
                  </span>

                  <span className="hidden sm:inline">
                    Compare Stock Brokers
                  </span>

                  <span aria-hidden="true">
                    →
                  </span>
                </a>

                <a
                  href="#stock-guide"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
                >
                  Stock Trading Guide

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
            aria-label="Page navigation"
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {[
              {
                href: "#best-stock-brokers",
                label: "Best Stock Brokers",
              },
              {
                href: "#stock-guide",
                label: "Stock Trading Guide",
              },
              {
                href: "#stocks-vs-cfds",
                label: "Stocks vs CFDs",
              },
              {
                href: "#stock-platforms",
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
          BEST STOCK BROKERS
      =================================================== */}

      <section
        id="best-stock-brokers"
        className="scroll-mt-24 bg-[#f4f7fb] pb-8 pt-4 sm:pb-10 sm:pt-6 lg:pb-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.065)] sm:rounded-[28px]">

            {/* SECTION HEADER */}

            <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f5f9ff_65%,#eaf4ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#2f80ed] to-[#1353a5]" />

              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 text-left">
                  <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[9px] font-black text-white sm:text-[11px]">
                    Broker Comparison
                  </span>

                  <h2 className="mt-3 text-[23px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[34px]">
                    Best Stock Brokers for Online Trading
                  </h2>

                  <p className="mt-2 max-w-[1050px] text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                    This comparison includes brokers in the Broker
                    Alarab database that offer stocks or share trading
                    among their available financial instruments.
                    Compare the trading platform, account conditions,
                    costs and product type before opening an account.
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-3 rounded-[15px] border border-blue-100 bg-white/95 px-4 py-3 shadow-sm lg:flex">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-brand-50 text-lg font-black text-brand-600">
                    {featuredBrokers.length}
                  </div>

                  <div className="text-left">
                    <div className="text-[12px] font-black text-slate-900">
                      Brokers Compared
                    </div>

                    <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                      From {stockBrokers.length} stock brokers
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IMPORTANT STOCK NOTICE */}

            <div className="border-b border-slate-200 bg-amber-50/60 px-4 py-3 sm:px-7">
              <p className="text-[11px] font-bold leading-6 text-amber-900 sm:text-[13px]">
                <span className="font-black">
                  Important:
                </span>{" "}

                A broker offering stock trading does not necessarily
                mean you are buying and owning real shares. Some
                brokers provide stock trading through CFDs. We explain
                the difference between real stocks and stock CFDs
                below, so always verify the product available under
                your account before trading.
              </p>
            </div>

            {/* DESKTOP TABLE */}

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
                        Islamic
                      </th>

                      <th className="w-[10%] px-4 py-4 text-center font-black">
                        Rating
                      </th>

                      <th className="w-[15%] px-4 py-4 text-center font-black">
                        Actions
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
                          {/* Ranking */}

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

                          {/* Broker */}

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
                                      Top Rated
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

                          {/* Platforms */}

                          <td className="px-4 py-[18px] text-center">
                            <span className="inline-block max-w-full text-[12px] font-black leading-6 text-slate-700">
                              {displayValue(
                                broker.platforms
                              )}
                            </span>
                          </td>

                          {/* Deposit */}

                          <td className="px-4 py-[18px] text-center text-[14px] font-black text-slate-950">
                            {displayValue(
                              broker.minDeposit
                            )}
                          </td>

                          {/* Islamic */}

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

                          {/* Rating */}

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

                          {/* Actions */}

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

            {/* MOBILE / TABLET CARDS */}

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
                      {/* Broker header */}

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
                                  Top Rated
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

                      {/* Values */}

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
                            Islamic
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

                      {/* Actions */}

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
          QUICK ANSWER / PAGE SUMMARY
      =================================================== */}

      <section
        id="stock-guide"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr] lg:gap-6">

            {/* Main summary */}

            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
              <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f6f9fd_65%,#edf5ff_100%)] px-5 py-6 sm:px-7">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                  Quick Guide
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  How to Choose the Best Stock Broker
                </h2>

                <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600 sm:text-[16px]">
                  Choosing an online stock broker should involve more than
                  comparing brand names or ratings. First determine whether
                  you want to buy and own real shares or trade stock price
                  movements through CFDs. Then compare regulation, available
                  markets, trading platforms, fees, minimum deposits and
                  order execution.
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                {[
                  {
                    number: "01",
                    title: "Choose the Product",
                    text: "Check whether the broker offers real shares, stock CFDs, or both before opening an account.",
                  },
                  {
                    number: "02",
                    title: "Check Regulation",
                    text: "Review the legal entity and regulator that will oversee your trading account.",
                  },
                  {
                    number: "03",
                    title: "Compare Costs",
                    text: "Look beyond spreads and check commissions, financing charges, conversion fees and other costs.",
                  },
                  {
                    number: "04",
                    title: "Choose a Platform",
                    text: "Make sure the trading platform supports the markets, tools and order types you need.",
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

            {/* Quick checklist */}

            <aside className="rounded-[22px] border border-slate-200 bg-[#071c34] p-5 text-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:rounded-[28px] sm:p-6">
              <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[9px] font-black text-cyan-200">
                BEFORE YOU OPEN AN ACCOUNT
              </span>

              <h3 className="mt-4 text-xl font-black leading-8">
                7 Things to Check in a Stock Broker
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "Regulation and legal entity",
                  "Real stocks or stock CFDs",
                  "Available markets and exchanges",
                  "Trading commissions and fees",
                  "Trading platform and tools",
                  "Minimum deposit requirement",
                  "Deposits, withdrawals and support",
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
          WHAT IS ONLINE STOCK TRADING
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">

            <div className="grid lg:grid-cols-[1.35fr_0.65fr]">

              {/* Content */}

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  Stock Trading Basics
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  What Is Online Stock Trading?
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    Online stock trading allows investors and traders to
                    access company shares and financial markets through an
                    online broker and trading platform. From a computer or
                    mobile device, users can search for stocks, monitor
                    prices, place buy or sell orders and manage open
                    positions.
                  </p>

                  <p>
                    When you purchase a real share, you generally acquire
                    ownership in the underlying listed company according to
                    the broker&apos;s and market&apos;s terms. Some online
                    brokers also offer a different product known as a{" "}
                    <strong className="text-slate-900">
                      stock CFD
                    </strong>
                    , which allows traders to speculate on price movements
                    without owning the underlying share.
                  </p>

                  <p>
                    This distinction is important when comparing the best
                    brokers for stock trading. Ownership, leverage, trading
                    costs, short selling, dividends and overnight financing
                    can differ significantly between real stocks and stock
                    CFDs.
                  </p>
                </div>
              </div>

              {/* Visual */}

              <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 lg:border-l lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[9px] font-black tracking-wide text-cyan-300 sm:text-[10px]">
                        STOCK TRADING
                      </div>

                      <h3 className="mt-1.5 text-[19px] font-black leading-tight text-white sm:text-[22px]">
                        The Stock Trading Journey
                      </h3>
                    </div>

                    <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/10 text-lg text-cyan-300 sm:flex">
                      ↗
                    </div>
                  </div>

                  <p className="mt-2 text-[10px] font-medium leading-5 text-slate-300 sm:text-[11px]">
                    From choosing a stock broker to opening and managing a trade.
                  </p>

                  <div className="mt-5 space-y-2">
                    {[
                      "Choose an online stock broker",
                      "Search for a stock",
                      "Set your position size",
                      "Choose an order type",
                      "Monitor and manage the position",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-[9px] font-black text-cyan-300">
                          {index + 1}
                        </span>

                        <span className="text-[11px] font-bold text-slate-200">
                          {item}
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
          HOW STOCK TRADING WORKS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Step by Step
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
              How Does Online Stock Trading Work?
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              After opening an account with a broker that offers stock
              trading, you can use its trading platform to find the company
              or stock you want to trade, select an order type and choose
              your position size. The exact process depends on the broker
              and whether you are trading real shares or stock CFDs.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              {
                number: "1",
                title: "Open an Account",
                text: "Choose a suitable broker and complete its account opening and identity verification process.",
              },
              {
                number: "2",
                title: "Fund Your Account",
                text: "Select a supported deposit method and check the minimum deposit and any applicable fees.",
              },
              {
                number: "3",
                title: "Choose a Stock",
                text: "Search for a company or ticker symbol such as AAPL or NVDA on the trading platform.",
              },
              {
                number: "4",
                title: "Place Your Order",
                text: "Select the position size, order type, price and any risk-management settings you want to use.",
              },
              {
                number: "5",
                title: "Manage the Trade",
                text: "Monitor price movements, risk and trading costs, and manage or close the position according to your plan.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4"
              >
                <div className="absolute -right-3 -top-5 text-[70px] font-black leading-none text-slate-200/60">
                  {step.number}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 sm:block">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-sm font-black text-white">
                      {step.number}
                    </span>

                    <h3 className="text-[15px] font-black text-slate-950 sm:mt-4">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    {step.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Order types */}

          <div className="mt-6 rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-7">
            <h3 className="text-xl font-black text-slate-950 sm:text-2xl">
              Common Stock Trading Order Types
            </h3>

            <p className="mt-2 max-w-[1000px] text-[13px] leading-7 text-slate-600 sm:text-sm">
              Understanding order types gives you more control over how
              you enter or exit the market instead of relying only on the
              price available at the moment you place an order.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                {
                  name: "Market Order",
                  label: "Execute at Market",
                  text: "An order to buy or sell at the best available market price. The final execution price can differ in fast-moving markets.",
                },
                {
                  name: "Limit Order",
                  label: "Set Your Price",
                  text: "Allows you to specify a price at which you are willing to buy or sell rather than entering immediately at the current market price.",
                },
                {
                  name: "Stop Order",
                  label: "Trigger at a Level",
                  text: "An order that becomes active when the market reaches a specified price and can be used for entries or risk management.",
                },
              ].map((order) => (
                <div
                  key={order.name}
                  className="rounded-[17px] border border-slate-200 bg-white p-4"
                >
                  <div className="text-[11px] font-black text-brand-500">
                    {order.name}
                  </div>

                  <h4 className="mt-1 text-[16px] font-black text-slate-950">
                    {order.label}
                  </h4>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    {order.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          REAL STOCKS VS STOCK CFDs
      =================================================== */}

      <section
        id="stocks-vs-cfds"
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.055)] sm:rounded-[28px]">

            {/* Header */}

            <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f5f9ff_100%)] px-5 py-6 sm:px-7 lg:px-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Key Difference
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                Real Stocks vs Stock CFDs: What Is the Difference?
              </h2>

              <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                The term stock trading can refer to different products.
                Buying a real share generally gives you ownership of the
                underlying asset under the broker&apos;s and market&apos;s
                terms. A stock CFD is a financial contract based on the
                price movement of a share without ownership of the
                underlying stock.
              </p>
            </div>

            {/* Desktop comparison */}

            <div className="hidden p-6 md:block lg:p-8">
              <div className="overflow-hidden rounded-[18px] border border-slate-200">
                <table className="w-full text-left">
                  <thead className="bg-[#071c34] text-white">
                    <tr>
                      <th className="w-[30%] px-5 py-4 text-sm font-black">
                        Feature
                      </th>

                      <th className="w-[35%] px-5 py-4 text-sm font-black">
                        Real Stocks
                      </th>

                      <th className="w-[35%] px-5 py-4 text-sm font-black">
                        Stock CFDs
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      {
                        feature: "Ownership",
                        real: "Ownership of the underlying share, subject to broker and market structure",
                        cfd: "No ownership of the underlying share",
                      },
                      {
                        feature: "Leverage",
                        real: "Often limited or unavailable for standard cash purchases",
                        cfd: "May be available depending on broker, entity and jurisdiction",
                      },
                      {
                        feature: "Short Selling",
                        real: "Availability depends on the broker and market",
                        cfd: "Often designed to support both long and short positions",
                      },
                      {
                        feature: "Overnight Financing",
                        real: "Generally not applied in the same way to fully paid cash shares",
                        cfd: "May apply when leveraged positions are held overnight",
                      },
                      {
                        feature: "Trading Costs",
                        real: "May include commission, exchange or currency conversion fees",
                        cfd: "May include spread, commission and overnight financing",
                      },
                    ].map((row, index) => (
                      <tr
                        key={row.feature}
                        className={`border-t border-slate-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        <td className="px-5 py-4 text-[12px] font-black text-slate-950">
                          {row.feature}
                        </td>

                        <td className="px-5 py-4 text-[12px] leading-6 text-slate-600">
                          {row.real}
                        </td>

                        <td className="px-5 py-4 text-[12px] leading-6 text-slate-600">
                          {row.cfd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile comparison */}

            <div className="grid gap-3 p-4 md:hidden">
              {[
                {
                  feature: "Ownership",
                  real: "You generally own the underlying share.",
                  cfd: "You do not own the underlying share.",
                },
                {
                  feature: "Leverage",
                  real: "Often limited for cash shares.",
                  cfd: "May be available depending on jurisdiction.",
                },
                {
                  feature: "Short Selling",
                  real: "Depends on the broker and market.",
                  cfd: "Often supports long and short trading.",
                },
                {
                  feature: "Overnight Costs",
                  real: "Different cost structure for cash shares.",
                  cfd: "Financing may apply to overnight positions.",
                },
              ].map((row) => (
                <article
                  key={row.feature}
                  className="overflow-hidden rounded-[16px] border border-slate-200 bg-white"
                >
                  <div className="border-b border-slate-200 bg-[#071c34] px-4 py-2.5 text-[12px] font-black text-white">
                    {row.feature}
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="border-r border-slate-200 p-3">
                      <div className="text-[9px] font-black text-brand-600">
                        REAL STOCKS
                      </div>

                      <p className="mt-1.5 text-[11px] leading-5 text-slate-600">
                        {row.real}
                      </p>
                    </div>

                    <div className="p-3">
                      <div className="text-[9px] font-black text-brand-600">
                        STOCK CFDs
                      </div>

                      <p className="mt-1.5 text-[11px] leading-5 text-slate-600">
                        {row.cfd}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Important note */}

            <div className="border-t border-slate-200 bg-blue-50/60 px-5 py-4 sm:px-7">
              <p className="text-[11px] font-bold leading-6 text-slate-700 sm:text-[12px]">
                <strong className="text-slate-950">
                  Before opening an account:
                </strong>{" "}
                confirm whether the broker provides real shares, stock CFDs
                or both in your country. Product availability and trading
                conditions can vary by legal entity and jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          STOCK TRADING VS FOREX
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_26px_rgba(15,23,42,0.045)] sm:p-7">
              <span className="text-[10px] font-black text-brand-500">
                STOCKS VS FOREX
              </span>

              <h2 className="mt-2 text-[23px] font-black text-slate-950 sm:text-[28px]">
                Stock Trading vs Forex Trading
              </h2>

              <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-sm sm:leading-8">
                Stock traders focus on individual companies and their share
                prices, while forex traders buy and sell currency pairs such
                as EUR/USD. The two markets also differ in trading hours,
                liquidity, price drivers and the types of news traders
                typically monitor.
              </p>

              <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-sm sm:leading-8">
                A stock trader may follow company earnings, revenue,
                guidance, industry developments and broader equity market
                conditions. Forex traders typically pay closer attention to
                monetary policy, interest rates, inflation, economic data
                and currency-market developments.
              </p>
            </article>

            <article className="rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-7">
              <h3 className="text-lg font-black text-slate-950">
                Quick Comparison
              </h3>

              <div className="mt-4 space-y-2.5">
                {[
                  {
                    label: "Asset",
                    stocks: "Company Shares",
                    forex: "Currency Pairs",
                  },
                  {
                    label: "Examples",
                    stocks: "AAPL / NVDA",
                    forex: "EUR/USD",
                  },
                  {
                    label: "Price Drivers",
                    stocks: "Company, sector & market",
                    forex: "Economy, rates & currencies",
                  },
                  {
                    label: "Trading Hours",
                    stocks: "Usually exchange-based",
                    forex: "Global trading sessions",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[0.65fr_1fr_1fr] overflow-hidden rounded-xl border border-slate-200 bg-white text-center"
                  >
                    <div className="border-r border-slate-200 px-2 py-3 text-[9px] font-black text-slate-500">
                      {row.label}
                    </div>

                    <div className="border-r border-slate-200 px-2 py-3 text-[10px] font-black text-slate-900">
                      {row.stocks}
                    </div>

                    <div className="px-2 py-3 text-[10px] font-black text-slate-900">
                      {row.forex}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================
          US STOCK TRADING
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  Global Markets
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  Trading US Stocks Online
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    US stocks are among the most widely followed shares in
                    global financial markets. Major US exchanges include the{" "}
                    <strong className="text-slate-900">
                      New York Stock Exchange (NYSE)
                    </strong>{" "}
                    and{" "}
                    <strong className="text-slate-900">
                      Nasdaq
                    </strong>
                    , which list many of the world&apos;s best-known public
                    companies.
                  </p>

                  <p>
                    When comparing brokers for US stock trading, check the
                    number of available stocks, whether the broker offers
                    real shares or CFDs, the trading fees and the exchanges
                    you can access. Stock availability can vary significantly
                    between brokers and account entities.
                  </p>

                  <p>
                    Traders should also consider US market hours, their local
                    time zone and whether the broker offers pre-market or
                    after-hours trading if extended-hours access is important
                    to their strategy. This feature should not be assumed to
                    be available with every broker.
                  </p>
                </div>
              </div>

              {/* NYSE / NASDAQ cards */}

              <div className="grid gap-3 border-t border-slate-200 bg-[#f8fafc] p-5 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:p-7">
                <div className="flex flex-col justify-center rounded-[18px] border border-slate-200 bg-white p-5">
                  <div className="text-[25px] font-black tracking-tight text-[#0b3157]">
                    NYSE
                  </div>

                  <div className="mt-1 text-[12px] font-black text-slate-950">
                    New York Stock Exchange
                  </div>

                  <p className="mt-2 text-[11px] leading-6 text-slate-500">
                    One of the world&apos;s largest stock exchanges, with
                    companies from a wide range of sectors.
                  </p>
                </div>

                <div className="flex flex-col justify-center rounded-[18px] border border-slate-200 bg-white p-5">
                  <div className="text-[25px] font-black tracking-tight text-[#0b3157]">
                    NASDAQ
                  </div>

                  <div className="mt-1 text-[12px] font-black text-slate-950">
                    Nasdaq Stock Market
                  </div>

                  <p className="mt-2 text-[11px] leading-6 text-slate-500">
                    A major US exchange known for listing many large
                    technology and growth companies.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ===================================================
          POPULAR STOCKS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Popular Global Stocks
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
              Popular Stocks Traders Search For
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              The stocks available for online trading vary between brokers.
              Well-known US shares include companies in technology,
              semiconductors, electric vehicles and e-commerce. Always check
              whether the specific stock you want to trade is available
              before opening an account.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {[
              {
                symbol: "AAPL",
                name: "Apple",
                sector: "Technology",
              },
              {
                symbol: "NVDA",
                name: "NVIDIA",
                sector: "Semiconductors",
              },
              {
                symbol: "TSLA",
                name: "Tesla",
                sector: "Automotive",
              },
              {
                symbol: "AMZN",
                name: "Amazon",
                sector: "E-commerce & Tech",
              },
              {
                symbol: "MSFT",
                name: "Microsoft",
                sector: "Technology",
              },
              {
                symbol: "META",
                name: "Meta",
                sector: "Technology",
              },
            ].map((stock) => (
              <article
                key={stock.symbol}
                className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_10px_25px_rgba(15,23,42,0.05)]"
              >
                <div className="text-[18px] font-black text-brand-600">
                  {stock.symbol}
                </div>

                <h3 className="mt-1 text-[13px] font-black text-slate-950">
                  {stock.name}
                </h3>

                <div className="mt-3 border-t border-slate-200 pt-2 text-[9px] font-bold text-slate-500">
                  {stock.sector}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-[16px] border border-blue-100 bg-blue-50/60 px-4 py-3">
            <p className="text-[11px] font-bold leading-6 text-slate-600 sm:text-[12px]">
              These companies are shown for educational and illustrative
              purposes only and should not be interpreted as a recommendation
              to buy or sell any stock. Availability varies by broker,
              jurisdiction and account entity.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          STOCK TRADING PLATFORMS
      =================================================== */}

      <section
        id="stock-platforms"
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] sm:rounded-[28px]">

            {/* Header */}

            <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f5f9ff_100%)] px-5 py-6 sm:px-7 lg:px-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Trading Platforms
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                What Is the Best Stock Trading Platform?
              </h2>

              <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                There is no single best stock trading platform for every
                trader. The right choice depends on the markets you want to
                access, the tools you use and your trading style. Brokers may
                offer platforms such as MetaTrader, TradingView or cTrader,
                while others provide proprietary web and mobile trading
                platforms.
              </p>
            </div>

            {/* Platforms */}

            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
              {[
                {
                  name: "MetaTrader 5",
                  short: "MT5",
                  text: "A multi-asset trading platform with charts, order types and analysis tools supported by a range of online brokers.",
                  href: "/en/best-brokers/mt5",
                },
                {
                  name: "MetaTrader 4",
                  short: "MT4",
                  text: "A widely known trading platform, although the availability of stocks and other instruments depends on the broker.",
                  href: "/en/best-brokers/mt4",
                },
                {
                  name: "TradingView",
                  short: "TV",
                  text: "Known for advanced charting and analysis tools, with some brokers offering direct TradingView integration.",
                  href: "/en/best-brokers/tradingview",
                },
                {
                  name: "cTrader",
                  short: "cT",
                  text: "A modern trading platform with execution and charting tools. Available asset classes vary between brokers.",
                  href: "/en/best-brokers/ctrader",
                },
              ].map((platform) => (
                <article
                  key={platform.name}
                  className="relative flex h-full flex-col rounded-[19px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-center gap-3 sm:block">
                    <div className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#071c34] px-2 text-[11px] font-black text-white">
                      {platform.short}
                    </div>

                    <h3 className="flex-1 text-left text-[17px] font-black text-slate-950 sm:mt-4 sm:text-[18px]">
                      {platform.name}
                    </h3>

                    <span className="ml-auto rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[8px] font-black text-slate-500 sm:absolute sm:right-5 sm:top-5">
                      TRADING PLATFORM
                    </span>
                  </div>

                  <p className="mt-2 flex-1 text-[12px] leading-6 text-slate-600">
                    {platform.text}
                  </p>

                  {/*
                    Enable these links when the individual
                    platform pages are published.

                  <Link
                    href={platform.href}
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-black text-brand-600"
                  >
                    Best {platform.name} Brokers
                    <span>→</span>
                  </Link>
                  */}
                </article>
              ))}
            </div>

            {/* What to look for */}

            <div className="border-t border-slate-200 bg-[#f8fafc] px-5 py-5 sm:px-7">
              <h3 className="text-[17px] font-black text-slate-950">
                What Should You Look for in a Stock Trading Platform?
              </h3>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Easy stock and ticker search",
                  "Charts and technical analysis tools",
                  "Multiple order types",
                  "Clear position and risk management",
                  "Reliable mobile trading app",
                  "Fast and stable order execution",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[9px] font-black text-emerald-700">
                      ✓
                    </span>

                    <span className="text-[11px] font-bold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PART 3 CONTINUES HERE

          - How to choose a stock broker
          - Regulation and safety
          - Stock trading fees
          - Minimum deposits
          - Islamic accounts
          - Stock trading for beginners
          - Risks
          - Broker Alarab methodology
          - Related guides
          - FAQ + FAQ Schema
          - Final CTA
      =================================================== */}
            {/* ===================================================
          HOW TO CHOOSE A STOCK BROKER
      =================================================== */}

      <section
        id="how-to-choose"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          {/* Header */}

          <div className="max-w-[1100px] text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Choosing a Broker
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
              How to Choose the Best Broker for Stock Trading
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              The best stock broker for one trader may not be the best choice
              for another. Your decision should depend on the type of stocks
              you want to trade, your country, account size, preferred
              platform, trading costs and whether you want real shares or
              stock CFDs.
            </p>
          </div>

          {/* Selection factors */}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "Regulation & Legal Entity",
                text: "Check which company entity will hold your account and which financial authority regulates that entity.",
              },
              {
                number: "02",
                title: "Real Stocks or CFDs",
                text: "Confirm whether you will own the underlying shares or trade their price movements through stock CFDs.",
              },
              {
                number: "03",
                title: "Markets & Stock Selection",
                text: "Check whether the broker provides access to the exchanges, countries and individual stocks you want to trade.",
              },
              {
                number: "04",
                title: "Trading Fees",
                text: "Compare commissions, spreads, overnight financing, currency conversion charges and other applicable costs.",
              },
              {
                number: "05",
                title: "Trading Platform",
                text: "Choose a platform that provides the charts, order types, research tools and mobile experience you need.",
              },
              {
                number: "06",
                title: "Deposits & Withdrawals",
                text: "Review the minimum deposit, supported payment methods, withdrawal process and any related fees.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:border-brand-200 hover:bg-white hover:shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-center gap-3 sm:items-start sm:justify-between sm:gap-4">
                  <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[12px] bg-brand-500 text-[11px] font-black text-white">
                    {item.number}
                  </span>

                  <h3 className="flex-1 text-[16px] font-black text-slate-950 sm:hidden">
                    {item.title}
                  </h3>

                  <div className="hidden h-px flex-1 bg-slate-200 sm:block" />
                </div>

                <h3 className="mt-4 hidden text-[16px] font-black text-slate-950 sm:block">
                  {item.title}
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          REGULATION & SAFETY
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7 lg:p-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Regulation & Safety
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[34px]">
                Is an Online Stock Broker Safe?
              </h2>

              <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                <p>
                  No online broker should be considered safe simply because
                  it has a professional website, a popular trading platform
                  or a well-known brand name. Regulation is one of the most
                  important factors to investigate before depositing money.
                </p>

                <p>
                  Large international brokers may operate through several
                  legal entities regulated in different jurisdictions. The
                  protections, leverage limits and products available to you
                  can therefore depend on the specific entity under which
                  your account is opened.
                </p>

                <p>
                  Before funding an account, verify the broker&apos;s legal
                  name, regulator and licence information. When possible,
                  compare the information shown by the broker with the
                  official register of the relevant financial regulator.
                </p>
              </div>

              <div className="mt-5 rounded-[16px] border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-[11px] font-bold leading-6 text-amber-900 sm:text-[12px]">
                  Regulation can reduce certain risks, but it does not remove
                  market risk or guarantee that trading will be profitable.
                </p>
              </div>
            </article>

            <aside className="rounded-[22px] bg-[#071c34] p-5 text-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:p-7">
              <h3 className="text-xl font-black">
                Broker Safety Checklist
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "Legal company name",
                  "Regulatory authority",
                  "Licence or registration details",
                  "Entity serving your country",
                  "Client fund arrangements",
                  "Withdrawal terms and procedures",
                  "Risk disclosures and legal documents",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-[10px] font-black text-cyan-300">
                      ✓
                    </span>

                    <span className="text-[12px] font-bold text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/en/licenses"
                className="mt-5 inline-flex items-center gap-2 text-[12px] font-black text-cyan-300 transition hover:text-white"
              >
                Explore Broker Regulations
                <span>→</span>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ===================================================
          STOCK TRADING FEES
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-[1100px] text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Trading Costs
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
              Stock Trading Fees and Costs
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Comparing stock brokers by a single fee can be misleading.
              The total cost of online stock trading may include commissions,
              spreads, overnight financing, currency conversion and other
              account-related charges.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              {
                title: "Commission",
                text: "Some brokers charge a fixed or percentage-based commission when buying or selling stocks.",
              },
              {
                title: "Spread",
                text: "The difference between the buy and sell price can form part of the total trading cost.",
              },
              {
                title: "Overnight Financing",
                text: "Leveraged stock CFD positions may incur financing charges when held overnight.",
              },
              {
                title: "Currency Conversion",
                text: "A conversion fee may apply when the stock and your account use different currencies.",
              },
              {
                title: "Other Fees",
                text: "Depending on the broker, inactivity, withdrawal or market-data fees may also apply.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-[13px] font-black text-brand-600">
                  $
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

          <div className="mt-5 rounded-[18px] border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
            <p className="text-[12px] font-bold leading-7 text-slate-700">
              A broker advertising &quot;zero commission&quot; does not
              necessarily mean that trading is completely free. Check the
              broker&apos;s full fee schedule and the costs associated with
              the specific product and account you intend to use.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          MINIMUM DEPOSIT
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">

            <div className="rounded-[22px] bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 text-white sm:p-7">
              <div className="text-[10px] font-black tracking-wide text-cyan-300">
                ACCOUNT FUNDING
              </div>

              <h2 className="mt-3 text-[25px] font-black leading-tight sm:text-[31px]">
                Minimum Deposit for Stock Trading
              </h2>

              <p className="mt-4 text-[13px] leading-7 text-slate-300">
                Minimum deposit requirements vary significantly between
                online brokers and account types. A low minimum deposit can
                make an account more accessible, but it should not be the
                only factor used to choose a broker.
              </p>
            </div>

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-7">
              <h3 className="text-xl font-black text-slate-950">
                How Much Money Do You Need to Start Trading Stocks?
              </h3>

              <div className="mt-3 space-y-3 text-[13px] leading-7 text-slate-600 sm:text-sm sm:leading-8">
                <p>
                  The amount needed depends on the broker, the financial
                  product and the size of the positions you intend to trade.
                  Some brokers have relatively low account minimums, while
                  others may require larger deposits for certain account
                  types or services.
                </p>

                <p>
                  The broker&apos;s minimum deposit is not the same as the
                  amount you should personally risk. Your trading capital
                  should reflect your financial circumstances, risk
                  tolerance and strategy.
                </p>
              </div>

              <Link
                href="/en/best-brokers/low-minimum-deposit"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-[11px] font-black text-brand-600 transition hover:bg-brand-100"
              >
                Compare Low Minimum Deposit Brokers
                <span>→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================
          ISLAMIC STOCK TRADING ACCOUNTS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
                  Islamic Accounts
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
                  Islamic Accounts for Stock Trading
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    Some online brokers offer Islamic or swap-free account
                    options for eligible clients. The exact terms can differ
                    between brokers, account types, instruments and regions.
                  </p>

                  <p>
                    Traders should not assume that an account described as
                    &quot;Islamic&quot; or &quot;swap-free&quot; automatically
                    applies to every stock or eliminates every possible fee.
                    Review the broker&apos;s specific conditions, including
                    any administrative charges or holding-period rules.
                  </p>

                  <p>
                    It is also important to distinguish between the broker&apos;s
                    account structure and the broader question of whether a
                    particular stock, financial product or trading method
                    meets your own requirements.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 bg-emerald-50/50 p-5 lg:border-l lg:border-t-0 lg:p-7">
                <h3 className="text-lg font-black text-slate-950">
                  What to Check
                </h3>

                <div className="mt-4 space-y-2.5">
                  {[
                    "Is a swap-free account available?",
                    "Which instruments are eligible?",
                    "Are there administrative fees?",
                    "Are there holding-period limits?",
                    "Does availability depend on country?",
                    "Which legal entity provides the account?",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-white px-3 py-2.5"
                    >
                      <span className="mt-0.5 text-[10px] font-black text-emerald-600">
                        ✓
                      </span>

                      <span className="text-[11px] font-bold leading-5 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ===================================================
          STOCK TRADING FOR BEGINNERS
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-[1100px] text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Beginner Guide
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
              How to Start Stock Trading for Beginners
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Beginners should focus first on understanding how stock markets
              and trading accounts work rather than trying to find the
              highest leverage or the fastest way to make a return.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: "1",
                title: "Learn the Basics",
                text: "Understand stocks, exchanges, order types, trading hours, risk and the difference between investing and leveraged trading.",
              },
              {
                number: "2",
                title: "Choose a Regulated Broker",
                text: "Research the broker, its legal entity and regulation before depositing funds.",
              },
              {
                number: "3",
                title: "Use a Demo Account",
                text: "If available, practice navigating the platform and placing orders before trading with real money.",
              },
              {
                number: "4",
                title: "Start With a Suitable Size",
                text: "Avoid choosing position sizes simply because the broker makes higher leverage available.",
              },
              {
                number: "5",
                title: "Learn Risk Management",
                text: "Understand position sizing, stop losses and how much capital you are prepared to risk on a trade.",
              },
              {
                number: "6",
                title: "Review Your Performance",
                text: "Keep track of your decisions and results so you can identify mistakes and improve your process.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-[18px] border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center gap-3 sm:block">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#071c34] text-[12px] font-black text-white">
                    {step.number}
                  </div>

                  <h3 className="flex-1 text-[16px] font-black text-slate-950 sm:mt-4">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          STOCK TRADING RISKS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">

            <div className="rounded-[22px] bg-[#071c34] p-5 text-white sm:p-7">
              <span className="inline-flex rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-[9px] font-black text-rose-200">
                RISK WARNING
              </span>

              <h2 className="mt-4 text-[25px] font-black leading-tight sm:text-[31px]">
                Risks of Online Stock Trading
              </h2>

              <p className="mt-4 text-[13px] leading-7 text-slate-300">
                Stock prices can move against your position and losses are
                possible. Leveraged products such as CFDs can increase risk
                because relatively small market movements can have a larger
                effect on your account.
              </p>

              <p className="mt-3 text-[11px] font-bold leading-6 text-slate-400">
                Never choose a broker based only on leverage, bonuses or
                promotional claims.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Market Risk",
                  text: "A stock price can fall because of company results, economic conditions, industry developments or broader market movements.",
                },
                {
                  title: "Leverage Risk",
                  text: "Leverage can magnify both gains and losses and may cause capital to be lost more quickly.",
                },
                {
                  title: "Liquidity Risk",
                  text: "Some shares may have lower trading activity, wider spreads or more difficult execution during certain market conditions.",
                },
                {
                  title: "Company-Specific Risk",
                  text: "Earnings, debt, management decisions, competition and unexpected events can significantly affect an individual stock.",
                },
              ].map((risk) => (
                <article
                  key={risk.title}
                  className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-5"
                >
                  <div className="flex items-center gap-3 sm:block">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-[12px] font-black text-rose-700">
                      !
                    </div>

                    <h3 className="flex-1 text-[15px] font-black text-slate-950 sm:mt-3">
                      {risk.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-[11px] leading-6 text-slate-600">
                    {risk.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          BROKER ALARAB METHODOLOGY
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  Our Methodology
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
                  How Broker Alarab Compares Stock Brokers
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  Broker Alarab compares brokers using information in our
                  broker database and the criteria that matter when users
                  research an online stock trading account. Our comparison
                  considers factors such as regulation, available products,
                  trading platforms, account conditions and broker ratings.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  The order shown on this page is generated using our internal
                  comparison criteria and available broker data. It should
                  not be interpreted as a guarantee that the first broker is
                  the best choice for every trader.
                </p>

                <Link
                  href="/en/how-we-review"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-black text-brand-600 transition hover:text-brand-700"
                >
                  Read How We Review Brokers
                  <span>→</span>
                </Link>
              </div>

              <div className="border-t border-slate-200 bg-[#f8fafc] p-5 lg:border-l lg:border-t-0 lg:p-7">
                <h3 className="text-lg font-black text-slate-950">
                  Key Comparison Factors
                </h3>

                <div className="mt-4 space-y-2.5">
                  {[
                    "Broker regulation",
                    "Available stock products",
                    "Trading platforms",
                    "Minimum deposit",
                    "Account options",
                    "Broker rating",
                    "Available features",
                    "Data quality and updates",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[9px] font-black text-brand-600">
                        {index + 1}
                      </span>

                      <span className="text-[11px] font-bold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ===================================================
          RELATED GUIDES / INTERNAL LINKS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Related Broker Guides
            </span>

            <h2 className="mt-3 text-[25px] font-black text-slate-950 sm:text-3xl">
              Explore More Broker Comparisons
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Best Brokers",
                text: "Compare leading online brokers across our main broker rankings.",
                href: "/en/best-brokers",
              },
              {
                title: "Lowest Spread Brokers",
                text: "Compare brokers with competitive spreads and trading conditions.",
                href: "/en/best-brokers/lowest-spread",
              },
              {
                title: "Gold Trading Brokers",
                text: "Compare brokers and platforms for online gold trading.",
                href: "/en/best-brokers/gold",
              },
              {
                title: "Low Deposit Brokers",
                text: "Find brokers with lower minimum deposit requirements.",
                href: "/en/best-brokers/low-minimum-deposit",
              },
            ].map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-[18px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
              >
                <h3 className="text-[16px] font-black text-slate-950 transition group-hover:text-brand-600">
                  {guide.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {guide.text}
                </p>

                <div className="mt-4 text-[11px] font-black text-brand-600">
                  Explore Guide →
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
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-[1150px]">
            <div className="text-center">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                FAQ
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
                Frequently Asked Questions About Stock Trading
              </h2>

              <p className="mx-auto mt-3 max-w-[850px] text-[13px] leading-7 text-slate-600 sm:text-sm">
                Answers to common questions about choosing stock brokers,
                online stock trading, real shares, CFDs, platforms and
                account requirements.
              </p>
            </div>

            <div className="mt-7 space-y-3">
              {[
                {
                  question: "What is the best broker for stock trading?",
                  answer:
                    "There is no single best stock broker for every trader. The right choice depends on your country, whether you want real shares or stock CFDs, the markets you want to access, trading fees, regulation, platform preferences and account size. Compare these factors before choosing a broker.",
                },
                {
                  question: "Can I trade stocks online?",
                  answer:
                    "Yes. Online brokers allow clients to access stocks or stock-based products through web, desktop and mobile trading platforms. The specific stocks, exchanges and products available depend on the broker and the legal entity serving your country.",
                },
                {
                  question: "What is the difference between stocks and stock CFDs?",
                  answer:
                    "Buying a real stock generally means acquiring ownership of the underlying share according to the broker and market structure. A stock CFD is a derivative that follows the price movement of the share without giving you ownership of the underlying stock.",
                },
                {
                  question: "Can I trade US stocks online?",
                  answer:
                    "Many online brokers provide access to US stocks or CFDs based on US stocks, including companies listed on the NYSE and Nasdaq. Availability, fees and product structure vary between brokers and jurisdictions.",
                },
                {
                  question: "What is the best platform for stock trading?",
                  answer:
                    "The best platform depends on your needs. Some brokers support MetaTrader 5, MetaTrader 4, TradingView or cTrader, while others provide proprietary platforms. Compare charting tools, order types, mobile apps, available markets and ease of use.",
                },
                {
                  question: "How much money do I need to start trading stocks?",
                  answer:
                    "Minimum deposit requirements vary by broker and account type. Some brokers allow accounts with relatively small deposits, but the broker's minimum should not determine how much money you personally choose to risk.",
                },
                {
                  question: "Are stock brokers regulated?",
                  answer:
                    "Many stock brokers operate through regulated legal entities, but regulation differs by company and jurisdiction. Always verify which entity will hold your account and check its regulatory details before depositing funds.",
                },
                {
                  question: "Do stock brokers charge commissions?",
                  answer:
                    "Some brokers charge commissions on stock trades, while others advertise commission-free trading. Other costs can still apply, including spreads, currency conversion, financing or account-related fees, so the full fee schedule should be reviewed.",
                },
                {
                  question: "Can beginners trade stocks online?",
                  answer:
                    "Yes, but beginners should first learn how stocks, orders, fees and risk work. A demo account can be useful for learning a platform when available, and leveraged products should be approached carefully because they can increase losses.",
                },
                {
                  question: "Can I use an Islamic account for stock trading?",
                  answer:
                    "Some brokers provide Islamic or swap-free account options for eligible clients. Terms vary by broker, instrument, jurisdiction and account type, so users should review the specific conditions before trading.",
                },
              ].map((item) => (
                <details
                  key={item.question}
                  className="group overflow-hidden rounded-[16px] border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left sm:px-5">
                    <h3 className="text-[13px] font-black leading-6 text-slate-950 sm:text-[14px]">
                      {item.question}
                    </h3>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-slate-100 px-4 py-4 sm:px-5">
                    <p className="text-[12px] leading-7 text-slate-600 sm:text-[13px]">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="bg-white px-3 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1520px]">
          <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(110deg,#06172b_0%,#092d51_55%,#0d4b82_100%)] px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.14)] sm:rounded-[30px] sm:px-8 sm:py-9 lg:px-10">
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-36 left-[20%] h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[850px] text-left">
                <span className="inline-flex rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[9px] font-black text-cyan-200">
                  COMPARE BEFORE YOU CHOOSE
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-tight sm:text-3xl lg:text-[36px]">
                  Compare Stock Brokers Before Opening an Account
                </h2>

                <p className="mt-3 max-w-[800px] text-[13px] leading-7 text-slate-300 sm:text-sm sm:leading-8">
                  Review broker ratings, trading platforms, minimum deposits
                  and available account features, then read the full broker
                  review before making your decision.
                </p>
              </div>

              <div className="grid shrink-0 grid-cols-2 gap-2.5 sm:flex">
                <a
                  href="#best-stock-brokers"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#2471df] px-4 text-[11px] font-black text-white transition hover:bg-[#2e7cea] sm:px-6 sm:text-[12px]"
                >
                  Compare Brokers
                </a>

                <Link
                  href="/en/best-brokers"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/[0.07] px-4 text-[11px] font-black text-white transition hover:bg-white/[0.12] sm:px-6 sm:text-[12px]"
                >
                  All Brokers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          DISCLAIMER
      =================================================== */}

      <section className="bg-[#f4f7fb] px-3 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1520px]">
          <div className="rounded-[16px] border border-slate-200 bg-white px-4 py-4 sm:px-5">
            <p className="text-[10px] leading-6 text-slate-500 sm:text-[11px]">
              <strong className="text-slate-700">
                Risk disclosure:
              </strong>{" "}
              Trading and investing involve risk. Stock prices can rise or
              fall, and leveraged products such as CFDs can result in rapid
              losses. Information on this page is provided for educational
              and comparison purposes and should not be considered investment
              advice. Broker products, regulations, fees and account
              conditions may vary by country and legal entity. Always verify
              current information with the broker before opening or funding
              an account.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          FAQ STRUCTURED DATA
      =================================================== */}

      <Script
        id="stock-brokers-en-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the best broker for stock trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "There is no single best stock broker for every trader. The right choice depends on your country, whether you want real shares or stock CFDs, available markets, trading fees, regulation, platform preferences and account size.",
                },
              },
              {
                "@type": "Question",
                name: "Can I trade stocks online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. Online brokers allow clients to access stocks or stock-based products through web, desktop and mobile trading platforms. Available stocks and products vary by broker and jurisdiction.",
                },
              },
              {
                "@type": "Question",
                name:
                  "What is the difference between stocks and stock CFDs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Buying a real stock generally means acquiring ownership of the underlying share. A stock CFD is a derivative based on the share price and does not provide ownership of the underlying stock.",
                },
              },
              {
                "@type": "Question",
                name: "Can I trade US stocks online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Many online brokers provide access to US stocks or CFDs based on US stocks, including companies listed on the NYSE and Nasdaq. Availability and fees vary by broker and jurisdiction.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best platform for stock trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "The best platform depends on the trader's needs. Brokers may offer MetaTrader 5, MetaTrader 4, TradingView, cTrader or proprietary platforms with different tools and available markets.",
                },
              },
              {
                "@type": "Question",
                name:
                  "How much money do I need to start trading stocks?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Minimum deposit requirements vary by broker and account type. The broker's minimum deposit should not determine how much capital an individual chooses to risk.",
                },
              },
              {
                "@type": "Question",
                name: "Are stock brokers regulated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Many brokers operate through regulated legal entities, but regulation differs by company and jurisdiction. Traders should verify the specific entity and regulatory details before depositing funds.",
                },
              },
              {
                "@type": "Question",
                name: "Do stock brokers charge commissions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Some brokers charge commissions while others advertise commission-free stock trading. Spreads, financing, currency conversion and other fees may still apply.",
                },
              },
              {
                "@type": "Question",
                name: "Can beginners trade stocks online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Beginners can trade stocks online, but they should first understand stocks, order types, fees and risk. Demo accounts can help users learn a platform when available.",
                },
              },
              {
                "@type": "Question",
                name:
                  "Can I use an Islamic account for stock trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Some brokers offer Islamic or swap-free account options for eligible clients. Terms vary by broker, instrument, account type and jurisdiction.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}