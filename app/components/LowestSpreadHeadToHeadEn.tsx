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

type CompareItem = {
  key: string;
  label: string;
  shortLabel: string;
  leftAccount: PreparedAccount | null | undefined;
  rightAccount: PreparedAccount | null | undefined;
  leftValue: string;
  rightValue: string;
  winnerId: number | null;
};

function formatValue(
  value: number | string | null | undefined
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not available";
  }

  const numericValue = Number(value);

  if (Number.isFinite(numericValue)) {
    return numericValue
      .toFixed(2)
      .replace(/\.?0+$/, "");
  }

  return String(value);
}

function formatRating(
  value: number | string | null | undefined
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "N/A";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return String(value);
  }

  return numericValue.toFixed(1);
}

function getWinnerId(
  leftAccount: PreparedAccount | null | undefined,
  rightAccount: PreparedAccount | null | undefined
) {
  if (!leftAccount && !rightAccount) return null;

  if (leftAccount && !rightAccount) {
    return leftAccount.broker_id;
  }

  if (!leftAccount && rightAccount) {
    return rightAccount.broker_id;
  }

  if (!leftAccount || !rightAccount) return null;

  const leftCost = Number(
    leftAccount.total_cost_score ?? 9999
  );

  const rightCost = Number(
    rightAccount.total_cost_score ?? 9999
  );

  if (leftCost !== rightCost) {
    return leftCost < rightCost
      ? leftAccount.broker_id
      : rightAccount.broker_id;
  }

  const leftSpread = Number(
    leftAccount.spread_avg ?? 9999
  );

  const rightSpread = Number(
    rightAccount.spread_avg ?? 9999
  );

  if (leftSpread !== rightSpread) {
    return leftSpread < rightSpread
      ? leftAccount.broker_id
      : rightAccount.broker_id;
  }

  return null;
}

function CompactLogo({
  src,
  alt,
  size = "normal",
}: {
  src: string | null;
  alt: string;
  size?: "small" | "normal";
}) {
  const sizeClasses =
    size === "small"
      ? "h-9 w-9 rounded-xl"
      : "h-12 w-12 rounded-2xl";

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white p-1.5 ${sizeClasses}`}
    >
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

function BrokerActionButtons({
  broker,
  compact = false,
  mobileSummary = false,
}: {
  broker: BrokerSummary;
  compact?: boolean;
  mobileSummary?: boolean;
}) {
  const reviewHref = broker.broker_slug
    ? `/en/brokers/${broker.broker_slug}`
    : null;

  const accountHref =
    broker.broker_account_url ||
    broker.best_overall?.broker_account_url ||
    broker.broker_website_url ||
    null;

  if (!reviewHref && !accountHref) return null;

  if (mobileSummary) {
    const primaryHref = accountHref || reviewHref;
    const isExternal = Boolean(accountHref);

    if (!primaryHref) return null;

    return isExternal ? (
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-9 w-full items-center justify-center rounded-xl bg-brand-500 px-2 text-[9px] font-black text-white transition hover:bg-brand-600"
      >
        Open Account
      </a>
    ) : (
      <Link
        href={primaryHref}
        className="inline-flex min-h-9 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-2 text-[9px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
      >
        Read Review
      </Link>
    );
  }

  return (
    <div
      className={`grid w-full gap-2 ${
        reviewHref && accountHref
          ? "grid-cols-2"
          : "grid-cols-1"
      }`}
    >
      {reviewHref ? (
        <Link
          href={reviewHref}
          className={`inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white font-black text-slate-800 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 ${
            compact
              ? "min-h-9 px-1.5 text-[9px]"
              : "min-h-11 px-4 text-xs"
          }`}
        >
          Read Review
        </Link>
      ) : null}

      {accountHref ? (
        <a
          href={accountHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-xl bg-brand-500 font-black text-white shadow-[0_4px_12px_rgba(30,91,184,0.16)] transition hover:bg-brand-600 ${
            compact
              ? "min-h-9 px-1.5 text-[9px]"
              : "min-h-11 px-4 text-xs"
          }`}
        >
          Open Account
        </a>
      ) : null}
    </div>
  );
}

function BrokerHeader({
  broker,
}: {
  broker: BrokerSummary;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-4">
        <CompactLogo
          src={broker.broker_logo}
          alt={broker.broker_name}
        />

        <div className="min-w-0 flex-1 text-left">
          <div className="truncate text-xl font-black text-slate-950">
            {broker.broker_name}
          </div>

          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700">
            <span>★</span>

            <span>
              {formatRating(broker.broker_rating)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <BrokerActionButtons broker={broker} />
      </div>
    </div>
  );
}

function AccountValue({
  value,
  available,
  winner,
}: {
  value: string;
  available: boolean;
  winner: boolean;
}) {
  if (!available) {
    return (
      <span className="inline-flex min-h-8 items-center justify-center rounded-lg bg-slate-100 px-2.5 text-[10px] font-black text-slate-500">
        Not available
      </span>
    );
  }

  return (
    <span
      className={`inline-flex min-h-9 min-w-[58px] items-center justify-center rounded-xl border px-3 text-[15px] font-black ${
        winner
          ? "border-brand-300 bg-brand-100 text-brand-700"
          : "border-slate-200 bg-white text-slate-800"
      }`}
    >
      {value}
    </span>
  );
}

function MobileAccountValue({
  value,
  available,
  winner,
}: {
  value: string;
  available: boolean;
  winner: boolean;
}) {
  if (!available) {
    return (
      <span className="inline-flex min-h-9 items-center justify-center rounded-xl bg-slate-100 px-3 text-[9px] font-black text-slate-500">
        N/A
      </span>
    );
  }

  return (
    <span
      className={`inline-flex min-h-9 min-w-[60px] items-center justify-center rounded-xl border px-3 text-[15px] font-black ${
        winner
          ? "border-brand-300 bg-brand-100 text-brand-700"
          : "border-slate-200 bg-white text-slate-800"
      }`}
    >
      {value}
    </span>
  );
}

function DesktopCompareRow({
  item,
  leftBroker,
  rightBroker,
}: {
  item: CompareItem;
  leftBroker: BrokerSummary;
  rightBroker: BrokerSummary;
}) {
  const leftWins =
    item.winnerId === leftBroker.broker_id;

  const rightWins =
    item.winnerId === rightBroker.broker_id;

  const winnerName = leftWins
    ? leftBroker.broker_name
    : rightWins
    ? rightBroker.broker_name
    : null;

  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-300 bg-white">
      <div className="grid grid-cols-[minmax(0,1fr)_230px_minmax(0,1fr)]">
        {/* LEFT BROKER */}
        <div
          className={`flex min-h-[112px] items-center justify-center px-6 py-5 ${
            leftWins
              ? "bg-brand-50"
              : "bg-white"
          }`}
        >
          <div className="text-center">
            <div className="text-sm font-black text-slate-700">
              {leftBroker.broker_name}
            </div>

            <div className="mt-3">
              <AccountValue
                value={item.leftValue}
                available={Boolean(
                  item.leftAccount
                )}
                winner={leftWins}
              />
            </div>

            <div className="mt-2 min-h-5 text-xs font-extrabold text-slate-600">
              {item.leftAccount?.account_name ||
                "Account not available"}
            </div>
          </div>
        </div>

        {/* ACCOUNT TYPE */}
        <div className="flex min-h-[112px] flex-col items-center justify-center border-x border-slate-300 bg-slate-100 px-4 py-4 text-center">
          <span className="rounded-full bg-brand-500 px-3 py-1 text-[10px] font-black text-white">
            {item.shortLabel}
          </span>

          <div className="mt-2 text-base font-black text-slate-950">
            {item.label}
          </div>

          <div className="mt-1 text-[11px] font-bold text-slate-500">
            Average spread
          </div>

          {winnerName ? (
            <div className="mt-2 rounded-full border border-brand-200 bg-brand-100 px-3 py-1 text-[10px] font-black text-brand-700">
              Lower cost: {winnerName}
            </div>
          ) : (
            <div className="mt-2 rounded-full bg-slate-200 px-3 py-1 text-[10px] font-black text-slate-600">
              No clear difference
            </div>
          )}
        </div>

        {/* RIGHT BROKER */}
        <div
          className={`flex min-h-[112px] items-center justify-center px-6 py-5 ${
            rightWins
              ? "bg-brand-50"
              : "bg-white"
          }`}
        >
          <div className="text-center">
            <div className="text-sm font-black text-slate-700">
              {rightBroker.broker_name}
            </div>

            <div className="mt-3">
              <AccountValue
                value={item.rightValue}
                available={Boolean(
                  item.rightAccount
                )}
                winner={rightWins}
              />
            </div>

            <div className="mt-2 min-h-5 text-xs font-extrabold text-slate-600">
              {item.rightAccount?.account_name ||
                "Account not available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileCompareRow({
  item,
  leftBroker,
  rightBroker,
}: {
  item: CompareItem;
  leftBroker: BrokerSummary;
  rightBroker: BrokerSummary;
}) {
  const leftAvailable = Boolean(
    item.leftAccount
  );

  const rightAvailable = Boolean(
    item.rightAccount
  );

  const leftWins =
    item.winnerId === leftBroker.broker_id;

  const rightWins =
    item.winnerId === rightBroker.broker_id;

  const winnerName = leftWins
    ? leftBroker.broker_name
    : rightWins
    ? rightBroker.broker_name
    : null;

  return (
    <article className="overflow-hidden rounded-[17px] border border-slate-200 bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2.5">
        <div className="min-w-0">
          <h3 className="text-[12px] font-black text-slate-950">
            {item.label}
          </h3>
        </div>

        <span className="shrink-0 rounded-full bg-brand-500 px-2.5 py-1 text-[8px] font-black text-white">
          {item.shortLabel}
        </span>
      </header>

      <div
        className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-200 px-3 py-2.5 ${
          leftWins
            ? "bg-brand-50"
            : "bg-white"
        }`}
      >
        <div className="min-w-0">
          <div
            className={`truncate text-[11px] font-black ${
              leftWins
                ? "text-brand-700"
                : "text-slate-900"
            }`}
          >
            {leftBroker.broker_name}
          </div>

          <div className="mt-0.5 truncate text-[8px] font-bold text-slate-500">
            {item.leftAccount?.account_name ||
              "Account not available"}
          </div>
        </div>

        <MobileAccountValue
          value={item.leftValue}
          available={leftAvailable}
          winner={leftWins}
        />
      </div>

      <div
        className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 ${
          rightWins
            ? "bg-brand-50"
            : "bg-white"
        }`}
      >
        <div className="min-w-0">
          <div
            className={`truncate text-[11px] font-black ${
              rightWins
                ? "text-brand-700"
                : "text-slate-900"
            }`}
          >
            {rightBroker.broker_name}
          </div>

          <div className="mt-0.5 truncate text-[8px] font-bold text-slate-500">
            {item.rightAccount?.account_name ||
              "Account not available"}
          </div>
        </div>

        <MobileAccountValue
          value={item.rightValue}
          available={rightAvailable}
          winner={rightWins}
        />
      </div>

      <footer
        className={`border-t px-3 py-2 ${
          winnerName
            ? "border-brand-200 bg-brand-50"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        {winnerName ? (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[8px] font-bold text-brand-600">
              Lower estimated cost
            </span>

            <span className="truncate text-[9px] font-black text-brand-700">
              {winnerName}
            </span>
          </div>
        ) : (
          <div className="text-center text-[8px] font-black text-slate-500">
            No clear difference
          </div>
        )}
      </footer>
    </article>
  );
}

export default function LowestSpreadHeadToHeadEn({
  brokers,
}: {
  brokers: BrokerSummary[];
}) {
  const sortedBrokers = useMemo(() => {
    return [...brokers].sort((a, b) =>
      String(a.broker_name).localeCompare(
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

  const defaultLeftId =
    exness?.broker_id ??
    sortedBrokers[0]?.broker_id ??
    0;

  const defaultRightId =
    xm?.broker_id ??
    sortedBrokers.find(
      (broker) =>
        broker.broker_id !== defaultLeftId
    )?.broker_id ??
    0;

  const [leftId, setLeftId] =
    useState<number>(defaultLeftId);

  const [rightId, setRightId] =
    useState<number>(defaultRightId);

  const left =
    sortedBrokers.find(
      (broker) =>
        broker.broker_id === leftId
    ) ?? null;

  const right =
    sortedBrokers.find(
      (broker) =>
        broker.broker_id === rightId
    ) ?? null;

  const rows: CompareItem[] = [
    {
      key: "standard",
      label: "Standard Account",
      shortLabel: "Standard",
      leftAccount: left?.best_standard,
      rightAccount: right?.best_standard,
      leftValue: formatValue(
        left?.best_standard?.spread_avg
      ),
      rightValue: formatValue(
        right?.best_standard?.spread_avg
      ),
      winnerId: getWinnerId(
        left?.best_standard,
        right?.best_standard
      ),
    },
    {
      key: "raw",
      label: "Raw Spread Account",
      shortLabel: "Raw",
      leftAccount: left?.best_raw,
      rightAccount: right?.best_raw,
      leftValue: formatValue(
        left?.best_raw?.spread_avg
      ),
      rightValue: formatValue(
        right?.best_raw?.spread_avg
      ),
      winnerId: getWinnerId(
        left?.best_raw,
        right?.best_raw
      ),
    },
    {
      key: "ecn",
      label: "ECN Account",
      shortLabel: "ECN",
      leftAccount: left?.best_ecn,
      rightAccount: right?.best_ecn,
      leftValue: formatValue(
        left?.best_ecn?.spread_avg
      ),
      rightValue: formatValue(
        right?.best_ecn?.spread_avg
      ),
      winnerId: getWinnerId(
        left?.best_ecn,
        right?.best_ecn
      ),
    },
    {
      key: "cent",
      label: "Cent / Micro Account",
      shortLabel: "Cent",
      leftAccount: left?.best_cent,
      rightAccount: right?.best_cent,
      leftValue: formatValue(
        left?.best_cent?.spread_avg
      ),
      rightValue: formatValue(
        right?.best_cent?.spread_avg
      ),
      winnerId: getWinnerId(
        left?.best_cent,
        right?.best_cent
      ),
    },
  ];

  const visibleRows = rows.filter(
    (item) =>
      Boolean(item.leftAccount) ||
      Boolean(item.rightAccount)
  );

  if (sortedBrokers.length < 2) {
    return (
      <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-6 text-center">
        <p className="text-sm font-extrabold text-amber-900">
          There are not enough brokers available
          to run a comparison.
        </p>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.055)] sm:rounded-[30px]"
    >
      {/* SELECTORS */}
      <div className="border-b border-slate-200 bg-white p-3 sm:p-5 lg:p-6">
        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-4">
          <div>
            <label
              htmlFor="head-to-head-left-broker-en"
              className="mb-1.5 block text-[10px] font-black text-slate-700 sm:mb-2 sm:text-sm"
            >
              First Broker
            </label>

            <select
              id="head-to-head-left-broker-en"
              value={leftId}
              onChange={(event) =>
                setLeftId(
                  Number(event.target.value)
                )
              }
              className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-[13px] font-black text-slate-900 outline-none transition focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100 sm:h-12 sm:rounded-2xl sm:px-4 sm:text-sm"
            >
              {sortedBrokers
                .filter(
                  (broker) =>
                    broker.broker_id !== rightId
                )
                .map((broker) => (
                  <option
                    key={broker.broker_id}
                    value={broker.broker_id}
                  >
                    {broker.broker_name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="head-to-head-right-broker-en"
              className="mb-1.5 block text-[10px] font-black text-slate-700 sm:mb-2 sm:text-sm"
            >
              Second Broker
            </label>

            <select
              id="head-to-head-right-broker-en"
              value={rightId}
              onChange={(event) =>
                setRightId(
                  Number(event.target.value)
                )
              }
              className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-[13px] font-black text-slate-900 outline-none transition focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100 sm:h-12 sm:rounded-2xl sm:px-4 sm:text-sm"
            >
              {sortedBrokers
                .filter(
                  (broker) =>
                    broker.broker_id !== leftId
                )
                .map((broker) => (
                  <option
                    key={broker.broker_id}
                    value={broker.broker_id}
                  >
                    {broker.broker_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {left && right ? (
        <>
          {/* DESKTOP */}
          <div className="hidden p-5 md:block lg:p-6">
            <div className="overflow-hidden rounded-[24px] border border-slate-300 bg-white">
              {/* BROKERS HEADER */}
              <div className="grid grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)] items-stretch border-b border-slate-300 bg-slate-50">
                <div className="p-6">
                  <BrokerHeader broker={left} />
                </div>

                <div className="flex flex-col items-center justify-center border-x border-slate-300 bg-white px-4 text-center">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-xs font-black text-white shadow-[0_6px_16px_rgba(30,91,184,0.2)]">
                    VS
                  </span>

                  <div className="mt-2 text-xs font-black text-slate-600">
                    Side-by-side
                  </div>
                </div>

                <div className="p-6">
                  <BrokerHeader broker={right} />
                </div>
              </div>

              {/* COMPARISON ROWS */}
              <div className="space-y-4 bg-[#f8fafc] p-5">
                {visibleRows.map((item) => (
                  <DesktopCompareRow
                    key={item.key}
                    item={item}
                    leftBroker={left}
                    rightBroker={right}
                  />
                ))}
              </div>

              <div className="border-t border-slate-300 bg-white px-6 py-4 text-center">
                <p className="text-xs font-bold leading-6 text-slate-600">
                  The lower-cost result is determined
                  using the average spread and estimated
                  total cost of the available account at
                  each broker.
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            {/* RESULTS HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3.5 py-3.5">
              <div>
                <h3 className="text-[14px] font-black text-slate-950">
                  Comparison Results
                </h3>

                <p className="mt-0.5 text-[9px] font-bold text-slate-500">
                  Lower estimated cost by account type
                </p>
              </div>

              <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                {visibleRows.length}{" "}
                {visibleRows.length === 1
                  ? "Category"
                  : "Categories"}
              </span>
            </div>

            {/* ACCOUNT RESULTS */}
            <div className="space-y-2.5 bg-slate-50/60 p-3">
              {visibleRows.map((item) => (
                <MobileCompareRow
                  key={item.key}
                  item={item}
                  leftBroker={left}
                  rightBroker={right}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}