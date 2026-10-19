
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import BestBrokersPageFinderEn from "@/app/components/BestBrokersPageFinderEn";
import BestBrokersMobileTabs from "@/app/components/BestBrokersMobileTabs";
import { createClient } from "@/lib/supabase/server";
import CountryBrokerRedirect from "@/app/components/CountryBrokerRedirect";

export const metadata: Metadata = {
  title: "Best Forex Brokers 2026 | Compare Regulated Brokers",

  description:
    "What are the best forex brokers in 2026? Compare regulated forex brokers by safety, licences, spreads, platforms, account types and trading conditions. Find the right broker for your country.",

  alternates: {
    canonical: "https://brokeralarab.com/en/best-brokers",
    languages: {
      ar: "https://brokeralarab.com/best-brokers",
      en: "https://brokeralarab.com/en/best-brokers",
      "x-default": "https://brokeralarab.com/en/best-brokers",
    },
  },

  openGraph: {
    title: "Best Forex Brokers in 2026 | Broker Alarab",
    description:
      "An independent guide to regulated forex brokers, covering safety, licences, trading accounts, costs, platforms and country-specific broker comparisons.",
    url: "https://brokeralarab.com/en/best-brokers",
    siteName: "Broker Alarab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 820,
        alt: "Best Forex Brokers in 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Forex Brokers in 2026",
    description:
      "Compare regulated forex brokers by safety, ratings, spreads, trading platforms and account types.",
    images: ["https://brokeralarab.com/og-image.png"],
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

/* =========================================================
   TYPES
========================================================= */

type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string | null;
  rating: number | string | null;
  min_deposit: number | null;
  best_for: string | null;
  best_for_en: string | null;
  regulation: string | null;
  regulation_short: string | null;
  platforms: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  logo: string | null;
  real_account_url: string | null;
  score_safety: number | null;
};

type BrokerLicense = {
  id: number;
  broker_id: number;
  regulator_code: string | null;
  is_active: boolean | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  min_deposit: string | null;
  is_islamic_available: boolean | null;
};

type CountryPage = {
  id: number;
  slug: string;
  country_code: string | null;
  flag_emoji: string | null;
  regulator_name: string | null;
};

type CountryRanking = {
  country_id: number;
  broker_id: number;
  rank_position: number;
  country_rating: number | null;
  best_for: string | null;
  local_note: string | null;
};

type ComparisonRow = {
  id: number;
  slug: string;
  title: string | null;
  broker_1_id: number;
  broker_2_id: number;
  views_count: number | null;
};

type PreparedBroker = Broker & {
  licenses: BrokerLicense[];
  accounts: BrokerAccount[];
  active_license_count: number;
  has_islamic_account: boolean;
  lowest_account_deposit: number | null;
};

type RegulatorSummary = {
  code: string;
  name: string;
  brokerCount: number;
};

type UseCasePick = {
  title: string;
  shortTitle: string;
  description: string;
  broker: PreparedBroker;
};

type EnglishCountry = {
  id: number;
  slug: string;
  name: string;
  flag: string | null;
  code: string | null;
  regulator: string | null;
};

/* =========================================================
   CONSTANTS
========================================================= */

const SITE_URL = "https://brokeralarab.com";

// Change only after an actual editorial review.
const BEST_BROKERS_LAST_REVIEWED = "2026-10-16";

/*
  English country names are derived from country codes
  in Supabase, rather than relying on Arabic names.

  Do not arbitrarily limit the list to six countries.
  Only countries present in country_pages can appear.
*/
const countryNameFormatter = new Intl.DisplayNames(["en"], {
  type: "region",
});

/*
  These exclusions refer to the Arabic-market country
  pages in the supplied Arabic source.

  The remaining records are potential English countries.
  Validate the underlying country_pages dataset before
  publication, as a shared table may include other locales.
*/
const ARABIC_COUNTRY_SLUGS = new Set([
  "saudi-arabia",
  "uae",
  "egypt",
  "jordan",
  "kuwait",
  "qatar",
  "bahrain",
  "oman",
  "algeria",
  "palestine",
  "lebanon",
  "iraq",
  "libya",
  "syria",
  "yemen",
  "morocco",
]);

/* =========================================================
   HELPERS — DATA
========================================================= */

function cleanText(
  value: string | null | undefined,
  fallback = "Not available"
) {
  return value?.trim() || fallback;
}

function numberValue(
  value: unknown,
  fallback = 0
) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function ratingValue(
  value: number | string | null | undefined
) {
  return numberValue(value);
}

function ratingLabel(
  value: number | string | null | undefined
) {
  const rating = ratingValue(value);

  return rating > 0 ? rating.toFixed(2) : "—";
}

function brokerName(broker: Broker) {
  return cleanText(
    broker.name_en || broker.name,
    "Forex Broker"
  );
}

function brokerBestFor(broker: Broker) {
  return cleanText(
    broker.best_for_en,
    "Forex and CFD trading"
  );
}

function formatDeposit(
  value: number | null | undefined
) {
  if (value === null || value === undefined) {
    return "Not specified";
  }

  return `$${value.toLocaleString("en-US")}`;
}

function parseDeposit(
  value: string | null | undefined
) {
  if (!value) return null;

  const normalized = value.trim();

  // Accept numeric or explicitly USD deposits.
  // Do not assume other currencies are USD.
  const match = normalized.match(
    /^(?:USD\s*|\$\s*)?(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:USD)?$/i
  );

  if (!match) return null;

  const amount = Number(
    match[1].replace(/,/g, "")
  );

  return Number.isFinite(amount) && amount >= 0
    ? amount
    : null;
}

function isPositiveText(
  value: string | null | undefined
) {
  if (!value) return false;

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  return [
    "yes",
    "true",
    "available",
    "supported",
    "نعم",
    "متوفر",
    "متاح",
    "مدعوم",
  ].includes(normalized);
}

function getLowestAccountDeposit(
  accounts: BrokerAccount[]
) {
  const deposits = accounts
    .map((account) =>
      parseDeposit(account.min_deposit)
    )
    .filter(
      (value): value is number =>
        value !== null
    );

  return deposits.length
    ? Math.min(...deposits)
    : null;
}

function getDisplayDeposit(
  broker: PreparedBroker
) {
  const deposits = [
    broker.min_deposit,
    broker.lowest_account_deposit,
  ].filter(
    (value): value is number =>
      value !== null &&
      value !== undefined
  );

  return deposits.length
    ? Math.min(...deposits)
    : null;
}

function splitItems(
  value: string | null | undefined,
  limit = 3
) {
  if (!value) return [];

  return value
    .split(/[,|،/]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function getCountryEnglishName(
  country: CountryPage
) {
  const code = country.country_code
    ?.trim()
    .toUpperCase();

  if (code && /^[A-Z]{2}$/.test(code)) {
    try {
      const name = countryNameFormatter.of(code);

      if (name && name !== code) {
        return name;
      }
    } catch {
      // Fall through to formatted slug.
    }
  }

  return country.slug
    .split("-")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
    .join(" ");
}

/* =========================================================
   BROKER USE CASES

   Same six-card structure as Arabic version.
========================================================= */

function buildUniqueUseCases(
  brokers: PreparedBroker[]
): UseCasePick[] {
  const used = new Set<number>();

  const byRating = [...brokers].sort(
    (a, b) =>
      ratingValue(b.rating) -
      ratingValue(a.rating)
  );

  const bySafety = [...brokers].sort(
    (a, b) =>
      numberValue(
        b.score_safety,
        ratingValue(b.rating)
      ) -
      numberValue(
        a.score_safety,
        ratingValue(a.rating)
      )
  );

  const byDeposit = [...brokers].sort(
    (a, b) => {
      const depositA =
        getDisplayDeposit(a) ?? 999999;

      const depositB =
        getDisplayDeposit(b) ?? 999999;

      if (depositA !== depositB) {
        return depositA - depositB;
      }

      return (
        ratingValue(b.rating) -
        ratingValue(a.rating)
      );
    }
  );

  const beginnerCandidates = byRating.filter(
    (broker) => {
      const bestFor = (
        broker.best_for_en ||
        broker.best_for ||
        ""
      ).toLowerCase();

      const deposit = getDisplayDeposit(broker);

      return (
        bestFor.includes("beginner") ||
        bestFor.includes("مبتدئ") ||
        (deposit !== null && deposit <= 50)
      );
    }
  );

  const islamicCandidates = byRating.filter(
    (broker) =>
      broker.has_islamic_account
  );

  const platformCandidates = byRating.filter(
    (broker) => {
      const platforms = (
        broker.platforms || ""
      ).toLowerCase();

      return (
        platforms.includes("mt4") ||
        platforms.includes("mt5") ||
        platforms.includes("ctrader")
      );
    }
  );

  function pick(
    candidates: PreparedBroker[],
    fallback: PreparedBroker[] = []
  ) {
    const broker =
      candidates.find(
        (item) => !used.has(item.id)
      ) ||
      fallback.find(
        (item) => !used.has(item.id)
      );

    if (broker) {
      used.add(broker.id);
    }

    return broker;
  }

  const rawPicks = [
    {
      title: "Best Overall",
      shortTitle: "Top Pick",
      description:
        "A balanced option based on overall ratings, regulation, trading platforms and costs.",
      broker: pick(byRating),
    },
    {
      title: "Best for Beginners",
      shortTitle: "Beginners",
      description:
        "An accessible option for traders looking for a simpler starting point and manageable deposit requirements.",
      broker: pick(beginnerCandidates),
    },
    {
      title: "Best Islamic Account",
      shortTitle: "Islamic Account",
      description:
        "A broker offering Islamic account options, subject to eligibility and account terms.",
      broker: pick(islamicCandidates),
    },
    {
      title: "Best Trading Platforms",
      shortTitle: "Platforms",
      description:
        "A choice for traders who prioritise trading platforms and analytical tools.",
      broker: pick(platformCandidates),
    },
    {
      title: "Lowest Minimum Deposit",
      shortTitle: "Low Deposit",
      description:
        "An option with relatively accessible deposit requirements, while other trading conditions also matter.",
      broker: pick(byDeposit),
    },
    {
      title: "Best Safety Profile",
      shortTitle: "Safety",
      description:
        "A broker selected using the recorded safety score and available regulatory information.",
      broker: pick(bySafety),
    },
  ];

  return rawPicks.filter(
    (
      item
    ): item is {
      title: string;
      shortTitle: string;
      description: string;
      broker: PreparedBroker;
    } => Boolean(item.broker)
  );
}

/* =========================================================
   SHARED COMPONENT — BROKER LOGO
========================================================= */

function BrokerLogo({
  broker,
  size = "normal",
}: {
  broker: Pick<
    Broker,
    "name" | "name_en" | "logo"
  >;
  size?: "small" | "normal" | "large";
}) {
  const wrapperClasses = {
    small: "h-10 w-10 rounded-xl",
    normal: "h-14 w-14 rounded-2xl",
    large: "h-[72px] w-[72px] rounded-[20px]",
  };

  const imageClasses = {
    small: "h-7 w-7",
    normal: "h-10 w-10",
    large: "h-[52px] w-[52px]",
  };

  const name =
    broker.name_en ||
    broker.name ||
    "Forex Broker";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white shadow-sm ${wrapperClasses[size]}`}
    >
      {broker.logo ? (
        <div
          className={`relative ${imageClasses[size]}`}
        >
          <Image
            src={broker.logo}
            alt={`${name} logo`}
            fill
            sizes={
              size === "large"
                ? "52px"
                : size === "normal"
                  ? "40px"
                  : "28px"
            }
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-[8px] font-black text-slate-400">
          LOGO
        </span>
      )}
    </div>
  );
}

/* =========================================================
   SHARED COMPONENT — RATING
========================================================= */

function RatingBadge({
  rating,
}: {
  rating: number | string | null;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-700">
      <span>★</span>
      <span>{ratingLabel(rating)}</span>
      <span className="opacity-60">
        / 5
      </span>
    </span>
  );
}

/* =========================================================
   SHARED COMPONENT — BROKER BUTTONS
========================================================= */

function BrokerButtons({
  broker,
  compact = false,
}: {
  broker: PreparedBroker;
  compact?: boolean;
}) {
  const buttonClasses = compact
    ? "min-h-10 px-3 py-2 text-[11px]"
    : "min-h-11 px-4 py-2.5 text-xs";

  return (
    <div className="flex w-full items-stretch gap-2">
      <Link
        href={
          broker.slug
            ? `/en/brokers/${broker.slug}`
            : "/en/brokers"
        }
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white font-black text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 ${buttonClasses}`}
      >
        Read Review
      </Link>

      {broker.real_account_url && broker.slug ? (
        <a
          href={`/go/${broker.slug}?type=real`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`inline-flex flex-1 items-center justify-center rounded-xl bg-brand-500 font-black text-white shadow-sm transition hover:bg-brand-600 ${buttonClasses}`}
        >
          Open Account
        </a>
      ) : null}
    </div>
  );
}

/* =========================================================
   SHARED COMPONENT — SECTION HEADING
========================================================= */

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[1040px]">
      <h2 className="max-w-[760px] text-[25px] font-black leading-[1.3] tracking-tight text-slate-950 min-[380px]:text-[27px] sm:text-[38px] lg:text-[42px]">
        {title}
      </h2>

      <p className="mt-2.5 max-w-[900px] text-[13px] font-medium leading-7 text-slate-700 min-[380px]:text-[14px] sm:mt-3 sm:text-[17px] sm:leading-9">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   MAIN PAGE — SUPABASE DATA
========================================================= */



/* =========================================================
   LICENSE LINKS + REGULATOR CARD + COUNTRY FLAGS
========================================================= */

function getRegulatorHref(code: string) {
  const regulatorSlugMap: Record<string, string> = {
    "FSC BELIZE": "fsc-belize",
    "FSC MAURITIUS": "fsc-mauritius",
    "FSC BVI": "fsc-bvi",
    "ADGM FSRA": "adgm-fsra",
    "MOCI KUWAIT": "moci-kuwait",
  };

  const normalized = code.trim().toUpperCase();

  const slug =
    regulatorSlugMap[normalized] ||
    normalized
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return `/en/licenses/${slug}`;
}

/* =========================================================
   COUNTRY FLAG HELPER
========================================================= */

function getCountryFlag(
  countryCode: string | null | undefined,
  savedFlag?: string | null
) {
  const code = (countryCode || "")
    .trim()
    .toUpperCase();

  if (/^[A-Z]{2}$/.test(code)) {
    return String.fromCodePoint(
      ...Array.from(code).map(
        (letter) =>
          letter.charCodeAt(0) - 65 + 0x1f1e6
      )
    );
  }

  if (
    savedFlag &&
    !/^[A-Z]{2}$/i.test(savedFlag.trim())
  ) {
    return savedFlag;
  }

  return "🌍";
}

/* =========================================================
   REGULATOR CARD — CLICKABLE
========================================================= */

function RegulatorCard({
  regulator,
}: {
  regulator: RegulatorSummary;
}) {
  const href = getRegulatorHref(regulator.code);

  return (
    <Link
      href={href}
      title={`View ${regulator.code} licence guide`}
      aria-label={`Read about ${regulator.code} regulation and licensing`}
      className="group flex min-h-[70px] cursor-pointer flex-col justify-center rounded-xl border border-[#dce7f5] bg-[#fafcff] p-3 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2B6FD0] hover:bg-[#eef5fd] hover:shadow-[0_5px_15px_rgba(30,91,184,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2B6FD0]"
    >
      <div className="flex items-center justify-between gap-2">
        <strong className="block min-w-0 text-[13px] font-black text-[#123b72] transition-colors group-hover:text-[#1E5BB8]">
          {regulator.code}
        </strong>

        <span
          aria-hidden="true"
          className="shrink-0 text-[15px] font-bold text-[#8baad4] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#1E5BB8]"
        >
          →
        </span>
      </div>

      <span className="mt-1 block text-[10px] text-slate-500">
        {regulator.brokerCount} listed{" "}
        {regulator.brokerCount === 1
          ? "record"
          : "records"}
      </span>
    </Link>
  );
}


export default async function BestBrokersPage() {
  const supabase = await createClient();

  const [
    brokersResult,
    licensesResult,
    accountsResult,
    countriesResult,
    comparisonsResult,
  ] = await Promise.all([
    supabase
      .from("brokers")
      .select(`
        id,
        name,
        name_en,
        slug,
        rating,
        min_deposit,
        best_for,
        best_for_en,
        regulation,
        regulation_short,
        platforms,
        islamic_account,
        arabic_support,
        logo,
        real_account_url,
        score_safety
      `)
      .eq("publication_status", "published")
      .order("rating", {
        ascending: false,
      }),

    supabase
      .from("broker_licenses")
      .select(`
        id,
        broker_id,
        regulator_code,
        is_active
      `)
      .eq("is_active", true),

    supabase
      .from("broker_accounts")
      .select(`
        id,
        broker_id,
        account_name,
        min_deposit,
        is_islamic_available
      `),

    supabase
      .from("country_pages")
      .select(`
        id,
        slug,
        country_code,
        flag_emoji,
        regulator_name
      `)
      .order("id", {
        ascending: true,
      }),

    supabase
      .from("comparisons")
      .select(`
        id,
        slug,
        title,
        broker_1_id,
        broker_2_id,
        views_count
      `)
      .order("views_count", {
        ascending: false,
      })
      .limit(6),
  ]);

  if (brokersResult.error) {
    return (
      <main
        dir="ltr"
        className="min-h-screen bg-slate-50 px-4 py-16"
      >
        <div className="mx-auto max-w-[1520px] rounded-3xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-2xl font-black text-slate-950">
            Unable to load forex broker data
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  const brokersData =
    (brokersResult.data || []) as Broker[];

  /* =====================================================
     COUNTRY-SPECIFIC RANKINGS
  ===================================================== */

  const {
    data: countryRankingsData,
    error: countryRankingsError,
  } = await supabase
    .from("country_broker_rankings")
    .select(`
      country_id,
      broker_id,
      rank_position,
      country_rating,
      best_for,
      local_note
    `)
    .order("rank_position", {
      ascending: true,
    });

  if (countryRankingsError) {
    console.error(
      "Failed to load country rankings:",
      countryRankingsError
    );
  }

  const publishedBrokerIds = new Set(
    brokersData.map((broker) => broker.id)
  );

  const licenses = (
    (licensesResult.data || []) as BrokerLicense[]
  ).filter((license) =>
    publishedBrokerIds.has(
      license.broker_id
    )
  );

  const accounts = (
    (accountsResult.data || []) as BrokerAccount[]
  ).filter((account) =>
    publishedBrokerIds.has(
      account.broker_id
    )
  );

  const allCountries =
    (countriesResult.data || []) as CountryPage[];

  const comparisons =
    (comparisonsResult.data || []) as ComparisonRow[];

  /*
    No six-country limit.

    Build the English list from all matching country
    records, not from the old short whitelist.

    A dedicated English-country filter or locale
    field should replace this exclusion approach
    once its actual database schema is confirmed.
  */
  
const countries: EnglishCountry[] = allCountries
  .filter(
    (country) =>
      !ARABIC_COUNTRY_SLUGS.has(country.slug)
  )
  .map((country) => ({
    id: country.id,
    slug: country.slug,
    name: getCountryEnglishName(country),
    flag: getCountryFlag(
      country.country_code,
      country.flag_emoji
    ),
    code: country.country_code,
    regulator: country.regulator_name,
  }));


  const countryRankings = (
    (countryRankingsData || []) as CountryRanking[]
  ).filter((row) =>
    publishedBrokerIds.has(
      row.broker_id
    )
  );

  /* =====================================================
     PREPARE BROKER DATA
  ===================================================== */

  const licensesByBroker =
    new Map<number, BrokerLicense[]>();

  const accountsByBroker =
    new Map<number, BrokerAccount[]>();

  licenses.forEach((license) => {
    const current =
      licensesByBroker.get(
        license.broker_id
      ) || [];

    current.push(license);

    licensesByBroker.set(
      license.broker_id,
      current
    );
  });

  accounts.forEach((account) => {
    const current =
      accountsByBroker.get(
        account.broker_id
      ) || [];

    current.push(account);

    accountsByBroker.set(
      account.broker_id,
      current
    );
  });

  const brokers: PreparedBroker[] =
    brokersData.map((broker) => {
      const brokerLicenses =
        licensesByBroker.get(
          broker.id
        ) || [];

      const brokerAccounts =
        accountsByBroker.get(
          broker.id
        ) || [];

      return {
        ...broker,
        licenses: brokerLicenses,
        accounts: brokerAccounts,
        active_license_count:
          brokerLicenses.length,
        has_islamic_account:
          isPositiveText(
            broker.islamic_account
          ) ||
          brokerAccounts.some(
            (account) =>
              account.is_islamic_available === true
          ),
        lowest_account_deposit:
          getLowestAccountDeposit(
            brokerAccounts
          ),
      };
    });

  /* =====================================================
     SORTING AND RANKINGS
  ===================================================== */

  const sortedBrokers = [
    ...brokers,
  ].sort(
    (a, b) =>
      ratingValue(b.rating) -
      ratingValue(a.rating)
  );

  const topTen =
    sortedBrokers.slice(0, 10);

  const topThree =
    topTen.slice(0, 3);

  const topBroker =
    topTen[0];

  const useCasePicks =
    buildUniqueUseCases(
      sortedBrokers
    );

  /* =====================================================
     REGULATORS
  ===================================================== */

  const regulatorMap =
    new Map<string, RegulatorSummary>();

  licenses.forEach((license) => {
    const code = cleanText(
      license.regulator_code,
      ""
    ).toUpperCase();

    if (!code) return;

    const current =
      regulatorMap.get(code);

    if (current) {
      current.brokerCount += 1;
      return;
    }

    regulatorMap.set(code, {
      code,
      name: code,
      brokerCount: 1,
    });
  });

  const uniqueRegulatorCount =
    regulatorMap.size;

  const regulatorSummaries =
    Array.from(
      regulatorMap.values()
    ).sort(
      (a, b) =>
        b.brokerCount -
        a.brokerCount
    );

  /* =====================================================
     BROKER COMPARISONS
  ===================================================== */

  const brokerById = new Map(
    brokers.map((broker) => [
      broker.id,
      broker,
    ])
  );

  const preparedComparisons = comparisons
    .map((comparison) => ({
      ...comparison,
      broker1: brokerById.get(
        comparison.broker_1_id
      ),
      broker2: brokerById.get(
        comparison.broker_2_id
      ),
    }))
    .filter(
      (
        comparison
      ): comparison is ComparisonRow & {
        broker1: PreparedBroker;
        broker2: PreparedBroker;
      } =>
        Boolean(
          comparison.broker1 &&
          comparison.broker2
        )
    );

  /* =====================================================
     MOBILE DATA
  ===================================================== */

  const mobileUseCases =
    useCasePicks.map((item) => ({
      title: item.title,
      shortTitle: item.shortTitle,
      broker: {
        id: item.broker.id,
        name: brokerName(item.broker),
        slug: item.broker.slug,
        logo: item.broker.logo,
        rating: ratingLabel(
          item.broker.rating
        ),
        deposit: formatDeposit(
          getDisplayDeposit(
            item.broker
          )
        ),
        licenseCount:
          item.broker.active_license_count,
        description: item.description,
        realAccountAvailable:
          Boolean(
            item.broker.real_account_url
          ),
      },
    }));

  // Keep all available English countries.
  // No slice(0, 6) or slice(0, 12).
  const mobileCountries =
    countries.map((country) => ({
      id: country.id,
      slug: country.slug,
      code:
        country.code || "",
      name: country.name,
      flag:
        country.flag || "🌍",
      regulator:
        country.regulator,
    }));

  const mobileRegulators =
    regulatorSummaries.map(
      (regulator) => ({
        code: regulator.code,
        name: regulator.name,
        brokerCount:
          regulator.brokerCount,
      })
    );

  const mobileComparisons =
    preparedComparisons.map(
      (comparison) => ({
        id: comparison.id,
        slug: comparison.slug,
        broker1: {
          name: brokerName(
            comparison.broker1
          ),
          logo:
            comparison.broker1.logo,
        },
        broker2: {
          name: brokerName(
            comparison.broker2
          ),
          logo:
            comparison.broker2.logo,
        },
      })
    );

  const activeLicenseCount =
    licenses.length;

  const islamicBrokerCount =
    brokers.filter(
      (broker) =>
        broker.has_islamic_account
    ).length;

  const lowDepositBrokerCount =
    brokers.filter((broker) => {
      const deposit =
        getDisplayDeposit(broker);

      return (
        deposit !== null &&
        deposit <= 100
      );
    }).length;

  /* =====================================================
     FAQ
  ===================================================== */

  const faqItems = [
    {
      question:
        "What is the best forex broker in 2026?",
      answer:
        "There is no single best forex broker for every trader. The right choice depends on your country of residence, the applicable regulatory licence, account type, trading costs, available platforms and financial instruments.",
    },
    {
      question:
        "How can I verify that a forex broker is regulated?",
      answer:
        "Check the broker's licence number and legal entity name directly through the regulator's official register. Confirm that the entity you will contract with is authorised for the relevant services.",
    },
    {
      question:
        "Can I open a forex trading account with $100?",
      answer:
        "Some brokers offer accounts with low minimum deposits. Requirements vary by broker, account type and payment method. Meeting a minimum deposit does not mean that the amount is adequate for risk management.",
    },
    {
      question:
        "What is the difference between spreads and commissions?",
      answer:
        "The spread is the difference between the bid and ask prices. A commission is an additional fee that may apply to trade execution. Some accounts include both charges.",
    },
    {
      question:
        "Are Islamic forex accounts completely free of fees?",
      answer:
        "Not necessarily. Some Islamic or swap-free accounts remove conventional overnight swap charges but introduce alternative fees or specific conditions. Always review the account terms.",
    },
    {
      question:
        "Should I choose MetaTrader 4 or MetaTrader 5?",
      answer:
        "The right platform depends on the markets you trade, your trading strategy and broker compatibility. Compare supported instruments, order types, technical indicators and available tools.",
    },
    {
      question:
        "Can I compare account types from different brokers?",
      answer:
        "Yes. Broker account comparison pages can help you review differences in account types, minimum deposits and trading conditions.",
    },
    {
      question:
        "Does regulation guarantee that I cannot lose money?",
      answer:
        "No. Regulatory supervision does not guarantee trading profits or prevent market losses. Leveraged forex and CFD trading carries substantial financial risk.",
    },
  ];

  /* =====================================================
     STRUCTURED DATA
  ===================================================== */

  const schemaData = [
    {
      "@context":
        "https://schema.org",
      "@type": "WebPage",
      name:
        "Best Forex Brokers in 2026",
      url:
        `${SITE_URL}/en/best-brokers`,
      description:
        "A comprehensive guide to comparing forex brokers in 2026, including regulations, safety, trading costs, platforms, account types and country-specific broker selection.",
      inLanguage: "en",
      datePublished:
        "2026-03-01",
      dateModified:
        BEST_BROKERS_LAST_REVIEWED,

      author: {
        "@type":
          "Organization",
        name:
          "Broker Alarab Editorial Team",
        url:
          `${SITE_URL}/en/about`,
      },

      publisher: {
        "@type":
          "Organization",
        name:
          "Broker Alarab",
        url:
          SITE_URL,
      },

      isPartOf: {
        "@type":
          "WebSite",
        name:
          "Broker Alarab",
        url:
          SITE_URL,
      },

      mainEntity: {
        "@type": "ItemList",
        name:
          "Best Forex Brokers in 2026",
        numberOfItems:
          topTen.length,

        itemListElement:
          topTen.map(
            (broker, index) => ({
              "@type":
                "ListItem",
              position:
                index + 1,
              name:
                brokerName(broker),
              url:
                broker.slug
                  ? `${SITE_URL}/en/brokers/${broker.slug}`
                  : `${SITE_URL}/en/best-brokers`,
            })
          ),
      },
    },

    {
      "@context":
        "https://schema.org",
      "@type":
        "BreadcrumbList",

      itemListElement: [
        {
          "@type":
            "ListItem",
          position: 1,
          name: "Home",
          item:
            `${SITE_URL}/en`,
        },
        {
          "@type":
            "ListItem",
          position: 2,
          name:
            "Best Forex Brokers",
          item:
            `${SITE_URL}/en/best-brokers`,
        },
      ],
    },

    {
      "@context":
        "https://schema.org",
      "@type":
        "ItemList",
      name:
        "Best Forex Brokers in 2026",
      description:
        "Forex broker rankings based on published editorial ratings, regulations, safety, trading costs, platforms and available account types.",
      numberOfItems:
        topTen.length,

      itemListElement:
        topTen.map(
          (broker, index) => ({
            "@type":
              "ListItem",
            position:
              index + 1,
            name:
              brokerName(broker),
            url:
              broker.slug
                ? `${SITE_URL}/en/brokers/${broker.slug}`
                : `${SITE_URL}/en/best-brokers`,
          })
        ),
    },

    {
      "@context":
        "https://schema.org",
      "@type":
        "FAQPage",

      mainEntity:
        faqItems.map(
          (item) => ({
            "@type":
              "Question",
            name:
              item.question,
            acceptedAnswer: {
              "@type":
                "Answer",
              text:
                item.answer,
            },
          })
        ),
    },
  ];

  /* =====================================================
     PAGE RENDER
  ===================================================== */

  return (
    <main
      dir="ltr"
      className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-900"
    >
      <Script
        id="best-brokers-en-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaData
          ).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* ===================================================
          HERO — IDENTICAL STRUCTURAL STYLE TO ARABIC
      =================================================== */}

      <section className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31]">
        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

          <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative mx-auto max-w-[1520px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="hidden items-center justify-start gap-2 text-[10px] font-bold text-blue-200/75 sm:flex sm:text-xs"
          >
            <Link
              href="/en"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <span className="text-blue-300/40">
              /
            </span>

            <span className="text-white">
              Best Forex Brokers
            </span>
          </nav>

          {/* Main content */}
          <div className="mt-0 text-left sm:mt-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[9px] font-extrabold text-blue-100 backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              Independent Forex Broker Guide 2026
            </div>

            {/* H1 */}
            <h1 className="mt-3 max-w-[1400px] text-[30px] font-black leading-[1.12] tracking-[-0.035em] text-white min-[380px]:text-[32px] sm:text-[44px] lg:text-[53px] xl:text-[58px]">
              <span className="block sm:inline">
                Best Forex Brokers
              </span>{" "}

              <span className="mt-1.5 block text-[#59c0ff] sm:mt-0 sm:inline">
                in 2026
              </span>
            </h1>

            {/* Mobile description */}
            <p className="mt-3 text-[12px] font-medium leading-6 text-slate-200 sm:hidden">
              Compare regulated forex brokers
              by safety, licences, spreads,
              trading platforms and account
              types to find the right broker
              for your needs.
            </p>

            {/* Desktop description */}
            <p className="mt-4 hidden max-w-[950px] text-[15px] font-medium leading-8 text-slate-200 sm:block lg:text-[17px]">
              Discover the best forex brokers in
              2026 through independent broker
              ratings and detailed comparisons.
              Evaluate regulations, trading
              costs, platforms and account
              conditions before choosing a
              broker suitable for your country.
            </p>

            {/* Trust points */}
            <div className="mt-2.5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-[8px] font-bold text-blue-100/85 sm:mt-3 sm:gap-x-4 sm:text-[11px]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Updated Broker Guide 2026
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="inline-flex items-center gap-1.5">
                <span className="text-cyan-300">
                  ✓
                </span>
                Independent Comparisons
              </span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <span className="text-cyan-300">
                  ✓
                </span>
                Data-Driven Reviews
              </span>
            </div>

            {/* Stats + actions */}
            <div className="mt-3.5 flex flex-col gap-3 sm:mt-5 sm:gap-4 lg:flex-row lg:items-center lg:justify-start lg:gap-6">
              {/* Statistics */}
              <div className="grid w-full grid-cols-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm lg:w-[460px] lg:shrink-0">
                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {brokers.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Reviewed Brokers
                  </div>
                </div>

                <div className="border-x border-white/10 px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {accounts.length}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Trading Accounts
                  </div>
                </div>

                <div className="px-1 py-2 text-center sm:px-2 sm:py-2.5">
                  <div className="text-base font-black text-[#66c8ff] sm:text-xl">
                    {uniqueRegulatorCount}
                  </div>

                  <div className="mt-0.5 text-[7px] font-bold text-slate-300 sm:text-[10px]">
                    Regulatory Authorities
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="grid w-full grid-cols-2 gap-2.5 sm:w-auto sm:gap-3 lg:shrink-0">
                <a
                  href="#comparison-table"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] bg-[#2471df] px-2 text-[10px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2e7cea] sm:min-h-[46px] sm:min-w-[210px] sm:px-5 sm:text-sm"
                >
                  <span className="sm:hidden">
                    Compare Brokers
                  </span>

                  <span className="hidden sm:inline">
                    Compare Forex Brokers
                  </span>

                  <span aria-hidden="true">
                    →
                  </span>
                </a>

                <a
                  href="#top-brokers"
                  className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.07] px-2 text-[10px] font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] sm:min-h-[46px] sm:min-w-[190px] sm:px-5 sm:text-sm"
                >
                  <span>
                    Top 3 Brokers
                  </span>

                  <span aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PART 2 CONTINUES DIRECTLY HERE
      =================================================== */}

      {/* =====================================================
          2 — TOP THREE FOREX BROKERS
      ===================================================== */}

      <section
        id="top-brokers"
        aria-labelledby="top-brokers-title"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-6 sm:py-8 lg:py-10"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-[1100px] text-left">
            <h2
              id="top-brokers-title"
              className="text-[27px] font-black leading-[1.3] tracking-tight text-[#081a33] sm:text-[36px] lg:text-[43px]"
            >
              What Are the{" "}
              <span className="text-[#2b6fd0]">
                Best Forex Brokers
              </span>{" "}
              in 2026?
            </h2>

            <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600 sm:hidden">
              Choosing a forex broker requires more than
              comparing brand names. Explore our three
              highest-rated brokers based on published
              ratings, regulation, trading conditions,
              platforms and account types.
            </p>

            <p className="mt-3 hidden max-w-[1050px] text-[15px] font-medium leading-8 text-slate-600 sm:block">
              Discover the three highest-rated brokers
              in our comparison guide. Review their
              trading features, listed regulatory
              licences, account requirements and
              available platforms before choosing
              a suitable broker.
            </p>
          </div>

          {/* DIRECT ANSWER */}

          {topThree.length > 0 && (
            <div className="mt-6 rounded-[20px] border border-blue-100 bg-gradient-to-r from-[#eef5fd] via-[#f5f9ff] to-white p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d6e5f8] text-lg font-black text-[#1e5bb8]">
                  ✓
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] font-black text-[#102442] sm:text-[17px]">
                    Quick Answer: Our Highest-Rated Forex Brokers
                  </h3>

                  <p className="mt-2 text-[12px] leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
                    According to the current overall
                    ratings in our broker database,{" "}
                    <strong className="text-[#123b72]">
                      {brokerName(topThree[0])}
                    </strong>{" "}
                    ranks first with a rating of{" "}
                    {ratingLabel(topThree[0].rating)} / 5

                    {topThree[1] && (
                      <>
                        , followed by{" "}
                        <strong className="text-[#123b72]">
                          {brokerName(topThree[1])}
                        </strong>{" "}
                        at {ratingLabel(topThree[1].rating)} / 5
                      </>
                    )}

                    {topThree[2] && (
                      <>
                        , and{" "}
                        <strong className="text-[#123b72]">
                          {brokerName(topThree[2])}
                        </strong>{" "}
                        at {ratingLabel(topThree[2].rating)} / 5
                      </>
                    )}
                    . The highest-rated broker is not
                    necessarily suitable for every
                    trader or country.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TOP 3 BROKER CARDS */}

          <div className="mt-5 grid grid-cols-1 gap-3 lg:mt-8 lg:grid-cols-3 lg:gap-5">
            {topThree.map((broker, index) => {
              const licenceCodes = Array.from(
                new Set(
                  broker.licenses
                    .map((licence) =>
                      licence.regulator_code
                        ?.trim()
                        .toUpperCase()
                    )
                    .filter(
                      (code): code is string =>
                        Boolean(code)
                    )
                )
              ).slice(0, 5);

              const isFirst = index === 0;

              return (
                <article
                  key={broker.id}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isFirst
                      ? "border-[#a9c8f1] shadow-[0_10px_30px_rgba(24,74,151,0.10)]"
                      : "border-[#d6e5f8] shadow-[0_5px_20px_rgba(24,74,151,0.05)]"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between border-b px-4 py-3 ${
                      isFirst
                        ? "border-[#c7daf3] bg-[#eaf3ff]"
                        : "border-[#edf2fa] bg-[#f8fbff]"
                    }`}
                  >
                    <span className="text-[12px] font-black text-[#184A97]">
                      Rank #{index + 1}
                    </span>

                    {isFirst && (
                      <span className="rounded-full bg-[#1E5BB8] px-3 py-1 text-[10px] font-black text-white">
                        Top Rated
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
                    <div className="flex items-center gap-3">
                      <BrokerLogo
                        broker={broker}
                        size="large"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[17px] font-black text-[#081a33] sm:text-[19px]">
                          {brokerName(broker)}
                        </h3>

                        <p className="mt-1 text-[11px] text-slate-500">
                          Forex & CFD Broker
                        </p>

                        <div className="mt-2">
                          <RatingBadge rating={broker.rating} />
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-[12px] leading-7 text-[#526784] sm:text-[13px]">
                      {brokerBestFor(broker)}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl border border-[#e1eaf6] bg-[#f8fbff] p-3">
                        <span className="block text-[10px] font-bold text-[#6b82a2]">
                          Minimum Deposit
                        </span>

                        <strong className="mt-1 block text-[14px] font-black text-[#081a33]">
                          {formatDeposit(
                            getDisplayDeposit(broker)
                          )}
                        </strong>
                      </div>

                      <div className="rounded-xl border border-[#e1eaf6] bg-[#f8fbff] p-3">
                        <span className="block text-[10px] font-bold text-[#6b82a2]">
                          Listed Licences
                        </span>

                        <strong className="mt-1 block text-[14px] font-black text-[#081a33]">
                          {broker.active_license_count}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-[#e1eaf6] bg-[#f8fbff] p-3">
                      <span className="text-[10px] font-bold text-[#6b82a2]">
                        Trading Platforms
                      </span>

                      <p className="mt-1 text-[12px] font-bold text-[#102442]">
                        {cleanText(broker.platforms)}
                      </p>
                    </div>

                    <div className="mt-3 rounded-xl border border-[#e1eaf6] p-3">
                      <h4 className="text-[11px] font-black text-[#123b72]">
                        Regulatory Authorities
                      </h4>

                      {licenceCodes.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {licenceCodes.map((code) => (
                            <span
                              key={code}
                              className="rounded-lg bg-[#eef5fd] px-2.5 py-1 text-[10px] font-black text-[#184a97]"
                            >
                              {code}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2 text-[11px] text-slate-500">
                          See the broker review for
                          regulatory information.
                        </p>
                      )}
                    </div>

                    <p className="mt-3 text-[10px] leading-5 text-slate-500">
                      Regulatory coverage and account
                      terms vary by legal entity and
                      country of residence.
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="grid grid-cols-2 gap-2.5">
                        <Link
                          href={
                            broker.slug
                              ? `/en/brokers/${broker.slug}`
                              : "/en/brokers"
                          }
                          className="inline-flex min-h-[43px] items-center justify-center rounded-xl border border-[#b8cce8] bg-white px-3 text-[12px] font-black text-[#184a97] transition hover:bg-[#eef5fd] lg:min-h-[46px]"
                        >
                          Read Review
                        </Link>

                        {broker.real_account_url &&
                        broker.slug ? (
                          <a
                            href={broker.real_account_url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-flex min-h-[43px] items-center justify-center rounded-xl bg-[#1e5bb8] px-3 text-[12px] font-black text-white transition hover:bg-[#184a97] lg:min-h-[46px]"
                          >
                            Open Account ↗
                          </a>
                        ) : (
                          <Link
                            href={
                              broker.slug
                                ? `/en/brokers/${broker.slug}`
                                : "/en/brokers"
                            }
                            className="inline-flex min-h-[43px] items-center justify-center rounded-xl bg-[#1e5bb8] px-3 text-[12px] font-black text-white transition hover:bg-[#184a97]"
                          >
                            Broker Details
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* SAFETY AND COUNTRIES */}

          <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 lg:grid-cols-2 lg:gap-5">
            <article className="rounded-[18px] border border-[#d6e5f8] bg-[#f8fbff] p-4 sm:p-6">
              <h3 className="text-[16px] font-black text-[#081a33]">
                Why Broker Regulation Matters
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-slate-600">
                Regulation is a critical factor when
                evaluating a trading company. However,
                different legal entities may provide
                different protections.
              </p>

              <div className="mt-4 grid gap-2 text-[12px] font-medium text-slate-700 sm:grid-cols-2">
                {[
                  "Verify the legal entity",
                  "Confirm licence status",
                  "Review investor protections",
                  "Check account eligibility",
                ].map((item) => (
                  <div key={item} className="flex gap-2">
                    <span className="font-black text-[#2b6fd0]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#licenses"
                className="mt-5 inline-flex text-[12px] font-black text-[#1e5bb8] hover:underline"
              >
                How to Verify Broker Licences →
              </a>
            </article>

            <article className="flex flex-col rounded-[18px] border border-[#d6e5f8] bg-[#f8fbff] p-4 sm:p-6">
              <h3 className="text-[16px] font-black text-[#081a33]">
                Why Choose a Broker Based on Your Country?
              </h3>

              <div className="mt-4 grid gap-2 text-[12px] font-medium text-slate-600 sm:grid-cols-2">
                {[
                  "Check account eligibility",
                  "Identify the applicable regulator",
                  "Compare funding methods",
                  "Review local account conditions",
                ].map((item) => (
                  <div key={item} className="flex gap-2">
                    <span className="font-black text-[#2b6fd0]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <p className="mb-2 text-[11px] font-black text-[#123b72]">
                  Explore Rankings in Your Country
                </p>

                <div className="flex flex-wrap gap-2">
                  {countries.slice(0, 6).map((country) => (
                    <Link
                      key={country.id}
                      href={`/en/best-brokers/${country.slug}`}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3 py-2 text-[11px] font-bold text-[#184a97] transition hover:bg-blue-50"
                    >
                      <span>{country.flag || "🌍"}</span>
                      <span>{country.name}</span>
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>

          <p className="mt-5 text-center text-[11px] font-medium leading-6 text-slate-500 sm:text-xs">
            Rankings are based on published broker
            assessments. They do not represent
            personalised investment advice or
            guarantee the safety of invested funds.
          </p>
        </div>
      </section>

      {/* =====================================================
          3 — FOREX TRADING PLATFORMS
      ===================================================== */}

      <section
        id="forex-platforms"
        aria-labelledby="forex-platforms-title"
        className="border-b border-[#dce6f2] bg-[#f5f8fd] py-7 sm:py-10"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1050px]">
            <h2
              id="forex-platforms-title"
              className="text-[24px] font-black leading-[1.35] text-[#081a33] sm:text-[36px] lg:text-[40px]"
            >
              What Is the Best Forex Trading Platform?
            </h2>

            <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
              The best forex trading platform depends
              on your experience, strategy and needs.
              Compare popular platforms by analytical
              features, usability and automation tools.
            </p>

            <p className="mt-2 hidden text-[14px] leading-7 text-slate-600 sm:block">
              The broker provides your trading account,
              while the platform is used to analyse
              markets and execute orders. Availability
              varies by broker.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {[
              {
                name: "MetaTrader 4",
                short: "MT4",
                title: "Established Forex Platform",
                description:
                  "MT4 is widely used for currency trading, technical analysis and automated trading with Expert Advisors.",
                features: [
                  "Technical Analysis",
                  "Expert Advisors",
                  "Forex Trading",
                ],
              },
              {
                name: "MetaTrader 5",
                short: "MT5",
                title: "Expanded Trading Tools",
                description:
                  "MT5 offers additional timeframes, analytical features and automated trading tools. Available markets depend on your broker.",
                features: [
                  "More Timeframes",
                  "Technical Indicators",
                  "Automated Trading",
                ],
              },
              {
                name: "cTrader",
                short: "cTrader",
                title: "Advanced Trading Interface",
                description:
                  "cTrader combines market analysis, detailed order controls and a modern interface for active traders.",
                features: [
                  "Order Management",
                  "Advanced Charts",
                  "Trading Analysis",
                ],
              },
            ].map((platform) => (
              <article
                key={platform.short}
                className="overflow-hidden rounded-[18px] border border-[#d6e5f8] bg-white shadow-sm"
              >
                <details className="group md:hidden">
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                    <span className="rounded-lg bg-[#eef5fd] px-3 py-2 text-[12px] font-black text-[#1e5bb8]">
                      {platform.short}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-black text-[#081a33]">
                        {platform.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {platform.title}
                      </p>
                    </div>

                    <span className="text-lg text-[#1e5bb8] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-[#e5edf8] p-4">
                    <p className="text-[12px] leading-7 text-slate-600">
                      {platform.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {platform.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full bg-[#eef5fd] px-2.5 py-1 text-[10px] font-bold text-[#1e5bb8]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>

                <div className="hidden p-5 md:block">
                  <span className="rounded-xl bg-[#eef5fd] px-4 py-2 text-[13px] font-black text-[#1e5bb8]">
                    {platform.short}
                  </span>

                  <h3 className="mt-4 text-[18px] font-black text-[#081a33]">
                    {platform.name}
                  </h3>

                  <p className="mt-1 text-[12px] font-bold text-[#526784]">
                    {platform.title}
                  </p>

                  <p className="mt-3 min-h-[96px] text-[13px] leading-7 text-slate-600">
                    {platform.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {platform.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-[#eef5fd] px-3 py-1.5 text-[10px] font-bold text-[#1e5bb8]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      
{/* =====================================================
    4 — TOP TEN FOREX BROKERS
    SAME DESIGN AS ARABIC VERSION — LTR
===================================================== */}

<section
  id="comparison-table"
  aria-labelledby="broker-comparison-heading"
  className="scroll-mt-20 border-b border-slate-200 bg-white py-8 sm:py-11"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">

    {/* SECTION HEADER */}
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="broker-comparison-heading"
          className="text-[25px] font-black leading-[1.35] text-[#081a33] sm:text-[36px] lg:text-[40px]"
        >
          Compare the Top 10 Forex Brokers in 2026
        </h2>

        <span className="rounded-full bg-[#eef5fd] px-3 py-1.5 text-[11px] font-bold text-[#1e5bb8]">
          {topTen.length} Brokers Ranked by Overall Rating
        </span>
      </div>

      <p className="mt-3 max-w-[1100px] text-[13px] font-medium leading-7 text-slate-600 sm:text-[15px]">
        Compare forex brokers side by side based on
        overall ratings, minimum deposits, licences,
        regulatory authorities, trading platforms
        and Islamic account availability.
      </p>
    </div>

    {/* =================================================
        EDITORIAL METHODOLOGY
        SAME STRUCTURE AS ARABIC
    ================================================= */}

    <div className="mb-5 mt-5 rounded-[18px] border border-[#d6e5f8] bg-[#f3f8ff] p-4 sm:mb-6 sm:mt-6 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">

        {/* TEXT */}
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] font-black leading-7 text-[#081a33] sm:text-[19px]">
            How Do We Rank the Best Forex Brokers?
          </h3>

          <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
            Broker Alarab ranks forex brokers according
            to their published overall editorial ratings,
            using our established review methodology
            as a reference. Our evaluation covers
            regulatory licences and financial oversight,
            trading costs, available platforms,
            account types and service quality.
            The table reflects each broker's final
            recorded rating rather than a direct
            automated calculation of these criteria.
          </p>

          <p className="mt-2 text-[12px] leading-6 text-slate-600 sm:text-[13px]">
            Trading conditions and regulatory protections
            may vary depending on your country of residence
            and the legal entity providing your account.
          </p>
        </div>

        {/* METHODOLOGY BUTTON + DATE */}
        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-center">
          <Link
            href="/en/how-we-review-brokers"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1e5bb8] px-5 py-2.5 text-center text-[13px] font-black text-white transition hover:bg-[#184a97]"
          >
            View Our Review Methodology
          </Link>

          <div className="text-[11px] font-medium leading-6 text-slate-500 lg:text-center">
            <p>
              Last editorial review:{" "}
              <time dateTime={BEST_BROKERS_LAST_REVIEWED}>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                }).format(
                  new Date(
                    `${BEST_BROKERS_LAST_REVIEWED}T12:00:00Z`
                  )
                )}
              </time>
            </p>

            <p>
              Rankings are reviewed when broker
              ratings are updated.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* =================================================
        DESKTOP TABLE — EXACT ARABIC COLUMN LAYOUT
        REVERSED FOR ENGLISH LTR
    ================================================= */}

    <div className="hidden overflow-x-auto rounded-[20px] border border-[#d6e5f8] bg-white shadow-[0_8px_30px_rgba(15,40,75,0.05)] lg:block">
      <table className="w-full min-w-[1150px] table-fixed border-collapse text-left">

        {/* SAME COLUMN PROPORTIONS AS ARABIC */}
        <colgroup>
          <col style={{ width: "21%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>

        {/* HEADER */}
        <thead>
          <tr className="bg-[#123b70] text-white">
            {[
              "Broker & Rank",
              "Rating",
              "Min. Deposit",
              "Licences",
              "Regulatory Authorities",
              "Trading Platforms",
              "Islamic Account",
              "Actions",
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="border-r border-white/10 px-3 py-[19px] text-center text-[13px] font-black last:border-r-0"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        {/* BROKER ROWS */}
        <tbody>
          {topTen.map((broker, index) => {
            const displayName = brokerName(broker);

            const reviewHref = broker.slug
              ? `/en/brokers/${broker.slug}`
              : "/en/brokers";

            // UNIQUE REGULATORY CODES
            const licenseCodes = Array.from(
              new Set(
                broker.licenses
                  .map((license) =>
                    license.regulator_code
                      ?.trim()
                      .toUpperCase()
                  )
                  .filter(
                    (code): code is string =>
                      Boolean(code)
                  )
              )
            ).slice(0, 4);

            // UNIQUE TRADING PLATFORMS
            const platforms = Array.from(
              new Set(
                splitItems(broker.platforms, 5)
              )
            ).slice(0, 4);

            return (
              <tr
                key={broker.id}
                className={`h-[94px] border-b border-[#e3ebf5] transition-colors hover:bg-[#edf5ff] last:border-b-0 ${
                  index === 0
                    ? "bg-[#fffaf0]"
                    : index % 2 === 0
                      ? "bg-[#f8fafd]"
                      : "bg-white"
                }`}
              >

                {/* ======================================
                    BROKER NAME, LOGO, RANK
                ======================================= */}

                <th
                  scope="row"
                  className="px-4 py-4 text-left"
                >
                  <div className="flex items-center gap-3">

                    {/* RANK */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[12px] font-black ${
                        index === 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-[#e8f1fc] text-[#1e5bb8]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* BROKER LOGO */}
                    <BrokerLogo
                      broker={broker}
                      size="small"
                    />

                    {/* BROKER NAME */}
                    <div className="min-w-0">
                      <Link
                        href={reviewHref}
                        className="block text-[15px] font-black leading-6 text-[#081a33] transition hover:text-[#1e5bb8]"
                      >
                        {displayName}
                      </Link>

                      {/* FIRST BROKER BADGE */}
                      {index === 0 && (
                        <span className="mt-1.5 inline-flex rounded-md bg-amber-100 px-2.5 py-1 text-[10px] font-black text-amber-800">
                          ★ Highest Rated
                        </span>
                      )}
                    </div>

                  </div>
                </th>

                {/* ======================================
                    RATING — GOLD BADGE
                ======================================= */}

                <td className="px-2 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2">

                    <span className="text-[15px] text-amber-500">
                      ★
                    </span>

                    <span className="text-[15px] font-black tabular-nums text-amber-800">
                      {ratingLabel(broker.rating)}
                    </span>

                    <span className="text-[11px] font-bold text-amber-600">
                      / 5
                    </span>

                  </div>
                </td>

                {/* ======================================
                    MINIMUM DEPOSIT
                ======================================= */}

                <td className="px-2 py-4 text-center">
                  <span className="text-[16px] font-black tabular-nums text-[#081a33]">
                    {formatDeposit(
                      getDisplayDeposit(broker)
                    )}
                  </span>
                </td>

                {/* ======================================
                    NUMBER OF LICENCES
                ======================================= */}

                <td className="px-2 py-4 text-center">
                  <span className="block text-[17px] font-black text-[#123b72]">
                    {broker.active_license_count}
                  </span>

                  <span className="mt-1 block text-[11px] font-medium text-slate-500">
                    Registered Licences
                  </span>
                </td>

                {/* ======================================
                    REGULATORY AUTHORITIES
                    WHITE OUTLINED BADGES
                ======================================= */}

                <td className="px-2 py-4">
                  <div className="flex flex-wrap items-center justify-center gap-1.5">

                    {licenseCodes.length > 0 ? (
                      licenseCodes.map((code) => (
                        <span
                          key={`${broker.id}-${code}`}
                          className="inline-flex min-h-[26px] items-center justify-center rounded-md border border-[#cbdcf2] bg-white px-2.5 text-[11px] font-black text-[#184a97]"
                        >
                          {code}
                        </span>
                      ))
                    ) : (
                      <span className="text-[12px] text-slate-500">
                        Not specified
                      </span>
                    )}

                  </div>
                </td>

                {/* ======================================
                    TRADING PLATFORMS
                    BLUE BADGES
                ======================================= */}

                <td className="px-2 py-4">
                  <div className="flex flex-wrap items-center justify-center gap-1.5">

                    {platforms.length > 0 ? (
                      platforms.map((platform) => (
                        <span
                          key={`${broker.id}-${platform}`}
                          className="inline-flex min-h-[26px] items-center justify-center rounded-md bg-[#eaf2fd] px-2.5 text-[11px] font-bold text-[#1e5bb8]"
                        >
                          {platform}
                        </span>
                      ))
                    ) : (
                      <span className="text-[12px] text-slate-500">
                        Not specified
                      </span>
                    )}

                  </div>
                </td>

                {/* ======================================
                    ISLAMIC ACCOUNT
                    GREEN BADGE
                ======================================= */}

                <td className="px-2 py-4 text-center">
                  <span
                    className={`inline-flex min-h-[30px] items-center justify-center rounded-lg px-3 text-[12px] font-black ${
                      broker.has_islamic_account
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {broker.has_islamic_account
                      ? "✓ Available"
                      : "Check Terms"}
                  </span>
                </td>

                {/* ======================================
                    ACTION BUTTONS
                    VERTICAL — SAME AS ARABIC
                ======================================= */}

                <td className="px-3 py-3">
                  <div className="mx-auto flex w-full max-w-[130px] flex-col gap-2">

                    {/* REVIEW BUTTON */}
                    <Link
                      href={reviewHref}
                      className="inline-flex min-h-[38px] items-center justify-center rounded-lg border border-[#a9c5e9] bg-white px-2 text-center text-[12px] font-black text-[#184a97] transition hover:bg-[#eef5fd]"
                    >
                      Read Review
                    </Link>

                    {/* OPEN ACCOUNT BUTTON */}
                    {broker.real_account_url &&
                    broker.slug ? (
                      <a
                        href={`/go/${broker.slug}?type=real`}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-[#1e5bb8] px-2 text-center text-[12px] font-black text-white transition hover:bg-[#184a97]"
                      >
                        Open Account
                      </a>
                    ) : (
                      <Link
                        href={reviewHref}
                        className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-[#1e5bb8] px-2 text-center text-[12px] font-black text-white transition hover:bg-[#184a97]"
                      >
                        Broker Details
                      </Link>
                    )}

                  </div>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* =================================================
        MOBILE + TABLET
        SAME EXPANDABLE CARDS AS ARABIC
    ================================================= */}

    <div className="space-y-3 lg:hidden">
      {topTen.map((broker, index) => {
        const displayName = brokerName(broker);

        const reviewHref = broker.slug
          ? `/en/brokers/${broker.slug}`
          : "/en/brokers";

        const licenseCodes = Array.from(
          new Set(
            broker.licenses
              .map((license) =>
                license.regulator_code
                  ?.trim()
                  .toUpperCase()
              )
              .filter(
                (code): code is string =>
                  Boolean(code)
              )
          )
        ).slice(0, 5);

        const platforms = Array.from(
          new Set(
            splitItems(broker.platforms, 5)
          )
        ).slice(0, 4);

        return (
          <article
            key={broker.id}
            className={`overflow-hidden rounded-2xl border bg-white ${
              index === 0
                ? "border-amber-400"
                : "border-[#d6e5f8]"
            }`}
          >
            <details className="group">

              {/* ======================================
                  COLLAPSED BROKER SUMMARY
              ======================================= */}

              <summary className="cursor-pointer list-none p-3.5 [&::-webkit-details-marker]:hidden">

                {/* BROKER HEADER */}
                <div className="flex items-center gap-3">

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-black ${
                      index === 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-[#eef5fd] text-[#1e5bb8]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <BrokerLogo
                    broker={broker}
                    size="small"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[14px] font-black text-[#081a33]">
                      {displayName}
                    </h3>

                    <p className="mt-1 truncate text-[10px] text-slate-500">
                      {brokerBestFor(broker)}
                    </p>
                  </div>

                  <span className="text-lg font-black text-[#1e5bb8] transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </div>

                {/* THREE KEY METRICS */}
                <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-[#e2eaf4] bg-[#f7faff] text-center">

                  {/* RATING */}
                  <div className="px-1 py-2">
                    <span className="block text-[10px] text-slate-500">
                      Rating
                    </span>

                    <strong className="mt-1 block text-[12px] text-amber-700">
                      ★ {ratingLabel(broker.rating)}
                    </strong>
                  </div>

                  {/* DEPOSIT */}
                  <div className="border-x border-[#e2eaf4] px-1 py-2">
                    <span className="block text-[10px] text-slate-500">
                      Min. Deposit
                    </span>

                    <strong className="mt-1 block text-[12px] text-[#081a33]">
                      {formatDeposit(
                        getDisplayDeposit(broker)
                      )}
                    </strong>
                  </div>

                  {/* LICENCES */}
                  <div className="px-1 py-2">
                    <span className="block text-[10px] text-slate-500">
                      Licences
                    </span>

                    <strong className="mt-1 block text-[12px] text-[#081a33]">
                      {broker.active_license_count}
                    </strong>
                  </div>

                </div>

                {/* EXPAND/COLLAPSE TEXT */}
                <p className="mt-2 text-center text-[11px] font-black text-[#1e5bb8]">
                  <span className="group-open:hidden">
                    Show Details ⌄
                  </span>

                  <span className="hidden group-open:inline">
                    Hide Details ⌃
                  </span>
                </p>
              </summary>

              {/* ======================================
                  EXPANDED BROKER DETAILS
              ======================================= */}

              <div className="space-y-4 border-t border-[#e2eaf4] p-4">

                {/* REGULATORS */}
                <div>
                  <h4 className="mb-2 text-[12px] font-black text-[#081a33]">
                    Registered Regulatory Authorities
                  </h4>

                  <div className="flex flex-wrap gap-1.5">
                    {licenseCodes.length > 0 ? (
                      licenseCodes.map((code) => (
                        <span
                          key={`${broker.id}-${code}`}
                          className="rounded-md border border-[#d6e5f8] px-2 py-1 text-[10px] font-bold text-[#184a97]"
                        >
                          {code}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-500">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>

                {/* PLATFORMS */}
                <div>
                  <h4 className="mb-2 text-[12px] font-black text-[#081a33]">
                    Trading Platforms
                  </h4>

                  <div className="flex flex-wrap gap-1.5">
                    {platforms.length > 0 ? (
                      platforms.map((platform) => (
                        <span
                          key={`${broker.id}-${platform}`}
                          className="rounded-md bg-[#eef5fd] px-2 py-1 text-[10px] font-bold text-[#1e5bb8]"
                        >
                          {platform}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-500">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>

                {/* ISLAMIC ACCOUNT */}
                <div className="flex items-center justify-between rounded-xl bg-[#f5f8fd] px-3 py-2.5">
                  <span className="text-[12px] font-bold text-slate-700">
                    Islamic Account
                  </span>

                  <strong
                    className={`text-[12px] ${
                      broker.has_islamic_account
                        ? "text-emerald-700"
                        : "text-[#184a97]"
                    }`}
                  >
                    {broker.has_islamic_account
                      ? "✓ Available"
                      : "Check Conditions"}
                  </strong>
                </div>

                {/* ACTION BUTTONS */}
                <div className="grid grid-cols-2 gap-2.5">

                  <Link
                    href={reviewHref}
                    className="flex min-h-11 items-center justify-center rounded-xl border border-[#a9c5e9] bg-white px-2 text-center text-[12px] font-black text-[#184a97] transition hover:bg-[#eef5fd]"
                  >
                    Read Review
                  </Link>

                  {broker.real_account_url &&
                  broker.slug ? (
                    <a
                      href={`/go/${broker.slug}?type=real`}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex min-h-11 items-center justify-center rounded-xl bg-[#1e5bb8] px-2 text-center text-[12px] font-black text-white transition hover:bg-[#184a97]"
                    >
                      Open Account
                    </a>
                  ) : (
                    <Link
                      href={reviewHref}
                      className="flex min-h-11 items-center justify-center rounded-xl bg-[#1e5bb8] px-2 text-center text-[12px] font-black text-white transition hover:bg-[#184a97]"
                    >
                      Broker Details
                    </Link>
                  )}
                </div>

                {/* FULL REVIEW LINK */}
                <Link
                  href={reviewHref}
                  className="block text-center text-[11px] font-bold text-[#1e5bb8] hover:underline"
                >
                  Read Full {displayName} Review →
                </Link>

              </div>
            </details>
          </article>
        );
      })}
    </div>

    {/* =================================================
        DISCLAIMER
    ================================================= */}

    <p className="mt-5 text-[11px] font-medium leading-6 text-slate-500">
      Rankings are based on the overall editorial
      ratings published by Broker Alarab and do not
      constitute investment recommendations.
      Trading conditions, regulatory licences and
      account availability may vary by country
      and legal entity. Verify official information
      before opening a trading account.
    </p>

  </div>
</section>


      {/* =====================================================
          5 — INTERACTIVE BROKER FINDER
      ===================================================== */}

      <section
        id="broker-finder"
        aria-labelledby="broker-finder-title"
        className="scroll-mt-24 border-b border-[#dce7f5] bg-white py-7 sm:py-11"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 max-w-[920px] text-center sm:mb-8">
            <h2
              id="broker-finder-title"
              className="text-[25px] font-black leading-[1.35] text-[#081a33] sm:text-[37px]"
            >
              Find the{" "}
              <span className="text-[#2B6FD0]">
                Right Forex Broker for You
              </span>
            </h2>

            <p className="mt-3 text-[13px] font-medium leading-7 text-slate-600 sm:text-[16px]">
              Select your country of residence and
              at least one additional preference.
              Compare up to three matching brokers
              based on country-specific rankings.
            </p>
          </div>

          <BestBrokersPageFinderEn
            brokers={brokersData}
            countries={countries.map((country) => ({
              id: country.id,
              slug: country.slug,
              name: country.name,
              flag: country.flag,
            }))}
            countryRankings={countryRankings}
            rankingsError={Boolean(countryRankingsError)}
          />

          
{/* =====================================================
    COUNTRY LINKS — ALL 12 ENGLISH COUNTRIES
    REAL FLAG IMAGES — WINDOWS / MOBILE COMPATIBLE
===================================================== */}

<nav
  aria-label="Forex broker rankings by country"
  className="mx-auto mt-5 max-w-[1250px] border-t border-slate-200 pt-4 sm:mt-7 sm:pt-5"
>
  <h3 className="text-center text-[12px] font-black text-[#081a33] sm:text-sm">
    Explore Forex Broker Rankings by Country
  </h3>

  <div className="mx-auto mt-3 grid max-w-[1050px] grid-cols-3 gap-1.5 sm:mt-5 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4">
    {countries.map((country) => {
      const countryCode = (country.code || "")
        .trim()
        .toLowerCase();

      const validCode = /^[a-z]{2}$/.test(countryCode);

      return (
        <Link
          key={country.id}
          href={`/en/best-brokers/${country.slug}`}
          title={`Best Forex Brokers in ${country.name}`}
          className="group flex min-h-[62px] min-w-0 flex-col items-center justify-center gap-1 rounded-lg border border-[#d6e5f8] bg-[#f8fbff] px-1 py-2 text-[#184A97] shadow-[0_2px_6px_rgba(30,91,184,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2B6FD0] hover:bg-[#EEF5FD] hover:shadow-md sm:grid sm:min-h-[50px] sm:grid-cols-[28px_minmax(0,1fr)_14px] sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2"
        >
          {/* REAL COUNTRY FLAG */}

          <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d6e5f8] bg-white shadow-sm">
            {validCode ? (
              <img
                src={`https://flagcdn.com/w80/${countryCode}.png`}
                alt={`${country.name} flag`}
                width={28}
                height={28}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[16px]">
                🌍
              </span>
            )}
          </span>

          {/* COUNTRY NAME */}

          <span className="min-w-0 text-center text-[10px] font-black leading-4 text-[#184A97] sm:text-left sm:text-[12px] sm:leading-5">
            {country.name}
          </span>

          {/* ARROW */}

          <span
            aria-hidden="true"
            className="hidden text-center text-[12px] text-[#8aa9d0] transition group-hover:translate-x-0.5 group-hover:text-[#1E5BB8] sm:block"
          >
            →
          </span>
        </Link>
      );
    })}
  </div>
</nav>

        </div>
      </section>

      {/* =====================================================
          SEO DISCOVERY HUB
      ===================================================== */}

      <div dir="ltr">
        {/* =================================================
            6 — BROKERS BY USE CASE
        ================================================= */}

        <section
          id="use-cases"
          aria-labelledby="use-cases-title"
          className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-10 sm:py-14"
        >
          <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[850px] text-center">
              <span className="inline-flex rounded-full bg-[#e6f0ff] px-4 py-1.5 text-[11px] font-black text-[#1E5BB8]">
                Choose by Your Trading Needs
              </span>

              <h2
                id="use-cases-title"
                className="mt-4 text-[25px] font-black text-[#081a33] sm:text-[34px]"
              >
                Best Forex Brokers by Trading Needs
              </h2>

              <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[15px]">
                No single trading company is suitable
                for everyone. Compare brokers based
                on account conditions, available
                platforms, deposit requirements
                and regulatory information.
              </p>
            </div>

            {/* MOBILE — SINGLE COLUMN CARDS */}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:hidden">
              {useCasePicks.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#d6e5f8] bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="text-[13px] font-black text-[#123B72]">
                      {item.title}
                    </h3>

                    <RatingBadge rating={item.broker.rating} />
                  </div>

                  <div className="flex items-center gap-3">
                    <BrokerLogo
                      broker={item.broker}
                      size="normal"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-black text-[#081a33]">
                        {brokerName(item.broker)}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">
                        Minimum deposit:{" "}
                        {formatDeposit(
                          getDisplayDeposit(item.broker)
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-3">
                    <BrokerButtons broker={item.broker} compact />
                  </div>
                </article>
              ))}
            </div>

            {/* DESKTOP — CATEGORY CARDS */}

            <div className="mt-7 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {useCasePicks.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-[18px] border border-[#d6e5f8] bg-white p-5 shadow-sm transition hover:border-[#a9c8f1] hover:shadow-md"
                >
                  <span className="w-fit rounded-full bg-[#eef5fd] px-3 py-1 text-[10px] font-black text-[#1e5bb8]">
                    {item.shortTitle}
                  </span>

                  <h3 className="mt-3 text-[17px] font-black text-[#081a33]">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-[75px] text-[12px] leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#f7faff] p-3">
                    <BrokerLogo
                      broker={item.broker}
                      size="normal"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-black text-[#081a33]">
                        {brokerName(item.broker)}
                      </p>

                      <div className="mt-1">
                        <RatingBadge rating={item.broker.rating} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <BrokerButtons broker={item.broker} compact />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            7 — BROKERS BY FINANCIAL MARKET
        ================================================= */}

        <section
          id="trading-markets"
          aria-labelledby="trading-markets-title"
          className="border-b border-[#dce7f5] bg-white py-8 sm:py-12"
        >
          <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[900px] text-center">
              <h2
                id="trading-markets-title"
                className="text-[23px] font-black text-[#081a33] sm:text-[34px]"
              >
                Best Brokers by Financial Market
              </h2>

              <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[15px]">
                Trading conditions and fees differ
                between markets. Choose your preferred
                financial market to explore relevant
                broker comparison criteria.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              {[
                {
                  number: "01",
                  title: "Forex Brokers",
                  shortTitle: "Forex Trading",
                  description:
                    "Compare currency brokers by spreads, execution and available currency pairs.",
                  criteria: [
                    "Spreads",
                    "Execution",
                    "Currency Pairs",
                  ],
                  href: "/en/best-brokers",
                },
                {
                  number: "02",
                  title: "Stock Brokers",
                  shortTitle: "Stock Trading",
                  description:
                    "Review stock markets, fees and the differences between shares and CFDs.",
                  criteria: [
                    "Products",
                    "Commissions",
                    "Markets",
                  ],
                  href: "/en/best-brokers/stocks",
                },
                {
                  number: "03",
                  title: "Indices Brokers",
                  shortTitle: "Indices Trading",
                  description:
                    "Compare global stock indices, holding costs and trading hours.",
                  criteria: [
                    "Indices",
                    "Trading Hours",
                    "Costs",
                  ],
                  href: "/en/best-brokers/indices",
                },
                {
                  number: "04",
                  title: "Commodity Brokers",
                  shortTitle: "Commodities",
                  description:
                    "Explore gold, oil and commodity trading conditions and available instruments.",
                  criteria: [
                    "Gold",
                    "Oil",
                    "Trading Costs",
                  ],
                  href: "/en/best-brokers/commodities",
                },
              ].map((market) => (
                <Link
                  key={market.number}
                  href={market.href}
                  className="group flex h-full flex-col rounded-[18px] border border-[#d6e5f8] bg-[#fbfdff] p-3 transition-all hover:-translate-y-0.5 hover:border-[#9fc2f0] hover:bg-[#eef5fd] hover:shadow-md sm:p-5"
                >
                  <span className="text-[11px] font-black text-[#2B6FD0]">
                    {market.number}
                  </span>

                  <h3 className="mt-3 min-h-[45px] text-[14px] font-black leading-6 text-[#081a33] sm:text-[17px]">
                    {market.title}
                  </h3>

                  <p className="mt-2 flex-1 text-[11px] leading-6 text-slate-600 sm:text-[12px]">
                    {market.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {market.criteria.map((criterion) => (
                      <span
                        key={criterion}
                        className="rounded-full bg-[#eef5fd] px-2 py-1 text-[9px] font-bold text-[#184A97]"
                      >
                        {criterion}
                      </span>
                    ))}
                  </div>

                  <span className="mt-4 text-[11px] font-black text-[#1e5bb8] group-hover:underline">
                    Explore Brokers →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        
{/* =================================================
    8 — TRADING CONDITIONS
    MATCHING ARABIC VERSION — ENGLISH LTR
================================================= */}

<section
  id="trading-conditions"
  aria-labelledby="trading-conditions-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-8 sm:py-12"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">

    {/* SECTION HEADING */}

    <div className="mx-auto max-w-[900px] text-center">
      <h2
        id="trading-conditions-title"
        className="text-[23px] font-black leading-tight text-[#081a33] sm:text-[34px]"
      >
        How to Choose a Forex Broker Based on Account Conditions
      </h2>

      <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[15px]">
        A forex broker may offer several account types,
        each with different trading conditions.
        Use the following criteria to compare trading
        costs, minimum deposit requirements and account
        conditions before opening a live trading account.
      </p>
    </div>

    {/* COMPARISON TABLE */}

    <div className="mt-7 overflow-hidden rounded-[20px] border border-[#d6e5f8] bg-white shadow-sm">

      {/* DESKTOP TABLE HEADER */}

      <div className="hidden grid-cols-[1.1fr_1.6fr_1.4fr_150px] items-center bg-[#123b72] px-6 py-[18px] text-center text-[13px] font-black text-white lg:grid">

        <span className="text-center">
          Comparison Criteria
        </span>

        <span className="text-center">
          What Should You Check?
        </span>

        <span className="text-center">
          Why Does It Matter?
        </span>

        <span className="text-center">
          Guide
        </span>
      </div>

      {/* TABLE ROWS */}

      {[
        {
          title: "Trading Account Types",
          check:
            "Compare Standard, Raw and other trading account types offered by each broker.",
          reason:
            "Spreads, commissions and minimum deposits may differ between account types offered by the same broker.",
          href: "/en/compare-accounts",
          link: "Compare Accounts",
        },
        {
          title: "Minimum Deposit",
          check:
            "Verify the minimum amount required to open an account and the minimum deposit per transaction.",
          reason:
            "Some account types require higher deposits to access different trading conditions.",
          href: "/en/brokers",
          link: "Compare Deposits",
        },
        {
          title: "Spreads & Commissions",
          check:
            "Review average spreads, commissions per lot and overnight swap charges.",
          reason:
            "The total trading cost matters more than comparing spreads alone.",
          href: "/en/learn-trading/spread",
          link: "Spread Guide",
        },
        {
          title: "Islamic Trading Accounts",
          check:
            "Review eligible instruments, swap-free conditions and any additional administration fees.",
          reason:
            "Islamic account conditions vary by broker, account type and country of residence.",
          href: "/en/compare-accounts",
          link: "Account Conditions",
        },
        {
          title: "Forex Broker Comparison",
          check:
            "Compare two brokers directly by ratings, regulatory licences, account types and trading conditions.",
          reason:
            "A direct comparison helps identify important differences before selecting a broker.",
          href: "/en/compare",
          link: "Compare Brokers",
        },
        {
          title: "Leverage & Margin",
          check:
            "Check available leverage, margin requirements and stop-out levels.",
          reason:
            "Higher leverage magnifies both profits and losses and increases liquidation risk.",
          href: "/en/learn-trading/leverage",
          link: "Leverage Guide",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className={`grid gap-3 border-b border-[#e2eaf5] p-4 last:border-b-0 sm:p-5 lg:grid-cols-[1.1fr_1.6fr_1.4fr_150px] lg:items-center lg:gap-5 lg:px-6 lg:py-5 ${
            index % 2 === 0
              ? "bg-white"
              : "bg-[#f8faff]"
          }`}
        >

          {/* CRITERION WITH NUMBER */}

          <div className="flex w-full items-center justify-start gap-3 text-left">

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f1ff] text-[12px] font-black text-[#1e5bb8]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="text-left text-[14px] font-black leading-6 text-[#081a33] sm:text-[15px]">
              {item.title}
            </h3>

          </div>

          {/* WHAT TO CHECK */}

          <p className="text-[12px] leading-6 text-slate-700 sm:text-[13px] sm:leading-7 lg:text-center">
            {item.check}
          </p>

          {/* WHY IT MATTERS */}

          <p className="hidden text-[13px] leading-7 text-slate-600 sm:block lg:text-center">
            {item.reason}
          </p>

          {/* GUIDE BUTTON */}

          <Link
            href={item.href}
            className="inline-flex min-h-[42px] w-fit items-center justify-center rounded-lg bg-[#1e5bb8] px-4 text-center text-[12px] font-black leading-5 text-white transition-all duration-200 hover:bg-[#184a97] hover:shadow-md lg:w-full"
          >
            {item.link}
          </Link>

        </div>
      ))}
    </div>

    {/* DISCLAIMER */}

    <p className="mt-4 text-center text-[11px] leading-6 text-slate-500 sm:text-[12px]">
      Actual trading account conditions depend on
      the broker's legal entity, your country of residence
      and the selected account type. Always verify the
      latest conditions directly with the broker before
      registering.
    </p>

  </div>
</section>


{/* =================================================
    9 — REGULATION AND SAFETY
    LINKED REGULATORS + RESPONSIVE SHOW MORE
================================================= */}

<section
  id="licenses"
  aria-labelledby="licenses-title"
  className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-9 sm:py-14"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">

    {/* SECTION HEADING */}

    <div className="mx-auto max-w-[900px] text-center">
      <h2
        id="licenses-title"
        className="text-[24px] font-black leading-[1.4] text-[#081a33] sm:text-[36px]"
      >
        How to Verify a Regulated and Trustworthy Forex Broker
      </h2>

      <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
        A trading company holding a licence does not
        necessarily mean every client receives the same
        regulatory protection. Verify the legal entity,
        licence number and regulator responsible for
        your account before depositing money.
      </p>
    </div>

    {/* VERIFICATION STEPS */}

    <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">
      {[
        {
          number: "01",
          title: "Verify the Legal Entity",
          description:
            "Match the company registered with the regulator to the legal entity providing your trading account.",
        },
        {
          number: "02",
          title: "Check the Licence Number",
          description:
            "Search the licence number on the regulator's official website rather than relying on regulatory logos alone.",
        },
        {
          number: "03",
          title: "Confirm the Protection Scope",
          description:
            "Check authorisation status, permitted activities and whether the protections apply to your account.",
        },
      ].map((step) => (
        <article
          key={step.number}
          className="flex items-start gap-3 rounded-xl border border-[#d6e5f8] bg-white p-4 sm:p-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f1ff] text-[12px] font-black text-[#1e5bb8]">
            {step.number}
          </span>

          <div>
            <h3 className="text-[14px] font-black text-[#081a33]">
              {step.title}
            </h3>

            <p className="mt-2 text-[12px] leading-7 text-slate-600">
              {step.description}
            </p>
          </div>
        </article>
      ))}
    </div>

    {/* =================================================
        REGULATORY AUTHORITIES
    ================================================= */}

    <div className="mt-6 overflow-hidden rounded-[18px] border border-[#d6e5f8] bg-white">

      {/* HEADER */}

      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#123b72] px-4 py-4 text-white sm:px-6">
        <h3 className="text-[15px] font-black sm:text-[18px]">
          Regulatory Authorities in Our Broker Database
        </h3>

        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold">
          {uniqueRegulatorCount} Authorities
        </span>
      </div>

      {/* =================================================
          MOBILE / TABLET
          SHOW FIRST 6
      ================================================= */}

      <div className="p-3 sm:p-5 lg:hidden">

        {/* FIRST SIX */}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {regulatorSummaries
            .slice(0, 6)
            .map((regulator) => (
              <RegulatorCard
                key={regulator.code}
                regulator={regulator}
              />
            ))}
        </div>

        {/* SHOW MORE — MOBILE */}

        {regulatorSummaries.length > 6 && (
          <details className="group mt-4">

            <summary className="mx-auto flex min-h-10 w-fit cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-[#bfd3ee] bg-[#eef5fd] px-6 text-[12px] font-black text-[#1e5bb8] transition hover:border-[#2b6fd0] hover:bg-[#dceaff] [&::-webkit-details-marker]:hidden">

              <span className="group-open:hidden">
                Show More Regulators
                {" "}({regulatorSummaries.length - 6})
              </span>

              <span className="hidden group-open:inline">
                Show Less
              </span>

              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-open:rotate-180"
              >
                ↓
              </span>
            </summary>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              {regulatorSummaries
                .slice(6)
                .map((regulator) => (
                  <RegulatorCard
                    key={regulator.code}
                    regulator={regulator}
                  />
                ))}
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-500">
              Select any regulator to read its
              licence and verification guide.
            </p>
          </details>
        )}
      </div>

      {/* =================================================
          DESKTOP
          SHOW FIRST 12
      ================================================= */}

      <div className="hidden p-5 lg:block">

        {/* FIRST TWELVE */}

        <div className="grid grid-cols-4 gap-3">
          {regulatorSummaries
            .slice(0, 12)
            .map((regulator) => (
              <RegulatorCard
                key={regulator.code}
                regulator={regulator}
              />
            ))}
        </div>

        {/* SHOW MORE — DESKTOP */}

        {regulatorSummaries.length > 12 && (
          <details className="group mt-4">

            <summary className="mx-auto flex min-h-10 w-fit cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-[#bfd3ee] bg-[#eef5fd] px-6 text-[12px] font-black text-[#1e5bb8] transition hover:border-[#2b6fd0] hover:bg-[#dceaff] [&::-webkit-details-marker]:hidden">

              <span className="group-open:hidden">
                Show More Regulators
                {" "}({regulatorSummaries.length - 12})
              </span>

              <span className="hidden group-open:inline">
                Show Less
              </span>

              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-open:rotate-180"
              >
                ↓
              </span>
            </summary>

            {/* REMAINING REGULATORS */}

            <div className="mt-4 grid grid-cols-4 gap-3">
              {regulatorSummaries
                .slice(12)
                .map((regulator) => (
                  <RegulatorCard
                    key={regulator.code}
                    regulator={regulator}
                  />
                ))}
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-500">
              Click a regulator to view its
              licensing and verification guide.
            </p>
          </details>
        )}
      </div>
    </div>

    {/* REGULATORY DISCLAIMER */}

    <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-[12px] leading-7 text-amber-900">
        <strong>Important:</strong> The records above
        are drawn from our broker database. They do not
        independently verify current licence status
        or establish which legal entity will serve you.
        Always check the official regulator's register.
      </p>
    </div>
  </div>
</section>


  


        {/* =================================================
            10 — EDUCATIONAL GUIDE
        ================================================= */}

        <section
          id="choose-broker-guide"
          aria-labelledby="choose-broker-guide-title"
          className="scroll-mt-24 border-b border-[#dce7f5] bg-white py-6 sm:py-14"
        >
          <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[18px] border border-[#b8d1f2] bg-gradient-to-r from-[#e8f2ff] via-[#f3f8ff] to-white p-4 shadow-[0_12px_35px_rgba(24,74,151,0.06)] sm:rounded-[24px] sm:p-9 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#b9d5ff]/30 blur-3xl"
              />

              <div className="relative grid gap-5 sm:gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-[#c7daf3] bg-white px-3 py-1 text-[10px] font-black text-[#1E5BB8] sm:px-4 sm:py-1.5 sm:text-[11px]">
                    Forex Broker Selection Guide
                  </span>

                  <h2
                    id="choose-broker-guide-title"
                    className="mt-3 text-[21px] font-black leading-[1.4] text-[#081a33] sm:mt-4 sm:text-[32px] sm:leading-[1.5]"
                  >
                    How Do You Choose the Best Forex Broker for Your Needs?
                  </h2>

                  <p className="mt-2 text-[12px] leading-6 text-[#425674] sm:hidden">
                    Compare regulation, trading costs
                    and account types before choosing
                    a suitable broker.
                  </p>

                  <div className="hidden sm:block">
                    <p className="mt-4 text-[13px] leading-8 text-[#425674] sm:text-[14px]">
                      Choosing a trading company is
                      not just about its overall rating.
                      Start by identifying the markets
                      you want to trade, then compare
                      brokers by actual regulation,
                      trading costs, platforms and
                      minimum deposits.
                    </p>

                    <p className="mt-3 text-[13px] leading-8 text-[#425674] sm:text-[14px]">
                      Review account types, withdrawal
                      conditions and overnight charges.
                      Promotional bonuses or high
                      leverage should never be the
                      only reason for choosing a broker.
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                    <a
                      href="#comparison-table"
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1E5BB8] px-4 text-[11px] font-black text-white transition hover:bg-[#184A97] sm:px-5 sm:text-[12px]"
                    >
                      Compare Brokers →
                    </a>

                    <a
                      href="#broker-finder"
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#bfd3ee] bg-white px-4 text-[11px] font-black text-[#184A97] transition hover:bg-[#eef5fd] sm:px-5 sm:text-[12px]"
                    >
                      Find Your Broker →
                    </a>
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#c7daf3] bg-white/90 p-4 sm:p-6">
                  <h3 className="text-[15px] font-black text-[#081a33]">
                    Broker Selection Checklist
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "Confirm country eligibility",
                      "Verify the legal entity",
                      "Check regulatory licences",
                      "Compare spreads and commissions",
                      "Review platforms and instruments",
                      "Check funding and withdrawals",
                      "Understand leverage and trading risk",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 border-b border-[#edf2fa] pb-3 last:border-0 last:pb-0"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f4ec] text-[11px] font-black text-emerald-700">
                          ✓
                        </span>

                        <span className="text-[12px] font-bold leading-6 text-[#334b6e]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link
                      href="/en/learn-trading"
                      className="flex min-h-10 items-center justify-center rounded-lg bg-[#1E5BB8] px-2 text-center text-[10px] font-black text-white"
                    >
                      Learn Trading →
                    </Link>

                    <Link
                      href="/en/learn-trading/economic-indicators"
                      className="flex min-h-10 items-center justify-center rounded-lg border border-[#bfd3ee] bg-white px-2 text-center text-[10px] font-black text-[#1E5BB8]"
                    >
                      Economic Indicators →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            11 — FREQUENTLY ASKED QUESTIONS
        ================================================= */}

        <section
          id="best-brokers-faq"
          aria-labelledby="best-brokers-faq-title"
          className="scroll-mt-24 border-b border-[#dce7f5] bg-[#f5f8fd] py-7 sm:py-14"
        >
          <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[900px] text-center">
              <h2
                id="best-brokers-faq-title"
                className="text-[23px] font-black leading-[1.4] text-[#081a33] sm:text-[35px]"
              >
                Frequently Asked Questions About Forex Brokers
              </h2>

              <p className="mt-2 text-[12px] leading-6 text-slate-600 sm:hidden">
                Answers about forex brokers,
                regulation, accounts and trading costs.
              </p>

              <p className="mt-3 hidden text-[13px] leading-7 text-slate-600 sm:block sm:text-[15px]">
                Find answers to common questions about
                the best forex brokers in 2026,
                regulatory verification, trading
                accounts and choosing a suitable broker.
              </p>
            </div>

            <div className="mt-6 grid items-start gap-3 sm:mt-9 sm:gap-4 lg:grid-cols-2">
              {faqItems.map((item, index) => (
                <details
                  key={item.question}
                  className="group overflow-hidden rounded-xl border border-[#d6e5f8] bg-white shadow-[0_4px_16px_rgba(24,74,151,0.035)] transition-all duration-200 open:border-[#a9c8f1] open:shadow-[0_8px_25px_rgba(24,74,151,0.08)] sm:rounded-[18px]"
                >
                  <summary className="flex min-h-[54px] cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 transition hover:bg-[#f7faff] sm:min-h-[76px] sm:gap-4 sm:px-4 sm:py-4 lg:px-6 [&::-webkit-details-marker]:hidden">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#eef5fd] text-[10px] font-black text-[#1e5bb8] sm:h-9 sm:w-9 sm:rounded-xl sm:text-[12px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="min-w-0 flex-1 text-left text-[12px] font-black leading-5 text-[#081a33] sm:text-[15px] sm:leading-7">
                      {item.question}
                    </h3>

                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d6e5f8] bg-[#f4f8ff] text-[17px] text-[#1e5bb8] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <div className="border-t border-[#e5edf8] bg-[#fbfdff] px-3 py-3 sm:px-6 sm:py-5">
                    <p className="text-[12px] leading-7 text-[#526784] sm:text-[14px] sm:leading-8">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-7 rounded-xl border border-[#d6e5f8] bg-white p-4 sm:p-6">
              <p className="text-[11px] leading-7 text-slate-600 sm:text-[12px]">
                <strong className="text-[#081a33]">
                  Risk Warning:
                </strong>{" "}
                Forex and CFD trading involves substantial
                risk. Leverage can magnify both profits
                and losses. Broker reviews and comparisons
                are provided for informational purposes
                and do not constitute personalised
                investment advice. Verify the applicable
                legal entity, account conditions and
                regulatory status before registering.
              </p>

              <p className="mt-3 text-[10px] font-bold text-slate-500">
                Last editorial review:{" "}
                {BEST_BROKERS_LAST_REVIEWED}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
