import { createClient } from "@/lib/supabase/server";
import Script from "next/script";
import Link from "next/link";
import ShareButtons from "@/app/components/ShareButtons";
import ExpandableText from "@/app/components/ExpandableText";

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

  const title = broker.meta_title_en || broker.meta_title || `${broker.name} Review 2026 | Broker Arab`;
  const description =
  broker.meta_description_en ||
  broker.meta_descr ||
  `Full review of ${broker.name} including fees, platforms, regulation, and account types.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
  title,
  description,
  url: `${siteUrl}/en/brokers/${broker.slug}`,
  siteName: "Broker Al Arab",
  locale: "en_US",
  type: "article",
  images: [
    {
      url: `${siteUrl}/brokers/${broker.slug}/opengraph-image?v=2`,
      width: 1200,
      height: 630,
      alt: `Review ${broker.name}`,
    },
  ],
},

twitter: {
  card: "summary_large_image",
  title,
  description,
  images: [`${siteUrl}/brokers/${broker.slug}/opengraph-image?v=2`],
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
      label: "Excellent",
      badge: "Strong choice",
      color: "border-blue-200 bg-blue-50 text-blue-700",
      accent: "from-blue-600 via-blue-500 to-cyan-400",
    };
  }

  if ((score ?? 0) >= 4) {
    return {
      label: "Very Good",
      badge: "Well-rated",
      color: "border-blue-200 bg-blue-50 text-blue-700",
      accent: "from-blue-500 via-sky-400 to-cyan-400",
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
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-600">{label}</span>
        <span className="text-sm font-extrabold text-slate-900">
          {value ?? "-"} / 5
        </span>
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

function SectionNav() {
  const links = [
    { href: "#summary", label: "Overview" },
    { href: "#scores", label: "Rating" },
    { href: "#accounts", label: "Accounts" },
    { href: "#fees", label: "Fees" },
    { href: "#platforms", label: "Platforms" },
    { href: "#regulation", label: "Regulation" },
    { href: "#verdict", label: "Final Verdict" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <div className="mb-8 hidden flex-wrap gap-3 md:flex">
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

      

function renderStars(rating: number | null) {
  if (!rating) return null

  const rounded = Math.round(rating * 2) / 2
  const full = Math.floor(rounded)
  const half = rounded % 1 !== 0
  const empty = 5 - full - (half ? 1 : 0)

return (
  <div
    className="flex items-center gap-2 px-3 py-1 rounded-md"
    style={{
      background: "#0f172a",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "18px"
    }}
  >
    {/* النجمة قبل التقييم */}
    <span style={{ color: "#f59e0b", fontSize: "20px" }}>★</span>

    {/* النجوم */}
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

    {/* الرقم */}
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
}: {
  accounts: BrokerAccount[];
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
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
            <div className="min-w-0">
              <div className="text-base font-black text-slate-900">
                {acc.account_name || "-"}
              </div>
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
  
  const pros = splitText(broker.pros_en || broker.pros);
  const cons = splitText(broker.cons_en || broker.cons);
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
  const commission = (acc.commission || "").trim().toLowerCase();

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
  const commission = (acc.commission || "").trim().toLowerCase();

  return !(
    !commission ||
    commission === "-" ||
    commission === "$0" ||
    commission === "0" ||
    commission === "0$" ||
    commission.includes("no")
  );
});

    const faqItems = [
    {
      q: `Is ${broker.name_en || broker.name} a trustworthy broker?`,
      a: `${broker.name_en || broker.name} is considered a recognized broker in the trading industry, and its evaluation depends on regulation, fees, and overall user experience as shown on this page.`,
    },
    {
      q: `Does ${broker.name_en || broker.name} offer an Islamic account?`,
      a: broker.islamic_account
        ? `Based on the available information, ${broker.name_en || broker.name} offers an Islamic account option for traders who need this type of account.`
        : `Please review the broker’s latest terms to confirm whether an Islamic account is available in your country.`,
    },
    {
      q: `What is the minimum deposit at ${broker.name_en || broker.name}?`,
      a: `The minimum deposit at ${broker.name_en || broker.name} starts from ${broker.min_deposit ?? "-"} according to the current data on this page.`,
    },
    {
      q: `Does ${broker.name_en || broker.name} support MT4 and MT5?`,
      a: `${broker.name_en || broker.name} supports trading platforms such as ${broker.platforms || "the platforms listed by the broker"}, and you can review the platform details section for more information.`,
    },
    {
      q: `Is ${broker.name_en || broker.name} suitable for Arabic-speaking traders?`,
      a:
        broker.support_en ||
        broker.arab_traders ||
        `You can review the support and platform sections on this page to see whether this broker is suitable for Arabic-speaking traders.`,
    },
  ];

  const faqSchema = faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  }));

  const siteUrl = "https://brokeralarab.com";
  const pageUrl = `${siteUrl}/en/brokers/${broker.slug}`;
const shareTitle = `${broker.name_en || broker.name} Review | Broker Arab`;

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
  url: `https://brokeralarab.com/en/brokers/${broker.slug}`,
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
            <main dir="ltr" className="mx-auto w-full max-w-7xl px-3 py-8 text-left sm:px-4 md:py-10">
        <div className="mb-4 text-sm text-slate-500">
          <Link href="/en/brokers" className="hover:text-slate-700">
            Reviews
          </Link>
          <span className="mx-2">/</span>
          <span>{broker.name_en || broker.name} Review</span>
        </div>

        <section className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm md:rounded-[32px]">
  <div
    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${verdictTone.accent}`}
  />

  <div className="p-4 md:p-7">
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-6">
      
      <aside className="order-1 hidden space-y-4 text-left lg:order-2 lg:block">
<div className="flex h-[120px] items-center justify-center overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 md:h-[150px]">
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

                <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 md:rounded-[24px]">
          <div className="mb-3 text-sm font-black text-slate-900">
            Quick Facts
          </div>

          <div className="space-y-1">
            <SummaryRow label="Founded" value={broker.founded_year} />
            <SummaryRow label="Headquarters" value={broker.headquarters_en || broker.headquarters} />
            <SummaryRow label="Regulation" value={broker.regulation_short} />
            <SummaryRow label="Arabic Support" value={broker.arabic_support} />
          </div>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-white p-4 md:rounded-[24px]">
          <ShareButtons url={pageUrl} title={shareTitle} />
        </div>
      </aside>

            <div className="order-2 min-w-0 text-left lg:order-1">
        <div className="mb-3 hidden flex-wrap items-center gap-2 md:flex">
          <Chip tone="blue">Broker Review</Chip>
          <Chip tone="emerald">{verdictTone.badge}</Chip>
          {broker.best_for_en || broker.best_for ? (
            <Chip tone="amber">Best for: {broker.best_for_en || broker.best_for}</Chip>
          ) : null}
        </div>

        <h1 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl md:text-5xl">
          {broker.name_en || broker.name} Review 2026
        </h1>

        <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {renderStars(overallScore || broker.rating)}
          <div
            className={`inline-flex rounded-full border px-3 py-2 text-sm font-black ${verdictTone.color}`}
          >
            Rating: {verdictTone.label}
          </div>
        </div>

        <div className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-600 md:text-base">
          <ExpandableText
            text={
              broker.intro_en ||
              broker.intro ||
              `This page reviews ${broker.name_en || broker.name} in terms of regulation, fees, account types, platforms, and customer support.`
            }
          />
        </div>

                <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 md:text-sm">
            Beginner friendly
          </span>

          {broker.islamic_account ? (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 md:text-sm">
              Islamic account
            </span>
          ) : null}

          {broker.spreads_en || broker.spreads ? (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 md:text-sm">
              Competitive spreads
            </span>
          ) : null}
        </div>

               <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <QuickStat
            label="Overall Rating"
            value={overallScore || broker.rating || "-"}
            accent="blue"
          />
          <QuickStat
            label="Min Deposit"
            value={formatMoney(broker.min_deposit)}
            accent="emerald"
          />
          <QuickStat
            label="Max Leverage"
            value={broker.max_leverage || "-"}
            accent="amber"
          />
          <QuickStat
            label="Islamic Account"
            value={broker.islamic_account}
            accent="slate"
          />
        </div>

               <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-start">
          <a
            href={`/go/${broker.slug}?type=real`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 sm:w-auto sm:min-w-[170px] md:text-base"
          >
            Open Real Account
          </a>

          <a
            href={`/go/${broker.slug}?type=demo`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 sm:w-auto sm:min-w-[170px] md:text-base"
          >
            Open Demo Account
          </a>

          <a
            href={`/go/${broker.slug}?type=mt5`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50 sm:w-auto sm:min-w-[170px] md:text-base"
          >
            Download MT5
          </a>

          <a
            href={`/go/${broker.slug}?type=mt4`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-50 sm:w-auto sm:min-w-[170px] md:text-base"
          >
            Download MT4
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

        <div className="mt-8 min-w-0">
  <SectionNav />
</div>

<div className="grid min-w-0 gap-8">
  <div className="min-w-0 space-y-8">
                        <SectionCard
              title="Quick Overview"
              subtitle="A direct look at the key details most traders check before opening an account."
              id="summary"
            >
              <div className="grid min-w-0 gap-4 lg:grid-cols-2">
                <div className="rounded-[20px] border border-slate-200 bg-white p-2.5 md:p-6">
  {/* Mobile */}
    <div className="grid min-w-0 grid-cols-2 gap-2 md:hidden">
    <MiniInfoCard label="Founded" value={broker.founded_year} tone="blue" />
    <MiniInfoCard label="HQ" value={broker.headquarters_en || broker.headquarters} tone="emerald" />
    <MiniInfoCard label="Rating" value={overallScore || broker.rating} tone="amber" />
    <MiniInfoCard
      label="Deposit"
      value={formatMoney(broker.min_deposit)}
      tone="violet"
    />
  </div>

  {/* Desktop */}
    <div className="hidden md:block">
    <SummaryRow label="Broker Name" value={broker.name_en || broker.name} />
    <SummaryRow label="Founded" value={broker.founded_year} />
    <SummaryRow label="Headquarters" value={broker.headquarters_en || broker.headquarters} />
    <SummaryRow label="Overall Rating" value={overallScore || broker.rating} />
    <SummaryRow label="Min Deposit" value={formatMoney(broker.min_deposit)} />
    <SummaryRow label="Max Leverage" value={broker.max_leverage} />
  </div>
</div>

                               <div className="min-w-0 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <SummaryRow label="Platforms" value={broker.platforms} />
                  <SummaryRow label="Regulation" value={broker.regulation_short} />
                  <SummaryRow label="Islamic Account" value={broker.islamic_account} />
                  <SummaryRow label="Arabic Support" value={broker.arabic_support} />
                  <SummaryRow label="Best For" value={broker.best_for_en || broker.best_for} />
                </div>
              </div>

                            <div className="hidden rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:block">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Quick Facts</h3>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    Key Information
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-1.5 bg-blue-500" />
                    <div className="flex min-h-[120px] flex-col items-center justify-center px-4 py-5 text-center">
                      <div className="mb-2 text-xs font-bold text-slate-500 md:text-sm">Headquarters</div>
                      <div className="text-lg font-black text-slate-900 md:text-2xl break-words">
                        {broker.headquarters_en || broker.headquarters || "-"}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-1.5 bg-emerald-500" />
                    <div className="flex min-h-[120px] flex-col items-center justify-center px-4 py-5 text-center">
                      <div className="mb-2 text-xs font-bold text-slate-500 md:text-sm">Founded</div>
                      <div className="text-lg font-black text-slate-900 md:text-2xl break-words">
                        {broker.founded_year || "-"}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-1.5 bg-amber-500" />
                    <div className="flex min-h-[120px] flex-col items-center justify-center px-4 py-5 text-center">
                      <div className="mb-2 text-xs font-bold text-slate-500 md:text-sm">Min Deposit</div>
                      <div className="text-lg font-black text-slate-900 md:text-2xl break-words">
                        {formatMoney(broker.min_deposit)}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-1.5 bg-slate-500" />
                    <div className="flex min-h-[120px] flex-col items-center justify-center px-4 py-5 text-center">
                      <div className="mb-2 text-xs font-bold text-slate-500 md:text-sm">Max Leverage</div>
                      <div className="text-lg font-black text-slate-900 md:text-2xl break-words">
                        {broker.max_leverage || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

                        <SectionCard
              title="Detailed Rating"
              subtitle="This score combines safety, fees, platforms, deposit and withdrawal experience, and customer support."
              id="scores"
            >
              <div className="mb-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                                        <div className="text-sm font-bold text-emerald-700">
                      Final Score
                    </div>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-5xl font-black text-slate-950">
                        {overallScore || broker.rating || "-"}
                      </span>
                      <span className="mb-2 text-sm font-bold text-emerald-700">
                        / 5
                      </span>
                    </div>
                  </div>

                                    <div className="mx-auto max-w-3xl text-center text-sm leading-8 text-slate-700 md:text-base">
                    {broker.name_en || broker.name} received a{" "}
                    <span className="font-black text-slate-950">
                      {verdictTone.label}
                    </span>{" "}
                    rating based on regulation quality, fee structure, platform experience, deposit and withdrawal ease, and customer support.
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
            </SectionCard>

                        <div className="grid gap-6 lg:grid-cols-2">
              <ChecklistSection title="Main Advantages" items={pros} type="pros" />
              <ChecklistSection title="Main Disadvantages" items={cons} type="cons" />
            </div>

                        <SectionCard
  title="Account Types"
  subtitle={`A practical overview of the account types available at ${broker.name_en || broker.name}, including the key details of each account.`}
  id="accounts"
>
  <div className="space-y-6">
       <div className="grid grid-cols-2 gap-3 md:hidden">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-4 text-center">
          <div className="text-xs font-bold text-slate-500">Accounts</div>
          <div className="mt-2 text-2xl font-black text-slate-950">
            {accountCount || "-"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-emerald-500" />
        <div className="p-4 text-center">
          <div className="text-xs font-bold text-slate-500">Lowest Deposit</div>
          <div className="mt-2 text-2xl font-black text-slate-950">
            {lowestDeposit?.raw || broker.min_deposit || "-"}
          </div>
        </div>
      </div>
    </div>

    <div className="hidden gap-4 md:grid-cols-2 xl:grid-cols-4 md:grid">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-5 text-center">
          <div className="text-xs font-bold text-slate-500 md:text-sm">
            Available Accounts
          </div>
          <div className="mt-3 text-3xl font-black text-slate-950">
            {accountCount || "-"}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Different account types for various trading styles
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-emerald-500" />
        <div className="p-5 text-center">
          <div className="text-xs font-bold text-slate-500 md:text-sm">
            Lowest Deposit
          </div>
          <div className="mt-3 text-3xl font-black text-slate-950">
            {lowestDeposit?.raw || broker.min_deposit || "-"}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {lowestDeposit?.name || "Depends on account type"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-amber-500" />
        <div className="p-5 text-center">
          <div className="text-xs font-bold text-slate-500 md:text-sm">
            Lowest Spread
          </div>
          <div className="mt-3 text-3xl font-black text-slate-950">
            {lowestSpread?.spread || broker.spreads_en || broker.spreads || "-"}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {lowestSpread?.account_name || "Depends on account type"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-slate-500" />
        <div className="p-5 text-center">
          <div className="text-xs font-bold text-slate-500 md:text-sm">
            Commission Structure
          </div>
          <div className="mt-3 text-xl font-black text-slate-950 md:text-2xl">
            {commissionAccounts.length
              ? `${commissionAccounts.length} commission accounts`
              : "No clear commission"}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {noCommissionAccounts.length
              ? `${noCommissionAccounts.length} no-commission accounts`
              : "Check account details"}
          </div>
        </div>
      </div>
    </div>

        <p className="leading-8 text-slate-700">
      {broker.name_en || broker.name} offers a range of account types designed for different trader profiles, from simple beginner-friendly accounts to lower-spread or commission-based accounts for more active traders.
    </p>

    {/* Mobile */}
<MobileAccountAccordion accounts={accountsData} />

{/* Desktop */}
<div className="hidden md:block">
  <div className="max-w-full overflow-x-auto rounded-[24px] border border-slate-200">
    <table className="w-full min-w-[820px] text-sm">
      <thead className="bg-slate-100">
                <tr>
          <th className="p-4 text-left font-black text-slate-900">
            Account Type
          </th>
          <th className="p-4 text-center font-black text-slate-900">
            Spread
          </th>
          <th className="p-4 text-center font-black text-slate-900">
            Commission
          </th>
          <th className="p-4 text-center font-black text-slate-900">
            Min Deposit
          </th>
          <th className="p-4 text-center font-black text-slate-900">
            Execution Type
          </th>
          <th className="p-4 text-center font-black text-slate-900">
            Best For
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {accountsData.length ? (
          accountsData.map((acc) => (
            <tr key={acc.id} className="border-t border-slate-200">
              <td className="p-4 font-black text-slate-900">
                {acc.account_name || "-"}
              </td>
              <td className="p-4 text-center text-slate-700">
                {acc.spread || "-"}
              </td>
              <td className="p-4 text-center text-slate-700">
  {acc.commission_en || acc.commission || "-"}
</td>
<td className="p-4 text-center text-slate-700">
  {acc.min_deposit_en || acc.min_deposit || "-"}
</td>
              <td className="p-4 text-center text-slate-700">
                {acc.execution_type || "-"}
              </td>
              <td className="p-4 text-center text-slate-700">
  {acc.best_for_en || acc.best_for || "-"}
</td>
            </tr>
          ))
        ) : (
          <tr>
                       <td colSpan={6} className="p-5 text-center text-slate-500">
              No account data is currently available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    <div className="hidden rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-sm leading-8 text-slate-700 md:block">
  <span className="font-black text-slate-900">Note:</span>{" "}
  Account details such as spreads, commissions, and minimum deposits may vary depending on the account type, regulatory entity, and geographic region, so it is always best to review the official terms before opening an account.
</div>
  </div>
</SectionCard>


<SectionCard title="Fees & Spreads" id="fees">
  <div className="space-y-6">
    <p className="text-sm leading-8 text-slate-700 md:text-base">
      This section highlights the spread and commission differences across {broker.name_en || broker.name} account types, helping you compare the actual trading cost of each account without repeating the execution and target-user details already covered above.
    </p>

    {/* Desktop summary cards only */}
        <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-5 text-center">
          <div className="text-xs font-bold text-slate-500 md:text-sm">
            Lowest Spread
          </div>
          <div className="mt-3 text-3xl font-black text-slate-950">
            {lowestSpread?.spread || broker.spreads_en || broker.spreads || "-"}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {lowestSpread?.account_name || "Depends on account type"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-emerald-500" />
        <div className="p-5 text-center">
          <div className="text-xs font-bold text-slate-500 md:text-sm">
            Lowest Deposit
          </div>
          <div className="mt-3 text-3xl font-black text-slate-950">
            {lowestDeposit?.raw || broker.min_deposit || "-"}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {lowestDeposit?.name || "Depends on account type"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-amber-500" />
        <div className="p-5 text-center">
          <div className="text-xs font-bold text-slate-500 md:text-sm">
            Commission Accounts
          </div>
          <div className="mt-3 text-3xl font-black text-slate-950">
            {commissionAccounts.length}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {commissionAccounts.length
              ? "Usually Raw / Zero"
              : "No clear commission"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-slate-500" />
        <div className="p-5 text-center">
          <div className="text-xs font-bold text-slate-500 md:text-sm">
            No-Commission Accounts
          </div>
          <div className="mt-3 text-3xl font-black text-slate-950">
            {noCommissionAccounts.length}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {noCommissionAccounts.length
              ? "Cost included in spread"
              : "Check account details"}
          </div>
        </div>
      </div>
    </div>

    {/* Mobile summary only */}
       <div className="grid grid-cols-2 gap-3 md:hidden">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-4 text-center">
          <div className="text-xs font-bold text-slate-500">Lowest Spread</div>
          <div className="mt-2 text-2xl font-black text-slate-950">
            {lowestSpread?.spread || broker.spreads_en || broker.spreads || "-"}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {lowestSpread?.account_name || "Depends on account type"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-emerald-500" />
        <div className="p-4 text-center">
          <div className="text-xs font-bold text-slate-500">Commission Accounts</div>
          <div className="mt-2 text-2xl font-black text-slate-950">
            {commissionAccounts.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {commissionAccounts.length
              ? "Usually Raw / Zero"
              : "No clear commission"}
          </div>
        </div>
      </div>
    </div>

    {/* Mobile accordion only */}
    <div className="md:hidden">
      {accountsData.length ? (
        <MobileFeesAccordion accounts={accountsData} />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-slate-500">
         No fee data is currently available.
        </div>
      )}
    </div>

    {/* Desktop compact table only */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[24px] border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
                        <tr>
              <th className="p-4 text-left font-black text-slate-900">
                Account Type
              </th>
              <th className="p-4 text-center font-black text-slate-900">
                Spread
              </th>
              <th className="p-4 text-center font-black text-slate-900">
                Commission
              </th>
              <th className="p-4 text-center font-black text-slate-900">
                Min Deposit
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {accountsData.length ? (
              accountsData.map((acc) => (
                <tr key={acc.id} className="border-t border-slate-200">
                  <td className="p-4 font-black text-slate-900">
                    {acc.account_name || "-"}
                  </td>
                  <td className="p-4 text-center text-slate-700">
                    {acc.spread || "-"}
                  </td>
                 <td className="p-4 text-center text-slate-700">
  {acc.commission_en || acc.commission || "-"}
</td>
<td className="p-4 text-center text-slate-700">
  {acc.min_deposit_en || acc.min_deposit || "-"}
</td>
                </tr>
              ))
            ) : (
              <tr>
                                <td colSpan={4} className="p-5 text-center text-slate-500">
                  No fee data is currently available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Desktop note only */}
        <div className="hidden rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-sm leading-8 text-slate-700 md:block">
      <span className="font-black text-slate-900">Summary:</span>{" "}
      Accounts without a separate commission usually include their cost inside the spread, while lower-spread accounts such as Raw or Zero may apply a separate commission. That is why comparing
      <span className="font-black text-slate-900">
        {" "}
        spread + commission + minimum deposit{" "}
      </span>
      together is more useful than looking at spreads alone.
      {broker.fees_en || broker.fees ? (
        <>
          <br />
          <span className="font-black text-slate-900">Additional note:</span>{" "}
          {broker.fees_en || broker.fees}
        </>
      ) : null}
    </div>
  </div>
</SectionCard>

                    <SectionCard title="Deposits & Withdrawals">
  {payments.length ? (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {payments.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
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

<SectionCard
  title="Platform Details"
  subtitle={`A closer look at the platforms offered by ${broker.name_en || broker.name} and the overall trading experience for both beginners and advanced traders.`}
  id="platforms"
>
    {broker.platform_details_en || broker.platform_details ? (
    <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1.5 bg-blue-500" />
          <div className="p-5">
            <div className="text-sm font-black text-slate-900 md:text-base">
              Available Platforms
            </div>
            <div className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
              {broker.platforms || "MT4 / MT5"}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1.5 bg-emerald-500" />
          <div className="p-5">
            <div className="text-sm font-black text-slate-900 md:text-base">
              Best For
            </div>
            <div className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
              {broker.best_for_en || broker.best_for || "Beginner and intermediate traders looking for familiar platforms"}
            </div>
          </div>
        </div>
      </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-sm font-black text-slate-900 md:text-base">
          Additional Details
        </div>
        <div className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
          {broker.platform_details_en || broker.platform_details}
        </div>
      </div>
    </div>
  ) : (
    <p className="text-slate-500">No data is currently available.</p>
  )}
</SectionCard>

<SectionCard
  title="Regulation & Safety"
  subtitle={`An overview of the regulatory standing and safety considerations for ${broker.name_en || broker.name}.`}
  id="regulation"
>
  <div className="space-y-6">
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />

        <div className="p-5 text-center">
          <div className="mb-4 text-sm font-black text-slate-900 md:text-base">
            Regulatory Bodies
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
              <span className="text-sm text-slate-500">
                No data available
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-emerald-500" />
        <div className="p-5">
          <div className="text-sm font-black text-slate-900 md:text-base">
            Safety Level
          </div>
          <div className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
            {broker.safety_en || broker.safety || "No data is currently available."}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-amber-500" />
        <div className="p-5">
          <div className="text-sm font-black text-slate-900 md:text-base">
            Summary
          </div>
          <div className="mt-3 text-sm leading-8 text-slate-700 md:text-base">
            {broker.regulation_short
              ? `${broker.name_en || broker.name} operates under recognized regulatory oversight, which is generally a positive sign for traders who care about safety and transparency.`
              : `It is always recommended to verify the exact regulatory entity and jurisdiction before opening an account.`}
          </div>
        </div>
      </div>
    </div>
  </div>
</SectionCard>


<div className="grid gap-6 lg:grid-cols-2">
  <SectionCard
    title="Customer Support"
    subtitle={`A quick overview of the support channels and service quality at ${broker.name_en || broker.name}.`}
  >
    {broker.support_en || broker.support ? (
      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm leading-8 text-slate-700 md:text-base">
            {broker.support_en || broker.support}
          </div>
        </div>
      </div>
    ) : (
      <p className="text-slate-500">No data is currently available.</p>
    )}
  </SectionCard>

  <SectionCard
    title="Suitability for Arabic-Speaking Traders"
    subtitle={`A quick look at how suitable ${broker.name_en || broker.name} is for Arabic-speaking users.`}
  >
    {broker.support_en || broker.arab_traders ? (
      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm leading-8 text-slate-700 md:text-base">
            {broker.support_en || broker.arab_traders}
          </div>
        </div>
      </div>
    ) : (
      <p className="text-slate-500">
        This broker may be suitable depending on platform language and support availability.
      </p>
    )}
  </SectionCard>
</div>

<SectionCard title="Final Verdict" id="verdict">
  <div className="space-y-5">
    {/* Mobile */}
    <div className="space-y-4 md:hidden">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-5 text-center">
          <div className="mb-3 text-sm font-black text-slate-900">
            Quick Summary
          </div>
          <div className="text-sm leading-8 text-slate-700">
            {broker.final_verdict_en || broker.final_verdict || "No data is currently available."}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
          <div className="mb-1 text-xs font-bold text-slate-500">
            Overall Rating
          </div>
          <div className="text-2xl font-black text-slate-950">
            {overallScore || broker.rating || "-"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
          <div className="mb-1 text-xs font-bold text-slate-500">
            Verdict
          </div>
          <div className="text-sm font-extrabold text-slate-900">
            {verdictTone.label}
          </div>
        </div>
      </div>
    </div>

    {/* Desktop */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-blue-500" />
        <div className="p-6 lg:p-8">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <div className="mb-3 text-base font-black text-slate-900">
                Final Summary
              </div>
              <div className="text-base leading-9 text-slate-700">
                {broker.final_verdict_en || broker.final_verdict || "No data is currently available."}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                <div className="mb-2 text-sm font-bold text-slate-500">
                  Overall Rating
                </div>
                <div className="text-4xl font-black text-slate-950">
                  {overallScore || broker.rating || "-"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                <div className="mb-2 text-sm font-bold text-slate-500">
                  Verdict
                </div>
                <div className="text-base font-extrabold text-slate-900">
                  {verdictTone.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center">
      <a
        href={`/go/${broker.slug}?type=real`}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 md:px-8 md:py-4 md:text-base"
      >
        Open an Account with {broker.name_en || broker.name} Now
      </a>
    </div>
  </div>
</SectionCard>

<SectionCard
  title={`How to Open an Account with ${broker.name_en || broker.name}`}
  subtitle="The basic steps to register, verify your account, and start trading."
>
  <div className="space-y-4">
    {/* Mobile - compact accordion */}
    <div className="space-y-3 md:hidden">
      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0 text-left">
            <div className="text-base font-black text-slate-900">Visit the Website</div>
            <div className="mt-1 text-xs font-medium text-slate-500">
              Start from the official website
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-700">
              1
            </span>
            <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
          </div>
        </summary>
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
          Go to the official website of {broker.name_en || broker.name} and choose to open a new account.
        </div>
      </details>

      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0 text-left">
            <div className="text-base font-black text-slate-900">Create an Account</div>
            <div className="mt-1 text-xs font-medium text-slate-500">
              Email & password
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700">
              2
            </span>
            <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
          </div>
        </summary>
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
          Enter your email address and password, then select the account type that suits you.
        </div>
      </details>

      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0 text-left">
            <div className="text-base font-black text-slate-900">Verify Your Account</div>
            <div className="mt-1 text-xs font-medium text-slate-500">
              ID & proof of address
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-sm font-black text-amber-700">
              3
            </span>
            <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
          </div>
        </summary>
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
          Upload your ID and proof of address to fully verify and activate your account.
        </div>
      </details>

      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0 text-left">
            <div className="text-base font-black text-slate-900">Deposit Funds</div>
            <div className="mt-1 text-xs font-medium text-slate-500">
              Choose a payment method
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-sm font-black text-violet-700">
              4
            </span>
            <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
          </div>
        </summary>
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
          Choose your preferred deposit method and fund your account to start trading.
        </div>
      </details>

      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0 text-left">
            <div className="text-base font-black text-slate-900">Start Trading</div>
            <div className="mt-1 text-xs font-medium text-slate-500">
              Download platform & begin
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-700">
              5
            </span>
            <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
          </div>
        </summary>
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
          Download MT4 or MT5, log in to your account, and start placing trades.
        </div>
      </details>
    </div>

    {/* Desktop */}
<div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-5">
  <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-700">
      1
    </span>
    <div className="pr-0 pl-12">
      <div className="text-base font-black text-slate-900">Visit the Website</div>
      <p className="mt-3 text-sm leading-8 text-slate-600">
        Go to the official website of {broker.name_en || broker.name} and choose to open a new account.
      </p>
    </div>
  </div>

  <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700">
      2
    </span>
    <div className="pr-0 pl-12">
      <div className="text-base font-black text-slate-900">Create an Account</div>
      <p className="mt-3 text-sm leading-8 text-slate-600">
        Enter your email and password, then select the account type that suits your needs.
      </p>
    </div>
  </div>

  <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-sm font-black text-amber-700">
      3
    </span>
    <div className="pr-0 pl-12">
      <div className="text-base font-black text-slate-900">Verify Your Account</div>
      <p className="mt-3 text-sm leading-8 text-slate-600">
        Upload your ID and proof of address to fully activate your account.
      </p>
    </div>
  </div>

  <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-sm font-black text-violet-700">
      4
    </span>
    <div className="pr-0 pl-12">
      <div className="text-base font-black text-slate-900">Deposit Funds</div>
      <p className="mt-3 text-sm leading-8 text-slate-600">
        Choose your preferred deposit method and fund your account to start trading.
      </p>
    </div>
  </div>

  <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-700">
      5
    </span>
    <div className="pr-0 pl-12">
      <div className="text-base font-black text-slate-900">Start Trading</div>
      <p className="mt-3 text-sm leading-8 text-slate-600">
        Download MT4 or MT5, log in to your account, and begin placing trades.
      </p>
    </div>
  </div>
</div>
</div>

<div className="mt-6 text-center">
  <p className="mb-4 text-sm text-slate-500 md:mb-5">
    You can open an account in less than two minutes and start trading immediately.
  </p>

  <a
    href={`/go/${broker.slug}?type=real`}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 md:px-8 md:py-4 md:text-base"
  >
    Start Trading Now with {broker.name_en || broker.name}
  </a>
</div>
</SectionCard>

        <SectionCard title="Frequently Asked Questions" id="faq">
  {/* Mobile */}
  <div className="space-y-3 md:hidden">
    {faqItems.map((item, i) => (
      <details
        key={i}
        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
          <div className="text-left text-base font-bold text-slate-900">
            {item.q}
          </div>

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition group-open:rotate-180">
            ▾
          </span>
        </summary>

        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4">
          <div className="leading-7 text-slate-600">
            {item.a}
          </div>
        </div>
      </details>
    ))}
  </div>

  {/* Desktop */}
  <div className="hidden space-y-4 md:block">
    {faqItems.map((item, i) => (
      <div
        key={i}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
      >
        <div className="text-base font-bold text-slate-900">
          {item.q}
        </div>
        <div className="mt-2 leading-7 text-slate-600">
          {item.a}
        </div>
      </div>
    ))}
  </div>
</SectionCard>

          <SectionCard title={`Compare ${broker.name_en || broker.name} with Other Brokers`}>
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
      </main>
    </>
  );
}