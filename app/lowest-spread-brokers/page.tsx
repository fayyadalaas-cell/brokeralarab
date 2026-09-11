import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import LowestSpreadHeadToHead from "@/app/components/LowestSpreadHeadToHead";

export const metadata: Metadata = {
  title: "أفضل شركات التداول بأقل سبريد 2026",

  description:
    "قارن أفضل شركات التداول ووسطاء الفوركس بأقل سبريد حسب متوسط السبريد والعمولة ونوع الحساب والحد الأدنى للإيداع، لمعرفة الحساب الأقل تكلفة.",

  alternates: {
    canonical:
      "https://brokeralarab.com/lowest-spread-brokers",

    languages: {
      ar: "https://brokeralarab.com/lowest-spread-brokers",
      en: "https://brokeralarab.com/en/lowest-spread-brokers",
      "x-default":
        "https://brokeralarab.com/lowest-spread-brokers",
    },
  },

  openGraph: {
    title:
      "أفضل شركات التداول بأقل سبريد 2026 | بروكر العرب",

    description:
      "قارن أفضل شركات التداول ووسطاء الفوركس بأقل سبريد حسب متوسط السبريد والعمولة ونوع الحساب والتكلفة الفعلية.",

    url:
      "https://brokeralarab.com/lowest-spread-brokers",

    type: "website",
    siteName: "بروكر العرب",
    locale: "ar_AR",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "أفضل شركات التداول بأقل سبريد 2026 | بروكر العرب",

    description:
      "قارن حسابات Standard وRaw وECN وCent حسب السبريد والعمولة والتكلفة الفعلية.",
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
  account_name_ar: string | null;
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
    standard: "حسابات Standard",
    raw: "حسابات Raw Spread",
    ecn: "حسابات ECN",
    zero: "حسابات Zero",
    pro: "حسابات Pro",
    cent: "حسابات Cent / Micro",
    other: "حسابات أخرى",
  };

  return labels[type] || type;
}

function getAccountTypeShortLabel(type: string) {
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
  const introductions: Record<string, string> = {
    standard:
      "حسابات مناسبة لمعظم المتداولين، وتأتي غالبًا دون عمولة منفصلة، بينما تكون تكلفة التداول مدمجة داخل السبريد.",
    raw:
      "حسابات تقدم سبريدًا منخفضًا جدًا مع عمولة منفصلة، وتناسب السكالبينج والمتداولين النشطين الذين ينفذون صفقات متكررة.",
    ecn:
      "حسابات تستهدف المتداولين الباحثين عن تنفيذ أسرع وتسعير أقرب للسوق، مع اختلاف العمولة وشروط التنفيذ بين وسيط وآخر.",
    cent:
      "حسابات تسمح بالتداول بأحجام صغيرة، وتناسب التجربة والتعلم وإدارة المخاطر برأس مال محدود.",
    other:
      "تختلف خصائص هذه الحسابات بين الوسطاء، لذلك يجب مقارنة السبريد والعمولة والإيداع وشروط التنفيذ معًا.",
  };

  return introductions[type] || introductions.other;
}

function getAccountTypeRecommendation(type: string) {
  const recommendations: Record<string, string> = {
    standard: "مناسب للمبتدئين والتداول المعتدل",
    raw: "مناسب للسكالبينج والتداول النشط",
    ecn: "مناسب لمن يهتم بسرعة التنفيذ",
    cent: "مناسب للتجربة ورأس المال الصغير",
    other: "راجع شروط الحساب بعناية",
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
    broker?.name ||
    broker?.title ||
    broker?.broker_name ||
    broker?.name_ar ||
    broker?.slug ||
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
          alt={alt}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-[9px] font-black text-slate-400">LOGO</span>
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
  const accountClasses =
    "inline-flex max-w-full items-center truncate rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-extrabold text-brand-600 transition lg:px-3 lg:py-1.5 lg:text-[12px]";

  const displayAccountName =
    item.account_name_ar?.trim() ||
    item.account_name?.trim() ||
    "—";

  if (!item.broker_slug || !item.account_name) {
    return (
      <span className={accountClasses}>
        {displayAccountName}
      </span>
    );
  }

  return (
    <Link
      href={`/brokers/${item.broker_slug}/accounts/${accountSlug(
        item.account_name
      )}`}
      className={`${accountClasses} hover:border-brand-500 hover:bg-brand-500 hover:text-white`}
    >
      {displayAccountName}
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
    ? `/brokers/${item.broker_slug}`
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
          التقييم
        </Link>
      ) : null}

      {accountHref ? (
        <a
          href={accountHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-xl bg-brand-500 font-extrabold text-white shadow-sm transition hover:bg-brand-600 ${
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

export default async function LowestSpreadBrokersPage() {
  const supabase = await createClient();

  const { data: accountsData, error: accountsError } = await supabase
  .from("broker_accounts")
  .select(`
    id,
    broker_id,
    account_name,
    account_name_ar,
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
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7 text-right">
          <h1 className="text-2xl font-black text-slate-950">
            تعذر تحميل بيانات الحسابات
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
        <div className="mx-auto max-w-[1520px] rounded-[28px] border border-red-200 bg-red-50 p-7 text-right">
          <h1 className="text-2xl font-black text-slate-950">
            تعذر تحميل بيانات شركات التداول
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
      broker_intro: broker?.intro || null,
      broker_best_for: broker?.best_for || null,
      broker_account_url: getBrokerAccountUrl(broker),
      broker_website_url: getBrokerWebsiteUrl(broker),
      broker_islamic_label:
        broker?.islamic_ar ?? broker?.islamic ?? null,
      broker_arabic_support:
        broker?.arabic_support ?? broker?.arabic_sup ?? null,
      normalized_account_type: normalizeAccountType(row.account_type),
      total_cost_score: spreadAverage + commissionValue / 10,
    };
  });

  const selectBestAccountPerBroker = (
  items: PreparedAccount[]
): PreparedAccount[] => {
  const seenBrokers = new Set<number>();

  return [...items]
    .sort(compareByRealCost)
    .filter((item) => {
      if (seenBrokers.has(item.broker_id)) {
        return false;
      }

      seenBrokers.add(item.broker_id);
      return true;
    });
};

const groupedByType = ["standard", "raw", "ecn", "cent"]
  .map((type) => {
    const categoryAccounts = accounts.filter(
      (account) => account.normalized_account_type === type
    );

    const items = selectBestAccountPerBroker(categoryAccounts);

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

const bestOverall = selectBestAccountPerBroker(accounts).slice(0, 8);

  const uniqueBrokerCount = new Set(
    accounts.map((account) => account.broker_id)
  ).size;

  const bestStandard =
    groupedByType.find((group) => group.type === "standard")?.winner || null;

  const bestRaw =
    groupedByType.find((group) => group.type === "raw")?.winner || null;

  const bestEcn =
    groupedByType.find((group) => group.type === "ecn")?.winner || null;

  const bestCent =
    groupedByType.find((group) => group.type === "cent")?.winner || null;

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
            (account) => account.normalized_account_type === "standard"
          ) || null,
        best_raw:
          brokerAccounts.find(
            (account) => account.normalized_account_type === "raw"
          ) || null,
        best_ecn:
          brokerAccounts.find(
            (account) => account.normalized_account_type === "ecn"
          ) || null,
        best_cent:
          brokerAccounts.find(
            (account) => account.normalized_account_type === "cent"
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
        name: "ما المقصود بأقل سبريد في شركات التداول؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "المقصود هو أقل فارق بين سعر الشراء وسعر البيع يقدمه الوسيط على نوع حساب محدد، مع ضرورة احتساب أي عمولة منفصلة.",
        },
      },
      {
        "@type": "Question",
        name: "هل الحساب ذو السبريد الأقل هو الأفضل دائمًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ليس دائمًا، لأن التكلفة الفعلية تشمل متوسط السبريد والعمولة وجودة التنفيذ والحد الأدنى للإيداع وشروط الحساب.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين Standard وRaw وECN؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "حساب Standard يأتي غالبًا دون عمولة منفصلة مع سبريد أعلى نسبيًا، بينما تقدم حسابات Raw وECN سبريدًا أقل عادةً مقابل عمولة منفصلة.",
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
        name: "الرئيسية",
        item: "https://brokeralarab.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "أفضل الوسطاء",
        item: "https://brokeralarab.com/best-brokers",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "أفضل شركات التداول بأقل سبريد",
        item: "https://brokeralarab.com/lowest-spread-brokers",
      },
    ],
  };

  const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "أفضل شركات التداول بأقل سبريد 2026",
  url:
    "https://brokeralarab.com/lowest-spread-brokers",
  description:
    "قارن أفضل شركات التداول ووسطاء الفوركس بأقل سبريد حسب متوسط السبريد والعمولة ونوع الحساب والحد الأدنى للإيداع.",
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
    name: "أفضل شركات التداول بأقل سبريد",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: bestOverall.length,
    itemListElement: bestOverall.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${item.broker_name} - ${
        item.account_name || "حساب تداول"
      }`,
      url:
        item.broker_slug && item.account_name
          ? `https://brokeralarab.com/brokers/${
              item.broker_slug
            }/accounts/${accountSlug(item.account_name)}`
          : item.broker_slug
          ? `https://brokeralarab.com/brokers/${item.broker_slug}`
          : "https://brokeralarab.com/lowest-spread-brokers",
    })),
  };



const comparedAccountsCount = accounts.filter((account) =>
  ["standard", "raw", "ecn", "cent"].includes(
    account.normalized_account_type
  )
).length;

  return (
    <main dir="rtl" className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <Script
        id="lowest-spread-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <Script
        id="lowest-spread-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <Script
        id="lowest-spread-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <Script
        id="lowest-spread-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

    {/* HERO */}
<section className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31]">
  {/* Background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

    <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

    <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

    <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
  </div>

  {/* Website container */}
  <div className="relative mx-auto max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
    {/* Spread illustration */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute left-[95px] top-1/2 hidden w-[250px] -translate-y-1/2 min-[1500px]:block"
>
  <div className="rounded-[17px] border border-white/10 bg-[#0b2948]/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md">
    {/* Header */}
    <div className="flex items-center justify-between gap-2">
      <div className="text-[10px] font-black text-white">
        كيف يتكوّن السبريد؟
      </div>

      <div className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2 py-0.5 text-[7px] font-bold text-cyan-200">
        مثال توضيحي
      </div>
    </div>

    {/* Prices */}
    <div className="mt-3 space-y-2">
      {/* Buy */}
      <div className="rounded-[11px] border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-2 text-center">
        <div className="text-[8px] font-bold text-emerald-200/75">
          سعر الشراء
        </div>

        <div
          dir="ltr"
          className="mt-0.5 text-[15px] font-black tracking-wide text-emerald-300"
        >
          1.08420
        </div>
      </div>

      {/* Spread */}
      <div className="flex items-center gap-2">
        <span className="h-px flex-1 bg-gradient-to-l from-cyan-300/30 to-transparent" />

        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1">
          <span className="text-[7px] font-bold text-blue-200/75">
            السبريد
          </span>

          <span
            dir="ltr"
            className="text-[11px] font-black text-[#65c9ff]"
          >
            1.0
          </span>

          <span className="text-[7px] font-bold text-blue-200/75">
            نقطة
          </span>
        </div>

        <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/30 to-transparent" />
      </div>

      {/* Sell */}
      <div className="rounded-[11px] border border-rose-300/15 bg-rose-300/[0.06] px-3 py-2 text-center">
        <div className="text-[8px] font-bold text-rose-200/75">
          سعر البيع
        </div>

        <div
          dir="ltr"
          className="mt-0.5 text-[15px] font-black tracking-wide text-rose-300"
        >
          1.08410
        </div>
      </div>
    </div>

    {/* Explanation */}
    <div className="mt-2.5 border-t border-white/10 pt-2 text-center">
      <p className="text-[7px] font-bold text-blue-100/60">
        الفرق بين السعرين هو تكلفة السبريد
      </p>
    </div>
  </div>
</div>

    {/* Breadcrumb */}
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

      <span className="text-blue-300/40">/</span>

      <span className="text-white">أقل سبريد</span>
    </nav>

    {/* Main content */}
    <div className="mt-0 text-right sm:mt-5">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
        مقارنة حسابات التداول 2026
      </div>

      {/* Heading */}
      <h1 className="mt-3 max-w-[1300px] text-[30px] font-black leading-[1.12] tracking-[-0.035em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
        <span className="block sm:inline">
          أفضل شركات التداول
        </span>{" "}

        <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
          بأقل سبريد في 2026
        </span>
      </h1>

      {/* Mobile description */}
      <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
        قارن الحسابات حسب السبريد والعمولة والتكلفة الفعلية، واختر الحساب
        الأقل تكلفة بوضوح.
      </p>

      {/* Desktop description */}
      <p className="mt-3 hidden max-w-[1180px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[16px]">
        قارن حسابات التداول حسب متوسط السبريد والعمولة والتكلفة الفعلية،
        مع فصل النتائج حسب نوع الحساب للحصول على مقارنة واضحة وعادلة بين
        شركات التداول.
      </p>

      {/* Update information */}
      <div className="mt-2.5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
        <time
          dateTime="2026-09-10"
          className="inline-flex items-center gap-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="sm:hidden">
            محدثة في سبتمبر 2026
          </span>

          <span className="hidden sm:inline">
            آخر تحديث: 10 سبتمبر 2026
          </span>
        </time>

        <span className="hidden h-3 w-px bg-white/20 sm:block" />

        <span className="inline-flex items-center gap-1.5">
          <span className="text-cyan-300">✓</span>
          العمولة ضمن التقييم
        </span>

        <span className="hidden h-3 w-px bg-white/20 sm:block" />

        <span className="hidden items-center gap-1.5 sm:inline-flex">
          <span className="text-cyan-300">✓</span>
          مقارنة مستقلة حسب نوع الحساب
        </span>
      </div>

      {/* Bottom row */}
      <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-start lg:gap-6">
        {/* Stats */}
        <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[620px]">
          <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
            <div className="text-base font-black text-[#66c8ff] sm:text-xl">
              {uniqueBrokerCount}
            </div>

            <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
              شركة تداول
            </div>
          </div>

          <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
            <div className="text-base font-black text-[#66c8ff] sm:text-xl">
              {comparedAccountsCount}
            </div>

            <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
              حسابًا مقارنًا
            </div>
          </div>

          <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
            <div className="text-base font-black text-[#66c8ff] sm:text-xl">
              {groupedByType.length}
            </div>

            <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
              فئات حسابات
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid w-full grid-cols-2 gap-2.5 sm:w-auto sm:gap-3">
          <a
            href="#account-types"
            className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">عرض السبريد</span>
            <span className="hidden sm:inline">
              عرض مقارنة السبريد
            </span>
            <span aria-hidden="true">←</span>
          </a>

          <a
            href="#head-to-head"
            className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">مقارنة الشركات</span>
            <span className="hidden sm:inline">
              مقارنة شركة بشركة
            </span>
            <span aria-hidden="true">←</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

{/* PAGE NAVIGATION */}
<section className="hidden border-b border-slate-200 bg-white sm:block">
  <div className="mx-auto max-w-[1520px] px-6 py-3 lg:px-8 xl:px-10">
    <nav
      aria-label="التنقل داخل الصفحة"
      className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
    >
      {[
        {
          href: "#account-types",
          label: "المقارنة حسب الحساب",
        },
        {
          href: "#head-to-head",
          label: "مقارنة الشركات",
        },
        {
          href: "#best-by-category",
          label: "أفضل حساب بكل فئة",
        },
        {
          href: "#selection-method",
          label: "منهجية الاختيار",
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

     {/* ACCOUNT TYPES */}
<section
  id="account-types"
  className="scroll-mt-24 bg-[#f4f7fb] pb-8 pt-3 sm:pb-9 sm:pt-5 lg:pb-11 lg:pt-6"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
    {/* ACCOUNT GROUPS */}
    <div className="space-y-5 sm:space-y-7">
      {groupedByType.map((group) => {
        const visibleItems = group.items.slice(0, 7);

        const renderMobileCard = (
          item: PreparedAccount,
          index: number
        ) => (
          <div
            key={item.id}
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
              {/* Broker */}
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
                          الأفضل
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

              {/* Mobile values */}
              <div className="mt-2.5 grid grid-cols-3 overflow-hidden rounded-[11px] border border-slate-200 bg-[#f7f9fc]">
                <div className="border-l border-slate-200 px-1 py-2 text-center">
                  <div className="text-[8px] font-extrabold text-slate-500">
                    السبريد
                  </div>

                  <div
                    dir="ltr"
                    className="mt-0.5 text-[12px] font-black text-emerald-700"
                  >
                    {item.spread || "—"}
                  </div>
                </div>

                <div className="border-l border-slate-200 px-1 py-2 text-center">
                  <div className="text-[8px] font-extrabold text-slate-500">
                    العمولة
                  </div>

                  <div
                    dir="ltr"
                    className="mt-0.5 break-words text-[10px] font-black text-slate-900"
                  >
                    {item.commission || "—"}
                  </div>
                </div>

                <div className="px-1 py-2 text-center">
                  <div className="text-[8px] font-extrabold text-slate-500">
                    الإيداع
                  </div>

                  <div
                    dir="ltr"
                    className="mt-0.5 text-[12px] font-black text-slate-900"
                  >
                    {item.min_deposit || "—"}
                  </div>
                </div>
              </div>

              {/* Mobile actions */}
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
              <div className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-[#2f80ed] to-[#1353a5]" />

              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 text-right">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[9px] font-black text-white sm:text-[11px]">
                      {group.shortLabel}
                    </span>

                    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[8px] font-extrabold text-slate-600 sm:text-[10px]">
                      {group.recommendation}
                    </span>
                  </div>

                  {/* Mobile title */}
                  <h3 className="mt-2.5 text-[20px] font-black leading-[1.25] text-slate-950 sm:hidden">
                    أفضل حسابات {group.shortLabel} بأقل تكلفة
                  </h3>

                  {/* Desktop title */}
                  <h3 className="mt-2.5 hidden text-2xl font-black leading-[1.25] text-slate-950 sm:block lg:text-[30px]">
                    أفضل {group.label} من حيث السبريد والتكلفة
                  </h3>

                  {/* Hide description on mobile */}
                  <p className="mt-2 hidden max-w-[1000px] text-[14px] leading-7 text-slate-600 sm:block">
                    {group.intro}
                  </p>
                </div>

                {/* Desktop count */}
                <div className="hidden shrink-0 items-center gap-3 rounded-[15px] border border-blue-100 bg-white/95 px-4 py-3 shadow-sm lg:flex">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-brand-50 text-lg font-black text-brand-600">
                    {visibleItems.length}
                  </div>

                  <div className="text-right">
                    <div className="text-[12px] font-black text-slate-900">
                      أفضل النتائج المعروضة
                    </div>

                    <div className="mt-0.5 text-[10px] font-bold text-slate-500">
                      من أصل {group.items.length} شركة
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden p-5 lg:block lg:p-6">
              <div className="overflow-hidden rounded-[18px] border border-slate-200 shadow-[0_7px_24px_rgba(15,23,42,0.055)]">
                <table className="w-full table-fixed text-right">
                  <thead className="bg-[linear-gradient(90deg,#071c34_0%,#0b3157_55%,#0d426f_100%)] text-white">
                    <tr className="text-[13px]">
                      <th className="w-[8%] px-4 py-4 text-center font-black">
                        الترتيب
                      </th>

                      <th className="w-[34%] px-6 py-4 font-black">
                        الشركة والحساب
                      </th>

                      <th className="w-[13%] px-4 py-4 text-center font-black">
                        السبريد
                      </th>

                      <th className="w-[12%] px-4 py-4 text-center font-black">
                        العمولة
                      </th>

                      <th className="w-[12%] px-4 py-4 text-center font-black">
                        الإيداع
                      </th>

                      <th className="w-[21%] px-4 py-4 text-center font-black">
                        الإجراءات
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
                        {/* Ranking */}
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

                        {/* Broker */}
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
                                    الأفضل في الفئة
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

                        {/* Spread */}
                        <td className="px-4 py-[18px] text-center">
                          <span
                            dir="ltr"
                            className="inline-flex min-w-[96px] items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-[14px] font-black text-emerald-700 shadow-sm"
                          >
                            {item.spread || "—"}
                          </span>
                        </td>

                        {/* Commission */}
                        <td
                          dir="ltr"
                          className="px-4 py-[18px] text-center text-[15px] font-black text-slate-950"
                        >
                          {item.commission || "—"}
                        </td>

                        {/* Deposit */}
                        <td
                          dir="ltr"
                          className="px-4 py-[18px] text-center text-[15px] font-black text-slate-950"
                        >
                          {item.min_deposit || "—"}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-[18px]">
                          <div className="mx-auto max-w-[240px] [&_a]:min-h-[44px] [&_a]:text-[13px]">
                            <ActionButtons item={item} />
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
                .map((item, index) =>
                  renderMobileCard(item, index)
                )}

              {visibleItems.length > 3 ? (
                <details className="group overflow-hidden rounded-[16px] border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-center gap-2 bg-slate-50 px-4 py-3 text-xs font-black text-brand-600">
                    عرض {visibleItems.length - 3} شركات أخرى

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
    <LowestSpreadHeadToHead brokers={brokerSummaries} />
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
    مقارنة حسب نوع الحساب
  </span>

  <h2 className="mt-3 max-w-[900px] text-[26px] font-black leading-[1.22] text-slate-950 sm:text-4xl sm:leading-tight">
    أفضل وسيط فوركس بأقل سبريد حسب نوع الحساب
  </h2>

  <p className="mt-3 max-w-none text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:whitespace-nowrap">
  تختلف تكلفة التداول بين حسابات Standard وRaw Spread وECN وCent. نقارن متوسط السبريد والعمولة والحد الأدنى للإيداع لمساعدتك على اختيار الحساب الأنسب لتداولك.
</p>
</div>

      {(() => {
        const bestByCategory = [
  {
    title: "أفضل حساب Standard",
    mobileTitle: "أفضل حساب Standard",
    type: "Standard",
    description:
      "مناسب للمبتدئين والتداول اليومي، وغالبًا دون عمولة منفصلة.",
    item: bestStandard,
  },
  {
    title: "أفضل حساب Raw Spread",
    mobileTitle: "أفضل حساب Raw",
    type: "Raw",
    description:
      "سبريد منخفض للسكالبينج والصفقات المتكررة مع احتساب العمولة.",
    item: bestRaw,
  },
  {
    title: "أفضل حساب ECN",
    mobileTitle: "أفضل حساب ECN",
    type: "ECN",
    description:
      "مناسب لمن يهتم بالتنفيذ السريع والتسعير التنافسي.",
    item: bestEcn,
  },
  {
    title: "أفضل حساب Cent / Micro",
    mobileTitle: "أفضل حساب Cent / Micro",
    type: "Cent",
    description:
      "مناسب للتجربة والتعلم والتداول برأس مال محدود.",
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

                          {formatRating(card.item.broker_rating) ? (
                            <div className="mt-1.5 text-[11px] font-black text-amber-600">
                              ★ {formatRating(card.item.broker_rating)}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="border-l border-slate-200 px-1.5 py-3 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            السبريد
                          </div>

                          <div className="mt-1 text-[11px] font-black text-emerald-700">
                            {card.item.spread || "—"}
                          </div>
                        </div>

                        <div className="border-l border-slate-200 px-1.5 py-3 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            العمولة
                          </div>

                          <div className="mt-1 break-words text-[10px] font-black text-slate-950">
                            {card.item.commission || "—"}
                          </div>
                        </div>

                        <div className="px-1.5 py-3 text-center">
                          <div className="text-[8px] font-extrabold text-slate-500">
                            الإيداع
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
                     لا تتوفر بيانات كافية لهذا النوع من الحسابات حاليًا
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

                    <div className="min-w-0 text-right">
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
                        {card.item?.broker_name || "غير متوفر"}
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
                          <div className="border-l border-slate-200 px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-bold text-slate-500">
                              السبريد
                            </div>

                            <div className="mt-1 text-[11px] font-black text-emerald-700">
                              {card.item.spread || "—"}
                            </div>
                          </div>

                          <div className="border-l border-slate-200 px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-bold text-slate-500">
                              العمولة
                            </div>

                            <div className="mt-1 break-words text-[10px] font-black leading-4 text-slate-950">
                              {card.item.commission || "—"}
                            </div>
                          </div>

                          <div className="px-1.5 py-2.5 text-center">
                            <div className="text-[8px] font-bold text-slate-500">
                              الإيداع
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
                       لا تتوفر بيانات كافية لهذا النوع من الحسابات حاليًا
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
<div className="border-b border-slate-200 bg-[linear-gradient(145deg,#eef5ff_0%,#ffffff_85%)] px-4 py-5 sm:px-7 sm:py-6 lg:border-b-0 lg:border-l lg:py-8">
  <span className="inline-flex rounded-full border border-brand-200 bg-white px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
    منهجية بروكر العرب
  </span>

  <h2 className="mt-3 max-w-[320px] text-balance text-[22px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-none min-[380px]:text-[24px] sm:max-w-[700px] sm:text-4xl sm:leading-tight">
    كيف نقارن فروقات الأسعار بين شركات التداول؟
  </h2>

  <p className="mt-2.5 max-w-[420px] text-[12px] leading-[1.9] text-slate-600 sm:mt-3 sm:max-w-[700px] sm:text-base sm:leading-8">
    لا نعتمد على أقل سبريد معلن فقط. نقارن متوسط السبريد والعمولة ونوع الحساب والحد الأدنى للإيداع حتى تكون مقارنة تكلفة التداول عادلة وواضحة.
  </p>

  <div className="mt-4 rounded-[17px] border border-brand-200 bg-white p-3.5 sm:mt-5 sm:p-4">
    <div className="text-sm font-black text-slate-950">
      المعادلة الأساسية
    </div>

    <div className="mt-2 rounded-xl bg-brand-50 px-3 py-2.5 text-center text-[13px] font-black leading-6 text-brand-700 sm:py-3 sm:text-sm">
  التكلفة الفعلية تعتمد على متوسط السبريد والعمولة المنفصلة
</div>

    <p className="mt-2.5 text-[11px] leading-5 text-slate-500 sm:mt-3 sm:text-xs sm:leading-6">
      نراجع أيضًا نوع الحساب والحد الأدنى للإيداع ومدى ملاءمته لطريقة تداولك.
    </p>

    <Link
      href="/learn-trading/spread"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1 text-xs font-black text-brand-600 transition hover:text-brand-700"
    >
      تعرّف أكثر على معنى السبريد
      <span aria-hidden="true">←</span>
    </Link>
  </div>
         {/* RELATED LINKS - DESKTOP */}
<div className="mt-4 hidden lg:block">
  <div className="mb-2 text-[11px] font-black text-slate-950">
    روابط مفيدة
  </div>

  <div className="grid grid-cols-3 gap-2">
    <Link
      href="/brokers"
      className="flex min-h-[54px] items-center justify-between gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2 transition hover:border-brand-200 hover:bg-brand-50"
    >
      <span className="text-[10px] font-black leading-4 text-slate-800">
        تقييمات الوسطاء
      </span>

      <span className="shrink-0 text-xs font-black text-brand-500">
        ←
      </span>
    </Link>

    <Link
      href="/best-brokers"
      className="flex min-h-[54px] items-center justify-between gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2 transition hover:border-brand-200 hover:bg-brand-50"
    >
      <span className="text-[10px] font-black leading-4 text-slate-800">
        أفضل الوسطاء
      </span>

      <span className="shrink-0 text-xs font-black text-brand-500">
        ←
      </span>
    </Link>

    <Link
      href="/compare"
      className="flex min-h-[54px] items-center justify-between gap-2 rounded-[13px] border border-slate-200 bg-white px-3 py-2 transition hover:border-brand-200 hover:bg-brand-50"
    >
      <span className="text-[10px] font-black leading-4 text-slate-800">
        مقارنات الوسطاء
      </span>

      <span className="shrink-0 text-xs font-black text-brand-500">
        ←
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
  title: "متوسط السبريد",
  description:
    "نستخدم متوسط السبريد المتوقع بدل الاعتماد على أقل رقم إعلاني فقط.",
},
{
  number: "02",
  title: "العمولة المنفصلة",
  description:
    "نضيف العمولة عندما تكون جزءًا من تكلفة الحساب حتى لا تبدو المقارنة أقل من التكلفة الحقيقية.",
},
{
  number: "03",
  title: "نوع الحساب",
  description:
    "نفصل بين Standard وRaw Spread وECN وCent حتى نقارن الحسابات المتشابهة فقط.",
},
{
  number: "04",
  title: "الحد الأدنى للإيداع",
  description:
    "نراجع المبلغ المطلوب لفتح الحساب لأن بعض الحسابات تتطلب إيداعًا مرتفعًا.",
},
{
  number: "05",
  title: "أسلوب التداول",
  description:
    "الحساب المناسب للسكالبينج والصفقات السريعة قد لا يكون الأفضل للمبتدئ أو للتداول طويل الأجل.",
},
{
  number: "06",
  title: "وضوح الشروط",
  description:
    "نفضل الحسابات التي تعرض السبريد والعمولة وشروط التنفيذ بطريقة واضحة.",
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
        title: "متوسط السبريد",
        description:
          "نستخدم متوسط السبريد المتوقع بدل أقل رقم إعلاني فقط.",
      },
      {
        number: "02",
        title: "العمولة المنفصلة",
        description:
          "نضيف العمولة عندما تكون جزءًا من تكلفة الحساب.",
      },
      {
        number: "03",
        title: "نوع الحساب",
        description:
          "نفصل Standard وRaw Spread وECN وCent للمقارنة العادلة.",
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
      3 عوامل إضافية نراجعها

      <span className="transition group-open:rotate-180">
        ▼
      </span>
    </summary>

    <div className="grid gap-3 border-t border-brand-200 bg-white px-4 py-3">
      <div>
        <h3 className="text-[11px] font-black text-slate-950">
          الحد الأدنى للإيداع
        </h3>

        <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
          نراجع المبلغ المطلوب لفتح الحساب.
        </p>
      </div>

      <div>
        <h3 className="text-[11px] font-black text-slate-950">
          أسلوب التداول
        </h3>

        <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
          الحساب المناسب للسكالبينج قد لا يكون الأفضل للمبتدئ.
        </p>
      </div>

      <div>
        <h3 className="text-[11px] font-black text-slate-950">
          وضوح الشروط
        </h3>

        <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
          نفضل الحسابات التي تعرض السبريد والعمولة وشروط التنفيذ بوضوح.
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
<section className="pb-7 sm:pb-10 lg:pb-12">
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
      {/* HEADER */}
      <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-5 sm:px-7 sm:py-6">
        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600 sm:text-[11px]">
          دليل اختيار الحساب
        </span>

        <h2 className="mt-3 max-w-[300px] text-balance text-[22px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-[360px] min-[380px]:text-[24px] sm:max-w-[900px] sm:text-4xl sm:leading-tight">
          كيف تختار الحساب الأنسب لتداولك؟
        </h2>

        <p className="mt-2.5 max-w-[330px] text-[12px] leading-[1.9] text-slate-600 min-[380px]:max-w-[390px] sm:mt-3 sm:max-w-none sm:text-base sm:leading-8 lg:whitespace-nowrap">
          يعتمد اختيار أفضل حساب تداول على خبرتك وحجم رأس المال وعدد الصفقات، لكن القرار النهائي يجب أن يقارن متوسط السبريد والعمولة والتكلفة الكاملة.
        </p>
      </div>

      {/* DESKTOP */}
      <div className="hidden grid-cols-2 gap-4 p-6 md:grid xl:grid-cols-4 lg:p-7">
        {[
          {
            title: "إذا كنت مبتدئًا",
            account: "Standard",
            description:
              "حساب أبسط غالبًا دون عمولة منفصلة، ومناسب للمبتدئين والتداول اليومي.",
          },
          {
            title: "إذا كنت تتداول صفقات سريعة",
            account: "Raw / ECN",
            description:
              "سبريد منخفض للسكالبينج والصفقات المتكررة، مع احتساب العمولة.",
          },
          {
            title: "إذا كان رأس مالك صغيرًا",
            account: "Cent / Micro",
            description:
              "أحجام تداول صغيرة للتجربة والتعلم وإدارة المخاطر برأس مال محدود.",
          },
          {
            title: "إذا كان هدفك أقل تكلفة",
            account: "Total Cost",
            description:
              "قارن متوسط السبريد والعمولة لاختيار الحساب الأقل تكلفة فعليًا.",
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
              عرض المقارنة
            </a>
          </article>
        ))}
      </div>

      {/* MOBILE */}
      <div className="p-3.5 md:hidden">
        <div className="overflow-hidden rounded-[17px] border border-slate-200 bg-white">
          {[
            {
              title: "إذا كنت مبتدئًا",
              account: "Standard",
              description:
                "حساب أبسط غالبًا دون عمولة منفصلة ومناسب للمبتدئين.",
            },
            {
              title: "إذا كنت تتداول صفقات سريعة",
              account: "Raw / ECN",
              description:
                "سبريد منخفض مع ضرورة احتساب العمولة.",
            },
            {
              title: "إذا كان رأس مالك صغيرًا",
              account: "Cent / Micro",
              description:
                "أحجام صغيرة للتجربة والتعلم وإدارة المخاطر.",
            },
            {
              title: "إذا كان هدفك أقل تكلفة",
              account: "Total Cost",
              description:
                "قارن السبريد والعمولة لمعرفة التكلفة الفعلية.",
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
                  عرض الحسابات المناسبة ←
                </a>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
<div className="mx-3.5 mt-2 mb-2.5 rounded-[16px] border border-brand-200 bg-brand-50 px-4 py-3 sm:mx-7 sm:mt-3 sm:mb-5 sm:px-5 sm:py-3.5">
  <div className="grid grid-cols-[30px_minmax(0,1fr)] items-start gap-3">
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-xs font-black text-white">
      ✓
    </span>

    <div>
      <h3 className="text-[13px] font-black text-slate-950 sm:text-base">
        الخلاصة
      </h3>

      <p className="mt-1 text-[11px] leading-5 text-slate-700 sm:text-sm sm:leading-6">
        Standard للبساطة، وRaw أو ECN للصفقات المتكررة، وCent للتجربة برأس مال صغير. قارن دائمًا التكلفة الكاملة قبل فتح الحساب.
      </p>
    </div>
  </div>
</div>
    </div>
  </div>
</section>

{/* IMPORTANT NOTICE */}
<section className="pb-4 sm:pb-6 lg:pb-8">
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
    <div className="rounded-[18px] border border-amber-300 bg-amber-50 px-4 py-3.5 sm:px-6 sm:py-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-sm font-black text-amber-700 shadow-sm sm:h-9 sm:w-9">
          !
        </span>

        <h2 className="text-[15px] font-black text-amber-950 sm:text-lg">
          ملاحظة حول بيانات السبريد
        </h2>
      </div>

      <p className="mt-2.5 text-[11px] leading-5 text-amber-900/85 sm:mt-3 sm:text-sm sm:leading-7">
        السبريد متغير وقد يرتفع أثناء الأخبار والتقلبات وضعف السيولة. الأرقام المعروضة للمقارنة ولا تضمن بقاء السبريد عند المستوى نفسه.
      </p>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <Link
          href="/learn-trading/spread"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-black text-amber-900 underline decoration-amber-400 underline-offset-4"
        >
          اقرأ دليل السبريد
          <span aria-hidden="true">←</span>
        </Link>

        <span className="text-[10px] font-bold text-amber-800/80">
          راجع شروط الوسيط قبل اتخاذ القرار.
        </span>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section
  id="faq"
  className="scroll-mt-24 pb-3 sm:pb-7 lg:pb-9"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
      {/* HEADER */}
      <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-5 sm:px-7 sm:py-6">
        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
          أسئلة المتداولين
        </span>

        <h2 className="mt-3 max-w-[330px] text-[23px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-[390px] min-[380px]:text-[26px] sm:max-w-[850px] sm:text-4xl sm:leading-tight">
          الأسئلة الشائعة عن أقل سبريد وحسابات التداول
        </h2>

        <p className="mt-2.5 max-w-[900px] text-sm leading-7 text-slate-600 sm:mt-3 sm:text-base sm:leading-8">
          إجابات مختصرة عن متوسط السبريد والعمولة وأنواع الحسابات وكيفية اختيار الحساب الأقل تكلفة.
        </p>
      </div>

      {(() => {
        const faqItems = [
          {
            question:
              "ما المقصود بأقل سبريد في شركات التداول؟",
            answer:
              "المقصود هو أقل فارق بين سعر الشراء وسعر البيع يقدمه الوسيط على نوع حساب محدد، مع ضرورة احتساب أي عمولة منفصلة.",
          },
          {
            question:
              "هل الحساب ذو السبريد الأقل هو الأفضل دائمًا؟",
            answer:
              "ليس دائمًا، لأن التكلفة الفعلية تشمل متوسط السبريد والعمولة وجودة التنفيذ والحد الأدنى للإيداع وشروط الحساب.",
          },
          {
            question:
              "ما الفرق بين Standard وRaw وECN؟",
            answer:
              "حساب Standard يأتي غالبًا دون عمولة منفصلة مع سبريد أعلى نسبيًا، بينما تقدم حسابات Raw وECN سبريدًا أقل عادةً مقابل عمولة منفصلة.",
          },
          {
            question:
              "ما أفضل حساب للمبتدئين؟",
            answer:
              "يكون Standard مناسبًا غالبًا بسبب بساطته ووضوح تكلفته، مع ضرورة مراجعة الإيداع والتنظيم والدعم.",
          },
          {
            question:
              "هل حساب Cent مناسب للتداول الحقيقي؟",
            answer:
              "يمكن استخدامه للتعلم والتجربة بأحجام صغيرة، لكنه لا يقدم دائمًا الشروط نفسها المتاحة في الحسابات القياسية.",
          },
          {
            question:
              "هل حساب ECN أفضل من Standard؟",
            answer:
              "يعتمد ذلك على أسلوب التداول. قد يناسب ECN الصفقات المتكررة، بينما يكون Standard أبسط للمبتدئ.",
          },
          {
            question:
              "لماذا يتغير السبريد خلال اليوم؟",
            answer:
              "يتغير حسب السيولة والتقلبات ووقت التداول والأخبار الاقتصادية، وقد يتسع أثناء الأحداث المهمة.",
          },
          {
            question:
              "كيف أختار شركة التداول الأقل تكلفة؟",
            answer:
              "قارن متوسط السبريد والعمولة ونوع الحساب وجودة التنفيذ، ثم اختر الحساب الملائم لعدد صفقاتك وحجم تداولك.",
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
                    <h3 className="flex-1 text-right text-sm font-black leading-6 text-slate-950">
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
                    <h3 className="flex-1 text-right text-[13px] font-black leading-6 text-slate-950">
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
                  عرض المزيد من الأسئلة

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
                        <h3 className="flex-1 text-right text-[12px] font-black leading-5 text-slate-950">
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
                href="/learn-trading/spread"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-200 bg-white px-4 text-xs font-black text-brand-600"
              >
                قراءة دليل السبريد الكامل
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