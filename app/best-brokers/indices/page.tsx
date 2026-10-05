import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "أفضل شركات تداول المؤشرات 2026 | مقارنة أفضل الوسطاء",
  description:
    "قارن أفضل شركات تداول المؤشرات في 2026 حسب التقييم والمنصات والتراخيص والحد الأدنى للإيداع والحساب الإسلامي، وتعرّف على أهم المؤشرات العالمية مثل S&P 500 وناسداك وداو جونز.",

  alternates: {
    canonical: "https://brokeralarab.com/best-brokers/indices",

    languages: {
      ar: "https://brokeralarab.com/best-brokers/indices",
      en: "https://brokeralarab.com/en/best-brokers/indices",
      "x-default": "https://brokeralarab.com/en/best-brokers/indices",
    },
  },

  openGraph: {
    title: "أفضل شركات تداول المؤشرات 2026",

    description:
      "قارن شركات تداول المؤشرات والمنصات والتراخيص والحد الأدنى للإيداع وأهم المزايا قبل اختيار وسيط لتداول المؤشرات العالمية.",

    url: "https://brokeralarab.com/best-brokers/indices",

    type: "website",
    siteName: "Broker Alarab",
    locale: "ar_AR",
  },

  twitter: {
    card: "summary_large_image",

    title: "أفضل شركات تداول المؤشرات 2026",

    description:
      "دليل ومقارنة أفضل وسطاء تداول المؤشرات العالمية مثل S&P 500 وناسداك وداو جونز في 2026.",
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
    broker?.name_ar ||
    broker?.name ||
    broker?.title ||
    broker?.broker_name ||
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
   INDEX SUPPORT DETECTION
========================================================= */

function supportsIndices(broker: BrokerRow) {
  const assets = normalizeText(getTradingAssets(broker));

  return (
    assets.includes("index") ||
    assets.includes("indices") ||
    assets.includes("index cfd") ||
    assets.includes("index cfds") ||
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
    normalized.includes("متاح") ||
    normalized.includes("نعم") ||
    normalized.includes("islamic") ||
    normalized.includes("إسلامي") ||
    normalized.includes("اسلامي")
  );
}

/* =========================================================
   INDEX BROKER SCORE

   Internal ranking score used to organize brokers displayed
   on this page. It does not claim that any broker is
   objectively the best broker in the entire market.
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
  broker: IndexBroker;
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

export default async function BestIndicesTradingBrokersPage() {
  const supabase = await createClient();

  /* =======================================================
     LOAD PUBLISHED BROKERS
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
            تعذر تحميل بيانات شركات تداول المؤشرات
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {brokersError.message}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     FILTER INDEX BROKERS
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
        name: "أفضل شركات تداول المؤشرات",
        item: "https://brokeralarab.com/best-brokers/indices",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name:
      "أفضل شركات تداول المؤشرات 2026",

    url:
      "https://brokeralarab.com/best-brokers/indices",

    description:
      "دليل ومقارنة شركات تداول المؤشرات العالمية، بما يشمل المنصات والتراخيص والحد الأدنى للإيداع وخيارات الحساب المتاحة.",

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
      "أفضل شركات تداول المؤشرات 2026",

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
            : "https://brokeralarab.com/best-brokers/indices",
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
        id="indices-brokers-ar-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      <Script
        id="indices-brokers-ar-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageJsonLd
            ),
        }}
      />

      <Script
        id="indices-brokers-ar-itemlist-jsonld"
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
              تداول المؤشرات
            </span>
          </nav>

          {/* HERO CONTENT */}

          <div className="mt-0 text-right sm:mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              دليل تداول المؤشرات 2026
            </div>

            <h1 className="mt-3 max-w-[1300px] text-[30px] font-black leading-[1.25] tracking-[-0.025em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
              <span className="block sm:inline">
                أفضل شركات تداول المؤشرات
              </span>{" "}

              <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
                في 2026
              </span>
            </h1>

            {/* Mobile description */}

            <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
              قارن شركات تداول المؤشرات حسب التقييم والمنصات
              والحد الأدنى للإيداع ومزايا الحساب لاختيار الوسيط
              المناسب لك.
            </p>

            {/* Desktop description */}

            <p className="mt-3 hidden max-w-[1180px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
              قارن أفضل شركات تداول المؤشرات العالمية حسب منصة
              التداول والتراخيص والحد الأدنى للإيداع ومزايا الحساب.
              وتعرّف على ما يجب فحصه قبل اختيار وسيط لتداول مؤشرات
              مثل S&P 500 وناسداك وداو جونز وغيرها من المؤشرات العالمية.
            </p>

            {/* Update information */}

            <div className="mt-2.5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
              <time
                dateTime="2026-10-05"
                className="inline-flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="sm:hidden">
                  محدث أكتوبر 2026
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

                مقارنة مستقلة للوسطاء
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <span className="text-cyan-300">
                  ✓
                </span>

                بيانات بروكر العرب
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
                    شركات تداول المؤشرات
                  </div>
                </div>

                <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {islamicIndexBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    حسابات إسلامية
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
                  href="#best-indices-brokers"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
                >
                  <span className="sm:hidden">
                    أفضل الشركات
                  </span>

                  <span className="hidden sm:inline">
                    قارن شركات تداول المؤشرات
                  </span>

                  <span aria-hidden="true">
                    ←
                  </span>
                </a>

                <a
                  href="#indices-guide"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
                >
                  دليل تداول المؤشرات

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
            aria-label="التنقل داخل الصفحة"
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {[
              {
                href: "#best-indices-brokers",
                label: "أفضل شركات المؤشرات",
              },
              {
                href: "#indices-guide",
                label: "دليل تداول المؤشرات",
              },
              {
                href: "#popular-indices",
                label: "أشهر المؤشرات",
              },
              {
                href: "#indices-platforms",
                label: "منصات التداول",
              },
              {
                href: "#how-to-choose",
                label: "كيفية الاختيار",
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
          BEST INDICES BROKERS
      =================================================== */}

      <section
        id="best-indices-brokers"
        className="scroll-mt-24 bg-[#f4f7fb] pb-8 pt-4 sm:pb-10 sm:pt-6 lg:pb-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.065)] sm:rounded-[28px]">

            {/* SECTION HEADER */}

            <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(250deg,#ffffff_0%,#f5f9ff_65%,#eaf4ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
              <div className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#2f80ed] to-[#1353a5]" />

              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 text-right">
                  <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[9px] font-black text-white sm:text-[11px]">
                    مقارنة شركات التداول
                  </span>

                  <h2 className="mt-3 text-[23px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[34px]">
                    أفضل شركات تداول المؤشرات
                  </h2>

                  <p className="mt-2 max-w-[1050px] text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                    تشمل هذه المقارنة الشركات المنشورة في قاعدة بيانات
                    بروكر العرب التي توفر تداول المؤشرات ضمن الأدوات
                    المالية المتاحة لديها. قارن منصة التداول وشروط الحساب
                    والتكاليف والتراخيص قبل فتح حساب.
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
                      من أصل {indexBrokers.length} شركة تدعم المؤشرات
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

                قد تختلف المؤشرات المتاحة وشروط التداول والرافعة المالية
                والهامش وساعات التداول حسب الشركة والجهة التنظيمية ونوع
                الحساب والدولة. تحقق دائمًا من تفاصيل المؤشر وشروط العقد
                لدى الوسيط قبل التداول.
              </p>
            </div>

            {/* DESKTOP TABLE */}

            <div className="hidden p-5 lg:block lg:p-6">
              <div className="overflow-hidden rounded-[18px] border border-slate-200 shadow-[0_7px_24px_rgba(15,23,42,0.055)]">
                <table className="w-full table-fixed text-right">
                  <thead className="bg-[linear-gradient(270deg,#071c34_0%,#0b3157_55%,#0d426f_100%)] text-white">
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
                        إسلامي
                      </th>

                      <th className="w-[10%] px-4 py-4 text-center font-black">
                        التقييم
                      </th>

                      <th className="w-[15%] px-4 py-4 text-center font-black">
                        الإجراءات
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
                              ? "bg-[linear-gradient(270deg,#fffdf7_0%,#fff9e9_100%)]"
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
                                ✓ متاح
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
                      <div className="h-1 bg-gradient-to-l from-amber-400 via-amber-300 to-transparent" />
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

                      {/* Values */}

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
          INDICES TRADING GUIDE
      =================================================== */}

      {/* ===================================================
          QUICK ANSWER / INDICES GUIDE
      =================================================== */}

      <section
        id="indices-guide"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr] lg:gap-6">

            {/* Main guide */}

            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
              <div className="border-b border-slate-200 bg-[linear-gradient(250deg,#ffffff_0%,#f6f9fd_65%,#edf5ff_100%)] px-5 py-6 sm:px-7">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                  دليل سريع
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  كيف تختار أفضل شركة لتداول المؤشرات؟
                </h2>

                <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600 sm:text-[16px]">
                  اختيار وسيط لتداول المؤشرات لا يعتمد فقط على تقييم الشركة.
                  من المهم معرفة المؤشرات التي يوفرها الوسيط، وفروقات الأسعار،
                  وساعات التداول، ومتطلبات الهامش والرافعة المالية، بالإضافة
                  إلى منصة التداول وسرعة تنفيذ الأوامر. وتزداد أهمية هذه
                  العوامل عند تداول مؤشرات سريعة الحركة مثل ناسداك 100
                  وداو جونز.
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                {[
                  {
                    number: "01",
                    title: "المؤشرات المتاحة",
                    text: "تحقق من توفر المؤشرات التي تريد تداولها مثل S&P 500 وNasdaq 100 وDow Jones وDAX 40.",
                  },
                  {
                    number: "02",
                    title: "السبريد والتكاليف",
                    text: "قارن فروقات الأسعار والتكاليف الأخرى لأن تكلفة تداول المؤشرات قد تختلف من وسيط لآخر ومن مؤشر لآخر.",
                  },
                  {
                    number: "03",
                    title: "ساعات التداول",
                    text: "راجع ساعات تداول كل مؤشر وما إذا كان الوسيط يوفر جلسات ممتدة خارج ساعات السوق الرئيسية.",
                  },
                  {
                    number: "04",
                    title: "المنصة والتنفيذ",
                    text: "اختر منصة توفر رسومًا بيانية وأوامر إدارة مخاطر وتنفيذًا مناسبًا لطبيعة تداول المؤشرات.",
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
                قبل فتح الحساب
              </span>

              <h3 className="mt-4 text-xl font-black leading-8">
                7 نقاط مهمة لمتداول المؤشرات
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "توفر المؤشرات التي تريد تداولها",
                  "سبريد S&P 500 وNasdaq 100",
                  "ساعات التداول والجلسات الممتدة",
                  "الرافعة المالية ومتطلبات الهامش",
                  "تكلفة الاحتفاظ بالصفقة لليوم التالي",
                  "منصة التداول وسرعة التنفيذ",
                  "التراخيص والجهة القانونية للحساب",
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
          WHAT ARE STOCK MARKET INDICES
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">

            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">

              {/* Content */}

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  أساسيات المؤشرات
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  ما هي مؤشرات الأسهم وكيف يتم تداولها؟
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    مؤشر الأسهم هو مقياس يتابع أداء مجموعة محددة من الشركات
                    المدرجة في سوق مالي أو قطاع معين. فعوضًا عن متابعة سهم
                    شركة واحدة فقط، يعطي المؤشر صورة أوسع عن أداء مجموعة من
                    الشركات أو جزء من السوق.
                  </p>

                  <p>
                    على سبيل المثال، يعتبر{" "}
                    <strong className="text-slate-900">
                      S&amp;P 500
                    </strong>{" "}
                    من أهم المؤشرات المستخدمة لمتابعة أداء الشركات الأمريكية
                    الكبرى، بينما يركز{" "}
                    <strong className="text-slate-900">
                      Nasdaq 100
                    </strong>{" "}
                    على مجموعة من أكبر الشركات غير المالية المدرجة في بورصة
                    ناسداك، ويُعرف بتأثره الكبير بشركات التكنولوجيا والنمو.
                  </p>

                  <p>
                    متداولو التجزئة لا يشترون المؤشر نفسه مباشرة في العادة.
                    إحدى الطرق التي توفرها شركات التداول هي{" "}
                    <strong className="text-slate-900">
                      عقود الفروقات على المؤشرات (Index CFDs)
                    </strong>
                    ، والتي تسمح بالمضاربة على ارتفاع أو انخفاض سعر المؤشر
                    دون امتلاك الأسهم التي يتكون منها المؤشر.
                  </p>
                </div>
              </div>

              {/* Visual */}

              <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 lg:border-r lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[9px] font-black tracking-wide text-cyan-300 sm:text-[10px]">
                    كيف يعمل المؤشر؟
                  </div>

                  <h3 className="mt-2 text-[20px] font-black leading-8 text-white sm:text-[23px]">
                    مجموعة شركات في رقم واحد
                  </h3>

                  <p className="mt-2 text-[11px] font-medium leading-6 text-slate-300">
                    حركة المؤشر تعكس الأداء المجمع للشركات الداخلة في تكوينه
                    وفق المنهجية الخاصة بكل مؤشر.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {[
                      {
                        label: "S&P 500",
                        text: "السوق الأمريكي الواسع",
                      },
                      {
                        label: "Nasdaq 100",
                        text: "شركات النمو والتكنولوجيا",
                      },
                      {
                        label: "Dow Jones",
                        text: "شركات أمريكية قيادية",
                      },
                      {
                        label: "DAX 40",
                        text: "السوق الألماني",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5"
                      >
                        <span
                          dir="ltr"
                          className="text-[12px] font-black text-cyan-300"
                        >
                          {item.label}
                        </span>

                        <span className="text-[10px] font-bold text-slate-300">
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

          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              المؤشرات العالمية
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              أشهر مؤشرات الأسهم العالمية للتداول
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              تختلف المؤشرات من حيث الشركات المكونة لها والقطاعات التي
              تمثلها وطريقة احتسابها، لذلك قد تختلف حركتها بشكل واضح حتى
              عندما تكون المؤشرات من نفس الدولة.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">

            {/* S&P 500 */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-l from-blue-500 via-cyan-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-brand-500"
                    >
                      US500 / SPX500
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      مؤشر S&amp;P 500
                    </h3>
                  </div>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black text-blue-700">
                    الولايات المتحدة
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  أحد أشهر المؤشرات العالمية، ويستخدم كمقياس واسع لأداء
                  الشركات الأمريكية الكبرى. لذلك يراقبه المستثمرون
                  والمتداولون لتقييم اتجاه سوق الأسهم الأمريكي بشكل عام.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    يتأثر عادةً بـ
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    السياسة النقدية الأمريكية • بيانات الاقتصاد • نتائج
                    الشركات • شهية المخاطرة
                  </div>
                </div>
              </div>
            </article>

            {/* NASDAQ */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-l from-violet-500 via-blue-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-brand-500"
                    >
                      NAS100 / US100
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      مؤشر Nasdaq 100
                    </h3>
                  </div>

                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[9px] font-black text-violet-700">
                    الولايات المتحدة
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  يتابع أداء مجموعة من أكبر الشركات غير المالية المدرجة
                  في ناسداك، ويتميز بوزن كبير لشركات التكنولوجيا والنمو،
                  ما يجعله من أكثر المؤشرات متابعة بين المتداولين.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    يتأثر عادةً بـ
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    أسهم التكنولوجيا • أسعار الفائدة • نتائج الشركات
                    الكبرى • معنويات النمو
                  </div>
                </div>
              </div>
            </article>

            {/* DOW */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-l from-sky-500 via-blue-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-brand-500"
                    >
                      US30 / DJ30
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      مؤشر Dow Jones
                    </h3>
                  </div>

                  <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-black text-sky-700">
                    الولايات المتحدة
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  مؤشر أمريكي تاريخي يتكون من مجموعة من الشركات القيادية
                  الكبرى. ويختلف عن العديد من المؤشرات الأخرى في طريقة
                  احتساب وزن الشركات داخله.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    يتأثر عادةً بـ
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    الشركات القيادية • الاقتصاد الأمريكي • بيانات الوظائف
                    • قرارات الاحتياطي الفيدرالي
                  </div>
                </div>
              </div>
            </article>

            {/* DAX */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-l from-amber-500 via-yellow-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-brand-500"
                    >
                      GER40 / DE40
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      مؤشر DAX 40
                    </h3>
                  </div>

                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-black text-amber-700">
                    ألمانيا
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  المؤشر الرئيسي لسوق الأسهم الألماني، ويضم مجموعة من
                  أكبر الشركات الألمانية المدرجة، ولذلك يتابعه المتداولون
                  لقياس أداء أكبر اقتصاد في أوروبا.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    يتأثر عادةً بـ
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    الاقتصاد الألماني • البنك المركزي الأوروبي • اليورو
                    • الصناعة والتجارة الأوروبية
                  </div>
                </div>
              </div>
            </article>

            {/* FTSE */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-l from-indigo-500 via-blue-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-brand-500"
                    >
                      UK100 / FTSE
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      مؤشر FTSE 100
                    </h3>
                  </div>

                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-black text-indigo-700">
                    بريطانيا
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  يتابع أداء مجموعة من أكبر الشركات المدرجة في بورصة لندن،
                  ويعد من أبرز المؤشرات المستخدمة لمتابعة سوق الأسهم
                  البريطاني.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    يتأثر عادةً بـ
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    الجنيه الإسترليني • بنك إنجلترا • السلع والطاقة
                    • الاقتصاد البريطاني
                  </div>
                </div>
              </div>
            </article>

            {/* NIKKEI */}

            <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="h-1 bg-gradient-to-l from-rose-500 via-red-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      dir="ltr"
                      className="text-[11px] font-black text-brand-500"
                    >
                      JP225 / JPN225
                    </div>

                    <h3 className="mt-1 text-xl font-black text-slate-950">
                      مؤشر Nikkei 225
                    </h3>
                  </div>

                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[9px] font-black text-rose-700">
                    اليابان
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  أحد أشهر مؤشرات الأسهم الآسيوية، ويتابع مجموعة كبيرة من
                  الشركات اليابانية الرئيسية المدرجة في بورصة طوكيو.
                </p>

                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-black text-slate-500">
                    يتأثر عادةً بـ
                  </div>

                  <div className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    الين الياباني • بنك اليابان • الصادرات • معنويات
                    الأسواق الآسيوية
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================
          US INDICES SEO SECTION
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">

            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">

              {/* Side panel */}

              <div className="bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 text-white sm:p-7 lg:p-8">
                <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[9px] font-black text-cyan-200">
                  US INDICES
                </span>

                <h3 className="mt-4 text-[23px] font-black leading-9">
                  أشهر رموز المؤشرات الأمريكية لدى شركات التداول
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

                      <span
                        dir="ltr"
                        className="text-[10px] font-black text-cyan-300"
                      >
                        {symbol}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[10px] leading-5 text-slate-400">
                  قد يستخدم كل وسيط رمزًا مختلفًا لنفس المؤشر، لذلك تحقق
                  من اسم الأداة ومواصفات العقد داخل منصة التداول.
                </p>
              </div>

              {/* Content */}

              <div className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  المؤشرات الأمريكية
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  تداول S&amp;P 500 وNasdaq 100 وDow Jones
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  تعد المؤشرات الأمريكية من أكثر الأسواق متابعة عالميًا،
                  لكن لكل مؤشر خصائص مختلفة. لذلك لا ينبغي التعامل مع
                  S&amp;P 500 وNasdaq 100 وDow Jones وكأنها أداة واحدة.
                  اختلاف مكونات المؤشر وطريقة احتساب الأوزان يجعل استجابة
                  كل مؤشر للأخبار الاقتصادية ونتائج الشركات وأسعار الفائدة
                  مختلفة.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "S&P 500",
                      subtitle: "تعرض أوسع",
                      text: "يستخدم لمتابعة شريحة واسعة من الشركات الأمريكية الكبرى عبر قطاعات متعددة.",
                    },
                    {
                      title: "Nasdaq 100",
                      subtitle: "تركيز أكبر على النمو",
                      text: "يميل إلى التأثر بصورة أكبر بحركة شركات التكنولوجيا والنمو وأسعار الفائدة.",
                    },
                    {
                      title: "Dow Jones",
                      subtitle: "شركات قيادية",
                      text: "مؤشر تاريخي يضم عددًا أقل من الشركات الأمريكية الكبيرة ويستخدم منهجية مختلفة في الوزن.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4"
                    >
                      <div
                        dir="ltr"
                        className="text-[15px] font-black text-slate-950"
                      >
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
          INDEX CFDs VS INVESTING IN INDEX
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              فرق مهم
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              تداول المؤشرات عبر CFD أم الاستثمار في مؤشر؟
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              عبارة &quot;تداول S&amp;P 500&quot; قد تشير إلى منتجات مالية
              مختلفة. لذلك يجب معرفة الأداة التي يوفرها الوسيط قبل فتح
              الصفقة، لأن الملكية والتكاليف والرافعة والمخاطر تختلف حسب
              المنتج.
            </p>
          </div>

          {/* Desktop comparison */}

          <div className="mt-6 hidden overflow-hidden rounded-[20px] border border-slate-200 md:block">
            <table className="w-full text-right">
              <thead className="bg-[#071c34] text-white">
                <tr>
                  <th className="px-5 py-4 text-[12px] font-black">
                    المقارنة
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    عقود فروقات المؤشرات CFD
                  </th>

                  <th className="px-5 py-4 text-center text-[12px] font-black">
                    الاستثمار عبر ETF أو منتج يتتبع المؤشر
                  </th>
                </tr>
              </thead>

              <tbody className="text-[12px]">
                {[
                  [
                    "الهدف",
                    "المضاربة على حركة سعر المؤشر",
                    "الحصول على تعرض استثماري للمؤشر",
                  ],
                  [
                    "ملكية الأصل",
                    "لا توجد ملكية للأسهم المكونة للمؤشر",
                    "تعتمد الملكية على المنتج المستخدم",
                  ],
                  [
                    "الرافعة المالية",
                    "قد تكون متاحة حسب الوسيط والجهة التنظيمية",
                    "تختلف حسب المنتج والحساب",
                  ],
                  [
                    "البيع على المكشوف",
                    "متاح عادةً بسهولة أكبر عبر CFD",
                    "يعتمد على المنتج والوسيط",
                  ],
                  [
                    "تكلفة الاحتفاظ",
                    "قد توجد رسوم تمويل لليوم التالي",
                    "قد توجد رسوم إدارة أو عمولات حسب المنتج",
                  ],
                  [
                    "الاستخدام الشائع",
                    "التداول قصير أو متوسط الأجل",
                    "الاستثمار وبناء التعرض طويل الأجل",
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

          {/* Mobile comparison */}

          <div className="mt-5 grid gap-3 md:hidden">
            {[
              {
                title: "عقود فروقات المؤشرات CFD",
                items: [
                  "المضاربة على ارتفاع أو انخفاض المؤشر",
                  "لا تملك الأسهم المكونة للمؤشر",
                  "قد تتوفر رافعة مالية",
                  "قد توجد تكلفة تمويل لليوم التالي",
                ],
              },
              {
                title: "الاستثمار في منتج يتتبع المؤشر",
                items: [
                  "الحصول على تعرض لأداء المؤشر",
                  "الملكية تعتمد على المنتج المستخدم",
                  "قد يناسب الاستثمار طويل الأجل",
                  "التكاليف تعتمد على الوسيط والمنتج",
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
          WHAT MOVES INDICES
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">

            <div className="border-b border-slate-200 px-5 py-6 sm:px-7 lg:px-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                حركة السوق
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                ما الذي يحرك أسعار المؤشرات؟
              </h2>

              <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                المؤشر يمثل مجموعة من الشركات، ولذلك قد يتحرك نتيجة عوامل
                اقتصادية ومالية متعددة في الوقت نفسه. فهم المحركات الرئيسية
                يساعد المتداول على تفسير التقلبات بدل الاعتماد على حركة
                السعر وحدها.
              </p>
            </div>

            <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "قرارات أسعار الفائدة",
                  text: "قرارات البنوك المركزية وتوقعات أسعار الفائدة يمكن أن تؤثر بصورة قوية على تقييمات الأسهم واتجاه المؤشرات.",
                },
                {
                  number: "02",
                  title: "بيانات التضخم",
                  text: "تقارير التضخم قد تغير توقعات السياسة النقدية، وهو ما يمكن أن يرفع تقلب مؤشرات الأسهم.",
                },
                {
                  number: "03",
                  title: "بيانات الوظائف والنمو",
                  text: "بيانات سوق العمل والناتج والنشاط الاقتصادي تساعد المتداولين على تقييم قوة الاقتصاد.",
                },
                {
                  number: "04",
                  title: "نتائج الشركات الكبرى",
                  text: "الشركات ذات الأوزان الكبيرة داخل المؤشر يمكن أن تؤثر بشكل ملحوظ على حركته بعد إعلان النتائج.",
                },
                {
                  number: "05",
                  title: "شهية المخاطرة",
                  text: "الأحداث السياسية والجيوسياسية وحالة الأسواق العالمية قد تدفع المستثمرين نحو المخاطرة أو الابتعاد عنها.",
                },
                {
                  number: "06",
                  title: "العملات والسلع",
                  text: "بعض المؤشرات تتأثر بحركة العملة المحلية أو أسعار الطاقة والسلع بسبب طبيعة الشركات المكونة لها.",
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
          INDEX TRADING COSTS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px] sm:p-7">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                تكلفة التداول
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                سبريد المؤشرات والرسوم التي يجب مقارنتها
              </h2>

              <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                عند البحث عن أفضل شركة لتداول المؤشرات، لا يكفي النظر إلى
                الحد الأدنى للإيداع. بالنسبة للمتداول النشط، يمكن أن يكون
                السبريد وتكلفة الاحتفاظ بالصفقات والتنفيذ عوامل أكثر أهمية
                في التكلفة الإجمالية.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "السبريد",
                    text: "الفرق بين سعر الشراء وسعر البيع، وقد يتغير حسب المؤشر والسيولة ووقت التداول.",
                  },
                  {
                    title: "العمولة",
                    text: "بعض نماذج الحسابات قد تتضمن عمولة منفصلة، لذلك راجع جدول الرسوم الخاص بالوسيط.",
                  },
                  {
                    title: "رسوم التبييت",
                    text: "صفقات CFD التي تبقى مفتوحة لليوم التالي قد تخضع لتكاليف تمويل حسب شروط الوسيط.",
                  },
                  {
                    title: "الانزلاق السعري",
                    text: "خلال الأخبار أو التقلبات القوية قد يختلف سعر التنفيذ عن السعر المطلوب.",
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
                مهم للمتداول النشط
              </div>

              <h3 className="mt-3 text-[22px] font-black leading-9">
                لا تقارن السبريد على مؤشر واحد فقط
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-300">
                قد يكون الوسيط منافسًا جدًا على S&amp;P 500، لكن شروطه على
                Nasdaq 100 أو DAX 40 مختلفة. إذا كنت تتداول أكثر من مؤشر،
                قارن الأدوات التي ستستخدمها فعليًا.
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
                    dir="ltr"
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

          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              منصات تداول المؤشرات
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              ما هي أفضل منصة لتداول المؤشرات؟
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              لا توجد منصة واحدة تناسب جميع المتداولين. الاختيار يعتمد
              على الأدوات التي تحتاجها، وطريقة التحليل، وسرعة تنفيذ
              الأوامر، وما إذا كنت تتداول من الكمبيوتر أو الهاتف.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                name: "MetaTrader 5",
                short: "MT5",
                text: "منصة متعددة الأصول توفر الرسوم البيانية والمؤشرات الفنية وأنواعًا مختلفة من الأوامر وأدوات التداول الآلي.",
              },
              {
                name: "MetaTrader 4",
                short: "MT4",
                text: "لا تزال متاحة لدى عدد كبير من شركات CFD، مع بيئة مألوفة للتحليل الفني والمستشارين الآليين.",
              },
              {
                name: "TradingView",
                short: "TV",
                text: "تشتهر بالرسوم البيانية وأدوات التحليل ومتابعة الأسواق، ويتيح بعض الوسطاء تنفيذ الصفقات من خلالها.",
              },
              {
                name: "cTrader",
                short: "cT",
                text: "منصة حديثة توفر أدوات رسوم بيانية وتنفيذًا وإدارة أوامر، وتتوفر لدى مجموعة من شركات التداول.",
              },
            ].map((platform) => (
              <article
                key={platform.name}
                className="rounded-[19px] border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    dir="ltr"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#071c34] text-[11px] font-black text-cyan-300"
                  >
                    {platform.short}
                  </div>

                  <h3
                    dir="ltr"
                    className="text-[15px] font-black text-slate-950"
                  >
                    {platform.name}
                  </h3>
                </div>

                <p className="mt-3 text-[12px] leading-6 text-slate-600">
                  {platform.text}
                </p>
              </article>
            ))}
          </div>

          {/* Platform checklist */}

          <div className="mt-5 rounded-[20px] border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
            <h3 className="text-[17px] font-black text-slate-950">
              ماذا نبحث عنه في منصة تداول المؤشرات؟
            </h3>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "رسوم بيانية سريعة وواضحة",
                "أوامر وقف الخسارة وجني الأرباح",
                "تنبيهات الأسعار",
                "سهولة متابعة عدة مؤشرات",
                "تطبيق هاتف قوي",
                "استقرار أثناء التقلبات",
                "أدوات تحليل فني",
                "سهولة إدارة حجم الصفقة",
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
          HOW TO CHOOSE
      =================================================== */}

      <section
        id="how-to-choose"
        className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              اختيار الوسيط
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              كيف نختار أفضل شركة لتداول المؤشرات؟
            </h2>

            <p className="mt-3 max-w-[1100px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              أفضل وسيط لتداول المؤشرات ليس بالضرورة الشركة صاحبة أعلى
              رافعة مالية أو أقل حد أدنى للإيداع. الاختيار الأفضل يعتمد
              على المؤشرات التي تريد تداولها، وتكلفة التداول، وساعات
              السوق، والمنصة، والتنفيذ، والجهة التنظيمية التي سيُفتح
              حسابك من خلالها.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                number: "01",
                title: "التراخيص والجهة القانونية",
                text: "تحقق من الشركة القانونية التي ستفتح حسابك لديها والجهة الرقابية المسؤولة عنها، لأن الحماية وشروط التداول قد تختلف بين كيانات الوسيط.",
              },
              {
                number: "02",
                title: "عدد المؤشرات المتاحة",
                text: "إذا كنت تريد تنويع تداولك، تحقق من توفر المؤشرات الأمريكية والأوروبية والآسيوية التي تهمك بدل الاكتفاء بوجود US500 فقط.",
              },
              {
                number: "03",
                title: "سبريد المؤشرات",
                text: "قارن السبريد على المؤشرات التي ستتداولها فعليًا، خصوصًا NAS100 وUS500 وUS30 وGER40، بدل الاعتماد على عبارة سبريد منخفض فقط.",
              },
              {
                number: "04",
                title: "ساعات التداول",
                text: "راجع متى يبدأ وينتهي تداول كل مؤشر وما إذا كانت الشركة توفر ساعات ممتدة، لأن ساعات تداول CFD قد تختلف عن جلسة البورصة الأساسية.",
              },
              {
                number: "05",
                title: "المنصة والتنفيذ",
                text: "ابحث عن منصة مستقرة وسريعة توفر الرسوم البيانية والأوامر المعلقة ووقف الخسارة والتنبيهات والأدوات التي تحتاجها لإدارة الصفقة.",
              },
              {
                number: "06",
                title: "الإيداع والسحب",
                text: "راجع الحد الأدنى للإيداع وطرق التمويل والسحب والرسوم المحتملة والعملات المتاحة قبل فتح الحساب.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="relative overflow-hidden rounded-[19px] border border-slate-200 bg-[#f8fafc] p-5"
              >
                <div className="absolute -left-2 -top-5 text-[76px] font-black leading-none text-slate-200/55">
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
          LEVERAGE AND MARGIN
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:gap-6">

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px] sm:p-7 lg:p-8">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                إدارة رأس المال
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                الرافعة المالية والهامش في تداول المؤشرات
              </h2>

              <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                <p>
                  عند تداول المؤشرات من خلال عقود الفروقات، قد يوفر الوسيط
                  رافعة مالية تسمح بفتح مركز أكبر من رأس المال المستخدم
                  كهامش. لكن الرافعة لا تزيد الأرباح المحتملة فقط؛ بل تزيد
                  كذلك تأثير حركة السوق على رأس المال.
                </p>

                <p>
                  متطلبات الهامش والحد الأقصى للرافعة المالية قد تختلف حسب
                  المؤشر، وحجم الصفقة، ونوع العميل، والجهة التنظيمية
                  والدولة. لذلك لا ينبغي اختيار شركة تداول المؤشرات بناءً
                  على رقم الرافعة المالية وحده.
                </p>

                <p>
                  خلال فترات التقلب المرتفع أو الأحداث الاقتصادية المهمة،
                  قد تصبح إدارة حجم الصفقة والهامش المتاح أكثر أهمية،
                  خصوصًا في المؤشرات المعروفة بالحركة السريعة.
                </p>
              </div>
            </article>

            <aside className="rounded-[22px] border border-amber-200 bg-amber-50 p-5 sm:rounded-[28px] sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-amber-100 text-xl">
                !
              </div>

              <h3 className="mt-4 text-xl font-black text-slate-950">
                رافعة أكبر لا تعني وسيطًا أفضل
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-700">
                الرافعة العالية تسمح بالتحكم في مركز أكبر باستخدام هامش
                أقل، لكنها قد تجعل الخسائر تتحرك بسرعة أكبر مقارنة برأس
                المال المستخدم.
              </p>

              <div className="mt-5 space-y-2.5">
                {[
                  "حدد حجم الصفقة قبل الدخول",
                  "راقب الهامش المتاح",
                  "استخدم أدوات إدارة المخاطر",
                  "لا تعتمد على الرافعة القصوى تلقائيًا",
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
          WHICH BROKER TYPE
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              حسب أسلوب التداول
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              ما هي شركة تداول المؤشرات المناسبة لك؟
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              احتياجات متداول المؤشرات المبتدئ تختلف عن احتياجات المتداول
              اليومي أو من يحتفظ بالصفقات لفترات أطول. لذلك من الأفضل
              مقارنة الشركات بناءً على طريقة استخدامك الفعلية للحساب.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">

            {/* Beginner */}

            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-[#f8fafc]">
              <div className="border-b border-slate-200 bg-white p-5">
                <span className="text-[10px] font-black text-brand-500">
                  للمبتدئين
                </span>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  شركة سهلة وواضحة
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  المبتدئ قد يستفيد أكثر من منصة واضحة وحساب تجريبي
                  ومعلومات سهلة عن العقود والهامش والتكاليف.
                </p>
              </div>

              <div className="space-y-3 p-5">
                {[
                  "منصة سهلة الاستخدام",
                  "حساب تجريبي",
                  "حد إيداع مناسب",
                  "مواد تعليمية",
                  "دعم عملاء واضح",
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

            {/* Active */}

            <article className="overflow-hidden rounded-[22px] border border-blue-200 bg-blue-50/30 shadow-[0_12px_32px_rgba(37,99,235,0.07)]">
              <div className="border-b border-blue-100 bg-white p-5">
                <span className="text-[10px] font-black text-brand-500">
                  للمتداول النشط
                </span>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  تكلفة وتنفيذ أفضل
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  كثرة الصفقات تجعل السبريد والتنفيذ واستقرار المنصة من
                  أهم العوامل التي يجب مقارنتها.
                </p>
              </div>

              <div className="space-y-3 p-5">
                {[
                  "سبريد تنافسي على المؤشرات",
                  "تنفيذ سريع ومستقر",
                  "أوامر متقدمة",
                  "رسوم بيانية قوية",
                  "ساعات تداول مناسبة",
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

            {/* Swing */}

            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-[#f8fafc]">
              <div className="border-b border-slate-200 bg-white p-5">
                <span className="text-[10px] font-black text-brand-500">
                  للصفقات الأطول
                </span>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  راقب تكلفة التبييت
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  عند إبقاء صفقات CFD مفتوحة لعدة أيام، تصبح تكاليف
                  التمويل والتبييت عاملًا مهمًا في التكلفة الإجمالية.
                </p>
              </div>

              <div className="space-y-3 p-5">
                {[
                  "تكاليف التبييت",
                  "متطلبات الهامش",
                  "استقرار شروط التداول",
                  "تنوع المؤشرات",
                  "إدارة المخاطر",
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
                مقارنة الأسواق
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                تداول المؤشرات أم الفوركس؟
              </h2>

              <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600">
                كلا السوقين يستخدمهما المتداولون للمضاربة على حركة
                الأسعار، لكن العوامل المؤثرة وساعات السوق وطبيعة الأداة
                تختلف بين المؤشرات وأزواج العملات.
              </p>
            </div>

            <div className="grid md:grid-cols-2">

              <div className="p-5 sm:p-7 md:border-l md:border-slate-200">
                <div className="text-[10px] font-black text-brand-500">
                  INDICES
                </div>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  تداول المؤشرات
                </h3>

                <p className="mt-3 text-[12px] leading-7 text-slate-600">
                  يوفر التعرض لحركة مجموعة من الشركات في سوق أو قطاع،
                  ويتأثر بالاقتصاد وأسعار الفائدة ونتائج الشركات ومعنويات
                  سوق الأسهم.
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
                      dir="ltr"
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black text-blue-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="text-[10px] font-black text-emerald-600">
                  FOREX
                </div>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  تداول العملات
                </h3>

                <p className="mt-3 text-[12px] leading-7 text-slate-600">
                  يعتمد على مقارنة قيمة عملة بعملة أخرى، ويتأثر بصورة
                  كبيرة بأسعار الفائدة والبنوك المركزية والبيانات
                  الاقتصادية والسياسة النقدية.
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
                      dir="ltr"
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
          RISKS
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="rounded-[22px] border border-red-100 bg-[linear-gradient(250deg,#fff_0%,#fffafa_100%)] p-5 sm:rounded-[28px] sm:p-7 lg:p-8">
            <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-black text-red-700">
              المخاطر
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              ما هي مخاطر تداول المؤشرات؟
            </h2>

            <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
              تداول المؤشرات، خصوصًا باستخدام عقود الفروقات والرافعة
              المالية، ينطوي على مخاطر مرتفعة. ويمكن أن تتحرك الأسعار
              بسرعة خلال الأخبار الاقتصادية أو قرارات البنوك المركزية أو
              الأحداث السياسية ونتائج الشركات الكبرى.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "الرافعة المالية",
                  text: "يمكن أن تضخم أثر حركة السوق على الأرباح والخسائر.",
                },
                {
                  title: "التقلب السريع",
                  text: "قد تتحرك بعض المؤشرات بقوة خلال الأخبار أو افتتاح الأسواق.",
                },
                {
                  title: "الفجوات السعرية",
                  text: "قد يفتح السوق عند مستوى مختلف عن الإغلاق السابق في بعض الحالات.",
                },
                {
                  title: "تكلفة الاحتفاظ",
                  text: "قد تؤثر رسوم التمويل على الصفقات التي تبقى مفتوحة لفترة أطول.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[17px] border border-red-100 bg-white p-4"
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
                  منهجية بروكر العرب
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
                  كيف نقارن شركات تداول المؤشرات؟
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  نستخدم بيانات الشركات المتاحة في قاعدة بيانات بروكر
                  العرب لتنظيم الوسطاء الذين يوفرون تداول المؤشرات، مع
                  مراعاة مجموعة من العوامل بدل الاعتماد على عامل واحد.
                  ويهدف الترتيب إلى تسهيل المقارنة ولا يعني أن شركة واحدة
                  هي الخيار الأفضل لجميع المتداولين.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "تقييم الوسيط على بروكر العرب",
                    "توفر تداول المؤشرات",
                    "التراخيص والمعلومات التنظيمية",
                    "منصات التداول المتاحة",
                    "الحد الأدنى للإيداع",
                    "توفر الحساب الإسلامي",
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

              <div className="border-t border-slate-200 bg-[#071c34] p-5 text-white lg:border-r lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                  <div className="text-[10px] font-black text-cyan-300">
                    استقلالية المقارنة
                  </div>

                  <h3 className="mt-3 text-[21px] font-black leading-9">
                    الترتيب ليس مبنيًا على عامل واحد
                  </h3>

                  <p className="mt-3 text-[12px] leading-7 text-slate-300">
                    قد تكون شركة مناسبة للمتداول النشط، بينما تكون شركة
                    أخرى أكثر ملاءمة للمبتدئ. لذلك ننصح بمراجعة صفحة تقييم
                    الوسيط وشروط الحساب قبل اتخاذ القرار.
                  </p>

                  <Link
                    href="/how-we-review-brokers"
                    className="mt-5 inline-flex min-h-[43px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] px-4 text-[11px] font-black text-white transition hover:bg-white/[0.12]"
                  >
                    تعرف على منهجية تقييم الوسطاء
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

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              أدلة ذات صلة
            </span>

            <h2 className="mt-3 text-[25px] font-black text-slate-950 sm:text-3xl">
              قارن المزيد من شركات التداول
            </h2>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/best-brokers/stocks",
                title: "أفضل شركات تداول الأسهم",
                text: "قارن الوسطاء الذين يوفرون تداول الأسهم والأسواق العالمية.",
              },
              {
                href: "/best-brokers/gold",
                title: "أفضل شركات تداول الذهب",
                text: "قارن شركات تداول الذهب والمنصات وشروط الحساب.",
              },
              {
                href: "/lowest-spread-brokers",
                title: "أقل شركات التداول سبريد",
                text: "قارن الوسطاء من حيث فروقات الأسعار وتكاليف التداول.",
              },
              {
                href: "/best-brokers/low-minimum-deposit",
                title: "شركات بإيداع منخفض",
                text: "اكتشف شركات التداول ذات الحد الأدنى المنخفض للإيداع.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/40"
              >
                <h3 className="text-[14px] font-black text-slate-950 transition group-hover:text-brand-600">
                  {item.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {item.text}
                </p>

                <div className="mt-3 text-[10px] font-black text-brand-500">
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
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-3 sm:px-6">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              الأسئلة الشائعة
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.35] text-slate-950 sm:text-3xl lg:text-[36px]">
              أسئلة شائعة حول تداول المؤشرات
            </h2>

            <p className="mx-auto mt-3 max-w-[800px] text-[13px] leading-7 text-slate-600 sm:text-[15px]">
              إجابات مختصرة على أبرز الأسئلة حول شركات تداول المؤشرات
              وS&amp;P 500 وناسداك والرافعة المالية وتكاليف التداول.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {[
              {
                q: "ما هي أفضل شركة لتداول المؤشرات؟",
                a: "لا توجد شركة واحدة هي الأفضل لجميع المتداولين. يعتمد الاختيار على المؤشرات التي تريد تداولها، والتراخيص، والسبريد، والمنصة، وساعات التداول، ومتطلبات الهامش، وطرق الإيداع والسحب. يمكنك استخدام المقارنة أعلى الصفحة لمراجعة الشركات المتاحة في قاعدة بيانات بروكر العرب.",
              },
              {
                q: "ما هي أشهر المؤشرات للتداول؟",
                a: "من أشهر المؤشرات التي يتابعها المتداولون S&P 500 وNasdaq 100 وDow Jones في الولايات المتحدة، وDAX 40 في ألمانيا، وFTSE 100 في بريطانيا، وNikkei 225 في اليابان.",
              },
              {
                q: "كيف يمكن تداول مؤشر S&P 500؟",
                a: "يمكن الحصول على تعرض لمؤشر S&P 500 من خلال منتجات مالية مختلفة. لدى العديد من شركات التداول، يتم توفيره عبر عقود الفروقات CFD التي تسمح بالمضاربة على حركة سعر المؤشر دون امتلاك الأسهم المكونة له.",
              },
              {
                q: "ما الفرق بين US500 وS&P 500؟",
                a: "S&P 500 هو اسم المؤشر، بينما قد تستخدم بعض منصات التداول أسماء أو رموزًا مثل US500 أو SPX500 للأداة التي تتبع حركة المؤشر. اسم الرمز ومواصفات العقد تختلف من وسيط لآخر.",
              },
              {
                q: "ما الفرق بين NAS100 وNasdaq 100؟",
                a: "Nasdaq 100 هو المؤشر الأساسي، بينما NAS100 أو US100 من الرموز التي قد تستخدمها بعض شركات التداول لمنتجات تتبع حركة المؤشر. تحقق دائمًا من مواصفات الأداة لدى الوسيط.",
              },
              {
                q: "هل يمكن تداول المؤشرات بحساب إسلامي؟",
                a: "بعض شركات التداول توفر حسابات إسلامية أو خيارات بدون فوائد تبييت لبعض العملاء أو الأدوات، لكن الشروط تختلف حسب الوسيط والكيان التنظيمي والدولة. تحقق من شروط المؤشرات تحديدًا قبل فتح الصفقة.",
              },
              {
                q: "هل تداول المؤشرات مناسب للمبتدئين؟",
                a: "يمكن للمبتدئ تعلم تداول المؤشرات، لكن عقود الفروقات والرافعة المالية تنطوي على مخاطر مرتفعة. من المفيد فهم حجم العقد والهامش والسبريد ووقف الخسارة واستخدام حساب تجريبي قبل المخاطرة بأموال حقيقية.",
              },
              {
                q: "ما هو أقل سبريد لتداول المؤشرات؟",
                a: "لا يوجد رقم واحد ثابت، لأن السبريد يختلف حسب المؤشر والوسيط ونوع الحساب والسيولة ووقت التداول وظروف السوق. الأفضل مقارنة السبريد على المؤشر الذي ستتداوله فعليًا مثل US500 أو NAS100.",
              },
              {
                q: "هل يمكن تداول المؤشرات على MT5؟",
                a: "نعم، توفر العديد من شركات التداول عقود فروقات على المؤشرات من خلال MetaTrader 5، لكن عدد المؤشرات وشروط التداول تختلف حسب الوسيط والحساب والجهة القانونية.",
              },
              {
                q: "ما الفرق بين تداول المؤشرات وتداول الأسهم؟",
                a: "تداول سهم فردي يركز على حركة شركة واحدة، بينما المؤشر يقيس أداء مجموعة من الشركات. لذلك يمكن أن يتأثر المؤشر بحركة عدة شركات وقطاعات وعوامل اقتصادية في الوقت نفسه.",
              },
              {
                q: "ما هي أفضل منصة لتداول ناسداك وS&P 500؟",
                a: "يعتمد ذلك على احتياجات المتداول. من المنصات المستخدمة لدى شركات التداول MetaTrader 5 وMetaTrader 4 وcTrader وTradingView، إضافة إلى المنصات الخاصة بالوسطاء. قارن أدوات الرسم والتنفيذ والأوامر وتطبيق الهاتف قبل الاختيار.",
              },
              {
                q: "ما أفضل وقت لتداول المؤشرات الأمريكية؟",
                a: "تختلف السيولة والتقلب خلال اليوم، وغالبًا تتغير حركة المؤشرات الأمريكية بشكل ملحوظ حول افتتاح جلسة الأسهم الأمريكية والأخبار الاقتصادية المهمة. لكن ساعات التداول الفعلية للأداة تختلف حسب الوسيط، لذلك راجع مواصفات العقد.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-[17px] border border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-right sm:px-5">
                  <span className="text-[13px] font-black leading-6 text-slate-900 sm:text-[14px]">
                    {item.q}
                  </span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-100 px-4 py-4 text-[12px] leading-7 text-slate-600 sm:px-5 sm:text-[13px]">
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

      <section className="bg-white px-3 py-8 sm:px-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px]">
          <div className="relative overflow-hidden rounded-[24px] bg-[#071a31] px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.15)] sm:rounded-[30px] sm:px-8 sm:py-9 lg:px-10">

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-28 -top-32 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]" />

              <div className="absolute -bottom-36 right-[20%] h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-[100px]" />
            </div>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[850px] text-right">
                <div className="text-[10px] font-black text-cyan-300">
                  قارن قبل فتح الحساب
                </div>

                <h2 className="mt-2 text-[25px] font-black leading-[1.4] sm:text-3xl lg:text-[36px]">
                  اختر شركة تداول المؤشرات المناسبة لاحتياجاتك
                </h2>

                <p className="mt-3 max-w-[800px] text-[13px] leading-7 text-slate-300 sm:text-[14px]">
                  راجع الشركات المتاحة، وقارن المنصات والتقييم والحد
                  الأدنى للإيداع وشروط الحساب، ثم اقرأ تقييم الوسيط
                  بالتفصيل قبل اتخاذ قرار فتح الحساب.
                </p>
              </div>

              <a
                href="#best-indices-brokers"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-xl bg-[#2471df] px-6 text-[12px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:text-sm"
              >
                قارن شركات تداول المؤشرات
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
                تنبيه مخاطر:
              </strong>{" "}
              تداول عقود الفروقات والمنتجات ذات الرافعة المالية ينطوي
              على مستوى مرتفع من المخاطر وقد يؤدي إلى خسارة رأس المال.
              المعلومات الواردة في هذه الصفحة لأغراض المقارنة والتعليم
              العام ولا تمثل نصيحة استثمارية أو توصية بفتح حساب لدى شركة
              معينة. تختلف المنتجات والتراخيص والرافعة المالية وشروط
              التداول حسب الدولة والجهة القانونية ونوع العميل. تحقق من
              معلومات الوسيط وشروطه الرسمية قبل اتخاذ أي قرار مالي.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          FAQ STRUCTURED DATA
      =================================================== */}

      <Script
        id="indices-brokers-ar-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",

            mainEntity: [
              {
                "@type": "Question",
                name: "ما هي أفضل شركة لتداول المؤشرات؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "لا توجد شركة واحدة هي الأفضل لجميع المتداولين. يعتمد الاختيار على المؤشرات المتاحة والتراخيص والسبريد والمنصة وساعات التداول ومتطلبات الهامش وطرق الإيداع والسحب.",
                },
              },
              {
                "@type": "Question",
                name: "ما هي أشهر المؤشرات للتداول؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "من أشهر المؤشرات S&P 500 وNasdaq 100 وDow Jones وDAX 40 وFTSE 100 وNikkei 225.",
                },
              },
              {
                "@type": "Question",
                name: "كيف يمكن تداول مؤشر S&P 500؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "يمكن الحصول على تعرض لمؤشر S&P 500 من خلال منتجات مالية مختلفة، وتوفر العديد من شركات التداول عقود فروقات CFD تسمح بالمضاربة على حركة سعر المؤشر دون امتلاك الأسهم المكونة له.",
                },
              },
              {
                "@type": "Question",
                name: "ما الفرق بين US500 وS&P 500؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "S&P 500 هو اسم المؤشر، بينما قد تستخدم بعض منصات التداول رموزًا مثل US500 أو SPX500 للأداة التي تتبع حركة المؤشر. تختلف الرموز ومواصفات العقود حسب الوسيط.",
                },
              },
              {
                "@type": "Question",
                name: "ما الفرق بين NAS100 وNasdaq 100؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Nasdaq 100 هو المؤشر الأساسي، بينما NAS100 أو US100 من الرموز التي قد تستخدمها بعض شركات التداول لمنتجات تتبع حركة المؤشر.",
                },
              },
              {
                "@type": "Question",
                name: "هل يمكن تداول المؤشرات بحساب إسلامي؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "بعض شركات التداول توفر حسابات إسلامية أو خيارات بدون فوائد تبييت، لكن الشروط والأدوات المؤهلة تختلف حسب الوسيط والكيان التنظيمي والدولة.",
                },
              },
              {
                "@type": "Question",
                name: "هل تداول المؤشرات مناسب للمبتدئين؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "يمكن تعلم تداول المؤشرات، لكن عقود الفروقات والرافعة المالية تنطوي على مخاطر مرتفعة. يجب فهم حجم العقد والهامش والسبريد وإدارة المخاطر قبل التداول بأموال حقيقية.",
                },
              },
              {
                "@type": "Question",
                name: "ما هو أقل سبريد لتداول المؤشرات؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "لا يوجد سبريد ثابت لجميع الشركات، إذ يختلف حسب المؤشر والوسيط ونوع الحساب والسيولة ووقت التداول وظروف السوق.",
                },
              },
              {
                "@type": "Question",
                name: "هل يمكن تداول المؤشرات على MT5؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "توفر العديد من شركات التداول عقود فروقات على المؤشرات من خلال MetaTrader 5، لكن عدد المؤشرات وشروط التداول تختلف حسب الوسيط والحساب.",
                },
              },
              {
                "@type": "Question",
                name: "ما الفرق بين تداول المؤشرات وتداول الأسهم؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "السهم الفردي يرتبط بشركة واحدة، بينما المؤشر يقيس أداء مجموعة من الشركات، ولذلك يتأثر بحركة عدة شركات وقطاعات وعوامل اقتصادية.",
                },
              },
              {
                "@type": "Question",
                name: "ما هي أفضل منصة لتداول ناسداك وS&P 500؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "يعتمد اختيار المنصة على احتياجات المتداول. تشمل المنصات المستخدمة لدى الوسطاء MetaTrader 5 وMetaTrader 4 وcTrader وTradingView والمنصات الخاصة بالشركات.",
                },
              },
              {
                "@type": "Question",
                name: "ما أفضل وقت لتداول المؤشرات الأمريكية؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "تختلف السيولة والتقلب خلال اليوم وقد تتغير حركة المؤشرات الأمريكية حول افتتاح جلسة الأسهم والأخبار الاقتصادية. تختلف ساعات تداول الأداة حسب الوسيط ومواصفات العقد.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}