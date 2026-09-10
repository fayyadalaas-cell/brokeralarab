import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export const revalidate = 0;

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

  regulation_summary_en: string | null;
  fund_protection_en: string | null;
  safety_factors_en: string | null;

  faq_en:
    | {
        question?: string;
        answer?: string;
      }[]
    | null;

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

type BrokerLicense = {
  id: number;
  broker_id: number;

  regulator_code: string | null;
  regulator_name_en: string | null;
  country_en: string | null;

  license_number: string | null;
  entity_name_en: string | null;

  status_code: string | null;
  trust_level: string | null;

  verification_url_en: string | null;
  verification_url_ar: string | null;

  last_verified: string | null;
  is_active: boolean | null;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function cleanText(value: string | null | undefined) {
  return (value || "").trim();
}

function brokerName(broker: Broker) {
  return cleanText(broker.name_en) || cleanText(broker.name) || "Broker";
}

function money(value: number | null) {
  if (value === null || Number.isNaN(value)) {
    return "Not specified";
  }

  return `$${value}`;
}

function minimumAccountDeposit(
  accounts: BrokerAccount[],
  fallback: number | null
) {
  const depositValues = accounts
    .map((account) => {
      const value = cleanText(
        account.min_deposit_en ||
          account.min_deposit
      );

      if (!value) {
        return null;
      }

      const normalizedValue = value
        .replace(/,/g, "")
        .toLowerCase();

      if (
        normalizedValue.includes("no minimum") ||
        normalizedValue.includes(
          "no minimum deposit"
        ) ||
        normalizedValue.includes(
          "no deposit required"
        )
      ) {
        return 0;
      }

      const match = normalizedValue.match(
        /\d+(?:\.\d+)?/
      );

      if (!match) {
        return null;
      }

      const numericValue = Number(match[0]);

      return Number.isFinite(numericValue)
        ? numericValue
        : null;
    })
    .filter(
      (value): value is number => value !== null
    );

  if (depositValues.length === 0) {
    return money(fallback);
  }

  const minimumDeposit = Math.min(
    ...depositValues
  );

  return `$${minimumDeposit.toLocaleString(
    "en-US"
  )}`;
}

function splitParagraphs(value: string | null | undefined) {
  return cleanText(value)
    .split("||")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function splitSafetyFactors(value: string | null | undefined) {
  return cleanText(value)
    .split("||")
    .map((factor) => factor.trim())
    .filter(Boolean);
}

function shortReg(value: string | null) {
  if (!value) return "Not specified";

  return value
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4)
    .join(" / ");
}

function shortPlatforms(value: string | null) {
  if (!value) return "Not specified";

  return value
    .replace("JustMarkets Mobile App", "Mobile")
    .trim();
}

function yesNoEnglish(value: string | null) {
  const normalized = cleanText(value).toLowerCase();

  if (
    normalized.includes("yes") ||
    normalized.includes("available") ||
    normalized.includes("متوفر")
  ) {
    return "Available";
  }

  if (
    normalized.includes("no") ||
    normalized.includes("not available") ||
    normalized.includes("غير")
  ) {
    return "Not available";
  }

  return value || "Not specified";
}

function countLicenses(value: string | null) {
  if (!value) return 0;

  return value
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean).length;
}

function hasArabicSupportScore(value: string | null) {
  const normalized = cleanText(value).toLowerCase();

  return normalized.includes("yes") ||
    normalized.includes("available") ||
    normalized.includes("arabic") ||
    normalized.includes("عربي")
    ? 1
    : 0;
}

function hasIslamicScore(value: string | null) {
  const normalized = cleanText(value).toLowerCase();

  return normalized.includes("yes") ||
    normalized.includes("available") ||
    normalized.includes("islamic") ||
    normalized.includes("متوفر")
    ? 1
    : 0;
}

function numericLeverage(value: string | null) {
  if (!value) return 0;

  const matches = value.match(/\d+/g);

  if (!matches) return 0;

  return Number(matches.join(""));
}

function accountSlug(value: string | null) {
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

function licenseTrustLabel(value: string | null) {
  if (value === "Tier 1") return "Strong oversight";
  if (value === "Tier 2") return "Moderate oversight";
  if (value === "Tier 3") return "International oversight";

  return "Not classified";
}

function licenseTrustClasses(value: string | null) {
  if (value === "Tier 1") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (value === "Tier 2") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function licenseStatusLabel(value: string | null) {
  return value === "active" ? "Active" : "Check status";
}

function formatVerifiedDate(value: string | null) {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function getHigherRatingLabel(left: Broker, right: Broker) {
  const leftRating = left.rating ?? 0;
  const rightRating = right.rating ?? 0;

  if (leftRating > rightRating) {
    return brokerName(left);
  }

  if (rightRating > leftRating) {
    return brokerName(right);
  }

  return "Tie";
}

function getBeginnerWinner(left: Broker, right: Broker) {
  const leftDeposit = left.min_deposit ?? 999999;
  const rightDeposit = right.min_deposit ?? 999999;

  const leftBestFor = cleanText(
    left.best_for_en || left.best_for
  ).toLowerCase();

  const rightBestFor = cleanText(
    right.best_for_en || right.best_for
  ).toLowerCase();

  const leftScore =
    (leftDeposit <= 50 ? 2 : 0) +
    (leftBestFor.includes("begin") ? 2 : 0) +
    hasIslamicScore(left.islamic_account) +
    hasArabicSupportScore(left.arabic_support);

  const rightScore =
    (rightDeposit <= 50 ? 2 : 0) +
    (rightBestFor.includes("begin") ? 2 : 0) +
    hasIslamicScore(right.islamic_account) +
    hasArabicSupportScore(right.arabic_support);

  if (leftScore > rightScore) {
    return brokerName(left);
  }

  if (rightScore > leftScore) {
    return brokerName(right);
  }

  return "Tie";
}

function getScalpingWinner(
  left: Broker,
  right: Broker
) {
  const leftScore = left.score_fees;
  const rightScore = right.score_fees;

  if (
    leftScore === null &&
    rightScore === null
  ) {
    return "Tie";
  }

  if (leftScore === null) {
    return brokerName(right);
  }

  if (rightScore === null) {
    return brokerName(left);
  }

  const difference = Math.abs(
    leftScore - rightScore
  );

  if (difference < 0.15) {
    return "Tie";
  }

  return leftScore > rightScore
    ? brokerName(left)
    : brokerName(right);
}

function getSafetyWinner(
  left: Broker,
  right: Broker,
  leftLicences: BrokerLicense[],
  rightLicences: BrokerLicense[]
) {
  const leftSafetyScore = left.score_safety;
  const rightSafetyScore = right.score_safety;

  if (
    leftSafetyScore !== null &&
    rightSafetyScore !== null
  ) {
    const difference = Math.abs(
      leftSafetyScore - rightSafetyScore
    );

    if (difference >= 0.15) {
      return leftSafetyScore > rightSafetyScore
        ? brokerName(left)
        : brokerName(right);
    }
  }

  const licenceScore = (
    licences: BrokerLicense[]
  ) =>
    licences.reduce((total, licence) => {
      if (licence.trust_level === "Tier 1") {
        return total + 3;
      }

      if (licence.trust_level === "Tier 2") {
        return total + 2;
      }

      if (licence.trust_level === "Tier 3") {
        return total + 1;
      }

      return total;
    }, 0);

  const leftLicenceScore =
    licenceScore(leftLicences);

  const rightLicenceScore =
    licenceScore(rightLicences);

  if (
    leftLicenceScore === rightLicenceScore
  ) {
    return "Very close";
  }

  return leftLicenceScore > rightLicenceScore
    ? brokerName(left)
    : brokerName(right);
}

function getBrokerReasons(
  broker: Broker,
  other: Broker
): string[] {
  const reasons: string[] = [];

  if ((broker.rating ?? 0) > (other.rating ?? 0)) {
    reasons.push(
      `${brokerName(broker)} has the higher overall rating.`
    );
  }

  if (
    (broker.min_deposit ?? 999999) <
    (other.min_deposit ?? 999999)
  ) {
    reasons.push(
      `${brokerName(broker)} has the lower minimum deposit.`
    );
  }

  if (
    hasIslamicScore(broker.islamic_account) >
    hasIslamicScore(other.islamic_account)
  ) {
    reasons.push(
      `${brokerName(broker)} has clearer Islamic account availability.`
    );
  }

  if (
    countLicenses(broker.regulation) >
    countLicenses(other.regulation)
  ) {
    reasons.push(
      `${brokerName(broker)} lists a broader regulatory structure.`
    );
  }

  if (
    numericLeverage(broker.max_leverage) >
    numericLeverage(other.max_leverage)
  ) {
    reasons.push(
      `${brokerName(broker)} lists higher maximum leverage.`
    );
  }

  const bestFor = cleanText(
    broker.best_for_en || broker.best_for
  );

  if (bestFor) {
    reasons.push(`${brokerName(broker)} is best suited to ${bestFor}.`);
  }

  if (reasons.length < 2) {
    reasons.push(
      `Compare the available accounts, fees and trading platforms before choosing ${brokerName(
        broker
      )}.`
    );
  }

  return reasons.slice(0, 3);
}

function buildFaqJsonLd(left: Broker, right: Broker) {
  const brokerFaqs = [left, right].flatMap((broker) => {
    const faqs = Array.isArray(broker.faq_en)
      ? broker.faq_en
      : [];

    return faqs
      .slice(0, 3)
      .filter(
        (faq) =>
          cleanText(faq.question) &&
          cleanText(faq.answer)
      )
      .map((faq) => ({
        "@type": "Question",
        name: cleanText(faq.question),
        acceptedAnswer: {
          "@type": "Answer",
          text: cleanText(faq.answer),
        },
      }));
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brokerFaqs,
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [leftSlug, rightSlug] = slug.split("-vs-");

  const siteUrl = "https://brokeralarab.com";

  if (!leftSlug || !rightSlug) {
    return {
      metadataBase: new URL(siteUrl),
      title: "Compare Forex Brokers | Broker Alarab",
      description:
        "Detailed forex broker comparisons covering accounts, fees, regulation, licences and trading platforms.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("brokers")
    .select("name, name_en, slug, publication_status")
    .eq("publication_status", "published")
    .in("slug", [leftSlug, rightSlug]);

  const brokers = (data ?? []) as Pick<
    Broker,
    "name" | "name_en" | "slug"
  >[];

  const leftBroker = brokers.find(
    (broker) => broker.slug === leftSlug
  );

  const rightBroker = brokers.find(
    (broker) => broker.slug === rightSlug
  );

  if (!leftBroker || !rightBroker) {
    return {
      metadataBase: new URL(siteUrl),
      title: "Broker Comparison Not Found | Broker Alarab",
      description:
        "The requested forex broker comparison could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const leftName =
    cleanText(leftBroker.name_en) ||
    cleanText(leftBroker.name) ||
    leftSlug;

  const rightName =
    cleanText(rightBroker.name_en) ||
    cleanText(rightBroker.name) ||
    rightSlug;

  /*
   * Keep the same indexed English title structure.
   * The URL and slug are not changed.
   */
  const title = `${leftName} vs ${rightName}: Which Broker Is Better?`;

  const description = `Compare ${leftName} vs ${rightName} across regulation, licences, account types, spreads, fees, trading platforms, minimum deposit and investor protection.`;

  return {
  metadataBase: new URL(siteUrl),

  title,

  description,

    alternates: {
      canonical: `${siteUrl}/en/compare/${slug}`,
      languages: {
        ar: `${siteUrl}/compare/${slug}`,
        en: `${siteUrl}/en/compare/${slug}`,
        "x-default": `${siteUrl}/compare/${slug}`,
      },
    },

    openGraph: {
      title,
      description,
      url: `${siteUrl}/en/compare/${slug}`,
      siteName: "Broker Alarab",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.webp`,
          width: 1560,
          height: 377,
          alt: `${leftName} vs ${rightName} broker comparison`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.webp`],
    },
  };
}

function ScoreBar({
  value,
  highlighted = false,
}: {
  value: number;
  highlighted?: boolean;
}) {
  const safeValue = Math.max(0, Math.min(5, value));

  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${
            highlighted ? "bg-brand-500" : "bg-slate-400"
          }`}
          style={{
            width: `${(safeValue / 5) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

function ExpandableText({
  text,
  fallback,
}: {
  text: string | null | undefined;
  fallback: string;
}) {
  const content = cleanText(text) || fallback;

  return (
    <details className="group/expand">
      <summary className="cursor-pointer list-none">
        <div className="relative max-h-[140px] overflow-hidden text-sm leading-7 text-slate-600 group-open/expand:hidden">
          <p>{content}</p>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="mt-2 inline-flex rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[11px] font-black text-brand-500">
          <span className="group-open/expand:hidden">
            Read more
          </span>

          <span className="hidden group-open/expand:inline">
            Show less
          </span>
        </div>
      </summary>

      <p className="mt-2 text-sm leading-7 text-slate-600">
        {content}
      </p>
    </details>
  );
}
  export default async function ComparePage({
  params,
}: PageProps) {
  const { slug } = await params;
  const [leftSlug, rightSlug] = slug.split("-vs-");

  if (!leftSlug || !rightSlug) {
    notFound();
  }

  const supabase = await createClient();

  const { data: brokersData } = await supabase
    .from("brokers")
    .select("*")
    .eq("publication_status", "published")
    .in("slug", [leftSlug, rightSlug]);

  const brokers = (brokersData ?? []) as Broker[];

  const left = brokers.find(
    (broker) => broker.slug === leftSlug
  );

  const right = brokers.find(
    (broker) => broker.slug === rightSlug
  );

  if (!left || !right) {
    notFound();
  }

  const { data: accountsData } = await supabase
    .from("broker_accounts")
    .select("*")
    .in("broker_id", [left.id, right.id])
    .order("sort_order", {
      ascending: true,
    });

  const accounts = (accountsData ?? []) as BrokerAccount[];

  const leftAccounts = accounts.filter(
    (account) => account.broker_id === left.id
  );

  const rightAccounts = accounts.filter(
    (account) => account.broker_id === right.id
  );

  const { data: licencesData } = await supabase
    .from("broker_licenses")
    .select(`
      id,
      broker_id,
      regulator_code,
      regulator_name_en,
      country_en,
      license_number,
      entity_name_en,
      status_code,
      trust_level,
      verification_url_en,
      verification_url_ar,
      last_verified,
      is_active
    `)
    .in("broker_id", [left.id, right.id]);

  const licencePriority: Record<string, number> = {
    "Tier 1": 1,
    "Tier 2": 2,
    "Tier 3": 3,
  };

  const licences = (
    (licencesData ?? []) as BrokerLicense[]
  )
    .filter((licence) => licence.is_active !== false)
    .sort((a, b) => {
      const firstPriority =
        licencePriority[a.trust_level || ""] ?? 4;

      const secondPriority =
        licencePriority[b.trust_level || ""] ?? 4;

      if (firstPriority !== secondPriority) {
        return firstPriority - secondPriority;
      }

      return cleanText(a.regulator_code).localeCompare(
        cleanText(b.regulator_code)
      );
    });

  const leftLicences = licences.filter(
    (licence) => licence.broker_id === left.id
  );

  const rightLicences = licences.filter(
    (licence) => licence.broker_id === right.id
  );

  const leftName = brokerName(left);
  const rightName = brokerName(right);

  const leftMinimumDeposit =
  minimumAccountDeposit(
    leftAccounts,
    left.min_deposit
  );

const rightMinimumDeposit =
  minimumAccountDeposit(
    rightAccounts,
    right.min_deposit
  );

  const leftRating = left.rating ?? 0;
  const rightRating = right.rating ?? 0;

  const ratingDifference = Math.abs(
    leftRating - rightRating
  );

  const ratingsAreClose = ratingDifference < 0.15;

  const recommendedBroker =
    leftRating >= rightRating ? left : right;

  const alternativeBroker =
    recommendedBroker.id === left.id ? right : left;

  const recommendedName = brokerName(
    recommendedBroker
  );

  const alternativeName = brokerName(
    alternativeBroker
  );

  const overallWinner = getHigherRatingLabel(
    left,
    right
  );

  const beginnerWinner = getBeginnerWinner(
    left,
    right
  );

  const scalpingWinner = getScalpingWinner(
    left,
    right
  );

  const safetyWinner = getSafetyWinner(
    left,
    right,
    leftLicences,
    rightLicences
  );

  const recommendationLabel = ratingsAreClose
    ? "The two brokers are closely matched"
    : recommendedName;

  const beginnerDecision =
    beginnerWinner === "Tie"
      ? "Both are suitable"
      : beginnerWinner;

  const feesDecision =
    scalpingWinner === "Tie"
      ? "Costs are closely matched"
      : scalpingWinner;

  const recommendedInsight =
    splitParagraphs(
      recommendedBroker.expert_insight_en
    )[0] ||
    `${recommendedName} has the higher overall rating, but the final choice should reflect the account type, trading costs, platforms and regulatory entity available in your country.`;

  const leftPriorityReasons =
  splitParagraphs(
    left.who_should_use_en
  ).slice(0, 3);

const rightPriorityReasons =
  splitParagraphs(
    right.who_should_use_en
  ).slice(0, 3);

const decisionBrokers = [
  {
    broker: left,
    reasons:
      leftPriorityReasons.length > 0
        ? leftPriorityReasons
        : getBrokerReasons(left, right),
  },
  {
    broker: right,
    reasons:
      rightPriorityReasons.length > 0
        ? rightPriorityReasons
        : getBrokerReasons(right, left),
  },
];

  const faqJsonLd = buildFaqJsonLd(left, right);

  const siteUrl = "https://brokeralarab.com";
  const pageUrl = `${siteUrl}/en/compare/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/en`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Broker Comparisons",
        item: `${siteUrl}/en/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${leftName} vs ${rightName}`,
        item: pageUrl,
      },
    ],
  };

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${leftName} vs ${rightName}: Which Broker Is Better?`,
    headline: `${leftName} vs ${rightName} Broker Comparison`,
    description: `Compare ${leftName} and ${rightName} across regulation, licences, accounts, fees, spreads, platforms and investor protection.`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Broker Alarab",
    },
    about: [
      {
        "@type": "Organization",
        name: leftName,
        url: `${siteUrl}/en/brokers/${left.slug}`,
      },
      {
        "@type": "Organization",
        name: rightName,
        url: `${siteUrl}/en/brokers/${right.slug}`,
      },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Organization",
            name: leftName,
            url: `${siteUrl}/en/brokers/${left.slug}`,
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Organization",
            name: rightName,
            url: `${siteUrl}/en/brokers/${right.slug}`,
          },
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Broker Alarab",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo/Asset%204%406x.png`,
      },
    },
  };

  const comparisonFactors = [
    {
      label: "Safety & Trust",
      note: "Regulation and client-fund protection.",
      leftScore: left.score_safety ?? 0,
      rightScore: right.score_safety ?? 0,
    },
    {
      label: "Fees & Costs",
      note: "Spreads, commissions and overall trading costs.",
      leftScore: left.score_fees ?? 0,
      rightScore: right.score_fees ?? 0,
    },
    {
      label: "Trading Platforms",
      note: "Platform quality and trading tools.",
      leftScore: left.score_platforms ?? 0,
      rightScore: right.score_platforms ?? 0,
    },
    {
      label: "Deposits & Withdrawals",
      note: "Funding access and withdrawal experience.",
      leftScore: left.score_deposit ?? 0,
      rightScore: right.score_deposit ?? 0,
    },
    {
      label: "Customer Support",
      note: "Support quality and accessibility.",
      leftScore: left.score_support ?? 0,
      rightScore: right.score_support ?? 0,
    },
  ];

  return (
    <main
      dir="ltr"
      lang="en"
      className="min-h-screen bg-[#f4f7fb] text-left text-[#0f172a]"
    >
      <Script
        id="comparison-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonSchema),
        }}
      />

      <Script
        id="comparison-breadcrumbs-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="comparison-faq-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* ======================================================
          HERO — DESKTOP
      ====================================================== */}
      <section className="mx-auto hidden max-w-[1520px] px-4 pb-3 pt-6 sm:px-6 md:block lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-[#dbeafe] bg-white px-7 py-8 shadow-[0_25px_70px_rgba(37,99,235,0.08)] lg:px-10 lg:py-10">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

          <div className="flex flex-wrap items-center gap-2 text-xs font-black text-brand-500">
            <Link
              href="/en/compare"
              className="rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1.5"
            >
              Comparisons
            </Link>

            <span>/</span>

            <span>
              {leftName} vs {rightName}
            </span>
          </div>

          <h1 className="mt-5 max-w-6xl text-4xl font-black leading-tight text-[#0f172a] lg:text-[52px]">
            {leftName} vs {rightName}: Which Broker Is Better?
          </h1>

          <p className="mt-4 max-w-5xl text-base leading-8 text-slate-600 lg:text-lg">
            Compare {leftName} and {rightName} across spreads,
            trading fees, regulation, licences, Islamic accounts,
            trading platforms, deposits, withdrawals and account
            types to identify the broker that better matches your
            trading priorities.
          </p>

          <div className="mt-7 grid overflow-hidden rounded-[24px] border border-[#dbeafe] bg-[#f8fbff] lg:grid-cols-3">
            <div className="border-b border-[#dbeafe] p-5 text-center lg:border-b-0 lg:border-r">
              <div className="text-xs font-black text-brand-500">
                Best Overall
              </div>

              <div className="mt-2 text-2xl font-black">
                {overallWinner === "Tie"
                  ? "Closely matched"
                  : overallWinner}
              </div>

              <p className="mt-1 text-xs leading-6 text-slate-500">
                Based on the overall ratings shown in this comparison.
              </p>
            </div>

            <div className="border-b border-[#dbeafe] p-5 text-center lg:border-b-0 lg:border-r">
              <div className="text-xs font-black text-slate-500">
                Better for Beginners
              </div>

              <div className="mt-2 text-2xl font-black">
                {beginnerDecision}
              </div>

              <p className="mt-1 text-xs leading-6 text-slate-500">
                Based on entry requirements and account accessibility.
              </p>
            </div>

            <div className="p-5 text-center">
              <div className="text-xs font-black text-slate-500">
                Costs & Execution
              </div>

              <div className="mt-2 text-2xl font-black">
                {feesDecision}
              </div>

              <p className="mt-1 text-xs leading-6 text-slate-500">
                Based on spreads, fees and execution-related data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
    HERO + DIRECT COMPARISON — MOBILE
====================================================== */}
<section className="mx-auto max-w-[1520px] px-3 pb-4 pt-4 md:hidden">
  <div className="md:hidden">
    {/* Mobile hero */}
    <div className="relative overflow-hidden rounded-[28px] border border-[#dbeafe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-4 pb-4 pt-5 shadow-[0_16px_45px_rgba(37,99,235,0.09)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />

      <div className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm">
        Broker Comparison
      </div>

      <h1 className="mt-3 text-[26px] font-black leading-[1.25] tracking-[-0.3px] text-[#0f172a]">
        {leftName} vs {rightName}: Which Broker Is Better?
      </h1>

      <p className="mt-2 text-[13px] leading-6 text-slate-600">
        Compare {leftName} and {rightName} across fees, spreads,
        regulation, account types, trading platforms and overall
        suitability for different trading needs.
      </p>

      {/* Overall result */}
      <div className="mt-4 flex items-center justify-between gap-4 rounded-[20px] border border-[#93c5fd] bg-white px-4 py-3 shadow-sm">
        <div className="min-w-0">
          <div className="text-[10px] font-black text-brand-500">
            Best Overall
          </div>

          <div className="mt-0.5 break-words text-lg font-black leading-6 text-[#0f172a]">
            {overallWinner === "Tie"
              ? "The two brokers are closely matched"
              : overallWinner}
          </div>
        </div>

        <div className="shrink-0 rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-500">
          Overall Rating
        </div>
      </div>

      {/* Secondary results */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="min-w-0 rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500">
            Best for Beginners
          </div>

          <div className="mt-1 break-words text-sm font-black leading-5 text-[#0f172a]">
            {beginnerWinner === "Tie"
              ? "Both are suitable"
              : beginnerWinner}
          </div>
        </div>

        <div className="min-w-0 rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500">
            Costs and Execution
          </div>

          <div className="mt-1 break-words text-sm font-black leading-5 text-[#0f172a]">
            {scalpingWinner === "Tie"
              ? "Closely matched"
              : scalpingWinner}
          </div>
        </div>
      </div>
    </div>

    {/* Direct broker comparison */}
    <div className="mt-3 overflow-hidden rounded-[28px] border border-[#dbeafe] bg-white shadow-[0_16px_45px_rgba(37,99,235,0.07)]">
      <div className="border-b border-[#dbeafe] bg-[#f8fbff] px-4 py-3">
        <div className="text-[10px] font-black text-brand-500">
          Direct Comparison
        </div>

        <h2 className="mt-1 break-words text-lg font-black leading-7 text-[#0f172a]">
          {leftName} vs {rightName}
        </h2>
      </div>

      {/* Broker cards */}
      <div className="relative grid grid-cols-2 gap-2 bg-[#f8fbff] p-3">
        <div className="absolute left-1/2 top-[82px] z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#f8fbff] bg-brand-500 text-[11px] font-black text-white shadow-md">
          VS
        </div>

        {[left, right].map((broker) => {
          const name = brokerName(broker);

          return (
            <div
              key={broker.id}
              className="min-w-0 rounded-[22px] border border-[#dbeafe] bg-white px-2 pb-4 pt-2 shadow-sm"
            >
              {/* Logo */}
              <div className="flex h-[94px] items-center justify-center overflow-hidden rounded-[17px] bg-[#f8fafc]">
                {broker.logo ? (
                  <img
                    src={broker.logo}
                    alt={`${name} logo`}
                    className="h-[74px] w-full scale-[1.28] object-contain"
                  />
                ) : (
                  <span className="break-words px-2 text-center text-sm font-black text-slate-300">
                    {name}
                  </span>
                )}
              </div>

              {/* Broker name and rating */}
              <div className="mt-3 text-center">
                <h3 className="flex min-h-[44px] items-center justify-center break-words text-center text-[16px] font-black leading-5 text-[#0f172a]">
                  {name}
                </h3>

                <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 shadow-sm">
                  <span className="text-[15px] font-black text-brand-500">
                    {broker.rating?.toFixed(2) ?? "—"}
                  </span>

                  <span className="text-[9px] font-bold text-slate-400">
                    out of 5
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-[9px] font-bold text-slate-400">
                    Best Suited For
                  </div>

                  <p className="mt-1 min-h-[36px] break-words text-[11px] font-black leading-[18px] text-brand-500">
                    {cleanText(broker.best_for_en) ||
                      "Different trader profiles"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Broker Alarab insights */}
      <div className="border-t border-[#dbeafe] bg-[#f8fbff] p-3">
        <div className="mb-2 text-[10px] font-black text-slate-500">
          Broker Alarab View
        </div>

        <div className="grid gap-2">
          {[left, right].map((broker) => {
            const name = brokerName(broker);

            const insightParagraphs = splitParagraphs(
              broker.expert_insight_en
            );

            return (
              <details
                key={broker.id}
                className="group rounded-[18px] border border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="break-words text-xs font-black text-[#0f172a]">
                    Our View on {name}
                  </span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-black text-brand-500 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="space-y-2 border-t border-slate-100 px-3 pb-3 pt-2 text-xs leading-6 text-slate-600">
                  {insightParagraphs.length > 0 ? (
                    insightParagraphs.map((paragraph, index) => (
                      <p key={index} className="break-words">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p>
                      Review this broker’s trading conditions, account
                      types and regulatory entity before registering.
                    </p>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 border-t border-[#dbeafe] bg-white p-3">
        {[left, right].map((broker) => {
          const name = brokerName(broker);

          return (
            <div key={broker.id} className="min-w-0">
              <a
                href={`/go/${broker.slug ?? ""}?type=real`}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[16px] bg-brand-500 px-2 py-2.5 text-center text-[11px] font-black leading-4 text-white shadow-sm transition active:scale-[0.98]"
              >
                Start with {name}
              </a>

              <Link
                href={`/en/brokers/${broker.slug ?? ""}`}
                className="mt-2 inline-flex w-full items-center justify-center text-[11px] font-black text-slate-600 underline decoration-slate-300 underline-offset-4"
              >
                Read Review
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

      {/* ======================================================
          BROKER HEAD-TO-HEAD — DESKTOP
      ====================================================== */}
      <section className="mx-auto hidden max-w-[1520px] px-4 pb-4 sm:px-6 md:block lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-[#dbeafe] bg-white p-6 shadow-[0_25px_70px_rgba(37,99,235,0.08)] lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_74px_1fr] lg:items-stretch">
            {[left, right].map((broker, index) => {
              const other = index === 0 ? right : left;
              const name = brokerName(broker);

              const isWinner =
                !ratingsAreClose &&
                broker.id === recommendedBroker.id;

              const insightParagraphs = splitParagraphs(
                broker.expert_insight_en
              );

              return (
                <React.Fragment key={broker.id}>
                  <article
                    className={`flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border ${
                      isWinner
                        ? "border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_42%)]"
                        : "border-[#dbeafe] bg-white"
                    }`}
                  >
                    <div className="flex min-h-[112px] items-start justify-between gap-4 border-b border-[#dbeafe] px-5 py-5">
                      <div className="min-w-0">
                        {isWinner ? (
                          <span className="mb-2 inline-flex rounded-full bg-brand-500 px-3 py-1 text-[10px] font-black text-white">
                            Best Overall
                          </span>
                        ) : null}

                        <h2 className="break-words text-3xl font-black">
                          {name}
                        </h2>

                        <p className="mt-1 text-sm font-black text-brand-500">
                          {cleanText(
                            broker.key_strength_en
                          ) || "Broker comparison"}
                        </p>
                      </div>

                      <div className="shrink-0 text-center">
                        <div className="rounded-[18px] border border-[#dbeafe] bg-white px-4 py-3 shadow-sm">
                          <div className="text-2xl font-black text-brand-500">
                            {(broker.rating ?? 0).toFixed(2)}
                          </div>

                          <div className="text-[9px] font-bold text-slate-400">
                            out of 5
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex h-[150px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-2">
  {broker.logo ? (
    <img
      src={broker.logo}
      alt={`${name} logo`}
      className="h-[130px] w-full max-w-[260px] object-contain"
    />
  ) : (
    <span className="text-xl font-black text-slate-400">
      {name}
    </span>
  )}
</div>

                      <div className="mt-4 rounded-[18px] border border-emerald-100 bg-emerald-50/70 px-4 py-3">
                        <div className="text-[10px] font-black text-emerald-700">
                          Key Strength
                        </div>

                        <p className="mt-1 text-sm font-bold leading-7 text-slate-700">
                          {cleanText(
                            broker.key_strength_en
                          ) ||
                            "Trading conditions designed for different trader profiles."}
                        </p>
                      </div>

                      <div className="mt-3 rounded-[18px] border border-amber-100 bg-amber-50/70 px-4 py-3">
                        <div className="text-[10px] font-black text-amber-700">
                          Important Note
                        </div>

                        <p className="mt-1 text-sm leading-7 text-slate-700">
                          {cleanText(
                            broker.key_weakness_en
                          ) ||
                            "Review the account conditions, fees and regulatory entity before registering."}
                        </p>
                      </div>

                      {insightParagraphs.length > 0 ? (
                        <div className="mt-3 rounded-[18px] bg-[#f8fbff] px-4 py-3">
                          <div className="text-[10px] font-black text-brand-500">
                            Broker Alarab View
                          </div>

                          <div className="mt-1 space-y-2 text-sm leading-7 text-slate-600">
                            {insightParagraphs.map(
                              (paragraph, paragraphIndex) => (
                                <p key={paragraphIndex}>
                                  {paragraph}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
                        <a
                          href={`/go/${broker.slug ?? ""}?type=real`}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          className={`inline-flex min-h-[48px] items-center justify-center rounded-xl px-4 py-3 text-sm font-black ${
                            isWinner
                              ? "bg-brand-500 text-white hover:bg-brand-600"
                              : "border border-[#bfdbfe] bg-[#eff6ff] text-brand-500"
                          }`}
                        >
                          Open Account
                        </a>

                        <Link
                          href={`/en/brokers/${broker.slug ?? ""}`}
                          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700"
                        >
                          Read Review
                        </Link>
                      </div>
                    </div>
                  </article>

                  {index === 0 ? (
                    <div className="hidden items-center justify-center lg:flex">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-lg font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)]">
                        VS
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          SCORE ANALYSIS — DESKTOP
      ====================================================== */}
      <section className="mx-auto hidden max-w-[1520px] px-4 pb-4 sm:px-6 md:block lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-[#dbeafe] bg-white p-6 shadow-[0_25px_70px_rgba(37,99,235,0.08)] lg:p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

          <span className="text-sm font-black text-brand-500">
            Score Analysis
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight lg:text-[42px]">
            Compare the Strengths of {leftName} and {rightName}
          </h2>

          <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600">
            A direct comparison of safety, costs, platforms,
            deposits and withdrawals, and customer support.
          </p>

          <div className="mt-7 grid gap-4 lg:grid-cols-5">
            {comparisonFactors.map((factor) => {
              const leftWins =
                factor.leftScore > factor.rightScore;

              const rightWins =
                factor.rightScore > factor.leftScore;

              return (
                <div
                  key={factor.label}
                  className="rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-4"
                >
                  <div className="min-h-[52px]">
                    <h3 className="text-sm font-black">
                      {factor.label}
                    </h3>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {factor.note}
                    </p>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="rounded-[14px] border border-[#dbeafe] bg-white p-3">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="truncate text-[10px] font-black">
                          {leftName}
                        </span>

                        <span className="text-xs font-black text-brand-500">
                          {factor.leftScore.toFixed(2)}
                        </span>
                      </div>

                      <ScoreBar
                        value={factor.leftScore}
                        highlighted={leftWins}
                      />
                    </div>

                    <div className="rounded-[14px] border border-[#dbeafe] bg-white p-3">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="truncate text-[10px] font-black">
                          {rightName}
                        </span>

                        <span className="text-xs font-black text-brand-500">
                          {factor.rightScore.toFixed(2)}
                        </span>
                      </div>

                      <ScoreBar
                        value={factor.rightScore}
                        highlighted={rightWins}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-[20px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-center">
            <p className="text-sm leading-7 text-slate-500">
              Similar scores do not mean the brokers are identical.
              Your decision should reflect the factor that matters
              most to you, such as regulation, fees, platforms,
              withdrawals or customer support.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
    SCORE ANALYSIS — MOBILE
====================================================== */}
<section className="mx-auto max-w-[1520px] px-3 pb-4 md:hidden">
  <div className="relative overflow-hidden rounded-[28px] border border-[#dbeafe] bg-white p-4 shadow-[0_16px_45px_rgba(37,99,235,0.07)]">
    <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />

    {/* Header */}
    <div>
      <span className="text-xs font-black text-brand-500">
        Score Analysis
      </span>

      <h2 className="mt-1.5 text-[24px] font-black leading-tight text-[#0f172a]">
        Strength Comparison
      </h2>

      <p className="mt-2 text-[12px] leading-5 text-slate-600">
        Compare {leftName} and {rightName} across the main factors
        traders consider when choosing a broker.
      </p>
    </div>

    {/* Compact comparison table */}
    <div className="mt-4 overflow-hidden rounded-[22px] border border-[#dbeafe] bg-white shadow-sm">
      {/* Table header */}
      <div className="grid grid-cols-[minmax(0,1fr)_66px_66px] items-center gap-2 border-b border-[#dbeafe] bg-[#f8fbff] px-3 py-2.5">
        <div className="text-[9px] font-black text-slate-400">
          Comparison Factor
        </div>

        <div className="break-words text-center text-[9px] font-black leading-3 text-[#0f172a]">
          {leftName}
        </div>

        <div className="break-words text-center text-[9px] font-black leading-3 text-[#0f172a]">
          {rightName}
        </div>
      </div>

      {/* Comparison rows */}
      {comparisonFactors.map((factor, index) => {
        const difference = Math.abs(
          factor.leftScore - factor.rightScore
        );

        const isClose = difference < 0.15;

        const leftHasAdvantage =
          !isClose && factor.leftScore > factor.rightScore;

        const rightHasAdvantage =
          !isClose && factor.rightScore > factor.leftScore;

        return (
          <div
            key={factor.label}
            className={`grid grid-cols-[minmax(0,1fr)_66px_66px] items-center gap-2 px-3 py-2.5 ${
              index !== comparisonFactors.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >
            {/* Factor */}
            <h3 className="min-w-0 break-words text-[12px] font-black leading-5 text-[#0f172a]">
              {factor.label}
            </h3>

            {/* Left broker score */}
            <div
              className={`rounded-xl px-1 py-2 text-center text-[13px] font-black ${
                leftHasAdvantage
                  ? "bg-brand-500 text-white shadow-sm"
                  : isClose
                  ? "bg-brand-50 text-brand-500"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {factor.leftScore.toFixed(2)}
            </div>

            {/* Right broker score */}
            <div
              className={`rounded-xl px-1 py-2 text-center text-[13px] font-black ${
                rightHasAdvantage
                  ? "bg-brand-500 text-white shadow-sm"
                  : isClose
                  ? "bg-brand-50 text-brand-500"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {factor.rightScore.toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>

    {/* Comparison note */}
    <div className="mt-3 rounded-[16px] bg-[#f8fbff] px-3 py-2.5">
      <p className="text-[10px] font-medium leading-5 text-slate-500">
        Small score differences do not mean the brokers are identical.
        Choose according to the factor that matters most to you, such as
        regulation, trading costs, platforms, withdrawals or customer
        support.
      </p>
    </div>
  </div>
</section>

            {/* ======================================================
          ACCOUNTS & TRADING COSTS — DESKTOP
      ====================================================== */}
      <section className="mx-auto hidden max-w-[1520px] px-4 pb-4 sm:px-6 md:block lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-[#dbeafe] bg-white p-6 shadow-[0_25px_70px_rgba(37,99,235,0.08)] lg:p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

          <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <span className="text-sm font-black text-brand-500">
                Accounts & Trading Costs
              </span>

              <h2 className="mt-2 text-3xl font-black leading-tight lg:text-[42px]">
                Compare {leftName} and {rightName} Accounts
              </h2>

              <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600">
                Compare available account types, minimum deposits,
                spreads, commissions and order execution to choose
                the structure that best matches your trading style.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-5">
              <div className="text-xs font-black text-brand-500">
                Quick Account View
              </div>

              <div className="mt-2 text-2xl font-black">
                {leftAccounts.length === rightAccounts.length
                  ? "Account ranges are closely matched"
                  : leftAccounts.length > rightAccounts.length
                  ? `${leftName} lists more accounts`
                  : `${rightName} lists more accounts`}
              </div>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Account quantity alone does not determine value.
                Compare pricing and entry requirements as well.
              </p>
            </div>
          </div>

          {/* Account indicators */}
          <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-[24px] border border-[#dbeafe] bg-[#f8fbff]">
            <div className="border-r border-[#dbeafe] p-5 text-center">
              <div className="text-xs font-black text-slate-500">
                Available Accounts
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  {
                    name: leftName,
                    value: leftAccounts.length,
                  },
                  {
                    name: rightName,
                    value: rightAccounts.length,
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex min-h-[96px] flex-col items-center justify-center rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3"
                  >
                    <div className="text-xs font-black text-brand-500">
                      {item.name}
                    </div>

                    <div className="mt-1 text-2xl font-black">
                      {item.value}
                    </div>

                    <div className="text-[9px] font-bold text-slate-400">
                      account{item.value === 1 ? "" : "s"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-r border-[#dbeafe] p-5 text-center">
              <div className="text-xs font-black text-slate-500">
                Better for Beginners
              </div>

              <div className="mt-5 text-2xl font-black">
                {beginnerDecision}
              </div>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Based on deposit requirements and account
                accessibility.
              </p>
            </div>

            <div className="p-5 text-center">
              <div className="text-xs font-black text-slate-500">
                Important Before Choosing
              </div>

              <div className="mt-5 text-xl font-black">
                Account conditions matter more than account count
              </div>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Compare spreads, commissions, execution and deposits.
              </p>
            </div>
          </div>

          {/* Main account-factor comparison */}
          <div className="mt-6 overflow-hidden rounded-[22px] border border-[#dbeafe]">
            <div className="grid grid-cols-[1.15fr_1fr_1fr] bg-[#eff6ff] text-sm font-black">
              <div className="border-r border-[#dbeafe] px-5 py-4">
                Comparison Factor
              </div>

              <div className="border-r border-[#dbeafe] px-5 py-4 text-center">
                {leftName}
              </div>

              <div className="px-5 py-4 text-center">
                {rightName}
              </div>
            </div>

            {[
              {
  label: "Main Account",
  leftValue:
    leftAccounts[0]?.account_name_en ||
    leftAccounts[0]?.account_name ||
    "Not specified",
  rightValue:
    rightAccounts[0]?.account_name_en ||
    rightAccounts[0]?.account_name ||
    "Not specified",
},
              {
  label: "Minimum Deposit",
  leftValue: leftMinimumDeposit,
  rightValue: rightMinimumDeposit,
},
              {
                label: "Starting Spread",
                leftValue:
                  leftAccounts.find((account) =>
                    cleanText(
                      account.spread_en || account.spread
                    )
                  )?.spread_en ||
                  leftAccounts.find((account) =>
                    cleanText(account.spread)
                  )?.spread ||
                  cleanText(left.spreads_en || left.spreads) ||
                  "Not specified",
                rightValue:
                  rightAccounts.find((account) =>
                    cleanText(
                      account.spread_en || account.spread
                    )
                  )?.spread_en ||
                  rightAccounts.find((account) =>
                    cleanText(account.spread)
                  )?.spread ||
                  cleanText(right.spreads_en || right.spreads) ||
                  "Not specified",
              },
              {
                label: "Trading Commission",
                leftValue:
                  leftAccounts.find((account) =>
                    cleanText(
                      account.commission_en ||
                        account.commission
                    )
                  )?.commission_en ||
                  leftAccounts.find((account) =>
                    cleanText(account.commission)
                  )?.commission ||
                  "Not specified",
                rightValue:
                  rightAccounts.find((account) =>
                    cleanText(
                      account.commission_en ||
                        account.commission
                    )
                  )?.commission_en ||
                  rightAccounts.find((account) =>
                    cleanText(account.commission)
                  )?.commission ||
                  "Not specified",
              },
              {
                label: "Order Execution",
                leftValue:
                  leftAccounts.find((account) =>
                    cleanText(
                      account.execution_type_en ||
                        account.execution_type
                    )
                  )?.execution_type_en ||
                  leftAccounts.find((account) =>
                    cleanText(account.execution_type)
                  )?.execution_type ||
                  "Not specified",
                rightValue:
                  rightAccounts.find((account) =>
                    cleanText(
                      account.execution_type_en ||
                        account.execution_type
                    )
                  )?.execution_type_en ||
                  rightAccounts.find((account) =>
                    cleanText(account.execution_type)
                  )?.execution_type ||
                  "Not specified",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.15fr_1fr_1fr] border-t border-[#dbeafe] text-sm"
              >
                <div className="border-r border-[#dbeafe] px-5 py-4 font-black">
                  {row.label}
                </div>

                <div className="border-r border-[#dbeafe] px-5 py-4 text-center font-bold text-slate-700">
                  {row.leftValue}
                </div>

                <div className="px-5 py-4 text-center font-bold text-slate-700">
                  {row.rightValue}
                </div>
              </div>
            ))}
          </div>

          {/* Broker account groups */}
          <div className="mt-6 space-y-5">
            {[
              {
                broker: left,
                brokerAccounts: leftAccounts,
              },
              {
                broker: right,
                brokerAccounts: rightAccounts,
              },
            ].map(({ broker, brokerAccounts }) => {
              const name = brokerName(broker);

              return (
                <article
                  key={broker.id}
                  className="overflow-hidden rounded-[26px] border border-[#dbeafe] bg-[#f8fbff]"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[#dbeafe] px-5 py-4">
                    <div>
                      <div className="text-[10px] font-black text-brand-500">
                        Available Account Types
                      </div>

                      <h3 className="mt-1 text-2xl font-black">
                        {name} Accounts
                      </h3>
                    </div>

                    <span className="rounded-full border border-[#bfdbfe] bg-white px-3 py-1.5 text-[11px] font-black text-brand-500">
                      {brokerAccounts.length} account
                      {brokerAccounts.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  {/* Accounts display */}
<div className="p-5">
  {/* Scroll indication when accounts exceed four */}
  {brokerAccounts.length > 4 && (
    <div className="mb-3 flex items-center justify-between gap-4">
      <p className="text-xs font-bold text-slate-500">
        Scroll horizontally to view the remaining accounts
      </p>

      <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-500">
        {brokerAccounts.length} accounts
      </span>
    </div>
  )}

  <div
    className={
      brokerAccounts.length > 4
        ? "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
        : "grid gap-4"
    }
    style={
      brokerAccounts.length <= 4
        ? {
            gridTemplateColumns: `repeat(${Math.max(
              brokerAccounts.length,
              1
            )}, minmax(0, 1fr))`,
          }
        : undefined
    }
  >
    {brokerAccounts.length > 0 ? (
      brokerAccounts.map((account) => {
        const accountName =
          account.account_name_en ||
          account.account_name ||
          "Trading Account";

        const accountPath = accountSlug(
          account.account_name_en ||
            account.account_name
        );

        return (
          <article
            key={account.id}
            className={`flex min-h-[225px] flex-col rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#93c5fd] hover:shadow-[0_12px_28px_rgba(37,99,235,0.10)] ${
              brokerAccounts.length > 4
                ? "w-[calc((100%_-_48px)/4)] min-w-[270px] shrink-0 snap-start"
                : ""
            }`}
          >
            {/* Account name */}
            <div className="min-h-[62px] border-b border-slate-100 pb-3">
              <Link
                href={`/en/brokers/${broker.slug}/accounts/${accountPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-black leading-6 text-[#0f172a] transition hover:text-brand-500"
              >
                {accountName}
              </Link>

              <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-brand-500">
                {account.best_for_en ||
                  account.best_for ||
                  "Suitable for different trader profiles"}
              </p>
            </div>

            {/* Account information */}
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <div className="text-[10px] font-bold text-slate-400">
                  Spread
                </div>

                <div className="mt-1 text-sm font-black text-[#0f172a]">
                  {account.spread_en ||
                    account.spread ||
                    "Not specified"}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400">
                  Commission
                </div>

                <div className="mt-1 text-sm font-black text-[#0f172a]">
                  {account.commission_en ||
                    account.commission ||
                    "Not specified"}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400">
                  Minimum Deposit
                </div>

                <div className="mt-1 text-sm font-black text-[#0f172a]">
                  {account.min_deposit_en ||
                    account.min_deposit ||
                    "Not specified"}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400">
                  Execution
                </div>

                <div className="mt-1 break-words text-sm font-black leading-5 text-[#0f172a]">
                  {account.execution_type_en ||
                    account.execution_type ||
                    "Not specified"}
                </div>
              </div>
            </div>

            {/* Account details */}
            <div className="mt-auto pt-4">
              <Link
                href={`/en/brokers/${broker.slug}/accounts/${accountPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-black text-brand-500 transition hover:underline"
              >
                Account Details
                <span className="ml-1">→</span>
              </Link>
            </div>
          </article>
        );
      })
    ) : (
      <div className="w-full rounded-[20px] border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
        No account information is currently available for {name}.
      </div>
    )}
  </div>
</div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-[20px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-center">
            <p className="text-sm leading-7 text-slate-500">
              Actual trading costs depend on the account type,
              instrument and market conditions. Compare spreads,
              commissions, deposits and execution before choosing.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
    ACCOUNTS & TRADING COSTS — MOBILE
====================================================== */}
<section className="mx-auto max-w-[1520px] px-3 pb-4 md:hidden">
  <div className="relative overflow-hidden rounded-[28px] border border-[#dbeafe] bg-white p-4 shadow-[0_16px_45px_rgba(37,99,235,0.07)]">
    <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />

    {/* Header */}
    <div>
      <span className="text-[12px] font-black text-brand-500">
        Accounts & Trading Costs
      </span>

      <h2 className="mt-1.5 text-[26px] font-black leading-[1.25] text-[#0f172a]">
        Compare Accounts and Fees
      </h2>

      <p className="mt-2 text-[14px] leading-7 text-slate-600">
        Compare account types, spreads, commissions and minimum
        deposits at {leftName} and {rightName}.
      </p>
    </div>

    {/* Quick cost result */}
    <div className="mt-4 rounded-[22px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] px-4 py-4 shadow-[0_10px_25px_rgba(37,99,235,0.08)]">
      <div className="text-[11px] font-black text-brand-500">
        Quick Cost Comparison
      </div>

      <div className="mt-1.5 break-words text-[22px] font-black leading-7 text-[#0f172a]">
        {scalpingWinner === "Tie"
          ? "Trading costs are closely matched"
          : scalpingWinner}
      </div>

      <p className="mt-2 text-[12px] leading-6 text-slate-600">
        {scalpingWinner === "Tie"
          ? "Neither broker has a decisive cost advantage, so compare the conditions of each account."
          : `${scalpingWinner} shows an advantage in trading costs or spreads based on the available data.`}
      </p>
    </div>

    {/* Account counts */}
    <div className="mt-3 grid grid-cols-2 gap-2">
      {[
        {
          broker: left,
          brokerAccounts: leftAccounts,
        },
        {
          broker: right,
          brokerAccounts: rightAccounts,
        },
      ].map(({ broker, brokerAccounts }) => {
        const name = brokerName(broker);

        return (
          <div
            key={broker.id}
            className="flex min-w-0 flex-col items-center justify-center rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-2 py-3 text-center"
          >
            <div className="flex min-h-[34px] items-center justify-center">
              <span className="break-words text-[11px] font-black leading-4 text-brand-500">
                {name}
              </span>
            </div>

            <div className="mt-1 text-[24px] font-black leading-none text-[#0f172a]">
              {brokerAccounts.length}
            </div>

            <div className="mt-1 text-[10px] font-bold text-slate-400">
              {brokerAccounts.length === 1
                ? "available account"
                : "available accounts"}
            </div>
          </div>
        );
      })}
    </div>

    {/* Beginner result */}
    <div className="mt-2 flex items-center justify-between gap-3 rounded-[17px] border border-[#dbeafe] bg-white px-3.5 py-3">
      <div>
        <div className="text-[10px] font-bold text-slate-400">
          Ease of Entry
        </div>

        <div className="mt-0.5 text-[12px] font-black text-slate-600">
          Best for Beginners
        </div>
      </div>

      <span className="max-w-[52%] break-words text-right text-[14px] font-black leading-5 text-[#0f172a]">
        {beginnerWinner === "Tie"
          ? "Both are suitable"
          : beginnerWinner}
      </span>
    </div>

    {/* Main account comparison */}
    <div className="mt-4 overflow-hidden rounded-[21px] border border-[#dbeafe] bg-white">
      {/* Table heading */}
      <div className="grid grid-cols-[minmax(0,1fr)_80px_80px] items-center bg-[#f8fbff]">
        <div className="px-3 py-3 text-[10px] font-black text-slate-400">
          Comparison
        </div>

        <div className="flex min-h-[48px] items-center justify-center border-l border-[#dbeafe] px-1.5 py-2 text-center">
          <span className="break-words text-[10px] font-black leading-4 text-[#0f172a]">
            {leftName}
          </span>
        </div>

        <div className="flex min-h-[48px] items-center justify-center border-l border-[#dbeafe] px-1.5 py-2 text-center">
          <span className="break-words text-[10px] font-black leading-4 text-[#0f172a]">
            {rightName}
          </span>
        </div>
      </div>

      {[
        {
  label: "Main Account",
  leftValue:
    leftAccounts[0]?.account_name_en ||
    leftAccounts[0]?.account_name ||
    "Not specified",
  rightValue:
    rightAccounts[0]?.account_name_en ||
    rightAccounts[0]?.account_name ||
    "Not specified",
},
        {
  label: "Minimum Deposit",
  leftValue: leftMinimumDeposit,
  rightValue: rightMinimumDeposit,
},
        {
          label: "Spread",
          leftValue:
            leftAccounts.find((account) =>
              cleanText(account.spread_en || account.spread)
            )?.spread_en ||
            leftAccounts.find((account) =>
              cleanText(account.spread)
            )?.spread ||
            cleanText(left.spreads_en) ||
            "Not specified",
          rightValue:
            rightAccounts.find((account) =>
              cleanText(account.spread_en || account.spread)
            )?.spread_en ||
            rightAccounts.find((account) =>
              cleanText(account.spread)
            )?.spread ||
            cleanText(right.spreads_en) ||
            "Not specified",
        },
        {
          label: "Commission",
          leftValue:
            leftAccounts.find((account) =>
              cleanText(
                account.commission_en ||
                  account.commission
              )
            )?.commission_en ||
            leftAccounts.find((account) =>
              cleanText(account.commission)
            )?.commission ||
            cleanText(left.fees_en) ||
            "Not specified",
          rightValue:
            rightAccounts.find((account) =>
              cleanText(
                account.commission_en ||
                  account.commission
              )
            )?.commission_en ||
            rightAccounts.find((account) =>
              cleanText(account.commission)
            )?.commission ||
            cleanText(right.fees_en) ||
            "Not specified",
        },
        {
          label: "Execution",
          leftValue:
            leftAccounts.find((account) =>
              cleanText(
                account.execution_type_en ||
                  account.execution_type
              )
            )?.execution_type_en ||
            leftAccounts.find((account) =>
              cleanText(account.execution_type)
            )?.execution_type ||
            "Not specified",
          rightValue:
            rightAccounts.find((account) =>
              cleanText(
                account.execution_type_en ||
                  account.execution_type
              )
            )?.execution_type_en ||
            rightAccounts.find((account) =>
              cleanText(account.execution_type)
            )?.execution_type ||
            "Not specified",
        },
      ].map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[minmax(0,1fr)_80px_80px] items-stretch border-t border-[#dbeafe]"
        >
          <div className="flex min-w-0 items-center bg-[#fbfdff] px-3 py-3 text-[11px] font-black leading-5 text-slate-600">
            {row.label}
          </div>

          <div className="flex min-w-0 items-center justify-center border-l border-[#dbeafe] px-1.5 py-3 text-center">
            <span className="break-words text-[10px] font-black leading-4 text-[#0f172a]">
              {row.leftValue}
            </span>
          </div>

          <div className="flex min-w-0 items-center justify-center border-l border-[#dbeafe] px-1.5 py-3 text-center">
            <span className="break-words text-[10px] font-black leading-4 text-[#0f172a]">
              {row.rightValue}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Account details */}
    <div className="mt-6">
      <span className="text-[10px] font-black text-brand-500">
        Account Details
      </span>

      <h3 className="mt-1 text-[21px] font-black leading-7 text-[#0f172a]">
        Explore Available Account Types
      </h3>

      <p className="mt-1 text-[12px] leading-6 text-slate-500">
        Open each broker to compare the spread, commission,
        deposit and execution method for every account.
      </p>

      <div className="mt-3 space-y-3">
        {[
          {
            broker: left,
            brokerAccounts: leftAccounts,
          },
          {
            broker: right,
            brokerAccounts: rightAccounts,
          },
        ].map(({ broker, brokerAccounts }) => {
          const name = brokerName(broker);

          return (
            <details
              key={broker.id}
              className="group overflow-hidden rounded-[22px] border border-[#dbeafe] bg-white"
            >
              {/* Broker heading */}
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-[#f8fbff] px-4 py-4 [&::-webkit-details-marker]:hidden">
                <div className="min-w-0">
                  <h4 className="break-words text-[17px] font-black leading-6 text-[#0f172a]">
                    {name} Accounts
                  </h4>

                  <p className="mt-1 text-[11px] font-bold text-brand-500">
                    {brokerAccounts.length}{" "}
                    {brokerAccounts.length === 1
                      ? "available account"
                      : "available accounts"}
                  </p>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[11px] font-black text-brand-500 transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>

              {/* Accounts */}
              <div className="border-t border-[#dbeafe]">
                {brokerAccounts.length > 0 ? (
                  brokerAccounts.map((account, index) => {
                    const accountName =
  account.account_name_en ||
  account.account_name ||
  "Trading Account";

                    const accountPath = accountSlug(
                      account.account_name_en ||
                        account.account_name
                    );

                    return (
                      <article
                        key={account.id}
                        className={`px-4 py-4 ${
                          index !== brokerAccounts.length - 1
                            ? "border-b border-slate-100"
                            : ""
                        }`}
                      >
                        {/* Account heading */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={`/en/brokers/${broker.slug}/accounts/${accountPath}`}
                              className="break-words text-[15px] font-black leading-6 text-[#0f172a] transition hover:text-brand-500"
                            >
                              {accountName}
                            </Link>

                            <p className="mt-0.5 line-clamp-2 text-[11px] font-bold leading-5 text-brand-500">
                              {account.best_for_en ||
                                "Suitable for different trader profiles"}
                            </p>
                          </div>

                          <Link
                            href={`/en/brokers/${broker.slug}/accounts/${accountPath}`}
                            aria-label={`${accountName} account details`}
                            className="shrink-0 rounded-full bg-[#eff6ff] px-3 py-1.5 text-[10px] font-black text-brand-500"
                          >
                            Details
                          </Link>
                        </div>

                        {/* Account data */}
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="min-w-0 rounded-[13px] bg-[#f8fafc] px-2 py-2.5">
                            <div className="text-[9px] font-bold text-slate-400">
                              Spread
                            </div>

                            <div className="mt-1 break-words text-[10px] font-black leading-4 text-[#0f172a]">
                              {account.spread_en ||
                                account.spread ||
                                "Not specified"}
                            </div>
                          </div>

                          <div className="min-w-0 rounded-[13px] bg-[#f8fafc] px-2 py-2.5">
                            <div className="text-[9px] font-bold text-slate-400">
                              Commission
                            </div>

                            <div className="mt-1 break-words text-[10px] font-black leading-4 text-[#0f172a]">
                              {account.commission_en ||
                                account.commission ||
                                "Not specified"}
                            </div>
                          </div>

                          <div className="min-w-0 rounded-[13px] bg-[#f8fafc] px-2 py-2.5">
                            <div className="text-[9px] font-bold text-slate-400">
                              Deposit
                            </div>

                            <div className="mt-1 break-words text-[10px] font-black leading-4 text-[#0f172a]">
                              {account.min_deposit_en ||
                                account.min_deposit ||
                                "Not specified"}
                            </div>
                          </div>
                        </div>

                        {(account.execution_type_en ||
                          account.execution_type) && (
                          <div className="mt-2.5 rounded-xl bg-[#fbfdff] px-3 py-2 text-[10px] leading-5 text-slate-500">
                            <span className="font-bold">
                              Execution:
                            </span>{" "}
                            <span className="font-black text-[#0f172a]">
                              {account.execution_type_en ||
                                account.execution_type}
                            </span>
                          </div>
                        )}
                      </article>
                    );
                  })
                ) : (
                  <div className="px-4 py-5 text-center text-[12px] leading-6 text-slate-500">
                    No account information is currently available
                    for {name}.
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </div>

    {/* Note */}
    <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-4 py-3">
      <p className="text-[11px] leading-6 text-slate-600">
        Do not choose a broker based only on the number of accounts.
        Compare spreads, commissions, minimum deposits and execution
        methods before selecting a trading account.
      </p>
    </div>

    {/* CTA */}
    <div className="mt-4 rounded-[22px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-4">
      <h3 className="text-[19px] font-black leading-7 text-[#0f172a]">
        Choose the Broker That Fits Your Trading
      </h3>

      <p className="mt-1 text-[12px] leading-6 text-slate-600">
        Continue after reviewing the available accounts and trading
        costs.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[left, right].map((broker, index) => {
          const name = brokerName(broker);

          return (
            <div
              key={broker.id}
              className="flex min-w-0 flex-col rounded-[16px] border border-[#dbeafe] bg-white p-2.5 text-center"
            >
              <div className="flex min-h-[42px] items-center justify-center">
                <span className="break-words text-[12px] font-black leading-5 text-[#0f172a]">
                  {name}
                </span>
              </div>

              <a
  href={`/go/${broker.slug ?? ""}?type=real`}
  target="_blank"
  rel="noopener noreferrer sponsored nofollow"
  aria-label={`Start with ${name}`}
  className={`mt-2 inline-flex h-[44px] w-full items-center justify-center whitespace-nowrap rounded-xl px-2 py-2 text-center text-[11px] font-black transition ${
    index === 0
      ? "bg-brand-500 text-white shadow-sm hover:bg-brand-600"
      : "border border-slate-300 bg-white text-slate-800 hover:border-[#93c5fd] hover:text-brand-500"
  }`}
>
  Start Now
</a>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

      {/* ======================================================
          SAFETY & REGULATION — DESKTOP
      ====================================================== */}
      <section className="mx-auto hidden max-w-[1520px] px-4 pb-4 sm:px-6 md:block lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-[#dbeafe] bg-white p-6 shadow-[0_25px_70px_rgba(37,99,235,0.08)] lg:p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

          <div className="grid gap-6 lg:grid-cols-[1fr_350px] lg:items-center">
            <div>
              <span className="text-sm font-black text-brand-500">
                Safety & Regulation
              </span>

              <h2 className="mt-2 text-3xl font-black leading-tight lg:text-[42px]">
                Safety and Regulation: {leftName} vs {rightName}
              </h2>

              <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600">
                Compare regulators, licence numbers, legal entities
                and client-fund protection to identify the company
                that will actually be responsible for each account.
              </p>
            </div>

            <div className="rounded-[26px] border border-[#93c5fd] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-5">
              <div className="text-xs font-black text-brand-500">
                Regulatory Comparison
              </div>

              <div className="mt-2 text-2xl font-black">
                {safetyWinner}
              </div>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {safetyWinner === "Very close"
                  ? "No clear safety difference is visible. Compare the legal entity assigned to each account."
                  : "Scores higher for safety in this comparison, but the registration entity must still be verified."}
              </p>
            </div>
          </div>

          {/* Safety indicators */}
          <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-[24px] border border-[#dbeafe] bg-[#f8fbff]">
            <div className="border-r border-[#dbeafe] p-5 text-center">
              <div className="text-xs font-black text-slate-500">
                Safety Score
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {[left, right].map((broker) => (
                  <div
                    key={broker.id}
                    className="flex min-h-[104px] flex-col items-center justify-center rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3"
                  >
                    <div className="text-xs font-black text-brand-500">
                      {brokerName(broker)}
                    </div>

                    <div className="mt-1 text-2xl font-black">
                      {(broker.score_safety ?? 0).toFixed(2)}
                    </div>

                    <div className="text-[9px] font-bold text-slate-400">
                      out of 5
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-r border-[#dbeafe] p-5 text-center">
              <div className="text-xs font-black text-slate-500">
                Registered Licences
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  {
                    broker: left,
                    count: leftLicences.length,
                  },
                  {
                    broker: right,
                    count: rightLicences.length,
                  },
                ].map(({ broker, count }) => (
                  <div
                    key={broker.id}
                    className="flex min-h-[104px] flex-col items-center justify-center rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3"
                  >
                    <div className="text-xs font-black text-brand-500">
                      {brokerName(broker)}
                    </div>

                    <div className="mt-1 text-2xl font-black">
                      {count}
                    </div>

                    <div className="text-[9px] font-bold text-slate-400">
                      active licence{count === 1 ? "" : "s"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 text-center">
              <div className="text-xs font-black text-slate-500">
                Islamic Account
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {[left, right].map((broker) => {
                  const status = yesNoEnglish(
                    broker.islamic_account
                  );

                  return (
                    <div
                      key={broker.id}
                      className="flex min-h-[104px] flex-col items-center justify-center rounded-[16px] border border-[#dbeafe] bg-white px-3 py-3"
                    >
                      <div className="text-xs font-black text-brand-500">
                        {brokerName(broker)}
                      </div>

                      <span
                        className={`mt-2 rounded-full px-3 py-1 text-[10px] font-black ${
                          status === "Available"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Regulatory profiles */}
<div className="mt-8 space-y-6">
  {[left, right].map((broker) => {
    const brokerLicences =
      broker.id === left.id ? leftLicences : rightLicences;

    const name = brokerName(broker);

    const regulationParagraphs = splitParagraphs(
      broker.regulation_summary_en
    );

    const safetyFactors = splitSafetyFactors(
      broker.safety_factors_en
    );

    return (
      <article
        key={broker.id}
        className="overflow-hidden rounded-[30px] border border-[#dbeafe] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]"
      >
        {/* Broker heading */}
        <div className="flex items-center justify-between gap-6 border-b border-[#dbeafe] bg-[linear-gradient(90deg,#eff6ff_0%,#ffffff_100%)] px-6 py-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] border border-[#dbeafe] bg-white p-2 shadow-sm">
              {broker.logo ? (
                <img
                  src={broker.logo}
                  alt={`${name} logo`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs font-black text-slate-400">
                  {name}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="text-xs font-black text-brand-500">
                Regulatory Profile
              </div>

              <h3 className="mt-1 break-words text-2xl font-black text-[#0f172a]">
                {name} Licences
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {brokerLicences.length} registered licence
                {brokerLicences.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3">
            <div className="rounded-[18px] border border-[#dbeafe] bg-white px-4 py-3 text-center">
              <div className="text-xs font-bold text-slate-400">
                Headquarters
              </div>

              <div className="mt-1 text-sm font-black text-[#0f172a]">
                {broker.headquarters_en ||
                  broker.headquarters ||
                  "Not specified"}
              </div>
            </div>

            <div className="rounded-[18px] border border-[#dbeafe] bg-white px-4 py-3 text-center">
              <div className="text-xs font-bold text-slate-400">
                Safety Score
              </div>

              <div className="mt-1 text-sm font-black text-brand-500">
                {(broker.score_safety ?? 0).toFixed(2)} out of 5
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory summary */}
        <div className="px-6 py-6">
          <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
            {/* Safety factors */}
            <aside className="rounded-[22px] border border-[#dbeafe] bg-[#f8fbff] p-4">
              <h4 className="text-sm font-black text-[#0f172a]">
                Key Safety Factors
              </h4>

              <div className="mt-3 space-y-2">
                {safetyFactors.length > 0 ? (
                  safetyFactors.map((factor, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-[13px] border border-[#dbeafe] bg-white px-3 py-2.5"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                      <span className="text-xs font-bold leading-5 text-slate-700">
                        {factor}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs leading-6 text-slate-500">
                    Safety factors depend on the legal entity responsible
                    for the account.
                  </p>
                )}
              </div>
            </aside>

            {/* Summary text */}
            <div className="min-w-0">
              <h4 className="text-xl font-black text-[#0f172a]">
                Regulatory Summary
              </h4>

              <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-700">
                {regulationParagraphs.length > 0 ? (
                  regulationParagraphs.map((paragraph, index) => (
                    <p key={index} className="break-words">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>
                    No detailed regulatory summary is currently available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Licences table */}
        <div className="border-y border-[#dbeafe] bg-[#fbfdff] px-6 py-6">
          <div className="mb-4 flex items-end justify-between gap-5">
            <div>
              <h4 className="text-xl font-black text-[#0f172a]">
                Regulators and Licence Numbers
              </h4>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Verify the regulator, legal entity and licence number
                before opening an account.
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white px-4 py-2 text-xs font-black text-brand-500 shadow-sm">
              {brokerLicences.length}{" "}
              {brokerLicences.length === 1 ? "record" : "records"}
            </span>
          </div>

          {brokerLicences.length > 0 ? (
            <div className="overflow-x-auto rounded-[22px] border border-[#dbeafe] bg-white">
              <div className="min-w-[1180px]">
                {/* Table header */}
                <div className="grid grid-cols-[1.1fr_0.8fr_0.9fr_2.2fr_1fr_0.9fr] items-stretch border-b border-[#dbeafe] bg-[#f4f8fd] text-center">
                  <div className="flex min-h-[54px] items-center justify-center px-3 py-3 text-xs font-black text-slate-600">
                    Regulator
                  </div>

                  <div className="flex min-h-[54px] items-center justify-center border-l border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
                    Country
                  </div>

                  <div className="flex min-h-[54px] items-center justify-center border-l border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
                    Licence Number
                  </div>

                  <div className="flex min-h-[54px] items-center justify-center border-l border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
                    Legal Entity
                  </div>

                  <div className="flex min-h-[54px] items-center justify-center border-l border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
                    Oversight Level
                  </div>

                  <div className="flex min-h-[54px] items-center justify-center border-l border-[#dbeafe] px-3 py-3 text-xs font-black text-slate-600">
                    Verification
                  </div>
                </div>

                {/* Table rows */}
                {brokerLicences.map((licence, index) => {
                  const verificationUrl =
                    licence.verification_url_en ||
                    licence.verification_url_ar;

                  return (
                    <div
                      key={licence.id}
                      className={`grid grid-cols-[1.1fr_0.8fr_0.9fr_2.2fr_1fr_0.9fr] items-stretch text-center text-sm transition-colors hover:bg-[#f8fbff] ${
                        index !== brokerLicences.length - 1
                          ? "border-b border-[#dbeafe]"
                          : ""
                      }`}
                    >
                      {/* Regulator */}
                      <div className="flex min-h-[88px] flex-col items-center justify-center px-3 py-3">
                        <span className="font-black text-[#0f172a]">
                          {licence.regulator_code || "Not specified"}
                        </span>

                        {licence.regulator_name_en ? (
                          <span className="mt-1 max-w-[170px] text-[10px] leading-4 text-slate-400">
                            {licence.regulator_name_en}
                          </span>
                        ) : null}
                      </div>

                      {/* Country */}
                      <div className="flex min-h-[88px] items-center justify-center border-l border-[#dbeafe] px-3 py-3">
                        <span className="font-bold leading-5 text-slate-700">
                          {licence.country_en || "Not specified"}
                        </span>
                      </div>

                      {/* Licence number */}
                      <div className="flex min-h-[88px] items-center justify-center border-l border-[#dbeafe] px-3 py-3">
                        <span
                          dir="ltr"
                          className="font-black text-[#0f172a]"
                        >
                          {licence.license_number ||
                            "Not publicly available"}
                        </span>
                      </div>

                      {/* Legal entity */}
                      <div className="flex min-h-[88px] items-center justify-center border-l border-[#dbeafe] px-4 py-3">
                        <span className="max-w-[340px] break-words text-center font-bold leading-6 text-slate-700">
                          {licence.entity_name_en || "Not specified"}
                        </span>
                      </div>

                      {/* Oversight level */}
                      <div className="flex min-h-[88px] flex-col items-center justify-center border-l border-[#dbeafe] px-3 py-3">
                        <span
                          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-black ${licenseTrustClasses(
                            licence.trust_level
                          )}`}
                        >
                          {licenseTrustLabel(licence.trust_level)}
                        </span>

                        <span className="mt-1.5 text-[9px] font-bold text-slate-400">
                          {licenseStatusLabel(licence.status_code)}
                        </span>
                      </div>

                      {/* Verification */}
                      <div className="flex min-h-[88px] items-center justify-center border-l border-[#dbeafe] px-3 py-3">
                        {verificationUrl ? (
                          <a
                            href={verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            aria-label={`Verify the ${
                              licence.regulator_code || name
                            } licence`}
                            className="inline-flex min-h-[36px] items-center justify-center whitespace-nowrap rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-[10px] font-black text-brand-500 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                          >
                            Official Check
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">
                            Not available
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4 text-center text-sm leading-7 text-amber-800">
              No licence records are currently available for {name}.
            </div>
          )}
        </div>

        {/* Fund protection */}
        <div className="px-6 py-6">
          <div className="rounded-[22px] border border-emerald-200 bg-emerald-50/60 px-5 py-5">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-lg font-black text-[#0f172a]">
                Client Fund Protection at {name}
              </h4>

              <span className="shrink-0 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-black text-emerald-700">
                Varies by entity
              </span>
            </div>

            <div className="mt-3 space-y-3 text-[15px] leading-8 text-slate-700">
  {splitParagraphs(
    cleanText(broker.fund_protection_en) ||
      "Review client-fund segregation, negative balance protection and compensation arrangements under the legal entity responsible for your account."
  ).map((paragraph, index) => (
    <p key={index} className="break-words">
      {paragraph}
    </p>
  ))}
</div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400">
            Last licence-record verification:{" "}
            <span className="font-bold text-slate-600">
              {brokerLicences.length > 0
                ? formatVerifiedDate(
                    brokerLicences
                      .map((licence) => licence.last_verified)
                      .filter(Boolean)
                      .sort()
                      .reverse()[0] || null
                  )
                : "Not specified"}
            </span>
          </div>
        </div>
      </article>
    );
  })}
</div>

          <div className="mt-6 rounded-[20px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-center">
            <p className="text-sm leading-7 text-slate-500">
              The number of licences alone does not determine safety.
              Verify the legal entity named in your client agreement,
              its licence number and the protections that apply before
              depositing.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
    SAFETY & REGULATION — MOBILE
====================================================== */}
<section className="mx-auto max-w-[1520px] px-3 pb-4 md:hidden">
  <div className="relative overflow-hidden rounded-[28px] border border-[#dbeafe] bg-white px-4 pb-5 pt-5 shadow-[0_16px_45px_rgba(37,99,235,0.07)]">
    <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />

    {/* Header */}
    <div>
      <span className="text-[11px] font-black text-brand-500">
        Safety & Regulation
      </span>

      <h2 className="mt-1.5 text-[25px] font-black leading-[1.35] text-[#0f172a]">
        Compare Broker Safety
      </h2>

      <p className="mt-1 text-[12px] font-bold leading-6 text-slate-500">
        {leftName} vs {rightName}
      </p>

      <p className="mt-2 text-[12px] leading-6 text-slate-500">
        Compare safety scores, regulators and the legal entity
        responsible for each trading account.
      </p>
    </div>

    {/* Compact safety comparison */}
    <div className="mt-4 overflow-hidden rounded-[22px] border border-[#bfdbfe] bg-white">
      {/* Safety scores */}
      <div className="grid grid-cols-2 divide-x divide-[#dbeafe] bg-[#f8fbff]">
        {[
          {
            broker: left,
            brokerLicences: leftLicences,
          },
          {
            broker: right,
            brokerLicences: rightLicences,
          },
        ].map(({ broker }) => {
          const name = brokerName(broker);

          return (
            <div
              key={broker.id}
              className="min-w-0 px-3 py-4 text-center"
            >
              <div className="flex min-h-[32px] items-center justify-center">
                <span className="break-words text-[11px] font-black leading-4 text-[#0f172a]">
                  {name}
                </span>
              </div>

              <div className="mt-1.5 text-[25px] font-black leading-none text-brand-500">
                {(broker.score_safety ?? 0).toFixed(2)}
              </div>

              <div className="mt-1.5 text-[9px] font-bold text-slate-400">
                Safety score out of 5
              </div>
            </div>
          );
        })}
      </div>

      {/* Broker information */}
      <div className="border-t border-[#dbeafe] px-3 py-3">
        {[
          {
            broker: left,
            brokerLicences: leftLicences,
          },
          {
            broker: right,
            brokerLicences: rightLicences,
          },
        ].map(({ broker, brokerLicences }, index) => {
          const name = brokerName(broker);
          const islamicStatus = yesNoEnglish(
            broker.islamic_account
          );

          return (
            <div
              key={broker.id}
              className={`flex items-center justify-between gap-3 py-2 ${
                index === 0
                  ? "border-b border-[#eaf2fc]"
                  : ""
              }`}
            >
              <span className="min-w-0 break-words text-[10px] font-black text-[#0f172a]">
                {name}
              </span>

              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-[#eff6ff] px-2.5 py-1.5 text-[9px] font-black text-brand-500">
                  {brokerLicences.length}{" "}
                  {brokerLicences.length === 1
                    ? "licence"
                    : "licences"}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1.5 text-[9px] font-black ${
                    islamicStatus === "Available"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {islamicStatus === "Available"
                    ? "Islamic account"
                    : "No Islamic account"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Important hint */}
      <div className="border-t border-[#dbeafe] bg-[#f8fbff] px-4 py-3 text-center">
        <p className="text-[10px] font-bold leading-5 text-slate-500">
          The number of licences alone is not enough. Verify the
          legal entity that will hold your account.
        </p>
      </div>
    </div>

    {/* Broker regulatory profiles */}
    <div className="mt-4 space-y-3">
      {[
        {
          broker: left,
          brokerLicences: leftLicences,
        },
        {
          broker: right,
          brokerLicences: rightLicences,
        },
      ].map(({ broker, brokerLicences }) => {
        const name = brokerName(broker);

        const regulationParagraphs = splitParagraphs(
          broker.regulation_summary_en
        );

        const fundProtectionParagraphs = splitParagraphs(
          cleanText(broker.fund_protection_en) ||
            "Review the client-fund protection rules applied by the legal entity responsible for your account."
        );

        return (
          <details
            key={broker.id}
            className="group overflow-hidden rounded-[22px] border border-[#bfdbfe] bg-white"
          >
            {/* Broker summary */}
<summary className="flex cursor-pointer list-none items-center justify-between gap-2.5 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] px-3 py-3 [&::-webkit-details-marker]:hidden">
  {/* Logo and broker information */}
  <div className="flex min-w-0 flex-1 items-center gap-2.5">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-[#dbeafe] bg-white p-1.5 shadow-sm">
      {broker.logo ? (
        <img
          src={broker.logo}
          alt={`${name} logo`}
          className="h-full w-full scale-105 object-contain"
        />
      ) : (
        <span className="break-words text-center text-[7px] font-black leading-3 text-slate-400">
          {name}
        </span>
      )}
    </div>

    <div className="min-w-0 flex-1">
      <div className="text-[9px] font-black text-brand-500">
        Regulatory Profile
      </div>

      <h3 className="mt-0.5 line-clamp-2 break-words text-[15px] font-black leading-5 text-[#0f172a]">
        {name} Licences
      </h3>

      <p className="mt-1 break-words text-[8px] font-bold leading-4 text-slate-500">
        {brokerLicences.length}{" "}
        {brokerLicences.length === 1
          ? "registered licence"
          : "registered licences"}
        {" • "}
        {(broker.score_safety ?? 0).toFixed(2)} out of 5
      </p>
    </div>
  </div>

  {/* Open button */}
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[10px] font-black text-brand-500 transition-transform duration-200 group-open:rotate-180">
    ▼
  </span>
</summary>

            <div className="border-t border-[#dbeafe] p-3">
              {/* Basic information */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-[14px] bg-[#f8fbff] px-2 py-2.5 text-center">
                  <div className="text-[8px] font-bold text-slate-400">
                    Headquarters
                  </div>

                  <div className="mt-1 break-words text-[10px] font-black leading-4 text-[#0f172a]">
                    {broker.headquarters_en ||
                      broker.headquarters ||
                      "Not specified"}
                  </div>
                </div>

                <div className="rounded-[14px] bg-[#f8fbff] px-2 py-2.5 text-center">
                  <div className="text-[8px] font-bold text-slate-400">
                    Islamic Account
                  </div>

                  <div className="mt-1 text-[10px] font-black leading-4 text-[#0f172a]">
                    {yesNoEnglish(broker.islamic_account)}
                  </div>
                </div>
              </div>

              {/* Licences heading */}
              <div className="mb-2 mt-3 flex items-center justify-between gap-3">
                <h4 className="text-[13px] font-black text-[#0f172a]">
                  Regulators
                </h4>

                <span className="rounded-full bg-[#eff6ff] px-2.5 py-1 text-[8px] font-black text-brand-500">
                  {brokerLicences.length}{" "}
                  {brokerLicences.length === 1
                    ? "record"
                    : "records"}
                </span>
              </div>

              {/* Compact licence list */}
              {brokerLicences.length > 0 ? (
                <div className="space-y-2">
                  {brokerLicences.map((licence) => {
                    const verificationUrl =
                      licence.verification_url_en ||
                      licence.verification_url_ar;

                    return (
                      <div
                        key={licence.id}
                        className="overflow-hidden rounded-[16px] border border-[#dbeafe] bg-white"
                      >
                        {/* Main licence row */}
                        <div className="flex items-start justify-between gap-3 bg-[#f8fbff] px-3 py-2.5">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[13px] font-black text-[#0f172a]">
                                {licence.regulator_code ||
                                  "Not specified"}
                              </span>

                              <span
                                className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[8px] font-black ${licenseTrustClasses(
                                  licence.trust_level
                                )}`}
                              >
                                {licenseTrustLabel(
                                  licence.trust_level
                                )}
                              </span>
                            </div>

                            {licence.regulator_name_en ? (
                              <div className="mt-0.5 text-[8px] leading-4 text-slate-400">
                                {licence.regulator_name_en}
                              </div>
                            ) : null}
                          </div>

                          <div className="shrink-0 text-right">
                            <div className="text-[8px] font-bold text-slate-400">
                              Licence Number
                            </div>

                            <div
                              dir="ltr"
                              className="mt-0.5 text-[10px] font-black text-[#0f172a]"
                            >
                              {licence.license_number ||
                                "Not available"}
                            </div>
                          </div>
                        </div>

                        {/* Legal entity */}
                        <div className="border-t border-[#eaf2fc] px-3 py-2.5">
                          <div className="text-[8px] font-bold text-slate-400">
                            Legal Entity
                          </div>

                          <div className="mt-0.5 break-words text-[10px] font-black leading-5 text-[#0f172a]">
                            {licence.entity_name_en ||
                              "Not specified"}
                          </div>
                        </div>

                        {/* Country and verification */}
                        <div className="flex items-center justify-between gap-3 border-t border-[#eaf2fc] px-3 py-2">
                          <div className="text-[9px] font-bold text-slate-600">
                            {licence.country_en || "Not specified"}
                          </div>

                          {verificationUrl ? (
                            <a
                              href={verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              aria-label={`Verify the ${
                                licence.regulator_code || name
                              } licence`}
                              className="inline-flex items-center justify-center rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-2.5 py-1.5 text-[9px] font-black text-brand-500"
                            >
                              Official Check
                            </a>
                          ) : (
                            <span className="text-[8px] font-bold text-slate-400">
                              No verification link
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-[14px] border border-amber-200 bg-amber-50 px-3 py-3 text-center text-[10px] leading-5 text-amber-800">
                  No licence records are currently available.
                </div>
              )}

              {/* Regulatory analysis */}
              <details className="group/analysis mt-3 overflow-hidden rounded-[16px] border border-[#dbeafe] bg-[#f8fbff]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 [&::-webkit-details-marker]:hidden">
                  <div>
                    <div className="text-[11px] font-black text-brand-500">
                      Regulation and Fund Protection
                    </div>

                    <div className="mt-0.5 text-[9px] text-slate-500">
                      Read the full analysis
                    </div>
                  </div>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-black text-brand-500 transition-transform group-open/analysis:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="border-t border-[#dbeafe] bg-white px-3 py-3">
                  <h4 className="text-[12px] font-black text-[#0f172a]">
                    Regulatory Summary
                  </h4>

                  <div className="mt-2 space-y-3 text-[11px] leading-6 text-slate-600">
                    {regulationParagraphs.length > 0 ? (
                      regulationParagraphs.map(
                        (paragraph, index) => (
                          <p key={index} className="break-words">
                            {paragraph}
                          </p>
                        )
                      )
                    ) : (
                      <p>
                        No detailed regulatory summary is currently
                        available.
                      </p>
                    )}
                  </div>

                  <div className="my-3 h-px bg-[#dbeafe]" />

                  <h4 className="text-[12px] font-black text-[#0f172a]">
                    Client Fund Protection at {name}
                  </h4>

                  <div className="mt-2 space-y-3 text-[11px] leading-6 text-slate-600">
                    {fundProtectionParagraphs.map(
                      (paragraph, index) => (
                        <p key={index} className="break-words">
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </details>
            </div>
          </details>
        );
      })}
    </div>

    {/* Final note */}
    <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-3 py-3">
      <p className="text-[10px] leading-5 text-slate-500">
        Before depositing, match the legal entity and licence number
        in your client agreement with the regulator’s official
        register.
      </p>
    </div>
  </div>
</section>

           {/* ======================================================
    FINAL DECISION — DESKTOP
====================================================== */}
<section className="mx-auto hidden max-w-[1520px] px-4 pb-8 sm:px-6 sm:pb-10 md:block lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white p-6 shadow-[0_25px_70px_rgba(37,99,235,0.08)] lg:p-8">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

    {/* Header */}
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
      <div>
        <span className="text-sm font-black text-brand-500">
          Comparison Summary
        </span>

        <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-[42px]">
          Which Broker Better Fits Your Needs?
        </h2>

        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
          The decision should not depend on the broker’s name or
          overall rating alone. Compare why each broker may suit you,
          its main strengths and the trade-offs that could affect
          your trading experience.
        </p>
      </div>

      {/* Main recommendation */}
      <div className="rounded-[26px] border border-[#2563eb] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_14px_35px_rgba(37,99,235,0.11)]">
        <div className="text-xs font-black text-brand-500">
          Overall Result
        </div>

        <div className="mt-2 break-words text-3xl font-black leading-tight text-[#0f172a]">
          {recommendationLabel}
        </div>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {ratingsAreClose
            ? "The overall rating difference is limited. Choose the broker whose accounts, costs and platforms better match your trading style."
            : `${recommendedName} has the higher overall rating, but review the reasons and trade-offs below before deciding.`}
        </p>
      </div>
    </div>

    {/* Decision indicators */}
    <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-[22px] border border-[#dbeafe] bg-[#f8fbff]">
      <div className="border-r border-[#dbeafe] px-5 py-4 text-center">
        <div className="text-[11px] font-black text-slate-400">
          Overall Rating
        </div>

        <div className="mt-1 text-xl font-black text-[#0f172a]">
          {recommendationLabel}
        </div>

        <div className="mt-1 text-[10px] text-slate-500">
          {leftRating.toFixed(2)} vs {rightRating.toFixed(2)}
        </div>
      </div>

      <div className="border-r border-[#dbeafe] px-5 py-4 text-center">
        <div className="text-[11px] font-black text-slate-400">
          Easier Start
        </div>

        <div className="mt-1 text-xl font-black text-[#0f172a]">
          {beginnerDecision}
        </div>

        <div className="mt-1 text-[10px] text-slate-500">
          Based on deposit, support and account accessibility
        </div>
      </div>

      <div className="px-5 py-4 text-center">
        <div className="text-[11px] font-black text-slate-400">
          Fees & Trading Costs
        </div>

        <div className="mt-1 text-xl font-black text-[#0f172a]">
          {feesDecision}
        </div>

        <div className="mt-1 text-[10px] text-slate-500">
          Based on the fees scores in this comparison
        </div>
      </div>
    </div>

    {/* Broker decision cards */}
    <div className="mt-7 grid items-stretch gap-5 lg:grid-cols-2">
      {decisionBrokers.map(({ broker, reasons }) => {
        const name = brokerName(broker);

        const isRecommended =
          !ratingsAreClose &&
          broker.id === recommendedBroker.id;

        return (
          <article
            key={broker.slug}
            className={`flex h-full flex-col overflow-hidden rounded-[28px] border ${
              isRecommended
                ? "border-[#2563eb] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_42%)] shadow-[0_12px_32px_rgba(37,99,235,0.10)]"
                : "border-[#dbeafe] bg-white shadow-sm"
            }`}
          >
            {/* Broker card header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#dbeafe] px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-[#dbeafe] bg-white p-2 shadow-sm">
                  {broker.logo ? (
                    <img
                      src={broker.logo}
                      alt={`${name} logo`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="break-words text-center text-[9px] font-black leading-3 text-slate-400">
                      {name}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-[11px] font-black text-brand-500">
                    When Should You Choose This Broker?
                  </div>

                  <h3 className="mt-0.5 break-words text-2xl font-black text-[#0f172a]">
                    {name}
                  </h3>
                </div>
              </div>

              <div className="shrink-0 text-center">
                <div className="text-2xl font-black text-brand-500">
                  {(broker.rating ?? 0).toFixed(2)}
                </div>

                <div className="text-[9px] font-bold text-slate-400">
                  out of 5
                </div>
              </div>
            </div>

            {/* Broker card content */}
            <div className="flex flex-1 flex-col p-5">
              {/* Strength */}
              <div className="rounded-[18px] border border-emerald-200 bg-emerald-50/60 px-4 py-3">
                <div className="text-[11px] font-black text-emerald-700">
                  Choose {name} If You Want
                </div>

                <p className="mt-1.5 text-sm font-bold leading-7 text-slate-700">
                  {cleanText(broker.key_strength_en) ||
                    "A trading environment that matches your main requirements."}
                </p>
              </div>

              {/* Suitable users */}
              <div className="mt-4">
                <div className="text-[11px] font-black text-slate-500">
                  Better Suited To
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {reasons.length > 0 ? (
                    reasons.map((reason, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1.5 text-[10px] font-black leading-5 text-slate-600"
                      >
                        {reason}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs leading-6 text-slate-500">
                      Traders whose requirements match the broker’s
                      accounts and trading platforms.
                    </span>
                  )}
                </div>
              </div>

              {/* Weakness */}
              <div className="mt-4 rounded-[18px] border border-amber-200 bg-amber-50/60 px-4 py-3">
                <div className="text-[11px] font-black text-amber-700">
                  Important Before Choosing
                </div>

                <p className="mt-1.5 text-sm leading-7 text-slate-700">
                  {cleanText(broker.key_weakness_en) ||
                    "Review the account conditions, fees and regulatory entity before registering."}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
                <a
                  href={`/go/${broker.slug ?? ""}?type=real`}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  aria-label={`Open an account with ${name}`}
                  className={`inline-flex min-h-[46px] items-center justify-center rounded-xl px-4 py-2 text-sm font-black transition ${
                    isRecommended
                      ? "bg-brand-500 text-white hover:bg-brand-600"
                      : "border border-[#bfdbfe] bg-[#eff6ff] text-brand-500 hover:border-brand-500"
                  }`}
                >
                  Open Account
                </a>

                <Link
                  href={`/en/brokers/${broker.slug ?? ""}`}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:border-[#93c5fd] hover:text-brand-500"
                >
                  Read Review
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>

    {/* Editorial decision */}
    <div className="mt-6 rounded-[24px] border border-[#bfdbfe] bg-[#f8fbff] px-5 py-5">
      <div className="grid gap-5 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-center">
        <div>
          <div className="text-xl font-black text-[#0f172a]">
            Final Decision
          </div>

          <div className="mt-1 text-xs font-black text-brand-500">
            Broker Alarab View
          </div>
        </div>

        <div className="space-y-3 text-sm leading-8 text-slate-700">
          {splitParagraphs(
            recommendedBroker.expert_insight_en
          ).length > 0 ? (
            splitParagraphs(
              recommendedBroker.expert_insight_en
            ).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{recommendedInsight}</p>
          )}
        </div>
      </div>
    </div>

    {/* Editorial note */}
    <p className="mt-4 text-center text-[11px] leading-6 text-slate-400">
      This editorial recommendation is based on the information
      displayed in this comparison. Confirm that the available
      products, account conditions and regulatory entity are
      appropriate for your country before opening an account.
    </p>
  </div>
</section>

      {/* ======================================================
    FINAL DECISION — MOBILE
====================================================== */}
<section className="mx-auto max-w-[1520px] px-4 pb-8 sm:px-6 sm:pb-10 md:hidden lg:px-8">
  <div className="relative overflow-hidden rounded-[34px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
    <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

    <div className="p-4 pt-5">
      {/* Heading */}
      <div>
        <span className="text-[11px] font-black text-brand-500">
          Comparison Summary
        </span>

        <h2 className="mt-1.5 text-[25px] font-black leading-[1.35] text-[#0f172a]">
          Which Broker Fits You?
        </h2>

        <p className="mt-1.5 text-[12px] leading-6 text-slate-500">
          Choose based on your priorities, not the overall rating
          alone.
        </p>
      </div>

      {/* Main recommendation */}
      <div className="mt-4 rounded-[20px] border border-[#2563eb] bg-[linear-gradient(145deg,#eff6ff_0%,#ffffff_100%)] px-4 py-4">
        <div className="text-[10px] font-black text-brand-500">
          Overall Result
        </div>

        <div className="mt-1 break-words text-[22px] font-black leading-7 text-[#0f172a]">
          {recommendationLabel}
        </div>

        <p className="mt-1 text-[11px] leading-6 text-slate-500">
          {ratingsAreClose
            ? "The difference is limited. Make your decision based on the account, fees and trading platform you need."
            : `${recommendedName} has the higher overall rating, but review why each broker may suit you before deciding.`}
        </p>
      </div>

      {/* Mobile indicators */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[16px] border border-[#dbeafe] bg-[#f8fbff] px-2 py-3 text-center">
          <div className="text-[9px] font-bold text-slate-400">
            Easier Start
          </div>

          <div className="mt-1 break-words text-[11px] font-black leading-5 text-[#0f172a]">
            {beginnerDecision}
          </div>
        </div>

        <div className="rounded-[16px] border border-[#dbeafe] bg-[#f8fbff] px-2 py-3 text-center">
          <div className="text-[9px] font-bold text-slate-400">
            Fees & Costs
          </div>

          <div className="mt-1 break-words text-[11px] font-black leading-5 text-[#0f172a]">
            {feesDecision}
          </div>
        </div>
      </div>

      {/* Broker choices */}
      <div className="mt-4 space-y-3">
        {decisionBrokers.map(({ broker, reasons }) => {
          const name = brokerName(broker);

          const isRecommended =
            !ratingsAreClose &&
            broker.id === recommendedBroker.id;

          return (
            <article
              key={broker.slug}
              className="overflow-hidden rounded-[20px] border border-[#dbeafe] bg-white"
            >
              {/* Broker heading */}
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#dbeafe] bg-white p-1.5 shadow-sm">
  {broker.logo ? (
    <img
      src={broker.logo}
      alt={`${name} logo`}
      className="h-full w-full scale-110 object-contain"
    />
  ) : (
                      <span className="text-[7px] font-black text-slate-400">
                        {name}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[9px] font-black text-brand-500">
                      {isRecommended
                        ? "Best Choice by Overall Rating"
                        : "Alternative Choice by Priority"}
                    </div>

                    <h3 className="break-words text-[16px] font-black leading-5 text-[#0f172a]">
                      {name}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 text-center">
                  <div className="text-lg font-black text-brand-500">
                    {(broker.rating ?? 0).toFixed(2)}
                  </div>

                  <div className="text-[8px] font-bold text-slate-400">
                    out of 5
                  </div>
                </div>
              </div>

              {/* Broker details */}
              <div className="border-t border-[#dbeafe] px-3 py-3">
                {/* Strength */}
                <div>
                  <div className="text-[9px] font-black text-emerald-700">
                    Choose This Broker If You Want
                  </div>

                  <p className="mt-1 text-[11px] font-bold leading-6 text-slate-700">
                    {cleanText(broker.key_strength_en) ||
                      "A trading environment that matches your main requirements."}
                  </p>
                </div>

                {/* Suitable users */}
                {reasons.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {reasons.slice(0, 2).map((reason, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-[#eff6ff] px-2 py-1 text-[8px] font-black text-brand-500"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}

                {/* Weakness */}
                <div className="mt-3 rounded-[14px] bg-amber-50 px-3 py-2.5">
                  <div className="text-[9px] font-black text-amber-700">
                    Important
                  </div>

                  <p className="mt-0.5 text-[10px] leading-5 text-slate-600">
                    {cleanText(broker.key_weakness_en) ||
                      "Review the account conditions, fees and regulatory entity before registering."}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={`/go/${broker.slug ?? ""}?type=real`}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    aria-label={`Start with ${name}`}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-2 py-2 text-[11px] font-black text-brand-500"
                  >
                    Start Now
                  </a>

                  <Link
                    href={`/en/brokers/${broker.slug ?? ""}`}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-300 bg-white px-2 py-2 text-[11px] font-black text-slate-700"
                  >
                    Read Review
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Editorial view */}
      <div className="mt-4 rounded-[18px] border border-[#dbeafe] bg-[#f8fbff] px-3 py-3">
        <div className="text-[17px] font-black text-[#0f172a]">
          Final Decision
        </div>

        <div className="mt-1 text-[10px] font-black text-brand-500">
          Broker Alarab View
        </div>

        <p className="mt-2 text-[11px] leading-6 text-slate-600">
          {recommendedInsight}
        </p>
      </div>

      {/* Final note */}
      <p className="mt-3 text-center text-[9px] leading-5 text-slate-400">
        Check the account conditions, fees and regulatory entity
        available in your country before registering.
      </p>
    </div>
  </div>
</section>

      {/* ======================================================
          FREQUENTLY ASKED QUESTIONS
      ====================================================== */}
      <section className="mx-auto max-w-[1520px] px-4 pb-3 sm:px-6 sm:pb-4 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-[#dbeafe] bg-white shadow-[0_25px_70px_rgba(37,99,235,0.08)]">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-500" />

          {/* FAQ desktop */}
          <div className="hidden p-6 md:block lg:p-8">
            <div className="max-w-4xl">
              <span className="text-sm font-black text-brand-500">
                Frequently Asked Questions
              </span>

              <h2 className="mt-2 text-3xl font-black leading-tight text-[#0f172a] lg:text-5xl">
                Frequently Asked Questions About {leftName} and{" "}
                {rightName}
              </h2>

              <p className="mt-3 text-base leading-8 text-slate-600">
                Concise answers to important questions that may affect
                your decision before opening an account or choosing
                the more suitable broker.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {[
                {
                  broker: left,
                  faqs: Array.isArray(left.faq_en)
                    ? left.faq_en.slice(0, 3)
                    : [],
                },
                {
                  broker: right,
                  faqs: Array.isArray(right.faq_en)
                    ? right.faq_en.slice(0, 3)
                    : [],
                },
              ].map(({ broker, faqs }) => {
                const name = brokerName(broker);

                return (
                  <div key={broker.id} className="min-w-0">
                    <div className="mb-4 flex items-center justify-between gap-3 rounded-[18px] border border-[#bfdbfe] bg-[#eff6ff] px-5 py-3">
                      <h3 className="min-w-0 break-words text-lg font-black text-[#0f172a]">
                        Questions About {name}
                      </h3>

                      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-black text-brand-500">
                        {faqs.length} question
                        {faqs.length === 1 ? "" : "s"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {faqs.length > 0 ? (
                        faqs.map((faq, index) => (
                          <details
                            key={`${broker.slug}-faq-${index}`}
                            className="group overflow-hidden rounded-[20px] border border-[#dbeafe] bg-[#fbfdff] shadow-sm transition open:border-[#93c5fd] open:bg-white"
                          >
                            <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                              <h4 className="min-w-0 text-[15px] font-black leading-7 text-[#0f172a]">
                                {cleanText(faq.question)}
                              </h4>

                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#dbeafe] bg-white text-xs font-black text-brand-500 transition-transform duration-200 group-open:rotate-180">
                                ▼
                              </span>
                            </summary>

                            <div className="border-t border-[#eaf2fc] px-5 py-4">
                              <p className="text-sm leading-8 text-slate-600">
                                {cleanText(faq.answer)}
                              </p>
                            </div>
                          </details>
                        ))
                      ) : (
                        <div className="rounded-[20px] border border-slate-200 bg-[#fbfdff] px-5 py-6 text-center text-sm text-slate-500">
                          No questions are currently available.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-[20px] border border-[#dbeafe] bg-[#f8fbff] px-5 py-4 text-center">
              <p className="text-sm leading-7 text-slate-500">
                Conditions, products and regulatory entities vary by
                country. Review the broker page and client agreement
                before registering.
              </p>
            </div>
          </div>

          {/* ================= FAQ MOBILE ================= */}
<div dir="ltr" className="p-4 pt-5 md:hidden">
  {/* Header */}
  <div>
    <span className="text-[11px] font-black text-brand-500">
      Frequently Asked Questions
    </span>

    <h2 className="mt-1.5 break-words text-[24px] font-black leading-[1.35] text-[#0f172a]">
      Questions About {leftName} and {rightName}
    </h2>

    <p className="mt-1.5 text-[12px] leading-6 text-slate-500">
      Important answers before opening an account or choosing the
      more suitable broker.
    </p>
  </div>

  {/* Broker tabs */}
  <div className="mt-4 grid grid-cols-2 gap-2">
    {[left, right].map((broker) => {
      const name = brokerName(broker);

      return (
        <div
          key={broker.slug}
          className="flex min-h-[40px] min-w-0 items-center justify-center rounded-[13px] border border-[#bfdbfe] bg-[#eff6ff] px-2 py-2 text-center"
        >
          <span className="line-clamp-2 break-words text-[10px] font-black leading-4 text-[#0f172a]">
            {name}
          </span>
        </div>
      );
    })}
  </div>

  {/* Mobile FAQs */}
  <div className="mt-4 space-y-4">
    {[
      {
        broker: left,
        faqs: Array.isArray(left.faq_en)
          ? left.faq_en.slice(0, 3)
          : [],
      },
      {
        broker: right,
        faqs: Array.isArray(right.faq_en)
          ? right.faq_en.slice(0, 3)
          : [],
      },
    ].map(({ broker, faqs }) => {
      const name = brokerName(broker);

      return (
        <div key={broker.slug}>
          {/* Broker heading */}
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <h3 className="min-w-0 break-words text-[12px] font-black leading-5 text-[#0f172a]">
              Questions About {name}
            </h3>

            <span className="shrink-0 text-[9px] font-bold text-brand-500">
              {faqs.length}{" "}
              {faqs.length === 1 ? "question" : "questions"}
            </span>
          </div>

          {/* Questions */}
          <div className="space-y-2">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <details
                  key={`${broker.slug}-mobile-faq-${index}`}
                  className="group overflow-hidden rounded-[17px] border border-[#dbeafe] bg-white shadow-sm transition open:border-[#93c5fd]"
                >
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 [&::-webkit-details-marker]:hidden">
                    <h4 className="min-w-0 break-words text-[12px] font-black leading-6 text-[#0f172a]">
                      {cleanText(faq.question)}
                    </h4>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#dbeafe] bg-[#f8fbff] text-[9px] font-black text-brand-500 transition-transform duration-200 group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <div className="border-t border-[#eaf2fc] px-3 py-3">
                    <p className="break-words text-[11px] leading-6 text-slate-600">
                      {cleanText(faq.answer)}
                    </p>
                  </div>
                </details>
              ))
            ) : (
              <div className="rounded-[17px] border border-slate-200 bg-[#fbfdff] px-3 py-4 text-center text-[11px] leading-5 text-slate-500">
                No questions are currently available.
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>

  {/* Mobile note */}
  <div className="mt-4 rounded-[17px] border border-[#dbeafe] bg-[#f8fbff] px-3 py-3 text-center">
    <p className="text-[10px] leading-5 text-slate-500">
      Conditions may vary by country and regulatory entity. Review
      the account details before registering.
    </p>
  </div>
</div>
        </div>
      </section>
    </main>
  );
}