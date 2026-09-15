import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrokerRelatedComparisons from "../../components/BrokerRelatedComparisons";

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
  accounts_intro_ar: string | null;
  best_for: string | null;
  intro: string | null;
  logo: string | null;

  pros: string | null;
  cons: string | null;
  pros_en: string | null;
  cons_en: string | null;

  fees: string | null;
  spreads: string | null;
  fees_en: string | null;
  spreads_en: string | null;

  account_types: string | null;
  deposit_withdrawal: string | null;
  platform_details: string | null;
  support: string | null;
  safety: string | null;
  arab_traders: string | null;
  final_verdict: string | null;

  support_en: string | null;
  safety_en: string | null;
  final_verdict_en: string | null;
  deposit_withdrawal_en: string | null;
  platform_details_en: string | null;

  meta_title: string | null;
  meta_descr: string | null;
  meta_title_en: string | null;
  meta_description_en: string | null;

  real_account_url: string | null;
  demo_account_url: string | null;
  mt4_download_url: string | null;
  mt5_download_url: string | null;
  

  founded_year: string | null;
  headquarters: string | null;
  headquarters_en: string | null;
  max_leverage: string | null;
  max_leverage_note_ar: string | null;
  account_availability_note_ar: string | null;
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
  broker_positioning_ar: string | null;

  who_should_use_en: string | null;
  who_should_use_ar: string | null;

  who_should_avoid_en: string | null;
  who_should_avoid_ar: string | null;

  key_strength_en: string | null;
  key_strength_ar: string | null;

  key_weakness_en: string | null;
  key_weakness_ar: string | null;

  expert_insight_en: string | null;
  expert_insight_ar: string | null;

  deposit_withdrawal_summary_en: string | null;
  deposit_withdrawal_summary_ar: string | null;

  payment_methods_en: string | null;
  payment_methods_ar: string | null;

  withdrawal_speed_en: string | null;
  withdrawal_speed_ar: string | null;

  platform_summary_en: string | null;
  platform_summary_ar: string | null;

  available_platforms_en: string | null;
  available_platforms_ar: string | null;

  platform_tools_en: string | null;
  platform_tools_ar: string | null;

  regulation_summary_en: string | null;
  regulation_summary_ar: string | null;

  fund_protection_en: string | null;
  fund_protection_ar: string | null;

  safety_factors_en: string | null;
  safety_factors_ar: string | null;
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
    .order("regulator_code", { ascending: true });

  if (error || !data) return [];

  return data as BrokerLicense[];
}

async function getOpenAccountGuide(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("broker_open_account_guides")
    .select("slug")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) return null;

  return data;
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
      title: "الشركة غير موجودة | بروكر العرب",
      description: "لم يتم العثور على شركة التداول المطلوبة.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const brokerName =
    broker.name?.trim() ||
    broker.name_en?.trim() ||
    "شركة التداول";

  const canonicalSlug = broker.slug || slug;
  const canonicalUrl = `${SITE_URL}/brokers/${canonicalSlug}`;

  const publishedTime = toIsoDate(broker.published_at);
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
    broker.meta_title?.trim() ||
    `تقييم ${brokerName} ${reviewYear}: التراخيص والرسوم والحسابات | بروكر العرب`;

  const description =
    broker.meta_descr?.trim() ||
    `اقرأ تقييم ${brokerName} لعام ${reviewYear} وتعرّف على التراخيص، الرسوم والسبريد، أنواع الحسابات، منصات التداول، الإيداع والسحب، والمزايا والعيوب قبل فتح الحساب.`;

  const brokerLogo = absoluteUrl(broker.logo);
  const isPreview = broker.publication_status !== "published";

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,

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
        ar: canonicalUrl,
        en: `${SITE_URL}/en/brokers/${canonicalSlug}`,
        "x-default": canonicalUrl,
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "بروكر العرب",
      locale: "ar_AR",
      type: "article",
      publishedTime,
      modifiedTime,
      images: brokerLogo
        ? [
            {
              url: brokerLogo,
              alt: `شعار ${brokerName}`,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary",
      title,
      description,
      images: brokerLogo ? [brokerLogo] : undefined,
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
     <h2 className="mb-2 text-[22px] font-extrabold leading-8 text-slate-950 md:text-2xl">
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
      label: "ممتاز",
      badge: "خيار قوي",
      color: "border-brand-100 bg-brand-50 text-brand-600",
      accent: "from-brand-500 via-brand-500 to-cyan-400",
    };
  }

  if ((score ?? 0) >= 4) {
    return {
      label: "جيد جدًا",
      badge: "تقييم قوي",
      color: "border-brand-100 bg-brand-50 text-brand-600",
      accent: "from-brand-500 via-sky-400 to-cyan-400",
    };
  }

  if ((score ?? 0) >= 3) {
    return {
      label: "جيد",
      badge: "مقبول",
      color: "border-amber-200 bg-amber-50 text-amber-700",
      accent: "from-amber-500 via-yellow-400 to-orange-400",
    };
  }

  return {
    label: "متوسط",
    badge: "بحاجة لمراجعة",
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
    <div className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md md:p-4">
      <div className="mb-2 flex items-start justify-between gap-3 md:mb-3">
        <span className="text-[11px] font-black leading-5 text-slate-700">
  {label}
</span>
        <span className="shrink-0 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-black text-brand-600">
          {value ?? "-"} / 5
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-200 md:h-2.5">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-blue-400 md:h-2.5"
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
  if (value === "Yes") return "نعم";
  if (value === "No") return "لا";
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
    <div className="flex flex-col gap-1 border-b border-slate-200 py-3 text-right last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="text-sm font-medium text-slate-400">{label}</div>
      <div className="text-right text-[15px] font-extrabold text-slate-900 break-words md:text-[18px]">
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
      <div className="border-b border-slate-100 py-3 text-right last:border-b-0">
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right">
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
      <p className="text-right leading-8 text-slate-700">
        {text || "لا توجد بيانات متاحة حاليًا."}
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
              className="flex flex-row-reverse items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm"
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
        <p className="text-right text-slate-500">لا توجد بيانات متاحة حاليًا.</p>
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
      <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-[16px] bg-white md:h-[340px]">
        <img
          src={src}
          alt={`منصة تداول ${brokerName}`}
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
        <div className="space-y-4 text-right leading-8 text-slate-700">
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
        <p className="text-right text-slate-500">لا توجد بيانات متاحة حاليًا.</p>
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
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right leading-7 text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-right text-slate-500">لا توجد بيانات متاحة حاليًا.</p>
      )}
    </SectionCard>
  );
}

function renderStars(rating: number | null) {
  if (!rating) return null;

  const rounded = Math.round(rating * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div
      className="flex items-center gap-2 px-3 py-1 rounded-md"
      style={{
        background: "#111827",
borderRadius: "10px",
padding: "6px 10px",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "18px",
      }}
    >
      <span style={{ color: "#f59e0b", fontSize: "20px" }}>★</span>

      <div style={{ display: "flex", gap: "2px" }}>
        {Array.from({ length: full }).map((_, i) => (
          <span key={"f" + i} style={{ color: "#f59e0b" }}>
            ★
          </span>
        ))}

        {half && <span style={{ color: "#f59e0b" }}>☆</span>}

        {Array.from({ length: empty }).map((_, i) => (
          <span key={"e" + i} style={{ color: "#475569" }}>
            ★
          </span>
        ))}
      </div>

      <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
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
    <div className={`min-w-0 rounded-xl border px-3 py-2 shadow-sm ${tones[tone]} text-right`}>
      <div className="text-[11px] font-bold text-slate-500">
        {label}
      </div>
      <div className="mt-1 overflow-hidden text-[15px] font-black leading-5 text-slate-900 break-words">
        {normalizeValue(value)}
      </div>
    </div>
  );
}

function ParagraphBlock({
  content,
  fallback,
  compact = false,
}: {
  content: string | null;
  fallback: string;
  compact?: boolean;
}) {
  const paragraphs = (content || fallback)
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);

 if (compact) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none">
        <div className="relative max-h-[120px] overflow-hidden text-[14px] leading-7 text-slate-700 group-open:hidden">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="mb-3 text-justify last:mb-0">
              {paragraph}
            </p>
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="mt-2 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-brand-600 hover:bg-slate-100">
          <span className="group-open:hidden">عرض المزيد</span>
          <span className="hidden group-open:inline">عرض أقل</span>
        </div>
      </summary>

      <div className="mt-3 space-y-3 text-[14px] leading-7 text-slate-700">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-justify">
            {paragraph}
          </p>
        ))}
      </div>
    </details>
  );
}

  return (
    <div className="space-y-4 text-sm leading-8 text-slate-700 md:text-base">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-justify">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function MobileAccountAccordion({
  accounts,
  brokerSlug,
}: {
  accounts: BrokerAccount[];
  brokerSlug: string;
}) {
  if (!accounts.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-slate-500 md:hidden">
        لا توجد بيانات حسابات متاحة حاليًا.
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
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
            <div className="min-w-0 text-right">
              <Link
  href={`/brokers/${brokerSlug}/accounts/${accountSlug(acc.account_name)}`}
  className="text-base font-black text-brand-600 hover:text-brand-600"
>
  {acc.account_name || "-"}
</Link>

              <div className="mt-1 text-xs font-medium text-slate-500">
                {acc.best_for || "تفاصيل الحساب"}
              </div>
            </div>

            <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 transition group-open:rotate-180">
              ⌄
            </div>
          </summary>

          <div className="border-t border-slate-100 bg-slate-50 px-4 py-4">
            <div className="space-y-3 text-right">

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">السبريد</span>
                <span className="font-extrabold text-slate-900">
                  {acc.spread || "-"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">العمولة</span>
                <span className="font-extrabold text-slate-900">
                  {acc.commission || "-"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">الحد الأدنى للإيداع</span>
                <span className="font-extrabold text-slate-900">
                  {acc.min_deposit || "-"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">نوع التنفيذ</span>
                <span className="font-extrabold text-slate-900">
                  {acc.execution_type || "-"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-slate-500">مناسب لـ</span>
                <span className="font-extrabold text-slate-900">
                  {acc.best_for || "-"}
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
        لا توجد بيانات رسوم متاحة حاليًا.
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
            <div className="min-w-0 text-right">
              <div className="text-[17px] font-black text-slate-900">
                {acc.account_name || "-"}
              </div>

              <div className="mt-0.5 text-[11px] font-medium text-slate-500">
                {acc.commission || "بدون عمولة"}
              </div>
            </div>

            <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition group-open:rotate-180">
              ⌄
            </div>
          </summary>

          <div className="border-t border-slate-100 bg-slate-50 px-4 py-4">
            <div className="space-y-3 text-right">

              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">السبريد</span>
                <span className="font-extrabold text-slate-900">
                  {acc.spread || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <span className="text-sm font-medium text-slate-500">العمولة</span>
                <span className="font-extrabold text-slate-900">
                  {acc.commission || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-500">الحد الأدنى للإيداع</span>
                <span className="font-extrabold text-slate-900">
                  {acc.min_deposit || "-"}
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

  return `/licenses/${slug}`;
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

  const name = brokerName || "هذا الوسيط";

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

  const featuredRegulators = rankedLicenses
    .filter(
      (license, index, items) =>
        items.findIndex(
          (item) =>
            (item.regulator_code || "").trim().toUpperCase() ===
            (license.regulator_code || "").trim().toUpperCase()
        ) === index
    )
    .filter((license) => regulatorPageHref(license.regulator_code))
    .slice(0, 3);

  const statusLabel = (status: string | null) => {
    if (status === "active") return "نشط";
    if (status === "expired") return "منتهي";
    if (status === "revoked") return "ملغي";
    if (status === "pending") return "قيد المراجعة";
    if (status === "suspended") return "معلّق";
    return "غير محدد";
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

  return (
    <section
      id="licenses"
      dir="rtl"
      className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-4 text-right shadow-sm md:rounded-[28px] md:p-8"
    >
      <h2 className="text-[22px] font-extrabold leading-8 text-slate-950 md:text-2xl">
  التراخيص والأمان لدى <bdi>{name}</bdi>
</h2>

      {/* Regulatory overview */}
      {summaryText && (
        <div className="mt-3">
          <input
            id="licenses-overview-toggle"
            type="checkbox"
            aria-label="عرض الملخص التنظيمي كاملًا"
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
            <span className="overview-more">قراءة المزيد</span>
            <span className="overview-less hidden">عرض أقل</span>
          </label>
        </div>
      )}

      {/* Compact facts */}
<dl className="mt-3 divide-y divide-slate-200/70 rounded-xl border border-slate-200 bg-slate-50 px-3 md:mt-5 md:grid md:grid-cols-4 md:gap-4 md:divide-y-0 md:px-4 md:py-4">
  {[
    ["عدد التراخيص", String(licenses.length)],
    ["أعلى جهة رقابية", topLicense.regulator_code || "غير محدد"],
    ["آخر تحقق", latestVerified || "غير محدد"],
    ["الحالة", allActive ? "كلها نشطة" : "تحتاج مراجعة"],
  ].map(([label, value]) => (
    <div
      key={label}
      className="grid min-w-0 grid-cols-[max-content_minmax(0,1fr)] items-baseline gap-3 py-2 md:flex md:flex-col md:items-center md:justify-center md:gap-1 md:py-0 md:text-center"
    >
      <dt className="text-sm font-medium leading-6 text-slate-500 md:text-[15px]">
        {label}
      </dt>

      <dd className="min-w-0 text-left text-sm font-bold leading-6 text-slate-900 md:text-center md:text-[17px] md:leading-7">
        <bdi className="[overflow-wrap:anywhere]">
          {value}
        </bdi>
      </dd>
    </div>
  ))}
</dl>

      {/* Desktop table */}
      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-right text-sm [&_th:not(:first-child)]:text-center [&_td:not(:first-child)]:text-center">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {[
                  "الجهة الرقابية",
                  "الدولة",
                  "رقم الترخيص",
                  "الكيان القانوني",
                  "الحالة",
                  "التحقق",
                ].map((heading) => (
                  <th key={heading} className="px-4 py-4 font-bold">
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
                  license.verification_url_ar ||
                  license.verification_url_en;

                return (
                  <tr key={license.id} className="hover:bg-slate-50">
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

                      <p className="mt-1 leading-6 text-slate-500">
                        {license.regulator_name_ar}
                      </p>
                    </td>

                    <td className="px-4 py-4 font-semibold text-slate-700">
                      {license.country_ar || "—"}
                    </td>

                    <td className="px-4 py-4 font-bold text-slate-950">
                      <bdi dir="ltr">
                        {license.license_number || "—"}
                      </bdi>
                    </td>

                    <td className="px-4 py-4 leading-6 text-slate-700">
                      <bdi>
                        {license.entity_name_ar ||
                          license.entity_name_en ||
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
                          className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-brand-50 px-3 py-2 font-bold text-brand-600 hover:bg-brand-100"
                        >
                          تحقق من الترخيص
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="text-slate-500">غير متاح</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: first three licenses, with optional expansion */}
      <div className="mt-3 md:hidden">
        <input
          id="licenses-list-toggle"
          type="checkbox"
          aria-label="عرض جميع التراخيص"
          aria-controls="mobile-licenses-list"
          className="peer sr-only"
        />

        <div
          id="mobile-licenses-list"
          className="overflow-hidden rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 peer-checked:[&_.extra-license]:block"
        >
          {licenses.map((license, index) => {
            const regulatorHref = regulatorPageHref(
              license.regulator_code
            );
            const verificationHref =
              license.verification_url_ar ||
              license.verification_url_en;

            return (
              <details
                key={`mobile-${license.id}`}
                className={`group ${index >= 3 ? "extra-license hidden" : ""}`}
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
                      {license.country_ar || "الدولة غير محددة"}
                    </span>
                    <bdi
                      dir="ltr"
                      className="whitespace-nowrap font-semibold text-slate-700"
                    >
                      {license.license_number || "غير متاح"}
                    </bdi>
                  </div>
                </summary>

                <div className="mx-3 space-y-3 border-t border-slate-100 pb-3 pt-3 text-[15px] leading-7">
                  {license.regulator_name_ar && (
                    regulatorHref ? (
                      <Link
                        href={regulatorHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-600 hover:underline"
                      >
                        {license.regulator_name_ar}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    ) : (
                      <p className="text-slate-600">
                        {license.regulator_name_ar}
                      </p>
                    )
                  )}

                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-slate-500">الدولة</dt>
                      <dd className="text-slate-800">
                        {license.country_ar || "غير محددة"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500">
                        الكيان القانوني
                      </dt>
                      <dd className="break-words font-medium text-slate-800">
                        <bdi>
                          {license.entity_name_ar ||
                            license.entity_name_en ||
                            "غير محدد"}
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
                      عرض السجل الرسمي
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <p className="text-sm text-slate-500">
                      رابط التحقق الرسمي غير متاح علنًا.
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
              عرض جميع التراخيص ({licenses.length})
            </span>
            <span className="licenses-less hidden">عرض أقل</span>
          </label>
        )}
      </div>

      {/* Fund Protection */}
{protectionText && (
  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5">
    <input
      id="fund-protection-toggle"
      type="checkbox"
      aria-label="عرض تفاصيل حماية أموال العملاء"
      aria-controls="fund-protection-content"
      className="peer sr-only md:hidden"
    />

    <label
      htmlFor="fund-protection-toggle"
      className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 text-base font-bold text-slate-950 peer-checked:[&>svg]:rotate-180 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-500 md:hidden"
    >
      <span>حماية أموال العملاء</span>

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
      حماية أموال العملاء
    </h3>

    <div
      id="fund-protection-content"
      className="hidden border-t border-slate-200/70 pb-3 pt-3 peer-checked:block md:block"
    >
      <p className="whitespace-pre-line break-words text-right text-[15px] font-medium leading-7 text-slate-700 md:text-base md:leading-8">
        {protectionText}
      </p>
    </div>
  </div>
)}

    {/* Regulator Page Links */}
{(() => {
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

  if (!regulatorLinks.length) return null;

  return (
    <div className="mt-3 border-t border-slate-100 pt-3 md:mt-4">
      <p className="text-sm font-medium leading-6 text-slate-500 md:text-[15px]">
        تعرف على الجهات الرقابية
      </p>

      <div className="mt-2 grid grid-cols-3 gap-1.5 md:flex md:flex-wrap md:gap-2">
        {regulatorLinks.map((license, index) => (
          <Link
            key={`regulator-${license.id}`}
            href={regulatorPageHref(license.regulator_code)!}
            target="_blank"
            rel="noopener noreferrer"
            title={license.regulator_name_ar || undefined}
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
  );
})()}
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

const [
  relatedBrokers,
  accountsData,
  brokerLicenses,
  openAccountGuide,
] = await Promise.all([
  getRelatedBrokers(slug),
  getBrokerAccounts(broker.id),
  getBrokerLicenses(broker.id),
  getOpenAccountGuide(slug),
]);

const isNaga = broker.slug === "naga";

const visibleAccounts = isNaga
  ? accountsData.filter(
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
  : accountsData;

  const nagaVipLevels = [
  {
    name: "Iron",
    nameAr: "آيرون",
    points: "250 VIP points",
    spread: "Standard spreads, example EUR/USD 1.1",
    spreadAr: "فروق أسعار قياسية، مثال EUR/USD عند 1.1",
    copy: "Up to $0.12 per copied trade",
    copyAr: "حتى $0.12 لكل صفقة منسوخة",
  },
  {
    name: "Bronze",
    nameAr: "برونز",
    points: "2,500 VIP points",
    spread: "Standard spreads, example EUR/USD 1.1",
    spreadAr: "فروق أسعار قياسية، مثال EUR/USD عند 1.1",
    copy: "Up to $0.15 per copied trade",
    copyAr: "حتى $0.15 لكل صفقة منسوخة",
  },
  {
    name: "Silver",
    nameAr: "سيلفر",
    points: "5,000 VIP points",
    spread: "Silver spreads, example EUR/USD 1.1",
    spreadAr: "فروق أسعار Silver، مثال EUR/USD عند 1.1",
    copy: "Up to $0.18 per copied trade",
    copyAr: "حتى $0.18 لكل صفقة منسوخة",
  },
  {
    name: "Gold",
    nameAr: "جولد",
    points: "25,000 VIP points",
    spread: "Gold spreads, example EUR/USD 0.9",
    spreadAr: "فروق أسعار Gold، مثال EUR/USD عند 0.9",
    copy: "Up to $0.22 per copied trade",
    copyAr: "حتى $0.22 لكل صفقة منسوخة",
  },
  {
    name: "Diamond",
    nameAr: "دايموند",
    points: "50,000 VIP points",
    spread: "Diamond spreads, example EUR/USD 0.9",
    spreadAr: "فروق أسعار Diamond، مثال EUR/USD عند 0.9",
    copy: "Up to $0.27 per copied trade",
    copyAr: "حتى $0.27 لكل صفقة منسوخة",
  },
  {
    name: "Crystal",
    nameAr: "كريستال",
    points: "100,000 VIP points",
    spread: "VIP spreads, example EUR/USD 0.7",
    spreadAr: "فروق أسعار VIP، مثال EUR/USD عند 0.7",
    copy: "Up to $0.32 per copied trade",
    copyAr: "حتى $0.32 لكل صفقة منسوخة",
  },
];

  const commissionAccounts = visibleAccounts.filter(
  (acc) =>
    acc.commission &&
    acc.commission !== "0" &&
    acc.commission !== "0$" &&
    acc.commission !== "$0"
);

  const pros = splitText(broker.pros);
  const cons = splitText(broker.cons);

  const whoShouldUse = splitText(broker.who_should_use_ar).slice(0, 4);
  const whoShouldAvoid = splitText(broker.who_should_avoid_ar).slice(0, 4);

  const brokerPositioning =
    broker.broker_positioning_ar ||
    broker.intro ||
    `نقدم في هذه الصفحة مراجعة شاملة لشركة ${broker.name} من حيث التراخيص، الرسوم، الحسابات، والمنصات.`;  


  const overallScore = calculateOverallScore(broker);
  const verdictTone = getVerdictTone(overallScore);

  const accountCount = visibleAccounts.length;

  const lowestDeposit = visibleAccounts.length
    ? visibleAccounts
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

  const lowestSpread = visibleAccounts.length
  ? visibleAccounts
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

  const faqItems =
    (broker.faq_ar ?? []).filter(
      (item) => item?.question?.trim() && item?.answer?.trim()
    );

  const visibleFaqItems = faqItems.slice(0, 5);
  const extraFaqItems = faqItems.slice(5);

  const paymentMethods = splitText(broker.payment_methods_ar);

const depositSummary =
  broker.deposit_withdrawal_summary_ar || null;

const withdrawalSpeed =
  broker.withdrawal_speed_ar || null;

const availablePlatforms = broker.available_platforms_ar
  ? splitText(broker.available_platforms_ar)
  : splitPipes(broker.platforms);

const platformTools = splitText(broker.platform_tools_ar);

const platformSummary =
  broker.platform_summary_ar ||
  broker.platform_details ||
  null;

const regulationBodies = splitText(broker.regulation);

const regulationSummary =
  broker.regulation_summary_ar ||
  broker.safety ||
  null;

const fundProtection =
  broker.fund_protection_ar?.trim() || null;

const safetyFactors = splitText(
  broker.safety_factors_ar
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
const pageUrl = `${siteUrl}/brokers/${canonicalSlug}`;

const brokerName =
  broker.name?.trim() ||
  broker.name_en?.trim() ||
  "شركة التداول";

const brokerLogoUrl = absoluteUrl(broker.logo);

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
  broker.meta_descr?.trim() ||
  broker.intro?.trim() ||
  `مراجعة شاملة لشركة ${brokerName} تشمل التراخيص، الرسوم، الحسابات، المنصات، وطرق الإيداع والسحب.`;

const publisherSchema = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "بروكر العرب",
  url: siteUrl,
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "بروكر العرب",
  inLanguage: "ar",
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
      name: "الرئيسية",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "تقييمات شركات التداول",
      item: `${siteUrl}/brokers`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: `تقييم ${brokerName}`,
      item: pageUrl,
    },
  ],
};

const brokerEntitySchema = {
  "@type": "FinancialService",
  "@id": `${pageUrl}#broker`,
  name: brokerName,
  alternateName:
    broker.name_en?.trim() || undefined,
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
      name: `تقييم ${brokerName} ${reviewYear}`,
      headline: `تقييم ${brokerName} ${reviewYear}`,
      inLanguage: "ar",
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
        broker.final_verdict?.trim() ||
        broker.intro?.trim() ||
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
  name: `تقييم ${brokerName} ${reviewYear}`,
  description: pageDescription,
  inLanguage: "ar",
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
      dir="rtl"
      className="mx-auto w-full max-w-[1520px] px-3 pt-5 pb-1 text-right sm:px-5 md:pt-6 lg:px-6"
    >

{/* Trust Bar */}
<section
  aria-label="معايير مراجعات بروكر العرب"
  className="mb-5 hidden rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 md:block"
>
  <ul className="grid grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-4 md:gap-0">
    {[
      {
        short: "50+ وسيط",
        full: "تمت مراجعة 50+ وسيط",
        icon: (
          <path d="m5 12 4 4L19 6" />
        ),
      },
      {
        short: "150+ معيار",
        full: "أكثر من 150 معيار تقييم",
        icon: (
          <>
            <path d="M5 20V10M12 20V4M19 20v-7" />
          </>
        ),
      },
      {
        short: "تحديث شهري",
        full: "تحديث البيانات شهريًا",
        icon: (
          <>
            <path d="M20 7v5h-5M4 17v-5h5" />
            <path d="M6.1 7a7 7 0 0 1 11.6-2L20 8M4 16l2.3 3A7 7 0 0 0 17.9 17" />
          </>
        ),
      },
      {
        short: "مراجعة مستقلة",
        full: "مراجعات مستقلة ومحايدة",
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
          index > 0 ? "md:border-r md:border-slate-200/70" : ""
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
    className="scroll-mt-24 overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-bl from-blue-50/80 via-slate-50 to-white md:rounded-[28px] max-sm:rounded-[22px]"
  >
    <div className="px-5 py-5 sm:px-7 lg:px-9 lg:py-7 max-sm:px-4 max-sm:py-4">
      <nav
        aria-label="مسار الصفحة"
        className="flex flex-wrap items-center gap-2 text-xs font-medium leading-6 text-slate-600 sm:text-[13px] max-sm:gap-x-1.5 max-sm:gap-y-0 max-sm:text-[10px] max-sm:leading-5"
      >
        <Link href="/" className="hover:text-brand-600">
          الرئيسية
        </Link>

        <span aria-hidden="true" className="text-slate-400">
          /
        </span>

        <Link href="/brokers" className="hover:text-brand-600">
          تقييمات شركات التداول
        </Link>

        <span aria-hidden="true" className="text-slate-400">
          /
        </span>

        <bdi className="font-bold text-slate-800">
          {broker.name}
        </bdi>
      </nav>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 max-sm:mt-3 max-sm:grid max-sm:grid-cols-[76px_minmax(0,1fr)] max-sm:items-center max-sm:gap-x-3 max-sm:gap-y-3">
        {/* Prominent Logo */}
        <div className="flex h-32 w-44 shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-white bg-white shadow-sm sm:h-36 sm:w-48 max-sm:h-[76px] max-sm:w-[76px] max-sm:rounded-2xl">
          {broker.logo ? (
            <img
              src={broker.logo}
              alt={`شعار ${broker.name}`}
              width={192}
              height={144}
              className="h-full w-full object-contain max-sm:p-2"
            />
          ) : (
            <span className="px-4 text-center text-2xl font-black text-slate-900 max-sm:px-2 max-sm:text-sm">
              {broker.name}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 max-sm:contents">
          <div className="max-sm:min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-brand-600 sm:text-[13px] max-sm:text-[11px]">
                مراجعة بروكر العرب
              </span>

              <span
                aria-hidden="true"
                className="text-slate-300 max-sm:hidden"
              >
                •
              </span>

              <span className="text-xs font-medium text-slate-600 sm:text-[13px] max-sm:hidden">
                الحسابات والتكاليف والتراخيص
              </span>
            </div>

            <h1
              id="broker-review-title"
              className="mt-3 break-words text-[30px] font-black leading-tight tracking-tight text-slate-950 sm:text-[38px] xl:text-[46px] max-sm:mt-1.5 max-sm:text-[23px] max-sm:leading-[1.35]"
            >
              تقييم <bdi>{broker.name}</bdi>
            </h1>
          </div>

         <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium leading-6 text-slate-600 sm:text-sm max-sm:col-span-2 max-sm:mt-0 max-sm:gap-x-4 max-sm:gap-y-1 max-sm:border-t max-sm:border-slate-200/70 max-sm:pt-3 max-sm:text-xs max-sm:leading-6">
  {broker.founded_year && (
    <span>
      سنة التأسيس:{" "}
      <span className="font-bold text-slate-900">
        {broker.founded_year}
      </span>
    </span>
  )}

  {broker.headquarters && (
    <span>
      المقر:{" "}
      <span className="font-bold text-slate-900">
        {broker.headquarters}
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

    <span>آخر تحديث:</span>

    <time dateTime="2026-09" className="font-bold text-slate-900">
  سبتمبر 2026
</time>
  </span>

  <Link
    href="/how-we-review-brokers"
    target="_blank"
    rel="noopener noreferrer"
    className="font-bold text-brand-600 underline underline-offset-4 max-sm:flex max-sm:min-h-[32px] max-sm:w-full max-sm:items-center max-sm:text-[11px]"
  >
    منهجية المراجعة ↗
  </Link>
</div>
        </div>
      </div>
    </div>
  </section>

  {/* Desktop Section Navigation */}
<nav
  aria-label="أقسام تقييم الشركة"
  className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block"
>
  <div className="flex flex-wrap items-center justify-center gap-2 p-3">
    {[
  { label: "الخلاصة السريعة", href: "#broker-summary" },
  { label: "درجات التقييم", href: "#scores" },
  { label: "الحسابات", href: "#accounts" },
  { label: "التراخيص والأمان", href: "#licenses" },
  { label: "الرسوم", href: "#fees" },
  { label: "الإيداع والسحب", href: "#deposit-withdrawal" },
  { label: "المنصات", href: "#platforms" },
  { label: "الحكم النهائي", href: "#verdict" },
  { label: "الأسئلة الشائعة", href: "#faq" },
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

{/* Review Summary and Decision Panel */}

  {/* Review Summary and Decision Panel */}
<section
  id="broker-summary"
  aria-labelledby="broker-summary-title"
  className="scroll-mt-24 overflow-hidden rounded-[24px] border border-slate-200 bg-white md:rounded-[28px] max-sm:rounded-[22px]"
>
  <div className="p-5 sm:p-7 lg:p-8 max-sm:p-3">
    <div className="grid min-w-0 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_330px] xl:gap-10 max-sm:gap-5">

      {/* Introduction, Strengths and Suitability */}
      <div className="min-w-0">
        <p className="text-[13px] font-bold text-brand-600 max-sm:text-xs">
          خلاصة المراجعة
        </p>

        <h2
          id="broker-summary-title"
          className="mt-2 text-[26px] font-black leading-tight text-slate-950 sm:text-[32px] max-sm:mt-1.5 max-sm:text-[22px] max-sm:leading-[1.4]"
        >
          نظرة عامة على <bdi>{broker.name}</bdi>
        </h2>

       <div className="mt-5 text-[15px] font-medium leading-8 text-slate-700 sm:text-base lg:min-h-[204px] max-sm:mt-3 max-sm:text-[14px] max-sm:leading-6 max-sm:break-words">
  <input
    id="broker-overview-toggle"
    type="checkbox"
    aria-label="عرض المقدمة كاملة"
    aria-controls="broker-overview-text"
    className="peer sr-only sm:hidden"
  />

  <div
    id="broker-overview-text"
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
    htmlFor="broker-overview-toggle"
    className="mt-2 hidden min-h-[44px] w-fit cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-bold text-brand-600 transition hover:bg-blue-50 max-sm:inline-flex peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-500 peer-checked:[&_.overview-more]:hidden peer-checked:[&_.overview-less]:inline peer-checked:[&_.overview-arrow]:rotate-180"
  >
    <span className="overview-more">عرض المزيد</span>
    <span className="overview-less hidden">عرض أقل</span>

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
        {(broker.key_strength_ar || broker.key_weakness_ar) && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 max-sm:mt-4 max-sm:gap-2.5">
            {broker.key_strength_ar && (
              <div className="min-w-0 rounded-[18px] border border-emerald-100 bg-emerald-50/50 p-5 max-sm:rounded-2xl max-sm:p-3.5">
                <div className="flex items-center gap-2.5 max-sm:gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700 max-sm:h-6 max-sm:w-6 max-sm:text-xs"
                  >
                    ✓
                  </span>

                  <h3 className="text-sm font-extrabold text-emerald-900 max-sm:text-[13px]">
                    أبرز نقطة قوة
                  </h3>
                </div>

                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-800 max-sm:mt-2 max-sm:text-[13px] max-sm:leading-6">
                  {broker.key_strength_ar}
                </p>
              </div>
            )}

            {broker.key_weakness_ar && (
              <div className="min-w-0 rounded-[18px] border border-amber-100 bg-amber-50/50 p-5 max-sm:rounded-2xl max-sm:p-3.5">
                <div className="flex items-center gap-2.5 max-sm:gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-700 max-sm:h-6 max-sm:w-6 max-sm:text-xs"
                  >
                    !
                  </span>

                  <h3 className="text-sm font-extrabold text-amber-900 max-sm:text-[13px]">
                    أهم ما ينبغي مراجعته
                  </h3>
                </div>

                <p className="mt-3 text-[15px] font-medium leading-7 text-slate-800 max-sm:mt-2 max-sm:text-[13px] max-sm:leading-6">
                  {broker.key_weakness_ar}
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
                  لمن تناسب أكثر؟
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
                  قد لا تناسب الفئات التالية
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
        aria-label={`تقييم ومعلومات ${broker.name}`}
        className="min-w-0 self-start overflow-visible rounded-[22px] border border-slate-200 bg-white shadow-sm max-sm:order-first max-sm:rounded-[18px]"
      >
        {/* Score */}
        <div className="bg-gradient-to-bl from-blue-50 to-slate-50 p-5 sm:p-6 max-sm:grid max-sm:grid-cols-2 max-sm:items-center max-sm:gap-x-3 max-sm:gap-y-3 max-sm:rounded-t-[18px] max-sm:p-4">
          <div className="flex items-center justify-between gap-3 max-sm:col-span-2">
            <h3 className="text-[13px] font-bold text-slate-700">
              تقييم بروكر العرب
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
  تفاصيل التقييم
</a>
        </div>

        {/* Facts */}
        <div className="px-5 sm:px-6 max-sm:px-4">
          <dl className="divide-y divide-slate-200">
            <div className="flex items-center justify-between gap-3 py-4 max-sm:min-h-[44px] max-sm:py-2.5">
              <dt className="text-[13px] font-medium text-slate-600 max-sm:text-xs">
                الحد الأدنى للإيداع
              </dt>

              <dd className="text-xl font-black text-slate-950 max-sm:text-lg">
                {broker.min_deposit !== null &&
                broker.min_deposit !== undefined &&
                String(broker.min_deposit).trim() !== ""
                  ? formatMoney(broker.min_deposit)
                  : "غير محدد"}
              </dd>
            </div>

            <div className="py-4 max-sm:py-2.5">
              <div className="flex items-center justify-between gap-3 max-sm:min-h-6">
                <dt className="flex items-center gap-2 text-[13px] font-medium text-slate-600 max-sm:gap-1.5 max-sm:text-xs">
                  <span>أقصى رافعة مالية</span>

                  {broker.max_leverage_note_ar?.trim() && (
                    <span className="group relative inline-flex shrink-0">
                      <button
                        type="button"
                        aria-label="توضيح حدود الرافعة المالية"
                        aria-describedby="max-leverage-note"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[13px] font-extrabold text-brand-600 transition hover:border-blue-200 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                      >
                        <span aria-hidden="true">؟</span>
                      </button>

                      <span
                        id="max-leverage-note"
                        role="tooltip"
                        className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 w-[200px] max-w-[70vw] -translate-x-1/2 pb-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                      >
                        <span className="relative block rounded-xl border border-slate-200 bg-slate-900 px-4 py-3 text-right text-xs font-medium leading-6 text-white shadow-lg">
                          {broker.max_leverage_note_ar.trim()}

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
                  {broker.slug === "capital-com" && broker.max_leverage
                    ? `حتى ${broker.max_leverage}`
                    : broker.max_leverage || "—"}
                </dd>
              </div>
            </div>

            {broker.arabic_support && (
              <div className="flex items-center justify-between gap-3 py-4 max-sm:min-h-[44px] max-sm:py-2.5">
                <dt className="text-[13px] font-medium text-slate-600 max-sm:text-xs">
                  الدعم العربي
                </dt>

                <dd className="text-sm font-bold text-slate-900">
                  {broker.arabic_support === "Yes"
                    ? "نعم"
                    : broker.arabic_support === "No"
                    ? "لا"
                    : broker.arabic_support}
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
      className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-600 max-sm:min-h-[46px] max-sm:px-3 max-sm:py-2.5 max-sm:text-center"
    >
      <span className="min-w-0">
        فتح حساب مع <bdi>{broker.name}</bdi>
      </span>

      <span aria-hidden="true" className="shrink-0">
        ↗
      </span>
    </a>

    <a
      href={`/go/${broker.slug}?type=demo`}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 max-sm:min-h-[44px] max-sm:py-2.5 max-sm:text-center"
    >
      فتح حساب تجريبي
    </a>

    {openAccountGuide && (
      <Link
        href={`/brokers/${broker.slug}/open-account`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-center text-[13px] font-bold text-brand-600 transition hover:bg-blue-100"
      >
        <span className="min-w-0">
          دليل فتح الحساب بالصور
        </span>

        <span aria-hidden="true" className="shrink-0">
          ↗
        </span>
      </Link>
    )}
  </div>

  <p className="mt-4 text-xs font-medium leading-6 text-slate-600 max-sm:mt-3 max-sm:text-[11px] max-sm:leading-5">
    تختلف الشروط والحماية حسب بلد الإقامة والكيان الذي يُفتح
    الحساب لديه. راجع التفاصيل قبل التسجيل.
    </p>
</div>
</aside>

{/* Section Navigation */}
<nav
  aria-label="أقسام تقييم الشركة"
  className="relative order-[-1] -mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white md:hidden"
>
  <div className="flex gap-2 overflow-x-auto overscroll-x-contain p-3 max-sm:gap-2 max-sm:py-2 max-sm:pl-9 max-sm:pr-2 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden">
    {[
  { label: "الخلاصة السريعة", href: "#broker-summary" },
  { label: "درجات التقييم", href: "#scores" },
  { label: "الحسابات", href: "#accounts" },
  { label: "التراخيص والأمان", href: "#licenses" },
  { label: "الرسوم", href: "#fees" },
  { label: "الإيداع والسحب", href: "#deposit-withdrawal" },
  { label: "المنصات", href: "#platforms" },
  { label: "الحكم النهائي", href: "#verdict" },
  { label: "الأسئلة الشائعة", href: "#faq" },
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
    className="pointer-events-none absolute inset-y-0 left-0 hidden w-8 items-center justify-center bg-gradient-to-r from-white via-white/95 to-transparent text-lg text-slate-400 max-sm:flex"
  >
    ‹
  </span>
</nav>

</div>

    {/* Account Types: Compact Full-Width Row */}
    {accountsData.some((account) => account.account_name?.trim()) && (
      <div className="mt-6 border-t border-slate-200 pt-5 max-sm:mt-4 max-sm:pt-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-2.5">
          <h3 className="text-sm font-extrabold text-slate-950">
            أنواع الحسابات
          </h3>

          <div className="flex min-w-0 flex-wrap gap-2 max-sm:grid max-sm:grid-cols-2 max-sm:[&>a:last-child:nth-child(odd)]:col-span-2 max-sm:[&>a:last-child:nth-child(odd)]:justify-self-center max-sm:[&>a:last-child:nth-child(odd)]:w-[calc((100%-0.5rem)/2)]">
  {Array.from(
    new Set(
      accountsData
        .map((account) => account.account_name?.trim())
        .filter((name): name is string => Boolean(name))
    )
  ).map((name) => (
    <a
      key={name}
      href="#accounts"
      className="inline-flex max-w-full items-center rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-[12px] font-bold leading-6 text-slate-800 transition hover:border-blue-300 hover:bg-blue-100 max-sm:min-h-[44px] max-sm:min-w-0 max-sm:justify-center max-sm:px-2 max-sm:text-center max-sm:leading-5"
    >
      <bdi className="break-words">{name}</bdi>
    </a>
  ))}
</div>

          <a
            href="#accounts"
            className="text-[13px] font-bold text-brand-600 hover:underline sm:ms-auto max-sm:flex max-sm:min-h-[44px] max-sm:items-center max-sm:justify-between max-sm:rounded-lg max-sm:bg-slate-50 max-sm:px-3"
          >
            مقارنة الحسابات والتكاليف ↗
          </a>
        </div>

        {broker.slug === "capital-com" && (
          <p className="mt-3 rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-[13px] font-medium leading-7 text-slate-600 max-sm:px-3 max-sm:text-xs max-sm:leading-6">
            تختلف الحسابات المتاحة حسب بلد الإقامة والكيان التنظيمي.
            يتوفر <bdi>Swap-Free</bdi> فقط لدى كيانات <bdi>SCB</bdi>{" "}
            و<bdi>CMA</bdi>، وحسابا <bdi>Spread Betting</bdi>{" "}
            و<bdi>1X</bdi> لعملاء المملكة المتحدة فقط.
          </p>
        )}
      </div>
    )}

    {/* Editorial Insight: Full Width */}
    {broker.expert_insight_ar && (
      <details className="group mt-5 border-t border-slate-200 max-sm:mt-4">
        <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-bold text-slate-800 [&::-webkit-details-marker]:hidden max-sm:min-h-[48px] max-sm:gap-3 max-sm:py-3 max-sm:text-[13px]">
          <span className="max-sm:min-w-0 max-sm:leading-6">
            رؤية بروكر العرب حول <bdi>{broker.name}</bdi>
          </span>

          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-brand-600 transition-transform group-open:rotate-45 max-sm:h-6 max-sm:w-6"
          >
            +
          </span>
        </summary>

        <div className="space-y-3 pb-2 text-[15px] font-medium leading-8 text-slate-700 sm:text-base max-sm:text-sm max-sm:leading-6 max-sm:break-words">
          {broker.expert_insight_ar
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

  {/* Platforms and Regulatory Context */}
  <section
  aria-label="منصات الشركة والجهات الرقابية"
  className="grid overflow-hidden rounded-[20px] border border-slate-200 bg-white lg:grid-cols-2 max-sm:hidden"
>
    <div className="min-w-0 p-5 sm:p-6 max-sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 max-sm:gap-2">
        <h2 className="text-sm font-extrabold text-slate-900">
          منصات التداول
        </h2>

        <a
          href="#platforms"
          className="text-xs font-bold text-brand-600 max-sm:inline-flex max-sm:min-h-[44px] max-sm:items-center"
        >
          تفاصيل المنصات
        </a>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 max-sm:mt-1">
        {availablePlatforms.length ? (
          availablePlatforms.map((platform, index) => (
            <span
              key={index}
              dir="auto"
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-[13px] font-bold text-slate-800 max-sm:max-w-full max-sm:break-words max-sm:text-xs max-sm:leading-5"
            >
              {platform}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-600">
            غير محدد
          </span>
        )}
      </div>

      {(broker.mt4_download_url || broker.mt5_download_url) && (
        <div className="mt-4 flex flex-wrap gap-4 text-[13px] font-bold max-sm:mt-3 max-sm:gap-2">
          {broker.mt4_download_url && (
            <a
              href={`/go/${broker.slug}?type=mt4`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="text-brand-600 underline underline-offset-4 max-sm:inline-flex max-sm:min-h-[44px] max-sm:flex-1 max-sm:items-center max-sm:justify-center max-sm:rounded-lg max-sm:border max-sm:border-blue-100 max-sm:bg-blue-50/50 max-sm:px-3 max-sm:text-xs max-sm:no-underline"
            >
              تحميل MT4 ↗
            </a>
          )}

          {broker.mt5_download_url && (
            <a
              href={`/go/${broker.slug}?type=mt5`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="text-brand-600 underline underline-offset-4 max-sm:inline-flex max-sm:min-h-[44px] max-sm:flex-1 max-sm:items-center max-sm:justify-center max-sm:rounded-lg max-sm:border max-sm:border-blue-100 max-sm:bg-blue-50/50 max-sm:px-3 max-sm:text-xs max-sm:no-underline"
            >
              تحميل MT5 ↗
            </a>
          )}
        </div>
      )}
    </div>

    <div className="min-w-0 border-t border-slate-200 p-5 sm:p-6 lg:border-t-0 lg:border-r max-sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 max-sm:gap-x-2 max-sm:gap-y-0">
        <h2 className="text-sm font-extrabold text-slate-900">
          الجهات الرقابية للمجموعة
        </h2>

        <a
          href="#licenses"
          className="text-xs font-bold text-brand-600 max-sm:inline-flex max-sm:min-h-[44px] max-sm:items-center"
        >
          الكيانات وأرقام التراخيص
        </a>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 max-sm:mt-2">
        {regulationItems.length ? (
          regulationItems.map((item, index) => (
            <span
              key={index}
              dir="auto"
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-[13px] font-bold text-slate-800 max-sm:max-w-full max-sm:break-words max-sm:text-xs max-sm:leading-5"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-600">
            غير محدد
          </span>
        )}
      </div>

      <p className="mt-3 text-xs font-medium leading-6 text-slate-600 max-sm:rounded-xl max-sm:bg-slate-50 max-sm:px-3 max-sm:py-2.5 max-sm:text-[11px] max-sm:leading-5">
        تراخيص المجموعة لا تعني أن كل عميل يستفيد من حماية كل جهة؛
        الحماية تعتمد على الكيان الذي يُفتح الحساب لديه.
      </p>
    </div>
  </section>
</div>

  
        <div className="mt-4 grid min-w-0 gap-6 md:mt-6 md:gap-8">
  <div className="min-w-0 space-y-8">

   <SectionCard
  title="التقييم حسب المعايير"
  id="scores"
>
  <p className="mb-4 text-[13px] font-medium leading-6 text-slate-600 md:mb-5 md:text-sm md:leading-7">
    <span className="sm:hidden">
      تقييم كل معيار من أصل 5.
    </span>

    <span className="hidden sm:inline">
      تقييم <bdi>{broker.name}</bdi> في جوانب الأمان والتكاليف
      والمنصات والإيداع والسحب ودعم العملاء، من أصل 5 لكل معيار.
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
      label="الأمان والتراخيص"
      value={broker.score_safety}
    />

    <ScoreBar
      label="الرسوم والسبريد"
      value={broker.score_fees}
    />

    <ScoreBar
      label="منصات التداول"
      value={broker.score_platforms}
    />

    <ScoreBar
      label="الإيداع والسحب"
      value={broker.score_deposit}
    />

    <ScoreBar
      label="دعم العملاء"
      value={broker.score_support}
    />
  </div>

  <Link
    href="/how-we-review-brokers"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-3 inline-flex min-h-[44px] items-center text-xs font-bold text-brand-600 underline underline-offset-4 max-sm:mt-1"
  >
    كيف نحتسب التقييم؟ ↗
  </Link>
</SectionCard>

   {/* Broker Pros and Cons */}
<div className="grid items-start gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-6">
  {/* Pros */}
  <section
    aria-labelledby="broker-pros-title"
    className="overflow-hidden rounded-[22px] border border-slate-200 bg-white md:rounded-[26px]"
  >
    <div className="border-b border-slate-200 bg-emerald-50/40 px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="broker-pros-title"
          className="text-lg font-extrabold text-slate-950 md:text-[22px]"
        >
          أبرز المميزات
        </h2>

        <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 px-2 text-xs font-extrabold text-emerald-800 md:h-8 md:min-w-8">
          {pros.length}
        </span>
      </div>

      <p className="mt-1.5 hidden text-[13px] leading-6 text-slate-600 md:block">
        أهم نقاط القوة لدى <bdi>{broker.name}</bdi>.
      </p>
    </div>

    <div className="px-4 md:px-6">
      {pros.length ? (
        <ul className="divide-y divide-slate-100">
          {pros.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 py-3 text-right md:gap-3 md:py-4"
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
          لا توجد بيانات متاحة حاليًا.
        </p>
      )}
    </div>
  </section>

  {/* Cons */}
  <section
    aria-labelledby="broker-cons-title"
    className="overflow-hidden rounded-[22px] border border-slate-200 bg-white md:rounded-[26px]"
  >
    <div className="border-b border-slate-200 bg-rose-50/40 px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="broker-cons-title"
          className="text-lg font-extrabold text-slate-950 md:text-[22px]"
        >
          أبرز العيوب
        </h2>

        <span className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 px-2 text-xs font-extrabold text-rose-800 md:h-8 md:min-w-8">
          {cons.length}
        </span>
      </div>

      <p className="mt-1.5 hidden text-[13px] leading-6 text-slate-600 md:block">
        أهم القيود التي ينبغي معرفتها قبل اختيار الشركة.
      </p>
    </div>

    <div className="px-4 md:px-6">
      {cons.length ? (
        <ul className="divide-y divide-slate-100">
          {cons.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 py-3 text-right md:gap-3 md:py-4"
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
          لا توجد بيانات متاحة حاليًا.
        </p>
      )}
    </div>
  </section>
</div>

{/* Account Types */}
<section
  id="accounts"
  aria-labelledby="accounts-section-title"
  className="scroll-mt-24 rounded-[24px] border border-slate-200 bg-white p-4 md:rounded-[28px] md:p-7 lg:p-8"
>
  {/* Account Section Header */}
<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
  <div className="min-w-0 flex-1">
    <h2
  id="accounts-section-title"
  className="text-[22px] font-extrabold leading-8 text-slate-950 md:text-2xl"
>
 {isNaga ? (
  <>
    حساب التداول ومستويات VIP لدى <bdi>{broker.name}</bdi>
  </>
) : (
  <>
    أنواع حسابات <bdi>{broker.name}</bdi>
  </>
)}
</h2>

    <p className="mt-2 text-base font-medium leading-7 text-slate-600 md:text-[17px] md:leading-8">
  <span className="md:hidden">
    قارن الحسابات واضغط على اسم الحساب للمزيد.
  </span>
  <span className="hidden md:inline">
    قارن شروط الحسابات وافتح صفحة الحساب للاطلاع على تفاصيله.
  </span>
</p>
  </div>

  <dl className="grid shrink-0 grid-cols-2 divide-x divide-x-reverse divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/70 py-3 text-center lg:min-w-[230px]">
  <div className="flex min-w-0 flex-col items-center justify-center gap-1 px-3">
    <dt className="text-sm font-medium leading-6 text-slate-600">
      عدد الحسابات
    </dt>
    <dd className="text-xl font-extrabold leading-7 text-slate-950">
      {accountCount || "—"}
    </dd>
  </div>

  <div className="flex min-w-0 flex-col items-center justify-center gap-1 px-3">
    <dt className="text-sm font-medium leading-6 text-slate-600">
      أقل إيداع
    </dt>
    <dd className="break-words text-xl font-extrabold leading-7 text-slate-950">
      <bdi>
        {lowestDeposit?.raw ||
          (broker.min_deposit !== null &&
          broker.min_deposit !== undefined &&
          String(broker.min_deposit).trim() !== ""
            ? formatMoney(broker.min_deposit)
            : "غير محدد")}
      </bdi>
    </dd>
  </div>
</dl>
</div>


  {/* Accounts Introduction from Supabase */}
{broker.accounts_intro_ar?.trim() && (
  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-right md:mt-5 md:px-5 md:py-4">
    <p className="mb-1 text-[15px] font-bold leading-7 text-slate-950 md:text-base">
      معلومات عن توفر الحسابات
    </p>

    <p className="whitespace-pre-line break-words text-base font-medium leading-7 text-slate-600 md:leading-8">
      {broker.accounts_intro_ar.trim()}
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
  <span className="text-right">نوع الحساب</span>
  <span>السبريد</span>
  <span>العمولة</span>
  <span>أقل إيداع</span>
  <span>نوع التنفيذ</span>
</div>

  {visibleAccounts.length ? (
  visibleAccounts.map((acc) => (
      <article
  key={acc.id}
  className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-1 rounded-[16px] border border-slate-200 bg-white px-3.5 py-2.5 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_minmax(0,1.2fr)] md:items-center md:gap-3 md:rounded-none md:border-0 md:border-t md:border-slate-100 md:px-4 md:py-4 md:[&>dl]:!text-center md:[&_dd]:!mt-0 md:[&_dd]:!text-center md:[&_dd]:!text-sm md:[&_dd]:!leading-6"
>
        {/* Mobile Expansion Control */}
        <input
          id={`account-toggle-${acc.id}`}
          type="checkbox"
          aria-label={`عرض المزيد من شروط حساب ${acc.account_name || ""}`}
          aria-controls={`account-commission-${acc.id} account-execution-${acc.id} account-page-${acc.id}`}
          className="peer sr-only md:hidden"
        />

        {/* Account Heading */}
        <div className="order-1 col-span-2 min-w-0 peer-checked:[&_.account-chevron]:rotate-180 peer-checked:[&_.account-best-for]:block peer-focus-visible:[&_.account-toggle-label]:outline peer-focus-visible:[&_.account-toggle-label]:outline-2 peer-focus-visible:[&_.account-toggle-label]:outline-brand-500 md:order-none md:col-span-1">
          <h3>
            {/* Mobile: Expand the Card */}
            <label
              htmlFor={`account-toggle-${acc.id}`}
              className="account-toggle-label flex min-h-[44px] cursor-pointer items-center justify-between gap-3 rounded-lg text-base font-bold leading-6 text-brand-600 md:hidden"
            >
              <bdi className="min-w-0 break-words">
                {acc.account_name || "غير محدد"}
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

            {/* Desktop: Open the Account Page */}
            <Link
  href={withPreview(
    `/brokers/${broker.slug}/accounts/${accountSlug(
      acc.account_name
    )}`,
    previewToken
  )}
  className="hidden items-center gap-1.5 rounded-md text-sm font-extrabold leading-5 text-brand-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:inline-flex"
>
  <bdi className="min-w-0 break-words">
    {acc.account_name || "غير محدد"}
  </bdi>
  <span aria-hidden="true" className="shrink-0">
    ↗
  </span>
</Link>
          </h3>

          {acc.best_for && (
  <p className="account-best-for mb-2 mt-1 hidden rounded-lg bg-slate-50 px-3 py-2 text-[15px] font-medium leading-7 text-slate-600 md:mb-0 md:mt-1 md:block md:rounded-none md:bg-transparent md:p-0 md:text-sm md:leading-6 md:!mt-1 md:!mb-0 md:!bg-transparent md:!p-0 md:!text-sm md:!font-normal md:!leading-6">
    {acc.best_for}
  </p>
)}
        </div>

        {/* Spread: Always Visible */}
<dl className="order-2 flex min-w-0 flex-wrap items-baseline gap-x-1.5 md:order-none md:block">
  <dt className="text-sm font-medium leading-6 text-slate-500 md:sr-only">
    السبريد:
  </dt>
  <dd className="min-w-0 break-words text-sm font-semibold leading-6 text-slate-900 md:text-base md:leading-7">
    <bdi>{acc.spread || "غير محدد"}</bdi>
  </dd>
</dl>

        {/* Commission: Visible When Expanded on Mobile */}
<dl
  id={`account-commission-${acc.id}`}
  className="order-4 col-span-2 mt-2 hidden min-w-0 items-start justify-between gap-4 border-t border-slate-100 pt-3 peer-checked:flex md:order-none md:col-span-1 md:mt-0 md:block md:border-0 md:pt-0"
>
  <dt className="shrink-0 text-[15px] font-medium leading-7 text-slate-500 md:sr-only">
    العمولة
  </dt>
  <dd className="min-w-0 break-words text-left text-base font-bold leading-7 text-slate-900 md:text-right">
    <bdi>{acc.commission || "غير محدد"}</bdi>
  </dd>
</dl>

        {/* Deposit: Always Visible */}
<dl className="order-3 flex min-w-0 flex-wrap items-baseline justify-end gap-x-1.5 md:order-none md:block">
  <dt className="text-sm font-medium leading-6 text-slate-500 md:sr-only">
    الإيداع:
  </dt>
  <dd className="min-w-0 break-words text-sm font-semibold leading-6 text-slate-900 md:text-base md:leading-7">
    <bdi>{acc.min_deposit || "غير محدد"}</bdi>
  </dd>
</dl>

        {/* Execution: Visible When Expanded on Mobile */}
<dl
  id={`account-execution-${acc.id}`}
  className="order-5 col-span-2 hidden min-w-0 items-start justify-between gap-4 border-t border-slate-100 py-3 peer-checked:flex md:order-none md:col-span-1 md:block md:border-0 md:py-0"
>
  <dt className="shrink-0 text-[15px] font-medium leading-7 text-slate-500 md:sr-only">
    نوع التنفيذ
  </dt>
  <dd className="min-w-0 break-words text-left text-base font-medium leading-7 text-slate-700 md:text-right">
    <bdi>{acc.execution_type || "غير محدد"}</bdi>
  </dd>
</dl>

        {/* Mobile Account Page Link */}
        <div
          id={`account-page-${acc.id}`}
          className="order-6 col-span-2 hidden pb-1 pt-1 peer-checked:block md:!hidden"
        >
          <Link
            href={withPreview(
              `/brokers/${broker.slug}/accounts/${accountSlug(
                acc.account_name
              )}`,
              previewToken
            )}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 text-base font-bold text-brand-600 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            تفاصيل الحساب
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </article>
    ))
  ) : (
    <p className="p-5 text-center text-base leading-7 text-slate-500">
      لا توجد بيانات حسابات متاحة حاليًا.
    </p>
  )}
</div>

{isNaga && (
  <div
    id="naga-vip-levels"
    dir="rtl"
    className="mt-6 border-t border-slate-200 pt-5 md:pt-6"
  >
    <div className="rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-4 md:px-5 md:py-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold leading-8 text-slate-950 md:text-2xl">
            مستويات NAGA VIP
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-700 md:text-base md:leading-7">
            مستويات VIP ليست أنواع حسابات تداول مستقلة. تعتمد على نقاط المستخدم
            وتمنح مزايا مختلفة في التسعير ونسخ التداول والخدمات الإضافية.
          </p>
        </div>

        <span className="inline-flex w-fit shrink-0 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-[11px] font-bold text-brand-700">
          <bdi>VIP User Levels</bdi>
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
              <bdi>{level.nameAr}</bdi>
            </h4>

            <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-brand-700">
              <bdi>{level.points}</bdi>
            </span>
          </div>

          <dl className="mt-2 divide-y divide-slate-200 text-[13px] leading-6 text-slate-700 md:text-sm">
            <div className="py-2">
              <dt className="font-extrabold text-slate-950">
                فروقات الأسعار
              </dt>
              <dd className="mt-0.5">
                {level.spreadAr}
              </dd>
            </div>

            <div className="py-2">
              <dt className="font-extrabold text-slate-950">
                مزايا Copy Trading
              </dt>
              <dd className="mt-0.5">
                {level.copyAr}
              </dd>
            </div>

            <div className="py-2">
              <dt className="font-extrabold text-slate-950">
                رسوم السحب
              </dt>
              <dd className="mt-0.5">
                <bdi>$0</bdi> بحسب جدول VIP المنشور، وقد يفرض البنك أو مزود الدفع رسومًا إضافية.
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>

    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-6 text-slate-700 md:text-sm md:leading-7">
      مستويات VIP لا تمثل حدًا أدنى للإيداع ولا أنواع حسابات منفصلة. الحد الأدنى
      الأول للإيداع يخص حساب NAGA العام، بينما تختلف المنتجات والرسوم وفروقات
      الأسعار حسب الكيان التنظيمي وبلد العميل والأداة المالية.
    </div>
  </div>
)}

  {/* Account Availability Note from Supabase */}
{broker.account_availability_note_ar?.trim() && (
  <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-4 md:px-5">
    <p className="text-[15px] leading-7 text-slate-700 md:text-base">
      {(() => {
        const note = broker.account_availability_note_ar?.trim() ?? "";
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
      راجع شروط الحساب وتكاليفه قبل التسجيل.
    </p>

    <a
      href={`/go/${broker.slug}?type=real`}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-base font-extrabold text-white transition hover:bg-brand-600 md:shrink-0"
    >
      <span>
        فتح حساب مع <bdi>{broker.name}</bdi>
      </span>
      <span aria-hidden="true" className="shrink-0">
        ↗
      </span>
    </a>
  </div>
</section>


{/* Licenses and Safety */}
{brokerLicenses.length > 0 ? (
  <BrokerLicensesSection
    brokerName={broker.name}
    licenses={brokerLicenses}
    regulationSummary={regulationSummary}
    fundProtection={fundProtection}
    safetyFactors={safetyFactors}
    regulationItems={regulationItems}
  />
) : (

<SectionCard
  title="التراخيص والأمان"
  subtitle={`الوضع التنظيمي وحماية أموال العملاء لدى ${broker.name}.`}
  id="licenses"
>
  <div
    dir="rtl"
    className="grid min-w-0 gap-5 text-right xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-0 xl:overflow-hidden xl:rounded-[24px] xl:border xl:border-slate-200"
  >
    {/* Regulatory Summary */}
    <div className="min-w-0 xl:order-2 xl:p-6">
      <h3 className="text-xl font-extrabold leading-8 text-slate-950 md:text-2xl">
        التنظيم وحماية المتداولين
      </h3>

      <div className="mt-3 space-y-3 text-base font-medium leading-7 text-slate-700 md:mt-4 md:space-y-4 md:leading-8">
        {(regulationSummary || "لا توجد بيانات متاحة حاليًا.")
          .split("||")
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
          .map((paragraph, i) => (
            <p
              key={i}
              className="whitespace-pre-line break-words text-right"
            >
              {paragraph}
            </p>
          ))}
      </div>

      {/* Safety Factors */}
      {safetyFactors.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-4 md:mt-5">
          <h4 className="text-base font-bold leading-7 text-slate-950">
            عوامل الأمان الرئيسية
          </h4>

          <ul className="mt-2 divide-y divide-slate-100 md:mt-3 md:grid md:grid-cols-2 md:gap-2 md:divide-y-0">
            {safetyFactors.map((item, i) => (
              <li
                key={i}
                className="flex min-w-0 items-start gap-2.5 py-2.5 md:rounded-xl md:border md:border-slate-200 md:bg-slate-50 md:px-3"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand-500"
                />
                <span className="min-w-0 break-words text-[15px] font-medium leading-7 text-slate-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Regulatory Bodies and Fund Protection */}
    <aside className="min-w-0 space-y-4 border-t border-slate-200 pt-4 xl:order-1 xl:space-y-5 xl:border-l xl:border-t-0 xl:bg-slate-50 xl:p-5">
      <div>
        <h3 className="text-base font-bold leading-7 text-slate-950">
          الجهات الرقابية
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {regulationBodies.length > 0 ? (
            regulationBodies.map((item, i) => (
              <span
                key={i}
                className="inline-flex max-w-full items-center rounded-lg border border-brand-100 bg-brand-50 px-3 py-1.5 text-sm font-bold leading-6 text-brand-600"
              >
                <bdi className="break-words">{item}</bdi>
              </span>
            ))
          ) : broker.regulation_short ? (
            <span className="inline-flex max-w-full items-center rounded-lg border border-brand-100 bg-brand-50 px-3 py-1.5 text-sm font-bold leading-6 text-brand-600">
              <bdi className="break-words">
                {broker.regulation_short}
              </bdi>
            </span>
          ) : (
            <p className="text-[15px] leading-7 text-slate-500">
              لا توجد بيانات متاحة حاليًا.
            </p>
          )}
        </div>
      </div>

      {fundProtection?.trim() && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 xl:bg-white">
          <h3 className="text-base font-bold leading-7 text-slate-950">
            حماية أموال العملاء
          </h3>

          <div className="mt-2 space-y-2">
            {fundProtection
              .split("||")
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, i) => (
                <p
                  key={i}
                  className="whitespace-pre-line break-words text-right text-[15px] font-medium leading-7 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      )}
    </aside>
  </div>
</SectionCard>
)}

{/* الرسوم وتكاليف التداول */}
<SectionCard
  title="الرسوم وتكاليف التداول"
  subtitle={`نظرة واضحة على السبريد والعمولات وأهم تكاليف التداول المحتملة لدى ${broker.name}.`}
  id="fees"
>
  <div
    dir="rtl"
    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
  >
    <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
      {/* ملخص التسعير */}
<div className="border-b border-slate-200 bg-slate-50/80 px-3.5 py-3 md:border-b-0 md:border-l md:p-4">
  <h3 className="hidden text-xs font-semibold leading-5 text-slate-500 md:block">
    ملخص التسعير
  </h3>

  <dl className="mt-2 divide-y divide-slate-200 md:mt-3">
    <div className="flex items-center justify-between gap-3 py-2 md:block md:pb-3 md:pt-0">
      <dt className="shrink-0 text-xs leading-5 text-slate-500">
        أقل سبريد
      </dt>

      <dd className="min-w-0 text-left text-[13px] font-bold leading-6 text-slate-950 md:mt-1 md:text-right md:text-sm">
        <bdi dir="ltr">
          {lowestSpread?.spread || broker.spreads || "—"}
        </bdi>
      </dd>
    </div>

    <div className="flex items-center justify-between gap-3 pb-0 pt-2 md:block md:pt-3">
      <dt className="shrink-0 text-xs leading-5 text-slate-500">
        هيكل العمولات
      </dt>

      <dd className="min-w-0 break-words text-left text-[13px] font-semibold leading-6 text-slate-950 md:mt-1 md:text-right">
        {broker.slug === "capital-com"
          ? "بدون عمولة تداول"
          : commissionAccounts.length === 1
            ? "حساب واحد بعمولة"
            : commissionAccounts.length === 2
              ? "حسابان بعمولة"
              : commissionAccounts.length > 2
                ? `${commissionAccounts.length} حسابات بعمولة`
                : "تتوفر حسابات بدون عمولة"}
      </dd>
    </div>
  </dl>
</div>

      {/* شرح الرسوم */}
      <div className="min-w-0 px-3.5 py-4 md:p-5">
        <h3 className="text-sm font-bold leading-6 text-slate-950 md:text-base">
          شرح رسوم التداول
        </h3>

                <details className="group mt-2.5">
          <summary className="list-none [&::-webkit-details-marker]:hidden">
            <div className="line-clamp-4 space-y-3 text-right text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] group-open:line-clamp-none md:line-clamp-none md:text-sm md:leading-7">
              {(() => {
                const text =
                  broker.fees ||
                  `تختلف تكاليف التداول لدى ${broker.name} بحسب نوع الحساب المختار، وقيمة السبريد، وهيكل العمولات، والأداة المالية التي يتم تداولها.`;

                const existingParagraphs = text
                  .split(/\r?\n+/)
                  .filter((paragraph) => paragraph.trim().length > 0);

                if (existingParagraphs.length > 1) {
                  return existingParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ));
                }

                const boundaries = Array.from(
                  text.matchAll(/[.!؟?](?=\s+\S)/g),
                  (match) => match.index! + match[0].length
                );

                if (text.length < 240 || boundaries.length === 0) {
                  return <p>{text}</p>;
                }

                const midpoint = text.length / 2;

                const splitAt = boundaries.reduce((closest, boundary) =>
                  Math.abs(boundary - midpoint) <
                  Math.abs(closest - midpoint)
                    ? boundary
                    : closest
                );

                return (
                  <>
                    <p>{text.slice(0, splitAt)}</p>
                    <p>{text.slice(splitAt)}</p>
                  </>
                );
              })()}
            </div>

            <span className="mt-1 inline-flex min-h-[44px] cursor-pointer items-center text-xs font-semibold text-brand-600 md:hidden">
              <span className="group-open:hidden">
                عرض المزيد +
              </span>

              <span className="hidden group-open:inline">
                عرض أقل −
              </span>
            </span>
          </summary>
        </details>
      </div>
    </div>
  </div>
</SectionCard>

{/* الإيداع والسحب */}
<SectionCard title="الإيداع والسحب" id="deposit-withdrawal">
  <div
    dir="rtl"
    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
  >
    <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
      {/* ملخص الإيداع والسحب */}
      <div className="border-b border-slate-200 bg-slate-50/80 px-3.5 py-3 md:border-b-0 md:border-l md:p-4">
        <h3 className="hidden text-xs font-semibold leading-5 text-slate-500 md:block">
          ملخص الإيداع والسحب
        </h3>

        <dl className="divide-y divide-slate-200 md:mt-3">
          <div className="flex items-center justify-between gap-3 pb-2 md:block md:pb-3">
            <dt className="shrink-0 text-xs leading-5 text-slate-500">
              طرق الدفع
            </dt>
            <dd className="min-w-0 text-left text-[13px] font-bold leading-6 text-slate-950 md:mt-1 md:text-right md:text-sm">
              {paymentMethods.length || "—"}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-3 py-2 md:block md:py-3">
            <dt className="shrink-0 text-xs leading-5 text-slate-500">
              أقل إيداع
            </dt>
            <dd className="min-w-0 text-left text-[13px] font-bold leading-6 text-slate-950 md:mt-1 md:text-right md:text-sm">
              <bdi dir="ltr">
                {formatMoney(broker.min_deposit)}
              </bdi>
            </dd>
          </div>

          <div className="flex items-center justify-between gap-3 py-2 md:block md:py-3">
            <dt className="shrink-0 text-xs leading-5 text-slate-500">
              تقييم الإيداع والسحب
            </dt>
            <dd className="min-w-0 text-left text-[13px] font-bold leading-6 text-slate-950 md:mt-1 md:text-right md:text-sm">
              <bdi dir="ltr">
                {broker.score_deposit ?? "—"} / 5
              </bdi>
            </dd>
          </div>

          <div className="pt-2 md:pt-3">
            <dt className="text-xs leading-5 text-slate-500">
              سرعة السحب
            </dt>
            <dd className="mt-1 break-words text-[13px] font-semibold leading-6 text-slate-950">
              {withdrawalSpeed || "لا توجد بيانات متاحة."}
            </dd>
          </div>
        </dl>
      </div>

      {/* تفاصيل الإيداع والسحب */}
      <div className="min-w-0 px-3.5 py-4 md:p-5">
        <h3 className="text-sm font-bold leading-6 text-slate-950 md:text-base">
          تفاصيل الإيداع والسحب
        </h3>

        <details className="group/deposit mt-2.5">
          <summary className="list-none rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
            <div className="line-clamp-4 space-y-3 text-right text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] group-open/deposit:line-clamp-none md:line-clamp-none md:text-sm md:leading-7">
              {(
                depositSummary ||
                "لا توجد معلومات كافية حاليًا حول الإيداع والسحب."
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
                عرض المزيد +
              </span>
              <span className="hidden group-open/deposit:inline">
                عرض أقل −
              </span>
            </span>
          </summary>
        </details>

        {/* طرق الدفع */}
        <div className="mt-4 border-t border-slate-100 pt-3 md:mt-5 md:pt-4">
          <h3 className="text-xs font-semibold leading-5 text-slate-500">
            طرق الدفع المتاحة
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
              لا توجد بيانات متاحة.
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</SectionCard>

{/* منصات التداول */}
<SectionCard
  title="منصات التداول"
  subtitle={`نظرة شاملة على منصات التداول التي تقدمها ${broker.name} وتجربة الاستخدام.`}
  id="platforms"
>
  {(() => {
    const platforms = availablePlatforms.length
      ? availablePlatforms
      : splitPipes(broker.platforms);

    const hasPlatform = (version: "4" | "5") =>
      platforms.some((item) =>
        new RegExp(`\\bMT\\s*${version}\\b|MetaTrader\\s*${version}\\b`, "i")
          .test(item)
      );

    const hasMT4 = hasPlatform("4");
    const hasMT5 = hasPlatform("5");

    return (
      <div
        dir="rtl"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
          {/* ملخص المنصات */}
          <div className="border-b border-slate-200 bg-slate-50/80 px-3.5 py-3 md:border-b-0 md:border-l md:p-4">
            <h3 className="hidden text-xs font-semibold leading-5 text-slate-500 md:block">
              الوصول إلى المنصات
            </h3>

            <dl className="divide-y divide-slate-200 md:mt-3">
              <div className="pb-3">
                <dt className="text-xs leading-5 text-slate-500">
                  المنصات المتاحة
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
                      لا توجد بيانات متاحة.
                    </span>
                  )}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 md:block md:pt-3">
                <dt className="shrink-0 text-xs leading-5 text-slate-500">
                  أدوات التداول
                </dt>

                <dd className="min-w-0 text-left text-[13px] font-semibold leading-6 text-slate-950 md:mt-1 md:text-right">
                  {platformTools.length
                    ? `${platformTools.length} أداة متاحة`
                    : "لا توجد بيانات"}
                </dd>
              </div>

              {broker.best_for && (
                <div className="mt-2 pt-2 md:mt-3 md:pt-3">
                  <dt className="text-xs leading-5 text-slate-500">
                    مناسبة لـ
                  </dt>

                  <dd className="mt-1 break-words text-[13px] font-semibold leading-6 text-slate-950">
                    {broker.best_for}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* تجربة المنصات */}
          <div className="min-w-0 px-3.5 py-4 md:p-5">
            <h3 className="text-sm font-bold leading-6 text-slate-950 md:text-base">
              تجربة منصات التداول
            </h3>

            <details className="group/platforms mt-2.5">
              <summary className="list-none rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
                <div className="line-clamp-4 space-y-3 text-right text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] group-open/platforms:line-clamp-none md:line-clamp-none md:text-sm md:leading-7">
                  {(
                    platformSummary ||
                    "لا توجد معلومات كافية حاليًا حول منصات التداول."
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
                    عرض المزيد +
                  </span>

                  <span className="hidden group-open/platforms:inline">
                    عرض أقل −
                  </span>
                </span>
              </summary>
            </details>

            {/* أدوات التداول */}
            {platformTools.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-3 md:mt-5 md:pt-4">
                <h3 className="text-xs font-semibold leading-5 text-slate-500">
                  أدوات التداول المتاحة
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

            {/* تحميل المنصات المتاحة */}
            {(hasMT4 || hasMT5) && (
              <div className="mt-4 border-t border-slate-100 pt-3 md:mt-5 md:pt-4">
                <h3 className="text-xs font-semibold leading-5 text-slate-500">
                  تحميل منصات MetaTrader
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  {hasMT4 && (
                    <a
                      href={`/go/${broker.slug}?type=mt4`}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-3 text-xs font-semibold text-brand-600 transition hover:bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:flex-none md:px-4"
                    >
                      تحميل MT4
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
                      تحميل MT5
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


{/* الخلاصة النهائية */}
<SectionCard title="الخلاصة النهائية" id="verdict">
  <div
    dir="rtl"
    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
  >
    {/* التقييم والحكم */}
    <div className="grid grid-cols-2 divide-x divide-x-reverse divide-slate-200 border-b border-slate-200 bg-slate-50/80 px-3.5 py-3 text-center md:px-5">
      <div className="min-w-0 pl-3">
        <div className="text-xs leading-5 text-slate-500">
          التقييم العام
        </div>

        <div className="mt-1 text-base font-bold leading-6 text-slate-950">
          <bdi dir="ltr">
            {overallScore || broker.rating || "—"}
          </bdi>
        </div>
      </div>

      <div className="min-w-0 pr-3">
        <div className="text-xs leading-5 text-slate-500">
          الحكم النهائي
        </div>

        <div className="mt-1 break-words text-sm font-bold leading-6 text-slate-950">
          {verdictTone.label}
        </div>
      </div>
    </div>

    <div className="min-w-0 px-3.5 py-4 md:p-5">
      {/* الخلاصة */}
      <h3 className="text-sm font-bold leading-6 text-slate-950 md:text-base">
        خلاصة تقييم {broker.name}
      </h3>

      <details className="group/verdict mt-2.5">
        <summary className="list-none rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
          <div className="line-clamp-4 space-y-3 text-right text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] group-open/verdict:line-clamp-none md:line-clamp-none md:text-sm md:leading-7">
            {(broker.final_verdict || "لا توجد بيانات متاحة حاليًا.")
              .split(/\|\||\r?\n+/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          <span className="mt-1 inline-flex min-h-[44px] cursor-pointer items-center text-xs font-semibold text-brand-600 md:hidden">
            <span className="group-open/verdict:hidden">
              عرض المزيد +
            </span>
            <span className="hidden group-open/verdict:inline">
              عرض أقل −
            </span>
          </span>
        </summary>
      </details>

      {/* القوة والملاحظة */}
      {(broker.key_strength_ar || broker.key_weakness_ar) && (
        <div
          className={`mt-3 grid gap-2 md:mt-4 md:gap-3 ${
            broker.key_strength_ar && broker.key_weakness_ar
              ? "md:grid-cols-2"
              : ""
          }`}
        >
          {broker.key_strength_ar && (
            <div className="min-w-0 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2.5">
              <h4 className="text-xs font-semibold leading-5 text-emerald-700">
                نقطة القوة
              </h4>

              <p className="mt-1 text-[13px] leading-6 text-slate-800 [overflow-wrap:anywhere]">
                {broker.key_strength_ar}
              </p>
            </div>
          )}

          {broker.key_weakness_ar && (
            <div className="min-w-0 rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-2.5">
              <h4 className="text-xs font-semibold leading-5 text-amber-700">
                أهم ملاحظة
              </h4>

              <p className="mt-1 text-[13px] leading-6 text-slate-800 [overflow-wrap:anywhere]">
                {broker.key_weakness_ar}
              </p>
            </div>
          )}
        </div>
      )}


      {/* روابط الحساب */}
      <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 md:flex-row md:items-center md:justify-center md:pt-4">
        <a
          href={`/go/${broker.slug}?type=real`}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          فتح حساب لدى {broker.name}
          <span aria-hidden="true">↗</span>
        </a>

        {openAccountGuide && (
          <Link
            href={`/brokers/${broker.slug}/open-account`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-brand-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            شرح فتح الحساب بالصور
          </Link>
        )}
      </div>
    </div>
  </div>
</SectionCard>

     {faqItems.length > 0 && (
  <SectionCard title="الأسئلة الشائعة" id="faq">
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
            <span className="min-w-0 flex-1 text-right text-[13px] font-semibold leading-6 text-slate-950 [overflow-wrap:anywhere] md:text-sm">
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
            <div className="space-y-2 text-right text-[13px] font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] md:text-sm md:leading-7">
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
        <div dir="rtl" className="space-y-2">
          {visibleFaqItems.map((item, index) =>
            renderFaq(item, `faq-${index}`)
          )}

          {extraFaqItems.length > 0 && (
            <details className="group/more">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-brand-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&::-webkit-details-marker]:hidden">
                <span className="group-open/more:hidden">
                  عرض المزيد من الأسئلة ({extraFaqItems.length})
                </span>

                <span className="hidden group-open/more:inline">
                  إخفاء الأسئلة الإضافية
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

        <div className="mb-2">
  <SectionCard
    title={`مقارنة ${broker.name || broker.name_en} مع شركات أخرى`}
  >
    {broker.slug && (
  <BrokerRelatedComparisons
    key={broker.slug}
    broker={{ ...broker, slug: broker.slug }}
    relatedBrokers={relatedBrokers.flatMap((item) =>
      item.slug
        ? [{ ...item, slug: item.slug }]
        : []
    )}
  />
)}
  </SectionCard>
</div>

{/* تحذير المخاطر — آخر محتوى قبل الفوتر */}
<div
  dir="rtl"
  className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-right md:px-4"
>
  <div className="flex items-center gap-2">
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-200 text-[11px] font-bold text-amber-700"
    >
      !
    </span>

    <h2 className="text-xs font-semibold leading-5 text-slate-700">
      تحذير المخاطر
    </h2>
  </div>

  <p className="mt-1.5 text-[11px] leading-5 text-slate-500 md:text-xs md:leading-6">
    المعلومات الواردة في هذه الصفحة مقدمة لأغراض تعليمية ومعلوماتية فقط،
    ولا تُعد نصيحة مالية أو استثمارية. لا يقدم بروكر العرب خدمات تداول مباشرة
    ولا يحتفظ بأموال العملاء. ينطوي تداول الفوركس وعقود الفروقات وغيرها من
    المنتجات ذات الرافعة المالية على مستوى مرتفع من المخاطر، وقد لا يكون
    مناسبًا لجميع المستثمرين. قد تخسر جزءًا من رأس المال المستثمر أو كامل
    رأس المال. كما قد تختلف شروط التداول والرافعة المالية ومستويات حماية
    المستثمر بحسب شركة الوساطة والكيان التنظيمي وبلد إقامة العميل.
  </p>
</div>

          </div>
        </div>
      </main>
    </>
  );
}