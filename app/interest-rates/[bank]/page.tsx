
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

  if (bank.rate_format === "range" && lower !== null && upper !== null) {
    return `${percentage(lower)} – ${percentage(upper)}`;
  }

  if (current !== null) return percentage(current);

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

function nextMeeting(bank: Bank): Meeting | null {
  const today = new Date().toISOString().slice(0, 10);

  return (
    (Array.isArray(bank.meetings) ? bank.meetings : [])
      .filter((meeting) => {
        const date = dateOnly(meeting.meeting_date);
        return (
          date !== null &&
          date >= today &&
          meeting.status !== "completed" &&
          meeting.status !== "cancelled"
        );
      })
      .sort((a, b) =>
        (a.meeting_date || "").localeCompare(b.meeting_date || "")
      )[0] || null
  );
}

function upcomingMeetings(bank: Bank): Meeting[] {
  const today = new Date().toISOString().slice(0, 10);

  return (Array.isArray(bank.meetings) ? bank.meetings : [])
    .filter((meeting) => {
      const date = dateOnly(meeting.meeting_date);
      return (
        date !== null &&
        date >= today &&
        meeting.status !== "completed" &&
        meeting.status !== "cancelled"
      );
    })
    .sort((a, b) =>
      (a.meeting_date || "").localeCompare(b.meeting_date || "")
    );
}

function historyRows(bank: Bank): HistoryRow[] {
  const map = new Map<string, HistoryRow>();

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
      source: validUrl(item.decision_source_url || item.source_url),
    });
  }

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
      previous: number(item.previous_rate) ?? existing?.previous ?? null,
      change: number(item.change_bps) ?? existing?.change ?? null,
      type: item.decision_type || existing?.type || null,
      source: validUrl(item.decision_source_url) || existing?.source || null,
    });
  }

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

  function renderRows(items: HistoryRow[]) {
    return items.map((row, index) => (
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
    ));
  }

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
        <tbody>{renderRows(items)}</tbody>
      </table>
    );
  }

  function mobileCards(items: HistoryRow[]) {
    return (
      <div className="space-y-2">
        {items.map((row, index) => (
          <div
            key={`${row.date}-${index}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <time className="text-xs font-black text-slate-900">
                {dateAr(row.date)}
              </time>

              <span
                className={`text-[11px] font-black ${decisionColor(row.change)}`}
              >
                {decisionLabel(row.change, row.type)}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white p-3 text-center">
                <p className="text-[10px] text-slate-500">
                  السعر السابق
                </p>
                <p className="mt-1 text-sm font-black">
                  {percentage(row.previous)}
                </p>
              </div>

              <div className="rounded-lg bg-white p-3 text-center">
                <p className="text-[10px] text-slate-500">
                  السعر الجديد
                </p>
                <p className="mt-1 text-sm font-black text-blue-700">
                  {percentage(row.rate)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="hidden md:block">
        {desktopTable(rows.slice(0, 10))}
      </div>

      <div className="md:hidden">
        {mobileCards(rows.slice(0, 10))}
      </div>

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

          <div className="mt-4 hidden md:block">
            {desktopTable(rows.slice(10))}
          </div>

          <div className="mt-4 md:hidden">
            {mobileCards(rows.slice(10))}
          </div>
        </details>
      )}
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

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-l from-[#123f78] via-[#0b2a4c] to-[#06192e] text-white">
  <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-8">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] text-blue-100 sm:text-xs">
            <Link href="/" className="hover:text-white">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href={HUB} className="hover:text-white">
              أسعار الفائدة
            </Link>
            <span>/</span>
            <span className="text-white">{name}</span>
          </nav>

          <div className="mt-4 grid items-center gap-5 lg:mt-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            <div>
              <span className="inline-flex rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-cyan-100">
                {bank.country_ar || "البنوك المركزية"}
                {bank.currency_code
                  ? ` · ${bank.currency_code}`
                  : ""}
              </span>

              <h1 className="mt-4 text-[27px] font-black leading-[1.45] sm:text-4xl lg:text-[44px]">
                {h1}
              </h1>

              {heroDescription && (
                <p className="mt-4 max-w-3xl text-[13px] leading-8 text-blue-100 sm:text-base sm:leading-9">
                  {heroDescription}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="#history"
                  className="rounded-xl bg-[#2471df] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#1e5bb8]"
                >
                  سجل القرارات
                </a>

                <a
                  href="#meetings"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/15"
                >
                  الاجتماعات القادمة
                </a>

                <a
                  href="#analysis"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/15"
                >
                  تحليل السياسة النقدية
                </a>
              </div>
            </div>

            {/* HERO RATE PANEL */}
            <aside className="w-full overflow-hidden rounded-[20px] border border-blue-200 bg-[#eef5fd] p-3 text-slate-900 shadow-xl sm:p-5 lg:max-w-[480px] lg:justify-self-end">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold text-blue-600">
                    لوحة متابعة سعر الفائدة
                  </p>

                  <h2 className="mt-1 text-base font-black sm:text-lg">
                    {name}
                  </h2>
                </div>

                <span className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-black text-blue-700">
                  {bank.currency_code || "—"}
                </span>
              </div>

              <div className="mt-3 rounded-xl border border-blue-100 bg-white p-4 text-center sm:p-5">
                <p className="text-xs text-slate-500">
                  سعر الفائدة الحالي
                </p>

                <p
                  dir="ltr"
                  className="mt-2 text-center text-3xl font-black text-[#1e5bb8] sm:text-4xl"
                >
                  {rate}
                </p>

                {bank.rate_type_ar && (
                  <p className="mt-3 text-[11px] leading-6 text-slate-500">
                    {bank.rate_type_ar}
                  </p>
                )}
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    آخر قرار
                  </p>
                  <p
                    className={`mt-2 text-xs font-black ${decisionColor(lastChange)}`}
                  >
                    {decisionLabel(
                      lastChange,
                      bank.last_decision_type
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 text-center">
                  <p className="text-[10px] text-slate-500">
                    تاريخ القرار
                  </p>
                  <p className="mt-2 text-xs font-black">
                    {dateAr(bank.last_decision_date)}
                  </p>
                </div>
              </div>

              <div className="mt-2 rounded-xl border border-blue-200 bg-[#dceafb] p-3 text-center">
                <p className="text-[10px] font-bold text-blue-700">
                  الاجتماع القادم
                </p>

                <p className="mt-1 text-sm font-black text-slate-900">
                  {meeting
                    ? dateAr(meeting.meeting_date)
                    : "لا يوجد موعد مسجل"}
                </p>
              </div>

              {bank.last_rate_verified_at && (
                <p className="mt-3 text-center text-[10px] leading-5 text-slate-500">
                  آخر تحقق من السعر:{" "}
                  {dateAr(bank.last_rate_verified_at)}
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="mx-auto max-w-[1520px] space-y-5 px-4 py-6 sm:px-7 sm:py-8 lg:px-10">

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            title="سعر الفائدة الحالي"
            value={rate}
            subtitle={bank.rate_type_ar || undefined}
            valueClass="text-[#1e5bb8]"
          />

          <StatCard
            title="السعر السابق"
            value={percentage(bank.previous_rate)}
          />

          <StatCard
            title="آخر قرار"
            value={decisionLabel(
              lastChange,
              bank.last_decision_type
            )}
            subtitle={dateAr(bank.last_decision_date)}
            valueClass={decisionColor(lastChange)}
          />

          <StatCard
            title="الاجتماع القادم"
            value={
              meeting
                ? dateAr(meeting.meeting_date)
                : "غير متاح"
            }
          />
        </div>

        {/* OVERVIEW */}
        <Section
          eyebrow="نظرة عامة"
          title={`نبذة عن ${bank.bank_name_ar}`}
          content={bank.overview_ar}
        />

        <Section
          eyebrow="مهام البنك المركزي"
          title={`دور ${bank.bank_name_ar} في الاقتصاد`}
          content={bank.bank_role_ar}
        />

        <Section
          eyebrow="السياسة النقدية"
          title={`كيف يدير ${name} السياسة النقدية؟`}
          content={bank.monetary_policy_ar}
        />

        <Section
          eyebrow="سعر الفائدة المرجعي"
          title={`ما هو سعر الفائدة لدى ${name}؟`}
          content={bank.rate_description_ar}
        />

        {/* ================= HISTORY ================= */}
        <section
          id="history"
          className="scroll-mt-24 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-[#eef5fd] p-5 sm:p-7">
            <p className="text-xs font-black text-blue-600">
              القرارات التاريخية
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black sm:text-2xl">
                سجل قرارات سعر الفائدة لدى {name}
              </h2>

              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-blue-700">
                {history.length} قرار
              </span>
            </div>

            <p className="mt-3 text-xs leading-7 text-slate-600">
              استعرض قرارات الفائدة السابقة، وأسعار الفائدة
              قبل وبعد كل قرار، ومقدار التغير بالنقاط الأساسية.
            </p>
          </div>

          <div className="p-3 sm:p-6">
            <HistoryTable rows={history} />

            {validUrl(bank.official_history_url) && (
              <div className="mt-5 text-center">
                <ExternalLink href={bank.official_history_url}>
                  مراجعة السجل التاريخي الرسمي
                </ExternalLink>
              </div>
            )}
          </div>
        </section>

        <Section
          eyebrow="تحليل تاريخي"
          title={`تحليل تاريخ أسعار الفائدة لدى ${name}`}
          content={bank.rate_history_analysis_ar}
        />

        {/* ================= MEETINGS ================= */}
        <section
          id="meetings"
          className="scroll-mt-24 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <p className="text-xs font-black text-blue-600">
            جدول السياسة النقدية
          </p>

          <h2 className="mt-2 text-xl font-black sm:text-2xl">
            اجتماعات {name} القادمة
          </h2>

          <p className="mt-3 text-xs leading-7 text-slate-600">
            المواعيد المستقبلية المسجلة لاجتماعات البنك المركزي.
            قد تتغير التواريخ، لذلك يُنصح بمراجعة التقويم الرسمي.
          </p>

          {meetings.length ? (
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {meetings.slice(0, 9).map((item, index) => (
                <div
                  key={item.id || `${item.meeting_date}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div>
                    <p className="text-[10px] text-slate-500">
                      اجتماع {index + 1}
                    </p>
                    <p className="mt-1 text-xs font-black">
                      {dateAr(item.meeting_date)}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black text-blue-700">
                    مجدول
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-slate-50 p-5 text-center text-xs text-slate-500">
              لا تتوفر اجتماعات قادمة مسجلة حاليًا.
            </div>
          )}

          <div className="mt-5 flex justify-center">
            <ExternalLink href={bank.official_calendar_url}>
              التقويم الرسمي للاجتماعات
            </ExternalLink>
          </div>
        </section>

        {/* ================= ECONOMIC OUTLOOK ================= */}
        <Section
          eyebrow="الاقتصاد والتوقعات"
          title={`التوقعات الاقتصادية والسياسة النقدية لدى ${name}`}
          content={bank.economic_outlook_ar}
        />

        {/* ================= MARKET IMPACT ================= */}
        {impactSections.length > 0 && (
          <section
            id="analysis"
            className="scroll-mt-24 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          >
            <p className="text-xs font-black text-blue-600">
              تحليل تأثير الفائدة
            </p>

            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              تأثير قرارات {name} على الأسواق المالية
            </h2>

            <div className="mt-5 grid gap-3 lg:grid-cols-6">
              {impactSections.map((item) => (
                <article
  key={item.icon}
  className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 ${
    impactSections.length === 5
      ? "lg:col-span-2 lg:[&:nth-child(n+4)]:col-span-3"
      : "lg:col-span-3"
  }`}
>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xs font-black text-blue-700">
                      {item.icon}
                    </span>

                    <h3 className="text-sm font-black leading-7">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-3 space-y-3">
                    {item.content!
                      .split(/\n\s*\n/)
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="whitespace-pre-line text-xs leading-8 text-slate-600"
                        >
                          {paragraph.trim()}
                        </p>
                      ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ================= CUSTOM ANALYSIS ================= */}
{extraSections.length > 0 && (
  <section className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
    <div className="mb-5">
      <p className="text-xs font-black text-[#2471df]">
        تحليل متخصص
      </p>

      <h2 className="mt-2 text-xl font-black sm:text-2xl">
        تحليلات إضافية حول {name}
      </h2>
    </div>

    <div className="grid gap-3 lg:grid-cols-2">
      {extraSections.map((item, index) => (
        <article
          key={`${item.title}-${index}`}
          className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 ${
            extraSections.length % 2 === 1 &&
            index === extraSections.length - 1
              ? "lg:col-span-2"
              : ""
          }`}
        >
          <h3 className="text-sm font-black leading-7 text-slate-950 sm:text-base">
            {item.title}
          </h3>

          <p className="mt-3 whitespace-pre-line text-xs leading-8 text-slate-600 sm:text-sm">
            {item.content}
          </p>
        </article>
      ))}
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
