import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Best Indices Brokers for Index Trading 2026",
  description:
    "Compare the best indices brokers for online index trading in 2026. Review platforms, regulation, minimum deposits and account features for trading the S&P 500, Nasdaq 100, Dow Jones, DAX 40 and other major indices.",

  alternates: {
    canonical: "https://brokeralarab.com/en/best-brokers/indices",

    languages: {
      ar: "https://brokeralarab.com/best-brokers/indices",
      en: "https://brokeralarab.com/en/best-brokers/indices",
      "x-default": "https://brokeralarab.com/en/best-brokers/indices",
    },
  },

  openGraph: {
    title: "Best Indices Brokers for Index Trading 2026",

    description:
      "Compare brokers for trading major global indices including the S&P 500, Nasdaq 100, Dow Jones, DAX 40 and FTSE 100.",

    url: "https://brokeralarab.com/en/best-brokers/indices",

    type: "website",
    siteName: "Broker Alarab",
    locale: "en_US",
    images: [
  {
    url: "/og-image.webp",
    alt: "Best Indices Brokers for Index Trading 2026 | Broker Alarab",
  },
],
  },

  twitter: {
    card: "summary_large_image",

    title: "Best Indices Brokers for Index Trading 2026",

    description:
      "Compare index trading brokers, platforms, regulation, minimum deposits and key account features.",
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

type IndexBroker = {
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

  indexScore: number;
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
   INDEX TRADING SUPPORT DETECTION
========================================================= */

function supportsIndices(broker: BrokerRow) {
  const assets = normalizeText(getTradingAssets(broker));

  return (
    assets.includes("index") ||
    assets.includes("indices") ||
    assets.includes("index cfd") ||
    assets.includes("index cfds") ||
    assets.includes("indices cfd") ||
    assets.includes("indices cfds") ||
    assets.includes("مؤشر") ||
    assets.includes("مؤشرات") ||
    assets.includes("المؤشرات")
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
   INDEX BROKER SCORE

   Internal ranking score used to organize eligible brokers
   displayed on this page.

   This ranking does not claim that one broker is objectively
   the best index broker for every trader.
========================================================= */

function calculateIndexScore(broker: BrokerRow) {
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
  broker: IndexBroker;
  compact?: boolean;
}) {
  /*
    Keep /en/brokers/${broker.slug} only if the English
    broker review route exists on the site.
  */
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

export default async function BestIndicesTradingBrokersPage() {
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
            Unable to load index broker data
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {brokersError.message}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     FILTER BROKERS THAT SUPPORT INDICES
  ======================================================= */

  const indexBrokers: IndexBroker[] = (
    (brokersData ?? []) as BrokerRow[]
  )
    .filter((broker) => supportsIndices(broker))
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

      indexScore:
        calculateIndexScore(broker),
    }))
    .sort((a, b) => {
      if (b.indexScore !== a.indexScore) {
        return b.indexScore - a.indexScore;
      }

      const ratingA = Number(a.rating) || 0;
      const ratingB = Number(b.rating) || 0;

      return ratingB - ratingA;
    });

  const featuredBrokers =
    indexBrokers.slice(0, 8);

  const islamicIndexBrokers =
    indexBrokers.filter((broker) =>
      hasIslamicAccount(
        broker.islamicAccount
      )
    );

  const platformNames = new Set<string>();

  indexBrokers.forEach((broker) => {
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
        item: "https://brokeralarab.com/en/best-brokers",
      },

      {
        "@type": "ListItem",
        position: 3,
        name: "Best Indices Brokers",
        item: "https://brokeralarab.com/en/best-brokers/indices",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name:
      "Best Indices Brokers for Index Trading 2026",

    url:
      "https://brokeralarab.com/en/best-brokers/indices",

    description:
      "Compare brokers for trading major global stock market indices, including platforms, regulation, minimum deposits and key account features.",

    inLanguage: "en",

    isPartOf: {
      "@type": "WebSite",
      name: "Broker Alarab",
      url: "https://brokeralarab.com",
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",

    name:
      "Best Indices Brokers for Index Trading 2026",

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
            : "https://brokeralarab.com/en/best-brokers/indices",
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
        id="indices-brokers-en-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      <Script
        id="indices-brokers-en-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageJsonLd
            ),
        }}
      />

      <Script
        id="indices-brokers-en-itemlist-jsonld"
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
              Indices Brokers
            </span>
          </nav>

          {/* HERO CONTENT */}

          <div className="mt-0 text-left sm:mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              Index Trading Broker Guide 2026
            </div>

            <h1 className="mt-3 max-w-[1350px] text-[30px] font-black leading-[1.2] tracking-[-0.025em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
              <span className="block sm:inline">
                Best Indices Brokers
              </span>{" "}

              <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
                for Index Trading in 2026
              </span>
            </h1>

            {/* Mobile description */}

            <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
              Compare brokers for trading the S&amp;P 500, Nasdaq
              100, Dow Jones and other major global indices.
            </p>

            {/* Desktop description */}

            <p className="mt-3 hidden max-w-[1220px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
              Compare the best indices brokers for online index trading.
              Review trading platforms, regulation, minimum deposits and
              account features for trading major markets such as the
              S&amp;P 500, Nasdaq 100, Dow Jones, DAX 40 and FTSE 100.
            </p>

            {/* Update information */}

            <div className="mt-2.5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
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

                Independent broker comparison
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <span className="text-cyan-300">
                  ✓
                </span>

                Broker Alarab data
              </span>
            </div>

            {/* STATS + BUTTONS */}

            <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-start lg:gap-6">
              <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[620px]">
                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {indexBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Index brokers
                  </div>
                </div>

                <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {islamicIndexBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Islamic options
                  </div>
                </div>

                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {platformNames.size}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Major platforms
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-2.5 sm:w-auto sm:gap-3">
                <a
                  href="#best-indices-brokers"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
                >
                  <span className="sm:hidden">
                    Compare Brokers
                  </span>

                  <span className="hidden sm:inline">
                    Compare Index Brokers
                  </span>

                  <span aria-hidden="true">
                    →
                  </span>
                </a>

                <a
                  href="#indices-guide"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
                >
                  Index Trading Guide

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
            aria-label="On this page"
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {[
              {
                href: "#best-indices-brokers",
                label: "Best Index Brokers",
              },
              {
                href: "#indices-guide",
                label: "Index Trading Guide",
              },
              {
                href: "#popular-indices",
                label: "Popular Indices",
              },
              {
                href: "#indices-platforms",
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
          BEST INDICES BROKERS
      =================================================== */}

      <section
        id="best-indices-brokers"
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
                    Index Broker Comparison
                  </span>

                  <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[34px]">
                    Best Indices Brokers for Online Trading
                  </h2>

                  <p className="mt-2 max-w-[1080px] text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                    Compare published brokers in the Broker Alarab
                    database that offer index trading. Review their
                    trading platforms, minimum deposits, account
                    features and ratings before choosing a broker for
                    trading major stock market indices.
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-3 rounded-[15px] border border-blue-100 bg-white/95 px-4 py-3 shadow-sm lg:flex">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-brand-50 text-lg font-black text-brand-600">
                    {featuredBrokers.length}
                  </div>

                  <div className="text-left">
                    <div className="text-[12px] font-black text-slate-900">
                      Brokers compared
                    </div>

                    <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                      From {indexBrokers.length} eligible brokers
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

                Available indices, spreads, leverage, margin
                requirements and trading hours can vary by broker,
                account type, legal entity and jurisdiction. Always
                check the contract specifications and current trading
                conditions before placing a trade.
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
          PART 2
          INDEX TRADING GUIDE
      =================================================== */}

      {/* ===================================================
          QUICK ANSWER / INDEX TRADING GUIDE
      =================================================== */}

      <section
        id="indices-guide"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr] lg:gap-6">

            {/* MAIN GUIDE */}

            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
              <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f6f9fd_65%,#edf5ff_100%)] px-5 py-6 sm:px-7">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                  Quick Guide
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  How to Choose the Best Broker for Index Trading
                </h2>

                <p className="mt-3 max-w-[1080px] text-[14px] leading-8 text-slate-600 sm:text-[16px]">
                  Choosing an index trading broker involves more than
                  comparing overall broker ratings. Check which stock
                  market indices are available, the spreads charged on
                  the markets you plan to trade, trading hours, margin
                  requirements, platform quality and order execution.
                  These factors can be particularly important when
                  trading actively moving markets such as the Nasdaq
                  100, S&amp;P 500 and Dow Jones.
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                {[
                  {
                    number: "01",
                    title: "Available Indices",
                    text: "Check whether the broker offers the markets you need, such as the S&P 500, Nasdaq 100, Dow Jones, DAX 40 and FTSE 100.",
                  },
                  {
                    number: "02",
                    title: "Spreads & Costs",
                    text: "Compare index spreads and other trading costs on the specific markets you expect to trade most frequently.",
                  },
                  {
                    number: "03",
                    title: "Trading Hours",
                    text: "Review the trading session for each index and whether the broker offers extended trading hours on selected markets.",
                  },
                  {
                    number: "04",
                    title: "Platform & Execution",
                    text: "Look for reliable charting, risk-management orders and an execution environment suited to your trading style.",
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

            {/* QUICK CHECKLIST */}

            <aside className="rounded-[22px] border border-slate-200 bg-[#071c34] p-5 text-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:rounded-[28px] sm:p-6">
              <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[9px] font-black text-cyan-200">
                Before Opening an Account
              </span>

              <h3 className="mt-4 text-xl font-black leading-8">
                7 Things Index Traders Should Check
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "Major indices available",
                  "S&P 500 and Nasdaq 100 spreads",
                  "Trading hours and extended sessions",
                  "Leverage and margin requirements",
                  "Overnight financing costs",
                  "Platform quality and execution",
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
          WHAT IS INDEX TRADING?
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">

            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">

              {/* CONTENT */}

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  Index Trading Basics
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  What Is Index Trading and How Does It Work?
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    A stock market index measures the performance of a
                    selected group of companies. Instead of following
                    the share price of one company, an index provides a
                    broader view of a market, market segment or group of
                    stocks.
                  </p>

                  <p>
                    The{" "}
                    <strong className="text-slate-900">
                      S&amp;P 500
                    </strong>{" "}
                    is widely used to track large U.S. companies, while
                    the{" "}
                    <strong className="text-slate-900">
                      Nasdaq 100
                    </strong>{" "}
                    follows 100 of the largest non-financial companies
                    listed on the Nasdaq Stock Market and has significant
                    exposure to technology and growth companies.
                  </p>

                  <p>
                    Retail traders do not normally buy an index itself.
                    One common way brokers provide access to index price
                    movements is through{" "}
                    <strong className="text-slate-900">
                      index CFDs
                    </strong>
                    . A CFD allows a trader to speculate on whether the
                    price of an index will rise or fall without owning
                    the individual shares that make up the index.
                  </p>
                </div>
              </div>

              {/* VISUAL PANEL */}

              <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 lg:border-l lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[9px] font-black tracking-wide text-cyan-300 sm:text-[10px]">
                    HOW AN INDEX WORKS
                  </div>

                  <h3 className="mt-2 text-[20px] font-black leading-8 text-white sm:text-[23px]">
                    A Basket of Companies in One Market Measure
                  </h3>

                  <p className="mt-2 text-[11px] font-medium leading-6 text-slate-300">
                    Each index follows its own methodology and represents
                    a specific group of companies, market or segment.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {[
                      {
                        label: "S&P 500",
                        text: "Broad U.S. large-cap market",
                      },
                      {
                        label: "Nasdaq 100",
                        text: "Growth and technology-heavy",
                      },
                      {
                        label: "Dow Jones",
                        text: "Major U.S. blue-chip companies",
                      },
                      {
                        label: "DAX 40",
                        text: "Major German companies",
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
          POPULAR GLOBAL INDICES
      =================================================== */}

      <section
        id="popular-indices"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Major Global Markets
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              Popular Stock Market Indices to Trade
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Global stock indices differ in their constituents,
              weighting methodology and market exposure. Understanding
              these differences can help traders choose which indices
              best match their market view and trading strategy.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">

            {/* S&P 500 */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-black text-brand-500">
                      US500 / SPX500
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      S&amp;P 500
                    </h3>
                  </div>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black text-blue-700">
                    United States
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  The S&amp;P 500 is one of the world&apos;s most
                  closely followed stock market benchmarks. It tracks
                  large U.S. companies across multiple sectors and is
                  widely used as a measure of the U.S. large-cap equity
                  market.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    Common market drivers
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    Federal Reserve policy • U.S. economic data •
                    Corporate earnings • Market risk sentiment
                  </div>
                </div>
              </div>
            </article>

            {/* NASDAQ 100 */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-r from-violet-500 via-blue-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-black text-brand-500">
                      NAS100 / US100
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      Nasdaq 100
                    </h3>
                  </div>

                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[9px] font-black text-violet-700">
                    United States
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  The Nasdaq 100 includes 100 of the largest
                  non-financial companies listed on Nasdaq. Its strong
                  exposure to technology and growth companies makes it
                  one of the most actively followed indices among
                  online traders.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    Common market drivers
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    Technology stocks • Interest rates • Major earnings
                    • Growth expectations
                  </div>
                </div>
              </div>
            </article>

            {/* DOW JONES */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-r from-sky-500 via-blue-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-black text-brand-500">
                      US30 / DJ30
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      Dow Jones
                    </h3>
                  </div>

                  <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-black text-sky-700">
                    United States
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  The Dow Jones Industrial Average tracks 30 prominent
                  U.S. companies. Unlike many market-cap-weighted
                  indices, the Dow is price weighted, giving it a
                  different structure from the S&amp;P 500 and Nasdaq
                  100.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    Common market drivers
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    Blue-chip earnings • U.S. economy • Employment data
                    • Federal Reserve decisions
                  </div>
                </div>
              </div>
            </article>

            {/* DAX 40 */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-black text-brand-500">
                      GER40 / DE40
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      DAX 40
                    </h3>
                  </div>

                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-black text-amber-700">
                    Germany
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  The DAX 40 is a major benchmark for the German equity
                  market and tracks 40 large companies listed on the
                  Frankfurt Stock Exchange.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    Common market drivers
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    German economy • ECB policy • Euro movements •
                    European industry and trade
                  </div>
                </div>
              </div>
            </article>

            {/* FTSE 100 */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-blue-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-black text-brand-500">
                      UK100 / FTSE
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      FTSE 100
                    </h3>
                  </div>

                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-black text-indigo-700">
                    United Kingdom
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  The FTSE 100 tracks 100 large companies listed on the
                  London Stock Exchange and is one of the most widely
                  followed benchmarks for the UK equity market.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    Common market drivers
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    British pound • Bank of England • Commodities and
                    energy • UK and global economic conditions
                  </div>
                </div>
              </div>
            </article>

            {/* NIKKEI 225 */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-r from-rose-500 via-red-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-black text-brand-500">
                      JP225 / JPN225
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      Nikkei 225
                    </h3>
                  </div>

                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[9px] font-black text-rose-700">
                    Japan
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  The Nikkei 225 is one of Asia&apos;s most widely
                  followed stock indices and tracks 225 companies
                  listed on the Tokyo Stock Exchange.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    Common market drivers
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    Japanese yen • Bank of Japan • Exports • Asian
                    market sentiment
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================
          U.S. INDEX TRADING
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">

            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">

              {/* SYMBOL PANEL */}

              <div className="bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 text-white sm:p-7 lg:p-8">
                <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[9px] font-black text-cyan-200">
                  U.S. INDICES
                </span>

                <h3 className="mt-4 text-[23px] font-black leading-9">
                  Common U.S. Index Symbols Used by Brokers
                </h3>

                <div className="mt-5 space-y-2">
                  {[
                    ["S&P 500", "US500 / SPX500"],
                    ["Nasdaq 100", "NAS100 / US100"],
                    ["Dow Jones", "US30 / DJ30"],
                    ["Russell 2000", "US2000"],
                  ].map(([name, symbol]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5"
                    >
                      <span className="text-[11px] font-bold text-slate-200">
                        {name}
                      </span>

                      <span className="text-[10px] font-black text-cyan-300">
                        {symbol}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[10px] leading-5 text-slate-400">
                  Broker symbols are not standardized. The same
                  underlying index may appear under a different trading
                  symbol depending on the platform and broker.
                </p>
              </div>

              {/* CONTENT */}

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  U.S. Index Trading
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  Trading the S&amp;P 500, Nasdaq 100 and Dow Jones
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  The S&amp;P 500, Nasdaq 100 and Dow Jones are three
                  of the most closely followed U.S. stock indices, but
                  they are built differently and can respond differently
                  to the same market event. Their constituent companies,
                  weighting methodologies and sector exposure all affect
                  how each index behaves.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "S&P 500",
                      subtitle: "Broader U.S. exposure",
                      text: "Tracks large U.S. companies across a broad range of sectors and is widely used as a benchmark for U.S. equities.",
                    },
                    {
                      title: "Nasdaq 100",
                      subtitle: "Growth-heavy exposure",
                      text: "Has significant exposure to technology and growth companies and can be sensitive to interest-rate expectations.",
                    },
                    {
                      title: "Dow Jones",
                      subtitle: "30 blue-chip companies",
                      text: "A price-weighted index of 30 prominent U.S. companies with a different construction from the S&P 500 and Nasdaq 100.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4"
                    >
                      <div className="text-[15px] font-black text-slate-950">
                        {item.title}
                      </div>

                      <div className="mt-1 text-[10px] font-black text-brand-500">
                        {item.subtitle}
                      </div>

                      <p className="mt-2 text-[11px] leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          INDEX CFDs VS INDEX INVESTING
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Understand the Difference
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              Index CFDs vs Investing in an Index
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Searching for a broker to trade the S&amp;P 500 or
              Nasdaq 100 can lead to different types of financial
              products. Index CFDs and investment products that track
              an index are not the same, so it is important to
              understand what the broker actually offers.
            </p>
          </div>

          {/* DESKTOP COMPARISON */}

          <div className="mt-6 hidden overflow-hidden rounded-[20px] border border-slate-200 md:block">
            <table className="w-full text-left">
              <thead className="bg-[#071c34] text-white">
                <tr>
                  <th className="px-5 py-4 text-[12px] font-black">
                    Feature
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    Index CFDs
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    Index-Tracking Investment
                  </th>
                </tr>
              </thead>

              <tbody className="text-[12px]">
                {[
                  [
                    "Primary use",
                    "Trading index price movements",
                    "Investment exposure to an index",
                  ],
                  [
                    "Underlying ownership",
                    "No ownership of constituent shares",
                    "Depends on the investment product",
                  ],
                  [
                    "Leverage",
                    "May be available depending on regulation",
                    "Depends on the product and account",
                  ],
                  [
                    "Going short",
                    "Typically more straightforward with CFDs",
                    "Depends on the product and broker",
                  ],
                  [
                    "Holding costs",
                    "Overnight financing may apply",
                    "Management or trading fees may apply",
                  ],
                  [
                    "Common approach",
                    "Short- or medium-term trading",
                    "Often used for longer-term investing",
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE COMPARISON */}

          <div className="mt-5 grid gap-3 md:hidden">
            {[
              {
                title: "Index CFDs",
                items: [
                  "Trade rising or falling index prices",
                  "No ownership of constituent shares",
                  "Leverage may be available",
                  "Overnight financing may apply",
                ],
              },
              {
                title: "Index-Tracking Investments",
                items: [
                  "Gain investment exposure to an index",
                  "Ownership depends on the product",
                  "Often used for longer-term exposure",
                  "Costs depend on the broker and product",
                ],
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4"
              >
                <h3 className="text-[16px] font-black text-slate-950">
                  {item.title}
                </h3>

                <div className="mt-3 space-y-2">
                  {item.items.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2 text-[11px] font-bold leading-6 text-slate-600"
                    >
                      <span className="mt-1 text-brand-500">
                        ✓
                      </span>

                      <span>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          WHAT MOVES STOCK INDICES
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">

            <div className="border-b border-slate-200 px-5 py-6 sm:px-7 lg:px-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Market Drivers
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                What Moves Stock Market Indices?
              </h2>

              <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                Because an index represents a group of companies, its
                price can react to several economic and market factors
                at the same time. Understanding these drivers can help
                traders interpret index volatility and major market
                moves.
              </p>
            </div>

            <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Interest Rates",
                  text: "Central-bank decisions and expectations for future interest rates can affect equity valuations and overall stock market sentiment.",
                },
                {
                  number: "02",
                  title: "Inflation Data",
                  text: "Inflation reports can change expectations for monetary policy and trigger significant moves across major stock indices.",
                },
                {
                  number: "03",
                  title: "Jobs & Growth Data",
                  text: "Employment, GDP and business-activity data help markets assess the strength and direction of an economy.",
                },
                {
                  number: "04",
                  title: "Corporate Earnings",
                  text: "Large companies with significant index weights can influence an index when they report earnings or issue major guidance.",
                },
                {
                  number: "05",
                  title: "Risk Sentiment",
                  text: "Political events, geopolitical developments and broader market uncertainty can shift investors toward or away from risk assets.",
                },
                {
                  number: "06",
                  title: "Currencies & Commodities",
                  text: "Some indices can be sensitive to currency movements, oil or commodity prices because of the industries represented within them.",
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
          INDEX SPREADS & TRADING COSTS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px] sm:p-7">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Index Trading Costs
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                Index Spreads, Fees and Trading Costs
              </h2>

              <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                Minimum deposit is only one factor when comparing index
                brokers. For active traders, spreads, execution and
                overnight financing can have a greater impact on the
                total cost of trading.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Index Spreads",
                    text: "The difference between the buy and sell price. Spreads can vary by index, market liquidity, trading session and volatility.",
                  },
                  {
                    title: "Trading Commissions",
                    text: "Some broker or account structures may include separate commissions, so always review the complete pricing schedule.",
                  },
                  {
                    title: "Overnight Financing",
                    text: "Leveraged CFD positions held overnight may incur financing or swap charges depending on the broker and instrument.",
                  },
                  {
                    title: "Slippage",
                    text: "During fast markets or major news events, an order may be executed at a different price from the one initially requested.",
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
                FOR ACTIVE INDEX TRADERS
              </div>

              <h3 className="mt-3 text-[22px] font-black leading-9">
                Don&apos;t Compare a Broker on One Index Alone
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-300">
                A broker may offer competitive conditions on the
                S&amp;P 500 but different pricing on the Nasdaq 100,
                Dow Jones or DAX 40. Compare the markets you actually
                plan to trade.
              </p>

              <div className="mt-5 space-y-2">
                {[
                  "S&P 500 / US500",
                  "Nasdaq 100 / NAS100",
                  "Dow Jones / US30",
                  "DAX 40 / GER40",
                  "FTSE 100 / UK100",
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
          INDEX TRADING PLATFORMS
      =================================================== */}

      <section
        id="indices-platforms"
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Index Trading Platforms
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              What Is the Best Platform for Index Trading?
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              There is no single best index trading platform for every
              trader. The right choice depends on the markets you trade,
              the charting and order tools you need, your trading style
              and whether you primarily trade from desktop, web or
              mobile.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                name: "MetaTrader 5",
                short: "MT5",
                text: "A multi-asset platform with technical indicators, charting, multiple order types and support for automated trading tools.",
              },
              {
                name: "MetaTrader 4",
                short: "MT4",
                text: "Still offered by many CFD brokers and widely used for technical analysis, custom indicators and automated strategies.",
              },
              {
                name: "TradingView",
                short: "TV",
                text: "Known for advanced charting and market analysis, with selected brokers supporting direct trading through the platform.",
              },
              {
                name: "cTrader",
                short: "cT",
                text: "A modern trading platform offering charting, order-management and execution tools through a range of supported brokers.",
              },
            ].map((platform) => (
              <article
                key={platform.name}
                className="rounded-[19px] border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.04)]"
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
              What Should You Look for in an Index Trading Platform?
            </h3>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Fast, responsive charts",
                "Stop-loss and take-profit orders",
                "Price alerts",
                "Multiple index watchlists",
                "Reliable mobile trading",
                "Stability during volatile markets",
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
          CHOOSING A BROKER + RISK + METHODOLOGY + FAQ
      =================================================== */}

      {/* ===================================================
          HOW TO CHOOSE AN INDEX BROKER
      =================================================== */}

      <section
        id="how-to-choose"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Choosing a Broker
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              How to Choose the Best Broker for Trading Indices
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              The best index broker for you depends on the markets you
              want to trade, your trading frequency and the features you
              need. Compare the broker&apos;s regulation, available
              indices, spreads, trading hours, platform, margin
              requirements and funding options before opening an
              account.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                number: "01",
                title: "Regulation & Legal Entity",
                text: "Check which legal entity will hold your account and which regulator oversees it. Investor protections, leverage limits and trading conditions can differ between entities.",
              },
              {
                number: "02",
                title: "Range of Indices",
                text: "Look beyond a single market. Check whether the broker offers the U.S., European and Asian indices that match your trading strategy.",
              },
              {
                number: "03",
                title: "Index Spreads",
                text: "Compare spreads on the markets you will actually trade, particularly popular instruments such as US500, NAS100, US30 and GER40.",
              },
              {
                number: "04",
                title: "Trading Hours",
                text: "Index CFD trading hours can differ from the underlying cash market session. Check each broker's contract specifications and available sessions.",
              },
              {
                number: "05",
                title: "Platform & Execution",
                text: "A reliable platform should provide stable execution, useful charting, price alerts and the order types you need to manage positions efficiently.",
              },
              {
                number: "06",
                title: "Deposits & Withdrawals",
                text: "Review minimum deposit requirements, supported funding methods, account currencies and any applicable deposit or withdrawal fees.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="relative overflow-hidden rounded-[19px] border border-slate-200 bg-[#f8fafc] p-5"
              >
                <div className="absolute -right-2 -top-5 text-[76px] font-black leading-none text-slate-200/55">
                  {item.number}
                </div>

                <div className="relative">
                  <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl bg-brand-500 px-2 text-[11px] font-black text-white">
                    {item.number}
                  </span>

                  <h3 className="mt-4 text-[16px] font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[12px] leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          LEVERAGE & MARGIN
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:gap-6">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px] sm:p-7 lg:p-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Margin Trading
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                Leverage and Margin in Index Trading
              </h2>

              <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                <p>
                  When trading index CFDs, brokers may provide leverage
                  that allows traders to control a position larger than
                  the amount of capital posted as margin. This reduces
                  the amount required to open a position, but it also
                  increases exposure to market movements.
                </p>

                <p>
                  Leverage and margin requirements can vary by index,
                  position size, account classification, jurisdiction
                  and broker entity. A broker may therefore offer
                  different leverage on the S&amp;P 500 than on another
                  index or under another regulatory entity.
                </p>

                <p>
                  Higher leverage should not automatically be treated as
                  a better trading condition. Position size, available
                  margin and the amount of capital at risk are more
                  important when assessing whether a trade fits your
                  risk tolerance.
                </p>
              </div>
            </article>

            <aside className="rounded-[22px] border border-amber-200 bg-amber-50 p-5 sm:rounded-[28px] sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-amber-100 text-xl font-black text-amber-700">
                !
              </div>

              <h3 className="mt-4 text-xl font-black text-slate-950">
                More Leverage Does Not Mean a Better Broker
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-700">
                Leverage magnifies exposure. Even a relatively small
                market move can have a larger effect on your account
                when a highly leveraged position is used.
              </p>

              <div className="mt-5 space-y-2.5">
                {[
                  "Choose position size carefully",
                  "Monitor available margin",
                  "Use risk-management orders",
                  "Do not default to maximum leverage",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-amber-200/70 bg-white/70 px-3 py-2.5"
                  >
                    <span className="font-black text-amber-600">
                      ✓
                    </span>

                    <span className="text-[11px] font-bold text-slate-700">
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
          WHICH TYPE OF BROKER?
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              By Trading Style
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              Which Index Trading Broker Is Right for You?
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              A beginner may prioritize simplicity and education, while
              an active index trader may care more about spreads,
              execution and trading tools. Traders holding leveraged
              positions for longer periods may also need to pay closer
              attention to financing costs.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* BEGINNERS */}

            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-[#f8fafc]">
              <div className="border-b border-slate-200 bg-white p-5">
                <span className="text-[10px] font-black text-brand-500">
                  FOR BEGINNERS
                </span>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  Simple and Easy to Understand
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  New traders may benefit from a clear platform, demo
                  account and straightforward information about margin,
                  contract sizes and trading costs.
                </p>
              </div>

              <div className="space-y-3 p-5">
                {[
                  "User-friendly platform",
                  "Demo account",
                  "Reasonable minimum deposit",
                  "Educational resources",
                  "Accessible customer support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[12px] font-bold text-slate-700"
                  >
                    <span className="text-emerald-600">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </article>

            {/* ACTIVE TRADERS */}

            <article className="overflow-hidden rounded-[22px] border border-blue-200 bg-blue-50/30 shadow-[0_12px_32px_rgba(37,99,235,0.07)]">
              <div className="border-b border-blue-100 bg-white p-5">
                <span className="text-[10px] font-black text-brand-500">
                  FOR ACTIVE TRADERS
                </span>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  Focus on Cost and Execution
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  Frequent index trading makes spreads, execution
                  quality, platform stability and order-management tools
                  particularly important.
                </p>
              </div>

              <div className="space-y-3 p-5">
                {[
                  "Competitive index spreads",
                  "Stable execution",
                  "Advanced order types",
                  "Strong charting tools",
                  "Suitable trading hours",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[12px] font-bold text-slate-700"
                  >
                    <span className="text-brand-500">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </article>

            {/* LONGER HOLDING PERIOD */}

            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-[#f8fafc]">
              <div className="border-b border-slate-200 bg-white p-5">
                <span className="text-[10px] font-black text-brand-500">
                  FOR LONGER TRADES
                </span>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  Watch Overnight Financing
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  If leveraged CFD positions remain open for several
                  days, financing charges can become an important part
                  of the total trading cost.
                </p>
              </div>

              <div className="space-y-3 p-5">
                {[
                  "Overnight financing",
                  "Margin requirements",
                  "Trading conditions",
                  "Range of indices",
                  "Risk-management tools",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[12px] font-bold text-slate-700"
                  >
                    <span className="text-emerald-600">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================
          INDICES VS FOREX
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="border-b border-slate-200 px-5 py-6 sm:px-7">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                Market Comparison
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                Index Trading vs Forex Trading
              </h2>

              <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600">
                Both markets are popular with active traders, but stock
                indices and currency pairs represent different
                exposures and respond to different combinations of
                economic and market factors.
              </p>
            </div>

            <div className="grid md:grid-cols-2">
              {/* INDICES */}

              <div className="p-5 sm:p-7 md:border-r md:border-slate-200">
                <div className="text-[10px] font-black text-brand-500">
                  INDICES
                </div>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  Index Trading
                </h3>

                <p className="mt-3 text-[12px] leading-7 text-slate-600">
                  An index reflects a basket of companies and can provide
                  exposure to a broad equity market or market segment.
                  Prices can react to interest rates, economic data,
                  corporate earnings and overall stock market sentiment.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "S&P 500",
                    "Nasdaq 100",
                    "Dow Jones",
                    "DAX 40",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black text-blue-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* FOREX */}

              <div className="p-5 sm:p-7">
                <div className="text-[10px] font-black text-emerald-600">
                  FOREX
                </div>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  Currency Trading
                </h3>

                <p className="mt-3 text-[12px] leading-7 text-slate-600">
                  Forex trading involves the relative value of one
                  currency against another. Currency pairs can be
                  strongly influenced by interest-rate expectations,
                  central-bank policy, inflation and economic data.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "EUR/USD",
                    "GBP/USD",
                    "USD/JPY",
                    "USD/CAD",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          BEGINNER STEPS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Getting Started
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              How to Start Trading Indices for Beginners
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Before trading an index with real money, understand the
              instrument, how the broker prices it and how much capital
              can be lost if the market moves against your position.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                number: "1",
                title: "Choose a Broker",
                text: "Compare regulation, markets, platforms and trading costs.",
              },
              {
                number: "2",
                title: "Learn the Index",
                text: "Understand its constituents, structure and major market drivers.",
              },
              {
                number: "3",
                title: "Use a Demo",
                text: "Learn the platform and order process before risking real capital.",
              },
              {
                number: "4",
                title: "Plan the Trade",
                text: "Define position size, entry, exit and maximum acceptable risk.",
              },
              {
                number: "5",
                title: "Monitor Risk",
                text: "Watch margin, volatility and important economic events.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-[12px] font-black text-white">
                  {item.number}
                </div>

                <h3 className="mt-3 text-[14px] font-black text-slate-950">
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
          RISKS
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="rounded-[22px] border border-red-100 bg-[linear-gradient(110deg,#ffffff_0%,#fffafa_100%)] p-5 sm:rounded-[28px] sm:p-7 lg:p-8">
            <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-black text-red-700">
              Trading Risks
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              What Are the Risks of Trading Stock Indices?
            </h2>

            <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
              Trading leveraged index products can involve substantial
              risk. Major indices can move quickly around economic
              releases, central-bank decisions, geopolitical events and
              earnings from large constituent companies.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Leverage Risk",
                  text: "Leverage magnifies exposure, which can increase both potential gains and potential losses.",
                },
                {
                  title: "Market Volatility",
                  text: "Indices can move rapidly around news, economic releases and changes in investor sentiment.",
                },
                {
                  title: "Price Gaps",
                  text: "Markets can sometimes reopen or move sharply at a price different from the previous traded level.",
                },
                {
                  title: "Financing Costs",
                  text: "Holding leveraged CFD positions overnight can create additional financing costs.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[17px] border border-red-100 bg-white p-4"
                >
                  <h3 className="text-[14px] font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-6 text-slate-600">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          METHODOLOGY
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  Broker Alarab Methodology
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  How We Compare Index Trading Brokers
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  Broker Alarab uses available broker data to identify
                  published brokers that support index trading and to
                  organize the comparison using several factors rather
                  than relying on a single feature. The ranking is
                  designed to help users compare brokers and does not
                  mean that one broker is the best choice for every
                  trader.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Broker Alarab rating",
                    "Availability of index trading",
                    "Regulatory information",
                    "Trading platforms",
                    "Minimum deposit",
                    "Islamic account availability",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-black text-brand-600">
                        ✓
                      </span>

                      <span className="text-[11px] font-bold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 bg-[#071c34] p-5 text-white lg:border-l lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[10px] font-black text-cyan-300">
                    INDEPENDENT COMPARISON
                  </div>

                  <h3 className="mt-3 text-[21px] font-black leading-9">
                    Rankings Should Not Depend on One Factor
                  </h3>

                  <p className="mt-3 text-[12px] leading-7 text-slate-300">
                    A broker suited to an active trader may not be the
                    best fit for a beginner. Review the full broker
                    profile, account terms and legal entity before
                    making a decision.
                  </p>

                  <Link
                    href="/en/how-we-review-brokers"
                    className="mt-5 inline-flex min-h-[43px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] px-4 text-[11px] font-black text-white transition hover:bg-white/[0.12]"
                  >
                    How We Review Brokers
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ===================================================
          RELATED GUIDES / INTERNAL LINKS
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Related Broker Guides
            </span>

            <h2 className="mt-3 text-[25px] font-black text-slate-950 sm:text-3xl">
              Compare More Online Trading Brokers
            </h2>

            <p className="mt-2 max-w-[900px] text-[13px] leading-7 text-slate-600">
              Explore more Broker Alarab comparisons based on markets,
              trading costs and account requirements.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/en/best-brokers/stocks",
                title: "Best Stock Brokers",
                text: "Compare brokers for online stock trading and global equity markets.",
              },
              {
                href: "/en/best-brokers/gold",
                title: "Best Gold Brokers",
                text: "Compare brokers offering gold trading and related account features.",
              },
              {
                href: "/en/lowest-spread-brokers",
                title: "Lowest Spread Brokers",
                text: "Compare brokers with a focus on spreads and trading costs.",
              },
              {
                href: "/en/best-brokers/low-minimum-deposit",
                title: "Low Minimum Deposit Brokers",
                text: "Find brokers with lower minimum account deposit requirements.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[18px] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40"
              >
                <h3 className="text-[14px] font-black text-slate-950 transition group-hover:text-brand-600">
                  {item.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {item.text}
                </p>

                <div className="mt-3 text-[10px] font-black text-brand-500">
                  View guide →
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
        <div className="mx-auto max-w-[1200px] px-3 sm:px-6">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              Frequently Asked Questions
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              Index Trading Broker FAQs
            </h2>

            <p className="mx-auto mt-3 max-w-[800px] text-[13px] leading-7 text-slate-600 sm:text-[15px]">
              Answers to common questions about index brokers,
              S&amp;P 500 trading, Nasdaq 100, index CFDs, spreads,
              platforms and trading accounts.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {[
              {
                q: "What is the best broker for index trading?",
                a: "There is no single best index broker for every trader. Compare the indices available, regulation, spreads, trading hours, platform, margin requirements and account features. The right broker depends on the markets you trade and your individual trading needs.",
              },
              {
                q: "Which brokers offer S&P 500 trading?",
                a: "Many CFD brokers offer instruments that track the S&P 500. Depending on the broker, the trading symbol may appear as US500, SPX500 or another variation. Always check the broker's instrument list and contract specifications.",
              },
              {
                q: "Can I trade the Nasdaq 100 with an online broker?",
                a: "Many online CFD brokers provide access to products that track the Nasdaq 100. Common platform symbols include NAS100 and US100, although the exact symbol, spread, leverage and trading hours vary between brokers.",
              },
              {
                q: "What are the most popular indices to trade?",
                a: "Widely followed indices include the S&P 500, Nasdaq 100, Dow Jones Industrial Average, DAX 40, FTSE 100 and Nikkei 225. Availability depends on the broker and account entity.",
              },
              {
                q: "What is the difference between US500 and the S&P 500?",
                a: "The S&P 500 is the underlying stock market index. US500 is a trading symbol commonly used by some brokers for a product that follows the movement of the S&P 500. Symbols and contract specifications are broker-specific.",
              },
              {
                q: "What is the difference between NAS100 and Nasdaq 100?",
                a: "Nasdaq 100 is the underlying index, while NAS100 or US100 are common broker symbols for products designed to follow its price movement. The exact instrument name varies by trading platform and broker.",
              },
              {
                q: "What is an index CFD?",
                a: "An index CFD is a derivative that allows a trader to speculate on the price movement of a stock market index without owning the individual shares that make up that index. CFDs can involve leverage and carry substantial risk.",
              },
              {
                q: "Can I trade indices with an Islamic account?",
                a: "Some brokers provide Islamic or swap-free account options, but eligibility, fees and the instruments covered vary by broker, jurisdiction and legal entity. Check whether the specific index product qualifies under the broker's Islamic account terms.",
              },
              {
                q: "Can beginners trade stock indices?",
                a: "Beginners can learn how index markets work, but leveraged index products such as CFDs involve significant risk. Understanding contract size, margin, leverage, spreads and risk management is important before trading with real money.",
              },
              {
                q: "Which trading platform is best for indices?",
                a: "There is no single best platform for everyone. Common platforms offered by online brokers include MetaTrader 5, MetaTrader 4, cTrader and TradingView, as well as proprietary broker platforms. Compare charting, order types, stability and mobile functionality.",
              },
              {
                q: "What is a good spread for index trading?",
                a: "There is no universal spread that is best for every index or market condition. Spreads vary by instrument, broker, account type, liquidity, trading session and volatility. Compare pricing on the specific indices you plan to trade.",
              },
              {
                q: "What is the best time to trade U.S. indices?",
                a: "Liquidity and volatility change throughout the trading day, and U.S. indices can become particularly active around the U.S. stock market open and major economic releases. Actual CFD trading hours vary by broker, so check the instrument specifications.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-[17px] border border-slate-200 bg-[#f8fafc]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left sm:px-5">
                  <span className="text-[13px] font-black leading-6 text-slate-900 sm:text-[14px]">
                    {item.q}
                  </span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-slate-500 shadow-sm transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-4 py-4 text-[12px] leading-7 text-slate-600 sm:px-5 sm:text-[13px]">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="bg-[#f4f7fb] px-3 py-8 sm:px-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px]">
          <div className="relative overflow-hidden rounded-[24px] bg-[#071a31] px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.15)] sm:rounded-[30px] sm:px-8 sm:py-9 lg:px-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-28 -top-32 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]" />

              <div className="absolute -bottom-36 left-[20%] h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-[100px]" />
            </div>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[850px] text-left">
                <div className="text-[10px] font-black text-cyan-300">
                  COMPARE BEFORE YOU TRADE
                </div>

                <h2 className="mt-2 text-[25px] font-black leading-[1.4] sm:text-3xl lg:text-[36px]">
                  Find an Index Trading Broker That Fits Your Needs
                </h2>

                <p className="mt-3 max-w-[800px] text-[13px] leading-7 text-slate-300 sm:text-[14px]">
                  Compare brokers, trading platforms, minimum deposits
                  and account features, then review the broker in more
                  detail before deciding where to open an account.
                </p>
              </div>

              <a
                href="#best-indices-brokers"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-xl bg-[#2471df] px-6 text-[12px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:text-sm"
              >
                Compare Index Brokers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          DISCLAIMER
      =================================================== */}

      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-10">
          <div className="rounded-[16px] border border-slate-200 bg-white px-4 py-4">
            <p className="text-[10px] leading-6 text-slate-500 sm:text-[11px]">
              <strong className="text-slate-700">
                Risk Warning:
              </strong>{" "}
              CFDs and other leveraged products involve a high level of
              risk and can result in the loss of capital. The
              information on this page is provided for general
              educational and comparison purposes and does not
              constitute investment advice or a recommendation to open
              an account with any particular broker. Products,
              regulation, leverage and trading conditions vary by
              jurisdiction, legal entity and client classification.
              Always verify current information and official broker
              terms before making a financial decision.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          FAQ STRUCTURED DATA
      =================================================== */}

      <Script
        id="indices-brokers-en-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",

            mainEntity: [
              {
                "@type": "Question",
                name: "What is the best broker for index trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "There is no single best index broker for every trader. Compare available indices, regulation, spreads, trading hours, platforms, margin requirements and account features.",
                },
              },
              {
                "@type": "Question",
                name: "Which brokers offer S&P 500 trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Many CFD brokers offer instruments that track the S&P 500. Depending on the broker, the trading symbol may appear as US500, SPX500 or another variation.",
                },
              },
              {
                "@type": "Question",
                name:
                  "Can I trade the Nasdaq 100 with an online broker?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Many online CFD brokers provide access to products that track the Nasdaq 100. Common platform symbols include NAS100 and US100, although symbols and trading conditions vary by broker.",
                },
              },
              {
                "@type": "Question",
                name:
                  "What are the most popular indices to trade?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Widely followed indices include the S&P 500, Nasdaq 100, Dow Jones Industrial Average, DAX 40, FTSE 100 and Nikkei 225.",
                },
              },
              {
                "@type": "Question",
                name:
                  "What is the difference between US500 and the S&P 500?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "The S&P 500 is the underlying stock market index. US500 is a trading symbol commonly used by some brokers for a product that follows the movement of the S&P 500.",
                },
              },
              {
                "@type": "Question",
                name:
                  "What is the difference between NAS100 and Nasdaq 100?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Nasdaq 100 is the underlying index, while NAS100 or US100 are common broker symbols for products designed to follow its price movement.",
                },
              },
              {
                "@type": "Question",
                name: "What is an index CFD?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "An index CFD is a derivative that allows a trader to speculate on the price movement of a stock market index without owning the individual shares that make up the index.",
                },
              },
              {
                "@type": "Question",
                name:
                  "Can I trade indices with an Islamic account?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Some brokers provide Islamic or swap-free account options, but eligibility, fees and covered instruments vary by broker, jurisdiction and legal entity.",
                },
              },
              {
                "@type": "Question",
                name:
                  "Can beginners trade stock indices?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Beginners can learn how index markets work, but leveraged products such as CFDs involve significant risk. Understanding margin, leverage, spreads and risk management is important before trading with real money.",
                },
              },
              {
                "@type": "Question",
                name:
                  "Which trading platform is best for indices?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "There is no single best platform for everyone. Common platforms offered by online brokers include MetaTrader 5, MetaTrader 4, cTrader and TradingView, as well as proprietary broker platforms.",
                },
              },
              {
                "@type": "Question",
                name:
                  "What is a good spread for index trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "There is no universal spread that is best for every index. Spreads vary by instrument, broker, account type, liquidity, trading session and volatility.",
                },
              },
              {
                "@type": "Question",
                name:
                  "What is the best time to trade U.S. indices?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Liquidity and volatility change throughout the trading day, and U.S. indices can become particularly active around the U.S. stock market open and major economic releases. Actual CFD trading hours vary by broker.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}