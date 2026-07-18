import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import LowestSpreadHeadToHeadEn from "@/app/components/LowestSpreadHeadToHeadEn";

export const metadata: Metadata = {
  title: "Best Low Spread Forex Brokers 2026 | Compare Trading Costs",

  description:
    "Compare the best low spread forex brokers in 2026 by average spreads, commissions, minimum deposits and total trading costs across Standard, Raw Spread, ECN and Cent accounts.",

  keywords: [
    "best low spread forex brokers",
    "lowest spread forex brokers",
    "tight spread forex brokers",
    "low cost forex brokers",
    "best raw spread brokers",
    "raw spread forex account",
    "best ECN brokers",
    "ECN forex account",
    "best standard forex account",
    "best cent account brokers",
    "low commission forex brokers",
    "best forex brokers for scalping",
    "forex spread comparison",
    "forex trading costs",
    "spread and commission comparison",
  ],

  alternates: {
    canonical: "https://brokeralarab.com/en/lowest-spread-brokers",

    languages: {
      en: "https://brokeralarab.com/en/lowest-spread-brokers",
      ar: "https://brokeralarab.com/lowest-spread-brokers",
      "x-default": "https://brokeralarab.com/en/lowest-spread-brokers",
    },
  },

  openGraph: {
    title: "Best Low Spread Forex Brokers 2026 | Broker Alarab",

    description:
      "Compare forex brokers by average spreads, commissions, minimum deposits and total trading costs across Standard, Raw Spread, ECN and Cent accounts.",

    url: "https://brokeralarab.com/en/lowest-spread-brokers",

    siteName: "Broker Alarab",

    type: "website",

    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",

    title: "Best Low Spread Forex Brokers 2026",

    description:
      "Compare Standard, Raw Spread, ECN and Cent accounts by spreads, commissions and total trading costs.",
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

type BrokerAccountRow = {
  id: number;
  broker_id: number;
  account_name: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  sort_order: number | null;
  spread_avg: number | null;
  spread_min: number | null;
  commission_value: number | null;
  account_type: string | null;
  is_islamic_available: boolean | null;
  islamic_conditions: string | null;
};

type BrokerGenericRow = {
  [key: string]: any;
};

type PreparedAccount = BrokerAccountRow & {
  broker_name: string;
  broker_slug: string | null;
  broker_rating: number | string | null;
  broker_logo: string | null;
  broker_intro: string | null;
  broker_best_for: string | null;
  broker_account_url: string | null;
  broker_website_url: string | null;
  broker_islamic_label: string | null;
  broker_arabic_support: string | null;
  normalized_account_type: string;
  total_cost_score: number;
};

type BrokerSummary = {
  broker_id: number;
  broker_name: string;
  broker_slug: string | null;
  broker_logo: string | null;
  broker_rating: number | string | null;
  broker_account_url: string | null;
  broker_website_url: string | null;
  best_standard?: PreparedAccount | null;
  best_raw?: PreparedAccount | null;
  best_ecn?: PreparedAccount | null;
  best_cent?: PreparedAccount | null;
  best_overall?: PreparedAccount | null;
};

function toNumber(value: unknown, fallback = 9999) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function normalizeAccountType(value: string | null | undefined) {
  const normalizedValue = (value || "").toLowerCase().trim();

  if (!normalizedValue) return "other";

  if (
    ["standard", "raw", "ecn", "zero", "pro", "cent"].includes(
      normalizedValue
    )
  ) {
    return normalizedValue;
  }

  return "other";
}

function accountSlug(value: string | null | undefined) {
  if (!value) return "";

  return value
    .toLowerCase()
    .trim()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function getAccountTypeLabel(type: string) {
  const labels: Record<string, string> = {
    standard: "Standard Accounts",
    raw: "Raw Spread Accounts",
    ecn: "ECN Accounts",
    zero: "Zero Spread Accounts",
    pro: "Professional Accounts",
    cent: "Cent and Micro Accounts",
    other: "Other Trading Accounts",
  };

  return labels[type] || type;
}

function getAccountTypeShortLabel(type: string) {
  const labels: Record<string, string> = {
    standard: "Standard",
    raw: "Raw Spread",
    ecn: "ECN",
    zero: "Zero",
    pro: "Pro",
    cent: "Cent / Micro",
    other: "Other",
  };

  return labels[type] || type;
}

function getAccountTypeIntro(type: string) {
  const introductions: Record<string, string> = {
    standard:
      "Standard accounts usually include trading costs within the spread and charge no separate commission.",

    raw:
      "Raw Spread accounts offer tighter pricing with a separate commission and suit active traders and scalpers.",

    ecn:
      "ECN accounts focus on competitive pricing and fast execution, although commissions vary between brokers.",

    cent:
      "Cent and Micro accounts support smaller positions and can suit beginners, testing and lower-risk trading.",

    other:
      "Compare spreads, commissions, deposits and execution terms before choosing an account.",
  };

  return introductions[type] || introductions.other;
}

function getAccountTypeRecommendation(type: string) {
  const recommendations: Record<string, string> = {
    standard: "Suitable for beginners and casual traders",
    raw: "Suitable for scalping and active trading",
    ecn: "Suitable for execution-focused traders",
    cent: "Suitable for beginners and small balances",
    other: "Review the full account conditions",
  };

  return recommendations[type] || recommendations.other;
}

function compareByRealCost(a: PreparedAccount, b: PreparedAccount) {
  if (a.total_cost_score !== b.total_cost_score) {
    return a.total_cost_score - b.total_cost_score;
  }

  if (toNumber(a.spread_avg) !== toNumber(b.spread_avg)) {
    return toNumber(a.spread_avg) - toNumber(b.spread_avg);
  }

  if (toNumber(a.spread_min) !== toNumber(b.spread_min)) {
    return toNumber(a.spread_min) - toNumber(b.spread_min);
  }

  return (a.sort_order ?? 999) - (b.sort_order ?? 999);
}

function getBrokerName(
  broker: BrokerGenericRow | undefined,
  brokerId: number
) {
  return (
    broker?.name_en ||
    broker?.name ||
    broker?.title ||
    broker?.broker_name ||
    broker?.slug ||
    broker?.name_ar ||
    `Broker ${brokerId}`
  );
}

function getBrokerSlug(broker: BrokerGenericRow | undefined) {
  return broker?.slug || broker?.broker_slug || null;
}

function getBrokerRating(broker: BrokerGenericRow | undefined) {
  return broker?.rating ?? broker?.score ?? broker?.overall_rating ?? null;
}

function getBrokerLogo(broker: BrokerGenericRow | undefined) {
  return broker?.logo || broker?.logo_url || broker?.image || null;
}

function getBrokerAccountUrl(broker: BrokerGenericRow | undefined) {
  return (
    broker?.real_account_url ||
    broker?.account_url ||
    broker?.website_url ||
    null
  );
}

function getBrokerWebsiteUrl(broker: BrokerGenericRow | undefined) {
  return broker?.website_url || broker?.account_url || null;
}

function formatRating(value: number | string | null) {
  if (value === null || value === undefined || value === "") return null;

  const rating = Number(value);

  if (!Number.isFinite(rating)) return String(value);

  return rating.toFixed(1);
}

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

function RankingBadge({ index }: { index: number }) {
  return (
    <span
      className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[11px] font-black ${
        index === 0
          ? "bg-amber-100 text-amber-800"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      #{index + 1}
    </span>
  );
}

function AccountLink({ item }: { item: PreparedAccount }) {
  if (!item.broker_slug || !item.account_name) {
    return (
      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-extrabold text-slate-600">
        {item.account_name || "—"}
      </span>
    );
  }

  return (
    <Link
      href={`/en/brokers/${item.broker_slug}/accounts/${accountSlug(
        item.account_name
      )}`}
      className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[11px] font-extrabold text-brand-600 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
    >
      {item.account_name}
    </Link>
  );
}

function ActionButtons({
  item,
  compact = false,
}: {
  item: PreparedAccount;
  compact?: boolean;
}) {
  const reviewHref = item.broker_slug
    ? `/en/brokers/${item.broker_slug}`
    : null;

  const accountHref =
    item.broker_account_url ||
    item.broker_website_url ||
    null;

  if (!reviewHref && !accountHref) return null;

  return (
    <div
      className={`flex items-center gap-2 ${
        compact ? "justify-center" : "w-full"
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
          Review
        </Link>
      ) : null}

      {accountHref ? (
        <a
          href={accountHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-xl bg-brand-500 font-extrabold text-white shadow-sm transition hover:bg-brand-600 ${
            compact
              ? "min-w-[90px] px-3 py-2 text-[11px]"
              : "flex-1 px-4 py-2.5 text-xs"
          }`}
        >
          Open Account
        </a>
      ) : null}
    </div>
  );
}

export default async function LowestSpreadBrokersPage() {
  const supabase = await createClient();

  const { data: accountsData, error: accountsError } = await supabase
    .from("broker_accounts")
    .select(`
      id,
      broker_id,
      account_name,
      spread,
      commission,
      min_deposit,
      execution_type,
      best_for,
      sort_order,
      spread_avg,
      spread_min,
      commission_value,
      account_type,
      is_islamic_available,
      islamic_conditions
    `)
    .order("broker_id", { ascending: true })
    .order("sort_order", { ascending: true });

  if (accountsError) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-16">
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7">
          <h1 className="text-2xl font-black text-slate-950">
            Unable to load trading account data
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {accountsError.message}
          </p>
        </div>
      </main>
    );
  }

  const brokerIds = Array.from(
    new Set(
      (accountsData ?? [])
        .map((row) => row.broker_id)
        .filter((brokerId): brokerId is number => Boolean(brokerId))
    )
  );

  const { data: brokersData, error: brokersError } = await supabase
    .from("brokers")
    .select("*")
    .in("id", brokerIds);

  if (brokersError) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-16">
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7">
          <h1 className="text-2xl font-black text-slate-950">
            Unable to load forex broker data
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {brokersError.message}
          </p>
        </div>
      </main>
    );
  }

  const brokersMap = new Map<number, BrokerGenericRow>(
    ((brokersData ?? []) as BrokerGenericRow[]).map((broker) => [
      broker.id,
      broker,
    ])
  );

  const accounts: PreparedAccount[] = (
    (accountsData ?? []) as BrokerAccountRow[]
  ).map((row) => {
    const broker = brokersMap.get(row.broker_id);

    const spreadAverage = toNumber(row.spread_avg);
    const commissionValue = toNumber(row.commission_value ?? 0, 0);

    return {
      ...row,

      broker_name: getBrokerName(broker, row.broker_id),

      broker_slug: getBrokerSlug(broker),

      broker_rating: getBrokerRating(broker),

      broker_logo: getBrokerLogo(broker),

      broker_intro:
        broker?.intro_en ||
        broker?.intro ||
        null,

      broker_best_for:
        broker?.best_for_en ||
        broker?.best_for ||
        null,

      broker_account_url: getBrokerAccountUrl(broker),

      broker_website_url: getBrokerWebsiteUrl(broker),

      broker_islamic_label:
        broker?.islamic_en ??
        broker?.islamic ??
        null,

      broker_arabic_support:
        broker?.arabic_support ??
        broker?.arabic_sup ??
        null,

      normalized_account_type: normalizeAccountType(row.account_type),

      total_cost_score: spreadAverage + commissionValue / 10,
    };
  });

  const groupedByType = ["standard", "raw", "ecn", "cent"]
    .map((type) => {
      const items = accounts
        .filter(
          (account) => account.normalized_account_type === type
        )
        .sort(compareByRealCost);

      return {
        type,

        label: getAccountTypeLabel(type),

        shortLabel: getAccountTypeShortLabel(type),

        intro: getAccountTypeIntro(type),

        recommendation: getAccountTypeRecommendation(type),

        winner: items[0] || null,

        items,
      };
    })
    .filter((group) => group.items.length > 0);

  const bestOverall = [...accounts]
    .sort(compareByRealCost)
    .slice(0, 8);

  const uniqueBrokerCount = new Set(
    accounts.map((account) => account.broker_id)
  ).size;

  const bestStandard =
    groupedByType.find((group) => group.type === "standard")
      ?.winner || null;

  const bestRaw =
    groupedByType.find((group) => group.type === "raw")
      ?.winner || null;

  const bestEcn =
    groupedByType.find((group) => group.type === "ecn")
      ?.winner || null;

  const bestCent =
    groupedByType.find((group) => group.type === "cent")
      ?.winner || null;

  const brokerSummaries: BrokerSummary[] = Array.from(
    new Set(accounts.map((account) => account.broker_id))
  )
    .map((brokerId) => {
      const brokerAccounts = accounts
        .filter((account) => account.broker_id === brokerId)
        .sort(compareByRealCost);

      const firstAccount = brokerAccounts[0];

      if (!firstAccount) return null;

      return {
        broker_id: brokerId,

        broker_name: firstAccount.broker_name,

        broker_slug: firstAccount.broker_slug,

        broker_logo: firstAccount.broker_logo,

        broker_rating: firstAccount.broker_rating,

        broker_account_url: firstAccount.broker_account_url,

        broker_website_url: firstAccount.broker_website_url,

        best_standard:
          brokerAccounts.find(
            (account) =>
              account.normalized_account_type === "standard"
          ) || null,

        best_raw:
          brokerAccounts.find(
            (account) =>
              account.normalized_account_type === "raw"
          ) || null,

        best_ecn:
          brokerAccounts.find(
            (account) =>
              account.normalized_account_type === "ecn"
          ) || null,

        best_cent:
          brokerAccounts.find(
            (account) =>
              account.normalized_account_type === "cent"
          ) || null,

        best_overall: firstAccount,
      };
    })
    .filter(Boolean) as BrokerSummary[];

  const faqJsonLd = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",

        name: "What is a low spread forex broker?",

        acceptedAnswer: {
          "@type": "Answer",

          text: "A low spread forex broker offers a relatively small difference between the bid and ask price. Traders should also consider commissions because the lowest advertised spread does not always produce the lowest total trading cost.",
        },
      },

      {
        "@type": "Question",

        name: "Is the forex account with the lowest spread always the cheapest?",

        acceptedAnswer: {
          "@type": "Answer",

          text: "No. The total trading cost can include the average spread, a separate commission, execution quality and other account conditions. Raw Spread and ECN accounts may offer tight spreads while charging a commission.",
        },
      },

      {
        "@type": "Question",

        name: "What is the difference between Standard, Raw Spread and ECN accounts?",

        acceptedAnswer: {
          "@type": "Answer",

          text: "Standard accounts usually include trading costs within the spread, while Raw Spread and ECN accounts generally offer tighter pricing with a separate commission. Account structures vary between brokers.",
        },
      },
    ],
  };

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

        name: "Best Forex Brokers",

        item: "https://brokeralarab.com/en/best-brokers",
      },

      {
        "@type": "ListItem",

        position: 3,

        name: "Best Low Spread Forex Brokers",

        item:
          "https://brokeralarab.com/en/lowest-spread-brokers",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",

    "@type": "WebPage",

    name: "Best Low Spread Forex Brokers 2026",

    url:
      "https://brokeralarab.com/en/lowest-spread-brokers",

    description:
      "Compare low spread forex brokers by account type, average spreads, commissions, minimum deposits and total trading costs.",

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

    name: "Best Low Spread Forex Brokers",

    itemListOrder:
      "https://schema.org/ItemListOrderAscending",

    numberOfItems: bestOverall.length,

    itemListElement: bestOverall.map((item, index) => ({
      "@type": "ListItem",

      position: index + 1,

      name: `${item.broker_name} - ${
        item.account_name || "Forex Trading Account"
      }`,

      url:
        item.broker_slug && item.account_name
          ? `https://brokeralarab.com/en/brokers/${
              item.broker_slug
            }/accounts/${accountSlug(item.account_name)}`
          : item.broker_slug
          ? `https://brokeralarab.com/en/brokers/${item.broker_slug}`
          : "https://brokeralarab.com/en/lowest-spread-brokers",
    })),
  };

  const heroWinners = [
    {
      type: "standard",

      label: "Best Standard",

      item: bestStandard,
    },

    {
      type: "raw",

      label: "Best Raw Spread",

      item: bestRaw,
    },

    {
      type: "ecn",

      label: "Best ECN",

      item: bestEcn,
    },
  ].filter(
    (
      winner
    ): winner is {
      type: string;
      label: string;
      item: PreparedAccount;
    } => Boolean(winner.item)
  );

  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f5f7fb] text-slate-900"
    >
      <Script
        id="lowest-spread-faq-jsonld-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <Script
        id="lowest-spread-breadcrumb-jsonld-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <Script
        id="lowest-spread-webpage-jsonld-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <Script
        id="lowest-spread-itemlist-jsonld-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      {/* HERO */}
      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-9 lg:px-8 lg:py-10 xl:px-10">
          <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.65fr)] lg:gap-10 xl:gap-12">
            {/* HERO CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-600 sm:py-1.5 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 sm:h-2 sm:w-2" />

                2026 Forex Account Comparison
              </div>

              <h1 className="mt-4 max-w-[980px] text-[30px] font-black leading-[1.18] tracking-[-0.02em] text-slate-950 min-[380px]:text-[32px] sm:text-[46px] sm:leading-[1.12] lg:text-[54px] xl:text-[60px]">
                Best Low Spread

                <span className="mt-1 block text-brand-500">
                  Forex Brokers in 2026
                </span>
              </h1>

              <p className="mt-4 max-w-[850px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Compare the best low spread forex brokers by{" "}

                <strong className="font-black text-slate-900">
                  average spreads, commissions and total trading
                  costs
                </strong>

                . We evaluate Standard, Raw Spread, ECN and Cent
                accounts separately to provide a fair account-level
                comparison.
              </p>

              <div className="mt-5 grid max-w-[640px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center sm:px-4">
                  <div className="text-xl font-black text-slate-950 sm:text-2xl">
                    {uniqueBrokerCount}
                  </div>

                  <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:text-xs">
                    Brokers Compared
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center sm:px-4">
                  <div className="text-xl font-black text-slate-950 sm:text-2xl">
                    {accounts.length}
                  </div>

                  <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:text-xs">
                    Trading Accounts
                  </div>
                </div>

                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center sm:block">
                  <div className="text-2xl font-black text-slate-950">
                    {groupedByType.length}
                  </div>

                  <div className="mt-0.5 text-xs font-bold text-slate-500">
                    Account Categories
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">
                <a
                  href="#account-types"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(30,91,184,0.18)] transition hover:bg-brand-600 sm:w-auto sm:min-w-[220px]"
                >
                  Compare Account Types
                </a>

                <a
                  href="#head-to-head"
                  className="hidden min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 sm:inline-flex sm:min-w-[200px]"
                >
                  Compare Two Brokers
                </a>
              </div>
            </div>

            {/* DESKTOP SUMMARY */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50/70 px-5 py-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-950">
                      Top Account in Each Category
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      A quick look at our leading results
                    </p>
                  </div>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">
                    Updated
                  </span>
                </div>

                <div className="divide-y divide-slate-200">
                  {heroWinners.map(
                    ({ type, label, item }, index) => (
                      <div
                        key={type}
                        className="grid grid-cols-[32px_40px_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3.5"
                      >
                        <RankingBadge index={index} />

                        <CompactLogo
                          src={item.broker_logo}
                          alt={item.broker_name}
                          size="small"
                        />

                        <div className="min-w-0">
                          <div className="truncate text-sm font-black text-slate-950">
                            {item.broker_name}
                          </div>

                          <div className="mt-0.5 truncate text-[11px] font-bold text-slate-500">
                            {item.account_name || "—"}
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-[10px] font-extrabold text-brand-600">
                            {label}
                          </div>

                          <div className="mt-0.5 text-xs font-black text-emerald-700">
                            {item.spread || "—"}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="border-t border-slate-200 bg-slate-50 px-5 py-3">
                  <p className="text-[11px] leading-5 text-slate-500">
                    Rankings consider average spreads, commissions
                    and estimated total trading costs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE QUICK WINNERS */}
          <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 lg:hidden">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
              <h2 className="text-sm font-black text-slate-950">
                Top Account Picks
              </h2>

              <span className="text-[10px] font-extrabold text-brand-600">
                By Account Type
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {heroWinners.map(
                ({ type, label, item }, index) => (
                  <div
                    key={type}
                    className="grid grid-cols-[30px_36px_minmax(0,1fr)_auto] items-center gap-2.5 px-3.5 py-3"
                  >
                    <RankingBadge index={index} />

                    <CompactLogo
                      src={item.broker_logo}
                      alt={item.broker_name}
                      size="small"
                    />

                    <div className="min-w-0">
                      <div className="truncate text-sm font-black text-slate-950">
                        {item.broker_name}
                      </div>

                      <div className="mt-0.5 truncate text-[10px] font-bold text-slate-500">
                        {item.account_name || "—"}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-[9px] font-extrabold text-brand-600">
                        {label}
                      </div>

                      <div className="mt-0.5 text-[11px] font-black text-emerald-700">
                        {item.spread || "—"}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PAGE NAVIGATION */}
      <section className="hidden border-b border-slate-200 bg-white sm:block">
        <div className="mx-auto max-w-[1520px] px-6 py-3 lg:px-8 xl:px-10">
          <nav
            aria-label="Page sections"
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {[
              {
                href: "#account-types",
                label: "Compare Account Types",
              },

              {
                href: "#head-to-head",
                label: "Compare Brokers",
              },

              {
                href: "#best-by-category",
                label: "Top Account Picks",
              },

              {
                href: "#selection-method",
                label: "How We Rank",
              },

              {
                href: "#faq",
                label: "Frequently Asked Questions",
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

      {/* ACCOUNT TYPES */}
      <section
        id="account-types"
        className="scroll-mt-24 pb-8 pt-7 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          {/* SECTION INTRO */}
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-8">
            <div className="max-w-[950px]">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                Account-Level Cost Comparison
              </span>

              <h2 className="mt-3 max-w-[340px] text-[24px] font-black leading-[1.28] tracking-[-0.01em] text-slate-950 sm:max-w-[900px] sm:text-4xl sm:leading-tight">
  Compare Low Spread Forex Accounts by Account Type
</h2>

             <p className="mt-2.5 max-w-[355px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:max-w-[960px] sm:text-base sm:leading-8">
                A Raw Spread account should not be ranked directly
                against a Standard account because their fees are
                structured differently. We separate each account type
                to identify the strongest options within comparable
                categories.
              </p>
            </div>

            <div className="hidden rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4 lg:block">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-black text-amber-800">
                  !
                </span>

                <div className="text-xs font-black text-amber-950">
                  Consider the Total Trading Cost
                </div>
              </div>

              <p className="mt-2 text-xs leading-6 text-amber-900/80">
                A lower advertised spread does not always mean a
                cheaper account. Raw Spread and ECN accounts may also
                charge a separate commission.
              </p>
            </div>
          </div>

          {/* ACCOUNT GROUPS */}
          <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 lg:space-y-7">
            {groupedByType.map((group) => (
              <article
                key={group.type}
                className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
              >
                {/* GROUP HEADER */}
                <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-3.5 sm:px-6 sm:py-5 lg:px-7">
                  <div className="grid gap-3.5 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[10px] font-black text-white sm:text-[11px]">
                          {group.shortLabel}
                        </span>

                        <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-extrabold text-slate-600 sm:text-[11px]">
                          {group.recommendation}
                        </span>
                      </div>

                      <h3 className="mt-3 max-w-[335px] text-[19px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 sm:max-w-none sm:text-2xl sm:leading-[1.28] lg:text-[28px]">
  Best {group.label} for Low Trading Costs
</h3>

<p className="mt-2 max-w-[345px] text-[12px] leading-6 text-slate-600 sm:max-w-[920px] sm:text-[15px] sm:leading-7">
  {group.intro}
</p>
                    </div>

                    {group.winner ? (
                      <div className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-[18px] border border-emerald-300 bg-emerald-50 px-3.5 py-3">
                        <CompactLogo
                          src={group.winner.broker_logo}
                          alt={group.winner.broker_name}
                          size="small"
                        />

                        <div className="min-w-0">
                          <div className="text-[9px] font-black text-emerald-700 sm:text-[10px]">
                            Top-Ranked in This Category
                          </div>

                          <div className="mt-0.5 truncate text-sm font-black text-slate-950">
                            {group.winner.broker_name}
                          </div>

                          <div className="mt-0.5 truncate text-[10px] font-extrabold text-slate-500 sm:text-[11px]">
                            {group.winner.account_name || "—"}
                          </div>
                        </div>

                        <div className="shrink-0 border-l border-emerald-200 pl-3 text-right">
                          <div className="text-[9px] font-bold text-slate-500">
                            Spread
                          </div>

                          <div className="mt-0.5 text-xs font-black text-emerald-700 sm:text-sm">
                            {group.winner.spread || "—"}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden p-5 lg:block lg:p-6">
                  <div className="overflow-hidden rounded-[20px] border border-slate-200">
                    <table className="w-full table-fixed text-left">
                      <thead className="bg-slate-100/80">
                        <tr className="text-[11px] text-slate-600">
                          <th className="w-[7%] px-4 py-3.5 text-center font-black">
                            Rank
                          </th>

                          <th className="w-[30%] px-4 py-3.5 font-black">
                            Broker and Account
                          </th>

                          <th className="w-[13%] px-4 py-3.5 text-center font-black">
                            Spread
                          </th>

                          <th className="w-[15%] px-4 py-3.5 text-center font-black">
                            Commission
                          </th>

                          <th className="w-[13%] px-4 py-3.5 text-center font-black">
                            Minimum Deposit
                          </th>

                          <th className="w-[22%] px-4 py-3.5 text-center font-black">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {group.items
                          .slice(0, 7)
                          .map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-t border-slate-200 bg-white text-sm transition hover:bg-brand-50/30"
                            >
                              <td className="px-4 py-3 text-center">
                                <RankingBadge index={index} />
                              </td>

                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <CompactLogo
                                    src={item.broker_logo}
                                    alt={item.broker_name}
                                    size="small"
                                  />

                                  <div className="min-w-0">
                                    <div className="truncate text-[13px] font-black text-slate-950">
                                      {item.broker_name}
                                    </div>

                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                      <AccountLink item={item} />

                                      {formatRating(
                                        item.broker_rating
                                      ) ? (
                                        <span className="text-[10px] font-black text-amber-600">
                                          ★{" "}
                                          {formatRating(
                                            item.broker_rating
                                          )}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-3 text-center">
                                <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
                                  {item.spread || "—"}
                                </span>
                              </td>

                              <td className="px-4 py-3 text-center text-xs font-extrabold text-slate-800">
                                {item.commission || "—"}
                              </td>

                              <td className="px-4 py-3 text-center text-xs font-extrabold text-slate-800">
                                {item.min_deposit || "—"}
                              </td>

                              <td className="px-4 py-3">
                                <div className="flex justify-center">
                                  <ActionButtons
                                    item={item}
                                    compact
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* MOBILE CARDS */}
                <div className="grid gap-3 p-3.5 lg:hidden">
                  {group.items
                    .slice(0, 2)
                    .map((item, index) => (
                      <div
                        key={item.id}
                        className="rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_5px_16px_rgba(15,23,42,0.035)]"
                      >
                        <div className="grid grid-cols-[30px_42px_minmax(0,1fr)] items-center gap-2.5">
                          <RankingBadge index={index} />

                          <CompactLogo
                            src={item.broker_logo}
                            alt={item.broker_name}
                            size="small"
                          />

                          <div className="min-w-0">
                            <div className="truncate text-[15px] font-black text-slate-950">
                              {item.broker_name}
                            </div>

                            <div className="mt-1">
                              <AccountLink item={item} />
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-extrabold text-slate-500">
                              Spread
                            </div>

                            <div className="mt-1 text-[11px] font-black leading-5 text-emerald-700">
                              {item.spread || "—"}
                            </div>
                          </div>

                          <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-extrabold text-slate-500">
                              Commission
                            </div>

                            <div className="mt-1 min-h-[20px] break-words text-[10px] font-black leading-5 text-slate-900">
                              {item.commission || "—"}
                            </div>
                          </div>

                          <div className="px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-extrabold text-slate-500">
                              Min. Deposit
                            </div>

                            <div className="mt-1 text-[11px] font-black leading-5 text-slate-900">
                              {item.min_deposit || "—"}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <ActionButtons item={item} />
                        </div>
                      </div>
                    ))}

                  {group.items.length > 2 ? (
                    <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50">
                      <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-4 py-3 text-xs font-black text-brand-600">
                        View More Accounts

                        <span className="transition group-open:rotate-180">
                          ▼
                        </span>
                      </summary>

                      <div className="grid gap-2.5 border-t border-slate-200 bg-white p-3">
                        {group.items
                          .slice(2, 7)
                          .map((item, index) => (
                            <div
                              key={item.id}
                              className="rounded-[17px] border border-slate-200 bg-white p-3"
                            >
                              <div className="grid grid-cols-[28px_36px_minmax(0,1fr)] items-center gap-2">
                                <RankingBadge
                                  index={index + 2}
                                />

                                <CompactLogo
                                  src={item.broker_logo}
                                  alt={item.broker_name}
                                  size="small"
                                />

                                <div className="min-w-0">
                                  <div className="truncate text-sm font-black text-slate-950">
                                    {item.broker_name}
                                  </div>

                                  <div className="mt-0.5 truncate text-[10px] font-extrabold text-slate-500">
                                    {item.account_name || "—"}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                <div className="border-r border-slate-200 px-1 py-2 text-center">
                                  <div className="text-[8px] font-bold text-slate-500">
                                    Spread
                                  </div>

                                  <div className="mt-0.5 text-[10px] font-black leading-5 text-emerald-700">
                                    {item.spread || "—"}
                                  </div>
                                </div>

                                <div className="border-r border-slate-200 px-1 py-2 text-center">
                                  <div className="text-[8px] font-bold text-slate-500">
                                    Commission
                                  </div>

                                  <div className="mt-0.5 break-words text-[9px] font-black leading-4 text-slate-900">
                                    {item.commission || "—"}
                                  </div>
                                </div>

                                <div className="px-1 py-2 text-center">
                                  <div className="text-[8px] font-bold text-slate-500">
                                    Min. Deposit
                                  </div>

                                  <div className="mt-0.5 text-[10px] font-black leading-5 text-slate-900">
                                    {item.min_deposit || "—"}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-2.5">
                                <ActionButtons item={item} />
                              </div>
                            </div>
                          ))}
                      </div>
                    </details>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
            {/* HEAD TO HEAD COMPARISON */}
      <section
        id="head-to-head"
        className="scroll-mt-24 pb-8 sm:pb-10 lg:pb-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.055)] sm:rounded-[28px]">
            {/* SECTION HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-3.5 sm:px-7 sm:py-6">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600 sm:text-[11px]">
                    Side-by-Side Broker Comparison
                  </span>

                  <h2 className="mt-3 max-w-[340px] text-[24px] font-black leading-[1.28] tracking-[-0.01em] text-slate-950 sm:max-w-[900px] sm:text-4xl sm:leading-tight">
  Compare Two Forex Brokers by Account Type
</h2>

                 <p className="mt-2.5 max-w-[355px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:max-w-[950px] sm:text-base sm:leading-8">
                    Select two brokers to compare their Standard, Raw
                    Spread, ECN and Cent accounts and identify the
                    lower-cost option within each category.
                  </p>
                </div>
              </div>
            </div>

            {/* COMPARISON COMPONENT */}
            <div className="p-3.5 sm:p-5 lg:p-6">
              <LowestSpreadHeadToHeadEn brokers={brokerSummaries} />
            </div>
          </div>
        </div>
      </section>

      {/* BEST BY CATEGORY */}
      <section
        id="best-by-category"
        className="scroll-mt-24 pb-8 sm:pb-10 lg:pb-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.055)] sm:rounded-[28px]">
            {/* SECTION HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-5 sm:px-7 sm:py-6">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                Our Top Account Picks
              </span>

              <h2 className="mt-3 max-w-[340px] text-[24px] font-black leading-[1.28] tracking-[-0.01em] text-slate-950 sm:max-w-[900px] sm:text-4xl sm:leading-tight">
                Best Low Spread Broker by Account Category
              </h2>

              <p className="mt-2.5 max-w-[355px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:max-w-[1000px] sm:text-base sm:leading-8">
                We selected the leading account in each category using
                average spreads, commissions and estimated total
                trading costs. This avoids placing accounts with
                different fee structures into one misleading ranking.
              </p>
            </div>

            {(() => {
              const bestByCategory = [
                {
                  title: "Best Standard Forex Account",
                  mobileTitle: "Best Standard Account",
                  type: "Standard",
                  description:
                    "A straightforward option for beginners and casual traders",
                  item: bestStandard,
                },
                {
                  title: "Best Raw Spread Forex Account",
                  mobileTitle: "Best Raw Spread Account",
                  type: "Raw",
                  description:
                    "Designed for scalpers, day traders and frequent trading",
                  item: bestRaw,
                },
                {
                  title: "Best ECN Forex Account",
                  mobileTitle: "Best ECN Account",
                  type: "ECN",
                  description:
                    "Competitive pricing for execution-focused active traders",
                  item: bestEcn,
                },
                {
                  title: "Best Cent or Micro Account",
                  mobileTitle: "Best Cent / Micro Account",
                  type: "Cent",
                  description:
                    "Suitable for beginners, testing and smaller balances",
                  item: bestCent,
                },
              ];

              return (
                <>
                  {/* DESKTOP */}
                  <div className="hidden grid-cols-2 gap-4 p-5 md:grid sm:p-7 xl:grid-cols-4">
                    {bestByCategory.map((card, index) => (
                      <article
                        key={card.type}
                        className="flex h-full min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-base font-black leading-6 text-slate-950 lg:text-lg">
                              {card.title}
                            </h3>

                            <p className="mt-1 text-[11px] font-bold leading-5 text-slate-500">
                              {card.description}
                            </p>
                          </div>

                          <span
                            className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black ${
                              index === 0
                                ? "bg-amber-100 text-amber-800"
                                : "bg-brand-100 text-brand-700"
                            }`}
                          >
                            {card.type}
                          </span>
                        </div>

                        {card.item ? (
                          <>
                            <div className="mt-5 flex items-center gap-3">
                              <CompactLogo
                                src={card.item.broker_logo}
                                alt={card.item.broker_name}
                                size="normal"
                              />

                              <div className="min-w-0 flex-1">
                                <div className="truncate text-base font-black text-slate-950">
                                  {card.item.broker_name}
                                </div>

                                <div className="mt-1">
                                  <AccountLink item={card.item} />
                                </div>

                                {formatRating(
                                  card.item.broker_rating
                                ) ? (
                                  <div className="mt-1.5 text-[11px] font-black text-amber-600">
                                    ★{" "}
                                    {formatRating(
                                      card.item.broker_rating
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                              <div className="border-r border-slate-200 px-1.5 py-3 text-center">
                                <div className="text-[8px] font-extrabold text-slate-500">
                                  Spread
                                </div>

                                <div className="mt-1 text-[11px] font-black text-emerald-700">
                                  {card.item.spread || "—"}
                                </div>
                              </div>

                              <div className="border-r border-slate-200 px-1.5 py-3 text-center">
                                <div className="text-[8px] font-extrabold text-slate-500">
                                  Commission
                                </div>

                                <div className="mt-1 break-words text-[10px] font-black text-slate-950">
                                  {card.item.commission || "—"}
                                </div>
                              </div>

                              <div className="px-1.5 py-3 text-center">
                                <div className="text-[8px] font-extrabold text-slate-500">
                                  Min. Deposit
                                </div>

                                <div className="mt-1 text-[11px] font-black text-slate-950">
                                  {card.item.min_deposit || "—"}
                                </div>
                              </div>
                            </div>

                            <div className="mt-auto pt-5">
                              <ActionButtons item={card.item} />
                            </div>
                          </>
                        ) : (
                          <div className="mt-5 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm font-bold text-slate-500">
                            There is not enough account data available
                            for this category yet.
                          </div>
                        )}
                      </article>
                    ))}
                  </div>

                  {/* MOBILE */}
                  <div className="grid gap-3 p-4 md:hidden">
                    {bestByCategory.map((card, index) => (
                      <details
                        key={card.type}
                        className="group overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50"
                      >
                        <summary className="grid cursor-pointer list-none grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 p-3.5">
                          {card.item ? (
                            <CompactLogo
                              src={card.item.broker_logo}
                              alt={card.item.broker_name}
                              size="small"
                            />
                          ) : (
                            <div className="h-9 w-9 shrink-0 rounded-xl border border-slate-200 bg-white" />
                          )}

                          <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-2">
                              <h3 className="min-w-0 flex-1 text-[13px] font-black leading-5 text-slate-950">
                                {card.mobileTitle}
                              </h3>

                              <span
                                className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[8px] font-black ${
                                  index === 0
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-brand-100 text-brand-700"
                                }`}
                              >
                                {card.type}
                              </span>
                            </div>

                            <p className="mt-1 truncate text-[10px] font-extrabold text-slate-500">
                              {card.item?.broker_name ||
                                "Currently unavailable"}
                            </p>
                          </div>

                          <span className="shrink-0 text-xs text-slate-400 transition group-open:rotate-180">
                            ▼
                          </span>
                        </summary>

                        <div className="border-t border-slate-200 bg-white p-4">
                          {card.item ? (
                            <>
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="truncate text-base font-black text-slate-950">
                                    {card.item.broker_name}
                                  </div>

                                  <div className="mt-1">
                                    <AccountLink item={card.item} />
                                  </div>
                                </div>

                                {formatRating(
                                  card.item.broker_rating
                                ) ? (
                                  <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700">
                                    ★{" "}
                                    {formatRating(
                                      card.item.broker_rating
                                    )}
                                  </span>
                                ) : null}
                              </div>

                              <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">
                                  <div className="text-[8px] font-bold text-slate-500">
                                    Spread
                                  </div>

                                  <div className="mt-1 text-[11px] font-black text-emerald-700">
                                    {card.item.spread || "—"}
                                  </div>
                                </div>

                                <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">
                                  <div className="text-[8px] font-bold text-slate-500">
                                    Commission
                                  </div>

                                  <div className="mt-1 break-words text-[10px] font-black leading-4 text-slate-950">
                                    {card.item.commission || "—"}
                                  </div>
                                </div>

                                <div className="px-1.5 py-2.5 text-center">
                                  <div className="text-[8px] font-bold text-slate-500">
                                    Min. Deposit
                                  </div>

                                  <div className="mt-1 text-[11px] font-black text-slate-950">
                                    {card.item.min_deposit || "—"}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4">
                                <ActionButtons item={card.item} />
                              </div>
                            </>
                          ) : (
                            <div className="rounded-2xl bg-slate-50 px-4 py-5 text-center text-sm font-bold text-slate-500">
                              There is not enough account data
                              available for this category yet.
                            </div>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>
            {/* SELECTION METHOD */}
      <section
        id="selection-method"
        className="scroll-mt-24 pb-7 sm:pb-10 lg:pb-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              {/* INTRO */}
              <div className="border-b border-slate-200 bg-[linear-gradient(145deg,#eef5ff_0%,#ffffff_85%)] px-4 py-5 sm:px-7 sm:py-6 lg:border-b-0 lg:border-r lg:py-8">
                <span className="inline-flex rounded-full border border-brand-200 bg-white px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                  Broker Alarab Methodology
                </span>

                <h2 className="mt-3 max-w-[340px] text-balance text-[24px] font-black leading-[1.28] tracking-[-0.01em] text-slate-950 sm:max-w-none sm:text-4xl sm:leading-tight">
                  How We Rank Low Spread Forex Brokers
                </h2>

                <p className="mt-2.5 max-w-[355px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:max-w-none sm:text-base sm:leading-8">
                  We compare the estimated trading cost of each account
                  and separate the results by account type to avoid
                  misleading comparisons between different pricing
                  structures.
                </p>

                <div className="mt-4 rounded-[17px] border border-brand-200 bg-white p-3.5 sm:mt-5 sm:p-4">
                  <div className="text-sm font-black text-slate-950">
                    Our Core Cost Formula
                  </div>

                  <div className="mt-2 rounded-xl bg-brand-50 px-3 py-2.5 text-center text-[13px] font-black text-brand-700 sm:py-3 sm:text-sm">
                    Estimated Trading Cost = Spread + Commission
                  </div>

                  <p className="mt-2.5 text-[11px] leading-5 text-slate-500 sm:mt-3 sm:text-xs sm:leading-6">
                    We also consider the account type, minimum deposit,
                    pricing transparency and suitability for different
                    trading styles.
                  </p>

                  <Link
                    href="/en/learn-trading/spread"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-black text-brand-600 transition hover:text-brand-700"
                  >
                    Learn how forex spreads work
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* RELATED LINKS - DESKTOP */}
                <div className="mt-4 hidden lg:block">
                  <div className="mb-2 text-[11px] font-black text-slate-950">
                    Related Resources
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      href="/en/brokers"
                      className="flex min-h-[54px] items-center justify-between gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      <span className="text-[10px] font-black leading-4 text-slate-800">
                        Broker Reviews
                      </span>

                      <span className="shrink-0 text-xs font-black text-brand-500">
                        →
                      </span>
                    </Link>

                    <Link
                      href="/en/best-brokers"
                      className="flex min-h-[54px] items-center justify-between gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      <span className="text-[10px] font-black leading-4 text-slate-800">
                        Best Brokers
                      </span>

                      <span className="shrink-0 text-xs font-black text-brand-500">
                        →
                      </span>
                    </Link>

                    <Link
                      href="/en/compare"
                      className="flex min-h-[54px] items-center justify-between gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2 transition hover:border-brand-200 hover:bg-brand-50"
                    >
                      <span className="text-[10px] font-black leading-4 text-slate-800">
                        Broker Comparisons
                      </span>

                      <span className="shrink-0 text-xs font-black text-brand-500">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* DESKTOP METHOD */}
              <div className="hidden p-6 md:block lg:p-7">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      number: "01",
                      title: "Average Spread",
                      description:
                        "We compare the expected average spread rather than relying only on the lowest advertised spread available under ideal market conditions.",
                    },
                    {
                      number: "02",
                      title: "Trading Commission",
                      description:
                        "We include any separate commission because a near-zero spread account may still carry a meaningful cost per lot or per side.",
                    },
                    {
                      number: "03",
                      title: "Account Structure",
                      description:
                        "Standard, Raw Spread, ECN and Cent accounts are ranked separately so that accounts with similar pricing models are compared fairly.",
                    },
                    {
                      number: "04",
                      title: "Minimum Deposit",
                      description:
                        "We review how accessible each account is because some low spread accounts require a higher opening deposit or account balance.",
                    },
                    {
                      number: "05",
                      title: "Trading Style",
                      description:
                        "An account designed for scalping or frequent trading may not be the most practical choice for a beginner or occasional trader.",
                    },
                    {
                      number: "06",
                      title: "Pricing Transparency",
                      description:
                        "We favor brokers that clearly disclose spreads, commissions, execution terms and other important account conditions.",
                    },
                  ].map((item) => (
                    <article
                      key={item.number}
                      className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-5 transition hover:border-brand-200 hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-xs font-black text-white">
                          {item.number}
                        </span>

                        <h3 className="text-base font-black text-slate-950 lg:text-lg">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {/* MOBILE METHOD */}
              <div className="p-3.5 md:hidden">
                <div className="overflow-hidden rounded-[17px] border border-slate-200 bg-white">
                  {[
                    {
                      number: "01",
                      title: "Average Spread",
                      description:
                        "We use estimated average pricing, not only the lowest promotional figure.",
                    },
                    {
                      number: "02",
                      title: "Commission",
                      description:
                        "We add commissions to the spread to estimate the real trading cost.",
                    },
                    {
                      number: "03",
                      title: "Account Type",
                      description:
                        "We separate pricing models to keep the comparison fair.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.number}
                      className={`grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3 px-3.5 py-3 ${
                        index > 0 ? "border-t border-slate-200" : ""
                      }`}
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-[9px] font-black text-white">
                        {item.number}
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-[12px] font-black text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <details className="group mt-2.5 overflow-hidden rounded-[16px] border border-brand-200 bg-brand-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[11px] font-black text-brand-600">
                    Additional Factors We Review

                    <span className="transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <div className="border-t border-brand-200 bg-white px-4 py-3">
                    <p className="text-[11px] leading-6 text-slate-600">
                      Minimum deposit requirements, execution terms,
                      pricing transparency and whether the account is
                      suitable for beginners, scalpers or frequent
                      traders.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO CHOOSE */}
      <section className="pb-7 sm:pb-10 lg:pb-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-5 sm:px-7 sm:py-6">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                Choose the Right Pricing Model
              </span>

              <h2 className="mt-3 max-w-[340px] text-[24px] font-black leading-[1.28] tracking-[-0.01em] text-slate-950 sm:max-w-[900px] sm:text-4xl sm:leading-tight">
                Which Low Spread Account Is Right for You?
              </h2>

              <p className="mt-2.5 max-w-[355px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:max-w-[1000px] sm:text-base sm:leading-8">
                The right account depends on your trading frequency,
position size and whether costs are charged through the
spread, a commission or both.
              </p>
            </div>

            {/* DESKTOP */}
            <div className="hidden grid-cols-2 gap-4 p-5 md:grid sm:p-7 xl:grid-cols-4">
              {[
                {
                  title: "I Am a Beginner",
                  account: "Standard",
                  description:
                    "A Standard account is often easier to understand because trading costs are usually included within the spread and no separate commission is charged.",
                  link: "#account-types",
                },
                {
                  title: "I Trade Frequently",
                  account: "Raw / ECN",
                  description:
                    "Tighter spreads can become more important for scalping and frequent trading, but the separate commission must be included in every cost comparison.",
                  link: "#account-types",
                },
                {
                  title: "I Have a Small Balance",
                  account: "Cent / Micro",
                  description:
                    "Cent and Micro accounts allow smaller trade sizes and lower capital exposure, although they may not always provide the tightest pricing.",
                  link: "#account-types",
                },
                {
                  title: "I Want the Lowest Cost",
                  account: "Spread + Commission",
                  description:
                    "Compare the average spread and commission together instead of choosing an account only because it advertises spreads from zero pips.",
                  link: "#account-types",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                >
                  <span className="inline-flex w-fit rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
                    {item.account}
                  </span>

                  <h3 className="mt-4 text-xl font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <a
                    href={item.link}
                    className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                  >
                    View Account Comparison
                  </a>
                </article>
              ))}
            </div>

            {/* MOBILE */}
            <div className="grid gap-3 p-4 md:hidden">
              {[
                {
                  title: "For Beginners",
                  account: "Standard",
                  description:
                    "Simple pricing with no separate commission in many cases.",
                },
                {
                  title: "For Frequent Trading",
                  account: "Raw / ECN",
                  description:
                    "Tighter spreads may help, but the commission must also be calculated.",
                },
                {
                  title: "For Smaller Balances",
                  account: "Cent / Micro",
                  description:
                    "Smaller position sizes can reduce capital exposure while learning.",
                },
                {
                  title: "For the Lowest Total Cost",
                  account: "Spread + Commission",
                  description:
                    "Compare the average spread and commission together.",
                },
              ].map((item) => (
                <details
                  key={item.title}
                  className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50"
                >
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full border border-brand-100 bg-white px-2.5 py-0.5 text-[8px] font-black text-brand-600">
                        {item.account}
                      </span>

                      <h3 className="mt-1.5 text-[13px] font-black leading-5 text-slate-950">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-xs text-slate-400 transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <div className="border-t border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <a
                      href="#account-types"
                      className="mt-3 inline-flex text-[11px] font-black text-brand-600"
                    >
                      Compare Accounts
                      <span className="ml-1">→</span>
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTICE */}
      <section className="pb-7 sm:pb-10 lg:pb-12">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
         <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-4 py-4.5 sm:rounded-[26px] sm:px-6 sm:py-6">
            <div className="grid gap-3.5 sm:grid-cols-[44px_minmax(0,1fr)] sm:items-start">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-300 bg-white text-lg font-black text-amber-700">
                !
              </span>

              <div>
                <h2 className="max-w-[300px] text-[20px] font-black leading-[1.35] tracking-[-0.01em] text-amber-950 sm:max-w-none sm:text-xl">
  Low Spreads Are Not the Only Factor to Consider
</h2>

                <p className="mt-2 max-w-[1150px] text-sm leading-7 text-amber-950/80 sm:text-base sm:leading-8">
                  Advertised spreads may change with market liquidity,
                  volatility, economic news and trading hours. Before
                  opening an account, review the average spread,
                  commission, execution terms, regulation, funding
                  methods and withdrawal conditions.
                </p>

                <Link
                  href="/en/learn-trading/spread"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-black text-amber-800 transition hover:text-amber-950"
                >
                  Read our complete forex spread guide
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-24 pb-3 sm:pb-8 lg:pb-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
            {/* HEADER */}
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-6 sm:px-7">
              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                Common Trader Questions
              </span>

<h2 className="mt-3 max-w-[340px] text-[24px] font-black leading-[1.28] tracking-[-0.01em] text-slate-950 sm:max-w-[850px] sm:text-4xl sm:leading-tight">
  <span className="sm:hidden">
    Low Spread Forex Broker FAQs
  </span>

  <span className="hidden sm:inline">
    Frequently Asked Questions About Low Spread Forex Brokers
  </span>
</h2>

              <p className="mt-2.5 max-w-[320px] text-[12px] leading-6 text-slate-600 min-[380px]:max-w-[360px] sm:mt-3 sm:max-w-[900px] sm:text-base sm:leading-8">
                Clear answers about forex spreads, commissions,
                account types and total trading costs.
              </p>
            </div>

            {(() => {
              const faqItems = [
                {
                  question: "What is a spread in forex trading?",
                  answer:
                    "The spread is the difference between the bid price and the ask price of a currency pair. It represents a direct trading cost whenever a position is opened.",
                },
                {
                  question:
                    "Is the broker with the lowest spread always the cheapest?",
                  answer:
                    "Not necessarily. A broker may advertise a very tight spread while charging a separate commission, so both costs should be evaluated together.",
                },
                {
                  question:
                    "What is the difference between Standard and Raw Spread accounts?",
                  answer:
                    "Standard accounts usually include the broker's fee within the spread. Raw Spread accounts generally offer tighter pricing but charge a separate commission.",
                },
                {
                  question: "Is an ECN account better than a Standard account?",
                  answer:
                    "It depends on your trading style. ECN-style pricing may suit active traders, while a Standard account may be simpler for beginners and occasional traders.",
                },
                {
                  question: "What is the best forex account for beginners?",
                  answer:
                    "A Standard account is often easier for beginners because its pricing is straightforward. Regulation, minimum deposit, support and withdrawal conditions should also be reviewed.",
                },
                {
                  question: "Are Cent accounts suitable for live trading?",
                  answer:
                    "Cent accounts can be used for live trading with smaller position sizes. They are often useful for learning and strategy testing with limited capital exposure.",
                },
                {
                  question: "Why do forex spreads change during the day?",
                  answer:
                    "Spreads can widen or tighten based on liquidity, volatility, market sessions, economic announcements and overall trading conditions.",
                },
                {
                  question:
                    "How do I find the lowest-cost forex broker?",
                  answer:
                    "Compare average spreads, commissions, execution quality, account type and minimum deposit. The best option depends on your position size and trading frequency.",
                },
              ];

              return (
                <>
                  {/* DESKTOP FAQ */}
                  <div className="hidden gap-3 p-6 md:grid lg:grid-cols-2 lg:gap-4">
                    {faqItems.map((item) => (
                      <details
                        key={item.question}
                        className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50"
                      >
                        <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
                          <h3 className="flex-1 text-left text-sm font-black leading-6 text-slate-950">
                            {item.question}
                          </h3>

                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs text-slate-400 transition group-open:rotate-180">
                            ▼
                          </span>
                        </summary>

                        <div className="border-t border-slate-200 bg-white px-4 py-4">
                          <p className="text-sm leading-7 text-slate-600">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>

                  {/* MOBILE FAQ */}
                  <div className="grid gap-2.5 px-4 pb-3 pt-4 md:hidden">
                    {faqItems.slice(0, 5).map((item) => (
                      <details
                        key={item.question}
                        className="group overflow-hidden rounded-[17px] border border-slate-200 bg-slate-50"
                      >
                        <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5">
                          <h3 className="flex-1 text-left text-[13px] font-black leading-6 text-slate-950">
                            {item.question}
                          </h3>

                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[10px] text-slate-400 transition group-open:rotate-180">
                            ▼
                          </span>
                        </summary>

                        <div className="border-t border-slate-200 bg-white px-4 py-3">
                          <p className="text-xs leading-6 text-slate-600">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}

                    <details className="group overflow-hidden rounded-[17px] border border-brand-200 bg-brand-50">
                      <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-4 py-3.5 text-xs font-black text-brand-600">
                        View More Questions

                        <span className="transition group-open:rotate-180">
                          ▼
                        </span>
                      </summary>

                      <div className="grid gap-2.5 border-t border-brand-200 bg-white p-3">
                        {faqItems.slice(5).map((item) => (
                          <details
                            key={item.question}
                            className="group/item overflow-hidden rounded-[15px] border border-slate-200 bg-slate-50"
                          >
                            <summary className="flex cursor-pointer list-none items-center gap-3 px-3.5 py-3">
                              <h3 className="flex-1 text-left text-[12px] font-black leading-5 text-slate-950">
                                {item.question}
                              </h3>

                              <span className="text-[10px] text-slate-400 transition group-open/item:rotate-180">
                                ▼
                              </span>
                            </summary>

                            <div className="border-t border-slate-200 bg-white px-3.5 py-3">
                              <p className="text-xs leading-6 text-slate-600">
                                {item.answer}
                              </p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </details>

                    <Link
                      href="/en/learn-trading/spread"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-200 bg-white px-4 text-xs font-black text-brand-600"
                    >
                      Read the Complete Forex Spread Guide
                    </Link>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>
    </main>
  );
}