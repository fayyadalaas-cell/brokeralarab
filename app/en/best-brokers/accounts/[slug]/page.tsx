import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  ExternalLink,
  Info,
  Layers3,
  Minus,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  UserCheck,
  Users,
  WalletCards,
  X,
  XCircle,
  Zap,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import {
  ACCOUNT_PAGE_SLUGS,
  getAccountPageContent,
  matchesAccountPage,
  type AccountPageContent,
  type AccountPageSlug,
} from "../data";

const BASE_URL = "https://brokeralarab.com";
const SITE_NAME = "Broker Alarab";

const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type BrokerAccountRow = {
  id?: string | number | null;
  broker_id?: string | number | null;
  account_name?: string | null;
  account_type?: string | null;
  spread?: string | number | null;
  spread_avg?: string | number | null;
  spread_min?: string | number | null;
  commission?: string | number | null;
  commission_value?: string | number | null;
  min_deposit?: string | number | null;
  execution_type?: string | null;
  best_for?: string | null;
  is_islamic_available?: boolean | null;
};

type BrokerRow = {
  id?: string | number | null;
  name?: string | null;
  slug?: string | null;
  logo?: string | null;
  rating?: string | number | null;
  score_safety?: string | number | null;
  score_fees?: string | number | null;
  score_platforms?: string | number | null;
  score_deposit?: string | number | null;
  score_support?: string | number | null;
  regulation?: string | null;
  regulation_short?: string | null;
  min_deposit?: string | number | null;
};

type RankedAccount = {
  broker: BrokerRow;
  account: BrokerAccountRow;
  score: number;
  spreadValue: number | null;
  commissionValue: number | null;
  minDepositValue: number | null;
  rank: number;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return ACCOUNT_PAGE_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAccountPageContent(slug);

  if (!page) {
    return {
      title: "Page Not Found | Broker Alarab",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    metadataBase: new URL(BASE_URL),

    title: page.seo.title,
    description: page.seo.description,

    /*
     * Keywords are retained for internal content organization.
     * Google does not use the meta keywords field as a ranking signal.
     */
    keywords: page.seo.keywords,

    applicationName: SITE_NAME,

    authors: [
      {
        name: SITE_NAME,
        url: `${BASE_URL}/en/about`,
      },
    ],

    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Finance and Investing",

    alternates: {
      canonical: page.seo.canonical,

      languages: {
        "en-US": page.seo.canonical,
        ar: `${BASE_URL}/best-brokers/accounts/${page.slug}`,
        "x-default": page.seo.canonical,
      },
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

    openGraph: {
      type: "website",
      locale: "en_US",
      url: page.seo.canonical,
      siteName: SITE_NAME,
      title: page.seo.title,
      description: page.seo.description,
    },

    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
  };
}

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const cleaned = String(value)
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  if (!cleaned) {
    return null;
  }

  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeFivePointScore(value: unknown): number {
  const number = toNumber(value);

  if (number === null) {
    return 50;
  }

  if (number <= 5) {
    return clamp((number / 5) * 100, 0, 100);
  }

  return clamp(number, 0, 100);
}

function lowerIsBetter(
  value: number | null,
  preferredMaximum: number,
  fallback = 45,
): number {
  if (value === null) {
    return fallback;
  }

  return clamp(
    100 - (value / preferredMaximum) * 100,
    0,
    100,
  );
}

function getSpreadValue(
  account: BrokerAccountRow,
): number | null {
  return (
    toNumber(account.spread_avg) ??
    toNumber(account.spread_min) ??
    toNumber(account.spread)
  );
}

function getCommissionValue(
  account: BrokerAccountRow,
): number | null {
  return (
    toNumber(account.commission_value) ??
    toNumber(account.commission)
  );
}

function getMinimumDeposit(
  account: BrokerAccountRow,
  broker: BrokerRow,
): number | null {
  return (
    toNumber(account.min_deposit) ??
    toNumber(broker.min_deposit)
  );
}

function calculateAccountScore(
  pageSlug: AccountPageSlug,
  broker: BrokerRow,
  account: BrokerAccountRow,
): number {
  const brokerRating = normalizeFivePointScore(broker.rating);
  const safetyScore = normalizeFivePointScore(
    broker.score_safety,
  );
  const feesScore = normalizeFivePointScore(
    broker.score_fees,
  );
  const depositScore = normalizeFivePointScore(
    broker.score_deposit,
  );

  const spread = getSpreadValue(account);
  const commission = getCommissionValue(account);
  const minimumDeposit = getMinimumDeposit(
    account,
    broker,
  );

  const spreadScore =
    pageSlug === "raw-spread"
      ? lowerIsBetter(spread, 2)
      : lowerIsBetter(spread, 4);

  const commissionScore = lowerIsBetter(
    commission,
    10,
    55,
  );

  const minDepositScore = lowerIsBetter(
    minimumDeposit,
    500,
    50,
  );

  let score = 0;

  if (pageSlug === "raw-spread") {
    score =
      brokerRating * 0.3 +
      spreadScore * 0.25 +
      commissionScore * 0.2 +
      minDepositScore * 0.1 +
      safetyScore * 0.15;
  } else if (pageSlug === "cent") {
    score =
      brokerRating * 0.25 +
      safetyScore * 0.2 +
      minDepositScore * 0.25 +
      spreadScore * 0.15 +
      depositScore * 0.15;
  } else {
    score =
      brokerRating * 0.3 +
      safetyScore * 0.2 +
      spreadScore * 0.25 +
      minDepositScore * 0.1 +
      feesScore * 0.15;
  }

  return Number(clamp(score, 0, 100).toFixed(1));
}

function getBrokerName(broker: BrokerRow) {
  return broker.name?.trim() || "Forex Broker";
}

function getAccountName(account: BrokerAccountRow) {
  return account.account_name?.trim() || "Trading Account";
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function formatMoney(value: number | null) {
  if (value === null) {
    return "Not specified";
  }

  if (value === 0) {
    return "$0";
  }

  return `$${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)}`;
}

function formatSpread(account: BrokerAccountRow) {
  const average = toNumber(account.spread_avg);
  const minimum = toNumber(account.spread_min);
  const generic = toNumber(account.spread);

  if (average !== null) {
    return `${average} pips average`;
  }

  if (minimum !== null) {
    return `From ${minimum} pips`;
  }

  if (generic !== null) {
    return `${generic} pips`;
  }

  if (
    typeof account.spread === "string" &&
    account.spread.trim()
  ) {
    return account.spread;
  }

  return "Not specified";
}

function formatCommission(account: BrokerAccountRow) {
  const numeric = getCommissionValue(account);

  if (numeric !== null) {
    if (numeric === 0) {
      return "$0";
    }

    return `$${numeric} approx.`;
  }

  if (
    typeof account.commission === "string" &&
    account.commission.trim()
  ) {
    return account.commission;
  }

  return "Not specified";
}

function getRankLabel(
  rank: number,
  slug: AccountPageSlug,
) {
  if (rank === 1) {
    return "Best Overall";
  }

  if (rank === 2) {
    return slug === "raw-spread"
      ? "Competitive Pricing"
      : "Balanced Choice";
  }

  if (rank === 3) {
    return slug === "cent"
      ? "Beginner-Friendly"
      : "Strong Alternative";
  }

  return null;
}

function getScoreLabel(score: number) {
  if (score >= 85) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Very Strong";
  }

  if (score >= 65) {
    return "Good";
  }

  return "Acceptable";
}

function containsArabic(value?: string | null) {
  return /[\u0600-\u06FF]/.test(value ?? "");
}

function getTopPickReason(
  item: RankedAccount,
  pageSlug: AccountPageSlug,
) {
  if (item.rank === 1) {
    if (pageSlug === "cent") {
      return "The strongest balance of accessibility, broker quality and cent-account conditions.";
    }

    if (pageSlug === "standard") {
      return "The strongest overall balance of spreads, safety and account usability.";
    }

    return "The highest overall score after accounting for spread, commission and broker safety.";
  }

  if (item.rank === 2) {
    if (pageSlug === "cent") {
      return "A strong option for gaining live-market experience with limited starting capital.";
    }

    if (pageSlug === "standard") {
      return "A well-balanced account with conditions suited to a broad range of retail traders.";
    }

    return "Competitive all-in trading costs with conditions designed for active traders.";
  }

  if (pageSlug === "cent") {
    return "A practical option for beginners and testing strategies with smaller position sizes.";
  }

  if (pageSlug === "standard") {
    return "A strong alternative combining straightforward pricing with broad market access.";
  }

  return "A strong choice for scalping and frequent trading after commission is included.";
}

function sortAndDeduplicateAccounts(
  page: AccountPageContent,
  accounts: BrokerAccountRow[],
  brokers: BrokerRow[],
): RankedAccount[] {
  const brokerMap = new Map(
    brokers
      .filter(
        (broker) =>
          broker.id !== null &&
          broker.id !== undefined,
      )
      .map((broker) => [
        String(broker.id),
        broker,
      ]),
  );

  const ranked = accounts
    .filter((account) =>
      matchesAccountPage(
        page,
        account.account_type,
        account.account_name,
      ),
    )
    .map((account) => {
      const broker = brokerMap.get(
        String(account.broker_id),
      );

      if (!broker) {
        return null;
      }

      return {
        broker,
        account,
        score: calculateAccountScore(
          page.slug,
          broker,
          account,
        ),
        spreadValue: getSpreadValue(account),
        commissionValue:
          getCommissionValue(account),
        minDepositValue: getMinimumDeposit(
          account,
          broker,
        ),
        rank: 0,
      };
    })
    .filter(
      (item): item is RankedAccount =>
        Boolean(item),
    )
    .sort((a, b) => b.score - a.score);

  const uniqueByBroker = new Map<
    string,
    RankedAccount
  >();

  for (const item of ranked) {
    const brokerKey =
      item.broker.slug ||
      String(item.broker.id) ||
      getBrokerName(item.broker);

    const current =
      uniqueByBroker.get(brokerKey);

    if (!current || item.score > current.score) {
      uniqueByBroker.set(brokerKey, item);
    }
  }

  return Array.from(uniqueByBroker.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}

async function getRankedAccounts(
  page: AccountPageContent,
) {
  const supabase = await createClient();

  const {
    data: accountRows,
    error: accountsError,
  } = await supabase
    .from("broker_accounts")
    .select(`
      id,
      broker_id,
      account_name,
      account_type,
      spread,
      spread_avg,
      spread_min,
      commission,
      commission_value,
      min_deposit,
      execution_type,
      best_for,
      is_islamic_available
    `);

  if (
    accountsError ||
    !accountRows?.length
  ) {
    return [];
  }

  const brokerIds = Array.from(
    new Set(
      accountRows
        .map((account) => account.broker_id)
        .filter(
          (
            brokerId,
          ): brokerId is string | number =>
            brokerId !== null &&
            brokerId !== undefined,
        ),
    ),
  );

  if (!brokerIds.length) {
    return [];
  }

  const {
    data: brokerRows,
    error: brokersError,
  } = await supabase
    .from("brokers")
    .select(`
      id,
      name,
      slug,
      logo,
      rating,
      score_safety,
      score_fees,
      score_platforms,
      score_deposit,
      score_support,
      regulation,
      regulation_short,
      min_deposit
    `)
    .in("id", brokerIds);

  if (
    brokersError ||
    !brokerRows?.length
  ) {
    return [];
  }

  return sortAndDeduplicateAccounts(
    page,
    accountRows as BrokerAccountRow[],
    brokerRows as BrokerRow[],
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-5 max-w-3xl sm:mb-6">
      {eyebrow ? (
        <p
          className={`mb-1.5 text-xs font-bold sm:text-sm ${
            light
              ? "text-blue-300"
              : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`text-[24px] font-black leading-[1.35] sm:text-3xl ${
          light
            ? "text-white"
            : "text-slate-950"
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-2.5 text-[15px] leading-7 sm:text-base sm:leading-8 ${
            light
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function BrokerLogo({
  broker,
  size = "md",
}: {
  broker: BrokerRow;
  size?: "sm" | "md" | "lg";
}) {
  const name = getBrokerName(broker);

  const dimensions = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div
      className={`${dimensions[size]} flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm`}
    >
      {broker.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={broker.logo}
          alt={`${name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-sm font-black text-brand-600">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}

function JsonLd({
  page,
  rankedAccounts,
}: {
  page: AccountPageContent;
  rankedAccounts: RankedAccount[];
}) {
  const pageUrl = page.seo.canonical;

  const webpageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const itemListId = `${pageUrl}#account-ranking`;

  const accountItems = rankedAccounts.map(
    (item) => {
      const brokerName = getBrokerName(
        item.broker,
      );

      const accountName = getAccountName(
        item.account,
      );

      const accountSlug = accountName
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const brokerUrl = item.broker.slug
        ? `${BASE_URL}/en/brokers/${item.broker.slug}`
        : pageUrl;

      const accountUrl =
        item.broker.slug && accountSlug
          ? `${BASE_URL}/en/brokers/${item.broker.slug}/accounts/${accountSlug}`
          : brokerUrl;

      const accountId = `${pageUrl}#account-${item.rank}`;

      return {
        "@type": "ListItem",
        position: item.rank,
        url: accountUrl,

        item: {
          "@type": "FinancialProduct",
          "@id": accountId,

          name: `${brokerName} ${accountName}`,
          description: getTopPickReason(
            item,
            page.slug,
          ),
          category: page.breadcrumbLabel,
          url: accountUrl,

          provider: {
            "@type": "Organization",
            name: brokerName,
            url: brokerUrl,

            ...(item.broker.logo
              ? {
                  logo: {
                    "@type": "ImageObject",
                    url: item.broker.logo,
                  },
                }
              : {}),
          },

          feesAndCommissionsSpecification: [
            `Spread: ${formatSpread(
              item.account,
            )}`,
            `Commission: ${formatCommission(
              item.account,
            )}`,
          ].join(", "),

          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Ranking",
              value: item.rank,
            },
            {
              "@type": "PropertyValue",
              name: "Account Score",
              value: item.score,
              unitText: "out of 100",
            },
            {
              "@type": "PropertyValue",
              name: "Spread",
              value: formatSpread(
                item.account,
              ),
            },
            {
              "@type": "PropertyValue",
              name: "Commission",
              value: formatCommission(
                item.account,
              ),
            },
            {
              "@type": "PropertyValue",
              name: "Minimum Deposit",
              value: formatMoney(
                item.minDepositValue,
              ),
            },
            {
              "@type": "PropertyValue",
              name: "Execution Type",
              value:
                item.account.execution_type?.trim() ||
                "Check the account terms",
            },
            {
              "@type": "PropertyValue",
              name: "Swap-Free Availability",
              value:
                item.account
                  .is_islamic_available === true
                  ? "Available"
                  : item.account
                        .is_islamic_available ===
                      false
                    ? "Not available in the current data"
                    : "Confirm with the broker",
            },
          ],
        },
      };
    },
  );

  const graph = [
    /*
     * Publisher identity
     */
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: "BrokerAlarab",
      url: BASE_URL,
    },

    /*
     * Website entity
     */
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: BASE_URL,
      name: SITE_NAME,
      alternateName: "Broker Alarab",
      inLanguage: "en-US",

      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },

    /*
     * Breadcrumb trail
     */
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BASE_URL}/en`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Best Forex Brokers",
          item: `${BASE_URL}/en/best-brokers`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.breadcrumbLabel,
          item: pageUrl,
        },
      ],
    },

    /*
     * Collection page
     */
    {
      "@type": [
        "WebPage",
        "CollectionPage",
      ],

      "@id": webpageId,
      url: pageUrl,
      name: page.seo.title,
      description: page.seo.description,
      inLanguage: "en-US",

      isPartOf: {
        "@id": WEBSITE_ID,
      },

      publisher: {
        "@id": ORGANIZATION_ID,
      },

      breadcrumb: {
        "@id": breadcrumbId,
      },

      ...(accountItems.length
        ? {
            mainEntity: {
              "@id": itemListId,
            },
          }
        : {}),

      about: [
        {
          "@type": "Thing",
          name: page.breadcrumbLabel,
        },
        {
          "@type": "Thing",
          name: "Forex Trading Accounts",
        },
        {
          "@type": "Thing",
          name: "Forex Broker Comparison",
        },
        {
          "@type": "Thing",
          name: "Forex Trading Costs",
        },
      ],

      keywords: page.seo.keywords.join(", "),

      relatedLink: page.relatedPages.links.map(
        (item) =>
          new URL(
            item.href,
            BASE_URL,
          ).toString(),
      ),

      significantLink: [
        `${pageUrl}#comparison`,
        `${pageUrl}#methodology`,
      ],
    },

    /*
     * Ranked account list
     */
    ...(accountItems.length
      ? [
          {
            "@type": "ItemList",
            "@id": itemListId,

            url: `${pageUrl}#comparison`,
            name: page.comparisonTable.title,
            description:
              page.comparisonTable.description,

            numberOfItems:
              accountItems.length,

            itemListOrder:
              "https://schema.org/ItemListOrderAscending",

            itemListElement: accountItems,
          },
        ]
      : []),
  ];

  return (
    <script
      id="account-page-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context":
            "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}

export default async function AccountTypePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const page =
    getAccountPageContent(slug);

  if (!page) {
    notFound();
  }

  const rankedAccounts =
    await getRankedAccounts(page);

  const analyzedAccounts =
    rankedAccounts.slice(
      0,
      page.brokerAnalysis.maximumBrokers,
    );

  return (
    <>
      <JsonLd
        page={page}
        rankedAccounts={rankedAccounts}
      />

      <main
        dir="ltr"
        className="min-h-screen bg-[#F7F9FC] font-sans text-slate-900 max-lg:[&_section_h2]:!text-[20px] max-lg:[&_section_h2]:!leading-[1.35] max-lg:[&_section_h2]:!tracking-[-0.015em]"
      >
        <div className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 lg:px-8">
          {/* ====================================================== */}
          {/* BREADCRUMBS */}
          {/* ====================================================== */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500 sm:mb-5 sm:gap-2 sm:text-sm"
          >
            <Link
              href="/en"
              className="transition hover:text-brand-600"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <Link
              href="/en/best-brokers"
              className="transition hover:text-brand-600"
            >
              Best Forex Brokers
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="font-bold text-slate-800">
              {page.breadcrumbLabel}
            </span>
          </nav>

          {/* ====================================================== */}
          {/* HERO */}
          {/* ====================================================== */}
          <section className="relative">
            <div className="relative overflow-hidden rounded-[20px] border border-brand-100 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.055)] sm:rounded-[24px] lg:rounded-[28px] lg:shadow-[0_14px_42px_rgba(15,23,42,0.065)]">
              {/* TOP BRAND LINE */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300" />

              {/* SOFT BACKGROUND DETAILS */}
              <div className="pointer-events-none absolute -left-20 top-8 h-48 w-48 rounded-full bg-brand-50/80 blur-3xl lg:h-72 lg:w-72" />

              <div className="pointer-events-none absolute -right-20 bottom-0 h-40 w-40 rounded-full bg-blue-50/80 blur-3xl lg:h-56 lg:w-56" />

              <div className="relative grid gap-4 px-4 pb-4 pt-5 sm:gap-5 sm:px-6 sm:pb-6 sm:pt-7 lg:min-h-[340px] lg:grid-cols-[minmax(0,1fr)_370px] lg:items-center lg:gap-8 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:px-10">
                {/* ================================================== */}
                {/* MAIN HERO CONTENT */}
                {/* ================================================== */}
                <div className="min-w-0">
                  {/* BADGES */}
                  <div className="hidden flex-wrap items-center gap-2 lg:flex lg:justify-start">
                    <span className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700 sm:text-xs">
                      <Sparkles className="h-3.5 w-3.5 shrink-0" />

                      <span>{page.badge}</span>
                    </span>

                    <span className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold text-slate-600 shadow-sm sm:text-xs">
                      <Clock3 className="h-3.5 w-3.5 shrink-0" />

                      <span>
                        Updated for 2026
                      </span>
                    </span>
                  </div>

                  {/* TITLE */}
                  <div className="mt-4 text-center lg:text-left">
                    <p className="text-[11px] font-black text-brand-600 sm:text-xs">
                      {page.hero.eyebrow}
                    </p>

                    <h1 className="mx-auto mt-1.5 max-w-[760px] font-black tracking-[-0.025em] text-slate-950 lg:mx-0">
                      {/* MOBILE TITLE */}
                      <span className="block text-[21px] leading-[1.3] tracking-[-0.025em] min-[390px]:text-[23px] sm:text-[25px] lg:hidden">
                        {page.hero.title}
                      </span>

                      {/* DESKTOP TITLE */}
                      <span className="hidden text-[40px] leading-[1.2] lg:block xl:text-[42px]">
                        {page.hero.title}
                      </span>
                    </h1>

                    <p className="mx-auto mt-3 max-w-[340px] text-[13px] leading-[1.9] text-slate-600 sm:max-w-[760px] sm:text-[15px] sm:leading-8 lg:mx-0">
                      {page.hero.description}
                    </p>
                  </div>

                  {/* DESKTOP SUPPORTING NOTE */}
                  <div className="mt-4 hidden max-w-[790px] rounded-2xl border border-brand-100 bg-brand-50/45 px-4 py-3.5 lg:block">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                        <Info className="h-4 w-4" />
                      </span>

                      <p className="text-sm leading-7 text-slate-600">
                        This comparison focuses on
                        typical spreads, commissions,
                        minimum deposit, broker safety
                        and execution quality—not brand
                        recognition alone.
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mx-auto mt-4 grid w-full max-w-[330px] grid-cols-1 gap-2 min-[390px]:max-w-[370px] min-[390px]:grid-cols-2 sm:mt-5 lg:mx-0 lg:flex lg:max-w-none">
                    <a
                      href="#comparison"
                      className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-600 px-3 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-700 min-[390px]:text-[12px] sm:h-12 sm:text-sm lg:px-6"
                    >
                      View Comparison
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </a>

                    <a
                      href="#methodology"
                      className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-brand-100 bg-white px-3 text-[11px] font-black text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-50 min-[390px]:text-[12px] sm:h-12 sm:text-sm lg:px-6"
                    >
                      How We Rank
                      <BarChart3 className="h-4 w-4 shrink-0" />
                    </a>
                  </div>

                  {/* MOBILE QUICK NOTE */}
                  <div className="mx-auto mt-3 flex max-w-[330px] items-start gap-2 rounded-xl border border-brand-100 bg-brand-50/55 px-3 py-2.5 min-[390px]:max-w-[370px] lg:hidden">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />

                   <p className="text-[10px] font-semibold leading-[1.7] text-slate-700">
  Independent ranking based on account conditions, costs and broker quality.
</p>
                  </div>
                </div>

                {/* ================================================== */}
                {/* HERO INFORMATION PANEL */}
                {/* ================================================== */}
                <aside className="mx-auto w-full max-w-[330px] border-0 bg-transparent p-0 min-[390px]:max-w-[370px] sm:max-w-none lg:mx-0 lg:rounded-[24px] lg:border lg:border-slate-200 lg:bg-slate-50/75 lg:p-4">
                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {/* PRIMARY STAT */}
                    <div className="relative overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm lg:min-h-[96px] lg:rounded-2xl">
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-500 lg:hidden" />

                      {/* MOBILE */}
                      <div className="flex min-h-[84px] flex-col justify-between px-3 py-3 lg:hidden">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <Target className="h-4 w-4" />
                          </span>

                          <p className="text-[9px] font-bold leading-4 text-slate-500">
                            {
                              page.hero
                                .primaryStatLabel
                            }
                          </p>
                        </div>

                        <p className="mt-2 text-center text-[13px] font-black leading-5 text-slate-950">
                          {
                            page.hero
                              .primaryStatValue
                          }
                        </p>
                      </div>

                      {/* DESKTOP */}
                      <div className="hidden h-full items-center gap-3 p-3.5 lg:flex">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                          <Target className="h-[18px] w-[18px]" />
                        </span>

                        <div className="min-w-0">
                          <p className="text-[10px] font-bold leading-4 text-slate-500">
                            {
                              page.hero
                                .primaryStatLabel
                            }
                          </p>

                          <p className="mt-1 text-[15px] font-black leading-6 text-slate-950">
                            {
                              page.hero
                                .primaryStatValue
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECONDARY STAT */}
                    <div className="relative overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm lg:min-h-[96px] lg:rounded-2xl">
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-500 lg:hidden" />

                      {/* MOBILE */}
                      <div className="flex min-h-[84px] flex-col justify-between px-3 py-3 lg:hidden">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <Scale className="h-4 w-4" />
                          </span>

                          <p className="text-[9px] font-bold leading-4 text-slate-500">
                            {
                              page.hero
                                .secondaryStatLabel
                            }
                          </p>
                        </div>

                        <p className="mt-2 text-center text-[13px] font-black leading-5 text-slate-950">
                          {
                            page.hero
                              .secondaryStatValue
                          }
                        </p>
                      </div>

                      {/* DESKTOP */}
                      <div className="hidden h-full items-center gap-3 p-3.5 lg:flex">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                          <Scale className="h-[18px] w-[18px]" />
                        </span>

                        <div className="min-w-0">
                          <p className="text-[10px] font-bold leading-4 text-slate-500">
                            {
                              page.hero
                                .secondaryStatLabel
                            }
                          </p>

                          <p className="mt-1 text-[15px] font-black leading-6 text-slate-950">
                            {
                              page.hero
                                .secondaryStatValue
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP INDEPENDENT COMPARISON */}
                  <div className="mt-3 hidden rounded-2xl border border-brand-100 bg-white p-4 lg:block">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <ShieldCheck className="h-[18px] w-[18px]" />
                      </span>

                      <div>
                        <p className="text-sm font-black text-slate-950">
                          Independent Comparison
                        </p>

                        <p className="mt-1 text-xs leading-6 text-slate-600">
                          We assess the account itself
                          for cost, accessibility and
                          trading conditions, rather
                          than relying only on the
                          broker’s overall rating.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP FACTORS */}
                  <div className="mt-3 hidden rounded-2xl border border-dashed border-brand-200 bg-white p-4 lg:block">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-black text-brand-700">
                        Key Ranking Factors
                      </p>

                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-700">
                        {
                          page.methodology
                            .factors.length
                        }{" "}
                        factors
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {[
                        "Spread and commission",
                        "Minimum deposit",
                        "Broker safety",
                        "Swap-free terms",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-600" />

                          <span className="text-[10px] font-semibold leading-5 text-slate-600">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* ====================================================== */}
          {/* TOP PICKS */}
          {/* ====================================================== */}
          <section className="mt-7 sm:mt-9">
            {rankedAccounts.length > 0 ? (
              <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-5 lg:contents">
                {/* SECTION HEADING */}
                <div className="mb-4 flex flex-col gap-2.5 border-b border-slate-100 pb-4 sm:mb-5 sm:pb-5 lg:flex-row lg:items-end lg:justify-between lg:border-b-0 lg:pb-0">
                  <div>
                    <div className="hidden items-center gap-2 lg:flex">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <Star className="h-[18px] w-[18px] fill-brand-600" />
                      </span>

                      <p className="text-xs font-black text-brand-600">
                        Our Highest-Rated
                        Picks
                      </p>
                    </div>

                    <h2 className="mt-2 text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950 sm:text-[24px] lg:text-[30px]">
                      {rankedAccounts.length >= 3
                        ? "Top 3 Brokers for This Account Type"
                        : "Best Available Brokers for This Account Type"}
                    </h2>

                    <p className="mt-1.5 max-w-3xl text-[12px] leading-6 text-slate-600 sm:text-sm sm:leading-7">
                      These accounts ranked
                      highest after comparing
                      all-in cost, minimum
                      deposit, usability and
                      broker quality.
                    </p>
                  </div>

                  <a
                    href="#comparison"
                    className="hidden shrink-0 items-center gap-2 rounded-xl border border-brand-100 bg-white px-4 py-2.5 text-sm font-black text-brand-700 shadow-sm transition hover:bg-brand-50 lg:inline-flex"
                  >
                    Full Comparison
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* ================================================== */}
                {/* DESKTOP CARDS */}
                {/* ================================================== */}
                <div className="hidden grid-cols-3 items-stretch gap-4 lg:grid xl:gap-5">
                  {rankedAccounts
                    .slice(0, 3)
                    .map((item) => {
                      const brokerName =
                        getBrokerName(
                          item.broker,
                        );

                      const accountName =
                        getAccountName(
                          item.account,
                        );

                      const rankLabel =
                        getRankLabel(
                          item.rank,
                          page.slug,
                        );

                      const isFirst =
                        item.rank === 1;

                      return (
                        <article
                          key={`${item.broker.id}-${item.account.id}-desktop-featured`}
                          className={`group relative flex min-h-[408px] flex-col overflow-hidden rounded-[24px] border bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_46px_rgba(30,91,184,0.13)] ${
                            isFirst
                              ? "border-brand-400 shadow-[0_16px_36px_rgba(30,91,184,0.12)]"
                              : "border-slate-200 shadow-[0_10px_28px_rgba(15,23,42,0.055)]"
                          }`}
                        >
                          {/* TOP ACCENT */}
                          <div
                            className={`h-[5px] shrink-0 ${
                              isFirst
                                ? "bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300"
                                : "bg-gradient-to-r from-brand-500 to-brand-200"
                            }`}
                          />

                          {/* CARD BODY */}
                          <div className="flex flex-1 flex-col p-5">
                            {/* COMPANY HEADER */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex min-w-0 items-center gap-3">
                                <div
                                  className={
                                    isFirst
                                      ? "rounded-2xl ring-2 ring-brand-100"
                                      : "rounded-2xl"
                                  }
                                >
                                  <BrokerLogo
                                    broker={
                                      item.broker
                                    }
                                    size="md"
                                  />
                                </div>

                                <div className="min-w-0">
                                  <h3 className="break-words text-[20px] font-black leading-7 text-slate-950 xl:text-[21px]">
                                    {
                                      brokerName
                                    }
                                  </h3>

                                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-600">
                                      {
                                        accountName
                                      }
                                    </span>

                                    {rankLabel ? (
                                      <span
                                        className={`rounded-full px-3 py-1.5 text-[10px] font-black ${
                                          isFirst
                                            ? "bg-brand-600 text-white"
                                            : "bg-brand-50 text-brand-700"
                                        }`}
                                      >
                                        {
                                          rankLabel
                                        }
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              {/* RANK */}
                              <div className="flex shrink-0 flex-col items-center gap-1.5">
                                <span
                                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white shadow-md ${
                                    isFirst
                                      ? "bg-brand-600 shadow-brand-600/20"
                                      : "bg-slate-950 shadow-slate-950/15"
                                  }`}
                                >
                                  {item.rank}
                                </span>

                                <span className="text-[10px] font-bold text-slate-500">
                                  Rank
                                </span>
                              </div>
                            </div>

                            {/* SCORE + REASON */}
                            <div
                              className={`mt-4 grid grid-cols-[88px_minmax(0,1fr)] items-stretch gap-3 rounded-[18px] border p-3.5 ${
                                isFirst
                                  ? "border-brand-100 bg-brand-50/65"
                                  : "border-slate-200 bg-slate-50/70"
                              }`}
                            >
                              {/* SCORE */}
                              <div className="flex flex-col items-center justify-center rounded-xl bg-white px-2 py-2.5 shadow-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                                  <strong className="text-[17px] font-black text-slate-950">
                                    {
                                      item.score
                                    }
                                  </strong>
                                </div>

                                <span className="mt-0.5 text-[10px] font-bold text-slate-500">
                                  out of
                                  100
                                </span>

                                <span
                                  className={`mt-1.5 rounded-full px-2.5 py-1 text-[9px] font-black ${
                                    isFirst
                                      ? "bg-brand-50 text-brand-700"
                                      : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {getScoreLabel(
                                    item.score,
                                  )}
                                </span>
                              </div>

                              {/* REASON */}
                              <div className="flex flex-col justify-center">
                                <p className="text-[11px] font-black text-brand-600">
                                  Why we
                                  picked it
                                </p>

                                <p className="mt-1.5 text-[14px] font-semibold leading-7 text-slate-700">
                                  {getTopPickReason(
                                    item,
                                    page.slug,
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* MAIN DATA */}
                            <div className="mt-4 grid grid-cols-3 gap-2.5">
                              {/* SPREAD */}
                              <div className="relative overflow-hidden rounded-[15px] border border-slate-200 bg-white px-3 py-3 text-center shadow-sm">
                                <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-300" />

                                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                  <TrendingDown className="h-4 w-4" />
                                </div>

                                <p className="mt-2 text-[11px] font-bold text-slate-500">
                                  Spread
                                </p>

                                <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                                  {formatSpread(
                                    item.account,
                                  )}
                                </p>
                              </div>

                              {/* COMMISSION */}
                              <div className="relative overflow-hidden rounded-[15px] border border-slate-200 bg-white px-3 py-3 text-center shadow-sm">
                                <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-300" />

                                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                  <CircleDollarSign className="h-4 w-4" />
                                </div>

                                <p className="mt-2 text-[11px] font-bold text-slate-500">
                                  Commission
                                </p>

                                <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                                  {formatCommission(
                                    item.account,
                                  )}
                                </p>
                              </div>

                              {/* MINIMUM DEPOSIT */}
                              <div className="relative overflow-hidden rounded-[15px] border border-slate-200 bg-white px-3 py-3 text-center shadow-sm">
                                <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-300" />

                                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                  <WalletCards className="h-4 w-4" />
                                </div>

                                <p className="mt-2 text-[11px] font-bold text-slate-500">
                                  Min.
                                  Deposit
                                </p>

                                <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                                  {formatMoney(
                                    item.minDepositValue,
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* ACCOUNT DETAIL STRIP */}
                            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/75 px-3.5 py-2.5">
                              <div className="flex min-w-0 items-center gap-2">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                                  <Layers3 className="h-4 w-4" />
                                </span>

                                <div className="min-w-0">
                                  <p className="text-[10px] font-bold text-slate-500">
                                    Account
                                    Type
                                  </p>

                                  <p className="mt-0.5 truncate text-[12px] font-black text-slate-800">
                                    {
                                      accountName
                                    }
                                  </p>
                                </div>
                              </div>

                              <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-sm">
                                <ShieldCheck className="h-4 w-4 text-brand-600" />

                                <span className="text-[10px] font-black text-slate-700">
                                  Reviewed
                                  Account
                                </span>
                              </div>
                            </div>

                            {/* ACTIONS */}
                            {item.broker
                              .slug ? (
                              <div className="mt-auto grid grid-cols-2 gap-2.5 pt-4">
                                <Link
                                  href={`/en/brokers/${item.broker.slug}`}
                                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-brand-100 bg-white px-2 text-[13px] font-black text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
                                >
                                  Broker
                                  Review
                                  <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                  href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-featured-en`}
                                  target="_blank"
                                  rel="nofollow sponsored noopener noreferrer"
                                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-2 text-[13px] font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.2)] transition hover:bg-brand-700"
                                >
                                  Open
                                  Account
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </div>
                            ) : null}
                          </div>

                          {/* BOTTOM STATUS STRIP */}
                          <div
                            className={`flex min-h-[44px] items-center justify-between gap-3 border-t px-5 py-2.5 ${
                              isFirst
                                ? "border-brand-100 bg-brand-50/75"
                                : "border-slate-100 bg-slate-50/60"
                            }`}
                          >
                            <p
                              className={`flex items-center gap-2 text-[11px] font-bold leading-5 ${
                                isFirst
                                  ? "text-brand-800"
                                  : "text-slate-600"
                              }`}
                            >
                              {isFirst ? (
                                <BadgeCheck className="h-4 w-4 shrink-0 text-brand-600" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-500" />
                              )}

                              {isFirst
                                ? "Highest overall score for this account type"
                                : "A strong option among the accounts we compared"}
                            </p>

                            <span
                              className={`h-2 w-2 shrink-0 rounded-full ${
                                isFirst
                                  ? "bg-brand-600"
                                  : "bg-brand-300"
                              }`}
                            />
                          </div>
                        </article>
                      );
                    })}
                </div>

                {/* ================================================== */}
                {/* MOBILE CARDS */}
                {/* ================================================== */}
                <div className="space-y-3 lg:hidden">
                  {rankedAccounts
                    .slice(0, 3)
                    .map((item) => {
                      const brokerName =
                        getBrokerName(
                          item.broker,
                        );

                      const accountName =
                        getAccountName(
                          item.account,
                        );

                      const rankLabel =
                        getRankLabel(
                          item.rank,
                          page.slug,
                        );

                      const isFirst =
                        item.rank === 1;

                      return (
                        <article
                          key={`${item.broker.id}-${item.account.id}-mobile-featured`}
                          className={`overflow-hidden rounded-[20px] border bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] ${
                            isFirst
                              ? "border-brand-400"
                              : "border-slate-200"
                          }`}
                        >
                          <div
                            className={`h-1 ${
                              isFirst
                                ? "bg-brand-600"
                                : "bg-brand-300"
                            }`}
                          />

                          <div className="p-4">
                            {/* COMPANY ROW */}
                            <div>
                              {/* MAIN COMPANY INFO */}
                              <div className="grid grid-cols-[32px_42px_minmax(0,1fr)] items-center gap-2.5">
                                {/* RANK */}
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${
                                    isFirst
                                      ? "bg-brand-600"
                                      : "bg-slate-900"
                                  }`}
                                >
                                  {
                                    item.rank
                                  }
                                </span>

                                {/* LOGO */}
                                <BrokerLogo
                                  broker={
                                    item.broker
                                  }
                                  size="sm"
                                />

                                {/* NAME + ACCOUNT */}
                                <div className="min-w-0">
                                  <h3 className="break-words text-[15px] font-black leading-6 text-slate-950">
                                    {
                                      brokerName
                                    }
                                  </h3>

                                  <p className="mt-0.5 break-words text-[10px] font-bold leading-4 text-slate-500">
                                    {
                                      accountName
                                    }
                                  </p>
                                </div>
                              </div>

                              {/* LABELS */}
                              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                                {rankLabel ? (
                                  <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                                      isFirst
                                        ? "bg-brand-600 text-white"
                                        : "bg-brand-50 text-brand-700"
                                    }`}
                                  >
                                    {
                                      rankLabel
                                    }
                                  </span>
                                ) : null}

                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-black text-slate-800">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />

                                  {
                                    item.score
                                  }
                                  /100
                                </span>
                              </div>
                            </div>

                            {/* MINIMUM DEPOSIT */}
                            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                              <p className="text-[10px] font-bold text-slate-500">
                                Minimum
                                Deposit
                              </p>

                              <strong className="text-[12px] font-black text-slate-950">
                                {formatMoney(
                                  item.minDepositValue,
                                )}
                              </strong>
                            </div>

                            {/* FIRST CARD EXTRA INFORMATION */}
                            {isFirst ? (
                              <>
                                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                                  {getTopPickReason(
                                    item,
                                    page.slug,
                                  )}
                                </p>

                                <div className="mt-3 grid grid-cols-2 gap-2">
                                  <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                                    <p className="text-[9px] font-bold text-slate-500">
                                      Spread
                                    </p>

                                    <p className="mt-0.5 text-[11px] font-black leading-5 text-slate-950">
                                      {formatSpread(
                                        item.account,
                                      )}
                                    </p>
                                  </div>

                                  <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                                    <p className="text-[9px] font-bold text-slate-500">
                                      Commission
                                    </p>

                                    <p className="mt-0.5 text-[11px] font-black leading-5 text-slate-950">
                                      {formatCommission(
                                        item.account,
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </>
                            ) : null}

                            {/* ACTIONS */}
                            {item.broker
                              .slug ? (
                              <div className="mt-3 grid grid-cols-2 gap-2">
                                <Link
                                  href={`/en/brokers/${item.broker.slug}`}
                                  className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-brand-100 bg-white px-2 text-[10px] font-black text-brand-700"
                                >
                                  Broker
                                  Review
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>

                                <Link
                                  href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-mobile-featured-en`}
                                  target="_blank"
                                  rel="nofollow sponsored noopener noreferrer"
                                  className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-brand-600 px-2 text-[10px] font-black text-white"
                                >
                                  Open
                                  Account
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}

                  <a
                    href="#comparison"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-brand-50 text-xs font-black text-brand-700"
                  >
                    View Full Comparison
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ) : null}
          </section>

          {/* ====================================================== */}
          {/* EDITOR SUMMARY */}
          {/* ====================================================== */}
          <section className="mt-7 sm:mt-9">
            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] lg:rounded-[24px]">
              {/* ================================================== */}
              {/* DESKTOP SUMMARY */}
              {/* ================================================== */}
              <div className="hidden lg:block">
                <div className="p-6 xl:p-7">
                  {/* HEADER */}
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <BadgeCheck className="h-6 w-6" />
                    </span>

                    <div>
                      <p className="text-xs font-black text-brand-600">
                        Before You Decide
                      </p>

                      <h2 className="mt-0.5 text-[27px] font-black leading-9 text-slate-950">
                        {
                          page
                            .editorSummary
                            .title
                        }
                      </h2>
                    </div>
                  </div>

                  {/* PARAGRAPHS */}
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    {page.editorSummary.paragraphs.map(
                      (
                        paragraph,
                        index,
                      ) => (
                        <div
                          key={
                            paragraph
                          }
                          className={`rounded-[18px] border px-5 py-4 ${
                            index === 0
                              ? "border-brand-100 bg-brand-50/45"
                              : "border-slate-200 bg-slate-50/65"
                          }`}
                        >
                          <p
                            className={`text-[14px] leading-8 ${
                              index === 0
                                ? "font-semibold text-slate-700"
                                : "text-slate-600"
                            }`}
                          >
                            {
                              paragraph
                            }
                          </p>
                        </div>
                      ),
                    )}
                  </div>

                  {/* HIGHLIGHTS */}
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5 text-brand-600" />

                      <h3 className="text-base font-black text-slate-950">
                        Key Takeaways
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {page.editorSummary.highlights.map(
                        (
                          highlight,
                          index,
                        ) => (
                          <div
                            key={
                              highlight
                            }
                            className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                              <CheckCircle2 className="h-[18px] w-[18px]" />
                            </span>

                            <div>
                              <p className="text-[9px] font-black text-brand-600">
                                Point{" "}
                                {index +
                                  1}
                              </p>

                              <p className="mt-0.5 text-[11px] font-semibold leading-6 text-slate-700">
                                {
                                  highlight
                                }
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================== */}
              {/* MOBILE SUMMARY */}
              {/* ================================================== */}
              <div className="p-5 lg:hidden">
                {/* HEADER */}
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <BadgeCheck className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950">
                      {
                        page
                          .editorSummary
                          .title
                      }
                    </h2>
                  </div>
                </div>

                {/* FIRST PARAGRAPH ALWAYS VISIBLE */}
                {page.editorSummary
                  .paragraphs[0] ? (
                  <p className="mt-4 text-[14px] font-semibold leading-7 text-slate-700">
                    {
                      page
                        .editorSummary
                        .paragraphs[0]
                    }
                  </p>
                ) : null}

                {/* FIRST HIGHLIGHT ALWAYS VISIBLE */}
                {page.editorSummary
                  .highlights[0] ? (
                  <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-brand-50/55 p-3.5">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-600" />

                    <p className="text-[12px] font-semibold leading-6 text-slate-700">
                      {
                        page
                          .editorSummary
                          .highlights[0]
                      }
                    </p>
                  </div>
                ) : null}

                {/* REMAINING CONTENT */}
                {page.editorSummary
                  .paragraphs.length > 1 ||
                page.editorSummary
                  .highlights.length >
                  1 ? (
                  <details className="group mt-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-brand-100 bg-white px-3.5 py-3">
                      <span className="text-xs font-black text-brand-700">
                        <span className="group-open:hidden">
                          Read More
                        </span>

                        <span className="hidden group-open:inline">
                          Show Less
                        </span>
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-lg text-brand-600 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                      {page.editorSummary.paragraphs
                        .slice(1)
                        .map(
                          (
                            paragraph,
                          ) => (
                            <p
                              key={
                                paragraph
                              }
                              className="text-[13px] leading-7 text-slate-600"
                            >
                              {
                                paragraph
                              }
                            </p>
                          ),
                        )}

                      {page.editorSummary.highlights
                        .slice(1)
                        .map(
                          (
                            highlight,
                          ) => (
                            <div
                              key={
                                highlight
                              }
                              className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5"
                            >
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-600" />

                              <p className="text-[11px] font-semibold leading-6 text-slate-700">
                                {
                                  highlight
                                }
                              </p>
                            </div>
                          ),
                        )}
                    </div>
                  </details>
                ) : null}
              </div>
            </article>
          </section>

                   {/* ====================================================== */}
          {/* DEFINITION */}
          {/* ====================================================== */}
          <section className="mt-8 sm:mt-10">
            {/* ====================================================== */}
            {/* DESKTOP DEFINITION */}
            {/* ====================================================== */}
            <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] lg:block">
              <div className="p-7 xl:p-8">
                {/* SECTION HEADING */}
                <div className="flex items-start justify-between gap-8">
                  <div className="max-w-4xl">
                    <p className="text-xs font-black text-brand-600">
                      Understanding the Account Type
                    </p>

                    <h2 className="mt-1.5 text-[30px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950">
                      {page.definition.title}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-600">
                    <Layers3 className="h-5 w-5" />
                  </div>
                </div>

                {/* EXPLANATION */}
                <div className="mt-5 overflow-hidden rounded-[22px] border border-brand-100 bg-gradient-to-r from-brand-50/45 via-white to-white">
                  {/* FIRST PARAGRAPH */}
                  {page.definition.paragraphs[0] ? (
                    <div className="border-b border-brand-100 px-6 py-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500" />

                        <p className="text-[15px] font-semibold leading-8 text-slate-700">
                          {page.definition.paragraphs[0]}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {/* REMAINING PARAGRAPHS */}
                  {page.definition.paragraphs.length > 1 ? (
                    <div className="grid grid-cols-2 divide-x divide-slate-100">
                      {page.definition.paragraphs
                        .slice(1)
                        .map((paragraph) => (
                          <div
                            key={paragraph}
                            className="px-6 py-5"
                          >
                            <p className="text-[14px] leading-8 text-slate-600">
                              {paragraph}
                            </p>
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>

                {/* FEATURES */}
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {/* CARD 01 */}
                  <article className="group rounded-[20px] border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                          <WalletCards className="h-5 w-5" />
                        </div>

                        <h3 className="text-[18px] font-black leading-7 text-slate-950">
                          Real-Money Trading
                        </h3>
                      </div>

                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-700">
                        01
                      </span>
                    </div>

                    <p className="mt-5 text-[14px] leading-8 text-slate-600">
                      Profits and losses come from live trading rather than
                      virtual funds used in a demo account.
                    </p>
                  </article>

                  {/* CARD 02 */}
                  <article className="group rounded-[20px] border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                          <Scale className="h-5 w-5" />
                        </div>

                        <h3 className="text-[18px] font-black leading-7 text-slate-950">
                          Flexible Risk Control
                        </h3>
                      </div>

                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-700">
                        02
                      </span>
                    </div>

                    <p className="mt-5 text-[14px] leading-8 text-slate-600">
                      Risk flexibility depends on contract size, minimum trade
                      volume, leverage and the broker’s account conditions.
                    </p>
                  </article>

                  {/* CARD 03 */}
                  <article className="group rounded-[20px] border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                          <Target className="h-5 w-5" />
                        </div>

                        <h3 className="text-[18px] font-black leading-7 text-slate-950">
                          Choose for Your Strategy
                        </h3>
                      </div>

                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-700">
                        03
                      </span>
                    </div>

                    <p className="mt-5 text-[14px] leading-8 text-slate-600">
                      The most suitable account depends on your experience,
                      capital, trading frequency and strategy.
                    </p>
                  </article>
                </div>

                {/* COST EXAMPLE */}
                <aside className="mt-4 overflow-hidden rounded-[20px] border border-amber-200 bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-white">
                  <div className="grid min-h-[104px] grid-cols-[280px_minmax(0,1fr)_360px] items-center">
                    {/* TITLE */}
                    <div className="flex h-full items-center gap-3 border-r border-amber-200/70 px-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-amber-700 shadow-sm">
                        <Info className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-[10px] font-black text-amber-700">
                          Practical Cost Example
                        </p>

                        <h3 className="mt-1 text-base font-black leading-7 text-amber-950">
                          {page.costExample.title}
                        </h3>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="px-6 py-4">
                      <p className="text-sm leading-7 text-amber-900/80">
                        {page.costExample.description}
                      </p>
                    </div>

                    {/* NOTE */}
                    <div className="px-5 py-4">
                      <div className="rounded-2xl border border-amber-200 bg-white/85 px-4 py-3">
                        <p className="text-xs font-bold leading-6 text-amber-900">
                          {page.costExample.note}
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* ====================================================== */}
            {/* MOBILE DEFINITION */}
            {/* ====================================================== */}
            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_9px_25px_rgba(15,23,42,0.05)] lg:hidden">
              <div className="p-5">
                {/* HEADER */}
                <div className="relative pr-11">
                  <div className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Layers3 className="h-4 w-4" />
                  </div>

                  <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950">
                    {page.definition.title}
                  </h2>
                </div>

                {/* FIRST PARAGRAPH */}
                {page.definition.paragraphs[0] ? (
                  <p className="mt-4 text-[14px] font-semibold leading-7 text-slate-700">
                    {page.definition.paragraphs[0]}
                  </p>
                ) : null}

                {/* MORE CONTENT */}
                {page.definition.paragraphs.length > 1 ? (
                  <details className="group mt-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3">
                      <span className="text-xs font-black text-brand-600">
                        <span className="group-open:hidden">
                          Read the Full Explanation
                        </span>

                        <span className="hidden group-open:inline">
                          Show Less
                        </span>
                      </span>

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-base text-brand-600 shadow-sm transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="mt-4 space-y-3.5 border-t border-slate-100 pt-4">
                      {page.definition.paragraphs
                        .slice(1)
                        .map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-[14px] leading-7 text-slate-600"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </details>
                ) : null}

                {/* FEATURES */}
                <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                      <WalletCards className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[14px] font-black leading-6 text-slate-950">
                        Real-Money Account
                      </h3>

                      <p className="mt-0.5 text-[11px] leading-5 text-slate-600">
                        Real profits and losses rather than demo simulation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                      <Scale className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[14px] font-black leading-6 text-slate-950">
                        Flexible Risk Management
                      </h3>

                      <p className="mt-0.5 text-[11px] leading-5 text-slate-600">
                        Flexibility depends on trade size and account terms.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                      <Target className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[14px] font-black leading-6 text-slate-950">
                        Strategy-Based Choice
                      </h3>

                      <p className="mt-0.5 text-[11px] leading-5 text-slate-600">
                        Choose based on capital, experience and trading style.
                      </p>
                    </div>
                  </div>
                </div>

                {/* MOBILE COST EXAMPLE */}
                <details className="group mt-4 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/55">
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-3.5 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-amber-700 shadow-sm">
                      <Info className="h-4 w-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-black uppercase tracking-wide text-amber-700">
                        Trading Cost Example
                      </p>

                      <h3 className="mt-0.5 text-[13px] font-black leading-5 text-amber-950">
                        {page.costExample.title}
                      </h3>
                    </div>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-lg text-amber-700 shadow-sm transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-amber-200 bg-white/75 px-4 pb-4 pt-3">
                    <p className="text-[12px] leading-6 text-amber-900/85">
                      {page.costExample.description}
                    </p>

                    <div className="mt-3 rounded-xl border border-amber-200 bg-white px-3 py-2.5">
                      <p className="text-[11px] font-semibold leading-5 text-amber-900">
                        {page.costExample.note}
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            </article>
          </section>

          {/* ====================================================== */}
          {/* HOW IT WORKS */}
          {/* ====================================================== */}
          <section className="mt-8 sm:mt-10">
            {/* ====================================================== */}
            {/* DESKTOP HOW IT WORKS */}
            {/* ====================================================== */}
            <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 shadow-[0_14px_38px_rgba(15,23,42,0.055)] lg:block xl:p-8">
              {/* SECTION HEADING */}
              <div className="mb-6 flex items-end justify-between gap-8 border-b border-slate-100 pb-5">
                <div className="max-w-4xl">
                  <p className="text-xs font-black text-brand-600">
                    Step-by-Step Overview
                  </p>

                  <h2 className="mt-1.5 text-[30px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950">
                    {page.howItWorks.title}
                  </h2>

                  <p className="mt-2 text-[15px] leading-8 text-slate-600">
                    {page.howItWorks.description}
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-black text-brand-700">
                  <Zap className="h-4 w-4" />
                  {page.howItWorks.steps.length} Key Steps
                </span>
              </div>

              {/* STEPS */}
              <div className="grid grid-cols-4 gap-4">
                {page.howItWorks.steps.map((step, index) => {
                  const stepIcons = [
                    WalletCards,
                    Layers3,
                    TrendingDown,
                    ShieldCheck,
                  ];

                  const Icon =
                    stepIcons[index % stepIcons.length];

                  return (
                    <article
                      key={step.title}
                      className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md"
                    >
                      <div className="absolute left-0 top-0 h-full w-[3px] bg-brand-400/80" />

                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>

                        <span className="text-[10px] font-black text-brand-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[16px] font-black leading-7 text-slate-950">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-[13px] leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* ====================================================== */}
            {/* MOBILE HOW IT WORKS */}
            {/* ====================================================== */}
            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_9px_25px_rgba(15,23,42,0.05)] lg:hidden">
              {/* HEADER */}
              <div className="border-b border-slate-100 bg-brand-50/35 px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <Zap className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950">
                      {page.howItWorks.title}
                    </h2>

                    <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
                      {page.howItWorks.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* MOBILE STEPS */}
              <div className="space-y-2.5 p-3.5">
                {page.howItWorks.steps.map((step, index) => {
                  const stepIcons = [
                    WalletCards,
                    Layers3,
                    TrendingDown,
                    ShieldCheck,
                  ];

                  const Icon =
                    stepIcons[index % stepIcons.length];

                  return (
                    <article
                      key={step.title}
                      className="flex items-start gap-3 rounded-[16px] border border-slate-200 bg-slate-50/60 p-3.5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[14px] font-black leading-6 text-slate-950">
                            {step.title}
                          </h3>

                          <span className="text-[9px] font-black text-brand-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="mt-1 text-[11px] leading-5 text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </article>
          </section>

          {/* ====================================================== */}
          {/* SELECTION FACTORS */}
          {/* ====================================================== */}
          <section className="mt-8 sm:mt-10">
            {/* ====================================================== */}
            {/* DESKTOP VERSION */}
            {/* ====================================================== */}
            <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] lg:block">
              {/* HEADER */}
              <div className="flex items-center justify-between gap-8 border-b border-slate-100 bg-gradient-to-r from-brand-50/45 via-white to-white px-7 py-5 xl:px-8">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-brand-600">
                      Account Selection Criteria
                    </p>

                    <h2 className="mt-0.5 text-[26px] font-black leading-8 tracking-[-0.01em] text-slate-950">
                      {page.selectionFactors.title}
                    </h2>
                  </div>
                </div>

                <p className="max-w-[600px] text-[13px] leading-7 text-slate-600">
                  {page.selectionFactors.description}
                </p>
              </div>

              {/* FACTORS */}
              <div className="grid grid-cols-3 gap-3 p-6 xl:p-7">
                {page.selectionFactors.items.map(
                  (item, index) => {
                    const icons = [
                      ShieldCheck,
                      TrendingDown,
                      CircleDollarSign,
                      Zap,
                      WalletCards,
                      BadgeCheck,
                    ];

                    const Icon =
                      icons[index % icons.length];

                    return (
                      <article
                        key={item.title}
                        className="group rounded-[18px] border border-slate-200 bg-slate-50/55 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_10px_24px_rgba(30,91,184,0.07)]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                            <Icon className="h-[18px] w-[18px]" />
                          </span>

                          <h3 className="min-w-0 flex-1 text-[15px] font-black leading-6 text-slate-950">
                            {item.title}
                          </h3>

                          <span className="text-[10px] font-black text-brand-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="mt-2.5 text-[12px] leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </article>
                    );
                  },
                )}
              </div>
            </div>

            {/* ====================================================== */}
            {/* MOBILE VERSION */}
            {/* ====================================================== */}
            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_9px_25px_rgba(15,23,42,0.05)] lg:hidden">
              {/* HEADER */}
              <div className="border-b border-slate-100 bg-brand-50/35 px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-[20px] font-black leading-[1.35] text-slate-950">
                      {page.selectionFactors.title}
                    </h2>

                    <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
                      The main factors we review before ranking each account.
                    </p>
                  </div>
                </div>
              </div>

              {/* FACTORS */}
              <div className="space-y-2.5 p-3.5">
                {page.selectionFactors.items.map(
                  (item, index) => {
                    const icons = [
                      ShieldCheck,
                      TrendingDown,
                      CircleDollarSign,
                      Zap,
                      WalletCards,
                      BadgeCheck,
                    ];

                    const Icon =
                      icons[index % icons.length];

                    return (
                      <details
                        key={item.title}
                        className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50/55"
                      >
                        <summary className="cursor-pointer list-none">
                          <div className="flex min-h-[62px] items-center gap-3 px-3.5 py-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                              <Icon className="h-[18px] w-[18px]" />
                            </span>

                            <h3 className="min-w-0 flex-1 text-[14px] font-black leading-6 text-slate-950">
                              {item.title}
                            </h3>

                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-lg text-brand-600 shadow-sm transition group-open:rotate-45">
                              +
                            </span>
                          </div>
                        </summary>

                        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3">
                          <p className="text-[12px] leading-6 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </details>
                    );
                  },
                )}
              </div>

              {/* FOOT NOTE */}
              <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3">
                <p className="text-[10px] font-semibold leading-5 text-slate-600">
                  We do not rank accounts by one metric alone. The final score
                  combines safety, total trading cost, accessibility and
                  execution quality.
                </p>
              </div>
            </article>
          </section>

          {/* ====================================================== */}
          {/* ACCOUNT TYPES COMPARISON */}
          {/* ====================================================== */}
          <section
  id="account-types"
  className="mt-8 scroll-mt-24 sm:mt-10"
>
            {/* ====================================================== */}
            {/* DESKTOP COMPARISON */}
            {/* ====================================================== */}
            <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] lg:block">
              {/* DESKTOP HEADER */}
              <div className="flex items-start justify-between gap-8 border-b border-slate-100 bg-gradient-to-r from-brand-50/45 via-white to-white px-7 py-6 xl:px-8">
                <div className="min-w-0 max-w-4xl">
                  <h2 className="text-[28px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950">
                    {page.accountComparison.title}
                  </h2>

                  <p className="mt-2 max-w-4xl text-[14px] leading-8 text-slate-600">
                    {page.accountComparison.description}
                  </p>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                  <Scale className="h-5 w-5" />
                </span>
              </div>

              {/* TABLE */}
              <div className="m-6 overflow-hidden rounded-[20px] border border-slate-200 xl:m-7">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-left text-white">
                      <th className="px-5 py-4 text-[12px] font-black">
                        Comparison Factor
                      </th>

                      <th className="px-5 py-4 text-[12px] font-black">
                        Cent Account
                      </th>

                      <th className="px-5 py-4 text-[12px] font-black">
                        Standard Account
                      </th>

                      <th className="px-5 py-4 text-[12px] font-black">
                        Raw Spread Account
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {page.accountComparison.rows.map(
                      (row, index) => {
                       
                        return (
                          <tr
                            key={row.label}
                            className={
                              index % 2 === 0
                                ? "bg-white"
                                : "bg-slate-50/70"
                            }
                          >
                            <th className="border-t border-slate-200 px-5 py-4 text-left text-[13px] font-black text-slate-950">
                              {row.label}
                            </th>

                            {[
                              {
                                key: "cent",
                                value: row.cent,
                              },
                              {
                                key: "standard",
                                value: row.standard,
                              },
                              {
                                key: "raw-spread",
                                value: row.rawSpread,
                              },
                            ].map((account) => {
                              const isCurrent =
                                account.key === page.slug;

                              return (
                                <td
                                  key={account.key}
                                  className={`border-t border-slate-200 px-5 py-4 text-[13px] leading-6 ${
                                    isCurrent
                                      ? "bg-brand-50/70 font-black text-brand-800"
                                      : "text-slate-600"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isCurrent ? (
                                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                                    ) : null}

                                    <span>
                                      {account.value}
                                    </span>
                                  </div>
                                </td>
                              );
                            })}

                           
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ====================================================== */}
            {/* MOBILE COMPARISON */}
            {/* ====================================================== */}
            <article className="rounded-[22px] border border-slate-200 bg-white shadow-[0_9px_25px_rgba(15,23,42,0.05)] lg:hidden">
              {/* MOBILE HEADER */}
              <div className="rounded-t-[22px] border-b border-slate-100 bg-gradient-to-r from-brand-50/55 via-white to-white px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <Scale className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950">
                      {page.accountComparison.title}
                    </h2>

                    <p className="mt-2 text-[12px] leading-6 text-slate-600">
                      {page.accountComparison.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* ONE CARD PER ACCOUNT TYPE */}
              <div className="space-y-3 px-3.5 pb-6 pt-3.5">
                {[
                  {
                    key: "cent",
                    title: "Cent Account",
                    subtitle:
                      "Smaller position sizes for learning and testing",
                    values: page.accountComparison.rows.map(
                      (row) => row.cent,
                    ),
                  },
                  {
                    key: "standard",
                    title: "Standard Account",
                    subtitle:
                      "Straightforward spread-based pricing",
                    values: page.accountComparison.rows.map(
                      (row) => row.standard,
                    ),
                  },
                  {
                    key: "raw-spread",
                    title: "Raw Spread Account",
                    subtitle:
                      "Lower spreads with separate commission",
                    values: page.accountComparison.rows.map(
                      (row) => row.rawSpread,
                    ),
                  },
                ].map((account) => {
                  const isCurrent =
                    page.slug === account.key;

                  return (
                    <article
                      key={account.key}
                      className={`overflow-hidden rounded-[18px] border ${
                        isCurrent
                          ? "border-brand-300 bg-brand-50/35"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      {/* ACCOUNT HEADER */}
                      <div
                        className={`flex items-center justify-between gap-3 border-b px-4 py-3.5 ${
                          isCurrent
                            ? "border-brand-100 bg-brand-50/65"
                            : "border-slate-100 bg-slate-50/65"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-[15px] font-black leading-6 text-slate-950">
                              {account.title}
                            </h3>

                            {isCurrent ? (
                              <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[9px] font-black text-white">
                                Current Page
                              </span>
                            ) : null}
                          </div>

                          <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                            {account.subtitle}
                          </p>
                        </div>

                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                            isCurrent
                              ? "bg-white text-brand-600 shadow-sm"
                              : "bg-white text-slate-500 shadow-sm"
                          }`}
                        >
                          {account.key === "cent" ? (
                            <WalletCards className="h-4 w-4" />
                          ) : account.key === "standard" ? (
                            <Scale className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                        </span>
                      </div>

                      {/* VALUES */}
                      <div className="divide-y divide-slate-100 px-4">
                        {page.accountComparison.rows.map(
                          (row, index) => (
                            <div
                              key={row.label}
                              className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-3 py-3"
                            >
                              <p className="text-[10px] font-bold leading-5 text-slate-500">
                                {row.label}
                              </p>

                              <p
                                className={`text-[11px] font-black leading-5 ${
                                  isCurrent
                                    ? "text-brand-700"
                                    : "text-slate-800"
                                }`}
                              >
                                {account.values[index]}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </article>
          </section>

                  {/* ====================================================== */}
          {/* BROKER ANALYSIS */}
          {/* ====================================================== */}
          {analyzedAccounts.length > 0 ? (
            <section className="mt-8 sm:mt-10">
              <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
                {/* ================================================== */}
                {/* DESKTOP HEADER */}
                {/* ================================================== */}
                <div className="hidden items-end justify-between gap-8 border-b border-slate-100 bg-gradient-to-r from-brand-50/45 via-white to-white px-7 py-6 lg:flex xl:px-8">
                  <div className="max-w-4xl">
                    <p className="text-xs font-black text-brand-600">
                      In-Depth Account Reviews
                    </p>

                    <h2 className="mt-1.5 text-[30px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950">
                      {page.brokerAnalysis.title}
                    </h2>

                    <p className="mt-2 text-[15px] leading-8 text-slate-600">
                      {page.brokerAnalysis.description}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-xs font-black text-brand-700 shadow-sm">
                    <BarChart3 className="h-4 w-4" />
                    {analyzedAccounts.length} Accounts Reviewed
                  </span>
                </div>

                {/* ================================================== */}
                {/* MOBILE HEADER */}
                {/* ================================================== */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-brand-50/55 via-white to-white px-4 py-4 lg:hidden">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                      <BarChart3 className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                      <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950">
                        {page.brokerAnalysis.title}
                      </h2>

                      <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
                        We explain why each leading account earned its
                        position and which traders it may suit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ================================================== */}
                {/* DESKTOP ANALYSIS CARDS */}
                {/* ================================================== */}
                <div className="hidden space-y-5 p-6 lg:block xl:p-7">
                  {analyzedAccounts.map((item) => {
                    const brokerName = getBrokerName(item.broker);
                    const accountName = getAccountName(item.account);
                    const rankLabel = getRankLabel(
                      item.rank,
                      page.slug,
                    );

                    const regulation =
                      item.broker.regulation_short ||
                      item.broker.regulation ||
                      "Check the broker review for regulatory details";

                    const commissionDisplay =
                      item.commissionValue === 0
                        ? "$0"
                        : formatCommission(item.account);

                    const accountSlug = accountName
                      .trim()
                      .toLowerCase()
                      .replace(/&/g, "and")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");

                    const accountPageHref =
                      item.broker.slug && accountSlug
                        ? `/en/brokers/${item.broker.slug}/accounts/${accountSlug}`
                        : null;

                    return (
                      <article
                        key={`${item.broker.id}-${item.account.id}-analysis-desktop`}
                        className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)]"
                      >
                        <div className="grid items-start xl:grid-cols-[minmax(0,1fr)_270px]">
                          {/* MAIN CONTENT */}
                          <div className="p-6">
                            {/* BROKER HEADER */}
                            <div className="flex items-start justify-between gap-5">
                              <div className="flex min-w-0 items-center gap-4">
                                <BrokerLogo
                                  broker={item.broker}
                                  size="lg"
                                />

                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-[22px] font-black leading-8 text-slate-950">
                                      {brokerName}
                                    </h3>

                                    {rankLabel ? (
                                      <span className="rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-700">
                                        {rankLabel}
                                      </span>
                                    ) : null}
                                  </div>

                                  <p className="mt-1 text-[13px] font-black text-brand-600">
                                    {accountName}
                                  </p>
                                </div>
                              </div>

                              <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-brand-100 bg-brand-50/60 px-3.5 py-2.5">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                                <div>
                                  <p className="text-[15px] font-black text-slate-950">
                                    {item.score}/100
                                  </p>

                                  <p className="text-[9px] font-bold text-slate-500">
                                    Account score
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* WHY IT RANKED */}
                            <div className="mt-5 rounded-[18px] border border-brand-100 bg-brand-50/45 p-4">
                              <p className="text-[11px] font-black uppercase tracking-[0.08em] text-brand-600">
                                Why It Ranked Here
                              </p>

                              <p className="mt-1.5 text-[14px] font-semibold leading-7 text-slate-700">
                                {getTopPickReason(item, page.slug)}
                              </p>
                            </div>

                            {/* KEY DETAILS */}
                            <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
                              <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-3.5">
                                <p className="text-[10px] font-bold text-slate-500">
                                  Spread
                                </p>

                                <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                                  {formatSpread(item.account)}
                                </p>
                              </div>

                              <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-3.5">
                                <p className="text-[10px] font-bold text-slate-500">
                                  Commission
                                </p>

                                <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                                  {commissionDisplay}
                                </p>
                              </div>

                              <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-3.5">
                                <p className="text-[10px] font-bold text-slate-500">
                                  Minimum Deposit
                                </p>

                                <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                                  {formatMoney(item.minDepositValue)}
                                </p>
                              </div>

                              <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-3.5">
                                <p className="text-[10px] font-bold text-slate-500">
                                  Execution
                                </p>

                                <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                                  {item.account.execution_type?.trim() ||
                                    "Check account terms"}
                                </p>
                              </div>
                            </div>

                            {/* REGULATION */}
                            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                                <ShieldCheck className="h-[18px] w-[18px]" />
                              </span>

                              <div>
                                <p className="text-[10px] font-bold text-slate-500">
                                  Regulation and Legal Entity
                                </p>

                                <p className="mt-1 text-[12px] font-semibold leading-6 text-slate-700">
                                  {regulation}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* SIDE PANEL */}
                          <aside className="m-5 mt-0 self-start rounded-[20px] border border-slate-200 bg-slate-50/65 p-5 xl:ml-0 xl:mt-5">
                            <div>
                              <p className="text-[11px] font-black text-brand-600">
                                Best Suited To
                              </p>

                              <p className="mt-2 text-[14px] font-semibold leading-7 text-slate-700">
                                {item.account.best_for?.trim() &&
!containsArabic(item.account.best_for)
  ? item.account.best_for.trim()
  : getTopPickReason(item, page.slug)}
                              </p>
                            </div>

                            <div className="mt-5 space-y-2.5 border-t border-slate-200 pt-5">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[11px] font-bold text-slate-500">
                                  Swap-free
                                </span>

                                <span className="text-[11px] font-black text-slate-900">
                                  {item.account
                                    .is_islamic_available === true
                                    ? "Available"
                                    : item.account
                                          .is_islamic_available === false
                                      ? "Not listed"
                                      : "Confirm"}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[11px] font-bold text-slate-500">
                                  Ranking
                                </span>

                                <span className="text-[11px] font-black text-slate-900">
                                  #{item.rank}
                                </span>
                              </div>
                            </div>

                            {item.broker.slug ? (
                              <div className="mt-5 space-y-2.5 border-t border-slate-200 pt-5">
                                {accountPageHref ? (
                                  <Link
                                    href={accountPageHref}
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-white px-3 text-[12px] font-black text-brand-700 transition hover:bg-brand-50"
                                  >
                                    Account Details
                                    <ArrowRight className="h-4 w-4" />
                                  </Link>
                                ) : (
                                  <Link
                                    href={`/en/brokers/${item.broker.slug}`}
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-100 bg-white px-3 text-[12px] font-black text-brand-700 transition hover:bg-brand-50"
                                  >
                                    Broker Review
                                    <ArrowRight className="h-4 w-4" />
                                  </Link>
                                )}

                                <Link
                                  href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-analysis-en`}
                                  target="_blank"
                                  rel="nofollow sponsored noopener noreferrer"
                                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 text-[12px] font-black text-white transition hover:bg-brand-700"
                                >
                                  Open Account
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </div>
                            ) : null}
                          </aside>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* ================================================== */}
                {/* MOBILE ANALYSIS */}
                {/* ================================================== */}
                <div className="space-y-3 p-3.5 lg:hidden">
                  {analyzedAccounts.map((item) => {
                    const brokerName = getBrokerName(item.broker);
                    const accountName = getAccountName(item.account);
                    const rankLabel = getRankLabel(
                      item.rank,
                      page.slug,
                    );
                    const isFirst = item.rank === 1;

                    const regulation =
                      item.broker.regulation_short ||
                      item.broker.regulation ||
                      "Check the broker review for regulatory details";

                    const commissionDisplay =
                      item.commissionValue === 0
                        ? "$0"
                        : formatCommission(item.account);

                    const accountSlug = accountName
                      .trim()
                      .toLowerCase()
                      .replace(/&/g, "and")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");

                    const accountPageHref =
                      item.broker.slug && accountSlug
                        ? `/en/brokers/${item.broker.slug}/accounts/${accountSlug}`
                        : null;

                    return (
                      <details
                        key={`${item.broker.id}-${item.account.id}-analysis-mobile`}
                        open={isFirst}
                        className={`group overflow-hidden rounded-[20px] border bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] ${
                          isFirst
                            ? "border-brand-200"
                            : "border-slate-200"
                        }`}
                      >
                        <summary className="cursor-pointer list-none">
                          <div
                            className={`h-1 ${
                              isFirst
                                ? "bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300"
                                : "bg-brand-400"
                            }`}
                          />

                          <div className="p-4">
                            <div className="grid grid-cols-[32px_42px_minmax(0,1fr)_28px] items-center gap-2.5">
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white ${
                                  isFirst
                                    ? "bg-brand-600"
                                    : "bg-slate-950"
                                }`}
                              >
                                {item.rank}
                              </span>

                              <BrokerLogo
                                broker={item.broker}
                                size="sm"
                              />

                              <div className="min-w-0">
                                <p className="text-[14px] font-black leading-5 text-slate-950">
                                  {brokerName}
                                </p>

                                <p className="mt-0.5 break-words text-[10px] font-bold leading-4 text-brand-700">
                                  {accountName}
                                </p>
                              </div>

                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition group-open:rotate-45 group-open:bg-brand-50 group-open:text-brand-600">
                                +
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {rankLabel ? (
                                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-700">
                                  {rankLabel}
                                </span>
                              ) : null}

                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-black text-slate-800">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                {item.score}/100
                              </span>
                            </div>
                          </div>
                        </summary>

                        <div className="border-t border-slate-100 bg-white p-4">
                          <p className="text-[13px] font-semibold leading-6 text-slate-700">
                            {getTopPickReason(item, page.slug)}
                          </p>

                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="text-[9px] font-bold text-slate-500">
                                Spread
                              </p>

                              <p className="mt-1 text-[11px] font-black leading-5 text-slate-950">
                                {formatSpread(item.account)}
                              </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="text-[9px] font-bold text-slate-500">
                                Commission
                              </p>

                              <p className="mt-1 text-[11px] font-black leading-5 text-slate-950">
                                {commissionDisplay}
                              </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="text-[9px] font-bold text-slate-500">
                                Minimum Deposit
                              </p>

                              <p className="mt-1 text-[11px] font-black leading-5 text-slate-950">
                                {formatMoney(item.minDepositValue)}
                              </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="text-[9px] font-bold text-slate-500">
                                Execution
                              </p>

                              <p className="mt-1 text-[11px] font-black leading-5 text-slate-950">
                                {item.account.execution_type?.trim() ||
                                  "Check terms"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50/45 p-3">
                            <p className="text-[9px] font-black text-brand-600">
                              Regulation
                            </p>

                            <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-700">
                              {regulation}
                            </p>
                          </div>

                          {item.broker.slug ? (
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <Link
                                href={
                                  accountPageHref ||
                                  `/en/brokers/${item.broker.slug}`
                                }
                                className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-brand-100 bg-white px-2 text-[10px] font-black text-brand-700"
                              >
                                View Details
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>

                              <Link
                                href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-analysis-mobile-en`}
                                target="_blank"
                                rel="nofollow sponsored noopener noreferrer"
                                className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-brand-600 px-2 text-[10px] font-black text-white"
                              >
                                Open Account
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}

                   {/* ====================================================== */}
          {/* ADVANTAGES AND DISADVANTAGES */}
          {/* ====================================================== */}
          <section className="mt-7 sm:mt-10">
            <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
              {/* ================================================== */}
              {/* ADVANTAGES */}
              {/* ================================================== */}
              <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_9px_26px_rgba(15,23,42,0.05)] lg:flex lg:h-full lg:flex-col lg:rounded-[24px]">
                {/* HEADER */}
                <div className="flex items-center gap-3 border-b border-slate-100 bg-brand-50/40 px-4 py-3.5 sm:px-5 sm:py-4 lg:min-h-[66px] lg:px-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm sm:h-10 sm:w-10">
                    <CheckCircle2 className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                  </span>

                  <h2 className="min-w-0 text-[19px] font-black leading-[1.35] text-slate-950 sm:text-[23px] lg:text-[25px]">
                    {page.advantages.title}
                  </h2>
                </div>

                {/* DESKTOP ITEMS */}
                <div className="hidden flex-1 auto-rows-fr grid-cols-2 gap-3 p-5 sm:grid lg:grid">
                  {page.advantages.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex h-full rounded-2xl border border-brand-100 bg-brand-50/35 p-4"
                    >
                      <div className="flex h-full w-full items-start gap-2.5">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-brand-600" />

                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="text-[14px] font-black leading-6 text-slate-950">
                            {item.title}
                          </h3>

                          <p className="mt-1 flex-1 text-[12px] leading-6 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* MOBILE ITEMS */}
                <div className="divide-y divide-slate-100 px-4 lg:hidden">
                  {page.advantages.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 py-3.5"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Check className="h-3.5 w-3.5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-black leading-5 text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[10px] leading-5 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* ================================================== */}
              {/* DISADVANTAGES */}
              {/* ================================================== */}
              <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_9px_26px_rgba(15,23,42,0.05)] lg:flex lg:h-full lg:flex-col lg:rounded-[24px]">
                {/* HEADER */}
                <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3.5 sm:px-5 sm:py-4 lg:min-h-[66px] lg:px-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm sm:h-10 sm:w-10">
                    <XCircle className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                  </span>

                  <h2 className="min-w-0 text-[19px] font-black leading-[1.35] text-slate-950 sm:text-[23px] lg:text-[25px]">
                    {page.disadvantages.title}
                  </h2>
                </div>

                {/* DESKTOP ITEMS */}
                <div className="hidden flex-1 auto-rows-fr grid-cols-2 gap-3 p-5 sm:grid lg:grid">
                  {page.disadvantages.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex h-full rounded-2xl border border-slate-200 bg-slate-50/65 p-4"
                    >
                      <div className="flex h-full w-full items-start gap-2.5">
                        <Minus className="mt-1 h-4 w-4 shrink-0 text-slate-600" />

                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="text-[14px] font-black leading-6 text-slate-950">
                            {item.title}
                          </h3>

                          <p className="mt-1 flex-1 text-[12px] leading-6 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* MOBILE ITEMS */}
                <div className="divide-y divide-slate-100 px-4 lg:hidden">
                  {page.disadvantages.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 py-3.5"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <Minus className="h-3.5 w-3.5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-black leading-5 text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[10px] leading-5 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          {/* ====================================================== */}
          {/* SUITABLE / NOT SUITABLE */}
          {/* ====================================================== */}
          <section className="mt-8 sm:mt-10">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* SUITABLE */}
              <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                <div className="border-b border-slate-100 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <UserCheck className="h-5 w-5" />
                    </span>

                    <div>
                      <h2 className="text-[21px] font-black leading-7 text-slate-950 sm:text-[25px]">
                        {page.suitableFor.title}
                      </h2>

                      <p className="mt-1.5 text-[12px] leading-6 text-slate-600 sm:text-[13px]">
                        {page.suitableFor.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 p-4 sm:p-5">
                  {page.suitableFor.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/35 px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />

                      <p className="text-[12px] font-semibold leading-6 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/* NOT SUITABLE */}
              <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                <div className="border-b border-slate-100 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Users className="h-5 w-5" />
                    </span>

                    <div>
                      <h2 className="text-[21px] font-black leading-7 text-slate-950 sm:text-[25px]">
                        {page.notSuitableFor.title}
                      </h2>

                      <p className="mt-1.5 text-[12px] leading-6 text-slate-600 sm:text-[13px]">
                        {page.notSuitableFor.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 p-4 sm:p-5">
                  {page.notSuitableFor.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/65 px-4 py-3"
                    >
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />

                      <p className="text-[12px] font-semibold leading-6 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          {/* ====================================================== */}
          {/* FULL BROKER COMPARISON */}
          {/* ====================================================== */}
          <section
            id="comparison"
            className="mt-8 scroll-mt-24 sm:mt-10"
          >
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
              {/* HEADER */}
              <div className="border-b border-slate-100 bg-gradient-to-r from-brand-50/45 via-white to-white px-5 py-5 sm:px-7 sm:py-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm sm:h-11 sm:w-11">
                    <BarChart3 className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950 sm:text-[28px]">
                      {page.comparisonTable.title}
                    </h2>

                    <p className="mt-2 max-w-4xl text-[12px] leading-6 text-slate-600 sm:text-[14px] sm:leading-8">
                      {page.comparisonTable.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1180px] border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-left text-white">
                      <th className="px-4 py-4 text-[11px] font-black">
                        Rank
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.broker}
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.account}
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.spread}
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.commission}
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.minDeposit}
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.execution}
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.islamic}
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.rating}
                      </th>

                      <th className="px-4 py-4 text-[11px] font-black">
                        {page.comparisonTable.columns.action}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rankedAccounts.map((item, index) => {
                      const brokerName = getBrokerName(item.broker);
                      const accountName = getAccountName(item.account);

                      return (
                        <tr
                          key={`${item.broker.id}-${item.account.id}-comparison`}
                          className={
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-slate-50/65"
                          }
                        >
                          <td className="border-t border-slate-200 px-4 py-4">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black text-white ${
                                item.rank === 1
                                  ? "bg-brand-600"
                                  : "bg-slate-900"
                              }`}
                            >
                              {item.rank}
                            </span>
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4">
                            <div className="flex min-w-[150px] items-center gap-3">
                              <BrokerLogo
                                broker={item.broker}
                                size="sm"
                              />

                              <span className="text-[13px] font-black text-slate-950">
                                {brokerName}
                              </span>
                            </div>
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4 text-[12px] font-bold text-slate-700">
                            {accountName}
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4 text-[12px] font-semibold text-slate-700">
                            {formatSpread(item.account)}
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4 text-[12px] font-semibold text-slate-700">
                            {formatCommission(item.account)}
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4 text-[12px] font-black text-slate-950">
                            {formatMoney(item.minDepositValue)}
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4 text-[12px] font-semibold text-slate-700">
                            {item.account.execution_type?.trim() ||
                              "Check terms"}
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                                item.account
                                  .is_islamic_available === true
                                  ? "bg-brand-50 text-brand-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {item.account
                                .is_islamic_available === true
                                ? "Available"
                                : item.account
                                      .is_islamic_available === false
                                  ? "Not listed"
                                  : "Confirm"}
                            </span>
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1.5">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />

                              <span className="text-[11px] font-black text-slate-900">
                                {item.score}
                              </span>
                            </div>
                          </td>

                          <td className="border-t border-slate-200 px-4 py-4">
                            {item.broker.slug ? (
                              <Link
                                href={`/en/brokers/${item.broker.slug}`}
                                className="inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-brand-100 bg-white px-3 text-[10px] font-black text-brand-700 transition hover:bg-brand-50"
                              >
                                Review
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400">
                                Not available
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE COMPARISON */}
              <div className="space-y-3 p-3.5 lg:hidden">
                {rankedAccounts.map((item) => {
                  const brokerName = getBrokerName(item.broker);
                  const accountName = getAccountName(item.account);

                  return (
                    <details
                      key={`${item.broker.id}-${item.account.id}-mobile-comparison`}
                      className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white"
                    >
                      <summary className="cursor-pointer list-none">
                        <div className="grid grid-cols-[32px_42px_minmax(0,1fr)_28px] items-center gap-2.5 p-3.5">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white ${
                              item.rank === 1
                                ? "bg-brand-600"
                                : "bg-slate-950"
                            }`}
                          >
                            {item.rank}
                          </span>

                          <BrokerLogo
                            broker={item.broker}
                            size="sm"
                          />

                          <div className="min-w-0">
                            <p className="text-[14px] font-black leading-5 text-slate-950">
                              {brokerName}
                            </p>

                            <p className="mt-0.5 text-[10px] font-bold leading-4 text-slate-500">
                              {accountName}
                            </p>
                          </div>

                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition group-open:rotate-45">
                            +
                          </span>
                        </div>
                      </summary>

                      <div className="border-t border-slate-100 bg-slate-50/55 p-3.5">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl bg-white p-3">
                            <p className="text-[9px] font-bold text-slate-500">
                              Spread
                            </p>

                            <p className="mt-1 text-[11px] font-black leading-5 text-slate-950">
                              {formatSpread(item.account)}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-3">
                            <p className="text-[9px] font-bold text-slate-500">
                              Commission
                            </p>

                            <p className="mt-1 text-[11px] font-black leading-5 text-slate-950">
                              {formatCommission(item.account)}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-3">
                            <p className="text-[9px] font-bold text-slate-500">
                              Minimum Deposit
                            </p>

                            <p className="mt-1 text-[11px] font-black leading-5 text-slate-950">
                              {formatMoney(item.minDepositValue)}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-3">
                            <p className="text-[9px] font-bold text-slate-500">
                              Score
                            </p>

                            <p className="mt-1 text-[11px] font-black leading-5 text-slate-950">
                              {item.score}/100
                            </p>
                          </div>
                        </div>

                        {item.broker.slug ? (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <Link
                              href={`/en/brokers/${item.broker.slug}`}
                              className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-brand-100 bg-white px-2 text-[10px] font-black text-brand-700"
                            >
                              Broker Review
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>

                            <Link
                              href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-comparison-en`}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-brand-600 px-2 text-[10px] font-black text-white"
                            >
                              Open Account
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>

                   {/* ====================================================== */}
          {/* METHODOLOGY */}
          {/* ====================================================== */}
          <section
            id="methodology"
            className="mt-8 scroll-mt-24 sm:mt-10"
          >
            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[26px]">
              {/* ================================================== */}
              {/* DESKTOP HEADER */}
              {/* ================================================== */}
              <div className="hidden items-start justify-between gap-8 border-b border-slate-100 bg-gradient-to-r from-brand-50/45 via-white to-white px-7 py-6 lg:flex xl:px-8">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <BarChart3 className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-brand-600">
                      Ranking Methodology
                    </p>

                    <h2 className="mt-1 text-[28px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950">
                      {page.methodology.title}
                    </h2>
                  </div>
                </div>

                <p className="max-w-[640px] text-[14px] leading-8 text-slate-600">
                  {page.methodology.introduction}
                </p>
              </div>

              {/* ================================================== */}
              {/* MOBILE HEADER */}
              {/* ================================================== */}
              <div className="border-b border-slate-100 bg-gradient-to-r from-brand-50/55 via-white to-white px-4 py-4 lg:hidden">
                {/* ICON + TITLE ON SAME ROW */}
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <BarChart3 className="h-[18px] w-[18px]" />
                  </span>

                  <h2 className="min-w-0 flex-1 text-[19px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950">
                    {page.methodology.title}
                  </h2>
                </div>

                <p className="mt-3 text-[12px] leading-6 text-slate-600">
                  {page.methodology.introduction}
                </p>
              </div>

              {/* ================================================== */}
              {/* DESKTOP FACTORS */}
              {/* ================================================== */}
              <div className="hidden grid-cols-5 gap-3 p-6 lg:grid xl:p-7">
                {page.methodology.factors.map(
                  (factor, index) => (
                    <article
                      key={factor.title}
                      className="flex min-h-[190px] flex-col rounded-[18px] border border-slate-200 bg-slate-50/55 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                          <Target className="h-[18px] w-[18px]" />
                        </span>

                        <span className="text-[10px] font-black text-brand-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[14px] font-black leading-6 text-slate-950">
                        {factor.title}
                      </h3>

                      <p className="mt-2 text-[11px] leading-6 text-slate-600">
                        {factor.description}
                      </p>
                    </article>
                  ),
                )}
              </div>

              {/* ================================================== */}
              {/* MOBILE FACTORS */}
              {/* ================================================== */}
              <div className="space-y-2.5 p-3.5 lg:hidden">
                {page.methodology.factors.map(
                  (factor, index) => (
                    <article
                      key={factor.title}
                      className="rounded-[16px] border border-slate-200 bg-slate-50/55 px-3.5 py-3.5"
                    >
                      <div className="flex items-start gap-3">
                        {/* ICON */}
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                          <Target className="h-[17px] w-[17px]" />
                        </span>

                        {/* CONTENT */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-[14px] font-black leading-6 text-slate-950">
                              {factor.title}
                            </h3>

                            <span className="shrink-0 pt-0.5 text-[9px] font-black text-brand-500">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <p className="mt-1 text-[11px] leading-5.5 text-slate-600">
                            {factor.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>

              {/* ================================================== */}
              {/* DISCLAIMER */}
              {/* ================================================== */}
              <div className="border-t border-slate-100 bg-slate-50/65 px-4 py-3.5 sm:px-6 sm:py-4">
                <div className="flex items-start gap-2.5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />

                  <p className="text-[10px] font-semibold leading-5.5 text-slate-600 sm:text-[12px] sm:leading-6">
                    {page.methodology.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== */}
          {/* FAQ */}
          {/* ====================================================== */}
          <section className="mt-8 sm:mt-10">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
              {/* HEADER */}
                            {/* ================================================== */}
              {/* FAQ HEADER */}
              {/* ================================================== */}

              {/* DESKTOP */}
              <div className="hidden items-start justify-between gap-8 border-b border-slate-100 bg-gradient-to-r from-brand-50/45 via-white to-white px-7 py-6 lg:flex">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <CircleHelp className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[11px] font-black uppercase tracking-[0.08em] text-brand-600">
                      Frequently Asked Questions
                    </p>

                    <h2 className="mt-1 text-[28px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950">
                      Common Questions About {page.breadcrumbLabel}
                    </h2>
                  </div>
                </div>

                <p className="max-w-[560px] text-[14px] leading-8 text-slate-600">
                  Clear answers to the questions traders commonly ask before
                  selecting this type of forex account.
                </p>
              </div>

              {/* MOBILE */}
              <div className="border-b border-slate-100 bg-gradient-to-r from-brand-50/55 via-white to-white px-4 py-4 lg:hidden">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <CircleHelp className="h-[18px] w-[18px]" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.08em] text-brand-600">
                      Frequently Asked Questions
                    </p>

                    <h2 className="mt-1 text-[19px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950">
                      Common Questions About {page.breadcrumbLabel}
                    </h2>
                  </div>
                </div>

                <p className="mt-3 text-[12px] leading-6 text-slate-600">
                  Clear answers to common questions before choosing this forex
                  account type.
                </p>
              </div>

              <div className="grid gap-3 p-4 lg:grid-cols-2 lg:p-6">
                {page.faq.slice(0, 6).map((item) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50/45 open:border-brand-200 open:bg-white"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4">
                      <span className="flex items-start gap-3">
                        <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />

                        <span className="text-[13px] font-black leading-6 text-slate-950 sm:text-[14px]">
                          {item.question}
                        </span>
                      </span>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-lg text-brand-600 shadow-sm transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3">
                      <p className="text-[12px] leading-6 text-slate-600 sm:text-[13px] sm:leading-7">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

                   {/* ====================================================== */}
          {/* RELATED PAGES */}
          {/* ====================================================== */}
          <section className="mt-8 sm:mt-10">
            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[26px]">
              {/* ================================================== */}
              {/* DESKTOP HEADER */}
              {/* ================================================== */}
              <div className="hidden border-b border-slate-100 px-7 py-5 lg:block">
                <h2 className="text-[27px] font-black leading-8 text-slate-950">
                  {page.relatedPages.title}
                </h2>

                <p className="mt-1.5 text-[13px] leading-7 text-slate-600">
                  Continue comparing forex brokers, account types and
                  trading costs.
                </p>
              </div>

              {/* ================================================== */}
              {/* MOBILE HEADER */}
              {/* ================================================== */}
              <div className="border-b border-slate-100 bg-gradient-to-r from-brand-50/45 via-white to-white px-4 py-4 lg:hidden">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                    <Layers3 className="h-[17px] w-[17px]" />
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-[19px] font-black leading-6 text-slate-950">
                      {page.relatedPages.title}
                    </h2>

                    <p className="mt-0.5 text-[10px] leading-5 text-slate-600">
                      Explore more broker and account comparisons.
                    </p>
                  </div>
                </div>
              </div>

              {/* ================================================== */}
              {/* DESKTOP LINKS */}
              {/* ================================================== */}
              <div className="hidden grid-cols-3 gap-3 p-6 lg:grid">
                {page.relatedPages.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-[145px] flex-col rounded-[20px] border border-slate-200 bg-slate-50/55 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_12px_28px_rgba(30,91,184,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                        <Layers3 className="h-5 w-5" />
                      </span>

                      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                    </div>

                    <h3 className="mt-4 text-[15px] font-black leading-6 text-slate-950">
                      {item.label}
                    </h3>

                    <p className="mt-1.5 text-[11px] leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>

              {/* ================================================== */}
              {/* MOBILE LINKS */}
              {/* ================================================== */}
              <div className="space-y-2.5 p-3.5 lg:hidden">
                {page.relatedPages.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-[16px] border border-slate-200 bg-slate-50/55 px-3.5 py-3 transition active:bg-brand-50"
                  >
                    {/* ICON */}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
                      <Layers3 className="h-[17px] w-[17px]" />
                    </span>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-black leading-5 text-slate-950">
                        {item.label}
                      </h3>

                      <p className="mt-0.5 line-clamp-2 text-[10px] leading-5 text-slate-600">
                        {item.description}
                      </p>
                    </div>

                    {/* ARROW */}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ====================================================== */}
          {/* FINAL CTA */}
          {/* ====================================================== */}
          <section className="mt-8 pb-4 sm:mt-10 sm:pb-6">
            <div className="relative overflow-hidden rounded-[26px] bg-brand-600 px-5 py-7 shadow-[0_18px_40px_rgba(30,91,184,0.2)] sm:px-8 sm:py-9">
              <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

              <div className="pointer-events-none absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white/75">
                    Make an Informed Choice
                  </p>

                  <h2 className="mt-2 text-[23px] font-black leading-[1.35] text-white sm:text-[32px]">
                    {page.cta.title}
                  </h2>

                  <p className="mt-2.5 text-[13px] leading-7 text-white/80 sm:text-[15px] sm:leading-8">
                    {page.cta.description}
                  </p>
                </div>

                <a
                  href="#comparison"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-[13px] font-black text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-50 sm:text-sm"
                >
                  {page.cta.buttonLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}