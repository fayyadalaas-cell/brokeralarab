
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type HomeTechnicalRow = {
  symbol: string;
  timeframe: string;
  price?: number | string | null;
  classification?: string | null;
  data_status?: string | null;
  buy_votes?: number | string | null;
  sell_votes?: number | string | null;
  neutral_votes?: number | string | null;
  calculated_at_utc?: string | null;
  candle_close_utc?: string | null;
};

export type HomePivotRow = {
  symbol: string;
  timeframe: string;
  method: string;
  levels?: Record<string, unknown> | null;
  calculated_at?: string | null;
  reference_candle_time_utc?: string | null;
};

type Props = {
  initialTechnical: HomeTechnicalRow | null;
  initialPivot: HomePivotRow | null;
};

const PAIRS = `
AUDCAD AUDCHF AUDJPY AUDNZD AUDUSD
CADCHF CADJPY CHFJPY
EURAUD EURCAD EURCHF EURCZK EURGBP EURHUF
EURJPY EURNOK EURNZD EURSEK EURUSD EURZAR
GBPAUD GBPCAD GBPCHF GBPJPY GBPNZD GBPUSD GBPZAR
NZDCAD NZDCHF NZDJPY NZDUSD
USDCAD USDCHF USDCZK USDDKK USDHKD USDHUF
USDJPY USDMXN USDNOK USDSEK USDZAR
`.trim().split(/\s+/);

const INSTRUMENTS = [
  {
    symbol: "XAUUSDc",
    label: "Gold / US Dollar — XAU/USD",
  },
  {
    symbol: "XAGUSDc",
    label: "Silver / US Dollar — XAG/USD",
  },
  ...PAIRS.map((pair) => ({
    symbol: `${pair}c`,
    label: `${pair.slice(0, 3)}/${pair.slice(3)}`,
  })),
];

const TIMEFRAMES = [
  "M5",
  "M15",
  "M30",
  "H1",
  "H4",
  "D1",
  "W1",
];

const BIAS: Record<
  string,
  {
    label: string;
    color: string;
  }
> = {
  STRONG_BUY: {
    label: "Strong Buy",
    color: "#059669",
  },
  BUY_BIAS: {
    label: "Buy",
    color: "#059669",
  },
  MIXED: {
    label: "Neutral",
    color: "#64748b",
  },
  SELL_BIAS: {
    label: "Sell",
    color: "#e11d48",
  },
  STRONG_SELL: {
    label: "Strong Sell",
    color: "#e11d48",
  },
};

const PIVOT_LEVELS = [
  { key: "S3", type: "support" },
  { key: "S2", type: "support" },
  { key: "S1", type: "support" },
  { key: "P", type: "pivot" },
  { key: "R1", type: "resistance" },
  { key: "R2", type: "resistance" },
  { key: "R3", type: "resistance" },
] as const;

function numeric(value: unknown): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function priceText(value: unknown): string {
  const number = numeric(value);

  if (number === null) return "—";

  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  });
}

function dateText(value?: string | null): string {
  if (!value) return "Unavailable";

  const parsed = Date.parse(value);

  if (!Number.isFinite(parsed)) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(parsed));
}

/* ==========================================
   COMPACT PROFESSIONAL TECHNICAL GAUGE
========================================== */

function TechnicalGauge({
  buy,
  sell,
  neutral,
  label,
  color,
}: {
  buy: number | null;
  sell: number | null;
  neutral: number | null;
  label: string;
  color: string;
}) {
  const total =
    buy !== null &&
    sell !== null &&
    neutral !== null
      ? buy + sell + neutral
      : 0;

  const position =
    total > 0
      ? Math.max(
          0,
          Math.min(
            1,
            0.5 +
              ((buy ?? 0) - (sell ?? 0)) /
                (2 * total)
          )
        )
      : 0.5;

  const radius = 92;
  const centerX = 130;
  const centerY = 115;

  const pointerX =
    centerX -
    radius * Math.cos(Math.PI * position);

  const pointerY =
    centerY -
    radius * Math.sin(Math.PI * position);

  const arc = "M38 115 A92 92 0 0 1 222 115";

  const segments = [
    { color: "#e11d48", start: 0, size: 25 },
    { color: "#fb923c", start: 25, size: 20 },
    { color: "#cbd5e1", start: 45, size: 10 },
    { color: "#34d399", start: 55, size: 20 },
    { color: "#059669", start: 75, size: 25 },
  ];

  return (
    <div className="mx-auto w-full max-w-[310px]">
      <svg
        viewBox="0 0 260 150"
        role="img"
        aria-label={`Technical rating: ${label}`}
        className="block h-auto w-full"
      >
        <path
          d={arc}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="15"
        />

        {segments.map((segment) => (
          <path
            key={segment.start}
            d={arc}
            fill="none"
            stroke={segment.color}
            strokeWidth="15"
            strokeDasharray={`${segment.size} ${
              100 - segment.size
            }`}
            strokeDashoffset={-segment.start}
            pathLength="100"
          />
        ))}

        {total > 0 && (
          <>
            <circle
              cx={pointerX}
              cy={pointerY}
              r="9"
              fill="white"
              stroke="white"
              strokeWidth="3"
            />

            <circle
              cx={pointerX}
              cy={pointerY}
              r="5"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          </>
        )}

        <text
          x="130"
          y="69"
          textAnchor="middle"
          fill="#64748b"
          fontSize="11"
          fontWeight="700"
        >
          Technical Rating
        </text>

        <text
          x="130"
          y="98"
          textAnchor="middle"
          fill={color}
          fontSize={label.length > 7 ? "22" : "26"}
          fontWeight="900"
        >
          {label}
        </text>

        <text
          x="130"
          y="119"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontWeight="600"
        >
          {total > 0
            ? `${total} technical signals`
            : "No signals available"}
        </text>
      </svg>

      <div className="-mt-1 flex items-center justify-between px-4 text-[10px] font-black">
        <span className="text-rose-600">
          Sell
        </span>

        <span className="text-slate-400">
          Neutral
        </span>

        <span className="text-emerald-600">
          Buy
        </span>
      </div>
    </div>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export default function HomeTechnicalSnapshot({
  initialTechnical,
  initialPivot,
}: Props) {
  const [symbol, setSymbol] = useState("XAUUSDc");

  const [timeframe, setTimeframe] =
    useState("H1");

  const [technical, setTechnical] =
    useState<HomeTechnicalRow | null>(
      initialTechnical?.symbol === "XAUUSDc" &&
        initialTechnical.timeframe === "H1"
        ? initialTechnical
        : null
    );

  const [pivot, setPivot] =
    useState<HomePivotRow | null>(
      initialPivot?.symbol === "XAUUSDc" &&
        initialPivot.timeframe === "H1" &&
        initialPivot.method === "classic"
        ? initialPivot
        : null
    );

  const [loading, setLoading] =
    useState(false);

  const [refreshError, setRefreshError] =
    useState(false);

  const [clock, setClock] =
    useState<number | null>(null);

  const [pivotExpanded, setPivotExpanded] =
    useState(false);

  const shortSymbol = symbol
    .replace(/c$/, "")
    .replace(/^(.{3})(.{3})$/, "$1/$2");

  const activeTechnical =
    technical?.symbol === symbol &&
    technical?.timeframe === timeframe
      ? technical
      : null;

  const activePivot =
    pivot?.symbol === symbol &&
    pivot?.timeframe === timeframe &&
    pivot?.method === "classic"
      ? pivot
      : null;

  /* ==========================================
     SUPABASE DATA REFRESH
  ========================================== */

  useEffect(() => {
    let cancelled = false;
    let controller: AbortController | null = null;

    async function refresh() {
      controller?.abort();

      const currentController =
        new AbortController();

      controller = currentController;

      setLoading(true);
      setRefreshError(false);

      try {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL;

        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env
            .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {
          throw new Error(
            "Supabase configuration missing"
          );
        }

        const base = url.replace(/\/$/, "");

        const technicalUrl = new URL(
          `${base}/rest/v1/broker_technical_analysis_latest`
        );

        technicalUrl.searchParams.set(
          "select",
          "*"
        );

        technicalUrl.searchParams.set(
          "symbol",
          `eq.${symbol}`
        );

        technicalUrl.searchParams.set(
          "timeframe",
          `eq.${timeframe}`
        );

        technicalUrl.searchParams.set(
          "limit",
          "1"
        );

        const pivotUrl = new URL(
          `${base}/rest/v1/broker_pivot_levels_latest`
        );

        pivotUrl.searchParams.set(
          "select",
          "*"
        );

        pivotUrl.searchParams.set(
          "symbol",
          `eq.${symbol}`
        );

        pivotUrl.searchParams.set(
          "timeframe",
          `eq.${timeframe}`
        );

        pivotUrl.searchParams.set(
          "method",
          "eq.classic"
        );

        pivotUrl.searchParams.set(
          "limit",
          "1"
        );

        const headers = {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Accept: "application/json",
        };

        const [technicalResult, pivotResult] =
          await Promise.allSettled([
            fetch(technicalUrl.toString(), {
              headers,
              cache: "no-store",
              signal: currentController.signal,
            }).then(async (response) => {
              if (!response.ok) {
                throw new Error(
                  `Technical HTTP ${response.status}`
                );
              }

              const rows: unknown =
                await response.json();

              if (!Array.isArray(rows)) {
                throw new Error(
                  "Invalid technical response"
                );
              }

              return rows as HomeTechnicalRow[];
            }),

            fetch(pivotUrl.toString(), {
              headers,
              cache: "no-store",
              signal: currentController.signal,
            }).then(async (response) => {
              if (!response.ok) {
                throw new Error(
                  `Pivot HTTP ${response.status}`
                );
              }

              const rows: unknown =
                await response.json();

              if (!Array.isArray(rows)) {
                throw new Error(
                  "Invalid Pivot response"
                );
              }

              return rows as HomePivotRow[];
            }),
          ]);

        if (
          cancelled ||
          currentController.signal.aborted
        ) {
          return;
        }

        if (
          technicalResult.status === "fulfilled"
        ) {
          setTechnical(
            technicalResult.value[0] ?? null
          );
        } else {
          console.error(
            "Home technical:",
            technicalResult.reason
          );

          setTechnical(null);
        }

        if (
          pivotResult.status === "fulfilled"
        ) {
          setPivot(
            pivotResult.value[0] ?? null
          );
        } else {
          console.error(
            "Home Pivot:",
            pivotResult.reason
          );

          setPivot(null);
        }

        setRefreshError(
          technicalResult.status === "rejected" ||
            pivotResult.status === "rejected"
        );

        setClock(Date.now());
      } catch (error) {
        if (
          !cancelled &&
          !currentController.signal.aborted
        ) {
          console.error(
            "Home analysis refresh:",
            error
          );

          setRefreshError(true);
        }
      } finally {
        if (
          !cancelled &&
          !currentController.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }

    void refresh();

    const interval = window.setInterval(() => {
      if (
        document.visibilityState === "visible"
      ) {
        void refresh();
      }
    }, 5 * 60 * 1000);

    const onVisible = () => {
      if (
        document.visibilityState === "visible"
      ) {
        void refresh();
      }
    };

    document.addEventListener(
      "visibilitychange",
      onVisible
    );

    const clockInterval = window.setInterval(
      () => {
        setClock(Date.now());
      },
      60 * 1000
    );

    setClock(Date.now());

    return () => {
      cancelled = true;
      controller?.abort();

      window.clearInterval(interval);
      window.clearInterval(clockInterval);

      document.removeEventListener(
        "visibilitychange",
        onVisible
      );
    };
  }, [symbol, timeframe]);

  /* ==========================================
     DATA INTERPRETATION
  ========================================== */

  const ready =
    activeTechnical?.data_status === "READY";

  const bias =
    ready && activeTechnical?.classification
      ? BIAS[activeTechnical.classification]
      : null;

  const buy = ready
    ? numeric(activeTechnical?.buy_votes)
    : null;

  const sell = ready
    ? numeric(activeTechnical?.sell_votes)
    : null;

  const neutral = ready
    ? numeric(activeTechnical?.neutral_votes)
    : null;

  const total =
    buy !== null &&
    sell !== null &&
    neutral !== null
      ? buy + sell + neutral
      : 0;

  const gaugeLabel =
    bias?.label ?? "Unavailable";

  const gaugeColor =
    bias?.color ?? "#64748b";

  const technicalTime =
    activeTechnical?.candle_close_utc ??
    activeTechnical?.calculated_at_utc ??
    null;

  const age =
    clock !== null && technicalTime
      ? clock - Date.parse(technicalTime)
      : NaN;

  const isFresh =
    ready &&
    Number.isFinite(age) &&
    age >= -120000 &&
    age <=
      (timeframe === "M5"
        ? 15
        : timeframe === "M15"
        ? 35
        : timeframe === "M30"
        ? 65
        : timeframe === "H1"
        ? 130
        : timeframe === "H4"
        ? 510
        : timeframe === "D1"
        ? 3000
        : 12000) *
        60000;

  const levels = activePivot?.levels ?? null;

  const pivotPeriod = [
    "M5",
    "M15",
  ].includes(timeframe)
    ? "Daily"
    : ["M30", "H1", "H4"].includes(
        timeframe
      )
    ? "Weekly"
    : "Monthly";

  const signalItems = [
    {
      label: "Buy",
      value: buy,
      color: "text-emerald-700",
      background: "bg-emerald-50",
      border: "border-emerald-100",
      bar: "bg-emerald-500",
    },
    {
      label: "Neutral",
      value: neutral,
      color: "text-slate-600",
      background: "bg-slate-50",
      border: "border-slate-200",
      bar: "bg-slate-400",
    },
    {
      label: "Sell",
      value: sell,
      color: "text-rose-700",
      background: "bg-rose-50",
      border: "border-rose-100",
      bar: "bg-rose-500",
    },
  ];

  function pivotClasses(type: string) {
    if (type === "support") {
      return {
        background: "bg-rose-50/80",
        border: "border-rose-100",
        label: "text-rose-600",
        value: "text-rose-800",
      };
    }

    if (type === "resistance") {
      return {
        background: "bg-emerald-50/80",
        border: "border-emerald-100",
        label: "text-emerald-600",
        value: "text-emerald-800",
      };
    }

    return {
      background: "bg-blue-50",
      border: "border-blue-200",
      label: "text-blue-600",
      value: "text-[#104b9b]",
    };
  }

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <section
      id="home-technical-analysis"
      aria-labelledby="home-technical-title"
      dir="ltr"
      className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3"
    >
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)]">

        {/* ======================================
            HEADER — ORIGINAL BRAND STYLE
        ====================================== */}

        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3 sm:px-6 sm:py-4">

          <div className="flex flex-col items-center justify-between gap-3 lg:flex-row">

            <div className="min-w-0 flex-1 text-center lg:text-left">

              <span className="inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-black text-blue-700 shadow-sm">
                Technical Analysis Center
              </span>

              <h2
                id="home-technical-title"
                className="mt-1.5 text-[20px] font-black leading-tight text-[#07111f] sm:mt-2 sm:text-[29px]"
              >
                Technical Analysis for Markets & Currencies
              </h2>

              <p className="mt-1.5 max-w-[850px] text-[11px] leading-6 text-slate-600 sm:text-[12px]">
                Technical indicator ratings and support
                and resistance levels for gold, silver,
                and currency pairs across seven timeframes.
              </p>

            </div>

            <Link
              href="/en/technical-analysis"
              className="hidden min-h-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 px-4 text-[12px] font-black text-white shadow-sm transition hover:bg-brand-600 lg:inline-flex"
            >
              Explore Analysis Center →
            </Link>

          </div>
        </div>

        {/* ======================================
            COMPACT MARKET TOOLBAR
        ====================================== */}

        <div className="border-b border-[#dce7f5] bg-[#f7faff] px-3 py-2 sm:px-5 sm:py-2.5">

          <div className="flex flex-wrap items-end gap-2.5">

            <label className="min-w-[145px] flex-[1_1_190px] lg:max-w-[270px]">

              <span className="mb-1 block text-[10px] font-black text-[#173b70]">
                Financial Instrument
              </span>

              <select
                aria-label="Select financial instrument"
                value={symbol}
                onChange={(e) =>
                  setSymbol(e.target.value)
                }
                className="h-9 w-full rounded-lg border border-blue-200 bg-white px-2.5 text-[11px] font-bold text-[#102b50] outline-none focus:border-blue-500"
              >
                {INSTRUMENTS.map((item) => (
                  <option
                    key={item.symbol}
                    value={item.symbol}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="w-[100px] shrink-0">

              <span className="mb-1 block text-[10px] font-black text-[#173b70]">
                Timeframe
              </span>

              <select
                aria-label="Select timeframe"
                dir="ltr"
                value={timeframe}
                onChange={(e) =>
                  setTimeframe(e.target.value)
                }
                className="h-9 w-full rounded-lg border border-blue-200 bg-white px-2 text-center text-[11px] font-black text-[#102b50] outline-none focus:border-blue-500"
              >
                {TIMEFRAMES.map((tf) => (
                  <option key={tf} value={tf}>
                    {tf}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex h-9 flex-wrap items-center gap-2 self-end lg:ms-auto">

              <span
                dir="ltr"
                className="rounded-md border border-blue-100 bg-white px-2.5 py-1.5 text-[11px] font-black text-[#17498c]"
              >
                {shortSymbol}
              </span>

              <span
                role="status"
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-bold ${
                  loading
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : refreshError
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : isFresh
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >

                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    loading
                      ? "animate-pulse bg-blue-500"
                      : refreshError
                      ? "bg-rose-500"
                      : isFresh
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />

                {loading
                  ? "Updating"
                  : refreshError
                  ? "Unable to refresh some data"
                  : isFresh
                  ? "Recent Data"
                  : "Periodic Data"}

              </span>
            </div>

          </div>
        </div>

        {/* ======================================
            SINGLE ROW ANALYTICS DASHBOARD
        ====================================== */}

        <div className="bg-white px-2.5 py-2 sm:px-5 sm:py-3">

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 xl:grid-cols-12">

            {/* ==================================
                PANEL 1 — MARKET SENTIMENT
            ================================== */}

            <div className="min-w-0 rounded-xl border border-[#dce6f3] bg-gradient-to-b from-white to-[#f9fbff] p-3 md:col-span-1 xl:col-span-4 flex h-full flex-col">

              <div className="mb-1 flex items-center justify-between gap-2">

                <h3 className="text-[13px] font-black text-[#102b50]">
                  Technical Rating Summary
                </h3>

                <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700">
                  {timeframe}
                </span>

              </div>

              <TechnicalGauge
                buy={buy}
                sell={sell}
                neutral={neutral}
                label={gaugeLabel}
                color={gaugeColor}
              />

              <div className="mt-1 border-t border-[#e6edf5] pt-2 text-center text-[10px] text-slate-500">
                Overall trend based on technical
                indicator signals
              </div>

            </div>

            {/* ==================================
                PANEL 2 — SIGNAL DISTRIBUTION
            ================================== */}

            <div className="min-w-0 rounded-xl border border-[#dce6f3] bg-white p-3 md:col-span-1 xl:col-span-3 flex h-full flex-col">

              <div className="flex items-center justify-between gap-2">

                <h3 className="text-[13px] font-black text-[#102b50]">
                  Indicator Signals
                </h3>

                <span className="text-[10px] font-bold text-slate-500">
                  Total:{" "}
                  <strong className="text-[#103c77]">
                    {total > 0 ? total : "—"}
                  </strong>
                </span>

              </div>

              {/* Signal summary boxes */}
              <div className="mt-3 grid grid-cols-3 gap-1.5">

                {signalItems.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-lg border px-1 py-2 text-center ${item.background} ${item.border}`}
                  >

                    <p
                      className={`text-[22px] font-black leading-none tabular-nums ${item.color}`}
                    >
                      {item.value ?? "—"}
                    </p>

                    <p
                      className={`mt-1.5 text-[10px] font-bold ${item.color}`}
                    >
                      {item.label}
                    </p>

                  </div>
                ))}

              </div>

              {/* Overall distribution */}
              <div className="mt-4">

                <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100">

                  {total > 0 && (
                    <>
                      <div
                        className="bg-emerald-500"
                        style={{
                          width: `${
                            ((buy ?? 0) / total) * 100
                          }%`,
                        }}
                      />

                      <div
                        className="bg-slate-400"
                        style={{
                          width: `${
                            ((neutral ?? 0) / total) *
                            100
                          }%`,
                        }}
                      />

                      <div
                        className="bg-rose-500"
                        style={{
                          width: `${
                            ((sell ?? 0) / total) *
                            100
                          }%`,
                        }}
                      />
                    </>
                  )}

                </div>
              </div>

              {/* Individual signal percentages */}
              <div className="mt-4 flex flex-1 flex-col justify-evenly gap-3 pb-2">

                {signalItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex min-h-[28px] items-center gap-2"
                  >

                    <span
                      className={`w-10 shrink-0 text-[10px] font-bold ${item.color}`}
                    >
                      {item.label}
                    </span>

                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className={`h-full rounded-full ${item.bar}`}
                        style={{
                          width:
                            total > 0
                              ? `${
                                  ((item.value ?? 0) /
                                    total) *
                                  100
                                }%`
                              : "0%",
                        }}
                      />

                    </div>

                    <span className="w-9 shrink-0 text-left text-[10px] font-black tabular-nums text-slate-600">
                      {total > 0
                        ? `${Math.round(
                            ((item.value ?? 0) /
                              total) *
                              100
                          )}%`
                        : "—"}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* ==========================================
                PANEL 3 — SUPPORT & RESISTANCE
                MOBILE COLLAPSIBLE / DESKTOP OPEN
            ========================================== */}

            <div className="min-w-0 rounded-xl border border-[#dce6f3] bg-white p-3 md:col-span-2 xl:col-span-5">

              {/* SECTION HEADER */}
              <div className="flex items-center justify-between gap-2">

                <div className="min-w-0">

                  <h3 className="text-[13px] font-black text-[#102b50]">
                    Support & Resistance Levels
                  </h3>

                  <p className="mt-0.5 text-[10px] text-slate-500">
                    Classic Pivot Points · {pivotPeriod}
                  </p>

                </div>

                {/* DESKTOP BADGE */}
                <span className="hidden shrink-0 rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700 lg:inline-flex">
                  Classic Pivot
                </span>

                {/* MOBILE TOGGLE BUTTON */}
                <button
                  type="button"
                  aria-expanded={pivotExpanded}
                  aria-controls="mobile-pivot-details"
                  onClick={() =>
                    setPivotExpanded(
                      (prev) => !prev
                    )
                  }
                  className="inline-flex min-h-[34px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 text-[10px] font-black text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 lg:hidden"
                >

                  <span>
                    {pivotExpanded
                      ? "Hide Levels"
                      : "Show Levels"}
                  </span>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${
                      pivotExpanded
                        ? "rotate-180"
                        : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>

                </button>

              </div>

              {/* ======================================
                  MOBILE — ALWAYS VISIBLE PIVOT
              ====================================== */}

              <div className="mt-3 lg:hidden">

                <div className="relative flex min-h-[48px] w-full items-center justify-center overflow-hidden rounded-lg border border-[#bfd7fa] bg-gradient-to-r from-[#f1f7ff] via-[#e5f0ff] to-[#f1f7ff]">

                  {/* SIDE ACCENTS */}
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-[#2563eb]" />

                  <div className="absolute right-0 top-0 h-full w-[3px] bg-[#2563eb]" />

                  <div className="relative z-10 flex min-w-0 items-center justify-center gap-2.5 px-2">

                    <span className="text-[11px] font-black text-[#2563eb]">
                      Pivot Point
                    </span>

                    <span className="h-4 w-px shrink-0 bg-[#bfd7fa]" />

                    <span
                      dir="ltr"
                      className="whitespace-nowrap text-[16px] font-black tabular-nums text-[#104b9b]"
                    >
                      {priceText(levels?.P)}
                    </span>

                    <span className="rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-black text-blue-600">
                      P
                    </span>

                  </div>
                </div>
              </div>

              {/* ======================================
                  RESPONSIVE LEVEL DETAILS
                  MOBILE: COLLAPSED BY DEFAULT
                  DESKTOP: ALWAYS VISIBLE
              ====================================== */}

              <div
                id="mobile-pivot-details"
                className={
                  pivotExpanded
                    ? "block"
                    : "hidden lg:block"
                }
              >

                {/* ======================================
                    RESISTANCE LEVELS R1 / R2 / R3
                ====================================== */}

                <div className="mt-3">

                  <div className="mb-1.5 flex items-center justify-between">

                    <span className="text-[10px] font-black text-emerald-700">
                      Resistance Levels
                    </span>

                    <span className="text-[9px] text-slate-400">
                      R1 – R3
                    </span>

                  </div>

                  <div className="grid grid-cols-3 gap-1.5">

                    {PIVOT_LEVELS.filter(
                      (item) =>
                        item.type === "resistance"
                    ).map((item) => {
                      const style = pivotClasses(
                        item.type
                      );

                      return (
                        <div
                          key={item.key}
                          className={`min-w-0 rounded-lg border px-1 py-1.5 text-center sm:px-1.5 sm:py-2 ${style.background} ${style.border}`}
                        >

                          <p
                            className={`text-[10px] font-black ${style.label}`}
                          >
                            {item.key}
                          </p>

                          <p
                            dir="ltr"
                            className={`mt-1 whitespace-nowrap text-[clamp(9px,0.85vw,12px)] font-black tabular-nums ${style.value}`}
                          >
                            {priceText(
                              levels?.[item.key]
                            )}
                          </p>

                        </div>
                      );
                    })}

                  </div>
                </div>

                {/* ======================================
                    DESKTOP — CENTER PIVOT
                    ALWAYS VISIBLE ON DESKTOP
                ====================================== */}

                <div className="my-3 hidden w-full lg:block">

                  <div className="relative flex min-h-[40px] w-full items-center justify-center overflow-hidden rounded-lg border border-[#bfd7fa] bg-gradient-to-r from-[#f1f7ff] via-[#e5f0ff] to-[#f1f7ff]">

                    {/* LEFT DECORATION */}
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-[#2563eb]" />

                    {/* CENTER PIVOT */}
                    <div className="relative z-10 flex items-center justify-center gap-3">

                      <span className="text-[11px] font-black text-[#2563eb]">
                        Pivot Point
                      </span>

                      <span className="h-4 w-px bg-[#bfd7fa]" />

                      <span
                        dir="ltr"
                        className="text-[16px] font-black tabular-nums text-[#104b9b]"
                      >
                        {priceText(levels?.P)}
                      </span>

                      <span className="rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-black text-blue-600">
                        P
                      </span>

                    </div>

                    {/* RIGHT DECORATION */}
                    <div className="absolute right-0 top-0 h-full w-[3px] bg-[#2563eb]" />

                  </div>
                </div>

                {/* ======================================
                    SUPPORT LEVELS S1 / S2 / S3
                ====================================== */}

                <div className="mt-3 lg:mt-0">

                  <div className="mb-1.5 flex items-center justify-between">

                    <span className="text-[10px] font-black text-rose-700">
                      Support Levels
                    </span>

                    <span className="text-[9px] text-slate-400">
                      S1 – S3
                    </span>

                  </div>

                  <div className="grid grid-cols-3 gap-1.5">

                    {PIVOT_LEVELS.filter(
                      (item) =>
                        item.type === "support"
                    ).map((item) => {
                      const style = pivotClasses(
                        item.type
                      );

                      return (
                        <div
                          key={item.key}
                          className={`min-w-0 rounded-lg border px-1 py-1.5 text-center sm:px-1.5 sm:py-2 ${style.background} ${style.border}`}
                        >

                          <p
                            className={`text-[10px] font-black ${style.label}`}
                          >
                            {item.key}
                          </p>

                          <p
                            dir="ltr"
                            className={`mt-1 whitespace-nowrap text-[clamp(9px,0.85vw,12px)] font-black tabular-nums ${style.value}`}
                          >
                            {priceText(
                              levels?.[item.key]
                            )}
                          </p>

                        </div>
                      );
                    })}

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ======================================
            RESPONSIVE BOTTOM INFORMATION BAR
        ====================================== */}

        <div className="border-t border-[#e2eaf4] bg-[#f7faff] px-3 py-3 sm:px-5">

          {/* ======================================
              MOBILE ONLY
          ====================================== */}

          <div className="space-y-3 lg:hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between">

              <h3 className="text-[12px] font-black text-[#102b50]">
                Latest Update Information
              </h3>

              <span className="rounded-md border border-blue-100 bg-white px-2 py-1 text-[10px] font-black text-blue-700">
                {timeframe}
              </span>

            </div>

            {/* ESSENTIAL INFORMATION */}
            <div className="grid grid-cols-2 gap-2">

              {/* LAST CALCULATED CANDLE */}
              <div className="min-w-0 rounded-lg border border-[#e0e9f5] bg-white px-2.5 py-2">

                <p className="text-[10px] font-bold text-slate-500">
                  Last Calculated Candle
                </p>

                <p className="mt-1 text-[11px] font-black leading-5 text-[#153b69]">
                  {clock === null
                    ? "—"
                    : dateText(technicalTime)}
                </p>

              </div>

              {/* HISTORICAL REFERENCE PRICE */}
              <div className="min-w-0 rounded-lg border border-[#cfe0f8] bg-[#eef5ff] px-2.5 py-2">

                <p className="text-[10px] font-bold text-[#45658b]">
                  Historical Price (Not Live)
                </p>

                <p
                  dir="ltr"
                  className="mt-1 text-left text-[15px] font-black tabular-nums text-[#104b9b]"
                >
                  {ready
                    ? priceText(
                        activeTechnical?.price
                      )
                    : "—"}
                </p>

              </div>

            </div>

            {/* COMPACT DISCLAIMER */}
            <p className="text-[10px] leading-5 text-slate-500">
              The reference price is historical and
              not a live market quote. Support and
              resistance levels are calculated using
              their corresponding reference periods.
              This analysis is informational and
              does not constitute trading advice.
            </p>

            {/* FULL TECHNICAL ANALYSIS CTA */}
            <Link
              href="/en/technical-analysis"
              className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-[12px] font-black text-white shadow-sm transition hover:bg-brand-600"
            >
              Explore Full Technical Analysis
              <span aria-hidden="true">
                →
              </span>
            </Link>

          </div>

          {/* ======================================
              DESKTOP ONLY
              PRESERVE ORIGINAL LAYOUT
          ====================================== */}

          <div className="hidden lg:block">

            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">

                {/* LAST CANDLE */}
                <div className="flex items-center gap-1.5">

                  <span className="text-[10px] font-bold text-slate-500">
                    Last Candle:
                  </span>

                  <span className="text-[10px] font-black text-[#153b69]">
                    {clock === null
                      ? "—"
                      : dateText(technicalTime)}
                  </span>

                </div>

                <span className="h-3 w-px bg-slate-200" />

                {/* REFERENCE CANDLE */}
                <div className="flex items-center gap-1.5">

                  <span className="text-[10px] font-bold text-slate-500">
                    Reference Candle:
                  </span>

                  <span className="text-[10px] font-black text-[#153b69]">
                    {clock === null
                      ? "—"
                      : dateText(
                          activePivot
                            ?.reference_candle_time_utc
                        )}
                  </span>

                </div>

                <span className="h-3 w-px bg-slate-200" />

                {/* PIVOT CALCULATION */}
                <div className="flex items-center gap-1.5">

                  <span className="text-[10px] font-bold text-slate-500">
                    Last Pivot Calculation:
                  </span>

                  <span className="text-[10px] font-black text-[#153b69]">
                    {clock === null
                      ? "—"
                      : dateText(
                          activePivot?.calculated_at
                        )}
                  </span>

                </div>

              </div>

              {/* HISTORICAL PRICE */}
              <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">

                <span className="text-[10px] font-bold text-slate-500">
                  Historical Candle Price (Not Live):
                </span>

                <span
                  dir="ltr"
                  className="text-[12px] font-black tabular-nums text-[#103c77]"
                >
                  {ready
                    ? priceText(
                        activeTechnical?.price
                      )
                    : "—"}
                </span>

              </div>

            </div>

            {/* DESKTOP DISCLAIMER */}
            <p className="mt-2 border-t border-[#e2eaf4] pt-2 text-[10px] leading-5 text-slate-500">

              <strong className="text-[#153b69]">
                Note:
              </strong>{" "}

              The displayed price is a historical
              reference, not a live market quote.
              Classic Pivot levels are calculated
              daily for M5 and M15, weekly for M30,
              H1 and H4, and monthly for D1 and W1.
              Levels may naturally match across
              multiple timeframes. This analysis is
              descriptive and does not constitute
              trading advice.

            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
