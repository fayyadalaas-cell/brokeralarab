import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MobileExpandableText from "./MobileExpandableText";
import RelatedAccountComparisonsEN from "./RelatedAccountComparisonsEN";

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

function cleanMoney(value?: string | null) {
  if (!value) return "-";
  return value;
}

function accountBestFor(account: any) {
  return account.best_for_en || account.best_for || "General traders";
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
      title: "Broker Account Review",
      description: "Forex broker account review.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { broker, hasValidPreview } = access;

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
      title: "Broker Account Review",
      description: "Forex broker account review.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const brokerName = broker.name_en || broker.name;

  const title =
    `${brokerName} ${current.account_name} Account Review: Spreads, Fees & Minimum Deposit`;

  const description =
    `${brokerName} ${current.account_name} account review covering spreads, fees, minimum deposit and trading costs.`;

  const isPreview =
    broker.publication_status !== "published";

  const pageUrl = `https://brokeralarab.com/en/brokers/${broker.slug}/accounts/${slugify(
    current.account_name
  )}`;

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
      canonical: pageUrl,
    },

    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "article",
      locale: "en_US",
      siteName: "Broker Alarab",
      images: [
        {
          url: "/og-image.webp",
          alt: `${brokerName} ${current.account_name} Account Review | Broker Alarab`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.webp"],
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

  const { broker, hasValidPreview } = access;

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

  const brokerName = broker.name_en || broker.name;
  const currentCommission = current.commission_en || current.commission;
  const currentDeposit = current.min_deposit_en || current.min_deposit;
  const currentBestFor = accountBestFor(current);

  /* =========================================================
   Advanced account editorial / SEO content - English
   Optional: if no English content exists, the page keeps
   using the existing generated English template.
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
  accountContent?.overview_en?.trim() ||
  accountContent?.expert_verdict_en?.trim() ||
  (Array.isArray(accountContent?.pros_en) &&
    accountContent.pros_en.length > 0) ||
  (Array.isArray(accountContent?.cons_en) &&
    accountContent.cons_en.length > 0) ||
  (Array.isArray(accountContent?.who_is_it_for_en) &&
    accountContent.who_is_it_for_en.length > 0) ||
  (Array.isArray(accountContent?.unique_content_en) &&
    accountContent.unique_content_en.length > 0) ||
  (Array.isArray(accountContent?.faq_en) &&
    accountContent.faq_en.length > 0)
);

const advancedPros =
  hasAdvancedContent && Array.isArray(accountContent?.pros_en)
    ? accountContent.pros_en
    : [];

const advancedCons =
  hasAdvancedContent && Array.isArray(accountContent?.cons_en)
    ? accountContent.cons_en
    : [];

const advancedAudience =
  hasAdvancedContent && Array.isArray(accountContent?.who_is_it_for_en)
    ? accountContent.who_is_it_for_en
    : [];

const advancedSections =
  hasAdvancedContent && Array.isArray(accountContent?.unique_content_en)
    ? accountContent.unique_content_en
    : [];

const advancedFaq =
  hasAdvancedContent && Array.isArray(accountContent?.faq_en)
    ? accountContent.faq_en
    : [];

const advancedImportantNotes =
  Array.isArray(accountContent?.important_notes_en)
    ? accountContent.important_notes_en
    : [];

const hasImportantNotes =
  advancedImportantNotes.length > 0;

  const isCapitalSwapFree =
  broker.slug === "capital-com" &&
  current.account_name?.startsWith("Swap-Free");

  const cheapestSpread = [...accounts].sort(
    (a, b) => Number(a.spread_avg ?? 99) - Number(b.spread_avg ?? 99)
  )[0];

  const lowestDeposit = [...accounts].sort(
    (a, b) =>
      moneyRank(a.min_deposit_en || a.min_deposit) -
      moneyRank(b.min_deposit_en || b.min_deposit)
  )[0];

  const zeroCommission =
    String(current.commission_value ?? current.commission) === "0" ||
    current.commission === "$0";

  const betterSpreadAccounts = accounts.filter(
    (a) => Number(a.spread_avg ?? 99) < Number(current.spread_avg ?? 99)
  );

  
  // Related comparisons with accounts from other brokers
  const { data: otherAccounts, error: relatedAccountsError } =
    await supabase
      .from("broker_accounts")
      .select(`
        id,
        account_name,
        broker_id,
        brokers!inner(
          slug,
          name,
          name_en,
          publication_status
        )
      `)
      .neq("broker_id", broker.id)
      .eq("brokers.publication_status", "published");

  if (relatedAccountsError) {
    console.error(
      "English related account comparisons:",
      relatedAccountsError
    );
  }

  const currentAccountKey = slugify(current.account_name);

  const relatedComparisons = (otherAccounts ?? []).flatMap(
    (row: any) => {
      const otherBroker = Array.isArray(row.brokers)
        ? row.brokers[0]
        : row.brokers;

      if (!otherBroker?.slug || !row.account_name) return [];

      const otherAccountKey = slugify(row.account_name);

      if (!otherAccountKey) return [];

      const firstKey = `${broker.slug}-${currentAccountKey}`;
      const secondKey = `${otherBroker.slug}-${otherAccountKey}`;

      if (
        firstKey.includes("-vs-") ||
        secondKey.includes("-vs-") ||
        firstKey === secondKey
      ) {
        return [];
      }

      const comparisonSlug = [firstKey, secondKey]
        .sort()
        .join("-vs-");

      return [
        {
          key: `${otherBroker.slug}-${row.id}`,
          brokerName:
            otherBroker.name_en ||
            otherBroker.name ||
            otherBroker.slug,
          accountName: row.account_name,
          href: `/en/compare-accounts/${comparisonSlug}`,
          matchPriority:
            otherAccountKey === currentAccountKey ? 0 : 1,
        },
      ];
    }
  );


  return (
    <main dir="ltr" className="min-h-screen bg-[#f3f7fb] text-[#0f172a]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 py-3 text-xs text-slate-500 md:py-4">
          <Link href="/en" className="hover:text-brand-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
  href={withPreview(
    `/en/brokers/${broker.slug}`,
    previewToken
  )}
  className="hover:text-brand-600"
>
            {brokerName} Review
          </Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-slate-900">
            {current.account_name} Account
          </span>
        </div>
      </section>

      {/* Mobile Hero */}
<section className="px-3 py-4 md:hidden">
  <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-center shadow-sm">
    <div className="mb-3 flex flex-wrap justify-center gap-1.5">
      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-600">
        {brokerName} Account Guide
      </span>

      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
        {zeroCommission
          ? "No commission"
          : `Commission ${currentCommission}`}
      </span>

      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-700">
        {current.execution_type}
      </span>
    </div>

    <h1 className="text-[25px] font-black leading-[1.4] text-slate-950">
      {brokerName} {current.account_name} Account: Is It Right for You?
    </h1>

    <div className="mx-auto mt-3 max-w-[560px] text-[13px] leading-7 text-slate-600">
      <MobileExpandableText lines={3}>
        {accountContent?.hero_intro_en?.trim()
          ? accountContent.hero_intro_en
          : `A practical look at the ${current.account_name} account, including its spread, commission, minimum deposit and how it compares with other ${brokerName} account types.`}
      </MobileExpandableText>
    </div>

    {isCapitalSwapFree ? (
      <p className="mx-auto mt-2 max-w-[560px] text-[11px] font-semibold leading-5 text-slate-500">
        Swap-Free account availability depends on the client&apos;s
        country of residence.
      </p>
    ) : null}

    <div className="mt-4 grid grid-cols-2 gap-2">
      {[
        ["Spread", current.spread],
        ["Commission", currentCommission],
        ["Min deposit", currentDeposit],
        [
          "Islamic",
          current.is_islamic_available ? "Available" : "Not specified",
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
            {value || "-"}
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
          Open Real Account
        </a>
      )}

      <Link
        href={withPreview(
          `/en/brokers/${broker.slug}`,
          previewToken
        )}
        className="flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-black text-slate-900 hover:bg-slate-50"
      >
        Back to {brokerName} Review
      </Link>
    </div>
  </div>

  <div className="mt-3 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center gap-3">
      {broker.logo && (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white">
          <Image
            src={broker.logo}
            alt={brokerName}
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
      )}

      <div className="text-left">
        <p className="text-[10px] text-slate-500">
          Trading account
        </p>

        <h2 className="text-base font-black">
          {current.account_name}
        </h2>
      </div>
    </div>

    <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50 px-3 py-2.5 text-left">
      <p className="text-[10px] font-bold text-blue-800">
        Best for
      </p>

      <p className="mt-0.5 text-[13px] font-black leading-6 text-blue-950">
        {currentBestFor}
      </p>
    </div>
  </div>
</section>

      {/* Desktop Hero - unchanged */}
      <section className="relative hidden overflow-hidden bg-white md:block">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blue-50 to-transparent" />

        <div className="relative mx-auto flex max-w-[1520px] flex-col gap-6 px-4 py-8 lg:flex-row lg:items-start">
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                {brokerName} Account Guide
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {zeroCommission ? "No commission" : `Commission ${currentCommission}`}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {current.execution_type}
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-4xl">
  {brokerName} {current.account_name} Account: Spreads, Fees and Who It Is Best For
</h1>

            <p className="mt-5 max-w-4xl text-sm leading-8 text-slate-600 md:text-base">
  {accountContent?.hero_intro_en?.trim()
    ? accountContent.hero_intro_en
    : `This page breaks down the ${current.account_name} account at ${brokerName} from a practical trading-cost perspective. We compare its spread, commission, minimum deposit, execution model, and positioning against other ${brokerName} account types so you can decide whether it matches your trading style.`}
</p>

{isCapitalSwapFree ? (
  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
    Swap-Free account availability depends on the client&apos;s country of residence.
  </p>
) : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Spread", current.spread],
                ["Commission", currentCommission],
                ["Minimum deposit", currentDeposit],
                ["Execution", current.execution_type],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs text-slate-500">{label}</p>
                  <strong className="mt-2 block text-lg font-black">
                    {value || "-"}
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
                  Open Real Account
                </a>
              )}

              <Link
               href={withPreview(
  `/en/brokers/${broker.slug}`,
  previewToken
)}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 hover:bg-slate-50"
              >
                Back to {brokerName} Review
              </Link>
            </div>
          </div>

          <aside className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-[320px]">
            <div className="flex items-center gap-4">
              {broker.logo && (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                  <Image
                    src={broker.logo}
                    alt={brokerName}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}

              <div>
                <p className="text-xs text-slate-500">Trading Account</p>
                <h2 className="text-2xl font-black">{current.account_name}</h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                ["Broker", brokerName],
                ["Spread", current.spread],
                ["Commission", currentCommission],
                ["Minimum deposit", currentDeposit],
                ["Execution", current.execution_type],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-xs text-slate-500">{label}</span>
                  <strong className="text-sm text-slate-950">{value || "-"}</strong>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-4">
              <p className="text-xs font-bold text-blue-800">Best for</p>
              <p className="mt-2 text-sm font-black leading-7 text-blue-950">
                {currentBestFor}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* =========================================================
    ACCOUNT QUICK STATS
========================================================= */}
<section className="mx-auto max-w-[1520px] px-3 py-3 md:px-4 md:py-8">

  {/* Mobile - compact account stats */}
  <div className="md:hidden">
    <div className="grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Lowest spread */}
      <Link
        href={withPreview(
          `/en/brokers/${broker.slug}/accounts/${slugify(
            cheapestSpread.account_name
          )}`,
          previewToken
        )}
        className="min-w-0 px-2 py-3 text-center"
      >
        <p className="text-[9px] font-bold leading-4 text-slate-500">
          Lowest spread
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
          `/en/brokers/${broker.slug}/accounts/${slugify(
            lowestDeposit.account_name
          )}`,
          previewToken
        )}
        className="min-w-0 px-2 py-3 text-center"
      >
        <p className="text-[9px] font-bold leading-4 text-slate-500">
          Lowest deposit
        </p>

        <p className="mt-1 truncate text-[12px] font-black text-slate-950">
          {lowestDeposit.account_name}
        </p>

        <p className="mt-1 text-[10px] font-bold text-brand-600">
          {cleanMoney(
            lowestDeposit.min_deposit_en ||
              lowestDeposit.min_deposit
          )}
        </p>
      </Link>

      {/* Account count */}
      <div className="min-w-0 px-2 py-3 text-center">
        <p className="text-[9px] font-bold leading-4 text-slate-500">
          Accounts
        </p>

        <p className="mt-1 text-[12px] font-black text-slate-950">
          {accounts.length} accounts
        </p>

        <p className="mt-1 text-[10px] font-bold text-slate-500">
          to compare
        </p>
      </div>

    </div>
  </div>

  {/* Desktop */}
  <div className="hidden gap-3 md:grid md:grid-cols-3 md:gap-5">

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-sm text-slate-500">
        Lowest spread at {brokerName}
      </p>

      <h3 className="mt-2 text-xl font-black">
        {cheapestSpread.account_name}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        Spread from {cheapestSpread.spread}
      </p>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-sm text-slate-500">
        Lowest minimum deposit
      </p>

      <h3 className="mt-2 text-xl font-black">
        {lowestDeposit.account_name}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        Starts from{" "}
        {cleanMoney(
          lowestDeposit.min_deposit_en ||
            lowestDeposit.min_deposit
        )}
      </p>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-sm text-slate-500">
        Available account types
      </p>

      <h3 className="mt-2 text-xl font-black">
        {accounts.length} accounts
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        Compared side by side
      </p>
    </div>

  </div>
</section>


{/* =========================================================
    ACCOUNT OVERVIEW + EXPERT VERDICT
========================================================= */}
<section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
  <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:gap-5">

    {/* Account Overview */}
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-[22px] font-black leading-8 md:text-2xl">
        What is the {current.account_name} account at {brokerName}?
      </h2>

      {hasAdvancedContent && accountContent?.overview_en ? (
        <>
          {/* Mobile */}
          <div className="mt-3 md:hidden">
            <MobileExpandableText
              lines={3}
              className="text-[13px] leading-7 text-slate-600"
            >
              {accountContent.overview_en}
            </MobileExpandableText>
          </div>

          {/* Desktop */}
          <div className="mt-4 hidden space-y-4 md:block">
            {accountContent.overview_en
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
            Capital.com&apos;s Swap-Free account is designed for
            eligible clients who require swap-free trading. Spreads
            on this account may be wider than on the standard CFD
            account, while trading conditions may vary by instrument,
            market conditions, and the applicable regulatory entity.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-600">
            The Swap-Free account is available only through eligible
            Capital.com entities and its availability also depends on
            the client&apos;s country of residence. Traders should
            confirm account availability and the applicable legal
            entity before registration.
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            The {current.account_name} account is one of the trading
            account types offered by {brokerName}. It has a spread of{" "}
            <strong>{current.spread}</strong>, a commission of{" "}
            <strong>{currentCommission}</strong>, and a minimum
            deposit starting from{" "}
            <strong>{currentDeposit}</strong>.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-600">
            This account is mainly positioned for{" "}
            <strong>{currentBestFor}</strong>. It is still important
            to compare its spread, commission, execution model, and
            overall trading cost with the other {brokerName} account
            types.
          </p>
        </>
      )}
    </div>


    {/* Expert Verdict */}
    <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 shadow-sm md:p-6">
      <div className="mb-3 flex items-center gap-2">
        {hasAdvancedContent && (
          <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-black text-white">
            Broker Alarab Analysis
          </span>
        )}
      </div>

      <h3 className="text-[22px] font-black text-blue-950 md:text-xl">
        {hasAdvancedContent ? "Our verdict" : "Quick verdict"}
      </h3>

      {hasAdvancedContent &&
      accountContent?.expert_verdict_en ? (
        <>
          {/* Mobile */}
          <div className="mt-3 md:hidden">
            <MobileExpandableText
              lines={3}
              className="text-[13px] leading-7 text-blue-900"
            >
              {accountContent.expert_verdict_en}
            </MobileExpandableText>
          </div>

          {/* Desktop */}
          <div className="mt-3 hidden space-y-3 md:block">
            {accountContent.expert_verdict_en
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
          The {current.account_name} account is best suited for{" "}
          {currentBestFor}.{" "}
          {betterSpreadAccounts.length > 0
            ? `If your main priority is a lower spread, also compare it with ${betterSpreadAccounts
                .map((a) => a.account_name)
                .join(", ")}.`
            : "It is one of the stronger spread options within this broker’s account lineup."}
        </p>
      )}
    </div>

  </div>
</section>


{/* =========================================================
    WHO IS IT FOR + WHEN IT MAY NOT BE SUITABLE + PROS
========================================================= */}
<section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">

  <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">

    {/* Who is it for */}
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-[22px] font-black leading-8 md:text-2xl">
        Who is the {current.account_name} account best for?
      </h2>

      <div className="mt-4 grid gap-3">
        {(hasAdvancedContent && advancedAudience.length > 0
          ? advancedAudience
          : [
              `Traders looking for an account designed for ${currentBestFor}.`,
              "Users who want to understand trading costs before opening an account.",
              `Traders comparing spreads and commissions across ${brokerName} account types.`,
              `Users who prefer trading on ${
                broker.platforms ||
                "the available trading platforms"
              }.`,
            ]
        ).map((item: string, index: number) => (
          <div
            key={`${item}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-left"
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
        When might the {current.account_name} account not be suitable?
      </h2>

      <div className="mt-4 grid gap-3">
        {(hasAdvancedContent && advancedCons.length > 0
          ? advancedCons
          : [
              "If you need the lowest possible spread and another account offers lower overall costs.",
              "If the minimum deposit is above your current trading budget.",
              "If your trading strategy requires a different execution model.",
              "If the account conditions do not match your trading style.",
            ]
        ).map((item: string, index: number) => (
          <div
            key={`${item}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-3 text-left"
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
          Key advantages of the {current.account_name} account
        </h3>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {advancedPros.map((item: string, index: number) => (
          <div
            key={`${item}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-left"
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

{/* =========================================================
    ADVANCED ACCOUNT ANALYSIS
========================================================= */}
{hasAdvancedContent && advancedSections.length > 0 && (
  <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

      <div className="border-b border-slate-100 pb-4 md:pb-5">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
          Account analysis
        </span>

        <div className="mt-2 flex flex-col gap-1.5 md:mt-3 md:flex-row md:items-end md:justify-between md:gap-2">
          <h2 className="text-[20px] font-black leading-8 text-slate-950 md:text-2xl">
            Important details before choosing the {current.account_name} account
          </h2>

          <p className="max-w-lg text-sm leading-7 text-slate-500">
            Key points to help you understand the important differences
            before choosing this account.
          </p>
        </div>
      </div>

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
                          `/en/brokers/${broker.slug}/accounts/${slugify(
                            item.account_name
                          )}`,
                          previewToken
                        )}
                        className="inline-flex items-center gap-1 rounded-lg border border-brand-100 bg-white px-2.5 py-1.5 text-[10px] font-black text-brand-600"
                      >
                        View {item.account_name} account
                        <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          }
        )}
      </div>

      {/* Desktop */}
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
                          `/en/brokers/${broker.slug}/accounts/${slugify(
                            item.account_name
                          )}`,
                          previewToken
                        )}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-brand-100 bg-white px-3 py-2 text-xs font-black text-brand-600 transition hover:border-brand-300 hover:bg-brand-50"
                      >
                        <span>
                          View {item.account_name} account
                        </span>
                        <span aria-hidden="true">→</span>
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

{/* =========================================================
    ACCOUNT COMPARISON
========================================================= */}

<section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

    <div className="border-b border-slate-200 p-5 text-center md:p-6 md:text-left">
      <h2 className="text-[22px] font-black leading-8 md:text-2xl">
        Compare the {current.account_name} account with other {brokerName} accounts
      </h2>

      <p className="mt-2 text-sm leading-7 text-slate-500">
        Compare the available account types side by side to find the option
        that better matches your trading style and costs.
      </p>
    </div>

    {/* Mobile account cards */}
    <div className="space-y-2.5 p-3 md:hidden">
      {accounts.map((item) => {
        const active = item.id === current.id;

        const itemCommission =
          item.commission_en || item.commission || "-";

        const itemDeposit =
          item.min_deposit_en || item.min_deposit || "-";

        const itemBestFor =
          item.best_for_en || item.best_for || "-";

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
                    Current account
                  </span>
                )}
              </div>

              {!active && (
                <Link
                  href={withPreview(
                    `/en/brokers/${broker.slug}/accounts/${slugify(
                      item.account_name
                    )}`,
                    previewToken
                  )}
                  className="shrink-0 text-[10px] font-black text-brand-600"
                >
                  Details →
                </Link>
              )}
            </div>

            {/* Main numbers */}
            <div className="mt-3 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-100 bg-slate-50/80">
              <div className="px-2 py-2.5 text-center">
                <p className="text-[9px] font-bold text-slate-500">
                  Spread
                </p>

                <strong className="mt-0.5 block text-[12px] font-black text-slate-950">
                  {item.spread || "-"}
                </strong>
              </div>

              <div className="px-2 py-2.5 text-center">
                <p className="text-[9px] font-bold text-slate-500">
                  Commission
                </p>

                <strong className="mt-0.5 block text-[12px] font-black text-slate-950">
                  {itemCommission}
                </strong>
              </div>

              <div className="px-2 py-2.5 text-center">
                <p className="text-[9px] font-bold text-slate-500">
                  Min deposit
                </p>

                <strong className="mt-0.5 block text-[12px] font-black text-slate-950">
                  {itemDeposit}
                </strong>
              </div>
            </div>

            {/* Best for */}
            <div className="flex items-center gap-2 px-3.5 py-2.5">
              <span className="shrink-0 text-[9px] font-bold text-slate-500">
                Best for
              </span>

              <p className="min-w-0 truncate text-[11px] font-black text-slate-800">
                {itemBestFor}
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 px-3 py-2.5">
              {active ? (
                <div className="flex min-h-[34px] items-center justify-center rounded-lg bg-brand-50 px-2 text-[10px] font-black text-brand-700">
                  You are viewing this account
                </div>
              ) : (
                <Link
                  href={withPreview(
                    `/en/brokers/${broker.slug}/accounts/${slugify(
                      item.account_name
                    )}`,
                    previewToken
                  )}
                  className="flex min-h-[34px] items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-[10px] font-black text-slate-800"
                >
                  View account
                </Link>
              )}

              {broker.real_account_url ? (
                <a
                  href={broker.real_account_url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="flex min-h-[34px] items-center justify-center rounded-lg bg-brand-500 px-2 text-[10px] font-black text-white"
                >
                  Open account
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
            <th className="p-4 text-left">Account</th>
            <th className="p-4 text-left">Spread</th>
            <th className="p-4 text-left">Commission</th>
            <th className="p-4 text-left">Min deposit</th>
            <th className="p-4 text-left">Best for</th>
            <th className="p-4 text-center">Details</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {accounts.map((item) => {
            const active = item.id === current.id;

            const accountUrl = withPreview(
              `/en/brokers/${broker.slug}/accounts/${slugify(
                item.account_name
              )}`,
              previewToken
            );

            const itemCommission =
              item.commission_en || item.commission || "-";

            const itemDeposit =
              item.min_deposit_en || item.min_deposit || "-";

            const itemBestFor =
              item.best_for_en || item.best_for || "-";

            return (
              <tr
                key={item.id}
                className={
                  active
                    ? "bg-brand-50"
                    : "bg-white transition hover:bg-slate-50"
                }
              >
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

                <td className="p-4 font-bold text-slate-900">
                  {item.spread || "-"}
                </td>

                <td className="p-4 font-medium text-slate-800">
                  {itemCommission}
                </td>

                <td className="p-4 font-medium text-slate-800">
                  {itemDeposit}
                </td>

                <td className="p-4">
                  <span className="font-medium text-slate-800">
                    {itemBestFor}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    {active ? (
                      <span className="inline-flex min-h-[34px] items-center justify-center whitespace-nowrap rounded-xl bg-brand-50 px-3 py-2 text-xs font-black text-brand-600">
                        Current account
                      </span>
                    ) : (
                      <Link
                        href={accountUrl}
                        className="inline-flex min-h-[34px] items-center justify-center gap-1 whitespace-nowrap rounded-xl border border-brand-200 bg-white px-3 py-2 text-xs font-black text-brand-600 transition hover:border-brand-400 hover:bg-brand-50"
                      >
                        View account
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}

                    {broker.real_account_url && (
                      <a
                        href={broker.real_account_url}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        className="inline-flex min-h-[34px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-500 px-3 py-2 text-xs font-black text-white shadow-sm transition hover:bg-brand-600"
                      >
                        Open account
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

      {/* =========================================================
    IMPORTANT NOTES
========================================================= */}
{hasImportantNotes ? (
  <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
    <div className="overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm">

      <div className="border-b border-amber-100 bg-amber-50/70 px-5 py-4 md:px-6 md:py-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-black text-white">
            !
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-amber-700">
              Important notes
            </p>

            <h2 className="mt-1 text-[20px] font-black leading-8 text-amber-950 md:text-2xl">
              {accountContent?.important_notes_title_en?.trim()
                ? accountContent.important_notes_title_en
                : `Important notes about the ${current.account_name} account`}
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
                className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4"
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
                className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5"
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
  /* Existing fallback for accounts without advanced notes */
  <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-[22px] font-black leading-8 md:text-2xl">
          Trading cost and account structure
        </h2>

        <p className="mt-4 text-sm leading-8 text-slate-600">
          {isCapitalSwapFree
            ? "Capital.com’s Swap-Free account is designed for eligible clients who require swap-free trading. Spreads on this account may be wider than on the standard CFD account, and availability depends on the client’s country of residence. Trading conditions may vary depending on the applicable regulatory entity and market conditions."
            : `The most important factor when comparing the ${current.account_name} account is total trading cost. A zero-commission account can still be more expensive if the spread is wider, while a raw-spread account may look cheaper but include a fixed commission per lot. For active traders, spread and commission should be reviewed together.`}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-[22px] font-black leading-8 md:text-2xl">
          Regulation and broker safety
        </h2>

        <p className="mt-4 text-sm leading-8 text-slate-600">
          {isCapitalSwapFree ? (
            <>
              Capital.com&apos;s Swap-Free account is available under
              its SCB and CMA entities only. Availability also depends
              on the client&apos;s country of residence. Traders should
              confirm which legal entity applies to their account
              before registration.
            </>
          ) : (
            <>
              Account selection should not be separated from broker
              quality. Before opening the {current.account_name}{" "}
              account, review {brokerName}&apos;s regulation, platform
              stability, fund protection, support quality, and
              withdrawal process. Main regulatory references:{" "}
              <strong>
                {broker.regulation_short || "Not specified"}
              </strong>.
            </>
          )}
        </p>
      </div>

    </div>
  </section>
)}

      {betterSpreadAccounts.length > 0 && (
        <section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-center shadow-sm md:p-6 md:text-left">
            <h2 className="text-[24px] font-black leading-9 text-amber-950 md:text-2xl">
              Are there lower-spread accounts than {current.account_name}?
            </h2>

            <p className="mt-3 text-sm leading-8 text-amber-900">
              Yes. Based on the account data available for {brokerName}, accounts
              such as{" "}
              <strong>
                {betterSpreadAccounts.map((a) => a.account_name).join(", ")}
              </strong>{" "}
              may offer lower spreads than the {current.account_name} account.
              Still, the best choice depends on the full cost structure, including
              commission, execution type, minimum deposit, and trading frequency.
            </p>
          </div>
        </section>
      )}

      

      {/* =========================================================
    FREQUENTLY ASKED QUESTIONS
========================================================= */}
<section className="mx-auto max-w-[1520px] px-4 pb-6 md:pb-8">
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

    <div className="border-b border-slate-100 pb-4">
      <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
        FAQ
      </span>

      <h2 className="mt-2 text-[22px] font-black leading-8 text-slate-950 md:text-2xl">
        Frequently asked questions about the {current.account_name} account
      </h2>

      {hasAdvancedContent && advancedFaq.length > 0 && (
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
          Key questions about the {brokerName} {current.account_name} account,
          including its trading costs, conditions, and suitability.
        </p>
      )}
    </div>

    {hasAdvancedContent && advancedFaq.length > 0 ? (
      <>
        {/* Mobile - accordion */}
        <div className="mt-4 space-y-2 md:hidden">
          {advancedFaq.map(
            (
              item: {
                question?: string;
                answer?: string;
                q?: string;
                a?: string;
              },
              index: number
            ) => {
              const question = item.question || item.q;
              const answer = item.answer || item.a;

              if (!question || !answer) {
                return null;
              }

              return (
                <details
                  key={`${question}-${index}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
                    <h3 className="text-left text-[13px] font-black leading-6 text-slate-950">
                      {question}
                    </h3>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-brand-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-slate-200 px-4 py-4">
                    <p className="text-[13px] leading-7 text-slate-600">
                      {answer}
                    </p>
                  </div>
                </details>
              );
            }
          )}
        </div>

        {/* Desktop - cards */}
        <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2">
          {advancedFaq.map(
            (
              item: {
                question?: string;
                answer?: string;
                q?: string;
                a?: string;
              },
              index: number
            ) => {
              const question = item.question || item.q;
              const answer = item.answer || item.a;

              if (!question || !answer) {
                return null;
              }

              return (
                <article
                  key={`${question}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-black text-brand-600">
                      ?
                    </span>

                    <div>
                      <h3 className="font-black leading-7 text-slate-950">
                        {question}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </>
    ) : (
      /* Existing FAQ fallback for accounts without advanced content */
      <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-4">
        {[
          [
            `What is the minimum deposit for the ${current.account_name} account?`,
            `The minimum deposit for the ${current.account_name} account at ${brokerName} starts from ${currentDeposit}.`,
          ],
          [
            `What is the spread on the ${current.account_name} account?`,
            isCapitalSwapFree
              ? "Spreads on the Capital.com Swap-Free account may be wider than on the standard CFD account and can vary depending on the instrument, market conditions, and applicable entity."
              : `The ${current.account_name} account at ${brokerName} has a spread of ${current.spread}.`,
          ],
          [
            `Does the ${current.account_name} account charge commission?`,
            `The commission on the ${current.account_name} account is ${currentCommission}.`,
          ],
          [
            `Is the ${current.account_name} account good for active traders?`,
            `It depends on your trading frequency and cost sensitivity, but this account is mainly positioned for ${currentBestFor}.`,
          ],
        ].map(([q, a]) => (
          <div
            key={q}
            className="rounded-2xl border border-slate-200 p-4 md:p-5"
          >
            <h3 className="font-black">{q}</h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              {a}
            </p>
          </div>
        ))}
      </div>
    )}

  </div>
</section>

      <section className="mx-auto max-w-[1520px] px-4 pb-0">
        <div className="rounded-3xl bg-[#07111f] p-6 text-white shadow-sm md:flex md:items-center md:justify-between md:p-7">
          <div>
            <h2 className="text-[23px] font-black leading-9 md:text-2xl">
              Ready to compare the {current.account_name} account?
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
              Compare the {current.account_name} account with other {brokerName}
              account types, then choose based on your trading strategy, capital,
              execution needs, and total trading cost.
            </p>
          </div>

          {broker.real_account_url && (
            <a
              href={broker.real_account_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-black text-white hover:bg-brand-600 md:mt-0 md:w-auto"
            >
              Open Real Account
            </a>
          )}
        </div>
            </section>

      <RelatedAccountComparisonsEN
        currentBrokerName={brokerName}
        currentAccountName={current.account_name}
        comparisons={relatedComparisons}
      />

    </main>
  );
}