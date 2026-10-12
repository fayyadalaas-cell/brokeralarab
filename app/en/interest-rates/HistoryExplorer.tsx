
"use client";

import { useMemo, useState } from "react";

/* =====================================================
   TYPES
===================================================== */

export type HistoryPoint = {
  date: string;
  rate: number;
  previousRate: number | null;
  changeBps: number | null;
  type: string | null;
};

export type HistoryBank = {
  slug: string;
  name: string;
  officialUrl: string | null;
  history: HistoryPoint[];
};

type Props = {
  banks: HistoryBank[];
};

/* =====================================================
   FORMATTERS
===================================================== */

const formatRate = (
  value: number | null | undefined
) =>
  typeof value === "number" &&
  Number.isFinite(value)
    ? `${value.toFixed(2)}%`
    : "—";

const dateEn = (value: string) => {
  const date = new Date(
    `${value.slice(0, 10)}T12:00:00Z`
  );

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const changeLabel = (bps: number | null) => {
  if (bps == null) return "Not available";
  if (bps === 0) return "Unchanged";
  if (bps > 0) return `Raised ${bps} bps`;
  return `Cut ${Math.abs(bps)} bps`;
};

const changeClass = (bps: number | null) => {
  if (bps == null) return "text-slate-500";
  if (bps > 0) return "text-rose-700";
  if (bps < 0) return "text-emerald-700";
  return "text-blue-700";
};

const changeBadgeClass = (bps: number | null) => {
  if (bps == null) {
    return "bg-slate-100 text-slate-600 border-slate-200";
  }

  if (bps > 0) {
    return "bg-rose-50 text-rose-700 border-rose-200";
  }

  if (bps < 0) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  return "bg-blue-50 text-blue-700 border-blue-200";
};

/* =====================================================
   HISTORICAL INTEREST RATE CHART
   INTERACTIVE — SAME AS ARABIC VERSION
===================================================== */

function HistoryChart({
  history,
  name,
}: {
  history: HistoryPoint[];
  name: string;
}) {
  const [selectedPoint, setSelectedPoint] =
    useState<number | null>(null);

  const sorted = [...history].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  if (sorted.length < 2) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
        Not enough historical interest rate decisions
        are available to display a chart for this period.
      </div>
    );
  }

  const width = 1000;
  const height = 310;

  const left = 70;
  const right = 35;
  const top = 25;
  const bottom = 55;

  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const rates = sorted.map((h) => h.rate);

  const rawMin = Math.min(...rates);
  const rawMax = Math.max(...rates);

  const span = Math.max(rawMax - rawMin, 0.5);

  const min = rawMin - span * 0.12;
  const max = rawMax + span * 0.12;

  const dates = sorted.map((h) =>
    new Date(
      `${h.date.slice(0, 10)}T00:00:00Z`
    ).getTime()
  );

  const firstDate = Math.min(...dates);
  const lastDate = Math.max(...dates);

  const dateSpan = Math.max(
    lastDate - firstDate,
    1
  );

  const x = (date: number) =>
    left +
    ((date - firstDate) / dateSpan) * plotWidth;

  const y = (rate: number) =>
    top +
    ((max - rate) / (max - min)) * plotHeight;

  /* STEP LINE */

  let path = `M ${x(dates[0]).toFixed(2)} ${y(
    sorted[0].rate
  ).toFixed(2)}`;

  for (let i = 1; i < sorted.length; i++) {
    path += ` H ${x(dates[i]).toFixed(2)} V ${y(
      sorted[i].rate
    ).toFixed(2)}`;
  }

  const areaPath = `${path} L ${x(
    lastDate
  ).toFixed(2)} ${
    top + plotHeight
  } L ${x(firstDate).toFixed(2)} ${
    top + plotHeight
  } Z`;

  /* HORIZONTAL RATE TICKS */

  const ticks = Array.from(
    { length: 5 },
    (_, i) => min + ((max - min) * i) / 4
  );

  /* ACTUAL YEAR TIMELINE */

  const startYear = new Date(
    firstDate
  ).getUTCFullYear();

  const endYear = new Date(
    lastDate
  ).getUTCFullYear();

  const yearSpan = endYear - startYear;

  const yearStep =
    yearSpan <= 4
      ? 1
      : yearSpan <= 10
      ? 2
      : yearSpan <= 20
      ? 4
      : 5;

  const yearTicks: number[] = [];

  for (
    let year =
      Math.ceil(startYear / yearStep) * yearStep;
    year <= endYear;
    year += yearStep
  ) {
    const timestamp = Date.UTC(year, 0, 1);

    if (
      timestamp > firstDate &&
      timestamp < lastDate &&
      x(timestamp) > left + 65 &&
      x(timestamp) < width - right - 65
    ) {
      yearTicks.push(year);
    }
  }

  const selected =
    selectedPoint !== null
      ? sorted[selectedPoint] ?? null
      : null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">

      {/* CHART HEADER */}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-black text-slate-900 sm:text-base">
            Interest Rate History — {name}
          </h3>

          <p className="mt-1 text-[11px] text-slate-500">
            Available historical monetary policy decisions
          </p>
        </div>

        <span
          dir="ltr"
          className="rounded-xl bg-blue-50 px-3 py-2 text-lg font-black text-blue-700"
        >
          {formatRate(
            sorted[sorted.length - 1].rate
          )}
        </span>
      </div>

      {/* HISTORICAL COVERAGE */}

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <span className="font-bold text-slate-600">
          Available period:{" "}
          {dateEn(sorted[0].date)}
          {" — "}
          {dateEn(
            sorted[sorted.length - 1].date
          )}
        </span>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-600">
          {sorted.length}{" "}
          {sorted.length === 1
            ? "Record"
            : "Records"}
        </span>
      </div>

      {/* INTERACTIVE SVG CHART */}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="group"
        aria-label={`Historical interest rate chart for ${name}`}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient
            id="historyExplorerGradientEn"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#2B6FD0"
              stopOpacity="0.22"
            />

            <stop
              offset="100%"
              stopColor="#2B6FD0"
              stopOpacity="0.015"
            />
          </linearGradient>
        </defs>

        {/* HORIZONTAL GRID AND RATE LABELS */}

        {ticks.map((tick, index) => {
          const yy = y(tick);

          return (
            <g key={index}>
              <line
                x1={left}
                y1={yy}
                x2={width - right}
                y2={yy}
                stroke="#e2e8f0"
                strokeDasharray="5 6"
              />

              <text
                x={left - 12}
                y={yy + 5}
                textAnchor="end"
                fill="#64748b"
                fontSize="14"
              >
                {tick.toFixed(2)}%
              </text>
            </g>
          );
        })}

        {/* AREA */}

        <path
          d={areaPath}
          fill="url(#historyExplorerGradientEn)"
        />

        {/* STEP LINE */}

        <path
          d={path}
          fill="none"
          stroke="#246cce"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* INTERACTIVE DECISION POINTS */}

        {sorted.map((row, index) => (
          <circle
            key={`${row.date}-${index}`}
            cx={x(dates[index])}
            cy={y(row.rate)}
            r={
              selectedPoint === index
                ? 5.5
                : 3.5
            }
            fill={
              selectedPoint === index
                ? "#246cce"
                : "#ffffff"
            }
            stroke="#246cce"
            strokeWidth="2"
            className="cursor-pointer outline-none focus:stroke-[4px]"
            role="button"
            tabIndex={0}
            aria-label={`${dateEn(
              row.date
            )}, interest rate ${formatRate(
              row.rate
            )}`}
            onClick={() =>
              setSelectedPoint(index)
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                setSelectedPoint(index);
              }
            }}
          >
            <title>
              {`${dateEn(
                row.date
              )} — ${formatRate(row.rate)}`}
            </title>
          </circle>
        ))}

        {/* START YEAR */}

        <text
          x={left}
          y={height - 17}
          textAnchor="start"
          fontSize="14"
          fill="#64748b"
        >
          {startYear}
        </text>

        {/* INTERMEDIATE YEARS */}

        {yearTicks.map((year) => (
          <g key={year}>
            <line
              x1={x(Date.UTC(year, 0, 1))}
              y1={top + plotHeight}
              x2={x(Date.UTC(year, 0, 1))}
              y2={top + plotHeight + 5}
              stroke="#94a3b8"
            />

            <text
              x={x(Date.UTC(year, 0, 1))}
              y={height - 17}
              textAnchor="middle"
              fontSize="14"
              fill="#64748b"
            >
              {year}
            </text>
          </g>
        ))}

        {/* END YEAR */}

        {endYear !== startYear && (
          <text
            x={width - right}
            y={height - 17}
            textAnchor="end"
            fontSize="14"
            fill="#64748b"
          >
            {endYear}
          </text>
        )}
      </svg>

      {/* SELECTED DECISION DETAILS */}

      {selected && (
        <div
          className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3"
          aria-live="polite"
        >
          <div>
            <p className="text-[10px] font-bold text-slate-500">
              Selected Decision
            </p>

            <p className="mt-1 text-xs font-black text-slate-900">
              {dateEn(selected.date)}
            </p>
          </div>

          <div className="text-left">
            <p className="text-[10px] font-bold text-slate-500">
              Recorded Interest Rate
            </p>

            <p
              dir="ltr"
              className="mt-1 text-lg font-black text-blue-700"
            >
              {formatRate(selected.rate)}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setSelectedPoint(null)
            }
            className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-[11px] font-bold text-blue-700 hover:bg-blue-100"
          >
            Close
          </button>
        </div>
      )}

      {/* CHART METHODOLOGY */}

      <p className="mt-3 text-[11px] leading-6 text-slate-500">
        This chart displays available historical interest
        rates and monetary policy decisions recorded in
        our database. It may not include every unchanged
        decision or older meeting. The step line connects
        recorded policy rates to illustrate their
        historical development but does not confirm
        complete coverage of every intervening period.
        These figures are not forecasts of future rates.
      </p>
    </div>
  );
}

/* =====================================================
   MAIN HISTORY EXPLORER
   MATCHES ARABIC DESKTOP AND MOBILE
===================================================== */

export default function HistoryExplorer({
  banks,
}: Props) {
  const [selectedBank, setSelectedBank] =
    useState(
      banks.find(
        (bank) => bank.slug === "fed"
      )?.slug ||
        banks[0]?.slug ||
        ""
    );

  const [selectedYear, setSelectedYear] =
    useState("all");

  const [
    visibleMobileCount,
    setVisibleMobileCount,
  ] = useState(5);

  const [
    visibleDesktopCount,
    setVisibleDesktopCount,
  ] = useState(15);

  const bank = banks.find(
    (item) => item.slug === selectedBank
  );

  /* SORT HISTORY CHRONOLOGICALLY */

  const historyFull = useMemo(
    () =>
      [...(bank?.history || [])].sort(
        (a, b) =>
          a.date.localeCompare(b.date)
      ),
    [bank]
  );

  /* AVAILABLE YEARS */

  const years = useMemo(
    () =>
      [
        ...new Set(
          historyFull.map((row) =>
            row.date.slice(0, 4)
          )
        ),
      ].sort(),
    [historyFull]
  );

  /* FILTER BY YEAR */

  const historyFiltered = useMemo(
    () =>
      selectedYear === "all"
        ? historyFull
        : historyFull.filter((row) =>
            row.date.startsWith(
              selectedYear
            )
          ),
    [historyFull, selectedYear]
  );

  /* MOST RECENT DECISIONS FIRST */

  const reversedHistory = useMemo(
    () => [...historyFiltered].reverse(),
    [historyFiltered]
  );

  /* FILTER HANDLERS */

  const handleBankChange = (
    slug: string
  ) => {
    setSelectedBank(slug);
    setSelectedYear("all");
    setVisibleDesktopCount(15);
    setVisibleMobileCount(5);
  };

  const handleYearChange = (
    year: string
  ) => {
    setSelectedYear(year);
    setVisibleDesktopCount(15);
    setVisibleMobileCount(5);
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      dir="ltr"
      lang="en"
      className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]"
    >

      {/* HEADER AND FILTERS */}

      <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-4 sm:p-6">
        <h3 className="text-lg font-black sm:text-2xl">
          Interest Rate Chart & Decision History
        </h3>

        <p className="mt-2 text-xs leading-7 text-slate-500">
          Select a central bank and year to explore
          historical monetary policy decisions
          recorded in our database.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          {/* CENTRAL BANK FILTER */}

          <label className="block min-w-0">
            <span className="mb-1.5 block text-[11px] font-black text-slate-600">
              Central Bank
            </span>

            <select
              value={selectedBank}
              onChange={(event) =>
                handleBankChange(
                  event.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {banks.map((item) => (
                <option
                  key={item.slug}
                  value={item.slug}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          {/* YEAR FILTER */}

          <label className="block min-w-0">
            <span className="mb-1.5 block text-[11px] font-black text-slate-600">
              Year
            </span>

            <select
              value={selectedYear}
              onChange={(event) =>
                handleYearChange(
                  event.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">
                All Years
              </option>

              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* RESET YEAR FILTER */}

        {selectedYear !== "all" && (
          <button
            type="button"
            onClick={() =>
              handleYearChange("all")
            }
            className="mt-3 text-xs font-black text-blue-700 underline underline-offset-4"
          >
            View Full History
          </button>
        )}
      </div>

      {/* HISTORY CONTENT */}

      <div className="p-3 sm:p-6">
        {bank ? (
          <>

            {/* INTERACTIVE CHART */}

            <HistoryChart
              key={`${selectedBank}-${selectedYear}`}
              name={bank.name}
              history={historyFiltered}
            />

            {/* DECISION HISTORY HEADING */}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-950 sm:text-xl">
                  {bank.name} Interest Rate Decision History
                </h3>

                {historyFiltered.length > 0 && (
                  <p className="mt-1.5 text-[11px] leading-6 text-slate-500">
                    Recorded period:{" "}
                    <span className="font-bold text-slate-700">
                      {dateEn(
                        historyFiltered[0].date
                      )}
                    </span>
                    {" — "}
                    <span className="font-bold text-slate-700">
                      {dateEn(
                        historyFiltered[
                          historyFiltered.length - 1
                        ].date
                      )}
                    </span>
                  </p>
                )}
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                {historyFiltered.length}{" "}
                {historyFiltered.length === 1
                  ? "Recorded Decision"
                  : "Recorded Decisions"}
              </span>
            </div>

            {/* =====================================================
                DESKTOP / TABLET TABLE
                FIRST 15, THEN +15
            ===================================================== */}

            <div className="mt-4 hidden overflow-hidden rounded-xl border border-slate-200 md:block">
              <table className="w-full table-fixed text-center">
                <thead className="bg-[#0b2949] text-white">
                  <tr className="text-xs">
                    <th className="w-1/5 px-5 py-4 text-center">
                      Decision Date
                    </th>

                    <th className="w-1/5 px-4 py-4 text-center">
                      Previous Rate
                    </th>

                    <th className="w-1/5 px-4 py-4 text-center">
                      New Rate
                    </th>

                    <th className="w-1/5 px-4 py-4 text-center">
                      Change
                    </th>

                    <th className="w-1/5 px-4 py-4 text-center">
                      Decision Type
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reversedHistory
                    .slice(
                      0,
                      visibleDesktopCount
                    )
                    .map((row, index) => (
                      <tr
                        key={`${row.date}-${index}`}
                        className={`border-t border-slate-200 text-xs ${
                          index % 2
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        <td className="px-5 py-3.5 text-center font-black">
                          {dateEn(row.date)}
                        </td>

                        <td
                          dir="ltr"
                          className="px-4 py-3.5 text-center font-bold"
                        >
                          {formatRate(
                            row.previousRate
                          )}
                        </td>

                        <td
                          dir="ltr"
                          className="px-4 py-3.5 text-center font-black text-blue-700"
                        >
                          {formatRate(row.rate)}
                        </td>

                        <td
                          dir="ltr"
                          className={`px-4 py-3.5 text-center font-black ${changeClass(
                            row.changeBps
                          )}`}
                        >
                          {row.changeBps == null
                            ? "—"
                            : `${
                                row.changeBps > 0
                                  ? "+"
                                  : ""
                              }${row.changeBps} bps`}
                        </td>

                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={`inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-[11px] font-black ${changeBadgeClass(
                              row.changeBps
                            )}`}
                          >
                            {changeLabel(
                              row.changeBps
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* DESKTOP SHOW MORE */}

            {reversedHistory.length >
              visibleDesktopCount && (
              <div className="mt-4 hidden justify-center md:flex">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleDesktopCount(
                      (count) => count + 15
                    )
                  }
                  className="rounded-xl border border-blue-200 bg-blue-50 px-8 py-3 text-xs font-black text-blue-700 transition hover:bg-blue-100"
                >
                  Show More (
                  {Math.min(
                    15,
                    reversedHistory.length -
                      visibleDesktopCount
                  )}{" "}
                  {Math.min(
                    15,
                    reversedHistory.length -
                      visibleDesktopCount
                  ) === 1
                    ? "Decision"
                    : "Decisions"}
                  )
                </button>
              </div>
            )}

            {/* =====================================================
                MOBILE DECISION CARDS
                FIRST 5, THEN +5
            ===================================================== */}

            <div className="mt-4 space-y-2 md:hidden">
              {reversedHistory
                .slice(
                  0,
                  visibleMobileCount
                )
                .map((row, index) => (
                  <div
                    key={`${row.date}-${index}`}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3.5"
                  >
                    {/* DATE AND DECISION */}

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black">
                        {dateEn(row.date)}
                      </span>

                      <span
                        className={`text-xs font-black ${changeClass(
                          row.changeBps
                        )}`}
                      >
                        {changeLabel(
                          row.changeBps
                        )}
                      </span>
                    </div>

                    {/* PREVIOUS AND NEW RATE */}

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-white p-2">
                        <p className="text-[10px] text-slate-500">
                          Previous Rate
                        </p>

                        <p
                          dir="ltr"
                          className="mt-1 text-left text-sm font-black"
                        >
                          {formatRate(
                            row.previousRate
                          )}
                        </p>
                      </div>

                      <div className="rounded-lg bg-white p-2">
                        <p className="text-[10px] text-slate-500">
                          New Rate
                        </p>

                        <p
                          dir="ltr"
                          className="mt-1 text-left text-sm font-black text-blue-700"
                        >
                          {formatRate(row.rate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* MOBILE SHOW MORE */}

            {reversedHistory.length >
              visibleMobileCount && (
              <div className="mt-4 flex justify-center md:hidden">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleMobileCount(
                      (count) => count + 5
                    )
                  }
                  className="w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-xs font-black text-blue-700 transition hover:bg-blue-100"
                >
                  Show More (
                  {Math.min(
                    5,
                    reversedHistory.length -
                      visibleMobileCount
                  )}{" "}
                  {Math.min(
                    5,
                    reversedHistory.length -
                      visibleMobileCount
                  ) === 1
                    ? "Decision"
                    : "Decisions"}
                  )
                </button>
              </div>
            )}

            {/* EMPTY HISTORY */}

            {!historyFiltered.length && (
              <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                No historical interest rate decisions
                are available for the selected period.
              </div>
            )}

            {/* OFFICIAL CENTRAL BANK SOURCE */}

            {bank.officialUrl &&
              /^https:\/\//i.test(
                bank.officialUrl
              ) && (
                <div className="mt-5 flex justify-center md:justify-start">
                  <a
                    href={bank.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[11px] font-black text-blue-700 transition hover:bg-blue-100"
                  >
                    Verify Decisions with the Central Bank ↗
                  </a>
                </div>
              )}
          </>
        ) : (
          <div className="p-8 text-center text-sm text-slate-500">
            No published historical interest rate
            data is currently available.
          </div>
        )}
      </div>
    </div>
  );
}
