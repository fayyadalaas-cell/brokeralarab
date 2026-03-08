import { createClient } from "@/lib/supabase/server";
import Script from "next/script";
import Link from "next/link";

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
  real_account: string | null;
  demo_account: string | null;
  mt4_download: string | null;
  mt5_download: string | null;
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

  if (!broker) {
    return {
      title: "Broker Review",
      description: "مراجعة شركات التداول",
    };
  }

  return {
    title: broker.meta_title || `تقييم ${broker.name} | Broker Arab`,
    description:
      broker.meta_descr ||
      `مراجعة كاملة لشركة ${broker.name} تشمل الرسوم والمنصات والتراخيص.`,
    openGraph: {
      title: broker.meta_title || `تقييم ${broker.name} | Broker Arab`,
      description:
        broker.meta_descr ||
        `مراجعة كاملة لشركة ${broker.name} تشمل الرسوم والمنصات والتراخيص.`,
      images: broker.logo ? [broker.logo] : [],
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-sm">
      <div className="mb-2 text-sm text-slate-500">{label}</div>
      <div className="text-2xl font-extrabold text-slate-950 break-words">
        {value ?? "-"}
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
      className={`inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-extrabold transition ${
        primary
          ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
          : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      }`}
    >
      {label}
    </a>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  const icons: Record<string, string> = {
    "اسم الشركة": "🏢",
    "سنة التأسيس": "📅",
    "المقر الرئيسي": "🌍",
    "التقييم العام": "⭐",
    "الحد الأدنى للإيداع": "💰",
    "الرافعة المالية": "⚖️",
    المنصات: "💻",
    "التنظيم والتراخيص": "🛡️",
    "حساب إسلامي": "🕌",
    "دعم عربي": "🌐",
    "أنسب فئة": "👥",
    "الأصول المتاحة": "📊",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
        <span>{icons[label] || "ℹ️"}</span>
        <span>{label}</span>
      </div>
      <div className="text-lg font-extrabold text-slate-900 break-words">
        {value ?? "-"}
      </div>
    </div>
  );
}

function ScoreCard({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-3 text-sm text-slate-500">{label}</div>
      <div className="flex items-end justify-between gap-4">
        <div className="text-3xl font-extrabold text-slate-950">
          {value ?? "-"}
        </div>
        <div className="text-sm font-bold text-emerald-600">/ 10</div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-emerald-500"
          style={{ width: `${((value ?? 0) / 10) * 100}%` }}
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 text-sm font-bold text-slate-700">{title}</div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <img
          src={src}
          alt={`${title} في ${brokerName}`}
          className="h-auto w-full object-cover"
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
    <div className="mb-8 flex flex-wrap gap-3">
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "التقييمات",
        item: "/brokers",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `تقييم ${broker.name}`,
        item: `/brokers/${broker.slug}`,
      },
    ],
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

      <main className="mx-auto max-w-7xl px-4 py-10 text-right">
        <div className="mb-4 text-sm text-slate-500">
          <Link href="/brokers" className="hover:text-slate-700">
            التقييمات
          </Link>
          <span className="mx-2">/</span>
          <span>تقييم {broker.name}</span>
        </div>

        <section className="mb-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
            <div>
              <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                مراجعة شركة تداول
              </div>

              <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
                تقييم {broker.name}
              </h1>

              <p className="max-w-4xl text-lg leading-9 text-slate-600">
                {broker.intro || "مراجعة شاملة لشركة التداول."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="التقييم" value={broker.rating ?? "-"} />
                <StatCard
                  label="الحد الأدنى للإيداع"
                  value={broker.min_deposit ?? "-"}
                />
                <StatCard label="المنصات" value={broker.platforms || "-"} />
                <StatCard
                  label="التراخيص"
                  value={broker.regulation_short || "-"}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex h-32 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-4">
                {broker.logo ? (
                  <img
                    src={broker.logo}
                    alt={broker.name || "Broker logo"}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-slate-400">No logo</span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                <ActionButton
                  href={broker.real_account || "#"}
                  label="فتح حساب حقيقي"
                  primary
                />
                <ActionButton
                  href={broker.demo_account || "#"}
                  label="فتح حساب ديمو"
                />
                <ActionButton
                  href={broker.mt5_download || "#"}
                  label="تحميل منصة MetaTrader 5"
                />
                <ActionButton
                  href={broker.mt4_download || "#"}
                  label="تحميل منصة MetaTrader 4"
                />
              </div>
            </div>
          </div>
        </section>

        <SectionNav />

        <SectionCard title="ملخص سريع عن الشركة" id="summary">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SummaryCard label="اسم الشركة" value={broker.name} />
            <SummaryCard label="سنة التأسيس" value={broker.founded_year} />
            <SummaryCard label="المقر الرئيسي" value={broker.headquarters} />
            <SummaryCard label="التقييم العام" value={broker.rating ?? "-"} />
            <SummaryCard
              label="الحد الأدنى للإيداع"
              value={broker.min_deposit ?? "-"}
            />
            <SummaryCard label="الرافعة المالية" value={broker.max_leverage} />
            <SummaryCard label="المنصات" value={broker.platforms} />
            <SummaryCard
              label="التنظيم والتراخيص"
              value={broker.regulation_short}
            />
            <SummaryCard label="حساب إسلامي" value={broker.islamic_account} />
            <SummaryCard label="دعم عربي" value={broker.arabic_support} />
            <SummaryCard label="أنسب فئة" value={broker.best_for} />
            <SummaryCard
              label="الأصول المتاحة"
              value={tradingAssets.length ? tradingAssets.join("، ") : "-"}
            />
          </div>
        </SectionCard>

        <div className="mt-8">
          <SectionCard title="التقييم التفصيلي" id="scores">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <ScoreCard label="الأمان والتنظيم" value={broker.score_safety} />
              <ScoreCard label="الرسوم والسبريد" value={broker.score_fees} />
              <ScoreCard
                label="منصات التداول"
                value={broker.score_platforms}
              />
              <ScoreCard
                label="الإيداع والسحب"
                value={broker.score_deposit}
              />
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
                href={broker.real_account || "#"}
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

          <SectionCard title="شركات مشابهة">
            {relatedBrokers.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {relatedBrokers.map((item) => (
                  <Link
                    key={item.id}
                    href={`/brokers/${item.slug}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
                  >
                    <div className="mb-4 flex h-16 items-center justify-center rounded-xl bg-white p-3">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.name || "Broker logo"}
                          className="max-h-full w-auto object-contain"
                        />
                      ) : (
                        <span className="text-sm text-slate-400">No logo</span>
                      )}
                    </div>

                    <div className="text-lg font-extrabold text-slate-900">
                      {item.name || "-"}
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      التقييم: {item.rating ?? "-"}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">لا توجد شركات مشابهة حاليًا.</p>
            )}
          </SectionCard>
        </div>
      </main>
    </>
  );
}