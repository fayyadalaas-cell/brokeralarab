
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const SITE = "https://brokeralarab.com";
const HUB = "/en/interest-rates";

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

// =====================================================
// TYPES
// =====================================================

type Meeting = {
  id?: string;
  meeting_date?: string;
  announcement_at?: string | null;
  effective_date?: string | null;
  status?: string;
  decision_type?: string | null;
  decision_rate?: number | null;
  previous_rate?: number | null;
  change_bps?: number | null;
  decision_source_url?: string | null;
  reference_calendar_url?: string | null;
  verification_status?: string | null;
};

type History = {
  date?: string;
  decision_date?: string;
  meeting_date?: string;
  effective_date?: string;
  rate?: number | null;
  decision_rate?: number | null;
  previous_rate?: number | null;
  change_bps?: number | null;
  decision_type?: string | null;
  decision_source_url?: string | null;
  source_url?: string | null;
};

type Faq = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

type AnalysisSection = {
  title?: string;
  heading?: string;
  h2?: string;
  content?: string;
  body?: string;
  text?: string;
  description?: string;
};

type AdditionalSource = {
  title?: string;
  label?: string;
  name?: string;
  url?: string;
  href?: string;
};

type Bank = {
  slug: string;
  bank_code: string | null;

  bank_name_en: string;
  bank_short_name_en: string | null;
  country_en: string | null;

  currency_code: string | null;
  flag_emoji: string | null;
  bank_logo_url: string | null;

  current_rate: number | null;
  current_rate_lower: number | null;
  current_rate_upper: number | null;
  rate_format: string | null;

  rate_type_en: string | null;
  rate_description_en: string | null;
  comparison_rate_basis: string | null;

  previous_rate: number | null;
  last_change_bps: number | null;
  last_decision_date: string | null;
  last_decision_type: string | null;
  last_decision_source_url: string | null;
  last_rate_verified_at: string | null;

  meetings: Meeting[] | null;
  rate_history: History[] | null;

  hero_title_en: string | null;
  hero_description_en: string | null;
  overview_en: string | null;
  bank_role_en: string | null;
  monetary_policy_en: string | null;
  rate_history_analysis_en: string | null;
  economic_outlook_en: string | null;

  forex_impact_en: string | null;
  gold_impact_en: string | null;
  stocks_impact_en: string | null;
  bonds_impact_en: string | null;
  inflation_impact_en: string | null;

  analysis_sections_en: AnalysisSection[] | null;
  faq_en: Faq[] | null;

  seo_title_en: string | null;
  seo_description_en: string | null;
  seo_h1_en: string | null;
  seo_keywords_en: string[] | null;
  canonical_url_en: string | null;

  og_title_en: string | null;
  og_description_en: string | null;
  og_image_url: string | null;

  official_website: string | null;
  official_rates_url: string | null;
  official_calendar_url: string | null;
  official_history_url: string | null;
  additional_sources: AdditionalSource[] | null;

  methodology_en: string | null;
  data_disclaimer_en: string | null;
  content_reviewed_at: string | null;
  updated_at: string | null;
  is_published: boolean | null;
};

type Props = {
  params: Promise<{ bank: string }>;
};

type HistoryRow = {
  date: string;
  rate: number;
  previous: number | null;
  change: number | null;
  type: string | null;
  source: string | null;
};

// =====================================================
// HELPERS
// =====================================================

function number(value: unknown): number | null {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (
    typeof value === "string" &&
    value.trim() !== ""
  ) {
    const parsed = Number(value);

    return Number.isFinite(parsed)
      ? parsed
      : null;
  }

  return null;
}

function percentage(value: unknown): string {
  const n = number(value);

  return n === null
    ? "Not available"
    : `${n.toFixed(2)}%`;
}

function dateOnly(
  value?: string | null
): string | null {
  if (!value) return null;

  const match = value.match(
    /^\d{4}-\d{2}-\d{2}/
  );

  return match ? match[0] : null;
}

function dateEn(
  value?: string | null
): string {
  const date = dateOnly(value);

  if (!date) return "Not available";

  const parsed = new Date(
    `${date}T12:00:00Z`
  );

  if (Number.isNaN(parsed.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(parsed);
}

function validUrl(
  value?: string | null
): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);

    return url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function bankName(bank: Bank): string {
  return (
    bank.bank_short_name_en ||
    bank.bank_name_en
  );
}

function rateLabel(bank: Bank): string {
  const lower = number(
    bank.current_rate_lower
  );

  const upper = number(
    bank.current_rate_upper
  );

  const current = number(
    bank.current_rate
  );

  if (
    bank.rate_format === "range" &&
    lower !== null &&
    upper !== null
  ) {
    return `${percentage(lower)} – ${percentage(upper)}`;
  }

  if (current !== null) {
    return percentage(current);
  }

  if (
    lower !== null &&
    upper !== null
  ) {
    return `${percentage(lower)} – ${percentage(upper)}`;
  }

  return percentage(upper ?? lower);
}

function decisionLabel(
  change: number | null,
  type?: string | null
): string {
  if (change !== null) {
    if (change > 0) {
      return `Rate Hike (${change} bps)`;
    }

    if (change < 0) {
      return `Rate Cut (${Math.abs(change)} bps)`;
    }

    return "Rate Hold";
  }

  switch (type?.toLowerCase()) {
    case "hike":
    case "increase":
    case "raise":
      return "Rate Hike";

    case "cut":
    case "decrease":
    case "lower":
      return "Rate Cut";

    case "hold":
    case "unchanged":
      return "Rate Hold";

    default:
      return "Not specified";
  }
}

function decisionColor(
  change: number | null
): string {
  if (change === null) {
    return "text-slate-600";
  }

  if (change > 0) {
    return "text-rose-600";
  }

  if (change < 0) {
    return "text-emerald-600";
  }

  return "text-blue-700";
}

// =====================================================
// NEXT CENTRAL BANK MEETING
// =====================================================

function nextMeeting(
  bank: Bank
): Meeting | null {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  return (
    (
      Array.isArray(bank.meetings)
        ? bank.meetings
        : []
    )
      .filter((meeting) => {
        const date = dateOnly(
          meeting.meeting_date
        );

        return (
          date !== null &&
          date >= today &&
          meeting.status !== "completed" &&
          meeting.status !== "cancelled"
        );
      })
      .sort((a, b) =>
        (a.meeting_date || "").localeCompare(
          b.meeting_date || ""
        )
      )[0] || null
  );
}

function upcomingMeetings(
  bank: Bank
): Meeting[] {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  return (
    Array.isArray(bank.meetings)
      ? bank.meetings
      : []
  )
    .filter((meeting) => {
      const date = dateOnly(
        meeting.meeting_date
      );

      return (
        date !== null &&
        date >= today &&
        meeting.status !== "completed" &&
        meeting.status !== "cancelled"
      );
    })
    .sort((a, b) =>
      (a.meeting_date || "").localeCompare(
        b.meeting_date || ""
      )
    );
}

// =====================================================
// HISTORICAL INTEREST RATE DECISIONS
// =====================================================

function historyRows(
  bank: Bank
): HistoryRow[] {
  const map = new Map<
    string,
    HistoryRow
  >();

  for (
    const item of Array.isArray(
      bank.rate_history
    )
      ? bank.rate_history
      : []
  ) {
    const date = dateOnly(
      item.decision_date ||
        item.meeting_date ||
        item.date ||
        item.effective_date
    );

    const rate = number(
      item.decision_rate ??
        item.rate
    );

    if (!date || rate === null) {
      continue;
    }

    map.set(date, {
      date,
      rate,
      previous: number(
        item.previous_rate
      ),
      change: number(
        item.change_bps
      ),
      type:
        item.decision_type || null,
      source: validUrl(
        item.decision_source_url ||
          item.source_url
      ),
    });
  }

  for (
    const item of Array.isArray(
      bank.meetings
    )
      ? bank.meetings
      : []
  ) {
    if (
      item.status !== "completed"
    ) {
      continue;
    }

    const date = dateOnly(
      item.meeting_date
    );

    const rate = number(
      item.decision_rate
    );

    if (!date || rate === null) {
      continue;
    }

    const existing = map.get(date);

    map.set(date, {
      date,
      rate,
      previous:
        number(item.previous_rate) ??
        existing?.previous ??
        null,
      change:
        number(item.change_bps) ??
        existing?.change ??
        null,
      type:
        item.decision_type ||
        existing?.type ||
        null,
      source:
        validUrl(
          item.decision_source_url
        ) ||
        existing?.source ||
        null,
    });
  }

  const chronological = [
    ...map.values(),
  ].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return chronological
    .map((row, index) => {
      const previous =
        row.previous ??
        (index > 0
          ? chronological[index - 1]
              .rate
          : null);

      return {
        ...row,
        previous,
        change:
          row.change ??
          (previous !== null
            ? Math.round(
                (row.rate - previous) *
                  100
              )
            : null),
      };
    })
    .reverse();
}

// =====================================================
// SUPABASE
// =====================================================

async function getBank(
  slug: string
): Promise<Bank | null> {
  if (
    !BANK_SLUGS.some(
      (item) => item === slug
    )
  ) {
    return null;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (
    !supabaseUrl ||
    !supabaseKey
  ) {
    console.error(
      "Supabase environment variables are missing."
    );

    return null;
  }

  const query = new URLSearchParams({
    select: "*",
    slug: `eq.${slug}`,
    limit: "1",
  });

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/interest_rates?${query.toString()}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Supabase request failed:",
        response.status
      );

      return null;
    }

    const rows =
      (await response.json()) as Bank[];

    if (
      !rows.length ||
      rows[0].is_published === false
    ) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error(
      "Interest rate page error:",
      error
    );

    return null;
  }
}

// =====================================================
// REUSABLE CONTENT SECTION
// =====================================================

function Section({
  id,
  eyebrow,
  title,
  content,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  content?: string | null;
}) {
  if (!content?.trim()) {
    return null;
  }

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
    >
      {eyebrow && (
        <p className="text-xs font-black text-[#2471df]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 text-xl font-black leading-9 text-slate-950 sm:text-2xl">
        {title}
      </h2>

      <div className="mt-4 space-y-4">
        {content
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map(
            (paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-line text-[13px] leading-8 text-slate-600 sm:text-sm sm:leading-9"
              >
                {paragraph.trim()}
              </p>
            )
          )}
      </div>
    </section>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  title,
  value,
  subtitle,
  valueClass = "text-slate-950",
}: {
  title: string;
  value: string;
  subtitle?: string;
  valueClass?: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-xs font-bold text-slate-500">
        {title}
      </p>

      <p
        className={`mt-3 break-words text-lg font-black leading-8 sm:text-xl ${valueClass}`}
      >
        {value}
      </p>

      {subtitle && (
        <p className="mt-2 text-[11px] leading-6 text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// =====================================================
// EXTERNAL LINK
// =====================================================

function ExternalLink({
  href,
  children,
}: {
  href?: string | null;
  children: ReactNode;
}) {
  const url = validUrl(href);

  if (!url) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-black text-blue-700 transition hover:bg-blue-100"
    >
      {children} ↗
    </a>
  );
}

// =====================================================
// HISTORY TABLE
// =====================================================

function HistoryTable({
  rows,
}: {
  rows: HistoryRow[];
}) {
  if (!rows.length) {
    return (
      <p className="py-7 text-center text-sm text-slate-500">
        No historical interest rate
        decisions are currently available.
      </p>
    );
  }

  function renderRows(
    items: HistoryRow[]
  ) {
    return items.map(
      (row, index) => (
        <tr
          key={`${row.date}-${index}`}
          className="border-t border-slate-200 even:bg-slate-50"
        >
          <td className="px-3 py-3.5 text-center text-xs font-bold">
            {dateEn(row.date)}
          </td>

          <td className="px-3 py-3.5 text-center text-xs">
            {percentage(
              row.previous
            )}
          </td>

          <td className="px-3 py-3.5 text-center text-xs font-black text-blue-700">
            {percentage(row.rate)}
          </td>

          <td
            className={`px-3 py-3.5 text-center text-xs font-black ${decisionColor(
              row.change
            )}`}
          >
            {row.change === null
              ? "—"
              : `${row.change > 0 ? "+" : ""}${row.change}`}
          </td>

          <td
            className={`px-3 py-3.5 text-center text-xs font-black ${decisionColor(
              row.change
            )}`}
          >
            {decisionLabel(
              row.change,
              row.type
            )}
          </td>
        </tr>
      )
    );
  }

  function desktopTable(
    items: HistoryRow[]
  ) {
    return (
      <table className="w-full table-fixed border-collapse text-xs">
        <thead>
          <tr className="bg-[#0d2b4b] text-white">
            {[
              "Decision Date",
              "Previous Rate",
              "New Rate",
              "Change (bps)",
              "Decision Type",
            ].map((title) => (
              <th
                key={title}
                className="px-3 py-4 text-center font-black"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {renderRows(items)}
        </tbody>
      </table>
    );
  }

  function mobileCards(
    items: HistoryRow[]
  ) {
    return (
      <div className="space-y-2">
        {items.map(
          (row, index) => (
            <div
              key={`${row.date}-${index}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <time className="text-xs font-black text-slate-900">
                  {dateEn(row.date)}
                </time>

                <span
                  className={`text-[11px] font-black ${decisionColor(
                    row.change
                  )}`}
                >
                  {decisionLabel(
                    row.change,
                    row.type
                  )}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-white p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    Previous Rate
                  </p>

                  <p className="mt-1 text-sm font-black">
                    {percentage(
                      row.previous
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    New Rate
                  </p>

                  <p className="mt-1 text-sm font-black text-blue-700">
                    {percentage(
                      row.rate
                    )}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="hidden md:block">
        {desktopTable(
          rows.slice(0, 10)
        )}
      </div>

      <div className="md:hidden">
        {mobileCards(
          rows.slice(0, 10)
        )}
      </div>

      {rows.length > 10 && (
        <details className="group mt-4">
          <summary className="mx-auto flex w-fit cursor-pointer list-none items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-xs font-black text-blue-700 transition hover:bg-blue-100 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              Show More (
              {rows.length - 10}{" "}
              Decisions)
            </span>

            <span className="hidden group-open:inline">
              Hide Additional Decisions
            </span>
          </summary>

          <div className="mt-4 hidden md:block">
            {desktopTable(
              rows.slice(10)
            )}
          </div>

          <div className="mt-4 md:hidden">
            {mobileCards(
              rows.slice(10)
            )}
          </div>
        </details>
      )}
    </div>
  );
}

// =====================================================
// SEO METADATA
// =====================================================

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { bank: slug } = await params;

  const bank = await getBank(slug);

  if (!bank) {
    return {
      title:
        "Central Bank Not Found | Broker Alarab",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    bank.seo_title_en ||
    `${bankName(bank)} Interest Rate Today, Decisions and Outlook`;

  const description =
    bank.seo_description_en ||
    `Explore the latest ${bank.bank_name_en} interest rate, monetary policy decisions, upcoming meetings, historical rate changes and potential market impact.`;

  const canonical =
    validUrl(
      bank.canonical_url_en
    ) ||
    `${SITE}${HUB}/${bank.slug}`;

  const ogImage = validUrl(
    bank.og_image_url
  );

  return {
    title,
    description,

    alternates: {
      canonical,
      languages: {
        en: canonical,
        ar: `${SITE}/interest-rates/${bank.slug}`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title:
        bank.og_title_en || title,

      description:
        bank.og_description_en ||
        description,

      url: canonical,

      siteName: "Broker Alarab",
      locale: "en_US",
      type: "article",

      ...(ogImage
        ? {
            images: [
              { url: ogImage },
            ],
          }
        : {}),
    },

    twitter: {
      card: ogImage
        ? "summary_large_image"
        : "summary",

      title:
        bank.og_title_en || title,

      description:
        bank.og_description_en ||
        description,

      ...(ogImage
        ? {
            images: [ogImage],
          }
        : {}),
    },
  };
}

// =====================================================
// MAIN PAGE CONTINUES IN PART 2
// =====================================================

// =====================================================
// BANK PAGE — ENGLISH VERSION
// =====================================================

export default async function BankPage({
  params,
}: Props) {
  const { bank: slug } = await params;

  const bank = await getBank(slug);

  if (!bank) {
    notFound();
  }

  const today = new Date().toISOString().slice(0, 10);

  const bankTitle = bankName(bank);
  const fullBankName = bank.bank_name_en;
  const currency = bank.currency_code || "—";
  const country = bank.country_en || "—";

  const currentRate = rateLabel(bank);
  const previousRate = percentage(bank.previous_rate);
  const changeBps = number(bank.last_change_bps);

  const next = nextMeeting(bank);
  const meetings = upcomingMeetings(bank);
  const history = historyRows(bank);

  const pageUrl = `${SITE}${HUB}/${bank.slug}`;
  const arabicUrl = `${SITE}/interest-rates/${bank.slug}`;

  const heroTitle =
    bank.seo_h1_en?.trim() ||
    bank.hero_title_en?.trim() ||
    `${bankTitle} Interest Rate`;

  const heroDescription =
    bank.hero_description_en?.trim() ||
    bank.rate_description_en?.trim() ||
    `Track the latest ${fullBankName} interest rate, monetary policy decisions, upcoming meetings and historical rate changes.`;

  const impactSections = [
    {
      title: `How ${bankTitle} Interest Rates Affect Forex`,
      content: bank.forex_impact_en,
      icon: "↗",
    },
    {
      title: `How ${bankTitle} Interest Rates Affect Gold`,
      content: bank.gold_impact_en,
      icon: "◇",
    },
    {
      title: `Impact on Stocks and Equity Markets`,
      content: bank.stocks_impact_en,
      icon: "▥",
    },
    {
      title: `Impact on Bonds and Yields`,
      content: bank.bonds_impact_en,
      icon: "≋",
    },
    {
      title: `Impact on Inflation`,
      content: bank.inflation_impact_en,
      icon: "%",
    },
  ].filter(
    (section) => section.content?.trim()
  );

  const extraSections = (
    Array.isArray(bank.analysis_sections_en)
      ? bank.analysis_sections_en
      : []
  )
    .map((section) => ({
      title:
        section.title ||
        section.heading ||
        section.h2 ||
        "",
      content:
        section.content ||
        section.body ||
        section.text ||
        section.description ||
        "",
    }))
    .filter(
      (section) =>
        section.title.trim() &&
        section.content.trim()
    );

  const faqs = (
    Array.isArray(bank.faq_en)
      ? bank.faq_en
      : []
  )
    .map((faq) => ({
      question:
        faq.question || faq.q || "",
      answer:
        faq.answer || faq.a || "",
    }))
    .filter(
      (faq) =>
        faq.question.trim() &&
        faq.answer.trim()
    );

  const otherBanks = BANK_SLUGS.filter(
    (item) => item !== bank.slug
  );

  const bankLabels: Record<string, string> = {
    fed: "Federal Reserve",
    ecb: "European Central Bank",
    boe: "Bank of England",
    boj: "Bank of Japan",
    boc: "Bank of Canada",
    rba: "Reserve Bank of Australia",
    snb: "Swiss National Bank",
    rbnz: "Reserve Bank of New Zealand",
  };

  const bankFlags: Record<string, string> = {
    fed: "🇺🇸",
    ecb: "🇪🇺",
    boe: "🇬🇧",
    boj: "🇯🇵",
    boc: "🇨🇦",
    rba: "🇦🇺",
    snb: "🇨🇭",
    rbnz: "🇳🇿",
  };

  // =====================================================
  // STRUCTURED DATA
  // =====================================================

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
          item: `${SITE}${HUB}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: fullBankName,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: heroTitle,
      description: heroDescription,
      url: pageUrl,
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: "Broker Alarab",
        url: SITE,
      },
      about: {
        "@type": "Organization",
        name: fullBankName,
        url:
          validUrl(bank.official_website) ||
          undefined,
      },
      dateModified:
        bank.content_reviewed_at ||
        bank.updated_at ||
        undefined,
    },
    ...(faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
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
          HERO — COMPACT AND RESPONSIVE
      ===================================================== */}

      <section className="bg-gradient-to-r from-[#123f78] via-[#0b2a4c] to-[#06192e] text-white">
        <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold text-blue-200 sm:text-xs"
          >
            <Link
              href="/en"
              className="hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href={HUB}
              className="hover:text-white"
            >
              Interest Rates
            </Link>

            <span>/</span>

            <span className="text-white">
              {bankTitle}
            </span>
          </nav>

          <div className="mt-4 grid items-center gap-5 lg:mt-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            {/* HERO CONTENT */}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl sm:text-4xl">
                  {bank.flag_emoji ||
                    bankFlags[bank.slug] ||
                    "🌐"}
                </span>

                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black text-blue-100 sm:text-xs">
                  CENTRAL BANK MONETARY POLICY
                </span>
              </div>

              <h1 className="mt-4 max-w-[850px] text-[27px] font-black leading-[1.3] tracking-tight sm:text-[39px] lg:text-[45px]">
                {heroTitle}
              </h1>

              <p className="mt-3 max-w-[800px] text-[13px] leading-7 text-slate-200 sm:text-[15px] sm:leading-8">
                {heroDescription}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="#rate-overview"
                  className="rounded-xl bg-[#2471df] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#3683ee]"
                >
                  Current Interest Rate
                </a>

                <a
                  href="#meetings"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/20"
                >
                  Upcoming Meetings
                </a>

                <a
                  href="#history"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/20"
                >
                  Rate History
                </a>
              </div>
            </div>

            {/* HERO RATE CARD */}

            <aside className="rounded-[20px] border border-white/15 bg-white/[0.09] p-4 shadow-xl backdrop-blur-sm sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black tracking-wide text-blue-200">
                    CURRENT POLICY RATE
                  </p>

                  <h2 className="mt-1 text-sm font-black text-white sm:text-base">
                    {fullBankName}
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black text-emerald-200">
                  Published Data
                </span>
              </div>

              <div
                dir="ltr"
                className="mt-4 break-words text-[32px] font-black leading-tight text-[#76d0ff] sm:text-[43px]"
              >
                {currentRate}
              </div>

              <p className="mt-1 text-xs text-slate-200">
                {bank.rate_type_en ||
                  "Central Bank Policy Rate"}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.07] p-3">
                  <p className="text-[10px] text-slate-300">
                    Previous Rate
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    {previousRate}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.07] p-3">
                  <p className="text-[10px] text-slate-300">
                    Latest Decision
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    {dateEn(
                      bank.last_decision_date
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.07] p-3">
                  <p className="text-[10px] text-slate-300">
                    Rate Change
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    {changeBps === null
                      ? "Not available"
                      : `${changeBps > 0 ? "+" : ""}${changeBps} bps`}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.07] p-3">
                  <p className="text-[10px] text-slate-300">
                    Next Meeting
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    {next
                      ? dateEn(
                          next.meeting_date
                        )
                      : "Not announced"}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-[10px] leading-5 text-slate-300">
                Rates are based on
                published database records.
                Verify the latest decisions
                with the central bank.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          PAGE NAVIGATION
      ===================================================== */}

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1520px] gap-2 overflow-x-auto px-3 py-3 sm:flex-wrap sm:px-7 lg:px-10">
          {[
            ["#rate-overview", "Current Rate"],
            ["#overview", "Overview"],
            ["#meetings", "Meetings"],
            ["#history", "Rate History"],
            ["#policy", "Monetary Policy"],
            ["#impact", "Market Impact"],
            ["#faq", "FAQ"],
            ["#sources", "Sources"],
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

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1520px] space-y-6 px-3 py-8 sm:px-7 sm:py-12 lg:px-10">
        {/* =====================================================
            CURRENT RATE OVERVIEW
        ===================================================== */}

        <section
          id="rate-overview"
          className="scroll-mt-24"
        >
          <div className="mb-5">
            <p className="text-xs font-black text-[#2471df]">
              CURRENT MONETARY POLICY
            </p>

            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              {bankTitle} Interest Rate Today
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Current interest rate
              information and the latest
              recorded monetary policy
              decision for {fullBankName}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              title="Current Interest Rate"
              value={currentRate}
              subtitle={
                bank.rate_type_en ||
                undefined
              }
              valueClass="text-[#1e5bb8]"
            />

            <StatCard
              title="Previous Interest Rate"
              value={previousRate}
              subtitle="Rate before the latest recorded decision"
            />

            <StatCard
              title="Latest Rate Decision"
              value={decisionLabel(
                changeBps,
                bank.last_decision_type
              )}
              subtitle={dateEn(
                bank.last_decision_date
              )}
              valueClass={decisionColor(
                changeBps
              )}
            />

            <StatCard
              title="Next Policy Meeting"
              value={
                next
                  ? dateEn(
                      next.meeting_date
                    )
                  : "Not announced"
              }
              subtitle="Subject to the official central bank calendar"
            />
          </div>

          {bank.rate_description_en?.trim() && (
            <div className="mt-4 rounded-[18px] border border-blue-100 bg-[#eef5fd] p-4 sm:p-5">
              <h3 className="text-sm font-black text-[#184a97]">
                About This Policy Rate
              </h3>

              <p className="mt-2 whitespace-pre-line text-[13px] leading-8 text-slate-700">
                {bank.rate_description_en}
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <ExternalLink
              href={bank.official_rates_url}
            >
              Official Interest Rates
            </ExternalLink>

            <ExternalLink
              href={bank.official_website}
            >
              Central Bank Website
            </ExternalLink>
          </div>
        </section>

        {/* =====================================================
            OVERVIEW AND CENTRAL BANK ROLE
        ===================================================== */}

        <div
          id="overview"
          className="scroll-mt-24 grid gap-5 lg:grid-cols-2"
        >
          <Section
            eyebrow="CENTRAL BANK OVERVIEW"
            title={`About ${fullBankName}`}
            content={bank.overview_en}
          />

          <Section
            eyebrow="ROLE AND RESPONSIBILITIES"
            title={`The Role of ${bankTitle}`}
            content={bank.bank_role_en}
          />
        </div>

        {/* =====================================================
            UPCOMING MONETARY POLICY MEETINGS
        ===================================================== */}

        <section
          id="meetings"
          className="scroll-mt-24 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-5 sm:p-7">
            <p className="text-xs font-black text-[#2471df]">
              MONETARY POLICY CALENDAR
            </p>

            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              Upcoming {bankTitle} Interest Rate Meetings
            </h2>

            <p className="mt-3 text-[13px] leading-7 text-slate-600">
              Follow upcoming monetary
              policy meetings and interest
              rate announcements from{" "}
              {fullBankName}. Meeting
              dates may change.
            </p>
          </div>

          {meetings.length > 0 ? (
            <>
              {/* DESKTOP MEETING TABLE */}

              <div className="hidden md:block">
                <table className="w-full table-fixed text-center">
                  <thead className="bg-[#0d2b4b] text-white">
                    <tr className="text-xs">
                      <th className="px-4 py-4">
                        Meeting Date
                      </th>

                      <th className="px-4 py-4">
                        Announcement Time
                      </th>

                      <th className="px-4 py-4">
                        Status
                      </th>

                      <th className="px-4 py-4">
                        Official Source
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {meetings.map(
                      (meeting, index) => (
                        <tr
                          key={
                            meeting.id ||
                            `${meeting.meeting_date}-${index}`
                          }
                          className="border-t border-slate-200 even:bg-slate-50"
                        >
                          <td className="px-4 py-4 text-xs font-black">
                            {dateEn(
                              meeting.meeting_date
                            )}
                          </td>

                          <td className="px-4 py-4 text-xs font-bold text-slate-600">
                            {meeting.announcement_at
                              ? meeting.announcement_at
                                  .slice(11, 16) ||
                                "Not specified"
                              : "Not specified"}
                          </td>

                          <td className="px-4 py-4">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                              Scheduled
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <ExternalLink
                              href={
                                meeting.reference_calendar_url ||
                                bank.official_calendar_url
                              }
                            >
                              Calendar
                            </ExternalLink>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE MEETING CARDS */}

              <div className="divide-y divide-slate-200 md:hidden">
                {meetings.map(
                  (meeting, index) => (
                    <article
                      key={
                        meeting.id ||
                        `${meeting.meeting_date}-${index}`
                      }
                      className="p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500">
                            Meeting Date
                          </p>

                          <p className="mt-1 text-sm font-black text-slate-900">
                            {dateEn(
                              meeting.meeting_date
                            )}
                          </p>
                        </div>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700">
                          Scheduled
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="text-xs text-slate-500">
                          Announcement Time
                        </span>

                        <span className="text-xs font-black">
                          {meeting.announcement_at
                            ? meeting.announcement_at.slice(
                                11,
                                16
                              ) || "Not specified"
                            : "Not specified"}
                        </span>
                      </div>

                      <div className="mt-3">
                        <ExternalLink
                          href={
                            meeting.reference_calendar_url ||
                            bank.official_calendar_url
                          }
                        >
                          Official Calendar
                        </ExternalLink>
                      </div>
                    </article>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-sm text-slate-500">
              No upcoming monetary policy
              meetings are currently
              available in the database.
            </div>
          )}

          <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
            <ExternalLink
              href={bank.official_calendar_url}
            >
              View Official Meeting Calendar
            </ExternalLink>
          </div>
        </section>

        {/* =====================================================
            HISTORICAL RATE DECISIONS
        ===================================================== */}

        <section
          id="history"
          className="scroll-mt-24 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-5 sm:p-7">
            <p className="text-xs font-black text-[#2471df]">
              HISTORICAL INTEREST RATE DATA
            </p>

            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              {bankTitle} Interest Rate History
            </h2>

            <p className="mt-3 text-[13px] leading-7 text-slate-600">
              Explore previous monetary
              policy decisions, including
              interest rate increases,
              cuts and holds.
            </p>
          </div>

          <div className="p-3 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <HistoryTable rows={history} />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <ExternalLink
                href={bank.official_history_url}
              >
                Official Rate History
              </ExternalLink>

              <Link
                href={`${HUB}#history`}
                className="inline-flex items-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-black text-blue-700 hover:bg-blue-100"
              >
                Compare Global Rate History →
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            HISTORICAL ANALYSIS
        ===================================================== */}

        <Section
          eyebrow="HISTORICAL MONETARY POLICY ANALYSIS"
          title={`${bankTitle} Interest Rate History Analysis`}
          content={bank.rate_history_analysis_en}
        />

        {/* =====================================================
            MONETARY POLICY AND ECONOMIC OUTLOOK
        ===================================================== */}

        <div
          id="policy"
          className="scroll-mt-24 grid gap-5 lg:grid-cols-2"
        >
          <Section
            eyebrow="MONETARY POLICY FRAMEWORK"
            title={`${bankTitle} Monetary Policy`}
            content={bank.monetary_policy_en}
          />

          <Section
            eyebrow="ECONOMIC OUTLOOK"
            title={`${bankTitle} Economic Outlook`}
            content={bank.economic_outlook_en}
          />
        </div>

        {/* =====================================================
            MARKET IMPACT — 3 + 2 LAYOUT
        ===================================================== */}

        {impactSections.length > 0 && (
          <section
            id="impact"
            className="scroll-mt-24"
          >
            <div className="mb-5">
              <p className="text-xs font-black text-[#2471df]">
                INTEREST RATE MARKET IMPACT
              </p>

              <h2 className="mt-2 text-xl font-black sm:text-2xl">
                How {bankTitle} Interest Rates Affect Financial Markets
              </h2>

              <p className="mt-3 max-w-[1100px] text-[13px] leading-8 text-slate-600">
                Central bank policy
                decisions can influence
                currency markets, gold,
                stocks, bonds and inflation
                expectations. Market
                reactions depend on
                economic conditions and
                investor expectations.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {impactSections.map(
                (section) => (
                  <article
                    key={section.title}
                    className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 lg:[&:nth-child(n+4)]:col-span-3 sm:p-6"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-black text-[#2471df]">
                        {section.icon}
                      </span>

                      <h3 className="text-base font-black leading-7 text-slate-950">
                        {section.title}
                      </h3>
                    </div>

                    <div className="mt-4 space-y-3">
                      {section.content
                        ?.split(/\n\s*\n/)
                        .filter(Boolean)
                        .map(
                          (paragraph, index) => (
                            <p
                              key={index}
                              className="whitespace-pre-line text-[13px] leading-8 text-slate-600"
                            >
                              {paragraph.trim()}
                            </p>
                          )
                        )}
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            ADDITIONAL ENGLISH ANALYSIS SECTIONS
        ===================================================== */}

        {extraSections.length > 0 && (
          <section className="scroll-mt-24">
            <div className="mb-5">
              <p className="text-xs font-black text-[#2471df]">
                IN-DEPTH CENTRAL BANK ANALYSIS
              </p>

              <h2 className="mt-2 text-xl font-black sm:text-2xl">
                Additional {bankTitle} Monetary Policy Analysis
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {extraSections.map(
                (section, index) => (
                  <article
                    key={`${section.title}-${index}`}
                    className={`rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 ${
                      extraSections.length % 2 === 1 &&
                      index === extraSections.length - 1
                        ? "lg:col-span-2"
                        : ""
                    }`}
                  >
                    <h3 className="text-lg font-black leading-8 text-slate-950 sm:text-xl">
                      {section.title}
                    </h3>

                    <div className="mt-3 space-y-3">
                      {section.content
                        .split(/\n\s*\n/)
                        .filter(Boolean)
                        .map(
                          (paragraph, paragraphIndex) => (
                            <p
                              key={paragraphIndex}
                              className="whitespace-pre-line text-[13px] leading-8 text-slate-600 sm:text-sm"
                            >
                              {paragraph.trim()}
                            </p>
                          )
                        )}
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            FAQ — ENGLISH SUPABASE COLUMN
        ===================================================== */}

        {faqs.length > 0 && (
          <section
            id="faq"
            className="scroll-mt-24"
          >
            <div className="mb-5">
              <p className="text-xs font-black text-[#2471df]">
                FREQUENTLY ASKED QUESTIONS
              </p>

              <h2 className="mt-2 text-xl font-black sm:text-2xl">
                {bankTitle} Interest Rate FAQ
              </h2>

              <p className="mt-3 text-[13px] leading-8 text-slate-600">
                Answers to common
                questions about{" "}
                {fullBankName} interest
                rates, monetary policy
                meetings and historical
                decisions.
              </p>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, index) => (
                <details
                  key={`${faq.question}-${index}`}
                  className="group overflow-hidden rounded-[16px] border border-slate-200 bg-white open:shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-xs font-black text-slate-900 marker:hidden sm:px-6 sm:text-sm [&::-webkit-details-marker]:hidden">
                    <span>
                      {faq.question}
                    </span>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-black text-blue-700 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-slate-200 px-4 py-4 sm:px-6">
                    <p className="whitespace-pre-line text-[13px] leading-8 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            METHODOLOGY AND OFFICIAL SOURCES
        ===================================================== */}

        <section
          id="sources"
          className="scroll-mt-24 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-gradient-to-r from-white to-blue-50 p-5 sm:p-7">
            <p className="text-xs font-black text-[#2471df]">
              DATA TRANSPARENCY
            </p>

            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              {bankTitle} Interest Rate Sources and Methodology
            </h2>

            <p className="mt-3 text-[13px] leading-8 text-slate-600">
              Broker Alarab provides
              central bank interest rate
              information with links to
              official sources for
              independent verification.
            </p>
          </div>

          <div className="p-5 sm:p-7">
            {bank.methodology_en?.trim() && (
              <div className="mb-6">
                <h3 className="text-base font-black">
                  Data Collection Methodology
                </h3>

                <p className="mt-3 whitespace-pre-line text-[13px] leading-8 text-slate-600">
                  {bank.methodology_en}
                </p>
              </div>
            )}

            <h3 className="text-base font-black">
              Official Central Bank Sources
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              <ExternalLink
                href={bank.official_website}
              >
                Official Website
              </ExternalLink>

              <ExternalLink
                href={bank.official_rates_url}
              >
                Policy Rates
              </ExternalLink>

              <ExternalLink
                href={bank.official_calendar_url}
              >
                Meeting Calendar
              </ExternalLink>

              <ExternalLink
                href={bank.official_history_url}
              >
                Historical Data
              </ExternalLink>
            </div>

            {Array.isArray(
              bank.additional_sources
            ) &&
              bank.additional_sources.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-black">
                    Additional References
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {bank.additional_sources.map(
                      (source, index) => (
                        <ExternalLink
                          key={index}
                          href={
                            source.url ||
                            source.href
                          }
                        >
                          {source.title ||
                            source.label ||
                            source.name ||
                            `Source ${index + 1}`}
                        </ExternalLink>
                      )
                    )}
                  </div>
                </div>
              )}

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="text-sm font-black text-amber-950">
                Important Data Disclaimer
              </h3>

              <p className="mt-2 whitespace-pre-line text-xs leading-7 text-amber-900">
                {bank.data_disclaimer_en ||
                  "Interest rate data and central bank meeting schedules may change. Always verify the latest policy decisions using official central bank publications. This information is provided for educational purposes and does not constitute financial or investment advice."}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-slate-500">
              {bank.content_reviewed_at && (
                <span>
                  Content reviewed:{" "}
                  {dateEn(
                    bank.content_reviewed_at
                  )}
                </span>
              )}

              {bank.last_rate_verified_at && (
                <span>
                  Rate last verified:{" "}
                  {dateEn(
                    bank.last_rate_verified_at
                  )}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            OTHER CENTRAL BANKS — 4 + 3 LAYOUT
        ===================================================== */}

        <section className="scroll-mt-24">
          <div className="mb-5">
            <p className="text-xs font-black text-[#2471df]">
              EXPLORE MORE CENTRAL BANKS
            </p>

            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              Compare Interest Rates from Other Central Banks
            </h2>

            <p className="mt-3 text-[13px] leading-8 text-slate-600">
              Explore current policy
              rates, historical decisions
              and upcoming monetary policy
              meetings from other major
              central banks worldwide.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            {otherBanks.map(
              (otherSlug) => (
                <Link
                  key={otherSlug}
                  href={`${HUB}/${otherSlug}`}
                  className="group flex min-w-0 items-center gap-3 rounded-[17px] border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 lg:col-span-3 lg:[&:nth-child(n+5)]:col-span-4"
                >
                  <span className="shrink-0 text-2xl">
                    {bankFlags[otherSlug] ||
                      "🌐"}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-black leading-6 text-slate-900 group-hover:text-blue-700 sm:text-sm">
                      {bankLabels[otherSlug] ||
                        otherSlug.toUpperCase()}
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Interest Rate & Decisions
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-black text-[#2471df]">
                    →
                  </span>
                </Link>
              )
            )}
          </div>

          <div className="mt-5 flex justify-center">
            <Link
              href={HUB}
              className="inline-flex items-center justify-center rounded-xl bg-[#2471df] px-6 py-3 text-xs font-black text-white transition hover:bg-[#1e5bb8]"
            >
              View All Global Interest Rates →
            </Link>
          </div>
        </section>

        {/* =====================================================
            RELATED ENGLISH TRADING RESOURCES
        ===================================================== */}

        <section className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-black sm:text-2xl">
            Related Trading Research and Tools
          </h2>

          <p className="mt-2 text-[13px] leading-8 text-slate-600">
            Explore independent broker
            comparisons, forex education
            and trading risk management
            resources from Broker Alarab.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Best Forex Brokers",
                href: "/en/brokers",
              },
              {
                title: "Best Stock Trading Brokers",
                href: "/en/best-brokers/stocks",
              },
              {
                title: "Best Indices Brokers",
                href: "/en/best-brokers/indices",
              },
              {
                title: "Trading Education",
                href: "/en/learn-trading",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <span>
                  {item.title}
                </span>

                <span className="text-blue-600">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* =====================================================
          BOTTOM LANGUAGE SWITCH
      ===================================================== */}

      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-7 lg:px-10">
          <p className="text-xs font-bold text-slate-600">
            This page is available in Arabic.
          </p>

          <Link
            href={arabicUrl}
            hrefLang="ar"
            className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-black text-blue-700 transition hover:bg-blue-100"
          >
            العربية ←
          </Link>
        </div>
      </div>
    </main>
  );
}
