import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "أفضل شركات تداول السلع 2026 | الذهب والنفط والمعادن",
  description:
    "قارن أفضل شركات تداول السلع في 2026 لتداول الذهب والنفط والفضة والغاز الطبيعي. تعرف على المنصات والتراخيص والحد الأدنى للإيداع والحسابات الإسلامية.",

  alternates: {
    canonical: "https://brokeralarab.com/best-brokers/commodities",

    languages: {
      ar: "https://brokeralarab.com/best-brokers/commodities",
      en: "https://brokeralarab.com/en/best-brokers/commodities",
      "x-default": "https://brokeralarab.com/best-brokers/commodities",
    },
  },

  openGraph: {
    title: "أفضل شركات تداول السلع والذهب والنفط 2026",

    description:
      "مقارنة شركات تداول السلع عبر الإنترنت لتداول الذهب والنفط والفضة والغاز الطبيعي والمعادن والطاقة.",

    url: "https://brokeralarab.com/best-brokers/commodities",

    type: "website",
    siteName: "Broker Alarab",
    locale: "ar_AR",
  },

  twitter: {
    card: "summary_large_image",

    title: "أفضل شركات تداول السلع 2026",

    description:
      "قارن شركات تداول الذهب والنفط والفضة والغاز الطبيعي والمنصات والحسابات المتاحة.",
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
  arabicSupport: string | boolean | null;

  regulation: string | null;

  accountUrl: string | null;
  websiteUrl: string | null;

  commodityScore: number;
};

/* =========================================================
   BASIC HELPERS
========================================================= */

function getBrokerName(broker: BrokerRow) {
  return (
    broker?.name ||
    broker?.title ||
    broker?.broker_name ||
    broker?.name_ar ||
    broker?.slug ||
    `شركة ${broker?.id}`
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
    broker?.islamic_ar ??
    broker?.islamic_account ??
    broker?.islamic ??
    broker?.islamic_en ??
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
   COMMODITY SUPPORT DETECTION

   IMPORTANT:
   We intentionally include commodity-specific asset terms.
   "indices" or "stocks" alone must NOT qualify a broker.
========================================================= */

function supportsCommodities(broker: BrokerRow) {
  const assets = normalizeText(getTradingAssets(broker));

  return (
    assets.includes("commodities") ||
    assets.includes("commodity") ||
    assets.includes("metals") ||
    assets.includes("precious metals") ||
    assets.includes("energies") ||
    assets.includes("energy") ||
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
    return value ? "متاح" : "غير متاح";
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

   Internal ranking score used only to organize eligible
   published brokers.

   This does not mean one broker is objectively the best
   choice for every commodity trader.
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
          alt={`شعار ${alt}`}
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
    ? `/brokers/${broker.slug}`
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
          التقييم
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
          فتح حساب
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
        dir="rtl"
        className="min-h-screen bg-[#f5f7fb] px-4 py-16"
      >
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7 text-right">
          <h1 className="text-2xl font-black text-slate-950">
            تعذر تحميل بيانات شركات تداول السلع
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {brokersError.message}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     FILTER COMMODITY BROKERS
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
        broker?.intro_ar ||
        broker?.intro ||
        broker?.intro_en ||
        null,

      bestFor:
        broker?.best_for_ar ||
        broker?.best_for ||
        broker?.best_for_en ||
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
        name: "الرئيسية",
        item: "https://brokeralarab.com",
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "أفضل شركات التداول",
        item: "https://brokeralarab.com/best-brokers",
      },

      {
        "@type": "ListItem",
        position: 3,
        name: "أفضل شركات تداول السلع",
        item:
          "https://brokeralarab.com/best-brokers/commodities",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name:
      "أفضل شركات تداول السلع 2026",

    url:
      "https://brokeralarab.com/best-brokers/commodities",

    description:
      "مقارنة شركات تداول السلع والذهب والنفط والفضة والغاز الطبيعي عبر الإنترنت.",

    inLanguage: "ar",

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
      "أفضل شركات تداول السلع 2026",

    numberOfItems:
      featuredBrokers.length,

    itemListElement:
      featuredBrokers.map(
        (broker, index) => ({
          "@type": "ListItem",

          position: index + 1,

          name: broker.name,

          url: broker.slug
            ? `https://brokeralarab.com/brokers/${broker.slug}`
            : "https://brokeralarab.com/best-brokers/commodities",
        })
      ),
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f5f7fb] text-slate-900"
    >
      {/* ===================================================
          STRUCTURED DATA
      =================================================== */}

      <Script
        id="commodity-brokers-ar-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      <Script
        id="commodity-brokers-ar-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageJsonLd
            ),
        }}
      />

      <Script
        id="commodity-brokers-ar-itemlist-jsonld"
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

          <div className="absolute -left-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="absolute -bottom-72 right-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative mx-auto max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">

          {/* BREADCRUMB */}

          <nav
            aria-label="مسار التنقل"
            className="hidden items-center justify-start gap-2 text-[10px] font-bold text-blue-200/75 sm:flex sm:text-xs"
          >
            <Link
              href="/best-brokers"
              className="transition hover:text-white"
            >
              أفضل شركات التداول
            </Link>

            <span className="text-blue-300/40">
              /
            </span>

            <span className="text-white">
              شركات تداول السلع
            </span>
          </nav>

          {/* HERO CONTENT */}

          <div className="mt-0 text-right sm:mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              دليل شركات تداول السلع 2026
            </div>

            <h1 className="mt-3 max-w-[1350px] text-[30px] font-black leading-[1.2] tracking-[-0.025em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
              <span className="block sm:inline">
                أفضل شركات تداول السلع
              </span>{" "}

              <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
                والذهب والنفط 2026
              </span>
            </h1>

            {/* Mobile description */}

            <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
              قارن شركات تداول الذهب والنفط والفضة والغاز الطبيعي
              واختر وسيط تداول السلع الأنسب لك.
            </p>

            {/* Desktop description */}

            <p className="mt-3 hidden max-w-[1220px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
              قارن أفضل شركات تداول السلع عبر الإنترنت من حيث
              المنصات والتقييم والحد الأدنى للإيداع والحسابات
              الإسلامية، وتعرّف على أهم ما يجب فحصه قبل تداول
              الذهب والنفط والفضة والغاز الطبيعي وأسواق السلع
              العالمية.
            </p>

            {/* UPDATE INFO */}

            <div className="mt-2.5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
              <time
                dateTime="2026-10-05"
                className="inline-flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="sm:hidden">
                  تحديث أكتوبر 2026
                </span>

                <span className="hidden sm:inline">
                  آخر تحديث: 5 أكتوبر 2026
                </span>
              </time>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="inline-flex items-center gap-1.5">
                <span className="text-cyan-300">
                  ✓
                </span>

                مقارنة مستقلة
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <span className="text-cyan-300">
                  ✓
                </span>

                بيانات Broker Alarab
              </span>
            </div>

            {/* STATS + BUTTONS */}

            <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-start lg:gap-6">
              <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[620px]">
                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {commodityBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    شركة سلع
                  </div>
                </div>

                <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {islamicCommodityBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    حساب إسلامي
                  </div>
                </div>

                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {platformNames.size}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    منصات رئيسية
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-2.5 sm:w-auto sm:gap-3">
                <a
                  href="#best-commodity-brokers"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
                >
                  <span className="sm:hidden">
                    قارن الشركات
                  </span>

                  <span className="hidden sm:inline">
                    قارن شركات تداول السلع
                  </span>

                  <span aria-hidden="true">
                    ←
                  </span>
                </a>

                <a
                  href="#commodities-guide"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
                >
                  دليل تداول السلع

                  <span aria-hidden="true">
                    ←
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
            aria-label="محتويات الصفحة"
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {[
              {
                href: "#best-commodity-brokers",
                label: "أفضل شركات السلع",
              },
              {
                href: "#commodities-guide",
                label: "دليل تداول السلع",
              },
              {
                href: "#gold-trading",
                label: "تداول الذهب",
              },
              {
                href: "#oil-trading",
                label: "تداول النفط",
              },
              {
                href: "#commodity-platforms",
                label: "منصات التداول",
              },
              {
                href: "#how-to-choose",
                label: "اختيار الوسيط",
              },
              {
                href: "#faq",
                label: "الأسئلة الشائعة",
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
              <div className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#2f80ed] to-[#1353a5]" />

              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 text-right">
                  <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[9px] font-black text-white sm:text-[11px]">
                    مقارنة شركات تداول السلع
                  </span>

                  <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[34px]">
                    أفضل شركات تداول السلع عبر الإنترنت
                  </h2>

                  <p className="mt-2 max-w-[1080px] text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                    قارن شركات الوساطة المنشورة في Broker Alarab
                    والتي توفر الوصول إلى أسواق السلع، بما يشمل
                    الذهب والنفط والمعادن والطاقة بحسب المنتجات
                    المتاحة لدى كل وسيط، مع مقارنة المنصات والحد
                    الأدنى للإيداع والحسابات المتاحة والتقييم.
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-3 rounded-[15px] border border-blue-100 bg-white/95 px-4 py-3 shadow-sm lg:flex">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-brand-50 text-lg font-black text-brand-600">
                    {featuredBrokers.length}
                  </div>

                  <div className="text-right">
                    <div className="text-[12px] font-black text-slate-900">
                      شركات في المقارنة
                    </div>

                    <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                      من {commodityBrokers.length} شركة مؤهلة
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IMPORTANT NOTICE */}

            <div className="border-b border-slate-200 bg-amber-50/60 px-4 py-3 sm:px-7">
              <p className="text-[11px] font-bold leading-6 text-amber-900 sm:text-[13px]">
                <span className="font-black">
                  ملاحظة مهمة:
                </span>{" "}

                تختلف السلع المتاحة والسبريد والرافعة المالية
                وساعات التداول وتكاليف الاحتفاظ بالصفقات حسب
                الوسيط ونوع الحساب والجهة القانونية والدولة.
                كما قد يوفر بعض الوسطاء السلع من خلال عقود
                الفروقات بدل امتلاك الأصل المادي نفسه.
              </p>
            </div>

            {/* ===================================================
                DESKTOP TABLE
            =================================================== */}

            <div className="hidden p-5 lg:block lg:p-6">
              <div className="overflow-hidden rounded-[18px] border border-slate-200 shadow-[0_7px_24px_rgba(15,23,42,0.055)]">
                <table className="w-full table-fixed text-right">
                  <thead className="bg-[linear-gradient(90deg,#071c34_0%,#0b3157_55%,#0d426f_100%)] text-white">
                    <tr className="text-[13px]">
                      <th className="w-[7%] px-3 py-4 text-center font-black">
                        الترتيب
                      </th>

                      <th className="w-[25%] px-5 py-4 font-black">
                        الشركة
                      </th>

                      <th className="w-[18%] px-4 py-4 text-center font-black">
                        المنصات
                      </th>

                      <th className="w-[13%] px-4 py-4 text-center font-black">
                        الحد الأدنى
                      </th>

                      <th className="w-[12%] px-4 py-4 text-center font-black">
                        حساب إسلامي
                      </th>

                      <th className="w-[10%] px-4 py-4 text-center font-black">
                        التقييم
                      </th>

                      <th className="w-[15%] px-4 py-4 text-center font-black">
                        التفاصيل
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
                                      الأعلى تقييمًا
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

                          {/* ISLAMIC */}

                          <td className="px-4 py-[18px] text-center">
                            {hasIslamicAccount(
                              broker.islamicAccount
                            ) ? (
                              <span className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-700">
                                ✓ متاح
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
                      <div className="h-1 bg-gradient-to-l from-amber-400 via-amber-300 to-transparent" />
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
                                  الأعلى تقييمًا
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
                        <div className="border-l border-slate-200 px-1 py-2 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            المنصة
                          </div>

                          <div className="mt-0.5 line-clamp-1 text-[10px] font-black text-slate-900">
                            {displayValue(
                              broker.platforms
                            )}
                          </div>
                        </div>

                        <div className="border-l border-slate-200 px-1 py-2 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            الإيداع
                          </div>

                          <div className="mt-0.5 text-[11px] font-black text-slate-900">
                            {displayValue(
                              broker.minDeposit
                            )}
                          </div>
                        </div>

                        <div className="px-1 py-2 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            إسلامي
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
                              ? "متاح"
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
          COMMODITIES TRADING GUIDE
      =================================================== */}

      {/* ===================================================
          HOW TO CHOOSE A COMMODITY BROKER
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
                  دليل سريع
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  كيف تختار أفضل شركة لتداول السلع؟
                </h2>

                <p className="mt-3 max-w-[1080px] text-[14px] leading-8 text-slate-600 sm:text-[16px]">
                  اختيار وسيط تداول السلع لا يعتمد فقط على التقييم
                  العام للشركة. من المهم معرفة السلع المتاحة فعليًا،
                  ومقارنة تكاليف تداول الذهب والنفط والفضة والطاقة،
                  بالإضافة إلى المنصة والتنفيذ والهامش وتكاليف
                  الاحتفاظ بالصفقات.
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                {[
                  {
                    number: "01",
                    title: "تنوع السلع",
                    text: "تحقق من توفر الذهب والفضة والنفط والغاز الطبيعي، بالإضافة إلى السلع الزراعية إذا كانت مهمة لاستراتيجيتك.",
                  },
                  {
                    number: "02",
                    title: "السبريد والتكاليف",
                    text: "قارن السبريد والعمولات وتكاليف التمويل على السلع التي تخطط لتداولها فعليًا.",
                  },
                  {
                    number: "03",
                    title: "ساعات التداول",
                    text: "تختلف ساعات تداول الذهب والنفط والغاز وبعض السلع الأخرى، وقد تختلف أيضًا بين وسيط وآخر.",
                  },
                  {
                    number: "04",
                    title: "المنصة والتنفيذ",
                    text: "اختر منصة مستقرة توفر الرسوم البيانية وأوامر إدارة المخاطر والتنفيذ المناسب لطريقة تداولك.",
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
                قبل فتح الحساب
              </span>

              <h3 className="mt-4 text-xl font-black leading-8">
                7 نقاط افحصها قبل اختيار وسيط السلع
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "الذهب والفضة والمعادن المتاحة",
                  "خام WTI وخام Brent",
                  "سبريد الذهب والنفط",
                  "الرافعة ومتطلبات الهامش",
                  "رسوم الاحتفاظ بالصفقات",
                  "المنصة وجودة التنفيذ",
                  "الترخيص والجهة القانونية",
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
                  أساسيات سوق السلع
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  ما هو تداول السلع؟
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    السلع هي أصول أساسية يتم تداولها في الأسواق
                    العالمية، وتشمل المعادن مثل{" "}
                    <strong className="text-slate-900">
                      الذهب والفضة
                    </strong>
                    ، ومنتجات الطاقة مثل{" "}
                    <strong className="text-slate-900">
                      النفط والغاز الطبيعي
                    </strong>
                    ، بالإضافة إلى مجموعة من السلع الزراعية مثل
                    القهوة والكاكاو والسكر والقمح.
                  </p>

                  <p>
                    يمكن الحصول على تعرض لأسعار السلع بطرق مختلفة
                    بحسب السوق والوسيط، مثل العقود الآجلة أو
                    الصناديق المتداولة أو عقود الفروقات. وفي بيئة
                    وسطاء الفوركس وCFD، توفر العديد من الشركات
                    إمكانية المضاربة على حركة أسعار بعض السلع من
                    خلال{" "}
                    <strong className="text-slate-900">
                      عقود الفروقات على السلع
                    </strong>
                    .
                  </p>

                  <p>
                    لذلك من المهم قبل فتح أي صفقة معرفة نوع المنتج
                    الذي يوفره الوسيط، وحجم العقد، ومتطلبات الهامش،
                    وساعات التداول، والرسوم التي قد تنطبق على
                    الصفقة.
                  </p>
                </div>
              </div>

              {/* CATEGORY PANEL */}

              <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 lg:border-r lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[9px] font-black tracking-wide text-cyan-300 sm:text-[10px]">
                    أسواق السلع
                  </div>

                  <h3 className="mt-2 text-[20px] font-black leading-8 text-white sm:text-[23px]">
                    أهم فئات السلع المتداولة عالميًا
                  </h3>

                  <div className="mt-5 space-y-2.5">
                    {[
                      {
                        label: "المعادن الثمينة",
                        text: "الذهب • الفضة",
                      },
                      {
                        label: "الطاقة",
                        text: "WTI • Brent • الغاز الطبيعي",
                      },
                      {
                        label: "السلع الزراعية",
                        text: "قهوة • كاكاو • سكر • قمح",
                      },
                      {
                        label: "معادن أخرى",
                        text: "بحسب المنتجات التي يوفرها الوسيط",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5"
                      >
                        <span className="text-[12px] font-black text-cyan-300">
                          {item.label}
                        </span>

                        <span className="text-left text-[10px] font-bold text-slate-300">
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
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              أشهر أسواق السلع
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              أشهر السلع للتداول عبر الإنترنت
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              تختلف طبيعة حركة كل سوق من أسواق السلع. الذهب قد
              يتفاعل بقوة مع الدولار والفائدة، بينما يتأثر النفط
              بعوامل العرض والطلب والإنتاج، ويمكن أن يتأثر الغاز
              الطبيعي بالمخزونات والطقس والطلب الموسمي.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                symbol: "XAU/USD",
                title: "الذهب",
                category: "معادن ثمينة",
                text: "من أكثر المعادن تداولًا ومتابعة، ويتأثر عادةً بالدولار الأمريكي وأسعار الفائدة والتضخم والطلب على الأصول الدفاعية.",
                drivers: "الدولار • الفائدة • التضخم • المخاطر",
              },
              {
                symbol: "XAG/USD",
                title: "الفضة",
                category: "معادن ثمينة",
                text: "تجمع الفضة بين خصائص المعدن الثمين والاستخدام الصناعي، لذلك يمكن أن تتأثر بالعوامل النقدية والنشاط الصناعي معًا.",
                drivers: "الدولار • الصناعة • الفائدة • الطلب",
              },
              {
                symbol: "WTI / BRENT",
                title: "النفط الخام",
                category: "طاقة",
                text: "يعد WTI وBrent من أهم معايير تسعير النفط عالميًا، وتتأثر أسعارهما بالإنتاج والمخزونات والطلب العالمي والأحداث الجيوسياسية.",
                drivers: "الإنتاج • المخزونات • الطلب • الجغرافيا السياسية",
              },
              {
                symbol: "NATURAL GAS",
                title: "الغاز الطبيعي",
                category: "طاقة",
                text: "قد يشهد الغاز الطبيعي تقلبات مرتفعة نتيجة تغيرات الطقس والمخزونات والإنتاج ومستويات الطلب الموسمي على الطاقة.",
                drivers: "الطقس • المخزونات • الإنتاج • الطلب",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
              >
                <div className="h-1 bg-gradient-to-l from-[#2f80ed] via-cyan-400 to-transparent" />

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
                      عوامل مؤثرة شائعة
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
                  تداول الذهب
                </h3>

                <p className="mt-3 text-[12px] leading-7 text-amber-50/80">
                  الذهب من أكثر أسواق السلع متابعة لدى المتداولين،
                  لكن شروط تداوله قد تختلف بشكل واضح بين شركة
                  وأخرى.
                </p>

                <div className="mt-5 space-y-2">
                  {[
                    "سبريد XAU/USD",
                    "حجم العقد",
                    "الهامش والرافعة",
                    "رسوم التبييت",
                    "ساعات التداول",
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
                  أشهر المعادن تداولًا
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  تداول الذهب XAU/USD مع شركات الوساطة
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  يظهر الذهب لدى العديد من منصات التداول بالرمز{" "}
                  <strong className="text-slate-900">
                    XAU/USD
                  </strong>
                  ، ويعبر عادةً عن سعر الذهب مقابل الدولار الأمريكي.
                  ويهتم المتداولون عند مقارنة شركات تداول الذهب
                  بالسبريد وسرعة التنفيذ ومتطلبات الهامش وتكاليف
                  إبقاء الصفقة مفتوحة.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  يمكن أن تتأثر أسعار الذهب بعوامل متعددة، من بينها
                  تحركات الدولار الأمريكي، وتوقعات أسعار الفائدة،
                  والتضخم، وعوائد السندات، بالإضافة إلى تغيرات
                  شهية المخاطرة وعدم اليقين في الأسواق العالمية.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: "الدولار الأمريكي",
                      text: "تحركات الدولار من العوامل التي يراقبها متداولو الذهب عند تحليل السوق.",
                    },
                    {
                      title: "أسعار الفائدة",
                      text: "توقعات السياسة النقدية والفائدة قد تؤثر على اتجاه الذهب وتذبذبه.",
                    },
                    {
                      title: "التضخم",
                      text: "بيانات التضخم يمكن أن تغير توقعات الفائدة وتؤثر في أسواق المعادن.",
                    },
                    {
                      title: "شهية المخاطرة",
                      text: "الأحداث العالمية وعدم اليقين قد يغيران الطلب على الذهب في الأسواق.",
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
                  href="/best-brokers/gold"
                  className="mt-5 inline-flex min-h-[43px] items-center justify-center rounded-xl bg-[#071c34] px-5 text-[11px] font-black text-white transition hover:bg-[#0b3157]"
                >
                  شاهد أفضل شركات تداول الذهب
                  <span className="mr-2">
                    ←
                  </span>
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
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              تداول الطاقة
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              تداول النفط WTI وBrent عبر الإنترنت
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              النفط من أهم أسواق السلع والطاقة عالميًا. ويظهر خام
              غرب تكساس الوسيط وخام برنت بأسماء ورموز مختلفة حسب
              شركة الوساطة، لذلك يجب التحقق من مواصفات العقد
              والأسعار وساعات التداول لدى الوسيط نفسه.
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
                      خام غرب تكساس WTI
                    </h3>
                  </div>

                  <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-[9px] font-black text-blue-700">
                    النفط الأمريكي
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[12px] leading-7 text-slate-600">
                  WTI هو أحد أهم معايير تسعير النفط الخام. ويمكن أن
                  تتأثر تحركاته ببيانات المخزونات الأمريكية،
                  ومستويات الإنتاج، والطلب على الطاقة، والقرارات
                  المتعلقة بإمدادات النفط عالميًا.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    "مخزونات النفط",
                    "الإنتاج",
                    "الطلب الأمريكي",
                    "أسواق الطاقة",
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
                      خام برنت Brent
                    </h3>
                  </div>

                  <span className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[9px] font-black text-emerald-700">
                    معيار عالمي
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[12px] leading-7 text-slate-600">
                  خام برنت معيار رئيسي لأسعار النفط العالمية،
                  ويتأثر بعوامل العرض والطلب العالمي، وسياسات
                  الإنتاج، والتطورات الجيوسياسية، ومستويات النشاط
                  الاقتصادي العالمي.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    "العرض العالمي",
                    "الطلب العالمي",
                    "سياسات الإنتاج",
                    "الأحداث الجيوسياسية",
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

          {/* OIL NOTE */}

          <div className="mt-4 rounded-[18px] border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
            <h3 className="text-[14px] font-black text-slate-950">
              هل WTI وBrent هما نفس النفط؟
            </h3>

            <p className="mt-2 text-[12px] leading-7 text-slate-600">
              لا. كلاهما معيار مهم لتسعير النفط الخام، لكنهما
              يمثلان خامات ومناطق تسعير مختلفة، ولذلك يمكن أن
              تختلف الأسعار والفروقات بينهما. كما تختلف رموز
              التداول المستخدمة لدى شركات الوساطة.
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
                تداول الفضة XAG/USD
              </h2>

              <p className="mt-3 text-[13px] leading-7 text-slate-600">
                الفضة من المعادن الثمينة المهمة في الأسواق، لكنها
                تتميز أيضًا باستخدامات صناعية متعددة. لهذا يمكن أن
                تتأثر أسعارها بالعوامل التي تحرك المعادن الثمينة
                وبالتغيرات في الطلب الصناعي في الوقت نفسه.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  "الدولار الأمريكي",
                  "أسعار الفائدة",
                  "الطلب الصناعي",
                  "أسواق المعادن",
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
                تداول الغاز الطبيعي
              </h2>

              <p className="mt-3 text-[13px] leading-7 text-slate-600">
                الغاز الطبيعي من أسواق الطاقة التي يمكن أن تشهد
                تقلبات قوية. وتؤثر فيه مستويات المخزون والإنتاج
                والطقس والطلب على التدفئة والتبريد، بالإضافة إلى
                التطورات في أسواق الطاقة.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  "الطقس",
                  "المخزونات",
                  "الإنتاج",
                  "الطلب الموسمي",
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
                  عقود الفروقات
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  ما هي عقود الفروقات على السلع؟
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  عقد الفروقات CFD هو منتج مشتق يتيح المضاربة على
                  حركة سعر أصل مالي دون امتلاك الأصل الأساسي
                  نفسه. فعند تداول عقد فروقات على الذهب مثلًا، لا
                  يعني ذلك أنك اشتريت سبائك ذهب فعلية.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  قد تسمح عقود الفروقات باستخدام الرافعة المالية
                  وفتح صفقات شراء أو بيع، لكن الرافعة تضخم التعرض
                  للسوق وبالتالي يمكن أن تزيد الخسائر كما تزيد
                  التأثير المحتمل لتحركات الأسعار.
                </p>
              </div>

              <div className="border-t border-slate-200 bg-[#071c34] p-5 text-white lg:border-r lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[10px] font-black text-cyan-300">
                    انتبه إلى نوع المنتج
                  </div>

                  <h3 className="mt-3 text-[21px] font-black leading-9">
                    تداول سعر السلعة لا يعني امتلاك السلعة
                  </h3>

                  <p className="mt-3 text-[12px] leading-7 text-slate-300">
                    تحقق دائمًا من مواصفات الأداة المالية لدى
                    الوسيط لمعرفة ما إذا كنت تتداول CFD أو منتجًا
                    آخر مرتبطًا بالسلعة.
                  </p>

                  <div className="mt-5 space-y-2">
                    {[
                      "نوع العقد",
                      "حجم العقد",
                      "متطلبات الهامش",
                      "رسوم التمويل",
                      "ساعات التداول",
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
                تحليل سوق السلع
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                ما الذي يحرك أسعار السلع؟
              </h2>

              <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                لا تتحرك جميع السلع للأسباب نفسها. المعادن والطاقة
                والسلع الزراعية لكل منها عوامل مختلفة، لكن هناك
                مجموعة من المؤثرات التي يراقبها المتداولون بشكل
                مستمر.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "العرض والطلب",
                  text: "التغير في الإنتاج أو الاستهلاك يمكن أن يؤثر مباشرة في توازن السوق وأسعار العديد من السلع.",
                },
                {
                  number: "02",
                  title: "الدولار الأمريكي",
                  text: "تسعّر العديد من السلع عالميًا بالدولار، لذلك تعد تحركات العملة الأمريكية عاملًا مهمًا في أسواق السلع.",
                },
                {
                  number: "03",
                  title: "أسعار الفائدة",
                  text: "توقعات السياسة النقدية والفائدة يمكن أن تؤثر في الدولار والمعادن وشهية المستثمرين للمخاطرة.",
                },
                {
                  number: "04",
                  title: "المخزونات والإنتاج",
                  text: "بيانات المخزون والإنتاج مهمة خصوصًا في أسواق النفط والغاز وغيرها من منتجات الطاقة.",
                },
                {
                  number: "05",
                  title: "الأحداث الجيوسياسية",
                  text: "التوترات أو الاضطرابات في مناطق الإنتاج والنقل قد تؤثر في توقعات الإمدادات وأسعار الطاقة.",
                },
                {
                  number: "06",
                  title: "الطقس والمواسم",
                  text: "الطقس والظروف الموسمية يمكن أن يكون لهما تأثير واضح على الغاز الطبيعي وبعض السلع الزراعية.",
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
                      ? "xl:border-l xl:border-slate-200"
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
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              مقارنة الأسواق
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              ما الفرق بين تداول السلع والفوركس والمؤشرات؟
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              قد يوفر الوسيط نفسه السلع والعملات والمؤشرات، لكن
              الأصل الذي يتم تداوله والعوامل المؤثرة في السعر
              تختلف بين هذه الأسواق.
            </p>
          </div>

          {/* DESKTOP */}

          <div className="mt-6 hidden overflow-hidden rounded-[20px] border border-slate-200 md:block">
            <table className="w-full text-right">
              <thead className="bg-[#071c34] text-white">
                <tr>
                  <th className="px-5 py-4 text-[12px] font-black">
                    السوق
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    ماذا تتداول؟
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    أمثلة
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    عوامل مهمة
                  </th>
                </tr>
              </thead>

              <tbody className="text-[12px]">
                {[
                  [
                    "السلع",
                    "المعادن والطاقة والسلع الأساسية",
                    "الذهب، النفط، الفضة، الغاز",
                    "العرض والطلب، الدولار، الإنتاج",
                  ],
                  [
                    "الفوركس",
                    "قيمة عملة مقابل عملة أخرى",
                    "EUR/USD، GBP/USD، USD/JPY",
                    "الفائدة، البنوك المركزية، الاقتصاد",
                  ],
                  [
                    "المؤشرات",
                    "أداء مجموعة من أسهم الشركات",
                    "S&P 500، Nasdaq 100، DAX 40",
                    "الأرباح، الاقتصاد، الفائدة، شهية المخاطرة",
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
                title: "السلع",
                examples: "الذهب • النفط • الفضة • الغاز",
                text: "تركز على المعادن والطاقة والمواد الأساسية، وتتأثر بقوة بالعرض والطلب والإنتاج والدولار.",
              },
              {
                title: "الفوركس",
                examples: "EUR/USD • GBP/USD • USD/JPY",
                text: "يعتمد على العلاقة بين عملتين ويتأثر بالفائدة والسياسة النقدية والبيانات الاقتصادية.",
              },
              {
                title: "المؤشرات",
                examples: "S&P 500 • Nasdaq 100 • DAX 40",
                text: "تعكس أداء مجموعات من الأسهم وتتأثر بالاقتصاد والأرباح والفائدة وشهية المستثمرين للمخاطرة.",
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
          SPREADS & COSTS
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px] sm:p-7">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                تكاليف تداول السلع
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                سبريد الذهب والنفط ورسوم تداول السلع
              </h2>

              <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                عند مقارنة شركات تداول السلع، لا يكفي النظر إلى
                الحد الأدنى للإيداع. تكلفة الصفقة نفسها قد تكون
                أكثر أهمية، خصوصًا للمتداول النشط.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "السبريد",
                    text: "الفرق بين سعر الشراء والبيع، وقد يتغير حسب السلعة والسيولة ووقت التداول وتقلب السوق.",
                  },
                  {
                    title: "العمولات",
                    text: "قد تفرض بعض أنواع الحسابات أو الأدوات عمولة منفصلة، لذلك يجب مراجعة هيكل التسعير كاملًا.",
                  },
                  {
                    title: "رسوم التبييت",
                    text: "قد تترتب رسوم تمويل على صفقات CFD ذات الرافعة المالية التي تبقى مفتوحة لليوم التالي.",
                  },
                  {
                    title: "الانزلاق السعري",
                    text: "خلال التقلبات القوية قد يتم تنفيذ الأمر بسعر مختلف عن السعر الذي ظهر عند إرسال الأمر.",
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
                لا تقارن الذهب فقط
              </div>

              <h3 className="mt-3 text-[22px] font-black leading-9">
                قارن تكلفة كل سلعة تخطط لتداولها
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-300">
                قد تكون شروط شركة معينة جيدة على الذهب ولكن مختلفة
                على النفط أو الفضة أو الغاز الطبيعي. لذلك قارن
                الأدوات التي ستستخدمها فعليًا.
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
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              منصات تداول السلع
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              ما هي أفضل منصة لتداول السلع؟
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              لا توجد منصة واحدة هي الأفضل لجميع المتداولين.
              المنصة المناسبة تعتمد على السلع التي تتداولها،
              وأدوات التحليل التي تحتاجها، ونوع الأوامر وطريقة
              التداول من الكمبيوتر أو الهاتف.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                name: "MetaTrader 5",
                short: "MT5",
                text: "منصة متعددة الأصول توفر الرسوم البيانية والمؤشرات الفنية وأنواعًا متعددة من الأوامر وأدوات للتداول الآلي.",
              },
              {
                name: "MetaTrader 4",
                short: "MT4",
                text: "منصة منتشرة لدى العديد من وسطاء CFD وتوفر أدوات التحليل الفني والمؤشرات والإكسبرتات.",
              },
              {
                name: "TradingView",
                short: "TV",
                text: "معروفة بأدوات الرسوم البيانية والتحليل، مع إمكانية التداول المباشر من خلال بعض شركات الوساطة المدعومة.",
              },
              {
                name: "cTrader",
                short: "cT",
                text: "منصة حديثة توفر أدوات للرسم البياني وإدارة الأوامر والتنفيذ لدى الوسطاء الذين يدعمونها.",
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
              ماذا تبحث عنه في منصة تداول السلع؟
            </h3>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "رسوم بيانية سريعة",
                "أوامر وقف الخسارة",
                "تنبيهات الأسعار",
                "قائمة مراقبة للسلع",
                "تطبيق تداول جيد",
                "استقرار أثناء التقلب",
                "أدوات تحليل فني",
                "إدارة سهلة لحجم الصفقة",
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
          HOW TO CHOOSE + RISK + FAQ + FINAL CTA
      =================================================== */}

      {/* ===================================================
          HOW TO CHOOSE
      =================================================== */}

      <section
        id="how-to-choose"
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f5f9ff_65%,#eaf4ff_100%)] px-5 py-6 sm:px-7 lg:px-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                اختيار وسيط السلع
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                كيف تختار أفضل وسيط لتداول السلع؟
              </h2>

              <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                أفضل شركة لتداول السلع ليست بالضرورة الشركة ذات
                أعلى رافعة مالية أو أقل إيداع. الاختيار الأفضل
                يعتمد على نوع السلع التي تريد تداولها، وتكلفة
                التداول، والجهة المنظمة، والمنصة، وطريقة تنفيذ
                الأوامر، ومدى ملاءمة الحساب لاستراتيجيتك.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "الترخيص والجهة القانونية",
                  text: "تحقق من الجهة القانونية التي ستفتح حسابك معها ومن الترخيص الذي تعمل بموجبه، لأن الحماية وشروط التداول قد تختلف بين الكيانات التابعة للوسيط نفسه.",
                },
                {
                  number: "02",
                  title: "عدد السلع المتاحة",
                  text: "إذا كنت تريد أكثر من الذهب، تحقق من توفر النفط والفضة والغاز الطبيعي والسلع الأخرى التي تدخل ضمن استراتيجيتك.",
                },
                {
                  number: "03",
                  title: "السبريد والتكلفة",
                  text: "قارن السبريد والعمولات ورسوم التمويل على الأدوات التي ستتداولها فعليًا مثل XAU/USD وWTI وBrent وXAG/USD.",
                },
                {
                  number: "04",
                  title: "المنصة والتنفيذ",
                  text: "ابحث عن منصة مستقرة وسهلة الاستخدام توفر الرسوم البيانية وأنواع الأوامر وأدوات إدارة المخاطر التي تحتاجها.",
                },
                {
                  number: "05",
                  title: "الهامش والرافعة",
                  text: "افهم مقدار الهامش المطلوب لكل أداة، ولا تختَر الوسيط بناءً على الرافعة المرتفعة وحدها لأنها تزيد التعرض للمخاطر.",
                },
                {
                  number: "06",
                  title: "الإيداع والسحب",
                  text: "راجع طرق الإيداع والسحب والحدود والرسوم وأوقات المعالجة المتوقعة قبل تمويل الحساب.",
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
                      ? "xl:border-l xl:border-slate-200"
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
                إدارة رأس المال
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                الرافعة المالية والهامش في تداول السلع
              </h2>

              <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                تسمح الرافعة المالية للمتداول بالحصول على تعرض
                للسوق بقيمة أكبر من الهامش المستخدم لفتح الصفقة.
                لكن ذلك لا يجعل الصفقة أقل مخاطرة، بل يمكن أن يجعل
                تأثير تحركات الأسعار على رأس المال أكبر.
              </p>

              <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                قد تختلف متطلبات الهامش والرافعة المتاحة بين الذهب
                والنفط والفضة والغاز الطبيعي، كما يمكن أن تختلف
                حسب الدولة والجهة المنظمة ونوع الحساب وحالة السوق.
              </p>

              <div className="mt-5 rounded-[17px] border border-blue-100 bg-blue-50/60 p-4">
                <h3 className="text-[13px] font-black text-slate-950">
                  مثال مبسط
                </h3>

                <p className="mt-2 text-[12px] leading-7 text-slate-600">
                  كلما زادت قيمة الصفقة مقارنة برأس المال المستخدم،
                  أصبحت تحركات السوق الصغيرة أكثر تأثيرًا على
                  الحساب. لذلك يجب النظر إلى حجم الصفقة والهامش
                  وإيقاف الخسارة معًا، وليس إلى الرافعة القصوى فقط.
                </p>
              </div>
            </article>

            <aside className="rounded-[22px] border border-red-200 bg-red-50/70 p-5 sm:rounded-[28px] sm:p-7">
              <div className="inline-flex rounded-full bg-red-100 px-3 py-1 text-[9px] font-black text-red-700">
                تنبيه مخاطر
              </div>

              <h3 className="mt-4 text-[21px] font-black leading-9 text-slate-950">
                الرافعة المرتفعة ليست ميزة دائمًا
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-600">
                الرافعة يمكن أن تضخم الأرباح والخسائر على حد سواء.
                وفي أسواق سريعة الحركة مثل الذهب والنفط والغاز،
                يمكن أن تؤدي التقلبات إلى تغير قيمة الصفقة بسرعة.
              </p>

              <div className="mt-5 space-y-2.5">
                {[
                  "حدد حجم الصفقة مسبقًا",
                  "استخدم إدارة مخاطر مناسبة",
                  "راقب مستوى الهامش",
                  "لا تعتمد على الرافعة القصوى",
                  "انتبه للأخبار والتقلبات",
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
          WHICH BROKER FITS YOU
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              حسب أسلوب التداول
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              ما هي شركة تداول السلع المناسبة لك؟
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              لا يحتاج جميع متداولي السلع إلى المواصفات نفسها.
              حدد أولًا طريقة تداولك ثم قارن الشركات على أساس
              العوامل الأكثر أهمية بالنسبة لك.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                tag: "للمبتدئين",
                title: "وسيط سلع للمبتدئ",
                text: "قد يكون من الأنسب التركيز على سهولة المنصة، الحساب التجريبي، المحتوى التعليمي، وضوح تكاليف التداول وإمكانية البدء بحجم حساب مناسب.",
                items: [
                  "منصة سهلة",
                  "حساب تجريبي",
                  "مواد تعليمية",
                  "شروط واضحة",
                ],
              },
              {
                tag: "للمتداول النشط",
                title: "وسيط للذهب والنفط النشط",
                text: "المتداول الذي يفتح صفقات بشكل متكرر قد يعطي أهمية أكبر للسبريد والتنفيذ واستقرار المنصة أثناء تحركات السوق السريعة.",
                items: [
                  "سبريد تنافسي",
                  "تنفيذ جيد",
                  "منصة مستقرة",
                  "أدوات متقدمة",
                ],
              },
              {
                tag: "للتنويع",
                title: "وسيط متعدد السلع",
                text: "إذا كنت تريد التداول في المعادن والطاقة وربما السلع الزراعية، فقد تكون أولوية الاختيار هي تنوع الأدوات بدل التركيز على الذهب وحده.",
                items: [
                  "ذهب وفضة",
                  "WTI وBrent",
                  "غاز طبيعي",
                  "سلع إضافية",
                ],
              },
            ].map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[21px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)]"
              >
                <div className="h-1 bg-gradient-to-l from-brand-500 via-cyan-400 to-transparent" />

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
          ISLAMIC COMMODITY TRADING
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-emerald-200/70 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <article className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
                  الحسابات الإسلامية
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  هل يوجد حساب إسلامي لتداول السلع؟
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  توفر بعض شركات الوساطة حسابات يطلق عليها
                  حسابات إسلامية أو Swap-Free، وقد تشمل بعض أدوات
                  السلع مثل الذهب أو النفط وفق شروط كل وسيط.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  لكن كلمة &quot;إسلامي&quot; لا تعني أن الشروط
                  متطابقة بين جميع الشركات. قد توجد قيود على بعض
                  الأدوات أو مدة الاحتفاظ بالصفقة أو رسوم بديلة،
                  ولذلك يجب قراءة شروط الحساب لدى الوسيط قبل
                  التداول.
                </p>

                <div className="mt-5 rounded-[16px] border border-emerald-100 bg-emerald-50/50 p-4">
                  <p className="text-[11px] font-bold leading-6 text-emerald-900">
                    Broker Alarab يعرض توفر الحساب الإسلامي عندما
                    تكون هذه المعلومة موجودة في بيانات الشركة،
                    لكن يجب التأكد من الشروط الحالية مباشرةً لدى
                    الوسيط قبل فتح الحساب أو تنفيذ الصفقة.
                  </p>
                </div>
              </article>

              <aside className="border-t border-emerald-200 bg-[linear-gradient(145deg,#07372d_0%,#0b5b48_100%)] p-5 text-white lg:border-r lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[10px] font-black text-emerald-300">
                    SWAP-FREE
                  </div>

                  <h3 className="mt-3 text-[21px] font-black leading-9">
                    تحقق من الشروط وليس الاسم فقط
                  </h3>

                  <div className="mt-5 space-y-2.5">
                    {[
                      "هل الذهب مشمول؟",
                      "هل النفط مشمول؟",
                      "هل توجد مدة قصوى؟",
                      "هل توجد رسوم إدارية؟",
                      "هل الشروط تختلف حسب الدولة؟",
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
          <div className="text-right">
            <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-black text-red-700">
              المخاطر
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              ما هي مخاطر تداول السلع؟
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              يمكن أن تتحرك أسواق السلع بسرعة نتيجة الأخبار
              الاقتصادية أو تغيرات العرض والطلب أو الأحداث
              الجيوسياسية. ويزداد تأثير هذه التحركات عند استخدام
              الرافعة المالية.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "تقلب الأسعار",
                text: "الذهب والنفط والغاز وبعض السلع الأخرى قد تشهد تحركات قوية خلال فترات قصيرة.",
              },
              {
                title: "مخاطر الرافعة",
                text: "استخدام الرافعة يزيد حجم التعرض للسوق ويمكن أن يؤدي إلى خسائر أكبر مقارنة برأس المال المستخدم كهامش.",
              },
              {
                title: "الفجوات والانزلاق",
                text: "الأخبار أو تغير السيولة قد تؤدي إلى تنفيذ الأوامر بسعر مختلف عن السعر المتوقع.",
              },
              {
                title: "تكلفة الاحتفاظ",
                text: "الاحتفاظ ببعض صفقات CFD لفترة طويلة قد يضيف تكاليف تمويل تؤثر على النتيجة النهائية.",
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
                  منهجية Broker Alarab
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.4] sm:text-3xl lg:text-[35px]">
                  كيف نقارن شركات تداول السلع؟
                </h2>

                <p className="mt-4 text-[13px] leading-8 text-slate-300 sm:text-[14px]">
                  لا نعتمد على عامل واحد عند تنظيم شركات الوساطة
                  في هذه الصفحة. نستخدم بيانات الشركات المتاحة
                  لدينا وننظر إلى مجموعة من العناصر التي تساعد
                  المستخدم على المقارنة.
                </p>

                <Link
                  href="/how-we-review"
                  className="mt-5 inline-flex min-h-[43px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] px-5 text-[11px] font-black text-white transition hover:bg-white/[0.12]"
                >
                  تعرف على منهجية التقييم
                  <span className="mr-2">←</span>
                </Link>
              </div>

              <div className="border-t border-white/10 bg-white/[0.04] p-5 lg:border-r lg:border-t-0 lg:p-8">
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {[
                    "تقييم الشركة على Broker Alarab",
                    "توفر تداول السلع",
                    "التراخيص والجهات التنظيمية",
                    "منصات التداول",
                    "الحد الأدنى للإيداع",
                    "توفر الحساب الإسلامي",
                    "معلومات الحسابات",
                    "بيانات الوسيط المنشورة",
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
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              أدلة مرتبطة
            </span>

            <h2 className="mt-3 text-[24px] font-black text-slate-950 sm:text-[30px]">
              قارن المزيد من شركات التداول
            </h2>

            <p className="mt-2 max-w-[900px] text-[13px] leading-7 text-slate-600">
              إذا كنت تبحث عن سوق أو نوع حساب محدد، يمكنك متابعة
              المقارنة من خلال أدلة Broker Alarab الأخرى.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/best-brokers/gold",
                eyebrow: "GOLD",
                title: "أفضل شركات تداول الذهب",
                text: "مقارنة مخصصة لشركات تداول الذهب وXAU/USD.",
              },
              {
                href: "/best-brokers/indices",
                eyebrow: "INDICES",
                title: "أفضل شركات تداول المؤشرات",
                text: "قارن وسطاء S&P 500 وNasdaq وDow Jones والمؤشرات العالمية.",
              },
              {
                href: "/lowest-spread-brokers",
                eyebrow: "SPREADS",
                title: "شركات التداول بأقل سبريد",
                text: "تعرف على الشركات والحسابات التي تركز على تكاليف التداول.",
              },
              {
                href: "/best-brokers/low-minimum-deposit",
                eyebrow: "DEPOSIT",
                title: "شركات بأقل إيداع",
                text: "قارن الوسطاء حسب متطلبات الحد الأدنى لفتح وتمويل الحساب.",
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
                  اقرأ الدليل ←
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
              الأسئلة الشائعة
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              أسئلة شائعة عن أفضل شركات تداول السلع
            </h2>

            <p className="mx-auto mt-3 max-w-[800px] text-[13px] leading-7 text-slate-600 sm:text-[15px]">
              إجابات مختصرة على أبرز الأسئلة المتعلقة بتداول
              الذهب والنفط والفضة والغاز الطبيعي واختيار وسيط
              تداول السلع.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            {[
              {
                question: "ما هي أفضل شركة لتداول السلع؟",
                answer:
                  "لا توجد شركة واحدة مناسبة لجميع المتداولين. يعتمد الاختيار على السلع التي تريد تداولها، والتراخيص، والسبريد، ورسوم التمويل، والمنصة، ومتطلبات الهامش ونوع الحساب. يمكنك استخدام المقارنة في هذه الصفحة لتضييق الخيارات ثم مراجعة شروط كل وسيط.",
              },
              {
                question: "ما هي أفضل شركة لتداول الذهب؟",
                answer:
                  "عند اختيار شركة لتداول الذهب، من المهم مقارنة سبريد XAU/USD، والتنفيذ، ومتطلبات الهامش، ورسوم التبييت، والمنصة والتراخيص. ويمكنك مراجعة دليل Broker Alarab المخصص لأفضل شركات تداول الذهب للحصول على مقارنة أكثر تركيزًا على هذا السوق.",
              },
              {
                question: "ما هي أشهر السلع للتداول؟",
                answer:
                  "من أشهر أسواق السلع لدى المتداولين الذهب والفضة والنفط الخام بنوعيه WTI وBrent والغاز الطبيعي. وقد توفر بعض شركات الوساطة أيضًا سلعًا زراعية مثل القهوة والكاكاو والسكر والقمح.",
              },
              {
                question: "ما الفرق بين WTI وBrent؟",
                answer:
                  "WTI وBrent معياران مختلفان لتسعير النفط الخام. يرتبط WTI بشكل وثيق بالسوق الأمريكية، بينما يستخدم Brent كمعيار رئيسي في التسعير العالمي. لذلك لا تكون أسعارهما متطابقة دائمًا وقد تختلف رموز التداول حسب الوسيط.",
              },
              {
                question: "ما هو رمز تداول الذهب؟",
                answer:
                  "يظهر الذهب عادةً لدى العديد من منصات التداول بالرمز XAU/USD عندما يكون مسعرًا مقابل الدولار الأمريكي. وقد تختلف أسماء الأدوات أو مواصفات العقود من وسيط إلى آخر.",
              },
              {
                question: "ما هو رمز تداول الفضة؟",
                answer:
                  "يظهر تداول الفضة مقابل الدولار الأمريكي عادةً بالرمز XAG/USD لدى العديد من شركات الوساطة، لكن يجب التأكد من الرمز ومواصفات العقد على منصة الوسيط.",
              },
              {
                question: "هل يمكن تداول النفط عبر الإنترنت؟",
                answer:
                  "نعم، توفر العديد من شركات الوساطة إمكانية الحصول على تعرض لحركة أسعار النفط مثل WTI وBrent من خلال منتجات مالية مثل عقود الفروقات. يجب التحقق من نوع الأداة ومواصفات العقد والرسوم قبل التداول.",
              },
              {
                question: "هل يمكن تداول السلع بحساب إسلامي؟",
                answer:
                  "توفر بعض شركات الوساطة حسابات إسلامية أو Swap-Free قد تشمل أدوات من أسواق السلع. تختلف الشروط والأدوات المشمولة والرسوم المحتملة بين الوسطاء، لذلك يجب مراجعة شروط الحساب مباشرةً لدى الشركة.",
              },
              {
                question: "ما هي أفضل منصة لتداول الذهب والنفط؟",
                answer:
                  "يعتمد ذلك على احتياجات المتداول. من المنصات المستخدمة لدى شركات الوساطة MetaTrader 5 وMetaTrader 4 وcTrader، كما يدعم بعض الوسطاء التكامل مع TradingView. الأهم هو توفر السلعة المطلوبة وأدوات التحليل والتنفيذ وإدارة الأوامر.",
              },
              {
                question: "هل تداول السلع مناسب للمبتدئين؟",
                answer:
                  "يمكن للمبتدئ تعلم أسواق السلع، لكن هذه الأسواق قد تشهد تقلبات قوية ويزداد الخطر عند استخدام الرافعة المالية. من الأفضل فهم حجم العقد والهامش وإدارة المخاطر وتجربة المنصة والحساب التجريبي قبل المخاطرة بأموال حقيقية.",
              },
              {
                question: "ما الذي يحرك سعر الذهب؟",
                answer:
                  "يتأثر الذهب بعدة عوامل تشمل تحركات الدولار الأمريكي، وتوقعات أسعار الفائدة، والتضخم، وعوائد السندات، وشهية المستثمرين للمخاطرة والتطورات الاقتصادية والجيوسياسية.",
              },
              {
                question: "ما الذي يحرك أسعار النفط؟",
                answer:
                  "تتأثر أسعار النفط بمستويات العرض والطلب العالمي، والإنتاج، والمخزونات، والنشاط الاقتصادي، وسياسات كبار المنتجين، بالإضافة إلى الأحداث الجيوسياسية التي قد تؤثر في الإمدادات.",
              },
              {
                question: "هل تداول السلع هو نفسه تداول الفوركس؟",
                answer:
                  "لا. الفوركس يركز على تداول عملة مقابل أخرى مثل EUR/USD، بينما تشمل السلع أسواقًا مثل الذهب والنفط والفضة والغاز الطبيعي. قد يوفر الوسيط نفسه السوقين، لكن العوامل التي تحرك الأسعار تختلف.",
              },
              {
                question: "هل تداول السلع هو نفسه تداول المؤشرات؟",
                answer:
                  "لا. السلع تشمل المعادن والطاقة والمواد الأساسية، بينما المؤشرات مثل S&P 500 وNasdaq 100 تقيس أداء مجموعة من الأسهم. ويمكن أن يوفر الوسيط نفسه عقود فروقات على السلع والمؤشرات معًا.",
              },
              {
                question: "كيف أقارن سبريد شركات تداول السلع؟",
                answer:
                  "قارن السبريد على الأدوات التي ستتداولها فعليًا مثل XAU/USD وWTI وBrent وXAG/USD، ولا تعتمد على عبارة أقل سبريد فقط. راجع أيضًا العمولات ورسوم التمويل لأن التكلفة الإجمالية قد تختلف حسب الحساب ووقت التداول.",
              },
            ].map((item) => (
              <details
                key={item.question}
                className="group overflow-hidden rounded-[16px] border border-slate-200 bg-[#f8fafc] open:bg-white open:shadow-[0_8px_22px_rgba(15,23,42,0.045)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-right sm:px-5">
                  <h3 className="text-[13px] font-black leading-6 text-slate-950 sm:text-[14px]">
                    {item.question}
                  </h3>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-brand-600 shadow-sm transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-4 py-4 sm:px-5">
                  <p className="text-[12px] leading-7 text-slate-600 sm:text-[13px]">
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
            <div className="pointer-events-none absolute -left-24 -top-28 h-64 w-64 rounded-full bg-blue-400/15 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-10 h-64 w-64 rounded-full bg-cyan-300/10 blur-[90px]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[850px] text-right">
                <div className="text-[10px] font-black text-cyan-300">
                  BROKER ALARAB
                </div>

                <h2 className="mt-2 text-[24px] font-black leading-[1.4] sm:text-[31px]">
                  قارن شركات تداول السلع قبل فتح حسابك
                </h2>

                <p className="mt-3 text-[12px] leading-7 text-slate-300 sm:text-[14px]">
                  راجع الشركات والمنصات والحد الأدنى للإيداع
                  والحسابات المتاحة، ثم تحقق من شروط تداول الذهب
                  والنفط والسلع التي تهمك لدى الوسيط قبل اتخاذ
                  قرارك.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="#best-commodity-brokers"
                  className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#2471df] px-6 text-[12px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:w-auto"
                >
                  قارن شركات تداول السلع
                  <span className="mr-2">↑</span>
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
            المعلومات الواردة في هذه الصفحة لأغراض المقارنة
            والمعلومات العامة فقط ولا تمثل نصيحة استثمارية أو
            توصية بفتح حساب لدى شركة معينة. تداول عقود الفروقات
            والمنتجات ذات الرافعة المالية ينطوي على مخاطر مرتفعة
            وقد يؤدي إلى خسارة رأس المال. تحقق من شروط الوسيط
            والجهة القانونية المنظمة له ومدى ملاءمة المنتج لك قبل
            التداول.
          </p>
        </div>
      </section>

      {/* ===================================================
          FAQ STRUCTURED DATA
      =================================================== */}

      <Script
        id="commodity-brokers-ar-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",

            mainEntity: [
              {
                "@type": "Question",
                name: "ما هي أفضل شركة لتداول السلع؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "لا توجد شركة واحدة مناسبة لجميع المتداولين. يعتمد الاختيار على السلع التي تريد تداولها والتراخيص والسبريد ورسوم التمويل والمنصة ومتطلبات الهامش ونوع الحساب.",
                },
              },
              {
                "@type": "Question",
                name: "ما هي أفضل شركة لتداول الذهب؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "عند اختيار شركة لتداول الذهب، من المهم مقارنة سبريد XAU/USD والتنفيذ ومتطلبات الهامش ورسوم التبييت والمنصة والتراخيص.",
                },
              },
              {
                "@type": "Question",
                name: "ما هي أشهر السلع للتداول؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "من أشهر أسواق السلع الذهب والفضة والنفط الخام WTI وBrent والغاز الطبيعي، وقد توفر بعض شركات الوساطة أيضًا سلعًا زراعية.",
                },
              },
              {
                "@type": "Question",
                name: "ما الفرق بين WTI وBrent؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "WTI وBrent معياران مختلفان لتسعير النفط الخام. يرتبط WTI بشكل وثيق بالسوق الأمريكية، بينما يستخدم Brent كمعيار رئيسي في التسعير العالمي.",
                },
              },
              {
                "@type": "Question",
                name: "ما هو رمز تداول الذهب؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "يظهر الذهب عادةً لدى العديد من منصات التداول بالرمز XAU/USD عندما يكون مسعرًا مقابل الدولار الأمريكي، وقد تختلف أسماء الأدوات ومواصفات العقود بين الوسطاء.",
                },
              },
              {
                "@type": "Question",
                name: "ما هو رمز تداول الفضة؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "يظهر تداول الفضة مقابل الدولار الأمريكي عادةً بالرمز XAG/USD لدى العديد من شركات الوساطة، مع ضرورة التحقق من الرمز ومواصفات العقد لدى الوسيط.",
                },
              },
              {
                "@type": "Question",
                name: "هل يمكن تداول النفط عبر الإنترنت؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "توفر العديد من شركات الوساطة إمكانية الحصول على تعرض لحركة أسعار النفط مثل WTI وBrent من خلال منتجات مالية مثل عقود الفروقات.",
                },
              },
              {
                "@type": "Question",
                name: "هل يمكن تداول السلع بحساب إسلامي؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "توفر بعض شركات الوساطة حسابات إسلامية أو Swap-Free قد تشمل أدوات من أسواق السلع، لكن الشروط والأدوات المشمولة والرسوم المحتملة تختلف بين الوسطاء.",
                },
              },
              {
                "@type": "Question",
                name: "ما هي أفضل منصة لتداول الذهب والنفط؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "يعتمد اختيار المنصة على احتياجات المتداول. من المنصات المستخدمة لدى شركات الوساطة MetaTrader 5 وMetaTrader 4 وcTrader، كما يدعم بعض الوسطاء التكامل مع TradingView.",
                },
              },
              {
                "@type": "Question",
                name: "هل تداول السلع مناسب للمبتدئين؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "يمكن للمبتدئ تعلم أسواق السلع، لكن هذه الأسواق قد تشهد تقلبات قوية ويزداد الخطر عند استخدام الرافعة المالية، لذلك يجب فهم الهامش وإدارة المخاطر قبل التداول بأموال حقيقية.",
                },
              },
              {
                "@type": "Question",
                name: "ما الذي يحرك سعر الذهب؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "يتأثر الذهب بعوامل تشمل تحركات الدولار الأمريكي وتوقعات أسعار الفائدة والتضخم وعوائد السندات وشهية المستثمرين للمخاطرة والتطورات الاقتصادية والجيوسياسية.",
                },
              },
              {
                "@type": "Question",
                name: "ما الذي يحرك أسعار النفط؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "تتأثر أسعار النفط بمستويات العرض والطلب العالمي والإنتاج والمخزونات والنشاط الاقتصادي وسياسات كبار المنتجين والأحداث الجيوسياسية.",
                },
              },
              {
                "@type": "Question",
                name: "هل تداول السلع هو نفسه تداول الفوركس؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "لا. الفوركس يركز على تداول عملة مقابل أخرى، بينما تشمل السلع أسواقًا مثل الذهب والنفط والفضة والغاز الطبيعي.",
                },
              },
              {
                "@type": "Question",
                name: "هل تداول السلع هو نفسه تداول المؤشرات؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "لا. السلع تشمل المعادن والطاقة والمواد الأساسية، بينما المؤشرات مثل S&P 500 وNasdaq 100 تقيس أداء مجموعة من الأسهم.",
                },
              },
              {
                "@type": "Question",
                name: "كيف أقارن سبريد شركات تداول السلع؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "قارن السبريد على الأدوات التي ستتداولها فعليًا مثل XAU/USD وWTI وBrent وXAG/USD، وراجع أيضًا العمولات ورسوم التمويل والتكلفة الإجمالية للحساب.",
                },
              },
            ],
          }),
        }}
      />

    </main>
  );
}