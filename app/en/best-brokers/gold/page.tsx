import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

const PAGE_URL =
  "https://brokeralarab.com/en/best-brokers/gold";

const PAGE_TITLE =
  "Best Gold Brokers 2026 | Compare Gold Trading Platforms";

const PAGE_DESCRIPTION =
  "Compare the best gold brokers in 2026. Find top-rated gold trading platforms with competitive spreads, strong regulation, low minimum deposits, and advanced trading tools for XAU/USD traders.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: "https://brokeralarab.com/best-brokers/gold",
    },
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Broker Al Arab",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://brokeralarab.com/articles/best-gold-broker.png",
        width: 1600,
        height: 900,
        alt: "Best Gold Brokers 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      "https://brokeralarab.com/articles/best-gold-broker.png",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  keywords: [
    "best gold brokers",
    "best gold trading platforms",
    "gold trading brokers",
    "gold brokers comparison",
    "gold CFD brokers",
    "best broker for gold trading",
    "XAUUSD brokers",
    "low spread gold brokers",
    "gold trading platform",
    "trade gold online",
    "gold trading for beginners",
    "regulated gold brokers",
    "gold CFD trading",
    "best brokers for XAUUSD",
  ],
};

type Broker = {
  id: number;
  name: string;
  name_en: string | null;
  slug: string;
  logo: string | null;
  rating: number | null;
  min_deposit: number | null;
  max_leverage: string | number | null;
  islamic_account: boolean | null;
  arabic_support?: boolean | null;
  regulation?: string | null;
  founded_year?: number | null;
  headquarters?: string | null;
  real_account_url?: string | null;
};

async function getTopGoldBrokers(): Promise<Broker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brokers")
    .select(
      `
      id,
      name,
      name_en,
      slug,
      logo,
      rating,
      min_deposit,
      max_leverage,
      islamic_account,
      real_account_url,
      arabic_support,
      regulation,
      founded_year,
      headquarters
      `
    )
    .not("rating", "is", null)
    .order("rating", { ascending: false })
    .limit(10);

  if (error) {
    console.error(error.message);
    return [];
  }

  return (data || []) as Broker[];
}

function formatDeposit(value: number | null) {
  if (value === null || Number.isNaN(value))
    return "Not specified";

  return `$${value}`;
}

function formatLeverage(
  value: string | number | null
) {
  if (!value) return "N/A";
  return `${value}`;
}

function getBrokerName(broker: Broker) {
  return broker.name_en || broker.name;
}

function BrokerLogo({
  logo,
  name,
  size = 56,
}: {
  logo: string | null;
  name: string;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-blue-100 bg-white shadow-[0_4px_14px_rgba(59,130,246,0.08)]"
      style={{ width: size, height: size }}
    >
      {logo ? (
        <Image
          src={logo}
          alt={name}
          width={size}
          height={size}
          className="object-contain"
          style={{
            width: size - 10,
            height: size - 10,
          }}
        />
      ) : (
        <span className="text-xs font-bold text-slate-500">
          {name.slice(0, 2)}
        </span>
      )}
    </div>
  );
}

function RankBadge({
  rank,
}: {
  rank: number;
}) {
  const top = rank <= 3;

  return (
    <div
      className={`flex h-[70px] w-[30px] items-center justify-center rounded-[12px] text-sm font-black ${
        top
          ? "bg-amber-200/90 text-amber-800"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {rank}
    </div>
  );
}

function TopBrokerCard({
  broker,
  rank,
}: {
  broker: Broker;
  rank: number;
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[22px] font-black leading-none text-slate-950">
            {broker.name}
          </h3>

          <div className="mt-2 text-sm font-semibold text-emerald-600">
            ★ {broker.rating?.toFixed(1) ?? "—"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BrokerLogo logo={broker.logo} name={getBrokerName(broker)} size={46} />
          <RankBadge rank={rank} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <div className="text-[11px] text-slate-500">Min deposit</div>
          <div className="mt-1 text-xs font-bold text-slate-900">
            {formatDeposit(broker.min_deposit)}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <div className="text-[11px] text-slate-500">Max leverage</div>
          <div className="mt-1 text-xs font-bold text-slate-900">
            {formatLeverage(broker.max_leverage)}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <div className="text-[11px] text-slate-500">Swap-free</div>
          <div className="mt-1 text-xs font-bold text-slate-900">
            {broker.islamic_account ? "Available" : "Not listed"}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/en/brokers/${broker.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          Review
        </Link>

        <Link
          href={broker.real_account_url || `/en/brokers/${broker.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 px-4 text-sm font-bold text-brand-600 transition hover:bg-blue-100"
        >
          Open account
        </Link>
      </div>
    </div>
  );
}

function RankingRow({
  broker,
  rank,
}: {
  broker: Broker;
  rank: number;
}) {
  return (
    <Link
      href={`/en/brokers/${broker.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-5 overflow-hidden rounded-[22px] border border-brand-100 bg-white px-5 py-5 shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition hover:-translate-y-[1px] hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(59,130,246,0.10)]"
    >
      <div className="absolute inset-y-0 left-0 w-[4px] rounded-l-[22px] bg-blue-200" />

      <div className="relative z-10 flex h-[60px] w-[54px] shrink-0 items-center justify-center rounded-[14px] bg-blue-100 text-[15px] font-black text-brand-600 shadow-sm">
        {rank}
      </div>

      <div className="relative z-10 shrink-0">
        <BrokerLogo logo={broker.logo} name={getBrokerName(broker)} size={56} />
      </div>

      <div className="relative z-10 min-w-[150px]">
        <div className="text-[19px] font-black leading-tight text-slate-950">
          {getBrokerName(broker)}
        </div>
      </div>

      <div className="flex-1 min-w-[20px]" />

      <div className="relative z-10 shrink-0 flex items-center gap-4 text-[12px] font-semibold text-slate-600">
        <div className="min-w-[72px] leading-5">
          <div className="whitespace-nowrap text-slate-500">Min deposit:</div>
          <div className="whitespace-nowrap font-black text-slate-950">
            {formatDeposit(broker.min_deposit)}
          </div>
        </div>

        <div className="min-w-[72px] leading-5">
          <div className="whitespace-nowrap text-slate-500">Leverage:</div>
          <div className="whitespace-nowrap font-black text-slate-950">
            {formatLeverage(broker.max_leverage)}
          </div>
        </div>
      </div>

      <div
        className="relative z-10 shrink-0 pl-1 text-brand-500 group-hover:text-blue-800"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M7.21 4.21a.75.75 0 0 1 1.06 0l5.26 5.26a.75.75 0 0 1 0 1.06l-5.26 5.26a.75.75 0 1 1-1.06-1.06L11.94 10 7.21 5.27a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
}

function MobileRankingRow({
  broker,
  rank,
}: {
  broker: Broker;
  rank: number;
}) {
  return (
    <Link
      href={`/en/brokers/${broker.slug}`}
      className="group block rounded-[24px] border border-brand-100 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.08)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
            {broker.logo ? (
              <img
                src={broker.logo}
                alt={getBrokerName(broker)}
                className="h-9 w-9 object-contain"
              />
            ) : (
              <span className="text-xs font-bold text-slate-500">
                {getBrokerName(broker).slice(0, 2)}
              </span>
            )}
          </div>

          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-black text-brand-600">
            {rank}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[18px] font-black text-slate-950">
            {getBrokerName(broker)}
          </div>

          <div className="mt-1 text-[13px] font-bold text-slate-600">
            Rating{" "}
            <span className="text-emerald-600">
              {broker.rating?.toFixed(1) ?? "—"}
            </span>
            <span className="ml-1 text-emerald-500">★</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-500 transition group-hover:bg-blue-100 group-hover:text-brand-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.21 4.21a.75.75 0 0 1 1.06 0l5.26 5.26a.75.75 0 0 1 0 1.06l-5.26 5.26a.75.75 0 1 1-1.06-1.06L11.94 10 7.21 5.27a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeatureItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-brand-600">
        ✓
      </span>
      <span className="text-[15px] leading-7 text-slate-700">
        {children}
      </span>
    </li>
  );
}

const faqItems = [
  {
    q: "What is the best broker for gold trading?",
    a: "The best broker for gold trading depends on your trading style, location, account size, and platform preference. In general, a strong gold broker should offer competitive XAU/USD trading conditions, reliable execution, clear fees, strong regulation, and easy funding and withdrawals.",
  },
  {
    q: "Can beginners trade gold online?",
    a: "Yes, beginners can trade gold online, but they should start with a clear risk-management plan, small position sizes, and a regulated broker. Gold can move sharply during major economic news, so beginners should avoid using excessive leverage.",
  },
  {
    q: "What is XAU/USD in trading?",
    a: "XAU/USD is the symbol used to represent the price of gold against the US dollar. When traders say they are trading gold online, they are often referring to XAU/USD through CFDs or other derivative products.",
  },
  {
    q: "How much money do I need to start trading gold?",
    a: "The required amount depends on the broker and account type. Some gold brokers allow low minimum deposits, while others require a higher starting balance. Traders should also keep enough margin to manage volatility safely.",
  },
  {
    q: "Is high leverage good for gold trading?",
    a: "High leverage is not automatically better. It can increase potential returns, but it also increases risk. Since gold can be volatile, traders should choose leverage carefully and avoid risking too much of their account on a single trade.",
  },
  {
    q: "What should I compare before choosing a gold broker?",
    a: "Before choosing a gold broker, compare regulation, spreads, commissions, execution quality, minimum deposit, available platforms, withdrawal options, customer support, and whether the broker is suitable for your country.",
  },
  {
    q: "Do gold brokers charge overnight fees?",
    a: "Many brokers charge overnight financing or swap fees when gold positions are held overnight. Some brokers may offer swap-free or Islamic-style accounts, but the exact terms can differ between brokers.",
  },
  {
    q: "What is the best time to trade gold?",
    a: "Gold often becomes more active during the London and New York sessions, especially around major US economic releases such as inflation data, employment reports, Federal Reserve decisions, and geopolitical news.",
  },
];

export default async function BestGoldBrokersPage() {
  const brokers = await getTopGoldBrokers();
  const featured = brokers.slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://brokeralarab.com/en",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Best Brokers",
        item: "https://brokeralarab.com/en/best-brokers",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Best Gold Brokers",
        item: PAGE_URL,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Gold Brokers in 2026",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: brokers.length,
    itemListElement: brokers.map((broker, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getBrokerName(broker),
      url: `https://brokeralarab.com/en/brokers/${broker.slug}`,
    })),
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    inLanguage: "en",
    about: [
      { "@type": "Thing", name: "Gold trading" },
      { "@type": "Thing", name: "Gold brokers" },
      { "@type": "Thing", name: "XAU/USD trading" },
      { "@type": "Thing", name: "Gold CFD brokers" },
    ],
    mainEntity: itemListSchema,
  };

  return (
    <main className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />

      {/* HERO */}
      <section className="hidden md:block mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="px-5 py-6 md:px-12 md:py-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl lg:text-6xl"
                style={{ lineHeight: 1.15 }}
              >
                Best Gold Brokers in 2026
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-9 text-slate-700 md:text-[18px]">
                Compare the best gold trading platforms for 2026 based on
                regulation, trading costs, minimum deposit, leverage, platform
                quality, and overall suitability for XAU/USD traders.
              </p>

              <a
                href="#gold-prices"
                className="mx-auto mt-4 inline-flex max-w-fit items-center justify-center rounded-full bg-amber-100 px-5 py-2 text-[13px] font-bold text-amber-800 transition hover:bg-amber-200 md:text-[14px]"
              >
                Gold price history from 1980 to 2026
              </a>
            </div>
          </div>

          <div className="border-t border-slate-200 px-4 py-3 md:px-8 md:py-4">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 shadow-sm md:rounded-[28px]">
              <Image
                src="/articles/best-gold-broker.png"
                alt="Best gold brokers in 2026"
                width={1600}
                height={900}
                priority
                className="h-[220px] w-full object-cover md:h-[320px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE HERO */}
      <section className="md:hidden mx-auto max-w-7xl px-3 pb-4">
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="px-5 pt-4 pb-5 text-center">
            <div className="text-[30px] font-black leading-[1.35] tracking-tight text-slate-950 sm:text-[32px]">
              Best Gold Brokers in 2026
            </div>

            <p className="mx-auto mt-4 max-w-[320px] text-[16px] leading-9 text-slate-700">
              Compare trusted gold brokers based on regulation, spreads,
              platform quality, minimum deposit, leverage, and trading
              conditions for XAU/USD.
            </p>

            <a
              href="#gold-prices"
              className="mx-auto mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-[12px] font-bold text-amber-800 transition hover:bg-amber-200"
            >
              Gold prices 1980 – 2026
            </a>
          </div>

          <div className="border-t border-slate-200 px-3 py-3">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 shadow-sm">
              <Image
                src="/articles/best-gold-broker.png"
                alt="Best gold trading platforms"
                width={1600}
                height={900}
                priority
                className="h-[170px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="hidden md:block mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="rounded-[26px] border border-slate-200 bg-white px-5 py-5 shadow-sm md:px-8 md:py-6">
          <p className="text-[15px] leading-8 text-slate-700 md:text-[17px] md:leading-9">
            Choosing the best broker for gold trading is not only about finding
            the highest leverage or the lowest minimum deposit. Gold is one of
            the most actively traded instruments in global markets, and XAU/USD
            can move sharply around inflation data, interest-rate decisions,
            geopolitical news, and changes in the US dollar.
          </p>

          <p className="mt-4 text-[15px] leading-8 text-slate-700 md:text-[17px] md:leading-9">
            This guide compares leading gold brokers based on practical factors
            that matter to real traders: regulation, execution quality, trading
            fees, account types, platform reliability, funding options, and
            whether the broker offers suitable conditions for short-term and
            medium-term gold trading.
          </p>
        </div>
      </section>

      {/* TOP 3 */}
      {featured.length > 0 && (
        <section className="hidden md:block mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-6 md:px-8">
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                Our Top 3 Gold Trading Platforms
              </h2>

              <p className="mt-3 text-[15px] leading-8 text-slate-700 md:text-base">
                These brokers stand out based on overall rating, trading
                conditions, minimum deposit, leverage, and platform experience.
              </p>
            </div>

            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                {featured.map((broker, index) => (
                  <div
                    key={broker.id}
                    className="group relative overflow-hidden rounded-[26px] border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-[2px] hover:border-brand-100 hover:shadow-md"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300" />

                    <div className="flex items-center justify-between gap-4">
                      <BrokerLogo
  logo={broker.logo}
  name={getBrokerName(broker)}
  size={56}
/>

                      <div className="flex-1">
                        <h3 className="truncate text-[24px] font-black leading-none text-slate-950">
                          {getBrokerName(broker)}
                        </h3>

                        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700">
                          ★ {broker.rating?.toFixed(1) ?? "—"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-[13px] leading-7 text-slate-600">
                        A strong option for traders who want a clear, reliable
                        gold trading experience with competitive conditions for
                        XAU/USD.
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
                        <div className="text-[11px] font-semibold text-slate-500">
                          Min deposit
                        </div>
                        <div className="mt-1 text-sm font-black text-slate-950">
                          {formatDeposit(broker.min_deposit)}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
                        <div className="text-[11px] font-semibold text-slate-500">
                          Max leverage
                        </div>
                        <div className="mt-1 text-sm font-black text-slate-950">
                          {formatLeverage(broker.max_leverage)}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
                        <div className="text-[11px] font-semibold text-slate-500">
                          Swap-free
                        </div>
                        <div className="mt-1 text-sm font-black text-slate-950">
                          {broker.islamic_account
                            ? "Available"
                            : "Not listed"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={
                          broker.real_account_url ||
                          `/en/brokers/${broker.slug}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 px-4 text-sm font-bold text-brand-600 transition hover:bg-blue-100"
                      >
                        Open account
                      </Link>

                      <Link
                        href={`/en/brokers/${broker.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-brand-500 px-4 text-sm font-bold text-white transition hover:bg-brand-600"
                      >
                        Read review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TOP 10 */}
      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-6 md:px-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Best 10 Gold Brokers in 2026
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500 md:text-base">
              Compare the top gold trading brokers by rating, minimum deposit,
              leverage, regulation, trading costs, and platform quality.
            </p>

            <p className="mt-2 text-sm leading-7 text-brand-500 md:text-[15px]">
              Click any broker to read the full review and check account
              details.
            </p>
          </div>

          <div className="px-4 py-6 md:px-6">
            {brokers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-500">
                No broker data is currently available.
              </div>
            ) : (
              <>
                <div className="space-y-3 md:hidden">
                  {brokers.map((broker, index) => (
                    <MobileRankingRow
                      key={broker.id}
                      broker={broker}
                      rank={index + 1}
                    />
                  ))}
                </div>

                <div className="hidden md:grid md:grid-cols-2 md:items-start md:gap-5 md:px-2">
                  <div className="space-y-4 border-r border-slate-200 pr-5">
                    {brokers.slice(0, 5).map((broker, i) => (
                      <RankingRow
                        key={broker.id}
                        broker={broker}
                        rank={i + 1}
                      />
                    ))}
                  </div>

                  <div className="space-y-4 pl-5">
                    {brokers.slice(5, 10).map((broker, i) => (
                      <RankingRow
                        key={broker.id}
                        broker={broker}
                        rank={i + 6}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

            {/* GOLD PRICE HISTORY */}
      <section id="gold-prices" className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-amber-50/70 via-white to-white px-5 py-6 md:px-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Gold Prices from 1980 to 2026: Historical Table
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-600 md:text-[16px]">
              Review historical gold prices from 1980 to 2026, including annual
              highs, lows, estimated averages, and key market events that shaped
              long-term gold trends.
            </p>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full text-center">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-4 font-black text-slate-700">Year</th>
                  <th className="px-4 py-4 font-black text-slate-700">High</th>
                  <th className="px-4 py-4 font-black text-slate-700">Low</th>
                  <th className="px-4 py-4 font-black text-slate-700">Average</th>
                  <th className="px-4 py-4 font-black text-slate-700">Trend</th>
                  <th className="px-4 py-4 font-black text-slate-700">Key event</th>
                </tr>
              </thead>

              <tbody>
                {[
                 { y: "Jan 2026", h: 5595.62, l: 4310.53, e: "Strong start", special: true },

{ y: "Feb 2026", h: 5281.19, l: 4403.75, e: "Momentum continues", special: true },

{ y: "Mar 2026", h: 5419, l: 4098, e: "New record highs", special: true },

{ y: "Apr 2026", h: 4890, l: 4510, e: "Market correction", special: true },

{ y: "May 2026", h: 4773, l: 4399, e: "Dollar strength", special: true },
                  { y: 2025, h: 4537, l: 2600, e: "Major rally" },
                  { y: 2024, h: 2790, l: 1984, e: "Record highs" },
                  { y: 2023, h: 2135, l: 1804, e: "Rate uncertainty" },
                  { y: 2022, h: 2070, l: 1618, e: "Ukraine war" },
                  { y: 2021, h: 1959, l: 1677, e: "Inflation pressure" },
                  { y: 2020, h: 2067, l: 1451, e: "COVID shock" },
                  { y: 2019, h: 1557, l: 1266, e: "Global slowdown" },
                  { y: 2018, h: 1369, l: 1160, e: "Trade tensions" },
                  { y: 2017, h: 1357, l: 1146, e: "Recovery" },
                  { y: 2016, h: 1375, l: 1060, e: "Brexit" },
                  { y: 2015, h: 1307, l: 1049, e: "Market bottom" },
                  { y: 2014, h: 1392, l: 1131, e: "Strong dollar" },
                  { y: 2013, h: 1694, l: 1192, e: "Sharp decline" },
                  { y: 2012, h: 1792, l: 1540, e: "Correction" },
                  { y: 2011, h: 1921, l: 1319, e: "Historic peak" },
                  { y: 2010, h: 1421, l: 1058, e: "Debt crisis" },
                ].map((r, i, arr) => {
                  const avg = Math.round((r.h + r.l) / 2);
                  const prevHigh = i < arr.length - 1 ? arr[i + 1].h : null;

                  let trend = "—";
                  let color = "bg-slate-100 text-slate-600";

                  if (prevHigh !== null) {
                    if (r.h > prevHigh) {
                      trend = "↑";
                      color = "bg-emerald-50 text-emerald-700";
                    } else if (r.h < prevHigh) {
                      trend = "↓";
                      color = "bg-rose-50 text-rose-700";
                    }
                  }

                  return (
                    <tr
                      key={String(r.y)}
                      className={
                        r.special
                          ? "bg-brand-50 font-bold"
                          : i % 2 === 0
                          ? "bg-white"
                          : "bg-slate-50/60"
                      }
                    >
                      <td className="px-4 py-4 font-black">{r.y}</td>
                      <td className="px-4 py-4">${r.h}</td>
                      <td className="px-4 py-4">${r.l}</td>
                      <td className="px-4 py-4 font-bold text-amber-700">${avg}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-bold ${color}`}>
                          {trend}
                        </span>
                      </td>
                      <td className="px-4 py-4">{r.e}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <details className="border-t border-slate-200 bg-white">
              <summary className="cursor-pointer list-none select-none px-6 py-5 text-center">
                <span className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-black text-slate-700 transition hover:border-brand-100 hover:bg-brand-50 hover:text-brand-600">
                  Show more years
                </span>
              </summary>

              <div className="overflow-x-auto border-t border-slate-200">
                <table className="min-w-full text-center">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 font-black text-slate-700">Year</th>
                      <th className="px-4 py-4 font-black text-slate-700">High</th>
                      <th className="px-4 py-4 font-black text-slate-700">Low</th>
                      <th className="px-4 py-4 font-black text-slate-700">Average</th>
                      <th className="px-4 py-4 font-black text-slate-700">Key event</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      { y: 2009, h: 1226, l: 810, e: "Safe haven demand" },
                      { y: 2008, h: 1011, l: 681, e: "Financial crisis" },
                      { y: 2007, h: 841, l: 608, e: "Credit stress" },
                      { y: 2006, h: 725, l: 524, e: "Investment demand" },
                      { y: 2005, h: 537, l: 411, e: "Bullish phase" },
                      { y: 2004, h: 455, l: 375, e: "Weak dollar" },
                      { y: 2003, h: 417, l: 320, e: "Iraq war" },
                      { y: 2002, h: 348, l: 278, e: "Safe haven demand" },
                      { y: 2001, h: 293, l: 256, e: "September 11" },
                      { y: 2000, h: 314, l: 264, e: "Early recovery" },
                      { y: 1999, h: 326, l: 252, e: "Relative bottom" },
                      { y: 1998, h: 314, l: 273, e: "Russia crisis" },
                      { y: 1997, h: 367, l: 283, e: "Asian crisis" },
                      { y: 1996, h: 416, l: 368, e: "Stable market" },
                      { y: 1995, h: 396, l: 372, e: "Tight range" },
                      { y: 1994, h: 398, l: 369, e: "Rate pressure" },
                      { y: 1993, h: 406, l: 326, e: "Recovery" },
                      { y: 1992, h: 360, l: 330, e: "Quiet market" },
                      { y: 1991, h: 403, l: 343, e: "Post-war period" },
                      { y: 1990, h: 423, l: 346, e: "Gulf War" },
                      { y: 1989, h: 417, l: 358, e: "Slowdown" },
                      { y: 1988, h: 485, l: 394, e: "Stability" },
                      { y: 1987, h: 502, l: 391, e: "Market crash" },
                      { y: 1986, h: 442, l: 326, e: "Oil volatility" },
                      { y: 1985, h: 339, l: 285, e: "Weak demand" },
                      { y: 1984, h: 424, l: 308, e: "Strong dollar" },
                      { y: 1983, h: 511, l: 374, e: "Stabilization" },
                      { y: 1982, h: 487, l: 297, e: "Recession" },
                      { y: 1981, h: 614, l: 401, e: "Tight policy" },
                      { y: 1980, h: 850, l: 481, e: "Inflation shock" },
                    ].map((r, i) => {
                      const avg = Math.round((r.h + r.l) / 2);

                      return (
                        <tr
                          key={String(r.y)}
                          className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                        >
                          <td className="px-4 py-4 font-black">{r.y}</td>
                          <td className="px-4 py-4">${r.h}</td>
                          <td className="px-4 py-4">${r.l}</td>
                          <td className="px-4 py-4 font-bold text-amber-700">${avg}</td>
                          <td className="px-4 py-4">{r.e}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          <div className="lg:hidden">
            <div className="overflow-hidden rounded-b-[28px] border-t border-slate-200 bg-white">
              {[
                { y: "Jan 2026", h: 5595.62, l: 4310.53, e: "Strong start" },
{ y: "Feb 2026", h: 5281.19, l: 4403.75, e: "Momentum continues" },
{ y: "Mar 2026", h: 5419, l: 4098, e: "New record highs" },
{ y: "Apr 2026", h: 4890, l: 4510, e: "Market correction" },
{ y: "May 2026", h: 4773, l: 4399, e: "Dollar strength" },
                { y: 2025, h: 4537, l: 2600, e: "Major rally" },
                { y: 2024, h: 2790, l: 1984, e: "Record highs" },
                { y: 2023, h: 2135, l: 1804, e: "Rate uncertainty" },
                { y: 2022, h: 2070, l: 1618, e: "Ukraine war" },
                { y: 2021, h: 1959, l: 1677, e: "Inflation pressure" },
                { y: 2020, h: 2067, l: 1451, e: "COVID shock" },
              ].map((r) => {
                const avg = Math.round((r.h + r.l) / 2);

                return (
                  <details key={String(r.y)} className="group border-b border-slate-200 bg-white">
                    <summary className="list-none cursor-pointer px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="truncate text-[19px] font-black text-slate-950">
                          {r.y}
                        </h3>

                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-open:rotate-180">
                          ↓
                        </span>
                      </div>

                      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <div className="grid grid-cols-2">
                          <div className="border-r border-slate-200 px-3 py-2">
                            <div className="text-[10px] text-slate-500">Average</div>
                            <div className="mt-1 text-[15px] font-black text-amber-700">
                              ${avg}
                            </div>
                          </div>

                          <div className="px-3 py-2">
                            <div className="text-[10px] text-slate-500">Event</div>
                            <div className="mt-1 text-[13px] font-bold text-slate-800">
                              {r.e}
                            </div>
                          </div>
                        </div>
                      </div>
                    </summary>

                    <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="border-r border-slate-200 px-3 py-3">
                          <div className="text-[10px] text-slate-500">High</div>
                          <div className="mt-1 text-[14px] font-black text-slate-900">
                            ${r.h}
                          </div>
                        </div>

                        <div className="px-3 py-3">
                          <div className="text-[10px] text-slate-500">Low</div>
                          <div className="mt-1 text-[14px] font-black text-slate-900">
                            ${r.l}
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE CHOSE */}
      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-6 md:px-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              How We Chose the Best Gold Brokers
            </h2>
            <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
              Our ranking focuses on real trading conditions rather than brand
              popularity alone. We looked at the factors that matter most when
              trading gold online.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3 md:p-8">
            {[
              {
                title: "Regulation and trust",
                text: "We give higher weight to brokers with stronger regulatory profiles, transparent terms, and a clear operating history.",
              },
              {
                title: "Gold trading costs",
                text: "We compare spreads, commissions, overnight fees, and how suitable each broker is for active XAU/USD trading.",
              },
              {
                title: "Execution quality",
                text: "Gold can move quickly during economic news, so platform stability and execution quality are important.",
              },
              {
                title: "Minimum deposit",
                text: "A lower minimum deposit can help beginners start carefully without committing too much capital too early.",
              },
              {
                title: "Leverage and risk control",
                text: "Leverage can be useful, but it must be evaluated alongside margin rules and overall risk exposure.",
              },
              {
                title: "Platform experience",
                text: "We consider the usability of the platform, mobile apps, account opening, funding methods, and support quality.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-600">
                  Key factor
                </div>
                <h3 className="mt-3 text-[20px] font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-8 text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-6 md:px-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              How to Choose the Right Gold Trading Platform
            </h2>
            <p className="mt-3 text-[15px] leading-8 text-slate-600 md:text-[16px]">
              The best gold broker for one trader may not be the best choice for
              another. Your account size, experience, risk tolerance, and trading
              style should guide your decision.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 md:p-8">
            {[
              {
                title: "1) Start with your trading style",
                text: "Scalpers usually care about spreads and execution speed, while swing traders may care more about overnight fees and platform reliability.",
              },
              {
                title: "2) Do not choose based on leverage alone",
                text: "High leverage can make gold trading more dangerous. A good broker should offer flexibility, but risk management remains essential.",
              },
              {
                title: "3) Compare total trading cost",
                text: "Look beyond the advertised spread. Consider commissions, swaps, slippage, and how the broker performs during fast markets.",
              },
              {
                title: "4) Check platform stability",
                text: "Gold often reacts strongly to US data and central-bank news. A stable platform is critical when volatility increases.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-[22px] font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-8 text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOLD TRADING RISKS */}
      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-6 text-center md:px-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Gold Trading Risks You Should Know
            </h2>
            <p className="mx-auto mt-3 max-w-4xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
              Gold trading can be attractive because XAU/USD is highly liquid and
              reacts strongly to global events. However, choosing the best gold
              broker does not remove market risk. Before trading gold online, you
              should understand the main risks that can affect your account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 md:p-8">
            {[
              {
                title: "Fast price volatility",
                text: "Gold prices can move sharply during inflation reports, interest-rate decisions, central-bank speeches, geopolitical news, and sudden changes in the US dollar.",
              },
              {
                title: "High leverage risk",
                text: "Many gold brokers offer leverage on XAU/USD. Leverage can increase potential returns, but it can also magnify losses very quickly if the market moves against your position.",
              },
              {
                title: "Spread and execution slippage",
                text: "During volatile market conditions, spreads may widen and execution may differ from the expected price, especially around major news releases.",
              },
              {
                title: "Poor risk management",
                text: "Trading without a clear plan, stop-loss strategy, or position-size discipline is one of the most common reasons traders lose money when trading gold CFDs.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-rose-200 bg-rose-50/50 p-5"
              >
                <h3 className="text-[19px] font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="px-5 pb-6 md:px-8">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-[19px] font-black text-slate-950">
                How to reduce gold trading risk
              </h3>

              <ul className="mt-4 grid grid-cols-1 gap-3 text-[14px] leading-7 text-slate-700 md:grid-cols-2">
                <FeatureItem>Use a regulated gold broker with clear trading terms.</FeatureItem>
                <FeatureItem>Start with smaller position sizes until you understand XAU/USD volatility.</FeatureItem>
                <FeatureItem>Compare spreads, swaps, and execution quality before opening a real account.</FeatureItem>
                <FeatureItem>Avoid trading gold during major news if you do not have a clear plan.</FeatureItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GOLD IS POPULAR */}
      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-6 text-center md:px-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Why Do Traders Choose Gold?
            </h2>
            <p className="mx-auto mt-3 max-w-4xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
              Gold remains one of the most followed trading instruments because
              it is connected to inflation, interest rates, the US dollar, market
              fear, and global uncertainty. This is why many traders search for
              the best brokers for gold trading instead of trading gold through
              physical ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-4 md:p-8">
            {[
              {
                title: "Safe-haven demand",
                text: "Gold is often watched during periods of market stress, geopolitical tension, and uncertainty in global financial markets.",
              },
              {
                title: "High liquidity",
                text: "XAU/USD is widely traded across global sessions, giving active traders frequent opportunities throughout the trading week.",
              },
              {
                title: "Strong price movement",
                text: "Gold can react strongly to US data, Federal Reserve decisions, inflation expectations, and changes in bond yields.",
              },
              {
                title: "Global asset",
                text: "Gold is not tied to one company or one country, which makes it a unique market for traders who follow macroeconomic trends.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-700">
                  ★
                </div>

                <h3 className="text-[18px] font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-[14px] leading-7 text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="px-5 pb-6 md:px-8">
            <div className="rounded-[22px] border border-blue-100 bg-brand-50/60 p-5">
              <p className="text-[15px] leading-8 text-slate-700">
                For many online traders, gold trading offers a balance between
                liquidity, volatility, and macroeconomic relevance. However, the
                broker you choose matters. A reliable gold trading platform should
                provide transparent pricing, stable execution, clear margin rules,
                and a smooth account experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-6 md:px-8">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              Gold Trading Brokers FAQ
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {faqItems.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 md:px-8">
                  <h3 className="text-[17px] font-black text-slate-950">
                    {item.q}
                  </h3>
                  <span className="text-xl font-black text-brand-500 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="bg-slate-50 px-5 py-5 md:px-8">
                  <p className="text-[15px] leading-8 text-slate-700">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}