import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import HeadToHeadCompare from "@/app/components/HeadToHeadCompare";

export const metadata: Metadata = {
  title: "أفضل شركات التداول بأقل سبريد 2026",
  description:
    "مقارنة قوية لأفضل شركات التداول بأقل سبريد في 2026، مع ترتيب أفضل حسابات Standard وRaw وECN وCent، وإبراز الحسابات الإسلامية وأقل تكلفة فعلية.",
  keywords: [
    "أفضل شركات التداول بأقل سبريد",
    "أقل سبريد فوركس",
    "أفضل وسيط سبريد منخفض",
    "أفضل حساب Raw Spread",
    "أفضل حساب Standard",
    "أفضل حسابات ECN",
    "أفضل حسابات إسلامية",
    "Lowest spread brokers",
    "lowest spread forex brokers",
    "best low spread brokers",
  ],
  alternates: {
    canonical: "/lowest-spread-brokers",
  },
  openGraph: {
    title: "أفضل شركات التداول بأقل سبريد 2026 | بروكر العرب",
    description:
      "ترتيب ومقارنة أفضل حسابات التداول حسب متوسط السبريد والعمولة والتكلفة الفعلية.",
    url: "/lowest-spread-brokers",
    type: "website",
    siteName: "بروكر العرب",
    locale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "أفضل شركات التداول بأقل سبريد 2026 | بروكر العرب",
    description:
      "مقارنة أفضل حسابات التداول بأقل سبريد حسب نوع الحساب والتكلفة الفعلية.",
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
  real_account_url: string | null;
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
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeAccountType(value: string | null | undefined) {
  const v = (value || "").toLowerCase().trim();
  if (!v) return "other";
  if (["standard", "raw", "ecn", "zero", "pro", "cent"].includes(v)) return v;
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
  const map: Record<string, string> = {
    standard: "حسابات Standard",
    raw: "حسابات Raw",
    ecn: "حسابات ECN",
    zero: "حسابات Zero",
    pro: "حسابات Pro",
    cent: "حسابات Cent / Micro",
    other: "حسابات أخرى",
  };
  return map[type] || type;
}

function getAccountTypeIntro(type: string) {
  const map: Record<string, string> = {
    standard:
      "هذه الفئة مناسبة لمعظم المتداولين الباحثين عن حسابات بدون عمولة مباشرة مع فروقات أسعار متوازنة نسبيًا.",
    raw:
      "حسابات Raw مناسبة لمن يبحث عن أقل سبريد ممكن مع عمولة منفصلة، وهي شائعة بين متداولي السكالبينج والتنفيذ السريع.",
    ecn:
      "حسابات ECN تستهدف من يريد بيئة تداول أقرب للأسعار الفعلية مع تنفيذ أسرع وهيكل تكلفة مختلف حسب الشركة.",
    cent:
      "حسابات Cent وMicro مناسبة للمبتدئين أو للتجربة برأس مال منخفض، لكنها ليست دائمًا الأفضل من ناحية التكلفة النهائية.",
    other:
      "هذه الفئة تختلف من وسيط إلى آخر، لذلك يجب النظر إلى السبريد والعمولة والحد الأدنى للإيداع معًا.",
  };
  return map[type] || map.other;
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

function buildSpreadSummary(accounts: PreparedAccount[]) {
  const sorted = [...accounts].sort(compareByRealCost);
  const bestRaw = sorted.find((a) => a.normalized_account_type === "raw");
  const bestStandard = sorted.find((a) => a.normalized_account_type === "standard");
  const bestECN = sorted.find((a) => a.normalized_account_type === "ecn");

  const parts: string[] = [];

  if (bestRaw) {
    parts.push(
      `يبدأ أقل سبريد فعلي في هذه الصفحة من ${bestRaw.spread_min ?? 0} نقطة عبر حساب ${bestRaw.account_name} لدى ${bestRaw.broker_name}.`
    );
  }

  if (bestStandard) {
    parts.push(
      `أما أفضل حساب Standard من حيث متوسط السبريد حاليًا فهو ${bestStandard.account_name} لدى ${bestStandard.broker_name} بمتوسط يقارب ${bestStandard.spread_avg} نقطة.`
    );
  }

  if (bestECN) {
    parts.push(
      `وفي فئة ECN يتصدر ${bestECN.broker_name} عبر حساب ${bestECN.account_name} بمتوسط يقارب ${bestECN.spread_avg} نقطة.`
    );
  }

  return parts.join(" ");
}

function getBrokerName(broker: BrokerGenericRow | undefined, brokerId: number) {
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

function getPairWinner(
  a: PreparedAccount | null | undefined,
  b: PreparedAccount | null | undefined
) {
  if (!a && !b) return "—";
  if (a && !b) return a.broker_name;
  if (!a && b) return b.broker_name;
  if (!a || !b) return "—";
  return compareByRealCost(a, b) <= 0 ? a.broker_name : b.broker_name;
}

function compactMoney(value: string | null | undefined) {
  return value || "—";
}

function CompactLogo({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  if (!src) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[10px] font-black text-slate-500">
        LOGO
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function BrokerActionButtons({
  reviewHref,
  accountHref,
}: {
  reviewHref: string | null;
  accountHref: string | null;
}) {
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      {reviewHref ? (
        <Link
          href={reviewHref}
          className="inline-flex items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
        >
          قراءة التقييم
        </Link>
      ) : null}

      {accountHref ? (
        <a
          href={accountHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:border-slate-400"
        >
          فتح حساب حقيقي
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
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-red-200 bg-red-50 p-8 text-right">
          <h1 className="text-2xl font-black text-slate-900">تعذر تحميل بيانات الحسابات</h1>
          <p className="mt-3 text-sm text-slate-600">{accountsError.message}</p>
        </div>
      </main>
    );
  }

  const brokerIds = Array.from(
    new Set((accountsData ?? []).map((row) => row.broker_id).filter(Boolean))
  );

  const { data: brokersData, error: brokersError } = await supabase
    .from("brokers")
    .select("*")
    .in("id", brokerIds);

  if (brokersError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-red-200 bg-red-50 p-8 text-right">
          <h1 className="text-2xl font-black text-slate-900">تعذر تحميل بيانات الشركات</h1>
          <p className="mt-3 text-sm text-slate-600">{brokersError.message}</p>
        </div>
      </main>
    );
  }

  const brokersMap = new Map<number, BrokerGenericRow>(
    ((brokersData ?? []) as BrokerGenericRow[]).map((broker) => [broker.id, broker])
  );

  const accounts: PreparedAccount[] = ((accountsData ?? []) as BrokerAccountRow[]).map((row) => {
    const broker = brokersMap.get(row.broker_id);

    const brokerName = getBrokerName(broker, row.broker_id);
    const brokerSlug = getBrokerSlug(broker);
    const brokerRating = getBrokerRating(broker);
    const brokerLogo = getBrokerLogo(broker);
    const brokerAccountUrl = getBrokerAccountUrl(broker);
    const brokerWebsiteUrl = getBrokerWebsiteUrl(broker);

    const spreadAvg = toNumber(row.spread_avg);
    const commissionValue = toNumber(row.commission_value ?? 0, 0);
    const normalizedType = normalizeAccountType(row.account_type);

    return {
  ...row,
  real_account_url: row.real_account_url,
  broker_name: brokerName,
  broker_slug: brokerSlug,
  broker_rating: brokerRating,
  broker_logo: brokerLogo,
  broker_intro: broker?.intro || null,
  broker_best_for: broker?.best_for || null,
  broker_account_url: brokerAccountUrl,
  broker_website_url: brokerWebsiteUrl,
  broker_islamic_label:
    broker?.islamic_ar ?? broker?.islamic ?? null,
  broker_arabic_support:
    broker?.arabic_support ?? broker?.arabic_sup ?? null,
  normalized_account_type: normalizedType,
  total_cost_score: spreadAvg + commissionValue / 10,
};
  });

  const uniqueBrokerCount = new Set(accounts.map((a) => a.broker_id)).size;
  const bestOverall = [...accounts].sort(compareByRealCost).slice(0, 8);
  const spreadSummary = buildSpreadSummary(accounts);

  const groupedByType = ["standard", "raw", "ecn", "cent"]
    .map((type) => {
      const items = accounts
        .filter((a) => a.normalized_account_type === type)
        .sort(compareByRealCost);

      return {
        type,
        label: getAccountTypeLabel(type),
        intro: getAccountTypeIntro(type),
        winner: items[0] || null,
        items,
      };
    })
    .filter((group) => group.items.length > 0);

  const bestWithoutCommission = [...accounts]
    .filter((a) => toNumber(a.commission_value ?? 0, 0) === 0)
    .sort(compareByRealCost)
    .slice(0, 6);

  const islamicAccounts = [...accounts]
    .filter((a) => Boolean(a.is_islamic_available))
    .sort(compareByRealCost)
    .slice(0, 6);

  const brokerSummaries: BrokerSummary[] = Array.from(
    new Set(accounts.map((a) => a.broker_id))
  )
    .map((brokerId) => {
      const items = accounts.filter((a) => a.broker_id === brokerId).sort(compareByRealCost);
      const first = items[0];
      if (!first) return null;

      return {
        broker_id: brokerId,
        broker_name: first.broker_name,
        broker_slug: first.broker_slug,
        broker_logo: first.broker_logo,
        broker_rating: first.broker_rating,
        broker_account_url: first.broker_account_url,
        broker_website_url: first.broker_website_url,
        best_standard: items.find((i) => i.normalized_account_type === "standard") || null,
        best_raw: items.find((i) => i.normalized_account_type === "raw") || null,
        best_ecn: items.find((i) => i.normalized_account_type === "ecn") || null,
        best_cent: items.find((i) => i.normalized_account_type === "cent") || null,
        best_overall: items[0] || null,
      };
    })
    .filter(Boolean) as BrokerSummary[];

  const comparisonCandidates = [...brokerSummaries]
    .sort((a, b) => {
      const aRating = toNumber(a.broker_rating, 0);
      const bRating = toNumber(b.broker_rating, 0);
      return bRating - aRating;
    })
    .slice(0, 4);

  const pairComparisons = [];
  for (let i = 0; i < comparisonCandidates.length; i += 2) {
    const a = comparisonCandidates[i];
    const b = comparisonCandidates[i + 1];
    if (a && b) {
      pairComparisons.push({ a, b });
    }
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما المقصود بأقل سبريد في شركات التداول؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "المقصود هو أقل فارق سعري بين الشراء والبيع يقدمه الوسيط على نوع حساب معين. لكن يجب النظر أيضًا إلى العمولات لأن بعض الحسابات تعوض انخفاض السبريد بعمولة منفصلة.",
        },
      },
      {
        "@type": "Question",
        name: "هل الحساب ذو السبريد الأقل هو الأفضل دائمًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ليس دائمًا. الأفضلية تعتمد على متوسط السبريد والعمولة وسرعة التنفيذ والحد الأدنى للإيداع ومدى توفر الحساب الإسلامي.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين Standard وRaw وECN؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "حساب Standard غالبًا يأتي بدون عمولة مباشرة لكن بسبريد أعلى نسبيًا، بينما Raw وECN يقدمان سبريدًا أقل عادةً مع عمولة منفصلة لكل لوت.",
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
      "مقارنة قوية لأفضل شركات التداول بأقل سبريد في 2026، مع ترتيب أفضل حسابات Standard وRaw وECN وCent.",
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
    numberOfItems: Math.min(bestOverall.length, 8),
    itemListElement: bestOverall.slice(0, 8).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${item.broker_name} - ${item.account_name || "حساب تداول"}`,
      url:
  item.broker_slug && item.account_name
    ? `https://brokeralarab.com/brokers/${item.broker_slug}/accounts/${accountSlug(item.account_name)}`
    : item.broker_slug
    ? `https://brokeralarab.com/brokers/${item.broker_slug}`
    : "https://brokeralarab.com/lowest-spread-brokers",
    })),
  };

  return (
    <main className="bg-[#f6f8fb] text-slate-900">
            <Script
        id="lowest-spread-brokers-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="lowest-spread-brokers-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="lowest-spread-brokers-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Script
        id="lowest-spread-brokers-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

  <section className="border-b border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
    <div className="grid items-center gap-10 lg:grid-cols-[1.34fr_0.66fr]">
      {/* RIGHT SIDE */}
      <div className="text-right">
        <h1 className="text-[34px] font-black leading-[1.1] tracking-[-0.02em] text-slate-950 sm:text-[50px] lg:text-[64px]">
          أفضل شركات التداول
          <br />
          <span className="text-brand-500">بأقل سبريد في 2026</span>
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          مقارنة احترافية لأفضل حسابات التداول حسب التكلفة الفعلية
          <span className="font-bold text-slate-900"> (السبريد + العمولة) </span>
          مع إبراز أفضل حسابات Standard وRaw وECN لمساعدتك على اختيار الحساب الأنسب.
        </p>

        <div className="mt-6 flex w-full justify-center lg:justify-start">
  <div className="flex w-full max-w-[340px] flex-col items-center gap-3 sm:max-w-none sm:w-auto sm:flex-row-reverse lg:ml-auto">
    <a
      href="#account-types"
      className="inline-flex w-full sm:w-auto min-w-[220px] items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
    >
      مقارنة حسب نوع الحساب
    </a>

    <a
      href="#head-to-head"
      className="inline-flex w-full sm:w-auto min-w-[220px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:border-slate-400"
    >
      مقارنة شركة بشركة
    </a>
  </div>
</div>
</div>

      {/* LEFT SIDE */}
<div
  dir="rtl"
  className="hidden w-full max-w-[430px] mr-auto overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] lg:block"
>
  {/* HEADER */}
  <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf7_0%,#f8fafc_100%)] px-5 py-4 text-right">


    <h2 className="text-lg font-black text-slate-950">
      أفضل الحسابات
    </h2>

    <p className="mt-3 text-[13px] leading-7 text-slate-600">
    مقارنة سريعة لأفضل حسابات التداول حسب نوع الحساب، مع إبراز الحسابات المناسبة
    للسبريد المنخفض والتكلفة الفعلية للمتداولين.
  </p>
  </div>

  {/* TABLE */}
  <div className="px-4 py-4">
    <div className="overflow-hidden rounded-[22px] border border-slate-200">
  {/* HEADER ROW */}
  <div className="grid grid-cols-[70px_1fr_1.2fr_1fr] items-center gap-3 bg-[#f8fafc] px-4 py-3 text-[11px] font-extrabold text-slate-500 text-right">
    <div className="text-center">الشعار</div>
    <div>الحساب</div>
    <div>الشركة</div>
    <div>الفئة</div>
  </div>

  {[
    {
      shortLabel: "Raw",
      best: accounts
        .filter((acc) => acc.normalized_account_type === "raw")
        .sort(compareByRealCost)[0],
    },
    {
      shortLabel: "Standard",
      best: accounts
        .filter((acc) => acc.normalized_account_type === "standard")
        .sort(compareByRealCost)[0],
    },
    {
      shortLabel: "ECN",
      best: accounts
        .filter((acc) => acc.normalized_account_type === "ecn")
        .sort(compareByRealCost)[0],
    },
  ].map((item) => {
    const best = item.best;
    const brokerName = best?.broker_name || "غير متوفر";
    const accountName = best?.account_name || "—";

    return (
      <div
        key={item.shortLabel}
        className="grid grid-cols-[70px_1fr_1.2fr_1fr] items-center gap-3 border-t border-slate-200 px-4 py-3 text-right hover:bg-slate-50"
      >
        {/* logo */}
        <div className="flex justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white p-1">
            {best?.broker_logo ? (
              <img
                src={best.broker_logo}
                alt={brokerName}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-[10px] text-slate-400">—</span>
            )}
          </div>
        </div>

        {/* account */}
        <div className="text-right">
          {best?.broker_slug && best?.account_name ? (
  <Link
    href={`/brokers/${best.broker_slug}/accounts/${accountSlug(best.account_name)}`}
    className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-extrabold text-brand-600 transition hover:bg-brand-500 hover:text-white"
  >
    {accountName}
  </Link>
) : (
  <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-extrabold text-brand-600">
    {accountName}
  </span>
)}
        </div>

        {/* broker */}
        <div className="truncate text-[15px] font-black text-slate-950 text-right">
          {brokerName}
        </div>

        {/* category */}
        <div className="font-bold text-slate-700 text-right">
          {item.shortLabel}
        </div>
      </div>
    );
  })}
</div>

    {/* FOOTER NOTE */}
      
    
  </div>
</div>
    </div>
  </div>
</section>

      {/* ACCOUNT TYPES */}
      <section id="account-types" className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 lg:px-8">
        <div className="w-full text-right">
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
            مقارنة أقل سبريد حسب نوع الحساب
          </h2>
          <p className="mt-2 text-[15px] leading-7 text-slate-600 whitespace-normal">
  لتكون المقارنة عادلة، قمنا بفصل الترتيب حسب نوع الحساب. فمقارنة حساب Raw مع Standard بشكل مباشر قد تكون مضللة، لذلك ستجد أدناه أفضل الشركات في كل فئة على حدة.
</p>
        </div>

        <div className="mt-8 space-y-8">
          {groupedByType.map((group) => (
            <section
              key={group.type}
              className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="p-5 sm:p-7">
                

                <div className="text-right">
                  

                  <h3 className="text-2xl font-black text-slate-950 sm:text-3xl">
                    أفضل {group.label} من حيث السبريد والتكلفة
                  </h3>

                  <p className="mt-3 text-base leading-8 text-slate-600">
                    {group.intro}
                  </p>

                  {/* Desktop Table */}
                  <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:block">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-right">
                        <thead className="bg-slate-50">
                         <tr className="text-sm text-slate-600">
                            <th className="px-4 py-4 font-extrabold">الترتيب</th>
                            <th className="px-4 py-4 font-extrabold">الشركة</th>
                            <th className="px-4 py-4 font-extrabold">الحساب</th>
                            <th className="px-4 py-4 font-extrabold">السبريد</th>
                            <th className="px-4 py-4 font-extrabold">العمولة</th>
                            <th className="px-4 py-4 font-extrabold">الإيداع</th>
                            <th className="w-[220px] px-4 py-4 text-center font-extrabold">الرابط</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.items.slice(0, 7).map((item, index) => (
                            <tr
  key={item.id}
  className="border-t border-slate-200 text-sm text-slate-700 transition-colors hover:bg-slate-50/80"
>
                              <td className="px-4 py-4">
                                <span
                                  className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${
                                    index === 0
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  #{index + 1}
                                </span>
                              </td>
                              <td className="px-4 py-4 font-black text-slate-950">
                                {item.broker_name}
                              </td>
                              <td className="px-4 py-4">
  {item.broker_slug && item.account_name ? (
    <Link
      href={`/brokers/${item.broker_slug}/accounts/${accountSlug(item.account_name)}`}
      className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600 transition hover:bg-brand-500 hover:text-white"
    >
      {item.account_name}
    </Link>
  ) : (
    "—"
  )}
</td>
                              <td className="px-4 py-4">
                                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                                  {item.spread || "—"}
                                </span>
                              </td>
                              <td className="px-4 py-4">{item.commission || "—"}</td>
                              <td className="px-4 py-4">{item.min_deposit || "—"}</td>
                             <td className="px-4 py-4">
  <div
    className={`flex ${
      item.broker_account_url ? "justify-end gap-2" : "justify-center"
    }`}
  >
    {item.broker_account_url ? (
      <>
        {item.broker_slug && (
          <Link
            href={`/brokers/${item.broker_slug}`}
            className="inline-flex min-w-[88px] items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 transition hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
          >
            التقييم
          </Link>
        )}

        <a
          href={item.broker_account_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-[94px] items-center justify-center rounded-xl bg-brand-500 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition hover:bg-brand-600"
        >
          فتح حساب
        </a>
      </>
    ) : (
      item.broker_slug && (
        <Link
          href={`/brokers/${item.broker_slug}`}
          className="inline-flex w-[140px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
        >
          التقييم
        </Link>
      )
    )}
  </div>
</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                 {/* Mobile Cards */}
<div className="mt-5 grid gap-3 lg:hidden">
  {group.items.slice(0, 3).map((item, index) => (
    <div
      key={item.id}
      className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
    >
      <div className="p-4">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CompactLogo src={item.broker_logo} alt={item.broker_name} />
            <div className="min-w-0 text-right">
              <div className="truncate text-[15px] font-black text-slate-950">
                {item.broker_name}
              </div>
             {item.broker_slug && item.account_name ? (
  <Link
    href={`/brokers/${item.broker_slug}/accounts/${accountSlug(item.account_name)}`}
    className="mt-0.5 inline-flex text-sm font-bold text-brand-600 hover:text-brand-600"
  >
    {item.account_name}
  </Link>
) : (
  <div className="mt-0.5 text-sm font-bold text-slate-500">—</div>
)}
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
              index === 0
                ? "bg-amber-100 text-amber-800"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            #{index + 1}
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center">
            <div className="text-[10px] font-bold text-slate-500">السبريد</div>
            <div className="mt-1 text-[13px] font-black text-emerald-700">
              {item.spread || "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center">
            <div className="text-[10px] font-bold text-slate-500">العمولة</div>
            <div className="mt-1 text-[13px] font-black text-slate-950">
              {item.commission || "—"}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center">
            <div className="text-[10px] font-bold text-slate-500">الإيداع</div>
            <div className="mt-1 text-[13px] font-black text-slate-950">
              {item.min_deposit || "—"}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {item.broker_account_url ? (
            <>
              <a
                href={item.broker_account_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
              >
                فتح حساب
              </a>

              {item.broker_slug ? (
                <Link
                  href={`/brokers/${item.broker_slug}`}
                  className="inline-flex min-w-[96px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
                >
                  التقييم
                </Link>
              ) : null}
            </>
          ) : item.broker_slug ? (
            <Link
              href={`/brokers/${item.broker_slug}`}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
            >
              قراءة التقييم
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  ))}
</div>
</div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <HeadToHeadCompare brokers={brokerSummaries} />

      {/* BEST BROKER BY CATEGORY */}
<section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7">
    <div className="max-w-3xl text-right">
      <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
        أفضل وسيط حسب نوع الحساب
      </h2>
      <p className="mt-3 hidden text-base text-slate-600 lg:block whitespace-nowrap">
        هذه الخلاصة السريعة تعرض أفضل وسيط في كل نوع حساب بناءً على متوسط السبريد
        والتكلفة الفعلية، حتى تصل إلى الخيار الأنسب بسرعة.
      </p>
    </div>

    {(() => {
      const bestByCategory = [
        {
          title: "أفضل حساب Standard",
          badge: "Standard",
          item: accounts
            .filter((acc) => acc.normalized_account_type === "standard")
            .sort((a, b) => a.total_cost_score - b.total_cost_score)[0],
        },
        {
          title: "أفضل حساب Raw",
          badge: "Raw",
          item: accounts
            .filter((acc) => acc.normalized_account_type === "raw")
            .sort((a, b) => a.total_cost_score - b.total_cost_score)[0],
        },
        {
          title: "أفضل حساب ECN",
          badge: "ECN",
          item: accounts
            .filter((acc) => acc.normalized_account_type === "ecn")
            .sort((a, b) => a.total_cost_score - b.total_cost_score)[0],
        },
        {
          title: "أفضل حساب Cent / Micro",
          badge: "Cent",
          item: accounts
            .filter((acc) => acc.normalized_account_type === "cent")
            .sort((a, b) => a.total_cost_score - b.total_cost_score)[0],
        },
      ];

      return (
        <>
          {/* Desktop */}
          <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
            {bestByCategory.map((card, index) => (
              <div
                key={card.badge}
                className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50"
              >
                <div className="p-4 text-right">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-black text-slate-900">{card.title}</div>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold ${
                        index === 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {card.item ? (
                    <>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <CompactLogo
                          src={card.item.broker_logo}
                          alt={card.item.broker_name}
                        />

                        <div className="min-w-0 flex-1 text-right">
                          <div className="truncate text-lg font-black text-slate-950">
                            {card.item.broker_name}
                          </div>
                          {card.item.broker_slug && card.item.account_name ? (
  <Link
    href={`/brokers/${card.item.broker_slug}/accounts/${accountSlug(card.item.account_name)}`}
    className="mt-1 inline-flex text-sm font-bold text-brand-600 hover:text-brand-600"
  >
    {card.item.account_name}
  </Link>
) : (
  <div className="mt-1 text-sm text-slate-500">—</div>
)}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
                          <div className="text-[10px] font-bold text-slate-500">
                            العمولة
                          </div>
                          <div className="mt-1 text-sm font-black text-slate-950">
                            {card.item.commission || "—"}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
                          <div className="text-[10px] font-bold text-slate-500">
                            متوسط السبريد
                          </div>
                          <div className="mt-1 text-sm font-black text-emerald-700">
                            {card.item.spread_avg ?? "—"}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        {card.item.broker_slug ? (
                          <Link
                            href={`/brokers/${card.item.broker_slug}`}
                            className={`inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold transition ${
                              card.item.broker_account_url
                                ? "min-w-[105px] border border-slate-200 bg-white text-slate-700 hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
                                : "w-full bg-brand-500 text-white hover:bg-brand-600"
                            }`}
                          >
                            التقييم
                          </Link>
                        ) : null}

                        {card.item.broker_account_url ? (
                          <a
                            href={card.item.broker_account_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                          >
                            فتح حساب
                          </a>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-sm font-bold text-slate-500">
                      لا توجد بيانات كافية في هذه الفئة حاليًا
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="mt-6 space-y-3 md:hidden">
            {bestByCategory.map((card, index) => (
              <details
                key={card.badge}
                className="group overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-right">
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <div className="min-w-0 text-right">
                      <div className="text-sm font-black text-slate-950">
                        {card.title}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {card.item?.broker_name || "غير متوفر"}
                      </div>
                    </div>

                    <span
                      className={`inline-flex shrink-0 rounded-full px-3 py-1 text-[11px] font-extrabold ${
                        index === 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-slate-200 bg-white p-4">
                  {card.item ? (
                    <>
                      <div className="flex items-center justify-between gap-3">
                        <CompactLogo
                          src={card.item.broker_logo}
                          alt={card.item.broker_name}
                        />

                        <div className="min-w-0 flex-1 text-right">
                          <div className="truncate text-base font-black text-slate-950">
                            {card.item.broker_name}
                          </div>
                          {card.item.broker_slug && card.item.account_name ? (
  <Link
    href={`/brokers/${card.item.broker_slug}/accounts/${accountSlug(card.item.account_name)}`}
    className="mt-1 inline-flex text-sm font-bold text-brand-600 hover:text-brand-600"
  >
    {card.item.account_name}
  </Link>
) : (
  <div className="mt-1 text-sm text-slate-500">—</div>
)}
                        </div>
                      </div>

                      <div className="mt-4 overflow-hidden rounded-[18px] border border-slate-200">
                        <div className="grid grid-cols-3 bg-slate-50 text-center text-[11px] font-extrabold text-slate-500">
                          <div className="px-3 py-2">العمولة</div>
                          <div className="border-x border-slate-200 px-3 py-2">السبريد</div>
                          <div className="px-3 py-2">الوسيط</div>
                        </div>

                        <div className="grid grid-cols-3 text-center text-sm font-black text-slate-950">
                          <div className="px-3 py-3">{card.item.commission || "—"}</div>
                          <div className="border-x border-slate-200 px-3 py-3 text-emerald-700">
                            {card.item.spread_avg ?? "—"}
                          </div>
                          <div className="px-3 py-3">{card.item.broker_name}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        {card.item.broker_slug ? (
                          <Link
                            href={`/brokers/${card.item.broker_slug}`}
                            className={`inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold transition ${
                              card.item.broker_account_url
                                ? "min-w-[96px] border border-slate-200 bg-white text-slate-700 hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600"
                                : "w-full bg-brand-500 text-white hover:bg-brand-600"
                            }`}
                          >
                            التقييم
                          </Link>
                        ) : null}

                        {card.item.broker_account_url ? (
                          <a
                            href={card.item.broker_account_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600"
                          >
                            فتح حساب
                          </a>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm font-bold text-slate-500">
                      لا توجد بيانات كافية في هذه الفئة حاليًا
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
</section>

{/* HOW WE CHOSE THESE BROKERS */}
<section dir="rtl" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
    <div className="p-5 sm:p-7">
      <div className="w-full text-right">
  <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
    كيف اخترنا هذه الشركات؟
  </h2>
  <p className="mt-3 hidden text-base text-slate-600 lg:block whitespace-nowrap">
    لا نعتمد فقط على أقل رقم تسويقي يعلنه الوسيط، بل ننظر إلى التكلفة الفعلية للحساب وتجربة المستخدم والعوامل التي تؤثر فعلاً على المتداول.
  </p>
  <p className="mt-3 text-base leading-8 text-slate-600 lg:hidden">
    لا نعتمد فقط على أقل رقم تسويقي يعلنه الوسيط، بل ننظر إلى التكلفة الفعلية
    للحساب وتجربة المستخدم والعوامل التي تؤثر فعلاً على المتداول.
  </p>
</div>

      {/* Desktop / Tablet */}
      <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "متوسط السبريد",
            desc: "نعتمد على متوسط السبريد الفعلي لكل نوع حساب، وليس فقط أقل رقم يبدأ منه الوسيط في الإعلانات.",
            icon: "01",
          },
          {
            title: "العمولة",
            desc: "بعض الحسابات تقدم سبريدًا منخفضًا جدًا لكن تضيف عمولة منفصلة، لذلك نقارن التكلفة الكاملة معًا.",
            icon: "02",
          },
          {
            title: "نوع الحساب",
            desc: "نفصل بين Standard وRaw وECN وCent حتى تكون المقارنة عادلة ولا يختلط حساب احترافي بحساب مبتدئين.",
            icon: "03",
          },
          {
            title: "الحد الأدنى للإيداع",
            desc: "نهتم أيضًا بمدى واقعية الحساب للمتداول العربي من حيث إمكانية البدء برأس مال صغير أو متوسط.",
            icon: "04",
          },
        ].map((item) => (
          <div
            key={item.icon}
            className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 text-right transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
          >
            {/* 🔥 هذا هو الجزء المهم */}
            <div className="w-full text-right">
  <div className="inline-flex items-center gap-2 float-right">
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-sm font-black text-brand-600">
      {item.icon}
    </span>

    <h3 className="text-xl font-black text-slate-950">
      {item.title}
    </h3>
  </div>
</div>
<div className="clear-both" />

            <p className="mt-4 text-sm leading-7 text-slate-600 text-right">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="mt-5 space-y-3 md:hidden">
        {[
          {
            title: "متوسط السبريد",
            desc: "نعتمد على متوسط السبريد الفعلي لكل نوع حساب، وليس فقط أقل رقم يبدأ منه الوسيط في الإعلانات.",
            icon: "01",
          },
          {
            title: "العمولة",
            desc: "بعض الحسابات تقدم سبريدًا منخفضًا جدًا لكن تضيف عمولة منفصلة، لذلك نقارن التكلفة الكاملة معًا.",
            icon: "02",
          },
          {
            title: "نوع الحساب",
            desc: "نفصل بين Standard وRaw وECN وCent حتى تكون المقارنة عادلة ولا يختلط حساب احترافي بحساب مبتدئين.",
            icon: "03",
          },
          {
            title: "الحد الأدنى للإيداع",
            desc: "نهتم أيضًا بمدى واقعية الحساب للمتداول العربي من حيث إمكانية البدء برأس مال صغير أو متوسط.",
            icon: "04",
          },
        ].map((item) => (
          <details
            key={item.icon}
            className="group overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-right">
              
              {/* 🔥 نفس الفكرة هنا */}
              <div className="w-full text-right">
  <div className="inline-flex items-center gap-2 float-right">
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-sm font-black text-brand-600">
      {item.icon}
    </span>

    <h3 className="text-lg font-black text-slate-950">
      {item.title}
    </h3>
  </div>
</div>
<div className="clear-both" />

              <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
                ▼
              </span>
            </summary>

            <div className="border-t border-slate-200 bg-white px-4 py-4 text-right">
              <p className="text-sm leading-7 text-slate-600">
                {item.desc}
              </p>
            </div>
          </details>
        ))}
      </div>

      {/* Note - desktop only */}
      <div className="mt-6 hidden md:block rounded-[18px] border border-brand-100 bg-[#f1f6ff] px-5 py-3.5">
  <div className="flex items-start justify-between gap-4">
    <div className="text-right">
      <h3 className="text-base font-black text-slate-950">
        ملاحظة مهمة
      </h3>
          <p className="mt-1 text-sm text-slate-600 whitespace-nowrap">
            الوسيط الأفضل لمتداول السكالبينج قد لا يكون هو نفسه الأفضل للمبتدئ،
            لذلك تم بناء هذه الصفحة على مستوى نوع الحساب نفسه حتى تحصل على أفضل مقارنة
            .
          </p>
        </div>

       
      </div>
      </div>
    </div>
  </div>
</section>

{/* HOW TO CHOOSE THE RIGHT ACCOUNT */}
<section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
    <div className="p-5 sm:p-7">
      <div className="max-w-4xl text-right">
        <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
          كيف تختار الحساب المناسب؟
        </h2>
        <p className="mt-3 text-base leading-8 text-slate-600">
          نوع الحساب المناسب لا يعتمد فقط على أقل سبريد، بل على أسلوب تداولك،
          حجم رأس المال، وهل تفضّل العمولة المنفصلة أم التكلفة المدمجة داخل السبريد.
        </p>
      </div>

      <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4 [direction:rtl]">
        {[
  {
    title: "إذا كنت تركز على التكلفة",
    badge: "Spread + Commission",
    desc: "لا تنظر إلى السبريد وحده. قارن دائمًا بين متوسط السبريد والعمولة معًا، لأن بعض الحسابات تبدو أرخص لكنها أعلى تكلفة فعليًا.",
  },
  {
    title: "إذا كان رأس المال صغيرًا",
    badge: "Cent / Micro",
    desc: "حسابات Cent وMicro مناسبة للتجربة أو لإدارة مخاطرة منخفضة جدًا، لكنها ليست دائمًا الأفضل من حيث الجودة أو التكلفة على المدى الطويل.",
  },
  {
    title: "إذا كنت سكالبير",
    badge: "Raw / ECN",
    desc: "متداولو السكالبينج يحتاجون عادةً سبريدًا أقل وتنفيذًا أسرع، لذلك تكون حسابات Raw أو ECN أنسب غالبًا من الحسابات القياسية.",
  },
  {
    title: "إذا كنت مبتدئًا",
    badge: "Standard",
    desc: "ابدأ عادةً بحساب Standard إذا كنت تريد تجربة أبسط، بدون تعقيد العمولات المنفصلة، ومع فهم أوضح للتكلفة الإجمالية.",
  },
].map((item, index) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 text-right transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center justify-between gap-3">
              

              <h3 className="text-xl font-black text-slate-950">
                {item.title}
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

{/* Mobile */}
<div className="mt-5 space-y-3 md:hidden">
  {[
    {
      title: "إذا كنت مبتدئًا",
      desc: "ابدأ عادةً بحساب Standard إذا كنت تريد تجربة أبسط، بدون تعقيد العمولات المنفصلة، ومع فهم أوضح للتكلفة الإجمالية.",
    },
    {
      title: "إذا كنت سكالبير",
      desc: "متداولو السكالبينج يحتاجون عادةً سبريدًا أقل وتنفيذًا أسرع، لذلك تكون حسابات Raw أو ECN أنسب غالبًا من الحسابات القياسية.",
    },
    {
      title: "إذا كان رأس المال صغيرًا",
      desc: "حسابات Cent وMicro مناسبة للتجربة أو لإدارة مخاطرة منخفضة جدًا، لكنها ليست دائمًا الأفضل من حيث الجودة أو التكلفة على المدى الطويل.",
    },
    {
      title: "إذا كنت تركز على التكلفة",
      desc: "لا تنظر إلى السبريد وحده. قارن دائمًا بين متوسط السبريد والعمولة معًا، لأن بعض الحسابات تبدو أرخص لكنها أعلى تكلفة فعليًا.",
    },
  ].map((item) => (
    <details
      key={item.title}
      className="group overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-right">
        <h3 className="text-lg font-black text-slate-950">
          {item.title}
        </h3>

        <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
          ▼
        </span>
      </summary>

      <div className="border-t border-slate-200 bg-white px-4 py-4 text-right">
        <p className="text-sm leading-7 text-slate-600">
          {item.desc}
        </p>
      </div>
    </details>
  ))}
</div>

      <div className="mt-6 hidden md:block rounded-[22px] border border-emerald-100 bg-emerald-50 px-5 py-4 text-right">
        <h3 className="text-base font-black text-slate-950">
          الخلاصة السريعة
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-700">
          الحساب الأفضل ليس نفسه لكل متداول. المبتدئ قد يستفيد من Standard،
          بينما السكالبير غالبًا يبحث عن Raw أو ECN، والمتداول برأس مال صغير قد يفضّل Cent.
          لذلك هذه الصفحة تقارن بين الفئات بدل جمعها في ترتيب واحد مضلل.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* FAQ */}
<section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
    
    <div className="p-5 sm:p-7">
      
      <div className="max-w-3xl text-right">
        <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
          الأسئلة الشائعة حول السبريد
        </h2>
        <p className="mt-3 text-base leading-8 text-slate-600">
          هذه أهم الأسئلة التي يبحث عنها المتداولون حول السبريد، الفرق بين الحسابات،
          وكيف تختار الوسيط الأقل تكلفة فعليًا.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {[
          {
            q: "ما هو السبريد في الفوركس؟",
            a: "السبريد هو الفرق بين سعر الشراء وسعر البيع. وهو التكلفة الأساسية التي يدفعها المتداول عند فتح الصفقة، حتى لو لم تكن هناك عمولة منفصلة.",
          },
          {
            q: "هل السبريد المنخفض يعني دائمًا تكلفة أقل؟",
            a: "ليس دائمًا. بعض الحسابات تقدم سبريد منخفض جدًا لكنها تضيف عمولة منفصلة، لذلك يجب حساب التكلفة الكاملة (السبريد + العمولة) وليس السبريد فقط.",
          },
          {
            q: "ما الفرق بين حساب Standard وRaw وECN؟",
            a: "حساب Standard يكون السبريد فيه مدمج بدون عمولة غالبًا. أما حسابات Raw وECN فتقدم سبريد منخفض جدًا مع عمولة منفصلة، وتناسب المتداولين المحترفين أو السكالبينج.",
          },
          {
            q: "ما هو أفضل نوع حساب للمبتدئين؟",
            a: "عادةً حساب Standard هو الأنسب للمبتدئين لأنه أبسط من حيث الفهم ولا يحتوي على عمولات معقدة، مما يسهل حساب التكلفة الإجمالية.",
          },
          {
            q: "هل حساب Cent مناسب للتداول الحقيقي؟",
            a: "حساب Cent مناسب للتجربة أو رأس المال الصغير جدًا، لكنه ليس الأفضل دائمًا من حيث جودة التنفيذ أو السبريد مقارنة بالحسابات الاحترافية.",
          },
          {
            q: "كيف أختار الوسيط الأقل تكلفة؟",
            a: "لا تعتمد على السبريد فقط. قارن بين متوسط السبريد، العمولة، نوع الحساب، وجودة التنفيذ، لأن الوسيط الأرخص فعليًا هو من يقدم أقل تكلفة إجمالية وليس أقل رقم تسويقي.",
          },
        ].map((item, index) => (
          <details
            key={index}
            className="group overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-right">
              
              <h3 className="text-lg font-black text-slate-950">
                {item.q}
              </h3>

              <span className="shrink-0 text-slate-400 transition group-open:rotate-180">
                ▼
              </span>
            </summary>

            <div className="border-t border-slate-200 bg-white px-4 py-4 text-right">
              <p className="text-sm leading-7 text-slate-600">
                {item.a}
              </p>
            </div>
          </details>
        ))}
      </div>

    </div>
  </div>
</section>
    </main>
  );
}