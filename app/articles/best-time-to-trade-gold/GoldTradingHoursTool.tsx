"use client";

import { useState } from "react";

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
  { id: "sa", name: "السعودية", offset: 3 },
  { id: "kw", name: "الكويت", offset: 3 },
  { id: "ae", name: "الإمارات", offset: 4 },
  { id: "qa", name: "قطر", offset: 3 },
  { id: "bh", name: "البحرين", offset: 3 },
  { id: "om", name: "سلطنة عُمان", offset: 4 },
  { id: "jo", name: "الأردن", offset: 3 },
  { id: "iq", name: "العراق", offset: 3 },
  { id: "eg-w", name: "مصر – التوقيت الشتوي", offset: 2 },
  { id: "eg-s", name: "مصر – التوقيت الصيفي", offset: 3 },
  { id: "utc", name: "التوقيت العالمي UTC", offset: 0 },
];

export default function GoldTradingHoursTool({
  data,
}: {
  data: HourlyData[];
}) {
  const [country, setCountry] = useState("sa");

  const [period, setPeriod] = useState<
    "historical" | "recent"
  >("historical");

  const [metric, setMetric] = useState<
    "percent" | "usd"
  >("percent");

  const selectedCountry =
    COUNTRIES.find((item) => item.id === country) ??
    COUNTRIES[0];

  const rows = data
    .map((row) => ({
      hour: (row.hour + selectedCountry.offset - 3 + 24) % 24,

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

  const formatHour = (hour: number) =>
    `${String(hour).padStart(2, "0")}:00`;

  const formatRange = (hour: number) =>
    `${formatHour(hour)} – ${formatHour((hour + 1) % 24)}`;

  return (
    <div
      dir="rtl"
      className="!my-8 overflow-hidden rounded-[20px] border border-[#d7e5f4] bg-white shadow-sm"
    >
      {/* HEADER */}

      <div className="bg-[linear-gradient(120deg,#071a31_0%,#0a2e52_60%,#12518b_100%)] p-5 text-white sm:p-7">

        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black text-cyan-200">
          أداة تحليل تفاعلية
        </span>

        <h3 className="mt-3 text-[20px] font-black leading-[1.6] sm:text-[26px]">
          محلل أوقات تداول الذهب
        </h3>

        <p className="mt-2 text-[12px] leading-7 text-slate-200 sm:text-[14px]">
          اكتشف متوسط حركة الذهب خلال ساعات اليوم
          بتوقيت بلدك، وقارن بين الفترات التاريخية
          باستخدام بيانات بروكر العرب البحثية.
        </p>

      </div>

      {/* FILTERS */}

      <div className="grid gap-4 border-b border-slate-200 bg-[#f5f9ff] p-4 sm:grid-cols-3 sm:p-6">

        <label className="block">

          <span className="mb-2 block text-[12px] font-black text-[#102747]">
            اختر الدولة
          </span>

          <select
            value={country}
            onChange={(event) =>
              setCountry(event.target.value)
            }
            className="h-12 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-[13px] font-bold text-[#102747]"
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
            الفترة الزمنية
          </span>

          <select
            value={period}
            onChange={(event) =>
              setPeriod(
                event.target.value as
                  | "historical"
                  | "recent"
              )
            }
            className="h-12 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-[13px] font-bold text-[#102747]"
          >
            <option value="historical">
              2010 – 2025
            </option>

            <option value="recent">
              يناير – أكتوبر 2026
            </option>
          </select>

        </label>

        <label className="block">

          <span className="mb-2 block text-[12px] font-black text-[#102747]">
            طريقة عرض الحركة
          </span>

          <select
            value={metric}
            onChange={(event) =>
              setMetric(
                event.target.value as "percent" | "usd"
              )
            }
            className="h-12 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-[13px] font-bold text-[#102747]"
          >
            <option value="percent">
              النسبة المئوية %
            </option>

            <option value="usd">
              الدولار الأمريكي $
            </option>
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
              label: "أكثر الساعات نشاطاً",
              value: formatRange(highest.hour),
              color: "text-amber-700",
            },
            {
              label: "متوسط نطاق حركة الذروة",
              value: formatValue(highest.value),
              color: "text-[#102747]",
            },
            {
              label: "أقل الساعات نشاطاً",
              value: formatRange(lowest.hour),
              color: "text-[#176ac8]",
            },
            {
              label: "متوسط نطاق الحركة الأدنى",
              value: formatValue(lowest.value),
              color: "text-[#102747]",
            },
          ].map((card) => (

            <div
              key={card.label}
              className="flex min-w-0 flex-col items-center justify-center rounded-[13px] border border-slate-200 bg-[#f7faff] p-3 text-center sm:p-4"
            >

              <p className="flex min-h-[36px] items-center text-[10px] font-bold leading-5 text-slate-500 sm:text-[12px]">
                {card.label}
              </p>

              <p className={`mt-2 text-[16px] font-black tabular-nums sm:text-[22px] ${card.color}`}>
                <bdi>{card.value}</bdi>
              </p>

            </div>

          ))}

        </div>

      )}

      {/* CHART */}

      <div className="px-4 pb-6 sm:px-6">

        <div
          dir="ltr"
          className="overflow-x-auto rounded-[15px] border border-slate-200 bg-white p-3 sm:p-5"
        >

          <svg
            viewBox="0 0 960 320"
            className="h-auto w-full min-w-[580px]"
            role="img"
            aria-label="متوسط حركة الذهب حسب الساعة والتوقيت المختار"
          >

            {Array.from(
              { length: 5 },
              (_, index) => maxValue * index / 4
            ).map((tick, index) => {

              const y =
                260 - tick / maxValue * 210;

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

            {rows.map((row) => {

              const height =
                row.value / maxValue * 210;

              const x = 76 + row.hour * 36;

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
                      {`${formatRange(row.hour)} | ${formatValue(row.value)} | ${row.samples} ساعة`}
                    </title>

                  </rect>

                  <text
                    x={x + 12.5}
                    y="283"
                    fontSize="11"
                    textAnchor="middle"
                    fill="#475569"
                  >
                    {String(row.hour).padStart(2, "0")}
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
              direction="rtl"
            >
              الساعة بالتوقيت المختار
            </text>

          </svg>

        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4">

          {[
            {
              label: "نطاق الحركة",
              color: "#2587e7",
            },
            {
              label: "أعلى متوسط",
              color: "#c49a36",
            },
            {
              label: "عينة محدودة",
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

      {/* TOP HOURS TABLE */}

      <div className="border-t border-slate-200">

        <h4 className="bg-[#f5f9ff] p-4 text-[14px] font-black text-[#102747]">
          أعلى 5 ساعات من حيث متوسط نطاق الحركة
        </h4>

        <table className="w-full text-center">

          <thead className="bg-[#092443] text-white">

            <tr className="text-[11px] sm:text-[13px]">

              <th className="px-2 py-3">
                الترتيب
              </th>

              <th className="px-2 py-3">
                الساعة
              </th>

              <th className="px-2 py-3">
                متوسط الحركة
              </th>

              <th className="px-2 py-3">
                عدد الساعات
              </th>

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

                <td
                  dir="ltr"
                  className="whitespace-nowrap px-2 py-3 text-[11px] font-black text-[#102747] sm:text-[13px]"
                >
                  {formatRange(row.hour)}
                </td>

                <td
                  dir="ltr"
                  className="px-2 py-3 text-[12px] font-black text-[#176ac8]"
                >
                  {formatValue(row.value)}
                </td>

                <td
                  dir="ltr"
                  className="px-2 py-3 text-[11px] text-slate-600"
                >
                  {row.samples.toLocaleString("en-US")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-200 bg-[#f8fafc] p-4 text-[11px] leading-7 text-slate-500 sm:text-[12px]">
        المصدر: HistData — تحليل بروكر العرب.
        تعتمد الأداة على متوسطات تاريخية أولية،
        وليست بيانات أسعار مباشرة أو إشارات تداول.
        تُستبعد العينات المحدودة من ترتيب الساعات.
        اختيار الدولة يحوّل التوقيت المرجعي الثابت،
        ولا يعيد تحليل التوقيت الصيفي لكل تاريخ.
      </div>

    </div>
  );
}