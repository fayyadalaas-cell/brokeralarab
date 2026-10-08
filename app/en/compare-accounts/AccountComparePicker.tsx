
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  account_name_ar: string | null;
  sort_order: number | null;
  account_type: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
};

type Props = {
  brokers: Broker[];
  accounts: BrokerAccount[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export default function AccountComparePicker({
  brokers,
  accounts,
}: Props) {
  const router = useRouter();

  const [brokerA, setBrokerA] = useState("");
  const [brokerB, setBrokerB] = useState("");
  const [accountA, setAccountA] = useState("");
  const [accountB, setAccountB] = useState("");

  const accountsA = useMemo(
    () =>
      accounts
        .filter((a) => a.broker_id === Number(brokerA))
        .sort(
          (a, b) =>
            (a.sort_order ?? 999) - (b.sort_order ?? 999)
        ),
    [accounts, brokerA]
  );

  const accountsB = useMemo(
    () =>
      accounts
        .filter((a) => a.broker_id === Number(brokerB))
        .sort(
          (a, b) =>
            (a.sort_order ?? 999) - (b.sort_order ?? 999)
        ),
    [accounts, brokerB]
  );

  const selectedBrokerA = brokers.find(
    (b) => b.id === Number(brokerA)
  );
  const selectedBrokerB = brokers.find(
    (b) => b.id === Number(brokerB)
  );

  const selectedAccountA = accountsA.find(
    (a) => a.id === Number(accountA)
  );
  const selectedAccountB = accountsB.find(
    (a) => a.id === Number(accountB)
  );

  const sameAccount = Boolean(
    accountA && accountB && accountA === accountB
  );

  const canCompare = Boolean(
    selectedBrokerA?.slug &&
      selectedBrokerB?.slug &&
      selectedAccountA?.account_name &&
      selectedAccountB?.account_name &&
      !sameAccount
  );

  function handleCompare() {
    if (
      !canCompare ||
      !selectedBrokerA?.slug ||
      !selectedBrokerB?.slug ||
      !selectedAccountA?.account_name ||
      !selectedAccountB?.account_name
    ) {
      return;
    }

    const first = `${selectedBrokerA.slug}-${slugify(
      selectedAccountA.account_name
    )}`;

    const second = `${selectedBrokerB.slug}-${slugify(
      selectedAccountB.account_name
    )}`;

    const [left, right] = [first, second].sort((a, b) =>
      a < b ? -1 : a > b ? 1 : 0
    );

    router.push(
      `/en/compare-accounts/${left}-vs-${right}`
    );
  }

  const selectClass =
    "mt-2.5 h-[56px] w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 text-[15px] font-extrabold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 sm:text-[16px]";

  const mobileSelectClass =
    "h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-bold text-slate-900 outline-none focus:border-[#2B6FD0] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-400";

  function BrokerSelect({
    side,
    compact = false,
  }: {
    side: "a" | "b";
    compact?: boolean;
  }) {
    const first = side === "a";

    return (
      <select
        id={`${compact ? "mobile" : "desktop"}-broker-${side}`}
        aria-label={`Broker for ${first ? "first" : "second"} account`}
        value={first ? brokerA : brokerB}
        onChange={(event) => {
          if (first) {
            setBrokerA(event.target.value);
            setAccountA("");
          } else {
            setBrokerB(event.target.value);
            setAccountB("");
          }
        }}
        className={compact ? mobileSelectClass : selectClass}
      >
        <option value="">Select a Broker</option>
        {brokers.map((broker) => (
          <option key={broker.id} value={broker.id}>
            {broker.name}
          </option>
        ))}
      </select>
    );
  }

  function AccountSelect({
    side,
    compact = false,
  }: {
    side: "a" | "b";
    compact?: boolean;
  }) {
    const first = side === "a";
    const brokerValue = first ? brokerA : brokerB;
    const available = first ? accountsA : accountsB;

    return (
      <select
        id={`${compact ? "mobile" : "desktop"}-account-${side}`}
        aria-label={`Account type for ${first ? "first" : "second"} account`}
        value={first ? accountA : accountB}
        disabled={!brokerValue || !available.length}
        onChange={(event) =>
          first
            ? setAccountA(event.target.value)
            : setAccountB(event.target.value)
        }
        className={compact ? mobileSelectClass : selectClass}
      >
        <option value="">
          {!brokerValue
            ? "Select a broker first"
            : available.length
              ? "Select Account Type"
              : "No Accounts Available"}
        </option>

        {available.map((account) => (
          <option key={account.id} value={account.id}>
            {account.account_name}
          </option>
        ))}
      </select>
    );
  }

  function DesktopSide({
    side,
  }: {
    side: "a" | "b";
  }) {
    const first = side === "a";
    const selectedBroker = first
      ? selectedBrokerA
      : selectedBrokerB;
    const selectedAccount = first
      ? selectedAccountA
      : selectedAccountB;
    const available = first ? accountsA : accountsB;

    return (
      <div className="min-w-0 rounded-[22px] border border-slate-200 bg-[#f7faff] p-4 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1E5BB8] text-[17px] font-black text-white">
            {first ? "1" : "2"}
          </span>
          <h3 className="text-[18px] font-black text-slate-950 sm:text-[20px]">
            {first ? "First Account" : "Second Account"}
          </h3>
        </div>

        <div>
          <label
            htmlFor={`desktop-broker-${side}`}
            className="text-[14px] font-extrabold text-slate-800 sm:text-[15px]"
          >
            Forex Broker
          </label>
          <BrokerSelect side={side} />
        </div>

        <div className="mt-5">
          <label
            htmlFor={`desktop-account-${side}`}
            className="text-[14px] font-extrabold text-slate-800 sm:text-[15px]"
          >
            Trading Account Type
          </label>
          <AccountSelect side={side} />
        </div>

        {selectedBroker && (
          <div className="mt-5 flex min-h-[100px] items-center gap-4 rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-[75px] w-[105px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 sm:h-[85px] sm:w-[125px]">
              {selectedBroker.logo ? (
                <img
                  src={selectedBroker.logo}
                  alt={`${selectedBroker.name} logo`}
                  className="h-full w-full scale-[1.35] object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-base font-black text-[#1E5BB8]">
                  {selectedBroker.name}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="break-words text-[17px] font-black text-slate-950 sm:text-[19px]">
                {selectedBroker.name}
              </div>
              <div className="mt-2 text-[14px] font-bold text-[#1E5BB8]">
                {selectedAccount
                  ? selectedAccount.account_name
                  : `${available.length} Available Accounts`}
              </div>
            </div>
          </div>
        )}

        {selectedAccount && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="text-[13px] font-bold text-slate-500">
                Advertised Spread
              </div>
              <div className="mt-2 break-words text-[17px] font-black text-slate-950">
                {selectedAccount.spread || "Not Specified"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="text-[13px] font-bold text-slate-500">
                Advertised Commission
              </div>
              <div className="mt-2 break-words text-[17px] font-black text-slate-950">
                {selectedAccount.commission || "Not Specified"}
              </div>
            </div>

            <div className="col-span-2 rounded-2xl border border-slate-100 bg-white p-4">
              <div className="text-[13px] font-bold text-slate-500">
                Minimum Deposit
              </div>
              <div className="mt-2 break-words text-[17px] font-black text-slate-950">
                {selectedAccount.min_deposit || "Not Specified"}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function MobileSide({
    side,
  }: {
    side: "a" | "b";
  }) {
    const first = side === "a";
    const selectedBroker = first
      ? selectedBrokerA
      : selectedBrokerB;
    const selectedAccount = first
      ? selectedAccountA
      : selectedAccountB;

    return (
      <div className="rounded-2xl border border-slate-200 bg-[#f7faff] p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E5BB8] text-xs font-black text-white">
              {first ? "1" : "2"}
            </span>
            <h3 className="text-[13px] font-black text-slate-950">
              {first ? "First Account" : "Second Account"}
            </h3>
          </div>

          {selectedAccount && (
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
              ✓ Selected
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <label
              htmlFor={`mobile-broker-${side}`}
              className="mb-1.5 block text-[11px] font-bold text-slate-600"
            >
              Forex Broker
            </label>
            <BrokerSelect side={side} compact />
          </div>

          <div>
            <label
              htmlFor={`mobile-account-${side}`}
              className="mb-1.5 block text-[11px] font-bold text-slate-600"
            >
              Account Type
            </label>
            <AccountSelect side={side} compact />
          </div>
        </div>

        {selectedBroker && selectedAccount && (
          <div className="mt-3 flex min-w-0 items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2">
            {selectedBroker.logo && (
              <div className="flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                <img
                  src={selectedBroker.logo}
                  alt={`${selectedBroker.name} logo`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-black text-slate-900">
                {selectedBroker.name}
              </div>
              <div className="truncate text-[11px] font-bold text-[#1E5BB8]">
                {selectedAccount.account_name}
              </div>
            </div>

            <span className="shrink-0 text-emerald-600">
              ✓
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div dir="ltr" lang="en" className="text-left">
      {/* Mobile */}
      <div className="sm:hidden">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-[17px] font-black text-slate-950">
              Select Two Accounts
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              Choose a broker and account type for each side
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-[#1E5BB8]">
            Live Comparison
          </span>
        </div>

        <div className="space-y-3">
          <MobileSide side="a" />
          <MobileSide side="b" />
        </div>

        {sameAccount && (
          <p
            role="alert"
            className="mt-3 text-center text-xs font-bold text-amber-700"
          >
            Please select two different trading accounts.
          </p>
        )}

        <button
          type="button"
          disabled={!canCompare}
          onClick={handleCompare}
          className={`mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-black transition ${
            canCompare
              ? "bg-[#1E5BB8] text-white shadow-[0_8px_20px_rgba(30,91,184,0.2)] hover:bg-[#184A97]"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          Compare Accounts Now
          <span aria-hidden="true">→</span>
        </button>

        <p className="mt-3 text-center text-[10px] leading-5 text-slate-500">
          Information is for comparison purposes only.
          Verify the broker's official trading conditions.
        </p>
      </div>

      {/* Desktop and tablet */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DesktopSide side="a" />
          <DesktopSide side="b" />
        </div>

        {sameAccount && (
          <p
            role="alert"
            className="mt-4 text-center text-sm font-bold text-amber-700"
          >
            Please select two different trading accounts.
          </p>
        )}

        <button
          type="button"
          disabled={!canCompare}
          onClick={handleCompare}
          className={`mt-5 flex min-h-[60px] w-full items-center justify-center gap-3 rounded-2xl px-5 text-[16px] font-black transition ${
            canCompare
              ? "bg-gradient-to-r from-[#2B6FD0] to-[#1E5BB8] text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] hover:from-[#1E5BB8] hover:to-[#184A97]"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          Compare Accounts Now
          <span aria-hidden="true">→</span>
        </button>

        <p className="mt-4 text-center text-[12px] leading-7 text-slate-500 sm:text-[13px]">
          Broker Alarab displays available account information
          for comparison. Always verify the latest terms with
          the broker before making a trading decision.
        </p>
      </div>
    </div>
  );
}
