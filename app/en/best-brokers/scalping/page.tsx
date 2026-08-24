import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* =====================================================
   PAGE SEO CONSTANTS
====================================================== */

const BASE_URL = "https://brokeralarab.com";
const PAGE_URL = `${BASE_URL}/en/best-brokers/scalping`;
const PAGE_IMAGE_URL = `${BASE_URL}/og-image.webp`;

const PAGE_TITLE =
  "Best Forex Brokers for Scalping in 2026";

const PAGE_HEADLINE =
  "Best Forex Brokers for Scalping in 2026";

const PAGE_DESCRIPTION =
  "Compare the best forex brokers for scalping in 2026 based on spreads, commissions, execution, Raw and ECN accounts, and support for MT4, MT5, cTrader and TradingView.";

const DATE_PUBLISHED = "2026-07-30";
const DATE_MODIFIED = "2026-07-30";

const PAGE_KEYWORDS = [
  "best forex brokers for scalping",
  "best scalping broker",
  "best forex broker for scalping",
  "forex brokers that allow scalping",
  "scalping forex brokers",
  "best broker for scalpers",
  "low spread forex brokers",
  "lowest spread broker for scalping",
  "low commission forex broker",
  "raw spread account",
  "raw spread broker",
  "ECN broker for scalping",
  "best ECN account for scalping",
  "fast execution forex broker",
  "best cTrader broker for scalping",
  "best MT5 broker for scalping",
  "best MT4 broker for scalping",
  "best forex trading platform for scalping",
  "best forex brokers 2026",
];

type BrokerAccount = {
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
  account_type: string | null;
  is_islamic_available: boolean | null;
  islamic_conditions: string | null;
  commission_value: number | null;
  commission_en: string | null;
  min_deposit_en: string | null;
  best_for_en: string | null;
  is_best_for_scalping: boolean | null;
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
  regulation: string | null;
  regulation_short: string | null;
  platforms: string | null;
  arabic_support: string | null;
  islamic_account: string | null;
  min_deposit: number | null;
  max_leverage: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
};

/* =====================================================
   SUPABASE BROKER RELATION TYPES
====================================================== */

/**
 * Raw relationship shape returned by Supabase.
 * The related broker may be an object, an array or null.
 */
type RawScalpingBroker = BrokerAccount & {
  broker: Broker | Broker[] | null;
};

/**
 * Validated broker shape used throughout the page.
 * Here we guarantee that broker, slug and name are available.
 */
type ValidScalpingBroker = BrokerAccount & {
  broker: Broker & {
    slug: string;
    name: string;
  };
};

type EditorialDetails = {
  rank: number;
  score: number;
  award: string;
  shortAward: string;
  verdict: string;
  whySelected: string[];
  warning: string;
  reviewText: string[];
};

const editorialData: Record<string, EditorialDetails> = {
  icmarkets: {
    rank: 1,
    score: 9.4,
    award: "Best Overall Forex Broker for Scalping",
    shortAward: "Best Overall",
    verdict:
      "A leading choice for active traders who want competitive Raw pricing, cTrader execution and a platform range built for scalping and automated strategies.",
    whySelected: [
      "The cTrader Raw Spread account offers institutional-style pricing with spreads starting from low levels.",
      "Competitive round-turn commission for traders placing a high number of short-duration trades.",
      "Supports cTrader, TradingView, MT4 and MT5 across its account offering.",
      "Strong order-placement flexibility for strategies that operate close to the current market price.",
    ],
    warning:
      "Traders who rely on Expert Advisors written for MT4 or MT5 may prefer the MetaTrader Raw Spread account rather than the cTrader version featured in this comparison.",
    reviewText: [
      "IC Markets takes the top position because it combines transparent Raw pricing, competitive trading costs and one of the strongest platform selections for active forex traders. The account selected for this ranking is its cTrader Raw Spread account, not the Standard account or the MetaTrader Raw account.",
      "Its pricing becomes especially relevant for high-frequency and high-volume traders. Even a small difference in commission can materially affect total costs when a strategy opens and closes many positions each day. cTrader and TradingView also provide useful tools such as one-click trading, advanced charting and market-depth visibility.",
      "First place does not mean IC Markets is automatically the right broker for every scalper. Traders using MQL4 or MQL5 robots will need a different account and platform combination, while market execution can still involve slippage during volatile or low-liquidity conditions.",
    ],
  },

  pepperstone: {
    rank: 2,
    score: 9.2,
    award: "Best Scalping Broker for Platform Choice",
    shortAward: "Best Platform Choice",
    verdict:
      "A strong option for traders who want to switch between MetaTrader, cTrader and TradingView while keeping access to competitive Raw pricing.",
    whySelected: [
      "The Razor account is designed for active traders, scalpers and algorithmic strategies.",
      "Supports MT4, MT5, cTrader and TradingView.",
      "Raw spreads start from low levels on major currency pairs.",
      "Strong regulatory coverage and a polished multi-platform trading experience.",
    ],
    warning:
      "The total Razor account cost may be slightly higher than some lower-commission competitors once both the spread and commission are included.",
    reviewText: [
      "Pepperstone’s main advantage is not simply its advertised commission. Its real strength is platform flexibility. The Razor account can be used with MetaTrader or cTrader, while TradingView integration gives discretionary traders another strong charting and execution option.",
      "The broker also earns a high ranking because of its established regulatory profile, transparent Razor account structure and broad platform support. It is particularly useful for traders who do not want their strategy tied to one trading platform.",
      "The main drawback is that Pepperstone may not always deliver the lowest all-in trading cost when compared with IC Markets or Tickmill. Scalpers should compare live spreads during their normal trading hours instead of relying only on a headline spread starting from zero.",
    ],
  },

  tickmill: {
    rank: 3,
    score: 9.1,
    award: "Best Low-Cost Forex Broker for Scalping",
    shortAward: "Best Low-Cost Pick",
    verdict:
      "A straightforward Raw account with low commission and trading conditions that suit short-term, automated and high-frequency strategies.",
    whySelected: [
      "Low commission compared with many other Raw and ECN-style accounts.",
      "Scalping, Expert Advisors and high-frequency trading are supported.",
      "The account’s value does not depend on a temporary promotion or deposit bonus.",
      "A simple account structure that makes costs easier to understand and compare.",
    ],
    warning:
      "Its platform selection and additional trading tools are less extensive than those offered by Pepperstone and IC Markets.",
    reviewText: [
      "Tickmill stands out because of its simplicity: a Raw account, a clearly stated commission and a trading policy suited to traders who open and close many positions. That is why it ranks third even though its direct trading cost may beat some brokers placed above it in certain market conditions.",
      "It does not take first place because our ranking considers more than commission alone. Platform choice, supporting tools, regulation and overall trading flexibility also matter. Even so, Tickmill remains one of the strongest options for MetaTrader users focused on keeping costs under control.",
      "Scalpers should still monitor spreads around major news releases, market opens and periods of weaker liquidity. A low commission does not guarantee that the total cost of each trade will remain low at every moment of the trading day.",
    ],
  },

  "fp-markets": {
    rank: 4,
    score: 8.9,
    award: "Best for Combining MetaTrader and cTrader",
    shortAward: "Strong Platform Mix",
    verdict:
      "A well-balanced alternative offering competitive Raw pricing and a useful selection of execution platforms for manual and automated traders.",
    whySelected: [
      "Competitive commission on its Raw account.",
      "Supports MT4, MT5, cTrader and TradingView.",
      "Suitable for both discretionary and algorithmic scalping strategies.",
      "Relatively transparent Raw-account pricing.",
    ],
    warning:
      "Its research experience and supporting trading tools are not as distinctive as those offered by the top three brokers.",
    reviewText: [
      "FP Markets is a balanced option for traders seeking a low-cost Raw account without being restricted to a single platform. It does not rely on one standout feature, making it suitable for traders who combine scalping, day trading and automated strategies.",
      "Its competitive commission puts the Raw account in direct competition with Tickmill and Vantage, while the availability of cTrader and TradingView improves its score for platform flexibility.",
      "We kept FP Markets outside the top three because its research tools and broader user experience are not as differentiated. The underlying Raw account, however, remains highly competitive from a pricing and execution perspective.",
    ],
  },

  thinkmarkets: {
    rank: 5,
    score: 8.6,
    award: "Best for Higher-Volume Scalpers",
    shortAward: "For Higher Volume",
    verdict:
      "The ThinkZero account is suited to experienced and active traders who are comfortable with a higher entry requirement in exchange for Raw-style pricing.",
    whySelected: [
      "ThinkZero offers spreads starting from low levels.",
      "Suitable for scalping and the use of Expert Advisors.",
      "Supports MetaTrader platforms alongside the proprietary ThinkTrader platform.",
      "The broker maintains a solid international regulatory presence.",
    ],
    warning:
      "The minimum deposit required for ThinkZero may be higher than the entry requirement of many competing accounts in this ranking.",
    reviewText: [
      "ThinkZero is aimed more at active traders than beginners testing scalping with a very small deposit. ThinkMarkets therefore retains a strong position, but it does not rank above brokers that provide easier access to competitive Raw pricing.",
      "The account supports Expert Advisors and frequent trading, while ThinkTrader provides an alternative to brokers that depend entirely on the MetaTrader ecosystem.",
      "The main decision factor is starting capital. ThinkZero is a capable account, but traders with a limited budget may find Tickmill, FP Markets or Vantage easier to access.",
    ],
  },

  fxpro: {
    rank: 6,
    score: 8.5,
    award: "Best for Traders Prioritising Regulation",
    shortAward: "Regulation and Execution",
    verdict:
      "An established global broker with a Raw+ account and several platform options, although it is neither the lowest-cost choice nor the most flexible for extremely close order placement.",
    whySelected: [
      "Long operating history and a strong international regulatory footprint.",
      "Raw+ account designed around commission-based pricing.",
      "Supports MT4, MT5 and additional proprietary trading platforms.",
      "Suitable for traders balancing broker strength, execution and platform choice.",
    ],
    warning:
      "Minimum distances may apply to certain stop and limit orders, and its all-in trading cost is not the lowest in this comparison.",
    reviewText: [
      "FxPro earns its place because of its established regulatory profile and mature trading infrastructure, not because it offers the cheapest Raw account. It is a practical option for traders willing to pay slightly more for an established global broker.",
      "The Raw+ account combines low spreads with a separate commission, but strategies placing orders extremely close to the market price may find greater flexibility with brokers such as IC Markets.",
      "This makes FxPro a balanced option rather than the first choice for traders whose only priority is achieving the lowest possible transaction cost.",
    ],
  },

  exness: {
    rank: 7,
    score: 8.4,
    award: "Best for Flexible Account Access",
    shortAward: "Flexible Account Access",
    verdict:
      "A practical choice in many international markets thanks to accessible account options, broad payment support and competitive Raw pricing, although conditions vary by entity and instrument.",
    whySelected: [
      "Widely available account options across a broad range of international markets.",
      "The Raw Spread account starts from low quoted spreads.",
      "Supports multiple deposit and withdrawal methods in many regions.",
      "Swap-free account conditions may be available depending on eligibility and account terms.",
    ],
    warning:
      "Commission can vary by instrument, while investor protection, leverage and account conditions depend on the legal entity serving the client.",
    reviewText: [
      "Exness does not rank first simply because it is widely recognised and offers convenient account funding. Popularity and withdrawal speed are not the only considerations for scalpers; total trading cost, the applicable legal entity and instrument-specific pricing are more important.",
      "Its Raw Spread account can suit short-duration trading, while broad payment availability and accessible account opening make the broker practical for traders in many countries.",
      "Commission should not be presented as one universal figure across all markets. Traders should also verify the legal entity under which their account will be registered before depositing funds.",
    ],
  },

  vantage: {
    rank: 8,
    score: 8.2,
    award: "Best MetaTrader Broker for Scalping",
    shortAward: "Best for MT5 Users",
    verdict:
      "A competitive Raw ECN account for traders who prefer a traditional MT4 or MT5 scalping setup.",
    whySelected: [
      "Competitive commission on the Raw ECN account.",
      "Spreads start from low levels on major forex pairs.",
      "Supports both MT4 and MT5.",
      "A Pro ECN account is available for qualifying high-volume traders.",
    ],
    warning:
      "The lower-cost Pro ECN account generally requires substantially more capital, making it unsuitable for many retail traders.",
    reviewText: [
      "We selected Raw ECN rather than Pro ECN because this comparison is designed for a broad retail audience. The professional account may provide lower commissions, but its entry requirements make it impractical for most traders.",
      "Raw ECN is a straightforward choice for MetaTrader users and gives Vantage a deserved position in the ranking, particularly for traders who do not require cTrader.",
      "The broker ranks eighth because the companies above it generally provide stronger regulation, broader platform choice or a more competitive overall trading cost.",
    ],
  },

  justmarkets: {
    rank: 9,
    score: 7.9,
    award: "Best High-Leverage Raw Spread Option",
    shortAward: "Higher Leverage",
    verdict:
      "A clear Raw Spread account with competitive costs, although the broker’s overall trust and regulatory profile is weaker than the leading names in this comparison.",
    whySelected: [
      "Raw Spread account designed for active and short-term trading.",
      "Relatively low commission.",
      "Supports MT4 and MT5.",
      "Higher leverage may be available depending on the client entity and account conditions.",
    ],
    warning:
      "Its regulatory strength and institutional presence are more limited than those of the brokers occupying the highest positions.",
    reviewText: [
      "Based on account specifications alone, JustMarkets could compete for a higher position. Our methodology also considers regulation, trust and international standing rather than judging brokers solely on spread and commission.",
      "The Raw Spread account is suitable for active MetaTrader traders, while higher leverage may appeal to some users.",
      "Higher leverage is not automatically an advantage and should never be the sole reason for choosing a broker or increasing position size.",
    ],
  },

  hfm: {
    rank: 10,
    score: 7.8,
    award: "Best for Swap-Free and MetaTrader Accounts",
    shortAward: "Swap-Free Option",
    verdict:
      "A useful option for traders seeking a Zero account, MetaTrader access and swap-free account conditions where available.",
    whySelected: [
      "Scalping and Expert Advisors are permitted under the broker’s trading policy.",
      "The Zero account starts from low quoted spreads.",
      "Supports MT4 and MT5.",
      "Swap-free account options and multilingual support are available under certain conditions.",
    ],
    warning:
      "Commission and minimum-deposit requirements may vary by instrument and legal entity, so traders should verify the exact account specifications before opening an account.",
    reviewText: [
      "HFM enters this list because its current Zero account provides a clearer basis for comparison in terms of spreads, MetaTrader support and scalping suitability.",
      "The broker may be particularly relevant to traders looking for multilingual support or swap-free conditions, but it remains below the leading brokers because some account terms vary materially by entity.",
      "A single commission figure should not be treated as universal without checking the instrument and legal entity. The page therefore displays the stored account value while reminding traders to verify the broker’s current specifications.",
    ],
  },
};

const faqs = [
  {
    question: "What is the best forex broker for scalping in 2026?",
    answer:
      "IC Markets ranks first in our 2026 scalping comparison because its cTrader Raw Spread account combines competitive pricing, a broad platform selection and trading conditions suited to short-duration strategies. The best broker for you can still depend on your country, preferred platform, starting capital and regulatory entity.",
  },
  {
    question: "Do all forex brokers allow scalping?",
    answer:
      "No. Scalping rules vary between brokers, account types and legal entities. Before opening an account, check the broker’s trading conditions for minimum trade-duration rules, restrictions on high-frequency activity, Expert Advisor policies and limitations on order placement.",
  },
  {
    question: "Does a zero spread mean forex trading is free?",
    answer:
      "No. Raw accounts advertising spreads from 0.0 pips normally charge a separate commission. Spreads may also widen during news events or low-liquidity periods. The true cost of a scalping trade includes spread, commission, slippage and any applicable overnight financing.",
  },
  {
    question: "What is the best account type for forex scalping?",
    answer:
      "Raw Spread and ECN-style accounts are often better suited to active traders because they provide tighter quoted spreads in exchange for a separate commission. A Standard account may be simpler for lower-volume traders, but its spread markup can make frequent trading more expensive.",
  },
  {
    question: "Can I use Expert Advisors for forex scalping?",
    answer:
      "Many brokers permit automated scalping, but you should verify that the broker allows Expert Advisors and that the selected platform supports your strategy’s programming language. MetaTrader uses MQL4 or MQL5, while cTrader automation is built around C# and cTrader Algo.",
  },
  {
    question: "What is the difference between per-side and round-turn commission?",
    answer:
      "A per-side commission is charged once when a position is opened and again when it is closed. A round-turn commission represents the combined opening and closing cost. Our comparisons aim to show the full round-turn commission per standard lot whenever the available account data allows it.",
  },
  {
    question: "Is MT5 better than MT4 for scalping?",
    answer:
      "MT5 is newer and provides more timeframes, additional order types and stronger strategy-testing tools. MT4 remains suitable for many scalping systems, particularly older Expert Advisors. Execution quality, account pricing and strategy compatibility matter more than choosing a platform based only on its release date.",
  },
  {
    question: "Is cTrader good for forex scalping?",
    answer:
      "Yes. cTrader offers one-click trading, market-depth tools, advanced order controls and an interface designed for active execution. It also supports automated strategies through cTrader Algo.",
  },
  {
    question: "Is high leverage important for scalping?",
    answer:
      "Higher leverage reduces the margin required to open a position, but it also makes it easier to take excessive exposure. A broker should not be selected for scalping based on maximum leverage alone. Trading costs, execution quality and regulation are more important.",
  },
  {
    question: "How should I test a forex broker before scalping with real money?",
    answer:
      "Start with a demo account to learn the platform, then test the broker with a small live position size. Monitor real spreads, execution speed, slippage, rejected orders and withdrawal processing instead of relying only on advertised minimum spreads.",
  },
];

/* =====================================================
   SLUG NORMALIZATION + EDITORIAL LOOKUP
====================================================== */

function normalizeBrokerSlug(
  slug: string | null | undefined
): string {
  return slug?.trim().toLowerCase() ?? "";
}

function getEditorial(
  slug: string | null | undefined
): EditorialDetails | null {
  const normalizedSlug = normalizeBrokerSlug(slug);

  if (!normalizedSlug) {
    return null;
  }

  return editorialData[normalizedSlug] ?? null;
}

function formatRating(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";

  return Number(value).toFixed(2);
}

function formatScore(value: number) {
  return value.toFixed(1);
}

function normalizeText(
  value: string | null | undefined,
  fallback = "Not specified"
) {
  if (!value?.trim()) return fallback;

  return value.trim();
}

function accountSlug(value: string | null | undefined) {
  if (!value?.trim()) return "";

  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function accountPageHref(
  brokerSlug: string,
  accountName: string | null | undefined
) {
  const slug = accountSlug(accountName);

  if (!slug) return null;

  return `/en/brokers/${brokerSlug}/accounts/${slug}`;
}

function splitValues(
  value: string | null | undefined,
  limit = 4
) {
  if (!value?.trim()) return [];

  return value
    .split(/\|\||\||,|\/|;|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function getInitials(value: string | null | undefined) {
  if (!value?.trim()) return "BA";

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function accountDeposit(account: BrokerAccount) {
  return (
    normalizeText(account.min_deposit_en, "") ||
    normalizeText(account.min_deposit, "") ||
    "Not specified"
  );
}

function accountSpread(account: BrokerAccount) {
  if (account.spread?.trim()) {
    return account.spread.trim();
  }

  if (
    account.spread_min !== null &&
    account.spread_min !== undefined
  ) {
    return `From ${Number(account.spread_min)} pips`;
  }

  return "Not specified";
}

function accountCommission(account: BrokerAccount) {
  return (
    normalizeText(account.commission_en, "") ||
    normalizeText(account.commission, "") ||
    "Varies by instrument"
  );
}

function renderStars(
  rating: number | null | undefined
) {
  const safeRating = Math.max(
    0,
    Math.min(5, Number(rating ?? 0))
  );

  const percentage = (safeRating / 5) * 100;

  return (
    <div
      className="relative inline-flex text-[14px] leading-none"
      dir="ltr"
      aria-label={`Rated ${formatRating(rating)} out of 5`}
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
  size = "large",
  linked = true,
}: {
  broker: Broker;
  size?: "small" | "medium" | "large";
  linked?: boolean;
}) {
  const dimensions = {
    small: "h-[50px] w-[80px] rounded-xl",
    medium:
      "h-[60px] w-[92px] rounded-[13px] sm:h-[72px] sm:w-[118px] sm:rounded-[15px]",
    large:
      "h-[72px] w-[116px] rounded-[16px] sm:h-[84px] sm:w-[142px] sm:rounded-[17px]",
  }[size];

  const responsiveSize = {
    small: "80px",
    medium: "118px",
    large: "142px",
  }[size];

  const padding = {
    small: "p-2",
    medium: "p-2",
    large: "p-2",
  }[size];

  const logoContent = broker.logo ? (
    <Image
      src={broker.logo}
      alt={`${broker.name ?? "Forex broker"} logo`}
      fill
      className={`object-contain ${padding}`}
      sizes={responsiveSize}
    />
  ) : (
    <span className="text-base font-black text-slate-600">
      {getInitials(broker.name)}
    </span>
  );

  const sharedClassName = `relative flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.07)] ${dimensions}`;

  if (!linked) {
    return (
      <div className={sharedClassName}>
        {logoContent}
      </div>
    );
  }

  return (
    <Link
      href={`/en/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read our ${broker.name ?? "forex broker"} review`}
      className={`${sharedClassName} transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_28px_rgba(30,91,184,0.11)]`}
    >
      {logoContent}
    </Link>
  );
}

/* =====================================================
   PAGE METADATA
====================================================== */

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: PAGE_KEYWORDS,

  applicationName: "Broker Al Arab",
  category: "Finance",
  creator: "Broker Al Arab Editorial Team",
  publisher: "Broker Al Arab",

  authors: [
    {
      name: "Broker Al Arab Editorial Team",
    },
  ],

  alternates: {
    canonical: PAGE_URL,

    languages: {
      ar: `${BASE_URL}/best-brokers/scalping`,
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
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
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Broker Al Arab",
    type: "article",
    locale: "en_US",

    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,

    authors: ["Broker Al Arab Editorial Team"],

    section: "Best Forex Brokers",

    tags: [
      "Best Forex Brokers for Scalping",
      "Best Scalping Broker",
      "Low Spread Forex Brokers",
      "Raw Spread Account",
      "ECN Forex Brokers",
      "Forex Scalping",
    ],

    images: [
      {
        url: PAGE_IMAGE_URL,
        width: 1560,
        height: 377,
        alt: "Best forex brokers for scalping in 2026",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    images: [
      {
        url: PAGE_IMAGE_URL,
        alt: "Comparison of the best forex brokers for scalping",
      },
    ],
  },

  other: {
    "article:published_time": DATE_PUBLISHED,
    "article:modified_time": DATE_MODIFIED,
    "article:section": "Best Forex Brokers for Scalping",
  },
};
export default async function ScalpingBrokersPage() {
  const supabase = await createClient();

  const { data: accountRows, error } = await supabase
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
      account_type,
      is_islamic_available,
      islamic_conditions,
      commission_value,
      commission_en,
      min_deposit_en,
      best_for_en,
      is_best_for_scalping,
      broker:brokers!inner!broker_accounts_broker_id_fkey (
        id,
        name,
        slug,
        logo,
        rating,
        regulation,
        regulation_short,
        platforms,
        arabic_support,
        islamic_account,
        min_deposit,
        max_leverage,
        real_account_url,
        demo_account_url
      )
   `)
.eq("is_best_for_scalping", true)
.eq("broker.publication_status", "published");

  if (error) {
    console.error("Scalping brokers query error:", error);
  }

  /* =====================================================
     RAW SUPABASE ACCOUNTS
  ====================================================== */

  const rawAccounts =
    (accountRows ?? []) as unknown as RawScalpingBroker[];

  /* =====================================================
     NORMALIZE + VALIDATE + SORT BROKERS
  ====================================================== */

  const brokers: ValidScalpingBroker[] = rawAccounts
    .reduce<ValidScalpingBroker[]>((result, row) => {
      const brokerValue = Array.isArray(row.broker)
        ? row.broker[0] ?? null
        : row.broker;

      if (!brokerValue) {
        return result;
      }

      const normalizedSlug = normalizeBrokerSlug(
        brokerValue.slug
      );

      const normalizedName =
        brokerValue.name?.trim() ?? "";

      if (!normalizedSlug || !normalizedName) {
        return result;
      }

      const editorial = getEditorial(normalizedSlug);

      if (!editorial) {
        return result;
      }

      result.push({
        ...row,
        broker: {
          ...brokerValue,
          slug: normalizedSlug,
          name: normalizedName,
        },
      });

      return result;
    }, [])
    .sort((a, b) => {
      const rankA =
        getEditorial(a.broker.slug)?.rank ?? 999;

      const rankB =
        getEditorial(b.broker.slug)?.rank ?? 999;

      return rankA - rankB;
    });

  /* =====================================================
     QUICK PICKS — EXACT TOP 3
  ====================================================== */

  const topThree: ValidScalpingBroker[] = brokers
    .filter((item) => {
      const rank =
        getEditorial(item.broker.slug)?.rank;

      return (
        typeof rank === "number" &&
        rank >= 1 &&
        rank <= 3
      );
    })
    .sort((a, b) => {
      const rankA =
        getEditorial(a.broker.slug)?.rank ?? 999;

      const rankB =
        getEditorial(b.broker.slug)?.rank ?? 999;

      return rankA - rankB;
    });

  /* =====================================================
     PAGE TOTALS
  ====================================================== */

  const totalBrokers = brokers.length;
  const totalAccounts = brokers.length;
  const totalCriteria = 6;

  const desktopStats = [
    {
      value: String(totalBrokers),
      title: "Brokers",
      desc: "Selected",
    },
    {
      value: String(totalAccounts),
      title: "Accounts",
      desc: "Compared",
    },
    {
      value: String(totalCriteria),
      title: "Criteria",
      desc: "Reviewed",
    },
  ];

  const mobileStats = [
    [String(totalBrokers), "Brokers"],
    [String(totalAccounts), "Accounts"],
    [String(totalCriteria), "Criteria"],
  ] as const;

  /* =====================================================
     DEVELOPMENT VALIDATION
  ====================================================== */

  if (
    process.env.NODE_ENV === "development" &&
    topThree.length !== 3
  ) {
    console.warn("SCALPING TOP THREE IS INCOMPLETE", {
      expectedRanks: [1, 2, 3],

      received: topThree.map((item) => ({
        name: item.broker?.name,
        slug: item.broker?.slug,
        rank: getEditorial(item.broker?.slug)?.rank,
        accountName: item.account_name,
        enabled: item.is_best_for_scalping,
      })),

      allAvailableBrokers: brokers.map((item) => ({
        name: item.broker?.name,
        slug: item.broker?.slug,
        rank: getEditorial(item.broker?.slug)?.rank,
      })),
    });
  }

  /* =====================================================
     STRUCTURED DATA
  ====================================================== */

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PAGE_URL}#faq`,
    inLanguage: "en",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#broker-ranking`,
    name: "Best Forex Brokers for Scalping in 2026",
    description:
      "An editorial ranking of forex brokers and trading accounts suitable for scalping.",
    numberOfItems: brokers.length,
    itemListOrder:
      "https://schema.org/ItemListOrderAscending",
    itemListElement: brokers.map((item, index) => {
      const editorial = getEditorial(
        item.broker.slug
      );

      return {
        "@type": "ListItem",
        position: editorial?.rank ?? index + 1,
        name: item.broker.name,
        url: `${BASE_URL}/en/brokers/${item.broker.slug}`,
      };
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${PAGE_URL}#breadcrumb`,
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
        name: "Best Forex Brokers for Scalping",
        item: PAGE_URL,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: PAGE_HEADLINE,
    description: PAGE_DESCRIPTION,
    image: {
      "@type": "ImageObject",
      url: PAGE_IMAGE_URL,
      width: 1560,
      height: 377,
    },
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
    about: [
      {
        "@type": "Thing",
        name: "Forex scalping",
      },
      {
        "@type": "Thing",
        name: "Raw Spread accounts",
      },
      {
        "@type": "Thing",
        name: "ECN forex brokers",
      },
      {
        "@type": "Thing",
        name: "Low-spread forex trading",
      },
    ],
    keywords: PAGE_KEYWORDS.join(", "),
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Broker Al Arab Editorial Team",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Broker Al Arab",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: PAGE_IMAGE_URL,
      },
    },
    dateModified: DATE_MODIFIED,
    datePublished: DATE_PUBLISHED,
  };

  return (
    <main
      dir="ltr"
      lang="en"
      className="min-h-screen bg-[#f4f7fb] text-slate-950"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      {/* =====================================================
          SCALPING HERO — FINAL PREMIUM
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f2f7fd_100%)]">
        {/* BACKGROUND */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-40 -top-56 h-[520px] w-[520px] rounded-full bg-brand-100/55 blur-[135px]" />

          <div className="absolute -left-44 bottom-[-300px] h-[500px] w-[500px] rounded-full bg-blue-100/45 blur-[145px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.99),transparent_42%)]" />

          <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(30,91,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,91,184,0.055)_1px,transparent_1px)] [background-size:54px_54px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1520px] px-4 pb-5 pt-4 sm:px-6 sm:pb-7 sm:pt-5 lg:px-8 lg:pb-8 lg:pt-5">
          {/* BREADCRUMB */}

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

            <span className="text-slate-300">/</span>

            <Link
              href="/en/best-brokers"
              className="transition hover:text-brand-600"
            >
              Best Forex Brokers
            </Link>

            <span className="text-slate-300">/</span>

            <span className="text-slate-800">
              Scalping Brokers
            </span>
          </nav>

          {/* =================================================
              DESKTOP HERO
          ================================================== */}

          <div className="mt-3 hidden items-center gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px] xl:gap-16">
            {/* TEXT */}

            <div className="min-w-0 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex min-h-[31px] items-center gap-2 rounded-full border border-brand-100 bg-white/90 px-4 text-[11px] font-black text-brand-700 shadow-sm backdrop-blur">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[9px] text-white">
                    ✓
                  </span>

                  Independent scalping account review
                </span>

                <span className="inline-flex min-h-[31px] items-center rounded-full border border-slate-200 bg-white/90 px-4 text-[11px] font-black text-slate-600 shadow-sm">
                  Last updated: July 2026
                </span>
              </div>

              <h1 className="mt-4 max-w-[920px] text-[49px] font-black leading-[1.05] tracking-[-0.04em] text-[#07111f] xl:text-[56px]">
                Best Forex Brokers

                <span className="mt-1 block text-brand-600">
                  for Scalping in 2026
                </span>
              </h1>

              <p className="mt-3 max-w-[880px] text-[14px] font-semibold leading-8 text-slate-600 xl:text-[15px]">
                We compared Raw and ECN accounts
                based on spreads, round-turn
                commissions, execution conditions and
                platform support to identify the
                strongest scalping account offered by
                each broker.
              </p>

              {/* TRUST */}

              <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-extrabold text-slate-700">
                {[
                  "One selected account per broker",
                  "Full open-and-close trading cost",
                  "Independent editorial ranking",
                ].map((point) => (
                  <span
                    key={point}
                    className="inline-flex items-center gap-2"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[10px] text-emerald-700 ring-1 ring-emerald-100">
                      ✓
                    </span>

                    {point}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="#top-brokers"
                  className="inline-flex min-h-[44px] min-w-[178px] items-center justify-center rounded-xl bg-brand-600 px-6 text-[13px] font-black text-white shadow-[0_10px_23px_rgba(30,91,184,0.20)] transition hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  View the Ranking
                </a>

                <a
                  href="#methodology"
                  className="inline-flex min-h-[44px] min-w-[166px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-[13px] font-black text-slate-800 shadow-[0_7px_18px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
                >
                  How We Ranked Them
                </a>
              </div>
            </div>

            {/* STATS PANEL */}

            <aside className="rounded-[24px] border border-slate-200/90 bg-white/78 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.055)] backdrop-blur">
              <div className="mb-2 flex items-center justify-between px-2 py-1">
                <div>
                  <span className="block text-[10px] font-black text-brand-600">
                    Comparison overview
                  </span>

                  <span className="mt-0.5 block text-[13px] font-black text-slate-950">
                    Key figures from this guide
                  </span>
                </div>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-[15px] font-black text-brand-700 ring-1 ring-brand-100">
                  ✓
                </span>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-[18px] border border-slate-200 bg-white">
                {desktopStats.map((stat) => (
                  <div
                    key={stat.title}
                    className="flex min-h-[112px] flex-col items-center justify-center px-2 text-center"
                  >
                    <span className="text-[34px] font-black leading-none tracking-[-0.04em] text-brand-700">
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
                Rankings consider total cost,
                execution, platform support and
                regulatory strength—not brand
                recognition alone.
              </p>
            </aside>
          </div>

          {/* =================================================
              MOBILE + TABLET HERO
          ================================================== */}

          <div className="mx-auto mt-3 max-w-[620px] text-center lg:hidden">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex min-h-[28px] items-center gap-1.5 rounded-full border border-brand-100 bg-white/90 px-3 text-[9px] font-black text-brand-700 shadow-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[9px] text-white">
                  ✓
                </span>

                Independent review
              </span>

              <span className="inline-flex min-h-[28px] items-center rounded-full border border-slate-200 bg-white/90 px-3 text-[9px] font-black text-slate-600 shadow-sm">
                Updated July 2026
              </span>
            </div>

            <h1 className="mx-auto mt-3 max-w-[350px] text-[29px] font-black leading-[1.07] tracking-[-0.035em] text-[#07111f] sm:max-w-[600px] sm:text-[42px]">
              Best Forex Brokers

              <span className="mt-1 block text-brand-600">
                for Scalping in 2026
              </span>
            </h1>

            <p className="mx-auto mt-2 max-w-[330px] text-[10px] font-semibold leading-[1.7] text-slate-600 sm:max-w-[570px] sm:text-[14px] sm:leading-7">
              A comparison of leading Raw and ECN
              accounts based on costs, execution and
              the platforms active scalpers use.
            </p>

            {/* MOBILE TRUST */}

            <div className="mx-auto mt-2.5 grid max-w-[340px] grid-cols-2 gap-2">
              <div className="flex min-h-[35px] items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-white/85 px-2 text-[9px] font-black text-slate-700">
                <span className="text-emerald-600">
                  ✓
                </span>
                Selected account
              </div>

              <div className="flex min-h-[35px] items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-white/85 px-2 text-[9px] font-black text-slate-700">
                <span className="text-emerald-600">
                  ✓
                </span>
                Independent ranking
              </div>
            </div>

            {/* MOBILE ACTIONS */}

            <div className="mx-auto mt-3 grid max-w-[350px] grid-cols-[1.1fr_0.9fr] gap-2.5">
              <a
                href="#top-brokers"
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-600 px-4 text-[12px] font-black text-white shadow-[0_9px_20px_rgba(30,91,184,0.18)]"
              >
                View Ranking
              </a>

              <a
                href="#methodology"
                className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-[12px] font-black text-slate-800 shadow-sm"
              >
                Our Method
              </a>
            </div>

            {/* MOBILE STATS */}

            <div className="mx-auto mt-3.5 grid max-w-[350px] grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-[15px] border border-slate-200 bg-white/90 shadow-[0_7px_18px_rgba(15,23,42,0.04)]">
              {mobileStats.map(
                ([value, label]) => (
                  <div
                    key={label}
                    className="flex min-h-[56px] flex-col items-center justify-center px-2"
                  >
                    <span className="text-[18px] font-black leading-none text-brand-700">
                      {value}
                    </span>

                    <span className="mt-1.5 text-[8px] font-bold text-slate-500">
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1520px] px-3 pb-4 pt-3 sm:px-6 sm:pb-7 sm:pt-6 lg:px-8">
        {/* =====================================================
            QUICK PICKS — FINAL THREE BROKERS
        ====================================================== */}

        <section className="pt-1">
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
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-brand-600 text-[16px] font-black text-white shadow-[0_8px_20px_rgba(30,91,184,0.19)] sm:h-12 sm:w-12 sm:text-[18px]">
                    ✓
                  </span>

                  <div>
                    <span className="block text-[9px] font-black text-brand-600 sm:text-[10px]">
                      Quick decision
                    </span>

                    <h2 className="mt-0.5 text-[20px] font-black leading-[1.2] tracking-[-0.025em] text-slate-950 sm:text-[27px]">
                      Choose a broker by priority
                    </h2>

                    <p className="mt-1 text-[10px] font-semibold leading-5 text-slate-600 sm:text-[11px]">
                      Three standout choices before
                      you explore the full ranking.
                    </p>
                  </div>
                </div>

                <a
                  href="#top-brokers"
                  className="inline-flex min-h-[37px] w-fit shrink-0 self-start items-center justify-center rounded-xl border border-brand-100 bg-white px-4 text-[10px] font-black text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-50 sm:min-h-[40px] sm:self-auto sm:px-5 sm:text-[11px]"
                >
                  View Full Ranking
                </a>
              </div>
            </div>

            {/* CARDS */}

            {topThree.length > 0 && (
              <div className="grid md:grid-cols-3 md:divide-x md:divide-slate-200">
                {topThree.map((item) => {
                  if (!item.broker) return null;

                  const editorial = getEditorial(
                    item.broker.slug
                  );

                  if (!editorial) return null;

                  const isFirst =
                    editorial.rank === 1;

                  return (
                    <article
                      key={item.id}
                      className={`group relative flex min-w-0 flex-col border-b border-slate-200 px-4 pb-4 pt-4 transition last:border-b-0 hover:bg-brand-50/20 md:border-b-0 sm:px-5 sm:pb-5 sm:pt-5 ${
                        isFirst
                          ? "bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_65%)]"
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

                      {/* RANK + SCORE */}

                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex min-h-[28px] items-center gap-2 rounded-full px-3 text-[9px] font-black ring-1 sm:min-h-[30px] sm:text-[10px] ${
                            isFirst
                              ? "bg-amber-50 text-amber-800 ring-amber-200"
                              : "bg-brand-50 text-brand-700 ring-brand-100"
                          }`}
                        >
                          <span
                            className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[8px] text-white sm:h-6 sm:min-w-6 sm:text-[9px] ${
                              isFirst
                                ? "bg-amber-500"
                                : "bg-brand-600"
                            }`}
                          >
                            {editorial.rank}
                          </span>

                          {isFirst
                            ? "First place"
                            : `Rank ${editorial.rank}`}
                        </span>

                        <span className="inline-flex min-h-[28px] items-center rounded-full bg-slate-50 px-3 text-[10px] font-black text-slate-800 ring-1 ring-slate-200">
                          {formatScore(
                            editorial.score
                          )}
                          /10
                        </span>
                      </div>

                      {/* IDENTITY */}

                      <div className="mt-3.5 grid grid-cols-[98px_minmax(0,1fr)] items-center gap-3.5 sm:mt-4 sm:grid-cols-[118px_minmax(0,1fr)] sm:gap-4">
                        <BrokerLogo
                          broker={item.broker}
                          size="medium"
                        />

                        <div className="min-w-0">
                          <span className="block text-[9px] font-black text-brand-600 sm:text-[10px]">
                            {editorial.shortAward}
                          </span>

                          <Link
                            href={`/en/brokers/${item.broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block truncate text-[18px] font-black tracking-[-0.02em] text-slate-950 transition hover:text-brand-700 sm:text-[19px]"
                          >
                            {item.broker.name}
                          </Link>

                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            {accountPageHref(
                              item.broker.slug,
                              item.account_name
                            ) ? (
                              <Link
                                href={
                                  accountPageHref(
                                    item.broker.slug,
                                    item.account_name
                                  )!
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View the ${normalizeText(
                                  item.account_name
                                )} account from ${
                                  item.broker.name
                                }`}
                                className="inline-flex min-h-[23px] max-w-full items-center rounded-full bg-slate-100 px-2.5 text-[9px] font-black text-brand-700 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200"
                              >
                                <span className="truncate">
                                  {normalizeText(
                                    item.account_name
                                  )}
                                </span>
                              </Link>
                            ) : (
                              <span className="inline-flex min-h-[23px] max-w-full items-center rounded-full bg-slate-100 px-2.5 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
                                <span className="truncate">
                                  {normalizeText(
                                    item.account_name
                                  )}
                                </span>
                              </span>
                            )}

                            <span className="inline-flex min-h-[23px] items-center rounded-full bg-brand-50 px-2.5 text-[8px] font-black text-brand-700 ring-1 ring-brand-100 sm:text-[9px]">
                              Selected account
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RECOMMENDATION */}

                      <div className="mt-3 flex-1 rounded-[14px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-3.5 py-2.5 shadow-[0_4px_12px_rgba(15,23,42,0.025)] sm:mt-4 sm:px-4 sm:py-3.5">
                        <span className="flex items-center gap-2 text-[9px] font-black text-brand-700 sm:text-[10px]">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-[10px] ring-1 ring-brand-100">
                            ✓
                          </span>

                          Why we recommend it
                        </span>

                        <p className="mt-1.5 line-clamp-2 min-h-[42px] text-[10.5px] font-semibold leading-[1.8] text-slate-700 sm:line-clamp-3 sm:min-h-[60px] sm:text-[12px] sm:leading-6">
                          {editorial.verdict}
                        </p>
                      </div>

                      {/* CTA */}

                      <a
                        href={`#broker-${item.broker.slug}`}
                        className="mt-3.5 inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_7px_16px_rgba(30,91,184,0.16)] transition hover:-translate-y-0.5 hover:bg-brand-700 sm:mt-4 sm:min-h-[42px] sm:text-[12px]"
                      >
                        View Broker Details
                        <span aria-hidden="true">
                          ↓
                        </span>
                      </a>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            SCALPING INTRO — RESPONSIVE SECTION
        ====================================================== */}

        <section className="pt-5 sm:pt-7">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.055)] sm:rounded-[30px]">
            {/* =================================================
                MOBILE
            ================================================== */}

            <div className="sm:hidden">
              {/* INTRO */}

              <article className="px-4 pb-4 pt-4">
                <div className="flex justify-start">
                  <span className="inline-flex min-h-[27px] items-center rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-3 text-[9px] font-black text-[#1E5BB8]">
                    Essential context before comparing
                  </span>
                </div>

                <h2 className="mt-3 text-left text-[25px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950">
                  What is scalping

                  <span className="block text-[#1E5BB8]">
                    in forex trading?
                  </span>
                </h2>

                <p className="mt-3 text-left text-[11.5px] font-semibold leading-7 text-slate-700">
                  Forex scalping is a short-term
                  trading style built around opening
                  and closing positions quickly to
                  capture relatively small price
                  movements.
                </p>

                <p className="mt-1.5 text-left text-[11.5px] font-semibold leading-7 text-slate-700">
                  Because positions may remain open
                  for only seconds or minutes, spreads,
                  commissions, slippage and platform
                  stability can have a major effect on
                  results.
                </p>

                {/* MOBILE FACTS */}

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="flex min-h-[112px] min-w-0 flex-col rounded-[15px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[9px] font-black text-[#1E5BB8]">
                      1
                    </span>

                    <h3 className="mt-2 text-[9px] font-black leading-5 text-slate-950">
                      Trade duration
                    </h3>

                    <p className="mt-1 text-[8.5px] font-semibold leading-5 text-slate-600">
                      Often seconds or minutes.
                    </p>
                  </div>

                  <div className="flex min-h-[112px] min-w-0 flex-col rounded-[15px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[9px] font-black text-[#1E5BB8]">
                      2
                    </span>

                    <h3 className="mt-2 text-[9px] font-black leading-5 text-slate-950">
                      Trade frequency
                    </h3>

                    <p className="mt-1 text-[8.5px] font-semibold leading-5 text-slate-600">
                      Usually higher than day trading.
                    </p>
                  </div>

                  <div className="flex min-h-[112px] min-w-0 flex-col rounded-[15px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[9px] font-black text-[#1E5BB8]">
                      3
                    </span>

                    <h3 className="mt-2 text-[9px] font-black leading-5 text-slate-950">
                      Main priority
                    </h3>

                    <p className="mt-1 text-[8.5px] font-semibold leading-5 text-slate-600">
                      Cost and execution quality.
                    </p>
                  </div>
                </div>
              </article>

              {/* MOBILE COMPARISON */}

              <aside className="border-t border-slate-200 bg-[linear-gradient(180deg,#F8FBFF_0%,#EDF4FD_100%)] px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[8px] font-black text-[#1E5BB8]">
                      The key difference
                    </span>

                    <h3 className="mt-0.5 text-[16px] font-black leading-6 text-slate-950">
                      Scalping vs. day trading
                    </h3>
                  </div>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#C9DDF8] bg-white text-[12px] font-black text-[#1E5BB8] shadow-sm">
                    ↔
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {/* SCALPING */}

                  <div className="rounded-[14px] border border-[#6EA3E8] bg-white p-3 shadow-[0_7px_18px_rgba(30,91,184,0.09)]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black text-[#1E5BB8]">
                        Scalping
                      </span>

                      <span className="rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-2 py-1 text-[7px] font-black text-[#1E5BB8]">
                        Faster
                      </span>
                    </div>

                    <p className="mt-2 text-[9px] font-semibold leading-5 text-slate-600">
                      More trades and greater
                      sensitivity to spreads,
                      commissions and slippage.
                    </p>
                  </div>

                  {/* DAY TRADING */}

                  <div className="rounded-[14px] border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black text-slate-900">
                        Day trading
                      </span>

                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[7px] font-black text-slate-600">
                        Longer
                      </span>
                    </div>

                    <p className="mt-2 text-[9px] font-semibold leading-5 text-slate-600">
                      Fewer trades that may remain
                      open for several hours.
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            {/* =================================================
                TABLET + DESKTOP
            ================================================== */}

            <div className="hidden sm:grid sm:grid-cols-[minmax(0,1fr)_330px] lg:grid-cols-[minmax(0,1fr)_370px] xl:grid-cols-[minmax(0,1fr)_410px]">
              {/* MAIN CONTENT */}

              <article className="flex min-w-0 flex-col justify-center px-6 py-6 lg:px-8 lg:py-7 xl:px-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex min-h-[28px] items-center rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-3.5 text-[9px] font-black text-[#1E5BB8]">
                    Beginner-friendly explanation
                  </span>

                  <span className="inline-flex min-h-[28px] items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 text-[9px] font-black text-slate-600">
                    Before choosing a scalping broker
                  </span>
                </div>

                <h2 className="mt-4 max-w-[850px] text-[31px] font-black leading-[1.15] tracking-[-0.03em] text-slate-950 lg:text-[37px] xl:text-[40px]">
                  What is forex scalping?
                </h2>

                <p className="mt-3 max-w-[980px] text-[13px] font-semibold leading-7 text-slate-700 lg:text-[14px] lg:leading-8">
                  Forex scalping is a short-term
                  trading approach that involves
                  opening and closing a relatively
                  large number of positions to target
                  small market movements. Individual
                  trades may remain open for only
                  seconds or minutes.
                </p>

                <p className="mt-1.5 max-w-[980px] text-[13px] font-semibold leading-7 text-slate-700 lg:text-[14px] lg:leading-8">
                  This means a broker should not be
                  judged only by its advertised
                  minimum spread. Commission,
                  execution quality, slippage,
                  platform reliability and scalping
                  rules all contribute to the real
                  trading experience.
                </p>

                {/* DESKTOP FACTS */}

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-[16px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.03)]">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[12px] font-black text-slate-950">
                        Trade duration
                      </h3>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[10px] font-black text-[#1E5BB8]">
                        1
                      </span>
                    </div>

                    <p className="mt-1.5 text-[11px] font-semibold leading-6 text-slate-600">
                      Positions are normally much
                      shorter than day or swing
                      trades.
                    </p>
                  </div>

                  <div className="rounded-[16px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.03)]">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[12px] font-black text-slate-950">
                        Trade frequency
                      </h3>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[10px] font-black text-[#1E5BB8]">
                        2
                      </span>
                    </div>

                    <p className="mt-1.5 text-[11px] font-semibold leading-6 text-slate-600">
                      A high number of trades can
                      cause spreads and commissions
                      to accumulate quickly.
                    </p>
                  </div>

                  <div className="rounded-[16px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.03)]">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[12px] font-black text-slate-950">
                        Most important factor
                      </h3>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#C9DDF8] bg-[#F2F7FE] text-[10px] font-black text-[#1E5BB8]">
                        3
                      </span>
                    </div>

                    <p className="mt-1.5 text-[11px] font-semibold leading-6 text-slate-600">
                      The real all-in cost and
                      execution quality—not the
                      headline spread alone.
                    </p>
                  </div>
                </div>
              </article>

              {/* DESKTOP COMPARISON */}

              <aside className="border-l border-slate-200 bg-[linear-gradient(180deg,#F8FBFF_0%,#EDF4FD_100%)] px-6 py-6 lg:px-7 lg:py-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[9px] font-black text-[#1E5BB8]">
                      Quick comparison
                    </span>

                    <h3 className="mt-1 text-[20px] font-black leading-7 tracking-[-0.02em] text-slate-950">
                      Scalping or day trading?
                    </h3>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[#C9DDF8] bg-white text-[15px] font-black text-[#1E5BB8] shadow-sm">
                    ↔
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-[16px] border border-[#6EA3E8] bg-white p-4 shadow-[0_8px_22px_rgba(30,91,184,0.09)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] font-black text-[#1E5BB8]">
                        Forex scalping
                      </span>

                      <span className="rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-2.5 py-1 text-[8px] font-black text-[#1E5BB8]">
                        Faster
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] font-semibold leading-6 text-slate-600">
                      More frequent trades with
                      stronger sensitivity to spreads,
                      commission and execution speed.
                    </p>
                  </div>

                  <div className="rounded-[16px] border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] font-black text-slate-900">
                        Day trading
                      </span>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[8px] font-black text-slate-600">
                        Longer
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] font-semibold leading-6 text-slate-600">
                      Fewer positions that may remain
                      open for minutes or several
                      hours during the same trading
                      day.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
            {/* =====================================================
    TOP BROKERS — FINAL PREMIUM SECTION
====================================================== */}
<section
  id="top-brokers"
  className="scroll-mt-24 pt-5 sm:pt-7"
>
  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
  {/* =================================================
    SECTION HEADER — MOBILE + DESKTOP
================================================== */}
<div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_55%,#eaf2fc_100%)]">
  {/* BACKGROUND */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
  >
    <div className="absolute -right-24 -top-28 h-[260px] w-[260px] rounded-full bg-brand-100/70 blur-[85px]" />

    <div className="absolute -left-24 bottom-[-130px] h-[240px] w-[240px] rounded-full bg-blue-100/50 blur-[90px]" />
  </div>

  {/* =============================================
      MOBILE HEADER
  ============================================== */}
  <div className="relative px-4 pb-4 pt-4 text-left sm:hidden">
    {/* BADGES */}
    <div className="flex flex-wrap items-center justify-start gap-1.5">
      <span className="inline-flex min-h-[27px] items-center rounded-full bg-white px-3 text-[9px] font-black text-brand-700 shadow-sm ring-1 ring-brand-100">
        Broker Al Arab Ranking 2026
      </span>

      <span className="inline-flex min-h-[27px] items-center rounded-full bg-white/90 px-3 text-[9px] font-black text-slate-600 shadow-sm ring-1 ring-slate-200">
        {totalAccounts} Raw and ECN Accounts
      </span>
    </div>

    {/* TITLE */}
    <h2 className="mt-3 text-left text-[25px] font-black leading-[1.15] tracking-[-0.04em] text-slate-950">
      Top {totalBrokers} Forex Brokers

      <span className="block text-brand-700">
        for Scalping
      </span>
    </h2>

    {/* DESCRIPTION */}
    <p className="mt-2 text-left text-[11px] leading-7 text-slate-600">
      We selected one account from each broker and compared costs,
      execution and platform support to identify the strongest
      scalping options.
    </p>

    {/* MOBILE TRUST POINTS */}
    <div className="mt-3 flex flex-col gap-2">
      <span className="inline-flex min-h-[35px] items-center justify-start gap-2 rounded-xl bg-white/85 px-2.5 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
          ✓
        </span>

        Selected account
      </span>

      <span className="inline-flex min-h-[35px] items-center justify-start gap-2 rounded-xl bg-white/85 px-2.5 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
          ✓
        </span>

        Cost comparison
      </span>

      <span className="col-span-2 inline-flex min-h-[35px] items-center justify-start gap-2 rounded-xl bg-white/85 px-2.5 text-[9px] font-black text-slate-700 ring-1 ring-slate-200">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
          ✓
        </span>

        Independent editorial ranking
      </span>
    </div>

    {/* METHODOLOGY BUTTON */}
    <div className="mt-4">
      <a
        href="#methodology"
        className="inline-flex min-h-[39px] w-fit items-center justify-center rounded-xl bg-white px-5 text-[10px] font-black text-brand-700 shadow-[0_6px_16px_rgba(15,23,42,0.06)] ring-1 ring-brand-100 transition hover:bg-brand-50"
      >
        View Our Methodology
      </a>
    </div>
  </div>

  {/* =============================================
      TABLET + DESKTOP HEADER
  ============================================== */}
  <div className="relative hidden px-6 py-6 sm:block lg:px-8 lg:py-7">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-[1050px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-[30px] items-center rounded-full bg-white px-3.5 text-[11px] font-black text-brand-700 shadow-sm ring-1 ring-brand-100 sm:text-[12px]">
            Broker Al Arab 2026 Ranking
          </span>

          <span className="inline-flex min-h-[30px] items-center rounded-full bg-white/80 px-3.5 text-[10px] font-black text-slate-600 ring-1 ring-slate-200 sm:text-[11px]">
            {totalAccounts} Raw and ECN Accounts
          </span>
        </div>

        <h2 className="mt-4 text-[38px] font-black leading-[1.2] tracking-[-0.03em] text-slate-950 lg:text-[42px]">
          Top {totalBrokers} Forex Brokers for Scalping
        </h2>

        <p className="mt-3 max-w-[980px] text-[15px] font-semibold leading-8 text-slate-700">
          We selected one account from each broker, then compared
          trading costs, execution type, platforms, scalping policies,
          automated-trading support and regulatory strength. Open the
          analysis inside each card to see the reasoning behind every
          position.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-extrabold text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-black text-emerald-700">
              ✓
            </span>

            One selected account per broker
          </span>

          <span className="inline-flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-black text-emerald-700">
              ✓
            </span>

            All-in cost comparison
          </span>

          <span className="inline-flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-black text-emerald-700">
              ✓
            </span>

            Independent editorial ranking
          </span>
        </div>
      </div>

      <a
        href="#methodology"
        className="inline-flex min-h-[46px] w-fit shrink-0 items-center justify-center self-start rounded-xl bg-brand-600 px-6 text-[12px] font-black text-white shadow-[0_10px_24px_rgba(30,91,184,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-700 lg:-translate-y-2 lg:self-center"
      >
        View Our Methodology
      </a>
    </div>
  </div>
</div>

    {/* =================================================
        BROKERS LIST
    ================================================== */}
    <div className="bg-[#f4f7fb] p-2.5 sm:p-5 lg:p-6">
      {brokers.length === 0 ? (
        <div className="rounded-[22px] bg-amber-50 p-7 text-center ring-1 ring-amber-200">
          <h3 className="text-[19px] font-black text-amber-950">
            No scalping accounts were found
          </h3>

          <p className="mt-2 text-[13px] font-bold leading-7 text-amber-800">
            Make sure
            <span
              dir="ltr"
              className="mx-1 inline-block font-black"
            >
              is_best_for_scalping
            </span>
            is enabled for the required accounts.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-5">
          {brokers.map((item) => {
            if (!item.broker) return null;

            const editorial = getEditorial(
              item.broker.slug
            );

            if (!editorial) return null;

            const platforms = splitValues(
              item.broker.platforms,
              5
            );

            const regulators = splitValues(
              item.broker.regulation_short ||
                item.broker.regulation,
              4
            );

            return (
              <article
                key={item.id}
                id={`broker-${item.broker.slug}`}
                className={`group scroll-mt-24 overflow-hidden rounded-[22px] bg-white shadow-[0_8px_26px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)] sm:rounded-[26px] ${
                  editorial.rank === 1
                    ? "ring-1 ring-brand-200"
                    : "ring-1 ring-slate-200"
                }`}
              >
                {editorial.rank === 1 && (
                  <div className="h-[3px] bg-gradient-to-r from-brand-600 via-brand-400 to-brand-200" />
                )}

                {/* =============================================
                    MOBILE CARD — COMPACT ACCORDION
                ============================================== */}

                <div className="lg:hidden">
                  <details className="group/mobile">
                    {/* =========================================
                        CLOSED CARD SUMMARY
                    ========================================== */}

                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <div
                        className={`relative overflow-hidden px-3.5 pb-3.5 pt-3.5 ${
                          editorial.rank === 1
                            ? "bg-[linear-gradient(135deg,#f6f9ff_0%,#ffffff_72%)]"
                            : "bg-white"
                        }`}
                      >
                        {/* TOP ACCENT */}

                        <div
                          aria-hidden="true"
                          className={`absolute inset-x-0 top-0 h-[3px] ${
                            editorial.rank === 1
                              ? "bg-gradient-to-r from-amber-400 via-brand-600 to-brand-300"
                              : "bg-gradient-to-r from-brand-600 via-brand-400 to-brand-100"
                          }`}
                        />

                        {/* RANK + SCORE */}

                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`inline-flex min-h-[27px] items-center gap-2 rounded-full px-2.5 text-[9px] font-black ring-1 ${
                              editorial.rank === 1
                                ? "bg-amber-50 text-amber-800 ring-amber-200"
                                : "bg-brand-50 text-brand-700 ring-brand-100"
                            }`}
                          >
                            <span
                              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[8px] text-white ${
                                editorial.rank === 1
                                  ? "bg-amber-500"
                                  : "bg-brand-600"
                              }`}
                            >
                              {editorial.rank}
                            </span>

                            {editorial.rank === 1
                              ? "First place"
                              : `Rank ${editorial.rank}`}
                          </span>

                          <span
                            dir="ltr"
                            className="inline-flex min-h-[27px] items-center rounded-full bg-slate-50 px-2.5 text-[9px] font-black text-slate-800 ring-1 ring-slate-200"
                          >
                            {formatScore(editorial.score)}
                            /10
                          </span>
                        </div>

                        {/* BROKER IDENTITY */}

                        <div className="mt-3 grid grid-cols-[84px_minmax(0,1fr)] items-center gap-3">
                          <BrokerLogo
                            broker={item.broker}
                            size="small"
                          />

                          <div className="min-w-0">
                            <span className="block text-[8px] font-black text-brand-600">
                              {editorial.shortAward}
                            </span>

                            <h3 className="mt-0.5 truncate text-[17px] font-black tracking-[-0.02em] text-slate-950">
                              {item.broker.name}
                            </h3>

                            <div className="mt-1.5 flex items-center gap-2">
                              {renderStars(
                                item.broker.rating
                              )}

                              <span
                                dir="ltr"
                                className="text-[9px] font-black text-slate-600"
                              >
                                {formatRating(
                                  item.broker.rating
                                )}
                                /5
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* VERDICT */}

                        <div className="mt-3 rounded-[13px] bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200">
                          <p className="line-clamp-2 text-[10px] font-semibold leading-5 text-slate-700">
                            {editorial.verdict}
                          </p>
                        </div>

                        {/* QUICK FACTS */}

                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="min-w-0 rounded-[12px] bg-white px-2.5 py-2.5 shadow-sm ring-1 ring-slate-200">
                            <span className="block text-[8px] font-bold text-slate-500">
                              Account
                            </span>

                            {accountPageHref(
                              item.broker.slug,
                              item.account_name
                            ) ? (
                              <Link
                                href={
                                  accountPageHref(
                                    item.broker.slug,
                                    item.account_name
                                  )!
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                dir="ltr"
                                aria-label={`View the ${normalizeText(
                                  item.account_name
                                )} account from ${
                                  item.broker.name
                                }`}
                                className="mt-1.5 block max-w-full truncate text-[11px] font-black leading-none text-brand-700 underline-offset-2 transition hover:text-brand-900 hover:underline"
                              >
                                {normalizeText(
                                  item.account_name
                                )}
                              </Link>
                            ) : (
                              <span
                                dir="ltr"
                                className="mt-1.5 block truncate text-[11px] font-black leading-none text-slate-950"
                              >
                                {normalizeText(
                                  item.account_name
                                )}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 rounded-[12px] bg-white px-2.5 py-2.5 shadow-sm ring-1 ring-slate-200">
                            <span className="block text-[8px] font-bold text-slate-500">
                              Spread
                            </span>

                            <span
                              dir="ltr"
                              className="mt-1.5 block truncate text-[11px] font-black leading-none text-slate-950"
                            >
                              {accountSpread(item)}
                            </span>
                          </div>

                          <div className="min-w-0 rounded-[12px] bg-white px-2.5 py-2.5 shadow-sm ring-1 ring-slate-200">
                            <span className="block text-[8px] font-bold text-slate-500">
                              Commission
                            </span>

                            <span
                              dir="ltr"
                              className="mt-1.5 block truncate text-[11px] font-black leading-none text-slate-950"
                            >
                              {accountCommission(item)}
                            </span>
                          </div>
                        </div>

                        {/* OPEN INDICATOR */}

                        <div className="mt-3 flex min-h-[37px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 text-[10px] font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.14)]">
                          <span>View details</span>

                          <span className="text-[15px] transition group-open/mobile:rotate-45">
                            +
                          </span>
                        </div>
                      </div>
                    </summary>

                    {/* =========================================
                        OPENED MOBILE CONTENT
                    ========================================== */}

                    <div className="border-t border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]">
                      {/* ACCOUNT DETAILS */}

                      <div className="grid grid-cols-2 gap-2 px-3.5 pt-3.5">
                        <div className="rounded-[13px] bg-white px-3 py-2.5 ring-1 ring-slate-200">
                          <span className="block text-[8px] font-bold text-slate-500">
                            Execution type
                          </span>

                          <span className="mt-1 block text-[10.5px] font-black text-slate-950">
                            {normalizeText(
                              item.execution_type
                            )}
                          </span>
                        </div>

                        <div className="rounded-[13px] bg-white px-3 py-2.5 ring-1 ring-slate-200">
                          <span className="block text-[8px] font-bold text-slate-500">
                            Minimum deposit
                          </span>

                          <span
                            dir="ltr"
                            className="mt-1 block text-[10.5px] font-black text-slate-950"
                          >
                            {accountDeposit(item)}
                          </span>
                        </div>
                      </div>

                      {/* PLATFORMS */}

                      <div className="px-3.5 pt-3.5">
                        <span className="text-[9px] font-black text-slate-600">
                          Platforms
                        </span>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {platforms.length > 0 ? (
                            platforms.map((platform) => (
                              <span
                                key={platform}
                                dir="ltr"
                                className="inline-flex min-h-[25px] items-center rounded-full bg-white px-2.5 text-[8.5px] font-black text-slate-700 ring-1 ring-slate-200"
                              >
                                {platform}
                              </span>
                            ))
                          ) : (
                            <span className="text-[9px] font-semibold text-slate-400">
                              Not specified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* REGULATION */}

                      <div className="px-3.5 pt-3.5">
                        <span className="text-[9px] font-black text-slate-600">
                          Key regulators
                        </span>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {regulators.length > 0 ? (
                            regulators.map((regulator) => (
                              <span
                                key={regulator}
                                dir="ltr"
                                className="inline-flex min-h-[25px] items-center rounded-full bg-white px-2.5 text-[8.5px] font-black text-slate-700 ring-1 ring-slate-200"
                              >
                                {regulator}
                              </span>
                            ))
                          ) : (
                            <span className="text-[9px] font-semibold text-slate-400">
                              Not specified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* WHY SELECTED */}

                      <div className="px-3.5 pt-3.5">
                        <div className="rounded-[14px] bg-white p-3 ring-1 ring-emerald-100">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[10px] font-black text-emerald-800">
                              Why it made the list
                            </span>

                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black text-emerald-700">
                              Top three strengths
                            </span>
                          </div>

                          <ul className="mt-2.5 space-y-2">
                            {editorial.whySelected
                              .slice(0, 3)
                              .map((reason) => (
                                <li
                                  key={reason}
                                  className="flex items-start gap-2 text-[10px] font-semibold leading-5 text-slate-700"
                                >
                                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[8px] font-black text-emerald-700">
                                    ✓
                                  </span>

                                  <span>{reason}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      {/* WARNING */}

                      <div className="mx-3.5 mt-3.5 overflow-hidden rounded-[14px] bg-white ring-1 ring-amber-200">
                        <div className="flex items-center gap-2 border-b border-amber-200/70 bg-amber-50/80 px-3 py-2.5">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-[9px] font-black text-amber-900">
                            !
                          </span>

                          <span className="text-[10px] font-black text-amber-950">
                            One drawback to know
                          </span>
                        </div>

                        <p className="px-3 py-3 text-[10.5px] font-semibold leading-6 text-slate-700">
                          {editorial.warning}
                        </p>
                      </div>

                      {/* EDITORIAL ANALYSIS */}

                      <details className="group/analysis mx-3.5 mt-3.5 overflow-hidden rounded-[14px] bg-white ring-1 ring-brand-100">
                        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-2.5 [&::-webkit-details-marker]:hidden">
                          <div>
                            <span className="block text-[11px] font-black text-brand-700">
                              Full editorial analysis
                            </span>

                            <span className="mt-0.5 block text-[8px] font-semibold text-slate-500">
                              A detailed explanation of the ranking
                            </span>
                          </div>

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[14px] font-black text-white transition group-open/analysis:rotate-45">
                            +
                          </span>
                        </summary>

                        <div className="border-t border-brand-100 bg-brand-50/20 px-3.5 py-3.5">
                          <h4 className="text-[14px] font-black leading-6 text-slate-950">
                            Why did we rank{" "}
                            {item.broker.name} at number{" "}
                            {editorial.rank}?
                          </h4>

                          <div className="mt-2.5 space-y-2.5">
                            {editorial.reviewText.map(
                              (paragraph) => (
                                <p
                                  key={paragraph}
                                  className="text-[10.5px] font-semibold leading-6 text-slate-700"
                                >
                                  {paragraph}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      </details>

                      {/* ACTIONS */}

                      <div className="grid grid-cols-[1.15fr_0.85fr] gap-2.5 px-3.5 pb-3.5 pt-4">
                        <Link
                          href={`/en/brokers/${item.broker.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-600 px-3 text-[11px] font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.14)] transition hover:bg-brand-700"
                        >
                          Read Review
                        </Link>

                        {item.broker.real_account_url ? (
                          <a
                            href={`/go/${item.broker.slug}?type=real&source=scalping-page-en`}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-white px-3 text-[11px] font-black text-slate-700 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200"
                          >
                            Open Account
                          </a>
                        ) : (
                          <span className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-slate-50 px-3 text-[11px] font-black text-slate-400 ring-1 ring-slate-200">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </details>
                </div>
                                {/* =============================================
                    DESKTOP CARD
                ============================================== */}
                <div className="hidden lg:block">
                  <div className="grid min-h-[440px] grid-cols-[210px_minmax(0,1fr)_255px] xl:grid-cols-[220px_minmax(0,1fr)_270px]">
                    {/* BROKER IDENTITY */}
                    <aside className="h-full border-r border-slate-100 bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_100%)] px-5 py-6">
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <span className="inline-flex min-h-[28px] items-center justify-center rounded-full bg-brand-50 px-3 text-[10px] font-black text-brand-700 ring-1 ring-brand-100">
                          {editorial.rank === 1
                            ? "First place"
                            : `Rank ${editorial.rank}`}
                        </span>

                        <div className="mt-4">
                          <BrokerLogo
                            broker={item.broker}
                          />
                        </div>

                        <h3
                          dir="ltr"
                          className="mt-4 text-[22px] font-black tracking-[-0.025em] text-slate-950"
                        >
                          {item.broker.name}
                        </h3>

                        <div className="mt-2.5 flex items-center justify-center gap-2">
                          {renderStars(
                            item.broker.rating
                          )}

                          <span
                            dir="ltr"
                            className="text-[11px] font-black text-slate-700"
                          >
                            {formatRating(
                              item.broker.rating
                            )}
                            /5
                          </span>
                        </div>

                        <span className="mt-4 inline-flex min-h-[29px] max-w-[175px] items-center justify-center rounded-full bg-brand-50 px-3 text-[10px] font-black leading-5 text-brand-700 ring-1 ring-brand-100">
                          {editorial.shortAward}
                        </span>
                      </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="flex min-w-0 flex-col px-6 py-5 xl:px-7">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-black text-brand-600">
                            Why it ranks{" "}
                            {editorial.rank}?
                          </span>

                          <h4 className="mt-1.5 text-[24px] font-black leading-[1.3] tracking-[-0.02em] text-slate-950 xl:text-[26px]">
                            {editorial.award}
                          </h4>

                          <p className="mt-2.5 max-w-[900px] text-[13px] font-semibold leading-7 text-slate-700">
                            {editorial.verdict}
                          </p>
                        </div>

                        {/* SCORE — FINAL */}
                        <div
                          dir="ltr"
                          className="flex h-[94px] w-[100px] shrink-0 flex-col items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,#eaf3ff_0%,#ffffff_100%)] text-center shadow-[inset_0_0_0_1px_rgba(30,91,184,0.16),0_9px_22px_rgba(30,91,184,0.08)]"
                        >
                          <span className="text-[10px] font-black text-brand-700">
                            Scalping score
                          </span>

                          <span className="mt-1 text-[32px] font-black leading-none tracking-[-0.03em] text-slate-950">
                            {formatScore(
                              editorial.score
                            )}
                          </span>

                          <span className="mt-1 text-[10px] font-bold text-slate-600">
                            out of 10
                          </span>
                        </div>
                      </div>

                      {/* =================================================
                          ACCOUNT FACTS — FINAL
                      ================================================== */}
                      <div className="mt-5 grid grid-cols-4 gap-3">
                        {/* ACCOUNT */}
                        <div className="group/fact rounded-[15px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200">
                          <span className="block text-[11px] font-bold text-slate-600">
                            Selected account
                          </span>

                          {accountPageHref(
                            item.broker.slug,
                            item.account_name
                          ) ? (
                            <Link
                              href={
                                accountPageHref(
                                  item.broker.slug,
                                  item.account_name
                                )!
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              dir="ltr"
                              aria-label={`View the ${normalizeText(
                                item.account_name
                              )} account from ${
                                item.broker.name
                              }`}
                              className="mt-1.5 inline-flex max-w-full items-center gap-1 text-[14px] font-black text-brand-700 underline-offset-2 transition hover:text-brand-900 hover:underline"
                            >
                              <span className="truncate">
                                {normalizeText(
                                  item.account_name
                                )}
                              </span>

                              <span
                                aria-hidden="true"
                                className="shrink-0 text-[11px]"
                              >
                                ↗
                              </span>
                            </Link>
                          ) : (
                            <span
                              dir="ltr"
                              className="mt-1.5 block truncate text-left text-[14px] font-black text-slate-950"
                            >
                              {normalizeText(
                                item.account_name
                              )}
                            </span>
                          )}
                        </div>

                        {/* SPREAD */}
                        <div className="group/fact rounded-[15px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200">
                          <span className="block text-[11px] font-bold text-slate-600">
                            Spread
                          </span>

                          <span
                            dir="ltr"
                            className="mt-1.5 block truncate text-left text-[13px] font-black text-slate-950"
                          >
                            {accountSpread(item)}
                          </span>
                        </div>

                        {/* COMMISSION */}
                        <div className="group/fact rounded-[15px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200">
                          <span className="block text-[11px] font-bold text-slate-600">
                            Commission
                          </span>

                          <span
                            dir="ltr"
                            className="mt-1.5 block truncate text-left text-[13px] font-black text-slate-950"
                          >
                            {accountCommission(item)}
                          </span>
                        </div>

                        {/* MINIMUM DEPOSIT */}
                        <div className="group/fact rounded-[15px] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.035)] ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200">
                          <span className="block text-[11px] font-bold text-slate-600">
                            Minimum deposit
                          </span>

                          <span
                            dir="ltr"
                            className="mt-1.5 block truncate text-left text-[13px] font-black text-slate-950"
                          >
                            {accountDeposit(item)}
                          </span>
                        </div>
                      </div>

                      {/* =================================================
                          SELECTION REASONS — CLEAR TYPOGRAPHY
                      ================================================== */}
                      <div className="mt-5">
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div>
                            <span className="block text-[13px] font-black text-slate-950">
                              Why we selected it
                            </span>

                            <span className="mt-0.5 block text-[11px] font-semibold text-slate-600">
                              The main strengths that
                              influenced its position
                            </span>
                          </div>

                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-600">
                            Account, platforms and cost
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {editorial.whySelected
                            .slice(0, 4)
                            .map((reason) => (
                              <div
                                key={reason}
                                className="flex min-h-[54px] items-center gap-3 rounded-[15px] bg-emerald-50/75 px-4 py-3 ring-1 ring-emerald-200/80"
                              >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[12px] font-black text-white shadow-[0_4px_10px_rgba(5,150,105,0.16)]">
                                  ✓
                                </span>

                                <span className="text-[13px] font-semibold leading-6 text-slate-800 xl:text-[14px]">
                                  {reason}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* =============================================
                          INLINE EDITORIAL ANALYSIS — BOTTOM ALIGNED
                      ============================================== */}
                      <details className="group/desktop-analysis mt-auto pt-5">
                        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <div className="flex min-h-[58px] w-full items-center justify-between gap-4 rounded-[17px] bg-white px-5 shadow-[0_7px_20px_rgba(15,23,42,0.05)] ring-1 ring-brand-100 transition hover:-translate-y-0.5 hover:bg-brand-50/50 hover:ring-brand-200">
                            <div className="flex min-w-0 items-center gap-3.5">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[18px] font-black text-white shadow-[0_6px_14px_rgba(30,91,184,0.18)] transition duration-200 group-open/desktop-analysis:rotate-45">
                                +
                              </span>

                              <div className="min-w-0">
                                <span className="block truncate text-[14px] font-black text-slate-950">
                                  Full editorial
                                  analysis of{" "}
                                  {item.broker.name}
                                </span>

                                <span className="mt-1 block text-[11px] font-semibold text-slate-600">
                                  Why the broker
                                  received rank{" "}
                                  {editorial.rank}?
                                </span>
                              </div>
                            </div>

                            <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-black text-brand-700 transition group-open/desktop-analysis:bg-brand-600 group-open/desktop-analysis:text-white">
                              <span className="group-open/desktop-analysis:hidden">
                                Read analysis
                              </span>

                              <span className="hidden group-open/desktop-analysis:inline">
                                Hide analysis
                              </span>
                            </span>
                          </div>
                        </summary>

                        <div className="mt-3 overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] shadow-[0_8px_24px_rgba(15,23,42,0.045)] ring-1 ring-brand-100">
                          <div className="p-5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex min-h-[27px] items-center rounded-full bg-brand-50 px-3 text-[10px] font-black text-brand-700 ring-1 ring-brand-100">
                                Broker Al Arab analysis
                              </span>

                              <span className="text-[10px] font-bold text-slate-500">
                                Independent editorial
                                review
                              </span>
                            </div>

                            <h5 className="mt-3 text-[20px] font-black leading-[1.4] tracking-[-0.02em] text-slate-950">
                              Why we ranked{" "}
                              {item.broker.name} at
                              number{" "}
                              {editorial.rank}?
                            </h5>

                            <div className="mt-4 space-y-3">
                              {editorial.reviewText.map(
                                (paragraph) => (
                                  <p
                                    key={paragraph}
                                    className="text-[13px] font-semibold leading-7 text-slate-700"
                                  >
                                    {paragraph}
                                  </p>
                                )
                              )}
                            </div>

                            <div className="mt-5 rounded-[15px] bg-amber-50/70 p-4 ring-1 ring-amber-200">
                              <span className="text-[11px] font-black text-amber-950">
                                Key point before
                                choosing
                              </span>

                              <p className="mt-2 text-[12px] font-semibold leading-7 text-slate-700">
                                {editorial.warning}
                              </p>
                            </div>

                            <Link
                              href={`/en/brokers/${item.broker.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-xl bg-brand-600 px-4 text-[11px] font-black text-white shadow-[0_6px_15px_rgba(30,91,184,0.16)] transition hover:-translate-y-0.5 hover:bg-brand-700"
                            >
                              Read the full{" "}
                              {item.broker.name} review
                            </Link>
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* =================================================
                        SUPPORTING INFO — FINAL
                    ================================================== */}
                    <aside className="h-full border-l border-slate-100 bg-[linear-gradient(180deg,#fbfdff_0%,#f7faff_100%)] px-5 py-6">
                      <div className="flex h-full flex-col">
                        {/* PLATFORMS */}
                        <div>
                          <span className="text-[12px] font-black text-slate-900">
                            Available platforms
                          </span>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {platforms.length > 0 ? (
                              platforms.map(
                                (platform) => (
                                  <span
                                    key={platform}
                                    dir="ltr"
                                    className="inline-flex min-h-[29px] items-center rounded-lg bg-brand-50 px-3 text-[10px] font-black text-brand-800 ring-1 ring-brand-100"
                                  >
                                    {platform}
                                  </span>
                                )
                              )
                            ) : (
                              <span className="text-[12px] font-bold text-slate-600">
                                Not specified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* REGULATORS */}
                        <div className="mt-5">
                          <span className="text-[12px] font-black text-slate-900">
                            Key regulators
                          </span>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {regulators.length > 0 ? (
                              regulators.map(
                                (regulator) => (
                                  <span
                                    key={regulator}
                                    dir="ltr"
                                    className="inline-flex min-h-[29px] items-center rounded-lg bg-white px-3 text-[10px] font-black text-slate-800 shadow-sm ring-1 ring-slate-200"
                                  >
                                    {regulator}
                                  </span>
                                )
                              )
                            ) : (
                              <span className="text-[12px] font-bold text-slate-600">
                                Not specified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* WARNING */}
                        <div className="mt-5 overflow-hidden rounded-[16px] bg-[#fffaf0] ring-1 ring-amber-200">
                          <div className="flex items-center gap-2.5 border-b border-amber-200/70 bg-amber-50/80 px-4 py-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[12px] font-black text-amber-900">
                              !
                            </span>

                            <div>
                              <span className="block text-[12px] font-black text-amber-950">
                                A drawback to know
                              </span>

                              <span className="mt-0.5 block text-[9px] font-semibold text-amber-800">
                                Important before
                                opening an account
                              </span>
                            </div>
                          </div>

                          <div className="px-4 py-3.5">
                            <p className="text-[12px] font-semibold leading-6 text-slate-800 xl:text-[13px]">
                              {editorial.warning}
                            </p>
                          </div>
                        </div>

                        {/* ACTIONS — OPEN ACCOUNT IS PRIMARY */}
                        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
                          {item.broker
                            .real_account_url ? (
                            <a
                              href={`/go/${item.broker.slug}?type=real&source=scalping-page-en`}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-brand-600 px-3 text-[11px] font-black text-white shadow-[0_6px_15px_rgba(30,91,184,0.17)] transition hover:-translate-y-0.5 hover:bg-brand-700"
                            >
                              Open Account
                            </a>
                          ) : (
                            <span className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-slate-100 px-3 text-[11px] font-black text-slate-400 ring-1 ring-slate-200">
                              Coming Soon
                            </span>
                          )}

                          <Link
                            href={`/en/brokers/${item.broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-white px-3 text-[11px] font-black text-brand-700 shadow-sm ring-1 ring-brand-200 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:ring-brand-300"
                          >
                            Full Review
                          </Link>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  </div>
</section>
{/* =====================================================
    SCALPING DECISION GUIDE — FOUR DISTINCT SECTIONS
====================================================== */}
<div className="space-y-5 pt-6 sm:space-y-7 sm:pt-9">
  {/* =====================================================
      1. BROKER SCALPING POLICY — CONNECTED CHECKLIST
  ====================================================== */}
  <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_100%)] px-4 py-5 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-[250px] w-[250px] rounded-full bg-[#D9E9FC] blur-[95px]"
      />

      <div className="relative">
        <span className="inline-flex min-h-[27px] items-center rounded-full border border-[#C9DDF8] bg-white px-3 text-[9px] font-black text-[#1E5BB8] shadow-sm sm:text-[10px]">
          Forex broker policies
        </span>

       <h2 className="mt-3 text-left text-[23px] font-black leading-[1.16] tracking-[-0.04em] text-slate-950 sm:text-[32px] lg:whitespace-nowrap lg:text-[36px] xl:text-[40px]">
  <span className="block lg:inline">
    Do all forex brokers
  </span>

  <span className="block text-[#1E5BB8] lg:ml-2 lg:inline">
    allow scalping?
  </span>
</h2>

        <p className="mt-3 max-w-[1080px] text-left text-[11.5px] font-semibold leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
          There is no single scalping policy across every broker. A broker may permit
          scalping in general while applying different conditions by account,
          platform and legal entity.
        </p>
      </div>
    </div>

    {/* MOBILE STEPS */}
    <div className="px-4 py-4 sm:hidden">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-5 left-[15px] top-5 w-px bg-[#C9DDF8]"
        />

        {[
          {
            number: "1",
            title: "Minimum trade duration",
            desc: "Check that there is no minimum holding period before a position can be closed.",
          },
          {
            number: "2",
            title: "High-frequency trading",
            desc: "Review any restrictions that apply to extremely fast automated trading.",
          },
          {
            number: "3",
            title: "Expert Advisors",
            desc: "Confirm that automated strategies are permitted on the selected account and platform.",
          },
          {
            number: "4",
            title: "Legal entity",
            desc: "Conditions and investor protection may vary by broker entity.",
          },
        ].map((item, index) => (
          <article
            key={item.number}
            className={`relative flex gap-3 ${
              index === 3 ? "" : "pb-4"
            }`}
          >
            <span className="relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border border-[#9FC2F0] bg-[#F2F7FE] text-[10px] font-black text-[#1E5BB8] shadow-[0_3px_10px_rgba(30,91,184,0.08)]">
              {item.number}
            </span>

            <div className="min-w-0 flex-1 pb-1">
              <h3 className="text-[12px] font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-1 text-[10.5px] font-semibold leading-6 text-slate-600">
                {item.desc}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-[15px] border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-[10.5px] font-semibold leading-6 text-amber-900">
          <span className="font-black">Before opening an account:</span>{" "}
          Read the terms of the specific account instead of relying only on a general “scalping allowed” statement.
        </p>
      </div>
    </div>

    {/* DESKTOP CONNECTED STEPS */}
    <div className="hidden px-6 py-6 sm:block">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-[20px] h-px bg-[#C9DDF8]"
        />

        <div className="relative grid grid-cols-4 gap-5">
          {[
            {
              number: "1",
              title: "Minimum trade duration",
              desc: "Check that there is no minimum holding period before a position can be closed.",
            },
            {
              number: "2",
              title: "High-frequency trading",
              desc: "Review the rules for extremely fast automated trading.",
            },
            {
              number: "3",
              title: "Expert Advisors",
              desc: "Confirm that automated strategies are supported on the selected account and platform.",
            },
            {
              number: "4",
              title: "Legal entity",
              desc: "Conditions and investor protection may vary by broker entity.",
            },
          ].map((item) => (
            <article
              key={item.number}
              className="relative text-center"
            >
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#9FC2F0] bg-white text-[11px] font-black text-[#1E5BB8] shadow-[0_5px_16px_rgba(30,91,184,0.10)]">
                {item.number}
              </span>

              <h3 className="mt-3 text-[12px] font-black text-slate-950 lg:text-[13px]">
                {item.title}
              </h3>

              <p className="mx-auto mt-1.5 max-w-[245px] text-[10.5px] font-semibold leading-6 text-slate-600 lg:text-[11px]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-[15px] border border-amber-200 bg-amber-50 px-4 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[12px] font-black text-amber-800">
          !
        </span>

        <p className="text-[11px] font-semibold leading-6 text-amber-900">
          <span className="font-black">Before opening an account:</span>{" "}
          Review the selected account terms and the legal entity under which you will register,
          rather than relying only on the broker’s general policy.
        </p>
      </div>
    </div>
  </section>

  {/* =====================================================
      2. ACCOUNT TYPES — FEATURED + STACKED COMPARISON
  ====================================================== */}
  <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    <div className="px-4 pb-4 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
      <span className="text-[9px] font-black text-[#1E5BB8] sm:text-[10px]">
        Trading account types
      </span>

      <h2 className="mt-2 text-left text-[26px] font-black leading-[1.18] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
        What is the best account type
        <span className="block text-[#1E5BB8] sm:inline">
          {" "}
          for scalping?
        </span>
      </h2>

      <p className="mt-3 max-w-[1080px] text-left text-[11.5px] font-semibold leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
        Choosing the broker is only part of the decision; you also need the right account.
        Compare spreads, commissions and execution rather than relying on the account
        name alone.
      </p>
    </div>

    <div className="border-t border-slate-200 p-4 sm:p-6">
      <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4">
        {/* FEATURED RAW */}
        {/* FEATURED RAW — CLICKABLE */}
<Link
  href="/en/best-brokers/accounts/raw-spread"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Open the Raw Spread account guide in a new tab"
  className="group relative block overflow-hidden rounded-[20px] border border-[#4F8EDC] bg-[linear-gradient(145deg,#F1F7FF_0%,#FFFFFF_72%)] p-4 shadow-[0_12px_30px_rgba(30,91,184,0.11)] transition duration-200 hover:-translate-y-1 hover:border-[#1E5BB8] hover:shadow-[0_18px_38px_rgba(30,91,184,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8] focus-visible:ring-offset-2 sm:p-6"
>
  {/* BLUE ACCENT */}
  <div className="absolute inset-y-0 left-0 w-[4px] bg-[#1E5BB8]" />

  {/* TOP */}
  <div className="relative flex flex-wrap items-center justify-between gap-3">
    <span className="inline-flex min-h-[28px] items-center rounded-full bg-[#1E5BB8] px-3 text-[9px] font-black text-white">
      Often best suited to active traders
    </span>

    <div className="flex items-center gap-2">
      <span
        dir="ltr"
        className="text-[10px] font-black text-[#1E5BB8]"
      >
        RAW
      </span>

      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9DDF8] bg-white text-[13px] font-black text-[#1E5BB8] shadow-sm transition group-hover:translate-x-1 group-hover:bg-[#1E5BB8] group-hover:text-white">
        ↗
      </span>
    </div>
  </div>

  {/* TITLE */}
  <div className="relative mt-4 flex flex-wrap items-center gap-2">
    <h3 className="text-[21px] font-black text-slate-950 transition group-hover:text-[#1E5BB8] sm:text-[25px]">
      Raw Spread account
    </h3>

    <span className="inline-flex min-h-[24px] items-center rounded-full border border-[#C9DDF8] bg-white px-2.5 text-[8px] font-black text-[#1E5BB8] opacity-90">
      View account guide
    </span>
  </div>

  {/* DESCRIPTION */}
  <p className="relative mt-2 max-w-[660px] text-[11.5px] font-semibold leading-7 text-slate-700 sm:text-[13px]">
    Offers tighter quoted spreads with a separate commission and can suit
    scalping when the commission is transparent and trade frequency is high.
  </p>

  {/* FEATURES */}
  <div className="relative mt-5 grid gap-2.5 sm:grid-cols-3">
    <div className="flex items-start gap-2">
      <span className="font-black text-emerald-600">✓</span>

      <div>
        <span className="block text-[10px] font-black text-slate-950">
          Tighter spreads
        </span>

        <span className="mt-0.5 block text-[9px] font-semibold leading-5 text-slate-600">
          Quoted spreads usually start from lower levels.
        </span>
      </div>
    </div>

    <div className="flex items-start gap-2">
      <span className="font-black text-emerald-600">✓</span>

      <div>
        <span className="block text-[10px] font-black text-slate-950">
          Comparable pricing
        </span>

        <span className="mt-0.5 block text-[9px] font-semibold leading-5 text-slate-600">
          When the full round-turn commission is known.
        </span>
      </div>
    </div>

    <div className="flex items-start gap-2">
      <span className="font-black text-amber-600">!</span>

      <div>
        <span className="block text-[10px] font-black text-slate-950">
          Not commission-free
        </span>

        <span className="mt-0.5 block text-[9px] font-semibold leading-5 text-slate-600">
          Spread and commission must be combined.
        </span>
      </div>
    </div>
  </div>

  {/* LINK HINT */}
  <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-[#C9DDF8] pt-3">
    <span className="text-[9.5px] font-black text-[#1E5BB8]">
      Read the Raw Spread account guide
    </span>

    <span className="text-[14px] font-black text-[#1E5BB8] transition group-hover:translate-x-1">
      →
    </span>
  </div>
</Link>

        {/* ECN + STANDARD STACK */}
        <div className="divide-y divide-slate-200 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          {/* ECN */}
          <article className="p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[8px] font-black text-[#1E5BB8]">
                  Verify the details
                </span>

                <h3 className="mt-1 text-[18px] font-black text-slate-950 sm:text-[20px]">
                  ECN account
                </h3>
              </div>

              <span
                dir="ltr"
                className="inline-flex min-h-[29px] items-center rounded-xl border border-[#C9DDF8] bg-[#F2F7FE] px-3 text-[10px] font-black text-[#1E5BB8]"
              >
                ECN
              </span>
            </div>

            <p className="mt-2 text-[10.5px] font-semibold leading-6 text-slate-600 sm:text-[11px]">
              The term may indicate lower-cost pricing and market-style execution, but some brokers
              use it as a marketing label. Verify the actual commission and execution model.
            </p>
          </article>

         {/* STANDARD — CLICKABLE */}
<Link
  href="/en/best-brokers/accounts/standard"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Open the Standard account guide in a new tab"
  className="group relative block p-4 transition hover:bg-[#F5F9FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1E5BB8] sm:p-5"
>
  <div className="flex flex-wrap items-start justify-between gap-3">
    <div className="min-w-0">
      <span className="text-[8px] font-black text-slate-500">
        Simpler for beginners
      </span>

      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h3 className="text-[18px] font-black text-slate-950 transition group-hover:text-[#1E5BB8] sm:text-[20px]">
          Standard account
        </h3>

        <span className="inline-flex min-h-[23px] items-center rounded-full border border-[#C9DDF8] bg-[#F2F7FE] px-2.5 text-[8px] font-black text-[#1E5BB8]">
          View account guide
        </span>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <span
        dir="ltr"
        className="inline-flex min-h-[29px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] font-black text-slate-700 transition group-hover:border-[#9FC2F0] group-hover:bg-white group-hover:text-[#1E5BB8]"
      >
        Standard
      </span>

      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9DDF8] bg-white text-[12px] font-black text-[#1E5BB8] shadow-sm transition group-hover:translate-x-1 group-hover:bg-[#1E5BB8] group-hover:text-white">
        ↗
      </span>
    </div>
  </div>

  <p className="mt-2 text-[10.5px] font-semibold leading-6 text-slate-600 sm:text-[11px]">
    A separate commission is often absent, but the spread is wider. This may suit
    lower-frequency traders who prefer a simpler pricing structure.
  </p>

  <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
    <span className="text-[9px] font-black text-[#1E5BB8]">
      Read the Standard account guide
    </span>

    <span className="text-[13px] font-black text-[#1E5BB8] transition group-hover:translate-x-1">
      →
    </span>
  </div>
</Link>
        </div>
      </div>

      {/* ACCOUNT DECISION BAR */}
      <div className="mt-4 flex flex-col gap-2 rounded-[16px] border border-[#C9DDF8] bg-[#F2F7FE] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-[10px] font-black text-[#1E5BB8]">
            Decision rule
          </span>

          <p className="mt-0.5 text-[10.5px] font-semibold leading-6 text-slate-700 sm:text-[11px]">
            Compare the total cost of a trade—not the advertised spread alone.
          </p>
        </div>

        <span className="shrink-0 text-[9px] font-black text-slate-600">
          Spread + commission + slippage
        </span>
      </div>
    </div>
  </section>

  {/* =====================================================
    3. PLATFORMS — COMPACT RESPONSIVE COMPARISON
====================================================== */}
<section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
  {/* =================================================
      MOBILE
  ================================================== */}
  <div className="lg:hidden">
    {/* MOBILE HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#EDF5FF_0%,#F8FBFF_100%)] px-4 pb-3.5 pt-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 h-[210px] w-[210px] rounded-full bg-[#D9E9FC] blur-[80px]"
      />

      <div className="relative">
        <span className="text-[9px] font-black text-[#1E5BB8]">
          Trading platforms
        </span>

        <h2 className="mt-2 text-left text-[24px] font-black leading-[1.14] tracking-[-0.04em] text-slate-950">
          What is the best platform
          <span className="block text-[#1E5BB8]">
            for scalping?
          </span>
        </h2>

        <p className="mt-2.5 text-[10.5px] font-semibold leading-6 text-slate-700">
          The right platform depends on your strategy, automation tools and the features
          you need while analysing and executing trades.
        </p>
      </div>
    </div>

    {/* MOBILE PLATFORM ROWS */}
    <div className="divide-y divide-slate-200">
      {[
        {
          name: "MT4",
          title: "For legacy trading robots",
          desc: "A broad library of Expert Advisors and indicators built with MQL4.",
          label: "Most widely used",
          featured: false,
        },
        {
          name: "MT5",
          title: "For newer tools and testing",
          desc: "More timeframes, tools and testing features than MT4.",
          label: "Newer platform",
          featured: false,
        },
        {
          name: "cTrader",
          title: "For execution and market depth",
          desc: "One-click trading, market depth and support for cTrader Algo.",
          label: "Scalping focused",
          featured: true,
        },
        {
          name: "TradingView",
          title: "For charting and analysis",
          desc: "Strong charting, while execution depends on the broker integration.",
          label: "Best for analysis",
          featured: false,
        },
      ].map((platform) => (
        <article
          key={platform.name}
          className={`px-4 py-3 ${
            platform.featured
              ? "bg-[linear-gradient(90deg,#F2F7FE_0%,#FFFFFF_85%)]"
              : "bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              dir="ltr"
              className={`inline-flex min-h-[32px] min-w-[64px] shrink-0 items-center justify-center rounded-[10px] border px-2.5 text-[9.5px] font-black ${
                platform.featured
                  ? "border-[#4F8EDC] bg-white text-[#1E5BB8]"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              {platform.name}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[11.5px] font-black leading-5 text-slate-950">
                  {platform.title}
                </h3>

                <span
                  className={`rounded-full px-2 py-1 text-[7px] font-black ${
                    platform.featured
                      ? "bg-[#1E5BB8] text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {platform.label}
                </span>
              </div>

              <p className="mt-0.5 text-[9px] font-semibold leading-[1.8] text-slate-600">
                {platform.desc}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* MOBILE NOTE */}
<div className="border-t border-slate-200 bg-slate-50/70 px-4 py-2.5">
  <p className="text-[9px] font-semibold leading-5 text-slate-600">
    <span className="font-black text-[#1E5BB8]">
      Key point:
    </span>{" "}
    Execution quality depends on the broker and account—not the platform name alone.
  </p>
</div>
  </div>

  {/* =================================================
      DESKTOP
  ================================================== */}
  <div className="hidden lg:grid lg:grid-cols-[390px_minmax(0,1fr)] xl:grid-cols-[430px_minmax(0,1fr)]">
    {/* DESKTOP INTRO PANEL */}
    <aside className="relative flex min-h-[390px] flex-col justify-between overflow-hidden border-r border-slate-200 bg-[linear-gradient(145deg,#EAF3FF_0%,#F8FBFF_100%)] px-7 py-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-24 h-[270px] w-[270px] rounded-full bg-[#CFE3FC] blur-[95px]"
      />

      <div className="relative">
        <span className="text-[10px] font-black text-[#1E5BB8]">
          Trading platforms
        </span>

        <h2 className="mt-3 text-[34px] font-black leading-[1.05] tracking-[-0.04em] text-slate-950">
  What is the best platform
  <br />
  <span className="text-brand-600">
    for scalping?
  </span>
</h2>

        <p className="mt-4 text-[13px] font-semibold leading-8 text-slate-700">
          The right platform depends on your trading style, automation setup
          and the tools used to analyse markets and execute orders.
        </p>
      </div>

      {/* PLATFORM VISUAL */}
      <div className="relative mt-6">
        <div className="rounded-[20px] border border-[#C9DDF8] bg-white/85 p-4 shadow-[0_12px_28px_rgba(30,91,184,0.08)] backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#1E5BB8]">
              Platform selection
            </span>

            <div className="flex -space-x-1.5 ">
              {["MT4", "MT5", "cT", "TV"].map((item) => (
                <span
                  key={item}
                  dir="ltr"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#F2F7FE] text-[8px] font-black text-[#1E5BB8] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#1E5BB8_0%,#73A9EA_100%)]" />
          </div>

          <p className="mt-3 text-[10px] font-semibold leading-5 text-slate-600">
            No single platform is ideal for everyone. Compatibility with your
            strategy and selected account matters more.
          </p>
        </div>
      </div>
    </aside>

    {/* DESKTOP PLATFORM ROWS */}
    <div className="divide-y divide-slate-200">
      {[
        {
          name: "MT4",
          title: "For legacy robots and indicators",
          desc: "A widely used platform supporting a large library of Expert Advisors and MQL4 indicators.",
          label: "Most widely used",
          featured: false,
        },
        {
          name: "MT5",
          title: "Newer tools and testing",
          desc: "Provides more timeframes, tools and testing features than MT4, with MQL5 support.",
          label: "Newer platform",
          featured: false,
        },
        {
          name: "cTrader",
          title: "For market depth and fast execution",
          desc: "Offers one-click trading, market depth and automated trading through cTrader Algo.",
          label: "Scalping focused",
          featured: true,
        },
        {
          name: "TradingView",
          title: "For charting and analysis",
          desc: "Advanced charting, while execution quality depends on the broker and account integration.",
          label: "Best for analysis",
          featured: false,
        },
      ].map((platform) => (
        <article
          key={platform.name}
          className={`group flex min-h-[97px] items-center px-6 py-4 transition xl:px-7 ${
            platform.featured
              ? "bg-[linear-gradient(90deg,#F2F7FE_0%,#FFFFFF_80%)]"
              : "bg-white hover:bg-slate-50/70"
          }`}
        >
          <div className="grid w-full grid-cols-[105px_minmax(0,1fr)_150px] items-center gap-5">
            <span
              dir="ltr"
              className={`inline-flex min-h-[36px] w-fit min-w-[76px] items-center justify-center rounded-xl border px-3 text-[11px] font-black ${
                platform.featured
                  ? "border-[#4F8EDC] bg-white text-[#1E5BB8]"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              {platform.name}
            </span>

            <div className="min-w-0">
              <h3 className="text-[14px] font-black text-slate-950">
                {platform.title}
              </h3>

              <p className="mt-1 text-[11px] font-semibold leading-6 text-slate-600">
                {platform.desc}
              </p>
            </div>

            <span
  className={`inline-flex min-h-[30px] min-w-[96px] items-center justify-center justify-self-end rounded-full px-4 text-[9.5px] font-black shadow-sm ${
    platform.featured
      ? "bg-[#1E5BB8] text-white shadow-[0_6px_16px_rgba(30,91,184,0.16)]"
      : "border border-slate-200 bg-slate-100 text-slate-700"
  }`}
>
  {platform.label}
</span>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

{/* =====================================================
    4. BEST BROKER BY NEED — LOGOS + FILLED DESKTOP
====================================================== */}
<section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
  {/* =================================================
      MOBILE HEADER
  ================================================== */}
  <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#F4F8FE_0%,#FFFFFF_100%)] px-4 py-5 lg:hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-20 -top-20 h-[190px] w-[190px] rounded-full bg-[#D9E9FC] blur-[80px]"
    />

    <div className="relative">
      <span className="text-[9px] font-black text-[#1E5BB8]">
        Practical summary
      </span>

      <h2 className="mt-2 text-left text-[25px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950">
        Best scalping broker
        <span className="block text-[#1E5BB8]">
          by trading priority
        </span>
      </h2>

      <p className="mt-3 text-[11px] font-semibold leading-7 text-slate-700">
        Choose the priority that matters most to you, then jump directly to the broker’s
        full ranking card.
      </p>
    </div>
  </div>

  <div className="lg:grid lg:grid-cols-[390px_minmax(0,1fr)] xl:grid-cols-[430px_minmax(0,1fr)]">
    {/* =================================================
        DESKTOP FEATURE PANEL
    ================================================== */}
    <aside className="relative hidden overflow-hidden border-r border-slate-200 bg-[linear-gradient(145deg,#EAF3FF_0%,#F8FBFF_100%)] px-7 py-7 lg:flex lg:min-h-[510px] lg:flex-col lg:justify-between">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-28 h-[300px] w-[300px] rounded-full bg-[#CFE3FC] blur-[100px]"
      />

      <div className="relative">
        <span className="text-[10px] font-black text-[#1E5BB8]">
          Practical summary
        </span>

        <h2 className="mt-3 text-left text-[34px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 xl:text-[39px]">
          Best scalping broker
          <span className="block text-[#1E5BB8]">
            by trading priority
          </span>
        </h2>

        <p className="mt-4 text-[13px] font-semibold leading-8 text-slate-700">
          No single broker suits every trader. Start with your main priority:
          cost, platform choice, account access or account type.
        </p>
      </div>

      {/* FEATURED BROKER LOGOS */}
      <div className="relative mt-7">
        <span className="block text-[9px] font-black text-[#1E5BB8]">
          Featured brokers in this guide
        </span>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {["icmarkets", "tickmill", "pepperstone", "exness"].map(
            (slug) => {
              const brokerItem = brokers.find(
                (candidate) => candidate.broker.slug === slug
              );

              if (!brokerItem) return null;

              return (
                <Link
                  key={slug}
                  href={`#broker-${slug}`}
                  className="group flex min-h-[76px] items-center gap-3 rounded-[16px] border border-white/90 bg-white/85 p-3 shadow-[0_8px_22px_rgba(30,91,184,0.07)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#9FC2F0]"
                >
                  <div className="relative flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {brokerItem.broker.logo ? (
                      <Image
                        src={brokerItem.broker.logo}
                        alt={`${brokerItem.broker.name} logo`}
                        fill
                        className="object-contain p-1.5"
                        sizes="56px"
                      />
                    ) : (
                      <span className="text-[9px] font-black text-slate-600">
                        {getInitials(brokerItem.broker.name)}
                      </span>
                    )}
                  </div>

                  <span
                    dir="ltr"
                    className="min-w-0 truncate text-left text-[11px] font-black text-slate-950 transition group-hover:text-[#1E5BB8]"
                  >
                    {brokerItem.broker.name}
                  </span>
                </Link>
              );
            }
          )}
        </div>
      </div>

      {/* DESKTOP CTA */}
      <div className="relative mt-6 rounded-[18px] border border-[#C9DDF8] bg-white/85 p-4 shadow-[0_10px_26px_rgba(30,91,184,0.07)]">
        <span className="text-[10px] font-black text-[#1E5BB8]">
          How should you decide?
        </span>

        <p className="mt-2 text-[10.5px] font-semibold leading-6 text-slate-600">
          Review the selected account, total cost, platforms and editorial analysis before
          opening a live account.
        </p>

        <a
          href="#top-brokers"
          className="mt-3 inline-flex min-h-[39px] w-full items-center justify-center rounded-xl bg-[#1E5BB8] px-4 text-[10px] font-black text-white shadow-[0_7px_18px_rgba(30,91,184,0.18)] transition hover:bg-[#174A96]"
        >
          View Broker Ranking
        </a>
      </div>
    </aside>

    {/* =================================================
        DECISION ROWS
    ================================================== */}
    <div className="divide-y divide-slate-200">
      {[
        {
          number: "01",
          need: "Best overall",
          broker: "IC Markets",
          slug: "icmarkets",
          note: "Competitive Raw pricing and a strong platform range for active traders.",
        },
        {
          number: "02",
          need: "Lowest direct commission",
          broker: "Tickmill",
          slug: "tickmill",
          note: "A straightforward Raw account and a strong option for MetaTrader users.",
        },
        {
          number: "03",
          need: "Best platform choice",
          broker: "Pepperstone",
          slug: "pepperstone",
          note: "Supports MetaTrader, cTrader and TradingView.",
        },
        {
          number: "04",
          need: "Flexible international access",
          broker: "Exness",
          slug: "exness",
          note: "Broad payment access and multiple account options across many markets.",
        },
        {
          number: "05",
          need: "Swap-free account option",
          broker: "HFM",
          slug: "hfm",
          note: "A Zero account with swap-free conditions where available and eligible.",
        },
        {
          number: "06",
          need: "Scalping with MT5",
          broker: "Vantage",
          slug: "vantage",
          note: "A Raw ECN account with a traditional MetaTrader setup.",
        },
        {
          number: "07",
          need: "Balanced cost and platform choice",
          broker: "FP Markets",
          slug: "fp-markets",
          note: "Raw pricing with MT4, MT5, cTrader and TradingView.",
        },
        {
          number: "08",
          need: "Higher-volume trading",
          broker: "ThinkMarkets",
          slug: "thinkmarkets",
          note: "ThinkZero is designed for more active and higher-volume traders.",
        },
      ].map((item) => {
        const brokerItem = brokers.find(
          (candidate) => candidate.broker.slug === item.slug
        );

        return (
          <a
            key={item.number}
            href={`#broker-${item.slug}`}
            className="group flex min-h-[92px] items-center gap-3 px-4 py-3.5 transition hover:bg-[#F5F9FF] sm:px-6 lg:min-h-[105px] lg:px-7"
          >
            {/* LOGO */}
            <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-slate-200 bg-white shadow-[0_5px_14px_rgba(15,23,42,0.05)]">
              {brokerItem?.broker.logo ? (
                <Image
                  src={brokerItem.broker.logo}
                  alt={`${item.broker} logo`}
                  fill
                  className="object-contain p-1.5"
                  sizes="64px"
                />
              ) : (
                <span
                  dir="ltr"
                  className="text-[9px] font-black text-slate-600"
                >
                  {getInitials(item.broker)}
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[9px] font-black text-slate-500">
                  {item.need}
                </span>

                <span
                  dir="ltr"
                  className="text-[9px] font-black text-[#1E5BB8]"
                >
                  {item.number}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2">
                <h3
                  dir="ltr"
                  className="truncate text-left text-[15px] font-black text-slate-950 transition group-hover:text-[#1E5BB8] sm:text-[16px]"
                >
                  {item.broker}
                </h3>

                <span className="text-[11px] font-black text-[#1E5BB8] transition group-hover:translate-x-1">
                  →
                </span>
              </div>

              <p className="mt-1 line-clamp-2 text-[9.5px] font-semibold leading-5 text-slate-600 sm:text-[10.5px]">
                {item.note}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  </div>

  {/* MOBILE FOOTER */}
  <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-4 lg:hidden">
    <a
      href="#top-brokers"
      className="inline-flex min-h-[41px] w-full items-center justify-center rounded-xl bg-[#1E5BB8] px-5 text-[10px] font-black text-white shadow-[0_7px_18px_rgba(30,91,184,0.18)]"
    >
      Back to Broker Ranking
    </a>
  </div>
</section>
</div>
{/* =====================================================
    METHODOLOGY + REAL COST — COMPACT FINAL
====================================================== */}
<div className="space-y-5 pt-6 sm:space-y-7 sm:pt-9">
  {/* =====================================================
      METHODOLOGY — COMPACT MOBILE + CLEAN DESKTOP
  ====================================================== */}
  <section
    id="methodology"
    className="scroll-mt-24 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.05)] sm:rounded-[30px]"
  >
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_62%,#eaf3ff_100%)] px-4 py-4 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-[240px] w-[240px] rounded-full bg-[#d9e9fc] blur-[90px]"
      />

      <div className="relative">
        <span className="inline-flex min-h-[26px] items-center rounded-full border border-[#c9ddf8] bg-white px-3 text-[8.5px] font-black text-[#1e5bb8] shadow-sm sm:text-[10px]">
          Broker Al Arab methodology
        </span>

        <h2 className="mt-3 text-left text-[25px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
          How we selected the best
          <span className="block text-[#1e5bb8] sm:inline">
            {" "}
            scalping brokers
          </span>
        </h2>

        <p className="mt-2.5 max-w-[1050px] text-left text-[10.5px] font-semibold leading-6 text-slate-700 sm:text-[13px] sm:leading-7">
          We assigned the greatest weight to trading costs and execution, then reviewed each broker’s scalping policy, platform range, regulatory strength and overall account experience.
        </p>
      </div>
    </div>

    {/* =================================================
        MOBILE — 4 COMPACT GROUPS
    ================================================== */}
    <div className="p-4 sm:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        {[
          {
            weight: "30%",
            title: "Trading costs",
            desc: "Spread and commission.",
          },
          {
            weight: "25%",
            title: "Execution",
            desc: "Speed and slippage.",
          },
          {
            weight: "15%",
            title: "Trading policy",
            desc: "Scalping and automated trading.",
          },
          {
            weight: "10%",
            title: "Platforms",
            desc: "MT4, MT5 and cTrader.",
          },
          {
            weight: "10%",
            title: "Trust",
            desc: "Regulation and legal entity.",
          },
          {
            weight: "10%",
            title: "Account experience",
            desc: "Account terms, support and editorial assessment.",
          },
        ].map((criterion, index) => (
          <article
            key={criterion.title}
            className={`relative min-h-[105px] overflow-hidden rounded-[16px] border p-3 ${
              index < 2
                ? "border-[#9fc2f0] bg-[linear-gradient(145deg,#f2f7fe_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                dir="ltr"
                className={`inline-flex min-h-[25px] min-w-[45px] items-center justify-center rounded-full px-2 text-[8px] font-black ${
                  index < 2
                    ? "bg-[#1e5bb8] text-white"
                    : "bg-[#f2f7fe] text-[#1e5bb8] ring-1 ring-[#c9ddf8]"
                }`}
              >
                {criterion.weight}
              </span>

              <span className="text-[8px] font-black text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-3 text-[11px] font-black text-slate-950">
              {criterion.title}
            </h3>

            <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-600">
              {criterion.desc}
            </p>
          </article>
        ))}
      </div>

      {/* MOBILE SUMMARY */}
      <div className="mt-3 flex items-center justify-between gap-3 rounded-[16px] border border-[#c9ddf8] bg-[#f2f7fe] px-4 py-3">
        <div>
          <span className="block text-[9px] font-black text-[#1e5bb8]">
            Final score
          </span>

          <p className="mt-0.5 text-[9px] font-semibold leading-5 text-slate-600">
            A balanced assessment—not a commission-only comparison.
          </p>
        </div>

        <span
          dir="ltr"
          className="shrink-0 text-[23px] font-black text-[#1e5bb8]"
        >
          100%
        </span>
      </div>
    </div>

    {/* =================================================
        TABLET + DESKTOP — WEIGHTED ROWS
    ================================================== */}
    <div className="hidden sm:grid sm:grid-cols-[330px_minmax(0,1fr)] lg:grid-cols-[380px_minmax(0,1fr)]">
      {/* SUMMARY PANEL */}
      <aside className="relative flex flex-col justify-between overflow-hidden border-r border-slate-200 bg-[linear-gradient(145deg,#edf5ff_0%,#f8fbff_100%)] p-6 lg:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-24 h-[250px] w-[250px] rounded-full bg-[#cfe3fc] blur-[90px]"
        />

        <div className="relative">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            Scoring weight distribution
          </span>

          <div className="mt-3 flex items-end gap-2">
            <span
              dir="ltr"
              className="text-[48px] font-black leading-none text-[#1e5bb8]"
            >
              100%
            </span>

            <span className="pb-1 text-[11px] font-black text-slate-600">
              Total weighting
            </span>
          </div>

          <p className="mt-4 text-[11px] font-semibold leading-6 text-slate-600">
            We do not award first place to the broker with the lowest commission alone. We look for the strongest balance of costs, execution, platforms and trust.
          </p>
        </div>

        <div className="relative mt-5 rounded-[16px] border border-[#c9ddf8] bg-white/80 p-4">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            Highest priority
          </span>

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-[11px] font-black text-slate-950">
              Costs + execution
            </span>

            <span
              dir="ltr"
              className="text-[16px] font-black text-[#1e5bb8]"
            >
              55%
            </span>
          </div>
        </div>
      </aside>

      {/* WEIGHT ROWS */}
      <div className="divide-y divide-slate-200">
        {[
          {
            weight: 30,
            title: "Total trading cost",
            desc: "Spread, commission and the full cost of opening and closing a trade.",
          },
          {
            weight: 25,
            title: "Execution quality",
            desc: "Order speed, potential slippage and execution stability.",
          },
          {
            weight: 15,
            title: "Scalping policy",
            desc: "Short-duration trades, automated strategies and high-frequency trading.",
          },
          {
            weight: 10,
            title: "Platforms",
            desc: "Availability of MT4, MT5, cTrader and TradingView.",
          },
          {
            weight: 10,
            title: "Regulation and trust",
            desc: "Regulatory strength, legal entity and client protection.",
          },
          {
            weight: 10,
            title: "Account experience and editorial assessment",
            desc: "Account transparency, support and our final editorial review.",
          },
        ].map((criterion, index) => (
          <article
            key={criterion.title}
            className={`px-6 py-4 lg:px-7 ${
              index < 2
                ? "bg-[linear-gradient(90deg,#f2f7fe_0%,#ffffff_75%)]"
                : "bg-white"
            }`}
          >
            <div className="grid grid-cols-[68px_minmax(0,1fr)_150px] items-center gap-5">
              <span
                dir="ltr"
                className={`inline-flex min-h-[32px] items-center justify-center rounded-full text-[9px] font-black ${
                  index < 2
                    ? "bg-[#1e5bb8] text-white"
                    : "bg-[#f2f7fe] text-[#1e5bb8] ring-1 ring-[#c9ddf8]"
                }`}
              >
                {criterion.weight}%
              </span>

              <div>
                <h3 className="text-[13px] font-black text-slate-950">
                  {criterion.title}
                </h3>

                <p className="mt-1 text-[10.5px] font-semibold leading-5 text-slate-600">
                  {criterion.desc}
                </p>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#1e5bb8_0%,#70a7e9_100%)]"
                  style={{ width: `${(criterion.weight / 30) * 100}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  {/* =====================================================
      SPREAD 0.0 — LIGHTER COST EXPLAINER
  ====================================================== */}
  <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.05)] sm:rounded-[30px]">
    {/* =================================================
        MOBILE
    ================================================== */}
    <div className="lg:hidden">
      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#ffffff_0%,#f3f8ff_100%)] px-4 py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 h-[200px] w-[200px] rounded-full bg-[#d9e9fc] blur-[80px]"
        />

        <div className="relative">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            Understanding trading costs
          </span>

          <h2 className="mt-2 text-left text-[24px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950">
            Why a 0.0-pip spread does not mean
            <span className="block text-[#1e5bb8]">
              the account is free
            </span>
          </h2>

          <p className="mt-2.5 text-[10.5px] font-semibold leading-6 text-slate-700">
            Raw accounts may quote spreads from zero, but they charge a separate commission and spreads can widen during news events or periods of low liquidity.
          </p>
        </div>
      </div>

      <div className="p-4">
        {/* FORMULA */}
        <div className="rounded-[17px] border border-[#c9ddf8] bg-[#f2f7fe] p-4">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            The true trading cost
          </span>

          <p className="mt-2 text-[13px] font-black leading-7 text-slate-950">
            Spread + commission + potential slippage
          </p>

          <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-600">
            Overnight financing may also apply when a position remains open.
          </p>
        </div>

        {/* COMPARISON */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-[16px] border border-[#9fc2f0] bg-[linear-gradient(145deg,#f2f7fe_0%,#ffffff_100%)] p-3">
            <span className="text-[8px] font-black text-[#1e5bb8]">
              Raw
            </span>

            <h3 className="mt-2 text-[11px] font-black text-slate-950">
              Tighter spreads
            </h3>

            <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-600">
              With a separate commission.
            </p>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white p-3">
            <span className="text-[8px] font-black text-slate-500">
              Standard
            </span>

            <h3 className="mt-2 text-[11px] font-black text-slate-950">
              Simpler pricing
            </h3>

            <p className="mt-1 text-[9px] font-semibold leading-5 text-slate-600">
              But spreads are usually wider.
            </p>
          </div>
        </div>

        {/* MOBILE COMMISSION EXAMPLE — BRAND COLORS */}
<aside className="relative mt-3 overflow-hidden rounded-[18px] border border-brand-400 bg-[linear-gradient(145deg,#2B6FD0_0%,#1E5BB8_58%,#184A97_100%)] p-4 text-white shadow-[0_12px_28px_rgba(30,91,184,0.18)]">
  {/* DECORATION */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -left-16 -top-20 h-[180px] w-[180px] rounded-full bg-white/10 blur-[65px]"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-20 -right-16 h-[170px] w-[170px] rounded-full bg-brand-400/25 blur-[60px]"
  />

  <div className="relative">
    {/* HEADER */}
    <div className="flex items-start justify-between gap-3">
      <div>
        <span className="text-[8px] font-black text-brand-100">
          Simple example
        </span>

        <h3 className="mt-1 text-[17px] font-black leading-6 text-white">
          $3.50 commission per side
        </h3>

        <p className="mt-1 text-[8.5px] font-semibold leading-5 text-brand-100">
          Charged once when the trade opens and once when it closes.
        </p>
      </div>

      <div className="shrink-0 text-left">
        <span className="block text-[8px] font-bold text-brand-100">
          Total
        </span>

        <span
          dir="ltr"
          className="mt-1 block text-[27px] font-black leading-none text-white"
        >
          $7
        </span>
      </div>
    </div>

    {/* OPEN + CLOSE */}
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="rounded-[13px] border border-white/20 bg-white/10 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="block text-[8px] font-bold text-brand-100">
          Opening the trade
        </span>

        <span
          dir="ltr"
          className="mt-1.5 block text-[14px] font-black text-white"
        >
          $3.50
        </span>
      </div>

      <div className="rounded-[13px] border border-white/20 bg-white/10 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="block text-[8px] font-bold text-brand-100">
          Closing the trade
        </span>

        <span
          dir="ltr"
          className="mt-1.5 block text-[14px] font-black text-white"
        >
          $3.50
        </span>
      </div>
    </div>

    {/* TOTAL */}
    <div className="mt-2.5 flex items-center justify-between rounded-[14px] border border-white/25 bg-white/15 px-3.5 py-3">
      <span className="text-[10px] font-black text-white">
        Total per standard lot
      </span>

      <span
        dir="ltr"
        className="text-[19px] font-black text-white"
      >
        $7
      </span>
    </div>

    <p className="mt-3 text-[8.5px] font-semibold leading-5 text-brand-100">
      This is the combined opening-and-closing commission per standard lot.
    </p>
  </div>
</aside>
      </div>
    </div>

    {/* =================================================
        DESKTOP
    ================================================== */}
    <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
      {/* MAIN */}
      <article className="px-7 py-7 xl:px-9">
        <span className="text-[10px] font-black text-[#1e5bb8]">
          Understanding trading costs
        </span>

        <h2 className="mt-2 max-w-[900px] text-[33px] font-black leading-[1.15] tracking-[-0.035em] text-slate-950 xl:text-[38px]">
          Why a 0.0-pip spread does not mean the account is free
        </h2>

        <p className="mt-3 max-w-[900px] text-[12.5px] font-semibold leading-7 text-slate-700 xl:text-[13.5px]">
          Raw accounts may advertise spreads from zero, but they charge a separate commission for opening and closing the trade. Live spreads also change with liquidity and trading conditions.
        </p>

        <div className="mt-5 rounded-[17px] border border-[#c9ddf8] bg-[linear-gradient(145deg,#f2f7fe_0%,#ffffff_100%)] p-4">
          <span className="text-[9px] font-black text-[#1e5bb8]">
            Cost formula
          </span>

          <p className="mt-2 text-[16px] font-black text-slate-950">
            Spread + commission + potential slippage
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            {
              label: "Raw account",
              title: "Tighter spreads",
              desc: "With a separate commission.",
            },
            {
              label: "Standard account",
              title: "Simpler pricing",
              desc: "But with wider spreads.",
            },
            {
              label: "How to compare",
              title: "Calculate the all-in cost",
              desc: "Based on your trade size and frequency.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[16px] border border-slate-200 bg-white p-4"
            >
              <span className="text-[8.5px] font-black text-[#1e5bb8]">
                {item.label}
              </span>

              <h3 className="mt-2 text-[12.5px] font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-1 text-[9.5px] font-semibold leading-5 text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* DESKTOP COMMISSION CALCULATOR — BRAND COLORS */}
<aside className="relative overflow-hidden border-l border-brand-400 bg-[linear-gradient(145deg,#2B6FD0_0%,#1E5BB8_58%,#184A97_100%)] px-6 py-7 text-white shadow-[inset_1px_0_0_rgba(255,255,255,0.08)] xl:px-7">
  {/* DECORATION */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -left-24 -top-24 h-[230px] w-[230px] rounded-full bg-white/10 blur-[80px]"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-28 -right-24 h-[240px] w-[240px] rounded-full bg-brand-400/25 blur-[85px]"
  />

  <div className="relative flex h-full flex-col">
    {/* HEADER */}
    <span className="text-[9px] font-black text-brand-100">
      Commission example
    </span>

    <h3 className="mt-2 text-[24px] font-black leading-[1.25] text-white">
      $3.50 commission per side
    </h3>

    <p className="mt-2 text-[10px] font-semibold leading-6 text-brand-100">
      The commission is charged once when the trade opens and again when it closes.
    </p>

    {/* VALUES */}
    <div className="mt-5 grid grid-cols-2 gap-2.5">
      <div className="rounded-[14px] border border-white/20 bg-white/10 px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="block text-[9px] font-black text-brand-100">
          Opening the trade
        </span>

        <span
          dir="ltr"
          className="mt-2 block text-[17px] font-black text-white"
        >
          $3.50
        </span>
      </div>

      <div className="rounded-[14px] border border-white/20 bg-white/10 px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="block text-[9px] font-black text-brand-100">
          Closing the trade
        </span>

        <span
          dir="ltr"
          className="mt-2 block text-[17px] font-black text-white"
        >
          $3.50
        </span>
      </div>
    </div>

    {/* TOTAL */}
    <div className="mt-3 rounded-[15px] border border-white/25 bg-white/15 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-black text-brand-100">
            Total
          </span>

          <span className="mt-1 block text-[12px] font-black text-white">
            Per round-turn lot
          </span>
        </div>

        <span
          dir="ltr"
          className="text-[29px] font-black leading-none text-white"
        >
          $7
        </span>
      </div>
    </div>

    {/* FOOTNOTE */}
    <div className="mt-4 rounded-[14px] border border-white/15 bg-white/[0.08] px-4 py-3">
      <span className="text-[9px] font-black text-brand-100">
        Why do we show the round-turn total?
      </span>

      <p className="mt-1.5 text-[9.5px] font-semibold leading-5 text-brand-100">
        So accounts can be compared without confusing a one-side commission with the combined cost of opening and closing a position.
      </p>
    </div>
  </div>
</aside>
    </div>
  </section>
</div>

    {/* =====================================================
    1. HOW TO CHOOSE — FINAL RESPONSIVE
====================================================== */}
<section className="pt-6 sm:pt-9">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_62%,#eaf3ff_100%)] px-4 py-5 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-[230px] w-[230px] rounded-full bg-brand-100/70 blur-[90px]"
      />

      <div className="relative">
        <span className="text-[9px] font-black text-brand-600 sm:text-[10px]">
          Practical checklist
        </span>

        <h2 className="mt-2 text-left text-[25px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
          How to choose a forex broker
          <span className="block text-brand-600 sm:inline">
            {" "}
            for scalping
          </span>
        </h2>

        <p className="mt-3 max-w-[980px] text-[10.5px] font-semibold leading-6 text-slate-700 sm:text-[13px] sm:leading-7">
          Follow these steps before opening an account. Do not rely on the advertised spread or the broker’s brand name alone.
        </p>
      </div>
    </div>

    {/* MOBILE */}
    <div className="divide-y divide-slate-200 sm:hidden">
      {[
        {
          title: "Calculate the all-in cost",
          desc: "Add the spread, commission and the full opening-and-closing cost.",
        },
        {
          title: "Check the scalping policy",
          desc: "Confirm there is no minimum trade duration or restriction on high-frequency trading.",
        },
        {
          title: "Choose the right platform",
          desc: "Use MetaTrader for Expert Advisors or cTrader for market depth and active execution.",
        },
        {
          title: "Monitor slippage",
          desc: "Test execution with a small position under normal liquidity conditions.",
        },
        {
          title: "Check the legal entity",
          desc: "Regulation, client protection and leverage can vary by legal entity.",
        },
        {
          title: "Start with a small position size",
          desc: "Test the live account before increasing trade frequency.",
        },
      ].map((item, index) => (
        <article
          key={item.title}
          className="px-4 py-4"
        >
          {/* Number and title on one line */}
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-700 ring-1 ring-brand-100">
              {index + 1}
            </span>

            <h3 className="min-w-0 text-[13px] font-black leading-6 text-slate-950">
              {item.title}
            </h3>
          </div>

          <p className="mr-11 mt-1 text-[9.5px] font-semibold leading-5 text-slate-600">
            {item.desc}
          </p>
        </article>
      ))}
    </div>

    {/* DESKTOP */}
    <div className="hidden gap-3 p-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Calculate the all-in cost",
          desc: "Do not compare spreads alone; include round-turn commission and slippage.",
        },
        {
          title: "Check the scalping policy",
          desc: "Confirm there is no minimum trade duration or restriction on high-frequency trading.",
        },
        {
          title: "Choose the right platform",
          desc: "Use MetaTrader for trading robots or cTrader for market depth and execution.",
        },
        {
          title: "Monitor slippage",
          desc: "Test execution quality with a small position under normal liquidity conditions.",
        },
        {
          title: "Check the legal entity",
          desc: "Client protection, leverage and account terms may vary by legal entity.",
        },
        {
          title: "Start with a small position size",
          desc: "Test the live account before increasing trade frequency or position size.",
        },
      ].map((item, index) => (
        <article
          key={item.title}
          className="group rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_100%)] p-4 transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_10px_24px_rgba(30,91,184,0.07)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-700 ring-1 ring-brand-100">
              {index + 1}
            </span>

            <h3 className="text-[13px] font-black text-slate-950">
              {item.title}
            </h3>
          </div>

          <p className="mr-11 mt-1.5 text-[10px] font-semibold leading-5 text-slate-600">
            {item.desc}
          </p>
        </article>
      ))}
    </div>
  </div>
</section>
{/* =====================================================
    3. FAQ — 5 MOBILE / 10 DESKTOP
====================================================== */}
<section className="pt-6 sm:pt-9">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    {/* HEADER */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fe_100%)] px-4 py-5 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-[220px] w-[220px] rounded-full bg-brand-100/60 blur-[90px]"
      />

      <div className="relative">
        <span className="text-[9px] font-black text-brand-600 sm:text-[10px]">
          Frequently asked questions
        </span>

        <h2 className="mt-2 text-left text-[25px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
          Questions about
          <span className="block text-brand-600 sm:inline">
            {" "}
            forex scalping brokers
          </span>
        </h2>

        <p className="mt-3 text-[10.5px] font-semibold leading-6 text-slate-700 sm:text-[12px]">
          Clear answers about scalping accounts, trading costs, platforms and broker policies.
        </p>
      </div>
    </div>

    {/* MOBILE — TOP 5 ONLY */}
    <div className="divide-y divide-slate-200 p-3 sm:hidden">
      {faqs.slice(0, 5).map((item) => (
        <details
          key={item.question}
          className="group border-b border-slate-200 last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-4 text-[12px] font-black leading-6 text-slate-950">
            <span className="min-w-0">
              {item.question}
            </span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[13px] font-black text-brand-600 transition group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
              +
            </span>
          </summary>

          <p className="pb-4 text-[10px] font-semibold leading-6 text-slate-600">
            {item.answer}
          </p>
        </details>
      ))}

      <div className="pt-3">
        <p className="rounded-[14px] bg-brand-50 px-3 py-2.5 text-center text-[9px] font-bold text-brand-700 ring-1 ring-brand-100">
          The five most important questions are shown on mobile to keep the page concise.
        </p>
      </div>
    </div>

    {/* TABLET + DESKTOP — ALL 10 */}
    <div className="hidden gap-2.5 p-5 sm:grid lg:grid-cols-2">
      {faqs.map((item) => (
        <details
          key={item.question}
          className="group rounded-[16px] border border-slate-200 bg-[#fbfdff] p-4 open:border-brand-100 open:bg-brand-50/30"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-[13px] font-black leading-6 text-slate-950">
            <span>{item.question}</span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[13px] font-black text-brand-600 transition group-open:rotate-45 group-open:border-brand-100 group-open:bg-brand-600 group-open:text-white">
              +
            </span>
          </summary>

          <p className="mt-3 border-t border-slate-200 pt-3 text-[11px] font-semibold leading-6 text-slate-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  </div>
</section>

{/* =====================================================
    FINAL SUMMARY + CTA — COMPACT RESPONSIVE
====================================================== */}
<section className="pb-1 pt-4 sm:pb-2 sm:pt-6">
  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.05)] sm:rounded-[28px]">
    {/* =================================================
        SUMMARY HEADER
    ================================================== */}
    <div className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_62%,#edf5ff_100%)] px-4 py-5 sm:px-7 sm:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-28 h-[230px] w-[230px] rounded-full bg-brand-100/70 blur-[90px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-[210px] w-[210px] rounded-full bg-brand-50 blur-[85px]"
      />

      <div className="relative">
        {/* MOBILE */}
        <div className="sm:hidden">
          <span className="inline-flex min-h-[28px] items-center rounded-full border border-brand-100 bg-white px-3 text-[11px] font-black text-brand-600 shadow-sm">
            Final takeaway
          </span>

          <h2 className="mt-3 text-left text-[26px] font-black leading-[1.16] tracking-[-0.035em] text-slate-950">
            Choose the right broker
            <span className="block text-brand-600">
              for your trading style
            </span>
          </h2>

          <p className="mt-3 text-[13px] font-semibold leading-7 text-slate-700">
            The best scalping broker is not simply the one advertising the lowest spread. It should also combine efficient execution, transparent pricing and a trading policy that supports your strategy.
          </p>
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <span className="inline-flex min-h-[30px] items-center rounded-full border border-brand-100 bg-white px-4 text-[12px] font-black text-brand-600 shadow-sm">
              Final takeaway
            </span>

            <h2 className="mt-3 text-[34px] font-black leading-[1.14] tracking-[-0.035em] text-slate-950 lg:text-[39px]">
              Choose the right scalping broker for your trading style
            </h2>

            <p className="mt-3 max-w-[900px] text-[15px] font-semibold leading-8 text-slate-700">
              The best broker is not necessarily the one with the lowest advertised spread. Look for fast and reliable execution, transparent fees, a stable platform and account conditions that fit the way you trade.
            </p>
          </div>

          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-brand-600 text-[25px] font-black text-white shadow-[0_10px_24px_rgba(30,91,184,0.18)]">
            ✓
          </span>
        </div>
      </div>
    </div>

    {/* =================================================
        KEY POINTS
    ================================================== */}

    {/* MOBILE — COMPACT ROWS */}
    <div className="divide-y divide-slate-200 sm:hidden">
      {[
        {
          number: "1",
          title: "Execution matters more than the headline spread",
          desc: "Slow execution can cost more than a small difference in quoted spreads.",
        },
        {
          number: "2",
          title: "Check the account type",
          desc: "Compare Raw and Standard pricing based on how frequently you trade.",
        },
        {
          number: "3",
          title: "Verify the regulation",
          desc: "Confirm the legal and regulatory entity before opening an account.",
        },
      ].map((item) => (
        <article
          key={item.number}
          className="px-4 py-4"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[12px] font-black text-brand-700 ring-1 ring-brand-100">
              {item.number}
            </span>

            <h3 className="text-[15px] font-black leading-6 text-slate-950">
              {item.title}
            </h3>
          </div>

          <p className="ml-12 mt-1 text-[12px] font-semibold leading-6 text-slate-600">
            {item.desc}
          </p>
        </article>
      ))}
    </div>

    {/* DESKTOP — THREE COLUMNS */}
    <div className="hidden gap-3 p-5 sm:grid sm:grid-cols-3 sm:p-6">
      {[
        {
          number: "1",
          title: "Execution matters more than the spread",
          desc: "Slow fills and slippage can cost more than a small difference in the quoted spread.",
        },
        {
          number: "2",
          title: "Choose the right account",
          desc: "Compare Raw and Standard pricing according to your trade frequency and volume.",
        },
        {
          number: "3",
          title: "Regulation comes first",
          desc: "Check the regulatory entity and client-protection terms before depositing funds.",
        },
      ].map((item) => (
        <article
          key={item.number}
          className="group rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_100%)] p-4 transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-[0_10px_24px_rgba(30,91,184,0.07)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[12px] font-black text-brand-700 ring-1 ring-brand-100">
              {item.number}
            </span>

            <h3 className="text-[16px] font-black text-slate-950">
              {item.title}
            </h3>
          </div>

          <p className="ml-12 mt-2 text-[13px] font-semibold leading-7 text-slate-600">
            {item.desc}
          </p>
        </article>
      ))}
    </div>

    {/* =================================================
        CTA
    ================================================== */}
    <div className="border-t border-slate-200 bg-slate-50/80 px-4 py-5 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left">
          <h3 className="text-[19px] font-black text-slate-950 sm:text-[22px]">
            Ready to compare forex brokers?
          </h3>

          <p className="mt-1 text-[12px] font-semibold leading-6 text-slate-600 sm:text-[13px]">
            Review our full broker ratings and choose the account that best matches your trading approach.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:shrink-0">
          <Link
            href="/en/brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-500 px-4 text-[12px] font-black text-white shadow-[0_8px_18px_rgba(30,91,184,0.16)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:min-w-[175px] sm:px-6 sm:text-[13px]"
          >
            Browse Brokers
          </Link>

          <Link
            href="/en/compare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-[12px] font-black text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 sm:min-w-[160px] sm:px-6 sm:text-[13px]"
          >
            Compare Brokers
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
    </main>
  );
}