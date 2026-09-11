"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type PreparedAccount = {
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

type CategoryKey =
  | "standard"
  | "raw"
  | "ecn"
  | "cent";

type CompareCategory = {
  key: CategoryKey;
  label: string;
  shortLabel: string;
  firstAccount:
    | PreparedAccount
    | null
    | undefined;
  secondAccount:
    | PreparedAccount
    | null
    | undefined;
};

function toFiniteNumber(value: unknown) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const numericValue = Number(value);

  return Number.isFinite(numericValue)
    ? numericValue
    : null;
}

function formatNumber(value: unknown) {
  const numericValue = toFiniteNumber(value);

  if (numericValue === null) return "—";

  return numericValue
    .toFixed(2)
    .replace(/\.?0+$/, "");
}

function formatRating(
  value: number | string | null | undefined
) {
  const numericValue = toFiniteNumber(value);

  if (numericValue === null) return null;

  return numericValue.toFixed(2);
}

function getAccountDisplayName(
  account:
    | PreparedAccount
    | null
    | undefined
) {
  if (!account) return "Not available";

  return (
    account.account_name?.trim() ||
    "Account name unavailable"
  );
}

function getWinnerId(
  firstAccount:
    | PreparedAccount
    | null
    | undefined,
  secondAccount:
    | PreparedAccount
    | null
    | undefined
) {
  if (!firstAccount && !secondAccount) {
    return null;
  }

  if (firstAccount && !secondAccount) {
    return firstAccount.broker_id;
  }

  if (!firstAccount && secondAccount) {
    return secondAccount.broker_id;
  }

  if (!firstAccount || !secondAccount) {
    return null;
  }

  const firstCost =
    toFiniteNumber(
      firstAccount.total_cost_score
    ) ?? 9999;

  const secondCost =
    toFiniteNumber(
      secondAccount.total_cost_score
    ) ?? 9999;

  if (firstCost !== secondCost) {
    return firstCost < secondCost
      ? firstAccount.broker_id
      : secondAccount.broker_id;
  }

  const firstSpread =
    toFiniteNumber(
      firstAccount.spread_avg
    ) ?? 9999;

  const secondSpread =
    toFiniteNumber(
      secondAccount.spread_avg
    ) ?? 9999;

  if (firstSpread !== secondSpread) {
    return firstSpread < secondSpread
      ? firstAccount.broker_id
      : secondAccount.broker_id;
  }

  return null;
}

function BrokerLogo({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-brand-100 bg-white p-1.5 shadow-[0_4px_12px_rgba(30,91,184,0.08)] sm:h-[72px] sm:w-[72px] sm:rounded-[18px] sm:p-2.5 lg:h-20 lg:w-20">
      {src ? (
        <img
          src={src}
          alt={`${alt} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-[8px] font-black text-slate-400">
          LOGO
        </span>
      )}
    </div>
  );
}

function BrokerLinks({
  broker,
}: {
  broker: BrokerSummary;
}) {
  const reviewHref = broker.broker_slug
    ? `/en/brokers/${broker.broker_slug}`
    : null;

  const accountHref =
    broker.broker_account_url ||
    broker.best_overall
      ?.broker_account_url ||
    broker.broker_website_url ||
    null;

  if (!reviewHref && !accountHref) {
    return null;
  }

  return (
    <div
      className={`grid gap-2 ${
        reviewHref && accountHref
          ? "grid-cols-2"
          : "grid-cols-1"
      }`}
    >
      {reviewHref ? (
        <Link
          href={reviewHref}
          className="inline-flex min-h-9 items-center justify-center rounded-xl border border-brand-100 bg-white px-2.5 text-[10px] font-black text-brand-600 transition hover:border-brand-400 hover:bg-brand-50 sm:min-h-10 sm:px-3 sm:text-[11px]"
        >
          Review
        </Link>
      ) : null}

      {accountHref ? (
        <a
          href={accountHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center justify-center rounded-xl bg-brand-500 px-2.5 text-[10px] font-black text-white shadow-[0_5px_14px_rgba(30,91,184,0.18)] transition hover:bg-brand-600 sm:min-h-10 sm:px-3 sm:text-[11px]"
        >
          Open Account
        </a>
      ) : null}
    </div>
  );
}

function BrokerProfile({
  broker,
}: {
  broker: BrokerSummary;
}) {
  const rating = formatRating(
    broker.broker_rating
  );

  return (
    <div className="mt-2 rounded-[16px] border border-brand-100 bg-brand-50/50 p-2.5 sm:mt-3 sm:rounded-[18px] sm:p-4">
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <BrokerLogo
          src={broker.broker_logo}
          alt={broker.broker_name}
        />

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-black text-slate-950 sm:text-lg">
            {broker.broker_name}
          </div>

          {rating ? (
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-black text-amber-600 ring-1 ring-amber-100 sm:mt-1.5 sm:px-2.5 sm:py-1 sm:text-[10px]">
              <span aria-hidden="true">
                ★
              </span>

              <span>{rating}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-2 sm:mt-3">
        <BrokerLinks broker={broker} />
      </div>
    </div>
  );
}

function BrokerSelectionColumn({
  label,
  selectId,
  value,
  excludedId,
  brokers,
  broker,
  onChange,
}: {
  label: string;
  selectId: string;
  value: number;
  excludedId: number;
  brokers: BrokerSummary[];
  broker: BrokerSummary;
  onChange: (brokerId: number) => void;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={selectId}
        className="mb-1.5 block text-[11px] font-black text-slate-700 sm:mb-2 sm:text-sm"
      >
        {label}
      </label>

      <select
        id={selectId}
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs font-black text-slate-950 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 sm:h-12 sm:rounded-[14px] sm:px-4 sm:text-sm"
      >
        {brokers
          .filter(
            (item) =>
              item.broker_id !==
              excludedId
          )
          .map((item) => (
            <option
              key={item.broker_id}
              value={item.broker_id}
            >
              {item.broker_name}
            </option>
          ))}
      </select>

      <BrokerProfile broker={broker} />
    </div>
  );
}

function SpreadLane({
  broker,
  account,
  winner,
  maxSpread,
}: {
  broker: BrokerSummary;
  account:
    | PreparedAccount
    | null
    | undefined;
  winner: boolean;
  maxSpread: number;
}) {
  const spreadValue = toFiniteNumber(
    account?.spread_avg
  );

  const barWidth =
    spreadValue === null
      ? 0
      : Math.max(
          10,
          Math.min(
            100,
            (spreadValue / maxSpread) *
              100
          )
        );

  return (
    <article
      className={`rounded-[15px] border p-3 transition sm:rounded-[18px] sm:p-5 ${
        winner
          ? "border-emerald-300 bg-emerald-50/70"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h4 className="truncate text-sm font-black text-slate-950 sm:text-base">
              {broker.broker_name}
            </h4>

            {winner ? (
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[8px] font-black text-white sm:px-2.5 sm:py-1 sm:text-[9px]">
                Lower cost
              </span>
            ) : null}
          </div>

          <div className="mt-1 truncate text-[11px] font-extrabold text-slate-600 sm:mt-1.5 sm:text-sm">
            {getAccountDisplayName(
              account
            )}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div
            className={`text-[23px] font-black leading-none sm:text-[34px] ${
              winner
                ? "text-emerald-700"
                : "text-brand-600"
            }`}
          >
            {formatNumber(
              account?.spread_avg
            )}
          </div>

          <div className="mt-1 text-[8px] font-bold text-slate-500 sm:mt-1.5 sm:text-[9px]">
            Average spread
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[8px] font-bold text-slate-500 sm:mb-2 sm:text-[10px]">
          <span>0 pips</span>
          <span>Lower is better</span>
        </div>

        <div
          dir="ltr"
          className="relative h-3 overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200 sm:h-4"
        >
          <div className="pointer-events-none absolute inset-0 grid grid-cols-4 opacity-60">
            <span className="border-r border-white" />
            <span className="border-r border-white" />
            <span className="border-r border-white" />
            <span />
          </div>

          {account ? (
            <div
              className={`relative mr-auto h-full rounded-full transition-[width] duration-500 ${
                winner
                  ? "bg-[linear-gradient(90deg,#059669,#34d399)]"
                  : "bg-[linear-gradient(90deg,#1E5BB8,#2B6FD0)]"
              }`}
              style={{
                width: `${barWidth}%`,
              }}
            />
          ) : null}
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-slate-200/80 pt-2.5 text-[9px] font-bold text-slate-500 sm:mt-3 sm:gap-x-4 sm:gap-y-2 sm:pt-3 sm:text-xs">
        <span>
          Commission:{" "}
          <strong className="font-black text-slate-950">
            {account?.commission || "—"}
          </strong>
        </span>

        <span className="hidden h-3 w-px bg-slate-300 sm:block" />

        <span>
          Minimum deposit:{" "}
          <strong className="font-black text-slate-950">
            {account?.min_deposit ||
              "—"}
          </strong>
        </span>
      </div>
    </article>
  );
}

export default function LowestSpreadHeadToHead({
  brokers,
}: {
  brokers: BrokerSummary[];
}) {
  const sortedBrokers = useMemo(() => {
    return [...brokers].sort((a, b) =>
      String(
        a.broker_name
      ).localeCompare(
        String(b.broker_name),
        "en"
      )
    );
  }, [brokers]);

  const exness = sortedBrokers.find(
    (broker) =>
      broker.broker_name
        .toLowerCase()
        .includes("exness")
  );

  const xm = sortedBrokers.find(
    (broker) =>
      broker.broker_name
        .trim()
        .toLowerCase() === "xm"
  );

  const defaultFirstId =
    exness?.broker_id ??
    sortedBrokers[0]?.broker_id ??
    0;

  const defaultSecondId =
    xm?.broker_id ??
    sortedBrokers.find(
      (broker) =>
        broker.broker_id !==
        defaultFirstId
    )?.broker_id ??
    0;

  const [firstId, setFirstId] =
    useState<number>(defaultFirstId);

  const [secondId, setSecondId] =
    useState<number>(defaultSecondId);

  const [
    activeCategory,
    setActiveCategory,
  ] =
    useState<CategoryKey>("standard");

  const firstBroker =
    sortedBrokers.find(
      (broker) =>
        broker.broker_id === firstId
    ) ?? null;

  const secondBroker =
    sortedBrokers.find(
      (broker) =>
        broker.broker_id === secondId
    ) ?? null;

  const categories: CompareCategory[] = [
    {
      key: "standard",
      label: "Standard Account",
      shortLabel: "Standard",
      firstAccount:
        firstBroker?.best_standard,
      secondAccount:
        secondBroker?.best_standard,
    },
    {
      key: "raw",
      label: "Raw Spread Account",
      shortLabel: "Raw Spread",
      firstAccount:
        firstBroker?.best_raw,
      secondAccount:
        secondBroker?.best_raw,
    },
    {
      key: "ecn",
      label: "ECN Account",
      shortLabel: "ECN",
      firstAccount:
        firstBroker?.best_ecn,
      secondAccount:
        secondBroker?.best_ecn,
    },
    {
      key: "cent",
      label: "Cent / Micro Account",
      shortLabel: "Cent / Micro",
      firstAccount:
        firstBroker?.best_cent,
      secondAccount:
        secondBroker?.best_cent,
    },
  ];

  const availableCategories =
    categories.filter(
      (category) =>
        Boolean(
          category.firstAccount
        ) ||
        Boolean(
          category.secondAccount
        )
    );

  const selectedCategory =
    availableCategories.find(
      (category) =>
        category.key ===
        activeCategory
    ) ??
    availableCategories[0] ??
    null;

  const winnerId = selectedCategory
    ? getWinnerId(
        selectedCategory.firstAccount,
        selectedCategory.secondAccount
      )
    : null;

  const firstWins =
    winnerId ===
    firstBroker?.broker_id;

  const secondWins =
    winnerId ===
    secondBroker?.broker_id;

  const winnerBroker = firstWins
    ? firstBroker
    : secondWins
      ? secondBroker
      : null;

  const firstSpread = toFiniteNumber(
    selectedCategory?.firstAccount
      ?.spread_avg
  );

  const secondSpread = toFiniteNumber(
    selectedCategory?.secondAccount
      ?.spread_avg
  );

  const maxSpread = Math.max(
    firstSpread ?? 0,
    secondSpread ?? 0,
    0.01
  );

  const spreadDifference =
    firstSpread !== null &&
    secondSpread !== null
      ? Math.abs(
          firstSpread - secondSpread
        )
      : null;

  if (sortedBrokers.length < 2) {
    return (
      <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-7 text-center">
        <p className="text-sm font-extrabold text-amber-900">
          There are not enough brokers
          available to run this
          comparison.
        </p>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:rounded-[30px]"
    >
      {/* Header */}
      <header className="relative overflow-hidden border-b border-brand-100 bg-[linear-gradient(225deg,#EEF5FD_0%,#ffffff_68%)] px-3.5 py-4 sm:px-7 sm:py-7 lg:px-8">
        <div className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,#2B6FD0,#1E5BB8)] sm:w-1.5" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[9px] font-black text-brand-600 shadow-sm sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 sm:h-2 sm:w-2" />
            Interactive comparison tool
          </span>

          <h2 className="mt-2.5 text-[22px] font-black leading-[1.3] text-slate-950 sm:mt-3 sm:text-3xl lg:text-[36px]">
            Compare Spreads Between Two
            Brokers
          </h2>

          <p className="mt-1.5 max-w-[760px] text-xs font-medium leading-5 text-slate-600 sm:mt-2 sm:text-base sm:leading-7">
            Select two brokers and an
            account type to compare
            average spreads and
            commissions instantly.
          </p>
        </div>
      </header>

      {firstBroker && secondBroker ? (
        <>
          {/* Broker selectors */}
          <div className="bg-[#f8fafe] p-2.5 sm:p-5 lg:p-6">
            <div className="grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_46px_minmax(0,1fr)] sm:gap-4">
              <BrokerSelectionColumn
                label="First Broker"
                selectId="spread-tool-first-broker"
                value={firstId}
                excludedId={secondId}
                brokers={sortedBrokers}
                broker={firstBroker}
                onChange={setFirstId}
              />

              <div className="flex items-center justify-center py-0.5 sm:py-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-[8px] font-black text-white shadow-[0_5px_14px_rgba(30,91,184,0.22)] sm:h-11 sm:w-11 sm:text-[10px]">
                  VS
                </span>
              </div>

              <BrokerSelectionColumn
                label="Second Broker"
                selectId="spread-tool-second-broker"
                value={secondId}
                excludedId={firstId}
                brokers={sortedBrokers}
                broker={secondBroker}
                onChange={setSecondId}
              />
            </div>
          </div>

          {/* Account type tabs */}
          <div className="border-y border-slate-200 bg-white px-3 py-2.5 sm:px-6 sm:py-3">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
              {availableCategories.map(
                (category) => {
                  const isActive =
                    category.key ===
                    selectedCategory?.key;

                  return (
                    <button
                      key={category.key}
                      type="button"
                      aria-pressed={
                        isActive
                      }
                      onClick={() =>
                        setActiveCategory(
                          category.key
                        )
                      }
                      className={`min-h-9 w-full rounded-xl border px-2 text-[10px] font-black transition sm:min-h-11 sm:w-auto sm:rounded-full sm:px-6 sm:text-xs ${
                        isActive
                          ? "border-brand-500 bg-brand-500 text-white shadow-[0_5px_14px_rgba(30,91,184,0.18)]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600"
                      }`}
                    >
                      {
                        category.shortLabel
                      }
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {selectedCategory ? (
            <div className="p-2.5 sm:p-5 lg:p-6">
              <section className="overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8fafe] sm:rounded-[26px]">
                {/* Result */}
                <div className="flex flex-col gap-2.5 border-b border-slate-200 bg-white px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-5">
                  <div>
                    <div className="text-[9px] font-black text-brand-600 sm:text-xs">
                      {
                        selectedCategory.label
                      }{" "}
                      result
                    </div>

                    <h3 className="mt-1 text-base font-black text-slate-950 sm:text-2xl">
                      {winnerBroker
                        ? `${winnerBroker.broker_name} offers the lower cost`
                        : "No clear cost difference between the two brokers"}
                    </h3>
                  </div>

                  {spreadDifference !==
                  null ? (
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1.5 sm:gap-2 sm:px-3 sm:py-2">
                      <span className="text-[9px] font-bold text-slate-500 sm:text-[10px]">
                        Spread difference
                      </span>

                      <span className="text-xs font-black text-brand-600 sm:text-sm">
                        {formatNumber(
                          spreadDifference
                        )}{" "}
                        pips
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Scale explanation */}
                <div className="border-b border-brand-100 bg-brand-50 px-3.5 py-2.5 sm:px-5 sm:py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black text-brand-600 sm:text-sm">
                      Average spread scale
                    </span>

                    <span className="rounded-full bg-white px-2 py-1 text-[8px] font-black text-brand-600 ring-1 ring-brand-100 sm:px-3 sm:py-1.5 sm:text-[10px]">
                      Shorter means a lower
                      spread
                    </span>
                  </div>
                </div>

                {/* Spread lanes */}
                <div className="space-y-2.5 p-2.5 sm:space-y-3 sm:p-5">
                  <SpreadLane
                    broker={firstBroker}
                    account={
                      selectedCategory.firstAccount
                    }
                    winner={firstWins}
                    maxSpread={maxSpread}
                  />

                  <SpreadLane
                    broker={secondBroker}
                    account={
                      selectedCategory.secondAccount
                    }
                    winner={secondWins}
                    maxSpread={maxSpread}
                  />
                </div>

                <div className="border-t border-slate-200 bg-white px-3 py-2.5 text-center text-[9px] font-bold leading-4 text-slate-500 sm:px-6 sm:py-3 sm:text-xs sm:leading-5">
                  The final result considers
                  the recorded average
                  spread and commission for
                  each account.
                </div>
              </section>
            </div>
          ) : (
            <div className="p-3 sm:p-6">
              <div className="rounded-[18px] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-xs font-black text-slate-500 sm:rounded-[20px] sm:px-5 sm:py-8 sm:text-sm">
                No comparable account types
                are available for these two
                brokers.
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}