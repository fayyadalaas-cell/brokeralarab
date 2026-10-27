
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowUpLeft,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  ExternalLink,
  Filter,
  Gauge,
  Info,
  Layers3,
  LineChart,
  Newspaper,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   BROKER ALARAB - TECHNICAL ANALYSIS HUB
   Arabic version - dashboard interface
   No simulated prices, signals, or performance statistics.
========================================================= */

type Timeframe = "M5" | "M15" | "M30" | "H1" | "H4" | "D1" | "W1";
type Category = "all" | "forex" | "metals";
type Direction = "STRONG_BUY" | "BUY_BIAS" | "MIXED" |
  "SELL_BIAS" | "STRONG_SELL" | "DATA_INCOMPLETE";

type Instrument = {
  symbol: string;
  base: string;
  quote: string;
  slug: string;
  name: string;
  type: "forex" | "metals";
};

export type TechnicalRow = Record<string, unknown> & {
  symbol: string;
  timeframe: string;
  classification?: string;
  data_status?: string;
  price?: number | string | null;
  indicators?: Record<string, unknown> | null;
  indicator_votes?: Record<string, unknown> | null;
  calculated_at_utc?: string | null;
  candle_close_utc?: string | null;
};

export type GoldReport = {
  reference_price?: number;
  reference_time_utc?: string;
  generated_at_utc?: string;
  summary?: { ar?: string };
  support?: Array<Record<string, unknown>>;
  resistance?: Array<Record<string, unknown>>;
  scenarios?: Array<{
    id: string;
    ar: string;
    threshold?: number;
  }>;
};

type PivotPeriod = "daily" | "weekly" | "monthly";

type PivotSet = {
  method?: string;
  calculation_timeframe?: string;
  reference_candle_open_utc?: string;
  reference_ohlc?: {
    high?: number;
    low?: number;
    close?: number;
  };
  levels?: Record<string, number>;
};

type TechnicalLevelsRow = {
  symbol: string;
  timeframe: Timeframe;
  reference_price: number;
  reference_time_utc: string;
  support: Array<Record<string, unknown>>;
  resistance: Array<Record<string, unknown>>;
  inside_zones: Array<Record<string, unknown>>;
  pivot_points: {
    selected_period?: PivotPeriod;
    selected?: PivotSet;
    available?: Partial<Record<PivotPeriod, PivotSet>>;
  };
  data_status: string;
  updated_at: string;
};

const PIVOT_PERIOD_LABELS: Record<PivotPeriod, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

const PIVOT_LEVEL_ORDER = [
  "R3",
  "R2",
  "R1",
  "P",
  "S1",
  "S2",
  "S3",
] as const;

const PIVOT_LEVEL_LABELS: Record<string, string> = {
  R3: "Third Resistance",
  R2: "Second Resistance",
  R1: "First Resistance",
  P: "Central Pivot Point",
  S1: "First Support",
  S2: "Second Support",
  S3: "Third Support",
};

function getPivotSet(
  row: TechnicalLevelsRow | null,
  period: PivotPeriod
): PivotSet | null {
  if (!row?.pivot_points) return null;

  const pivots = row.pivot_points;

  const available = pivots.available?.[period];

  if (
    available?.levels &&
    typeof available.levels === "object"
  ) {
    return available;
  }

  if (
    pivots.selected_period === period &&
    pivots.selected?.levels &&
    typeof pivots.selected.levels === "object"
  ) {
    return pivots.selected;
  }

  return null;
}

function pivotStatusText(status?: string): string {
  switch (status?.toLowerCase()) {
    case "historical":
      return "Historical Data";
    case "live":
      return "Published Data — Check Timestamp";
    case "ready":
      return "Data Available — Check Timestamp";
    case "stale":
      return "Outdated Data";
    default:
      return "Data Status Unknown";
  }
}

const TIMEFRAMES: Timeframe[] = [
  "M5", "M15", "M30", "H1", "H4", "D1", "W1",
];

const RAW_PAIRS = `
AUDCAD AUDCHF AUDJPY AUDNZD AUDUSD
CADCHF CADJPY CHFJPY
EURAUD EURCAD EURCHF EURCZK EURGBP EURHUF
EURJPY EURNOK EURNZD EURSEK EURUSD EURZAR
GBPAUD GBPCAD GBPCHF GBPJPY GBPNZD GBPUSD GBPZAR
NZDCAD NZDCHF NZDJPY NZDUSD
USDCAD USDCHF USDCZK USDDKK USDHKD USDHUF
USDJPY USDMXN USDNOK USDSEK USDZAR
`.trim().split(/\s+/);

const INSTRUMENTS: Instrument[] = [
  {
    symbol: "XAUUSDc",
    base: "XAU",
    quote: "USD",
    slug: "gold",
    name: "Gold",
    type: "metals",
  },
  {
    symbol: "XAGUSDc",
    base: "XAG",
    quote: "USD",
    slug: "silver",
    name: "Silver",
    type: "metals",
  },
  ...RAW_PAIRS.map((pair) => ({
    symbol: `${pair}c`,
    base: pair.slice(0, 3),
    quote: pair.slice(3),
    slug: `${pair.slice(0, 3).toLowerCase()}-${pair.slice(3).toLowerCase()}`,
    name: `${pair.slice(0, 3)}/${pair.slice(3)}`,
    type: "forex" as const,
  })),
];


const CURRENCY_NAMES_AR: Record<string, string> = {
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CZK: "Czech Koruna",
  DKK: "Danish Krone",
  EUR: "Euro",
  GBP: "British Pound",
  HKD: "Hong Kong Dollar",
  HUF: "Hungarian Forint",
  JPY: "Japanese Yen",
  MXN: "Mexican Peso",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  SEK: "Swedish Krona",
  USD: "US Dollar",
  ZAR: "South African Rand",
  XAU: "Gold",
  XAG: "Silver",
};

function getInstrumentArabicName(instrument: Instrument): string {
  const base =
    CURRENCY_NAMES_AR[instrument.base] || instrument.base;

  const quote =
    CURRENCY_NAMES_AR[instrument.quote] || instrument.quote;

  return `${base} / ${quote}`;
}


const DIRECTION: Record<string, {
  label: string;
  color: string;
  bar: string;
}> = {
  STRONG_BUY: {
    label: "Strong Buy",
    color: "bg-emerald-100 text-emerald-800",
    bar: "bg-emerald-600",
  },
  BUY_BIAS: {
    label: "Buy",
    color: "bg-emerald-50 text-emerald-700",
    bar: "bg-emerald-400",
  },
  MIXED: {
    label: "Neutral",
    color: "bg-slate-100 text-slate-600",
    bar: "bg-slate-400",
  },
  SELL_BIAS: {
    label: "Sell",
    color: "bg-rose-50 text-rose-700",
    bar: "bg-rose-400",
  },
  STRONG_SELL: {
    label: "Strong Sell",
    color: "bg-rose-100 text-rose-800",
    bar: "bg-rose-600",
  },
  DATA_INCOMPLETE: {
    label: "Incomplete Data",
    color: "bg-amber-50 text-amber-700",
    bar: "bg-amber-400",
  },
};

const INDICATORS = [
  { name: "Moving Averages", short: "EMA 50 / EMA 200", key: "ema" },
  { name: "Supertrend", short: "Trend Following", key: "supertrend" },
  { name: "Ichimoku", short: "Cloud System", key: "ichimoku" },
  { name: "ADX / DI", short: "Trend Strength", key: "adx" },
  { name: "RSI", short: "Relative Strength", key: "rsi" },
  { name: "MACD", short: "Momentum", key: "macd" },
  { name: "Stochastic", short: "Oscillator", key: "stochastic" },
  { name: "Bollinger Bands", short: "Volatility", key: "bollinger" },
  { name: "ATR", short: "Average True Range", key: "atr" },
  { name: "CCI", short: "Commodity Channel Index", key: "cci" },
];

const QUESTIONS = [
  {
    q: "كيف يعمل مركز التحليل الفني في بروكر العرب؟",
    a: "يعالج المحرك بيانات الشموع السعرية عبر سبعة أطر زمنية، ويحسب عشر مجموعات من المؤشرات الفنية. تعرض النتائج كقراءات وصفية، وليس كتوصيات تداول.",
  },
  {
    q: "هل الأسعار والتحليلات مباشرة؟",
    a: "لا. البيانات لقطات دورية، وليست بثاً سعرياً لحظياً. يظهر وقت آخر تحديث، ويتم التحذير عندما تتقادم البيانات.",
  },
  {
    q: "هل توافق المؤشرات يعني ضمان نجاح الصفقة؟",
    a: "لا. الاتفاق يعكس تصنيفاً فنياً وفق بيانات تاريخية، ولا يثبت قدرة الإشارة على توقع حركة السعر المستقبلية.",
  },
  {
    q: "لماذا تظهر بعض الفريمات غير مكتملة؟",
    a: "قد لا تتوفر شموع تاريخية كافية لحساب بعض المؤشرات الطويلة، مثل EMA 200، ولذلك لا يتم اعتبار الفريم غير المكتمل إشارة مؤكدة.",
  },
  {
    q: "كيف تُحسب مناطق الدعم والمقاومة؟",
    a: "يعتمد محرك الذهب على المناطق المحورية والتفاعلات التاريخية وتوافق الأطر الزمنية. درجات المنطقة وصفية وليست نسب نجاح.",
  },
];

function numberValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function formatPrice(value: unknown, digits = 4) {
  const num = numberValue(value);
  if (num === null) return "—";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function getZoneMainLevel(
  zone: Record<string, unknown>
): number | null {
  const low = numberValue(zone.low);
  const high = numberValue(zone.high);

  if (low === null || high === null) {
    return null;
  }

  if (low > high) {
    return null;
  }

  return (low + high) / 2;
}

function dateText(value: unknown) {
  if (typeof value !== "string" || !value) {
    return "Unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}


function isFresh(value: unknown, minutes = 15) {
  if (typeof value !== "string") return false;

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return false;

  const age = Date.now() - timestamp;
  return age >= -120000 && age <= minutes * 60000;
}

const CANDLE_FRESHNESS_MINUTES: Record<Timeframe, number> = {
  M5: 15,
  M15: 35,
  M30: 65,
  H1: 130,
  H4: 510,
  D1: 3000,
  W1: 12000,
};

function isAnalysisFresh(row?: TechnicalRow | null): boolean {
  if (!row || row.data_status !== "READY") return false;

  if (!TIMEFRAMES.includes(row.timeframe as Timeframe)) {
    return false;
  }

  const minutes =
    CANDLE_FRESHNESS_MINUTES[row.timeframe as Timeframe];

  return isFresh(row.candle_close_utc, minutes);
}

/* ====================================================
   ADX TREND STRENGTH — ENGLISH
   Original thresholds and colors preserved
==================================================== */

function getAdxStrength(value: number | null): {
  label: string;
  style: string;
} {
  if (value === null || !Number.isFinite(value)) {
    return {
      label: "Unavailable",
      style: "bg-slate-100 text-slate-500",
    };
  }

  if (value < 20) {
    return {
      label: "Weak",
      style: "bg-slate-100 text-slate-600",
    };
  }

  if (value < 25) {
    return {
      label: "Limited",
      style: "bg-amber-50 text-amber-700",
    };
  }

  if (value < 40) {
    return {
      label: "Established",
      style: "bg-blue-50 text-blue-700",
    };
  }

  if (value < 50) {
    return {
      label: "Strong",
      style: "bg-indigo-50 text-indigo-700",
    };
  }

  return {
    label: "Very Strong",
    style: "bg-purple-50 text-purple-700",
  };
}

/* ====================================================
   TECHNICAL DIRECTION
==================================================== */

function getDirection(row?: TechnicalRow): string {
  if (!row || row.data_status !== "READY") {
    return "DATA_INCOMPLETE";
  }

  return row.classification || "DATA_INCOMPLETE";
}

function DirectionBadge({ value }: { value: string }) {
  const info = DIRECTION[value] || DIRECTION.DATA_INCOMPLETE;

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-extrabold ${info.color}`}
    >
      {info.label}
    </span>
  );
}

/* ====================================================
   SHARED SECTION TITLE
   Preserve original responsive design
==================================================== */

function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      dir="ltr"
      className="mb-6 flex flex-wrap items-end justify-between gap-4 text-left"
    >
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-black tracking-wider text-blue-700">
            {eyebrow}
          </p>
        )}

        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-8 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

/* ====================================================
   EMPTY STATE
==================================================== */

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm leading-7 text-slate-500">
      <Info className="mx-auto mb-3" size={23} />
      {message}
    </div>
  );
}

/* ====================================================
   TECHNICAL INDICATOR VOTES
==================================================== */

const VOTE_LABELS: Record<string, string> = {
  "1": "Buy",
  "-1": "Sell",
  "0": "Neutral",
  BUY: "Buy",
  SELL: "Sell",
  NEUTRAL: "Neutral",
};

function voteText(value: unknown) {
  if (value === null || value === undefined) {
    return "Unavailable";
  }

  return VOTE_LABELS[String(value)] || String(value);
}

function extractVote(
  votes: Record<string, unknown>,
  key: string
) {
  const aliases: Record<string, string[]> = {
    ema: ["EMA", "ema", "ema_trend"],
    supertrend: ["Supertrend", "supertrend"],
    ichimoku: ["Ichimoku", "ichimoku"],
    adx: ["DI_direction", "di_direction", "ADX"],
    rsi: ["RSI", "rsi"],
    macd: ["MACD", "macd"],
    stochastic: ["Stochastic", "stochastic"],
    bollinger: ["Bollinger", "bollinger"],
    atr: ["ATR", "atr"],
    cci: ["CCI", "cci"],
  };

  for (const alias of aliases[key] || []) {
    if (votes[alias] !== undefined) {
      return votes[alias];
    }
  }

  return undefined;
}

/* ====================================================
   FEATURED BROKERS — CONTROL BY DATABASE ID
   Change the IDs only to change featured brokers
==================================================== */

const FEATURED_BROKER_IDS = [2, 25, 18, 1, 6];

const FEATURED_BROKER_LINKS: Record<number, string> = {
  2: "/en/brokers/xs",
  25: "/en/brokers/capital-com",
  18: "/en/brokers/oneroyal",
  1: "/en/brokers/exness",
  6: "/en/brokers/equiti",
};

type FeaturedBroker = {
  id: number;
  name: string;
  rating: number | null;
  logo: string | null;
  best_for: string | null;
};

/* ============================================================
   07 — CENTRAL BANK INTEREST RATES SNAPSHOT

   Source: public.interest_rates
   READ ONLY — no fabricated or estimated rates

   Broker Alarab | English | LTR | 1520px
============================================================ */

type TechnicalHubBankRate = {
  slug: string;
  bank_name_ar: string | null;
  bank_short_name_ar: string | null;
  currency_code: string | null;
  flag_emoji: string | null;
  current_rate: number | null;
  current_rate_lower: number | null;
  current_rate_upper: number | null;
  last_change_bps: number | null;
  last_decision_date: string | null;
  display_order: number | null;
};

const TECHNICAL_HUB_BANKS = [
  "fed",
  "ecb",
  "boe",
  "boj",
  "boc",
  "rba",
  "snb",
  "rbnz",
] as const;

/* ====================================================
   ENGLISH CENTRAL BANK NAMES
   Keep Arabic database field names for compatibility
==================================================== */

const TECHNICAL_HUB_BANK_FALLBACKS: Record<
  string,
  { name: string; currency: string; flag: string }
> = {
  fed: {
    name: "Federal Reserve",
    currency: "USD",
    flag: "🇺🇸",
  },
  ecb: {
    name: "European Central Bank",
    currency: "EUR",
    flag: "🇪🇺",
  },
  boe: {
    name: "Bank of England",
    currency: "GBP",
    flag: "🇬🇧",
  },
  boj: {
    name: "Bank of Japan",
    currency: "JPY",
    flag: "🇯🇵",
  },
  boc: {
    name: "Bank of Canada",
    currency: "CAD",
    flag: "🇨🇦",
  },
  rba: {
    name: "Reserve Bank of Australia",
    currency: "AUD",
    flag: "🇦🇺",
  },
  snb: {
    name: "Swiss National Bank",
    currency: "CHF",
    flag: "🇨🇭",
  },
  rbnz: {
    name: "Reserve Bank of New Zealand",
    currency: "NZD",
    flag: "🇳🇿",
  },
};

/* ====================================================
   POLICY RATE FORMATTER

   Federal Reserve:
   Show the target range where both bounds exist.

   Other central banks:
   Display the recorded rate or range without
   modifying the source values.
==================================================== */

function TechnicalHubRateValue(
  bank: TechnicalHubBankRate
): string {
  const format = (value: number | null) =>
    typeof value === "number" && Number.isFinite(value)
      ? `${value.toFixed(2)}%`
      : "—";

  if (bank.slug === "fed") {
    if (
      bank.current_rate_lower !== null &&
      bank.current_rate_upper !== null
    ) {
      return (
        `${format(bank.current_rate_lower)} – ` +
        format(bank.current_rate_upper)
      );
    }

    return format(
      bank.current_rate_upper ?? bank.current_rate
    );
  }

  if (
    bank.current_rate_lower !== null &&
    bank.current_rate_upper !== null &&
    bank.current_rate_lower !== bank.current_rate_upper
  ) {
    return (
      `${format(bank.current_rate_lower)} – ` +
      format(bank.current_rate_upper)
    );
  }

  return format(bank.current_rate);
}

/* ====================================================
   CENTRAL BANK RATE DECISION — ENGLISH
   Original calculation and colors preserved
==================================================== */

function TechnicalHubDecision(
  change: number | null
): {
  label: string;
  style: string;
  symbol: string;
} {
  if (change === null || !Number.isFinite(change)) {
    return {
      label: "Unavailable",
      style: "bg-slate-100 text-slate-600",
      symbol: "—",
    };
  }

  if (change > 0) {
    return {
      label: `Rate Hike: ${change} bps`,
      style: "bg-rose-50 text-rose-700",
      symbol: "↑",
    };
  }

  if (change < 0) {
    return {
      label: `Rate Cut: ${Math.abs(change)} bps`,
      style: "bg-emerald-50 text-emerald-700",
      symbol: "↓",
    };
  }

  return {
    label: "Rate Unchanged",
    style: "bg-blue-50 text-blue-700",
    symbol: "—",
  };
}

/* ====================================================
   CENTRAL BANK DECISION DATE — ENGLISH
==================================================== */

function TechnicalHubDecisionDate(
  value: string | null
): string {
  if (!value || !/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return "Date Unavailable";
  }

  const date = new Date(
    `${value.slice(0, 10)}T12:00:00Z`
  );

  if (Number.isNaN(date.getTime())) {
    return "Date Unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/* ============================================================
   CENTRAL BANK INTEREST RATES SNAPSHOT COMPONENT

   - Same card structure as Arabic version
   - English LTR presentation
   - Same Supabase table
   - Same loading and refresh behavior
   - Same navy header
============================================================ */

function InterestRateSnapshotSection() {
  const [banks, setBanks] =
    useState<TechnicalHubBankRate[]>([]);

  const [loadingRates, setLoadingRates] =
    useState(true);

  const [ratesError, setRatesError] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL;

        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {
          throw new Error(
            "Supabase configuration unavailable"
          );
        }

        const endpoint = new URL(
          `${url.replace(/\/$/, "")}/rest/v1/interest_rates`
        );

        endpoint.searchParams.set(
          "select",
          [
            "slug",
            "bank_name_ar",
            "bank_short_name_ar",
            "currency_code",
            "flag_emoji",
            "current_rate",
            "current_rate_lower",
            "current_rate_upper",
            "last_change_bps",
            "last_decision_date",
            "display_order",
          ].join(",")
        );

        endpoint.searchParams.set(
          "slug",
          `in.(${TECHNICAL_HUB_BANKS.join(",")})`
        );

        endpoint.searchParams.set(
          "is_published",
          "eq.true"
        );

        endpoint.searchParams.set(
          "order",
          "display_order.asc"
        );

        const response = await fetch(
          endpoint.toString(),
          {
            method: "GET",
            headers: {
              apikey: key,
              Authorization: `Bearer ${key}`,
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Interest rates HTTP ${response.status}`
          );
        }

        const result: unknown =
          await response.json();

        if (!Array.isArray(result)) {
          throw new Error(
            "Invalid interest rates response"
          );
        }

        if (!cancelled) {
          const ordered =
            (result as TechnicalHubBankRate[])
              .filter((bank) =>
                TECHNICAL_HUB_BANKS.includes(
                  bank.slug as
                    (typeof TECHNICAL_HUB_BANKS)[number]
                )
              )
              .sort(
                (a, b) =>
                  TECHNICAL_HUB_BANKS.indexOf(
                    a.slug as
                      (typeof TECHNICAL_HUB_BANKS)[number]
                  ) -
                  TECHNICAL_HUB_BANKS.indexOf(
                    b.slug as
                      (typeof TECHNICAL_HUB_BANKS)[number]
                  )
              );

          setBanks(ordered);
          setRatesError(false);
        }
      } catch (error) {
        console.error(
          "Interest rates snapshot:",
          error
        );

        if (!cancelled) {
          setBanks([]);
          setRatesError(true);
        }
      } finally {
        if (!cancelled) {
          setLoadingRates(false);
        }
      }
    }

    void loadRates();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="central-bank-interest-rates"
      aria-labelledby="technical-hub-rates-title"
      dir="ltr"
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* ============================================
            MAIN CARD — UNIFIED WITH TECHNICAL HUB
        ============================================ */}

        <div className="w-full overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* ============================================
              NAVY HEADER — SAME AS ARABIC DESIGN
          ============================================ */}

          <div
            className="px-4 py-4 text-white sm:px-7 sm:py-5"
            style={{
              background:
                "linear-gradient(110deg,#205895 0%,#143b6c 45%,#091d36 100%)",
            }}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0 max-w-[1050px]">

                <div className="mb-1.5 flex items-center gap-2 text-[10px] font-black tracking-wide text-blue-200">
                  <CalendarDays size={15} />
                  CENTRAL BANK MONETARY POLICY
                </div>

                <h2
                  id="technical-hub-rates-title"
                  className="text-[19px] font-black leading-[1.45] text-white sm:text-[27px]"
                >
                  Central Bank Interest Rates

                  <span className="block text-[#64c7ff] sm:inline">
                    {" "}and Their Impact on Forex & Gold
                  </span>
                </h2>

                <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
                  Compare published interest rates across
                  eight major central banks. Explore recent
                  monetary policy decisions, including
                  rate hikes, cuts and holds, and understand
                  how interest rate expectations can
                  influence currencies and gold.
                </p>

              </div>

              <Link
                href="/en/interest-rates"
                className="hidden min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-black text-white transition hover:bg-white/20 lg:inline-flex"
              >
                Interest Rates Hub
                <ArrowLeft
                  size={14}
                  className="rotate-180"
                />
              </Link>

            </div>
          </div>


          
{/* ============================================
    DATA PANEL HEADING — ENGLISH
============================================ */}

<div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dce6f4] bg-[#f8faff] px-3 py-3 sm:px-6 sm:py-4">
  <div className="min-w-0">
    <h3 className="text-[13px] font-black text-[#10233f] sm:text-[16px]">
      Central Bank Monetary Policy Comparison
    </h3>
    <p className="mt-1 text-[10px] text-slate-500 sm:text-[11px]">
      Policy rates, latest decisions and announcement dates
    </p>
  </div>
  <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700 sm:px-3">
    8 Central Banks
  </span>
</div>

{/* ============================================
    BANK DATA STATES
============================================ */}

{loadingRates ? (
  <div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
    {TECHNICAL_HUB_BANKS.map((slug) => (
      <div
        key={slug}
        className="h-[125px] animate-pulse bg-white p-4 sm:h-[155px]"
      >
        <div className="h-5 w-2/3 rounded bg-slate-100" />
        <div className="mt-5 h-7 w-1/2 rounded bg-slate-100" />
        <div className="mt-4 h-4 w-full rounded bg-slate-100" />
      </div>
    ))}
  </div>
) : ratesError ? (
  <div className="p-6 text-center">
    <p className="text-sm font-bold text-slate-700">
      Unable to load interest rate data at this time.
    </p>
    <Link
      href="/en/interest-rates"
      className="mt-3 inline-flex text-xs font-black text-blue-700 hover:underline"
    >
      Visit the Interest Rates Hub
    </Link>
  </div>
) : banks.length === 0 ? (
  <div className="p-6 text-center text-sm text-slate-500">
    No published interest rate data is currently available.
  </div>
) : (
  <div className="grid gap-px bg-[#dce6f4] sm:grid-cols-2 lg:grid-cols-4">
    {banks.map((bank) => {
      const fallback = TECHNICAL_HUB_BANK_FALLBACKS[bank.slug];

      const name =
        fallback?.name ||
        bank.slug.toUpperCase();

      const currency =
        bank.currency_code ||
        fallback?.currency ||
        "—";

      const decision = TechnicalHubDecision(
        bank.last_change_bps
      );

      // Explicit flags preserve the Arabic design
      // while avoiding platform-specific emoji rendering.
      const flagCodes: Record<string, string> = {
        fed: "us",
        ecb: "eu",
        boe: "gb",
        boj: "jp",
        boc: "ca",
        rba: "au",
        snb: "ch",
        rbnz: "nz",
      };

      const countryCode = flagCodes[bank.slug];

      const flagUrl = countryCode
        ? `https://flagcdn.com/w80/${countryCode}.png`
        : null;

      return (
        <Link
          key={bank.slug}
          href={`/en/interest-rates/${bank.slug}`}
          aria-label={`View ${name} interest rate details`}
          className="group block min-w-0 bg-white px-3 py-3 transition-colors hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 sm:px-4 sm:py-4"
        >
          {/* BANK NAME + FLAG */}

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-50 sm:h-10 sm:w-12">
              {flagUrl ? (
                <img
                  src={flagUrl}
                  alt={`${name} flag`}
                  loading="lazy"
                  width={48}
                  height={32}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-lg">🏦</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-[12px] font-black leading-5 text-[#10233f] group-hover:text-blue-700 sm:text-[13px]">
                {name}
              </h4>
              <p
                dir="ltr"
                className="text-left text-[10px] font-semibold text-slate-400"
              >
                {currency}
              </p>
            </div>
          </div>

          {/* RATE + DECISION — COMPACT */}

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:mt-3">
            <div className="min-w-0">
              <p className="text-[9px] text-slate-500 sm:text-[10px]">
                Current Policy Rate
              </p>
              <p
                dir="ltr"
                className="mt-0.5 text-left text-[19px] font-black tabular-nums leading-7 text-[#1558be] sm:text-[21px]"
              >
                {TechnicalHubRateValue(bank)}
              </p>
            </div>

            <span
              className={`inline-flex max-w-full items-center gap-1 rounded-md px-2 py-1 text-[9px] font-black sm:text-[10px] ${decision.style}`}
            >
              <span aria-hidden="true">{decision.symbol}</span>
              {decision.label}
            </span>
          </div>

          {/* DATE + DETAILS */}

          <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 sm:mt-3 sm:pt-2.5">
            <span className="text-[9px] text-slate-500 sm:text-[10px]">
              {TechnicalHubDecisionDate(bank.last_decision_date)}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-blue-700 group-hover:underline sm:text-[11px]">
              View Details
              <ArrowLeft size={12} className="rotate-180" />
            </span>
          </div>
        </Link>
      );
    })}
  </div>
)}

{/* ============================================
    DATA DISCLOSURE — INTEGRATED FOOTER
============================================ */}

<div className="border-t border-slate-200 bg-[#f8faff] px-3 py-3 sm:px-6">
  <div className="flex items-start gap-2">
    <Info
      size={14}
      className="mt-0.5 shrink-0 text-blue-600"
    />
    <p className="text-[10px] leading-5 text-slate-500 sm:text-[11px] sm:leading-6">
      Reference interest rates are not directly comparable
      across all central banks. The US Federal Reserve
      publishes a target range, while other central banks
      use different policy rate measures. The figures shown
      reflect the latest records available to Broker Alarab
      and do not represent a real-time policy announcement feed.
    </p>
  </div>
</div>

{/* ============================================
    EDUCATIONAL CONTENT — COMPACT
============================================ */}

<div className="flex flex-col gap-2 border-t border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6 sm:py-4">
  <p className="min-w-0 text-[11px] leading-6 text-slate-600 sm:text-[12px]">
    <strong className="text-[#10233f]">
      How Do Interest Rates Affect Forex and Gold?
    </strong>{" "}
    Central bank decisions and interest rate expectations
    influence currencies, bond yields and financial markets.
    Gold may also respond to real yields, US dollar movements
    and inflation expectations. Market reactions depend
    on what investors had already anticipated.
  </p>

  <Link
    href="/en/interest-rates"
    className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline"
  >
    Historical Rates & Decisions
    <ArrowLeft size={13} className="rotate-180" />
  </Link>
</div>

        </div>
      </div>
    </section>
  );
}

/* ====================================================
   TECHNICAL ANALYSIS HUB PROPS
==================================================== */


/* ============================================================
   BROKER ALARAB — INDEPENDENT PIVOT V6
   ENGLISH / LTR / SAME ARABIC FINAL DESIGN
   44 instruments | 7 timeframes | 5 methods
   Source: broker_pivot_levels_latest
   READ ONLY
============================================================ */

type PivotV6MethodEn =
  | "classic"
  | "fibonacci"
  | "camarilla"
  | "woodie"
  | "demark";

type PivotV6RecordEn = {
  symbol: string;
  timeframe: Timeframe;
  method: PivotV6MethodEn;
  reference_candle_time_utc: string;
  levels: Record<string, unknown>;
  calculated_at: string;
};

const PIVOT_V6_METHODS_EN: {
  key: PivotV6MethodEn;
  name: string;
  description: string;
}[] = [
  {
    key: "classic",
    name: "Classic Pivot Points",
    description:
      "Traditional support and resistance levels calculated from the reference period's high, low and closing prices.",
  },
  {
    key: "fibonacci",
    name: "Fibonacci Pivot Points",
    description:
      "Support and resistance levels derived from Fibonacci ratios and the reference price range.",
  },
  {
    key: "camarilla",
    name: "Camarilla Pivot Points",
    description:
      "Price levels calculated around the reference close to identify potential reaction zones.",
  },
  {
    key: "woodie",
    name: "Woodie Pivot Points",
    description:
      "A pivot calculation that applies a different weighting to reference prices.",
  },
  {
    key: "demark",
    name: "DeMark Pivot Points",
    description:
      "Levels based on the relationship between opening, closing, high and low prices.",
  },
];

const PIVOT_V6_LEVEL_NAMES_EN: Record<string, string> = {
  P: "Central Pivot Point",
  R1: "First Resistance",
  R2: "Second Resistance",
  R3: "Third Resistance",
  R4: "Fourth Resistance",
  S1: "First Support",
  S2: "Second Support",
  S3: "Third Support",
  S4: "Fourth Support",
  reference_close: "Reference Close",
};

function PivotV6PanelEn() {
  const [pivotSymbol, setPivotSymbol] =
    useState<string>("XAUUSDc");

  const [pivotTimeframe, setPivotTimeframe] =
    useState<Timeframe>("H1");

      // MOBILE ONLY — selected pivot calculation method
  const [activePivotMethod, setActivePivotMethod] =
    useState<PivotV6MethodEn>("classic");

  const [symbolMenuOpen, setSymbolMenuOpen] =
    useState(false);

  const [symbolSearch, setSymbolSearch] =
    useState("");

  const [records, setRecords] =
    useState<PivotV6RecordEn[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkedAt, setCheckedAt] =
    useState<string | null>(null);

  const selectedInstrument =
    INSTRUMENTS.find(
      (item) => item.symbol === pivotSymbol
    ) || INSTRUMENTS[0];

  const displaySymbol = (value: string) =>
    value.replace(/c$/, "");

  const filteredInstruments = useMemo(() => {
    const search = symbolSearch.trim().toLowerCase();

    if (!search) return INSTRUMENTS;

    return INSTRUMENTS.filter((instrument) => {
      const name = getInstrumentArabicName(instrument);

      return [
        instrument.symbol,
        displaySymbol(instrument.symbol),
        instrument.name,
        name,
        instrument.slug,
      ].some((value) =>
        value.toLowerCase().includes(search)
      );
    });
  }, [symbolSearch]);

  const digits = useMemo(() => {
    if (pivotSymbol.startsWith("XAU")) return 2;
    if (pivotSymbol.startsWith("XAG")) return 3;
    if (/(JPY|HUF)c$/.test(pivotSymbol)) return 3;
    if (/CZKc$/.test(pivotSymbol)) return 4;
    return 5;
  }, [pivotSymbol]);

  const formatPivotPrice = (value: unknown) => {
    const num = numberValue(value);

    if (num === null || !Number.isFinite(num)) {
      return "—";
    }

    return num.toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: Math.max(digits, 5),
    });
  };

  const formatDate = (value?: string | null) => {
    if (!value) return "Unavailable";
    return dateText(value);
  };

  /* ====================================================
     SUPABASE — FIVE METHODS
  ==================================================== */

  useEffect(() => {
    let cancelled = false;
    let running = false;

    setRecords([]);
    setLoading(true);
    setError("");
    setCheckedAt(null);

    async function loadPivotV6() {
      if (running) return;
      running = true;

      try {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL;

        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {
          throw new Error(
            "Supabase public configuration unavailable"
          );
        }

        const endpoint = new URL(
          `${url.replace(/\/$/, "")}/rest/v1/broker_pivot_levels_latest`
        );

        endpoint.searchParams.set(
          "select",
          "symbol,timeframe,method,reference_candle_time_utc,levels,calculated_at"
        );

        endpoint.searchParams.set(
          "symbol",
          `eq.${pivotSymbol}`
        );

        endpoint.searchParams.set(
          "timeframe",
          `eq.${pivotTimeframe}`
        );

        endpoint.searchParams.set("limit", "5");

        const response = await fetch(endpoint.toString(), {
          headers: {
            apikey: key,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Pivot V6 HTTP ${response.status}`
          );
        }

        const result: unknown =
          await response.json();

        if (!Array.isArray(result)) {
          throw new Error("Invalid Pivot V6 response");
        }

        const parsed = result.filter(
          (item): item is PivotV6RecordEn => {
            if (!item || typeof item !== "object") {
              return false;
            }

            const row =
              item as Partial<PivotV6RecordEn>;

            return (
              row.symbol === pivotSymbol &&
              row.timeframe === pivotTimeframe &&
              PIVOT_V6_METHODS_EN.some(
                (method) => method.key === row.method
              ) &&
              !!row.levels &&
              typeof row.levels === "object" &&
              !Array.isArray(row.levels)
            );
          }
        );

        if (!cancelled) {
          setRecords(parsed);
          setError("");
          setCheckedAt(new Date().toISOString());
        }
      } catch (err) {
        console.error("Pivot V6 English:", err);

        if (!cancelled) {
          setError(
            "Unable to refresh support and resistance levels."
          );
        }
      } finally {
        running = false;

        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPivotV6();

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadPivotV6();
      }
    }, 60_000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [pivotSymbol, pivotTimeframe]);

  /* ====================================================
     INDIVIDUAL LEVEL CARD
     Resistance = Green / Support = Red
  ==================================================== */

  
/* ====================================================
   COMPACT PIVOT LEVEL CARD
   MOBILE: TWO COLUMNS
   DESKTOP: REGULAR SIZE
==================================================== */

function levelCard(
  level: string,
  value: unknown,
  side: "resistance" | "support"
) {
  const resistance = side === "resistance";

  return (
    <div
      key={level}
      className={`flex min-w-0 items-center justify-between gap-1.5 rounded-lg border px-2 py-2.5 transition-colors sm:gap-3 sm:px-4 sm:py-3 ${
        resistance
          ? "border-emerald-100 bg-emerald-50/70"
          : "border-rose-100 bg-rose-50/70"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`flex h-7 min-w-[25px] shrink-0 items-center justify-center rounded-md px-1 text-[9px] font-black sm:h-8 sm:min-w-9 sm:text-[11px] ${
            resistance
              ? "bg-emerald-100 text-emerald-800"
              : "bg-rose-100 text-rose-800"
          }`}
        >
          {level}
        </span>

        <span className="hidden text-[10px] font-semibold text-slate-500 lg:inline">
          {PIVOT_V6_LEVEL_NAMES_EN[level] || level}
        </span>
      </div>

      <span
        dir="ltr"
        className={`min-w-0 text-right text-[10px] font-black tabular-nums tracking-tight sm:text-[14px] lg:text-[17px] ${
          resistance
            ? "text-emerald-700"
            : "text-rose-700"
        }`}
      >
        {formatPivotPrice(value)}
      </span>
    </div>
  );
}


  /* ====================================================
     INDEPENDENT SECTION RENDER
  ==================================================== */

  return (
    <section
      id="gold-support-resistance"
      aria-labelledby="pivot-v6-heading-en"
      dir="ltr"
      className="scroll-mt-20 border-y border-[#d4e1f1] bg-[#f3f6fb] py-5 sm:py-8"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* NAVY HEADER */}
          <div
            className="px-4 py-5 text-white sm:px-7 sm:py-6"
            style={{
              background:
                "linear-gradient(110deg,#205895 0%,#143b6c 45%,#091d36 100%)",
            }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] font-black tracking-wide text-blue-200">
                  <Layers3 size={15} />
                  PIVOT POINTS & SUPPORT / RESISTANCE
                </div>

                <h2
                  id="pivot-v6-heading-en"
                  className="text-[20px] font-black leading-8 sm:text-[26px]"
                >
                  Pivot Points, Support & Resistance
                </h2>

                <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px]">
                  Five pivot calculation methods with independent
                  instrument and timeframe selection.
                </p>
              </div>

              <span className="self-start rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-black text-blue-100">
                5 Methods · 7 Timeframes · 44 Instruments
              </span>
            </div>
          </div>

          {/* SYMBOL + TIMEFRAME */}
          <div className="border-b border-[#d5e3f4] bg-[#edf4ff] px-3 py-4 sm:px-6">
            <div className="grid gap-4 lg:grid-cols-2">

              {/* INSTRUMENT */}
              <div className="relative min-w-0">
                <p className="mb-2 text-[12px] font-black text-[#102b50]">
                  Select Financial Instrument
                </p>

                <button
                  type="button"
                  aria-expanded={symbolMenuOpen}
                  onClick={() => {
                    setSymbolMenuOpen(!symbolMenuOpen);
                    setSymbolSearch("");
                  }}
                  className="flex min-h-[47px] w-full items-center justify-between gap-3 rounded-xl border border-[#b9d1f5] bg-white px-4 py-3 text-left shadow-sm transition hover:border-blue-500"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Search
                      size={16}
                      className="shrink-0 text-blue-600"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-black text-[#102b50]">
                        {getInstrumentArabicName(selectedInstrument)}
                      </p>

                      <p className="text-[10px] font-bold text-slate-500">
                        {displaySymbol(pivotSymbol)}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-blue-600 transition-transform ${
                      symbolMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {symbolMenuOpen && (
                  <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#c5d7f0] bg-white shadow-2xl">

                    <div className="border-b border-slate-100 p-3">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
                        <Search
                          size={15}
                          className="shrink-0 text-blue-600"
                        />

                        <input
                          type="search"
                          autoFocus
                          value={symbolSearch}
                          onChange={(event) =>
                            setSymbolSearch(event.target.value)
                          }
                          placeholder="Search Gold, EURUSD, Silver..."
                          className="h-11 w-full bg-transparent text-[12px] text-slate-900 outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setSymbolMenuOpen(false);
                            setSymbolSearch("");
                          }}
                          aria-label="Close instrument menu"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="max-h-[320px] overflow-y-auto p-2">
                      {filteredInstruments.length === 0 ? (
                        <p className="p-5 text-center text-xs text-slate-500">
                          No matching instruments found.
                        </p>
                      ) : (
                        filteredInstruments.map((instrument) => (
                          <button
                            key={instrument.symbol}
                            type="button"
                            onClick={() => {
                              setPivotSymbol(instrument.symbol);
                              setSymbolMenuOpen(false);
                              setSymbolSearch("");
                            }}
                            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-blue-50 ${
                              pivotSymbol === instrument.symbol
                                ? "bg-blue-50"
                                : ""
                            }`}
                          >
                            <div>
                              <p className="text-[12px] font-black text-[#102b50]">
                                {getInstrumentArabicName(instrument)}
                              </p>

                              <p className="mt-1 text-[10px] font-semibold text-slate-500">
                                {displaySymbol(instrument.symbol)}
                              </p>
                            </div>

                            {pivotSymbol === instrument.symbol && (
                              <CheckCircle2
                                size={17}
                                className="text-blue-600"
                              />
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* TIMEFRAME */}
              <div className="min-w-0">
                <p className="mb-2 text-[12px] font-black text-[#102b50]">
                  Calculation Timeframe
                </p>

                <div
                  role="group"
                  aria-label="Pivot timeframe"
                  className="flex min-h-[47px] max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-[#b9d1f5] bg-white p-1 shadow-sm"
                >
                  {TIMEFRAMES.map((frame) => (
                    <button
                      key={frame}
                      type="button"
                      onClick={() => setPivotTimeframe(frame)}
                      aria-pressed={pivotTimeframe === frame}
                      className={`min-w-[48px] flex-1 shrink-0 rounded-lg px-2 py-2.5 text-[11px] font-black transition ${
                        pivotTimeframe === frame
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-[#f6f8fc] text-[#163758] hover:bg-blue-50"
                      }`}
                    >
                      {frame}
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-[10px] text-slate-500">
                  These controls are independent of the technical overview above.
                </p>
              </div>
            </div>
          </div>

          {/* SELECTED CONTEXT */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700">
                {displaySymbol(pivotSymbol)}
              </span>

              <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[10px] font-black text-slate-700">
                {pivotTimeframe}
              </span>

              <span className="text-[10px] text-slate-500">
                Levels calculated from completed candles
              </span>
            </div>

            <span className="flex items-center gap-2 text-[10px] text-slate-500">
              <Clock3 size={13} />
              {checkedAt
                ? `Last checked: ${formatDate(checkedAt)}`
                : "Checking data"}
            </span>
          </div>

          
{/* ====================================================
    FIVE PIVOT METHODS
    MOBILE: METHOD SELECTOR
    DESKTOP: ALL FIVE METHODS
==================================================== */}

<div className="space-y-4 bg-[#f4f7fc] px-3 py-4 sm:px-6 sm:py-6">

  {/* MOBILE METHOD NAVIGATION */}
  <div className="rounded-xl border border-[#cbd9ed] bg-white p-3 shadow-sm md:hidden">

    <div className="mb-3 flex items-center justify-between gap-2">
      <div>
        <p className="text-[12px] font-black text-[#102b50]">
          Select Pivot Method
        </p>
        <p className="mt-1 text-[10px] text-slate-500">
          View one calculation method at a time
        </p>
      </div>

      <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700">
        {PIVOT_V6_METHODS_EN.findIndex(
          (method) => method.key === activePivotMethod
        ) + 1} / 5
      </span>
    </div>

    <div
      role="group"
      aria-label="Select Pivot Calculation Method"
      className="grid grid-cols-3 gap-1.5"
    >
      {PIVOT_V6_METHODS_EN.map((method) => {
        const selected = activePivotMethod === method.key;

        return (
          <button
            key={method.key}
            type="button"
            aria-pressed={selected}
            onClick={() => setActivePivotMethod(method.key)}
            className={`min-h-[38px] rounded-lg border px-2 py-2 text-[10px] font-extrabold transition ${
              selected
                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                : "border-slate-200 bg-[#f6f8fc] text-slate-700"
            }`}
          >
            {method.key === "classic"
              ? "Classic"
              : method.key === "fibonacci"
              ? "Fibonacci"
              : method.key === "camarilla"
              ? "Camarilla"
              : method.key === "woodie"
              ? "Woodie"
              : "DeMark"}
          </button>
        );
      })}
    </div>

    <div className="mt-3 rounded-lg bg-[#eef5ff] px-3 py-2 text-center">
      <p className="text-[11px] font-black text-[#154a87]">
        {
          PIVOT_V6_METHODS_EN.find(
            (method) => method.key === activePivotMethod
          )?.name
        }
      </p>
      <p className="mt-1 text-[10px] text-slate-500">
        {displaySymbol(pivotSymbol)} · {pivotTimeframe}
      </p>
    </div>

  </div>


            {loading && records.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                <RefreshCw
                  size={23}
                  className="mx-auto mb-3 animate-spin text-blue-600"
                />
                <p className="text-sm font-bold text-slate-600">
                  Loading support and resistance levels...
                </p>
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <Info
                  size={23}
                  className="mx-auto mb-3 text-amber-500"
                />

                <p className="font-bold text-slate-700">
                  No published data for this instrument and timeframe.
                </p>

                {error && (
                  <p className="mt-2 text-xs text-rose-600">
                    {error}
                  </p>
                )}
              </div>
            ) : (
              <>
                {error && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] text-amber-800">
                    Unable to refresh data. Showing previously loaded results.
                  </div>
                )}

                {PIVOT_V6_METHODS_EN.map((methodInfo) => {
                  const row = records.find(
                    (item) => item.method === methodInfo.key
                  );

                  if (!row) {
                    return (
                      <div
  key={methodInfo.key}
  className={`rounded-xl border border-slate-200 bg-white p-5 ${
    activePivotMethod === methodInfo.key
      ? "block"
      : "hidden md:block"
  }`}
>
                        <h3 className="font-black text-[#102b50]">
                          {methodInfo.name}
                        </h3>

                        <p className="mt-2 text-xs text-slate-500">
                          This calculation method is currently unavailable.
                        </p>
                      </div>
                    );
                  }

                  const levels = row.levels;
                  const supportedKeys = Object.keys(levels);

                  const resistanceKeys = supportedKeys
                    .filter((key) => /^R[1-9]\d*$/.test(key))
                    .sort(
                      (a, b) =>
                        Number(a.slice(1)) -
                        Number(b.slice(1))
                    );

                  const supportKeys = supportedKeys
                    .filter((key) => /^S[1-9]\d*$/.test(key))
                    .sort(
                      (a, b) =>
                        Number(a.slice(1)) -
                        Number(b.slice(1))
                    );

                  const centerKey =
                    methodInfo.key === "camarilla" &&
                    levels.reference_close !== undefined
                      ? "reference_close"
                      : "P";

                  return (
  <article
    key={methodInfo.key}
    className={`overflow-hidden rounded-xl border border-[#d6e2f2] bg-white shadow-[0_10px_25px_-22px_rgba(15,42,84,0.28)] ${
      activePivotMethod === methodInfo.key
        ? "block"
        : "hidden md:block"
    }`}
  >
                      
{/* ====================================================
    METHOD HEADER
    PROMINENT ON MOBILE / NORMAL ON DESKTOP
==================================================== */}

<div className="border-b border-slate-100 bg-white px-3 py-3 sm:px-6 sm:py-3.5">

  <div className="flex items-start justify-between gap-3">

    <div className="min-w-0 flex-1">

      <div className="mb-1.5 flex items-center gap-2">
        <span className="rounded-md bg-[#eaf2ff] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-[#1558be]">
          Method {
            PIVOT_V6_METHODS_EN.findIndex(
              (method) => method.key === methodInfo.key
            ) + 1
          } of 5
        </span>

        <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-black text-slate-700">
          {displaySymbol(pivotSymbol)}
        </span>
      </div>

      <h3 className="text-[15px] font-black leading-6 text-[#102b50] sm:text-[19px]">
        {methodInfo.name}
      </h3>

      <p className="mt-1 text-[10px] leading-5 text-slate-500 sm:text-[11px]">
        {methodInfo.description}
      </p>

    </div>

    <span className="shrink-0 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700">
      {pivotTimeframe}
    </span>

  </div>
</div>


                     {/* ====================================================
    CENTRAL PIVOT — IDENTIFIES ITS METHOD
==================================================== */}

<div className="border-b border-blue-100 bg-[#edf5ff] px-3 py-3 text-center sm:px-4">

  <p className="text-[10px] font-black uppercase tracking-wide text-blue-700 sm:text-[11px]">
    {methodInfo.name}
  </p>

  <p className="mt-1 text-[10px] font-semibold text-slate-500">
    {centerKey === "reference_close"
      ? "Reference Close"
      : "Central Pivot Point (P)"}
  </p>

  <p
    dir="ltr"
    className="mt-1 text-[25px] font-black tabular-nums leading-tight text-[#154a87] sm:text-[29px]"
  >
    {formatPivotPrice(levels[centerKey])}
  </p>

  <p className="mt-1 text-[9px] font-semibold text-blue-600 md:hidden">
    {displaySymbol(pivotSymbol)} · {pivotTimeframe}
  </p>

</div>

                      {/* SUPPORT LEFT / RESISTANCE RIGHT */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 sm:gap-4 sm:p-5">

                        {/* SUPPORT */}
                        <div className="min-w-0">
                          <h4 className="mb-3 flex items-center gap-2 text-[13px] font-black text-rose-700">
                            <span className="h-2 w-2 rounded-full bg-rose-500" />
                            Support Levels
                          </h4>

                          <div className="space-y-2">
                            {supportKeys.length > 0 ? (
                              supportKeys.map((key) =>
                                levelCard(
                                  key,
                                  levels[key],
                                  "support"
                                )
                              )
                            ) : (
                              <p className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
                                No support levels published.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* RESISTANCE */}
                        <div className="min-w-0">
                          <h4 className="mb-3 flex items-center gap-2 text-[13px] font-black text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Resistance Levels
                          </h4>

                          <div className="space-y-2">
                            {resistanceKeys.length > 0 ? (
                              resistanceKeys.map((key) =>
                                levelCard(
                                  key,
                                  levels[key],
                                  "resistance"
                                )
                              )
                            ) : (
                              <p className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
                                No resistance levels published.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* TIMESTAMPS */}
                      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-slate-100 bg-[#fafcff] px-4 py-3 sm:px-5">
                        <p className="text-[10px] text-slate-500">
                          Reference candle:{" "}
                          <span className="font-bold text-[#102b50]">
                            {formatDate(row.reference_candle_time_utc)}
                          </span>
                        </p>

                        <p className="text-[10px] text-slate-400">
                          Calculated: {formatDate(row.calculated_at)}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </>
            )}
          </div>

          {/* ============================================
    PIVOT AUTO PERIOD — EDUCATIONAL FOOTER
============================================ */}

<div className="border-t border-[#dce6f4] bg-[#f8faff] px-4 py-3 sm:px-7 sm:py-4">

  <div className="flex items-start gap-2.5">

    <Info
      size={16}
      className="mt-0.5 shrink-0 text-blue-600"
    />

    <div className="min-w-0 space-y-2">

      <p className="text-[11px] font-black text-[#153b69] sm:text-[12px]">
        How Are Pivot Points Calculated?
      </p>

      <p className="text-[10px] leading-6 text-slate-600 sm:text-[11px] sm:leading-7">
        Pivot Point support and resistance levels are calculated
        using completed MT5 candles and an automatically selected
        reference period based on the chosen timeframe.
        M5 and M15 use daily data; M30, H1 and H4 use weekly data;
        and D1 and W1 use monthly data.
        As a result, multiple timeframes may display identical
        support and resistance levels when they share the same
        reference period. This is expected behavior.
      </p>

      <p className="text-[10px] leading-6 text-slate-500 sm:text-[11px] sm:leading-7">
        Levels may also differ by financial instrument and
        calculation method (Classic, Fibonacci, Camarilla,
        Woodie or DeMark). These levels are mathematical
        references, not trading recommendations, and do not
        guarantee price reversals or trend continuation.
        Colors are used solely for visual distinction.
      </p>

    </div>

  </div>

</div>

        </div>
      </div>
    </section>
  );
}

/* ================= END PIVOT V6 ENGLISH ================= */


type TechnicalAnalysisHubProps = {
  initialRows?: TechnicalRow[];
  initialGold?: GoldReport | null;
};

export default function TechnicalAnalysisHub({
  initialRows = [],
  initialGold = null,
}: TechnicalAnalysisHubProps) {

  // ====================================================
  // TECHNICAL ANALYSIS STATE
  // ====================================================

  const [rows, setRows] =
    useState<TechnicalRow[]>(initialRows);

  const [gold, setGold] =
    useState<GoldReport | null>(initialGold);

  const [activeMobileIndicator, setActiveMobileIndicator] =
    useState<"ADX" | "RSI" | "ATR" | null>(null);

  const [loading, setLoading] =
    useState(initialRows.length === 0);

  const [loadError, setLoadError] = useState("");
  const [lastChecked, setLastChecked] =
    useState<string | null>(null);

  const [selectedGoldZone, setSelectedGoldZone] =
    useState<string | null>(null);

  // Selected instrument in support/resistance section.
  const [supportSymbol, setSupportSymbol] =
    useState<string>("XAUUSDc");

  // ====================================================
  // V3.1 — GOLD LEVELS BY TIMEFRAME
  // READ ONLY — SUPABASE
  // ====================================================

  const [levelsByFrame, setLevelsByFrame] = useState<
    Partial<Record<Timeframe, TechnicalLevelsRow>>
  >({});

  const [levelsLoading, setLevelsLoading] = useState(true);
  const [levelsError, setLevelsError] = useState(false);

  const [pivotPeriod, setPivotPeriod] =
    useState<PivotPeriod | null>(null);

  const [mobileZonesOpen, setMobileZonesOpen] = useState(false);
  const [mobilePivotOpen, setMobilePivotOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let running = false;

    async function loadTechnicalLevels() {
      if (running) return;
      running = true;

      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {
          throw new Error("Missing Supabase public configuration");
        }

        const endpoint = new URL(
          `${url.replace(/\/$/, "")}/rest/v1/broker_technical_levels_latest`
        );

        endpoint.searchParams.set("select", "*");
        endpoint.searchParams.set("symbol", "eq.XAUUSDc");
        endpoint.searchParams.set("limit", "7");

        const response = await fetch(endpoint.toString(), {
          method: "GET",
          headers: {
            apikey: key,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Levels HTTP ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid technical levels response");
        }

        const next: Partial<
          Record<Timeframe, TechnicalLevelsRow>
        > = {};

        for (const item of data) {
          if (!item || typeof item !== "object") continue;

          const row = item as TechnicalLevelsRow;

          if (
            row.symbol !== "XAUUSDc" ||
            !TIMEFRAMES.includes(row.timeframe) ||
            !Array.isArray(row.support) ||
            !Array.isArray(row.resistance)
          ) {
            continue;
          }

          next[row.timeframe] = row;
        }

        if (!cancelled) {
          setLevelsByFrame(next);
          setLevelsError(false);
        }
      } catch (error) {
        console.error("Technical levels loading:", error);

        if (!cancelled) {
          setLevelsError(true);
        }
      } finally {
        if (!cancelled) {
          setLevelsLoading(false);
        }

        running = false;
      }
    }

    void loadTechnicalLevels();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadTechnicalLevels();
      }
    }, 5 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  // ====================================================
  // COMPARISON AND SELECTED INSTRUMENT
  // ====================================================

  const [compareFirst, setCompareFirst] = useState("XAUUSDc");
  const [compareSecond, setCompareSecond] = useState("EURUSDc");

  const [symbol, setSymbol] = useState("XAUUSDc");

  // ====================================================
  // LIVE MT5 QUOTES — READ ONLY FROM SUPABASE
  // ====================================================

  const [liveQuote, setLiveQuote] = useState<{
    symbol: string;
    bid: number | null;
    ask: number | null;
    quote_time_utc: string | null;
  } | null>(null);

  const [liveQuoteLoading, setLiveQuoteLoading] = useState(true);
  const [liveQuoteCheckedAt, setLiveQuoteCheckedAt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let requestInProgress = false;

    setLiveQuote(null);
    setLiveQuoteLoading(true);

    const loadLiveQuote = async () => {
      if (requestInProgress) return;
      requestInProgress = true;

      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {
          throw new Error("Supabase public configuration unavailable");
        }

        const endpoint = new URL(
          `${url.replace(/\/$/, "")}/rest/v1/broker_live_quotes`
        );

        endpoint.searchParams.set(
          "select",
          "symbol,bid,ask,quote_time_utc"
        );

        endpoint.searchParams.set("symbol", `eq.${symbol}`);
        endpoint.searchParams.set("limit", "1");

        const response = await fetch(endpoint.toString(), {
          headers: {
            apikey: key,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Quote HTTP ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!cancelled) {
          const item =
            Array.isArray(data) && data.length > 0
              ? data[0]
              : null;

          if (item && typeof item === "object") {
            const quote = item as Record<string, unknown>;

            setLiveQuote({
              symbol: String(quote.symbol || ""),
              bid: numberValue(quote.bid),
              ask: numberValue(quote.ask),
              quote_time_utc:
                typeof quote.quote_time_utc === "string"
                  ? quote.quote_time_utc
                  : null,
            });
          } else {
            setLiveQuote(null);
          }
        }
      } catch (error) {
        // Preserve previous quote on temporary polling failure.
        console.error("MT5 live quote refresh:", error);
      } finally {
        if (!cancelled) {
          setLiveQuoteLoading(false);
          setLiveQuoteCheckedAt(Date.now());
        }

        requestInProgress = false;
      }
    };

    void loadLiveQuote();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadLiveQuote();
      }
    }, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [symbol]);

  const [mobileMarketOpen, setMobileMarketOpen] =
    useState(false);

  const [mobileMarketSearch, setMobileMarketSearch] =
    useState("");

  const [timeframe, setTimeframe] =
    useState<Timeframe>("H1");

  // ====================================================
  // SYNC OVERVIEW INSTRUMENT WITH SUPPORT / PIVOT DATA
  // ====================================================

  useEffect(() => {
    setSupportSymbol(symbol);
    setSelectedGoldZone(null);
  }, [symbol]);

  const selectedLevels =
    levelsByFrame[timeframe] ?? null;

  const selectedLevelSupport =
    selectedLevels?.support ?? [];

  const selectedLevelResistance =
    selectedLevels?.resistance ?? [];

  const selectedLevelsHistorical =
    selectedLevels?.data_status === "historical";

  // ====================================================
  // SCANNER, HEATMAP AND FAQ STATE
  // ====================================================

  const [category, setCategory] =
    useState<Category>("all");

  const [query, setQuery] = useState("");

  const [directionFilter, setDirectionFilter] =
    useState("all");

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const [showAllPairs, setShowAllPairs] =
    useState(false);

  const [heatmapCategory, setHeatmapCategory] = useState<
    "all" | "metals" | "forex"
  >("all");

  const [heatmapExpanded, setHeatmapExpanded] =
    useState(false);

  const [marketSegment, setMarketSegment] = useState<
    "all" | "metals" | "major" | "cross" | "emerging"
  >("all");

  // ====================================================
  // FEATURED BROKERS STATE
  // ====================================================

  const [featuredBrokers, setFeaturedBrokers] =
    useState<FeaturedBroker[]>([]);

  const [featuredBrokersLoading, setFeaturedBrokersLoading] =
    useState(true);

  const [featuredBrokersError, setFeaturedBrokersError] =
    useState(false);

  // ====================================================
  // LOAD TECHNICAL ANALYSIS — READ ONLY
  // ====================================================

  async function loadData() {
    setLoadError("");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      setLoadError(
        "Supabase read-only configuration is unavailable."
      );
      setLoading(false);
      return;
    }

    try {
      const base = url.replace(/\/$/, "");

      const headers = {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      };

      const [technicalResponse, goldResponse] =
        await Promise.all([
          fetch(
            `${base}/rest/v1/broker_technical_analysis_latest?select=*&limit=400`,
            {
              headers,
              cache: "no-store",
            }
          ),
          fetch(
            `${base}/rest/v1/broker_gold_analysis_latest?select=analysis&symbol=eq.XAUUSDc&limit=1`,
            {
              headers,
              cache: "no-store",
            }
          ),
        ]);

      if (!technicalResponse.ok || !goldResponse.ok) {
        throw new Error(
          `HTTP ${technicalResponse.status} / ${goldResponse.status}`
        );
      }

      const technicalData: unknown =
        await technicalResponse.json();

      const goldData: unknown =
        await goldResponse.json();

      if (
        !Array.isArray(technicalData) ||
        !Array.isArray(goldData)
      ) {
        throw new Error("Invalid data structure");
      }

      setRows(technicalData as TechnicalRow[]);

      const firstGold = goldData[0] as
        | { analysis?: GoldReport }
        | undefined;

      setGold(firstGold?.analysis || null);

      setLastChecked(new Date().toISOString());
    } catch (error) {
      console.error(
        "Technical analysis refresh failed:",
        error
      );

      setLoadError(
        error instanceof Error
          ? `Unable to update technical analysis: ${error.message}`
          : "Unable to update technical analysis."
      );
    } finally {
      setLoading(false);
    }
  }

  // ====================================================
  // LOAD FEATURED BROKERS — READ ONLY
  // ====================================================

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedBrokers() {
      setFeaturedBrokersLoading(true);
      setFeaturedBrokersError(false);

      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {
          throw new Error(
            "Supabase public configuration unavailable"
          );
        }

        const endpoint = new URL(
          `${url.replace(/\/$/, "")}/rest/v1/brokers`
        );

        endpoint.searchParams.set(
          "select",
          "id,name,rating,logo,best_for"
        );

        endpoint.searchParams.set(
          "id",
          `in.(${FEATURED_BROKER_IDS.join(",")})`
        );

        const response = await fetch(
          endpoint.toString(),
          {
            method: "GET",
            headers: {
              apikey: key,
              Authorization: `Bearer ${key}`,
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Featured brokers HTTP ${response.status}`
          );
        }

        const data: unknown =
          await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid brokers response"
          );
        }

        if (cancelled) return;

        const brokers = data as FeaturedBroker[];

        const ordered = FEATURED_BROKER_IDS
          .map((id) =>
            brokers.find(
              (broker) => Number(broker.id) === id
            )
          )
          .filter(
            (broker): broker is FeaturedBroker =>
              broker !== undefined
          );

        setFeaturedBrokers(ordered);
      } catch (error) {
        console.error(
          "Featured brokers loading failed:",
          error
        );

        if (!cancelled) {
          setFeaturedBrokersError(true);
          setFeaturedBrokers([]);
        }
      } finally {
        if (!cancelled) {
          setFeaturedBrokersLoading(false);
        }
      }
    }

    void loadFeaturedBrokers();

    return () => {
      cancelled = true;
    };
  }, []);

  // ====================================================
  // INITIAL TECHNICAL ANALYSIS LOAD
  // ====================================================

  useEffect(() => {
    if (initialRows.length === 0) {
      void loadData();
    }

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadData();
      }
    }, 5 * 60 * 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // ====================================================
  // SELECTED INSTRUMENT
  // ====================================================

  const selectedInstrument =
    INSTRUMENTS.find(
      (item) => item.symbol === symbol
    ) || INSTRUMENTS[0];

  const selectedRows = rows.filter(
    (row) => row.symbol === symbol
  );

  const selectedRow = selectedRows.find(
    (row) => row.timeframe === timeframe
  );

  const selectedDirection =
    getDirection(selectedRow);

  // ====================================================
  // LAST GENERATED ANALYSIS
  // ====================================================

  const latestGenerated =
    rows
      .map((row) => row.calculated_at_utc)
      .filter(
        (value): value is string => Boolean(value)
      )
      .sort()
      .at(-1) || null;

  // ====================================================
  // MARKET SCANNER FILTERING
  // ====================================================

  const scanner = useMemo(() => {
    return INSTRUMENTS.filter((instrument) => {
      if (
        category !== "all" &&
        instrument.type !== category
      ) {
        return false;
      }

      const searchableText =
        `${instrument.symbol} ${instrument.slug} ${instrument.name}`
          .toLowerCase();

      if (
        !searchableText.includes(
          query.trim().toLowerCase()
        )
      ) {
        return false;
      }

      const row = rows.find(
        (item) =>
          item.symbol === instrument.symbol &&
          item.timeframe === timeframe
      );

      if (
        directionFilter !== "all" &&
        getDirection(row) !== directionFilter
      ) {
        return false;
      }

      return true;
    });
  }, [
    rows,
    category,
    timeframe,
    query,
    directionFilter,
  ]);

  // ====================================================
  // INDICATORS AND VOTES
  // ====================================================

  const selectedVotes =
    selectedRow?.indicator_votes &&
    typeof selectedRow.indicator_votes === "object"
      ? selectedRow.indicator_votes
      : {};

  const selectedIndicators =
    selectedRow?.indicators &&
    typeof selectedRow.indicators === "object"
      ? selectedRow.indicators
      : {};

  // ====================================================
  // PAGE JSX — ENGLISH LTR
  // ====================================================

  return (
    <main
      dir="ltr"
      lang="en"
      className="min-h-screen bg-[#f5f7fb] text-slate-900"
    >
   

{/* ====================================================
    01 — ENGLISH TECHNICAL ANALYSIS HERO
    Broker Alarab | LTR | Mobile + Desktop | 1520px
==================================================== */}

<section
  id="technical-analysis-hero"
  className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31]"
>
  {/* NAVY BACKGROUND */}

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
  >
    <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

    <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/15 blur-[120px]" />

    <div className="absolute -bottom-64 left-[12%] h-[380px] w-[380px] rounded-full bg-cyan-400/10 blur-[110px]" />

    <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
  </div>

  <div className="relative mx-auto w-full max-w-[1520px] px-4 pb-4 pt-3 sm:px-6 lg:px-8 xl:px-10">

    {/* BREADCRUMB */}

    <nav
      aria-label="Breadcrumb"
      className="mb-3 flex items-center gap-2 text-xs font-semibold text-blue-200/70"
    >
      <Link
        href="/en"
        className="transition hover:text-white"
      >
        Home
      </Link>

      <span className="text-blue-300/40">/</span>

      <span className="text-white">
        Technical Analysis
      </span>
    </nav>

    {/* ====================================================
        HERO CONTENT
    ==================================================== */}

    <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-7 xl:gap-9">

      {/* MAIN SEO CONTENT */}

      <div className="max-w-[850px]">

        <h1 className="max-w-[900px] text-[27px] font-black leading-[1.35] tracking-tight text-white sm:text-[40px] sm:leading-[1.25] lg:text-[45px] xl:text-[50px]">

          Forex Technical Analysis

          <span className="mt-1.5 block text-[#59c0ff] sm:mt-2">
            for Gold and Silver
          </span>

        </h1>

        {/* INTRODUCTION */}

        <p className="mt-4 max-w-[800px] text-[13px] font-medium leading-[1.9] text-slate-100 sm:mt-5 sm:text-[16px] sm:leading-8 sm:text-slate-200">

          <span className="sm:hidden">
            Explore technical analysis for gold, silver,
            and 42 forex pairs across seven timeframes.
            Compare market trends, buy and sell signals,
            and technical indicators.
          </span>

          <span className="hidden sm:inline">
            Explore forex, gold, and silver technical
            analysis covering 44 financial instruments
            across seven timeframes. Compare buy and
            sell signals, RSI and ADX indicators,
            moving averages, market trends, and
            gold support and resistance zones.
          </span>

        </p>

        {/* DATA TRANSPARENCY */}

        <p className="mt-3 max-w-[800px] text-[11px] leading-[1.8] text-blue-200/80 sm:text-[12px] sm:leading-6">
          Technical readings are calculated using
          completed price candles and refreshed
          periodically when new data becomes available.
          Results are descriptive, not real-time
          executable prices or trading recommendations.
        </p>

        {/* CTA BUTTONS */}

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-2.5 sm:mt-4 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">

          <a
            href="#scanner"
            className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-[#2471df] px-3 py-3 text-[12px] font-black text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)] transition hover:bg-[#3184f3] sm:min-h-[45px] sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
          >
            <Search size={17} className="shrink-0" />

            <span>Explore Market Scanner</span>

            <ArrowLeft
              size={17}
              className="hidden rotate-180 sm:block"
            />
          </a>

          <a
            href="#market-comparison-lab"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.08] px-3 py-3 text-[12px] font-black text-white transition hover:bg-white/[0.15] sm:min-h-[45px] sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
          >
            <SlidersHorizontal
              size={17}
              className="shrink-0 text-cyan-300"
            />

            <span className="sm:hidden">
              Compare
            </span>

            <span className="hidden sm:inline">
              Compare Financial Markets
            </span>

            <ArrowLeft
              size={16}
              className="hidden rotate-180 sm:block"
            />
          </a>

        </div>

      </div>

      {/* ====================================================
          MARKET DISCOVERY
      ==================================================== */}

      <div className="relative hidden self-center overflow-hidden rounded-[20px] border border-white/15 bg-white/[0.07] p-4 shadow-[0_20px_55px_-30px_rgba(0,0,0,0.4)] backdrop-blur-md sm:block">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
        />

        {/* CARD HEADER */}

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-[11px] font-extrabold tracking-wide text-[#66c8ff]">
              EXPLORE FINANCIAL MARKETS
            </p>

            <h2 className="mt-2 text-[17px] font-black text-white sm:text-2xl">
              Start Exploring Markets
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-slate-300 sm:mt-2 sm:text-xs sm:leading-6">
              Select a market to view its technical analysis.
            </p>

          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-cyan-300 sm:h-11 sm:w-11">
            <BarChart3 size={23} />
          </div>

        </div>

        {/* FEATURED MARKET LINKS */}

        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">

          {[
            {
              label: "Gold",
              symbol: "XAU/USD",
              href: "/en/technical-analysis/gold",
              type: "gold",
              mark: "Au",
            },
            {
              label: "Silver",
              symbol: "XAG/USD",
              href: "/en/technical-analysis/silver",
              type: "silver",
              mark: "Ag",
            },
            {
              label: "Euro / US Dollar",
              symbol: "EUR/USD",
              href: "/en/technical-analysis/eur-usd",
              type: "euro",
              mark: "€",
            },
            {
              label: "British Pound / US Dollar",
              symbol: "GBP/USD",
              href: "/en/technical-analysis/gbp-usd",
              type: "pound",
              mark: "£",
            },
          ].map((market) => (

            <Link
              key={market.symbol}
              href={market.href}
              className="group flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] p-2 transition hover:border-cyan-300/40 hover:bg-white/[0.15] sm:p-2.5"
            >

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-lg font-black shadow-inner sm:h-11 sm:w-11 sm:rounded-xl ${
                  market.type === "gold"
                    ? "border-amber-200 bg-gradient-to-br from-[#fff5ce] to-[#f5c755] text-amber-900"
                    : market.type === "silver"
                    ? "border-slate-200 bg-gradient-to-br from-white to-[#c5d1e0] text-slate-700"
                    : market.type === "euro"
                    ? "border-blue-200 bg-gradient-to-br from-[#eff6ff] to-[#bad8ff] text-blue-700"
                    : "border-indigo-200 bg-gradient-to-br from-[#f1f2ff] to-[#c7ceff] text-indigo-700"
                }`}
              >
                {market.mark}
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-[11px] font-black text-white sm:text-xs">
                  {market.label}
                </p>

                <p
  dir="ltr"
  className="mt-0.5 text-[10px] font-semibold text-blue-200/80"
>
  {market.symbol}
</p>

              </div>

              <ArrowLeft
                size={13}
                className="shrink-0 rotate-180 text-blue-200/60 transition group-hover:text-white"
              />

            </Link>

          ))}

        </div>

        {/* MARKET COUNT */}

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">

          <span className="text-[11px] text-slate-300">
            Gold, Silver &amp; 42 Forex Pairs
          </span>

          <a
            href="#scanner"
            className="inline-flex items-center gap-2 text-xs font-black text-[#66c8ff] hover:text-white"
          >
            View All Markets
            <ArrowLeft size={15} className="rotate-180" />
          </a>

        </div>

      </div>

    </div>

    {/* ====================================================
        FEATURED BROKERS — ENGLISH LTR
    ==================================================== */}

    <div className="mt-5 border-t border-white/15 pt-4 sm:mt-3 sm:pt-3">

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-2">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-cyan-300">
            <ShieldCheck size={19} />
          </div>

          <div className="text-left">

            <h2 className="text-[15px] font-black text-white sm:text-base">
              Featured Forex Brokers
            </h2>

            <p className="mt-1 text-[11px] text-slate-300 sm:mt-0.5">
              Explore broker reviews and comparisons from Broker Alarab
            </p>

          </div>

        </div>

        <Link
          href="/en/best-brokers"
          className="hidden items-center gap-2 rounded-lg border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-extrabold text-white transition hover:bg-white/[0.13] sm:inline-flex"
        >
          Explore All Brokers
          <ArrowLeft size={15} className="rotate-180" />
        </Link>

      </div>

      {/* LOADING AND ERROR STATES */}

      {featuredBrokersLoading ? (

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="h-[105px] animate-pulse rounded-xl bg-white/90"
            />
          ))}
        </div>

      ) : featuredBrokersError ? (

        <div className="rounded-xl border border-amber-300/20 bg-amber-100 p-4 text-left text-sm text-amber-900">
          Featured broker information is temporarily unavailable.
        </div>

      ) : featuredBrokers.length === 0 ? (

        <div className="rounded-xl border border-white/15 bg-white/10 p-4 text-left text-sm text-white">
          No featured broker information is currently available.
        </div>

      ) : (

        <>
          {/* MOBILE — THREE BROKERS */}

          <div className="sm:hidden">

            <div className="grid grid-cols-3 gap-2.5">

              {featuredBrokers
                .filter((broker) =>
                  [2, 25, 18].includes(Number(broker.id))
                )
                .map((broker) => {

                  const reviewUrl =
                    FEATURED_BROKER_LINKS[broker.id] ||
                    "/en/best-brokers";

                  const logoPath =
                    typeof broker.logo === "string" &&
                    broker.logo.startsWith("/brokers/") &&
                    !broker.logo.includes("..") &&
                    !broker.logo.includes("?")
                      ? broker.logo
                      : null;

                  return (

                    <Link
                      key={broker.id}
                      href={reviewUrl}
                      title={`Read our ${broker.name} broker review`}
                      aria-label={`Read our ${broker.name} broker review`}
                      className="flex h-[64px] min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2.5 transition active:scale-[0.98]"
                    >

                      {logoPath ? (

                        <img
                          src={logoPath}
                          alt={`${broker.name} broker logo`}
                          loading="lazy"
                          className="block h-auto max-h-[75px] w-auto max-w-full object-contain"
                        />

                      ) : (

                        <span className="text-center text-[12px] font-black text-slate-800">
                          {broker.name}
                        </span>

                      )}

                    </Link>

                  );
                })}

            </div>

          </div>

          {/* DESKTOP — FIVE BROKERS */}

          <div className="hidden overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_15px_45px_-25px_rgba(0,0,0,0.35)] sm:block">

            <div className="grid grid-cols-2 divide-x divide-slate-100 lg:grid-cols-5">

              {featuredBrokers.map((broker, index) => {

                const logoPath =
                  typeof broker.logo === "string" &&
                  broker.logo.startsWith("/brokers/") &&
                  !broker.logo.includes("..") &&
                  !broker.logo.includes("?")
                    ? broker.logo
                    : null;

                const reviewUrl =
                  FEATURED_BROKER_LINKS[broker.id];

                return (

                  <div
                    key={broker.id}
                    className={`group relative flex min-w-0 flex-col items-center justify-center px-4 py-2 text-center transition-colors hover:bg-[#f4f8ff] ${
                      index > 0
                        ? "md:border-l md:border-slate-100"
                        : ""
                    }`}
                  >

                    <div className="absolute inset-x-0 top-0 h-[2px] bg-transparent transition-colors group-hover:bg-[#2471df]" />

                    <div className="flex h-[48px] w-full items-center justify-center overflow-hidden sm:h-[54px]">

                      {logoPath ? (

                        <img
  src={logoPath}
  alt={`${broker.name} broker logo`}
  loading="lazy"
  className={`block object-contain ${
    Number(broker.id) === 25
      ? "!h-[45px] !w-[185px] !max-h-[45px] !max-w-[185px] !scale-100"
      : "h-auto w-auto max-h-[70px] max-w-[300px] scale-[1.18]"
  }`}
/>

                      ) : (

                        <span className="text-xl font-black text-slate-800">
                          {broker.name}
                        </span>

                      )}

                    </div>

                    {reviewUrl ? (

                      <Link
                        href={reviewUrl}
                        aria-label={`Read ${broker.name} review`}
                        className="mt-0.5 inline-flex min-h-[26px] items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        {broker.name} Review
                        <ArrowLeft
                          size={13}
                          className="rotate-180"
                        />
                      </Link>

                    ) : (

                      <span className="mt-1 text-xs text-slate-400">
                        Review Unavailable
                      </span>

                    )}

                  </div>

                );
              })}

            </div>

          </div>

        </>

      )}

      {/* COMMERCIAL DISCLOSURE */}

      <p className="mt-3 text-left text-[10px] leading-[1.8] text-blue-100/75 sm:mt-1.5 sm:leading-4 sm:text-blue-100/65">
        Featured broker placements are promotional
        and do not influence the technical analysis
        calculations or market classifications.
        Inclusion does not necessarily indicate
        a paid sponsorship arrangement.
      </p>

    </div>

  </div>

</section>

{/* ====================================================
    BROKER ALARAB — SINGLE TECHNICAL DASHBOARD

    1. Technical Overview
    2. Support & Resistance
    3. Pivot Points

    Same Arabic design — English LTR
==================================================== */}

<div
  id="unified-technical-analysis"
  dir="ltr"
  className="bg-[#f3f6fb] px-4 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 lg:px-8 xl:px-10"
>
  <div
    className="
      mx-auto max-w-[1440px]
      overflow-hidden
      border border-[#cbd9ed]
      bg-white
      shadow-[0_18px_45px_-28px_rgba(13,48,95,0.28)]
    "
  >



{/* ============================================================
    02 — INTERACTIVE TECHNICAL ANALYSIS OVERVIEW
    Broker Alarab | English LTR | Real engine data

    Uses existing: rows, gold, symbol, timeframe,
    setSymbol, setTimeframe, INSTRUMENTS, TIMEFRAMES

    Same design and calculations as Arabic version
============================================================ */}

{(() => {
  const overviewInstrument =
    INSTRUMENTS.find((item) => item.symbol === symbol) ||
    INSTRUMENTS[0];

  const overviewRow = rows.find(
    (item) =>
      item.symbol === symbol &&
      item.timeframe === timeframe
  );

  const overviewReady =
    overviewRow?.data_status === "READY";

  const overviewFresh = isAnalysisFresh(overviewRow);

  const overviewDirection = overviewReady
    ? getDirection(overviewRow)
    : "DATA_INCOMPLETE";

  // ====================================================
  // UNIFIED REFERENCE PRICE — M5 CLOSED CANDLE
  // Price stays the same when changing analysis timeframe
  // ====================================================

  const overviewPriceRow = rows.find(
    (item) =>
      item.symbol === symbol &&
      item.timeframe === "M5"
  );

  const overviewPrice =
    overviewPriceRow?.data_status === "READY"
      ? numberValue(overviewPriceRow.price)
      : null;

  const overviewDigits =
    overviewInstrument.type === "metals" ? 2 : 5;

  // ====================================================
  // ACTUAL VOTES FROM THE TECHNICAL ANALYSIS ENGINE
  // ====================================================

  const buyCount = overviewReady
    ? numberValue(overviewRow?.buy_votes)
    : null;

  const sellCount = overviewReady
    ? numberValue(overviewRow?.sell_votes)
    : null;

  const neutralCount = overviewReady
    ? numberValue(overviewRow?.neutral_votes)
    : null;

  const hasVotes =
    buyCount !== null &&
    sellCount !== null &&
    neutralCount !== null &&
    buyCount >= 0 &&
    sellCount >= 0 &&
    neutralCount >= 0;

  const voteTotal = hasVotes
    ? buyCount + sellCount + neutralCount
    : 0;

  // The gauge is based on net indicator votes.
  // It does not represent a price forecast,
  // win rate or probability of a profitable trade.

  const gaugePosition =
    hasVotes && voteTotal > 0
      ? Math.max(
          0,
          Math.min(
            1,
            0.5 + (buyCount - sellCount) / (2 * voteTotal)
          )
        )
      : 0.5;

  const gaugeX =
    150 + 130 * Math.cos(Math.PI * (1 - gaugePosition));

  const gaugeY =
    140 - 130 * Math.sin(Math.PI * (1 - gaugePosition));

  const biasLabel: Record<string, string> = {
    STRONG_BUY: "Strong Buy",
    BUY_BIAS: "Buy",
    MIXED: "Neutral",
    SELL_BIAS: "Sell",
    STRONG_SELL: "Strong Sell",
    DATA_INCOMPLETE: "Data Unavailable",
  };

  const biasColor: Record<string, string> = {
    STRONG_BUY: "#059669",
    BUY_BIAS: "#10b981",
    MIXED: "#64748b",
    SELL_BIAS: "#f97316",
    STRONG_SELL: "#e11d48",
    DATA_INCOMPLETE: "#94a3b8",
  };

  const currentBiasColor =
    biasColor[overviewDirection] || "#94a3b8";

  const overviewVotes =
    overviewReady &&
    overviewRow?.indicator_votes &&
    typeof overviewRow.indicator_votes === "object"
      ? overviewRow.indicator_votes
      : {};

  const overviewIndicators =
    overviewReady &&
    overviewRow?.indicators &&
    typeof overviewRow.indicators === "object"
      ? overviewRow.indicators
      : {};

  // ====================================================
  // NORMALIZE RAW INDICATOR VOTES
  // ====================================================

  function normalizeAnalysisVote(value: unknown) {
    if (value === 1) return "BUY";
    if (value === -1) return "SELL";
    if (value === 0) return "NEUTRAL";

    if (typeof value !== "string") return "UNKNOWN";

    const normalized = value.trim().toUpperCase();

    if (["BUY", "BULLISH", "1"].includes(normalized)) {
      return "BUY";
    }

    if (["SELL", "BEARISH", "-1"].includes(normalized)) {
      return "SELL";
    }

    if (["NEUTRAL", "MIXED", "0"].includes(normalized)) {
      return "NEUTRAL";
    }

    return "UNKNOWN";
  }

  function getGroupVote(key: string) {
    return normalizeAnalysisVote(
      extractVote(overviewVotes, key)
    );
  }

  const movingAverageVote = overviewReady
    ? getGroupVote("ema")
    : "UNKNOWN";

  const indicatorGroupKeys = [
    "supertrend",
    "ichimoku",
    "adx",
    "rsi",
    "macd",
    "stochastic",
    "bollinger",
    "cci",
  ];

  const indicatorGroupVotes = indicatorGroupKeys.map(
    (key) => getGroupVote(key)
  );

  const technicalBuy = indicatorGroupVotes.filter(
    (vote) => vote === "BUY"
  ).length;

  const technicalSell = indicatorGroupVotes.filter(
    (vote) => vote === "SELL"
  ).length;

  const technicalNeutral = indicatorGroupVotes.filter(
    (vote) => vote === "NEUTRAL"
  ).length;

  const technicalKnown =
    technicalBuy + technicalSell + technicalNeutral;

  const movingAverageBuy =
    movingAverageVote === "BUY" ? 1 : 0;

  const movingAverageSell =
    movingAverageVote === "SELL" ? 1 : 0;

  const movingAverageNeutral =
    movingAverageVote === "NEUTRAL" ? 1 : 0;

  const movingAverageKnown =
    movingAverageVote !== "UNKNOWN";

  const adxValue =
    numberValue(overviewIndicators.adx14) ??
    numberValue(overviewRow?.adx);

  const rsiValue =
    numberValue(overviewIndicators.rsi14);

  const atrValue =
    numberValue(overviewIndicators.atr14) ??
    numberValue(overviewRow?.atr);

  const isGoldSelected = symbol === "XAUUSDc";

  const goldReportAvailable =
    isGoldSelected && selectedLevels !== null;

  const goldSupport = goldReportAvailable
    ? selectedLevelSupport
    : [];

  const goldResistance = goldReportAvailable
    ? selectedLevelResistance
    : [];

  const goldReferenceFresh =
    goldReportAvailable &&
    selectedLevels?.data_status === "live" &&
    isFresh(selectedLevels.reference_time_utc);

  return (
    <section
      id="technical-overview"
      dir="ltr"
      className="relative scroll-mt-20 bg-white"
      aria-labelledby="technical-overview-heading"
    >
      <div className="w-full">

        {/* ====================================================
            SECTION HEADING — NAVY DESIGN
            Same gradient as Arabic version
        ==================================================== */}

        <div
          className="overflow-hidden border-b border-[#244c7c] text-white"
          style={{
            background:
              "linear-gradient(110deg, #205895 0%, #143b6c 45%, #091d36 100%)",
          }}
        >
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 sm:py-5">

            <div className="min-w-0 text-left">

              <h2
                id="technical-overview-heading"
                className="text-[21px] font-black leading-[1.5] text-white sm:text-[27px]"
              >
                Financial Markets Technical Analysis
              </h2>

              <p className="mt-2 max-w-[900px] text-[12px] leading-6 text-blue-100 sm:text-[13px]">
                Select a financial instrument and analysis
                timeframe to explore technical ratings,
                buy and sell classifications, moving
                averages, trend indicators, and available
                support and resistance levels.
              </p>

            </div>

            <div className="flex shrink-0 items-center gap-2 self-start rounded-lg border border-white/20 bg-white/10 px-3 py-2 sm:self-center">

              <Clock3
                size={17}
                className="shrink-0 text-[#7dd3fc]"
              />

              <span className="text-[11px] font-bold text-white">
                Periodic Analysis — Not Real-Time Quotes
              </span>

            </div>

          </div>
        </div>

        {/* ====================================================
            MOBILE ONLY — MARKET SELECTOR
            Searchable markets and seven timeframes
        ==================================================== */}

        <div className="space-y-3 sm:hidden">

          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">

            {/* MARKET HEADER */}

            <div className="mb-2 flex items-center justify-between">

              <span className="text-[12px] font-black text-slate-700">
                Select Financial Instrument
              </span>

              <span className="text-[10px] font-bold text-slate-400">
                {INSTRUMENTS.length} Markets
              </span>

            </div>

            {/* SEARCHABLE MARKET SELECTOR */}

            <div className="relative">

              <button
                type="button"
                aria-expanded={mobileMarketOpen}
                aria-controls="mobile-market-options"
                onClick={() => {
                  setMobileMarketOpen((previous) => !previous);
                  setMobileMarketSearch("");
                }}
                className={`flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border bg-[#f7faff] px-3 py-2 text-left text-[12px] font-black text-slate-900 transition ${
                  mobileMarketOpen
                    ? "border-blue-500 ring-2 ring-blue-500/10"
                    : "border-slate-200"
                }`}
              >
                <span className="min-w-0 truncate">
                  {selectedInstrument.name}
                  {" — "}
                  {selectedInstrument.base}/{selectedInstrument.quote}
                </span>

                <ChevronDown
                  size={17}
                  className={`shrink-0 text-blue-600 transition-transform ${
                    mobileMarketOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* MARKET DROPDOWN */}

              {mobileMarketOpen && (
                <div
                  id="mobile-market-options"
                  className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.18)]"
                >

                  {/* SEARCH */}

                  <div className="border-b border-slate-100 p-2.5">

                    <div className="relative">

                      <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-3 text-slate-400"
                      />

                      <input
                        type="search"
                        autoFocus
                        value={mobileMarketSearch}
                        onChange={(event) =>
                          setMobileMarketSearch(event.target.value)
                        }
                        placeholder="Search Gold, Silver, EUR/USD..."
                        aria-label="Search financial instruments"
                        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-left text-[12px] font-medium text-slate-900 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>

                  {/* MARKET OPTIONS */}

                  <div className="max-h-[250px] overflow-y-auto overscroll-contain p-1.5">

                    {INSTRUMENTS.filter((item) => {
                      const search = mobileMarketSearch
                        .trim()
                        .toLowerCase();

                      const searchableText = [
                        item.name,
                        item.base,
                        item.quote,
                        `${item.base}/${item.quote}`,
                        item.symbol,
                        item.slug,
                      ]
                        .join(" ")
                        .toLowerCase();

                      return searchableText.includes(search);
                    }).map((item) => {

                      const selected = symbol === item.symbol;

                      return (
                        <button
                          key={item.symbol}
                          type="button"
                          onClick={() => {
                            setSymbol(item.symbol);
                            setMobileMarketOpen(false);
                            setMobileMarketSearch("");
                          }}
                          className={`flex min-h-11 w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left transition ${
                            selected
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >

                          <span className="min-w-0 truncate text-[12px] font-bold">
                            {item.name}
                          </span>

                          <span
                            dir="ltr"
                            className="shrink-0 text-[10px] font-black text-slate-500"
                          >
                            {item.base}/{item.quote}
                          </span>

                        </button>
                      );
                    })}

                    {/* EMPTY SEARCH RESULT */}

                    {INSTRUMENTS.filter((item) => {
                      const search = mobileMarketSearch
                        .trim()
                        .toLowerCase();

                      return [
                        item.name,
                        item.base,
                        item.quote,
                        item.symbol,
                        item.slug,
                        `${item.base}/${item.quote}`,
                      ]
                        .join(" ")
                        .toLowerCase()
                        .includes(search);
                    }).length === 0 && (

                      <div className="px-3 py-6 text-center">

                        <Search
                          size={20}
                          className="mx-auto mb-2 text-slate-300"
                        />

                        <p className="text-[12px] font-medium text-slate-500">
                          No matching instruments found
                        </p>

                      </div>

                    )}

                  </div>

                </div>
              )}

            </div>

            {/* TIMEFRAME HEADER */}

            <div className="mt-4 flex items-center justify-between">

              <span className="text-[12px] font-black text-slate-700">
                Analysis Timeframe
              </span>

              <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700">
                {timeframe}
              </span>

            </div>

            {/* TIMEFRAME BUTTONS */}

            <div
              role="group"
              aria-label="Select analysis timeframe"
              className="mt-2 grid grid-cols-7 gap-1 rounded-xl bg-slate-100 p-1"
            >
              {TIMEFRAMES.map((frame) => (
                <button
                  key={frame}
                  type="button"
                  aria-pressed={timeframe === frame}
                  onClick={() => setTimeframe(frame)}
                  className={`min-w-0 rounded-lg py-2.5 text-[10px] font-black transition ${
                    timeframe === frame
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-blue-50"
                  }`}
                >
                  {frame}
                </button>
              ))}
            </div>

          </div>

          {/* ====================================================
              MOBILE TECHNICAL SNAPSHOT — PREMIUM COMPACT GAUGE
              Mobile only: parent container is sm:hidden
          ==================================================== */}

          <div className="overflow-hidden rounded-2xl border border-[#cbd9ed] bg-white shadow-sm">

            {/* PRICE + STATUS — ENGLISH MOBILE */}

            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-3.5 py-3">

              <div className="min-w-0">

                <p className="text-[10px] font-bold text-slate-500">
                  Last Completed Candle Close (M5)
                </p>

                <p
                  dir="ltr"
                  className="mt-1 text-left text-[23px] font-black tabular-nums text-[#10233f]"
                >
                  {formatPrice(overviewPrice, overviewDigits)}
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  {overviewInstrument.base}/{overviewInstrument.quote}
                  {" · "}
                  M5 Reference
                </p>

              </div>

              <div className="shrink-0 text-right">

                <span
                  className={`inline-flex rounded-lg px-3 py-2 text-[12px] font-black ${
                    overviewDirection === "STRONG_BUY" ||
                    overviewDirection === "BUY_BIAS"
                      ? "bg-emerald-50 text-emerald-700"
                      : overviewDirection === "STRONG_SELL" ||
                        overviewDirection === "SELL_BIAS"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {biasLabel[overviewDirection] || "Unavailable"}
                </span>

              </div>

            </div>

            {/* GAUGE */}

            <div className="bg-gradient-to-b from-[#f0f6ff] to-white px-3.5 pb-3 pt-3">

              <div className="mb-1 flex items-center justify-between">

                <h3 className="text-[13px] font-black text-[#10233f]">
                  Overall Technical Rating
                </h3>

                <Gauge size={17} className="text-blue-600" />

              </div>

              <div className="mx-auto w-full max-w-[245px]">

                <svg
                  viewBox="0 0 300 151"
                  className="block h-auto w-full"
                  role="img"
                  aria-label={
                    overviewReady
                      ? `Technical rating: ${
                          biasLabel[overviewDirection] || "Unavailable"
                        }`
                      : "Technical rating data is unavailable"
                  }
                >
                  <path
                    d="M 20 140 A 130 130 0 0 1 280 140"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="19"
                    strokeLinecap="round"
                  />

                  <path
                    d="M 20 140 A 130 130 0 0 1 46 62"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="18"
                  />

                  <path
                    d="M 46 62 A 130 130 0 0 1 109 16"
                    fill="none"
                    stroke="#fb923c"
                    strokeWidth="18"
                  />

                  <path
                    d="M 109 16 A 130 130 0 0 1 191 16"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="18"
                  />

                  <path
                    d="M 191 16 A 130 130 0 0 1 254 62"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="18"
                  />

                  <path
                    d="M 254 62 A 130 130 0 0 1 280 140"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />

                  {hasVotes && voteTotal > 0 && (
                    <>
                      <circle
                        cx={gaugeX}
                        cy={gaugeY}
                        r="15"
                        fill="#ffffff"
                        stroke={currentBiasColor}
                        strokeWidth="4"
                      />

                      <circle
                        cx={gaugeX}
                        cy={gaugeY}
                        r="5.5"
                        fill={currentBiasColor}
                      />
                    </>
                  )}

                  <text
                    x="150"
                    y="100"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill="#64748b"
                  >
                    Technical Rating
                  </text>

                  <text
                    x="150"
                    y="126"
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="900"
                    fill={currentBiasColor}
                  >
                    {biasLabel[overviewDirection] || "Unavailable"}
                  </text>
                </svg>

              </div>

              {/* COMPACT VOTE CARDS — ENGLISH */}

              <div className="mt-2 grid grid-cols-3 gap-2">

                <div className="rounded-xl bg-emerald-50 px-2 py-2 text-center">
                  <p className="text-[10px] font-bold text-emerald-700">
                    Buy
                  </p>
                  <p className="text-lg font-black text-emerald-700">
                    {hasVotes ? buyCount : "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 px-2 py-2 text-center">
                  <p className="text-[10px] font-bold text-slate-600">
                    Neutral
                  </p>
                  <p className="text-lg font-black text-slate-700">
                    {hasVotes ? neutralCount : "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-rose-50 px-2 py-2 text-center">
                  <p className="text-[10px] font-bold text-rose-700">
                    Sell
                  </p>
                  <p className="text-lg font-black text-rose-700">
                    {hasVotes ? sellCount : "—"}
                  </p>
                </div>

              </div>

              {/* DISTRIBUTION */}

              <div
                dir="ltr"
                className="mt-3 flex h-2 overflow-hidden rounded-full bg-slate-200"
              >
                {hasVotes && voteTotal > 0 ? (
                  <>
                    <div
                      className="bg-rose-500"
                      style={{
                        width: `${(sellCount / voteTotal) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-slate-300"
                      style={{
                        width: `${(neutralCount / voteTotal) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-emerald-500"
                      style={{
                        width: `${(buyCount / voteTotal) * 100}%`,
                      }}
                    />
                  </>
                ) : (
                  <div className="h-full w-full bg-slate-200" />
                )}
              </div>

            </div>

            {/* DATA STATUS */}

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3.5 py-2.5">

              <span
                className={`rounded-lg px-2 py-1 text-[10px] font-black ${
                  !overviewReady
                    ? "bg-slate-100 text-slate-600"
                    : overviewFresh
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {!overviewReady
                  ? "Data Unavailable"
                  : overviewFresh
                  ? "Recent Analysis Snapshot"
                  : "Historical or Outdated Data"}
              </span>

              <span className="text-[10px] text-slate-500">
                {dateText(overviewRow?.calculated_at_utc)}
              </span>

            </div>

          </div>



  

{/* ============================================================
    MOBILE — INDICATOR EXPLANATIONS + TECHNICAL DETAILS
    English LTR | Same Arabic design and calculations
    Tap-to-explain, no hover, no extra React state.
    The actual V3.1 support/resistance remains below.
============================================================ */}

{/* MOBILE INDICATOR DETAILS — ENGLISH */}

<div className="overflow-hidden rounded-2xl border border-[#cbd9ed] bg-white shadow-sm">

  <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-3.5 py-3">
    <div>
      <h3 className="text-[13px] font-black text-[#10233f]">
        Technical Indicator Details
      </h3>
      <p className="mt-1 text-[10px] text-slate-500">
        Tap an indicator to learn how it works
      </p>
    </div>
    <Info size={17} className="text-blue-600" />
  </div>

  <div className="grid grid-cols-3 gap-2 p-3">
    {[
      { key: "ADX", label: "Trend Strength", value: adxValue },
      { key: "RSI", label: "Relative Strength", value: rsiValue },
      { key: "ATR", label: "Volatility", value: atrValue },
    ].map((indicator) => (
      <button
        key={indicator.key}
        type="button"
        onClick={() =>
          setActiveMobileIndicator(
            indicator.key as "ADX" | "RSI" | "ATR"
          )
        }
        aria-haspopup="dialog"
        className="flex min-h-[92px] min-w-0 flex-col items-center justify-center rounded-xl border border-blue-100 bg-[#f8fbff] p-2 text-center transition active:border-blue-400 active:bg-blue-50"
      >
        <span className="flex items-center gap-1 text-[11px] font-black text-blue-700">
          <Info size={13} />
          {indicator.key}
        </span>

        <span className="mt-1 text-[9px] text-slate-500">
          {indicator.label}
        </span>

        <span
          dir="ltr"
          className="mt-1 text-[16px] font-black tabular-nums text-[#10233f]"
        >
          {formatPrice(indicator.value, 2)}
        </span>

        <span className="mt-1 text-[9px] font-bold text-blue-600">
          Tap to Learn
        </span>
      </button>
    ))}
  </div>

  {/* INDICATOR EXPLANATION SHEET */}

  {activeMobileIndicator && (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-slate-950/45 sm:hidden"
      onClick={() => setActiveMobileIndicator(null)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${activeMobileIndicator} indicator explanation`}
        dir="ltr"
        className="max-h-[85dvh] w-full max-w-[520px] overflow-y-auto rounded-t-[22px] bg-white px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 text-left shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-300" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black text-blue-700">
              TECHNICAL INDICATOR EXPLAINED
            </p>

            <h3 className="mt-1 text-lg font-black text-[#10233f]">
              {activeMobileIndicator === "ADX"
                ? "ADX — Average Directional Index"
                : activeMobileIndicator === "RSI"
                ? "RSI — Relative Strength Index"
                : "ATR — Average True Range"}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setActiveMobileIndicator(null)}
            aria-label="Close explanation"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-[10px] font-bold text-slate-500">
            Current Indicator Reading
          </p>

          <p
            dir="ltr"
            className="mt-1 text-left text-2xl font-black tabular-nums text-blue-700"
          >
            {formatPrice(
              activeMobileIndicator === "ADX"
                ? adxValue
                : activeMobileIndicator === "RSI"
                ? rsiValue
                : atrValue,
              2
            )}
          </p>
        </div>

        <p className="mt-4 text-[13px] leading-8 text-slate-600">
          {activeMobileIndicator === "ADX"
            ? "The Average Directional Index (ADX) measures trend strength without indicating whether prices are rising or falling. Readings below 20 often suggest a weak trend, while readings above 25 may indicate a more established trend. ADX alone is not a buy or sell signal."
            : activeMobileIndicator === "RSI"
            ? "The Relative Strength Index (RSI) measures price momentum on a scale from 0 to 100. Readings above 70 may indicate overbought conditions, while readings below 30 may indicate oversold conditions. Neither reading guarantees a price reversal."
            : "Average True Range (ATR) measures the average range of price movements. A higher ATR indicates greater volatility, but does not predict whether prices will rise or fall."}
        </p>

        <button
          type="button"
          onClick={() => setActiveMobileIndicator(null)}
          className="mt-5 w-full rounded-xl bg-[#123761] px-4 py-3 text-sm font-black text-white"
        >
          Close Explanation
        </button>
      </div>
    </div>
  )}

  {/* ADVANCED VOTING DETAILS */}

  <details className="group border-t border-slate-100">
    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 [&::-webkit-details-marker]:hidden">
      <div>
        <h4 className="text-[12px] font-black text-[#10233f]">
          Indicator Votes & Moving Averages
        </h4>
        <p className="mt-1 text-[10px] text-slate-500">
          View buy, neutral and sell classifications
        </p>
      </div>
      <ChevronDown
        size={18}
        className="shrink-0 text-blue-600 transition-transform group-open:rotate-180"
      />
    </summary>

    <div className="space-y-4 border-t border-slate-100 bg-[#f8fbff] p-3">

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h5 className="text-[12px] font-black text-[#10233f]">
            Technical Indicators
          </h5>
          <span className="text-[10px] text-slate-400">
            {technicalKnown} Available Groups
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Buy", value: technicalBuy, color: "text-emerald-700", bg: "bg-emerald-50" },
            { label: "Neutral", value: technicalNeutral, color: "text-slate-700", bg: "bg-slate-100" },
            { label: "Sell", value: technicalSell, color: "text-rose-700", bg: "bg-rose-50" },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg p-2.5 text-center ${item.bg}`}
            >
              <p className={`text-lg font-black ${item.color}`}>
                {technicalKnown > 0 ? item.value : "—"}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <h5 className="mb-2 text-[12px] font-black text-[#10233f]">
          Moving Averages — EMA 50 / EMA 200
        </h5>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Buy", value: movingAverageBuy, color: "text-emerald-700", bg: "bg-emerald-50" },
            { label: "Neutral", value: movingAverageNeutral, color: "text-slate-700", bg: "bg-slate-100" },
            { label: "Sell", value: movingAverageSell, color: "text-rose-700", bg: "bg-rose-50" },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg p-2.5 text-center ${item.bg}`}
            >
              <p className={`text-lg font-black ${item.color}`}>
                {movingAverageKnown ? item.value : "—"}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] leading-6 text-slate-500">
        EMA 50 and EMA 200 are treated as one voting group.
        ATR measures volatility and does not contribute a
        directional vote. These readings are descriptive,
        not personalized trading recommendations.
      </p>

    </div>
  </details>

</div>

{/* DETAILED ANALYSIS LINK */}

<Link
  href={`/en/technical-analysis/${overviewInstrument.slug}`}
  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#102b50] px-4 py-3 text-[12px] font-black text-white"
>
  View Detailed Technical Analysis
  <ArrowLeft size={16} className="rotate-180" />
</Link>

<p className="px-1 text-center text-[10px] leading-5 text-slate-500">
  Technical analyses are periodic snapshots, not real-time
  prices or personalized trading recommendations.
</p>

</div>

{/* ====================================================
    MAIN ANALYSIS PANEL — PREMIUM
==================================================== */}

<div className="hidden overflow-hidden bg-white sm:block">

  {/* ====================================================
      MARKET SELECTOR + TIMEFRAMES — ENGLISH DESKTOP
  ==================================================== */}

  <div className="border-b border-[#cbd9ed] bg-[#eaf2ff] px-5 py-4 sm:px-7">
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

      <div className="w-full max-w-[540px]">
        <label
          htmlFor="overview-market-selector"
          className="mb-2 block text-[12px] font-black text-[#153963]"
        >
          Select Financial Instrument
        </label>

        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
          />

          <select
            id="overview-market-selector"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            className="h-[46px] w-full appearance-none rounded-xl border-2 border-[#a9c8f5] bg-white py-2.5 pl-12 pr-10 text-[13px] font-extrabold text-[#102d53] shadow-sm outline-none transition hover:border-blue-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10"
          >
            <optgroup label="Precious Metals">
              {INSTRUMENTS.filter(
                (item) => item.type === "metals"
              ).map((item) => (
                <option key={item.symbol} value={item.symbol}>
                  {item.name} — {item.base}/{item.quote}
                </option>
              ))}
            </optgroup>

            <optgroup label="Forex Currency Pairs">
              {INSTRUMENTS.filter(
                (item) => item.type === "forex"
              ).map((item) => (
                <option key={item.symbol} value={item.symbol}>
                  {item.base}/{item.quote}
                </option>
              ))}
            </optgroup>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-700"
          />
        </div>
      </div>

      <div className="min-w-0">
        <p className="mb-2 text-[12px] font-black text-[#153963]">
          Analysis Timeframe
        </p>

        <div
          role="group"
          aria-label="Select analysis timeframe"
          className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-[#c5d7f0] bg-white p-1"
        >
          {TIMEFRAMES.map((frame) => (
            <button
              key={frame}
              type="button"
              onClick={() => setTimeframe(frame)}
              aria-pressed={timeframe === frame}
              className={`min-w-[48px] shrink-0 rounded-lg px-3 py-2.5 text-[12px] font-black transition ${
                timeframe === frame
                  ? "bg-[#2563eb] text-white shadow-md shadow-blue-600/20"
                  : "bg-[#f4f7fc] text-[#153963] hover:bg-blue-100"
              }`}
            >
              {frame}
            </button>
          ))}
        </div>
      </div>

    </div>
  </div>

  {/* ====================================================
      MT5 LIVE PRICE — COMPACT PREMIUM STRIP
      Original data source, timestamps and calculations
  ==================================================== */}

  {(() => {
    const quoteValid =
      liveQuote?.symbol === overviewInstrument.symbol &&
      liveQuote.bid !== null &&
      liveQuote.bid > 0;

    const tickTimestamp = liveQuote?.quote_time_utc
      ? Date.parse(liveQuote.quote_time_utc)
      : NaN;

    const quoteAgeSeconds =
      Number.isFinite(tickTimestamp) && liveQuoteCheckedAt > 0
        ? (liveQuoteCheckedAt - tickTimestamp) / 1000
        : Infinity;

    const quoteIsFresh =
      quoteValid &&
      quoteAgeSeconds >= -120 &&
      quoteAgeSeconds <= 30;

    const shownPrice = quoteValid
      ? liveQuote.bid
      : overviewPrice;

    const shownAsk = quoteValid
      ? liveQuote.ask
      : null;

    return (
      <div className="border-b border-[#dbe5f2] bg-[#f8fbff] px-4 py-3 sm:px-7">

        <div className="flex flex-col gap-3 rounded-xl border border-[#d7e4f5] bg-white px-4 py-3 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:px-5">

          {/* LEFT — INSTRUMENT AND RECORDED PRICE */}

          <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3 lg:w-[500px] lg:max-w-full lg:justify-between">

            {/* INSTRUMENT */}

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f1ff] text-blue-700">
                <LineChart size={21} />
              </div>

              <div className="min-w-0">
                <p
                  dir="ltr"
                  className="text-left text-[16px] font-black text-[#102d53]"
                >
                  {overviewInstrument.base}/{overviewInstrument.quote}
                </p>

                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  {getInstrumentArabicName(overviewInstrument)}
                </p>
              </div>
            </div>

            {/* SEPARATOR */}

            <div className="hidden h-11 w-px bg-[#dce6f3] sm:block" />

            {/* PRICE */}

            <div dir="ltr" className="min-w-0">
              <div className="flex items-center gap-1.5">

                <span
                  className={`h-2 w-2 rounded-full ${
                    quoteIsFresh
                      ? "animate-pulse bg-emerald-500"
                      : quoteValid
                      ? "bg-amber-500"
                      : "bg-slate-400"
                  }`}
                />

                <span className="text-[10px] font-bold text-slate-500">
                  {liveQuoteLoading && !quoteValid
                    ? "Loading Market Quote"
                    : quoteIsFresh
                    ? "Recent MT5 Quote"
                    : quoteValid
                    ? "Last Recorded Quote"
                    : "M5 Candle Close"}
                </span>

              </div>

              <p className="mt-1 text-[27px] font-black leading-none tabular-nums text-[#0c3971] sm:text-[32px]">
                {formatPrice(shownPrice, overviewDigits)}
              </p>

              {shownAsk !== null && (
                <p className="mt-1 text-[10px] font-semibold text-slate-500">
                  Ask:{" "}
                  <span className="font-bold text-slate-700">
                    {formatPrice(shownAsk, overviewDigits)}
                  </span>
                </p>
              )}
            </div>

          </div>

          {/* RIGHT — ANALYSIS STATUS AND DATA DETAILS */}

          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 lg:border-t-0 lg:pt-0">

            {/* ANALYSIS STATUS */}

            <span
              title={`Last technical analysis calculation: ${dateText(
                overviewRow?.calculated_at_utc
              )}`}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold ${
                !overviewReady
                  ? "border-slate-200 bg-slate-50 text-slate-600"
                  : overviewFresh
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  !overviewReady
                    ? "bg-slate-400"
                    : overviewFresh
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                }`}
              />

              {!overviewReady
                ? "Analysis Unavailable"
                : overviewFresh
                ? "Recent Analysis"
                : "Saved Analysis"}
            </span>

            {/* TIMEFRAME */}

            <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700">
              {timeframe}
            </span>

            {/* LAST PRICE TIME — HOVER TOOLTIP */}

            <div className="group relative inline-flex items-center">

              <button
                type="button"
                aria-label="View price and analysis update information"
                className="flex h-7 w-7 cursor-help items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700 transition hover:border-blue-400 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <Info size={15} />
              </button>

              <div
                role="tooltip"
                className="pointer-events-none invisible absolute right-0 top-full z-50 mt-3 w-[270px] max-w-[85vw] rounded-xl border border-[#c8d9ef] bg-white p-3 text-left opacity-0 shadow-[0_12px_35px_rgba(15,42,84,0.22)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
              >
                <p className="mb-2 text-[12px] font-black text-[#102d53]">
                  Price & Analysis Information
                </p>

                <div className="space-y-2 text-[11px] leading-5 text-slate-600">

                  <p>
                    <span className="font-bold text-slate-800">
                      Price Source:
                    </span>{" "}
                    {quoteValid
                      ? "MetaTrader 5"
                      : "Last Saved M5 Candle"}
                  </p>

                  <p>
                    <span className="font-bold text-slate-800">
                      Latest Price:
                    </span>{" "}
                    {quoteValid
                      ? dateText(liveQuote?.quote_time_utc)
                      : dateText(overviewPriceRow?.candle_close_utc)}
                  </p>

                  <p>
                    <span className="font-bold text-slate-800">
                      Latest Analysis:
                    </span>{" "}
                    {dateText(overviewRow?.calculated_at_utc)}
                  </p>

                  <p className="border-t border-slate-100 pt-2 text-[10px] text-slate-500">
                    MT5 quotes are displayed when available.
                    Technical analysis ratings are calculated
                    from completed market candles and may update
                    at a different interval from price quotes.
                  </p>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  })()}



 
{/* MAIN DASHBOARD GRID CONTINUES BELOW */}

{/* ====================================================
    MAIN DASHBOARD GRID — ENGLISH LTR
==================================================== */}

<div className="grid gap-0 xl:grid-cols-[1fr_1.12fr]">

  {/* --------------------------------------------------
      OVERALL TECHNICAL GAUGE
  -------------------------------------------------- */}

  <div className="border-b border-[#dce7f5] bg-gradient-to-b from-[#f0f6ff] to-white p-5 sm:p-7 xl:border-b-0 xl:border-r xl:border-[#dce7f5]">

    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h3 className="text-lg font-black text-[#10233f]">
          Overall Technical Rating
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Indicator ratings for the {timeframe} timeframe
        </p>
      </div>

      <Gauge size={22} className="text-blue-600" />
    </div>

    {/* SEMICIRCULAR GAUGE */}

    <div className="mx-auto w-full max-w-[460px]">

      <svg
        viewBox="0 0 300 151"
        className="block h-auto w-full"
        role="img"
        aria-label={
          overviewReady
            ? `Technical rating: ${
                biasLabel[overviewDirection] || "Unavailable"
              }`
            : "Technical rating data is unavailable"
        }
      >
        {/* Background track */}
        <path
          d="M 20 140 A 130 130 0 0 1 280 140"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="19"
          strokeLinecap="round"
        />

        {/* Strong sell */}
        <path
          d="M 20 140 A 130 130 0 0 1 46 62"
          fill="none"
          stroke="#e11d48"
          strokeWidth="18"
          strokeLinecap="butt"
        />

        {/* Sell */}
        <path
          d="M 46 62 A 130 130 0 0 1 109 16"
          fill="none"
          stroke="#fb923c"
          strokeWidth="18"
        />

        {/* Neutral */}
        <path
          d="M 109 16 A 130 130 0 0 1 191 16"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="18"
        />

        {/* Buy */}
        <path
          d="M 191 16 A 130 130 0 0 1 254 62"
          fill="none"
          stroke="#34d399"
          strokeWidth="18"
        />

        {/* Strong buy */}
        <path
          d="M 254 62 A 130 130 0 0 1 280 140"
          fill="none"
          stroke="#059669"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Current technical position */}
        {hasVotes && voteTotal > 0 && (
          <>
            <circle
              cx={gaugeX}
              cy={gaugeY}
              r="15"
              fill="#ffffff"
              stroke={currentBiasColor}
              strokeWidth="4"
            />

            <circle
              cx={gaugeX}
              cy={gaugeY}
              r="5.5"
              fill={currentBiasColor}
            />
          </>
        )}

        {/* Center label */}
        <text
          x="150"
          y="102"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#64748b"
        >
          Technical Rating
        </text>

        {/* Actual result */}
        <text
          x="150"
          y="127"
          textAnchor="middle"
          fontSize="21"
          fontWeight="900"
          fill={currentBiasColor}
        >
          {biasLabel[overviewDirection] || "Unavailable"}
        </text>
      </svg>

      {/* Gauge labels outside SVG */}

      <div
        dir="ltr"
        className="mt-3 grid grid-cols-3 items-center gap-2"
      >
        <div className="text-left">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-rose-600">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Sell
          </span>
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            Neutral
          </span>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Buy
          </span>
        </div>
      </div>

    </div>

    {/* VOTE DISTRIBUTION */}

    <div className="mt-2">

      <div className="grid grid-cols-3 gap-3">

        <div className="rounded-xl bg-emerald-50 p-3 text-center">
          <p className="text-[11px] font-bold text-emerald-700">
            Buy
          </p>
          <p className="mt-1 text-2xl font-black text-emerald-700">
            {hasVotes ? buyCount : "—"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-3 text-center">
          <p className="text-[11px] font-bold text-slate-600">
            Neutral
          </p>
          <p className="mt-1 text-2xl font-black text-slate-700">
            {hasVotes ? neutralCount : "—"}
          </p>
        </div>

        <div className="rounded-xl bg-rose-50 p-3 text-center">
          <p className="text-[11px] font-bold text-rose-700">
            Sell
          </p>
          <p className="mt-1 text-2xl font-black text-rose-700">
            {hasVotes ? sellCount : "—"}
          </p>
        </div>

      </div>

      {/* Actual vote distribution bar */}

      <div
        dir="ltr"
        className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-slate-100"
        aria-label="Technical indicator vote distribution"
      >
        {hasVotes && voteTotal > 0 ? (
          <>
            <div
              className="bg-rose-500"
              style={{
                width: `${(sellCount / voteTotal) * 100}%`,
              }}
            />

            <div
              className="bg-slate-300"
              style={{
                width: `${(neutralCount / voteTotal) * 100}%`,
              }}
            />

            <div
              className="bg-emerald-500"
              style={{
                width: `${(buyCount / voteTotal) * 100}%`,
              }}
            />
          </>
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}
      </div>

      <p className="mt-3 text-center text-[11px] leading-6 text-slate-500">
        This gauge illustrates the balance of technical
        indicator votes. It does not represent the
        probability of a price increase or decrease.
      </p>

    </div>
  </div>

  {/* ====================================================
      INDICATORS AND MOVING AVERAGES — REFINED DESIGN
  ==================================================== */}

  <div className="bg-[#fbfdff] p-4 sm:p-6">

    {/* SECTION HEADER */}

    <div className="mb-4 flex items-center justify-between gap-3">

      <div>
        <h3 className="text-[16px] font-black text-[#10233f] sm:text-lg">
          Technical Indicator Breakdown
        </h3>

        <p className="mt-1 text-[11px] text-slate-500">
          Buy, neutral and sell classifications on the{" "}
          {timeframe} timeframe
        </p>
      </div>

      <div className="flex items-center gap-2">

        <span
          title="EMA 50 and EMA 200 are treated as one voting group. ATR measures volatility and does not contribute a directional vote. Some values may be unavailable when the data is incomplete."
          className="flex h-7 w-7 cursor-help items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700"
        >
          <Info size={14} />
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <BarChart3 size={19} />
        </div>

      </div>
    </div>

    {/* ==========================================
        TECHNICAL INDICATORS
    ========================================== */}

    <div className="rounded-xl border border-[#dce6f3] bg-white p-3 shadow-sm">

      <div className="mb-3 flex items-center justify-between gap-2">

        <h4 className="text-[12px] font-black text-[#10233f]">
          Technical Indicators
        </h4>

        <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">
          8 Voting Groups
        </span>

      </div>

      <div className="grid grid-cols-3 gap-2">

        {[
          {
            label: "Buy",
            value: technicalKnown ? technicalBuy : "—",
            color: "text-emerald-700",
            background: "bg-emerald-50",
            border: "border-emerald-100",
            dot: "bg-emerald-500",
          },
          {
            label: "Neutral",
            value: technicalKnown ? technicalNeutral : "—",
            color: "text-slate-700",
            background: "bg-slate-50",
            border: "border-slate-200",
            dot: "bg-slate-400",
          },
          {
            label: "Sell",
            value: technicalKnown ? technicalSell : "—",
            color: "text-rose-700",
            background: "bg-rose-50",
            border: "border-rose-100",
            dot: "bg-rose-500",
          },
        ].map((item) => (

          <div
            key={item.label}
            className={`flex items-center justify-center gap-2 rounded-lg border px-2 py-3 ${item.background} ${item.border}`}
          >
            <div className="flex flex-col items-center gap-1">

              <span
                className={`text-[21px] font-black leading-none tabular-nums ${item.color}`}
              >
                {item.value}
              </span>

              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${item.dot}`}
                />
                {item.label}
              </span>

            </div>
          </div>

        ))}

      </div>
    </div>

    {/* ==========================================
        MOVING AVERAGES
    ========================================== */}

    <div className="mt-3 rounded-xl border border-[#dce6f3] bg-white p-3 shadow-sm">

      <div className="mb-3 flex items-center justify-between gap-2">

        <h4 className="text-[12px] font-black text-[#10233f]">
          Moving Averages
        </h4>

        <span
          dir="ltr"
          className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500"
        >
          EMA 50 / 200
        </span>

      </div>

      <div className="grid grid-cols-3 gap-2">

        {[
          {
            label: "Buy",
            value: movingAverageKnown ? movingAverageBuy : "—",
            color: "text-emerald-700",
            background: "bg-emerald-50",
            border: "border-emerald-100",
            dot: "bg-emerald-500",
          },
          {
            label: "Neutral",
            value: movingAverageKnown ? movingAverageNeutral : "—",
            color: "text-slate-700",
            background: "bg-slate-50",
            border: "border-slate-200",
            dot: "bg-slate-400",
          },
          {
            label: "Sell",
            value: movingAverageKnown ? movingAverageSell : "—",
            color: "text-rose-700",
            background: "bg-rose-50",
            border: "border-rose-100",
            dot: "bg-rose-500",
          },
        ].map((item) => (

          <div
            key={item.label}
            className={`flex items-center justify-center rounded-lg border px-2 py-3 ${item.background} ${item.border}`}
          >
            <div className="flex flex-col items-center gap-1">

              <span
                className={`text-[21px] font-black leading-none tabular-nums ${item.color}`}
              >
                {item.value}
              </span>

              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${item.dot}`}
                />
                {item.label}
              </span>

            </div>
          </div>

        ))}

      </div>
    </div>

    {/* ==========================================
        SUPPORTING METRICS — ADX / RSI / ATR
    ========================================== */}

    <div className="mt-3 grid grid-cols-3 gap-2.5">

      {[
        {
          code: "ADX",
          title: "Trend Strength",
          value: adxValue,
          description:
            "Measures trend strength without showing whether the trend is bullish or bearish. Readings below 20 often indicate a weak trend, 20–25 may suggest an emerging trend, 25–40 an established trend, and above 40 a strong trend.",
        },
        {
          code: "RSI",
          title: "Relative Strength",
          value: rsiValue,
          description:
            "Measures price momentum on a scale from 0 to 100. Readings above 70 may indicate overbought conditions, while readings below 30 may indicate oversold conditions. Neither reading guarantees a price reversal.",
        },
        {
          code: "ATR",
          title: "Volatility",
          value: atrValue,
          description:
            "Measures the average range of price movements. A higher value indicates greater volatility but does not predict market direction. The measurement unit depends on the financial instrument.",
        },
      ].map((metric) => (

        <div
          key={metric.code}
          className="relative min-w-0 rounded-xl border border-[#cbdcf2] bg-white px-2 py-3 text-center shadow-sm transition hover:border-blue-300"
        >

          <div className="flex items-center justify-center gap-1.5">

            <span className="text-[12px] font-black text-blue-700">
              {metric.code}
            </span>

            <div className="group relative">

              <button
                type="button"
                aria-label={`What does ${metric.code} mean?`}
                title={`${metric.code} — ${metric.title}: ${metric.description}`}
                className="flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Info size={12} />
              </button>

              <div
                role="tooltip"
                className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-3 hidden w-[245px] max-w-[80vw] -translate-x-1/2 rounded-xl border border-[#bed3ef] bg-white p-3 text-left opacity-0 shadow-[0_12px_35px_rgba(15,42,84,0.22)] transition md:block md:group-hover:visible md:group-hover:opacity-100 md:group-focus-within:visible md:group-focus-within:opacity-100"
              >
                <p className="mb-1 text-[12px] font-black text-[#102d53]">
                  {metric.code} — {metric.title}
                </p>

                <p className="text-[11px] leading-6 text-slate-700">
                  {metric.description}
                </p>

              </div>

            </div>
          </div>

          <p className="mt-1 text-[10px] font-medium text-slate-500">
            {metric.title}
          </p>

          <p
            dir="ltr"
            className="mt-2 text-center text-[20px] font-black leading-none tabular-nums text-[#10233f]"
          >
            {formatPrice(metric.value, 2)}
          </p>

        </div>

      ))}

    </div>
  </div>
</div>

{/* ====================================================
    PANEL FOOTER
==================================================== */}

<div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-white px-5 py-4 sm:px-7">

  <p className="max-w-3xl text-[11px] leading-6 text-slate-500">
    All results are descriptive technical analysis,
    not personalized trading recommendations.
    Data is published as periodic snapshots and
    may become outdated if updates stop.
  </p>

  <Link
    href={`/en/technical-analysis/${overviewInstrument.slug}`}
    className="inline-flex items-center gap-2 rounded-lg bg-[#102b50] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-blue-700"
  >
    Detailed Technical Analysis
    <ArrowLeft size={15} className="rotate-180" />
  </Link>

</div>

        </div>
      </div>
    </section>
  );
})()}


{/* ============================================================
    CLOSE MAIN TECHNICAL ANALYSIS CONTAINERS
    Same structure as the finalized Arabic page
============================================================ */}

</div>
</div>

{/* ============================================================
    08 — INDEPENDENT PIVOT V6
    English LTR
    44 Instruments | 7 Timeframes | 5 Methods
    Independent symbol and timeframe selection
============================================================ */}

<PivotV6PanelEn />

{/* ============================================================
    MARKET PULSE — BROKER ALARAB
    Existing section continues below
============================================================ */}



{/* ============================================================
    MARKET PULSE — BROKER ALARAB
    Unified Premium Navy Design
    Real Technical Data | 44 Instruments | 7 Timeframes
    READ ONLY
============================================================ */}

{(() => {
  const pulseRows = INSTRUMENTS.map((instrument) => {
    const row = rows.find(
      (item) =>
        item.symbol === instrument.symbol &&
        item.timeframe === timeframe
    );

    return {
      symbol: instrument.symbol,
      direction: getDirection(row),
      ready: row?.data_status === "READY",
      fresh: isAnalysisFresh(row),
    };
  });

  const readyRows = pulseRows.filter(
    (item) => item.ready
  );

  const bullish = readyRows.filter(
    (item) =>
      item.direction === "STRONG_BUY" ||
      item.direction === "BUY_BIAS"
  ).length;

  const bearish = readyRows.filter(
    (item) =>
      item.direction === "STRONG_SELL" ||
      item.direction === "SELL_BIAS"
  ).length;

  const neutral = readyRows.filter(
    (item) => item.direction === "MIXED"
  ).length;

  const classifiedTotal = bullish + bearish + neutral;
  const unclassified = pulseRows.length - classifiedTotal;

  const fresh = readyRows.filter(
    (item) => item.fresh
  ).length;

  const percentage = (count: number) =>
    classifiedTotal > 0
      ? `${(count / classifiedTotal) * 100}%`
      : "0%";

  const hasData = classifiedTotal > 0;

  
const dominantDirection =
  !hasData
    ? {
        title: "Market Classification Unavailable",
        description:
          "Insufficient technical data is available to determine the dominant market classification.",
        color: "text-slate-600",
        background: "bg-slate-50",
        border: "border-slate-200",
        icon: "—",
      }
    : bullish === bearish && bullish >= neutral
    ? {
        title: "Balanced Bullish and Bearish Signals",
        description:
          "The number of bullish and bearish instruments is equal.",
        color: "text-blue-700",
        background: "bg-blue-50",
        border: "border-blue-100",
        icon: "↔",
      }
    : bullish > bearish && bullish > neutral
    ? {
        title: "Bullish Signals Dominate",
        description:
          "More instruments are classified as bullish than bearish or neutral.",
        color: "text-emerald-700",
        background: "bg-emerald-50",
        border: "border-emerald-100",
        icon: "↗",
      }
    : bearish > bullish && bearish > neutral
    ? {
        title: "Bearish Signals Dominate",
        description:
          "More instruments are classified as bearish than bullish or neutral.",
        color: "text-rose-700",
        background: "bg-rose-50",
        border: "border-rose-100",
        icon: "↘",
      }
    : neutral > bullish && neutral > bearish
    ? {
        title: "Neutral Classifications Dominate",
        description:
          "Neutral instruments outnumber bullish and bearish instruments.",
        color: "text-slate-700",
        background: "bg-slate-100",
        border: "border-slate-200",
        icon: "↔",
      }
    : {
        title: "Mixed Market Signals",
        description:
          "No single market classification holds a clear majority.",
        color: "text-blue-700",
        background: "bg-blue-50",
        border: "border-blue-100",
        icon: "↔",
      };


  
const pulseStats = [
  {
    label: "Bullish Signals",
    value: bullish,
    color: "text-emerald-700",
    background: "bg-emerald-50",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
    percentage: percentage(bullish),
  },
  {
    label: "Bearish Signals",
    value: bearish,
    color: "text-rose-700",
    background: "bg-rose-50",
    border: "border-rose-100",
    dot: "bg-rose-500",
    percentage: percentage(bearish),
  },
  {
    label: "Neutral Signals",
    value: neutral,
    color: "text-slate-700",
    background: "bg-slate-50",
    border: "border-slate-200",
    dot: "bg-slate-400",
    percentage: percentage(neutral),
  },
  {
    label: "Unclassified Instruments",
    value: unclassified,
    color: "text-amber-700",
    background: "bg-amber-50",
    border: "border-amber-100",
    dot: "bg-amber-500",
    percentage: null,
  },
];


  return (
    <section
  id="market-pulse"
  dir="ltr"
  aria-labelledby="market-pulse-heading"
  className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] pt-4 pb-3 sm:pt-5 sm:pb-3"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

    <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_18px_45px_-28px_rgba(13,48,95,0.28)]">

          
{/* MARKET PULSE — ENGLISH NAVY HEADER */}

<div
  className="border-b border-[#244c7c] px-4 py-4 text-white sm:px-7 sm:py-5"
  style={{
    background:
      "linear-gradient(110deg,#205895 0%,#143b6c 45%,#091d36 100%)",
  }}
>
  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

    <div className="min-w-0 max-w-[950px]">
      <div className="mb-1.5 flex items-center gap-2 text-[10px] font-black tracking-wide text-blue-200">
        <Activity size={15} />
        MARKET PULSE & TREND DISTRIBUTION
      </div>

      <h2
        id="market-pulse-heading"
        className="text-[20px] font-black leading-[1.45] text-white sm:text-[27px]"
      >
        Financial Market
        <span className="text-[#64c7ff]">
          {" "}Technical Trend Overview
        </span>
      </h2>

      <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
        Explore the distribution of bullish, bearish
        and neutral technical classifications across
        forex currency pairs, gold and silver.
        The overview reflects the selected analysis timeframe.
      </p>
    </div>

    <div className="hidden shrink-0 items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 lg:flex">
      <BarChart3 size={21} className="text-blue-200" />

      <div>
        <p className="text-[10px] text-blue-200">
          Covered Instruments
        </p>

        <p className="text-lg font-black text-white">
          {pulseRows.length}
          <span className="ml-1 text-[11px] font-medium text-blue-200">
            Markets
          </span>
        </p>
      </div>
    </div>

  </div>
</div>


         
{/* MARKET PULSE — ENGLISH TIMEFRAME SELECTOR */}

<div className="flex flex-col gap-3 border-b border-blue-100 bg-[#eaf2ff] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-4">

  <div className="min-w-0">
    <h3 className="text-[12px] font-black text-[#10233f] sm:text-[13px]">
      Market Pulse Timeframe
    </h3>

    <p className="mt-1 text-[11px] leading-6 text-slate-500">
      Market classifications are calculated for
      the selected timeframe.
    </p>
  </div>

  <div
    dir="ltr"
    role="group"
    aria-label="Select market pulse timeframe"
    className="flex max-w-full gap-1.5 overflow-x-auto pb-1"
  >
    {TIMEFRAMES.map((frame) => (
      <button
        key={frame}
        type="button"
        onClick={() => setTimeframe(frame)}
        aria-pressed={timeframe === frame}
        className={`min-w-[42px] shrink-0 rounded-lg border px-2.5 py-2.5 text-[11px] font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:min-w-[45px] sm:px-3 ${
          timeframe === frame
            ? "border-blue-700 bg-blue-700 text-white shadow-sm"
            : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        }`}
      >
        {frame}
      </button>
    ))}
  </div>

</div>


          {/* ====================================================
              MARKET PULSE CONTENT
          ==================================================== */}

          
{/* MARKET PULSE CONTENT — ENGLISH */}

{loading && rows.length === 0 ? (

  <div className="px-6 py-14 text-center">
    <RefreshCw
      size={27}
      className="mx-auto mb-4 animate-spin text-blue-600"
    />

    <p className="text-sm font-bold text-slate-600">
      Loading Market Trend Overview...
    </p>
  </div>

) : rows.length === 0 ? (

  <div className="px-6 py-14 text-center">
    <Info
      size={27}
      className="mx-auto mb-4 text-slate-400"
    />

    <p className="text-sm font-bold text-slate-600">
      Technical analysis data is currently unavailable.
    </p>
  </div>

) : (

  <>

    {/* MARKET DOMINANT DIRECTION */}

    <div className="border-b border-slate-100 bg-white px-3 py-3 sm:px-7 sm:py-5">

      <div
        className={`flex flex-col gap-3 rounded-xl border px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-4 ${dominantDirection.border} ${dominantDirection.background}`}
      >
        <div className="flex min-w-0 items-center gap-3">

          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-black ${dominantDirection.color}`}
          >
            {dominantDirection.icon}
          </span>

          <div className="min-w-0">

            <p className="text-[10px] font-bold text-slate-500">
              Dominant Classification — {timeframe}
            </p>

            <h3
              className={`mt-1 text-[13px] font-black leading-6 sm:text-base ${dominantDirection.color}`}
            >
              {dominantDirection.title}
            </h3>

            <p className="mt-1 text-[11px] leading-6 text-slate-500">
              {dominantDirection.description}
            </p>

          </div>
        </div>

        <span className="self-start rounded-lg border border-white bg-white/80 px-3 py-2 text-[10px] font-bold text-slate-600 sm:self-auto sm:text-[11px]">
          {classifiedTotal} / {pulseRows.length} Classified
        </span>

      </div>

    </div>


              {/* ====================================================
                  FOUR MARKET STAT CARDS
              ==================================================== */}

              
{/* FOUR MARKET STAT CARDS — ENGLISH */}

<div className="px-3 py-3 sm:px-7 sm:py-6">

  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
    <div>
      <h3 className="text-[13px] font-black text-[#10233f] sm:text-base">
        Technical Trend Distribution
      </h3>

      <p className="mt-1 text-[10px] leading-5 text-slate-500 sm:text-[11px]">
        Classification summary for the selected markets
      </p>
    </div>

    <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700 sm:px-3 sm:py-2 sm:text-[11px]">
      Timeframe: {timeframe}
    </span>
  </div>

  <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">

    {pulseStats.map((stat) => (

      <div
        key={stat.label}
        className={`min-w-0 rounded-xl border p-3 sm:rounded-2xl sm:p-5 ${stat.border} ${stat.background}`}
      >
        <div className="mb-2 flex items-center gap-2 sm:mb-3">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${stat.dot}`}
          />

          <span className="min-w-0 text-[10px] font-bold leading-4 text-slate-500 sm:text-[11px]">
            {stat.label}
          </span>
        </div>

        <p
          className={`text-[27px] font-black tabular-nums sm:text-3xl ${stat.color}`}
        >
          {stat.value}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-1.5 sm:mt-3">
          <span className="text-[9px] leading-4 text-slate-500 sm:text-[10px]">
            {stat.percentage !== null
              ? "Of classified markets"
              : "Not classified"}
          </span>

          {stat.percentage !== null && (
            <span className={`text-xs font-black tabular-nums ${stat.color}`}>
              {classifiedTotal > 0
                ? `${((stat.value / classifiedTotal) * 100).toFixed(1)}%`
                : "0%"}
            </span>
          )}
        </div>
      </div>

    ))}

  </div>
</div>

{/* DISTRIBUTION BAR — ENGLISH */}

<div className="border-t border-slate-100 bg-[#f8faff] px-3 py-4 sm:px-7 sm:py-5">

  <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-4">

    <div>
      <h3 className="text-[13px] font-black text-[#10233f] sm:text-sm">
        Relative Market Trend Distribution
      </h3>

      <p className="mt-1 text-[10px] leading-5 text-slate-500 sm:text-[11px] sm:leading-6">
        Percentages are calculated from classified
        instruments only, excluding unclassified readings.
      </p>
    </div>

    <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600 sm:text-[11px]">
      {classifiedTotal} Classified Markets
    </span>
  </div>

  <div
    className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-200 sm:h-4"
    role="img"
    aria-label={`Bullish ${bullish}, bearish ${bearish}, neutral ${neutral}`}
  >
    <div
      className="bg-emerald-500 transition-all duration-300"
      style={{ width: percentage(bullish) }}
    />

    <div
      className="bg-rose-500 transition-all duration-300"
      style={{ width: percentage(bearish) }}
    />

    <div
      className="bg-slate-400 transition-all duration-300"
      style={{ width: percentage(neutral) }}
    />
  </div>

  <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-600 sm:mt-4 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2 sm:text-[11px]">

    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      Bullish: {bullish}
    </span>

    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-rose-500" />
      Bearish: {bearish}
    </span>

    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-slate-400" />
      Neutral: {neutral}
    </span>

    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-amber-500" />
      Unclassified: {unclassified}
    </span>

  </div>
</div>


              {/* ====================================================
                  DATA STATUS FOOTER
              ==================================================== */}

             
{/* DATA STATUS FOOTER — ENGLISH */}

<div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-4">

  <div className="flex flex-wrap items-center gap-2 sm:gap-3">

    <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[10px] font-black text-emerald-700 sm:px-3 sm:py-2 sm:text-[11px]">
      {readyRows.length} READY Analyses
    </span>

    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-600 sm:px-3 sm:py-2 sm:text-[11px]">
      {fresh} Recent Candle Readings
    </span>

    <p className="text-[10px] leading-5 text-slate-500 sm:text-[11px] sm:leading-6">
      Older classifications are stored snapshots,
      not real-time prices or executable trading signals.
    </p>
  </div>

  <a
    href="#scanner"
    className="inline-flex shrink-0 items-center gap-2 self-start text-[11px] font-black text-blue-700 transition hover:text-blue-900 hover:underline"
  >
    Explore All Market Analyses
    <ArrowLeft size={14} className="rotate-180" />
  </a>

</div>


            </>

          )}

       
        
{/* MARKET PULSE — ENGLISH DISCLAIMER */}

<div className="border-t border-slate-200 bg-[#f8faff] px-3 py-3 sm:px-7 sm:py-4">

  <div className="flex items-start gap-2.5">

    <Info
      size={15}
      className="mt-1 shrink-0 text-blue-600"
    />

    <p className="min-w-0 text-[10px] leading-6 text-slate-500 sm:text-[11px] sm:leading-7">
      This dashboard provides a statistical overview
      of technical classifications for financial instruments
      covered by Broker Alarab. Results are based on
      periodically updated analysis and may differ
      across timeframes. They do not guarantee future
      market direction or constitute personalized
      investment advice or trading recommendations.
    </p>

  </div>

</div>


        </div>

      </div>
    </section>

  );
})()}


      
{/* ============================================================
    03 — FOREX & METALS TECHNICAL MARKET EXPLORER
    Broker Alarab | English LTR | 1520px | SEO-focused
============================================================ */}

{(() => {
  const majorPairs = new Set([
    "EURUSD", "GBPUSD", "USDJPY", "USDCHF",
    "USDCAD", "AUDUSD", "NZDUSD",
  ]);

  const emergingPairs = new Set([
    "EURCZK", "EURHUF", "EURNOK", "EURSEK",
    "EURZAR", "GBPZAR", "USDCZK", "USDDKK",
    "USDHKD", "USDHUF", "USDMXN", "USDNOK",
    "USDSEK", "USDZAR",
  ]);

  
const currencyNames: Record<string, string> = {
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CZK: "Czech Koruna",
  DKK: "Danish Krone",
  EUR: "Euro",
  GBP: "British Pound",
  HKD: "Hong Kong Dollar",
  HUF: "Hungarian Forint",
  JPY: "Japanese Yen",
  MXN: "Mexican Peso",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  SEK: "Swedish Krona",
  USD: "US Dollar",
  ZAR: "South African Rand",
};


  
const segmentOptions = [
  { id: "all", label: "All Markets" },
  { id: "metals", label: "Gold & Silver" },
  { id: "major", label: "Major Forex Pairs" },
  { id: "cross", label: "Cross Currency Pairs" },
  { id: "emerging", label: "Emerging Market Currencies" },
] as const;

const frameLabels: Record<string, string> = {
  M5: "5 Minutes",
  M15: "15 Minutes",
  M30: "30 Minutes",
  H1: "1 Hour",
  H4: "4 Hours",
  D1: "Daily",
  W1: "Weekly",
};

const directionLabels: Record<string, string> = {
  STRONG_BUY: "Strong Buy",
  BUY_BIAS: "Buy",
  MIXED: "Neutral",
  SELL_BIAS: "Sell",
  STRONG_SELL: "Strong Sell",
  DATA_INCOMPLETE: "Data Unavailable",
};


  function getMarketGroup(item: Instrument) {
    if (item.type === "metals") return "metals";

    const pair = `${item.base}${item.quote}`;

    if (majorPairs.has(pair)) return "major";
    if (emergingPairs.has(pair)) return "emerging";

    return "cross";
  }

  
function getMarketName(item: Instrument) {
  if (item.symbol === "XAUUSDc") {
    return "Gold vs US Dollar";
  }

  if (item.symbol === "XAGUSDc") {
    return "Silver vs US Dollar";
  }

  return `${currencyNames[item.base] || item.base} / ${
    currencyNames[item.quote] || item.quote
  }`;
}

function getMarketLinkLabel(item: Instrument) {
  if (item.symbol === "XAUUSDc") {
    return "Gold Technical Analysis";
  }

  if (item.symbol === "XAGUSDc") {
    return "Silver Technical Analysis";
  }

  return `${item.base}/${item.quote} Technical Analysis`;
}


  function getTechnicalColor(direction: string) {
    if (direction === "STRONG_BUY") {
      return "bg-emerald-100 text-emerald-800";
    }

    if (direction === "BUY_BIAS") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (direction === "STRONG_SELL") {
      return "bg-rose-100 text-rose-800";
    }

    if (direction === "SELL_BIAS") {
      return "bg-rose-50 text-rose-700";
    }

    if (direction === "MIXED") {
      return "bg-slate-100 text-slate-700";
    }

    return "bg-amber-50 text-amber-700";
  }

  const normalizedQuery = query
    .trim()
    .toLowerCase()
    .replace(/[\s/_-]/g, "");

  
const marketRows = INSTRUMENTS.map((instrument) => {
  // Analysis data corresponds to the selected timeframe
  const row = rows.find(
    (item) =>
      item.symbol === instrument.symbol &&
      item.timeframe === timeframe
  );

  // Unified reference price from the latest completed M5 candle
  const priceRow = rows.find(
    (item) =>
      item.symbol === instrument.symbol &&
      item.timeframe === "M5"
  );

  const direction = getDirection(row);
  const group = getMarketGroup(instrument);
  const name = getMarketName(instrument);

  return {
    instrument,
    row,
    direction,
    group,
    name,
    ready: row?.data_status === "READY",
    fresh: isAnalysisFresh(row),
    price: numberValue(priceRow?.price),
  };
});


  const filteredMarkets = marketRows.filter((market) => {
    if (
      marketSegment !== "all" &&
      market.group !== marketSegment
    ) {
      return false;
    }

    const searchText = [
      market.instrument.symbol,
      market.instrument.base,
      market.instrument.quote,
      `${market.instrument.base}${market.instrument.quote}`,
      `${market.instrument.base}/${market.instrument.quote}`,
      market.name,
      market.instrument.slug,
    ]
      .join(" ")
      .toLowerCase()
      .replace(/[\s/_-]/g, "");

    if (
      normalizedQuery &&
      !searchText.includes(normalizedQuery)
    ) {
      return false;
    }

    if (
      directionFilter !== "all" &&
      market.direction !== directionFilter
    ) {
      return false;
    }

    return true;
  });

  const showEveryMarket =
    showAllPairs ||
    normalizedQuery.length > 0 ||
    directionFilter !== "all";

  const visibleMarkets = showEveryMarket
    ? filteredMarkets
    : filteredMarkets.slice(0, 12);

    // Mobile: show 8 initially. Desktop remains at 12.
const mobileVisibleMarkets = showEveryMarket
  ? filteredMarkets
  : filteredMarkets.slice(0, 8);

  const readyCount = marketRows.filter(
    (market) => market.ready
  ).length;

  const freshCount = marketRows.filter(
    (market) => market.ready && market.fresh
  ).length;

  return (
    <section
  id="scanner"
  dir="ltr"
  aria-labelledby="market-explorer-heading"
  className="relative overflow-hidden border-b border-slate-200 bg-[#f3f6fb] pt-3 pb-3 sm:pt-3 sm:pb-3"
>
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        



{/* ====================================================
    SCANNER HEADER — COMPACT / SAFE BACKGROUND
    ENGLISH LTR — ORIGINAL DESIGN
==================================================== */}

<div
  dir="ltr"
  className="overflow-hidden text-white"
  style={{
    background:
      "linear-gradient(110deg, #205895 0%, #143b6c 45%, #091d36 100%)",
  }}
>
  {/* TITLE AREA */}
  <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-7">
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="min-w-0 max-w-[980px]">
        <h2
          id="market-explorer-heading"
          className="text-[20px] font-black leading-[1.45] text-white sm:text-[27px]"
        >
          Forex Technical Analysis Scanner
          <span className="text-[#64c7ff]">
            {" "}for Gold, Silver & Currency Pairs
          </span>
        </h2>

        <p className="mt-2 max-w-[900px] text-[12px] leading-6 text-slate-200 sm:text-[13px]">
          Compare technical trends for gold, silver and forex
          currency pairs across seven timeframes. Explore buy
          and sell classifications, ADX trend strength and
          reference prices from completed market candles.
        </p>

        <p className="mt-1 text-[10px] leading-5 text-blue-200/80 sm:text-[11px]">
          Analysis results are descriptive, not trading
          recommendations. Prices are not real-time quotes,
          and each instrument displays its data freshness status.
        </p>
      </div>

      {/* MARKET COUNT */}
      <div className="hidden shrink-0 items-center gap-2 self-start rounded-lg border border-white/20 bg-white/10 px-3 py-2 sm:flex lg:self-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-[#78d2ff]">
          <Layers3 size={17} />
        </span>

        <div>
          <div className="text-[20px] font-black leading-none tabular-nums text-white">
            {INSTRUMENTS.length}
          </div>
          <p className="mt-1 text-[9px] font-semibold text-blue-100">
            Instruments Covered
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* QUICK MARKET LINKS */}
  <div
    className="hidden border-t border-white/10 px-3 py-2 sm:block sm:px-5"
    style={{ backgroundColor: "#07182e" }}
  >
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
      {[
        { label: "Gold Analysis", slug: "gold", mark: "Au" },
        { label: "Silver Analysis", slug: "silver", mark: "Ag" },
        { label: "EUR/USD", slug: "eur-usd", mark: "€" },
        { label: "GBP/USD", slug: "gbp-usd", mark: "£" },
        { label: "USD/JPY", slug: "usd-jpy", mark: "¥" },
        { label: "USD/CHF", slug: "usd-chf", mark: "Fr" },
        { label: "USD/CAD", slug: "usd-cad", mark: "C$" },
      ].map((market) => (
        <Link
          key={market.slug}
          href={`/en/technical-analysis/${market.slug}`}
          className="group flex min-h-[34px] min-w-0 items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 transition hover:bg-white/20"
        >
          <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-[#2664b6] px-1 text-[10px] font-black text-white">
            {market.mark}
          </span>

          <span className="min-w-0 flex-1 truncate text-[10px] font-extrabold text-white sm:text-[11px]">
            {market.label}
          </span>

          <ArrowUpLeft
            size={12}
            className="shrink-0 rotate-90 text-blue-200/70 transition group-hover:text-white"
          />
        </Link>
      ))}
    </div>
  </div>
</div>

{/* ====================================================
    MAIN SCANNER — ORIGINAL PREMIUM DESIGN
==================================================== */}

<div
  dir="ltr"
  className="overflow-hidden border border-t-0 border-[#cbd9ed] bg-white shadow-[0_18px_50px_-25px_rgba(13,48,95,0.24)]"
>
  {/* ====================================================
      MOBILE SCANNER — COMPACT SEARCH + TIMEFRAME
      Advanced filters remain collapsible.
  ==================================================== */}

  <div className="border-b border-[#cfdef0] bg-white px-3 py-3 lg:hidden">

    {/* SEARCH */}
    <div className="relative">
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
      />

      <input
        type="search"
        dir="ltr"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setShowAllPairs(false);
        }}
        placeholder="Search Gold, EUR/USD, GBP/USD..."
        aria-label="Search financial markets"
        className="h-11 w-full rounded-lg border border-blue-200 bg-white pl-10 pr-9 text-left text-[12px] font-semibold text-[#102d53] outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setShowAllPairs(false);
          }}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500"
        >
          <X size={15} />
        </button>
      )}
    </div>

    {/* TIMEFRAME */}
    <div className="mt-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[12px] font-black text-[#10233f]">
          Analysis Timeframe
        </span>

        <span className="text-[10px] font-semibold text-slate-500">
          {frameLabels[timeframe]}
        </span>
      </div>

      <div
        dir="ltr"
        role="group"
        aria-label="Select scanner timeframe"
        className="grid grid-cols-7 gap-1"
      >
        {TIMEFRAMES.map((frame) => (
          <button
            key={frame}
            type="button"
            aria-pressed={timeframe === frame}
            onClick={() => setTimeframe(frame)}
            className={`flex h-9 min-w-0 items-center justify-center rounded-md text-[10px] font-black transition ${
              timeframe === frame
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {frame}
          </button>
        ))}
      </div>
    </div>

    {/* ADVANCED FILTERS — CLOSED BY DEFAULT */}
    <details className="group mt-3 rounded-lg border border-slate-200 bg-[#f8faff]">
      <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 [&::-webkit-details-marker]:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <SlidersHorizontal
            size={15}
            className="shrink-0 text-blue-600"
          />

          <span className="text-[11px] font-black text-[#173b6a]">
            Advanced Filters
          </span>

          {(marketSegment !== "all" ||
            directionFilter !== "all") && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-black text-blue-700">
              Active
            </span>
          )}
        </div>

        <ChevronDown
          size={16}
          className="text-blue-600 transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="space-y-4 border-t border-slate-200 bg-white p-3">

        {/* MARKET CATEGORIES */}
        <div>
          <p className="mb-2 text-[11px] font-black text-[#10233f]">
            Market Category
          </p>

          <div className="flex flex-wrap gap-1.5">
            {segmentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={marketSegment === option.id}
                onClick={() => {
                  setMarketSegment(option.id);
                  setShowAllPairs(false);
                }}
                className={`rounded-lg border px-3 py-2 text-[10px] font-black transition ${
                  marketSegment === option.id
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* DIRECTION */}
        <div>
          <label
            htmlFor="mobile-scanner-direction"
            className="mb-2 block text-[11px] font-black text-[#10233f]"
          >
            Technical Direction
          </label>

          <select
            id="mobile-scanner-direction"
            value={directionFilter}
            onChange={(event) => {
              setDirectionFilter(event.target.value);
              setShowAllPairs(false);
            }}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-left text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="all">All Directions</option>
            <option value="STRONG_BUY">Strong Buy</option>
            <option value="BUY_BIAS">Buy</option>
            <option value="MIXED">Neutral</option>
            <option value="SELL_BIAS">Sell</option>
            <option value="STRONG_SELL">Strong Sell</option>
            <option value="DATA_INCOMPLETE">Incomplete Data</option>
          </select>
        </div>

        {/* RESET */}
        <button
          type="button"
          onClick={() => {
            setMarketSegment("all");
            setDirectionFilter("all");
            setQuery("");
            setShowAllPairs(false);
          }}
          className="w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-[11px] font-black text-blue-700"
        >
          Reset All Filters
        </button>
      </div>
    </details>
  </div>

  {/* ====================================================
      DESKTOP SCANNER CONTROLS — ENGLISH LTR
  ==================================================== */}

  <div className="hidden lg:block">

    {/* TOOLBAR */}
    <div className="border-b border-[#cfdef0] bg-gradient-to-r from-[#eaf2ff] via-[#f2f7ff] to-[#ffffff] p-5 sm:p-6">

      {/* SEARCH + COVERAGE STATUS */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        {/* SEARCH BOX */}
        <div className="relative w-full lg:max-w-[540px]">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1d5fd0]"
          />

          <input
            type="search"
            dir="ltr"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAllPairs(false);
            }}
            placeholder="Search Gold, Silver, EUR/USD, GBP/USD..."
            aria-label="Search financial markets"
            className="h-[48px] w-full rounded-xl border-2 border-[#a9c8f5] bg-white py-2.5 pl-12 pr-11 text-left text-[13px] font-semibold text-[#102d53] shadow-[0_3px_12px_rgba(30,90,170,0.07)] outline-none transition placeholder:font-normal placeholder:text-[#7184a1] hover:border-[#6ca4ef] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/10"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setShowAllPairs(false);
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:bg-blue-50"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* COVERAGE STATUS */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex min-h-[36px] items-center gap-2 rounded-lg border border-[#cbdcf4] bg-white px-3 py-2 shadow-sm">
            <CheckCircle2
              size={16}
              className="shrink-0 text-[#1d5fd0]"
            />
            <span className="text-[12px] font-extrabold text-[#173b6a]">
              {readyCount} of {INSTRUMENTS.length} Completed Analyses
            </span>
          </div>

          <div
            className={`inline-flex min-h-[36px] items-center gap-2 rounded-lg border px-3 py-2 shadow-sm ${
              freshCount > 0
                ? "border-emerald-200 bg-emerald-50"
                : "border-amber-200 bg-amber-50"
            }`}
          >
            <Clock3
              size={16}
              className={`shrink-0 ${
                freshCount > 0
                  ? "text-emerald-700"
                  : "text-amber-700"
              }`}
            />

            <span
              className={`text-[12px] font-extrabold ${
                freshCount > 0
                  ? "text-emerald-800"
                  : "text-amber-800"
              }`}
            >
              {freshCount} Recent Snapshots
            </span>
          </div>
        </div>
      </div>

      {/* MARKET CATEGORY TABS */}
      <div className="mt-6 flex flex-wrap gap-2">
        {segmentOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={marketSegment === option.id}
            onClick={() => {
              setMarketSegment(option.id);
              setShowAllPairs(false);
            }}
            className={`rounded-lg px-4 py-2.5 text-xs font-extrabold transition ${
              marketSegment === option.id
                ? "bg-[#102d53] text-white shadow-sm"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>

    {/* TIMEFRAME + DIRECTION FILTER */}
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-[#f8faff] p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-extrabold text-slate-600">
          Analysis Timeframe
        </span>

        <div
          dir="ltr"
          role="group"
          aria-label="Select technical scanner timeframe"
          className="flex max-w-full gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-1"
        >
          {TIMEFRAMES.map((frame) => (
            <button
              key={frame}
              type="button"
              aria-pressed={timeframe === frame}
              onClick={() => setTimeframe(frame)}
              className={`min-w-[49px] shrink-0 rounded-md px-3 py-2 text-xs font-black transition ${
                timeframe === frame
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              {frame}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-slate-400">
          {frameLabels[timeframe]}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor="scanner-direction-filter"
          className="text-xs font-extrabold text-slate-600"
        >
          Technical Direction
        </label>

        <select
          id="scanner-direction-filter"
          value={directionFilter}
          onChange={(event) =>
            setDirectionFilter(event.target.value)
          }
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="all">All Directions</option>
          <option value="STRONG_BUY">Strong Buy</option>
          <option value="BUY_BIAS">Buy</option>
          <option value="MIXED">Neutral</option>
          <option value="SELL_BIAS">Sell</option>
          <option value="STRONG_SELL">Strong Sell</option>
          <option value="DATA_INCOMPLETE">Incomplete Data</option>
        </select>

        <button
          type="button"
          onClick={() => {
            setMarketSegment("all");
            setQuery("");
            setDirectionFilter("all");
            setShowAllPairs(false);
          }}
          className="rounded-lg px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
        >
          Reset Filters
        </button>
      </div>
    </div>

    {/* ====================================================
        ADX EXPLANATION — COMPACT
    ==================================================== */}

    <div className="border-b border-[#cfdef0] bg-[#edf4fc] px-3 py-2 sm:px-5">
      <details className="group overflow-hidden rounded-lg border border-blue-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <Info size={17} className="shrink-0 text-blue-600" />

            <div>
              <p className="text-[12px] font-black text-[#102d53]">
                What Does the ADX Trend Strength Indicator Mean?
              </p>
              <p className="text-[10px] leading-5 text-slate-500">
                Expand to understand ADX values and trend strength
              </p>
            </div>
          </div>

          <ChevronDown
            size={17}
            className="shrink-0 text-blue-700 transition-transform group-open:rotate-180"
          />
        </summary>

        <div className="border-t border-[#dbe5f2] px-3 py-3 sm:px-4">
          <p className="text-[12px] leading-6 text-slate-700">
            The Average Directional Index (ADX) measures the
            strength of a market trend, regardless of whether
            prices are moving upward or downward. Higher
            readings generally suggest a stronger trend,
            but ADX does not determine direction on its own.
          </p>

          <div className="mt-3 overflow-hidden rounded-lg border border-[#d6e2f0]">
            <div className="grid grid-cols-2 bg-[#153963] px-3 py-2 text-[11px] font-black text-white">
              <span>ADX Value</span>
              <span>Interpretation</span>
            </div>

            {[
              ["Below 20", "Weak or ranging market"],
              ["20 to below 25", "Developing trend"],
              ["25 to below 40", "Established trend"],
              ["40 to below 50", "Strong trend"],
              ["50 and above", "Very strong trend"],
            ].map(([range, meaning], index) => (
              <div
                key={range}
                className={`grid grid-cols-2 gap-3 border-t border-slate-100 px-3 py-2 text-[11px] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f3f7fd]"
                }`}
              >
                <span className="font-black text-[#102d53]">
                  {range}
                </span>
                <span className="text-slate-700">
                  {meaning}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
            <p className="text-[11px] leading-6 text-[#183b6a]">
              <strong>Example:</strong> An ADX reading of 34.60
              can indicate an established trend, but it does
              not independently generate a buy or sell
              recommendation.
            </p>
          </div>

          <p className="mt-2 text-[10px] leading-5 text-slate-500">
            These ranges are commonly used interpretations,
            not absolute rules or trading recommendations.
          </p>
        </div>
      </details>
    </div>
  </div>

  {/* ====================================================
      DESKTOP MARKET TABLE — ENGLISH LTR
  ==================================================== */}

  <div className="hidden overflow-x-auto lg:block">
    <table
      dir="ltr"
      className="w-full min-w-[950px] text-left text-sm"
    >
      <thead className="bg-[#153963]">
        <tr className="border-b border-[#2d527e] text-[12px] font-black text-white">
          <th scope="col" className="px-5 py-4">
            Financial Market
          </th>
          <th scope="col" className="px-5 py-4">
            Latest M5 Close
          </th>
          <th scope="col" className="px-5 py-4">
            Technical Rating
          </th>
          <th scope="col" className="px-5 py-4 text-center">
            <div className="flex items-center justify-center gap-1.5">
              Trend Strength (ADX)
              <Info size={15} className="text-blue-200" />
            </div>
          </th>
          <th scope="col" className="px-5 py-4 text-center">
            Data Status
          </th>
          <th scope="col" className="px-5 py-4 text-center">
            Analysis Page
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-[#dde6f2]">
        {visibleMarkets.map((market, index) => {
          const instrument = market.instrument;

          const adx =
            numberValue(market.row?.indicators?.adx14) ??
            numberValue(market.row?.adx);

          const strength =
            market.ready && adx !== null
              ? getAdxStrength(adx)
              : null;

          return (
            <tr
              key={instrument.symbol}
              className={`transition-colors hover:bg-[#e6f0ff] ${
                symbol === instrument.symbol
                  ? "bg-[#dfecff]"
                  : index % 2 === 0
                  ? "bg-white"
                  : "bg-[#f2f6fc]"
              }`}
            >
              {/* MARKET */}
              <td className="px-5 py-4">
                <button
                  type="button"
                  onClick={() => setSymbol(instrument.symbol)}
                  className="group text-left"
                >
                  <span
                    dir="ltr"
                    className="block text-left text-[14px] font-black text-[#102d53] group-hover:text-blue-700"
                  >
                    {instrument.base}/{instrument.quote}
                  </span>

                  <span className="mt-1 block max-w-[250px] text-[12px] leading-6 text-slate-600">
                    {market.name}
                  </span>
                </button>
              </td>

              {/* M5 REFERENCE PRICE */}
              <td
                dir="ltr"
                className="px-5 py-4 text-left text-[14px] font-black tabular-nums text-[#10233f]"
              >
                {formatPrice(
                  market.price,
                  instrument.type === "metals" ? 2 : 5
                )}
              </td>

              {/* TECHNICAL DIRECTION */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-lg px-3 py-1.5 text-[12px] font-black ${getTechnicalColor(
                    market.direction
                  )}`}
                >
                  {directionLabels[market.direction] || "Unavailable"}
                </span>
              </td>

              {/* ADX VALUE + INTERPRETATION */}
              <td className="px-5 py-3 text-center align-middle">
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <span
                    dir="ltr"
                    className="text-[15px] font-black tabular-nums text-[#10233f]"
                  >
                    {market.ready ? formatPrice(adx, 2) : "—"}
                  </span>

                  {strength && (
                    <span
                      className={`inline-flex min-w-[85px] items-center justify-center rounded-md px-2 py-1 text-[11px] font-extrabold ${strength.style}`}
                    >
                      {strength.label}
                    </span>
                  )}
                </div>
              </td>

              {/* DATA FRESHNESS */}
              <td className="px-5 py-4 text-center align-middle">
                <span
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-black ${
                    !market.ready
                      ? "bg-slate-100 text-slate-500"
                      : market.fresh
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      !market.ready
                        ? "bg-slate-400"
                        : market.fresh
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />

                  {!market.ready
                    ? "Unavailable"
                    : market.fresh
                    ? "Recent"
                    : "Outdated"}
                </span>
              </td>

              {/* ANALYSIS PAGE — COMING SOON / NOT CLICKABLE */}
<td className="px-5 py-4 text-center align-middle">
  <div className="inline-flex flex-wrap items-center justify-center gap-2">
    <span className="cursor-default text-[12px] font-semibold text-slate-500">
      {getMarketLinkLabel(instrument)}
    </span>

    <span className="inline-flex items-center rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-700">
      Soon
    </span>
  </div>
</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* ====================================================
      MOBILE MARKET CARDS — COMPACT ENGLISH VERSION
      Mobile: 8 results initially
      Desktop: 12 results initially
  ==================================================== */}

  <div className="grid gap-2.5 p-3 sm:grid-cols-2 lg:hidden">
    {mobileVisibleMarkets.map((market) => {
      const instrument = market.instrument;

      const adx =
        numberValue(market.row?.indicators?.adx14) ??
        numberValue(market.row?.adx);

      return (
        <article
          key={instrument.symbol}
          className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
        >
          {/* MARKET NAME + DIRECTION */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3
                dir="ltr"
                className="text-left text-[14px] font-black leading-5 text-[#10233f]"
              >
                {instrument.base}/{instrument.quote}
              </h3>

              <p className="mt-0.5 line-clamp-1 text-[10px] leading-5 text-slate-500">
                {market.name}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-extrabold ${getTechnicalColor(
                market.direction
              )}`}
            >
              {directionLabels[market.direction] || "Unavailable"}
            </span>
          </div>

          {/* PRICE + ADX — COMPACT ROW */}
          <div className="mt-2.5 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 px-2.5 py-2">

            {/* LAST CLOSED PRICE */}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-slate-500">
                Reference Price (M5)
              </p>

              <p
                dir="ltr"
                className="mt-1 text-left text-[14px] font-black tabular-nums text-[#10233f]"
              >
                {formatPrice(
                  market.price,
                  instrument.type === "metals" ? 2 : 5
                )}
              </p>
            </div>

            {/* ADX */}
            <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-center">
              <p className="text-[10px] font-bold leading-4 text-slate-500">
                Trend Strength (ADX)
              </p>

              <p
                dir="ltr"
                className="text-[14px] font-black tabular-nums text-[#10233f]"
              >
                {market.ready ? formatPrice(adx, 2) : "—"}
              </p>

              {market.ready && adx !== null && (
                <span
                  className={`inline-flex min-w-[56px] items-center justify-center rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                    getAdxStrength(adx).style
                  }`}
                >
                  {getAdxStrength(adx).label}
                </span>
              )}
            </div>
          </div>

          {/* ANALYSIS PAGE — COMING SOON / MOBILE */}
<div className="mt-2.5 flex min-h-7 flex-wrap items-center gap-2">
  <span className="cursor-default text-[11px] font-semibold text-slate-500">
    {getMarketLinkLabel(instrument)}
  </span>

  <span className="inline-flex items-center rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-700">
    Soon
  </span>
</div>
        </article>
      );
    })}
  </div>



{/* ====================================================
    NO RESULTS — ENGLISH
==================================================== */}

{filteredMarkets.length === 0 && (
  <div className="border-t border-slate-100 px-4 py-9 text-center sm:px-5 sm:py-12">
    <Search size={26} className="mx-auto text-slate-400" />

    <h3 className="mt-3 text-base font-black text-slate-800">
      No Matching Markets Found
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Try changing your search, timeframe or technical direction filter.
    </p>

    <button
      type="button"
      onClick={() => {
        setQuery("");
        setMarketSegment("all");
        setDirectionFilter("all");
        setShowAllPairs(false);
      }}
      className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white"
    >
      View All Markets
    </button>
  </div>
)}

{/* ====================================================
    SCANNER FOOTER
    Mobile: 8 results | Desktop: 12 results
==================================================== */}

<div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-[#f8faff] px-3 py-3 sm:px-6 sm:py-4">

  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 sm:text-xs">

    <span className="lg:hidden">
      Showing{" "}
      <strong className="text-slate-800">
        {mobileVisibleMarkets.length}
      </strong>{" "}
      of{" "}
      <strong className="text-slate-800">
        {filteredMarkets.length}
      </strong>{" "}
      markets
    </span>

    <span className="hidden lg:inline">
      Showing{" "}
      <strong className="text-slate-800">
        {visibleMarkets.length}
      </strong>{" "}
      of{" "}
      <strong className="text-slate-800">
        {filteredMarkets.length}
      </strong>{" "}
      markets
    </span>

    <span className="hidden h-4 w-px bg-slate-200 sm:block" />

    <span>
      Selected Timeframe:{" "}
      <strong className="text-slate-800">
        {timeframe}
      </strong>
    </span>
  </div>

  {/* MOBILE — SHOW MORE */}

  {!showEveryMarket && filteredMarkets.length > 8 && (
    <button
      type="button"
      onClick={() => setShowAllPairs(true)}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-xs font-extrabold text-blue-700 transition hover:bg-blue-50 lg:hidden"
    >
      Show More ({filteredMarkets.length - 8})
      <ChevronDown size={15} />
    </button>
  )}

  {/* DESKTOP — SHOW MORE */}

  {!showEveryMarket && filteredMarkets.length > 12 && (
    <button
      type="button"
      onClick={() => setShowAllPairs(true)}
      className="hidden items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-xs font-extrabold text-blue-700 transition hover:bg-blue-50 lg:inline-flex"
    >
      Show All Results
      <ChevronDown size={15} />
    </button>
  )}

  {/* MOBILE — SHOW LESS */}

  {showAllPairs &&
    !normalizedQuery &&
    directionFilter === "all" &&
    filteredMarkets.length > 8 && (
      <button
        type="button"
        onClick={() => setShowAllPairs(false)}
        className="w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-black text-blue-700 lg:hidden"
      >
        Show Less — Return to 8 Markets
      </button>
    )}

  {/* DESKTOP — SHOW LESS */}

  {showAllPairs &&
    !normalizedQuery &&
    directionFilter === "all" &&
    filteredMarkets.length > 12 && (
      <button
        type="button"
        onClick={() => setShowAllPairs(false)}
        className="hidden text-xs font-bold text-blue-700 hover:underline lg:inline"
      >
        Show Fewer Results
      </button>
    )}

</div>
</div>

{/* ====================================================
    SCANNER SEO EDITORIAL CONTENT — ENGLISH
==================================================== */}

<div
  dir="ltr"
  className="mt-4 grid gap-5 border border-[#cbd9ed] bg-white px-4 py-5 text-left shadow-sm sm:mt-5 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-[1.3fr_0.7fr]"
>
  <div>
    <h3 className="text-xl font-black text-[#10233f]">
      How Can Forex Technical Analysis Help You Understand Market Trends?
    </h3>

    <p className="mt-3 text-sm leading-8 text-slate-600">
      Forex technical analysis helps traders study price
      movements using trends, moving averages, momentum
      indicators and volatility measurements. Comparing
      shorter timeframes with longer ones can reveal
      differences between short-term price movements
      and the broader market trend.
    </p>

    <p className="mt-3 text-sm leading-8 text-slate-600">
      Broker Alarab provides technical analysis for gold,
      silver and forex currency pairs using a consistent
      analytical methodology. Individual instrument pages,
      where available, provide additional information about
      technical indicators, price levels and the latest
      recorded data updates.
    </p>
  </div>

  <aside className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
    <div className="mb-3 flex items-center gap-2 text-blue-700">
      <Info size={19} />

      <h3 className="font-black">
        How to Interpret Technical Scanner Results
      </h3>
    </div>

    <p className="text-sm leading-8 text-slate-600">
      A buy or sell classification reflects the combined
      direction of technical indicators on the selected
      timeframe. It is not an instruction to execute a
      trade. Classifications may differ across timeframes,
      and the displayed information consists of periodic
      analysis snapshots rather than real-time market prices.
    </p>
  </aside>
</div>

      </div>
    </section>
  );
})()}

{/* ============================================================
    04 — MULTI-TIMEFRAME TECHNICAL HEATMAP
    Broker Alarab | English LTR | 1520px
    44 Instruments × 7 Timeframes
    Uses existing rows, symbol, timeframe and setters
============================================================ */}

{(() => {
  const heatmapDirections: Record<
    string,
    { label: string; short: string; style: string }
  > = {
    STRONG_BUY: {
      label: "Strong Buy",
      short: "Strong Buy",
      style: "bg-emerald-600 text-white",
    },
    BUY_BIAS: {
      label: "Buy",
      short: "Buy",
      style: "bg-emerald-100 text-emerald-800",
    },
    MIXED: {
      label: "Neutral",
      short: "Neutral",
      style: "bg-slate-100 text-slate-600",
    },
    SELL_BIAS: {
      label: "Sell",
      short: "Sell",
      style: "bg-rose-100 text-rose-800",
    },
    STRONG_SELL: {
      label: "Strong Sell",
      short: "Strong Sell",
      style: "bg-rose-600 text-white",
    },
    DATA_INCOMPLETE: {
      label: "Incomplete Data",
      short: "—",
      style: "bg-slate-50 text-slate-400",
    },
  };

  const heatmapFrameNames: Record<string, string> = {
    M5: "5 Minutes",
    M15: "15 Minutes",
    M30: "30 Minutes",
    H1: "1 Hour",
    H4: "4 Hours",
    D1: "Daily",
    W1: "Weekly",
  };

  // Featured markets first, followed by other instruments.

  const preferredSymbols = [
    "XAUUSDc",
    "XAGUSDc",
    "EURUSDc",
    "GBPUSDc",
    "USDJPYc",
    "USDCHFc",
    "USDCADc",
    "AUDUSDc",
    "NZDUSDc",
    "EURGBPc",
    "EURJPYc",
    "GBPJPYc",
  ];

  const priorityMap = new Map(
    preferredSymbols.map((item, index) => [item, index])
  );

  const allHeatmapInstruments = [...INSTRUMENTS]
    .filter((item) => {
      if (heatmapCategory === "metals") {
        return item.type === "metals";
      }

      if (heatmapCategory === "forex") {
        return item.type === "forex";
      }

      return true;
    })
    .sort((a, b) => {
      const aRank = priorityMap.get(a.symbol);
      const bRank = priorityMap.get(b.symbol);

      if (aRank !== undefined && bRank !== undefined) {
        return aRank - bRank;
      }

      if (aRank !== undefined) return -1;
      if (bRank !== undefined) return 1;

      return a.symbol.localeCompare(b.symbol);
    });

  const visibleHeatmapInstruments = heatmapExpanded
    ? allHeatmapInstruments
    : allHeatmapInstruments.slice(0, 12);

  // Mobile: 6 instruments initially.
  // Desktop: 12 instruments initially.

  const mobileVisibleHeatmapInstruments = heatmapExpanded
    ? allHeatmapInstruments
    : allHeatmapInstruments.slice(0, 6);

  // Index analysis rows for fast lookups.

  const heatmapIndex = new Map(
    rows.map((item) => [
      `${item.symbol}:${item.timeframe}`,
      item,
    ])
  );

  function getHeatmapCell(
    instrumentSymbol: string,
    frame: string
  ) {
    const row = heatmapIndex.get(
      `${instrumentSymbol}:${frame}`
    );

    const direction = getDirection(row);

    const status =
      heatmapDirections[direction] ||
      heatmapDirections.DATA_INCOMPLETE;

    const ready = row?.data_status === "READY";
    const fresh = isAnalysisFresh(row);

    return {
      row,
      direction,
      status,
      ready,
      fresh,
    };
  }

  const selectedFrameReady = INSTRUMENTS.filter((item) => {
    return (
      heatmapIndex.get(`${item.symbol}:${timeframe}`)
        ?.data_status === "READY"
    );
  }).length;

  const allReadyCells = rows.filter(
    (item) => item.data_status === "READY"
  ).length;

  return (
    <section
      id="market-heatmap"
      dir="ltr"
      aria-labelledby="market-heatmap-heading"
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] pt-3 pb-3 sm:pb-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        <div className="w-full overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* ====================================================
              HEATMAP NAVY HEADER — ENGLISH
          ==================================================== */}

          <div
            className="border-b border-[#244c7c] px-4 py-4 text-left text-white sm:px-6 sm:py-5 lg:px-7"
            style={{
              background:
                "linear-gradient(110deg, #205895 0%, #143b6c 45%, #091d36 100%)",
            }}
          >
            <div className="flex flex-col gap-2 sm:gap-3">

              <div className="flex items-center gap-2 text-[10px] font-black tracking-wide text-blue-200">
                <Activity size={15} />
                MARKET HEATMAP
              </div>

              <h2
                id="market-heatmap-heading"
                className="text-[20px] font-black leading-[1.45] tracking-tight text-white sm:text-[25px] lg:text-[27px]"
              >
                Multi-Timeframe Technical Heatmap
                <span className="text-[#64c7ff]">
                  {" "}for Forex, Gold & Silver
                </span>
              </h2>

              <p className="max-w-[900px] text-[11px] font-medium leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
                Compare technical trend classifications for
                gold, silver and forex currency pairs across
                seven timeframes. Identify where buy, sell
                and neutral readings differ between short-term
                and longer-term market analysis.
              </p>

            </div>
          </div>

          {/* ====================================================
              CATEGORY FILTERS
          ==================================================== */}

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-3 py-3 sm:px-6 sm:py-5">

            <div
              role="group"
              aria-label="Filter technical heatmap markets"
              className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:gap-2"
            >
              {[
                { id: "all", label: "All Markets" },
                { id: "metals", label: "Gold & Silver" },
                { id: "forex", label: "Forex Pairs" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={heatmapCategory === item.id}
                  onClick={() => {
                    setHeatmapCategory(
                      item.id as "all" | "metals" | "forex"
                    );
                    setHeatmapExpanded(false);
                  }}
                  className={`min-w-0 rounded-lg px-1.5 py-2 text-[10px] font-extrabold transition sm:px-4 sm:py-2.5 sm:text-xs ${
                    heatmapCategory === item.id
                      ? "bg-[#102d53] text-white"
                      : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden flex-wrap items-center gap-2 text-xs text-slate-500 sm:flex">
              <Clock3 size={15} className="text-blue-600" />
              Periodic technical analysis, not real-time trading signals
            </div>

          </div>

          {/* ====================================================
              DESKTOP LEGEND
          ==================================================== */}

          <div className="hidden flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-[#fafcff] px-5 py-4 sm:px-6 lg:flex">

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {[
                { label: "Strong Buy", color: "bg-emerald-600" },
                { label: "Buy", color: "bg-emerald-200" },
                { label: "Neutral", color: "bg-slate-300" },
                { label: "Sell", color: "bg-rose-200" },
                { label: "Strong Sell", color: "bg-rose-600" },
                { label: "Incomplete", color: "bg-slate-100" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600"
                >
                  <span
                    className={`h-3 w-3 rounded-[3px] border border-black/5 ${item.color}`}
                  />
                  {item.label}
                </span>
              ))}
            </div>

            <div className="text-[11px] font-semibold text-slate-500">
              {timeframe}: {selectedFrameReady} of{" "}
              {INSTRUMENTS.length} Analyses Ready
            </div>

          </div>

          {/* ====================================================
              MOBILE COLOR LEGEND
          ==================================================== */}

          <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-[#fafcff] px-3 py-2.5 text-[10px] font-bold text-slate-600 lg:hidden">

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
              Buy
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-rose-500" />
              Sell
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-slate-400" />
              Neutral
            </span>

            <span className="text-slate-400">
              Outdated readings are identified within the cards
            </span>

          </div>

          {/* ====================================================
              DESKTOP HEATMAP TABLE — LTR
          ==================================================== */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full min-w-[950px] border-collapse text-left">

              <thead>
                <tr className="border-b border-slate-200 bg-white">

                  <th
                    scope="col"
                    className="sticky left-0 z-20 min-w-[185px] bg-white px-5 py-4 text-left text-xs font-black text-[#10233f]"
                  >
                    Financial Market
                  </th>

                  {TIMEFRAMES.map((frame) => (
                    <th
                      scope="col"
                      key={frame}
                      className={`min-w-[96px] px-2 py-4 text-center ${
                        timeframe === frame ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="text-xs font-black text-[#10233f]">
                        {frame}
                      </div>

                      <div className="mt-1 text-[10px] font-normal text-slate-400">
                        {heatmapFrameNames[frame]}
                      </div>
                    </th>
                  ))}

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {visibleHeatmapInstruments.map((instrument) => (
                  <tr
                    key={instrument.symbol}
                    className={`group transition-colors hover:bg-blue-50/30 ${
                      symbol === instrument.symbol
                        ? "bg-blue-50/20"
                        : ""
                    }`}
                  >
                    {/* MARKET NAME */}

                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white px-5 py-3 text-left group-hover:bg-[#f8fbff]"
                    >
                      <Link
                        href={`/en/technical-analysis/${instrument.slug}`}
                        className="block"
                        title={`${instrument.base}/${instrument.quote} Technical Analysis`}
                      >
                        <span
                          dir="ltr"
                          className="block text-left text-sm font-black text-[#10233f] hover:text-blue-700"
                        >
                          {instrument.base}/{instrument.quote}
                        </span>

                        <span className="mt-1 block text-[11px] font-normal text-slate-500">
                          {instrument.type === "metals"
                            ? instrument.name
                            : "Forex Currency Pair"}
                        </span>
                      </Link>
                    </th>

                    {/* SEVEN TIMEFRAME CELLS */}

                    {TIMEFRAMES.map((frame) => {
                      const cell = getHeatmapCell(
                        instrument.symbol,
                        frame
                      );

                      const currentlySelected =
                        symbol === instrument.symbol &&
                        timeframe === frame;

                      const cellLabel = cell.ready
                        ? cell.status.label
                        : "Incomplete Data";

                      return (
                        <td
                          key={frame}
                          className={`px-2 py-2.5 text-center ${
                            timeframe === frame
                              ? "bg-blue-50/35"
                              : ""
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSymbol(instrument.symbol);
                              setTimeframe(frame);

                              document
                                .getElementById("technical-overview")
                                ?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                            }}
                            aria-pressed={currentlySelected}
                            aria-label={`${instrument.base}/${instrument.quote}, ${heatmapFrameNames[frame]}, ${cellLabel}${
                              cell.ready && !cell.fresh
                                ? ", outdated data"
                                : ""
                            }`}
                            title={`${instrument.base}/${instrument.quote} | ${frame} | ${cellLabel}${
                              cell.ready && !cell.fresh
                                ? " | Outdated Snapshot"
                                : ""
                            }`}
                            className={`flex min-h-[43px] w-full flex-col items-center justify-center rounded-lg border px-1.5 py-2 text-[11px] font-extrabold transition hover:-translate-y-0.5 hover:shadow-sm ${
                              currentlySelected
                                ? "border-blue-600 ring-2 ring-blue-200"
                                : "border-transparent"
                            } ${
                              cell.ready
                                ? cell.status.style
                                : heatmapDirections.DATA_INCOMPLETE.style
                            } ${
                              cell.ready && !cell.fresh
                                ? "opacity-75"
                                : ""
                            }`}
                          >
                            <span>
                              {cell.ready
                                ? cell.status.short
                                : "Incomplete"}
                            </span>

                            {cell.ready && !cell.fresh && (
                              <span className="mt-0.5 text-[9px] font-medium">
                                Outdated
                              </span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {/* ====================================================
              MOBILE HEATMAP — NO HORIZONTAL SCROLL
              One card per instrument
              Seven timeframes per card
          ==================================================== */}

          <div className="grid gap-2.5 bg-[#f7f9fd] px-3 pb-2 pt-3 sm:grid-cols-2 lg:hidden">

            {mobileVisibleHeatmapInstruments.map((instrument) => (
              <article
                key={instrument.symbol}
                className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                {/* INSTRUMENT HEADER */}

                <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-3 py-3">

                  <div className="min-w-0">
                    <Link
                      href={`/en/technical-analysis/${instrument.slug}`}
                      className="block"
                    >
                      <h3
                        dir="ltr"
                        className="text-left text-[14px] font-black text-[#10233f]"
                      >
                        {instrument.base}/{instrument.quote}
                      </h3>

                      <p className="mt-0.5 truncate text-[10px] text-slate-500">
                        {instrument.type === "metals"
                          ? instrument.name
                          : getInstrumentArabicName(instrument)}
                      </p>
                    </Link>
                  </div>

                  <span className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
                    7 Timeframes
                  </span>
                </div>

                {/* SEVEN TIMEFRAME CELLS */}

                <div
                  dir="ltr"
                  className="grid grid-cols-4 gap-1.5 p-2.5"
                >
                  {TIMEFRAMES.map((frame) => {
                    const cell = getHeatmapCell(
                      instrument.symbol,
                      frame
                    );

                    const currentlySelected =
                      symbol === instrument.symbol &&
                      timeframe === frame;

                    const cellLabel = cell.ready
                      ? cell.status.label
                      : "Incomplete Data";

                    return (
                      <button
                        key={frame}
                        type="button"
                        onClick={() => {
                          setSymbol(instrument.symbol);
                          setTimeframe(frame);

                          document
                            .getElementById("technical-overview")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
                        aria-pressed={currentlySelected}
                        aria-label={`${instrument.base}/${instrument.quote}, ${heatmapFrameNames[frame]}, ${cellLabel}${
                          cell.ready && !cell.fresh
                            ? ", outdated data"
                            : ""
                        }`}
                        className={`flex min-h-[61px] min-w-0 flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2 text-center transition active:scale-[0.98] ${
                          currentlySelected
                            ? "border-blue-600 ring-2 ring-blue-200"
                            : "border-slate-100"
                        } ${
                          cell.ready
                            ? cell.status.style
                            : heatmapDirections.DATA_INCOMPLETE.style
                        }`}
                      >
                        <span className="text-[10px] font-black">
                          {frame}
                        </span>

                        <span className="text-[9px] font-extrabold leading-3">
                          {cell.ready
                            ? cell.status.short
                            : "Incomplete"}
                        </span>

                        {cell.ready && !cell.fresh && (
                          <span className="text-[8px] font-medium leading-3 opacity-75">
                            Outdated
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* MOBILE CARD FOOTER */}

                <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-[#fafcff] px-3 py-2">

                  <span className="text-[10px] text-slate-500">
                    Select a timeframe to view its analysis
                  </span>

                  <Link
                    href={`/en/technical-analysis/${instrument.slug}`}
                    className="inline-flex items-center gap-1 text-[10px] font-black text-blue-700"
                  >
                    Details
                    <ArrowLeft
                      size={12}
                      className="rotate-180"
                    />
                  </Link>

                </div>
              </article>
            ))}

          </div>

          {/* ====================================================
              HEATMAP RESULTS FOOTER
              Mobile: 6 | Desktop: 12
          ==================================================== */}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-[#f7f9fd] px-3 py-3 sm:px-6 sm:py-4">

            {/* MOBILE RESULT COUNT */}

            <div className="text-[11px] font-medium text-slate-500 lg:hidden">
              Showing{" "}
              <strong className="font-black text-[#10233f]">
                {mobileVisibleHeatmapInstruments.length}
              </strong>{" "}
              of{" "}
              <strong className="font-black text-[#10233f]">
                {allHeatmapInstruments.length}
              </strong>{" "}
              markets
            </div>

            {/* DESKTOP RESULT COUNT */}

            <div className="hidden text-xs text-slate-500 lg:block">
              Showing{" "}
              <strong className="text-[#10233f]">
                {visibleHeatmapInstruments.length}
              </strong>{" "}
              of{" "}
              <strong className="text-[#10233f]">
                {allHeatmapInstruments.length}
              </strong>{" "}
              markets
            </div>

            {/* MOBILE EXPAND BUTTON */}

            {allHeatmapInstruments.length > 6 && (
              <button
                type="button"
                onClick={() =>
                  setHeatmapExpanded((previous) => !previous)
                }
                aria-expanded={heatmapExpanded}
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-[11px] font-black text-blue-700 transition hover:bg-blue-50 lg:hidden"
              >
                {heatmapExpanded ? "Show Less" : "Show More"}

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    heatmapExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}

            {/* DESKTOP EXPAND BUTTON */}

            {allHeatmapInstruments.length > 12 && (
              <button
                type="button"
                onClick={() =>
                  setHeatmapExpanded((previous) => !previous)
                }
                aria-expanded={heatmapExpanded}
                className="hidden items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-5 py-2.5 text-xs font-black text-blue-700 transition hover:bg-blue-50 lg:inline-flex"
              >
                {heatmapExpanded
                  ? "Show Fewer Markets"
                  : "Show All Markets"}

                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    heatmapExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}

          </div>

          {/* ====================================================
              HEATMAP EDUCATIONAL CONTENT — ENGLISH
          ==================================================== */}

          <div className="grid gap-4 border-t-4 border-[#d9e7fa] bg-white px-4 pb-5 pt-6 sm:gap-6 sm:px-7 sm:py-7 lg:grid-cols-[1.25fr_0.75fr]">

            <div>
              <div className="mb-3 flex items-center gap-2">
                <BookOpen
                  size={17}
                  className="shrink-0 text-blue-700"
                />

                <span className="text-[10px] font-black tracking-wide text-blue-700">
                  TECHNICAL HEATMAP GUIDE
                </span>
              </div>

              <h3 className="text-[18px] font-black leading-8 text-[#10233f] sm:text-xl">
                How to Compare Forex Trends Across Multiple Timeframes
              </h3>

              <p className="mt-3 text-sm leading-8 text-slate-600">
                Multi-timeframe technical analysis helps
                compare short-term price trends with
                longer-term market movements. For example,
                EUR/USD indicators may show a buying bias
                on the 15-minute timeframe while the daily
                analysis suggests a different market direction.
              </p>

              <p className="mt-3 text-sm leading-8 text-slate-600">
                Broker Alarab brings technical classifications
                for gold, silver and forex currency pairs
                into one interactive heatmap. Each market
                can be examined across seven timeframes,
                and individual analysis pages provide
                additional instrument-specific details
                where available.
              </p>
            </div>

            <aside className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">

              <div className="flex items-center gap-2">
                <Info size={19} className="text-blue-700" />

                <h3 className="font-black text-[#10233f]">
                  What Do the Heatmap Colors Mean?
                </h3>
              </div>

              <p className="mt-3 text-sm leading-8 text-slate-600">
                Green indicates a buy classification,
                red indicates a sell classification,
                and grey represents neutral or incomplete
                technical readings. Outdated data is
                identified separately. The colors do not
                represent guaranteed market outcomes or
                probabilities of a profitable trade.
              </p>

              <p className="mt-3 text-xs leading-7 text-slate-500">
                Every instrument and timeframe is evaluated
                using the same technical analysis engine.
                Results may differ because the underlying
                completed price candles and indicator
                readings vary between timeframes.
              </p>

            </aside>

          </div>

          {/* END HEATMAP MAIN CARD */}
        </div>

        {/* END HEATMAP CONTAINER */}
      </div>
    </section>
  );
})()}

{/* ============================================================
    05 — TECHNICAL ANALYSIS EDUCATION + FEATURED BROKERS
    Broker Alarab | English LTR | Responsive Design
    Max width: 1520px
============================================================ */}

<section
  id="forex-technical-analysis-guide"
  dir="ltr"
  aria-labelledby="forex-guide-heading"
  className="border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
>
  <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

    <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

      {/* ================= NAVY HEADER ================= */}

      <div
        className="px-4 py-4 text-left text-white sm:px-7 sm:py-5"
        style={{
          background:
            "linear-gradient(110deg, #205895 0%, #143b6c 45%, #091d36 100%)",
        }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0 max-w-[1050px]">

            <div className="mb-1.5 flex items-center gap-2 text-[10px] font-black text-blue-200">
              <BookOpen size={14} />
              TECHNICAL ANALYSIS GUIDE
            </div>

            <h2
              id="forex-guide-heading"
              className="text-[20px] font-black leading-[1.45] text-white sm:text-[26px]"
            >
              How to Read Technical Analysis
              <span className="text-[#64c7ff]">
                {" "}for Forex and Gold
              </span>
            </h2>

            <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
              Learn how to interpret market trends,
              timeframes and technical indicators,
              including buy and sell classifications
              and trend strength, without treating
              them as trading recommendations.
            </p>
          </div>

          <a
            href="#technical-overview"
            className="hidden min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[11px] font-black text-white transition hover:bg-white/20 lg:inline-flex"
          >
            Try Interactive Technical Analysis
            <ArrowLeft size={14} className="rotate-180" />
          </a>

        </div>
      </div>

      {/* ================= EDUCATIONAL CONTENT ================= */}

      <div className="p-3 sm:p-5">

        <div className="grid gap-2.5 md:grid-cols-3">

          {[
            {
              title: "How Are Forex Trends Identified?",
              description:
                "Moving averages and trend indicators help classify market conditions as bullish, bearish or sideways. These classifications reflect the technical engine's readings at the time of calculation.",
              icon: TrendingUp,
              href: "#scanner",
              link: "Explore Forex Trends",
            },
            {
              title: "Why Do Timeframe Signals Differ?",
              description:
                "A short timeframe may show a buy classification while the daily timeframe indicates a sell classification. Comparing seven timeframes helps explain the difference between short-term movements and broader market trends.",
              icon: Layers3,
              href: "#market-heatmap",
              link: "Compare Seven Timeframes",
            },
            {
              title: "How Do Technical Indicators Work?",
              description:
                "RSI and MACD help assess momentum, ADX measures trend strength, and ATR measures volatility. Agreement between indicators does not guarantee a successful trade.",
              icon: Activity,
              href: "#technical-overview",
              link: "Explore Technical Indicators",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex min-w-0 flex-col rounded-xl border border-[#dce6f4] bg-[#fafcff] p-3.5 sm:p-4"
              >
                <div className="flex items-center gap-2.5">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon size={18} />
                  </span>

                  <h3 className="text-[13px] font-black text-[#10233f]">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-2 text-[11px] leading-6 text-slate-600 sm:text-[12px]">
                  {item.description}
                </p>

                <a
                  href={item.href}
                  className="mt-3 inline-flex items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline md:mt-auto md:pt-3"
                >
                  {item.link}
                  <ArrowLeft size={13} className="rotate-180" />
                </a>
              </article>
            );
          })}

        </div>

        {/* ================= SIGNAL INTERPRETATION ================= */}

        <div className="mt-3 overflow-hidden rounded-xl border border-[#dce6f4] bg-white">

          <div className="border-b border-slate-100 bg-[#f7faff] px-4 py-3">

            <div className="flex items-center gap-2">
              <Gauge size={17} className="text-blue-700" />

              <h3 className="text-[13px] font-black text-[#10233f] sm:text-[15px]">
                How to Interpret Buy, Sell and Trend Strength Signals
              </h3>
            </div>

            <p className="mt-1.5 text-[11px] leading-6 text-slate-500">
              Evaluate the technical classification alongside
              ADX trend strength, the selected timeframe
              and the latest data update, rather than
              relying on a single indicator.
            </p>
          </div>

          <div className="grid gap-px bg-slate-200 md:grid-cols-3">

            {[
              {
                label: "Strong Buy",
                title: "Bullish Indicator Agreement",
                text:
                  "Indicates that bullish technical readings dominate on the selected timeframe. It does not guarantee that prices will continue rising.",
                color: "bg-emerald-50 text-emerald-700",
              },
              {
                label: "Strong Sell",
                title: "Bearish Indicator Agreement",
                text:
                  "Indicates that bearish technical readings dominate at the time of calculation. It is not a recommendation to open a sell position.",
                color: "bg-rose-50 text-rose-700",
              },
              {
                label: "ADX",
                title: "Trend Strength Is Not Direction",
                text:
                  "ADX measures the strength of a market trend regardless of whether prices are rising or falling. A high ADX reading alone is not a buy or sell signal.",
                color: "bg-indigo-50 text-indigo-700",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="bg-white px-4 py-3"
              >
                <div className="flex flex-wrap items-center gap-2">

                  <span
                    className={`rounded-md px-2 py-1 text-[10px] font-black ${item.color}`}
                  >
                    {item.label}
                  </span>

                  <h4 className="text-[12px] font-black text-[#10233f]">
                    {item.title}
                  </h4>
                </div>

                <p className="mt-2 text-[11px] leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}

          </div>

          <div className="flex flex-col gap-2 border-t border-slate-100 bg-blue-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[11px] leading-6 text-slate-600">
              <strong className="text-[#10233f]">
                Example:
              </strong>{" "}
              An ADX reading may be high while the overall
              technical classification remains neutral.
              Trend strength does not necessarily mean
              that technical indicators agree on whether
              prices will rise or fall.
            </p>

            <a
              href="#scanner"
              className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline"
            >
              Explore the Scanner
              <ArrowLeft size={13} className="rotate-180" />
            </a>

          </div>
        </div>

        {/* ================= TECHNICAL VS FUNDAMENTAL ================= */}

        <div className="mt-3 flex flex-col gap-2 rounded-lg bg-[#f4f7fc] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

          <p className="min-w-0 text-[11px] leading-6 text-slate-600">
            <strong className="text-[#10233f]">
              Technical vs Fundamental Analysis:
            </strong>{" "}
            Technical analysis examines price movements
            and market indicators, while fundamental
            analysis considers interest rate decisions,
            economic data and other market drivers.
            Combining both approaches can provide
            a broader understanding of market conditions.
          </p>

          <Link
            href="/en/interest-rates"
            className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline"
          >
            Explore Interest Rates
            <ArrowLeft size={13} className="rotate-180" />
          </Link>

        </div>

      </div>


     
{/* ====================================================
    FEATURED BROKERS — RESPONSIVE LOGO GRID
    English LTR — Existing Supabase Records
==================================================== */}

<div className="border-t border-[#cbd9ed] bg-[#f8faff] px-3 py-4 sm:px-5 sm:py-5">
  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div className="flex items-center gap-2">
        <ShieldCheck size={17} className="text-blue-700" />
        <h3 className="text-[15px] font-black text-[#10233f] sm:text-[17px]">
          Compare Forex Brokers Before Opening an Account
        </h3>
      </div>
      <p className="mt-1 text-[11px] leading-6 text-slate-500">
        Explore trading accounts, fees, platforms and regulatory
        information for selected brokers.
      </p>
    </div>

    <Link
      href="/en/best-brokers"
      className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline"
    >
      Compare All Brokers
      <ArrowLeft size={13} className="rotate-180" />
    </Link>
  </div>

  {featuredBrokersLoading ? (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-[115px] animate-pulse rounded-xl bg-slate-200"
        />
      ))}
    </div>
  ) : featuredBrokersError || featuredBrokers.length === 0 ? (
    <div className="border border-slate-200 bg-white p-5 text-center">
      <Link
        href="/en/best-brokers"
        className="text-xs font-black text-blue-700"
      >
        Explore Forex Broker Reviews
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-5">
      {featuredBrokers.map((broker, index) => {
        const logoPath =
          typeof broker.logo === "string" &&
          broker.logo.startsWith("/brokers/") &&
          !broker.logo.includes("..") &&
          !broker.logo.includes("?")
            ? broker.logo
            : null;

        const reviewUrl =
          FEATURED_BROKER_LINKS[broker.id] ||
          "/en/best-brokers";

        const isLastOdd =
          featuredBrokers.length % 2 === 1 &&
          index === featuredBrokers.length - 1;

        return (
          <article
            key={broker.id}
            className={`flex min-w-0 flex-col items-center justify-between rounded-xl border border-[#dce6f4] bg-white px-2.5 py-3 transition hover:border-blue-300 hover:shadow-sm sm:px-3 ${
              isLastOdd ? "col-span-2 lg:col-span-1" : ""
            }`}
          >
            {/* BROKER LOGO */}

            <Link
  href={reviewUrl}
  aria-label={`Read ${broker.name} broker review`}
  className="flex h-[46px] w-full items-center justify-center overflow-hidden"
>
  {logoPath ? (
    <img
      src={logoPath}
      alt={`${broker.name} broker logo`}
      loading="lazy"
      className={
        Number(broker.id) === 25
          ? "block !h-[34px] !w-[165px] !max-w-[165px] !max-h-[34px] !scale-100 object-contain"
          : "block h-[46px] w-full max-w-[190px] scale-[1.65] object-contain"
      }
    />
  ) : (
    <span className="text-[16px] font-black text-[#10233f]">
      {broker.name}
    </span>
  )}
</Link>

            {/* BROKER REVIEW LINK */}

            <Link
              href={reviewUrl}
              className="mt-1 inline-flex min-h-6 items-center justify-center gap-1 text-center text-[10px] font-black text-blue-700 hover:underline sm:text-[11px]"
            >
              {broker.name} Review
              <ArrowLeft size={12} className="shrink-0 rotate-180" />
            </Link>
          </article>
        );
      })}
    </div>
  )}
</div>

{/* COMMERCIAL DISCLOSURE */}

<div className="border-t border-slate-100 bg-white px-4 py-2.5 sm:px-5">
  <p className="text-[10px] leading-5 text-slate-500">
    Promotional placement of selected brokers. Broker selection
    is independent of technical analysis results, and broker
    review pages may contain affiliate links. Trading involves
    risk. Always review regulatory information and trading terms.
  </p>
</div>

    </div>
  </div>
</section>

{/* ============================================================
    06 — TWO MARKET TECHNICAL COMPARISON LAB
    Broker Alarab | Interactive | English LTR | 1520px
    Existing Supabase Rows — No Additional Requests
============================================================ */}

{(() => {
  const firstInstrument =
    INSTRUMENTS.find((item) => item.symbol === compareFirst) ||
    INSTRUMENTS[0];

  const secondInstrument =
    INSTRUMENTS.find((item) => item.symbol === compareSecond) ||
    INSTRUMENTS[1];

  const comparisonFrames = TIMEFRAMES;

  const analysisLookup = new Map(
    rows.map((row) => [`${row.symbol}:${row.timeframe}`, row])
  );

  function getComparisonData(instrument: Instrument) {
    const row = analysisLookup.get(
      `${instrument.symbol}:${timeframe}`
    );

    const priceRow = analysisLookup.get(
      `${instrument.symbol}:M5`
    );

    const ready = row?.data_status === "READY";
    const direction = getDirection(row);
    const fresh = isAnalysisFresh(row);

    const buy = ready ? numberValue(row?.buy_votes) : null;
    const sell = ready ? numberValue(row?.sell_votes) : null;
    const neutral = ready
      ? numberValue(row?.neutral_votes)
      : null;

    const hasVotes =
      buy !== null &&
      sell !== null &&
      neutral !== null &&
      buy >= 0 &&
      sell >= 0 &&
      neutral >= 0;

    const total = hasVotes ? buy + sell + neutral : 0;

    return {
      row,
      ready,
      fresh,
      direction,
      price: numberValue(priceRow?.price),
      buy,
      sell,
      neutral,
      hasVotes,
      total,
    };
  }

  const firstData = getComparisonData(firstInstrument);
  const secondData = getComparisonData(secondInstrument);

  const labels: Record<string, string> = {
    STRONG_BUY: "Strong Buy",
    BUY_BIAS: "Buy",
    MIXED: "Neutral",
    SELL_BIAS: "Sell",
    STRONG_SELL: "Strong Sell",
    DATA_INCOMPLETE: "Unavailable",
  };

  const styles: Record<string, string> = {
    STRONG_BUY: "bg-emerald-100 text-emerald-800",
    BUY_BIAS: "bg-emerald-50 text-emerald-700",
    MIXED: "bg-slate-100 text-slate-700",
    SELL_BIAS: "bg-rose-50 text-rose-700",
    STRONG_SELL: "bg-rose-100 text-rose-800",
    DATA_INCOMPLETE: "bg-slate-100 text-slate-500",
  };

  function directionSide(value: string) {
    if (value === "STRONG_BUY" || value === "BUY_BIAS") {
      return "buy";
    }

    if (value === "STRONG_SELL" || value === "SELL_BIAS") {
      return "sell";
    }

    if (value === "MIXED") return "neutral";

    return "unknown";
  }

  const firstSide = directionSide(firstData.direction);
  const secondSide = directionSide(secondData.direction);

  const bothReady = firstData.ready && secondData.ready;

  const comparisonMessage = !bothReady
    ? "Complete technical data is unavailable for both markets on the selected timeframe."
    : !firstData.fresh || !secondData.fresh
    ? "Historical technical readings are available, but at least one is outdated."
    : firstSide === secondSide && firstSide !== "unknown"
    ? "Both markets share the same general technical direction on this timeframe."
    : "The two markets have different technical classifications on this timeframe.";

  // Compare all seven timeframes using the same engine.

  const frameComparison = comparisonFrames.map((frame) => {
    const firstRow = analysisLookup.get(
      `${firstInstrument.symbol}:${frame}`
    );

    const secondRow = analysisLookup.get(
      `${secondInstrument.symbol}:${frame}`
    );

    const firstDirection = getDirection(firstRow);
    const secondDirection = getDirection(secondRow);

    const firstReady = firstRow?.data_status === "READY";
    const secondReady = secondRow?.data_status === "READY";

    const comparable = firstReady && secondReady;

    const sameSide =
      comparable &&
      directionSide(firstDirection) ===
        directionSide(secondDirection);

    return {
      frame,
      firstDirection,
      secondDirection,
      comparable,
      sameSide,
    };
  });

  const comparableCount = frameComparison.filter(
    (item) => item.comparable
  ).length;

  const agreementCount = frameComparison.filter(
    (item) => item.sameSide
  ).length;

  return (
    <section
      id="market-comparison-lab"
      dir="ltr"
      aria-labelledby="market-comparison-heading"
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* NAVY HEADER */}

          <div
            className="px-4 py-4 text-white sm:px-7 sm:py-5"
            style={{
              background:
                "linear-gradient(110deg,#205895 0%,#143b6c 45%,#091d36 100%)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-2 text-[10px] font-black text-blue-200">
                  <ArrowLeft size={14} className="rotate-180" />
                  MARKET COMPARISON
                </div>

                <h2
                  id="market-comparison-heading"
                  className="text-[20px] font-black leading-[1.4] text-white sm:text-[27px]"
                >
                  Compare Technical Analysis
                  <span className="text-[#64c7ff]">
                    {" "}Across Financial Markets
                  </span>
                </h2>

                <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
                  Compare gold, silver and forex currency pairs.
                  Explore technical direction, indicator votes
                  and classifications across seven timeframes.
                </p>
              </div>

              <span className="hidden shrink-0 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-bold text-blue-100 lg:inline-flex">
                <Clock3 size={14} />
                Periodic Analysis
              </span>
            </div>
          </div>

          {/* ASSET SELECTORS */}

          <div className="border-b border-[#dce6f4] bg-[#f8faff] p-3 sm:p-5">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">

              {[
                {
                  id: "compare-first-market",
                  label: "First Market",
                  value: compareFirst,
                  setter: setCompareFirst,
                },
                {
                  id: "compare-second-market",
                  label: "Second Market",
                  value: compareSecond,
                  setter: setCompareSecond,
                },
              ].map((field) => (
                <div key={field.id} className="min-w-0">
                  <label
                    htmlFor={field.id}
                    className="mb-1.5 block text-[10px] font-black text-[#10233f] sm:text-xs"
                  >
                    {field.label}
                  </label>

                  <select
                    id={field.id}
                    value={field.value}
                    onChange={(event) =>
                      field.setter(event.target.value)
                    }
                    className="h-11 w-full min-w-0 rounded-lg border border-[#cbd9ed] bg-white px-2 text-[10px] font-bold text-[#10233f] outline-none focus:border-blue-500 sm:h-12 sm:px-3 sm:text-xs"
                  >
                    <optgroup label="Gold & Silver">
                      {INSTRUMENTS.filter(
                        (item) => item.type === "metals"
                      ).map((item) => (
                        <option
                          key={item.symbol}
                          value={item.symbol}
                        >
                          {item.base}/{item.quote} — {item.name}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Forex Currency Pairs">
                      {INSTRUMENTS.filter(
                        (item) => item.type === "forex"
                      ).map((item) => (
                        <option
                          key={item.symbol}
                          value={item.symbol}
                        >
                          {item.base}/{item.quote}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setCompareFirst(compareSecond);
                  setCompareSecond(compareFirst);
                }}
                className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-[11px] font-black text-blue-700 hover:bg-blue-50"
              >
                <span>⇄</span>
                Swap Markets
              </button>

              <span className="text-[10px] text-slate-500">
                Select Two Markets to Compare
              </span>
            </div>
          </div>

          {/* SHARED TIMEFRAME */}

          <div className="border-b border-slate-200 bg-white px-3 py-3 sm:px-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-[12px] font-black text-[#10233f]">
                Comparison Timeframe
              </h3>

              <span className="text-[10px] text-slate-500">
                {timeframe}
              </span>
            </div>

            <div
              dir="ltr"
              className="grid grid-cols-7 gap-1.5"
              role="group"
              aria-label="Select comparison timeframe"
            >
              {TIMEFRAMES.map((frame) => (
                <button
                  key={frame}
                  type="button"
                  onClick={() => setTimeframe(frame)}
                  aria-pressed={timeframe === frame}
                  className={`flex h-9 min-w-0 items-center justify-center rounded-md text-[10px] font-black transition sm:h-10 sm:text-xs ${
                    timeframe === frame
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-[#f8faff] text-slate-600 hover:bg-blue-50"
                  }`}
                >
                  {frame}
                </button>
              ))}
            </div>
          </div>

          {/* COMPARISON CARDS */}

          <div className="grid grid-cols-2 gap-2 bg-[#f7f9fd] p-3 sm:gap-4 sm:p-5">
            {[
              {
                instrument: firstInstrument,
                data: firstData,
              },
              {
                instrument: secondInstrument,
                data: secondData,
              },
            ].map(({ instrument, data }) => (
              <article
                key={instrument.symbol}
                className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#dce6f4] bg-white"
              >
                {/* SYMBOL AND SIGNAL */}

                <div className="border-b border-slate-100 px-2.5 py-3 sm:px-5 sm:py-4">
                  <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <div className="min-w-0 text-center sm:text-left">
                      <h3
                        dir="ltr"
                        className="text-center text-[15px] font-black text-[#10233f] sm:text-left sm:text-[23px]"
                      >
                        {instrument.base}/{instrument.quote}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-[9px] text-slate-500 sm:text-xs">
                        {getInstrumentArabicName(instrument)}
                      </p>
                    </div>

                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-black sm:text-xs ${
                        styles[data.direction] ||
                        styles.DATA_INCOMPLETE
                      }`}
                    >
                      {labels[data.direction] || "Unavailable"}
                    </span>
                  </div>
                </div>

                {/* PRICE */}

                <div className="px-2.5 py-2 text-center sm:px-5 sm:py-3 sm:text-left">
                  <p className="text-[10px] font-semibold text-slate-500">
                    Latest M5 Candle Close
                  </p>

                  <p
                    dir="ltr"
                    className="mt-1 text-center text-[17px] font-black tabular-nums text-[#10233f] sm:text-left sm:text-[25px]"
                  >
                    {formatPrice(
                      data.price,
                      instrument.type === "metals" ? 2 : 5
                    )}
                  </p>

                  <span
                    className={`mt-1 inline-block text-[10px] font-bold ${
                      !data.ready
                        ? "text-slate-400"
                        : data.fresh
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {!data.ready
                      ? "Unavailable"
                      : data.fresh
                      ? "Recent"
                      : "Historical"}
                  </span>
                </div>

                {/* VOTES */}

                <div className="mt-auto grid grid-cols-3 gap-1 px-2 pb-3 sm:gap-2 sm:px-5 sm:pb-4">
                  {[
                    {
                      label: "Buy",
                      value: data.buy,
                      color: "bg-emerald-50 text-emerald-700",
                    },
                    {
                      label: "Neutral",
                      value: data.neutral,
                      color: "bg-slate-100 text-slate-700",
                    },
                    {
                      label: "Sell",
                      value: data.sell,
                      color: "bg-rose-50 text-rose-700",
                    },
                  ].map((vote) => (
                    <div
                      key={vote.label}
                      className={`rounded-md px-0.5 py-2 text-center ${vote.color}`}
                    >
                      <p className="text-[15px] font-black sm:text-xl">
                        {data.hasVotes ? vote.value : "—"}
                      </p>

                      <p className="mt-0.5 text-[9px] font-semibold sm:text-[11px]">
                        {vote.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* DETAILS */}

                <div className="border-t border-slate-100 px-2.5 py-2.5 text-center sm:px-5 sm:text-left">
                  <p className="hidden text-[10px] text-slate-400 sm:block">
                    Last Calculated:{" "}
                    {dateText(data.row?.calculated_at_utc)}
                  </p>

                  <Link
                    href={`/en/technical-analysis/${instrument.slug}`}
                    className="inline-flex items-center justify-center gap-1 text-[10px] font-black text-blue-700 hover:underline sm:mt-2 sm:text-xs"
                  >
                    Detailed Analysis
                    <ArrowLeft
                      size={12}
                      className="rotate-180"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* MULTI-TIMEFRAME AGREEMENT */}

          <div className="border-t border-[#dce6f4] bg-white px-3 py-4 sm:px-5 sm:py-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-[14px] font-black text-[#10233f] sm:text-[17px]">
                  Technical Direction Agreement Across Timeframes
                </h3>

                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  Compare both markets across seven timeframes.
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-blue-700">
                {agreementCount} of {comparableCount} Agree
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7 sm:gap-2">
              {frameComparison.map((item) => (
                <button
                  key={item.frame}
                  type="button"
                  onClick={() => setTimeframe(item.frame)}
                  aria-pressed={timeframe === item.frame}
                  className={`min-w-0 rounded-lg border px-1 py-2.5 text-center transition sm:py-3 ${
                    timeframe === item.frame
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-200"
                      : "border-slate-200 bg-[#f8faff] hover:border-blue-300"
                  }`}
                >
                  <p className="text-[11px] font-black text-[#10233f]">
                    {item.frame}
                  </p>

                  <p
                    className={`mt-1 text-[10px] font-bold ${
                      !item.comparable
                        ? "text-slate-400"
                        : item.sameSide
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {!item.comparable
                      ? "Unavailable"
                      : item.sameSide
                      ? "Agree"
                      : "Differ"}
                  </p>
                </button>
              ))}
            </div>

            <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
              {comparisonMessage} Agreement in technical
              classifications does not establish a proven
              price correlation or guarantee a trading opportunity.
            </p>
          </div>

          {/* FOOTER */}

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-[#f8faff] px-3 py-3 sm:px-5">
            <p className="text-[10px] leading-5 text-slate-500">
              Technical analyses are periodic and based on
              historical market data.
            </p>

            <a
              href="#market-heatmap"
              className="inline-flex items-center gap-1 text-[11px] font-black text-blue-700 hover:underline"
            >
              Explore the Market Heatmap
              <ArrowLeft size={13} className="rotate-180" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
})()}

<InterestRateSnapshotSection />

{/* ============================================================
    10 — TECHNICAL ANALYSIS FAQ
    Broker Alarab | English LTR | Single Column
============================================================ */}

{(() => {
  type FaqItem = {
    question: string;
    answer: string;
    href: string;
    linkText: string;
  };

  type FaqGroup = {
    title: string;
    items: FaqItem[];
  };

  const groups: FaqGroup[] = [
    {
      title: "Gold and Forex Technical Analysis",
      items: [
        {
          question:
            "Where Can I Find Gold Technical Analysis with Support and Resistance Levels?",
          answer:
            "You can explore XAU/USD technical analysis through Broker Alarab's technical analysis hub, which displays indicator classifications across multiple timeframes. The gold zones section also provides recorded support and resistance levels, reference prices, and report timestamps. Always check the latest calculation date because these are analytical snapshots, not real-time trading quotes.",
          href: "#gold-support-resistance",
          linkText: "Explore Gold Support and Resistance",
        },
        {
          question:
            "How Can I Tell Whether EUR/USD Is Showing a Buy, Sell or Neutral Signal?",
          answer:
            "Select EUR/USD in the technical scanner and choose your preferred timeframe. Review the overall classification, moving averages, momentum indicators and trend strength. Conflicting readings between indicators or timeframes reflect differences in technical conditions and should not be interpreted as a confirmed entry signal.",
          href: "#scanner",
          linkText: "Explore EUR/USD Technical Analysis",
        },
        {
          question:
            "Is Gold Technical Analysis Different from Forex Analysis?",
          answer:
            "The same technical indicators can be applied to gold and currency pairs, but volatility, liquidity, price behaviour and economic drivers differ. Gold is influenced by the US dollar, real yields and economic expectations, while forex pairs respond to differences in monetary policy and economic conditions between countries. Risk assumptions should therefore be adjusted to each instrument.",
          href: "#central-bank-interest-rates",
          linkText: "Explore Interest Rate Decisions",
        },
      ],
    },
    {
      title: "Technical Indicators and Trading Signals",
      items: [
        {
          question:
            "What Do Strong Buy and Strong Sell Mean in Technical Analysis?",
          answer:
            "A Strong Buy or Strong Sell classification indicates that multiple technical indicator conditions favour the same direction according to the analysis engine and selected timeframe. It does not represent a percentage probability of trade success or guarantee that the trend will continue. The reference price, calculation time, timeframe and data completeness should also be considered.",
          href: "#technical-overview",
          linkText: "Understand Technical Classifications",
        },
        {
          question:
            "What Is the Difference Between RSI, MACD and ADX in Forex Analysis?",
          answer:
            "RSI measures relative price momentum, MACD studies relationships between moving averages and momentum direction, and ADX measures trend strength without independently indicating whether the trend is bullish or bearish. These indicators may produce different readings for the same instrument and should be considered alongside price behaviour rather than in isolation.",
          href: "#technical-overview",
          linkText: "Explore Technical Indicator Readings",
        },
        {
          question:
            "Why Might RSI Suggest Buying While MACD Suggests Selling?",
          answer:
            "Indicators use different calculation methods and lookback periods, so one may respond to changes in momentum before another. Conflicting readings can occur during market corrections, sideways movements or trend transitions. A disagreement does not automatically mean that one indicator is incorrect. It is useful to examine price position, trend strength and other timeframes.",
          href: "#market-heatmap",
          linkText: "Compare Trends Across Timeframes",
        },
      ],
    },
    {
      title: "Support, Resistance and Pivot Points",
      items: [
        {
          question:
            "How Can I Find the Nearest Gold Support and Resistance Zones?",
          answer:
            "Support and resistance zones are compared with the recorded reference price at the time of analysis. A zone below the reference price may be classified as support, while a zone above it may be classified as resistance. The displayed price distance is a mathematical measurement, and the role of a zone can change following breakouts or new market data.",
          href: "#gold-support-resistance",
          linkText: "Compare Gold Price Zones",
        },
        {
          question:
            "What Is the Difference Between Pivot Points, Support, Resistance and a Role Flip?",
          answer:
            "A calculated Pivot Point is a mathematical reference level derived from previous price data, while support and resistance zones identify areas of historical price interaction. A Role Flip occurs when previous resistance potentially acts as support after a breakout and retest, or vice versa. Crossing a level alone does not confirm that a role reversal has occurred.",
          href: "#gold-support-resistance",
          linkText: "Explore Gold Pivot and Price Levels",
        },
        {
          question:
            "How Can I Distinguish a Genuine Resistance Breakout from a False Breakout?",
          answer:
            "No method can guarantee a distinction between genuine and false breakouts. Traders may examine candle closes outside a price zone, subsequent retests, momentum, trend strength and agreement across timeframes. Prices can still return inside the zone even when some conditions are met, so these observations are technical evidence rather than confirmation of success.",
          href: "#gold-support-resistance",
          linkText: "Review Gold Price Reaction Zones",
        },
      ],
    },
    {
      title: "Timeframes and Technical Data Updates",
      items: [
        {
          question:
            "Which Timeframe Is Best for Technical Analysis: M15, H1, H4 or D1?",
          answer:
            "There is no single best timeframe for every trader or financial instrument. Shorter timeframes capture faster price fluctuations, while four-hour and daily charts provide broader trend context. Comparing M15, H1, H4 and D1 can reveal agreement or conflict between technical readings. The preferred timeframe should also reflect the intended holding period and risk management approach.",
          href: "#market-heatmap",
          linkText: "Compare All Seven Timeframes",
        },
        {
          question:
            "Why Does Gold Show Different Signals on the Hourly and Daily Timeframes?",
          answer:
            "Each timeframe uses different completed historical candles, affecting moving averages, momentum indicators and trend calculations. A short-term price increase can occur within a broader daily downtrend. Different technical classifications are therefore not necessarily errors; they can reflect different periods of market movement.",
          href: "#market-comparison-lab",
          linkText: "Try the Technical Comparison Tool",
        },
        {
          question:
            "Is This Technical Analysis Live, and How Often Are Signals Updated?",
          answer:
            "Broker Alarab displays periodically generated technical analysis snapshots calculated from available market candle data. They should not be treated as live executable prices. Calculation timestamps and data status are provided when available. Historical or incomplete readings may no longer represent current market conditions, so always review the recorded update time.",
          href: "#technical-analysis-methodology",
          linkText: "Review Data Status and Methodology",
        },
      ],
    },
  ];

  return (
    <section
      id="technical-analysis-faq"
      aria-labelledby="technical-faq-heading"
      dir="ltr"
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        <div className="w-full overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* NAVY HEADER */}

          <header
            className="px-4 py-4 text-white sm:px-7 sm:py-5"
            style={{
              background:
                "linear-gradient(110deg,#205895 0%,#143b6c 45%,#091d36 100%)",
            }}
          >
            <div className="mb-1.5 flex items-center gap-2 text-[10px] font-black tracking-wide text-blue-200">
              <BookOpen size={15} />
              TECHNICAL ANALYSIS FAQ
            </div>

            <h2
              id="technical-faq-heading"
              className="text-[20px] font-black leading-[1.45] text-white sm:text-[27px]"
            >
              Frequently Asked Questions About
              <span className="text-[#64c7ff]">
                {" "}Forex and Gold Technical Analysis
              </span>
            </h2>

            <p className="mt-2 max-w-[950px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
              Find answers about gold and forex analysis,
              technical indicator classifications, support
              and resistance levels, timeframes and data updates.
            </p>
          </header>

          {/* FAQ GROUPS */}

          <div className="bg-[#f8faff] p-3 sm:p-5">
            <div className="space-y-3 sm:space-y-4">

              {groups.map((group, groupIndex) => (
                <div
                  key={group.title}
                  className="overflow-hidden rounded-xl border border-[#dce6f4] bg-white"
                >
                  {/* GROUP HEADING */}

                  <div className="flex items-center gap-2.5 border-b border-[#dce6f4] bg-[#f1f6fe] px-3 py-3 sm:px-5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[10px] font-black text-blue-700">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>

                    <h3 className="min-w-0 flex-1 text-[12px] font-black leading-5 text-[#10233f] sm:text-[15px]">
                      {group.title}
                    </h3>

                    <span className="hidden text-[10px] font-semibold text-slate-400 sm:inline">
                      {group.items.length} Questions
                    </span>
                  </div>

                  {/* QUESTION LIST */}

                  <div className="divide-y divide-[#e8eef7]">
                    {group.items.map((item) => (
                      <details
                        key={item.question}
                        className="group"
                      >
                        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-left transition hover:bg-[#f8fbff] sm:min-h-12 sm:px-5 [&::-webkit-details-marker]:hidden">
                          <span className="min-w-0 flex-1 text-[12px] font-bold leading-6 text-[#10233f] group-open:text-blue-700 sm:text-[13px]">
                            {item.question}
                          </span>

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition group-open:bg-blue-600 group-open:text-white">
                            <ChevronDown
                              size={15}
                              className="transition-transform duration-200 group-open:rotate-180"
                            />
                          </span>
                        </summary>

                        {/* EXPANDED ANSWER */}

                        <div className="border-t border-[#e8eef7] bg-[#fafcff] px-3 pb-4 pt-3 sm:px-5 sm:pb-5">
                          <p className="text-[11px] leading-7 text-slate-600 sm:text-[13px] sm:leading-8">
                            {item.answer}
                          </p>

                          <a
                            href={item.href}
                            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-black text-blue-700 hover:underline"
                          >
                            {item.linkText}
                            <ArrowLeft
                              size={13}
                              className="rotate-180"
                            />
                          </a>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPACT CTA */}

          <div className="flex flex-col gap-3 border-t border-[#dce6f4] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="min-w-0">
              <h3 className="text-[12px] font-black text-[#10233f] sm:text-[14px]">
                Looking for Technical Analysis of a Specific Market?
              </h3>

              <p className="mt-1 text-[11px] leading-6 text-slate-600 sm:text-[12px]">
                Select gold, silver or a forex currency pair
                in the market scanner, then compare technical
                trend classifications across different timeframes.
              </p>
            </div>

            <a
              href="#scanner"
              className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-blue-600 px-4 py-2 text-[11px] font-black text-white transition hover:bg-blue-700"
            >
              Browse Technical Analysis
              <ArrowLeft size={14} className="rotate-180" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
})()}

{/* ============================================================
    09 — TECHNICAL ANALYSIS METHODOLOGY & DATA TRANSPARENCY
    Broker Alarab | Dynamic Monitoring | English LTR | 1520px
    Uses existing rows and lastChecked
============================================================ */}

{(() => {
  const TOTAL_EXPECTED =
    INSTRUMENTS.length * TIMEFRAMES.length;

  const parseTimestamp = (value: unknown): number | null => {
    if (typeof value !== "string" || !value.trim()) {
      return null;
    }

    const ms = Date.parse(value);
    return Number.isFinite(ms) ? ms : null;
  };

  // Do not assume that all source rows are unique.

  const uniqueRows = new Map<string, TechnicalRow>();

  rows.forEach((row) => {
    if (!row?.symbol || !row?.timeframe) return;

    const key = `${row.symbol}:${row.timeframe}`;
    const existing = uniqueRows.get(key);

    const existingTime =
      parseTimestamp(existing?.calculated_at_utc) ?? -1;

    const currentTime =
      parseTimestamp(row.calculated_at_utc) ?? -1;

    if (!existing || currentTime > existingTime) {
      uniqueRows.set(key, row);
    }
  });

  const expectedSymbols = new Set(
    INSTRUMENTS.map((item) => item.symbol)
  );

  const expectedFrames = new Set<string>(TIMEFRAMES);

  const validRows = [...uniqueRows.values()].filter(
    (row) =>
      expectedSymbols.has(row.symbol) &&
      expectedFrames.has(row.timeframe)
  );

  const completedRows = validRows.filter(
    (row) => row.data_status === "READY"
  );

  const incompleteRows = validRows.filter(
    (row) => row.data_status !== "READY"
  );

  const missingRows = Math.max(
    0,
    TOTAL_EXPECTED - validRows.length
  );

  const freshRows = completedRows.filter(
    (row) => isAnalysisFresh(row)
  );

  const staleRows =
    completedRows.length - freshRows.length;

  const lastCalculation = validRows.reduce<number | null>(
    (latest, row) => {
      const timestamp = parseTimestamp(
        row.calculated_at_utc
      );

      if (timestamp === null) return latest;

      return latest === null
        ? timestamp
        : Math.max(latest, timestamp);
    },
    null
  );

  const formatLastCalculation = (timestamp: number | null) => {
    if (timestamp === null) return "Unavailable";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(new Date(timestamp));
  };

  const completeness =
    TOTAL_EXPECTED > 0
      ? Math.round(
          (completedRows.length / TOTAL_EXPECTED) * 100
        )
      : 0;

  const allFresh =
    completedRows.length === TOTAL_EXPECTED &&
    staleRows === 0;

  const latestDataStatus = loading
    ? "Loading Technical Data"
    : loadError
    ? "Unable to Refresh Data"
    : validRows.length === 0
    ? "Data Unavailable"
    : allFresh
    ? "All Readings Complete and Recent"
    : staleRows > 0
    ? "Some Readings Require Updates"
    : "Incomplete Market Coverage";

  return (
    <section
      id="technical-analysis-methodology"
      dir="ltr"
      aria-labelledby="technical-methodology-title"
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* UNIFIED NAVY HEADER */}

          <div
            className="px-4 py-4 text-white sm:px-7 sm:py-5"
            style={{
              background:
                "linear-gradient(110deg,#205895 0%,#143b6c 45%,#091d36 100%)",
            }}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0 max-w-[1050px]">
                <div className="mb-1.5 flex items-center gap-2 text-[10px] font-black tracking-wide text-blue-200">
                  <ShieldCheck size={15} />
                  DATA METHODOLOGY & TRANSPARENCY
                </div>

                <h2
                  id="technical-methodology-title"
                  className="text-[20px] font-black leading-[1.45] text-white sm:text-[27px]"
                >
                  Technical Analysis Methodology
                  <span className="text-[#64c7ff]">
                    {" "}& Data Transparency
                  </span>
                </h2>

                <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
                  Understand our market data sources,
                  technical indicator calculations,
                  analysis coverage, data freshness
                  and the limitations of technical readings.
                </p>
              </div>

              {/* DATA STATUS */}

              <div className="inline-flex max-w-full shrink-0 items-center gap-2 self-start rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-black text-white sm:text-[11px]">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    loadError
                      ? "bg-rose-400"
                      : allFresh
                      ? "bg-emerald-400"
                      : "bg-amber-400"
                  }`}
                />
                {latestDataStatus}
              </div>

            </div>
          </div>


          
{/* ============================================
    DATA COVERAGE — RESPONSIVE 2x2 / 4 COLUMNS
    English LTR — Existing Calculations
============================================ */}

<div className="grid grid-cols-2 gap-px bg-[#dce6f4] lg:grid-cols-4">

  {[
    {
      label: "Financial Instruments",
      value: INSTRUMENTS.length.toString(),
      note: "Gold, Silver & Forex Pairs",
      type: "count",
    },
    {
      label: "Analysis Timeframes",
      value: TIMEFRAMES.length.toString(),
      note: "M5 to W1",
      type: "count",
    },
    {
      label: "Completed Analyses",
      value: `${completedRows.length} / ${TOTAL_EXPECTED}`,
      note: "READY Status",
      type: "completed",
    },
    {
      label: "Last Recorded Calculation",
      value: formatLastCalculation(lastCalculation),
      note: "Coordinated Universal Time (UTC)",
      type: "date",
    },
  ].map((stat) => (

    <div
      key={stat.label}
      className="flex min-h-[90px] min-w-0 flex-col justify-center bg-white px-3 py-3 text-left sm:min-h-[110px] sm:px-5 sm:py-4"
    >

      <p className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
        {stat.label}
      </p>

      <p
        dir="ltr"
        className={`mt-1.5 text-left font-black text-[#10233f] ${
          stat.type === "date"
            ? "text-[11px] leading-5 sm:text-[13px] sm:leading-6"
            : stat.type === "completed"
            ? "text-[17px] sm:text-[23px]"
            : "text-[23px] sm:text-[27px]"
        }`}
      >
        {stat.value}
      </p>

      <p className="mt-1 text-[9px] leading-4 text-slate-400 sm:text-[10px]">
        {stat.note}
      </p>

    </div>

  ))}

</div>

{/* ============================================
    COMPLETENESS INDICATOR — ENGLISH
============================================ */}

<div className="border-b border-slate-200 bg-[#f8faff] px-3 py-3 sm:px-6 sm:py-4">

  <div className="mb-2 flex items-center justify-between gap-2">

    <h3 className="text-[12px] font-black text-[#10233f] sm:text-[14px]">
      Technical Analysis Coverage Completeness
    </h3>

    <span className="text-[15px] font-black tabular-nums text-blue-700 sm:text-[18px]">
      {completeness}%
    </span>

  </div>

  <div
    role="progressbar"
    aria-label="Technical analysis coverage completeness"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={completeness}
    className="h-2 overflow-hidden rounded-full bg-slate-200"
  >
    <div
      className="h-full rounded-full bg-blue-600 transition-all duration-500"
      style={{ width: `${completeness}%` }}
    />
  </div>

  <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] text-slate-600 sm:flex sm:flex-wrap sm:gap-x-6 sm:text-[11px]">

    <span>
      <strong className="text-emerald-700">
        {freshRows.length}
      </strong>{" "}
      Complete & Recent
    </span>

    <span>
      <strong className="text-amber-700">
        {staleRows}
      </strong>{" "}
      Complete but Outdated
    </span>

    <span>
      <strong className="text-slate-700">
        {incompleteRows.length}
      </strong>{" "}
      Incomplete
    </span>

    <span>
      <strong className="text-rose-700">
        {missingRows}
      </strong>{" "}
      Missing
    </span>

  </div>

</div>

{/* ============================================
    METHODOLOGY — DESKTOP CARDS
============================================ */}

<div className="hidden gap-px bg-[#dce6f4] md:grid md:grid-cols-2">

  {[
    {
      icon: <BarChart3 size={18} />,
      title: "Market Price Data Sources",
      description:
        "Historical price candles retrieved from MetaTrader 5 (MT5) are used to calculate technical indicators from completed candles across supported timeframes. Displayed prices are reference values and may differ from executable market quotes.",
    },
    {
      icon: <Activity size={18} />,
      title: "Technical Indicator Calculations",
      description:
        "The analysis engine combines moving averages, Supertrend, Ichimoku, RSI, MACD, ADX and other indicators. ATR is used to describe volatility and does not contribute an independent directional buy or sell vote.",
    },
    {
      icon: <Clock3 size={18} />,
      title: "Data Updates and Completeness",
      description:
        "Each reading includes a data status based on the availability of historical candles and recorded update times. Some timeframes may remain incomplete when insufficient historical candles are available for longer-period indicators.",
    },
    {
      icon: <ShieldCheck size={18} />,
      title: "How to Interpret Technical Signals",
      description:
        "Strong Buy, Strong Sell and Neutral are descriptive technical classifications reflecting indicator conditions at the time of calculation. They do not represent estimated success probabilities or guarantees of future market direction.",
    },
  ].map((item) => (

    <article
      key={item.title}
      className="flex min-w-0 items-start gap-3 bg-white px-5 py-5 text-left"
    >

      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
        {item.icon}
      </span>

      <div className="min-w-0">

        <h3 className="text-[14px] font-black text-[#10233f]">
          {item.title}
        </h3>

        <p className="mt-2 text-[12px] leading-7 text-slate-600">
          {item.description}
        </p>

      </div>

    </article>

  ))}

</div>

{/* ============================================
    METHODOLOGY — MOBILE ACCORDION
    Closed by Default
============================================ */}

<div className="divide-y divide-slate-200 bg-white md:hidden">

  {[
    {
      title: "Market Price Data Sources",
      text:
        "The analysis engine uses historical completed candles from MetaTrader 5 (MT5) to calculate technical indicators. Displayed prices are reference values, not necessarily real-time executable quotes.",
    },
    {
      title: "How Technical Indicators Are Calculated",
      text:
        "The engine combines RSI, MACD, ADX, moving averages, Supertrend, Ichimoku and other technical indicators. ATR measures price volatility rather than producing an independent directional vote.",
    },
    {
      title: "Data Updates and Completeness",
      text:
        "Some technical readings may be outdated or incomplete because of their calculation timestamps or insufficient historical candle data.",
    },
    {
      title: "How to Interpret Technical Signals",
      text:
        "Strong Buy and Strong Sell are descriptive classifications based on indicator agreement. They are not guaranteed market forecasts or personalized trading recommendations.",
    },
  ].map((item) => (

    <details
      key={item.title}
      className="group px-3 py-1"
    >

      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 text-left [&::-webkit-details-marker]:hidden">

        <span className="text-[12px] font-black text-[#10233f]">
          {item.title}
        </span>

        <ChevronDown
          size={16}
          className="shrink-0 text-blue-600 transition-transform group-open:rotate-180"
        />

      </summary>

      <p className="pb-3 text-[11px] leading-6 text-slate-600">
        {item.text}
      </p>

    </details>

  ))}

</div>

{/* ============================================
    FINANCIAL DISCLAIMER
    Desktop: Full Text
    Mobile: Compact & Expandable
============================================ */}

<div className="border-t border-[#dce6f4] bg-[#f8faff] px-3 py-3 sm:px-6 sm:py-5">

  {/* DESKTOP DISCLAIMER */}

  <div className="hidden items-start gap-3 md:flex">

    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
      <Info size={18} />
    </span>

    <div className="min-w-0 text-left">

      <h3 className="text-[15px] font-black text-[#10233f]">
        Risk Warning and Financial Disclaimer
      </h3>

      <p className="mt-2 text-[12px] leading-7 text-slate-600">
        All market prices, technical indicators and
        classifications displayed on Broker Alarab
        are provided for general informational and
        educational purposes only. They do not
        constitute personalized investment advice
        or a recommendation to buy or sell any
        financial instrument.

        {" "}The analysis is based on historical
        market data and automated calculations.
        Information may be delayed, become outdated
        or differ from prices available through
        brokers. Historical performance and
        agreement among technical indicators
        do not guarantee future results.

        {" "}Forex, gold and CFD trading,
        especially when leverage is used,
        involves substantial risk and may
        result in loss of capital. Users
        should evaluate their financial
        circumstances, understand the risks
        and verify relevant information before
        making trading decisions.
      </p>

    </div>

  </div>

  {/* MOBILE DISCLAIMER */}

  <details className="group md:hidden">

    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left [&::-webkit-details-marker]:hidden">

      <div className="flex min-w-0 items-center gap-2">

        <Info
          size={17}
          className="shrink-0 text-blue-700"
        />

        <span className="text-[12px] font-black text-[#10233f]">
          Risk Warning and Financial Disclaimer
        </span>

      </div>

      <ChevronDown
        size={16}
        className="shrink-0 text-blue-700 transition-transform group-open:rotate-180"
      />

    </summary>

    {/* ALWAYS VISIBLE SHORT WARNING */}

    <p className="mt-2 text-[11px] leading-6 text-slate-600">
      Technical analyses are provided for educational
      and informational purposes only and do not
      constitute trading recommendations.
      Leveraged trading involves significant risks
      and may result in loss of capital.
    </p>

    {/* EXPANDED FULL DISCLAIMER */}

    <div className="mt-3 border-t border-slate-200 pt-3">

      <p className="text-[11px] leading-6 text-slate-600">
        Technical indicators and market data rely on
        automated calculations and historical prices,
        which may be delayed, outdated or different
        from the quotes provided by brokers.

        {" "}Buy and sell classifications describe
        indicator conditions at the time of calculation
        and do not guarantee the success of any
        trade or continuation of a market trend.

        {" "}Trading forex, gold and CFDs,
        particularly with leverage, may lead
        to loss of capital. Always verify
        market information, review trading
        conditions and assess the associated
        risks before making investment decisions.
      </p>

    </div>

  </details>

</div>

{/* ============================================
    SECTION FOOTER — ENGLISH
============================================ */}

<div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-3 py-3 sm:px-6">

  <span className="text-[10px] leading-5 text-slate-500">
    Data is updated periodically and does not represent a real-time price feed.
  </span>

  <a
    href="#scanner"
    className="inline-flex items-center gap-1.5 text-[11px] font-black text-blue-700 hover:underline"
  >
    Back to Technical Scanner
    <ArrowLeft
      size={13}
      className="rotate-180"
    />
  </a>

</div>

        </div>
      </div>
    </section>
  );
})()}

    </main>
  );
}
