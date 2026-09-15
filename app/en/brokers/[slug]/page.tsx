import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrokerRelatedComparisons from "../../../components/BrokerRelatedComparisons";


type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  best_for_en: string | null;
  intro_en: string | null;
  slug: string | null;
  publication_status: "draft" | "published" | "unpublished";
  preview_enabled: boolean;
  preview_token: string | null;
  published_at: string | null;
  updated_at: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  trading_assets: string | null;
  best_for: string | null;
  intro: string | null;
  logo: string | null;
  pros: string | null;
  cons: string | null;
  pros_en: string | null;
  cons_en: string | null;
  fees_en: string | null;
  spreads_en: string | null;
  account_types: string | null;
  fees: string | null;
  spreads: string | null;
  deposit_withdrawal: string | null;
  platform_details: string | null;
  support: string | null;
  safety: string | null;
  arab_traders: string | null;
  final_verdict: string | null;
  support_en: string | null;
  safety_en: string | null;
  final_verdict_en: string | null;
  meta_title_en: string | null;
  meta_description_en: string | null;
  deposit_withdrawal_en: string | null;
  platform_details_en: string | null;
  meta_title: string | null;
  meta_description: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
  mt4_download_url: string | null;
  mt5_download_url: string | null;
  founded_year: string | null;
  headquarters: string | null;
  headquarters_en: string | null;
  max_leverage: string | null;
  max_leverage_note_en: string | null;
  account_availability_note_en: string | null;
  accounts_intro_en: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  mt4_image: string | null;
  mt5_image: string | null;
  mobile_app_image: string | null;
  platform_image: string | null;
  company_image: string | null;
  quick_facts: string | null;
  score_safety: number | null;
  score_fees: number | null;
  score_platforms: number | null;
  score_deposit: number | null;
  score_support: number | null;
  faq_ar: { question: string; answer: string }[] | null;
  faq_en: { question: string; answer: string }[] | null;
  broker_positioning_en: string | null;
  who_should_use_en: string | null;
  who_should_avoid_en: string | null;
  key_strength_en: string | null;
  key_weakness_en: string | null;

  broker_positioning_ar: string | null;
  who_should_use_ar: string | null;
  who_should_avoid_ar: string | null;
  key_strength_ar: string | null;
  key_weakness_ar: string | null;
  expert_insight_en: string | null;
  expert_insight_ar: string | null;

  deposit_withdrawal_summary_en: string | null;
  payment_methods_en: string | null;
  withdrawal_speed_en: string | null;

  platform_summary_en: string | null;
  available_platforms_en: string | null;
  platform_tools_en: string | null;

  regulation_summary_en: string | null;
  fund_protection_en: string | null;
  safety_factors_en: string | null;
};

type RelatedBroker = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string | null;
  rating: number | null;
  logo: string | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  spread: string | null;
  commission: string | null;
  commission_en: string | null;
  min_deposit: string | null;
  min_deposit_en: string | null;
  execution_type: string | null;
  best_for: string | null;
  best_for_en: string | null;
  sort_order: number | null;
};

type BrokerLicense = {
  id: number;
  broker_id: number;
  regulator_code: string | null;
  regulator_name_ar: string | null;
  regulator_name_en: string | null;
  country_ar: string | null;
  country_en: string | null;
  country_code: string | null;
  license_number: string | null;
  entity_name_ar: string | null;
  entity_name_en: string | null;
  status_code: string | null;
  verification_url_ar: string | null;
  verification_url_en: string | null;
  trust_level: string | null;
  regulator_description_ar: string | null;
  regulator_description_en: string | null;
  last_verified: string | null;
  is_active: boolean | null;
};

const SITE_URL = "https://brokeralarab.com";

function absoluteUrl(value?: string | null) {
  if (!value) return undefined;

  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return undefined;
  }
}

function toIsoDate(value?: string | null) {
  if (!value) return undefined;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? undefined
    : date.toISOString();
}

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function splitText(value: string | null) {
  if (!value) return [];
  return value
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitRichText(value: string | null) {
  if (!value) return [];
  return value
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

function accountSlug(value: string | null) {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function withPreview(path: string, previewToken?: string) {
  if (!previewToken) return path;

  return `${path}?preview=${encodeURIComponent(previewToken)}`;
}

async function getBroker(
  slug: string,
  previewToken?: string
): Promise<Broker | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const broker = data as Broker;

  if (broker.publication_status === "published") {
    return broker;
  }

  const validPreview =
    broker.preview_enabled === true &&
    Boolean(previewToken) &&
    broker.preview_token === previewToken;

  if (validPreview) {
    return broker;
  }

  return null;
}

async function getRelatedBrokers(
  currentSlug: string
): Promise<RelatedBroker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select("id, name, name_en, slug, rating, logo")
    .eq("publication_status", "published")
    .neq("slug", currentSlug)
    .order("id", { ascending: true })
    .limit(30);

  if (error || !data) return [];

  return data as RelatedBroker[];
}

async function getBrokerAccounts(brokerId: number): Promise<BrokerAccount[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("broker_accounts")
    .select("*")
    .eq("broker_id", brokerId)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return data as BrokerAccount[];
}

async function getBrokerLicenses(
  brokerId: number
): Promise<BrokerLicense[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("broker_licenses")
    .select("*")
    .eq("broker_id", brokerId)
    .eq("is_active", true)
    .order("regulator_code", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as BrokerLicense[];
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ preview?: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = (await searchParams) || {};

  const previewToken = Array.isArray(query.preview)
    ? query.preview[0]
    : query.preview;

  const broker = await getBroker(slug, previewToken);

  if (!broker) {
    return {
      title: "Broker Not Found | Broker Alarab",
      description: "The requested broker review could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const brokerName =
    broker.name_en?.trim() ||
    broker.name?.trim() ||
    "Forex Broker";

  const canonicalSlug = broker.slug || slug;
  const canonicalUrl =
    `${SITE_URL}/en/brokers/${canonicalSlug}`;

  const publishedTime = toIsoDate(
    broker.published_at
  );

  const modifiedTime = toIsoDate(
    broker.updated_at || broker.published_at
  );

  const reviewDate = modifiedTime
    ? new Date(modifiedTime)
    : publishedTime
    ? new Date(publishedTime)
    : null;

  const reviewYear =
    reviewDate?.getUTCFullYear() ||
    new Date().getUTCFullYear();

  const title =
    broker.meta_title_en?.trim() ||
    `${brokerName} Review ${reviewYear}: Fees, Accounts & Regulation | Broker Alarab`;

  const description =
    broker.meta_description_en?.trim() ||
    `Read our ${brokerName} review for ${reviewYear}, covering regulation, fees, spreads, account types, trading platforms, deposits, withdrawals, advantages and limitations.`;

  const isPreview =
    broker.publication_status !== "published";

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,

    authors: [
      {
        name: "Broker Alarab",
        url: SITE_URL,
      },
    ],

    robots: isPreview
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        ar: `${SITE_URL}/brokers/${canonicalSlug}`,
        "x-default": canonicalUrl,
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Broker Alarab",
      locale: "en_US",
      type: "article",
      publishedTime,
      modifiedTime,
      images: [
        {
          url: `${SITE_URL}/og-image.webp`,
          width: 1560,
          height: 377,
          alt: `${brokerName} review by Broker Alarab`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.webp`],
      creator: "@brokeralarab",
    },
  };
}

function SectionCard({
  title,
  subtitle,
  children,
  id,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <h2 className="mb-2 text-[23px] font-extrabold leading-tight text-slate-950 md:text-2xl">
  {title}
</h2>

      {subtitle ? (
        <p className="mb-5 text-sm leading-7 text-slate-600 md:text-base">
          {subtitle}
        </p>
      ) : null}

      {children}
    </section>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
      <div className="mb-1 text-xs font-medium text-slate-500 md:text-sm">
        {label}
      </div>
      <div className="text-lg font-extrabold text-slate-900 md:text-[26px] leading-tight break-words">
        {value ?? "-"}
      </div>
    </div>
  );
}

function HeroStatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string | number | null;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
      <div className="mb-1 text-xs font-medium text-slate-500 md:text-sm">
        {label}
      </div>
      <div className="flex items-end gap-1">
        <span className="text-xl font-extrabold leading-none text-slate-900 md:text-[28px]">
          {value ?? "-"}
        </span>
        {suffix ? (
          <span className="text-sm font-semibold text-slate-500 md:text-base">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function splitPipes(value: string | null) {
  if (!value) return [];
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "-";
  return `$${value}`;
}

function calculateOverallScore(broker: Broker) {
  const scores = [
    broker.score_safety,
    broker.score_fees,
    broker.score_platforms,
    broker.score_deposit,
    broker.score_support,
  ].filter((v): v is number => typeof v === "number");

  if (!scores.length) return broker.rating ?? null;

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Number(avg.toFixed(2));
}

function getVerdictTone(score: number | null) {
  if ((score ?? 0) >= 4.5) {
    return {
      label: "Excellent",
      badge: "Strong choice",
      color: "border-brand-100 bg-brand-50 text-brand-600",
      accent: "from-brand-500 via-brand-500 to-cyan-400",
    };
  }

  if ((score ?? 0) >= 4) {
    return {
      label: "Very Good",
      badge: "Well-rated",
      color: "border-brand-100 bg-brand-50 text-brand-600",
      accent: "from-brand-500 via-sky-400 to-cyan-400",
    };
  }

  if ((score ?? 0) >= 3) {
    return {
      label: "Good",
      badge: "Acceptable",
      color: "border-amber-200 bg-amber-50 text-amber-700",
      accent: "from-amber-500 via-yellow-400 to-orange-400",
    };
  }

  return {
    label: "Average",
    badge: "Needs review",
    color: "border-slate-200 bg-slate-50 text-slate-700",
    accent: "from-slate-500 via-slate-400 to-slate-300",
  };
}

function Chip({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "blue" | "emerald" | "amber" | "slate";
}) {
  const styles = {
    blue: "border-brand-100 bg-brand-50 text-brand-600",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${styles[tone]}`}>
      {children}
    </span>
  );
}

function QuickStat({
  label,
  value,
  accent = "slate",
}: {
  label: string;
  value: string | number | null;
  accent?: "blue" | "emerald" | "amber" | "slate";
}) {
  const bar = {
    blue: "bg-brand-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    slate: "bg-slate-500",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`h-1.5 ${bar[accent]}`} />
      <div className="p-4 text-center">
        <div className="text-xs font-bold text-slate-500 md:text-sm">{label}</div>
        <div className="mt-2 text-2xl font-black text-slate-950 break-words">
          {normalizeValue(value)}
        </div>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="text-[11px] font-black leading-5 text-slate-700">
  {label}
</span>
        <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-black text-brand-600">
          {value ?? "-"} / 5
        </span>
      </div>

      <div className="h-2.5 rounded-full bg-slate-200">
        <div
          className="h-2.5 rounded-full bg-brand-500"
          style={{ width: `${((value ?? 0) / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

function ChecklistSection({
  title,
  items,
  type,
}: {
  title: string;
  items: string[];
  type: "pros" | "cons";
}) {
  return (
    <SectionCard title={title}>
      {items.length ? (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <span
                className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  type === "pros"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {type === "pros" ? "✓" : "–"}
              </span>
              <span className="leading-7 text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No data is currently available.</p>
      )}
    </SectionCard>
  );
}

function ActionButton({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex min-h-[50px] items-center justify-center rounded-2xl border px-5 py-3 text-sm font-extrabold transition md:text-base ${
        primary
          ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
          : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      }`}
    >
      {label}
    </a>
  );
}

function normalizeValue(value: string | number | null) {
  if (value === null || value === "") return "-";
  if (value === "Yes") return "Yes";
  if (value === "No") return "No";
  return value;
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-200 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 text-left">
      <div className="text-sm font-medium text-slate-400">{label}</div>
      <div className="text-left text-[15px] font-extrabold text-slate-900 break-words sm:text-left md:text-[18px]">
        {normalizeValue(value)}
      </div>
    </div>
  );
}

function ScoreCard({
  label,
  value,
  row = false,
}: {
  label: string;
  value: number | null;
  row?: boolean;
}) {
  if (row) {
    return (
      <div className="border-b border-slate-100 py-3 last:border-b-0">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="text-sm font-medium text-slate-400">{label}</div>
          <div className="flex items-end gap-1">
            <span className="text-xl font-extrabold text-slate-900">
              {value ?? "-"}
            </span>
            <span className="text-xs font-bold text-emerald-600">/ 5</span>
          </div>
        </div>

        <div className="h-2 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-emerald-500"
            style={{ width: `${((value ?? 0) / 5) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-3 text-sm text-slate-500">{label}</div>
      <div className="flex items-end justify-between gap-4">
        <div className="text-3xl font-extrabold text-slate-950">
          {value ?? "-"}
        </div>
        <div className="text-sm font-bold text-emerald-600">/ 5</div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-emerald-500"
          style={{ width: `${((value ?? 0) / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

function TextSection({
  title,
  text,
  id,
}: {
  title: string;
  text: string | null;
  id?: string;
}) {
  return (
    <SectionCard title={title} id={id}>
      <p className="leading-8 text-slate-700">
        {text || "No data is currently available."}
      </p>
    </SectionCard>
  );
}

function ListSection({
  title,
  items,
  type = "neutral",
  id,
}: {
  title: string;
  items: string[];
  type?: "pros" | "cons" | "neutral";
  id?: string;
}) {
  return (
    <SectionCard title={title} id={id}>
      {items.length ? (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span
                className={`mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full ${
                  type === "pros"
                    ? "bg-emerald-500"
                    : type === "cons"
                    ? "bg-rose-500"
                    : "bg-slate-400"
                }`}
              />
              <span className="text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                {item}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No data is currently available.</p>
      )}
    </SectionCard>
  );
}

function ImageCard({
  title,
  src,
  brokerName,
}: {
  title?: string;
  src: string | null;
  brokerName: string;
}) {
  if (!src) return null;

  return (
    <div className="rounded-[24px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 shadow-sm md:p-4">
      
      {/* حذفنا border الداخلي وخففنا التصميم */}
      <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-[16px] bg-white md:h-[340px]">
        <img
          src={src}
          alt={`${brokerName} trading platform`}
          className="h-full w-full object-cover"
        />
      </div>

    </div>
  );
}

function RichContentSection({
  title,
  content,
  id,
}: {
  title: string;
  content: string | null;
  id?: string;
}) {
  const items = splitRichText(content);

  return (
    <SectionCard title={title} id={id}>
      {items.length ? (
        <div className="space-y-4 leading-8 text-slate-700">
          {items.map((item, i) => {
            if (item.includes(":")) {
              const parts = item.split(":");
              const heading = parts[0]?.trim();
              const rest = parts.slice(1).join(":").trim();

              return (
                <p key={i}>
                  <span className="font-bold text-slate-900">{heading}:</span>{" "}
                  {rest}
                </p>
              );
            }

            return <p key={i}>{item}</p>;
          })}
        </div>
      ) : (
        <p className="text-slate-500">No data is currently available.</p>
      )}
    </SectionCard>
  );
}

function SplitListSection({
  title,
  content,
  id,
}: {
  title: string;
  content: string | null;
  id?: string;
}) {
  const items = splitText(content);

  return (
    <SectionCard title={title} id={id}>
      {items.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No data is currently available.</p>
      )}
    </SectionCard>
  );
}  

function renderStars(rating: number | null) {
  if (!rating) return null;

  const rounded = Math.round(rating);
  const full = Math.min(5, Math.max(0, rounded));
  const empty = 5 - full;

  return (
    <div
      className="flex items-center gap-2 rounded-md px-3 py-1"
      style={{
        background: "#0f172a",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "18px",
      }}
    >
      <div style={{ display: "flex", gap: "2px" }}>
        {Array.from({ length: full }).map((_, i) => (
          <span key={"f" + i} style={{ color: "#f59e0b" }}>
            ★
          </span>
        ))}

        {Array.from({ length: empty }).map((_, i) => (
          <span key={"e" + i} style={{ color: "#475569" }}>
            ★
          </span>
        ))}
      </div>

      <span style={{ color: "#e2e8f0", fontWeight: 700 }}>
        {rating}
      </span>
    </div>
  );
}

function MiniInfoCard({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: string | number | null;
  tone?: "slate" | "blue" | "emerald" | "amber" | "violet";
}) {
  const tones = {
    slate: "border-slate-200 bg-white",
    blue: "border-brand-100 bg-brand-50",
    emerald: "border-emerald-200 bg-emerald-50",
    amber: "border-amber-200 bg-amber-50",
    violet: "border-violet-200 bg-violet-50",
  };

  return (
    <div className={`min-w-0 rounded-xl border px-3 py-2 shadow-sm ${tones[tone]}`}>
      <div className="text-[11px] font-bold text-slate-500">
        {label}
      </div>
      <div className="mt-1 overflow-hidden text-[15px] font-black leading-5 text-slate-900 break-words">
        {normalizeValue(value)}
      </div>
    </div>
  );
}

function MobileAccountAccordion({
  accounts,
  brokerSlug,
  previewToken,
}: {
  accounts: BrokerAccount[];
  brokerSlug: string;
  previewToken?: string;
}) {
  if (!accounts.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-slate-500 md:hidden">
        No account data is currently available.
      </div>
    );
  }

  return (
    <div className="space-y-3 md:hidden">
      {accounts.map((acc) => (
        <details
          key={acc.id}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left">
            <div className="min-w-0">
              <Link
  href={withPreview(
  `/en/brokers/${brokerSlug}/accounts/${accountSlug(acc.account_name)}`,
  previewToken
)}
  className="text-base font-black text-brand-600 hover:text-brand-600"
>
  {acc.account_name || "-"}
</Link>
                           <div className="mt-1 text-xs font-medium text-slate-500">
  {acc.best_for_en || acc.best_for || "Account details"}
</div>
            </div>

            <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 transition group-open:rotate-180">
              ⌄
            </div>
          </summary>

          <div className="border-t border-slate-100 bg-slate-50 px-4 py-4">
            <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">Spread</span>
                <span className="text-left font-extrabold text-slate-900">
                  {acc.spread || "-"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
  <span className="text-sm font-medium text-slate-500">Commission</span>
  <span className="text-left font-extrabold text-slate-900">
    {acc.commission_en || acc.commission || "-"}
  </span>
</div>

<div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
  <span className="text-sm font-medium text-slate-500">Min Deposit</span>
  <span className="text-left font-extrabold text-slate-900">
    {acc.min_deposit_en || acc.min_deposit || "-"}
  </span>
</div>

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">Execution Type</span>
                <span className="text-left font-extrabold text-slate-900">
                  {acc.execution_type || "-"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
  <span className="text-sm font-medium text-slate-500">Best For</span>
  <span className="text-right font-extrabold text-slate-900">
    {acc.best_for_en || acc.best_for || "-"}
  </span>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function MobileFeesAccordion({
  accounts,
}: {
  accounts: BrokerAccount[];
}) {
   if (!accounts.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-slate-500 md:hidden">
        No fee data is currently available.
      </div>
    );
  }

  return (
    <div className="space-y-3 md:hidden">
      {accounts.map((acc) => (
        <details
          key={acc.id}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <div className="text-[17px] font-black text-slate-900">
                {acc.account_name || "-"}
              </div>
                 <div className="mt-0.5 text-[11px] font-medium text-slate-500">
  {acc.commission_en || acc.commission || "No commission"}
</div>
            </div>

            <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition group-open:rotate-180">
              ⌄
            </div>
          </summary>

          <div className="border-t border-slate-100 bg-slate-50 px-4 py-4">
            <div className="space-y-3">
                            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">Spread</span>
                <span className="font-extrabold text-slate-900">
                  {acc.spread || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
  <span className="text-sm font-medium text-slate-500">Commission</span>
  <span className="font-extrabold text-slate-900">
    {acc.commission_en || acc.commission || "-"}
  </span>
</div>

<div className="flex items-center justify-between gap-4">
  <span className="text-sm font-medium text-slate-500">Min Deposit</span>
  <span className="font-extrabold text-slate-900">
    {acc.min_deposit_en || acc.min_deposit || "-"}
  </span>
</div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function regulatorPageHref(code: string | null) {
  if (!code) return null;

  const slug = code
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return `/en/licenses/${slug}`;
}

function BrokerLicensesSection({
  brokerName,
  licenses,
  regulationSummary,
  fundProtection,
  safetyFactors,
  regulationItems,
}: {
  brokerName: string | null;
  licenses: BrokerLicense[];
  regulationSummary: string | null;
  fundProtection: string | null;
  safetyFactors: string[];
  regulationItems: string[];
}) {
  if (!licenses.length) return null;

  const name = brokerName || "this broker";

  const latestVerified = licenses
    .map((license) => license.last_verified)
    .filter(Boolean)
    .sort()
    .reverse()[0];

  const tierRank = (tier: string | null) => {
    if (tier === "Tier 1") return 1;
    if (tier === "Tier 2") return 2;
    if (tier === "Tier 3") return 3;
    return 4;
  };

  const rankedLicenses = [...licenses].sort(
    (a, b) => tierRank(a.trust_level) - tierRank(b.trust_level)
  );

  const topLicense = rankedLicenses[0];

  const allActive = licenses.every(
    (license) => license.status_code === "active"
  );

  const statusLabel = (status: string | null) => {
    if (status === "active") return "Active";
    if (status === "expired") return "Expired";
    if (status === "revoked") return "Revoked";
    if (status === "pending") return "Pending";
    if (status === "suspended") return "Suspended";
    return "Not specified";
  };

  const statusColor = (status: string | null) =>
    status === "active" ? "text-emerald-700" : "text-slate-600";

  const summaryText = (regulationSummary || "")
    .split("||")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");

  const protectionText = (fundProtection || "")
    .split("||")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");

  const regulatorLinks = rankedLicenses
    .filter(
      (license, index, items) =>
        items.findIndex(
          (item) =>
            (item.regulator_code || "").trim().toUpperCase() ===
            (license.regulator_code || "").trim().toUpperCase()
        ) === index
    )
    .filter((license) => regulatorPageHref(license.regulator_code));

  return (
    <section
      id="regulation"
      dir="ltr"
      aria-labelledby="licenses-section-title"
      className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-4 text-left shadow-sm md:rounded-[28px] md:p-8"
    >
      <h2
        id="licenses-section-title"
        className="text-[22px] font-extrabold leading-8 text-slate-950 md:text-2xl"
      >
        Licenses & Safety at <bdi>{name}</bdi>
      </h2>

      {/* Regulatory Overview */}
      {summaryText && (
        <div className="mt-3">
          <input
            id="licenses-overview-toggle"
            type="checkbox"
            aria-label="Show the full regulatory overview"
            aria-controls="licenses-overview-content"
            className="peer sr-only md:hidden"
          />

          <p
            id="licenses-overview-content"
            className="line-clamp-3 whitespace-pre-line break-words text-base font-medium leading-7 text-slate-600 peer-checked:line-clamp-none md:line-clamp-none md:leading-8"
          >
            {summaryText}
          </p>

          <label
            htmlFor="licenses-overview-toggle"
            className="inline-flex min-h-[44px] cursor-pointer items-center rounded-md text-[15px] font-bold text-brand-600 peer-checked:[&_.overview-more]:hidden peer-checked:[&_.overview-less]:inline peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-500 md:hidden"
          >
            <span className="overview-more">Read more</span>
            <span className="overview-less hidden">Show less</span>
          </label>
        </div>
      )}

      {/* Compact Facts */}
      <dl className="mt-3 divide-y divide-slate-200/70 rounded-xl border border-slate-200 bg-slate-50 px-3 md:mt-5 md:grid md:grid-cols-4 md:gap-4 md:divide-y-0 md:px-4 md:py-4">
        {[
          ["Number of licenses", String(licenses.length)],
          [
            "Top regulator",
            topLicense?.regulator_code || "Not specified",
          ],
          ["Last verified", latestVerified || "Not specified"],
          [
            "Status",
            allActive ? "All active" : "Review required",
          ],
        ].map(([label, value]) => (
          <div
            key={label}
            className="grid min-w-0 grid-cols-[max-content_minmax(0,1fr)] items-baseline gap-3 py-2 md:flex md:flex-col md:items-center md:justify-center md:gap-1 md:py-0 md:text-center"
          >
            <dt className="text-sm font-medium leading-6 text-slate-500 md:text-[15px]">
              {label}
            </dt>

            <dd className="min-w-0 text-right text-sm font-bold leading-6 text-slate-900 md:text-center md:text-[17px] md:leading-7">
              <bdi className="[overflow-wrap:anywhere]">
                {value}
              </bdi>
            </dd>
          </div>
        ))}
      </dl>

      {/* Desktop Table */}
      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm [&_th:not(:first-child)]:text-center [&_td:not(:first-child)]:text-center">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {[
                  "Regulator",
                  "Country",
                  "License Number",
                  "Legal Entity",
                  "Status",
                  "Verification",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-4 font-bold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {licenses.map((license) => {
                const regulatorHref = regulatorPageHref(
                  license.regulator_code
                );

                const verificationHref =
                  license.verification_url_en ||
                  license.verification_url_ar;

                return (
                  <tr
                    key={license.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      {regulatorHref ? (
                        <Link
                          href={regulatorHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-extrabold text-brand-600 hover:underline"
                        >
                          <bdi>{license.regulator_code}</bdi>
                        </Link>
                      ) : (
                        <bdi className="font-extrabold text-slate-950">
                          {license.regulator_code}
                        </bdi>
                      )}

                      {license.regulator_name_en && (
                        <p className="mt-1 leading-6 text-slate-500">
                          {license.regulator_name_en}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-4 font-semibold text-slate-700">
                      {license.country_en || "—"}
                    </td>

                    <td className="px-4 py-4 font-bold text-slate-950">
                      <bdi>{license.license_number || "—"}</bdi>
                    </td>

                    <td className="px-4 py-4 leading-6 text-slate-700">
                      <bdi>
                        {license.entity_name_en ||
                          license.entity_name_ar ||
                          "—"}
                      </bdi>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`whitespace-nowrap font-semibold ${statusColor(
                          license.status_code
                        )}`}
                      >
                        {statusLabel(license.status_code)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {verificationHref ? (
                        <a
                          href={verificationHref}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-brand-50 px-3 py-2 font-bold text-brand-600 transition hover:bg-brand-100"
                        >
                          Verify license
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="text-slate-500">
                          Not available
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile License List */}
      <div className="mt-3 md:hidden">
        <input
          id="licenses-list-toggle"
          type="checkbox"
          aria-label="Show all licenses"
          aria-controls="mobile-licenses-list"
          className="peer sr-only"
        />

        <div
          id="mobile-licenses-list"
          className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white peer-checked:[&_.extra-license]:block"
        >
          {licenses.map((license, index) => {
            const regulatorHref = regulatorPageHref(
              license.regulator_code
            );

            const verificationHref =
              license.verification_url_en ||
              license.verification_url_ar;

            return (
              <details
                key={`mobile-${license.id}`}
                className={`group ${
                  index >= 3 ? "extra-license hidden" : ""
                }`}
              >
                <summary className="min-h-[44px] cursor-pointer list-none px-3 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <bdi className="text-base font-extrabold leading-7 text-slate-950">
                      {license.regulator_code}
                    </bdi>

                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`text-xs font-medium ${statusColor(
                          license.status_code
                        )}`}
                      >
                        {statusLabel(license.status_code)}
                      </span>

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-1 grid grid-cols-[minmax(0,1fr)_max-content] items-center gap-3 text-[15px] leading-6">
                    <span className="min-w-0 truncate text-slate-600">
                      {license.country_en || "Country not specified"}
                    </span>

                    <bdi className="whitespace-nowrap font-semibold text-slate-700">
                      {license.license_number || "Not available"}
                    </bdi>
                  </div>
                </summary>

                <div className="mx-3 space-y-3 border-t border-slate-100 pb-3 pt-3 text-[15px] leading-7">
                  {license.regulator_name_en &&
                    (regulatorHref ? (
                      <Link
                        href={regulatorHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-600 hover:underline"
                      >
                        {license.regulator_name_en}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    ) : (
                      <p className="text-slate-600">
                        {license.regulator_name_en}
                      </p>
                    ))}

                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-slate-500">
                        Country
                      </dt>

                      <dd className="text-slate-800">
                        {license.country_en || "Not specified"}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm text-slate-500">
                        Legal entity
                      </dt>

                      <dd className="break-words font-medium text-slate-800">
                        <bdi>
                          {license.entity_name_en ||
                            license.entity_name_ar ||
                            "Not specified"}
                        </bdi>
                      </dd>
                    </div>
                  </dl>

                  {verificationHref ? (
                    <a
                      href={verificationHref}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-50 px-3 font-bold text-brand-600 hover:bg-brand-100"
                    >
                      View official registry
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <p className="text-sm text-slate-500">
                      The official verification link is not publicly
                      available.
                    </p>
                  )}
                </div>
              </details>
            );
          })}
        </div>

        {licenses.length > 3 && (
          <label
            htmlFor="licenses-list-toggle"
            className="flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg bg-slate-50 px-3 text-[15px] font-bold text-brand-600 peer-checked:[&_.licenses-more]:hidden peer-checked:[&_.licenses-less]:inline peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-500"
          >
            <span className="licenses-more">
              Show all licenses ({licenses.length})
            </span>

            <span className="licenses-less hidden">
              Show less
            </span>
          </label>
        )}
      </div>

      {/* Client Fund Protection */}
      {protectionText && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5">
          <input
            id="fund-protection-toggle"
            type="checkbox"
            aria-label="Show client fund protection details"
            aria-controls="fund-protection-content"
            className="peer sr-only md:hidden"
          />

          <label
            htmlFor="fund-protection-toggle"
            className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 text-base font-bold text-slate-950 peer-checked:[&>svg]:rotate-180 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-500 md:hidden"
          >
            <span>Client Fund Protection</span>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-slate-400 transition-transform"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </label>

          <h3 className="hidden py-3 text-base font-bold text-slate-950 md:block">
            Client Fund Protection
          </h3>

          <div
            id="fund-protection-content"
            className="hidden border-t border-slate-200/70 pb-3 pt-3 peer-checked:block md:block"
          >
            <p className="whitespace-pre-line break-words text-left text-[15px] font-medium leading-7 text-slate-700 md:text-base md:leading-8">
              {protectionText}
            </p>
          </div>
        </div>
      )}

      {/* Regulator Pages */}
      {regulatorLinks.length > 0 && (
        <div className="mt-3 border-t border-slate-100 pt-3 md:mt-4">
          <p className="text-sm font-medium leading-6 text-slate-500 md:text-[15px]">
            Learn more about the regulators
          </p>

          <div className="mt-2 grid grid-cols-3 gap-1.5 md:flex md:flex-wrap md:gap-2">
            {regulatorLinks.map((license, index) => (
              <Link
                key={`regulator-${license.id}`}
                href={regulatorPageHref(
                  license.regulator_code
                )!}
                target="_blank"
                rel="noopener noreferrer"
                title={license.regulator_name_en || undefined}
                className={`min-h-[44px] min-w-0 items-center justify-center gap-1 rounded-lg border border-brand-100 bg-brand-50 px-1.5 py-1.5 text-center text-[13px] font-bold leading-5 text-brand-600 transition hover:bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 md:inline-flex md:px-4 md:text-sm ${
                  index >= 3 ? "hidden" : "flex"
                }`}
              >
                <bdi className="min-w-0 [overflow-wrap:anywhere]">
                  {license.regulator_code}
                </bdi>

                <span aria-hidden="true" className="shrink-0">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default async function BrokerPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ preview?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = (await searchParams) || {};

  const previewToken = Array.isArray(query.preview)
    ? query.preview[0]
    : query.preview;

  const broker = await getBroker(slug, previewToken);

  if (!broker) {
  notFound();
}

const relatedBrokers = await getRelatedBrokers(slug);

const allAccountsData = await getBrokerAccounts(broker.id);

const isNaga = broker.slug === "naga";

const accountsData = isNaga
  ? allAccountsData.filter(
      (account) =>
        ![
          "Iron",
          "Bronze",
          "Silver",
          "Gold",
          "Diamond",
          "Crystal",
        ].includes(account.account_name || "")
    )
  : allAccountsData;

const nagaVipLevels = [
  {
    name: "Iron",
    points: "250 VIP points",
    spread: "Standard spreads, example EUR/USD: 1.1 pips",
    copy: "Up to $0.12 per copied trade",
  },
  {
    name: "Bronze",
    points: "2,500 VIP points",
    spread: "Standard spreads, example EUR/USD: 1.1 pips",
    copy: "Up to $0.15 per copied trade",
  },
  {
    name: "Silver",
    points: "5,000 VIP points",
    spread: "Silver spreads, example EUR/USD: 1.1 pips",
    copy: "Up to $0.18 per copied trade",
  },
  {
    name: "Gold",
    points: "25,000 VIP points",
    spread: "Gold spreads, example EUR/USD: 0.9 pips",
    copy: "Up to $0.22 per copied trade",
  },
  {
    name: "Diamond",
    points: "50,000 VIP points",
    spread: "Diamond spreads, example EUR/USD: 0.9 pips",
    copy: "Up to $0.27 per copied trade",
  },
  {
    name: "Crystal",
    points: "100,000 VIP points",
    spread: "VIP spreads, example EUR/USD: 0.7 pips",
    copy: "Up to $0.32 per copied trade",
  },
];

const brokerLicenses = await getBrokerLicenses(broker.id);
  
  const pros = splitText(
  broker.pros_en
);

const cons = splitText(
  broker.cons_en
);

const whoShouldUse = splitText(
  broker.who_should_use_en
).slice(0, 4);

const whoShouldAvoid = splitText(
  broker.who_should_avoid_en
).slice(0, 4);

const brokerPositioning =
  broker.broker_positioning_en ||
  broker.intro_en ||
  `This page reviews ${
    broker.name_en || broker.name
  } in terms of regulation, fees, account types, platforms, deposits, withdrawals, and customer support.`;

const overallScore =
  calculateOverallScore(broker);

const verdictTone =
  getVerdictTone(overallScore);

const accountCount = accountsData.length;

const lowestDeposit = accountsData.length
  ? accountsData
      .map((acc) => {
        const raw = acc.min_deposit || "";
        const numeric = Number(String(raw).replace(/[^0-9.]/g, ""));
        return {
          ...acc,
          numeric: Number.isFinite(numeric) ? numeric : Infinity,
          raw,
          name: acc.account_name || "-",
        };
      })
      .sort((a, b) => a.numeric - b.numeric)[0]
  : null;

const lowestSpread = accountsData.length
  ? accountsData
      .map((acc) => {
        const spreadText = String(acc.spread || "").replace(/,/g, ".");

        const numbers =
          spreadText.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];

        const minSpread = numbers.length
          ? Math.min(...numbers)
          : Infinity;

        const maxSpread = numbers.length
          ? Math.max(...numbers)
          : Infinity;

        return {
          ...acc,
          minSpread,
          maxSpread,
        };
      })
      .filter((acc) => Number.isFinite(acc.minSpread))
      .sort(
        (a, b) =>
          a.minSpread - b.minSpread ||
          a.maxSpread - b.maxSpread
      )[0] || null
  : null;

const noCommissionAccounts = accountsData.filter((acc) => {
  const commission = (acc.commission_en || acc.commission || "")
    .trim()
    .toLowerCase();

  return (
  commission === "$0" ||
  commission === "0" ||
  commission === "0$" ||
  commission === "no commission" ||
  commission === "no trading commission"
);
});

const commissionAccounts = accountsData.filter((acc) => {
  const commission = (acc.commission_en || acc.commission || "")
    .trim()
    .toLowerCase();

  return !(
    !commission ||
    commission === "-" ||
    commission === "$0" ||
    commission === "0" ||
    commission === "0$" ||
    commission.includes("no")
  );
});

const faqItems = (broker.faq_en ?? []).filter(
  (item) => item?.question?.trim() && item?.answer?.trim()
);

const visibleFaqItems = faqItems.slice(0, 5);
const extraFaqItems = faqItems.slice(5);

const paymentMethods = splitText(
  broker.payment_methods_en
);

const depositSummary = isNaga
  ? broker.deposit_withdrawal_en ||
    broker.deposit_withdrawal_summary_en ||
    null
  : broker.deposit_withdrawal_summary_en ||
    broker.deposit_withdrawal_en ||
    null;

const withdrawalSpeed =
  broker.withdrawal_speed_en || null;

const availablePlatforms = broker.available_platforms_en
  ? splitText(broker.available_platforms_en)
  : splitPipes(broker.platforms);

const platformTools = splitText(
  broker.platform_tools_en
);

const platformSummary = isNaga
  ? broker.platform_details_en ||
    broker.platform_summary_en ||
    null
  : broker.platform_summary_en ||
    broker.platform_details_en ||
    null;

const regulationBodies = splitText(
  broker.regulation
);

const regulationSummary =
  broker.regulation_summary_en ||
  broker.safety_en ||
  null;

const fundProtection =
  broker.fund_protection_en?.trim() ||
  null;

const safetyFactors = splitText(
  broker.safety_factors_en
);

const regulationItems = (
  broker.regulation_short ||
  broker.regulation ||
  ""
)
  .split(/[,|]/)
  .map((item) => item.trim())
  .filter(Boolean);

const siteUrl = SITE_URL;
const canonicalSlug = broker.slug || slug;
const pageUrl =
  `${siteUrl}/en/brokers/${canonicalSlug}`;

const brokerName =
  broker.name_en?.trim() ||
  broker.name?.trim() ||
  "Forex Broker";

const brokerLogoUrl = absoluteUrl(
  broker.logo
);

const publishedTime = toIsoDate(
  broker.published_at
);

const modifiedTime = toIsoDate(
  broker.updated_at || broker.published_at
);

const reviewDate = modifiedTime
  ? new Date(modifiedTime)
  : publishedTime
  ? new Date(publishedTime)
  : null;

const reviewYear =
  reviewDate?.getUTCFullYear() ||
  new Date().getUTCFullYear();

const visibleUpdatedLabel = modifiedTime
  ? new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(modifiedTime))
  : "September 2026";

const rawReviewScore = Number(
  overallScore || broker.rating
);

const reviewScore =
  Number.isFinite(rawReviewScore) &&
  rawReviewScore >= 1 &&
  rawReviewScore <= 5
    ? rawReviewScore
    : null;

const pageDescription =
  broker.meta_description_en?.trim() ||
  broker.intro_en?.trim() ||
  `A detailed review of ${brokerName}, covering regulation, fees, account types, trading platforms, deposits and withdrawals.`;

const publisherSchema = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Broker Alarab",
  url: siteUrl,
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Broker Alarab",
  inLanguage: "en",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteUrl}/en`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Broker Reviews",
      item: `${siteUrl}/en/brokers`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: `${brokerName} Review`,
      item: pageUrl,
    },
  ],
};

const brokerEntitySchema = {
  "@type": "FinancialService",
  "@id": `${pageUrl}#broker`,
  name: brokerName,
  alternateName:
    broker.name?.trim() || undefined,
  url: pageUrl,
  image: brokerLogoUrl,
  description: pageDescription,
  serviceType: "Forex and CFD broker",
};

const reviewSchema = reviewScore
  ? {
      "@type": "Review",
      "@id": `${pageUrl}#review`,
      url: pageUrl,
      name: `${brokerName} Review ${reviewYear}`,
      headline: `${brokerName} Review ${reviewYear}`,
      inLanguage: "en",
      datePublished: publishedTime,
      dateModified: modifiedTime,
      itemReviewed: {
        "@id": `${pageUrl}#broker`,
      },
      author: {
        "@id": `${siteUrl}/#organization`,
      },
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: reviewScore,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody:
        broker.final_verdict_en?.trim() ||
        broker.intro_en?.trim() ||
        pageDescription,
    }
  : null;

const faqPageSchema =
  faqItems.length > 0
    ? {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq-schema`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question.trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
              .replace(/\|\|/g, "\n\n")
              .trim(),
          },
        })),
      }
    : null;

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: `${brokerName} Review ${reviewYear}`,
  description: pageDescription,
  inLanguage: "en",
  datePublished: publishedTime,
  dateModified: modifiedTime,
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  breadcrumb: {
    "@id": `${pageUrl}#breadcrumb`,
  },
  mainEntity: {
    "@id": reviewSchema
      ? `${pageUrl}#review`
      : `${pageUrl}#broker`,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    publisherSchema,
    websiteSchema,
    webPageSchema,
    breadcrumbSchema,
    brokerEntitySchema,
    ...(reviewSchema ? [reviewSchema] : []),
    ...(faqPageSchema ? [faqPageSchema] : []),
  ],
};

return (
  <>
    {broker.publication_status === "published" && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />
    )}

    <main
      dir="ltr"
      className="mx-auto w-full max-w-[1520px] px-3 pb-1 pt-5 text-left sm:px-5 md:pt-6 lg:px-6"
    >
        
{/* Trust Bar */}
<section
  aria-label="Broker Alarab review standards"
  className="mb-5 hidden rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 md:block"
>
  <ul className="grid grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-4 md:gap-0">
    {[
      {
        short: "50+ brokers",
        full: "50+ brokers reviewed",
        icon: <path d="m5 12 4 4L19 6" />,
      },
      {
        short: "150+ criteria",
        full: "More than 150 rating criteria",
        icon: (
          <>
            <path d="M5 20V10M12 20V4M19 20v-7" />
          </>
        ),
      },
      {
        short: "Monthly updates",
        full: "Broker data updated monthly",
        icon: (
          <>
            <path d="M20 7v5h-5M4 17v-5h5" />
            <path d="M6.1 7a7 7 0 0 1 11.6-2L20 8M4 16l2.3 3A7 7 0 0 0 17.9 17" />
          </>
        ),
      },
      {
        short: "Independent",
        full: "Independent broker reviews",
        icon: (
          <>
            <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </>
        ),
      },
    ].map((item, index) => (
      <li
        key={item.short}
        className={`flex min-w-0 items-center justify-start gap-2 md:justify-center md:px-3 ${
          index > 0 ? "md:border-l md:border-slate-200/70" : ""
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 text-brand-600 md:h-[18px] md:w-[18px]"
        >
          {item.icon}
        </svg>

        <span className="text-[11px] font-bold leading-5 text-slate-700 md:text-[13px] md:leading-6">
          <span className="md:hidden">{item.short}</span>
          <span className="hidden md:inline">{item.full}</span>
        </span>
      </li>
    ))}
  </ul>
</section>

{/* Unified Broker Hero */}
<div className="space-y-5 md:space-y-6 max-sm:space-y-3">
  {/* Company Identity */}
  <section
    id="broker-overview"
    aria-labelledby="broker-review-title"
    className="scroll-mt-24 overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-blue-50/80 via-slate-50 to-white md:rounded-[28px] max-sm:rounded-[22px]"
  >
    <div className="px-5 py-5 sm:px-7 lg:px-9 lg:py-7 max-sm:px-4 max-sm:py-4">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs font-medium leading-6 text-slate-600 sm:text-[13px] max-sm:gap-x-1.5 max-sm:gap-y-0 max-sm:text-[10px] max-sm:leading-5"
      >
        <Link href="/en" className="hover:text-brand-600">
          Home
        </Link>

        <span aria-hidden="true" className="text-slate-400">
          /
        </span>

        <Link
          href="/en/brokers"
          className="hover:text-brand-600"
        >
          Broker Reviews
        </Link>

        <span aria-hidden="true" className="text-slate-400">
          /
        </span>

        <span className="font-bold text-slate-800">
          {broker.name_en || broker.name}
        </span>
      </nav>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 max-sm:mt-3 max-sm:grid max-sm:grid-cols-[76px_minmax(0,1fr)] max-sm:items-center max-sm:gap-x-3 max-sm:gap-y-3">
        {/* Broker Logo */}
        <div className="flex h-32 w-44 shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-white bg-white shadow-sm sm:h-36 sm:w-48 max-sm:h-[76px] max-sm:w-[76px] max-sm:rounded-2xl">
          {broker.logo ? (
            <img
              src={broker.logo}
              alt={`${broker.name_en || broker.name} logo`}
              width={192}
              height={144}
              className="h-full w-full object-contain max-sm:p-2"
            />
          ) : (
            <span className="px-4 text-center text-2xl font-black text-slate-900 max-sm:px-2 max-sm:text-sm">
              {broker.name_en || broker.name}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 max-sm:contents">
          <div className="max-sm:min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-brand-600 sm:text-[13px] max-sm:text-[11px]">
                Broker Alarab Review
              </span>

              <span
                aria-hidden="true"
                className="text-slate-300 max-sm:hidden"
              >
                •
              </span>

              <span className="text-xs font-medium text-slate-600 sm:text-[13px] max-sm:hidden">
                Accounts, costs and regulation
              </span>
            </div>

            <h1
  id="broker-review-title"
  className="mt-3 break-words text-[30px] font-black leading-tight tracking-tight text-slate-950 sm:text-[38px] xl:text-[46px] max-sm:mt-1.5 max-sm:text-[23px] max-sm:leading-[1.25]"
>
  <span className="!font-black text-slate-950">
  {broker.name_en || broker.name}
</span>{" "}

<span className="!font-black max-sm:block max-sm:text-brand-600">
  Review
</span>
</h1>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium leading-6 text-slate-600 sm:text-sm max-sm:col-span-2 max-sm:mt-0 max-sm:gap-x-4 max-sm:gap-y-1 max-sm:border-t max-sm:border-slate-200/70 max-sm:pt-3 max-sm:text-xs max-sm:leading-6">
            {broker.founded_year && (
              <span>
                Founded:{" "}
                <span className="font-bold text-slate-900">
                  {broker.founded_year}
                </span>
              </span>
            )}

            {(broker.headquarters_en || broker.headquarters) && (
              <span>
                Headquarters:{" "}
                <span className="font-bold text-slate-900">
                  {broker.headquarters_en || broker.headquarters}
                </span>
              </span>
            )}

            <span className="inline-flex items-center gap-1.5">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 shrink-0 text-slate-400"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 11h18" />
              </svg>

              <span>Last updated:</span>

              <time
  dateTime={modifiedTime || "2026-09"}
  className="font-bold text-slate-900"
>
  {visibleUpdatedLabel}
</time>
            </span>

            <Link
              href="/en/how-we-review-brokers"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-600 underline underline-offset-4 max-sm:flex max-sm:min-h-[32px] max-sm:w-full max-sm:items-center max-sm:text-[11px]"
            >
              Review methodology ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Desktop Section Navigation */}
  <nav
    aria-label="Broker review sections"
    className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block"
  >
    <div className="flex flex-wrap items-center justify-center gap-2 p-3">
      {[
        {
          label: "Quick Summary",
          href: "#broker-summary",
        },
        {
          label: "Rating Scores",
          href: "#scores",
        },
        {
          label: "Accounts",
          href: "#accounts",
        },
        {
          label: "Regulation & Safety",
          href: "#regulation",
        },
        {
          label: "Fees",
          href: "#fees",
        },
        {
          label: "Deposits & Withdrawals",
          href: "#deposit-withdrawal",
        },
        {
          label: "Platforms",
          href: "#platforms",
        },
        {
          label: "Final Verdict",
          href: "#verdict",
        },
        {
          label: "FAQs",
          href: "#faq",
        },
      ].map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="inline-flex min-h-[40px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-700 transition hover:border-brand-500 hover:bg-blue-50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {item.label}
        </a>
      ))}
    </div>
  </nav>
</div>

{/* Review Summary and Decision Panel */}
<section
  id="broker-summary"
  aria-labelledby="broker-summary-title"
  className="mt-5 scroll-mt-24 overflow-hidden rounded-[24px] border border-slate-200 bg-white md:mt-6 md:rounded-[28px] max-sm:rounded-[22px]"
>
  <div className="p-5 sm:p-7 lg:p-8 max-sm:p-3">
    <div className="grid min-w-0 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_330px] xl:gap-10 max-sm:gap-5">
      {/* Introduction, Strengths and Suitability */}
      <div className="min-w-0">
        <p className="text-[13px] font-bold text-brand-600 max-sm:text-xs">
          Review Summary
        </p>

        <h2
          id="broker-summary-title"
          className="mt-2 text-[26px] font-black leading-tight text-slate-950 sm:text-[32px] max-sm:mt-1.5 max-sm:text-[22px] max-sm:leading-[1.4]"
        >
          Overview of {broker.name_en || broker.name}
        </h2>

        <div className="mt-5 text-[15px] font-medium leading-8 text-slate-700 sm:text-base lg:min-h-[204px] max-sm:mt-3 max-sm:text-[14px] max-sm:leading-6 max-sm:break-words">
          <input
            id="broker-overview-toggle-en"
            type="checkbox"
            aria-label="Show the full broker overview"
            aria-controls="broker-overview-text-en"
            className="peer sr-only sm:hidden"
          />

          <div
            id="broker-overview-text-en"
            className="space-y-3 max-sm:line-clamp-4 peer-checked:max-sm:line-clamp-none"
          >
            {brokerPositioning
              .split("||")
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>

          <label
            htmlFor="broker-overview-toggle-en"
            className="mt-2 hidden min-h-[44px] w-fit cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-bold text-brand-600 transition hover:bg-blue-50 max-sm:inline-flex peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-500 peer-checked:[&_.overview-more]:hidden peer-checked:[&_.overview-less]:inline peer-checked:[&_.overview-arrow]:rotate-180"
          >
            <span className="overview-more">Show more</span>
            <span className="overview-less hidden">Show less</span>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="overview-arrow h-4 w-4 transition-transform"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </label>
        </div>

        {/* Strength and Limitation */}
        {(broker.key_strength_en || broker.key_weakness_en) && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 max-sm:mt-4 max-sm:gap-2.5">
            {broker.key_strength_en && (
              <div className="min-w-0 rounded-[18px] border border-emerald-100 bg-emerald-50/50 p-5 max-sm:rounded-2xl max-sm:p-3.5">
                <div className="flex items-center gap-2.5 max-sm:gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700 max-sm:h-6 max-sm:w-6 max-sm:text-xs"
                  >
                    ✓
                  </span>

                  <h3 className="text-sm font-extrabold text-emerald-900 max-sm:text-[13px]">
                    Key Strength
                  </h3>
                </div>

                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-800 max-sm:mt-2 max-sm:text-[13px] max-sm:leading-6">
                  {broker.key_strength_en}
                </p>
              </div>
            )}

            {broker.key_weakness_en && (
              <div className="min-w-0 rounded-[18px] border border-amber-100 bg-amber-50/50 p-5 max-sm:rounded-2xl max-sm:p-3.5">
                <div className="flex items-center gap-2.5 max-sm:gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-700 max-sm:h-6 max-sm:w-6 max-sm:text-xs"
                  >
                    !
                  </span>

                  <h3 className="text-sm font-extrabold text-amber-900 max-sm:text-[13px]">
                    Key Consideration
                  </h3>
                </div>

                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-800 max-sm:mt-2 max-sm:text-[13px] max-sm:leading-6">
                  {broker.key_weakness_en}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Suitability */}
        {(whoShouldUse.length > 0 || whoShouldAvoid.length > 0) && (
          <div className="mt-6 grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-2 max-sm:mt-4 max-sm:gap-4 max-sm:pt-4">
            {whoShouldUse.length > 0 && (
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-slate-950 max-sm:text-sm">
                  Who Is It Best For?
                </h3>

                <ul className="mt-4 space-y-2.5 max-sm:mt-2.5 max-sm:space-y-1.5">
                  {whoShouldUse.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[15px] font-medium leading-7 text-slate-700 max-sm:gap-2 max-sm:text-[13px] max-sm:leading-6"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-black text-emerald-700 max-sm:h-4 max-sm:w-4 max-sm:text-[10px]"
                      >
                        ✓
                      </span>

                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {whoShouldAvoid.length > 0 && (
              <div className="min-w-0 max-sm:border-t max-sm:border-slate-100 max-sm:pt-4">
                <h3 className="text-base font-extrabold text-slate-950 max-sm:text-sm">
                  Who May It Not Suit?
                </h3>

                <ul className="mt-4 space-y-2.5 max-sm:mt-2.5 max-sm:space-y-1.5">
                  {whoShouldAvoid.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[15px] font-medium leading-7 text-slate-700 max-sm:gap-2 max-sm:text-[13px] max-sm:leading-6"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-black text-slate-600 max-sm:h-4 max-sm:w-4 max-sm:text-[10px]"
                      >
                        −
                      </span>

                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Compact Decision Card */}
      <aside
        aria-label={`${broker.name_en || broker.name} rating and key information`}
        className="min-w-0 self-start overflow-visible rounded-[22px] border border-slate-200 bg-white shadow-sm max-sm:order-first max-sm:rounded-[18px]"
      >
        {/* Score */}
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-5 sm:p-6 max-sm:grid max-sm:grid-cols-2 max-sm:items-center max-sm:gap-x-3 max-sm:gap-y-3 max-sm:rounded-t-[18px] max-sm:p-4">
          <div className="flex items-center justify-between gap-3 max-sm:col-span-2">
            <h3 className="text-[13px] font-bold text-slate-700">
              Broker Alarab Rating
            </h3>

            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${verdictTone.color}`}
            >
              {verdictTone.label}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2 max-sm:mt-0 max-sm:gap-1.5">
            <span className="text-[56px] font-black leading-none tracking-tight text-slate-950 max-sm:text-[40px]">
              {overallScore || broker.rating || "—"}
            </span>

            <span className="text-lg font-bold text-slate-500 max-sm:text-sm">
              / 5
            </span>
          </div>

          <a
            href="#scores"
            className="mt-4 inline-flex text-xs font-bold text-brand-600 underline underline-offset-4 max-sm:mt-0 max-sm:min-h-[44px] max-sm:items-center max-sm:justify-end max-sm:text-xs max-sm:leading-5"
          >
            Rating details
          </a>
        </div>

        {/* Facts */}
        <div className="px-5 sm:px-6 max-sm:px-4">
          <dl className="divide-y divide-slate-200">
            <div className="flex items-center justify-between gap-3 py-4 max-sm:min-h-[44px] max-sm:py-2.5">
              <dt className="text-[13px] font-medium text-slate-600 max-sm:text-xs">
                Minimum deposit
              </dt>

              <dd className="text-xl font-black text-slate-950 max-sm:text-lg">
                {broker.min_deposit !== null &&
                broker.min_deposit !== undefined &&
                String(broker.min_deposit).trim() !== ""
                  ? formatMoney(broker.min_deposit)
                  : "Not specified"}
              </dd>
            </div>

            <div className="py-4 max-sm:py-2.5">
              <div className="flex items-center justify-between gap-3 max-sm:min-h-6">
                <dt className="flex items-center gap-2 text-[13px] font-medium text-slate-600 max-sm:gap-1.5 max-sm:text-xs">
                  <span>Maximum leverage</span>

                  {broker.max_leverage_note_en?.trim() && (
                    <span className="group relative inline-flex shrink-0">
                      <button
                        type="button"
                        aria-label="Maximum leverage explanation"
                        aria-describedby="max-leverage-note-en"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[13px] font-extrabold text-brand-600 transition hover:border-blue-200 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                      >
                        <span aria-hidden="true">?</span>
                      </button>

                      <span
                        id="max-leverage-note-en"
                        role="tooltip"
                        className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 w-[220px] max-w-[70vw] -translate-x-1/2 pb-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                      >
                        <span className="relative block rounded-xl border border-slate-200 bg-slate-900 px-4 py-3 text-left text-xs font-medium leading-6 text-white shadow-lg">
                          {broker.max_leverage_note_en.trim()}

                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900"
                          />
                        </span>
                      </span>
                    </span>
                  )}
                </dt>

                <dd className="shrink-0 text-xl font-black text-slate-950 max-sm:text-lg">
                  {broker.max_leverage || "—"}
                </dd>
              </div>
            </div>

            {broker.arabic_support && (
              <div className="flex items-center justify-between gap-3 py-4 max-sm:min-h-[44px] max-sm:py-2.5">
                <dt className="text-[13px] font-medium text-slate-600 max-sm:text-xs">
                  Arabic support
                </dt>

                <dd className="text-sm font-bold text-slate-900">
                  {broker.arabic_support}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Account Actions */}
        <div className="border-t border-slate-200 p-5 sm:p-6 max-sm:p-3.5">
          <div className="grid grid-cols-1 gap-2.5 max-sm:gap-2">
            <a
              href={`/go/${broker.slug}?type=real`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-extrabold text-white transition hover:bg-brand-600 max-sm:min-h-[46px] max-sm:px-3 max-sm:py-2.5"
            >
              <span className="min-w-0">
                Open an account with{" "}
                {broker.name_en || broker.name}
              </span>

              <span aria-hidden="true" className="shrink-0">
                ↗
              </span>
            </a>

            <a
              href={`/go/${broker.slug}?type=demo`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-800 transition hover:bg-slate-50 max-sm:min-h-[44px] max-sm:py-2.5"
            >
              Open a demo account
            </a>
          </div>

          <p className="mt-4 text-xs font-medium leading-6 text-slate-600 max-sm:mt-3 max-sm:text-[11px] max-sm:leading-5">
            Trading conditions and client protection may vary by
            country of residence and the legal entity holding the
            account. Review the applicable details before registering.
          </p>
        </div>
      </aside>

      {/* Mobile Section Navigation */}
      <nav
        aria-label="Broker review sections"
        className="relative order-[-1] -mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white md:hidden"
      >
        <div className="flex gap-2 overflow-x-auto overscroll-x-contain p-3 max-sm:gap-2 max-sm:py-2 max-sm:pl-2 max-sm:pr-9 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden">
          {[
            {
              label: "Quick Summary",
              href: "#broker-summary",
            },
            {
              label: "Rating Scores",
              href: "#scores",
            },
            {
              label: "Accounts",
              href: "#accounts",
            },
            {
              label: "Regulation",
              href: "#regulation",
            },
            {
              label: "Fees",
              href: "#fees",
            },
            {
              label: "Deposits",
              href: "#deposit-withdrawal",
            },
            {
              label: "Platforms",
              href: "#platforms",
            },
            {
              label: "Final Verdict",
              href: "#verdict",
            },
            {
              label: "FAQs",
              href: "#faq",
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[40px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-700 transition hover:border-brand-500 hover:bg-blue-50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 max-sm:min-h-[44px] max-sm:px-3 max-sm:text-xs"
            >
              {item.label}
            </a>
          ))}
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-8 items-center justify-center bg-gradient-to-l from-white via-white/95 to-transparent text-lg text-slate-400 max-sm:flex"
        >
          ›
        </span>
      </nav>
    </div>

    {/* Account Types */}
    {accountsData.some((account) => account.account_name?.trim()) && (
      <div className="mt-6 border-t border-slate-200 pt-5 max-sm:mt-4 max-sm:pt-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-2.5">
          <h3 className="text-sm font-extrabold text-slate-950">
            Account types
          </h3>

          <div className="flex min-w-0 flex-wrap gap-2 max-sm:grid max-sm:grid-cols-2 max-sm:[&>a:last-child:nth-child(odd)]:col-span-2 max-sm:[&>a:last-child:nth-child(odd)]:justify-self-center max-sm:[&>a:last-child:nth-child(odd)]:w-[calc((100%-0.5rem)/2)]">
            {Array.from(
              new Set(
                accountsData
                  .map((account) => account.account_name?.trim())
                  .filter(
                    (name): name is string => Boolean(name)
                  )
              )
            ).map((name) => (
              <a
                key={name}
                href="#accounts"
                className="inline-flex max-w-full items-center rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-[12px] font-bold leading-6 text-slate-800 transition hover:border-blue-300 hover:bg-blue-100 max-sm:min-h-[44px] max-sm:min-w-0 max-sm:justify-center max-sm:px-2 max-sm:text-center max-sm:leading-5"
              >
                <span className="break-words">{name}</span>
              </a>
            ))}
          </div>

                    <a
            href="#accounts"
            className="text-[13px] font-bold text-brand-600 hover:underline sm:ml-auto max-sm:flex max-sm:min-h-[44px] max-sm:items-center max-sm:justify-between max-sm:rounded-lg max-sm:bg-slate-50 max-sm:px-3"
          >
            Compare accounts and costs ↗
          </a>
        </div>
      </div>
    )}

    {/* Editorial Insight */}
    {broker.expert_insight_en?.trim() && (
      <details className="group mt-5 border-t border-slate-200 max-sm:mt-4">
        <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-bold text-slate-800 [&::-webkit-details-marker]:hidden max-sm:min-h-[48px] max-sm:gap-3 max-sm:py-3 max-sm:text-[13px]">
          <span className="max-sm:min-w-0 max-sm:leading-6">
            Broker Alarab’s view on{" "}
            {broker.name_en || broker.name}
          </span>

          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-brand-600 transition-transform group-open:rotate-45 max-sm:h-6 max-sm:w-6"
          >
            +
          </span>
        </summary>

        <div className="space-y-3 pb-2 text-[15px] font-medium leading-8 text-slate-700 sm:text-base max-sm:text-sm max-sm:leading-6 max-sm:break-words">
          {broker.expert_insight_en
            .split("||")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      </details>
    )}
  </div>
</section>

<div className="mt-4 grid min-w-0 gap-6 md:mt-6 md:gap-8">
  <div className="min-w-0 space-y-8">
    <SectionCard
      title="Rating Breakdown"
      id="scores"
    >
      <p className="mb-4 text-[13px] font-medium leading-6 text-slate-600 md:mb-5 md:text-sm md:leading-7">
        <span className="sm:hidden">
          Each category is rated out of 5.
        </span>

        <span className="hidden sm:inline">
          How {broker.name_en || broker.name} performs across safety,
          trading costs, platforms, deposits and withdrawals, and
          customer support, with each category rated out of 5.
        </span>
      </p>

      <div
        className="
          grid gap-2.5 md:grid-cols-2 md:gap-4 xl:grid-cols-5
          max-sm:gap-0
          max-sm:overflow-hidden
          max-sm:rounded-2xl
          max-sm:border
          max-sm:border-slate-200
          max-sm:bg-white
          max-sm:divide-y
          max-sm:divide-slate-100
          max-sm:[&>div]:rounded-none
          max-sm:[&>div]:border-0
          max-sm:[&>div]:px-3
          max-sm:[&>div]:py-2.5
          max-sm:[&>div]:shadow-none
          max-sm:[&>div>div:first-child]:mb-1.5
          max-sm:[&>div>div:first-child]:items-center
          max-sm:[&>div>div:first-child>span:last-child]:border-0
          max-sm:[&>div>div:first-child>span:last-child]:bg-transparent
          max-sm:[&>div>div:first-child>span:last-child]:p-0
          max-sm:[&>div>div:last-child]:h-1.5
          max-sm:[&>div>div:last-child>div]:h-1.5
        "
      >
        <ScoreBar
          label="Safety & Regulation"
          value={broker.score_safety}
        />

        <ScoreBar
          label="Fees & Spreads"
          value={broker.score_fees}
        />

        <ScoreBar
          label="Trading Platforms"
          value={broker.score_platforms}
        />

        <ScoreBar
          label="Deposits & Withdrawals"
          value={broker.score_deposit}
        />

        <ScoreBar
          label="Customer Support"
          value={broker.score_support}
        />
      </div>
    </SectionCard>

{/* Broker Pros and Cons */}
<div className="grid items-start gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-6">
  {/* Advantages */}
  <section
    aria-labelledby="broker-pros-title"
    className="h-full overflow-hidden rounded-[22px] border border-slate-200 bg-white md:rounded-[26px]"
  >
    <div className="border-b border-slate-200 bg-emerald-50/40 px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="broker-pros-title"
          className="text-lg font-extrabold text-slate-950 md:text-[22px]"
        >
          Main Advantages
        </h2>

        <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 px-2 text-xs font-extrabold text-emerald-800 md:h-8 md:min-w-8">
          {pros.length}
        </span>
      </div>

      <p className="mt-1.5 hidden text-[13px] leading-6 text-slate-600 md:block">
        The main strengths of{" "}
        <bdi>{broker.name_en || broker.name}</bdi>.
      </p>
    </div>

    <div className="px-4 md:px-6">
      {pros.length ? (
        <ul className="divide-y divide-slate-100">
          {pros.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 py-3 text-left md:gap-3 md:py-4"
            >
              <span
                aria-hidden="true"
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black text-emerald-700 md:h-6 md:w-6 md:text-xs"
              >
                ✓
              </span>

              <p className="min-w-0 flex-1 break-words text-[13px] font-medium leading-6 text-slate-700 md:text-[15px] md:leading-7">
                {item}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-sm leading-6 text-slate-500">
          No advantages are currently available.
        </p>
      )}
    </div>
  </section>

  {/* Disadvantages */}
  <section
    aria-labelledby="broker-cons-title"
    className="h-full overflow-hidden rounded-[22px] border border-slate-200 bg-white md:rounded-[26px]"
  >
    <div className="border-b border-slate-200 bg-rose-50/40 px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="broker-cons-title"
          className="text-lg font-extrabold text-slate-950 md:text-[22px]"
        >
          Main Disadvantages
        </h2>

        <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 px-2 text-xs font-extrabold text-rose-800 md:h-8 md:min-w-8">
          {cons.length}
        </span>
      </div>

      <p className="mt-1.5 hidden text-[13px] leading-6 text-slate-600 md:block">
        Important limitations to consider before choosing this broker.
      </p>
    </div>

    <div className="px-4 md:px-6">
      {cons.length ? (
        <ul className="divide-y divide-slate-100">
          {cons.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 py-3 text-left md:gap-3 md:py-4"
            >
              <span
                aria-hidden="true"
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[11px] font-black text-rose-700 md:h-6 md:w-6 md:text-xs"
              >
                −
              </span>

              <p className="min-w-0 flex-1 break-words text-[13px] font-medium leading-6 text-slate-700 md:text-[15px] md:leading-7">
                {item}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-sm leading-6 text-slate-500">
          No disadvantages are currently available.
        </p>
      )}
    </div>
  </section>
</div>

{/* Account Types */}
<section
  id="accounts"
  aria-labelledby="accounts-section-title"
  dir="ltr"
  className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-4 text-left md:rounded-[28px] md:p-7 lg:p-8"
>
  {/* Section Header */}
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
    <div className="min-w-0 flex-1">
      <h2
  id="accounts-section-title"
  className="text-[22px] font-extrabold leading-8 text-slate-950 md:text-2xl"
>
  {isNaga ? (
    <>
      Trading Account & VIP Levels at{" "}
      <bdi>{broker.name_en || broker.name}</bdi>
    </>
  ) : (
    <>
      Account Types at{" "}
      <bdi>{broker.name_en || broker.name}</bdi>
    </>
  )}
</h2>

      <p className="mt-2 text-base font-medium leading-7 text-slate-600 md:text-[17px] md:leading-8">
  {isNaga ? (
    <>
      <span className="md:hidden">
        Review the NAGA trading account and its VIP user levels.
      </span>

      <span className="hidden md:inline">
        Review the general NAGA trading account and the benefits linked to
        each VIP user level.
      </span>
    </>
  ) : (
    <>
      <span className="md:hidden">
        Compare the accounts and tap an account name for more details.
      </span>

      <span className="hidden md:inline">
        Compare the available account conditions and open an account page to
        review its full details.
      </span>
    </>
  )}
</p>
    </div>

    {/* Quick Account Stats */}
    <dl className="grid shrink-0 grid-cols-2 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/70 py-3 text-center lg:min-w-[230px]">
      <div className="flex min-w-0 flex-col items-center justify-center gap-1 px-3">
        <dt className="text-sm font-medium leading-6 text-slate-600">
          Accounts
        </dt>

        <dd className="text-xl font-extrabold leading-7 text-slate-950">
          {accountCount || "—"}
        </dd>
      </div>

      <div className="flex min-w-0 flex-col items-center justify-center gap-1 px-3">
        <dt className="text-sm font-medium leading-6 text-slate-600">
          Lowest Deposit
        </dt>

        <dd className="break-words text-xl font-extrabold leading-7 text-slate-950">
          <bdi>
            {lowestDeposit?.min_deposit_en ||
              lowestDeposit?.raw ||
              (broker.min_deposit !== null &&
              broker.min_deposit !== undefined &&
              String(broker.min_deposit).trim() !== ""
                ? formatMoney(broker.min_deposit)
                : "Not specified")}
          </bdi>
        </dd>
      </div>
    </dl>
  </div>

  {/* Account Introduction from Supabase */}
  {broker.accounts_intro_en?.trim() && (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-3 md:mt-5 md:px-5 md:py-4">
      <p className="mb-1 text-[15px] font-bold leading-7 text-slate-950 md:text-base">
        Account Availability
      </p>

      <p className="whitespace-pre-line break-words text-base font-medium leading-7 text-slate-600 md:leading-8">
        {broker.accounts_intro_en.trim()}
      </p>
    </div>
  )}

  {/* Responsive Account Comparison */}
  <div className="mt-4 space-y-2.5 md:mt-5 md:space-y-0 md:overflow-hidden md:rounded-[20px] md:border md:border-slate-200">
    {/* Desktop Column Headings */}
    <div
      aria-hidden="true"
      className="hidden grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_minmax(0,1.2fr)] items-center gap-3 bg-slate-50 px-4 py-4 text-center text-sm font-bold leading-6 text-slate-600 md:grid"
    >
      <span className="text-left">Account Type</span>
      <span>Spread</span>
      <span>Commission</span>
      <span>Min Deposit</span>
      <span>Execution Type</span>
    </div>

    {accountsData.length ? (
      accountsData.map((acc) => (
        <article
          key={acc.id}
          className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-1 rounded-[16px] border border-slate-200 bg-white px-3.5 py-2.5 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_minmax(0,1.2fr)] md:items-center md:gap-3 md:rounded-none md:border-0 md:border-t md:border-slate-100 md:px-4 md:py-4 md:[&>dl]:!text-center md:[&_dd]:!mt-0 md:[&_dd]:!text-center md:[&_dd]:!text-sm md:[&_dd]:!leading-6"
        >
          {/* Mobile Expansion Control */}
          <input
            id={`account-toggle-${acc.id}`}
            type="checkbox"
            aria-label={`Show more information about ${
              acc.account_name || "this account"
            }`}
            aria-controls={`account-commission-${acc.id} account-execution-${acc.id} account-page-${acc.id}`}
            className="peer sr-only md:hidden"
          />

          {/* Account Name */}
          <div className="order-1 col-span-2 min-w-0 peer-checked:[&_.account-chevron]:rotate-180 peer-checked:[&_.account-best-for]:block peer-focus-visible:[&_.account-toggle-label]:outline peer-focus-visible:[&_.account-toggle-label]:outline-2 peer-focus-visible:[&_.account-toggle-label]:outline-brand-500 md:order-none md:col-span-1">
            <h3>
              {/* Mobile */}
              <label
                htmlFor={`account-toggle-${acc.id}`}
                className="account-toggle-label flex min-h-[44px] cursor-pointer items-center justify-between gap-3 rounded-lg text-base font-bold leading-6 text-brand-600 md:hidden"
              >
                <bdi className="min-w-0 break-words">
                  {acc.account_name || "Not specified"}
                </bdi>

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="account-chevron h-4 w-4 transition-transform"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </label>

              {/* Desktop */}
              <Link
                href={withPreview(
                  `/en/brokers/${broker.slug}/accounts/${accountSlug(
                    acc.account_name
                  )}`,
                  previewToken
                )}
                className="hidden items-center gap-1.5 rounded-md text-sm font-extrabold leading-5 text-brand-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:inline-flex"
              >
                <bdi className="min-w-0 break-words">
                  {acc.account_name || "Not specified"}
                </bdi>

                <span aria-hidden="true" className="shrink-0">
                  ↗
                </span>
              </Link>
            </h3>

            {acc.best_for_en?.trim() && (
              <p className="account-best-for mb-2 mt-1 hidden rounded-lg bg-slate-50 px-3 py-2 text-[15px] font-medium leading-7 text-slate-600 md:mb-0 md:mt-1 md:block md:rounded-none md:bg-transparent md:p-0 md:text-sm md:font-normal md:leading-6">
                {acc.best_for_en}
              </p>
            )}
          </div>

          {/* Spread: Always Visible */}
          <dl className="order-2 flex min-w-0 flex-wrap items-baseline gap-x-1.5 md:order-none md:block">
            <dt className="text-sm font-medium leading-6 text-slate-500 md:sr-only">
              Spread:
            </dt>

            <dd className="min-w-0 break-words text-sm font-semibold leading-6 text-slate-900 md:text-base md:leading-7">
              <bdi>{acc.spread || "Not specified"}</bdi>
            </dd>
          </dl>

          {/* Commission: Expanded on Mobile */}
          <dl
            id={`account-commission-${acc.id}`}
            className="order-4 col-span-2 mt-2 hidden min-w-0 items-start justify-between gap-4 border-t border-slate-100 pt-3 peer-checked:flex md:order-none md:col-span-1 md:mt-0 md:block md:border-0 md:pt-0"
          >
            <dt className="shrink-0 text-[15px] font-medium leading-7 text-slate-500 md:sr-only">
              Commission
            </dt>

            <dd className="min-w-0 break-words text-right text-base font-bold leading-7 text-slate-900 md:text-center">
              <bdi>
                {acc.commission_en ||
                  acc.commission ||
                  "Not specified"}
              </bdi>
            </dd>
          </dl>

          {/* Deposit: Always Visible */}
          <dl className="order-3 flex min-w-0 flex-wrap items-baseline justify-end gap-x-1.5 md:order-none md:block">
            <dt className="text-sm font-medium leading-6 text-slate-500 md:sr-only">
              Deposit:
            </dt>

            <dd className="min-w-0 break-words text-sm font-semibold leading-6 text-slate-900 md:text-base md:leading-7">
              <bdi>
                {acc.min_deposit_en ||
                  acc.min_deposit ||
                  "Not specified"}
              </bdi>
            </dd>
          </dl>

          {/* Execution: Expanded on Mobile */}
          <dl
            id={`account-execution-${acc.id}`}
            className="order-5 col-span-2 hidden min-w-0 items-start justify-between gap-4 border-t border-slate-100 py-3 peer-checked:flex md:order-none md:col-span-1 md:block md:border-0 md:py-0"
          >
            <dt className="shrink-0 text-[15px] font-medium leading-7 text-slate-500 md:sr-only">
              Execution Type
            </dt>

            <dd className="min-w-0 break-words text-right text-base font-medium leading-7 text-slate-700 md:text-center">
              <bdi>{acc.execution_type || "Not specified"}</bdi>
            </dd>
          </dl>

          {/* Mobile Account Link */}
          <div
            id={`account-page-${acc.id}`}
            className="order-6 col-span-2 hidden pb-1 pt-1 peer-checked:block md:!hidden"
          >
            <Link
              href={withPreview(
                `/en/brokers/${broker.slug}/accounts/${accountSlug(
                  acc.account_name
                )}`,
                previewToken
              )}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 text-base font-bold text-brand-600 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              View Account Details
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      ))
    ) : (
      <p className="p-5 text-center text-base leading-7 text-slate-500">
        No account information is currently available.
      </p>
    )}
  </div>

{isNaga && (
  <div
    id="naga-vip-levels"
    className="mt-6 border-t border-slate-200 pt-5 md:pt-6"
  >
    <div className="rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-4 md:px-5 md:py-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold leading-8 text-slate-950 md:text-2xl">
            NAGA VIP User Levels
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-700 md:text-base md:leading-7">
            These are benefit levels, not separate trading account products.
            They are linked to VIP points and may affect spreads, copy-trading
            benefits and additional services.
          </p>
        </div>

        <span className="inline-flex w-fit shrink-0 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-[11px] font-bold text-brand-700">
          VIP User Levels
        </span>
      </div>
    </div>

    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {nagaVipLevels.map((level) => (
        <article
          key={level.name}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <h4 className="text-lg font-extrabold text-slate-950">
              <bdi>{level.name}</bdi>
            </h4>

            <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-brand-700">
              <bdi>{level.points}</bdi>
            </span>
          </div>

          <dl className="mt-2 divide-y divide-slate-200 text-[13px] leading-6 text-slate-700 md:text-sm">
            <div className="py-2">
              <dt className="font-extrabold text-slate-950">
                Spread Conditions
              </dt>
              <dd className="mt-0.5">
                <bdi>{level.spread}</bdi>
              </dd>
            </div>

            <div className="py-2">
              <dt className="font-extrabold text-slate-950">
                Copy Trading Benefits
              </dt>
              <dd className="mt-0.5">
                <bdi>{level.copy}</bdi>
              </dd>
            </div>

            <div className="py-2">
              <dt className="font-extrabold text-slate-950">
                Withdrawal Fees
              </dt>
              <dd className="mt-0.5">
                <bdi>$0</bdi> according to the published VIP table. Banks or
                payment providers may apply separate charges.
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>

    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7">
      VIP levels do not represent minimum deposits or separate trading
      accounts. The minimum first deposit applies to the general NAGA account.
      Products, fees and trading conditions may vary by legal entity, client
      country and financial instrument.
    </div>
  </div>
)}

  {/* Account Availability Note from Supabase */}
  {broker.account_availability_note_en?.trim() && (
    <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-4 md:px-5">
      <p className="text-[15px] leading-7 text-slate-700 md:text-base">
        {(() => {
          const note =
            broker.account_availability_note_en?.trim() ?? "";

          const separator = note.indexOf(":");

          if (separator === -1) {
            return note;
          }

          return (
            <>
              <span className="font-extrabold text-slate-950">
                {note.slice(0, separator + 1)}
              </span>{" "}
              {note.slice(separator + 1).trim()}
            </>
          );
        })()}
      </p>
    </div>
  )}

  {/* Account Opening */}
  <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between md:gap-6">
    <p className="text-[15px] font-medium leading-7 text-slate-600 md:text-base">
      Review the account conditions, availability, and trading costs before
      registering.
    </p>

    <a
      href={`/go/${broker.slug}?type=real`}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-base font-extrabold text-white transition hover:bg-brand-600 md:shrink-0"
    >
      <span>
        Open an Account with{" "}
        <bdi>{broker.name_en || broker.name}</bdi>
      </span>

      <span aria-hidden="true" className="shrink-0">
        ↗
      </span>
    </a>
  </div>
</section>

{brokerLicenses.length > 0 ? (
  <BrokerLicensesSection
    brokerName={broker.name_en || broker.name}
    licenses={brokerLicenses}
    regulationSummary={regulationSummary}
    fundProtection={fundProtection}
    safetyFactors={safetyFactors}
    regulationItems={regulationItems}
  />
) : (
  <SectionCard
    title="Regulation & Safety"
  subtitle={`An overview of the regulatory standing and safety considerations for ${broker.name_en || broker.name}.`}
  id="regulation"
>
  <div className="space-y-5">
  {/* Mobile */}
<div className="md:hidden">
  <div className="rounded-[26px] border border-slate-200 bg-white p-4 text-left shadow-sm">

    <div className="mb-4 flex justify-center">
      {regulationBodies.length ? (
        <span className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-black text-brand-600">
          {regulationBodies.join(" | ")}
        </span>
      ) : broker.regulation_short ? (
        <span className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-black text-brand-600">
          {broker.regulation_short}
        </span>
      ) : null}
    </div>

    <p className="text-left text-[14px] leading-7 text-slate-600">
      {regulationSummary || "No data is currently available."}
    </p>

    {safetyFactors.length ? (
      <div className="mt-5">
        <div className="mb-3 text-sm font-black text-slate-950">
          Key Safety Factors
        </div>

        <div className="grid grid-cols-2 gap-2">
          {safetyFactors.slice(0, 4).map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-[12px] font-bold leading-5 text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ) : null}

    {fundProtection ? (
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="text-sm font-black text-slate-900">
          Client Fund Protection
        </div>
        <div className="mt-2 text-[13px] font-semibold leading-6 text-slate-600">
          {fundProtection}
        </div>
      </div>
    ) : null}

  </div>
</div>

    {/* Desktop — improved */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="border-b border-slate-100 bg-slate-50 p-5 xl:border-b-0 xl:border-r">
            <div className="text-xs font-black uppercase tracking-[0.12em] text-brand-600">
              Safety Snapshot
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Regulatory Bodies
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {regulationBodies.length ? (
                    regulationBodies.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex shrink-0 items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-600"
                      >
                        {item}
                      </span>
                    ))
                  ) : broker.regulation_short ? (
                    <span className="inline-flex shrink-0 items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-600">
                      {broker.regulation_short}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-500">No data available</span>
                  )}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Fund Protection
                </div>
                <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                  {fundProtection || "No data available."}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 xl:p-7">
            <div className="text-2xl font-extrabold tracking-tight text-slate-950">
              Regulation & Client Protection
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-700 md:text-base">
              {regulationSummary || "No data is currently available."}
            </p>

            <div className="mt-5">
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-800">
                  Safety Factors
                </div>

                {safetyFactors.length ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {safetyFactors.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                      >
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.55)]" />
                        <span className="text-sm leading-6 text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 text-sm leading-7 text-slate-500">
                    No data available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</SectionCard>
)}

{/* Fees and Trading Costs */}
<SectionCard
  title="Fees & Trading Costs"
  subtitle={`A clear overview of ${
    broker.name_en || broker.name
  }’s spreads, commissions, and potential trading costs.`}
  id="fees"
>
  <div
    dir="ltr"
    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
  >
    <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
      {/* Pricing Summary */}
      <div className="border-b border-slate-200 bg-slate-50/80 px-3.5 py-3 md:border-b-0 md:border-r md:p-4">
        <h3 className="hidden text-xs font-semibold leading-5 text-slate-500 md:block">
          Pricing Summary
        </h3>

        <dl className="mt-2 divide-y divide-slate-200 md:mt-3">
          {/* Lowest Spread */}
          <div className="flex items-center justify-between gap-3 py-2 md:block md:pb-3 md:pt-0">
            <dt className="shrink-0 text-xs leading-5 text-slate-500">
              Lowest Spread
            </dt>

            <dd className="min-w-0 text-right text-[13px] font-bold leading-6 text-slate-950 md:mt-1 md:text-left md:text-sm">
              <bdi>
                {lowestSpread?.spread ||
                  broker.spreads_en ||
                  broker.spreads ||
                  "—"}
              </bdi>
            </dd>
          </div>

          {/* Commission Structure */}
          <div className="flex items-center justify-between gap-3 pb-0 pt-2 md:block md:pt-3">
            <dt className="shrink-0 text-xs leading-5 text-slate-500">
              Commission Structure
            </dt>

            <dd className="min-w-0 break-words text-right text-[13px] font-semibold leading-6 text-slate-950 md:mt-1 md:text-left">
              {commissionAccounts.length === 1
  ? "1 commission-based account"
  : commissionAccounts.length > 1
  ? `${commissionAccounts.length} commission-based accounts`
  : noCommissionAccounts.length > 0
  ? "Commission-free accounts available"
  : "Commission data unavailable"}
            </dd>
          </div>
        </dl>
      </div>

      {/* Fees Explanation */}
      <div className="min-w-0 px-3.5 py-4 md:p-5">
        <h3 className="text-sm font-bold leading-6 text-slate-950 md:text-base">
          Trading Fees Explained
        </h3>

        <details className="group mt-2.5">
          <summary className="list-none [&::-webkit-details-marker]:hidden">
            <div className="line-clamp-4 space-y-3 text-left text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] group-open:line-clamp-none md:line-clamp-none md:text-sm md:leading-7">
              {(() => {
                const text =
                  broker.fees_en ||
                  `Trading costs at ${
                    broker.name_en || broker.name
                  } depend on the selected account type, spread, commission structure, and traded instrument.`;

                // Use paragraphs already stored in Supabase.
                const existingParagraphs = text
                  .split(/\|\||\r?\n+/)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean);

                if (existingParagraphs.length > 1) {
                  return existingParagraphs.map(
                    (paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    )
                  );
                }

                // Split a long text near the middle at a sentence ending.
                // This ignores periods inside decimals and names such as Capital.com.
                const boundaries = Array.from(
                  text.matchAll(/[.!?](?=\s+\S)/g),
                  (match) =>
                    match.index! + match[0].length
                );

                if (text.length < 240 || boundaries.length === 0) {
                  return <p>{text}</p>;
                }

                const midpoint = text.length / 2;

                const splitAt = boundaries.reduce(
                  (closest, boundary) =>
                    Math.abs(boundary - midpoint) <
                    Math.abs(closest - midpoint)
                      ? boundary
                      : closest
                );

                return (
                  <>
                    <p>{text.slice(0, splitAt).trim()}</p>
                    <p>{text.slice(splitAt).trim()}</p>
                  </>
                );
              })()}
            </div>

            <span className="mt-1 inline-flex min-h-[44px] cursor-pointer items-center text-xs font-semibold text-brand-600 md:hidden">
              <span className="group-open:hidden">
                Read more +
              </span>

              <span className="hidden group-open:inline">
                Show less −
              </span>
            </span>
          </summary>
        </details>
      </div>
    </div>
  </div>
</SectionCard>

     {/* Deposits and Withdrawals */}
<SectionCard
  title="Deposits & Withdrawals"
  id="deposit-withdrawal"
>
  <div
    dir="ltr"
    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
  >
    <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
      {/* Funding Summary */}
      <div className="border-b border-slate-200 bg-slate-50/80 px-3.5 py-3 md:border-b-0 md:border-r md:p-4">
        <h3 className="hidden text-xs font-semibold leading-5 text-slate-500 md:block">
          Funding Summary
        </h3>

        <dl className="divide-y divide-slate-200 md:mt-3">
          {/* Payment Methods */}
          <div className="flex items-center justify-between gap-3 pb-2 md:block md:pb-3">
            <dt className="shrink-0 text-xs leading-5 text-slate-500">
              Payment Methods
            </dt>

            <dd className="min-w-0 text-right text-[13px] font-bold leading-6 text-slate-950 md:mt-1 md:text-left md:text-sm">
              {paymentMethods.length || "—"}
            </dd>
          </div>

          {/* Minimum Deposit */}
          <div className="flex items-center justify-between gap-3 py-2 md:block md:py-3">
            <dt className="shrink-0 text-xs leading-5 text-slate-500">
              Minimum Deposit
            </dt>

            <dd className="min-w-0 text-right text-[13px] font-bold leading-6 text-slate-950 md:mt-1 md:text-left md:text-sm">
              <bdi>
                {formatMoney(broker.min_deposit)}
              </bdi>
            </dd>
          </div>

          {/* Deposit and Withdrawal Score */}
          <div className="flex items-center justify-between gap-3 py-2 md:block md:py-3">
            <dt className="shrink-0 text-xs leading-5 text-slate-500">
              Funding Score
            </dt>

            <dd className="min-w-0 text-right text-[13px] font-bold leading-6 text-slate-950 md:mt-1 md:text-left md:text-sm">
              <bdi>
                {broker.score_deposit ?? "—"} / 5
              </bdi>
            </dd>
          </div>

          {/* Withdrawal Speed */}
          <div className="pt-2 md:pt-3">
            <dt className="text-xs leading-5 text-slate-500">
              Withdrawal Speed
            </dt>

            <dd className="mt-1 break-words text-[13px] font-semibold leading-6 text-slate-950">
              {withdrawalSpeed || "No data available."}
            </dd>
          </div>
        </dl>
      </div>

      {/* Deposit and Withdrawal Details */}
      <div className="min-w-0 px-3.5 py-4 md:p-5">
        <h3 className="text-sm font-bold leading-6 text-slate-950 md:text-base">
          Deposit & Withdrawal Details
        </h3>

        <details className="group/deposit mt-2.5">
          <summary className="list-none rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
            <div className="line-clamp-4 space-y-3 text-left text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] group-open/deposit:line-clamp-none md:line-clamp-none md:text-sm md:leading-7">
              {(
                depositSummary ||
                "There is currently insufficient information about deposits and withdrawals."
              )
                .split(/\|\||\r?\n+/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            <span className="mt-1 inline-flex min-h-[44px] cursor-pointer items-center text-xs font-semibold text-brand-600 md:hidden">
              <span className="group-open/deposit:hidden">
                Read more +
              </span>

              <span className="hidden group-open/deposit:inline">
                Show less −
              </span>
            </span>
          </summary>
        </details>

        {/* Supported Payment Methods */}
        <div className="mt-4 border-t border-slate-100 pt-3 md:mt-5 md:pt-4">
          <h3 className="text-xs font-semibold leading-5 text-slate-500">
            Supported Payment Methods
          </h3>

          {paymentMethods.length ? (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {paymentMethods.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="max-w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium leading-5 text-slate-700 [overflow-wrap:anywhere] md:text-xs"
                >
                  <bdi>{item}</bdi>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-xs leading-6 text-slate-500">
              No payment method data is currently available.
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</SectionCard>

{/* Trading Platforms */}
<SectionCard
  title="Trading Platforms"
  subtitle={`A closer look at the trading platforms offered by ${
    broker.name_en || broker.name
  } and the overall platform experience.`}
  id="platforms"
>
  {(() => {
    const platforms = availablePlatforms.length
      ? availablePlatforms
      : splitPipes(broker.platforms);

    const hasPlatform = (version: "4" | "5") =>
      platforms.some((item) =>
        new RegExp(
          `\\bMT\\s*${version}\\b|MetaTrader\\s*${version}\\b`,
          "i"
        ).test(item)
      );

    const hasMT4 = hasPlatform("4");
    const hasMT5 = hasPlatform("5");

    return (
      <div
        dir="ltr"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
          {/* Platform Summary */}
          <div className="border-b border-slate-200 bg-slate-50/80 px-3.5 py-3 md:border-b-0 md:border-r md:p-4">
            <h3 className="hidden text-xs font-semibold leading-5 text-slate-500 md:block">
              Platform Access
            </h3>

            <dl className="divide-y divide-slate-200 md:mt-3">
              {/* Available Platforms */}
              <div className="pb-3">
                <dt className="text-xs leading-5 text-slate-500">
                  Available Platforms
                </dt>

                <dd className="mt-2">
                  {platforms.length ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {platforms.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="max-w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold leading-5 text-brand-600 [overflow-wrap:anywhere] md:text-xs"
                        >
                          <bdi>{item}</bdi>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs leading-6 text-slate-500">
                      No platform data is currently available.
                    </span>
                  )}
                </dd>
              </div>

              {/* Trading Tools */}
              <div className="flex items-center justify-between gap-3 pt-2 md:block md:pt-3">
                <dt className="shrink-0 text-xs leading-5 text-slate-500">
                  Trading Tools
                </dt>

                <dd className="min-w-0 text-right text-[13px] font-semibold leading-6 text-slate-950 md:mt-1 md:text-left">
                  {platformTools.length
                    ? `${platformTools.length} ${
                        platformTools.length === 1
                          ? "tool available"
                          : "tools available"
                      }`
                    : "No data available"}
                </dd>
              </div>

              {/* Best For */}
              {broker.best_for_en?.trim() && (
                <div className="mt-2 pt-2 md:mt-3 md:pt-3">
                  <dt className="text-xs leading-5 text-slate-500">
                    Best For
                  </dt>

                  <dd className="mt-1 break-words text-[13px] font-semibold leading-6 text-slate-950">
                    {broker.best_for_en}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Platform Experience */}
          <div className="min-w-0 px-3.5 py-4 md:p-5">
            <h3 className="text-sm font-bold leading-6 text-slate-950 md:text-base">
              Trading Platform Experience
            </h3>

            <details className="group/platforms mt-2.5">
              <summary className="list-none rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
                <div className="line-clamp-4 space-y-3 text-left text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] group-open/platforms:line-clamp-none md:line-clamp-none md:text-sm md:leading-7">
                  {(
                    platformSummary ||
                    `There is currently insufficient information about the trading platforms available at ${
                      broker.name_en || broker.name
                    }.`
                  )
                    .split(/\|\||\r?\n+/)
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <span className="mt-1 inline-flex min-h-[44px] cursor-pointer items-center text-xs font-semibold text-brand-600 md:hidden">
                  <span className="group-open/platforms:hidden">
                    Read more +
                  </span>

                  <span className="hidden group-open/platforms:inline">
                    Show less −
                  </span>
                </span>
              </summary>
            </details>

            {/* Available Trading Tools */}
            {platformTools.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-3 md:mt-5 md:pt-4">
                <h3 className="text-xs font-semibold leading-5 text-slate-500">
                  Available Trading Tools
                </h3>

                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {platformTools.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="max-w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium leading-5 text-slate-700 [overflow-wrap:anywhere] md:text-xs"
                    >
                      <bdi>{item}</bdi>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MetaTrader Downloads */}
            {(hasMT4 || hasMT5) && (
              <div className="mt-4 border-t border-slate-100 pt-3 md:mt-5 md:pt-4">
                <h3 className="text-xs font-semibold leading-5 text-slate-500">
                  Download MetaTrader Platforms
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  {hasMT4 && (
                    <a
                      href={`/go/${broker.slug}?type=mt4`}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-3 text-xs font-semibold text-brand-600 transition hover:bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:flex-none md:px-4"
                    >
                      Download MT4
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}

                  {hasMT5 && (
                    <a
                      href={`/go/${broker.slug}?type=mt5`}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-3 text-xs font-semibold text-brand-600 transition hover:bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:flex-none md:px-4"
                    >
                      Download MT5
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })()}
</SectionCard>

{/* Final Verdict */}
<SectionCard title="Final Verdict" id="verdict">
  <div
    dir="ltr"
    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
  >
    {/* Rating and Verdict */}
    <div className="grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200 bg-slate-50/80 px-3.5 py-3 text-center md:px-5">
      <div className="min-w-0 pr-3">
        <div className="text-xs leading-5 text-slate-500">
          Overall Rating
        </div>

        <div className="mt-1 text-base font-bold leading-6 text-slate-950">
          <bdi dir="ltr">
            {overallScore || broker.rating || "—"} / 5
          </bdi>
        </div>
      </div>

      <div className="min-w-0 pl-3">
        <div className="text-xs leading-5 text-slate-500">
          Final Verdict
        </div>

        <div className="mt-1 break-words text-sm font-bold leading-6 text-slate-950">
          {verdictTone.label}
        </div>
      </div>
    </div>

    <div className="min-w-0 px-3.5 py-4 md:p-5">
      {/* Verdict Summary */}
      <h3 className="text-sm font-bold leading-6 text-slate-950 md:text-base">
        Our verdict on {broker.name_en || broker.name}
      </h3>

      <details className="group/verdict mt-2.5">
        <summary className="list-none rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
          <div className="line-clamp-4 space-y-3 text-left text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] group-open/verdict:line-clamp-none md:line-clamp-none md:text-sm md:leading-7">
            {(
              broker.final_verdict_en ||
              "There is not enough information available to provide a final verdict at this time."
            )
              .split(/\|\||\r?\n+/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          <span className="mt-1 inline-flex min-h-[44px] cursor-pointer items-center text-xs font-semibold text-brand-600 md:hidden">
            <span className="group-open/verdict:hidden">
              Read more +
            </span>

            <span className="hidden group-open/verdict:inline">
              Show less −
            </span>
          </span>
        </summary>
      </details>

      {/* Key Strength and Limitation */}
      {(broker.key_strength_en || broker.key_weakness_en) && (
        <div
          className={`mt-3 grid gap-2 md:mt-4 md:gap-3 ${
            broker.key_strength_en && broker.key_weakness_en
              ? "md:grid-cols-2"
              : ""
          }`}
        >
          {broker.key_strength_en && (
            <div className="min-w-0 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2.5">
              <h4 className="text-xs font-semibold leading-5 text-emerald-700">
                Key Strength
              </h4>

              <p className="mt-1 text-[13px] leading-6 text-slate-800 [overflow-wrap:anywhere]">
                {broker.key_strength_en}
              </p>
            </div>
          )}

          {broker.key_weakness_en && (
            <div className="min-w-0 rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-2.5">
              <h4 className="text-xs font-semibold leading-5 text-amber-700">
                Main Limitation
              </h4>

              <p className="mt-1 text-[13px] leading-6 text-slate-800 [overflow-wrap:anywhere]">
                {broker.key_weakness_en}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Account Link */}
      <div className="mt-4 flex justify-center border-t border-slate-100 pt-3 md:pt-4">
        <a
          href={`/go/${broker.slug}?type=real`}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:w-auto"
        >
          Open an account with {broker.name_en || broker.name}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </div>
</SectionCard>


      {faqItems.length > 0 && (
  <SectionCard title="Frequently Asked Questions" id="faq">
    {(() => {
      const renderFaq = (
        item: (typeof faqItems)[number],
        key: string
      ) => (
        <details
          key={key}
          className="group/question overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <summary className="flex min-h-[44px] cursor-pointer list-none items-start justify-between gap-3 px-3.5 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 md:px-4 [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1 text-left text-[13px] font-semibold leading-6 text-slate-950 [overflow-wrap:anywhere] md:text-sm">
              {item.question}
            </span>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-open/question:rotate-180"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>

          <div className="border-t border-slate-100 bg-slate-50/60 px-3.5 py-3 md:px-4">
            <div className="space-y-2 text-left text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] md:text-sm md:leading-7">
              {item.answer
                .split(/\|\||\r?\n+/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>
        </details>
      );

      return (
        <div dir="ltr" className="space-y-2">
          {visibleFaqItems.map((item, index) =>
            renderFaq(item, `faq-${index}`)
          )}

          {extraFaqItems.length > 0 && (
            <details className="group/more">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-brand-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
                <span className="group-open/more:hidden">
                  Show more questions ({extraFaqItems.length})
                </span>

                <span className="hidden group-open/more:inline">
                  Hide additional questions
                </span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 shrink-0 transition-transform group-open/more:rotate-180"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>

              <div className="mt-2 space-y-2">
                {extraFaqItems.map((item, index) =>
                  renderFaq(item, `extra-faq-${index}`)
                )}
              </div>
            </details>
          )}
        </div>
      );
    })()}
  </SectionCard>
)}

      {/* Related Broker Comparisons */}
<div className="mb-2">
  <SectionCard
    title={`Compare ${
      broker.name_en || broker.name
    } with Other Brokers`}
  >
    {broker.slug && (
      <BrokerRelatedComparisons
        key={broker.slug}
        locale="en"
        broker={{
          ...broker,
          slug: broker.slug,
        }}
        relatedBrokers={relatedBrokers.flatMap(
          (item) =>
            item.slug
              ? [{ ...item, slug: item.slug }]
              : []
        )}
      />
    )}
  </SectionCard>
</div>

{/* Risk Warning — final content before the footer */}
<div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-left md:px-4">
  <div className="flex items-center gap-2">
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-200 text-[11px] font-bold text-amber-700"
    >
      !
    </span>

    <h2 className="text-xs font-semibold leading-5 text-slate-700">
      Risk Warning
    </h2>
  </div>

  <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-xs md:leading-6">
    The information on this page is provided for educational and informational
    purposes only and does not constitute financial or investment advice.
    Broker Alarab does not provide trading services or hold client funds.
    Trading forex, CFDs and other leveraged products involves a high level of
    risk and may not be suitable for all investors. You may lose part or all of
    your invested capital. Trading conditions, leverage and investor protection
    may vary according to the broker, regulatory entity and client jurisdiction.
  </p>
</div>

          </div>
        </div>
      </main>
    </>
  );
}