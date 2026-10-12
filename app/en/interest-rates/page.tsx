
import type { Metadata } from "next";
import Link from "next/link";
import HistoryExplorer from "./HistoryExplorer";
import CalendarFilters from "./CalendarFilters";


export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE = "https://brokeralarab.com";
const PAGE = "/en/interest-rates";
const AR_PAGE = "/interest-rates";

const BANK_SLUGS = [
  "fed",
  "ecb",
  "boe",
  "boj",
  "boc",
  "rba",
  "snb",
  "rbnz",
] as const;

type Meeting = {
  id?: string;
  meeting_date?: string;
  announcement_at?: string | null;
  status?: string;
  decision_rate?: number | null;
  previous_rate?: number | null;
  change_bps?: number | null;
  decision_type?: string | null;
  effective_date?: string | null;
  verification_status?: string | null;
  reference_calendar_url?: string | null;
  decision_source_url?: string | null;
};

type History = {
  meeting_date?: string;
  decision_date?: string;
  effective_date?: string;
  date?: string;
  rate?: number | null;
  decision_rate?: number | null;
  previous_rate?: number | null;
  change_bps?: number | null;
  decision_type?: string | null;
};

type Faq = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

type Bank = {
  slug: string;

  bank_name_en: string;
  bank_short_name_en: string | null;
  country_en: string | null;

  currency_code: string | null;
  flag_emoji: string | null;
  bank_logo_url: string | null;

  current_rate: number | null;
  current_rate_lower: number | null;
  current_rate_upper: number | null;

  rate_type_en: string | null;
  comparison_rate_basis: string | null;

  previous_rate: number | null;
  last_change_bps: number | null;
  last_decision_date: string | null;

  official_website: string | null;
  official_rates_url: string | null;

  meetings: Meeting[] | null;
  rate_history: History[] | null;

  faq_en: Faq[] | null;

  hub_intro_en: string | null;
  hub_comparison_intro_en: string | null;
  hub_meetings_intro_en: string | null;
  hub_history_intro_en: string | null;
  hub_educational_content_en: string | null;

  methodology_en: string | null;
  data_disclaimer_en: string | null;

  seo_title_en: string | null;
  seo_description_en: string | null;
  seo_h1_en: string | null;
  seo_keywords_en: string[] | null;

  canonical_url_en: string | null;
  og_title_en: string | null;
  og_description_en: string | null;
  og_image_url: string | null;

  display_order: number | null;
  is_published?: boolean;
  is_hub?: boolean;
};

type EventRow = {
  bank: Bank;
  meeting: Meeting;
};

type HistoryRow = {
  date: string;
  rate: number;
  previousRate: number | null;
  changeBps: number | null;
  type: string | null;
  source: "history" | "meeting";
};

type PageSearchParams = {
  bank?: string | string[];
  year?: string | string[];
  history_bank?: string | string[];
  history_year?: string | string[];
  show_all?: string | string[];
};

type PageProps = {
  searchParams?: Promise<PageSearchParams>;
};

/* =====================================================
   BANK INFORMATION — ENGLISH
===================================================== */

const BANK_DETAILS: Record<
  string,
  {
    name: string;
    shortName: string;
    country: string;
    currency: string;
    description: string;
    calendar: string;
  }
> = {
  fed: {
    name: "Federal Reserve",
    shortName: "Federal Reserve",
    country: "United States",
    currency: "USD",
    description:
      "The Federal Reserve sets the target range for the federal funds rate. Traders closely follow FOMC decisions, economic projections and guidance on future monetary policy.",
    calendar:
      "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
  },

  ecb: {
    name: "European Central Bank",
    shortName: "ECB",
    country: "Euro Area",
    currency: "EUR",
    description:
      "The European Central Bank manages monetary policy for the euro area. Its deposit facility rate is a key benchmark monitored by currency and financial markets.",
    calendar:
      "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
  },

  boe: {
    name: "Bank of England",
    shortName: "Bank of England",
    country: "United Kingdom",
    currency: "GBP",
    description:
      "The Bank of England's Monetary Policy Committee sets Bank Rate while assessing UK inflation, wages, employment and economic activity.",
    calendar:
      "https://www.bankofengland.co.uk/monetary-policy/upcoming-mpc-dates",
  },

  boj: {
    name: "Bank of Japan",
    shortName: "Bank of Japan",
    country: "Japan",
    currency: "JPY",
    description:
      "The Bank of Japan determines monetary policy while evaluating inflation, wage growth and financial conditions, with important implications for the Japanese yen.",
    calendar:
      "https://www.boj.or.jp/en/mopo/mpmsche_minu/",
  },

  boc: {
    name: "Bank of Canada",
    shortName: "Bank of Canada",
    country: "Canada",
    currency: "CAD",
    description:
      "The Bank of Canada sets the target for the overnight rate, a major benchmark influencing borrowing costs and expectations for the Canadian dollar.",
    calendar:
      "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/",
  },

  rba: {
    name: "Reserve Bank of Australia",
    shortName: "RBA",
    country: "Australia",
    currency: "AUD",
    description:
      "The Reserve Bank of Australia sets the cash rate target, considering inflation, employment, domestic demand and broader economic conditions.",
    calendar:
      "https://www.rba.gov.au/schedules-events/board-meeting-schedules.html",
  },

  snb: {
    name: "Swiss National Bank",
    shortName: "SNB",
    country: "Switzerland",
    currency: "CHF",
    description:
      "The Swiss National Bank conducts monetary policy to maintain price stability, taking account of inflation, monetary conditions and the Swiss franc.",
    calendar:
      "https://www.snb.ch/en/services-events/digital-services/event-schedule",
  },

  rbnz: {
    name: "Reserve Bank of New Zealand",
    shortName: "RBNZ",
    country: "New Zealand",
    currency: "NZD",
    description:
      "The Reserve Bank of New Zealand sets the Official Cash Rate and publishes monetary policy assessments covering inflation, economic growth and future rate expectations.",
    calendar:
      "https://www.rbnz.govt.nz/news-and-events/events",
  },
};

/* =====================================================
   ENGLISH FAQ FALLBACK
===================================================== */

const DEFAULT_FAQS = [
  {
    q: "What are the current central bank interest rates?",
    a: "The comparison table displays published policy rates for eight major central banks, including the Federal Reserve, ECB, Bank of England, Bank of Japan, Bank of Canada, RBA, SNB and RBNZ. Each bank may use a different policy rate definition.",
  },
  {
    q: "When is the next Federal Reserve interest rate decision?",
    a: "You can find upcoming Federal Reserve decisions in the central bank meeting calendar on this page. Official FOMC calendar links are provided for verification.",
  },
  {
    q: "Do higher interest rates strengthen a currency?",
    a: "Not necessarily. Currency movements depend on how the decision compares with market expectations, the central bank's forward guidance and other economic factors.",
  },
  {
    q: "What is the difference between Fed and ECB interest rates?",
    a: "The Federal Reserve uses a target range for the federal funds rate, while the ECB publishes several key policy rates, including the deposit facility rate. These benchmarks should not be treated as identical.",
  },
  {
    q: "How do interest rates affect gold prices?",
    a: "Gold is influenced by real yields, the US dollar, inflation expectations and global risk sentiment. Higher real yields may increase the opportunity cost of holding gold, but the relationship is not fixed.",
  },
  {
    q: "Does every central bank meeting result in a rate change?",
    a: "No. Central banks can raise, cut or hold interest rates. Their statements, projections and press conferences may also move markets even when rates remain unchanged.",
  },
  {
    q: "Are central bank meeting dates for 2027 confirmed?",
    a: "Meeting dates depend on official central bank calendars and published schedules. Some dates may be provisional or subject to change, so always verify them with the relevant central bank.",
  },
  {
    q: "What does a 25 basis point interest rate change mean?",
    a: "One basis point equals 0.01 percentage points. Therefore, a 25 basis point increase or decrease represents a change of 0.25 percentage points.",
  },
];

/* =====================================================
   ENGLISH INTERNAL LINKS
===================================================== */

const INTERNAL_LINKS = [
  {
    href: "/en/learn-trading",
    title: "Learn Trading",
    description:
      "Explore trading fundamentals, financial markets and risk management.",
  },
  {
    href: "/en/best-brokers",
    title: "Best Forex Brokers",
    description:
      "Independent broker reviews and comparisons.",
  },
  {
    href: "/en/best-brokers/commodities",
    title: "Best Commodities Brokers",
    description:
      "Compare brokers offering gold and commodities trading.",
  },
  {
    href: "/en/best-brokers/indices",
    title: "Best Indices Brokers",
    description:
      "Explore brokers for trading global stock indices.",
  },
  {
    href: "/en/best-brokers/stocks",
    title: "Best Stock Trading Brokers",
    description:
      "Compare brokers offering access to stock markets.",
  },
];

/* =====================================================
   UTILITIES
===================================================== */

const safeUrl = (value?: string | null) => {
  if (!value) return null;

  try {
    const url = new URL(value);

    return url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
};

const numeric = (value: unknown): number | null => {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  return null;
};

const formatRate = (
  value: number | null | undefined,
  digits = 2
) =>
  typeof value === "number" &&
  Number.isFinite(value)
    ? `${value.toFixed(digits)}%`
    : "—";

const dateOnly = (value?: string | null) => {
  if (!value) return null;

  const match = value.match(/^\d{4}-\d{2}-\d{2}/);

  return match ? match[0] : null;
};

const dateEn = (value?: string | null) => {
  const iso = dateOnly(value);

  if (!iso) return "—";

  const date = new Date(`${iso}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const shortDate = (value?: string | null) => {
  const iso = dateOnly(value);

  if (!iso) return "—";

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
};

const rateLabel = (bank: Bank) => {
  if (bank.slug === "fed") {
    return formatRate(
      bank.current_rate_upper ?? bank.current_rate
    );
  }

  if (
    bank.current_rate_lower != null &&
    bank.current_rate_upper != null &&
    bank.current_rate_lower !== bank.current_rate_upper
  ) {
    return `${formatRate(
      bank.current_rate_lower
    )} – ${formatRate(bank.current_rate_upper)}`;
  }

  return formatRate(bank.current_rate);
};

const changeLabel = (
  bps: number | null | undefined
) => {
  if (bps == null) return "Not available";

  if (bps === 0) return "No change";

  if (bps > 0) {
    return `Raised ${bps} bps`;
  }

  return `Cut ${Math.abs(bps)} bps`;
};

const changeClass = (
  bps: number | null | undefined
) => {
  if (bps == null) return "text-slate-500";

  if (bps > 0) return "text-rose-700";

  if (bps < 0) return "text-emerald-700";

  return "text-blue-700";
};

const bankName = (bank: Bank) =>
  bank.bank_name_en ||
  BANK_DETAILS[bank.slug]?.name ||
  bank.slug.toUpperCase();

const bankShortName = (bank: Bank) =>
  bank.bank_short_name_en ||
  BANK_DETAILS[bank.slug]?.shortName ||
  bankName(bank);

const bankCurrency = (bank: Bank) =>
  bank.currency_code ||
  BANK_DETAILS[bank.slug]?.currency ||
  "—";

const officialSource = (bank: Bank) =>
  safeUrl(bank.official_rates_url) ||
  safeUrl(bank.official_website);

const calendarSource = (bank: Bank) =>
  BANK_DETAILS[bank.slug]?.calendar ||
  officialSource(bank);

/* =====================================================
   UPCOMING MEETINGS
===================================================== */

function getNextMeeting(bank: Bank, today: string) {
  return (
    Array.isArray(bank.meetings)
      ? bank.meetings
      : []
  )
    .filter(
      (meeting) =>
        meeting.status === "scheduled" &&
        !!dateOnly(meeting.meeting_date) &&
        dateOnly(meeting.meeting_date)! >= today
    )
    .sort((a, b) =>
      (a.meeting_date || "").localeCompare(
        b.meeting_date || ""
      )
    )[0];
}

/* =====================================================
   HISTORICAL DECISIONS
===================================================== */

function getHistory(bank: Bank): HistoryRow[] {
  const rows: HistoryRow[] = [];

  if (Array.isArray(bank.rate_history)) {
    for (const item of bank.rate_history) {
      const date = dateOnly(
        item.decision_date ||
          item.meeting_date ||
          item.date ||
          item.effective_date
      );

      const rate = numeric(
        item.decision_rate ?? item.rate
      );

      if (!date || rate === null) continue;

      rows.push({
        date,
        rate,
        previousRate: numeric(item.previous_rate),
        changeBps: numeric(item.change_bps),
        type: item.decision_type || null,
        source: "history",
      });
    }
  }

  if (Array.isArray(bank.meetings)) {
    for (const meeting of bank.meetings) {
      if (meeting.status !== "completed") continue;

      const date = dateOnly(meeting.meeting_date);

      const rate = numeric(meeting.decision_rate);

      if (!date || rate === null) continue;

      rows.push({
        date,
        rate,
        previousRate: numeric(meeting.previous_rate),
        changeBps: numeric(meeting.change_bps),
        type: meeting.decision_type || null,
        source: "meeting",
      });
    }
  }

  const unique = new Map<string, HistoryRow>();

  for (const row of rows) {
    const existing = unique.get(row.date);

    if (!existing || row.source === "meeting") {
      unique.set(row.date, row);
    }
  }

  const sorted = [...unique.values()].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return sorted.map((row, index) => {
    const prior =
      index > 0 ? sorted[index - 1] : null;

    const previousRate =
      row.previousRate ?? prior?.rate ?? null;

    const changeBps =
      row.changeBps ??
      (previousRate === null
        ? null
        : Math.round(
            (row.rate - previousRate) * 100
          ));

    return {
      ...row,
      previousRate,
      changeBps,
    };
  });
}

/* =====================================================
   SUPABASE — SHARED DATA, ENGLISH CONTENT
===================================================== */

async function loadData(): Promise<{
  banks: Bank[];
  hub: Bank | null;
  error: boolean;
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return {
      banks: [],
      hub: null,
      error: true,
    };
  }

  try {
    const response = await fetch(
      `${url.replace(
        /\/$/,
        ""
      )}/rest/v1/interest_rates?select=*&order=display_order.asc`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "English interest rates Supabase error:",
        response.status
      );

      return {
        banks: [],
        hub: null,
        error: true,
      };
    }

    const records =
      (await response.json()) as Bank[];

    const hub =
      records.find(
        (record) =>
          record.slug === "global" &&
          record.is_published !== false
      ) || null;

    const banks = records
      .filter(
        (record) =>
          BANK_SLUGS.includes(
            record.slug as (typeof BANK_SLUGS)[number]
          ) &&
          record.is_published !== false
      )
      .sort(
        (a, b) =>
          (a.display_order ?? 99) -
          (b.display_order ?? 99)
      );

    return {
      banks,
      hub,
      error: false,
    };
  } catch (error) {
    console.error(
      "English interest rates fetch failed:",
      error
    );

    return {
      banks: [],
      hub: null,
      error: true,
    };
  }
}


/* =====================================================
   ENGLISH SEO METADATA
===================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const { hub } = await loadData();

  const title =
    hub?.seo_title_en?.trim() ||
    "Central Bank Interest Rates Today | Broker Alarab";

  const description =
    hub?.seo_description_en?.trim() ||
    "Track current central bank interest rates worldwide. Compare Fed, ECB and other policy rates, upcoming meetings, historical decisions and monetary policy changes.";

  const ogTitle =
    hub?.og_title_en?.trim() || title;

  const ogDescription =
    hub?.og_description_en?.trim() ||
    description;

  const ogImage = safeUrl(hub?.og_image_url);

  const keywords = Array.isArray(
    hub?.seo_keywords_en
  )
    ? hub.seo_keywords_en
    : [
        "central bank interest rates",
        "current interest rates",
        "global interest rates",
        "Fed interest rate",
        "ECB interest rate",
        "central bank meetings",
        "monetary policy decisions",
        "interest rate history",
      ];

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: `${SITE}${PAGE}`,
      languages: {
        en: `${SITE}${PAGE}`,
        ar: `${SITE}${AR_PAGE}`,
        "x-default": `${SITE}${PAGE}`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${SITE}${PAGE}`,
      siteName: "Broker Alarab",
      locale: "en_US",
      type: "website",
      ...(ogImage
        ? { images: [{ url: ogImage }] }
        : {}),
    },

    twitter: {
      card: ogImage
        ? "summary_large_image"
        : "summary",
      title: ogTitle,
      description: ogDescription,
      ...(ogImage
        ? { images: [ogImage] }
        : {}),
    },
  };
}


/* =====================================================
   SECTION HEADING
===================================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string | null;
}) {
  return (
    <div className="mb-6 text-left sm:mb-8">
      <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black text-[#1e5bb8] sm:text-xs">
        {eyebrow}
      </span>

      <h2 className="mt-3 text-[24px] font-black leading-[1.35] tracking-tight text-[#091b32] sm:text-[32px] lg:text-[36px]">
        {title}
      </h2>

      {description && (
        <p className="mt-2 w-full max-w-none text-left text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

/* =====================================================
   BANK LOGO / FLAG
===================================================== */

function BankMark({
  bank,
  large = false,
}: {
  bank: Bank;
  large?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${
        large
          ? "h-12 w-12 text-2xl"
          : "h-10 w-10 text-xl"
      }`}
    >
      {safeUrl(bank.bank_logo_url) ? (
        <img
          src={bank.bank_logo_url!}
          alt={`${bankName(bank)} logo`}
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
        />
      ) : (
        bank.flag_emoji || (
          <span className="text-xs font-black text-blue-700">
            {bankCurrency(bank)}
          </span>
        )
      )}
    </div>
  );
}

/* =====================================================
   BANK IDENTITY — LTR
===================================================== */

function BankIdentity({
  bank,
  compact = false,
}: {
  bank: Bank;
  compact?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center justify-start gap-2.5">
      <BankMark bank={bank} large={!compact} />

      <div className="min-w-0 text-left">
        <div
          className={`font-black leading-6 text-slate-950 ${
            compact
              ? "text-xs sm:text-sm"
              : "text-sm"
          }`}
        >
          {bankName(bank)}
        </div>

        <div className="mt-0.5 text-[10px] font-medium text-slate-500">
          {bank.country_en ||
            BANK_DETAILS[bank.slug]?.country ||
            ""}{" "}
          · {bankCurrency(bank)}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   OFFICIAL SOURCE LINK
===================================================== */

function SourceLink({
  href,
  label = "Official source",
  dark = false,
}: {
  href?: string | null;
  label?: string;
  dark?: boolean;
}) {
  const url = safeUrl(href);

  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        dark
          ? "inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-black text-white transition hover:bg-white/20"
          : "inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[11px] font-black text-blue-700 transition hover:bg-blue-100"
      }
    >
      {label} ↗
    </a>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm font-bold text-slate-500">
      {text}
    </div>
  );
}

/* =====================================================
   HISTORICAL INTEREST RATE CHART
===================================================== */

function Chart({
  history,
  bank,
}: {
  history: HistoryRow[];
  bank: Bank;
}) {
  if (history.length < 2) {
    return (
      <EmptyState text="There are not enough historical rate decisions to display a chart for this central bank." />
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

  const dateSpan = Math.max(
    lastDate - firstDate,
    1
  );

  const x = (date: number) =>
    left +
    ((date - firstDate) / dateSpan) *
      plotWidth;

  const y = (rate: number) =>
    top +
    ((max - rate) / (max - min)) *
      plotHeight;

  let path = `M ${x(dates[0]).toFixed(2)} ${y(
    history[0].rate
  ).toFixed(2)}`;

  for (let i = 1; i < history.length; i++) {
    path += ` H ${x(dates[i]).toFixed(
      2
    )} V ${y(history[i].rate).toFixed(2)}`;
  }

  const areaPath = `${path} L ${x(
    dates[dates.length - 1]
  ).toFixed(2)} ${
    top + plotHeight
  } L ${x(dates[0]).toFixed(2)} ${
    top + plotHeight
  } Z`;

  const ticks = Array.from(
    { length: 5 },
    (_, i) =>
      min + ((max - min) * i) / 4
  );

  const labelIndexes = Array.from(
    new Set([
      0,
      Math.floor(
        (history.length - 1) / 3
      ),
      Math.floor(
        ((history.length - 1) * 2) / 3
      ),
      history.length - 1,
    ])
  );

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-black text-slate-900 sm:text-base">
            Interest Rate History —{" "}
            {bankShortName(bank)}
          </h3>

          <p className="mt-1 text-[11px] text-slate-500">
            Historical changes in published
            monetary policy rates
          </p>
        </div>

        <span
          dir="ltr"
          className="rounded-xl bg-blue-50 px-3 py-2 text-lg font-black text-blue-700"
        >
          {formatRate(
            history[history.length - 1].rate
          )}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Historical interest rate chart for ${bankName(
          bank
        )}`}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient
            id="rateAreaGradientEn"
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
          fill="url(#rateAreaGradientEn)"
        />

        <path
          d={path}
          fill="none"
          stroke="#246cce"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {history.map((row, i) => (
          <circle
            key={`${row.date}-${i}`}
            cx={x(dates[i])}
            cy={y(row.rate)}
            r="3.2"
            fill="#ffffff"
            stroke="#246cce"
            strokeWidth="2"
          >
            <title>
              {`${row.date}: ${formatRate(
                row.rate
              )}`}
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
                : index ===
                  history.length - 1
                ? "end"
                : "middle"
            }
            fontSize="14"
            fill="#64748b"
          >
            {history[index].date.slice(
              0,
              7
            )}
          </text>
        ))}
      </svg>

      <p className="mt-2 text-[11px] leading-6 text-slate-500">
        This chart uses historical policy rate
        decisions stored in the database.
        It does not represent future forecasts.
        The step line illustrates how policy
        rates remain in effect between
        recorded decisions.
      </p>
    </div>
  );
}

/* =====================================================
   SELECT FIELD
===================================================== */

function SelectField({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="mb-1.5 block text-[11px] font-black text-slate-600">
        {label}
      </span>

      <select
        name={name}
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =====================================================
   CENTRAL BANK RATE COMPARISON TABLE
   DESKTOP: FULL TABLE
   MOBILE / TABLET: RESPONSIVE CARDS
===================================================== */

function RateTable({
  banks,
  today,
}: {
  banks: Bank[];
  today: string;
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.055)] sm:rounded-[28px]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 px-4 py-5 sm:px-7">
        <div>
          <span className="rounded-full bg-[#2471df] px-3 py-1 text-[10px] font-black text-white">
            CENTRAL BANK RATE DATA
          </span>

          <h3 className="mt-2 text-lg font-black text-slate-950 sm:text-2xl">
            Global Central Bank Interest
            Rate Comparison
          </h3>
        </div>

        <span className="rounded-xl border border-blue-100 bg-white px-4 py-2 text-xs font-black text-blue-700">
          {banks.length} Central Banks
        </span>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden p-5 lg:block">
        <div className="overflow-hidden rounded-[18px] border border-slate-200">
          <table className="w-full table-fixed text-center">
            <thead className="bg-[#0b2949] text-white">
              <tr className="text-xs">
                <th className="w-[25%] px-4 py-4 text-left">
                  Central Bank
                </th>

                <th className="w-[14%] px-3 py-4">
                  Current Rate
                </th>

                <th className="w-[17%] px-3 py-4">
                  Policy Rate Type
                </th>

                <th className="w-[16%] px-3 py-4">
                  Latest Decision
                </th>

                <th className="w-[17%] px-3 py-4">
                  Next Meeting
                </th>

                <th className="w-[11%] px-3 py-4">
                  Source
                </th>
              </tr>
            </thead>

            <tbody>
              {banks.map((bank, index) => {
                const next = getNextMeeting(
                  bank,
                  today
                );

                return (
                  <tr
                    key={bank.slug}
                    className={`border-t border-slate-200 transition hover:bg-blue-50 ${
                      index % 2
                        ? "bg-slate-50/70"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-4 text-left">
                      <BankIdentity bank={bank} />
                    </td>

                    <td className="px-3 py-4 text-center">
                      <span
                        dir="ltr"
                        className="inline-block text-[17px] font-black text-[#1e5bb8]"
                      >
                        {rateLabel(bank)}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-center text-[11px] font-bold leading-6 text-slate-600">
                      {bank.rate_type_en ||
                        "Policy rate"}
                    </td>

                    <td className="px-3 py-4 text-center">
                      <div
                        className={`text-[11px] font-black ${changeClass(
                          bank.last_change_bps
                        )}`}
                      >
                        {changeLabel(
                          bank.last_change_bps
                        )}
                      </div>

                      <div className="mt-1 text-[10px] text-slate-500">
                        {dateEn(
                          bank.last_decision_date
                        )}
                      </div>
                    </td>

                    <td className="px-3 py-4 text-center text-xs font-black">
                      {next
                        ? dateEn(
                            next.meeting_date
                          )
                        : "Not announced"}
                    </td>

                    <td className="px-3 py-4 text-center">
                      <SourceLink
                        href={officialSource(
                          bank
                        )}
                        label="Source"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE / TABLET CARDS */}
      <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-5 lg:hidden">
        {banks.map((bank) => {
          const next = getNextMeeting(
            bank,
            today
          );

          return (
            <article
              key={bank.slug}
              className="min-w-0 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 p-3.5">
                <BankIdentity
                  bank={bank}
                  compact
                />

                <div className="shrink-0 text-right">
                  <div
                    dir="ltr"
                    className="text-lg font-black text-[#1e5bb8]"
                  >
                    {rateLabel(bank)}
                  </div>

                  <p className="mt-1 text-[9px] text-slate-500">
                    Current Rate
                  </p>
                </div>
              </div>

              <div className="mx-3.5 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 text-center">
                <div className="border-r border-slate-200 p-3">
                  <p className="text-[10px] text-slate-500">
                    Latest Decision
                  </p>

                  <p
                    className={`mt-1 text-[11px] font-black ${changeClass(
                      bank.last_change_bps
                    )}`}
                  >
                    {changeLabel(
                      bank.last_change_bps
                    )}
                  </p>
                </div>

                <div className="p-3">
                  <p className="text-[10px] text-slate-500">
                    Next Meeting
                  </p>

                  <p className="mt-1 text-[11px] font-black">
                    {next
                      ? dateEn(
                          next.meeting_date
                        )
                      : "Not announced"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 px-3.5 py-3">
                <p className="line-clamp-2 min-w-0 text-[10px] leading-5 text-slate-500">
                  {bank.rate_type_en ||
                    "Policy rate"}
                </p>

                <SourceLink
                  href={officialSource(bank)}
                  label="Source"
                />
              </div>
            </article>
          );
        })}
      </div>

      {!banks.length && (
        <div className="p-5">
          <EmptyState text="No published central bank interest rate data is currently available." />
        </div>
      )}

      <div className="border-t border-amber-100 bg-amber-50 px-4 py-3 text-[11px] leading-7 text-amber-900 sm:px-7">
        <strong>Important:</strong> Central
        banks do not all use the same
        monetary policy benchmark. The
        Federal Reserve publishes a target
        range, while other central banks
        may use a single policy rate.
        These figures should not be
        interpreted as directly comparable
        investment returns.
      </div>
    </div>
  );
}

/* =====================================================
   END OF PART 1

   PART 2 STARTS IMMEDIATELY BELOW THIS LINE WITH:

   export default async function InterestRatesPage({
     searchParams,
   }: PageProps) {

===================================================== */

export default async function InterestRatesPage({
  searchParams,
}: PageProps) {
  const params = (await searchParams) || {};

  const selectedBank =
    typeof params.bank === "string"
      ? params.bank
      : "all";

  const selectedYear =
    typeof params.year === "string"
      ? params.year
      : "all";

  const selectedHistoryBank =
    typeof params.history_bank === "string"
      ? params.history_bank
      : "fed";

  const selectedHistoryYear =
    typeof params.history_year === "string"
      ? params.history_year
      : "all";

  const { banks, hub, error } = await loadData();

  const today = new Date().toISOString().slice(0, 10);

  /* =====================================================
     UPCOMING MEETINGS
  ===================================================== */

  const allMeetings: EventRow[] = banks
    .flatMap((bank) =>
      (Array.isArray(bank.meetings)
        ? bank.meetings
        : []
      )
        .filter(
          (meeting) =>
            meeting.status === "scheduled" &&
            !!dateOnly(meeting.meeting_date) &&
            dateOnly(meeting.meeting_date)! >= today
        )
        .map((meeting) => ({ bank, meeting }))
    )
    .sort((a, b) =>
      (a.meeting.meeting_date || "").localeCompare(
        b.meeting.meeting_date || ""
      )
    );

  const calendarYears = [
    ...new Set(
      allMeetings
        .map((event) =>
          dateOnly(event.meeting.meeting_date)?.slice(
            0,
            4
          )
        )
        .filter(
          (value): value is string => !!value
        )
    ),
  ].sort();

  const filteredMeetings = allMeetings.filter(
    ({ bank, meeting }) =>
      (selectedBank === "all" ||
        bank.slug === selectedBank) &&
      (selectedYear === "all" ||
        meeting.meeting_date?.startsWith(
          selectedYear
        ))
  );

  const showAllMeetings = params.show_all === "1";

  const visibleMeetings = showAllMeetings
    ? filteredMeetings
    : filteredMeetings.slice(0, 15);

  /* =====================================================
     HISTORICAL DATA
  ===================================================== */

  const allHistory = banks.flatMap((bank) =>
    getHistory(bank).map((row) => ({
      bank,
      row,
    }))
  );

  const historyBank =
    banks.find(
      (bank) => bank.slug === selectedHistoryBank
    ) || banks[0];

  const historyFull = historyBank
    ? getHistory(historyBank)
    : [];

  const historyYears = [
    ...new Set(
      historyFull.map((row) =>
        row.date.slice(0, 4)
      )
    ),
  ].sort();

  const historyFiltered =
    selectedHistoryYear === "all"
      ? historyFull
      : historyFull.filter((row) =>
          row.date.startsWith(selectedHistoryYear)
        );

  const recentDecisions = [...allHistory]
    .sort((a, b) =>
      b.row.date.localeCompare(a.row.date)
    )
    .slice(0, 12);

  const nextEvent = allMeetings[0];

  /* =====================================================
     FILTER OPTIONS
  ===================================================== */

  const bankOptions = [
    {
      value: "all",
      label: "All Central Banks",
    },
    ...banks.map((bank) => ({
      value: bank.slug,
      label: bankShortName(bank),
    })),
  ];

  const calendarYearOptions = [
    {
      value: "all",
      label: "All Years",
    },
    ...calendarYears.map((year) => ({
      value: year,
      label: year,
    })),
  ];

  /* =====================================================
     SUPABASE ENGLISH CONTENT
  ===================================================== */

  const hubTitle =
    hub?.seo_h1_en?.trim() ||
    "Global Central Bank Interest Rates";

  const intro =
    hub?.hub_intro_en?.trim() ||
    "Track current interest rates from major central banks worldwide. Compare monetary policy rates, explore historical rate decisions, follow upcoming meetings and understand how interest rate changes influence forex, gold, stocks and financial markets.";

  const comparisonIntro =
    hub?.hub_comparison_intro_en?.trim() ||
    "Compare current policy rates from eight major central banks, including their latest decisions and upcoming meetings. Rate definitions vary between institutions, so the figures should be interpreted according to each bank's policy framework.";

  const meetingsIntro =
    hub?.hub_meetings_intro_en?.trim() ||
    "Explore upcoming central bank interest rate decisions and monetary policy meetings. Filter scheduled announcements by central bank or year and access official meeting calendars.";

  const historyIntro =
    hub?.hub_history_intro_en?.trim() ||
    "Explore historical central bank interest rate decisions, including rate increases, cuts and holds. Review how monetary policy rates have changed over time.";

  const methodology =
    hub?.methodology_en?.trim() ||
    "Broker Alarab displays interest rate data recorded in its database, together with links to official central bank sources. Meeting dates refer to the recorded policy decision date where available. Different central banks use different policy rate definitions, and these differences should be considered when comparing rates.";

  const disclaimer =
    hub?.data_disclaimer_en?.trim() ||
    "Interest rates, meeting dates and announcement times may change. Always verify the latest information with the relevant central bank before making financial decisions. This content is provided for informational purposes only and does not constitute investment advice.";

  const databaseFaqs = Array.isArray(hub?.faq_en)
    ? hub.faq_en
        .map((item) => ({
          q: (item.question || item.q || "").trim(),
          a: (item.answer || item.a || "").trim(),
        }))
        .filter((item) => item.q && item.a)
    : [];

  const faqs =
    databaseFaqs.length > 0
      ? databaseFaqs
      : DEFAULT_FAQS;

  /* =====================================================
     STRUCTURED DATA — ENGLISH
  ===================================================== */

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE}/en`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Central Bank Interest Rates",
          item: `${SITE}${PAGE}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: hubTitle,
      description: intro,
      url: `${SITE}${PAGE}`,
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: "Broker Alarab",
        url: SITE,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: banks.length,
        itemListElement: banks.map(
          (bank, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: bankName(bank),
            url: `${SITE}${PAGE}/${bank.slug}`,
            description:
              BANK_DETAILS[bank.slug]?.description ||
              "",
          })
        ),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <main
      dir="ltr"
      lang="en"
      className="min-h-screen bg-[#f4f7fb] text-slate-900"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/* =====================================================
          HERO — RESPONSIVE ENGLISH
      ===================================================== */}

      <section className="relative isolate overflow-hidden border-b border-[#174373] bg-[#071a31] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#061326_0%,#092746_55%,#0c4279_100%)]" />

          <div className="absolute -right-32 -top-52 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="absolute -bottom-72 left-[12%] h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(147,197,253,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative mx-auto max-w-[1520px] px-4 pb-5 pt-4 sm:px-6 sm:pb-12 sm:pt-8 lg:px-10 lg:pb-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-7 hidden items-center gap-2 text-xs font-bold text-blue-200/80 sm:flex"
          >
            <Link
              href="/en"
              className="hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-white">
              Interest Rates
            </span>
          </nav>

          <div className="grid items-center gap-4 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-black text-blue-100 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                GLOBAL MONETARY POLICY TRACKER
              </span>

              <h1 className="mt-3 max-w-[850px] text-[27px] font-black leading-[1.25] tracking-tight sm:mt-5 sm:text-[45px] lg:text-[53px] xl:text-[59px]">
                {hubTitle ===
                "Global Central Bank Interest Rates" ? (
                  <>
                    Global Central Bank
                    <span className="block text-[#59c0ff]">
                      Interest Rates
                    </span>
                  </>
                ) : (
                  hubTitle
                )}
              </h1>

              <p className="mt-3 max-w-[800px] text-[12px] font-medium leading-6 text-slate-200 sm:mt-5 sm:text-[16px] sm:leading-9">
                {intro}
              </p>

              <div className="mt-4 grid max-w-[660px] grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-1 sm:mt-6">
                {[
                  {
                    value: String(banks.length),
                    label: "Central Banks",
                  },
                  {
                    value: String(
                      allMeetings.length
                    ),
                    label: "Upcoming Meetings",
                  },
                  {
                    value: String(
                      allHistory.length
                    ),
                    label: "Historical Decisions",
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`px-1 py-2 text-center sm:py-3 ${
                      index === 1
                        ? "border-x border-white/10"
                        : ""
                    }`}
                  >
                    <div className="text-lg font-black text-[#66c8ff] sm:text-2xl">
                      {item.value}
                    </div>

                    <div className="mt-1 text-[9px] font-bold text-slate-300 sm:text-xs">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3">
                <a
                  href="#rates"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#2471df] px-1 text-center text-[10px] font-black leading-4 text-white transition hover:bg-[#2e7cea] sm:min-h-11 sm:px-5 sm:text-sm"
                >
                  Compare Rates →
                </a>

                <a
                  href="#calendar"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/20 bg-white/[0.07] px-1 text-center text-[10px] font-black leading-4 text-white transition hover:bg-white/15 sm:min-h-11 sm:px-5 sm:text-sm"
                >
                  Meeting Calendar →
                </a>

                <a
                  href="#history"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/20 bg-white/[0.07] px-1 text-center text-[10px] font-black leading-4 text-white transition hover:bg-white/15 sm:min-h-11 sm:px-5 sm:text-sm"
                >
                  Rate History →
                </a>
              </div>
            </div>

            {/* HERO DASHBOARD */}

            <aside className="w-full max-w-[470px] justify-self-end overflow-hidden rounded-[18px] border border-blue-200 bg-[#eef5fd] p-3 text-slate-900 shadow-2xl sm:rounded-[22px] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold text-blue-600 sm:text-xs">
                    MONETARY POLICY DASHBOARD
                  </p>

                  <h2 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
                    Major Central Bank Rates
                  </h2>
                </div>

                <span className="rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-[10px] font-black text-blue-700">
                  Published Data
                </span>
              </div>

              <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
                {["fed", "ecb", "boe", "boj"]
                  .map((slug) =>
                    banks.find(
                      (bank) =>
                        bank.slug === slug
                    )
                  )
                  .filter(
                    (bank): bank is Bank =>
                      !!bank
                  )
                  .map((bank) => (
                    <div
                      key={bank.slug}
                      className="flex items-center justify-between gap-3 rounded-xl border border-blue-100 bg-white px-3 py-2.5 shadow-sm sm:py-3"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="text-lg">
                          {bank.flag_emoji ||
                            "🌐"}
                        </span>

                        <div className="min-w-0">
                          <div className="text-xs font-black text-slate-900 sm:text-sm">
                            {bankShortName(
                              bank
                            )}
                          </div>

                          <div className="mt-0.5 text-[10px] text-slate-500">
                            {bankCurrency(
                              bank
                            )}
                          </div>
                        </div>
                      </div>

                      <span
                        dir="ltr"
                        className="shrink-0 text-[15px] font-black text-[#1e5bb8] sm:text-lg"
                      >
                        {rateLabel(bank)}
                      </span>
                    </div>
                  ))}
              </div>

              {nextEvent && (
                <div className="mt-3 rounded-xl border border-blue-200 bg-[#dceafb] p-3 sm:mt-4">
                  <p className="text-[10px] font-black text-blue-700">
                    NEXT SCHEDULED ANNOUNCEMENT
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {bankShortName(
                        nextEvent.bank
                      )}
                    </span>

                    <time
                      dateTime={
                        nextEvent.meeting
                          .meeting_date
                      }
                      className="text-xs font-black text-blue-800"
                    >
                      {dateEn(
                        nextEvent.meeting
                          .meeting_date
                      )}
                    </time>
                  </div>
                </div>
              )}

              <p className="mt-3 text-[10px] leading-5 text-slate-500 sm:leading-6">
                Rates reflect published
                records and are not
                real-time streaming quotes.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION NAVIGATION
      ===================================================== */}

      <nav
        aria-label="Interest rate sections"
        className="border-b border-slate-200 bg-white"
      >
        <div className="mx-auto flex max-w-[1520px] gap-2 overflow-x-auto px-3 py-3 sm:flex-wrap sm:px-6 lg:px-10">
          {[
            ["#rates", "Current Rates"],
            ["#calendar", "Meeting Calendar"],
            ["#history", "Rate History"],
            ["#decisions", "Latest Decisions"],
            ["#banks", "Central Banks"],
            ["#guide", "Policy Guide"],
            ["#impact", "Market Impact"],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-4 sm:text-xs"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {error && (
        <div className="mx-auto max-w-[1520px] px-3 pt-5 sm:px-6 lg:px-10">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800">
            Unable to load central bank
            interest rate data. Please check
            the Supabase connection and
            database read permissions.
          </div>
        </div>
      )}

      {/* =====================================================
          CURRENT INTEREST RATES
      ===================================================== */}

      <section
        id="rates"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="GLOBAL RATE COMPARISON"
            title="Current Central Bank Interest Rates"
            description={comparisonIntro}
          />

          <RateTable
            banks={banks}
            today={today}
          />

          <div className="mt-5 hidden gap-3 md:grid md:grid-cols-3">
            {[
              {
                title: "Federal Reserve Rates",
                text: "The Federal Reserve uses a target range for the federal funds rate rather than a single policy rate.",
              },
              {
                title: "European Central Bank Rates",
                text: "ECB policy rate comparisons should specify the benchmark used, such as the deposit facility rate.",
              },
              {
                title: "Different Policy Benchmarks",
                text: "Differences in headline rates do not necessarily indicate equivalent differences in monetary policy restrictiveness.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
              >
                <h3 className="text-sm font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CENTRAL BANK MEETING CALENDAR
      ===================================================== */}

      <section
        id="calendar"
        className="scroll-mt-20 bg-white py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="MONETARY POLICY CALENDAR"
            title="Central Bank Meeting Calendar 2026–2027"
            description={meetingsIntro}
          />

          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.055)] sm:rounded-[28px]">
            <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black sm:text-2xl">
                    Interest Rate Decision Calendar
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Upcoming monetary policy
                    announcements recorded in
                    our database
                  </p>
                </div>

                <span className="rounded-full bg-[#2471df] px-3 py-2 text-xs font-black text-white">
                  {filteredMeetings.length} of{" "}
                  {allMeetings.length} Meetings
                </span>
              </div>

              <CalendarFilters
                key={`${selectedBank}-${selectedYear}`}
                selectedBank={selectedBank}
                selectedYear={selectedYear}
                bankOptions={bankOptions}
                yearOptions={
                  calendarYearOptions
                }
              />

              {(selectedBank !== "all" ||
                selectedYear !== "all") && (
                <Link
                  href={`${PAGE}#calendar`}
                  className="mt-3 inline-block text-xs font-black text-blue-700 underline underline-offset-4"
                >
                  Reset All Filters
                </Link>
              )}
            </div>

            {/* DESKTOP CALENDAR */}

            <div className="hidden md:block">
              <table className="w-full table-fixed text-center">
                <thead className="bg-[#0b2949] text-white">
                  <tr className="text-xs">
                    <th className="px-5 py-4 text-left">
                      Central Bank
                    </th>

                    <th className="px-4 py-4">
                      Currency
                    </th>

                    <th className="px-4 py-4">
                      Decision Date
                    </th>

                    <th className="px-4 py-4">
                      Time (UTC)
                    </th>

                    <th className="px-4 py-4">
                      Status
                    </th>

                    <th className="px-4 py-4">
                      Official Calendar
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visibleMeetings.map(
                    (
                      { bank, meeting },
                      index
                    ) => (
                      <tr
                        key={`${bank.slug}-${
                          meeting.id ||
                          meeting.meeting_date
                        }`}
                        className={`border-t border-slate-200 ${
                          index % 2
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        <td className="px-5 py-3.5 text-left">
                          <div className="flex items-center justify-start gap-2">
                            <span className="text-lg">
                              {bank.flag_emoji ||
                                "🌐"}
                            </span>

                            <span className="text-xs font-black">
                              {bankName(
                                bank
                              )}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-center text-xs font-black text-slate-600">
                          {bankCurrency(
                            bank
                          )}
                        </td>

                        <td className="px-4 py-3.5 text-xs font-black">
                          <time
                            dateTime={
                              meeting.meeting_date
                            }
                          >
                            {dateEn(
                              meeting.meeting_date
                            )}
                          </time>
                        </td>

                        <td className="px-4 py-3.5 text-center text-xs font-bold text-slate-600">
                          {meeting.announcement_at
                            ? `${meeting.announcement_at.slice(
                                11,
                                16
                              )} UTC`
                            : "Not specified"}
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                            Scheduled
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <SourceLink
                            href={
                              safeUrl(
                                meeting.reference_calendar_url
                              ) ||
                              calendarSource(
                                bank
                              )
                            }
                            label="Calendar"
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE CALENDAR */}

            <div className="divide-y divide-slate-200 md:hidden">
              {visibleMeetings.map(
                ({ bank, meeting }) => (
                  <article
                    key={`${bank.slug}-${
                      meeting.id ||
                      meeting.meeting_date
                    }`}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <BankIdentity
                        bank={bank}
                        compact
                      />

                      <div className="shrink-0 text-right">
                        <time
                          dateTime={
                            meeting.meeting_date
                          }
                          className="text-[11px] font-black text-[#1e5bb8]"
                        >
                          {dateEn(
                            meeting.meeting_date
                          )}
                        </time>

                        <p className="mt-1 text-[10px] text-slate-500">
                          {meeting.announcement_at
                            ? `${meeting.announcement_at.slice(
                                11,
                                16
                              )} UTC`
                            : "Time not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                        Scheduled
                      </span>

                      <SourceLink
                        href={
                          safeUrl(
                            meeting.reference_calendar_url
                          ) ||
                          calendarSource(
                            bank
                          )
                        }
                        label="Official Calendar"
                      />
                    </div>
                  </article>
                )
              )}
            </div>

            {filteredMeetings.length > 15 && (
              <div className="flex justify-center border-t border-slate-200 bg-white px-4 py-5">
                <Link
                  href={
                    showAllMeetings
                      ? `${PAGE}?bank=${selectedBank}&year=${selectedYear}#calendar`
                      : `${PAGE}?bank=${selectedBank}&year=${selectedYear}&show_all=1#calendar`
                  }
                  className="rounded-xl bg-[#2471df] px-7 py-3 text-xs font-black text-white transition hover:bg-[#1e5bb8]"
                >
                  {showAllMeetings
                    ? "Show First 15 Meetings"
                    : `View All Meetings (${filteredMeetings.length})`}
                </Link>
              </div>
            )}

            {!filteredMeetings.length && (
              <div className="p-5">
                <EmptyState text="No upcoming meetings match the selected filters." />
              </div>
            )}

            <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 text-[11px] leading-7 text-slate-600 sm:px-7">
              Announcement times are shown
              in UTC when available.
              Scheduled dates may change.
              A central bank meeting does
              not necessarily result in an
              interest rate change.
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HISTORICAL INTEREST RATE EXPLORER
      ===================================================== */}

      <section
        id="history"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="HISTORICAL RATE DATA"
            title="Central Bank Interest Rate History"
            description={historyIntro}
          />

          <HistoryExplorer
            banks={banks.map((bank) => ({
              slug: bank.slug,
              name: bankShortName(bank),
              officialUrl:
                officialSource(bank),
              history: getHistory(bank).map(
                (row) => ({
                  date: row.date,
                  rate: row.rate,
                  previousRate:
                    row.previousRate,
                  changeBps:
                    row.changeBps,
                  type: row.type,
                })
              ),
            }))}
          />
        </div>
      </section>

      {/* =====================================================
          RECENT CENTRAL BANK DECISIONS
      ===================================================== */}

      <section
        id="decisions"
        className="scroll-mt-20 bg-white py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="LATEST MONETARY POLICY DECISIONS"
            title="Latest Central Bank Rate Decisions"
            description="Review recent interest rate increases, cuts and holds, including decision dates, resulting policy rates and changes measured in basis points."
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {recentDecisions.map(
              ({ bank, row }) => (
                <article
                  key={`${bank.slug}-${row.date}`}
                  className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_8px_25px_rgba(15,23,42,0.045)] transition hover:border-blue-200 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <BankIdentity
                      bank={bank}
                      compact
                    />

                    <span
                      dir="ltr"
                      className="shrink-0 text-lg font-black text-[#1e5bb8]"
                    >
                      {formatRate(
                        row.rate
                      )}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div>
                      <p className="text-[10px] text-slate-500">
                        Decision Date
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {dateEn(
                          row.date
                        )}
                      </p>
                    </div>

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
                </article>
              )
            )}
          </div>

          {!recentDecisions.length && (
            <EmptyState text="No historical interest rate decisions are currently available." />
          )}
        </div>
      </section>

      {/* =====================================================
          CENTRAL BANK DIRECTORY
      ===================================================== */}

      <section
        id="banks"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="CENTRAL BANK DIRECTORY"
            title="Major Central Banks and Their Interest Rates"
            description="Explore the Federal Reserve, European Central Bank, Bank of England, Bank of Japan and other major central banks. Compare current policy rates, upcoming decisions and monetary policy information."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {banks.map((bank) => {
              const next = getNextMeeting(
                bank,
                today
              );

              const details =
                BANK_DETAILS[bank.slug];

              return (
                <article
                  key={bank.slug}
                  className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <BankMark
                      bank={bank}
                      large
                    />

                    <span
                      dir="ltr"
                      className="rounded-xl bg-blue-50 px-3 py-2 text-lg font-black text-blue-700"
                    >
                      {rateLabel(
                        bank
                      )}
                    </span>
                  </div>

                  
<h3 className="mt-4 text-base font-black leading-7">
  <Link
    href={`/en/interest-rates/${bank.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-colors hover:text-[#2471df] hover:underline"
  >
    {bankName(bank)}
  </Link>
</h3>


                  <p className="mt-1 text-[11px] font-medium text-slate-500">
                    {bank.country_en ||
                      details?.country}
                    {" · "}
                    {bankCurrency(
                      bank
                    )}
                  </p>

                  <p className="mt-3 flex-1 text-xs leading-7 text-slate-600">
                    {details?.description}
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] text-slate-500">
                      Next Rate Decision
                    </p>

                    <p className="mt-1 text-xs font-black text-slate-900">
                      {next
                        ? dateEn(
                            next.meeting_date
                          )
                        : "Not announced"}
                    </p>
                  </div>

                  
<div className="mt-4 flex flex-wrap items-center justify-center gap-2">
  <Link
    href={`${PAGE}/${bank.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#2471df] px-4 py-2 text-center text-[11px] font-black text-white transition hover:bg-[#1e5bb8]"
  >
    Bank Details ↗
  </Link>

  <Link
    href={`${PAGE}?history_bank=${bank.slug}#history`}
    className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-center text-[11px] font-black text-blue-700 transition hover:bg-blue-100"
  >
    Rate History ←
  </Link>
</div>

                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATIONAL GUIDE
      ===================================================== */}

      <section
        id="guide"
        className="scroll-mt-20 bg-white py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="MONETARY POLICY GUIDE"
            title="What Are Central Bank Interest Rates?"
            description="Understanding central bank interest rates involves more than knowing the current percentage. It also requires understanding policy decisions, market expectations and the economic outlook."
          />

          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
            <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-5 sm:p-7">
                <h3 className="text-xl font-black sm:text-2xl">
                  How Do Central Bank Policy Rates Work?
                </h3>

                <p className="mt-4 text-[13px] leading-8 text-slate-600 sm:text-[15px]">
                  Central banks use monetary
                  policy interest rates to
                  influence borrowing costs,
                  financial conditions and
                  economic demand. Higher
                  interest rates may help
                  reduce inflationary
                  pressures by slowing
                  spending and credit growth.
                  Lower rates may support
                  economic activity when
                  conditions allow.
                </p>

                <p className="mt-4 text-[13px] leading-8 text-slate-600 sm:text-[15px]">
                  Policy decisions depend on
                  several economic indicators,
                  including inflation,
                  employment, wages, growth
                  and financial stability.
                  Monetary policy frameworks
                  also differ between the
                  United States, euro area,
                  Japan and other economies.
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
                {[
                  {
                    n: "01",
                    title: "Inflation Assessment",
                    text: "Central banks evaluate inflation trends, underlying price pressures and future expectations.",
                  },
                  {
                    n: "02",
                    title: "Growth and Employment",
                    text: "Policymakers review labour markets, consumer spending, output and financial conditions.",
                  },
                  {
                    n: "03",
                    title: "Interest Rate Decision",
                    text: "The bank may increase, decrease or maintain its policy rate based on economic conditions.",
                  },
                  {
                    n: "04",
                    title: "Forward Guidance",
                    text: "Markets analyse official statements, forecasts and press conferences for clues about future policy.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="rounded-[17px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-black text-[#2471df]">
                        {item.n}
                      </span>

                      <h4 className="text-[15px] font-black text-slate-950">
                        {item.title}
                      </h4>
                    </div>

                    <p className="mt-3 text-xs leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-[22px] bg-[#071c34] p-5 text-white shadow-lg sm:p-7">
              <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[10px] font-black text-cyan-200">
                TRADER'S CHECKLIST
              </span>

              <h3 className="mt-4 text-xl font-black leading-8">
                What Should Traders Check Before a Rate Decision?
              </h3>

              <p className="mt-3 text-xs leading-7 text-slate-300">
                The announced interest
                rate is only part of the
                story. Compare the outcome
                with expectations and
                review the accompanying
                monetary policy guidance.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Current policy rate",
                  "Market expectations before the announcement",
                  "Actual decision and change in basis points",
                  "Central bank statement and inflation outlook",
                  "Governor's press conference",
                  "Expectations for future meetings",
                  "Volatility and trading spreads during the release",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 border-b border-white/10 pb-3 last:border-0"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-black text-cyan-300">
                      ✓
                    </span>

                    <span className="text-xs font-bold leading-6 text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-7">
              <h3 className="text-xl font-black">
                Rate Hikes vs. Rate Cuts vs. Rate Holds
              </h3>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                <strong className="text-slate-900">
                  Rate hike:
                </strong>{" "}
                Usually represents tighter
                monetary policy and higher
                borrowing costs.{" "}
                <strong className="text-slate-900">
                  Rate cut:
                </strong>{" "}
                Generally signals an easing
                of monetary conditions.{" "}
                <strong className="text-slate-900">
                  Rate hold:
                </strong>{" "}
                Means the policy rate remains
                unchanged, although the
                central bank's guidance may
                still influence markets.
              </p>
            </article>

            <article className="rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-7">
              <h3 className="text-xl font-black">
                Why Do Markets React to Interest Rate Decisions?
              </h3>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                Financial markets respond
                to differences between
                actual decisions and prior
                expectations. An unchanged
                interest rate may still
                trigger significant price
                movements if the central
                bank changes its inflation
                forecasts, economic outlook
                or expected policy path.
              </p>
            </article>
          </div>

          {hub?.hub_educational_content_en?.trim() && (
            <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-5 sm:p-7">
              <h3 className="text-xl font-black">
                Understanding Global Monetary Policy
              </h3>

              <div className="mt-3 whitespace-pre-line text-[13px] leading-8 text-slate-700">
                {hub.hub_educational_content_en}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          INTEREST RATE MARKET IMPACT
      ===================================================== */}

      <section
        id="impact"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="MONETARY POLICY IMPACT"
            title="How Do Interest Rates Affect Forex, Gold and Stocks?"
            description="Interest rate decisions influence borrowing costs, yields and investor expectations. However, the direction of market movements depends on economic conditions and whether decisions surprise investors."
          />

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: "↗",
                title: "Forex and Currencies",
                text: "Expected interest rate differentials influence currency valuations and capital flows. Expectations for future policy decisions are often more important than the current rate alone.",
              },
              {
                icon: "◇",
                title: "Gold and Precious Metals",
                text: "Gold prices respond to real yields, the US dollar, inflation expectations and global risks. There is no fixed or guaranteed relationship between interest rates and gold.",
              },
              {
                icon: "▥",
                title: "Stocks and Indices",
                text: "Borrowing costs, discount rates and earnings expectations can affect equity valuations. The impact varies across sectors and economic conditions.",
              },
              {
                icon: "≋",
                title: "Bonds and Yields",
                text: "Bond yields reflect expectations for interest rates, inflation and risk. Short-term and long-term yields may respond differently to policy announcements.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[19px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-black text-[#2471df]">
                    {item.icon}
                  </span>

                  <h3 className="text-base font-black text-slate-950">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-3 text-xs leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-7">
              <h3 className="text-lg font-black sm:text-xl">
                How Do Federal Reserve Interest Rates Affect the US Dollar?
              </h3>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                US interest rate expectations
                influence yields on
                dollar-denominated assets.
                Higher expected yields may
                support the dollar, but the
                outcome also depends on
                monetary policy in other
                economies, economic growth
                expectations and global
                risk sentiment. A Federal
                Reserve decision alone
                cannot determine the
                direction of the dollar.
              </p>
            </article>

            <article className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-7">
              <h3 className="text-lg font-black sm:text-xl">
                How Do Interest Rate Differentials Affect Currency Pairs?
              </h3>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                Forex traders often compare
                expected policy paths
                between central banks.
                For example, the outlook
                for Federal Reserve and ECB
                rates can influence EUR/USD.
                However, the current
                interest rate differential
                is only one factor.
                Inflation, growth, future
                expectations and global
                risk conditions also matter.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTERNAL LINKS — ENGLISH
      ===================================================== */}

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="RELATED TRADING RESOURCES"
            title="Explore More Market Research on Broker Alarab"
            description="Connect monetary policy analysis with trading education, risk management and independent broker comparisons."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {INTERNAL_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-[18px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-xs font-black text-[#2471df]">
                  Explore More →
                </span>

                <h3 className="mt-3 text-base font-black text-slate-900 group-hover:text-blue-700">
                  {item.title}
                </h3>

                <p className="mt-2 flex-1 text-xs leading-7 text-slate-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ — SUPABASE ENGLISH CONTENT
      ===================================================== */}

      <section
        id="faq"
        className="scroll-mt-20 bg-[#f4f7fb] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="Central Bank Interest Rates FAQ"
            description="Answers to common questions about global interest rates, central bank meetings, monetary policy decisions and their effects on financial markets."
          />

          <div className="space-y-2.5">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-[15px] border border-slate-200 bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-xs font-black text-slate-900 marker:hidden sm:px-6 sm:text-sm [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-black text-blue-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="border-t border-slate-200 px-4 py-4 text-xs leading-8 text-slate-600 sm:px-6 sm:text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SOURCES AND METHODOLOGY
      ===================================================== */}

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-5 sm:p-7">
              <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-[10px] font-black text-blue-700">
                DATA TRANSPARENCY
              </span>

              <h2 className="mt-3 text-xl font-black sm:text-2xl">
                Interest Rate Data Sources and Methodology
              </h2>

              <p className="mt-3 whitespace-pre-line text-[13px] leading-8 text-slate-600">
                {methodology}
              </p>
            </div>

            <div className="p-3 sm:p-7">
              <h3 className="text-sm font-black sm:text-base">
                Official Central Bank Sources
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3 lg:grid-cols-4">
                {banks.map((bank) => (
                  <div
                    key={bank.slug}
                    className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-2.5 sm:p-4"
                  >
                    <div className="flex min-h-[38px] items-center justify-center">
                      <h4 className="min-w-0 text-center text-[10px] font-black leading-4 sm:text-xs">
                        {bankShortName(
                          bank
                        )}
                      </h4>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-1 sm:mt-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
                      <div className="min-w-0 [&>a]:w-full [&>a]:!px-1 [&>a]:!py-2 [&>a]:!text-[9px] sm:[&>a]:!w-auto sm:[&>a]:!px-3 sm:[&>a]:!text-[11px]">
                        <SourceLink
                          href={officialSource(
                            bank
                          )}
                          label="Rates"
                        />
                      </div>

                      <div className="min-w-0 [&>a]:w-full [&>a]:!px-1 [&>a]:!py-2 [&>a]:!text-[9px] sm:[&>a]:!w-auto sm:[&>a]:!px-3 sm:[&>a]:!text-[11px]">
                        <SourceLink
                          href={calendarSource(
                            bank
                          )}
                          label="Meetings"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="text-sm font-black text-amber-950">
                  Data Accuracy Disclaimer
                </h3>

                <p className="mt-2 whitespace-pre-line text-xs leading-7 text-amber-900">
                  {disclaimer}
                </p>
              </div>

              <p className="mt-4 text-[11px] leading-7 text-slate-500">
                Interest rates, meeting
                schedules and historical
                decisions are stored in
                the Broker Alarab database.
                Official central bank
                sources are provided for
                independent verification.
                Published information may
                change after this page
                has been loaded. Database
                access is not equivalent
                to continuous real-time
                verification.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
