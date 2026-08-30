import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SmoothFollowSidebar from "@/app/components/SmoothFollowSidebar";

export const dynamic = "force-dynamic";

const BASE_URL = "https://brokeralarab.com";
const OG_IMAGE = `${BASE_URL}/og-image.webp`;

type PageProps = {
  params: Promise<{ country: string }>;
};

type CountryPage = {
  id: number;
  slug: string;
  country_code: string | null;
  country_name_ar: string;
  country_name_en: string;
  flag_emoji: string | null;
  currency: string | null;
  regulator_name: string | null;
  regulator_url: string | null;
  hero_title: string | null;
  hero_description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  intro_badge: string | null;
  local_trading_summary: string | null;
  hero_intro: string | null;
  risk_warning: string | null;
  comparison_intro: string | null;
  last_updated: string | null;
  ar_enabled: boolean | null;
  en_enabled: boolean | null;
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short?: string | null;
  best_for: string | null;
  pros: string | null;
  real_account_url: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
};

type RankingRow = {
  id: number;
  rank_position: number;
  country_rating: number | null;
  best_for: string | null;
  local_note: string | null;
  featured: boolean | null;
  brokers: Broker | Broker[] | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
  account_type: string | null;
  spread_avg?: number | null;
  spread_min?: number | null;
  sort_order?: number | null;
};

type SourceLink = {
  name?: string;
  url?: string;
};

type ContentBlock = {
  id: number;
  country_id: number;
  locale: string | null;
  section_key: string;
  title: string;
  content: string;
  summary: string | null;
  bullets: string[] | null;
  eyebrow: string | null;
  short_answer: string | null;
  target_queries: string[] | null;
  source_links: SourceLink[] | null;
  cta_label: string | null;
  cta_url: string | null;
  sort_order: number | null;
  block_slug: string | null;
  layout_variant: string | null;
  updated_at: string | null;
};

type FaqRow = {
  id: number;
  country_id: number;
  locale: string | null;
  question: string;
  answer: string;
  sort_order: number | null;
  link_label: string | null;
  link_url: string | null;
  target_queries: string[] | null;
  source_links: SourceLink[] | null;
  updated_at: string | null;
};

type PaymentMethod = {
  id: number;
  country_id: number;
  locale: string | null;
  method_name: string;
  icon_name: string | null;
  description: string | null;
  supported: boolean | null;
  sort_order: number | null;
};

function oneBroker(value: Broker | Broker[] | null): Broker | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

function normalizeText(value: string | null | undefined, fallback = "") {
  return value?.trim() || fallback;
}

function cleanText(value: string | null | undefined) {
  return normalizeText(value).replace(/\s+/g, " ").trim();
}

function short(value: string | null | undefined, max = 160) {
  const text = cleanText(value);
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

function paragraphs(value: string | null | undefined) {
  return normalizeText(value)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function splitValues(value: string | null | undefined, limit = 4) {
  return normalizeText(value)
    .split(/\|\||\||,|\/|;|\n|،/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function formatRating(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return Number(value).toFixed(2);
}

function formatUpdated(value: string | null | undefined) {
  if (!value) return "محدث باستمرار";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function money(value: number | null | undefined) {
  if (value === null || value === undefined) return "غير محدد";
  return `$${value}`;
}

/**
 * عنوان ديناميكي صحيح لغويًا لعدد الوسطاء.
 *
 * 1  → أفضل شركة لتداول الفوركس في اليمن
 * 2  → أفضل شركتين لتداول الفوركس في اليمن
 * 3+ → أفضل 3 شركات لتداول الفوركس في الكويت
 */
function forexRankingTitle(count: number, countryName: string) {
  if (count === 1) {
    return `أفضل شركة لتداول الفوركس في ${countryName}`;
  }

  if (count === 2) {
    return `أفضل شركتين لتداول الفوركس في ${countryName}`;
  }

  return `أفضل ${count} شركات لتداول الفوركس في ${countryName}`;
}

function brokerHref(broker: Broker) {
  return broker.slug ? `/brokers/${broker.slug}` : "/brokers";
}

function realHref(broker: Broker) {
  if (broker.slug && broker.real_account_url) {
    return `/go/${broker.slug}?type=real&source=country-page`;
  }

  return brokerHref(broker);
}

function accountSlug(value: string | null | undefined) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function accountHref(broker: Broker, account: BrokerAccount | null) {
  if (!broker.slug || !account?.account_name) return brokerHref(broker);
  const slug = accountSlug(account.account_name);
  return slug
    ? `/brokers/${broker.slug}/accounts/${slug}`
    : brokerHref(broker);
}

function normalizeAccountSearchValue(
  value: string | null | undefined,
) {
  return normalizeText(value)
    .toLowerCase()
    .trim();
}

function findAccount(
  accounts: BrokerAccount[],
  brokerId: number,
  accountTypes: string[],
  excludedAccountIds: number[] = [],
  allowFallback = false,
) {
  const keywords = accountTypes.map(
    normalizeAccountSearchValue,
  );

  const rows = accounts.filter(
    (row) =>
      Number(row.broker_id) === Number(brokerId) &&
      !excludedAccountIds.includes(row.id),
  );

  const found = rows.find((row) => {
    const searchableValue =
      `${row.account_type || ""} ${row.account_name || ""}`
        .toLowerCase()
        .trim();

    return keywords.some((keyword) =>
      searchableValue.includes(keyword),
    );
  });

  if (found) {
    return found;
  }

  return allowFallback
    ? rows[0] ?? null
    : null;
}

function accountSpread(account: BrokerAccount | null) {
  if (!account) return "غير محدد";
  if (account.spread?.trim()) return account.spread.trim();
  if (account.spread_min !== null && account.spread_min !== undefined) {
    return `من ${Number(account.spread_min)} نقطة`;
  }
  return "غير محدد";
}

function isExternal(url: string) {
  return /^https?:\/\//i.test(url);
}

function renderStars(rating: number | null | undefined) {
  const safeRating = Math.max(0, Math.min(5, Number(rating ?? 0)));
  const percentage = (safeRating / 5) * 100;

  return (
    <div
      className="relative inline-flex text-[15px] leading-none"
      dir="ltr"
      aria-label={`تقييم ${formatRating(rating)} من 5`}
    >
      <div className="flex gap-0.5 text-slate-300" aria-hidden="true">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
        aria-hidden="true"
      >
        <div className="flex w-max gap-0.5 text-amber-400">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </div>
  );
}

function BrokerLogo({
  broker,
  size = "medium",
  linked = true,
}: {
  broker: Broker;
  size?: "small" | "medium" | "large";
  linked?: boolean;
}) {
  const dimensions = {
    small: "h-[42px] w-[86px]",
    medium: "h-[48px] w-[104px] sm:h-[54px] sm:w-[118px]",
    large: "h-[58px] w-[124px] sm:h-[66px] sm:w-[142px]",
  }[size];

  const logo = broker.logo ? (
    <Image
      src={broker.logo}
      alt={`شعار ${broker.name ?? "شركة التداول"}`}
      fill
      className="object-contain"
      sizes={
        size === "large"
          ? "142px"
          : size === "medium"
          ? "118px"
          : "86px"
      }
    />
  ) : (
    <span className="text-sm font-black text-slate-700">
      {(broker.name || "BA").slice(0, 2).toUpperCase()}
    </span>
  );

  const classes = `
    relative flex shrink-0 items-center justify-center
    ${dimensions}
  `;

  if (!linked || !broker.slug) {
    return <div className={classes}>{logo}</div>;
  }

  return (
    <Link
      href={`/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes} transition duration-200 hover:scale-[1.04]`}
    >
      {logo}
    </Link>
  );
}

function PrimaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = isExternal(href);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "nofollow sponsored noopener noreferrer" : undefined}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-600 px-4 text-[12px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.18)] transition hover:-translate-y-0.5 hover:bg-brand-700 ${className}`}
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-[12px] font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 ${className}`}
    >
      {children}
    </Link>
  );
}

function PaymentIcon({ name }: { name: string | null }) {
  const cls = "h-5 w-5";
  if (name === "credit-card") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 9h18M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "smartphone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 5h4M11 18.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "wallet") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15 10h6v4h-6a2 2 0 1 1 0-4Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (name === "bolt") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <path d="m13.5 2-8 12h6L10.5 22l8-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "coins") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
        <ellipse cx="9" cy="7" rx="5" ry="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7M4 11v4c0 1.4 2.2 2.5 5 2.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
      <path d="M3 10h18M5 10V7l7-4 7 4v3M6 10v8M10 10v8M14 10v8M18 10v8M4 21h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PaymentBrand({
  method,
}: {
  method: PaymentMethod;
}) {
  const name = normalizeText(method.method_name).toLowerCase();

  const isVisa =
    name.includes("visa") ||
    name.includes("فيزا");

  const isMastercard =
    name.includes("mastercard") ||
    name.includes("master card") ||
    name.includes("ماستركارد");

  const isApplePay =
    name.includes("apple pay") ||
    name.includes("applepay");

  const isKnet =
    name.includes("knet") ||
    name.includes("كي نت");

  const isMada =
    name.includes("mada") ||
    name.includes("مدى");

  const isBank =
    name.includes("bank") ||
    name.includes("bank transfer") ||
    name.includes("تحويل بنكي") ||
    name.includes("تحويل مصرفي");

  if (isVisa || isMastercard) {
    return (
      <div className="flex min-h-[54px] items-center gap-3">

        {isVisa ? (
          <div className="flex h-[36px] min-w-[66px] items-center justify-center rounded-[10px] border border-slate-200 bg-white px-2.5 shadow-sm sm:h-[42px] sm:min-w-[76px] sm:rounded-xl sm:px-3">
            <img
              src="https://cdn.simpleicons.org/visa/1A1F71"
              alt="Visa"
              className="h-[20px] w-auto"
              loading="lazy"
            />
          </div>
        ) : null}

        {isMastercard ? (
          <div className="flex h-[36px] min-w-[66px] items-center justify-center rounded-[10px] border border-slate-200 bg-white px-2.5 shadow-sm sm:h-[42px] sm:min-w-[76px] sm:rounded-xl sm:px-3">
            <img
              src="https://cdn.simpleicons.org/mastercard/EB001B"
              alt="Mastercard"
              className="h-[28px] w-auto"
              loading="lazy"
            />
          </div>
        ) : null}

      </div>
    );
  }

  if (isApplePay) {
    return (
      <div className="flex h-[48px] min-w-[105px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
        <img
          src="https://cdn.simpleicons.org/applepay/000000"
          alt="Apple Pay"
          className="h-[25px] w-auto"
          loading="lazy"
        />
      </div>
    );
  }

  if (isKnet) {
    return (
      <div className="inline-flex h-[48px] min-w-[100px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
        <span
          dir="ltr"
          className="text-[20px] font-black tracking-[-0.04em] text-[#0057a6]"
        >
          KNET
        </span>
      </div>
    );
  }

  if (isMada) {
    return (
      <div className="inline-flex h-[48px] min-w-[100px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
        <span
          dir="ltr"
          className="text-[19px] font-black tracking-[-0.04em] text-emerald-700"
        >
          mada
        </span>
      </div>
    );
  }

  if (isBank) {
    return (
      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-brand-50 text-brand-700 ring-1 ring-brand-100">
        <PaymentIcon name="bank" />
      </div>
    );
  }

  return (
    <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-brand-50 text-brand-700 ring-1 ring-brand-100">
      <PaymentIcon name={method.icon_name} />
    </div>
  );
}

async function getCountryData(slug: string) {
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("country_pages")
    .select("*")
    .eq("slug", slug)
    .eq("ar_enabled", true)
    .maybeSingle();

  if (!page) return null;

  const [rankingsResult, blocksResult, faqsResult, paymentsResult] =
    await Promise.all([
      supabase
        .from("country_broker_rankings")
        .select(`
          id,
          rank_position,
          country_rating,
          best_for,
          local_note,
          featured,
          brokers (
            id,
            name,
            slug,
            logo,
            rating,
            min_deposit,
            platforms,
            regulation,
            regulation_short,
            best_for,
            pros,
            real_account_url,
            islamic_account,
            arabic_support
          )
        `)
        .eq("country_id", page.id)
        .order("rank_position", { ascending: true }),

      supabase
        .from("country_content_blocks")
        .select("*")
        .eq("country_id", page.id)
        .eq("locale", "ar")
        .order("sort_order", { ascending: true }),

      supabase
        .from("country_faqs")
        .select("*")
        .eq("country_id", page.id)
        .eq("locale", "ar")
        .order("sort_order", { ascending: true }),

      supabase
        .from("country_payment_methods")
        .select("*")
        .eq("country_id", page.id)
        .eq("locale", "ar")
        .eq("supported", true)
        .order("sort_order", { ascending: true }),
    ]);

  return {
    page: page as CountryPage,
    rankings: ((rankingsResult.data || []) as RankingRow[]).filter((row) =>
      oneBroker(row.brokers),
    ),
    blocks: (blocksResult.data || []) as ContentBlock[],
    faqs: (faqsResult.data || []) as FaqRow[],
    payments: (paymentsResult.data || []) as PaymentMethod[],
  };
}

async function getBrokerAccounts(
  brokerIds: number[],
): Promise<BrokerAccount[]> {
  if (!brokerIds.length) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("broker_accounts")
    .select("*")
    .in("broker_id", brokerIds)
    .order("broker_id", { ascending: true })
    .order("sort_order", {
      ascending: true,
      nullsFirst: false,
    });

  if (error) {
    console.error(
      "Failed to load broker accounts for country page:",
      error,
    );

    return [];
  }

  return (data || []) as BrokerAccount[];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country } = await params;
  const data = await getCountryData(country);

  if (!data) {
    return {
      title: "الصفحة غير موجودة",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { page } = data;

  const pageUrl = `${BASE_URL}/best-brokers/${page.slug}`;

  const countryCode =
    page.country_code?.toUpperCase() || "SA";

  const defaultTitle =
    `أفضل شركات تداول الفوركس في ${page.country_name_ar} 2026`;

  const defaultDescription =
    `قارن أفضل شركات تداول الفوركس في ${page.country_name_ar} وأفضل الوسطاء حسب الترخيص، الأمان، السبريد، الحسابات، المنصات، وطرق الإيداع والسحب.`;

  const languages: Record<string, string> = {
    [`ar-${countryCode}`]: pageUrl,
  };

  /*
   * نضيف hreflang الإنجليزي فقط إذا كانت النسخة الإنجليزية
   * موجودة فعليًا لهذه الدولة.
   */
  if (page.en_enabled) {
    languages[`en-${countryCode}`] =
      `${BASE_URL}/en/best-brokers/${page.slug}`;
  }

  return {
    title:
      page.seo_title ||
      defaultTitle,

    description:
      page.seo_description ||
      defaultDescription,

    applicationName: "بروكر العرب",

    category: "المال والأعمال",

    creator: "فريق بروكر العرب",

    publisher: "بروكر العرب",

    authors: [
      {
        name: "فريق بروكر العرب",
      },
    ],

    alternates: {
      canonical: pageUrl,
      languages,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "article",

      locale: `ar_${countryCode}`,

      url: pageUrl,

      title:
        page.seo_title ||
        defaultTitle,

      description:
        page.seo_description ||
        `مقارنة أفضل شركات تداول الفوركس والوسطاء في ${page.country_name_ar} من حيث الأمان، الترخيص، الحسابات والتكاليف.`,

      siteName: "بروكر العرب",

      modifiedTime:
        page.last_updated || undefined,

      section:
        "أفضل شركات تداول الفوركس",

      images: [
        {
          url: OG_IMAGE,

          width: 1560,

          height: 377,

          alt:
            `أفضل شركات تداول الفوركس في ${page.country_name_ar}`,

          type: "image/webp",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title:
        page.seo_title ||
        defaultTitle,

      description:
        page.seo_description ||
        `مقارنة أفضل شركات تداول الفوركس والوسطاء في ${page.country_name_ar}.`,

      images: [OG_IMAGE],
    },
  };
}

function HeroSection({
  page,
  totalBrokers,
  totalPayments,
}: {
  page: CountryPage;
  totalBrokers: number;
  totalPayments: number;
}) {
  const intro =
    page.hero_description ||
    page.local_trading_summary ||
    `مقارنة مستقلة لأفضل شركات التداول المناسبة للمتداولين في ${page.country_name_ar}.`;

  const desktopStats = [
    { value: String(totalBrokers), title: "شركات", desc: "مختارة" },
    { value: String(totalPayments), title: "طرق دفع", desc: "محلية" },
    { value: "7", title: "محاور", desc: "في الدليل" },
  ];

  const mobileStats = [
    [String(totalBrokers), "شركات"],
    [String(totalPayments), "دفع"],
    ["7", "محاور"],
  ] as const;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f2f7fd_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-56 h-[520px] w-[520px] rounded-full bg-brand-100/55 blur-[135px]" />
        <div className="absolute -left-44 bottom-[-300px] h-[500px] w-[500px] rounded-full bg-blue-100/45 blur-[145px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,rgba(255,255,255,0.99),transparent_42%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(30,91,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,91,184,0.055)_1px,transparent_1px)] [background-size:54px_54px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1520px] px-4 pb-5 pt-4 sm:px-6 sm:pb-7 sm:pt-5 lg:px-8 lg:pb-8 lg:pt-5">
        <nav
          aria-label="مسار التنقل"
          className="flex flex-wrap items-center gap-2 text-[9px] font-bold text-slate-500 sm:text-[11px]"
        >
          <Link href="/" className="transition hover:text-brand-600">
            الرئيسية
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/best-brokers" className="transition hover:text-brand-600">
            أفضل شركات التداول
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800">{page.country_name_ar}</span>
        </nav>

        {/* DESKTOP HERO */}
<div className="mt-3 hidden items-center gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-14">
          <div className="min-w-0 pb-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex min-h-[31px] items-center gap-2 rounded-full border border-brand-100 bg-white/90 px-4 text-[11px] font-black text-brand-700 shadow-sm backdrop-blur">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[9px] text-white">
                  ✓
                </span>
                {page.intro_badge || "مراجعة مستقلة للمتداول المحلي"}
              </span>

              <span className="inline-flex min-h-[31px] items-center rounded-full border border-slate-200 bg-white/90 px-4 text-[11px] font-black text-slate-600 shadow-sm">
                آخر تحديث: {formatUpdated(page.last_updated)}
              </span>
            </div>

            {/* عنوان الديسكتوب المرئي — عنوان H1 الدلالي موجود في نسخة الموبايل */}
<div className="mt-4 max-w-[980px] text-[49px] font-black leading-[1.05] tracking-[-0.04em] text-[#07111f] xl:text-[56px]">
  {page.hero_title ||
    `أفضل شركات التداول في ${page.country_name_ar}`}
</div>

            <p className="mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 xl:text-[15px]">
  {intro}
</p>

<p className="mt-1.5 max-w-[900px] text-[11px] font-bold leading-6 text-slate-500 xl:text-[12px]">
  نقارن شركات الفوركس والوسطاء المتاحين للمتداولين في{" "}
  {page.country_name_ar} بناءً على الأمان والتكاليف وملاءمة الحساب محليًا.
</p>

            <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-extrabold text-slate-700">
              {[
                "ترتيب خاص بكل دولة",
                "شركات تقبل العملاء فعليًا",
                "ترخيص وتكلفة وطرق دفع",
              ].map((point) => (
                <span key={point} className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[10px] text-emerald-700 ring-1 ring-emerald-100">
                    ✓
                  </span>
                  {point}
                </span>
              ))}
            </div>

           <div className="mt-4 flex items-center gap-3">

  <a
    href="#top-brokers"
    className="inline-flex min-h-[44px] min-w-[178px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-[13px] font-black text-white shadow-[0_10px_23px_rgba(30,91,184,0.20)] transition hover:-translate-y-0.5 hover:bg-brand-700"
  >
    شاهد أفضل الشركات
    <span className="text-[14px]">↓</span>
  </a>

  <a
    href="#comparison"
    className="inline-flex min-h-[44px] min-w-[166px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-[13px] font-black text-slate-800 shadow-[0_7px_18px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
  >
    قارن الحسابات
    <span className="text-brand-600">↙</span>
  </a>

</div>
          </div>

          <aside className="rounded-[24px] border border-slate-200/90 bg-white/78 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.055)] backdrop-blur">
            <div className="mb-2 flex items-center justify-between px-2 py-1">
              <div>
                <span className="block text-[10px] font-black text-brand-600">
                  ملخص صفحة {page.country_name_ar}
                </span>
                <span className="mt-0.5 block text-[13px] font-black text-slate-950">
                  أرقام الدليل الأساسية
                </span>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-[15px] font-black text-brand-700 ring-1 ring-brand-100">
                ✓
              </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 overflow-hidden rounded-[18px] border border-slate-200 bg-white">
              {desktopStats.map((stat) => (
                <div
                  key={stat.title}
                  className="flex min-h-[94px] flex-col items-center justify-center px-2 text-center"
                >
                  <span
                    dir="ltr"
                    className="text-[30px] font-black leading-none tracking-[-0.04em] text-brand-700"
                  >
                    {stat.value}
                  </span>
                  <span className="mt-2 text-[12px] font-black text-slate-950">
                    {stat.title}
                  </span>
                  <span className="mt-0.5 text-[9px] font-semibold text-slate-500">
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>

            <p className="px-2 pt-3 text-[10px] font-semibold leading-5 text-slate-500">
              لا نرتب الشركات حسب الاسم أو الإعلان فقط؛ الملاءمة المحلية جزء أساسي من التقييم.
            </p>
          </aside>
        </div>

        {/* MOBILE + TABLET HERO */}
        <div className="mx-auto mt-3 max-w-[620px] text-center lg:hidden">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex min-h-[28px] items-center gap-1.5 rounded-full border border-brand-100 bg-white/90 px-3 text-[9px] font-black text-brand-700 shadow-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[9px] text-white">
                ✓
              </span>
              ترتيب مستقل
            </span>
            <span className="inline-flex min-h-[28px] items-center rounded-full border border-slate-200 bg-white/90 px-3 text-[9px] font-black text-slate-600 shadow-sm">
              {formatUpdated(page.last_updated)}
            </span>
          </div>

          <h1 className="mx-auto mt-3 max-w-[365px] text-[28px] font-black leading-[1.08] tracking-[-0.035em] text-[#07111f] sm:max-w-[600px] sm:text-[42px]">
            {page.hero_title ||
              `أفضل شركات التداول في ${page.country_name_ar}`}
          </h1>

          <p className="mx-auto mt-2 max-w-[360px] text-[10px] font-semibold leading-[1.7] text-slate-600 sm:max-w-[570px] sm:text-[14px] sm:leading-7">
            {page.hero_description || page.local_trading_summary || intro}
          </p>

          <div className="mx-auto mt-2.5 grid max-w-[340px] grid-cols-2 gap-2">
            <div className="flex min-h-[35px] items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-white/85 px-2 text-[9px] font-black text-slate-700">
              <span className="text-emerald-600">✓</span>
              شركات مناسبة للدولة
            </div>
            <div className="flex min-h-[35px] items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-white/85 px-2 text-[9px] font-black text-slate-700">
              <span className="text-emerald-600">✓</span>
              ترتيب محلي
            </div>
          </div>

          <div className="mx-auto mt-3 grid max-w-[350px] grid-cols-2 gap-2.5">

  <a
    href="#top-brokers"
    className="inline-flex min-h-[43px] items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3 text-[11px] font-black text-white shadow-[0_9px_20px_rgba(30,91,184,0.18)] active:scale-[0.99]"
  >
    شاهد الشركات
    <span>↓</span>
  </a>

  <a
    href="#comparison"
    className="inline-flex min-h-[43px] items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-black text-slate-800 shadow-sm active:scale-[0.99]"
  >
    قارن الحسابات
    <span className="text-brand-600">↙</span>
  </a>

</div>

          <div className="mx-auto mt-3.5 grid max-w-[350px] grid-cols-3 divide-x divide-x-reverse divide-slate-200 overflow-hidden rounded-[15px] border border-slate-200 bg-white/90 shadow-[0_7px_18px_rgba(15,23,42,0.04)]">
            {mobileStats.map(([value, label]) => (
              <div
                key={label}
                className="flex min-h-[56px] flex-col items-center justify-center px-2"
              >
                <span
                  dir="ltr"
                  className="text-[18px] font-black leading-none text-brand-700"
                >
                  {value}
                </span>
                <span className="mt-1.5 text-[8px] font-bold text-slate-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickPicks({
  rows,
  countryName,
}: {
  rows: RankingRow[];
  countryName: string;
}) {
  const picks = rows.slice(0, 3);

  if (!picks.length) return null;

  return (
  <section
    id="top-brokers"
    className="scroll-mt-[90px] pt-1"
  >
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] sm:rounded-[28px]">

        {/* HEADER */}
<div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_62%,#eaf3ff_100%)] px-4 py-4 sm:px-6 sm:py-5">

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
  >
    <div className="absolute -right-20 -top-24 h-[210px] w-[210px] rounded-full bg-brand-100/65 blur-[75px]" />

    <div className="absolute -left-20 bottom-[-135px] h-[205px] w-[205px] rounded-full bg-blue-100/45 blur-[80px]" />
  </div>

  <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

    <div className="flex items-center gap-3">

      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-brand-600 text-[17px] font-black text-white shadow-[0_8px_20px_rgba(30,91,184,0.19)] sm:h-12 sm:w-12 sm:text-[18px]">
        ✓
      </span>

      <div>

        <span className="block text-[10px] font-black text-brand-600 sm:text-[11px]">
          قرار سريع
        </span>

        <h2 className="mt-0.5 text-[21px] font-black leading-[1.18] tracking-[-0.025em] text-slate-950 sm:text-[28px]">
          {forexRankingTitle(
            picks.length,
            countryName
          )}
        </h2>

        <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-600 sm:text-[12px]">
          اختيارات سريعة لأفضل الوسطاء المناسبين لتداول الفوركس والأسواق الأخرى قبل الانتقال إلى الترتيب الكامل.
        </p>

      </div>
    </div>

    <a
      href="#top-brokers"
      className="inline-flex min-h-[40px] w-fit shrink-0 self-start items-center justify-center rounded-xl border border-brand-100 bg-white px-5 text-[11px] font-black text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-50 sm:self-auto sm:text-[12px]"
    >
      عرض الترتيب الكامل
    </a>

  </div>
</div>

{/* CARDS */}

        {/* CARDS */}
        <div
  className={
    picks.length === 2
      ? `
          grid
          md:mx-auto
          md:my-4
          md:w-[calc(100%-80px)]
          md:max-w-[1080px]
          md:grid-cols-2
          md:overflow-hidden
          md:rounded-[20px]
          md:border
          md:border-slate-200
          md:divide-x
          md:divide-x-reverse
          md:divide-slate-200
          md:shadow-[0_8px_24px_rgba(15,23,42,0.035)]
        `
      : picks.length === 1
      ? `
          grid
          md:mx-auto
          md:my-4
          md:w-[520px]
          md:max-w-[calc(100%-48px)]
          md:overflow-hidden
          md:rounded-[20px]
          md:border
          md:border-slate-200
          md:shadow-[0_8px_24px_rgba(15,23,42,0.035)]
        `
      : `
          grid
          md:grid-cols-3
          md:divide-x
          md:divide-x-reverse
          md:divide-slate-200
        `
  }
>

          {picks.map((row) => {
            const broker = oneBroker(row.brokers);

            if (!broker) return null;

            const isFirst = row.rank_position === 1;

            return (
              <article
                key={row.id}
                className={`group relative flex min-w-0 flex-col border-b border-slate-200 px-4 pb-4 pt-4 transition last:border-b-0 hover:bg-brand-50/20 md:min-h-[285px] md:border-b-0 sm:px-5 sm:pb-5 sm:pt-5 ${
                  isFirst
                    ? "bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_72%)]"
                    : "bg-white"
                }`}
              >

                {/* TOP ACCENT */}
                <div
                  className={`absolute inset-x-0 top-0 h-[4px] ${
                    isFirst
                      ? "bg-gradient-to-l from-amber-400 via-brand-600 to-brand-300"
                      : "bg-gradient-to-l from-brand-600 via-brand-400 to-brand-100"
                  }`}
                />

                {/* RANK + RATING */}
                <div className="flex items-center justify-between gap-3">

                  <span
                    className={`inline-flex min-h-[29px] items-center gap-1.5 rounded-full px-3 text-[10px] font-black ring-1 ${
                      isFirst
                        ? "bg-amber-50 text-amber-800 ring-amber-200"
                        : "bg-brand-50 text-brand-700 ring-brand-100"
                    }`}
                  >
                    <span
                      className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] text-white ${
                        isFirst
                          ? "bg-amber-500"
                          : "bg-brand-600"
                      }`}
                    >
                      {row.rank_position}
                    </span>

                    {isFirst
                      ? "المركز الأول"
                      : `المركز ${row.rank_position}`}
                  </span>

                  <span
                    dir="ltr"
                    className="inline-flex min-h-[29px] items-center rounded-full bg-slate-50 px-3 text-[10px] font-black text-slate-800 ring-1 ring-slate-200"
                  >
                    {formatRating(
                      row.country_rating ||
                      broker.rating
                    )}/5
                  </span>
                </div>

                {/* BROKER */}
<div className="mt-4">

  {/* MOBILE */}
  <div className="sm:hidden">

    <div className="flex items-center justify-between gap-4">

      {/* TEXT */}
      <div className="min-w-0 flex-1">

        <span className="block max-w-[210px] text-[10px] font-black leading-[1.55] text-brand-600">
          {row.best_for ||
            "اختيار قوي للمتداول المحلي"}
        </span>

        <Link
          href={brokerHref(broker)}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="mt-1.5 block w-fit text-left text-[19px] font-black tracking-[-0.02em] text-slate-950 transition hover:text-brand-700"
        >
          {broker.name}
        </Link>

      </div>

      {/* LOGO */}
      <div className="flex w-[82px] shrink-0 items-center justify-center">
        <BrokerLogo
          broker={broker}
          size="small"
        />
      </div>

    </div>

    {/* RATING */}
    <div className="mt-2 flex items-center gap-2">
      <span
        dir="ltr"
        className="text-[10px] font-black text-slate-500"
      >
        {formatRating(
          row.country_rating ||
          broker.rating
        )}
      </span>

      {renderStars(
        row.country_rating ||
        broker.rating
      )}
    </div>

  </div>


  {/* TABLET + DESKTOP */}
  <div className="hidden sm:grid sm:grid-cols-[125px_minmax(0,1fr)] sm:items-center sm:gap-4">

    <BrokerLogo
      broker={broker}
      size="medium"
    />

    <div className="min-w-0">

      <span className="block text-[11px] font-black leading-5 text-brand-600">
        {row.best_for ||
          "اختيار قوي للمتداول المحلي"}
      </span>

      <Link
        href={brokerHref(broker)}
        target="_blank"
        rel="noopener noreferrer"
        dir="ltr"
        className="mt-1 block truncate text-left text-[22px] font-black tracking-[-0.02em] text-slate-950 transition hover:text-brand-700"
      >
        {broker.name}
      </Link>

      <div className="mt-2 flex items-center gap-2">

        {renderStars(
          row.country_rating ||
          broker.rating
        )}

        <span
          dir="ltr"
          className="text-[11px] font-black text-slate-500"
        >
          {formatRating(
            row.country_rating ||
            broker.rating
          )}
        </span>

      </div>
    </div>

  </div>

</div>

                {/* NOTE */}
<p className="mt-4 text-justify text-[12px] font-semibold leading-[1.9] text-slate-600 sm:text-[13px] sm:leading-[2]">
  {row.local_note ||
    broker.best_for ||
    "خيار مناسب حسب بيانات المقارنة المحلية."}
</p>

                {/* MINI FACTS */}
                <div className="mt-4 grid grid-cols-2 gap-2.5">

                  <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center ring-1 ring-slate-200">

                    <span className="block text-[10px] font-black text-slate-500">
                      أقل إيداع
                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 block text-[12px] font-black text-slate-950"
                    >
                      {money(broker.min_deposit)}
                    </span>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center ring-1 ring-slate-200">

                    <span className="block text-[10px] font-black text-slate-500">
                      المنصات
                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 block truncate text-[12px] font-black text-slate-950"
                    >
                      {splitValues(
                        broker.platforms,
                        2
                      ).join(" • ") || "غير محدد"}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-auto grid grid-cols-2 gap-2.5 pt-4">

                  <PrimaryLink
                    href={realHref(broker)}
                  >
                    فتح حساب
                  </PrimaryLink>

                  <SecondaryLink
                    href={brokerHref(broker)}
                  >
                    التقييم الكامل
                  </SecondaryLink>
                </div>

              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FullRanking({
  rows,
  accounts,
  countryName,
}: {
  rows: RankingRow[];
  accounts: BrokerAccount[];
  countryName: string;
}) {
  if (!rows.length) return null;

  const firstBroker = oneBroker(rows[0]?.brokers || null);
const secondBroker = oneBroker(rows[1]?.brokers || null);

  return (
    <section
      id="top-brokers"
      className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
    >

{/* SECTION HEADER */}
<div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] px-4 py-4 sm:px-6 sm:py-5">

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-24 -top-28 h-[240px] w-[240px] rounded-full bg-brand-100/45 blur-[90px]"
  />

  <div className="relative">

    <span className="inline-flex min-h-[27px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
      الترتيب الكامل
    </span>

    <h2 className="mt-3 text-[23px] font-black leading-[1.15] tracking-[-0.025em] text-slate-950 sm:text-[30px]">
      {forexRankingTitle(
        rows.length,
        countryName
      )}
    </h2>

    <p className="mt-2 max-w-[920px] text-[10px] font-semibold leading-5 text-slate-600 sm:text-[12px] sm:leading-6">
      نقارن أفضل وسطاء وشركات الفوركس المتاحة في {countryName} حسب
      ملاءمة الوسيط للدولة، قوة الشركة والترخيص، الحسابات، السبريد
      والتكاليف، المنصات، وطرق الإيداع والسحب.
    </p>

  </div>
</div>

      {/* BROKERS */}
      <div className="divide-y divide-slate-200">
        {rows.map((row) => {
          const broker = oneBroker(row.brokers);
          if (!broker) return null;

          const standard = findAccount(
  accounts,
  broker.id,
  ["standard"],
  [],
  true,
);

const pro = findAccount(
  accounts,
  broker.id,
  [
    "raw",
    "pro",
    "professional",
    "zero",
    "ecn",
  ],
  standard ? [standard.id] : [],
  false,
);

const primaryAccount = pro || standard;
          const brokerPros = splitValues(broker.pros, 3);
          const regulators = splitValues(broker.regulation_short || broker.regulation, 4);

          return (
            <article key={row.id} className="relative">
              <div
                className={`absolute inset-y-0 right-0 w-[4px] ${
                  row.rank_position === 1 ? "bg-amber-400" : "bg-brand-600"
                }`}
              />

              {/* MOBILE CARD */}
              <div className="lg:hidden">
                <details className="group">
                  <summary className="list-none cursor-pointer px-4 py-4 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex min-h-[27px] items-center gap-1.5 rounded-full px-2.5 text-[9px] font-black ring-1 ${
                          row.rank_position === 1
                            ? "bg-amber-50 text-amber-800 ring-amber-200"
                            : "bg-brand-50 text-brand-700 ring-brand-100"
                        }`}
                      >
                        <span
                          className={`flex h-5 min-w-5 items-center justify-center rounded-full text-[8px] text-white ${
                            row.rank_position === 1
                              ? "bg-amber-500"
                              : "bg-brand-600"
                          }`}
                        >
                          {row.rank_position}
                        </span>
                        {row.rank_position === 1
                          ? "الأفضل"
                          : `المركز ${row.rank_position}`}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
                        <span className="text-amber-400">★</span>
                        {formatRating(row.country_rating || broker.rating)}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3">
                      <BrokerLogo broker={broker} size="small" />
                      <div className="min-w-0">
                        <h3
                          dir="ltr"
                          className="truncate text-left text-[18px] font-black tracking-[-0.02em] text-slate-950"
                        >
                          {broker.name}
                        </h3>
                        <span className="mt-1 block text-[9px] font-black leading-4 text-brand-600">
                          {row.best_for || "اختيار مناسب للدولة"}
                        </span>
                        <div className="mt-1.5 flex items-center gap-2">
                          {renderStars(row.country_rating || broker.rating)}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[10px] font-semibold leading-5 text-slate-600">
                      {short(row.local_note || broker.best_for, 145)}
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-slate-50 px-2 py-2 text-center ring-1 ring-slate-200">
                        <span className="block text-[8px] font-black text-slate-500">
                          الحساب
                        </span>
                        <span className="mt-1 block truncate text-[9px] font-black text-slate-900">
                          {primaryAccount?.account_name || "—"}
                        </span>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-2 py-2 text-center ring-1 ring-slate-200">
                        <span className="block text-[8px] font-black text-slate-500">
                          السبريد
                        </span>
                        <span className="mt-1 block truncate text-[9px] font-black text-slate-900">
                          {accountSpread(primaryAccount)}
                        </span>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-2 py-2 text-center ring-1 ring-slate-200">
                        <span className="block text-[8px] font-black text-slate-500">
                          الإيداع
                        </span>
                        <span className="mt-1 block truncate text-[9px] font-black text-slate-900">
                          {primaryAccount?.min_deposit || money(broker.min_deposit)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-center">
                      <span className="inline-flex min-h-[27px] items-center rounded-full bg-brand-50 px-3 text-[9px] font-black text-brand-700 ring-1 ring-brand-100 group-open:hidden">
                        عرض التفاصيل
                      </span>
                      <span className="hidden min-h-[27px] items-center rounded-full bg-slate-100 px-3 text-[9px] font-black text-slate-600 group-open:inline-flex">
                        عرض أقل
                      </span>
                    </div>
                  </summary>

                  <div className="border-t border-slate-100 bg-[#fbfdff] px-4 pb-4 pt-4 sm:px-5">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <span className="block text-[8px] font-black text-slate-500">
                          العمولة
                        </span>
                        <span className="mt-1 block text-[10px] font-black leading-5 text-slate-900">
                          {primaryAccount?.commission || "حسب الحساب"}
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <span className="block text-[8px] font-black text-slate-500">
                          المنصات
                        </span>
                        <span className="mt-1 block text-[10px] font-black leading-5 text-slate-900">
                          {splitValues(broker.platforms, 2).join(" • ") || "غير محدد"}
                        </span>
                      </div>
                    </div>

                    {regulators.length > 0 ? (
                      <div className="mt-3">
                        <span className="block text-[9px] font-black text-slate-500">
                          أبرز التراخيص
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {regulators.map((regulator) => (
                            <span
                              key={regulator}
                              dir="ltr"
                              className="inline-flex min-h-[25px] items-center rounded-lg bg-white px-2.5 text-[9px] font-black text-slate-800 ring-1 ring-slate-200"
                            >
                              {regulator}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {brokerPros.length > 0 ? (
                      <div className="mt-3 space-y-1.5">
                        {brokerPros.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-[10px] font-bold leading-5 text-slate-700 ring-1 ring-slate-200"
                          >
                            <span className="text-emerald-600">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <PrimaryLink href={realHref(broker)}>فتح حساب</PrimaryLink>
                      <SecondaryLink href={brokerHref(broker)}>
                        اقرأ التقييم
                      </SecondaryLink>
                    </div>
                  </div>
                </details>
              </div>

              {/* DESKTOP CARD */}
              <div className="hidden lg:grid lg:min-h-[300px] lg:grid-cols-[210px_minmax(0,1fr)_270px] xl:grid-cols-[220px_minmax(0,1fr)_290px]">
                <aside className="border-l border-slate-100 bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_100%)] px-5 py-6">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span
                      className={`inline-flex min-h-[28px] items-center justify-center rounded-full px-3 text-[10px] font-black ring-1 ${
                        row.rank_position === 1
                          ? "bg-amber-50 text-amber-800 ring-amber-200"
                          : "bg-brand-50 text-brand-700 ring-brand-100"
                      }`}
                    >
                      {row.rank_position === 1
                        ? "المركز الأول"
                        : `المركز ${row.rank_position}`}
                    </span>

                    <div className="mt-4">
                      <BrokerLogo broker={broker} size="large" />
                    </div>

                    <h3
                      dir="ltr"
                      className="mt-4 text-[22px] font-black tracking-[-0.025em] text-slate-950"
                    >
                      {broker.name}
                    </h3>

                    <div className="mt-2.5 flex items-center justify-center gap-2">
                      {renderStars(row.country_rating || broker.rating)}
                      <span dir="ltr" className="text-[11px] font-black text-slate-700">
                        {formatRating(row.country_rating || broker.rating)}
                      </span>
                    </div>

                    <span className="mt-3 rounded-full bg-brand-50 px-3 py-1 text-[9px] font-black text-brand-700 ring-1 ring-brand-100">
                      {row.best_for || "اختيار مناسب للدولة"}
                    </span>
                  </div>
                </aside>

                <div className="px-6 py-6 xl:px-7">
                  <span className="text-[10px] font-black text-brand-600">
                    لماذا اخترناه؟
                  </span>
                  <p className="mt-2 max-w-[850px] text-[13px] font-semibold leading-7 text-slate-700">
                    {row.local_note ||
                      broker.best_for ||
                      "خيار مناسب بناءً على بيانات المقارنة المحلية."}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-[15px] border border-slate-200 bg-slate-50/80 p-3">
                      <span className="block text-[9px] font-black text-slate-500">
                        الحساب المختار
                      </span>
                      <span className="mt-1 block text-[12px] font-black text-slate-950">
                        {primaryAccount?.account_name || "غير محدد"}
                      </span>
                    </div>
                    <div className="rounded-[15px] border border-slate-200 bg-slate-50/80 p-3">
                      <span className="block text-[9px] font-black text-slate-500">
                        السبريد
                      </span>
                      <span className="mt-1 block text-[12px] font-black text-slate-950">
                        {accountSpread(primaryAccount)}
                      </span>
                    </div>
                    <div className="rounded-[15px] border border-slate-200 bg-slate-50/80 p-3">
                      <span className="block text-[9px] font-black text-slate-500">
                        أقل إيداع
                      </span>
                      <span className="mt-1 block text-[12px] font-black text-slate-950">
                        {primaryAccount?.min_deposit || money(broker.min_deposit)}
                      </span>
                    </div>
                  </div>

                  {brokerPros.length > 0 ? (
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {brokerPros.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[11px] font-bold leading-5 text-slate-700"
                        >
                          <span className="text-emerald-600">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <aside className="border-r border-slate-100 bg-[#fbfdff] px-5 py-6">
                  <div className="flex h-full flex-col">
                    <div>
                      <span className="block text-[9px] font-black text-slate-500">
                        معلومات سريعة
                      </span>

                      <div className="mt-3 space-y-2">
                        <div className="rounded-xl border border-slate-200 bg-white p-3">
                          <span className="block text-[9px] font-black text-slate-500">
                            العمولة
                          </span>
                          <span className="mt-1 block text-[11px] font-black text-slate-900">
                            {primaryAccount?.commission || "حسب الحساب"}
                          </span>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-3">
                          <span className="block text-[9px] font-black text-slate-500">
                            المنصات
                          </span>
                          <span className="mt-1 block text-[11px] font-black leading-5 text-slate-900">
                            {splitValues(broker.platforms, 3).join(" • ") || "غير محدد"}
                          </span>
                        </div>
                      </div>

                      {regulators.length > 0 ? (
                        <div className="mt-4">
                          <span className="block text-[9px] font-black text-slate-500">
                            أبرز التراخيص
                          </span>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {regulators.map((regulator) => (
                              <span
                                key={regulator}
                                dir="ltr"
                                className="inline-flex min-h-[27px] items-center rounded-lg bg-white px-2.5 text-[9px] font-black text-slate-800 shadow-sm ring-1 ring-slate-200"
                              >
                                {regulator}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
                      <PrimaryLink href={realHref(broker)}>فتح حساب</PrimaryLink>
                      <SecondaryLink href={brokerHref(broker)}>
                        التقييم الكامل
                      </SecondaryLink>
                    </div>
                  </div>
                </aside>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ComparisonAccountCard({
  broker,
  account,
  label,
  tone = "blue",
}: {
  broker: Broker;
  account: BrokerAccount | null;
  label: string;
  tone?: "blue" | "green";
}) {
  if (!account) {
    return (
      <div className="flex min-h-[190px] flex-col items-center justify-center rounded-[18px] border border-dashed border-slate-200 bg-slate-50/60 px-4 text-center">
        <span className="text-[10px] font-black text-slate-400">
          {label}
        </span>

        <span className="mt-2 text-[12px] font-black text-slate-500">
          لا توجد بيانات حساب متاحة
        </span>
      </div>
    );
  }

  const isGreen = tone === "green";

  return (
    <Link
      href={accountHref(broker, account)}
      className={`group relative block overflow-hidden rounded-[18px] border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] ${
        isGreen
          ? "border-emerald-200 bg-[linear-gradient(145deg,#ffffff_0%,#f1fcf7_100%)] hover:border-emerald-300"
          : "border-brand-100 bg-[linear-gradient(145deg,#ffffff_0%,#f4f8ff_100%)] hover:border-brand-200"
      }`}
    >
      {/* top accent */}
      <div
        className={`absolute inset-x-0 top-0 h-[3px] ${
          isGreen ? "bg-emerald-500" : "bg-brand-600"
        }`}
      />

      {/* TITLE */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span
            className={`text-[9px] font-black ${
              isGreen
                ? "text-emerald-700"
                : "text-brand-600"
            }`}
          >
            {label}
          </span>

          <h4
            dir="ltr"
            className="mt-1 truncate text-left text-[16px] font-black tracking-[-0.02em] text-slate-950 sm:text-[17px]"
          >
            {account.account_name}
          </h4>

          {account.best_for ? (
            <p className="mt-1.5 line-clamp-2 text-[9px] font-semibold leading-5 text-slate-500">
              {account.best_for}
            </p>
          ) : null}
        </div>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] font-black transition group-hover:translate-x-[-2px] ${
            isGreen
              ? "bg-emerald-100 text-emerald-700"
              : "bg-brand-100 text-brand-700"
          }`}
        >
          ←
        </span>
      </div>

      {/* METRICS */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5">
          <span className="block text-[8px] font-black text-slate-500">
            السبريد لهذا الحساب
          </span>

          <span
            dir="ltr"
            className="mt-1 block text-[11px] font-black text-slate-950"
          >
            {accountSpread(account)}
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5">
          <span className="block text-[8px] font-black text-slate-500">
            العمولة لهذا الحساب
          </span>

          <span
            dir="ltr"
            className="mt-1 block truncate text-[11px] font-black text-slate-950"
          >
            {account.commission || "حسب شروط الحساب"}
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5">
          <span className="block text-[8px] font-black text-slate-500">
            الحد الأدنى للإيداع
          </span>

          <span
            dir="ltr"
            className="mt-1 block text-[11px] font-black text-slate-950"
          >
            {account.min_deposit || money(broker.min_deposit)}
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5">
          <span className="block text-[8px] font-black text-slate-500">
            نوع التنفيذ
          </span>

          <span
            dir="ltr"
            className="mt-1 block truncate text-[11px] font-black text-slate-950"
          >
            {account.execution_type || "غير محدد"}
          </span>
        </div>
      </div>

      {/* CLICK HINT */}
      <div
        className={`mt-3 flex min-h-[34px] items-center justify-center rounded-xl text-[10px] font-black ${
          isGreen
            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
            : "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
        }`}
      >
        عرض تفاصيل وخصائص الحساب
        <span className="mr-1.5 transition group-hover:translate-x-[-2px]">
          ←
        </span>
      </div>
    </Link>
  );
}


function ComparisonSection({
  rows,
  accounts,
  countryName,
  intro,
}: {
  rows: RankingRow[];
  accounts: BrokerAccount[];
  countryName: string;
  intro: string | null;
}) {
  if (!rows.length) return null;

  return (
    <section
      id="comparison"
      className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
    >
    {/* =========================================================
    SECTION HEADER
========================================================= */}
<div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_55%,#eaf3ff_100%)] px-4 py-4 sm:px-7 sm:py-7">

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-20 -top-24 h-[220px] w-[220px] rounded-full bg-brand-100/55 blur-[85px] sm:-right-24 sm:-top-32 sm:h-[290px] sm:w-[290px] sm:blur-[100px]"
  />

  {/* =====================================================
      MOBILE / TABLET HEADER
  ===================================================== */}
  <div className="relative lg:hidden">

    <span className="inline-flex min-h-[26px] items-center rounded-full border border-brand-100 bg-white px-3 text-[8px] font-black text-brand-700 shadow-sm">
      مقارنة الحسابات
    </span>

    <h2 className="mt-2.5 max-w-[330px] text-[21px] font-black leading-[1.12] tracking-[-0.03em] text-slate-950">
      قارن حسابات أفضل شركات تداول الفوركس في {countryName}
    </h2>

    <p className="mt-2 max-w-[345px] text-[11px] font-semibold leading-[1.75] text-slate-600">
      {intro ||
        `قارن أنواع الحسابات المتاحة لدى أفضل وسطاء الفوركس في ${countryName} من حيث السبريد والعمولة والإيداع، واضغط على أي حساب لعرض خصائصه.`}
    </p>

    <div className="mt-3 grid grid-cols-3 gap-1.5">

      <div className="flex min-h-[38px] items-center justify-center gap-1 rounded-[10px] border border-slate-200 bg-white/90 px-1.5 text-center shadow-sm">
        <span className="text-[9px] font-black text-emerald-600">
          ✓
        </span>

        <span className="text-[9px] font-black leading-4 text-slate-700">
          سبريد وعمولة
        </span>
      </div>

      <div className="flex min-h-[38px] items-center justify-center gap-1 rounded-[10px] border border-slate-200 bg-white/90 px-1.5 text-center shadow-sm">
        <span className="text-[9px] font-black text-emerald-600">
          ✓
        </span>

        <span className="text-[9px] font-black leading-4 text-slate-700">
          تفاصيل الحساب
        </span>
      </div>

      <div className="flex min-h-[38px] items-center justify-center gap-1 rounded-[10px] border border-slate-200 bg-white/90 px-1.5 text-center shadow-sm">
        <span className="text-[9px] font-black text-emerald-600">
          ✓
        </span>

        <span className="text-[9px] font-black leading-4 text-slate-700">
          مقارنة مباشرة
        </span>
      </div>

    </div>

  </div>


  {/* =====================================================
      DESKTOP HEADER
  ===================================================== */}
  <div className="relative hidden lg:grid lg:grid-cols-[minmax(0,1fr)_310px] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">

    {/* TEXT */}
    <div className="min-w-0">

      <span className="inline-flex min-h-[28px] items-center rounded-full border border-brand-100 bg-white px-3 text-[10px] font-black text-brand-700 shadow-sm">
        مقارنة الحسابات
      </span>

      <h2 className="mt-3 max-w-[900px] text-[31px] font-black leading-[1.12] tracking-[-0.03em] text-slate-950 xl:text-[33px]">
        قارن حسابات أفضل شركات تداول الفوركس في {countryName}
      </h2>

      <p className="mt-2 max-w-[850px] text-[12px] font-semibold leading-6 text-slate-600">
        {intro ||
          `قارن الحساب القياسي والحسابات منخفضة التكلفة أو الاحترافية حسب السبريد والعمولة والإيداع، ثم افتح تفاصيل الحساب الذي يناسب أسلوب تداولك.`}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">

        <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
          <span className="text-emerald-600">
            ✓
          </span>
          لكل حساب سبريد وعمولة خاصة
        </span>

        <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
          <span className="text-emerald-600">
            ✓
          </span>
          اضغط الحساب لعرض التفاصيل
        </span>

        <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
          <span className="text-emerald-600">
            ✓
          </span>
          اختر حسب أسلوب التداول
        </span>

      </div>

    </div>


    {/* =====================================================
    COMPARISON ILLUSTRATION - DESKTOP ONLY
===================================================== */}
<div
  aria-hidden="true"
  className="relative flex h-[180px] items-center justify-center"
>
  {(() => {
    const firstBroker = oneBroker(rows[0]?.brokers || null);
    const secondBroker = oneBroker(rows[1]?.brokers || null);

    return (
      <>
        {/* GLOW */}
        <div className="absolute h-[150px] w-[250px] rounded-full bg-brand-100/45 blur-[55px]" />

        {/* FIRST BROKER */}
        {firstBroker ? (
  <Link
    href={brokerHref(firstBroker)}
    target="_blank"
    rel="noopener noreferrer"
    className="absolute left-[8px] top-[30px] flex h-[108px] w-[135px] -rotate-[7deg] flex-col items-center justify-center rounded-[19px] border border-brand-100 bg-white px-3 shadow-[0_15px_35px_rgba(15,23,42,0.09)] transition duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:border-brand-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.13)]"
  >
    <div className="flex h-[46px] w-[98px] items-center justify-center">
      <BrokerLogo
        broker={firstBroker}
        size="small"
        linked={false}
      />
    </div>

    <span
      dir="ltr"
      className="mt-1 block max-w-[110px] truncate text-[10px] font-black text-slate-900"
    >
      {firstBroker.name}
    </span>

    <span className="mt-1 inline-flex min-h-[20px] items-center rounded-full bg-brand-50 px-2 text-[7px] font-black text-brand-700">
      المركز الأول
    </span>
  </Link>
) : null}

        {/* SECOND BROKER */}
        <div className="absolute right-[8px] top-[30px] flex h-[108px] w-[135px] rotate-[7deg] flex-col items-center justify-center rounded-[19px] border border-emerald-200 bg-white px-3 shadow-[0_15px_35px_rgba(15,23,42,0.09)]">

          {secondBroker ? (
            <>
              <div className="flex h-[46px] w-[98px] items-center justify-center">
                <BrokerLogo
                  broker={secondBroker}
                  size="small"
                  linked={false}
                />
              </div>

              <span
                dir="ltr"
                className="mt-1 block max-w-[110px] truncate text-[10px] font-black text-slate-900"
              >
                {secondBroker.name}
              </span>

              <span className="mt-1 inline-flex min-h-[20px] items-center rounded-full bg-emerald-50 px-2 text-[7px] font-black text-emerald-700">
                المركز الثاني
              </span>
            </>
          ) : (
            <span className="text-[10px] font-black text-slate-400">
              #2
            </span>
          )}

        </div>

        {/* VS */}
        <div className="relative z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#07111f] text-[11px] font-black tracking-[0.08em] text-white shadow-[0_12px_26px_rgba(15,23,42,0.24)] ring-[5px] ring-white">
          VS
        </div>

        {/* SMALL DECORATION */}
        <div className="absolute left-[26px] top-[20px] h-2 w-2 rounded-full bg-brand-300" />

        <div className="absolute right-[25px] bottom-[25px] h-2.5 w-2.5 rounded-full bg-emerald-300" />

        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2">
          <span className="inline-flex min-h-[24px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-[7.5px] font-black text-slate-500 shadow-sm">

            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />

            مقارنة مباشرة

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          </span>
        </div>
      </>
    );
  })()}
</div>

  </div>

</div>

      {/* =========================================================
          BROKERS
      ========================================================= */}
      <div className="divide-y divide-slate-200">

        {rows.map((row) => {
          const broker = oneBroker(row.brokers);

          if (!broker) return null;

          const standard = findAccount(
  accounts,
  broker.id,
  ["standard"],
  [],
  true,
);

const pro = findAccount(
  accounts,
  broker.id,
  [
    "raw",
    "pro",
    "professional",
    "zero",
    "ecn",
  ],
  standard ? [standard.id] : [],
  false,
);

          const isFirst = row.rank_position === 1;

          return (
            <article
              key={row.id}
              className={`relative ${
                isFirst
                  ? "bg-[linear-gradient(90deg,#fffdf7_0%,#ffffff_34%)]"
                  : "bg-white"
              }`}
            >
              {/* SIDE ACCENT */}
              <div
                className={`absolute inset-y-0 right-0 w-[4px] ${
                  isFirst
                    ? "bg-amber-400"
                    : "bg-brand-600"
                }`}
              />


              {/* =================================================
                  DESKTOP
              ================================================= */}
              <div className="hidden lg:grid lg:grid-cols-[245px_minmax(0,1fr)_215px] xl:grid-cols-[260px_minmax(0,1fr)_230px]">

                {/* =================================================
    BROKER IDENTITY - DESKTOP
================================================= */}
<div className="relative border-l border-slate-100 bg-[linear-gradient(155deg,#ffffff_0%,#f6faff_55%,#eef6ff_100%)] px-5 py-5">

  {/* RANK + SCORE */}
  <div className="flex items-center justify-between gap-2">

    <span
      className={`inline-flex min-h-[28px] items-center rounded-full px-3 text-[9px] font-black ring-1 ${
        isFirst
          ? "bg-amber-50 text-amber-800 ring-amber-200"
          : "bg-brand-50 text-brand-700 ring-brand-100"
      }`}
    >
      {isFirst
        ? "المركز الأول"
        : `المركز ${row.rank_position}`}
    </span>

    <span
      dir="ltr"
      className="inline-flex min-h-[28px] items-center rounded-full bg-white px-2.5 text-[9px] font-black text-slate-600 shadow-sm ring-1 ring-slate-200"
    >
      {formatRating(
        row.country_rating ||
        broker.rating
      )}
    </span>

  </div>


  {/* =================================================
      BIG CENTERED LOGO
  ================================================= */}
  <div className="mt-5 flex justify-center">

    <Link
      href={brokerHref(broker)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`تقييم ${broker.name}`}
      className="group relative flex h-[118px] w-full max-w-[205px] items-center justify-center rounded-[20px] border border-slate-200/80 bg-white/80 shadow-[0_12px_30px_rgba(15,23,42,0.055)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.09)]"
    >

      {broker.logo ? (
        <div className="relative h-[96px] w-[195px]">
          <Image
            src={broker.logo}
            alt={`شعار ${broker.name ?? "شركة التداول"}`}
            fill
            className="object-contain transition duration-200 group-hover:scale-[1.04]"
            sizes="175px"
          />
        </div>
      ) : (
        <span
          dir="ltr"
          className="text-[26px] font-black text-slate-800"
        >
          {(broker.name || "BA")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      )}

    </Link>

  </div>


  {/* BROKER NAME */}
  <div className="mt-4 text-center">

    <Link
      href={brokerHref(broker)}
      target="_blank"
      rel="noopener noreferrer"
      dir="ltr"
      className="inline-block text-[22px] font-black tracking-[-0.025em] text-slate-950 transition hover:text-brand-700"
    >
      {broker.name}
    </Link>


    {/* RATING */}
    <div className="mt-2 flex items-center justify-center gap-2">

      <span
        dir="ltr"
        className="text-[10px] font-black text-slate-500"
      >
        {formatRating(
          row.country_rating ||
          broker.rating
        )}
      </span>

      {renderStars(
        row.country_rating ||
        broker.rating
      )}

    </div>


    {/* BEST FOR */}
    <div className="mt-3 flex justify-center">

      <span className="inline-flex max-w-[210px] items-center justify-center rounded-full bg-brand-50 px-3 py-1.5 text-center text-[9px] font-black leading-5 text-brand-700 ring-1 ring-brand-100">
        {row.best_for ||
          `اختيار مناسب للمتداولين في ${countryName}`}
      </span>

    </div>

  </div>


  {/* DECORATION */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute bottom-[-50px] left-1/2 h-[110px] w-[180px] -translate-x-1/2 rounded-full bg-brand-100/35 blur-[55px]"
  />

</div>

                {/* ACCOUNT COMPARISON */}
                <div className="px-5 py-6 xl:px-6">

                  <div className="mb-4">
                    <span className="text-[9px] font-black text-brand-600">
                      اختر الحساب الذي تريد مقارنته
                    </span>

                    <h3 className="mt-1 text-[17px] font-black text-slate-950">
                      حسابات {broker.name}
                    </h3>

                    <p className="mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                      اضغط على بطاقة الحساب لعرض تفاصيل السبريد والعمولة والشروط الكاملة.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <ComparisonAccountCard
                      broker={broker}
                      account={standard}
                      label="الحساب القياسي"
                      tone="blue"
                    />

                    <ComparisonAccountCard
                      broker={broker}
                      account={pro}
                      label="حساب منخفض التكلفة / احترافي"
                      tone="green"
                    />
                  </div>
                </div>


                {/* BROKER ACTION */}
                <aside className="border-r border-slate-100 bg-[#fbfdff] px-5 py-6">

                  <div className="flex h-full flex-col">

                    <span className="text-[9px] font-black text-slate-500">
                      قبل فتح الحساب
                    </span>

                    <h4 className="mt-2 text-[15px] font-black leading-6 text-slate-950">
                      اختر نوع الحساب المناسب أولًا
                    </h4>

                    <p className="mt-2 text-[10px] font-semibold leading-5 text-slate-600">
                      السبريد والعمولة وشروط التداول قد تختلف باختلاف الحساب والكيان الذي يتم التسجيل من خلاله.
                    </p>

                    <div className="mt-4 rounded-[14px] border border-slate-200 bg-white p-3">
                      <span className="block text-[8px] font-black text-slate-500">
                        ترتيب الوسيط في {countryName}
                      </span>

                      <span className="mt-1 block text-[14px] font-black text-brand-700">
                        #{row.rank_position}
                      </span>
                    </div>

                    <div className="mt-auto grid gap-2.5 pt-5">
                      <PrimaryLink
                        href={realHref(broker)}
                        className="w-full"
                      >
                        فتح حساب
                      </PrimaryLink>

                      <SecondaryLink
                        href={brokerHref(broker)}
                        className="w-full"
                      >
                        تقييم {broker.name}
                      </SecondaryLink>
                    </div>

                  </div>
                </aside>

              </div>


              {/* =================================================
    MOBILE - COMPACT
================================================= */}
<div className="p-4 lg:hidden">

  {/* BROKER HEADER */}
  <div className="flex items-start justify-between gap-3">

    <div className="flex min-w-0 flex-1 items-center gap-3">

      <div className="flex w-[62px] shrink-0 items-center justify-center">
        <BrokerLogo
          broker={broker}
          size="small"
        />
      </div>

      <div className="min-w-0 flex-1">

        <Link
          href={brokerHref(broker)}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="block truncate text-left text-[18px] font-black tracking-[-0.02em] text-slate-950"
        >
          {broker.name}
        </Link>

        <span className="mt-1 block text-[9px] font-black text-brand-600">
          #{row.rank_position} في {countryName}
        </span>

        <div className="mt-1.5 flex items-center gap-2">

          {renderStars(
            row.country_rating ||
            broker.rating
          )}

          <span
            dir="ltr"
            className="text-[9px] font-black text-slate-500"
          >
            {formatRating(
              row.country_rating ||
              broker.rating
            )}
          </span>

        </div>

      </div>

    </div>


    <span
      className={`inline-flex min-h-[27px] shrink-0 items-center rounded-full px-2.5 text-[9px] font-black ring-1 ${
        isFirst
          ? "bg-amber-50 text-amber-800 ring-amber-200"
          : "bg-brand-50 text-brand-700 ring-brand-100"
      }`}
    >
      {isFirst
        ? "الأفضل"
        : `#${row.rank_position}`}
    </span>

  </div>


  {/* BEST FOR */}
  <div className="mt-3 rounded-xl bg-brand-50/60 px-3 py-2 text-[9px] font-black leading-5 text-brand-700 ring-1 ring-brand-100">
    {row.best_for ||
      `خيار مناسب للمتداولين في ${countryName}`}
  </div>


  {/* ACCOUNTS TITLE */}
  <div className="mt-4 flex items-center justify-between">

    <div>
      <span className="block text-[10px] font-black text-slate-500">
  حسابات {broker.name}
</span>

      <span className="mt-0.5 block text-[13px] font-black leading-5 text-slate-950">
        اضغط على الحساب لعرض التفاصيل
      </span>
    </div>

    <span className="text-[9px] font-black text-brand-600">
      شروط مختلفة لكل حساب
    </span>

  </div>


  {/* =================================================
      STANDARD ACCOUNT ROW
  ================================================= */}
  {standard ? (
    <Link
      href={accountHref(broker, standard)}
      className="group mt-3 block rounded-[15px] border border-brand-200 bg-[linear-gradient(145deg,#ffffff_0%,#f5f9ff_100%)] p-3 transition active:scale-[0.99]"
    >

      <div className="flex items-center justify-between gap-3">

        <div className="min-w-0">

          <span className="block text-[8px] font-black text-brand-600">
            الحساب القياسي
          </span>

          <span
            dir="ltr"
            className="mt-0.5 block truncate text-left text-[14px] font-black text-slate-950"
          >
            {standard.account_name}
          </span>

        </div>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[13px] font-black text-brand-700">
          ←
        </span>

      </div>


      <div className="mt-2.5 grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 rounded-xl border border-slate-200 bg-white">

        <div className="px-2 py-2 text-center">
          <span className="block text-[7px] font-black text-slate-500">
            السبريد
          </span>

          <span
            dir="ltr"
            className="mt-1 block text-[9px] font-black text-slate-950"
          >
            {accountSpread(standard)}
          </span>
        </div>


        <div className="px-2 py-2 text-center">
          <span className="block text-[7px] font-black text-slate-500">
            العمولة
          </span>

          <span
            dir="ltr"
            className="mt-1 block truncate text-[9px] font-black text-slate-950"
          >
            {standard.commission ||
              "حسب الحساب"}
          </span>
        </div>


        <div className="px-2 py-2 text-center">
          <span className="block text-[7px] font-black text-slate-500">
            الإيداع
          </span>

          <span
            dir="ltr"
            className="mt-1 block text-[9px] font-black text-slate-950"
          >
            {standard.min_deposit ||
              money(broker.min_deposit)}
          </span>
        </div>

      </div>

    </Link>
  ) : null}


  {/* =================================================
      PRO / RAW ACCOUNT ROW
  ================================================= */}
  {pro ? (
    <Link
      href={accountHref(broker, pro)}
      className="group mt-2.5 block rounded-[15px] border border-emerald-200 bg-[linear-gradient(145deg,#ffffff_0%,#f2fcf7_100%)] p-3 transition active:scale-[0.99]"
    >

      <div className="flex items-center justify-between gap-3">

        <div className="min-w-0">

          <span className="block text-[8px] font-black text-emerald-700">
            حساب منخفض التكلفة / احترافي
          </span>

          <span
            dir="ltr"
            className="mt-0.5 block truncate text-left text-[14px] font-black text-slate-950"
          >
            {pro.account_name}
          </span>

        </div>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[13px] font-black text-emerald-700">
          ←
        </span>

      </div>


      <div className="mt-2.5 grid grid-cols-3 divide-x divide-x-reverse divide-emerald-100 rounded-xl border border-emerald-100 bg-white">

        <div className="px-2 py-2 text-center">
          <span className="block text-[7px] font-black text-slate-500">
            السبريد
          </span>

          <span
            dir="ltr"
            className="mt-1 block text-[9px] font-black text-slate-950"
          >
            {accountSpread(pro)}
          </span>
        </div>


        <div className="px-2 py-2 text-center">
          <span className="block text-[7px] font-black text-slate-500">
            العمولة
          </span>

          <span
            dir="ltr"
            className="mt-1 block truncate text-[9px] font-black text-slate-950"
          >
            {pro.commission ||
              "حسب الحساب"}
          </span>
        </div>


        <div className="px-2 py-2 text-center">
          <span className="block text-[7px] font-black text-slate-500">
            الإيداع
          </span>

          <span
            dir="ltr"
            className="mt-1 block text-[9px] font-black text-slate-950"
          >
            {pro.min_deposit ||
              money(broker.min_deposit)}
          </span>
        </div>

      </div>

    </Link>
  ) : null}


  {/* ACTIONS */}
  <div className="mt-4 grid grid-cols-2 gap-2.5">

    <SecondaryLink
      href={brokerHref(broker)}
      className="min-h-[42px]"
    >
      تقييم {broker.name}
    </SecondaryLink>

    <PrimaryLink
      href={realHref(broker)}
      className="min-h-[42px]"
    >
      فتح حساب
    </PrimaryLink>

  </div>

</div>

            </article>
          );
        })}
      </div>


      {/* =========================================================
          FOOTER
      ========================================================= */}
      <div className="border-t border-slate-200 bg-[#f8fbff] px-4 py-4 sm:px-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="max-w-[900px] text-[9px] font-semibold leading-5 text-slate-500 sm:text-[10px]">
            أنواع الحسابات وشروط السبريد والعمولة والإيداع قد تختلف حسب الكيان
            القانوني والدولة. استخدم بطاقات الحساب أعلاه للاطلاع على تفاصيل كل
            حساب قبل التسجيل.
          </p>

          <Link
            href="/compare"
            className="inline-flex min-h-[34px] w-fit shrink-0 items-center rounded-xl bg-white px-4 text-[10px] font-black text-brand-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-brand-200"
          >
            مقارنة المزيد من الوسطاء ←
          </Link>

        </div>

      </div>

    </section>
  );
}

function PaymentSection({
  methods,
  countryName,
}: {
  methods: PaymentMethod[];
  countryName: string;
}) {
  if (!methods.length) return null;

  return (
    <section
      id="payments"
      className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f3f8ff_65%,#eaf3ff_100%)] px-4 py-5 sm:px-7 sm:py-6">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-[250px] w-[250px] rounded-full bg-brand-100/55 blur-[90px]"
        />

        <div className="relative">

          <span className="inline-flex min-h-[27px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
            الإيداع والسحب
          </span>

          <h2 className="mt-3 text-[23px] font-black leading-[1.14] tracking-[-0.03em] text-slate-950 sm:text-[30px]">
            طرق الدفع الشائعة للمتداولين في {countryName}
          </h2>

          <p className="mt-2 max-w-[820px] text-[10px] font-semibold leading-5 text-slate-600 sm:text-[12px] sm:leading-6">
            تعرف على وسائل الإيداع والسحب المستخدمة في {countryName}،
            مع الانتباه إلى أن توفر Visa وMastercard والتحويلات البنكية
            والمحافظ المحلية يختلف حسب شركة التداول والكيان ومزود الدفع.
          </p>

          <div className="mt-3 hidden flex-wrap gap-2 sm:flex">

            <span className="inline-flex min-h-[29px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
              <span className="text-emerald-600">✓</span>
              الإيداع يختلف حسب الوسيط
            </span>

            <span className="inline-flex min-h-[29px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
              <span className="text-emerald-600">✓</span>
              تحقق من رسوم السحب
            </span>

            <span className="inline-flex min-h-[29px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
              <span className="text-emerald-600">✓</span>
              العملة قد تؤثر في التكلفة
            </span>

          </div>

        </div>
      </div>


      {/* =====================================================
          PAYMENT METHODS
      ===================================================== */}
      <div
  className={`grid gap-3 p-3.5 sm:gap-4 sm:p-6 ${
    methods.length === 1
      ? "mx-auto w-full max-w-[360px] grid-cols-1"
      : methods.length === 2
        ? "mx-auto w-full sm:max-w-[760px] sm:grid-cols-2"
        : methods.length === 3
          ? "mx-auto w-full sm:grid-cols-2 xl:max-w-[1120px] xl:grid-cols-3"
          : "sm:grid-cols-2 xl:grid-cols-4"
  }`}
>

        {methods.map((method, index) => (

          <article
  key={method.id}
  className="group relative overflow-hidden rounded-[16px] border border-slate-200 bg-[linear-gradient(145deg,#ffffff_0%,#f8fbff_100%)] p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_28px_rgba(15,23,42,0.065)] sm:rounded-[18px] sm:p-4"
>

            {/* NUMBER */}
            <span className="absolute left-3 top-3 flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-50 px-1.5 text-[8px] font-black text-slate-500 ring-1 ring-slate-200">
              {String(index + 1).padStart(2, "0")}
            </span>


            {/* BRAND */}
            <div className="min-h-[44px] sm:min-h-[55px]">
  <PaymentBrand method={method} />
</div>


            {/* CONTENT */}
            <h3 className="mt-2.5 text-[14px] font-black leading-5 text-slate-950 sm:mt-4 sm:text-[16px] sm:leading-6">
              {method.method_name}
            </h3>

            <p className="mt-1.5 text-justify text-[9.5px] font-semibold leading-[1.7] text-slate-600 sm:mt-2 sm:text-[11px] sm:leading-[1.85]">
              {method.description ||
                `قد تتوفر هذه الوسيلة للإيداع والسحب لدى بعض شركات التداول في ${countryName}. تحقق من التوفر والرسوم والمدة لدى الوسيط قبل استخدامها.`}
            </p>


            {/* STATUS */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 sm:mt-4 sm:pt-3">

              <span className="inline-flex items-center gap-1.5 text-[9px] font-black text-emerald-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
                  ✓
                </span>
                وسيلة شائعة
              </span>

              <span className="text-[8px] font-bold text-slate-400">
                حسب الوسيط
              </span>

            </div>

          </article>

        ))}

      </div>


      {/* =====================================================
          FOOTNOTE
      ===================================================== */}
      <div className="border-t border-slate-200 bg-[#f8fbff] px-4 py-3 sm:px-6">

        <p className="text-[9px] font-semibold leading-5 text-slate-500 sm:text-[10px]">
          توفر وسيلة الدفع لا يعني أنها متاحة لدى جميع الوسطاء أو جميع
          الكيانات. قبل الإيداع، تحقق من العملة المدعومة ورسوم التحويل
          والسحب والحدود الزمنية لدى شركة التداول التي اخترتها.
        </p>

      </div>

    </section>
  );
}

function SourceLinks({ links }: { links: SourceLink[] | null }) {
  const valid = (links || []).filter((item) => item?.name && item?.url);
  if (!valid.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {valid.map((item, index) => (
        <Link
          key={`${item.url}-${index}`}
          href={item.url!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[29px] items-center rounded-lg bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-brand-200"
        >
          مصدر رسمي: {item.name}
        </Link>
      ))}
    </div>
  );
}

function CountryGuide({
  blocks,
  page,
}: {
  blocks: ContentBlock[];
  page: CountryPage;
}) {
  if (!blocks.length) return null;

  const ordered = [...blocks].sort(
    (a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999),
  );

  const getGuideMeta = (
    key: string,
    index: number,
  ) => {
    const map: Record<
      string,
      {
        number: string;
        label: string;
        icon: string;
        tone: "blue" | "green" | "amber" | "violet";
      }
    > = {
      overview: {
        number: "01",
        label: "السوق المحلي",
        icon: "↗",
        tone: "blue",
      },

      regulation: {
        number: "02",
        label: "الترخيص والأمان",
        icon: "✓",
        tone: "green",
      },

      islamic_accounts: {
        number: "03",
        label: "أنواع الحسابات",
        icon: "◐",
        tone: "violet",
      },

      local_banking: {
        number: "04",
        label: "الإيداع والسحب",
        icon: "↔",
        tone: "blue",
      },

      how_to_open_account: {
        number: "05",
        label: "فتح الحساب",
        icon: "+",
        tone: "green",
      },

      taxes: {
        number: "06",
        label: "الضرائب والتكاليف",
        icon: "%",
        tone: "amber",
      },

      tax: {
        number: "06",
        label: "الضرائب والتكاليف",
        icon: "%",
        tone: "amber",
      },

      final_verdict: {
        number: "07",
        label: "قرار الاختيار",
        icon: "★",
        tone: "blue",
      },

      how_to_choose: {
        number: "07",
        label: "قرار الاختيار",
        icon: "★",
        tone: "blue",
      },
    };

    const mappedMeta = map[key];

return {
  number: String(index + 1).padStart(2, "0"),
  label:
    mappedMeta?.label ||
    "دليل التداول",
  icon:
    mappedMeta?.icon ||
    "•",
  tone:
    mappedMeta?.tone ||
    "blue",
};
  };

  const toneClasses = {
    blue: {
      icon: "bg-brand-50 text-brand-700 ring-brand-100",
      border: "border-brand-100",
      badge: "bg-brand-50 text-brand-700",
      accent: "bg-brand-600",
    },

    green: {
      icon: "bg-emerald-50 text-emerald-700 ring-emerald-100",
      border: "border-emerald-200",
      badge: "bg-emerald-50 text-emerald-700",
      accent: "bg-emerald-500",
    },

    amber: {
      icon: "bg-amber-50 text-amber-700 ring-amber-100",
      border: "border-amber-200",
      badge: "bg-amber-50 text-amber-700",
      accent: "bg-amber-400",
    },

    violet: {
      icon: "bg-violet-50 text-violet-700 ring-violet-100",
      border: "border-violet-200",
      badge: "bg-violet-50 text-violet-700",
      accent: "bg-violet-500",
    },
  };

  return (
    <section
      id="country-guide"
      className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_55%,#eaf3ff_100%)] px-4 py-5 sm:px-7 sm:py-7">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-[280px] w-[280px] rounded-full bg-brand-100/55 blur-[100px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-[-190px] h-[260px] w-[260px] rounded-full bg-blue-100/40 blur-[100px]"
        />

        <div className="relative">

          <span className="inline-flex min-h-[28px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
            دليل التداول في {page.country_name_ar}
          </span>

          <div className="mt-3 lg:flex lg:items-end lg:justify-between lg:gap-10">

            <div>
              <h2 className="max-w-[850px] text-[24px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-[32px]">
                قبل أن تختار شركة تداول في {page.country_name_ar}
              </h2>

              <p className="mt-2 max-w-[820px] text-[10px] font-semibold leading-5 text-slate-600 sm:text-[12px] sm:leading-6">
                دليل عملي يشرح الترخيص والأمان، أنواع الحسابات، الإيداع
                والسحب، الضرائب والتكاليف، والخطوات التي تساعدك على مقارنة
                شركات تداول الفوركس قبل فتح الحساب.
              </p>
            </div>


            {/* DESKTOP TOP SUMMARY */}
            <div className="mt-4 hidden shrink-0 items-center gap-2 lg:flex">

              <div className="rounded-[14px] border border-slate-200 bg-white px-4 py-2.5 text-center shadow-sm">
                <span className="block text-[18px] font-black leading-none text-brand-700">
                  {ordered.length}
                </span>

                <span className="mt-1 block text-[8px] font-black text-slate-500">
                  محاور محلية
                </span>
              </div>

              <div className="rounded-[14px] border border-slate-200 bg-white px-4 py-2.5 text-center shadow-sm">
                <span className="block text-[11px] font-black leading-none text-emerald-700">
                  دليل عملي
                </span>

                <span className="mt-1 block text-[8px] font-black text-slate-500">
                  قبل فتح الحساب
                </span>
              </div>

            </div>

          </div>


          {/* MOBILE TOPICS STRIP */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">

            {ordered.slice(0, 5).map((block, index) => {
              const meta = getGuideMeta(
                block.section_key,
                index,
              );

              return (
                <a
                  key={block.id}
                  href={`#guide-${block.id}`}
                  className="inline-flex min-h-[31px] shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-[8px] font-black text-slate-700 shadow-sm"
                >
                  <span className="text-brand-600">
                    {meta.number}
                  </span>

                  {meta.label}
                </a>
              );
            })}

          </div>

        </div>
      </div>


      {/* =====================================================
    DESKTOP KNOWLEDGE HUB - FULL OPEN / MASONRY
===================================================== */}
<div className="hidden p-6 lg:block">

  <div className="grid grid-cols-[275px_minmax(0,1fr)] items-start gap-5">

    {/* =================================================
    DESKTOP SMART SIDEBAR
================================================= */}
<SmoothFollowSidebar
  topOffset={92}
  className="self-start space-y-4"
>

  {/* =================================================
      1. LOCAL TRUST / REGULATOR CARD
  ================================================= */}
  <aside className="overflow-hidden rounded-[22px] border border-slate-200 bg-[linear-gradient(160deg,#ffffff_0%,#f1f7ff_100%)] shadow-[0_12px_32px_rgba(15,23,42,0.05)]">

    {/* TOP */}
    <div className="relative overflow-hidden border-b border-slate-200 px-5 pb-5 pt-5">

      <div
        aria-hidden="true"
        className="absolute -left-16 -top-20 h-[180px] w-[180px] rounded-full bg-brand-100/70 blur-[65px]"
      />

      <div className="relative">

        <span className="inline-flex min-h-[25px] items-center rounded-full bg-white px-2.5 text-[8px] font-black text-brand-700 shadow-sm ring-1 ring-brand-100">
          قبل فتح الحساب
        </span>

        <div className="mt-4 flex items-center gap-3">

          <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[16px] bg-brand-600 text-white shadow-[0_10px_24px_rgba(30,91,184,0.22)]">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path
                d="M12 3 19 6v5c0 4.6-2.7 8-7 10-4.3-2-7-5.4-7-10V6l7-3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="m9 12 2 2 4-5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </div>

          <div>
            <span className="block text-[8px] font-black text-brand-600">
              التنظيم المحلي
            </span>

            <h3 className="mt-1 text-[17px] font-black leading-6 text-slate-950">
              تحقق قبل أن تختار الوسيط
            </h3>
          </div>

        </div>

        <p className="mt-3 text-[10px] font-semibold leading-[1.8] text-slate-600">
          تحقق من الكيان القانوني الذي سيفتح حسابك ومن الجهة التي تنظمه،
          وليس من اسم مجموعة الوسيط فقط.
        </p>

      </div>
    </div>


    {/* REGULATOR */}
    <div className="p-4">

      <div className="rounded-[16px] border border-brand-100 bg-white p-4 shadow-sm">

        <span className="block text-[8px] font-black text-brand-600">
          الجهة التنظيمية في {page.country_name_ar}
        </span>

        <span className="mt-1.5 block text-[14px] font-black leading-6 text-slate-950">
          {page.regulator_name || "الجهة التنظيمية المحلية"}
        </span>

      </div>


      <div className="mt-3 space-y-2">

        {[
          "تحقق من اسم الكيان القانوني",
          "قارن الترخيص وشروط الحساب",
          "راجع الإيداع والسحب والتكاليف",
        ].map((item) => (
          <div
            key={item}
            className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[9px] font-bold leading-5 text-slate-700"
          >
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[8px] font-black text-emerald-700">
              ✓
            </span>

            {item}
          </div>
        ))}

      </div>


      <div className="mt-4 grid gap-2">

        {page.regulator_url ? (
          <SecondaryLink
            href={page.regulator_url}
            className="w-full"
          >
            الموقع الرسمي للجهة
          </SecondaryLink>
        ) : null}

        <Link
          href="/licenses"
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-600 px-3 text-[10px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.16)] transition hover:bg-brand-700"
        >
          التحقق من تراخيص الوسطاء
        </Link>

      </div>

    </div>

  </aside>


  {/* =================================================
      2. GUIDE NAVIGATION
  ================================================= */}
  <nav
    aria-label={`التنقل في دليل التداول في ${page.country_name_ar}`}
    className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.045)]"
  >

    {/* NAV HEADER */}
    <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] px-4 py-3.5">

      <div className="flex items-center justify-between gap-3">

        <div>
          <span className="block text-[8px] font-black text-brand-600">
            تنقل سريع
          </span>

          <h3 className="mt-0.5 text-[14px] font-black text-slate-950">
            في هذا الدليل
          </h3>
        </div>

        <span className="flex h-9 min-w-9 items-center justify-center rounded-[11px] bg-brand-50 px-2 text-[11px] font-black text-brand-700 ring-1 ring-brand-100">
          {ordered.length}
        </span>

      </div>

    </div>


    {/* NAV ITEMS */}
    <div className="p-2.5">

      {ordered.map((block, index) => {
        const meta = getGuideMeta(
          block.section_key,
          index,
        );

        const colors =
          toneClasses[meta.tone];

        const href =
          block.section_key === "how_to_choose"
            ? "#methodology"
            : `#guide-desktop-${block.id}`;

        return (
          <a
            key={block.id}
            href={href}
            className="group flex min-h-[42px] items-center gap-2.5 rounded-[11px] px-2.5 py-2 transition hover:bg-slate-50"
          >

            {/* NUMBER */}
            <span
              dir="ltr"
              className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-[9px] bg-slate-50 px-1.5 text-[8px] font-black text-slate-500 ring-1 ring-slate-200 transition group-hover:bg-white group-hover:text-brand-700"
            >
              {meta.number}
            </span>


            {/* TITLE */}
            <span className="min-w-0 flex-1">

              <span
                className={`block text-[7px] font-black ${colors.badge
                  .replace("bg-", "text-")
                  .split(" ")[1] || "text-brand-600"}`}
              >
                {meta.label}
              </span>

              <span className="mt-0.5 block truncate text-[9px] font-black text-slate-700 group-hover:text-slate-950">
                {short(block.title, 38)}
              </span>

            </span>


            {/* ARROW */}
            <span className="text-[10px] font-black text-slate-300 transition group-hover:-translate-x-0.5 group-hover:text-brand-600">
              ←
            </span>

          </a>
        );
      })}

    </div>

  </nav>


  {/* =================================================
      3. BROKER CTA
  ================================================= */}
  <div className="relative overflow-hidden rounded-[20px] bg-[#0b326d] p-4 text-white shadow-[0_14px_30px_rgba(11,50,109,0.16)]">

    <div
      aria-hidden="true"
      className="absolute -left-12 -top-14 h-[120px] w-[120px] rounded-full bg-blue-400/20 blur-[45px]"
    />

    <div
      aria-hidden="true"
      className="absolute -bottom-16 -right-10 h-[130px] w-[130px] rounded-full bg-cyan-300/10 blur-[45px]"
    />

    <div className="relative">

      <span className="inline-flex min-h-[23px] items-center rounded-full bg-white/10 px-2.5 text-[7px] font-black text-blue-100 ring-1 ring-white/15">
        جاهز للمقارنة؟
      </span>

      <h3 className="mt-3 text-[16px] font-black leading-6 text-white">
        قارن أفضل شركات الفوركس في {page.country_name_ar}
      </h3>

      <p className="mt-2 text-[9px] font-semibold leading-5 text-blue-100/90">
        راجع أفضل الخيارات والحسابات والتكاليف قبل اتخاذ قرار فتح الحساب.
      </p>

      <a
        href="#top-brokers"
        className="mt-3 inline-flex min-h-[39px] w-full items-center justify-center gap-2 rounded-xl bg-white px-3 text-[10px] font-black text-[#0b326d] shadow-sm transition hover:-translate-y-0.5"
      >
        شاهد أفضل الشركات
        <span>↑</span>
      </a>

    </div>

  </div>

</SmoothFollowSidebar>


    {/* =================================================
        MAIN KNOWLEDGE CONTENT
    ================================================= */}
    <div className="min-w-0">

      {/* VISUAL TOP STRIP */}
      <div className="mb-4 grid grid-cols-4 gap-3">

        {[
          {
            title: "الترخيص",
            desc: "الكيان والجهة",
            icon: "✓",
          },
          {
            title: "الحسابات",
            desc: "سبريد وعمولة",
            icon: "◐",
          },
          {
            title: "الأموال",
            desc: "إيداع وسحب",
            icon: "↔",
          },
          {
            title: "الاختيار",
            desc: "قرار مناسب",
            icon: "★",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex min-h-[72px] items-center gap-3 rounded-[16px] border border-slate-200 bg-white px-4 shadow-[0_6px_18px_rgba(15,23,42,0.035)]"
          >

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[13px] font-black text-brand-700 ring-1 ring-brand-100">
              {item.icon}
            </span>

            <div>
              <span className="block text-[11px] font-black text-slate-950">
                {item.title}
              </span>

              <span className="mt-0.5 block text-[8px] font-bold text-slate-500">
                {item.desc}
              </span>
            </div>

          </div>
        ))}

      </div>


      {/* =================================================
    DESKTOP ARTICLES - ORDERED PAIRS
    01 + 02 / 03 + 04 / 05 + 06 ...
================================================= */}
<div className="grid grid-cols-2 items-stretch gap-4">

  {ordered.map((block, index) => {

    const meta = getGuideMeta(
      block.section_key,
      index,
    );

    const colors =
      toneClasses[meta.tone];

    return (
      <article
        key={block.id}
        id={
          block.section_key === "how_to_choose"
            ? "methodology"
            : `guide-desktop-${block.id}`
        }
        className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border bg-white shadow-[0_8px_24px_rgba(15,23,42,0.035)] ${colors.border}`}
      >

        {/* =================================================
            CARD HEADER
        ================================================= */}
        <div className="relative overflow-hidden border-b border-slate-100 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] px-5 pb-5 pt-5">

          <div
            className={`absolute inset-x-0 top-0 h-[3px] ${colors.accent}`}
          />

          <div className="flex items-start justify-between gap-5">

            {/* =================================================
                RIGHT: CATEGORY + TITLE
            ================================================= */}
            <div className="min-w-0 flex-1 text-right">

              <div className="flex items-center justify-start gap-2">

                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] text-[14px] font-black shadow-sm ring-1 ${colors.icon}`}
                >
                  {meta.icon}
                </span>

                <span
                  className={`inline-flex min-h-[25px] items-center rounded-full px-2.5 text-[8px] font-black ${colors.badge}`}
                >
                  {meta.label}
                </span>

              </div>


              {block.eyebrow ? (
                <span className="mt-4 block text-[9px] font-black text-brand-600">
                  {block.eyebrow}
                </span>
              ) : null}


              <h3 className="mt-1.5 max-w-[520px] text-[22px] font-black leading-[1.35] tracking-[-0.03em] text-slate-950 xl:text-[23px]">
                {block.title}
              </h3>

            </div>


            {/* =================================================
                LEFT: NUMBER
            ================================================= */}
            <div className="flex shrink-0 items-start justify-end">

              <span
                aria-hidden="true"
                dir="ltr"
                className="select-none text-[40px] font-black leading-none tracking-[-0.06em] text-slate-200"
              >
                {meta.number}
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            CONTENT
        ================================================= */}
        <div className="flex flex-1 flex-col p-5 pb-5">

          {block.short_answer ? (
            <div className="rounded-[13px] border border-brand-100 bg-brand-50/40 px-3.5 py-3">

              <span className="block text-[7px] font-black text-brand-600">
                الخلاصة
              </span>

              <p className="mt-1 text-[10.5px] font-bold leading-[1.85] text-slate-800">
                {block.short_answer}
              </p>

            </div>
          ) : null}


<div className="mt-3.5 space-y-2.5 text-justify text-[11.5px] font-semibold leading-[1.95] text-slate-600">

            {paragraphs(block.content).map(
              (text, pIndex) => (
                <p key={pIndex}>
                  {text}
                </p>
              ),
            )}

          </div>


          {/* =================================================
    KEY POINTS
================================================= */}
{block.bullets?.length ? (
  <div className="mt-4">

    <div className="mb-2 flex items-center gap-2">

      <span className="text-[8px] font-black text-slate-400">
        أهم النقاط
      </span>

      <div className="h-px flex-1 bg-slate-100" />

    </div>

    <div className="grid gap-2">

      {block.bullets
        .slice(0, 4)
        .map((bullet) => (
          <div
            key={bullet}
            className="flex min-h-[38px] items-center gap-2.5 rounded-[11px] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] px-3 py-2.5 text-[9px] font-bold leading-5 text-slate-700"
          >

            <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[8px] font-black text-emerald-700 ring-1 ring-emerald-100">
              ✓
            </span>

            <span className="flex-1">
              {bullet}
            </span>

          </div>
        ))}

    </div>

  </div>
) : null}

          <SourceLinks
            links={block.source_links}
          />


          {block.cta_label &&
          block.cta_url ? (
            <div className="mt-4">

              <SecondaryLink
                href={block.cta_url}
              >
                {block.cta_label}
              </SecondaryLink>

            </div>
          ) : null}

        </div>

            </article>
    );
  })}

</div>

{/* CLOSE MAIN KNOWLEDGE CONTENT */}
</div>

{/* CLOSE DESKTOP GRID */}
</div>

{/* CLOSE DESKTOP KNOWLEDGE HUB */}
</div>


{/* =====================================================
    MOBILE KNOWLEDGE HUB
===================================================== */}
<div className="p-3.5 lg:hidden">

        <div className="mb-3 flex items-center justify-between px-1">

          <span className="text-[9px] font-black text-slate-500">
            اختر الموضوع الذي تريد معرفته
          </span>

          <span className="text-[8px] font-bold text-brand-600">
            {ordered.length} مواضيع
          </span>

        </div>


        <div className="space-y-2.5">

          {ordered.map((block, index) => {
            const meta = getGuideMeta(
              block.section_key,
              index,
            );

            const colors = toneClasses[meta.tone];

            return (
              <details
                key={block.id}
                id={
                  block.section_key === "how_to_choose"
                    ? "methodology"
                    : `guide-${block.id}`
                }
                className={`group relative overflow-hidden rounded-[16px] border bg-white ${colors.border}`}
              >

                <div
                  className={`absolute bottom-0 right-0 top-0 w-[3px] ${colors.accent}`}
                />


                <summary className="cursor-pointer list-none px-3.5 py-3.5">

                  <div className="flex items-start gap-3">

                    {/* NUMBER / ICON */}
                    <div className="flex shrink-0 flex-col items-center gap-1.5">

                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-[11px] text-[13px] font-black ring-1 ${colors.icon}`}
                      >
                        {meta.icon}
                      </span>

                      <span className="text-[7px] font-black text-slate-400">
                        {meta.number}
                      </span>

                    </div>


                    {/* TEXT */}
                    <div className="min-w-0 flex-1">

                      <span
                        className={`inline-flex min-h-[20px] items-center rounded-full px-2 text-[7px] font-black ${colors.badge}`}
                      >
                        {meta.label}
                      </span>

                      <h3 className="mt-1.5 text-[14px] font-black leading-[1.45] text-slate-950">
                        {block.title}
                      </h3>

                      {block.short_answer ? (
                        <p className="mt-1.5 line-clamp-2 text-[9px] font-semibold leading-[1.7] text-slate-600 group-open:hidden">
                          {block.short_answer}
                        </p>
                      ) : (
                        <p className="mt-1.5 line-clamp-2 text-[9px] font-semibold leading-[1.7] text-slate-600 group-open:hidden">
                          {short(
                            paragraphs(
                              block.content,
                            )[0],
                            115,
                          )}
                        </p>
                      )}

                    </div>


                    {/* OPEN */}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-50 text-[12px] font-black text-brand-700 ring-1 ring-slate-200 transition group-open:rotate-45">
                      +
                    </span>

                  </div>

                </summary>


                {/* OPEN CONTENT */}
                <div className="border-t border-slate-100 bg-[#fbfdff] px-3.5 pb-4 pt-3.5">

                  {block.short_answer ? (
                    <div className="rounded-[12px] border border-brand-100 bg-brand-50/50 px-3 py-2.5">

                      <span className="block text-[7px] font-black text-brand-600">
                        الخلاصة السريعة
                      </span>

                      <p className="mt-1 text-[10px] font-bold leading-[1.75] text-slate-800">
                        {block.short_answer}
                      </p>

                    </div>
                  ) : null}


                  <div className="mt-3 space-y-3 text-justify text-[10px] font-semibold leading-[1.9] text-slate-600">

                    {paragraphs(block.content).map(
                      (text, pIndex) => (
                        <p key={pIndex}>
                          {text}
                        </p>
                      ),
                    )}

                  </div>


                  {block.bullets?.length ? (
                    <div className="mt-3 space-y-2">

                      {block.bullets
                        .slice(0, 4)
                        .map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-2 rounded-[11px] border border-slate-200 bg-white px-3 py-2.5 text-[9px] font-bold leading-[1.65] text-slate-700"
                          >
                            <span className="mt-0.5 text-emerald-600">
                              ✓
                            </span>

                            <span>{bullet}</span>
                          </div>
                        ))}

                    </div>
                  ) : null}


                  <SourceLinks
                    links={block.source_links}
                  />


                  {block.cta_label &&
                  block.cta_url ? (
                    <div className="mt-3">
                      <SecondaryLink
                        href={block.cta_url}
                        className="w-full"
                      >
                        {block.cta_label}
                      </SecondaryLink>
                    </div>
                  ) : null}

                </div>

              </details>
            );
          })}

        </div>


        {/* MOBILE LOCAL REGULATOR */}
        <div className="mt-3 overflow-hidden rounded-[16px] border border-brand-100 bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_100%)]">

          <div className="flex items-center gap-3 p-3.5">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white text-[15px] font-black text-brand-700 shadow-sm ring-1 ring-brand-100">
              ✓
            </span>

            <div className="min-w-0">

              <span className="block text-[7px] font-black text-brand-600">
                الجهة التنظيمية المحلية
              </span>

              <span className="mt-0.5 block text-[11px] font-black leading-5 text-slate-950">
                {page.regulator_name ||
                  "تحقق من الجهة التنظيمية"}
              </span>

            </div>

          </div>


          {page.regulator_url ? (
            <div className="border-t border-brand-100 px-3.5 py-3">

              <SecondaryLink
                href={page.regulator_url}
                className="w-full"
              >
                زيارة الموقع الرسمي
              </SecondaryLink>

            </div>
          ) : null}

        </div>

      </div>

    </section>
  );
}

function FaqSection({
  faqs,
  countryName,
}: {
  faqs: FaqRow[];
  countryName: string;
}) {
  if (!faqs.length) return null;

  return (
    <section
      id="faq"
      className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_60%,#eaf3ff_100%)] px-4 py-5 text-right sm:px-7 sm:py-7">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-[240px] w-[240px] rounded-full bg-brand-100/55 blur-[90px]"
        />

        <div className="relative">

          <span className="inline-flex min-h-[27px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
            أسئلة شائعة
          </span>

          <h2 className="mt-3 max-w-[980px] text-[24px] font-black leading-[1.14] tracking-[-0.03em] text-slate-950 sm:text-[31px]">
            أهم أسئلة المتداولين عن شركات الفوركس في {countryName}
          </h2>

          <p className="mt-2 max-w-[900px] text-[10px] font-semibold leading-5 text-slate-600 sm:text-[12px] sm:leading-6">
            إجابات مختصرة على أكثر الأسئلة المتعلقة باختيار شركة التداول،
            الترخيص، الحسابات الإسلامية، الإيداع والسحب وتكاليف التداول في {countryName}.
          </p>

        </div>

      </div>


      {/* =====================================================
          FAQ LIST
          MOBILE = CARDS
          DESKTOP = SINGLE PREMIUM LIST
      ===================================================== */}
      <div className="p-3.5 sm:p-6 lg:px-8 lg:py-7">

        <div className="mx-auto max-w-[1180px]">

          <div className="space-y-2.5 lg:space-y-0 lg:overflow-hidden lg:rounded-[20px] lg:border lg:border-slate-200 lg:bg-white lg:shadow-[0_8px_24px_rgba(15,23,42,0.035)]">

            {faqs.map((faq, index) => (

              <details
                key={faq.id}
                className="
                  group overflow-hidden rounded-[16px] border border-slate-200
                  bg-[linear-gradient(135deg,#ffffff_0%,#fbfdff_100%)]
                  transition duration-200
                  open:border-brand-200
                  open:shadow-[0_10px_26px_rgba(15,23,42,0.05)]

                  lg:rounded-none
                  lg:border-0
                  lg:border-b
                  lg:border-slate-200
                  lg:bg-white
                  lg:shadow-none
                  lg:last:border-b-0
                  lg:open:bg-[#f9fbff]
                  lg:open:shadow-none
                "
              >

                <summary
                  className="
                    flex cursor-pointer list-none items-center gap-3
                    px-3.5 py-3.5

                    sm:px-5 sm:py-4

                    lg:min-h-[68px]
                    lg:px-6
                    lg:py-4
                  "
                >

                  {/* NUMBER */}
                  <span
                    dir="ltr"
                    className="
                      flex h-8 min-w-8 shrink-0 items-center justify-center
                      rounded-[10px] bg-slate-50 px-1.5
                      text-[8px] font-black text-slate-400
                      ring-1 ring-slate-200

                      sm:h-9 sm:min-w-9 sm:text-[9px]

                      lg:h-10 lg:min-w-10
                      lg:rounded-[12px]
                      lg:bg-brand-50
                      lg:text-[10px]
                      lg:text-brand-700
                      lg:ring-brand-100
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>


                  {/* QUESTION */}
                  <h3
                    className="
                      min-w-0 flex-1
                      text-right
                      text-[12px] font-black leading-[1.65] text-slate-950

                      sm:text-[15px] sm:leading-6

                      lg:text-[16px]
                      lg:leading-7
                    "
                  >
                    {faq.question}
                  </h3>


                  {/* OPEN */}
                  <span
                    className="
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-full bg-white
                      text-[14px] font-black text-brand-700
                      shadow-sm ring-1 ring-slate-200
                      transition duration-200
                      group-open:rotate-45
                      group-open:bg-brand-50

                      lg:h-9 lg:w-9
                    "
                  >
                    +
                  </span>

                </summary>


                {/* ANSWER */}
                <div className="border-t border-slate-100 bg-[#fbfdff] px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5 lg:bg-white lg:px-6 lg:pb-5 lg:pt-4">

                  <div className="mr-[44px] sm:mr-[52px] lg:mr-[52px] lg:max-w-[980px]">

                    <p className="text-justify text-[10px] font-semibold leading-[1.9] text-slate-600 sm:text-[12px] sm:leading-7 lg:text-[12.5px]">
                      {faq.answer}
                    </p>


                    {faq.link_label && faq.link_url ? (
                      <Link
                        href={faq.link_url}
                        className="mt-3 inline-flex min-h-[33px] items-center rounded-[9px] border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm transition hover:bg-brand-50 sm:text-[10px]"
                      >
                        {faq.link_label}
                      </Link>
                    ) : null}

                  </div>

                </div>

              </details>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

function FinalCta({
  page,
  winner,
}: {
  page: CountryPage;
  winner: Broker | null;
}) {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-brand-100 bg-[linear-gradient(135deg,#ffffff_0%,#f1f7ff_52%,#e7f1ff_100%)] shadow-[0_16px_42px_rgba(30,91,184,0.08)] sm:rounded-[28px]">

      {/* DECORATIONS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-32 h-[280px] w-[280px] rounded-full bg-brand-100/75 blur-[95px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-[260px] w-[260px] rounded-full bg-blue-100/55 blur-[95px]"
      />


      <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_330px]">

        {/* =================================================
            CONTENT
        ================================================= */}
        <div className="px-4 py-5 text-center sm:px-7 sm:py-7 lg:px-8 lg:py-8 lg:text-right">

          <span className="inline-flex min-h-[27px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
            الخلاصة
          </span>


          <h2 className="mx-auto mt-3 max-w-[760px] text-[25px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-[32px] lg:mx-0">
            ما أفضل شركة لتداول الفوركس في {page.country_name_ar}؟
          </h2>


          <p className="mx-auto mt-2.5 max-w-[760px] text-[10px] font-semibold leading-[1.85] text-slate-600 sm:text-[12px] sm:leading-6 lg:mx-0">
            لا يوجد وسيط واحد مناسب للجميع. استخدم الترتيب ومقارنة الحسابات
            والترخيص والتكاليف وطرق الإيداع والسحب لاختيار الشركة الأقرب إلى
            احتياجاتك وأسلوب تداولك.
          </p>


          <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">

            <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[8px] font-black text-slate-700 ring-1 ring-slate-200 sm:text-[9px]">
              <span className="text-emerald-600">✓</span>
              تحقق من الترخيص
            </span>

            <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[8px] font-black text-slate-700 ring-1 ring-slate-200 sm:text-[9px]">
              <span className="text-emerald-600">✓</span>
              قارن الحساب والتكلفة
            </span>

            <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[8px] font-black text-slate-700 ring-1 ring-slate-200 sm:text-[9px]">
              <span className="text-emerald-600">✓</span>
              اختر ما يناسبك محليًا
            </span>

          </div>

        </div>


        {/* =================================================
            WINNER
        ================================================= */}
        <div className="border-t border-brand-100 bg-white/65 p-4 backdrop-blur sm:p-5 lg:border-r lg:border-t-0">

          {winner ? (

            <div className="flex h-full flex-col justify-center rounded-[20px] border border-slate-200 bg-white p-4 text-center shadow-[0_10px_28px_rgba(15,23,42,0.055)]">

              <span className="text-[8px] font-black text-brand-600">
                الأعلى في الترتيب الحالي
              </span>


              {/* BIG LOGO - لا نستخدم BrokerLogo هنا */}
              <Link
                href={brokerHref(winner)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`تقييم ${winner.name}`}
                className="group mx-auto mt-2.5 flex w-fit items-center justify-center"
              >

                {winner.logo ? (

                  <div className="relative h-[88px] w-[190px] sm:h-[96px] sm:w-[210px]">

                    <Image
                      src={winner.logo}
                      alt={`شعار ${winner.name ?? "شركة التداول"}`}
                      fill
                      className="object-contain transition duration-200 group-hover:scale-[1.04]"
                      sizes="210px"
                    />

                  </div>

                ) : (

                  <span
                    dir="ltr"
                    className="text-[26px] font-black text-slate-900"
                  >
                    {(winner.name || "BA")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>

                )}

              </Link>


              {/* SMALL NAME */}
              <Link
                href={brokerHref(winner)}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mx-auto mt-0.5 block w-fit text-[12px] font-black text-slate-600 transition hover:text-brand-700 sm:text-[13px]"
              >
                {winner.name}
              </Link>


              <div className="mt-3 grid grid-cols-2 gap-2">

                <PrimaryLink
                  href={realHref(winner)}
                  className="w-full"
                >
                  فتح حساب
                </PrimaryLink>

                <SecondaryLink
                  href="#comparison"
                  className="w-full"
                >
                  قارن الحسابات
                </SecondaryLink>

              </div>

            </div>

          ) : (

            <div className="flex h-full items-center justify-center">

              <SecondaryLink
                href="#comparison"
                className="w-full"
              >
                قارن الحسابات
              </SecondaryLink>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}

export default async function BestBrokersCountryPage({
  params,
}: PageProps) {
  const { country } = await params;
  const data = await getCountryData(country);

  if (!data) notFound();

  const { page, rankings, blocks, faqs, payments } = data;
  const topFive = rankings.slice(0, 5);
  const winner = oneBroker(topFive[0]?.brokers || null);

  const brokerIds = topFive
    .map((row) => oneBroker(row.brokers)?.id)
    .filter(Boolean) as number[];

  const accounts =
  await getBrokerAccounts(
    brokerIds,
  );

const pageUrl =
  `${BASE_URL}/best-brokers/${page.slug}`;

const schemaLanguage =
  page.country_code
    ? `ar-${page.country_code.toUpperCase()}`
    : "ar";

const organizationId =
  `${BASE_URL}/#organization`;

const websiteId =
  `${BASE_URL}/#website`;

const webpageId =
  `${pageUrl}#webpage`;

const articleId =
  `${pageUrl}#article`;

const breadcrumbId =
  `${pageUrl}#breadcrumb`;

const brokerListId =
  `${pageUrl}#broker-list`;

const faqId =
  `${pageUrl}#faq`;

const pageTitle =
  page.seo_title ||
  page.hero_title ||
  `أفضل شركات تداول الفوركس في ${page.country_name_ar} 2026`;

const pageDescription =
  page.seo_description ||
  page.hero_description ||
  page.local_trading_summary ||
  `دليل ومقارنة أفضل شركات تداول الفوركس في ${page.country_name_ar} من حيث الترخيص، الأمان، الحسابات، السبريد، التكاليف، المنصات وطرق الإيداع والسحب.`;


/* =========================================================
   STRUCTURED DATA
========================================================= */
const structuredData = {
  "@context": "https://schema.org",

  "@graph": [

    /* =====================================================
       ORGANIZATION
    ===================================================== */
    {
  "@type": "Organization",
  "@id": organizationId,

  name: "بروكر العرب",
  alternateName: "Broker Alarab",

  url: BASE_URL,

  logo: {
    "@type": "ImageObject",
    "@id": `${BASE_URL}/#logo`,
    url: OG_IMAGE,
    contentUrl: OG_IMAGE,
    caption: "بروكر العرب",
  },
},


    /* =====================================================
       WEBSITE
    ===================================================== */
    {
      "@type": "WebSite",
      "@id": websiteId,

      url: BASE_URL,

      name: "بروكر العرب",
      alternateName: "Broker Alarab",

      publisher: {
        "@id": organizationId,
      },

      inLanguage: [
        "ar",
        "en",
      ],
    },


    /* =====================================================
       WEB PAGE / COLLECTION PAGE
    ===================================================== */
    {
      "@type": [
        "WebPage",
        "CollectionPage",
      ],

      "@id": webpageId,

      url: pageUrl,

      name: pageTitle,

      headline: pageTitle,

      description: pageDescription,

      inLanguage: schemaLanguage,

      isPartOf: {
        "@id": websiteId,
      },

      publisher: {
        "@id": organizationId,
      },

      about: [
        {
          "@type": "Thing",
          name:
            `تداول الفوركس في ${page.country_name_ar}`,
        },

        {
          "@type": "Thing",
          name:
            `شركات التداول في ${page.country_name_ar}`,
        },

        {
          "@type": "Thing",
          name:
            `وسطاء الفوركس في ${page.country_name_ar}`,
        },
      ],

      primaryImageOfPage: {
        "@type": "ImageObject",

        "@id":
          `${pageUrl}#primaryimage`,

        url: OG_IMAGE,

        contentUrl: OG_IMAGE,

        width: 1560,

        height: 377,

        caption:
          `أفضل شركات تداول الفوركس في ${page.country_name_ar}`,
      },

      breadcrumb: {
        "@id": breadcrumbId,
      },

      mainEntity: {
        "@id": brokerListId,
      },

      hasPart: [
        {
          "@id": articleId,
        },

        ...(faqs.length
          ? [
              {
                "@id": faqId,
              },
            ]
          : []),
      ],

      ...(page.last_updated
        ? {
            dateModified:
              page.last_updated,
          }
        : {}),
    },


    /* =====================================================
       ARTICLE / EDITORIAL GUIDE
    ===================================================== */
    {
      "@type": "Article",

      "@id": articleId,

      url: pageUrl,

      headline: pageTitle,

      name: pageTitle,

      description:
        pageDescription,

      inLanguage:
        schemaLanguage,

      mainEntityOfPage: {
        "@id": webpageId,
      },

      isPartOf: {
        "@id": webpageId,
      },

      image: {
        "@id":
          `${pageUrl}#primaryimage`,
      },

      author: {
        "@id": organizationId,
      },

      publisher: {
        "@id": organizationId,
      },

      articleSection: [
        "أفضل شركات تداول الفوركس",

        `تداول الفوركس في ${page.country_name_ar}`,

        "مقارنة الوسطاء",

        "حسابات التداول",

        "الترخيص والأمان",

        "طرق الإيداع والسحب",
      ],

      keywords: [
        `أفضل شركات التداول في ${page.country_name_ar}`,

        `أفضل شركات الفوركس في ${page.country_name_ar}`,

        `شركات تداول الفوركس في ${page.country_name_ar}`,

        `وسطاء الفوركس في ${page.country_name_ar}`,

        `أفضل وسيط فوركس في ${page.country_name_ar}`,

        `تداول الفوركس في ${page.country_name_ar}`,

        `أفضل وسيط تداول في ${page.country_name_ar}`,
      ],

      ...(page.last_updated
        ? {
            dateModified:
              page.last_updated,
          }
        : {}),
    },


    /* =====================================================
       BROKER RANKING
    ===================================================== */
    {
      "@type": "ItemList",

      "@id": brokerListId,

      url:
        `${pageUrl}#top-brokers`,

      name:
        `ترتيب أفضل شركات تداول الفوركس في ${page.country_name_ar}`,

      description:
        `مقارنة وترتيب أفضل شركات ووسطاء الفوركس المتاحين للمتداولين في ${page.country_name_ar} حسب الأمان، الترخيص، الحسابات والتكاليف وملاءمة الوسيط محليًا.`,

      numberOfItems:
        topFive.length,

      itemListOrder:
        "https://schema.org/ItemListOrderAscending",

      mainEntityOfPage: {
        "@id": webpageId,
      },

      itemListElement:
        topFive
          .map((row) => {

            const broker =
              oneBroker(
                row.brokers,
              );

            if (
              !broker?.slug ||
              !broker.name
            ) {
              return null;
            }

            const brokerUrl =
              `${BASE_URL}/brokers/${broker.slug}`;

            return {
              "@type":
                "ListItem",

              position:
                row.rank_position,

              name:
                broker.name,

              url:
                brokerUrl,

              item: {
                "@type":
                  "Organization",

                "@id":
                  `${brokerUrl}#broker`,

                name:
                  broker.name,

                url:
                  brokerUrl,

                ...(broker.logo
                  ? {
                      logo: {
                        "@type":
                          "ImageObject",

                        url:
                          broker.logo,

                        contentUrl:
                          broker.logo,

                        caption:
                          `شعار ${broker.name}`,
                      },
                    }
                  : {}),
              },
            };
          })
          .filter(Boolean),
    },


    /* =====================================================
       BREADCRUMB
    ===================================================== */
    {
      "@type":
        "BreadcrumbList",

      "@id":
        breadcrumbId,

      itemListElement: [

        {
          "@type":
            "ListItem",

          position: 1,

          name:
            "الرئيسية",

          item:
            BASE_URL,
        },


        {
          "@type":
            "ListItem",

          position: 2,

          name:
            "أفضل شركات التداول",

          item:
            `${BASE_URL}/best-brokers`,
        },


        {
          "@type":
            "ListItem",

          position: 3,

          name:
            pageTitle,

          item:
            pageUrl,
        },

      ],
    },


    /* =====================================================
       FAQ
    ===================================================== */
    ...(faqs.length
      ? [
          {
            "@type":
              "FAQPage",

            "@id":
              faqId,

            url:
              `${pageUrl}#faq`,

            name:
              `أسئلة شائعة عن شركات الفوركس في ${page.country_name_ar}`,

            description:
              `إجابات على أبرز أسئلة المتداولين حول شركات التداول والفوركس والترخيص والحسابات في ${page.country_name_ar}.`,

            inLanguage:
              schemaLanguage,

            isPartOf: {
              "@id":
                webpageId,
            },

            mainEntity:
              faqs.map(
                (faq) => ({
                  "@type":
                    "Question",

                  name:
                    cleanText(
                      faq.question,
                    ),

                  acceptedAnswer: {
                    "@type":
                      "Answer",

                    text:
                      cleanText(
                        faq.answer,
                      ),
                  },
                }),
              ),
          },
        ]
      : []),

  ],
};


/* =========================================================
   SAFE JSON-LD OUTPUT
========================================================= */
const structuredDataJson =
  JSON.stringify(
    structuredData,
  ).replace(
    /</g,
    "\\u003c",
  );


/* =========================================================
   PAGE
========================================================= */
return (
  <main
    dir="rtl"
    className="min-h-screen bg-[#f4f7fb] text-slate-950"
  >

    {/* =====================================================
        STRUCTURED DATA
    ===================================================== */}
    <Script
      id={`country-structured-data-${page.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          structuredDataJson,
      }}
    />


    {/* =====================================================
        HERO
    ===================================================== */}
    <HeroSection
      page={page}
      totalBrokers={
        topFive.length
      }
      totalPayments={
        payments.length
      }
    />


    {/* =====================================================
        PAGE CONTENT
    ===================================================== */}
    <div className="mx-auto w-full max-w-[1520px] px-3 pb-5 pt-3 sm:px-6 sm:pb-8 sm:pt-6 lg:px-8">

      <div className="space-y-5 sm:space-y-7">

        {/* =================================================
            QUICK PICKS
        ================================================= */}
        <QuickPicks
          rows={topFive}
          countryName={
            page.country_name_ar
          }
        />


        {/* =================================================
            COMPARISON
        ================================================= */}
        <ComparisonSection
          rows={topFive}
          accounts={accounts}
          countryName={
            page.country_name_ar
          }
          intro={
            page.comparison_intro
          }
        />


        {/* =================================================
            PAYMENT METHODS
        ================================================= */}
        <PaymentSection
          methods={payments}
          countryName={
            page.country_name_ar
          }
        />


        {/* =================================================
            COUNTRY GUIDE
        ================================================= */}
        <CountryGuide
          blocks={blocks}
          page={page}
        />


        {/* =================================================
            FAQ
        ================================================= */}
        <FaqSection
          faqs={faqs}
          countryName={
            page.country_name_ar
          }
        />


        {/* =================================================
            RISK WARNING
        ================================================= */}
        {page.risk_warning ? (

          <div className="rounded-[18px] border border-amber-200 bg-[#fffaf0] px-4 py-3.5 text-[9px] font-semibold leading-5 text-amber-950 sm:px-5 sm:text-[10px]">

            <span className="font-black">
              تنبيه مخاطر:{" "}
            </span>

            {page.risk_warning}

          </div>

        ) : null}


        {/* =================================================
            FINAL CTA
        ================================================= */}
        <FinalCta
          page={page}
          winner={winner}
        />

      </div>

    </div>

  </main>
);
}