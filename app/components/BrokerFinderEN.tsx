"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Broker = {
  id: number;
  name: string | null;
  name_en?: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
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

type Props = { brokers: Broker[] };

type Experience = "beginner" | "intermediate" | "pro";
type DepositRange = "under50" | "50to200" | "200to1000" | "over1000";
type PlatformPref = "any" | "mt4" | "mt5";

function normalize(text: string | null | undefined) {
  return (text || "").toLowerCase();
}

function cleanText(value: string | null | undefined, fallback = "Not specified") {
  return (value || fallback).trim();
}

function shortText(value: string | null | undefined, max = 42) {
  const text = cleanText(value);
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function brokerName(broker: Broker) {
  return cleanText(broker.name_en || broker.name, "Broker");
}

function brokerBestFor(broker: Broker) {
  return cleanText(broker.best_for_en || broker.best_for, "Recommended broker");
}

function brokerStrength(broker: Broker, index: number) {
  if (broker.key_strength_en) return broker.key_strength_en;
  if (index === 0) return "Best overall choice";
  if ((broker.min_deposit ?? 999999) <= 20) return "Suitable for low deposits";
  if (normalize(brokerBestFor(broker)).includes("spread")) {
    return "Strong trading-cost profile";
  }
  return brokerBestFor(broker);
}

function brokerWeakness(broker: Broker) {
  return broker.key_weakness_en || "Review trading conditions";
}

function brokerWithdrawal(broker: Broker) {
  return (
    broker.withdrawal_speed_en ||
    broker.deposit_withdrawal_summary_en ||
    "Depends on payment method"
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

function getBrokerInitials(name: string | null | undefined) {
  return cleanText(name, "Broker").slice(0, 2).toUpperCase();
}

function getCountryPriority(broker: Broker, country: string) {
  switch (country) {
    case "uk":
      return broker.priority_uk ?? 3;
    case "au":
      return broker.priority_australia ?? 3;
    case "za":
      return broker.priority_south_africa ?? 3;
    case "sg":
      return broker.priority_singapore ?? 3;
    case "my":
      return broker.priority_malaysia ?? 3;
    case "in":
      return broker.priority_india ?? 3;
    case "ng":
      return broker.priority_nigeria ?? 3;
    case "th":
      return broker.priority_thailand ?? 3;
    case "ph":
      return broker.priority_philippines ?? 3;
    case "ke":
      return broker.priority_kenya ?? 3;
    default:
      return 3;
  }
}

function priorityScore(priority: number | null | undefined) {
  switch (priority) {
    case 1:
      return 8;
    case 2:
      return 4;
    case 3:
      return 1;
    default:
      return 0;
  }
}

function getRecommendationLabel(
  broker: Broker,
  index: number,
  experience: Experience | "",
  deposit: DepositRange | "",
  hasSearched: boolean
) {
  const bestFor = normalize(brokerBestFor(broker));

  if (index === 0) return "Top Pick";
  if (bestFor.includes("beginner") || bestFor.includes("new trader")) {
    return "Beginner Friendly";
  }
  if ((broker.min_deposit ?? 999999) <= 10) return "Low Deposit";
  if ((broker.min_deposit ?? 999999) <= 50) return "Easy Start";
  if (bestFor.includes("scalp") || bestFor.includes("professional")) {
    return "For Pro Traders";
  }
  if (bestFor.includes("day") || bestFor.includes("active")) {
    return "Active Trading";
  }

  if (hasSearched) {
    if (experience === "beginner") return "Matches Your Level";
    if (experience === "intermediate") return "Balanced Choice";
    if (experience === "pro") return "Pro Friendly";
    if (deposit === "under50") return "Low Budget";
  }

  return "Recommended";
}

function scoreText(value: number | null | undefined) {
  const v = Number(value || 0);
  if (v >= 4.5) return "Excellent";
  if (v >= 4.1) return "Very Good";
  if (v >= 3.7) return "Good";
  return "Average";
}

export default function BrokerFinder({ brokers }: Props) {
  const [country, setCountry] = useState("");
  const [deposit, setDeposit] = useState<DepositRange | "">("");
  const [experience, setExperience] = useState<Experience | "">("");
  const [platform, setPlatform] = useState<PlatformPref | "">("");
  const [islamic, setIslamic] = useState("yes");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedMobileId, setExpandedMobileId] = useState<number | null>(null);

  const canSearch =
  country === "other" ||
  (
    country !== "" &&
    deposit !== "" &&
    experience !== "" &&
    platform !== ""
  );

  const results = useMemo(() => {
    const hasActiveFilters = hasSearched && canSearch;

    const scored = brokers.map((broker) => {
      let score = 0;

      const reg = normalize(broker.regulation);
      const bestFor = normalize(brokerBestFor(broker));
      const platforms = normalize(broker.platforms);

      const hasIslamicAccount =
        normalize(broker.islamic_account).includes("yes") ||
        normalize(broker.islamic_account).includes("available");

      const countryPriority = getCountryPriority(broker, country);

      score += (broker.rating || 0) * 5;
      score += priorityScore(countryPriority);

      if (hasActiveFilters) {
        const maxDeposit = depositValue(deposit as DepositRange);

        if (broker.min_deposit !== null && broker.min_deposit <= maxDeposit) {
          score += 4;
        }

        if (platform === "mt4" && platforms.includes("mt4")) score += 2;
        if (platform === "mt5" && platforms.includes("mt5")) score += 2;
        if (platform === "any") score += 1;

        if (islamic === "yes" && hasIslamicAccount) score += 3;
        if (islamic === "no") score += 1;

        if (experience === "beginner") {
          if (
            bestFor.includes("beginner") ||
            bestFor.includes("new trader") ||
            bestFor.includes("easy") ||
            (broker.min_deposit ?? 999999) <= 50
          ) {
            score += 3;
          }
        }

        if (experience === "intermediate") {
          if (
            bestFor.includes("active") ||
            bestFor.includes("trader") ||
            bestFor.includes("day")
          ) {
            score += 2;
          }
        }

        if (experience === "pro") {
          if (
            bestFor.includes("professional") ||
            bestFor.includes("pro") ||
            bestFor.includes("scalp")
          ) {
            score += 3;
          }
        }

        if (
          ["uk", "au", "za", "sg", "my", "in", "ng", "th", "ph", "ke"].includes(
            country
          )
        ) {
          if (
            reg.includes("fca") ||
            reg.includes("asic") ||
            reg.includes("cysec") ||
            reg.includes("fsca") ||
            reg.includes("fsa") ||
            reg.includes("fsc")
          ) {
            score += 2;
          }
        }
      }

      return { ...broker, score, countryPriority };
    });

    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;

        if ((a.countryPriority ?? 3) !== (b.countryPriority ?? 3)) {
          return (a.countryPriority ?? 3) - (b.countryPriority ?? 3);
        }

        return (b.rating || 0) - (a.rating || 0);
      })
      .slice(0, 3);
  }, [
    brokers,
    country,
    deposit,
    experience,
    islamic,
    platform,
    hasSearched,
    canSearch,
  ]);

 function handleSearch() {
  if (country === "other") {
    window.location.href =
      "https://brokeralarab.com/en/best-brokers";
    return;
  }

  if (!canSearch) return;

  setHasSearched(true);
  setShowMobileFilters(false);
  setExpandedMobileId(results[0]?.id ?? null);
}

  function toggleMobileRow(id: number) {
    setExpandedMobileId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <section
        dir="ltr"
        className="hidden overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:block"
      >
        <div className="p-6">
          <div className="rounded-[26px] border border-slate-200 bg-[#f8fbff] p-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-[24px] font-black tracking-[-0.02em] text-[#07111f]">
                  Find the Best 3 Brokers for You
                </h2>

                <p className="mt-1 text-[15px] font-semibold text-slate-500">
                  Select your country, deposit amount, experience level, and
                  platform to get smarter broker recommendations.
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-600 shadow-sm ring-1 ring-slate-200">
                Quick Filter
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Country
                </label>
                <select
  aria-label="Select country"
  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">Select Country</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="za">South Africa</option>
                  <option value="sg">Singapore</option>
                  <option value="my">Malaysia</option>
                  <option value="in">India</option>
                  <option value="ng">Nigeria</option>
                  <option value="th">Thailand</option>
                  <option value="ph">Philippines</option>
                  <option value="ke">Kenya</option>
                  <option value="other">All Other Countries</option>
                </select>
              </div>
                            <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Deposit Amount
                </label>
                <select
  aria-label="Select deposit amount"
  value={deposit}
                  onChange={(e) =>
                    setDeposit(e.target.value as DepositRange | "")
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">Select Deposit</option>
                  <option value="under50">Under $50</option>
                  <option value="50to200">$50 to $200</option>
                  <option value="200to1000">$200 to $1,000</option>
                  <option value="over1000">Over $1,000</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Experience Level
                </label>
                <select
  aria-label="Select experience level"
  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value as Experience | "")
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">Select Experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="pro">Professional</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Platform
                </label>
               <select
  aria-label="Select trading platform"
  value={platform}
                  onChange={(e) =>
                    setPlatform(e.target.value as PlatformPref | "")
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">Select Platform</option>
                  <option value="any">Any Platform</option>
                  <option value="mt4">MT4</option>
                  <option value="mt5">MT5</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Swap-free Account
                </label>
                <select
  aria-label="Select swap-free account preference"
  value={islamic}
                  onChange={(e) => setIslamic(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="yes">Yes</option>
                  <option value="no">Not important</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-500">
                Results are ranked by broker rating, country priority, and how
                well each broker matches your selected preferences.
              </p>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className={`inline-flex min-w-[250px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition ${
                  canSearch
                    ? "bg-[#2563eb] text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] hover:bg-[#1d4ed8]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                Show Top 3 Brokers
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="text-xl font-black text-[#07111f]">
                Top 3 Results for You
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-500">
                {hasSearched
                  ? "Ranked based on your selected preferences"
                  : "Top current broker options"}
              </div>
            </div>

            <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-extrabold text-[#1d4ed8]">
              Smart Ranking
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-5">
            {results.map((broker, index) => {
              const name = brokerName(broker);
              const recommendation = getRecommendationLabel(
                broker,
                index,
                experience,
                deposit,
                hasSearched
              );
              const openAccountHref =
                broker.real_account_url || `/brokers/${broker.slug}`;
              const strength = brokerStrength(broker, index);
              const weakness = brokerWeakness(broker);
              const withdrawal = brokerWithdrawal(broker);
              const reg =
                broker.regulation_short || broker.regulation || "Not specified";

              return (
                <article
                  key={broker.id}
                  className={`group relative flex min-h-[500px] flex-col overflow-hidden rounded-[30px] border bg-white/95 p-5 backdrop-blur-sm transition duration-300 ${
                    index === 0
                      ? "border-[#60a5fa] shadow-[0_28px_70px_rgba(37,99,235,0.18)]"
                      : "border-slate-200 shadow-[0_12px_35px_rgba(15,23,42,0.07)] hover:-translate-y-[4px] hover:shadow-[0_20px_50px_rgba(15,23,42,0.11)]"
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#60a5fa] via-[#2563eb] to-[#1d4ed8]" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <Link
                        href={`/brokers/${broker.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-[78px] w-[78px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition hover:scale-[1.03]"
                      >
                        {broker.logo ? (
                          <img
                            src={broker.logo}
                            alt={`${name} logo`}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-lg font-black text-[#2563eb]">
                            {getBrokerInitials(name)}
                          </span>
                        )}
                      </Link>

                      <div className="flex min-h-[78px] min-w-0 flex-1 flex-col justify-center">
                        <div className="flex items-start gap-2">
                          <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-[#2563eb] px-2 text-xs font-black text-white">
                            {index + 1}
                          </span>

                          <Link
                            href={`/brokers/${broker.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block max-w-[170px] leading-[1.15] text-[20px] font-black text-[#07111f] transition hover:text-[#2563eb]"
                            title={name}
                          >
                            {name}
                          </Link>
                        </div>

                        <div className="mt-2">
                          <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[11px] font-extrabold text-[#1d4ed8]">
                            {recommendation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-[24px] border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-center">
                      <div className="text-2xl font-black text-[#1d4ed8]">
                        {broker.rating?.toFixed(1) ?? "—"}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500">
                        / 5
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-slate-100 bg-slate-50/80 p-4">
                    <div className="text-xs font-black text-slate-500">
                      Quick Summary
                    </div>

                    <div className="mt-2 grid gap-2 text-sm font-bold text-slate-700">
                      <div>✓ {shortText(strength, 48)}</div>
                      <div>✓ Selected for rating, safety, and fees</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
                      <div className="text-[11px] font-bold text-slate-500">
                        Deposit
                      </div>
                      <div className="mt-1 text-sm font-black text-[#07111f]">
                        {broker.min_deposit !== null
                          ? `$${broker.min_deposit}`
                          : "N/A"}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
                      <div className="text-[11px] font-bold text-slate-500">
                        Safety
                      </div>
                      <div className="mt-1 text-sm font-black text-[#07111f]">
                        {scoreText(broker.score_safety ?? broker.rating)}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
                      <div className="text-[11px] font-bold text-slate-500">
                        Fees
                      </div>
                      <div className="mt-1 text-sm font-black text-[#07111f]">
                        {scoreText(broker.score_fees ?? broker.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex h-[44px] items-center justify-center rounded-[18px] bg-slate-50 px-4 text-center text-[12px] leading-[1.5] font-bold text-slate-700 ring-1 ring-slate-200">
                      <span className="line-clamp-2 w-full">
                        Regulation: {reg}
                      </span>
                    </div>

                    <div className="flex h-[54px] items-center justify-center rounded-[18px] bg-slate-50 px-4 text-center text-[12px] leading-[1.5] font-bold text-slate-700 ring-1 ring-slate-200">
                      <span className="line-clamp-2 w-full">
                        Withdrawals: {shortText(withdrawal, 80)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-xs font-bold text-orange-700 ring-1 ring-orange-100">
                    Note: {shortText(weakness, 60)}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                    <Link
                      href={`/brokers/${broker.slug}`}
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
                      className="inline-flex items-center justify-center rounded-[16px] bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-4 py-3 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34)]"
                    >
                      Open Live Account
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        dir="ltr"
        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] lg:hidden"
      >
        <div className="px-4 pb-4 pt-2">
          <button
            type="button"
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-[20px] border border-[#bfdbfe] bg-white px-4 py-3.5 text-left shadow-[0_12px_30px_rgba(37,99,235,0.10)]"
          >
            <div>
              <div className="text-[15px] font-black text-[#07111f]">
                Choose Country & Preferences
              </div>
              <div className="mt-1 text-[12px] font-semibold text-slate-500">
                Country, deposit, experience, platform
              </div>
            </div>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eff6ff] text-xl font-black text-[#2563eb]">
              {showMobileFilters ? "−" : "+"}
            </span>
          </button>

          {showMobileFilters && (
            <div className="mt-3 rounded-[24px] border border-[#bfdbfe] bg-gradient-to-b from-white to-[#f8fbff] p-4 shadow-[0_16px_38px_rgba(37,99,235,0.10)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-black text-[#07111f]">
                    Filter Results
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-slate-500">
                    Select your preferences for smarter ranking
                  </div>
                </div>

                <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-[10px] font-extrabold text-[#1d4ed8]">
                  Quick
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <select
  aria-label="Select country"
  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">Select Country</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="za">South Africa</option>
                  <option value="sg">Singapore</option>
                  <option value="my">Malaysia</option>
                  <option value="in">India</option>
                  <option value="ng">Nigeria</option>
                  <option value="th">Thailand</option>
                  <option value="ph">Philippines</option>
                  <option value="ke">Kenya</option>
                  <option value="other">All Other Countries</option>
                </select>

                <select
  aria-label="Select deposit amount"
  value={deposit}
                  onChange={(e) =>
                    setDeposit(e.target.value as DepositRange | "")
                  }
                  className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">Select Deposit</option>
                  <option value="under50">Under $50</option>
                  <option value="50to200">$50 to $200</option>
                  <option value="200to1000">$200 to $1,000</option>
                  <option value="over1000">Over $1,000</option>
                </select>

                <select
  aria-label="Select experience level"
  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value as Experience | "")
                  }
                  className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">Select Experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="pro">Professional</option>
                </select>

                <select
  aria-label="Select trading platform"
  value={platform}
                  onChange={(e) =>
                    setPlatform(e.target.value as PlatformPref | "")
                  }
                  className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="">Select Platform</option>
                  <option value="any">Any Platform</option>
                  <option value="mt4">MT4</option>
                  <option value="mt5">MT5</option>
                </select>

                <select
  aria-label="Select swap-free account preference"
  value={islamic}
                  onChange={(e) => setIslamic(e.target.value)}
                  className="h-[48px] rounded-[16px] border border-slate-200 bg-white px-4 text-[13px] font-bold text-[#07111f] shadow-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#dbeafe]"
                >
                  <option value="yes">Swap-free Account: Yes</option>
                  <option value="no">Not important</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch}
                className={`mt-4 inline-flex h-[48px] w-full items-center justify-center rounded-[18px] px-5 text-sm font-black transition ${
                  canSearch
                    ? "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-[0_14px_28px_rgba(37,99,235,0.25)]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                Show Top 3 Brokers
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="text-[20px] font-black text-[#07111f]">
                Top 3 Results for You
              </div>
              <div className="mt-1 text-[12px] font-semibold text-slate-500">
                {hasSearched
                  ? "Ranked based on your choices"
                  : "Top current broker options"}
              </div>
            </div>

            <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-extrabold text-[#1d4ed8]">
              Smart Ranking
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {results.map((broker, index) => {
              const isOpen = expandedMobileId === broker.id;
              const name = brokerName(broker);
              const recommendation = getRecommendationLabel(
                broker,
                index,
                experience,
                deposit,
                hasSearched
              );
              const openAccountHref =
                broker.real_account_url || `/brokers/${broker.slug}`;
              const strength = brokerStrength(broker, index);
              const weakness = brokerWeakness(broker);
              const withdrawal = brokerWithdrawal(broker);
              const reg =
                broker.regulation_short || broker.regulation || "Not specified";

              return (
                <div
                  key={broker.id}
                  className={`overflow-hidden rounded-[22px] border bg-white transition-all duration-300 ${
                    index === 0
                      ? "border-[#60a5fa] shadow-[0_16px_38px_rgba(37,99,235,0.14)]"
                      : "border-slate-200 shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
                  }`}
                >
                  {index === 0 && (
                    <div className="h-1.5 bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
                  )}

                  <button
                    type="button"
                    onClick={() => toggleMobileRow(broker.id)}
                    className="w-full px-3.5 py-3 text-left"
                  >
                    <div className="grid grid-cols-[54px_1fr_50px] items-center gap-2.5">
                      <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[17px] border border-slate-200 bg-white p-2 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                        {broker.logo ? (
                          <img
                            src={broker.logo}
                            alt={`${name} logo`}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-sm font-black text-[#2563eb]">
                            {getBrokerInitials(name)}
                          </span>
                        )}

                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-[10px] font-black text-white">
                          {index + 1}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-1 text-[18px] font-black leading-tight text-[#07111f]">
                          {name}
                        </div>

                        <div className="mt-1 inline-flex rounded-full bg-[#dbeafe] px-2.5 py-1 text-[10px] font-extrabold text-[#1d4ed8]">
                          {recommendation}
                        </div>
                      </div>

                      <div className="shrink-0 rounded-[15px] border border-[#bfdbfe] bg-[#eff6ff] px-2 py-2 text-center">
                        <div className="text-[18px] font-black leading-none text-[#1d4ed8]">
                          {broker.rating?.toFixed(1) ?? "—"}
                        </div>
                        <div className="mt-1 text-[9px] font-bold text-slate-500">
                          / 5
                        </div>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-4 pb-4 pt-4">
                      <div className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-3">
                        <div className="text-[11px] font-black text-slate-500">
                          Quick Summary
                        </div>

                        <div className="mt-2 space-y-1 text-[13px] font-bold leading-6 text-slate-700">
                          <div>✓ {shortText(strength, 46)}</div>
                          <div>✓ Selected for rating, safety, and fees</div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="rounded-2xl bg-[#f8fafc] px-2 py-3 text-center ring-1 ring-slate-200">
                          <div className="text-[10px] font-bold text-slate-500">
                            Deposit
                          </div>
                          <div className="mt-1 text-[13px] font-black text-[#07111f]">
                            {broker.min_deposit !== null
                              ? `$${broker.min_deposit}`
                              : "N/A"}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-[#f8fafc] px-2 py-3 text-center ring-1 ring-slate-200">
                          <div className="text-[10px] font-bold text-slate-500">
                            Safety
                          </div>
                          <div className="mt-1 text-[13px] font-black text-[#07111f]">
                            {scoreText(broker.score_safety ?? broker.rating)}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-[#f8fafc] px-2 py-3 text-center ring-1 ring-slate-200">
                          <div className="text-[10px] font-bold text-slate-500">
                            Fees
                          </div>
                          <div className="mt-1 text-[13px] font-black text-[#07111f]">
                            {scoreText(broker.score_fees ?? broker.rating)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex min-h-[44px] items-center justify-center rounded-[18px] bg-slate-50 px-3 text-center text-[12px] font-bold leading-[1.5] text-slate-700 ring-1 ring-slate-200">
                          <span className="line-clamp-2">
                            Regulation: {reg}
                          </span>
                        </div>

                        <div className="flex min-h-[50px] items-center justify-center rounded-[18px] bg-slate-50 px-3 text-center text-[12px] font-bold leading-[1.5] text-slate-700 ring-1 ring-slate-200">
                          <span className="line-clamp-2">
                            Withdrawals: {shortText(withdrawal, 74)}
                          </span>
                        </div>

                        <div className="rounded-[18px] bg-orange-50 px-3 py-3 text-center text-[12px] font-bold text-orange-700 ring-1 ring-orange-100">
                          Note: {shortText(weakness, 52)}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link
                          href={`/brokers/${broker.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-[16px] border border-slate-200 bg-white px-3 py-3 text-[13px] font-black text-[#07111f]"
                        >
                          Read Review
                        </Link>

                        <Link
                          href={openAccountHref}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center justify-center rounded-[16px] bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-3 py-3 text-[13px] font-black text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)]"
                        >
                          Open Account
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}