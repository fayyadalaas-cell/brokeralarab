import { createClient } from "@/lib/supabase/server";
import Script from "next/script";
import Link from "next/link";
import ShareButtons from "@/app/components/ShareButtons";
import ExpandableText from "@/app/components/ExpandableText";

type Broker = {
  id: number;
  name: string | null;
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
  account_types: string | null;
  fees: string | null;
  spreads: string | null;
  deposit_withdrawal: string | null;
  platform_details: string | null;
  support: string | null;
  safety: string | null;
  arab_traders: string | null;
  final_verdict: string | null;
  meta_title: string | null;
  meta_descr: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
  mt4_download_url: string | null;
  mt5_download_url: string | null;
  founded_year: string | null;
  headquarters: string | null;
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
  min_deposit: string | null;
  execution_type: string | null;
  best_for: string | null;
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
    .select("id, name, slug, rating, logo")
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

  const title = broker.meta_title || `تقييم ${broker.name} | Broker Arab`;
  const description =
    broker.meta_descr ||
    `مراجعة كاملة لشركة ${broker.name} تشمل الرسوم والمنصات والتراخيص.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
  title,
  description,
  url: `${siteUrl}/brokers/${broker.slug}`,
  siteName: "Broker Al Arab",
  locale: "ar_AR",
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
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <h2 className="mb-5 text-2xl font-extrabold text-slate-950">{title}</h2>
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
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-3 last:border-b-0">
      <div className="text-sm font-medium text-slate-400">
        {label}
      </div>
      <div className="text-left text-[17px] md:text-[18px] font-extrabold text-slate-900 break-words">
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
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base leading-8 text-slate-700"
            >
              <span
                className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  type === "pros"
                    ? "bg-emerald-100 text-emerald-700"
                    : type === "cons"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {type === "pros" ? "✓" : type === "cons" ? "–" : "•"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">لا توجد بيانات متاحة حاليًا.</p>
      )}
    </SectionCard>
  );
}

function ImageCard({
  title,
  src,
  brokerName,
}: {
  title: string;
  src: string | null;
  brokerName: string;
}) {
  if (!src) return null;

  return (
    <div className="rounded-[24px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
      <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-inner">
        <div className="flex h-[340px] items-center justify-center overflow-hidden rounded-[16px] bg-slate-50">
  <img
    src={src}
    alt={`${brokerName} trading platform`}
    className="h-full w-full object-cover"
  />
</div>
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
        <p className="text-slate-500">لا توجد بيانات متاحة حاليًا.</p>
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
        <p className="text-slate-500">لا توجد بيانات متاحة حاليًا.</p>
      )}
    </SectionCard>
  );
}

function SectionNav() {
  const links = [
    { href: "#summary", label: "ملخص سريع" },
    { href: "#scores", label: "التقييم" },
    { href: "#accounts", label: "الحسابات" },
    { href: "#fees", label: "الرسوم" },
    { href: "#platforms", label: "المنصات" },
    { href: "#regulation", label: "التراخيص" },
    { href: "#verdict", label: "التقييم النهائي" },
    { href: "#faq", label: "الأسئلة" },
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
          <p className="text-slate-600">لا توجد شركة لهذا الرابط.</p>
        </div>
      </main>
    );
  }

  const relatedBrokers = await getRelatedBrokers(slug);
  const accountsData = await getBrokerAccounts(broker.id);
  const pros = splitText(broker.pros);
  const cons = splitText(broker.cons);
  const accounts = splitText(broker.account_types);
  const payments = splitText(broker.deposit_withdrawal);
  const tradingAssets = splitText(broker.trading_assets);

  const faqItems = [
    {
      q: `هل ${broker.name} شركة موثوقة؟`,
      a: `${broker.name} تعد من الشركات المعروفة في قطاع التداول، ويعتمد تقييمها على التراخيص والتنظيم والرسوم وتجربة المستخدم كما هو موضح في هذه الصفحة.`,
    },
    {
      q: `هل توفر ${broker.name} حسابًا إسلاميًا؟`,
      a: broker.islamic_account
        ? `بحسب المعلومات المتوفرة، توفر ${broker.name} خيار الحساب الإسلامي للمتداولين الذين يحتاجون هذا النوع من الحسابات.`
        : `يرجى مراجعة شروط الشركة الحالية للتأكد من توفر الحساب الإسلامي في بلدك.`,
    },
    {
      q: `ما الحد الأدنى للإيداع في ${broker.name}؟`,
      a: `الحد الأدنى للإيداع في ${broker.name} يبدأ من ${broker.min_deposit ?? "-"} وفق البيانات الحالية في الصفحة.`,
    },
    {
      q: `هل تدعم ${broker.name} منصة MT4 وMT5؟`,
      a: `${broker.name} تدعم منصات التداول ${broker.platforms || "المتاحة لدى الشركة"}، ويمكنك مراجعة قسم تفاصيل المنصات لمعرفة المزيد.`,
    },
    {
      q: `هل ${broker.name} مناسبة للمتداول العربي؟`,
      a:
        broker.arab_traders ||
        `يمكنك مراجعة قسم "هل تناسب المتداول العربي؟" في هذه الصفحة لمعرفة مدى ملاءمة الشركة للمستخدم العربي.`,
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
  const pageUrl = `${siteUrl}/brokers/${broker.slug}`;
const shareTitle = `تقييم ${broker.name} | بروكر العرب`;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "التقييمات",
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
  url: `https://brokeralarab.com/brokers/${broker.slug}`,
  logo: broker.logo || undefined,
  description:
    broker.meta_descr ||
    broker.intro ||
    `مراجعة كاملة لشركة ${broker.name} تشمل الرسوم والمنصات والتراخيص.`,
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
      <main className="mx-auto max-w-7xl px-4 py-10 text-right">
        <div className="mb-4 text-sm text-slate-500">
          <Link href="/brokers" className="hover:text-slate-700">
            التقييمات
          </Link>
          <span className="mx-2">/</span>
          <span>تقييم {broker.name}</span>
        </div>

        <section className="mb-8 rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm md:p-8">
  {/* Desktop */}
  <div className="hidden lg:block">
    <div className="flex items-stretch gap-8">
      {/* Right sidebar */}
      <aside className="flex w-[260px] shrink-0 flex-col justify-between">
        <div className="flex min-h-[170px] items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-5">
          {broker.logo ? (
            <img
              src={broker.logo}
              alt={broker.name || "Broker logo"}
              className="max-h-[110px] w-full object-contain"
            />
          ) : (
            <span className="text-sm text-slate-400">No logo</span>
          )}
        </div>

          <ShareButtons url={pageUrl} title={shareTitle} />
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
            مراجعة شركة تداول
          </div>

          {broker.rating ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-slate-800">
              <span className="text-amber-600">★</span>
              <span>{broker.rating}</span>
              <span className="text-slate-500">من 5</span>
            </div>
          ) : null}
        </div>

        <h1 className="mb-4 text-5xl font-black leading-tight text-slate-950">
          تقييم {broker.name}
        </h1>

        <p className="max-w-4xl text-lg leading-9 text-slate-600 line-clamp-6">
          {broker.intro || "مراجعة شاملة لشركة التداول."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ActionButton
            href={`/go/${broker.slug}?type=real`}
            label="فتح حساب حقيقي"
            primary
          />

          <ActionButton
            href={`/go/${broker.slug}?type=demo`}
            label="فتح حساب ديمو"
          />

          <ActionButton
            href={`/go/${broker.slug}?type=mt5`}
            label="تحميل منصة MT5"
          />

          <ActionButton
            href={`/go/${broker.slug}?type=mt4`}
            label="تحميل منصة MT4"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Mobile / Tablet */}
  <div className="lg:hidden">
    <div className="space-y-4">
      <div className="flex min-h-[170px] items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-5">
        {broker.logo ? (
          <img
            src={broker.logo}
            alt={broker.name || "Broker logo"}
            className="max-h-[110px] w-full object-contain"
          />
        ) : (
          <span className="text-sm text-slate-400">No logo</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 md:text-sm">
          مراجعة شركة تداول
        </div>

        {broker.rating ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-slate-800">
            <span className="text-amber-500">★</span>
            <span>{broker.rating}</span>
            <span className="text-slate-500">من 5</span>
          </div>
        ) : null}
      </div>

      <h1 className="text-3xl font-black leading-tight text-slate-950 md:text-4xl">
        تقييم {broker.name}
      </h1>

      <ExpandableText
        text={broker.intro || "مراجعة شاملة لشركة التداول."}
      />

      <div className="grid grid-cols-1 gap-3">
        <ActionButton
          href={`/go/${broker.slug}?type=real`}
          label="فتح حساب حقيقي"
          primary
        />

        <ActionButton
          href={`/go/${broker.slug}?type=demo`}
          label="فتح حساب ديمو"
        />

        <ActionButton
          href={`/go/${broker.slug}?type=mt5`}
          label="تحميل منصة MetaTrader 5"
        />

        <ActionButton
          href={`/go/${broker.slug}?type=mt4`}
          label="تحميل منصة MetaTrader 4"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <ShareButtons url={pageUrl} title={shareTitle} />
      </div>
    </div>
  </div>
</section>
        <SectionNav />

        <SectionCard title="ملخص سريع عن الشركة" id="summary">
  <div className="grid gap-4 lg:grid-cols-2">

    <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4">
      <SummaryRow label="اسم الشركة" value={broker.name} />
      <SummaryRow label="سنة التأسيس" value={broker.founded_year} />
      <SummaryRow label="المقر الرئيسي" value={broker.headquarters} />
      <SummaryRow label="التقييم العام" value={broker.rating ?? "-"} />
      <SummaryRow label="الحد الأدنى للإيداع" value={broker.min_deposit ?? "-"} />
      <SummaryRow label="الرافعة المالية" value={broker.max_leverage} />
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4">
      <SummaryRow label="المنصات" value={broker.platforms} />
      <SummaryRow label="التنظيم والتراخيص" value={broker.regulation_short} />
      <SummaryRow label="حساب إسلامي" value={broker.islamic_account} />
      <SummaryRow label="دعم عربي" value={broker.arabic_support} />
      <SummaryRow label="أنسب فئة" value={broker.best_for} />
      <SummaryRow
        label="الأصول المتاحة"
        value={tradingAssets.length ? tradingAssets.join(" | ") : "-"}
      />
    </div>

  </div>
</SectionCard>

        <div className="mt-8">
  <SectionCard title="التقييم التفصيلي" id="scores">
    {/* Mobile */}
    <div className="md:hidden rounded-3xl border border-slate-200 bg-white px-5 py-4">
      <ScoreCard label="الأمان والتنظيم" value={broker.score_safety} row />
      <ScoreCard label="الرسوم والسبريد" value={broker.score_fees} row />
      <ScoreCard label="منصات التداول" value={broker.score_platforms} row />
      <ScoreCard label="الإيداع والسحب" value={broker.score_deposit} row />
      <ScoreCard label="دعم العملاء" value={broker.score_support} row />
    </div>

    {/* Desktop */}
    <div className="hidden md:grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <ScoreCard label="الأمان والتنظيم" value={broker.score_safety} />
      <ScoreCard label="الرسوم والسبريد" value={broker.score_fees} />
      <ScoreCard label="منصات التداول" value={broker.score_platforms} />
      <ScoreCard label="الإيداع والسحب" value={broker.score_deposit} />
      <ScoreCard label="دعم العملاء" value={broker.score_support} />
    </div>
  </SectionCard>
</div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ListSection title="المميزات" items={pros} type="pros" />
          <ListSection title="العيوب" items={cons} type="cons" />
        </div>

        <div className="mt-8 space-y-8">
          <TextSection title="نظرة عامة على الشركة" text={broker.intro} />

          <SectionCard title="أنواع حسابات التداول" id="accounts">
  <div className="space-y-5">
    <p className="leading-8 text-slate-700">
      توفر شركة {broker.name} عدة أنواع من حسابات التداول لتناسب مختلف فئات
      المتداولين، بداية من المبتدئين الذين يبحثون عن حساب بسيط، وحتى
      المتداولين المحترفين الذين يفضّلون فروقات سعرية أقل أو شروط تنفيذ أكثر
      تخصصًا.
      {accountsData.length ? (
        <>
          {" "}
          وتشمل الحسابات الرئيسية لدى الشركة:{" "}
          <span className="font-bold text-slate-900">
            {accountsData
              .map((acc) => acc.account_name)
              .filter(Boolean)
              .join("، ")}
          </span>
          .
        </>
      ) : null}
    </p>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] overflow-hidden rounded-2xl border border-slate-200 text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-right font-extrabold text-slate-900">
              نوع الحساب
            </th>
            <th className="p-4 text-center font-extrabold text-slate-900">
              السبريد
            </th>
            <th className="p-4 text-center font-extrabold text-slate-900">
              العمولة
            </th>
            <th className="p-4 text-center font-extrabold text-slate-900">
              الحد الأدنى للإيداع
            </th>
            <th className="p-4 text-center font-extrabold text-slate-900">
              نوع التنفيذ
            </th>
            <th className="p-4 text-center font-extrabold text-slate-900">
              مناسب لمن؟
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {accountsData.length ? (
            accountsData.map((acc) => (
              <tr key={acc.id} className="border-t border-slate-200">
                <td className="p-4 font-bold text-slate-900">
                  {acc.account_name || "-"}
                </td>
                <td className="p-4 text-center">{acc.spread || "-"}</td>
                <td className="p-4 text-center">{acc.commission || "-"}</td>
                <td className="p-4 text-center">{acc.min_deposit || "-"}</td>
                <td className="p-4 text-center">
                  {acc.execution_type || "-"}
                </td>
                <td className="p-4 text-center">{acc.best_for || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-slate-500">
                لا توجد بيانات حسابات متاحة حاليًا.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-8 text-slate-700">
      <b className="text-slate-900">ملاحظة مهمة:</b> تختلف تفاصيل الحسابات مثل
      السبريد والعمولات والحد الأدنى للإيداع وأسلوب التنفيذ من شركة إلى أخرى،
      وقد تختلف أيضًا بحسب نوع الأداة المالية أو المنطقة الجغرافية أو الجهة
      التنظيمية التي يتبع لها الحساب. لذلك يفضّل دائمًا مراجعة الموقع الرسمي
      للشركة قبل فتح الحساب.
    </div>
  </div>
</SectionCard>

<SectionCard title="الرسوم والسبريد" id="fees">
  <div className="space-y-5">
    <p className="leading-8 text-slate-700">
      تختلف الرسوم وفروقات الأسعار في شركة {broker.name} بحسب نوع الحساب
      والأداة المالية المتداولة، لذلك من المهم مراجعة تفاصيل كل حساب قبل
      البدء بالتداول، خاصة عند استخدام استراتيجيات السكالبينج أو التداول
      اليومي.
    </p>

    <div className="overflow-x-auto">
      <table className="w-full overflow-hidden rounded-2xl border border-slate-200 text-sm">
        <tbody className="bg-white">
          <tr className="border-t border-slate-200">
            <td className="w-1/3 bg-slate-50 p-4 font-extrabold text-slate-900">
              السبريد
            </td>
            <td className="p-4 text-slate-700">
              {broker.spreads || "-"}
            </td>
          </tr>
          <tr className="border-t border-slate-200">
            <td className="bg-slate-50 p-4 font-extrabold text-slate-900">
              العمولات
            </td>
            <td className="p-4 text-slate-700">
              {broker.fees ? "متوفرة حسب نوع الحساب" : "-"}
            </td>
          </tr>
          <tr className="border-t border-slate-200">
            <td className="bg-slate-50 p-4 font-extrabold text-slate-900">
              الحد الأدنى للإيداع
            </td>
            <td className="p-4 text-slate-700">
              {broker.min_deposit ?? "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="leading-8 text-slate-700">
      {broker.fees || "لا توجد بيانات متاحة حاليًا."}
    </div>
  </div>
</SectionCard>

          <ListSection title="الإيداع والسحب" items={payments} />

          <RichContentSection
            title="تفاصيل المنصات"
            content={broker.platform_details}
            id="platforms"
          />

          <SplitListSection
            title="التراخيص والتنظيم"
            content={broker.regulation}
            id="regulation"
          />

          <RichContentSection title="الأمان والتراخيص" content={broker.safety} />

          <RichContentSection title="دعم العملاء" content={broker.support} />

          <RichContentSection
            title="هل تناسب المتداول العربي؟"
            content={broker.arab_traders}
          />

          <SectionCard title={`كيفية فتح حساب في ${broker.name} خطوة بخطوة`}>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <b>1️⃣ الدخول إلى الموقع الرسمي</b>
                <p className="mt-2 text-slate-600">
                  قم بالدخول إلى الموقع الرسمي لشركة {broker.name} ثم اضغط على
                  زر فتح حساب.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <b>2️⃣ إنشاء حساب جديد</b>
                <p className="mt-2 text-slate-600">
                  قم بإدخال بريدك الإلكتروني وكلمة المرور لإنشاء حساب التداول.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <b>3️⃣ توثيق الحساب</b>
                <p className="mt-2 text-slate-600">
                  ستحتاج إلى رفع وثيقة الهوية وإثبات العنوان لتفعيل الحساب.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <b>4️⃣ إيداع الأموال</b>
                <p className="mt-2 text-slate-600">
                  يمكنك الإيداع باستخدام البطاقات البنكية أو المحافظ الإلكترونية.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <b>5️⃣ بدء التداول</b>
                <p className="mt-2 text-slate-600">
                  بعد الإيداع يمكنك تحميل منصة MT4 أو MT5 والبدء في التداول.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="mb-5 text-sm text-slate-500">
                يمكنك فتح الحساب خلال أقل من دقيقتين والبدء في التداول فورًا.
              </p>

              <a
  href={`/go/${broker.slug}?type=real`}
  target="_blank"
  rel="nofollow sponsored noopener noreferrer"
  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-4 text-base font-bold text-white transition hover:bg-emerald-700"
>
  فتح حساب في {broker.name} الآن
</a>
            </div>
          </SectionCard>

          <SectionCard title="صور المنصات والتطبيق">
            <div className="grid gap-4 md:grid-cols-2">
              <ImageCard
                title="صورة المنصة"
                src={broker.platform_image}
                brokerName={broker.name || "broker"}
              />
              <ImageCard
                title="صورة التطبيق"
                src={broker.mobile_app_image}
                brokerName={broker.name || "broker"}
              />
              <ImageCard
                title="صورة MetaTrader 4"
                src={broker.mt4_image}
                brokerName={broker.name || "broker"}
              />
              <ImageCard
                title="صورة MetaTrader 5"
                src={broker.mt5_image}
                brokerName={broker.name || "broker"}
              />
              <ImageCard
                title="صورة الشركة"
                src={broker.company_image}
                brokerName={broker.name || "broker"}
              />
            </div>

            {!broker.platform_image &&
              !broker.mobile_app_image &&
              !broker.mt4_image &&
              !broker.mt5_image &&
              !broker.company_image && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                  يمكن إضافة الصور لاحقًا من Supabase.
                </div>
              )}
          </SectionCard>

          <TextSection
            title="التقييم النهائي"
            text={broker.final_verdict}
            id="verdict"
          />

          <SectionCard title="الأسئلة الشائعة" id="faq">
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="text-base font-bold text-slate-900">
                    {item.q}
                  </div>
                  <div className="mt-2 leading-7 text-slate-600">{item.a}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={`مقارنات ${broker.name} مع شركات أخرى`}>
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
                {broker.name}
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
                {item.name}
              </div>
            </div>

          </div>

          {/* Title */}
          <div className="text-lg font-extrabold text-slate-900 text-center">
            مقارنة {broker.name} مع {item.name}
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-slate-600 text-center leading-7">
            تعرّف على الفروقات بين {broker.name} و{item.name} من حيث التراخيص،
            الرسوم، الحد الأدنى للإيداع، المنصات، ومدى ملاءمة كل شركة
            للمتداول العربي.
          </p>

          {/* Rating */}
          <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
            <span className="text-sm text-slate-500">
              تقييم {item.name}
            </span>

            <span className="text-sm font-extrabold text-slate-900">
              {item.rating ?? "-"} / 5
            </span>
          </div>

          {/* CTA */}
          <div className="mt-4 text-sm font-extrabold text-emerald-700 text-center transition group-hover:text-emerald-800">
            اقرأ المقارنة ←
          </div>

        </Link>
      ))}
    </div>
  ) : (
    <p className="text-slate-500">لا توجد مقارنات متاحة حاليًا.</p>
  )}
</SectionCard>
        </div>
      </main>
    </>
  );
}