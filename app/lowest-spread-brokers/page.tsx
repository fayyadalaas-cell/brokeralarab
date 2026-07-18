import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import LowestSpreadHeadToHead from "@/app/components/LowestSpreadHeadToHead";

export const metadata: Metadata = {
  title: "أفضل شركات التداول بأقل سبريد 2026",
  description:
    "قارن أفضل شركات التداول بأقل سبريد في 2026 حسب نوع الحساب ومتوسط السبريد والعمولة والحد الأدنى للإيداع، بما يشمل حسابات Standard وRaw وECN وCent.",
  keywords: [
    "أفضل شركات التداول بأقل سبريد",
    "أقل سبريد فوركس",
    "أفضل وسيط سبريد منخفض",
    "أفضل حساب Raw Spread",
    "أفضل حساب Standard",
    "أفضل حسابات ECN",
    "أفضل حسابات Cent",
    "أفضل حسابات إسلامية",
    "lowest spread brokers",
    "lowest spread forex brokers",
  ],
  alternates: {
    canonical: "https://brokeralarab.com/lowest-spread-brokers",
    languages: {
      ar: "https://brokeralarab.com/lowest-spread-brokers",
      "x-default": "https://brokeralarab.com/lowest-spread-brokers",
    },
  },
  openGraph: {
    title: "أفضل شركات التداول بأقل سبريد 2026 | بروكر العرب",
    description:
      "مقارنة أفضل حسابات التداول حسب متوسط السبريد والعمولة والتكلفة الفعلية.",
    url: "https://brokeralarab.com/lowest-spread-brokers",
    type: "website",
    siteName: "بروكر العرب",
    locale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "أفضل شركات التداول بأقل سبريد 2026 | بروكر العرب",
    description:
      "قارن أفضل حسابات Standard وRaw وECN وCent حسب السبريد والعمولة.",
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
  if (!item.broker_slug || !item.account_name) {
    return (
      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-extrabold text-slate-600">
        {item.account_name || "—"}
      </span>
    );
  }

  return (
    <Link
      href={`/brokers/${item.broker_slug}/accounts/${accountSlug(
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

  const groupedByType = ["standard", "raw", "ecn", "cent"]
    .map((type) => {
      const items = accounts
        .filter((account) => account.normalized_account_type === type)
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

  const bestOverall = [...accounts].sort(compareByRealCost).slice(0, 8);

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
    url: "https://brokeralarab.com/lowest-spread-brokers",
    description:
      "مقارنة أفضل شركات التداول بأقل سبريد حسب نوع الحساب ومتوسط السبريد والعمولة.",
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

  const heroWinners = [
    {
      type: "standard",
      label: "أفضل Standard",
      item: bestStandard,
    },
    {
      type: "raw",
      label: "أفضل Raw",
      item: bestRaw,
    },
    {
      type: "ecn",
      label: "أفضل ECN",
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
<section className="overflow-hidden border-b border-slate-200 bg-white">
  <div className="mx-auto max-w-[1520px] px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-9 lg:px-8 lg:py-10 xl:px-10">
    <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.65fr)] lg:gap-10 xl:gap-12">
      {/* HERO CONTENT */}
      <div className="text-right">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-600 sm:py-1.5 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 sm:h-2 sm:w-2" />
          مقارنة حسابات التداول 2026
        </div>

        <h1 className="mt-4 max-w-[920px] text-[30px] font-black leading-[1.18] tracking-[-0.02em] text-slate-950 min-[380px]:text-[32px] sm:text-[46px] sm:leading-[1.12] lg:text-[54px] xl:text-[60px]">
          أفضل شركات التداول
          <span className="mt-1 block text-brand-500">
            بأقل سبريد في 2026
          </span>
        </h1>

        <p className="mt-4 max-w-[820px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          قارن أفضل حسابات التداول حسب{" "}
          <strong className="font-black text-slate-900">
            متوسط السبريد والعمولة والتكلفة الفعلية
          </strong>
          ، مع فصل حسابات Standard وRaw وECN وCent للحصول على مقارنة عادلة
          وواضحة.
        </p>

        <div className="mt-5 grid max-w-[640px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center sm:px-4">
            <div className="text-xl font-black text-slate-950 sm:text-2xl">
              {uniqueBrokerCount}
            </div>

            <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:text-xs">
              شركة مقارنة
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center sm:px-4">
            <div className="text-xl font-black text-slate-950 sm:text-2xl">
              {accounts.length}
            </div>

            <div className="mt-0.5 text-[10px] font-bold text-slate-500 sm:text-xs">
              حساب تداول
            </div>
          </div>

          <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center sm:block">
            <div className="text-2xl font-black text-slate-950">
              {groupedByType.length}
            </div>

            <div className="mt-0.5 text-xs font-bold text-slate-500">
              فئات حسابات
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">
          <a
            href="#account-types"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(30,91,184,0.18)] transition hover:bg-brand-600 sm:w-auto sm:min-w-[220px]"
          >
            قارن حسب نوع الحساب
          </a>

          <a
            href="#head-to-head"
            className="hidden min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 sm:inline-flex sm:min-w-[200px]"
          >
            مقارنة شركة بشركة
          </a>
        </div>
      </div>

      {/* DESKTOP SUMMARY */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50/70 px-5 py-4">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                أفضل حساب في كل فئة
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                خلاصة سريعة لأفضل النتائج
              </p>
            </div>

            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">
              محدثة
            </span>
          </div>

          <div className="divide-y divide-slate-200">
            {heroWinners.map(({ type, label, item }, index) => (
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

                <div className="shrink-0 text-left">
                  <div className="text-[10px] font-extrabold text-brand-600">
                    {label}
                  </div>

                  <div className="mt-0.5 text-xs font-black text-emerald-700">
                    {item.spread || "—"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-5 py-3">
            <p className="text-[11px] leading-5 text-slate-500">
              يعتمد الترتيب على متوسط السبريد والعمولة والتكلفة الفعلية.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* MOBILE QUICK WINNERS */}
    <div className="mt-5 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 lg:hidden">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <h2 className="text-sm font-black text-slate-950">
          أفضل الحسابات سريعًا
        </h2>

        <span className="text-[10px] font-extrabold text-brand-600">
          حسب الفئة
        </span>
      </div>

      <div className="divide-y divide-slate-200">
        {heroWinners.map(({ type, label, item }, index) => (
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

            <div className="shrink-0 text-left">
              <div className="text-[9px] font-extrabold text-brand-600">
                {label}
              </div>

              <div className="mt-0.5 text-[11px] font-black text-emerald-700">
                {item.spread || "—"}
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
  className="scroll-mt-24 pb-8 pt-7 sm:py-10 lg:py-12"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
    {/* SECTION INTRO */}
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-8">
      <div className="max-w-[950px] text-right">
        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
          مقارنة عادلة حسب الفئة
        </span>

        <h2 className="mt-3 max-w-[820px] text-[26px] font-black leading-[1.22] text-slate-950 sm:text-4xl sm:leading-tight">
          مقارنة أقل سبريد حسب نوع الحساب
        </h2>

        <p className="mt-3 max-w-[920px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          لا نقارن حساب Raw بحساب Standard داخل ترتيب واحد، لأن طريقة
          احتساب التكلفة تختلف. لذلك نفصل النتائج حسب نوع الحساب لإظهار
          الأقوى داخل كل فئة.
        </p>
      </div>

      <div className="hidden rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4 text-right lg:block">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-black text-amber-800">
            !
          </span>

          <div className="text-xs font-black text-amber-950">
            انتبه إلى التكلفة الفعلية
          </div>
        </div>

        <p className="mt-2 text-xs leading-6 text-amber-900/80">
          السبريد المنخفض لا يعني دائمًا أن الحساب أرخص، لأن حسابات Raw
          وECN قد تضيف عمولة منفصلة.
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
              <div className="min-w-0 text-right">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-[10px] font-black text-white sm:text-[11px]">
                    {group.shortLabel}
                  </span>

                  <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-extrabold text-slate-600 sm:text-[11px]">
                    {group.recommendation}
                  </span>
                </div>

                <h3 className="mt-3 text-[20px] font-black leading-[1.28] text-slate-950 min-[380px]:text-[21px] sm:text-2xl lg:text-[28px]">
                  أفضل {group.label} من حيث السبريد والتكلفة
                </h3>

                <p className="mt-2 max-w-[920px] text-[13px] leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
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
                      الأفضل في هذه الفئة
                    </div>

                    <div className="mt-0.5 truncate text-sm font-black text-slate-950">
                      {group.winner.broker_name}
                    </div>

                    <div className="mt-0.5 truncate text-[10px] font-extrabold text-slate-500 sm:text-[11px]">
                      {group.winner.account_name || "—"}
                    </div>
                  </div>

                  <div className="shrink-0 border-r border-emerald-200 pr-3 text-left">
                    <div className="text-[9px] font-bold text-slate-500">
                      السبريد
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
              <table className="w-full table-fixed text-right">
               <thead className="bg-slate-100/80">
  <tr className="text-[11px] text-slate-600">
    <th className="w-[7%] px-4 py-3.5 text-center font-black">
      الترتيب
    </th>

    <th className="w-[30%] px-4 py-3.5 font-black">
      الشركة والحساب
    </th>

    <th className="w-[13%] px-4 py-3.5 text-center font-black">
      السبريد
    </th>

    <th className="w-[15%] px-4 py-3.5 text-center font-black">
      العمولة
    </th>

    <th className="w-[13%] px-4 py-3.5 text-center font-black">
      الإيداع
    </th>

    <th className="w-[22%] px-4 py-3.5 text-center font-black">
      الانتقال
    </th>
  </tr>
</thead>

          <tbody>
  {group.items.slice(0, 7).map((item, index) => (
    <tr
      key={item.id}
      className="border-t border-slate-200 bg-white text-sm transition hover:bg-brand-50/30"
    >
      {/* الترتيب */}
      <td className="px-4 py-3 text-center">
        <RankingBadge index={index} />
      </td>

      {/* الشركة والحساب */}
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

              {formatRating(item.broker_rating) ? (
                <span className="text-[10px] font-black text-amber-600">
                  ★ {formatRating(item.broker_rating)}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </td>

      {/* السبريد */}
      <td className="px-4 py-3 text-center">
        <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
          {item.spread || "—"}
        </span>
      </td>

      {/* العمولة */}
      <td className="px-4 py-3 text-center text-xs font-extrabold text-slate-800">
        {item.commission || "—"}
      </td>

      {/* الإيداع */}
      <td className="px-4 py-3 text-center text-xs font-extrabold text-slate-800">
        {item.min_deposit || "—"}
      </td>

      {/* الانتقال */}
      <td className="px-4 py-3">
        <div className="flex justify-center">
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
          <div className="grid gap-3 p-3.5 lg:hidden">
            {group.items
              .slice(0, 2)
              .map((item, index) => {
              
                return (
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
                      <div className="border-l border-slate-200 px-1.5 py-2.5 text-center">
                        <div className="text-[8px] font-extrabold text-slate-500">
                          السبريد
                        </div>

                        <div className="mt-1 text-[11px] font-black leading-5 text-emerald-700">
                          {item.spread || "—"}
                        </div>
                      </div>

                      <div className="border-l border-slate-200 px-1.5 py-2.5 text-center">
                        <div className="text-[8px] font-extrabold text-slate-500">
                          العمولة
                        </div>

                        <div className="mt-1 min-h-[20px] break-words text-[10px] font-black leading-5 text-slate-900">
                          {item.commission || "—"}
                        </div>
                      </div>

                      <div className="px-1.5 py-2.5 text-center">
                        <div className="text-[8px] font-extrabold text-slate-500">
                          الإيداع
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
                );
              })}

            {group.items.length > 2 ? (
              <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50">
                <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-4 py-3 text-xs font-black text-brand-600">
                  عرض باقي الحسابات

                  <span className="transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="grid gap-2.5 border-t border-slate-200 bg-white p-3">
                  {group.items
                    .slice(2, 7)
                   .map((item, index) => {
  return (
                        <div
                          key={item.id}
                          className="rounded-[17px] border border-slate-200 bg-white p-3"
                        >
                          <div className="grid grid-cols-[28px_36px_minmax(0,1fr)] items-center gap-2">
                            <RankingBadge index={index + 2} />

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
                            <div className="border-l border-slate-200 px-1 py-2 text-center">
                              <div className="text-[8px] font-bold text-slate-500">
                                السبريد
                              </div>

                              <div className="mt-0.5 text-[10px] font-black leading-5 text-emerald-700">
                                {item.spread || "—"}
                              </div>
                            </div>

                            <div className="border-l border-slate-200 px-1 py-2 text-center">
                              <div className="text-[8px] font-bold text-slate-500">
                                العمولة
                              </div>

                              <div className="mt-0.5 break-words text-[9px] font-black leading-4 text-slate-900">
                                {item.commission || "—"}
                              </div>
                            </div>

                            <div className="px-1 py-2 text-center">
                              <div className="text-[8px] font-bold text-slate-500">
                                الإيداع
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
                      );
                    })}
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
<div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-4 sm:px-7 sm:py-6">
  <div className="flex items-center justify-between gap-3">
    <div className="min-w-0">
      <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-600 sm:text-[11px]">
        مقارنة مباشرة
      </span>

      <h2 className="mt-2.5 max-w-[850px] text-[23px] font-black leading-[1.25] text-slate-950 min-[380px]:text-[25px] sm:mt-3 sm:text-4xl sm:leading-tight">
        قارن بين شركتين حسب نوع الحساب
      </h2>

      <p className="mt-2 max-w-[900px] text-[12px] leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-8">
        اختر شركتين لمعرفة الحساب الأقل تكلفة داخل كل فئة.
      </p>
    </div>
  </div>
</div>

      {/* COMPARISON COMPONENT */}
      <div className="p-3.5 sm:p-5 lg:p-6">
        <LowestSpreadHeadToHead brokers={brokerSummaries} />
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
          الخلاصة السريعة
        </span>

        <h2 className="mt-3 max-w-[820px] text-[26px] font-black leading-[1.22] text-slate-950 sm:text-4xl sm:leading-tight">
          أفضل وسيط حسب نوع الحساب
        </h2>

        <p className="mt-3 max-w-[950px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          اخترنا الحساب المتصدر داخل كل فئة بناءً على متوسط السبريد
          والعمولة والتكلفة الفعلية، بدل وضع جميع أنواع الحسابات في ترتيب
          واحد غير عادل.
        </p>
      </div>

      {(() => {
        const bestByCategory = [
          {
            title: "أفضل حساب Standard",
            mobileTitle: "أفضل حساب Standard",
            type: "Standard",
            description: "للمبتدئين والتداول اليومي المعتدل",
            item: bestStandard,
          },
          {
            title: "أفضل حساب Raw Spread",
            mobileTitle: "أفضل حساب Raw",
            type: "Raw",
            description: "للسكالبينج والصفقات المتكررة",
            item: bestRaw,
          },
          {
            title: "أفضل حساب ECN",
            mobileTitle: "أفضل حساب ECN",
            type: "ECN",
            description: "لمن يهتم بالتنفيذ والتسعير",
            item: bestEcn,
          },
          {
            title: "أفضل حساب Cent / Micro",
            mobileTitle: "أفضل حساب Cent / Micro",
            type: "Cent",
            description: "للتعلم ورأس المال المحدود",
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
                      لا توجد بيانات كافية لهذه الفئة حاليًا
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
                        لا توجد بيانات كافية لهذه الفئة حاليًا
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

        <h2 className="mt-3 max-w-[270px] text-balance text-[22px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-none min-[380px]:text-[24px] sm:text-4xl sm:leading-tight">
  كيف اخترنا هذه الشركات؟
</h2>

        <p className="mt-2.5 max-w-[290px] text-[12px] leading-[1.9] text-slate-600 min-[380px]:max-w-none sm:mt-3 sm:text-base sm:leading-8">
  نقارن التكلفة الفعلية لكل حساب، ثم نفصل النتائج حسب النوع لضمان مقارنة
  عادلة وواضحة.
</p>

          <div className="mt-4 rounded-[17px] border border-brand-200 bg-white p-3.5 sm:mt-5 sm:p-4">
            <div className="text-sm font-black text-slate-950">
              المعادلة الأساسية
            </div>

            <div className="mt-2 rounded-xl bg-brand-50 px-3 py-2.5 text-center text-[13px] font-black text-brand-700 sm:py-3 sm:text-sm">
  التكلفة الفعلية = السبريد + العمولة
</div>

            <p className="mt-2.5 text-[11px] leading-5 text-slate-500 sm:mt-3 sm:text-xs sm:leading-6">
  نراجع أيضًا نوع الحساب، والإيداع المطلوب، ومدى ملاءمته لطريقة تداولك.
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
                  "نقارن متوسط السبريد المتوقع، وليس فقط أقل رقم يبدأ منه الحساب في الظروف المثالية.",
              },
              {
                number: "02",
                title: "العمولة المنفصلة",
                description:
                  "نضيف العمولة إلى المقارنة، لأن السبريد المنخفض قد لا يعني أن التكلفة النهائية أقل.",
              },
              {
                number: "03",
                title: "نوع الحساب",
                description:
                  "نفصل بين Standard وRaw وECN وCent حتى تتم مقارنة الحسابات المتشابهة فقط.",
              },
              {
                number: "04",
                title: "الحد الأدنى للإيداع",
                description:
                  "نراجع سهولة الوصول للحساب، لأن بعض الحسابات تتطلب إيداعًا مرتفعًا.",
              },
              {
                number: "05",
                title: "أسلوب التداول",
                description:
                  "الحساب المناسب للصفقات السريعة قد لا يكون الأفضل للمبتدئ أو للمتداول طويل الأجل.",
              },
              {
                number: "06",
                title: "وضوح الشروط",
                description:
                  "نفضل الحسابات التي تعرض السبريد والعمولة وشروط التنفيذ بصورة واضحة.",
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
        description: "نعتمد المتوسط المتوقع، وليس أقل رقم إعلاني فقط.",
      },
      {
        number: "02",
        title: "العمولة",
        description: "نضيف العمولة إلى السبريد لمعرفة التكلفة الحقيقية.",
      },
      {
        number: "03",
        title: "نوع الحساب",
        description: "نفصل أنواع الحسابات حتى تكون المقارنة عادلة.",
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
      عوامل إضافية نراجعها

      <span className="transition group-open:rotate-180">
        ▼
      </span>
    </summary>

    <div className="border-t border-brand-200 bg-white px-4 py-3">
      <p className="text-[11px] leading-6 text-slate-600">
        الحد الأدنى للإيداع، ووضوح الشروط، وجودة التنفيذ، ومدى ملاءمة
        الحساب للمبتدئ أو للصفقات المتكررة.
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
    دليل الاختيار
  </span>

 <h2 className="mt-3 max-w-[280px] text-balance text-[22px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-[330px] min-[380px]:text-[24px] sm:max-w-[900px] sm:text-4xl sm:leading-tight">
  كيف تختار الحساب الأنسب لتداولك؟
</h2>

<p className="mt-2.5 max-w-[290px] text-[12px] leading-[1.9] text-slate-600 min-[380px]:max-w-[330px] sm:mt-3 sm:max-w-[950px] sm:text-base sm:leading-8">
  يعتمد الاختيار على خبرتك، وحجم رأس المال، وعدد الصفقات، والتكلفة
  الفعلية.
</p>
</div>

      {/* DESKTOP */}
      <div className="hidden grid-cols-2 gap-4 p-6 md:grid xl:grid-cols-4 lg:p-7">
        {[
          {
            title: "إذا كنت مبتدئًا",
            account: "Standard",
            description:
              "حساب أبسط غالبًا دون عمولة منفصلة، وتكون تكلفة الصفقة أوضح.",
          },
          {
            title: "إذا كنت تتداول صفقات سريعة",
            account: "Raw / ECN",
            description:
              "السبريد المنخفض مهم مع الصفقات المتكررة، لكن يجب احتساب العمولة.",
          },
          {
            title: "إذا كان رأس مالك صغيرًا",
            account: "Cent / Micro",
            description:
              "يسمح بأحجام تداول صغيرة للتجربة والتعلم وإدارة المخاطر.",
          },
          {
            title: "إذا كان هدفك أقل تكلفة",
            account: "Total Cost",
            description:
              "قارن متوسط السبريد والعمولة معًا، ولا تعتمد على الرقم المعلن وحده.",
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
        description: "حساب أبسط غالبًا دون عمولة منفصلة.",
      },
      {
        title: "إذا كنت تتداول صفقات سريعة",
        account: "Raw / ECN",
        description: "سبريد منخفض مع ضرورة احتساب العمولة.",
      },
      {
        title: "إذا كان رأس مالك صغيرًا",
        account: "Cent / Micro",
        description: "أحجام تداول صغيرة للتجربة وإدارة المخاطر.",
      },
      {
        title: "إذا كان هدفك أقل تكلفة",
        account: "Total Cost",
        description: "قارن السبريد والعمولة معًا.",
      },
    ].map((item, index) => (
      <details
        key={item.title}
        className={`group ${
          index > 0 ? "border-t border-slate-200" : ""
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
<div className="mx-3.5 mb-3.5 rounded-[17px] border border-brand-200 bg-brand-50 px-4 py-3.5 sm:mx-7 sm:mb-7 sm:px-5 sm:py-4">
  <div className="grid grid-cols-[30px_minmax(0,1fr)] items-start gap-3">
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-xs font-black text-white">
      ✓
    </span>

    <div>
      <h3 className="text-[13px] font-black text-slate-950 sm:text-base">
        الخلاصة
      </h3>

      <p className="mt-1 text-[11px] leading-6 text-slate-700 sm:text-sm sm:leading-7">
        Standard للبساطة، وRaw أو ECN للصفقات المتكررة، وCent للتجربة
        برأس مال صغير. قارن دائمًا التكلفة الكاملة قبل فتح الحساب.
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
          ملاحظة حول بيانات السبريد
        </h2>
      </div>

      <p className="mt-3 text-[12px] leading-6 text-amber-900/85 sm:text-sm sm:leading-7">
        السبريد متغير وقد يرتفع أثناء الأخبار والتقلبات وضعف السيولة.
        الأرقام المعروضة للمقارنة ولا تضمن بقاء السبريد عند المستوى نفسه.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
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
  className="scroll-mt-24 pb-3 sm:pb-8 lg:pb-12"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-8 xl:px-10">
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
      {/* HEADER */}
      <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-6 sm:px-7">
        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-600 sm:text-[11px]">
          أسئلة المتداولين
        </span>

        <h2 className="mt-3 max-w-[280px] text-[24px] font-black leading-[1.3] tracking-[-0.01em] text-slate-950 min-[380px]:max-w-[310px] min-[380px]:text-[26px] sm:max-w-[850px] sm:text-4xl sm:leading-tight">
  الأسئلة الشائعة حول السبريد
</h2>

        <p className="mt-3 max-w-[900px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
  إجابات مختصرة على أهم الأسئلة المتعلقة بالسبريد والعمولة وأنواع
  حسابات التداول.
</p>
      </div>

      {(() => {
        const faqItems = [
          {
            question: "ما هو السبريد في الفوركس؟",
            answer:
              "السبريد هو الفرق بين سعر الشراء وسعر البيع، ويعد جزءًا أساسيًا من تكلفة فتح الصفقة حتى عندما لا توجد عمولة منفصلة.",
          },
          {
            question: "هل أقل سبريد يعني أن الحساب هو الأرخص؟",
            answer:
              "ليس دائمًا. قد يعرض الحساب سبريدًا منخفضًا لكنه يضيف عمولة، لذلك يجب احتساب السبريد والعمولة معًا.",
          },
          {
            question: "ما الفرق بين Standard وRaw؟",
            answer:
              "حساب Standard يدمج التكلفة عادةً داخل السبريد، بينما يقدم Raw سبريدًا أقل مقابل عمولة منفصلة.",
          },
          {
            question: "هل حساب ECN أفضل من Standard؟",
            answer:
              "يعتمد ذلك على أسلوب التداول. ECN قد يناسب الصفقات المتكررة، بينما Standard أبسط للمبتدئ.",
          },
          {
            question: "ما أفضل حساب للمبتدئين؟",
            answer:
              "يكون Standard مناسبًا غالبًا بسبب بساطته ووضوح تكلفته، مع ضرورة مراجعة الإيداع والتنظيم والدعم.",
          },
          {
            question: "هل حساب Cent مناسب للتداول الحقيقي؟",
            answer:
              "يمكن استخدامه للتعلم والتجربة بأحجام صغيرة، لكنه لا يقدم دائمًا الشروط نفسها المتاحة في الحسابات القياسية.",
          },
          {
            question: "لماذا يتغير السبريد خلال اليوم؟",
            answer:
              "يتغير حسب السيولة والتقلبات ووقت التداول والأخبار الاقتصادية، وقد يتسع أثناء الأحداث المهمة.",
          },
          {
            question: "كيف أختار شركة التداول الأقل تكلفة؟",
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