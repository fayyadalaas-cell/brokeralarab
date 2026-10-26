
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

const TIMEFRAMES = ["M5", "M15", "M30", "H1", "H4", "D1", "W1"];

const BIAS: Record<string, { label: string; color: string }> = {
  STRONG_BUY: { label: "شراء قوي", color: "#059669" },
  BUY_BIAS: { label: "شراء", color: "#059669" },
  MIXED: { label: "محايد", color: "#64748b" },
  SELL_BIAS: { label: "بيع", color: "#e11d48" },
  STRONG_SELL: { label: "بيع قوي", color: "#e11d48" },
};

function numeric(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function priceText(value: unknown) {
  const n = numeric(value);
  if (n === null) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  });
}

function dateText(value?: string | null) {
  if (!value) return "غير متاح";
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return "غير متاح";

  return new Intl.DateTimeFormat("ar", {
    timeZone: "America/Toronto",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(time));
}

export default function HomeTechnicalSnapshot({
  initialTechnical,
  initialPivot,
}: Props) {
  const [symbol, setSymbol] = useState("XAUUSDc");
  const [timeframe, setTimeframe] = useState("H1");

  const [technical, setTechnical] = useState<HomeTechnicalRow | null>(
    initialTechnical?.symbol === "XAUUSDc" &&
    initialTechnical?.timeframe === "H1"
      ? initialTechnical
      : null
  );

  const [pivot, setPivot] = useState<HomePivotRow | null>(
    initialPivot?.symbol === "XAUUSDc" &&
    initialPivot?.timeframe === "H1"
      ? initialPivot
      : null
  );

  const [loading, setLoading] = useState(false);
  const [refreshError, setRefreshError] = useState(false);
  const [clock, setClock] = useState<number | null>(null);

  const selectedInstrument =
    INSTRUMENTS.find((item) => item.symbol === symbol) ?? INSTRUMENTS[0];

  const shortSymbol =
    symbol.replace(/c$/, "").replace(/^(.{3})(.{3})$/, "$1/$2");

  const technicalMatches =
    technical?.symbol === symbol && technical?.timeframe === timeframe;

  const pivotMatches =
    pivot?.symbol === symbol &&
    pivot?.timeframe === timeframe &&
    pivot?.method === "classic";

  const activeTechnical = technicalMatches ? technical : null;
  const activePivot = pivotMatches ? pivot : null;

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

        if (!url || !key) throw new Error("Supabase configuration missing");

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

        const [techResponse, pivotResponse] = await Promise.all([
          fetch(technicalUrl.toString(), {
            headers,
            cache: "no-store",
            signal: currentController.signal,
          }),
          fetch(pivotUrl.toString(), {
            headers,
            cache: "no-store",
            signal: currentController.signal,
          }),
        ]);

        if (!techResponse.ok || !pivotResponse.ok) {
          throw new Error("Could not load analysis");
        }

        const [techRows, pivotRows]: [
          HomeTechnicalRow[],
          HomePivotRow[]
        ] = await Promise.all([
          techResponse.json(),
          pivotResponse.json(),
        ]);

        if (cancelled || currentController.signal.aborted) return;

        setTechnical(techRows[0] ?? null);
        setPivot(pivotRows[0] ?? null);
        setRefreshError(false);
        setClock(Date.now());
      } catch {
        if (!cancelled && !currentController.signal.aborted) {
          setRefreshError(true);
        }
      } finally {
        if (!cancelled && !currentController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    // Keep server-rendered default visible immediately.
    // Fetch new data when selection changes or at the next refresh.
    if (symbol !== "XAUUSDc" || timeframe !== "H1") {
      void refresh();
    }

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
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

  const gaugePosition =
    total > 0 && buy !== null && sell !== null
      ? Math.max(0, Math.min(1, 0.5 + (buy - sell) / (2 * total)))
      : 0.5;

  const pointerX = 180 - 145 * Math.cos(Math.PI * gaugePosition);
  const pointerY = 185 - 145 * Math.sin(Math.PI * gaugePosition);

  const levels = activePivot?.levels ?? null;

  const technicalTime =
    activeTechnical?.candle_close_utc ??
    activeTechnical?.calculated_at_utc ??
    null;

  const validTime = technicalTime ? Date.parse(technicalTime) : NaN;
  const age = clock !== null ? clock - validTime : NaN;

  const isFresh =
    ready &&
    Number.isFinite(age) &&
    age >= -120000 &&
    age <= 130 * 60000;

  function changeSelection(nextSymbol: string, nextTimeframe: string) {
    setSymbol(nextSymbol);
    setTimeframe(nextTimeframe);
    setRefreshError(false);
  }

  const voteItems = [
    { label: "شراء", value: buy, color: "emerald" },
    { label: "محايد", value: neutral, color: "slate" },
    { label: "بيع", value: sell, color: "rose" },
  ];

  return (
    <section
      id="home-technical-analysis"
      aria-labelledby="home-technical-title"
      dir="rtl"
      className="mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3"
    >
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)]">

        {/* HEADER */}
        <div className="border-b border-slate-100 bg-gradient-to-l from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 lg:py-5">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="min-w-0 flex-1 text-center lg:text-right">
              <span className="inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-black text-blue-600 shadow-sm">
                مركز التحليل الفني للأسواق
              </span>

              <h2
                id="home-technical-title"
                className="mt-2.5 text-[26px] font-black leading-tight text-[#07111f] sm:text-[34px] lg:text-[36px]"
              >
                التحليل الفني للأسواق والعملات
              </h2>

              <p className="mt-2 text-[12px] font-semibold leading-6 text-slate-600 sm:text-[14px]">
                استكشف التقييم الفني ومؤشرات الشراء والبيع ومستويات الدعم
                والمقاومة للذهب والفضة وأزواج الفوركس عبر سبعة أطر زمنية.
              </p>
            </div>

            <Link
              href="/technical-analysis"
              className="hidden h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-lg transition hover:bg-brand-600 lg:inline-flex"
            >
              استكشف مركز التحليل ←
            </Link>
          </div>
        </div>

        {/* SELECTORS */}
        <div className="border-b border-[#dce7f5] bg-[#f7faff] px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="grid w-full grid-cols-1 gap-3 sm:max-w-[550px] sm:grid-cols-[minmax(0,1fr)_155px]">
              <label className="block min-w-0">
                <span className="mb-1.5 block text-[11px] font-black text-[#173b70]">
                  اختر الأداة المالية
                </span>
                <select
                  aria-label="اختر الأداة المالية"
                  value={symbol}
                  onChange={(e) => changeSelection(e.target.value, timeframe)}
                  className="h-11 w-full rounded-xl border border-blue-200 bg-white px-3 text-[12px] font-bold text-[#102b50] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {INSTRUMENTS.map((item) => (
                    <option key={item.symbol} value={item.symbol}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-black text-[#173b70]">
                  الإطار الزمني
                </span>
                <select
                  aria-label="اختر الإطار الزمني"
                  dir="ltr"
                  value={timeframe}
                  onChange={(e) => changeSelection(symbol, e.target.value)}
                  className="h-11 w-full rounded-xl border border-blue-200 bg-white px-3 text-center text-[12px] font-black text-[#102b50] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {TIMEFRAMES.map((tf) => (
                    <option key={tf} value={tf}>
                      {tf}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="rounded-lg border border-blue-100 bg-white px-3 py-2 text-[11px] font-black text-blue-700">
                {shortSymbol}
              </span>

              <span
                className={`rounded-full border px-3 py-1.5 text-[10px] font-black ${
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
                  ? "جاري تحديث التحليل..."
                  : refreshError
                  ? "تعذر التحديث"
                  : isFresh
                  ? "● بيانات حديثة"
                  : "بيانات دورية"}
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2">

          {/* TECHNICAL RATING */}
          <div className="min-w-0 border-b border-slate-200 bg-white p-3 sm:p-5 lg:border-b-0 lg:border-l lg:p-6">
            <div className="h-full rounded-[20px] border border-[#dce7f5] bg-[#fbfdff] p-3 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[18px] font-black text-[#102b50] sm:text-[21px]">
                    ملخص التقييم الفني
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    نتيجة المؤشرات على الإطار الزمني {timeframe}
                  </p>
                </div>

                <span className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700">
                  {timeframe}
                </span>
              </div>

              {/* LARGE GAUGE */}
              <div className="mx-auto mt-4 w-full max-w-[440px]">
                <svg
                  viewBox="0 0 360 230"
                  role="img"
                  aria-label={`التقييم الفني: ${bias?.label ?? "غير متاح"}`}
                  className="block h-auto w-full"
                >
                  <path
                    d="M35 185 A145 145 0 0 1 325 185"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                  {[
                    ["#e11d48", "25 75", "0"],
                    ["#fb923c", "20 80", "-25"],
                    ["#cbd5e1", "20 80", "-45"],
                    ["#10b981", "35 65", "-65"],
                  ].map(([color, dash, offset]) => (
                    <path
                      key={color}
                      d="M35 185 A145 145 0 0 1 325 185"
                      fill="none"
                      stroke={color}
                      strokeWidth="24"
                      strokeDasharray={dash}
                      strokeDashoffset={offset}
                      pathLength="100"
                    />
                  ))}

                  <circle
                    cx={pointerX}
                    cy={pointerY}
                    r="13"
                    fill="white"
                    stroke="#64748b"
                    strokeWidth="5"
                  />
                  <circle cx={pointerX} cy={pointerY} r="4" fill="#64748b" />

                  <text
                    x="180"
                    y="128"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    التقييم الفني
                  </text>
                  <text
                    x="180"
                    y="163"
                    textAnchor="middle"
                    fontSize="30"
                    fontWeight="900"
                    fill={bias?.color ?? "#64748b"}
                  >
                    {loading ? "جاري التحميل" : bias?.label ?? "غير متاح"}
                  </text>
                </svg>

                <div className="-mt-2 flex justify-between px-3 text-[10px] font-bold">
                  <span className="text-emerald-600">● شراء</span>
                  <span className="text-slate-500">● محايد</span>
                  <span className="text-rose-600">● بيع</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {voteItems.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl border px-2 py-3 text-center ${
                      item.color === "emerald"
                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                        : item.color === "rose"
                        ? "border-rose-100 bg-rose-50 text-rose-700"
                        : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  >
                    <p className="text-[25px] font-black tabular-nums">
                      {item.value ?? "—"}
                    </p>
                    <p className="text-[11px] font-bold">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-slate-100">
                {total > 0 && (
                  <>
                    <div
                      className="bg-emerald-500"
                      style={{ width: `${((buy ?? 0) / total) * 100}%` }}
                    />
                    <div
                      className="bg-slate-300"
                      style={{ width: `${((neutral ?? 0) / total) * 100}%` }}
                    />
                    <div
                      className="bg-rose-500"
                      style={{ width: `${((sell ?? 0) / total) * 100}%` }}
                    />
                  </>
                )}
              </div>

              
{/* REFERENCE PRICE + TOTAL VOTES */}
<div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-blue-100 bg-[#eef5ff] p-3.5">

  {/* REFERENCE PRICE */}
  <div className="min-w-0 text-center sm:text-right">
    <p className="text-[10px] font-bold text-slate-500">
      السعر المرجعي — {shortSymbol}
    </p>

    <p
      dir="ltr"
      className="mt-1 text-center text-[20px] font-black tabular-nums text-[#103c77] sm:text-right sm:text-[clamp(16px,2vw,27px)]"
    >
      {ready ? priceText(activeTechnical?.price) : "—"}
    </p>
  </div>

  {/* INDICATOR SIGNALS */}
  <div className="min-w-0 border-r border-blue-200 pr-2 text-center sm:pr-3 sm:text-right">
    <p className="text-[10px] font-bold text-slate-500">
      إشارات المؤشرات
    </p>

    <p className="mt-1 text-center text-[24px] font-black tabular-nums text-[#103c77] sm:text-right sm:text-[26px]">
      {total > 0 ? total : "—"}
    </p>
  </div>

</div>


              <p className="mt-3 text-[10px] leading-5 text-slate-500">
                آخر شمعة محسوبة: {dateText(technicalTime)}
              </p>
            </div>
          </div>

          {/* CLASSIC PIVOT */}
          <div className="min-w-0 bg-white p-3 sm:p-5 lg:p-6">
            <div className="h-full rounded-[20px] border border-[#dce7f5] bg-[#fbfdff] p-3 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[18px] font-black text-[#102b50] sm:text-[21px]">
                    مستويات الدعم والمقاومة
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    النقاط المحورية الكلاسيكية — Classic Pivot
                  </p>
                </div>
                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-black text-blue-700">
                  {timeframe}
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-blue-200 bg-[#eaf3ff] px-4 py-5 text-center">
                <p className="text-[11px] font-black text-[#205895]">
                  النقطة المحورية الرئيسية (P)
                </p>
                <p
                  dir="ltr"
                  className="mt-2 text-[clamp(24px,3vw,35px)] font-black tabular-nums text-[#154a87]"
                >
                  {priceText(levels?.P)}
                </p>
                <p className="mt-2 text-[10px] text-slate-500">
                  Classic Pivot · {shortSymbol} · {timeframe}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-4">
                {/* RESISTANCE */}
                <div className="min-w-0">
                  <h4 className="mb-3 text-[12px] font-black text-emerald-700">
                    ● المقاومة
                  </h4>
                  <div className="space-y-2.5">
                    {(["R1", "R2", "R3"] as const).map((key) => (
                      <div
                        key={key}
                        className="flex min-h-[55px] min-w-0 items-center justify-between gap-1 rounded-xl border border-emerald-100 bg-emerald-50 px-2 py-3 sm:px-3"
                      >
                        <span className="rounded-md bg-emerald-100 px-1.5 py-1 text-[10px] font-black text-emerald-800">
                          {key}
                        </span>
                        <span
                          dir="ltr"
                          className="min-w-0 text-[13px] font-black tabular-nums text-emerald-700 sm:text-[clamp(9px,1.4vw,15px)]"
                        >
                          {priceText(levels?.[key])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SUPPORT */}
                <div className="min-w-0">
                  <h4 className="mb-3 text-[12px] font-black text-rose-700">
                    ● الدعم
                  </h4>
                  <div className="space-y-2.5">
                    {(["S1", "S2", "S3"] as const).map((key) => (
                      <div
                        key={key}
                        className="flex min-h-[55px] min-w-0 items-center justify-between gap-1 rounded-xl border border-rose-100 bg-rose-50 px-2 py-3 sm:px-3"
                      >
                        <span className="rounded-md bg-rose-100 px-1.5 py-1 text-[10px] font-black text-rose-800">
                          {key}
                        </span>
                        <span
                          dir="ltr"
                          className="min-w-0 text-[13px] font-black tabular-nums text-rose-700 sm:text-[clamp(9px,1.4vw,15px)]"
                        >
                          {priceText(levels?.[key])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-3 text-[10px] leading-5 text-slate-500">
                <div className="flex flex-wrap justify-between gap-2">
                  <span>
                    شمعة المرجع: {dateText(activePivot?.reference_candle_time_utc)}
                  </span>
                  <span>
                    آخر حساب: {dateText(activePivot?.calculated_at)}
                  </span>
                </div>
              </div>

              <Link
                href="/technical-analysis"
                className="mt-4 flex min-h-11 w-full items-center justify-center rounded-xl border border-blue-200 bg-white px-3 text-center text-[11px] font-black text-blue-700 transition hover:bg-blue-50"
              >
                عرض جميع طرق حساب النقاط المحورية ←
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER */}
<div className="border-t border-slate-200 bg-[#f8faff] px-4 py-3 sm:px-6">
  <p className="text-center text-[11px] leading-6 text-slate-500">
    التحليل يعرض قراءات فنية وصفية من الشموع المكتملة، وليس توصيات تداول.
    تتغير النتائج عند اختيار الأداة أو الإطار الزمني.
  </p>
</div>
      </div>
    </section>
  );
}
