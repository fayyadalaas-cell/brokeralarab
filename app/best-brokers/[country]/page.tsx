import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RegulationSection from "./RegulationSection";

type PageProps = {
  params: Promise<{ country: string }>;
};

type FAQItem = {
  q: string;
  a: string;
};

type CountryPageContent = {
  country_code: string;
  slug: string;
  is_active: boolean;
  sort_order: number;
  country_name_ar: string;
  country_name_en: string;
  page_title: string | null;
  meta_description: string | null;
  hero_badge: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_cta_text: string | null;
  hero_cta_url: string | null;
  intro_title: string | null;
  intro_text: string | null;
  top_brokers_title: string | null;
  top_brokers_subtitle: string | null;
  why_trade_title: string | null;
  why_trade_text: string | null;
  islamic_title: string | null;
  islamic_text: string | null;
  payments_title: string | null;
  payments_text: string | null;
  regulation_title: string | null;
  regulation_text: string | null;
  beginners_title: string | null;
  beginners_text: string | null;
  comparison_title: string | null;
  comparison_text: string | null;
  faq_title: string | null;
  faq_items: FAQItem[] | null;
  cta_title: string | null;
  cta_text: string | null;
  cta_primary_text: string | null;
  cta_primary_url: string | null;
  cta_secondary_text: string | null;
  cta_secondary_url: string | null;
  seo_intro: string | null;
  seo_conclusion: string | null;
  custom_disclaimer: string | null;
  sidebar_title: string | null;
  sidebar_text: string | null;
  sidebar_points: string | null;
};

type BrokerCountryFitRow = {
  broker_id: number;
  country_code: string;
  priority_score: number;
  accepts_clients_score: number;
  local_office_score: number;
  local_license_score: number;
  regional_license_score: number;
  arabic_support_score: number;
  islamic_account_score: number;
  payment_methods_score: number;
  min_deposit_score: number;
  beginner_score: number;
  platform_experience_score: number;
  customer_support_score: number;
  popularity_score: number;
  trust_score: number;
  local_office_city: string | null;
  local_license_name: string | null;
  regional_license_note: string | null;
  payment_methods_note: string | null;
  islamic_account_note: string | null;
  notes_internal: string | null;
  is_featured: boolean;
  brokers: {
    id: number;
    name: string;
    rating: number | null;
    min_deposit: number | null;
    platforms: string | null;
    regulation: string | null;
    best_for: string | null;
    intro: string | null;
    logo: string | null;
    slug: string | null;
    pros: string | null;
    cons: string | null;
    account_types: string | null;
    fees: string | null;
    real_account_url: string | null;
  } | null;
};

// ضع هنا روابط فتح الحساب الحقيقية لكل وسيط
function getOpenAccountUrl(
  realAccountUrl: string | null | undefined,
  slug: string | null | undefined
) {
  if (realAccountUrl && realAccountUrl.trim()) return realAccountUrl;
  if (!slug) return "/brokers";
  return `/brokers/${slug}`;
}

function scoreLabel(score: number) {
  if (score >= 5) return "ممتاز";
  if (score >= 4) return "قوي";
  if (score >= 3) return "جيد";
  if (score >= 2) return "مقبول";
  return "ضعيف";
}

function scoreTone(score: number) {
  if (score >= 5) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 4) return "bg-blue-50 text-blue-700 border-blue-200";
  if (score >= 3) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
}

function splitTextToList(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/[\n|،]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

async function getCountryPage(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("country_page_content")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single<CountryPageContent>();

  if (error || !data) return null;
  return data;
}

async function getCountryBrokers(countryCode: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("broker_country_fit")
    .select(`
      broker_id,
      country_code,
      priority_score,
      accepts_clients_score,
      local_office_score,
      local_license_score,
      regional_license_score,
      arabic_support_score,
      islamic_account_score,
      payment_methods_score,
      min_deposit_score,
      beginner_score,
      platform_experience_score,
      customer_support_score,
      popularity_score,
      trust_score,
      local_office_city,
      local_license_name,
      regional_license_note,
      payment_methods_note,
      islamic_account_note,
      notes_internal,
      is_featured,
      brokers (
  id,
  name,
  rating,
  min_deposit,
  platforms,
  regulation,
  best_for,
  intro,
  logo,
  slug,
  pros,
  cons,
  account_types,
  fees,
  real_account_url
)
    `)
    .eq("country_code", countryCode)
    .order("priority_score", { ascending: false })
    .order("trust_score", { ascending: false })
    .order("islamic_account_score", { ascending: false })
    .order("arabic_support_score", { ascending: false })
    .order("payment_methods_score", { ascending: false })
    .returns<BrokerCountryFitRow[]>();

  if (error || !data) return [];
  return data.filter((row) => row.brokers);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country } = await params;
  const page = await getCountryPage(country);

  if (!page) {
    return {
      title: "الصفحة غير موجودة",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: page.page_title || `أفضل شركات التداول في ${page.country_name_ar}`,
    description:
      page.meta_description ||
      `مقارنة أفضل شركات التداول في ${page.country_name_ar}.`,
    alternates: {
      canonical: `https://brokeralarab.com/best-brokers/${page.slug}`,
    },
    openGraph: {
      title: page.page_title || `أفضل شركات التداول في ${page.country_name_ar}`,
      description:
        page.meta_description ||
        `مقارنة أفضل شركات التداول في ${page.country_name_ar}.`,
      url: `https://brokeralarab.com/best-brokers/${page.slug}`,
      type: "article",
    },
  };
}

function HeroStat({
  label,
  value,
  tone = "blue",
}: {
  label: string;
  value: string;
  tone?: "blue" | "emerald" | "slate";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : tone === "slate"
      ? "bg-slate-50 border-slate-200 text-slate-700"
      : "bg-blue-50 border-blue-200 text-blue-700";

  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneClass}`}>
      <div className="text-[11px] font-bold">{label}</div>
      <div className="mt-1 text-lg font-black">{value}</div>
    </div>
  );
}

function ScorePill({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div
      className={`rounded-2xl border px-3 py-3 text-center ${scoreTone(score)}`}
    >
      <div className="text-[11px] font-bold">{label}</div>
      <div className="mt-1 text-base font-black">{score}/5</div>
      <div className="mt-1 text-[10px] font-bold opacity-80">
        {scoreLabel(score)}
      </div>
    </div>
  );
}

function ContentSection({
  title,
  text,
}: {
  title?: string | null;
  text?: string | null;
}) {
  if (!title || !text) return null;

  return (
    <div className="border-t border-slate-200 pt-6 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-black text-slate-950 sm:text-2xl">{title}</h2>
      <p className="mt-3 text-[15px] leading-8 text-slate-700">{text}</p>
    </div>
  );
}

function truncateText(text: string | null | undefined, maxLength = 90) {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trim() + "…";
}

function StarRating({ value }: { value: number }) {
  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-[13px] leading-none ${
              star <= rounded ? "text-amber-400" : "text-slate-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-[11px] font-black text-slate-500">{value.toFixed(1)}</span>
    </div>
  );
}

function splitDoublePipe(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function BestBrokersCountryPage({ params }: PageProps) {
  const { country } = await params;

  const page = await getCountryPage(country);
  if (!page) notFound();

  const brokers = await getCountryBrokers(page.country_code);
  const featuredBroker = brokers[0];
  const flagSrc = `/flags/${page.country_code.toLowerCase()}.svg`;

  const regulationParts = splitDoublePipe(
    page.regulation_text
      ?.split("\n")
      .find((line) => line.includes("||")) ?? ""
  );

  const sidebarParts = splitDoublePipe(page.sidebar_points ?? "");

  const hasSidebar =
    Boolean(page.sidebar_title) ||
    Boolean(page.sidebar_text) ||
    sidebarParts.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.page_title || `أفضل شركات التداول في ${page.country_name_ar}`,
    description: page.meta_description,
    url: `https://brokeralarab.com/best-brokers/${page.slug}`,
    mainEntity: brokers.map((row, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: row.brokers?.name,
      url: row.brokers?.slug
        ? `https://brokeralarab.com/brokers/${row.brokers.slug}`
        : undefined,
    })),
  };

    const topRows = (brokers ?? []).slice(0, 5);

  const unwrapBroker = (row: BrokerCountryFitRow) => row?.brokers ?? null;

  const getBrokerName = (row: BrokerCountryFitRow) =>
    unwrapBroker(row)?.name ?? "شركة تداول";

  const getBrokerSlug = (row: BrokerCountryFitRow) =>
    unwrapBroker(row)?.slug ?? null;

  const getBrokerRating = (row: BrokerCountryFitRow) =>
    unwrapBroker(row)?.rating ?? null;

  const getBrokerMinDeposit = (row: BrokerCountryFitRow) =>
    unwrapBroker(row)?.min_deposit ?? null;

  const getBrokerBestFor = (row: BrokerCountryFitRow) =>
    unwrapBroker(row)?.best_for ?? "";

  const getBrokerLogo = (row: BrokerCountryFitRow) =>
    unwrapBroker(row)?.logo ?? "/images/brokers/default.png";

  const getBrokerRealUrl = (row: BrokerCountryFitRow) =>
    unwrapBroker(row)?.real_account_url ?? null;

  const accountIslamicText = (row: BrokerCountryFitRow) => {
    if (row?.islamic_account_score >= 5) return "متوفر بقوة";
    if (row?.islamic_account_score >= 4) return "متوفر";
    if (row?.islamic_account_score >= 3) return "مقبول";
    return "غير واضح";
  };

  const acceptsClientsText = (row: BrokerCountryFitRow) => {
    if (row?.accepts_clients_score >= 5) return "يقبل العملاء";
    if (row?.accepts_clients_score >= 4) return "غالبًا يقبل";
    if (row?.accepts_clients_score >= 3) return "بحاجة لتأكيد";
    return "غير واضح";
  };

  const supportArabicText = (row: BrokerCountryFitRow) => {
    if (row?.arabic_support_score >= 5) return "دعم عربي قوي";
    if (row?.arabic_support_score >= 4) return "دعم عربي جيد";
    if (row?.arabic_support_score >= 3) return "دعم عربي محدود";
    return "غير واضح";
  };

    function pickUniqueBestRows(rows: BrokerCountryFitRow[]) {
    const used = new Set<number>();

    const categories = [
      {
        label: "للمبتدئين",
        badge: "سهولة البداية",
        sorter: (a: BrokerCountryFitRow, b: BrokerCountryFitRow) =>
          (b.beginner_score ?? 0) - (a.beginner_score ?? 0),
      },
      {
        label: "للحساب الإسلامي",
        badge: "خيارات إسلامية",
        sorter: (a: BrokerCountryFitRow, b: BrokerCountryFitRow) =>
          (b.islamic_account_score ?? 0) - (a.islamic_account_score ?? 0),
      },
      {
        label: "الأعلى ثقة",
        badge: "ثقة وتنظيم",
        sorter: (a: BrokerCountryFitRow, b: BrokerCountryFitRow) =>
          (b.trust_score ?? 0) - (a.trust_score ?? 0),
      },
      {
        label: "أفضل تجربة منصة",
        badge: "منصات وأدوات",
        sorter: (a: BrokerCountryFitRow, b: BrokerCountryFitRow) =>
          (b.platform_experience_score ?? 0) - (a.platform_experience_score ?? 0),
      },
    ];

    return categories
      .map((category) => {
        const row = [...rows]
          .sort(category.sorter)
          .find((item) => {
            const id = item.brokers?.id;
            return !!id && !used.has(id);
          });

        if (!row?.brokers?.id) return null;

        used.add(row.brokers.id);

        return {
          label: category.label,
          badge: category.badge,
          row,
        };
      })
      .filter(Boolean) as {
      label: string;
      badge: string;
      row: BrokerCountryFitRow;
    }[];
  }

  const bestPickItems = pickUniqueBestRows(topRows);

  const formatDeposit = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "—";
    return `$${value}`;
  };

  
  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      <Script
        id={`country-brokers-schema-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1320px] px-4 py-5 sm:px-6 lg:px-8">
        
        <section className="relative overflow-visible bg-transparent px-0 pt-0 lg:overflow-hidden lg:rounded-[34px] lg:border lg:border-slate-200 lg:bg-white lg:shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_35%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.06),transparent_30%)]" />
         <div className="relative grid gap-4 px-0 py-0 sm:px-8 sm:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:rounded-none lg:bg-transparent lg:px-10">
  <div className="rounded-[24px] bg-[#f3f7ff] px-4 py-5 shadow-none lg:rounded-[30px] lg:border lg:border-slate-200 lg:bg-white lg:p-5 lg:shadow-sm xl:p-6">
  <h1 className="text-center text-[30px] font-black leading-[1.2] text-slate-950 sm:text-4xl lg:max-w-4xl lg:text-right lg:text-[52px] lg:leading-[1.15]">
    {page.hero_title ||
      page.page_title ||
      `أفضل شركات التداول في ${page.country_name_ar}`}
  </h1>

  {page.hero_subtitle ? (
    <p className="mt-3 text-center text-[15px] leading-8 text-slate-600 sm:text-lg lg:max-w-3xl lg:text-right">
      {page.hero_subtitle}
    </p>
  ) : null}

  <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-wrap">
    <Link
      href="#country-ranking"
      className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
    >
      شاهد تقييمات الشركات
    </Link>

    <Link
      href="/best-brokers"
      className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-900 transition hover:bg-slate-50 sm:w-auto"
    >
      صفحة أفضل الوسطاء
    </Link>
  </div>
</div>

  <div className="hidden lg:block rounded-none border-0 bg-transparent p-0 shadow-none lg:rounded-[30px] lg:border lg:border-slate-200 lg:bg-white lg:p-5 lg:shadow-sm xl:p-6">
  <div className="flex items-center justify-center gap-3 lg:justify-start">
    <Image
      src={flagSrc}
      alt={page.country_name_ar}
      width={42}
      height={42}
      className="h-10 w-10 rounded-full border border-slate-200 bg-white p-1 object-cover"
    />
    <div className="text-center lg:text-right">
      <div className="text-lg font-black text-slate-950">
        نظرة سريعة على {page.country_name_ar}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-500">
        أهم ما يبحث عنه الزائر قبل اختيار الوسيط
      </div>
    </div>
  </div>

  <div className="mt-5 grid gap-3 sm:grid-cols-3">
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
      <div className="text-xs font-black text-emerald-700">حساب إسلامي</div>
      <div className="mt-1 text-base font-black text-emerald-900">
        بدون فوائد ربوية
      </div>
    </div>

    <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
      <div className="text-xs font-black text-blue-700">تنظيم موثوق</div>
      <div className="mt-1 text-base font-black text-blue-900">
        تراخيص عالمية قوية
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-xs font-black text-slate-600">دعم عربي</div>
      <div className="mt-1 text-base font-black text-slate-900">
        متوفره بالعربية
      </div>
    </div>
  </div>

  <p className="mt-5 text-center text-sm leading-8 text-slate-600 lg:text-right">
    ركزنا في صفحة {page.country_name_ar} على الشركات التي تجمع بين
    <span className="font-bold text-slate-900"> الحساب الإسلامي الواضح </span>
    و
    <span className="font-bold text-slate-900"> التنظيم القوي </span>
    و
    <span className="font-bold text-slate-900"> الدعم العربي </span>
    حتى تكون المقارنة أقرب لاحتياجات الزائر الفعلية.
  </p>
</div>
</div>
        </section>

       

        <section id="country-ranking" className="mt-8 lg:mt-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                {page.top_brokers_title || `أفضل شركات التداول في ${page.country_name_ar}`}
              </h2>
              {page.top_brokers_subtitle ? (
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {page.top_brokers_subtitle}
                </p>
              ) : null}
            </div>
           
          </div>

          <div className="space-y-4 lg:space-y-4">
            {brokers.map((row, index) => {
              const broker = row.brokers!;
              const openUrl = getOpenAccountUrl(broker.real_account_url, broker.slug);
              const pros = splitTextToList(broker.pros);
              const cons = splitTextToList(broker.cons);

              return (
                <article
                  key={`${row.country_code}-${row.broker_id}`}
                  className="overflow-hidden border-b border-slate-200 bg-transparent shadow-none lg:rounded-[30px] lg:border lg:border-slate-200 lg:bg-white lg:shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-4 sm:px-6 lg:block">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                          {index + 1}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-black text-slate-950">
                              {broker.name}
                            </h3>

                            {index === 0 ? (
                              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-black text-emerald-700">
                                أفضل اختيار
                              </span>
                            ) : null}

                            {row.beginner_score >= 5 ? (
                              <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-black text-blue-700">
                                مناسب للمبتدئين
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
                            {broker.rating ? <span>التقييم: {broker.rating}</span> : null}
                            {broker.min_deposit ? <span>الحد الأدنى: ${broker.min_deposit}</span> : null}
                            {broker.account_types ? <span>الحسابات: {broker.account_types}</span> : null}
                            {broker.platforms ? <span>المنصات: {broker.platforms}</span> : null}
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        <Link
  href={openUrl}
  target={openUrl.startsWith("http") ? "_blank" : undefined}
  rel={openUrl.startsWith("http") ? "nofollow sponsored noopener noreferrer" : undefined}
  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
>
  افتح حساب حقيقي
</Link>

                        {broker.slug ? (
                          <Link
                            href={`/brokers/${broker.slug}`}
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
                          >
                            عرض التقييم
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="px-0 py-0 sm:px-6">
  {/* نسخة الديسكتوب: تبقى كما هي */}
  <div className="hidden lg:block">
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      <ScorePill label="الأولوية" score={row.priority_score} />
      <ScorePill label="العربية" score={row.arabic_support_score} />
      <ScorePill label="الإسلامي" score={row.islamic_account_score} />
      <ScorePill label="المدفوعات" score={row.payment_methods_score} />
      <ScorePill label="المبتدئين" score={row.beginner_score} />
      <ScorePill label="الثقة" score={row.trust_score} />
    </div>

    <div className="mt-5 grid gap-4 xl:grid-cols-2">
      <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3">
        <div className="text-sm font-black text-slate-900">
          التنظيم / الحضور الإقليمي
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:leading-7">
          {truncateText(
            row.regional_license_note || broker.regulation || "لا توجد ملاحظة إضافية حاليًا.",
            85
          )}
        </p>
      </div>

      <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3">
        <div className="text-sm font-black text-slate-900">
          طرق الإيداع والسحب
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:leading-7">
          {truncateText(
            row.payment_methods_note || "راجع وسائل التمويل المتاحة داخل صفحة الوسيط.",
            85
          )}
        </p>
      </div>

      <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3">
        <div className="text-sm font-black text-slate-900">
          الحساب الإسلامي
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:leading-7">
          {truncateText(
            row.islamic_account_note || "الحساب الإسلامي متاح وفق الشروط الحالية للوسيط.",
            85
          )}
        </p>
      </div>

      <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3">
        <div className="text-sm font-black text-slate-900">
          معلومات إضافية
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:leading-7">
          {truncateText(
            `${row.local_office_city ? `المكتب/الحضور المحلي: ${row.local_office_city}. ` : ""}${
              row.local_license_name ? `الترخيص المحلي: ${row.local_license_name}. ` : ""
            }${broker.best_for ? `مناسب لـ: ${broker.best_for}.` : ""}`,
            90
          )}
        </p>
      </div>
    </div>

    {(pros.length > 0 || cons.length > 0) ? (
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {pros.length > 0 ? (
          <div className="rounded-[24px] border border-emerald-200 bg-emerald-50/60 p-4">
            <div className="text-sm font-black text-emerald-800">
              نقاط قوة سريعة
            </div>
            <ul className="mt-3 space-y-1.5 text-sm leading-6 text-emerald-900 sm:leading-7">
              {pros.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {cons.length > 0 ? (
          <div className="rounded-[24px] border border-amber-200 bg-amber-50/70 p-4">
            <div className="text-sm font-black text-amber-800">
              نقاط يجب الانتباه لها
            </div>
            <ul className="mt-3 space-y-1.5 text-sm leading-6 text-amber-900 sm:leading-7">
              {cons.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    ) : null}
  </div>

  {/* نسخة الموبايل: صف مختصر + تفاصيل قابلة للفتح */}
 <details className="group lg:hidden overflow-hidden rounded-none border-0 bg-white">
  <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-[2px]">
  {broker.logo ? (
    <Image
      src={broker.logo}
      alt={broker.name}
      width={44}
      height={44}
      className="h-full w-full scale-[1.22] object-contain"
    />
      ) : (
        <span className="text-[10px] font-black text-slate-400">Logo</span>
      )}
    </div>

    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <span className="truncate text-[17px] font-black text-slate-950">
          {broker.name}
        </span>

        {index === 0 ? (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700">
            الأفضل
          </span>
        ) : null}
      </div>

      <div className="mt-1 flex items-center gap-2">
        <StarRating value={broker.rating ?? 4} />
      </div>

      <div className="mt-1 text-[12px] font-bold text-slate-500">
        {broker.min_deposit ? `الحد الأدنى: $${broker.min_deposit}` : "الحد الأدنى غير محدد"}
      </div>
    </div>

    <div className="shrink-0">
      <span className="inline-flex min-w-[52px] items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[12px] font-black text-slate-900 transition group-open:bg-slate-50">
  عرض
</span>
    </div>
  </summary>

  <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
    <div className="grid grid-cols-3 gap-2">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-2 py-2 text-center">
        <div className="text-[10px] font-black text-emerald-700">إسلامي</div>
        <div className="mt-1 text-sm font-black text-emerald-900">
          {row.islamic_account_score}/5
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 px-2 py-2 text-center">
        <div className="text-[10px] font-black text-blue-700">ثقة</div>
        <div className="mt-1 text-sm font-black text-blue-900">
          {row.trust_score}/5
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-2 py-2 text-center">
        <div className="text-[10px] font-black text-slate-600">عربي</div>
        <div className="mt-1 text-sm font-black text-slate-900">
          {row.arabic_support_score}/5
        </div>
      </div>
    </div>

    <div className="mt-3 space-y-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <div className="text-[12px] font-black text-slate-900">التنظيم</div>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {truncateText(
            row.regional_license_note || broker.regulation || "لا توجد ملاحظة إضافية حاليًا.",
            60
          )}
        </p>
      </div>

      {pros.length > 0 ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
          <div className="text-[12px] font-black text-emerald-800">أبرز ميزة</div>
          <p className="mt-1 text-sm leading-6 text-emerald-900">
            {pros[0]}
          </p>
        </div>
      ) : null}
    </div>

    <div className="mt-3 grid grid-cols-2 gap-2">
      <Link
  href={openUrl}
  target={openUrl.startsWith("http") ? "_blank" : undefined}
  rel={openUrl.startsWith("http") ? "nofollow sponsored noopener noreferrer" : undefined}
  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
>
  فتح حساب 
</Link>

      {broker.slug ? (
        <Link
          href={`/brokers/${broker.slug}`}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
        >
          التقييم
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-black text-slate-400">
          التقييم
        </span>
      )}
    </div>
  </div>
</details>
</div>
                </article>
              );
            })}
          </div>
        </section>

                {/* =========================
   Quick Comparison Table
========================= */}
<section className="mt-10 hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] lg:block lg:p-7">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
        مقارنة سريعة
      </div>
      <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
        مقارنة أفضل شركات التداول في {page.country_name_ar}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
        هذا الجدول يمنحك نظرة سريعة على أهم الفروقات بين أفضل الوسطاء من حيث التقييم،
        الحد الأدنى للإيداع، الحساب الإسلامي، قوة التراخيص، ومدى مناسبة الشركة للمتداول في {page.country_name_ar}.
      </p>
    </div>

    <Link
      href="#country-ranking"
      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
    >
      ارجع إلى ترتيب الشركات
    </Link>
  </div>

  <div className="mt-6 overflow-x-auto rounded-[24px] border border-slate-200">
    <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-[linear-gradient(180deg,#f8fbff_0%,#f1f5f9_100%)]">
        <tr className="text-right">
          <th className="p-4 font-black text-slate-900">الشركة</th>
          <th className="p-4 font-black text-slate-900">التقييم</th>
          <th className="p-4 font-black text-slate-900">أقل إيداع</th>
          <th className="p-4 font-black text-slate-900">الحساب الإسلامي</th>
          <th className="p-4 font-black text-slate-900">قبول العملاء</th>
          <th className="p-4 font-black text-slate-900">الدعم العربي</th>
          <th className="p-4 font-black text-slate-900">الأفضل لـ</th>
          <th className="p-4 font-black text-slate-900">إجراء</th>
        </tr>
      </thead>

      <tbody>
        {topRows.map((row: any, index: number) => {
          const broker = unwrapBroker(row);

          return (
                        <tr
              key={broker?.id ?? index}
              className="border-t border-slate-200 align-top transition hover:bg-slate-50/70"
            >
              <td className="p-4 min-w-[220px]">
                <div className="flex min-w-[180px] items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-[2px]">
  <Image
    src={getBrokerLogo(row)}
    alt={getBrokerName(row)}
    width={44}
    height={44}
    className="h-full w-full scale-[1.00] object-contain"
  />
</div>

                  <div>
                    <div className="text-sm font-black text-slate-950">
                      {getBrokerName(row)}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      #{index + 1} في ترتيب {page.country_name_ar}
                    </div>
                  </div>
                </div>
              </td>

              <td className="p-4">
                <div className="inline-flex min-w-[82px] items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-black text-blue-700">
  {getBrokerRating(row) ?? "—"} / 5
</div>
              </td>

              <td className="p-4 font-bold text-slate-800">
                {formatDeposit(getBrokerMinDeposit(row))}
              </td>

              <td className="p-4">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                  {accountIslamicText(row)}
                </span>
              </td>

              <td className="p-4">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700">
                  {acceptsClientsText(row)}
                </span>
              </td>

              <td className="p-4">
                <span className="inline-flex rounded-full bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700">
                  {supportArabicText(row)}
                </span>
              </td>

              <td className="p-4 text-slate-700">
                {getBrokerBestFor(row) || "التداول العام"}
              </td>

              <td className="p-4">
                <div className="flex min-w-[120px] flex-col gap-2">
                  <Link
                    href={`/brokers/${getBrokerSlug(row)}`}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-xs font-black text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    اقرأ التقييم
                  </Link>

                  {getBrokerRealUrl(row) ? (
                    <a
                      href={getBrokerRealUrl(row)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white transition hover:bg-blue-700"
                    >
                      افتح حساب
                    </a>
                  ) : null}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</section>

{/* =========================
   Best Picks Grid
========================= */}
<section className="mt-8 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] sm:p-7">
  <div>
    <div className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
      اختيارات سريعة
    </div>
    <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
      أفضل شركة حسب نوع المتداول
    </h2>
    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
      إذا كنت لا تريد قراءة كل التفاصيل، فهذا القسم يختصر عليك الاختيار بناءً على نوعك كمتداول:
      مبتدئ، مهتم بالحساب الإسلامي، تبحث عن الثقة، أو تريد تجربة منصة أقوى.
    </p>
  </div>

   <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {bestPickItems.map((item, i) => {
      

      return (
        <div
          key={i}
          className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[0_10px_26px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.08)]"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700">
              {item.label}
            </div>
            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              {item.badge}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-[2px]">
  <Image
    src={getBrokerLogo(item.row)}
    alt={getBrokerName(item.row)}
    width={48}
    height={48}
    className="h-full w-full scale-[1.15] object-contain"
  />
</div>

            <div>
              <div className="text-base font-black text-slate-950">
                {getBrokerName(item.row)}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                تقييم {getBrokerRating(item.row) ?? "—"} / 5
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[22px] border border-slate-200 bg-white/90 p-3.5">
            <div className="text-xs font-bold text-slate-500">أفضل لمن</div>
            <div className="mt-1 text-sm font-black text-slate-800">
              {getBrokerBestFor(item.row) || item.label}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              href={`/brokers/${getBrokerSlug(item.row)}`}
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
            >
              اقرأ التقييم
            </Link>

            {getBrokerRealUrl(item.row) ? (
              <a
                href={getBrokerRealUrl(item.row)!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
              >
                افتح حساب
              </a>
            ) : null}
          </div>
        </div>
      );
    })}
  </div>
</section>

{/* =========================
   Why These Brokers
========================= */}
<section className="mt-6 rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:mt-8 sm:rounded-[32px] sm:p-7 sm:shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
  <div className="max-w-4xl">
    <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700 sm:text-xs">
      منهجية التقييم
    </div>

    <h2 className="mt-3 text-[26px] leading-[1.15] font-black text-slate-950 sm:text-3xl">
      كيف اخترنا أفضل شركات التداول في {page.country_name_ar}؟
    </h2>

    <p className="mt-3 text-[14px] leading-7 text-slate-600 sm:text-base sm:leading-8">
      <span className="sm:hidden">
        نعتمد على 6 عوامل أساسية: قبول العملاء، التراخيص، الدعم العربي، الحساب الإسلامي، وسائل الدفع، والحد الأدنى للإيداع.
      </span>
      <span className="hidden sm:inline">
        اعتمدنا في ترتيب هذه الشركات على مجموعة من المعايير العملية التي تهم المتداول في {page.country_name_ar}،
        وليس فقط على الشهرة العامة. قمنا بمراجعة مدى قبول الشركة للعملاء، قوة التراخيص، توفر الدعم العربي،
        إمكانية الحساب الإسلامي، وسائل الدفع المناسبة، الحد الأدنى للإيداع، وتجربة المنصات المتاحة.
      </span>
    </p>
  </div>

  {/* mobile compact */}
  <div className="mt-5 space-y-2 sm:hidden">
    {[
      "قبول العملاء",
      "التراخيص والثقة",
      "الدعم العربي",
      "الحساب الإسلامي",
      "وسائل الدفع",
      "الحد الأدنى للإيداع",
    ].map((item, i) => (
      <div
        key={i}
        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
      >
        <span className="text-[14px] font-black text-slate-900">{item}</span>
        <span className="text-[11px] font-bold text-slate-500">عامل تقييم</span>
      </div>
    ))}
  </div>

  {/* desktop / tablet cards */}
  <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
    {[
      {
        title: "مدى قبول العملاء",
        text: `نراجع ما إذا كانت الشركة مناسبة فعليًا لمتداولي ${page.country_name_ar} من حيث فتح الحساب والوصول إلى الخدمات.`,
      },
      {
        title: "التراخيص والثقة",
        text: "نأخذ بعين الاعتبار الجهة التنظيمية، السمعة العامة، ومدى وضوح معلومات الشركة وهيكلها القانوني.",
      },
      {
        title: "الدعم العربي",
        text: "وجود دعم عربي أو محتوى عربي واضح يحسن التجربة كثيرًا، خصوصًا للمبتدئ والمتداول متوسط الخبرة.",
      },
      {
        title: "الحساب الإسلامي",
        text: "نراجع توفر الحسابات الإسلامية أو بدائلها، مع الانتباه إلى وضوح الشروط المرتبطة بها.",
      },
      {
        title: "وسائل الدفع",
        text: "كلما كانت خيارات الإيداع والسحب أوضح وأسهل وأكثر مناسبة، ارتفعت جاذبية الوسيط للمتداول المحلي.",
      },
      {
        title: "الحد الأدنى والمنصات",
        text: "نقارن بين سهولة البداية، قوة المنصات مثل MT4 وMT5 وcTrader، وتجربة الاستخدام عمومًا.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="rounded-[26px] border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm"
      >
        <div className="text-base font-black text-slate-900">{item.title}</div>
        <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
      </div>
    ))}
  </div>
</section>

<RegulationSection
  regulationTitle={page.regulation_title}
  regulationText={page.regulation_text}
  sidebarTitle={page.sidebar_title}
  sidebarText={page.sidebar_text}
  sidebarPoints={page.sidebar_points}
/>

{/* =========================
   Local Fit Section
========================= */}
<section className="mt-6 rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:mt-8 sm:rounded-[32px] sm:p-7 sm:shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
  <div className="grid gap-4 lg:grid-cols-2">
    <div className="rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 sm:rounded-[26px] sm:p-5">
      <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-700 sm:text-xs">
        ملاءمة السوق المحلي
      </div>

      <h2 className="text-[22px] leading-[1.2] font-black text-slate-950 sm:text-2xl">
        هل هذه الشركات مناسبة لمتداولي {page.country_name_ar}؟
      </h2>

      <p className="mt-3 text-[14px] leading-7 text-slate-600 sm:text-base sm:leading-8">
        نعم، هذه الصفحة مخصصة لتسليط الضوء على الوسطاء الذين يظهرون توافقًا أفضل مع احتياجات المتداولين في {page.country_name_ar}. 
        ومع ذلك، قد تختلف شروط فتح الحساب أو وسائل الدفع أو توفر بعض الخدمات من شركة لأخرى، لذلك ننصح دائمًا بقراءة صفحة التقييم الكاملة قبل اتخاذ القرار.
      </p>
    </div>

    <div className="rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 sm:rounded-[26px] sm:p-5">
      <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700 sm:text-xs">
        قبل فتح الحساب
      </div>

      <h2 className="text-[22px] leading-[1.2] font-black text-slate-950 sm:text-2xl">
        ماذا تفعل قبل فتح الحساب؟
      </h2>

      <div className="mt-4 grid gap-2.5">
        {[
          "راجع الترخيص ونوع الجهة المنظمة.",
          "تأكد من الحد الأدنى للإيداع وطريقة السحب.",
          "اقرأ شروط الحساب الإسلامي إن كان مهمًا لك.",
          "قارن بين المنصات المتاحة وتجربة الاستخدام.",
          "ابدأ بمبلغ مناسب قبل التوسع في التداول.",
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3"
          >
            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">
              {i + 1}
            </span>
            <span className="text-[13px] leading-6 text-slate-700 sm:text-sm sm:leading-7">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{page.faq_title && page.faq_items?.length ? (
  <section className="mt-8 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-7">
    <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
      {page.faq_title}
    </h2>

    <div className="mt-5 space-y-3">
      {page.faq_items.map((item, i) => (
        <details
          key={i}
          className="group rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 open:bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-right text-base font-black text-slate-900">
            <span>{item.q}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700 transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  </section>
) : null}

      </div>
    </main>
  );
}