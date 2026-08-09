import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

const PAGE_URL =
  "https://brokeralarab.com/en/best-brokers/low-minimum-deposit";

const AR_PAGE_URL =
  "https://brokeralarab.com/best-brokers/low-minimum-deposit";

export const metadata: Metadata = {
  title: "Best Forex Brokers with Low Minimum Deposit 2026",

  description:
    "Compare the best forex brokers with low minimum deposits in 2026, including account requirements, spreads, commissions, and account types for smaller trading capital.",

  keywords: [
    "best forex brokers with low minimum deposit",
    "lowest deposit forex brokers",
    "low minimum deposit forex brokers",
    "forex brokers with low deposit",
    "best low deposit forex brokers",
    "forex brokers with no minimum deposit",
    "minimum deposit forex brokers",
    "best forex broker for small accounts",
    "forex brokers for beginners",
    "forex trading with low deposit",
    "low deposit trading accounts",
    "best forex accounts for beginners",
    "forex brokers for small capital",
    "forex minimum deposit comparison",
  ],

  alternates: {
    canonical: PAGE_URL,

    languages: {
      en: PAGE_URL,
      ar: AR_PAGE_URL,
      "x-default": PAGE_URL,
    },
  },

  openGraph: {
    title: "Best Forex Brokers with Low Minimum Deposit 2026",

    description:
      "Compare forex brokers by minimum deposit, account type, spreads, and commissions to find an account that fits a smaller starting balance.",

    url: PAGE_URL,
    type: "website",
    siteName: "Broker Alarab",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",

    title: "Best Forex Brokers with Low Minimum Deposit 2026",

    description:
      "Compare minimum deposits across forex brokers and trading account types for smaller starting capital.",
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
  min_deposit_value: number;
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

function getMinDepositValue(
  value: string | null | undefined
) {
  if (!value) return 999999;

  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/,/g, "");

  const noMinimumTerms = [
    "no minimum",
    "no min",
    "no minimum deposit",
    "without minimum deposit",
    "بدون حد أدنى",
    "بدون حد ادنى",
    "لا يوجد حد أدنى",
    "لا يوجد حد ادنى",
  ];

  if (
    noMinimumTerms.some((term) =>
      normalized.includes(term)
    )
  ) {
    return 0;
  }

  const match = normalized.match(
    /(\d+(?:\.\d+)?)/
  );

  if (!match) return 999999;

  const numberValue = Number(match[1]);

  return Number.isFinite(numberValue)
    ? numberValue
    : 999999;
}

function normalizeAccountType(
  value: string | null | undefined
) {
  const normalizedValue = (value || "")
    .toLowerCase()
    .trim();

  if (!normalizedValue) return "other";

  if (
    [
      "standard",
      "raw",
      "ecn",
      "zero",
      "pro",
      "cent",
    ].includes(normalizedValue)
  ) {
    return normalizedValue;
  }

  return "other";
}

function accountSlug(
  value: string | null | undefined
) {
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
    zero: "Zero Accounts",
    pro: "Pro Accounts",
    cent: "Cent / Micro Accounts",
    other: "Other Accounts",
  };

  return labels[type] || type;
}

function getAccountTypeShortLabel(
  type: string
) {
  const labels: Record<string, string> = {
    standard: "Standard",
    raw: "Raw",
    ecn: "ECN",
    zero: "Zero",
    pro: "Pro",
    cent: "Cent",
    other: "Other",
  };

  return labels[type] || type;
}

function getAccountTypeIntro(type: string) {
  const introductions: Record<
    string,
    string
  > = {
    standard:
      "Standard accounts are among the most common choices for forex traders, but initial deposit requirements can vary considerably. We compare these accounts by the minimum amount required to start trading while also showing spreads and commissions.",

    raw:
      "Raw Spread accounts are generally designed for traders looking for tighter spreads, although some brokers require a higher initial deposit. We compare the minimum deposit together with spreads and commissions.",

    ecn:
      "Minimum deposit requirements for ECN accounts vary between brokers and may be higher than those for standard accounts. This comparison shows the starting capital required alongside the account's key trading costs.",

    cent:
      "Cent and Micro accounts can be useful for traders who want to start with smaller capital because they may support smaller trading sizes and lower minimum deposit requirements.",

    other:
      "Account opening requirements differ between brokers. We compare the minimum deposit together with the account type and trading costs before ranking the available options.",
  };

  return (
    introductions[type] ||
    introductions.other
  );
}

function getAccountTypeRecommendation(
  type: string
) {
  const recommendations: Record<
    string,
    string
  > = {
    standard: "Popular starting option",
    raw: "For tighter spreads",
    ecn: "For active traders",
    cent: "For smaller capital",
    other: "Check account terms",
  };

  return (
    recommendations[type] ||
    recommendations.other
  );
}

function compareByMinimumDeposit(
  a: PreparedAccount,
  b: PreparedAccount
) {
  /*
   * Primary ranking factor:
   * lowest minimum deposit first.
   */
  if (
    a.min_deposit_value !==
    b.min_deposit_value
  ) {
    return (
      a.min_deposit_value -
      b.min_deposit_value
    );
  }

  /*
   * If the minimum deposit is the same,
   * the broker with the higher rating ranks first.
   */
  const ratingA = Number(
    a.broker_rating
  );

  const ratingB = Number(
    b.broker_rating
  );

  if (
    Number.isFinite(ratingA) &&
    Number.isFinite(ratingB) &&
    ratingA !== ratingB
  ) {
    return ratingB - ratingA;
  }

  /*
   * Final tie-breaker.
   */
  return (
    (a.sort_order ?? 999) -
    (b.sort_order ?? 999)
  );
}

function getBrokerName(
  broker: BrokerGenericRow | undefined,
  brokerId: number
) {
  return (
    broker?.name ||
    broker?.title ||
    broker?.broker_name ||
    broker?.name_en ||
    broker?.name_ar ||
    broker?.slug ||
    `Broker ${brokerId}`
  );
}

function getBrokerSlug(
  broker: BrokerGenericRow | undefined
) {
  return (
    broker?.slug ||
    broker?.broker_slug ||
    null
  );
}

function getBrokerRating(
  broker: BrokerGenericRow | undefined
) {
  return (
    broker?.rating ??
    broker?.score ??
    broker?.overall_rating ??
    null
  );
}

function getBrokerLogo(
  broker: BrokerGenericRow | undefined
) {
  return (
    broker?.logo ||
    broker?.logo_url ||
    broker?.image ||
    null
  );
}

function getBrokerAccountUrl(
  broker: BrokerGenericRow | undefined
) {
  return (
    broker?.real_account_url ||
    broker?.account_url ||
    broker?.website_url ||
    null
  );
}

function getBrokerWebsiteUrl(
  broker: BrokerGenericRow | undefined
) {
  return (
    broker?.website_url ||
    broker?.account_url ||
    null
  );
}

function formatRating(
  value: number | string | null
) {
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

  /*
   * Keep two decimal places:
   * 4.46 stays 4.46
   * 4.4 becomes 4.40
   */
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
    large: "h-14 w-14 rounded-2xl",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white p-1.5 ${sizeClasses[size]}`}
    >
      {src ? (
        <img
          src={src}
          alt={`${alt} minimum deposit`}
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

function RankingBadge({
  index,
}: {
  index: number;
}) {
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

function AccountLink({
  item,
}: {
  item: PreparedAccount;
}) {
  if (
    !item.broker_slug ||
    !item.account_name
  ) {
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
  const reviewHref =
    item.broker_slug
      ? `/en/brokers/${item.broker_slug}`
      : null;

  const accountHref =
    item.broker_account_url ||
    item.broker_website_url ||
    null;

  if (!reviewHref && !accountHref) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 ${
        compact
          ? "justify-center"
          : "w-full"
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
          rel="sponsored noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-xl bg-brand-500 font-extrabold text-white shadow-sm transition hover:bg-brand-600 ${
            compact
              ? "min-w-[92px] px-3 py-2 text-[11px]"
              : "flex-1 px-4 py-2.5 text-xs"
          }`}
        >
          Open Account
        </a>
      ) : null}
    </div>
  );
}

export default async function LowMinimumDepositBrokersPage() {
  const supabase =
    await createClient();

  const {
    data: accountsData,
    error: accountsError,
  } = await supabase
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
    .order("broker_id", {
      ascending: true,
    })
    .order("sort_order", {
      ascending: true,
    });

  if (accountsError) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-16">
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7 text-left">

          <h1 className="text-2xl font-black text-slate-950">
            Unable to load account data
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {accountsError.message}
          </p>
        </div>
      </main>
    );
  }

  const brokerIds =
    Array.from(
      new Set(
        (accountsData ?? [])
          .map(
            (row) => row.broker_id
          )
          .filter(
            (
              brokerId
            ): brokerId is number =>
              Boolean(brokerId)
          )
      )
    );

  const {
    data: brokersData,
    error: brokersError,
  } = await supabase
    .from("brokers")
    .select("*")
    .in("id", brokerIds);

  if (brokersError) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-16">
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7 text-left">

          <h1 className="text-2xl font-black text-slate-950">
            Unable to load broker data
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {brokersError.message}
          </p>
        </div>
      </main>
    );
  }

  const brokersMap =
    new Map<
      number,
      BrokerGenericRow
    >(
      (
        (brokersData ??
          []) as BrokerGenericRow[]
      ).map((broker) => [
        broker.id,
        broker,
      ])
    );

  const accounts: PreparedAccount[] =
    (
      (accountsData ??
        []) as BrokerAccountRow[]
    ).map((row) => {
      const broker =
        brokersMap.get(
          row.broker_id
        );

      return {
        ...row,

        broker_name:
          getBrokerName(
            broker,
            row.broker_id
          ),

        broker_slug:
          getBrokerSlug(broker),

        broker_rating:
          getBrokerRating(broker),

        broker_logo:
          getBrokerLogo(broker),

        broker_intro:
          broker?.intro_en ??
          broker?.intro ??
          null,

        broker_best_for:
          broker?.best_for_en ??
          broker?.best_for ??
          null,

        broker_account_url:
          getBrokerAccountUrl(
            broker
          ),

        broker_website_url:
          getBrokerWebsiteUrl(
            broker
          ),

        broker_islamic_label:
          broker?.islamic_en ??
          broker?.islamic ??
          null,

        broker_arabic_support:
          broker?.arabic_support ??
          broker?.arabic_sup ??
          null,

        normalized_account_type:
          normalizeAccountType(
            row.account_type
          ),

        min_deposit_value:
          getMinDepositValue(
            row.min_deposit
          ),
      };
    });

  /*
   * Exclude accounts where a usable minimum
   * deposit value cannot be determined.
   */
  const accountsWithKnownDeposit =
    accounts.filter(
      (account) =>
        account.min_deposit_value <
        999999
    );

  /*
   * Rank accounts within each account type.
   */
  const groupedByType = [
    "standard",
    "raw",
    "ecn",
    "cent",
  ]
    .map((type) => {
      const items =
        accountsWithKnownDeposit
          .filter(
            (account) =>
              account.normalized_account_type ===
              type
          )
          .sort(
            compareByMinimumDeposit
          );

      return {
        type,

        label:
          getAccountTypeLabel(
            type
          ),

        shortLabel:
          getAccountTypeShortLabel(
            type
          ),

        intro:
          getAccountTypeIntro(
            type
          ),

        recommendation:
          getAccountTypeRecommendation(
            type
          ),

        winner:
          items[0] || null,

        items,
      };
    })
    .filter(
      (group) =>
        group.items.length > 0
    );

  /*
   * Take only the lowest-deposit account
   * from each broker before building the
   * overall broker ranking.
   *
   * This prevents one broker from occupying
   * several positions in the Top 10.
   */
  const lowestAccountByBroker =
    Array.from(
      new Set(
        accountsWithKnownDeposit.map(
          (account) =>
            account.broker_id
        )
      )
    )
      .map((brokerId) => {
        const brokerAccounts =
          accountsWithKnownDeposit
            .filter(
              (account) =>
                account.broker_id ===
                brokerId
            )
            .sort(
              compareByMinimumDeposit
            );

        return (
          brokerAccounts[0] ||
          null
        );
      })
      .filter(
        (
          item
        ): item is PreparedAccount =>
          Boolean(item)
      )
      .sort(
        compareByMinimumDeposit
      );

  const bestOverall =
    lowestAccountByBroker.slice(
      0,
      10
    );

  const uniqueBrokerCount =
    new Set(
      accountsWithKnownDeposit.map(
        (account) =>
          account.broker_id
      )
    ).size;

  const bestStandard =
    groupedByType.find(
      (group) =>
        group.type === "standard"
    )?.winner || null;

  const bestRaw =
    groupedByType.find(
      (group) =>
        group.type === "raw"
    )?.winner || null;

  const bestEcn =
    groupedByType.find(
      (group) =>
        group.type === "ecn"
    )?.winner || null;

  const bestCent =
    groupedByType.find(
      (group) =>
        group.type === "cent"
    )?.winner || null;

  const brokerSummaries: BrokerSummary[] =
    Array.from(
      new Set(
        accountsWithKnownDeposit.map(
          (account) =>
            account.broker_id
        )
      )
    )
      .map((brokerId) => {
        const brokerAccounts =
          accountsWithKnownDeposit
            .filter(
              (account) =>
                account.broker_id ===
                brokerId
            )
            .sort(
              compareByMinimumDeposit
            );

        const firstAccount =
          brokerAccounts[0];

        if (!firstAccount) {
          return null;
        }

        return {
          broker_id:
            brokerId,

          broker_name:
            firstAccount.broker_name,

          broker_slug:
            firstAccount.broker_slug,

          broker_logo:
            firstAccount.broker_logo,

          broker_rating:
            firstAccount.broker_rating,

          broker_account_url:
            firstAccount.broker_account_url,

          broker_website_url:
            firstAccount.broker_website_url,

          best_standard:
            brokerAccounts.find(
              (account) =>
                account.normalized_account_type ===
                "standard"
            ) || null,

          best_raw:
            brokerAccounts.find(
              (account) =>
                account.normalized_account_type ===
                "raw"
            ) || null,

          best_ecn:
            brokerAccounts.find(
              (account) =>
                account.normalized_account_type ===
                "ecn"
            ) || null,

          best_cent:
            brokerAccounts.find(
              (account) =>
                account.normalized_account_type ===
                "cent"
            ) || null,

          best_overall:
            firstAccount,
        };
      })
      .filter(
        Boolean
      ) as BrokerSummary[];

  /*
   * FAQ structured data.
   * These questions will also appear visibly
   * in Part 3 of the page.
   */
  const faqJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "FAQPage",

    mainEntity: [
      {
        "@type":
          "Question",

        name:
          "What is the lowest minimum deposit for forex trading?",

        acceptedAnswer: {
          "@type":
            "Answer",

          text:
            "The minimum deposit varies by forex broker and account type. Some accounts may have no fixed minimum deposit, while others require a specific starting amount. Traders should always check the current account requirements before depositing funds.",
        },
      },

      {
        "@type":
          "Question",

        name:
          "Is the forex broker with the lowest deposit always the best?",

        acceptedAnswer: {
          "@type":
            "Answer",

          text:
            "No. A low minimum deposit can make an account more accessible, but broker selection should also consider regulation, spreads, commissions, account type, trading platforms, and deposit and withdrawal conditions.",
        },
      },

      {
        "@type":
          "Question",

        name:
          "Which forex account is suitable for a small starting balance?",

        acceptedAnswer: {
          "@type":
            "Answer",

          text:
            "It depends on the broker, but Standard, Cent, and Micro accounts may be available with relatively low starting capital. Traders should compare the minimum deposit, trading costs, and risk management requirements before choosing an account.",
        },
      },

      {
        "@type":
          "Question",

        name:
          "Are there forex brokers with no minimum deposit?",

        acceptedAnswer: {
          "@type":
            "Answer",

          text:
            "Some forex brokers may offer accounts without a fixed minimum deposit. However, payment methods, account type, geographic region, or regulatory entity may still impose different funding requirements.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement: [
      {
        "@type":
          "ListItem",

        position: 1,

        name:
          "Home",

        item:
          "https://brokeralarab.com/en",
      },

      {
        "@type":
          "ListItem",

        position: 2,

        name:
          "Best Brokers",

        item:
          "https://brokeralarab.com/en/best-brokers",
      },

      {
        "@type":
          "ListItem",

        position: 3,

        name:
          "Best Forex Brokers with Low Minimum Deposit",

        item:
          PAGE_URL,
      },
    ],
  };

  const webPageJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "WebPage",

    name:
      "Best Forex Brokers with Low Minimum Deposit 2026",

    url:
      PAGE_URL,

    description:
      "Compare the best forex brokers by minimum deposit, account type, spreads, and commissions.",

    inLanguage:
      "en",

    isPartOf: {
      "@type":
        "WebSite",

      name:
        "Broker Alarab",

      url:
        "https://brokeralarab.com/en",
    },
  };

  const itemListJsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "ItemList",

    name:
      "Best Forex Brokers with Low Minimum Deposit 2026",

    itemListOrder:
      "https://schema.org/ItemListOrderAscending",

    numberOfItems:
      bestOverall.length,

    itemListElement:
      bestOverall.map(
        (item, index) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name: `${
            item.broker_name
          } - ${
            item.account_name ||
            "Trading Account"
          }`,

          url:
            item.broker_slug
              ? `https://brokeralarab.com/en/brokers/${item.broker_slug}`
              : PAGE_URL,
        })
      ),
  };

  const heroWinners =
    bestOverall.slice(0, 3);

  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f5f7fb] text-slate-900"
    >
      <Script
        id="low-minimum-deposit-en-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              faqJsonLd
            ),
        }}
      />

      <Script
        id="low-minimum-deposit-en-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      <Script
        id="low-minimum-deposit-en-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageJsonLd
            ),
        }}
      />

      <Script
        id="low-minimum-deposit-en-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              itemListJsonLd
            ),
        }}
      />

      {/* HERO */}
      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 pb-6 pt-7 sm:px-6 sm:pb-7 sm:pt-8 lg:px-8 lg:py-7 xl:px-10 xl:py-8">

          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)] lg:gap-8 xl:gap-10">

            {/* HERO CONTENT */}
            <div className="text-left">

              <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-600 sm:text-xs">

                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />

                Minimum Deposit Comparison 2026
              </div>

              <h1 className="mt-3 max-w-[940px] text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-slate-950 min-[380px]:text-[32px] sm:text-[43px] sm:leading-[1.1] lg:text-[48px] xl:text-[52px]">

                Best Forex Brokers

                <span className="mt-0.5 block text-brand-500">
                  with Low Minimum Deposit in 2026
                </span>
              </h1>

              <p className="mt-3 max-w-[850px] text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-7 lg:max-w-[820px]">

                Compare forex brokers by{" "}

                <strong className="font-black text-slate-900">
                  minimum deposit
                </strong>

                , see how much capital is required to open each account,
                and compare account types, spreads, and commissions to find
                options suitable for a smaller starting balance.
              </p>

              {/* STATS */}
              <div className="mt-4 grid max-w-[640px] grid-cols-2 gap-2.5 sm:grid-cols-3">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center sm:px-4">

                  <div className="text-xl font-black text-slate-950 lg:text-[21px]">
                    {uniqueBrokerCount}
                  </div>

                  <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:text-[11px]">
                    Brokers Compared
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center sm:px-4">

                  <div className="text-xl font-black text-slate-950 lg:text-[21px]">
                    {accountsWithKnownDeposit.length}
                  </div>

                  <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:text-[11px]">
                    Accounts Compared
                  </div>
                </div>

                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-center sm:block">

                  <div className="text-xl font-black text-slate-950 lg:text-[21px]">
                    {bestOverall.length}
                  </div>

                  <div className="mt-0.5 text-[11px] font-bold text-slate-500">
                    Top Options
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">

                <a
                  href="#account-types"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(30,91,184,0.16)] transition hover:bg-brand-600 sm:w-auto sm:min-w-[205px]"
                >
                  Compare Minimum Deposits
                </a>

                <a
                  href="#best-by-category"
                  className="hidden min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-extrabold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 sm:inline-flex sm:min-w-[185px]"
                >
                  Best Accounts
                </a>
              </div>
            </div>

            {/* DESKTOP SUMMARY */}
            <div className="hidden lg:block">

              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.065)]">

                {/* SUMMARY HEADER */}
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50/70 px-5 py-3">

                  <div>
                    <h2 className="text-base font-black text-slate-950">
                      Lowest Deposit Forex Brokers
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Leading results by minimum account deposit
                    </p>
                  </div>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">
                    Updated
                  </span>
                </div>

                {/* SUMMARY ROWS */}
                <div className="divide-y divide-slate-200">

                  {heroWinners.map((item, index) => (
                    <div
                      key={`${item.broker_id}-${item.id}`}
                      className="grid grid-cols-[30px_36px_minmax(0,1fr)_auto] items-center gap-2.5 px-5 py-2.5"
                    >
                      <RankingBadge index={index} />

                      {/* CLICKABLE BROKER LOGO */}
                      {item.broker_slug ? (
                        <Link
                          href={`/en/brokers/${item.broker_slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex shrink-0 items-center"
                          aria-label={`Open ${item.broker_name} review`}
                        >
                          <CompactLogo
                            src={item.broker_logo}
                            alt={item.broker_name}
                            size="small"
                          />
                        </Link>
                      ) : (
                        <CompactLogo
                          src={item.broker_logo}
                          alt={item.broker_name}
                          size="small"
                        />
                      )}

                      <div className="min-w-0">

                        {/* CLICKABLE BROKER NAME */}
                        {item.broker_slug ? (
                          <Link
                            href={`/en/brokers/${item.broker_slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-[13px] font-black text-slate-950 transition hover:text-brand-600"
                          >
                            {item.broker_name}
                          </Link>
                        ) : (
                          <div className="truncate text-[13px] font-black text-slate-950">
                            {item.broker_name}
                          </div>
                        )}

                        <div className="mt-0.5 truncate text-[10px] font-bold text-slate-500">
                          {item.account_name || "Trading Account"}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">

                        <div className="text-[9px] font-extrabold text-brand-600">
                          Minimum
                        </div>

                        <div className="mt-0.5 text-[11px] font-black text-emerald-700">
                          {item.min_deposit || "—"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SUMMARY FOOTER */}
                <div className="border-t border-slate-200 bg-slate-50 px-5 py-2.5">

                  <p className="text-[10px] leading-5 text-slate-500">
                    Brokers are ranked primarily by the lowest available
                    minimum deposit among the accounts included in our
                    comparison, while account type and conditions are also reviewed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE QUICK WINNERS */}
          <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 lg:hidden">

            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

              <h2 className="text-sm font-black text-slate-950">
                Lowest Deposit Brokers
              </h2>

              <span className="text-[10px] font-extrabold text-brand-600">
                Quick Comparison
              </span>
            </div>

            <div className="divide-y divide-slate-200">

              {heroWinners.map((item, index) => (
                <div
                  key={`${item.broker_id}-${item.id}`}
                  className="grid grid-cols-[30px_36px_minmax(0,1fr)_auto] items-center gap-2.5 px-3.5 py-3"
                >
                  <RankingBadge index={index} />

                  {item.broker_slug ? (
                    <Link
                      href={`/en/brokers/${item.broker_slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center"
                      aria-label={`Open ${item.broker_name} review`}
                    >
                      <CompactLogo
                        src={item.broker_logo}
                        alt={item.broker_name}
                        size="small"
                      />
                    </Link>
                  ) : (
                    <CompactLogo
                      src={item.broker_logo}
                      alt={item.broker_name}
                      size="small"
                    />
                  )}

                  <div className="min-w-0">

                    {item.broker_slug ? (
                      <Link
                        href={`/en/brokers/${item.broker_slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-sm font-black text-slate-950 transition hover:text-brand-600"
                      >
                        {item.broker_name}
                      </Link>
                    ) : (
                      <div className="truncate text-sm font-black text-slate-950">
                        {item.broker_name}
                      </div>
                    )}

                    <div className="mt-0.5 truncate text-[10px] font-bold text-slate-500">
                      {item.account_name || "Trading Account"}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">

                    <div className="text-[9px] font-extrabold text-brand-600">
                      Min. Deposit
                    </div>

                    <div className="mt-0.5 text-[11px] font-black text-emerald-700">
                      {item.min_deposit || "—"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAGE NAVIGATION */}
      <section className="hidden border-b border-slate-200 bg-white sm:block">

        <div className="mx-auto max-w-[1520px] px-6 py-3 lg:px-8 xl:px-10">

          <nav
            aria-label="Page navigation"
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {[
              {
                href: "#account-types",
                label: "Deposit Comparison",
              },
              {
                href: "#head-to-head",
                label: "Broker Comparison",
              },
              {
                href: "#best-by-category",
                label: "Best Accounts",
              },
              {
                href: "#selection-method",
                label: "Methodology",
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

           {/* ACCOUNT TYPES */}
      <section
        id="account-types"
        className="scroll-mt-24 pb-8 pt-7 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          {/* SECTION INTRO */}
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-8">

            <div className="max-w-[950px] text-left">

              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                Minimum Deposit Comparison
              </span>

              <h2 className="mt-3 max-w-[860px] text-[26px] font-black leading-[1.22] text-slate-950 sm:text-4xl sm:leading-tight">
                Lowest Deposit by Trading Account Type
              </h2>

              <p className="mt-3 max-w-[920px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Minimum deposit requirements can vary significantly between
                account types. We separate Standard, Raw, ECN, and Cent accounts
                so you can compare the lowest starting deposit within each category.
              </p>
            </div>

            <div className="hidden rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4 text-left lg:block">

              <div className="flex items-center gap-2">

                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-black text-amber-800">
                  !
                </span>

                <div className="text-xs font-black text-amber-950">
                  The lowest deposit is not the only factor
                </div>
              </div>

              <p className="mt-2 text-xs leading-6 text-amber-900/80">
                Also review regulation, spreads, commissions, and account
                conditions before opening a trading account.
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
                <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-4 sm:px-6 sm:py-5 lg:px-7">

                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">

                    <div className="min-w-0 text-left">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[10px] font-black text-white sm:text-[11px]">
                          {group.shortLabel}
                        </span>

                        <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-extrabold text-slate-600 sm:text-[11px]">
                          {group.recommendation}
                        </span>
                      </div>

                      <h3 className="mt-3 text-[20px] font-black leading-[1.28] text-slate-950 min-[380px]:text-[21px] sm:text-2xl lg:text-[28px]">
                        Lowest Deposit for {group.label}
                      </h3>

                      <p className="mt-2 max-w-[920px] text-[13px] leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
                        {group.intro}
                      </p>
                    </div>

                    {group.winner ? (
                      <div className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-[18px] border border-emerald-300 bg-emerald-50 px-3.5 py-3">

                        {group.winner.broker_slug ? (
                          <Link
                            href={`/en/brokers/${group.winner.broker_slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex shrink-0 items-center"
                            aria-label={`Open ${group.winner.broker_name} review`}
                          >
                            <CompactLogo
                              src={group.winner.broker_logo}
                              alt={group.winner.broker_name}
                              size="small"
                            />
                          </Link>
                        ) : (
                          <CompactLogo
                            src={group.winner.broker_logo}
                            alt={group.winner.broker_name}
                            size="small"
                          />
                        )}

                        <div className="min-w-0">

                          <div className="text-[9px] font-black text-emerald-700 sm:text-[10px]">
                            Lowest deposit in this category
                          </div>

                          {group.winner.broker_slug ? (
                            <Link
                              href={`/en/brokers/${group.winner.broker_slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-0.5 block truncate text-sm font-black text-slate-950 transition hover:text-brand-600"
                            >
                              {group.winner.broker_name}
                            </Link>
                          ) : (
                            <div className="mt-0.5 truncate text-sm font-black text-slate-950">
                              {group.winner.broker_name}
                            </div>
                          )}

                          <div className="mt-0.5 truncate text-[10px] font-extrabold text-slate-500 sm:text-[11px]">
                            {group.winner.account_name || "—"}
                          </div>
                        </div>

                        <div className="shrink-0 border-l border-emerald-200 pl-3 text-right">

                          <div className="text-[9px] font-bold text-slate-500">
                            Minimum
                          </div>

                          <div className="mt-0.5 text-xs font-black text-emerald-700 sm:text-sm">
                            {group.winner.min_deposit || "—"}
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

                          <th className="w-[29%] px-4 py-3.5 font-black">
                            Broker & Account
                          </th>

                          <th className="w-[16%] px-4 py-3.5 text-center font-black">
                            Minimum Deposit
                          </th>

                          <th className="w-[12%] px-4 py-3.5 text-center font-black">
                            Spread
                          </th>

                          <th className="w-[14%] px-4 py-3.5 text-center font-black">
                            Commission
                          </th>

                          <th className="w-[22%] px-4 py-3.5 text-center font-black">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {group.items.slice(0, 7).map((item, index) => (
                          <tr
                            key={item.id}
                            className="border-t border-slate-200 bg-white text-sm transition hover:bg-brand-50/30"
                          >

                            <td className="px-4 py-3 text-center">
                              <RankingBadge index={index} />
                            </td>

                            <td className="px-4 py-3">

                              <div className="flex items-center gap-3">

                                {/* CLICKABLE BROKER LOGO */}
                                {item.broker_slug ? (
                                  <Link
                                    href={`/en/brokers/${item.broker_slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex shrink-0 items-center"
                                    aria-label={`Open ${item.broker_name} review`}
                                  >
                                    <CompactLogo
                                      src={item.broker_logo}
                                      alt={item.broker_name}
                                      size="small"
                                    />
                                  </Link>
                                ) : (
                                  <CompactLogo
                                    src={item.broker_logo}
                                    alt={item.broker_name}
                                    size="small"
                                  />
                                )}

                                <div className="min-w-0">

                                  {/* CLICKABLE BROKER NAME */}
                                  {item.broker_slug ? (
                                    <Link
                                      href={`/en/brokers/${item.broker_slug}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block truncate text-[13px] font-black text-slate-950 transition hover:text-brand-600"
                                    >
                                      {item.broker_name}
                                    </Link>
                                  ) : (
                                    <div className="truncate text-[13px] font-black text-slate-950">
                                      {item.broker_name}
                                    </div>
                                  )}

                                  <div className="mt-1 flex flex-wrap items-center gap-2">

                                    <AccountLink item={item} />

                                    {formatRating(item.broker_rating) ? (
                                      <span className="text-[10px] font-black text-amber-600">
                                        ★ {formatRating(item.broker_rating)}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-3 text-center">

                              <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
                                {item.min_deposit || "—"}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-center text-xs font-extrabold text-slate-800">
                              {item.spread || "—"}
                            </td>

                            <td className="px-4 py-3 text-center text-xs font-extrabold text-slate-800">
                              {item.commission_en || item.commission || "—"}
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

                          {item.broker_slug ? (
                            <Link
                              href={`/en/brokers/${item.broker_slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${item.broker_name} review`}
                            >
                              <CompactLogo
                                src={item.broker_logo}
                                alt={item.broker_name}
                                size="small"
                              />
                            </Link>
                          ) : (
                            <CompactLogo
                              src={item.broker_logo}
                              alt={item.broker_name}
                              size="small"
                            />
                          )}

                          <div className="min-w-0">

                            {item.broker_slug ? (
                              <Link
                                href={`/en/brokers/${item.broker_slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block truncate text-[15px] font-black text-slate-950 transition hover:text-brand-600"
                              >
                                {item.broker_name}
                              </Link>
                            ) : (
                              <div className="truncate text-[15px] font-black text-slate-950">
                                {item.broker_name}
                              </div>
                            )}

                            <div className="mt-1">
                              <AccountLink item={item} />
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                          <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">

                            <div className="text-[8px] font-extrabold text-slate-500">
                              Deposit
                            </div>

                            <div className="mt-1 text-[11px] font-black leading-5 text-emerald-700">
                              {item.min_deposit || "—"}
                            </div>
                          </div>

                          <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">

                            <div className="text-[8px] font-extrabold text-slate-500">
                              Spread
                            </div>

                            <div className="mt-1 text-[10px] font-black leading-5 text-slate-900">
                              {item.spread || "—"}
                            </div>
                          </div>

                          <div className="px-1.5 py-2.5 text-center">

                            <div className="text-[8px] font-extrabold text-slate-500">
                              Commission
                            </div>

                            <div className="mt-1 break-words text-[10px] font-black leading-5 text-slate-900">
                              {item.commission_en || item.commission || "—"}
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

                        Show More Accounts

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

                                <RankingBadge index={index + 2} />

                                {item.broker_slug ? (
                                  <Link
                                    href={`/en/brokers/${item.broker_slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${item.broker_name} review`}
                                  >
                                    <CompactLogo
                                      src={item.broker_logo}
                                      alt={item.broker_name}
                                      size="small"
                                    />
                                  </Link>
                                ) : (
                                  <CompactLogo
                                    src={item.broker_logo}
                                    alt={item.broker_name}
                                    size="small"
                                  />
                                )}

                                <div className="min-w-0">

                                  {item.broker_slug ? (
                                    <Link
                                      href={`/en/brokers/${item.broker_slug}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block truncate text-sm font-black text-slate-950 transition hover:text-brand-600"
                                    >
                                      {item.broker_name}
                                    </Link>
                                  ) : (
                                    <div className="truncate text-sm font-black text-slate-950">
                                      {item.broker_name}
                                    </div>
                                  )}

                                  <div className="mt-0.5 truncate text-[10px] font-extrabold text-slate-500">
                                    {item.account_name || "—"}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                                <div className="border-r border-slate-200 px-1 py-2 text-center">

                                  <div className="text-[8px] font-bold text-slate-500">
                                    Deposit
                                  </div>

                                  <div className="mt-0.5 text-[10px] font-black leading-5 text-emerald-700">
                                    {item.min_deposit || "—"}
                                  </div>
                                </div>

                                <div className="border-r border-slate-200 px-1 py-2 text-center">

                                  <div className="text-[8px] font-bold text-slate-500">
                                    Spread
                                  </div>

                                  <div className="mt-0.5 text-[10px] font-black leading-5 text-slate-900">
                                    {item.spread || "—"}
                                  </div>
                                </div>

                                <div className="px-1 py-2 text-center">

                                  <div className="text-[8px] font-bold text-slate-500">
                                    Commission
                                  </div>

                                  <div className="mt-0.5 break-words text-[9px] font-black leading-4 text-slate-900">
                                    {item.commission_en || item.commission || "—"}
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-4 sm:px-7 sm:py-6">

              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600 sm:text-[11px]">
                Direct Comparison
              </span>

              <h2 className="mt-2.5 max-w-[850px] text-[23px] font-black leading-[1.25] text-slate-950 min-[380px]:text-[25px] sm:mt-3 sm:text-4xl sm:leading-tight">
                Compare Minimum Deposits Across Brokers
              </h2>

              <p className="mt-2 max-w-[900px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-8">
                Compare the lowest available deposit for each account type,
                together with the broker rating and key account categories.
              </p>
            </div>

            <div className="p-4 sm:p-6">

              <div className="grid gap-4 md:grid-cols-2">

                {brokerSummaries.slice(0, 8).map((broker) => (
                  <article
                    key={broker.broker_id}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-4"
                  >

                    <div className="flex items-center gap-3">

                      {/* BROKER LOGO */}
                      {broker.broker_slug ? (
                        <Link
                          href={`/en/brokers/${broker.broker_slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex shrink-0 items-center"
                          aria-label={`Open ${broker.broker_name} review`}
                        >
                          <CompactLogo
                            src={broker.broker_logo}
                            alt={broker.broker_name}
                            size="normal"
                          />
                        </Link>
                      ) : (
                        <CompactLogo
                          src={broker.broker_logo}
                          alt={broker.broker_name}
                          size="normal"
                        />
                      )}

                      <div className="min-w-0">

                        {/* BROKER NAME */}
                        {broker.broker_slug ? (
                          <Link
                            href={`/en/brokers/${broker.broker_slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-base font-black text-slate-950 transition hover:text-brand-600"
                            aria-label={`Open ${broker.broker_name} review`}
                          >
                            {broker.broker_name}
                          </Link>
                        ) : (
                          <h3 className="truncate text-base font-black text-slate-950">
                            {broker.broker_name}
                          </h3>
                        )}

                        {/* RATING */}
                        {formatRating(broker.broker_rating) ? (
                          <div className="mt-1 text-[11px] font-black text-amber-600">
                            ★ {formatRating(broker.broker_rating)}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">

                      {[
                        {
                          label: "Standard",
                          item: broker.best_standard,
                        },
                        {
                          label: "Raw",
                          item: broker.best_raw,
                        },
                        {
                          label: "ECN",
                          item: broker.best_ecn,
                        },
                        {
                          label: "Cent",
                          item: broker.best_cent,
                        },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                        >

                          <div className="text-[9px] font-bold text-slate-500">
                            {row.label}
                          </div>

                          <div className="mt-1 text-xs font-black text-emerald-700">
                            {row.item?.min_deposit || "—"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
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

            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-6 sm:px-7">

              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
                Quick Summary
              </span>

              <h2 className="mt-3 max-w-[820px] text-[26px] font-black leading-[1.22] text-slate-950 sm:text-4xl sm:leading-tight">
                Lowest Deposit Account in Each Category
              </h2>

              <p className="mt-3 max-w-[950px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                We highlight the account with the lowest minimum deposit in each
                category while keeping spreads and commissions visible for a
                more useful comparison.
              </p>
            </div>

            {(() => {
              const bestByCategory = [
                {
                  title: "Lowest Deposit Standard Account",
                  mobileTitle: "Standard",
                  type: "Standard",
                  description:
                    "One of the most common account types for getting started",
                  item: bestStandard,
                },
                {
                  title: "Lowest Deposit Raw Spread Account",
                  mobileTitle: "Raw",
                  type: "Raw",
                  description:
                    "Tighter spreads with a possible separate commission",
                  item: bestRaw,
                },
                {
                  title: "Lowest Deposit ECN Account",
                  mobileTitle: "ECN",
                  type: "ECN",
                  description:
                    "For traders looking for ECN-style account conditions",
                  item: bestEcn,
                },
                {
                  title: "Lowest Deposit Cent / Micro Account",
                  mobileTitle: "Cent / Micro",
                  type: "Cent",
                  description:
                    "Often suitable for traders starting with smaller capital",
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

                              {card.item.broker_slug ? (
                                <Link
  href={`/en/brokers/${card.item.broker_slug}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Open ${card.item.broker_name} review`}
>
  <CompactLogo
    src={card.item.broker_logo}
    alt={card.item.broker_name}
    size="small"
  />
</Link>
                              ) : (
                                <CompactLogo
                                  src={card.item.broker_logo}
                                  alt={card.item.broker_name}
                                  size="normal"
                                />
                              )}

                              <div className="min-w-0 flex-1">

                                {card.item.broker_slug ? (
                                  <Link
                                    href={`/en/brokers/${card.item.broker_slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block truncate text-base font-black text-slate-950 transition hover:text-brand-600"
                                  >
                                    {card.item.broker_name}
                                  </Link>
                                ) : (
                                  <div className="truncate text-base font-black text-slate-950">
                                    {card.item.broker_name}
                                  </div>
                                )}

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

                            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-center">

                              <div className="text-[9px] font-extrabold text-emerald-700">
                                Minimum Deposit
                              </div>

                              <div className="mt-1 text-lg font-black text-emerald-800">
                                {card.item.min_deposit || "—"}
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-white">

                              <div className="border-r border-slate-200 px-2 py-3 text-center">

                                <div className="text-[8px] font-extrabold text-slate-500">
                                  Spread
                                </div>

                                <div className="mt-1 text-[11px] font-black text-slate-950">
                                  {card.item.spread || "—"}
                                </div>
                              </div>

                              <div className="px-2 py-3 text-center">

                                <div className="text-[8px] font-extrabold text-slate-500">
                                  Commission
                                </div>

                                <div className="mt-1 break-words text-[10px] font-black text-slate-950">
                                  {card.item.commission || "—"}
                                </div>
                              </div>
                            </div>

                            <div className="mt-auto pt-5">
                              <ActionButtons item={card.item} />
                            </div>
                          </>
                        ) : (
                          <div className="mt-5 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm font-bold text-slate-500">
                            Not enough data is currently available for this category.
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
                            card.item.broker_slug ? (
                              <Link
  href={`/en/brokers/${card.item.broker_slug}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Open ${card.item.broker_name} review`}
>
  <CompactLogo
    src={card.item.broker_logo}
    alt={card.item.broker_name}
    size="small"
  />
</Link>
                            ) : (
                              <CompactLogo
                                src={card.item.broker_logo}
                                alt={card.item.broker_name}
                                size="small"
                              />
                            )
                          ) : (
                            <div className="h-9 w-9 shrink-0 rounded-xl border border-slate-200 bg-white" />
                          )}

                          <div className="min-w-0 text-left">

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
                                "Not Available"}
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

                                  {card.item.broker_slug ? (
                                    <Link
                                      href={`/en/brokers/${card.item.broker_slug}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block truncate text-base font-black text-slate-950 transition hover:text-brand-600"
                                    >
                                      {card.item.broker_name}
                                    </Link>
                                  ) : (
                                    <div className="truncate text-base font-black text-slate-950">
                                      {card.item.broker_name}
                                    </div>
                                  )}

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

                              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-center">

                                <div className="text-[9px] font-bold text-emerald-700">
                                  Minimum Deposit
                                </div>

                                <div className="mt-1 text-base font-black text-emerald-800">
                                  {card.item.min_deposit || "—"}
                                </div>
                              </div>

                              <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                                <div className="border-r border-slate-200 px-1.5 py-2.5 text-center">

                                  <div className="text-[8px] font-bold text-slate-500">
                                    Spread
                                  </div>

                                  <div className="mt-1 text-[11px] font-black text-slate-950">
                                    {card.item.spread || "—"}
                                  </div>
                                </div>

                                <div className="px-1.5 py-2.5 text-center">

                                  <div className="text-[8px] font-bold text-slate-500">
                                    Commission
                                  </div>

                                  <div className="mt-1 break-words text-[10px] font-black leading-4 text-slate-950">
                                    {card.item.commission || "—"}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4">
                                <ActionButtons item={card.item} />
                              </div>
                            </>
                          ) : (
                            <div className="rounded-2xl bg-slate-50 px-4 py-5 text-center text-sm font-bold text-slate-500">
                              Not enough data is currently available for this category.
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

                <h2 className="mt-3 max-w-[290px] text-balance text-[22px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-none min-[380px]:text-[24px] sm:text-4xl sm:leading-tight">
                  How We Rank Forex Brokers by Minimum Deposit
                </h2>

                <p className="mt-2.5 max-w-[310px] text-[12px] leading-[1.9] text-slate-600 min-[380px]:max-w-none sm:mt-3 sm:text-base sm:leading-8">
                  We review the minimum amount required to open each account
                  and rank accounts from the lowest deposit upward within each
                  category, while keeping factors such as spreads, commissions,
                  and account type visible for comparison.
                </p>

                <div className="mt-4 rounded-[17px] border border-brand-200 bg-white p-3.5 sm:mt-5 sm:p-4">

                  <div className="text-sm font-black text-slate-950">
                    Ranking Basis
                  </div>

                  <div className="mt-2 rounded-xl bg-brand-50 px-3 py-2.5 text-center text-[13px] font-black text-brand-700 sm:py-3 sm:text-sm">
                    The lowest minimum deposit ranks first
                  </div>

                  <p className="mt-2.5 text-[11px] leading-5 text-slate-500 sm:mt-3 sm:text-xs sm:leading-6">
                    When two accounts have the same minimum deposit, we use
                    the broker rating and account order as additional
                    tie-breakers. A low deposit alone does not determine the
                    overall quality of a broker.
                  </p>

                  <Link
                    href="/en/best-brokers"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-black text-brand-600 transition hover:text-brand-700"
                  >
                    Browse all Best Broker rankings

                    <span aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>

                {/* RELATED LINKS - DESKTOP */}
                <div className="mt-4 hidden lg:block">

                  <div className="mb-2 text-[11px] font-black text-slate-950">
                    Useful Links
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
                      title: "Minimum Deposit",
                      description:
                        "We review the lowest amount required to open each account and use it as the primary ranking factor on this page.",
                    },
                    {
                      number: "02",
                      title: "Trading Account Type",
                      description:
                        "We separate Standard, Raw, ECN, and Cent accounts so accounts with different structures are not ranked together unfairly.",
                    },
                    {
                      number: "03",
                      title: "Spreads & Commissions",
                      description:
                        "A low deposit does not necessarily mean lower trading costs, so spreads and commissions remain visible beside every account.",
                    },
                    {
                      number: "04",
                      title: "Broker Rating",
                      description:
                        "When deposit requirements are similar, we also consider the broker rating instead of relying on the deposit amount alone.",
                    },
                    {
                      number: "05",
                      title: "Account Suitability",
                      description:
                        "We show the account type and its characteristics so traders can judge whether it suits their available capital and trading style.",
                    },
                    {
                      number: "06",
                      title: "Data Clarity",
                      description:
                        "We only include accounts where a usable minimum deposit value is available, helping keep the ranking clear and consistent.",
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
                      title: "Minimum Deposit",
                      description:
                        "Accounts are ranked from the lowest deposit upward.",
                    },
                    {
                      number: "02",
                      title: "Account Type",
                      description:
                        "Account categories are separated for a fairer comparison.",
                    },
                    {
                      number: "03",
                      title: "Spreads & Commissions",
                      description:
                        "Trading costs are shown alongside deposit requirements.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.number}
                      className={`grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3 px-3.5 py-3 ${
                        index > 0
                          ? "border-t border-slate-200"
                          : ""
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
                      Broker rating, account conditions, account type, and
                      trading costs are considered alongside the minimum deposit.
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

              <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600 sm:text-[11px]">
                Selection Guide
              </span>

              <h2 className="mt-3 max-w-[310px] text-balance text-[22px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-[350px] min-[380px]:text-[24px] sm:max-w-[900px] sm:text-4xl sm:leading-tight">
                How to Choose a Forex Broker with a Low Minimum Deposit
              </h2>

              <p className="mt-2.5 max-w-[310px] text-[12px] leading-[1.9] text-slate-600 min-[380px]:max-w-[350px] sm:mt-3 sm:max-w-[950px] sm:text-base sm:leading-8">
                Start by deciding how much capital you want to use, then
                compare account conditions, regulation, and trading costs
                instead of choosing a broker based only on the lowest deposit.
              </p>
            </div>

            {/* DESKTOP */}
            <div className="hidden grid-cols-2 gap-4 p-6 md:grid xl:grid-cols-4 lg:p-7">

              {[
                {
                  title:
                    "If You Have Limited Starting Capital",
                  account:
                    "Low Deposit",
                  description:
                    "Start by comparing accounts with lower minimum deposits, but avoid depositing more than fits your trading plan and risk management.",
                },
                {
                  title:
                    "If You Are a Beginner",
                  account:
                    "Standard",
                  description:
                    "A Standard account may offer a simpler pricing structure, although minimum deposit requirements still vary between brokers.",
                },
                {
                  title:
                    "If You Want Smaller Trade Sizes",
                  account:
                    "Cent / Micro",
                  description:
                    "Cent or Micro accounts may support smaller trading sizes, but available instruments and account conditions should still be reviewed.",
                },
                {
                  title:
                    "If You Want Lower Trading Costs",
                  account:
                    "Raw / ECN",
                  description:
                    "Do not focus on the deposit alone. Raw or ECN accounts may offer tighter spreads but can include a separate commission.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-slate-50/80 p-5 transition hover:border-brand-200 hover:bg-white"
                >

                  <span className="inline-flex w-fit rounded-full border border-brand-200 bg-white px-3 py-1 text-[9px] font-black text-brand-600">
                    {item.account}
                  </span>

                  <h3 className="mt-4 text-lg font-black leading-7 text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <a
                    href="#account-types"
                    className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-black text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                  >
                    View Comparison
                  </a>
                </article>
              ))}
            </div>

            {/* MOBILE */}
            <div className="p-3.5 md:hidden">

              <div className="overflow-hidden rounded-[17px] border border-slate-200 bg-white">

                {[
                  {
                    title:
                      "If You Have Limited Starting Capital",
                    account:
                      "Low Deposit",
                    description:
                      "Start by comparing accounts with lower minimum deposits.",
                  },
                  {
                    title:
                      "If You Are a Beginner",
                    account:
                      "Standard",
                    description:
                      "Compare account simplicity, deposit requirements, and trading costs together.",
                  },
                  {
                    title:
                      "If You Want Smaller Trade Sizes",
                    account:
                      "Cent / Micro",
                    description:
                      "These accounts may allow you to begin with smaller trade sizes.",
                  },
                  {
                    title:
                      "If You Want Lower Trading Costs",
                    account:
                      "Raw / ECN",
                    description:
                      "Compare spreads and commissions alongside the required deposit.",
                  },
                ].map((item, index) => (
                  <details
                    key={item.title}
                    className={`group ${
                      index > 0
                        ? "border-t border-slate-200"
                        : ""
                    }`}
                  >

                    <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5">

                      <div className="min-w-0">

                        <h3 className="text-[12px] font-black leading-5 text-slate-950">
                          {item.title}
                        </h3>

                        <span className="mt-1 inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-[8px] font-black text-brand-600">
                          {item.account}
                        </span>
                      </div>

                      <span className="text-[10px] text-slate-400 transition group-open:rotate-180">
                        ▼
                      </span>
                    </summary>

                    <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">

                      <p className="text-[11px] leading-5 text-slate-600">
                        {item.description}
                      </p>

                      <a
                        href="#account-types"
                        className="mt-2 inline-flex text-[10px] font-black text-brand-600"
                      >
                        View suitable accounts →
                      </a>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="mx-3.5 mb-3.5 rounded-[17px] border border-brand-200 bg-brand-50 px-4 py-3.5 sm:mx-7 sm:mb-7 sm:px-5 sm:py-4">

              <div className="grid grid-cols-[30px_minmax(0,1fr)] items-start gap-3">

                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-xs font-black text-white">
                  ✓
                </span>

                <div>

                  <h3 className="text-[13px] font-black text-slate-950 sm:text-base">
                    Key Takeaway
                  </h3>

                  <p className="mt-1 text-[11px] leading-6 text-slate-700 sm:text-sm sm:leading-7">
                    A low minimum deposit can make an account easier to
                    access, but it does not automatically make that broker
                    or account the best choice. Compare regulation, trading
                    costs, account type, and account conditions before making
                    a decision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTICE */}
      <section className="pb-7 sm:pb-10 lg:pb-12">

        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">

          <div className="rounded-[20px] border border-amber-300 bg-amber-50 px-4 py-4 sm:px-6 sm:py-5">

            <div className="flex items-center gap-3">

              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-base font-black text-amber-700 shadow-sm">
                !
              </span>

              <h2 className="text-[16px] font-black text-amber-950 sm:text-lg">
                Important Note About Minimum Deposits
              </h2>
            </div>

            <p className="mt-3 text-[12px] leading-6 text-amber-900/85 sm:text-sm sm:leading-7">
              Minimum deposit requirements may vary depending on the account
              type, payment method, regulatory entity, and the client's
              country of residence. Always review the broker's current account
              opening conditions before making a deposit.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">

              <Link
                href="/en/brokers"
                className="inline-flex items-center gap-1 text-[11px] font-black text-amber-900 underline decoration-amber-400 underline-offset-4"
              >
                Review forex brokers

                <span aria-hidden="true">
                  →
                </span>
              </Link>

              <span className="text-[10px] font-bold text-amber-800/80">
                Comparison data may change over time.
              </span>
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
                Trader Questions
              </span>

              <h2 className="mt-3 max-w-[310px] text-[24px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-[340px] min-[380px]:text-[26px] sm:max-w-[850px] sm:text-4xl sm:leading-tight">
                Frequently Asked Questions About Low Deposit Forex Brokers
              </h2>

              <p className="mt-3 max-w-[900px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Quick answers about minimum deposits, trading with smaller
                starting capital, and the factors to review before opening
                a forex account.
              </p>
            </div>

            {(() => {
              const faqItems = [
                {
                  question:
                    "What is the lowest minimum deposit for forex trading?",
                  answer:
                    "The minimum deposit varies by forex broker and account type. Some accounts may have no fixed minimum deposit, while others require a specific starting amount. Traders should always check the current account requirements before depositing funds.",
                },
                {
                  question:
                    "Is the forex broker with the lowest deposit always the best?",
                  answer:
                    "No. A low minimum deposit can make an account more accessible, but broker selection should also consider regulation, spreads, commissions, account type, trading platforms, and deposit and withdrawal conditions.",
                },
                {
                  question:
                    "Which forex account is suitable for a small starting balance?",
                  answer:
                    "It depends on the broker, but Standard, Cent, and Micro accounts may be available with relatively low starting capital. Traders should compare the minimum deposit, trading costs, and risk management requirements before choosing an account.",
                },
                {
                  question:
                    "Are there forex brokers with no minimum deposit?",
                  answer:
                    "Some forex brokers may offer accounts without a fixed minimum deposit. However, payment methods, account type, geographic region, or regulatory entity may still impose different funding requirements.",
                },
                {
                  question:
                    "Can I trade forex with a small amount of money?",
                  answer:
                    "Whether you can start with a small amount depends on the broker's minimum deposit, account type, and permitted trade size. A lower starting deposit does not remove trading risk or the importance of responsible risk management.",
                },
                {
                  question:
                    "What is the difference between Standard and Cent accounts for beginners?",
                  answer:
                    "A Standard account is the traditional account type offered by many brokers, while Cent accounts generally allow balances and trade sizes to be represented in smaller units. Features and conditions vary between brokers.",
                },
                {
                  question:
                    "Is the minimum deposit always fixed?",
                  answer:
                    "Not always. Deposit requirements can vary by account type, payment method, geographic region, and the regulatory entity through which the client opens the account.",
                },
                {
                  question:
                    "What should I compare besides the minimum deposit?",
                  answer:
                    "Review the broker's regulation, spreads, commissions, account type, trading platform, deposit and withdrawal conditions, and whether the account suits your experience and available capital.",
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

                        Show More Questions

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
                      href="/en/best-brokers"
                      className="mt-1 inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-200 bg-white px-4 text-xs font-black text-brand-600"
                    >
                      Explore More Best Forex Broker Rankings
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