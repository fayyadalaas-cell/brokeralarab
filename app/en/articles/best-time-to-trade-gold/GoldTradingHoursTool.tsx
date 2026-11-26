"use client";

import { useEffect, useState } from "react";

type HourlyData = {
  hour: number;
  samples: number;
  averageUsd: number;
  averagePercent: number;
  recentUsd: number;
  recentPercent: number;
  recentSamples: number;
};

const COUNTRIES = [
  { id: "utc", name: "Universal Time (UTC)", zone: "UTC" },

  // North America
  { id: "us", name: "United States – New York", zone: "America/New_York" },
  { id: "ca", name: "Canada – Toronto", zone: "America/Toronto" },
  { id: "mx", name: "Mexico – Mexico City", zone: "America/Mexico_City" },

  // Europe
  { id: "uk", name: "United Kingdom", zone: "Europe/London" },
  { id: "de", name: "Germany", zone: "Europe/Berlin" },
  { id: "fr", name: "France", zone: "Europe/Paris" },
  { id: "it", name: "Italy", zone: "Europe/Rome" },
  { id: "es", name: "Spain", zone: "Europe/Madrid" },
  { id: "ch", name: "Switzerland", zone: "Europe/Zurich" },
  { id: "nl", name: "Netherlands", zone: "Europe/Amsterdam" },
  { id: "tr", name: "Turkey", zone: "Europe/Istanbul" },

  // Australia and Oceania
  { id: "au", name: "Australia – Sydney", zone: "Australia/Sydney" },
  { id: "nz", name: "New Zealand", zone: "Pacific/Auckland" },

  // Southeast Asia
  { id: "my", name: "Malaysia", zone: "Asia/Kuala_Lumpur" },
  { id: "th", name: "Thailand", zone: "Asia/Bangkok" },
  { id: "id", name: "Indonesia – Jakarta", zone: "Asia/Jakarta" },
  { id: "sg", name: "Singapore", zone: "Asia/Singapore" },
  { id: "ph", name: "Philippines", zone: "Asia/Manila" },
  { id: "vn", name: "Vietnam", zone: "Asia/Ho_Chi_Minh" },

  // South and East Asia
  { id: "in", name: "India", zone: "Asia/Kolkata" },
  { id: "pk", name: "Pakistan", zone: "Asia/Karachi" },
  { id: "bd", name: "Bangladesh", zone: "Asia/Dhaka" },
  { id: "jp", name: "Japan", zone: "Asia/Tokyo" },
  { id: "kr", name: "South Korea", zone: "Asia/Seoul" },
  { id: "cn", name: "China", zone: "Asia/Shanghai" },

  // Africa
  { id: "za", name: "South Africa", zone: "Africa/Johannesburg" },
  { id: "ng", name: "Nigeria", zone: "Africa/Lagos" },

  // South America
  { id: "br", name: "Brazil – São Paulo", zone: "America/Sao_Paulo" },

  // Middle East
  { id: "sa", name: "Saudi Arabia", zone: "Asia/Riyadh" },
  { id: "eg", name: "Egypt", zone: "Africa/Cairo" },
];

export default function GoldTradingHoursTool({
  data,
}: {
  data: HourlyData[];
}) {
  const [country, setCountry] = useState("utc");

  const [period, setPeriod] = useState<
    "historical" | "recent"
  >("historical");

  const [metric, setMetric] = useState<
    "percent" | "usd"
  >("percent");

  const selectedCountry =
  COUNTRIES.find((item) => item.id === country) ??
  COUNTRIES[0];

const [referenceDate, setReferenceDate] =
  useState<Date | null>(null);

useEffect(() => {
  setReferenceDate(new Date());
}, []);

const offsetMinutes = (() => {
  if (!referenceDate) return 0;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: selectedCountry.zone,
    timeZoneName: "longOffset",
  }).formatToParts(referenceDate);

  const offset =
    parts.find((part) => part.type === "timeZoneName")
      ?.value ?? "GMT";

  const match = offset.match(
    /GMT([+-])(\d{2}):(\d{2})/
  );

  if (!match) return 0;

  const sign = match[1] === "-" ? -1 : 1;

  return sign * (
    Number(match[2]) * 60 + Number(match[3])
  );
})();

const rows = data
  .map((row) => ({
    hour:
      ((row.hour * 60 + offsetMinutes + 1440) % 1440) / 60,

    value:
      period === "historical"
        ? metric === "percent"
          ? row.averagePercent
          : row.averageUsd
        : metric === "percent"
        ? row.recentPercent
        : row.recentUsd,

    samples:
      period === "historical"
        ? row.samples
        : row.recentSamples,
  }))
  .sort((a, b) => a.hour - b.hour);

  const minimumSamples =
    period === "historical" ? 500 : 50;

  const ranked = rows
    .filter((row) => row.samples >= minimumSamples)
    .sort((a, b) => b.value - a.value);

  const highest = ranked[0];
  const lowest = ranked[ranked.length - 1];

  const maxValue = Math.max(
    0.001,
    ...rows.map((row) => row.value)
  );

  const formatValue = (value: number) =>
    metric === "percent"
      ? `${value.toFixed(3)}%`
      : `$${value.toFixed(2)}`;

  const formatHour = (hour: number) => {
  const totalMinutes =
    Math.round(hour * 60) % 1440;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}`
  );
};

  const formatRange = (hour: number) =>
    `${formatHour(hour)} – ${formatHour((hour + 1) % 24)}`;

  const selectClass =
    "h-12 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-[13px] font-bold text-[#102747]";

  return (
    <div
      dir="ltr"
      className="!my-8 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-white shadow-sm"
    >

      {/* HEADER */}

      <div className="bg-[linear-gradient(120deg,#071a31_0%,#0a2e52_60%,#12518b_100%)] p-5 text-white sm:p-7">

        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black text-cyan-200">
          Interactive Research Tool
        </span>

        <h3 className="mt-3 text-[20px] font-black leading-[1.6] sm:text-[26px]">
          Gold Trading Hours Analyzer
        </h3>

        <p className="mt-2 text-[12px] leading-7 text-slate-200 sm:text-[14px]">
          Explore historical XAU/USD volatility by hour,
          compare time periods, and convert gold trading
          activity into your local time zone.
        </p>

      </div>

      {/* FILTERS */}

      <div className="grid gap-4 border-b border-slate-200 bg-[#f5f9ff] p-4 sm:grid-cols-3 sm:p-6">

        <label className="block">

          <span className="mb-2 block text-[12px] font-black text-[#102747]">
            Country / Time Zone
          </span>

          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className={selectClass}
          >

            {COUNTRIES.map((item) => (

              <option key={item.id} value={item.id}>
                {item.name}
              </option>

            ))}

          </select>

        </label>

        <label className="block">

          <span className="mb-2 block text-[12px] font-black text-[#102747]">
            Research Period
          </span>

          <select
            value={period}
            onChange={(event) =>
              setPeriod(
                event.target.value as "historical" | "recent"
              )
            }
            className={selectClass}
          >
            <option value="historical">2010 – 2025</option>
            <option value="recent">January – October 2026</option>
          </select>

        </label>

        <label className="block">

          <span className="mb-2 block text-[12px] font-black text-[#102747]">
            Volatility Measure
          </span>

          <select
            value={metric}
            onChange={(event) =>
              setMetric(event.target.value as "percent" | "usd")
            }
            className={selectClass}
          >
            <option value="percent">Percentage (%)</option>
            <option value="usd">US Dollars ($)</option>
          </select>

        </label>

      </div>

      {/* RESULTS */}

      {highest && lowest && (

        <div
          aria-live="polite"
          className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-6"
        >

          {[
            {
              label: "Most Active Hour",
              value: formatRange(highest.hour),
              color: "text-amber-700",
            },
            {
              label: "Highest Average Range",
              value: formatValue(highest.value),
              color: "text-[#102747]",
            },
            {
              label: "Least Active Hour",
              value: formatRange(lowest.hour),
              color: "text-[#176ac8]",
            },
            {
              label: "Lowest Average Range",
              value: formatValue(lowest.value),
              color: "text-[#102747]",
            },
          ].map((card) => (

            <div
              key={card.label}
              className="flex min-w-0 flex-col items-center justify-center rounded-[13px] border border-slate-200 bg-[#f7faff] p-3 text-center sm:p-4"
            >

              <p className="flex min-h-[36px] items-center justify-center text-[10px] font-bold leading-5 text-slate-500 sm:text-[12px]">
                {card.label}
              </p>

              <p className={`mt-2 text-[16px] font-black tabular-nums sm:text-[22px] ${card.color}`}>
                {card.value}
              </p>

            </div>

          ))}

        </div>

      )}

      {/* CHART */}

      <div className="px-4 pb-6 sm:px-6">

        <div className="overflow-x-auto rounded-[15px] border border-slate-200 bg-white p-3 sm:p-5">

          <svg
            viewBox="0 0 960 320"
            className="h-auto w-full min-w-[580px]"
            role="img"
            aria-label="Average hourly gold price range by selected time zone"
          >

            {Array.from(
              { length: 5 },
              (_, index) => maxValue * index / 4
            ).map((tick, index) => {

              const y = 260 - tick / maxValue * 210;

              return (

                <g key={index}>

                  <line
                    x1="70"
                    x2="950"
                    y1={y}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />

                  <text
                    x="60"
                    y={y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="#64748b"
                  >
                    {formatValue(tick)}
                  </text>

                </g>

              );

            })}

            {rows.map((row, index) => {

              const height = row.value / maxValue * 210;
              const x = 76 + index * 36;

              const limited =
                row.samples < minimumSamples;

              const peak =
                highest?.hour === row.hour;

              return (

                <g key={row.hour}>

                  <rect
                    x={x}
                    y={260 - height}
                    width="25"
                    height={height}
                    rx="4"
                    fill={
                      limited
                        ? "#94a3b8"
                        : peak
                        ? "#c49a36"
                        : "#2587e7"
                    }
                  >

                    <title>
                      {`${formatRange(row.hour)} | ${formatValue(row.value)} | ${row.samples} hourly observations`}
                    </title>

                  </rect>

                  <text
                    x={x + 12.5}
                    y="283"
                    fontSize="11"
                    textAnchor="middle"
                    fill="#475569"
                  >
                    {formatHour(row.hour)}
                  </text>

                </g>

              );

            })}

            <text
              x="510"
              y="310"
              fontSize="12"
              textAnchor="middle"
              fill="#64748b"
            >
              Hour of the Day (Selected Time Zone)
            </text>

          </svg>

        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4">

          {[
            {
              label: "Average Price Range",
              color: "#2587e7",
            },
            {
              label: "Peak Hour",
              color: "#c49a36",
            },
            {
              label: "Limited Sample",
              color: "#94a3b8",
            },
          ].map((item) => (

            <div
              key={item.label}
              className="flex items-center gap-2"
            >

              <span
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-[11px] font-bold text-slate-600">
                {item.label}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* TOP HOURS */}

      <div className="border-t border-slate-200">

        <h4 className="bg-[#f5f9ff] p-4 text-[14px] font-black text-[#102747]">
          Top 5 Hours by Average Gold Price Range
        </h4>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[350px] text-center">

            <thead className="bg-[#092443] text-white">

              <tr className="text-[11px] sm:text-[13px]">
                <th className="px-2 py-3">Rank</th>
                <th className="px-2 py-3">Local Time</th>
                <th className="px-2 py-3">Average Range</th>
                <th className="px-2 py-3">Samples</th>
              </tr>

            </thead>

            <tbody>

              {ranked.slice(0, 5).map((row, index) => (

                <tr
                  key={row.hour}
                  className={`border-t border-slate-200 ${
                    index === 0
                      ? "bg-[#fffbef]"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50"
                  }`}
                >

                  <td className="px-2 py-3 text-[12px] font-black text-[#102747]">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap px-2 py-3 text-[11px] font-black text-[#102747] sm:text-[13px]">
                    {formatRange(row.hour)}
                  </td>

                  <td className="px-2 py-3 text-[12px] font-black text-[#176ac8]">
                    {formatValue(row.value)}
                  </td>

                  <td className="px-2 py-3 text-[11px] text-slate-600">
                    {row.samples.toLocaleString("en-US")}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* RESEARCH DISCLAIMER */}

      <div className="border-t border-slate-200 bg-[#f8fafc] p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">

        Source: HistData. Research and analysis by Broker Alarab.
The tool displays preliminary historical average price
ranges, not live prices or trading signals. Hours with
limited sample sizes are excluded from the rankings.
Local time conversions automatically use the currently
applicable time zone offset, including daylight saving
time where observed. Countries with multiple time zones
are represented by the reference city listed. Historical
averages are converted from UTC rather than recalculated
using historical local time offsets.

      </div>

    </div>
  );
}