import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  best_for: string | null;
  best_for_en: string | null;
  logo: string | null;
  slug: string | null;
  real_account_url: string | null;
};

type BrokerAccount = {
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
  is_islamic_available: boolean | null;
  sort_order: number | null;
};

type BeginnerBrokerRow = {
  broker: Broker;
  account: BrokerAccount | null;
};

const FEATURED_BROKER_IDS = [1, 3, 11];
const TABLE_BROKER_IDS = [1, 3, 11, 2, 4, 5, 6, 7, 8, 9];

const PAGE_URL =
  "https://brokeralarab.com/en/learn-trading/how-to-start-trading-from-zero";

const PAGE_IMAGE =
  "https://brokeralarab.com/articles/how-to-start-trading-from-zero.png";

export async function generateMetadata(): Promise<Metadata> {
  const title = "How to Start Trading from Zero: Beginner Guide 2026";

  const description =
    "Learn how to start trading from zero with a practical beginner guide covering forex basics, demo accounts, risk management, broker selection, spreads, leverage, and common mistakes.";

  return {
    title,
    description,
    alternates: {
      canonical: PAGE_URL,
      languages: {
        en: "/en/learn-trading/how-to-start-trading-from-zero",
        ar: "/learn-trading/how-to-start-trading-from-zero",
        "x-default": "/en/learn-trading/how-to-start-trading-from-zero",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      type: "article",
      locale: "en_US",
      images: [PAGE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [PAGE_IMAGE],
    },
  };
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getBrokerName(broker: Broker) {
  return broker.name_en || broker.name || "Broker";
}

function getBrokerBestFor(broker: Broker) {
  return broker.best_for_en || broker.best_for || "Beginner traders";
}

function formatMoney(value: number | null) {
  if (value === null) return "-";
  return `$${value}`;
}

function getReviewHref(broker: Broker) {
  return broker.slug ? `/en/brokers/${broker.slug}` : "/en/best-brokers";
}

function getAccountHref(broker: Broker) {
  return broker.real_account_url || getReviewHref(broker);
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
          {eyebrow}
        </span>
      )}

      <h2 className="mt-3 text-[26px] font-black leading-[1.25] text-slate-950 md:text-[34px]">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-4xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
          {description}
        </p>
      )}
    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-[18px] font-black leading-7 text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-[15px] leading-8 text-slate-600">{text}</p>
    </div>
  );
}

function BulletBox({
  title,
  items,
  tone = "blue",
}: {
  title: string;
  items: string[];
  tone?: "blue" | "red" | "green" | "slate";
}) {
  const toneClass =
    tone === "red"
      ? "border-red-100 bg-red-50/70 text-red-800"
      : tone === "green"
        ? "border-green-100 bg-green-50/70 text-green-800"
        : tone === "slate"
          ? "border-slate-200 bg-slate-50 text-slate-700"
          : "border-blue-100 bg-blue-50/70 text-blue-800";

  return (
    <div className={cn("rounded-[22px] border p-4", toneClass)}>
      <h3 className="text-[17px] font-black text-slate-950">{title}</h3>

      <ul className="mt-3 space-y-2 text-[14px] leading-7">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({
  number,
  label,
  title,
  text,
  note,
}: {
  number: string;
  label: string;
  title: string;
  text: string;
  note: string;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="absolute left-0 top-0 h-1.5 w-full bg-[linear-gradient(90deg,#2563eb_0%,#60a5fa_100%)] opacity-90" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-[16px] font-black text-white shadow-sm">
          {number}
        </div>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-600">
          {label}
        </span>
      </div>

      <h3 className="mt-4 text-[21px] font-black leading-8 text-slate-950">
        {title}
      </h3>

      <p className="mt-3 text-[16px] leading-8 text-slate-600">{text}</p>

      <div className="mt-auto pt-4">
        <div className="min-h-[70px] rounded-[16px] border border-blue-100 bg-blue-50/70 px-3 py-2 text-[12px] font-bold leading-7 text-blue-800">
          {note}
        </div>
      </div>
    </article>
  );
}

function BrokerEducationCard({
  row,
  badge,
}: {
  row: BeginnerBrokerRow;
  badge: string;
}) {
  const broker = row.broker;
  const account = row.account;
  const brokerName = getBrokerName(broker);

  return (
    <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black text-amber-700">
            {badge}
          </span>

          {broker.rating !== null && (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-black text-white">
              {Number(broker.rating).toFixed(2)} / 5
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {broker.logo ? (
              <Image
                src={broker.logo}
                alt={brokerName}
                fill
                className="object-contain p-2"
              />
            ) : null}
          </div>

          <div className="min-w-0">
            <h3 className="text-[20px] font-black text-slate-950">
              {brokerName}
            </h3>

            <p className="mt-1 text-[13px] leading-7 text-slate-600">
              {getBrokerBestFor(broker)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-3">
            <div className="text-[12px] font-black text-slate-500">
              Beginner account
            </div>
            <div className="mt-1 text-[16px] font-black text-slate-950">
              {account?.account_name || "Standard"}
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-3">
            <div className="text-[12px] font-black text-slate-500">
              Minimum deposit
            </div>
            <div className="mt-1 text-[16px] font-black text-slate-950">
              {account?.min_deposit_en ||
                account?.min_deposit ||
                formatMoney(broker.min_deposit)}
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[16px] border border-slate-200 bg-white p-3">
            <div className="text-[12px] font-black text-slate-500">
              Typical spread
            </div>
            <div className="mt-1 text-[15px] font-black text-slate-950">
              {account?.spread || "-"}
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white p-3">
            <div className="text-[12px] font-black text-slate-500">
              Commission
            </div>
            <div className="mt-1 text-[15px] font-black text-slate-950">
              {account?.commission_en || account?.commission || "-"}
            </div>
          </div>
        </div>

        {broker.regulation_short || broker.regulation ? (
          <p className="mt-4 text-[13px] leading-7 text-slate-600">
            <span className="font-black text-slate-900">Regulation:</span>{" "}
            {broker.regulation_short || broker.regulation}
          </p>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href={getReviewHref(broker)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
          >
            Read Review
          </Link>

          <Link
            href={getAccountHref(broker)}
            className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#16a34a_0%,#22c55e_100%)] px-4 py-3 text-sm font-black text-white transition hover:opacity-95"
          >
            Open Account
          </Link>
        </div>
      </div>
    </article>
  );
}

function BeginnerBrokerTable({ rows }: { rows: BeginnerBrokerRow[] }) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 md:px-6">
        <h2 className="text-[24px] font-black leading-[1.3] text-slate-950 md:text-[30px]">
          10 Beginner-Friendly Brokers to Compare Before Opening an Account
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          This table is not the main point of the article. It is here to help
          you connect the learning steps with practical broker conditions such
          as minimum deposit, spreads, commissions, platforms, and regulation.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">
          <thead className="bg-white">
            <tr className="border-b border-slate-200">
              <th className="p-4 text-sm font-black text-slate-950">Broker</th>
              <th className="p-4 text-sm font-black text-slate-950">Rating</th>
              <th className="p-4 text-sm font-black text-slate-950">Account</th>
              <th className="p-4 text-sm font-black text-slate-950">Spread</th>
              <th className="p-4 text-sm font-black text-slate-950">
                Commission
              </th>
              <th className="p-4 text-sm font-black text-slate-950">
                Minimum Deposit
              </th>
              <th className="p-4 text-sm font-black text-slate-950">
                Platforms
              </th>
              <th className="p-4 text-sm font-black text-slate-950">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(({ broker, account }) => {
              const brokerName = getBrokerName(broker);

              return (
                <tr
                  key={broker.id}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-[46px] w-[46px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                        {broker.logo ? (
                          <Image
                            src={broker.logo}
                            alt={brokerName}
                            fill
                            className="object-contain p-2"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0">
                        <div className="text-[14px] font-black text-slate-950">
                          {brokerName}
                        </div>

                        <div className="mt-1 text-[12px] leading-6 text-slate-500">
                          {getBrokerBestFor(broker)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-sm font-black text-slate-900">
                    {broker.rating !== null
                      ? Number(broker.rating).toFixed(2)
                      : "-"}
                  </td>

                  <td className="p-4 text-sm text-slate-700">
                    {account?.account_name || "-"}
                  </td>

                  <td className="p-4 text-sm text-slate-700">
                    {account?.spread || "-"}
                  </td>

                  <td className="p-4 text-sm text-slate-700">
                    {account?.commission_en || account?.commission || "-"}
                  </td>

                  <td className="p-4 text-sm text-slate-700">
                    {account?.min_deposit_en ||
                      account?.min_deposit ||
                      formatMoney(broker.min_deposit)}
                  </td>

                  <td className="p-4 text-sm text-slate-700">
                    {broker.platforms || "-"}
                  </td>

                  <td className="p-4">
                    <Link
                      href={getReviewHref(broker)}
                      className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2563eb_0%,#3b82f6_100%)] px-4 py-2.5 text-xs font-black text-white transition hover:opacity-95"
                    >
                      Read Review
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function Page() {
  const supabase = await createClient();

  const article = {
    title: "How to Start Trading from Zero: Step-by-Step Beginner Guide",
    excerpt:
      "A practical guide for beginners who want to understand trading from the ground up: how markets work, what to learn first, how to practice safely, how to choose a broker, and how to avoid the mistakes that usually destroy the first account.",
    cover_image: "/articles/how-to-start-trading-from-zero.png",
  };

  const { data: brokersData, error: brokersError } = await supabase
    .from("brokers")
    .select(
      "id, name, name_en, rating, min_deposit, platforms, regulation, regulation_short, best_for, best_for_en, logo, slug, real_account_url"
    )
    .in("id", FEATURED_BROKER_IDS);

  if (brokersError) {
    console.error("Brokers error:", brokersError);
  }
  const { data: tableBrokersData, error: tableBrokersError } = await supabase
  .from("brokers")
  .select(
    "id, name, name_en, rating, min_deposit, platforms, regulation, regulation_short, best_for, best_for_en, logo, slug, real_account_url"
  )
  .in("id", TABLE_BROKER_IDS);

if (tableBrokersError) {
  console.error("Table brokers error:", tableBrokersError);
}

const tableOrderMap = new Map(
  TABLE_BROKER_IDS.map((id, index) => [id, index])
);

const tableBrokers: Broker[] = (tableBrokersData ?? []).sort(
  (a, b) =>
    (tableOrderMap.get(a.id) ?? 999) -
    (tableOrderMap.get(b.id) ?? 999)
);


  const brokerOrderMap = new Map(
    FEATURED_BROKER_IDS.map((id, index) => [id, index])
  );

  const brokers: Broker[] = (brokersData ?? []).sort(
    (a, b) =>
      (brokerOrderMap.get(a.id) ?? 999) -
      (brokerOrderMap.get(b.id) ?? 999)
  );

  let accountsData: BrokerAccount[] = [];

  if (FEATURED_BROKER_IDS.length) {
    const { data: fetchedAccounts, error: accountsError } = await supabase
      .from("broker_accounts")
      .select(
        "broker_id, account_name, spread, commission, commission_en, min_deposit, min_deposit_en, execution_type, best_for, best_for_en, is_islamic_available, sort_order"
      )
      .in("broker_id", TABLE_BROKER_IDS)
      .order("sort_order", { ascending: true });

    if (accountsError) {
      console.error("Accounts error:", accountsError);
    }

    accountsData = (fetchedAccounts as BrokerAccount[] | null) ?? [];
  }

  const beginnerRows: BeginnerBrokerRow[] = brokers.map((broker) => {
    const account =
      accountsData.find(
        (item) =>
          item.broker_id === broker.id &&
          (item.account_name?.toLowerCase().includes("standard") ||
            item.best_for_en?.toLowerCase().includes("beginner"))
      ) ||
      accountsData.find((item) => item.broker_id === broker.id) ||
      null;

    return {
      broker,
      account,
    };
  });

  const tableRows: BeginnerBrokerRow[] = tableBrokers.map((broker) => {
  const account =
    accountsData.find(
      (item) =>
        item.broker_id === broker.id &&
        (item.account_name?.toLowerCase().includes("standard") ||
          item.best_for_en?.toLowerCase().includes("beginner"))
    ) ||
    accountsData.find((item) => item.broker_id === broker.id) ||
    null;

  return {
    broker,
    account,
  };
});

  return (
    <main className="bg-[#f5f7fb]" dir="ltr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id":
                  "https://brokeralarab.com/en/learn-trading/how-to-start-trading-from-zero#article",
                headline:
                  "How to Start Trading from Zero: Step-by-Step Beginner Guide",
                datePublished: "2026-03-23",
                dateModified: "2026-03-23",
                description:
                  "A beginner-friendly trading guide covering market basics, demo accounts, broker selection, leverage, risk management, and common mistakes.",
                inLanguage: "en",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id":
                    "https://brokeralarab.com/en/learn-trading/how-to-start-trading-from-zero",
                },
                author: {
                  "@type": "Organization",
                  name: "Broker Al Arab",
                  url: "https://brokeralarab.com",
                },
                publisher: {
                  "@type": "Organization",
                  name: "Broker Al Arab",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://brokeralarab.com/logo.png",
                  },
                },
                image: [
                  "https://brokeralarab.com/articles/how-to-start-trading-from-zero.png",
                ],
              },
              {
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
                    name: "Learn Trading",
                    item: "https://brokeralarab.com/en/learn-trading",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "How to Start Trading from Zero",
                    item:
                      "https://brokeralarab.com/en/learn-trading/how-to-start-trading-from-zero",
                  },
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Start Trading from Zero",
                inLanguage: "en",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Understand what trading really means",
                    text:
                      "Start by learning how financial markets work, what brokers do, what prices represent, and why every trade carries risk.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Practice on a demo account",
                    text:
                      "Use a demo account to learn order execution, charts, spreads, stop loss, take profit, and platform navigation before using real money.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Choose a regulated broker",
                    text:
                      "Compare regulation, platforms, minimum deposit, fees, spreads, withdrawals, and account types before opening a live account.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Start small and manage risk",
                    text:
                      "Begin with a small deposit and risk only a small percentage of your account on each trade while you build discipline.",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Can I start trading from zero with no experience?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "Yes. Beginners can start trading from zero by learning the basics first, practicing on a demo account, and avoiding large real-money risk at the beginning.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much money should a beginner start trading with?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "Many beginners start with a small amount such as $50 to $200, but the most important point is to risk only money you can afford to lose while learning.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is forex trading suitable for beginners?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "Forex can be accessible for beginners because it is widely available through online brokers, but it still carries high risk, especially when leverage is used incorrectly.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <section className="mx-auto max-w-7xl px-4 pb-4 pt-5 md:px-6 md:pb-6 md:pt-8">
        <div className="mx-auto max-w-7xl">
          <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="hidden md:block">
              <div className="border-b border-slate-200 px-5 py-5 md:px-8 md:py-6">
                <h1 className="text-[30px] font-black leading-[1.18] text-slate-950 md:text-[44px]">
                  How to Start Trading from Zero: Step-by-Step Beginner Guide
                </h1>

                <div className="mt-3 flex items-center gap-3 text-[13px] text-slate-500">
                  <span>📅 March 23, 2026</span>
                  <span>•</span>
                  <span>Last updated: March 23, 2026</span>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="w-full text-[16px] leading-8 text-slate-600 md:text-[18px] md:leading-9">
                    If you are asking how to start trading from zero, the best
                    answer is not “open an account and buy something.” Trading
                    starts with understanding markets, risk, platforms, order
                    types, spreads, and how brokers work before you risk real
                    money.
                  </p>

                  <p className="w-full text-[16px] leading-8 text-slate-700 md:text-[18px] md:leading-9">
                    This guide is written for complete beginners. It explains
                    the practical path from learning the basics to using a demo
                    account, comparing{" "}
                    <Link
                      href="/en/best-brokers"
                      className="font-black text-blue-700 hover:underline"
                    >
                      regulated trading brokers
                    </Link>
                    , and building a simple risk plan before your first live
                    trade.
                  </p>
                </div>
              </div>

              <div className="px-5 pt-5 md:px-8 md:pt-8">
                <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                  <div className="relative aspect-[16/8] w-full">
                    <Image
                      src={
                        article.cover_image ||
                        "/articles/how-to-start-trading-from-zero.jpg"
                      }
                      alt="How to start trading from zero beginner guide"
                      fill
                      className="object-cover scale-[1.02]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

                        <div className="md:hidden px-4 pt-4 space-y-4">
              <h1 className="text-[24px] font-black leading-[1.35] text-slate-900">
                How to Start Trading from Zero
              </h1>

              <div className="bg-white rounded-[20px] p-[14px] shadow-sm border border-slate-200">
                <div className="relative h-[160px] w-full overflow-hidden rounded-[14px]">
                  <Image
                    src={
                      article.cover_image ||
                      "/articles/how-to-start-trading-from-zero.jpg"
                    }
                    alt="How to start trading from zero beginner guide"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 w-full text-[15px] leading-7 text-slate-600">
                  Starting trading from zero does not mean rushing to open a
                  live account. It means learning how markets work, practicing
                  safely, understanding risk, and choosing a broker only after
                  you know what to compare.
                </p>

                <p className="mt-2 text-[13px] leading-7 text-slate-600 font-medium">
                  This guide gives you a practical beginner roadmap before your
                  first real trade.
                </p>
              </div>
            </div>

            <div className="px-5 py-6 md:px-8 md:py-8">
              <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7ff_100%)] px-5 pt-4 pb-6 md:px-6">
                  <div className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black text-amber-700">
                    Learn first, trade later
                  </div>

                  <h2 className="text-[24px] font-black leading-[1.3] text-slate-950 md:text-[30px]">
                    What does it really mean to start trading from zero?
                  </h2>

                  <p className="mt-3 text-[16px] leading-8 text-slate-700 md:text-[15px]">
                    Starting from zero means you do not yet have a tested
                    process. You may have heard about forex, stocks, gold,
                    crypto, MetaTrader, leverage, or quick profits — but you
                    still need to understand what happens behind every trade.
                    The first stage is not about finding a magic signal. It is
                    about learning the rules of the game before putting real
                    money at risk.
                  </p>
                </div>

                <div className="p-4 md:p-5">
                  <div className="grid gap-4 md:grid-cols-3">
                    <StepCard
                      number="01"
                      label="Foundation"
                      title="Understand the market"
                      text="Learn what you are trading, why prices move, what spreads are, how leverage works, and why every trade can either make or lose money."
                      note="A beginner who understands risk is already ahead of someone chasing random signals."
                    />

                    <StepCard
                      number="02"
                      label="Practice"
                      title="Use a demo account"
                      text="A demo account helps you learn the platform, test order types, place stop loss and take profit, and understand how charts move without risking real money."
                      note="Demo is not about proving you are rich. It is about learning execution without pressure."
                    />

                    <StepCard
                      number="03"
                      label="Execution"
                      title="Start small"
                      text="When you move to a live account, start with a small deposit, small position size, and a simple plan that tells you when to enter, exit, and stop."
                      note="The first goal is not fast profit. The first goal is staying in the game."
                    />
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <SectionTitle
                  eyebrow="Trading basics"
                  title="The first concepts every beginner should understand"
                  description="Before comparing brokers or opening an account, make sure you understand the basic building blocks of trading. These concepts will appear everywhere once you start using a trading platform."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <InfoCard
                    title="What is trading?"
                    text="Trading means buying or selling financial instruments with the goal of benefiting from price movement. You are not simply clicking buy and sell; you are making decisions based on price, timing, risk, and probability."
                  />

                  <InfoCard
                    title="What is a broker?"
                    text="A broker is the company that gives you access to markets and trading platforms. A good broker should offer clear fees, reliable platforms, transparent withdrawals, and regulation from known authorities."
                  />

                  <InfoCard
                    title="What is spread?"
                    text="Spread is the difference between the buy price and the sell price. It is one of the main trading costs, especially for short-term traders who open and close positions frequently."
                  />

                  <InfoCard
                    title="What is leverage?"
                    text="Leverage allows you to control a larger position with a smaller amount of capital. It can increase potential profit, but it can also increase losses quickly if it is used without risk management."
                  />
                </div>
              </section>

              <section className="mt-8">
                <SectionTitle
                  eyebrow="Beginner roadmap"
                  title="A practical step-by-step plan before your first live trade"
                  description="Use this roadmap as a simple checklist. Do not skip the early steps just because opening an account looks easy."
                />

                <div className="space-y-4">
                  <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-[20px] font-black text-slate-950">
                      1. Choose one market to learn first
                    </h3>
                    <p className="mt-2 text-[15px] leading-8 text-slate-600">
                      Beginners often jump between forex, gold, stocks, indices,
                      and crypto without understanding any of them properly.
                      Choose one market first. Forex is popular because it is
                      widely available, but that does not mean it is risk-free.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-[20px] font-black text-slate-950">
                      2. Learn how orders work
                    </h3>
                    <p className="mt-2 text-[15px] leading-8 text-slate-600">
                      Understand market orders, limit orders, stop loss, take
                      profit, lot size, margin, and how your platform calculates
                      profit or loss. These are not advanced topics; they are
                      survival basics.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-[20px] font-black text-slate-950">
                      3. Practice on demo for real reasons
                    </h3>
                    <p className="mt-2 text-[15px] leading-8 text-slate-600">
                      Use demo to learn the platform, not to gamble with fake
                      money. Your goal is to understand execution, spreads,
                      chart movement, and how it feels to follow a plan.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-[20px] font-black text-slate-950">
                      4. Compare brokers before depositing
                    </h3>
                    <p className="mt-2 text-[15px] leading-8 text-slate-600">
                      Broker choice affects your trading costs, execution,
                      withdrawal experience, platform stability, and account
                      conditions. Do not choose a broker only because of an ad
                      or a bonus.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-[20px] font-black text-slate-950">
                      5. Start with low risk
                    </h3>
                    <p className="mt-2 text-[15px] leading-8 text-slate-600">
                      A beginner should protect capital first. If you start with
                      a small balance, keep your trade size small as well. Do
                      not let one trade decide the future of your account.
                    </p>
                  </div>
                </div>
              </section>

                            <section className="mt-8">
                <SectionTitle
                  eyebrow="Risk management"
                  title="How much should a beginner risk?"
                  description="Risk management is the difference between learning slowly and losing the account quickly. Your goal at the beginning is survival, not fast profit."
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <BulletBox
                    title="A safer beginner mindset"
                    tone="green"
                    items={[
                      "Start with money you can afford to lose.",
                      "Risk a small percentage per trade.",
                      "Use stop loss before entering the trade.",
                      "Avoid increasing lot size after a loss.",
                    ]}
                  />

                  <BulletBox
                    title="What to avoid"
                    tone="red"
                    items={[
                      "Trading with borrowed money.",
                      "Using high leverage without understanding it.",
                      "Entering trades because of social media hype.",
                      "Opening many trades at the same time.",
                    ]}
                  />

                  <BulletBox
                    title="Simple example"
                    tone="blue"
                    items={[
                      "If your account is $500, risking 1% means $5 per trade.",
                      "This gives you room to learn without emotional pressure.",
                      "Small risk helps you survive normal losing streaks.",
                    ]}
                  />
                </div>
              </section>

              <section className="mt-8 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                <SectionTitle
                  eyebrow="Broker selection"
                  title="Where broker comparison fits into the learning process"
                  description="The main purpose of this page is education, but once you understand the basics, comparing brokers becomes the next practical step."
                />

                <div className="grid gap-4 md:grid-cols-3">
                  {beginnerRows.map((row, index) => (
                    <BrokerEducationCard
                      key={row.broker.id}
                      row={row}
                      badge={
                        index === 0
                          ? "Strong overall option"
                          : index === 1
                            ? "Popular beginner choice"
                            : "Advanced platform choice"
                      }
                    />
                  ))}
                </div>

                <div className="mt-6">
                  <BeginnerBrokerTable rows={tableRows} />
                </div>
              </section>

              <section className="mt-8">
                <SectionTitle
                  eyebrow="Beginner mistakes"
                  title="Common mistakes to avoid when starting from zero"
                  description="Most beginner mistakes are not technical. They are usually caused by rushing, overconfidence, weak risk control, or choosing a broker without understanding the conditions."
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <InfoCard
                    title="Trading before learning the platform"
                    text="Many beginners deposit money before they know how to place orders, adjust lot size, use stop loss, or close trades correctly. This creates unnecessary risk."
                  />

                  <InfoCard
                    title="Using leverage like free money"
                    text="Leverage is not free capital. It increases market exposure. A small price move can create a large result when leverage is used aggressively."
                  />

                  <InfoCard
                    title="Copying random signals"
                    text="Signals may look attractive, but copying trades without understanding risk, entry logic, stop loss, and position size can damage your account quickly."
                  />
                </div>
              </section>

              <section className="mt-8 rounded-[26px] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm md:p-6">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                  <div>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-black text-blue-100">
                      Broker Al Arab Learning Guide
                    </span>

                    <h2 className="mt-3 text-[26px] font-black leading-[1.25] md:text-[34px]">
                      Ready to move from learning to comparing brokers?
                    </h2>

                    <p className="mt-3 text-[15px] leading-8 text-slate-300">
                      After you understand the basics of trading, compare
                      brokers based on regulation, platforms, spreads, minimum
                      deposit, account types, and withdrawal conditions before
                      opening a real account.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                      <Link
                        href="/en/best-brokers"
                        className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#16a34a_0%,#22c55e_100%)] px-6 py-3.5 text-sm font-black text-white transition hover:opacity-95"
                      >
                        Compare Top Brokers
                      </Link>

                      <Link
                        href="/en/compare"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white px-6 py-3.5 text-sm font-black text-slate-900 transition hover:bg-slate-50"
                      >
                        Open Broker Comparison
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-8 rounded-[26px] border border-blue-100 bg-blue-50/70 p-5 md:p-6">
                <h2 className="text-[24px] font-black leading-[1.3] text-slate-950 md:text-[30px]">
                  Final takeaway: the right way to start trading from zero
                </h2>

                <p className="mt-3 text-[16px] leading-8 text-slate-700">
                  The right way to start trading from zero is to move slowly and
                  build a process. Learn the basic terms, understand how markets
                  move, practice with a demo account, compare brokers carefully,
                  and only then start with a small live account. Trading is not
                  about proving yourself in one week. It is about protecting your
                  capital while improving your decision-making over time.
                </p>

                <p className="mt-3 text-[16px] leading-8 text-slate-700">
                  For beginners, the most important rule is simple: do not risk
                  money before you understand what can go wrong. Once you know
                  how spreads, leverage, order types, platforms, and broker
                  conditions work, you can approach trading with more structure
                  and less emotion.
                </p>
              </section>

              <section className="mt-8 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                <h2 className="text-[24px] font-black leading-[1.3] text-slate-950 md:text-[30px]">
                  Frequently Asked Questions
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-[17px] font-black text-slate-950">
                      Can I start trading from zero with no experience?
                    </h3>

                    <p className="mt-2 text-[15px] leading-7 text-slate-600">
                      Yes. You can start from zero by learning the basics,
                      practicing on a demo account, and avoiding large real-money
                      risk in the beginning. The key is to treat trading as a
                      skill, not as a quick way to make money.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-[17px] font-black text-slate-950">
                      How much money should I start trading with?
                    </h3>

                    <p className="mt-2 text-[15px] leading-7 text-slate-600">
                      Many beginners start with a small amount such as $50 to
                      $200, but the best amount depends on your financial
                      situation. Only use money you can afford to lose while
                      learning.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-[17px] font-black text-slate-950">
                      Should I use a demo account first?
                    </h3>

                    <p className="mt-2 text-[15px] leading-7 text-slate-600">
                      Yes. A demo account helps you understand the platform,
                      order types, spreads, stop loss, take profit, and chart
                      movement without risking real money.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-[17px] font-black text-slate-950">
                      What should I compare before choosing a broker?
                    </h3>

                    <p className="mt-2 text-[15px] leading-7 text-slate-600">
                      Compare regulation, trading platforms, spreads,
                      commissions, minimum deposit, account types, withdrawal
                      conditions, and whether the broker clearly explains its
                      fees.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}