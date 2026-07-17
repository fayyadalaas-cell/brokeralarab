import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BrokerFinderEN from "@/app/components/BrokerFinderEN";

export const metadata: Metadata = {
  title: {
    absolute: "Best Trading Brokers & Broker Reviews 2026 | Broker Alarab",
  },

  description:
    "Compare the best trading brokers in 2026 by regulation, fees, spreads, account types, trading platforms, deposits, and withdrawals. Independent broker reviews to help you choose with confidence.",

  keywords: [
    "Broker Alarab",
    "best trading brokers",
    "best forex brokers",
    "broker reviews",
    "broker comparison",
    "regulated brokers",
    "forex broker reviews",
    "low spread brokers",
    "Islamic trading account",
    "MT4 brokers",
    "MT5 brokers",
    "trading platforms",
    "best brokers 2026",
  ],

  alternates: {
    canonical: "https://brokeralarab.com/en",
    languages: {
      en: "https://brokeralarab.com/en",
      ar: "https://brokeralarab.com",
      "x-default": "https://brokeralarab.com/en",
    },
  },

  openGraph: {
    title: "Best Trading Brokers & Broker Reviews 2026 | Broker Alarab",
    description:
      "Compare trading brokers by regulation, fees, spreads, account types, platforms, deposits, and withdrawals. Independent reviews for smarter broker selection.",
    url: "https://brokeralarab.com/en",
    siteName: "Broker Alarab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://brokeralarab.com/og-image.png",
        width: 1560,
        height: 377,
        alt: "Broker Alarab broker reviews and comparisons",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Trading Brokers & Broker Reviews 2026 | Broker Alarab",
    description:
      "Compare regulated trading brokers by fees, spreads, platforms, accounts, deposits, and withdrawals.",
    images: ["https://brokeralarab.com/og-image.png"],
  },
};

type Broker = {
  id: number;
  name: string | null;
  name_en: string | null;
  slug: string | null;
  rating: number | null;
  min_deposit: number | null;
  platforms: string | null;
  regulation: string | null;
  regulation_short: string | null;
  best_for: string | null;
  best_for_en: string | null;
  intro: string | null;
  intro_en: string | null;
  logo: string | null;
  pros: string | null;
  pros_en: string | null;
  cons: string | null;
  cons_en: string | null;
  account_types: string | null;
  account_types_en: string | null;
  fees: string | null;
  fees_en: string | null;
  spreads: string | null;
  spreads_en: string | null;
  deposit_withdrawal: string | null;
  deposit_withdrawal_en: string | null;
  platform_details: string | null;
  platform_details_en: string | null;
  support: string | null;
  support_en: string | null;
  safety: string | null;
  safety_en: string | null;
  final_verdict: string | null;
  final_verdict_en: string | null;
  meta_title: string | null;
  meta_title_en: string | null;
  meta_description: string | null;
  meta_description_en: string | null;
  arab_traders: string | null;
  founded_year: string | null;
  headquarters: string | null;
  headquarters_en: string | null;
  max_leverage: string | null;
  islamic_account: string | null;
  arabic_support: string | null;
  trading_assets: string | null;
  trading_assets_en: string | null;
  real_account_url: string | null;
};

function money(value: number | null) {
  if (value === null || Number.isNaN(value)) return "Not specified";
  return `$${value}`;
}

function shortReg(value: string | null) {
  if (!value) return "Not specified";
  return value
    .split("||")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(" / ");
}

function shortPlatforms(value: string | null) {
  if (!value) return "Not specified";
  return value.replace("JustMarkets Mobile App", "Mobile").trim();
}

function getCountryPages() {
  return [
    {
      title: "Best Trading Brokers in the UK",
      href: "/best-brokers",
      desc: "Compare trusted forex and CFD brokers for UK traders.",
      shortDesc: "Best brokers in the UK",
      flag: "https://flagcdn.com/w80/gb.png",
      badge: "United Kingdom",
    },
    {
      title: "Best Trading Brokers in Australia",
      href: "/best-brokers",
      desc: "Compare regulated brokers available in Australia.",
      shortDesc: "Best brokers in Australia",
      flag: "https://flagcdn.com/w80/au.png",
      badge: "Australia",
    },
    {
      title: "Best Trading Brokers in South Africa",
      href: "/best-brokers",
      desc: "Popular forex brokers for South African traders.",
      shortDesc: "Best brokers in South Africa",
      flag: "https://flagcdn.com/w80/za.png",
      badge: "South Africa",
    },
    {
      title: "Best Trading Brokers in Singapore",
      href: "/best-brokers",
      desc: "Compare global brokers available in Singapore.",
      shortDesc: "Best brokers in Singapore",
      flag: "https://flagcdn.com/w80/sg.png",
      badge: "Singapore",
    },
    {
      title: "Best Trading Brokers in Malaysia",
      href: "/best-brokers",
      desc: "Review brokers with strong account options.",
      shortDesc: "Best brokers in Malaysia",
      flag: "https://flagcdn.com/w80/my.png",
      badge: "Malaysia",
    },
    {
      title: "Best Trading Brokers in India",
      href: "/best-brokers",
      desc: "Compare brokers suitable for Indian traders.",
      shortDesc: "Best brokers in India",
      flag: "https://flagcdn.com/w80/in.png",
      badge: "India",
    },
    {
      title: "Best Trading Brokers in Nigeria",
      href: "/best-brokers",
      desc: "Find brokers with flexible deposit options.",
      shortDesc: "Best brokers in Nigeria",
      flag: "https://flagcdn.com/w80/ng.png",
      badge: "Nigeria",
    },
    {
      title: "Best Trading Brokers in Thailand",
      href: "/best-brokers",
      desc: "Trusted brokers for Thai forex traders.",
      shortDesc: "Best brokers in Thailand",
      flag: "https://flagcdn.com/w80/th.png",
      badge: "Thailand",
    },
    {
      title: "Best Trading Brokers in the Philippines",
      href: "/best-brokers",
      desc: "Compare brokers and trading platforms.",
      shortDesc: "Best brokers in Philippines",
      flag: "https://flagcdn.com/w80/ph.png",
      badge: "Philippines",
    },
    {
      title: "Best Trading Brokers in Kenya",
      href: "/best-brokers",
      desc: "Review brokers suitable for Kenyan traders.",
      shortDesc: "Best brokers in Kenya",
      flag: "https://flagcdn.com/w80/ke.png",
      badge: "Kenya",
    },
  ];
}

function getTypePages() {
  return [
    {
      title: "Best Islamic Trading Brokers",
      href: "/en/best-brokers/islamic",
      desc: "Brokers offering Islamic (swap-free) accounts suitable for Muslim traders.",
    },
    {
      title: "Best Brokers for Beginners",
      href: "/en/best-brokers/beginners",
      desc: "Beginner-friendly brokers with easy platforms and low minimum deposits.",
    },
    {
      title: "Best Low Spread Brokers",
      href: "/en/best-brokers/low-spread",
      desc: "Compare brokers offering low spreads and professional trading accounts.",
    },
    {
      title: "Best MT4 & MT5 Brokers",
      href: "/en/best-brokers/mt4-mt5",
      desc: "Brokers supporting MetaTrader 4 and MetaTrader 5 for day traders and professionals.",
    },
  ];
}

type Comparison = {
  id: number;
  slug: string | null;
  title: string | null;
  views_count: number | null;
broker_1: {
  name: string | null;
  name_en: string | null;
  logo: string | null;
  rating: number | null;
} | null;
broker_2: {
  name: string | null;
  name_en: string | null;
  logo: string | null;
  rating: number | null;
} | null;
};

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const today = todayDate.toISOString().split("T")[0];

  const [
  { data },
  { data: comparisonsData },
  { data: rankingData },
  { data: homeEvents },
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
        platforms,
        regulation,
        regulation_short,
        best_for,
        best_for_en,
        logo,
        islamic_account,
        arabic_support,
        real_account_url
      `)
      .order("rating", { ascending: false }),

    supabase
      .from("comparisons")
      .select(`
        id,
        slug,
        title,
        views_count,
        broker_1:broker_1_id (
          name,
          name_en,
          logo,
          rating
        ),
        broker_2:broker_2_id (
          name,
          name_en,
          logo,
          rating
        )
      `)
      .not("slug", "is", null)
      .not("title", "is", null)
      .order("views_count", { ascending: false })
      .limit(3),

      supabase
  .from("country_broker_rankings")
  .select(`
    broker_id,
    rank_position,
    country_rating,
    best_for,
    local_note,
    country_pages (
      slug
    )
  `),

    supabase
  .from("events")
  .select(`
    id,
    slug,
    title_en,
    excerpt_en,
    category,
    start_date,
    end_date,
    venue_en,
    city_en,
    country_en,
    status,
    is_media_partner
  `)
  .eq("status", "upcoming")
  .not("title_en", "is", null)
  .not("slug", "is", null)
  .gte("end_date", today)
  .order("start_date", { ascending: true })
  .limit(12),
  ]);

  const brokers = ((data ?? []) as Broker[]).filter((b) => b.slug && b.name);
  const countryRankings = ((rankingData ?? []) as any[])
  .map((row) => ({
    country_slug: Array.isArray(row.country_pages)
      ? row.country_pages[0]?.slug
      : row.country_pages?.slug,
    broker_id: row.broker_id,
    rank_position: row.rank_position,
    country_rating: row.country_rating,
    best_for: row.best_for,
    local_note: row.local_note,
  }))
  .filter((row) => row.country_slug);
  const topBrokers = brokers.slice(0, 6);

  const sidebarBrokers = brokers
  .filter(
    (broker) =>
      broker.logo &&
      broker.slug &&
      (broker.name_en || broker.name)
  )
  .sort(
    (a, b) =>
      Number(b.rating || 0) - Number(a.rating || 0)
  )
  .slice(0, 9);

  const footerFeaturedBrokers = brokers
  .filter((broker) => broker.logo && broker.slug && (broker.name_en || broker.name))
  .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
  .slice(0, 5);
  const topComparisons: Comparison[] = ((comparisonsData ?? []) as any[])
  .map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    views_count: item.views_count,
    broker_1: Array.isArray(item.broker_1) ? item.broker_1[0] ?? null : item.broker_1 ?? null,
    broker_2: Array.isArray(item.broker_2) ? item.broker_2[0] ?? null : item.broker_2 ?? null,
  }))
  .filter((item) => item.slug && item.title && item.broker_1 && item.broker_2);
const featured = brokers[0] ?? null;

const countryPages = getCountryPages();

const typePages = getTypePages();

 const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best trading broker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no single broker that suits every trader. Compare regulation, fees, platforms, account types, deposits, withdrawals, and availability in your country.",
      },
    },
    {
      "@type": "Question",
      name: "How can I check whether a broker is regulated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check the regulator and license number on the broker's website, then verify the information directly through the regulator's official register.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between trading account types?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard accounts may suit beginners, Raw Spread and ECN accounts may offer lower spreads with separate commissions, and Cent accounts may suit smaller capital.",
      },
    },
    {
      "@type": "Question",
      name: "Does a lower spread always mean a better broker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Commissions, swap fees, execution quality, slippage, regulation, and withdrawal reliability should also be considered.",
      },
    },
    {
      "@type": "Question",
      name: "Can I open a swap-free trading account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many brokers offer swap-free accounts, but conditions, alternative fees, and restrictions can vary between brokers.",
      },
    },
    {
      "@type": "Question",
      name: "What should I check before making a deposit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verify regulation, trading costs, account conditions, withdrawal methods, minimum deposit, and customer support before depositing.",
      },
    },
  ],
};

const eventList = homeEvents || [];

function formatEventDate(start?: string | null, end?: string | null) {
  if (!start) return "To be announced";

  const format = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(year, month - 1, day));
  };

  if (!end || end === start) return format(start);
  return `${format(start)} - ${format(end)}`;
}

function eventCountdown(start?: string | null, end?: string | null) {
  if (!start) return { status: "unknown", days: "—", hours: "—" };

  const now = new Date();
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = end ? new Date(`${end}T23:59:59`) : startDate;

  if (now > endDate) return { status: "ended", days: 0, hours: 0 };
  if (now >= startDate && now <= endDate) return { status: "live", days: 0, hours: 0 };

  const diff = startDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return { status: "upcoming", days, hours };
}

  return (
    <main dir="ltr" className="min-h-screen bg-[#f4f7fb] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

{/* HERO - MODERN ENGLISH */}
<section className="relative overflow-hidden border-b border-[#173b70] bg-[linear-gradient(135deg,#eef5ff_0%,#dceaff_48%,#c9ddfb_100%)]">
  {(() => {
    const allHeroBrokers = Array.from(
      ((brokers || []) as Broker[]).reduce((acc, broker) => {
        if (!broker || !broker.name) return acc;

        const key = String(broker.name).trim().toLowerCase();
        const existing = acc.get(key);

        if (
          !existing ||
          Number(broker.rating || 0) > Number(existing.rating || 0)
        ) {
          acc.set(key, broker);
        }

        return acc;
      }, new Map<string, Broker>()).values()
    )
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .map((broker) => ({
        id: broker.id,
        name: broker.name_en || broker.name || "Trading Broker",
        slug: broker.slug || "",
        rating: broker.rating
          ? Number(broker.rating).toFixed(1)
          : "—",
        logo: broker.logo || null,
      }));

    return (
      <>
        <div className="relative">
          {/* BACKGROUND */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-32 -top-44 h-[520px] w-[520px] rounded-full bg-brand-500/20 blur-[120px]" />

            <div className="absolute -left-32 bottom-[-180px] h-[470px] w-[470px] rounded-full bg-[#0f4fa8]/20 blur-[120px]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.58),transparent_34%)]" />

            <div className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(15,79,168,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(15,79,168,0.11)_1px,transparent_1px)] [background-size:54px_54px]" />

            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#d8e7fb]/60" />
          </div>

          {/* MAIN HERO */}
         <div className="relative mx-auto w-full max-w-[1560px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
  <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_470px] xl:gap-12">
              
              {/* BROKER LOGOS - DESKTOP ONLY */}
              <div className="order-2 hidden h-full lg:block">
                <div className="relative mx-auto h-full max-w-[430px]">
                  <div className="absolute -inset-6 rounded-[42px] bg-gradient-to-br from-brand-100/70 via-blue-100/20 to-transparent blur-2xl" />

                  <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,#0b1f3a_0%,#102f59_58%,#174f8f_100%)] p-5 shadow-[0_28px_75px_rgba(6,25,53,0.28)]">
                    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="text-left">
<span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-black text-blue-100">
  Broker Reviews & Comparisons
</span>

<h2 className="mt-2 text-[20px] font-black text-white">
  Compare leading brokers in one place
</h2>

<p className="mt-1 text-[11px] font-semibold text-blue-100/75">
  Review ratings, regulation, fees and account options
</p>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-[18px] text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]">
                        ✓
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {allHeroBrokers.slice(0, 6).map((broker) => (
                        <Link
                          key={broker.id}
                          href={`/en/brokers/${broker.slug}`}
                          className="group flex h-[86px] items-center justify-center rounded-[20px] border border-white/15 bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_34px_rgba(0,0,0,0.18)]"
                        >
                          {broker.logo ? (
                            <img
                              src={broker.logo}
                              alt={`${broker.name} logo`}
                              className="max-h-[76px] max-w-[135px] object-contain transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <span className="text-xs font-black text-slate-700">
                              {broker.name}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                      <div className="text-left">
                       <div className="text-[12px] font-black text-white">
  Independent research and regularly updated data
</div>

<div className="mt-1 text-[10px] font-semibold leading-4 text-blue-100/75">
  Editorial rankings are not determined by advertising payments
</div>
                      </div>

                      <Link
                        href="/en/brokers"
                        className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl bg-white px-4 text-[11px] font-black text-[#123d73] shadow-sm transition hover:bg-blue-50"
                      >
                        All Brokers
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

             {/* TEXT */}
<div className="order-1 text-center lg:pt-3 lg:text-left">
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[10px] font-black text-[#174f9f] shadow-[0_10px_28px_rgba(15,79,168,0.14)] backdrop-blur sm:gap-2 sm:px-4 sm:py-2 sm:text-xs lg:px-5 lg:py-2.5 lg:text-[12px]">
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 sm:h-6 sm:w-6">
      ✓
    </span>
    Independent broker reviews and comparisons
  </span>

  <h1 className="mt-3 text-[31px] font-black leading-[1.12] tracking-[-0.035em] text-[#07111f] sm:mt-4 sm:text-[46px] lg:text-[52px] xl:text-[58px]">
    Best Trading Brokers

    <span className="mt-1 hidden leading-[1.18] text-brand-600 sm:block sm:text-[36px] lg:text-[40px] xl:text-[44px]">
      Reviews, Fees and Regulation
    </span>
  </h1>

  <p className="mx-auto mt-2 max-w-[720px] text-[12px] font-semibold leading-6 text-slate-700 sm:mt-3 sm:text-[15px] sm:leading-7 lg:mx-0">
  <span className="sm:hidden">
    Compare regulated brokers by fees, spreads and platforms, then choose the
    broker that best fits your trading needs.
  </span>

  <span className="hidden sm:inline">
    Compare forex and CFD brokers by regulation, spreads, trading fees,
    account types and platforms, then choose the broker that best matches
    your experience, strategy and trading needs.
  </span>
</p>

  <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[10px] font-extrabold text-[#174f9f] sm:mt-3 sm:gap-x-5 sm:gap-y-2 sm:text-[12px] lg:justify-start">
    <span className="inline-flex items-center gap-1.5">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/80 text-[9px] shadow-sm sm:h-5 sm:w-5 sm:text-[10px]">
        ✓
      </span>
      Independent reviews
    </span>

    <span className="inline-flex items-center gap-1.5">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/80 text-[9px] shadow-sm sm:h-5 sm:w-5 sm:text-[10px]">
        ✓
      </span>
      Regulation comparison
    </span>

    <span className="inline-flex items-center gap-1.5">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/80 text-[9px] shadow-sm sm:h-5 sm:w-5 sm:text-[10px]">
        ✓
      </span>
      Updated broker data
    </span>
  </div>

  <div className="mt-3 flex flex-col items-stretch justify-center gap-2.5 sm:mt-4 sm:flex-row sm:items-center sm:gap-3 lg:justify-start">
    <a
      href="#finder"
      className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_16px_34px_rgba(37,99,235,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 sm:min-h-[50px] sm:px-7 sm:text-[14px]"
    >
      Find the Best Broker
    </a>

    <Link
      href="/en/compare"
      className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-[13px] font-black text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-600 sm:min-h-[50px] sm:px-7 sm:text-[14px]"
    >
      Compare Brokers
    </Link>
  </div>

  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-4 sm:gap-3">
    {[
      ["150+", "Brokers studied"],
      ["50+", "Reviews & comparisons"],
      ["18+", "Regulators covered"],
      ["10", "Trading calculators"],
    ].map(([value, label]) => (
      <div
        key={label}
        className="group rounded-2xl border border-white/70 bg-white/90 px-2.5 py-2 text-center shadow-[0_10px_28px_rgba(15,79,168,0.11)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_16px_34px_rgba(15,79,168,0.16)] sm:px-3 sm:py-2.5"
      >
        <div className="text-[18px] font-black text-brand-600 transition duration-300 group-hover:scale-105 sm:text-[20px]">
          {value}
        </div>

        <div className="mt-0.5 text-[9px] font-bold leading-4 text-slate-500 sm:text-[11px]">
          {label}
        </div>
      </div>
    ))}
  </div>
</div>

            </div>
          </div>
        </div>
      </>
    );
  })()}
</section>

{/* HOME CONTENT + RIGHT DESKTOP SIDEBAR */}
<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-start xl:gap-3">

    {/* ALL ENGLISH HOME PAGE SECTIONS */}
<div className="min-w-0 xl:[&>section]:pr-0">

{/* FINDER */}
<section
  id="finder"
  className="scroll-mt-24 mx-auto max-w-7xl px-0 pt-2 pb-3 sm:pt-4 sm:pb-4 lg:pt-4 lg:pb-4"
>
  <BrokerFinderEN
    brokers={brokers}
    countryRankings={countryRankings}
  />
</section>

   {/* HOW WE RATE - CLEAN TRUST SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    {(() => {
      const ratingItems = [
        {
          num: "01",
          title: "Regulation & Fund Protection",
          desc: "We assess regulatory strength, client fund protection and broker transparency.",
        },
        {
          num: "02",
          title: "Fees & Spreads",
          desc: "We compare spreads, commissions, swap fees and total trading costs.",
        },
        {
          num: "03",
          title: "Platforms & Execution",
          desc: "We assess platform stability, execution speed and ease of use.",
        },
        {
          num: "04",
          title: "Deposits & Withdrawals",
          desc: "We review payment methods, processing times, fees and withdrawal speed.",
        },
        {
          num: "05",
          title: "Swap-Free Accounts",
          desc: "We review swap-free account conditions, restrictions and related fees.",
        },
        {
          num: "06",
          title: "Support & User Experience",
          desc: "We assess customer support, account setup and overall user experience.",
        },
      ];

      return (
        <>
          {/* DESKTOP */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-5">
              <div>
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
                  Broker Rating Methodology
                </span>

                <h2 className="mt-4 text-[36px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f]">
                  How We Choose the Best Trading Brokers
                </h2>

                <p className="mt-3 max-w-[900px] text-[15px] font-semibold leading-8 text-slate-600">
                  We evaluate brokers using clear criteria including regulation,
                  fees, spreads, platforms, execution, deposits, withdrawals,
                  swap-free accounts and customer support.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-5">
              {ratingItems.map((item) => (
                <Link
                  key={item.num}
                  href="/en/how-we-review-brokers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-full min-h-[118px] rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_18px_38px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex h-full items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-[14px] font-black text-brand-600 ring-1 ring-[#bfdbfe] transition group-hover:bg-brand-500 group-hover:text-white">
                      {item.num}
                    </span>

                    <div>
                      <h3 className="text-[18px] font-black leading-6 text-[#07111f]">
                        {item.title}
                      </h3>

                      <p className="mt-2 min-h-[52px] max-w-[330px] text-[13px] font-semibold leading-6 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center border-t border-slate-100 px-5 py-5">
              <Link
                href="/en/how-we-review-brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] min-w-[280px] items-center justify-center rounded-2xl bg-brand-500 px-7 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                View Our Full Rating Methodology
              </Link>
            </div>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            <div className="border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] to-[#eef5ff] px-4 py-4 text-center">
              <h2 className="mx-auto mt-3 max-w-[300px] text-[24px] font-black leading-[1.2] tracking-[-0.02em] text-[#07111f]">
                How We Choose the Best Trading Brokers
              </h2>

              <p className="mx-auto mt-2 max-w-[300px] text-[12px] font-semibold leading-6 text-slate-600">
                We review regulation, fees, platforms, withdrawals and account
                conditions before recommending a broker.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 bg-white p-3.5">
              {ratingItems.map((item) => (
                <Link
                  key={item.num}
                  href="/en/how-we-review-brokers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[18px] border border-slate-200 bg-[#fbfdff] px-3.5 py-3 shadow-[0_5px_16px_rgba(15,23,42,0.04)] transition hover:border-brand-200 hover:bg-brand-50/30"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-[11px] font-black text-brand-600 ring-1 ring-[#bfdbfe] transition group-hover:bg-brand-500 group-hover:text-white">
                      {item.num}
                    </span>

                    <div>
                      <h3 className="text-[14px] font-black leading-5 text-[#07111f]">
                        {item.title}
                      </h3>

                      <p className="mt-1 min-h-[40px] text-[11px] font-semibold leading-5 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3">
              <Link
                href="/en/how-we-review-brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand-500 px-4 text-[12px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)]"
              >
                View Our Full Rating Methodology
              </Link>
            </div>
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* TOP COMPARISONS */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
  {/* HEADER */}
<div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div className="text-center lg:text-left">
      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
        Broker Comparisons
      </span>

      <h2 className="mx-auto mt-3 max-w-[300px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
        Most Popular Broker Comparisons
      </h2>

      <div className="mx-auto mt-3 max-w-[900px] text-slate-600 lg:mx-0">
        <p className="text-[13px] font-semibold leading-7 sm:hidden">
          Compare popular brokers by regulation, fees, accounts and platforms.
        </p>

        <p className="hidden text-[15px] font-semibold leading-9 sm:block">
          Explore popular broker comparisons and understand the differences in
          regulation, account types, fees, spreads and platforms such as MT4
          and MT5 before choosing the right broker.
        </p>
      </div>
    </div>

    <div className="flex justify-center lg:self-center lg:pr-2">
      <Link
        href="/en/compare"
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:bg-brand-600 sm:h-12 sm:px-6 sm:text-[14px]"
      >
        Browse All Comparisons
      </Link>
    </div>
  </div>
</div>

    {/* MOBILE */}
<div className="grid gap-3 p-3.5 md:hidden">
  {topComparisons.map((cmp, index) => (
    <article
      key={cmp.id}
      className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)]"
    >
      <div className="h-1 bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

      <div className="p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-[9px] font-black text-brand-600">
            Featured Comparison
          </span>

          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-1.5 text-[9px] font-black text-slate-500">
            #{index + 1}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
          <div className="flex min-w-0 flex-col items-center text-center">
            <Link
              href={`/en/brokers/${
                cmp.broker_1?.name?.toLowerCase() === "exness"
                  ? "exness"
                  : cmp.broker_1?.name?.toLowerCase() === "xm"
                  ? "xm"
                  : cmp.broker_1?.name?.toLowerCase() === "vantage"
                  ? "vantage"
                  : cmp.broker_1?.name?.toLowerCase() === "equiti"
                  ? "equiti"
                  : ""
              }`}
              className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-brand-100 hover:bg-brand-50"
            >
              {cmp.broker_1?.logo ? (
                <img
                  src={cmp.broker_1.logo}
                  alt={cmp.broker_1.name_en || cmp.broker_1.name || "Broker 1"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-[9px] text-slate-400">Logo</span>
              )}
            </Link>

            <Link
              href={`/en/brokers/${
                cmp.broker_1?.name?.toLowerCase() === "exness"
                  ? "exness"
                  : cmp.broker_1?.name?.toLowerCase() === "xm"
                  ? "xm"
                  : cmp.broker_1?.name?.toLowerCase() === "vantage"
                  ? "vantage"
                  : cmp.broker_1?.name?.toLowerCase() === "equiti"
                  ? "equiti"
                  : ""
              }`}
              className="mt-2 flex min-h-[40px] max-w-[92px] items-center justify-center text-[14px] font-black leading-5 text-[#0f172a] transition hover:text-brand-500"
            >
              {cmp.broker_1?.name_en || cmp.broker_1?.name || "Broker 1"}
            </Link>

            <span className="mt-1 text-[11px] font-bold text-[#f59e0b]">
              ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
            </span>
          </div>

          <div className="flex h-14 items-center justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[11px] font-extrabold text-brand-500 shadow-sm">
              VS
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center text-center">
            <Link
              href={`/en/brokers/${
                cmp.broker_2?.name?.toLowerCase() === "exness"
                  ? "exness"
                  : cmp.broker_2?.name?.toLowerCase() === "xm"
                  ? "xm"
                  : cmp.broker_2?.name?.toLowerCase() === "vantage"
                  ? "vantage"
                  : cmp.broker_2?.name?.toLowerCase() === "equiti"
                  ? "equiti"
                  : ""
              }`}
              className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 p-2 transition hover:border-brand-100 hover:bg-brand-50"
            >
              {cmp.broker_2?.logo ? (
                <img
                  src={cmp.broker_2.logo}
                  alt={cmp.broker_2.name_en || cmp.broker_2.name || "Broker 2"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-[9px] text-slate-400">Logo</span>
              )}
            </Link>

            <Link
              href={`/en/brokers/${
                cmp.broker_2?.name?.toLowerCase() === "exness"
                  ? "exness"
                  : cmp.broker_2?.name?.toLowerCase() === "xm"
                  ? "xm"
                  : cmp.broker_2?.name?.toLowerCase() === "vantage"
                  ? "vantage"
                  : cmp.broker_2?.name?.toLowerCase() === "equiti"
                  ? "equiti"
                  : ""
              }`}
              className="mt-2 flex min-h-[40px] max-w-[92px] items-center justify-center text-[14px] font-black leading-5 text-[#0f172a] transition hover:text-brand-500"
            >
              {cmp.broker_2?.name_en || cmp.broker_2?.name || "Broker 2"}
            </Link>

            <span className="mt-1 text-[11px] font-bold text-[#f59e0b]">
              ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
            </span>
          </div>
        </div>

       <div className="mt-3 grid grid-cols-2 gap-2">
  <div className="flex min-h-[52px] items-center justify-center rounded-xl bg-brand-50 px-2.5 py-2 text-center text-[10px] font-bold leading-4 text-brand-700">
    <span>
      Accounts &amp;
      <span className="block">Fees</span>
    </span>
  </div>

  <div className="flex min-h-[52px] items-center justify-center rounded-xl bg-slate-50 px-2.5 py-2 text-center text-[10px] font-bold leading-4 text-slate-600 ring-1 ring-slate-200">
    <span>
      Platforms &amp;
      <span className="block">Regulation</span>
    </span>
  </div>
</div>

        <div className="mt-3">
          <Link
            href={`/en/compare/${cmp.slug}`}
            className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-black text-white transition hover:bg-brand-600"
          >
            View Full Comparison
          </Link>
        </div>
      </div>
    </article>
  ))}
</div>

    {/* DESKTOP / TABLET */}
<div className="hidden gap-4 p-5 md:grid md:grid-cols-2 xl:grid-cols-3">
  {topComparisons.map((cmp, index) => (
    <article
      key={cmp.id}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_16px_34px_rgba(15,23,42,0.07)]"
    >
      <div className="h-1 bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
            Featured Comparison
          </span>

          <span className="text-[11px] font-bold text-slate-400">
            #{index + 1}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/en/brokers/${
                cmp.broker_1?.name?.toLowerCase() === "exness"
                  ? "exness"
                  : cmp.broker_1?.name?.toLowerCase() === "xm"
                  ? "xm"
                  : cmp.broker_1?.name?.toLowerCase() === "vantage"
                  ? "vantage"
                  : cmp.broker_1?.name?.toLowerCase() === "equiti"
                  ? "equiti"
                  : ""
              }`}
              className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-100 hover:bg-brand-50 lg:h-20 lg:w-20"
            >
              {cmp.broker_1?.logo ? (
                <img
                  src={cmp.broker_1.logo}
                  alt={cmp.broker_1.name_en || cmp.broker_1.name || "Broker 1"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400">Logo</span>
              )}
            </Link>

            <Link
              href={`/en/brokers/${
                cmp.broker_1?.name?.toLowerCase() === "exness"
                  ? "exness"
                  : cmp.broker_1?.name?.toLowerCase() === "xm"
                  ? "xm"
                  : cmp.broker_1?.name?.toLowerCase() === "vantage"
                  ? "vantage"
                  : cmp.broker_1?.name?.toLowerCase() === "equiti"
                  ? "equiti"
                  : ""
              }`}
              className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-brand-500 lg:text-[18px]"
            >
              {cmp.broker_1?.name_en || cmp.broker_1?.name || "Broker 1"}
            </Link>

            <span className="mt-1 text-[11px] font-bold text-[#f59e0b]">
              ★ {cmp.broker_1?.rating?.toFixed(1) ?? "—"}
            </span>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-[12px] font-extrabold text-brand-500 shadow-sm">
              VS
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <Link
              href={`/en/brokers/${
                cmp.broker_2?.name?.toLowerCase() === "exness"
                  ? "exness"
                  : cmp.broker_2?.name?.toLowerCase() === "xm"
                  ? "xm"
                  : cmp.broker_2?.name?.toLowerCase() === "vantage"
                  ? "vantage"
                  : cmp.broker_2?.name?.toLowerCase() === "equiti"
                  ? "equiti"
                  : ""
              }`}
              className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-100 hover:bg-brand-50 lg:h-20 lg:w-20"
            >
              {cmp.broker_2?.logo ? (
                <img
                  src={cmp.broker_2.logo}
                  alt={cmp.broker_2.name_en || cmp.broker_2.name || "Broker 2"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400">Logo</span>
              )}
            </Link>

            <Link
              href={`/en/brokers/${
                cmp.broker_2?.name?.toLowerCase() === "exness"
                  ? "exness"
                  : cmp.broker_2?.name?.toLowerCase() === "xm"
                  ? "xm"
                  : cmp.broker_2?.name?.toLowerCase() === "vantage"
                  ? "vantage"
                  : cmp.broker_2?.name?.toLowerCase() === "equiti"
                  ? "equiti"
                  : ""
              }`}
              className="mt-3 text-[17px] font-black leading-none text-[#0f172a] transition hover:text-brand-500 lg:text-[18px]"
            >
              {cmp.broker_2?.name_en || cmp.broker_2?.name || "Broker 2"}
            </Link>

            <span className="mt-1 text-[11px] font-bold text-[#f59e0b]">
              ★ {cmp.broker_2?.rating?.toFixed(1) ?? "—"}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="flex min-h-[54px] items-center justify-center rounded-2xl bg-brand-50 px-3 py-3 text-center text-[11px] font-bold leading-5 text-brand-700">
            Accounts & Fees
          </div>

          <div className="flex min-h-[54px] items-center justify-center rounded-2xl bg-slate-50 px-3 py-3 text-center text-[11px] font-bold leading-5 text-slate-600 ring-1 ring-slate-200">
            Platforms & Regulation
          </div>
        </div>

        <div className="mt-auto pt-5">
          <Link
            href={`/en/compare/${cmp.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-brand-500 px-4 py-3 text-[15px] font-extrabold text-white transition hover:bg-brand-600"
          >
            View Full Comparison
          </Link>
        </div>
      </div>
    </article>
  ))}
</div>
  </div>
</section>

{/* COUNTRIES DIRECTORY - FINAL */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm sm:rounded-[32px]">
     {/* HEADER */}
<div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div className="text-center lg:text-left">
      <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
        By Country
      </span>

      <h2 className="mx-auto mt-3 max-w-[290px] text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
        Best Trading Brokers by Country
      </h2>

      <p className="mx-auto mt-3 max-w-[300px] text-[13px] font-semibold leading-7 text-slate-600 md:hidden">
        Select your country to find brokers that match local regulation,
        accounts and payment options.
      </p>

      <p className="mt-3 hidden max-w-[900px] text-[15px] font-semibold leading-8 text-slate-600 md:block">
        Explore trading brokers by country and compare regulation, account
        options, deposits, withdrawals, platforms and local availability.
      </p>
    </div>

    <div className="hidden shrink-0 justify-center md:flex lg:self-center lg:pr-4">
      <Link
        href="/en/best-brokers"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:bg-brand-600"
      >
        View All Countries
      </Link>
    </div>
  </div>
</div>

      {/* MOBILE COMPACT */}
      <div className="p-3 md:hidden">
        <div className="grid grid-cols-2 gap-2.5">
          {countryPages.map((item) => (
            <Link
              key={item.badge}
              href={`/en${item.href}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Best trading brokers in ${item.badge}`}
              className="group rounded-[14px] border border-slate-200 bg-white px-2.5 py-2.5 shadow-[0_3px_10px_rgba(15,23,42,0.04)] transition hover:border-brand-100 hover:bg-[#f8fbff]"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white p-[3px] shadow-sm">
                  <img
                    src={item.flag}
                    alt={`${item.badge} flag`}
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <h3 className="truncate text-[13px] font-black leading-5 text-[#07111f]">
                    {item.badge}
                  </h3>
                </div>

                <span className="shrink-0 text-[13px] font-bold text-slate-400 transition group-hover:translate-x-[2px] group-hover:text-brand-500">
                  →
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/en/best-brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="group col-span-2 rounded-[14px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-3 py-3 shadow-[0_3px_10px_rgba(15,23,42,0.04)] transition hover:bg-brand-50"
          >
            <div className="flex items-center justify-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white shadow-sm">
                🌍
              </div>

              <h3 className="text-[13px] font-black text-[#07111f]">
                All Other Countries
              </h3>

              <span className="text-[13px] font-bold text-slate-400 transition group-hover:translate-x-[2px] group-hover:text-brand-500">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* DESKTOP / TABLET */}
      <div className="hidden p-5 md:block">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {countryPages
  .filter((item) => item.badge !== "Kenya")
  .map((item) => (
            <Link
              key={item.badge}
              href={`/en${item.href}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Best trading brokers in ${item.badge}`}
              className="group rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:bg-[#fcfdff] hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white p-[4px] shadow-sm">
                  <img
                    src={item.flag}
                    alt={`${item.badge} flag`}
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <h3 className="truncate text-[16px] font-black text-[#07111f]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 truncate text-[12px] font-medium text-slate-500">
                    {item.shortDesc}
                  </p>
                </div>

                <span className="shrink-0 text-[18px] font-black text-brand-500 transition group-hover:translate-x-[3px]">
                  →
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/en/best-brokers"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-[20px] border border-dashed border-[#93c5fd] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] md:col-span-2 xl:col-span-3 xl:mx-auto xl:w-[520px]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white shadow-sm">
                🌍
              </div>

              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-[16px] font-black text-[#07111f]">
                  All Other Countries
                </h3>
                <p className="mt-0.5 text-[12px] font-medium text-slate-500">
                  Visit the general best brokers page if your country is not listed.
                </p>
              </div>

              <span className="text-[18px] font-black text-brand-500 transition group-hover:translate-x-[3px]">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </section>

{/* ACCOUNT TYPES HOME SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
            Trading Account Types
          </span>

          <h2 className="mx-auto mt-3 max-w-[300px] text-[24px] font-black leading-[1.18] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
            Choose the Right Account for Your Trading Style
          </h2>

          <p className="mx-auto mt-3 max-w-[760px] text-[13px] font-semibold leading-7 text-slate-600 sm:text-[15px] sm:leading-8 lg:mx-0">
            Compare Standard, Raw Spread, ECN and Cent account types to find
            the option that best matches your experience, strategy and trading capital.
          </p>
        </div>

        <div className="flex justify-center lg:self-center lg:pr-4">
          <Link
            href="/en/lowest-spread-brokers"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-5 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:h-12 sm:min-w-[190px] sm:px-6 sm:text-[14px]"
          >
            Compare Account Types
          </Link>
        </div>
      </div>
    </div>

    {/* MOBILE */}
    <div className="p-3.5 sm:hidden">
      <div className="grid gap-3">
        {[
          {
            title: "Standard Accounts",
            suitable: "Suitable for beginners and everyday trading",
            desc: "Simple accounts with clear pricing and no complex commission structure.",
            badge: "Easy to Start",
          },
          {
            title: "Raw Spread Accounts",
            suitable: "Suitable for scalping and active trading",
            desc: "Spreads from 0.0 pips with a separate fixed commission.",
            badge: "Lower Spreads",
          },
          {
            title: "ECN Accounts",
            suitable: "Suitable for experienced traders",
            desc: "Fast execution and more direct access to market liquidity.",
            badge: "Professional Execution",
          },
          {
            title: "Cent / Micro Accounts",
            suitable: "Suitable for testing with smaller capital",
            desc: "Trade smaller positions and test strategies with lower risk.",
            badge: "Small Capital",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href="/en/lowest-spread-brokers#account-types"
            className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white px-3.5 py-3 shadow-[0_6px_18px_rgba(15,23,42,0.05)] transition hover:border-brand-200 hover:bg-[#fbfdff]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 text-left">
                <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[9px] font-black text-brand-600">
                  {item.badge}
                </span>

                <h3 className="mt-3 text-[16px] font-black leading-6 text-[#07111f]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[12px] font-black leading-5 text-brand-600">
                  {item.suitable}
                </p>

                <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-500">
                  {item.desc}
                </p>
              </div>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-[14px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                →
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[10px] font-extrabold leading-5 text-brand-500">
              <span>Compare brokers offering this account</span>

              <span className="shrink-0 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>

    {/* DESKTOP / TABLET */}
    <div className="hidden p-5 sm:block">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Standard Accounts",
            suitable: "Suitable for beginners and everyday trading",
            desc: "Simple accounts with clear trading costs and no complex commission structure.",
            badge: "Easy to Start",
          },
          {
            title: "Raw Spread Accounts",
            suitable: "Suitable for scalping and active trading",
            desc: "Spreads from 0.0 pips with a separate commission for professional execution.",
            badge: "Lower Spreads",
          },
          {
            title: "ECN Accounts",
            suitable: "Suitable for experienced traders",
            desc: "Fast execution and more direct access to deeper market liquidity.",
            badge: "Professional Execution",
          },
          {
            title: "Cent / Micro Accounts",
            suitable: "Suitable for testing with smaller capital",
            desc: "Trade smaller position sizes and test strategies with lower capital.",
            badge: "Small Capital",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href="/en/lowest-spread-brokers#account-types"
            className="group relative flex h-full min-h-[258px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-80" />

            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-600">
                {item.badge}
              </span>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                →
              </span>
            </div>

            <h3 className="mt-5 text-[18px] font-black leading-6 text-[#07111f]">
              {item.title}
            </h3>

            <p className="mt-2 min-h-[48px] text-[12px] font-black leading-6 text-brand-600">
              {item.suitable}
            </p>

            <p className="mt-2 min-h-[56px] text-[12px] font-semibold leading-6 text-slate-500">
              {item.desc}
            </p>

            <div className="mt-auto border-t border-slate-100 pt-4">
              <span className="flex items-center justify-between gap-2 text-[11px] font-black leading-5 text-brand-500">
                <span>Compare brokers offering this account</span>

                <span className="shrink-0 transition group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>

 {/* HOW TO CHOOSE A BROKER - COMPACT SEO SECTION */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    {(() => {
      const brokerChecks = [
        {
          num: "01",
          title: "Regulation & Licensing",
          text: "Check the regulator and client fund protection.",
        },
        {
          num: "02",
          title: "Spreads & Commissions",
          text: "Compare total trading costs and swap fees.",
        },
        {
          num: "03",
          title: "Platforms & Execution",
          text: "Choose a stable, fast and easy-to-use platform.",
        },
        {
          num: "04",
          title: "Deposits & Withdrawals",
          text: "Review payment methods, speed and fees.",
        },
        {
          num: "05",
          title: "Swap-Free Accounts",
          text: "Check the conditions, restrictions and related fees.",
        },
        {
          num: "06",
          title: "Accounts & Support",
          text: "Choose suitable accounts with reliable support.",
        },
      ];

      return (
        <>
          {/* HEADER */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-center lg:text-left">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
                  Broker Selection Guide
                </span>

                <h2 className="mx-auto mt-3 max-w-[310px] text-[25px] font-black leading-[1.18] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
                  How to Choose the Best Trading Broker for You
                </h2>

                <p className="mx-auto mt-3 max-w-[850px] text-[12px] font-semibold leading-6 text-slate-600 sm:text-[15px] sm:leading-8 lg:mx-0">
                  Compare brokers by regulation, trading costs, platforms,
                  account types, deposits and withdrawals before opening an account.
                </p>
              </div>

              <div className="flex justify-center lg:shrink-0">
                <Link
                  href="/en/learn-trading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:h-12 sm:min-w-[190px] sm:text-[14px]"
                >
                  Trading Education Guide
                </Link>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="p-3 sm:hidden">
            <div className="rounded-[18px] border border-slate-200 bg-[#f8fbff] px-4 py-3.5">
              <p className="text-[12px] font-semibold leading-7 text-slate-600">
                The best broker is not always the most popular. Look for a
                broker with{" "}
                <Link
                  href="/en/licenses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-brand-600"
                >
                  strong regulation
                </Link>
                , transparent fees and a suitable trading platform.
              </p>

              <p className="mt-2 text-[12px] font-semibold leading-7 text-slate-600">
                Also compare the{" "}
                <Link
                  href="/en/learn-trading/spread"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-brand-600"
                >
                  spread
                </Link>
                , account types, withdrawal methods and{" "}
                <Link
                  href="/en/best-brokers/islamic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-brand-600"
                >
                  swap-free account
                </Link>{" "}
                conditions.
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {brokerChecks.map((item) => (
                <div
                  key={item.num}
                  className="flex min-h-[118px] flex-col rounded-[17px] border border-slate-200 bg-white p-3 shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-[9px] font-black text-brand-600">
                    {item.num}
                  </span>

                  <h3 className="mt-3 flex min-h-[40px] items-center text-[13px] font-black leading-5 text-[#07111f]">
                    {item.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 min-h-[32px] text-[10px] font-semibold leading-4 text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/en/learn-trading"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand-500 px-4 text-[12px] font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)] transition hover:bg-brand-600"
            >
              Explore Trading Education
            </Link>
          </div>

          {/* DESKTOP / TABLET */}
          <div className="hidden p-5 sm:block">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
              {/* SEO ARTICLE */}
              <article className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-70" />

                <div className="space-y-4 text-[14px] font-medium leading-8 text-slate-600">
                  <p>
                    When choosing the <strong>best trading broker</strong>, do
                    not rely only on brand awareness or advertising. Start by
                    checking the broker’s{" "}
                    <Link
                      href="/en/licenses"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-brand-600 hover:underline"
                    >
                      regulation and licensing
                    </Link>
                    , because strong regulatory oversight usually provides higher
                    standards for transparency and client fund protection.
                  </p>

                  <p>
                    Compare the real cost of trading, which includes more than the{" "}
                    <Link
                      href="/en/learn-trading/spread"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-brand-600 hover:underline"
                    >
                      spread
                    </Link>
                    . Commissions, swap fees and additional account charges can
                    also affect your total trading cost.
                  </p>

                  <p>
                    Review the trading platform and execution speed, whether you
                    use MT4, MT5, WebTrader or a mobile application. Stability,
                    usability and execution quality can significantly affect your
                    trading experience.
                  </p>

                  <p>
                    Compare{" "}
                    <Link
                      href="/en/lowest-spread-brokers#account-types"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-brand-600 hover:underline"
                    >
                      trading account types
                    </Link>
                    . Standard and Cent accounts may suit beginners, while Raw
                    Spread and ECN accounts may suit active traders seeking lower
                    transaction costs.
                  </p>

                  <p>
                    Finally, check withdrawal speed, payment methods, customer
                    support and{" "}
                    <Link
                      href="/en/best-brokers/islamic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-brand-600 hover:underline"
                    >
                      swap-free account
                    </Link>{" "}
                    conditions. You can also use our{" "}
                    <Link
                      href="/en/learn-trading"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-brand-600 hover:underline"
                    >
                      trading education guide
                    </Link>{" "}
                    before making your final decision.
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <Link
                    href="/en/learn-trading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-brand-600"
                  >
                    Explore Trading Education
                  </Link>

                  <Link
                    href="/en/best-brokers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-brand-200 bg-white px-6 text-[13px] font-black text-brand-600 transition hover:bg-brand-50"
                  >
                    Browse Best Brokers
                  </Link>
                </div>
              </article>

              {/* CHECKLIST */}
              <aside className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
                <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] to-white px-5 py-4">
                  <h3 className="text-[20px] font-black leading-8 text-[#07111f]">
                    What should you check before opening an account?
                  </h3>

                  <p className="mt-1 text-[11px] font-semibold text-slate-500">
                    Six essential criteria for choosing a broker.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 p-4">
                  {brokerChecks.map((item) => (
                    <div
                      key={item.num}
                      className="min-h-[112px] rounded-[18px] border border-slate-200 bg-white p-3 shadow-sm"
                    >
                      <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 px-1.5 text-[9px] font-black text-brand-600">
                        {item.num}
                      </span>

                      <h4 className="mt-4 text-[13px] font-black leading-5 text-[#07111f]">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-[10px] font-semibold leading-5 text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* WHY TRUST BROKER ALARAB */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    
    {/* HEADER */}
    <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-4">
      <div className="text-center lg:text-left">
        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[12px] font-black text-brand-500 shadow-sm">
          Why Broker Alarab?
        </span>

        <h2 className="mt-4 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] sm:text-[34px] lg:text-[36px]">
          Why Do Traders Trust Broker Alarab?
        </h2>

        <p className="mx-auto mt-3 max-w-[900px] text-[14px] font-semibold leading-8 text-slate-600 lg:mx-0 lg:text-[15px] lg:leading-9">
          We help traders compare brokers using practical data, transparent reviews,
          broker comparisons, country-specific rankings, and account analysis based on
          regulation, fees, trading platforms, deposits, withdrawals, and overall
          trading conditions.
        </p>
      </div>
    </div>

    {/* MOBILE */}
    <div className="grid gap-2 p-3 sm:hidden">
      {[
        {
          title: "Clear & Structured Reviews",
          desc: "Every broker has a dedicated page covering accounts, regulation, fees, and platforms.",
        },
        {
          title: "Practical Comparisons",
          desc: "Side-by-side broker comparisons focused on real differences that matter.",
        },
        {
          title: "Country-Based Rankings",
          desc: "Broker recommendations tailored to specific countries and trading needs.",
        },
        {
          title: "Faster Broker Selection",
          desc: "Find suitable brokers quickly through reviews, rankings, and comparisons.",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="rounded-[16px] border border-slate-200 bg-[#f8fbff] px-4 py-3.5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-100 bg-white text-[11px] font-black text-brand-600">
              {index + 1}
            </span>

            <h3 className="text-[15px] font-black leading-6 text-[#0f172a]">
              {item.title}
            </h3>
          </div>

          <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-500">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* DESKTOP */}
    <div className="hidden p-5 sm:block">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Clear & Structured Reviews",
            desc: "Broker review pages covering regulation, accounts, fees, platforms, deposits, and withdrawals in one place.",
            tag: "Reviews",
          },
          {
            title: "Practical Comparisons",
            desc: "Compare brokers side-by-side and understand real differences before opening an account.",
            tag: "Compare",
          },
          {
            title: "Country-Based Rankings",
            desc: "Broker recommendations organized by country to help traders find suitable options faster.",
            tag: "Countries",
          },
          {
            title: "Faster Broker Selection",
            desc: "Well-structured reviews, rankings, and account filters designed to simplify broker research.",
            tag: "Research",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-[#fcfdff] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent opacity-55" />

            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-500">
                {item.tag}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[13px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                {index + 1}
              </span>
            </div>

            <h3 className="text-[20px] font-black leading-7 tracking-[-0.02em] text-[#07111f]">
              {item.title}
            </h3>

            <p className="mt-3 min-h-[84px] text-[13px] font-medium leading-7 text-slate-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

{/* FOREX & FINTECH EVENTS - FINAL */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
    {(() => {
      const isMediaPartnerEvent = (event: any) =>
  event.is_media_partner === true;

/*
 * Show the nearest two regular events,
 * then add the nearest official media partner event.
 */
const nearestRegularEvents = eventList
  .filter((event) => event.is_media_partner !== true)
  .slice(0, 2);

const mediaPartnerEvent = eventList.find(
  (event) => event.is_media_partner === true
);

const selectedEvents = mediaPartnerEvent
  ? [...nearestRegularEvents, mediaPartnerEvent]
  : eventList.slice(0, 3);

      return (
        <>
          {/* HEADER */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1 text-center lg:text-left">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
                  Forex & FinTech Events
                </span>

                <h2 className="mx-auto mt-3 max-w-[320px] text-[25px] font-black leading-[1.16] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
                  Major Forex and FinTech Events in 2026
                </h2>

                <p className="mx-auto mt-3 max-w-[330px] text-[12px] font-semibold leading-6 text-slate-600 sm:max-w-[900px] sm:text-[15px] sm:leading-8 lg:mx-0">
                  Follow major forex and fintech exhibitions, including events
                  where Broker Alarab participates as an official media partner.
                </p>
              </div>

              <Link
                href="/en/events"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto inline-flex h-11 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[13px] font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:h-12 sm:min-w-[190px] sm:text-[14px] lg:mx-0"
              >
                View All Events
              </Link>
            </div>
          </div>

          {/* EVENTS */}
          <div className="grid gap-3 p-3 md:grid-cols-3 lg:gap-4 lg:p-5">
            {selectedEvents.map((event) => {
              const count = eventCountdown(
                event.start_date,
                event.end_date
              );

              const mediaPartner = isMediaPartnerEvent(event);

              const eventTitle = (
                event.title_en || "Trading Event"
              )
                .replace(/\s*2026\s*/gi, " ")
                .replace(/\s+/g, " ")
                .trim();

              const eventLocation =
                event.city_en?.trim() ||
                event.country_en?.trim() ||
                "Location to be announced";

              return (
                <article
                  key={event.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_44px_rgba(15,23,42,0.08)] sm:rounded-[24px]"
                >
                  {/* TOP ACCENT */}
                  <div
                    className={`h-[4px] ${
                      mediaPartner
                        ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-brand-500"
                        : "bg-gradient-to-r from-brand-600 via-brand-400 to-[#93c5fd]"
                    }`}
                  />

                  {/* EVENT HEADER */}
                  <div className="relative min-h-[104px] border-b border-slate-100 bg-gradient-to-b from-[#f5f9ff] to-white px-4 pb-3 pt-3 text-center sm:min-h-[132px] sm:px-5 sm:pb-5 sm:pt-4">
                    <div className="flex min-h-[26px] justify-center">
                      {mediaPartner ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[9px] font-black text-amber-700 shadow-sm sm:text-[10px]">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-[9px]">
                            ✓
                          </span>
                          Official Media Partner
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[9px] font-black text-brand-500 shadow-sm sm:text-[10px]">
                          Upcoming Event
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 min-h-[24px] text-[16px] font-black leading-6 text-[#07111f] sm:text-[18px]">
                      {eventTitle}
                    </h3>

                    <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 sm:text-[12px]">
                      <span className="text-brand-500">●</span>
                      <span>{eventLocation}</span>
                    </div>
                  </div>

                  {/* COUNTDOWN */}
                  {count.status === "live" ? (
                    <div className="border-b border-emerald-100 bg-emerald-50 px-4 py-3 text-center">
                      <div className="text-[17px] font-black text-emerald-600 sm:text-[19px]">
                        Live Now
                      </div>

                      <div className="mt-0.5 text-[10px] font-bold text-emerald-700">
                        The event is currently taking place
                      </div>
                    </div>
                  ) : (
                    <div className="border-b border-slate-100 bg-[#fbfdff] px-4 py-3">
                      <div className="flex items-center justify-center gap-3">
                        <div className="inline-flex min-w-[82px] items-center justify-center gap-1.5 rounded-xl border border-brand-100 bg-white px-3 py-2 shadow-sm">
                          <span className="text-[18px] font-black text-brand-600 sm:text-[20px]">
                            {count.days}
                          </span>

                          <span className="text-[10px] font-bold text-slate-500">
                            Days
                          </span>
                        </div>

                        <div className="inline-flex min-w-[82px] items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                          <span className="text-[18px] font-black text-slate-700 sm:text-[20px]">
                            {count.hours}
                          </span>

                          <span className="text-[10px] font-bold text-slate-500">
                            Hours
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 text-center text-[9px] font-bold text-slate-400">
                        Time Remaining
                      </div>
                    </div>
                  )}

                  {/* EVENT DETAILS */}
                  <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                    <div className="rounded-[16px] border border-slate-100 bg-slate-50/70 px-3 py-3 text-center">
                      <div className="text-[11px] font-black leading-5 text-slate-800 sm:text-[12px]">
                        {formatEventDate(
                          event.start_date,
                          event.end_date
                        )}
                      </div>

                      <div className="mt-1 text-[10px] font-bold leading-5 text-slate-600 sm:text-[11px]">
                        {event.city_en ||
                          event.country_en ||
                          "Location to be announced"}

                        {event.city_en && event.country_en
                          ? `, ${event.country_en}`
                          : ""}
                      </div>

                      {event.venue_en && (
                        <div className="mt-0.5 hidden text-[10px] font-medium leading-5 text-slate-500 sm:block">
                          {event.venue_en}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/en/events/${event.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 px-4 text-[12px] font-black text-brand-600 transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white sm:min-h-[46px] sm:text-[13px]"
                    >
                      View Event Details

                      <span className="ml-2 transition group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      );
    })()}
  </div>
</section>

{/* FAQ */}
<section className="mx-auto w-full max-w-7xl px-0 py-3 sm:py-4">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
   <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-4 sm:px-6 sm:py-5">
  <div className="text-center lg:text-left">
    <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-500 shadow-sm sm:text-[12px]">
      Frequently Asked Questions
    </span>

    <h2 className="mx-auto mt-3 max-w-[320px] text-[25px] font-black leading-[1.16] tracking-[-0.02em] text-[#07111f] sm:max-w-none sm:text-[34px] lg:mx-0 lg:text-[36px]">
      Common Questions About Choosing a Trading Broker
    </h2>

    <p className="mx-auto mt-3 max-w-[880px] text-[12px] font-semibold leading-6 text-slate-600 sm:text-[15px] sm:leading-8 lg:mx-0">
      Clear answers about broker regulation, spreads, account types,
      platforms, deposits, withdrawals and broker comparisons.
    </p>
  </div>
</div>

    {(() => {
     const faqItems = [
  {
    q: "What is the best trading broker?",
    a: (
      <>
        There is no single broker that suits every trader. Compare regulation,
        fees, platforms, accounts and payment methods. Start with our{" "}
        <Link
          href="/en/brokers"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-brand-600 hover:underline"
        >
          broker reviews
        </Link>{" "}
        and{" "}
        <Link
          href="/en/compare"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-brand-600 hover:underline"
        >
          broker comparisons
        </Link>
        .
      </>
    ),
  },
  {
    q: "How can I check whether a broker is regulated?",
    a: (
      <>
        Check the regulator and license number on the broker’s website, then
        verify the information through the regulator’s official register. You
        can also review our{" "}
        <Link
          href="/en/licenses"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-brand-600 hover:underline"
        >
          broker regulation guide
        </Link>
        .
      </>
    ),
  },
  {
    q: "What is the difference between trading account types?",
    a: (
      <>
        Standard accounts may suit beginners, while Raw Spread and ECN accounts
        usually offer tighter spreads with separate commissions. Cent accounts
        may be useful for testing with smaller capital. Review our{" "}
        <Link
          href="/en/lowest-spread-brokers#account-types"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-brand-600 hover:underline"
        >
          account type comparison
        </Link>
        .
      </>
    ),
  },
  {
    q: "Does a lower spread always mean a better broker?",
    a: (
      <>
        No. You should also consider commissions, swap fees, execution quality,
        slippage and regulation. Learn more about{" "}
        <Link
          href="/en/learn-trading/spread"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-brand-600 hover:underline"
        >
          spreads and trading costs
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can I open a swap-free trading account?",
    a: (
      <>
        Many brokers offer swap-free accounts, but conditions can vary. Some
        brokers may apply alternative fees or restrictions. Compare{" "}
        <Link
          href="/en/best-brokers/islamic"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-brand-600 hover:underline"
        >
          swap-free trading brokers
        </Link>
        .
      </>
    ),
  },
  {
    q: "What should I check before making a deposit?",
    a: "Verify the license, account conditions, trading costs, withdrawal methods, minimum deposit and customer support before funding a live account.",
  },
];

      const FAQItem = ({ item, index }: { item: any; index: number }) => (
        <details className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:border-brand-100 hover:bg-[#fcfdff] hover:shadow-[0_14px_32px_rgba(15,23,42,0.05)] open:border-[#93c5fd]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-xs font-black text-brand-600 transition group-open:bg-brand-500 group-open:text-white">
                {index + 1}
              </span>

              <span className="text-[15px] font-black leading-7 text-[#07111f] sm:text-[16px]">
                {item.q}
              </span>
            </div>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-[#f8fbff] text-[14px] font-black text-brand-500 transition group-open:rotate-180 group-open:bg-brand-500 group-open:text-white">
              ▾
            </span>
          </summary>

          <div className="border-t border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#fcfdff_100%)] px-5 py-4">
            <div className="max-w-4xl text-[14px] font-medium leading-8 text-slate-600">
              {item.a}
            </div>
          </div>
        </details>
      );

      return (
        <>
          {/* MOBILE - KEEP AS IS */}
          <div className="space-y-3 px-4 py-4 sm:hidden">
            {faqItems.slice(0, 5).map((item, index) => (
              <FAQItem key={item.q} item={item} index={index} />
            ))}

            <details className="group">
              <summary className="mt-2 flex cursor-pointer list-none items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-[13px] font-black text-brand-500">
                Show All Questions
              </summary>

              <div className="mt-3 space-y-3">
                {faqItems.slice(5).map((item, index) => (
                  <FAQItem key={item.q} item={item} index={index + 5} />
                ))}
              </div>
            </details>
          </div>

          {/* DESKTOP - TWO INDEPENDENT COLUMNS */}
          <div className="hidden p-5 sm:block">
  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-3">
      {faqItems.slice(0, 3).map((item, index) => (
        <FAQItem key={item.q} item={item} index={index} />
      ))}
    </div>

    <div className="space-y-3">
      {faqItems.slice(3, 6).map((item, index) => (
        <FAQItem key={item.q} item={item} index={index + 3} />
      ))}
    </div>
  </div>
</div>
        </>
      );
    })()}
  </div>
</section>

{/* BEST BROKERS BY NEED - TOP 4 FROM SUPABASE */}
<section className="mx-auto hidden w-full max-w-7xl px-0 pb-0 pt-3 md:block">
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
    {(() => {
      const categoryLabels = [
        {
          title: "Best for Beginners",
          desc: "Easy platforms and suitable account options for getting started",
          factLabel: "Suitable for",
          factValue: "Easier Start",
          pageHref: "/en/best-brokers/beginners",
        },
        {
          title: "Best for Low Spreads",
          desc: "Trading costs suitable for scalping and active trading",
          factLabel: "Main Benefit",
          factValue: "Lower Costs",
          pageHref: "/en/best-brokers/low-spread",
        },
        {
          title: "Best for Swap-Free Accounts",
          desc: "Swap-free account options with clearer trading conditions",
          factLabel: "Account Type",
          factValue: "Swap-Free",
          pageHref: "/en/best-brokers/islamic",
        },
        {
          title: "Best for Trading Platforms",
          desc: "Multiple platform options for active and daily trading",
          factLabel: "Platforms",
          factValue: "More Options",
          pageHref: "/en/best-brokers/mt4-mt5",
        },
      ];

      const topFourBrokers = footerFeaturedBrokers.slice(0, 4);

      return (
        <>
          <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-6 py-5">
            <div className="flex items-center justify-between gap-8">
              <div className="text-left">
                <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[11px] font-black text-brand-600 shadow-sm">
                  Brokers Selected by Trading Need
                </span>

                <h2 className="mt-3 text-[30px] font-black leading-[1.15] tracking-[-0.02em] text-[#07111f] lg:text-[36px]">
                  Best Brokers for Different Trading Needs
                </h2>

                <p className="mt-2 max-w-[820px] text-[13px] font-semibold leading-7 text-slate-600 lg:text-[14px]">
                  Explore four highly rated brokers, each presented with a clear
                  category to help you understand where it may fit best.
                </p>
              </div>

              <Link
                href="/en/brokers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 min-w-[190px] shrink-0 items-center justify-center rounded-2xl bg-brand-500 px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                View All Brokers
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 bg-white p-5">
            {topFourBrokers.map((broker, index) => {
              const category = categoryLabels[index];

              return (
                <article
                  key={broker.id}
                  className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-[#fbfdff] p-4 shadow-[0_6px_20px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_18px_38px_rgba(15,23,42,0.09)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-brand-500 via-[#60a5fa] to-transparent" />

                  <div className="flex items-start justify-between gap-3 pt-1">
                    <span className="inline-flex min-h-[30px] items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-black leading-4 text-brand-600">
                      {category.title}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-[10px] font-black text-brand-600 shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-3 min-h-[42px] text-[11px] font-semibold leading-5 text-slate-500">
                    {category.desc}
                  </p>

                  <Link
                    href={`/en/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto mt-3 flex h-[78px] w-[104px] items-center justify-center rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition group-hover:border-brand-100"
                  >
                    <img
                      src={broker.logo || ""}
                      alt={`${broker.name_en || broker.name} logo`}
                      className="max-h-[68px] max-w-[95%] object-contain transition duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <Link
                    href={`/en/brokers/${broker.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block truncate text-center text-[18px] font-black text-slate-950 transition hover:text-brand-500"
                  >
                    {broker.name_en || broker.name}
                  </Link>

                  <div className="mt-1 text-center text-[10px] font-bold text-slate-500">
                    Broker Alarab Rating
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-center">
                      <div className="text-[9px] font-bold text-slate-400">
                        Rating
                      </div>

                      <div className="mt-1 text-[15px] font-black text-brand-600">
                        ★ {broker.rating?.toFixed(1) ?? "—"}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-center">
                      <div className="text-[9px] font-bold text-slate-400">
                        {category.factLabel}
                      </div>

                      <div className="mt-1 text-[11px] font-black text-slate-800">
                        {category.factValue}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={category.pageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[40px] items-center justify-center rounded-xl border border-brand-100 bg-brand-50 px-3 text-[10px] font-black text-brand-600 transition hover:bg-brand-100"
                  >
                    Explore This Category
                  </Link>

                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                    <Link
                      href={`/en/brokers/${broker.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[11px] font-black text-slate-700 transition hover:bg-slate-50"
                    >
                      Read Review
                    </Link>

                    <a
                      href={broker.real_account_url || `/en/brokers/${broker.slug}`}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 text-[11px] font-black text-white transition hover:bg-brand-600"
                    >
                      Open Account
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      );
    })()}
  </div>
</section>

    {/* CLOSE ALL ENGLISH HOME PAGE SECTIONS */}
    </div>

  {/* BROKERS SIDEBAR - DESKTOP ONLY */}
<aside className="hidden min-h-full pt-4 xl:block">
  <div className="sticky top-24 overflow-hidden rounded-[30px] border border-slate-200 bg-white pb-3 shadow-[0_16px_45px_rgba(15,23,42,0.07)]">
    {/* SIDEBAR HEADER */}
    <div className="border-b border-slate-200 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-5 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-left">
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-[10px] font-black text-brand-600 shadow-sm">
            Featured Brokers
          </span>

          <h2 className="mt-2 text-[18px] font-black text-[#07111f]">
            Best Trading Brokers
          </h2>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-white text-lg shadow-sm">
          🔥
        </span>
      </div>

      <p className="mt-1 text-[10px] font-medium leading-5 text-slate-500">
        Browse independent reviews of leading forex and CFD brokers.
      </p>
    </div>

    {/* BROKER LIST */}
    <div className="border-b border-slate-200 bg-white px-3 py-2">
      <div className="space-y-1.5">
        {sidebarBrokers.map((broker, index) => {
          const isFeatured = index === 0;
          const brokerName = broker.name_en || broker.name || "Trading Broker";

          return (
            <Link
              key={broker.id}
              href={`/en/brokers/${broker.slug}`}
              target="_blank"
              rel={
                isFeatured
                  ? "sponsored noopener noreferrer"
                  : "noopener noreferrer"
              }
              prefetch={false}
              className={`group relative flex min-h-[74px] items-center justify-between gap-2.5 overflow-hidden rounded-[18px] px-2.5 py-2 transition duration-300 ${
                isFeatured
                  ? "border border-brand-300 bg-gradient-to-r from-[#eff6ff] via-white to-[#f8fbff] shadow-[0_12px_32px_rgba(37,99,235,0.16)] hover:border-brand-400 hover:shadow-[0_18px_40px_rgba(37,99,235,0.22)]"
                  : "border border-transparent hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              {/* FEATURED TOP LINE */}
              {isFeatured && (
                <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#f59e0b] via-[#facc15] to-brand-500" />
              )}

              {/* LOGO */}
              <div
                className={`relative flex h-[42px] w-[102px] shrink-0 items-center justify-center rounded-xl border bg-white px-1.5 transition duration-300 ${
                  isFeatured
                    ? "border-brand-200 shadow-[0_8px_22px_rgba(37,99,235,0.14)]"
                    : "border-slate-200 shadow-[0_4px_14px_rgba(15,23,42,0.05)] group-hover:border-brand-200"
                }`}
              >
                {broker.logo ? (
                  <img
                    src={broker.logo}
                    alt={`${brokerName} logo`}
                    className={`max-h-[42px] max-w-[100px] object-contain transition duration-300 ${
                      isFeatured
                        ? "scale-[1.28] group-hover:scale-[1.36]"
                        : "scale-[1.18] group-hover:scale-[1.26]"
                    }`}
                    loading="lazy"
                  />
                ) : (
                  <span className="truncate text-xs font-black text-slate-700">
                    {brokerName}
                  </span>
                )}
              </div>

              {/* BROKER INFO */}
              <div className="min-w-0 flex-1 overflow-visible text-left">
                {isFeatured && (
                  <div className="mb-1.5 flex justify-start">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[9px] font-black leading-none text-brand-700 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      Featured Partner
                    </span>
                  </div>
                )}

                <div
                  className={`text-[12px] font-black leading-5 transition ${
                    isFeatured
                      ? "text-brand-700"
                      : "text-slate-950 group-hover:text-brand-600"
                  }`}
                >
                  {brokerName}
                </div>

                <div className="mt-1 flex items-center justify-start gap-1 text-[10px] font-bold text-[#f59e0b]">
                  <span>★</span>
                  <span>{broker.rating?.toFixed(1) ?? "—"}</span>
                </div>
              </div>

              {/* ARROW */}
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] font-black transition duration-300 group-hover:translate-x-1 ${
                  isFeatured
                    ? "bg-brand-500 text-white shadow-[0_8px_18px_rgba(37,99,235,0.25)]"
                    : "bg-brand-50 text-brand-500"
                }`}
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>

    {/* SIDEBAR IMPORTANT LINKS */}
    <div className="space-y-3 px-3 pb-1">
      {/* LICENSES */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-[17px]">
              🛡️
            </span>

            <div className="min-w-0">
              <h3 className="text-[14px] font-black text-[#07111f]">
                Broker Regulation
              </h3>

              <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                Learn about major global financial regulators.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 px-3">
          {[
            {
              code: "FCA",
              title: "UK Regulation",
              href: "/en/licenses/fca",
            },
            {
              code: "ASIC",
              title: "Australian Regulation",
              href: "/en/licenses/asic",
            },
            {
              code: "DFSA",
              title: "Dubai Financial Regulation",
              href: "/en/licenses/dfsa",
            },
            {
              code: "CySEC",
              title: "Cyprus Regulation",
              href: "/en/licenses/cysec",
            },
            {
              code: "FSCA",
              title: "South Africa Regulation",
              href: "/en/licenses/fsca",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[50px] items-center justify-between gap-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="inline-flex h-7 min-w-[45px] shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-2 text-[9px] font-black text-emerald-700">
                  {item.code}
                </span>

                <span className="truncate text-[11px] font-black text-slate-700 transition group-hover:text-brand-600">
                  {item.title}
                </span>
              </div>

              <span className="shrink-0 text-[14px] font-black text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500">
                →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/en/licenses"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[40px] items-center justify-center border-t border-slate-100 bg-emerald-50/50 px-4 text-[10px] font-black text-emerald-700 transition hover:bg-emerald-50"
        >
          View All Regulators
          <span className="ml-1.5">→</span>
        </Link>
      </div>

      {/* ONEROYAL SPONSORED SIDEBAR AD */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-black text-slate-500">
            Advertisement
          </span>

          <span className="text-[10px] font-bold text-slate-600">
            OneRoyal
          </span>
        </div>

        <a
          href="https://vc.cabinet.oneroyal.com/links/go/15855"
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label="Open a trading account with OneRoyal"
          className="group block overflow-hidden rounded-[16px] bg-white"
        >
          <img
            src="https://vc.cabinet.oneroyal.com/uploads/public/banners/2024/01/25/b7a653ad68c699083b38e7f823a1a35f.png"
            alt="OneRoyal trading account advertisement"
            title="Open a trading account with OneRoyal"
            loading="lazy"
            className="mx-auto block h-auto w-full max-w-[300px] object-contain transition duration-300 group-hover:scale-[1.02]"
          />
        </a>
      </div>

      {/* TRADING TERMS */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-[17px]">
              📘
            </span>

            <div className="min-w-0">
              <h3 className="text-[14px] font-black text-[#07111f]">
                Essential Trading Terms
              </h3>

              <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                Understand the key concepts before you trade.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 px-3">
          {[
            {
              label: "Spread",
              desc: "The difference between bid and ask prices",
              href: "/en/learn-trading/spread",
            },
            {
              label: "Leverage",
              desc: "Controlling a larger position with less capital",
              href: "/en/learn-trading/leverage",
            },
            {
              label: "Margin",
              desc: "The capital required to open a position",
              href: "/en/learn-trading/margin",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[56px] items-center justify-between gap-3 py-2.5"
            >
              <div className="min-w-0">
                <div className="text-[11px] font-black text-slate-800 transition group-hover:text-brand-600">
                  {item.label}
                </div>

                <div className="mt-0.5 truncate text-[8px] font-semibold text-slate-400">
                  {item.desc}
                </div>
              </div>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[12px] font-black text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/en/learn-trading"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[40px] items-center justify-center border-t border-slate-100 bg-blue-50/50 px-4 text-[10px] font-black text-brand-600 transition hover:bg-blue-50"
        >
          Browse Trading Education
          <span className="ml-1.5">→</span>
        </Link>
      </div>

      {/* TRADING CALCULATORS */}
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#eef5ff] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-[17px]">
              🧮
            </span>

            <div className="min-w-0">
              <h3 className="text-[14px] font-black text-[#07111f]">
                Trading Calculators
              </h3>

              <p className="mt-0.5 text-[9px] font-semibold leading-4 text-slate-500">
                Practical tools for trade and risk planning.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 p-3">
          {[
            {
              title: "Risk Calculator",
              short: "Risk",
              href: "/en/tools/risk-calculator",
            },
            {
              title: "Pip Calculator",
              short: "Pip",
              href: "/en/tools/pip-calculator",
            },
            {
              title: "Margin Calculator",
              short: "Margin",
              href: "/en/tools/margin-calculator",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[48px] items-center justify-between gap-3 rounded-[14px] border border-slate-200 bg-[#fbfdff] px-3 py-2 transition hover:border-violet-200 hover:bg-violet-50/40"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="inline-flex h-7 min-w-[48px] shrink-0 items-center justify-center rounded-lg bg-violet-50 px-2 text-[8px] font-black text-violet-700">
                  {item.short}
                </span>

                <span className="truncate text-[10px] font-black text-slate-700 transition group-hover:text-violet-700">
                  {item.title}
                </span>
              </div>

              <span className="shrink-0 text-[13px] font-black text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-600">
                →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/en/tools"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[40px] items-center justify-center border-t border-slate-100 bg-violet-50/50 px-4 text-[10px] font-black text-violet-700 transition hover:bg-violet-50"
        >
          View All Trading Calculators
          <span className="ml-1.5">→</span>
        </Link>
      </div>
    </div>

    {/* MULTIBANK SPONSORED SIDEBAR AD */}
    <div className="px-3 pt-3">
      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_7px_22px_rgba(15,23,42,0.045)]">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-black text-slate-500">
            Advertisement
          </span>

          <span className="text-[10px] font-bold text-slate-600">
            MultiBank Group
          </span>
        </div>

        <a
          href="https://trade.multibankfx.com/register?ibNum=9951544&utm_source=ib-media-generator&utm_media=300x250&utm_term=9951544"
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label="Open a real trading account with MultiBank Group"
          className="group block overflow-hidden rounded-[16px] bg-[#081528]"
        >
          <img
            src="https://my.multibankfx.com/build/client/images/ib-media/5/en-300x250.png"
            width="300"
            height="250"
            alt="MultiBank Group trading account advertisement"
            title="Open a real trading account with MultiBank Group"
            loading="lazy"
            className="mx-auto block h-auto w-full max-w-[300px] object-contain transition duration-300 group-hover:scale-[1.015]"
          />
        </a>
      </div>
    </div>
  </div>
</aside>

  </div>
</div>

</main>
  );
}