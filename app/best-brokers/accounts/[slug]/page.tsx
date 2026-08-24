import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronLeft,
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
const SITE_NAME = "بروكر العرب";

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
      title: "الصفحة غير موجودة | بروكر العرب",
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
     * يمكن إبقاء keywords لاستخدامات أخرى،
     * لكن لا تعتمد عليها كعامل ترتيب في Google.
     */
    keywords: page.seo.keywords,

    applicationName: SITE_NAME,
    authors: [
      {
        name: SITE_NAME,
        url: `${BASE_URL}/about`,
      },
    ],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "المال والاستثمار",

    alternates: {
      canonical: page.seo.canonical,
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
      locale: "ar_AR",
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

  return clamp(100 - (value / preferredMaximum) * 100, 0, 100);
}

function getSpreadValue(account: BrokerAccountRow): number | null {
  return (
    toNumber(account.spread_avg) ??
    toNumber(account.spread_min) ??
    toNumber(account.spread)
  );
}

function getCommissionValue(account: BrokerAccountRow): number | null {
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
  const safetyScore = normalizeFivePointScore(broker.score_safety);
  const feesScore = normalizeFivePointScore(broker.score_fees);
  const depositScore = normalizeFivePointScore(broker.score_deposit);

  const spread = getSpreadValue(account);
  const commission = getCommissionValue(account);
  const minimumDeposit = getMinimumDeposit(account, broker);

  const spreadScore =
    pageSlug === "raw-spread"
      ? lowerIsBetter(spread, 2)
      : lowerIsBetter(spread, 4);

  const commissionScore = lowerIsBetter(commission, 10, 55);
  const minDepositScore = lowerIsBetter(minimumDeposit, 500, 50);

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
  return broker.name?.trim() || "شركة فوركس";
}

function getAccountName(account: BrokerAccountRow) {
  return account.account_name?.trim() || "حساب التداول";
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
    return "غير محدد";
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
    return `${average} نقطة متوسط`;
  }

  if (minimum !== null) {
    return `من ${minimum} نقطة`;
  }

  if (generic !== null) {
    return `${generic} نقطة`;
  }

  if (typeof account.spread === "string" && account.spread.trim()) {
    return account.spread;
  }

  return "غير محدد";
}

function formatCommission(account: BrokerAccountRow) {
  const numeric = getCommissionValue(account);

  if (numeric !== null) {
    if (numeric === 0) {
  return "$0";
}

    return `$${numeric} تقريبًا`;
  }

  if (
    typeof account.commission === "string" &&
    account.commission.trim()
  ) {
    return account.commission;
  }

  return "غير محددة";
}

function getRankLabel(rank: number, slug: AccountPageSlug) {
  if (rank === 1) {
    return "الأفضل إجمالًا";
  }

  if (rank === 2) {
    return slug === "raw-spread"
      ? "تكلفة تنافسية"
      : "خيار متوازن";
  }

  if (rank === 3) {
    return slug === "cent"
      ? "مناسب للمبتدئين"
      : "خيار قوي";
  }

  return null;
}

function getScoreLabel(score: number) {
  if (score >= 85) {
    return "ممتاز";
  }

  if (score >= 75) {
    return "قوي جدًا";
  }

  if (score >= 65) {
    return "جيد";
  }

  return "مقبول";
}

function getTopPickReason(
  item: RankedAccount,
  pageSlug: AccountPageSlug,
) {
  if (item.rank === 1) {
    if (pageSlug === "cent") {
      return "أفضل توازن بين سهولة البدء، قوة الشركة وشروط حساب السنت.";
    }

    if (pageSlug === "standard") {
      return "أفضل توازن شامل بين السبريد، الأمان وسهولة استخدام الحساب.";
    }

    return "أفضل نتيجة إجمالية بعد احتساب السبريد والعمولة والأمان.";
  }

  if (item.rank === 2) {
    if (pageSlug === "cent") {
      return "خيار قوي لمن يريد بدء التداول الحقيقي برأس مال محدود.";
    }

    if (pageSlug === "standard") {
      return "حساب متوازن بشروط مناسبة لغالبية المتداولين.";
    }

    return "تكلفة تداول تنافسية مع شروط مناسبة للمتداول النشط.";
  }

  if (pageSlug === "cent") {
    return "خيار مناسب للمبتدئين واختبار الاستراتيجيات بأحجام صغيرة.";
  }

  if (pageSlug === "standard") {
    return "بديل قوي يجمع بين بساطة الحساب وتنوع أدوات التداول.";
  }

  return "خيار قوي للسكالبينج والتداول المتكرر بعد احتساب العمولة.";
}

function sortAndDeduplicateAccounts(
  page: AccountPageContent,
  accounts: BrokerAccountRow[],
  brokers: BrokerRow[],
): RankedAccount[] {
  const brokerMap = new Map(
    brokers
      .filter((broker) => broker.id !== null && broker.id !== undefined)
      .map((broker) => [String(broker.id), broker]),
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
      const broker = brokerMap.get(String(account.broker_id));

      if (!broker) {
        return null;
      }

      return {
        broker,
        account,
        score: calculateAccountScore(page.slug, broker, account),
        spreadValue: getSpreadValue(account),
        commissionValue: getCommissionValue(account),
        minDepositValue: getMinimumDeposit(account, broker),
        rank: 0,
      };
    })
    .filter((item): item is RankedAccount => Boolean(item))
    .sort((a, b) => b.score - a.score);

  const uniqueByBroker = new Map<string, RankedAccount>();

  for (const item of ranked) {
    const brokerKey =
      item.broker.slug ||
      String(item.broker.id) ||
      getBrokerName(item.broker);

    const current = uniqueByBroker.get(brokerKey);

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

async function getRankedAccounts(page: AccountPageContent) {
  const supabase = await createClient();

  const { data: accountRows, error: accountsError } = await supabase
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

  if (accountsError || !accountRows?.length) {
    return [];
  }

  const brokerIds = Array.from(
    new Set(
      accountRows
        .map((account) => account.broker_id)
        .filter(
          (brokerId): brokerId is string | number =>
            brokerId !== null && brokerId !== undefined,
        ),
    ),
  );

  if (!brokerIds.length) {
    return [];
  }

const { data: brokerRows, error: brokersError } = await supabase
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
  .in("id", brokerIds)
  .eq("publication_status", "published");

  if (brokersError || !brokerRows?.length) {
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
            light ? "text-blue-300" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`text-[24px] font-black leading-[1.35] sm:text-3xl ${
          light ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-2.5 text-[15px] leading-7 sm:text-base sm:leading-8 ${
            light ? "text-slate-300" : "text-slate-600"
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
          alt={`شعار ${name}`}
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

  const accountItems = rankedAccounts.map((item) => {
    const brokerName = getBrokerName(item.broker);
    const accountName = getAccountName(item.account);
    const accountSlug = accountName
  .trim()
  .toLowerCase()
  .replace(/&/g, "and")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

    const brokerUrl = item.broker.slug
      ? `${BASE_URL}/brokers/${item.broker.slug}`
      : pageUrl;
      

    const accountId = `${pageUrl}#account-${item.rank}`;

    return {
      "@type": "ListItem",
      position: item.rank,
      url: brokerUrl,

      item: {
        "@type": "FinancialProduct",
        "@id": accountId,

        name: `${accountName} من ${brokerName}`,
        description: getTopPickReason(item, page.slug),
        category: page.breadcrumbLabel,
        url: brokerUrl,

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
          `السبريد: ${formatSpread(item.account)}`,
          `العمولة: ${formatCommission(item.account)}`,
        ].join("، "),

        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "الترتيب",
            value: item.rank,
          },
          {
            "@type": "PropertyValue",
            name: "نتيجة الحساب",
            value: item.score,
            unitText: "من 100",
          },
          {
            "@type": "PropertyValue",
            name: "السبريد",
            value: formatSpread(item.account),
          },
          {
            "@type": "PropertyValue",
            name: "العمولة",
            value: formatCommission(item.account),
          },
          {
            "@type": "PropertyValue",
            name: "الحد الأدنى للإيداع",
            value: formatMoney(item.minDepositValue),
          },
          {
            "@type": "PropertyValue",
            name: "نوع التنفيذ",
            value:
              item.account.execution_type?.trim() ||
              "راجع شروط الحساب",
          },
          {
            "@type": "PropertyValue",
            name: "توفر الحساب الإسلامي",
            value:
              item.account.is_islamic_available === true
                ? "متوفر"
                : item.account.is_islamic_available === false
                  ? "غير متوفر حسب البيانات الحالية"
                  : "يجب التحقق من الشركة",
          },
        ],
      },
    };
  });

  const graph = [
    /*
     * هوية الموقع والناشر
     */
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: "Broker Alarab",
      url: BASE_URL,
    },

    /*
     * تعريف الموقع
     */
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: BASE_URL,
      name: SITE_NAME,
      alternateName: "Broker Alarab",
      inLanguage: "ar",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },

    /*
     * مسار التنقل
     */
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "أفضل شركات الفوركس",
          item: `${BASE_URL}/best-brokers`,
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
     * الصفحة نفسها
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
      inLanguage: "ar",

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
          name: "حسابات الفوركس",
        },
        {
          "@type": "Thing",
          name: "مقارنة شركات الفوركس",
        },
        {
          "@type": "Thing",
          name: "تكلفة تداول الفوركس",
        },
      ],

      keywords: page.seo.keywords.join(", "),

      relatedLink: page.relatedPages.links.map((item) =>
        new URL(item.href, BASE_URL).toString(),
      ),

      significantLink: [
        `${pageUrl}#comparison`,
        `${pageUrl}#methodology`,
      ],
    },

    /*
     * قائمة الحسابات المرتبة
     */
    ...(accountItems.length
      ? [
          {
            "@type": "ItemList",
            "@id": itemListId,

            url: `${pageUrl}#comparison`,
            name: page.comparisonTable.title,
            description: page.comparisonTable.description,

            numberOfItems: accountItems.length,
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
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}

export default async function AccountTypePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getAccountPageContent(slug);

  if (!page) {
    notFound();
  }

  const rankedAccounts = await getRankedAccounts(page);
  const analyzedAccounts = rankedAccounts.slice(
    0,
    page.brokerAnalysis.maximumBrokers,
  );

  return (
    <>
      <JsonLd page={page} rankedAccounts={rankedAccounts} />

     <main
  dir="rtl"
  className="min-h-screen bg-[#F7F9FC] font-cairo text-slate-900 max-lg:[&_section_h2]:!text-[20px] max-lg:[&_section_h2]:!leading-[1.35] max-lg:[&_section_h2]:!tracking-[-0.015em]"
>
        <div className="mx-auto w-full max-w-[1520px] px-4 py-5 sm:px-6 lg:px-8">
          <nav
            aria-label="مسار الصفحة"
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500"
          >
            <Link
              href="/"
              className="transition hover:text-brand-600"
            >
              الرئيسية
            </Link>

            <ChevronLeft className="h-4 w-4" />

            <Link
              href="/best-brokers"
              className="transition hover:text-brand-600"
            >
              أفضل شركات الفوركس
            </Link>

            <ChevronLeft className="h-4 w-4" />

            <span className="font-bold text-slate-800">
              {page.breadcrumbLabel}
            </span>
          </nav>

               {/* ====================================================== */}
          {/* HERO */}
          {/* ====================================================== */}
          <section className="relative">
            <div className="relative overflow-hidden rounded-[24px] border border-brand-100 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.065)] lg:rounded-[28px]">
              {/* TOP BRAND LINE */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-brand-700 via-brand-500 to-brand-300" />

              {/* SOFT BACKGROUND DETAILS */}
              <div className="pointer-events-none absolute -right-20 top-8 h-48 w-48 rounded-full bg-brand-50/80 blur-3xl lg:h-72 lg:w-72" />
              <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-blue-50/80 blur-3xl lg:h-56 lg:w-56" />

              <div className="relative grid gap-5 px-4 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7 lg:min-h-[340px] lg:grid-cols-[minmax(0,1fr)_370px] lg:items-center lg:gap-8 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:px-10">
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
                      <span>تحديث 2026</span>
                    </span>
                  </div>

                  {/* TITLE */}
                  <div className="mt-4 text-center lg:text-right">
                    <p className="text-[11px] font-black text-brand-600 sm:text-xs">
                      {page.hero.eyebrow}
                    </p>

                    <h1 className="mx-auto mt-1.5 max-w-[760px] font-black tracking-[-0.025em] text-slate-950 lg:mx-0">
  {/* MOBILE TITLE */}
<span className="block text-[23px] leading-[1.28] tracking-[-0.02em] min-[390px]:text-[25px] lg:hidden">
    {page.hero.title.includes(" بحساب ") ? (
      <>
        <span className="block whitespace-nowrap">
          {page.hero.title.split(" بحساب ")[0]}
        </span>

        <span className="mt-1 block whitespace-nowrap text-brand-700">
          بحساب {page.hero.title.split(" بحساب ")[1]}
        </span>
      </>
    ) : (
      page.hero.title
    )}
  </span>

  {/* DESKTOP TITLE */}
  <span className="hidden text-[40px] leading-[1.2] lg:block xl:text-[42px]">
    {page.hero.title}
  </span>
</h1>

                    <p className="mx-auto mt-3 max-w-[320px] text-[13px] leading-[1.9] text-slate-600 sm:max-w-[760px] sm:text-[15px] sm:leading-8 lg:mx-0">
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
                        تساعدك هذه المقارنة على اختيار الحساب بناءً على
                        السبريد، العمولة، الحد الأدنى للإيداع، قوة الشركة
                        وجودة التنفيذ، بدل الاعتماد على اسم الشركة فقط.
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mx-auto mt-5 grid w-full max-w-[330px] grid-cols-2 gap-2.5 sm:max-w-[370px] lg:mx-0 lg:flex lg:max-w-none">
                    <a
                      href="#comparison"
                      className="inline-flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-600 px-3 text-[12px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-700 sm:text-sm lg:px-6"
                    >
                      عرض المقارنة
                      <ArrowLeft className="h-4 w-4 shrink-0" />
                    </a>

                    <a
                      href="#methodology"
                      className="inline-flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-brand-100 bg-white px-3 text-[12px] font-black text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-50 sm:text-sm lg:px-6"
                    >
                      طريقة التقييم
                      <BarChart3 className="h-4 w-4 shrink-0" />
                    </a>
                  </div>

                  {/* MOBILE QUICK NOTE */}
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50/60 px-3 py-2.5 lg:hidden">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />

                    <p className="text-[10px] font-semibold leading-5 text-slate-700">
                      ترتيب مستقل حسب شروط الحساب وقوة الشركة، وليس حسب
                      شهرة الاسم فقط.
                    </p>
                  </div>
                </div>

                {/* ================================================== */}
                {/* HERO INFORMATION PANEL */}
                {/* ================================================== */}
                <aside className="rounded-[20px] border border-slate-200 bg-slate-50/75 p-3 sm:p-4 lg:rounded-[24px]">
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
          {page.hero.primaryStatLabel}
        </p>
      </div>

      <p className="mt-2 text-center text-[13px] font-black leading-5 text-slate-950">
        {page.hero.primaryStatValue}
      </p>
    </div>

    {/* DESKTOP */}
    <div className="hidden h-full items-center gap-3 p-3.5 lg:flex">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Target className="h-[18px] w-[18px]" />
      </span>

      <div className="min-w-0">
        <p className="text-[10px] font-bold leading-4 text-slate-500">
          {page.hero.primaryStatLabel}
        </p>

        <p className="mt-1 text-[15px] font-black leading-6 text-slate-950">
          {page.hero.primaryStatValue}
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
          {page.hero.secondaryStatLabel}
        </p>
      </div>

      <p className="mt-2 text-center text-[13px] font-black leading-5 text-slate-950">
        {page.hero.secondaryStatValue}
      </p>
    </div>

    {/* DESKTOP */}
    <div className="hidden h-full items-center gap-3 p-3.5 lg:flex">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Scale className="h-[18px] w-[18px]" />
      </span>

      <div className="min-w-0">
        <p className="text-[10px] font-bold leading-4 text-slate-500">
          {page.hero.secondaryStatLabel}
        </p>

        <p className="mt-1 text-[15px] font-black leading-6 text-slate-950">
          {page.hero.secondaryStatValue}
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
                          مقارنة مستقلة
                        </p>

                        <p className="mt-1 text-xs leading-6 text-slate-600">
                          نقارن الحساب نفسه من حيث التكلفة، سهولة البدء
                          وجودة الشروط، وليس التقييم العام للشركة فقط.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP FACTORS */}
                  <div className="mt-3 hidden rounded-2xl border border-dashed border-brand-200 bg-white p-4 lg:block">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-black text-brand-700">
                        أهم عناصر التقييم
                      </p>

                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-700">
                        {page.methodology.factors.length} عوامل
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {[
                        "السبريد والعمولة",
                        "الحد الأدنى للإيداع",
                        "قوة الشركة",
                        "الحساب الإسلامي",
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

          {/* TOP PICKS */}
<section className="mt-7 sm:mt-9">
  {rankedAccounts.length > 0 ? (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-5 lg:contents">
                {/* SECTION HEADING */}
                <div className="mb-4 flex flex-col gap-2.5 border-b border-slate-100 pb-4 sm:mb-5 sm:pb-5 lg:border-b-0 lg:pb-0 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="hidden items-center gap-2 lg:flex">
  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
    <Star className="h-[18px] w-[18px] fill-brand-600" />
  </span>

  <p className="text-xs font-black text-brand-600">
    اختياراتنا الأعلى تقييمًا
  </p>
</div>

                    <h2 className="mt-2 text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950 sm:text-[24px] lg:text-[30px]">
                      {rankedAccounts.length >= 3
                        ? "أفضل 3 شركات لهذا النوع من الحسابات"
                        : "أفضل الشركات المتوفرة لهذا النوع من الحسابات"}
                    </h2>

                    <p className="mt-1.5 max-w-3xl text-[12px] leading-6 text-slate-600 sm:text-sm sm:leading-7">
                      اخترنا هذه الحسابات بعد مقارنة التكلفة الفعلية،
                      الحد الأدنى للإيداع، سهولة الاستخدام وقوة الشركة.
                    </p>
                  </div>

                  <a
                    href="#comparison"
                    className="hidden shrink-0 items-center gap-2 rounded-xl border border-brand-100 bg-white px-4 py-2.5 text-sm font-black text-brand-700 shadow-sm transition hover:bg-brand-50 lg:inline-flex"
                  >
                    المقارنة الكاملة
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </div>

                {/* ================================================== */}
                {/* DESKTOP CARDS */}
                {/* ================================================== */}
                {/* ================================================== */}
{/* DESKTOP CARDS */}
{/* ================================================== */}
<div className="hidden grid-cols-3 items-stretch gap-4 lg:grid xl:gap-5">
  {rankedAccounts.slice(0, 3).map((item) => {
    const brokerName = getBrokerName(item.broker);
    const accountName = getAccountName(item.account);
    const rankLabel = getRankLabel(item.rank, page.slug);
    const isFirst = item.rank === 1;

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
              ? "bg-gradient-to-l from-brand-700 via-brand-500 to-brand-300"
              : "bg-gradient-to-l from-brand-500 to-brand-200"
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
                  broker={item.broker}
                  size="md"
                />
              </div>

              <div className="min-w-0">
                <h3 className="break-words text-[20px] font-black leading-7 text-slate-950 xl:text-[21px]">
                  {brokerName}
                </h3>

                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-600">
                    {accountName}
                  </span>

                  {rankLabel ? (
                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-black ${
                        isFirst
                          ? "bg-brand-600 text-white"
                          : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      {rankLabel}
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
                الترتيب
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
                  {item.score}
                </strong>
              </div>

              <span className="mt-0.5 text-[10px] font-bold text-slate-500">
                من 100
              </span>

              <span
                className={`mt-1.5 rounded-full px-2.5 py-1 text-[9px] font-black ${
                  isFirst
                    ? "bg-brand-50 text-brand-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {getScoreLabel(item.score)}
              </span>
            </div>

            {/* REASON */}
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-black text-brand-600">
                لماذا اخترناه؟
              </p>

              <p className="mt-1.5 text-[14px] font-semibold leading-7 text-slate-700">
                {getTopPickReason(item, page.slug)}
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
                السبريد
              </p>

              <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                {formatSpread(item.account)}
              </p>
            </div>

            {/* COMMISSION */}
            <div className="relative overflow-hidden rounded-[15px] border border-slate-200 bg-white px-3 py-3 text-center shadow-sm">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-300" />

              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <CircleDollarSign className="h-4 w-4" />
              </div>

              <p className="mt-2 text-[11px] font-bold text-slate-500">
                العمولة
              </p>

              <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                {formatCommission(item.account)}
              </p>
            </div>

            {/* MINIMUM DEPOSIT */}
            <div className="relative overflow-hidden rounded-[15px] border border-slate-200 bg-white px-3 py-3 text-center shadow-sm">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-300" />

              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <WalletCards className="h-4 w-4" />
              </div>

              <p className="mt-2 text-[11px] font-bold text-slate-500">
                أقل إيداع
              </p>

              <p className="mt-1 text-[13px] font-black leading-6 text-slate-950">
                {formatMoney(item.minDepositValue)}
              </p>
            </div>
          </div>

          {/* ACCOUNT DETAIL STRIP */}
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/75 px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                <Layers3 className="h-4 w-4" />
              </span>

              <div>
                <p className="text-[10px] font-bold text-slate-500">
                  نوع الحساب
                </p>

                <p className="mt-0.5 text-[12px] font-black text-slate-800">
                  {accountName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-brand-600" />

              <span className="text-[10px] font-black text-slate-700">
                حساب موثوق
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          {item.broker.slug ? (
            <div className="mt-auto grid grid-cols-2 gap-2.5 pt-4">
              <Link
                href={`/brokers/${item.broker.slug}`}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-brand-100 bg-white px-2 text-[13px] font-black text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
              >
                مراجعة الشركة
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <Link
                href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-featured`}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-2 text-[13px] font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.2)] transition hover:bg-brand-700"
              >
                فتح الحساب
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
              ? "أعلى نتيجة إجمالية لهذا النوع من الحسابات"
              : "خيار قوي ضمن أفضل الحسابات التي تمت مقارنتها"}
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
                  {rankedAccounts.slice(0, 3).map((item) => {
                    const brokerName = getBrokerName(item.broker);
                    const accountName = getAccountName(item.account);
                    const rankLabel = getRankLabel(
                      item.rank,
                      page.slug,
                    );

                    const isFirst = item.rank === 1;

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
      {item.rank}
    </span>

    {/* LOGO */}
    <BrokerLogo
      broker={item.broker}
      size="sm"
    />

    {/* NAME + ACCOUNT */}
    <div className="min-w-0">
      <h3 className="break-words text-[15px] font-black leading-6 text-slate-950">
        {brokerName}
      </h3>

      <p className="mt-0.5 break-words text-[10px] font-bold leading-4 text-slate-500">
        {accountName}
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
        {rankLabel}
      </span>
    ) : null}

    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-black text-slate-800">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      {item.score}/100
    </span>
  </div>
</div>

                          {/* MINIMUM DEPOSIT */}
                          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                            <p className="text-[10px] font-bold text-slate-500">
                              الحد الأدنى للإيداع
                            </p>

                            <strong className="text-[12px] font-black text-slate-950">
                              {formatMoney(item.minDepositValue)}
                            </strong>
                          </div>

                          {/* FIRST CARD EXTRA INFORMATION */}
                          {isFirst ? (
                            <>
                              <p className="mt-3 text-[13px] leading-6 text-slate-600">
                                {getTopPickReason(item, page.slug)}
                              </p>

                              <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                                  <p className="text-[9px] font-bold text-slate-500">
                                    السبريد
                                  </p>

                                  <p className="mt-0.5 text-[11px] font-black leading-5 text-slate-950">
                                    {formatSpread(item.account)}
                                  </p>
                                </div>

                                <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                                  <p className="text-[9px] font-bold text-slate-500">
                                    العمولة
                                  </p>

                                  <p className="mt-0.5 text-[11px] font-black leading-5 text-slate-950">
                                    {formatCommission(item.account)}
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : null}

                          {/* ACTIONS */}
                          {item.broker.slug ? (
                            <div
                              className={`grid grid-cols-2 gap-2 ${
                                isFirst ? "mt-3" : "mt-3"
                              }`}
                            >
                              <Link
                                href={`/brokers/${item.broker.slug}`}
                                className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-brand-100 bg-white px-2 text-[10px] font-black text-brand-700"
                              >
                                مراجعة الشركة
                                <ArrowLeft className="h-3.5 w-3.5" />
                              </Link>

                              <Link
                                href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-mobile-featured`}
                                target="_blank"
                                rel="nofollow sponsored noopener noreferrer"
                                className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-brand-600 px-2 text-[10px] font-black text-white"
                              >
                                فتح الحساب
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
                    مشاهدة المقارنة الكاملة
                    <ArrowLeft className="h-4 w-4" />
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
                        قبل اتخاذ القرار
                      </p>

                      <h2 className="mt-0.5 text-[27px] font-black leading-9 text-slate-950">
                        {page.editorSummary.title}
                      </h2>
                    </div>
                  </div>

                  {/* PARAGRAPHS */}
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    {page.editorSummary.paragraphs.map(
                      (paragraph, index) => (
                        <div
                          key={paragraph}
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
                            {paragraph}
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
                        أهم ما يجب معرفته
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {page.editorSummary.highlights.map(
                        (highlight, index) => (
                          <div
                            key={highlight}
                            className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                              <CheckCircle2 className="h-[18px] w-[18px]" />
                            </span>

                            <div>
                              <p className="text-[9px] font-black text-brand-600">
                                النقطة {index + 1}
                              </p>

                              <p className="mt-0.5 text-[11px] font-semibold leading-6 text-slate-700">
                                {highlight}
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
                      {page.editorSummary.title}
                    </h2>
                  </div>
                </div>

                {/* FIRST PARAGRAPH ALWAYS VISIBLE */}
                {page.editorSummary.paragraphs[0] ? (
                  <p className="mt-4 text-[14px] font-semibold leading-7 text-slate-700">
                    {page.editorSummary.paragraphs[0]}
                  </p>
                ) : null}

                {/* FIRST HIGHLIGHT ALWAYS VISIBLE */}
                {page.editorSummary.highlights[0] ? (
                  <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-brand-50/55 p-3.5">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-600" />

                    <p className="text-[12px] font-semibold leading-6 text-slate-700">
                      {page.editorSummary.highlights[0]}
                    </p>
                  </div>
                ) : null}

                {/* REMAINING CONTENT */}
                {(page.editorSummary.paragraphs.length > 1 ||
                  page.editorSummary.highlights.length > 1) ? (
                  <details className="group mt-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-brand-100 bg-white px-3.5 py-3">
                      <span className="text-xs font-black text-brand-700">
                        <span className="group-open:hidden">
                          اقرأ المزيد
                        </span>

                        <span className="hidden group-open:inline">
                          عرض أقل
                        </span>
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-lg text-brand-600 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                      {page.editorSummary.paragraphs
                        .slice(1)
                        .map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-[13px] leading-7 text-slate-600"
                          >
                            {paragraph}
                          </p>
                        ))}

                      {page.editorSummary.highlights
                        .slice(1)
                        .map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-600" />

                            <p className="text-[11px] font-semibold leading-6 text-slate-700">
                              {highlight}
                            </p>
                          </div>
                        ))}
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
            فهم نوع الحساب
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
      <div className="mt-5 overflow-hidden rounded-[22px] border border-brand-100 bg-gradient-to-l from-brand-50/45 via-white to-white">
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
          <div className="grid grid-cols-2 divide-x divide-x-reverse divide-slate-100">
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

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
          <WalletCards className="h-5 w-5" />
        </div>

        <h3 className="text-[18px] font-black leading-7 text-slate-950">
          حساب بأموال حقيقية
        </h3>
      </div>

      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-700">
        01
      </span>
    </div>

    <p className="mt-5 text-[14px] leading-8 text-slate-600">
      الأرباح والخسائر ناتجة عن تداول فعلي، وليست أموالًا افتراضية مثل الحساب التجريبي.
    </p>

  </article>

  {/* CARD 02 */}
  <article className="group rounded-[20px] border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md">

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
          <Scale className="h-5 w-5" />
        </div>

        <h3 className="text-[18px] font-black leading-7 text-slate-950">
          إدارة مخاطرة مرنة
        </h3>
      </div>

      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-700">
        02
      </span>
    </div>

    <p className="mt-5 text-[14px] leading-8 text-slate-600">
      تعتمد مرونة المخاطرة على حجم العقد، الحد الأدنى للصفقة، والرافعة المالية المناسبة وشروط الحساب الفعلية.
    </p>

  </article>

  {/* CARD 03 */}
  <article className="group rounded-[20px] border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md">

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
          <Target className="h-5 w-5" />
        </div>

        <h3 className="text-[18px] font-black leading-7 text-slate-950">
          اختيار حسب أسلوبك
        </h3>
      </div>

      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-700">
        03
      </span>
    </div>

    <p className="mt-5 text-[14px] leading-8 text-slate-600">
      الحساب الأنسب يختلف حسب خبرتك، رأس المال، عدد الصفقات، واستراتيجية التداول التي تعتمد عليها.
    </p>

  </article>

</div>

      {/* COST EXAMPLE */}
      <aside className="mt-4 overflow-hidden rounded-[20px] border border-amber-200 bg-gradient-to-l from-amber-50/90 via-amber-50/50 to-white">
        <div className="grid min-h-[104px] grid-cols-[280px_minmax(0,1fr)_360px] items-center">
          {/* TITLE */}
          <div className="flex h-full items-center gap-3 border-l border-amber-200/70 px-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-amber-700 shadow-sm">
              <Info className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-black text-amber-700">
                مثال عملي
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
<div className="relative">
  <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
    <Layers3 className="h-4 w-4" />
  </div>

  <div className="pl-0">
   

    <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950">
  {page.definition.title.includes(" في الفوركس؟") ? (
    <>
      <span>
        {page.definition.title.replace(" في الفوركس؟", "")}
      </span>

      <br />

      <span className="whitespace-nowrap">
        في الفوركس؟
      </span>
    </>
  ) : (
    page.definition.title
  )}
</h2>
  </div>
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
                اقرأ الشرح كاملًا
              </span>

              <span className="hidden group-open:inline">
                عرض أقل
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
              حساب بأموال حقيقية
            </h3>

            <p className="mt-0.5 text-[11px] leading-5 text-slate-600">
              أرباح وخسائر فعلية وليست محاكاة تجريبية.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
            <Scale className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-[14px] font-black leading-6 text-slate-950">
              إدارة مخاطرة مرنة
            </h3>

            <p className="mt-0.5 text-[11px] leading-5 text-slate-600">
              تعتمد على حجم العقد وشروط الحساب الفعلية.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
            <Target className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-[14px] font-black leading-6 text-slate-950">
              اختيار حسب أسلوبك
            </h3>

            <p className="mt-0.5 text-[11px] leading-5 text-slate-600">
              الحساب الأفضل يتغير حسب خبرتك وطريقة تداولك.
            </p>
          </div>
        </div>
      </div>

      {/* COST EXAMPLE */}
      <details className="group mt-3 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/65">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-amber-700 shadow-sm">
              <Info className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-black text-amber-700">
                مثال عملي
              </p>

              <h3 className="mt-0.5 text-[13px] font-black leading-5 text-amber-950">
                {page.costExample.title}
              </h3>
            </div>
          </div>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-lg text-amber-700 shadow-sm transition group-open:rotate-45">
            +
          </span>
        </summary>

        <div className="border-t border-amber-200 px-4 pb-4 pt-3">
          <p className="text-[13px] leading-7 text-amber-900/80">
            {page.costExample.description}
          </p>

          <div className="mt-3 rounded-xl border border-amber-200 bg-white/80 p-3">
            <p className="text-[11px] font-bold leading-6 text-amber-900">
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
<section className="mt-8 sm:mt-10 lg:mt-12">
  {/* ====================================================== */}
{/* DESKTOP HOW IT WORKS */}
{/* ====================================================== */}
<div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 shadow-[0_14px_38px_rgba(15,23,42,0.055)] lg:block xl:p-8">
  {/* SECTION HEADING */}
  <div className="mb-6 flex items-end justify-between gap-8 border-b border-slate-100 pb-5">
    <div className="max-w-4xl">
      <p className="text-xs font-black text-brand-600">
        شرح مبسط
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
      {page.howItWorks.steps.length} خطوات أساسية
    </span>
  </div>

  {/* أبقِ بطاقات الخطوات الموجودة عندك هنا كما هي */}

    {/* STEPS */}
    <div className="grid grid-cols-4 items-stretch gap-4">
      {page.howItWorks.steps.map((step, index) => (
        <article
          key={step.title}
          className="group flex min-h-[166px] flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_14px_30px_rgba(30,91,184,0.09)]"
        >
          {/* ICON + TITLE + NUMBER */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600">
                <Zap className="h-5 w-5" />
              </span>

              <h3 className="min-w-0 text-[15px] font-black leading-6 text-slate-950">
                {step.title}
              </h3>
            </div>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
              {index + 1}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {step.description}
          </p>
        </article>
      ))}
    </div>
  </div>

  {/* ====================================================== */}
  {/* MOBILE HOW IT WORKS */}
  {/* ====================================================== */}
  <div className="lg:hidden">
    <div className="px-1">
      <p className="text-[11px] font-black text-brand-600">
        شرح مبسط
      </p>

      <h2 className="mt-1 text-[24px] font-black leading-[1.35] tracking-[-0.01em] text-slate-950">
        {page.howItWorks.title}
      </h2>

      <p className="mt-2 text-[13px] leading-7 text-slate-600">
        {page.howItWorks.description}
      </p>
    </div>

    <div className="mt-5 space-y-2.5">
      {page.howItWorks.steps.map((step, index) => (
        <article
          key={step.title}
          className="flex items-start gap-3 rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_7px_20px_rgba(15,23,42,0.045)]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-sm font-black text-brand-700">
            {index + 1}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-black leading-6 text-slate-950">
                {step.title}
              </h3>

              <Zap className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            </div>

            <p className="mt-1 text-[12px] leading-6 text-slate-600">
              {step.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

{/* BROKER ANALYSIS */}
{analyzedAccounts.length ? (
  <section className="mt-10 sm:mt-12">
    {/* ====================================================== */}
{/* DESKTOP VERSION */}
{/* ====================================================== */}
<div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] lg:block">
  {/* ====================================================== */}
  {/* SECTION HEADING */}
  {/* ====================================================== */}
  <div className="flex items-end justify-between gap-8 border-b border-slate-100 bg-gradient-to-l from-brand-50/55 via-white to-white px-7 py-6 xl:px-8">
    <div className="max-w-4xl">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm">
          <BarChart3 className="h-5 w-5" />
        </span>

        <div>
          <p className="text-xs font-black text-brand-600">
            قراءة أعمق
          </p>

          <h2 className="mt-1 text-[30px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950">
            {page.brokerAnalysis.title}
          </h2>
        </div>
      </div>

      <p className="mt-3 max-w-4xl text-[15px] leading-8 text-slate-600">
        {page.brokerAnalysis.description}
      </p>
    </div>

    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-xs font-black text-brand-700 shadow-sm">
      <Layers3 className="h-4 w-4" />
      تحليل {analyzedAccounts.length} حسابات
    </span>
  </div>

  {/* ====================================================== */}
  {/* ANALYSIS CARDS */}
  {/* ====================================================== */}
  <div className="space-y-5 bg-slate-50/45 p-6 xl:p-7">
    {analyzedAccounts.map((item) => {
      const brokerName = getBrokerName(item.broker);
      const accountName = getAccountName(item.account);
      const rankLabel = getRankLabel(item.rank, page.slug);

      const regulation =
        item.broker.regulation_short ||
        item.broker.regulation ||
        "راجع صفحة الشركة لمعرفة تفاصيل التراخيص";

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
          ? `/brokers/${item.broker.slug}/accounts/${accountSlug}`
          : null;

      const isFirst = item.rank === 1;

      return (
        <article
          key={`${item.broker.id}-${item.account.id}-analysis-desktop`}
          className={`relative overflow-hidden rounded-[24px] border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(30,91,184,0.09)] ${
            isFirst
              ? "border-brand-300 shadow-[0_12px_30px_rgba(30,91,184,0.08)]"
              : "border-slate-200 shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
          }`}
        >
          {/* TOP ACCENT */}
          <div
            className={`absolute inset-x-0 top-0 h-[4px] ${
              isFirst
                ? "bg-gradient-to-l from-brand-700 via-brand-500 to-brand-300"
                : "bg-gradient-to-l from-brand-500 to-brand-200"
            }`}
          />

          <div className="grid grid-cols-[minmax(0,1fr)_290px]">
            {/* ================================================== */}
            {/* MAIN CONTENT */}
            {/* ================================================== */}
            <div className="p-6 pt-7 xl:p-7 xl:pt-8">
              {/* BROKER HEADER */}
              <div className="flex items-start justify-between gap-5">
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={
                      isFirst
                        ? "rounded-[20px] ring-2 ring-brand-100"
                        : "rounded-[20px]"
                    }
                  >
                    <BrokerLogo
                      broker={item.broker}
                      size="lg"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black text-white ${
                          isFirst
                            ? "bg-brand-600"
                            : "bg-slate-950"
                        }`}
                      >
                        المرتبة {item.rank}
                      </span>

                      {rankLabel ? (
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700">
                          {rankLabel}
                        </span>
                      ) : null}

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
                        {getScoreLabel(item.score)}
                      </span>
                    </div>

                    <p className="mt-3 text-[14px] font-black text-slate-700">
                      {brokerName}
                    </p>

                    {accountPageHref ? (
                      <Link
                        href={accountPageHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/account mt-1 inline-flex items-center gap-2"
                      >
                        <h3 className="text-[24px] font-black leading-8 text-slate-950 transition group-hover/account:text-brand-700">
                          {accountName}
                        </h3>

                        <ExternalLink className="h-4 w-4 shrink-0 text-brand-500 transition group-hover/account:text-brand-700" />
                      </Link>
                    ) : (
                      <h3 className="mt-1 text-[24px] font-black leading-8 text-slate-950">
                        {accountName}
                      </h3>
                    )}

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      حساب {accountName} لدى {brokerName}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-center">
                  <p className="text-[10px] font-black text-brand-600">
                    نتيجة الحساب
                  </p>

                  <div className="mt-1 flex items-end justify-center gap-1">
                    <strong className="text-[25px] font-black leading-none text-slate-950">
                      {item.score}
                    </strong>

                    <span className="pb-0.5 text-[10px] font-bold text-slate-500">
                      /100
                    </span>
                  </div>
                </div>
              </div>

              {/* ANALYSIS TEXT */}
              <div className="mt-5 rounded-[18px] border border-slate-200 bg-slate-50/55 px-5 py-4">
                <p className="text-[14px] leading-8 text-slate-600">
                  حصل حساب{" "}
                  <strong className="font-black text-slate-950">
                    {accountName}
                  </strong>{" "}
                  من {brokerName} على نتيجة{" "}
                  <strong className="font-black text-slate-950">
                    {item.score} من 100
                  </strong>
                  . يبلغ السبريد المسجل لدينا{" "}
                  <strong className="font-black text-slate-950">
                    {formatSpread(item.account)}
                  </strong>
                  ، وتبلغ العمولة{" "}
                  <strong className="font-black text-slate-950">
                    {commissionDisplay}
                  </strong>
                  ، بينما يبدأ الحد الأدنى للإيداع من{" "}
                  <strong className="font-black text-slate-950">
                    {formatMoney(item.minDepositValue)}
                  </strong>
                  .
                </p>
              </div>

              {/* STRENGTH + CHECK */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {/* STRENGTH */}
                <div className="relative overflow-hidden rounded-[18px] border border-brand-100 bg-brand-50/45 p-4">
                  <div className="absolute inset-y-0 right-0 w-[3px] bg-brand-500" />

                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                      <CheckCircle2 className="h-[18px] w-[18px]" />
                    </span>

                    <div>
                      <h4 className="text-[14px] font-black text-slate-950">
                        أبرز نقطة قوة
                      </h4>

                      <p className="mt-1.5 text-[13px] leading-7 text-slate-600">
                        يجمع الحساب بين نتيجة قوية وشروط واضحة، ويمكن
                        مقارنته مباشرة مع بقية الحسابات في الصفحة.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CHECK */}
                <div className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50/65 p-4">
                  <div className="absolute inset-y-0 right-0 w-[3px] bg-slate-300" />

                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                      <Info className="h-[18px] w-[18px]" />
                    </span>

                    <div>
                      <h4 className="text-[14px] font-black text-slate-950">
                        ما يجب التحقق منه
                      </h4>

                      <p className="mt-1.5 text-[13px] leading-7 text-slate-600">
                        راجع شروط الحساب والرسوم والكيان القانوني المتاح
                        في بلدك قبل فتح الحساب والإيداع.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* REGULATION */}
              <div className="mt-4 flex items-center gap-3 rounded-[18px] border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <ShieldCheck className="h-[18px] w-[18px]" />
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-black text-slate-950">
                    التراخيص والرقابة
                  </p>

                  <p className="mt-1 text-xs leading-6 text-slate-600">
                    {regulation}
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================== */}
            {/* SCORE PANEL */}
            {/* ================================================== */}
            <aside className="flex flex-col border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 pt-7">
              <div className="rounded-[18px] border border-brand-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black text-brand-600">
                      التقييم النهائي
                    </p>

                    <div className="mt-1 flex items-end gap-1">
                      <span className="text-[36px] font-black leading-none text-slate-950">
                        {item.score}
                      </span>

                      <span className="pb-1 text-xs font-bold text-slate-500">
                        /100
                      </span>
                    </div>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <BarChart3 className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-brand-700 to-brand-400"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-[10px] font-bold text-slate-500">
                  {getScoreLabel(item.score)}
                </p>
              </div>

              {/* VALUES */}
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3">
                  <span className="text-xs font-bold text-slate-500">
                    السبريد
                  </span>

                  <strong className="max-w-[58%] text-left text-xs font-black leading-5 text-slate-900">
                    {formatSpread(item.account)}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3">
                  <span className="text-xs font-bold text-slate-500">
                    العمولة
                  </span>

                  <strong className="max-w-[58%] text-left text-xs font-black leading-5 text-slate-900">
                    {commissionDisplay}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3">
                  <span className="text-xs font-bold text-slate-500">
                    الإيداع
                  </span>

                  <strong className="max-w-[58%] text-left text-xs font-black leading-5 text-slate-900">
                    {formatMoney(item.minDepositValue)}
                  </strong>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-auto space-y-2.5 pt-5">
                {accountPageHref ? (
                  <Link
                    href={accountPageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3 text-xs font-black text-brand-700 transition hover:bg-brand-100"
                  >
                    تفاصيل الحساب
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                ) : null}

                {item.broker.slug ? (
                  <>
                    <Link
                      href={`/brokers/${item.broker.slug}`}
                      className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
                    >
                      مراجعة {brokerName}
                    </Link>

                    <Link
                      href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-analysis`}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 text-xs font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.18)] transition hover:bg-brand-700"
                    >
                      زيارة الشركة
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </>
                ) : null}
              </div>
            </aside>
          </div>
        </article>
      );
    })}
  </div>
</div>

    {/* ====================================================== */}
    {/* MOBILE VERSION */}
    {/* ====================================================== */}
    <div className="lg:hidden">
      {/* MOBILE HEADING */}
      <div className="px-1">
        <p className="text-[11px] font-black text-brand-600">
          قراءة أعمق
        </p>

        <h2 className="mt-1 text-[24px] font-black leading-[1.35] tracking-[-0.01em] text-slate-950">
          {page.brokerAnalysis.title}
        </h2>

        <p className="mt-2 text-[13px] leading-7 text-slate-600">
          نوضح سبب ترتيب أبرز الحسابات وأهم الشروط التي يجب مراجعتها.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {analyzedAccounts.map((item) => {
          const brokerName = getBrokerName(item.broker);
          const accountName = getAccountName(item.account);
          const rankLabel = getRankLabel(item.rank, page.slug);
          const isFirst = item.rank === 1;

          const regulation =
            item.broker.regulation_short ||
            item.broker.regulation ||
            "راجع صفحة الشركة لمعرفة تفاصيل التراخيص";

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
              ? `/brokers/${item.broker.slug}/accounts/${accountSlug}`
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
                      ? "bg-gradient-to-l from-brand-700 via-brand-500 to-cyan-400"
                      : "bg-brand-400"
                  }`}
                />

                <div className="p-4">
                  {/* COMPANY HEADER */}
                  <div className="grid grid-cols-[32px_46px_minmax(0,1fr)_28px] items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white ${
                        isFirst ? "bg-brand-600" : "bg-slate-950"
                      }`}
                    >
                      {item.rank}
                    </span>

                    <BrokerLogo broker={item.broker} />

                    <div className="min-w-0">
                      <p className="text-[14px] font-black leading-5 text-slate-950">
                        {brokerName}
                      </p>

                      <p className="mt-0.5 break-words text-[11px] font-bold leading-4 text-brand-700">
                        {accountName}
                      </p>
                    </div>

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition group-open:rotate-45 group-open:bg-brand-50 group-open:text-brand-600">
                      +
                    </span>
                  </div>

                  {/* BADGES */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                      {rankLabel ? (
                        <span className="rounded-full bg-brand-50 px-2 py-1 text-[9px] font-black text-brand-700">
                          {rankLabel}
                        </span>
                      ) : null}

                      <span className="rounded-full bg-amber-50 px-2 py-1 text-[9px] font-black text-slate-800">
                        {item.score}/100
                      </span>
                    </div>

                    <span className="shrink-0 text-[10px] font-bold text-slate-500">
                      من {formatMoney(item.minDepositValue)}
                    </span>
                  </div>
                </div>
              </summary>

              {/* EXPANDED CONTENT */}
              <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                {/* ACCOUNT LINK */}
                {accountPageHref ? (
                  <Link
                    href={accountPageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-brand-100 bg-brand-50/70 px-3 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-brand-600">
                        صفحة الحساب
                      </p>

                      <p className="mt-0.5 break-words text-[13px] font-black leading-5 text-brand-800">
                        {brokerName} — {accountName}
                      </p>
                    </div>

                    <ExternalLink className="h-4 w-4 shrink-0 text-brand-600" />
                  </Link>
                ) : null}

                {/* SHORT ANALYSIS */}
                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                  حصل الحساب على{" "}
                  <strong className="text-slate-950">
                    {item.score}/100
                  </strong>
                  ، بسبريد{" "}
                  <strong className="text-slate-950">
                    {formatSpread(item.account)}
                  </strong>
                  ، وعمولة{" "}
                  <strong className="text-slate-950">
                    {commissionDisplay}
                  </strong>
                  .
                </p>

                {/* QUICK DATA */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-slate-50 px-2 py-2.5 text-center">
                    <p className="text-[9px] font-bold text-slate-500">
                      النتيجة
                    </p>

                    <p className="mt-1 text-[12px] font-black text-slate-950">
                      {item.score}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-2 py-2.5 text-center">
                    <p className="text-[9px] font-bold text-slate-500">
                      العمولة
                    </p>

                    <p className="mt-1 text-[11px] font-black text-slate-950">
                      {commissionDisplay}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-2 py-2.5 text-center">
                    <p className="text-[9px] font-bold text-slate-500">
                      الإيداع
                    </p>

                    <p className="mt-1 text-[11px] font-black text-slate-950">
                      {formatMoney(item.minDepositValue)}
                    </p>
                  </div>
                </div>

                {/* STRENGTH */}
                <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2.5">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />

                  <p className="text-[11px] font-semibold leading-5 text-emerald-900">
                    خيار قوي وفق نتيجة الحساب وشروط التداول المتوفرة لدينا.
                  </p>
                </div>

                {/* REGULATION */}
                <div className="mt-2.5 flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-brand-600" />

                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-slate-900">
                      التراخيص
                    </p>

                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-5 text-slate-600">
                      {regulation}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                {item.broker.slug ? (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={`/brokers/${item.broker.slug}`}
                      className="flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-2 text-[11px] font-black text-slate-700"
                    >
                      مراجعة الشركة
                    </Link>

                    <Link
                      href={`/go/${item.broker.slug}?type=real&source=account-${page.slug}-analysis-mobile`}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="flex h-10 items-center justify-center gap-1 rounded-xl bg-brand-600 px-2 text-[11px] font-black text-white"
                    >
                      زيارة الشركة
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
{/* SELECTION FACTORS */}
{/* ====================================================== */}
<section className="mt-8 sm:mt-10">
  {/* ====================================================== */}
  {/* DESKTOP VERSION */}
  {/* ====================================================== */}
  <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] lg:block">
    {/* HEADER */}
    <div className="flex items-center justify-between gap-8 border-b border-slate-100 bg-gradient-to-l from-brand-50/45 via-white to-white px-7 py-5 xl:px-8">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-black text-brand-600">
            معايير الاختيار
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
      {page.selectionFactors.items.map((item, index) => {
        const icons = [
          ShieldCheck,
          TrendingDown,
          CircleDollarSign,
          Zap,
          WalletCards,
          BadgeCheck,
        ];

        const Icon = icons[index % icons.length];

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
      })}
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
          أهم العوامل التي نعتمد عليها عند مقارنة الحسابات وترتيبها.
        </p>
      </div>
    </div>
  </div>

  {/* FACTORS */}
  <div className="space-y-2.5 p-3.5">
    {page.selectionFactors.items.map((item, index) => {
      const icons = [
        ShieldCheck,
        TrendingDown,
        CircleDollarSign,
        Zap,
        WalletCards,
        BadgeCheck,
      ];

      const Icon = icons[index % icons.length];

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
    })}
  </div>

  {/* FOOT NOTE */}
  <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3">
    <p className="text-[10px] font-semibold leading-5 text-slate-600">
      لا نعتمد على عامل واحد فقط؛ الترتيب النهائي يجمع بين الأمان، التكلفة،
      شروط الحساب وجودة التنفيذ.
    </p>
  </div>
</article>
</section>

{/* ====================================================== */}
{/* ADVANTAGES / DISADVANTAGES */}
{/* ====================================================== */}
<section className="mt-8 sm:mt-10">
  {/* ====================================================== */}
  {/* DESKTOP VERSION */}
  {/* ====================================================== */}
  <div className="hidden grid-cols-2 gap-5 lg:grid">
    {/* ADVANTAGES */}
    <article className="overflow-hidden rounded-[26px] border border-emerald-100 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3 border-b border-emerald-100 bg-emerald-50/40 px-6 py-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
          <CheckCircle2 className="h-5 w-5" />
        </span>

        <div>
          <p className="text-[10px] font-black text-emerald-700">
            نقاط القوة
          </p>

          <h2 className="mt-0.5 text-[24px] font-black leading-8 text-slate-950">
            {page.advantages.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5">
        {page.advantages.items.map((item) => (
          <div
            key={item.title}
            className="rounded-[17px] border border-emerald-100 bg-emerald-50/30 p-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                <Check className="h-4 w-4" />
              </span>

              <h3 className="text-[14px] font-black leading-6 text-slate-950">
                {item.title}
              </h3>
            </div>

            <p className="mt-2 text-[12px] leading-6 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </article>

    {/* DISADVANTAGES */}
    <article className="overflow-hidden rounded-[26px] border border-rose-100 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3 border-b border-rose-100 bg-rose-50/35 px-6 py-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">
          <XCircle className="h-5 w-5" />
        </span>

        <div>
          <p className="text-[10px] font-black text-rose-700">
            نقاط الضعف
          </p>

          <h2 className="mt-0.5 text-[24px] font-black leading-8 text-slate-950">
            {page.disadvantages.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5">
        {page.disadvantages.items.map((item) => (
          <div
            key={item.title}
            className="rounded-[17px] border border-rose-100 bg-rose-50/25 p-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-rose-600 shadow-sm">
                <X className="h-4 w-4" />
              </span>

              <h3 className="text-[14px] font-black leading-6 text-slate-950">
                {item.title}
              </h3>
            </div>

            <p className="mt-2 text-[12px] leading-6 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  </div>

  {/* ====================================================== */}
  {/* MOBILE VERSION */}
  {/* ====================================================== */}
  <div className="grid gap-4 lg:hidden">
    {/* MOBILE ADVANTAGES */}
    <article className="overflow-hidden rounded-[22px] border border-emerald-100 bg-white shadow-[0_9px_25px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3 border-b border-emerald-100 bg-emerald-50/35 px-4 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
          <CheckCircle2 className="h-5 w-5" />
        </span>

        <h2 className="text-[20px] font-black leading-7 text-slate-950">
          {page.advantages.title}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3.5">
        {page.advantages.items.map((item) => (
          <div
            key={item.title}
            className="rounded-[15px] border border-emerald-100 bg-emerald-50/25 p-3"
          >
            <Check className="h-4 w-4 text-emerald-600" />

            <h3 className="mt-2 text-[13px] font-black leading-5 text-slate-950">
              {item.title}
            </h3>

            <p className="mt-1 text-[10px] leading-5 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </article>

    {/* MOBILE DISADVANTAGES */}
    <article className="overflow-hidden rounded-[22px] border border-rose-100 bg-white shadow-[0_9px_25px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3 border-b border-rose-100 bg-rose-50/30 px-4 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-rose-600 shadow-sm">
          <XCircle className="h-5 w-5" />
        </span>

        <h2 className="text-[20px] font-black leading-7 text-slate-950">
          {page.disadvantages.title}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3.5">
        {page.disadvantages.items.map((item) => (
          <div
            key={item.title}
            className="rounded-[15px] border border-rose-100 bg-rose-50/20 p-3"
          >
            <X className="h-4 w-4 text-rose-600" />

            <h3 className="mt-2 text-[13px] font-black leading-5 text-slate-950">
              {item.title}
            </h3>

            <p className="mt-1 text-[10px] leading-5 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  </div>
</section>

{/* ====================================================== */}
{/* WHO IS IT FOR */}
{/* ====================================================== */}
<section className="mt-8 sm:mt-10">
  {/* ====================================================== */}
  {/* DESKTOP VERSION */}
  {/* ====================================================== */}
  <div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] lg:block">
    <div className="grid grid-cols-2">
      {/* SUITABLE */}
      <article className="border-l border-slate-200">
        <div className="border-b border-brand-100 bg-brand-50/45 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm">
              <UserCheck className="h-5 w-5" />
            </span>

            <div>
              <p className="text-[10px] font-black text-brand-600">
                مناسب غالبًا
              </p>

              <h2 className="mt-0.5 text-[23px] font-black leading-8 text-slate-950">
                {page.suitableFor.title}
              </h2>
            </div>
          </div>

          <p className="mt-2.5 text-[13px] leading-6 text-slate-600">
            {page.suitableFor.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 p-5">
          {page.suitableFor.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 rounded-[15px] bg-brand-50/35 px-3.5 py-3"
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
      <article>
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm">
              <Users className="h-5 w-5" />
            </span>

            <div>
              <p className="text-[10px] font-black text-slate-500">
                قد لا يكون الأنسب
              </p>

              <h2 className="mt-0.5 text-[23px] font-black leading-8 text-slate-950">
                {page.notSuitableFor.title}
              </h2>
            </div>
          </div>

          <p className="mt-2.5 text-[13px] leading-6 text-slate-600">
            {page.notSuitableFor.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 p-5">
          {page.notSuitableFor.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 rounded-[15px] bg-slate-50 px-3.5 py-3"
            >
              <Minus className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

              <p className="text-[12px] font-semibold leading-6 text-slate-700">
                {item}
              </p>
            </div>
          ))}
        </div>
      </article>
    </div>
  </div>

  {/* ====================================================== */}
{/* MOBILE VERSION */}
{/* ====================================================== */}
<article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_9px_25px_rgba(15,23,42,0.05)] lg:hidden">
  {/* SUITABLE HEADER */}
  <div className="border-b border-brand-100 bg-gradient-to-l from-brand-50/70 to-white px-4 py-4">
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
        <UserCheck className="h-5 w-5" />
      </span>

      <div className="min-w-0">
        <h2 className="text-[20px] font-black leading-[1.35] text-slate-950">
          {page.suitableFor.title}
        </h2>

        <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
          {page.suitableFor.description}
        </p>
      </div>
    </div>
  </div>

  {/* TOP SUITABLE ITEMS */}
  <div className="space-y-2 p-3.5">
    {page.suitableFor.items.slice(0, 3).map((item) => (
      <div
        key={item}
        className="flex items-start gap-3 rounded-[15px] border border-brand-100 bg-brand-50/35 px-3.5 py-3"
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
          <CheckCircle2 className="h-4 w-4" />
        </span>

        <p className="text-[12px] font-semibold leading-6 text-slate-700">
          {item}
        </p>
      </div>
    ))}
  </div>

  {/* MORE DETAILS */}
  <details className="group border-t border-slate-200">
    <summary className="flex cursor-pointer list-none items-center gap-3 bg-slate-50/75 px-4 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
        <Users className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black text-slate-500">
          تفاصيل إضافية
        </p>

        <h2 className="text-[18px] font-black leading-6 text-slate-950">
          متى يناسبك ومتى لا يكون مناسبًا؟
        </h2>
      </div>

      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-lg text-brand-600 shadow-sm transition group-open:rotate-45">
        +
      </span>
    </summary>

    <div className="border-t border-slate-200 bg-white p-3.5">
      {/* REMAINING SUITABLE ITEMS */}
      {page.suitableFor.items.length > 3 ? (
        <div>
          <p className="mb-2.5 text-[11px] font-black text-brand-600">
            يناسبك أيضًا عندما:
          </p>

          <div className="space-y-2">
            {page.suitableFor.items.slice(3).map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 rounded-[14px] bg-brand-50/35 px-3 py-2.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />

                <p className="text-[11px] font-semibold leading-5 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* NOT SUITABLE */}
      <div
        className={
          page.suitableFor.items.length > 3
            ? "mt-4 border-t border-slate-100 pt-4"
            : ""
        }
      >
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Minus className="h-4 w-4" />
          </span>

          <div>
            <h3 className="text-[16px] font-black leading-6 text-slate-950">
              {page.notSuitableFor.title}
            </h3>

            <p className="mt-1 text-[11px] leading-5 text-slate-600">
              {page.notSuitableFor.description}
            </p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {page.notSuitableFor.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 rounded-[14px] bg-slate-50 px-3 py-2.5"
            >
              <Minus className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

              <p className="text-[11px] font-semibold leading-5 text-slate-700">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </details>
</article>
</section>

     {/* ACCOUNT TYPES COMPARISON */}
<section
  id="comparison"
  className="mt-10 scroll-mt-24 sm:mt-12"
>
  {/* ====================================================== */}
{/* DESKTOP COMPARISON */}
{/* ====================================================== */}
<div className="hidden overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] lg:block">
  {/* DESKTOP HEADER */}
  <div className="flex items-start justify-between gap-8 border-b border-slate-100 bg-gradient-to-l from-brand-50/45 via-white to-white px-7 py-6 xl:px-8">
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
      <table className="w-full table-fixed border-collapse text-center">
        <thead>
          <tr className="bg-brand-600 text-white">
            <th className="w-[22%] border-l border-white/15 px-4 py-4 text-center text-sm font-black">
              عنصر المقارنة
            </th>

            <th
              className={`w-[26%] border-l border-white/15 px-4 py-4 text-center text-sm font-black ${
                page.slug === "cent" ? "bg-brand-700" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>حساب Cent</span>

                {page.slug === "cent" ? (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px]">
                    الصفحة الحالية
                  </span>
                ) : null}
              </div>
            </th>

            <th
              className={`w-[26%] border-l border-white/15 px-4 py-4 text-center text-sm font-black ${
                page.slug === "standard" ? "bg-brand-700" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>حساب Standard</span>

                {page.slug === "standard" ? (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px]">
                    الصفحة الحالية
                  </span>
                ) : null}
              </div>
            </th>

            <th
              className={`w-[26%] px-4 py-4 text-center text-sm font-black ${
                page.slug === "raw-spread" ? "bg-brand-700" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>حساب Raw Spread</span>

                {page.slug === "raw-spread" ? (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px]">
                    الصفحة الحالية
                  </span>
                ) : null}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {page.accountComparison.rows.map((row, index) => (
            <tr
              key={row.label}
              className={`border-b border-slate-100 last:border-b-0 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/45"
              }`}
            >
              <th className="border-l border-slate-100 px-4 py-4 text-center text-sm font-black text-slate-950">
                {row.label}
              </th>

              <td
                className={`border-l px-4 py-4 text-center text-sm font-semibold leading-7 ${
                  page.slug === "cent"
                    ? "border-brand-100 bg-brand-50/85 text-brand-800"
                    : "border-slate-100 text-slate-600"
                }`}
              >
                {row.cent}
              </td>

              <td
                className={`border-l px-4 py-4 text-center text-sm font-semibold leading-7 ${
                  page.slug === "standard"
                    ? "border-brand-100 bg-brand-50/85 text-brand-800"
                    : "border-slate-100 text-slate-600"
                }`}
              >
                {row.standard}
              </td>

              <td
                className={`px-4 py-4 text-center text-sm font-semibold leading-7 ${
                  page.slug === "raw-spread"
                    ? "bg-brand-50/85 text-brand-800"
                    : "text-slate-600"
                }`}
              >
                {row.rawSpread}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* ====================================================== */}
  {/* MOBILE COMPARISON */}
  {/* ====================================================== */}
  <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_9px_25px_rgba(15,23,42,0.05)] lg:hidden">
    {/* MOBILE HEADER */}
<div className="border-b border-slate-100 bg-gradient-to-l from-brand-50/55 via-white to-white px-4 py-4">
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
<div className="space-y-3 p-3.5">
      {[
        {
          key: "cent",
          title: "حساب Cent",
          subtitle: "أحجام صغيرة وتجربة تدريجية",
          values: page.accountComparison.rows.map((row) => row.cent),
        },
        {
          key: "standard",
          title: "حساب Standard",
          subtitle: "حساب واضح للاستخدام العام",
          values: page.accountComparison.rows.map(
            (row) => row.standard,
          ),
        },
        {
          key: "raw-spread",
          title: "حساب Raw Spread",
          subtitle: "سبريد منخفض مع عمولة",
          values: page.accountComparison.rows.map(
            (row) => row.rawSpread,
          ),
        },
      ].map((account) => {
        const isCurrent = page.slug === account.key;

        return (
          <article
            key={account.key}
            className={`overflow-hidden rounded-[19px] border bg-white shadow-[0_7px_20px_rgba(15,23,42,0.04)] ${
              isCurrent
                ? "border-brand-200 ring-1 ring-brand-100"
                : "border-slate-200"
            }`}
          >
            {/* ACCOUNT HEADER */}
            <div
              className={`flex items-center justify-between gap-3 border-b px-4 py-3.5 ${
                isCurrent
                  ? "border-brand-100 bg-brand-50/75"
                  : "border-slate-100 bg-slate-50/70"
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={`text-[16px] font-black leading-6 ${
                      isCurrent
                        ? "text-brand-800"
                        : "text-slate-950"
                    }`}
                  >
                    {account.title}
                  </h3>

                  {isCurrent ? (
                    <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[9px] font-black text-white">
                      الصفحة الحالية
                    </span>
                  ) : null}
                </div>

                <p className="mt-0.5 text-[10px] font-semibold leading-5 text-slate-500">
                  {account.subtitle}
                </p>
              </div>

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  isCurrent
                    ? "bg-brand-600 text-white"
                    : "bg-white text-brand-600 shadow-sm"
                }`}
              >
                <Scale className="h-4 w-4" />
              </div>
            </div>

            {/* ACCOUNT VALUES */}
            <div className="divide-y divide-slate-100 px-4">
              {page.accountComparison.rows.map((row, index) => (
                <div
                  key={`${account.key}-${row.label}`}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 py-2.5"
                >
                  <p className="text-[11px] font-bold leading-5 text-slate-500">
                    {row.label}
                  </p>

                  <p
                    className={`text-left text-[12px] font-black leading-5 ${
                      isCurrent
                        ? "text-brand-800"
                        : "text-slate-800"
                    }`}
                  >
                    {account.values[index]}
                  </p>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  </article>
</section>

{/* ====================================================== */}
{/* METHODOLOGY */}
{/* ====================================================== */}
<section
  id="methodology"
  className="mt-10 scroll-mt-24 sm:mt-12"
>
  {/* ====================================================== */}
  {/* DESKTOP METHODOLOGY */}
  {/* ====================================================== */}
  <div className="hidden overflow-hidden rounded-[26px] border border-brand-100 bg-gradient-to-br from-brand-50/75 via-white to-white shadow-[0_12px_34px_rgba(15,23,42,0.05)] lg:block">
    <div className="p-7 xl:p-8">
      {/* HEADER */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm">
          <BadgeCheck className="h-6 w-6" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black text-brand-600">
            الشفافية
          </p>

          <h2 className="text-[28px] leading-[1.3] font-black text-slate-950 xl:text-[34px]">
  {page.methodology.title}
</h2>

          <p className="mt-2 max-w-4xl text-[14px] leading-7 text-slate-600">
            {page.methodology.introduction}
          </p>
        </div>
      </div>

      {/* FACTORS */}
      <div className="mt-6 grid grid-cols-5 gap-3">
        {page.methodology.factors.map((factor, index) => (
          <article
            key={factor.title}
            className="group min-h-[142px] rounded-[18px] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_10px_24px_rgba(30,91,184,0.07)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[11px] font-black text-brand-700">
                {index + 1}
              </span>

              <h3 className="min-w-0 text-[14px] font-black leading-6 text-slate-950">
                {factor.title}
              </h3>
            </div>

            <p className="mt-3 text-[12px] leading-6 text-slate-600">
              {factor.description}
            </p>
          </article>
        ))}
      </div>

      {/* DISCLAIMER */}
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/90 px-4 py-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Info className="h-4 w-4" />
        </div>

        <p className="text-[13px] leading-7 text-slate-600">
          {page.methodology.disclaimer}
        </p>
      </div>
    </div>
  </div>

  {/* ====================================================== */}
  {/* MOBILE METHODOLOGY */}
  {/* ====================================================== */}
  <div className="lg:hidden">
    <article className="overflow-hidden rounded-[21px] border border-brand-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
      {/* HEADER */}
      <div className="border-b border-brand-100 bg-brand-50/60 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm">
            <BadgeCheck className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-black text-brand-600">
              الشفافية
            </p>

            <h2 className="mt-0.5 text-[22px] font-black leading-7 text-slate-950">
              {page.methodology.title}
            </h2>

            <p className="mt-1.5 text-[12px] leading-6 text-slate-600">
              {page.methodology.introduction}
            </p>
          </div>
        </div>
      </div>

      {/* SINGLE COMPACT LIST */}
      <div className="divide-y divide-slate-100 px-4">
        {page.methodology.factors.map((factor, index) => (
          <div
            key={factor.title}
            className="flex items-start gap-3 py-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[10px] font-black text-brand-700">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="text-[13px] font-black leading-5 text-slate-950">
                {factor.title}
              </h3>

              <p className="mt-0.5 text-[11px] leading-5 text-slate-600">
                {factor.description}
              </p>
            </div>

            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
          </div>
        ))}
      </div>

      {/* DISCLAIMER */}
      <div className="mx-4 mb-4 flex items-start gap-2.5 rounded-xl border border-brand-100 bg-brand-50/45 px-3 py-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />

        <p className="text-[10px] leading-5 text-slate-600">
          {page.methodology.disclaimer}
        </p>
      </div>
    </article>
  </div>
</section>

       {/* ====================================================== */}
{/* FAQ */}
{/* ====================================================== */}
<section className="mt-8 sm:mt-10">
  <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] lg:rounded-[26px]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-l from-brand-50/45 via-white to-white px-4 py-4 sm:px-5 lg:px-7 lg:py-6 xl:px-8">
      <div className="flex items-start gap-3 lg:gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm lg:h-11 lg:w-11 lg:rounded-2xl">
          <CircleHelp className="h-5 w-5" />
        </span>

        <div className="min-w-0">
          <p className="hidden text-[11px] font-black text-brand-600 lg:block">
            الأسئلة الشائعة
          </p>

          <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950 lg:mt-0.5 lg:text-[28px] lg:leading-9">
            أسئلة شائعة حول {page.breadcrumbLabel}
          </h2>

          <p className="mt-1.5 max-w-3xl text-[12px] leading-6 text-slate-600 lg:mt-2 lg:text-[14px] lg:leading-7">
            إجابات مباشرة عن أبرز الأسئلة التي يطرحها المتداولون قبل اختيار
            نوع الحساب.
          </p>
        </div>
      </div>
    </div>

    {/* QUESTIONS */}
    <div className="grid gap-2.5 p-3.5 sm:p-4 lg:grid-cols-2 lg:gap-3 lg:p-6 xl:p-7">
      {page.faq.slice(0, 6).map((item) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50/45 transition open:border-brand-200 open:bg-white lg:rounded-[18px]"
        >
          <summary className="cursor-pointer list-none">
            <div className="flex min-h-[62px] items-center gap-3 px-3.5 py-3 lg:min-h-[68px] lg:px-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                <CircleHelp className="h-4 w-4" />
              </span>

              <h3 className="min-w-0 flex-1 text-[13px] font-black leading-6 text-slate-950 lg:text-[14px]">
                {item.question}
              </h3>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-lg text-brand-600 shadow-sm transition group-open:rotate-45 group-open:bg-brand-50">
                +
              </span>
            </div>
          </summary>

          <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3">
            <p className="text-[12px] leading-6 text-slate-600 lg:text-[13px] lg:leading-7">
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
  <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] lg:rounded-[26px]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-slate-50/55 px-4 py-4 sm:px-5 lg:px-7 lg:py-5 xl:px-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-600 shadow-sm lg:h-11 lg:w-11 lg:rounded-2xl">
          <Layers3 className="h-5 w-5" />
        </span>

        <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-slate-950 lg:text-[27px] lg:leading-9">
          {page.relatedPages.title}
        </h2>
      </div>
    </div>

    {/* LINKS */}
    <div className="grid gap-2.5 p-3.5 sm:p-4 md:grid-cols-3 lg:gap-4 lg:p-6 xl:p-7">
      {page.relatedPages.links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-[16px] border border-slate-200 bg-slate-50/45 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-[0_10px_24px_rgba(30,91,184,0.07)] lg:rounded-[18px]"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 text-[14px] font-black leading-6 text-slate-950 transition group-hover:text-brand-700 lg:text-[15px]">
              {item.label}
            </h3>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-slate-600 lg:text-[12px] lg:leading-6">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  </div>
</section>

   {/* ====================================================== */}
{/* FINAL CTA */}
{/* ====================================================== */}
<section className="mt-8 sm:mt-10">
  <div className="relative overflow-hidden rounded-[22px] border border-brand-100 bg-gradient-to-l from-brand-600 via-brand-500 to-brand-400 px-4 py-5 text-white shadow-[0_10px_26px_rgba(30,91,184,0.14)] sm:px-6 sm:py-6 lg:rounded-[26px] lg:px-8 lg:py-7">
    {/* SOFT DECORATION */}
    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

    <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-brand-400/20 blur-3xl" />

    <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      {/* CONTENT */}
      <div className="max-w-3xl">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-sm lg:h-11 lg:w-11">
            <BarChart3 className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <h2 className="text-[20px] font-black leading-[1.35] tracking-[-0.015em] text-white sm:text-[23px] lg:text-[28px] lg:leading-9">
              {page.cta.title}
            </h2>

            <p className="mt-1.5 text-[12px] leading-6 text-white/85 sm:text-[13px] lg:mt-2 lg:text-[14px] lg:leading-7">
              {page.cta.description}
            </p>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <a
        href="#comparison"
        className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-[12px] font-black text-brand-600 shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:bg-brand-50 sm:w-auto sm:text-[13px] lg:h-12 lg:px-6"
      >
        {page.cta.buttonLabel}
        <ArrowLeft className="h-4 w-4" />
      </a>
    </div>
  </div>

  {/* RISK WARNING */}
  <div className="mt-4 rounded-[18px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_6px_18px_rgba(15,23,42,0.035)] sm:px-5 lg:mt-5 lg:px-6 lg:py-4">
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
        <Info className="h-4 w-4" />
      </span>

      <p className="text-[10px] leading-5 text-slate-500 sm:text-[11px] sm:leading-6 lg:text-[12px]">
        <strong className="font-black text-slate-700">
          تحذير مخاطر:
        </strong>{" "}
        تداول الفوركس والعقود مقابل الفروقات ينطوي على مستوى مرتفع من
        المخاطر وقد لا يناسب جميع المستثمرين. تأكد من فهمك لطبيعة المنتجات
        المالية وقدرتك على تحمل الخسارة قبل التداول.
      </p>
    </div>
  </div>
</section>
  </div>
</main>
</>
);
}