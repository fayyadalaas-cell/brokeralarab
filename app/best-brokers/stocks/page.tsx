import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: "أفضل شركات تداول الأسهم عبر الإنترنت 2026",

  description:
    "قارن أفضل شركات تداول الأسهم عبر الإنترنت في 2026 حسب التقييم والمنصات والتراخيص والحد الأدنى للإيداع والحساب الإسلامي، واختر وسيط تداول الأسهم الأنسب لك.",

  alternates: {
    canonical: "https://brokeralarab.com/best-brokers/stocks",

    languages: {
      ar: "https://brokeralarab.com/best-brokers/stocks",
      en: "https://brokeralarab.com/best-brokers/stocks",
      "x-default":
        "https://brokeralarab.com/best-brokers/stocks",
    },
  },

  openGraph: {
    title: "أفضل شركات تداول الأسهم عبر الإنترنت 2026",

    description:
      "دليل شامل لمقارنة أفضل شركات ووسطاء تداول الأسهم عبر الإنترنت حسب المنصات والتراخيص والحد الأدنى للإيداع والحسابات المتاحة.",

    url: "https://brokeralarab.com/best-brokers/stocks",

    type: "website",
    siteName: "بروكر العرب",
    locale: "ar_AR",
  },

  twitter: {
    card: "summary_large_image",

    title: "أفضل شركات تداول الأسهم عبر الإنترنت 2026",

    description:
      "قارن شركات تداول الأسهم والمنصات والحسابات المتاحة واختر الوسيط الأنسب لتداول الأسهم عبر الإنترنت.",
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
    broker?.name_ar ||
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
    broker?.islamic_ar ??
    broker?.islamic_account ??
    broker?.islamic ??
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
    normalized.includes("islamic")
  );
}

/* =========================================================
   STOCK BROKER SCORE
   ترتيب داخلي للعرض فقط — وليس ادعاء بأن شركة معينة
   هي الأفضل مطلقًا في السوق.
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
  broker: StockBroker;
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
          className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white font-extrabold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 ${
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

export default async function BestStockTradingBrokersPage() {
  const supabase = await createClient();

  /* =======================================================
     LOAD BROKERS

     نستخدم select("*") حاليًا لأن جدول brokers لديك يحتوي
     بالفعل على البيانات التي نحتاجها، ونريد أن يبقى الكود
     متوافقًا مع أسماء الأعمدة الحالية.
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
            تعذر تحميل بيانات شركات تداول الأسهم
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
        broker?.intro_ar ||
        broker?.intro ||
        null,

      bestFor:
        broker?.best_for_ar ||
        broker?.best_for ||
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

  /*
   * نعرض أول 8 شركات في المقارنة الرئيسية.
   * بقية الشركات يمكن استخدامها لاحقًا في الأقسام
   * التفصيلية داخل الصفحة.
   */
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
        name: "الرئيسية",
        item: "https://brokeralarab.com/",
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "أفضل الوسطاء",
        item:
          "https://brokeralarab.com/best-brokers",
      },

      {
        "@type": "ListItem",
        position: 3,
        name: "أفضل شركات تداول الأسهم",
        item:
          "https://brokeralarab.com/best-brokers/stocks",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name:
      "أفضل شركات تداول الأسهم عبر الإنترنت 2026",

    url:
      "https://brokeralarab.com/best-brokers/stocks",

    description:
      "دليل ومقارنة لأفضل شركات تداول الأسهم عبر الإنترنت حسب التقييم والمنصات والتراخيص والحد الأدنى للإيداع والحسابات المتاحة.",

    inLanguage: "ar",

    isPartOf: {
      "@type": "WebSite",
      name: "بروكر العرب",
      url: "https://brokeralarab.com",
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",

    name:
      "أفضل شركات تداول الأسهم 2026",

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
            : "https://brokeralarab.com/best-brokers/stocks",
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
        id="stock-brokers-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      <Script
        id="stock-brokers-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageJsonLd
            ),
        }}
      />

      <Script
        id="stock-brokers-itemlist-jsonld"
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
        {/* Background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

          <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative mx-auto max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
        

          {/* ===============================================
              BREADCRUMB
          =============================================== */}

          <nav
            aria-label="مسار الصفحة"
            className="hidden items-center justify-start gap-2 text-[10px] font-bold text-blue-200/75 sm:flex sm:text-xs"
          >
            <Link
              href="/best-brokers"
              className="transition hover:text-white"
            >
              أفضل الوسطاء
            </Link>

            <span className="text-blue-300/40">
              /
            </span>

            <span className="text-white">
              تداول الأسهم
            </span>
          </nav>

          {/* ===============================================
              HERO CONTENT
          =============================================== */}

          <div className="mt-0 text-right sm:mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              دليل تداول الأسهم 2026
            </div>

            <h1 className="mt-3 max-w-[1300px] text-[30px] font-black leading-[1.12] tracking-[-0.035em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
              <span className="block sm:inline">
                أفضل شركات
              </span>{" "}

              <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
                تداول الأسهم عبر الإنترنت 2026
              </span>
            </h1>

            {/* Mobile description */}

            <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
              قارن شركات تداول الأسهم حسب التقييم والمنصات
              والإيداع والحسابات المتاحة واختر الوسيط الأنسب لك.
            </p>

            {/* Desktop description */}

            <p className="mt-3 hidden max-w-[1180px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
              قارن أفضل شركات ووسطاء تداول الأسهم عبر الإنترنت
              حسب المنصات والتراخيص والحد الأدنى للإيداع
              والحسابات المتاحة، وتعرّف على كيفية اختيار وسيط
              مناسب للوصول إلى الأسهم والأسواق العالمية.
            </p>

            {/* Update information */}

            <div className="mt-2.5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
              <time
                dateTime="2026-10-05"
                className="inline-flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="sm:hidden">
                  محدثة في أكتوبر 2026
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

                بيانات من قاعدة بروكر العرب
              </span>
            </div>

            {/* =============================================
                STATS + BUTTONS
            ============================================= */}

            <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-start lg:gap-6">
              <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[620px]">
                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {stockBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    شركة تدعم الأسهم
                  </div>
                </div>

                <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {islamicStockBrokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    بحساب إسلامي
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
                  href="#best-stock-brokers"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
                >
                  <span className="sm:hidden">
                    أفضل الشركات
                  </span>

                  <span className="hidden sm:inline">
                    مقارنة شركات الأسهم
                  </span>

                  <span aria-hidden="true">
                    ←
                  </span>
                </a>

                <a
                  href="#stock-guide"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
                >
                  <span>
                    دليل تداول الأسهم
                  </span>

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
                href: "#best-stock-brokers",
                label: "أفضل شركات الأسهم",
              },

              {
                href: "#stock-guide",
                label: "دليل تداول الأسهم",
              },

              {
                href: "#stocks-vs-cfds",
                label: "الأسهم أم CFD",
              },

              {
                href: "#stock-platforms",
                label: "منصات الأسهم",
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
          BEST STOCK BROKERS
      =================================================== */}

      <section
        id="best-stock-brokers"
        className="scroll-mt-24 bg-[#f4f7fb] pb-8 pt-4 sm:pb-10 sm:pt-6 lg:pb-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.065)] sm:rounded-[28px]">

            {/* =============================================
                SECTION HEADER
            ============================================= */}

            <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f5f9ff_65%,#eaf4ff_100%)] px-4 py-5 sm:px-7 sm:py-6 lg:px-8">
              <div className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#2f80ed] to-[#1353a5]" />

              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 text-right">
                  <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[9px] font-black text-white sm:text-[11px]">
                    مقارنة الوسطاء
                  </span>

                  <h2 className="mt-3 text-[23px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[34px]">
                    أفضل شركات تداول الأسهم عبر الإنترنت
                  </h2>

                  <p className="mt-2 max-w-[1050px] text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                    تعرض المقارنة شركات التداول الموجودة في قاعدة
                    بيانات بروكر العرب التي توفر تداول الأسهم ضمن
                    الأدوات المالية المتاحة لديها. راجع المنصة
                    والحساب والرسوم ونوع المنتج المتاح قبل اتخاذ
                    قرار فتح الحساب.
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
                      من أصل {stockBrokers.length} شركة
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================
                IMPORTANT STOCK NOTICE
            ============================================= */}

            <div className="border-b border-slate-200 bg-amber-50/60 px-4 py-3 sm:px-7">
              <p className="text-[11px] font-bold leading-6 text-amber-900 sm:text-[13px]">
                <span className="font-black">
                  ملاحظة مهمة:
                </span>{" "}

                توفر الشركة لتداول الأسهم لا يعني بالضرورة شراء
                أسهم حقيقية. بعض الوسطاء يوفرون تداول الأسهم عبر
                عقود الفروقات (CFDs). سنشرح الفرق بالتفصيل في هذا
                الدليل، ويجب مراجعة نوع المنتج المتاح لدى الوسيط
                قبل التداول.
              </p>
            </div>

            {/* =============================================
                DESKTOP TABLE
            ============================================= */}

            <div className="hidden p-5 lg:block lg:p-6">
              <div className="overflow-hidden rounded-[18px] border border-slate-200 shadow-[0_7px_24px_rgba(15,23,42,0.055)]">
                <table className="w-full table-fixed text-right">
                  <thead className="bg-[linear-gradient(90deg,#071c34_0%,#0b3157_55%,#0d426f_100%)] text-white">
                    <tr className="text-[13px]">
                      <th className="w-[7%] px-3 py-4 text-center font-black">
                        الترتيب
                      </th>

                      <th className="w-[25%] px-5 py-4 font-black">
                        شركة التداول
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
                            <span
                              dir="ltr"
                              className="inline-block max-w-full text-[12px] font-black leading-6 text-slate-700"
                            >
                              {displayValue(
                                broker.platforms
                              )}
                            </span>
                          </td>

                          {/* Deposit */}

                          <td
                            dir="ltr"
                            className="px-4 py-[18px] text-center text-[14px] font-black text-slate-950"
                          >
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

            {/* =============================================
                MOBILE / TABLET CARDS
            ============================================= */}

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

                          <div
                            dir="ltr"
                            className="mt-0.5 line-clamp-1 text-[10px] font-black text-slate-900"
                          >
                            {displayValue(
                              broker.platforms
                            )}
                          </div>
                        </div>

                        <div className="border-l border-slate-200 px-1 py-2 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            الإيداع
                          </div>

                          <div
                            dir="ltr"
                            className="mt-0.5 text-[11px] font-black text-slate-900"
                          >
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

          - Quick answer / summary
          - What is online stock trading?
          - Real Stocks vs Stock CFDs
          - How stock trading works
          - US stock trading / NASDAQ / NYSE
          - Popular stocks: Apple, NVIDIA, Tesla...
          - Stock trading platforms
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
                  خلاصة الدليل
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  كيف تختار أفضل شركة لتداول الأسهم؟
                </h2>

                <p className="mt-3 max-w-[1050px] text-[14px] leading-8 text-slate-600 sm:text-[16px]">
                  اختيار شركة تداول الأسهم لا يعتمد على اسم الوسيط أو
                  التقييم وحده. ابدأ بتحديد ما إذا كنت تريد شراء الأسهم
                  الحقيقية للاستثمار أو تداول تحركات أسعار الأسهم عبر
                  عقود الفروقات، ثم قارن الترخيص والأسواق المتاحة
                  والمنصة والرسوم والحد الأدنى للإيداع وطريقة تنفيذ
                  الصفقات.
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                {[
                  {
                    number: "01",
                    title: "حدد نوع التداول",
                    text: "تأكد أولًا مما إذا كان الوسيط يوفر أسهمًا حقيقية أو عقود فروقات على الأسهم أو كليهما.",
                  },
                  {
                    number: "02",
                    title: "تحقق من الترخيص",
                    text: "راجع الكيان القانوني والجهة الرقابية التي سيُفتح حسابك تحت إشرافها.",
                  },
                  {
                    number: "03",
                    title: "قارن التكلفة",
                    text: "لا تنظر إلى السبريد وحده؛ راجع العمولة ورسوم التمويل والتحويل وأي رسوم أخرى.",
                  },
                  {
                    number: "04",
                    title: "اختر المنصة",
                    text: "تأكد أن منصة التداول مناسبة لطريقتك وتوفر الأدوات والأسواق التي تحتاج إليها.",
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
                7 نقاط افحصها في وسيط الأسهم
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "الترخيص والكيان القانوني",
                  "نوع الأسهم أو المنتج المتاح",
                  "الأسواق والبورصات المتوفرة",
                  "عمولة ورسوم التداول",
                  "منصة وأدوات التداول",
                  "الحد الأدنى للإيداع",
                  "الإيداع والسحب ودعم العملاء",
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
                  أساسيات تداول الأسهم
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  ما هو تداول الأسهم عبر الإنترنت؟
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    تداول الأسهم عبر الإنترنت هو الوصول إلى أسهم الشركات
                    والأسواق المالية من خلال وسيط ومنصة إلكترونية، بحيث
                    يستطيع المستخدم البحث عن السهم ومتابعة سعره وإرسال
                    أوامر الشراء أو البيع وإدارة مراكزه من الكمبيوتر أو
                    الهاتف.
                  </p>

                  <p>
                    السهم يمثل حصة في شركة مدرجة عندما يتم شراء السهم
                    الحقيقي، بينما توفر بعض شركات التداول منتجًا مختلفًا
                    هو عقد الفروقات على الأسهم
                    <span dir="ltr" className="font-bold text-slate-900">
                      {" "}Stock CFD
                    </span>
                    ، والذي يتيح التداول على تغير السعر دون امتلاك السهم
                    الأساسي نفسه.
                  </p>

                  <p>
                    لذلك فإن البحث عن أفضل شركة لتداول الأسهم يجب أن يبدأ
                    بالسؤال عن <strong className="text-slate-900">نوع المنتج</strong>{" "}
                    الذي يوفره الوسيط، وليس فقط عن عدد الأسهم أو اسم منصة
                    التداول. شروط الملكية والرافعة والرسوم والبيع على
                    المكشوف قد تختلف بشكل جوهري بين الأسهم الحقيقية وعقود
                    الفروقات.
                  </p>
                </div>
              </div>

              {/* Visual */}

              <div className="border-t border-slate-200 bg-[linear-gradient(145deg,#071a31_0%,#0b3157_100%)] p-5 lg:border-r lg:border-t-0 lg:p-7">
                <div className="flex h-full flex-col justify-center">
                 <div className="flex items-center justify-between gap-3">
  <div>
    <div className="text-[9px] font-black tracking-wide text-cyan-300 sm:text-[10px]">
      STOCK TRADING
    </div>

    <h3 className="mt-1.5 text-[19px] font-black leading-tight text-white sm:text-[22px]">
      رحلة تداول الأسهم
    </h3>
  </div>

  <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/10 text-lg text-cyan-300 sm:flex">
    ↗
  </div>
</div>

<p className="mt-2 text-[10px] font-medium leading-5 text-slate-300 sm:text-[11px]">
  من اختيار شركة التداول إلى تنفيذ وإدارة الصفقة.
</p>

                  <div className="mt-5 space-y-2">
                    {[
                      "اختيار شركة التداول",
                      "البحث عن السهم",
                      "تحديد حجم الصفقة",
                      "اختيار نوع الأمر",
                      "متابعة وإدارة الصفقة",
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
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              خطوة بخطوة
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
              كيف يعمل تداول الأسهم عبر الإنترنت؟
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              بعد فتح حساب لدى وسيط يوفر الأسهم، يمكنك استخدام منصة
              التداول للبحث عن الشركة التي تريد تداولها ثم اختيار نوع
              الأمر وحجم الصفقة. تختلف الخطوات الدقيقة حسب الوسيط ونوع
              المنتج المالي.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              {
                number: "1",
                title: "فتح حساب تداول",
                text: "اختر وسيطًا مناسبًا وأكمل إجراءات فتح الحساب والتحقق المطلوبة.",
              },
              {
                number: "2",
                title: "تمويل الحساب",
                text: "اختر وسيلة الإيداع المناسبة وتأكد من الحد الأدنى والرسوم المحتملة.",
              },
              {
                number: "3",
                title: "اختيار السهم",
                text: "ابحث عن الشركة أو رمز السهم مثل AAPL أو NVDA داخل المنصة.",
              },
              {
                number: "4",
                title: "إرسال الأمر",
                text: "حدد حجم الصفقة ونوع الأمر والسعر وإعدادات إدارة المخاطر.",
              },
              {
                number: "5",
                title: "إدارة المركز",
                text: "تابع السعر والمخاطر والتكاليف وأغلق المركز وفق خطتك.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4"
              >
                <div className="absolute -left-3 -top-5 text-[70px] font-black leading-none text-slate-200/60">
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
              أهم أنواع أوامر تداول الأسهم
            </h3>

            <p className="mt-2 max-w-[1000px] text-[13px] leading-7 text-slate-600 sm:text-sm">
              معرفة نوع الأمر تساعد المتداول على تحديد الطريقة التي يريد
              الدخول بها إلى السوق بدل الاعتماد على السعر المتاح في تلك
              اللحظة فقط.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                {
                  name: "Market Order",
                  ar: "أمر السوق",
                  text: "أمر لتنفيذ الصفقة بالسعر المتاح في السوق عند إرسال الأمر، مع احتمال اختلاف سعر التنفيذ الفعلي في الأسواق السريعة.",
                },
                {
                  name: "Limit Order",
                  ar: "أمر محدد",
                  text: "يسمح بتحديد سعر معين أو أفضل لتنفيذ الصفقة بدل الدخول مباشرة بالسعر المتاح.",
                },
                {
                  name: "Stop Order",
                  ar: "أمر إيقاف",
                  text: "يُفعّل عند وصول السعر إلى مستوى محدد، ويمكن استخدام أوامر الإيقاف ضمن استراتيجيات الدخول أو إدارة المخاطر.",
                },
              ].map((order) => (
                <div
                  key={order.name}
                  className="rounded-[17px] border border-slate-200 bg-white p-4"
                >
                  <div
                    dir="ltr"
                    className="text-[11px] font-black text-brand-500"
                  >
                    {order.name}
                  </div>

                  <h4 className="mt-1 text-[16px] font-black text-slate-950">
                    {order.ar}
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
                فرق أساسي
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                ما الفرق بين شراء الأسهم الحقيقية وتداول عقود CFD على الأسهم؟
              </h2>

              <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                عبارة "تداول الأسهم" قد تشير إلى منتجين مختلفين. عند
                شراء سهم حقيقي يمتلك المستثمر الأصل وفق شروط الوسيط
                والسوق، بينما عقد الفروقات هو عقد مالي يعتمد على حركة
                سعر الأصل دون امتلاك السهم الأساسي. معرفة الفرق ضرورية
                قبل اختيار شركة تداول الأسهم.
              </p>
            </div>

            {/* Desktop comparison */}

            <div className="hidden p-6 md:block lg:p-8">
              <div className="overflow-hidden rounded-[18px] border border-slate-200">
                <table className="w-full text-right">
                  <thead className="bg-[#071c34] text-white">
                    <tr>
                      <th className="w-[30%] px-5 py-4 text-sm font-black">
                        عنصر المقارنة
                      </th>

                      <th className="w-[35%] px-5 py-4 text-sm font-black">
                        الأسهم الحقيقية
                      </th>

                      <th className="w-[35%] px-5 py-4 text-sm font-black">
                        عقود CFD على الأسهم
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      {
                        label: "ملكية الأصل",
                        real: "يمتلك العميل السهم وفق هيكل وشروط الوسيط والحفظ.",
                        cfd: "لا يمتلك العميل السهم الأساسي؛ التداول يكون على عقد مرتبط بحركة السعر.",
                      },
                      {
                        label: "الرافعة المالية",
                        real: "تعتمد على نوع الحساب والسوق والقواعد المطبقة.",
                        cfd: "قد تكون متاحة، وتختلف حدودها حسب الوسيط والجهة التنظيمية والعميل.",
                      },
                      {
                        label: "البيع على المكشوف",
                        real: "يعتمد على الوسيط وتوفر الاقتراض وقواعد السوق.",
                        cfd: "قد يكون فتح مركز بيع متاحًا مباشرة حسب شروط الوسيط.",
                      },
                      {
                        label: "تكلفة الاحتفاظ",
                        real: "قد توجد عمولات ورسوم حفظ أو تحويل حسب الوسيط.",
                        cfd: "قد تشمل السبريد والعمولة ورسوم التمويل لليوم التالي.",
                      },
                      {
                        label: "توزيعات الأرباح",
                        real: "قد يستحق المساهم توزيعات الأرباح وفق شروط الملكية وتاريخ الاستحقاق.",
                        cfd: "قد تتم معالجة توزيعات الأرباح كتعديل نقدي وفق شروط العقد والوسيط.",
                      },
                      {
                        label: "المخاطر",
                        real: "يتعرض المستثمر لتقلب سعر السهم ومخاطر السوق.",
                        cfd: "تضاف مخاطر الرافعة والتكاليف المرتبطة بالعقد إلى مخاطر حركة السعر.",
                      },
                    ].map((row, index) => (
                      <tr
                        key={row.label}
                        className={`border-t border-slate-200 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50"
                        }`}
                      >
                        <td className="px-5 py-4 text-[13px] font-black text-slate-950">
                          {row.label}
                        </td>

                        <td className="px-5 py-4 text-[12px] font-medium leading-6 text-slate-600">
                          {row.real}
                        </td>

                        <td className="px-5 py-4 text-[12px] font-medium leading-6 text-slate-600">
                          {row.cfd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile comparison */}

            <div className="grid gap-3 p-3 md:hidden">
              {[
                {
                  label: "ملكية الأصل",
                  real: "امتلاك السهم وفق شروط الوسيط والحفظ.",
                  cfd: "لا توجد ملكية للسهم الأساسي.",
                },
                {
                  label: "الرافعة",
                  real: "تعتمد على الحساب والسوق.",
                  cfd: "قد تكون متاحة حسب الوسيط والجهة.",
                },
                {
                  label: "البيع",
                  real: "يعتمد على قواعد الوسيط والسوق.",
                  cfd: "قد يتاح فتح مركز بيع مباشرة.",
                },
                {
                  label: "التكاليف",
                  real: "عمولة ورسوم محتملة حسب الوسيط.",
                  cfd: "سبريد وعمولة وتمويل محتمل.",
                },
                {
                  label: "توزيعات الأرباح",
                  real: "قد يستحقها المساهم وفق الشروط.",
                  cfd: "قد تطبق كتعديل نقدي.",
                },
                {
                  label: "المخاطر",
                  real: "تقلب السهم ومخاطر السوق.",
                  cfd: "السوق بالإضافة إلى مخاطر الرافعة.",
                },
              ].map((row) => (
                <article
                  key={row.label}
                  className="overflow-hidden rounded-[16px] border border-slate-200 bg-white"
                >
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[12px] font-black text-slate-950">
                    {row.label}
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="border-l border-slate-200 p-3">
                      <div className="text-[9px] font-black text-brand-600">
                        أسهم حقيقية
                      </div>

                      <p className="mt-1.5 text-[10px] leading-5 text-slate-600">
                        {row.real}
                      </p>
                    </div>

                    <div className="p-3">
                      <div className="text-[9px] font-black text-slate-700">
                        Stock CFD
                      </div>

                      <p className="mt-1.5 text-[10px] leading-5 text-slate-600">
                        {row.cfd}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Important note */}

            <div className="border-t border-slate-200 bg-amber-50 px-5 py-4 sm:px-7">
              <p className="text-[12px] font-bold leading-7 text-amber-900 sm:text-[13px]">
                <strong>مهم:</strong> لا تفترض أن وجود كلمة Stocks أو
                Shares لدى شركة التداول يعني تلقائيًا شراء أسهم حقيقية.
                تحقق من صفحة المنتج وشروط الكيان الذي ستفتح الحساب من
                خلاله لمعرفة ما إذا كان المنتج سهمًا فعليًا أم عقد فروقات.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          STOCKS VS FOREX
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_26px_rgba(15,23,42,0.045)] sm:p-7">
              <span className="text-[10px] font-black text-brand-500">
                STOCKS
              </span>

              <h2 className="mt-2 text-[23px] font-black text-slate-950 sm:text-[28px]">
                تداول الأسهم أم الفوركس؟
              </h2>

              <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-sm sm:leading-8">
                في سوق الأسهم يركز المتداول على شركات محددة وأسعار
                أسهمها، بينما يعتمد سوق الفوركس على تداول أزواج العملات
                مثل EUR/USD. كما تختلف ساعات السوق والسيولة والعوامل
                المؤثرة في السعر وطبيعة الأخبار التي يتابعها المتداول.
              </p>

              <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-sm sm:leading-8">
                قد يتابع متداول الأسهم نتائج الشركة والإيرادات
                والتوجيهات المستقبلية وأخبار القطاع، بينما يهتم متداول
                العملات بصورة أكبر بالسياسة النقدية وأسعار الفائدة
                والبيانات الاقتصادية وحركة العملات.
              </p>
            </article>

            <article className="rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-7">
              <h3 className="text-lg font-black text-slate-950">
                مقارنة سريعة
              </h3>

              <div className="mt-4 space-y-2.5">
                {[
                  {
                    label: "الأصل",
                    stocks: "أسهم شركات",
                    forex: "أزواج عملات",
                  },
                  {
                    label: "أمثلة",
                    stocks: "AAPL / NVDA",
                    forex: "EUR/USD",
                  },
                  {
                    label: "محركات السعر",
                    stocks: "الشركة والقطاع والسوق",
                    forex: "الاقتصاد والفائدة والعملات",
                  },
                  {
                    label: "ساعات التداول",
                    stocks: "ترتبط عادة بساعات السوق",
                    forex: "يمتد السوق عبر جلسات عالمية",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[0.65fr_1fr_1fr] overflow-hidden rounded-xl border border-slate-200 bg-white text-center"
                  >
                    <div className="border-l border-slate-200 px-2 py-3 text-[9px] font-black text-slate-500">
                      {row.label}
                    </div>

                    <div className="border-l border-slate-200 px-2 py-3 text-[10px] font-black text-slate-900">
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
                  الأسواق العالمية
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  تداول الأسهم الأمريكية عبر الإنترنت
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    الأسهم الأمريكية من أكثر فئات الأسهم التي يبحث عنها
                    المتداولون عبر الإنترنت، وتشمل شركات مدرجة في أسواق
                    رئيسية مثل بورصة نيويورك
                    <span dir="ltr" className="font-bold text-slate-900">
                      {" "}NYSE
                    </span>{" "}
                    وناسداك
                    <span dir="ltr" className="font-bold text-slate-900">
                      {" "}NASDAQ
                    </span>
                    .
                  </p>

                  <p>
                    قبل اختيار وسيط لتداول الأسهم الأمريكية، تحقق من
                    قائمة الأدوات المتاحة لديه ونوع المنتج الذي يقدمه
                    والرسوم المرتبطة بالتداول، لأن عدد الأسهم والأسواق
                    وشروط الوصول إليها تختلف من شركة إلى أخرى.
                  </p>

                  <p>
                    كذلك يجب الانتباه إلى ساعات التداول وفروق التوقيت
                    وإمكانية التداول قبل أو بعد الجلسة الرئيسية إذا كانت
                    هذه الخاصية مهمة لاستراتيجيتك، وعدم افتراض توفرها لدى
                    جميع الوسطاء.
                  </p>
                </div>
              </div>

              {/* NYSE / NASDAQ cards */}

              <div className="grid gap-3 border-t border-slate-200 bg-[#f8fafc] p-5 sm:grid-cols-2 lg:grid-cols-1 lg:border-r lg:border-t-0 lg:p-7">
                <div className="flex flex-col justify-center rounded-[18px] border border-slate-200 bg-white p-5">
                  <div
                    dir="ltr"
                    className="text-[25px] font-black tracking-tight text-[#0b3157]"
                  >
                    NYSE
                  </div>

                  <div className="mt-1 text-[12px] font-black text-slate-950">
                    بورصة نيويورك
                  </div>

                  <p className="mt-2 text-[11px] leading-6 text-slate-500">
                    إحدى أهم أسواق الأسهم العالمية وتضم شركات من قطاعات
                    متعددة.
                  </p>
                </div>

                <div className="flex flex-col justify-center rounded-[18px] border border-slate-200 bg-white p-5">
                  <div
                    dir="ltr"
                    className="text-[25px] font-black tracking-tight text-[#0b3157]"
                  >
                    NASDAQ
                  </div>

                  <div className="mt-1 text-[12px] font-black text-slate-950">
                    سوق ناسداك
                  </div>

                  <p className="mt-2 text-[11px] leading-6 text-slate-500">
                    سوق أمريكي معروف بإدراج العديد من شركات التكنولوجيا
                    والشركات العالمية الكبرى.
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
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              أسهم عالمية معروفة
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
              أمثلة على أسهم يبحث عنها المتداولون
            </h2>

            <p className="mt-3 max-w-[1050px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              تختلف قائمة الأسهم المتاحة بين شركات التداول. من الأمثلة
              المعروفة في السوق الأمريكي أسهم شركات التكنولوجيا
              والسيارات والتجارة الإلكترونية، ويجب التحقق من توفر السهم
              المطلوب لدى الوسيط قبل فتح الحساب.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {[
              {
                symbol: "AAPL",
                name: "Apple",
                sector: "التكنولوجيا",
              },
              {
                symbol: "NVDA",
                name: "NVIDIA",
                sector: "أشباه الموصلات",
              },
              {
                symbol: "TSLA",
                name: "Tesla",
                sector: "السيارات",
              },
              {
                symbol: "AMZN",
                name: "Amazon",
                sector: "التجارة والتقنية",
              },
              {
                symbol: "MSFT",
                name: "Microsoft",
                sector: "التكنولوجيا",
              },
              {
                symbol: "META",
                name: "Meta",
                sector: "التكنولوجيا",
              },
            ].map((stock) => (
              <article
                key={stock.symbol}
                className="rounded-[17px] border border-slate-200 bg-[#f8fafc] p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_10px_25px_rgba(15,23,42,0.05)]"
              >
                <div
                  dir="ltr"
                  className="text-[18px] font-black text-brand-600"
                >
                  {stock.symbol}
                </div>

                <h3
                  dir="ltr"
                  className="mt-1 text-[13px] font-black text-slate-950"
                >
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
              ذكر هذه الشركات هو لأغراض تعليمية وتوضيحية فقط، ولا يعني
              أنها توصية بشراء أو بيع أي سهم. كما أن توفر كل سهم يختلف
              حسب شركة التداول والكيان والمنطقة.
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
                منصات التداول
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                ما أفضل منصة لتداول الأسهم؟
              </h2>

              <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                لا توجد منصة واحدة مناسبة لجميع المتداولين. يعتمد
                الاختيار على الأدوات التي تحتاجها وطريقة التداول
                والأسواق المتاحة لدى الوسيط. بعض شركات التداول توفر
                MetaTrader أو TradingView أو cTrader، بينما تستخدم شركات
                أخرى منصاتها الخاصة على الويب والهاتف.
              </p>
            </div>

            {/* Platforms */}

            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
              {[
                {
                  name: "MetaTrader 5",
                  short: "MT5",
                  text: "منصة متعددة الأصول توفر الرسوم البيانية والأوامر وأدوات التحليل، وتدعمها مجموعة من شركات التداول.",
                  href: "/best-mt5-brokers",
                },
                {
                  name: "MetaTrader 4",
                  short: "MT4",
                  text: "منصة تداول معروفة على نطاق واسع، إلا أن توفر الأسهم والأدوات المتاحة عليها يعتمد على الوسيط.",
                  href: "/best-mt4-brokers",
                },
                {
                  name: "TradingView",
                  short: "TV",
                  text: "معروفة بالرسوم البيانية وأدوات التحليل، وتوفر بعض شركات التداول تكاملًا مباشرًا معها.",
                  href: "/best-tradingview-brokers",
                },
                {
                  name: "cTrader",
                  short: "cT",
                  text: "منصة تداول حديثة بأدوات تنفيذ ورسوم بيانية، ويختلف نطاق الأصول المتاحة عليها حسب شركة التداول.",
                  href: "/best-ctrader-brokers",
                },
              ].map((platform) => (
                <article
                  key={platform.name}
                  className="relative flex h-full flex-col rounded-[19px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-center gap-3 sm:block">
  <div
    dir="ltr"
    className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#071c34] px-2 text-[11px] font-black text-white"
  >
    {platform.short}
  </div>

  <h3
    dir="ltr"
    className="flex-1 text-left text-[17px] font-black text-slate-950 sm:mt-4 sm:text-[18px]"
  >
    {platform.name}
  </h3>

  <span className="mr-auto rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[8px] font-black text-slate-500 sm:absolute sm:left-5 sm:top-5">
    منصة تداول
  </span>
</div>

                  <p className="mt-2 flex-1 text-[12px] leading-6 text-slate-600">
                    {platform.text}
                  </p>

                  {/*
                    نفعل الروابط عندما ننشئ صفحات المنصات.
                    حاليًا لا نريد روابط إلى صفحات 404.

                  <Link
                    href={platform.href}
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-black text-brand-600"
                  >
                    أفضل الشركات التي تدعم {platform.name}
                    <span>←</span>
                  </Link>
                  */}
                </article>
              ))}
            </div>

            {/* What to look for */}

            <div className="border-t border-slate-200 bg-[#f8fafc] px-5 py-5 sm:px-7">
              <h3 className="text-[17px] font-black text-slate-950">
                ماذا تبحث عنه في منصة تداول الأسهم؟
              </h3>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "سهولة البحث عن الأسهم والرموز",
                  "رسوم بيانية وأدوات تحليل",
                  "أنواع أوامر متعددة",
                  "إدارة واضحة للمراكز والمخاطر",
                  "تطبيق جيد للهاتف",
                  "سرعة واستقرار تنفيذ الأوامر",
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

          الجزء الثالث:
          - كيفية اختيار شركة تداول الأسهم بالتفصيل
          - التراخيص والأمان
          - رسوم وعمولات تداول الأسهم
          - الحد الأدنى للإيداع
          - الحساب الإسلامي
          - تداول الأسهم للمبتدئين
          - مخاطر تداول الأسهم
          - منهجية Broker Alarab
          - Internal Links
          - FAQ كاملة
          - FAQ Schema
          - الخاتمة + CTA
          - إغلاق main والدالة
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

          <div className="max-w-[1100px] text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              دليل الاختيار
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
              كيف تختار أفضل شركة لتداول الأسهم؟
            </h2>

            <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
              لا توجد شركة تداول واحدة مناسبة لجميع المستثمرين
              والمتداولين. الاختيار الصحيح يعتمد على الدولة التي تقيم
              فيها، ونوع الأسهم التي تريد الوصول إليها، وطريقة التداول،
              وحجم رأس المال، والمنصة التي تفضل استخدامها. لذلك ننصح
              بمقارنة مجموعة من العوامل قبل فتح الحساب.
            </p>
          </div>

          {/* Selection criteria */}

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                number: "01",
                title: "الترخيص والجهة الرقابية",
                text: "تحقق من الشركة القانونية التي ستفتح حسابك معها والجهة التي تشرف عليها. قد تعمل العلامة التجارية الواحدة من خلال أكثر من كيان، وقد تختلف الحماية وشروط التداول من كيان إلى آخر.",
              },

              {
                number: "02",
                title: "الأسهم والأسواق المتاحة",
                text: "إذا كنت تستهدف الأسهم الأمريكية أو البريطانية أو الأوروبية، تأكد من أن الوسيط يوفر السوق والأسهم التي تريدها بالفعل، وليس مجرد فئة عامة باسم Stocks.",
              },

              {
                number: "03",
                title: "الأسهم الحقيقية أم CFD",
                text: "حدد ما إذا كنت تريد امتلاك السهم نفسه أم التداول على حركة سعره من خلال عقد فروقات. المنتجين مختلفان من حيث الملكية والتكاليف والرافعة وبعض المخاطر.",
              },

              {
                number: "04",
                title: "العمولات والرسوم",
                text: "قارن عمولة تنفيذ الصفقة والسبريد ورسوم التمويل والتحويل وأي رسوم أخرى يمكن أن تؤثر في التكلفة الفعلية للتداول.",
              },

              {
                number: "05",
                title: "منصة تداول الأسهم",
                text: "اختر منصة مستقرة وسهلة الاستخدام وتوفر الرسوم البيانية وأنواع الأوامر والأدوات التي تحتاج إليها، وتأكد من توفر الأصول المطلوبة على المنصة نفسها.",
              },

              {
                number: "06",
                title: "الحد الأدنى للإيداع",
                text: "قارن متطلبات فتح وتمويل الحساب مع رأس المال الذي تخطط لاستخدامه. الإيداع الأقل لا يعني بالضرورة أن الوسيط أفضل، لكنه عامل مهم لبعض المتداولين.",
              },

              {
                number: "07",
                title: "الحساب الإسلامي",
                text: "إذا كنت تحتاج حسابًا إسلاميًا، تحقق من توفره على الحساب والأداة التي ستتداولها ومن الشروط المرتبطة بفترة الاحتفاظ وأي رسوم بديلة.",
              },

              {
                number: "08",
                title: "الإيداع والسحب",
                text: "راجع وسائل الدفع المتاحة والرسوم والحدود ووقت معالجة طلبات السحب، وتأكد من أن الخيارات مناسبة لبلد إقامتك.",
              },

              {
                number: "09",
                title: "خدمة العملاء",
                text: "الدعم الجيد يصبح مهمًا عند وجود مشكلة في الحساب أو الإيداع أو السحب. وجود دعم باللغة التي تفضلها وساعات خدمة مناسبة يمكن أن يصنع فرقًا.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="group rounded-[20px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.055)]"
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

                <p className="mt-2 text-[12px] leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          REGULATION AND SAFETY
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">

              {/* Content */}

              <article className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
                  التراخيص والأمان
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  كيف تتحقق من ترخيص شركة تداول الأسهم؟
                </h2>

                <div className="mt-4 space-y-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  <p>
                    الترخيص من أهم العناصر التي يجب فحصها عند اختيار
                    وسيط لتداول الأسهم عبر الإنترنت. لا يكفي أن تعرض
                    الشركة اسم جهة رقابية على موقعها، بل من المهم معرفة
                    اسم الكيان القانوني ورقم الترخيص والجهة التي تشرف
                    على الحساب الذي ستستخدمه.
                  </p>

                  <p>
                    تعمل بعض شركات التداول عالميًا من خلال عدة كيانات
                    قانونية. لذلك قد تختلف حدود الرافعة وبعض المنتجات
                    المتاحة وقواعد حماية أموال العملاء وآليات معالجة
                    الشكاوى حسب الدولة والكيان الذي يتم تسجيل العميل
                    لديه.
                  </p>

                  <p>
                    عند مراجعة أي وسيط، ابحث عن بيانات الشركة القانونية
                    في موقع الجهة الرقابية نفسها كلما أمكن، وقارنها
                    بالمعلومات التي يعرضها الوسيط.
                  </p>
                </div>

                <Link
                  href="/licenses"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#071c34] px-5 py-3 text-[12px] font-black text-white transition hover:bg-[#0b3157]"
                >
                  استكشف دليل تراخيص شركات التداول

                  <span aria-hidden="true">
                    ←
                  </span>
                </Link>
              </article>

              {/* Checklist */}

              <aside className="border-t border-slate-200 bg-[#071c34] p-5 text-white sm:p-7 lg:border-r lg:border-t-0">
                <div className="text-[10px] font-black text-cyan-300">
                  LICENSE CHECK
                </div>

                <h3 className="mt-3 text-xl font-black">
                  لا تفحص اسم الوسيط فقط
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-300">
                  عند التحقق من الترخيص ابحث عن هذه المعلومات:
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "اسم الشركة القانوني",
                    "اسم الجهة الرقابية",
                    "رقم الترخيص أو التسجيل",
                    "حالة الترخيص",
                    "الموقع الرسمي المسجل",
                    "الكيان الذي سيحمل حسابك",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-[9px] font-black text-cyan-300">
                        ✓
                      </span>

                      <span className="text-[11px] font-bold text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          STOCK TRADING FEES
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-right">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              تكلفة التداول
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-tight text-slate-950 sm:text-3xl lg:text-[36px]">
              ما هي رسوم وعمولات تداول الأسهم؟
            </h2>

            <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600 sm:text-[15px]">
              تكلفة تداول الأسهم تختلف حسب شركة التداول ونوع المنتج
              والحساب والسوق. لذلك لا ينبغي اختيار وسيط بناءً على عبارة
              "بدون عمولة" وحدها، بل يجب فهم التكلفة الإجمالية للصفقة.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "عمولة التداول",
                en: "Commission",
                text: "قد يفرض الوسيط عمولة ثابتة أو نسبة من قيمة الصفقة أو هيكلًا مختلفًا حسب السوق والحساب.",
              },
              {
                title: "فرق السعر",
                en: "Spread",
                text: "الفرق بين سعر الشراء والبيع ويمكن أن يمثل جزءًا من تكلفة الدخول والخروج من الصفقة.",
              },
              {
                title: "رسوم التمويل",
                en: "Overnight Financing",
                text: "قد تطبق على بعض المنتجات ذات الرافعة عند إبقاء المركز مفتوحًا لليوم التالي.",
              },
              {
                title: "رسوم أخرى",
                en: "Other Fees",
                text: "قد تشمل تحويل العملات أو السحب أو عدم النشاط أو رسومًا مرتبطة بسوق أو خدمة معينة.",
              },
            ].map((fee) => (
              <article
                key={fee.title}
                className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-5"
              >
                <div
                  dir="ltr"
                  className="text-[9px] font-black uppercase tracking-wide text-brand-500"
                >
                  {fee.en}
                </div>

                <h3 className="mt-1.5 text-[16px] font-black text-slate-950">
                  {fee.title}
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  {fee.text}
                </p>
              </article>
            ))}
          </div>

          {/* Internal link */}

          <div className="mt-5 flex flex-col gap-3 rounded-[18px] border border-blue-100 bg-blue-50/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h3 className="text-[14px] font-black text-slate-950">
                هل تبحث عن شركات تداول بتكاليف منخفضة؟
              </h3>

              <p className="mt-1 text-[11px] leading-6 text-slate-600">
                راجع مقارنتنا للحسابات حسب السبريد والعمولة والتكلفة.
              </p>
            </div>

            <Link
              href="/lowest-spread-brokers"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-[11px] font-black text-white transition hover:bg-brand-600"
            >
              أفضل شركات التداول بأقل سبريد

              <span>←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          MINIMUM DEPOSIT
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.045)] sm:rounded-[28px] sm:p-7 lg:p-9">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  رأس المال
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl">
                  كم تحتاج لبدء تداول الأسهم؟
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600">
                  لا يوجد مبلغ واحد يصلح لجميع المتداولين. الحد الأدنى
                  المطلوب يعتمد على شركة التداول ونوع الحساب وطريقة
                  الوصول إلى الأسهم. بعض الوسطاء يسمحون بفتح الحساب
                  بمبالغ منخفضة، بينما قد تتطلب منتجات أو خدمات معينة
                  رأس مال أكبر.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600">
                  الأهم هو ألا يتم اختيار حجم الإيداع بناءً على الحد
                  الأقصى الذي تستطيع دفعه، بل على خطة لإدارة المخاطر
                  وحجم الصفقات والخسارة التي يمكنك تحملها.
                </p>
              </div>

              <div className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-5">
                <h3 className="text-[15px] font-black text-slate-950">
                  قبل تحديد مبلغ الإيداع
                </h3>

                <div className="mt-4 space-y-3">
                  {[
                    "تحقق من الحد الأدنى لدى الوسيط",
                    "حدد حجم الصفقات المتوقع",
                    "احتفظ بهامش لإدارة المخاطر",
                    "لا تعتمد على الرافعة لزيادة المخاطرة",
                    "استخدم رأس مال يمكنك تحمل خسارته",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />

                      <span className="text-[11px] font-bold leading-6 text-slate-600">
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
          ISLAMIC STOCK TRADING
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
              <article className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
                  الحسابات الإسلامية
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  هل يمكن تداول الأسهم بحساب إسلامي؟
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  توفر بعض شركات التداول حسابات إسلامية أو خيارات
                  خالية من رسوم التبييت التقليدية على منتجات محددة.
                  لكن وصف الحساب بأنه "إسلامي" لا يعني أن جميع الأدوات
                  والشروط متطابقة بين الشركات.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  يجب مراجعة شروط الوسيط المتعلقة بالأسهم أو عقود
                  الفروقات، وفترة الاحتفاظ، وأي رسوم إدارية بديلة،
                  والأدوات المؤهلة للحساب الإسلامي قبل اتخاذ القرار.
                </p>

                <p className="mt-3 text-[12px] font-bold leading-7 text-slate-500">
                  بروكر العرب يعرض معلومات الحسابات للمقارنة ولا يقدم
                  فتوى شرعية. إذا كان الجانب الشرعي عاملًا أساسيًا في
                  قرارك، راجع تفاصيل العقد واستشر جهة شرعية مؤهلة عند
                  الحاجة.
                </p>
              </article>

              <aside className="border-t border-slate-200 bg-emerald-50/50 p-5 sm:p-7 lg:border-r lg:border-t-0">
                <div className="text-[34px] font-black text-emerald-700">
                  {islamicStockBrokers.length}
                </div>

                <div className="mt-1 text-[13px] font-black text-slate-950">
                  شركة في بياناتنا
                </div>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  من شركات الأسهم المدرجة في هذه الصفحة تظهر لدينا
                  كمزودة لخيار حساب إسلامي. تحقق دائمًا من شروط الشركة
                  الحالية.
                </p>

                {/*
                  عندما يكون لديك صفحة مخصصة للحساب الإسلامي
                  وتريد الربط بها، ضع الرابط الصحيح هنا.
                */}
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          BEGINNERS
      =================================================== */}

      <section className="bg-[#f4f7fb] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-[1100px]">
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
              للمبتدئين
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
              كيف تبدأ تداول الأسهم للمبتدئين؟
            </h2>

            <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
              البداية لا يجب أن تكون باختيار سهم عشوائي أو البحث عن أعلى
              رافعة مالية. من الأفضل فهم المنتج الذي ستتداوله، ثم تعلم
              استخدام المنصة والأوامر وإدارة المخاطر قبل زيادة حجم
              التداول.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                number: "1",
                title: "تعلم أساسيات الأسهم",
                text: "افهم معنى السهم وسعر السوق والقيمة السوقية والنتائج المالية وكيف يمكن للأخبار أن تؤثر في السعر.",
              },

              {
                number: "2",
                title: "اختر وسيطًا منظمًا",
                text: "ابدأ بمراجعة الترخيص والكيان القانوني ثم قارن الأسواق والمنصة والتكلفة.",
              },

              {
                number: "3",
                title: "استخدم حسابًا تجريبيًا",
                text: "إذا كان متاحًا، استخدم الحساب التجريبي للتعرف على المنصة وأنواع الأوامر قبل المخاطرة بأموال حقيقية.",
              },

              {
                number: "4",
                title: "ابدأ بحجم مناسب",
                text: "تجنب استخدام حجم صفقة كبير لمجرد توفر رافعة مالية، وحدد مستوى المخاطرة قبل تنفيذ الصفقة.",
              },

              {
                number: "5",
                title: "تعلم إدارة المخاطر",
                text: "حدد مسبقًا مقدار الخسارة التي يمكنك تحملها واستخدم أدوات إدارة الصفقة بطريقة تتناسب مع خطتك.",
              },

              {
                number: "6",
                title: "راجع أداءك",
                text: "احتفظ بسجل للصفقات والأسباب التي دفعتك للدخول والخروج، وراجع النتائج بدل تقييم الاستراتيجية من صفقة واحدة.",
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
          <div className="overflow-hidden rounded-[22px] border border-rose-200 bg-white sm:rounded-[28px]">
            <div className="border-b border-rose-100 bg-rose-50/60 px-5 py-6 sm:px-7 lg:px-8">
              <span className="inline-flex rounded-full border border-rose-200 bg-white px-3 py-1 text-[10px] font-black text-rose-700">
                المخاطر
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl">
                ما مخاطر تداول الأسهم عبر الإنترنت؟
              </h2>

              <p className="mt-3 max-w-[1100px] text-[14px] leading-8 text-slate-600">
                أسعار الأسهم يمكن أن ترتفع أو تنخفض، ولا توجد شركة تداول
                أو استراتيجية تستطيع ضمان الربح. وتزداد المخاطر عندما
                يستخدم المتداول الرافعة المالية أو يدخل السوق دون خطة
                واضحة لإدارة رأس المال.
              </p>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
              {[
                {
                  title: "مخاطر السوق",
                  text: "يمكن أن يتحرك سعر السهم بسرعة نتيجة نتائج الشركة أو الأخبار أو ظروف السوق.",
                },

                {
                  title: "مخاطر الرافعة",
                  text: "الرافعة يمكن أن تضخم الخسائر كما تضخم التعرض لحركة السعر.",
                },

                {
                  title: "مخاطر السيولة",
                  text: "قد تكون بعض الأسهم أقل سيولة، مما قد يؤثر في الأسعار والتنفيذ.",
                },

                {
                  title: "مخاطر الشركة",
                  text: "أداء الشركة وديونها ونتائجها وأحداثها الخاصة قد تؤثر مباشرة في قيمة سهمها.",
                },
              ].map((risk) => (
                <article
                  key={risk.title}
                  className="rounded-[17px] border border-rose-100 bg-rose-50/30 p-4"
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

            <div className="border-t border-rose-100 bg-rose-50/50 px-5 py-4 sm:px-7">
              <p className="text-[11px] font-bold leading-6 text-rose-900 sm:text-[12px]">
                تداول المنتجات ذات الرافعة المالية ينطوي على مخاطر
                مرتفعة وقد يؤدي إلى خسارة رأس المال. افهم المنتج وشروطه
                ومخاطره قبل التداول.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          METHODOLOGY
      =================================================== */}

      <section
        id="selection-method"
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <article className="p-5 sm:p-7 lg:p-9">
                <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                  منهجية بروكر العرب
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] text-slate-950 sm:text-3xl lg:text-[36px]">
                  كيف نقارن شركات تداول الأسهم؟
                </h2>

                <p className="mt-4 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  نستخدم بيانات شركات التداول الموجودة في قاعدة بيانات
                  بروكر العرب لتحديد الوسطاء الذين يذكرون الأسهم أو
                  Shares ضمن الأدوات المالية المتاحة، ثم ننظر إلى مجموعة
                  من العوامل التي تساعد المستخدم على المقارنة بين
                  الخيارات.
                </p>

                <p className="mt-3 text-[14px] leading-8 text-slate-600 sm:text-[15px]">
                  ترتيب الشركات في هذه الصفحة ليس ضمانًا للأداء ولا
                  توصية استثمارية، كما أن توفر المنتجات والشروط قد يختلف
                  حسب بلد العميل والكيان القانوني ونوع الحساب. لذلك يجب
                  مراجعة الشروط الحالية للوسيط قبل فتح الحساب.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "التقييم",
                    "توفر الأسهم",
                    "المنصات",
                    "الحد الأدنى للإيداع",
                    "الحساب الإسلامي",
                    "بيانات الترخيص",
                    "معلومات الحساب",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href="/how-we-review"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-black text-brand-600 transition hover:text-brand-700"
                >
                  اقرأ منهجية التقييم في بروكر العرب
                  <span>←</span>
                </Link>
              </article>

              {/* Dynamic methodology stats */}

              <aside className="border-t border-slate-200 bg-[#071c34] p-5 text-white sm:p-7 lg:border-r lg:border-t-0">
                <div className="text-[10px] font-black text-cyan-300">
                  BROKER ALARAB DATA
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-4 text-center">
                    <div className="text-[25px] font-black text-cyan-300">
                      {stockBrokers.length}
                    </div>

                    <div className="mt-1 text-[9px] font-bold text-slate-300">
                      شركة تدعم الأسهم
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-4 text-center">
                    <div className="text-[25px] font-black text-cyan-300">
                      {featuredBrokers.length}
                    </div>

                    <div className="mt-1 text-[9px] font-bold text-slate-300">
                      في المقارنة الرئيسية
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-4 text-center">
                    <div className="text-[25px] font-black text-cyan-300">
                      {islamicStockBrokers.length}
                    </div>

                    <div className="mt-1 text-[9px] font-bold text-slate-300">
                      بخيار إسلامي
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-4 text-center">
                    <div className="text-[25px] font-black text-cyan-300">
                      {platformNames.size}
                    </div>

                    <div className="mt-1 text-[9px] font-bold text-slate-300">
                      منصات رئيسية
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[10px] font-medium leading-6 text-slate-400">
                  الأرقام أعلاه يتم احتسابها من بيانات الشركات المستخدمة
                  في الصفحة بدل كتابتها يدويًا.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          RELATED GUIDES / INTERNAL LINKING
      =================================================== */}

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600">
                أدلة ذات صلة
              </span>

              <h2 className="mt-3 text-[25px] font-black text-slate-950 sm:text-3xl">
                قارن شركات التداول حسب احتياجاتك
              </h2>
            </div>

            <Link
              href="/best-brokers"
              className="text-[11px] font-black text-brand-600"
            >
              عرض أفضل الوسطاء ←
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "شركات التداول بأقل سبريد",
                text: "قارن حسابات التداول حسب السبريد والعمولة والتكلفة.",
                href: "/lowest-spread-brokers",
              },

              {
                title: "أفضل منصات تداول الذهب",
                text: "قارن الوسطاء والمنصات المناسبة لتداول الذهب.",
                href: "/best-gold-trading-platforms",
              },

              {
                title: "وسطاء بأقل إيداع",
                text: "اكتشف شركات التداول ذات متطلبات الإيداع المنخفضة.",
                href: "/lowest-minimum-deposit-brokers",
              },

              {
                title: "أفضل وسطاء السكالبينج",
                text: "قارن الوسطاء والحسابات المناسبة للتداول قصير الأجل.",
                href: "/best-scalping-brokers",
              },
            ].map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-[18px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.055)]"
              >
                <h3 className="text-[15px] font-black text-slate-950 transition group-hover:text-brand-600">
                  {guide.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {guide.text}
                </p>

                <div className="mt-4 text-[11px] font-black text-brand-600">
                  اقرأ الدليل ←
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          FAQ SCHEMA
      =================================================== */}

      <Script
        id="stock-brokers-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",

            mainEntity: [
              {
                "@type": "Question",
                name: "ما أفضل شركة لتداول الأسهم؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "لا توجد شركة واحدة مناسبة للجميع. يعتمد الاختيار على الترخيص ونوع الأسهم المتاحة والمنصة والرسوم والحد الأدنى للإيداع وبلد إقامة العميل.",
                },
              },

              {
                "@type": "Question",
                name: "كيف أبدأ تداول الأسهم عبر الإنترنت؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ابدأ بفهم نوع المنتج الذي تريد تداوله، ثم اختر وسيطًا مناسبًا، وافتح الحساب وأكمل التحقق، وبعدها يمكنك تمويل الحساب والبحث عن الأسهم وإرسال أوامر التداول مع إدارة المخاطر.",
                },
              },

              {
                "@type": "Question",
                name: "ما الفرق بين الأسهم الحقيقية وعقود CFD على الأسهم؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "شراء السهم الحقيقي يعني امتلاك الأصل وفق شروط الوسيط والحفظ، بينما عقد الفروقات يسمح بالتداول على حركة سعر السهم دون امتلاك السهم الأساسي.",
                },
              },

              {
                "@type": "Question",
                name: "هل يمكن تداول الأسهم الأمريكية عبر الإنترنت؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "نعم، توفر شركات تداول مختلفة الوصول إلى أسهم أمريكية أو منتجات مرتبطة بها، لكن قائمة الأسهم ونوع المنتج والأسواق المتاحة تختلف حسب الوسيط والكيان والمنطقة.",
                },
              },

              {
                "@type": "Question",
                name: "ما أفضل منصة لتداول الأسهم؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "يعتمد اختيار المنصة على احتياجات المتداول والأصول المتاحة لدى الوسيط. من المنصات المستخدمة MetaTrader 5 وTradingView وcTrader إضافة إلى منصات الوسطاء الخاصة.",
                },
              },

              {
                "@type": "Question",
                name: "كم أحتاج من المال لبدء تداول الأسهم؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "يختلف الحد الأدنى حسب شركة التداول ونوع الحساب والمنتج. يجب اختيار رأس المال وفق خطة إدارة المخاطر وليس فقط وفق الحد الأدنى الذي يسمح به الوسيط.",
                },
              },

              {
                "@type": "Question",
                name: "هل يمكن تداول الأسهم بحساب إسلامي؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "توفر بعض شركات التداول خيارات حساب إسلامي، لكن الشروط والأدوات المؤهلة والرسوم البديلة قد تختلف، لذلك يجب مراجعة تفاصيل الحساب لدى الوسيط.",
                },
              },

              {
                "@type": "Question",
                name: "هل يمكن تداول أسهم Apple وNVIDIA وTesla؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "توفر بعض شركات التداول أسهمًا أو عقود فروقات مرتبطة بشركات عالمية مثل Apple وNVIDIA وTesla، لكن التوفر ونوع المنتج يختلفان حسب الوسيط والمنطقة.",
                },
              },

              {
                "@type": "Question",
                name: "ما أهم رسوم تداول الأسهم؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "قد تشمل التكلفة عمولة التداول والسبريد ورسوم التمويل وتحويل العملات والسحب أو رسومًا أخرى، حسب الوسيط ونوع المنتج والحساب.",
                },
              },

              {
                "@type": "Question",
                name: "هل تداول الأسهم مناسب للمبتدئين؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "يمكن للمبتدئ تعلم تداول الأسهم، لكن من المهم فهم المنتج والمخاطر واستخدام أحجام مناسبة وتعلم إدارة المخاطر قبل زيادة حجم التداول.",
                },
              },
            ],
          }),
        }}
      />

      {/* ===================================================
          FAQ
      =================================================== */}

      <section
        id="faq"
        className="scroll-mt-24 bg-[#f4f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1100px] px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-brand-200 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
              FAQ
            </span>

            <h2 className="mt-3 text-[25px] font-black text-slate-950 sm:text-3xl lg:text-[36px]">
              أسئلة شائعة عن تداول الأسهم
            </h2>

            <p className="mx-auto mt-3 max-w-[800px] text-[13px] leading-7 text-slate-600 sm:text-sm">
              إجابات مختصرة على أهم الأسئلة التي يبحث عنها المستخدم قبل
              اختيار شركة أو منصة لتداول الأسهم عبر الإنترنت.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {[
              {
                question: "ما أفضل شركة لتداول الأسهم؟",
                answer:
                  "لا توجد شركة واحدة مناسبة لجميع المتداولين. قارن الترخيص ونوع الأسهم والأسواق المتاحة والمنصة والرسوم والحد الأدنى للإيداع، ثم اختر الشركة التي تتناسب مع احتياجاتك وبلد إقامتك.",
              },

              {
                question: "كيف أبدأ تداول الأسهم عبر الإنترنت؟",
                answer:
                  "ابدأ بفهم الفرق بين الأسهم الحقيقية وعقود الفروقات، ثم اختر وسيطًا مناسبًا وأكمل فتح الحساب والتحقق. بعد ذلك يمكنك تمويل الحساب والبحث عن السهم المطلوب واختيار نوع الأمر وحجم الصفقة مع تطبيق خطة لإدارة المخاطر.",
              },

              {
                question:
                  "ما الفرق بين الأسهم الحقيقية وعقود CFD على الأسهم؟",
                answer:
                  "عند شراء سهم حقيقي تكون هناك ملكية للأصل وفق هيكل وشروط الوسيط والحفظ. أما عقد CFD فهو عقد يعتمد على حركة سعر السهم دون امتلاك الأصل الأساسي، وقد تكون له شروط مختلفة للرافعة والتمويل والبيع.",
              },

              {
                question:
                  "هل يمكن تداول الأسهم الأمريكية عبر الإنترنت؟",
                answer:
                  "توفر شركات تداول مختلفة الوصول إلى الأسهم الأمريكية أو عقود مرتبطة بها، بما في ذلك أسهم مدرجة في NYSE وNASDAQ. لكن عدد الأسهم ونوع المنتج والأسواق المتاحة يختلف من وسيط إلى آخر.",
              },

              {
                question:
                  "ما أفضل منصة لتداول الأسهم؟",
                answer:
                  "يعتمد ذلك على احتياجاتك. بعض الوسطاء يستخدمون MT5 أو TradingView أو cTrader، بينما يوفر آخرون منصات خاصة. المهم هو توفر الأسهم التي تريدها وأدوات التحليل والأوامر وسهولة الاستخدام واستقرار المنصة.",
              },

              {
                question:
                  "كم أحتاج من المال لبدء تداول الأسهم؟",
                answer:
                  "يختلف الحد الأدنى حسب الوسيط والحساب والمنتج. لا ينبغي اختيار رأس المال بناءً على الحد الأدنى فقط؛ حدد المبلغ وفق قدرتك على تحمل الخسارة وخطة إدارة المخاطر.",
              },

              {
                question:
                  "هل يمكن تداول الأسهم بحساب إسلامي؟",
                answer:
                  "توفر بعض شركات التداول حسابات إسلامية أو خيارات خالية من رسوم التبييت التقليدية على منتجات محددة. يجب مراجعة شروط الأسهم والأدوات المؤهلة وفترات الاحتفاظ وأي رسوم بديلة لدى كل وسيط.",
              },

              {
                question:
                  "هل يمكن تداول أسهم Apple وNVIDIA وTesla؟",
                answer:
                  "تتوفر هذه الأسهم أو منتجات مرتبطة بها لدى عدد من شركات التداول، لكن لا يجب افتراض توفرها لدى كل وسيط. تحقق من قائمة الأدوات ونوع المنتج المتاح قبل فتح الحساب.",
              },

              {
                question:
                  "ما أهم الرسوم عند تداول الأسهم؟",
                answer:
                  "قد تشمل عمولة تنفيذ الصفقة والسبريد ورسوم التمويل لليوم التالي وتحويل العملات والسحب وعدم النشاط وغيرها. تختلف الرسوم حسب الوسيط والسوق ونوع الحساب والمنتج.",
              },

              {
                question:
                  "هل تداول الأسهم مناسب للمبتدئين؟",
                answer:
                  "يمكن للمبتدئ تعلم تداول الأسهم، لكن الأفضل البدء بفهم السوق وأنواع الأوامر والمخاطر واستخدام حساب تجريبي عند توفره، ثم استخدام أحجام صفقات مناسبة بدل البدء بمخاطرة مرتفعة.",
              },
            ].map((item, index) => (
              <details
                key={item.question}
                className="group overflow-hidden rounded-[17px] border border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5">
                  <h3 className="text-right text-[13px] font-black leading-6 text-slate-950 sm:text-[14px]">
                    {item.question}
                  </h3>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[12px] font-black text-brand-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-200 bg-[#f8fafc] px-4 py-4 sm:px-5">
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

      <section className="bg-white px-3 pb-10 pt-2 sm:px-6 sm:pb-14 lg:px-8">
        <div className="mx-auto max-w-[1520px]">
          <div className="relative overflow-hidden rounded-[24px] bg-[#071a31] px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.15)] sm:rounded-[30px] sm:px-8 sm:py-9 lg:px-10">
            {/* Background */}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_60%,#0c4279_100%)]" />

              <div className="absolute -left-24 -top-32 h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[90px]" />

              <div className="absolute -bottom-40 right-10 h-[300px] w-[300px] rounded-full bg-blue-500/15 blur-[90px]" />
            </div>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[850px]">
                <span className="inline-flex rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[9px] font-black text-cyan-200">
                  الخطوة التالية
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.25] sm:text-3xl lg:text-[36px]">
                  قارن شركة التداول قبل فتح حسابك
                </h2>

                <p className="mt-3 max-w-[800px] text-[13px] leading-7 text-slate-300 sm:text-sm sm:leading-8">
                  راجع تقييم الشركة وتراخيصها والحسابات والمنصات وشروط
                  التداول، وقارن أكثر من خيار قبل اتخاذ قرارك.
                </p>
              </div>

              <div className="grid shrink-0 grid-cols-2 gap-2.5">
                <Link
                  href="/best-brokers"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-500 px-4 text-[11px] font-black text-white transition hover:bg-brand-600 sm:px-5 sm:text-xs"
                >
                  أفضل الوسطاء
                </Link>

                <Link
                  href="/compare"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/[0.07] px-4 text-[11px] font-black text-white transition hover:bg-white/[0.12] sm:px-5 sm:text-xs"
                >
                  مقارنة الشركات
                </Link>
              </div>
            </div>
          </div>

          {/* ===============================================
              EDITORIAL / RISK NOTE
          =============================================== */}

          <div className="mx-auto mt-5 max-w-[1200px] text-center">
            <p className="text-[9px] font-medium leading-5 text-slate-400 sm:text-[10px] sm:leading-6">
              المعلومات الواردة في هذه الصفحة لأغراض المقارنة والتعليم
              ولا تشكل توصية استثمارية أو دعوة لشراء أو بيع أي أداة
              مالية. تختلف المنتجات والخدمات وشروط التداول حسب شركة
              التداول والكيان القانوني وبلد إقامة العميل. تحقق من
              المعلومات الحالية لدى الوسيط وافهم المخاطر قبل اتخاذ أي
              قرار مالي.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}