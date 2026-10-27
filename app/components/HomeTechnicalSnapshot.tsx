
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
  { symbol: "XAUUSDc", label: "الذهب / الدولار — XAU/USD" },
  { symbol: "XAGUSDc", label: "الفضة / الدولار — XAG/USD" },
  ...PAIRS.map((pair) => ({
    symbol: `${pair}c`,
    label: `${pair.slice(0, 3)}/${pair.slice(3)}`,
  })),
];

const TIMEFRAMES = [
  "M5", "M15", "M30", "H1", "H4", "D1", "W1",
];

const BIAS: Record<string, {
  label: string;
  color: string;
}> = {
  STRONG_BUY: {
    label: "شراء قوي",
    color: "#059669",
  },
  BUY_BIAS: {
    label: "شراء",
    color: "#059669",
  },
  MIXED: {
    label: "محايد",
    color: "#64748b",
  },
  SELL_BIAS: {
    label: "بيع",
    color: "#e11d48",
  },
  STRONG_SELL: {
    label: "بيع قوي",
    color: "#e11d48",
  },
};

function numeric(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
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
  if (!value) return "غير متاح";

  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return "غير متاح";

  return new Intl.DateTimeFormat("ar", {
    timeZone: "America/Toronto",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(parsed));
}

const PIVOT_LEVELS = [
  { key: "S3", type: "support" },
  { key: "S2", type: "support" },
  { key: "S1", type: "support" },
  { key: "P", type: "pivot" },
  { key: "R1", type: "resistance" },
  { key: "R2", type: "resistance" },
  { key: "R3", type: "resistance" },
] as const;


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
    buy !== null && sell !== null && neutral !== null
      ? buy + sell + neutral
      : 0;

  // Left = Sell, center = Neutral, right = Buy
  const position =
    total > 0
      ? Math.max(
          0,
          Math.min(
            1,
            0.5 + ((buy ?? 0) - (sell ?? 0)) / (2 * total)
          )
        )
      : 0.5;

  const radius = 137;
  const centerX = 180;
  const centerY = 170;

  const pointerX =
    centerX - radius * Math.cos(Math.PI * position);

  const pointerY =
    centerY - radius * Math.sin(Math.PI * position);

  const arc = "M43 170 A137 137 0 0 1 317 170";

  const segments = [
    { color: "#e11d48", start: 0, size: 25 },
    { color: "#fb923c", start: 25, size: 20 },
    { color: "#cbd5e1", start: 45, size: 10 },
    { color: "#34d399", start: 55, size: 20 },
    { color: "#10b981", start: 75, size: 25 },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center">

      <svg
        viewBox="0 0 360 205"
        role="img"
        aria-label={`التقييم الفني: ${label}`}
        className="block h-auto w-full max-w-[385px]"
      >
        <path
          d={arc}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="23"
          strokeLinecap="round"
        />

        {segments.map((segment) => (
          <path
  key={segment.start}
  d={arc}
  fill="none"
  stroke={segment.color}
  strokeWidth="23"
  strokeLinecap="butt"
  strokeDasharray={`${segment.size} ${100 - segment.size}`}
  strokeDashoffset={-segment.start}
  pathLength="100"
/>
        ))}

        {/* POINTER */}
        <circle
          cx={pointerX}
          cy={pointerY}
          r="12"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="4"
        />

        <circle
          cx={pointerX}
          cy={pointerY}
          r="8"
          fill="#ffffff"
          stroke="#64748b"
          strokeWidth="4"
        />

        <circle
          cx={pointerX}
          cy={pointerY}
          r="2.5"
          fill="#64748b"
        />

        {/* CENTER LABEL */}
        <text
          x="180"
          y="113"
          textAnchor="middle"
          fill="#64748b"
          fontSize="15"
          fontWeight="700"
        >
          التقييم الفني
        </text>

        {/* MAIN RATING */}
        <text
          x="180"
          y="151"
          textAnchor="middle"
          fill={color}
          fontSize="34"
          fontWeight="900"
        >
          {label}
        </text>
      </svg>

      {/* LEGEND */}
      <div className="-mt-5 flex w-full max-w-[350px] items-center justify-between px-2 text-[11px] font-black">
        <span className="text-rose-600">بيع</span>
        <span className="text-slate-500">محايد</span>
        <span className="text-emerald-600">شراء</span>
      </div>

    </div>
  );
}


export default function HomeTechnicalSnapshot({
  initialTechnical,
  initialPivot,
}: Props) {
  const [symbol, setSymbol] = useState("XAUUSDc");
  const [timeframe, setTimeframe] = useState("H1");

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

  const [loading, setLoading] = useState(false);
  const [refreshError, setRefreshError] = useState(false);
  const [clock, setClock] = useState<number | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    let controller: AbortController | null = null;

    async function refresh() {
      controller?.abort();

      const currentController = new AbortController();
      controller = currentController;

      setLoading(true);

      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {
          throw new Error("Supabase configuration missing");
        }

        const base = url.replace(/\/$/, "");

        const technicalUrl = new URL(
          `${base}/rest/v1/broker_technical_analysis_latest`
        );

        technicalUrl.searchParams.set("select", "*");
        technicalUrl.searchParams.set("symbol", `eq.${symbol}`);
        technicalUrl.searchParams.set("timeframe", `eq.${timeframe}`);
        technicalUrl.searchParams.set("limit", "1");

        const pivotUrl = new URL(
          `${base}/rest/v1/broker_pivot_levels_latest`
        );

        pivotUrl.searchParams.set("select", "*");
        pivotUrl.searchParams.set("symbol", `eq.${symbol}`);
        pivotUrl.searchParams.set("timeframe", `eq.${timeframe}`);
        pivotUrl.searchParams.set("method", "eq.classic");
        pivotUrl.searchParams.set("limit", "1");

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
                throw new Error(`Technical HTTP ${response.status}`);
              }

              const rows: unknown = await response.json();
              if (!Array.isArray(rows)) {
                throw new Error("Invalid technical response");
              }

              return rows as HomeTechnicalRow[];
            }),

            fetch(pivotUrl.toString(), {
              headers,
              cache: "no-store",
              signal: currentController.signal,
            }).then(async (response) => {
              if (!response.ok) {
                throw new Error(`Pivot HTTP ${response.status}`);
              }

              const rows: unknown = await response.json();
              if (!Array.isArray(rows)) {
                throw new Error("Invalid Pivot response");
              }

              return rows as HomePivotRow[];
            }),
          ]);

        if (cancelled || currentController.signal.aborted) return;

        if (technicalResult.status === "fulfilled") {
          setTechnical(technicalResult.value[0] ?? null);
        } else {
          console.error("Home technical:", technicalResult.reason);
          setTechnical(null);
        }

        if (pivotResult.status === "fulfilled") {
          setPivot(pivotResult.value[0] ?? null);
        } else {
          console.error("Home Pivot:", pivotResult.reason);
          setPivot(null);
        }

        setRefreshError(
          technicalResult.status === "rejected" ||
          pivotResult.status === "rejected"
        );

        setClock(Date.now());
      } catch (error) {
        if (!cancelled && !currentController.signal.aborted) {
          console.error("Home analysis refresh:", error);
          setRefreshError(true);
        }
      } finally {
        if (!cancelled && !currentController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void refresh();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void refresh();
      }
    }, 5 * 60 * 1000);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refresh();
      }
    };

    document.addEventListener("visibilitychange", onVisible);

    const clockInterval = window.setInterval(() => {
      setClock(Date.now());
    }, 60 * 1000);

    setClock(Date.now());

    return () => {
      cancelled = true;
      controller?.abort();
      window.clearInterval(interval);
      window.clearInterval(clockInterval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [symbol, timeframe]);

  const ready = activeTechnical?.data_status === "READY";

  const bias =
    ready && activeTechnical?.classification
      ? BIAS[activeTechnical.classification]
      : null;

  const buy = ready ? numeric(activeTechnical?.buy_votes) : null;
  const sell = ready ? numeric(activeTechnical?.sell_votes) : null;
  const neutral = ready ? numeric(activeTechnical?.neutral_votes) : null;

  const total =
    buy !== null && sell !== null && neutral !== null
      ? buy + sell + neutral
      : 0;

  const gaugeLabel = bias?.label ?? "غير متاح";
  const gaugeColor = bias?.color ?? "#64748b";

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
    age <= (
      timeframe === "M5" ? 15 :
      timeframe === "M15" ? 35 :
      timeframe === "M30" ? 65 :
      timeframe === "H1" ? 130 :
      timeframe === "H4" ? 510 :
      timeframe === "D1" ? 3000 : 12000
    ) * 60000;

  const levels = activePivot?.levels ?? null;

  const pivotPeriod =
    ["M5", "M15"].includes(timeframe)
      ? "اليومية"
      : ["M30", "H1", "H4"].includes(timeframe)
      ? "الأسبوعية"
      : "الشهرية";

  function levelStyle(type: string) {
    if (type === "support") {
      return {
        box: "border-rose-100 bg-rose-50/70",
        label: "text-rose-700",
      };
    }

    if (type === "resistance") {
      return {
        box: "border-emerald-100 bg-emerald-50/70",
        label: "text-emerald-700",
      };
    }

    return {
      box: "border-[#b9d1f5] bg-[#eaf3ff]",
      label: "text-[#1558be]",
    };
  }

  return (
    <section
      id="home-technical-analysis"
      aria-labelledby="home-technical-title"
      dir="rtl"
      className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3"
    >
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)]">

        {/* HEADER — ORIGINAL BRAND STYLE */}
        <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col items-center justify-between gap-3 lg:flex-row">

            <div className="min-w-0 flex-1 text-center lg:text-right">
              <span className="inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-black text-blue-700 shadow-sm">
                مركز التحليل الفني للأسواق
              </span>

              <h2
                id="home-technical-title"
                className="mt-2 text-[24px] font-black leading-tight text-[#07111f] sm:text-[29px]"
              >
                التحليل الفني للأسواق والعملات
              </h2>

              <p className="mt-1.5 max-w-[850px] text-[11px] leading-6 text-slate-600 sm:text-[12px]">
                تقييم المؤشرات الفنية ومستويات الدعم والمقاومة
                للذهب والفضة وأزواج العملات عبر سبعة أطر زمنية.
              </p>
            </div>

            <Link
              href="/technical-analysis"
              className="hidden min-h-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 px-4 text-[12px] font-black text-white shadow-sm transition hover:bg-brand-600 lg:inline-flex"
            >
              استكشف مركز التحليل ←
            </Link>

          </div>
        </div>

        {/* INSTRUMENT / TIMEFRAME SELECTORS */}
        <div className="border-b border-[#dce7f5] bg-[#f7faff] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">

            <div className="flex w-full flex-wrap items-end gap-3 sm:w-auto">

              <label className="min-w-0 flex-1 sm:w-[255px] sm:flex-none">
                <span className="mb-1 block text-[10px] font-black text-[#173b70]">
                  الأداة المالية
                </span>

                <select
                  aria-label="اختر الأداة المالية"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="h-10 w-full rounded-lg border border-blue-200 bg-white px-3 text-[11px] font-bold text-[#102b50] outline-none focus:border-blue-500"
                >
                  {INSTRUMENTS.map((item) => (
                    <option key={item.symbol} value={item.symbol}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="w-[115px] shrink-0">
                <span className="mb-1 block text-[10px] font-black text-[#173b70]">
                  الإطار الزمني
                </span>

                <select
                  aria-label="اختر الإطار الزمني"
                  dir="ltr"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="h-10 w-full rounded-lg border border-blue-200 bg-white px-2 text-center text-[11px] font-black text-[#102b50] outline-none focus:border-blue-500"
                >
                  {TIMEFRAMES.map((tf) => (
                    <option key={tf} value={tf}>{tf}</option>
                  ))}
                </select>
              </label>

            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md border border-blue-100 bg-white px-2.5 py-1.5 text-[10px] font-black text-blue-700">
                {shortSymbol}
              </span>

              <span
                className={`rounded-md border px-2.5 py-1.5 text-[10px] font-bold ${
                  loading
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : refreshError
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : isFresh
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {loading
                  ? "جاري التحديث"
                  : refreshError
                  ? "تعذر تحديث بعض البيانات"
                  : isFresh
                  ? "بيانات حديثة"
                  : "بيانات دورية"}
              </span>
            </div>

          </div>
        </div>

        {/* COMPACT TECHNICAL RATING */}
        <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">

          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-[16px] font-black text-[#102b50] sm:text-[18px]">
                ملخص التقييم الفني
              </h3>
              <p className="mt-1 text-[10px] text-slate-500">
                إشارات المؤشرات على الإطار الزمني {timeframe}
              </p>
            </div>

            <span className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700">
              {shortSymbol} · {timeframe}
            </span>
          </div>

          <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">

            <div className="flex items-center justify-center">
              <TechnicalGauge
                buy={buy}
                sell={sell}
                neutral={neutral}
                label={gaugeLabel}
                color={gaugeColor}
              />
            </div>

            <div className="min-w-0 space-y-3">

              {/* TOTAL INDICATOR SIGNALS */}

<div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
  <div className="flex items-center justify-between gap-3">
    <p className="text-[11px] font-bold text-slate-600">
      إجمالي إشارات المؤشرات
    </p>

    <p className="text-[22px] font-black tabular-nums text-[#103c77]">
      {total > 0 ? total : "—"}
    </p>
  </div>
</div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: "شراء",
                    value: buy,
                    style: "border-emerald-100 bg-emerald-50 text-emerald-700",
                  },
                  {
                    label: "محايد",
                    value: neutral,
                    style: "border-slate-200 bg-slate-50 text-slate-600",
                  },
                  {
                    label: "بيع",
                    value: sell,
                    style: "border-rose-100 bg-rose-50 text-rose-700",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-lg border px-2 py-2 text-center ${item.style}`}
                  >
                    <p className="text-[19px] font-black tabular-nums">
                      {item.value ?? "—"}
                    </p>
                    <p className="text-[10px] font-bold">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex h-2 overflow-hidden rounded-full bg-slate-100">
                {total > 0 && (
                  <>
                    <div
                      className="bg-emerald-500"
                      style={{
                        width: `${((buy ?? 0) / total) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-slate-300"
                      style={{
                        width: `${((neutral ?? 0) / total) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-rose-500"
                      style={{
                        width: `${((sell ?? 0) / total) * 100}%`,
                      }}
                    />
                  </>
                )}
              </div>

            </div>
          </div>

          
{/* LAST TECHNICAL CANDLE */}
<p className="mt-2 text-[10px] leading-5 text-slate-500">
  آخر شمعة محسوبة:{" "}
  {clock === null ? "—" : dateText(technicalTime)}
</p>

</div>

{/* ============================================================
    HORIZONTAL PIVOT — SUPPORT & RESISTANCE
============================================================ */}
<div className="bg-white px-4 py-4 sm:px-6">

  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
    <div>
      <h3 className="text-[16px] font-black text-[#102b50] sm:text-[18px]">
        مستويات الدعم والمقاومة
      </h3>

      <p className="mt-1 text-[10px] text-slate-500">
        النقاط المحورية الكلاسيكية · الفترة المرجعية {pivotPeriod}
      </p>
    </div>

    <Link
      href="/technical-analysis"
      className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-[10px] font-black text-blue-700 transition hover:bg-blue-50"
    >
      عرض جميع طرق الحساب ←
    </Link>
  </div>

  {/* PIVOT LEVELS TABLE */}
  <div className="overflow-x-auto rounded-xl border border-[#dbe5f2]">

    <div className="min-w-[610px]" dir="ltr">

      {/* HEADINGS */}
      <div className="grid grid-cols-7 border-b border-[#dbe5f2] bg-[#f2f6fc]">
        {PIVOT_LEVELS.map((item) => (
          <div
            key={item.key}
            className={`border-r border-[#e4eaf3] px-2 py-2 text-center last:border-r-0 ${
              item.type === "support"
                ? "text-rose-700"
                : item.type === "resistance"
                ? "text-emerald-700"
                : "text-[#1558be]"
            }`}
          >
            <span className="text-[11px] font-black">
              {item.key}
            </span>
          </div>
        ))}
      </div>

      {/* VALUES */}
      <div className="grid grid-cols-7">
        {PIVOT_LEVELS.map((item) => {
          const style = levelStyle(item.type);

          return (
            <div
              key={item.key}
              className={`min-w-0 border-r border-[#e4eaf3] px-2 py-3 text-center last:border-r-0 ${style.box}`}
            >
              <span
                dir="ltr"
                className={`block whitespace-nowrap text-[12px] font-black tabular-nums sm:text-[13px] ${style.label}`}
              >
                {priceText(levels?.[item.key])}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  </div>

  {/* PIVOT TIMESTAMPS */}
  <div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[10px] text-slate-500">
    <span>
      شمعة المرجع:{" "}
      {clock === null
        ? "—"
        : dateText(activePivot?.reference_candle_time_utc)}
    </span>

    <span>
      آخر حساب:{" "}
      {clock === null
        ? "—"
        : dateText(activePivot?.calculated_at)}
    </span>
  </div>

</div>

{/* ============================================================
    HISTORICAL REFERENCE PRICE — BOTTOM OF SECTION
    THIS IS NOT A LIVE MARKET PRICE
============================================================ */}
<div className="border-t border-slate-200 bg-white px-4 py-3 sm:px-6">

  <div className="flex flex-wrap items-center justify-between gap-3">

    <div className="min-w-0">
      <p className="text-[11px] font-black text-[#153b69]">
        السعر المرجعي للشمعة المحسوبة — {shortSymbol}
      </p>

      <p className="mt-1 text-[10px] leading-5 text-slate-500">
        سعر تاريخي استخدمه نظام التحليل الفني عند حساب المؤشرات،
        وليس السعر الحالي أو المباشر للأداة المالية.
      </p>
    </div>

    <div className="shrink-0 text-left">
      <p
        dir="ltr"
        className="text-[17px] font-black tabular-nums text-[#103c77]"
      >
        {ready ? priceText(activeTechnical?.price) : "—"}
      </p>
    </div>

  </div>

</div>

{/* ============================================================
    COMPACT EXPLANATORY NOTE
============================================================ */}
<div className="border-t border-slate-200 bg-[#f8faff] px-4 py-2.5 sm:px-6">

  <div className="flex items-start gap-2">

    <span className="shrink-0 text-[12px] text-blue-600">
      ⓘ
    </span>

    <p className="text-[10px] leading-5 text-slate-600 sm:text-[11px]">
      <strong className="text-[#153b69]">
        ملاحظة حول فترات الحساب:
      </strong>{" "}
      تعتمد مستويات Pivot على الفترة اليومية لفريمي M5 وM15،
      والأسبوعية لفريمات M30 وH1 وH4،
      والشهرية لفريمي D1 وW1.
      لذلك قد تتطابق مستويات عدة فريمات بشكل طبيعي.
      التحليل وصفي وليس توصية تداول.
    </p>

  </div>

</div>

</div>
</section>

  );
}
