import Link from "next/link";

import Image from "next/image";

import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import MobileExpandableText from "./MobileExpandableText";

import RelatedAccountComparisons from "./RelatedAccountComparisons";

type PageProps = {
  params: Promise<{
    slug: string;
    account: string;
  }>;
  searchParams?: Promise<{
    preview?: string | string[];
  }>;
};

function slugify(value: string | null) {
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

function moneyRank(value?: string | null) {
  if (!value) return 999999;
  const num = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : 999999;
}

function getPreviewToken(
  query: { preview?: string | string[] } | undefined
) {
  if (!query) return undefined;

  return Array.isArray(query.preview)
    ? query.preview[0]
    : query.preview;
}

function withPreview(path: string, previewToken?: string) {
  if (!previewToken) return path;

  return `${path}?preview=${encodeURIComponent(previewToken)}`;
}

async function getBrokerAccess(
  slug: string,
  previewToken?: string
) {
  const supabase = await createClient();

  const { data: broker, error } = await supabase
    .from("brokers")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !broker) {
    return null;
  }

  const hasValidPreview =
    broker.preview_enabled === true &&
    Boolean(previewToken) &&
    broker.preview_token === previewToken;

  const canAccess =
    broker.publication_status === "published" ||
    hasValidPreview;

  if (!canAccess) {
    return null;
  }

  return {
    broker,
    hasValidPreview,
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps) {
  const { slug, account } = await params;
  const query = (await searchParams) || {};
  const previewToken = getPreviewToken(query);

  const access = await getBrokerAccess(slug, previewToken);

  if (!access) {
    return {
      title: "حسابات شركات التداول",
      description: "مراجعة أنواع حسابات شركات التداول.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { broker } = access;

  const supabase = await createClient();

  const { data: accounts } = await supabase
  .from("broker_accounts")
  .select("*")
  .eq("broker_id", broker.id);

  const current = accounts?.find(
    (a) => slugify(a.account_name) === account
  );

  if (!current) {
    return {
      title: "حسابات شركات التداول",
      description: "مراجعة أنواع حسابات شركات التداول.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    `حساب ${current.account_name} في ${broker.name}: السبريد والعمولة`;

  const description =
    `شرح حساب ${current.account_name} في ${broker.name}: السبريد، العمولة، أقل إيداع، نوع التنفيذ، وهل يناسب هذا الحساب أسلوب تداولك.`;

const isPreview =
  broker.publication_status !== "published";

  return {
    title: {
      absolute: title,
    },

    description,

    robots: isPreview
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },

    alternates: {
      canonical: `/brokers/${broker.slug}/accounts/${slugify(
        current.account_name
      )}`,
    },
  };
}

export default async function BrokerAccountPage({
  params,
  searchParams,
}: PageProps) {
  const { slug, account } = await params;
  const query = (await searchParams) || {};
  const previewToken = getPreviewToken(query);

  const access = await getBrokerAccess(slug, previewToken);

  if (!access) {
    notFound();
  }

  const { broker } = access;

  const supabase = await createClient();

  const { data: accounts } = await supabase
  .from("broker_accounts")
  .select("*")
  .eq("broker_id", broker.id)
  .order("sort_order", { ascending: true });

  if (!accounts?.length) {
    notFound();
  }

  const current = accounts.find(
    (a) => slugify(a.account_name) === account
  );

  if (!current) {
  notFound();
}

/* =========================================================
   Advanced account editorial / SEO content
   Optional: if no content exists, the page keeps using
   the existing generated template.
========================================================= */

const { data: accountContent } = await supabase
  .from("broker_account_content")
  .select(`
    overview_ar,
    overview_en,
    expert_verdict_ar,
    expert_verdict_en,
    pros_ar,
    pros_en,
    cons_ar,
    cons_en,
    who_is_it_for_ar,
    who_is_it_for_en,
    unique_content_ar,
    unique_content_en,
    faq_ar,
    faq_en,
    important_notes_title_ar,
    important_notes_title_en,
    important_notes_ar,
    important_notes_en,
    hero_intro_ar,
    hero_intro_en
  `)
  .eq("account_id", current.id)
  .maybeSingle();

const hasAdvancedContent = Boolean(
  accountContent?.overview_ar?.trim() ||
  accountContent?.expert_verdict_ar?.trim() ||
  (Array.isArray(accountContent?.pros_ar) &&
    accountContent.pros_ar.length > 0) ||
  (Array.isArray(accountContent?.cons_ar) &&
    accountContent.cons_ar.length > 0) ||
  (Array.isArray(accountContent?.who_is_it_for_ar) &&
    accountContent.who_is_it_for_ar.length > 0) ||
  (Array.isArray(accountContent?.unique_content_ar) &&
    accountContent.unique_content_ar.length > 0) ||
  (Array.isArray(accountContent?.faq_ar) &&
    accountContent.faq_ar.length > 0)
);

const advancedPros =
  hasAdvancedContent && Array.isArray(accountContent?.pros_ar)
    ? accountContent.pros_ar
    : [];

const advancedCons =
  hasAdvancedContent && Array.isArray(accountContent?.cons_ar)
    ? accountContent.cons_ar
    : [];

const advancedAudience =
  hasAdvancedContent && Array.isArray(accountContent?.who_is_it_for_ar)
    ? accountContent.who_is_it_for_ar
    : [];

const advancedSections =
  hasAdvancedContent && Array.isArray(accountContent?.unique_content_ar)
    ? accountContent.unique_content_ar
    : [];

const advancedFaq =
  hasAdvancedContent && Array.isArray(accountContent?.faq_ar)
    ? accountContent.faq_ar
    : [];

const advancedImportantNotes =
  Array.isArray(accountContent?.important_notes_ar)
    ? accountContent.important_notes_ar
    : [];

const hasImportantNotes =
  advancedImportantNotes.length > 0;

const isCapital = broker.slug === "capital-com";

const isCapitalSwapFree =
  isCapital &&
  (current.account_name || "").toLowerCase().startsWith("swap-free");

const isCapitalCfd =
  isCapital &&
  (current.account_name || "").toLowerCase().startsWith("cfd");

const cheapestSpread = [...accounts].sort(
  (a, b) => Number(a.spread_avg ?? 99) - Number(b.spread_avg ?? 99)
)[0];

  const lowestDeposit = [...accounts].sort(
    (a, b) => moneyRank(a.min_deposit) - moneyRank(b.min_deposit)
  )[0];

  const zeroCommission =
    String(current.commission_value ?? current.commission) === "0" ||
    current.commission === "$0";

  const betterSpreadAccounts = accounts.filter(
    (a) => Number(a.spread_avg ?? 99) < Number(current.spread_avg ?? 99)
  );

  
const { data: comparisonBrokersData } = await supabase
  .from("brokers")
  .select("id,name,slug")
  .eq("publication_status", "published")
  .neq("id", broker.id);

const comparisonBrokers = (comparisonBrokersData ?? []).filter(
  (item) => item.name && item.slug && item.slug !== "naga"
);

const comparisonBrokerIds = comparisonBrokers.map((item) => item.id);

const { data: comparisonAccountsData } =
  comparisonBrokerIds.length > 0
    ? await supabase
        .from("broker_accounts")
        .select("id,broker_id,account_name")
        .in("broker_id", comparisonBrokerIds)
    : { data: [] };

const currentComparisonKey =
  `${broker.slug}-${slugify(current.account_name)}`;

const relatedComparisonCandidates = (comparisonAccountsData ?? [])
  .flatMap((otherAccount) => {
    const otherBroker = comparisonBrokers.find(
      (item) => item.id === otherAccount.broker_id
    );

    if (!otherBroker || !otherAccount.account_name) return [];

    const otherAccountSlug = slugify(otherAccount.account_name);

    if (!otherAccountSlug) return [];

    const otherKey = `${otherBroker.slug}-${otherAccountSlug}`;

    const sortedKeys = [currentComparisonKey, otherKey].sort();

    return [{
      key: `${otherBroker.id}-${otherAccount.id}`,
      brokerName: otherBroker.name,
      accountName: otherAccount.account_name,
      href: `/compare-accounts/${sortedKeys[0]}-vs-${sortedKeys[1]}`,
    }];
  });



const normalizeAccountType = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");

const currentAccountType = normalizeAccountType(
  current.account_name
);

// Remove duplicate comparison URLs
const uniqueRelatedComparisons =
  relatedComparisonCandidates.filter(
    (item, index, all) =>
      all.findIndex(
        (candidate) => candidate.href === item.href
      ) === index
  );

// Matching account names have first priority
const matchingAccounts = uniqueRelatedComparisons.filter(
  (item) =>
    normalizeAccountType(item.accountName) === currentAccountType
);

// Other account types are fallback only
const fallbackAccounts = uniqueRelatedComparisons.filter(
  (item) =>
    normalizeAccountType(item.accountName) !== currentAccountType
);

const relatedComparisons = [
  ...matchingAccounts,
  ...fallbackAccounts,
].map((item, index) => ({
  ...item,
  matchPriority: index < matchingAccounts.length ? 0 : 1,
}));




  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f7fb] text-[#0f172a]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 py-3 text-xs text-slate-500 md:py-4">
          <Link href="/" className="hover:text-brand-600">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link
  href={withPreview(
    `/brokers/${broker.slug}`,
    previewToken
  )}
  className="hover:text-brand-600"
>
            تقييم {broker.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-slate-900">
            حساب {current.account_name}
          </span>
        </div>
      </section>

      {/* Mobile Hero */}
<section className="px-3 py-4 md:hidden">
  <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-center shadow-sm">
    <div className="mb-3 flex flex-wrap justify-center gap-1.5">
      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
        دليل حسابات {broker.name}
      </span>

      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
        {zeroCommission ? "بدون عمولة" : `عمولة ${current.commission}`}
      </span>

      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-700">
        {current.execution_type}
      </span>
    </div>

    <h1 className="text-[25px] font-black leading-[1.4] text-slate-950">
      حساب {current.account_name} في {broker.name}: هل يناسبك؟
    </h1>

    <div className="mx-auto mt-3 max-w-[560px] text-[13px] leading-7 text-slate-600">
      <MobileExpandableText lines={3}>
        {accountContent?.hero_intro_ar?.trim()
          ? accountContent.hero_intro_ar
          : `شرح مختصر لتكلفة التداول، السبريد، العمولة، أقل إيداع، ونوع التنفيذ مع مقارنة مباشرة بباقي حسابات ${broker.name}.`}
      </MobileExpandableText>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-2">
      {[
        ["السبريد", current.spread],
        ["العمولة", current.commission],
        ["أقل إيداع", current.min_deposit],
        [
          "إسلامي",
          current.is_islamic_available ? "متاح" : "غير محدد",
        ],
      ].map(([label, value]) => (
        <div
  key={label}
  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center"
>
          <p className="text-[10px] font-bold text-slate-500">
            {label}
          </p>

          <strong className="mt-0.5 block text-base font-black text-slate-950">
            {value}
          </strong>
        </div>
      ))}
    </div>

    <div className="mt-4 grid gap-2">
      {broker.real_account_url && (
        <a
          href={broker.real_account_url}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="flex min-h-[48px] items-center justify-center rounded-xl bg-brand-500 px-6 text-[15px] font-black text-white shadow-md hover:bg-brand-600"
        >
          فتح حساب حقيقي
        </a>
      )}

      <Link
        href={withPreview(
          `/brokers/${broker.slug}`,
          previewToken
        )}
        className="flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-900 hover:bg-slate-50"
      >
        العودة إلى تقييم {broker.name}
      </Link>
    </div>
  </div>

  <div className="mt-3 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center gap-3">
      {broker.logo && (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white">
          <Image
            src={broker.logo}
            alt={broker.name}
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
      )}

      <div className="text-right">
        <p className="text-[10px] text-slate-500">
          حساب تداول
        </p>

        <h2 className="text-base font-black">
          {current.account_name}
        </h2>
      </div>
    </div>

    <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50 px-3 py-2.5 text-right">
      <p className="text-[10px] font-bold text-blue-800">
        الأفضل لـ
      </p>

      <p className="mt-0.5 text-[13px] font-black leading-6 text-blue-950">
        {current.best_for}
      </p>
    </div>
  </div>
</section>

      {/* Desktop Hero - unchanged */}
      <section className="relative hidden overflow-hidden bg-white md:block">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blue-50 to-transparent" />

        <div className="relative mx-auto flex max-w-[1520px] flex-col gap-6 px-4 py-6 lg:flex-row">
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                دليل حسابات {broker.name}
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {zeroCommission ? "بدون عمولة" : `عمولة ${current.commission}`}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {current.execution_type}
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-4xl">
  حساب {current.account_name} في {broker.name}: السبريد، العمولة وهل
  يناسبك؟
</h1>

            <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-600 md:text-base">
  {accountContent?.hero_intro_ar?.trim()
    ? accountContent.hero_intro_ar
    : `إذا كنت تفكر في فتح حساب ${current.account_name} لدى ${broker.name}، فهذه الصفحة تمنحك شرحًا واضحًا لتكلفة التداول، السبريد، العمولة، أقل إيداع، ونوع التنفيذ، مع مقارنة مباشرة بباقي حسابات الشركة حتى تختار الحساب الأنسب لطريقة تداولك.`}
</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["السبريد", current.spread],
                ["العمولة", current.commission],
                ["أقل إيداع", current.min_deposit],
                ["الحساب الإسلامي", current.is_islamic_available ? "متاح" : "غير محدد"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs text-slate-500">{label}</p>
                  <strong className="mt-2 block text-lg font-black">
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {broker.real_account_url && (
                <a
                  href={broker.real_account_url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-brand-600"
                >
                  فتح حساب حقيقي
                </a>
              )}

              <Link
                href={withPreview(
  `/brokers/${broker.slug}`,
  previewToken
)}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 hover:bg-slate-50"
              >
                العودة إلى تقييم {broker.name}
              </Link>
            </div>
          </div>

          <aside className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-[320px]">
            <div className="flex items-center gap-4">
              {broker.logo && (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                  <Image
                    src={broker.logo}
                    alt={broker.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}

              <div>
                <p className="text-xs text-slate-500">حساب تداول</p>
                <h2 className="text-2xl font-black">{current.account_name}</h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                ["الوسيط", broker.name],
                ["السبريد", current.spread],
                ["العمولة", current.commission],
                ["أقل إيداع", current.min_deposit],
                ["نوع التنفيذ", current.execution_type],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-xs text-slate-500">{label}</span>
                  <strong className="text-sm text-slate-950">{value}</strong>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-4">
              <p className="text-xs font-bold text-blue-800">الأفضل لـ</p>
              <p className="mt-2 text-sm font-black leading-7 text-blue-950">
                {current.best_for}
              </p>
            </div>
                    </aside>
        </div>
      </section>

      {isCapital ? (
        <section className="mx-auto max-w-[1520px] px-4 pt-2 md:pt-4">
          <div className="rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-right md:px-5 md:py-4">
            <p className="text-xs leading-6 text-slate-700 md:text-sm md:leading-7">
              <span className="font-black text-slate-900">
                الرافعة المالية:
              </span>{" "}
              قد تصل الرافعة المالية لدى Capital.com إلى 1:500، ويعتمد الحد الأقصى
              المتاح على الكيان التنظيمي المطبق ومدى أهلية العميل.
            </p>

            {isCapitalSwapFree ? (
              <p className="mt-2 border-t border-brand-100 pt-2 text-xs leading-6 text-slate-700 md:text-sm md:leading-7">
                <span className="font-black text-slate-900">
                  توفر حساب Swap-Free:
                </span>{" "}
                يتوفر هذا الحساب فقط من خلال كيانات Capital.com الخاضعة لرقابة
                SCB وCMA، كما يعتمد توفره على بلد إقامة العميل.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1520px] px-3 py-3 md:px-4 md:py-8">

  {/* Mobile - compact account stats */}
  <div className="md:hidden">
    <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Lowest spread */}
      <Link
        href={withPreview(
          `/brokers/${broker.slug}/accounts/${slugify(
            cheapestSpread.account_name
          )}`,
          previewToken
        )}
        className="min-w-0 px-2 py-3 text-center"
      >
        <p className="text-[9px] font-bold leading-4 text-slate-500">
          أقل سبريد
        </p>

        <p className="mt-1 truncate text-[12px] font-black text-slate-950">
          {cheapestSpread.account_name}
        </p>

        <p className="mt-1 text-[10px] font-bold text-brand-600">
          {cheapestSpread.spread}
        </p>
      </Link>

      {/* Lowest deposit */}
      <Link
        href={withPreview(
          `/brokers/${broker.slug}/accounts/${slugify(
            lowestDeposit.account_name
          )}`,
          previewToken
        )}
        className="min-w-0 px-2 py-3 text-center"
      >
        <p className="text-[9px] font-bold leading-4 text-slate-500">
          أقل إيداع
        </p>

        <p className="mt-1 truncate text-[12px] font-black text-slate-950">
          {lowestDeposit.account_name}
        </p>

        <p className="mt-1 text-[10px] font-bold text-brand-600">
          {lowestDeposit.min_deposit}
        </p>
      </Link>

      {/* Account count */}
      <div className="min-w-0 px-2 py-3 text-center">
        <p className="text-[9px] font-bold leading-4 text-slate-500">
          الحسابات
        </p>

        <p className="mt-1 text-[12px] font-black text-slate-950">
          {accounts.length} حسابات
        </p>

        <p className="mt-1 text-[10px] font-bold text-slate-500">
          للمقارنة
        </p>
      </div>

    </div>
  </div>

  {/* Desktop - keep current design unchanged */}
  <div className="hidden gap-3 md:grid md:grid-cols-3 md:gap-5">

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-sm text-slate-500">
        أقل سبريد في حسابات {broker.name}
      </p>

      <h3 className="mt-2 text-xl font-black">
        {cheapestSpread.account_name}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        سبريد يبدأ من {cheapestSpread.spread}
      </p>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-sm text-slate-500">
        أقل إيداع في حسابات {broker.name}
      </p>

      <h3 className="mt-2 text-xl font-black">
        {lowestDeposit.account_name}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        يبدأ من {lowestDeposit.min_deposit}
      </p>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-sm text-slate-500">
        عدد حسابات {broker.name}
      </p>

      <h3 className="mt-2 text-xl font-black">
        {accounts.length} حسابات
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        مقارنة مباشرة بين الحسابات المتاحة
      </p>
    </div>

  </div>
</section>

      <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
  <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:gap-5">

    {/* Account Overview */}
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-[22px] font-black leading-8 md:text-2xl">
        ما هو حساب {current.account_name} في {broker.name}؟
      </h2>

      {hasAdvancedContent && accountContent?.overview_ar ? (
        <>
  {/* Mobile: show only first 3 lines, then expand */}
  <div className="mt-3 md:hidden">
    <MobileExpandableText
      lines={3}
      className="text-[13px] leading-7 text-slate-600"
    >
      {accountContent.overview_ar}
    </MobileExpandableText>
  </div>

  {/* Desktop: keep the current full content exactly as before */}
  <div className="mt-4 hidden space-y-4 md:block">
    {accountContent.overview_ar
      .split(/\n\s*\n/)
      .filter(Boolean)
      .map((paragraph: string, index: number) => (
        <p
          key={index}
          className="text-sm leading-8 text-slate-600 md:text-[15px]"
        >
          {paragraph}
        </p>
      ))}
  </div>
</>
      ) : isCapitalSwapFree ? (
        <>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            حساب Swap-Free لدى Capital.com مخصص للعملاء المؤهلين الذين يحتاجون
            إلى التداول دون رسوم تبييت تقليدية. وقد تكون فروقات الأسعار في هذا
            الحساب أوسع من حساب CFD القياسي، كما قد تختلف شروط التداول بحسب
            الأداة المالية وظروف السوق والكيان التنظيمي المطبق.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-600">
            يتوفر حساب Swap-Free فقط من خلال كيانات Capital.com الخاضعة لرقابة
            SCB وCMA، كما يعتمد توفر الحساب على بلد إقامة العميل. لذلك يجب التأكد
            من توفر الحساب والكيان القانوني المطبق قبل التسجيل.
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            حساب {current.account_name} هو أحد حسابات التداول التي توفرها شركة{" "}
            {broker.name}. يتميز بسبريد يتراوح بين{" "}
            <strong>{current.spread}</strong>، وعمولة تبلغ{" "}
            <strong>{current.commission}</strong>، مع حد أدنى للإيداع يبدأ من{" "}
            <strong>{current.min_deposit}</strong>.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-600">
            يناسب هذا الحساب فئة <strong>{current.best_for}</strong>، لكن
            الأفضل دائمًا مقارنته مع باقي حسابات {broker.name} من حيث السبريد،
            العمولة، نوع التنفيذ، وأسلوب التداول المناسب.
          </p>
        </>
      )}
    </div>

    {/* Expert Verdict */}
    <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 shadow-sm md:p-6">
      <div className="mb-3 flex items-center gap-2">
        {hasAdvancedContent && (
          <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-black text-white">
            تحليل Broker Alarab
          </span>
        )}
      </div>

      <h3 className="text-[22px] font-black text-blue-950 md:text-xl">
        {hasAdvancedContent ? "رأينا في الحساب" : "الحكم السريع"}
      </h3>

      {hasAdvancedContent && accountContent?.expert_verdict_ar ? (
  <>
    {/* Mobile */}
    <div className="mt-3 md:hidden">
      <MobileExpandableText
        lines={3}
        className="text-[13px] leading-7 text-blue-900"
      >
        {accountContent.expert_verdict_ar}
      </MobileExpandableText>
    </div>

    {/* Desktop - unchanged */}
    <div className="mt-3 hidden space-y-3 md:block">
      {accountContent.expert_verdict_ar
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((paragraph: string, index: number) => (
          <p
            key={index}
            className="text-sm leading-8 text-blue-900"
          >
            {paragraph}
          </p>
        ))}
    </div>
  </>
) : (
        <p className="mt-3 text-sm leading-8 text-blue-900">
          حساب {current.account_name} مناسب أكثر لـ {current.best_for}.{" "}
          {betterSpreadAccounts.length > 0
            ? `إذا كان هدفك الأساسي أقل سبريد، قارن أيضًا مع ${betterSpreadAccounts
                .map((a) => a.account_name)
                .join("، ")}.`
            : "ويُعد من الخيارات القوية من ناحية السبريد داخل هذه الشركة."}
        </p>
      )}
    </div>

  </div>
</section>

      <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
  {/* Who is it for + Cons */}
  <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">

    {/* Who is it for */}
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-[22px] font-black leading-8 md:text-2xl">
        لمن يناسب حساب {current.account_name}؟
      </h2>

      <div className="mt-4 grid gap-3">
        {(hasAdvancedContent && advancedAudience.length > 0
          ? advancedAudience
          : [
              `مناسب لمن يبحث عن حساب يخدم فئة ${current.best_for}.`,
              "مناسب لمن يريد معرفة تكلفة التداول قبل فتح الحساب.",
              `مناسب لمن يقارن السبريد والعمولة بين حسابات ${broker.name}.`,
              `مناسب لمن يريد التداول عبر ${
                broker.platforms || "منصات التداول المتاحة"
              }.`,
            ]
        ).map((item: string, index: number) => (
          <div
            key={`${item}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-right"
          >
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">
              ✓
            </span>

            <p className="text-sm leading-7 text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Cons */}
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-[22px] font-black leading-8 md:text-2xl">
        متى لا يكون {current.account_name} مناسبًا؟
      </h2>

      <div className="mt-4 grid gap-3">
        {(hasAdvancedContent && advancedCons.length > 0
          ? advancedCons
          : [
              "إذا كنت تبحث عن أقل سبريد ممكن وهناك حساب آخر أقل تكلفة.",
              "إذا كان الحد الأدنى للإيداع لا يناسب رأس مالك الحالي.",
              "إذا كان أسلوب تداولك يحتاج إلى نوع تنفيذ مختلف.",
              "إذا كانت شروط الحساب لا تناسب طريقة تداولك.",
            ]
        ).map((item: string, index: number) => (
          <div
            key={`${item}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-3 text-right"
          >
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
              !
            </span>

            <p className="text-sm leading-7 text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>

  {/* Advanced Pros */}
  {hasAdvancedContent && advancedPros.length > 0 && (
    <div className="mt-4 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-black text-white">
          ✓
        </span>

        <h3 className="text-lg font-black text-slate-950 md:text-xl">
          أبرز مميزات حساب {current.account_name}
        </h3>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {advancedPros.map((item: string, index: number) => (
          <div
            key={`${item}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-right"
          >
            <span className="mt-1 font-black text-emerald-600">
              +
            </span>

            <p className="text-sm leading-7 text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
</section>

{hasAdvancedContent && advancedSections.length > 0 && (
  <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

      {/* Section Header */}
      <div className="border-b border-slate-100 pb-5">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
          تحليل الحساب
        </span>

        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[22px] font-black leading-8 text-slate-950 md:text-2xl">
            تفاصيل مهمة قبل اختيار حساب {current.account_name}
          </h2>

          <p className="max-w-lg text-sm leading-7 text-slate-500">
            نقاط تساعدك على فهم الفروقات المهمة قبل اختيار الحساب.
          </p>
        </div>
      </div>

     {/* Analysis Cards */}

{/* Mobile */}
<div className="mt-4 space-y-3 md:hidden">
  {advancedSections.map(
    (
      section: { title?: string; content?: string },
      index: number
    ) => {
      const relatedAccounts = accounts.filter((item) => {
        if (item.id === current.id || !section.title) {
          return false;
        }

        const title = section.title.toLowerCase();
        const accountName = String(
          item.account_name || ""
        ).toLowerCase();

        return title.includes(accountName);
      });

      return (
        <article
          key={`mobile-${section.title}-${index}`}
          className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
        >
          {section.title && (
            <h3 className="text-[14px] font-black leading-6 text-slate-950">
              {section.title}
            </h3>
          )}

          {section.content && (
            <div className="mt-3 border-t border-slate-200 pt-3">
              <MobileExpandableText
                lines={3}
                className="text-[13px] leading-7 text-slate-600"
              >
                {section.content}
              </MobileExpandableText>
            </div>
          )}

          {relatedAccounts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedAccounts.map((item) => (
                <Link
                  key={item.id}
                  href={withPreview(
                    `/brokers/${broker.slug}/accounts/${slugify(
                      item.account_name
                    )}`,
                    previewToken
                  )}
                  className="inline-flex items-center gap-1 rounded-lg border border-brand-100 bg-white px-2.5 py-1.5 text-[10px] font-black text-brand-600"
                >
                  عرض حساب {item.account_name}
                  <span aria-hidden="true">←</span>
                </Link>
              ))}
            </div>
          )}
        </article>
      );
    }
  )}
</div>


{/* Desktop - unchanged */}
<div className="mt-5 hidden items-stretch gap-4 md:grid lg:grid-cols-3">
  {advancedSections.map(
    (
      section: { title?: string; content?: string },
      index: number
    ) => {
      const relatedAccounts = accounts.filter((item) => {
        if (item.id === current.id || !section.title) {
          return false;
        }

        const title = section.title.toLowerCase();
        const accountName = String(
          item.account_name || ""
        ).toLowerCase();

        return title.includes(accountName);
      });

      return (
        <article
          key={`desktop-${section.title}-${index}`}
          className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
        >
          {section.title && (
            <div className="flex min-h-[64px] items-start border-b border-slate-200 pb-3">
              <h3 className="w-full text-[15px] font-black leading-7 text-slate-950 md:text-base">
                {section.title}
              </h3>
            </div>
          )}

          {section.content && (
            <p className="mt-4 text-sm leading-8 text-slate-600">
              {section.content}
            </p>
          )}

          {relatedAccounts.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {relatedAccounts.map((item) => (
                <Link
                  key={item.id}
                  href={withPreview(
                    `/brokers/${broker.slug}/accounts/${slugify(
                      item.account_name
                    )}`,
                    previewToken
                  )}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-brand-100 bg-white px-3 py-2 text-xs font-black text-brand-600 transition hover:border-brand-300 hover:bg-brand-50"
                >
                  <span>
                    عرض حساب {item.account_name}
                  </span>

                  <span aria-hidden="true">
                    ←
                  </span>
                </Link>
              ))}
            </div>
          )}
        </article>
      );
    }
  )}
</div>
    </div>
  </section>
)}

            <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 text-center md:p-6 md:text-right">
            <h2 className="text-[22px] font-black leading-8 md:text-2xl">
              مقارنة حساب {current.account_name} مع حسابات {broker.name}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              اختر الحساب الأنسب من خلال مقارنة مبسطة بدون سكرول أفقي على الموبايل.
            </p>
          </div>

          {/* Mobile account cards */}
<div className="space-y-2.5 p-3 md:hidden">
  {accounts.map((item) => {
    const active = item.id === current.id;

    return (
      <div
        key={item.id}
        className={`overflow-hidden rounded-2xl border ${
          active
            ? "border-blue-300 bg-brand-50/60"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Account name */}
        <div className="flex items-center justify-between gap-3 px-3.5 pt-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${
                active
                  ? "bg-brand-500 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {item.account_name}
            </span>

            {active && (
              <span className="text-[10px] font-black text-brand-600">
                الحساب الحالي
              </span>
            )}
          </div>

          {!active && (
            <Link
              href={withPreview(
                `/brokers/${broker.slug}/accounts/${slugify(
                  item.account_name
                )}`,
                previewToken
              )}
              className="shrink-0 text-[10px] font-black text-brand-600"
            >
              التفاصيل ←
            </Link>
          )}
        </div>

        {/* Main numbers */}
        <div className="mt-3 grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 border-y border-slate-100 bg-slate-50/80">
          <div className="px-2 py-2.5 text-center">
            <p className="text-[9px] font-bold text-slate-500">
              السبريد
            </p>
            <strong className="mt-0.5 block text-[12px] font-black text-slate-950">
              {item.spread || "-"}
            </strong>
          </div>

          <div className="px-2 py-2.5 text-center">
            <p className="text-[9px] font-bold text-slate-500">
              العمولة
            </p>
            <strong className="mt-0.5 block text-[12px] font-black text-slate-950">
              {item.commission || "-"}
            </strong>
          </div>

          <div className="px-2 py-2.5 text-center">
            <p className="text-[9px] font-bold text-slate-500">
              أقل إيداع
            </p>
            <strong className="mt-0.5 block text-[12px] font-black text-slate-950">
              {item.min_deposit || "-"}
            </strong>
          </div>
        </div>

        {/* Best for */}
        <div className="flex items-center gap-2 px-3.5 py-2.5">
          <span className="shrink-0 text-[9px] font-bold text-slate-500">
            مناسب لـ
          </span>

          <p className="min-w-0 truncate text-[11px] font-black text-slate-800">
            {item.best_for || "-"}
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 px-3 py-2.5">
          {active ? (
            <div className="flex min-h-[34px] items-center justify-center rounded-lg bg-brand-50 px-2 text-[10px] font-black text-brand-700">
              أنت تشاهد هذا الحساب
            </div>
          ) : (
            <Link
              href={withPreview(
                `/brokers/${broker.slug}/accounts/${slugify(
                  item.account_name
                )}`,
                previewToken
              )}
              className="flex min-h-[34px] items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-[10px] font-black text-slate-800"
            >
              عرض الحساب
            </Link>
          )}

          {broker.real_account_url ? (
            <a
              href={broker.real_account_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="flex min-h-[34px] items-center justify-center rounded-lg bg-brand-500 px-2 text-[10px] font-black text-white"
            >
              فتح حساب
            </a>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  })}
</div>

          {/* Desktop account comparison table */}
<div className="hidden overflow-x-auto md:block">
  <table className="w-full min-w-[900px] text-sm">
    <thead className="bg-slate-50 text-slate-500">
      <tr>
        <th className="p-4 text-right">الحساب</th>
        <th className="p-4 text-right">السبريد</th>
        <th className="p-4 text-right">العمولة</th>
        <th className="p-4 text-right">أقل إيداع</th>
        <th className="p-4 text-right">الأفضل لـ</th>
        <th className="p-4 text-center">التفاصيل</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-slate-100">
      {accounts.map((item) => {
        const active = item.id === current.id;

        const accountUrl = withPreview(
          `/brokers/${broker.slug}/accounts/${slugify(
            item.account_name
          )}`,
          previewToken
        );

        return (
          <tr
            key={item.id}
            className={
              active
                ? "bg-brand-50"
                : "bg-white transition hover:bg-slate-50"
            }
          >
            {/* Account */}
            <td className="p-4">
              <Link
                href={accountUrl}
                className={`inline-flex rounded-full px-3 py-1 text-xs font-black transition ${
                  active
                    ? "bg-brand-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600"
                }`}
              >
                {item.account_name}
              </Link>
            </td>

            {/* Spread */}
            <td className="p-4 font-bold text-slate-900">
              {item.spread || "-"}
            </td>

            {/* Commission */}
            <td className="p-4 font-medium text-slate-800">
              {item.commission || "-"}
            </td>

            {/* Minimum Deposit */}
            <td className="p-4 font-medium text-slate-800">
              {item.min_deposit || "-"}
            </td>

            {/* Best For */}
            <td className="p-4">
              <span className="font-medium text-slate-800">
                {item.best_for || "-"}
              </span>
            </td>

            {/* Account Actions */}
<td className="p-4">
  <div className="flex items-center justify-center gap-2">
    {active ? (
      <span className="inline-flex min-h-[34px] items-center justify-center whitespace-nowrap rounded-xl bg-brand-50 px-3 py-2 text-xs font-black text-brand-600">
        الحساب الحالي
      </span>
    ) : (
      <Link
        href={accountUrl}
        className="inline-flex min-h-[34px] items-center justify-center gap-1 whitespace-nowrap rounded-xl border border-brand-200 bg-white px-3 py-2 text-xs font-black text-brand-600 transition hover:border-brand-400 hover:bg-brand-50"
      >
        عرض الحساب
        <span aria-hidden="true">←</span>
      </Link>
    )}

    {broker.real_account_url && (
      <a
        href={broker.real_account_url}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="inline-flex min-h-[34px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-500 px-3 py-2 text-xs font-black text-white shadow-sm transition hover:bg-brand-600"
      >
        فتح حساب
        <span
          aria-hidden="true"
          className="text-[13px] leading-none"
        >
          ↗
        </span>
      </a>
    )}
  </div>
</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
        </div>
      </section>

      {betterSpreadAccounts.length > 0 && (
        <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-center shadow-sm md:p-6 md:text-right">
            <h2 className="text-[24px] font-black leading-9 text-amber-950 md:text-2xl">
              هل توجد حسابات أقل سبريدًا من {current.account_name}؟
            </h2>

            <p className="mt-3 text-sm leading-8 text-amber-900">
              نعم، داخل حسابات {broker.name} توجد حسابات قد تقدم سبريدًا أقل من{" "}
              {current.account_name}، مثل{" "}
              <strong>
                {betterSpreadAccounts.map((a) => a.account_name).join("، ")}
              </strong>
              . لكن اختيار الحساب لا يعتمد على السبريد فقط، بل يجب النظر أيضًا
              إلى العمولة، أقل إيداع، نوع التنفيذ، ومدى ملاءمة الحساب لطريقة
              تداولك.
            </p>
          </div>
        </section>
      )}

      {hasImportantNotes ? (
  <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
  <div className="overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm">

    {/* Header */}
    <div className="border-b border-amber-100 bg-amber-50/70 px-5 py-4 md:px-6 md:py-5">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-black text-white">
          !
        </span>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-amber-700">
            ملاحظات مهمة
          </p>

          <h2 className="mt-1 text-[20px] font-black leading-8 text-amber-950 md:text-2xl">
            {accountContent?.important_notes_title_ar?.trim()
              ? accountContent.important_notes_title_ar
              : `ملاحظات مهمة حول حساب ${current.account_name}`}
          </h2>
        </div>
      </div>
    </div>

    {/* Mobile */}
    <div className="grid gap-3 p-4 md:hidden">
      {advancedImportantNotes.map(
        (
          note: string | { title?: string; content?: string },
          index: number
        ) => {
          const noteTitle =
            typeof note === "string" ? null : note.title;

          const noteContent =
            typeof note === "string" ? note : note.content;

          if (!noteContent && !noteTitle) {
            return null;
          }

          return (
            <div
              key={`mobile-note-${index}`}
              className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 text-right"
            >
              {noteTitle && (
                <h3 className="text-[14px] font-black leading-6 text-amber-950">
                  {noteTitle}
                </h3>
              )}

              {noteContent && (
                <p
                  className={`text-[13px] leading-7 text-slate-700 ${
                    noteTitle ? "mt-2" : ""
                  }`}
                >
                  {noteContent}
                </p>
              )}
            </div>
          );
        }
      )}
    </div>

    {/* Desktop */}
    <div className="hidden gap-4 p-6 md:grid md:grid-cols-2 lg:grid-cols-3">
      {advancedImportantNotes.map(
        (
          note: string | { title?: string; content?: string },
          index: number
        ) => {
          const noteTitle =
            typeof note === "string" ? null : note.title;

          const noteContent =
            typeof note === "string" ? note : note.content;

          if (!noteContent && !noteTitle) {
            return null;
          }

          return (
            <div
              key={`desktop-note-${index}`}
              className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 text-right"
            >
              {noteTitle && (
                <h3 className="text-base font-black leading-7 text-amber-950">
                  {noteTitle}
                </h3>
              )}

              {noteContent && (
                <p
                  className={`text-sm leading-8 text-slate-700 ${
                    noteTitle ? "mt-2" : ""
                  }`}
                >
                  {noteContent}
                </p>
              )}
            </div>
          );
        }
      )}
    </div>

  </div>
</section>
) : (
  <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-[22px] font-black leading-8 md:text-2xl">
          هل حساب {current.account_name} إسلامي؟
        </h2>

        <p className="mt-4 text-sm leading-8 text-slate-600">
          {current.is_islamic_available
            ? `يوفر ${broker.name} إمكانية الحساب الإسلامي لهذا النوع من الحسابات. ${
                current.islamic_conditions ||
                "وقد تختلف الشروط حسب الأداة المالية، مدة الاحتفاظ بالصفقة، وسياسات الشركة."
              }`
            : `لا توجد معلومات كافية تؤكد توفر الحساب الإسلامي على حساب ${current.account_name} لدى ${broker.name}. لذلك يُفضل مراجعة شروط الشركة قبل فتح الحساب.`}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-[22px] font-black leading-8 md:text-2xl">
          التراخيص والأمان
        </h2>

        {isCapitalSwapFree ? (
          <p className="mt-4 text-sm leading-8 text-slate-600">
            يتوفر حساب Swap-Free لدى Capital.com فقط من خلال الكيانات الخاضعة
            لرقابة <strong>SCB</strong> و<strong>CMA</strong>. كما يعتمد توفر
            الحساب على بلد إقامة العميل، لذلك ينبغي التأكد من الكيان القانوني
            الذي ينطبق على الحساب قبل التسجيل.
          </p>
        ) : (
          <p className="mt-4 text-sm leading-8 text-slate-600">
            اختيار حساب التداول لا ينفصل عن تقييم شركة الوساطة نفسها. قبل فتح
            حساب {current.account_name}، راجع تراخيص {broker.name}، حماية أموال
            العملاء، جودة المنصات، وسرعة السحب والإيداع. التراخيص المختصرة
            لهذا الوسيط:{" "}
            <strong>{broker.regulation_short || "غير محدد"}</strong>.
          </p>
        )}
      </div>

    </div>
  </section>
)}

      <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">

    <h2 className="text-center text-[20px] font-black leading-8 md:text-right md:text-2xl">
      أسئلة شائعة عن حساب {current.account_name} في {broker.name}
    </h2>

    {(() => {
      const faqItems =
        hasAdvancedContent && advancedFaq.length > 0
          ? advancedFaq.map(
              (item: { question?: string; answer?: string }) => [
                item.question || "",
                item.answer || "",
              ]
            )
          : [
              [
                `ما أقل إيداع في حساب ${current.account_name}؟`,
                `أقل إيداع في حساب ${current.account_name} لدى ${broker.name} يبدأ من ${current.min_deposit}.`,
              ],
              [
                `ما سبريد حساب ${current.account_name}؟`,
                isCapitalSwapFree
                  ? "قد تكون فروقات الأسعار في حساب Swap-Free لدى Capital.com أوسع من حساب CFD القياسي، كما تختلف بحسب الأداة المالية وظروف السوق والكيان التنظيمي المطبق."
                  : `سبريد حساب ${current.account_name} لدى ${broker.name} يتراوح بين ${current.spread}.`,
              ],
              [
                `هل حساب ${current.account_name} بدون عمولة؟`,
                isCapital
                  ? "تعتمد Capital.com على التسعير القائم على السبريد ولا تفرض عمولة تداول منفصلة على هذا الحساب، مع إمكانية تطبيق تكاليف أو رسوم أخرى بحسب النشاط والمنتج المستخدم."
                  : `العمولة في حساب ${current.account_name} هي ${current.commission}.`,
              ],
              [
                `هل حساب ${current.account_name} مناسب للمبتدئين؟`,
                `يعتمد ذلك على أسلوب التداول، لكن هذا الحساب مناسب بشكل خاص لـ ${current.best_for}.`,
              ],
            ];

      return (
        <>
          {/* Mobile - Accordion */}
          <div className="mt-4 space-y-2.5 md:hidden">
            {faqItems.map(([q, a], index: number) => (
              <details
                key={`${q}-${index}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-right text-[13px] font-black leading-6 text-slate-950">
                    {q}
                  </h3>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-base font-black text-brand-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-100 px-4 py-3.5">
                  <p className="text-[13px] leading-7 text-slate-600">
                    {a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Desktop - unchanged */}
          <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2">
            {faqItems.map(([q, a], index: number) => (
              <div
                key={`${q}-${index}`}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <h3 className="font-black">
                  {q}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </>
      );
    })()}
  </div>
</section>

      <section className="mx-auto max-w-[1520px] px-4 pb-0">
        <div className="rounded-3xl bg-[#07111f] p-6 text-white shadow-sm md:flex md:items-center md:justify-between md:p-7">
          <div>
            <h2 className="text-[23px] font-black leading-9 md:text-2xl">
              هل تريد فتح حساب {current.account_name}؟
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
              قارن حساب {current.account_name} مع باقي حسابات {broker.name}، ثم
              اختر الحساب الأقرب لطريقة تداولك، حجم رأس المال، وعدد الصفقات التي
              تنفذها.
            </p>
          </div>

          {broker.real_account_url && (
            <a
              href={broker.real_account_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-black text-white hover:bg-brand-600 md:mt-0 md:w-auto"
            >
              فتح حساب حقيقي
            </a>
          )}
        </div>
      </section>
      
{broker.publication_status === "published" && (
  <RelatedAccountComparisons
    currentBrokerName={broker.name}
    currentAccountName={current.account_name}
    comparisons={relatedComparisons}
  />
)}

    </main>
  );
}