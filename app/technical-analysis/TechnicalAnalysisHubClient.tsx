
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
  daily: "يومي",
  weekly: "أسبوعي",
  monthly: "شهري",
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
  R3: "المقاومة الثالثة",
  R2: "المقاومة الثانية",
  R1: "المقاومة الأولى",
  P: "النقطة المحورية",
  S1: "الدعم الأول",
  S2: "الدعم الثاني",
  S3: "الدعم الثالث",
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
      return "بيانات تاريخية";

    case "live":
      return "بيانات منشورة — تحقق من وقتها";

    case "ready":
      return "بيانات جاهزة — تحقق من وقتها";

    case "stale":
      return "بيانات قديمة";

    default:
      return "حالة البيانات غير معروفة";
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
    name: "الذهب",
    type: "metals",
  },
  {
    symbol: "XAGUSDc",
    base: "XAG",
    quote: "USD",
    slug: "silver",
    name: "الفضة",
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
  AUD: "الدولار الأسترالي",
  CAD: "الدولار الكندي",
  CHF: "الفرنك السويسري",
  CZK: "الكورونا التشيكية",
  DKK: "الكرونة الدنماركية",
  EUR: "اليورو",
  GBP: "الجنيه الإسترليني",
  HKD: "دولار هونغ كونغ",
  HUF: "الفورنت المجري",
  JPY: "الين الياباني",
  MXN: "البيزو المكسيكي",
  NOK: "الكرونة النرويجية",
  NZD: "الدولار النيوزيلندي",
  SEK: "الكرونة السويدية",
  USD: "الدولار الأمريكي",
  ZAR: "الراند الجنوب أفريقي",
  XAU: "الذهب",
  XAG: "الفضة",
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
    label: "شراء قوي",
    color: "bg-emerald-100 text-emerald-800",
    bar: "bg-emerald-600",
  },
  BUY_BIAS: {
    label: "شراء",
    color: "bg-emerald-50 text-emerald-700",
    bar: "bg-emerald-400",
  },
  MIXED: {
    label: "محايد",
    color: "bg-slate-100 text-slate-600",
    bar: "bg-slate-400",
  },
  SELL_BIAS: {
    label: "بيع",
    color: "bg-rose-50 text-rose-700",
    bar: "bg-rose-400",
  },
  STRONG_SELL: {
    label: "بيع قوي",
    color: "bg-rose-100 text-rose-800",
    bar: "bg-rose-600",
  },
  DATA_INCOMPLETE: {
    label: "غير مكتمل",
    color: "bg-amber-50 text-amber-700",
    bar: "bg-amber-400",
  },
};

const INDICATORS = [
  { name: "المتوسطات المتحركة", short: "EMA 50 / EMA 200", key: "ema" },
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
    a: "تعتمد مناطق الدعم والمقاومة على المناطق المحورية والتفاعلات السعرية التاريخية عبر الأطر الزمنية، مع تكييف الحسابات حسب تذبذب الأداة. الدرجات وصفية وليست نسب نجاح.",
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
    return "غير متاح";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "غير متاح";
  }

  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
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


function getAdxStrength(value: number | null): {
  label: string;
  style: string;
} {
  if (value === null || !Number.isFinite(value)) {
    return {
      label: "غير متاح",
      style: "bg-slate-100 text-slate-500",
    };
  }

  if (value < 20) {
    return {
      label: "ضعيف",
      style: "bg-slate-100 text-slate-600",
    };
  }

  if (value < 25) {
    return {
      label: "محدود",
      style: "bg-amber-50 text-amber-700",
    };
  }

  if (value < 40) {
    return {
      label: "واضح",
      style: "bg-blue-50 text-blue-700",
    };
  }

  if (value < 50) {
    return {
      label: "قوي",
      style: "bg-indigo-50 text-indigo-700",
    };
  }

  return {
    label: "قوي جداً",
    style: "bg-purple-50 text-purple-700",
  };
}


function getDirection(row?: TechnicalRow): string {
  if (!row || row.data_status !== "READY") {
    return "DATA_INCOMPLETE";
  }
  return row.classification || "DATA_INCOMPLETE";
}

function DirectionBadge({ value }: { value: string }) {
  const info = DIRECTION[value] || DIRECTION.DATA_INCOMPLETE;

  return (
    <span className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-extrabold ${info.color}`}>
      {info.label}
    </span>
  );
}

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
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
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

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm leading-7 text-slate-500">
      <Info className="mx-auto mb-3" size={23} />
      {message}
    </div>
  );
}

const VOTE_LABELS: Record<string, string> = {
  "1": "شراء",
  "-1": "بيع",
  "0": "محايد",
  BUY: "شراء",
  SELL: "بيع",
  NEUTRAL: "محايد",
};

function voteText(value: unknown) {
  if (value === null || value === undefined) return "غير متاح";
  return VOTE_LABELS[String(value)] || String(value);
}

function extractVote(votes: Record<string, unknown>, key: string) {
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
    if (votes[alias] !== undefined) return votes[alias];
  }
  return undefined;
}


/* ====================================================
   FEATURED BROKERS — CONTROL BY DATABASE ID
   غيّر الأرقام فقط لتغيير الوسطاء
==================================================== */

const FEATURED_BROKER_IDS = [2, 25, 18, 1, 6];

const FEATURED_BROKER_LINKS: Record<number, string> = {
  2: "/brokers/xs",
  25: "/brokers/capital-com",
  18: "/brokers/oneroyal",
  1: "/brokers/exness",
  6: "/brokers/equiti",
};

type FeaturedBroker = {
  id: number;
  name: string;
  rating: number | null;
  logo: string | null;
  best_for: string | null;
};


/* ============================================================
   07 — CENTRAL BANK RATES SNAPSHOT
   Reads public.interest_rates — READ ONLY
   Broker Alarab | Arabic | 1520px
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
  "fed", "ecb", "boe", "boj",
  "boc", "rba", "snb", "rbnz",
] as const;

const TECHNICAL_HUB_BANK_FALLBACKS: Record<
  string,
  { name: string; currency: string; flag: string }
> = {
  fed: { name: "الاحتياطي الفيدرالي", currency: "USD", flag: "🇺🇸" },
  ecb: { name: "المركزي الأوروبي", currency: "EUR", flag: "🇪🇺" },
  boe: { name: "بنك إنجلترا", currency: "GBP", flag: "🇬🇧" },
  boj: { name: "بنك اليابان", currency: "JPY", flag: "🇯🇵" },
  boc: { name: "بنك كندا", currency: "CAD", flag: "🇨🇦" },
  rba: { name: "الاحتياطي الأسترالي", currency: "AUD", flag: "🇦🇺" },
  snb: { name: "البنك الوطني السويسري", currency: "CHF", flag: "🇨🇭" },
  rbnz: { name: "الاحتياطي النيوزيلندي", currency: "NZD", flag: "🇳🇿" },
};

function TechnicalHubRateValue(
  bank: TechnicalHubBankRate
): string {
  const format = (value: number | null) =>
    typeof value === "number" && Number.isFinite(value)
      ? `${value.toFixed(2)}%`
      : "—";

  // The Fed uses a target range, not a single comparable rate.
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

    return format(bank.current_rate_upper ?? bank.current_rate);
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

function TechnicalHubDecision(
  change: number | null
): { label: string; style: string; symbol: string } {
  if (change === null || !Number.isFinite(change)) {
    return {
      label: "غير متاح",
      style: "bg-slate-100 text-slate-600",
      symbol: "—",
    };
  }

  if (change > 0) {
    return {
      label: `رفع ${change} نقطة أساس`,
      style: "bg-rose-50 text-rose-700",
      symbol: "↑",
    };
  }

  if (change < 0) {
    return {
      label: `خفض ${Math.abs(change)} نقطة أساس`,
      style: "bg-emerald-50 text-emerald-700",
      symbol: "↓",
    };
  }

  return {
    label: "تثبيت الفائدة",
    style: "bg-blue-50 text-blue-700",
    symbol: "—",
  };
}

function TechnicalHubDecisionDate(value: string | null): string {
  if (!value || !/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return "تاريخ غير متاح";
  }

  const date = new Date(`${value.slice(0, 10)}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return "تاريخ غير متاح";
  }

  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function InterestRateSnapshotSection() {
  const [banks, setBanks] = useState<TechnicalHubBankRate[]>([]);
  const [loadingRates, setLoadingRates] = useState(true);
  const [ratesError, setRatesError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!url || !key) {
          throw new Error("Supabase configuration unavailable");
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

        endpoint.searchParams.set("is_published", "eq.true");
        endpoint.searchParams.set("order", "display_order.asc");

        const response = await fetch(endpoint.toString(), {
          method: "GET",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Interest rates HTTP ${response.status}`);
        }

        const result: unknown = await response.json();

        if (!Array.isArray(result)) {
          throw new Error("Invalid interest rates response");
        }

        if (!cancelled) {
          const ordered = (result as TechnicalHubBankRate[])
            .filter((bank) =>
              TECHNICAL_HUB_BANKS.includes(
                bank.slug as (typeof TECHNICAL_HUB_BANKS)[number]
              )
            )
            .sort(
              (a, b) =>
                TECHNICAL_HUB_BANKS.indexOf(
                  a.slug as (typeof TECHNICAL_HUB_BANKS)[number]
                ) -
                TECHNICAL_HUB_BANKS.indexOf(
                  b.slug as (typeof TECHNICAL_HUB_BANKS)[number]
                )
            );

          setBanks(ordered);
          setRatesError(false);
        }
      } catch (error) {
        console.error("Interest rates snapshot:", error);

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
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* ============================================
            MAIN CARD — UNIFIED WITH TECHNICAL HUB
        ============================================ */}

        <div className="w-full overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* ============================================
              NAVY HEADER
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
  أسعار الفائدة وقرارات البنوك المركزية

  <span className="block text-[#64c7ff] sm:inline">
    {" "}وتأثيرها على الفوركس والذهب
  </span>
</h2>

                <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
                  تابع أسعار الفائدة المسجلة لدى ثمانية بنوك
                  مركزية، وآخر قرارات الرفع والخفض والتثبيت،
                  لفهم تأثير السياسة النقدية على العملات والذهب.
                </p>

              </div>

              <Link
                href="/interest-rates"
                className="hidden min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-black text-white transition hover:bg-white/20 lg:inline-flex"
              >
                مركز أسعار الفائدة
                <ArrowLeft size={14} />
              </Link>

            </div>
          </div>

          {/* ============================================
              DATA PANEL HEADING
          ============================================ */}

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dce6f4] bg-[#f8faff] px-3 py-3 sm:px-6 sm:py-4">

            <div className="min-w-0">
              <h3 className="text-[13px] font-black text-[#10233f] sm:text-[16px]">
                مقارنة السياسة النقدية للبنوك المركزية
              </h3>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-[11px]">
                سعر الفائدة وآخر قرار وتاريخ تسجيله
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700 sm:px-3">
              8 بنوك مركزية
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
                تعذر تحميل بيانات أسعار الفائدة حالياً.
              </p>

              <Link
                href="/interest-rates"
                className="mt-3 inline-flex text-xs font-black text-blue-700 hover:underline"
              >
                الانتقال إلى مركز أسعار الفائدة
              </Link>
            </div>

          ) : banks.length === 0 ? (

            <div className="p-6 text-center text-sm text-slate-500">
              لا توجد بيانات منشورة حالياً.
            </div>

          ) : (
  <div className="grid gap-px bg-[#dce6f4] sm:grid-cols-2 lg:grid-cols-4">

  {banks.map((bank) => {

    const fallback =
      TECHNICAL_HUB_BANK_FALLBACKS[bank.slug];

    const name =
      bank.bank_short_name_ar ||
      bank.bank_name_ar ||
      fallback?.name ||
      bank.slug.toUpperCase();

    const currency =
      bank.currency_code ||
      fallback?.currency ||
      "—";

    const decision = TechnicalHubDecision(
      bank.last_change_bps
    );

    // Explicit country flags.
    // Using images avoids Windows rendering US / EU / GB letters.

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
        href={`/interest-rates/${bank.slug}`}
        aria-label={`عرض تفاصيل ${name} وأسعار الفائدة`}
        className="group block min-w-0 bg-white px-3 py-3 transition-colors hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 sm:px-4 sm:py-4"
      >

        {/* BANK NAME + FLAG */}

        <div className="flex items-center gap-2.5">

          <div className="flex h-9 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-50 sm:h-10 sm:w-12">

            {flagUrl ? (
              <img
                src={flagUrl}
                alt={`علم ${name}`}
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
              className="text-right text-[10px] font-semibold text-slate-400"
            >
              {currency}
            </p>

          </div>

        </div>

        {/* RATE + DECISION — COMPACT */}

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:mt-3">

          <div className="min-w-0">

            <p className="text-[9px] text-slate-500 sm:text-[10px]">
              سعر الفائدة المسجل
            </p>

            <p
              dir="ltr"
              className="mt-0.5 text-right text-[19px] font-black tabular-nums leading-7 text-[#1558be] sm:text-[21px]"
            >
              {TechnicalHubRateValue(bank)}
            </p>

          </div>

          <span
            className={`inline-flex max-w-full items-center gap-1 rounded-md px-2 py-1 text-[9px] font-black sm:text-[10px] ${decision.style}`}
          >
            <span aria-hidden="true">
              {decision.symbol}
            </span>

            {decision.label}
          </span>

        </div>

        {/* DATE + DETAILS */}

        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 sm:mt-3 sm:pt-2.5">

          <span className="text-[9px] text-slate-500 sm:text-[10px]">
            {TechnicalHubDecisionDate(
              bank.last_decision_date
            )}
          </span>

          <span className="inline-flex items-center gap-1 text-[10px] font-black text-blue-700 group-hover:underline sm:text-[11px]">
            عرض التفاصيل
            <ArrowLeft size={12} />
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
                تختلف أسعار الفائدة المرجعية بين البنوك؛
                يعرض الفيدرالي الأمريكي نطاقاً مستهدفاً،
                بينما تعتمد بنوك أخرى أسعاراً مرجعية مختلفة.
                القيم هي آخر بيانات مسجلة لدى بروكر العرب،
                وليست بثاً فورياً للقرارات.
              </p>

            </div>

          </div>

          {/* ============================================
              EDUCATIONAL CONTENT — COMPACT
          ============================================ */}

          <div className="flex flex-col gap-2 border-t border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6 sm:py-4">

            <p className="min-w-0 text-[11px] leading-6 text-slate-600 sm:text-[12px]">

              <strong className="text-[#10233f]">
                كيف تؤثر الفائدة على العملات والذهب؟
              </strong>{" "}

              تؤثر قرارات البنوك المركزية وتوقعات الفائدة
              على العملات وعوائد الأصول. كما يتأثر الذهب
              بالعوائد الحقيقية والدولار والتضخم،
              لكن استجابة الأسواق تختلف بحسب توقعاتها السابقة.

            </p>

            <Link
              href="/interest-rates"
              className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline"
            >
              الأسعار والقرارات التاريخية
              <ArrowLeft size={13} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );

}


/* ============================================================
   BROKER ALARAB — PIVOT V6 INDEPENDENT SECTION
   Independent Symbol + Timeframe Controls
   Five Pivot Methods | Supabase Read Only
   Arabic RTL | Resistance Right | Support Left
============================================================ */

type PivotV6Method =
  | "classic"
  | "fibonacci"
  | "camarilla"
  | "woodie"
  | "demark";

type PivotV6Row = {
  symbol: string;
  timeframe: Timeframe;
  method: PivotV6Method;
  reference_candle_time_utc: string;
  levels: Record<string, unknown>;
  calculated_at: string;
};

type PivotV6EngineStatus = {
  engine_id: string;
  status: string;
  last_success_at: string | null;
  last_checked_at: string | null;
  last_published_at: string | null;
  last_published_rows: number;
  symbols_count: number;
  rows_validated: number;
};


const PIVOT_V6_METHODS: {
  key: PivotV6Method;
  name: string;
  description: string;
}[] = [
  {
    key: "classic",
    name: "النقاط المحورية التقليدية",
    description:
      "الطريقة الكلاسيكية لحساب مستويات الدعم والمقاومة باستخدام أعلى وأدنى سعر والإغلاق للفترة المرجعية.",
  },
  {
    key: "fibonacci",
    name: "مستويات فيبوناتشي",
    description:
      "مستويات سعرية تعتمد على نسب فيبوناتشي ومدى حركة السعر خلال الفترة المرجعية.",
  },
  {
    key: "camarilla",
    name: "مستويات كاماريلا",
    description:
      "مستويات حسابية حول سعر الإغلاق المرجعي لتحديد مناطق سعرية محتملة.",
  },
  {
    key: "woodie",
    name: "النقاط المحورية بطريقة وودي",
    description:
      "طريقة حسابية تعطي وزناً مختلفاً للأسعار المرجعية مقارنة بالطريقة التقليدية.",
  },
  {
    key: "demark",
    name: "مستويات ديمارك",
    description:
      "طريقة تعتمد على العلاقة بين أسعار الافتتاح والإغلاق والحدين الأعلى والأدنى.",
  },
];


const PIVOT_V6_FRAMES: Timeframe[] = [
  "M5", "M15", "M30", "H1", "H4", "D1", "W1",
];

const PIVOT_V6_LEVEL_NAMES: Record<string, string> = {
  P: "النقطة المحورية",
  R1: "المقاومة الأولى",
  R2: "المقاومة الثانية",
  R3: "المقاومة الثالثة",
  R4: "المقاومة الرابعة",
  S1: "الدعم الأول",
  S2: "الدعم الثاني",
  S3: "الدعم الثالث",
  S4: "الدعم الرابع",
  reference_close: "الإغلاق المرجعي",
};

function PivotV6Panel() {
  // This section is independent of the main technical overview.

  const [pivotSymbol, setPivotSymbol] =
    useState<string>("XAUUSDc");

  const [pivotTimeframe, setPivotTimeframe] =
    useState<Timeframe>("H1");
// MOBILE ONLY — طريقة الحساب المختارة
const [activePivotMethod, setActivePivotMethod] =
  useState<PivotV6Method>("classic");
  
  const [symbolMenuOpen, setSymbolMenuOpen] =
    useState(false);

  const [symbolSearch, setSymbolSearch] =
    useState("");

  const [records, setRecords] =
    useState<PivotV6Row[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkedAt, setCheckedAt] =
    useState<string | null>(null);

    // ============================================================
// PIVOT V6 — ENGINE HEALTH MONITORING
// Reads broker_pivot_engine_status independently.
// ============================================================

const [pivotEngineStatus, setPivotEngineStatus] =
  useState<PivotV6EngineStatus | null>(null);

const [pivotStatusError, setPivotStatusError] =
  useState(false);

const [pivotClock, setPivotClock] =
  useState<number | null>(null);

useEffect(() => {
  let cancelled = false;
  let controller: AbortController | null = null;

  async function loadPivotEngineStatus() {
    controller?.abort();

    const currentController = new AbortController();
    controller = currentController;

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (!url || !key) {
        throw new Error("Supabase configuration unavailable");
      }

      const endpoint = new URL(
        `${url.replace(/\/$/, "")}/rest/v1/broker_pivot_engine_status`
      );

      endpoint.searchParams.set(
        "select",
        "engine_id,status,last_success_at,last_checked_at,last_published_at,last_published_rows,symbols_count,rows_validated"
      );

      endpoint.searchParams.set("engine_id", "eq.pivot-v6");
      endpoint.searchParams.set("limit", "1");

      const response = await fetch(endpoint.toString(), {
        method: "GET",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Accept: "application/json",
        },
        cache: "no-store",
        signal: currentController.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Pivot engine status HTTP ${response.status}`
        );
      }

      const result: unknown = await response.json();

      if (!Array.isArray(result)) {
        throw new Error("Invalid Pivot engine status response");
      }

      const record = result[0] as
        | PivotV6EngineStatus
        | undefined;

      if (!cancelled && !currentController.signal.aborted) {
        setPivotEngineStatus(
          record?.engine_id === "pivot-v6"
            ? record
            : null
        );

        setPivotStatusError(!record || record.engine_id !== "pivot-v6");
        setPivotClock(Date.now());
      }
    } catch (error) {
      if (!cancelled && !currentController.signal.aborted) {
        console.error("Pivot V6 engine status:", error);
        setPivotStatusError(true);
        setPivotEngineStatus(null);
      }
    }
  }

  void loadPivotEngineStatus();

  const interval = window.setInterval(() => {
    if (document.visibilityState === "visible") {
      void loadPivotEngineStatus();
    }
  }, 60_000);

  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      void loadPivotEngineStatus();
    }
  };

  document.addEventListener(
    "visibilitychange",
    onVisibilityChange
  );

  const clockInterval = window.setInterval(() => {
    setPivotClock(Date.now());
  }, 60_000);

  setPivotClock(Date.now());

  return () => {
    cancelled = true;
    controller?.abort();

    window.clearInterval(interval);
    window.clearInterval(clockInterval);

    document.removeEventListener(
      "visibilitychange",
      onVisibilityChange
    );
  };
}, []);

const pivotLastSuccess =
  pivotEngineStatus?.last_success_at ?? null;

const pivotSuccessTimestamp = pivotLastSuccess
  ? Date.parse(pivotLastSuccess)
  : NaN;

const pivotAge =
  pivotClock !== null && Number.isFinite(pivotSuccessTimestamp)
    ? pivotClock - pivotSuccessTimestamp
    : NaN;

const pivotEngineFresh =
  pivotEngineStatus?.status === "success" &&
  !pivotStatusError &&
  Number.isFinite(pivotAge) &&
  pivotAge >= -120_000 &&
  pivotAge <= 15 * 60_000;

  const selectedPivotInstrument =
    INSTRUMENTS.find(
      (item) => item.symbol === pivotSymbol
    ) || INSTRUMENTS[0];

  const displaySymbol = (value: string) =>
    value.replace(/c$/, "");

  const filteredInstruments = useMemo(() => {
    const search = symbolSearch.trim().toLowerCase();

    if (!search) return INSTRUMENTS;

    return INSTRUMENTS.filter((instrument) => {
      const display = displaySymbol(instrument.symbol);
      const arabic = getInstrumentArabicName(instrument);

      return [
        instrument.symbol,
        display,
        instrument.name,
        arabic,
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

  const formatPivotPrice = (value: unknown): string => {
    const num = numberValue(value);

    if (num === null || !Number.isFinite(num)) {
      return "—";
    }

    return num.toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: Math.max(digits, 5),
    });
  };

  // ============================================================
  // SUPABASE — FIVE METHODS FOR SELECTED SYMBOL + TIMEFRAME
  // ============================================================

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

        const result: unknown = await response.json();

        if (!Array.isArray(result)) {
          throw new Error(
            "Invalid Pivot V6 response"
          );
        }

        const parsed = result.filter(
          (item): item is PivotV6Row => {
            if (!item || typeof item !== "object") {
              return false;
            }

            const row = item as Partial<PivotV6Row>;

            return (
              row.symbol === pivotSymbol &&
              row.timeframe === pivotTimeframe &&
              PIVOT_V6_METHODS.some(
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
      } catch (e) {
        console.error("Pivot V6:", e);

        if (!cancelled) {
          setError(
            "تعذر تحديث مستويات الدعم والمقاومة حالياً."
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

  // ============================================================
  // LEVEL CARD
  // Resistance = Green / Support = Red
  // Requested Broker Alarab display convention
  // ============================================================

  
/* ====================================================
   COMPACT LEVEL CARDS — MOBILE OPTIMIZED
   RESISTANCE RIGHT / SUPPORT LEFT
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
          dir="ltr"
          className={`flex h-7 min-w-[25px] shrink-0 items-center justify-center rounded-md px-1 text-[9px] font-black sm:h-8 sm:min-w-9 sm:text-[11px] ${
            resistance
              ? "bg-emerald-100 text-emerald-800"
              : "bg-rose-100 text-rose-800"
          }`}
        >
          {level}
        </span>

        <span className="hidden text-[10px] font-semibold text-slate-500 lg:inline">
          {PIVOT_V6_LEVEL_NAMES[level] || level}
        </span>
      </div>

      <span
        dir="ltr"
        className={`min-w-0 text-left text-[10px] font-black tabular-nums tracking-tight sm:text-[14px] lg:text-[17px] ${
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


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section
      id="gold-support-resistance"
      aria-labelledby="pivot-v6-heading"
      className="scroll-mt-20 border-y border-[#d4e1f1]
        bg-[#f3f6fb] py-5 sm:py-8"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* ============================================
              INDEPENDENT NAVY HEADER
          ============================================ */}

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
                  id="pivot-v6-heading"
                  className="text-[20px] font-black leading-8 sm:text-[26px]"
                >
                  النقاط المحورية والدعم والمقاومة
                </h2>

                <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px]">
                  خمسة أنظمة حسابية للمستويات السعرية، مع إمكانية
                  اختيار الأداة المالية والإطار الزمني بشكل مستقل.
                </p>
              </div>

              <span className="self-start rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-black text-blue-100">
                5 طرق حسابية · 7 فريمات · 44 أداة
              </span>

            </div>
          </div>

          {/* ============================================
              INDEPENDENT SYMBOL + TIMEFRAME CONTROLS
          ============================================ */}

          <div className="border-b border-[#d5e3f4] bg-[#edf4ff] px-3 py-4 sm:px-6">

            <div className="grid gap-4 lg:grid-cols-2">

              {/* CURRENCY SEARCH */}

              <div className="relative min-w-0">

                <p className="mb-2 text-[12px] font-black text-[#102b50]">
                  اختر الأداة المالية
                </p>

                <button
                  type="button"
                  aria-expanded={symbolMenuOpen}
                  onClick={() => {
                    setSymbolMenuOpen(!symbolMenuOpen);
                    setSymbolSearch("");
                  }}
                  className="flex min-h-[47px] w-full items-center justify-between gap-3 rounded-xl border border-[#b9d1f5] bg-white px-4 py-3 text-right shadow-sm transition hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Search size={16} className="shrink-0 text-blue-600" />

                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-black text-[#102b50]">
                        {getInstrumentArabicName(selectedPivotInstrument)}
                      </p>

                      <p
                        dir="ltr"
                        className="text-right text-[10px] font-bold text-slate-500"
                      >
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
                        <Search size={15} className="shrink-0 text-blue-600" />

                        <input
                          type="search"
                          autoFocus
                          value={symbolSearch}
                          onChange={(event) =>
                            setSymbolSearch(event.target.value)
                          }
                          placeholder="ابحث: الذهب، EURUSD، الفضة..."
                          className="h-11 w-full bg-transparent text-[12px] text-slate-900 outline-none placeholder:text-slate-400"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setSymbolMenuOpen(false);
                            setSymbolSearch("");
                          }}
                          aria-label="إغلاق قائمة الأدوات"
                          className="rounded p-1 text-slate-500 hover:bg-slate-200"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="max-h-[320px] overflow-y-auto p-2">

                      {filteredInstruments.length === 0 ? (
                        <p className="p-5 text-center text-xs text-slate-500">
                          لا توجد أداة مطابقة للبحث.
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
                            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-right transition hover:bg-blue-50 ${
                              pivotSymbol === instrument.symbol
                                ? "bg-blue-50"
                                : ""
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="truncate text-[12px] font-black text-[#102b50]">
                                {getInstrumentArabicName(instrument)}
                              </p>

                              <p
                                dir="ltr"
                                className="mt-1 text-right text-[10px] font-semibold text-slate-500"
                              >
                                {displaySymbol(instrument.symbol)}
                              </p>
                            </div>

                            {pivotSymbol === instrument.symbol && (
                              <CheckCircle2
                                size={17}
                                className="shrink-0 text-blue-600"
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
                  الإطار الزمني للحساب
                </p>

                <div
                  role="group"
                  aria-label="فريم النقاط المحورية"
                  className="flex min-h-[47px] max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-[#b9d1f5] bg-white p-1 shadow-sm"
                >
                  {PIVOT_V6_FRAMES.map((frame) => (
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
                  هذه الفريمات خاصة بالقسم الحالي ولا تغيّر فريم التحليل الفني بالأعلى.
                </p>
              </div>

            </div>
          </div>

          {/* ============================================
              SELECTED CONTEXT
          ============================================ */}

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-md bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700">
                {displaySymbol(pivotSymbol)}
              </span>

              <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[10px] font-black text-slate-700">
                {pivotTimeframe}
              </span>

              <span className="text-[10px] text-slate-500">
                مستويات محسوبة من شموع مكتملة
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[10px]">

  <span
    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-black ${
      pivotEngineFresh
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-amber-200 bg-amber-50 text-amber-700"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        pivotEngineFresh
          ? "bg-emerald-500"
          : "bg-amber-500"
      }`}
    />

    {pivotEngineFresh
      ? "النظام يعمل"
      : "التحديث غير مؤكد"}
  </span>

  <span className="inline-flex items-center gap-1.5 text-slate-600">
    <Clock3 size={13} />

    <span className="font-bold">
      آخر حساب ناجح:
    </span>

    <span className="font-black text-[#153b69]">
      {pivotClock === null
        ? "—"
        : dateText(pivotLastSuccess)}
    </span>
  </span>

  <span className="text-slate-400">
    {checkedAt
      ? `آخر فحص للصفحة: ${dateText(checkedAt)}`
      : "جارِ فحص البيانات"}
  </span>

</div>
          </div>

          
{/* ====================================================
    FIVE PIVOT METHODS
    MOBILE: SELECT ONE METHOD
    DESKTOP: SHOW ALL METHODS
==================================================== */}

<div className="space-y-4 bg-[#f4f7fc] px-3 py-4 sm:px-6 sm:py-6">

  {/* MOBILE METHOD SELECTOR */}
  <div className="rounded-xl border border-[#cbd9ed] bg-white p-3 shadow-sm md:hidden">

    <div className="mb-3 flex items-center justify-between gap-2">
      <div>
        <p className="text-[12px] font-black text-[#102b50]">
          اختر طريقة حساب النقاط المحورية
        </p>
        <p className="mt-1 text-[10px] text-slate-500">
          اعرض نتائج طريقة واحدة في كل مرة
        </p>
      </div>

      <span
        dir="ltr"
        className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700"
      >
        {PIVOT_V6_METHODS.findIndex(
          (method) => method.key === activePivotMethod
        ) + 1} / 5
      </span>
    </div>

    <div
      role="group"
      aria-label="اختر طريقة حساب النقاط المحورية"
      className="grid grid-cols-3 gap-1.5"
    >
      {PIVOT_V6_METHODS.map((method) => {
        const selected = activePivotMethod === method.key;

        const shortNames: Record<PivotV6Method, string> = {
          classic: "التقليدية",
          fibonacci: "فيبوناتشي",
          camarilla: "كاماريلا",
          woodie: "وودي",
          demark: "ديمارك",
        };

        return (
          <button
            key={method.key}
            type="button"
            aria-pressed={selected}
            onClick={() => setActivePivotMethod(method.key)}
            className={`min-h-[38px] rounded-lg border px-1.5 py-2 text-[10px] font-extrabold transition ${
              selected
                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                : "border-slate-200 bg-[#f6f8fc] text-slate-700 hover:bg-blue-50"
            }`}
          >
            {shortNames[method.key]}
          </button>
        );
      })}
    </div>

    <div className="mt-3 rounded-lg bg-[#eef5ff] px-3 py-2 text-center">
      <p className="text-[11px] font-black text-[#154a87]">
        {
          PIVOT_V6_METHODS.find(
            (method) => method.key === activePivotMethod
          )?.name
        }
      </p>

      <p dir="ltr" className="mt-1 text-[10px] text-slate-500">
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
                  جارِ تحميل مستويات الدعم والمقاومة...
                </p>
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <Info size={23} className="mx-auto mb-3 text-amber-500" />

                <p className="font-bold text-slate-700">
                  لا توجد بيانات منشورة لهذه الأداة والفريم حالياً.
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
                    تعذر تحديث البيانات. المعروض هو آخر نتائج تم تحميلها.
                  </div>
                )}

                {PIVOT_V6_METHODS.map((methodInfo) => {
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
                          بيانات هذه الطريقة غير متاحة.
                        </p>
                      </div>
                    );
                  }

                  const levels = row.levels;
                  const isCamarilla =
                    methodInfo.key === "camarilla";

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
                    isCamarilla && levels.reference_close !== undefined
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
    METHOD HEADER — ARABIC MOBILE OPTIMIZED
==================================================== */}

<div className="border-b border-slate-100 bg-white px-3 py-3 sm:px-6 sm:py-3.5">

  <div className="flex items-start justify-between gap-3">

    <div className="min-w-0 flex-1">

      {/* METHOD NUMBER + SYMBOL */}
      <div className="mb-1.5 flex flex-wrap items-center gap-2">

        <span className="rounded-md bg-[#eaf2ff] px-2 py-1 text-[9px] font-black text-[#1558be]">
          الطريقة {
            PIVOT_V6_METHODS.findIndex(
              (method) => method.key === methodInfo.key
            ) + 1
          } من 5
        </span>

        <span
          dir="ltr"
          className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-black text-slate-700"
        >
          {displaySymbol(pivotSymbol)}
        </span>

      </div>

      {/* METHOD NAME */}
      <h3 className="text-[15px] font-black leading-6 text-[#102b50] sm:text-[19px]">
        {methodInfo.name}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-1 text-[10px] leading-5 text-slate-500 sm:text-[11px]">
        {methodInfo.description}
      </p>

    </div>

    {/* TIMEFRAME */}
    <span
      dir="ltr"
      className="shrink-0 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700"
    >
      {pivotTimeframe}
    </span>

  </div>

</div>

{/* ====================================================
    CENTRAL PIVOT — METHOD CLEARLY IDENTIFIED
==================================================== */}

<div className="border-b border-blue-100 bg-[#edf5ff] px-3 py-3 text-center sm:px-4">

  <p className="text-[11px] font-black text-[#154a87]">
    {methodInfo.name}
  </p>

  <p className="mt-1 text-[10px] font-semibold text-blue-700">
    {centerKey === "reference_close"
      ? "سعر الإغلاق المرجعي"
      : "النقطة المحورية الرئيسية (P)"}
  </p>

  <p
    dir="ltr"
    className="mt-1 text-[25px] font-black tabular-nums leading-tight text-[#154a87] sm:text-[29px]"
  >
    {formatPivotPrice(levels[centerKey])}
  </p>

  <p
    dir="ltr"
    className="mt-1 text-[9px] font-semibold text-blue-600 md:hidden"
  >
    {displaySymbol(pivotSymbol)} · {pivotTimeframe}
  </p>

</div>


                      {/* RESISTANCE RIGHT / SUPPORT LEFT */}

                      <div className="grid grid-cols-2 gap-2 p-2.5 sm:gap-4 sm:p-5">

                        {/* RIGHT — RESISTANCE GREEN */}

                        <div className="min-w-0">

                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="flex items-center gap-2 text-[13px] font-black text-emerald-700">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              مستويات المقاومة
                            </h4>

                            <span className="text-[10px] text-slate-400">
                              Resistance
                            </span>
                          </div>

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
                                لا توجد مستويات مقاومة منشورة.
                              </p>
                            )}
                          </div>

                        </div>

                        {/* LEFT — SUPPORT RED */}

                        <div className="min-w-0">

                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="flex items-center gap-2 text-[13px] font-black text-rose-700">
                              <span className="h-2 w-2 rounded-full bg-rose-500" />
                              مستويات الدعم
                            </h4>

                            <span className="text-[10px] text-slate-400">
                              Support
                            </span>
                          </div>

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
                                لا توجد مستويات دعم منشورة.
                              </p>
                            )}
                          </div>

                        </div>

                      </div>

                      {/* METHOD TIMESTAMPS */}

<div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-slate-100 bg-[#fafcff] px-4 py-3 sm:px-5">

  <p className="text-[10px] text-slate-500">
    الشمعة المرجعية:{" "}
    <span className="font-bold text-[#102b50]">
      {dateText(row.reference_candle_time_utc)}
    </span>
  </p>

  <div className="flex flex-wrap items-center gap-2">

    <p className="text-[10px] text-slate-500">
      آخر حساب ناجح للنظام:{" "}

      <span
        className={`font-black ${
          pivotEngineFresh
            ? "text-emerald-700"
            : "text-amber-700"
        }`}
      >
        {pivotClock === null
          ? "—"
          : dateText(pivotLastSuccess)}
      </span>
    </p>

    <span
      className={`rounded-md px-1.5 py-0.5 text-[9px] font-black ${
        pivotEngineFresh
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {pivotEngineFresh
        ? "النظام يعمل"
        : "التحديث غير مؤكد"}
    </span>

  </div>

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
        كيف تُحسب مستويات الدعم والمقاومة؟
      </p>

      <p className="text-[10px] leading-6 text-slate-600 sm:text-[11px] sm:leading-7">
        تعتمد مستويات النقاط المحورية على بيانات شموع MT5 المكتملة،
        باستخدام فترة مرجعية تلقائية بحسب الإطار الزمني المختار.
        تُستخدم الفترة اليومية لفريمي M5 وM15، والأسبوعية
        لفريمات M30 وH1 وH4، والشهرية لفريمي D1 وW1.
        لذلك من الطبيعي أن تتطابق مستويات الدعم والمقاومة
        بين عدة فريمات تشترك في الفترة المرجعية نفسها.
      </p>

      <p className="text-[10px] leading-6 text-slate-500 sm:text-[11px] sm:leading-7">
        تختلف النتائج أيضاً بحسب الأداة المالية وطريقة الحساب
        (التقليدية، فيبوناتشي، كاماريلا، وودي أو ديمارك).
        هذه المستويات حسابية وليست توصيات تداول،
        ولا تضمن ارتداد السعر أو استمراره.
        الألوان المستخدمة لتسهيل قراءة المستويات فقط.
      </p>

    </div>

  </div>

</div>
      </div>
      </div>
    </section>
  );
}

/* ================= END INDEPENDENT PIVOT V6 ================= */


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
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  
const [selectedGoldZone, setSelectedGoldZone] =
  useState<string | null>(null);

// Selected instrument in support/resistance section
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

  // Mobile only — compact technical levels
const [mobileZonesOpen, setMobileZonesOpen] = useState(false);
const [mobilePivotOpen, setMobilePivotOpen] = useState(false);
const [symbol, setSymbol] = useState("XAUUSDc");

useEffect(() => {
  let cancelled = false;
  let running = false;

  setLevelsByFrame({});
  setLevelsLoading(true);
  setLevelsError(false);
  setSelectedGoldZone(null);

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
      endpoint.searchParams.set("symbol", `eq.${symbol}`);
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
          row.symbol !== symbol ||
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
        setLevelsByFrame({});
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
}, [symbol]);




  const [compareFirst, setCompareFirst] = useState("XAUUSDc");
const [compareSecond, setCompareSecond] = useState("EURUSDc");


  
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
        // Keep the last successfully received quote if polling fails.
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

  
/* ============================================================
   SCANNER MARKET QUOTES
   Uses the same Supabase source as the overview.
   Falls back to M5 close when no fresh quote exists.
============================================================ */

const [scannerQuotes, setScannerQuotes] = useState<
  Record<
    string,
    {
      bid: number;
      ask: number;
      updated_at: string;
    }
  >
>({});

useEffect(() => {
  let cancelled = false;
  let running = false;

  async function loadScannerQuotes() {
    if (running) return;
    running = true;

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (!url || !key) return;

      const endpoint = new URL(
        `${url.replace(/\/$/, "")}/rest/v1/broker_live_quotes`
      );

      endpoint.searchParams.set(
        "select",
        "symbol,bid,ask,updated_at"
      );

      endpoint.searchParams.set("limit", "100");

      const response = await fetch(endpoint.toString(), {
        headers: {
          apikey: key,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) return;

      const data: unknown = await response.json();
      if (!Array.isArray(data)) return;

      const next: Record<
        string,
        { bid: number; ask: number; updated_at: string }
      > = {};

      for (const item of data) {
        if (!item || typeof item !== "object") continue;

        const row = item as Record<string, unknown>;
        const bid = numberValue(row.bid);
        const ask = numberValue(row.ask);
        const symbol = String(row.symbol || "");
        const updated = String(row.updated_at || "");

        if (
          bid !== null &&
          ask !== null &&
          bid > 0 &&
          ask >= bid &&
          INSTRUMENTS.some((x) => x.symbol === symbol)
        ) {
          next[symbol] = {
            bid,
            ask,
            updated_at: updated,
          };
        }
      }

      if (!cancelled) setScannerQuotes(next);
    } catch (error) {
      console.error("Scanner quote refresh:", error);
    } finally {
      running = false;
    }
  }

  void loadScannerQuotes();

  const timer = window.setInterval(() => {
    if (document.visibilityState === "visible") {
      void loadScannerQuotes();
    }
  }, 5000);

  return () => {
    cancelled = true;
    window.clearInterval(timer);
  };
}, []);


  const [mobileMarketOpen, setMobileMarketOpen] = useState(false);
const [mobileMarketSearch, setMobileMarketSearch] = useState("");
  const [timeframe, setTimeframe] = useState<Timeframe>("H1");
  // ====================================================
// SYNC OVERVIEW INSTRUMENT WITH SUPPORT / PIVOT DATA
// ====================================================

useEffect(() => {
  setSupportSymbol(symbol);
  setSelectedGoldZone(null);
}, [symbol]);
  // V3.1 — CURRENT TIMEFRAME LEVELS
const selectedLevels =
  levelsByFrame[timeframe]?.symbol === symbol
    ? levelsByFrame[timeframe]!
    : null;

const selectedLevelSupport = selectedLevels?.support ?? [];

const selectedLevelResistance = selectedLevels?.resistance ?? [];

const selectedLevelsHistorical =
  selectedLevels?.data_status === "historical" ||
  (selectedLevels !== null &&
    !isFresh(selectedLevels.reference_time_utc, 15));
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllPairs, setShowAllPairs] = useState(false);
  const [heatmapCategory, setHeatmapCategory] = useState<
  "all" | "metals" | "forex"
>("all");

const [heatmapExpanded, setHeatmapExpanded] = useState(false);
  const [marketSegment, setMarketSegment] = useState<
  "all" | "metals" | "major" | "cross" | "emerging"
>("all");

  // ====================================================
  // FEATURED BROKERS STATE
  // ====================================================
  const [featuredBrokers, setFeaturedBrokers] = useState<
    FeaturedBroker[]
  >([]);

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
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setLoadError("إعدادات قراءة Supabase غير متاحة.");
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

      const [technicalResponse, goldResponse] = await Promise.all([
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
  console.error("Technical analysis refresh failed:", error);

  setLoadError(
    error instanceof Error
      ? `تعذر تحديث التحليلات: ${error.message}`
      : "تعذر تحديث التحليلات."
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
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

        const response = await fetch(endpoint.toString(), {
          method: "GET",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Featured brokers HTTP ${response.status}`
          );
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid brokers response");
        }

        if (cancelled) return;

        const brokers = data as FeaturedBroker[];

        // Preserve the order chosen in FEATURED_BROKER_IDS.
        const ordered = FEATURED_BROKER_IDS
          .map((id) =>
            brokers.find((broker) => Number(broker.id) === id)
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
    INSTRUMENTS.find((item) => item.symbol === symbol) ||
    INSTRUMENTS[0];

  const selectedRows = rows.filter(
    (row) => row.symbol === symbol
  );

  const selectedRow = selectedRows.find(
    (row) => row.timeframe === timeframe
  );

  const selectedDirection = getDirection(selectedRow);

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
  // PAGE JSX
  // ====================================================
  return (
    <main
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-[#f5f7fb] text-slate-900"
    >

      


{/* ====================================================
    01 — TECHNICAL ANALYSIS HERO
    Broker Alarab | Navy | Compact | 1520px
==================================================== */}

<section className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31]">

  {/* Navy background */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
  >
    <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

    <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/15 blur-[120px]" />

    <div className="absolute -bottom-64 left-[12%] h-[380px] w-[380px] rounded-full bg-cyan-400/10 blur-[110px]" />

    <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
  </div>

  <div className="relative mx-auto max-w-[1520px] px-4 pb-4 pt-3 sm:px-6 lg:px-8 xl:px-10">

    <nav
  aria-label="مسار التنقل"
  className="mb-3 flex items-center gap-2 text-xs font-semibold text-blue-200/70"
>
      <Link href="/" className="transition hover:text-white">
        الرئيسية
      </Link>

      <span className="text-blue-300/40">/</span>

      <span className="text-white">
        مركز التحليل الفني
      </span>
    </nav>

    

{/* ====================================================
    MAIN HERO CONTENT
==================================================== */}
<div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-7 xl:gap-9">

  {/* RIGHT SIDE: SEO CONTENT */}
  <div className="max-w-[850px]">

    <h1 className="max-w-[900px] text-[27px] font-black leading-[1.35] tracking-tight text-white sm:text-[40px] sm:leading-[1.25] lg:text-[45px] xl:text-[50px]">
      التحليل الفني للعملات الأجنبية

      <span className="mt-1.5 block text-[#59c0ff] sm:mt-2">
        والذهب والفضة
      </span>
    </h1>

    {/* MAIN DESCRIPTION */}
    <p className="mt-4 max-w-[800px] text-[13px] font-medium leading-[1.9] text-slate-100 sm:mt-5 sm:text-[16px] sm:leading-8 sm:text-slate-200">

      <span className="sm:hidden">
        اكتشف التحليل الفني للذهب والفضة و42 زوج عملات
        عبر 7 أطر زمنية، وتابع اتجاهات السوق وإشارات
        الشراء والبيع.
      </span>

      <span className="hidden sm:inline">
        اكتشف التحليل الفني للفوركس والذهب والفضة
        عبر 44 أداة مالية و7 أطر زمنية. تابع إشارات
        الشراء والبيع، وقوة الاتجاه ومؤشرات RSI وADX
        والمتوسطات المتحركة، وقارن الاتجاهات الفنية
        واستكشف مناطق الدعم والمقاومة للذهب.
      </span>

    </p>

    {/* DATA DISCLAIMER */}
    <p className="mt-3 max-w-[800px] text-[11px] leading-[1.8] text-blue-200/80 sm:text-[12px] sm:leading-6">
      التحليلات مستمدة من شموع سعرية مكتملة
      وتُحدّث دورياً عند توفر بيانات جديدة.
      النتائج وصفية وليست أسعاراً لحظية أو توصيات تداول.
    </p>

    {/* CTA BUTTONS */}
    <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-2.5 sm:mt-4 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">

      <a
        href="#scanner"
        className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-[#2471df] px-3 py-3 text-[12px] font-black text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)] transition hover:bg-[#3184f3] sm:min-h-[45px] sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
      >
        <Search size={17} className="shrink-0" />

        <span>استكشف الماسح الفني</span>

        <ArrowLeft size={17} className="hidden sm:block" />
      </a>

      <a
        href="#market-comparison"
        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.08] px-3 py-3 text-[12px] font-black text-white transition hover:bg-white/[0.15] sm:min-h-[45px] sm:gap-3 sm:px-6 sm:py-3 sm:text-sm"
      >
        <SlidersHorizontal
          size={17}
          className="shrink-0 text-cyan-300"
        />

        <span className="sm:hidden">
          قارن
        </span>

        <span className="hidden sm:inline">
          قارن الأدوات المالية
        </span>

        <ArrowLeft size={16} className="hidden sm:block" />
      </a>

    </div>

  </div>



  {/* ====================================================
      LEFT SIDE: MARKET DISCOVERY
  ==================================================== */}
  <div className="relative hidden self-center overflow-hidden rounded-[20px] border border-white/15 bg-white/[0.07] p-4 shadow-[0_20px_55px_-30px_rgba(0,0,0,0.4)] backdrop-blur-md sm:block">

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-transparent via-cyan-300/70 to-transparent"
    />

    {/* HEADER */}
    <div className="flex items-start justify-between gap-4">

      <div>
        <p className="hidden text-[11px] font-extrabold tracking-wide text-[#66c8ff] sm:block">
          EXPLORE FINANCIAL MARKETS
        </p>

        <h2 className="text-[17px] font-black text-white sm:mt-2 sm:text-2xl">
          ابدأ بتحليل السوق
        </h2>

        <p className="mt-1 text-[11px] leading-5 text-slate-300 sm:mt-2 sm:text-xs sm:leading-6">
          اختر السوق وانتقل إلى التحليل التفصيلي
        </p>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-cyan-300 sm:h-11 sm:w-11">
        <BarChart3 size={23} />
      </div>

    </div>

    {/* FEATURED MARKETS */}
    <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">

      {[
        {
          label: "الذهب",
          symbol: "XAU/USD",
          href: "/technical-analysis/gold",
          type: "gold",
        },
        {
          label: "الفضة",
          symbol: "XAG/USD",
          href: "/technical-analysis/silver",
          type: "silver",
        },
        {
          label: "اليورو / دولار",
          symbol: "EUR/USD",
          href: "/technical-analysis/eur-usd",
          type: "euro",
        },
        {
          label: "الجنيه / دولار",
          symbol: "GBP/USD",
          href: "/technical-analysis/gbp-usd",
          type: "pound",
        },
      ].map((market) => (

        <Link
          key={market.symbol}
          href={market.href}
          className="group flex min-w-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.08] p-1.5 transition hover:border-cyan-300/40 hover:bg-white/[0.15] sm:gap-2.5 sm:p-2.5"
        >

          {/* CUSTOM MARKET ICON */}
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border shadow-inner sm:h-11 sm:w-11 sm:rounded-xl ${
              market.type === "gold"
                ? "border-amber-200 bg-gradient-to-br from-[#fff5ce] to-[#f5c755]"
                : market.type === "silver"
                ? "border-slate-200 bg-gradient-to-br from-white to-[#c5d1e0]"
                : market.type === "euro"
                ? "border-blue-200 bg-gradient-to-br from-[#eff6ff] to-[#bad8ff]"
                : "border-indigo-200 bg-gradient-to-br from-[#f1f2ff] to-[#c7ceff]"
            }`}
          >

            {market.type === "gold" || market.type === "silver" ? (

              <svg
                viewBox="0 0 48 48"
                width="35"
                height="35"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id={market.type === "gold" ? "goldBarHero" : "silverBarHero"}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    {market.type === "gold" ? (
                      <>
                        <stop offset="0%" stopColor="#fff1a1" />
                        <stop offset="45%" stopColor="#f6c643" />
                        <stop offset="100%" stopColor="#b77808" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="45%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#7d90aa" />
                      </>
                    )}
                  </linearGradient>
                </defs>

                <path
                  d="M7 19 L14 10 H34 L41 19 L37 31 H11 Z"
                  fill={`url(#${market.type === "gold" ? "goldBarHero" : "silverBarHero"})`}
                  stroke={market.type === "gold" ? "#b98016" : "#8293aa"}
                  strokeWidth="1"
                />

                <path
                  d="M7 19 H41 L37 31 H11 Z"
                  fill={market.type === "gold" ? "#d9a128" : "#a8b7c9"}
                  opacity="0.42"
                />

                <path
                  d="M14 10 L7 19 H41 L34 10 Z"
                  fill="#ffffff"
                  opacity="0.28"
                />

                <text
                  x="24"
                  y="22"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="800"
                  fill={market.type === "gold" ? "#754b06" : "#475569"}
                >
                  {market.type === "gold" ? "Au" : "Ag"}
                </text>
              </svg>

            ) : (

              <span
                className={`text-[25px] font-black leading-none sm:text-[29px] ${
                  market.type === "euro"
                    ? "text-[#175cbd]"
                    : "text-[#423c9c]"
                }`}
              >
                {market.type === "euro" ? "€" : "£"}
              </span>

            )}

          </div>

          {/* MARKET INFORMATION */}
          <div className="min-w-0 flex-1">

            <p className="truncate text-[11px] font-black text-white sm:text-sm">
              {market.label}
            </p>

            <p
              dir="ltr"
              className="mt-0.5 text-right text-[10px] font-bold text-blue-200/75 sm:mt-1 sm:text-xs"
            >
              {market.symbol}
            </p>

          </div>

          <ArrowUpLeft
            size={16}
            className="hidden shrink-0 text-blue-200/60 transition group-hover:text-cyan-300 sm:block"
          />

        </Link>

      ))}

    </div>

    {/* FOOTER */}
    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2 sm:mt-3 sm:gap-3 sm:pt-3">

      <span className="hidden text-xs text-slate-300 sm:inline">
        الذهب · الفضة · 42 زوج عملات
      </span>

      <a
        href="#scanner"
        className="inline-flex items-center gap-2 text-xs font-black text-[#66c8ff] hover:text-white"
      >
        عرض جميع الأسواق
        <ArrowLeft size={15} />
      </a>

    </div>

  </div>

</div>


{/* ====================================================
    FEATURED BROKERS
    No ratings / No stars
==================================================== */}
<div className="mt-5 border-t border-white/15 pt-4 sm:mt-3 sm:pt-3">

  {/* SECTION HEADING */}
  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-2">

    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-cyan-300">
        <ShieldCheck size={19} />
      </div>

      <div>
        <h2 className="text-[15px] font-black text-white sm:mt-0.5 sm:text-base">
          وسطاء تداول مميزون
        </h2>

        <p className="mt-1 text-[11px] text-slate-300 sm:mt-0.5">
          شركات مختارة من تقييمات بروكر العرب
        </p>
      </div>

    </div>

    <Link
      href="/best-brokers"
      className="hidden items-center gap-2 rounded-lg border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-extrabold text-white transition hover:bg-white/[0.13] sm:inline-flex"
    >
      تصفح جميع الوسطاء
      <ArrowLeft size={15} />
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

    <div className="rounded-xl border border-amber-300/20 bg-amber-100 p-4 text-sm text-amber-900">
      تعذر تحميل بيانات الوسطاء المميزين.
    </div>

  ) : featuredBrokers.length === 0 ? (

    <div className="rounded-xl border border-white/15 bg-white/10 p-4 text-sm text-white">
      لا توجد بيانات متاحة للوسطاء المختارين.
    </div>

    ) : (
    <>

      {/* ====================================================
          BROKER LOGO STRIP — MOBILE + DESKTOP
      ==================================================== */}


{/* ====================================================
    MOBILE VERSION — THREE FEATURED BROKERS ONLY
==================================================== */}
<div className="sm:hidden">
  <div className="grid grid-cols-3 gap-2.5">
    {featuredBrokers
      .filter((broker) =>
        [2, 25, 18].includes(Number(broker.id))
      )
      .map((broker) => {
        const reviewUrl =
          FEATURED_BROKER_LINKS[broker.id] || "/best-brokers";

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
            title={`عرض تقييم ${broker.name}`}
            aria-label={`عرض تقييم ${broker.name}`}
            className="flex h-[64px] min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2.5 transition active:scale-[0.98]"
          >
            {logoPath ? (
              <img
                src={logoPath}
                alt={`شعار ${broker.name}`}
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

{/* DESKTOP VERSION — ORIGINAL DESIGN */}
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

      const reviewUrl = FEATURED_BROKER_LINKS[broker.id];

      return (
        <div
          key={broker.id}
          className={`group relative flex min-w-0 flex-col items-center justify-center px-4 py-2 text-center transition-colors hover:bg-[#f4f8ff] ${
            index > 0
              ? "md:border-r md:border-slate-100"
              : ""
          }`}
        >

          {/* HOVER ACCENT */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-transparent transition-colors group-hover:bg-[#2471df]" />

          {/* BROKER LOGO */}
          <div className="flex h-[48px] w-full items-center justify-center overflow-hidden sm:h-[54px]">

            {logoPath ? (
              <img
                src={logoPath}
                alt={`شعار ${broker.name}`}
                loading="lazy"
                className={`block h-auto w-auto object-contain ${
                  broker.id === 25
  ? "!w-[185px] !h-[45px] !max-w-[185px] !max-h-[45px] !scale-100 object-contain"
                    : broker.id === 18
                    ? "max-h-[70px] max-w-[300px] scale-[1.18]"
                    : "max-h-[70px] max-w-[300px] scale-[1.18]"
                }`}
              />
            ) : (
              <span className="text-xl font-black text-slate-800">
                {broker.name}
              </span>
            )}

          </div>

          {/* REVIEW BUTTON */}
          {reviewUrl ? (
            <Link
              href={reviewUrl}
              className="mt-0.5 inline-flex min-h-[26px] items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              عرض تقييم {broker.name}
              <ArrowLeft size={13} />
            </Link>
          ) : (
            <span className="mt-1 text-xs text-slate-400">
              المراجعة غير متاحة
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
<p className="mt-3 text-[10px] leading-[1.8] text-blue-100/75 sm:mt-1.5 sm:leading-4 sm:text-blue-100/65">
  عرض ترويجي لوسطاء مختارين، منفصل عن نتائج التحليل الفني.
  إدراج الشركة لا يعني وجود اتفاق رعاية مدفوع.
</p>


</div>

</div>
</section>

{/* ====================================================
    BROKER ALARAB — SINGLE TECHNICAL DASHBOARD
    One Card:
    1. Technical Overview
    2. Support & Resistance
    3. Pivot Points
==================================================== */}

<div
  id="unified-technical-analysis"
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
    Broker Alarab | Arabic | 1520px | Real engine data
    Uses existing: rows, gold, symbol, timeframe,
    setSymbol, setTimeframe, INSTRUMENTS, TIMEFRAMES
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

  const overviewDirection =
    overviewReady
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


  // ------------------------------------------------------------
  // Actual votes from the existing analysis engine
  // ------------------------------------------------------------
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

  // Display position based on net indicator votes.
  // This is NOT a price forecast or win probability.
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
    STRONG_BUY: "شراء قوي",
    BUY_BIAS: "ميل للشراء",
    MIXED: "محايد",
    SELL_BIAS: "ميل للبيع",
    STRONG_SELL: "بيع قوي",
    DATA_INCOMPLETE: "بيانات غير متاحة",
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

  // ------------------------------------------------------------
  // Convert supported raw vote formats into three categories
  // ------------------------------------------------------------
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
    selectedLevels !== null;

  const goldSupport =
    goldReportAvailable
      ? selectedLevelSupport
      : [];

  const goldResistance =
    goldReportAvailable
      ? selectedLevelResistance
      : [];

  const goldReferenceFresh =
    goldReportAvailable &&
    selectedLevels?.data_status === "live" &&
    isFresh(selectedLevels.reference_time_utc);

  return (
    
    
<section
  id="technical-overview"
  className="relative scroll-mt-20 bg-white"
  aria-labelledby="technical-overview-heading"
>
  <div className="w-full">

        
{/* ====================================================
    SECTION HEADING — PREMIUM NAVY DESIGN
==================================================== */}
<div
  className="overflow-hidden border-b border-[#244c7c] text-white"
  style={{
    background:
      "linear-gradient(110deg, #205895 0%, #143b6c 45%, #091d36 100%)",
  }}
>
  <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 sm:py-5">

    {/* TITLE */}
    <div className="min-w-0">

      <h2
        id="technical-overview-heading"
        className="text-[21px] font-black leading-[1.5] text-white sm:text-[27px]"
      >
        التحليل الفني للأسواق المالية
      </h2>

      <p className="mt-2 max-w-[900px] text-[12px] leading-6 text-blue-100 sm:text-[13px]">
        اختر الأداة المالية والإطار الزمني لمتابعة
        تقييمات الشراء والبيع والمؤشرات الفنية
        والمتوسطات المتحركة ومستويات الدعم والمقاومة المتاحة.
      </p>

    </div>

    {/* DATA NOTE */}
    <div className="flex shrink-0 items-center gap-2 self-start rounded-lg border border-white/20 bg-white/10 px-3 py-2 sm:self-center">

      <Clock3
        size={17}
        className="shrink-0 text-[#7dd3fc]"
      />

      <span className="text-[11px] font-bold text-white">
        تحليلات دورية وليست أسعاراً لحظية
      </span>

    </div>

  </div>
</div>



{/* ====================================================
    MOBILE ONLY — COMPACT TECHNICAL DASHBOARD
    SEARCHABLE MARKET SELECTOR + TIMEFRAMES
==================================================== */}
<div className="space-y-3 sm:hidden">

  {/* MARKET + TIMEFRAME */}
  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">

    {/* MARKET LABEL */}
    <div className="mb-2 flex items-center justify-between">
      <span className="text-[12px] font-black text-slate-700">
        اختر الأداة المالية
      </span>

      <span className="text-[10px] font-bold text-slate-400">
        {INSTRUMENTS.length} أداة
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
        className={`flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border bg-[#f7faff] px-3 py-2 text-right text-[12px] font-black text-slate-900 transition ${
          mobileMarketOpen
            ? "border-blue-500 ring-2 ring-blue-500/10"
            : "border-slate-200"
        }`}
      >
        <span className="min-w-0 truncate">
          {getInstrumentArabicName(selectedInstrument)}
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

      {/* DROPDOWN */}
      {mobileMarketOpen && (
        <div
          id="mobile-market-options"
          className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.18)]"
        >

          {/* SEARCH INPUT */}
          <div className="border-b border-slate-100 p-2.5">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute right-3 top-3 text-slate-400"
              />

              <input
                type="search"
                autoFocus
                value={mobileMarketSearch}
                onChange={(event) =>
                  setMobileMarketSearch(event.target.value)
                }
                placeholder="ابحث عن الذهب أو EUR/USD..."
                aria-label="البحث عن أداة مالية"
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-9 pl-3 text-[12px] font-medium text-slate-900 outline-none focus:border-blue-500"
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
                getInstrumentArabicName(item),
                item.base,
                item.quote,
                `${item.base}/${item.quote}`,
                item.symbol,
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
                  className={`flex min-h-11 w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-right transition ${
                    selected
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="min-w-0 truncate text-[12px] font-bold">
                    {getInstrumentArabicName(item)}
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

              const searchableText = [
                item.name,
                getInstrumentArabicName(item),
                item.base,
                item.quote,
                `${item.base}/${item.quote}`,
                item.symbol,
              ]
                .join(" ")
                .toLowerCase();

              return searchableText.includes(search);
            }).length === 0 && (
              <div className="px-3 py-6 text-center">
                <Search
                  size={20}
                  className="mx-auto mb-2 text-slate-300"
                />

                <p className="text-[12px] font-medium text-slate-500">
                  لا توجد أداة مطابقة للبحث
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
        الإطار الزمني
      </span>

      <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700">
        {timeframe}
      </span>
    </div>

    {/* TIMEFRAME BUTTONS */}
    <div
      role="group"
      aria-label="اختيار الإطار الزمني"
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

  {/* PRICE + STATUS */}
  <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-3.5 py-3">

    <div className="min-w-0">
      <p className="text-[10px] font-bold text-slate-500">
        سعر إغلاق آخر شمعة مكتملة
      </p>

      <p
        dir="ltr"
        className="mt-1 text-right text-[23px] font-black tabular-nums text-[#10233f]"
      >
        {formatPrice(overviewPrice, overviewDigits)}
      </p>

      <p className="mt-1 text-[10px] text-slate-500">
        {overviewInstrument.base}/{overviewInstrument.quote}
        {" · "}
        {timeframe}
      </p>
    </div>

    <div className="shrink-0 text-left">
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
        {biasLabel[overviewDirection] || "غير متاح"}
      </span>
    </div>

  </div>

  {/* GAUGE */}
  <div className="bg-gradient-to-b from-[#f0f6ff] to-white px-3.5 pb-3 pt-3">

    <div className="mb-1 flex items-center justify-between">
      <h3 className="text-[13px] font-black text-[#10233f]">
        ملخص التقييم الفني
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
            ? `التقييم الفني ${biasLabel[overviewDirection] || "غير متاح"}`
            : "لا تتوفر بيانات لرسم التقييم الفني"
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
          التقييم الفني
        </text>

        <text
          x="150"
          y="126"
          textAnchor="middle"
          fontSize="20"
          fontWeight="900"
          fill={currentBiasColor}
        >
          {biasLabel[overviewDirection] || "غير متاح"}
        </text>
      </svg>

    </div>

    {/* COMPACT VOTE CARDS */}
    <div className="mt-2 grid grid-cols-3 gap-2">

      <div className="rounded-xl bg-emerald-50 px-2 py-2 text-center">
        <p className="text-[10px] font-bold text-emerald-700">
          شراء
        </p>
        <p className="text-lg font-black text-emerald-700">
          {hasVotes ? buyCount : "—"}
        </p>
      </div>

      <div className="rounded-xl bg-slate-100 px-2 py-2 text-center">
        <p className="text-[10px] font-bold text-slate-600">
          محايد
        </p>
        <p className="text-lg font-black text-slate-700">
          {hasVotes ? neutralCount : "—"}
        </p>
      </div>

      <div className="rounded-xl bg-rose-50 px-2 py-2 text-center">
        <p className="text-[10px] font-bold text-rose-700">
          بيع
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
            style={{ width: `${(sellCount / voteTotal) * 100}%` }}
          />
          <div
            className="bg-slate-300"
            style={{ width: `${(neutralCount / voteTotal) * 100}%` }}
          />
          <div
            className="bg-emerald-500"
            style={{ width: `${(buyCount / voteTotal) * 100}%` }}
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
        ? "البيانات غير متاحة"
        : overviewFresh
        ? "لقطة حديثة"
        : "بيانات تاريخية أو غير حديثة"}
    </span>

    <span className="text-[10px] text-slate-500">
      {dateText(overviewRow?.calculated_at_utc)}
    </span>

  </div>

</div>


  
{/* ============================================================
    MOBILE — INDICATOR EXPLANATIONS + TECHNICAL DETAILS
    Tap-to-explain, no hover, no extra React state.
    Replaces legacy hidden support/resistance accordion.
    The actual V3.1 support/resistance remains below.
============================================================ */}

<div className="overflow-hidden rounded-2xl border border-[#cbd9ed] bg-white shadow-sm">

  {/* HEADER */}

  <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-3.5 py-3">
    <div>
      <h3 className="text-[13px] font-black text-[#10233f]">
        تفاصيل المؤشرات الفنية
      </h3>

      <p className="mt-1 text-[10px] text-slate-500">
        اضغط على أي مؤشر لمعرفة معناه
      </p>
    </div>

    <Info size={17} className="text-blue-600" />
  </div>

  
{/* MOBILE INDICATORS — TAP TO OPEN EXPLANATION */}

<div className="grid grid-cols-3 gap-2 p-3">
  {[
    { key: "ADX", label: "قوة الاتجاه", value: adxValue },
    { key: "RSI", label: "القوة النسبية", value: rsiValue },
    { key: "ATR", label: "معدل التذبذب", value: atrValue },
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
        اضغط للشرح
      </span>
    </button>
  ))}
</div>

{/* MOBILE BOTTOM SHEET — SCREEN-ANCHORED */}

{activeMobileIndicator && (
  <div
    className="fixed inset-0 z-[1000] flex items-end justify-center bg-slate-950/45 sm:hidden"
    onClick={() => setActiveMobileIndicator(null)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`شرح مؤشر ${activeMobileIndicator}`}
      className="max-h-[85dvh] w-full max-w-[520px] overflow-y-auto rounded-t-[22px] bg-white px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-300" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black text-blue-700">
            شرح المؤشر الفني
          </p>

          <h3 className="mt-1 text-lg font-black text-[#10233f]">
            {activeMobileIndicator === "ADX"
              ? "ADX — قوة الاتجاه"
              : activeMobileIndicator === "RSI"
              ? "RSI — القوة النسبية"
              : "ATR — معدل التذبذب"}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setActiveMobileIndicator(null)}
          aria-label="إغلاق النافذة"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-[10px] font-bold text-slate-500">
          القراءة الحالية
        </p>

        <p
          dir="ltr"
          className="mt-1 text-right text-2xl font-black tabular-nums text-blue-700"
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
          ? "يقيس ADX قوة الاتجاه دون تحديد إن كان صاعداً أو هابطاً. القيم الأقل من 20 تشير غالباً إلى اتجاه ضعيف، وفوق 25 قد تشير إلى اتجاه واضح. لا يُستخدم وحده كإشارة شراء أو بيع."
          : activeMobileIndicator === "RSI"
          ? "يقيس RSI زخم حركة السعر من 0 إلى 100. القيم فوق 70 قد تشير إلى تشبع شرائي، وتحت 30 قد تشير إلى تشبع بيعي، لكن ذلك لا يضمن انعكاس السعر."
          : "يقيس ATR متوسط نطاق حركة السعر. ارتفاع القيمة يدل على زيادة التذبذب، وليس على اتجاه صعود أو هبوط."}
      </p>

      <button
        type="button"
        onClick={() => setActiveMobileIndicator(null)}
        className="mt-5 w-full rounded-xl bg-[#123761] px-4 py-3 text-sm font-black text-white"
      >
        إغلاق الشرح
      </button>
    </div>
  </div>
)}


  {/* ADVANCED INDICATOR DETAILS — COLLAPSIBLE */}

  <details className="group border-t border-slate-100">

    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 [&::-webkit-details-marker]:hidden">

      <div>
        <h4 className="text-[12px] font-black text-[#10233f]">
          تفاصيل تصويت المؤشرات والمتوسطات
        </h4>

        <p className="mt-1 text-[10px] text-slate-500">
          عرض توزيع إشارات الشراء والبيع والمحايد
        </p>
      </div>

      <ChevronDown
        size={18}
        className="shrink-0 text-blue-600 transition-transform group-open:rotate-180"
      />

    </summary>

    <div className="space-y-4 border-t border-slate-100 bg-[#f8fbff] p-3">

      {/* TECHNICAL INDICATOR VOTES */}

      <div className="rounded-xl border border-slate-200 bg-white p-3">

        <div className="mb-2 flex items-center justify-between gap-2">
          <h5 className="text-[12px] font-black text-[#10233f]">
            المؤشرات الفنية
          </h5>

          <span className="text-[10px] text-slate-400">
            {technicalKnown} مجموعات معروفة
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">

          {[
            {
              label: "شراء",
              value: technicalBuy,
              color: "text-emerald-700",
              bg: "bg-emerald-50",
            },
            {
              label: "محايد",
              value: technicalNeutral,
              color: "text-slate-700",
              bg: "bg-slate-100",
            },
            {
              label: "بيع",
              value: technicalSell,
              color: "text-rose-700",
              bg: "bg-rose-50",
            },
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

      {/* MOVING AVERAGES */}

      <div className="rounded-xl border border-slate-200 bg-white p-3">

        <h5 className="mb-2 text-[12px] font-black text-[#10233f]">
          المتوسطات المتحركة — EMA 50 / EMA 200
        </h5>

        <div className="grid grid-cols-3 gap-2">

          {[
            {
              label: "شراء",
              value: movingAverageBuy,
              color: "text-emerald-700",
              bg: "bg-emerald-50",
            },
            {
              label: "محايد",
              value: movingAverageNeutral,
              color: "text-slate-700",
              bg: "bg-slate-100",
            },
            {
              label: "بيع",
              value: movingAverageSell,
              color: "text-rose-700",
              bg: "bg-rose-50",
            },
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
        EMA 50 وEMA 200 مجموعة تصويت واحدة.
        ATR يقيس التذبذب ولا يُحتسب ضمن أصوات الاتجاه.
        جميع النتائج وصفية وليست توصيات تداول.
      </p>

    </div>

  </details>

</div>


  {/* DETAILED ANALYSIS LINK */}
  <Link
    href={`/technical-analysis/${overviewInstrument.slug}`}
    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#102b50] px-4 py-3 text-[12px] font-black text-white"
  >
    عرض التحليل الفني التفصيلي
    <ArrowLeft size={16} />
  </Link>

  <p className="px-1 text-center text-[10px] leading-5 text-slate-500">
    التحليلات لقطات دورية وليست أسعاراً لحظية أو توصيات تداول.
  </p>

</div>


        
{/* ====================================================
    MAIN ANALYSIS PANEL — PREMIUM
==================================================== */}
<div className="hidden overflow-hidden bg-white sm:block">

  {/* ====================================================
      MARKET SELECTOR + TIMEFRAMES
  ==================================================== */}
  <div className="border-b border-[#cbd9ed] bg-[#eaf2ff] px-5 py-4 sm:px-7">

    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

      {/* MARKET SELECTOR */}
      <div className="w-full max-w-[540px]">

        <label
          htmlFor="overview-market-selector"
          className="mb-2 block text-[12px] font-black text-[#153963]"
        >
          اختر الأداة المالية
        </label>

        <div className="relative">

          <Search
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-700"
          />

          <select
            id="overview-market-selector"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            className="h-[46px] w-full appearance-none rounded-xl border-2 border-[#a9c8f5] bg-white py-2.5 pr-12 pl-10 text-[13px] font-extrabold text-[#102d53] shadow-sm outline-none transition hover:border-blue-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10"
          >
            <optgroup label="المعادن الثمينة">
              {INSTRUMENTS.filter(
                (item) => item.type === "metals"
              ).map((item) => (
                <option key={item.symbol} value={item.symbol}>
                  {getInstrumentArabicName(item)} — {item.base}/{item.quote}
                </option>
              ))}
            </optgroup>

            <optgroup label="أزواج العملات الأجنبية">
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
          />

        </div>
      </div>

      {/* TIMEFRAME SELECTOR */}
      <div className="min-w-0">

        <p className="mb-2 text-[12px] font-black text-[#153963]">
          الإطار الزمني للتحليل
        </p>

        <div
          role="group"
          aria-label="اختيار الإطار الزمني"
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
      ? (Date.now() - tickTimestamp) / 1000
      : Infinity;

  const quoteIsFresh =
    quoteValid &&
    quoteAgeSeconds >= -5 &&
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

        {/* RIGHT: INSTRUMENT AND LIVE PRICE */}
        
<div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3 lg:w-[500px] lg:max-w-full lg:justify-between">


          {/* Instrument */}
          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f1ff] text-blue-700">
              <LineChart size={21} />
            </div>

            <div className="min-w-0">
              <p
                dir="ltr"
                className="text-right text-[16px] font-black text-[#102d53]"
              >
                {overviewInstrument.base}/{overviewInstrument.quote}
              </p>

              <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                {getInstrumentArabicName(overviewInstrument)}
              </p>
            </div>

          </div>

          {/* Separator */}
          <div className="hidden h-11 w-px bg-[#dce6f3] sm:block" />

          {/* Price */}
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
                  ? "جاري تحميل السعر"
                  : quoteIsFresh
                  ? "سعر متجدد"
                  : quoteValid
                  ? "آخر سعر مسجل"
                  : "إغلاق M5"}
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

        {/* LEFT: MINIMAL STATUS */}
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 lg:border-t-0 lg:pt-0">

          {/* ANALYSIS STATUS */}
          <span
            title={`آخر حساب للتحليل: ${dateText(
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
              ? "التحليل غير متاح"
              : overviewFresh
              ? "تحليل حديث"
              : "تحليل محفوظ"}
          </span>

          {/* TIMEFRAME */}
          <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[10px] font-black text-blue-700">
            {timeframe}
          </span>

          
{/* LAST PRICE TIME — HOVER TOOLTIP */}
<div className="group relative inline-flex items-center">

  <button
    type="button"
    aria-label="معلومات تحديث السعر والتحليل"
    className="flex h-7 w-7 cursor-help items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700 transition hover:border-blue-400 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    <Info size={15} />
  </button>

  <div
    role="tooltip"
    className="pointer-events-none invisible absolute left-0 top-full z-50 mt-3 w-[270px] max-w-[85vw] rounded-xl border border-[#c8d9ef] bg-white p-3 text-right opacity-0 shadow-[0_12px_35px_rgba(15,42,84,0.22)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
  >
    <p className="mb-2 text-[12px] font-black text-[#102d53]">
      معلومات السعر والتحليل
    </p>

    <div className="space-y-2 text-[11px] leading-5 text-slate-600">

      <p>
        <span className="font-bold text-slate-800">مصدر السعر:</span>{" "}
        {quoteValid
          ? "MetaTrader 5"
          : "آخر شمعة M5 محفوظة"}
      </p>

      <p>
        <span className="font-bold text-slate-800">آخر سعر:</span>{" "}
        {quoteValid
          ? dateText(liveQuote?.quote_time_utc)
          : dateText(overviewPriceRow?.candle_close_utc)}
      </p>

      <p>
        <span className="font-bold text-slate-800">آخر تحليل:</span>{" "}
        {dateText(overviewRow?.calculated_at_utc)}
      </p>

      <p className="border-t border-slate-100 pt-2 text-[10px] text-slate-500">
        السعر يُحدَّث من MT5 عند توفر بيانات جديدة،
        بينما التقييم الفني يعتمد على الشموع المكتملة.
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
              MAIN DASHBOARD GRID
          ==================================================== */}

          <div className="grid gap-0 xl:grid-cols-[1fr_1.12fr]">

            {/* --------------------------------------------------
                OVERALL TECHNICAL GAUGE
            -------------------------------------------------- */}

            <div className="border-b border-[#dce7f5] bg-gradient-to-b from-[#f0f6ff] to-white p-5 sm:p-7 xl:border-b-0 xl:border-l xl:border-[#dce7f5]">

              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-[#10233f]">
                    ملخص التقييم الفني
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    نتيجة المؤشرات عبر الفريم {timeframe}
                  </p>
                </div>

                <Gauge size={22} className="text-blue-600" />
              </div>

              
{/* Semicircular gauge */}
<div className="mx-auto w-full max-w-[460px]">

  <svg
    viewBox="0 0 300 151"
    className="block h-auto w-full"
    role="img"
    aria-label={
      overviewReady
        ? `التقييم الفني ${biasLabel[overviewDirection] || "غير متاح"}`
        : "لا تتوفر بيانات لرسم التقييم الفني"
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
      التقييم الفني
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
      {biasLabel[overviewDirection] || "غير متاح"}
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
        بيع
      </span>
    </div>

    <div className="text-center">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-slate-500">
        <span className="h-2 w-2 rounded-full bg-slate-400" />
        محايد
      </span>
    </div>

    <div className="text-right">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-600">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        شراء
      </span>
    </div>
  </div>

</div>


              {/* Vote distribution */}
              <div className="mt-2">

                <div className="grid grid-cols-3 gap-3">

                  <div className="rounded-xl bg-emerald-50 p-3 text-center">
                    <p className="text-[11px] font-bold text-emerald-700">
                      شراء
                    </p>
                    <p className="mt-1 text-2xl font-black text-emerald-700">
                      {hasVotes ? buyCount : "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-100 p-3 text-center">
                    <p className="text-[11px] font-bold text-slate-600">
                      محايد
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-700">
                      {hasVotes ? neutralCount : "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-rose-50 p-3 text-center">
                    <p className="text-[11px] font-bold text-rose-700">
                      بيع
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
                  aria-label="توزيع أصوات المؤشرات"
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
                  المقياس يوضح توازن أصوات المؤشرات، وليس احتمال
                  صعود السعر أو هبوطه.
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
        تفاصيل المؤشرات الفنية
      </h3>

      <p className="mt-1 text-[11px] text-slate-500">
        توزيع إشارات الشراء والبيع على فريم {timeframe}
      </p>
    </div>

    <div className="flex items-center gap-2">

      <span
        title="تعامل المتوسطات المتحركة EMA 50 وEMA 200 كمجموعة تصويت واحدة. مؤشر ATR يقيس التذبذب ولا يدخل في التصويت. قد لا تتوفر بعض القيم عندما تكون البيانات غير مكتملة."
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
        المؤشرات الفنية
      </h4>

      <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">
        8 مجموعات تصويت
      </span>

    </div>

    <div className="grid grid-cols-3 gap-2">

      {[
        {
          label: "شراء",
          value: technicalKnown ? technicalBuy : "—",
          color: "text-emerald-700",
          background: "bg-emerald-50",
          border: "border-emerald-100",
          dot: "bg-emerald-500",
        },
        {
          label: "محايد",
          value: technicalKnown ? technicalNeutral : "—",
          color: "text-slate-700",
          background: "bg-slate-50",
          border: "border-slate-200",
          dot: "bg-slate-400",
        },
        {
          label: "بيع",
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

            <span className={`text-[21px] font-black leading-none tabular-nums ${item.color}`}>
              {item.value}
            </span>

            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
              <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
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
        المتوسطات المتحركة
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
          label: "شراء",
          value: movingAverageKnown ? movingAverageBuy : "—",
          color: "text-emerald-700",
          background: "bg-emerald-50",
          border: "border-emerald-100",
          dot: "bg-emerald-500",
        },
        {
          label: "محايد",
          value: movingAverageKnown ? movingAverageNeutral : "—",
          color: "text-slate-700",
          background: "bg-slate-50",
          border: "border-slate-200",
          dot: "bg-slate-400",
        },
        {
          label: "بيع",
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

            <span className={`text-[21px] font-black leading-none tabular-nums ${item.color}`}>
              {item.value}
            </span>

            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
              <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
              {item.label}
            </span>

          </div>

        </div>

      ))}

    </div>
  </div>

  {/* ==========================================
      SUPPORTING METRICS
      ADX / RSI / ATR
  ========================================== */}

  <div className="mt-3 grid grid-cols-3 gap-2.5">

    {[
      {
        code: "ADX",
        title: "قوة الاتجاه",
        value: adxValue,
        description:
          "يقيس قوة الاتجاه دون تحديد ما إذا كان صاعداً أو هابطاً. أقل من 20 ضعيف، ومن 20 إلى 25 اتجاه ناشئ، ومن 25 إلى 40 واضح إلى قوي، وفوق 40 قوي جداً.",
      },
      {
        code: "RSI",
        title: "القوة النسبية",
        value: rsiValue,
        description:
          "يقيس زخم حركة السعر من 0 إلى 100. فوق 70 قد يشير إلى تشبع شرائي، وتحت 30 قد يشير إلى تشبع بيعي. لا يعني ذلك بالضرورة انعكاس السعر.",
      },
      {
        code: "ATR",
        title: "معدل التذبذب",
        value: atrValue,
        description:
          "يقيس متوسط نطاق الحركة السعرية. القيمة الأعلى تعني تذبذباً أوسع، لكنها لا تحدد اتجاه السعر. وتعتمد وحدة القياس على الأداة المالية.",
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
              aria-label={`ما معنى مؤشر ${metric.code}؟`}
              title={`${metric.code} — ${metric.title}: ${metric.description}`}
              className="flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <Info size={12} />
            </button>

            <div
              role="tooltip"
              className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-3 hidden w-[245px] max-w-[80vw] -translate-x-1/2 rounded-xl border border-[#bed3ef] bg-white p-3 text-right opacity-0 shadow-[0_12px_35px_rgba(15,42,84,0.22)] transition md:block md:group-hover:visible md:group-hover:opacity-100 md:group-focus-within:visible md:group-focus-within:opacity-100"
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
              جميع النتائج معلومات تحليلية وصفية وليست توصيات تداول.
              البيانات لقطات دورية وقد تصبح قديمة عند توقف التحديث.
            </p>

            <Link
              href={`/technical-analysis/${overviewInstrument.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#102b50] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-blue-700"
            >
              التحليل الفني التفصيلي
              <ArrowLeft size={15} />
            </Link>

          </div>

        
        </div>
      </div>
    </section>
  );
})()}

{/* ============================================================
    CLOSE MAIN TECHNICAL ANALYSIS CONTAINERS
    Pivot V6 starts as a separate full-width section
============================================================ */}

</div>
</div>

{/* ============================================================
    08 — PIVOT V6
    Fully independent section
    Independent symbol and timeframe
============================================================ */}

<PivotV6Panel />

{/* ============================================================
    MARKET PULSE — BROKER ALARAB
    Unified Premium Navy Design
    Real Technical Data | 44 Instruments | 7 Timeframes
    READ ONLY
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
          title: "لا تتوفر تصنيفات",
          description: "لا توجد بيانات كافية لتحديد الاتجاه الغالب.",
          color: "text-slate-600",
          background: "bg-slate-50",
          border: "border-slate-200",
          icon: "—",
        }
      : bullish === bearish && bullish >= neutral
      ? {
          title: "توازن بين الصعود والهبوط",
          description: "أعداد الأدوات الصاعدة والهابطة متساوية.",
          color: "text-blue-700",
          background: "bg-blue-50",
          border: "border-blue-100",
          icon: "↔",
        }
      : bullish > bearish && bullish > neutral
      ? {
          title: "الاتجاه الصاعد هو الغالب",
          description: "الأدوات المصنفة صاعدة أكثر من غيرها.",
          color: "text-emerald-700",
          background: "bg-emerald-50",
          border: "border-emerald-100",
          icon: "↗",
        }
      : bearish > bullish && bearish > neutral
      ? {
          title: "الاتجاه الهابط هو الغالب",
          description: "الأدوات المصنفة هابطة أكثر من غيرها.",
          color: "text-rose-700",
          background: "bg-rose-50",
          border: "border-rose-100",
          icon: "↘",
        }
      : neutral > bullish && neutral > bearish
      ? {
          title: "التصنيف المحايد هو الغالب",
          description: "عدد الأدوات المحايدة يتجاوز الصاعدة والهابطة.",
          color: "text-slate-700",
          background: "bg-slate-100",
          border: "border-slate-200",
          icon: "↔",
        }
      : {
          title: "تصنيفات السوق متقاربة",
          description: "لا يوجد اتجاه منفرد يتصدر جميع التصنيفات.",
          color: "text-blue-700",
          background: "bg-blue-50",
          border: "border-blue-100",
          icon: "↔",
        };

  const pulseStats = [
    {
      label: "اتجاهات صاعدة",
      value: bullish,
      color: "text-emerald-700",
      background: "bg-emerald-50",
      border: "border-emerald-100",
      dot: "bg-emerald-500",
      percentage: percentage(bullish),
    },
    {
      label: "اتجاهات هابطة",
      value: bearish,
      color: "text-rose-700",
      background: "bg-rose-50",
      border: "border-rose-100",
      dot: "bg-rose-500",
      percentage: percentage(bearish),
    },
    {
      label: "اتجاهات محايدة",
      value: neutral,
      color: "text-slate-700",
      background: "bg-slate-50",
      border: "border-slate-200",
      dot: "bg-slate-400",
      percentage: percentage(neutral),
    },
    {
      label: "غير مصنفة",
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
  aria-labelledby="market-pulse-heading"
  className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] pt-4 pb-3 sm:pt-5 sm:pb-3"
>
  <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

    <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_18px_45px_-28px_rgba(13,48,95,0.28)]">

          {/* ====================================================
              NAVY HEADER
          ==================================================== */}

          <div
            className="border-b border-[#244c7c] px-5 py-5 text-white sm:px-7 sm:py-6"
            style={{
              background:
                "linear-gradient(110deg, #205895 0%, #143b6c 45%, #091d36 100%)",
            }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0">

                <div className="mb-2 flex items-center gap-2 text-[10px] font-black tracking-wide text-blue-200">
                  <Activity size={15} />
                  MARKET PULSE
                </div>

                <h2
                  id="market-pulse-heading"
                  className="text-xl font-black leading-snug text-white sm:text-2xl"
                >
                  نبض الأسواق المالية
                </h2>

                <p className="mt-2 max-w-[850px] text-xs leading-7 text-blue-100/90">
                  نظرة شاملة على الاتجاهات الفنية للعملات الأجنبية
                  والذهب والفضة عبر 44 أداة مالية.
                  اكتشف توزيع الاتجاهات الصاعدة والهابطة والمحايدة
                  وفق الإطار الزمني المختار.
                </p>

              </div>

              <div className="hidden shrink-0 items-center gap-2 self-start rounded-xl border border-white/20 bg-white/10 px-4 py-3 lg:flex lg:self-auto">

                <BarChart3
                  size={19}
                  className="text-blue-200"
                />

                <div>
                  <p className="text-[10px] text-blue-200">
                    الأدوات المشمولة
                  </p>

                  <p className="text-lg font-black text-white">
                    {pulseRows.length}
                    <span className="mr-1 text-[11px] font-medium text-blue-200">
                      أداة مالية
                    </span>
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* ====================================================
              TIMEFRAME SELECTOR
          ==================================================== */}

          <div className="flex flex-col gap-3 border-b border-blue-100 bg-[#eaf2ff] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">

            <div>
              <p className="text-xs font-black text-[#10233f]">
                الإطار الزمني لنبض الأسواق
              </p>

              <p className="mt-1 text-[11px] leading-6 text-slate-500">
                يتم احتساب الملخص من التصنيفات الفنية للأدوات
                على الفريم المحدد.
              </p>
            </div>

            <div
              dir="ltr"
              role="group"
              aria-label="اختر الإطار الزمني لنبض الأسواق"
              className="flex max-w-full gap-1.5 overflow-x-auto pb-1"
            >
              {TIMEFRAMES.map((frame) => (
                <button
                  key={frame}
                  type="button"
                  onClick={() => setTimeframe(frame)}
                  aria-pressed={timeframe === frame}
                  className={`min-w-[45px] shrink-0 rounded-lg border px-3 py-2.5 text-[11px] font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
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

          {loading && rows.length === 0 ? (

            <div className="px-6 py-14 text-center">

              <RefreshCw
                size={27}
                className="mx-auto mb-4 animate-spin text-blue-600"
              />

              <p className="text-sm font-bold text-slate-600">
                جارٍ تحميل ملخص الأسواق...
              </p>

            </div>

          ) : rows.length === 0 ? (

            <div className="px-6 py-14 text-center">

              <Info
                size={27}
                className="mx-auto mb-4 text-slate-400"
              />

              <p className="text-sm font-bold text-slate-600">
                لا تتوفر بيانات التحليل الفني حالياً.
              </p>

            </div>

          ) : (

            <>

              {/* ====================================================
                  MARKET DOMINANT DIRECTION
              ==================================================== */}

              <div className="border-b border-slate-100 bg-white px-5 py-5 sm:px-7">

                <div
                  className={`flex flex-col gap-3 rounded-xl border px-4 py-4 sm:flex-row sm:items-center sm:justify-between ${dominantDirection.border} ${dominantDirection.background}`}
                >

                  <div className="flex items-center gap-3">

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-black ${dominantDirection.color}`}
                    >
                      {dominantDirection.icon}
                    </span>

                    <div>

                      <p className="text-[10px] font-bold text-slate-500">
                        الاتجاه الغالب — {timeframe}
                      </p>

                      <h3
                        className={`mt-1 text-sm font-black sm:text-base ${dominantDirection.color}`}
                      >
                        {dominantDirection.title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-6 text-slate-500">
                        {dominantDirection.description}
                      </p>

                    </div>

                  </div>

                  <span className="self-start rounded-lg border border-white bg-white/80 px-3 py-2 text-[11px] font-bold text-slate-600 sm:self-auto">
                    {classifiedTotal} / {pulseRows.length} أداة مصنفة
                  </span>

                </div>

              </div>

              {/* ====================================================
                  FOUR MARKET STAT CARDS
              ==================================================== */}

              <div className="px-5 py-5 sm:px-7 sm:py-6">

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                  <div>
                    <h3 className="text-sm font-black text-[#10233f] sm:text-base">
                      توزيع الاتجاهات الفنية
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-500">
                      ملخص تصنيفات المؤشرات الفنية للأدوات المشمولة
                    </p>
                  </div>

                  <span className="rounded-lg bg-blue-50 px-3 py-2 text-[11px] font-black text-blue-700">
                    الفريم: {timeframe}
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

                  {pulseStats.map((stat) => (

                    <div
                      key={stat.label}
                      className={`rounded-2xl border p-4 sm:p-5 ${stat.border} ${stat.background}`}
                    >

                      <div className="mb-3 flex items-center justify-between gap-2">

                        <span
                          className={`h-2.5 w-2.5 rounded-full ${stat.dot}`}
                        />

                        <span className="text-[10px] font-bold text-slate-500">
                          {stat.label}
                        </span>

                      </div>

                      <p
                        className={`text-3xl font-black tabular-nums ${stat.color}`}
                      >
                        {stat.value}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-2">

                        <span className="text-[10px] text-slate-500">
                          {stat.percentage !== null
                            ? "من الأدوات المصنفة"
                            : "دون تصنيف معتمد"}
                        </span>

                        {stat.percentage !== null && (
                          <span
                            className={`text-xs font-black tabular-nums ${stat.color}`}
                          >
                            {classifiedTotal > 0
                              ? `${(
                                  (stat.value / classifiedTotal) *
                                  100
                                ).toFixed(1)}%`
                              : "0%"}
                          </span>
                        )}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* ====================================================
                  DISTRIBUTION BAR
              ==================================================== */}

              <div className="border-t border-slate-100 bg-[#f8faff] px-5 py-5 sm:px-7">

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                  <div>

                    <h3 className="text-sm font-black text-[#10233f]">
                      التوزيع النسبي لاتجاهات الأسواق
                    </h3>

                    <p className="mt-1 text-[11px] leading-6 text-slate-500">
                      النسب محسوبة من الأدوات المصنفة فقط،
                      ولا تشمل البيانات غير المصنفة.
                    </p>

                  </div>

                  <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600">
                    {classifiedTotal} أداة ضمن التوزيع
                  </span>

                </div>

                <div
                  className="flex h-4 w-full overflow-hidden rounded-full bg-slate-200"
                  role="img"
                  aria-label={`صاعدة ${bullish}، هابطة ${bearish}، محايدة ${neutral}`}
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

                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-bold text-slate-600">

                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    صاعد: {bullish}
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    هابط: {bearish}
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    محايد: {neutral}
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    غير مصنف: {unclassified}
                  </span>

                </div>

              </div>

              {/* ====================================================
                  DATA STATUS FOOTER
              ==================================================== */}

              <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                <div className="flex flex-wrap items-center gap-3">

                  <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-black text-emerald-700">
                    {readyRows.length} تحليل READY
                  </span>

                  <span className="rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-bold text-slate-600">
                    {fresh} حديث وفق عمر الشمعة
                  </span>

                  <p className="text-[11px] leading-6 text-slate-500">
                    التصنيفات غير الحديثة لقطات محفوظة،
                    ولا تمثل أسعاراً أو إشارات لحظية.
                  </p>

                </div>

                <a
                  href="#scanner"
                  className="inline-flex shrink-0 items-center gap-2 self-start text-xs font-black text-blue-700 transition hover:text-blue-900 hover:underline"
                >
                  استكشف تفاصيل جميع الأدوات
                  <ArrowLeft size={14} />
                </a>

              </div>

            </>

          )}

       
        {/* ====================================================
            MARKET PULSE — INTEGRATED DISCLAIMER FOOTER
            Inside main card, mobile and desktop
        ==================================================== */}

        <div className="border-t border-slate-200 bg-[#f8faff] px-4 py-3 sm:px-7 sm:py-4">
          <div className="flex items-start gap-2.5">

            <Info
              size={15}
              className="mt-1 shrink-0 text-blue-600"
            />

            <p className="min-w-0 text-[10px] leading-6 text-slate-500 sm:text-[11px] sm:leading-7">
              تعرض هذه اللوحة ملخصاً إحصائياً لتصنيفات التحليل الفني
              للأدوات المالية التي يغطيها بروكر العرب.
              لا تمثل النتائج توقعات مؤكدة لاتجاه السوق أو توصيات تداول،
              وقد تختلف التصنيفات بين الأطر الزمنية.
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
    Broker Alarab | Arabic | 1520px | SEO-focused
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
    AUD: "الدولار الأسترالي",
    CAD: "الدولار الكندي",
    CHF: "الفرنك السويسري",
    CZK: "الكورونا التشيكية",
    DKK: "الكرونة الدنماركية",
    EUR: "اليورو",
    GBP: "الجنيه الإسترليني",
    HKD: "دولار هونغ كونغ",
    HUF: "الفورنت المجري",
    JPY: "الين الياباني",
    MXN: "البيزو المكسيكي",
    NOK: "الكرونة النرويجية",
    NZD: "الدولار النيوزيلندي",
    SEK: "الكرونة السويدية",
    USD: "الدولار الأمريكي",
    ZAR: "الراند الجنوب أفريقي",
  };

  const segmentOptions = [
    { id: "all", label: "جميع الأسواق" },
    { id: "metals", label: "الذهب والفضة" },
    { id: "major", label: "الأزواج الرئيسية" },
    { id: "cross", label: "الأزواج التقاطعية" },
    { id: "emerging", label: "عملات الأسواق الناشئة" },
  ] as const;

  const frameLabels: Record<string, string> = {
    M5: "5 دقائق",
    M15: "15 دقيقة",
    M30: "30 دقيقة",
    H1: "ساعة",
    H4: "4 ساعات",
    D1: "يومي",
    W1: "أسبوعي",
  };

  const directionLabels: Record<string, string> = {
    STRONG_BUY: "شراء قوي",
    BUY_BIAS: "ميل للشراء",
    MIXED: "محايد",
    SELL_BIAS: "ميل للبيع",
    STRONG_SELL: "بيع قوي",
    DATA_INCOMPLETE: "غير متاح",
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
      return "الذهب مقابل الدولار الأمريكي";
    }

    if (item.symbol === "XAGUSDc") {
      return "الفضة مقابل الدولار الأمريكي";
    }

    return `${currencyNames[item.base] || item.base} مقابل ${
      currencyNames[item.quote] || item.quote
    }`;
  }

  function getMarketLinkLabel(item: Instrument) {
    if (item.symbol === "XAUUSDc") {
      return "التحليل الفني للذهب";
    }

    if (item.symbol === "XAGUSDc") {
      return "التحليل الفني للفضة";
    }

    return `تحليل ${currencyNames[item.base] || item.base} مقابل ${
      currencyNames[item.quote] || item.quote
    }`;
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
  const row = rows.find(
    (item) =>
      item.symbol === instrument.symbol &&
      item.timeframe === timeframe
  );

  const priceRow = rows.find(
    (item) =>
      item.symbol === instrument.symbol &&
      item.timeframe === "M5"
  );

  const quote = scannerQuotes[instrument.symbol];

  // Database update timestamp reflects actual publication time.
  const quoteFresh =
    quote !== undefined &&
    isFresh(quote.updated_at, 1);

  const referencePrice = numberValue(priceRow?.price);

  const displayedPrice =
    quoteFresh ? quote.bid : referencePrice;

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

    price: displayedPrice,
    priceSource: quoteFresh
      ? ("live" as const)
      : ("reference" as const),
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
  aria-labelledby="market-explorer-heading"
  className="relative overflow-hidden border-b border-slate-200 bg-[#f3f6fb] pt-3 pb-3 sm:pt-3 sm:pb-3"
>
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        


{/* ====================================================
    SCANNER HEADER — COMPACT / SAFE BACKGROUND
==================================================== */}
<div
  className="overflow-hidden text-white"
  style={{
    background:
      "linear-gradient(110deg, #205895 0%, #143b6c 45%, #091d36 100%)",
  }}
>
  {/* TITLE AREA */}
  <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-7">
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

      {/* TITLE AND DESCRIPTION */}
      <div className="min-w-0 max-w-[980px]">
        <h2
  id="market-explorer-heading"
  className="text-[19px] font-black leading-[1.5] tracking-tight text-white sm:text-[25px] lg:text-[27px]"
>
  ماسح التحليل الفني للعملات والفوركس
  <span className="inline text-[#64c7ff]">
    {" "}والذهب والفضة
  </span>
</h2>

        <p className="mt-2 max-w-[900px] text-[12px] leading-6 text-slate-200 sm:text-[13px]">
          قارن الاتجاهات الفنية للذهب والفضة وأزواج العملات
          عبر سبعة أطر زمنية، وتابع تقييمات الشراء والبيع
          وقوة الاتجاه وفق مؤشر ADX والأسعار المرجعية
          من شموع مكتملة.
        </p>

        <p className="mt-1 text-[10px] leading-5 text-blue-200/80 sm:text-[11px]">
          التحليلات وصفية وليست توصيات تداول.
          الأسعار ليست لحظية، وتظهر حالة حداثة البيانات
          لكل أداة.
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
            أداة ضمن المحرك
          </p>
        </div>
      </div>

    </div>
  </div>

  {/* ====================================================
    QUICK MARKET PAGES — COMING SOON
    NON-CLICKABLE
==================================================== */}

<div
  className="hidden border-t border-white/10 px-3 py-2 sm:block sm:px-5"
  style={{ backgroundColor: "#07182e" }}
>
  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
    {[
      { label: "تحليل الذهب", mark: "Au" },
      { label: "تحليل الفضة", mark: "Ag" },
      { label: "اليورو دولار", mark: "€" },
      { label: "الجنيه دولار", mark: "£" },
      { label: "الدولار ين", mark: "¥" },
      { label: "الدولار فرنك", mark: "Fr" },
      { label: "الدولار كندي", mark: "C$" },
    ].map((market) => (
      <div
        key={market.label}
        aria-label={`${market.label} — قريباً`}
        className="flex min-h-[38px] min-w-0 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5"
      >
        <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-[#2664b6] px-1 text-[10px] font-black text-white">
          {market.mark}
        </span>

        <span className="min-w-0 flex-1 truncate text-[10px] font-bold text-blue-100 sm:text-[11px]">
          {market.label}
        </span>

        <span className="shrink-0 rounded-md bg-amber-400/15 px-1.5 py-0.5 text-[9px] font-black text-amber-200">
          قريباً
        </span>
      </div>
    ))}
  </div>
</div>
</div>

        {/* MAIN SCANNER */}
        <div className="overflow-hidden border border-t-0 border-[#cbd9ed] bg-white shadow-[0_18px_50px_-25px_rgba(13,48,95,0.24)]">

          
{/* ============================================================
    MOBILE SCANNER — COMPACT SEARCH + TIMEFRAME
    Extra filters are collapsible.
    Desktop scanner remains unchanged.
============================================================ */}

<div className="border-b border-[#cfdef0] bg-white px-3 py-3 lg:hidden">

  {/* SEARCH */}

  <div className="relative">

    <Search
      size={18}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-600"
    />

    <input
      type="search"
      value={query}
      onChange={(event) => {
        setQuery(event.target.value);
        setShowAllPairs(false);
      }}
      placeholder="ابحث عن الذهب، EUR/USD، GBP/USD..."
      aria-label="البحث في الأسواق المالية"
      className="h-11 w-full rounded-lg border border-blue-200 bg-white pr-10 pl-9 text-[12px] font-semibold text-[#102d53] outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />

    {query && (
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setShowAllPairs(false);
        }}
        aria-label="مسح البحث"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500"
      >
        <X size={15} />
      </button>
    )}

  </div>

  {/* TIMEFRAME */}

  <div className="mt-3">

    <div className="mb-2 flex items-center justify-between gap-2">

      <span className="text-[12px] font-black text-[#10233f]">
        الإطار الزمني
      </span>

      <span className="text-[10px] font-semibold text-slate-500">
        {frameLabels[timeframe]}
      </span>

    </div>

    <div
      dir="ltr"
      role="group"
      aria-label="اختيار الإطار الزمني للماسح"
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
          تصفية متقدمة
        </span>

        {(marketSegment !== "all" ||
          directionFilter !== "all") && (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-black text-blue-700">
            مفعلة
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
          نوع السوق
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
          الاتجاه الفني
        </label>

        <select
          id="mobile-scanner-direction"
          value={directionFilter}
          onChange={(event) => {
            setDirectionFilter(event.target.value);
            setShowAllPairs(false);
          }}
          className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="all">جميع الاتجاهات</option>
          <option value="STRONG_BUY">شراء قوي</option>
          <option value="BUY_BIAS">ميل للشراء</option>
          <option value="MIXED">محايد</option>
          <option value="SELL_BIAS">ميل للبيع</option>
          <option value="STRONG_SELL">ميل للبيع</option>
          <option value="DATA_INCOMPLETE">بيانات غير مكتملة</option>
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
        إعادة ضبط جميع الفلاتر
      </button>

    </div>

  </details>

</div>

{/* ============================================================
    ORIGINAL DESKTOP SCANNER CONTROLS
    Keep all existing JSX unchanged inside this wrapper.
============================================================ */}

<div className="hidden lg:block">

  {/* TOOLBAR */}

  <div className="border-b border-[#cfdef0] bg-gradient-to-l from-[#eaf2ff] via-[#f2f7ff] to-[#ffffff] p-5 sm:p-6">


           
{/* SEARCH + COVERAGE STATUS */}
<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

  {/* SEARCH BOX */}
  <div className="relative w-full lg:max-w-[540px]">

    <Search
      size={19}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1d5fd0]"
    />

    <input
      type="search"
      value={query}
      onChange={(event) => {
        setQuery(event.target.value);
        setShowAllPairs(false);
      }}
      placeholder="ابحث عن الذهب، اليورو، EUR/USD، GBP/USD..."
      aria-label="البحث في الأسواق المالية"
      className="h-[48px] w-full rounded-xl border-2 border-[#a9c8f5] bg-white py-2.5 pr-12 pl-11 text-[13px] font-semibold text-[#102d53] shadow-[0_3px_12px_rgba(30,90,170,0.07)] outline-none transition placeholder:font-normal placeholder:text-[#7184a1] hover:border-[#6ca4ef] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/10"
    />

    {query && (
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setShowAllPairs(false);
        }}
        aria-label="مسح البحث"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:bg-blue-50"
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
        {readyCount} من {INSTRUMENTS.length} تحليل فني مكتمل
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
        {freshCount} لقطة حديثة
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
                الإطار الزمني
              </span>

              <div
                role="group"
                aria-label="الإطار الزمني للماسح الفني"
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
                الاتجاه الفني
              </label>

              <select
                id="scanner-direction-filter"
                value={directionFilter}
                onChange={(event) =>
                  setDirectionFilter(event.target.value)
                }
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="all">جميع الاتجاهات</option>
                <option value="STRONG_BUY">شراء قوي</option>
                <option value="BUY_BIAS">ميل للشراء</option>
                <option value="MIXED">محايد</option>
                <option value="SELL_BIAS">ميل للبيع</option>
                <option value="STRONG_SELL">بيع قوي</option>
                <option value="DATA_INCOMPLETE">
                  بيانات غير مكتملة
                </option>
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
                إعادة ضبط الفلاتر
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
            ماذا يعني مؤشر قوة الاتجاه ADX؟
          </p>
          <p className="text-[10px] leading-5 text-slate-500">
            اضغط لعرض درجات قوة الاتجاه ومعنى كل قراءة
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
        مؤشر ADX (Average Directional Index) يقيس قوة
        الاتجاه السعري، سواء كان صاعداً أو هابطاً.
        ارتفاع القراءة يشير عادةً إلى اتجاه أقوى،
        لكنه لا يحدد اتجاه السعر بمفرده.
      </p>

      <div className="mt-3 overflow-hidden rounded-lg border border-[#d6e2f0]">

        <div className="grid grid-cols-2 bg-[#153963] px-3 py-2 text-[11px] font-black text-white">
          <span>قيمة ADX</span>
          <span>التفسير</span>
        </div>

        {[
          ["أقل من 20", "ضعيف أو سوق عرضية"],
          ["20 إلى أقل من 25", "اتجاه ناشئ"],
          ["25 إلى أقل من 40", "واضح إلى قوي"],
          ["40 إلى أقل من 50", "قوي جداً"],
          ["50 فأكثر", "شديد القوة"],
        ].map(([range, meaning], index) => (
          <div
            key={range}
            className={`grid grid-cols-2 gap-3 border-t border-slate-100 px-3 py-2 text-[11px] ${
              index % 2 === 0 ? "bg-white" : "bg-[#f3f7fd]"
            }`}
          >
            <span className="font-black text-[#102d53]">{range}</span>
            <span className="text-slate-700">{meaning}</span>
          </div>
        ))}

      </div>

      <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
        <p className="text-[11px] leading-6 text-[#183b6a]">
          <strong>مثال:</strong> ADX بقيمة 34.60 يعني
          اتجاهاً واضحاً إلى قوي، لكنه لا يعني الشراء
          أو البيع بمفرده.
        </p>
      </div>

      <p className="mt-2 text-[10px] leading-5 text-slate-500">
        هذه نطاقات تفسيرية شائعة، وليست قواعد مطلقة
        أو توصيات تداول.
      </p>

    </div>
  </details>
</div>
</div>

{/* ====================================================
    DESKTOP MARKET TABLE — IMPROVED DESIGN
==================================================== */}
<div className="hidden overflow-x-auto lg:block">

  <table className="w-full min-w-[950px] text-right text-sm">

    <thead className="bg-[#153963]">
      <tr className="border-b border-[#2d527e] text-[12px] font-black text-white">

        <th scope="col" className="px-5 py-4">
          السوق المالي
        </th>

        <th scope="col" className="px-5 py-4">
         آخر سعر متاح
        </th>

        <th scope="col" className="px-5 py-4">
          التقييم الفني
        </th>

        <th scope="col" className="px-5 py-4 text-center">
          <div className="flex items-center justify-center gap-1.5">
            قوة الاتجاه (ADX)
            <Info size={15} className="text-blue-200" />
          </div>
        </th>

        <th scope="col" className="px-5 py-4 text-center">
          حالة التحديث
        </th>

        <th scope="col" className="px-5 py-4 text-center">
          صفحة التحليل
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
                className="group text-right"
              >
                <span
                  dir="ltr"
                  className="block text-right text-[14px] font-black text-[#102d53] group-hover:text-blue-700"
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
              className="px-5 py-4 text-right text-[14px] font-black tabular-nums text-[#10233f]"
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
                {directionLabels[market.direction] || "غير متاح"}
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

            {/* TECHNICAL ANALYSIS FRESHNESS — NOT PRICE FRESHNESS */}
<td className="px-5 py-4 text-center align-middle">
  <div className="flex flex-col items-center gap-1.5">
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
        ? "غير مكتمل"
        : market.fresh
        ? "تحليل محدّث"
        : "بحاجة لتحديث"}
    </span>

    <span className="max-w-[145px] text-[9px] leading-4 text-slate-400">
      {market.row?.calculated_at_utc
        ? `آخر حساب: ${dateText(market.row.calculated_at_utc)}`
        : "وقت الحساب غير متاح"}
    </span>
  </div>
</td>

            {/* ====================================================
    ANALYSIS PAGE — COMING SOON
    DESKTOP / NON-CLICKABLE
==================================================== */}

<td className="px-5 py-4 text-center align-middle">
  <div
    className="inline-flex max-w-[280px] flex-wrap items-center justify-center gap-2"
    aria-label={`${getMarketLinkLabel(instrument)} — قريباً`}
  >
    <span className="text-[11px] font-bold text-slate-500">
      {getMarketLinkLabel(instrument)}
    </span>

    <span className="inline-flex shrink-0 items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-700">
      قريباً
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
    MOBILE MARKET CARDS — COMPACT VERSION
    Mobile: 8 results
    Desktop: unchanged
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
              className="text-right text-[14px] font-black leading-5 text-[#10233f]"
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
            {directionLabels[market.direction] || "غير متاح"}
          </span>

        </div>

        {/* PRICE + ADX — COMPACT ROW */}

        <div className="mt-2.5 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 px-2.5 py-2">

          {/* LAST CLOSED PRICE */}

          <div className="min-w-0">

            <p className="text-[10px] font-semibold text-slate-500">
  السعر المرجعي (M5)
</p>

            <p
              dir="ltr"
              className="mt-1 text-right text-[14px] font-black tabular-nums text-[#10233f]"
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
              قوة الاتجاه (ADX)
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

        {/* ANALYSIS LINK */}

        

      </article>
    );
  })}

</div>

{/* ====================================================
    NO RESULTS
==================================================== */}

{filteredMarkets.length === 0 && (
  <div className="border-t border-slate-100 px-4 py-9 text-center sm:px-5 sm:py-12">

    <Search
      size={26}
      className="mx-auto text-slate-400"
    />

    <h3 className="mt-3 text-base font-black text-slate-800">
      لا توجد أسواق مطابقة
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      جرّب تغيير البحث أو الفريم أو تصنيف الاتجاه.
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
      عرض جميع الأسواق
    </button>

  </div>
)}

{/* ====================================================
    SCANNER FOOTER
    Mobile: 8 results
    Desktop: 12 results
==================================================== */}

<div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-[#f8faff] px-3 py-3 sm:px-6 sm:py-4">

  {/* RESULTS COUNT */}

  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 sm:text-xs">

    <span className="lg:hidden">
      عرض{" "}
      <strong className="text-slate-800">
        {mobileVisibleMarkets.length}
      </strong>{" "}
      من{" "}
      <strong className="text-slate-800">
        {filteredMarkets.length}
      </strong>{" "}
      سوقاً
    </span>

    <span className="hidden lg:inline">
      عرض{" "}
      <strong className="text-slate-800">
        {visibleMarkets.length}
      </strong>{" "}
      من{" "}
      <strong className="text-slate-800">
        {filteredMarkets.length}
      </strong>{" "}
      سوقاً
    </span>

    <span className="hidden h-4 w-px bg-slate-200 sm:block" />

    <span>
      الفريم المحدد:{" "}
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
      عرض المزيد ({filteredMarkets.length - 8})
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
      عرض جميع النتائج
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
        عرض أقل — العودة إلى 8 نتائج
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
        عرض نتائج أقل
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
        عرض نتائج أقل
      </button>
    )}

</div>
</div>


        {/* SEO EDITORIAL BLOCK */}
        <div className="mt-4 grid gap-5 border border-[#cbd9ed] bg-white px-4 py-5 shadow-sm sm:mt-5 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-[1.3fr_0.7fr]">

          <div>
            <h3 className="text-xl font-black text-[#10233f]">
              كيف تستفيد من التحليل الفني للعملات الأجنبية؟
            </h3>

            <p className="mt-3 text-sm leading-8 text-slate-600">
              يساعد التحليل الفني للفوركس على دراسة حركة
              الأسعار من خلال الاتجاهات والمتوسطات المتحركة
              ومؤشرات الزخم والتقلب. ويمكن مقارنة نتائج
              الفريمات القصيرة مع الفريمات الأطول لفهم
              الاختلاف بين الحركة السعرية قصيرة الأجل
              والاتجاه الأوسع للسوق.
            </p>

            <p className="mt-3 text-sm leading-8 text-slate-600">
              يتيح مركز بروكر العرب استكشاف التحليل الفني
              للذهب والفضة وأزواج العملات المختلفة باستخدام
              منهجية موحدة. وتوفر صفحة كل أداة، عند اكتمالها،
              معلومات أكثر تفصيلاً عن مؤشراتها ومستوياتها
              الفنية ووقت تحديث البيانات.
            </p>
          </div>

          <aside className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">

            <div className="mb-3 flex items-center gap-2 text-blue-700">
              <Info size={19} />
              <h3 className="font-black">
                كيف تقرأ نتائج الماسح الفني؟
              </h3>
            </div>

            <p className="text-sm leading-8 text-slate-600">
              يعبر تصنيف الشراء أو البيع عن اتجاه
              مجموعة المؤشرات الفنية في الإطار الزمني
              المحدد، وليس عن توصية بتنفيذ صفقة.
              وقد تختلف نتائج الفريمات، كما أن البيانات
              المعروضة لقطات دورية وليست أسعاراً مباشرة.
            </p>

          </aside>
        </div>

      </div>
    </section>
  );
})()}


{/* ============================================================
    04 — MULTI-TIMEFRAME TECHNICAL HEATMAP
    Broker Alarab | Arabic | 1520px
    44 instruments × 7 timeframes
    Uses existing rows, symbol, timeframe and setters
============================================================ */}

{(() => {
  const heatmapDirections: Record<
    string,
    { label: string; short: string; style: string }
  > = {
    STRONG_BUY: {
      label: "شراء قوي",
      short: "شراء قوي",
      style: "bg-emerald-600 text-white",
    },
    BUY_BIAS: {
      label: "ميل للشراء",
      short: "شراء",
      style: "bg-emerald-100 text-emerald-800",
    },
    MIXED: {
      label: "محايد",
      short: "محايد",
      style: "bg-slate-100 text-slate-600",
    },
    SELL_BIAS: {
      label: "ميل للبيع",
      short: "بيع",
      style: "bg-rose-100 text-rose-800",
    },
    STRONG_SELL: {
      label: "بيع قوي",
      short: "بيع قوي",
      style: "bg-rose-600 text-white",
    },
    DATA_INCOMPLETE: {
      label: "غير مكتمل",
      short: "—",
      style: "bg-slate-50 text-slate-400",
    },
  };

  const heatmapFrameNames: Record<string, string> = {
    M5: "5 دقائق",
    M15: "15 دقيقة",
    M30: "30 دقيقة",
    H1: "ساعة",
    H4: "4 ساعات",
    D1: "يومي",
    W1: "أسبوعي",
  };

  // Featured first, then every remaining instrument.
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

    // Mobile: 6 instruments initially
// Desktop: 12 instruments initially
const mobileVisibleHeatmapInstruments = heatmapExpanded
  ? allHeatmapInstruments
  : allHeatmapInstruments.slice(0, 6);


  // Index once for fast lookups.
  const heatmapIndex = new Map(
    rows.map((item) => [
      `${item.symbol}:${item.timeframe}`,
      item,
    ])
  );

  function getHeatmapCell(instrumentSymbol: string, frame: string) {
    const row = heatmapIndex.get(`${instrumentSymbol}:${frame}`);

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
    aria-labelledby="market-heatmap-heading"
    className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] pt-3 pb-3 sm:pb-6"
  >
    {/* SAME 1520px CONTAINER SYSTEM AS OTHER SECTIONS */}
    <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

      {/* MAIN WHITE CARD — HEADER + TABLE + EDUCATIONAL CONTENT */}
      <div className="w-full overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

        {/* ====================================================
            MARKET HEATMAP — UNIFIED NAVY HEADER
        ==================================================== */}


      
{/* ====================================================
    MARKET HEATMAP — STANDARD NAVY HEADER
    Same visual system as Technical Overview & Scanner
==================================================== */}

<div
  className="border-b border-[#244c7c] px-4 py-4 text-white sm:px-6 sm:py-5 lg:px-7"
  style={{
    background:
      "linear-gradient(110deg, #205895 0%, #143b6c 45%, #091d36 100%)",
  }}
>
  <div className="flex flex-col gap-2 sm:gap-3">

    {/* EYEBROW */}

    <div className="flex items-center gap-2 text-[10px] font-black tracking-wide text-blue-200">
      <Activity size={15} />
      MARKET HEATMAP
    </div>

    {/* TITLE */}

    <h2
      id="market-heatmap-heading"
      className="text-[20px] font-black leading-[1.45] tracking-tight text-white sm:text-[25px] lg:text-[27px]"
    >
      خريطة الاتجاهات الفنية
      <span className="text-[#64c7ff]">
        {" "}للعملات والذهب والفضة
      </span>
    </h2>

    {/* DESCRIPTION */}

    <p className="max-w-[900px] text-[11px] font-medium leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
      قارن اتجاهات التحليل الفني للذهب والفضة
      وأزواج العملات عبر سبعة أطر زمنية،
      واكتشف اختلاف تصنيفات الشراء والبيع
     
      بين الفريمات القصيرة والطويلة.
    </p>

  </div>

</div>
{/* END NAVY HEADER — IMPORTANT */}

{/* ====================================================
    MAIN HEATMAP CONTENT — WHITE BACKGROUND
==================================================== */}


       

          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-3 py-3 sm:px-6 sm:py-5">
  <div
    role="group"
    aria-label="تصفية أسواق الخريطة الحرارية"
    className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:gap-2"
  >
              {[
                { id: "all", label: "جميع الأسواق" },
                { id: "metals", label: "الذهب والفضة" },
                { id: "forex", label: "أزواج العملات" },
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
              بيانات تحليل دورية، وليست إشارات لحظية
            </div>
          </div>

          {/* LEGEND */}
          <div className="hidden flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-[#fafcff] px-5 py-4 sm:px-6 lg:flex">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {[
                { label: "شراء قوي", color: "bg-emerald-600" },
                { label: "شراء", color: "bg-emerald-200" },
                { label: "محايد", color: "bg-slate-300" },
                { label: "بيع", color: "bg-rose-200" },
                { label: "بيع قوي", color: "bg-rose-600" },
                { label: "غير مكتمل", color: "bg-slate-100" },
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
              فريم {timeframe}: {selectedFrameReady} من 44 مكتمل
            </div>
          </div>

{/* MOBILE COLOR LEGEND */}

<div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-[#fafcff] px-3 py-2.5 text-[10px] font-bold text-slate-600 lg:hidden">

  <span className="flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
    شراء
  </span>

  <span className="flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-sm bg-rose-500" />
    بيع
  </span>

  <span className="flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-sm bg-slate-400" />
    محايد
  </span>

  <span className="text-slate-400">
    البيانات غير الحديثة موضحة داخل البطاقات
  </span>

</div>

          {/* ==================================================
              DESKTOP HEATMAP TABLE — UNCHANGED
          ================================================== */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[950px] border-collapse text-right">

              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th
                    scope="col"
                    className="sticky right-0 z-20 min-w-[185px] bg-white px-5 py-4 text-xs font-black text-[#10233f]"
                  >
                    السوق المالي
                  </th>

                  {TIMEFRAMES.map((frame) => (
                    <th
                      scope="col"
                      key={frame}
                      className={`min-w-[96px] px-2 py-4 text-center ${
                        timeframe === frame
                          ? "bg-blue-50"
                          : ""
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
                      className="sticky right-0 z-10 bg-white px-5 py-3 text-right group-hover:bg-[#f8fbff]"
                    >
                      <Link
                        href={`/technical-analysis/${instrument.slug}`}
                        className="block"
                        title={`التحليل الفني ${instrument.base}/${instrument.quote}`}
                      >
                        <span
                          dir="ltr"
                          className="block text-right text-sm font-black text-[#10233f] hover:text-blue-700"
                        >
                          {instrument.base}/{instrument.quote}
                        </span>

                        <span className="mt-1 block text-[11px] font-normal text-slate-500">
                          {instrument.type === "metals"
                            ? instrument.name
                            : "تحليل زوج العملات"}
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

                            aria-label={`${instrument.base}/${instrument.quote}، ${heatmapFrameNames[frame]}، ${cell.status.label}${
                              cell.ready && !cell.fresh
                                ? "، بيانات قديمة"
                                : ""
                            }`}
                            title={
                              `${instrument.base}/${instrument.quote} | ${frame} | ` +
                              cell.status.label +
                              (cell.ready && !cell.fresh
                                ? " | لقطة قديمة"
                                : "")
                            }
                            
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
      : "غير مكتمل"}
  </span>

  {cell.ready && !cell.fresh && (
    <span className="mt-0.5 text-[9px] font-medium">
      لقطة قديمة
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
              One compact card per instrument
              Seven timeframes in a responsive grid
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
                      href={`/technical-analysis/${instrument.slug}`}
                      className="block"
                    >
                      <h3
                        dir="ltr"
                        className="text-right text-[14px] font-black text-[#10233f]"
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
                    7 فريمات
                  </span>

                </div>

                {/* SEVEN FRAME CELLS */}

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
                        aria-label={`${instrument.base}/${instrument.quote}، ${heatmapFrameNames[frame]}، ${cell.status.label}${cell.ready && !cell.fresh ? "، بيانات قديمة" : ""}`}
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
                            : "غير مكتمل"}
                        </span>

                        {cell.ready && !cell.fresh && (
                          <span className="text-[8px] font-medium leading-3 opacity-75">
                            غير حديث
                          </span>
                        )}

                      </button>

                    );
                  })}

                </div>

                {/* MOBILE CARD FOOTER */}

                <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-[#fafcff] px-3 py-2">

                  <span className="text-[10px] text-slate-500">
                    اضغط على الفريم لعرض التحليل
                  </span>

                  <Link
                    href={`/technical-analysis/${instrument.slug}`}
                    className="inline-flex items-center gap-1 text-[10px] font-black text-blue-700"
                  >
                    التفاصيل
                    <ArrowLeft size={12} />
                  </Link>

                </div>

              </article>

            ))}

          </div>

          

{/* ====================================================
    HEATMAP RESULTS FOOTER
    Connected directly to market cards
    Mobile: 6 | Desktop: 12
==================================================== */}

<div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-[#f7f9fd] px-3 py-3 sm:px-6 sm:py-4">

  {/* MOBILE RESULT COUNT */}
  <div className="text-[11px] font-medium text-slate-500 lg:hidden">
    عرض{" "}
    <strong className="font-black text-[#10233f]">
      {mobileVisibleHeatmapInstruments.length}
    </strong>{" "}
    من{" "}
    <strong className="font-black text-[#10233f]">
      {allHeatmapInstruments.length}
    </strong>{" "}
    سوقاً
  </div>

  {/* DESKTOP RESULT COUNT */}
  <div className="hidden text-xs text-slate-500 lg:block">
    عرض{" "}
    <strong className="text-[#10233f]">
      {visibleHeatmapInstruments.length}
    </strong>{" "}
    من{" "}
    <strong className="text-[#10233f]">
      {allHeatmapInstruments.length}
    </strong>{" "}
    سوقاً
  </div>

  {/* MOBILE EXPAND BUTTON */}
  {allHeatmapInstruments.length > 6 && (
    <button
      type="button"
      onClick={() => setHeatmapExpanded((previous) => !previous)}
      aria-expanded={heatmapExpanded}
      className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-[11px] font-black text-blue-700 transition hover:bg-blue-50 lg:hidden"
    >
      {heatmapExpanded ? "عرض أقل" : "عرض المزيد"}

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
      onClick={() => setHeatmapExpanded((previous) => !previous)}
      aria-expanded={heatmapExpanded}
      className="hidden items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-5 py-2.5 text-xs font-black text-blue-700 transition hover:bg-blue-50 lg:inline-flex"
    >
      {heatmapExpanded
        ? "عرض أسواق أقل"
        : "عرض جميع الأسواق"}

      <ChevronDown
        size={16}
        className={`transition-transform ${
          heatmapExpanded ? "rotate-180" : ""
        }`}
      />
    </button>
  )}

</div>


{/* ==================================================
    HEATMAP EDUCATIONAL CONTENT
    Integrated below results footer
================================================== */}

<div className="grid gap-4 border-t-4 border-[#d9e7fa] bg-white px-4 pb-5 pt-6 sm:gap-6 sm:px-7 sm:py-7 lg:grid-cols-[1.25fr_0.75fr]">

          <div>
  <div className="mb-3 flex items-center gap-2">
    <BookOpen
      size={17}
      className="shrink-0 text-blue-700"
    />

    <span className="text-[10px] font-black tracking-wide text-blue-700">
      دليل قراءة الخريطة الفنية
    </span>
  </div>

  <h3 className="text-[18px] font-black leading-8 text-[#10233f] sm:text-xl">
    كيف تقارن اتجاه العملات عبر الأطر الزمنية؟
  </h3>

            <p className="mt-3 text-sm leading-8 text-slate-600">
              يساعد التحليل الفني متعدد الأطر الزمنية على
              مقارنة اتجاه حركة الأسعار قصيرة الأجل مع
              الاتجاهات الأطول. فعلى سبيل المثال، قد تظهر
              مؤشرات زوج اليورو مقابل الدولار ميلاً للشراء
              على فريم 15 دقيقة، بينما تشير المؤشرات
              اليومية إلى اتجاه مختلف.
            </p>

            <p className="mt-3 text-sm leading-8 text-slate-600">
              تجمع خريطة الاتجاهات الفنية في بروكر العرب
              نتائج المؤشرات للذهب والفضة وأزواج العملات
              الأجنبية في مكان واحد. ويمكن الانتقال إلى
              صفحة كل سوق لقراءة التفاصيل الفنية المرتبطة
              به عند توفرها.
            </p>
          </div>

          <aside className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
            <div className="flex items-center gap-2">
              <Info size={19} className="text-blue-700" />

              <h3 className="font-black text-[#10233f]">
                ماذا تعني ألوان الخريطة؟
              </h3>
            </div>

            <p className="mt-3 text-sm leading-8 text-slate-600">
              الأخضر يعكس تصنيف شراء، والأحمر تصنيف بيع،
              بينما يشير الرمادي إلى الحياد أو عدم
              توفر قراءة مكتملة. تظهر البيانات القديمة
              بشكل منفصل، ولا تعتبر الألوان توقعات
              مؤكدة أو نسباً لاحتمال نجاح الصفقة.
            </p>

            <p className="mt-3 text-xs leading-7 text-slate-500">
              يتم تقييم كل زوج وفريم وفق محرك المؤشرات
              الفنية نفسه، وقد تختلف النتائج بين
              الفريمات بسبب تغير بيانات الشموع.
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
    Broker Alarab — Unified Responsive Design
    Max width: 1520px
    Uses existing featuredBrokers state
============================================================ */}

<section
  id="forex-technical-analysis-guide"
  aria-labelledby="forex-guide-heading"
  className="border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
>
  <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

    <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

      {/* ================= NAVY HEADER ================= */}

      <div
        className="px-4 py-4 text-white sm:px-7 sm:py-5"
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
              كيف تقرأ التحليل الفني
              <span className="text-[#64c7ff]">
                {" "}للعملات والذهب؟
              </span>
            </h2>

            <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
              تعرف على اتجاه الأسواق والأطر الزمنية والمؤشرات
              الفنية، وكيفية قراءة تصنيفات الشراء والبيع
              وقوة الاتجاه دون اعتبارها توصيات تداول.
            </p>
          </div>

          <a
            href="#technical-overview"
            className="hidden min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[11px] font-black text-white transition hover:bg-white/20 lg:inline-flex"
          >
            جرّب التحليل التفاعلي
            <ArrowLeft size={14} />
          </a>

        </div>
      </div>

      {/* ================= EDUCATIONAL CONTENT ================= */}

      <div className="p-3 sm:p-5">

        <div className="grid gap-2.5 md:grid-cols-3">

          {[
            {
              title: "كيف نحدد اتجاه العملات؟",
              description:
                "تساعد المتوسطات المتحركة ومؤشرات الاتجاه على وصف ميل السوق للصعود أو الهبوط أو الحركة العرضية. تعكس التصنيفات قراءة المحرك وقت الحساب.",
              icon: TrendingUp,
              href: "#scanner",
              link: "استكشف اتجاه العملات",
            },
            {
              title: "لماذا تختلف نتائج الفريمات؟",
              description:
                "قد تظهر إشارة شراء على إطار قصير وإشارة بيع على الإطار اليومي. تساعد مقارنة الفريمات السبعة على فهم الاتجاه والسياق الزمني.",
              icon: Layers3,
              href: "#market-heatmap",
              link: "قارن الفريمات السبعة",
            },
            {
              title: "كيف نقرأ المؤشرات الفنية؟",
              description:
                "يقيس RSI الزخم، ويساعد MACD على دراسة الزخم، ويقيس ADX قوة الاتجاه وATR التذبذب. اتفاق المؤشرات لا يضمن نجاح الصفقة.",
              icon: Activity,
              href: "#technical-overview",
              link: "شاهد المؤشرات الفنية",
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
                  <ArrowLeft size={13} />
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
                كيف نفسر إشارات الشراء والبيع وقوة الاتجاه؟
              </h3>
            </div>

            <p className="mt-1.5 text-[11px] leading-6 text-slate-500">
              اقرأ تصنيف الاتجاه مع قوة مؤشر ADX والإطار الزمني
              ووقت آخر تحديث، وليس كل مؤشر بشكل منفصل.
            </p>
          </div>

          <div className="grid gap-px bg-slate-200 md:grid-cols-3">

            {[
              {
                label: "شراء قوي",
                title: "توافق المؤشرات الصعودية",
                text:
                  "يعكس غلبة القراءات الفنية الصعودية على الإطار المختار، ولا يعني ضمان استمرار الارتفاع.",
                color: "bg-emerald-50 text-emerald-700",
              },
              {
                label: "بيع قوي",
                title: "توافق المؤشرات الهبوطية",
                text:
                  "يعكس غلبة القراءات الفنية الهابطة وقت الحساب، ولا يعتبر توصية بالدخول في صفقة بيع.",
                color: "bg-rose-50 text-rose-700",
              },
              {
                label: "ADX",
                title: "قوة الاتجاه لا تحدد اتجاهه",
                text:
                  "يقيس قوة الاتجاه بغض النظر عن اتجاه السعر. القراءة المرتفعة وحدها ليست إشارة شراء أو بيع.",
                color: "bg-indigo-50 text-indigo-700",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="bg-white px-4 py-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-2 py-1 text-[10px] font-black ${item.color}`}>
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
                مثال:
              </strong>{" "}
              قد تكون قراءة ADX مرتفعة بينما تصنيف الاتجاه
              محايد، لأن قوة الاتجاه لا تعني اتفاق المؤشرات
              على صعود السعر أو هبوطه.
            </p>

            <a
              href="#scanner"
              className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline"
            >
              طبّق على الماسح
              <ArrowLeft size={13} />
            </a>

          </div>

        </div>

        {/* ================= TECHNICAL VS FUNDAMENTAL ================= */}

        <div className="mt-3 flex flex-col gap-2 rounded-lg bg-[#f4f7fc] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

          <p className="min-w-0 text-[11px] leading-6 text-slate-600">
            <strong className="text-[#10233f]">
              التحليل الفني مقابل التحليل الأساسي:
            </strong>{" "}
            الفني يدرس حركة الأسعار والمؤشرات، والأساسي يدرس
            تأثير قرارات الفائدة والبيانات الاقتصادية.
            الجمع بينهما يساعد على فهم سياق الأسواق.
          </p>

          <Link
            href="/interest-rates"
            className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline"
          >
            متابعة أسعار الفائدة
            <ArrowLeft size={13} />
          </Link>

        </div>

      </div>

      {/* ====================================================
          FEATURED BROKERS — RESPONSIVE LOGO GRID
          Existing Supabase broker records
      ==================================================== */}

      <div className="border-t border-[#cbd9ed] bg-[#f8faff] px-3 py-4 sm:px-5 sm:py-5">

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-blue-700" />

              <h3 className="text-[15px] font-black text-[#10233f] sm:text-[17px]">
                قارن شركات التداول قبل فتح حساب
              </h3>
            </div>

            <p className="mt-1 text-[11px] leading-6 text-slate-500">
              استكشف الحسابات والرسوم ومنصات التداول
              والتراخيص لدى الوسطاء المختارين.
            </p>
          </div>

          <Link
            href="/best-brokers"
            className="inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-black text-blue-700 hover:underline"
          >
            مقارنة جميع الوسطاء
            <ArrowLeft size={13} />
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
              href="/best-brokers"
              className="text-xs font-black text-blue-700"
            >
              استكشف مراجعات شركات التداول
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
                "/best-brokers";

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

                  

{/* BROKER LOGO — VISUALLY ENLARGED */}

<Link
  href={reviewUrl}
  aria-label={`تقييم شركة ${broker.name}`}
  className="flex h-[46px] w-full items-center justify-center overflow-hidden"
>
  {logoPath ? (
    <img
      src={logoPath}
      alt={`شعار ${broker.name}`}
      loading="lazy"
      className={
  broker.id === 25
    ? "block !h-[40px] !w-[165px] !max-w-[165px] !scale-100 object-contain"
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
  تقييم شركة {broker.name}
  <ArrowLeft size={12} className="shrink-0" />
</Link>


                </article>
              );
            })}

          </div>

        )}

      </div>

      {/* ================= DISCLOSURE ================= */}

      <div className="border-t border-slate-100 bg-white px-4 py-2.5 sm:px-5">
        <p className="text-[10px] leading-5 text-slate-500">
          عرض ترويجي لوسطاء مختارين. الاختيار مستقل عن نتائج
          التحليل الفني، وقد تتضمن صفحات التقييم روابط إحالة.
          التداول ينطوي على مخاطر ويجب مراجعة التراخيص والشروط.
        </p>
      </div>

    </div>

  </div>
</section>



{/* ============================================================
    06 — TWO MARKET TECHNICAL COMPARISON LAB
    Broker Alarab | Interactive | Arabic | 1520px
    Existing Supabase rows — no additional requests
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
    STRONG_BUY: "شراء قوي",
    BUY_BIAS: "ميل للشراء",
    MIXED: "محايد",
    SELL_BIAS: "ميل للبيع",
    STRONG_SELL: "بيع قوي",
    DATA_INCOMPLETE: "غير متاح",
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
    ? "لا تتوفر بيانات مكتملة للسوقين على الفريم المحدد."
    : !firstData.fresh || !secondData.fresh
    ? "تتوفر قراءات تاريخية، لكنها ليست حديثة."
    : firstSide === secondSide && firstSide !== "unknown"
    ? "يتفق الاتجاه العام للمؤشرات بين السوقين على هذا الفريم."
    : "تختلف قراءة الاتجاه الفني بين السوقين على هذا الفريم.";

  // Compare all seven frames using the same engine classifications.
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
      aria-labelledby="market-comparison-heading"
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* ==========================================
              UNIFIED NAVY HEADER
          ========================================== */}

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
                  <ArrowLeft size={14} />
                  MARKET COMPARISON
                </div>

                <h2
                  id="market-comparison-heading"
                  className="text-[20px] font-black leading-[1.4] text-white sm:text-[27px]"
                >
                  مقارنة التحليل الفني
                  <span className="text-[#64c7ff]">
                    {" "}للأصول المالية
                  </span>
                </h2>

                <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
                  قارن الذهب والفضة وأزواج العملات،
                  واكتشف اختلاف الاتجاه الفني وقوة
                  المؤشرات عبر سبعة أطر زمنية.
                </p>

              </div>

              <span className="hidden shrink-0 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-bold text-blue-100 lg:inline-flex">
                <Clock3 size={14} />
                بيانات دورية
              </span>

            </div>
          </div>

          {/* ==========================================
              ASSET SELECTORS
          ========================================== */}

          <div className="border-b border-[#dce6f4] bg-[#f8faff] p-3 sm:p-5">

            <div className="grid grid-cols-2 gap-2 sm:gap-3">

              {[
                {
                  id: "compare-first-market",
                  label: "الأصل الأول",
                  value: compareFirst,
                  setter: setCompareFirst,
                },
                {
                  id: "compare-second-market",
                  label: "الأصل الثاني",
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
                    onChange={(event) => field.setter(event.target.value)}
                    className="h-11 w-full min-w-0 rounded-lg border border-[#cbd9ed] bg-white px-2 text-[10px] font-bold text-[#10233f] outline-none focus:border-blue-500 sm:h-12 sm:px-3 sm:text-xs"
                  >
                    <optgroup label="الذهب والفضة">
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

                    <optgroup label="أزواج العملات">
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
                تبديل الأصلين
              </button>

              <span className="text-[10px] text-slate-500">
                اختر سوقين للمقارنة
              </span>

            </div>

          </div>

          {/* ==========================================
              SHARED TIMEFRAME
          ========================================== */}

          <div className="border-b border-slate-200 bg-white px-3 py-3 sm:px-5">

            <div className="mb-2 flex items-center justify-between gap-2">

              <h3 className="text-[12px] font-black text-[#10233f]">
                الإطار الزمني
              </h3>

              <span className="text-[10px] text-slate-500">
                {timeframe}
              </span>

            </div>

            <div
              dir="ltr"
              className="grid grid-cols-7 gap-1.5"
              role="group"
              aria-label="الإطار الزمني للمقارنة"
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

          {/* ==========================================
              COMPACT COMPARISON CARDS
              Two columns on desktop
              Two compact cards on mobile
          ========================================== */}

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

                  <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-right">

                    <div className="min-w-0 text-center sm:text-right">

                      <h3
                        dir="ltr"
                        className="text-center text-[15px] font-black text-[#10233f] sm:text-right sm:text-[23px]"
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
                      {labels[data.direction] || "غير متاح"}
                    </span>

                  </div>

                </div>

                {/* PRICE */}

                <div className="px-2.5 py-2 text-center sm:px-5 sm:py-3 sm:text-right">

                  <p className="text-[10px] font-semibold text-slate-500">
                    آخر إغلاق M5
                  </p>

                  <p
  dir="ltr"
  className="mt-1 text-center text-[17px] font-black tabular-nums text-[#10233f] sm:text-right sm:text-[25px]"
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
                      ? "غير متاح"
                      : data.fresh
                      ? "حديث"
                      : "تاريخي"}
                  </span>

                </div>

                {/* VOTES */}

                <div className="mt-auto grid grid-cols-3 gap-1 px-2 pb-3 sm:gap-2 sm:px-5 sm:pb-4">

                  {[
                    {
                      label: "شراء",
                      value: data.buy,
                      color: "bg-emerald-50 text-emerald-700",
                    },
                    {
                      label: "محايد",
                      value: data.neutral,
                      color: "bg-slate-100 text-slate-700",
                    },
                    {
                      label: "بيع",
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

<div className="border-t border-slate-100 px-2.5 py-2.5 text-center sm:px-5 sm:text-right">

                  <p className="hidden text-[10px] text-slate-400 sm:block">
                    آخر حساب: {dateText(data.row?.calculated_at_utc)}
                  </p>

                 <Link
  href={`/technical-analysis/${instrument.slug}`}
  className="inline-flex items-center justify-center gap-1 text-[10px] font-black text-blue-700 hover:underline sm:mt-2 sm:text-xs"
>
  التحليل التفصيلي
  <ArrowLeft size={12} />
</Link>

                </div>

              </article>

            ))}

          </div>

          {/* ==========================================
              MULTI-TIMEFRAME AGREEMENT
          ========================================== */}

          <div className="border-t border-[#dce6f4] bg-white px-3 py-4 sm:px-5 sm:py-5">

            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

              <div>
                <h3 className="text-[14px] font-black text-[#10233f] sm:text-[17px]">
                  توافق الاتجاه عبر الفريمات
                </h3>

                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  مقارنة تصنيفات الأصلين على سبعة أطر زمنية.
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-blue-700">
                {agreementCount} من {comparableCount} متفق
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
                      ? "غير متاح"
                      : item.sameSide
                      ? "متفق"
                      : "مختلف"}
                  </p>

                </button>

              ))}

            </div>

            <p className="mt-3 text-[10px] leading-6 text-slate-500 sm:text-[11px]">
              {comparisonMessage} الاتفاق في التصنيف الفني
              لا يعني وجود ارتباط سعري مثبت أو فرصة تداول مضمونة.
            </p>

          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-[#f8faff] px-3 py-3 sm:px-5">

            <p className="text-[10px] leading-5 text-slate-500">
              التحليلات دورية وتستند إلى بيانات تاريخية.
            </p>

            <a
              href="#market-heatmap"
              className="inline-flex items-center gap-1 text-[11px] font-black text-blue-700 hover:underline"
            >
              خريطة جميع الأسواق
              <ArrowLeft size={13} />
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
    Broker Alarab
    RIGHT ALIGNED | SINGLE COLUMN | COMPACT | SEO
    Replace all previous FAQ versions with this section
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
      title: "تحليل الذهب وأزواج العملات",
      items: [
        {
          question:
            "أين أجد التحليل الفني للذهب اليوم مع مستويات الدعم والمقاومة؟",
          answer:
            "يمكن متابعة القراءة الفنية للذهب XAU/USD عبر مركز التحليل الفني في بروكر العرب، الذي يعرض اتجاه المؤشرات على عدة فريمات. كما يتيح قسم مناطق الذهب الاطلاع على مستويات الدعم والمقاومة والسعر المرجعي المسجل ووقت إعداد التقرير. ينبغي مراجعة تاريخ آخر حساب؛ لأن هذه النتائج لقطات تحليلية وليست أسعاراً لحظية.",
          href: "#gold-support-resistance",
          linkText: "عرض مناطق دعم ومقاومة الذهب",
        },
        {
          question:
            "كيف أعرف اتجاه زوج EUR/USD: شراء أم بيع أم حياد؟",
          answer:
            "ابدأ باختيار اليورو مقابل الدولار الأمريكي EUR/USD في الماسح الفني، ثم حدد الفريم المطلوب. راقب التصنيف الإجمالي وقراءات المتوسطات المتحركة ومؤشرات الزخم وقوة الاتجاه. إذا اختلفت النتائج بين المؤشرات أو الفريمات، فهذا يعكس عدم توافق القراءة الفنية ولا يعني وجود إشارة مؤكدة للدخول.",
          href: "#scanner",
          linkText: "تحليل اليورو مقابل الدولار",
        },
        {
          question:
            "هل التحليل الفني للذهب يختلف عن تحليل أزواج الفوركس؟",
          answer:
            "يمكن استخدام المؤشرات نفسها على الذهب وأزواج العملات، لكن سلوك السعر والتقلب والسيولة والعوامل الاقتصادية تختلف. يتأثر الذهب بالدولار والعوائد الحقيقية والتوقعات الاقتصادية، بينما تتأثر أزواج العملات بالفروق بين السياسات النقدية والبيانات الاقتصادية للدول المرتبطة بها. لذلك لا ينبغي تطبيق حدود المخاطرة نفسها على جميع الأدوات.",
          href: "#central-bank-interest-rates",
          linkText: "قرارات الفائدة وتأثيرها على الأسواق",
        },
      ],
    },
    {
      title: "المؤشرات الفنية وإشارات التداول",
      items: [
        {
          question:
            "ماذا تعني إشارة شراء قوي أو بيع قوي في التحليل الفني؟",
          answer:
            "تشير عبارة شراء قوي أو بيع قوي إلى أن شروط عدد من المؤشرات الفنية تتوافق باتجاه معين وفق قواعد محرك التحليل والفريم المحدد. لا تعبّر الإشارة عن احتمال نجاح الصفقة بنسبة مئوية، ولا تضمن استمرار الاتجاه. يجب النظر أيضاً إلى السعر المرجعي ووقت الحساب والفريم وحالة اكتمال البيانات.",
          href: "#technical-overview",
          linkText: "فهم تصنيفات المؤشرات الفنية",
        },
        {
          question:
            "ما الفرق بين RSI وMACD وADX عند تحليل العملات؟",
          answer:
            "يقيس RSI الزخم النسبي وتحولات قوته، ويستخدم MACD لدراسة العلاقة بين متوسطات متحركة واتجاه الزخم، بينما يقيس ADX قوة الاتجاه دون أن يحدد اتجاهه وحده. لذلك يمكن أن تظهر قراءات مختلفة لهذه المؤشرات في السوق نفسه، وتُقرأ نتائجها مع حركة السعر بدلاً من الاعتماد على مؤشر منفرد.",
          href: "#technical-overview",
          linkText: "استعرض قراءات المؤشرات",
        },
        {
          question:
            "لماذا يعطي مؤشر RSI إشارة شراء بينما يشير MACD إلى البيع؟",
          answer:
            "يستخدم كل مؤشر طريقة حساب وفترات زمنية مختلفة، ولذلك قد يستجيب أحدهما لتغير الزخم قبل الآخر. ويمكن أن تظهر الإشارات المتعارضة خلال التصحيحات أو التحركات العرضية أو المراحل الانتقالية للاتجاه. لا يصح اعتبار أحد المؤشرين خاطئاً تلقائياً؛ الأفضل دراسة موضع السعر وقوة الاتجاه وقراءات الفريمات الأخرى.",
          href: "#market-heatmap",
          linkText: "مقارنة الاتجاهات عبر الفريمات",
        },
      ],
    },
    {
      title: "الدعم والمقاومة والمستويات المحورية",
      items: [
        {
          question:
            "كيف أحدد أقرب منطقة دعم ومقاومة للذهب من السعر الحالي؟",
          answer:
            "تُقارن مناطق الدعم والمقاومة بالسعر المرجعي المسجل في وقت التحليل. المنطقة التي تقع أسفل السعر قد تمثل دعماً فنياً وفق تصنيف المحرك، والمنطقة التي تقع أعلاه قد تمثل مقاومة. وتُحسب المسافة السعرية بين المنطقة والسعر المرجعي، مع الانتباه إلى أن موقع المنطقة ودورها قد يتغيران عند الاختراق أو تغير البيانات.",
          href: "#gold-support-resistance",
          linkText: "مقارنة مناطق الذهب بالسعر المرجعي",
        },
        {
          question:
            "ما الفرق بين Pivot وSupport وResistance وRole Flip؟",
          answer:
            "يشير Pivot إلى نقطة أو منطقة انعطاف سعرية محتملة تُستخرج وفق منهجية الحساب المستخدمة. أما Support وResistance فهما منطقتا دعم ومقاومة. ويعني Role Flip أن مستوى أدى دور المقاومة سابقاً قد يصبح منطقة دعم بعد الاختراق وإعادة الاختبار، أو العكس. ولا يُعد تبادل الأدوار مؤكداً لمجرد عبور السعر للمستوى.",
          href: "#gold-support-resistance",
          linkText: "استكشف المستويات المحورية للذهب",
        },
        {
          question:
            "كيف أميز الاختراق الحقيقي لمستوى المقاومة عن الاختراق الكاذب؟",
          answer:
            "لا توجد قاعدة تضمن التمييز بين الاختراق الحقيقي والكاذب. يمكن دراسة إغلاق الشموع خارج المنطقة، وسلوك السعر عند إعادة الاختبار، والزخم وقوة الاتجاه، ومدى توافق الفريمات. وقد يعود السعر داخل المنطقة حتى بعد تحقق بعض هذه الشروط، لذلك يجب التعامل معها كدلائل فنية لا كتأكيد على نجاح الاختراق.",
          href: "#gold-support-resistance",
          linkText: "مراجعة مناطق التفاعل السعري",
        },
      ],
    },
    {
      title: "الفريمات وتحديث بيانات التحليل",
      items: [
        {
          question:
            "ما أفضل فريم للتحليل الفني: 15 دقيقة أم ساعة أم 4 ساعات أم يومي؟",
          answer:
            "لا يوجد فريم أفضل لجميع المتداولين أو الأصول. تعكس الفريمات القصيرة تقلبات وتغيرات أسرع، بينما توفر فريمات الأربع ساعات واليومي سياقاً أوسع للاتجاه. تساعد مقارنة M15 وH1 وH4 وD1 على اكتشاف التوافق أو التعارض، لكن اختيار الفريم يجب أن يتناسب مع مدة الاحتفاظ بالمركز وطريقة إدارة المخاطر.",
          href: "#market-heatmap",
          linkText: "قارن الفريمات الفنية السبعة",
        },
        {
          question:
            "لماذا تختلف إشارة الذهب على فريم الساعة عن الفريم اليومي؟",
          answer:
            "يستخدم كل فريم مجموعة مختلفة من الشموع التاريخية، ما يؤثر في قيم المتوسطات المتحركة ومؤشرات الزخم والاتجاه. فقد يحدث صعود قصير داخل اتجاه يومي هابط. لذلك لا يُعد اختلاف الإشارات خطأً في حد ذاته، بل قد يعكس اختلاف نطاق الحركة الذي يقيسه كل فريم.",
          href: "#market-comparison-lab",
          linkText: "جرّب مقارنة التحليل الفني",
        },
        {
          question:
            "هل التحليل الفني المعروض مباشر؟ ومتى يتم تحديث الإشارات؟",
          answer:
            "يعرض بروكر العرب لقطات تحليلية دورية محسوبة من بيانات الشموع السعرية المتاحة، ولا ينبغي اعتبارها بثاً مباشراً لأسعار التنفيذ. يظهر وقت الحساب وحالة البيانات عند توفرها. وإذا كانت القراءة قديمة أو غير مكتملة، فقد لا تعكس ظروف السوق الحالية؛ لذا راجع وقت التحديث قبل تفسير أي إشارة.",
          href: "#technical-analysis-methodology",
          linkText: "اطلع على حالة البيانات ومنهجية التحليل",
        },
      ],
    },
  ];

  // Render English market symbols in LTR without changing Arabic flow.
  const renderText = (value: string) => {
    const expression =
      /(XAU\/USD|EUR\/USD|Role Flip|Support|Resistance|Pivot|RSI|MACD|ADX|M15|H1|H4|D1)/g;

    return value.split(expression).map((part, index) =>
      /^(XAU\/USD|EUR\/USD|Role Flip|Support|Resistance|Pivot|RSI|MACD|ADX|M15|H1|H4|D1)$/.test(
        part
      ) ? (
        <bdi key={index} dir="ltr" className="font-semibold">
          {part}
        </bdi>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  
  return (
    <section
      id="technical-analysis-faq"
      aria-labelledby="technical-faq-heading"
      dir="rtl"
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* ============================================
            MAIN FAQ CARD
        ============================================ */}

        <div className="w-full overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* ============================================
              UNIFIED NAVY HEADER
          ============================================ */}

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
              الأسئلة الشائعة حول
              <span className="text-[#64c7ff]">
                {" "}التحليل الفني للذهب والعملات
              </span>
            </h2>

            <p className="mt-2 max-w-[950px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
              إجابات عن تحليل الذهب وأزواج العملات،
              وإشارات المؤشرات الفنية، ومستويات الدعم
              والمقاومة، والأطر الزمنية وتحديث البيانات.
            </p>
          </header>

          {/* ============================================
              FAQ GROUPS
          ============================================ */}

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
                      {group.items.length} أسئلة
                    </span>

                  </div>

                  {/* QUESTION LIST */}

                  <div className="divide-y divide-[#e8eef7]">

                    {group.items.map((item) => (

                      <details
                        key={item.question}
                        className="group"
                      >

                        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-right transition hover:bg-[#f8fbff] sm:min-h-12 sm:px-5 [&::-webkit-details-marker]:hidden">

                          <span className="min-w-0 flex-1 text-[12px] font-bold leading-6 text-[#10233f] group-open:text-blue-700 sm:text-[13px]">
                            {renderText(item.question)}
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
                            {renderText(item.answer)}
                          </p>

                          <a
                            href={item.href}
                            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-black text-blue-700 hover:underline"
                          >
                            {item.linkText}
                            <ArrowLeft size={13} />
                          </a>

                        </div>

                      </details>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ============================================
              COMPACT CTA — INSIDE SAME SECTION
          ============================================ */}

          <div className="flex flex-col gap-3 border-t border-[#dce6f4] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">

            <div className="min-w-0">

              <h3 className="text-[12px] font-black text-[#10233f] sm:text-[14px]">
                تبحث عن تحليل فني لأداة محددة؟
              </h3>

              <p className="mt-1 text-[11px] leading-6 text-slate-600 sm:text-[12px]">
                اختر الذهب أو الفضة أو أحد أزواج العملات
                من الماسح الفني، وقارن تصنيفات الاتجاه
                عبر الأطر الزمنية المختلفة.
              </p>

            </div>

            <a
              href="#scanner"
              className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-blue-600 px-4 py-2 text-[11px] font-black text-white transition hover:bg-blue-700"
            >
              تصفح التحليل الفني
              <ArrowLeft size={14} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );

})()}

{/* ============================================================
    09 — TECHNICAL ANALYSIS METHODOLOGY & DATA TRANSPARENCY
    Broker Alarab | Dynamic monitoring | Arabic | 1520px
    Uses existing `rows` and `lastChecked`
============================================================ */}

{(() => {
  const TOTAL_EXPECTED =
    INSTRUMENTS.length * TIMEFRAMES.length;

  const parseTimestamp = (value: unknown): number | null => {
    if (typeof value !== "string" || !value.trim()) return null;

    const ms = Date.parse(value);
    return Number.isFinite(ms) ? ms : null;
  };

  // Do not assume the dataset is complete or that all rows are unique.
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

  const staleRows = completedRows.length - freshRows.length;

  const lastCalculation = validRows.reduce<number | null>(
    (latest, row) => {
      const timestamp = parseTimestamp(row.calculated_at_utc);

      if (timestamp === null) return latest;

      return latest === null
        ? timestamp
        : Math.max(latest, timestamp);
    },
    null
  );

  const formatLastCalculation = (timestamp: number | null) => {
    if (timestamp === null) return "غير متاح";

    return new Intl.DateTimeFormat("ar", {
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
      ? Math.round((completedRows.length / TOTAL_EXPECTED) * 100)
      : 0;

  const allFresh =
    completedRows.length === TOTAL_EXPECTED &&
    staleRows === 0;

  const latestDataStatus = loading
    ? "جارٍ تحميل البيانات"
    : loadError
    ? "تعذر تحديث البيانات"
    : validRows.length === 0
    ? "بيانات غير متاحة"
    : allFresh
    ? "القراءات مكتملة وحديثة"
    : staleRows > 0
    ? "بعض القراءات تحتاج تحديثاً"
    : "التغطية غير مكتملة";

  
  return (
    <section
      id="technical-analysis-methodology"
      aria-labelledby="technical-methodology-title"
      className="scroll-mt-20 border-b border-slate-200 bg-[#f3f6fb] py-3 sm:py-6"
    >
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10">

        <div className="overflow-hidden border border-[#cbd9ed] bg-white shadow-[0_14px_40px_-28px_rgba(15,42,84,0.20)]">

          {/* ============================================
              UNIFIED NAVY HEADER
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
                  <ShieldCheck size={15} />
                  DATA METHODOLOGY & TRANSPARENCY
                </div>

                <h2
                  id="technical-methodology-title"
                  className="text-[20px] font-black leading-[1.45] text-white sm:text-[27px]"
                >
                  منهجية التحليل الفني
                  <span className="text-[#64c7ff]">
                    {" "}وشفافية البيانات
                  </span>
                </h2>

                <p className="mt-2 max-w-[900px] text-[11px] leading-6 text-blue-100 sm:text-[12px] sm:leading-7">
                  تعرف على مصدر بيانات الأسعار وطريقة حساب
                  المؤشرات الفنية، ومدى اكتمال التحليلات
                  وحداثتها وحدود الاعتماد على نتائجها.
                </p>

              </div>

              {/* DATA STATUS */}

              <div
                className={`inline-flex max-w-full shrink-0 items-center gap-2 self-start rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-black text-white sm:text-[11px]`}
              >
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
          ============================================ */}

          <div className="grid grid-cols-2 gap-px bg-[#dce6f4] lg:grid-cols-4">

            {[
              {
                label: "الأصول المالية",
                value: INSTRUMENTS.length.toString(),
                note: "ذهب وفضة وأزواج عملات",
              },
              {
                label: "الأطر الزمنية",
                value: TIMEFRAMES.length.toString(),
                note: "M5 إلى W1",
              },
              {
                label: "القراءات المكتملة",
                value: `${completedRows.length} / ${TOTAL_EXPECTED}`,
                note: "بحالة READY",
              },
              {
                label: "آخر حساب مسجل",
                value: formatLastCalculation(lastCalculation),
                note: "التوقيت العالمي UTC",
              },
            ].map((stat) => (

              <div
                key={stat.label}
                className="flex min-h-[90px] min-w-0 flex-col justify-center bg-white px-3 py-3 sm:min-h-[110px] sm:px-5 sm:py-4"
              >

                <p className="text-[10px] font-bold text-slate-500 sm:text-[11px]">
                  {stat.label}
                </p>

                <p
                  className={`mt-1.5 font-black text-[#10233f] ${
                    stat.label === "آخر حساب مسجل"
                      ? "text-[11px] leading-5 sm:text-[13px] sm:leading-6"
                      : stat.label === "القراءات المكتملة"
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
              COMPLETENESS INDICATOR
          ============================================ */}

          <div className="border-b border-slate-200 bg-[#f8faff] px-3 py-3 sm:px-6 sm:py-4">

            <div className="mb-2 flex items-center justify-between gap-2">

              <h3 className="text-[12px] font-black text-[#10233f] sm:text-[14px]">
                اكتمال تغطية التحليل الفني
              </h3>

              <span className="text-[15px] font-black tabular-nums text-blue-700 sm:text-[18px]">
                {completeness}%
              </span>

            </div>

            <div
              role="progressbar"
              aria-label="نسبة اكتمال التحليلات"
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
                مكتملة وحديثة
              </span>

              <span>
                <strong className="text-amber-700">
                  {staleRows}
                </strong>{" "}
                مكتملة غير حديثة
              </span>

              <span>
                <strong className="text-slate-700">
                  {incompleteRows.length}
                </strong>{" "}
                غير مكتملة
              </span>

              <span>
                <strong className="text-rose-700">
                  {missingRows}
                </strong>{" "}
                غير موجودة
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
                title: "مصدر بيانات الأسعار",
                description:
                  "تُستخدم بيانات الشموع التاريخية المستخرجة من MT5 لحساب المؤشرات عند إغلاق الشموع، وفق الأطر الزمنية المدعومة. الأسعار المعروضة مرجعية وليست بالضرورة أسعار تنفيذ فورية.",
              },
              {
                icon: <Activity size={18} />,
                title: "احتساب المؤشرات الفنية",
                description:
                  "يجمع المحرك مؤشرات المتوسطات المتحركة وSupertrend وIchimoku وRSI وMACD وADX وغيرها. ويستخدم ATR لوصف التذبذب، وليس كتصويت مستقل على الشراء أو البيع.",
              },
              {
                icon: <Clock3 size={18} />,
                title: "تحديث البيانات واكتمالها",
                description:
                  "تعكس حالة كل قراءة مدى توفر البيانات ووقت آخر شمعة مكتملة. وقد تكون بعض الأطر الزمنية غير مكتملة عندما لا تتوفر شموع كافية لحساب المؤشرات طويلة المدى.",
              },
              {
                icon: <ShieldCheck size={18} />,
                title: "كيفية تفسير الإشارات",
                description:
                  "تعكس تصنيفات شراء قوي أو بيع قوي أو محايد توافق شروط المؤشرات ضمن المحرك وقت الحساب. ولا تمثل نسبة نجاح متوقعة أو ضماناً لاتجاه السعر المستقبلي.",
              },
            ].map((item) => (

              <article
                key={item.title}
                className="flex min-w-0 items-start gap-3 bg-white px-5 py-5"
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
              Closed by default
          ============================================ */}

          <div className="divide-y divide-slate-200 bg-white md:hidden">

            {[
              {
                title: "مصدر بيانات الأسعار",
                text:
                  "يعتمد المحرك على الشموع التاريخية من منصة MT5 لحساب المؤشرات عند إغلاق الشموع. الأسعار مرجعية وليست أسعار تنفيذ لحظية.",
              },
              {
                title: "كيفية احتساب المؤشرات",
                text:
                  "تُستخدم مجموعات من المؤشرات مثل RSI وMACD وADX والمتوسطات المتحركة وSupertrend وIchimoku، بينما يستخدم ATR لقياس التذبذب.",
              },
              {
                title: "تحديث البيانات واكتمالها",
                text:
                  "قد تكون بعض القراءات غير حديثة أو غير مكتملة بسبب وقت الحساب أو عدم توفر عدد كافٍ من الشموع التاريخية.",
              },
              {
                title: "كيفية تفسير الإشارات",
                text:
                  "شراء قوي وبيع قوي تصنيفات وصفية لمدى اتفاق المؤشرات، وليست تنبؤات مؤكدة أو توصيات تداول.",
              },
            ].map((item) => (

              <details
                key={item.title}
                className="group px-3 py-1"
              >

                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 [&::-webkit-details-marker]:hidden">

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
    Desktop: Full text
    Mobile: Compact and expandable
============================================ */}

<div className="border-t border-[#dce6f4] bg-[#f8faff] px-3 py-3 sm:px-6 sm:py-5">

  {/* DESKTOP DISCLAIMER */}

  <div className="hidden items-start gap-3 md:flex">

    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
      <Info size={18} />
    </span>

    <div className="min-w-0">

      <h3 className="text-[15px] font-black text-[#10233f]">
        إخلاء المسؤولية ومخاطر التداول
      </h3>

      <p className="mt-2 text-[12px] leading-7 text-slate-600">
        جميع الأسعار والمؤشرات والتصنيفات الفنية المعروضة في
        بروكر العرب مقدمة لأغراض معلوماتية وتعليمية عامة فقط،
        ولا تشكل نصيحة استثمارية شخصية أو توصية بشراء أو بيع
        أي أصل مالي.

        {" "}تعتمد النتائج على بيانات تاريخية وحسابات آلية،
        وقد تتأخر أو تصبح غير حديثة أو تختلف عن الأسعار
        المتاحة لدى الوسطاء. الأداء التاريخي واتفاق المؤشرات
        لا يضمنان النتائج المستقبلية.

        {" "}ينطوي تداول الفوركس والذهب وعقود الفروقات،
        خصوصاً باستخدام الرافعة المالية، على مخاطر مرتفعة
        قد تؤدي إلى خسارة رأس المال. ينبغي تقييم المخاطر
        والظروف الشخصية والتحقق من البيانات قبل اتخاذ
        أي قرار تداول.
      </p>

    </div>

  </div>

  {/* MOBILE DISCLAIMER */}

  <details className="group md:hidden">

    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">

      <div className="flex min-w-0 items-center gap-2">

        <Info size={17} className="shrink-0 text-blue-700" />

        <span className="text-[12px] font-black text-[#10233f]">
          إخلاء المسؤولية ومخاطر التداول
        </span>

      </div>

      <ChevronDown
        size={16}
        className="shrink-0 text-blue-700 transition-transform group-open:rotate-180"
      />

    </summary>

    {/* ALWAYS VISIBLE SHORT WARNING */}

    <p className="mt-2 text-[11px] leading-6 text-slate-600">
      التحليلات لأغراض تعليمية ومعلوماتية فقط،
      وليست توصيات تداول. التداول بالرافعة المالية
      ينطوي على مخاطر مرتفعة قد تؤدي إلى خسارة رأس المال.
    </p>

    {/* EXPANDED FULL DISCLAIMER */}

    <div className="mt-3 border-t border-slate-200 pt-3">

      <p className="text-[11px] leading-6 text-slate-600">
        تعتمد البيانات والمؤشرات على حسابات آلية
        وبيانات تاريخية، وقد تتأخر أو تصبح غير حديثة
        أو تختلف عن الأسعار المتاحة لدى الوسطاء.

        {" "}تصنيفات الشراء والبيع تعكس قراءة المؤشرات
        وقت الحساب، ولا تضمن نجاح أي صفقة
        أو استمرار اتجاه السوق.

        {" "}قد يؤدي تداول الفوركس والذهب وعقود الفروقات،
        خصوصاً باستخدام الرافعة المالية، إلى خسارة
        رأس المال. يجب مراجعة البيانات والشروط
        وتقييم المخاطر قبل اتخاذ أي قرار استثماري.
      </p>

    </div>

  </details>

</div>


          

          {/* ============================================
              SECTION FOOTER
          ============================================ */}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-3 py-3 sm:px-6">

            <span className="text-[10px] leading-5 text-slate-500">
              البيانات دورية وليست بثاً سعرياً لحظياً.
            </span>

            <a
              href="#scanner"
              className="inline-flex items-center gap-1.5 text-[11px] font-black text-blue-700 hover:underline"
            >
              العودة إلى الماسح الفني
              <ArrowLeft size={13} />
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
