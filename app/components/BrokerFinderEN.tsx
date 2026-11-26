"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* =========================================================
   BROKER ALARAB — BROKER FINDER ENGLISH
========================================================= */

type Broker = {
  id: number;
  is_full_review: boolean;
  name: string | null;
  name_en?: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  account_types?: string | null;
  regulation: string | null;
  regulation_short?: string | null;
  best_for: string | null;
  best_for_en?: string | null;
  islamic_account: string | null;
  logo?: string | null;
  real_account_url?: string | null;

  priority_uk?: number | null;
  priority_australia?: number | null;
  priority_south_africa?: number | null;
  priority_singapore?: number | null;
  priority_malaysia?: number | null;
  priority_india?: number | null;
  priority_nigeria?: number | null;
  priority_thailand?: number | null;
  priority_philippines?: number | null;
  priority_kenya?: number | null;

  score_safety?: number | null;
  score_fees?: number | null;
  score_platforms?: number | null;

  key_strength_en?: string | null;
  key_weakness_en?: string | null;
  withdrawal_speed_en?: string | null;
  deposit_withdrawal_summary_en?: string | null;
  broker_positioning_en?: string | null;
  who_should_use_en?: string | null;
  expert_insight_en?: string | null;
};

type CountryRanking = {
  country_slug: string;
  broker_id: number;
  rank_position: number;
  country_rating: number | null;
  best_for: string | null;
  local_note: string | null;
};

type Props = {
  brokers: Broker[];
  countryRankings?: CountryRanking[];
};

type Experience = "beginner" | "intermediate" | "pro";

type DepositRange =
  | "under50"
  | "50to200"
  | "200to1000"
  | "over1000";

type PlatformPref = "any" | "mt4" | "mt5";

/* =========================================================
   ENGLISH COUNTRY OPTIONS
========================================================= */

const COUNTRIES = [
  { value: "united-kingdom", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "south-africa", label: "South Africa" },
  { value: "singapore", label: "Singapore" },
  { value: "malaysia", label: "Malaysia" },
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "thailand", label: "Thailand" },
  { value: "philippines", label: "Philippines" },
  { value: "kenya", label: "Kenya" },
  { value: "indonesia", label: "Indonesia" },
  { value: "vietnam", label: "Vietnam" },
  { value: "other", label: "All Other Countries" },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function normalize(text: string | null | undefined) {
  return (text || "").toLowerCase();
}

function cleanText(
  value: string | null | undefined,
  fallback = "Not specified"
) {
  return value?.trim() || fallback;
}

function brokerName(broker: Broker) {
  return cleanText(
    broker.name_en || broker.name,
    "Broker"
  );
}

function brokerBestFor(broker: Broker) {
  return cleanText(
    broker.best_for_en || broker.best_for,
    "Recommended broker"
  );
}

function depositValue(range: DepositRange) {

  switch (range) {

    case "under50":
      return 50;

    case "50to200":
      return 200;

    case "200to1000":
      return 1000;

    case "over1000":
      return 100000;

  }

}

function getBrokerInitials(
  name: string | null | undefined
) {
  return cleanText(name, "Broker")
    .slice(0, 2)
    .toUpperCase();
}

/* =========================================================
   REGULATION BADGES
========================================================= */

function RegulationBadges({
  value,
}: {
  value: string;
}) {

  const regulations = Array.from(
    new Set(
      value
        .split(/\s*(?:\|+|[,،;\/\n])\s*/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  return (

    <div className="flex flex-col gap-1.5">

      {/* REGULATION TITLE */}

      <div className="flex items-center gap-1.5">

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-brand-600"
        >

          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />

        </svg>

        <span className="text-[11px] font-bold text-slate-500">

          Regulation & Licenses

        </span>

      </div>

      {/* REGULATION BADGES */}

      <div
        dir="ltr"
        className="flex flex-wrap items-center gap-1.5"
      >

        {regulations.map((regulation) => (

          <span
            key={regulation}
            title={regulation}
            className="inline-flex min-h-[25px] max-w-full items-center justify-center rounded-md border border-[#d5e3f5] bg-[#f0f5fc] px-2 py-0.5 text-center text-[11px] font-bold leading-4 text-brand-600"
          >

            {regulation}

          </span>

        ))}

      </div>

    </div>

  );

}

/* =========================================================
   BROKER RECOMMENDATION LABEL
========================================================= */

function getRecommendationLabel(
  broker: Broker & {
    countryBestFor?: string | null;
  },
  index: number,
  experience: Experience | "",
  deposit: DepositRange | "",
  hasSearched: boolean
) {

  const bestFor = normalize(
    broker.countryBestFor || brokerBestFor(broker)
  );

  if (index === 0) return "Top Pick";

  if (
    bestFor.includes("beginner") ||
    bestFor.includes("new trader")
  ) {
    return "Beginner Friendly";
  }

  if ((broker.min_deposit ?? 999999) <= 10) {
    return "Low Deposit";
  }

  if ((broker.min_deposit ?? 999999) <= 50) {
    return "Easy Start";
  }

  if (
    bestFor.includes("scalp") ||
    bestFor.includes("professional")
  ) {
    return "For Pro Traders";
  }

  if (
    bestFor.includes("day") ||
    bestFor.includes("active")
  ) {
    return "Active Trading";
  }

  if (hasSearched) {

    if (experience === "beginner") {
      return "Matches Your Level";
    }

    if (experience === "intermediate") {
      return "Balanced Choice";
    }

    if (experience === "pro") {
      return "Pro Friendly";
    }

    if (deposit === "under50") {
      return "Low Budget";
    }

  }

  return "Recommended";

}

/* =========================================================
   SCORE TEXT
========================================================= */

function scoreText(
  value: number | null | undefined
) {

  if (value == null) return "Not specified";

  const v = Number(value);

  if (v >= 4.5) return "Excellent";
  if (v >= 4.1) return "Very Good";
  if (v >= 3.7) return "Good";

  return "Average";

}

/* =========================================================
   BROKER DECISION POINT
========================================================= */

function decisionPoint(
  broker: Broker & {
    countryBestFor?: string | null;
    countryLocalNote?: string | null;
  }
) {

  const bestFor = normalize(
    broker.countryBestFor || brokerBestFor(broker)
  );

  if (bestFor.includes("ecn")) {
    return "Professional ECN accounts";
  }

  if (
    bestFor.includes("beginner") ||
    bestFor.includes("new trader")
  ) {
    return "Suitable for beginners";
  }

  if (bestFor.includes("spread")) {
    return "Competitive trading spreads";
  }

  if (bestFor.includes("scalp")) {
    return "Suitable for scalping";
  }

  if (bestFor.includes("gold")) {
    return "Suitable for gold trading";
  }

  if (
    bestFor.includes("active") ||
    bestFor.includes("day trading")
  ) {
    return "Suitable for active trading";
  }

  if (broker.key_strength_en?.trim()) {
    return broker.key_strength_en.trim();
  }

  if ((broker.min_deposit ?? 999999) <= 10) {
    return "Low minimum deposit";
  }

  if ((broker.min_deposit ?? 999999) <= 50) {
    return "Accessible starting deposit";
  }

  return "Recommended broker";

}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function BrokerFinderEN({
  brokers,
  countryRankings = [],
}: Props) {

  const [country, setCountry] = useState("");

  const [deposit, setDeposit] =
    useState<DepositRange | "">("");

  const [experience, setExperience] =
    useState<Experience | "">("");

  const [platform, setPlatform] =
    useState<PlatformPref | "">("");

  const [islamic, setIslamic] =
    useState("yes");

  const [showMobileFilters, setShowMobileFilters] =
    useState(false);

  const [hasSearched, setHasSearched] =
    useState(false);

  const [appliedFilters, setAppliedFilters] =
    useState({
      country: "",
      deposit: "" as DepositRange | "",
      experience: "" as Experience | "",
      platform: "" as PlatformPref | "",
      islamic: "yes",
    });

  const [expandedMobileId, setExpandedMobileId] =
    useState<number | null>(null);

  /* =====================================================
     SEARCH AVAILABILITY
  ====================================================== */

  const canSearch =
    country === "other" ||
    (
      country !== "" &&
      (
        deposit !== "" ||
        experience !== "" ||
        platform !== "" ||
        islamic !== "yes"
      )
    );

  /* =====================================================
     BROKER RANKING AND FILTERING
  ====================================================== */

  const results = useMemo(() => {

    const {
      country,
      deposit,
      experience,
      platform,
      islamic,
    } = appliedFilters;

    const hasActiveFilters = hasSearched;

    const scored = brokers

      .filter(
        (broker) => broker.is_full_review === true
      )

      .map((broker) => {

        let score = 0;

        const platforms = normalize(
          broker.platforms
        );

        const islamicValue = normalize(
          broker.islamic_account
        );

        const hasIslamicAccount =
          !/\b(?:no|not available|unavailable)\b/.test(
            islamicValue
          ) &&
          (
            islamicValue.includes("yes") ||
            islamicValue.includes("available") ||
            islamicValue.includes("متوفر")
          );

        /* ===============================================
           COUNTRY RANKING
           PRIMARY RANKING FACTOR
        ================================================ */

        const countryRanking =
          hasActiveFilters &&
          country !== "other"
            ? countryRankings.find(
                (row) =>
                  row.country_slug === country &&
                  row.broker_id === broker.id
              )
            : undefined;

        const hasCountryRanking =
          Boolean(countryRanking);

        const countryPriority =
          countryRanking?.rank_position ?? 999;

        /* ===============================================
           GENERAL SCORE
           SECONDARY RANKING FACTOR
        ================================================ */

        score += (broker.rating || 0) * 5;

        /* ===============================================
           USER PREFERENCES
        ================================================ */

        if (hasActiveFilters) {

          if (deposit !== "") {

            const maxDeposit =
              depositValue(deposit);

            if (
              broker.min_deposit !== null &&
              broker.min_deposit <= maxDeposit
            ) {
              score += 5;
            }

          }

          if (
            platform === "mt4" &&
            platforms.includes("mt4")
          ) {
            score += 3;
          }

          if (
            platform === "mt5" &&
            platforms.includes("mt5")
          ) {
            score += 3;
          }

          if (platform === "any") {
            score += 1;
          }

          if (
            islamic === "yes" &&
            hasIslamicAccount
          ) {
            score += 4;
          }

          if (islamic === "no") {
            score += 1;
          }

          const rankingBestFor = normalize(
            countryRanking?.best_for ||
            broker.best_for_en ||
            broker.best_for
          );

          /* BEGINNER */

          if (experience === "beginner") {

            if (
              rankingBestFor.includes("beginner") ||
              rankingBestFor.includes("new trader") ||
              rankingBestFor.includes("easy") ||
              (broker.min_deposit ?? 999999) <= 50
            ) {
              score += 4;
            }

          }

          /* INTERMEDIATE */

          if (experience === "intermediate") {

            if (
              rankingBestFor.includes("active") ||
              rankingBestFor.includes("general") ||
              rankingBestFor.includes("trader") ||
              rankingBestFor.includes("day")
            ) {
              score += 3;
            }

          }

          /* PROFESSIONAL */

          if (experience === "pro") {

            if (
              rankingBestFor.includes("professional") ||
              rankingBestFor.includes("pro") ||
              rankingBestFor.includes("scalp")
            ) {
              score += 4;
            }

          }

        }

        return {

          ...broker,

          score,

          hasCountryRanking,

          countryPriority,

          countryRating:
            countryRanking?.country_rating ??
            broker.rating,

          countryBestFor:
            countryRanking?.best_for ??
            broker.best_for_en ??
            broker.best_for,

          countryLocalNote:
            countryRanking?.local_note ??
            null,

        };

      });

    return scored

      .sort((a, b) => {

        /* BEFORE SEARCH — GENERAL RATING */

        if (!hasActiveFilters) {

          return (
            (b.rating || 0) -
            (a.rating || 0)
          );

        }

        /* COUNTRY RANKED BROKERS FIRST */

        if (
          a.hasCountryRanking !==
          b.hasCountryRanking
        ) {

          return a.hasCountryRanking
            ? -1
            : 1;

        }

        /* COUNTRY RANK POSITION */

        if (
          a.hasCountryRanking &&
          b.hasCountryRanking &&
          a.countryPriority !== b.countryPriority
        ) {

          return (
            a.countryPriority -
            b.countryPriority
          );

        }

        /* SECONDARY FILTER SCORE */

        if (b.score !== a.score) {

          return b.score - a.score;

        }

        /* GENERAL RATING */

        return (
          (b.rating || 0) -
          (a.rating || 0)
        );

      })

      .slice(0, 3);

  }, [
    brokers,
    countryRankings,
    appliedFilters,
    hasSearched,
  ]);

  /* =====================================================
     HANDLE SEARCH
  ====================================================== */

  function handleSearch() {

    if (!canSearch) return;

    if (country === "other") {

      window.location.href =
        "/en/best-brokers";

      return;

    }

    setAppliedFilters({
      country,
      deposit,
      experience,
      platform,
      islamic,
    });

    setHasSearched(true);

    setShowMobileFilters(false);

    setExpandedMobileId(null);

  }

  function toggleMobileRow(id: number) {

    setExpandedMobileId(
      (prev) => (prev === id ? null : id)
    );

  }

  /* =====================================================
     RENDER
  ====================================================== */

  return (

    <>

      {/* =================================================
          DESKTOP — PREMIUM COMPACT BROKER FINDER
      ================================================== */}

      <section
        dir="ltr"
        lang="en"
        className="hidden overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:block"
      >

        <div className="p-4">

          <div className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-3.5">

            {/* FILTER HEADER */}

            <div className="mb-3 flex items-center justify-between">

              <div>

                <h2 className="text-[24px] font-black tracking-[-0.02em] text-[#07111f]">

                  Find the Right Trading Broker for You

                </h2>

                <p className="mt-1 text-[15px] font-semibold text-slate-500">

                  Select your preferences to find brokers
                  suited to your trading needs.

                </p>

              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-600 shadow-sm ring-1 ring-slate-200">

                Quick Filter

              </span>

            </div>

            {/* ===========================================
                DESKTOP FILTERS
            ============================================ */}

            <div className="grid grid-cols-5 gap-3">

              {/* COUNTRY */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Country

                </label>

                <select
                  aria-label="Select country"
                  value={country}
                  onChange={(e) =>
                    setCountry(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                >

                  <option value="">
                    Select Country
                  </option>

                  {COUNTRIES.map((item) => (

                    <option
                      key={item.value}
                      value={item.value}
                    >

                      {item.label}

                    </option>

                  ))}

                </select>

              </div>

              {/* DEPOSIT */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Deposit Amount

                </label>

                <select
                  aria-label="Select deposit amount"
                  value={deposit}
                  onChange={(e) =>
                    setDeposit(
                      e.target.value as DepositRange | ""
                    )
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                >

                  <option value="">
                    Select Deposit
                  </option>

                  <option value="under50">
                    Under $50
                  </option>

                  <option value="50to200">
                    $50 to $200
                  </option>

                  <option value="200to1000">
                    $200 to $1,000
                  </option>

                  <option value="over1000">
                    Over $1,000
                  </option>

                </select>

              </div>

              {/* EXPERIENCE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Experience Level

                </label>

                <select
                  aria-label="Select experience level"
                  value={experience}
                  onChange={(e) =>
                    setExperience(
                      e.target.value as Experience | ""
                    )
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                >

                  <option value="">
                    Select Experience
                  </option>

                  <option value="beginner">
                    Beginner
                  </option>

                  <option value="intermediate">
                    Intermediate
                  </option>

                  <option value="pro">
                    Professional
                  </option>

                </select>

              </div>

              {/* PLATFORM */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Platform

                </label>

                <select
                  aria-label="Select trading platform"
                  value={platform}
                  onChange={(e) =>
                    setPlatform(
                      e.target.value as PlatformPref | ""
                    )
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                >

                  <option value="">
                    Select Platform
                  </option>

                  <option value="any">
                    Any Platform
                  </option>

                  <option value="mt4">
                    MT4
                  </option>

                  <option value="mt5">
                    MT5
                  </option>

                </select>

              </div>

              {/* SWAP-FREE ACCOUNT */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">

                  Swap-free Account

                </label>

                <select
                  aria-label="Select swap-free account preference"
                  value={islamic}
                  onChange={(e) =>
                    setIslamic(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                >

                  <option value="yes">
                    Yes
                  </option>

                  <option value="no">
                    Not important
                  </option>

                </select>

              </div>

            </div>

            {/* SEARCH BUTTON */}

            <div className="mt-3 flex items-center justify-between gap-4">

              <p className="text-sm font-semibold text-slate-500">

                Results are ranked by country-specific
                rankings, overall ratings and your
                selected preferences.

              </p>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className={`inline-flex min-w-[250px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition ${
                  canSearch
                    ? "bg-brand-500 text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] hover:bg-brand-600"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >

                Find My Top 3 Brokers

              </button>

            </div>

          </div>

          {/* ===============================================
              DESKTOP RESULTS HEADER
          ================================================ */}

          <div className="mt-4 flex items-end justify-between">

            <div>

              <div className="text-xl font-black text-[#07111f]">

                {hasSearched
                  ? "Your Best Broker Matches"
                  : "Top-Rated Trading Brokers"}

              </div>

              <div className="mt-1 text-sm font-semibold text-slate-500">

                {hasSearched
                  ? "Ranked according to your selected preferences."
                  : "Leading options based on current ratings and broker data."}

              </div>

            </div>

            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600">

              Data-Driven Ranking

            </span>

          </div>

          {/* ===============================================
              DESKTOP BROKER CARDS
          ================================================ */}

          <div className="mt-3 grid grid-cols-3 gap-4">

            {results.map((broker, index) => {

              const name =
                brokerName(broker);

              const recommendation =
                getRecommendationLabel(
                  broker,
                  index,
                  appliedFilters.experience,
                  appliedFilters.deposit,
                  hasSearched
                );

              const openAccountHref =
                broker.real_account_url ||
                `/en/brokers/${broker.slug}`;

              const strength =
                decisionPoint(broker);

              const reg =
                broker.regulation_short ||
                broker.regulation ||
                "Not specified";

              const rating =
                broker.countryRating ??
                broker.rating;

              return (

                <article
                  key={broker.id}
                  className={`group relative flex flex-col overflow-hidden rounded-[24px] border bg-white/95 p-4 backdrop-blur-sm transition duration-300 ${
                    index === 0
                      ? "border-brand-400 shadow-[0_18px_45px_rgba(37,99,235,0.13)]"
                      : "border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.06)] hover:-translate-y-[3px] hover:shadow-[0_15px_35px_rgba(15,23,42,0.10)]"
                  }`}
                >

                  {index === 0 && (

                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />

                  )}

                  {/* BROKER HEADER */}

                  <div className="flex items-start justify-between gap-4 md:max-xl:relative md:max-xl:gap-2">

                    <div className="flex min-w-0 flex-1 items-center gap-4 md:max-xl:w-full md:max-xl:flex-none md:max-xl:flex-col md:max-xl:gap-0">

                      {/* BROKER LOGO */}

                      <Link
                        href={`/en/brokers/${broker.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-[78px] w-[78px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition hover:scale-[1.03] md:max-xl:h-[60px] md:max-xl:w-[60px] md:max-xl:self-start"
                      >

                        {broker.logo ? (

                          <img
                            src={broker.logo}
                            alt={`${name} logo`}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                            style={{
                              transform: name
                                .toLowerCase()
                                .includes("capital")
                                ? "scale(0.85)"
                                : "scale(1)",
                            }}
                          />

                        ) : (

                          <span className="text-lg font-black text-brand-500">

                            {getBrokerInitials(name)}

                          </span>

                        )}

                      </Link>

                      {/* BROKER NAME */}

                      <div className="flex min-h-[78px] min-w-0 flex-1 flex-col justify-center md:max-xl:min-h-0 md:max-xl:w-full md:max-xl:flex-none md:max-xl:items-center md:max-xl:text-center md:max-xl:-mt-1">

                        <div className="flex items-start gap-2">

                          <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 px-2 text-xs font-black text-white">

                            {index + 1}

                          </span>

                          <Link
                            href={`/en/brokers/${broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block max-w-[170px] leading-[1.15] text-[20px] font-black text-[#07111f] transition hover:text-brand-500 md:max-xl:min-w-0 md:max-xl:flex-1 md:max-xl:break-words"
                            title={name}
                          >

                            {name}

                          </Link>

                        </div>

                        <div className="mt-2">

                          <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[11px] font-extrabold text-brand-600">

                            {recommendation}

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* BROKER RATING */}

                    <div className="shrink-0 rounded-[24px] border border-brand-100 bg-brand-50 px-4 py-3 text-center md:max-xl:absolute md:max-xl:right-0 md:max-xl:top-0 md:max-xl:rounded-xl md:max-xl:px-1.5 md:max-xl:py-1">

                      <div className="text-2xl font-black text-brand-600 md:max-xl:text-lg md:max-xl:leading-5">

                        {rating?.toFixed(2) ?? "—"}

                      </div>

                      <div className="text-[10px] font-bold text-slate-500">

                        / 5

                      </div>

                    </div>

                  </div>

                  {/* =====================================
                      QUICK SUMMARY
                  ====================================== */}

                  <div className="mt-3 rounded-[16px] border border-slate-100 bg-slate-50/80 px-3 py-2.5">

                    <div className="text-xs font-black text-slate-500">

                      Quick Summary

                    </div>

                    <div className="mt-1.5 grid gap-1 text-sm font-bold leading-5 text-slate-700">

                      <div>

                        ✓ {strength}

                      </div>

                      <div>

                        ✓ Selected for rating, safety and fees

                      </div>

                    </div>

                  </div>

                  {/* =====================================
                      BROKER KEY METRICS
                  ====================================== */}

                  <div className="mt-3 grid grid-cols-3 gap-2">

                    {/* MINIMUM DEPOSIT */}

                    <div className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-center">

                      <div className="text-[11px] font-bold text-slate-500">

                        Deposit

                      </div>

                      <div className="mt-0.5 text-sm font-black text-[#07111f]">

                        {broker.min_deposit != null
                          ? `$${broker.min_deposit}`
                          : "N/A"}

                      </div>

                    </div>

                    {/* SAFETY */}

                    <div className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-center">

                      <div className="text-[11px] font-bold text-slate-500">

                        Safety

                      </div>

                      <div className="mt-0.5 text-sm font-black text-[#07111f]">

                        {scoreText(
                          broker.score_safety
                        )}

                      </div>

                    </div>

                    {/* FEES */}

                    <div className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-center">

                      <div className="text-[11px] font-bold text-slate-500">

                        Fees

                      </div>

                      <div className="mt-0.5 text-sm font-black text-[#07111f]">

                        {scoreText(
                          broker.score_fees
                        )}

                      </div>

                    </div>

                  </div>

                  {/* REGULATION BADGES */}

                  <div className="my-2.5">

                    <RegulationBadges
                      value={reg}
                    />

                  </div>

                  {/* =====================================
                      ACTION BUTTONS
                  ====================================== */}

                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">

                    <Link
                      href={`/en/brokers/${broker.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-[#07111f] transition hover:bg-slate-50"
                    >

                      Read Review

                    </Link>

                    <Link
                      href={openAccountHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center rounded-[16px] bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34)] md:max-xl:whitespace-nowrap md:max-xl:px-2"
                    >

                      <span>

                        Open{" "}

                        <span className="md:max-xl:hidden">
                          Live{" "}
                        </span>

                        Account

                      </span>

                    </Link>

                  </div>

                </article>

              );

            })}

          </div>

        </div>

      </section>

      {/* =================================================
          MOBILE — BROKER FINDER PREMIUM COMPACT V2
      ================================================== */}

      <section
        dir="ltr"
        lang="en"
        className="w-full min-w-0 lg:hidden"
      >

        {/* ===============================================
            MOBILE FILTER TOGGLE
        ================================================ */}

        <button
          type="button"
          aria-expanded={showMobileFilters}
          aria-controls="mobile-broker-filters"
          onClick={() =>
            setShowMobileFilters((prev) => !prev)
          }
          className="flex w-full min-w-0 items-center gap-3 rounded-[15px] border border-[#d5e3f5] bg-[#edf3fc] px-3 py-3 text-left transition active:bg-blue-100"
        >

          {/* FILTER ICON */}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-white text-[#194b92]">

            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >

              <path d="M4 7h16M4 12h16M4 17h16" />

              <circle
                cx="8"
                cy="7"
                r="2"
                fill="white"
              />

              <circle
                cx="15"
                cy="12"
                r="2"
                fill="white"
              />

              <circle
                cx="10"
                cy="17"
                r="2"
                fill="white"
              />

            </svg>

          </div>

          {/* FILTER TITLE */}

          <div className="min-w-0 flex-1">

            <div className="text-[14px] font-black leading-6 text-[#10233f]">

              Find the Right Broker for You

            </div>

            <div className="mt-0.5 text-[11px] font-medium leading-5 text-slate-600">

              Set your preferences for better broker matches

            </div>

          </div>

          {/* EXPAND BUTTON */}

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#194b92] text-white">

            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`transition-transform duration-200 ${
                showMobileFilters
                  ? "rotate-180"
                  : ""
              }`}
            >

              <path d="m6 9 6 6 6-6" />

            </svg>

          </span>

        </button>

        {/* ===============================================
            MOBILE FILTER FORM
        ================================================ */}

        {showMobileFilters && (

          <div
            id="mobile-broker-filters"
            className="mt-2 rounded-[15px] border border-slate-200 bg-white p-3"
          >

            <div className="mb-3">

              <h3 className="text-[14px] font-black text-[#10233f]">

                Select Your Preferences

              </h3>

              <p className="mt-1 text-[11px] font-medium leading-5 text-slate-500">

                Choose your country, deposit amount,
                experience and preferred platform.

              </p>

            </div>

            <div className="grid min-w-0 grid-cols-2 gap-2.5">

              {/* COUNTRY */}

              <div className="col-span-2 min-w-0">

                <label
                  htmlFor="mobile-finder-country"
                  className="mb-1.5 block text-[11px] font-bold text-slate-600"
                >

                  Country

                </label>

                <select
                  id="mobile-finder-country"
                  value={country}
                  onChange={(e) =>
                    setCountry(e.target.value)
                  }
                  className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
                >

                  <option value="">
                    Select Country
                  </option>

                  {COUNTRIES.map((item) => (

                    <option
                      key={item.value}
                      value={item.value}
                    >

                      {item.label}

                    </option>

                  ))}

                </select>

              </div>

              {/* DEPOSIT */}

              <div className="min-w-0">

                <label
                  htmlFor="mobile-finder-deposit"
                  className="mb-1.5 block text-[11px] font-bold text-slate-600"
                >

                  Deposit Amount

                </label>

                <select
                  id="mobile-finder-deposit"
                  value={deposit}
                  onChange={(e) =>
                    setDeposit(
                      e.target.value as DepositRange | ""
                    )
                  }
                  className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
                >

                  <option value="">
                    Select Deposit
                  </option>

                  <option value="under50">
                    Under $50
                  </option>

                  <option value="50to200">
                    $50 – $200
                  </option>

                  <option value="200to1000">
                    $200 – $1,000
                  </option>

                  <option value="over1000">
                    Over $1,000
                  </option>

                </select>

              </div>

              {/* EXPERIENCE */}

              <div className="min-w-0">

                <label
                  htmlFor="mobile-finder-experience"
                  className="mb-1.5 block text-[11px] font-bold text-slate-600"
                >

                  Experience Level

                </label>

                <select
                  id="mobile-finder-experience"
                  value={experience}
                  onChange={(e) =>
                    setExperience(
                      e.target.value as Experience | ""
                    )
                  }
                  className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
                >

                  <option value="">
                    Select Level
                  </option>

                  <option value="beginner">
                    Beginner
                  </option>

                  <option value="intermediate">
                    Intermediate
                  </option>

                  <option value="pro">
                    Professional
                  </option>

                </select>

              </div>

              {/* PLATFORM */}

              <div className="min-w-0">

                <label
                  htmlFor="mobile-finder-platform"
                  className="mb-1.5 block text-[11px] font-bold text-slate-600"
                >

                  Platform

                </label>

                <select
                  id="mobile-finder-platform"
                  value={platform}
                  onChange={(e) =>
                    setPlatform(
                      e.target.value as PlatformPref | ""
                    )
                  }
                  className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
                >

                  <option value="">
                    Select Platform
                  </option>

                  <option value="any">
                    Any Platform
                  </option>

                  <option value="mt4">
                    MT4
                  </option>

                  <option value="mt5">
                    MT5
                  </option>

                </select>

              </div>

              {/* SWAP-FREE ACCOUNT */}

              <div className="min-w-0">

                <label
                  htmlFor="mobile-finder-islamic"
                  className="mb-1.5 block text-[11px] font-bold text-slate-600"
                >

                  Swap-free Account

                </label>

                <select
                  id="mobile-finder-islamic"
                  value={islamic}
                  onChange={(e) =>
                    setIslamic(e.target.value)
                  }
                  className="h-12 w-full min-w-0 rounded-[10px] border border-slate-300 bg-white px-2 text-[16px] font-semibold text-[#10233f] outline-none focus:border-brand-500"
                >

                  <option value="yes">
                    Yes
                  </option>

                  <option value="no">
                    Not important
                  </option>

                </select>

              </div>

            </div>

            {/* SEARCH BUTTON */}

            <button
              type="button"
              onClick={handleSearch}
              disabled={!canSearch}
              className={`mt-3 flex min-h-[46px] w-full items-center justify-center rounded-[11px] px-3 text-[13px] font-black transition ${
                canSearch
                  ? "bg-[#194b92] text-white active:bg-[#102e55]"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >

              Find My Top 3 Brokers

            </button>

          </div>

        )}

        {/* ===============================================
            MOBILE RESULTS HEADER
        ================================================ */}

        <div className="mb-3 mt-5 flex min-w-0 items-center justify-between gap-2">

          <div className="min-w-0 flex-1">

            <h2 className="text-[17px] font-black leading-7 text-[#10233f]">

              {hasSearched
                ? "Your Best Broker Matches"
                : "Top-Rated Brokers"}

            </h2>

            <p className="mt-0.5 text-[11px] font-medium leading-5 text-slate-500">

              {hasSearched
                ? "Ranked by your selected preferences"
                : "Selected based on ratings and broker data"}

            </p>

          </div>

          <span className="shrink-0 rounded-md bg-[#e7effa] px-2 py-1 text-[10px] font-bold text-[#194b92]">

            Smart Ranking

          </span>

        </div>

        {/* ===============================================
            MOBILE BROKER RESULTS
        ================================================ */}

        <div className="space-y-2">

          {results.map((broker, index) => {

            const name =
              brokerName(broker);

            const isOpen =
              expandedMobileId === broker.id;

            const recommendation =
              getRecommendationLabel(
                broker,
                index,
                appliedFilters.experience,
                appliedFilters.deposit,
                hasSearched
              );

            const openAccountHref =
              broker.real_account_url ||
              `/en/brokers/${broker.slug}`;

            const strength =
              decisionPoint(broker);

            const reg =
              broker.regulation_short ||
              broker.regulation ||
              "Not specified";

            const rating =
              broker.countryRating ??
              broker.rating;

            return (

              <article
                key={broker.id}
                className={`min-w-0 overflow-hidden rounded-[15px] border bg-white transition-colors duration-200 ${
                  index === 0
                    ? "border-brand-400"
                    : "border-slate-200"
                }`}
              >

                {/* =====================================
                    BROKER ROW
                ====================================== */}

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`mobile-broker-details-${broker.id}`}
                  onClick={() =>
                    toggleMobileRow(broker.id)
                  }
                  className={`w-full min-w-0 px-2.5 py-3 text-left transition ${
                    isOpen
                      ? "bg-[#f5f8fd]"
                      : "bg-white active:bg-slate-50"
                  }`}
                >

                  <div className="grid min-w-0 grid-cols-[14px_clamp(72px,24vw,100px)_minmax(0,1fr)_44px_16px] items-center gap-2.5">

                    {/* BROKER RANK */}

                    <span className="flex h-[22px] w-[14px] items-center justify-center text-[12px] font-black text-slate-400">

                      {index + 1}

                    </span>

                    {/* BROKER LOGO */}

                    <div className="flex h-[56px] w-full min-w-0 items-center justify-center overflow-hidden px-1">

                      {broker.logo ? (

                        <img
                          src={broker.logo}
                          alt={`${name} logo`}
                          loading="lazy"
                          className="block h-[52px] w-full max-w-full object-contain object-center mix-blend-multiply"
                          style={{
                            transform: "scale(1.08)",
                          }}
                        />

                      ) : (

                        <span className="text-[13px] font-black text-[#194b92]">

                          {getBrokerInitials(name)}

                        </span>

                      )}

                    </div>

                    {/* BROKER NAME + LABEL */}

                    <div className="min-w-0">

                      <div
                        className="break-words text-[15px] font-black leading-5 text-[#10233f]"
                        title={name}
                      >

                        {name}

                      </div>

                      <span className="mt-1 inline-block max-w-full text-[10px] font-bold leading-4 text-[#194b92]">

                        {recommendation}

                      </span>

                    </div>

                    {/* BROKER RATING */}

                    <div className="flex shrink-0 flex-col items-center justify-center text-center">

                      <span className="text-[17px] font-black leading-5 text-[#194b92]">

                        {rating?.toFixed(2) ?? "—"}

                      </span>

                      <span className="mt-0.5 text-[9px] font-medium text-slate-400">

                        / 5

                      </span>

                    </div>

                    {/* EXPAND CHEVRON */}

                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`shrink-0 text-[#194b92] transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    >

                      <path d="m6 9 6 6 6-6" />

                    </svg>

                  </div>

                </button>

                {/* =====================================
                    EXPANDED BROKER DETAILS
                ====================================== */}

                {isOpen && (

                  <div
                    id={`mobile-broker-details-${broker.id}`}
                    className="border-t border-slate-200 px-3 pb-3 pt-3"
                  >

                    {/* QUICK SUMMARY */}

                    <div className="rounded-[10px] bg-[#f5f8fc] p-3">

                      <div className="text-[11px] font-black text-slate-500">

                        Quick Summary

                      </div>

                      <div className="mt-1.5 space-y-1 text-[12px] font-bold leading-6 text-[#10233f]">

                        <div className="flex items-start gap-2">

                          <span className="text-emerald-600">

                            ✓

                          </span>

                          <span>

                            {strength}

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* =================================
                        BROKER METRICS
                    ================================== */}

                    <div className="mt-3 grid grid-cols-3 gap-2">

                      {/* DEPOSIT */}

                      <div className="min-w-0 rounded-[10px] border border-slate-200 bg-white px-1 py-2.5 text-center">

                        <div className="text-[10px] font-medium text-slate-500">

                          Deposit

                        </div>

                        <div className="mt-1 break-words text-[13px] font-black text-[#10233f]">

                          {broker.min_deposit != null
                            ? `$${broker.min_deposit}`
                            : "N/A"}

                        </div>

                      </div>

                      {/* SAFETY */}

                      <div className="min-w-0 rounded-[10px] border border-slate-200 bg-white px-1 py-2.5 text-center">

                        <div className="text-[10px] font-medium text-slate-500">

                          Safety

                        </div>

                        <div className="mt-1 text-[13px] font-black text-[#10233f]">

                          {scoreText(
                            broker.score_safety
                          )}

                        </div>

                      </div>

                      {/* FEES */}

                      <div className="min-w-0 rounded-[10px] border border-slate-200 bg-white px-1 py-2.5 text-center">

                        <div className="text-[10px] font-medium text-slate-500">

                          Fees

                        </div>

                        <div className="mt-1 text-[13px] font-black text-[#10233f]">

                          {scoreText(
                            broker.score_fees
                          )}

                        </div>

                      </div>

                    </div>

                    {/* REGULATION BADGES */}

                    <div className="mt-3">

                      <RegulationBadges
                        value={reg}
                      />

                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">

                      <Link
                        href={`/en/brokers/${broker.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] items-center justify-center rounded-[10px] border border-slate-200 bg-white px-2 text-[12px] font-black text-[#10233f]"
                      >

                        Read Review

                      </Link>

                      <Link
                        href={openAccountHref}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex min-h-[44px] items-center justify-center rounded-[10px] bg-[#194b92] px-2 text-[12px] font-black text-white"
                      >

                        Open Account

                      </Link>

                    </div>

                  </div>

                )}

              </article>

            );

          })}

        </div>

      </section>

    </>

  );

}