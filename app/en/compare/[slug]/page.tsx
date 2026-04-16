import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ShareButtons from "@/app/components/ShareButtons";

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
    },
    twitter: {
      card: "summary_large_image",
      title: "Broker Comparisons | Broker Arab",
      description:
        "Detailed broker comparisons covering accounts, fees, regulation, and trading platforms.",
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
const imageUrl = `${siteUrl}/compare/${slug}/opengraph-image?v=3`;

  
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
    "Broker Arab",
  ],
  alternates: {
    canonical: `${siteUrl}/en/compare/${slug}`,
    languages: {
      en: `${siteUrl}/en/compare/${slug}`,
      ar: `${siteUrl}/compare/${slug}`,
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
        width: 1200,
        height: 630,
        alt: `${leftName} vs ${rightName} comparison`,
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
          {account.account_name || "Account"}
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#1d4ed8]">
          Account
        </span>
      </div>

      <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          Spread:{" "}
          <span className="font-black text-[#0f172a]">{account.spread || "Not specified"}</span>
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
            {account.execution_type || "Not specified"}
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
  const shareTitle = `${left.name_en || left.name} vs ${right.name_en || right.name} | Broker Arab`;

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
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#2563eb]/10 blur-3xl" />
    <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[#60a5fa]/10 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
    {/* Top intro */}
    <div className="relative mb-5 rounded-[28px] border border-[#dbeafe] bg-white/85 p-5 shadow-sm sm:p-6">
      <div className="text-xs font-bold text-[#1d4ed8] sm:text-sm">
  Comparisons / {left.name_en || left.name} vs {right.name_en || right.name}
</div>
      

      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
            

          <h1 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] sm:text-4xl lg:whitespace-nowrap lg:text-[52px] lg:leading-none">
  {left.name_en || left.name} vs {right.name_en || right.name}: Which Broker Is Better?
</h1>

          <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
  A clear and practical comparison between <strong>{left.name_en || left.name}</strong> and{" "}
  <strong>{right.name_en || right.name}</strong> across rating, minimum deposit, Islamic account availability,
  regulation, and account types to help you reach a clearer decision.
</p>
          
        </div>

        <div className="shrink-0 rounded-2xl border border-[#dbeafe] bg-white px-4 py-3 text-center shadow-sm">
         <div className="text-[11px] font-bold text-slate-500">Quick Winner</div>
          <div className="mt-1 text-base font-black text-[#0f172a]">{overallWinner}</div>
        </div>
      </div>
    </div>

    {/* Desktop / Tablet */}
    <div className="hidden md:block">
      <div className="rounded-[32px] border border-[#dbeafe] bg-white/95 p-4 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:p-6 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Left broker */}
          <div
            className={`rounded-[28px] border p-4 sm:p-5 lg:p-6 ${
              overallWinner === (left.name_en || left.name)
                ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">
  {left.name_en || left.name}
</h2>
                  {overallWinner === (left.name_en || left.name) ? (
                    <span className="rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-extrabold text-white">
  Best Overall
</span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm font-bold leading-6 text-[#1d4ed8]">
  {cleanText(left.best_for_en || left.best_for) || "Suitable for multiple trader profiles"}
</p>
              </div>

              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8] sm:h-20 sm:w-20">
                <span className="text-xl font-black sm:text-2xl">
                  {left.rating?.toFixed(1) ?? "—"}
                </span>
                <span className="text-[10px] font-bold">out of 5</span>
              </div>
            </div>

            <div className="mt-5 flex min-h-[130px] items-center justify-center rounded-[24px] border border-slate-200 bg-[#fbfdff] p-5">
              {left.logo ? (
                <img
                  src={left.logo}
                  alt={left.name_en || left.name || "Broker logo"}
                  className="h-[120px] w-full scale-125 object-contain"
                />
              ) : (
                <div className="text-xl font-black text-slate-300">{left.name_en || left.name}</div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
  <div className="text-[11px] font-bold text-slate-500">Minimum Deposit</div>
  <div className="mt-1 text-base font-black text-[#0f172a]">
    {money(left.min_deposit)}
  </div>
</div>

<div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
  <div className="text-[11px] font-bold text-slate-500">Islamic Account</div>
  <div className="mt-1 text-base font-black text-[#0f172a]">
    {yesNoEnglish(left.islamic_account)}
  </div>
</div>

<div className="col-span-2 rounded-2xl border border-slate-200 bg-white px-4 py-4">
  <div className="text-[11px] font-bold text-slate-500">Regulation</div>
  <div className="mt-1 text-sm font-black leading-7 text-[#0f172a]">
    {shortReg(left.regulation)}
  </div>
</div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
             <a
  href={`/go/${left.slug ?? ""}?type=real`}
  className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
>
  Start with {left.name_en || left.name}
</a>

              <Link
  href={`/en/brokers/${left.slug ?? ""}`}
  className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
>
  Read Review
</Link>
            </div>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#bfdbfe] bg-[radial-gradient(circle,#2563eb_0%,#1d4ed8_100%)] text-2xl font-black text-white shadow-lg sm:h-24 sm:w-24">
              VS
            </div>

            <div className="grid w-full gap-3 lg:grid-cols-1">
             <div className="rounded-2xl border border-[#dbeafe] bg-white px-4 py-3 text-center shadow-sm">
  <div className="text-[11px] font-bold text-slate-500">Best Overall</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">{overallWinner}</div>
</div>
<div className="rounded-2xl border border-[#dbeafe] bg-white px-4 py-3 text-center shadow-sm">
  <div className="text-[11px] font-bold text-slate-500">Best for Beginners</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">{beginnerWinner}</div>
</div>
<div className="rounded-2xl border border-[#dbeafe] bg-white px-4 py-3 text-center shadow-sm">
  <div className="text-[11px] font-bold text-slate-500">Best for Spreads</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">{scalpingWinner}</div>
</div>
            </div>
          </div>

          {/* Right broker */}
          <div
            className={`rounded-[28px] border p-4 sm:p-5 lg:p-6 ${
              overallWinner === (right.name_en || right.name)
                ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">
  {right.name_en || right.name}
</h2>
                  {overallWinner === (right.name_en || right.name) ? (
                  <span className="rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-extrabold text-white">
  Best Overall
</span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm font-bold leading-6 text-[#1d4ed8]">
  {cleanText(right.best_for_en || right.best_for) || "Suitable for multiple trader profiles"}
</p>
              </div>

              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8] sm:h-20 sm:w-20">
                <span className="text-xl font-black sm:text-2xl">
                  {right.rating?.toFixed(1) ?? "—"}
                </span>
                <span className="text-[10px] font-bold">out of 5</span>
              </div>
            </div>

            <div className="mt-5 flex min-h-[130px] items-center justify-center rounded-[24px] border border-slate-200 bg-[#fbfdff] p-5">
              {right.logo ? (
                <img
                  src={right.logo}
                  alt={right.name_en || right.name || "Broker logo"}
                  className="h-[120px] w-full scale-125 object-contain"
                />
              ) : (
                <div className="text-xl font-black text-slate-300">{right.name_en || right.name}</div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
             <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
  <div className="text-[11px] font-bold text-slate-500">Minimum Deposit</div>
  <div className="mt-1 text-base font-black text-[#0f172a]">
    {money(right.min_deposit)}
  </div>
</div>

<div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
  <div className="text-[11px] font-bold text-slate-500">Islamic Account</div>
  <div className="mt-1 text-base font-black text-[#0f172a]">
    {yesNoEnglish(right.islamic_account)}
  </div>
</div>

<div className="col-span-2 rounded-2xl border border-slate-200 bg-white px-4 py-4">
  <div className="text-[11px] font-bold text-slate-500">Regulation</div>
  <div className="mt-1 text-sm font-black leading-7 text-[#0f172a]">
    {shortReg(right.regulation)}
  </div>
</div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
  href={`/go/${right.slug ?? ""}?type=real`}
  className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
>
  Start with {right.name_en || right.name}
</a>

              <Link
  href={`/en/brokers/${right.slug ?? ""}`}
  className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
>
  Read Review
</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile version */}
    <div className="md:hidden">
      <div className="rounded-[28px] border border-[#dbeafe] bg-white/95 p-4 shadow-[0_20px_60px_rgba(37,99,235,0.08)]">
        <div className="grid gap-3">
          {/* top quick result */}
          <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fbff] px-4 py-3 text-center">
            <div className="text-[11px] font-bold text-slate-500">Quick Winner</div>
            <div className="mt-1 text-base font-black text-[#0f172a]">{overallWinner}</div>
          </div>

          {/* broker 1 */}
          <div
            className={`rounded-[24px] border p-4 ${
              overallWinner === (left.name_en || left.name)
                ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
               <div className="flex flex-wrap items-center gap-2">
  <h2 className="text-xl font-black text-[#0f172a]">{left.name_en || left.name}</h2>
  {overallWinner === (left.name_en || left.name) ? (
    <span className="rounded-full bg-[#2563eb] px-2.5 py-1 text-[10px] font-extrabold text-white">
      Best
    </span>
  ) : null}
</div>
<p className="mt-1 text-xs font-bold text-[#1d4ed8]">
  {cleanText(left.best_for_en || left.best_for) || "Suitable for multiple profiles"}
</p>
              </div>

              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8]">
                <span className="text-lg font-black">{left.rating?.toFixed(1) ?? "—"}</span>
                <span className="text-[10px] font-bold">out of 5</span>
              </div>
            </div>

            <div className="mt-4 flex h-[86px] items-center justify-center rounded-[20px] border border-slate-200 bg-[#fbfdff] p-4">
              {left.logo ? (
                <img
                  src={left.logo}
                  alt={left.name_en || left.name || "Broker logo"}
                  className="h-[85px] w-full scale-125 object-contain"
                />
              ) : (
                <div className="text-base font-black text-slate-300">{left.name_en || left.name}</div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
  <div className="text-[10px] font-bold text-slate-500">Deposit</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">{money(left.min_deposit)}</div>
</div>
<div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
  <div className="text-[10px] font-bold text-slate-500">Islamic</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">
    {yesNoEnglish(left.islamic_account)}
  </div>
</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
             <a
  href={`/go/${left.slug ?? ""}?type=real`}
  className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white"
>
  Start Now
</a>
<Link
  href={`/en/brokers/${left.slug ?? ""}`}
  className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800"
>
  Review
</Link>
            </div>
          </div>

          {/* vs */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 rounded-full border border-[#bfdbfe] bg-white px-4 py-2 shadow-sm">
  <span className="text-sm font-bold text-slate-500">{left.name_en || left.name}</span>
  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle,#2563eb_0%,#1d4ed8_100%)] text-sm font-black text-white">
    VS
  </span>
  <span className="text-sm font-bold text-slate-500">{right.name_en || right.name}</span>
</div>
          </div>

          {/* broker 2 */}
          <div
            className={`rounded-[24px] border p-4 ${
              overallWinner === (right.name_en || right.name)
                ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black text-[#0f172a]">{right.name_en || right.name}</h2>
                  {overallWinner === (right.name_en || right.name) ? (
                    <span className="rounded-full bg-[#2563eb] px-2.5 py-1 text-[10px] font-extrabold text-white">
  Best
</span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
  {cleanText(right.best_for_en || right.best_for) || "Suitable for multiple profiles"}
</p>
              </div>

              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#bfdbfe] bg-white text-[#1d4ed8]">
                <span className="text-lg font-black">{right.rating?.toFixed(1) ?? "—"}</span>
                <span className="text-[10px] font-bold">out of 5</span>
              </div>
            </div>

            <div className="mt-4 flex h-[86px] items-center justify-center rounded-[20px] border border-slate-200 bg-[#fbfdff] p-4">
              {right.logo ? (
                <img
                  src={right.logo}
                 alt={right.name_en || right.name || "Broker logo"}
                  className="h-[85px] w-full scale-125 object-contain"
                />
              ) : (
                <div className="text-base font-black text-slate-300">{right.name_en || right.name}</div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
  <div className="text-[10px] font-bold text-slate-500">Deposit</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">
    {money(right.min_deposit)}
  </div>
</div>
<div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
  <div className="text-[10px] font-bold text-slate-500">Islamic</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">
    {yesNoEnglish(right.islamic_account)}
  </div>
</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={`/go/${right.slug ?? ""}?type=real`}
                className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white"
              >
               Start Now
              </a>
              <Link
  href={`/en/brokers/${right.slug ?? ""}`}
  className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800"
>
  Review
</Link>
            </div>
          </div>

          {/* bottom quick comparison */}
         <div className="grid grid-cols-3 gap-2">
  <div className="rounded-2xl border border-[#dbeafe] bg-white px-3 py-3 text-center">
    <div className="text-[10px] font-bold text-slate-500">Overall</div>
    <div className="mt-1 text-xs font-black text-[#0f172a]">{overallWinner}</div>
  </div>
  <div className="rounded-2xl border border-[#dbeafe] bg-white px-3 py-3 text-center">
    <div className="text-[10px] font-bold text-slate-500">Beginners</div>
    <div className="mt-1 text-xs font-black text-[#0f172a]">{beginnerWinner}</div>
  </div>
  <div className="rounded-2xl border border-[#dbeafe] bg-white px-3 py-3 text-center">
    <div className="text-[10px] font-bold text-slate-500">Spreads</div>
    <div className="mt-1 text-xs font-black text-[#0f172a]">{scalpingWinner}</div>
  </div>
</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">

    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">Final Verdict</span>

      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:whitespace-nowrap lg:text-5xl">
        Which Broker Looks Better: {left.name_en || left.name} or {right.name_en || right.name}?
      </h2>

      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        After reviewing the overall rating, minimum deposit, Islamic account availability,
        and regulatory profile, the comparison between <strong>{left.name_en || left.name}</strong> and{" "}
        <strong>{right.name_en || right.name}</strong> can be summarized through the following highlights.
      </p>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-[22px] border border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 sm:p-5">
        <div className="text-xs font-bold text-slate-500 sm:text-sm">
          Best Overall
        </div>
        <div className="mt-2 text-xl font-black text-[#0f172a] sm:text-2xl lg:text-3xl">
          {overallWinner}
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
          A broader recommendation based on the full broker profile.
        </p>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="text-xs font-bold text-slate-500 sm:text-sm">
          Best for Beginners
        </div>
        <div className="mt-2 text-xl font-black text-[#0f172a] sm:text-2xl lg:text-3xl">
          {beginnerWinner}
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
          Based on lower barriers to entry and simpler account access.
        </p>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="text-xs font-bold text-slate-500 sm:text-sm">
          Best for Spreads
        </div>
        <div className="mt-2 text-xl font-black text-[#0f172a] sm:text-2xl lg:text-3xl">
          {scalpingWinner}
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
          More relevant for traders focused on lower spreads or active execution.
        </p>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="text-xs font-bold text-slate-500 sm:text-sm">
          Best Entry Cost
        </div>
        <div className="mt-2 text-xl font-black text-[#0f172a] sm:text-2xl lg:text-3xl">
          {depositWinner}
        </div>
        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
          A better choice for traders who want a lower starting deposit.
        </p>
      </div>

    </div>

    <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-6">
      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        If your priority is choosing the stronger broker overall, <strong>{overallWinner}</strong> appears to be the better option here.
        If you care more about ease of entry, then <strong>{beginnerWinner}</strong> stands out more clearly.
        And if your focus is on spreads and active trading conditions, <strong>{scalpingWinner}</strong> looks more relevant.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:justify-end">
        <Link
          href={`/en/brokers/${left.slug ?? ""}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50 lg:min-w-[260px]"
        >
          Read {left.name_en || left.name} Review
        </Link>

        <Link
          href={`/en/brokers/${right.slug ?? ""}`}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8] lg:min-w-[260px]"
        >
          Read {right.name_en || right.name} Review
        </Link>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Account opening is always completed through the broker’s official website.
      </p>
    </div>

  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
  <span className="text-sm font-bold text-[#2563eb]">Basic Features</span>
  <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:whitespace-nowrap lg:text-5xl">
    Core Feature Comparison: {left.name_en || left.name} vs {right.name_en || right.name}
  </h2>
  <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
    A quick side-by-side view of the main details traders usually compare first,
    such as deposit level, Islamic account status, Arabic support, regulation, and platforms.
  </p>
</div>

    {/* Desktop */}
    <div className="mt-6 hidden md:block">
      <div className="overflow-hidden rounded-[24px] border border-slate-200">
       <div className="grid grid-cols-[220px_1fr_1fr] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]">
  <div className="border-b border-slate-200 p-4 text-left font-black text-[#0f172a]">
    Feature
  </div>
  <div className="border-b border-r border-slate-200 p-4 text-center font-black text-[#0f172a]">
    {left.name_en || left.name}
  </div>
  <div className="border-b border-r border-slate-200 p-4 text-center font-black text-[#0f172a]">
    {right.name_en || right.name}
  </div>
</div>

        {comparisonRows.slice(0, 8).map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-[220px_1fr_1fr] ${
              index % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"
            }`}
          >
            <div className="flex items-center border-b border-slate-200 p-4">
              <div className="font-black text-[#0f172a]">{row.label}</div>
            </div>

            <div
              className={`flex items-center justify-center border-b border-r border-slate-200 p-4 text-center ${
  row.winner === (left.name_en || left.name) ? "bg-[#f8fbff]" : ""
}`}
            >
              <div
              className={`text-base font-black ${
  row.winner === (left.name_en || left.name) ? "text-[#0f172a]" : "text-slate-700"
}`}
              >
                {row.leftValue}
              </div>
            </div>

            <div
              className={`flex items-center justify-center border-b border-r border-slate-200 p-4 text-center ${
  row.winner === (right.name_en || right.name) ? "bg-[#f8fbff]" : ""
}`}
            >
              <div
                className={`text-base font-black ${
  row.winner === (right.name_en || right.name) ? "text-[#0f172a]" : "text-slate-700"
}`}
              >
                {row.rightValue}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
  <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
    This quick overview helps you identify the main differences between{" "}
    <strong>{left.name_en || left.name}</strong> and <strong>{right.name_en || right.name}</strong>
    before moving deeper into fees, account types, and detailed conditions.
    If you want a fast decision, start with the rows where one broker clearly stands out.
  </p>
</div>
    </div>

    {/* Mobile */}
    <div className="mt-5 space-y-3 md:hidden">
      {comparisonRows.slice(0, 4).map((row) => (
        <div
          key={row.label}
          className="rounded-[20px] border border-slate-200 bg-white p-3 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-black text-[#0f172a]">{row.label}</div>

           <span
  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
    row.winner === "Tie"
      ? "border border-slate-200 bg-white text-slate-700"
      : "border border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]"
  }`}
>
  {row.winner === "Tie" ? "Tie" : row.winner}
</span>
          </div>

          <div className="space-y-2">
            <div
              className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
  row.winner === (left.name_en || left.name)
    ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
    : "border-slate-200 bg-[#fbfdff]"
}`}
            >
              <span className="text-[11px] font-bold text-[#1d4ed8]">{left.name_en || left.name}</span>
              <span className="text-base font-black text-[#0f172a] break-words text-left">
                {row.leftValue}
              </span>
            </div>

            <div
              className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
  row.winner === (right.name_en || right.name)
    ? "border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)]"
    : "border-slate-200 bg-[#fbfdff]"
}`}
            >
              <span className="text-[11px] font-bold text-[#1d4ed8]">{right.name_en || right.name}</span>
              <span className="text-base font-black text-[#0f172a] break-words text-left">
                {row.rightValue}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
   <div className="max-w-4xl">
  <span className="text-sm font-bold text-[#2563eb]">Fees & Spreads</span>
  <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
    Fees & Spread Comparison: {left.name_en || left.name} vs {right.name_en || right.name}
  </h2>
  <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
    This section focuses on the cost-related details that directly affect trading conditions,
    such as spreads, fees, and deposit/withdrawal handling, while keeping the comparison easy to scan on both desktop and mobile.
  </p>
</div>

    {/* Quick summary */}
    <div className="mt-6 hidden md:grid gap-3 md:grid-cols-2 xl:grid-cols-4">
  <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
    <div className="text-xs font-bold text-slate-500">Spread Summary</div>
    <div className="mt-2 text-lg font-black text-[#0f172a]">
      {cleanText(left.spreads_en || left.spreads) || cleanText(right.spreads_en || right.spreads) ? "Available" : "Not clear"}
    </div>
  </div>

  <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
    <div className="text-xs font-bold text-slate-500">Fee Summary</div>
    <div className="mt-2 text-lg font-black text-[#0f172a]">
      {cleanText(left.fees_en || left.fees) || cleanText(right.fees_en || right.fees) ? "Available" : "Not clear"}
    </div>
  </div>

  <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
    <div className="text-xs font-bold text-slate-500">Deposits & Withdrawals</div>
    <div className="mt-2 text-lg font-black text-[#0f172a]">
      {cleanText(left.deposit_withdrawal_en || left.deposit_withdrawal) || cleanText(right.deposit_withdrawal_en || right.deposit_withdrawal)
        ? "Supported"
        : "Not clear"}
    </div>
  </div>

  <div className="rounded-[22px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4">
    <div className="text-xs font-bold text-[#1d4ed8]">Important Note</div>
    <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
      Trading cost often depends on the account type, not only the broker name.
    </div>
  </div>
</div>

    {/* Broker cards */}
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {/* Left broker */}
      <div className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
  <div>
    <h3 className="text-2xl font-black text-[#0f172a]">{left.name_en || left.name}</h3>
    <p className="mt-1 text-xs font-bold text-[#1d4ed8]">Cost Overview</p>
  </div>

  <span className="rounded-full border border-slate-200 bg-[#f8fbff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
    {left.name_en || left.name} Summary
  </span>
</div>

        <div className="space-y-3">
      

         <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
  <div className="text-sm font-black text-[#0f172a]">Spread Summary</div>
  <div className="mt-2 text-sm leading-7 text-slate-600">
    {cleanText(left.spreads_en || left.spreads) || "Not currently specified."}
  </div>
</div>

<div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
  <div className="text-sm font-black text-[#0f172a]">Fee Summary</div>
  <div className="mt-2 text-sm leading-7 text-slate-600">
    {cleanText(left.fees_en || left.fees) || "Not currently specified."}
  </div>
</div>

<div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
  <div className="text-sm font-black text-[#0f172a]">Deposits & Withdrawals</div>
  <div className="mt-2 text-sm leading-7 text-slate-600">
    {cleanText(left.deposit_withdrawal_en || left.deposit_withdrawal) || "Not currently specified."}
  </div>
</div>

          <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
  <div className="text-sm font-black text-[#0f172a]">Important Notes</div>
  <div className="mt-2 text-sm leading-7 text-slate-600">
    {cleanText(left.spreads_en || left.spreads) || cleanText(left.fees_en || left.fees)
      ? `It is best to review the account type at ${left.name_en || left.name}, because spreads or fees may vary between standard and professional accounts.`
      : `There is not enough fee detail currently available for ${left.name_en || left.name} in this comparison.`}
  </div>
</div>
        </div>
      </div>

           {/* Right broker */}
      <div className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{right.name_en || right.name}</h3>
            <p className="mt-1 text-xs font-bold text-[#1d4ed8]">Cost Overview</p>
          </div>

          <span className="rounded-full border border-slate-200 bg-[#f8fbff] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
            {right.name_en || right.name} Summary
          </span>
        </div>

        <div className="space-y-3">
          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">Spread Summary</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(right.spreads_en || right.spreads) || "Not currently specified."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">Fee Summary</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(right.fees_en || right.fees) || "Not currently specified."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] p-4">
            <div className="text-sm font-black text-[#0f172a]">Deposits & Withdrawals</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(right.deposit_withdrawal_en || right.deposit_withdrawal) || "Not currently specified."}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
            <div className="text-sm font-black text-[#0f172a]">Important Notes</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {cleanText(right.spreads_en || right.spreads) || cleanText(right.fees_en || right.fees)
                ? `It is best to review the account type at ${right.name_en || right.name}, because spreads or fees may vary between standard and professional accounts.`
                : `There is not enough fee detail currently available for ${right.name_en || right.name} in this comparison.`}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="hidden md:block mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
  <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
    Comparing trading costs is not only about spreads. It also depends on the account type,
    deposit and withdrawal methods, and any extra commissions that may apply in specific cases.
    That is why reviewing the full broker review page remains the better final step before opening an account.
  </p>
</div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">Account Types</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        Account Types Comparison: {left.name_en || left.name} vs {right.name_en || right.name}
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        Instead of forcing a strict row-by-row comparison that may create empty gaps when brokers have a different number of accounts,
        we present each broker’s account types in a clear and independent layout to keep the comparison easier to read and more practical.
      </p>
    </div>

    {/* Summary */}
    <div className="mt-6 grid gap-3 md:grid-cols-3">
     <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
  <div className="text-xs font-bold text-slate-500">Available Accounts</div>
  <div className="mt-3 grid grid-cols-2 gap-3">
    <div>
      <div className="text-xs font-bold text-[#1d4ed8]">{left.name_en || left.name}</div>
      <div className="mt-1 text-3xl font-black text-[#0f172a]">{leftAccounts.length}</div>
    </div>
    <div>
      <div className="text-xs font-bold text-[#1d4ed8]">{right.name_en || right.name}</div>
      <div className="mt-1 text-3xl font-black text-[#0f172a]">{rightAccounts.length}</div>
    </div>
  </div>
</div>

   <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
  <div className="text-xs font-bold text-slate-500">Account Variety</div>
  <div className="mt-3 text-base font-black leading-7 text-[#0f172a]">
    {leftAccounts.length > rightAccounts.length
      ? `${left.name_en || left.name} offers a wider range of account types`
      : rightAccounts.length > leftAccounts.length
      ? `${right.name_en || right.name} offers a wider range of account types`
      : "Both brokers offer a similar range of account types"}
  </div>
</div>

<div className="rounded-[22px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4">
  <div className="text-xs font-bold text-[#1d4ed8]">Important Note</div>
  <div className="mt-3 text-base font-black leading-7 text-[#0f172a]">
    The number of account types is not the most important factor. What matters is choosing the account that best fits your trading style.
  </div>
</div>
</div>

    {/* Desktop + Tablet */}
    <div className="mt-6 hidden space-y-5 md:block">
      {/* Left broker section */}
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
  <h3 className="text-2xl font-black text-[#0f172a]">{left.name_en || left.name}</h3>
  <p className="mt-1 text-sm font-bold text-[#1d4ed8]">
    {leftAccounts.length} accounts available
  </p>
</div>

          <Link
            href={`/brokers/${left.slug ?? ""}`}
            className="inline-flex min-h-[42px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
          >
           Read {left.name_en || left.name} Review
          </Link>
        </div>

       <div className="grid gap-4 lg:grid-cols-2">
  {leftAccounts.length > 0 ? (
    leftAccounts.map((acc) => (
      <div
        key={acc.id}
        className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-black text-[#0f172a]">
  {acc.account_name_en || acc.account_name || "Account"}
</h4>
<p className="mt-1 text-xs font-bold text-[#1d4ed8]">
  {acc.best_for_en || acc.best_for || "Suitable for multiple trader profiles"}
</p>
          </div>

          <span className="rounded-full border border-slate-200 bg-[#f8fbff] px-2.5 py-1 text-[10px] font-bold text-slate-600">
            Account
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
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
  <div className="text-[11px] font-bold text-slate-500">Minimum Deposit</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">
    {acc.min_deposit_en || acc.min_deposit || "Not specified"}
  </div>
</div>

<div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
  <div className="text-[11px] font-bold text-slate-500">Execution Type</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">
    {acc.execution_type_en || acc.execution_type || "Not specified"}
  </div>
</div>
        </div>
      </div>
    ))
  ) : (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
      No account data is currently available.
    </div>
  )}
</div>
</div>

{/* Right broker section */}
<div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5">
  <div className="mb-4 flex items-center justify-between gap-3">
    <div>
      <h3 className="text-2xl font-black text-[#0f172a]">
        {right.name_en || right.name}
      </h3>
      <p className="mt-1 text-sm font-bold text-[#1d4ed8]">
        {rightAccounts.length} accounts available
      </p>
    </div>

    <Link
      href={`/en/brokers/${right.slug ?? ""}`}
      className="inline-flex min-h-[42px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
    >
      Read {right.name_en || right.name} Review
    </Link>
  </div>

  <div className="grid gap-4 lg:grid-cols-2">
    {rightAccounts.length > 0 ? (
      rightAccounts.map((acc) => (
        <div
          key={acc.id}
          className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-lg font-black text-[#0f172a]">
                {acc.account_name_en || acc.account_name || "Account"}
              </h4>
              <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                {acc.best_for_en || acc.best_for || "Suitable for multiple trader profiles"}
              </p>
            </div>

            <span className="rounded-full border border-slate-200 bg-[#f8fbff] px-2.5 py-1 text-[10px] font-bold text-slate-600">
              Account
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
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
  <div className="text-[11px] font-bold text-slate-500">Minimum Deposit</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">
    {acc.min_deposit_en || acc.min_deposit || "Not specified"}
  </div>
</div>

<div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3">
  <div className="text-[11px] font-bold text-slate-500">Execution Type</div>
  <div className="mt-1 text-sm font-black text-[#0f172a]">
    {acc.execution_type_en || acc.execution_type || "Not specified"}
  </div>
</div>
          </div>
        </div>
      ))
    ) : (
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
        No account data is currently available.
      </div>
    )}
  </div>
</div>
</div>
    {/* Mobile */}
<div className="mt-5 space-y-4 md:hidden">
  <div className="space-y-4">
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-[#0f172a]">{left.name_en || left.name}</h3>
          <p className="mt-1 text-[11px] font-bold text-[#1d4ed8]">
            {leftAccounts.length} accounts
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {leftAccounts.length > 0 ? (
          leftAccounts.map((acc) => (
            <details
              key={acc.id}
              className="group rounded-[18px] border border-slate-200 bg-[#fbfdff]"
            >
              <summary className="cursor-pointer list-none p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-black text-[#0f172a]">
                      {acc.account_name_en || acc.account_name || "Account"}
                    </div>
                    <div className="mt-1 text-[11px] font-bold text-[#1d4ed8]">
                      {acc.best_for_en || acc.best_for || "Suitable for multiple trader profiles"}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </div>
              </summary>

              <div className="border-t border-slate-200 px-3 pb-3 pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                    <div className="text-[10px] font-bold text-slate-500">Spread</div>
                    <div className="mt-1 text-xs font-black text-[#0f172a]">
                      {acc.spread_en || acc.spread || "Not specified"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                    <div className="text-[10px] font-bold text-slate-500">Commission</div>
                    <div className="mt-1 text-xs font-black text-[#0f172a]">
                      {acc.commission_en || acc.commission || "Not specified"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                    <div className="text-[10px] font-bold text-slate-500">Minimum Deposit</div>
                    <div className="mt-1 text-xs font-black text-[#0f172a]">
                      {acc.min_deposit_en || acc.min_deposit || "Not specified"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                    <div className="text-[10px] font-bold text-slate-500">Execution Type</div>
                    <div className="mt-1 text-xs font-black text-[#0f172a]">
                      {acc.execution_type_en || acc.execution_type || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </details>
          ))
        ) : (
          <div className="rounded-[18px] border border-slate-200 bg-[#f8fbff] p-3 text-sm text-slate-600">
            No account data is currently available.
          </div>
        )}
      </div>
    </div>

    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-[#0f172a]">{right.name_en || right.name}</h3>
          <p className="mt-1 text-[11px] font-bold text-[#1d4ed8]">
            {rightAccounts.length} accounts
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {rightAccounts.length > 0 ? (
          rightAccounts.map((acc) => (
            <details
              key={acc.id}
              className="group rounded-[18px] border border-slate-200 bg-[#fbfdff]"
            >
              <summary className="cursor-pointer list-none p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-black text-[#0f172a]">
                      {acc.account_name_en || acc.account_name || "Account"}
                    </div>
                    <div className="mt-1 text-[11px] font-bold text-[#1d4ed8]">
                      {acc.best_for_en || acc.best_for || "Suitable for multiple trader profiles"}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </div>
              </summary>

              <div className="border-t border-slate-200 px-3 pb-3 pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                    <div className="text-[10px] font-bold text-slate-500">Spread</div>
                    <div className="mt-1 text-xs font-black text-[#0f172a]">
                      {acc.spread_en || acc.spread || "Not specified"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                    <div className="text-[10px] font-bold text-slate-500">Commission</div>
                    <div className="mt-1 text-xs font-black text-[#0f172a]">
                      {acc.commission_en || acc.commission || "Not specified"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                    <div className="text-[10px] font-bold text-slate-500">Minimum Deposit</div>
                    <div className="mt-1 text-xs font-black text-[#0f172a]">
                      {acc.min_deposit_en || acc.min_deposit || "Not specified"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2">
                    <div className="text-[10px] font-bold text-slate-500">Execution Type</div>
                    <div className="mt-1 text-xs font-black text-[#0f172a]">
                      {acc.execution_type_en || acc.execution_type || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </details>
          ))
        ) : (
          <div className="rounded-[18px] border border-slate-200 bg-[#f8fbff] p-3 text-sm text-slate-600">
            No account data is currently available.
          </div>
        )}
      </div>
    </div>
  </div>
</div>

    {/* Footer */}
<div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
  <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
    A higher number of account types does not always mean a broker is better. What matters most is finding an account that matches your trading style in terms of spreads, commissions, minimum deposit, and execution conditions.
  </p>
</div>
</div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">Quick Decision</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        When should you choose {left.name_en || left.name} and when should you choose {right.name_en || right.name}?
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        If you want a faster decision, this section clearly summarizes when each broker is the better choice, instead of relying only on tables and numbers.
      </p>
    </div>

    {/* Desktop */}
    <div className="mt-6 hidden gap-4 md:grid lg:grid-cols-2">
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{left.name_en || left.name}</h3>
            <p className="mt-1 text-sm font-bold text-[#1d4ed8]">
              Choose {left.name_en || left.name} if you...
            </p>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-[#1d4ed8]">
            Good Fit
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            Prefer a clearer account structure and better transparency in conditions.
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            Your priority is {cleanText(left.best_for_en || left.best_for) || "trading flexibility"}.
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            Like to review account options in detail before opening an account.
          </div>
        </div>

        <div className="mt-5">
          <Link
            href={`/en/brokers/${left.slug ?? ""}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
          >
            Read {left.name_en || left.name} Review
          </Link>
        </div>
      </div>

      <div className="rounded-[26px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-[#0f172a]">{right.name_en || right.name}</h3>
            <p className="mt-1 text-sm font-bold text-[#1d4ed8]">
              Choose {right.name_en || right.name} if you...
            </p>
          </div>

          <span className="rounded-full border border-[#bfdbfe] bg-white px-3 py-1 text-xs font-bold text-[#1d4ed8]">
            Strong Option
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            Want a broker with a strong overall rating and general reputation.
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            Your priority is {cleanText(right.best_for_en || right.best_for) || "easy entry or active trading"}.
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            Prefer reaching a practical decision quickly without deep comparisons.
          </div>
        </div>

        <div className="mt-5">
          <Link
            href={`/en/brokers/${right.slug ?? ""}`}
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
          >
            Read {right.name_en || right.name} Review
          </Link>
        </div>
      </div>
    </div>

    {/* Mobile */}
    <div className="mt-5 space-y-3 md:hidden">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-[#0f172a]">{left.name_en || left.name}</h3>
            <p className="mt-1 text-[11px] font-bold text-[#1d4ed8]">Choose it if you...</p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3 text-sm leading-7 text-slate-600">
            Want clearer account structure and more detailed information.
          </div>
          <div className="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3 text-sm leading-7 text-slate-600">
            Your priority is {cleanText(left.best_for_en || left.best_for) || "trading flexibility"}.
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={`/en/brokers/${left.slug ?? ""}`}
            className="inline-flex min-h-[46px] w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800"
          >
            {left.name_en || left.name} Review
          </Link>
        </div>
      </div>

      <div className="rounded-[22px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-[#0f172a]">{right.name_en || right.name}</h3>
            <p className="mt-1 text-[11px] font-bold text-[#1d4ed8]">Choose it if you...</p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-7 text-slate-600">
            Want a strong overall choice with solid performance.
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-7 text-slate-600">
            Your priority is {cleanText(right.best_for_en || right.best_for) || "easy entry or active trading"}.
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={`/en/brokers/${right.slug ?? ""}`}
            className="inline-flex min-h-[46px] w-full items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-extrabold text-white"
          >
            {right.name_en || right.name} Review
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="mx-auto max-w-4xl text-center">
      <span className="text-sm font-bold text-[#2563eb]">Safety & Regulation</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        How safe is trading with {left.name_en || left.name} vs {right.name_en || right.name}?
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        Safety depends on regulatory strength, transparency of the licensing authority, company headquarters, and the availability of an Islamic account. Here is a direct comparison between {left.name_en || left.name} and {right.name_en || right.name} based on available data.
      </p>
    </div>

    {/* Top summary */}
    <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="text-xs font-bold text-slate-500">Regulation</div>
        <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
          Both brokers hold multiple licenses
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
        <div className="text-xs font-bold text-slate-500">Islamic Account</div>
        <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
          {yesNoEnglish(left.islamic_account)} / {yesNoEnglish(right.islamic_account)}
        </div>
      </div>

      <div className="rounded-[22px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4">
        <div className="text-xs font-bold text-[#1d4ed8]">Important Note</div>
        <div className="mt-2 text-sm font-black leading-7 text-[#0f172a]">
          Always verify the exact regulatory entity under which your account will be opened before registering.
        </div>
      </div>
    </div>

    {/* Cards */}
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {/* Left */}
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2">
              {left.logo ? (
                <img
                  src={left.logo}
                  alt={left.name_en || left.name || "Broker logo"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs font-black text-slate-400">
                  {left.name_en || left.name}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0f172a] sm:text-2xl">
                {left.name_en || left.name}
              </h3>
              <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                Safety & Trust
              </p>
            </div>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-[#1d4ed8]">
            {left.name_en || left.name} Safety
          </span>
        </div>

        <div className="space-y-3">
          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">Regulation</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {shortReg(left.regulation)}
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">Islamic Account</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {yesNoEnglish(left.islamic_account)}
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">Headquarters</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {left.headquarters || "Not specified"}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="rounded-[26px] border border-slate-200 bg-[#fbfdff] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2">
              {right.logo ? (
                <img
                  src={right.logo}
                  alt={right.name_en || right.name || "Broker logo"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs font-black text-slate-400">
                  {right.name_en || right.name}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0f172a] sm:text-2xl">
                {right.name_en || right.name}
              </h3>
              <p className="mt-1 text-xs font-bold text-[#1d4ed8]">
                Safety & Trust
              </p>
            </div>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-[#1d4ed8]">
            {right.name_en || right.name} Safety
          </span>
        </div>

        <div className="space-y-3">
          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">Regulation</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {shortReg(right.regulation)}
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">Islamic Account</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {yesNoEnglish(right.islamic_account)}
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
            <div className="text-sm font-black text-[#0f172a]">Headquarters</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">
              {right.headquarters || "Not specified"}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile note */}
    <div className="hidden md:block mt-5 rounded-[22px] border border-slate-200 bg-[#f8fbff] p-4">
      <div className="text-sm font-black text-[#0f172a]">Important Note</div>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        Always verify the exact regulatory entity under which your account will be opened before registering.
      </p>
    </div>

    {/* Footer */}
    <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        Having licenses does not necessarily mean all accounts offer the same level of protection. It is always best to review the exact regulatory entity under which your account will be opened before making a final decision.
      </p>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[30px] border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-4 shadow-sm sm:p-6 lg:p-8">
    {/* Header */}
    <div className="max-w-4xl">
      <span className="text-sm font-bold text-[#2563eb]">Final Verdict</span>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a] sm:text-3xl lg:text-5xl">
        Which is better: {left.name_en || left.name} or {right.name_en || right.name}?
      </h2>
      <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
        After reviewing core features, fees, account types, and safety, here is the final conclusion to help you make a faster decision.
      </p>
    </div>

    {/* Verdict cards */}
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center">
        <div className="text-xs font-bold text-slate-500">Best for Beginners</div>
        <div className="mt-2 text-2xl font-black text-[#0f172a]">
          {beginnerWinner}
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center">
        <div className="text-xs font-bold text-slate-500">Best for Active Trading</div>
        <div className="mt-2 text-2xl font-black text-[#0f172a]">
          {scalpingWinner}
        </div>
      </div>

      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center sm:col-span-2 xl:col-span-1">
        <div className="text-xs font-bold text-slate-500">Best Overall</div>
        <div className="mt-2 text-2xl font-black text-[#0f172a]">
          {overallWinner}
        </div>
      </div>
    </div>

    {/* Analysis */}
    <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5">
      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        If you are looking for the best overall option, <strong>{overallWinner}</strong> may be the right choice for you.
        If your priority is ease of getting started and clear account structures, consider <strong>{beginnerWinner}</strong>.
        If your main focus is active trading and tighter spreads, start by reviewing <strong>{scalpingWinner}</strong>.
      </p>
    </div>

    {/* CTA */}
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <a
        href={`/go/${left.slug ?? ""}?type=real`}
        className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
      >
        Open an account with {left.name_en || left.name}
      </a>

      <a
        href={`/go/${right.slug ?? ""}?type=real`}
        className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]"
      >
        Open an account with {right.name_en || right.name}
      </a>
    </div>

    {/* Small note - desktop only */}
    <p className="mt-4 hidden text-xs text-slate-500 md:block">
      The final decision always depends on the actual account type you choose and your personal trading style.
    </p>
  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
  <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">

    <h3 className="text-lg font-bold text-[#0f172a]">
      Share this comparison with others
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      This comparison may help other traders choose the right broker
    </p>

    <div className="mt-4 flex justify-center">
      <ShareButtons url={pageUrl} title={shareTitle} />
    </div>

  </div>
</section>

<section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

    <h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">
      Frequently Asked Questions
    </h2>

    <div className="mt-6 space-y-3">

      <details className="rounded-xl border border-slate-200 p-4">
        <summary className="cursor-pointer font-bold text-[#0f172a]">
          Is {left.name_en || left.name} better than {right.name_en || right.name}?
        </summary>
        <p className="mt-2 text-sm text-slate-600">
          It depends on the trader’s needs, as brokers differ in fees, platforms, and account types.
        </p>
      </details>

      <details className="rounded-xl border border-slate-200 p-4">
        <summary className="cursor-pointer font-bold text-[#0f172a]">
          What is the minimum deposit to open a trading account?
        </summary>
        <p className="mt-2 text-sm text-slate-600">
          The minimum deposit varies depending on the broker and the type of account chosen.
        </p>
      </details>

      <details className="rounded-xl border border-slate-200 p-4">
        <summary className="cursor-pointer font-bold text-[#0f172a]">
          Is there an Islamic account available?
        </summary>
        <p className="mt-2 text-sm text-slate-600">
          Many brokers offer Islamic (swap-free) accounts that comply with Sharia principles.
        </p>
      </details>

    </div>

  </div>
</section>

    </main>
  );
}