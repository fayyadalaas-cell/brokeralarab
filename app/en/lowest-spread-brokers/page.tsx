import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import LowestSpreadHeadToHeadEn from "@/app/components/LowestSpreadHeadToHeadEn";

export const metadata: Metadata = {
  title: "Best Low Spread Forex Brokers 2026 | Compare Trading Costs",

  description:
  "Compare the best low spread forex brokers in 2026. Review average spreads, commissions, minimum deposits and total trading costs by account type.",

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

  images: [
    {
      url: "https://brokeralarab.com/og-image.webp",
      width: 1200,
      height: 630,
      alt: "Best Low Spread Forex Brokers 2026",
    },
  ],
},

twitter: {
  card: "summary_large_image",

  title: "Best Low Spread Forex Brokers 2026",

  description:
    "Compare Standard, Raw Spread, ECN and Cent accounts by spreads, commissions and total trading costs.",

  images: [
  "https://brokeralarab.com/og-image.webp",
],
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
  commission_en: string | null;
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

  return rating.toFixed(2);
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
    large: "h-15 w-20 rounded-[18px]",
  };

  const paddingClasses = {
    small: "p-1.5",
    normal: "p-1.5",
    large: "p-1",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white ${paddingClasses[size]} ${sizeClasses[size]}`}
    >
      {src ? (
        <img
          src={src}
          alt={`${alt} logo`}
          className={`h-full w-full object-contain ${
            size === "large" ? "scale-[1.12]" : ""
          }`}
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
  commission_en,
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

 const selectBestAccountPerType = (
  type: string
): PreparedAccount[] => {
  const seenBrokers = new Set<string>();

  return accounts
    .filter(
      (account) => account.normalized_account_type === type
    )
    .sort(compareByRealCost)
    .filter((item) => {
      const brokerKey = item.broker_name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      if (seenBrokers.has(brokerKey)) {
        return false;
      }

      seenBrokers.add(brokerKey);
      return true;
    });
};

const selectUniqueBrokerAccounts = (
  items: PreparedAccount[]
): PreparedAccount[] => {
  const seenBrokers = new Set<string>();

  return [...items]
    .sort(compareByRealCost)
    .filter((item) => {
      const brokerKey = item.broker_name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      if (seenBrokers.has(brokerKey)) {
        return false;
      }

      seenBrokers.add(brokerKey);
      return true;
    });
};

const groupedByType = ["standard", "raw", "ecn", "cent"]
  .map((type) => {
    const items = selectBestAccountPerType(type);

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

/*
  This list is only for the overall SEO/schema summary.
  It must not control the account-type tables.
*/
const bestOverall = selectUniqueBrokerAccounts(accounts).slice(0, 8);

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

  {
    "@type": "Question",

    name: "Is an ECN account better than a Standard account?",

    acceptedAnswer: {
      "@type": "Answer",

      text: "It depends on your trading style. ECN-style pricing may suit active traders, while a Standard account may be simpler for beginners and occasional traders.",
    },
  },

  {
    "@type": "Question",

    name: "What is the best forex account for beginners?",

    acceptedAnswer: {
      "@type": "Answer",

      text: "A Standard account is often easier for beginners because its pricing is straightforward. Regulation, minimum deposit, support and withdrawal conditions should also be reviewed.",
    },
  },

  {
    "@type": "Question",

    name: "Are Cent accounts suitable for live trading?",

    acceptedAnswer: {
      "@type": "Answer",

      text: "Cent accounts can be used for live trading with smaller position sizes. They are often useful for learning and strategy testing with limited capital exposure.",
    },
  },

  {
    "@type": "Question",

    name: "Why do forex spreads change during the day?",

    acceptedAnswer: {
      "@type": "Answer",

      text: "Spreads can widen or tighten based on liquidity, volatility, market sessions, economic announcements and overall trading conditions.",
    },
  },

  {
    "@type": "Question",

    name: "How do I find the lowest-cost forex broker?",

    acceptedAnswer: {
      "@type": "Answer",

      text: "Compare average spreads, commissions, execution quality, account type and minimum deposit. The best option depends on your position size and trading frequency.",
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
    dateModified: "2026-09-10",

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
<section
  dir="ltr"
  className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31]"
>
  {/* Background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

    <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

    <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

    <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
  </div>

  <div className="relative mx-auto max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
    <div className="grid items-center gap-8 min-[1500px]:grid-cols-[minmax(0,1fr)_250px] min-[1500px]:gap-20">
      {/* MAIN CONTENT */}
      <div className="min-w-0 text-left">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="hidden items-center gap-2 text-[10px] font-bold text-blue-200/75 sm:flex sm:text-xs"
        >
          <Link
            href="/en/best-brokers"
            className="transition hover:text-white"
          >
            Best Forex Brokers
          </Link>

          <span className="text-blue-300/40">/</span>

          <span className="text-white">Lowest Spread</span>
        </nav>

        {/* Badge */}
        <div className="mt-0 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:mt-5 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

          Forex Broker Comparison 2026
        </div>

        {/* Heading */}
        <h1 className="mt-3 max-w-[1100px] text-[30px] font-black leading-[1.12] tracking-[-0.035em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
          <span className="inline">
            Best Low Spread Forex Brokers{" "}
          </span>

          <span className="inline text-[#59c0ff]">
            in 2026
          </span>
        </h1>

        {/* Mobile description */}
        <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
          Compare average spreads, commissions and total trading costs to find
          the lowest-cost forex account.
        </p>

        {/* Desktop description */}
        <p className="mt-3 hidden max-w-[1050px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
          Compare forex brokers by average spreads, commissions and total
          trading costs, with separate results for Standard, Raw Spread, ECN
          and Cent accounts.
        </p>

        {/* Update information */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
          <time
            dateTime="2026-09-10"
            className="inline-flex items-center gap-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="sm:hidden">
              Updated September 2026
            </span>

            <span className="hidden sm:inline">
              Last updated: September 10, 2026
            </span>
          </time>

          <span className="hidden h-3 w-px bg-white/20 sm:block" />

          <span className="inline-flex items-center gap-1.5">
            <span className="text-cyan-300">✓</span>
            Commission included in the evaluation
          </span>

          <span className="hidden h-3 w-px bg-white/20 sm:block" />

          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <span className="text-cyan-300">✓</span>
            Independent comparison by account type
          </span>
        </div>

        {/* Stats and buttons */}
        <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4">
          {/* Stats */}
          <div className="grid w-full max-w-[760px] grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm">
            <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
              <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                {uniqueBrokerCount}
              </div>

              <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                Forex Brokers
              </div>
            </div>

            <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
              <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                {accounts.length}
              </div>

              <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                Compared Accounts
              </div>
            </div>

            <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
              <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                {groupedByType.length}
              </div>

              <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                Account Types
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid w-full max-w-[760px] grid-cols-2 gap-2.5 sm:w-auto sm:max-w-none sm:flex sm:gap-3">
            <a
              href="#account-types"
              className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
            >
              <span className="sm:hidden">View Spreads</span>

              <span className="hidden sm:inline">
                View Spread Comparison
              </span>

              <span aria-hidden="true">→</span>
            </a>

            <a
              href="#head-to-head"
              className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
            >
              <span className="sm:hidden">Compare Brokers</span>

              <span className="hidden sm:inline">
                Compare Broker by Broker
              </span>

              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* SPREAD ILLUSTRATION */}
<div
  aria-hidden="true"
  className="hidden w-[250px] min-[1500px]:block min-[1500px]:-translate-x-16"
>
        <div className="rounded-[17px] border border-white/10 bg-[#0b2948]/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[10px] font-black text-white">
              How Is Spread Calculated?
            </div>

            <div className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2 py-0.5 text-[7px] font-bold text-cyan-200">
              Simple example
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="rounded-[11px] border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-2 text-center">
              <div className="text-[8px] font-bold text-emerald-200/75">
                Ask Price
              </div>

              <div
                dir="ltr"
                className="mt-0.5 text-[15px] font-black tracking-wide text-emerald-300"
              >
                1.08420
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/30 to-transparent" />

              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1">
                <span className="text-[7px] font-bold text-blue-200/75">
                  Spread
                </span>

                <span
                  dir="ltr"
                  className="text-[11px] font-black text-[#65c9ff]"
                >
                  1.00
                </span>

                <span className="text-[7px] font-bold text-blue-200/75">
                  pips
                </span>
              </div>

              <span className="h-px flex-1 bg-gradient-to-l from-cyan-300/30 to-transparent" />
            </div>

            <div className="rounded-[11px] border border-rose-300/15 bg-rose-300/[0.06] px-3 py-2 text-center">
              <div className="text-[8px] font-bold text-rose-200/75">
                Bid Price
              </div>

              <div
                dir="ltr"
                className="mt-0.5 text-[15px] font-black tracking-wide text-rose-300"
              >
                1.08410
              </div>
            </div>
          </div>

          <div className="mt-2.5 border-t border-white/10 pt-2 text-center">
            <p className="text-[7px] font-bold text-blue-100/60">
              The difference between prices is the spread cost
            </p>
          </div>
        </div>
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
  className="scroll-mt-24 bg-[#f4f7fb] pb-8 pt-6 sm:pb-10 sm:pt-8 lg:pb-12 lg:pt-10"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
    {/* SECTION INTRO */}
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-8">
      <div className="max-w-[980px]">
        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
          Account-Level Cost Comparison
        </span>

        <h2 className="mt-3 max-w-[360px] text-[24px] font-black leading-[1.28] tracking-[-0.01em] text-slate-950 sm:max-w-[950px] sm:text-4xl sm:leading-tight">
          Compare Low Spread Forex Accounts by Account Type
        </h2>

        <p className="mt-2.5 max-w-[370px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:max-w-[1000px] sm:text-base sm:leading-8">
          Standard, Raw Spread, ECN and Cent accounts have different cost
          structures. We compare spreads, commissions and minimum deposits
          separately to identify the most suitable low-cost account for each
          trading style.
        </p>
      </div>

      <div className="rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-black text-amber-800">
            !
          </span>

          <div className="text-xs font-black text-amber-950">
            Consider the Total Trading Cost
          </div>
        </div>

        <p className="mt-2 text-xs leading-6 text-amber-900/80">
          A lower advertised spread does not always mean a cheaper account.
          Raw Spread and ECN accounts may also charge a separate commission.
        </p>
      </div>
    </div>

    {/* ACCOUNT GROUPS */}
    <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-7">
      {groupedByType.map((group) => {
        const visibleItems = group.items.slice(0, 7);

        const renderMobileCard = (item: any, index: number) => (
          <div
            key={item.id}
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
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <CompactLogo
                    src={item.broker_logo}
                    alt={item.broker_name}
                    size="normal"
                  />

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <div className="truncate text-[15px] font-black text-slate-950">
                        {item.broker_name}
                      </div>

                      {index === 0 ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[7px] font-black text-amber-800">
                          Top Pick
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <AccountLink item={item} />

                      {formatRating(item.broker_rating) ? (
                        <span className="text-[9px] font-black text-amber-600">
                          ★ {formatRating(item.broker_rating)}
                        </span>
                      ) : null}
                    </div>
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

              <div className="mt-2.5 grid grid-cols-3 overflow-hidden rounded-[11px] border border-slate-200 bg-[#f7f9fc]">
                <div className="border-r border-slate-200 px-1 py-2 text-center">
                  <div className="text-[8px] font-extrabold text-slate-500">
                    Spread
                  </div>

                  <div
                    dir="ltr"
                    className="mt-0.5 text-[12px] font-black text-emerald-700"
                  >
                    {item.spread || "—"}
                  </div>
                </div>

                <div className="border-r border-slate-200 px-1 py-2 text-center">
                  <div className="text-[8px] font-extrabold text-slate-500">
                    Commission
                  </div>

                  <div
                    dir="ltr"
                    className="mt-0.5 break-words text-[10px] font-black text-slate-900"
                  >
                    {item.commission_en || item.commission || "—"}
                  </div>
                </div>

                <div className="px-1 py-2 text-center">
                  <div className="text-[8px] font-extrabold text-slate-500">
                    Min. Deposit
                  </div>

                  <div
                    dir="ltr"
                    className="mt-0.5 text-[12px] font-black text-slate-900"
                  >
                    {item.min_deposit || "—"}
                  </div>
                </div>
              </div>

              <div className="mt-2.5 [&_a]:min-h-[39px]">
                <ActionButtons item={item} />
              </div>
            </div>
          </div>
        );

        return (
          <article
            key={group.type}
            className="overflow-hidden rounded-[21px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.065)] sm:rounded-[27px]"
          >
            {/* GROUP HEADER */}
            <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(110deg,#ffffff_0%,#f5f9ff_65%,#eaf4ff_100%)] px-4 py-3.5 sm:px-7 sm:py-5 lg:px-8">
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#2f80ed] to-[#1353a5]" />

              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[9px] font-black text-white sm:text-[11px]">
                      {group.shortLabel}
                    </span>

                    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[8px] font-extrabold text-slate-600 sm:text-[10px]">
                      {group.recommendation}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-[20px] font-black leading-[1.25] text-slate-950 sm:text-2xl lg:text-[30px]">
  Best {group.label} for Low Trading Costs
</h3>

                  <p className="mt-2 hidden max-w-[1000px] text-[14px] leading-7 text-slate-600 sm:block">
                    {group.intro}
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-3 rounded-[15px] border border-blue-100 bg-white/95 px-4 py-3 shadow-sm lg:flex">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-brand-50 text-lg font-black text-brand-600">
                    {visibleItems.length}
                  </div>

                  <div>
                    <div className="text-[12px] font-black text-slate-900">
                      Top Results Shown
                    </div>

                    <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                      From {group.items.length} accounts
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden p-5 lg:block lg:p-6">
              <div className="overflow-hidden rounded-[18px] border border-slate-200 shadow-[0_7px_24px_rgba(15,23,42,0.055)]">
                <table className="w-full table-fixed text-left">
                  <thead className="bg-[linear-gradient(90deg,#071c34_0%,#0b3157_55%,#0d426f_100%)] text-white">
                    <tr className="text-[13px]">
                      <th className="w-[8%] px-4 py-4 text-center font-black">
                        Rank
                      </th>

                      <th className="w-[34%] px-6 py-4 font-black">
                        Broker and Account
                      </th>

                      <th className="w-[13%] px-4 py-4 text-center font-black">
                        Spread
                      </th>

                      <th className="w-[12%] px-4 py-4 text-center font-black">
                        Commission
                      </th>

                      <th className="w-[12%] px-4 py-4 text-center font-black">
                        Deposit
                      </th>

                      <th className="w-[21%] px-4 py-4 text-center font-black">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-t border-slate-200 transition duration-200 hover:bg-blue-50/80 ${
                          index === 0
                            ? "bg-[linear-gradient(90deg,#fffdf7_0%,#fff9e9_100%)]"
                            : index % 2 === 0
                            ? "bg-[#f8fafc]"
                            : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-[18px] text-center">
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

                        <td className="px-6 py-[18px]">
                          <div className="flex items-center gap-4">
                            <CompactLogo
                              src={item.broker_logo}
                              alt={item.broker_name}
                              size="large"
                            />

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <div className="truncate text-[18px] font-black text-slate-950">
                                  {item.broker_name}
                                </div>

                                {index === 0 ? (
                                  <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-[9px] font-black text-amber-800">
                                    Top in Category
                                  </span>
                                ) : null}
                              </div>

                              <div className="mt-2 flex flex-wrap items-center gap-3">
                                <AccountLink item={item} />

                                {formatRating(item.broker_rating) ? (
                                  <span className="text-[12px] font-black text-amber-600">
                                    ★ {formatRating(item.broker_rating)}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-[18px] text-center">
                          <span
                            dir="ltr"
                            className="inline-flex min-w-[96px] items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-[14px] font-black text-emerald-700 shadow-sm"
                          >
                            {item.spread || "—"}
                          </span>
                        </td>

                        <td
                          dir="ltr"
                          className="px-4 py-[18px] text-center text-[15px] font-black text-slate-950"
                        >
                          {item.commission_en || item.commission || "—"}
                        </td>

                        <td
                          dir="ltr"
                          className="px-4 py-[18px] text-center text-[15px] font-black text-slate-950"
                        >
                          {item.min_deposit || "—"}
                        </td>

                        <td className="px-4 py-[18px]">
                          <div className="mx-auto max-w-[240px] [&_a]:min-h-[44px] [&_a]:text-[13px]">
                            <ActionButtons item={item} compact />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="grid gap-3 p-3 lg:hidden">
              {visibleItems
                .slice(0, 3)
                .map((item, index) => renderMobileCard(item, index))}

              {visibleItems.length > 3 ? (
                <details className="group overflow-hidden rounded-[16px] border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-center gap-2 bg-slate-50 px-4 py-3 text-xs font-black text-brand-600">
                    View {visibleItems.length - 3} More Accounts

                    <span className="transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <div className="grid gap-3 border-t border-slate-200 bg-[#f4f7fb] p-3">
                    {visibleItems
                      .slice(3)
                      .map((item, index) =>
                        renderMobileCard(item, index + 3)
                      )}
                  </div>
                </details>
              ) : null}
            </div>
          </article>
        );
      })}
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
      <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-6 sm:px-7">
        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
          Best Accounts by Type
        </span>

        <h2 className="mt-3 max-w-[900px] text-[25px] font-black leading-[1.25] text-slate-950 sm:text-4xl sm:leading-tight">
          Best Low Spread Forex Account by Category
        </h2>

        <p className="mt-3 max-w-[1050px] text-[12px] leading-6 text-slate-600 sm:text-base sm:leading-8">
          We identify the best Standard, Raw Spread, ECN and Cent accounts
          by comparing average spreads, commissions, minimum deposits and
          estimated total forex trading costs.
        </p>
      </div>

      {(() => {
        const bestByCategory = [
          {
            title: "Best Standard Forex Account",
            mobileTitle: "Best Standard Account",
            type: "Standard",
            description:
              "A simple account for beginners and everyday forex trading, usually without a separate commission.",
            item: bestStandard,
          },
          {
            title: "Best Raw Spread Forex Account",
            mobileTitle: "Best Raw Spread Account",
            type: "Raw",
            description:
              "A low spread account for scalpers and frequent traders, with commission included in the total cost.",
            item: bestRaw,
          },
          {
            title: "Best ECN Forex Account",
            mobileTitle: "Best ECN Account",
            type: "ECN",
            description:
              "Designed for active traders who prioritize competitive pricing and fast execution.",
            item: bestEcn,
          },
          {
            title: "Best Cent or Micro Forex Account",
            mobileTitle: "Best Cent / Micro Account",
            type: "Cent",
            description:
              "Suitable for beginners, testing strategies and trading with a smaller balance.",
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
                  className="flex min-h-[390px] min-w-0 flex-col rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 min-h-[126px]">
  <h3
    className="min-h-[52px] text-base font-black leading-6 text-slate-950 lg:text-lg"
  >
                        {card.title}
                      </h3>

                      <p className="mt-1 min-h-[60px] text-[11px] font-bold leading-5 text-slate-500">
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
                      <div className="mt-5 flex min-h-[92px] items-start gap-3">
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

                          {formatRating(card.item.broker_rating) ? (
                            <div className="mt-1.5 text-[11px] font-black text-amber-600">
                              ★ {formatRating(card.item.broker_rating)}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="border-r border-slate-200 px-1.5 py-3 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            Spread
                          </div>

                          <div
                            dir="ltr"
                            className="mt-1 text-[11px] font-black text-emerald-700"
                          >
                            {card.item.spread || "—"}
                          </div>
                        </div>

                        <div className="border-r border-slate-200 px-1.5 py-3 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            Commission
                          </div>

                          <div
                            dir="ltr"
                            className="mt-1 break-words text-[10px] font-black text-slate-950"
                          >
                            {card.item.commission_en ||
                              card.item.commission ||
                              "—"}
                          </div>
                        </div>

                        <div className="px-1.5 py-3 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            Min. Deposit
                          </div>

                          <div
                            dir="ltr"
                            className="mt-1 text-[11px] font-black text-slate-950"
                          >
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
                      Account data is not currently available for this
                      category.
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
                        {card.item?.broker_name || "Currently unavailable"}
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

                          {formatRating(card.item.broker_rating) ? (
                            <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700">
                              ★ {formatRating(card.item.broker_rating)}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-bold text-slate-500">
                              Spread
                            </div>

                            <div
                              dir="ltr"
                              className="mt-1 text-[11px] font-black text-emerald-700"
                            >
                              {card.item.spread || "—"}
                            </div>
                          </div>

                          <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-bold text-slate-500">
                              Commission
                            </div>

                            <div
                              dir="ltr"
                              className="mt-1 break-words text-[10px] font-black leading-4 text-slate-950"
                            >
                              {card.item.commission_en ||
                                card.item.commission ||
                                "—"}
                            </div>
                          </div>

                          <div className="px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-bold text-slate-500">
                              Min. Deposit
                            </div>

                            <div
                              dir="ltr"
                              className="mt-1 text-[11px] font-black text-slate-950"
                            >
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
                        Account data is not currently available for this
                        category.
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
            How We Compare Low Spread Forex Brokers
          </h2>

          <p className="mt-2.5 max-w-[370px] text-[12px] leading-[1.9] text-slate-600 sm:mt-3 sm:max-w-none sm:text-base sm:leading-8">
            Our forex spread comparison considers average spreads,
            commissions, account type and minimum deposit. This helps
            identify the real trading cost instead of relying only on the
            lowest advertised spread.
          </p>

          <div className="mt-4 rounded-[17px] border border-brand-200 bg-white p-3.5 sm:mt-5 sm:p-4">
            <div className="text-sm font-black text-slate-950">
              Our Core Trading Cost Formula
            </div>

            <div className="mt-2 rounded-xl bg-brand-50 px-3 py-2.5 text-center text-[13px] font-black leading-6 text-brand-700 sm:py-3 sm:text-sm">
              Estimated Trading Cost = Average Spread + Commission
            </div>

            <p className="mt-2.5 text-[11px] leading-5 text-slate-500 sm:mt-3 sm:text-xs sm:leading-6">
              We also review the account structure, minimum deposit,
              pricing transparency and suitability for beginners, scalpers
              and active traders.
            </p>

            <Link
              href="/en/learn-trading/spread"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-black text-brand-600 transition hover:text-brand-700"
            >
              Learn more about forex spreads
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* RELATED LINKS - DESKTOP */}
          <div className="mt-4 hidden lg:block">
            <div className="mb-2 text-[11px] font-black text-slate-950">
              Related Forex Resources
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/en/brokers"
                className="flex min-h-[54px] items-center justify-between gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2 transition hover:border-brand-200 hover:bg-brand-50"
              >
                <span className="text-[10px] font-black leading-4 text-slate-800">
                  Forex Broker Reviews
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
                  Best Forex Brokers
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
                  Forex Broker Comparisons
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
                title: "Average Forex Spread",
                description:
                  "We compare the expected average spread instead of relying only on the lowest advertised spread available under ideal market conditions.",
              },
              {
                number: "02",
                title: "Trading Commission",
                description:
                  "We include any separate commission because a Raw Spread or ECN forex account may have a low spread but a higher cost per lot.",
              },
              {
                number: "03",
                title: "Account Type",
                description:
                  "Standard, Raw Spread, ECN and Cent accounts are ranked separately so similar pricing structures are compared fairly.",
              },
              {
                number: "04",
                title: "Minimum Deposit",
                description:
                  "We review the minimum deposit and account requirements because some low spread forex brokers require a higher opening balance.",
              },
              {
                number: "05",
                title: "Trading Style",
                description:
                  "The best forex account for scalping and frequent trading may not be the most suitable choice for beginners or long-term traders.",
              },
              {
                number: "06",
                title: "Pricing Transparency",
                description:
                  "We favor brokers that clearly disclose spreads, commissions, execution terms and other important forex trading costs.",
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
                title: "Average Forex Spread",
                description:
                  "We use estimated average pricing, not only the lowest promotional spread.",
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
                  "We separate Standard, Raw Spread, ECN and Cent accounts for a fair comparison.",
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

            <div className="grid gap-3 border-t border-brand-200 bg-white px-4 py-3">
              <div>
                <h3 className="text-[11px] font-black text-slate-950">
                  Minimum Deposit
                </h3>

                <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                  We review the minimum amount required to open the account.
                </p>
              </div>

              <div>
                <h3 className="text-[11px] font-black text-slate-950">
                  Trading Style
                </h3>

                <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                  An account suitable for scalping may not be best for every
                  trader.
                </p>
              </div>

              <div>
                <h3 className="text-[11px] font-black text-slate-950">
                  Pricing Transparency
                </h3>

                <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                  We prefer brokers that clearly explain spreads, commissions
                  and execution conditions.
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* HOW TO CHOOSE */}
<section
  id="account-guide"
  className="scroll-mt-24 pb-7 sm:pb-10 lg:pb-12"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
      {/* HEADER */}
      <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-5 sm:px-7 sm:py-6">
        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
          Forex Account Selection Guide
        </span>

        <h2 className="mt-3 max-w-[360px] text-[24px] font-black leading-[1.28] tracking-[-0.01em] text-slate-950 sm:max-w-[950px] sm:text-4xl sm:leading-tight">
          How to Choose the Best Forex Account for Your Trading
        </h2>

        <p className="mt-2.5 max-w-[380px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:max-w-[1050px] sm:text-base sm:leading-8">
          The best forex account depends on your trading frequency, account
          size and total trading costs. Compare the spread, commission and
          account conditions before choosing a forex broker.
        </p>
      </div>

      {/* DESKTOP */}
      <div className="hidden grid-cols-2 gap-4 p-5 md:grid sm:p-7 xl:grid-cols-4">
        {[
          {
            title: "Best Forex Account for Beginners",
            account: "Standard",
            description:
              "A Standard forex account is usually easier to understand because the trading cost is included in the spread and there is often no separate commission.",
          },
          {
            title: "Best Account for Scalping",
            account: "Raw / ECN",
            description:
              "A Raw Spread or ECN forex account may offer tighter spreads for scalping and frequent trading, but the commission must be added to the total cost.",
          },
          {
            title: "Best Account for Small Balances",
            account: "Cent / Micro",
            description:
              "Cent and Micro accounts allow smaller trade sizes and lower capital exposure, which can help beginners test strategies and manage risk.",
          },
          {
            title: "Best Account for Low Trading Costs",
            account: "Spread + Commission",
            description:
              "Compare the average spread and commission together. The lowest advertised spread does not always mean the cheapest forex account.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="flex min-h-[330px] flex-col rounded-[22px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
          >
            <span className="inline-flex w-fit rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600">
              {item.account}
            </span>

            <h3 className="mt-4 min-h-[52px] text-lg font-black leading-7 text-slate-950">
              {item.title}
            </h3>

            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
              {item.description}
            </p>

            <a
              href="#account-types"
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
            >
              Compare Account Types
              <span className="ml-1">→</span>
            </a>
          </article>
        ))}
      </div>

      {/* MOBILE */}
      <div className="grid gap-3 p-4 md:hidden">
        {[
          {
            title: "For Forex Beginners",
            account: "Standard",
            description:
              "Simple pricing with no separate commission in many cases.",
          },
          {
            title: "For Scalping and Frequent Trading",
            account: "Raw / ECN",
            description:
              "Tighter spreads may help, but the commission must also be calculated.",
          },
          {
            title: "For Smaller Trading Balances",
            account: "Cent / Micro",
            description:
              "Smaller position sizes can reduce capital exposure while learning.",
          },
          {
            title: "For the Lowest Total Cost",
            account: "Spread + Commission",
            description:
              "Compare the average spread and commission instead of choosing by spread alone.",
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
                Compare Account Types
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
    <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-4 py-5 sm:rounded-[26px] sm:px-6 sm:py-6">
      <div className="grid gap-3.5 sm:grid-cols-[44px_minmax(0,1fr)] sm:items-start">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-300 bg-white text-lg font-black text-amber-700">
          !
        </span>

        <div>
          <h2 className="max-w-[360px] text-[20px] font-black leading-[1.35] tracking-[-0.01em] text-amber-950 sm:max-w-none sm:text-xl">
            Low Spreads Do Not Always Mean Lower Trading Costs
          </h2>

          <p className="mt-2 max-w-[1180px] text-sm leading-7 text-amber-950/80 sm:text-base sm:leading-8">
            Forex spreads can change with market liquidity, volatility,
            economic news and trading hours. A Raw Spread or ECN account may
            charge a separate commission, while a Standard account may include
            more of the cost in the spread. Always compare the average spread,
            commission, execution conditions, regulation and withdrawal terms
            before opening an account.
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