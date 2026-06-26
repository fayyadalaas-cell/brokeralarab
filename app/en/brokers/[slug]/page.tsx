import { createClient } from "@/lib/supabase/server";
import Script from "next/script";
import Link from "next/link";
import ShareButtons from "@/app/components/ShareButtons";


type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  best_for_en: string | null;
  intro_en: string | null;
  slug: string | null;
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
  meta_descr: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
  mt4_download_url: string | null;
  mt5_download_url: string | null;
  founded_year: string | null;
  headquarters: string | null;
  headquarters_en: string | null;
  max_leverage: string | null;
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

async function getBroker(slug: string): Promise<Broker | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return data as Broker | null;
}

async function getRelatedBrokers(currentSlug: string): Promise<RelatedBroker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
  .from("brokers")
  .select("id, name, name_en, slug, rating, logo")
  .neq("slug", currentSlug)
  .limit(3);

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

async function getBrokerLicenses(brokerId: number): Promise<BrokerLicense[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("broker_licenses")
    .select("*")
    .eq("broker_id", brokerId)
    .order("regulator_code", { ascending: true });

  if (error || !data) return [];

  return data as BrokerLicense[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const broker = await getBroker(slug);
  const siteUrl = "https://brokeralarab.com";

  if (!broker) {
    return {
      title: "Broker Review",
      description: "مراجعة شركات التداول",
    };
  }

  const title = broker.meta_title_en || broker.meta_title || `${broker.name} Review 2026 | Broker AlArab`;
  const description =
  broker.meta_description_en ||
  broker.meta_descr ||
  `Full review of ${broker.name} including fees, platforms, regulation, and account types.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
  canonical: `${siteUrl}/en/brokers/${broker.slug}`,
  languages: {
    ar: `${siteUrl}/brokers/${broker.slug}`,
    en: `${siteUrl}/en/brokers/${broker.slug}`,
    "x-default": `${siteUrl}/en/brokers/${broker.slug}`,
  },
},
    openGraph: {
  title,
  description,
  url: `${siteUrl}/en/brokers/${broker.slug}`,
  siteName: "Broker Al Arab",
  locale: "en_US",
  type: "article",
  images: [
  {
    url: `${siteUrl}/og-image.png`,
    width: 1560,
    height: 377,
    alt: `Review ${broker.name}`,
  },
],
},

twitter: {
  card: "summary_large_image",
  title,
  description,
  images: [`${siteUrl}/og-image.png`],
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
  return Number(avg.toFixed(1));
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
}: {
  accounts: BrokerAccount[];
  brokerSlug: string;
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
  href={`/en/brokers/${brokerSlug}/accounts/${accountSlug(acc.account_name)}`}
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

  const latestVerified = licenses
    .map((l) => l.last_verified)
    .filter(Boolean)
    .sort()
    .reverse()[0];

  const topLicense =
    licenses.find((l) => l.trust_level === "Tier 1") || licenses[0];

  const allActive = licenses.every((l) => l.status_code === "active");

  const statusLabel = (status: string | null) => {
    if (status === "active") return "Active";
    if (status === "expired") return "Expired";
    if (status === "revoked") return "Revoked";
    if (status === "pending") return "Pending";
    if (status === "suspended") return "Suspended";
    return "Unknown";
  };

  const stars = (tier: string | null) => {
    if (tier === "Tier 1") return "★★★★★";
    if (tier === "Tier 2") return "★★★★☆";
    if (tier === "Tier 3") return "★★★☆☆";
    return "★★★☆☆";
  };

  return (
    <SectionCard
      title={`${brokerName || "Broker"} Licenses & Regulation`}
      subtitle={`A detailed look at the regulators supervising ${
        brokerName || "this broker"
      }, including license numbers and official registry links.`}
      id="regulation"
    >
      <div className="mb-4 rounded-[22px] border border-slate-200 bg-white p-4 text-left shadow-sm md:mb-7 md:p-5">
  <h3 className="text-left text-xl font-black leading-7 text-slate-950 md:text-2xl">
    Regulation and Trader Protection
  </h3>

  <div className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
    {(regulationSummary || "")
      .split("||")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 1)
      .map((paragraph, i) => (
        <p key={i} className="text-justify">
          {paragraph}
        </p>
      ))}
  </div>

  {safetyFactors.length > 0 ? (
    <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:grid-cols-2">
      {safetyFactors.slice(0, 2).map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-black text-slate-800 md:bg-white md:px-4 md:py-3 md:text-sm"
        >
          <span>{item}</span>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
        </div>
      ))}
    </div>
  ) : null}
</div>

      <div className="grid gap-3 md:grid-cols-4">
        <MiniInfoCard label="Number of licenses" value={licenses.length} tone="blue" />
        <MiniInfoCard label="Top regulator" value={topLicense?.regulator_code || "-"} tone="emerald" />
        <MiniInfoCard label="Last verified" value={latestVerified || "-"} tone="amber" />
        <MiniInfoCard label="Status" value={allActive ? "All active" : "Review needed"} tone="violet" />
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600 md:hidden">
  License numbers, legal entities, and official verification links for {brokerName || "this broker"} where available.
</p>

<p className="mt-5 hidden text-sm leading-7 text-slate-600 md:block">
  The table below shows {brokerName || "this broker"}’s license numbers and legal entities linked to each regulator, with direct links to official registries where available.
</p>

      <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-black text-slate-600">
              <tr>
                <th className="px-4 py-4">Regulator</th>
                <th className="px-4 py-4">Country</th>
                <th className="px-4 py-4">License number</th>
                <th className="px-4 py-4">Legal entity</th>
                <th className="px-4 py-4">Status</th>
                <th className="w-[170px] px-4 py-4 text-center">Official registry</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {licenses.map((license) => (
                <tr key={license.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <div className="font-black text-slate-950">
                      {license.regulator_code}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {license.regulator_name_en}
                    </div>
                  </td>

                  <td className="px-4 py-4 font-bold text-slate-700">
                    {license.country_en || "-"}
                  </td>

                  <td className="px-4 py-4 font-black text-slate-950">
                    {license.license_number || "-"}
                  </td>

                  <td className="px-4 py-4 text-slate-700">
                    {license.entity_name_en || license.entity_name_ar || "-"}
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                      {statusLabel(license.status_code)}
                    </span>
                  </td>

                  <td className="w-[170px] px-4 py-4 text-center">
                    {license.verification_url_en || license.verification_url_ar ? (
                      <a
                        href={license.verification_url_en || license.verification_url_ar || "#"}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-black text-brand-600 transition hover:bg-brand-100"
                      >
                        View registry ↗
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">Not available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

<div className="mt-5 space-y-3 md:hidden">
  {licenses.slice(0, 3).map((license) => (
    <div
      key={`mobile-${license.id}`}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-black text-slate-950">
            {license.regulator_code}
          </div>
          <div className="mt-1 text-xs leading-5 text-slate-500">
            {license.regulator_name_en}
          </div>
        </div>

        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          {statusLabel(license.status_code)}
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-sm">
        <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
          <span className="text-slate-500">Country</span>
          <span className="font-black text-slate-900">{license.country_en || "-"}</span>
        </div>

        <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
          <span className="text-slate-500">License</span>
          <span className="font-black text-slate-900">{license.license_number || "-"}</span>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <div className="text-slate-500">Legal entity</div>
          <div className="mt-1 font-black text-slate-900">
            {license.entity_name_en || license.entity_name_ar || "-"}
          </div>
        </div>
      </div>

      {license.verification_url_en || license.verification_url_ar ? (
        <a
          href={license.verification_url_en || license.verification_url_ar || "#"}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-xl border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-black text-brand-600"
        >
          View official registry ↗
        </a>
      ) : null}
    </div>
   ))}

  {licenses.length > 3 ? (
    <details className="group">
      <summary className="cursor-pointer list-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-black text-brand-600">
        <span className="group-open:hidden">Show more licenses</span>
        <span className="hidden group-open:inline">Show less</span>
      </summary>

      <div className="mt-3 space-y-3">
        {licenses.slice(3).map((license) => (
          <div
            key={`mobile-extra-${license.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-black text-slate-950">
                  {license.regulator_code}
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-500">
                  {license.regulator_name_en}
                </div>
              </div>

              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                {statusLabel(license.status_code)}
              </span>
            </div>

            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
                <span className="text-slate-500">Country</span>
                <span className="font-black text-slate-900">{license.country_en || "-"}</span>
              </div>

              <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
                <span className="text-slate-500">License</span>
                <span className="font-black text-slate-900">{license.license_number || "-"}</span>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-slate-500">Legal entity</div>
                <div className="mt-1 font-black text-slate-900">
                  {license.entity_name_en || license.entity_name_ar || "-"}
                </div>
              </div>
            </div>

            {license.verification_url_en || license.verification_url_ar ? (
              <a
                href={license.verification_url_en || license.verification_url_ar || "#"}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-xl border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-black text-brand-600"
              >
                View official registry ↗
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </details>
  ) : null}
</div>

     <details className="group mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-7 text-slate-700 md:hidden">
  <summary className="cursor-pointer list-none">
    <div className="font-black text-slate-950">
      Client fund protection
    </div>

    <div className="relative mt-2 max-h-[88px] overflow-hidden text-justify group-open:hidden">
      {fundProtection ||
        "Clear regulation helps traders understand client money rules and verify the legal entity before opening an account."}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-emerald-50 to-transparent" />
    </div>

    <div className="mt-3 inline-flex rounded-xl border border-emerald-200 bg-white px-4 py-2 text-xs font-black text-emerald-700">
      <span className="group-open:hidden">Show more</span>
      <span className="hidden group-open:inline">Show less</span>
    </div>
  </summary>

  <div className="mt-3 text-justify">
    {fundProtection ||
      "Clear regulation helps traders understand client money rules and verify the legal entity before opening an account."}
  </div>
</details>

<div className="mt-5 hidden rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-7 text-slate-700 md:block">
  <span className="font-black text-slate-950">
    Client fund protection:
  </span>{" "}
  {fundProtection ||
    "Clear regulation helps traders understand client money rules and verify the legal entity before opening an account."}
</div>

      <div className="mt-7">
        <h3 className="text-xl font-black text-slate-950">
          What do these licenses mean?
        </h3>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {licenses.map((license) => (
            <div
              key={`desc-${license.id}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 md:min-h-[140px] md:p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-base font-black text-slate-950 md:text-lg">
                  {license.regulator_code}
                </div>
                <div className="text-xs font-black text-amber-500 md:text-sm">
                  {stars(license.trust_level)}
                </div>
              </div>

              <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-700 md:line-clamp-none">
                {license.regulator_description_en ||
                  "A regulator that supervises the company under defined regulatory requirements."}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-xl font-black text-slate-950">
          Why does regulation matter?
        </h3>

       <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
  {[
    ["🛡️", "Client funds"],
    ["⚖️", "Legal oversight"],
    ["🏦", "Balance protection"],
    ["📋", "Complaints"],
  ].map(([icon, title]) => (
    <div
      key={title}
      className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm md:p-4"
    >
      <div className="text-xl md:text-2xl">{icon}</div>
      <div className="mt-2 text-xs font-black text-slate-900 md:text-sm">
        {title}
      </div>
    </div>
  ))}
</div>
      </div>

      <div className="mt-6 hidden rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm leading-7 text-slate-700 md:block">
        A license does not remove trading risk, but it helps traders identify the legal entity, the supervising regulator, and the official registry before opening an account.
      </div>
    </SectionCard>
  );
}

export default async function BrokerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const broker = await getBroker(slug);

  if (!broker) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-2xl font-bold text-slate-900">
            Broker not found
          </h1>
          <p className="text-slate-600">No broker found for this link.</p>
        </div>
      </main>
    );
  }

const relatedBrokers = await getRelatedBrokers(slug);
const accountsData = await getBrokerAccounts(broker.id);
const brokerLicenses = await getBrokerLicenses(broker.id);
  
  const pros = splitText(broker.pros_en || broker.pros);
  const cons = splitText(broker.cons_en || broker.cons);
  const whoShouldUse = splitText(broker.who_should_use_en).slice(0, 4);
  const whoShouldAvoid = splitText(broker.who_should_avoid_en).slice(0, 4);
  const brokerPositioning =
  broker.broker_positioning_en ||
  broker.intro_en ||
  broker.intro ||
  `This page reviews ${broker.name_en || broker.name} in terms of regulation, fees, account types, platforms, and customer support.`;
  const accounts = splitText(broker.account_types);
  const payments = splitText(broker.deposit_withdrawal_en || broker.deposit_withdrawal);
  const tradingAssets = splitText(broker.trading_assets);
  const overallScore = calculateOverallScore(broker);
const verdictTone = getVerdictTone(overallScore);

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
        const spreadText = acc.spread || "";
        const numeric = Number(String(spreadText).replace(/[^0-9.]/g, ""));
        return {
          ...acc,
          numeric: Number.isFinite(numeric) ? numeric : Infinity,
        };
      })
      .sort((a, b) => a.numeric - b.numeric)[0]
  : null;

const noCommissionAccounts = accountsData.filter((acc) => {
  const commission = (acc.commission_en || acc.commission || "")
    .trim()
    .toLowerCase();

  return (
    !commission ||
    commission === "-" ||
    commission === "$0" ||
    commission === "0" ||
    commission === "0$" ||
    commission.includes("no")
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

const faqSchema = faqItems.map((item) => ({
  "@type": "Question",
  name: item.question,
  acceptedAnswer: {
    "@type": "Answer",
    text: item.answer,
  },
}));

const paymentMethods = splitText(
  broker.payment_methods_en ||
    broker.deposit_withdrawal_en ||
    broker.deposit_withdrawal
);

const depositSummary = broker.deposit_withdrawal_summary_en || null;
const withdrawalSpeed = broker.withdrawal_speed_en || null;

const availablePlatforms = broker.available_platforms_en
  ? splitText(broker.available_platforms_en)
  : splitPipes(broker.platforms);

const platformTools = splitText(broker.platform_tools_en);

const platformSummary =
  broker.platform_summary_en ||
  broker.platform_details_en ||
  broker.platform_details ||
  null;

const regulationBodies = splitText(broker.regulation);

const regulationSummary =
  broker.regulation_summary_en ||
  broker.safety_en ||
  broker.safety ||
  null;

const fundProtection =
  broker.fund_protection_en ||
  broker.safety_en ||
  broker.safety ||
  null;

const safetyFactors = splitText(broker.safety_factors_en);

const regulationItems = (broker.regulation_short || broker.regulation || "")
  .split(/[,|]/)
  .map((item) => item.trim())
  .filter(Boolean);

const siteUrl = "https://brokeralarab.com";
const pageUrl = `${siteUrl}/en/brokers/${broker.slug}`;
const shareTitle = `${broker.name_en || broker.name} Review | Broker AlArab`;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Reviews",
      item: `${siteUrl}/en/brokers`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: `${broker.name_en || broker.name} Review`,
      item: `${siteUrl}/en/brokers/${broker.slug}`,
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: broker.name_en || broker.name,
  url: `${siteUrl}/en/brokers/${broker.slug}`,
  logo: broker.logo || undefined,
  description:
    broker.meta_description_en ||
    broker.meta_descr ||
    broker.intro_en ||
    broker.intro ||
    `Full review of ${broker.name_en || broker.name} covering fees, platforms, and regulation.`,
};

  return (
    <>
     {faqItems.length > 0 && (
  <Script
    id="faq-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSchema,
      }),
    }}
  />
)}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
<Script
  id="organization-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema),
  }}
/>
            <main dir="ltr" className="mx-auto w-full max-w-7xl px-3 pt-5 pb-1 text-left sm:px-4 md:pt-6 md:pb-1">
        
{/* Trust Bar */}
<section className="mb-4 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm md:mb-5">
  <div className="grid grid-cols-2 gap-0 divide-x divide-slate-100 md:grid-cols-4">

    <div className="flex items-center justify-center gap-2 px-3 py-2 text-center">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-600">
        ✓
      </span>
      <span className="text-[11px] font-black text-slate-800 md:text-sm">
        <span className="md:hidden">50+ Brokers</span>
        <span className="hidden md:inline">50+ Brokers Reviewed</span>
      </span>
    </div>

    <div className="flex items-center justify-center gap-2 px-3 py-3 text-center">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-black text-brand-500">
        📊
      </span>
      <span className="text-[11px] font-black text-slate-800 md:text-sm">
        <span className="md:hidden">150+ Criteria</span>
        <span className="hidden md:inline">150+ Rating Criteria</span>
      </span>
    </div>

    <div className="flex items-center justify-center gap-2 px-3 py-3 text-center">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-black text-amber-600">
        🔄
      </span>
      <span className="text-[11px] font-black text-slate-800 md:text-sm">
        <span className="md:hidden">Monthly Update</span>
        <span className="hidden md:inline">Broker Data Updated</span>
      </span>
    </div>

    <div className="flex items-center justify-center gap-2 px-3 py-3 text-center">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700">
        🛡
      </span>
      <span className="text-[11px] font-black text-slate-800 md:text-sm">
        <span className="md:hidden">Independent</span>
        <span className="hidden md:inline">Independent Reviews</span>
      </span>
    </div>

  </div>
</section>
        <section className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm md:rounded-[32px]">
  <div
    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${verdictTone.accent}`}
  />

  <div className="p-4 md:p-7">
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-6">
      
      <aside className="order-1 hidden space-y-4 text-left lg:order-2 lg:block">
<div className="flex h-[120px] items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 px-4 py-4 shadow-sm md:h-[150px]">
  {broker.logo ? (
    <img
      src={broker.logo}
      alt={broker.name || "Broker logo"}
      className="w-auto object-contain"
      style={{ height: "130%", maxWidth: "none" }}
    />
  ) : (
    <span className="text-sm text-slate-400">No logo</span>
  )}
</div>

                <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
          <div className="mb-4 text-base font-extrabold text-slate-900">
  Broker Snapshot
</div>

          <div className="space-y-1">
  <SummaryRow label="Founded" value={broker.founded_year} />
  <SummaryRow label="Headquarters" value={broker.headquarters_en || broker.headquarters} />

  <div className="border-b border-slate-200 py-3">
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div className="text-sm font-medium text-slate-400">Regulation</div>

    {regulationItems.length ? (
      <div className="flex flex-wrap justify-start gap-2 sm:max-w-[70%] sm:justify-end">
        {regulationItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      <div className="text-right text-[15px] font-extrabold text-slate-900 leading-tight md:text-[18px] max-w-[160px] ml-auto">
        -
      </div>
    )}
  </div>
</div>

  <SummaryRow label="Arabic Support" value={broker.arabic_support} />
</div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm">
         {broker.expert_insight_en ? (
  <div className="min-h-[210px] rounded-[24px] border border-brand-100 bg-brand-50 p-4 shadow-sm">
    <div className="text-xs font-bold uppercase tracking-wide text-brand-600">
      Expert insight
    </div>
    <div className="mt-2 text-sm leading-7 text-slate-700">
      {broker.expert_insight_en}
    </div>
  </div>
) : null}
          <ShareButtons url={pageUrl} title={shareTitle} />
        </div>
      </aside>

            <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
   
{/* MOBILE LOGO */}
<div className="mb-5 flex flex-col items-center gap-3 lg:hidden">
  <div className="flex h-20 w-40 items-center justify-center rounded-[20px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-md">
    {broker.logo ? (
      <img
        src={broker.logo}
        alt={`${broker.name_en || broker.name} logo`}
        className="max-h-16 max-w-[135px] object-contain"
      />
    ) : null}
  </div>
</div>
  <div className="mb-3 hidden flex-wrap items-center gap-2 md:flex">
    <Chip tone="blue">Broker Review</Chip>
    <Chip tone="emerald">{verdictTone.badge}</Chip>

    {broker.key_strength_en ? (
      <Chip tone="amber">Key strength: {broker.key_strength_en}</Chip>
    ) : null}

    {broker.key_weakness_en ? (
      <Chip tone="slate">Risk: {broker.key_weakness_en}</Chip>
    ) : null}
  </div>

  <h1 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl md:text-5xl">
    {broker.name_en || broker.name} Review 2026
  </h1>
  <div className="mt-2 text-xs font-semibold text-slate-500">
  Updated for 2026 • Based on real trading conditions
</div>

  <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
    {renderStars(overallScore || broker.rating)}
    <div
      className={`inline-flex rounded-full border px-3 py-2 text-sm font-black ${verdictTone.color}`}
    >
      Rating: {verdictTone.label}
    </div>
  </div>

<div className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-600 md:min-h-[150px] md:text-base mx-auto lg:mx-0">
  {brokerPositioning}
</div>

{/* 🔥 Verdict Line */}
<div className="mt-4 hidden flex-wrap items-center gap-2 md:flex">
  <span className="inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-white">
    Best for active traders
  </span>

  <span className="text-sm font-semibold text-slate-600">
    Not ideal for beginners
  </span>
</div>

  {(whoShouldUse.length > 0 || whoShouldAvoid.length > 0) ? (
    <div className="mt-6 hidden gap-3 md:grid md:grid-cols-2">
      <div className="h-full min-h-[170px] rounded-[24px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
        <div className="mb-2 text-sm font-black text-emerald-800">
          Best suited for
        </div>

        {whoShouldUse.length ? (
          <div className="flex flex-wrap gap-2">
            {whoShouldUse.map((item, i) => (
              <span
                key={i}
                className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 md:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No data available.</p>
        )}
      </div>

      <div className="h-full min-h-[170px] rounded-[24px] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
        <div className="mb-2 text-sm font-black text-amber-800">
          May not suit
        </div>

        {whoShouldAvoid.length ? (
          <div className="flex flex-wrap gap-2">
            {whoShouldAvoid.map((item, i) => (
              <span
                key={i}
                className="inline-flex rounded-full border border-amber-200 bg-white px-3 py-1.5 text-xs font-bold text-amber-700 md:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No data available.</p>
        )}
      </div>
    </div>
  ) : null}

  <div className="mt-6 grid grid-cols-3 gap-2">
  <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
    <div className="text-[11px] font-bold text-slate-500">Rating</div>
    <div className="mt-1 text-xl font-black text-slate-950">
      {overallScore || broker.rating || "-"}
    </div>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
    <div className="text-[11px] font-bold text-slate-500">Min Deposit</div>
    <div className="mt-1 text-xl font-black text-slate-950">
      {formatMoney(broker.min_deposit)}
    </div>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
    <div className="text-[11px] font-bold text-slate-500">Leverage</div>
    <div className="mt-1 text-xl font-black text-slate-950">
      {broker.max_leverage || "-"}
    </div>
  </div>
</div>

<div className="mt-4 grid gap-3 lg:flex lg:flex-wrap lg:items-center lg:justify-center">
  <a
    href={`/go/${broker.slug}?type=real`}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-[15px] font-black text-white shadow-lg shadow-brand-100 transition hover:bg-brand-600 lg:w-auto lg:min-w-[170px] md:text-base"
  >
    Open Real Account
  </a>

  <a
    href={`/go/${broker.slug}?type=demo`}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 lg:w-auto lg:min-w-[170px] md:text-base"
  >
    Open Demo Account
  </a>

  <a
    href={`/go/${broker.slug}?type=mt5`}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="hidden min-h-[50px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 lg:inline-flex lg:w-auto lg:min-w-[170px] md:text-base"
  >
    Download MT5
  </a>

  <a
    href={`/go/${broker.slug}?type=mt4`}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="hidden min-h-[50px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 lg:inline-flex lg:w-auto lg:min-w-[170px] md:text-base"
  >
    Download MT4
  </a>
</div>

</div>
    </div>
  </div>
</section>
{/* E-E-A-T Review Trust Box */}
<section className="mt-4 rounded-[22px] border border-brand-100 bg-gradient-to-br from-white via-slate-50 to-brand-50 p-4 shadow-sm md:mt-6 md:rounded-[26px] md:p-6">
  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">

    <div className="min-w-0 text-left">
      <div className="text-[11px] font-black tracking-wide text-brand-600 md:text-xs">
        Independent Review
      </div>

      <div className="mt-1 text-[18px] font-black leading-7 text-slate-950 md:text-[24px] md:leading-9">
        {broker.name_en || broker.name} was reviewed using Broker AlArab's methodology
      </div>

      <p className="mt-2 text-[13px] leading-6 text-slate-600 md:text-sm md:leading-7">
        We evaluate brokers using more than 150 criteria covering regulation,
        trading costs, account types, platforms, withdrawals, and customer support.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-2 md:gap-3">
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
        <div className="text-[11px] font-bold text-slate-500">
          Last Updated
        </div>
        <div className="mt-1 text-sm font-black text-slate-950">
          June 2026
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
        <div className="text-[11px] font-bold text-slate-500">
          Reviewed By
        </div>
        <div className="mt-1 text-sm font-black text-slate-950">
          Broker Review Team
        </div>
      </div>

      <a
        href="/en/how-we-review-brokers"
        className="col-span-2 inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-black text-white transition hover:bg-brand-600"
      >
        Rating Methodology
      </a>
    </div>

  </div>
</section>

<div className="mt-5 grid min-w-0 gap-6">
  <div className="min-w-0 space-y-5 md:space-y-6">
                        

      <SectionCard
  title="Rating Breakdown"
  id="scores"
>
  {/* Mobile */}
  <div className="md:hidden space-y-4">
    <div className="rounded-[26px] border border-slate-200 bg-white p-4 text-center shadow-sm">
      <div className="text-xs font-black text-brand-600">
        OVERALL SCORE
      </div>

      <div className="mt-3 flex items-end justify-center gap-2">
        <span className="text-4xl font-black leading-none text-slate-950">
          {overallScore || broker.rating || "-"}
        </span>
        <span className="text-sm font-bold text-brand-600">/ 5</span>
      </div>

      <div className="mt-3 inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-black text-brand-600">
        {verdictTone.label}
      </div>

      <p className="mt-4 text-[13px] leading-6 text-slate-600">
        This score reflects regulation, trading costs, platform quality, deposits, withdrawals, and support.
      </p>

      <div className="mt-4 space-y-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-bold text-slate-500">Regulation</div>
          <div className="mt-1 text-sm font-extrabold text-slate-900">
            {broker.regulation_short || "Not specified"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-bold text-slate-500">Min Deposit</div>
          <div className="mt-1 text-sm font-extrabold text-slate-900">
            {formatMoney(broker.min_deposit)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-bold text-slate-500">Platforms</div>
          <div className="mt-1 text-sm font-extrabold text-slate-900">
            {broker.platforms || "Not specified"}
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-3">
      <ScoreBar label="Safety & Regulation" value={broker.score_safety} />
      <ScoreBar label="Fees & Spreads" value={broker.score_fees} />
      <ScoreBar label="Trading Platforms" value={broker.score_platforms} />
      <ScoreBar label="Deposits & Withdrawals" value={broker.score_deposit} />
      <ScoreBar label="Customer Support" value={broker.score_support} />
    </div>
  </div>

  {/* Desktop */}
  <div className="hidden md:block">
    <div className="mb-6 overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-brand-50 shadow-sm">
      <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="flex flex-col justify-center border-b border-slate-200 p-6 text-center md:border-b-0 md:border-r">
          <div className="text-xs font-black uppercase tracking-wide text-brand-600">
            Overall Score
          </div>
          <div className="mt-3 flex items-end justify-center gap-2">
            <span className="text-5xl font-black leading-none text-slate-950">
              {overallScore || broker.rating || "-"}
            </span>
            <span className="text-sm font-bold text-brand-600">/ 5</span>
          </div>
          <div className="mt-3 inline-flex items-center justify-center rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-black text-brand-600">
            {verdictTone.label}
          </div>
        </div>

        <div className="p-6 md:p-7">
          <div className="text-lg font-black text-slate-950 md:text-xl">
            Analyst Summary
          </div>

          <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-700 md:text-base">
            This score reflects the broker’s overall balance between regulation, trading costs, platform quality, deposit and withdrawal experience, and customer support.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-bold text-slate-500">Regulation Quality</div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">
                {broker.regulation_short || "Not specified"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-bold text-slate-500">Min Deposit</div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">
                {formatMoney(broker.min_deposit)}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <div className="text-xs font-bold text-slate-500">Platform Access</div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">
                {broker.platforms || "Not specified"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <ScoreBar label="Safety & Regulation" value={broker.score_safety} />
      <ScoreBar label="Fees & Spreads" value={broker.score_fees} />
      <ScoreBar label="Trading Platforms" value={broker.score_platforms} />
      <ScoreBar label="Deposits & Withdrawals" value={broker.score_deposit} />
      <ScoreBar label="Customer Support" value={broker.score_support} />
    </div>
  </div>
</SectionCard>

{/* ✅ MOBILE ENGLISH FIXED */}
<div className="md:hidden space-y-4">

  {/* Advantages */}
  <section className="overflow-hidden rounded-[26px] border border-emerald-200 bg-white shadow-sm">
    <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50 px-4 py-3">
      <h2 className="text-lg font-black text-emerald-900">
        Main Advantages
      </h2>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-700">
        {pros.length}
      </span>
    </div>

    <div className="space-y-2 p-4">
      {pros.length ? (
        pros.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
          >
            {/* ICON LEFT */}
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">
              ✓
            </span>

            {/* TEXT */}
            <p className="flex-1 text-sm leading-7 text-slate-700">
              {item}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-500">No data available.</p>
      )}
    </div>
  </section>

  {/* Disadvantages */}
  <section className="overflow-hidden rounded-[26px] border border-rose-200 bg-white shadow-sm">
    <div className="flex items-center justify-between border-b border-rose-100 bg-rose-50 px-4 py-3">
      <h2 className="text-lg font-black text-rose-900">
        Main Disadvantages
      </h2>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-rose-700">
        {cons.length}
      </span>
    </div>

    <div className="space-y-2 p-4">
      {cons.length ? (
        cons.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
          >
            {/* ICON LEFT */}
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-xs font-black text-white">
              –
            </span>

            {/* TEXT */}
            <p className="flex-1 text-sm leading-7 text-slate-700">
              {item}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-500">No data available.</p>
      )}
    </div>
  </section>

</div>



<SectionCard
  title="Account Types"
  subtitle={`A practical overview of the account types available at ${broker.name_en || broker.name}, including the key details of each account.`}
  id="accounts"
>
  <div className="space-y-6">

    {/* Mobile */}
<div className="md:hidden">
  <div className="rounded-[26px] border border-slate-200 bg-white p-4 text-left shadow-sm">

    <div className="grid grid-cols-2 gap-3">

      {/* Accounts */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-brand-500" />
        <div className="p-4 text-center">
          <div className="text-xs font-bold text-slate-500">
            Accounts
          </div>
          <div className="mt-2 text-2xl font-black text-slate-950">
            {accountCount || "-"}
          </div>
        </div>
      </div>

      {/* Lowest Deposit */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-emerald-500" />
        <div className="p-4 text-center">
          <div className="text-xs font-bold text-slate-500">
            Lowest Deposit
          </div>
          <div className="mt-2 text-2xl font-black text-slate-950">
            {lowestDeposit?.raw || broker.min_deposit || "-"}
          </div>
        </div>
      </div>

    </div>

    <p className="mt-5 text-left text-[14px] leading-7 text-slate-600">
      {broker.name_en || broker.name} offers several account types for different trader profiles, from beginner-friendly accounts to lower-spread or commission-based options.
    </p>

 

        <MobileAccountAccordion
  accounts={accountsData}
  brokerSlug={broker.slug || ""}
/>

        <div className="mt-5 rounded-[22px] border border-brand-100 bg-brand-50 p-4 shadow-sm">
          <div className="text-[15px] font-black text-slate-950">
            Start trading with {broker.name_en || broker.name}
          </div>
          <p className="mt-1 text-[12px] leading-5 text-slate-600">
            Choose the account that fits your strategy and open a real account in minutes.
          </p>

          <a
            href={`/go/${broker.slug}?type=real`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mt-4 flex min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 text-sm font-black text-white shadow-md active:scale-[0.98]"
          >
            Open Real Account
          </a>
        </div>
      </div>
    </div>

    {/* Desktop — stronger visual block */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="border-b border-slate-200 bg-slate-50 p-6 xl:border-b-0 xl:border-r">
            <div className="text-xs font-black uppercase tracking-[0.12em] text-brand-600">
              Account Overview
            </div>

            <div className="mt-5">
              <div className="text-5xl font-black leading-none text-slate-950">
                {accountCount || "-"}
              </div>
              <div className="mt-2 text-sm font-medium text-slate-500">
                Available account types
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Lowest Deposit
                </div>
                <div className="mt-1 text-lg font-black text-slate-950">
                  {lowestDeposit?.raw || broker.min_deposit || "-"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Lowest Spread
                </div>
                <div className="mt-1 text-lg font-black text-slate-950">
                  {lowestSpread?.spread || broker.spreads_en || broker.spreads || "-"}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 xl:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xl font-black text-slate-950">
                  Compare Account Options
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-8 text-slate-600">
                  Review the differences in spreads, commissions, minimum deposits, execution type, and target trader profile across the available account options.
                </p>
              </div>

              <div className="hidden shrink-0 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-black text-brand-600 xl:inline-flex">
                {commissionAccounts.length} commission / {noCommissionAccounts.length} no commission
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold text-slate-500">
                  Lowest Deposit Account
                </div>
                <div className="mt-2 text-base font-black text-slate-950">
                  {lowestDeposit?.name || "-"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold text-slate-500">
                  Lowest Spread Account
                </div>
                <div className="mt-2 text-base font-black text-slate-950">
                  {lowestSpread?.account_name || "-"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold text-slate-500">
                  Commission Structure
                </div>
                <div className="mt-2 text-base font-black text-slate-950">
                  {commissionAccounts.length
                    ? `${commissionAccounts.length} commission accounts`
                    : "No clear commission"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Desktop — paragraph */}
    <p className="hidden leading-8 text-slate-700 md:block">
      {broker.name_en || broker.name} offers a range of account types designed for different trader profiles, from simple beginner-friendly accounts to lower-spread or commission-based accounts for more active traders.
    </p>

    {/* Desktop — stronger table, Best For removed */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left font-black text-slate-900">Account Type</th>
                <th className="p-4 text-center font-black text-slate-900">Spread</th>
                <th className="p-4 text-center font-black text-slate-900">Commission</th>
                <th className="p-4 text-center font-black text-slate-900">Min Deposit</th>
                <th className="p-4 text-center font-black text-slate-900">Execution Type</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {accountsData.length ? (
                accountsData.map((acc, index) => (
                  <tr
                    key={acc.id}
                    className={`border-t border-slate-200 transition ${
                      index === 0
                        ? "bg-brand-50/40"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50/40"
                    } hover:bg-slate-50`}
                  >
                    <td className="p-4">
                     <Link
  href={`/en/brokers/${broker.slug}/accounts/${accountSlug(acc.account_name)}`}
  className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 transition hover:bg-brand-500 hover:text-white"
>
  <span className="h-2 w-2 rounded-full bg-brand-500" />
  <span className="font-bold">
    {acc.account_name || "-"}
  </span>
</Link>
                    </td>
                    <td className="p-4 text-center text-slate-700">{acc.spread || "-"}</td>
                    <td className="p-4 text-center text-slate-700">{acc.commission_en || acc.commission || "-"}</td>
                    <td className="p-4 text-center text-slate-700">{acc.min_deposit_en || acc.min_deposit || "-"}</td>
                    <td className="p-4 text-center text-slate-700">{acc.execution_type || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-5 text-center text-slate-500">
                    No account data is currently available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div className="hidden md:block">
      <div className="mt-4 overflow-hidden rounded-[28px] border border-brand-100 bg-gradient-to-r from-brand-100 via-brand-50 to-brand-100 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-lg font-black text-slate-900">
              Start trading with {broker.name_en || broker.name} today
            </div>
            <p className="mt-1 text-sm leading-7 text-slate-600">
              Choose the account that fits your strategy and open a real trading account in just minutes.
            </p>
          </div>

          <a
            href={`/go/${broker.slug}?type=real`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-8 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:from-brand-600 hover:to-brand-600 hover:shadow-lg"
          >
            Open Real Account
          </a>
        </div>
      </div>
    </div>
  </div>
</SectionCard>


      <SectionCard title="Deposits & Withdrawals">
  <div className="space-y-5 md:space-y-6">

   {/* Mobile */}
<div className="md:hidden">
  <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
    <div className="space-y-3 bg-white p-4">
      <div className="flex items-center justify-between rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 shadow-sm">
        <span className="text-sm font-bold text-slate-500">
          Payment Methods
        </span>
        <span className="text-2xl font-black text-slate-950">
          {paymentMethods.length || "-"}
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm">
        <div className="text-sm font-bold text-slate-500">
          Withdrawal Speed
        </div>
        <div className="mt-2 text-[14px] font-black leading-6 text-slate-950">
          {withdrawalSpeed || "No data available"}
        </div>
      </div>
    </div>

    <div className="border-t border-slate-100 p-4 text-left">
      <p className="mx-auto text-[14px] leading-7 text-slate-600">
        {depositSummary || "No data is currently available."}
      </p>

      <div className="mt-5">
        <div className="mb-3 text-sm font-black text-slate-950">
          Supported Payment Methods
        </div>

        {paymentMethods.length ? (
          <div className="flex flex-wrap justify-center gap-2">
            {paymentMethods.map((item, i) => (
              <span
                key={i}
                className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-600 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No data available.</p>
        )}
      </div>
    </div>
  </div>
</div>

    {/* Desktop — unchanged */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="border-b border-slate-200 bg-slate-50 p-5 xl:border-b-0 xl:border-r">
            <div className="text-xs font-black uppercase tracking-[0.12em] text-brand-600">
              Funding Overview
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Payment Methods
                </div>
                <div className="mt-2 text-4xl font-extrabold tracking-tight leading-none text-slate-950">
                  {paymentMethods.length || "-"}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Withdrawal Speed
                </div>
                <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                  {withdrawalSpeed || "No data available."}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 xl:p-7">
            <div className="text-[30px] font-extrabold tracking-tight text-slate-950">
              Deposits & Withdrawals
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-700 md:text-base">
              {depositSummary || "No data is currently available."}
            </p>

            <div className="mt-5">
              <div className="text-sm font-semibold text-slate-900">
                Supported Payment Methods
              </div>

              {paymentMethods.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {paymentMethods.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 md:text-sm"
                    >
                      {item}
                    </span>
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
</SectionCard>

<SectionCard
  title="Platform Details"
  subtitle={`A closer look at the platforms offered by ${broker.name_en || broker.name} and the overall trading experience.`}
  id="platforms"
>
  <div className="space-y-5">

    {/* Mobile */}
    {platformSummary || broker.platform_details_en || broker.platform_details ? (
      <div className="space-y-4 md:hidden">
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">

          <div className="p-4 text-center">
            <div className="rounded-2xl border border-brand-100 bg-brand-50 px-4 py-4">
              <div className="text-sm font-black text-slate-600">
                Available Platforms
              </div>

              {availablePlatforms.length ? (
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {availablePlatforms.map((item, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-black text-brand-600 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-2 text-base font-black text-slate-950">
                  {broker.platforms || "MT4 / MT5"}
                </div>
              )}
            </div>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-500">
                  Best For
                </span>
                <span className="text-right text-sm font-black leading-6 text-slate-950">
                  {broker.best_for_en || broker.best_for || "Fast withdrawals"}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[17px] font-black text-slate-950">
                Trading Platform Experience
              </div>

              <p className="mt-3 text-left text-[14px] leading-7 text-slate-600">
                {platformSummary || broker.platform_details_en || broker.platform_details}
              </p>
            </div>

            <div className="mt-5 rounded-[22px] border border-brand-100 bg-brand-50 p-4 shadow-sm">
              <div className="text-[15px] font-black text-slate-950">
                Download MetaTrader Platforms
              </div>

              <p className="mt-1 text-[12px] leading-5 text-slate-600">
                Download MT4 or MT5 through the broker links.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={`/go/${broker.slug}?type=mt4`}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center rounded-2xl border border-brand-100 bg-white text-sm font-black text-brand-600 shadow-sm active:scale-[0.98]"
                >
                  Download MT4
                </a>

                <a
                  href={`/go/${broker.slug}?type=mt5`}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center rounded-2xl bg-brand-500 text-sm font-black text-white shadow-md active:scale-[0.98]"
                >
                  Download MT5
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    ) : (
      <p className="text-slate-500 md:hidden">No data is currently available.</p>
    )}

    {/* Desktop — cleaner premium version */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="border-b border-slate-100 bg-slate-50 p-5 xl:border-b-0 xl:border-r">
            <div className="text-xs font-black uppercase tracking-[0.12em] text-brand-600">
              Platform Access
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Available Platforms
                </div>
                <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                  {availablePlatforms.length
                    ? availablePlatforms.join(" • ")
                    : broker.platforms || "No data available."}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Trading Tools
                </div>
                <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                  {platformTools.length
                    ? `${platformTools.length} tools highlighted`
                    : "No data available."}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 xl:p-7">
            <div className="text-2xl font-extrabold tracking-tight text-slate-950">
              Trading Platform Experience
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-700 md:text-base">
              {platformSummary || "No data is currently available."}
            </p>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-3 shadow-sm">
                <div className="text-sm font-semibold text-slate-800">
                  Available Platforms
                </div>

                {availablePlatforms.length ? (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {availablePlatforms.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 text-sm leading-7 text-slate-500">
                    No data available.
                  </div>
                )}
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-800">
                  Platform Tools
                </div>

                {platformTools.length ? (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {platformTools.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
                      >
                        {item}
                      </span>
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

<SectionCard title="Final Verdict" id="verdict">
  <div className="space-y-5">

    {/* Mobile */}
    <div className="md:hidden">
      <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 bg-slate-50 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
              <div className="text-[11px] font-bold text-slate-500">
                Overall Rating
              </div>
              <div className="mt-1 text-3xl font-black text-slate-950">
                {overallScore || broker.rating || "-"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
              <div className="text-[11px] font-bold text-slate-500">
                Final Verdict
              </div>
              <div className="mt-2 text-base font-black text-slate-950">
                {verdictTone.label}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 text-left">
          <div className="text-lg font-black text-slate-950">
            Is {broker.name_en || broker.name} worth trying?
          </div>

          <p className="mt-3 text-[14px] leading-7 text-slate-600">
            {broker.final_verdict_en || broker.final_verdict || "No data is currently available."}
          </p>

          {(broker.key_strength_en || broker.key_weakness_en) ? (
            <div className="mt-5 grid gap-3">
              {broker.key_strength_en ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <div className="text-xs font-black text-emerald-700">
                    Key Strength
                  </div>
                  <div className="mt-1 text-sm font-semibold leading-7 text-slate-800">
                    {broker.key_strength_en}
                  </div>
                </div>
              ) : null}

              {broker.key_weakness_en ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <div className="text-xs font-black text-amber-700">
                    Main Limitation
                  </div>
                  <div className="mt-1 text-sm font-semibold leading-7 text-slate-800">
                    {broker.key_weakness_en}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <a
            href={`/go/${broker.slug}?type=real`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mt-5 flex min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 text-[15px] font-black text-white shadow-md active:scale-[0.98]"
          >
            Open Trading Account
          </a>
        </div>
      </div>
    </div>

   {/* Desktop */}
<div className="hidden md:block">
  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
    <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">
      <div className="border-b border-slate-100 bg-slate-50 p-5 xl:border-b-0 xl:border-r">
        <div className="text-xs font-black uppercase tracking-[0.12em] text-brand-600">
          Verdict Snapshot
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Overall Rating
            </div>
            <div className="mt-2 text-4xl font-extrabold leading-none tracking-tight text-slate-950">
              {overallScore || broker.rating || "-"}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Verdict
            </div>
            <div className="mt-2 text-base font-extrabold leading-7 text-slate-900">
              {verdictTone.label}
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`/go/${broker.slug}?type=real`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3 text-sm font-extrabold text-white shadow-md transition hover:from-brand-600 hover:to-brand-600 hover:shadow-lg"
            >
              Open Trading Account
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 xl:p-7">
        <div className="text-2xl font-extrabold tracking-tight text-slate-950">
          Final Summary
        </div>

        <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 shadow-sm">
          <div className="text-base leading-9 text-slate-700">
            {broker.final_verdict_en || broker.final_verdict || "No data is currently available."}
          </div>
        </div>

        {(broker.key_strength_en || broker.key_weakness_en || broker.expert_insight_en) ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              {broker.key_strength_en ? (
                <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-4 shadow-sm min-h-[140px]">
                  <div className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                    Key Strength
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-7 text-slate-800">
                    {broker.key_strength_en}
                  </div>
                </div>
              ) : null}

              {broker.key_weakness_en ? (
                <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-4 py-4 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wide text-amber-700">
                    Main Limitation
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-7 text-slate-800">
                    {broker.key_weakness_en}
                  </div>
                </div>
              ) : null}
            </div>

            {broker.expert_insight_en ? (
              <div className="rounded-[22px] border border-brand-100 bg-brand-50 px-5 py-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wide text-brand-600">
                  Expert Insight
                </div>
                <div className="mt-2 text-sm leading-8 text-slate-700">
                  {broker.expert_insight_en}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  </div>
</div>
</div>
</SectionCard>


        {faqItems.length > 0 && (
  <SectionCard title="Frequently Asked Questions" id="faq">
  {/* Mobile */}
<div className="space-y-3 md:hidden">
  {visibleFaqItems.map((item, i) => (
    <details
      key={i}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
        <div className="text-left text-base font-bold text-slate-900">
          {item.question}
        </div>

        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition group-open:rotate-180">
          ▾
        </span>
      </summary>

      <div className="border-t border-slate-100 bg-slate-50 px-4 py-4">
        <div className="leading-7 text-slate-600">
          {item.answer}
        </div>
      </div>
    </details>
  ))}

  {extraFaqItems.length > 0 && (
    <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <summary className="cursor-pointer list-none px-4 py-4 text-center text-sm font-extrabold text-brand-500">
        Show more questions
      </summary>

      <div className="space-y-3 border-t border-slate-100 bg-slate-50 p-3">
        {extraFaqItems.map((item, i) => (
          <details
            key={`extra-mobile-${i}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
              <div className="text-left text-base font-bold text-slate-900">
                {item.question}
              </div>

              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition group-open:rotate-180">
                ▾
              </span>
            </summary>

            <div className="border-t border-slate-100 bg-slate-50 px-4 py-4">
              <div className="leading-7 text-slate-600">
                {item.answer}
              </div>
            </div>
          </details>
        ))}
      </div>
    </details>
  )}
</div>

  {/* Desktop */}
<div className="hidden space-y-4 md:block">
  {visibleFaqItems.map((item, i) => (
    <div
      key={i}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
    >
      <div className="text-base font-bold text-slate-900">
        {item.question}
      </div>
      <div className="mt-2 leading-7 text-slate-600">
        {item.answer}
      </div>
    </div>
  ))}

  {extraFaqItems.length > 0 && (
    <details className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
      <summary className="cursor-pointer list-none px-5 py-4 text-center text-sm font-extrabold text-brand-500">
        Show more questions
      </summary>

      <div className="space-y-4 border-t border-slate-100 bg-slate-50 p-4">
        {extraFaqItems.map((item, i) => (
          <div
            key={`extra-desktop-${i}`}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="text-base font-bold text-slate-900">
              {item.question}
            </div>
            <div className="mt-2 leading-7 text-slate-600">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </details>
  )}
</div>
  </SectionCard>
)}

         <div className="mb-2">
  <SectionCard
    title={`Compare ${broker.name_en || broker.name} with Other Brokers`}
  >
    {relatedBrokers.length ? (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {relatedBrokers.map((item) => (
          <Link
            key={item.id}
            href={`/en/compare/${broker.slug}-vs-${item.slug}`}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
          {/* Top logos */}
          <div className="mb-5 flex items-center justify-between gap-4">

            {/* Current broker (right side) */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                {broker.logo ? (
                  <img
                    src={broker.logo}
                    alt={broker.name || "Broker logo"}
                    className="max-h-14 w-auto object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No logo</span>
                )}
              </div>

              <div className="mt-2 text-sm font-bold text-slate-900">
                {broker.name_en || broker.name}
              </div>
            </div>

            {/* VS */}
            <div className="text-base font-black text-slate-400">
              VS
            </div>

            {/* Other broker */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={item.name || "Broker logo"}
                    className="max-h-14 w-auto object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No logo</span>
                )}
              </div>

              <div className="mt-2 text-sm font-bold text-slate-900">
                {item.name_en || item.name}
              </div>
            </div>

          </div>

         {/* Title */}
<div className="text-lg font-extrabold text-slate-900 text-center">
  Compare {broker.name_en || broker.name} vs {item.name_en || item.name}
</div>

{/* Description */}
<p className="mt-3 text-sm text-slate-600 text-center leading-7">
  Discover the differences between {broker.name_en || broker.name} and {item.name_en || item.name} in terms of regulation,
  fees, minimum deposit, trading platforms, and overall suitability for different types of traders.
</p>

{/* Rating */}
<div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
  <span className="text-sm text-slate-500">
    {item.name_en || item.name} Rating
  </span>

  <span className="text-sm font-extrabold text-slate-900">
    {item.rating ?? "-"} / 5
  </span>
</div>

{/* CTA */}
<div className="mt-4 text-sm font-extrabold text-emerald-700 text-center transition group-hover:text-emerald-800">
  Read Comparison →
</div>

</Link>
))}
</div>
) : (
<p className="text-slate-500">No comparisons are currently available.</p>
)}
</SectionCard>
          </div>
          </div>
        </div>
      </main>
    </>
  );
}