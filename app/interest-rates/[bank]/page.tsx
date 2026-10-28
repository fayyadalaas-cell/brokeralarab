
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const SITE = "https://brokeralarab.com";
const HUB = "/interest-rates";

const BANK_SLUGS = [
  "fed", "ecb", "boe", "boj",
  "boc", "rba", "snb", "rbnz",
] as const;

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
  bank_name_ar: string;
  bank_short_name_ar: string | null;
  country_ar: string | null;
  currency_code: string | null;
  flag_emoji: string | null;
  bank_logo_url: string | null;

  current_rate: number | null;
  current_rate_lower: number | null;
  current_rate_upper: number | null;
  rate_format: string | null;
  rate_type_ar: string | null;
  rate_description_ar: string | null;
  comparison_rate_basis: string | null;

  previous_rate: number | null;
  last_change_bps: number | null;
  last_decision_date: string | null;
  last_decision_type: string | null;
  last_decision_source_url: string | null;
  last_rate_verified_at: string | null;

  meetings: Meeting[] | null;
  rate_history: History[] | null;

  hero_title_ar: string | null;
  hero_description_ar: string | null;
  overview_ar: string | null;
  bank_role_ar: string | null;
  monetary_policy_ar: string | null;
  rate_history_analysis_ar: string | null;
  economic_outlook_ar: string | null;
  forex_impact_ar: string | null;
  gold_impact_ar: string | null;
  stocks_impact_ar: string | null;
  bonds_impact_ar: string | null;
  inflation_impact_ar: string | null;
  analysis_sections_ar: AnalysisSection[] | null;

  faq_ar: Faq[] | null;

  seo_title_ar: string | null;
  seo_description_ar: string | null;
  seo_h1_ar: string | null;
  seo_keywords_ar: string[] | null;
  canonical_url_ar: string | null;
  og_title_ar: string | null;
  og_description_ar: string | null;
  og_image_url: string | null;

  official_website: string | null;
  official_rates_url: string | null;
  official_calendar_url: string | null;
  official_history_url: string | null;
  additional_sources: AdditionalSource[] | null;

  methodology_ar: string | null;
  data_disclaimer_ar: string | null;
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
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function percentage(value: unknown): string {
  const n = number(value);
  return n === null ? "غير متاح" : `${n.toFixed(2)}%`;
}

function dateOnly(value?: string | null): string | null {
  if (!value) return null;
  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
}

function dateAr(value?: string | null): string {
  const date = dateOnly(value);
  if (!date) return "غير متاح";

  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return "غير متاح";

  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function validUrl(value?: string | null): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function bankName(bank: Bank): string {
  return bank.bank_short_name_ar || bank.bank_name_ar;
}


function rateLabel(bank: Bank): string {
  const lower = number(bank.current_rate_lower);
  const upper = number(bank.current_rate_upper);
  const current = number(bank.current_rate);

  // Federal Reserve: display the upper bound consistently.
  if (bank.slug === "fed") {
    return percentage(upper ?? current ?? lower);
  }

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

  if (lower !== null && upper !== null) {
    return `${percentage(lower)} – ${percentage(upper)}`;
  }

  return percentage(upper ?? lower);
}


function decisionLabel(
  change: number | null,
  type?: string | null
): string {
  if (change !== null) {
    if (change > 0) return `رفع ${change} نقطة أساس`;
    if (change < 0) return `خفض ${Math.abs(change)} نقطة أساس`;
    return "تثبيت الفائدة";
  }

  switch (type) {
    case "hike":
    case "increase":
    case "raise":
      return "رفع الفائدة";
    case "cut":
    case "decrease":
    case "lower":
      return "خفض الفائدة";
    case "hold":
    case "unchanged":
      return "تثبيت الفائدة";
    default:
      return "غير محدد";
  }
}

function decisionColor(change: number | null): string {
  if (change === null) return "text-slate-600";
  if (change > 0) return "text-rose-600";
  if (change < 0) return "text-emerald-600";
  return "text-blue-700";
}


function upcomingMeetings(bank: Bank): Meeting[] {
  const today = new Date().toISOString().slice(0, 10);
  const lastDecisionDate = dateOnly(bank.last_decision_date);

  return (Array.isArray(bank.meetings) ? bank.meetings : [])
    .filter((meeting) => {
      const date = dateOnly(meeting.meeting_date);

      if (!date) return false;

      // Exclude completed or cancelled meetings.
      if (
        meeting.status === "completed" ||
        meeting.status === "cancelled"
      ) {
        return false;
      }

      // Exclude dates before today.
      if (date < today) return false;

      // The latest recorded decision has already taken place.
      // Do not show its meeting as upcoming, even if
      // the meeting status has not yet been updated.
      if (
        lastDecisionDate &&
        date <= lastDecisionDate
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) =>
      (a.meeting_date || "").localeCompare(
        b.meeting_date || ""
      )
    );
}

function nextMeeting(bank: Bank): Meeting | null {
  return upcomingMeetings(bank)[0] || null;
}



function historyRows(bank: Bank): HistoryRow[] {
  const map = new Map<string, HistoryRow>();

  // 1. Read saved historical decisions.
  for (const item of Array.isArray(bank.rate_history)
    ? bank.rate_history
    : []) {
    const date = dateOnly(
      item.decision_date ||
      item.meeting_date ||
      item.date ||
      item.effective_date
    );

    const rate = number(item.decision_rate ?? item.rate);

    if (!date || rate === null) continue;

    map.set(date, {
      date,
      rate,
      previous: number(item.previous_rate),
      change: number(item.change_bps),
      type: item.decision_type || null,
      source: validUrl(
        item.decision_source_url || item.source_url
      ),
    });
  }

  // 2. Include completed meetings with recorded decisions.
  for (const item of Array.isArray(bank.meetings)
    ? bank.meetings
    : []) {
    if (item.status !== "completed") continue;

    const date = dateOnly(item.meeting_date);
    const rate = number(item.decision_rate);

    if (!date || rate === null) continue;

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
        validUrl(item.decision_source_url) ||
        existing?.source ||
        null,
    });
  }

  // 3. Include the latest recorded bank decision.
  // This keeps the displayed history synchronized
  // with the latest decision fields in Supabase.
  const lastDate = dateOnly(bank.last_decision_date);
  const currentRate = number(bank.current_rate);
  const today = new Date().toISOString().slice(0, 10);

  if (
    lastDate &&
    lastDate <= today &&
    currentRate !== null
  ) {
    const existing = map.get(lastDate);

    map.set(lastDate, {
      date: lastDate,
      rate: currentRate,
      previous:
        number(bank.previous_rate) ??
        existing?.previous ??
        null,
      change:
        number(bank.last_change_bps) ??
        existing?.change ??
        null,
      type:
        bank.last_decision_type ||
        existing?.type ||
        null,
      source:
        validUrl(bank.last_decision_source_url) ||
        existing?.source ||
        null,
    });
  }

  // 4. Sort chronologically and calculate missing changes.
  const chronological = [...map.values()].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return chronological
    .map((row, index) => {
      const previous =
        row.previous ??
        (index > 0 ? chronological[index - 1].rate : null);

      return {
        ...row,
        previous,
        change:
          row.change ??
          (previous !== null
            ? Math.round((row.rate - previous) * 100)
            : null),
      };
    })
    .reverse();
}


// =====================================================
// SUPABASE
// =====================================================

async function getBank(slug: string): Promise<Bank | null> {
  if (!BANK_SLUGS.some((item) => item === slug)) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are missing.");
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
      console.error("Supabase request failed:", response.status);
      return null;
    }

    const rows = (await response.json()) as Bank[];

    if (!rows.length || rows[0].is_published === false) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Interest rate page error:", error);
    return null;
  }
}

// =====================================================
// REUSABLE COMPONENTS
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
  if (!content?.trim()) return null;

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
          .map((paragraph, index) => (
            <p
              key={index}
              className="whitespace-pre-line text-[13px] leading-8 text-slate-600 sm:text-sm sm:leading-9"
            >
              {paragraph.trim()}
            </p>
          ))}
      </div>
    </section>
  );
}

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

function ExternalLink({
  href,
  children,
}: {
  href?: string | null;
  children: React.ReactNode;
}) {
  const url = validUrl(href);

  if (!url) return null;

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


function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  if (!rows.length) {
    return (
      <p className="py-7 text-center text-sm text-slate-500">
        لا تتوفر قرارات تاريخية منشورة حاليًا.
      </p>
    );
  }

  // ================= DESKTOP TABLE =================
  function desktopTable(items: HistoryRow[]) {
    return (
      <table className="w-full table-fixed border-collapse text-xs">
        <thead>
          <tr className="bg-[#0d2b4b] text-white">
            {[
              "تاريخ القرار",
              "السعر السابق",
              "السعر الجديد",
              "التغير بالنقاط",
              "نوع القرار",
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
          {items.map((row, index) => (
            <tr
              key={`${row.date}-${index}`}
              className="border-t border-slate-200 even:bg-slate-50"
            >
              <td className="px-3 py-3.5 text-center text-xs font-bold">
                {dateAr(row.date)}
              </td>

              <td className="px-3 py-3.5 text-center text-xs">
                {percentage(row.previous)}
              </td>

              <td className="px-3 py-3.5 text-center text-xs font-black text-blue-700">
                {percentage(row.rate)}
              </td>

              <td
                className={`px-3 py-3.5 text-center text-xs font-black ${decisionColor(row.change)}`}
              >
                {row.change === null
                  ? "—"
                  : `${row.change > 0 ? "+" : ""}${row.change}`}
              </td>

              <td
                className={`px-3 py-3.5 text-center text-xs font-black ${decisionColor(row.change)}`}
              >
                {decisionLabel(row.change, row.type)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // ================= MOBILE CARDS =================
  function mobileCards(items: HistoryRow[]) {
    return (
      <div className="space-y-2">
        {items.map((row, index) => (
          <article
            key={`${row.date}-${index}`}
            className="rounded-xl border border-slate-200 bg-[#f8fbff] px-3 py-3"
          >
            {/* DATE AND DECISION */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <time
                dateTime={row.date}
                className="text-[11px] font-black text-[#091b32]"
              >
                {dateAr(row.date)}
              </time>

              <span
                className={`text-[10px] font-black ${decisionColor(row.change)}`}
              >
                {decisionLabel(row.change, row.type)}
              </span>
            </div>

            {/* RATE CHANGE */}
            <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-slate-200 pt-2.5">
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500">
                  السعر السابق
                </p>
                <p
                  dir="ltr"
                  className="mt-1 text-right text-[13px] font-black text-slate-700"
                >
                  {percentage(row.previous)}
                </p>
              </div>

              <span className="text-lg font-black text-blue-300">
                ←
              </span>

              <div className="min-w-0 text-left">
                <p className="text-[10px] text-slate-500">
                  السعر الجديد
                </p>
                <p
                  dir="ltr"
                  className="mt-1 text-right text-[13px] font-black text-[#2471df]"
                >
                  {percentage(row.rate)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* ================= DESKTOP / TABLET ================= */}
      <div className="hidden md:block">
        {desktopTable(rows.slice(0, 10))}

        {rows.length > 10 && (
          <details className="group mt-4">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-xs font-black text-blue-700 transition hover:bg-blue-100 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                عرض المزيد ({rows.length - 10} قرار)
              </span>
              <span className="hidden group-open:inline">
                إخفاء القرارات الإضافية
              </span>
            </summary>

            <div className="mt-4">
              {desktopTable(rows.slice(10))}
            </div>
          </details>
        )}
      </div>

      {/* ================= MOBILE ONLY ================= */}
      <div className="md:hidden">
        {mobileCards(rows.slice(0, 5))}

        {rows.length > 5 && (
          <details className="group mt-3">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-[11px] font-black text-blue-700 transition hover:bg-blue-100 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                عرض المزيد ({rows.length - 5} قرار)
              </span>
              <span className="hidden group-open:inline">
                إخفاء القرارات الإضافية
              </span>
            </summary>

            <div className="mt-3">
              {mobileCards(rows.slice(5))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}


// =====================================================
// SEO
// =====================================================

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { bank: slug } = await params;
  const bank = await getBank(slug);

  if (!bank) {
    return {
      title: "البنك المركزي غير موجود | بروكر العرب",
      robots: { index: false, follow: false },
    };
  }

  const title =
    bank.seo_title_ar ||
    `سعر الفائدة ${bankName(bank)} اليوم وقرارات البنك المركزي`;

  const description =
    bank.seo_description_ar ||
    `تابع سعر الفائدة لدى ${bank.bank_name_ar}، وقرارات السياسة النقدية والاجتماعات القادمة والسجل التاريخي وتأثير الفائدة على الأسواق.`;

  const canonical =
    validUrl(bank.canonical_url_ar) ||
    `${SITE}${HUB}/${bank.slug}`;

  const ogImage = validUrl(bank.og_image_url);

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: bank.og_title_ar || title,
      description: bank.og_description_ar || description,
      url: canonical,
      siteName: "بروكر العرب",
      locale: "ar_AR",
      type: "article",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: bank.og_title_ar || title,
      description: bank.og_description_ar || description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

// =====================================================
// MAIN PAGE
// =====================================================

export default async function BankPage({ params }: Props) {
  const { bank: slug } = await params;
  const bank = await getBank(slug);

  if (!bank) notFound();

  const name = bankName(bank);
  const rate = rateLabel(bank);
  const meeting = nextMeeting(bank);
  const meetings = upcomingMeetings(bank);
  const history = historyRows(bank);
  const lastChange = number(bank.last_change_bps);

  const h1 =
    bank.seo_h1_ar ||
    bank.hero_title_ar ||
    `سعر الفائدة ${name} اليوم`;

  const heroDescription =
    bank.hero_description_ar ||
    bank.rate_description_ar ||
    bank.overview_ar;

  const faq = (Array.isArray(bank.faq_ar) ? bank.faq_ar : [])
    .map((item) => ({
      question: item.question || item.q || "",
      answer: item.answer || item.a || "",
    }))
    .filter((item) => item.question && item.answer);

  const extraSections = (
    Array.isArray(bank.analysis_sections_ar)
      ? bank.analysis_sections_ar
      : []
  )
    .map((item) => ({
      title: item.title || item.heading || item.h2 || "",
      content:
        item.content ||
        item.body ||
        item.text ||
        item.description ||
        "",
    }))
    .filter((item) => item.title && item.content);

  const sources = [
    {
      title: "الموقع الرسمي",
      url: bank.official_website,
    },
    {
      title: "أسعار الفائدة الرسمية",
      url: bank.official_rates_url,
    },
    {
      title: "تقويم الاجتماعات",
      url: bank.official_calendar_url,
    },
    {
      title: "السجل التاريخي الرسمي",
      url: bank.official_history_url,
    },
    ...(Array.isArray(bank.additional_sources)
      ? bank.additional_sources.map((item) => ({
          title: item.title || item.label || item.name || "مصدر إضافي",
          url: item.url || item.href || null,
        }))
      : []),
  ].filter((item) => validUrl(item.url));

  const canonical =
    validUrl(bank.canonical_url_ar) ||
    `${SITE}${HUB}/${bank.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: bank.seo_title_ar || h1,
        description:
          bank.seo_description_ar ||
          bank.hero_description_ar ||
          "",
        inLanguage: "ar",
        isPartOf: {
          "@type": "WebSite",
          name: "بروكر العرب",
          url: SITE,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: SITE,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "أسعار الفائدة",
            item: `${SITE}${HUB}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: bank.bank_name_ar,
            item: canonical,
          },
        ],
      },
      ...(faq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  const impactSections = [
    {
      title: "تأثير قرارات الفائدة على سوق الفوركس",
      content: bank.forex_impact_ar,
      icon: "FX",
    },
    {
      title: "تأثير أسعار الفائدة على الذهب",
      content: bank.gold_impact_ar,
      icon: "Au",
    },
    {
      title: "تأثير الفائدة على أسواق الأسهم",
      content: bank.stocks_impact_ar,
      icon: "ST",
    },
    {
      title: "تأثير الفائدة على سوق السندات",
      content: bank.bonds_impact_ar,
      icon: "BD",
    },
    {
      title: "العلاقة بين أسعار الفائدة والتضخم",
      content: bank.inflation_impact_ar,
      icon: "CPI",
    },
  ].filter((item) => item.content?.trim());

  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f7fc] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      

{/* ================= HERO — COMPACT INTERNAL PAGE ================= */}
<section className="relative overflow-hidden border-b border-[#d6e5f8] bg-gradient-to-bl from-[#eef5fd] via-[#f8fbff] to-white">

  <div className="pointer-events-none absolute -right-28 -top-32 h-[260px] w-[260px] rounded-full bg-blue-100/50 blur-[85px]" />
  <div className="pointer-events-none absolute -bottom-32 left-0 h-[220px] w-[220px] rounded-full bg-sky-100/40 blur-[75px]" />

  <div className="relative mx-auto max-w-[1520px] px-4 pb-6 pt-3 sm:px-7 sm:pb-7 sm:pt-4 lg:px-10 lg:pb-8">

    {/* BREADCRUMB */}
    <nav
      aria-label="مسار الصفحة"
      className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-500"
    >
      <Link
        href="/"
        className="transition hover:text-[#2471df]"
      >
        الرئيسية
      </Link>

      <span className="text-slate-300">/</span>

      <Link
        href={HUB}
        className="transition hover:text-[#2471df]"
      >
        أسعار الفائدة
      </Link>

      <span className="text-slate-300">/</span>

      <span className="text-[#1e5bb8]">
        {name}
      </span>
    </nav>

    {/* PAGE INTRO */}
    <div className="flex flex-col gap-3">

      {/* COUNTRY AND CURRENCY */}
      <div className="flex flex-wrap items-center gap-2">

        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[10px] font-black text-[#1e5bb8] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#2471df]" />
          {bank.country_ar || "البنوك المركزية"}
          {bank.currency_code ? ` · ${bank.currency_code}` : ""}
        </span>

        <span className="rounded-full border border-blue-100 bg-[#eef5fd] px-3 py-1.5 text-[10px] font-black text-[#1e5bb8]">
          السياسة النقدية وأسعار الفائدة
        </span>

      </div>

      {/* MAIN HEADING */}
      
<h1 className="max-w-[1200px] text-[23px] font-black leading-[1.35] tracking-tight text-[#091b32] sm:text-[36px] lg:text-[40px]">
  {h1}
</h1>


      {/* DESCRIPTION */}
      {heroDescription && (
        <p className="max-w-[1250px] text-[12px] font-medium leading-7 text-slate-600 sm:text-[14px] sm:leading-8">
          {heroDescription}
        </p>
      )}

    </div>

    {/* KEY INTEREST RATE INFORMATION */}
    <div className="mt-4 grid grid-cols-2 gap-2 lg:mt-5 lg:grid-cols-4 lg:gap-3">

      {/* CURRENT RATE */}
      <div className="rounded-2xl border border-[#cbdff8] bg-white px-3 py-3.5 shadow-sm sm:px-4">

        <p className="text-[10px] font-bold text-slate-500 sm:text-xs">
          سعر الفائدة الحالي
        </p>

        <p
          dir="ltr"
          className="mt-1.5 text-right text-[25px] font-black leading-tight text-[#2471df] sm:text-[29px]"
        >
          {rate}
        </p>

        <p className="mt-1.5 text-[10px] leading-5 text-slate-500">
          {bank.slug === "fed"
            ? "الحد الأعلى للنطاق المستهدف للفائدة"
            : bank.rate_type_ar || "سعر الفائدة المرجعي"}
        </p>

      </div>

      {/* PREVIOUS RATE */}
      <div className="rounded-2xl border border-[#d6e5f8] bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3.5">

        <p className="text-[10px] font-bold text-slate-500 sm:text-xs">
          سعر الفائدة السابق
        </p>

        <p
          dir="ltr"
          className="mt-1.5 text-right text-[25px] font-black leading-tight text-[#091b32] sm:text-[29px]"
        >
          {percentage(bank.previous_rate)}
        </p>

        <p className="mt-1.5 text-[10px] leading-5 text-slate-500">
          قبل آخر قرار نقدي مسجل
        </p>

      </div>

      {/* LATEST DECISION */}
      <div className="rounded-2xl border border-[#d6e5f8] bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3.5">

        <p className="text-[10px] font-bold text-slate-500 sm:text-xs">
          آخر قرار للفائدة
        </p>

        <p
          className={`mt-2 text-[14px] font-black leading-7 sm:text-[16px] ${decisionColor(lastChange)}`}
        >
          {decisionLabel(
            lastChange,
            bank.last_decision_type
          )}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-slate-500">
          {dateAr(bank.last_decision_date)}
        </p>

      </div>

      {/* NEXT MEETING */}
      <div className="rounded-2xl border border-[#d6e5f8] bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3.5">

        <p className="text-[10px] font-bold text-slate-500 sm:text-xs">
          الاجتماع القادم
        </p>

        <p className="mt-2 text-[14px] font-black leading-7 text-[#091b32] sm:text-[16px]">
          {meeting
            ? dateAr(meeting.meeting_date)
            : "لم يُعلن"}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-slate-500">
          وفق المواعيد المسجلة للبنك
        </p>

      </div>

    </div>

    {/* LINKS AND DATA NOTES */}
    <div className="mt-4 flex flex-col gap-3 border-t border-[#d6e5f8] pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

      
{/* QUICK LINKS */}
<div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">

  <a
    href="#history"
    className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#2471df] px-2 py-2 text-center text-[10px] font-black text-white transition hover:bg-[#1e5bb8] sm:px-3.5 sm:text-[11px]"
  >
    سجل القرارات ←
  </a>

  <a
    href="#meetings"
    className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-200 bg-white px-2 py-2 text-center text-[10px] font-black text-[#1e5bb8] transition hover:bg-blue-50 sm:px-3.5 sm:text-[11px]"
  >
    الاجتماعات القادمة ←
  </a>

  <a
    href="#analysis"
    className="col-span-2 inline-flex min-h-9 w-full max-w-[220px] items-center justify-center justify-self-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-center text-[10px] font-black text-[#1e5bb8] transition hover:bg-blue-50 sm:w-auto sm:max-w-none sm:px-3.5 sm:text-[11px]"
  >
    تحليل السياسة النقدية ←
  </a>

</div>


      {/* DATA VERIFICATION */}
      <div className="text-[10px] leading-5 text-slate-500">

        {bank.last_rate_verified_at ? (
          <p>
            آخر تحقق من البيانات:{" "}
            <span className="font-black text-slate-700">
              {dateAr(bank.last_rate_verified_at)}
            </span>
          </p>
        ) : (
          <p>
            الأسعار مستمدة من البيانات المسجلة وليست بثًا مباشرًا لحظيًا.
          </p>
        )}

      </div>

    </div>

    {/* FEDERAL RESERVE RATE RANGE CLARIFICATION */}
    {bank.slug === "fed" &&
      number(bank.current_rate_lower) !== null &&
      number(bank.current_rate_upper) !== null && (
        <p className="mt-3 text-[10px] leading-5 text-slate-500">
          ملاحظة: السعر المعروض يمثل الحد الأعلى للنطاق المستهدف
          للفائدة الفيدرالية، بينما النطاق الكامل هو{" "}
          <span dir="ltr" className="inline-block font-bold">
            {percentage(bank.current_rate_lower)} –{" "}
            {percentage(bank.current_rate_upper)}
          </span>
          .
        </p>
      )}

  </div>
</section>



    
{/* ================= CONTENT ================= */}
<div className="mx-auto max-w-[1520px] space-y-5 px-4 py-5 sm:px-7 sm:py-7 lg:px-10">

  {/* OVERVIEW */}


        
{/* ================= OVERVIEW ================= */}
{bank.overview_ar?.trim() && (
  <section className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6">
      <p className="text-[11px] font-black text-[#2471df]">
        نظرة عامة على البنك المركزي
      </p>

      <h2 className="mt-2 text-[21px] font-black leading-9 text-[#091b32] sm:text-[26px]">
        نبذة عن {bank.bank_name_ar}
      </h2>
    </div>

    <div className="px-5 py-5 sm:px-7 sm:py-6">
      <div className="max-w-[1250px] space-y-4">
        {bank.overview_ar
          .split(/\n\s*\n/)
          .filter((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <p
              key={index}
              className="whitespace-pre-line text-[13px] leading-8 text-slate-600 sm:text-[14px] sm:leading-9"
            >
              {paragraph.trim()}
            </p>
          ))}
      </div>
    </div>
  </section>
)}

{/* ================= BANK INFORMATION GRID ================= */}
<div className="grid items-start gap-4 lg:grid-cols-2">

  {/* ROLE OF CENTRAL BANK */}
  {bank.bank_role_ar?.trim() && (
    <section className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-[11px] font-black text-[#2471df]">
        مهام البنك المركزي
      </p>

      <h2 className="mt-2 text-xl font-black leading-9 text-[#091b32] sm:text-[23px]">
        دور {bank.bank_name_ar} في الاقتصاد
      </h2>

      <div className="mt-4 space-y-4">
        {bank.bank_role_ar
          .split(/\n\s*\n/)
          .filter((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <p
              key={index}
              className="whitespace-pre-line text-[13px] leading-8 text-slate-600 sm:text-[14px] sm:leading-9"
            >
              {paragraph.trim()}
            </p>
          ))}
      </div>
    </section>
  )}

  {/* MONETARY POLICY */}
  {bank.monetary_policy_ar?.trim() && (
    <section className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-[11px] font-black text-[#2471df]">
        السياسة النقدية
      </p>

      <h2 className="mt-2 text-xl font-black leading-9 text-[#091b32] sm:text-[23px]">
        كيف يدير {name} السياسة النقدية؟
      </h2>

      <div className="mt-4 space-y-4">
        {bank.monetary_policy_ar
          .split(/\n\s*\n/)
          .filter((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <p
              key={index}
              className="whitespace-pre-line text-[13px] leading-8 text-slate-600 sm:text-[14px] sm:leading-9"
            >
              {paragraph.trim()}
            </p>
          ))}
      </div>
    </section>
  )}
</div>

{/* ================= POLICY RATE EXPLANATION ================= */}
{bank.rate_description_ar?.trim() && (
  <section className="rounded-[20px] border border-[#d6e5f8] bg-[#f8fbff] p-5 shadow-sm sm:p-7">
    <p className="text-[11px] font-black text-[#2471df]">
      فهم سعر الفائدة المرجعي
    </p>

    <h2 className="mt-2 text-xl font-black leading-9 text-[#091b32] sm:text-[24px]">
      ما هو سعر الفائدة لدى {name}؟
    </h2>

    <div className="mt-4 max-w-[1250px] space-y-4">
      {bank.rate_description_ar
        .split(/\n\s*\n/)
        .filter((paragraph) => paragraph.trim())
        .map((paragraph, index) => (
          <p
            key={index}
            className="whitespace-pre-line text-[13px] leading-8 text-slate-600 sm:text-[14px] sm:leading-9"
          >
            {paragraph.trim()}
          </p>
        ))}
    </div>
  </section>
)}

{/* ================= HISTORICAL RATE DECISIONS ================= */}
<section
  id="history"
  className="scroll-mt-24 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"
>
  {/* HISTORY HEADER */}
  <div className="border-b border-[#d6e5f8] bg-[#eef5fd] px-5 py-5 sm:px-7 sm:py-6">

    <div className="flex flex-wrap items-start justify-between gap-4">

      <div>
        <p className="text-[11px] font-black text-[#2471df]">
          سجل السياسة النقدية
        </p>

        <h2 className="mt-2 text-xl font-black leading-9 text-[#091b32] sm:text-[26px]">
          سجل قرارات سعر الفائدة لدى {name}
        </h2>

        <p className="mt-2 text-[12px] leading-7 text-slate-600 sm:text-[13px]">
          استعرض القرارات التاريخية المسجلة، بما في ذلك أسعار الفائدة
          السابقة والجديدة، ومقدار التغير بالنقاط الأساسية.
        </p>
      </div>

      <div className="rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-center">
        <p className="text-[10px] font-bold text-slate-500">
          قرارات مسجلة
        </p>
        <p className="mt-1 text-lg font-black text-[#2471df]">
          {history.length}
        </p>
      </div>

    </div>
  </div>

  {/* HISTORY TABLE */}
  <div className="p-3 sm:p-6">

    <HistoryTable rows={history} />

    {validUrl(bank.official_history_url) && (
      <div className="mt-5 flex justify-center">
        <ExternalLink href={bank.official_history_url}>
          مراجعة السجل التاريخي الرسمي
        </ExternalLink>
      </div>
    )}

    <p className="mt-4 text-[10px] leading-6 text-slate-500">
      يعتمد هذا السجل على القرارات التاريخية المحفوظة في قاعدة البيانات.
      يُنصح بمراجعة المصدر الرسمي للبنك المركزي للتحقق من البيانات.
    </p>

  </div>
</section>


{/* ================= HISTORICAL ANALYSIS ================= */}
{bank.rate_history_analysis_ar?.trim() && (
  <section className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">

    <div className="border-b border-slate-100 px-5 py-4 sm:px-7 sm:py-5">
      <p className="text-[11px] font-black text-[#2471df]">
        تحليل تاريخي
      </p>

      <h2 className="mt-1.5 text-xl font-black leading-9 text-[#091b32] sm:text-[24px]">
        تحليل تاريخ أسعار الفائدة لدى {name}
      </h2>
    </div>

    <div className="px-5 py-4 sm:px-7 sm:py-5">
      <div className="space-y-3">
        {bank.rate_history_analysis_ar
          .split(/\n\s*\n/)
          .filter((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <p
              key={index}
              className="whitespace-pre-line text-[13px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8"
            >
              {paragraph.trim()}
            </p>
          ))}
      </div>
    </div>

  </section>
)}


{/* ================= UPCOMING MEETINGS ================= */}
<section
  id="meetings"
  className="scroll-mt-24 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"
>
  {/* HEADER */}
  <div className="border-b border-[#d6e5f8] bg-[#eef5fd] px-5 py-4 sm:px-7 sm:py-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black text-[#2471df]">
          تقويم السياسة النقدية
        </p>

        <h2 className="mt-1.5 text-xl font-black leading-9 text-[#091b32] sm:text-[24px]">
          اجتماعات {name} القادمة
        </h2>

        <p className="mt-1.5 text-[12px] leading-6 text-slate-600 sm:text-[13px]">
          تابع مواعيد اجتماعات البنك المركزي القادمة،
          مع إمكانية الرجوع إلى التقويم الرسمي للتحقق من التواريخ.
        </p>
      </div>

      <div className="shrink-0 rounded-xl border border-blue-100 bg-white px-4 py-2 text-center">
        <p className="text-[10px] font-bold text-slate-500">
          اجتماعات قادمة
        </p>
        <p className="mt-0.5 text-xl font-black text-[#2471df]">
          {meetings.length}
        </p>
      </div>
    </div>
  </div>

  
{/* MEETING CARDS */}
<div className="p-4 sm:p-6">
  {meetings.length > 0 ? (
    <>
      {/* MOBILE ONLY — FIRST 5 MEETINGS */}
      <div className="sm:hidden">
        <div className="space-y-2">
          {meetings.slice(0, 5).map((item, index) => (
            <div
              key={item.id || `${item.meeting_date}-${index}`}
              className={`flex min-h-[65px] items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
                index === 0
                  ? "border-blue-200 bg-[#eef5fd]"
                  : "border-slate-200 bg-[#f8fbff]"
              }`}
            >
              <div>
                <p className="text-[10px] font-bold text-slate-500">
                  {index === 0
                    ? "الاجتماع القادم"
                    : `الاجتماع رقم ${index + 1}`}
                </p>

                <time
                  dateTime={dateOnly(item.meeting_date) || undefined}
                  className="mt-1 block text-[12px] font-black text-[#091b32]"
                >
                  {dateAr(item.meeting_date)}
                </time>
              </div>

              <span className="shrink-0 rounded-lg border border-blue-100 bg-white px-2.5 py-1 text-[10px] font-black text-[#1e5bb8]">
                {index === 0 ? "القادم" : "مجدول"}
              </span>
            </div>
          ))}
        </div>

        {/* MOBILE SHOW MORE */}
        {meetings.length > 5 && (
          <details className="group mt-3">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-[11px] font-black text-[#1e5bb8] transition hover:bg-blue-100 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                عرض المزيد ({meetings.length - 5} اجتماعات) ↓
              </span>

              <span className="hidden group-open:inline">
                إخفاء الاجتماعات الإضافية ↑
              </span>
            </summary>

            <div className="mt-3 space-y-2">
              {meetings.slice(5).map((item, index) => (
                <div
                  key={item.id || `${item.meeting_date}-${index + 5}`}
                  className="flex min-h-[65px] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-[#f8fbff] px-3 py-2.5"
                >
                  <div>
                    <p className="text-[10px] font-bold text-slate-500">
                      الاجتماع رقم {index + 6}
                    </p>

                    <time
                      dateTime={dateOnly(item.meeting_date) || undefined}
                      className="mt-1 block text-[12px] font-black text-[#091b32]"
                    >
                      {dateAr(item.meeting_date)}
                    </time>
                  </div>

                  <span className="shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-black text-slate-600">
                    مجدول
                  </span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* TABLET & DESKTOP — ALL MEETINGS */}
      <div className="hidden grid-cols-2 gap-2.5 sm:grid lg:grid-cols-12">
        {meetings.map((item, index) => {
          const total = meetings.length;

          let gridClass = "lg:col-span-4";

          if (total === 10) {
            gridClass =
              index >= 6 ? "lg:col-span-3" : "lg:col-span-4";
          } else if (total % 4 === 0) {
            gridClass = "lg:col-span-3";
          } else if (total % 3 === 0) {
            gridClass = "lg:col-span-4";
          } else if (total % 2 === 0) {
            gridClass = "lg:col-span-6";
          } else if (index === total - 1) {
            gridClass = "lg:col-span-12";
          }

          return (
            <div
              key={item.id || `${item.meeting_date}-${index}`}
              className={`flex min-h-[72px] items-center justify-between gap-3 rounded-xl border px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50 ${gridClass} ${
                index === 0
                  ? "border-blue-200 bg-[#eef5fd]"
                  : "border-slate-200 bg-[#f8fbff]"
              }`}
            >
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-500">
                  {index === 0
                    ? "الاجتماع القادم"
                    : `الاجتماع رقم ${index + 1}`}
                </p>

                <time
                  dateTime={dateOnly(item.meeting_date) || undefined}
                  className="mt-1 block text-[13px] font-black text-[#091b32]"
                >
                  {dateAr(item.meeting_date)}
                </time>
              </div>

              <span className="shrink-0 rounded-lg border border-blue-100 bg-white px-2.5 py-1 text-[10px] font-black text-[#1e5bb8]">
                {index === 0 ? "القادم" : "مجدول"}
              </span>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center">
      <p className="text-sm font-bold text-slate-600">
        لا تتوفر اجتماعات قادمة مسجلة حاليًا.
      </p>
    </div>
  )}

  {/* FOOTER */}
  <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-[10px] leading-6 text-slate-500">
      قد تتغير المواعيد المعلنة. يُنصح بالرجوع إلى المصدر الرسمي
      للتأكد من تاريخ كل اجتماع.
    </p>

    {validUrl(bank.official_calendar_url) && (
      <ExternalLink href={bank.official_calendar_url}>
        التقويم الرسمي للاجتماعات
      </ExternalLink>
    )}
  </div>



    {/* FOOTER */}
    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[10px] leading-6 text-slate-500">
        قد تتغير المواعيد المعلنة. يُنصح بالرجوع إلى المصدر الرسمي
        للتأكد من تاريخ كل اجتماع.
      </p>

      {validUrl(bank.official_calendar_url) && (
        <ExternalLink href={bank.official_calendar_url}>
          التقويم الرسمي للاجتماعات
        </ExternalLink>
      )}
    </div>
  </div>
</section>



{/* ================= ECONOMIC OUTLOOK ================= */}
{bank.economic_outlook_ar?.trim() && (
  <section className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-100 px-5 py-4 sm:px-7 sm:py-5">
      <p className="text-[11px] font-black text-[#2471df]">
        الاقتصاد والتوقعات
      </p>

      <h2 className="mt-1.5 text-xl font-black leading-9 text-[#091b32] sm:text-[24px]">
        التوقعات الاقتصادية والسياسة النقدية لدى {name}
      </h2>

      <p className="mt-1.5 text-[12px] leading-6 text-slate-500">
        أبرز العوامل الاقتصادية المؤثرة في توجهات السياسة النقدية
        وقرارات أسعار الفائدة.
      </p>
    </div>

    <div className="px-5 py-4 sm:px-7 sm:py-5">
      <div className="space-y-3">
        {bank.economic_outlook_ar
          .split(/\n\s*\n/)
          .filter((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <p
              key={index}
              className="whitespace-pre-line text-[13px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8"
            >
              {paragraph.trim()}
            </p>
          ))}
      </div>
    </div>
  </section>
)}

{/* ================= MARKET IMPACT ================= */}
{impactSections.length > 0 && (
  <section
    id="analysis"
    className="scroll-mt-24 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"
  >
    {/* HEADER */}
    <div className="border-b border-slate-100 px-5 py-4 sm:px-7 sm:py-5">
      <p className="text-[11px] font-black text-[#2471df]">
        تحليل تأثير الفائدة
      </p>

      <h2 className="mt-1.5 text-xl font-black leading-9 text-[#091b32] sm:text-[24px]">
        تأثير قرارات {name} على الأسواق المالية
      </h2>

      <p className="mt-1.5 text-[12px] leading-6 text-slate-500">
        كيف يمكن أن تؤثر قرارات أسعار الفائدة على الفوركس
        والذهب والأسهم والسندات والتضخم؟
      </p>
    </div>

    {/* IMPACT CARDS */}
    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-6">
      {impactSections.map((item, index) => {
        const total = impactSections.length;

        let gridClass = "lg:col-span-3";

        if (total === 5) {
          gridClass =
            index < 3 ? "lg:col-span-2" : "lg:col-span-3";
        } else if (total % 3 === 0) {
          gridClass = "lg:col-span-2";
        } else if (total % 2 === 0) {
          gridClass = "lg:col-span-3";
        } else if (index === total - 1) {
          gridClass = "lg:col-span-6";
        }

        const paragraphs = item.content!
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean);

        return (
          <article
            key={`${item.icon}-${index}`}
            className={`min-w-0 rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 transition-colors hover:border-blue-200 sm:p-5 ${gridClass}`}
          >
            {/* CARD TITLE */}
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e3efff] text-[11px] font-black text-[#1e5bb8]">
                {item.icon}
              </span>

              <h3 className="text-[14px] font-black leading-7 text-[#091b32] sm:text-[15px]">
                {item.title}
              </h3>
            </div>

            {/* MOBILE SHORT PREVIEW */}
            <div className="mt-3 sm:hidden">
              {paragraphs.length > 0 && (
                <p className="line-clamp-3 whitespace-pre-line text-[12px] leading-7 text-slate-600">
                  {paragraphs[0]}
                </p>
              )}

              {paragraphs.length > 0 && (
                <details className="group mt-2">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[11px] font-black text-[#2471df] [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">
                      عرض المزيد ↓
                    </span>
                    <span className="hidden group-open:inline">
                      إخفاء التفاصيل ↑
                    </span>
                  </summary>

                  <div className="mt-3 space-y-3 border-t border-blue-100 pt-3">
                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="whitespace-pre-line text-[12px] leading-7 text-slate-600"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </details>
              )}
            </div>

            {/* TABLET AND DESKTOP FULL CONTENT */}
            <div className="mt-3 hidden space-y-3 sm:block">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="whitespace-pre-line text-[13px] leading-7 text-slate-600 sm:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  </section>
)}

{/* ================= CUSTOM ANALYSIS ================= */}
{extraSections.length > 0 && (
  <section className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
    {/* HEADER */}
    <div className="border-b border-slate-100 px-5 py-4 sm:px-7 sm:py-5">
      <p className="text-[11px] font-black text-[#2471df]">
        تحليل متخصص
      </p>

      <h2 className="mt-1.5 text-xl font-black leading-9 text-[#091b32] sm:text-[24px]">
        تحليلات إضافية حول {name}
      </h2>

      <p className="mt-1.5 text-[12px] leading-6 text-slate-500">
        معلومات وتفسيرات إضافية تساعد على فهم
        قرارات البنك المركزي وتوجهاته النقدية.
      </p>
    </div>

    {/* ANALYSIS CARDS */}
    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6">
      {extraSections.map((item, index) => {
        const paragraphs = item.content
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean);

        return (
          <article
            key={`${item.title}-${index}`}
            className={`min-w-0 rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 transition-colors hover:border-blue-200 sm:p-5 ${
              extraSections.length % 2 === 1 &&
              index === extraSections.length - 1
                ? "sm:col-span-2"
                : ""
            }`}
          >
            <h3 className="text-[14px] font-black leading-7 text-[#091b32] sm:text-[15px]">
              {item.title}
            </h3>

            {/* MOBILE PREVIEW */}
            <div className="mt-3 sm:hidden">
              <p className="line-clamp-3 whitespace-pre-line text-[12px] leading-7 text-slate-600">
                {paragraphs[0] || ""}
              </p>

              <details className="group mt-2">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[11px] font-black text-[#2471df] [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">
                    عرض المزيد ↓
                  </span>
                  <span className="hidden group-open:inline">
                    إخفاء التفاصيل ↑
                  </span>
                </summary>

                <div className="mt-3 space-y-3 border-t border-blue-100 pt-3">
                  {paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="whitespace-pre-line text-[12px] leading-7 text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            </div>

            {/* TABLET AND DESKTOP */}
            <div className="mt-3 hidden space-y-3 sm:block">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="whitespace-pre-line text-[13px] leading-7 text-slate-600 sm:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  </section>
)}


        {/* ================= FAQ ================= */}
        {faq.length > 0 && (
          <section className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <p className="text-xs font-black text-blue-600">
              الأسئلة الشائعة
            </p>

            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              الأسئلة الشائعة حول أسعار فائدة {name}
            </h2>

            <div className="mt-5 space-y-2">
              {faq.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-black leading-7 [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>

                    <span className="text-lg font-black text-blue-700 group-open:hidden">
                      +
                    </span>

                    <span className="hidden text-lg font-black text-blue-700 group-open:inline">
                      −
                    </span>
                  </summary>

                  <p className="mt-3 whitespace-pre-line border-t border-slate-200 pt-3 text-xs leading-8 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ================= OTHER BANKS ================= */}
        <section className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-black sm:text-2xl">
            استكشف أسعار الفائدة لدى البنوك المركزية الأخرى
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-12">
            {BANK_SLUGS.filter((item) => item !== bank.slug).map(
              (item) => {
                const labels: Record<string, string> = {
                  fed: "الفيدرالي الأمريكي",
                  ecb: "المركزي الأوروبي",
                  boe: "بنك إنجلترا",
                  boj: "بنك اليابان",
                  boc: "بنك كندا",
                  rba: "المركزي الأسترالي",
                  snb: "المركزي السويسري",
                  rbnz: "المركزي النيوزيلندي",
                };

                return (
                  <Link
  key={item}
  href={`${HUB}/${item}`}
  className={`flex min-h-[68px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-black leading-6 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 ${
    BANK_SLUGS.filter((bankSlug) => bankSlug !== bank.slug).length === 7
      ? "lg:col-span-3 lg:[&:nth-child(n+5)]:col-span-4"
      : "lg:col-span-3"
  }`}
>
  {labels[item]}
</Link>
                );
              }
            )}
          </div>

          <div className="mt-5 text-center">
            <Link
              href={HUB}
              className="inline-flex rounded-xl bg-[#2471df] px-5 py-3 text-xs font-black text-white transition hover:bg-[#1e5bb8]"
            >
              مقارنة أسعار الفائدة لجميع البنوك
            </Link>
          </div>
        </section>

        {/* ================= METHODOLOGY ================= */}
        <Section
          eyebrow="الشفافية"
          title="منهجية جمع وتحديث بيانات أسعار الفائدة"
          content={bank.methodology_ar}
        />

        {/* ================= SOURCES ================= */}
        <section className="rounded-[20px] border border-blue-200 bg-[#eef5fd] p-5 sm:p-7">
          <p className="text-xs font-black text-blue-700">
            المصادر الرسمية
          </p>

          <h2 className="mt-2 text-xl font-black sm:text-2xl">
            مصادر بيانات {bank.bank_name_ar}
          </h2>

          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
            {sources.map((source, index) => (
              <ExternalLink
                key={`${source.title}-${index}`}
                href={source.url}
              >
                {source.title}
              </ExternalLink>
            ))}
          </div>

          {bank.content_reviewed_at && (
            <p className="mt-5 text-xs text-slate-500">
              آخر مراجعة للمحتوى:{" "}
              {dateAr(bank.content_reviewed_at)}
            </p>
          )}

          {bank.data_disclaimer_ar && (
            <p className="mt-4 whitespace-pre-line border-t border-blue-200 pt-4 text-xs leading-7 text-slate-600">
              {bank.data_disclaimer_ar}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
