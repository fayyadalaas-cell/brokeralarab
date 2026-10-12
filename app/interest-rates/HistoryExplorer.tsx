
"use client";

import { useMemo, useState } from "react";

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

const formatRate = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value)
    ? `${value.toFixed(2)}%`
    : "—";

const dateAr = (value: string) => {
  const date = new Date(`${value.slice(0, 10)}T12:00:00Z`);

  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const changeLabel = (bps: number | null) => {
  if (bps == null) return "غير متاح";
  if (bps === 0) return "تثبيت";
  if (bps > 0) return `رفع ${bps} نقطة أساس`;
  return `خفض ${Math.abs(bps)} نقطة أساس`;
};

const changeClass = (bps: number | null) => {
  if (bps == null) return "text-slate-500";
  if (bps > 0) return "text-rose-700";
  if (bps < 0) return "text-emerald-700";
  return "text-blue-700";
};

function HistoryChart({
  history,
  name,
}: {
  history: HistoryPoint[];
  name: string;
}) {
  if (history.length < 2) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
        لا توجد نقاط تاريخية كافية لرسم تطور الفائدة لهذه الفترة.
      </div>
    );
  }

  const width = 1000;
  const height = 300;
  const left = 65;
  const right = 25;
  const top = 24;
  const bottom = 48;

  const rates = history.map((h) => h.rate);
  const rawMin = Math.min(...rates);
  const rawMax = Math.max(...rates);
  const span = Math.max(rawMax - rawMin, 0.5);
  const min = rawMin - span * 0.12;
  const max = rawMax + span * 0.12;

  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const dates = history.map((h) =>
    new Date(`${h.date}T00:00:00Z`).getTime()
  );

  const firstDate = Math.min(...dates);
  const lastDate = Math.max(...dates);
  const dateSpan = Math.max(lastDate - firstDate, 1);

  const x = (date: number) =>
    left + ((date - firstDate) / dateSpan) * plotWidth;

  const y = (rate: number) =>
    top + ((max - rate) / (max - min)) * plotHeight;

  let path = `M ${x(dates[0]).toFixed(2)} ${y(
    history[0].rate
  ).toFixed(2)}`;

  for (let i = 1; i < history.length; i++) {
    path += ` H ${x(dates[i]).toFixed(2)} V ${y(
      history[i].rate
    ).toFixed(2)}`;
  }

  const areaPath = `${path} L ${x(
    dates[dates.length - 1]
  ).toFixed(2)} ${top + plotHeight} L ${x(
    dates[0]
  ).toFixed(2)} ${top + plotHeight} Z`;

  const ticks = Array.from(
    { length: 5 },
    (_, i) => min + ((max - min) * i) / 4
  );

  const labelIndexes = Array.from(
    new Set([
      0,
      Math.floor((history.length - 1) / 3),
      Math.floor(((history.length - 1) * 2) / 3),
      history.length - 1,
    ])
  );

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-black text-slate-900 sm:text-base">
            تطور سعر الفائدة — {name}
          </h3>
          <p className="mt-1 text-[11px] text-slate-500">
            تغير السعر عند صدور القرارات المسجلة
          </p>
        </div>

        <span
          dir="ltr"
          className="rounded-xl bg-blue-50 px-3 py-2 text-lg font-black text-blue-700"
        >
          {formatRate(history[history.length - 1].rate)}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`رسم بياني لتاريخ سعر الفائدة لدى ${name}`}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient
            id="historyExplorerGradient"
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
                fontSize="15"
              >
                {tick.toFixed(2)}%
              </text>
            </g>
          );
        })}

        <path
          d={areaPath}
          fill="url(#historyExplorerGradient)"
        />

        <path
          d={path}
          fill="none"
          stroke="#246cce"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {history.map((row, index) => (
          <circle
            key={`${row.date}-${index}`}
            cx={x(dates[index])}
            cy={y(row.rate)}
            r="3.2"
            fill="#ffffff"
            stroke="#246cce"
            strokeWidth="2"
          >
            <title>
              {`${row.date}: ${formatRate(row.rate)}`}
            </title>
          </circle>
        ))}

        {labelIndexes.map((index) => (
          <text
            key={index}
            x={x(dates[index])}
            y={height - 14}
            textAnchor={
              index === 0
                ? "start"
                : index === history.length - 1
                ? "end"
                : "middle"
            }
            fontSize="14"
            fill="#64748b"
          >
            {history[index].date.slice(0, 7)}
          </text>
        ))}
      </svg>

      <p className="mt-2 text-[11px] leading-6 text-slate-500">
        الرسم يعتمد على القرارات التاريخية المسجلة في قاعدة
        البيانات، ولا يمثل توقعات مستقبلية. يتم وصل القرارات
        بخط متدرج لتوضيح استمرار السعر بين القرارات.
      </p>
    </div>
  );
}

export default function HistoryExplorer({ banks }: Props) {
  const [selectedBank, setSelectedBank] = useState(
    banks.find((bank) => bank.slug === "fed")?.slug ||
      banks[0]?.slug ||
      ""
  );

  const [selectedYear, setSelectedYear] = useState("all");
const [visibleMobileCount, setVisibleMobileCount] = useState(10);

  const bank = banks.find((item) => item.slug === selectedBank);

  const historyFull = useMemo(
    () =>
      [...(bank?.history || [])].sort((a, b) =>
        a.date.localeCompare(b.date)
      ),
    [bank]
  );

  const years = useMemo(
    () =>
      [...new Set(historyFull.map((row) => row.date.slice(0, 4)))]
        .sort(),
    [historyFull]
  );

  const historyFiltered = useMemo(
    () =>
      selectedYear === "all"
        ? historyFull
        : historyFull.filter((row) =>
            row.date.startsWith(selectedYear)
          ),
    [historyFull, selectedYear]
  );

  const reversedHistory = useMemo(
    () => [...historyFiltered].reverse(),
    [historyFiltered]
  );

  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
      <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50 p-4 sm:p-6">
        <h3 className="text-lg font-black sm:text-2xl">
          الرسم البياني وسجل قرارات الفائدة
        </h3>

        <p className="mt-2 text-xs leading-7 text-slate-500">
          اختر البنك والسنة لعرض قرارات السياسة النقدية
          التاريخية المسجلة في Supabase.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block min-w-0">
            <span className="mb-1.5 block text-[11px] font-black text-slate-600">
              البنك المركزي
            </span>

            <select
              value={selectedBank}
              onChange={(event) => {
                setSelectedBank(event.target.value);
                setSelectedYear("all");
              }}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {banks.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block min-w-0">
            <span className="mb-1.5 block text-[11px] font-black text-slate-600">
              السنة
            </span>

            <select
              value={selectedYear}
              onChange={(event) =>
                setSelectedYear(event.target.value)
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">جميع السنوات</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedYear !== "all" && (
          <button
            type="button"
            onClick={() => setSelectedYear("all")}
            className="mt-3 text-xs font-black text-blue-700 underline underline-offset-4"
          >
            عرض التاريخ الكامل
          </button>
        )}
      </div>

      <div className="p-3 sm:p-6">
        {bank ? (
          <>
            <HistoryChart
              name={bank.name}
              history={historyFiltered}
            />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-black sm:text-xl">
                سجل قرارات {bank.name}
              </h3>

              <span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                {historyFiltered.length} قرارًا
              </span>
            </div>

            <div className="mt-4 hidden overflow-hidden rounded-xl border border-slate-200 md:block">
              <table className="w-full table-fixed text-center">
                <thead className="bg-[#0b2949] text-white">
                  <tr className="text-xs">
                    <th className="w-1/5 px-5 py-4 text-center">تاريخ القرار</th>
<th className="w-1/5 px-4 py-4 text-center">السعر السابق</th>
<th className="w-1/5 px-4 py-4 text-center">السعر الجديد</th>
<th className="w-1/5 px-4 py-4 text-center">التغير</th>
<th className="w-1/5 px-4 py-4 text-center">نوع القرار</th>
                  </tr>
                </thead>

                <tbody>
                  {reversedHistory.map((row, index) => (
                    <tr
                      key={`${row.date}-${index}`}
                      className={`border-t border-slate-200 text-xs ${
                        index % 2 ? "bg-slate-50" : "bg-white"
                      }`}
                    >
                      <td className="px-5 py-3.5 text-center font-black">
                        {dateAr(row.date)}
                      </td>

                      <td
                        dir="ltr"
                        className="px-4 py-3.5 text-center font-bold"
                      >
                        {formatRate(row.previousRate)}
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
                              row.changeBps > 0 ? "+" : ""
                            }${row.changeBps} bps`}
                      </td>

                      <td
                        className={`px-4 py-3.5 text-center font-black ${changeClass(
                          row.changeBps
                        )}`}
                      >
                        {changeLabel(row.changeBps)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2 md:hidden">
  {reversedHistory.slice(0, visibleMobileCount).map((row, index) => (
                <div
                  key={`${row.date}-${index}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black">
                      {dateAr(row.date)}
                    </span>

                    <span
                      className={`text-xs font-black ${changeClass(
                        row.changeBps
                      )}`}
                    >
                      {changeLabel(row.changeBps)}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-white p-2">
                      <p className="text-[10px] text-slate-500">
                        السعر السابق
                      </p>
                      <p
                        dir="ltr"
                        className="mt-1 text-right text-sm font-black"
                      >
                        {formatRate(row.previousRate)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-2">
                      <p className="text-[10px] text-slate-500">
                        السعر الجديد
                      </p>
                      <p
                        dir="ltr"
                        className="mt-1 text-right text-sm font-black text-blue-700"
                      >
                        {formatRate(row.rate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

{reversedHistory.length > visibleMobileCount && (
  <div className="mt-4 flex justify-center md:hidden">
    <button
      type="button"
      onClick={() => setVisibleMobileCount((count) => count + 10)}
      className="w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-xs font-black text-blue-700 transition hover:bg-blue-100"
    >
      عرض المزيد ({Math.min(10, reversedHistory.length - visibleMobileCount)} قرارات)
    </button>
  </div>
)}

            {!historyFiltered.length && (
              <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                لا توجد قرارات تاريخية مسجلة للفترة المحددة.
              </div>
            )}

            {bank.officialUrl && (
  <div className="mt-5 flex justify-center md:justify-start">
    <a
      href={bank.officialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[11px] font-black text-blue-700 transition hover:bg-blue-100"
    >
      مراجعة القرارات لدى البنك المركزي ↗
    </a>
  </div>
)}
          </>
        ) : (
          <div className="p-8 text-center text-sm text-slate-500">
            لا توجد بيانات تاريخية منشورة.
          </div>
        )}
      </div>
    </div>
  );
}
