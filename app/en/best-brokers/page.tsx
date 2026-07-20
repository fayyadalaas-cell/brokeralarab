import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import CountryBrokerRedirect from "@/app/components/CountryBrokerRedirect";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Best Forex Brokers in 2026 | Independent Broker Comparison",
  description:
    "Compare the best forex brokers in 2026 by regulation, minimum deposit, trading platforms, fees, account access and overall broker quality. Review independently researched broker rankings for international traders.",
  alternates: {
    canonical: "https://brokeralarab.com/en/best-brokers",
    languages: {
      en: "https://brokeralarab.com/en/best-brokers",
      ar: "https://brokeralarab.com/best-brokers",
      "x-default": "https://brokeralarab.com/en/best-brokers",
    },
  },
  openGraph: {
    title: "Best Forex Brokers in 2026 | Broker Alarab",
    description:
      "Compare leading forex brokers by regulation, platforms, minimum deposit, account access and overall trading conditions.",
    url: "https://brokeralarab.com/en/best-brokers",
    siteName: "Broker Alarab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 820,
        alt: "Best forex brokers in 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Forex Brokers in 2026",
    description:
      "Independent comparison of leading forex brokers for international traders.",
    images: ["https://brokeralarab.com/og-image.png"],
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
};

type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string | null;
  rating: number | string | null;
  min_deposit: number | null;
  best_for: string | null;
  best_for_en: string | null;
  regulation: string | null;
  regulation_short: string | null;
  platforms: string | null;
  logo: string | null;
  real_account_url: string | null;
  demo_account_url: string | null;
  score_safety: number | null;
};

type BrokerLicense = {
  id: number;
  broker_id: number;
  regulator_code: string | null;
  is_active: boolean | null;
};

type BrokerAccount = {
  id: number;
  broker_id: number;
  account_name: string | null;
  min_deposit: string | null;
};

type ComparisonRow = {
  id: number;
  slug: string;
  title: string | null;
  broker_1_id: number;
  broker_2_id: number;
  views_count: number | null;
};

type PreparedBroker = Broker & {
  licenses: BrokerLicense[];
  accounts: BrokerAccount[];
  active_license_count: number;
  lowest_account_deposit: number | null;
};

type RegulatorSummary = {
  code: string;
  brokerCount: number;
};

type UseCasePick = {
  title: string;
  shortTitle: string;
  description: string;
  broker: PreparedBroker;
};

const SITE_URL = "https://brokeralarab.com";

function cleanText(
  value: string | null | undefined,
  fallback = "Not specified"
) {
  return value?.trim() || fallback;
}

function numberValue(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function ratingValue(
  value: number | string | null | undefined
) {
  return numberValue(value);
}

function ratingLabel(
  value: number | string | null | undefined
) {
  const rating = ratingValue(value);
  return rating > 0 ? rating.toFixed(1) : "—";
}

function brokerName(broker: Broker) {
  return cleanText(
    broker.name_en || broker.name,
    "Trading broker"
  );
}

function brokerBestFor(broker: Broker) {
  return cleanText(
    broker.best_for_en,
    "General trading needs"
  );
}

function formatDeposit(
  value: number | null | undefined
) {
  if (value === null || value === undefined) {
    return "Not specified";
  }

  return `$${value.toLocaleString("en-US")}`;
}

function parseDeposit(
  value: string | null | undefined
) {
  if (!value) return null;

  const parsed = Number(
    value.replace(/[^\d.]/g, "")
  );

  return Number.isFinite(parsed) ? parsed : null;
}

function getLowestAccountDeposit(
  accounts: BrokerAccount[]
) {
  const deposits = accounts
    .map((account) =>
      parseDeposit(account.min_deposit)
    )
    .filter(
      (value): value is number =>
        value !== null
    );

  return deposits.length
    ? Math.min(...deposits)
    : null;
}

function getDisplayDeposit(
  broker: PreparedBroker
) {
  const deposits = [
    broker.min_deposit,
    broker.lowest_account_deposit,
  ].filter(
    (value): value is number =>
      value !== null &&
      value !== undefined
  );

  return deposits.length
    ? Math.min(...deposits)
    : null;
}

function splitItems(
  value: string | null | undefined,
  limit = 3
) {
  if (!value) return [];

  return value
    .split(/[,|،/]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function buildUniqueUseCases(
  brokers: PreparedBroker[]
): UseCasePick[] {
  const used = new Set<number>();

  const byRating = [...brokers].sort(
    (a, b) =>
      ratingValue(b.rating) -
      ratingValue(a.rating)
  );

  const bySafety = [...brokers].sort(
    (a, b) =>
      numberValue(
        b.score_safety,
        ratingValue(b.rating)
      ) -
      numberValue(
        a.score_safety,
        ratingValue(a.rating)
      )
  );

  const byDeposit = [...brokers].sort(
    (a, b) => {
      const depositA =
        getDisplayDeposit(a) ?? 999999;

      const depositB =
        getDisplayDeposit(b) ?? 999999;

      if (depositA !== depositB) {
        return depositA - depositB;
      }

      return (
        ratingValue(b.rating) -
        ratingValue(a.rating)
      );
    }
  );

  const beginnerCandidates =
    byRating.filter((broker) => {
      const bestFor = `${broker.best_for || ""} ${
        broker.best_for_en || ""
      }`.toLowerCase();

      const deposit =
        getDisplayDeposit(broker);

      return (
        bestFor.includes("beginner") ||
        bestFor.includes("new trader") ||
        (deposit !== null && deposit <= 50)
      );
    });

  const platformCandidates =
    byRating.filter((broker) => {
      const platforms = (
        broker.platforms || ""
      ).toLowerCase();

      return (
        platforms.includes("mt4") &&
        platforms.includes("mt5")
      );
    });

  const advancedCandidates =
    byRating.filter((broker) => {
      const text = `${broker.best_for || ""} ${
        broker.best_for_en || ""
      } ${broker.platforms || ""}`.toLowerCase();

      return (
        text.includes("advanced") ||
        text.includes("professional") ||
        text.includes("active trader") ||
        text.includes("ctrader") ||
        text.includes("tradingview")
      );
    });

  function pick(
    candidates: PreparedBroker[],
    fallback = byRating
  ) {
    const broker =
      candidates.find(
        (item) => !used.has(item.id)
      ) ||
      fallback.find(
        (item) => !used.has(item.id)
      );

    if (broker) {
      used.add(broker.id);
    }

    return broker;
  }

  const rawPicks = [
    {
      title: "Best Overall Forex Broker",
      shortTitle: "Best Overall",
      description:
        "A strong all-round option based on regulation, platform access, account conditions and overall rating.",
      broker: pick(byRating),
    },
    {
      title: "Best Broker for Beginners",
      shortTitle: "Beginners",
      description:
        "A practical option for newer traders looking for accessible account requirements and a straightforward trading experience.",
      broker: pick(beginnerCandidates),
    },
    {
      title: "Best Low-Deposit Broker",
      shortTitle: "Low Deposit",
      description:
        "One of the most accessible options for traders who want to start with a lower initial deposit.",
      broker: pick(byDeposit),
    },
    {
      title: "Best Broker for Platform Choice",
      shortTitle: "Platforms",
      description:
        "A suitable choice for traders who value access to widely used trading platforms and flexible account tools.",
      broker: pick(platformCandidates),
    },
    {
      title: "Best Broker for Active Traders",
      shortTitle: "Active Traders",
      description:
        "A stronger fit for experienced traders who need advanced platforms, tools and broader trading functionality.",
      broker: pick(advancedCandidates),
    },
    {
      title: "Strongest Regulatory Profile",
      shortTitle: "Regulation",
      description:
        "A leading option based on active licences, regulatory coverage and the available safety score.",
      broker: pick(bySafety),
    },
  ];

  return rawPicks.filter(
    (
      item
    ): item is {
      title: string;
      shortTitle: string;
      description: string;
      broker: PreparedBroker;
    } => Boolean(item.broker)
  );
}

function BrokerLogo({
  broker,
  size = "normal",
}: {
  broker: Pick<
    Broker,
    "name" | "name_en" | "logo"
  >;
  size?: "small" | "normal" | "large";
}) {
  const wrapperClasses = {
    small: "h-10 w-10 rounded-xl",
    normal: "h-14 w-14 rounded-2xl",
    large:
      "h-[72px] w-[72px] rounded-[20px]",
  };

  const imageClasses = {
    small: "h-7 w-7",
    normal: "h-10 w-10",
    large: "h-[52px] w-[52px]",
  };

  const displayName = cleanText(
    broker.name_en || broker.name,
    "Trading broker"
  );

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white shadow-sm ${wrapperClasses[size]}`}
    >
      {broker.logo ? (
        <div
          className={`relative ${imageClasses[size]}`}
        >
          <Image
            src={broker.logo}
            alt={`${displayName} logo`}
            fill
            sizes={
              size === "large"
                ? "52px"
                : size === "normal"
                  ? "40px"
                  : "28px"
            }
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-[8px] font-black text-slate-400">
          LOGO
        </span>
      )}
    </div>
  );
}

function RatingBadge({
  rating,
}: {
  rating: number | string | null;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-700">
      <span>★</span>
      <span>{ratingLabel(rating)}</span>
      <span className="opacity-60">/ 5</span>
    </span>
  );
}

function BrokerButtons({
  broker,
  compact = false,
}: {
  broker: PreparedBroker;
  compact?: boolean;
}) {
  const buttonClasses = compact
    ? "min-h-10 px-3 py-2 text-[11px]"
    : "min-h-11 px-4 py-2.5 text-xs";

  return (
    <div className="flex w-full items-stretch gap-2">
      <Link
        href={
          broker.slug
            ? `/en/brokers/${broker.slug}`
            : "/en/brokers"
        }
        className={`inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white font-black text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 ${buttonClasses}`}
      >
        Read Review
      </Link>

      {broker.real_account_url &&
      broker.slug ? (
        <a
          href={`/go/${broker.slug}?type=real`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`inline-flex flex-1 items-center justify-center rounded-xl bg-brand-500 font-black text-white shadow-sm transition hover:bg-brand-600 ${buttonClasses}`}
        >
          Open Account
        </a>
      ) : null}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[1040px]">
      <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
        {eyebrow}
      </span>

      <h2 className="mt-3 max-w-[820px] text-[25px] font-black leading-[1.25] tracking-tight text-slate-950 min-[380px]:text-[27px] sm:text-[38px] lg:text-[42px]">
        {title}
      </h2>

      <p className="mt-2.5 max-w-[920px] text-[13px] font-medium leading-7 text-slate-700 min-[380px]:text-[14px] sm:mt-3 sm:text-[17px] sm:leading-9">
        {description}
      </p>
    </div>
  );
}

export default async function BestBrokersPage() {
  const supabase = await createClient();

  const [
    brokersResult,
    licensesResult,
    accountsResult,
    comparisonsResult,
  ] = await Promise.all([
    supabase
      .from("brokers")
      .select(`
        id,
        name,
        name_en,
        slug,
        rating,
        min_deposit,
        best_for,
        best_for_en,
        regulation,
        regulation_short,
        platforms,
        logo,
        real_account_url,
        demo_account_url,
        score_safety
      `)
      .order("rating", {
        ascending: false,
      }),

    supabase
      .from("broker_licenses")
      .select(`
        id,
        broker_id,
        regulator_code,
        is_active
      `)
      .eq("is_active", true),

    supabase
      .from("broker_accounts")
      .select(`
        id,
        broker_id,
        account_name,
        min_deposit
      `),

    supabase
      .from("comparisons")
      .select(`
        id,
        slug,
        title,
        broker_1_id,
        broker_2_id,
        views_count
      `)
      .order("views_count", {
        ascending: false,
      })
      .limit(6),
  ]);

  if (brokersResult.error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-[1520px] rounded-3xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-2xl font-black text-slate-950">
            Broker data could not be loaded
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            {brokersResult.error.message}
          </p>
        </div>
      </main>
    );
  }

  const brokersData =
    (brokersResult.data || []) as Broker[];

  const licenses =
    (licensesResult.data ||
      []) as BrokerLicense[];

  const accounts =
    (accountsResult.data ||
      []) as BrokerAccount[];

  const comparisons =
    (comparisonsResult.data ||
      []) as ComparisonRow[];

  const licensesByBroker =
    new Map<number, BrokerLicense[]>();

  const accountsByBroker =
    new Map<number, BrokerAccount[]>();

  licenses.forEach((license) => {
    const current =
      licensesByBroker.get(
        license.broker_id
      ) || [];

    current.push(license);

    licensesByBroker.set(
      license.broker_id,
      current
    );
  });

  accounts.forEach((account) => {
    const current =
      accountsByBroker.get(
        account.broker_id
      ) || [];

    current.push(account);

    accountsByBroker.set(
      account.broker_id,
      current
    );
  });

  const brokers: PreparedBroker[] =
    brokersData.map((broker) => {
      const brokerLicenses =
        licensesByBroker.get(broker.id) ||
        [];

      const brokerAccounts =
        accountsByBroker.get(broker.id) ||
        [];

      return {
        ...broker,
        licenses: brokerLicenses,
        accounts: brokerAccounts,
        active_license_count:
          brokerLicenses.length,
        lowest_account_deposit:
          getLowestAccountDeposit(
            brokerAccounts
          ),
      };
    });

  const sortedBrokers = [...brokers].sort(
    (a, b) =>
      ratingValue(b.rating) -
      ratingValue(a.rating)
  );

  const topTen =
    sortedBrokers.slice(0, 10);

  const topThree =
    topTen.slice(0, 3);

  const topBroker = topTen[0];

  const useCasePicks =
    buildUniqueUseCases(sortedBrokers);

  const regulatorMap =
    new Map<string, RegulatorSummary>();

  licenses.forEach((license) => {
    const code = cleanText(
      license.regulator_code,
      ""
    ).toUpperCase();

    if (!code) return;

    const current =
      regulatorMap.get(code);

    if (current) {
      current.brokerCount += 1;
      return;
    }

    regulatorMap.set(code, {
      code,
      brokerCount: 1,
    });
  });

  const uniqueRegulatorCount =
    regulatorMap.size;

  const regulatorSummaries =
    Array.from(regulatorMap.values())
      .sort(
        (a, b) =>
          b.brokerCount -
          a.brokerCount
      )
      .slice(0, 8);

  const brokerById = new Map(
    brokers.map((broker) => [
      broker.id,
      broker,
    ])
  );

  const preparedComparisons =
    comparisons
      .map((comparison) => ({
        ...comparison,
        broker1: brokerById.get(
          comparison.broker_1_id
        ),
        broker2: brokerById.get(
          comparison.broker_2_id
        ),
      }))
      .filter(
        (
          comparison
        ): comparison is ComparisonRow & {
          broker1: PreparedBroker;
          broker2: PreparedBroker;
        } =>
          Boolean(
            comparison.broker1 &&
              comparison.broker2
          )
      );

  const activeLicenseCount =
    licenses.length;

  const lowDepositBrokerCount =
    brokers.filter((broker) => {
      const deposit =
        getDisplayDeposit(broker);

      return (
        deposit !== null &&
        deposit <= 100
      );
    }).length;

  const multiPlatformBrokerCount =
    brokers.filter(
      (broker) =>
        splitItems(
          broker.platforms,
          10
        ).length >= 2
    ).length;

  const faqItems = [
    {
      question:
        "What is the best forex broker in 2026?",
      answer:
        "There is no single best broker for every trader. The right choice depends on regulation, trading costs, platforms, minimum deposit, available markets and the legal entity serving your country.",
    },
    {
      question:
        "How do I verify that a forex broker is regulated?",
      answer:
        "Check the broker’s legal entity name and licence number directly in the regulator’s official register. Do not rely only on regulatory logos displayed on a broker website.",
    },
    {
      question:
        "Do forex brokers offer the same conditions in every country?",
      answer:
        "No. The legal entity, leverage limits, payment methods, investor protections and account features may vary by jurisdiction and country of residence.",
    },
    {
      question:
        "Should I choose a broker based on the lowest spread?",
      answer:
        "Low spreads matter, but they should be considered alongside commissions, execution quality, overnight charges, withdrawal fees and regulation.",
    },
    {
      question:
        "What should beginners check before opening an account?",
      answer:
        "Beginners should prioritise strong regulation, transparent pricing, a suitable minimum deposit, an easy-to-use platform, responsive support and reliable withdrawals.",
    },
  ];

  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Best Forex Brokers in 2026",
      url: `${SITE_URL}/en/best-brokers`,
      description:
        "Independent comparison of leading forex brokers by regulation, rating, minimum deposit, platforms and account access.",
      inLanguage: "en",
      datePublished: "2026-03-01",
      dateModified: "2026-07-20",
      author: {
        "@type": "Organization",
        name: "Broker Alarab Editorial Team",
        url: `${SITE_URL}/en/about`,
      },
      isPartOf: {
        "@type": "WebSite",
        name: "Broker Alarab",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/en`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Best Forex Brokers",
          item: `${SITE_URL}/en/best-brokers`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best Forex Brokers in 2026",
      numberOfItems: topTen.length,
      itemListElement: topTen.map(
        (broker, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: brokerName(broker),
          url: broker.slug
            ? `${SITE_URL}/en/brokers/${broker.slug}`
            : `${SITE_URL}/en/best-brokers`,
        })
      ),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(
        (item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })
      ),
    },
  ];

  return (
    <main
      dir="ltr"
      className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-900"
    >
      <Script
        id="best-brokers-en-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaData
          ),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,91,184,0.10),transparent_32%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.05),transparent_26%)]" />

        <div className="relative mx-auto max-w-[1520px] px-4 pb-7 pt-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.3fr)_390px] lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[9px] font-black text-brand-600 sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Independently reviewed — Updated July 2026
              </span>

              <h1 className="mt-4 max-w-[900px] text-[31px] font-black leading-[1.12] tracking-tight text-slate-950 min-[380px]:text-[34px] sm:text-5xl lg:text-[58px]">
                Best Forex Brokers
                <span className="block text-brand-500">
                  in 2026
                </span>
              </h1>

              <p className="mt-4 max-w-[900px] text-[13px] font-medium leading-7 text-slate-700 min-[380px]:text-sm sm:text-base sm:leading-8">
                Compare{" "}
                <strong className="font-black text-slate-950">
                  {brokers.length} forex and CFD brokers
                </strong>{" "}
                by regulation, minimum deposit, trading platforms,
                account access and overall broker quality. Use our
                research to shortlist brokers that fit your market,
                experience and trading priorities.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-bold text-slate-600 sm:text-[11px]">
                <span>
                  Researched by the Broker Alarab Editorial Team
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <Link
                  href="/en/how-we-review"
                  className="font-black text-brand-600 transition hover:underline"
                >
                  Review our methodology
                </Link>
              </div>

              <div className="mt-5 grid max-w-[690px] grid-cols-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {[
                  {
                    value: brokers.length,
                    label: "Brokers",
                  },
                  {
                    value: activeLicenseCount,
                    label: "Licences",
                  },
                  {
                    value: accounts.length,
                    label: "Accounts",
                  },
                  {
                    value: uniqueRegulatorCount,
                    label: "Regulators",
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`px-1 py-3 text-center sm:px-2 ${
                      index !== 3
                        ? "border-r border-slate-200"
                        : ""
                    }`}
                  >
                    <div className="text-[18px] font-black text-slate-950 sm:text-2xl">
                      {item.value}
                    </div>

                    <div className="mt-0.5 text-[8px] font-bold text-slate-600 sm:text-xs">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-2.5 sm:flex">
                <a
                  href="#comparison-table"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-sm transition hover:bg-brand-600 sm:text-sm"
                >
                  Compare Top Brokers
                </a>

                <a
                  href="#broker-finder"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-[13px] font-black text-slate-800 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 sm:text-sm"
                >
                  Find a Suitable Broker
                </a>
              </div>
            </div>

            {topBroker ? (
              <article className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.08)] lg:block">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
                  <div>
                    <h2 className="text-sm font-black text-slate-950">
                      Best Overall Pick
                    </h2>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Based on rating, regulation and overall balance
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-black text-amber-800">
                    Ranked #1
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <BrokerLogo
                      broker={topBroker}
                      size="large"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-black text-slate-950">
                        {brokerName(topBroker)}
                      </h3>

                      <div className="mt-2">
                        <RatingBadge
                          rating={topBroker.rating}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="border-r border-slate-200 px-2 py-2.5 text-center">
                      <div className="text-[8px] text-slate-500">
                        Deposit
                      </div>

                      <div className="mt-1 text-xs font-black">
                        {formatDeposit(
                          getDisplayDeposit(topBroker)
                        )}
                      </div>
                    </div>

                    <div className="border-r border-slate-200 px-2 py-2.5 text-center">
                      <div className="text-[8px] text-slate-500">
                        Licences
                      </div>

                      <div className="mt-1 text-xs font-black">
                        {topBroker.active_license_count}
                      </div>
                    </div>

                    <div className="px-2 py-2.5 text-center">
                      <div className="text-[8px] text-slate-500">
                        Platforms
                      </div>

                      <div className="mt-1 truncate text-xs font-black">
                        {splitItems(
                          topBroker.platforms,
                          1
                        )[0] || "Review"}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-xs font-bold leading-6 text-slate-600">
                    Best suited to{" "}
                    {brokerBestFor(topBroker)}.
                  </p>

                  <div className="mt-4">
                    <BrokerButtons
                      broker={topBroker}
                    />
                  </div>
                </div>
              </article>
            ) : null}
          </div>

          {topBroker ? (
            <div className="mt-5 rounded-[18px] border border-slate-200 bg-slate-50 p-3 lg:hidden">
              <div className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3">
                <BrokerLogo
                  broker={topBroker}
                  size="small"
                />

                <div className="min-w-0">
                  <div className="text-[9px] font-black text-brand-600">
                    Best overall
                  </div>

                  <div className="mt-0.5 truncate text-sm font-black text-slate-950">
                    {brokerName(topBroker)}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <RatingBadge
                      rating={topBroker.rating}
                    />

                    <span className="text-[9px] font-bold text-slate-500">
                      {formatDeposit(
                        getDisplayDeposit(topBroker)
                      )}
                    </span>
                  </div>
                </div>

                <Link
                  href={
                    topBroker.slug
                      ? `/en/brokers/${topBroker.slug}`
                      : "/en/brokers"
                  }
                  className="rounded-xl bg-brand-500 px-3 py-2 text-[9px] font-black text-white"
                >
                  Review
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* INTERNAL NAVIGATION — DESKTOP */}
      <nav className="hidden border-b border-slate-200 bg-white md:block">
        <div className="mx-auto flex max-w-[1520px] flex-wrap gap-2 px-6 py-3 lg:px-8">
          {[
            ["#top-brokers", "Top Picks"],
            ["#comparison-table", "Comparison"],
            ["#broker-finder", "Broker Finder"],
            ["#categories", "By Trading Need"],
            ["#regulation", "Regulation"],
            ["#methodology", "Methodology"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[10px] font-black text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* COMPACT STATISTICS */}
      <section className="border-b border-slate-200 bg-[#f5f7fb]">
        <div className="mx-auto max-w-[1520px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {[
              {
                value: activeLicenseCount,
                title: "Active licences reviewed",
                text: "Across multiple regulatory jurisdictions",
              },
              {
                value: uniqueRegulatorCount,
                title: "Regulatory authorities",
                text: "Represented in our broker database",
              },
              {
                value: lowDepositBrokerCount,
                title: "Brokers from $100 or less",
                text: "Based on listed account requirements",
              },
              {
                value: multiPlatformBrokerCount,
                title: "Multi-platform brokers",
                text: "Offering at least two trading platforms",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[17px] border border-slate-200 bg-white px-4 py-3.5"
              >
                <div className="text-xl font-black text-slate-950">
                  {item.value}
                </div>

                <h2 className="mt-0.5 text-[10px] font-black text-slate-800 sm:text-xs">
                  {item.title}
                </h2>

                <p className="mt-1 hidden text-[9px] text-slate-500 sm:block">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
            {/* TOP THREE */}
      <section
        id="top-brokers"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-7 sm:py-10"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Highest-Rated Picks"
            title="Our Top 3 Forex Brokers for 2026"
            description="These brokers rank highest in our current comparison based on overall rating, regulatory coverage, platform access, account requirements and general suitability for international traders."
          />

          {/* MOBILE */}
          <div className="mt-5 space-y-3 lg:hidden">
            {topThree.map((broker, index) => {
              const licenseCodes = broker.licenses
                .map((license) =>
                  license.regulator_code?.trim()
                )
                .filter(
                  (code): code is string =>
                    Boolean(code)
                )
                .slice(0, 3);

              const platforms = splitItems(
                broker.platforms,
                2
              );

              return (
                <article
                  key={broker.id}
                  className={`overflow-hidden rounded-[20px] border bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)] ${
                    index === 0
                      ? "border-amber-300"
                      : "border-slate-200"
                  }`}
                >
                  <div
                    className={`h-1 ${
                      index === 0
                        ? "bg-amber-400"
                        : "bg-brand-500"
                    }`}
                  />

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                          index === 0
                            ? "bg-amber-100 text-amber-800"
                            : "bg-brand-50 text-brand-600"
                        }`}
                      >
                        {index === 0
                          ? "Best Overall"
                          : `Ranked #${index + 1}`}
                      </span>

                      <RatingBadge
                        rating={broker.rating}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-[58px_minmax(0,1fr)] items-center gap-3">
                      <BrokerLogo
                        broker={broker}
                        size="normal"
                      />

                      <div className="min-w-0">
                        <h3 className="text-[19px] font-black leading-7 text-slate-950">
                          {brokerName(broker)}
                        </h3>

                        <p className="mt-0.5 line-clamp-2 text-[11px] font-bold leading-5 text-slate-600">
                          Best for{" "}
                          {brokerBestFor(broker)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <div className="border-r border-slate-200 px-1 py-2.5 text-center">
                        <div className="text-[8px] font-bold text-slate-500">
                          Deposit
                        </div>

                        <div className="mt-1 text-[11px] font-black text-slate-950">
                          {formatDeposit(
                            getDisplayDeposit(broker)
                          )}
                        </div>
                      </div>

                      <div className="border-r border-slate-200 px-1 py-2.5 text-center">
                        <div className="text-[8px] font-bold text-slate-500">
                          Licences
                        </div>

                        <div className="mt-1 text-[11px] font-black text-slate-950">
                          {broker.active_license_count}
                        </div>
                      </div>

                      <div className="px-1 py-2.5 text-center">
                        <div className="text-[8px] font-bold text-slate-500">
                          Platforms
                        </div>

                        <div className="mt-1 truncate text-[10px] font-black text-slate-950">
                          {platforms[0] ||
                            "Review"}
                        </div>
                      </div>
                    </div>

                    {licenseCodes.length ? (
                      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                        {licenseCodes.map((code) => (
                          <span
                            key={`${broker.id}-${code}`}
                            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[8px] font-black text-slate-600"
                          >
                            {code.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-3">
                      <BrokerButtons
                        broker={broker}
                        compact
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* DESKTOP */}
          <div className="mt-7 hidden gap-5 lg:grid lg:grid-cols-3">
            {topThree.map((broker, index) => {
              const licenseCodes = broker.licenses
                .map((license) =>
                  license.regulator_code?.trim()
                )
                .filter(
                  (code): code is string =>
                    Boolean(code)
                )
                .slice(0, 4);

              const platforms = splitItems(
                broker.platforms,
                3
              );

              return (
                <article
                  key={broker.id}
                  className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_42px_rgba(15,23,42,0.09)]"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${
                      index === 0
                        ? "bg-amber-400"
                        : "bg-brand-500"
                    }`}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[11px] font-black ${
                        index === 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      {index === 0
                        ? "Best Overall"
                        : `Ranked #${index + 1}`}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
                      ★ {ratingLabel(broker.rating)} / 5
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <BrokerLogo
                      broker={broker}
                      size="large"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[24px] font-black text-slate-950">
                        {brokerName(broker)}
                      </h3>

                      <p className="mt-1.5 line-clamp-2 text-sm font-bold leading-6 text-slate-500">
                        Best for{" "}
                        {brokerBestFor(broker)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <div className="border-r border-slate-200 px-3 py-4 text-center">
                      <div className="text-[10px] font-bold text-slate-500">
                        Minimum Deposit
                      </div>

                      <div className="mt-1 text-sm font-black text-slate-950">
                        {formatDeposit(
                          getDisplayDeposit(broker)
                        )}
                      </div>
                    </div>

                    <div className="border-r border-slate-200 px-3 py-4 text-center">
                      <div className="text-[10px] font-bold text-slate-500">
                        Active Licences
                      </div>

                      <div className="mt-1 text-sm font-black text-slate-950">
                        {broker.active_license_count}
                      </div>
                    </div>

                    <div className="px-3 py-4 text-center">
                      <div className="text-[10px] font-bold text-slate-500">
                        Platforms
                      </div>

                      <div className="mt-1 truncate text-sm font-black text-slate-950">
                        {platforms[0] ||
                          "See review"}
                      </div>
                    </div>
                  </div>

                  {licenseCodes.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {licenseCodes.map((code) => (
                        <span
                          key={`${broker.id}-${code}`}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black text-slate-600"
                        >
                          {code.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-auto pt-5">
                    <BrokerButtons broker={broker} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOP TEN COMPARISON */}
      <section
        id="comparison-table"
        className="scroll-mt-24 border-b border-slate-200 bg-[#f5f7fb] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Main Broker Comparison"
            title="Compare the 10 Best Forex Brokers in 2026"
            description="Review overall ratings, minimum deposits, active licences and platform access. Open the full broker review before deciding which legal entity and account type are appropriate for your country."
          />

          {/* DESKTOP TABLE */}
          <div className="mt-7 hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.06)] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1240px] table-fixed text-left">
                <thead className="bg-[#071126] text-white">
                  <tr className="text-[13px] font-black tracking-wide">
                    <th className="w-[5%] px-4 py-4 text-center">
                      #
                    </th>

                    <th className="w-[26%] px-4 py-4">
                      Broker
                    </th>

                    <th className="w-[10%] px-4 py-4 text-center">
                      Rating
                    </th>

                    <th className="w-[9%] px-4 py-4 text-center">
                      Deposit
                    </th>

                    <th className="w-[22%] px-4 py-4 text-center">
                      Regulation
                    </th>

                    <th className="w-[17%] px-4 py-4 text-center">
                      Platforms
                    </th>

                    <th className="w-[11%] px-4 py-4 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {topTen.map((broker, index) => {
                    const licenseCodes = broker.licenses
                      .map((license) =>
                        license.regulator_code?.trim()
                      )
                      .filter(
                        (code): code is string =>
                          Boolean(code)
                      )
                      .slice(0, 5);

                    const platforms = splitItems(
                      broker.platforms,
                      3
                    );

                    return (
                      <tr
                        key={broker.id}
                        className={`border-t border-slate-200 transition hover:bg-brand-50/40 ${
                          index === 0
                            ? "bg-[linear-gradient(90deg,#eff6ff_0%,#ffffff_54%,#fff9e8_100%)]"
                            : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black ${
                              index === 0
                                ? "bg-amber-400 text-slate-950"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3.5">
                            <BrokerLogo
                              broker={broker}
                              size="small"
                            />

                            <div className="min-w-0">
                              <Link
                                href={
                                  broker.slug
                                    ? `/en/brokers/${broker.slug}`
                                    : "/en/brokers"
                                }
                                className="block truncate text-[15px] font-black text-slate-950 transition hover:text-brand-600"
                              >
                                {brokerName(broker)}
                              </Link>

                              <div className="mt-1 line-clamp-1 text-[11px] font-medium text-slate-500">
                                Best for{" "}
                                {brokerBestFor(broker)}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <RatingBadge
                            rating={broker.rating}
                          />
                        </td>

                        <td className="px-4 py-4 text-center">
                          <span className="text-[13px] font-black text-slate-950">
                            {formatDeposit(
                              getDisplayDeposit(broker)
                            )}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          {licenseCodes.length ? (
                            <div className="flex flex-wrap items-center justify-center gap-2">
                              {licenseCodes.map((code) => (
                                <span
                                  key={`${broker.id}-${code}`}
                                  className="inline-flex min-h-7 min-w-[48px] items-center justify-center rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[10px] font-black tracking-wide text-slate-700 shadow-sm"
                                >
                                  {code.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center">
                              <span className="text-[11px] font-bold text-slate-500">
                                {cleanText(
                                  broker.regulation_short,
                                  broker.regulation ||
                                    "Not specified"
                                )}
                              </span>
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {platforms.length ? (
                            <div className="flex flex-wrap items-center justify-center gap-2">
                              {platforms.map((platform) => (
                                <span
                                  key={`${broker.id}-${platform}`}
                                  className="inline-flex min-h-7 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 px-3 py-1.5 text-[10px] font-black text-slate-700"
                                >
                                  {platform}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center">
                              <span className="text-[11px] font-bold text-slate-500">
                                Not specified
                              </span>
                            </div>
                          )}
                        </td>

                        <td className="px-3 py-4">
                          <BrokerButtons
                            broker={broker}
                            compact
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE COMPACT LIST */}
          <div className="mt-5 space-y-2.5 lg:hidden">
            {topTen.slice(0, 5).map((broker, index) => (
              <details
                key={broker.id}
                className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.035)]"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[30px_42px_minmax(0,1fr)_auto] items-center gap-2.5 p-3.5">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black ${
                      index === 0
                        ? "bg-amber-400 text-slate-950"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <BrokerLogo
                    broker={broker}
                    size="small"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black text-slate-950">
                      {brokerName(broker)}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      <RatingBadge
                        rating={broker.rating}
                      />

                      <span className="truncate text-[9px] font-bold text-slate-500">
                        From{" "}
                        {formatDeposit(
                          getDisplayDeposit(broker)
                        )}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="border-t border-slate-200 bg-slate-50 p-3.5">
                  <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="border-r border-slate-200 px-1.5 py-3 text-center">
                      <div className="text-[8px] font-bold text-slate-500">
                        Licences
                      </div>

                      <div className="mt-1 text-[11px] font-black text-slate-950">
                        {broker.active_license_count}
                      </div>
                    </div>

                    <div className="border-r border-slate-200 px-1.5 py-3 text-center">
                      <div className="text-[8px] font-bold text-slate-500">
                        Deposit
                      </div>

                      <div className="mt-1 text-[10px] font-black text-slate-950">
                        {formatDeposit(
                          getDisplayDeposit(broker)
                        )}
                      </div>
                    </div>

                    <div className="px-1.5 py-3 text-center">
                      <div className="text-[8px] font-bold text-slate-500">
                        Platforms
                      </div>

                      <div className="mt-1 truncate text-[10px] font-black text-slate-950">
                        {splitItems(
                          broker.platforms,
                          1
                        )[0] || "Review"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <BrokerButtons broker={broker} />
                  </div>
                </div>
              </details>
            ))}

            {topTen.length > 5 ? (
              <details className="group overflow-hidden rounded-[18px] border border-slate-200 bg-white">
                <summary className="cursor-pointer list-none px-4 py-3.5 text-center text-xs font-black text-brand-600">
                  Show brokers ranked 6–10
                </summary>

                <div className="space-y-2 border-t border-slate-200 bg-slate-50 p-3">
                  {topTen.slice(5).map((broker, index) => (
                    <article
                      key={broker.id}
                      className="rounded-[15px] border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[9px] font-black text-slate-600">
                          {index + 6}
                        </span>

                        <BrokerLogo
                          broker={broker}
                          size="small"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-black text-slate-950">
                            {brokerName(broker)}
                          </div>

                          <div className="mt-1 flex items-center gap-2">
                            <RatingBadge
                              rating={broker.rating}
                            />

                            <span className="text-[9px] text-slate-500">
                              {formatDeposit(
                                getDisplayDeposit(broker)
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <BrokerButtons
                          broker={broker}
                          compact
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        </div>
      </section>

      {/* BROKER FINDER */}
      <section
        id="broker-finder"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-7 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
            <div className="grid lg:grid-cols-[380px_minmax(0,1fr)]">
              <div className="bg-slate-950 px-5 py-6 text-white sm:p-6 lg:p-7">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-black text-blue-200">
                  Quick Broker Finder
                </span>

                <h2 className="mt-3 text-[25px] font-black leading-[1.35] sm:text-3xl">
                  Narrow Down the Best Broker for Your Needs
                </h2>

                <p className="mt-2 text-[13px] font-medium leading-7 text-slate-300 sm:text-sm">
                  Filter brokers by starting deposit, experience,
                  platform preference and country availability.
                </p>

                <div className="mt-5 hidden grid-cols-2 gap-2 lg:grid">
                  {[
                    "Country availability",
                    "Starting deposit",
                    "Experience level",
                    "Platform preference",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[9px] font-bold text-slate-200"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-7">
                <div className="hidden lg:block">
                  <h3 className="text-lg font-black text-slate-950">
                    Broker Selection Filters
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-600">
                    Select your main preferences to view more relevant
                    broker options.
                  </p>
                </div>

                <form className="grid gap-3 sm:grid-cols-2 xl:mt-5 xl:grid-cols-4">
                  <div>
                    <label
                      htmlFor="en-deposit-filter"
                      className="mb-1.5 block text-[11px] font-black text-slate-800"
                    >
                      Starting Deposit
                    </label>

                    <select
                      id="en-deposit-filter"
                      defaultValue="under-100"
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-[13px] font-bold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="under-100">
                        Under $100
                      </option>
                      <option value="100-500">
                        $100–$500
                      </option>
                      <option value="500-1000">
                        $500–$1,000
                      </option>
                      <option value="over-1000">
                        Over $1,000
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="en-experience-filter"
                      className="mb-1.5 block text-[11px] font-black text-slate-800"
                    >
                      Experience Level
                    </label>

                    <select
                      id="en-experience-filter"
                      defaultValue="beginner"
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-[13px] font-bold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="beginner">
                        Beginner
                      </option>
                      <option value="intermediate">
                        Intermediate
                      </option>
                      <option value="advanced">
                        Advanced
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="en-platform-filter"
                      className="mb-1.5 block text-[11px] font-black text-slate-800"
                    >
                      Trading Platform
                    </label>

                    <select
                      id="en-platform-filter"
                      defaultValue="any"
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-[13px] font-bold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="any">
                        Any platform
                      </option>
                      <option value="mt4">
                        MetaTrader 4
                      </option>
                      <option value="mt5">
                        MetaTrader 5
                      </option>
                      <option value="ctrader">
                        cTrader
                      </option>
                    </select>
                  </div>

                  <CountryBrokerRedirect locale="en" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST BY TRADING NEED */}
      <section
        id="categories"
        className="border-b border-slate-200 bg-[#f5f7fb] py-7 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Broker Categories"
            title="Best Forex Brokers by Trading Need"
            description="The highest-rated broker is not automatically the best choice for every trader. These categories highlight different priorities such as low deposits, platform access, regulation and suitability for active trading."
          />

          {/* MOBILE */}
          <div className="mt-5 space-y-2.5 sm:hidden">
            {useCasePicks.map((item, index) => (
              <details
                key={`${item.title}-${item.broker.id}`}
                open={index === 0}
                className="group overflow-hidden rounded-[17px] border border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <BrokerLogo
                      broker={item.broker}
                      size="small"
                    />

                    <div className="min-w-0">
                      <span className="text-[9px] font-black text-brand-600">
                        {item.shortTitle}
                      </span>

                      <h3 className="truncate text-[14px] font-black text-slate-950">
                        {brokerName(item.broker)}
                      </h3>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="border-t border-slate-200 bg-slate-50 p-4">
                  <p className="text-[13px] font-medium leading-7 text-slate-700">
                    {item.description}
                  </p>

                  <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="border-r border-slate-200 px-2 py-3 text-center">
                      <div className="text-[9px] font-bold text-slate-500">
                        Deposit
                      </div>

                      <div className="mt-1 text-xs font-black text-slate-950">
                        {formatDeposit(
                          getDisplayDeposit(item.broker)
                        )}
                      </div>
                    </div>

                    <div className="px-2 py-3 text-center">
                      <div className="text-[9px] font-bold text-slate-500">
                        Licences
                      </div>

                      <div className="mt-1 text-xs font-black text-slate-950">
                        {item.broker.active_license_count}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <BrokerButtons
                      broker={item.broker}
                      compact
                    />
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* TABLET & DESKTOP */}
          <div className="mt-7 hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3">
            {useCasePicks.map((item) => (
              <article
                key={`${item.title}-${item.broker.id}`}
                className="flex min-h-[265px] flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_14px_32px_rgba(15,23,42,0.07)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-black text-brand-600">
                    {item.shortTitle}
                  </span>

                  <RatingBadge
                    rating={item.broker.rating}
                  />
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <BrokerLogo
                    broker={item.broker}
                    size="normal"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-black text-slate-950">
                      {brokerName(item.broker)}
                    </h3>

                    <p className="mt-1 text-[11px] font-bold text-slate-500">
                      {item.title}
                    </p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 text-xs font-medium leading-6 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <div className="border-r border-slate-200 px-2 py-3 text-center">
                    <div className="text-[9px] font-bold text-slate-500">
                      Minimum Deposit
                    </div>

                    <div className="mt-1 text-xs font-black text-slate-950">
                      {formatDeposit(
                        getDisplayDeposit(item.broker)
                      )}
                    </div>
                  </div>

                  <div className="px-2 py-3 text-center">
                    <div className="text-[9px] font-bold text-slate-500">
                      Active Licences
                    </div>

                    <div className="mt-1 text-xs font-black text-slate-950">
                      {item.broker.active_license_count}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <BrokerButtons
                    broker={item.broker}
                    compact
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATION */}
      <section
        id="regulation"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-9 lg:py-11"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Regulatory Oversight"
            title="Compare Brokers by Regulatory Authority"
            description="A broker may operate through different legal entities in different regions. Always confirm the entity serving your account, the licence number and the protections that apply in your jurisdiction."
          />

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {regulatorSummaries.map((regulator) => (
              <Link
                key={regulator.code}
                href={`/en/licenses/${regulator.code.toLowerCase()}`}
                className="group rounded-[19px] border border-slate-200 bg-white p-4 shadow-[0_5px_16px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-brand-50 px-2 text-[11px] font-black text-brand-600">
                    {regulator.code}
                  </span>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-black text-emerald-700 sm:px-2.5 sm:text-[9px]">
                    {regulator.brokerCount}{" "}
                    {regulator.brokerCount === 1
                      ? "broker"
                      : "brokers"}
                  </span>
                </div>

                <h3 className="mt-4 text-[12px] font-black leading-5 text-slate-950 sm:text-sm sm:leading-6">
                  {regulator.code} regulated brokers
                </h3>

                <div className="mt-3 border-t border-slate-200 pt-3 text-[9px] font-black text-brand-600 sm:text-[10px]">
                  View brokers →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {[
              {
                title: "Verify the Licence Number",
                text: "Search for the licence directly in the regulator’s official public register.",
              },
              {
                title: "Match the Legal Entity",
                text: "Confirm that the entity in your client agreement matches the regulated company.",
              },
              {
                title: "Check Your Jurisdiction",
                text: "Investor protection, leverage and available accounts may differ by country.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="flex items-start gap-3 rounded-[17px] border border-slate-200 bg-slate-50 p-4"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-[10px] font-black text-white">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-sm font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs font-medium leading-6 text-slate-700">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR COMPARISONS */}
      {preparedComparisons.length ? (
        <section className="border-b border-slate-200 bg-[#f5f7fb] py-9 lg:py-11">
          <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Head-to-Head Reviews"
                title="Compare Popular Forex Brokers"
                description="Use direct broker comparisons to review differences in regulation, deposits, platforms and overall account suitability."
              />

              <Link
                href="/en/compare"
                className="inline-flex w-fit items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-black text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                All Broker Comparisons
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {preparedComparisons.map((comparison) => (
                <Link
                  key={comparison.id}
                  href={`/en/compare/${comparison.slug}`}
                  className="rounded-[20px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                >
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div className="flex min-w-0 flex-col items-center text-center">
                      <BrokerLogo
                        broker={comparison.broker1}
                        size="normal"
                      />

                      <span className="mt-2 max-w-full truncate text-xs font-black text-slate-950">
                        {brokerName(
                          comparison.broker1
                        )}
                      </span>
                    </div>

                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-[9px] font-black text-white">
                      VS
                    </span>

                    <div className="flex min-w-0 flex-col items-center text-center">
                      <BrokerLogo
                        broker={comparison.broker2}
                        size="normal"
                      />

                      <span className="mt-2 max-w-full truncate text-xs font-black text-slate-950">
                        {brokerName(
                          comparison.broker2
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-200 pt-3 text-center text-[10px] font-black text-brand-600">
                    View Full Comparison
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {/* CHOOSING GUIDE */}
      <section className="border-b border-slate-200 bg-white py-7 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="grid lg:grid-cols-[390px_minmax(0,1fr)]">
              <div className="flex flex-col border-b border-slate-200 bg-brand-50 px-5 py-6 sm:p-7 lg:border-b-0 lg:border-r">
                <span className="text-[10px] font-black text-brand-600">
                  Forex Broker Selection Guide
                </span>

                <h2 className="mt-2 text-[25px] font-black leading-[1.3] text-slate-950 sm:text-[32px]">
                  How to Choose the Best Forex Broker
                </h2>

                <p className="mt-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  Start with regulation and the legal entity, then compare
                  costs, platforms, withdrawals and account requirements.
                </p>

                <div className="mt-5 space-y-2.5">
                  {[
                    "Verify the regulated legal entity",
                    "Compare total trading costs",
                    "Review platform and market access",
                    "Check deposits and withdrawals",
                    "Confirm account eligibility",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-brand-100 bg-white/70 px-3 py-2.5"
                    >
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[9px] font-black text-white">
                        ✓
                      </span>

                      <span className="text-[12px] font-bold text-slate-800">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/en/how-we-review"
                  className="mt-5 inline-flex min-h-11 w-fit items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-sm transition hover:bg-brand-600"
                >
                  Read Our Review Methodology
                </Link>
              </div>

              {/* MOBILE */}
              <div className="space-y-2.5 p-4 lg:hidden">
                {[
                  {
                    number: "01",
                    title: "Regulation and Legal Entity",
                    text: "Confirm which regulated company will hold your account and which protections apply in your country.",
                  },
                  {
                    number: "02",
                    title: "Total Trading Cost",
                    text: "Compare spreads, commissions, overnight financing, inactivity charges and withdrawal fees.",
                  },
                  {
                    number: "03",
                    title: "Platform and Market Access",
                    text: "Choose a platform that supports your preferred instruments, order types and trading workflow.",
                  },
                  {
                    number: "04",
                    title: "Deposits and Withdrawals",
                    text: "Review payment methods, processing times, limits and withdrawal conditions.",
                  },
                  {
                    number: "05",
                    title: "Account Requirements",
                    text: "Check minimum deposit, account currency, margin terms and eligibility requirements.",
                  },
                ].map((item, index) => (
                  <details
                    key={item.number}
                    open={index === 0}
                    className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-[10px] font-black text-white">
                          {item.number}
                        </span>

                        <h3 className="text-[14px] font-black leading-6 text-slate-950">
                          {item.title}
                        </h3>
                      </div>

                      <span className="shrink-0 text-xs text-slate-400 transition group-open:rotate-180">
                        ▼
                      </span>
                    </summary>

                    <p className="border-t border-slate-200 bg-white px-4 py-3 text-[13px] font-medium leading-7 text-slate-700">
                      {item.text}
                    </p>
                  </details>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="hidden grid-cols-2 gap-4 p-6 lg:grid">
                {[
                  {
                    number: "01",
                    title: "Regulation and Legal Entity",
                    text: "Verify the company holding your account and the protections that apply in your jurisdiction.",
                  },
                  {
                    number: "02",
                    title: "Total Trading Cost",
                    text: "Compare spreads, commissions, financing charges and non-trading fees.",
                  },
                  {
                    number: "03",
                    title: "Platform and Market Access",
                    text: "Review supported platforms, instruments, order types and analytical tools.",
                  },
                  {
                    number: "04",
                    title: "Deposits and Withdrawals",
                    text: "Check payment methods, processing times, limits and withdrawal conditions.",
                  },
                  {
                    number: "05",
                    title: "Account Requirements",
                    text: "Review minimum deposits, account currencies and eligibility requirements.",
                  },
                  {
                    number: "06",
                    title: "Customer Support",
                    text: "Consider support availability, communication channels and response quality.",
                  },
                ].map((item) => (
                  <article
                    key={item.number}
                    className="rounded-[18px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="text-[10px] font-black text-brand-600">
                      {item.number}
                    </span>

                    <h3 className="mt-2 text-base font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO INFORMATION BLOCK */}
      <section className="border-b border-slate-200 bg-[#f5f7fb] py-8 sm:py-11 lg:py-12">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-7">
              <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700">
                Understanding Broker Rankings
              </span>

              <h2 className="mt-3 text-[25px] font-black leading-[1.3] text-slate-950 sm:text-[34px]">
                What Does “Best Forex Broker” Actually Mean?
              </h2>

             <div className="mt-4 space-y-4 text-[13px] font-medium leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
  <p>
    A broker ranking should never be treated as a universal
    recommendation. Forex brokers operate through different legal
    entities, and the trading conditions available to clients may
    vary depending on their country of residence.
  </p>

  <p>
    Compare more than spreads alone. Consider regulation, trading
    costs, platform quality, market access, payment methods,
    execution quality and customer support before opening an
    account.
  </p>

  <p>
    Our rankings combine independent broker research, regulatory
analysis and practical account comparisons. The highest-ranked
broker may not always be the best fit for your trading goals.
Every trader has different priorities, risk tolerance and
preferred trading conditions.
  </p>

  <p>
    Always verify the regulated legal entity, review the broker's
    legal documents and start with an amount you are comfortable
    risking.
  </p>
</div>
            </article>

            <aside className="rounded-[22px] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.10)] sm:p-7">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black text-blue-200">
                Before You Open an Account
              </span>

              <h2 className="mt-3 text-[23px] font-black leading-[1.35] sm:text-[27px]">
                Complete These Five Checks
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Confirm the regulated legal entity.",
                  "Verify the licence in the official register.",
                  "Read the complete pricing and fee schedule.",
                  "Review withdrawal rules and processing times.",
                  "Check whether the broker accepts clients from your country.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[14px] border border-white/10 bg-white/5 px-3.5 py-3"
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-[9px] font-black text-white">
                      {index + 1}
                    </span>

                    <p className="text-[12px] font-bold leading-6 text-slate-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section
        id="methodology"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-7 sm:py-12 lg:py-14"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden">
            <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700">
              Broker Alarab Methodology
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.3] text-slate-950">
              How We Evaluate Forex Brokers
            </h2>

            <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700">
              Our rankings consider several connected factors rather than
              relying on one headline feature.
            </p>
          </div>

          <div className="hidden sm:block">
            <SectionHeading
              eyebrow="Broker Alarab Methodology"
              title="How We Evaluate Forex Brokers"
              description="Our rankings consider regulatory credibility, trading costs, platform access, account requirements and operational quality rather than relying on one headline feature."
            />
          </div>

          {/* MOBILE */}
          <div className="mt-5 space-y-2.5 sm:hidden">
            {[
              {
                title: "Regulation and Safety",
                text: "We review active licences, legal entities and the regulatory profile available for each broker.",
              },
              {
                title: "Spreads and Fees",
                text: "We assess spreads, commissions and other trading or account-related charges.",
              },
              {
                title: "Platforms and Tools",
                text: "We review platform choice, accessibility and the tools available to traders.",
              },
              {
                title: "Account Accessibility",
                text: "We compare minimum deposits, account options and general entry requirements.",
              },
              {
                title: "Deposits and Withdrawals",
                text: "We consider payment access, processing information and withdrawal conditions.",
              },
              {
                title: "Trader Suitability",
                text: "We assess whether a broker may better suit beginners, active traders or platform-focused users.",
              },
            ].map((item, index) => (
              <details
                key={item.title}
                open={index === 0}
                className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-[10px] font-black text-white">
                      0{index + 1}
                    </span>

                    <h3 className="text-[15px] font-black text-slate-950">
                      {item.title}
                    </h3>
                  </div>

                  <span className="shrink-0 text-xs text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <p className="border-t border-slate-200 bg-white px-4 py-3 text-[13px] font-medium leading-7 text-slate-700">
                  {item.text}
                </p>
              </details>
            ))}

            <Link
              href="/en/how-we-review"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-sm transition hover:bg-brand-600"
            >
              Read the Full Methodology
            </Link>
          </div>

          {/* DESKTOP */}
          <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Regulation and Safety",
                text: "We review active licences, legal entities, regulatory coverage and available safety data.",
              },
              {
                title: "Spreads and Trading Fees",
                text: "We assess spreads, commissions, financing charges and other relevant trading costs.",
              },
              {
                title: "Platforms and Tools",
                text: "We review platform choice, usability, device access and available trading tools.",
              },
              {
                title: "Account Accessibility",
                text: "We compare minimum deposits, account structures and the general accessibility of each broker.",
              },
              {
                title: "Deposits and Withdrawals",
                text: "We consider payment options, processing information and withdrawal-related conditions.",
              },
              {
                title: "Trader Suitability",
                text: "We assess how well the broker may fit different experience levels and trading priorities.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="flex min-h-[132px] items-start gap-4 rounded-[20px] border border-slate-300 bg-slate-50/70 p-5 transition hover:border-brand-300 hover:bg-white hover:shadow-[0_10px_26px_rgba(15,23,42,0.05)]"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-[12px] font-black text-white">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-[16px] font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[14px] font-medium leading-7 text-slate-700">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

       <div className="mt-6 hidden justify-center sm:flex">
  <Link
    href="/en/how-we-review"
    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-500 px-7 text-sm font-black text-white shadow-sm transition hover:bg-brand-600"
  >
    Explore Our Review Methodology
  </Link>
</div>
        </div>
      </section>

      {/* RISK AND SCAM WARNING */}
      <section className="border-b border-slate-200 bg-[#f5f7fb] py-7 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[22px] border border-red-300 bg-white shadow-[0_8px_24px_rgba(127,29,29,0.05)]">
            <div className="grid lg:grid-cols-[370px_minmax(0,1fr)]">
              <div className="border-b border-red-200 bg-red-50 px-5 py-6 sm:p-7 lg:border-b-0 lg:border-r">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-base font-black text-red-700">
                    !
                  </span>

                  <div>
                    <h2 className="text-[24px] font-black leading-[1.35] text-slate-950 sm:text-[30px]">
                      How to Avoid Forex Broker Scams
                    </h2>

                    <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700 sm:text-[14px]">
                      Never transfer funds until you have verified the
                      broker’s legal entity, licence details and withdrawal
                      process.
                    </p>
                  </div>
                </div>

                <Link
                  href="/en/licenses"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-red-300 bg-white px-5 text-[13px] font-black text-red-700 transition hover:bg-red-100"
                >
                  Check Broker Regulation
                </Link>
              </div>

              {/* MOBILE */}
              <div className="space-y-2.5 p-4 sm:hidden">
                {[
                  {
                    title: "Guaranteed Profit Claims",
                    text: "Legitimate brokers cannot guarantee fixed or risk-free trading returns.",
                  },
                  {
                    title: "Missing Licence Details",
                    text: "Avoid firms that do not clearly disclose their legal entity and licence number.",
                  },
                  {
                    title: "Pressure to Deposit More",
                    text: "Do not respond to aggressive demands to transfer more money or borrow to trade.",
                  },
                  {
                    title: "Withdrawal Obstruction",
                    text: "Test the withdrawal process before maintaining a larger account balance.",
                  },
                ].map((item, index) => (
                  <details
                    key={item.title}
                    open={index === 0}
                    className="group overflow-hidden rounded-[15px] border border-red-200 bg-red-50/50"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
                      <h3 className="text-[14px] font-black text-red-950">
                        {item.title}
                      </h3>

                      <span className="shrink-0 text-xs text-red-400 transition group-open:rotate-180">
                        ▼
                      </span>
                    </summary>

                    <p className="border-t border-red-200 bg-white px-4 py-3 text-[13px] font-medium leading-7 text-slate-700">
                      {item.text}
                    </p>
                  </details>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="hidden grid-cols-2 gap-4 p-7 sm:grid">
                {[
                  {
                    title: "Guaranteed Profit Claims",
                    text: "No legitimate broker can guarantee fixed returns or remove the financial risk involved in trading.",
                  },
                  {
                    title: "Missing Licence Details",
                    text: "Be cautious when a firm does not clearly provide its legal entity name and licence number.",
                  },
                  {
                    title: "Pressure to Increase Deposits",
                    text: "Do not respond to aggressive requests to transfer larger amounts or borrow money to trade.",
                  },
                  {
                    title: "Withdrawal Restrictions",
                    text: "Test withdrawals early and investigate unexpected conditions, delays or additional payment demands.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="min-h-[118px] rounded-[18px] border border-red-200 bg-red-50/60 p-5"
                  >
                    <h3 className="text-[16px] font-black text-red-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-slate-700">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[16px] border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[12px] font-medium leading-6 text-amber-950 sm:text-[13px] sm:leading-7">
              <strong className="font-black">Risk warning:</strong>{" "}
              forex and CFD trading involves a high level of risk and may
              not be suitable for every investor. Leverage can increase
              both profits and losses. Never trade with money you cannot
              afford to lose.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-24 bg-white py-7 sm:py-10"
      >
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden">
            <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[10px] font-black text-brand-700">
              Frequently Asked Questions
            </span>

            <h2 className="mt-3 text-[25px] font-black leading-[1.3] tracking-tight text-slate-950">
              Questions About Choosing a Forex Broker
            </h2>

            <p className="mt-2 text-[13px] font-medium leading-7 text-slate-700">
              Clear answers to common questions international traders ask
              before opening a brokerage account.
            </p>
          </div>

          <div className="hidden sm:block">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Questions About Choosing a Forex Broker"
              description="Clear answers to common questions international traders ask before selecting a broker or opening a trading account."
            />
          </div>

          <div className="mt-5 space-y-2.5 sm:mt-6">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className="group overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50 open:bg-white"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3 px-3.5 py-3.5 sm:px-4">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-[8px] font-black text-brand-600">
                    0{index + 1}
                  </span>

                  <h3 className="text-[12px] font-black leading-5 text-slate-950 sm:text-sm">
                    {item.question}
                  </h3>

                  <span className="text-[10px] text-slate-400 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="border-t border-slate-200 bg-white px-4 py-3 text-[13px] font-medium leading-7 text-slate-700 sm:text-sm">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-5 rounded-[18px] border border-brand-200 bg-brand-50 p-4 sm:mt-6 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-5">
            <div>
              <h2 className="text-[16px] font-black text-slate-950">
                Still Comparing Forex Brokers?
              </h2>

              <p className="mt-1 text-[12px] font-medium leading-6 text-slate-700">
                Use the broker finder or open a direct comparison between
                two brokers.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-0 sm:flex">
              <a
                href="#broker-finder"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-500 px-5 text-[12px] font-black text-white shadow-sm transition hover:bg-brand-600 sm:min-w-[150px] sm:text-sm"
              >
                Use Broker Finder
              </a>

              <Link
                href="/en/compare"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-[12px] font-black text-slate-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 sm:min-w-[150px] sm:text-sm"
              >
                Compare Brokers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}