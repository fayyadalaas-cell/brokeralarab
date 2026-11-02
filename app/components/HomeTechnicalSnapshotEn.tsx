
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Clock3,
  Gauge,
  Layers3,
  Zap,
} from "lucide-react";

/* ============================================================
   BROKER ALARAB
   HOME TECHNICAL SNAPSHOT — ENGLISH / LTR

   1. Live quotes: broker_live_quotes (every 5 seconds)
   2. Technical indicators: selected timeframe (5 minutes)
   3. Classic Daily Pivots: D1 (independent of timeframe)
   4. Data from Supabase only — no simulated values
============================================================ */

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
  method: string;
  previous_session_open_utc?: string | null;
  current_session_open_utc?: string | null;
  previous_high?: number | string | null;
  previous_low?: number | string | null;
  previous_close?: number | string | null;
  pivot?: number | string | null;
  r1?: number | string | null;
  r2?: number | string | null;
  r3?: number | string | null;
  s1?: number | string | null;
  s2?: number | string | null;
  s3?: number | string | null;
  calculated_at_utc?: string | null;
};

type LiveQuote = {
  symbol: string;
  bid: number | string | null;
  ask?: number | string | null;
  quote_time_utc?: string | null;
};

type Props = {
  initialTechnical: HomeTechnicalRow | null;
  initialPivot: HomePivotRow | null;
  hubMode?: boolean;
};

type Timeframe =
  | "M5"
  | "M15"
  | "M30"
  | "H1"
  | "H4"
  | "D1"
  | "W1";

const TIMEFRAMES: Timeframe[] = [
  "M5",
  "M15",
  "M30",
  "H1",
  "H4",
  "D1",
  "W1",
];

const PAIRS = `
AUDCAD AUDCHF AUDJPY AUDNZD AUDUSD
CADCHF CADJPY CHFJPY
EURAUD EURCAD EURCHF EURCZK EURGBP EURHUF
EURJPY EURNOK EURNZD EURSEK EURUSD EURZAR
GBPAUD GBPCAD GBPCHF GBPJPY GBPNZD GBPUSD GBPZAR
NZDCAD NZDCHF NZDJPY NZDUSD
USDCAD USDCHF USDCZK USDDKK USDHKD USDHUF
USDJPY USDMXN USDNOK USDSEK USDZAR
`
  .trim()
  .split(/\s+/);

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

const BIAS: Record<
  string,
  { label: string; color: string }
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

/* ============================================================
   FORMATTERS
============================================================ */

function numeric(value: unknown): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
}

function priceDigits(symbol: string): number {
  if (symbol.startsWith("XAU")) return 2;
  if (symbol.startsWith("XAG")) return 3;
  if (/(JPY|HUF)c$/.test(symbol)) return 3;
  if (/CZKc$/.test(symbol)) return 4;

  return 5;
}

function priceText(
  value: unknown,
  symbol: string
): string {
  const number = numeric(value);

  if (number === null) return "—";

  const digits = priceDigits(symbol);

  return number.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function dateText(value?: string | null): string {
  if (!value) return "—";

  const timestamp = Date.parse(value);

  if (!Number.isFinite(timestamp)) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(timestamp));
}

/* ============================================================
   TECHNICAL GAUGE — ENGLISH / LTR
============================================================ */

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
            0.5 + ((buy ?? 0) - (sell ?? 0)) / (2 * total)
          )
        )
      : 0.5;

  const radius = 85;
  const cx = 120;
  const cy = 105;

  const x =
    cx - radius * Math.cos(Math.PI * position);

  const y =
    cy - radius * Math.sin(Math.PI * position);

  const arc = "M35 105 A85 85 0 0 1 205 105";

  const segments = [
    { color: "#e11d48", start: 0, size: 25 },
    { color: "#fb923c", start: 25, size: 20 },
    { color: "#cbd5e1", start: 45, size: 10 },
    { color: "#34d399", start: 55, size: 20 },
    { color: "#059669", start: 75, size: 25 },
  ];

  return (
    <div className="mx-auto w-full max-w-[245px] sm:max-w-[310px] lg:max-w-[330px]">
      <svg
        viewBox="0 0 240 140"
        className="block w-full"
        role="img"
        aria-label={`Technical rating: ${label}`}
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
            strokeDasharray={`${segment.size} ${100 - segment.size}`}
            strokeDashoffset={-segment.start}
            pathLength="100"
          />
        ))}

        {total > 0 && (
          <>
            <circle
              cx={x}
              cy={y}
              r="9"
              fill="white"
            />
            <circle
              cx={x}
              cy={y}
              r="5"
              fill={color}
            />
          </>
        )}

        <text
          x="120"
          y="62"
          textAnchor="middle"
          fill="#64748b"
          fontSize="11"
          fontWeight="700"
        >
          Technical Rating
        </text>

        <text
          x="120"
          y="89"
          textAnchor="middle"
          fill={color}
          fontSize="22"
          fontWeight="900"
        >
          {label}
        </text>

        <text
          x="120"
          y="109"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
        >
          {total > 0
            ? `${total} Technical Signals`
            : "No Signals Available"}
        </text>
      </svg>

      <div className="-mt-1 flex justify-between px-3 text-[10px] font-black">
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

/* ============================================================
   DAILY LEVEL — ENGLISH
============================================================ */

function DailyLevel({
  level,
  value,
  symbol,
}: {
  level: string;
  value: number | null;
  symbol: string;
}) {
  const resistance = level.startsWith("R");
  const support = level.startsWith("S");

  const style = resistance
    ? "border-emerald-100 bg-emerald-50/70"
    : support
      ? "border-rose-100 bg-rose-50/70"
      : "border-blue-200 bg-blue-50";

  const textColor = resistance
    ? "text-emerald-700"
    : support
      ? "text-rose-700"
      : "text-blue-700";

  const badge = resistance
    ? "bg-emerald-100 text-emerald-800"
    : support
      ? "bg-rose-100 text-rose-800"
      : "bg-blue-100 text-blue-800";

  return (
    <div
      className={`
        flex min-w-0 flex-col items-center justify-center
        gap-2 rounded-xl border px-1.5 py-3
        sm:px-2 sm:py-3
        lg:flex-row lg:justify-between lg:px-3
        ${style}
      `}
    >
      <span
        className={`
          inline-flex h-6 min-w-7 items-center justify-center
          rounded-md px-1 text-[10px] font-black
          lg:h-8 lg:min-w-9 lg:rounded-lg
          ${badge}
        `}
      >
        {level}
      </span>

      <span
        className={`
          min-w-0 whitespace-nowrap text-center
          text-[12px] font-black tabular-nums
          sm:text-[13px] lg:text-[15px]
          ${textColor}
        `}
      >
        {priceText(value, symbol)}
      </span>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function HomeTechnicalSnapshotEn({
  initialTechnical,
  initialPivot,
  hubMode = false,
}: Props) {
  const [symbol, setSymbol] = useState("XAUUSDc");

  const [timeframe, setTimeframe] =
    useState<Timeframe>("H1");

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
      initialPivot.method?.toLowerCase() === "classic"
        ? initialPivot
        : null
    );

  const [quote, setQuote] =
    useState<LiveQuote | null>(null);

  const activeTechnical =
    technical?.symbol === symbol &&
    technical.timeframe === timeframe
      ? technical
      : null;

  const activePivot =
    pivot?.symbol === symbol &&
    pivot.method?.toLowerCase() === "classic"
      ? pivot
      : null;

  const activeQuote =
    quote?.symbol === symbol
      ? quote
      : null;

  /* ============================================================
     SUPABASE CONFIG
  ============================================================ */

  function supabaseConfig() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      throw new Error("Supabase configuration unavailable");
    }

    return {
      base: url.replace(/\/$/, ""),
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    };
  }

  /* ============================================================
     LIVE QUOTES — EVERY 5 SECONDS
  ============================================================ */

  useEffect(() => {
    let cancelled = false;
    let running = false;

    async function loadQuote() {
      if (running) return;
      if (document.visibilityState !== "visible") return;

      running = true;

      try {
        const { base, headers } = supabaseConfig();

        const endpoint = new URL(
          `${base}/rest/v1/broker_live_quotes`
        );

        endpoint.searchParams.set(
          "select",
          "symbol,bid,ask,quote_time_utc"
        );

        endpoint.searchParams.set(
          "symbol",
          `eq.${symbol}`
        );

        endpoint.searchParams.set("limit", "1");

        const response = await fetch(
          endpoint.toString(),
          {
            headers,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Live Quote HTTP ${response.status}`
          );
        }

        const rows: LiveQuote[] =
          await response.json();

        if (!cancelled) {
          setQuote(
            rows.find(
              (row) => row.symbol === symbol
            ) ?? null
          );
        }
      } catch (error) {
        console.error("English home live quote:", error);

        if (!cancelled) {
          setQuote(null);
        }
      } finally {
        running = false;
      }
    }

    setQuote(null);
    void loadQuote();

    const interval = window.setInterval(
      () => void loadQuote(),
      5000
    );

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void loadQuote();
      }
    };

    document.addEventListener(
      "visibilitychange",
      onVisible
    );

    return () => {
      cancelled = true;

      window.clearInterval(interval);

      document.removeEventListener(
        "visibilitychange",
        onVisible
      );
    };
  }, [symbol]);

  /* ============================================================
     TECHNICAL ANALYSIS — SELECTED TIMEFRAME
  ============================================================ */

  useEffect(() => {
    let cancelled = false;
    let running = false;

    async function loadTechnical() {
      if (running) return;
      running = true;

      try {
        const { base, headers } = supabaseConfig();

        const endpoint = new URL(
          `${base}/rest/v1/broker_technical_analysis_latest`
        );

        endpoint.searchParams.set("select", "*");
        endpoint.searchParams.set(
          "symbol",
          `eq.${symbol}`
        );
        endpoint.searchParams.set(
          "timeframe",
          `eq.${timeframe}`
        );
        endpoint.searchParams.set("limit", "1");

        const response = await fetch(
          endpoint.toString(),
          {
            headers,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Technical HTTP ${response.status}`
          );
        }

        const rows: HomeTechnicalRow[] =
          await response.json();

        if (!cancelled) {
          setTechnical(rows[0] ?? null);
        }
      } catch (error) {
        console.error("English home technical:", error);

        if (!cancelled) {
          setTechnical(null);
        }
      } finally {
        running = false;
      }
    }

    void loadTechnical();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadTechnical();
      }
    }, 5 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [symbol, timeframe]);

  /* ============================================================
     DAILY CLASSIC PIVOTS — ALWAYS D1
  ============================================================ */

  useEffect(() => {
    let cancelled = false;
    let running = false;

    async function loadDailyPivot() {
      if (running) return;
      running = true;

      try {
        const { base, headers } = supabaseConfig();

        const endpoint = new URL(
          `${base}/rest/v1/broker_daily_pivot_levels_latest`
        );

        endpoint.searchParams.set(
          "select",
          "symbol,method,pivot,r1,r2,r3,s1,s2,s3,calculated_at_utc"
        );

        endpoint.searchParams.set(
          "symbol",
          `eq.${symbol}`
        );

        endpoint.searchParams.set(
          "method",
          "eq.classic"
        );

        endpoint.searchParams.set("limit", "1");

        const response = await fetch(
          endpoint.toString(),
          {
            headers,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Daily Pivot HTTP ${response.status}`
          );
        }

        const rows: HomePivotRow[] =
          await response.json();

        if (!cancelled) {
          setPivot(rows[0] ?? null);
        }
      } catch (error) {
        console.error(
          "English home daily pivot:",
          error
        );

        if (!cancelled) {
          setPivot(null);
        }
      } finally {
        running = false;
      }
    }

    void loadDailyPivot();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadDailyPivot();
      }
    }, 60 * 1000);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void loadDailyPivot();
      }
    };

    document.addEventListener(
      "visibilitychange",
      onVisible
    );

    return () => {
      cancelled = true;

      window.clearInterval(interval);

      document.removeEventListener(
        "visibilitychange",
        onVisible
      );
    };
  }, [symbol]);

  /* ============================================================
     DATA INTERPRETATION
  ============================================================ */

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

  const livePrice =
    numeric(activeQuote?.bid);

  const levels = useMemo<
    Record<string, number | null>
  >(
    () => ({
      P: numeric(activePivot?.pivot),
      R1: numeric(activePivot?.r1),
      R2: numeric(activePivot?.r2),
      R3: numeric(activePivot?.r3),
      S1: numeric(activePivot?.s1),
      S2: numeric(activePivot?.s2),
      S3: numeric(activePivot?.s3),
    }),
    [activePivot]
  );

  const pivotValue = levels.P;

  const pivotPosition =
    livePrice === null || pivotValue === null
      ? "Unavailable"
      : livePrice > pivotValue
        ? "Above Pivot"
        : livePrice < pivotValue
          ? "Below Pivot"
          : "At Pivot";

  const pivotPositionColor =
    livePrice === null || pivotValue === null
      ? "text-slate-500"
      : livePrice > pivotValue
        ? "text-emerald-700"
        : livePrice < pivotValue
          ? "text-rose-700"
          : "text-blue-700";

  const nearestLevel =
    livePrice === null
      ? null
      : Object.entries(levels)
          .filter(
            (entry): entry is [string, number] =>
              entry[1] !== null
          )
          .sort(
            (a, b) =>
              Math.abs(a[1] - livePrice) -
              Math.abs(b[1] - livePrice)
          )[0] ?? null;

  const signalItems = [
    {
      label: "Buy",
      value: buy,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      bar: "bg-emerald-500",
    },
    {
      label: "Neutral",
      value: neutral,
      color: "text-slate-600",
      bg: "bg-slate-100",
      bar: "bg-slate-400",
    },
    {
      label: "Sell",
      value: sell,
      color: "text-rose-700",
      bg: "bg-rose-50",
      bar: "bg-rose-500",
    },
  ];

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    
<section
  id="home-technical-analysis"
  aria-labelledby="home-technical-title"
  dir="ltr"
  className={
    hubMode
      ? "w-full max-w-none px-0 py-0"
      : "mx-auto w-full max-w-7xl px-0 py-2.5 sm:py-3"
  }
>
  <div
    className={
      hubMode
        ? "w-full overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]"
        : "overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.055)]"
    }
  >

        
{/* =====================================================
    HEADER — HOMEPAGE / TECHNICAL HUB
===================================================== */}

<div
  className={
    hubMode
      ? "px-4 py-5 text-white sm:px-7 sm:py-6"
      : "border-b border-slate-100 bg-gradient-to-b from-[#f8fbff] to-[#eef5ff] px-4 py-3.5 text-center sm:bg-gradient-to-r sm:from-[#f8fbff] sm:via-white sm:to-[#eef5ff] sm:px-6 lg:py-4 lg:text-left"
  }
  style={
    hubMode
      ? {
          background:
            "linear-gradient(110deg,#205895 0%,#143b6c 45%,#091d36 100%)",
        }
      : undefined
  }
>
  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

    <div className="min-w-0 flex-1">

      {/* SECTION BADGE */}

      <span
        className={
          hubMode
            ? "inline-flex items-center gap-1.5 text-[10px] font-black tracking-wide text-blue-200"
            : "inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-500 shadow-sm sm:text-[12px]"
        }
      >
        Market Technical Analysis Center
      </span>

      {/* SECTION TITLE */}

      <h2
        id="home-technical-title"
        className={
          hubMode
            ? "mt-2 text-[20px] font-black leading-[1.45] text-white sm:text-[27px]"
            : "mx-auto mt-3 max-w-[320px] text-[26px] font-black leading-[1.3] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] sm:leading-[1.2] lg:mx-0 lg:text-[36px]"
        }
      >
        Technical Analysis for Markets & Currencies
      </h2>

      {/* MOBILE / HUB DESCRIPTION */}

      <p
        className={
          hubMode
            ? "mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7"
            : "mx-auto mt-1.5 max-w-[430px] text-[11px] font-semibold leading-5 text-slate-600 sm:text-[13px] sm:leading-6 lg:hidden"
        }
      >
        Track live quotes, technical ratings, and daily
        support and resistance levels for gold,
        silver, and currency pairs.
      </p>

      {/* HOMEPAGE DESKTOP DESCRIPTION */}

      {!hubMode && (
        <p className="mt-2.5 hidden w-full text-[15px] font-semibold leading-8 text-slate-600 lg:block">
          Monitor current prices, technical indicators
          across seven timeframes, and daily Classic Pivot
          support and resistance levels.
        </p>
      )}

    </div>

    {/* DESKTOP CTA — HOMEPAGE ONLY */}

    {!hubMode && (
      <div className="hidden shrink-0 lg:flex lg:pb-1">
        <Link
          href="/en/technical-analysis"
          className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
        >
          Explore Technical Analysis
        </Link>
      </div>
    )}

  </div>
</div>


        {/* =====================================================
            MARKET CONTROLS
        ===================================================== */}

        <div className="border-b border-slate-100 bg-white px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">

            <div className="grid grid-cols-[minmax(0,1fr)_90px] gap-2 sm:grid-cols-[minmax(0,1fr)_110px] sm:gap-3 lg:w-[520px]">

              <label className="block min-w-0">
                <span className="mb-1.5 block text-[10px] font-black text-[#173b70] sm:text-[11px]">
                  Financial Instrument
                </span>

                <select
                  value={symbol}
                  onChange={(event) =>
                    setSymbol(event.target.value)
                  }
                  className="h-10 w-full min-w-0 rounded-xl border border-slate-200 bg-[#fbfdff] px-2 text-[11px] font-bold text-[#102b50] outline-none transition focus:border-brand-500 sm:h-11 sm:px-3 sm:text-[12px]"
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

              <label className="block min-w-0">
                <span className="mb-1.5 block text-[10px] font-black text-[#173b70] sm:text-[11px]">
                  Timeframe
                </span>

                <select
                  value={timeframe}
                  onChange={(event) =>
                    setTimeframe(
                      event.target.value as Timeframe
                    )
                  }
                  className="h-10 w-full rounded-xl border border-slate-200 bg-[#fbfdff] px-2 text-center text-[11px] font-black text-[#102b50] outline-none transition focus:border-brand-500 sm:h-11 sm:text-[12px]"
                >
                  {TIMEFRAMES.map((tf) => (
                    <option key={tf} value={tf}>
                      {tf}
                    </option>
                  ))}
                </select>
              </label>

            </div>

            {/* CURRENT PRICE */}

            <div className="flex h-11 min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-[#fbfdff] px-3 sm:px-4 lg:min-w-[235px]">
              <span className="flex items-center gap-2 whitespace-nowrap text-[11px] font-black text-[#173b70]">
                <Zap
                  size={15}
                  className="text-brand-500"
                />
                Current Price
              </span>

              <strong className="text-[19px] font-black tabular-nums text-brand-600">
                {priceText(livePrice, symbol)}
              </strong>
            </div>

          </div>
        </div>

        {/* =====================================================
            MARKET SUMMARY — HIDDEN ON MOBILE
        ===================================================== */}

        <div className="hidden border-b border-slate-100 bg-white px-3 py-3 sm:block sm:px-5 lg:hidden">
          <div className="grid grid-cols-3 gap-2">

            <div className="min-w-0 rounded-[14px] border border-slate-200 bg-[#fbfdff] p-2.5 text-center">
              <p className="text-[10px] font-bold text-slate-500">
                Technical Rating
              </p>

              <p
                className="mt-1 text-[12px] font-black sm:text-[15px]"
                style={{ color: gaugeColor }}
              >
                {gaugeLabel}
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                {timeframe}
              </p>
            </div>

            <div className="min-w-0 rounded-[14px] border border-slate-200 bg-[#fbfdff] p-2.5 text-center">
              <p className="text-[10px] font-bold text-slate-500">
                Price vs. Pivot
              </p>

              <p
                className={`mt-1 text-[12px] font-black sm:text-[15px] ${pivotPositionColor}`}
              >
                {pivotPosition}
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                Classic · D1
              </p>
            </div>

            <div className="min-w-0 rounded-[14px] border border-slate-200 bg-[#fbfdff] p-2.5 text-center">
              <p className="text-[10px] font-bold text-slate-500">
                Nearest Level
              </p>

              <p className="mt-1 text-[12px] font-black tabular-nums text-brand-600 sm:text-[15px]">
                {nearestLevel
                  ? priceText(nearestLevel[1], symbol)
                  : "—"}
              </p>

              <p className="mt-1 text-[9px] font-bold text-slate-400">
                {nearestLevel?.[0] ?? "—"}
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================
            MAIN DASHBOARD
        ===================================================== */}

        <div className="bg-white p-2.5 sm:p-5">
          <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-12">

            {/* TECHNICAL RATING */}

            <div className="flex min-w-0 flex-col rounded-2xl border border-[#dce6f3] bg-gradient-to-b from-white to-[#f8fbff] p-3 sm:p-4 lg:col-span-4">

              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-[14px] font-black text-[#102b50]">
                  <Gauge
                    size={17}
                    className="text-blue-600"
                  />
                  Technical Rating
                </h3>

                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700">
                  {timeframe}
                </span>
              </div>

              <div className="flex flex-1 items-center justify-center py-1 sm:py-3">
                <TechnicalGauge
                  buy={buy}
                  sell={sell}
                  neutral={neutral}
                  label={gaugeLabel}
                  color={gaugeColor}
                />
              </div>

              <div className="border-t border-slate-200 pt-3 text-center text-[11px] text-slate-500">
                Indicator rating on the {timeframe} timeframe
              </div>

            </div>

            {/* INDICATOR DISTRIBUTION */}

            <div className="flex min-w-0 flex-col rounded-2xl border border-[#dce6f3] bg-white p-3 sm:p-4 lg:col-span-3">

              <div className="flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-[14px] font-black text-[#102b50]">
                  <BarChart3
                    size={17}
                    className="text-blue-600"
                  />
                  Indicator Signals
                </h3>

                <span className="text-[10px] font-bold text-slate-500">
                  Total: {total || "—"}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-5">
                {signalItems.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl px-2 py-3 text-center ${item.bg}`}
                  >
                    <p className={`text-[26px] font-black ${item.color}`}>
                      {item.value ?? "—"}
                    </p>

                    <p className={`mt-1 text-[11px] font-bold ${item.color}`}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-slate-100">
                {signalItems.map((item) => (
                  <div
                    key={item.label}
                    className={item.bar}
                    style={{
                      width:
                        total > 0
                          ? `${((item.value ?? 0) / total) * 100}%`
                          : "0%",
                    }}
                  />
                ))}
              </div>

              <div className="mt-5 hidden flex-1 flex-col justify-evenly gap-4 sm:flex">
                {signalItems.map((item) => {
                  const percent =
                    total > 0
                      ? ((item.value ?? 0) / total) * 100
                      : 0;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2"
                    >
                      <span className={`w-12 text-[10px] font-bold ${item.color}`}>
                        {item.label}
                      </span>

                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${item.bar}`}
                          style={{
                            width: `${percent}%`,
                          }}
                        />
                      </div>

                      <span className="w-9 text-right text-[10px] font-black text-slate-600">
                        {total > 0
                          ? `${Math.round(percent)}%`
                          : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 hidden border-t border-slate-100 pt-3 text-center text-[10px] text-slate-500 sm:block">
                Technical indicator signal distribution
              </div>

            </div>

            {/* DAILY PIVOT PANEL */}

            <div className="min-w-0 overflow-hidden rounded-2xl border border-[#cddcf0] bg-white lg:col-span-5">

              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#dce6f3] bg-[#f7faff] px-4 py-3">
                <div>
                  <h3 className="flex items-center gap-2 text-[14px] font-black text-[#102b50]">
                    <Layers3
                      size={17}
                      className="text-blue-600"
                    />
                    Daily Pivot Points
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Support and resistance levels based on
                    the previous daily candle
                  </p>
                </div>

                <span className="rounded-lg border border-blue-100 bg-white px-2.5 py-1.5 text-[10px] font-black text-blue-700">
                  Classic · D1
                </span>
              </div>

              <div className="space-y-3 p-3 sm:p-4">

                {/* RESISTANCE LEVELS */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-emerald-700">
                      Resistance Levels
                    </span>

                    <span className="text-[10px] text-slate-400">
                      R1 — R3
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:grid-cols-1 xl:grid-cols-3">
                    {(["R1", "R2", "R3"] as const).map(
                      (level) => (
                        <DailyLevel
                          key={level}
                          level={level}
                          value={levels[level]}
                          symbol={symbol}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* DAILY PIVOT */}

                <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-[#edf5ff] to-[#f7fbff] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#205bbb] text-[12px] font-black text-white">
                        P
                      </span>

                      <div>
                        <p className="text-[12px] font-black text-[#173b70]">
                          Daily Pivot Point
                        </p>

                        <p className="mt-0.5 text-[9px] text-blue-500">
                          Classic Pivot
                        </p>
                      </div>
                    </div>

                    <span className="text-[17px] font-black tabular-nums text-[#1558be]">
                      {priceText(levels.P, symbol)}
                    </span>

                  </div>
                </div>

                {/* SUPPORT LEVELS */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-black text-rose-700">
                      Support Levels
                    </span>

                    <span className="text-[10px] text-slate-400">
                      S1 — S3
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:grid-cols-1 xl:grid-cols-3">
                    {(["S1", "S2", "S3"] as const).map(
                      (level) => (
                        <DailyLevel
                          key={level}
                          level={level}
                          value={levels[level]}
                          symbol={symbol}
                        />
                      )
                    )}
                  </div>
                </div>

              </div>

              {/* PIVOT UPDATE TIME */}

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e2eaf4] bg-[#f8fbff] px-4 py-3">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                  <CalendarDays size={13} />
                  Last Daily Pivot Calculation
                </span>

                <span className="text-[10px] font-black text-[#17498c]">
                  {dateText(
                    activePivot?.calculated_at_utc
                  )}
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* =====================================================
            INFORMATION FOOTER
        ===================================================== */}

        <div className="border-t border-[#dce6f3] bg-[#f7faff] px-3 py-3 sm:px-6">

          {/* DESKTOP INFORMATION */}

          <div className="hidden flex-col gap-2 text-[11px] leading-6 text-slate-500 sm:flex">
            <div className="flex flex-wrap items-center gap-2">
              <Clock3
                size={14}
                className="text-blue-600"
              />

              <strong className="text-[#173b70]">
                Market Data & Technical Analysis
              </strong>

              <span>
                Live quotes are checked every 5 seconds.
                Daily pivot levels are calculated using
                the previous reference candle.
              </span>
            </div>

            <p>
              Daily support and resistance levels are based
              on the Classic Pivot method and remain
              unchanged until the next daily levels are published.
              Technical ratings depend on the selected timeframe.
              This information is provided for educational and
              analytical purposes only and does not constitute
              trading or investment advice.
            </p>
          </div>

          {/* MOBILE INFORMATION */}

          <details className="group sm:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[11px] font-black text-[#173b70]">
              <span className="flex items-center gap-2">
                <Clock3
                  size={14}
                  className="text-blue-600"
                />
                Data & Calculation Methodology
              </span>

              <ChevronDown
                size={15}
                className="transition-transform group-open:rotate-180"
              />
            </summary>

            <div className="mt-3 space-y-2 border-t border-slate-200 pt-3 text-[11px] leading-6 text-slate-500">
              <p>
                Live quotes are checked every 5 seconds
                while the page is active. Daily pivot levels
                are derived from the previous reference
                candle using the Classic Pivot method.
              </p>

              <p>
                Technical ratings depend on the selected
                timeframe. Data is provided for analytical
                and educational purposes and is not
                trading advice.
              </p>
            </div>
          </details>

        </div>

        
{/* =====================================================
    MOBILE CTA — HOMEPAGE ONLY
===================================================== */}

{!hubMode && (
  <div className="border-t border-slate-100 bg-white px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4 lg:hidden">
    <Link
      href="/en/technical-analysis"
      className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-brand-500 px-4 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)] transition duration-300 hover:bg-brand-600 sm:h-11 sm:text-[12px]"
    >
      Explore Technical Analysis Center
    </Link>
  </div>
)}

    </div>
  </section>
);
}
