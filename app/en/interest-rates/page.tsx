
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
      {eyebrow && (
  <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black text-[#1e5bb8] sm:text-xs">
    {eyebrow}
  </span>
)}

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


/* =====================================================
   BANK FLAG — MATCH ARABIC VERSION
===================================================== */


const BANK_FLAG_CODES: Record<string, string> = {
  fed: "us",
  ecb: "eu",
  boe: "gb",
  boj: "jp",
  boc: "ca",
  rba: "au",
  snb: "ch",
  rbnz: "nz",
};

function BankMark({
  bank,
  large = false,
}: {
  bank: Bank;
  large?: boolean;
}) {
  const currencyFlags: Record<string, string> = {
    USD: "us",
    EUR: "eu",
    GBP: "gb",
    JPY: "jp",
    CAD: "ca",
    AUD: "au",
    CHF: "ch",
    NZD: "nz",
  };

  const code =
    BANK_FLAG_CODES[bank.slug] ||
    currencyFlags[bankCurrency(bank).toUpperCase()];

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ${
        large ? "h-10 w-12" : "h-9 w-11"
      }`}
    >
      {code ? (
        <img
          src={`https://flagcdn.com/${code}.svg`}
          alt={`Flag of ${bank.country_en || bankName(bank)}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-xl" aria-hidden="true">
          🏦
        </span>
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
  <Link
    href={`/en/interest-rates/${bank.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    title={`View ${bankName(bank)} details`}
    aria-label={`Open ${bankName(bank)} interest rate details in a new tab`}
    className="group inline-flex max-w-full items-center rounded-xl p-1 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
  >
    <div className="[&_.font-black]:group-hover:text-[#2471df]">
      <BankIdentity bank={bank} />
    </div>
  </Link>
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
                
<Link
  href={`/en/interest-rates/${bank.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  title={`View ${bankName(bank)} details`}
  aria-label={`Open ${bankName(bank)} interest rate details in a new tab`}
  className="group min-w-0 rounded-lg transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
>
  <div className="[&_.font-black]:group-hover:text-[#2471df]">
    <BankIdentity bank={bank} compact />
  </div>
</Link>


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
    HERO — ENGLISH / MATCHES ARABIC DESIGN
===================================================== */}

<section className="relative overflow-hidden border-b border-[#d6e5f8] bg-gradient-to-bl from-[#eef5fd] via-[#f7faff] to-white">
  <div className="pointer-events-none absolute -right-32 -top-40 h-[300px] w-[300px] rounded-full bg-blue-100/60 blur-[90px]" />
  <div className="pointer-events-none absolute -bottom-32 left-0 h-[240px] w-[240px] rounded-full bg-sky-100/50 blur-[80px]" />

  <div className="relative mx-auto max-w-[1520px] px-4 pb-5 pt-3 sm:px-6 sm:pb-5 sm:pt-4 lg:px-10 lg:pb-5 lg:pt-3">

    {/* BREADCRUMB */}
    <nav
      aria-label="Breadcrumb"
      className="mb-2 flex items-center gap-2 text-[10px] font-bold text-slate-500"
    >
      <Link
        href="/en"
        className="transition hover:text-[#2471df]"
      >
        Home
      </Link>

      <span className="text-slate-300">/</span>

      <span className="text-[#1e5bb8]">
        Interest Rates
      </span>
    </nav>

    <div className="grid items-stretch gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">

      {/* MAIN CONTENT */}
      <div className="flex min-w-0 flex-col lg:justify-between">

        {/* TITLE AND DESCRIPTION */}
        <div>
          <h1 className="mt-2 max-w-[850px] text-[30px] font-black leading-[1.22] tracking-tight text-[#091b32] sm:mt-4 sm:text-[44px] lg:mt-6 lg:text-[52px] lg:leading-[1.15]">
            {hubTitle === "Global Central Bank Interest Rates" ? (
              <>
                Global Central Bank
                <span className="block text-[#2471df]">
                  Interest Rates
                </span>
              </>
            ) : (
              hubTitle
            )}
          </h1>

          {/* MOBILE DESCRIPTION */}
          <p className="mt-3 text-[12px] font-medium leading-[1.9] text-slate-600 sm:hidden">
            Track interest rates from major central banks
            worldwide. Compare policy decisions, upcoming
            meetings and historical interest rate changes.
          </p>

          {/* TABLET AND DESKTOP DESCRIPTION */}
          <p className="mt-4 hidden max-w-[790px] text-[12px] font-medium leading-7 text-slate-600 sm:block sm:text-[13px] sm:leading-8">
            {intro}
          </p>
        </div>

        {/* STATISTICS AND BUTTONS */}
        <div className="mt-4 flex flex-col gap-3 lg:mt-auto lg:gap-4 lg:pt-5">

          {/* QUICK STATISTICS */}
          <div className="grid max-w-[630px] grid-cols-3 gap-2">
            {[
              {
                value: String(banks.length),
                label: "Central Banks",
              },
              {
                value: String(allMeetings.length),
                label: "Upcoming Meetings",
              },
              {
                value: String(allHistory.length),
                label: "Historical Decisions",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#d6e5f8] bg-white/90 px-1.5 py-3 text-center shadow-sm sm:px-3 sm:py-2.5 lg:px-2 lg:py-2.5"
              >
                <div
                  dir="ltr"
                  className="text-[22px] font-black leading-7 text-[#2471df] sm:text-xl sm:leading-6"
                >
                  {item.value}
                </div>

                <div className="mt-1 text-[10px] font-bold leading-4 text-slate-500">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE QUICK NAVIGATION */}
          <div className="grid grid-cols-2 gap-2 sm:hidden">
            <a
              href="#rates"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2471df] px-2 py-2 text-center text-[11px] font-black text-white shadow-sm transition hover:bg-[#1e5bb8]"
            >
              Compare Rates →
            </a>

            <a
              href="#calendar"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-blue-200 bg-white px-2 py-2 text-center text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-50"
            >
              Meeting Calendar →
            </a>

            <a
              href="#history"
              className="col-span-2 inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-[#d6e5f8] bg-[#eef5fd]/70 px-3 py-2 text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-100"
            >
              Explore Interest Rate History
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* TABLET AND DESKTOP QUICK NAVIGATION */}
          <div className="hidden flex-wrap items-center gap-2 sm:flex">
            <a
              href="#rates"
              className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#2471df] px-4 py-1.5 text-center text-[11px] font-black text-white transition hover:bg-[#1e5bb8]"
            >
              Compare Rates →
            </a>

            <a
              href="#calendar"
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-white px-4 py-1.5 text-center text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-50"
            >
              Meeting Calendar →
            </a>

            <a
              href="#history"
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-white px-4 py-1.5 text-center text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-50"
            >
              Rate History →
            </a>
          </div>
        </div>
      </div>

      {/* CENTRAL BANK RATES PANEL */}
      <aside className="w-full max-w-[510px] justify-self-center overflow-hidden rounded-[18px] border border-[#d6e5f8] bg-white p-3 shadow-[0_10px_30px_rgba(30,91,184,0.07)] lg:justify-self-end">

        {/* PANEL HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[9px] font-black text-[#2471df]">
              MONETARY POLICY DASHBOARD
            </p>

            <h2 className="mt-0.5 text-base font-black text-[#091b32]">
              Major Central Bank Rates
            </h2>
          </div>

          <span className="rounded-full border border-blue-100 bg-[#eef5fd] px-2.5 py-1 text-[9px] font-black text-[#1e5bb8]">
            Published Data
          </span>
        </div>

        {/* BANK RATES */}
        <div className="mt-3 space-y-2 lg:mt-2 lg:space-y-1.5">
          {["fed", "ecb", "boe", "boj"]
            .map((slug) =>
              banks.find((bank) => bank.slug === slug)
            )
            .filter((bank): bank is Bank => !!bank)
            .map((bank) => (
              <Link
                key={bank.slug}
                href={`/en/interest-rates/${bank.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[49px] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#f8fbff] px-3 py-2 transition hover:border-blue-300 hover:bg-[#eef5fd] hover:shadow-sm lg:min-h-0 lg:rounded-lg lg:px-2.5 lg:py-1.5"
              >
                <div className="flex min-w-0 items-center gap-2">

                  {/* MOBILE: BANK MARK / DESKTOP: FLAG */}
                  <div className="lg:hidden">
                    <BankMark bank={bank} />
                  </div>

                  <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-white text-xs font-black text-[#1e5bb8] lg:flex">
                    {bank.flag_emoji || bankCurrency(bank)}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[11px] font-black leading-5 text-[#091b32] transition group-hover:text-[#2471df] sm:text-xs">
                      {bankShortName(bank)}
                    </div>

                    <div
                      dir="ltr"
                      className="text-left text-[9px] leading-4 text-slate-400"
                    >
                      {bankCurrency(bank)}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    dir="ltr"
                    className="text-[15px] font-black text-[#2471df] sm:text-base lg:text-sm"
                  >
                    {rateLabel(bank)}
                  </span>

                  <span className="text-[10px] text-blue-400 transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
        </div>

        {/* NEXT MEETING */}
        {nextEvent && (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-blue-100 bg-[#eef5fd] px-3 py-3 lg:mt-2 lg:flex-wrap lg:rounded-lg lg:px-2.5 lg:py-2">
            <div className="min-w-0">
              <p className="text-[9px] font-black text-[#2471df]">
                NEXT SCHEDULED ANNOUNCEMENT
              </p>

              <p className="mt-1 text-[11px] font-bold text-[#091b32] lg:mt-0.5">
                {bankShortName(nextEvent.bank)}
              </p>
            </div>

            <time
              dateTime={nextEvent.meeting.meeting_date}
              className="shrink-0 text-[11px] font-black text-[#1e5bb8]"
            >
              {dateEn(nextEvent.meeting.meeting_date)}
            </time>
          </div>
        )}

        {/* DATA NOTE */}
        <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3 lg:mt-2 lg:pt-2">
          <span className="shrink-0 text-[12px] text-blue-500 lg:text-[10px]">
            ⓘ
          </span>

          <p className="text-[10px] leading-[1.8] text-slate-500 lg:text-[9px] lg:leading-4">
            Rates are based on published data, not live
            streaming quotes. Select any central bank
            to view its detailed information.
          </p>
        </div>
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
    CURRENT INTEREST RATES — ENGLISH
    MATCHES ARABIC DESIGN
===================================================== */}

<section
  id="rates"
  className="scroll-mt-20 bg-[#f4f7fb] pb-7 pt-4 sm:pb-12 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* SECTION INTRO — NO BADGE */}
    <div className="mb-4 text-left sm:mb-6">
      <h2 className="text-[22px] font-black leading-[1.4] tracking-tight text-[#091b32] sm:text-[32px] sm:leading-[1.35] lg:text-[36px]">
        Current Interest Rates by Central Bank
      </h2>

      {/* MOBILE DESCRIPTION */}
      <p className="mt-2 text-left text-[12px] font-medium leading-[1.9] text-slate-600 sm:hidden">
        Compare current interest rates from 8 major central
        banks worldwide, including their latest policy
        decisions, upcoming meetings and official sources.
      </p>

      {/* TABLET AND DESKTOP DESCRIPTION */}
      <p className="mt-2 hidden text-justify text-[13px] font-medium leading-7 text-slate-600 sm:block sm:text-[15px] sm:leading-8">
        {comparisonIntro}
      </p>
    </div>

    {/* CENTRAL BANK COMPARISON TABLE */}
    <RateTable
      banks={banks}
      today={today}
    />

    {/* ADDITIONAL INFORMATION — DESKTOP */}
    <div className="mt-5 hidden gap-3 md:grid md:grid-cols-3">
      {[
        {
          title: "US Federal Reserve Interest Rates",
          text: "The Federal Reserve sets a target range for the federal funds rate rather than a single policy rate.",
        },
        {
          title: "European Central Bank Interest Rates",
          text: "ECB interest rate comparisons should identify the benchmark used, such as the deposit facility rate.",
        },
        {
          title: "Different Monetary Policy Benchmarks",
          text: "Differences between headline interest rates do not necessarily indicate equivalent levels of monetary policy restrictiveness.",
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
    CENTRAL BANK MEETING CALENDAR — ENGLISH
    RESPONSIVE / MATCHES ARABIC STYLE
===================================================== */}

<section
  id="calendar"
  className="scroll-mt-20 bg-white pb-7 pt-5 sm:pb-12 sm:pt-8"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* SECTION HEADING — NO EYEBROW BADGE */}
    <div className="mb-4 sm:mb-6">
      <h2 className="text-[22px] font-black leading-[1.4] tracking-tight text-[#091b32] sm:text-[32px] lg:text-[36px]">
        Central Bank Interest Rate Meeting Calendar
      </h2>

      <p className="mt-2 text-[12px] font-medium leading-[1.9] text-slate-600 sm:hidden">
        Track upcoming central bank meetings, interest rate
        decisions and official announcement dates worldwide.
      </p>

      <p className="mt-2 hidden text-[13px] font-medium leading-8 text-slate-600 sm:block sm:text-[15px]">
        {meetingsIntro}
      </p>
    </div>

    {/* CALENDAR CONTAINER */}
    <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.055)] sm:rounded-[24px]">

      {/* CALENDAR HEADER */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-white to-[#eef5fd] p-3.5 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-black leading-6 text-[#091b32] sm:text-[22px]">
              Upcoming Interest Rate Decisions
            </h3>

            <p className="mt-1 text-[10.5px] leading-5 text-slate-500 sm:text-xs">
              Official central bank meeting schedules
            </p>
          </div>

          <span className="shrink-0 rounded-lg border border-blue-200 bg-white px-2.5 py-2 text-[10px] font-black text-[#1e5bb8] sm:rounded-xl sm:px-3 sm:text-xs">
            {filteredMeetings.length} Meetings
          </span>
        </div>

        {/* FILTERS */}
        <div className="mt-3 sm:mt-4">
          <CalendarFilters
            key={`${selectedBank}-${selectedYear}`}
            selectedBank={selectedBank}
            selectedYear={selectedYear}
            bankOptions={bankOptions}
            yearOptions={calendarYearOptions}
          />
        </div>

        {(selectedBank !== "all" ||
          selectedYear !== "all") && (
          <Link
            href={`${PAGE}#calendar`}
            className="mt-3 inline-flex text-[11px] font-black text-[#1e5bb8] underline underline-offset-4 hover:text-[#2471df]"
          >
            Reset All Filters
          </Link>
        )}
      </div>

      {/* =====================================================
          DESKTOP TABLE
      ===================================================== */}

      <div className="hidden md:block">
        <table className="w-full table-fixed text-center">
          <thead className="bg-[#0b2949] text-white">
            <tr className="text-[11px] lg:text-xs">
              <th className="w-[25%] px-4 py-4 text-left font-black">
                Central Bank
              </th>

              <th className="w-[11%] px-3 py-4 font-black">
                Currency
              </th>

              <th className="w-[19%] px-3 py-4 font-black">
                Decision Date
              </th>

              <th className="w-[14%] px-3 py-4 font-black">
                Time (UTC)
              </th>

              <th className="w-[13%] px-3 py-4 font-black">
                Status
              </th>

              <th className="w-[18%] px-3 py-4 font-black">
                Official Source
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleMeetings.map(
              ({ bank, meeting }, index) => {
                const hasTimezone =
                  !!meeting.announcement_at &&
                  /(?:Z|[+-]\d{2}:?\d{2})$/.test(
                    meeting.announcement_at
                  );

                const announcementTime =
                  hasTimezone &&
                  meeting.announcement_at &&
                  !Number.isNaN(
                    new Date(
                      meeting.announcement_at
                    ).getTime()
                  )
                    ? `${new Intl.DateTimeFormat(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hourCycle: "h23",
                          timeZone: "UTC",
                        }
                      ).format(
                        new Date(
                          meeting.announcement_at
                        )
                      )} UTC`
                    : "Not specified";

                return (
                  <tr
                    key={`${bank.slug}-${
                      meeting.id ||
                      meeting.meeting_date
                    }-${index}`}
                    className={`border-t border-slate-200 ${
                      index % 2
                        ? "bg-slate-50/70"
                        : "bg-white"
                    } transition hover:bg-blue-50/50`}
                  >
                    <td className="px-4 py-3 text-left">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">
                          {bank.flag_emoji || "🌐"}
                        </span>

                        <Link
  href={`${PAGE}/${bank.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-[11px] font-black leading-5 text-[#091b32] hover:text-[#2471df] hover:underline lg:text-xs"
>
  {bankName(bank)}
</Link>
                      </div>
                    </td>

                    <td className="px-3 py-3 text-xs font-bold text-slate-600">
                      {bankCurrency(bank)}
                    </td>

                    <td className="px-3 py-3 text-xs font-black text-slate-900">
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

                    <td className="px-3 py-3 text-[11px] font-bold text-slate-600">
                      {announcementTime}
                    </td>

                    <td className="px-3 py-3">
                      <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700">
                        Scheduled
                      </span>
                    </td>

                    <td className="px-3 py-3">
                      <SourceLink
                        href={
                          safeUrl(
                            meeting.reference_calendar_url
                          ) ||
                          calendarSource(bank)
                        }
                        label="Calendar"
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          MOBILE CARDS
      ===================================================== */}

      <div className="grid gap-2.5 bg-[#f8fafc] p-2.5 sm:grid-cols-2 sm:p-4 md:hidden">
        {(showAllMeetings ? visibleMeetings : visibleMeetings.slice(0, 5)).map(
          ({ bank, meeting }, index) => {
            const hasTimezone =
              !!meeting.announcement_at &&
              /(?:Z|[+-]\d{2}:?\d{2})$/.test(
                meeting.announcement_at
              );

            const announcementTime =
              hasTimezone &&
              meeting.announcement_at &&
              !Number.isNaN(
                new Date(
                  meeting.announcement_at
                ).getTime()
              )
                ? `${new Intl.DateTimeFormat(
                    "en-GB",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hourCycle: "h23",
                      timeZone: "UTC",
                    }
                  ).format(
                    new Date(
                      meeting.announcement_at
                    )
                  )} UTC`
                : "Not specified";

            return (
              <article
                key={`${bank.slug}-${
                  meeting.id ||
                  meeting.meeting_date
                }-${index}`}
                className="rounded-[14px] border border-slate-200 bg-white p-3 shadow-sm"
              >
                {/* BANK NAME AND CURRENCY */}
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    
<Link
  href={`/en/interest-rates/${bank.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  title={`View ${bankName(bank)} details`}
  aria-label={`Open ${bankName(bank)} details in a new tab`}
  className="group inline-flex max-w-full items-center rounded-xl p-1 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
>
  <div className="[&_.font-black]:group-hover:text-[#2471df]">
    <BankIdentity bank={bank} compact />
  </div>
</Link>

                  </div>

                  <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-700">
                    {bankCurrency(bank)}
                  </span>
                </div>

                {/* MEETING INFORMATION */}
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-[#f4f7fb] p-2.5">
                  <div>
                    <p className="text-[10px] font-medium text-slate-500">
                      Decision Date
                    </p>

                    <time
                      dateTime={
                        meeting.meeting_date
                      }
                      className="mt-1 block text-[11px] font-black leading-5 text-[#091b32]"
                    >
                      {dateEn(
                        meeting.meeting_date
                      )}
                    </time>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-slate-500">
                      Time (UTC)
                    </p>

                    <p className="mt-1 text-[11px] font-black leading-5 text-[#091b32]">
                      {announcementTime}
                    </p>
                  </div>
                </div>

                {/* STATUS AND SOURCE */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700">
                    Scheduled
                  </span>

                  <SourceLink
                    href={
                      safeUrl(
                        meeting.reference_calendar_url
                      ) ||
                      calendarSource(bank)
                    }
                    label="Official Calendar"
                  />
                </div>
              </article>
            );
          }
        )}
      </div>

      {/* SHOW MORE / SHOW LESS */}
      {filteredMeetings.length > 5 && (
        <div className="flex justify-center border-t border-slate-200 bg-white px-3 py-4 sm:px-4">
          <Link
            href={
              showAllMeetings
                ? `${PAGE}?bank=${encodeURIComponent(
                    selectedBank
                  )}&year=${encodeURIComponent(
                    selectedYear
                  )}#calendar`
                : `${PAGE}?bank=${encodeURIComponent(
                    selectedBank
                  )}&year=${encodeURIComponent(
                    selectedYear
                  )}&show_all=1#calendar`
            }
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#2471df] px-5 py-2.5 text-center text-[11px] font-black text-white transition hover:bg-[#1e5bb8] sm:text-xs"
          >
            {showAllMeetings ? (
  <>
    <span className="md:hidden">Show First 5 Meetings</span>
    <span className="hidden md:inline">Show First 15 Meetings</span>
  </>
) : (
  `View All Meetings (${filteredMeetings.length})`
)}
          </Link>
        </div>
      )}

      {/* EMPTY STATE */}
      {!filteredMeetings.length && (
        <div className="p-4">
          <EmptyState text="No upcoming meetings match the selected filters." />
        </div>
      )}

      {/* DATA NOTE */}
      <div className="border-t border-slate-200 bg-slate-50 px-3.5 py-3 text-[10.5px] leading-6 text-slate-600 sm:px-6 sm:text-[11px]">
        Meeting dates may change. Announcement times are
        displayed in UTC only when a timezone-qualified
        timestamp is available. Not every central bank
        meeting results in an interest rate adjustment.
      </div>
    </div>
  </div>
</section>


      

{/* =====================================================
    HISTORY + CHART — ENGLISH
    SAME LAYOUT AS ARABIC
===================================================== */}

<section
  id="history"
  className="scroll-mt-20 bg-[#f4f7fb] pt-5 pb-8 sm:pt-7 sm:pb-10"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* MOBILE HEADING ONLY */}
    <div className="mb-4 text-left sm:hidden">
      <h2 className="text-[22px] font-black leading-[1.4] tracking-tight text-[#091b32]">
        Interest Rate History
      </h2>

      <p className="mt-2 text-[12px] leading-[1.85] text-slate-600">
        Explore historical interest rates and central bank
        decisions, including rate hikes, cuts and holds,
        through interactive charts and historical records.
      </p>
    </div>

    {/* TABLET AND DESKTOP — SAME AS ARABIC */}
    <div className="hidden sm:block">
      <SectionHeading
        eyebrow="HISTORICAL RATE DATA"
        title="Central Bank Interest Rate History"
        description={historyIntro}
      />
    </div>

    {/* INTERACTIVE CHART AND HISTORY */}
    <HistoryExplorer
      banks={banks.map((bank) => ({
        slug: bank.slug,
        name: bankShortName(bank),
        officialUrl: officialSource(bank),
        history: getHistory(bank).map((row) => ({
          date: row.date,
          rate: row.rate,
          previousRate: row.previousRate,
          changeBps: row.changeBps,
          type: row.type,
        })),
      }))}
    />

  </div>
</section>

    

{/* =====================================================
    RECENT CENTRAL BANK DECISIONS — ENGLISH
    EXACT ARABIC LAYOUT / LATEST 5 BANKS
===================================================== */}

<section
  id="decisions"
  className="scroll-mt-20 bg-white pb-8 pt-5 sm:pb-10 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* SECTION HEADING */}
    <div className="mb-4 sm:mb-6">
      <h2 className="text-[22px] font-black leading-[1.4] tracking-tight text-[#091b32] sm:text-[32px] lg:text-[36px]">
        Latest 5 Interest Rate Decisions
      </h2>

      <p className="mt-2 text-[12px] leading-[1.9] text-slate-600 sm:hidden">
        Follow the latest five central bank interest rate
        decisions, from the most recent to the oldest,
        with a comparison of previous and new rates.
      </p>

      <p className="mt-2 hidden text-[13px] leading-8 text-slate-600 sm:block sm:text-[15px]">
        Track the five latest recorded monetary policy
        decisions from major central banks worldwide,
        ordered by date, with previous rates, new rates
        and changes measured in basis points.
      </p>
    </div>

    {/* LATEST DECISIONS — ONE PER CENTRAL BANK */}
    {(() => {
      
const latestDecisions = banks
  .map((bank) => {
    const latestRow = getHistory(bank)
      .sort((a, b) => b.date.localeCompare(a.date))[0];

    return latestRow
      ? { bank, row: latestRow }
      : null;
  })
  .filter(
    (item): item is {
      bank: Bank;
      row: HistoryRow;
    } => item !== null
  )
  .sort((a, b) =>
    b.row.date.localeCompare(a.row.date)
  )
  .slice(0, 5);


      return latestDecisions.length > 0 ? (
        <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)]">

          {/* LIST HEADER */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-5">
            <span className="text-[11px] font-black text-slate-700 sm:text-xs">
              Latest Monetary Policy Decisions
            </span>

            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black text-blue-700">
              {latestDecisions.length} Decisions
            </span>
          </div>

          {/* DECISION ROWS */}
          <div className="divide-y divide-slate-200">
            {latestDecisions.map(({ bank, row }) => (
              <article
                key={`${bank.slug}-${row.date}`}
                className="px-4 py-4 transition hover:bg-blue-50/30 sm:px-5"
              >
                {/* BANK NAME + STATUS */}
                <div className="flex items-center justify-between gap-3">

                  <Link
                    href={`${PAGE}/${bank.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group min-w-0"
                  >
                    <div className="transition group-hover:opacity-75">
                      <BankIdentity
                        bank={bank}
                        compact
                      />
                    </div>
                  </Link>

                  <span
                    className={`inline-flex shrink-0 items-center rounded-lg border px-2.5 py-1.5 text-[10px] font-black sm:px-3 sm:text-[11px] ${
                      row.changeBps == null
                        ? "border-slate-200 bg-slate-50 text-slate-600"
                        : row.changeBps > 0
                        ? "border-rose-200 bg-rose-50 text-rose-700"
                        : row.changeBps < 0
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-blue-200 bg-blue-50 text-blue-700"
                    }`}
                  >
                    {changeLabel(row.changeBps)}
                  </span>
                </div>

                {/* FOUR INFORMATION BOXES */}
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">

                  {/* DECISION DATE */}
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-bold text-slate-500">
                      Decision Date
                    </p>

                    <p className="mt-1 text-[11px] font-black text-slate-900">
                      {dateEn(row.date)}
                    </p>
                  </div>

                  {/* PREVIOUS RATE */}
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-bold text-slate-500">
                      Previous Rate
                    </p>

                    <p
                      dir="ltr"
                      className="mt-1 text-sm font-black text-slate-900"
                    >
                      {formatRate(row.previousRate)}
                    </p>
                  </div>

                  {/* NEW RATE */}
                  <div className="rounded-xl bg-[#eef5fd] p-3 text-center">
                    <p className="text-[10px] font-bold text-slate-500">
                      New Rate
                    </p>

                    <p
                      dir="ltr"
                      className="mt-1 text-sm font-black text-[#1e5bb8]"
                    >
                      {formatRate(row.rate)}
                    </p>
                  </div>

                  {/* RATE CHANGE */}
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-bold text-slate-500">
                      Rate Change
                    </p>

                    <p
                      dir="ltr"
                      className={`mt-1 text-sm font-black ${changeClass(
                        row.changeBps
                      )}`}
                    >
                      {row.changeBps == null
                        ? "—"
                        : `${row.changeBps > 0 ? "+" : ""}${row.changeBps} bps`}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-5">
            <p className="text-[10px] leading-5 text-slate-500">
              Decisions are based on the latest available
              historical records.
            </p>

            <a
              href="#history"
              className="text-[11px] font-black text-[#1e5bb8] transition hover:underline"
            >
              View Full Interest Rate History →
            </a>
          </div>
        </div>
      ) : (
        <EmptyState text="No historical interest rate decisions are currently available." />
      );
    })()}

  </div>
</section>



     
{/* =====================================================
    CENTRAL BANK DIRECTORY — ENGLISH
    MATCHES ARABIC DESKTOP AND MOBILE
===================================================== */}

<section
  id="banks"
  className="scroll-mt-20 bg-[#f4f7fb] pb-7 pt-4 sm:pb-10 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* MOBILE SECTION HEADING */}
    <div className="mb-4 text-left md:hidden">
      <h2 className="text-[21px] font-black leading-[1.45] tracking-tight text-[#071c34]">
        Central Bank Directory
        <span className="block text-[#2471df]">
          & Global Interest Rates
        </span>
      </h2>

      <p className="mt-2 text-[12px] leading-[1.85] text-slate-600">
        Explore current interest rates from 8 major central
        banks, their upcoming decisions, detailed profiles
        and historical rate records.
      </p>
    </div>

    {/* TABLET AND DESKTOP SECTION HEADING */}
    <div className="hidden md:block">
      <SectionHeading
  eyebrow=""
  title="Global Central Bank Directory and Interest Rates"
  description="Explore major central banks worldwide, including the US Federal Reserve, European Central Bank, Bank of England and Bank of Japan. Compare current policy interest rates, monetary policy objectives and upcoming meeting dates for each central bank."
/>
    </div>

    {/* BANK DIRECTORY GRID */}
    <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
      {banks.map((bank) => {
        const next = getNextMeeting(bank, today);
        const details = BANK_DETAILS[bank.slug];

        return (
          <article
            key={bank.slug}
            className="flex h-full min-w-0 flex-col rounded-[17px] border border-slate-200 bg-white p-3 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:rounded-[18px] sm:p-4"
          >
            {/* BANK HEADER */}
            <div className="flex min-h-[42px] items-center justify-between gap-2 sm:min-h-[48px]">
              <Link
                href={`/en/interest-rates/${bank.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 flex-1 items-center gap-2"
              >
                {/* COUNTRY FLAG */}
                <BankMark bank={bank} large />

                {/* BANK NAME */}
                <div className="min-w-0 flex-1 text-left">
                  <h3
                    className="text-[12px] font-black leading-[1.5] text-slate-950 transition group-hover:text-[#2471df] sm:truncate sm:text-[12px] sm:leading-5"
                    title={bankName(bank)}
                  >
                    {bankName(bank)}
                  </h3>

                  <p
                    dir="ltr"
                    className="mt-0.5 truncate text-left text-[9px] text-slate-500"
                  >
                    {bank.country_en || details?.country || ""}
                  </p>
                </div>
              </Link>

              {/* CURRENT INTEREST RATE */}
              <span
                dir="ltr"
                className="shrink-0 rounded-lg bg-blue-50 px-2 py-1.5 text-[12px] font-black text-[#1e5bb8] sm:py-2"
              >
                {rateLabel(bank)}
              </span>
            </div>

            {/* BANK DESCRIPTION */}
            <div className="mt-2 min-h-[38px] overflow-hidden sm:mt-3 sm:h-[63px] sm:min-h-0">
              <p
                className="text-[11px] leading-[19px] text-slate-600 sm:leading-[21px]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {details?.description}
              </p>
            </div>

            {/* NEXT INTEREST RATE DECISION */}
            <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2.5 sm:mt-3 sm:py-3">
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500">
                  Next Rate Decision
                </p>

                <p className="mt-0.5 text-[11px] font-black text-slate-900 sm:mt-1">
                  {next
                    ? dateEn(next.meeting_date)
                    : "Not announced"}
                </p>
              </div>

              {/* CALENDAR ICON */}
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-white text-[#2471df] sm:h-8 sm:w-8"
              >
                ◷
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-3">
              <Link
                href={`/en/interest-rates/${bank.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-9 items-center justify-center rounded-lg bg-[#2471df] px-2 py-2 text-center text-[11px] font-black text-white transition hover:bg-[#1e5bb8] sm:text-[10px]"
              >
                Bank Details ↗
              </Link>

              <Link
                href={`${PAGE}?history_bank=${bank.slug}#history`}
                className="flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-2 py-2 text-center text-[11px] font-black text-blue-700 transition hover:bg-blue-100 sm:text-[10px]"
              >
                Rate History →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>


      
{/* =====================================================
    EDUCATIONAL GUIDE — ENGLISH
    MATCHES ARABIC DESKTOP AND MOBILE DESIGN
===================================================== */}

<section
  id="guide"
  className="scroll-mt-20 bg-white pb-6 pt-4 sm:pb-10 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* =====================================================
        TABLET AND DESKTOP
    ===================================================== */}

    <div className="hidden md:block">
      <SectionHeading
        title="What Are Interest Rates and How Do Central Banks Set Them?"
        description="Understanding interest rates goes beyond knowing the current percentage. It also involves how monetary policy decisions are made, market expectations and the future direction of monetary policy."
        eyebrow=""
      />

      {/* MAIN EDUCATIONAL CONTENT */}
      <div className="grid items-stretch gap-5 lg:grid-cols-[1.45fr_0.55fr]">

        <article className="flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-5 sm:p-6">
            <h3 className="text-[19px] font-black leading-8 text-slate-950 sm:text-[22px]">
              How Does a Central Bank Policy Rate Work?
            </h3>

            <p className="mt-3 text-[13px] leading-7 text-slate-700 sm:text-[14px] sm:leading-8">
              An interest rate is a percentage used to determine
              borrowing costs or returns on certain types of
              savings. Central banks set benchmark policy rates
              that influence financing costs across the economy.
              However, this does not mean that every loan or
              deposit carries the same interest rate.
            </p>

            <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8">
              Central banks use interest rates to influence
              borrowing costs, liquidity and economic demand.
              Tighter monetary policy may slow economic activity
              and reduce inflationary pressures, while lower
              rates may support financing and spending when
              economic conditions allow.
            </p>

            <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8">
              Monetary policy decisions are not based on inflation
              alone. Central banks also monitor employment,
              wages, economic growth, credit conditions and
              future expectations. Policy frameworks also differ
              across the United States, euro area, Japan and
              other major economies.
            </p>
          </div>

          {/* FOUR DECISION STAGES */}
          <div className="grid flex-1 auto-rows-fr gap-3 p-4 sm:grid-cols-2 sm:p-5">
            {[
              {
                n: "01",
                title: "Inflation Assessment",
                text: "Central banks review price trends, core inflation and future expectations.",
              },
              {
                n: "02",
                title: "Growth and Employment",
                text: "Policymakers examine labour markets, spending, output and financial conditions.",
              },
              {
                n: "03",
                title: "Interest Rate Decision",
                text: "The bank may raise, cut or hold its policy rate according to monetary policy objectives.",
              },
              {
                n: "04",
                title: "Forward Guidance",
                text: "Markets analyse statements, projections and press conferences for clues about future policy.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="flex h-full flex-col rounded-[15px] border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-black text-[#2471df]">
                    {item.n}
                  </span>

                  <h4 className="text-[14px] font-black leading-6 text-slate-950 sm:text-[15px]">
                    {item.title}
                  </h4>
                </div>

                <p className="mt-2 text-[12px] leading-6 text-slate-600 sm:text-[13px] sm:leading-7">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* TRADER CHECKLIST */}
        <aside className="flex h-full min-w-0 flex-col rounded-[20px] bg-[#071c34] p-5 text-white shadow-lg sm:p-6">
          <h3 className="text-[19px] font-black leading-8 sm:text-[21px]">
            What Should Traders Review Before a Rate Decision?
          </h3>

          <p className="mt-2 text-[12px] leading-7 text-slate-300 sm:text-[13px]">
            Do not focus on the announced rate alone.
            Compare the decision with market expectations
            and pay attention to the accompanying guidance.
          </p>

          <div className="mt-4 flex-1">
            {[
              "Current policy rate before the meeting",
              "Market expectations before the announcement",
              "Actual decision and size of the rate change",
              "Central bank statement and inflation outlook",
              "Governor's press conference",
              "Expectations for upcoming meetings",
              "Market volatility and trading spreads during the release",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 border-b border-white/10 py-2.5 last:border-0"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-[11px] font-black text-cyan-300">
                  ✓
                </span>

                <span className="text-[12px] font-bold leading-6 text-slate-200 sm:text-[13px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* EDUCATIONAL QUESTIONS */}
      <div className="mt-5 grid items-stretch gap-4 lg:grid-cols-2">

        <article className="h-full rounded-[20px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-6">
          <h3 className="text-[17px] font-black leading-7 text-slate-950 sm:text-[19px]">
            What Is the Difference Between Rate Hikes, Cuts and Holds?
          </h3>

          <p className="mt-3 text-[13px] leading-8 text-slate-600 sm:text-[14px]">
            <strong className="text-slate-900">
              Rate hike:
            </strong>{" "}
            Usually indicates tighter monetary policy and
            higher borrowing costs.{" "}
            <strong className="text-slate-900">
              Rate cut:
            </strong>{" "}
            Generally signals easier monetary conditions.{" "}
            <strong className="text-slate-900">
              Rate hold:
            </strong>{" "}
            Does not necessarily mean a neutral policy stance.
            A central bank may keep rates elevated while warning
            about inflation or signalling a possible future cut.
          </p>
        </article>

        <article className="h-full rounded-[20px] border border-slate-200 bg-[#f8fafc] p-5 sm:p-6">
          <h3 className="text-[17px] font-black leading-7 text-slate-950 sm:text-[19px]">
            Why Can Market Expectations Matter More Than the Decision?
          </h3>

          <p className="mt-3 text-[13px] leading-8 text-slate-600 sm:text-[14px]">
            If markets expect a 25-basis-point rate cut and the
            central bank delivers exactly that, the immediate
            reaction may be limited. However, an unexpected
            decision or a surprising change in forward guidance
            can trigger significant moves in currencies, bonds
            and gold, even without a major change in the
            announced policy rate.
          </p>
        </article>
      </div>

      {/* ADDITIONAL SUPABASE CONTENT */}
      {hub?.hub_educational_content_en?.trim() && (
        <div className="mt-5 rounded-[20px] border border-slate-200 bg-blue-50/40 p-5 sm:p-6">
          <h3 className="text-[18px] font-black leading-8 text-slate-950">
            Additional Information About Monetary Policy
          </h3>

          <div className="mt-3 space-y-3">
            {hub.hub_educational_content_en
              .trim()
              .split(/\n\s*\n/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="whitespace-pre-line text-[13px] leading-8 text-slate-700 sm:text-[14px]"
                >
                  {paragraph.trim()}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>

    {/* =====================================================
        MOBILE EDUCATIONAL GUIDE
    ===================================================== */}

    <div className="md:hidden" dir="ltr">

      <header className="mb-4 text-left">
        <h2 className="text-[21px] font-black leading-[1.45] text-[#071c34]">
          What Are Interest Rates and How Are They Set?
        </h2>

        <p className="mt-2 text-[12px] leading-6 text-slate-600">
          Learn how central banks make interest rate decisions
          and which economic factors they monitor.
        </p>
      </header>

      {/* MOBILE MAIN CARD */}
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="bg-blue-50/60 p-4">
          <h3 className="text-[16px] font-black text-slate-950">
            How Does a Central Bank Policy Rate Work?
          </h3>

          <p className="mt-2 text-[12px] leading-7 text-slate-700">
            Interest rates influence borrowing costs and savings
            returns. Central banks use policy rates to help
            manage inflation and economic activity.
          </p>

          <details className="group mt-2 border-t border-blue-100 pt-2">
            <summary className="flex cursor-pointer list-none items-center justify-between text-[12px] font-black text-[#2471df] [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                Read Full Explanation
              </span>
              <span className="hidden group-open:inline">
                Show Less
              </span>
              <span className="transition group-open:rotate-180">
                ⌄
              </span>
            </summary>

            <div className="mt-3 space-y-3 text-[12px] leading-7 text-slate-600">
              <p>
                Central banks set benchmark rates that influence
                financing costs across the economy. However,
                individual loans and deposits do not necessarily
                carry the same interest rate.
              </p>

              <p>
                Tighter monetary policy may slow economic activity
                and reduce inflationary pressures. Lower rates
                may support borrowing and spending when economic
                conditions allow.
              </p>

              <p>
                Decisions also reflect employment, wages,
                economic growth, credit conditions and future
                expectations. Monetary policy tools vary
                across economies.
              </p>
            </div>
          </details>
        </div>

        {/* FOUR MOBILE STAGES */}
        <div className="p-3">
          <h4 className="mb-3 text-[13px] font-black text-slate-900">
            How Are Interest Rate Decisions Made?
          </h4>

          <div className="grid grid-cols-2 gap-2">
            {[
              {
                n: "01",
                title: "Inflation",
                text: "Review prices and forecasts.",
              },
              {
                n: "02",
                title: "Growth & Jobs",
                text: "Analyse employment and activity.",
              },
              {
                n: "03",
                title: "Rate Decision",
                text: "Raise, cut or hold rates.",
              },
              {
                n: "04",
                title: "Guidance",
                text: "Review policy outlook.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-100 px-1.5 py-1 text-[10px] font-black text-blue-700">
                    {item.n}
                  </span>

                  <span className="text-[11px] font-black text-slate-900">
                    {item.title}
                  </span>
                </div>

                <p className="mt-2 text-[10px] leading-5 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* MOBILE TRADER CHECKLIST */}
      <aside className="mt-3 rounded-2xl bg-[#071c34] p-4 text-white shadow-sm">
        <h3 className="text-[15px] font-black">
          What Should Traders Check Before a Rate Decision?
        </h3>

        <p className="mt-1 text-[11px] leading-6 text-slate-300">
          Compare the decision with market expectations,
          not just the previous rate.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            "Rate before the meeting",
            "Market expectations",
            "Decision and rate change",
            "Central bank statement",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-1.5 rounded-lg bg-white/5 p-2 text-[10px] font-bold leading-5 text-slate-100"
            >
              <span className="text-cyan-300">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <details className="group mt-3 border-t border-white/15 pt-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-black text-cyan-200 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              Show More Checklist Items
            </span>
            <span className="hidden group-open:inline">
              Show Less
            </span>
            <span>⌄</span>
          </summary>

          <div className="mt-3 space-y-2 text-[11px] leading-6 text-slate-200">
            {[
              "Inflation forecasts",
              "Governor's press conference",
              "Expectations for future meetings",
              "Volatility and trading spreads during the release",
            ].map((item) => (
              <p key={item}>
                <span className="mr-2 text-cyan-300">✓</span>
                {item}
              </p>
            ))}
          </div>
        </details>
      </aside>

      {/* MOBILE ACCORDION QUESTIONS */}
      <div className="mt-3 space-y-2">

        <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
            <span>
              What Is the Difference Between Rate Hikes, Cuts and Holds?
            </span>
            <span className="shrink-0 text-blue-700 group-open:rotate-45">
              +
            </span>
          </summary>

          <p className="mt-3 border-t border-slate-200 pt-3 text-[12px] leading-7 text-slate-600">
            <strong>Rate hikes</strong> generally indicate
            tighter monetary policy and higher borrowing costs.{" "}
            <strong>Rate cuts</strong> usually signal easier
            monetary conditions. A <strong>rate hold</strong>{" "}
            does not necessarily mean a neutral stance, as the
            central bank may still signal future policy changes.
          </p>
        </details>

        <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
            <span>
              Why Do Market Expectations Matter So Much?
            </span>
            <span className="shrink-0 text-blue-700 group-open:rotate-45">
              +
            </span>
          </summary>

          <p className="mt-3 border-t border-slate-200 pt-3 text-[12px] leading-7 text-slate-600">
            A decision that matches market expectations may
            have a limited immediate effect. An unexpected
            decision or change in forward guidance can trigger
            significant movements in currencies, bonds and gold.
          </p>
        </details>

        {/* ADDITIONAL CONTENT — MOBILE */}
        {hub?.hub_educational_content_en?.trim() && (
          <details className="group rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
              <span>
                Additional Information About Monetary Policy
              </span>
              <span className="shrink-0 text-blue-700 group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="mt-3 whitespace-pre-line border-t border-blue-100 pt-3 text-[12px] leading-7 text-slate-600">
              {hub.hub_educational_content_en}
            </div>
          </details>
        )}
      </div>
    </div>
  </div>
</section>


      
{/* =====================================================
    MARKET IMPACT + RELATED CONTENT — ENGLISH
    MATCHES ARABIC DESKTOP AND MOBILE DESIGN
===================================================== */}

<section
  id="impact"
  className="scroll-mt-20 bg-[#f4f7fb] pb-7 pt-4 sm:pb-12 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* =========================================
        TABLET / DESKTOP
    ========================================= */}
    <div className="hidden md:block">

      <SectionHeading
        eyebrow="MONETARY POLICY IMPACT"
        title="How Do Interest Rates Affect Forex, Gold and Stocks?"
        description="Central bank decisions influence currencies, precious metals, stocks and bonds through investor expectations, borrowing costs and yields. However, market direction also depends on economic conditions and whether the decision surprises investors."
      />

      {/* FOUR MARKET CATEGORIES */}
      <div className="grid auto-rows-fr gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: "↗",
            title: "Forex and Currencies",
            text: "Expected interest rate differentials influence currency valuations and capital flows. Expectations for future policy decisions often matter more than the current rate alone.",
            accent: "blue",
          },
          {
            icon: "◇",
            title: "Gold and Precious Metals",
            text: "Gold responds to real yields, the US dollar, inflation expectations and global risks. There is no fixed or guaranteed relationship between interest rates and gold prices.",
            accent: "amber",
          },
          {
            icon: "▥",
            title: "Stocks and Indices",
            text: "Borrowing costs, discount rates and earnings expectations can influence equity valuations, with different effects across companies and economic sectors.",
            accent: "indigo",
          },
          {
            icon: "≋",
            title: "Bonds and Yields",
            text: "Bond yields reflect expectations for interest rates, inflation and risk. Short-term and long-term bonds may respond differently to monetary policy announcements.",
            accent: "cyan",
          },
        ].map((item) => {
          const accentClasses: Record<string, string> = {
            blue: "bg-blue-50 text-blue-700 border-blue-100",
            amber: "bg-amber-50 text-amber-700 border-amber-100",
            indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
            cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
          };

          return (
            <article
              key={item.title}
              className="flex h-full min-w-0 flex-col rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[22px] font-black ${accentClasses[item.accent]}`}
                >
                  {item.icon}
                </span>

                <h3 className="text-[15px] font-black leading-6 text-slate-950 sm:text-[16px]">
                  {item.title}
                </h3>
              </div>

              <p className="mt-3 text-[12px] leading-7 text-slate-600 sm:text-[13px]">
                {item.text}
              </p>
            </article>
          );
        })}
      </div>

      {/* DEEPER ANALYSIS */}
      <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-2">

        <article className="h-full rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-black text-[#2471df]"
            >
              $
            </span>

            <h3 className="text-[16px] font-black leading-7 text-slate-950 sm:text-[18px]">
              How Do Federal Reserve Interest Rates Affect the US Dollar?
            </h3>
          </div>

          <p className="text-[13px] leading-8 text-slate-600 sm:text-[14px]">
            US interest rate expectations influence yields on
            dollar-denominated assets. Higher expected yields
            may support the US dollar, but the outcome also
            depends on monetary policy in other economies,
            economic growth expectations and global risk
            sentiment. A Federal Reserve decision alone cannot
            determine the direction of the dollar.
          </p>
        </article>

        <article className="h-full rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-black text-[#2471df]"
            >
              ⇄
            </span>

            <h3 className="text-[16px] font-black leading-7 text-slate-950 sm:text-[18px]">
              How Do Interest Rate Differentials Affect Currency Pairs?
            </h3>
          </div>

          <p className="text-[13px] leading-8 text-slate-600 sm:text-[14px]">
            Forex traders often compare expected policy paths
            between central banks. For example, the outlook
            for Federal Reserve and ECB interest rates can
            influence EUR/USD. However, the current rate
            differential alone does not determine currency
            movements. Inflation, growth, future expectations
            and global risk conditions also matter.
          </p>
        </article>
      </div>

      {/* RELATED CONTENT — INTEGRATED */}
      <div className="mt-5 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-2 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <h2 className="text-[18px] font-black leading-7 text-slate-950 sm:text-[20px]">
            Explore More Markets with Broker Alarab
          </h2>

          <p className="text-[12px] leading-6 text-slate-500 sm:text-[13px]">
            Go beyond interest rate analysis with trading
            education and independent broker comparisons
            across the markets you follow.
          </p>
        </div>

        <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3 xl:grid-cols-5">
          {INTERNAL_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex h-full min-w-0 flex-col rounded-[14px] border border-slate-200 bg-[#f8fafc] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400">
                  Broker Alarab Guide
                </span>

                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[16px] font-bold text-[#2471df] ring-1 ring-slate-200 transition group-hover:bg-[#2471df] group-hover:text-white"
                >
                  →
                </span>
              </div>

              <h3 className="mt-3 text-[14px] font-black leading-6 text-slate-950 transition group-hover:text-[#1e5bb8]">
                {item.title}
              </h3>

              <p className="mt-2 flex-1 text-[12px] leading-6 text-slate-600">
                {item.description}
              </p>

              <span className="mt-3 text-[11px] font-black text-[#2471df]">
                Explore More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* =========================================
        MOBILE MARKET IMPACT
    ========================================= */}
    <div className="md:hidden" dir="ltr">

      <header className="mb-4 text-left">
        <h2 className="text-[21px] font-black leading-[1.45] text-[#071c34]">
          How Do Interest Rates Affect Markets?
        </h2>

        <p className="mt-2 text-[12px] leading-6 text-slate-600">
          Discover how central bank decisions affect currencies,
          gold, stocks and bonds.
        </p>
      </header>

      {/* TWO-COLUMN EXPANDABLE CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          {
            icon: "↗",
            title: "Forex and Currencies",
            short: "Rate differentials and FX expectations",
            text: "Expected interest rate differentials influence currency valuations and capital flows. Expectations for future policy decisions often matter more than the current rate alone.",
            color: "bg-blue-50 text-blue-700",
          },
          {
            icon: "◇",
            title: "Gold and Metals",
            short: "Real yields and the US dollar",
            text: "Gold responds to real yields, the US dollar, inflation expectations and global risks. There is no fixed or guaranteed relationship between interest rates and gold prices.",
            color: "bg-amber-50 text-amber-700",
          },
          {
            icon: "▥",
            title: "Stocks and Indices",
            short: "Borrowing costs and valuations",
            text: "Borrowing costs, discount rates and earnings expectations can influence equity valuations, with different effects across companies and economic sectors.",
            color: "bg-indigo-50 text-indigo-700",
          },
          {
            icon: "≋",
            title: "Bonds and Yields",
            short: "Interest rate and inflation outlook",
            text: "Bond yields reflect expectations for interest rates, inflation and risk. Short-term and long-term bonds may respond differently to monetary policy announcements.",
            color: "bg-cyan-50 text-cyan-700",
          },
        ].map((item) => (
          <details
            key={item.title}
            className="group min-w-0 self-start rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <div className="flex min-h-9 items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg font-black ${item.color}`}
                >
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1 text-[11px] font-black leading-5 text-slate-950">
                  {item.title}
                </span>
              </div>

              <span className="mt-1 block text-[10px] leading-5 text-slate-500">
                {item.short}
              </span>

              <span className="mt-2 block border-t border-slate-100 pt-2 text-[10px] font-black text-blue-700">
                <span className="group-open:hidden">
                  View Details →
                </span>
                <span className="hidden group-open:inline">
                  Show Less ↑
                </span>
              </span>
            </summary>

            <p className="mt-2 text-[11px] leading-6 text-slate-600">
              {item.text}
            </p>
          </details>
        ))}
      </div>

      {/* MOBILE DEEPER ANALYSIS */}
      <div className="mt-3 space-y-2">

        <details className="group rounded-xl border border-slate-200 bg-white p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
            <span>
              How Do Fed Rates Affect the US Dollar?
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-blue-700 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <p className="mt-3 border-t border-slate-100 pt-3 text-[12px] leading-7 text-slate-600">
            US interest rate expectations influence yields on
            dollar-denominated assets. Higher expected yields
            may support the dollar, but the result also depends
            on other economies, global risk sentiment and growth
            expectations. A Fed decision alone cannot determine
            the dollar's direction.
          </p>
        </details>

        <details className="group rounded-xl border border-slate-200 bg-white p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13px] font-black text-slate-950 [&::-webkit-details-marker]:hidden">
            <span>
              How Do Rate Differentials Affect Forex Pairs?
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-blue-700 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <p className="mt-3 border-t border-slate-100 pt-3 text-[12px] leading-7 text-slate-600">
            Traders compare expected policy paths between
            central banks, such as the Fed and ECB, to understand
            EUR/USD movements. But the current rate differential
            is only one factor. Future expectations, inflation,
            growth and global risks also influence exchange rates.
          </p>
        </details>
      </div>

      {/* MOBILE RELATED CONTENT */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-4">
          <h2 className="text-[16px] font-black text-slate-950">
            Explore More with Broker Alarab
          </h2>

          <p className="mt-1 text-[11px] leading-6 text-slate-500">
            Trading guides and broker comparisons to help
            you explore financial markets.
          </p>
        </div>

        <div className="divide-y divide-slate-100 px-3">
          {INTERNAL_LINKS.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between gap-3 py-3"
            >
              <div className="min-w-0">
                <h3 className="text-[12px] font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-1 line-clamp-1 text-[10px] text-slate-500">
                  {item.description}
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-sm font-black text-blue-700">
                →
              </span>
            </Link>
          ))}

          {INTERNAL_LINKS.length > 3 && (
            <details className="group py-3">
              <summary className="cursor-pointer list-none text-center text-[11px] font-black text-blue-700 [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">
                  View More Guides →
                </span>
                <span className="hidden group-open:inline">
                  Show Less ↑
                </span>
              </summary>

              <div className="mt-2 divide-y divide-slate-100">
                {INTERNAL_LINKS.slice(3).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between gap-2 py-3"
                  >
                    <div className="min-w-0">
                      <h3 className="text-[12px] font-black text-slate-950">
                        {item.title}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-[10px] text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <span className="text-blue-700">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>

  </div>
</section>


      
{/* =====================================================
    FAQ — ENGLISH
    RESPONSIVE / SUPABASE CONTENT
===================================================== */}

<section
  id="faq"
  className="scroll-mt-20 bg-[#f4f7fb] pb-7 pt-4 sm:pb-10 sm:pt-7"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* MOBILE HEADING */}
    <div className="mb-4 text-left md:hidden">
      <h2 className="text-[21px] font-black leading-[1.45] text-[#071c34]">
        Frequently Asked Questions
      </h2>

      <p className="mt-2 text-[12px] leading-6 text-slate-600">
        Answers to common questions about central bank
        interest rates, upcoming meetings and monetary policy.
      </p>
    </div>

    {/* TABLET AND DESKTOP HEADING */}
    <div className="hidden md:block">
      <SectionHeading
        eyebrow=""
        title="Frequently Asked Questions About Interest Rates"
        description="Find answers to common questions about global interest rates, central bank meetings, monetary policy decisions and their effects on financial markets."
      />
    </div>

    {/* FAQ ITEMS */}
    <div className="grid items-start gap-2 md:grid-cols-2 md:gap-3">
      {faqs.map((faq, index) => (
        <details
          key={`${index}-${faq.q}`}
          className="group overflow-hidden rounded-[13px] border border-slate-200 bg-white transition open:border-blue-200 open:shadow-sm sm:rounded-[15px]"
        >
          <summary className="flex min-h-[54px] cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-left text-[12px] font-black leading-6 text-slate-900 marker:hidden sm:min-h-[60px] sm:px-6 sm:py-4 sm:text-[14px] [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1">
              {faq.q}
            </span>

            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-[18px] font-black text-blue-700 transition-transform group-open:rotate-45 sm:h-8 sm:w-8"
            >
              +
            </span>
          </summary>

          <div className="border-t border-slate-100 px-3.5 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
            <p className="whitespace-pre-line text-left text-[12px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8">
              {faq.a}
            </p>
          </div>
        </details>
      ))}
    </div>

  </div>
</section>



{/* =====================================================
    SOURCES AND METHODOLOGY — ENGLISH
    IMPROVED MOBILE READABILITY
===================================================== */}

<section
  id="methodology"
  className="scroll-mt-20 bg-white pb-8 pt-5 sm:pb-12 sm:pt-8"
>
  <div className="mx-auto max-w-[1520px] px-3 sm:px-6 lg:px-10">

    {/* MOBILE HEADING */}
    <div className="mb-4 md:hidden">
      <h2 className="text-[22px] font-black leading-[1.4] text-[#071c34]">
        Data Sources & Methodology
      </h2>

      <p className="mt-2 text-[13px] leading-7 text-slate-600">
        How Broker Alarab collects and presents central bank
        interest rates, meeting schedules and historical decisions.
      </p>
    </div>

    <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm sm:rounded-[22px]">

      {/* METHODOLOGY INTRO */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-4 sm:p-7">

        <h2 className="hidden text-[24px] font-black text-slate-950 md:block">
          Interest Rate Data Sources and Methodology
        </h2>

        {/* MOBILE SUMMARY */}
        <div className="md:hidden">
          <p className="text-[13px] leading-7 text-slate-700">
            We use published central bank information to
            present interest rates, upcoming meetings and
            historical monetary policy decisions.
          </p>

          <details className="group mt-3 border-t border-blue-100 pt-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13px] font-black text-[#1e5bb8] [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                Read Full Methodology
              </span>

              <span className="hidden group-open:inline">
                Show Less
              </span>

              <span
                aria-hidden="true"
                className="text-lg transition group-open:rotate-180"
              >
                ⌄
              </span>
            </summary>

            <p className="mt-3 whitespace-pre-line text-[13px] leading-7 text-slate-700">
              {methodology}
            </p>
          </details>
        </div>

        {/* DESKTOP FULL TEXT */}
        <p className="mt-4 hidden whitespace-pre-line text-[14px] leading-8 text-slate-600 md:block">
          {methodology}
        </p>
      </div>

      {/* OFFICIAL SOURCES */}
      <div className="p-3 sm:p-7">

        <div className="mb-4">
          <h3 className="text-[16px] font-black text-slate-950 sm:text-[18px]">
            Official Central Bank Sources
          </h3>

          <p className="mt-1 text-[12px] leading-6 text-slate-500 sm:text-[13px]">
            Check official interest rate announcements and
            meeting calendars directly with each central bank.
          </p>
        </div>

        {/* SOURCE CARDS */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {banks.map((bank) => (
            <article
              key={bank.slug}
              className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-[#f8fafc] p-3 sm:p-4"
            >
              <h4 className="flex min-h-[42px] items-center justify-center text-center text-[12px] font-black leading-5 text-slate-900 sm:text-[13px]">
                {bankShortName(bank)}
              </h4>

              <div className="mt-3 grid grid-cols-2 gap-1.5">
                <div className="min-w-0 [&>a]:!flex [&>a]:!min-h-[38px] [&>a]:!w-full [&>a]:!items-center [&>a]:!justify-center [&>a]:!px-1 [&>a]:!text-[11px] sm:[&>a]:!text-[12px]">
                  <SourceLink
                    href={officialSource(bank)}
                    label="Rates"
                  />
                </div>

                <div className="min-w-0 [&>a]:!flex [&>a]:!min-h-[38px] [&>a]:!w-full [&>a]:!items-center [&>a]:!justify-center [&>a]:!px-1 [&>a]:!text-[11px] sm:[&>a]:!text-[12px]">
                  <SourceLink
                    href={calendarSource(bank)}
                    label="Meetings"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* DISCLAIMER */}
        <div className="mt-5 overflow-hidden rounded-xl border border-amber-200 bg-amber-50">

          <details className="group md:hidden">
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 p-3.5 text-[13px] font-black text-amber-950 [&::-webkit-details-marker]:hidden">
              <span>Data Accuracy Disclaimer</span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xl font-black text-amber-800 transition group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="whitespace-pre-line border-t border-amber-200 p-3.5 text-[13px] leading-7 text-amber-900">
              {disclaimer}
            </p>
          </details>

          <div className="hidden p-5 md:block">
            <h3 className="text-[15px] font-black text-amber-950">
              Data Accuracy Disclaimer
            </h3>

            <p className="mt-2 whitespace-pre-line text-[14px] leading-8 text-amber-900">
              {disclaimer}
            </p>
          </div>
        </div>

        {/* DATA TRANSPARENCY */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:p-4">
          <p className="text-[12px] leading-7 text-slate-600 sm:text-[13px]">
            Interest rates, meeting schedules and historical
            decisions are maintained in the Broker Alarab
            database. Official central bank links are provided
            for independent verification. Published data may
            change after the page loads, and database retrieval
            does not represent continuous real-time verification.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>


    </main>
  );
}
