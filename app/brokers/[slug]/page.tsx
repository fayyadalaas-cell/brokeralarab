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

async function getBroker(slug: string): Promise<Broker | null> {
  const supabase = await createClient();

  console.log("Incoming slug:", slug);

  const { data, error } = await supabase
    .from("brokers")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  console.log("Broker query data:", data);
  console.log("Broker query error:", error);

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
      title: "مراجعة شركات التداول",
      description: "أفضل تقييمات شركات التداول في العالم العربي",
    };
  }

  const title =
    broker.meta_title ||
    `تقييم ${broker.name} 2026 | بروكر العرب`;

  const description =
    broker.meta_descr ||
    `مراجعة شاملة لشركة ${broker.name} تشمل الرسوم، المنصات، التراخيص، أنواع الحسابات، وطرق الإيداع والسحب بالتفصيل.`;

  return {
    metadataBase: new URL(siteUrl),

    title,
    description,

    alternates: {
      languages: {
        ar: `${siteUrl}/brokers/${broker.slug}`,
        en: `${siteUrl}/en/brokers/${broker.slug}`,
      },
    },

    openGraph: {
      title,
      description,
      url: `${siteUrl}/brokers/${broker.slug}`,
      siteName: "بروكر العرب",
      locale: "ar_AR",
      type: "article",
      images: [
        {
          url: `${siteUrl}/brokers/${broker.slug}/opengraph-image?v=2`,
          width: 1200,
          height: 630,
          alt: `تقييم ${broker.name}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/brokers/${broker.slug}/opengraph-image?v=2`],
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
      <h2 className="mb-2 text-2xl font-extrabold text-slate-950">{title}</h2>

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
      label: "ممتاز",
      badge: "خيار قوي",
      color: "border-blue-200 bg-blue-50 text-blue-700",
      accent: "from-blue-600 via-blue-500 to-cyan-400",
    };
  }

  if ((score ?? 0) >= 4) {
    return {
      label: "جيد جدًا",
      badge: "تقييم قوي",
      color: "border-blue-200 bg-blue-50 text-blue-700",
      accent: "from-blue-500 via-sky-400 to-cyan-400",
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
    blue: "border-blue-200 bg-blue-50 text-blue-700",
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
    blue: "bg-blue-500",
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
        <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">
          {value ?? "-"} / 5
        </span>
      </div>

      <div className="h-2.5 rounded-full bg-slate-200">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
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
        background: "#0f172a",
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
    blue: "border-blue-200 bg-blue-50",
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

function MobileAccountAccordion({
  accounts,
}: {
  accounts: BrokerAccount[];
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
              <div className="text-base font-black text-slate-900">
                {acc.account_name || "-"}
              </div>

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

export default async function BrokerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const broker = await getBroker(slug);

  if (!broker) {
    return (
      <main dir="rtl" className="mx-auto max-w-4xl px-4 py-16 text-right">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-2xl font-bold text-slate-900">
            الشركة غير موجودة
          </h1>
          <p className="text-slate-600">لم يتم العثور على هذه الشركة.</p>
        </div>
      </main>
    );
  }

  const relatedBrokers = await getRelatedBrokers(slug);
  const accountsData = await getBrokerAccounts(broker.id);

  const commissionAccounts = accountsData.filter(
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

  const accounts = splitText(broker.account_types);
  const payments = splitText(broker.deposit_withdrawal);
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

  const faqItems =
    (broker.faq_ar ?? []).filter(
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

  const paymentMethods = splitText(broker.payment_methods_ar);
  const depositSummary = broker.deposit_withdrawal_summary_ar || null;
  const withdrawalSpeed = broker.withdrawal_speed_ar || null;

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
    broker.fund_protection_ar ||
    broker.safety ||
    null;

  const safetyFactors = splitText(broker.safety_factors_ar);

  const regulationItems = (broker.regulation_short || broker.regulation || "")
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean);

  const siteUrl = "https://brokeralarab.com";
  const pageUrl = `${siteUrl}/brokers/${broker.slug}`;

  const shareTitle = `تقييم ${broker.name} | بروكر العرب`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "تقييم شركات التداول",
        item: `${siteUrl}/brokers`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `تقييم ${broker.name}`,
        item: `${siteUrl}/brokers/${broker.slug}`,
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: broker.name,
    url: `${siteUrl}/brokers/${broker.slug}`,
    logo: broker.logo || undefined,
    description:
      broker.meta_descr ||
      broker.intro ||
      `مراجعة شاملة لشركة ${broker.name} تشمل الرسوم، المنصات، والحسابات.`,
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

                  <main dir="rtl" className="mx-auto w-full max-w-7xl px-3 pt-8 pb-1 text-right sm:px-4 md:pt-10 md:pb-1">
        <div className="mb-4 text-sm text-slate-500">
          <Link href="/brokers" className="hover:text-slate-700">
            تقييم شركات التداول
          </Link>
          <span className="mx-2">/</span>
          <span>تقييم {broker.name}</span>
        </div>

        <section className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm md:rounded-[32px]">
          <div
            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l ${verdictTone.accent}`}
          />

          <div className="p-4 md:p-7">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-6">

              <aside className="order-2 hidden space-y-4 text-right lg:block">
                <div className="flex h-[120px] items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 px-4 py-4 shadow-sm md:h-[150px]">
                  {broker.logo ? (
                    <img
                      src={broker.logo}
                      alt={`شعار ${broker.name}`}
                      className="w-auto object-contain"
                      style={{ height: "130%", maxWidth: "none" }}
                    />
                  ) : (
                    <span className="text-sm text-slate-400">لا يوجد شعار</span>
                  )}
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
                  <div className="mb-4 text-base font-extrabold text-slate-900">
                    لمحة عن الشركة
                  </div>

                  <div className="space-y-1">
                    <SummaryRow label="سنة التأسيس" value={broker.founded_year} />
                    <SummaryRow label="المقر الرئيسي" value={broker.headquarters} />

                    <div className="border-b border-slate-200 py-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm font-medium text-slate-400">
                          التراخيص
                        </div>

                        {regulationItems.length ? (
                          <div className="flex flex-wrap justify-end gap-2 sm:max-w-[70%]">
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
                          <div className="text-right text-[15px] font-extrabold leading-tight text-slate-900 md:text-[18px]">
                            -
                          </div>
                        )}
                      </div>
                    </div>

                    <SummaryRow label="الدعم العربي" value={broker.arabic_support} />
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm">
                  {broker.expert_insight_ar ? (
                    <div className="min-h-[210px] rounded-[24px] border border-blue-200 bg-blue-50 p-4 shadow-sm">
                      <div className="text-xs font-bold uppercase tracking-wide text-blue-700">
                        رؤية تحليلية
                      </div>
                      <div className="mt-2 text-sm leading-7 text-slate-700">
                        {broker.expert_insight_ar}
                      </div>
                    </div>
                  ) : null}

                  <ShareButtons url={pageUrl} title={shareTitle} />
                </div>
              </aside>

              <div className="order-1 min-w-0 text-right lg:order-1">
                <div className="mb-3 hidden flex w-full flex-wrap items-center justify-start gap-2 md:flex">
                  <Chip tone="blue">تقييم شركة تداول</Chip>
                  <Chip tone="emerald">{verdictTone.badge}</Chip>

                  {broker.key_strength_ar ? (
                    <Chip tone="amber">نقطة قوة: {broker.key_strength_ar}</Chip>
                  ) : null}

                  {broker.key_weakness_ar ? (
                    <Chip tone="slate">ملاحظة: {broker.key_weakness_ar}</Chip>
                  ) : null}
                </div>

                <h1 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl md:text-5xl">
                  تقييم {broker.name} 2026
                </h1>

                <div className="mt-2 text-xs font-semibold text-slate-500">
                  محدث لعام 2026 • بناءً على شروط تداول فعلية
                </div>

                <div className="mt-4 flex w-full flex-col items-end gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
                  {renderStars(overallScore || broker.rating)}

                  <div
                    className={`inline-flex rounded-full border px-3 py-2 text-sm font-black ${verdictTone.color}`}
                  >
                    التقييم: {verdictTone.label}
                  </div>
                </div>

                <div className="mt-5 w-full text-[15px] leading-8 text-slate-600 md:min-h-[120px] md:text-base">
                  {brokerPositioning.split("||").map((line, i) => (
  <p key={i} className={i === 0 ? "mb-3" : ""}>
    {line}
  </p>
))}
                </div>

                <div className="mt-4 flex w-full flex-wrap items-center justify-start gap-2">
                  <span className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                    مناسب للمتداولين النشطين
                  </span>

                  <span className="text-sm font-semibold text-slate-600">
                    قد لا يناسب المبتدئين
                  </span>
                </div>

                {(whoShouldUse.length > 0 || whoShouldAvoid.length > 0) ? (
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <div className="h-full min-h-[170px] rounded-[24px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 text-right shadow-sm">
                      <div className="mb-2 text-sm font-black text-emerald-800">
                        مناسب أكثر لـ
                      </div>

                      {whoShouldUse.length ? (
                        <div className="flex flex-wrap justify-start gap-2">
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
                        <p className="text-sm text-slate-500">لا توجد بيانات متاحة.</p>
                      )}
                    </div>

                    <div className="h-full min-h-[170px] rounded-[24px] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 text-right shadow-sm">
                      <div className="mb-2 text-sm font-black text-amber-800">
                        قد لا يناسب
                      </div>

                      {whoShouldAvoid.length ? (
                        <div className="flex flex-wrap justify-start gap-2">
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
                        <p className="text-sm text-slate-500">لا توجد بيانات متاحة.</p>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <QuickStat
                    label="التقييم العام"
                    value={overallScore || broker.rating || "-"}
                    accent="blue"
                  />

                  <QuickStat
                    label="الحد الأدنى للإيداع"
                    value={formatMoney(broker.min_deposit)}
                    accent="emerald"
                  />

                  <QuickStat
                    label="أقصى رافعة مالية"
                    value={broker.max_leverage || "-"}
                    accent="amber"
                  />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
                  <a
                    href={`/go/${broker.slug}?type=real`}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 sm:w-auto sm:min-w-[170px] md:text-base"
                  >
                    فتح حساب حقيقي
                  </a>

                  <a
                    href={`/go/${broker.slug}?type=demo`}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50 sm:w-auto sm:min-w-[170px] md:text-base"
                  >
                    فتح حساب تجريبي
                  </a>

                  <a
                    href={`/go/${broker.slug}?type=mt5`}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50 sm:w-auto sm:min-w-[170px] md:text-base"
                  >
                    تحميل MT5
                  </a>

                  <a
                    href={`/go/${broker.slug}?type=mt4`}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50 sm:w-auto sm:min-w-[170px] md:text-base"
                  >
                    تحميل MT4
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


<div className="mt-6 grid min-w-0 gap-8">
  <div className="min-w-0 space-y-8">

    <SectionCard
      title="تفصيل التقييم"
      id="scores"
    >
      <div className="mb-6 overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-sm">
        <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
          <div className="flex flex-col justify-center border-b border-slate-200 p-6 text-center md:border-b-0 md:border-l">
            <div className="text-xs font-black uppercase tracking-wide text-blue-700">
              التقييم العام
            </div>

            <div className="mt-3 flex items-end justify-center gap-2">
              <span className="text-5xl font-black leading-none text-slate-950">
                {overallScore || broker.rating || "-"}
              </span>
              <span className="text-sm font-bold text-blue-700">/ 5</span>
            </div>

            <div className="mt-3 inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-black text-blue-700">
              {verdictTone.label}
            </div>
          </div>

          <div className="p-6 text-right md:p-7">
            <div className="text-lg font-black text-slate-950 md:text-xl">
              ملخص التحليل
            </div>

            <p className="mt-3 w-full text-sm leading-8 text-slate-700 md:text-base">
              يعكس هذا التقييم التوازن العام بين قوة التراخيص، تكاليف التداول، جودة المنصات، تجربة الإيداع والسحب، ومستوى دعم العملاء لدى {broker.name}.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div className="text-xs font-bold text-slate-500">جودة التراخيص</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  {broker.regulation_short || "غير محدد"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div className="text-xs font-bold text-slate-500">الحد الأدنى للإيداع</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  {formatMoney(broker.min_deposit)}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div className="text-xs font-bold text-slate-500">منصات التداول</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  {broker.platforms || "غير محدد"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <ScoreBar label="الأمان والتراخيص" value={broker.score_safety} />
        <ScoreBar label="الرسوم والسبريد" value={broker.score_fees} />
        <ScoreBar label="منصات التداول" value={broker.score_platforms} />
        <ScoreBar label="الإيداع والسحب" value={broker.score_deposit} />
        <ScoreBar label="دعم العملاء" value={broker.score_support} />
      </div>
    </SectionCard>

    {/* Mobile */}
    <div className="grid gap-6 md:hidden">
      <ChecklistSection title="أبرز المميزات" items={pros} type="pros" />
      <ChecklistSection title="أبرز العيوب" items={cons} type="cons" />
    </div>

    {/* Desktop */}
    <div className="hidden gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
      <section className="rounded-[28px] border border-slate-200 bg-white text-right shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-950">
                أبرز المميزات
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                أهم نقاط القوة التي تجعل {broker.name} خيارًا مناسبًا لبعض المتداولين.
              </p>
            </div>

            <div className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-full bg-emerald-50 px-3 text-sm font-black text-emerald-700">
              {pros.length}
            </div>
          </div>
        </div>

        <div className="p-6 lg:min-h-[264px]">
          {pros.length ? (
            <div className="space-y-3">
              {pros.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-right transition duration-200 hover:border-emerald-200 hover:bg-white hover:shadow-sm"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                    ✓
                  </div>

                  <div className="min-w-0">
                    <p className="text-[15px] leading-7 text-slate-700 text-right">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">لا توجد بيانات متاحة حاليًا.</p>
          )}
        </div>
      </section>

  <section className="rounded-[28px] border border-slate-200 bg-white text-right shadow-sm">
  <div className="border-b border-slate-200 px-6 py-5">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-950">
          أبرز العيوب
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          أهم النقاط التي يجب الانتباه لها قبل فتح حساب لدى {broker.name}.
        </p>
      </div>

      <div className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-full bg-rose-50 px-3 text-sm font-black text-rose-700">
        {cons.length}
      </div>
    </div>
  </div>

  <div className="p-6">
    {cons.length ? (
      <div className="space-y-3">
        {cons.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-right transition duration-200 hover:border-rose-200 hover:bg-transparent hover:shadow-sm"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-black text-rose-700">
              –
            </div>

            <div className="min-w-0">
              <p className="text-[15px] leading-7 text-slate-700 text-right">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-slate-500">لا توجد بيانات متاحة حاليًا.</p>
    )}
  </div>
</section>

</div>

<SectionCard
  title="أنواع الحسابات"
  subtitle={`نظرة عملية على أنواع الحسابات المتاحة لدى ${broker.name}، مع أهم الفروقات بين كل حساب.`}
  id="accounts"
>
  <div className="space-y-6">

    {/* Mobile */}
    <div className="grid grid-cols-2 gap-3 md:hidden">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-4 text-center">
          <div className="text-xs font-bold text-slate-500">عدد الحسابات</div>
          <div className="mt-2 text-2xl font-black text-slate-950">
            {accountCount || "-"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-4 text-center">
          <div className="text-xs font-bold text-slate-500">أقل إيداع</div>
          <div className="mt-2 text-2xl font-black text-slate-950">
            {lowestDeposit?.raw || broker.min_deposit || "-"}
          </div>
        </div>
      </div>
    </div>

    {/* Desktop */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[280px_minmax(0,1fr)]">

          <div className="border-b border-slate-200 bg-slate-50 p-6 text-right xl:border-b-0 xl:border-l">
            <div className="text-xs font-black tracking-[0.12em] text-blue-700">
              ملخص الحسابات
            </div>

            <div className="mt-5">
              <div className="text-5xl font-black leading-none text-slate-950">
                {accountCount || "-"}
              </div>
              <div className="mt-2 text-sm font-medium text-slate-500">
                عدد الحسابات المتاحة
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  أقل إيداع
                </div>
                <div className="mt-1 text-lg font-black text-slate-950">
                  {lowestDeposit?.raw || broker.min_deposit || "-"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  أقل سبريد
                </div>
                <div className="mt-1 text-lg font-black text-slate-950">
                  {lowestSpread?.spread || broker.spreads || "-"}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 text-right xl:p-7">
            <div className="text-xl font-black text-slate-950">
              مقارنة الحسابات
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-8 text-slate-600">
              قارن بين فروقات الأسعار، العمولات، الحد الأدنى للإيداع، ونوع التنفيذ لكل حساب لمعرفة الأنسب لك.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold text-slate-500">
                  أقل إيداع
                </div>
                <div className="mt-2 text-base font-black text-slate-950">
                  {lowestDeposit?.name || "-"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold text-slate-500">
                  أقل سبريد
                </div>
                <div className="mt-2 text-base font-black text-slate-950">
                  {lowestSpread?.account_name || "-"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold text-slate-500">
                  عدد حسابات العمولة
                </div>
                <div className="mt-2 text-base font-black text-slate-950">
                  {commissionAccounts.length || "0"}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <p className="leading-8 text-slate-700">
      توفر {broker.name} عدة أنواع من الحسابات تناسب مختلف فئات المتداولين، بدءًا من الحسابات البسيطة للمبتدئين وصولًا إلى الحسابات الاحترافية ذات السبريد المنخفض أو العمولات.
    </p>

    <MobileAccountAccordion accounts={accountsData} />

    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm text-right">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 font-black text-slate-900">نوع الحساب</th>
                <th className="p-4 text-center font-black text-slate-900">السبريد</th>
                <th className="p-4 text-center font-black text-slate-900">العمولة</th>
                <th className="p-4 text-center font-black text-slate-900">أقل إيداع</th>
                <th className="p-4 text-center font-black text-slate-900">نوع التنفيذ</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {accountsData.length ? (
                accountsData.map((acc, index) => (
                  <tr
                    key={acc.id}
                    className={`border-t border-slate-200 ${
                      index === 0
                        ? "bg-blue-50/40"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50/40"
                    }`}
                  >
                    <td className="p-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span className="font-bold text-blue-900">
                          {acc.account_name || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-center">{acc.spread || "-"}</td>
                    <td className="p-4 text-center">{acc.commission || "-"}</td>
                    <td className="p-4 text-center">{acc.min_deposit || "-"}</td>
                    <td className="p-4 text-center">{acc.execution_type || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-5 text-center text-slate-500">
                    لا توجد بيانات حسابات متاحة حاليًا.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div className="hidden md:block">
  <div className="mt-4 overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 p-6 shadow-sm">

    <div className="flex items-center justify-between gap-6">

      {/* Text */}
      <div>
        <div className="text-lg font-black text-slate-900">
          ابدأ التداول مع {broker.name} الآن
        </div>
        <p className="mt-1 text-sm leading-7 text-slate-600">
          اختر الحساب المناسب لك وابدأ فتح حساب حقيقي خلال دقائق.
        </p>
      </div>

      {/* Button */}
      <a
        href={`/go/${broker.slug}?type=real`}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="flex min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
      >
        فتح حساب حقيقي
      </a>

    </div>

  </div>
</div>

  </div>
</SectionCard>

      <SectionCard title="الإيداع والسحب">
  <div className="space-y-6">

    {/* Mobile */}
    {payments.length ? (
      <div className="grid gap-3 md:hidden md:grid-cols-2 xl:grid-cols-3">
        {payments.map((item, i) => (
          <div
            key={i}
            className="flex flex-row-reverse items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
            <span className="text-[13px] leading-6 text-slate-700 md:text-base md:leading-8">
              {item}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-right text-slate-500 md:hidden">
        لا توجد بيانات متاحة حاليًا.
      </p>
    )}

    {/* Desktop */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">

          <div className="border-b border-slate-200 bg-slate-50 p-5 text-right xl:border-b-0 xl:border-l">
            <div className="text-xs font-black tracking-[0.12em] text-blue-700">
              نظرة عامة على التمويل
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  طرق الدفع
                </div>
                <div className="mt-2 text-4xl font-extrabold text-slate-950">
                  {paymentMethods.length || "-"}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  سرعة السحب
                </div>
                <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                  {withdrawalSpeed || "لا توجد بيانات"}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 text-right xl:p-7">
            <div className="text-2xl font-extrabold text-slate-950">
              تفاصيل الإيداع والسحب
            </div>

            <p className="mt-4 w-full text-sm leading-8 text-slate-700 md:text-base">
              {depositSummary || "لا توجد معلومات كافية حاليًا حول الإيداع والسحب."}
            </p>

            <div className="mt-5">
              <div className="text-sm font-semibold text-slate-900">
                طرق الدفع المتاحة
              </div>

              {paymentMethods.length ? (
                <div className="mt-3 flex w-full flex-wrap justify-start gap-2 text-right">
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
                <div className="mt-3 text-sm text-slate-500">
                  لا توجد بيانات متاحة.
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
  title="منصات التداول"
  subtitle={`نظرة شاملة على منصات التداول التي تقدمها ${broker.name} وتجربة الاستخدام.`}
  id="platforms"
>
  <div className="space-y-5">

    {/* Mobile */}
    {platformSummary ? (
      <div className="space-y-5 md:hidden">

        <div className="grid gap-4 md:grid-cols-2">

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1.5 bg-blue-500" />
            <div className="p-5 text-right">
              <div className="text-sm font-black text-slate-900">
                المنصات المتاحة
              </div>
              <div className="mt-3 text-sm leading-8 text-slate-700">
                {broker.platforms || "MT4 / MT5"}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1.5 bg-emerald-500" />
            <div className="p-5 text-right">
              <div className="text-sm font-black text-slate-900">
                مناسبة لـ
              </div>
              <div className="mt-3 text-sm leading-8 text-slate-700">
                {broker.best_for || "المبتدئين والمتداولين المتوسطين"}
              </div>
            </div>
          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right">
          <div className="text-sm font-black text-slate-900">
            تفاصيل إضافية
          </div>
          <div className="mt-3 text-sm leading-8 text-slate-700">
            {platformSummary}
          </div>
        </div>

      </div>
    ) : (
      <p className="text-right text-slate-500 md:hidden">
        لا توجد بيانات متاحة حاليًا.
      </p>
    )}

    {/* Desktop */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">

          <div className="border-b border-slate-100 bg-slate-50 p-5 text-right xl:border-b-0 xl:border-l">
            <div className="text-xs font-black tracking-[0.12em] text-blue-700">
              الوصول إلى المنصات
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  المنصات المتاحة
                </div>
                <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                  {availablePlatforms.length
                    ? availablePlatforms.join(" • ")
                    : broker.platforms || "لا توجد بيانات"}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  أدوات التداول
                </div>
                <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                  {platformTools.length
                    ? `${platformTools.length} أداة متاحة`
                    : "لا توجد بيانات"}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 text-right xl:p-7">
            <div className="text-2xl font-extrabold text-slate-950">
              تجربة منصات التداول
            </div>

            <p className="mt-4 w-full text-sm leading-8 text-slate-700 md:text-base">
              {platformSummary || "لا توجد معلومات كافية حول منصات التداول."}
            </p>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">

              <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <div className="text-sm font-semibold text-slate-800">
                  المنصات المتاحة
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
                  <div className="mt-3 text-sm text-slate-500">
                    لا توجد بيانات.
                  </div>
                )}
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-800">
                  أدوات التداول
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
                  <div className="mt-3 text-sm text-slate-500">
                    لا توجد بيانات.
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

<SectionCard
  title="التراخيص والأمان"
  subtitle={`نظرة على الوضع التنظيمي ومستوى حماية أموال العملاء لدى ${broker.name}.`}
  id="regulation"
>
  <div className="space-y-5">
    {/* Mobile */}
    <div className="grid gap-4 lg:grid-cols-3 md:hidden">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-5 text-center">
          <div className="mb-4 text-sm font-black text-slate-900 md:text-base">
            الجهات التنظيمية
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {splitText(broker.regulation).length ? (
              splitText(broker.regulation).map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700"
                >
                  {item}
                </span>
              ))
            ) : broker.regulation_short ? (
              <span className="inline-flex items-center rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                {broker.regulation_short}
              </span>
            ) : (
              <span className="text-sm text-slate-500">لا توجد بيانات متاحة</span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-emerald-500" />
        <div className="p-5 text-right">
          <div className="text-sm font-black text-slate-900 md:text-base">
            مستوى الأمان
          </div>
          <div className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
            {fundProtection || broker.safety || "لا توجد بيانات متاحة حاليًا."}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-amber-500" />
        <div className="p-5 text-right">
          <div className="text-sm font-black text-slate-900 md:text-base">
            ملخص سريع
          </div>
          <div className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
            {broker.regulation_short
              ? `تعمل ${broker.name} ضمن إطار تنظيمي يساعد على تعزيز الثقة والشفافية، لكن مستوى حماية المستثمر قد يختلف حسب الجهة التي يتم فتح الحساب من خلالها.`
              : `من الأفضل دائمًا التحقق من الجهة التنظيمية والكيان القانوني قبل فتح حساب تداول.`}
          </div>
        </div>
      </div>
    </div>

    {/* Desktop */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="border-b border-slate-100 bg-slate-50 p-5 text-right xl:border-b-0 xl:border-l">
            <div className="text-xs font-black tracking-[0.12em] text-blue-700">
              ملخص الأمان
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  الجهات الرقابية
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {regulationBodies.length ? (
                    regulationBodies.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex shrink-0 items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"
                      >
                        {item}
                      </span>
                    ))
                  ) : broker.regulation_short ? (
                    <span className="inline-flex shrink-0 items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                      {broker.regulation_short}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-500">لا توجد بيانات متاحة</span>
                  )}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  حماية أموال العملاء
                </div>
                <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">
                  {fundProtection || "لا توجد بيانات متاحة."}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 text-right xl:p-7">
            <div className="text-2xl font-extrabold tracking-tight text-slate-950">
              التنظيم وحماية المتداولين
            </div>

            <p className="mt-4 w-full text-sm leading-8 text-slate-700 md:text-base">
              {regulationSummary || "لا توجد بيانات متاحة حاليًا."}
            </p>

            <div className="mt-5">
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-800">
                  عوامل الأمان الرئيسية
                </div>

                {safetyFactors.length ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2" dir="rtl">
                    {safetyFactors.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-right"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.55)]" />
                        <span className="text-sm leading-6 text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 text-sm leading-7 text-slate-500">
                    لا توجد بيانات متاحة.
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


<SectionCard title="الخلاصة النهائية" id="verdict">
  <div className="space-y-5">
    {/* Mobile */}
    <div className="space-y-4 md:hidden">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-5 text-right">
          <div className="mb-3 text-sm font-black text-slate-900">
            ملخص التقييم
          </div>
          <div className="text-sm leading-8 text-slate-700">
            {broker.final_verdict || "لا توجد بيانات متاحة حاليًا."}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
          <div className="mb-1 text-xs font-bold text-slate-500">
            التقييم العام
          </div>
          <div className="text-2xl font-black text-slate-950">
            {overallScore || broker.rating || "-"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
          <div className="mb-1 text-xs font-bold text-slate-500">
            الحكم النهائي
          </div>
          <div className="text-sm font-extrabold text-slate-900">
            {verdictTone.label}
          </div>
        </div>
      </div>

      {(broker.key_strength_ar || broker.key_weakness_ar) ? (
        <div className="grid gap-3">
          {broker.key_strength_ar ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-right">
              <div className="mb-1 text-xs font-bold tracking-wide text-emerald-700">
                نقطة القوة
              </div>
              <div className="text-sm font-semibold leading-7 text-slate-800">
                {broker.key_strength_ar}
              </div>
            </div>
          ) : null}

          {broker.key_weakness_ar ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-right">
              <div className="mb-1 text-xs font-bold tracking-wide text-amber-700">
                أهم ملاحظة
              </div>
              <div className="text-sm font-semibold leading-7 text-slate-800">
                {broker.key_weakness_ar}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>

    {/* Desktop */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="border-b border-slate-100 bg-slate-50 p-5 text-right xl:border-b-0 xl:border-l">
            <div className="text-xs font-black tracking-[0.12em] text-blue-700">
              ملخص القرار
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  التقييم العام
                </div>
                <div className="mt-2 text-4xl font-extrabold leading-none tracking-tight text-slate-950">
                  {overallScore || broker.rating || "-"}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-bold text-slate-500">
                  الحكم
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
                  className="flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-extrabold text-white shadow-md transition hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                >
                  فتح حساب تداول
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 text-right xl:p-7">
            <div className="text-2xl font-extrabold tracking-tight text-slate-950">
              هل تستحق {broker.name} التجربة؟
            </div>

            <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 shadow-sm">
              <div className="text-base leading-9 text-slate-700">
                {broker.final_verdict || "لا توجد بيانات متاحة حاليًا."}
              </div>
            </div>

            {(broker.key_strength_ar || broker.key_weakness_ar || broker.expert_insight_ar) ? (
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                  {broker.key_strength_ar ? (
                    <div className="min-h-[140px] rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-4 shadow-sm">
                      <div className="text-xs font-bold tracking-wide text-emerald-700">
                        نقطة القوة
                      </div>
                      <div className="mt-2 text-sm font-semibold leading-7 text-slate-800">
                        {broker.key_strength_ar}
                      </div>
                    </div>
                  ) : null}

                  {broker.key_weakness_ar ? (
                    <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-4 py-4 shadow-sm">
                      <div className="text-xs font-bold tracking-wide text-amber-700">
                        أهم ملاحظة
                      </div>
                      <div className="mt-2 text-sm font-semibold leading-7 text-slate-800">
                        {broker.key_weakness_ar}
                      </div>
                    </div>
                  ) : null}
                </div>

                {broker.expert_insight_ar ? (
                  <div className="rounded-[22px] border border-blue-200 bg-blue-50 px-5 py-5 shadow-sm">
                    <div className="text-xs font-bold tracking-wide text-blue-700">
                      رأي تحليلي
                    </div>
                    <div className="mt-2 text-sm leading-8 text-slate-700">
                      {broker.expert_insight_ar}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <p className="mt-5 text-sm leading-8 text-slate-600">
              تساعد هذه الخلاصة في تقييم {broker.name} من حيث الأمان، الرسوم، منصات التداول، الحسابات، وتجربة الإيداع والسحب قبل اتخاذ قرار فتح حساب تداول.
            </p>
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
      <summary className="cursor-pointer list-none px-4 py-4 text-center text-sm font-extrabold text-blue-600">
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
      <summary className="cursor-pointer list-none px-5 py-4 text-center text-sm font-extrabold text-blue-600">
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
    title={`مقارنة ${broker.name || broker.name_en} مع شركات أخرى`}
  >
    {relatedBrokers.length ? (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {relatedBrokers.map((item) => (
          <Link
            key={item.id}
            href={`/compare/${broker.slug}-vs-${item.slug}`}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            {/* Top logos */}
            <div className="mb-5 flex items-center justify-between gap-4">

              {/* Current broker */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  {broker.logo ? (
                    <img
                      src={broker.logo}
                      alt={broker.name || "شعار الشركة"}
                      className="max-h-14 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">لا يوجد شعار</span>
                  )}
                </div>

                <div className="mt-2 text-sm font-bold text-slate-900">
                  {broker.name || broker.name_en}
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
                      alt={item.name || "شعار الشركة"}
                      className="max-h-14 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">لا يوجد شعار</span>
                  )}
                </div>

                <div className="mt-2 text-sm font-bold text-slate-900">
                  {item.name || item.name_en}
                </div>
              </div>

            </div>

            {/* Title */}
            <div className="text-lg font-extrabold text-slate-900 text-center">
              مقارنة {broker.name || broker.name_en} مع {item.name || item.name_en}
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-slate-600 text-center leading-7">
              اكتشف الفروقات بين {broker.name || broker.name_en} و {item.name || item.name_en} من حيث التراخيص،
              الرسوم، الحد الأدنى للإيداع، منصات التداول، ومدى ملاءمة كل شركة لأنواع مختلفة من المتداولين.
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
              <span className="text-sm text-slate-500">
                تقييم {item.name || item.name_en}
              </span>

              <span className="text-sm font-extrabold text-slate-900">
                {item.rating ?? "-"} / 5
              </span>
            </div>

            {/* CTA */}
            <div className="mt-4 text-sm font-extrabold text-emerald-700 text-center transition group-hover:text-emerald-800">
              عرض المقارنة →
            </div>

          </Link>
        ))}
      </div>
    ) : (
      <p className="text-slate-500">لا توجد مقارنات متاحة حاليًا.</p>
    )}
  </SectionCard>
</div>
         
          </div>
        </div>
      </main>
    </>
  );
}