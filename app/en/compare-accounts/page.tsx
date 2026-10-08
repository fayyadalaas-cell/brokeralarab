import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AccountComparePicker from "./AccountComparePicker";
import MobileFeaturedBrokers from "./MobileFeaturedBrokers";


const SITE = "https://brokeralarab.com";
const PAGE_URL = `${SITE}/en/compare-accounts`;
const PAGE_TITLE = "Compare Forex Trading Accounts 2026 | Spreads & Fees";
const PAGE_DESCRIPTION =
  "Compare forex trading accounts by spreads, commissions, minimum deposits and account features. Explore Standard, Raw Spread and ECN accounts across brokers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "compare forex trading accounts",
    "forex account comparison",
    "trading account comparison 2026",
    "Standard vs Raw Spread account",
    "ECN vs Standard account",
    "forex spreads and commissions",
    "minimum deposit forex accounts",
    "Islamic trading accounts",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: `${SITE}/compare-accounts`,
      "x-default": `${SITE}/compare-accounts`,
    },
  },
  robots: {
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
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Broker Alarab",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_AR"],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

type Broker = {
  id: number;
  name: string | null;
  slug: string | null;
  logo: string | null;
  rating: number | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  account_name_ar: string | null;
  sort_order: number | null;
  account_type: string | null;
  spread: string | null;
  commission: string | null;
  min_deposit: string | null;
};

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

const faq = [
  {
    q: "How do I compare two forex trading accounts?",
    a: "Select a broker and one of its available account types, then repeat for the second account. Review spreads, commissions, minimum deposits and trading conditions side by side.",
  },
  {
    q: "What is the difference between Standard and Raw Spread accounts?",
    a: "Standard accounts often include more of the trading cost in the spread, while Raw Spread accounts typically quote tighter spreads and charge a separate commission. Exact pricing depends on the broker and instrument.",
  },
  {
    q: "Is the account with the lowest spread always the best?",
    a: "No. Consider the total cost of trading, including commissions, execution conditions, supported platforms and the instruments you trade.",
  },
  {
    q: "Can I compare two accounts from the same broker?",
    a: "Yes. Choose the same broker on both sides and select two different account types to compare their features and costs.",
  },
  {
    q: "Are swap-free or Islamic accounts available at every broker?",
    a: "No. Availability and eligibility depend on the broker, account type, country of residence and regulated entity. Confirm the current terms directly with the broker.",
  },
  {
    q: "What is the difference between comparing brokers and comparing accounts?",
    a: "Broker comparisons focus on companies, regulation, platforms and overall services. Account comparisons focus on specific account conditions, such as spreads, commissions and deposits.",
  },
];

const guides = [
  {
    number: "01",
    title: "Compare spreads and commissions together",
    description: "A lower spread does not always mean a lower total trading cost. Include the commission charged for your position size and instrument.",
  },
  {
    number: "02",
    title: "Check minimum deposit requirements",
    description: "Make sure the account's opening requirements fit your budget. The minimum deposit is not necessarily an appropriate trading balance.",
  },
  {
    number: "03",
    title: "Match the account to your trading style",
    description: "Beginners, scalpers and longer-term traders may value different account features, costs and execution conditions.",
  },
  {
    number: "04",
    title: "Verify swap-free account conditions",
    description: "Some Islamic or swap-free accounts require approval or have additional restrictions. Review the broker's official terms before applying.",
  },
];

export default async function CompareAccountsPage() {
  const supabase = await createClient();

  const { data: brokerData, error: brokerError } = await supabase
    .from("brokers")
    .select("id,name,slug,logo,rating")
    .eq("publication_status", "published")
    .order("rating", { ascending: false });

  const { data: accountData, error: accountError } = await supabase
    .from("broker_accounts")
    .select("id,broker_id,account_name,account_name_ar,sort_order,account_type,spread,commission,min_deposit")
    .order("sort_order", { ascending: true });

  if (brokerError) console.error("English account comparison brokers error:", brokerError.message);
  if (accountError) console.error("English account comparison accounts error:", accountError.message);

  const brokers = ((brokerData ?? []) as Broker[]).filter(
    (broker) => Boolean(broker.name && broker.slug) && broker.slug?.toLowerCase() !== "naga"
  );
  const allowedIds = new Set(brokers.map((broker) => broker.id));
  const accounts = ((accountData ?? []) as BrokerAccount[]).filter(
    (account) => allowedIds.has(account.broker_id) && Boolean(account.account_name?.trim())
  );
  const activeBrokerIds = new Set(accounts.map((account) => account.broker_id));
  const availableBrokers = brokers.filter((broker) => activeBrokerIds.has(broker.id));
  const featured = availableBrokers.slice(0, 9);

  
const comparisonAccounts = availableBrokers.flatMap((broker) =>
  accounts
    .filter((account) => account.broker_id === broker.id)
    .map((account) => ({
      broker,
      account,
      key: `${broker.slug}-${accountSlug(account.account_name)}`,
    }))
    .filter((item) => accountSlug(item.account.account_name))
);

const comparisonKeyCounts = new Map<string, number>();

comparisonAccounts.forEach((item) => {
  comparisonKeyCounts.set(
    item.key,
    (comparisonKeyCounts.get(item.key) ?? 0) + 1
  );
});

const uniqueComparisonAccounts = comparisonAccounts.filter(
  (item) =>
    comparisonKeyCounts.get(item.key) === 1 &&
    !item.key.includes("-vs-")
);

const popularComparisons: {
  first: (typeof uniqueComparisonAccounts)[number];
  second: (typeof uniqueComparisonAccounts)[number];
  slug: string;
}[] = [];

const usedPairs = new Set<string>();

for (let offset = 1; offset < availableBrokers.length; offset++) {
  for (let i = 0; i < availableBrokers.length; i++) {
    const firstBroker = availableBrokers[i];
    const secondBroker =
      availableBrokers[(i + offset) % availableBrokers.length];

    if (firstBroker.id === secondBroker.id) continue;

    const first = uniqueComparisonAccounts.find(
      (item) => item.broker.id === firstBroker.id
    );

    const second = uniqueComparisonAccounts.find(
      (item) => item.broker.id === secondBroker.id
    );

    if (!first || !second) continue;

    const sorted = [first, second].sort((a, b) =>
      a.key < b.key ? -1 : a.key > b.key ? 1 : 0
    );

    const slug = `${sorted[0].key}-vs-${sorted[1].key}`;

    if (usedPairs.has(slug)) continue;

    usedPairs.add(slug);

    popularComparisons.push({
      first: sorted[0],
      second: sorted[1],
      slug,
    });

    if (popularComparisons.length >= 12) break;
  }

  if (popularComparisons.length >= 12) break;
}


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` },
      { "@type": "ListItem", position: 2, name: "Compare Trading Accounts", item: PAGE_URL },
    ],
  };

  return (
    <main dir="ltr" lang="en" className="min-h-screen bg-[#f3f6fb] text-[#0f172a] text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, breadcrumbSchema]).replace(/</g, "\\u003c"),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-brand-100 bg-[#eaf3ff]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f9ff] via-[#e8f2ff] to-[#cfe3ff]" />
          <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-white/70 blur-3xl" />
          <div className="absolute -bottom-36 -right-20 h-96 w-96 rounded-full bg-blue-300/25 blur-3xl" />
        </div>

        {/* MOBILE HERO */}
        <div className="relative mx-auto max-w-[1520px] px-4 pb-6 pt-4 sm:hidden">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
            <Link href="/en" className="hover:text-[#1E5BB8]">Home</Link>
            <span>/</span>
            <span className="text-[#1E5BB8]">Compare Trading Accounts</span>
          </nav>
          <div className="mt-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold text-[#1E5BB8] shadow-sm">
              <span className="text-emerald-600">✓</span> Forex Account Comparison Tool
            </div>
            <h1 className="mx-auto mt-4 max-w-[350px] text-[27px] font-black leading-[1.35] tracking-tight text-slate-950">
              Compare Trading Accounts
              <span className="mt-1 block text-[#1E5BB8]">Find the Right Account for You</span>
            </h1>
            <p className="mx-auto mt-3 max-w-[340px] text-[12px] font-medium leading-[1.9] text-slate-600">
              Compare accounts from the same broker or different brokers, including spreads, commissions and minimum deposits.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-bold text-slate-700">
              {["Spreads & fees", "Account types", "Deposit requirements"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1"><span className="text-emerald-600">✓</span>{item}</span>
              ))}
            </div>
            <a href="#compare-tool" className="mt-5 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#1E5BB8] px-5 py-3 text-[13px] font-black text-white shadow-[0_8px_20px_rgba(30,91,184,0.18)] transition hover:bg-[#174a98]">
              Start Comparing Accounts <span aria-hidden="true">↓</span>
            </a>
            <a href="#account-guide" className="mt-3 inline-flex items-center justify-center text-[11px] font-bold text-[#1E5BB8] underline-offset-4 hover:underline">
              How to Choose a Trading Account →
            </a>
            <p className="mx-auto mt-4 max-w-[340px] text-[9px] leading-5 text-slate-500">
              Account terms vary by country and legal entity. Check the broker's official website before making a decision.
            </p>
          </div>
        </div>

        {/* DESKTOP & TABLET HERO */}
        <div className="relative mx-auto hidden max-w-[1520px] px-4 py-8 sm:block sm:px-6 sm:py-12 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/en" className="hover:text-brand-600">Home</Link><span>/</span><span className="text-brand-700">Compare Trading Accounts</span>
          </nav>
          <div className="mx-auto max-w-[1100px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2 text-[11px] font-extrabold text-brand-700 shadow-sm sm:text-xs">
              <span className="text-emerald-600">✓</span> Forex Account Comparison Tool
            </div>
            <h1 className="mt-5 text-[32px] font-black leading-[1.25] tracking-tight text-slate-950 sm:text-[46px] lg:text-[58px]">
              Compare Forex Trading Accounts
              <span className="mt-1 block text-[#1E5BB8]">Understand the Differences Before You Trade</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[900px] text-[14px] font-medium leading-8 text-slate-600 sm:text-[17px] sm:leading-9">
              Standard or Raw Spread? Which account fits your trading needs? Compare forex account types across brokers by spreads, commissions, minimum deposits and trading conditions with Broker Alarab.
            </p>
            <div className="mx-auto mt-6 grid max-w-[950px] grid-cols-1 gap-2.5 sm:grid-cols-3">
              {["Compare spreads & commissions", "Explore accounts across brokers", "Choose for your trading style"].map((item) => (
                <div key={item} className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-white bg-white/90 px-3 py-2.5 text-[12px] font-extrabold text-slate-700 shadow-sm sm:text-[13px]">
                  <span className="text-emerald-600">✓</span>{item}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#compare-tool" className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#1E5BB8] px-7 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#174a98]">Start Comparing Accounts ↓</a>
              <a href="#account-guide" className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white bg-white px-7 py-3 text-sm font-extrabold text-slate-800 transition hover:text-brand-600">Trading Account Guide</a>
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-[11px] leading-6 text-slate-500">
              Trading conditions vary by regulated entity, country of residence and instrument. Verify the latest terms with the broker.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON PICKER */}
      <section id="compare-tool" className="mx-auto max-w-[1520px] scroll-mt-24 px-3 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:rounded-[30px]">
          <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#ffffff_0%,#f1f7ff_100%)] px-5 py-7 text-center sm:px-8 sm:py-9">
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-[11px] font-extrabold text-[#1E5BB8] shadow-sm">Trading Account Comparison</span>
            <h2 className="mt-4 text-[25px] font-black leading-tight text-slate-950 sm:text-[36px]">Choose Two Accounts and Compare</h2>
            <p className="mx-auto mt-3 max-w-[760px] text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
              Select a broker and its account type on each side. Compare two accounts from the same broker or from different brokers to explore their costs and conditions.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {["Spreads", "Commissions", "Minimum deposit", "Account type", "Islamic accounts", "Trading conditions"].map((item) => (
                <span key={item} className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700">{item}</span>
              ))}
            </div>
          </div>
          <div className="bg-[linear-gradient(135deg,#0f172a_0%,#172554_100%)] px-3 py-7 sm:px-6 sm:py-10 lg:px-10">
            <div className="mx-auto max-w-[1050px]">
              <div className="mb-6 text-center">
                <h3 className="text-[21px] font-black text-white sm:text-[27px]">Compare Trading Accounts Now</h3>
                <p className="mt-2 text-[12px] leading-7 text-blue-100/90 sm:text-sm">Choose a broker and account type on each side, then run your comparison.</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white p-3 shadow-[0_18px_45px_rgba(0,0,0,0.15)] sm:p-5">
                <AccountComparePicker brokers={availableBrokers} accounts={accounts} />
              </div>
              <p className="mt-5 text-center text-[11px] leading-6 text-blue-100/80 sm:text-xs">
                Compare two different account types from one broker or accounts from two brokers. Availability and conditions depend on your jurisdiction.
              </p>
            </div>
          </div>
          <div className="hidden bg-white sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { number: "01", title: "Choose a broker", description: "Browse its available accounts." },
              { number: "02", title: "Select an account", description: "Pick the account type to compare." },
              { number: "03", title: "Review the differences", description: "Compare conditions side by side." },
            ].map((step) => (
              <div key={step.number} className="flex items-center justify-center gap-3 px-5 py-5 sm:py-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-sm font-black text-[#1E5BB8]">{step.number}</span>
                <div><h4 className="text-[13px] font-black text-slate-900">{step.title}</h4><p className="mt-1 text-[11px] leading-5 text-slate-500">{step.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABLE BROKERS */}
      <section className="mx-auto max-w-[1520px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="text-xs font-extrabold text-brand-600">Available Trading Accounts</div>
          <h2 className="mt-2 text-[24px] font-black text-slate-900 sm:text-[34px]">Explore Forex Broker Account Types</h2>
          <p className="mt-3 max-w-4xl text-sm leading-8 text-slate-600">
            Forex brokers offer different account structures. Explore the accounts available at each broker and review their individual details before choosing two accounts to compare.
          </p>
          <div className="mt-6 sm:hidden"><MobileFeaturedBrokers brokers={availableBrokers} accounts={accounts} /></div>
          <div className="mt-7 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((broker) => {
              const brokerAccounts = accounts.filter((account) => account.broker_id === broker.id);
              return (
                <article key={broker.id} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[0_8px_25px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_35px_rgba(30,91,184,0.10)] sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-[90px] w-[110px] shrink-0 items-center justify-center rounded-[20px] border border-slate-100 bg-white p-3 shadow-sm sm:h-[105px] sm:w-[130px]">
                      {broker.logo ? <img src={broker.logo} alt={`${broker.name} logo`} className="max-h-full max-w-full object-contain" /> : <span className="text-lg font-black text-brand-600">{broker.name}</span>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[19px] font-black text-slate-900 sm:text-[21px]">{broker.name}</h3>
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-brand-700">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />{brokerAccounts.length} trading accounts
                      </div>
                      <Link href={`/en/brokers/${broker.slug}`} className="mt-3 block text-xs font-bold text-slate-500 transition hover:text-brand-600">View broker review →</Link>
                    </div>
                  </div>
                  <div className="my-5 h-px bg-slate-100" />
                  <div className="flex-1">
                    <h4 className="mb-3 text-sm font-black text-slate-800">Available Trading Accounts</h4>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {brokerAccounts.map((account) => {
                        const slug = accountSlug(account.account_name);
                        if (!slug || !broker.slug) return null;
                        return (
                          <Link
                            key={account.id}
                            href={`/en/brokers/${broker.slug}/accounts/${slug}`}
                            title={`View ${account.account_name} account details at ${broker.name}`}
                            className="flex min-h-[45px] items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-[12px] font-bold leading-5 text-slate-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E5BB8] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                          >
                            {account.account_name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <a href="#compare-tool" className="mt-6 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#1E5BB8] px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(30,91,184,0.16)] transition hover:bg-[#174a98]">
                    Choose an Account to Compare <span aria-hidden="true">→</span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>


{/* POPULAR ACCOUNT COMPARISONS */}
<section className="mx-auto max-w-[1520px] px-4 pb-10 sm:px-6 lg:px-8">
  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

    <div className="text-xs font-extrabold text-brand-600">
      Trading Account Comparisons
    </div>

    <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-[24px] font-black text-slate-900 sm:text-[34px]">
        Explore Trading Account Comparisons
      </h2>

      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-extrabold text-brand-600">
        <span className="sm:hidden">6 Featured Comparisons</span>
        <span className="hidden sm:inline">12 Featured Comparisons</span>
      </span>
    </div>

    <p className="mt-3 max-w-4xl text-sm leading-8 text-slate-600">
      Explore side-by-side comparisons of forex trading accounts
      from different brokers. Review spreads, commissions,
      minimum deposits and account conditions to find the
      trading account that best matches your needs.
    </p>

    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {popularComparisons.map(({ first, second, slug }, index) => (
        <Link
          key={slug}
          href={`/en/compare-accounts/${slug}`}
          className={`${
            index >= 6 ? "hidden sm:flex" : "flex"
          } group min-h-[90px] flex-col justify-center rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm`}
        >
          <div className="flex items-center justify-center gap-2 text-center">

            <span className="min-w-0 flex-1 text-[12px] font-black leading-6 text-slate-800 group-hover:text-brand-600">
              {first.broker.name}

              <span className="mt-1 block text-[11px] font-semibold text-slate-500">
                {first.account.account_name}
              </span>
            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-[10px] font-black text-brand-600">
              VS
            </span>

            <span className="min-w-0 flex-1 text-[12px] font-black leading-6 text-slate-800 group-hover:text-brand-600">
              {second.broker.name}

              <span className="mt-1 block text-[11px] font-semibold text-slate-500">
                {second.account.account_name}
              </span>
            </span>

          </div>

          <div className="mt-3 border-t border-slate-200 pt-2 text-center text-[11px] font-extrabold text-brand-600">
            Compare These Accounts →
          </div>
        </Link>
      ))}
    </div>

  </div>
</section>


      {/* SEO GUIDE */}
      <section id="account-guide" className="mx-auto max-w-[1520px] scroll-mt-24 px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="text-xs font-extrabold text-brand-600">Broker Alarab Guide</div>
          <h2 className="mt-2 text-[25px] font-black leading-tight text-slate-900 sm:text-[36px]">How to Choose the Right Forex Trading Account</h2>
          <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
            When comparing forex accounts, consider the total cost of a trade rather than the spread alone. Accounts may differ in commissions, minimum deposits, execution conditions, supported platforms and swap-free availability. An account that suits an active trader may not be the best fit for someone just starting out.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {guides.map((guide) => (
              <article key={guide.number} className="rounded-[22px] border border-slate-200 bg-[#f8fbff] p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f1ff] text-[13px] font-black text-[#1E5BB8]">{guide.number}</span>
                  <h3 className="text-[16px] font-black leading-7 text-slate-900 sm:text-[18px]">{guide.title}</h3>
                </div>
                <p className="mt-3 text-[13px] leading-7 text-slate-600 sm:text-[14px] sm:leading-8">{guide.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[22px] border border-brand-100 bg-[#eff6ff] p-5 sm:p-6">
              <h3 className="text-xl font-black text-slate-900">Standard vs Raw Spread Accounts</h3>
              <p className="mt-3 text-sm leading-8 text-slate-700">
                Standard accounts often have a simpler pricing structure, with much of the broker's charge built into the spread. Raw Spread accounts generally offer tighter quoted spreads but may charge a separate commission. Compare the full cost for the instrument and trade size you use.
              </p>
            </article>
            <article className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <h3 className="text-xl font-black text-slate-900">ECN vs Standard Trading Accounts</h3>
              <p className="mt-3 text-sm leading-8 text-slate-700">
                Some brokers use the term ECN for accounts with variable spreads and separate commissions. The label alone does not establish the broker's actual execution model. Check the execution policy, fees and account conditions instead of relying only on the account name.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="mx-auto max-w-[1520px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { href: "/en/compare", title: "Compare Forex Brokers", description: "Compare brokers by regulation, ratings, trading platforms and services." },
            { href: "/en/brokers", title: "Forex Broker Reviews", description: "Read detailed broker reviews before choosing a trading account." },
            { href: "/en/lowest-spread-brokers", title: "Lowest Spread Forex Brokers", description: "Learn how spreads affect trading costs and broker selection." },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md">
              <h3 className="text-[17px] font-black text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              <div className="mt-4 text-sm font-extrabold text-brand-600">Explore page →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1520px] px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="text-xs font-extrabold text-brand-600">Frequently Asked Questions</div>
          <h2 className="mt-2 text-[25px] font-black text-slate-900 sm:text-[34px]">Forex Account Comparison FAQs</h2>
          <div className="mt-6 space-y-3">
            {faq.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 open:bg-white sm:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-black leading-7 text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                  {item.q}<span className="shrink-0 text-xl text-brand-600 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-8 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-xs leading-7 text-slate-500">
            This content is for comparison and educational purposes only, not investment advice. Account conditions can change without notice. Always check the broker's official documentation.
          </p>
        </div>
      </section>
    </main>
  );
}
