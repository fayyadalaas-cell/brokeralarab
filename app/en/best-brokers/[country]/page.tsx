import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SmoothFollowSidebar from "@/app/components/SmoothFollowSidebar";

export const dynamic = "force-dynamic";

const BASE_URL = "https://brokeralarab.com";


/* =========================================================
   TYPES
========================================================= */

type PageProps = {
  params: Promise<{
    country: string;
  }>;
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
  best_for_en: string | null;
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

  brokers:
    | Broker
    | Broker[]
    | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;

  account_name: string | null;

  spread: string | null;

  commission: string | null;
  commission_en: string | null;

  min_deposit: string | null;
  min_deposit_en: string | null;

  execution_type: string | null;

  best_for: string | null;
  best_for_en: string | null;

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

  source_links:
    | SourceLink[]
    | null;

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

  target_queries:
    | string[]
    | null;

  source_links:
    | SourceLink[]
    | null;

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


/* =========================================================
   HELPERS
========================================================= */

function oneBroker(
  value:
    | Broker
    | Broker[]
    | null,
): Broker | null {
  if (!value) return null;

  return Array.isArray(value)
    ? value[0] ?? null
    : value;
}

function normalizeText(
  value:
    | string
    | null
    | undefined,
  fallback = "",
) {
  return value?.trim() || fallback;
}

function cleanText(
  value:
    | string
    | null
    | undefined,
) {
  return normalizeText(value)
    .replace(/\s+/g, " ")
    .trim();
}

function short(
  value:
    | string
    | null
    | undefined,
  max = 160,
) {
  const text = cleanText(value);

  if (!text) return "";

  return text.length > max
    ? `${text.slice(0, max).trim()}…`
    : text;
}

function paragraphs(
  value:
    | string
    | null
    | undefined,
) {
  return normalizeText(value)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function splitValues(
  value:
    | string
    | null
    | undefined,
  limit = 4,
) {
  return normalizeText(value)
    .split(/\|\||\||,|\/|;|\n|،/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function formatRating(
  value:
    | number
    | null
    | undefined,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  return Number(value).toFixed(2);
}

function formatUpdated(
  value:
    | string
    | null
    | undefined,
) {
  if (!value) {
    return "Updated regularly";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(date);
}

function money(
  value:
    | number
    | null
    | undefined,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "Not specified";
  }

  return `$${value}`;
}


/* =========================================================
   SEO-FRIENDLY DYNAMIC RANKING TITLE
========================================================= */

function forexRankingTitle(
  count: number,
  countryName: string,
) {
  if (count === 1) {
    return `Best Forex Broker in ${countryName}`;
  }

  if (count === 2) {
    return `2 Best Forex Brokers in ${countryName}`;
  }

  return `${count} Best Forex Brokers in ${countryName}`;
}


/* =========================================================
   URL HELPERS
========================================================= */

function brokerHref(
  broker: Broker,
) {
  return broker.slug
    ? `/en/brokers/${broker.slug}`
    : "/en/brokers";
}

function realHref(
  broker: Broker,
) {
  if (
    broker.slug &&
    broker.real_account_url
  ) {
    return `/go/${broker.slug}?type=real&source=country-page-en`;
  }

  return brokerHref(broker);
}

function accountSlug(
  value:
    | string
    | null
    | undefined,
) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function accountHref(
  broker: Broker,
  account:
    | BrokerAccount
    | null,
) {
  if (
    !broker.slug ||
    !account?.account_name
  ) {
    return brokerHref(broker);
  }

  const slug = accountSlug(
    account.account_name,
  );

  return slug
    ? `/en/brokers/${broker.slug}/accounts/${slug}`
    : brokerHref(broker);
}

function findAccount(
  accounts: BrokerAccount[],
  brokerId: number,
  accountTypes: string[],
) {
  const rows = accounts.filter(
    (row) =>
      row.broker_id === brokerId,
  );

  for (
    const type of accountTypes
  ) {
    const found = rows.find(
      (row) =>
        row.account_type === type,
    );

    if (found) return found;
  }

  return rows[0] ?? null;
}

function accountSpread(
  account:
    | BrokerAccount
    | null,
) {
  if (!account) {
    return "Not specified";
  }

  if (account.spread?.trim()) {
    return account.spread.trim();
  }

  if (
    account.spread_min !== null &&
    account.spread_min !==
      undefined
  ) {
    return `From ${Number(
      account.spread_min,
    )} pips`;
  }

  return "Not specified";
}

function isExternal(
  url: string,
) {
  return /^https?:\/\//i.test(
    url,
  );
}


/* =========================================================
   STARS
========================================================= */

function renderStars(
  rating:
    | number
    | null
    | undefined,
) {
  const safeRating = Math.max(
    0,
    Math.min(
      5,
      Number(rating ?? 0),
    ),
  );

  const percentage =
    (safeRating / 5) * 100;

  return (
    <div
      className="relative inline-flex text-[15px] leading-none"
      dir="ltr"
      aria-label={`${formatRating(
        rating,
      )} out of 5`}
    >
      <div
        className="flex gap-0.5 text-slate-300"
        aria-hidden="true"
      >
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{
          width: `${percentage}%`,
        }}
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


/* =========================================================
   BROKER LOGO
========================================================= */

function BrokerLogo({
  broker,
  size = "medium",
  linked = true,
}: {
  broker: Broker;

  size?:
    | "small"
    | "medium"
    | "large";

  linked?: boolean;
}) {
  const dimensions = {
    small:
      "h-[42px] w-[86px]",

    medium:
      "h-[48px] w-[104px] sm:h-[54px] sm:w-[118px]",

    large:
      "h-[58px] w-[124px] sm:h-[66px] sm:w-[142px]",
  }[size];

  const logo = broker.logo ? (
    <Image
      src={broker.logo}
      alt={`${broker.name ?? "Forex broker"} logo`}
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
      {(broker.name || "BA")
        .slice(0, 2)
        .toUpperCase()}
    </span>
  );

  const classes = `
    relative flex shrink-0
    items-center justify-center
    ${dimensions}
  `;

  if (
    !linked ||
    !broker.slug
  ) {
    return (
      <div className={classes}>
        {logo}
      </div>
    );
  }

  return (
    <Link
      href={`/en/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes} transition duration-200 hover:scale-[1.04]`}
    >
      {logo}
    </Link>
  );
}


/* =========================================================
   BUTTONS
========================================================= */

function PrimaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external =
    isExternal(href);

  return (
    <Link
      href={href}
      target={
        external
          ? "_blank"
          : undefined
      }
      rel={
        external
          ? "nofollow sponsored noopener noreferrer"
          : undefined
      }
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


/* =========================================================
   PAYMENT ICON
========================================================= */

function PaymentIcon({
  name,
}: {
  name: string | null;
}) {
  const cls = "h-5 w-5";

  if (
    name === "credit-card"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cls}
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M3 9h18M7 15h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (
    name === "smartphone"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cls}
        aria-hidden="true"
      >
        <rect
          x="7"
          y="2.5"
          width="10"
          height="19"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M10 5h4M11 18.5h2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "wallet") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cls}
        aria-hidden="true"
      >
        <path
          d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M15 10h6v4h-6a2 2 0 1 1 0-4Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === "bolt") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cls}
        aria-hidden="true"
      >
        <path
          d="m13.5 2-8 12h6L10.5 22l8-12h-6l1-8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "coins") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cls}
        aria-hidden="true"
      >
        <ellipse
          cx="9"
          cy="7"
          rx="5"
          ry="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7M4 11v4c0 1.4 2.2 2.5 5 2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cls}
      aria-hidden="true"
    >
      <path
        d="M3 10h18M5 10V7l7-4 7 4v3M6 10v8M10 10v8M14 10v8M18 10v8M4 21h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   PAYMENT BRAND
========================================================= */

function PaymentBrand({
  method,
}: {
  method: PaymentMethod;
}) {
  const name = normalizeText(
    method.method_name,
  ).toLowerCase();

  const isVisa =
    name.includes("visa");

  const isMastercard =
    name.includes("mastercard") ||
    name.includes("master card");

  const isApplePay =
    name.includes("apple pay") ||
    name.includes("applepay");

  const isKnet =
    name.includes("knet");

  const isMada =
    name.includes("mada");

  const isBank =
    name.includes("bank") ||
    name.includes(
      "bank transfer",
    ) ||
    name.includes(
      "wire transfer",
    );

  if (
    isVisa ||
    isMastercard
  ) {
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
      <PaymentIcon
        name={method.icon_name}
      />
    </div>
  );
}


/* =========================================================
   DATA
========================================================= */

async function getCountryData(
  slug: string,
) {
  const supabase =
    await createClient();

  const { data: page } =
    await supabase
      .from("country_pages")
      .select("*")
      .eq("slug", slug)

      /*
       * IMPORTANT:
       * English country pages exist ONLY
       * when en_enabled = true.
       *
       * Example:
       * Saudi Arabia can be Arabic-only.
       * Vietnam can be English-only.
       */
      .eq("en_enabled", true)

      .maybeSingle();

  if (!page) return null;

  const [
    rankingsResult,
    blocksResult,
    faqsResult,
    paymentsResult,
  ] = await Promise.all([
    supabase
      .from(
        "country_broker_rankings",
      )
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
          best_for_en,
          pros,
          real_account_url,
          islamic_account,
          arabic_support
        )
      `)
      .eq(
        "country_id",
        page.id,
      )
      .order(
        "rank_position",
        {
          ascending: true,
        },
      ),

    supabase
      .from(
        "country_content_blocks",
      )
      .select("*")
      .eq(
        "country_id",
        page.id,
      )
      .eq("locale", "en")
      .order(
        "sort_order",
        {
          ascending: true,
        },
      ),

    supabase
      .from("country_faqs")
      .select("*")
      .eq(
        "country_id",
        page.id,
      )
      .eq("locale", "en")
      .order(
        "sort_order",
        {
          ascending: true,
        },
      ),

    supabase
      .from(
        "country_payment_methods",
      )
      .select("*")
      .eq(
        "country_id",
        page.id,
      )
      .eq("locale", "en")
      .eq(
        "supported",
        true,
      )
      .order(
        "sort_order",
        {
          ascending: true,
        },
      ),
  ]);

  return {
    page:
      page as CountryPage,

    rankings: (
      (rankingsResult.data ||
        []) as RankingRow[]
    ).filter((row) =>
      oneBroker(row.brokers),
    ),

    blocks:
      (blocksResult.data ||
        []) as ContentBlock[],

    faqs:
      (faqsResult.data ||
        []) as FaqRow[],

    payments:
      (paymentsResult.data ||
        []) as PaymentMethod[],
  };
}

async function getBrokerAccounts(
  brokerIds: number[],
) {
  if (!brokerIds.length) {
    return [];
  }

  const supabase =
    await createClient();

  const { data } =
    await supabase
      .from("broker_accounts")
      .select("*")
      .in(
  "broker_id",
  brokerIds,
)
.eq("publication_status", "published")
.order(
  "broker_id",
        {
          ascending: true,
        },
      )
      .order(
        "sort_order",
        {
          ascending: true,
        },
      );

  return (
    data || []
  ) as BrokerAccount[];
}


/* =========================================================
   METADATA / SEO
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country } =
    await params;

  const data =
    await getCountryData(
      country,
    );

  if (!data) {
    return {
      title:
        "Page Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { page } = data;

  const countryName =
    page.country_name_en;

  const pageUrl =
    `${BASE_URL}/en/best-brokers/${page.slug}`;

  const countryCode =
  page.country_code?.toUpperCase();

  /*
   * Core Google queries targeted naturally:
   *
   * best forex brokers in [country]
   * best forex trading platforms in [country]
   * regulated forex brokers in [country]
   * forex brokers for traders in [country]
   * best forex broker [country]
   */
  const defaultTitle =
    `Best Forex Brokers in ${countryName} 2026`;

  const defaultDescription =
    `Compare the best forex brokers in ${countryName} for 2026. Review regulation, trading accounts, spreads, fees, platforms, minimum deposits and local payment methods.`;

  const languages:
  Record<string, string> = {
    [countryCode
      ? `en-${countryCode}`
      : "en"]:
      pageUrl,
  };

if (page.ar_enabled) {
  languages[
    countryCode
      ? `ar-${countryCode}`
      : "ar"
  ] =
    `${BASE_URL}/best-brokers/${page.slug}`;
}

  return {
    /*
     * Do NOT use page.seo_title here unless
     * your country_pages table has dedicated
     * English SEO fields.
     *
     * The existing page.seo_title in the Arabic
     * template may contain Arabic text.
     */
    title: defaultTitle,

    description:
      defaultDescription,

    applicationName:
      "Broker Alarab",

    category:
      "Finance",

    creator:
      "Broker Alarab Editorial Team",

    publisher:
      "Broker Alarab",

    authors: [
      {
        name:
          "Broker Alarab Editorial Team",
      },
    ],

    alternates: {
      canonical:
        pageUrl,

      languages,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        noimageindex:
          false,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview":
          -1,
      },
    },

openGraph: {
  type: "article",

  locale:
    countryCode
      ? `en_${countryCode}`
      : "en",

  url:
    pageUrl,

  title:
    defaultTitle,

  description:
    `Compare top forex brokers and trading platforms in ${countryName}, including regulation, account types, spreads, fees and funding options.`,

  siteName:
    "Broker Alarab",

  modifiedTime:
    page.last_updated ||
    undefined,

  section:
    "Best Forex Brokers",
},

twitter: {
  card:
    "summary",

  title:
    defaultTitle,

  description:
    `Compare the best forex brokers in ${countryName} for regulation, spreads, trading accounts and costs.`,
},

  };
}


/* =========================================================
   HERO
========================================================= */

function HeroSection({
  page,
  totalBrokers,
  totalPayments,
}: {
  page: CountryPage;
  totalBrokers: number;
  totalPayments: number;
}) {
  const countryName =
    page.country_name_en;

  /*
   * We intentionally generate the English hero copy
   * here instead of reusing Arabic country-page fields.
   *
   * When dedicated English hero columns are added later,
   * they can replace these fallbacks.
   */
  const heroTitle =
    `Best Forex Brokers in ${countryName}`;

  const intro =
    `Compare trusted forex brokers available to traders in ${countryName}, including regulation, account types, trading costs, platforms, minimum deposits and funding options.`;

  const desktopStats = [
    {
      value:
        String(totalBrokers),

      title:
        "Brokers",

      desc:
        "selected",
    },

    {
      value:
        String(totalPayments),

      title:
        "Payment methods",

      desc:
        "available",
    },

    {
      value: "7",

      title:
        "Key areas",

      desc:
        "reviewed",
    },
  ];

  const mobileStats = [
    [
      String(totalBrokers),
      "Brokers",
    ],

    [
      String(totalPayments),
      "Payments",
    ],

    [
      "7",
      "Factors",
    ],
  ] as const;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f2f7fd_100%)]">

      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-56 h-[520px] w-[520px] rounded-full bg-brand-100/55 blur-[135px]" />

        <div className="absolute -right-44 bottom-[-300px] h-[500px] w-[500px] rounded-full bg-blue-100/45 blur-[145px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.99),transparent_42%)]" />

        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(30,91,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,91,184,0.055)_1px,transparent_1px)] [background-size:54px_54px]" />
      </div>


      <div className="relative mx-auto w-full max-w-[1520px] px-4 pb-5 pt-4 sm:px-6 sm:pb-7 sm:pt-5 lg:px-8 lg:pb-8 lg:pt-5">

        {/* BREADCRUMBS */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[9px] font-bold text-slate-500 sm:text-[11px]"
        >
          <Link
            href="/en"
            className="transition hover:text-brand-600"
          >
            Home
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <Link
            href="/en/best-brokers"
            className="transition hover:text-brand-600"
          >
            Best Forex Brokers
          </Link>

          <span className="text-slate-300">
            /
          </span>

          <span className="text-slate-800">
            {countryName}
          </span>
        </nav>


        {/* =================================================
            DESKTOP HERO
        ================================================= */}
        <div className="mt-3 hidden items-center gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-14">

          {/* CONTENT */}
          <div className="min-w-0 pb-1">

            <div className="flex flex-wrap items-center gap-2">

              <span className="inline-flex min-h-[31px] items-center gap-2 rounded-full border border-brand-100 bg-white/90 px-4 text-[11px] font-black text-brand-700 shadow-sm backdrop-blur">

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[9px] text-white">
                  ✓
                </span>

                Independent Forex Broker Guide
              </span>


              <span className="inline-flex min-h-[31px] items-center rounded-full border border-slate-200 bg-white/90 px-4 text-[11px] font-black text-slate-600 shadow-sm">
                Updated:{" "}
                {formatUpdated(
                  page.last_updated,
                )}
              </span>

            </div>


            {/* Desktop visual heading — semantic H1 is in the mobile hero */}
<div className="mt-4 max-w-[980px] text-[49px] font-black leading-[1.05] tracking-[-0.04em] text-[#07111f] xl:text-[56px]">
  {heroTitle}
</div>


            <p className="mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 xl:text-[15px]">
              {intro}
            </p>


            <p className="mt-1.5 max-w-[900px] text-[11px] font-bold leading-6 text-slate-500 xl:text-[12px]">
              We compare forex brokers for traders in{" "}
              {countryName} based on safety,
              regulation, trading conditions,
              account suitability and overall
              local accessibility.
            </p>


            <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-extrabold text-slate-700">

              {[
                "Country-specific broker ranking",
                "Brokers accepting local traders",
                "Regulation, fees and funding reviewed",
              ].map(
                (point) => (
                  <span
                    key={point}
                    className="inline-flex items-center gap-2"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[10px] text-emerald-700 ring-1 ring-emerald-100">
                      ✓
                    </span>

                    {point}
                  </span>
                ),
              )}

            </div>


            <div className="mt-4 flex items-center gap-3">

              <a
                href="#top-brokers"
                className="inline-flex min-h-[44px] min-w-[178px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-[13px] font-black text-white shadow-[0_10px_23px_rgba(30,91,184,0.20)] transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                View Top Brokers

                <span className="text-[14px]">
                  ↓
                </span>
              </a>


              <a
                href="#comparison"
                className="inline-flex min-h-[44px] min-w-[166px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-[13px] font-black text-slate-800 shadow-[0_7px_18px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
              >
                Compare Accounts

                <span className="text-brand-600">
                  ↘
                </span>
              </a>

            </div>

          </div>


          {/* SUMMARY */}
          <aside className="rounded-[24px] border border-slate-200/90 bg-white/78 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.055)] backdrop-blur">

            <div className="mb-2 flex items-center justify-between px-2 py-1">

              <div>
                <span className="block text-[10px] font-black text-brand-600">
                  {countryName} Forex Guide
                </span>

                <span className="mt-0.5 block text-[13px] font-black text-slate-950">
                  Key comparison data
                </span>
              </div>


              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-[15px] font-black text-brand-700 ring-1 ring-brand-100">
                ✓
              </span>

            </div>


            <div className="grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-[18px] border border-slate-200 bg-white">

              {desktopStats.map(
                (stat) => (
                  <div
                    key={
                      stat.title
                    }
                    className="flex min-h-[94px] flex-col items-center justify-center px-2 text-center"
                  >
                    <span
                      dir="ltr"
                      className="text-[30px] font-black leading-none tracking-[-0.04em] text-brand-700"
                    >
                      {stat.value}
                    </span>

                    <span className="mt-2 text-[11px] font-black text-slate-950">
                      {stat.title}
                    </span>

                    <span className="mt-0.5 text-[9px] font-semibold text-slate-500">
                      {stat.desc}
                    </span>
                  </div>
                ),
              )}

            </div>


            <p className="px-2 pt-3 text-[10px] font-semibold leading-5 text-slate-500">
              Rankings are not based on brand name
              or advertising alone. Local availability,
              trading conditions and broker suitability
              are part of the assessment.
            </p>

          </aside>

        </div>


        {/* =================================================
            MOBILE + TABLET HERO
        ================================================= */}
        <div className="mx-auto mt-3 max-w-[620px] text-center lg:hidden">

          <div className="flex flex-wrap items-center justify-center gap-2">

            <span className="inline-flex min-h-[28px] items-center gap-1.5 rounded-full border border-brand-100 bg-white/90 px-3 text-[9px] font-black text-brand-700 shadow-sm">

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[9px] text-white">
                ✓
              </span>

              Independent Ranking
            </span>


            <span className="inline-flex min-h-[28px] items-center rounded-full border border-slate-200 bg-white/90 px-3 text-[9px] font-black text-slate-600 shadow-sm">
              {formatUpdated(
                page.last_updated,
              )}
            </span>

          </div>


          <h1 className="mx-auto mt-3 max-w-[365px] text-[28px] font-black leading-[1.08] tracking-[-0.035em] text-[#07111f] sm:max-w-[600px] sm:text-[42px]">
            {heroTitle}
          </h1>


          <p className="mx-auto mt-2 max-w-[360px] text-[10px] font-semibold leading-[1.7] text-slate-600 sm:max-w-[570px] sm:text-[14px] sm:leading-7">
            Compare regulated forex brokers,
            trading accounts, spreads,
            platforms and funding options
            available to traders in{" "}
            {countryName}.
          </p>


          <div className="mx-auto mt-2.5 grid max-w-[340px] grid-cols-2 gap-2">

            <div className="flex min-h-[35px] items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-white/85 px-2 text-[9px] font-black text-slate-700">
              <span className="text-emerald-600">
                ✓
              </span>

              Available locally
            </div>


            <div className="flex min-h-[35px] items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-white/85 px-2 text-[9px] font-black text-slate-700">
              <span className="text-emerald-600">
                ✓
              </span>

              Country ranking
            </div>

          </div>


          <div className="mx-auto mt-3 grid max-w-[350px] grid-cols-2 gap-2.5">

            <a
              href="#top-brokers"
              className="inline-flex min-h-[43px] items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3 text-[11px] font-black text-white shadow-[0_9px_20px_rgba(30,91,184,0.18)] active:scale-[0.99]"
            >
              Top Brokers
              <span>↓</span>
            </a>


            <a
              href="#comparison"
              className="inline-flex min-h-[43px] items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-black text-slate-800 shadow-sm active:scale-[0.99]"
            >
              Compare Accounts
              <span className="text-brand-600">
                ↘
              </span>
            </a>

          </div>


          <div className="mx-auto mt-3.5 grid max-w-[350px] grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-[15px] border border-slate-200 bg-white/90 shadow-[0_7px_18px_rgba(15,23,42,0.04)]">

            {mobileStats.map(
              ([value, label]) => (
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
              ),
            )}

          </div>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   QUICK PICKS
========================================================= */

function QuickPicks({
  rows,
  countryName,
}: {
  rows: RankingRow[];
  countryName: string;
}) {
  const picks =
    rows.slice(0, 3);

  if (!picks.length) {
    return null;
  }

  return (
    <section
      id="top-brokers"
      className="scroll-mt-[90px] pt-1"
    >

      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] sm:rounded-[28px]">

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_62%,#eaf3ff_100%)] px-4 py-4 sm:px-6 sm:py-5">

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-20 -top-24 h-[210px] w-[210px] rounded-full bg-brand-100/65 blur-[75px]" />

            <div className="absolute -right-20 bottom-[-135px] h-[205px] w-[205px] rounded-full bg-blue-100/45 blur-[80px]" />
          </div>


          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-brand-600 text-[17px] font-black text-white shadow-[0_8px_20px_rgba(30,91,184,0.19)] sm:h-12 sm:w-12 sm:text-[18px]">
                ✓
              </span>


              <div>

                <span className="block text-[10px] font-black text-brand-600 sm:text-[11px]">
                  Quick Picks
                </span>


                <h2 className="mt-0.5 text-[21px] font-black leading-[1.18] tracking-[-0.025em] text-slate-950 sm:text-[28px]">
                  {forexRankingTitle(
                    picks.length,
                    countryName,
                  )}
                </h2>


                <p className="mt-1 text-[11px] font-semibold leading-5 text-slate-600 sm:text-[12px]">
                  A quick shortlist of leading
                  forex brokers available to
                  traders in {countryName} before
                  reviewing the full account and
                  broker comparison.
                </p>

              </div>

            </div>


            <a
              href="#comparison"
              className="inline-flex min-h-[40px] w-fit shrink-0 self-start items-center justify-center rounded-xl border border-brand-100 bg-white px-5 text-[11px] font-black text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-50 sm:self-auto sm:text-[12px]"
            >
              Compare All Accounts
            </a>

          </div>

        </div>


        {/* =================================================
            CARDS
        ================================================= */}
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
                  md:divide-slate-200
                `
          }
        >

          {picks.map((row) => {
            const broker =
              oneBroker(
                row.brokers,
              );

            if (!broker) {
              return null;
            }

            const isFirst =
              row.rank_position === 1;

            const rating =
              row.country_rating ||
              broker.rating;
              const brokerBestFor = safeEnglishText(
  broker.best_for_en,
  "Its overall trading offering",
);

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
                      ? "bg-gradient-to-r from-amber-400 via-brand-600 to-brand-300"
                      : "bg-gradient-to-r from-brand-600 via-brand-400 to-brand-100"
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
                      ? "Top Pick"
                      : `Rank #${row.rank_position}`}

                  </span>


                  <span
                    dir="ltr"
                    className="inline-flex min-h-[29px] items-center rounded-full bg-slate-50 px-3 text-[10px] font-black text-slate-800 ring-1 ring-slate-200"
                  >
                    {formatRating(
                      rating,
                    )}
                    /5
                  </span>

                </div>


                {/* =================================================
                    BROKER
                ================================================= */}
                <div className="mt-4">

                  {/* MOBILE */}
                  <div className="sm:hidden">

                    <div className="flex items-center justify-between gap-4">

                      {/* TEXT */}
                      <div className="min-w-0 flex-1">

                        <span className="block max-w-[210px] text-[10px] font-black leading-[1.55] text-brand-600">
                          {brokerBestFor}
                        </span>


                        <Link
                          href={brokerHref(
                            broker,
                          )}
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
                          broker={
                            broker
                          }
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
                          rating,
                        )}
                      </span>

                      {renderStars(
                        rating,
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
                        {brokerBestFor}
                      </span>


                      <Link
                        href={brokerHref(
                          broker,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="mt-1 block truncate text-left text-[22px] font-black tracking-[-0.02em] text-slate-950 transition hover:text-brand-700"
                      >
                        {broker.name}
                      </Link>


                      <div className="mt-2 flex items-center gap-2">

                        {renderStars(
                          rating,
                        )}

                        <span
                          dir="ltr"
                          className="text-[11px] font-black text-slate-500"
                        >
                          {formatRating(
                            rating,
                          )}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    NOTE
                ================================================= */}
                <p className="mt-4 text-justify text-[12px] font-semibold leading-[1.9] text-slate-600 sm:text-[13px] sm:leading-[2]">
  {`${broker.name} is a competitive forex broker option for traders in ${countryName}, with ${brokerBestFor.toLowerCase()} among its key strengths. Compare its regulation, spreads, account terms, trading platforms and funding conditions before making a decision.`}
</p>


                {/* =================================================
                    MINI FACTS
                ================================================= */}
                <div className="mt-4 grid grid-cols-2 gap-2.5">

                  <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center ring-1 ring-slate-200">

                    <span className="block text-[10px] font-black text-slate-500">
                      Minimum Deposit
                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 block text-[12px] font-black text-slate-950"
                    >
                      {money(
                        broker.min_deposit,
                      )}
                    </span>

                  </div>


                  <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center ring-1 ring-slate-200">

                    <span className="block text-[10px] font-black text-slate-500">
                      Platforms
                    </span>

                    <span
                      dir="ltr"
                      className="mt-1 block truncate text-[12px] font-black text-slate-950"
                    >
                      {splitValues(
                        broker.platforms,
                        2,
                      ).join(" • ") ||
                        "Not specified"}
                    </span>

                  </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}
                <div className="mt-auto grid grid-cols-2 gap-2.5 pt-4">

                  <PrimaryLink
                    href={realHref(
                      broker,
                    )}
                  >
                    Open Account
                  </PrimaryLink>


                  <SecondaryLink
                    href={brokerHref(
                      broker,
                    )}
                  >
                    Full Review
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
/* =========================================================
   ENGLISH TEXT GUARD

   Some ranking fields are shared with the Arabic page.
   These helpers prevent Arabic copy from leaking into
   the English interface.
========================================================= */

function hasArabicText(
  value:
    | string
    | null
    | undefined,
) {
  if (!value) return false;

  return /[\u0600-\u06FF]/.test(
    value,
  );
}

function safeEnglishText(
  value:
    | string
    | null
    | undefined,
  fallback: string,
) {
  const text =
    normalizeText(value);

  if (
    !text ||
    hasArabicText(text)
  ) {
    return fallback;
  }

  return text;
}

function safeEnglishItems(
  value:
    | string
    | null
    | undefined,
  limit = 3,
) {
  return splitValues(
    value,
    limit,
  ).filter(
    (item) =>
      !hasArabicText(item),
  );
}


/* =========================================================
   FULL RANKING
========================================================= */

function FullRanking({
  rows,
  accounts,
  countryName,
}: {
  rows: RankingRow[];
  accounts: BrokerAccount[];
  countryName: string;
}) {
  if (!rows.length) {
    return null;
  }

  return (
    <section
      id="full-ranking"
      className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
    >

      {/* =================================================
          HEADER
      ================================================= */}
      <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] px-4 py-4 sm:px-6 sm:py-5">

        <span className="inline-flex min-h-[27px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
          Full Ranking
        </span>


        <h2 className="mt-3 text-[23px] font-black leading-[1.15] tracking-[-0.025em] text-slate-950 sm:text-[30px]">
          {rows.length === 1
            ? `Best Forex Broker in ${countryName}`
            : `${rows.length} Best Forex Brokers in ${countryName}`}
        </h2>


        <p className="mt-2 max-w-[900px] text-[10px] font-semibold leading-5 text-slate-600 sm:text-[12px] sm:leading-6">
          Our forex broker ranking considers
          local availability, regulation,
          trading accounts, spreads, fees,
          platforms and overall suitability
          for traders in {countryName}.
        </p>

      </div>


      {/* =================================================
          BROKERS
      ================================================= */}
      <div className="divide-y divide-slate-200">

        {rows.map((row) => {
          const broker =
            oneBroker(
              row.brokers,
            );

          if (!broker) {
            return null;
          }


          const standard =
            findAccount(
              accounts,
              broker.id,
              ["standard"],
            );


          const pro =
            findAccount(
              accounts,
              broker.id,
              [
                "raw",
                "pro",
              ],
            );


          const primaryAccount =
            pro || standard;


          const brokerPros =
            safeEnglishItems(
              broker.pros,
              3,
            );


          const regulators =
            splitValues(
              broker.regulation_short ||
                broker.regulation,
              4,
            );


          const rating =
            row.country_rating ||
            broker.rating;


          const bestFor =
            safeEnglishText(
              row.best_for ||
                broker.best_for,

              row.rank_position === 1
                ? `Strong overall forex broker for traders in ${countryName}`
                : `Competitive forex broker option in ${countryName}`,
            );


          const localNote =
            safeEnglishText(
              row.local_note,

              `${broker.name} is included in our ${countryName} forex broker comparison based on its trading conditions, available account types, platform offering and overall suitability for local traders.`,
            );


          return (
            <article
              key={row.id}
              className="relative"
            >

              {/* LEFT RANK ACCENT */}
              <div
                className={`absolute inset-y-0 left-0 w-[4px] ${
                  row.rank_position === 1
                    ? "bg-amber-400"
                    : "bg-brand-600"
                }`}
              />


              {/* =================================================
                  MOBILE
              ================================================= */}
              <div className="lg:hidden">

                <details className="group">

                  <summary className="cursor-pointer list-none px-4 py-4 sm:px-5">

                    {/* RANK + SCORE */}
                    <div className="flex items-center justify-between gap-3">

                      <span
                        className={`inline-flex min-h-[27px] items-center gap-1.5 rounded-full px-2.5 text-[9px] font-black ring-1 ${
                          row.rank_position ===
                          1
                            ? "bg-amber-50 text-amber-800 ring-amber-200"
                            : "bg-brand-50 text-brand-700 ring-brand-100"
                        }`}
                      >

                        <span
                          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[8px] text-white ${
                            row.rank_position ===
                            1
                              ? "bg-amber-500"
                              : "bg-brand-600"
                          }`}
                        >
                          {
                            row.rank_position
                          }
                        </span>


                        {row.rank_position ===
                        1
                          ? "Top Pick"
                          : `Rank #${row.rank_position}`}

                      </span>


                      <span
                        dir="ltr"
                        className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-black text-slate-700 ring-1 ring-slate-200"
                      >
                        <span className="text-amber-400">
                          ★
                        </span>

                        {formatRating(
                          rating,
                        )}
                      </span>

                    </div>


                    {/* BROKER */}
                    <div className="mt-3 grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3">

                      <BrokerLogo
                        broker={broker}
                        size="small"
                      />


                      <div className="min-w-0">

                        <h3
                          dir="ltr"
                          className="truncate text-left text-[18px] font-black tracking-[-0.02em] text-slate-950"
                        >
                          {broker.name}
                        </h3>


                        <span className="mt-1 block text-[9px] font-black leading-4 text-brand-600">
                          {bestFor}
                        </span>


                        <div className="mt-1.5 flex items-center gap-2">
                          {renderStars(
                            rating,
                          )}
                        </div>

                      </div>

                    </div>


                    {/* NOTE */}
                    <p className="mt-3 text-[10px] font-semibold leading-5 text-slate-600">
                      {short(
                        localNote,
                        155,
                      )}
                    </p>


                    {/* FACTS */}
                    <div className="mt-3 grid grid-cols-3 gap-2">

                      <div className="rounded-xl bg-slate-50 px-2 py-2 text-center ring-1 ring-slate-200">

                        <span className="block text-[8px] font-black text-slate-500">
                          Account
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block truncate text-[9px] font-black text-slate-900"
                        >
                          {primaryAccount
                            ?.account_name ||
                            "—"}
                        </span>

                      </div>


                      <div className="rounded-xl bg-slate-50 px-2 py-2 text-center ring-1 ring-slate-200">

                        <span className="block text-[8px] font-black text-slate-500">
                          Spread
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block truncate text-[9px] font-black text-slate-900"
                        >
                          {accountSpread(
                            primaryAccount,
                          )}
                        </span>

                      </div>


                      <div className="rounded-xl bg-slate-50 px-2 py-2 text-center ring-1 ring-slate-200">

                        <span className="block text-[8px] font-black text-slate-500">
                          Deposit
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block truncate text-[9px] font-black text-slate-900"
                        >
                          {primaryAccount
                            ?.min_deposit ||
                            money(
                              broker.min_deposit,
                            )}
                        </span>

                      </div>

                    </div>


                    {/* EXPAND */}
                    <div className="mt-3 flex items-center justify-center">

                      <span className="inline-flex min-h-[27px] items-center rounded-full bg-brand-50 px-3 text-[9px] font-black text-brand-700 ring-1 ring-brand-100 group-open:hidden">
                        View Details
                      </span>


                      <span className="hidden min-h-[27px] items-center rounded-full bg-slate-100 px-3 text-[9px] font-black text-slate-600 group-open:inline-flex">
                        Show Less
                      </span>

                    </div>

                  </summary>


                  {/* EXPANDED CONTENT */}
                  <div className="border-t border-slate-100 bg-[#fbfdff] px-4 pb-4 pt-4 sm:px-5">

                    <div className="grid grid-cols-2 gap-2">

                      <div className="rounded-xl border border-slate-200 bg-white p-3">

                        <span className="block text-[8px] font-black text-slate-500">
                          Commission
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block text-[10px] font-black leading-5 text-slate-900"
                        >
                          {primaryAccount
                            ?.commission ||
                            "Depends on account"}
                        </span>

                      </div>


                      <div className="rounded-xl border border-slate-200 bg-white p-3">

                        <span className="block text-[8px] font-black text-slate-500">
                          Platforms
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block text-[10px] font-black leading-5 text-slate-900"
                        >
                          {splitValues(
                            broker.platforms,
                            2,
                          ).join(
                            " • ",
                          ) ||
                            "Not specified"}
                        </span>

                      </div>

                    </div>


                    {/* REGULATORS */}
                    {regulators.length >
                    0 ? (
                      <div className="mt-3">

                        <span className="block text-[9px] font-black text-slate-500">
                          Key Regulators
                        </span>


                        <div className="mt-2 flex flex-wrap gap-1.5">

                          {regulators.map(
                            (
                              regulator,
                            ) => (
                              <span
                                key={
                                  regulator
                                }
                                dir="ltr"
                                className="inline-flex min-h-[25px] items-center rounded-lg bg-white px-2.5 text-[9px] font-black text-slate-800 ring-1 ring-slate-200"
                              >
                                {
                                  regulator
                                }
                              </span>
                            ),
                          )}

                        </div>

                      </div>
                    ) : null}


                    {/* PROS */}
                    {brokerPros.length >
                    0 ? (
                      <div className="mt-3 space-y-1.5">

                        {brokerPros.map(
                          (item) => (
                            <div
                              key={item}
                              className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-[10px] font-bold leading-5 text-slate-700 ring-1 ring-slate-200"
                            >
                              <span className="text-emerald-600">
                                ✓
                              </span>

                              <span>
                                {item}
                              </span>
                            </div>
                          ),
                        )}

                      </div>
                    ) : null}


                    {/* ACTIONS */}
                    <div className="mt-4 grid grid-cols-2 gap-2.5">

                      <PrimaryLink
                        href={realHref(
                          broker,
                        )}
                      >
                        Open Account
                      </PrimaryLink>


                      <SecondaryLink
                        href={brokerHref(
                          broker,
                        )}
                      >
                        Read Review
                      </SecondaryLink>

                    </div>

                  </div>

                </details>

              </div>


              {/* =================================================
                  DESKTOP
              ================================================= */}
              <div className="hidden lg:grid lg:min-h-[300px] lg:grid-cols-[220px_minmax(0,1fr)_280px] xl:grid-cols-[230px_minmax(0,1fr)_300px]">

                {/* BROKER PANEL */}
                <aside className="border-r border-slate-100 bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_100%)] px-5 py-6">

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <span
                      className={`inline-flex min-h-[28px] items-center justify-center rounded-full px-3 text-[10px] font-black ring-1 ${
                        row.rank_position ===
                        1
                          ? "bg-amber-50 text-amber-800 ring-amber-200"
                          : "bg-brand-50 text-brand-700 ring-brand-100"
                      }`}
                    >
                      {row.rank_position ===
                      1
                        ? "Top Pick"
                        : `Rank #${row.rank_position}`}
                    </span>


                    <div className="mt-4">

                      <BrokerLogo
                        broker={broker}
                        size="large"
                      />

                    </div>


                    <h3
                      dir="ltr"
                      className="mt-4 text-[22px] font-black tracking-[-0.025em] text-slate-950"
                    >
                      {broker.name}
                    </h3>


                    <div className="mt-2.5 flex items-center justify-center gap-2">

                      {renderStars(
                        rating,
                      )}

                      <span
                        dir="ltr"
                        className="text-[11px] font-black text-slate-700"
                      >
                        {formatRating(
                          rating,
                        )}
                      </span>

                    </div>


                    <span className="mt-3 max-w-[185px] rounded-full bg-brand-50 px-3 py-1 text-[9px] font-black leading-4 text-brand-700 ring-1 ring-brand-100">
                      {bestFor}
                    </span>

                  </div>

                </aside>


                {/* MAIN CONTENT */}
                <div className="px-6 py-6 xl:px-7">

                  <span className="text-[10px] font-black text-brand-600">
                    Why We Selected It
                  </span>


                  <p className="mt-2 max-w-[850px] text-[13px] font-semibold leading-7 text-slate-700">
                    {localNote}
                  </p>


                  {/* ACCOUNT FACTS */}
                  <div className="mt-5 grid grid-cols-3 gap-3">

                    <div className="rounded-[15px] border border-slate-200 bg-slate-50/80 p-3">

                      <span className="block text-[9px] font-black text-slate-500">
                        Selected Account
                      </span>

                      <span
                        dir="ltr"
                        className="mt-1 block text-[12px] font-black text-slate-950"
                      >
                        {primaryAccount
                          ?.account_name ||
                          "Not specified"}
                      </span>

                    </div>


                    <div className="rounded-[15px] border border-slate-200 bg-slate-50/80 p-3">

                      <span className="block text-[9px] font-black text-slate-500">
                        Spread
                      </span>

                      <span
                        dir="ltr"
                        className="mt-1 block text-[12px] font-black text-slate-950"
                      >
                        {accountSpread(
                          primaryAccount,
                        )}
                      </span>

                    </div>


                    <div className="rounded-[15px] border border-slate-200 bg-slate-50/80 p-3">

                      <span className="block text-[9px] font-black text-slate-500">
                        Minimum Deposit
                      </span>

                      <span
                        dir="ltr"
                        className="mt-1 block text-[12px] font-black text-slate-950"
                      >
                        {primaryAccount
                          ?.min_deposit ||
                          money(
                            broker.min_deposit,
                          )}
                      </span>

                    </div>

                  </div>


                  {/* PROS */}
                  {brokerPros.length >
                  0 ? (
                    <div className="mt-5 grid grid-cols-2 gap-2">

                      {brokerPros.map(
                        (item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[11px] font-bold leading-5 text-slate-700"
                          >
                            <span className="text-emerald-600">
                              ✓
                            </span>

                            <span>
                              {item}
                            </span>
                          </div>
                        ),
                      )}

                    </div>
                  ) : (

                    <div className="mt-5 rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-[11px] font-bold leading-5 text-slate-700">
                      Compare this broker's
                      account structure,
                      regulation, trading
                      platform and total
                      trading costs before
                      opening an account.
                    </div>

                  )}

                </div>


                {/* QUICK INFO */}
                <aside className="border-l border-slate-100 bg-[#fbfdff] px-5 py-6">

                  <div className="flex h-full flex-col">

                    <div>

                      <span className="block text-[9px] font-black text-slate-500">
                        Quick Facts
                      </span>


                      <div className="mt-3 space-y-2">

                        <div className="rounded-xl border border-slate-200 bg-white p-3">

                          <span className="block text-[9px] font-black text-slate-500">
                            Commission
                          </span>

                          <span
                            dir="ltr"
                            className="mt-1 block text-[11px] font-black text-slate-900"
                          >
                            {primaryAccount
                              ?.commission ||
                              "Depends on account"}
                          </span>

                        </div>


                        <div className="rounded-xl border border-slate-200 bg-white p-3">

                          <span className="block text-[9px] font-black text-slate-500">
                            Platforms
                          </span>

                          <span
                            dir="ltr"
                            className="mt-1 block text-[11px] font-black leading-5 text-slate-900"
                          >
                            {splitValues(
                              broker.platforms,
                              3,
                            ).join(
                              " • ",
                            ) ||
                              "Not specified"}
                          </span>

                        </div>

                      </div>


                      {/* LICENSES */}
                      {regulators.length >
                      0 ? (
                        <div className="mt-4">

                          <span className="block text-[9px] font-black text-slate-500">
                            Key Regulators
                          </span>


                          <div className="mt-2 flex flex-wrap gap-1.5">

                            {regulators.map(
                              (
                                regulator,
                              ) => (
                                <span
                                  key={
                                    regulator
                                  }
                                  dir="ltr"
                                  className="inline-flex min-h-[27px] items-center rounded-lg bg-white px-2.5 text-[9px] font-black text-slate-800 shadow-sm ring-1 ring-slate-200"
                                >
                                  {
                                    regulator
                                  }
                                </span>
                              ),
                            )}

                          </div>

                        </div>
                      ) : null}

                    </div>


                    {/* ACTIONS */}
                    <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">

                      <PrimaryLink
                        href={realHref(
                          broker,
                        )}
                      >
                        Open Account
                      </PrimaryLink>


                      <SecondaryLink
                        href={brokerHref(
                          broker,
                        )}
                      >
                        Full Review
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


/* =========================================================
   ACCOUNT COMPARISON
========================================================= */

/* =========================================================
   COMPARISON ACCOUNT CARD
   SAME DESIGN AS ARABIC VERSION
========================================================= */

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
          Account data is not available
        </span>
      </div>
    );
  }

  const isGreen =
    tone === "green";

  const commission =
    account.commission_en?.trim() ||
    "See account terms";

  const minimumDeposit =
    account.min_deposit_en?.trim() ||
    account.min_deposit?.trim() ||
    money(broker.min_deposit);

  const bestFor =
    account.best_for_en?.trim() ||
    "";

  return (
    <Link
      href={accountHref(
        broker,
        account,
      )}
      className={`group relative block overflow-hidden rounded-[18px] border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] ${
        isGreen
          ? "border-emerald-200 bg-[linear-gradient(145deg,#ffffff_0%,#f1fcf7_100%)] hover:border-emerald-300"
          : "border-brand-100 bg-[linear-gradient(145deg,#ffffff_0%,#f4f8ff_100%)] hover:border-brand-200"
      }`}
    >
      {/* TOP ACCENT */}
      <div
        className={`absolute inset-x-0 top-0 h-[3px] ${
          isGreen
            ? "bg-emerald-500"
            : "bg-brand-600"
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


          <h4 className="mt-1 truncate text-left text-[16px] font-black tracking-[-0.02em] text-slate-950 sm:text-[17px]">
            {account.account_name}
          </h4>


          {bestFor ? (
            <p className="mt-1.5 line-clamp-2 text-[9px] font-semibold leading-5 text-slate-500">
              {bestFor}
            </p>
          ) : null}

        </div>


        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] font-black transition group-hover:translate-x-[2px] ${
            isGreen
              ? "bg-emerald-100 text-emerald-700"
              : "bg-brand-100 text-brand-700"
          }`}
        >
          →
        </span>

      </div>


      {/* METRICS */}
      <div className="mt-4 grid grid-cols-2 gap-2">

        <div className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5">

          <span className="block text-[8px] font-black text-slate-500">
            Spread for this account
          </span>

          <span
            dir="ltr"
            className="mt-1 block text-[11px] font-black text-slate-950"
          >
            {accountSpread(
              account,
            )}
          </span>

        </div>


        <div className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5">

          <span className="block text-[8px] font-black text-slate-500">
            Commission for this account
          </span>

          <span
            dir="ltr"
            className="mt-1 block truncate text-[11px] font-black text-slate-950"
          >
            {commission}
          </span>

        </div>


        <div className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5">

          <span className="block text-[8px] font-black text-slate-500">
            Minimum deposit
          </span>

          <span
            dir="ltr"
            className="mt-1 block text-[11px] font-black text-slate-950"
          >
            {minimumDeposit}
          </span>

        </div>


        <div className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2.5">

          <span className="block text-[8px] font-black text-slate-500">
            Execution type
          </span>

          <span
            dir="ltr"
            className="mt-1 block truncate text-[11px] font-black text-slate-950"
          >
            {account.execution_type ||
              "Not specified"}
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
        View account details & features

        <span className="ml-1.5 transition group-hover:translate-x-[2px]">
          →
        </span>

      </div>

    </Link>
  );
}

/* =========================================================
   ACCOUNT COMPARISON
   SAME STRUCTURE + DESIGN AS ARABIC VERSION
========================================================= */

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
  if (!rows.length) {
    return null;
  }

  const comparisonIntro =
    safeEnglishText(
      intro,
      `Compare standard, low-cost and professional forex trading accounts available through leading brokers in ${countryName}, including spreads, commissions, minimum deposits and execution conditions.`,
    );

  return (
    <section
      id="comparison"
      className="scroll-mt-[90px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
    >

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_55%,#eaf3ff_100%)] px-4 py-4 sm:px-7 sm:py-7">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 h-[220px] w-[220px] rounded-full bg-brand-100/55 blur-[85px] sm:-left-24 sm:-top-32 sm:h-[290px] sm:w-[290px] sm:blur-[100px]"
        />


        {/* =================================================
            MOBILE / TABLET HEADER
        ================================================= */}
        <div className="relative lg:hidden">

          <span className="inline-flex min-h-[26px] items-center rounded-full border border-brand-100 bg-white px-3 text-[8px] font-black text-brand-700 shadow-sm">
            Account Comparison
          </span>


          <h2 className="mt-2.5 max-w-[340px] text-[21px] font-black leading-[1.12] tracking-[-0.03em] text-slate-950">
            Compare Accounts from the Best Forex Brokers in{" "}
            {countryName}
          </h2>


          <p className="mt-2 max-w-[355px] text-[11px] font-semibold leading-[1.75] text-slate-600">
            {comparisonIntro}
          </p>


          <div className="mt-3 grid grid-cols-3 gap-1.5">

            <div className="flex min-h-[38px] items-center justify-center gap-1 rounded-[10px] border border-slate-200 bg-white/90 px-1.5 text-center shadow-sm">

              <span className="text-[9px] font-black text-emerald-600">
                ✓
              </span>

              <span className="text-[9px] font-black leading-4 text-slate-700">
                Spread & Fees
              </span>

            </div>


            <div className="flex min-h-[38px] items-center justify-center gap-1 rounded-[10px] border border-slate-200 bg-white/90 px-1.5 text-center shadow-sm">

              <span className="text-[9px] font-black text-emerald-600">
                ✓
              </span>

              <span className="text-[9px] font-black leading-4 text-slate-700">
                Account Details
              </span>

            </div>


            <div className="flex min-h-[38px] items-center justify-center gap-1 rounded-[10px] border border-slate-200 bg-white/90 px-1.5 text-center shadow-sm">

              <span className="text-[9px] font-black text-emerald-600">
                ✓
              </span>

              <span className="text-[9px] font-black leading-4 text-slate-700">
                Direct Comparison
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            DESKTOP HEADER
        ================================================= */}
        <div className="relative hidden lg:grid lg:grid-cols-[minmax(0,1fr)_310px] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">

          {/* TEXT */}
          <div className="min-w-0">

            <span className="inline-flex min-h-[28px] items-center rounded-full border border-brand-100 bg-white px-3 text-[10px] font-black text-brand-700 shadow-sm">
              Account Comparison
            </span>


            <h2 className="mt-3 max-w-[900px] text-[31px] font-black leading-[1.12] tracking-[-0.03em] text-slate-950 xl:text-[33px]">
              Compare Accounts from the Best Forex Brokers in{" "}
              {countryName}
            </h2>


            <p className="mt-2 max-w-[850px] text-[12px] font-semibold leading-6 text-slate-600">
              {comparisonIntro}
            </p>


            <div className="mt-4 flex flex-wrap gap-2">

              <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">

                <span className="text-emerald-600">
                  ✓
                </span>

                Account-specific spreads & commissions
              </span>


              <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">

                <span className="text-emerald-600">
                  ✓
                </span>

                Click any account for full details
              </span>


              <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">

                <span className="text-emerald-600">
                  ✓
                </span>

                Choose by trading style
              </span>

            </div>

          </div>


          {/* =================================================
              COMPARISON ILLUSTRATION
          ================================================= */}
          <div
            aria-hidden="true"
            className="relative flex h-[180px] items-center justify-center"
          >
            {(() => {
              const firstBroker =
                oneBroker(
                  rows[0]?.brokers ||
                    null,
                );

              const secondBroker =
                oneBroker(
                  rows[1]?.brokers ||
                    null,
                );

              return (
                <>

                  {/* GLOW */}
                  <div className="absolute h-[150px] w-[250px] rounded-full bg-brand-100/45 blur-[55px]" />


                  {/* FIRST BROKER */}
                  {firstBroker ? (
                    <Link
                      href={brokerHref(
                        firstBroker,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute left-[8px] top-[30px] flex h-[108px] w-[135px] -rotate-[7deg] flex-col items-center justify-center rounded-[19px] border border-brand-100 bg-white px-3 shadow-[0_15px_35px_rgba(15,23,42,0.09)] transition duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:border-brand-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.13)]"
                    >

                      <div className="flex h-[46px] w-[98px] items-center justify-center">
                        <BrokerLogo
                          broker={
                            firstBroker
                          }
                          size="small"
                          linked={false}
                        />
                      </div>


                      <span className="mt-1 block max-w-[110px] truncate text-[10px] font-black text-slate-900">
                        {
                          firstBroker.name
                        }
                      </span>


                      <span className="mt-1 inline-flex min-h-[20px] items-center rounded-full bg-brand-50 px-2 text-[7px] font-black text-brand-700">
                        Rank #1
                      </span>

                    </Link>
                  ) : null}


                  {/* SECOND BROKER */}
                  <div className="absolute right-[8px] top-[30px] flex h-[108px] w-[135px] rotate-[7deg] flex-col items-center justify-center rounded-[19px] border border-emerald-200 bg-white px-3 shadow-[0_15px_35px_rgba(15,23,42,0.09)]">

                    {secondBroker ? (
                      <>

                        <div className="flex h-[46px] w-[98px] items-center justify-center">
                          <BrokerLogo
                            broker={
                              secondBroker
                            }
                            size="small"
                            linked={false}
                          />
                        </div>


                        <span className="mt-1 block max-w-[110px] truncate text-[10px] font-black text-slate-900">
                          {
                            secondBroker.name
                          }
                        </span>


                        <span className="mt-1 inline-flex min-h-[20px] items-center rounded-full bg-emerald-50 px-2 text-[7px] font-black text-emerald-700">
                          Rank #2
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


                  {/* DECORATION */}
                  <div className="absolute left-[26px] top-[20px] h-2 w-2 rounded-full bg-brand-300" />

                  <div className="absolute right-[25px] bottom-[25px] h-2.5 w-2.5 rounded-full bg-emerald-300" />


                  <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2">

                    <span className="inline-flex min-h-[24px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-[7.5px] font-black text-slate-500 shadow-sm">

                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />

                      Side-by-Side Comparison

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    </span>

                  </div>

                </>
              );
            })()}
          </div>

        </div>

      </div>


      {/* =====================================================
          BROKERS
      ===================================================== */}
      <div className="divide-y divide-slate-200">

        {rows.map((row) => {
          const broker =
            oneBroker(
              row.brokers,
            );

          if (!broker) {
            return null;
          }


          const standard =
            findAccount(
              accounts,
              broker.id,
              ["standard"],
            );


          const pro =
            findAccount(
              accounts,
              broker.id,
              [
                "raw",
                "pro",
              ],
            );


          const isFirst =
            row.rank_position === 1;


          const brokerBestFor =
            safeEnglishText(
              row.best_for ||
                broker.best_for,
              `Suitable forex broker for traders in ${countryName}`,
            );


          return (
            <article
              key={row.id}
              className={`relative ${
                isFirst
                  ? "bg-[linear-gradient(90deg,#fffdf7_0%,#ffffff_34%)]"
                  : "bg-white"
              }`}
            >

              {/* LEFT ACCENT */}
              <div
                className={`absolute inset-y-0 left-0 w-[4px] ${
                  isFirst
                    ? "bg-amber-400"
                    : "bg-brand-600"
                }`}
              />


              {/* =================================================
                  DESKTOP
              ================================================= */}
              <div className="hidden lg:grid lg:grid-cols-[215px_minmax(0,1fr)_245px] xl:grid-cols-[230px_minmax(0,1fr)_260px]">

                {/* =================================================
                    BROKER IDENTITY
                ================================================= */}
                <div className="relative border-r border-slate-100 bg-[linear-gradient(155deg,#ffffff_0%,#f6faff_55%,#eef6ff_100%)] px-5 py-5">

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
                        ? "Rank #1"
                        : `Rank #${row.rank_position}`}
                    </span>


                    <span
                      dir="ltr"
                      className="inline-flex min-h-[28px] items-center rounded-full bg-white px-2.5 text-[9px] font-black text-slate-600 shadow-sm ring-1 ring-slate-200"
                    >
                      {formatRating(
                        row.country_rating ||
                          broker.rating,
                      )}
                    </span>

                  </div>


                  {/* BIG LOGO */}
                  <div className="mt-5 flex justify-center">

                    <Link
                      href={brokerHref(
                        broker,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${broker.name} forex broker review`}
                      className="group relative flex h-[118px] w-full max-w-[205px] items-center justify-center rounded-[20px] border border-slate-200/80 bg-white/80 shadow-[0_12px_30px_rgba(15,23,42,0.055)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.09)]"
                    >

                      {broker.logo ? (
                        <div className="relative h-[96px] w-[195px]">

                          <Image
                            src={
                              broker.logo
                            }
                            alt={`${broker.name ?? "Forex broker"} logo`}
                            fill
                            className="object-contain transition duration-200 group-hover:scale-[1.04]"
                            sizes="175px"
                          />

                        </div>
                      ) : (
                        <span className="text-[26px] font-black text-slate-800">
                          {(broker.name ||
                            "BA")
                            .slice(
                              0,
                              2,
                            )
                            .toUpperCase()}
                        </span>
                      )}

                    </Link>

                  </div>


                  {/* NAME */}
                  <div className="mt-4 text-center">

                    <Link
                      href={brokerHref(
                        broker,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[22px] font-black tracking-[-0.025em] text-slate-950 transition hover:text-brand-700"
                    >
                      {broker.name}
                    </Link>


                    {/* RATING */}
                    <div className="mt-2 flex items-center justify-center gap-2">

                      {renderStars(
                        row.country_rating ||
                          broker.rating,
                      )}

                      <span
                        dir="ltr"
                        className="text-[10px] font-black text-slate-500"
                      >
                        {formatRating(
                          row.country_rating ||
                            broker.rating,
                        )}
                      </span>

                    </div>


                    {/* BEST FOR */}
                    <div className="mt-3 flex justify-center">

                      <span className="inline-flex max-w-[210px] items-center justify-center rounded-full bg-brand-50 px-3 py-1.5 text-center text-[9px] font-black leading-5 text-brand-700 ring-1 ring-brand-100">
                        {brokerBestFor}
                      </span>

                    </div>

                  </div>


                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[-50px] left-1/2 h-[110px] w-[180px] -translate-x-1/2 rounded-full bg-brand-100/35 blur-[55px]"
                  />

                </div>


                {/* =================================================
                    ACCOUNT COMPARISON
                ================================================= */}
                <div className="px-5 py-6 xl:px-6">

                  <div className="mb-4">

                    <span className="text-[9px] font-black text-brand-600">
                      Choose an account to compare
                    </span>


                    <h3 className="mt-1 text-[17px] font-black text-slate-950">
                      {broker.name} Accounts
                    </h3>


                    <p className="mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                      Click an account card to view spreads, commissions and full account conditions.
                    </p>

                  </div>


                  <div className="grid grid-cols-2 gap-4">

                    <ComparisonAccountCard
                      broker={broker}
                      account={standard}
                      label="Standard Account"
                      tone="blue"
                    />


                    <ComparisonAccountCard
                      broker={broker}
                      account={pro}
                      label="Low-Cost / Professional Account"
                      tone="green"
                    />

                  </div>

                </div>


                {/* =================================================
                    BROKER ACTION
                ================================================= */}
                <aside className="border-l border-slate-100 bg-[#fbfdff] px-5 py-6">

                  <div className="flex h-full flex-col">

                    <span className="text-[9px] font-black text-slate-500">
                      Before Opening an Account
                    </span>


                    <h4 className="mt-2 text-[15px] font-black leading-6 text-slate-950">
                      Choose the right account type first
                    </h4>


                    <p className="mt-2 text-[10px] font-semibold leading-5 text-slate-600">
                      Spreads, commissions and trading conditions can differ by account type and by the legal entity you register with.
                    </p>


                    <div className="mt-4 rounded-[14px] border border-slate-200 bg-white p-3">

                      <span className="block text-[8px] font-black text-slate-500">
                        Broker ranking in{" "}
                        {countryName}
                      </span>

                      <span className="mt-1 block text-[14px] font-black text-brand-700">
                        #
                        {
                          row.rank_position
                        }
                      </span>

                    </div>


                    <div className="mt-auto grid gap-2.5 pt-5">

                      <PrimaryLink
                        href={realHref(
                          broker,
                        )}
                        className="w-full"
                      >
                        Open Account
                      </PrimaryLink>


                      <SecondaryLink
                        href={brokerHref(
                          broker,
                        )}
                        className="w-full"
                      >
                        {broker.name} Review
                      </SecondaryLink>

                    </div>

                  </div>

                </aside>

              </div>


              {/* =================================================
                  MOBILE - SAME STRUCTURE AS ARABIC
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
                        href={brokerHref(
                          broker,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-left text-[18px] font-black tracking-[-0.02em] text-slate-950"
                      >
                        {broker.name}
                      </Link>


                      <span className="mt-1 block text-[9px] font-black text-brand-600">
                        #{row.rank_position} in{" "}
                        {countryName}
                      </span>


                      <div className="mt-1.5 flex items-center gap-2">

                        {renderStars(
                          row.country_rating ||
                            broker.rating,
                        )}

                        <span
                          dir="ltr"
                          className="text-[9px] font-black text-slate-500"
                        >
                          {formatRating(
                            row.country_rating ||
                              broker.rating,
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
                      ? "Top Pick"
                      : `#${row.rank_position}`}
                  </span>

                </div>


                {/* BEST FOR */}
                <div className="mt-3 rounded-xl bg-brand-50/60 px-3 py-2 text-[9px] font-black leading-5 text-brand-700 ring-1 ring-brand-100">
                  {brokerBestFor}
                </div>


                {/* ACCOUNTS TITLE */}
                <div className="mt-4 flex items-center justify-between gap-3">

                  <div>

                    <span className="block text-[10px] font-black text-slate-500">
                      {broker.name} Accounts
                    </span>

                    <span className="mt-0.5 block text-[13px] font-black leading-5 text-slate-950">
                      Tap an account to view details
                    </span>

                  </div>


                  <span className="max-w-[105px] text-right text-[9px] font-black leading-4 text-brand-600">
                    Different conditions for each account
                  </span>

                </div>


                {/* =================================================
                    STANDARD ACCOUNT
                ================================================= */}
                {standard ? (
                  <Link
                    href={accountHref(
                      broker,
                      standard,
                    )}
                    className="group mt-3 block rounded-[15px] border border-brand-200 bg-[linear-gradient(145deg,#ffffff_0%,#f5f9ff_100%)] p-3 transition active:scale-[0.99]"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div className="min-w-0">

                        <span className="block text-[8px] font-black text-brand-600">
                          Standard Account
                        </span>

                        <span className="mt-0.5 block truncate text-left text-[14px] font-black text-slate-950">
                          {
                            standard.account_name
                          }
                        </span>

                      </div>


                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[13px] font-black text-brand-700">
                        →
                      </span>

                    </div>


                    <div className="mt-2.5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-white">

                      <div className="px-2 py-2 text-center">

                        <span className="block text-[7px] font-black text-slate-500">
                          Spread
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block text-[9px] font-black text-slate-950"
                        >
                          {accountSpread(
                            standard,
                          )}
                        </span>

                      </div>


                      <div className="px-2 py-2 text-center">

                        <span className="block text-[7px] font-black text-slate-500">
                          Commission
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block truncate text-[9px] font-black text-slate-950"
                        >
                          {standard
                            .commission_en ||
                            "See terms"}
                        </span>

                      </div>


                      <div className="px-2 py-2 text-center">

                        <span className="block text-[7px] font-black text-slate-500">
                          Deposit
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block text-[9px] font-black text-slate-950"
                        >
                          {standard
                            .min_deposit_en ||
                            standard
                              .min_deposit ||
                            money(
                              broker.min_deposit,
                            )}
                        </span>

                      </div>

                    </div>

                  </Link>
                ) : null}


                {/* =================================================
                    PRO / RAW ACCOUNT
                ================================================= */}
                {pro ? (
                  <Link
                    href={accountHref(
                      broker,
                      pro,
                    )}
                    className="group mt-2.5 block rounded-[15px] border border-emerald-200 bg-[linear-gradient(145deg,#ffffff_0%,#f2fcf7_100%)] p-3 transition active:scale-[0.99]"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div className="min-w-0">

                        <span className="block text-[8px] font-black text-emerald-700">
                          Low-Cost / Professional Account
                        </span>

                        <span className="mt-0.5 block truncate text-left text-[14px] font-black text-slate-950">
                          {
                            pro.account_name
                          }
                        </span>

                      </div>


                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[13px] font-black text-emerald-700">
                        →
                      </span>

                    </div>


                    <div className="mt-2.5 grid grid-cols-3 divide-x divide-emerald-100 rounded-xl border border-emerald-100 bg-white">

                      <div className="px-2 py-2 text-center">

                        <span className="block text-[7px] font-black text-slate-500">
                          Spread
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block text-[9px] font-black text-slate-950"
                        >
                          {accountSpread(
                            pro,
                          )}
                        </span>

                      </div>


                      <div className="px-2 py-2 text-center">

                        <span className="block text-[7px] font-black text-slate-500">
                          Commission
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block truncate text-[9px] font-black text-slate-950"
                        >
                          {pro.commission_en ||
                            "See terms"}
                        </span>

                      </div>


                      <div className="px-2 py-2 text-center">

                        <span className="block text-[7px] font-black text-slate-500">
                          Deposit
                        </span>

                        <span
                          dir="ltr"
                          className="mt-1 block text-[9px] font-black text-slate-950"
                        >
                          {pro.min_deposit_en ||
                            pro.min_deposit ||
                            money(
                              broker.min_deposit,
                            )}
                        </span>

                      </div>

                    </div>

                  </Link>
                ) : null}


                {/* ACTIONS */}
                <div className="mt-4 grid grid-cols-2 gap-2.5">

                  <SecondaryLink
                    href={brokerHref(
                      broker,
                    )}
                    className="min-h-[42px]"
                  >
                    {broker.name} Review
                  </SecondaryLink>


                  <PrimaryLink
                    href={realHref(
                      broker,
                    )}
                    className="min-h-[42px]"
                  >
                    Open Account
                  </PrimaryLink>

                </div>

              </div>

            </article>
          );
        })}

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <div className="border-t border-slate-200 bg-[#f8fbff] px-4 py-4 sm:px-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="max-w-[900px] text-[9px] font-semibold leading-5 text-slate-500 sm:text-[10px]">
            Account types, spreads, commissions and minimum deposit requirements may vary by broker entity and country. Open an account card above to review the specific account details before registering.
          </p>


          <Link
            href="/en/compare"
            className="inline-flex min-h-[34px] w-fit shrink-0 items-center rounded-xl bg-white px-4 text-[10px] font-black text-brand-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-brand-200"
          >
            Compare More Brokers →
          </Link>

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   PAYMENT METHODS
   SAME DESIGN AS ARABIC VERSION
========================================================= */

function PaymentSection({
  methods,
  countryName,
}: {
  methods: PaymentMethod[];
  countryName: string;
}) {
  if (!methods.length) {
    return null;
  }

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
          className="pointer-events-none absolute -left-24 -top-28 h-[250px] w-[250px] rounded-full bg-brand-100/55 blur-[90px]"
        />


        <div className="relative">

          <span className="inline-flex min-h-[27px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
            Deposits & Withdrawals
          </span>


          <h2 className="mt-3 text-[23px] font-black leading-[1.14] tracking-[-0.03em] text-slate-950 sm:text-[30px]">
            Popular Forex Payment Methods in{" "}
            {countryName}
          </h2>


          <p className="mt-2 max-w-[820px] text-[10px] font-semibold leading-5 text-slate-600 sm:text-[12px] sm:leading-6">
            Explore common deposit and withdrawal methods used by
            forex traders in {countryName}. Availability of bank
            transfers, Visa, Mastercard, local payment systems and
            digital wallets can vary by broker, legal entity and
            payment provider.
          </p>


          {/* Desktop only — same as Arabic */}
          <div className="mt-3 hidden flex-wrap gap-2 sm:flex">

            <span className="inline-flex min-h-[29px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">

              <span className="text-emerald-600">
                ✓
              </span>

              Availability varies by broker
            </span>


            <span className="inline-flex min-h-[29px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">

              <span className="text-emerald-600">
                ✓
              </span>

              Check withdrawal fees
            </span>


            <span className="inline-flex min-h-[29px] items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">

              <span className="text-emerald-600">
                ✓
              </span>

              Currency can affect costs
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          PAYMENT METHODS
          4 = FULL ROW
          3 = CENTERED
          2 = CENTERED
          1 = CENTERED
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

        {methods.map(
          (
            method,
            index,
          ) => (
            <article
              key={method.id}
              className="group relative overflow-hidden rounded-[16px] border border-slate-200 bg-[linear-gradient(145deg,#ffffff_0%,#f8fbff_100%)] p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_28px_rgba(15,23,42,0.065)] sm:rounded-[18px] sm:p-4"
            >

              {/* NUMBER */}
              <span
                dir="ltr"
                className="absolute right-3 top-3 flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-50 px-1.5 text-[8px] font-black text-slate-500 ring-1 ring-slate-200"
              >
                {String(
                  index + 1,
                ).padStart(
                  2,
                  "0",
                )}
              </span>


              {/* BRAND */}
              <div className="min-h-[44px] sm:min-h-[55px]">

                <PaymentBrand
                  method={method}
                />

              </div>


              {/* TITLE */}
              <h3 className="mt-2.5 text-[14px] font-black leading-5 text-slate-950 sm:mt-4 sm:text-[16px] sm:leading-6">
                {method.method_name}
              </h3>


              {/* DESCRIPTION */}
              <p className="mt-1.5 text-[9.5px] font-semibold leading-[1.7] text-slate-600 sm:mt-2 sm:text-[11px] sm:leading-[1.85]">

                {method.description ||
                  `This payment method may be available for forex deposits and withdrawals through selected brokers in ${countryName}. Check availability, fees, currencies and processing times before using it.`}

              </p>


              {/* STATUS */}
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 sm:mt-4 sm:pt-3">

                <span className="inline-flex items-center gap-1.5 text-[9px] font-black text-emerald-700">

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
                    ✓
                  </span>

                  Common option
                </span>


                <span className="text-[8px] font-bold text-slate-400">
                  Broker dependent
                </span>

              </div>

            </article>
          ),
        )}

      </div>


      {/* =====================================================
          FOOTNOTE
      ===================================================== */}
      <div className="border-t border-slate-200 bg-[#f8fbff] px-4 py-3 sm:px-6">

        <p className="text-[9px] font-semibold leading-5 text-slate-500 sm:text-[10px]">
          A listed payment method is not necessarily available through every
          forex broker or legal entity. Before depositing, confirm supported
          currencies, deposit and withdrawal fees, processing times and
          transaction limits directly with your chosen broker.
        </p>

      </div>

    </section>
  );
}


/* =========================================================
   SOURCE LINKS
========================================================= */

function SourceLinks({
  links,
}: {
  links:
    | SourceLink[]
    | null;
}) {
  const valid =
    (links || []).filter(
      (item) =>
        item?.name &&
        item?.url,
    );


  if (!valid.length) {
    return null;
  }


  return (
    <div className="mt-4 flex flex-wrap gap-2">

      {valid.map(
        (
          item,
          index,
        ) => (
          <Link
            key={`${item.url}-${index}`}
            href={item.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[29px] items-center rounded-lg bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-brand-200"
          >
            Official Source:{" "}
            {item.name}
          </Link>
        ),
      )}

    </div>
  );
}
/* =========================================================
   COUNTRY GUIDE
========================================================= */

function CountryGuide({
  blocks,
  page,
}: {
  blocks: ContentBlock[];
  page: CountryPage;
}) {
  if (!blocks.length) {
    return null;
  }

  const countryName =
    page.country_name_en;

  const ordered = [
    ...blocks,
  ].sort(
    (a, b) =>
      (a.sort_order ?? 999) -
      (b.sort_order ?? 999),
  );


  /* =======================================================
     GUIDE META
  ======================================================= */

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
        tone:
          | "blue"
          | "green"
          | "amber"
          | "violet";
      }
    > = {
      overview: {
        number: "01",
        label:
          "Local Market",
        icon: "↗",
        tone: "blue",
      },

      regulation: {
        number: "02",
        label:
          "Regulation & Safety",
        icon: "✓",
        tone: "green",
      },

      islamic_accounts: {
        number: "03",
        label:
          "Account Types",
        icon: "◐",
        tone: "violet",
      },

      local_banking: {
        number: "04",
        label:
          "Deposits & Withdrawals",
        icon: "↔",
        tone: "blue",
      },

      how_to_open_account: {
        number: "05",
        label:
          "Opening an Account",
        icon: "+",
        tone: "green",
      },

      taxes: {
        number: "06",
        label:
          "Taxes & Costs",
        icon: "%",
        tone: "amber",
      },

      tax: {
        number: "06",
        label:
          "Taxes & Costs",
        icon: "%",
        tone: "amber",
      },

      final_verdict: {
        number: "07",
        label:
          "Choosing a Broker",
        icon: "★",
        tone: "blue",
      },

      how_to_choose: {
        number: "07",
        label:
          "Choosing a Broker",
        icon: "★",
        tone: "blue",
      },
    };

    return (
      map[key] || {
        number: String(
          index + 1,
        ).padStart(
          2,
          "0",
        ),

        label:
          "Forex Trading Guide",

        icon: "•",

        tone:
          "blue" as const,
      }
    );
  };


  const toneClasses = {
    blue: {
      icon:
        "bg-brand-50 text-brand-700 ring-brand-100",

      border:
        "border-brand-100",

      badge:
        "bg-brand-50 text-brand-700",

      accent:
        "bg-brand-600",
    },

    green: {
      icon:
        "bg-emerald-50 text-emerald-700 ring-emerald-100",

      border:
        "border-emerald-200",

      badge:
        "bg-emerald-50 text-emerald-700",

      accent:
        "bg-emerald-500",
    },

    amber: {
      icon:
        "bg-amber-50 text-amber-700 ring-amber-100",

      border:
        "border-amber-200",

      badge:
        "bg-amber-50 text-amber-700",

      accent:
        "bg-amber-400",
    },

    violet: {
      icon:
        "bg-violet-50 text-violet-700 ring-violet-100",

      border:
        "border-violet-200",

      badge:
        "bg-violet-50 text-violet-700",

      accent:
        "bg-violet-500",
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
          className="pointer-events-none absolute -left-28 -top-32 h-[280px] w-[280px] rounded-full bg-brand-100/55 blur-[100px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-[-190px] h-[260px] w-[260px] rounded-full bg-blue-100/40 blur-[100px]"
        />


        <div className="relative">

          <span className="inline-flex min-h-[28px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
            Forex Trading Guide
            for {countryName}
          </span>


          <div className="mt-3 lg:flex lg:items-end lg:justify-between lg:gap-10">

            <div>

              <h2 className="max-w-[850px] text-[24px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-[32px]">
                What to Know Before
                Choosing a Forex Broker
                in {countryName}
              </h2>


              <p className="mt-2 max-w-[840px] text-[10px] font-semibold leading-5 text-slate-600 sm:text-[12px] sm:leading-6">
                A practical guide to
                forex regulation,
                broker safety, trading
                accounts, deposits and
                withdrawals, costs and
                other factors traders
                should review before
                opening an account in{" "}
                {countryName}.
              </p>

            </div>


            {/* DESKTOP SUMMARY */}
            <div className="mt-4 hidden shrink-0 items-center gap-2 lg:flex">

              <div className="rounded-[14px] border border-slate-200 bg-white px-4 py-2.5 text-center shadow-sm">

                <span className="block text-[18px] font-black leading-none text-brand-700">
                  {ordered.length}
                </span>

                <span className="mt-1 block text-[8px] font-black text-slate-500">
                  Key topics
                </span>

              </div>


              <div className="rounded-[14px] border border-slate-200 bg-white px-4 py-2.5 text-center shadow-sm">

                <span className="block text-[11px] font-black leading-none text-emerald-700">
                  Practical Guide
                </span>

                <span className="mt-1 block text-[8px] font-black text-slate-500">
                  Before you trade
                </span>

              </div>

            </div>

          </div>


          {/* MOBILE TOPICS */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">

            {ordered
              .slice(
                0,
                5,
              )
              .map(
                (
                  block,
                  index,
                ) => {
                  const meta =
                    getGuideMeta(
                      block.section_key,
                      index,
                    );

                  return (
                    <a
                      key={
                        block.id
                      }
                      href={`#guide-${block.id}`}
                      className="inline-flex min-h-[31px] shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-[8px] font-black text-slate-700 shadow-sm"
                    >
                      <span className="text-brand-600">
                        {
                          meta.number
                        }
                      </span>

                      {
                        meta.label
                      }
                    </a>
                  );
                },
              )}

          </div>

        </div>

      </div>


      {/* =====================================================
          DESKTOP KNOWLEDGE HUB
      ===================================================== */}
      <div className="hidden p-6 lg:block">

        <div className="grid grid-cols-[275px_minmax(0,1fr)] items-start gap-5">

          {/* =================================================
              SMART FOLLOW SIDEBAR
          ================================================= */}
          <SmoothFollowSidebar
            topOffset={92}
            className="self-start space-y-4"
          >

            {/* ===============================================
                TRUST / REGULATOR
            =============================================== */}
            <aside className="overflow-hidden rounded-[22px] border border-slate-200 bg-[linear-gradient(160deg,#ffffff_0%,#f1f7ff_100%)] shadow-[0_12px_32px_rgba(15,23,42,0.05)]">

              {/* TOP */}
              <div className="relative overflow-hidden border-b border-slate-200 px-5 pb-5 pt-5">

                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-20 h-[180px] w-[180px] rounded-full bg-brand-100/70 blur-[65px]"
                />


                <div className="relative">

                  <span className="inline-flex min-h-[25px] items-center rounded-full bg-white px-2.5 text-[8px] font-black text-brand-700 shadow-sm ring-1 ring-brand-100">
                    Before Opening
                    an Account
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
                        Local Regulation
                      </span>

                      <h3 className="mt-1 text-[17px] font-black leading-6 text-slate-950">
                        Verify Before
                        Choosing a Broker
                      </h3>

                    </div>

                  </div>


                  <p className="mt-3 text-[10px] font-semibold leading-[1.8] text-slate-600">
                    Check the legal
                    entity that will
                    hold your trading
                    account and the
                    regulator responsible
                    for that entity,
                    rather than relying
                    only on the broker
                    group name.
                  </p>

                </div>

              </div>


              {/* REGULATOR */}
              <div className="p-4">

                <div className="rounded-[16px] border border-brand-100 bg-white p-4 shadow-sm">

                  <span className="block text-[8px] font-black text-brand-600">
                    Regulatory Authority
                    in {countryName}
                  </span>

                  <span className="mt-1.5 block text-[14px] font-black leading-6 text-slate-950">
                    {page.regulator_name ||
                      "Local regulatory authority"}
                  </span>

                </div>


                <div className="mt-3 space-y-2">

                  {[
                    "Verify the broker's legal entity",
                    "Check regulation and account terms",
                    "Review deposits, withdrawals and costs",
                  ].map(
                    (item) => (
                      <div
                        key={
                          item
                        }
                        className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[9px] font-bold leading-5 text-slate-700"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[8px] font-black text-emerald-700">
                          ✓
                        </span>

                        {item}
                      </div>
                    ),
                  )}

                </div>


                <div className="mt-4 grid gap-2">

                  {page.regulator_url ? (
                    <SecondaryLink
                      href={
                        page.regulator_url
                      }
                      className="w-full"
                    >
                      Official
                      Regulator Website
                    </SecondaryLink>
                  ) : null}


                  <Link
                    href="/en/licenses"
                    className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-600 px-3 text-[10px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.16)] transition hover:bg-brand-700"
                  >
                    Check Broker
                    Licenses
                  </Link>

                </div>

              </div>

            </aside>


            {/* ===============================================
                GUIDE NAVIGATION
            =============================================== */}
            <nav
              aria-label={`Navigate the ${countryName} forex trading guide`}
              className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.045)]"
            >

              <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] px-4 py-3.5">

                <div className="flex items-center justify-between gap-3">

                  <div>

                    <span className="block text-[8px] font-black text-brand-600">
                      Quick Navigation
                    </span>

                    <h3 className="mt-0.5 text-[14px] font-black text-slate-950">
                      In This Guide
                    </h3>

                  </div>


                  <span className="flex h-9 min-w-9 items-center justify-center rounded-[11px] bg-brand-50 px-2 text-[11px] font-black text-brand-700 ring-1 ring-brand-100">
                    {
                      ordered.length
                    }
                  </span>

                </div>

              </div>


              <div className="p-2.5">

                {ordered.map(
                  (
                    block,
                    index,
                  ) => {
                    const meta =
                      getGuideMeta(
                        block.section_key,
                        index,
                      );

                    const href =
                      block.section_key ===
                      "how_to_choose"
                        ? "#methodology"
                        : `#guide-desktop-${block.id}`;

                    return (
                      <a
                        key={
                          block.id
                        }
                        href={href}
                        className="group flex min-h-[42px] items-center gap-2.5 rounded-[11px] px-2.5 py-2 transition hover:bg-slate-50"
                      >

                        <span
                          dir="ltr"
                          className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-[9px] bg-slate-50 px-1.5 text-[8px] font-black text-slate-500 ring-1 ring-slate-200 transition group-hover:bg-white group-hover:text-brand-700"
                        >
                          {
                            meta.number
                          }
                        </span>


                        <span className="min-w-0 flex-1">

                          <span className="block text-[7px] font-black text-brand-600">
                            {
                              meta.label
                            }
                          </span>

                          <span className="mt-0.5 block truncate text-[9px] font-black text-slate-700 group-hover:text-slate-950">
                            {short(
                              block.title,
                              38,
                            )}
                          </span>

                        </span>


                        <span className="text-[10px] font-black text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600">
                          →
                        </span>

                      </a>
                    );
                  },
                )}

              </div>

            </nav>


            {/* ===============================================
                CTA
            =============================================== */}
            <div className="relative overflow-hidden rounded-[20px] bg-[#0b326d] p-4 text-white shadow-[0_14px_30px_rgba(11,50,109,0.16)]">

              <div
                aria-hidden="true"
                className="absolute -right-12 -top-14 h-[120px] w-[120px] rounded-full bg-blue-400/20 blur-[45px]"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-16 -left-10 h-[130px] w-[130px] rounded-full bg-cyan-300/10 blur-[45px]"
              />


              <div className="relative">

                <span className="inline-flex min-h-[23px] items-center rounded-full bg-white/10 px-2.5 text-[7px] font-black text-blue-100 ring-1 ring-white/15">
                  Ready to Compare?
                </span>


                <h3 className="mt-3 text-[16px] font-black leading-6 text-white">
                  Compare the Best
                  Forex Brokers in{" "}
                  {countryName}
                </h3>


                <p className="mt-2 text-[9px] font-semibold leading-5 text-blue-100/90">
                  Review broker
                  accounts, trading
                  costs and key
                  conditions before
                  opening an account.
                </p>


                <a
                  href="#top-brokers"
                  className="mt-3 inline-flex min-h-[39px] w-full items-center justify-center gap-2 rounded-xl bg-white px-3 text-[10px] font-black text-[#0b326d] shadow-sm transition hover:-translate-y-0.5"
                >
                  View Top Brokers

                  <span>
                    ↑
                  </span>
                </a>

              </div>

            </div>

          </SmoothFollowSidebar>


          {/* =================================================
              MAIN KNOWLEDGE CONTENT
          ================================================= */}
          <div className="min-w-0">

            {/* VISUAL STRIP */}
            <div className="mb-4 grid grid-cols-4 gap-3">

              {[
                {
                  title:
                    "Regulation",

                  desc:
                    "Entity & regulator",

                  icon: "✓",
                },

                {
                  title:
                    "Accounts",

                  desc:
                    "Spreads & fees",

                  icon: "◐",
                },

                {
                  title:
                    "Funding",

                  desc:
                    "Deposit & withdraw",

                  icon: "↔",
                },

                {
                  title:
                    "Selection",

                  desc:
                    "Choose carefully",

                  icon: "★",
                },
              ].map(
                (item) => (
                  <div
                    key={
                      item.title
                    }
                    className="flex min-h-[72px] items-center gap-3 rounded-[16px] border border-slate-200 bg-white px-4 shadow-[0_6px_18px_rgba(15,23,42,0.035)]"
                  >

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-brand-50 text-[13px] font-black text-brand-700 ring-1 ring-brand-100">
                      {
                        item.icon
                      }
                    </span>


                    <div>

                      <span className="block text-[11px] font-black text-slate-950">
                        {
                          item.title
                        }
                      </span>

                      <span className="mt-0.5 block text-[8px] font-bold text-slate-500">
                        {
                          item.desc
                        }
                      </span>

                    </div>

                  </div>
                ),
              )}

            </div>


            {/* ===============================================
                DESKTOP ARTICLES
            =============================================== */}
            <div className="grid grid-cols-2 items-stretch gap-4">

              {ordered.map(
                (
                  block,
                  index,
                ) => {
                  const meta =
                    getGuideMeta(
                      block.section_key,
                      index,
                    );

                  const colors =
                    toneClasses[
                      meta.tone
                    ];


                  return (
                    <article
                      key={
                        block.id
                      }
                      id={
                        block.section_key ===
                        "how_to_choose"
                          ? "methodology"
                          : `guide-desktop-${block.id}`
                      }
                      className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border bg-white shadow-[0_8px_24px_rgba(15,23,42,0.035)] ${colors.border}`}
                    >

                      {/* HEADER */}
                      <div className="relative overflow-hidden border-b border-slate-100 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] px-5 pb-5 pt-5">

                        <div
                          className={`absolute inset-x-0 top-0 h-[3px] ${colors.accent}`}
                        />


                        <div className="flex items-start justify-between gap-5">

                          {/* CATEGORY + TITLE */}
                          <div className="min-w-0 flex-1">

                            <div className="flex items-center gap-2">

                              <span
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] text-[14px] font-black shadow-sm ring-1 ${colors.icon}`}
                              >
                                {
                                  meta.icon
                                }
                              </span>


                              <span
                                className={`inline-flex min-h-[25px] items-center rounded-full px-2.5 text-[8px] font-black ${colors.badge}`}
                              >
                                {
                                  meta.label
                                }
                              </span>

                            </div>


                            {block.eyebrow ? (
                              <span className="mt-4 block text-[9px] font-black text-brand-600">
                                {
                                  block.eyebrow
                                }
                              </span>
                            ) : null}


                            <h3 className="mt-1.5 max-w-[520px] text-[22px] font-black leading-[1.35] tracking-[-0.03em] text-slate-950 xl:text-[23px]">
                              {
                                block.title
                              }
                            </h3>

                          </div>


                          {/* NUMBER */}
                          <div className="flex shrink-0 items-start justify-end">

                            <span
                              aria-hidden="true"
                              dir="ltr"
                              className="select-none text-[40px] font-black leading-none tracking-[-0.06em] text-slate-200"
                            >
                              {
                                meta.number
                              }
                            </span>

                          </div>

                        </div>

                      </div>


                      {/* CONTENT */}
                      <div className="flex flex-1 flex-col p-5 pb-5">

                        {block.short_answer ? (
                          <div className="rounded-[13px] border border-brand-100 bg-brand-50/40 px-3.5 py-3">

                            <span className="block text-[7px] font-black text-brand-600">
                              Quick Answer
                            </span>

                            <p className="mt-1 text-[10.5px] font-bold leading-[1.85] text-slate-800">
                              {
                                block.short_answer
                              }
                            </p>

                          </div>
                        ) : null}


                        <div className="mt-3.5 space-y-2.5 text-[11.5px] font-semibold leading-[1.95] text-slate-600">

                          {paragraphs(
                            block.content,
                          ).map(
                            (
                              text,
                              pIndex,
                            ) => (
                              <p
                                key={
                                  pIndex
                                }
                              >
                                {text}
                              </p>
                            ),
                          )}

                        </div>


                        {/* KEY POINTS */}
                        {block.bullets
                          ?.length ? (
                          <div className="mt-4">

                            <div className="mb-2 flex items-center gap-2">

                              <span className="text-[8px] font-black text-slate-400">
                                Key Points
                              </span>

                              <div className="h-px flex-1 bg-slate-100" />

                            </div>


                            <div className="grid gap-2">

                              {block.bullets
                                .slice(
                                  0,
                                  4,
                                )
                                .map(
                                  (
                                    bullet,
                                  ) => (
                                    <div
                                      key={
                                        bullet
                                      }
                                      className="flex min-h-[38px] items-center gap-2.5 rounded-[11px] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] px-3 py-2.5 text-[9px] font-bold leading-5 text-slate-700"
                                    >
                                      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[8px] font-black text-emerald-700 ring-1 ring-emerald-100">
                                        ✓
                                      </span>

                                      <span className="flex-1">
                                        {
                                          bullet
                                        }
                                      </span>
                                    </div>
                                  ),
                                )}

                            </div>

                          </div>
                        ) : null}


                        <SourceLinks
                          links={
                            block.source_links
                          }
                        />


                        {block.cta_label &&
                        block.cta_url ? (
                          <div className="mt-4">

                            <SecondaryLink
                              href={
                                block.cta_url
                              }
                            >
                              {
                                block.cta_label
                              }
                            </SecondaryLink>

                          </div>
                        ) : null}

                      </div>

                    </article>
                  );
                },
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MOBILE KNOWLEDGE HUB
      ===================================================== */}
      <div className="p-3.5 lg:hidden">

        <div className="mb-3 flex items-center justify-between px-1">

          <span className="text-[9px] font-black text-slate-500">
            Choose a topic
            to explore
          </span>

          <span className="text-[8px] font-bold text-brand-600">
            {ordered.length}{" "}
            topics
          </span>

        </div>


        <div className="space-y-2.5">

          {ordered.map(
            (
              block,
              index,
            ) => {
              const meta =
                getGuideMeta(
                  block.section_key,
                  index,
                );

              const colors =
                toneClasses[
                  meta.tone
                ];


              return (
                <details
  key={
    block.id
  }
  id={`guide-${block.id}`}
  className={`group relative overflow-hidden rounded-[16px] border bg-white ${colors.border}`}
>

                  <div
                    className={`absolute bottom-0 left-0 top-0 w-[3px] ${colors.accent}`}
                  />


                  <summary className="cursor-pointer list-none px-3.5 py-3.5">

                    <div className="flex items-start gap-3">

                      {/* NUMBER / ICON */}
                      <div className="flex shrink-0 flex-col items-center gap-1.5">

                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-[11px] text-[13px] font-black ring-1 ${colors.icon}`}
                        >
                          {
                            meta.icon
                          }
                        </span>

                        <span className="text-[7px] font-black text-slate-400">
                          {
                            meta.number
                          }
                        </span>

                      </div>


                      {/* TEXT */}
                      <div className="min-w-0 flex-1">

                        <span
                          className={`inline-flex min-h-[20px] items-center rounded-full px-2 text-[7px] font-black ${colors.badge}`}
                        >
                          {
                            meta.label
                          }
                        </span>


                        <h3 className="mt-1.5 text-[14px] font-black leading-[1.45] text-slate-950">
                          {
                            block.title
                          }
                        </h3>


                        {block.short_answer ? (
                          <p className="mt-1.5 line-clamp-2 text-[10px] font-semibold leading-[1.75] text-slate-600 group-open:hidden">
                            {
                              block.short_answer
                            }
                          </p>
                        ) : (
                          <p className="mt-1.5 line-clamp-2 text-[10px] font-semibold leading-[1.75] text-slate-600 group-open:hidden">
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
                          Quick Answer
                        </span>

                        <p className="mt-1 text-[11px] font-bold leading-[1.8] text-slate-800">
  {
    block.short_answer
  }
</p>

                      </div>
                    ) : null}


                    <div className="mt-3 space-y-3 text-[11px] font-semibold leading-[1.9] text-slate-600">

                      {paragraphs(
                        block.content,
                      ).map(
                        (
                          text,
                          pIndex,
                        ) => (
                          <p
                            key={
                              pIndex
                            }
                          >
                            {text}
                          </p>
                        ),
                      )}

                    </div>


                    {block.bullets
                      ?.length ? (
                      <div className="mt-3 space-y-2">

                        {block.bullets
                          .slice(
                            0,
                            4,
                          )
                          .map(
                            (
                              bullet,
                            ) => (
                              <div
                                key={
                                  bullet
                                }
                                className="flex items-start gap-2 rounded-[11px] border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold leading-[1.7] text-slate-700"
                              >
                                <span className="mt-0.5 text-emerald-600">
                                  ✓
                                </span>

                                <span>
                                  {
                                    bullet
                                  }
                                </span>
                              </div>
                            ),
                          )}

                      </div>
                    ) : null}


                    <SourceLinks
                      links={
                        block.source_links
                      }
                    />


                    {block.cta_label &&
                    block.cta_url ? (
                      <div className="mt-3">

                        <SecondaryLink
                          href={
                            block.cta_url
                          }
                          className="w-full"
                        >
                          {
                            block.cta_label
                          }
                        </SecondaryLink>

                      </div>
                    ) : null}

                  </div>

                </details>
              );
            },
          )}

        </div>


        {/* MOBILE REGULATOR */}
        <div className="mt-3 overflow-hidden rounded-[16px] border border-brand-100 bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_100%)]">

          <div className="flex items-center gap-3 p-3.5">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white text-[15px] font-black text-brand-700 shadow-sm ring-1 ring-brand-100">
              ✓
            </span>


            <div className="min-w-0">

              <span className="block text-[7px] font-black text-brand-600">
                Local Regulatory
                Authority
              </span>

              <span className="mt-0.5 block text-[11px] font-black leading-5 text-slate-950">
                {page.regulator_name ||
                  "Check the relevant regulator"}
              </span>

            </div>

          </div>


          {page.regulator_url ? (
            <div className="border-t border-brand-100 px-3.5 py-3">

              <SecondaryLink
                href={
                  page.regulator_url
                }
                className="w-full"
              >
                Visit Official
                Website
              </SecondaryLink>

            </div>
          ) : null}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   FAQ
========================================================= */

function FaqSection({
  faqs,
  countryName,
}: {
  faqs: FaqRow[];
  countryName: string;
}) {
  if (!faqs.length) {
    return null;
  }

  return (
    <section
      id="faq"
      className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)] sm:rounded-[28px]"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_60%,#eaf3ff_100%)] px-4 py-5 text-left sm:px-7 sm:py-7">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-28 h-[240px] w-[240px] rounded-full bg-brand-100/55 blur-[90px]"
        />


        <div className="relative">

          <span className="inline-flex min-h-[27px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
            Frequently Asked Questions
          </span>


          <h2 className="mt-3 max-w-[980px] text-[24px] font-black leading-[1.14] tracking-[-0.03em] text-slate-950 sm:text-[31px]">
            Common Questions About
            Forex Brokers in{" "}
            {countryName}
          </h2>


          <p className="mt-2 max-w-[900px] text-[10px] font-semibold leading-5 text-slate-600 sm:text-[12px] sm:leading-6">
            Answers to common
            questions about choosing
            a forex broker, regulation,
            trading accounts, deposits,
            withdrawals and trading
            costs in {countryName}.
          </p>

        </div>

      </div>


      {/* =====================================================
          FAQ LIST
      ===================================================== */}
      <div className="p-3.5 sm:p-6 lg:px-8 lg:py-7">

        <div className="mx-auto max-w-[1180px]">

          <div className="space-y-2.5 lg:space-y-0 lg:overflow-hidden lg:rounded-[20px] lg:border lg:border-slate-200 lg:bg-white lg:shadow-[0_8px_24px_rgba(15,23,42,0.035)]">

            {faqs.map(
              (
                faq,
                index,
              ) => (
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
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>


                    {/* QUESTION */}
                    <h3
                      className="
                        min-w-0 flex-1
                        text-left
                        text-[12px] font-black leading-[1.65] text-slate-950

                        sm:text-[15px] sm:leading-6

                        lg:text-[16px]
                        lg:leading-7
                      "
                    >
                      {
                        faq.question
                      }
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

                    <div className="ml-[44px] sm:ml-[52px] lg:ml-[52px] lg:max-w-[980px]">

                      <p className="text-[10px] font-semibold leading-[1.9] text-slate-600 sm:text-[12px] sm:leading-7 lg:text-[12.5px]">
                        {
                          faq.answer
                        }
                      </p>


                      {faq.link_label &&
                      faq.link_url ? (
                        <Link
                          href={
                            faq.link_url
                          }
                          className="mt-3 inline-flex min-h-[33px] items-center rounded-[9px] border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm transition hover:bg-brand-50 sm:text-[10px]"
                        >
                          {
                            faq.link_label
                          }
                        </Link>
                      ) : null}

                    </div>

                  </div>

                </details>
              ),
            )}

          </div>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   FINAL CTA
========================================================= */

function FinalCta({
  page,
  winner,
}: {
  page: CountryPage;
  winner: Broker | null;
}) {
  const countryName =
    page.country_name_en;

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-brand-100 bg-[linear-gradient(135deg,#ffffff_0%,#f1f7ff_52%,#e7f1ff_100%)] shadow-[0_16px_42px_rgba(30,91,184,0.08)] sm:rounded-[28px]">

      {/* DECORATIONS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -top-32 h-[280px] w-[280px] rounded-full bg-brand-100/75 blur-[95px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-[260px] w-[260px] rounded-full bg-blue-100/55 blur-[95px]"
      />


      <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_330px]">

        {/* CONTENT */}
        <div className="px-4 py-5 text-center sm:px-7 sm:py-7 lg:px-8 lg:py-8 lg:text-left">

          <span className="inline-flex min-h-[27px] items-center rounded-full border border-brand-100 bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm sm:text-[10px]">
            Final Take
          </span>


          <h2 className="mx-auto mt-3 max-w-[760px] text-[25px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-[32px] lg:mx-0">
            What Is the Best Forex
            Broker in {countryName}?
          </h2>


          <p className="mx-auto mt-2.5 max-w-[760px] text-[10px] font-semibold leading-[1.85] text-slate-600 sm:text-[12px] sm:leading-6 lg:mx-0">
            There is no single forex
            broker that is best for
            every trader. Compare
            regulation, trading
            accounts, spreads, fees,
            platforms, minimum deposit
            and funding options to find
            the broker that best fits
            your trading needs in{" "}
            {countryName}.
          </p>


          <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">

            <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[8px] font-black text-slate-700 ring-1 ring-slate-200 sm:text-[9px]">
              <span className="text-emerald-600">
                ✓
              </span>

              Check regulation
            </span>


            <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[8px] font-black text-slate-700 ring-1 ring-slate-200 sm:text-[9px]">
              <span className="text-emerald-600">
                ✓
              </span>

              Compare accounts & costs
            </span>


            <span className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full bg-white px-3 text-[8px] font-black text-slate-700 ring-1 ring-slate-200 sm:text-[9px]">
              <span className="text-emerald-600">
                ✓
              </span>

              Confirm local availability
            </span>

          </div>

        </div>


        {/* WINNER */}
        <div className="border-t border-brand-100 bg-white/65 p-4 backdrop-blur sm:p-5 lg:border-l lg:border-t-0">

          {winner ? (
            <div className="flex h-full flex-col justify-center rounded-[20px] border border-slate-200 bg-white p-4 text-center shadow-[0_10px_28px_rgba(15,23,42,0.055)]">

              <span className="text-[8px] font-black text-brand-600">
                Current Top-Ranked Broker
              </span>


              {/* BIG LOGO */}
              <Link
                href={brokerHref(
                  winner,
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${winner.name} broker review`}
                className="group mx-auto mt-2.5 flex w-fit items-center justify-center"
              >

                {winner.logo ? (
                  <div className="relative h-[88px] w-[190px] sm:h-[96px] sm:w-[210px]">

                    <Image
                      src={
                        winner.logo
                      }
                      alt={`${winner.name ?? "Forex broker"} logo`}
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
                    {(winner.name ||
                      "BA")
                      .slice(
                        0,
                        2,
                      )
                      .toUpperCase()}
                  </span>
                )}

              </Link>


              {/* SMALL NAME */}
              <Link
                href={brokerHref(
                  winner,
                )}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mx-auto mt-0.5 block w-fit text-[12px] font-black text-slate-600 transition hover:text-brand-700 sm:text-[13px]"
              >
                {winner.name}
              </Link>


              <div className="mt-3 grid grid-cols-2 gap-2">

                <PrimaryLink
                  href={realHref(
                    winner,
                  )}
                  className="w-full"
                >
                  Open Account
                </PrimaryLink>


                <SecondaryLink
                  href="#comparison"
                  className="w-full"
                >
                  Compare Accounts
                </SecondaryLink>

              </div>

            </div>
          ) : (
            <div className="flex h-full items-center justify-center">

              <SecondaryLink
                href="#comparison"
                className="w-full"
              >
                Compare Accounts
              </SecondaryLink>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default async function BestBrokersCountryPage({
  params,
}: PageProps) {
  const { country } =
    await params;

  const data =
    await getCountryData(
      country,
    );

  if (!data) {
    notFound();
  }


  const {
    page,
    rankings,
    blocks,
    faqs,
    payments,
  } = data;


  const countryName =
    page.country_name_en;


  const topFive =
    rankings.slice(
      0,
      5,
    );


  const winner =
    oneBroker(
      topFive[0]
        ?.brokers || null,
    );


  const brokerIds =
    topFive
      .map(
        (row) =>
          oneBroker(
            row.brokers,
          )?.id,
      )
      .filter(
        Boolean,
      ) as number[];


  const accounts =
    await getBrokerAccounts(
      brokerIds,
    );


  /* =========================================================
     SCHEMA VARIABLES
  ========================================================= */

  const pageUrl =
    `${BASE_URL}/en/best-brokers/${page.slug}`;


  const schemaLanguage =
    page.country_code
      ? `en-${page.country_code.toUpperCase()}`
      : "en";


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
    `Best Forex Brokers in ${countryName} 2026`;


  const pageDescription =
    `Compare the best forex brokers in ${countryName} for 2026, including regulation, safety, trading accounts, spreads, fees, platforms, minimum deposits and local payment methods.`;


/* =========================================================
   STRUCTURED DATA
========================================================= */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [

      /* =====================================================
         ORGANIZATION
      ===================================================== */
      {
        "@type":
          "Organization",

        "@id":
          organizationId,

        name:
          "Broker Alarab",

        alternateName:
          "بروكر العرب",

        url:
          BASE_URL,

      },


      /* =====================================================
         WEBSITE
      ===================================================== */
      {
        "@type":
          "WebSite",

        "@id":
          websiteId,

        url:
          BASE_URL,

        name:
          "Broker Alarab",

        alternateName:
          "بروكر العرب",

        publisher: {
          "@id":
            organizationId,
        },

        inLanguage: [
          "en",
          "ar",
        ],
      },


      /* =====================================================
         WEBPAGE / COLLECTION PAGE
      ===================================================== */
      {
        "@type": [
          "WebPage",
          "CollectionPage",
        ],

        "@id":
          webpageId,

        url:
          pageUrl,

        name:
          pageTitle,

        headline:
          pageTitle,

        description:
          pageDescription,

        inLanguage:
          schemaLanguage,

        isPartOf: {
          "@id":
            websiteId,
        },

        publisher: {
          "@id":
            organizationId,
        },


        about: [
          {
            "@type":
              "Thing",

            name:
              `Forex trading in ${countryName}`,
          },

          {
            "@type":
              "Thing",

            name:
              `Forex brokers in ${countryName}`,
          },

          {
            "@type":
              "Thing",

            name:
              `Best forex brokers in ${countryName}`,
          },

          {
            "@type":
              "Thing",

            name:
              `Forex trading platforms in ${countryName}`,
          },
        ],


        breadcrumb: {
          "@id":
            breadcrumbId,
        },


        mainEntity: {
          "@id":
            brokerListId,
        },


        hasPart: [
          {
            "@id":
              articleId,
          },

          ...(faqs.length
            ? [
                {
                  "@id":
                    faqId,
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
        "@type":
          "Article",

        "@id":
          articleId,

        url:
          pageUrl,

        headline:
          pageTitle,

        name:
          pageTitle,

        description:
          pageDescription,

        inLanguage:
          schemaLanguage,


        mainEntityOfPage: {
          "@id":
            webpageId,
        },


        isPartOf: {
          "@id":
            webpageId,
        },


        author: {
          "@id":
            organizationId,
        },


        publisher: {
          "@id":
            organizationId,
        },


        articleSection: [
          "Best Forex Brokers",

          `Forex Trading in ${countryName}`,

          "Forex Broker Comparison",

          "Forex Trading Accounts",

          "Regulation and Safety",

          "Spreads and Trading Costs",

          "Deposits and Withdrawals",
        ],


        keywords: [
          `best forex brokers in ${countryName}`,

          `forex brokers in ${countryName}`,

          `best forex broker ${countryName}`,

          `regulated forex brokers in ${countryName}`,

          `forex trading in ${countryName}`,

          `forex trading platforms in ${countryName}`,

          `best trading platforms in ${countryName}`,

          `forex broker comparison ${countryName}`,
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
        "@type":
          "ItemList",

        "@id":
          brokerListId,

        url:
          `${pageUrl}#top-brokers`,

        name:
          `Ranking of the Best Forex Brokers in ${countryName}`,

        description:
          `Comparison and ranking of forex brokers available to traders in ${countryName}, including regulation, trading accounts, spreads, fees, platforms and local suitability.`,

        numberOfItems:
          topFive.length,

        itemListOrder:
          "https://schema.org/ItemListOrderAscending",

        mainEntityOfPage: {
          "@id":
            webpageId,
        },


        itemListElement:
          topFive
            .map(
              (row) => {
                const broker =
                  oneBroker(
                    row.brokers,
                  );

                if (
                  !broker
                    ?.slug ||
                  !broker.name
                ) {
                  return null;
                }


                const brokerUrl =
                  `${BASE_URL}/en/brokers/${broker.slug}`;


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
                              `${broker.name} logo`,
                          },
                        }
                      : {}),
                  },
                };
              },
            )
            .filter(
              Boolean,
            ),
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
              "Home",

            item:
              `${BASE_URL}/en`,
          },


          {
            "@type":
              "ListItem",

            position: 2,

            name:
              "Best Forex Brokers",

            item:
              `${BASE_URL}/en/best-brokers`,
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
                `Frequently Asked Questions About Forex Brokers in ${countryName}`,

              description:
                `Answers to common questions about forex brokers, regulation, trading accounts, spreads, deposits and trading costs in ${countryName}.`,

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
     SAFE JSON-LD
  ========================================================= */

  const structuredDataJson =
    JSON.stringify(
      structuredData,
    ).replace(
      /</g,
      "\\u003c",
    );


  /* =========================================================
     ENGLISH RISK WARNING
  ========================================================= */

  const riskWarning =
    safeEnglishText(
      page.risk_warning,

      "Forex and CFD trading involves a high level of risk and may not be suitable for all investors. Trading conditions, leverage, protections and product availability can vary by broker and legal entity. Review the broker's official terms and understand the risks before trading.",
    );


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main
  dir="ltr"
  lang="en"
  className="country-en-page min-h-screen bg-[#f4f7fb] text-slate-950"
>

   <style>{`
  /* ==========================================================
     BROKER ALARAB — ENGLISH COUNTRY PAGE TYPOGRAPHY SYSTEM
     Mobile readability normalization
  ========================================================== */

  @media (max-width: 639px) {

    /*
      MICRO LABELS
      Old: 7 / 7.5 / 8px
      New: 10px
    */
    .country-en-page [class~="text-[7px]"],
    .country-en-page [class~="text-[7.5px]"],
    .country-en-page [class~="text-[8px]"] {
      font-size: 10px !important;
      line-height: 1.45 !important;
    }


    /*
      SMALL UI COPY
      Old: 9 / 9.5 / 10 / 10.5px
      New: 12px
    */
    .country-en-page [class~="text-[9px]"],
    .country-en-page [class~="text-[9.5px]"],
    .country-en-page [class~="text-[10px]"],
    .country-en-page [class~="text-[10.5px]"] {
      font-size: 12px !important;
    }


    /*
      NORMAL BODY COPY
      Old: 11 / 11.5px
      New: 13px
    */
    .country-en-page [class~="text-[11px]"],
    .country-en-page [class~="text-[11.5px]"] {
      font-size: 13px !important;
    }


    /*
      Existing 12px body copy becomes the standard
      readable mobile body size.
    */
    .country-en-page [class~="text-[12px]"] {
      font-size: 13px !important;
    }


    /*
      Better paragraph readability without touching headings
    */
    .country-en-page p {
      text-rendering: optimizeLegibility;
    }
  }
`}</style>

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}
      <Script
        id={`country-structured-data-en-${page.slug}`}
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
              countryName
            }
          />


          {/* =================================================
              ACCOUNT COMPARISON
          ================================================= */}
          <ComparisonSection
            rows={topFive}
            accounts={
              accounts
            }
            countryName={
              countryName
            }
            intro={
              page.comparison_intro
            }
          />


          {/* =================================================
              PAYMENT METHODS
          ================================================= */}
          <PaymentSection
            methods={
              payments
            }
            countryName={
              countryName
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
              countryName
            }
          />


          {/* =================================================
              RISK WARNING
          ================================================= */}
          <div className="rounded-[18px] border border-amber-200 bg-[#fffaf0] px-4 py-3.5 text-[9px] font-semibold leading-5 text-amber-950 sm:px-5 sm:text-[10px]">

            <span className="font-black">
              Risk Warning:{" "}
            </span>

            {riskWarning}

          </div>


          {/* =================================================
              FINAL CTA
          ================================================= */}
          <FinalCta
            page={page}
            winner={
              winner
            }
          />

        </div>

      </div>

    </main>
  );
}