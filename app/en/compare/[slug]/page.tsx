import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ShareButtons from "@/app/components/ShareButtons";
import React from "react";

type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  best_for: string | null;
  best_for_en: string | null;
  intro: string | null;
  intro_en: string | null;
  logo: string | null;
  account_types: string | null;
  fees: string | null;
  fees_en: string | null;
  spreads: string | null;
  spreads_en: string | null;
  deposit_withdrawal: string | null;
  deposit_withdrawal_en: string | null;
  real_account_url: string | null;
  platform_details: string | null;
  platform_details_en: string | null;
  support: string | null;
  support_en: string | null;
  safety: string | null;
  safety_en: string | null;
  final_verdict: string | null;
  final_verdict_en: string | null;
  founded_year: string | null;
  headquarters: string | null;
  headquarters_en: string | null;
  max_leverage: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  trading_assets: string | null;
    meta_title_en: string | null;
  meta_description_en: string | null;

  key_strength_en: string | null;
  key_weakness_en: string | null;
  expert_insight_en: string | null;
  who_should_use_en: string | null;

  score_safety: number | null;
  score_fees: number | null;
  score_platforms: number | null;
  score_deposit: number | null;
  score_support: number | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;

  account_name: string | null;
  account_name_en: string | null;

  spread: string | null;
  spread_en: string | null;

  commission: string | null;
  commission_en: string | null;

  min_deposit: string | null;
  min_deposit_en: string | null;

  execution_type: string | null;
  execution_type_en: string | null;

  best_for: string | null;
  best_for_en: string | null;

  sort_order: number | null;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function cleanText(value: string | null | undefined) {
  return (value || "").trim();
}

function money(value: number | null) {
  if (value === null || Number.isNaN(value)) return "Not specified";
  return `$${value}`;
}

function shortReg(value: string | null) {
  if (!value) return "Not specified";
  return value
    .split("||")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 4)
    .join(" / ");
}

function shortPlatforms(value: string | null) {
  if (!value) return "Not specified";
  return value.replace("JustMarkets Mobile App", "Mobile").trim();
}

function yesNoEnglish(value: string | null) {
  const v = (value || "").toLowerCase();
  if (v.includes("yes") || v.includes("متوفر")) return "Available";
  if (v.includes("no") || v.includes("غير")) return "Not clear";
  return value || "Not specified";
}

function countLicenses(value: string | null) {
  if (!value) return 0;
  return value
    .split("||")
    .map((x) => x.trim())
    .filter(Boolean).length;
}

function hasArabicSupportScore(value: string | null) {
  const v = (value || "").toLowerCase();
  return v.includes("yes") || v.includes("متوفر") || v.includes("عربي") ? 1 : 0;
}

function hasIslamicScore(value: string | null) {
  const v = (value || "").toLowerCase();
  return v.includes("yes") || v.includes("متوفر") ? 1 : 0;
}

function numericLeverage(value: string | null) {
  if (!value) return 0;
  const match = value.match(/\d+/g);
  if (!match) return 0;
  return Number(match.join(""));
}

function getBetterValueLabel(left: Broker, right: Broker) {
  const leftDeposit = left.min_deposit ?? 999999;
  const rightDeposit = right.min_deposit ?? 999999;
  return leftDeposit < rightDeposit
    ? left.name_en || left.name
    : rightDeposit < leftDeposit
    ? right.name_en || right.name
    : "Tie";
}

function getHigherRatingLabel(left: Broker, right: Broker) {
  const l = left.rating ?? 0;
  const r = right.rating ?? 0;
  return l > r
    ? left.name_en || left.name
    : r > l
    ? right.name_en || right.name
    : "Tie";
}

function getBeginnerWinner(left: Broker, right: Broker) {
  const lDeposit = left.min_deposit ?? 999999;
  const rDeposit = right.min_deposit ?? 999999;

  const lScore =
    (lDeposit <= 50 ? 2 : 0) +
    (cleanText(left.best_for_en || left.best_for).toLowerCase().includes("begin") ? 2 : 0) +
    hasIslamicScore(left.islamic_account) +
    hasArabicSupportScore(left.arabic_support);

  const rScore =
    (rDeposit <= 50 ? 2 : 0) +
    (cleanText(right.best_for_en || right.best_for).toLowerCase().includes("begin") ? 2 : 0) +
    hasIslamicScore(right.islamic_account) +
    hasArabicSupportScore(right.arabic_support);

  return lScore > rScore
    ? left.name_en || left.name
    : rScore > lScore
    ? right.name_en || right.name
    : "Tie";
}

function getScalpingWinner(left: Broker, right: Broker) {
  const lText = `${left.spreads_en || left.spreads || ""} ${left.fees_en || left.fees || ""} ${left.best_for_en || left.best_for || ""}`.toLowerCase();
  const rText = `${right.spreads_en || right.spreads || ""} ${right.fees_en || right.fees || ""} ${right.best_for_en || right.best_for || ""}`.toLowerCase();

  const lScore =
    (lText.includes("0.0") ? 2 : 0) +
    (lText.includes("spread") ? 1 : 0) +
    (lText.includes("fast") ? 1 : 0) +
    (lText.includes("low") ? 1 : 0) +
    (lText.includes("scalp") ? 1 : 0);

  const rScore =
    (rText.includes("0.0") ? 2 : 0) +
    (rText.includes("spread") ? 1 : 0) +
    (rText.includes("fast") ? 1 : 0) +
    (rText.includes("low") ? 1 : 0) +
    (rText.includes("scalp") ? 1 : 0);

  return lScore > rScore
    ? left.name_en || left.name
    : rScore > lScore
    ? right.name_en || right.name
    : "Tie";
}

function getSafetyWinner(left: Broker, right: Broker) {
  const lScore = countLicenses(left.regulation) + ((left.rating ?? 0) >= 4 ? 1 : 0);
  const rScore = countLicenses(right.regulation) + ((right.rating ?? 0) >= 4 ? 1 : 0);
  return lScore > rScore
    ? left.name_en || left.name
    : rScore > lScore
    ? right.name_en || right.name
    : "Tie";
}

function compareTitle(left: Broker, right: Broker) {
  return `${left.name_en || left.name} vs ${right.name_en || right.name}: Which Broker Is Better?`;
}

function getBrokerReasons(
  broker: Broker,
  other: Broker,
  type: "left" | "right"
): string[] {
  const brokerName = broker.name_en || broker.name || "This broker";
  const otherName = other.name_en || other.name || "the other broker";
  const reasons: string[] = [];

  if ((broker.rating ?? 0) > (other.rating ?? 0)) {
    reasons.push(`${brokerName} has a higher overall rating than ${otherName}.`);
  }

  if ((broker.min_deposit ?? 999999) < (other.min_deposit ?? 999999)) {
    reasons.push(`${brokerName} offers a lower minimum deposit.`);
  }

  if (hasIslamicScore(broker.islamic_account) > hasIslamicScore(other.islamic_account)) {
    reasons.push(`${brokerName} appears clearer in terms of Islamic account availability.`);
  }

  if (hasArabicSupportScore(broker.arabic_support) > hasArabicSupportScore(other.arabic_support)) {
    reasons.push(`${brokerName} may be more suitable for Arabic-speaking traders in terms of support.`);
  }

  if (countLicenses(broker.regulation) > countLicenses(other.regulation)) {
    reasons.push(`${brokerName} appears to have broader regulatory coverage.`);
  }

  if (numericLeverage(broker.max_leverage) > numericLeverage(other.max_leverage)) {
    reasons.push(`${brokerName} offers higher leverage based on the current data.`);
  }

  if (cleanText(broker.best_for_en || broker.best_for)) {
    reasons.push(`${brokerName} is positioned for ${cleanText(broker.best_for_en || broker.best_for)}.`);
  }

  if (reasons.length < 4) {
    if (type === "left") {
      reasons.push(`${brokerName} may be a strong option if you prefer a more direct and straightforward trading environment.`);
      reasons.push(`Review the fees and platforms of ${brokerName} before making your final decision.`);
    } else {
      reasons.push(`${brokerName} may be a better fit if you are looking for an easier start or a more flexible trading experience.`);
      reasons.push(`It is worth reviewing the available account types at ${brokerName} before opening an account.`);
    }
  }

  return reasons.slice(0, 4);
}

function buildFaqJsonLd(left: Broker, right: Broker) {
  const leftName = left.name_en || left.name;
  const rightName = right.name_en || right.name;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the difference between ${leftName} and ${rightName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The difference between ${leftName} and ${rightName} usually appears in regulation, account types, minimum deposit, fees, and trading platforms. This page provides a direct comparison to help traders make a clearer decision.`,
        },
      },
      {
        "@type": "Question",
        name: `Which is better for beginners: ${leftName} or ${rightName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `That depends on account simplicity, minimum deposit, Islamic account availability, and general usability. This comparison gives a quick indication of which broker may be more beginner-friendly.`,
        },
      },
      {
        "@type": "Question",
        name: `Do ${leftName} and ${rightName} offer Islamic accounts?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `This comparison shows whether Islamic accounts appear to be available at ${leftName} and ${rightName} based on the current information displayed on the site.`,
        },
      },
      {
        "@type": "Question",
        name: `Which broker has a lower minimum deposit: ${leftName} or ${rightName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `This page shows which broker may offer an easier starting point in terms of minimum deposit, while also comparing platforms, regulation, and account types.`,
        },
      },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [leftSlug, rightSlug] = slug.split("-vs-");
  const siteUrl = "https://brokeralarab.com";

 if (!leftSlug || !rightSlug) {
  return {
    metadataBase: new URL(siteUrl),
    title: "Broker Comparisons | Broker AlArab",
    description:
      "Detailed broker comparisons covering accounts, fees, regulation, and trading platforms to help traders choose the right broker.",
    alternates: {
  canonical: `${siteUrl}/en/compare`,
  languages: {
    en: `${siteUrl}/en/compare`,
    ar: `${siteUrl}/compare`,
    "x-default": `${siteUrl}/en/compare`,
  },
},
    openGraph: {
  title: "Broker Comparisons | Broker AlArab",
  description:
    "Detailed broker comparisons covering accounts, fees, regulation, and trading platforms.",
  url: `${siteUrl}/en/compare`,
  siteName: "Broker Al Arab",
  locale: "en_US",
  type: "website",
  images: [
    {
      url: `${siteUrl}/og-image.png`,
      width: 1560,
      height: 377,
      alt: "Broker Al Arab",
    },
  ],
},
  twitter: {
  card: "summary_large_image",
  title: "Broker Comparisons | Broker AlArab",
  description:
    "Detailed broker comparisons covering accounts, fees, regulation, and trading platforms.",
  images: [`${siteUrl}/og-image.png`],
},
  };
}

  const supabase = await createClient();

const { data } = await supabase
  .from("brokers")
  .select("name, name_en, slug")
  .in("slug", [leftSlug, rightSlug]);

const brokers = (data ?? []) as {
  name: string | null;
  name_en: string | null;
  slug: string | null;
}[];

const leftBroker = brokers.find((b) => b.slug === leftSlug);
const rightBroker = brokers.find((b) => b.slug === rightSlug);

const leftName = leftBroker?.name_en || leftBroker?.name || leftSlug;
const rightName = rightBroker?.name_en || rightBroker?.name || rightSlug;

 const title = `${leftName} vs ${rightName} | Fees, Platforms & Regulation`;
const description = `A detailed comparison between ${leftName} and ${rightName} covering accounts, fees, regulation, platforms, and minimum deposit to help traders choose the better broker.`;
const imageUrl = `${siteUrl}/og-image.png`;

  
 return {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    `${leftName} vs ${rightName}`,
    `${leftName} review`,
    `${rightName} review`,
    "broker comparison",
    "forex broker comparison",
    "trading broker comparison",
    "Broker AlArab",
  ],
 alternates: {
  canonical: `${siteUrl}/en/compare/${slug}`,
  languages: {
    en: `${siteUrl}/en/compare/${slug}`,
    ar: `${siteUrl}/compare/${slug}`,
    "x-default": `${siteUrl}/en/compare/${slug}`,
  },
},
  openGraph: {
  title,
  description,
  url: `${siteUrl}/en/compare/${slug}`,
  siteName: "Broker Al Arab",
  locale: "en_US",
  type: "article",
  images: [
    {
      url: imageUrl,
      width: 1560,
      height: 377,
      alt: "Broker Al Arab",
    },
  ],
},

twitter: {
  card: "summary_large_image",
  title,
  description,
  images: [imageUrl],
  creator: "@brokeralarab",
},
};
}

function BrokerHeadToHeadCard({
  broker,
  other,
  isWinner,
}: {
  broker: Broker;
  other: Broker;
  isWinner: boolean;
}) {
  const name = broker.name_en || broker.name || "Broker";
  const slug = broker.slug || "";
  const reason =
    cleanText(broker.best_for_en || broker.best_for) ||
    `Suitable for multiple trader profiles compared with ${other.name_en || other.name || "the other broker"}`;

  return (
    <div
      className={`rounded-[28px] border p-5 shadow-sm sm:p-6 ${
        isWinner ? "border-[#bfdbfe] bg-[#f8fbff]" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black sm:text-3xl">{name}</h2>
            {isWinner ? (
              <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-[11px] font-extrabold text-[#1d4ed8]">
                Best Overall
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-600">{reason}</p>
        </div>

        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8] sm:h-20 sm:w-20">
          <span className="text-xl font-black sm:text-2xl">
            {broker.rating?.toFixed(1) ?? "—"}
          </span>
          <span className="text-[10px] font-bold">out of 5</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-[11px] font-bold text-slate-500">Minimum Deposit</div>
          <div className="mt-1 text-sm font-black text-[#0f172a]">{money(broker.min_deposit)}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-[11px] font-bold text-slate-500">Islamic Account</div>
          <div className="mt-1 text-sm font-black text-[#0f172a]">
            {yesNoEnglish(broker.islamic_account)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-[11px] font-bold text-slate-500">Platforms</div>
          <div className="mt-1 text-sm font-black text-[#0f172a]">
            {shortPlatforms(broker.platforms)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-[11px] font-bold text-slate-500">Regulation</div>
          <div className="mt-1 text-sm font-black text-[#0f172a]">
            {shortReg(broker.regulation)}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={`/en/brokers/${slug}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
        >
          Read Review
        </Link>
        <a
          href={`/go/${slug}?type=real`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
        >
          Open Live Account
        </a>
      </div>
    </div>
  );
}

function AccountCard({
  account,
}: {
  account: BrokerAccount;
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="text-lg font-black text-[#0f172a]">
          {account.account_name_en || account.account_name || "Account"}
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#1d4ed8]">
          Account
        </span>
      </div>

      <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          Spread:{" "}
          <span className="font-black text-[#0f172a]">{account.spread_en || account.spread || "Not specified"}</span>
        </div>
        <div>
          Commission:{" "}
          <span className="font-black text-[#0f172a]">{account.commission_en || account.commission || "Not specified"}</span>
        </div>
        <div>
          Min Deposit:{" "}
          <span className="font-black text-[#0f172a]">{account.min_deposit_en || account.min_deposit || "Not specified"}</span>
        </div>
        <div>
          Execution:{" "}
          <span className="font-black text-[#0f172a]">
            {account.execution_type_en || account.execution_type || "Not specified"}
          </span>
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        Best for:{" "}
        <span className="font-black text-[#0f172a]">{account.best_for_en || account.best_for || "General traders"}</span>
      </div>
    </div>
  );
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const [leftSlug, rightSlug] = slug.split("-vs-");

  if (!leftSlug || !rightSlug) notFound();
  

  const supabase = await createClient();

  const { data: brokersData } = await supabase
    .from("brokers")
    .select("*")
    .in("slug", [leftSlug, rightSlug]);

  const brokers = (brokersData ?? []) as Broker[];

  const left = brokers.find((b) => b.slug === leftSlug);
  const right = brokers.find((b) => b.slug === rightSlug);

  if (!left || !right) notFound();

  const { data: accountsData } = await supabase
    .from("broker_accounts")
    .select("*")
    .in("broker_id", [left.id, right.id])
    .order("sort_order", { ascending: true });

  const accounts = (accountsData ?? []) as BrokerAccount[];
  const leftAccounts = accounts.filter((a) => a.broker_id === left.id);
  const rightAccounts = accounts.filter((a) => a.broker_id === right.id);

  const overallWinner = getHigherRatingLabel(left, right);
  const beginnerWinner = getBeginnerWinner(left, right);
  const scalpingWinner = getScalpingWinner(left, right);
  const depositWinner = getBetterValueLabel(left, right);
  const safetyWinner = getSafetyWinner(left, right);
  const siteUrl = "https://brokeralarab.com";
  const pageUrl = `${siteUrl}/en/compare/${slug}`;
  const shareTitle = `${left.name_en || left.name} vs ${right.name_en || right.name} | Broker AlArab`;

  const faqJsonLd = buildFaqJsonLd(left, right);

  const comparisonSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${left.name_en || left.name} vs ${right.name_en || right.name}`,
  url: `https://brokeralarab.com/en/compare/${slug}`,
  description: `A detailed comparison between ${left.name_en || left.name} and ${right.name_en || right.name} covering accounts, fees, regulation, platforms, and minimum deposit.`,
  mainEntity: {
    "@type": "ItemList",
    name: `${left.name_en || left.name} vs ${right.name_en || right.name}`,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: 2,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: left.name_en || left.name,
        url: `https://brokeralarab.com/en/brokers/${left.slug}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: right.name_en || right.name,
        url: `https://brokeralarab.com/en/brokers/${right.slug}`,
      },
    ],
  },
};

  const breadcrumbSchema = {
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
      name: "Comparisons",
      item: "https://brokeralarab.com/en/compare",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: `${left.name_en || left.name} vs ${right.name_en || right.name}`,
      item: `https://brokeralarab.com/en/compare/${slug}`,
    },
  ],
};

  const comparisonRows = [
  {
    label: "Rating",
    leftValue: `${left.rating?.toFixed(1) ?? "—"} / 5`,
    rightValue: `${right.rating?.toFixed(1) ?? "—"} / 5`,
    winner:
      (left.rating ?? 0) > (right.rating ?? 0)
        ? left.name_en || left.name
        : (right.rating ?? 0) > (left.rating ?? 0)
        ? right.name_en || right.name
        : "Tie",
  },
  {
    label: "Minimum Deposit",
    leftValue: money(left.min_deposit),
    rightValue: money(right.min_deposit),
    winner: depositWinner,
  },
  {
    label: "Platforms",
    leftValue: shortPlatforms(left.platforms),
    rightValue: shortPlatforms(right.platforms),
    winner: "Tie",
  },
  {
    label: "Islamic Account",
    leftValue: yesNoEnglish(left.islamic_account),
    rightValue: yesNoEnglish(right.islamic_account),
    winner:
      hasIslamicScore(left.islamic_account) > hasIslamicScore(right.islamic_account)
        ? left.name_en || left.name
        : hasIslamicScore(right.islamic_account) > hasIslamicScore(left.islamic_account)
        ? right.name_en || right.name
        : "Tie",
  },
  {
    label: "Arabic Support",
    leftValue: yesNoEnglish(left.arabic_support),
    rightValue: yesNoEnglish(right.arabic_support),
    winner:
      hasArabicSupportScore(left.arabic_support) > hasArabicSupportScore(right.arabic_support)
        ? left.name_en || left.name
        : hasArabicSupportScore(right.arabic_support) >
          hasArabicSupportScore(left.arabic_support)
        ? right.name_en || right.name
        : "Tie",
  },
  {
    label: "Regulation",
    leftValue: shortReg(left.regulation),
    rightValue: shortReg(right.regulation),
    winner: safetyWinner,
  },
  {
    label: "Headquarters",
    leftValue: left.headquarters_en || left.headquarters || "Not specified",
    rightValue: right.headquarters_en || right.headquarters || "Not specified",
    winner: "Tie",
  },
  {
    label: "Founded",
    leftValue: left.founded_year || "Not specified",
    rightValue: right.founded_year || "Not specified",
    winner: "Tie",
  },
  {
    label: "Leverage",
    leftValue: left.max_leverage || "Not specified",
    rightValue: right.max_leverage || "Not specified",
    winner:
      numericLeverage(left.max_leverage) > numericLeverage(right.max_leverage)
        ? left.name_en || left.name
        : numericLeverage(right.max_leverage) > numericLeverage(left.max_leverage)
        ? right.name_en || right.name
        : "Tie",
  },
  {
    label: "Tradable Assets",
    leftValue: left.trading_assets || "Not specified",
    rightValue: right.trading_assets || "Not specified",
    winner: "Tie",
  },
];

 const accountSummaryRows = [
  {
    label: "Available Accounts",
    leftValue: String(leftAccounts.length),
    rightValue: String(rightAccounts.length),
    winner:
      leftAccounts.length > rightAccounts.length
        ? left.name_en || left.name
        : rightAccounts.length > leftAccounts.length
        ? right.name_en || right.name
        : "Tie",
  },
  {
    label: "Lowest Visible Deposit",
    leftValue:
      leftAccounts
        .map((a) => a.min_deposit_en || a.min_deposit || "")
        .find((v) => v.trim()) || money(left.min_deposit),
    rightValue:
      rightAccounts
        .map((a) => a.min_deposit_en || a.min_deposit || "")
        .find((v) => v.trim()) || money(right.min_deposit),
    winner: depositWinner,
  },
  {
    label: "Best for Beginners",
    leftValue: cleanText(left.best_for_en || left.best_for) || "General traders",
    rightValue: cleanText(right.best_for_en || right.best_for) || "General traders",
    winner: beginnerWinner,
  },
];

  const leftReasons = getBrokerReasons(left, right, "left");
  const rightReasons = getBrokerReasons(right, left, "right");

 const visibleFaqs = [
  {
    q: `What is the difference between ${left.name_en || left.name} and ${right.name_en || right.name}?`,
    a: `The difference between ${left.name_en || left.name} and ${right.name_en || right.name} usually appears in regulation, account types, minimum deposit, fees, platforms, and the type of trader each broker may suit better.`,
  },
  {
    q: `Which is better for beginners: ${left.name_en || left.name} or ${right.name_en || right.name}?`,
    a: `Based on the criteria shown on this page, such as minimum deposit, account suitability, and ease of getting started, the quick beginner-friendly choice here is ${beginnerWinner}.`,
  },
  {
    q: `Which broker looks better for spreads and active trading?`,
    a: `The quick indication for spreads and active trading is ${scalpingWinner}. However, the final decision still depends on the account type you choose and your trading style.`,
  },
  {
    q: `Do ${left.name_en || left.name} and ${right.name_en || right.name} offer Islamic accounts?`,
    a: `This comparison shows the current Islamic account status for ${left.name_en || left.name} and ${right.name_en || right.name} based on the available data. It is still best to review each broker’s dedicated review page before opening an account.`,
  },
];

  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

           <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-[#2563eb]/10 blur-3xl" />
          <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-[#60a5fa]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          {/* Top intro - Desktop only */}
          <div className="mb-5 hidden md:block">
            <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white px-8 py-8 shadow-[0_18px_55px_rgba(37,99,235,0.08)]">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-[38%] bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_55%)]" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dbeafe] bg-[#f8fbff] px-4 py-2 text-xs font-extrabold text-[#2563eb]">
                  <span>Comparisons</span>
                  <span className="text-slate-300">/</span>
                  <span>{left.name_en || left.name} vs {right.name_en || right.name}</span>
                </div>

                <h1 className="max-w-6xl text-[42px] font-black leading-[1.2] tracking-[-0.5px] text-[#0f172a] xl:text-[48px]">
                  {left.name_en || left.name} vs {right.name_en || right.name}: Which Broker Is Better?
                </h1>

                <p className="mt-4 max-w-6xl text-base leading-8 text-slate-600 xl:text-lg xl:leading-9">
                  A detailed comparison between <strong>{left.name_en || left.name}</strong>{" "}
                  and <strong>{right.name_en || right.name}</strong> covering spreads,
                  fees, regulation, Islamic accounts, trading platforms, deposits,
                  withdrawals, and account types to help you choose the better broker.
                </p>

                <div className="mt-7 grid max-w-6xl grid-cols-3 gap-4">
                  <div className="rounded-[22px] border border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-5 py-4 shadow-sm">
                    <div className="text-xs font-black text-[#2563eb]">Quick Winner</div>
                    <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
                      {overallWinner}
                    </div>
                    <div className="mt-1 text-xs font-bold text-slate-500">
                      Best overall rating in this comparison
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <div className="text-xs font-black text-slate-500">Best for Beginners</div>
                    <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
                      {beginnerWinner}
                    </div>
                    <div className="mt-1 text-xs font-bold text-slate-500">
                      Based on ease of start and account access
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <div className="text-xs font-black text-slate-500">Best for Spreads</div>
                    <div className="mt-1 truncate text-xl font-black text-[#0f172a]">
                      {scalpingWinner}
                    </div>
                    <div className="mt-1 text-xs font-bold text-slate-500">
                      More relevant for cost and execution
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop / Tablet */}
          <div className="hidden md:block">
            <div className="rounded-[34px] border border-[#dbeafe] bg-white p-6 shadow-[0_24px_70px_rgba(37,99,235,0.10)] lg:p-8">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_110px_1fr]">
                {[left, right].map((broker) => {
                  const brokerName = broker.name_en || broker.name;
                  const isWinner = overallWinner === brokerName;

                  return (
                    <div
                      key={broker.slug}
                      className={`relative overflow-hidden rounded-[30px] border p-6 transition ${
                        isWinner
                          ? "scale-[1.015] border-[#3b82f6] bg-gradient-to-b from-[#e0edff] to-white shadow-[0_20px_50px_rgba(37,99,235,0.18)]"
                          : "border-slate-200 bg-white shadow-sm"
                      }`}
                    >
                      {isWinner && (
                        <>
                          <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-2 ring-[#3b82f6]/30" />
                          <div className="absolute right-4 top-4 rounded-full bg-[#2563eb] px-3 py-1 text-[11px] font-black text-white shadow-sm">
                            Best Overall
                          </div>
                        </>
                      )}

                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="truncate text-3xl font-black text-[#0f172a]">
                            {brokerName}
                          </h2>

                          <p className="mt-2 text-sm font-bold text-[#2563eb]">
                            {cleanText(broker.best_for_en || broker.best_for) ||
                              "Suitable for multiple trader profiles"}
                          </p>
                        </div>

                        <div className="flex h-[76px] w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#2563eb] shadow-sm">
                          <span className="text-2xl font-black">
                            {broker.rating?.toFixed(1) ?? "—"}
                          </span>
                          <span className="text-[10px] font-bold">out of 5</span>
                        </div>
                      </div>

                      <div className="mt-6 flex h-[138px] items-center justify-center rounded-[26px] border border-slate-200 bg-[#fbfdff] p-6">
                        {broker.logo ? (
                          <img
                            src={broker.logo}
                            alt={brokerName || "Broker logo"}
                            className="h-[96px] w-full object-contain"
                          />
                        ) : (
                          <div className="text-xl font-black text-slate-300">
                            {brokerName}
                          </div>
                        )}
                      </div>

                      <div className="mt-5 space-y-3">
                        {broker.key_strength_en && (
                          <div className="rounded-2xl bg-[#ecfdf5] px-4 py-3">
                            <div className="text-xs font-black text-[#059669]">Key Strength</div>
                            <div className="mt-1 text-sm font-black text-[#064e3b]">
                              {broker.key_strength_en}
                            </div>
                          </div>
                        )}

                        {broker.key_weakness_en && (
                          <div className="rounded-2xl bg-[#fff7ed] px-4 py-3">
                            <div className="text-xs font-black text-[#ea580c]">Important Note</div>
                            <div className="mt-1 text-sm font-black text-[#7c2d12]">
                              {broker.key_weakness_en}
                            </div>
                          </div>
                        )}

                        {broker.expert_insight_en && (
                          <div className="rounded-2xl bg-[#f8fafc] px-4 py-3">
                            <div className="text-xs font-black text-slate-500">Broker AlArab View</div>
                            <div className="mt-1 text-sm font-medium leading-6 text-[#0f172a]">
                              {broker.expert_insight_en}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <a
                          href={`/go/${broker.slug ?? ""}?type=real`}
                          className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-black text-white transition hover:bg-[#1d4ed8]"
                        >
                          Start Now
                        </a>

                        <Link
                          href={`/en/brokers/${broker.slug ?? ""}`}
                          className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  );
                }).reduce((acc, card, index) => {
                  if (index === 1) {
                    acc.push(
                      <div key="center-vs" className="flex flex-col items-center justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-2xl font-black text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
                          VS
                        </div>
                      </div>
                    );
                  }
                  acc.push(card);
                  return acc;
                }, [] as React.ReactNode[])}
              </div>
            </div>
          </div>

          {/* Mobile version */}
          <div className="md:hidden">
            <div className="overflow-hidden rounded-[30px] border border-[#dbeafe] bg-white shadow-[0_20px_60px_rgba(37,99,235,0.08)]">
              <div className="relative overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-4 pb-4 pt-5">
                <div className="absolute inset-x-0 top-0 h-1 bg-[#2563eb]" />

                <div className="inline-flex rounded-full border border-[#bfdbfe] bg-white px-3 py-1 text-[11px] font-black text-[#2563eb]">
                  Broker Comparison
                </div>

                <h1 className="mt-3 text-[27px] font-black leading-[1.25] tracking-[-0.3px] text-[#0f172a]">
                  {left.name_en || left.name} vs {right.name_en || right.name}: Which Is Better?
                </h1>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  A quick comparison between {left.name_en || left.name} and{" "}
                  {right.name_en || right.name} across rating, deposit, Islamic account,
                  platforms, and spreads.
                </p>

                <div className="mt-4 rounded-[22px] border border-[#bfdbfe] bg-white p-4 shadow-sm">
                  <div className="text-[11px] font-black text-[#2563eb]">
                    Quick Recommendation
                  </div>

                  <div className="mt-1 text-2xl font-black text-[#0f172a]">
                    {overallWinner}
                  </div>

                  <p className="mt-1 text-xs leading-6 text-slate-600">
                    Best overall based on rating, usability, fees, and account access.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-y border-[#dbeafe] bg-[#f8fbff] p-3">
                <div className="rounded-2xl bg-white px-2 py-2.5 text-center shadow-sm">
                  <div className="text-[10px] font-bold text-slate-500">Overall</div>
                  <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
                    {overallWinner}
                  </div>
                </div>

                <div className="rounded-2xl bg-white px-2 py-2.5 text-center shadow-sm">
                  <div className="text-[10px] font-bold text-slate-500">Beginners</div>
                  <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
                    {beginnerWinner}
                  </div>
                </div>

                <div className="rounded-2xl bg-white px-2 py-2.5 text-center shadow-sm">
                  <div className="text-[10px] font-bold text-slate-500">Spreads</div>
                  <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
                    {scalpingWinner}
                  </div>
                </div>
              </div>

              <div className="space-y-3 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4">
                {[left, right].map((broker) => {
                  const brokerName = broker.name_en || broker.name;
                  const isWinner = overallWinner === brokerName;

                  return (
                    <div
                      key={broker.slug}
                      className={`rounded-[28px] border p-3 ${
                        isWinner
                          ? "border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_14px_35px_rgba(37,99,235,0.14)]"
                          : "border-slate-200 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.05)]"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          {isWinner && (
                            <div className="mb-1.5 inline-flex rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-black text-white shadow-sm">
                              Best Overall
                            </div>
                          )}

                          <h2 className="truncate text-2xl font-black leading-tight text-[#0f172a]">
                            {brokerName}
                          </h2>

                          <p className="mt-1 line-clamp-1 text-xs font-bold text-[#2563eb]">
                            {cleanText(broker.best_for_en || broker.best_for) ||
                              "Suitable for multiple trader profiles"}
                          </p>
                        </div>

                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#2563eb] shadow-sm">
                          <span className="text-lg font-black">
                            {broker.rating?.toFixed(1) ?? "—"}
                          </span>
                          <span className="text-[10px] font-bold">out of 5</span>
                        </div>
                      </div>

                      <div className="flex h-[82px] items-center justify-center rounded-[22px] border border-slate-200 bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                        {broker.logo ? (
                          <img
                            src={broker.logo}
                            alt={brokerName || "Broker logo"}
                            className="h-[58px] w-full object-contain"
                          />
                        ) : (
                          <div className="text-base font-black text-slate-300">
                            {brokerName}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                          <div className="text-[10px] font-bold text-slate-500">
                            Minimum Deposit
                          </div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {money(broker.min_deposit)}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                          <div className="text-[10px] font-bold text-slate-500">
                            Islamic Account
                          </div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {yesNoEnglish(broker.islamic_account)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                        <div className="text-[10px] font-bold text-slate-500">
                          Trading Platforms
                        </div>
                        <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
                          {shortPlatforms(broker.platforms)}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <a
                          href={`/go/${broker.slug ?? ""}?type=real`}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-2.5 text-sm font-black text-white shadow-sm transition active:scale-[0.98]"
                        >
                          Start Now
                        </a>

                        <Link
                          href={`/en/brokers/${broker.slug ?? ""}`}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-800 transition active:scale-[0.98]"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>


<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_22px_65px_rgba(37,99,235,0.08)]">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop version */}
    <div className="hidden p-6 lg:block lg:p-8">
      <div className="max-w-5xl">
        <span className="text-sm font-black text-[#2563eb]">Final Verdict</span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          Which broker is better: {left.name_en || left.name} or {right.name_en || right.name}?
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          This quick verdict helps you choose the broker that fits your trading style,
          whether you are a beginner, focused on lower costs, or looking for the stronger
          overall profile.
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative overflow-hidden rounded-[26px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_16px_40px_rgba(37,99,235,0.14)]">
          <div className="absolute right-4 top-4 rounded-full bg-[#2563eb] px-3 py-1 text-[11px] font-black text-white">
            Winner
          </div>
          <div className="text-xs font-black text-[#2563eb]">Best Overall</div>
          <div className="mt-3 truncate text-3xl font-black text-[#0f172a]">
            {overallWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Best balance between rating, trust, fees, and ease of use.
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-black text-slate-500">Best for Beginners</div>
          <div className="mt-3 truncate text-3xl font-black text-[#0f172a]">
            {beginnerWinner === "Tie" ? "Very Close" : beginnerWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Better for traders who want a simpler and easier start.
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-black text-slate-500">Best for Spreads</div>
          <div className="mt-3 truncate text-3xl font-black text-[#0f172a]">
            {scalpingWinner === "Tie" ? "Very Close" : scalpingWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            More relevant for traders focused on cost and execution.
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-black text-slate-500">Best Entry Cost</div>
          <div className="mt-3 truncate text-3xl font-black text-[#0f172a]">
            {depositWinner === "Tie" ? "Very Close" : depositWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Better for traders who want to start with a lower deposit.
          </p>
        </div>
      </div>

      <div className="mt-7 rounded-[28px] border border-[#dbeafe] bg-[#f8fbff] p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <div className="text-sm font-black text-[#2563eb]">Quick Summary</div>
            <p className="mt-2 text-sm leading-8 text-slate-700 lg:text-base">
              If you want the stronger overall broker based on rating, trust, fees,
              and usability, <strong>{overallWinner}</strong> looks like the stronger
              option here. For beginners, <strong>{beginnerWinner}</strong> may offer
              an easier start. If your focus is lower spreads and active trading
              conditions, <strong>{scalpingWinner}</strong> looks more relevant.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={`/go/${left.slug ?? ""}?type=real`}
              className={`inline-flex min-h-[50px] items-center justify-center rounded-2xl px-6 py-3 text-sm font-black transition ${
                overallWinner === (left.name_en || left.name)
                  ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              Open Account with {left.name_en || left.name}
            </a>

            <a
              href={`/go/${right.slug ?? ""}?type=real`}
              className={`inline-flex min-h-[50px] items-center justify-center rounded-2xl px-6 py-3 text-sm font-black transition ${
                overallWinner === (right.name_en || right.name)
                  ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              Open Account with {right.name_en || right.name}
            </a>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Account opening is completed through the broker’s official website.
        </p>
      </div>
    </div>

    {/* Mobile version */}
    <div className="block p-4 lg:hidden">
      <div className="mb-4">
        <span className="text-xs font-black text-[#2563eb]">Final Verdict</span>

        <h2 className="mt-2 text-[26px] font-black leading-[1.25] text-[#0f172a]">
          Which broker is better: {left.name_en || left.name} or {right.name_en || right.name}?
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          A quick summary to help you choose the better broker based on your goal.
        </p>
      </div>

      <div className="rounded-[26px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-[0_14px_35px_rgba(37,99,235,0.14)]">
        <div className="inline-flex rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-black text-white">
          Overall Winner
        </div>

        <div className="mt-3 text-3xl font-black text-[#0f172a]">
          {overallWinner}
        </div>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          Best balance between rating, fees, trust, and usability.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-2xl border border-slate-200 bg-white px-2 py-3 text-center shadow-sm">
          <div className="text-[10px] font-bold text-slate-500">Beginners</div>
          <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
            {beginnerWinner === "Tie" ? "Close" : beginnerWinner}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-2 py-3 text-center shadow-sm">
          <div className="text-[10px] font-bold text-slate-500">Spreads</div>
          <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
            {scalpingWinner === "Tie" ? "Close" : scalpingWinner}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-2 py-3 text-center shadow-sm">
          <div className="text-[10px] font-bold text-slate-500">Deposit</div>
          <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
            {depositWinner === "Tie" ? "Close" : depositWinner}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[24px] border border-[#dbeafe] bg-[#f8fbff] p-4">
        <div className="text-xs font-black text-[#2563eb]">Quick Summary</div>

        <p className="mt-2 text-sm leading-7 text-slate-700">
          If you want the stronger overall choice,{" "}
          <strong>{overallWinner}</strong> looks more suitable here. For beginners,
          the closer choice is{" "}
          <strong>{beginnerWinner === "Tie" ? "both brokers" : beginnerWinner}</strong>.
          For lower spreads and active trading,{" "}
          <strong>{scalpingWinner === "Tie" ? "the lower-cost account type" : scalpingWinner}</strong>{" "}
          looks more relevant.
        </p>
      </div>

      <div className="mt-4 grid gap-2">
        <a
          href={`/go/${overallWinner === (left.name_en || left.name) ? left.slug ?? "" : right.slug ?? ""}?type=real`}
          className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-black text-white shadow-sm"
        >
          Open Account with {overallWinner}
        </a>

        <Link
          href={`/en/brokers/${overallWinner === (left.name_en || left.name) ? left.slug ?? "" : right.slug ?? ""}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800"
        >
          Read {overallWinner} Review
        </Link>
      </div>

      <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
        Account opening is completed through the broker’s official website.
      </p>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop version */}
    <div className="hidden p-6 md:block lg:p-8">
      <div className="max-w-5xl">
        <span className="text-sm font-black text-[#2563eb]">Score Analysis</span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          Strength Analysis Between {left.name_en || left.name} and {right.name_en || right.name}
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          A clear visual comparison showing where each broker performs better in safety,
          fees, platforms, deposits and withdrawals, and customer support.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-4 py-2 text-sm font-black text-[#2563eb]">
          Best Overall: {overallWinner}
        </span>

        <span className="rounded-full border border-slate-200 bg-gradient-to-b from-[#eff6ff] to-white px-4 py-2 text-sm font-black text-slate-600">
          Best for Beginners: {beginnerWinner === "Tie" ? "Very Close" : beginnerWinner}
        </span>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {[
          {
            label: "Safety & Trust",
            leftScore: left.score_safety ?? 0,
            rightScore: right.score_safety ?? 0,
            note: "Reflects regulation strength and client fund protection.",
          },
          {
            label: "Fees & Costs",
            leftScore: left.score_fees ?? 0,
            rightScore: right.score_fees ?? 0,
            note: "Measures spreads, trading costs, and general fees.",
          },
          {
            label: "Trading Platforms",
            leftScore: left.score_platforms ?? 0,
            rightScore: right.score_platforms ?? 0,
            note: "Based on platform quality and available trading tools.",
          },
          {
            label: "Deposits & Withdrawals",
            leftScore: left.score_deposit ?? 0,
            rightScore: right.score_deposit ?? 0,
            note: "Focuses on funding options and withdrawal convenience.",
          },
          {
            label: "Support & Customer Service",
            leftScore: left.score_support ?? 0,
            rightScore: right.score_support ?? 0,
            note: "Compares support quality and overall user experience.",
          },
        ].map((item) => {
          const winner =
            item.leftScore > item.rightScore
              ? left.name_en || left.name
              : item.rightScore > item.leftScore
              ? right.name_en || right.name
              : "Tie";

          const diff = Math.abs(item.leftScore - item.rightScore);
          const isClose = diff < 0.3;

          return (
            <div
              key={item.label}
              className={`rounded-[28px] border border-slate-200 bg-[#f8fbff] p-5 shadow-sm ${
                item.label === "Support & Customer Service" ? "lg:col-span-2" : ""
              }`}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.note}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-4 py-1.5 text-[12px] font-black shadow-sm ${
                    winner !== "Tie" && !isClose
                      ? "border border-[#bfdbfe] bg-white text-[#2563eb]"
                      : "border border-slate-200 bg-slate-50 text-slate-500"
                  }`}
                >
                  {winner === "Tie"
                    ? "Very Close"
                    : diff < 0.2
                    ? "Very Close"
                    : diff < 0.5
                    ? "Small Edge"
                    : `Better: ${winner}`}
                </span>
              </div>

              <div className="grid gap-3">
                <div
                  className={`rounded-2xl border px-4 py-3 ${
                    winner === (left.name_en || left.name) && !isClose
                      ? "border-[#2563eb] bg-white shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-black text-[#0f172a]">
                      {left.name_en || left.name}
                    </span>

                    <span className="text-xl font-black text-[#2563eb]">
                      {item.leftScore.toFixed(1)}
                      <span className="text-xs text-slate-400"> / 5</span>
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#2563eb]/70"
                      style={{ width: `${Math.min(item.leftScore * 20, 100)}%` }}
                    />
                  </div>
                </div>

                <div
                  className={`rounded-2xl border px-4 py-3 ${
                    winner === (right.name_en || right.name) && !isClose
                      ? "border-[#2563eb] bg-white shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-black text-[#0f172a]">
                      {right.name_en || right.name}
                    </span>

                    <span className="text-xl font-black text-[#2563eb]">
                      {item.rightScore.toFixed(1)}
                      <span className="text-xs text-slate-400"> / 5</span>
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#2563eb]/70"
                      style={{ width: `${Math.min(item.rightScore * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[26px] border border-[#dbeafe] bg-[#f8fbff] p-5">
        <p className="text-sm leading-7 text-slate-600 lg:text-base">
          These scores do not mean one broker is the best for everyone. They help you
          understand where each broker performs better depending on your priority:
          safety, costs, platforms, deposits and withdrawals, or customer support.
        </p>
      </div>
    </div>

    {/* Mobile version */}
<div className="block p-4 md:hidden">
  <div>
    <span className="text-xs font-black text-[#2563eb]">Score Analysis</span>

    <h2 className="mt-2 text-[26px] font-black leading-[1.25] text-[#0f172a]">
      Strength Analysis Between {left.name_en || left.name} and {right.name_en || right.name}
    </h2>

    <p className="mt-2 text-sm leading-7 text-slate-600">
      A visual summary showing where each broker performs better in safety, fees,
      platforms, deposits and withdrawals, and support.
    </p>
  </div>

  <div className="mt-4 flex flex-wrap gap-2">
    <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1.5 text-[11px] font-black text-[#2563eb]">
      Best Overall: {overallWinner}
    </span>

    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-slate-600">
      Beginners: {beginnerWinner === "Tie" ? "Very Close" : beginnerWinner}
    </span>
  </div>

  <div className="mt-5 space-y-3">
    {[
      {
        label: "Safety & Trust",
        leftScore: left.score_safety ?? 0,
        rightScore: right.score_safety ?? 0,
        note: "Reflects regulation strength and client fund protection.",
      },
      {
        label: "Fees & Costs",
        leftScore: left.score_fees ?? 0,
        rightScore: right.score_fees ?? 0,
        note: "Measures spreads, trading costs, and general fees.",
      },
      {
        label: "Trading Platforms",
        leftScore: left.score_platforms ?? 0,
        rightScore: right.score_platforms ?? 0,
        note: "Based on platform quality and available trading tools.",
      },
      {
        label: "Deposits & Withdrawals",
        leftScore: left.score_deposit ?? 0,
        rightScore: right.score_deposit ?? 0,
        note: "Focuses on funding options and withdrawal convenience.",
      },
      {
        label: "Support & Customer Service",
        leftScore: left.score_support ?? 0,
        rightScore: right.score_support ?? 0,
        note: "Compares support quality and overall user experience.",
      },
    ].map((item) => {
      const winner =
        item.leftScore > item.rightScore
          ? left.name_en || left.name
          : item.rightScore > item.leftScore
          ? right.name_en || right.name
          : "Tie";

      const diff = Math.abs(item.leftScore - item.rightScore);
      const isClose = diff < 0.3;

      return (
        <div
          key={item.label}
          className="rounded-[28px] border border-slate-200 bg-[#f8fbff] p-4 shadow-sm"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-[#0f172a]">
                {item.label}
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.note}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-black shadow-sm ${
                winner !== "Tie" && !isClose
                  ? "border border-[#bfdbfe] bg-white text-[#2563eb]"
                  : "border border-slate-200 bg-slate-50 text-slate-500"
              }`}
            >
              {winner === "Tie"
                ? "Close"
                : diff < 0.2
                ? "Close"
                : diff < 0.5
                ? "Small Edge"
                : `Better: ${winner}`}
            </span>
          </div>

          <div className="grid gap-3">
            <div
              className={`rounded-2xl border px-4 py-3 ${
                winner === (left.name_en || left.name) && !isClose
                  ? "border-[#2563eb] bg-white shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-black text-[#0f172a]">
                  {left.name_en || left.name}
                </span>

                <span className="text-lg font-black text-[#2563eb]">
                  {item.leftScore.toFixed(1)}
                  <span className="text-xs text-slate-400"> / 5</span>
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#2563eb]/70"
                  style={{ width: `${Math.min(item.leftScore * 20, 100)}%` }}
                />
              </div>
            </div>

            <div
              className={`rounded-2xl border px-4 py-3 ${
                winner === (right.name_en || right.name) && !isClose
                  ? "border-[#2563eb] bg-white shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-black text-[#0f172a]">
                  {right.name_en || right.name}
                </span>

                <span className="text-lg font-black text-[#2563eb]">
                  {item.rightScore.toFixed(1)}
                  <span className="text-xs text-slate-400"> / 5</span>
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#2563eb]/70"
                  style={{ width: `${Math.min(item.rightScore * 20, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>

  <div className="mt-5 rounded-[24px] border border-[#dbeafe] bg-[#f8fbff] p-4">
    <p className="text-sm leading-7 text-slate-600">
      These scores help you understand where each broker performs better depending
      on your priority: safety, costs, platforms, deposits and withdrawals, or support.
    </p>
  </div>
</div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop version */}
    <div className="hidden p-6 md:block lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <span className="text-sm font-black text-[#2563eb]">
            Accounts & Trading Costs
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
            Account and Fee Comparison Between {left.name_en || left.name} and {right.name_en || right.name}
          </h2>

          <p className="mt-3 text-base leading-8 text-slate-600">
            This section summarizes the main cost factors when choosing an account:
            minimum deposit, average spread, trading commissions, and execution method.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
          <div className="text-xs font-black text-[#2563eb]">Quick Summary</div>
          <div className="mt-2 text-3xl font-black text-[#0f172a]">
            {scalpingWinner === "Tie" ? "Costs Are Close" : scalpingWinner}
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {scalpingWinner === "Tie"
              ? "There is no clear cost winner from the current data, so the account type becomes the most important factor."
              : `${scalpingWinner} looks stronger in terms of cost or spreads based on the available data.`}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
          <div className="text-xs font-black text-slate-500">Available Accounts</div>
          <div className="mt-3 flex items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold text-[#2563eb]">{left.name_en || left.name}</div>
              <div className="text-3xl font-black text-[#0f172a]">
                {leftAccounts.length}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-[#2563eb]">{right.name_en || right.name}</div>
              <div className="text-3xl font-black text-[#0f172a]">
                {rightAccounts.length}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
          <div className="text-xs font-black text-slate-500">Best for Beginners</div>
          <div className="mt-3 text-2xl font-black text-[#0f172a]">
            {beginnerWinner === "Tie" ? "Very Close" : beginnerWinner}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Based on ease of entry, minimum deposit, and account clarity.
          </p>
        </div>

        <div className="rounded-[24px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5">
          <div className="text-xs font-black text-[#2563eb]">Important Before Choosing</div>
          <div className="mt-3 text-lg font-black leading-7 text-[#0f172a]">
            The right account matters more than the number of accounts.
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-[#fbfdff]">
        <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-200 bg-[#f8fbff] text-sm font-black text-[#0f172a]">
          <div className="p-4 text-left">Key Cost Factors</div>
          <div className="border-x border-slate-200 p-4 text-center">{left.name_en || left.name}</div>
          <div className="p-4 text-center">{right.name_en || right.name}</div>
        </div>

        {[
          {
            label: "Main Account Type",
            leftValue: leftAccounts[0]?.account_name_en || leftAccounts[0]?.account_name || "Not specified",
            rightValue: rightAccounts[0]?.account_name_en || rightAccounts[0]?.account_name || "Not specified",
          },
          {
            label: "Minimum Deposit",
            leftValue:
              leftAccounts.find((a) => cleanText(a.min_deposit_en || a.min_deposit))?.min_deposit_en ||
              leftAccounts.find((a) => cleanText(a.min_deposit))?.min_deposit ||
              money(left.min_deposit),
            rightValue:
              rightAccounts.find((a) => cleanText(a.min_deposit_en || a.min_deposit))?.min_deposit_en ||
              rightAccounts.find((a) => cleanText(a.min_deposit))?.min_deposit ||
              money(right.min_deposit),
          },
          {
            label: "Average Spread",
            leftValue:
              leftAccounts.find((a) => cleanText(a.spread_en || a.spread))?.spread_en ||
              leftAccounts.find((a) => cleanText(a.spread))?.spread ||
              cleanText(left.spreads_en || left.spreads) ||
              "Not specified",
            rightValue:
              rightAccounts.find((a) => cleanText(a.spread_en || a.spread))?.spread_en ||
              rightAccounts.find((a) => cleanText(a.spread))?.spread ||
              cleanText(right.spreads_en || right.spreads) ||
              "Not specified",
          },
          {
            label: "Trading Commission",
            leftValue:
              leftAccounts.find((a) => cleanText(a.commission_en || a.commission))?.commission_en ||
              leftAccounts.find((a) => cleanText(a.commission))?.commission ||
              cleanText(left.fees_en || left.fees) ||
              "Not specified",
            rightValue:
              rightAccounts.find((a) => cleanText(a.commission_en || a.commission))?.commission_en ||
              rightAccounts.find((a) => cleanText(a.commission))?.commission ||
              cleanText(right.fees_en || right.fees) ||
              "Not specified",
          },
          {
            label: "Execution Method",
            leftValue:
              leftAccounts.find((a) => cleanText(a.execution_type_en || a.execution_type))?.execution_type_en ||
              leftAccounts.find((a) => cleanText(a.execution_type))?.execution_type ||
              "Not specified",
            rightValue:
              rightAccounts.find((a) => cleanText(a.execution_type_en || a.execution_type))?.execution_type_en ||
              rightAccounts.find((a) => cleanText(a.execution_type))?.execution_type ||
              "Not specified",
          },
        ].map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-200 last:border-b-0"
          >
            <div className="p-4 text-sm font-black text-slate-600">
              {row.label}
            </div>
            <div className="border-x border-slate-200 p-4 text-center text-sm font-black text-[#0f172a]">
              {row.leftValue}
            </div>
            <div className="p-4 text-center text-sm font-black text-[#0f172a]">
              {row.rightValue}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        {[left, right].map((broker) => {
          const brokerAccounts = broker.id === left.id ? leftAccounts : rightAccounts;
          const brokerName = broker.name_en || broker.name;

          return (
            <details
              key={broker.slug}
              className="group rounded-[28px] border border-slate-200 bg-[#f8fbff] p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-[#0f172a]">
                    {brokerName} Accounts
                  </h3>
                  <p className="mt-1 text-sm font-bold text-[#2563eb]">
                    {brokerAccounts.length} available account{brokerAccounts.length === 1 ? "" : "s"}
                  </p>
                </div>

                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-500 transition group-open:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="mt-5 grid gap-4">
                {brokerAccounts.length > 0 ? (
                  brokerAccounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-4">
                        <h4 className="text-lg font-black text-[#0f172a]">
                          {acc.account_name_en || acc.account_name || "Account"}
                        </h4>
                        <p className="mt-1 text-xs font-bold text-[#2563eb]">
                          {acc.best_for_en || acc.best_for || "Suitable for multiple trader profiles"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">Spread</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {acc.spread_en || acc.spread || "Not specified"}
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">Commission</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {acc.commission_en || acc.commission || "Not specified"}
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">Deposit</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {acc.min_deposit_en || acc.min_deposit || "Not specified"}
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
                          <div className="text-[11px] font-bold text-slate-500">Execution</div>
                          <div className="mt-1 text-sm font-black text-[#0f172a]">
                            {acc.execution_type_en || acc.execution_type || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    No account data is currently available.
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>

      <div className="mt-6 rounded-[28px] border border-[#2563eb]/20 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-6 shadow-[0_20px_50px_rgba(37,99,235,0.08)] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-black text-[#0f172a] sm:text-2xl">
              Start trading with the broker that fits you best
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              After reviewing account types and costs, you can open an account directly
              with the broker that better fits your trading style.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/go/${left.slug}`}
              className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-7 py-3 text-sm font-extrabold text-white shadow-md transition hover:scale-[1.02] hover:bg-[#1d4ed8]"
            >
              Open {left.name_en || left.name} Account
            </Link>

            <Link
              href={`/go/${right.slug}`}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
            >
              Open {right.name_en || right.name} Account
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-7 rounded-[26px] border border-[#dbeafe] bg-[#f8fbff] p-5">
        <p className="text-sm leading-7 text-slate-600 lg:text-base">
          This section summarizes trading costs in a practical way. The number of accounts
          alone is not enough to judge a broker; what matters most is choosing the account
          that matches your needs in terms of spreads, commission, minimum deposit, and execution.
        </p>
      </div>
    </div>

    {/* Mobile version */}
    <div className="block p-4 md:hidden">
      <div>
        <span className="text-xs font-black text-[#2563eb]">
          Accounts & Trading Costs
        </span>

        <h2 className="mt-2 text-[26px] font-black leading-[1.25] text-[#0f172a]">
          Account and Fee Comparison
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          A quick summary of the main cost factors between {left.name_en || left.name} and {right.name_en || right.name}.
        </p>
      </div>

      <div className="mt-4 rounded-[24px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-[0_12px_28px_rgba(37,99,235,0.12)]">
        <div className="text-[11px] font-black text-[#2563eb]">
          Quick Summary
        </div>

        <div className="mt-1 text-2xl font-black text-[#0f172a]">
          {scalpingWinner === "Tie" ? "Costs Are Close" : scalpingWinner}
        </div>

        <p className="mt-1 text-xs leading-6 text-slate-600">
          {scalpingWinner === "Tie"
            ? "There is no clear cost winner; the account type is the key factor."
            : `${scalpingWinner} looks stronger in terms of cost or spreads.`}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] px-2 py-3 text-center">
          <div className="text-[10px] font-bold text-slate-500">
            {left.name_en || left.name} Accounts
          </div>
          <div className="mt-1 text-xl font-black text-[#0f172a]">
            {leftAccounts.length}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] px-2 py-3 text-center">
          <div className="text-[10px] font-bold text-slate-500">
            {right.name_en || right.name} Accounts
          </div>
          <div className="mt-1 text-xl font-black text-[#0f172a]">
            {rightAccounts.length}
          </div>
        </div>

        <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] px-2 py-3 text-center">
          <div className="text-[10px] font-bold text-[#2563eb]">Beginners</div>
          <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
            {beginnerWinner === "Tie" ? "Very Close" : beginnerWinner}
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[24px] border border-[#dbeafe]">
        <div className="grid grid-cols-[1.15fr_1fr_1fr] bg-[#f8fbff] text-[11px] font-black text-[#0f172a]">
          <div className="p-3 text-left">Factor</div>
          <div className="border-x border-[#dbeafe] p-3 text-center">
            {left.name_en || left.name}
          </div>
          <div className="p-3 text-center">{right.name_en || right.name}</div>
        </div>

        {[
          {
            label: "Main Account",
            leftValue: leftAccounts[0]?.account_name_en || leftAccounts[0]?.account_name || "Not specified",
            rightValue: rightAccounts[0]?.account_name_en || rightAccounts[0]?.account_name || "Not specified",
          },
          {
            label: "Min Deposit",
            leftValue:
              leftAccounts.find((a) => cleanText(a.min_deposit_en || a.min_deposit))?.min_deposit_en ||
              leftAccounts.find((a) => cleanText(a.min_deposit))?.min_deposit ||
              money(left.min_deposit),
            rightValue:
              rightAccounts.find((a) => cleanText(a.min_deposit_en || a.min_deposit))?.min_deposit_en ||
              rightAccounts.find((a) => cleanText(a.min_deposit))?.min_deposit ||
              money(right.min_deposit),
          },
          {
            label: "Spread",
            leftValue:
              leftAccounts.find((a) => cleanText(a.spread_en || a.spread))?.spread_en ||
              leftAccounts.find((a) => cleanText(a.spread))?.spread ||
              cleanText(left.spreads_en || left.spreads) ||
              "Not specified",
            rightValue:
              rightAccounts.find((a) => cleanText(a.spread_en || a.spread))?.spread_en ||
              rightAccounts.find((a) => cleanText(a.spread))?.spread ||
              cleanText(right.spreads_en || right.spreads) ||
              "Not specified",
          },
          {
            label: "Commission",
            leftValue:
              leftAccounts.find((a) => cleanText(a.commission_en || a.commission))?.commission_en ||
              leftAccounts.find((a) => cleanText(a.commission))?.commission ||
              cleanText(left.fees_en || left.fees) ||
              "Not specified",
            rightValue:
              rightAccounts.find((a) => cleanText(a.commission_en || a.commission))?.commission_en ||
              rightAccounts.find((a) => cleanText(a.commission))?.commission ||
              cleanText(right.fees_en || right.fees) ||
              "Not specified",
          },
          {
            label: "Execution",
            leftValue:
              leftAccounts.find((a) => cleanText(a.execution_type_en || a.execution_type))?.execution_type_en ||
              leftAccounts.find((a) => cleanText(a.execution_type))?.execution_type ||
              "Not specified",
            rightValue:
              rightAccounts.find((a) => cleanText(a.execution_type_en || a.execution_type))?.execution_type_en ||
              rightAccounts.find((a) => cleanText(a.execution_type))?.execution_type ||
              "Not specified",
          },
        ].map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[1.15fr_1fr_1fr] border-t border-[#dbeafe] text-[11px]"
          >
            <div className="bg-[#fbfdff] p-3 font-black text-slate-600">
              {row.label}
            </div>

            <div className="border-x border-[#dbeafe] p-3 text-center font-black text-[#0f172a]">
              {row.leftValue}
            </div>

            <div className="p-3 text-center font-black text-[#0f172a]">
              {row.rightValue}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3">
        {[left, right].map((broker) => {
          const brokerAccounts = broker.id === left.id ? leftAccounts : rightAccounts;
          const brokerName = broker.name_en || broker.name;

          return (
            <details
              key={broker.slug}
              className="group rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">
                    {brokerName} Accounts
                  </h3>

                  <p className="mt-1 text-xs font-bold text-[#2563eb]">
                    {brokerAccounts.length} available account{brokerAccounts.length === 1 ? "" : "s"}
                  </p>
                </div>

                <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-500 transition group-open:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="mt-4 grid gap-3">
                {brokerAccounts.length > 0 ? (
                  brokerAccounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="rounded-[20px] border border-slate-200 bg-white p-4"
                    >
                      <div className="text-sm font-black text-[#0f172a]">
                        {acc.account_name_en || acc.account_name || "Account"}
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-xl bg-[#fbfdff] p-3">
                          <div className="font-bold text-slate-500">Spread</div>
                          <div className="mt-1 font-black text-[#0f172a]">
                            {acc.spread_en || acc.spread || "Not specified"}
                          </div>
                        </div>

                        <div className="rounded-xl bg-[#fbfdff] p-3">
                          <div className="font-bold text-slate-500">Commission</div>
                          <div className="mt-1 font-black text-[#0f172a]">
                            {acc.commission_en || acc.commission || "Not specified"}
                          </div>
                        </div>

                        <div className="rounded-xl bg-[#fbfdff] p-3">
                          <div className="font-bold text-slate-500">Deposit</div>
                          <div className="mt-1 font-black text-[#0f172a]">
                            {acc.min_deposit_en || acc.min_deposit || "Not specified"}
                          </div>
                        </div>

                        <div className="rounded-xl bg-[#fbfdff] p-3">
                          <div className="font-bold text-slate-500">Execution</div>
                          <div className="mt-1 font-black text-[#0f172a]">
                            {acc.execution_type_en || acc.execution_type || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[18px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    No account data is currently available.
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>

      <div className="mt-4 rounded-[24px] border border-[#2563eb]/20 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-4">
        <h3 className="text-lg font-black text-[#0f172a]">
          Start with the broker that fits you best
        </h3>

        <p className="mt-1 text-xs leading-6 text-slate-600">
          After reviewing accounts and costs, choose the broker that better matches your trading style.
        </p>

        <div className="mt-4 grid gap-2">
          <Link
            href={`/go/${left.slug}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-black text-white shadow-sm"
          >
            Open {left.name_en || left.name} Account
          </Link>

          <Link
            href={`/go/${right.slug}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800"
          >
            Open {right.name_en || right.name} Account
          </Link>
        </div>
      </div>

      <div className="mt-4 rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-4">
        <p className="text-sm leading-7 text-slate-600">
          The most important factor is not only the number of accounts, but choosing
          the account that fits your needs in terms of spread, commission, minimum
          deposit, and execution method.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop */}
    <div className="hidden p-6 md:block lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <span className="text-sm font-black text-[#2563eb]">
            Safety & Regulation
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
            Safety Comparison: {left.name_en || left.name} vs {right.name_en || right.name}
          </h2>

          <p className="mt-3 text-base leading-8 text-slate-600">
            This section evaluates broker safety based on regulation strength, investor protection,
            company transparency, and whether an Islamic account is available.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
          <div className="text-xs font-black text-[#2563eb]">
            Stronger in Safety
          </div>

          <div className="mt-2 text-3xl font-black text-[#0f172a]">
            {(left.score_safety ?? 0) > (right.score_safety ?? 0)
              ? left.name_en || left.name
              : (right.score_safety ?? 0) > (left.score_safety ?? 0)
              ? right.name_en || right.name
              : "Very Close"}
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Based on regulation strength, transparency, and available protection mechanisms.
          </p>
        </div>
      </div>

      {/* Scores */}
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
          <div className="text-xs font-black text-slate-500">Safety Score</div>

          <div className="mt-3 flex items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold text-[#2563eb]">{left.name_en || left.name}</div>
              <div className="text-3xl font-black text-[#0f172a]">
                {(left.score_safety ?? 0).toFixed(1)}
                <span className="text-sm text-slate-400"> / 5</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#2563eb]">{right.name_en || right.name}</div>
              <div className="text-3xl font-black text-[#0f172a]">
                {(right.score_safety ?? 0).toFixed(1)}
                <span className="text-sm text-slate-400"> / 5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-[#f8fbff] p-5">
          <div className="text-xs font-black text-slate-500">Islamic Account</div>
          <div className="mt-3 text-lg font-black leading-7 text-[#0f172a]">
            {left.name_en || left.name}: {yesNoEnglish(left.islamic_account)}
            <br />
            {right.name_en || right.name}: {yesNoEnglish(right.islamic_account)}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5">
          <div className="text-xs font-black text-[#2563eb]">Important</div>
          <div className="mt-3 text-lg font-black leading-7 text-[#0f172a]">
            Always verify which regulatory entity your account will be opened under.
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {[left, right].map((broker) => {
          const brokerSafety = broker.score_safety ?? 0;
          const maxSafety = Math.max(left.score_safety ?? 0, right.score_safety ?? 0);
          const isWinner = brokerSafety === maxSafety && maxSafety > 0;

          return (
            <div
              key={broker.slug}
              className={`rounded-[30px] border p-5 shadow-sm ${
                isWinner
                  ? "border-[#2563eb] bg-gradient-to-b from-[#eff6ff] to-white"
                  : "border-slate-200 bg-[#fbfdff]"
              }`}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2">
                    {broker.logo ? (
                      <img src={broker.logo} className="h-full w-full object-contain" />
                    ) : null}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#0f172a]">
                      {broker.name_en || broker.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-[#2563eb]">
                      Safety & Trust
                    </p>
                  </div>
                </div>

                {isWinner && (
                  <span className="rounded-full bg-[#2563eb] px-3 py-1 text-[11px] font-black text-white">
                    Stronger
                  </span>
                )}
              </div>

              <div className="grid gap-3">
                <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                  <div className="text-sm font-black text-[#0f172a]">
                    Regulation
                  </div>
                  <p className="mt-2 text-sm font-black text-slate-700">
                    {shortReg(broker.regulation) || "Not specified"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                    <div className="text-xs font-black text-slate-500">
                      Headquarters
                    </div>
                    <div className="mt-2 text-sm font-black text-[#0f172a]">
                      {broker.headquarters_en || broker.headquarters || "Not specified"}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                    <div className="text-xs font-black text-slate-500">
                      Islamic Account
                    </div>
                    <div className="mt-2 text-sm font-black text-[#0f172a]">
                      {yesNoEnglish(broker.islamic_account)}
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-4">
                  <div className="text-sm font-black text-[#2563eb]">
                    Fund Protection
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Client fund protection depends on the regulatory entity and account type.
                    Always verify segregation, compensation schemes, and negative balance protection.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-7 rounded-[26px] border border-[#dbeafe] bg-[#f8fbff] p-5">
        <p className="text-sm leading-7 text-slate-600 lg:text-base">
          Regulation alone does not guarantee full protection. Always verify the legal entity,
          jurisdiction, and account conditions before opening a real account.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white p-6 shadow-[0_25px_70px_rgba(37,99,235,0.08)] lg:p-8">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    <div className="hidden gap-6 md:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div>
        <span className="text-sm font-black text-[#2563eb]">Quick Decision</span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          Which Broker Should You Choose Now?
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          Instead of reading the full comparison again, this practical summary helps you
          choose the better broker based on your trading goal.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
        <div className="text-xs font-black text-[#2563eb]">Overall Recommendation</div>
        <div className="mt-2 text-3xl font-black text-[#0f172a]">
          {overallWinner}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          The strongest overall choice based on the rating and comparison summary.
        </p>
      </div>
    </div>

    <div className="mt-8 hidden gap-4 md:grid lg:grid-cols-3">
      <div className="rounded-[26px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-sm">
        <div className="text-xs font-black text-[#2563eb]">Best Overall</div>
        <div className="mt-2 text-3xl font-black text-[#0f172a]">
          {overallWinner}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Best if you want a balanced choice without going too deep into every detail.
        </p>
      </div>

      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5 shadow-sm">
        <div className="text-xs font-black text-slate-500">For Beginners</div>
        <div className="mt-2 text-3xl font-black text-[#0f172a]">
          {beginnerWinner === "Tie" ? "Both Are Suitable" : beginnerWinner}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Best if your priority is an easy start and clear account options.
        </p>
      </div>

      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5 shadow-sm">
        <div className="text-xs font-black text-slate-500">For Costs & Spreads</div>
        <div className="mt-2 text-3xl font-black text-[#0f172a]">
          {scalpingWinner === "Tie" ? "Very Close" : scalpingWinner}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Best if your focus is spreads, fees, and execution speed.
        </p>
      </div>
    </div>

    <div className="mt-7 hidden rounded-[28px] border border-[#dbeafe] bg-[#f8fbff] p-5 md:block lg:p-6">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="text-sm font-black text-[#2563eb]">Short Decision</div>
          <p className="mt-2 text-sm leading-8 text-slate-700 lg:text-base">
            Choose <strong>{overallWinner}</strong> if you want the strongest overall option.
            If you are a beginner, review{" "}
            <strong>{beginnerWinner === "Tie" ? "both brokers" : beginnerWinner}</strong>.
            If trading costs and spreads are your priority, the closer fit is{" "}
            <strong>
              {scalpingWinner === "Tie" ? "the lower-cost account type" : scalpingWinner}
            </strong>.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <a
            href={`/go/${
              overallWinner === (left.name_en || left.name) ? left.slug ?? "" : right.slug ?? ""
            }?type=real`}
            className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-black text-white transition hover:bg-[#1d4ed8]"
          >
            Open Account with {overallWinner}
          </a>

          <Link
            href={`/en/brokers/${
              overallWinner === (left.name_en || left.name) ? left.slug ?? "" : right.slug ?? ""
            }`}
            className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            Read {overallWinner} Review
          </Link>
        </div>
      </div>
    </div>

    {/* Mobile */}
    <div className="mt-5 md:hidden">
      <div className="rounded-[24px] border border-[#dbeafe] bg-[#f8fbff] p-4">
        <span className="text-xs font-black text-[#2563eb]">Quick Decision</span>

        <h2 className="mt-2 text-[24px] font-black leading-[1.25] text-[#0f172a]">
          Which Broker Should You Choose Now?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          A practical summary to choose the better broker based on your goal.
        </p>

        <div className="mt-4 rounded-[20px] border border-[#2563eb] bg-white p-4 shadow-sm">
          <div className="text-[11px] font-black text-[#2563eb]">
            Overall Recommendation
          </div>

          <div className="mt-1 text-2xl font-black text-[#0f172a]">
            {overallWinner}
          </div>

          <p className="mt-1 text-xs leading-6 text-slate-600">
            The strongest overall choice based on this comparison.
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
            <div className="text-[10px] font-bold text-slate-500">Beginners</div>
            <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
              {beginnerWinner === "Tie" ? "Both Suitable" : beginnerWinner}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
            <div className="text-[10px] font-bold text-slate-500">Costs</div>
            <div className="mt-1 truncate text-xs font-black text-[#0f172a]">
              {scalpingWinner === "Tie" ? "Very Close" : scalpingWinner}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-white p-3">
          <div className="text-xs font-black text-[#2563eb]">Short Decision</div>

          <p className="mt-2 text-sm leading-7 text-slate-700">
            Choose <strong>{overallWinner}</strong> if you want the strongest overall option.
            For an easier start, the closer choice is{" "}
            <strong>{beginnerWinner === "Tie" ? "both brokers" : beginnerWinner}</strong>.
          </p>
        </div>

        <div className="mt-4 grid gap-2">
          <a
            href={`/go/${
              overallWinner === (left.name_en || left.name) ? left.slug ?? "" : right.slug ?? ""
            }?type=real`}
            className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-black text-white shadow-sm"
          >
            Open Account with {overallWinner}
          </a>

          <Link
            href={`/en/brokers/${
              overallWinner === (left.name_en || left.name) ? left.slug ?? "" : right.slug ?? ""
            }`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800"
          >
            Read {overallWinner} Review
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#2563eb]" />

    {/* Desktop */}
    <div className="hidden p-6 md:block lg:p-8">
      <div className="max-w-4xl">
        <span className="text-sm font-black text-[#2563eb]">Frequently Asked Questions</span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
          FAQs About {left.name_en || left.name} and {right.name_en || right.name}
        </h2>

        <p className="mt-3 text-base leading-8 text-slate-600">
          These questions summarize key points traders usually check before opening an account
          or choosing the better broker.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 rounded-[20px] border border-[#bfdbfe] bg-[#eff6ff] px-5 py-3">
            <h3 className="text-lg font-black text-[#0f172a]">
              Questions About {left.name_en || left.name}
            </h3>
          </div>

          <div className="space-y-4">
            {(((left as any).faq_en || []) as { question: string; answer: string }[])
              .slice(0, 3)
              .map((faq, index) => (
                <details
                  key={`left-faq-${index}`}
                  className="group rounded-[24px] border border-slate-200 bg-[#fbfdff] p-5 shadow-sm open:border-[#bfdbfe] open:bg-white"
                >
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4">
                    <h4 className="text-base font-black leading-7 text-[#0f172a]">
                      {faq.question}
                    </h4>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-500 transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
          </div>
        </div>

        <div>
          <div className="mb-4 rounded-[20px] border border-[#bfdbfe] bg-[#eff6ff] px-5 py-3">
            <h3 className="text-lg font-black text-[#0f172a]">
              Questions About {right.name_en || right.name}
            </h3>
          </div>

          <div className="space-y-4">
            {(((right as any).faq_en || []) as { question: string; answer: string }[])
              .slice(0, 3)
              .map((faq, index) => (
                <details
                  key={`right-faq-${index}`}
                  className="group rounded-[24px] border border-slate-200 bg-[#fbfdff] p-5 shadow-sm open:border-[#bfdbfe] open:bg-white"
                >
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4">
                    <h4 className="text-base font-black leading-7 text-[#0f172a]">
                      {faq.question}
                    </h4>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-500 transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-7 grid gap-4 rounded-[26px] border border-[#dbeafe] bg-[#f8fbff] p-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <p className="text-sm leading-7 text-slate-600 lg:text-base">
          If this comparison helped you, you can share it with another trader comparing
          {` ${left.name_en || left.name}`} and {right.name_en || right.name}.
        </p>

        <div className="flex justify-start lg:justify-end">
          <ShareButtons url={pageUrl} title={shareTitle} />
        </div>
      </div>
    </div>

    {/* Mobile */}
    <div className="block p-4 md:hidden">
      <div>
        <span className="text-xs font-black text-[#2563eb]">FAQs</span>

        <h2 className="mt-2 text-[22px] font-black leading-[1.3] text-[#0f172a]">
          Questions About {left.name_en || left.name} and {right.name_en || right.name}
        </h2>

        <p className="mt-1 text-xs leading-6 text-slate-600">
          Key questions before opening an account.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-[#bfdbfe] bg-[#eff6ff] py-2 text-center text-xs font-black text-[#0f172a]">
          {left.name_en || left.name}
        </div>

        <div className="rounded-xl border border-[#bfdbfe] bg-[#eff6ff] py-2 text-center text-xs font-black text-[#0f172a]">
          {right.name_en || right.name}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {[
          ...(((left as any).faq_en || []) as { question: string; answer: string }[])
            .slice(0, 3)
            .map((faq) => ({
              ...faq,
              brokerName: left.name_en || left.name,
            })),
          ...(((right as any).faq_en || []) as { question: string; answer: string }[])
            .slice(0, 3)
            .map((faq) => ({
              ...faq,
              brokerName: right.name_en || right.name,
            })),
        ].map((faq, index) => (
          <details
            key={`${faq.brokerName}-${index}`}
            className="group rounded-[18px] border border-slate-200 bg-white p-3 shadow-sm open:border-[#bfdbfe]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <h3 className="text-sm font-black leading-6 text-[#0f172a]">
                {faq.question}
              </h3>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[10px] text-slate-500 transition group-open:rotate-180">
                ▼
              </span>
            </summary>

            <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-6 text-slate-600">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] p-3">
        <p className="text-center text-xs leading-6 text-slate-600">
          Share this comparison with another trader.
        </p>

        <div className="mt-3 flex justify-center">
          <ShareButtons url={pageUrl} title={shareTitle} />
        </div>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}