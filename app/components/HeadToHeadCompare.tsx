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

function formatValue(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return "غير متوفر";
  return String(value);
}

function getPairWinner(
  a: PreparedAccount | null | undefined,
  b: PreparedAccount | null | undefined
) {
  if (!a && !b) return "غير متوفر";
  if (a && !b) return a.broker_name;
  if (!a && b) return b.broker_name;
  if (!a || !b) return "غير متوفر";

  const aCost = Number(a.total_cost_score ?? 9999);
  const bCost = Number(b.total_cost_score ?? 9999);

  if (aCost !== bCost) return aCost < bCost ? a.broker_name : b.broker_name;

  const aSpread = Number(a.spread_avg ?? 9999);
  const bSpread = Number(b.spread_avg ?? 9999);

  return aSpread <= bSpread ? a.broker_name : b.broker_name;
}

function CompactLogo({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  if (!src) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[10px] font-black text-slate-500">
        LOGO
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function ValuePill({
  value,
  tone = "blue",
}: {
  value: string;
  tone?: "blue" | "green" | "gray";
}) {
  const classes =
    tone === "green"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "gray"
      ? "bg-slate-100 text-slate-500"
      : "bg-blue-50 text-blue-700";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${classes}`}>
      {value}
    </span>
  );
}

function BrokerButtons({
  reviewHref,
  accountHref,
}: {
  reviewHref: string | null;
  accountHref: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {reviewHref ? (
        <Link
          href={reviewHref}
          className={`inline-flex min-w-[110px] items-center justify-center rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${
            accountHref
              ? "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              : "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
          }`}
        >
          التقييم
        </Link>
      ) : null}

      {accountHref ? (
        <a
          href={accountHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-[118px] items-center justify-center rounded-xl bg-[#2563eb] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#1d4ed8]"
        >
          فتح حساب
        </a>
      ) : null}
    </div>
  );
}

function CompareRow({
  label,
  leftValue,
  rightValue,
  winner,
}: {
  label: string;
  leftValue: string;
  rightValue: string;
  winner: string;
}) {
  const leftTone = leftValue === "غير متوفر" ? "gray" : "blue";
  const rightTone = rightValue === "غير متوفر" ? "gray" : "blue";
  const winnerTone = winner === "غير متوفر" ? "gray" : "green";

  return (
    <div className="grid items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1fr_160px_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
        <div className="text-[11px] font-bold text-slate-500">
  متوسط السبريد - حساب {label}
</div>
        <div className="mt-2">
          <ValuePill value={leftValue} tone={leftTone} />
        </div>
      </div>

      <div className="text-center">
        <div className="text-sm font-black text-slate-900">{label}</div>
        <div className="mt-2">
          <ValuePill value={winner} tone={winnerTone} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
        <div className="text-[11px] font-bold text-slate-500">
  متوسط السبريد - حساب {label}
</div>
        <div className="mt-2">
          <ValuePill value={rightValue} tone={rightTone} />
        </div>
      </div>
    </div>
  );
}

export default function HeadToHeadCompare({
  brokers,
}: {
  brokers: BrokerSummary[];
}) {
  const sortedBrokers = useMemo(() => {
    return [...brokers].sort((a, b) =>
      String(a.broker_name).localeCompare(String(b.broker_name))
    );
  }, [brokers]);

  const exness = sortedBrokers.find(
    (b) => b.broker_name.toLowerCase() === "exness"
  );
  const xm = sortedBrokers.find((b) => b.broker_name.toLowerCase() === "xm");

  const [leftId, setLeftId] = useState<number>(
    exness?.broker_id ?? sortedBrokers[0]?.broker_id ?? 0
  );
  const [rightId, setRightId] = useState<number>(
    xm?.broker_id ??
      sortedBrokers.find((b) => b.broker_id !== (exness?.broker_id ?? 0))
        ?.broker_id ??
      0
  );

  const left = sortedBrokers.find((b) => b.broker_id === leftId) ?? null;
  const right = sortedBrokers.find((b) => b.broker_id === rightId) ?? null;

  const rows = [
    {
      label: "Standard",
      leftValue: formatValue(left?.best_standard?.spread_avg),
      rightValue: formatValue(right?.best_standard?.spread_avg),
      winner: getPairWinner(left?.best_standard, right?.best_standard),
    },
    {
      label: "Raw",
      leftValue: formatValue(left?.best_raw?.spread_avg),
      rightValue: formatValue(right?.best_raw?.spread_avg),
      winner: getPairWinner(left?.best_raw, right?.best_raw),
    },
    {
      label: "ECN",
      leftValue: formatValue(left?.best_ecn?.spread_avg),
      rightValue: formatValue(right?.best_ecn?.spread_avg),
      winner: getPairWinner(left?.best_ecn, right?.best_ecn),
    },
    {
      label: "Cent / Micro",
      leftValue: formatValue(left?.best_cent?.spread_avg),
      rightValue: formatValue(right?.best_cent?.spread_avg),
      winner: getPairWinner(left?.best_cent, right?.best_cent),
    },
  ];

  return (
    <section id="head-to-head" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="text-right">
        <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
          مقارنة شركتين تداول من حيث السبريد
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600">
          اختر شركتين من الشركات الموجودة في قاعدة البيانات لمقارنة متوسط السبريد
          في أهم أنواع الحسابات بشكل مباشر وواضح.
        </p>
      </div>

      <div className="mt-6 rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:p-6">
        {/* Selectors */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="text-right">
            <label className="mb-2 block text-sm font-extrabold text-slate-700">
              الشركة الأولى
            </label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(Number(e.target.value))}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-300"
            >
              {sortedBrokers
                .filter((broker) => broker.broker_id !== rightId)
                .map((broker) => (
                  <option key={broker.broker_id} value={broker.broker_id}>
                    {broker.broker_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="text-right">
            <label className="mb-2 block text-sm font-extrabold text-slate-700">
              الشركة الثانية
            </label>
            <select
              value={rightId}
              onChange={(e) => setRightId(Number(e.target.value))}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-300"
            >
              {sortedBrokers
                .filter((broker) => broker.broker_id !== leftId)
                .map((broker) => (
                  <option key={broker.broker_id} value={broker.broker_id}>
                    {broker.broker_name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {left && right ? (
          <>
            {/* Desktop split compare */}
            <div className="mt-6 hidden overflow-hidden rounded-[26px] border border-slate-200 md:block">
              <div className="grid grid-cols-[1fr_200px_1fr] border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f8fafc_100%)]">
                <div className="p-5">
  <div className="flex items-center justify-between gap-3">
    <BrokerButtons
      reviewHref={
        left.broker_slug ? `/brokers/${left.broker_slug}` : null
      }
      accountHref={left.broker_account_url}
    />

    <div className="flex items-center gap-3">
      <div className="text-right">
        <div className="text-xl font-black text-slate-950">
          {left.broker_name}
        </div>
        <div className="mt-1 text-sm text-slate-500">
          التقييم: {left.broker_rating ?? "غير متوفر"}
        </div>
      </div>

      <CompactLogo src={left.broker_logo} alt={left.broker_name} />
    </div>
  </div>
</div>

                <div className="flex items-center justify-center border-x border-slate-200">
                  <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-extrabold text-blue-700">
                    مقارنة مباشرة
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <CompactLogo src={right.broker_logo} alt={right.broker_name} />
                      <div className="text-right">
                        <div className="text-xl font-black text-slate-950">{right.broker_name}</div>
                        <div className="mt-1 text-sm text-slate-500">
                          التقييم: {right.broker_rating ?? "غير متوفر"}
                        </div>
                      </div>
                    </div>
                    <BrokerButtons
                      reviewHref={right.broker_slug ? `/brokers/${right.broker_slug}` : null}
                      accountHref={right.broker_account_url}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4">
                {rows.map((row) => (
                  <CompareRow
                    key={row.label}
                    label={row.label}
                    leftValue={row.leftValue}
                    rightValue={row.rightValue}
                    winner={row.winner}
                  />
                ))}
              </div>
            </div>

            {/* Mobile stacked compare */}
            <div className="mt-5 space-y-4 md:hidden">
              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <CompactLogo src={left.broker_logo} alt={left.broker_name} />
                  <div className="min-w-0 flex-1 text-right">
                    <div className="truncate text-lg font-black text-slate-950">{left.broker_name}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      التقييم: {left.broker_rating ?? "غير متوفر"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {rows.map((row) => (
                    <div
                      key={`${row.label}-left`}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <span className="text-sm font-bold text-slate-600">{row.label}</span>
                      <ValuePill
                        value={row.leftValue}
                        tone={row.leftValue === "غير متوفر" ? "gray" : "blue"}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <BrokerButtons
                    reviewHref={left.broker_slug ? `/brokers/${left.broker_slug}` : null}
                    accountHref={left.broker_account_url}
                  />
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <CompactLogo src={right.broker_logo} alt={right.broker_name} />
                  <div className="min-w-0 flex-1 text-right">
                    <div className="truncate text-lg font-black text-slate-950">{right.broker_name}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      التقييم: {right.broker_rating ?? "غير متوفر"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {rows.map((row) => (
                    <div
                      key={`${row.label}-right`}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <span className="text-sm font-bold text-slate-600">{row.label}</span>
                      <ValuePill
                        value={row.rightValue}
                        tone={row.rightValue === "غير متوفر" ? "gray" : "blue"}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <BrokerButtons
                    reviewHref={right.broker_slug ? `/brokers/${right.broker_slug}` : null}
                    accountHref={right.broker_account_url}
                  />
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="mb-3 text-right text-sm font-black text-slate-900">
                  الفائز في كل فئة
                </div>

                <div className="space-y-2">
                  {rows.map((row) => (
                    <div
                      key={`${row.label}-winner`}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                    >
                      <span className="text-sm font-bold text-slate-600">{row.label}</span>
                      <ValuePill
                        value={row.winner}
                        tone={row.winner === "غير متوفر" ? "gray" : "green"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}